import type { APIRoute } from 'astro';

// GET /api/sets - List available icon sets from Iconify
export const GET: APIRoute = async ({ url }) => {
  try {
    const filter = url.searchParams.get('filter') || '';

    // Fetch collections from Iconify
    const collectionsUrl = 'https://api.iconify.design/collections';
    const collectionsRes = await fetch(collectionsUrl);

    if (!collectionsRes.ok) {
      return new Response(JSON.stringify({
        error: 'Failed to fetch icon sets',
        sets: [],
        popular: []
      }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const collections = await collectionsRes.json();

    // Popular icon sets
    const popularPrefixes = ['lucide', 'mdi', 'heroicons', 'tabler', 'phosphor', 'carbon', 'fa6-solid', 'fa6-regular', 'ion', 'feather'];

    const popular = popularPrefixes
      .filter(prefix => collections[prefix])
      .map(prefix => ({
        prefix,
        name: collections[prefix].name,
        total: collections[prefix].total,
        author: collections[prefix].author?.name,
        license: collections[prefix].license?.title
      }));

    // All sets
    let sets = Object.entries(collections).map(([prefix, info]: [string, any]) => ({
      prefix,
      name: info.name,
      total: info.total,
      author: info.author?.name,
      license: info.license?.title,
      category: info.category
    }));

    // Apply filter
    if (filter) {
      const filterLower = filter.toLowerCase();
      sets = sets.filter(set =>
        set.prefix.toLowerCase().includes(filterLower) ||
        set.name.toLowerCase().includes(filterLower)
      );
    }

    // Sort by name
    sets.sort((a, b) => a.name.localeCompare(b.name));

    return new Response(JSON.stringify({
      sets,
      popular,
      total: sets.length
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error fetching sets:', error);
    return new Response(JSON.stringify({
      error: 'Failed to fetch icon sets',
      sets: [],
      popular: []
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
