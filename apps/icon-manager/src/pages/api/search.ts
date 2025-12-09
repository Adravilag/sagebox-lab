import type { APIRoute } from 'astro';

// GET /api/search?q=<query>&limit=50
// Search icons across all Iconify collections
export const GET: APIRoute = async ({ url }) => {
  try {
    const query = url.searchParams.get('q') || '';
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '50'), 200);

    if (!query || query.length < 2) {
      return new Response(JSON.stringify({
        error: 'Query must be at least 2 characters',
        icons: [],
        total: 0
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Search Iconify API
    const searchUrl = `https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=${limit}`;
    const searchRes = await fetch(searchUrl);

    if (!searchRes.ok) {
      return new Response(JSON.stringify({
        error: 'Failed to search Iconify',
        icons: [],
        total: 0
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await searchRes.json();

    // Group results by prefix for better display
    const byPrefix: Record<string, string[]> = {};

    for (const icon of data.icons || []) {
      const [prefix, name] = icon.split(':');
      if (!byPrefix[prefix]) {
        byPrefix[prefix] = [];
      }
      byPrefix[prefix].push(name);
    }

    return new Response(JSON.stringify({
      icons: data.icons || [],
      total: data.total || 0,
      byPrefix,
      query
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Search error:', error);
    return new Response(JSON.stringify({
      error: 'Search failed',
      icons: [],
      total: 0
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
