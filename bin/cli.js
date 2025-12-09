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
import { createServer } from 'http';
import sirv from 'sirv';
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
 * Start a local server for a tool
 */
async function startTool(toolName) {
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

  const distPath = join(ROOT_DIR, 'apps', toolName, 'dist');
  
  if (!existsSync(distPath)) {
    console.error(`❌ Tool "${toolName}" is not built.`);
    console.log('');
    console.log('Run the following command to build:');
    console.log(`  npm run build --workspace=apps/${toolName}`);
    process.exit(1);
  }

  const serve = sirv(distPath, { single: true, dev: false });
  
  const server = createServer((req, res) => {
    serve(req, res, () => {
      res.statusCode = 404;
      res.end('Not found');
    });
  });

  server.listen(tool.port, () => {
    const url = `http://localhost:${tool.port}`;
    console.log('');
    console.log(`🧪 SageBox Lab - ${tool.name}`);
    console.log('');
    console.log(`   Local:   ${url}`);
    console.log('');
    console.log('   Press Ctrl+C to stop');
    console.log('');
    
    open(url);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down...');
    server.close();
    process.exit(0);
  });
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
  .action(() => startTool('icon-manager'));

program
  .command('style-editor')
  .alias('styles')
  .description('Edit CSS tokens and design variables')
  .action(() => startTool('style-editor'));

program
  .command('event-editor')
  .alias('events')
  .description('Configure and test component events')
  .action(() => startTool('event-editor'));

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
