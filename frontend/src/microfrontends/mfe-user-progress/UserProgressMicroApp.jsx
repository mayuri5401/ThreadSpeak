import React from 'react';
import ProgressView from '../../components/progress/ProgressView';
import UserProfileView from '../../components/profile/UserProfileView';
import { mfeEventBus, MfeEvents } from '../../shared/events/MfeEventBus';

export default function UserProgressMicroApp({
  viewMode = 'progress', // 'progress' | 'profile'
  tracks = [],
  allTopics = [],
  completedTopicIds = new Set(),
  bookmarkedTopicIds = new Set(),
  onSelectTopic,
  onToggleComplete,
  onOpenPlayground
}) {
  const handleSelectTopic = (topicId) => {
    mfeEventBus.emit(MfeEvents.SELECT_TOPIC, { topicId });
    mfeEventBus.emit(MfeEvents.NAVIGATE_VIEW, { view: 'topics' });
    onSelectTopic?.(topicId);
  };

  const handleOpenPlayground = (code) => {
    mfeEventBus.emit(MfeEvents.OPEN_PLAYGROUND, { code });
    mfeEventBus.emit(MfeEvents.NAVIGATE_VIEW, { view: 'playground' });
    onOpenPlayground?.(code);
  };

  if (viewMode === 'profile') {
    return (
      <UserProfileView
        tracks={tracks}
        allTopics={allTopics}
        completedTopicIds={completedTopicIds}
        bookmarkedTopicIds={bookmarkedTopicIds}
        onSelectTopic={handleSelectTopic}
        onOpenPlayground={handleOpenPlayground}
      />
    );
  }

  return (
    <ProgressView
      tracks={tracks}
      allTopics={allTopics}
      completedTopicIds={completedTopicIds}
      onSelectTopic={handleSelectTopic}
      onToggleComplete={onToggleComplete}
    />
  );
}
