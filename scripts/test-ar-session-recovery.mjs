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
      setTimeout(() => {
        if (this.session !== session) return;
        this.session = null;
        this.dispatchEvent(new Event('sessionend'));
      }, 0);
    }, { once: true });
    this.dispatchEvent(new Event('sessionstart'));
  }
}

class FakeSession extends EventTarget {
  constructor(visibilityState = 'visible') {
    super();
    this.visibilityState = visibilityState;
    this.ended = false;
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
const replacement = new FakeSession('visible');
let offers = 0;
let requests = 0;

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
      async offerSession(mode, init) {
        assert.equal(mode, 'immersive-ar');
        assert.deepEqual(init.requiredFeatures, ['local']);
        offers += 1;
        return replacement;
      }
    }
  }
});

try {
  const core = new ARCore(renderer, camera, {}, {});
  core.sessionInit = {
    requiredFeatures: ['local'],
    optionalFeatures: ['hand-tracking']
  };
  core.sessionRecoveryDelayMs = 15;
  core.setupSessionListeners();

  await core.requestARSession();
  assert.equal(requests, 1);
  assert.equal(core.isARPresenting, true);

  const initial = new FakeSession('visible');
  await xrManager.setSession(initial);
  assert.equal(core.activeSession, initial);
  assert.equal(core.isQuest3, true);

  initial.setVisibility('hidden');
  await new Promise((resolve) => setTimeout(resolve, 40));

  assert.equal(initial.ended, true);
  assert.equal(offers, 1);
  assert.equal(xrManager.getSession(), replacement);
  assert.equal(core.activeSession, replacement);

  const duplicateOffer = core.offerARSession();
  assert.equal(duplicateOffer, null);
  assert.equal(offers, 1);

  const recovered = new ARCore(renderer, camera, {}, {});
  recovered.sessionInit = core.sessionInit;
  recovered.sessionRecoveryDelayMs = 15;
  recovered.isQuest3 = true;
  recovered.activeSession = replacement;
  recovered.scheduleStalledSessionRecovery(replacement);
  replacement.setVisibility('visible');
  await new Promise((resolve) => setTimeout(resolve, 30));
  assert.equal(offers, 1);

  core.dispose();
  recovered.dispose();
  console.log('AR stalled-session recovery: ok');
} finally {
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: previousNavigator
  });
}
