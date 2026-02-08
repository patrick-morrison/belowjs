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
          content = convertToCDN(content, version, entry.name);
        }
        
        fs.writeFileSync(destPath, content, 'utf8');

      }
    }
  }
}

function convertToCDN(htmlContent, version, fileName) {
  // Replace local Three.js import
  htmlContent = htmlContent.replace(
    'three": "/node_modules/three/build/three.module.js"',
    'three": "https://cdn.jsdelivr.net/npm/three@0.179.1/+esm"'
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
    '    <link rel="icon" type="image/png" sizes="32x32" href="../../icons/favicon-32x32.png">',
    '    <link rel="icon" type="image/png" sizes="16x16" href="../../icons/favicon-16x16.png">',
    '    <link rel="icon" href="../../favicon.ico" sizes="any">',
    '    <link rel="apple-touch-icon" sizes="180x180" href="../../icons/apple-touch-icon.png">',
    '    <link rel="manifest" href="../../site.webmanifest">',
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
