/**
 * Navigation functionality for BelowJS static site
 */

function trackDocsEvent(eventName, data = {}) {
    if (typeof window === 'undefined') return;
    if (!window.umami || typeof window.umami.track !== 'function') return;

    try {
        window.umami.track(eventName, {
            page: window.location.pathname,
            ...data
        });
    } catch (_err) {
        // Silent fail: analytics should never break docs UX
    }
}

function classifyLinkContext(link) {
    if (link.closest('.nav-links')) return 'nav_desktop';
    if (link.closest('.nav-mobile')) return 'nav_mobile';
    if (link.closest('.cta-buttons')) return 'cta';
    if (link.closest('.example-links')) return 'example_links';
    if (link.closest('.feature-item')) return 'feature_item';
    return 'content';
}

function extractLinkLabel(link) {
    const preferred = link.getAttribute('aria-label') || link.title || link.textContent || '';
    return preferred.trim().replace(/\s+/g, ' ').slice(0, 80) || 'unlabeled';
}

function toAbsoluteUrl(href) {
    try {
        return new URL(href, window.location.href);
    } catch (_err) {
        return null;
    }
}

const instrumentedDocuments = new WeakSet();
const viewerThrottleState = new Map();
const instrumentedViewerInstances = new WeakSet();
const viewerInteractionState = new Map();

function shouldTrackViewerEvent(eventKey, minIntervalMs) {
    const now = Date.now();
    const lastSeen = viewerThrottleState.get(eventKey) || 0;
    if (now - lastSeen < minIntervalMs) return false;
    viewerThrottleState.set(eventKey, now);
    return true;
}

function sanitizeErrorMessage(errorLike) {
    if (!errorLike) return 'unknown';

    if (typeof errorLike === 'string') {
        return errorLike.slice(0, 140);
    }

    if (errorLike.error) {
        return sanitizeErrorMessage(errorLike.error);
    }

    if (typeof errorLike.message === 'string') {
        return errorLike.message.slice(0, 140);
    }

    try {
        return String(errorLike).slice(0, 140);
    } catch (_err) {
        return 'unknown';
    }
}

function normalizeModelUrl(urlValue) {
    if (!urlValue || typeof urlValue !== 'string') return 'unknown';
    if (urlValue.startsWith('blob:')) return 'blob';
    try {
        const resolved = new URL(urlValue, window.location.href);
        return resolved.pathname || 'unknown';
    } catch (_err) {
        return urlValue.slice(0, 120);
    }
}

function bindViewerInstanceEvents(viewer, trackViewerEvent) {
    if (!viewer || typeof viewer.on !== 'function' || instrumentedViewerInstances.has(viewer)) {
        return false;
    }

    instrumentedViewerInstances.add(viewer);

    let loadStartedAt = 0;
    let lastLoadUrl = 'unknown';

    viewer.on('model-load-start', (data) => {
        loadStartedAt = Date.now();
        lastLoadUrl = normalizeModelUrl(data && data.url);
    });

    viewer.on('model-loaded', (data) => {
        if (!loadStartedAt) return;
        const durationMs = Date.now() - loadStartedAt;
        trackViewerEvent('docs_viewer_model_load_time', {
            durationMs,
            url: normalizeModelUrl((data && data.url) || lastLoadUrl)
        });
        loadStartedAt = 0;
    });

    viewer.on('model-load-error', (data) => {
        const durationMs = loadStartedAt ? Date.now() - loadStartedAt : null;
        trackViewerEvent('docs_viewer_load_error', {
            type: 'model-load',
            durationMs,
            url: normalizeModelUrl((data && data.url) || lastLoadUrl),
            message: sanitizeErrorMessage(data)
        });
        loadStartedAt = 0;
    });

    viewer.on('error', (data) => {
        trackViewerEvent('docs_viewer_load_error', {
            type: 'viewer',
            message: sanitizeErrorMessage(data)
        });
    });

    return true;
}

