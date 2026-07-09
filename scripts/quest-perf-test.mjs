#!/usr/bin/env node
/**
 * Autonomous Quest 3 perf harness for the BelowJS tileset example.
 *
 * Drives the headset over adb + Chrome DevTools Protocol with nobody wearing
 * it: launches Quest Browser at the tileset example, enters VR via a
 * user-gesture evaluate, lets the ?autotest=1 dolly tour run (including the
 * close-range hold that reproduces the reported lag), and collects page-side
 * [BelowPerf] samples plus compositor-side `adb logcat -s VrApi` FPS/Stale
 * lines per variant. Writes scripts/perf-results/<timestamp>/report.md.
 *
 * Prereqs:
 *   - Node >= 22 (built-in fetch + WebSocket, zero deps)
 *   - adb on PATH, headset in developer mode and paired
 *   - `npm run dev:tileset` serving on PORT (default 5173)
 *
 * Usage:
 *   node scripts/quest-perf-test.mjs                 # full A/B matrix
 *   node scripts/quest-perf-test.mjs baseline logdepth
 *   PORT=5173 node scripts/quest-perf-test.mjs
 */

import { execFileSync, spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PORT = process.env.PORT || '5173';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}/examples/tileset/`;
const RUN_TIMEOUT_MS = 180000;
const VARIANTS = {
  baseline: '',
  'profile-standalone': 'vrprofile=standalone',
  'profile-pcvr': 'vrprofile=pcvr',
  logdepth: 'logdepth=1',
  'idle-off': 'idle=0',
  'per-eye': 'pereye=1',
  'shadows-full': 'shadows=full',
  'shadowcasters-all': 'shadowmode=all',
  'shadowcasters-36': 'shadowtiles=36&shadowradius=6',
  'tileshadows-off': 'tileshadows=0',
  lambert: 'lambert=1',
  'errfloor-4': 'errfloor=4',
  'errfloor-16': 'errfloor=16',
  'errfloor-20': 'errfloor=20',
  'vrtris-550k': 'vrtris=550000',
  'xrscale-0.9': 'xrscale=0.9',
  'xrscale-0.85': 'xrscale=0.85'
};

const adb = (...args) => execFileSync('adb', args, { encoding: 'utf8' });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const shellQuote = (value) => `'${String(value).replaceAll("'", "'\\''")}'`;

// ---------------------------------------------------------------------------
// CDP client — minimal single-session wrapper over the built-in WebSocket.
// ---------------------------------------------------------------------------
class Cdp {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.nextId = 1;
    this.pending = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.addEventListener('open', () => resolve());
      this.ws.addEventListener('error', (event) => reject(new Error(`CDP socket error: ${event.message || 'connect failed'}`)));
      this.ws.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        if (message.id && this.pending.has(message.id)) {
          const { resolve: res, reject: rej } = this.pending.get(message.id);
          this.pending.delete(message.id);
          if (message.error) rej(new Error(message.error.message));
          else res(message.result);
        }
      });
    });
  }

  send(method, params = {}) {
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
    });
  }

  async eval(expression, { userGesture = false } = {}) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      userGesture,
      awaitPromise: true,
      returnByValue: true
    });
    if (result.exceptionDetails) {
      throw new Error(`Page exception: ${result.exceptionDetails.text} ${result.exceptionDetails.exception?.description || ''}`);
    }
    return result.result?.value;
  }

  close() {
    try { this.ws?.close(); } catch { /* already closed */ }
  }
}

// ---------------------------------------------------------------------------
// Device plumbing
// ---------------------------------------------------------------------------
function preflight() {
  let devices;
  try {
    devices = adb('devices');
  } catch {
    throw new Error('adb not found on PATH. Install Android platform-tools (`brew install android-platform-tools`).');
  }
  const attached = devices.split('\n').slice(1).filter((line) => line.trim().endsWith('device'));
  if (attached.length === 0) {
    throw new Error(
      'No headset attached. Enable developer mode, connect USB (or `adb connect <ip>:5555`), and accept the debugging prompt in the headset.'
    );
  }
  console.log(`✓ device: ${attached[0].split('\t')[0]}`);

  adb('reverse', `tcp:${PORT}`, `tcp:${PORT}`);
  console.log(`✓ adb reverse tcp:${PORT}`);

  adb('shell', 'input', 'keyevent', 'KEYCODE_WAKEUP');
  adb('shell', 'am', 'broadcast', '-a', 'com.oculus.vrpowermanager.automation_disable');
  adb('shell', 'am', 'broadcast', '-a', 'com.oculus.vrpowermanager.prox_close');
  console.log('✓ proximity override (headset stays awake on the desk)');
}

function restoreDevice() {
  try { adb('shell', 'am', 'broadcast', '-a', 'com.oculus.vrpowermanager.automation_enable'); } catch { /* best effort */ }
  try { adb('forward', '--remove-all'); } catch { /* best effort */ }
  try { adb('reverse', '--remove-all'); } catch { /* best effort */ }
}

function launchBrowser(url) {
  execFileSync(
    'adb',
    ['shell', `am start -a android.intent.action.VIEW -d ${shellQuote(url)} -p com.oculus.browser`],
    { encoding: 'utf8' }
  );
}

function forwardDevtools() {
  const unix = adb('shell', 'cat', '/proc/net/unix');
  const sockets = [...unix.matchAll(/@([\w.]*devtools_remote[\w.]*)/g)].map((m) => m[1]);
  if (sockets.length === 0) {
    throw new Error('No DevTools socket found — is Quest Browser running? (Try opening any page first.)');
  }
  // Prefer the browser's socket if several apps expose one.
  const socket = sockets.find((s) => /oculus|browser|chrome/i.test(s)) || sockets[0];
  adb('forward', 'tcp:9222', `localabstract:${socket}`);
  console.log(`✓ DevTools forwarded (${socket})`);
}

async function listTabs() {
  const response = await fetch('http://127.0.0.1:9222/json/list');
  return response.json();
}

async function closeTab(tab) {
  if (!tab?.id) return;
  try {
    await fetch(`http://127.0.0.1:9222/json/close/${encodeURIComponent(tab.id)}`);
  } catch {
    // Best effort; duplicate tabs are annoying, not fatal to the run.
  }
}

