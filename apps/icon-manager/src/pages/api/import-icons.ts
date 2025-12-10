import type { APIRoute } from 'astro';
import { readIcons, saveIcons, ICON_SETS, type Icon } from '../../lib/icons.ts';

// POST /api/import-icons - Import specific icons by name from Iconify
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { icons: iconList } = body;

    if (!iconList || !Array.isArray(iconList) || iconList.length === 0) {
      return new Response(JSON.stringify({ error: 'Icons array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Group icons by prefix for batch fetching
    const iconsByPrefix: Record<string, string[]> = {};

    for (const fullName of iconList) {
      const [prefix, name] = fullName.split(':');
      if (!prefix || !name) continue;

      if (!iconsByPrefix[prefix]) {
        iconsByPrefix[prefix] = [];
      }
      iconsByPrefix[prefix].push(name);
    }

    // Read current icons
    const currentIcons = await readIcons();
    const existingNames = new Set(currentIcons.map(icon => icon.name));
    const newIcons: Icon[] = [];

    // Fetch and import icons for each prefix
    for (const [prefix, names] of Object.entries(iconsByPrefix)) {
      // Batch fetch icons (20 at a time)
      const batchSize = 20;

      for (let i = 0; i < names.length; i += batchSize) {
        const batch = names.slice(i, i + batchSize);
        const iconsParam = batch.join(',');

        const svgUrl = `https://api.iconify.design/${prefix}.json?icons=${iconsParam}`;

        try {
          const svgRes = await fetch(svgUrl);
          if (!svgRes.ok) continue;

          const data = await svgRes.json();

          for (const iconName of batch) {
            const fullName = `${prefix}:${iconName}`;

            // Skip if already exists
            if (existingNames.has(fullName)) continue;

            const iconData = data.icons?.[iconName];
            if (!iconData) continue;

            // Build SVG from icon data
            const width = iconData.width || data.width || 24;
            const height = iconData.height || data.height || 24;
            const body = iconData.body;

            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;

            // New icons are imported to library (inProject is computed from project-icons.json)
            newIcons.push({ name: fullName, content: svg });
          }
        } catch (error) {
          console.error(`Failed to fetch icons for ${prefix}:`, error);
          continue;
        }
      }
    }

    if (newIcons.length === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: 'All icons already exist or failed to import',
        count: 0
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Merge and save
    const allIcons = [...currentIcons, ...newIcons];
    await saveIcons(allIcons);

    return new Response(JSON.stringify({
      success: true,
      count: newIcons.length,
      message: `Successfully imported ${newIcons.length} icons`
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error importing icons:', error);
    return new Response(JSON.stringify({ error: 'Failed to import icons' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
