#!/usr/bin/env bash
# Manual adb helpers for Quest 3 WebXR perf testing.
# The automated flow lives in scripts/quest-perf-test.mjs — this file is the
# same plumbing broken out for hand-driving a headset on a desk.
#
# Prereqs: developer mode enabled on the headset, adb paired (USB or Wi-Fi),
# and `npm run dev:tileset` serving on port 5173.

set -euo pipefail

PORT="${PORT:-5173}"
URL="${URL:-http://localhost:${PORT}/examples/tileset/?stats=1}"

case "${1:-help}" in
  setup)
    adb devices
    # Headset reaches the Mac's vite server as localhost.
    adb reverse "tcp:${PORT}" "tcp:${PORT}"
    # Keep the display on with nobody wearing it.
    adb shell input keyevent KEYCODE_WAKEUP
    adb shell am broadcast -a com.oculus.vrpowermanager.automation_disable
    adb shell am broadcast -a com.oculus.vrpowermanager.prox_close
    ;;

  launch)
    REMOTE_URL=${URL//\'/\'\\\'\'}
    adb shell "am start -a android.intent.action.VIEW -d '${REMOTE_URL}' -p com.oculus.browser"
    ;;

  devtools)
    # Print the browser DevTools socket, then forward it to localhost:9222.
    SOCKET=$(adb shell cat /proc/net/unix | grep -o '@[[:graph:]]*devtools_remote[[:graph:]]*' | head -1 | tr -d '@\r')
    echo "DevTools socket: ${SOCKET}"
    adb forward tcp:9222 "localabstract:${SOCKET}"
    echo "Tabs: http://127.0.0.1:9222/json  (or chrome://inspect with port 9222)"
    ;;

  fps)
    # Once-per-second compositor stats; Stale = dropped frames.
    adb logcat -s VrApi
    ;;

  restore)
    adb shell am broadcast -a com.oculus.vrpowermanager.automation_enable
    adb forward --remove-all || true
    adb reverse --remove-all || true
    ;;

  *)
    echo "usage: $0 {setup|launch|devtools|fps|restore}"
    echo "  PORT=5173 URL=... $0 launch"
    ;;
esac
