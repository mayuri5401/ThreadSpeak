import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../../components/layout/Sidebar';
import TopicViewer from '../../components/topics/TopicViewer';
import CourseFooterDock from '../../components/layout/CourseFooterDock';
import NotebookDrawer from '../../components/layout/NotebookDrawer';
import AskAiDrawer from '../../components/layout/AskAiDrawer';
import { fetchTracks, fetchTopics, fetchTopicById } from './services/contentApiClient';
import { mfeEventBus, MfeEvents } from '../../shared/events/MfeEventBus';
import { ChevronRight, Layers, GripVertical } from 'lucide-react';

export default function ContentMicroApp({
  currentTrackId = 'core-java',
  selectedTopicId = 'java-intro-what-is-java',
  onSelectTopic,
  onSelectTrack,
  completedTopicIds = new Set(),
  bookmarkedTopicIds = new Set(),
  onToggleComplete,
  onToggleBookmark,
  onOpenPlayground,
  isSidebarOpen = false,
  onCloseSidebar,
  systemDesignSubSection = 'all',
  onSelectSubSection,
  activeTab = 'notes',
  onSelectTab,
}) {
  const [tracks, setTracks] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Bottom Dock & Utility Drawer States
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isAskAiOpen, setIsAskAiOpen] = useState(false);
  const [aiInitialPayload, setAiInitialPayload] = useState(null);
  const [fontSize, setFontSize] = useState('normal'); // 'normal' | 'medium' | 'large'
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Listen for AI explain visualization events from EventBus
  useEffect(() => {
    const unsubAi = mfeEventBus.on(MfeEvents.OPEN_AI_CHAT, (payload) => {
      setAiInitialPayload(payload);
      setIsAskAiOpen(true);
    });
    return () => unsubAi();
  }, []);

  const selectedTopicIdRef = useRef(selectedTopicId);
  useEffect(() => {
    selectedTopicIdRef.current = selectedTopicId;
  }, [selectedTopicId]);

  // Load Tracks on mount
  useEffect(() => {
    let isCancelled = false;
    async function loadTracks() {
      const list = await fetchTracks();
      if (!isCancelled && list) {
        setTracks(list);
      }
    }
    loadTracks();
    return () => { isCancelled = true; };
  }, []);

  // Load Topics for active track
  useEffect(() => {
    let isCancelled = false;
    async function loadTopics() {
      setIsLoading(true);
      const rawList = await fetchTopics(currentTrackId);
      if (isCancelled) return;

      const filtered = (rawList || []).filter(t => {
        const title = (t.title || '').toLowerCase();
        const id = (t.id || '').toLowerCase();
        return !title.includes('join the community') && !id.includes('join-the-community');
      });
      setTopics(filtered);
      setIsLoading(false);

      if (filtered.length > 0) {
        const currentTargetId = selectedTopicIdRef.current;
        const topicExistsInTrack = filtered.some(t => t.id === currentTargetId);
        
        // Only select default first topic if current topic does not belong to this track
        if (!topicExistsInTrack || currentTargetId?.includes('join-the-community')) {
          onSelectTopic?.(filtered[0].id, { replace: true });
        }
      }
    }
    loadTopics();
    return () => { isCancelled = true; };
  }, [currentTrackId]);

  // Load Active Topic Content
  useEffect(() => {
    let isCancelled = false;
    async function loadTopicDetail() {
      if (!selectedTopicId || selectedTopicId.includes('join-the-community')) {
        return;
      }
      const data = await fetchTopicById(selectedTopicId);
      if (!isCancelled && data) {
        setSelectedTopic(data);
      }
    }
    loadTopicDetail();
    return () => { isCancelled = true; };
  }, [selectedTopicId]);

  const currentTrack = tracks.find(t => t.id === currentTrackId) || tracks[0];

  const handleOpenPlaygroundWithCode = (code) => {
    mfeEventBus.emit(MfeEvents.OPEN_PLAYGROUND, { code, topicId: selectedTopicId });
    onOpenPlayground?.(code);
  };

  // Font size scale helper class
  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-[16px] leading-relaxed';
    if (fontSize === 'medium') return 'text-[15px] leading-relaxed';
    return 'text-[14px] leading-relaxed';
  };

  return (
    <div className={`relative pb-24 transition-all duration-300 ${getFontSizeClass()}`}>
      
      {/* ── IMMERSIVE FULL-WIDTH CONTENT VIEWPORT ── */}
      <div className="flex flex-col lg:flex-row items-start min-h-[calc(100vh-64px-52px)] w-full">
        
        {/* Track Syllabus Sidebar (AlgoMaster-Style Drawer) */}
        {!isFocusMode && !isSidebarCollapsed && (
          <Sidebar
            track={currentTrack}
            topics={topics}
            selectedTopicId={selectedTopicId}
            onSelectTopic={onSelectTopic}
            completedTopicIds={completedTopicIds}
            bookmarkedTopicIds={bookmarkedTopicIds}
            isOpen={isSidebarOpen}
            onClose={onCloseSidebar}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(true)}
          />
        )}

        {/* Floating Sidebar Re-expand Button (When Collapsed) */}
        {!isFocusMode && isSidebarCollapsed && (
          <div className="hidden lg:block sticky top-20 z-30 shrink-0 ml-4 mt-4">
            <button
              onClick={() => setIsSidebarCollapsed(false)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#0B1222] light:bg-white hover:bg-slate-800 light:hover:bg-slate-100 border border-slate-800 light:border-slate-200 hover:border-emerald-500/50 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 shadow-xl backdrop-blur-md transition group"
              title="Expand syllabus & chapters drawer"
            >
              <ChevronRight className="w-4 h-4 text-emerald-400 light:text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
              <span className="text-xs font-bold font-mono">Chapters</span>
            </button>
          </div>
        )}

        {/* Main Topic Content Stage (100% Maximum Width & Zero Space Compromise) */}
        <main 
          id="topic-content-container"
          className={`flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-6 pb-28 transition-all duration-300 ${
            isSidebarCollapsed || isFocusMode ? 'max-w-6xl mx-auto w-full' : 'w-full'
          }`}
        >
          <TopicViewer
            topic={selectedTopic}
            onOpenPlayground={handleOpenPlaygroundWithCode}
            onToggleComplete={onToggleComplete}
            isCompleted={completedTopicIds.has(selectedTopicId)}
            onToggleBookmark={onToggleBookmark}
            isBookmarked={bookmarkedTopicIds.has(selectedTopicId)}
            allTopics={topics}
            completedTopicIds={completedTopicIds}
            onSelectTopic={onSelectTopic}
            isLoading={isLoading}
            activeTab={activeTab}
            onSelectTab={onSelectTab}
          />
        </main>
      </div>

      {/* =================================================================== */}
      {/* FIXED BOTTOM ACTION DOCK (ALGOMASTER-STYLE FOOTER)                   */}
      {/* =================================================================== */}
      <CourseFooterDock
        currentTopic={selectedTopic}
        topics={topics}
        onSelectTopic={onSelectTopic}
        isCompleted={completedTopicIds.has(selectedTopicId)}
        onToggleComplete={onToggleComplete}
        isBookmarked={bookmarkedTopicIds.has(selectedTopicId)}
        onToggleBookmark={onToggleBookmark}
        onOpenAskAi={() => {
          setAiInitialPayload(null);
          setIsAskAiOpen(true);
        }}
        onOpenNotebook={() => setIsNotebookOpen(true)}
        fontSize={fontSize}
        onChangeFontSize={setFontSize}
        isFocusMode={isFocusMode}
        onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
      />

      {/* Slide-over Notebook Drawer */}
      <NotebookDrawer
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        currentTopic={selectedTopic}
        trackTitle={currentTrack?.title || 'Course'}
      />

      {/* Slide-over Google Gemini AI Assistant Drawer */}
      <AskAiDrawer
        isOpen={isAskAiOpen}
        onClose={() => {
          setIsAskAiOpen(false);
          setAiInitialPayload(null);
        }}
        currentTopic={selectedTopic}
        initialPayload={aiInitialPayload}
      />
    </div>
  );
}
