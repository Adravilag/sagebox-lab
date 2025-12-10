import type { APIRoute } from 'astro';
import path from 'node:path';
import { getLibraryPath, getIconsPath, getOutputPath, setOutputPath } from '../../lib/icons';

/**
 * Configuration API for Icon Manager
 * 
 * GET /api/config - Returns current configuration
 * POST /api/config - Updates configuration (saves output path)
 */

export const GET: APIRoute = async () => {
  try {
    const iconsPath = process.env.ICONS_PATH || '';
    const workspacePath = process.env.WORKSPACE_PATH || '';
    
    // Get the actual library path (AppData location)
    const libraryPath = getLibraryPath();
    const libraryIconsPath = getIconsPath();
    
    // Get configured output path
    const outputPath = getOutputPath();
    
    // Extract relative path from full icons path
    let relativePath = outputPath || 'src/icons';
    if (iconsPath && workspacePath) {
      const fullDir = path.dirname(iconsPath);
      relativePath = path.relative(workspacePath, fullDir).replaceAll('\\', '/');
    }

    return new Response(JSON.stringify({
      iconsPath: relativePath,
      outputPath: outputPath,
      workspacePath: workspacePath,
      fullIconsPath: iconsPath,
      isVSCodeExtension: !!process.env.ICONS_PATH,
      // Library location (AppData)
      libraryPath: libraryPath,
      libraryIconsPath: libraryIconsPath
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Failed to get configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const { iconsPath } = await request.json();

    if (!iconsPath) {
      return new Response(JSON.stringify({
        success: false,
        error: 'No path provided'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Save the output path to config
    setOutputPath(iconsPath);

    return new Response(JSON.stringify({
      success: true,
      message: 'Configuration saved successfully',
      outputPath: iconsPath
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Failed to update configuration',
      details: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
