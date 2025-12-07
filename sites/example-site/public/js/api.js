// Simple in-memory cache
const cache = new Map();

async function fetchWithCache(url, ttl = 300000) { // 5 min TTL
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data;
}

export async function getCategories() {
  const data = await fetchWithCache('/data/categories.json');
  return data;
}

export async function getPostsIndex() {
  const data = await fetchWithCache('/data/index.json');
  return data;
}

export async function getPost(category, slug) {
  return fetchWithCache(`/data/posts/${category}/${slug}.json`);
}

export async function getPostBySlug(slug) {
  // First get the index to find which category the post belongs to
  const { posts } = await getPostsIndex();
  const postMeta = posts.find(p => p.slug === slug);
  if (!postMeta) {
    return null;
  }
  return getPost(postMeta.category, slug);
}

export async function getPostsByCategory(category) {
  const { posts } = await getPostsIndex();
  return posts.filter(p => p.category === category);
}

export async function getRecentPosts(limit = 6) {
  const { posts } = await getPostsIndex();
  return posts.slice(0, limit);
}
