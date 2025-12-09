#!/usr/bin/env node

/**
 * SageBox Lab CLI
 * 
 * Development tools for SageBox UI components
 * 
 * Usage:
 *   sagebox-lab <tool> [options]
 *   sagebox-lab icon-manager
 *   sagebox-lab style-editor
 *   sagebox-lab event-editor
 */

import { program } from 'commander';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';
import open from 'open';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Read package.json for version
const pkg = JSON.parse(readFileSync(join(ROOT_DIR, 'package.json'), 'utf-8'));

const TOOLS = {
  'icon-manager': {
    name: 'Icon Manager',
    description: 'Manage and organize SVG icons for your project',
    port: 4568,
  },
  'style-editor': {
    name: 'Style Editor',
    description: 'Edit and preview CSS tokens and design variables',
    port: 4569,
  },
  'event-editor': {
    name: 'Event Editor',
    description: 'Configure and test component events',
    port: 4570,
  },
};

/**
 * Start a tool server (SSR mode)
 */
async function startTool(toolName, options = {}) {
  const tool = TOOLS[toolName];
  
  if (!tool) {
    console.error(`❌ Unknown tool: ${toolName}`);
    console.log('');
    console.log('Available tools:');
    Object.entries(TOOLS).forEach(([name, info]) => {
      console.log(`  ${name.padEnd(15)} - ${info.description}`);
    });
    process.exit(1);
  }

  const appDir = join(ROOT_DIR, 'apps', toolName);
  const entryPath = join(appDir, 'dist', 'server', 'entry.mjs');
  
  // Check if built
  if (!existsSync(entryPath)) {
    console.log(`⏳ Building ${tool.name}...`);
    
    // Run build
    const buildProcess = spawn('npm', ['run', 'build'], {
      cwd: appDir,
      stdio: 'inherit',
      shell: true,
    });
    
    await new Promise((resolve, reject) => {
      buildProcess.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Build failed with code ${code}`));
      });
    });
  }

  const url = `http://localhost:${tool.port}`;
  
  console.log('');
  console.log(`🧪 SageBox Lab - ${tool.name}`);
  console.log('');
  console.log(`   Local:   ${url}`);
  console.log('');
  console.log('   Press Ctrl+C to stop');
  console.log('');

  // Set PORT environment variable
  const env = { ...process.env, PORT: tool.port.toString(), HOST: '0.0.0.0' };
  
  // Start the server
  const serverProcess = spawn('node', [entryPath], {
    cwd: appDir,
    stdio: 'inherit',
    env,
  });

  // Open browser after a short delay
  if (!options.noBrowser) {
    setTimeout(() => {
      open(url);
    }, 1500);
  }

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    serverProcess.kill();
    process.exit(0);
  });

  // Keep the process alive
  await new Promise(() => {});
}

/**
 * Start a tool in development mode
 */
async function startToolDev(toolName) {
  const tool = TOOLS[toolName];
  
  if (!tool) {
    console.error(`❌ Unknown tool: ${toolName}`);
    process.exit(1);
  }

  const appDir = join(ROOT_DIR, 'apps', toolName);
  
  console.log('');
  console.log(`🧪 SageBox Lab - ${tool.name} (dev mode)`);
  console.log('');

  const devProcess = spawn('npm', ['run', 'dev'], {
    cwd: appDir,
    stdio: 'inherit',
    shell: true,
  });

  process.on('SIGINT', () => {
    devProcess.kill();
    process.exit(0);
  });

  await new Promise(() => {});
}

// CLI setup
program
  .name('sagebox-lab')
  .description('🧪 SageBox Lab - Development tools for SageBox UI components')
  .version(pkg.version);

program
  .command('icon-manager')
  .alias('icons')
  .description('Manage and organize SVG icons')
  .option('--dev', 'Run in development mode')
  .option('--no-browser', 'Do not open browser automatically')
  .action((options) => {
    if (options.dev) {
      startToolDev('icon-manager');
    } else {
      startTool('icon-manager', { noBrowser: options.noBrowser === false });
    }
  });

program
  .command('style-editor')
  .alias('styles')
  .description('Edit CSS tokens and design variables')
  .option('--dev', 'Run in development mode')
  .option('--no-browser', 'Do not open browser automatically')
  .action((options) => {
    if (options.dev) {
      startToolDev('style-editor');
    } else {
      startTool('style-editor', { noBrowser: options.noBrowser === false });
    }
  });

program
  .command('event-editor')
  .alias('events')
  .description('Configure and test component events')
  .option('--dev', 'Run in development mode')
  .option('--no-browser', 'Do not open browser automatically')
  .action((options) => {
    if (options.dev) {
      startToolDev('event-editor');
    } else {
      startTool('event-editor', { noBrowser: options.noBrowser === false });
    }
  });

program
  .command('list')
  .description('List all available tools')
  .action(() => {
    console.log('');
    console.log('🧪 SageBox Lab - Available Tools');
    console.log('');
    Object.entries(TOOLS).forEach(([name, info]) => {
      console.log(`   ${name.padEnd(15)} - ${info.description}`);
    });
    console.log('');
    console.log('Usage: sagebox-lab <tool>');
    console.log('');
  });

// Default action - show help
program.action(() => {
  program.help();
});

program.parse();
