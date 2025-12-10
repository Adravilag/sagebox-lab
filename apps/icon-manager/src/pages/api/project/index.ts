import type { APIRoute } from 'astro';
import { readProjectIcons, addToProject, removeFromProject, readIcons, saveIcons } from '../../../lib/icons';

// Helper to fetch SVG from Iconify API
async function fetchIconSvg(iconName: string): Promise<string | null> {
  try {
    // iconName format: "prefix:name" e.g. "lucide:calendar"
    const [prefix, name] = iconName.includes(':') ? iconName.split(':') : [null, iconName];
    
    if (!prefix || !name) {
      console.log(`[Icon Manager] Cannot fetch icon without prefix: ${iconName}`);
      return null;
    }
    
    const url = `https://api.iconify.design/${prefix}/${name}.svg`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.log(`[Icon Manager] Failed to fetch icon: ${iconName} (${response.status})`);
      return null;
    }
    
    return await response.text();
  } catch (error) {
    console.error(`[Icon Manager] Error fetching icon ${iconName}:`, error);
    return null;
  }
}

// GET - Get project icons (icons listed in project-icons.json)
export const GET: APIRoute = async () => {
  try {
    const projectIconNames = await readProjectIcons();
    const iconNames = [...projectIconNames];
    
    return new Response(JSON.stringify({
      icons: iconNames,
      count: iconNames.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read project icons' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST - Add icons to project (auto-builds TypeScript)
export const POST: APIRoute = async ({ request }) => {
  try {
    const { icons } = await request.json();
    
    if (!Array.isArray(icons) || icons.length === 0) {
      return new Response(JSON.stringify({ error: 'Icons array required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check which icons exist in the library
    const existingIcons = await readIcons();
    const existingNames = new Set(existingIcons.map(i => i.name));
    
    // Find missing icons and fetch them from Iconify
    const missingIcons = icons.filter(name => !existingNames.has(name));
    const fetchedIcons: { name: string; content: string }[] = [];
    
    for (const iconName of missingIcons) {
      const svg = await fetchIconSvg(iconName);
      if (svg) {
        fetchedIcons.push({ name: iconName, content: svg });
        console.log(`[Icon Manager] Fetched missing icon: ${iconName}`);
      }
    }
    
    // Add fetched icons to the library
    if (fetchedIcons.length > 0) {
      const updatedIcons = [...existingIcons, ...fetchedIcons];
      await saveIcons(updatedIcons);
      console.log(`[Icon Manager] Added ${fetchedIcons.length} icons to library`);
    }

    // Now add all icons to the project
    await addToProject(icons);
    const projectIcons = await readProjectIcons();
    
    return new Response(JSON.stringify({
      message: `Added ${icons.length} icons to project`,
      count: projectIcons.size,
      fetched: fetchedIcons.length,
      built: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('[Icon Manager] Error adding icons to project:', error);
    return new Response(JSON.stringify({ error: 'Failed to add icons to project' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE - Remove icons from project (auto-builds TypeScript)
export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { icons } = await request.json();
    
    if (!Array.isArray(icons) || icons.length === 0) {
      return new Response(JSON.stringify({ error: 'Icons array required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await removeFromProject(icons);
    const projectIcons = await readProjectIcons();
    
    return new Response(JSON.stringify({
      message: `Removed ${icons.length} icons from project`,
      count: projectIcons.size,
      built: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to remove icons from project' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