function bindViewerTracking(doc, surface = 'page') {
    if (!doc || instrumentedDocuments.has(doc)) return;
    instrumentedDocuments.add(doc);

    const targetWindow = doc.defaultView || window;
    let viewerPath = window.location.pathname;
    try {
        viewerPath = targetWindow.location.pathname || viewerPath;
    } catch (_err) {
        // Keep fallback if iframe location is unavailable
    }

    const trackViewerEvent = (eventName, data = {}) => {
        trackDocsEvent(eventName, {
            surface,
            viewerPath,
            ...data
        });
    };
    const scopeKey = `${surface}:${viewerPath}`;
    const state = viewerInteractionState.get(scopeKey) || {
        firstInteractionSent: false,
        engagedTimerSet: false
    };
    viewerInteractionState.set(scopeKey, state);

    const markViewerInteraction = (source) => {
        if (state.firstInteractionSent) return;
        state.firstInteractionSent = true;
        trackViewerEvent('docs_viewer_first_interaction', { source });

        if (state.engagedTimerSet) return;
        state.engagedTimerSet = true;
        targetWindow.setTimeout(() => {
            trackViewerEvent('docs_viewer_engaged_30s');
        }, 30000);
    };

    const tryBindViewerInstance = () => {
        try {
            return bindViewerInstanceEvents(targetWindow.modelViewer, trackViewerEvent);
        } catch (_err) {
            return false;
        }
    };

    if (!tryBindViewerInstance()) {
        let attempts = 0;
        const maxAttempts = 120; // 60s @ 500ms
        const pollId = targetWindow.setInterval(() => {
            attempts += 1;
            if (tryBindViewerInstance() || attempts >= maxAttempts) {
                targetWindow.clearInterval(pollId);
            }
        }, 500);
    }

    const isElementNode = (value) => Boolean(value && value.nodeType === 1);
    const isViewerCanvas = (element) => isElementNode(element) && element.tagName === 'CANVAS';
    const isTextInput = (element) => {
        if (!isElementNode(element)) return false;
        const tag = element.tagName;
        return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || element.isContentEditable;
    };

    doc.addEventListener('change', (event) => {
        const target = isElementNode(event.target) ? event.target : null;
        if (!target) return;

        if (target.matches('.mode-toggle__switch')) {
            markViewerInteraction('dive_toggle');
            trackViewerEvent('docs_viewer_dive_toggle', {
                mode: target.checked ? 'dive' : 'survey'
            });
            return;
        }

        if (target.matches('.model-selector__dropdown')) {
            markViewerInteraction('model_change');
            trackViewerEvent('docs_viewer_model_change', {
                modelKey: target.value || 'unknown'
            });
        }
    });

    doc.addEventListener('click', (event) => {
        const target = isElementNode(event.target) ? event.target : null;
        if (!target) return;

        if (target.closest('#screenshotButton, .screenshot-button')) {
            markViewerInteraction('screenshot');
            trackViewerEvent('docs_viewer_screenshot');
            return;
        }

        if (target.closest('#fullscreenButton, .fullscreen-button')) {
            markViewerInteraction('fullscreen');
            trackViewerEvent('docs_viewer_fullscreen_toggle');
            return;
        }

        const interactive = target.closest('button, a, [role="button"]');
        if (!interactive) return;

        const label = extractLinkLabel(interactive).toLowerCase();
        if (/\b(enter|exit|start)\s+(vr|ar)\b/.test(label)) {
            markViewerInteraction('xr_button');
            trackViewerEvent('docs_viewer_xr_button_click', { label });
        }
    });

    doc.addEventListener('pointerlockchange', () => {
        markViewerInteraction('fly_mode');
        trackViewerEvent('docs_viewer_fly_mode_change', {
            active: Boolean(doc.pointerLockElement)
        });
    });

    doc.addEventListener('keydown', (event) => {
        if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;
        if (isTextInput(event.target)) return;

        if (event.code === 'KeyZ') {
            markViewerInteraction('dive_shortcut');
            trackViewerEvent('docs_viewer_dive_shortcut');
            return;
        }
        if (event.code === 'KeyH') {
            markViewerInteraction('screenshot_shortcut');
            trackViewerEvent('docs_viewer_screenshot_shortcut');
            return;
        }
        if (event.code === 'KeyF' || (event.shiftKey && event.code === 'Backquote')) {
            markViewerInteraction('fly_shortcut');
            trackViewerEvent('docs_viewer_fly_shortcut');
        }
    });

    let isPointerDownOnCanvas = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let draggedEnough = false;
    const dragThreshold = 12;

    doc.addEventListener('pointerdown', (event) => {
        if (!isViewerCanvas(event.target)) return;
        isPointerDownOnCanvas = true;
        draggedEnough = false;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
    }, true);

    doc.addEventListener('pointermove', (event) => {
        if (!isPointerDownOnCanvas || draggedEnough) return;
        const dx = Math.abs(event.clientX - dragStartX);
        const dy = Math.abs(event.clientY - dragStartY);
        if (dx >= dragThreshold || dy >= dragThreshold) {
            draggedEnough = true;
        }
    }, true);

    const onPointerEnd = () => {
        if (!isPointerDownOnCanvas) return;
        isPointerDownOnCanvas = false;
        if (!draggedEnough) return;

        const throttleKey = `${surface}:${viewerPath}:orbit_drag`;
        if (shouldTrackViewerEvent(throttleKey, 1200)) {
            markViewerInteraction('orbit_drag');
            trackViewerEvent('docs_viewer_orbit_drag');
        }
    };

    doc.addEventListener('pointerup', onPointerEnd, true);
    doc.addEventListener('pointercancel', onPointerEnd, true);

    doc.addEventListener('wheel', (event) => {
        if (!isViewerCanvas(event.target)) return;
        const throttleKey = `${surface}:${viewerPath}:wheel_zoom`;
        if (!shouldTrackViewerEvent(throttleKey, 1200)) return;
        markViewerInteraction('zoom_wheel');
        trackViewerEvent('docs_viewer_zoom_wheel');
    }, { passive: true, capture: true });
}

