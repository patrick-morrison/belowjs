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
      let content = fs.readFileSync(srcPath, 'utf8');
      
      // Convert HTML files to use CDN imports
      if (entry.name.endsWith('.html')) {
        content = convertToCDN(content, version);
      }
      
      fs.writeFileSync(destPath, content, 'utf8');
    }
  }
}

function convertToCDN(htmlContent, version) {
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
  
  // Convert model URLs to GitHub Pages URLs
  htmlContent = htmlContent.replace(
    /url: '\/models\//g,
    "url: 'https://patrick-morrison.github.io/belowjs/models/"
  );
  
  return htmlContent;
}

// Copy examples
copyDir(EXAMPLES_SRC, EXAMPLES_DEST);

// Copy homepage demo from site/public to docs/
const HOMEPAGE_DEMO_SRC = path.join(rootDir, 'site', 'public', 'homepage-demo.html');
const HOMEPAGE_DEMO_DEST = path.join(rootDir, 'docs', 'homepage-demo.html');
const MODELS_SRC = path.join(rootDir, 'site', 'public', 'models');
const MODELS_DEST = path.join(rootDir, 'docs', 'models');

if (fs.existsSync(HOMEPAGE_DEMO_SRC)) {
  let content = fs.readFileSync(HOMEPAGE_DEMO_SRC, 'utf8');
  content = convertToCDN(content, version);
  fs.writeFileSync(HOMEPAGE_DEMO_DEST, content, 'utf8');
  console.log('✅ Homepage demo copied to docs/');
}

if (fs.existsSync(MODELS_SRC)) {
  copyDir(MODELS_SRC, MODELS_DEST);
  console.log('✅ Models copied to docs/');
}

console.log('✅ Examples copied to docs/ with CDN imports');