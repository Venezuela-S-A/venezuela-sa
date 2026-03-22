#!/usr/bin/env node

/**
 * Pre-build script: Render Mermaid diagrams to static SVG files.
 * Reads all .md files from ../docs/, extracts mermaid code blocks,
 * and renders them to pwa/static/diagrams/{md5hash}.svg using @mermaid-js/mermaid-cli.
 *
 * Uses content-hash caching: if the SVG already exists, skip rendering.
 *
 * Usage: node scripts/build-mermaid.js
 * Integrated into build pipeline via "build:mermaid" npm script.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'fs';
import { join, resolve } from 'path';
import { createHash } from 'crypto';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

const DOCS_DIR = resolve(import.meta.dirname, '../../docs');
const OUTPUT_DIR = resolve(import.meta.dirname, '../static/diagrams');
const MERMAID_REGEX = /```mermaid\n([\s\S]*?)```/g;

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Recursively find all .md files in a directory.
 */
function findMarkdownFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...findMarkdownFiles(fullPath));
    } else if (entry.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Create a placeholder SVG for diagrams that fail to render.
 * Per D-20: xychart-beta failures get a descriptive placeholder.
 */
function createPlaceholderSvg(diagramType) {
  const message = diagramType === 'xychart'
    ? 'Grafico interactivo disponible en la Fase 3'
    : 'Diagrama no disponible';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 120">
  <rect width="400" height="120" rx="8" fill="#1a1a2e" stroke="#334155" stroke-width="1"/>
  <text x="200" y="55" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14">${message}</text>
  <text x="200" y="80" text-anchor="middle" fill="#64748b" font-family="system-ui, sans-serif" font-size="11">Tipo: ${diagramType}</text>
</svg>`;
}

// Main execution
const mdFiles = findMarkdownFiles(DOCS_DIR);
let totalDiagrams = 0;
let cached = 0;
let rendered = 0;
let failed = 0;

const diagrams = [];

// Extract all mermaid blocks from all files
for (const file of mdFiles) {
  const content = readFileSync(file, 'utf-8');
  let match;
  MERMAID_REGEX.lastIndex = 0;
  while ((match = MERMAID_REGEX.exec(content)) !== null) {
    const mermaidContent = match[1].trim();
    const hash = createHash('md5').update(mermaidContent).digest('hex');
    const firstLine = mermaidContent.split('\n')[0].toLowerCase();

    let diagramType = 'other';
    if (/^(flowchart|graph)\b/.test(firstLine)) diagramType = 'flowchart';
    else if (/^xychart-beta\b/.test(firstLine)) diagramType = 'xychart';
    else if (/^gantt\b/.test(firstLine)) diagramType = 'gantt';
    else if (/^pie\b/.test(firstLine)) diagramType = 'pie';

    diagrams.push({ hash, content: mermaidContent, type: diagramType, file });
    totalDiagrams++;
  }
}

console.log(`Found ${totalDiagrams} Mermaid diagrams in ${mdFiles.length} files`);

// Render each diagram
for (const diagram of diagrams) {
  const outputPath = join(OUTPUT_DIR, `${diagram.hash}.svg`);

  // Cache hit — skip
  if (existsSync(outputPath)) {
    cached++;
    continue;
  }

  // Write temp .mmd file
  const tmpFile = join(tmpdir(), `mermaid-${diagram.hash}.mmd`);
  const tmpOut = join(tmpdir(), `mermaid-${diagram.hash}.svg`);

  try {
    writeFileSync(tmpFile, diagram.content, 'utf-8');

    // Resolve mmdc binary from node_modules
    const mmdcPath = resolve(import.meta.dirname, '../node_modules/.bin/mmdc');

    execSync(`"${mmdcPath}" -i "${tmpFile}" -o "${tmpOut}" -t dark -b transparent --quiet`, {
      timeout: 30000,
      stdio: 'pipe',
    });

    if (existsSync(tmpOut)) {
      const svg = readFileSync(tmpOut, 'utf-8');
      writeFileSync(outputPath, svg, 'utf-8');
      rendered++;
    } else {
      throw new Error('SVG output not created');
    }
  } catch (err) {
    // Per D-20: create placeholder for failed renders
    console.warn(`  Warning: Failed to render ${diagram.type} diagram (${diagram.hash.slice(0, 8)}): ${err.message}`);
    writeFileSync(outputPath, createPlaceholderSvg(diagram.type), 'utf-8');
    failed++;
  } finally {
    // Cleanup temp files
    try { if (existsSync(tmpFile)) unlinkSync(tmpFile); } catch {}
    try { if (existsSync(tmpOut)) unlinkSync(tmpOut); } catch {}
  }
}

console.log(`Rendered ${rendered} new diagrams, ${cached} cached, ${failed} failed (placeholders created)`);
