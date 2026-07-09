/**
 * PerfMonitor - Lightweight frame/tileset performance sampler
 *
 * Collects frame times, renderer draw stats and tileset streaming stats,
 * publishing a summary every `logIntervalMs` as a `[BelowPerf]` console line
 * and on `window.__belowPerf`. The console line is the transport for
 * headless capture (CDP / adb logcat), so keep it single-line JSON.
 *
 * @class PerfMonitor
 * @since 1.8.0
 */
export class PerfMonitor {
  constructor(renderer, options = {}) {
    this.renderer = renderer;
    this.tilesetLoader = options.tilesetLoader || null;
    this.logIntervalMs = typeof options.logIntervalMs === 'number' ? options.logIntervalMs : 2000;
    this.maxSamples = 240;
    this.frameTimes = new Float32Array(this.maxSamples);
    this.sampleCount = 0;
    this.sampleIndex = 0;
    this.lastLogTimeMs = 0;
    this.lastSummary = null;
    this.overlayElement = null;
    this.enabled = true;

    if (options.overlay && typeof document !== 'undefined') {
      this.createOverlay(options.overlayContainer || document.body);
    }
  }

  setTilesetLoader(tilesetLoader) {
    this.tilesetLoader = tilesetLoader;
  }

  createOverlay(container) {
    if (this.overlayElement || typeof document === 'undefined') return;
    const el = document.createElement('pre');
    el.id = 'belowPerfOverlay';
    el.style.cssText = [
      'position:fixed', 'top:8px', 'left:8px', 'z-index:10000',
      'margin:0', 'padding:6px 8px', 'border-radius:6px',
      'background:rgba(0,10,20,0.72)', 'color:#9fe8ff',
      'font:11px/1.45 ui-monospace,Menlo,monospace',
      'pointer-events:none', 'white-space:pre'
    ].join(';');
    container.appendChild(el);
    this.overlayElement = el;
  }

  /**
   * Record one frame. Call once per animation-loop tick.
   * @param {number} deltaTimeMs - Frame delta in milliseconds
   */
  sample(deltaTimeMs) {
    if (!this.enabled || !Number.isFinite(deltaTimeMs) || deltaTimeMs <= 0) return;
    // Ignore visibility gaps (tab hidden / headset doffed) — a multi-second
    // "frame" is a pause, not a slow frame, and would poison the percentiles.
    if (deltaTimeMs > 4000) return;

    this.frameTimes[this.sampleIndex] = deltaTimeMs;
    this.sampleIndex = (this.sampleIndex + 1) % this.maxSamples;
    if (this.sampleCount < this.maxSamples) this.sampleCount += 1;

    const nowMs = performance.now();
    if (nowMs - this.lastLogTimeMs >= this.logIntervalMs) {
      this.lastLogTimeMs = nowMs;
      this.publish();
    }
  }

  frameStats() {
    const count = this.sampleCount;
    if (count === 0) {
      return { frameMsAvg: 0, frameMsP95: 0, fps: 0 };
    }
    const samples = Array.from(this.frameTimes.subarray(0, count)).sort((a, b) => a - b);
    let total = 0;
    for (let i = 0; i < count; i += 1) total += samples[i];
    const avg = total / count;
    const p95 = samples[Math.min(count - 1, Math.floor(count * 0.95))];
    return {
      frameMsAvg: Number(avg.toFixed(2)),
      frameMsP95: Number(p95.toFixed(2)),
      fps: Number((1000 / avg).toFixed(1))
    };
  }

  tilesetStats() {
    const loader = this.tilesetLoader;
    if (!loader || loader.activeTilesets.size === 0) return null;

    const tilesets = [];
    loader.activeTilesets.forEach((tileset) => {
      const stats = tileset.stats || {};
      const state = loader.tilesetStates?.get?.(tileset);
      const shadowCasters = state?.shadowCastersLimited
        ? state.shadowCasterTiles?.size
        : state?.loadedTileScenes?.size;
      tilesets.push({
        visible: stats.visible ?? null,
        active: stats.active ?? null,
        downloading: stats.downloading ?? null,
        parsing: stats.parsing ?? null,
        errorTarget: Number((tileset.errorTarget ?? 0).toFixed(2)),
        cameras: Array.isArray(tileset.cameras) ? tileset.cameras.length : 0,
        vrProfile: state?.resolvedVRPerformanceProfile ?? null,
        shadowCasters: shadowCasters ?? null,
        vrMaxTriangles: state?.vrMaxTriangles ?? null
      });
    });

    return {
      tilesets,
      update: {
        lastMs: Number((loader.lastUpdateDurationMs ?? 0).toFixed(2)),
        maxMs: Number((loader.maxUpdateDurationMs ?? 0).toFixed(2)),
        ran: loader.updateRunCount ?? 0,
        gated: loader.updateGatedCount ?? 0
      }
    };
  }

  summary() {
    const renderInfo = this.renderer?.info?.render || {};
    const xr = this.renderer?.xr;
    const summary = {
      t: Math.round(performance.now()),
      ...this.frameStats(),
      calls: renderInfo.calls ?? 0,
      triangles: renderInfo.triangles ?? 0,
      xrPresenting: xr?.isPresenting === true,
      foveation: xr?.getFoveation ? xr.getFoveation() : null,
      shadows: {
        enabled: this.renderer?.shadowMap?.enabled === true,
        type: this.renderer?.shadowMap?.type ?? null
      }
    };
    const tiles = this.tilesetStats();
    if (tiles) {
      summary.tiles = tiles;
    }
    this.lastSummary = summary;
    return summary;
  }

  publish() {
    const summary = this.summary();
    if (typeof window !== 'undefined') {
      window.__belowPerf = summary;
    }
    console.log('[BelowPerf]', JSON.stringify(summary));
    if (this.overlayElement) {
      const tiles = summary.tiles;
      this.overlayElement.textContent = [
        `fps ${summary.fps}  ms ${summary.frameMsAvg} (p95 ${summary.frameMsP95})`,
        `calls ${summary.calls}  tris ${(summary.triangles / 1e6).toFixed(2)}M`,
        tiles
          ? `tiles vis ${tiles.tilesets[0]?.visible ?? '-'}  err ${tiles.tilesets[0]?.errorTarget ?? '-'}  cast ${tiles.tilesets[0]?.shadowCasters ?? '-'}  upd ${tiles.update.lastMs}ms`
          : 'tiles -',
        `xr ${summary.xrPresenting ? 'on' : 'off'}  shadows ${summary.shadows.enabled ? summary.shadows.type : 'off'}`
      ].join('\n');
    }
  }

  dispose() {
    this.enabled = false;
    if (this.overlayElement?.parentNode) {
      this.overlayElement.parentNode.removeChild(this.overlayElement);
    }
    this.overlayElement = null;
    if (typeof window !== 'undefined' && window.__belowPerf === this.lastSummary) {
      delete window.__belowPerf;
    }
  }
}
