export const DEFAULT_DRACO_DECODER_PATH = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/';
export const DEFAULT_KTX2_TRANSCODER_PATH = 'https://cdn.jsdelivr.net/npm/three@0.177.0/examples/jsm/libs/basis/';
export const DEFAULT_WEBXR_INPUT_PROFILES_PATH = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';

export function withTrailingSlash(path) {
  if (typeof path !== 'string' || path.length === 0) {
    return path;
  }

  return path.endsWith('/') ? path : `${path}/`;
}

export function withoutTrailingSlash(path) {
  if (typeof path !== 'string' || path.length === 0) {
    return path;
  }

  return path.replace(/\/+$/, '');
}

export function joinAssetPath(basePath, relativePath) {
  if (typeof basePath !== 'string' || basePath.length === 0) {
    return relativePath;
  }

  return `${withTrailingSlash(basePath)}${relativePath.replace(/^\/+/, '')}`;
}

export function resolveAssetPaths(options = {}, defaults = {}) {
  const basePath = options.assetBasePath;
  const hasBasePath = typeof basePath === 'string' && basePath.length > 0;

  const resolved = {
    dracoDecoderPath: defaults.dracoDecoderPath || DEFAULT_DRACO_DECODER_PATH,
    ktx2TranscoderPath: defaults.ktx2TranscoderPath || DEFAULT_KTX2_TRANSCODER_PATH,
    webxrInputProfilesPath: defaults.webxrInputProfilesPath || DEFAULT_WEBXR_INPUT_PROFILES_PATH
  };

  if (hasBasePath) {
    resolved.dracoDecoderPath = joinAssetPath(basePath, 'draco/1.5.6/');
    resolved.ktx2TranscoderPath = joinAssetPath(basePath, 'three/basis/');
    resolved.webxrInputProfilesPath = joinAssetPath(basePath, 'webxr-input-profiles/assets/1.0/profiles');
  }

  if (typeof options.dracoDecoderPath === 'string' && options.dracoDecoderPath.length > 0) {
    resolved.dracoDecoderPath = options.dracoDecoderPath;
  }

  if (typeof options.ktx2TranscoderPath === 'string' && options.ktx2TranscoderPath.length > 0) {
    resolved.ktx2TranscoderPath = options.ktx2TranscoderPath;
  }

  if (typeof options.webxrInputProfilesPath === 'string' && options.webxrInputProfilesPath.length > 0) {
    resolved.webxrInputProfilesPath = options.webxrInputProfilesPath;
  }

  return {
    dracoDecoderPath: withTrailingSlash(resolved.dracoDecoderPath),
    ktx2TranscoderPath: withTrailingSlash(resolved.ktx2TranscoderPath),
    webxrInputProfilesPath: withoutTrailingSlash(resolved.webxrInputProfilesPath)
  };
}
