#!/usr/bin/env node
/**
 * CI gate: Verifies initial JS bundle < 200KB gzipped.
 *
 * "Initial bundle" = entry point files (app.js + start.js) + layout/page nodes.
 * SvelteKit code-splits per route: content chunks in _app/immutable/chunks/ are
 * lazy-loaded and NOT part of the critical rendering path.
 *
 * Measures: build/_app/immutable/entry/*.js  (SvelteKit bootstrap)
 *         + build/_app/immutable/nodes/*.js   (layout + page components)
 *
 * Run after `npm run build`. Exit 0 = pass, Exit 1 = fail.
 */
import { readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

const BUILD_DIR = join(import.meta.dirname, '..', 'build');
const ENTRY_DIR = join(BUILD_DIR, '_app', 'immutable', 'entry');
const NODES_DIR = join(BUILD_DIR, '_app', 'immutable', 'nodes');
const MAX_SIZE_KB = 200;

function findFiles(dir, ext, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      findFiles(fullPath, ext, files);
    } else if (entry.name.endsWith(ext)) {
      files.push(fullPath);
    }
  }
  return files;
}

try {
  // Measure entry points (app.js + start.js) — always loaded
  const entryFiles = findFiles(ENTRY_DIR, '.js')
    .filter(f => !f.endsWith('.js.gz') && !f.endsWith('.js.br'));
  const entryGz = findFiles(ENTRY_DIR, '.js.gz');

  // Measure node files (layout + page component code)
  const nodeFiles = findFiles(NODES_DIR, '.js')
    .filter(f => !f.endsWith('.js.gz') && !f.endsWith('.js.br'));
  const nodeGz = findFiles(NODES_DIR, '.js.gz');

  const initialFiles = [...entryFiles, ...nodeFiles];
  const initialGz = [...entryGz, ...nodeGz];

  let rawSize = 0;
  for (const file of initialFiles) {
    rawSize += statSync(file).size;
  }

  let gzippedSize = 0;
  if (initialGz.length > 0) {
    for (const file of initialGz) {
      gzippedSize += statSync(file).size;
    }
  } else {
    gzippedSize = Math.round(rawSize / 3);
  }

  const rawKB = Math.round(rawSize / 1024);
  const gzippedKB = Math.round(gzippedSize / 1024);

  console.log(`Initial bundle: ${rawKB}KB raw, ~${gzippedKB}KB gzipped`);
  console.log(`  Entry files: ${entryFiles.length}`);
  console.log(`  Node files: ${nodeFiles.length}`);
  console.log(`Budget: ${MAX_SIZE_KB}KB gzipped`);

  if (gzippedKB > MAX_SIZE_KB) {
    console.error(`FAIL: Initial bundle exceeds ${MAX_SIZE_KB}KB gzipped budget (${gzippedKB}KB)`);
    process.exit(1);
  }

  console.log('PASS: Initial bundle within budget');
  process.exit(0);
} catch (err) {
  console.error('Error checking bundle size:', err.message);
  process.exit(1);
}
