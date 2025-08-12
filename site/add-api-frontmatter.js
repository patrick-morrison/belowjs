#!/usr/bin/env node

/**
 * Post-processing script to add VitePress frontmatter to TypeDoc generated API docs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DOCS_API_DIR = path.join(__dirname, 'api');

const FRONTMATTER = `---
layout: doc
sidebar: true
---

`;

/**
 * Recursively find all .md files in a directory
 */
function findMarkdownFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item.name);
      
      if (item.isDirectory()) {
        traverse(fullPath);
      } else if (item.isFile() && item.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * Check if a file already has frontmatter
 */
function hasFrontmatter(content) {
  return content.trimStart().startsWith('---');
}

/**
 * Add frontmatter to a markdown file if it doesn't already have it
 */
function addFrontmatterToFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (hasFrontmatter(content)) {
      console.log(`✓ ${path.relative(DOCS_API_DIR, filePath)} already has frontmatter`);
      return;
    }
    
    const newContent = FRONTMATTER + content;
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✓ Added frontmatter to ${path.relative(DOCS_API_DIR, filePath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main function
 */
function main() {
  console.log('Adding VitePress frontmatter to API documentation...\n');
  
  if (!fs.existsSync(DOCS_API_DIR)) {
    console.error(`Error: API docs directory not found at ${DOCS_API_DIR}`);
    console.error('Run "npm run docs:api" first to generate the API documentation.');
    process.exit(1);
  }
  
  // Rename README.md to index.md for VitePress compatibility
  const readmePath = path.join(DOCS_API_DIR, 'README.md');
  const indexPath = path.join(DOCS_API_DIR, 'index.md');
  
  if (fs.existsSync(readmePath)) {
    fs.renameSync(readmePath, indexPath);
    console.log('✓ Renamed README.md to index.md for VitePress compatibility\n');
  }
  
  const markdownFiles = findMarkdownFiles(DOCS_API_DIR);
  
  if (markdownFiles.length === 0) {
    console.log('No markdown files found in API docs directory.');
    return;
  }
  
  console.log(`Found ${markdownFiles.length} markdown files to process:\n`);
  
  markdownFiles.forEach(addFrontmatterToFile);
  
  console.log(`\n✅ Finished processing ${markdownFiles.length} files.`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
