import type { APIRoute } from 'astro';
import { readIcons, saveIcons, removeFromProject } from '../../../lib/icons.ts';

// PUT /api/icons/[name]/ - Update an icon
export const PUT: APIRoute = async ({ params, request }) => {
  try {
    const name = decodeURIComponent(params.name || '');

    if (!name) {
      return new Response(JSON.stringify({ error: 'Icon name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const body = await request.json();
    const { content } = body;

    if (!content) {
      return new Response(JSON.stringify({ error: 'Icon content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const icons = await readIcons();
    const index = icons.findIndex(icon => icon.name === name);

    if (index === -1) {
      return new Response(JSON.stringify({ error: `Icon "${name}" not found` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update the icon
    icons[index] = {
      ...icons[index],
      content,
      updatedAt: new Date().toISOString()
    };

    await saveIcons(icons);

    return new Response(JSON.stringify({ 
      success: true, 
      name,
      icon: icons[index]
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating icon:', error);
    return new Response(JSON.stringify({ error: 'Failed to update icon' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// DELETE /api/icons/[name]/ - Delete an icon
export const DELETE: APIRoute = async ({ params }) => {
  try {
    const name = decodeURIComponent(params.name || '');

    if (!name) {
      return new Response(JSON.stringify({ error: 'Icon name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const icons = await readIcons();
    const index = icons.findIndex(icon => icon.name === name);

    if (index === -1) {
      return new Response(JSON.stringify({ error: `Icon "${name}" not found` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    icons.splice(index, 1);
    await saveIcons(icons);

    // Also remove from project if it was there
    await removeFromProject([name]);

    return new Response(JSON.stringify({ success: true, name }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error deleting icon:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete icon' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// GET /api/icons/[name]/ - Get a single icon
export const GET: APIRoute = async ({ params }) => {
  try {
    const name = decodeURIComponent(params.name || '');

    if (!name) {
      return new Response(JSON.stringify({ error: 'Icon name is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const icons = await readIcons();
    const icon = icons.find(icon => icon.name === name);

    if (!icon) {
      return new Response(JSON.stringify({ error: `Icon "${name}" not found` }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(icon), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('[API] Failed to get icon:', error);
    return new Response(JSON.stringify({ error: 'Failed to get icon', details: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