function bindViewerTrackingToIframes() {
    const frames = document.querySelectorAll('iframe');
    frames.forEach((frame) => {
        const wireFrame = () => {
            let frameDoc = null;
            try {
                frameDoc = frame.contentDocument;
            } catch (_err) {
                return;
            }
            if (!frameDoc) return;

            const src = (frame.getAttribute('src') || '').toLowerCase();
            const surface = src.includes('demo.html') ? 'iframe_demo' : 'iframe';
            bindViewerTracking(frameDoc, surface);
        };

        frame.addEventListener('load', wireFrame);
        wireFrame();
    });
}

function toggleMobileNav() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.getElementById('nav-mobile');
    if (!toggle || !mobileNav) return;

    toggle.classList.toggle('active');
    mobileNav.classList.toggle('active');

    trackDocsEvent('docs_mobile_nav_toggle', {
        open: mobileNav.classList.contains('active')
    });
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(event) {
    const target = event.target instanceof Element ? event.target : null;
    const link = target ? target.closest('a[href]') : null;
    if (link) {
        const rawHref = link.getAttribute('href');
        if (rawHref && !rawHref.startsWith('#') && !rawHref.startsWith('javascript:')) {
            const url = toAbsoluteUrl(rawHref);
            if (url) {
                const context = classifyLinkContext(link);
                const isExternal = url.origin !== window.location.origin;
                const payload = {
                    context,
                    label: extractLinkLabel(link),
                    target: link.target === '_blank' ? 'new_tab' : 'same_tab',
                    href: `${url.pathname}${url.search}`
                };

                if (context === 'nav_desktop' || context === 'nav_mobile') {
                    trackDocsEvent('docs_nav_click', payload);
                } else if (context === 'cta' || context === 'example_links' || context === 'feature_item') {
                    trackDocsEvent('docs_cta_click', payload);
                } else if (isExternal) {
                    trackDocsEvent('docs_outbound_click', payload);
                }
            }
        }
    }

    const toggle = document.querySelector('.nav-toggle');
    const mobileNav = document.getElementById('nav-mobile');
    if (!toggle || !mobileNav) return;

    if (!toggle.contains(event.target) && !mobileNav.contains(event.target)) {
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

// Close mobile nav when window resizes to desktop
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        const toggle = document.querySelector('.nav-toggle');
        const mobileNav = document.getElementById('nav-mobile');
        if (!toggle || !mobileNav) return;
        toggle.classList.remove('active');
        mobileNav.classList.remove('active');
    }
});

const scrollMilestones = [25, 50, 75, 90];
const reachedMilestones = new Set();

function trackScrollDepthMilestones() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollableHeight <= 0) return;

    const percent = Math.round((window.scrollY / scrollableHeight) * 100);
    scrollMilestones.forEach((milestone) => {
        if (percent >= milestone && !reachedMilestones.has(milestone)) {
            reachedMilestones.add(milestone);
            trackDocsEvent('docs_scroll_depth', { percent: milestone });
        }
    });
}

// Set active navigation item based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a, .nav-mobile a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath === href || (href !== '/' && currentPath.startsWith(href)))) {
            link.classList.add('active');
        }
    });

    trackDocsEvent('docs_page_engaged', {
        pageTitle: document.title
    });

    trackScrollDepthMilestones();

    let pending = false;
    window.addEventListener('scroll', function() {
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => {
            pending = false;
            trackScrollDepthMilestones();
        });
    }, { passive: true });

    bindViewerTracking(document, 'page');
    bindViewerTrackingToIframes();
});
