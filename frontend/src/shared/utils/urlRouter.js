// =============================================================================
// ThreadSpeak URL Router & State Synchronization
// Automatically keeps browser URL in sync with active View, Track, Topic, and Tab
// Supports browser Back/Forward navigation, bookmarking, and direct URL sharing
// =============================================================================

export function parseUrlState() {
  const searchParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const hash = window.location.hash;

  let view = searchParams.get('view') || 'topics';
  let trackId = searchParams.get('track') || 'core-java';
  let topicId = searchParams.get('topic') || null;
  let subSection = searchParams.get('sub') || 'all';
  let tab = searchParams.get('tab') || 'notes';

  // Support path-based URLs (e.g. /topic/java-intro-features-of-java or /quiz or /ThreadSpeak/quiz)
  if (pathname && pathname !== '/') {
    let pathParts = pathname.split('/').filter(Boolean);
    // If hosted under subfolder (e.g. /ThreadSpeak/), skip repository name
    if (pathParts.length > 0 && pathParts[0].toLowerCase() === 'threadspeak') {
      pathParts = pathParts.slice(1);
    }
    if (pathParts.length > 0) {
      const first = pathParts[0].toLowerCase();
      if (['progress', 'playground', 'profile', 'quiz'].includes(first)) {
        view = first;
        if (first === 'quiz' && pathParts[1]) {
          topicId = pathParts[1];
        }
      } else if (first === 'track' && pathParts[1]) {
        trackId = pathParts[1];
        if (pathParts[2] === 'topic' && pathParts[3]) {
          topicId = pathParts[3];
        }
      } else if (first === 'topic' && pathParts[1]) {
        topicId = pathParts[1];
        view = 'topics';
      }
    }
  }

  // Support hash routing (e.g. #/topic/java-intro-features-of-java?tab=architecture)
  if (hash && hash.startsWith('#')) {
    const hashWithoutHash = hash.substring(1);
    const [hashPath, hashQuery] = hashWithoutHash.split('?');
    if (hashQuery) {
      const hashParams = new URLSearchParams(hashQuery);
      if (hashParams.get('view')) view = hashParams.get('view');
      if (hashParams.get('track')) trackId = hashParams.get('track');
      if (hashParams.get('topic')) topicId = hashParams.get('topic');
      if (hashParams.get('sub')) subSection = hashParams.get('sub');
      if (hashParams.get('tab')) tab = hashParams.get('tab');
      if (hashParams.get('program')) program = Number(hashParams.get('program'));
    }
    if (hashPath) {
      let hashParts = hashPath.split('/').filter(Boolean);
      if (hashParts.length > 0 && hashParts[0].toLowerCase() === 'threadspeak') {
        hashParts = hashParts.slice(1);
      }
      if (hashParts[0] === 'topic' && hashParts[1]) {
        topicId = hashParts[1];
        view = 'topics';
      } else if (['progress', 'playground', 'profile', 'quiz'].includes(hashParts[0])) {
        view = hashParts[0];
      }
    }
  }

  let program = searchParams.get('program') ? Number(searchParams.get('program')) : null;

  return {
    view,
    trackId,
    topicId,
    subSection,
    tab,
    program
  };
}

export function buildUrl({ view = 'topics', trackId = 'core-java', topicId = null, subSection = 'all', tab = 'notes', program = null }) {
  const params = new URLSearchParams();

  if (view && view !== 'topics') {
    params.set('view', view);
  }

  if (view === 'topics' || view === 'quiz') {
    if (trackId) {
      params.set('track', trackId);
    }
    if (topicId) {
      params.set('topic', topicId);
    }
    if (subSection && subSection !== 'all') {
      params.set('sub', subSection);
    }
    if (tab && tab !== 'notes') {
      params.set('tab', tab);
    }
    if (program) {
      params.set('program', program);
    }
  }

  const isGitHubPages = typeof window !== 'undefined' && window.location.pathname.toLowerCase().startsWith('/threadspeak');
  const basePath = isGitHubPages ? '/ThreadSpeak' : '';
  const queryString = params.toString();
  return queryString ? `${basePath}/?${queryString}` : (basePath ? `${basePath}/` : '/');
}

export function updateBrowserUrl(updates, replace = false) {
  try {
    const currentState = parseUrlState();
    const mergedState = {
      ...currentState,
      ...updates
    };

    if (updates && updates.program === null) {
      mergedState.program = null;
    }

    const newUrl = buildUrl(mergedState);
    const currentFullUrl = window.location.pathname + window.location.search;

    if (newUrl !== currentFullUrl) {
      if (replace) {
        window.history.replaceState(mergedState, '', newUrl);
      } else {
        window.history.pushState(mergedState, '', newUrl);
      }
    }
  } catch (e) {
    console.warn('[urlRouter] Failed to update browser URL:', e);
  }
}
