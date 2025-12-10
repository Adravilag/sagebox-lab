import type { APIRoute } from 'astro';
import { readIcons, saveIcons, ICON_SETS } from '../../lib/icons.ts';

// POST /api/import/ - Import icons from Iconify
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { prefix, search = [], limit = 50 } = body;

    if (!prefix) {
      return new Response(JSON.stringify({ error: 'Icon set prefix is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate prefix
    if (!ICON_SETS[prefix]) {
      return new Response(JSON.stringify({ error: `Unknown icon set: ${prefix}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch icon list from Iconify
    const collectionUrl = `https://api.iconify.design/collection?prefix=${prefix}`;
    const collectionRes = await fetch(collectionUrl);

    if (!collectionRes.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch icon collection from Iconify' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const collection = await collectionRes.json();
    let iconNames: string[] = [];

    // Get all icon names from collection
    if (collection.uncategorized) {
      iconNames.push(...collection.uncategorized);
    }
    if (collection.categories) {
      for (const category of Object.values(collection.categories)) {
        iconNames.push(...(category as string[]));
      }
    }

    // Remove duplicates
    iconNames = [...new Set(iconNames)];

    // Apply search filter
    if (search.length > 0) {
      iconNames = iconNames.filter(name =>
        search.some((term: string) => name.toLowerCase().includes(term.toLowerCase()))
      );
    }

    // Apply limit
    iconNames = iconNames.slice(0, Math.min(limit, 500));

    if (iconNames.length === 0) {
      return new Response(JSON.stringify({ error: 'No icons found matching your criteria' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch SVG content for each icon
    const icons = await readIcons();
    let imported = 0;

    // Batch fetch icons (20 at a time)
    const batchSize = 20;
    for (let i = 0; i < iconNames.length; i += batchSize) {
      const batch = iconNames.slice(i, i + batchSize);
      const iconsParam = batch.join(',');

      const svgUrl = `https://api.iconify.design/${prefix}.json?icons=${iconsParam}`;
      const svgRes = await fetch(svgUrl);

      if (!svgRes.ok) continue;

      const data = await svgRes.json();

      for (const iconName of batch) {
        const fullName = `${prefix}:${iconName}`;

        // Skip if already exists
        if (icons.some(icon => icon.name === fullName)) continue;

        const iconData = data.icons[iconName];
        if (!iconData) continue;

        // Build SVG from icon data
        const width = iconData.width || data.width || 24;
        const height = iconData.height || data.height || 24;
        const body = iconData.body;

        const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>`;

        // New icons are imported to library (inProject is computed from project-icons.json)
        icons.push({ name: fullName, content: svg });
        imported++;
      }
    }

    if (imported === 0) {
      return new Response(JSON.stringify({ error: 'All icons already exist or failed to import' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await saveIcons(icons);

    return new Response(JSON.stringify({
      success: true,
      count: imported,
      prefix
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
