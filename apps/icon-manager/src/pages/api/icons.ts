import type { APIRoute } from 'astro';
import { readIcons, saveIcons } from '../../lib/icons.ts';

// GET /api/icons/ - List all icons
export const GET: APIRoute = async () => {
  try {
    const icons = await readIcons();
    return new Response(JSON.stringify(icons), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to read icons' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST /api/icons/ - Add a new icon
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, content } = body;

    if (!name || !content) {
      return new Response(JSON.stringify({ error: 'Name and content are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate name format
    if (!/^[a-z0-9:-]+$/.test(name)) {
      return new Response(JSON.stringify({ error: 'Invalid name format. Use lowercase, numbers, hyphens, and colons only.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate SVG content
    if (!content.trim().startsWith('<svg')) {
      return new Response(JSON.stringify({ error: 'Content must be valid SVG' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const icons = await readIcons();

    // Check for duplicate
    if (icons.some(icon => icon.name === name)) {
      return new Response(JSON.stringify({ error: `Icon "${name}" already exists` }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // New icons are added to library (inProject is computed from project-icons.json)
    icons.push({ name, content });
    await saveIcons(icons);

    return new Response(JSON.stringify({ success: true, name }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error adding icon:', error);
    return new Response(JSON.stringify({ error: 'Failed to add icon' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
