import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Domain Micro-Frontends
import ContentMicroApp from '../microfrontends/mfe-content/ContentMicroApp';
import UserProgressMicroApp from '../microfrontends/mfe-user-progress/UserProgressMicroApp';
import CodeRunnerMicroApp from '../microfrontends/mfe-code-runner/CodeRunnerMicroApp';
import QuizMicroApp from '../microfrontends/mfe-quiz/QuizMicroApp';

import { fetchTracks, fetchTopics } from '../microfrontends/mfe-content/services/contentApiClient';
import { 
  completeTopicOnServer, 
  toggleBookmarkOnServer 
} from '../microfrontends/mfe-user-progress/services/userProgressApiClient';
import { mfeEventBus, MfeEvents } from '../shared/events/MfeEventBus';
import { parseUrlState, updateBrowserUrl } from '../shared/utils/urlRouter';
import { triggerConfettiCelebration } from '../shared/utils/confettiCelebration';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function AppShell() {
  const initialUrlState = parseUrlState();

  const [tracks, setTracks] = useState([]);
  const [currentTrackId, setCurrentTrackId] = useState(initialUrlState.trackId || 'core-java');
  const [systemDesignSubSection, setSystemDesignSubSection] = useState(initialUrlState.subSection || 'all');
  const [allTopics, setAllTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(initialUrlState.topicId || 'java-intro-what-is-java');
  const [activeTab, setActiveTab] = useState(initialUrlState.tab || 'notes');
  const [currentView, setCurrentView] = useState(initialUrlState.view || 'topics'); // 'topics' | 'progress' | 'playground' | 'profile' | 'quiz'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [playgroundCode, setPlaygroundCode] = useState(null);

  // History & popstate tracking refs to prevent redundant pushState
  const isPopStateRef = useRef(false);
  const isInitialMountRef = useRef(true);
  const prevTabRef = useRef(initialUrlState.tab || 'notes');
  const prevTopicRef = useRef(initialUrlState.topicId || 'java-intro-what-is-java');
  const prevTrackRef = useRef(initialUrlState.trackId || 'core-java');
  const prevViewRef = useRef(initialUrlState.view || 'topics');

  // User progress state persisted locally + synced to user-service
  const [completedTopicIds, setCompletedTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set(['java-intro-what-is-java']);
    } catch {
      return new Set(['java-intro-what-is-java']);
    }
  });

  const [bookmarkedTopicIds, setBookmarkedTopicIds] = useState(() => {
    try {
      const saved = localStorage.getItem('threadspeak_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Load Tracks & All Topics metadata on mount
  useEffect(() => {
    async function loadCatalog() {
      const trackList = await fetchTracks();
      setTracks(trackList);
      const all = await fetchTopics(null);
      setAllTopics(all);
    }
    loadCatalog();
  }, []);

  // Synchronize browser address bar URL whenever View, Track, Topic, SubSection, or Tab changes
  useEffect(() => {
    if (isPopStateRef.current) {
      // Navigated via browser Back / Forward — URL is already correct in address bar
      isPopStateRef.current = false;
      prevTabRef.current = activeTab;
      prevTopicRef.current = selectedTopicId;
      prevTrackRef.current = currentTrackId;
      prevViewRef.current = currentView;
      return;
    }

    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      // On initial load, replaceState so we do not create a duplicate root history entry
      updateBrowserUrl({
        view: currentView,
        trackId: currentTrackId,
        topicId: selectedTopicId,
        subSection: systemDesignSubSection,
        tab: activeTab
      }, true);
      prevTabRef.current = activeTab;
      prevTopicRef.current = selectedTopicId;
      prevTrackRef.current = currentTrackId;
      prevViewRef.current = currentView;
      return;
    }

    // If only the tab changed within the same topic, replaceState instead of pushState
    const isOnlyTabChange = (
      prevTabRef.current !== activeTab &&
      prevTopicRef.current === selectedTopicId &&
      prevTrackRef.current === currentTrackId &&
      prevViewRef.current === currentView
    );

    prevTabRef.current = activeTab;
    prevTopicRef.current = selectedTopicId;
    prevTrackRef.current = currentTrackId;
    prevViewRef.current = currentView;

    updateBrowserUrl({
      view: currentView,
      trackId: currentTrackId,
      topicId: selectedTopicId,
      subSection: systemDesignSubSection,
      tab: activeTab
    }, isOnlyTabChange);
  }, [currentView, currentTrackId, selectedTopicId, systemDesignSubSection, activeTab]);

  // Support Browser Back / Forward Navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const state = parseUrlState();
      isPopStateRef.current = true;

      if (state.view) setCurrentView(state.view);
      if (state.trackId) setCurrentTrackId(state.trackId);
      if (state.topicId) {
        setSelectedTopicId(state.topicId);
      }
      if (state.subSection) setSystemDesignSubSection(state.subSection);
      if (state.tab) setActiveTab(state.tab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to Global Micro-Frontend Events (MfeEventBus)
  useEffect(() => {
    const unsubNavigate = mfeEventBus.on(MfeEvents.NAVIGATE_VIEW, ({ view }) => {
      if (view) setCurrentView(view);
    });

    const unsubPlayground = mfeEventBus.on(MfeEvents.OPEN_PLAYGROUND, ({ code }) => {
      setPlaygroundCode(code);
      setCurrentView('playground');
    });

    const unsubSelectTopic = mfeEventBus.on(MfeEvents.SELECT_TOPIC, ({ topicId, trackId }) => {
      if (topicId) setSelectedTopicId(topicId);
      if (trackId) setCurrentTrackId(trackId);
    });

    const unsubSelectTrack = mfeEventBus.on(MfeEvents.SELECT_TRACK, ({ trackId }) => {
      if (trackId) setCurrentTrackId(trackId);
    });

    return () => {
      unsubNavigate();
      unsubPlayground();
      unsubSelectTopic();
      unsubSelectTrack();
    };
  }, []);

  // Handle Track Selection
  const handleSelectTrack = (trackId) => {
    setCurrentTrackId(trackId);
    if (currentView !== 'topics' && currentView !== 'quiz') {
      setCurrentView('topics');
    }
  };

  // Handle Topic Selection
  const handleSelectTopic = (topicId, options = {}) => {
    if (options.replace) {
      isPopStateRef.current = false;
      updateBrowserUrl({
        view: currentView,
        trackId: currentTrackId,
        topicId: topicId,
        subSection: systemDesignSubSection,
        tab: activeTab
      }, true);
    }
    setSelectedTopicId(topicId);
    if (currentView !== 'topics' && currentView !== 'quiz') {
      setCurrentView('topics');
    }
  };

  // Handle System Design sub-sections
  const handleSelectSubSection = (subId) => {
    setSystemDesignSubSection(subId);
    if (currentTrackId !== 'system-design') {
      setCurrentTrackId('system-design');
    }
  };

  const [completionToast, setCompletionToast] = useState(null);

  // Toggle Complete on topic
  const handleToggleComplete = (topicId) => {
    setCompletedTopicIds(prev => {
      const updated = new Set(prev);
      const isNowCompleted = !updated.has(topicId);
      if (updated.has(topicId)) {
        updated.delete(topicId);
      } else {
        updated.add(topicId);
        // Trigger celebration confetti explosion & harmonic chime!
        triggerConfettiCelebration();

        // Find topic title for toast
        const found = allTopics.find(t => t.id === topicId);
        setCompletionToast({
          title: found?.title || 'Lesson',
          xp: 50
        });
        setTimeout(() => {
          setCompletionToast(null);
        }, 3500);
      }
      localStorage.setItem('threadspeak_completed', JSON.stringify(Array.from(updated)));
      return updated;
    });
    completeTopicOnServer('guest-user', topicId);
  };

  // Toggle Bookmark on topic
  const handleToggleBookmark = (topicId) => {
    setBookmarkedTopicIds(prev => {
      const updated = new Set(prev);
      if (updated.has(topicId)) {
        updated.delete(topicId);
      } else {
        updated.add(topicId);
      }
      localStorage.setItem('threadspeak_bookmarks', JSON.stringify(Array.from(updated)));
      return updated;
    });
    toggleBookmarkOnServer('guest-user', topicId);
  };

  const handleOpenPlaygroundWithCode = (code) => {
    setPlaygroundCode(code);
    setCurrentView('playground');
  };

  const handleSelectTopicFromOtherView = (topicId) => {
    const found = allTopics.find(t => t.id === topicId);
    if (found && found.trackId) {
      setCurrentTrackId(found.trackId);
    }
    setSelectedTopicId(topicId);
    setCurrentView('topics');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-app)] text-[var(--text-main)] font-sans selection:bg-cyan-500/30 selection:text-cyan-400 transition-colors duration-300">
      {/* Shell Navbar */}
      <Navbar
        currentTrack={currentTrackId}
        onSelectTrack={handleSelectTrack}
        currentView={currentView}
        onSelectView={setCurrentView}
        completedCount={completedTopicIds.size}
        totalTopics={allTopics.length || 509}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        currentSubSection={systemDesignSubSection}
        onSelectSubSection={handleSelectSubSection}
        onOpenPlayground={handleOpenPlaygroundWithCode}
      />
      {/* Main Shell Viewport / Microfrontend Stage */}
      <div className="flex-1 w-full">
        {/* MFE: Content & Curriculum */}
        {currentView === 'topics' && (
          <ContentMicroApp
            currentTrackId={currentTrackId}
            selectedTopicId={selectedTopicId}
            onSelectTopic={handleSelectTopic}
            onSelectTrack={handleSelectTrack}
            completedTopicIds={completedTopicIds}
            bookmarkedTopicIds={bookmarkedTopicIds}
            onToggleComplete={handleToggleComplete}
            onToggleBookmark={handleToggleBookmark}
            onOpenPlayground={handleOpenPlaygroundWithCode}
            isSidebarOpen={isSidebarOpen}
            onCloseSidebar={() => setIsSidebarOpen(false)}
            systemDesignSubSection={systemDesignSubSection}
            onSelectSubSection={handleSelectSubSection}
            activeTab={activeTab}
            onSelectTab={setActiveTab}
          />
        )}
        {/* MFE: User Progress Dashboard */}
        {currentView === 'progress' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <UserProgressMicroApp
              viewMode="progress"
              tracks={tracks}
              allTopics={allTopics}
              completedTopicIds={completedTopicIds}
              onSelectTopic={handleSelectTopicFromOtherView}
              onToggleComplete={handleToggleComplete}
            />
          </div>
        )}

        {/* MFE: User Profile & Solved Solutions */}
        {currentView === 'profile' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <UserProgressMicroApp
              viewMode="profile"
              tracks={tracks}
              allTopics={allTopics}
              completedTopicIds={completedTopicIds}
              bookmarkedTopicIds={bookmarkedTopicIds}
              onSelectTopic={handleSelectTopicFromOtherView}
              onOpenPlayground={handleOpenPlaygroundWithCode}
              onSelectView={setCurrentView}
            />
          </div>
        )}


        {/* MFE: Java Code Runner & Execution Sandbox */}
        {currentView === 'playground' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <CodeRunnerMicroApp initialCode={playgroundCode} />
          </div>
        )}

        {/* MFE: Quiz Assessment Engine */}
        {currentView === 'quiz' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <QuizMicroApp
              currentTrackId={currentTrackId}
              selectedTopicId={selectedTopicId}
              onAwardXp={(xp) => console.log('[Shell] Awarded XP:', xp)}
            />
          </div>
        )}
      </div>



      {/* Celebratory Completion Toast Notification */}
      {completionToast && (
        <div className="fixed top-20 right-6 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/95 via-slate-900/95 to-emerald-950/95 border border-emerald-500/60 shadow-2xl shadow-emerald-950/80 backdrop-blur-xl flex items-center gap-3.5 ring-1 ring-emerald-400/30">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-md shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                  🎉 Topic Completed!
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-700 font-bold">
                  +{completionToast.xp} XP
                </span>
              </div>
              <p className="text-sm font-extrabold text-white mt-0.5 truncate max-w-[240px]">
                {completionToast.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
