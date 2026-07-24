import assert from 'node:assert/strict';
import { ARCore } from '../src/ar/core/ARCore.js';

class FakeXRManager extends EventTarget {
  constructor() {
    super();
    this.session = null;
  }

  getSession() {
    return this.session;
  }

  async setSession(session) {
    this.session = session;
    session.addEventListener('end', () => {
      if (this.session !== session) return;
      this.session = null;
      this.dispatchEvent(new Event('sessionend'));
    }, { once: true });
    this.dispatchEvent(new Event('sessionstart'));
  }
}

class FakeSession extends EventTarget {
  constructor(visibilityState = 'visible') {
    super();
    this.visibilityState = visibilityState;
    this.inputSources = [];
    this.ended = false;
    this.nextFrameId = 1;
    this.frameCallbacks = new Map();
  }

  requestAnimationFrame(callback) {
    const id = this.nextFrameId++;
    this.frameCallbacks.set(id, callback);
    return id;
  }

  cancelAnimationFrame(id) {
    this.frameCallbacks.delete(id);
  }

  fireFrame() {
    const callbacks = Array.from(this.frameCallbacks.values());
    this.frameCallbacks.clear();
    callbacks.forEach((callback) => callback(performance.now(), {}));
  }

  setVisibility(visibilityState) {
    this.visibilityState = visibilityState;
    this.dispatchEvent(new Event('visibilitychange'));
  }

  async end() {
    this.ended = true;
    this.dispatchEvent(new Event('end'));
  }
}

const previousNavigator = globalThis.navigator;
const xrManager = new FakeXRManager();
const renderer = { xr: xrManager };
const camera = { far: 1000, updateProjectionMatrix() {} };
let requests = 0;
let offers = 0;
let pauses = 0;
let resumes = 0;

Object.defineProperty(globalThis, 'navigator', {
  configurable: true,
  value: {
    userAgent: 'Mozilla/5.0 (X11; Android) OculusBrowser Quest 3',
    xr: {
      async requestSession(mode, init) {
        assert.equal(mode, 'immersive-ar');
        assert.deepEqual(init.requiredFeatures, ['local']);
        requests += 1;
        return new FakeSession('visible');
      },
      offerSession(mode, init) {
        assert.equal(mode, 'immersive-ar');
        assert.deepEqual(init.requiredFeatures, ['local']);
        offers += 1;
        return new Promise(() => {});
      }
    }
  }
});

try {
  const core = new ARCore(renderer, camera, {}, {});
  core.failedResumeMinHiddenMs = 30;
  core.failedResumeWindowMs = 100;
  core.failedResumeValidationMs = 20;
  core.longHiddenRecoveryMs = 60;
  core.frameStallRecoveryMs = 10000;
  core.frameStallValidationMs = 10;
  core.frameStallPollMs = 10;
  core.sessionInit = {
    requiredFeatures: ['local'],
    optionalFeatures: ['hand-tracking']
  };
  core.setupSessionListeners();
  core.onSessionPause = () => { pauses += 1; };
  core.onSessionResume = () => { resumes += 1; };

  await core.requestARSession();
  assert.equal(requests, 1);
  assert.equal(core.isARPresenting, true);

  const active = xrManager.getSession();
  assert.ok(active);
  assert.equal(core.activeSession, active);
  assert.equal(core.isQuest3, true);

  active.setVisibility('hidden');
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(active.ended, false);
  assert.equal(xrManager.getSession(), active);
  assert.equal(pauses, 1);

  active.setVisibility('visible');
  assert.equal(resumes, 1);
  assert.equal(core.isARPresenting, true);

  xrManager.session = null;
  xrManager.dispatchEvent(new Event('sessionend'));
  await new Promise((resolve) => setTimeout(resolve, 0));
  assert.equal(requests, 1);
  assert.equal(core.isARPresenting, false);
  assert.equal(core.activeSession, null);
  assert.equal(xrManager.getSession(), null);
  assert.equal(offers, 1);

  await core.requestARSession();
  assert.equal(requests, 2);
  assert.equal(core.isARPresenting, true);
  const failedResume = core.activeSession;
  assert.ok(failedResume);

  failedResume.setVisibility('hidden');
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(failedResume.ended, false);
  failedResume.setVisibility('visible');
  failedResume.setVisibility('hidden');
  await new Promise((resolve) => setTimeout(resolve, 40));
  assert.equal(failedResume.ended, true);
  assert.equal(core.activeSession, null);
  assert.equal(core.recoverySuggested, true);

  await core.requestARSession();
  assert.equal(requests, 3);
  assert.equal(core.recoverySuggested, false);
  assert.ok(core.activeSession);

  const longHidden = core.activeSession;
  longHidden.setVisibility('hidden');
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.equal(longHidden.ended, true);
  assert.equal(core.activeSession, null);
  assert.equal(core.recoverySuggested, true);

  await core.requestARSession();
  assert.equal(requests, 4);
  const frameStalled = core.activeSession;
  core.frameStallRecoveryMs = 40;
  await new Promise((resolve) => setTimeout(resolve, 80));
  assert.equal(frameStalled.visibilityState, 'visible');
  assert.equal(frameStalled.ended, true);
  assert.equal(core.activeSession, null);
  assert.equal(core.recoverySuggested, true);

  core.dispose();
  console.log('AR native offer, brief-bounce guard, prolonged-hidden/frame-stall guards, and explicit restart lifecycle: ok');
} finally {
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: previousNavigator
  });
}
