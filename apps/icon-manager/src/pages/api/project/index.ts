import type { APIRoute } from 'astro';
import { readProjectIcons, addToProject, removeFromProject, readIcons } from '../../../lib/icons';

// GET - Get project icons (icons with inProject: true)
export const GET: APIRoute = async () => {
  try {
    // Read icons with inProject: true
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

    await addToProject(icons);
    const projectIcons = await readProjectIcons();

    return new Response(JSON.stringify({
      message: `Added ${icons.length} icons to project`,
      count: projectIcons.size,
      built: true
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
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
