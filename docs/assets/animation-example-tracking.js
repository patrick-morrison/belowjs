/**
 * Animation example analytics for BelowJS docs site.
 * Replace/remove for your own deployment.
 */
(function () {
  const getAnimationMetrics = () => {
    const timeDisplay = document.getElementById('timeDisplay');
    const resolutionSelect = document.getElementById('resolutionSelect');
    const aspectSelect = document.getElementById('aspectSelect');
    const modeToggle = document.getElementById('modeToggle');
    const keyframeCount = document.querySelectorAll('.keyframe-marker').length;

    let durationSeconds = null;
    if (timeDisplay && typeof timeDisplay.textContent === 'string') {
      const match = timeDisplay.textContent.match(/\/\s*([0-9]+(?:\.[0-9]+)?)/);
      if (match) durationSeconds = Number(match[1]);
    }

    const resolution = resolutionSelect && resolutionSelect.value
      ? Number(resolutionSelect.value)
      : null;

    return {
      durationSeconds: Number.isFinite(durationSeconds) ? durationSeconds : null,
      keyframeCount,
      resolution: Number.isFinite(resolution) ? resolution : null,
      aspectRatio: aspectSelect && aspectSelect.value ? aspectSelect.value : null,
      mode: modeToggle && modeToggle.checked ? 'orbit' : 'timeline'
    };
  };

  const send = (eventName, data = {}) => {
    try {
      if (window.trackDocsEvent && typeof window.trackDocsEvent === 'function') {
        window.trackDocsEvent(eventName, { surface: 'example_animation', ...data });
        return;
      }
      if (window.umami && typeof window.umami.track === 'function') {
        window.umami.track(eventName, {
          page: window.location.pathname,
          surface: 'example_animation',
          ...data
        });
      }
    } catch (_err) {
      // Silent fail.
    }
  };

  const on = (eventType, selector, handler) => {
    document.addEventListener(eventType, (event) => {
      const target = event.target && event.target.closest ? event.target.closest(selector) : null;
      if (!target) return;
      handler(target, event);
    });
  };

  on('click', '#playBtn', () => {
    setTimeout(() => {
      const pauseIcon = document.querySelector('#playBtn .pause-icon');
      const isPlaying = pauseIcon && pauseIcon.style.display !== 'none';
      send('docs_animation_play_toggle', { state: isPlaying ? 'playing' : 'paused' });
    }, 0);
  });

  on('change', '#modeToggle', (target) => {
    send('docs_animation_mode_change', { mode: target.checked ? 'orbit' : 'timeline' });
  });

  on('click', '#exportBtn', () => send('docs_animation_export_open'));
  on('click', '#exportFull', () => send('docs_animation_export_start', {
    type: 'full',
    ...getAnimationMetrics()
  }));
  on('click', '#exportSegments', () => send('docs_animation_export_start', {
    type: 'segments',
    ...getAnimationMetrics()
  }));
  on('click', '#exportShareAction', () => send('docs_animation_export_complete_action', { action: 'share' }));
  on('click', '#exportDoneAction', () => send('docs_animation_export_complete_action', { action: 'done' }));

  on('click', '#saveBtn', () => send('docs_animation_save_open'));
  on('click', '#saveDataOption', () => send('docs_animation_save_mode', { mode: 'data' }));
  on('click', '#saveExportOption', () => send('docs_animation_save_mode', { mode: 'export' }));
  on('click', '#saveConfirm', () => {
    const filenameInput = document.getElementById('saveFilename');
    const filename = filenameInput && filenameInput.value ? filenameInput.value : 'animation_data';
    send('docs_animation_save_confirm', { filename });
  });

  on('click', '#loadBtn', () => send('docs_animation_load_open'));
  on('click', '#loadDataOption', () => send('docs_animation_load_mode', { mode: 'data' }));
  on('click', '#loadModelOption', () => send('docs_animation_load_mode', { mode: 'model' }));

  const loadInput = document.getElementById('loadInput');
  if (loadInput) {
    loadInput.addEventListener('change', () => {
      const file = loadInput.files && loadInput.files[0];
      send('docs_animation_load_file_selected', {
        kind: 'data',
        extension: file && file.name && file.name.includes('.')
          ? file.name.split('.').pop().toLowerCase()
          : 'unknown'
      });
    });
  }

  const modelInput = document.getElementById('modelInput');
  if (modelInput) {
    modelInput.addEventListener('change', () => {
      const file = modelInput.files && modelInput.files[0];
      send('docs_animation_load_file_selected', {
        kind: 'model',
        extension: file && file.name && file.name.includes('.')
          ? file.name.split('.').pop().toLowerCase()
          : 'unknown'
      });
    });
  }
})();