async function closeDuplicateTilesetTabs(keepTab) {
  const tabs = await listTabs();
  const duplicates = tabs.filter((tab) => (
    tab.type === 'page'
    && tab.id !== keepTab.id
    && tab.url.includes('/examples/tileset/')
  ));
  for (const tab of duplicates) {
    await closeTab(tab);
  }
  if (duplicates.length > 0) {
    console.log(`✓ closed ${duplicates.length} duplicate tileset tab${duplicates.length === 1 ? '' : 's'}`);
  }
}

async function findTab(urlFragment) {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    try {
      const tabs = await listTabs();
      const tab = tabs.find((t) => t.type === 'page' && t.url.includes(urlFragment));
      if (tab?.webSocketDebuggerUrl) return tab;
    } catch { /* devtools not ready yet */ }
    await sleep(1000);
  }
  throw new Error(`Tab matching "${urlFragment}" not found via CDP.`);
}

async function prepareBrowserTab(url) {
  try {
    forwardDevtools();
  } catch {
    launchBrowser(url);
    await sleep(6000);
    forwardDevtools();
  }

  let tab = null;
  try {
    tab = await findTab('examples/tileset');
  } catch {
    launchBrowser(url);
    await sleep(6000);
    forwardDevtools();
    tab = await findTab('examples/tileset');
  }

  await closeDuplicateTilesetTabs(tab);
  return tab;
}

// ---------------------------------------------------------------------------
// VrApi logcat collection (compositor truth: FPS + Stale frame counts)
// ---------------------------------------------------------------------------
function startVrApiCapture() {
  try { adb('logcat', '-c'); } catch { /* buffer clear is best-effort */ }
  const child = spawn('adb', ['logcat', '-s', 'VrApi'], { stdio: ['ignore', 'pipe', 'ignore'] });
  const lines = [];
  let buffer = '';
  child.stdout.on('data', (chunk) => {
    buffer += chunk.toString();
    let newline;
    while ((newline = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, newline);
      buffer = buffer.slice(newline + 1);
      const fps = line.match(/FPS=([\d.]+)/);
      const stale = line.match(/Stale=(\d+)/);
      if (fps) {
        lines.push({ fps: Number(fps[1]), stale: stale ? Number(stale[1]) : null });
      }
    }
  });
  return {
    stop() {
      child.kill('SIGTERM');
      return lines;
    }
  };
}

