const STANDALONE_PROFILE = {
  name: 'standalone',
  vr: {
    framebufferScaleFactor: 0.9,
    foveation: 1,
    shadowProfile: 'reduced'
  },
  tileset: {
    vrMaxTriangles: 750000,
    vrErrorTargetFloor: 16,
    vrShadowCasterMode: 'near',
    vrMaxShadowCastingTiles: 72,
    vrShadowCasterRadius: 8
  }
};

const PCVR_PROFILE = {
  name: 'pcvr',
  vr: {
    framebufferScaleFactor: 1.15,
    foveation: 0,
    shadowProfile: 'full'
  },
  tileset: {
    vrMaxTriangles: 2400000,
    vrErrorTargetFloor: 4,
    vrShadowCasterMode: 'all',
    vrMaxShadowCastingTiles: 256,
    vrShadowCasterRadius: 16
  }
};

const PROFILES = {
  standalone: STANDALONE_PROFILE,
  quest: STANDALONE_PROFILE,
  mobile: STANDALONE_PROFILE,
  pcvr: PCVR_PROFILE,
  desktop: PCVR_PROFILE,
  high: PCVR_PROFILE
};

export function detectXRPerformanceClass() {
  if (typeof navigator === 'undefined') return 'standalone';

  const ua = navigator.userAgent || '';
  const platform = navigator.platform || '';
  const hasTouch = navigator.maxTouchPoints > 0;
  const isQuest = /OculusBrowser|Quest|Meta Quest|Horizon/i.test(ua);
  const isMobile = /Android|Mobile|iPhone|iPad|iPod/i.test(ua)
    || (/MacIntel/i.test(platform) && hasTouch);

  return (isQuest || isMobile) ? 'standalone' : 'pcvr';
}

export function resolveXRPerformanceProfile(profile = 'auto') {
  const key = String(profile || 'auto').toLowerCase();
  if (key === 'auto') {
    return PROFILES[detectXRPerformanceClass()];
  }
  return PROFILES[key] || STANDALONE_PROFILE;
}

export function applyVRRenderProfileDefaults(vrConfig = {}, requestedProfile = 'auto', explicitVRConfig = {}) {
  const resolved = resolveXRPerformanceProfile(requestedProfile);
  return {
    ...vrConfig,
    performanceProfile: requestedProfile || 'auto',
    resolvedPerformanceProfile: resolved.name,
    framebufferScaleFactor: typeof explicitVRConfig.framebufferScaleFactor === 'number'
      ? vrConfig.framebufferScaleFactor
      : resolved.vr.framebufferScaleFactor,
    foveation: typeof explicitVRConfig.foveation === 'number'
      ? vrConfig.foveation
      : resolved.vr.foveation,
    shadowProfile: typeof explicitVRConfig.shadowProfile === 'string'
      ? vrConfig.shadowProfile
      : resolved.vr.shadowProfile
  };
}

export function applyTilesetVRProfileDefaults(options = {}) {
  const resolved = resolveXRPerformanceProfile(
    options.vrPerformanceProfile || options.resolvedVRPerformanceProfile || 'auto'
  );
  const defaults = resolved.tileset;
  return {
    resolvedVRPerformanceProfile: resolved.name,
    vrMaxTriangles: (typeof options.vrMaxTriangles === 'number' && options.vrMaxTriangles > 0)
      ? options.vrMaxTriangles
      : defaults.vrMaxTriangles,
    vrErrorTargetFloor: (typeof options.vrErrorTargetFloor === 'number' && options.vrErrorTargetFloor >= 0)
      ? options.vrErrorTargetFloor
      : defaults.vrErrorTargetFloor,
    vrShadowCasterMode: ['all', 'near', 'none'].includes(options.vrShadowCasterMode)
      ? options.vrShadowCasterMode
      : defaults.vrShadowCasterMode,
    vrMaxShadowCastingTiles: (typeof options.vrMaxShadowCastingTiles === 'number' && options.vrMaxShadowCastingTiles > 0)
      ? Math.floor(options.vrMaxShadowCastingTiles)
      : defaults.vrMaxShadowCastingTiles,
    vrShadowCasterRadius: (typeof options.vrShadowCasterRadius === 'number' && options.vrShadowCasterRadius > 0)
      ? options.vrShadowCasterRadius
      : defaults.vrShadowCasterRadius
  };
}
