# Claude Development Notes

## Project Status
BelowJS is a production-ready 3D model viewer library with VR support and underwater exploration features.

## Recent Updates (August 2025)
- ✅ **Switched to static documentation**: Removed VitePress, now using hand-crafted HTML docs
- ✅ **Fixed navigation links**: Logo links now properly point to docs index instead of root domain
- ✅ **Added changelog page**: Complete `docs/changelog.html` with 1.0.0-rc.1 release notes
- ✅ **Updated all navbars**: Added changelog link to all 10 documentation pages  
- ✅ **Fixed iframe gaps**: Removed spacing issues in examples page embed viewer
- ⚠️ **Website changelog**: Need to update main website (padmorrison.com/belowjs) with latest release info

## Build System
- **Production bundles**: All examples use `/dist/belowjs.css` and `/dist/belowjs.js`
- **Build command**: `npm run build` creates optimized bundles
- **External deps**: Three.js loaded from CDN (not bundled)
- **Testing**: Examples use production builds, not source files

## Development Workflow
1. Make changes to source files in `/src/`
2. Run `npm run build` to create production bundles
3. Test using examples that load from `/dist/` files
4. Examples automatically use production builds

## Key Files
- **Main entry**: `src/index.js` (imports CSS for bundling)
- **CSS bundle**: `src/styles/index.css` (imports all stylesheets)
- **Examples**: All examples (basic, dragdrop, embed) use production bundles
- **Build output**: `dist/belowjs.css`, `dist/belowjs.js`

## Testing Notes
- Examples are production-ready and use built bundles
- No source file imports in examples
- Three.js loaded dynamically from multiple CDNs (fallback support)
- Build required before testing changes
- Examples include proper error handling for CDN failures

## Development Server Commands

### Primary Test Server
```bash
npm run dev
```
- Starts Vite dev server on `http://localhost:5173`
- Auto-opens `examples/basic/` 
- Full-featured viewer with all systems enabled

### Alternative Examples
```bash
npm run dev:basic        # Same as npm run dev - full-featured viewer
npm run dev:dragdrop     # Dark theme with drag & drop focus, mode toggle, and measurement
npm run dev:embed        # Light theme embeddable measurement viewer
```

### Complete Development Workflow
1. **Make changes** to source files in `/src/`
2. **Build production bundles**: `npm run build`
3. **Start test server**: `npm run dev` (in separate terminal)
4. **Test changes** at `http://localhost:5173`

**Note**: Examples use production builds, so `npm run build` is required before testing changes.

## Documentation System
- **Static HTML docs**: `docs/` folder contains hand-crafted documentation pages
- **GitHub Pages deployment**: Serves directly from `docs/` folder
- **API documentation**: Auto-generated from source code via TypeDoc
- **Examples**: Automatically copied with CDN imports for production
- **Changelog**: `docs/changelog.html` documents version history and releases

### Documentation Commands
```bash
npm run docs:serve    # Serve docs locally on port 8000
npm run docs:examples # Copy examples to docs folder
```

### Navigation Structure
All documentation pages include consistent navigation with:
- Installation, Examples, Guides, Implementations, **Changelog**
- Logo links correctly point to docs index (not root domain)
- Guide subpages use relative paths (`../changelog.html`)
- External links to GitHub and NPM

### Documentation Pages
- `docs/index.html` - Homepage with hero and features
- `docs/installation.html` - Setup and installation guide
- `docs/examples.html` - Live demos and code examples
- `docs/guides.html` - Workflow guides listing
- `docs/implementations.html` - Real-world usage showcase
- `docs/changelog.html` - Version history and release notes
- `docs/guides/` - Individual guide pages (4 guides)
- `docs/examples/` - Copied examples with CDN imports

## Release & Deployment Workflow

### Complete Update Process
After making modifications to the library:

1. **Build & Test Changes**
   ```bash
   npm run build        # Build library bundles
   npm run dev          # Test with development examples
   ```

2. **Update Documentation**
   ```bash
   npm run docs:examples # Copy examples to docs with CDN imports
   ```
   This automatically:
   - Copies examples from `examples/` → `docs/examples/` with CDN imports
   - Updates CDN URLs to match current version
   - Static HTML documentation is ready for deployment

3. **Quality Checks**
   ```bash
   npm run lint         # Check code quality
   npm run lint:fix     # Fix linting issues
   ```

4. **Version & Prepare Release**
   ```bash
   npm version patch    # Bump version (1.0.0-rc.1 → 1.0.0-rc.2)
   npm version minor    # Minor bump (1.0.0-rc.1 → 1.0.1-rc.1)
   npm version major    # Major bump (1.0.0-rc.1 → 2.0.0-rc.1)
   ```
   This automatically runs `prepublishOnly` (build + lint)

5. **Update Release Documentation**
   - Update `docs/changelog.html` with new version details
   - **CRITICAL**: Run `npm run docs:examples` to update ALL documentation CDN references
   - Update main website changelog at padmorrison.com/belowjs
   - Ensure version consistency across all documentation

6. **Deploy to GitHub**
   ```bash
   git push origin main --tags
   ```
   GitHub Pages automatically deploys from `docs/` folder

7. **Publish to NPM**
   ```bash
   npm publish
   ```

### Important Notes
- **Documentation examples** automatically use correct CDN versions
- **Development examples** (`examples/`) use local builds for testing
- **Production examples** (`docs/examples/`) use CDN imports automatically
- **Version consistency** ensured by automated CDN URL updates
- **Quality gates** prevent publishing without building and linting
- **Changelog maintenance** required for both GitHub docs and main website
- **Navigation fixes** ensure proper docs-relative linking (not root domain)
- **Static documentation** - no build step required, direct HTML editing