"""
belowjs Compatibility Checker & Exporter for Agisoft Metashape Professional

A Metashape plugin that validates your photogrammetry project against all
belowjs requirements and exports an optimised GLB ready for the belowjs
web viewer (desktop + VR).

Installation:
    Copy this file to your Metashape auto-start scripts folder:
      Windows:  %LOCALAPPDATA%/Agisoft/Metashape Pro/scripts/
      macOS:    ~/Library/Application Support/Agisoft/Metashape Pro/scripts/
      Linux:    ~/.local/share/Agisoft/Metashape Pro/scripts/

    Restart Metashape. A new "belowjs" menu will appear in the menu bar.

Requirements:
    - Agisoft Metashape Professional 2.0+ with Python scripting
    - A chunk with an aligned, built, and textured model

Usage:
    belowjs > Check Compatibility    Run all checks without exporting
    belowjs > Export for belowjs     Run checks then export GLB

For the full belowjs documentation see: https://belowjs.com
"""

import Metashape
import os
import math
import textwrap
from datetime import datetime

# ---------------------------------------------------------------------------
# Constants – every requirement from the belowjs guides
# ---------------------------------------------------------------------------

# Polygon budgets
POLY_LIMIT_VR = 1_200_000      # Meta Quest 3 tested ceiling
POLY_LIMIT_AR = 500_000         # AR / mobile target
POLY_WARN_OVER = 1_500_000      # above this VR is unlikely to work

# Texture requirements
TEXTURE_SIZE_RECOMMENDED = 4096
TEXTURE_PAGE_COUNT = 4          # 4 x 4K is the sweet spot
TEXTURE_SIZE_MIN = 1024
TEXTURE_SIZE_MAX = 8192

# File-size guidance (bytes)
FILE_SIZE_WARN = 50 * 1024 * 1024   # 50 MB soft limit for web
FILE_SIZE_HARD = 100 * 1024 * 1024  # 100 MB likely too large

# Plugin version
PLUGIN_VERSION = "1.0.0"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _fmt_poly(n):
    """Format a polygon count with comma separators."""
    return f"{n:,}"


def _fmt_size(n):
    """Format bytes as human-readable."""
    if n < 1024:
        return f"{n} B"
    elif n < 1024 * 1024:
        return f"{n / 1024:.1f} KB"
    else:
        return f"{n / (1024 * 1024):.1f} MB"


def _texture_dimensions(texture):
    """Return (width, height) of a Metashape texture image, or None."""
    try:
        img = texture.image()
        if img is not None:
            return (img.width, img.height)
    except Exception:
        pass
    return None


# ---------------------------------------------------------------------------
# Compatibility checks
# ---------------------------------------------------------------------------

class CheckResult:
    """Single check outcome."""
    PASS = "PASS"
    WARN = "WARN"
    FAIL = "FAIL"
    INFO = "INFO"

    def __init__(self, status, title, detail=""):
        self.status = status
        self.title = title
        self.detail = detail

    def __str__(self):
        prefix = {"PASS": "+", "WARN": "~", "FAIL": "!", "INFO": "*"}
        mark = prefix.get(self.status, "?")
        line = f"[{mark}] {self.title}"
        if self.detail:
            line += f"\n    {self.detail}"
        return line


