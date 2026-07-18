#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

const PORT = process.env.PORT || '5173';
const MODEL_PORT = process.env.MODEL_PORT || '';
const TILESET_URL = process.env.TILESET_URL || '';
const OUTPUT = process.env.OUTPUT || '/private/tmp/belowjs-paths/route.json';
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}/examples/tileset/`;
const adb = (...args) => execFileSync('adb', args, { encoding: 'utf8' });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Cdp {
  constructor(wsUrl) {
    this.wsUrl = wsUrl;
    this.nextId = 1;
    this.pending = new Map();
  }

  connect() {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(this.wsUrl);
      this.ws.addEventListener('open', resolve);
      this.ws.addEventListener('error', () => reject(new Error('CDP connection failed')));
      this.ws.addEventListener('message', (event) => {
        const message = JSON.parse(event.data);
        if (!message.id || !this.pending.has(message.id)) return;
        const pending = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
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
      throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    }
    return result.result?.value;
  }

  close() {
    this.ws?.close();
  }
}

function preflight() {
  const devices = adb('devices').split('\n').slice(1).filter((line) => line.trim().endsWith('device'));
  if (devices.length === 0) throw new Error('No Quest headset is attached.');
  adb('reverse', `tcp:${PORT}`, `tcp:${PORT}`);
  if (MODEL_PORT && MODEL_PORT !== PORT) adb('reverse', `tcp:${MODEL_PORT}`, `tcp:${MODEL_PORT}`);
  adb('shell', 'input', 'keyevent', 'KEYCODE_WAKEUP');
  adb('shell', 'am', 'broadcast', '-a', 'com.oculus.vrpowermanager.automation_disable');
  adb('shell', 'am', 'broadcast', '-a', 'com.oculus.vrpowermanager.prox_close');
  const sockets = [...adb('shell', 'cat', '/proc/net/unix').matchAll(/@([\w.]*devtools_remote[\w.]*)/g)].map((match) => match[1]);
  const socket = sockets.find((value) => /oculus|browser|chrome/i.test(value)) || sockets[0];
  if (!socket) throw new Error('Quest Browser is not running.');
  adb('forward', 'tcp:9222', `localabstract:${socket}`);
}

async function getExistingTab() {
  const tabs = await fetch('http://127.0.0.1:9222/json/list').then((response) => response.json());
  const tab = tabs.find((candidate) => candidate.type === 'page' && candidate.webSocketDebuggerUrl);
  if (!tab) throw new Error('No existing Quest Browser tab is available.');
  return tab;
}

async function waitFor(cdp, expression, timeoutMs, label) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await cdp.eval(expression)) return;
    await sleep(1000);
  }
  throw new Error(`Timed out waiting for ${label}.`);
}

async function endSession(cdp) {
  await cdp.eval(`
    (() => {
      const session = window.belowViewer?.renderer?.xr?.getSession?.();
      session?.end().catch(() => {});
      return true;
    })()
  `);
  await sleep(2000);
}

async function enterVR(cdp) {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    await cdp.eval(`
      (document.getElementById('VRButton')
        || document.querySelector('button.vr-button--glass, button.vr-button-available, button[id*="VR"], button[class*="vr-button"]'))
        ?.click()
    `, { userGesture: true });
    await sleep(2500);
    if (await cdp.eval('window.belowViewer?.renderer?.xr?.isPresenting === true')) return;
  }
  throw new Error('Could not enter immersive VR.');
}

function waitForStopSignal() {
  return new Promise((resolve) => {
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', (value) => {
      process.stdin.pause();
      resolve(value);
    });
    process.once('SIGINT', resolve);
  });
}

async function recordPath(cdp, samples, state) {
  const startedAt = Date.now();
  while (state.recording) {
    try {
      const sample = await cdp.eval(`
        (() => {
          const viewer = window.belowViewer;
          const dolly = viewer?.dolly;
          const xrCamera = viewer?.renderer?.xr?.getCamera?.(viewer.cameraManager?.camera);
          if (!dolly || !xrCamera) return null;
          dolly.updateMatrixWorld?.(true);
          xrCamera.updateMatrixWorld?.(true);
          const perf = window.__belowPerf || {};
          return {
            dollyPosition: dolly.position.toArray(),
            dollyQuaternion: dolly.quaternion.toArray(),
            headsetMatrix: xrCamera.matrixWorld.elements.slice(),
            presenting: viewer.renderer.xr.isPresenting === true,
            fps: perf.fps ?? null,
            frameMsP95: perf.frameMsP95 ?? null,
            drawCalls: perf.calls ?? null,
            triangles: perf.triangles ?? null,
            tiles: perf.tiles ?? null
          };
        })()
      `);
      if (sample) samples.push({ t: Date.now() - startedAt, ...sample });
    } catch {
      samples.push({ t: Date.now() - startedAt, unavailable: true });
    }
    await sleep(200);
  }
}

async function main() {
  preflight();
  const tab = await getExistingTab();
  const cdp = new Cdp(tab.webSocketDebuggerUrl);
  await cdp.connect();
  await cdp.send('Runtime.enable');

  try {
    await endSession(cdp);
    const params = new URLSearchParams({ stats: '1', record: '1', run: String(Date.now()) });
    if (TILESET_URL) params.set('url', TILESET_URL);
    await cdp.eval(`window.location.replace(${JSON.stringify(`${BASE_URL}?${params}`)})`);
    await sleep(5000);
    await waitFor(
      cdp,
      '!!(window.belowViewer?.renderer?.xr && window.belowViewer?.dolly && window.belowViewer?.loadedModels?.length)',
      120000,
      'tileset and XR viewer'
    );
    await enterVR(cdp);

    const samples = [];
    const state = { recording: true };
    const recording = recordPath(cdp, samples, state);
    console.log('RECORDING_READY');
    console.log('Fly naturally, then send a newline to stop.');
    await waitForStopSignal();
    state.recording = false;
    await recording;

    const bounds = await cdp.eval(`
      (() => {
        const model = window.belowViewer?.loadedModels?.[0]?.model;
        const box = model?.userData?.boundingBox;
        return box ? { min: box.min.toArray(), max: box.max.toArray() } : null;
      })()
    `);
    const payload = JSON.stringify({ version: 1, intervalMs: 200, bounds, samples });
    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(OUTPUT, `${payload}\n`);
    const count = samples.length;
    console.log(`RECORDED ${count} samples to ${OUTPUT}`);
    await endSession(cdp);
  } finally {
    cdp.close();
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
