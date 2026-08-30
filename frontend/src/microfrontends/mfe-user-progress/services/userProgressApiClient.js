// =============================================================================
// MFE-User-Progress API Client
// Connected to Backend User & Progress Service (:8082 via Gateway /api)
// =============================================================================

import { gatewayFetch } from '../../../shared/api/gatewayClient';

export async function fetchUserProgress(userId = 'guest-user') {
  try {
    return await gatewayFetch(`/progress/${userId}`);
  } catch (err) {
    console.warn('[MFE-UserProgress] Using local progress fallback:', err.message);
    return getLocalProgressFallback(userId);
  }
}

export async function completeTopicOnServer(userId = 'guest-user', topicId) {
  try {
    return await gatewayFetch(`/progress/${userId}/topic/${topicId}/complete`, {
      method: 'POST'
    });
  } catch (err) {
    console.warn('[MFE-UserProgress] Server sync fallback for complete:', err.message);
    return null;
  }
}

export async function toggleBookmarkOnServer(userId = 'guest-user', topicId) {
  try {
    return await gatewayFetch(`/progress/${userId}/bookmark/${topicId}`, {
      method: 'POST'
    });
  } catch (err) {
    console.warn('[MFE-UserProgress] Server sync fallback for bookmark:', err.message);
    return null;
  }
}

export async function addXpOnServer(userId = 'guest-user', xp) {
  try {
    return await gatewayFetch(`/progress/${userId}/xp?amount=${xp}`, {
      method: 'POST'
    });
  } catch (err) {
    console.warn('[MFE-UserProgress] Server sync fallback for xp:', err.message);
    return null;
  }
}

function getLocalProgressFallback(userId) {
  try {
    const completed = JSON.parse(localStorage.getItem('threadspeak_completed') || '["java-intro-what-is-java"]');
    const bookmarks = JSON.parse(localStorage.getItem('threadspeak_bookmarks') || '[]');
    return {
      userId,
      completedTopicIds: completed,
      bookmarkedTopicIds: bookmarks,
      quizScores: {},
      totalXp: completed.length * 50,
      currentStreakDays: 1
    };
  } catch {
    return {
      userId,
      completedTopicIds: ['java-intro-what-is-java'],
      bookmarkedTopicIds: [],
      quizScores: {},
      totalXp: 50,
      currentStreakDays: 1
    };
  }
}
