import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';

const execAsync = promisify(exec);

// Icon set metadata with animated flag
export const ICON_SETS: Record<string, { name: string; color: string; license: string; animated?: boolean }> = {
  // Static icon sets
  'lucide': { name: 'Lucide', color: '#f472b6', license: 'ISC' },
  'heroicons': { name: 'Heroicons', color: '#38bdf8', license: 'MIT' },
  'material-symbols': { name: 'Material Symbols', color: '#fbbf24', license: 'Apache 2.0' },
  'tabler': { name: 'Tabler Icons', color: '#4ade80', license: 'MIT' },
  'feather': { name: 'Feather', color: '#a78bfa', license: 'MIT' },
  'mdi': { name: 'Material Design Icons', color: '#fb923c', license: 'Apache 2.0' },
  'bi': { name: 'Bootstrap Icons', color: '#818cf8', license: 'MIT' },
  'carbon': { name: 'Carbon', color: '#2dd4bf', license: 'Apache 2.0' },
  'ph': { name: 'Phosphor', color: '#f87171', license: 'MIT' },
  'ion': { name: 'Ionicons', color: '#60a5fa', license: 'MIT' },
  'ri': { name: 'Remix Icon', color: '#c084fc', license: 'Apache 2.0' },
  'solar': { name: 'Solar', color: '#facc15', license: 'CC BY 4.0' },
  'fa6-solid': { name: 'Font Awesome Solid', color: '#538DD7', license: 'CC BY 4.0' },
  'fa6-regular': { name: 'Font Awesome Regular', color: '#538DD7', license: 'CC BY 4.0' },
  'radix-icons': { name: 'Radix Icons', color: '#9333EA', license: 'MIT' },
  'eos-icons': { name: 'EOS Icons', color: '#06b6d4', license: 'MIT' },

  // Animated icon sets from Iconify (100% animated)
  'svg-spinners': { name: 'SVG Spinners', color: '#ec4899', license: 'MIT', animated: true },
  'line-md': { name: 'Line MD', color: '#f472b6', license: 'MIT', animated: true },

  // Custom animated (local)
  'animated': { name: 'Custom Animated', color: '#a855f7', license: 'MIT', animated: true },
};

