import type { APIRoute } from 'astro';
import { exec } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const execAsync = promisify(exec);

/**
 * API endpoint to open a native folder picker dialog
 * Uses PowerShell on Windows, osascript on macOS, zenity on Linux
 */
export const GET: APIRoute = async () => {
  try {
    const platform = process.platform;
    let folderPath = '';

    if (platform === 'win32') {
      // Windows: Create a temporary PowerShell script file
      const tempDir = os.tmpdir();
      const scriptPath = path.join(tempDir, 'folder-picker.ps1');
      
      const psScript = `
Add-Type -AssemblyName System.Windows.Forms
$folderBrowser = New-Object System.Windows.Forms.FolderBrowserDialog
$folderBrowser.Description = "Select the folder for project icons"
$folderBrowser.ShowNewFolderButton = $true
$folderBrowser.RootFolder = [System.Environment+SpecialFolder]::MyComputer
$null = $folderBrowser.ShowDialog()
if ($folderBrowser.SelectedPath) {
    Write-Output $folderBrowser.SelectedPath
}
`;
      
      // Write script to temp file
      fs.writeFileSync(scriptPath, psScript, 'utf-8');
      
      try {
        const { stdout } = await execAsync(`powershell -ExecutionPolicy Bypass -File "${scriptPath}"`, {
          windowsHide: false,
          timeout: 120000 // 2 minute timeout
        });
        folderPath = stdout.trim();
      } finally {
        // Clean up temp file
        try { fs.unlinkSync(scriptPath); } catch {}
      }
      
    } else if (platform === 'darwin') {
      // macOS: Use osascript
      const { stdout } = await execAsync(`osascript -e 'POSIX path of (choose folder with prompt "Select the folder for project icons")'`);
      folderPath = stdout.trim();
      
    } else {
      // Linux: Try zenity or kdialog
      try {
        const { stdout } = await execAsync(`zenity --file-selection --directory --title="Select the folder for project icons"`);
        folderPath = stdout.trim();
      } catch {
        // Try kdialog as fallback
        const { stdout } = await execAsync(`kdialog --getexistingdirectory ~`);
        folderPath = stdout.trim();
      }
    }

    if (folderPath) {
      return new Response(JSON.stringify({ 
        success: true, 
        path: folderPath.replaceAll('\\', '/') 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'No folder selected' 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

  } catch (error) {
    console.error('Error opening folder dialog:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to open folder dialog'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
