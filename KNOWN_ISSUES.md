# Known Issues

## Auto-Focus on VR Exit

**Issue**: Auto-focusing the camera on measurements when exiting VR causes orbit control issues, including unexpected zoom changes during rotation and persistent camera offset problems.

**Status**: Temporarily disabled (removed from VRManager.js)

**Details**: 
- The auto-focus feature was intended to smoothly center the camera on measurement points when exiting VR
- However, it interferes with OrbitControls internal state, causing:
  - Zoom level changes during camera rotation
  - Persistent orbit offset issues that affect subsequent double-click focusing
  - Unpredictable camera behavior

**Workaround**: Users can manually double-click on measurement points to focus after exiting VR

**Future Fix**: Need to investigate proper OrbitControls state management or alternative focusing approach that doesn't interfere with control state

---

## Other Issues

_(Add additional known issues here as they are discovered)_