def run_checks(chunk):
    """
    Run every belowjs compatibility check against the active chunk.
    Returns a list of CheckResult objects.
    """
    results = []

    # ------------------------------------------------------------------
    # 1. Basic prerequisites
    # ------------------------------------------------------------------
    if chunk is None:
        results.append(CheckResult(
            CheckResult.FAIL,
            "No active chunk",
            "Open a project with at least one chunk before running checks."
        ))
        return results

    if chunk.model is None:
        results.append(CheckResult(
            CheckResult.FAIL,
            "No model built",
            "Build a model first (Workflow > Build Model)."
        ))
        return results

    model = chunk.model

    # ------------------------------------------------------------------
    # 2. Polygon count
    # ------------------------------------------------------------------
    face_count = model.face_count if hasattr(model, 'face_count') else len(model.faces)
    vertex_count = model.vertex_count if hasattr(model, 'vertex_count') else len(model.vertices)

    results.append(CheckResult(
        CheckResult.INFO,
        f"Model statistics: {_fmt_poly(face_count)} faces, {_fmt_poly(vertex_count)} vertices"
    ))

    if face_count <= POLY_LIMIT_AR:
        results.append(CheckResult(
            CheckResult.PASS,
            f"Polygon count OK for VR and AR ({_fmt_poly(face_count)} faces)",
            f"Under {_fmt_poly(POLY_LIMIT_AR)} AR limit and {_fmt_poly(POLY_LIMIT_VR)} VR limit."
        ))
    elif face_count <= POLY_LIMIT_VR:
        results.append(CheckResult(
            CheckResult.PASS,
            f"Polygon count OK for VR ({_fmt_poly(face_count)} faces)",
            f"Under {_fmt_poly(POLY_LIMIT_VR)} VR limit. For AR/mobile, decimate to {_fmt_poly(POLY_LIMIT_AR)}."
        ))
    elif face_count <= POLY_WARN_OVER:
        results.append(CheckResult(
            CheckResult.WARN,
            f"Polygon count high ({_fmt_poly(face_count)} faces)",
            f"Exceeds the tested VR limit of {_fmt_poly(POLY_LIMIT_VR)}. "
            f"Use Tools > Model > Decimate to reduce. "
            f"Models above this count generally do not perform well on VR headsets."
        ))
    else:
        results.append(CheckResult(
            CheckResult.FAIL,
            f"Polygon count too high ({_fmt_poly(face_count)} faces)",
            f"Must decimate to {_fmt_poly(POLY_LIMIT_VR)} or below for VR "
            f"(or {_fmt_poly(POLY_LIMIT_AR)} for AR). "
            f"Use Tools > Model > Decimate."
        ))

    # ------------------------------------------------------------------
    # 3. Textures
    # ------------------------------------------------------------------
    if not model.textures or len(model.textures) == 0:
        results.append(CheckResult(
            CheckResult.FAIL,
            "No textures found",
            "Build textures first (Workflow > Build Texture). "
            "Recommended: Diffuse type, Mosaic blending, 4 x 4096 px."
        ))
    else:
        tex_count = len(model.textures)
        results.append(CheckResult(
            CheckResult.INFO,
            f"Texture pages: {tex_count}"
        ))

        # Check individual texture dimensions
        all_dims = []
        for i, tex in enumerate(model.textures):
            dims = _texture_dimensions(tex)
            if dims:
                all_dims.append(dims)

        if all_dims:
            max_w = max(d[0] for d in all_dims)
            max_h = max(d[1] for d in all_dims)
            min_w = min(d[0] for d in all_dims)
            min_h = min(d[1] for d in all_dims)

            results.append(CheckResult(
                CheckResult.INFO,
                f"Texture dimensions: {min_w}x{min_h} to {max_w}x{max_h}"
            ))

            # Check if textures are 4K
            if max_w == TEXTURE_SIZE_RECOMMENDED and max_h == TEXTURE_SIZE_RECOMMENDED:
                results.append(CheckResult(
                    CheckResult.PASS,
                    "Texture size is 4096x4096 (recommended)"
                ))
            elif max_w > TEXTURE_SIZE_MAX or max_h > TEXTURE_SIZE_MAX:
                results.append(CheckResult(
                    CheckResult.WARN,
                    f"Texture dimensions exceed {TEXTURE_SIZE_MAX}px",
                    "belowjs-optimiser will resize textures to max 4096x4096. "
                    "Consider rebuilding textures at 4096 to preserve quality control."
                ))
            elif max_w < TEXTURE_SIZE_MIN or max_h < TEXTURE_SIZE_MIN:
                results.append(CheckResult(
                    CheckResult.WARN,
                    f"Texture dimensions are small ({max_w}x{max_h})",
                    "Consider rebuilding at 4096x4096 for best VR detail."
                ))
            else:
                results.append(CheckResult(
                    CheckResult.PASS,
                    f"Texture size acceptable ({max_w}x{max_h})"
                ))

            # Check power-of-two (GPU optimisation)
            for i, (w, h) in enumerate(all_dims):
                if (w & (w - 1)) != 0 or (h & (h - 1)) != 0:
                    results.append(CheckResult(
                        CheckResult.WARN,
                        f"Texture page {i} is not power-of-two ({w}x{h})",
                        "Power-of-two textures (512, 1024, 2048, 4096) are optimal for GPU memory."
                    ))
                    break

        # Page count check
        if tex_count == TEXTURE_PAGE_COUNT:
            results.append(CheckResult(
                CheckResult.PASS,
                f"Texture page count is {TEXTURE_PAGE_COUNT} (recommended for VR)"
            ))
        elif tex_count == 1:
            results.append(CheckResult(
                CheckResult.PASS,
                f"Single texture page (acceptable for lighter applications)",
                "For maximum VR detail, rebuild with 4 texture pages at 4096."
            ))
        elif tex_count > TEXTURE_PAGE_COUNT:
            results.append(CheckResult(
                CheckResult.WARN,
                f"Texture page count is {tex_count} (recommended: {TEXTURE_PAGE_COUNT})",
                "More pages increases VRAM. Consider rebuilding with 4 pages."
            ))

    # ------------------------------------------------------------------
    # 4. Coordinate system / scale
    # ------------------------------------------------------------------
    has_transform = chunk.transform.matrix is not None
    has_crs = chunk.crs is not None

    if has_transform:
        # Check scale is set (not identity)
        T = chunk.transform.matrix
        scale = T.scale()
        if scale and abs(scale - 1.0) > 1e-6:
            results.append(CheckResult(
                CheckResult.INFO,
                f"Chunk transform scale: {scale:.6f}"
            ))

    if has_crs:
        results.append(CheckResult(
            CheckResult.INFO,
            f"Coordinate system: {chunk.crs.name}"
        ))

    # Check for scale bars
    if chunk.scalebars and len(chunk.scalebars) > 0:
        results.append(CheckResult(
            CheckResult.PASS,
            f"Scale bars found: {len(chunk.scalebars)}",
            "Model has reference scale data for accurate measurements in belowjs."
        ))
    else:
        results.append(CheckResult(
            CheckResult.WARN,
            "No scale bars detected",
            "Without scale bars, measurements in belowjs may not be accurate. "
            "Add scale bars in the Reference pane, or scale later with "
            "belowjs-optimiser --scale <factor>."
        ))

    # ------------------------------------------------------------------
    # 5. Cameras / alignment
    # ------------------------------------------------------------------
    aligned_count = sum(1 for c in chunk.cameras if c.transform is not None)
    total_count = len(chunk.cameras)

    if total_count == 0:
        results.append(CheckResult(
            CheckResult.WARN,
            "No cameras in chunk"
        ))
    else:
        pct = (aligned_count / total_count) * 100
        if pct >= 90:
            results.append(CheckResult(
                CheckResult.PASS,
                f"Camera alignment: {aligned_count}/{total_count} ({pct:.0f}%)"
            ))
        elif pct >= 70:
            results.append(CheckResult(
                CheckResult.WARN,
                f"Camera alignment: {aligned_count}/{total_count} ({pct:.0f}%)",
                "Some cameras failed to align. Review alignment quality. "
                "70-80% image overlap is recommended during capture."
            ))
        else:
            results.append(CheckResult(
                CheckResult.WARN,
                f"Low camera alignment: {aligned_count}/{total_count} ({pct:.0f}%)",
                "Many cameras failed to align. This may affect model quality. "
                "Consider re-capturing with 70-80% overlap and a systematic lawnmower pattern."
            ))

    # ------------------------------------------------------------------
    # 6. Model orientation check
    # ------------------------------------------------------------------
    if model.vertices and len(model.vertices) > 0:
        # Sample bounding box to check orientation
        try:
            min_x = min_y = min_z = float('inf')
            max_x = max_y = max_z = float('-inf')
            sample_size = min(len(model.vertices), 10000)
            step = max(1, len(model.vertices) // sample_size)
            for i in range(0, len(model.vertices), step):
                v = model.vertices[i].coord
                min_x, max_x = min(min_x, v.x), max(max_x, v.x)
                min_y, max_y = min(min_y, v.y), max(max_y, v.y)
                min_z, max_z = min(min_z, v.z), max(max_z, v.z)

            extent_x = max_x - min_x
            extent_y = max_y - min_y
            extent_z = max_z - min_z

            results.append(CheckResult(
                CheckResult.INFO,
                f"Model extents: X={extent_x:.2f}, Y={extent_y:.2f}, Z={extent_z:.2f} (local units)"
            ))

            # Simple heuristic: if Y extent is the smallest, model is likely
            # flat (plan view) which is correct for a ship/wreck viewed from above.
            # If Z is much larger than X and Y, the model might be on its side.
            if extent_z > extent_x * 2 and extent_z > extent_y * 2:
                results.append(CheckResult(
                    CheckResult.WARN,
                    "Model may be oriented incorrectly (tall in Z axis)",
                    "Shipwrecks should be roughly flat when viewed from above. "
                    "Use the Rotate Object tool to orient correctly:\n"
                    "    1. Set Front view (key 1), rotate as needed\n"
                    "    2. Set Right view (key 3), rotate as needed\n"
                    "    3. Set Top view (key 7), rotate as needed\n"
                    "    4. Repeat until correct"
                ))
            else:
                results.append(CheckResult(
                    CheckResult.PASS,
                    "Model orientation appears reasonable"
                ))
        except Exception:
            results.append(CheckResult(
                CheckResult.INFO,
                "Could not analyse model orientation (vertex access issue)"
            ))

    # ------------------------------------------------------------------
    # 7. Texture type check
    # ------------------------------------------------------------------
    # Check that the texture is diffuse (not normal/occlusion only)
    if model.textures and len(model.textures) > 0:
        has_diffuse = False
        for tex in model.textures:
            try:
                if hasattr(tex, 'type'):
                    if tex.type == Metashape.Model.TextureType.DiffuseMap:
                        has_diffuse = True
                        break
                else:
                    # Older API versions may not expose type, assume diffuse
                    has_diffuse = True
                    break
            except Exception:
                has_diffuse = True
                break

        if has_diffuse:
            results.append(CheckResult(
                CheckResult.PASS,
                "Diffuse texture map present"
            ))
        else:
            results.append(CheckResult(
                CheckResult.WARN,
                "No diffuse texture map detected",
                "belowjs requires a diffuse (colour) texture. "
                "Rebuild texture with Type: Diffuse."
            ))

    # ------------------------------------------------------------------
    # 8. glTF Y-up convention check
    # ------------------------------------------------------------------
    # We can't directly read this preference, but we remind the user
    results.append(CheckResult(
        CheckResult.INFO,
        "Remember to enable 'glTF Y-up convention' when exporting",
        "Without this setting, models will appear on their side in belowjs. "
        "This option is in the export dialog (requires recent Metashape version)."
    ))

    # ------------------------------------------------------------------
    # 9. Vertex colors check (should be disabled)
    # ------------------------------------------------------------------
    has_vertex_colors = False
    if model.vertices and len(model.vertices) > 0:
        try:
            v = model.vertices[0]
            if hasattr(v, 'color') and v.color is not None:
                has_vertex_colors = True
        except Exception:
            pass

    if has_vertex_colors:
        results.append(CheckResult(
            CheckResult.WARN,
            "Vertex colors detected",
            "belowjs uses texture maps, not vertex colors. "
            "Disable vertex colors during export to reduce file size. "
            "In the export dialog, uncheck 'Vertex colors'."
        ))
    else:
        results.append(CheckResult(
            CheckResult.PASS,
            "No vertex colors (correct for texture-based workflow)"
        ))

    # ------------------------------------------------------------------
    # 10. Post-export optimisation reminder
    # ------------------------------------------------------------------
    results.append(CheckResult(
        CheckResult.INFO,
        "After export, run belowjs-optimiser for web/VR optimisation",
        "npx belowjs-optimiser pack model.glb\n"
        "    This applies Draco mesh compression (20-bit), KTX2 texture\n"
        "    compression, and polygon simplification if needed.\n"
        "    Typical result: 30% disk reduction, 75% VRAM reduction."
    ))

    return results


# ---------------------------------------------------------------------------
# Report formatting
# ---------------------------------------------------------------------------

def format_report(results, chunk_label=""):
    """Format check results into a readable report string."""
    lines = []
    lines.append("=" * 60)
    lines.append(f"  belowjs Compatibility Report  (v{PLUGIN_VERSION})")
    lines.append(f"  {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    if chunk_label:
        lines.append(f"  Chunk: {chunk_label}")
    lines.append("=" * 60)
    lines.append("")

    passes = sum(1 for r in results if r.status == CheckResult.PASS)
    warnings = sum(1 for r in results if r.status == CheckResult.WARN)
    failures = sum(1 for r in results if r.status == CheckResult.FAIL)
    infos = sum(1 for r in results if r.status == CheckResult.INFO)

    lines.append(f"Summary: {passes} passed, {warnings} warnings, {failures} failed, {infos} info")
    lines.append("")

    # Group by status
    for section, statuses in [
        ("FAILURES", [CheckResult.FAIL]),
        ("WARNINGS", [CheckResult.WARN]),
        ("PASSED", [CheckResult.PASS]),
        ("INFO", [CheckResult.INFO]),
    ]:
        section_results = [r for r in results if r.status in statuses]
        if not section_results:
            continue
        lines.append(f"--- {section} ---")
        for r in section_results:
            lines.append(str(r))
        lines.append("")

    if failures > 0:
        lines.append("RESULT: NOT READY for belowjs")
        lines.append("Fix the failures above before exporting.")
    elif warnings > 0:
        lines.append("RESULT: READY with warnings")
        lines.append("The model can be exported but review the warnings above.")
    else:
        lines.append("RESULT: READY for belowjs")

    lines.append("")
    lines.append("belowjs docs: https://belowjs.com")
    lines.append("=" * 60)

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Export function
# ---------------------------------------------------------------------------

def export_for_belowjs(chunk, output_path):
    """
    Export the active chunk's model as a GLB file with belowjs-optimal settings.

    Settings applied:
        - Format: Binary glTF (.glb)
        - Texture format: JPEG (good quality, smaller size)
        - Vertex colors: disabled (texture-based workflow)
        - UV coordinates: enabled
        - Normals: enabled
        - glTF Y-up: handled by Metashape export dialog setting
    """
    export_kwargs = {
        "path": output_path,
        "save_texture": True,
        "save_uv": True,
        "save_normals": True,
        "save_colors": False,       # belowjs uses textures, not vertex colors
        "save_markers": False,
        "save_cameras": False,
        "texture_format": Metashape.ImageFormat.ImageFormatJPEG,
    }

    # Try to set GLB format explicitly (API varies by version)
    try:
        export_kwargs["format"] = Metashape.ModelFormat.ModelFormatGLTF
    except AttributeError:
        pass  # older versions infer format from extension

    # Try to enable binary encoding
    try:
        export_kwargs["binary"] = True
    except Exception:
        pass

    chunk.exportModel(**export_kwargs)
    return output_path


# ---------------------------------------------------------------------------
# GUI integration
# ---------------------------------------------------------------------------

def _check_compatibility():
    """Menu action: run compatibility checks and show report."""
    doc = Metashape.app.document
    if not doc:
        Metashape.app.messageBox("No document open.")
        return

    chunk = doc.chunk
    if not chunk:
        Metashape.app.messageBox("No active chunk. Select a chunk first.")
        return

    results = run_checks(chunk)
    report = format_report(results, chunk.label or "")

    # Show in message box
    Metashape.app.messageBox(report)

    # Also print to console for copy/paste
    print(report)


def _export_for_belowjs():
    """Menu action: run checks, then export if no failures."""
    doc = Metashape.app.document
    if not doc:
        Metashape.app.messageBox("No document open.")
        return

    chunk = doc.chunk
    if not chunk:
        Metashape.app.messageBox("No active chunk. Select a chunk first.")
        return

    # Run checks first
    results = run_checks(chunk)
    failures = [r for r in results if r.status == CheckResult.FAIL]

    if failures:
        report = format_report(results, chunk.label or "")
        Metashape.app.messageBox(
            "Cannot export: compatibility check found failures.\n\n" + report
        )
        print(report)
        return

    # Ask for output path
    default_name = (chunk.label or "model").replace(" ", "_") + ".glb"
    output_path = Metashape.app.getSaveFileName(
        "Export GLB for belowjs",
        filter="Binary glTF (*.glb)"
    )

    if not output_path:
        return  # user cancelled

    # Ensure .glb extension
    if not output_path.lower().endswith(".glb"):
        output_path += ".glb"

    try:
        export_for_belowjs(chunk, output_path)
        file_size = os.path.getsize(output_path)

        size_note = ""
        if file_size > FILE_SIZE_HARD:
            size_note = (
                f"\n\nWARNING: File is {_fmt_size(file_size)} which is very large for web. "
                f"Run belowjs-optimiser to compress."
            )
        elif file_size > FILE_SIZE_WARN:
            size_note = (
                f"\n\nNote: File is {_fmt_size(file_size)}. Consider running "
                f"belowjs-optimiser for further compression."
            )

        report = format_report(results, chunk.label or "")
        print(report)

        msg = (
            f"Exported successfully!\n\n"
            f"File: {output_path}\n"
            f"Size: {_fmt_size(file_size)}"
            f"{size_note}\n\n"
            f"Next steps:\n"
            f"1. Run: npx belowjs-optimiser pack \"{output_path}\"\n"
            f"   This applies Draco (20-bit) + KTX2 compression\n"
            f"2. Test in the belowjs drag-drop viewer\n"
            f"3. Deploy to your web server or GitHub Pages\n\n"
            f"IMPORTANT: Ensure 'glTF Y-up convention' was enabled in the\n"
            f"export dialog. If your model appears on its side, re-export\n"
            f"with this option enabled."
        )
        Metashape.app.messageBox(msg)
        print(msg)

    except Exception as e:
        Metashape.app.messageBox(f"Export failed:\n{str(e)}")
        print(f"Export failed: {e}")


def _show_about():
    """Menu action: show plugin info."""
    msg = textwrap.dedent(f"""\
        belowjs Compatibility Checker v{PLUGIN_VERSION}

        Checks your Metashape project against all belowjs
        requirements for web-based 3D model viewing with
        VR support (Meta Quest 3).

        Requirements checked:
          - Polygon count (VR: 1.2M, AR: 500K)
          - Texture size (4 x 4096 recommended)
          - Texture type (diffuse)
          - Scale bars / georeferencing
          - Camera alignment quality
          - Model orientation
          - Vertex colors (should be disabled)
          - Export format (GLB with JPEG textures)

        Export settings applied:
          - Binary glTF (.glb) format
          - JPEG textures embedded
          - Vertex colors disabled
          - UV coordinates and normals enabled

        After export, run:
          npx belowjs-optimiser pack model.glb

        Docs: https://belowjs.com
        GitHub: https://github.com/patrick-morrison/belowjs
    """)
    Metashape.app.messageBox(msg)


# ---------------------------------------------------------------------------
# Register menu items
# ---------------------------------------------------------------------------

label = "belowjs"
Metashape.app.addMenuItem(f"{label}/Check Compatibility", _check_compatibility)
Metashape.app.addMenuItem(f"{label}/Export for belowjs", _export_for_belowjs)
Metashape.app.addMenuItem(f"{label}/About", _show_about)

print(f"[belowjs] Compatibility Checker v{PLUGIN_VERSION} loaded. See the 'belowjs' menu.")
