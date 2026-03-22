#!/usr/bin/env node
/**
 * CI gate: Verifies initial JS bundle < 200KB gzipped.
 * Run after `npm run build`.
 * Exit 0 = pass, Exit 1 = fail.
 */
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const BUILD_DIR = join(import.meta.dirname, '..', 'build');
const MAX_SIZE_KB = 200;

function findFiles(dir, ext, files = []) {
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
  const jsFiles = findFiles(BUILD_DIR, '.js');
  let totalSize = 0;

  for (const file of jsFiles) {
    totalSize += statSync(file).size;
  }

  // Check if precompressed .gz files exist for accurate measurement
  let gzippedSize = 0;
  const gzFiles = findFiles(BUILD_DIR, '.js.gz');

  if (gzFiles.length > 0) {
    for (const file of gzFiles) {
      gzippedSize += statSync(file).size;
    }
  } else {
    // Fallback: estimate gzipped size (typical compression ratio ~3:1 for JS)
    gzippedSize = Math.round(totalSize / 3);
  }

  const gzippedKB = Math.round(gzippedSize / 1024);

  console.log(`JS bundle size: ${Math.round(totalSize / 1024)}KB raw, ~${gzippedKB}KB gzipped`);
  console.log(`Budget: ${MAX_SIZE_KB}KB gzipped`);

  if (gzippedKB > MAX_SIZE_KB) {
    console.error(`FAIL: Bundle exceeds ${MAX_SIZE_KB}KB gzipped budget (${gzippedKB}KB)`);
    process.exit(1);
  }

  console.log('PASS: Bundle within budget');
  process.exit(0);
} catch (err) {
  console.error('Error checking bundle size:', err.message);
  process.exit(1);
}
