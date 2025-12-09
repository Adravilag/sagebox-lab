import type { APIRoute } from 'astro';
import { exportProjectIcons } from '../../../lib/icons';

// GET - Export only project icons (for production build)
// Format: { "icon-name": "<svg>...</svg>", ... }
export const GET: APIRoute = async () => {
  try {
    const icons = await exportProjectIcons();

    // Convert to object format for direct access by name
    const iconsObject: Record<string, string> = {};
    for (const icon of icons) {
      // Remove prefix for cleaner names (e.g., "fa6-solid:anchor" -> "anchor")
      const cleanName = icon.name.includes(':') ? icon.name.split(':')[1] : icon.name;
      iconsObject[cleanName] = icon.content;
    }

    return new Response(JSON.stringify(iconsObject, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': 'attachment; filename="project-icons.json"'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to export project icons' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
