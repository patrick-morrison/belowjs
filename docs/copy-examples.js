#!/usr/bin/env node

/**
 * Copy examples to docs/ folder with CDN imports for production
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);

const EXAMPLES_SRC = path.join(rootDir, 'examples');
const EXAMPLES_DEST = path.join(rootDir, 'docs', 'examples');

// Get version from package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, 'package.json'), 'utf8'));
const version = packageJson.version;

console.log(`Copying examples to docs with CDN imports (v${version})...`);

// Clean destination
if (fs.existsSync(EXAMPLES_DEST)) {
  fs.rmSync(EXAMPLES_DEST, { recursive: true });
}

const BINARY_EXTENSIONS = [
  '.glb', '.gltf', '.bin',
  '.b3dm', '.i3dm', '.pnts', '.cmpt', '.subtree',
  '.jpg', '.jpeg', '.png',
  '.ogg', '.mp3', '.wav', '.flac'
];

const UMAMI_SCRIPT_TAG = [
  '    <!-- Analytics script for BelowJS docs site only. Replace/remove for your own deployment. -->',
  '    <script defer data-website-id="f1e6105e-4969-4ffb-a3e1-8d18eca197d7"',
  '        src="https://umami.padmorrison.com/script.js"></script>'
].join('\n');

// Copy directory
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      const isBinary = BINARY_EXTENSIONS.some((ext) => entry.name.toLowerCase().endsWith(ext));
      
      if (isBinary) {
        fs.copyFileSync(srcPath, destPath); // keep binary data intact
      } else {
        // Handle text files
        let content = fs.readFileSync(srcPath, 'utf8');
        
        // Convert HTML files to use CDN imports
        if (entry.name.endsWith('.html')) {
          const relativeExamplePath = path.relative(EXAMPLES_SRC, srcPath).split(path.sep).join('/');
          content = convertToCDN(content, version, relativeExamplePath);
        }

        // Replace local paths in JS files with CDN equivalents
        if (entry.name.endsWith('.js')) {
          content = content.replace(
            /\/node_modules\/three\/examples\/jsm\/libs\//g,
            'https://cdn.jsdelivr.net/npm/three@0.179.1/examples/jsm/libs/'
          );
          // Rewrite local belowjs source imports to CDN build
          content = content.replace(
            /from '\/src\/[^']+'/g,
            `from 'https://cdn.jsdelivr.net/npm/belowjs@${version}/dist/belowjs.js'`
          );
        }
        
        fs.writeFileSync(destPath, content, 'utf8');

      }
    }
  }
}

function getDocsRelativeAssetPath(relativeExamplePath, targetPathFromDocsRoot) {
  const dir = path.posix.dirname(relativeExamplePath);
  const nestedDirCount = dir === '.' ? 0 : dir.split('/').filter(Boolean).length;
  return `${'../'.repeat(nestedDirCount + 1)}${targetPathFromDocsRoot}`;
}

function injectUmamiScript(htmlContent) {
  if (htmlContent.includes('https://umami.padmorrison.com/script.js')) {
    return htmlContent;
  }
  return htmlContent.replace(/<\/head>/i, `${UMAMI_SCRIPT_TAG}\n</head>`);
}

function injectEventsScript(htmlContent, relativeExamplePath) {
  if (htmlContent.includes('assets/navigation.js')) {
    return htmlContent;
  }
  const eventsScriptPath = getDocsRelativeAssetPath(relativeExamplePath, 'assets/navigation.js');
  const eventsScriptTag = [
    '    <!-- Docs event tracking for this site only. Remove if you are reusing this example elsewhere. -->',
    `    <script src="${eventsScriptPath}"></script>`
  ].join('\n');
  return htmlContent.replace(/<\/body>/i, `${eventsScriptTag}\n</body>`);
}

function injectAnimationEventTrackingScript(htmlContent, relativeExamplePath) {
  if (relativeExamplePath !== 'animation/index.html') {
    return htmlContent;
  }
  if (htmlContent.includes('assets/animation-example-tracking.js')) {
    return htmlContent;
  }
  const trackingScriptPath = getDocsRelativeAssetPath(relativeExamplePath, 'assets/animation-example-tracking.js');
  const scriptTag = [
    '    <!-- Animation example analytics for BelowJS docs site only. Replace/remove for your own deployment. -->',
    `    <script src="${trackingScriptPath}"></script>`
  ].join('\n');

  return htmlContent.replace(/<\/body>/i, `${scriptTag}\n</body>`);
}

function convertToCDN(htmlContent, version, relativeExamplePath) {
  const fileName = path.posix.basename(relativeExamplePath);
  const iconBasePath = getDocsRelativeAssetPath(relativeExamplePath, '');

  // Replace local Three.js import
  htmlContent = htmlContent.replace(
    'three": "/node_modules/three/build/three.module.js"',
    'three": "https://cdn.jsdelivr.net/npm/three@0.179.1/+esm"'
  );

  // Replace WebGPU-specific Three.js imports (used by cinematic example)
  htmlContent = htmlContent.replace(
    '"three": "/node_modules/three/build/three.webgpu.js"',
    '"three": "https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.webgpu.js"'
  );
  htmlContent = htmlContent.replace(
    '"three/webgpu": "/node_modules/three/build/three.webgpu.js"',
    '"three/webgpu": "https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.webgpu.js"'
  );
  htmlContent = htmlContent.replace(
    '"three/tsl": "/node_modules/three/build/three.tsl.js"',
    '"three/tsl": "https://cdn.jsdelivr.net/npm/three@0.179.1/build/three.tsl.js"'
  );

  htmlContent = htmlContent.replace(
    '"three/addons/": "/node_modules/three/examples/jsm/"',
    '"three/addons/": "https://cdn.jsdelivr.net/npm/three@0.179.1/examples/jsm/"'
  );
  
  // Replace local BelowJS import
  htmlContent = htmlContent.replace(
    'belowjs": "/dist/belowjs.js"',
    `belowjs": "https://cdn.jsdelivr.net/npm/belowjs@${version}/dist/belowjs.js"`
  );
  
  // Replace local CSS import
  htmlContent = htmlContent.replace(
    'href="/dist/belowjs.css"',
    `href="https://cdn.jsdelivr.net/npm/belowjs@${version}/dist/belowjs.css"`
  );
  
  // Update comment
  htmlContent = htmlContent.replace(
    '<!-- Import map for local testing -->',
    '<!-- Import map for CDN production -->'
  );

  // Replace emoji/favicon placeholder with proper web + PWA icon metadata
  const exampleIconHead = [
    '    <meta name="theme-color" content="#0d3b66">',
    `    <link rel="icon" type="image/png" sizes="32x32" href="${iconBasePath}icons/favicon-32x32.png">`,
    `    <link rel="icon" type="image/png" sizes="16x16" href="${iconBasePath}icons/favicon-16x16.png">`,
    `    <link rel="icon" href="${iconBasePath}favicon.ico" sizes="any">`,
    `    <link rel="apple-touch-icon" sizes="180x180" href="${iconBasePath}icons/apple-touch-icon.png">`,
    `    <link rel="manifest" href="${iconBasePath}site.webmanifest">`,
    '    <meta name="application-name" content="BelowJS">',
    '    <meta name="apple-mobile-web-app-capable" content="yes">',
    '    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
    '    <meta name="apple-mobile-web-app-title" content="BelowJS">',
    '    <meta name="mobile-web-app-capable" content="yes">',
    '    <meta name="msapplication-TileColor" content="#0d3b66">'
  ].join('\n');

  if (fileName === 'index.html') {
    const legacyEmojiIconTag = /\s*<link rel="icon"[\s\S]*?<\/svg>">\s*/m;
    const simpleIconTag = /\s*<link rel="icon"[^>]*>\s*/m;

    if (legacyEmojiIconTag.test(htmlContent)) {
      htmlContent = htmlContent.replace(
        legacyEmojiIconTag,
        `\n${exampleIconHead}\n\n`
      );
    } else if (simpleIconTag.test(htmlContent)) {
      htmlContent = htmlContent.replace(
        simpleIconTag,
        `\n${exampleIconHead}\n\n`
      );
    } else if (!htmlContent.includes('manifest.webmanifest')) {
      htmlContent = htmlContent.replace(
        /(<meta name="viewport"[^>]*>\n)/,
        `$1${exampleIconHead}\n`
      );
    }
  }

  htmlContent = injectUmamiScript(htmlContent);
  htmlContent = injectEventsScript(htmlContent, relativeExamplePath);
  htmlContent = injectAnimationEventTrackingScript(htmlContent, relativeExamplePath);

  return htmlContent;
}

// Copy examples
copyDir(EXAMPLES_SRC, EXAMPLES_DEST);

// Update hardcoded version references in documentation pages
updateDocumentationReferences(version);

console.log('✅ Examples copied to docs/ with CDN imports');

function updateDocumentationReferences(version) {
  const docsDir = path.join(rootDir, 'docs');
  const filesToUpdate = [
    'examples.html',
    'installation.html',
    'demo.html',
    'changelog.html'
  ];
  
  console.log(`Updating CDN references to v${version} in documentation pages...`);
  
  for (const filename of filesToUpdate) {
    const filepath = path.join(docsDir, filename);
    if (fs.existsSync(filepath)) {
      let content = fs.readFileSync(filepath, 'utf8');
      
      // Update belowjs CDN URLs (both JS and CSS)
      content = content.replace(
        /belowjs@[\d]+\.[\d]+\.[\d]+/g,
        `belowjs@${version}`
      );
      
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`  ✅ Updated ${filename}`);
    }
  }
}
