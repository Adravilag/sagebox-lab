import type { APIRoute } from 'astro';
import { exportProjectIcons } from '../../../lib/icons';
import { generateLicenseFile, generateIndividualLicenses } from '../../../lib/licenses';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Export project icons in the format required by sg-icon component.
 * This generates the TypeScript file that sg-icon uses.
 *
 * GET /api/project/build - Returns the TypeScript content
 * POST /api/project/build - Writes directly to src/components/svg-icon/icons/index.ts
 */

function generateIconsTS(icons: { name: string; content: string }[]): string {
  const timestamp = new Date().toISOString();

  let output = `/**
 * SVG Icon Library - Centralized icon definitions
 *
 * [!] ARCHIVO AUTO-GENERADO POR ICON MANAGER - NO EDITAR MANUALMENTE
 *
 * Iconos seleccionados en el proyecto: ${icons.length}
 * Generado: ${timestamp}
 */

export interface IconDefinition {
  paths: string[];
  viewBox?: string;
  fillRule?: 'nonzero' | 'evenodd';
}

export const icons: Record<string, IconDefinition> = {
`;

  // Process each icon
  icons.forEach((icon, index) => {
    const { name, content } = icon;

    // Parse SVG to extract paths and viewBox
    const viewBoxRegex = /viewBox=["']([^"']+)["']/i;
    const viewBoxMatch = viewBoxRegex.exec(content);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    const paths: string[] = [];
    const pathMatches = content.matchAll(/<path[^>]*d=["']([^"']+)["'][^>]*\/?>/gi);
    for (const match of pathMatches) {
      paths.push(match[1]);
    }

    // Check for fill-rule
    const fillRuleRegex = /fill-rule=["']([^"']+)["']/i;
    const fillRuleMatch = fillRuleRegex.exec(content);
    const fillRule = fillRuleMatch ? fillRuleMatch[1] : null;

    // Generate the entry - remove prefix for cleaner names
    const cleanName = name.includes(':') ? name.split(':')[1] : name;

    output += `  '${cleanName}': {\n`;
    output += `    paths: [\n`;
    paths.forEach((p, i) => {
      output += `      '${p}'${i < paths.length - 1 ? ',' : ''}\n`;
    });
    output += `    ],\n`;

    if (viewBox !== '0 0 24 24') {
      output += `    viewBox: '${viewBox}',\n`;
    }

    if (fillRule && fillRule !== 'nonzero') {
      output += `    fillRule: '${fillRule}',\n`;
    }

    output += `  }${index < icons.length - 1 ? ',' : ''}\n`;
  });

  output += `};\n`;

  return output;
}

// GET - Preview the generated TypeScript
export const GET: APIRoute = async () => {
  try {
    const icons = await exportProjectIcons();

    if (icons.length === 0) {
      return new Response(JSON.stringify({
        error: 'No icons in project. Add icons first using "Add to Project".',
        count: 0
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tsContent = generateIconsTS(icons);

    return new Response(tsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="index.ts"'
      }
    });
  } catch (error) {
    console.error('[API] Failed to generate icons:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate icons', details: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Build and write to sg-icon component
export const POST: APIRoute = async () => {
  try {
    const icons = await exportProjectIcons();

    if (icons.length === 0) {
      return new Response(JSON.stringify({
        error: 'No icons in project. Add icons first using "Add to Project".',
        count: 0
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const tsContent = generateIconsTS(icons);

    // Write to the sg-icon component
    // From tools/icon-manager → go up twice to root, then into src/components/svg-icon/icons/
    const iconsPath = path.resolve(process.cwd(), '..', '..', 'src', 'components', 'svg-icon', 'icons', 'index.ts');

    // Create directory if it doesn't exist
    const dir = path.dirname(iconsPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(iconsPath, tsContent, 'utf-8');

    // Generate license files
    const usedPrefixes = icons
      .map(icon => icon.name.split(':')[0])
      .filter(Boolean);
    
    // Create licenses directory
    const licensesDir = path.join(dir, 'licenses');
    if (!fs.existsSync(licensesDir)) {
      fs.mkdirSync(licensesDir, { recursive: true });
    }

    // Write combined license file
    const combinedLicense = generateLicenseFile(usedPrefixes);
    fs.writeFileSync(path.join(licensesDir, 'LICENSES.md'), combinedLicense, 'utf-8');

    // Write individual license files
    const individualLicenses = generateIndividualLicenses(usedPrefixes);
    for (const [filename, content] of Object.entries(individualLicenses)) {
      fs.writeFileSync(path.join(licensesDir, filename), content, 'utf-8');
    }

    const uniquePrefixes = [...new Set(usedPrefixes)];

    return new Response(JSON.stringify({
      success: true,
      message: `Built ${icons.length} icons to sg-icon component`,
      count: icons.length,
      path: iconsPath,
      licenses: {
        count: uniquePrefixes.length,
        sets: uniquePrefixes,
        path: licensesDir
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({
      error: 'Failed to build icons',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
