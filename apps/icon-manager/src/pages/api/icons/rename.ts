import type { APIRoute } from 'astro';
import { readIcons, saveIcons, readProjectIconNames, addToProject, removeFromProject } from '../../../lib/icons.ts';

// PUT /api/icons/rename - Rename an icon
export const PUT: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { oldName, newName } = body;

    if (!oldName || !newName) {
      return new Response(JSON.stringify({ error: 'Both oldName and newName are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate new name format
    if (!/^[a-z0-9:-]+$/.test(newName)) {
      return new Response(JSON.stringify({ error: 'Invalid name format. Use lowercase, numbers, hyphens, and colons only.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const icons = await readIcons();
    const iconIndex = icons.findIndex(icon => icon.name === oldName);

    if (iconIndex === -1) {
      return new Response(JSON.stringify({ error: `Icon "${oldName}" not found` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if new name already exists
    if (icons.some(icon => icon.name === newName)) {
      return new Response(JSON.stringify({ error: `Icon "${newName}" already exists` }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if icon was in project (we need to update project-icons.json too)
    const projectIcons = await readProjectIconNames();
    const wasInProject = projectIcons.has(oldName);

    // Rename the icon in library
    icons[iconIndex].name = newName;
    await saveIcons(icons);
    
    // If icon was in project, update project-icons.json (remove old, add new)
    if (wasInProject) {
      await removeFromProject([oldName]);
      await addToProject([newName]);
    }

    return new Response(JSON.stringify({ success: true, oldName, newName }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error renaming icon:', error);
    return new Response(JSON.stringify({ error: 'Failed to rename icon' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