// Predefined animated icons
export const ANIMATED_ICONS: Record<string, string> = {
  'animated:spinner': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></path></svg>`,

  'animated:dots': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="4" cy="12" r="3" fill="currentColor"><animate attributeName="opacity" dur="1s" values="1;0.2;1" repeatCount="indefinite" begin="0"/></circle><circle cx="12" cy="12" r="3" fill="currentColor"><animate attributeName="opacity" dur="1s" values="1;0.2;1" repeatCount="indefinite" begin="0.2s"/></circle><circle cx="20" cy="12" r="3" fill="currentColor"><animate attributeName="opacity" dur="1s" values="1;0.2;1" repeatCount="indefinite" begin="0.4s"/></circle></svg>`,

  'animated:pulse': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor"><animate attributeName="r" dur="1.5s" values="8;12;8" repeatCount="indefinite"/><animate attributeName="opacity" dur="1.5s" values="1;0.5;1" repeatCount="indefinite"/></circle></svg>`,

  'animated:bars': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="2" y="6" width="4" height="12" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="12;20;12" repeatCount="indefinite" begin="0"/><animate attributeName="y" dur="1s" values="6;2;6" repeatCount="indefinite" begin="0"/></rect><rect x="10" y="6" width="4" height="12" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="12;20;12" repeatCount="indefinite" begin="0.2s"/><animate attributeName="y" dur="1s" values="6;2;6" repeatCount="indefinite" begin="0.2s"/></rect><rect x="18" y="6" width="4" height="12" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="12;20;12" repeatCount="indefinite" begin="0.4s"/><animate attributeName="y" dur="1s" values="6;2;6" repeatCount="indefinite" begin="0.4s"/></rect></svg>`,

  'animated:ring': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"><animate attributeName="stroke-dasharray" dur="1.5s" values="0 63;63 63" repeatCount="indefinite"/><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></circle></svg>`,

  'animated:bounce': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="6" fill="currentColor"><animate attributeName="cy" dur="0.6s" values="12;6;12" repeatCount="indefinite" calcMode="spline" keySplines="0.5 0 0.5 1; 0.5 0 0.5 1"/></circle></svg>`,

  'animated:wave': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect x="1" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0"/></rect><rect x="6" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0.1s"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0.1s"/></rect><rect x="11" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0.2s"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0.2s"/></rect><rect x="16" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0.3s"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0.3s"/></rect><rect x="21" y="8" width="3" height="8" rx="1" fill="currentColor"><animate attributeName="height" dur="1s" values="8;16;8" repeatCount="indefinite" begin="0.4s"/><animate attributeName="y" dur="1s" values="8;4;8" repeatCount="indefinite" begin="0.4s"/></rect></svg>`,

  'animated:heart': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"><animate attributeName="transform" type="scale" values="1;1.2;1" dur="0.8s" repeatCount="indefinite" additive="sum"/><animateTransform attributeName="transform" type="translate" values="0 0;0 0;0 0" dur="0.8s" repeatCount="indefinite"/></path></svg>`,

  'animated:loading-circle': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="2" fill="currentColor"><animate attributeName="r" dur="1.5s" values="2;6;2" repeatCount="indefinite"/><animate attributeName="opacity" dur="1.5s" values="1;0;1" repeatCount="indefinite"/></circle><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" stroke-width="1"><animate attributeName="r" dur="1.5s" values="6;10;6" repeatCount="indefinite"/><animate attributeName="opacity" dur="1.5s" values="0.5;0;0.5" repeatCount="indefinite"/></circle></svg>`,

  'animated:sync': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" fill="currentColor"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1.5s" repeatCount="indefinite"/></path></svg>`,

  'animated:typing': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="6" cy="12" r="2" fill="currentColor"><animate attributeName="cy" dur="0.6s" values="12;8;12" repeatCount="indefinite" begin="0"/></circle><circle cx="12" cy="12" r="2" fill="currentColor"><animate attributeName="cy" dur="0.6s" values="12;8;12" repeatCount="indefinite" begin="0.15s"/></circle><circle cx="18" cy="12" r="2" fill="currentColor"><animate attributeName="cy" dur="0.6s" values="12;8;12" repeatCount="indefinite" begin="0.3s"/></circle></svg>`,

  'animated:clock': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/><line x1="12" y1="12" x2="12" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="12s" repeatCount="indefinite"/></line><line x1="12" y1="12" x2="16" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/></line></svg>`,
};

export type IconDefinition = {
  paths: string[];
  viewBox?: string;
  fillRule?: string;
};

export type Icons = Record<string, IconDefinition>;

export interface Icon {
  name: string;
  content: string;
  inProject?: boolean;  // Computed flag - true if icon is in current project's project-icons.json
}

// Get the AppData folder path based on the platform
function getAppDataPath(): string {
  const platform = process.platform;
  const homeDir = os.homedir();
  
  if (platform === 'win32') {
    // Windows: %APPDATA%/sagebox-icon-manager
    return path.join(process.env.APPDATA || path.join(homeDir, 'AppData', 'Roaming'), 'sagebox-icon-manager');
  } else if (platform === 'darwin') {
    // macOS: ~/Library/Application Support/sagebox-icon-manager
    return path.join(homeDir, 'Library', 'Application Support', 'sagebox-icon-manager');
  } else {
    // Linux/Unix: ~/.config/sagebox-icon-manager
    return path.join(process.env.XDG_CONFIG_HOME || path.join(homeDir, '.config'), 'sagebox-icon-manager');
  }
}

// Migrate icons from old project location to AppData (one-time migration)
function migrateIconsToAppData(appDataDir: string, iconsPath: string): void {
  // Check for old project-based icons.json locations
  const oldPaths = [
    path.resolve(process.cwd(), '..', 'src', 'icons.json'),
    path.resolve(process.cwd(), 'src', 'icons.json'),
  ];
  
  for (const oldPath of oldPaths) {
    if (fs.existsSync(oldPath)) {
      try {
        const oldData = fs.readFileSync(oldPath, 'utf-8');
        const oldIcons = JSON.parse(oldData);
        
        // Only migrate if there are icons and AppData is empty or doesn't exist
        if (Array.isArray(oldIcons) && oldIcons.length > 0) {
          // Create directory if needed
          if (!fs.existsSync(appDataDir)) {
            fs.mkdirSync(appDataDir, { recursive: true });
          }
          
          // Merge with existing AppData icons if any
          let existingIcons: Icon[] = [];
          if (fs.existsSync(iconsPath)) {
            try {
              existingIcons = JSON.parse(fs.readFileSync(iconsPath, 'utf-8')) || [];
            } catch {
              existingIcons = [];
            }
          }
          
          // Merge: existing icons take priority (avoid duplicates by name)
          const existingNames = new Set(existingIcons.map(i => i.name));
          const newIcons = oldIcons.filter((i: Icon) => !existingNames.has(i.name));
          const mergedIcons = [...existingIcons, ...newIcons];
          
          fs.writeFileSync(iconsPath, JSON.stringify(mergedIcons, null, 2), 'utf-8');
          
          // Remove the old file after successful migration
          fs.unlinkSync(oldPath);
          console.log(`[Icon Manager] Migrated ${newIcons.length} icons from ${oldPath} to AppData`);
        }
        break; // Only migrate from first found location
      } catch (e) {
        console.error(`[Icon Manager] Failed to migrate icons from ${oldPath}:`, e);
      }
    }
  }
}

// Get icons.json path (library - stored in AppData, global across all projects)
export function getIconsPath(): string {
  // Allow override via env variable
  const envPath = process.env.ICONS_PATH;
  if (envPath && fs.existsSync(envPath)) {
    return envPath;
  }

  // Use AppData folder for library storage
  const appDataDir = getAppDataPath();
  const iconsPath = path.join(appDataDir, 'icons.json');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(appDataDir)) {
    fs.mkdirSync(appDataDir, { recursive: true });
  }
  
  // Try to migrate from old project location (one-time)
  if (!fs.existsSync(iconsPath)) {
    migrateIconsToAppData(appDataDir, iconsPath);
  }
  
  // If icons.json still doesn't exist, create empty one
  if (!fs.existsSync(iconsPath)) {
    fs.writeFileSync(iconsPath, '[]', 'utf-8');
  }
  
  return iconsPath;
}

// Get the library folder path (useful for UI to show location)
export function getLibraryPath(): string {
  return getAppDataPath();
}

// Get or set the current project output path (stored in AppData for persistence)
let cachedOutputPath: string | null = null;

export function getOutputPath(): string | null {
  if (cachedOutputPath) return cachedOutputPath;
  
  // Check environment variable first (VS Code extension)
  if (process.env.WORKSPACE_PATH) {
    return path.join(process.env.WORKSPACE_PATH, 'src', 'icons');
  }
  
  // Check config file in AppData
  const configPath = path.join(getAppDataPath(), 'config.json');
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
      if (config.outputPath) {
        cachedOutputPath = config.outputPath;
        return cachedOutputPath;
      }
    } catch {}
  }
  
  return null;
}

export function setOutputPath(outputPath: string): void {
  cachedOutputPath = outputPath;
  
  // Persist to config file
  const configPath = path.join(getAppDataPath(), 'config.json');
  let config: Record<string, any> = {};
  
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    } catch {}
  }
  
  config.outputPath = outputPath;
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}

// Get project-icons.json path (project-specific file with icon names used in that project)
export function getProjectIconsPath(): string {
  // First check cached/configured output path
  const outputPath = getOutputPath();
  if (outputPath) {
    return path.join(outputPath, 'project-icons.json');
  }
  
  // First check environment variable (set by VS Code extension)
  const workspacePath = process.env.WORKSPACE_PATH;
  if (workspacePath) {
    return path.join(workspacePath, 'src', 'icons', 'project-icons.json');
  }
  
  // Default: look relative to cwd
  const defaultPath = path.resolve(process.cwd(), '..', 'src', 'project-icons.json');
  if (fs.existsSync(defaultPath)) {
    return defaultPath;
  }
  
  // Fallback
  return path.resolve(process.cwd(), 'src', 'project-icons.json');
}

// Read project icon names from project-icons.json (project-specific)
export async function readProjectIconNames(): Promise<Set<string>> {
  const projectIconsPath = getProjectIconsPath();
  
  if (!fs.existsSync(projectIconsPath)) {
    return new Set();
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(projectIconsPath, 'utf-8'));
    if (Array.isArray(data)) {
      return new Set(data);
    }
    return new Set();
  } catch {
    return new Set();
  }
}

// Save project icon names to project-icons.json
async function saveProjectIconNames(iconNames: string[]): Promise<void> {
  const projectIconsPath = getProjectIconsPath();
  const dir = path.dirname(projectIconsPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  fs.writeFileSync(projectIconsPath, JSON.stringify(iconNames, null, 2), 'utf-8');
}

// Read project icon names (icons that are in the current project)
export async function readProjectIcons(): Promise<Set<string>> {
  return readProjectIconNames();
}

// Save icons and trigger auto-build
async function saveIconsAndBuild(icons: Icon[]): Promise<void> {
  await saveIcons(icons);

  // Wait for filesystem to sync
  await new Promise(resolve => setTimeout(resolve, 300));

  // Auto-build using CLI (for user projects)
  await runCliBuild();
}

// Run the build to generate TypeScript and JSON files in the output path
async function runCliBuild(): Promise<{ success: boolean; message: string }> {
  const outputPath = getOutputPath();
  
  if (!outputPath) {
    console.log('[Icon Manager] No output path configured, skipping auto-build');
    return { success: false, message: 'No output path configured' };
  }

  try {
    console.log(`[Icon Manager] Auto-building to: ${outputPath}`);
    
    // Get project icons (only icons that are in project-icons.json)
    const projectIcons = await exportProjectIcons();
    
    if (projectIcons.length === 0) {
      console.log('[Icon Manager] No icons in project, nothing to build');
      return { success: true, message: 'No icons to build' };
    }
    
    // Ensure output directory exists
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }
    
    // Generate and write index.ts
    const tsContent = generateIconsTS(projectIcons);
    const indexTsPath = path.join(outputPath, 'index.ts');
    fs.writeFileSync(indexTsPath, tsContent, 'utf-8');
    
    // Generate and write icons.json (just the project icons with name and content)
    const iconsJsonContent = projectIcons.map(icon => ({
      name: icon.name,
      content: icon.content
    }));
    const iconsJsonPath = path.join(outputPath, 'icons.json');
    fs.writeFileSync(iconsJsonPath, JSON.stringify(iconsJsonContent, null, 2), 'utf-8');
    
    // Generate and write index.json (icon names only, for quick reference)
    const indexJsonPath = path.join(outputPath, 'index.json');
    fs.writeFileSync(indexJsonPath, JSON.stringify(projectIcons.map(i => i.name), null, 2), 'utf-8');

    console.log(`[Icon Manager] ✓ Build completed: ${projectIcons.length} icons`);
    console.log(`[Icon Manager]   - ${indexTsPath}`);
    console.log(`[Icon Manager]   - ${iconsJsonPath}`);
    console.log(`[Icon Manager]   - ${indexJsonPath}`);
    
    return { success: true, message: `Built ${projectIcons.length} icons` };
  } catch (error) {
    console.error('[Icon Manager] Build failed:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Build failed' };
  }
}

// Generate TypeScript content for sg-icon component
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

  icons.forEach((icon, index) => {
    const { name, content } = icon;

    const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/i);
    const viewBox = viewBoxMatch ? viewBoxMatch[1] : '0 0 24 24';

    const paths: string[] = [];
    const pathMatches = content.matchAll(/<path[^>]*d=["']([^"']+)["'][^>]*\/?>/gi);
    for (const match of pathMatches) {
      paths.push(match[1]);
    }

    const fillRuleMatch = content.match(/fill-rule=["']([^"']+)["']/i);
    const fillRule = fillRuleMatch ? fillRuleMatch[1] : null;

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

// Build sg-icon component automatically
export async function buildSgIconComponent(): Promise<{ success: boolean; count: number; path: string }> {
  const icons = await exportProjectIcons();

  // Path to sg-icon component
  const iconsPath = path.resolve(process.cwd(), '..', '..', 'src', 'components', 'svg-icon', 'icons', 'index.ts');
  const dir = path.dirname(iconsPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const tsContent = generateIconsTS(icons);
  fs.writeFileSync(iconsPath, tsContent, 'utf-8');

  return { success: true, count: icons.length, path: iconsPath };
}

// Add icons to project (add to project-icons.json)
export async function addToProject(iconNames: string[]): Promise<void> {
  const currentProjectIcons = await readProjectIconNames();
  
  // Add new names to the set
  for (const name of iconNames) {
    currentProjectIcons.add(name);
  }
  
  // Save updated list
  await saveProjectIconNames(Array.from(currentProjectIcons).sort());
  
  // Wait for filesystem to sync and trigger build
  await new Promise(resolve => setTimeout(resolve, 300));
  await runCliBuild();
}

// Remove icons from project (remove from project-icons.json)
export async function removeFromProject(iconNames: string[]): Promise<void> {
  const currentProjectIcons = await readProjectIconNames();
  
  // Remove names from the set
  for (const name of iconNames) {
    currentProjectIcons.delete(name);
  }
  
  // Save updated list
  await saveProjectIconNames(Array.from(currentProjectIcons).sort());
  
  // Wait for filesystem to sync and trigger build
  await new Promise(resolve => setTimeout(resolve, 300));
  await runCliBuild();
}

// Export only project icons (for production build)
export async function exportProjectIcons(): Promise<Icon[]> {
  const allIcons = await readIcons();
  const projectIconNames = await readProjectIconNames();
  return allIcons.filter(icon => projectIconNames.has(icon.name));
}

// Read icons in raw JSON format
export function readIconsRaw(): Icons {
  const iconsPath = getIconsPath();
  if (!fs.existsSync(iconsPath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(iconsPath, 'utf-8'));
}

// Save icons in raw object format
export function saveIconsRaw(icons: Icons): void {
  const iconsPath = getIconsPath();
  const dir = path.dirname(iconsPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Sort by key alphabetically
  const sorted = Object.fromEntries(
    Object.entries(icons).sort(([a], [b]) => a.localeCompare(b))
  );
  fs.writeFileSync(iconsPath, JSON.stringify(sorted, null, 2), 'utf-8');
}

// Read icons as array with name/content/inProject for UI
// inProject is computed dynamically from project-icons.json
export async function readIcons(): Promise<Icon[]> {
  const iconsPath = getIconsPath();
  if (!fs.existsSync(iconsPath)) {
    return [];
  }

  try {
    const data = JSON.parse(fs.readFileSync(iconsPath, 'utf-8'));
    
    // Get project icon names to compute inProject flag
    const projectIconNames = await readProjectIconNames();

    // Handle both formats: array of {name, content} or object {name: def}
    if (Array.isArray(data)) {
      // Compute inProject from project-icons.json (not stored in library)
      return data.map(icon => ({
        name: icon.name,
        content: icon.content,
        inProject: projectIconNames.has(icon.name)
      }));
    }

    // Convert object format to array (legacy format)
    return Object.entries(data).map(([name, def]) => {
      const iconDef = def as IconDefinition;
      const viewBox = iconDef.viewBox || '0 0 24 24';
      const paths = iconDef.paths.map(d => {
        const fillRule = iconDef.fillRule ? ` fill-rule="${iconDef.fillRule}"` : '';
        return `<path d="${d}"${fillRule}/>`;
      }).join('');
      const content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="currentColor">${paths}</svg>`;
      return { name, content, inProject: projectIconNames.has(name) };
    });
  } catch {
    return [];
  }
}

