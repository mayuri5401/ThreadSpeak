// =============================================================================
// MFE-Content API Client
// Connected to Backend Content Service (:8081 via Gateway /api)
// With Full Static Fallback for Vercel / GitHub Pages
// =============================================================================

import { gatewayFetch } from '../../../shared/api/gatewayClient';
import curriculumIndex from '../../../shared/api/curriculumIndex.json';
import topicsCatalog from '../../../shared/api/topicsCatalog.json';
import tracksCatalog from '../../../shared/api/tracksCatalog.json';

const topicsCache = new Map();
const topicDetailCache = new Map();
let tracksCache = null;

export async function fetchTracks() {
  if (tracksCache) return tracksCache;
  try {
    const data = await gatewayFetch('/tracks');
    if (data && data.length > 0) {
      tracksCache = data;
      return data;
    }
  } catch (err) {
    console.warn('[MFE-Content] Fallback tracks used:', err.message);
  }
  return getLocalTracksFallback();
}

export async function fetchTopics(trackId = null, query = null) {
  const cacheKey = `${trackId || 'all'}_${query || ''}`;
  if (!query && topicsCache.has(cacheKey)) {
    return topicsCache.get(cacheKey);
  }
  try {
    const params = new URLSearchParams();
    if (trackId) params.append('trackId', trackId);
    if (query) params.append('q', query);
    const data = await gatewayFetch(`/topics?${params.toString()}`);
    if (data && data.length > 0) {
      if (!query) {
        topicsCache.set(cacheKey, data);
        (data || []).forEach(t => {
          if (t && t.id) topicDetailCache.set(t.id, t);
        });
      }
      return data;
    }
  } catch (err) {
    console.warn('[MFE-Content] Fallback topics used:', err.message);
  }
  const fallbackList = getLocalTopicsFallback(trackId, query);
  if (!query) {
    topicsCache.set(cacheKey, fallbackList);
  }
  return fallbackList;
}

// Parse YAML frontmatter + body from a raw markdown string
function parseMarkdownFile(raw, id) {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!fmMatch) return { id, deepDive: raw };

  const frontmatter = fmMatch[1];
  const body = fmMatch[2].trim();

  const get = (key) => {
    const m = frontmatter.match(new RegExp(`^${key}:\\s*"?([^"\\r\\n]+)"?`, 'm'));
    return m ? m[1].trim() : undefined;
  };

  const tagsMatch = frontmatter.match(/^tags:\s*\[([^\]]*)\]/m);
  const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')).filter(Boolean) : [];

  const estMin = parseInt(get('estimatedMinutes')) || 10;

  return {
    id: get('id') || id,
    trackId: get('trackId'),
    trackTitle: get('trackTitle'),
    category: get('category'),
    title: get('title'),
    slug: get('slug'),
    level: get('difficulty') || get('level') || 'Intermediate',
    difficulty: get('difficulty') || 'Intermediate',
    estimatedMinutes: estMin,
    readTime: `${estMin} min`,
    summary: get('summary'),
    eli10: get('eli10'),
    mentalModel: get('mentalModel'),
    animationType: get('animationType'),
    tags,
    // Use the markdown body as deepDive (the rich notes content)
    deepDive: body || get('deepDive'),
  };
}

export async function fetchTopicById(id) {
  if (!id) return null;

  if (topicDetailCache.has(id)) {
    const cached = topicDetailCache.get(id);
    if (cached && (cached.deepDive || cached.eli10)) {
      return cached;
    }
  }

  // Tier 1: Check pre-compiled topics catalog (instant 0ms memory access)
  const catalogEntry = topicsCatalog.find(t => t.id === id);
  if (catalogEntry && (catalogEntry.deepDive || catalogEntry.eli10)) {
    topicDetailCache.set(id, catalogEntry);
    return catalogEntry;
  }

  // Tier 2: Static markdown file fetch from public/curriculum
  const filePath = curriculumIndex[id] || catalogEntry?.filePath;
  if (filePath) {
    try {
      const base = import.meta.env.BASE_URL || '/';
      const cleanPath = filePath.replace(/^\//, '');
      const finalUrl = base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
      const res = await fetch(finalUrl);
      if (res.ok) {
        const raw = await res.text();
        const parsed = parseMarkdownFile(raw, id);
        const merged = { ...(catalogEntry || {}), ...parsed };
        topicDetailCache.set(id, merged);
        return merged;
      }
    } catch (staticErr) {
      // static fetch failed
    }
  }

  // Tier 3: Optional live gateway fetch
  try {
    const data = await gatewayFetch(`/topics/${id}`);
    if (data && (data.deepDive || data.eli10)) {
      topicDetailCache.set(id, data);
      return data;
    }
  } catch (err) {
    // ignore
  }

  return catalogEntry || null;
}

function getLocalTracksFallback() {
  return tracksCatalog;
}

function getLocalTopicsFallback(trackId = null, query = null) {
  let list = topicsCatalog;
  if (trackId) {
    list = list.filter(t => t.trackId === trackId);
  }
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(t => (t.title && t.title.toLowerCase().includes(q)) || (t.category && t.category.toLowerCase().includes(q)));
  }
  return list;
}
