# Installation

## CDN

Both Three.js and BelowJS use ES modules. Add the import map and stylesheet:

```html
<script type="importmap">
{
    "imports": {
        "three": "https://cdn.jsdelivr.net/npm/three@0.179.1/+esm",
        "belowjs": "https://cdn.jsdelivr.net/npm/belowjs@1.0.0-rc.1/dist/belowjs.js"
    }
}
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/belowjs@1.0.0-rc.1/dist/belowjs.css">
```

Then import and use:

```javascript
import { ModelViewer } from 'belowjs';

const viewer = new ModelViewer('body', {
    models: { 'wreck': { url: 'shipwreck.glb' } }
});
```

## npm

```bash
npm install belowjs three
```

```javascript
import { ModelViewer } from 'belowjs';
import 'belowjs/dist/belowjs.css';

const config = {
    models: {
        'kxi': {
            url: 'shipwreck.glb'
        }
    }
};

const viewer = new ModelViewer('#container', config);
```

## Manual installation

If you prefer to install manually, clone the repository and build the distribution files:

```bash
git clone https://github.com/patrick-morrison/belowjs
cd belowjs
npm install
npm run build
```

This builds the necessary files into the `/dist` directory:
- `belowjs.js` (~419 KB) — ES modules version  
- `belowjs.css` (~20 KB) — Complete stylesheet

## Static deployment

Deploy using CDN (no downloads needed):

```
shipwrecks-vr/
├── index.html          # Uses CDN imports
└── models/
    ├── kxi.glb
    └── kozvii.glb
```

## VR setup

VR requires HTTPS in production. For local development:

```bash
python -m http.server 8000
```

**Quest**: Chrome can forward localhost to Quest via USB debugging. [Setup guide](https://developers.meta.com/horizon/documentation/web/browser-remote-debugging/).

## Model requirements

- **Format**: GLB files (binary glTF)
- **Size**: Under 50MB recommended for web
- **Optimization**: Use Blender or similar to reduce polygons for better performance

## Browser support

| Feature       | Chrome | Firefox | Safari | Edge |
| ------------- | ------ | ------- | ------ | ---- |
| Basic viewing | ✅     | ✅      | ✅     | ✅   |
| VR mode       | ✅     | ✅      | ❌     | ✅   |

## Troubleshooting

**Model not loading?**
- Check file path and CORS headers
- Verify GLB file is valid
- Open browser console for error messages

**VR button not showing?**
- Use HTTPS (required for WebXR)
- Check browser VR support
- Connect and enable VR headset

**Performance issues?**
- Reduce model polygon count
- Compress textures
- Use smaller texture sizes

