// =============================================================================
// Micro-Frontend Event Bus (MfeEventBus)
// Enables decoupled cross-MFE communication without hard dependencies
// =============================================================================

export const MfeEvents = {
  // Navigation & View Events
  NAVIGATE_VIEW: 'MFE_NAVIGATE_VIEW',          // payload: { view: 'topics' | 'progress' | 'playground' | 'profile' }
  SELECT_TRACK: 'MFE_SELECT_TRACK',            // payload: { trackId: string }
  SELECT_TOPIC: 'MFE_SELECT_TOPIC',            // payload: { topicId: string, trackId?: string }
  SELECT_SUBSECTION: 'MFE_SELECT_SUBSECTION',  // payload: { subSectionId: string }

  // Action Events
  OPEN_PLAYGROUND: 'MFE_OPEN_PLAYGROUND',      // payload: { code: string, topicId?: string }
  OPEN_QUIZ: 'MFE_OPEN_QUIZ',                  // payload: { topicId?: string, trackId?: string }
  OPEN_AI_CHAT: 'MFE_OPEN_AI_CHAT',            // payload: { prompt: string, visualPreview?: object }
  
  // Progress & Gamification Events
  TOPIC_COMPLETED: 'MFE_TOPIC_COMPLETED',      // payload: { topicId: string }
  TOPIC_BOOKMARKED: 'MFE_TOPIC_BOOKMARKED',    // payload: { topicId: string }
  QUIZ_COMPLETED: 'MFE_QUIZ_COMPLETED',        // payload: { topicOrTrackId: string, score: number, xp: number }
  XP_EARNED: 'MFE_XP_EARNED',                  // payload: { xp: number, reason: string }
};

class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, payload = {}) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(callback => {
        try {
          callback(payload);
        } catch (err) {
          console.error(`[MfeEventBus] Error in listener for "${event}":`, err);
        }
      });
    }
  }
}

export const mfeEventBus = new EventBus();
