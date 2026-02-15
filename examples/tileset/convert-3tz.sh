#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INPUT="${1:-$SCRIPT_DIR/wreck.3tz}"
OUTPUT_DIR="${2:-$SCRIPT_DIR/wreck-tiles}"
TARGET_VERSION="${3:-1.1}"
TMP_DIR="${OUTPUT_DIR}_tmp_convert"

if [[ ! -e "$INPUT" ]]; then
  echo "Input not found: $INPUT" >&2
  echo "Usage: ./convert-3tz.sh [input_tileset] [output_dir] [target_version]" >&2
  echo "Input can be: .3tz, .3dtiles, a tileset.json path, or a tileset directory." >&2
  echo "Target version must be 1.0 or 1.1 (default: 1.1)." >&2
  exit 1
fi

if [[ "$TARGET_VERSION" != "1.0" && "$TARGET_VERSION" != "1.1" ]]; then
  echo "Invalid target_version: $TARGET_VERSION (expected 1.0 or 1.1)" >&2
  exit 1
fi

echo "Input: $INPUT"
echo "Output: $OUTPUT_DIR"
echo "Target version: $TARGET_VERSION"

echo "Step 1/2: Converting input to unpacked tileset folder..."
rm -rf "$TMP_DIR"
npx 3d-tiles-tools convert -i "$INPUT" -o "$TMP_DIR" -f
if [[ ! -f "$TMP_DIR/tileset.json" ]]; then
  echo "Convert step did not produce $TMP_DIR/tileset.json" >&2
  exit 1
fi

echo "Step 2/2: Upgrading to 3D Tiles $TARGET_VERSION..."
rm -rf "$OUTPUT_DIR"
npx 3d-tiles-tools upgrade -i "$TMP_DIR" -o "$OUTPUT_DIR" --targetVersion "$TARGET_VERSION" -f
if [[ ! -f "$OUTPUT_DIR/tileset.json" ]]; then
  echo "Upgrade step did not produce $OUTPUT_DIR/tileset.json" >&2
  exit 1
fi

rm -rf "$TMP_DIR"

# Metashape packages often include a viewer wrapper in App/.
# It is not needed for BelowJS tileset loading.
rm -rf "$OUTPUT_DIR/App"

echo "Done."
echo "Tileset: $OUTPUT_DIR/tileset.json"