// Save icons to library (without inProject - that's stored in project-icons.json)
export async function saveIcons(icons: Icon[]): Promise<void> {
  const iconsPath = getIconsPath();
  const dir = path.dirname(iconsPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Sort alphabetically and remove inProject (it's computed, not stored)
  const sorted = [...icons]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ name, content }) => ({ name, content }));
  
  fs.writeFileSync(iconsPath, JSON.stringify(sorted, null, 2), 'utf-8');

  // Ensure file is flushed to disk
  await new Promise(resolve => setTimeout(resolve, 50));
}

// Helper to detect animated SVGs
export function isAnimatedSVG(content: string): boolean {
  return /(<animate[^>]*>|<animateTransform[^>]*>|<animateMotion[^>]*>|<set\s[^>]*>)/i.test(content);
}

// Categorize icons by prefix
export function categorizeIcons(icons: Icon[]) {
  const knownPrefixes = Object.keys(ICON_SETS);
  const categories = {
    all: icons.length,
    custom: [] as string[],
    animated: [] as string[],
    sets: {} as Record<string, string[]>
  };

  icons.forEach(icon => {
    // Check if icon is animated
    if (isAnimatedSVG(icon.content)) {
      categories.animated.push(icon.name);
    }

    // Check if name has a prefix (e.g., "lucide:arrow" or "lucide-arrow")
    const colonIndex = icon.name.indexOf(':');
    const prefix = colonIndex > 0 ? icon.name.substring(0, colonIndex) : null;

    if (prefix && knownPrefixes.includes(prefix)) {
      if (!categories.sets[prefix]) {
        categories.sets[prefix] = [];
      }
      categories.sets[prefix].push(icon.name);
    } else {
      categories.custom.push(icon.name);
    }
  });

  return categories;
}

// Parse SVG to extract paths
export function parseSVG(svgContent: string) {
  const paths: string[] = [];
  let viewBox = '0 0 24 24';
  let fillRule: string | undefined;

  const viewBoxMatch = svgContent.match(/viewBox=["']([^"']+)["']/i);
  if (viewBoxMatch) {
    viewBox = viewBoxMatch[1];
  }

  const pathMatches = svgContent.matchAll(/<path[^>]*d=["']([^"']+)["'][^>]*\/?>/gi);
  for (const match of pathMatches) {
    paths.push(match[1]);
  }

  const fillRuleMatch = svgContent.match(/fill-rule=["']([^"']+)["']/i);
  if (fillRuleMatch) {
    fillRule = fillRuleMatch[1];
  }

  return { paths, viewBox, fillRule };
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}