// ---------------------------------------------------------------------------
// One variant run
// ---------------------------------------------------------------------------
async function runVariant(name, extraParams) {
  const params = new URLSearchParams({ stats: '1', autotest: '1', run: String(Date.now()) });
  if (extraParams) {
    for (const pair of extraParams.split('&')) {
      const [key, value = '1'] = pair.split('=');
      params.set(key, value);
    }
  }
  const url = `${BASE_URL}?${params.toString()}`;
  console.log(`\n── ${name} ──────────────────────────────`);
  console.log(`   ${url}`);

  const tab = await prepareBrowserTab(url);
  const cdp = new Cdp(tab.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send('Runtime.enable');

  try {
    // Drive the same Quest Browser tab for every variant instead of opening
    // fresh tabs. Quest Browser keeps launched intents around aggressively.
    await cdp.eval('window.belowViewer?.renderer?.xr?.getSession()?.end()');
    await cdp.eval(`window.location.replace(${JSON.stringify(url)})`);
    await sleep(6000);

    // Wait for the viewer. The button is useful when present, but Quest
    // Browser can preserve old tabs where the helper rebuilds the button
    // asynchronously, so do not make the DOM id the only entry path.
    await waitFor(cdp, '!!(window.belowViewer?.renderer?.xr && window.belowViewer?.dolly)', 60000, 'viewer XR readiness');

    // Enter VR with a synthetic user gesture (nobody wearing the headset).
    let presenting = false;
    for (let attempt = 0; attempt < 5 && !presenting; attempt += 1) {
      await cdp.eval(`
        (document.getElementById('VRButton')
          || document.querySelector('button.vr-button--glass, button.vr-button-available, button[id*="VR"], button[class*="vr-button"]'))
          ?.click()
      `, { userGesture: true });
      await sleep(3000);
      presenting = await cdp.eval('!!(window.belowViewer && window.belowViewer.renderer.xr.isPresenting)');
    }
    if (!presenting) {
      // Fallback: request the session directly under a user gesture.
      await cdp.eval(
        'navigator.xr.requestSession(\'immersive-vr\', {optionalFeatures:[\'local-floor\',\'bounded-floor\']})' +
        '.then(s => window.belowViewer.renderer.xr.setSession(s))',
        { userGesture: true }
      );
      await sleep(3000);
      presenting = await cdp.eval('!!(window.belowViewer && window.belowViewer.renderer.xr.isPresenting)');
    }
    if (!presenting) {
      throw new Error('Could not enter VR via CDP — try `adb shell input tap` fallback or check headset state.');
    }
    console.log('✓ presenting in VR, tour starting');
    await cdp.eval('window.__startBelowTilesetAutotest?.()');
    await sleep(500);

    const vrapi = startVrApiCapture();
    const startMs = Date.now();
    let payload = null;
    while (Date.now() - startMs < RUN_TIMEOUT_MS) {
      await sleep(2000);
      payload = await cdp.eval('JSON.stringify({done: window.__autotestDone === true, phase: window.__autotestPhase, samples: window.__perfSamples || []})');
      const parsed = JSON.parse(payload);
      process.stdout.write(`\r   phase: ${parsed.phase || '…'}  samples: ${parsed.samples.length}   `);
      if (parsed.done) break;
    }
    console.log('');
    const vrapiLines = vrapi.stop();
    const parsed = JSON.parse(payload || '{}');
    if (!parsed.done) {
      console.warn('   ⚠ tour did not finish before timeout — partial data');
    }
    return { name, url, samples: parsed.samples || [], vrapi: vrapiLines };
  } finally {
    // Leave VR so the next variant starts clean.
    try { await cdp.eval('window.belowViewer?.renderer?.xr?.getSession()?.end()'); } catch { /* session may be gone */ }
    cdp.close();
  }
}

async function waitFor(cdp, expression, timeoutMs, label) {
  const startMs = Date.now();
  while (Date.now() - startMs < timeoutMs) {
    if (await cdp.eval(expression)) return;
    await sleep(1000);
  }
  throw new Error(`Timed out waiting for ${label}`);
}

// ---------------------------------------------------------------------------
// Reporting
// ---------------------------------------------------------------------------
const median = (values) => {
  if (values.length === 0) return null;
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

function summarize(result) {
  const closeSamples = result.samples.filter((s) => s.phase === 'close-hold' || s.phase === 'close-run');
  const use = closeSamples.length > 0 ? closeSamples : result.samples;
  const stale = result.vrapi.map((l) => l.stale).filter((v) => v !== null);
  return {
    variant: result.name,
    samples: result.samples.length,
    fps: median(use.map((s) => s.fps).filter(Number.isFinite)),
    frameMsP95: median(use.map((s) => s.frameMsP95).filter(Number.isFinite)),
    calls: median(use.map((s) => s.calls).filter(Number.isFinite)),
    triangles: median(use.map((s) => s.triangles).filter(Number.isFinite)),
    errorTarget: median(use.map((s) => s.tiles?.tilesets?.[0]?.errorTarget).filter(Number.isFinite)),
    vrProfile: use.find((s) => s.tiles?.tilesets?.[0]?.vrProfile)?.tiles?.tilesets?.[0]?.vrProfile ?? null,
    tilesVisible: median(use.map((s) => s.tiles?.tilesets?.[0]?.visible).filter(Number.isFinite)),
    shadowCasters: median(use.map((s) => s.tiles?.tilesets?.[0]?.shadowCasters).filter(Number.isFinite)),
    vrapiFps: median(result.vrapi.map((l) => l.fps)),
    vrapiStaleTotal: stale.length > 0 ? stale.reduce((a, b) => a + b, 0) : null
  };
}

function writeReport(dir, summaries, results) {
  const header = '| variant | profile | fps (page) | frame ms p95 | draw calls | tris | errorTarget | tiles vis | shadow casters | VrApi FPS | Stale total |';
  const divider = '|---|---|---|---|---|---|---|---|---|---|---|';
  const rows = summaries.map((s) => `| ${s.variant} | ${s.vrProfile ?? '-'} | ${s.fps ?? '-'} | ${s.frameMsP95 ?? '-'} | ${s.calls ?? '-'} | ${s.triangles ? (s.triangles / 1e6).toFixed(2) + 'M' : '-'} | ${s.errorTarget ?? '-'} | ${s.tilesVisible ?? '-'} | ${s.shadowCasters ?? '-'} | ${s.vrapiFps ?? '-'} | ${s.vrapiStaleTotal ?? '-'} |`);

  const report = [
    '# Quest tileset perf report',
    '',
    `Generated ${new Date().toISOString()} — medians over close-hold plus close-run phases (near-wreck stress path).`,
    '',
    header,
    divider,
    ...rows,
    '',
    'Raw per-second samples in `raw.json`. Stale > 0 means the compositor reprojected (dropped) frames.'
  ].join('\n');

  writeFileSync(join(dir, 'report.md'), report);
  writeFileSync(join(dir, 'raw.json'), JSON.stringify(results, null, 2));
  console.log(`\n${report}\n\nWritten to ${dir}`);
}

// ---------------------------------------------------------------------------
async function main() {
  const requested = process.argv.slice(2);
  const names = requested.length > 0 ? requested : Object.keys(VARIANTS);
  for (const name of names) {
    if (!(name in VARIANTS)) {
      throw new Error(`Unknown variant "${name}". Available: ${Object.keys(VARIANTS).join(', ')}`);
    }
  }

  preflight();

  const results = [];
  try {
    for (const name of names) {
      results.push(await runVariant(name, VARIANTS[name]));
      await sleep(3000);
    }
  } finally {
    restoreDevice();
  }

  const dir = join('scripts', 'perf-results', new Date().toISOString().replace(/[:.]/g, '-'));
  mkdirSync(dir, { recursive: true });
  writeReport(dir, results.map(summarize), results);
}

main().catch((error) => {
  console.error(`\n✗ ${error.message}`);
  restoreDevice();
  process.exit(1);
});
