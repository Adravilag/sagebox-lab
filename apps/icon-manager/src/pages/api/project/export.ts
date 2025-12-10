import type { APIRoute } from 'astro';
import { exportProjectIcons } from '../../../lib/icons';
import { generateLicenseFile, getAttributionText, ICON_SET_LICENSES } from '../../../lib/licenses';

// GET - Export only project icons (for production build)
// Format: { icons: {...}, licenses: {...}, attribution: "..." }
export const GET: APIRoute = async ({ url }) => {
  try {
    const icons = await exportProjectIcons();
    const format = url.searchParams.get('format') || 'full';

    // Convert to object format for direct access by name
    const iconsObject: Record<string, string> = {};
    const usedPrefixes: string[] = [];
    
    for (const icon of icons) {
      // Remove prefix for cleaner names (e.g., "fa6-solid:anchor" -> "anchor")
      const cleanName = icon.name.includes(':') ? icon.name.split(':')[1] : icon.name;
      const prefix = icon.name.split(':')[0];
      iconsObject[cleanName] = icon.content;
      if (prefix) usedPrefixes.push(prefix);
    }

    // Simple format - just icons (backwards compatible)
    if (format === 'simple') {
      return new Response(JSON.stringify(iconsObject, null, 2), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': 'attachment; filename="project-icons.json"'
        }
      });
    }

    // Full format - icons + license info
    const uniquePrefixes = [...new Set(usedPrefixes)];
    const licensesInfo: Record<string, { type: string; url: string; attribution?: string }> = {};
    
    for (const prefix of uniquePrefixes) {
      const license = ICON_SET_LICENSES[prefix];
      if (license) {
        licensesInfo[prefix] = {
          type: license.type,
          url: license.url,
          attribution: license.attribution
        };
      }
    }

    const exportData = {
      icons: iconsObject,
      meta: {
        count: icons.length,
        generated: new Date().toISOString(),
        iconSets: uniquePrefixes
      },
      licenses: licensesInfo,
      attribution: getAttributionText(uniquePrefixes),
      licenseFile: generateLicenseFile(uniquePrefixes)
    };

    return new Response(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="project-icons.json"'
      }
    });
  } catch (error) {
    console.error('[API] Failed to export project icons:', error);
    return new Response(JSON.stringify({ error: 'Failed to export project icons', details: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
