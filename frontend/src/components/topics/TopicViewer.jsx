import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { 
  BookOpen, Layers, Code, CheckCircle, 
  Bookmark, Clock, Sparkles, AlertTriangle, Lightbulb, ShieldCheck, Terminal, Play, Zap,
  ExternalLink, Github, FileText, Bot, Globe, Cpu, Server, Database, ArrowRight, Loader2
} from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';
import CodeSnippet from './CodeSnippet';
import { NoteCard } from './NoteCard';
import InteractiveCodeBox from './InteractiveCodeBox';
import MultiFileCodePlayground from './MultiFileCodePlayground';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';
import { AdapterPatternUmlCard, MediaPlayerUmlCard, SingletonSequenceDiagramCard } from './UmlDiagramCard';
import { 
  CourseIntroQuiz, 
  ParkingLotSimulationCard 
} from './CourseIntroFeatures';
import CourseRoadmapViewer from './CourseRoadmapViewer';
import AiVoiceReader from './AiVoiceReader';

// Lazy-Loaded Micro-Visualizers (Loaded on-demand when topic is opened)
const JvmMemoryVisualizer = lazy(() => import('../visualizers/JvmMemoryVisualizer'));
const ThreadConcurrencyVisualizer = lazy(() => import('../visualizers/ThreadConcurrencyVisualizer'));
const SpringRequestFlowVisualizer = lazy(() => import('../visualizers/SpringRequestFlowVisualizer'));
const LruCacheVisualizer = lazy(() => import('../visualizers/LruCacheVisualizer'));
const HldTrafficSimulator = lazy(() => import('../visualizers/HldTrafficSimulator'));
const RateLimiterVisualizer = lazy(() => import('../visualizers/RateLimiterVisualizer'));
const JdkArchitectureVisualizer = lazy(() => import('../visualizers/JdkArchitectureVisualizer'));
const JavaExecutionPipelineVisualizer = lazy(() => import('../visualizers/JavaExecutionPipelineVisualizer'));
const HelloProgramTokenVisualizer = lazy(() => import('../visualizers/HelloProgramTokenVisualizer'));
const JavaStructureVisualizer = lazy(() => import('../visualizers/JavaStructureVisualizer'));
const CompileRunJavaVisualizer = lazy(() => import('../visualizers/CompileRunJavaVisualizer'));
const JavaFeaturesVisualizer = lazy(() => import('../visualizers/JavaFeaturesVisualizer'));
const JavaDataTypesVisualizer = lazy(() => import('../visualizers/JavaDataTypesVisualizer'));
const JavaVariablesVisualizer = lazy(() => import('../visualizers/JavaVariablesVisualizer'));
const JavaLiteralsVisualizer = lazy(() => import('../visualizers/JavaLiteralsVisualizer'));
const JavaOperatorsVisualizer = lazy(() => import('../visualizers/JavaOperatorsVisualizer'));
const JavaKeywordsVisualizer = lazy(() => import('../visualizers/JavaKeywordsVisualizer'));
const JavaIdentifiersVisualizer = lazy(() => import('../visualizers/JavaIdentifiersVisualizer'));
const JavaConditionalVisualizer = lazy(() => import('../visualizers/JavaConditionalVisualizer'));
const JavaLoopingVisualizer = lazy(() => import('../visualizers/JavaLoopingVisualizer'));
const JavaJumpVisualizer = lazy(() => import('../visualizers/JavaJumpVisualizer'));
const JavaLogicalProgramsVisualizer = lazy(() => import('../visualizers/JavaLogicalProgramsVisualizer'));
const JavaStarPatternsVisualizer = lazy(() => import('../visualizers/JavaStarPatternsVisualizer'));
const JavaNumberPatternsVisualizer = lazy(() => import('../visualizers/JavaNumberPatternsVisualizer'));
const JavaOopsIntroVisualizer = lazy(() => import('../visualizers/JavaOopsIntroVisualizer'));
const JavaClassesObjectsVisualizer = lazy(() => import('../visualizers/JavaClassesObjectsVisualizer'));
const JavaConstructorsVisualizer = lazy(() => import('../visualizers/JavaConstructorsVisualizer'));
const JavaClassRelationshipsVisualizer = lazy(() => import('../visualizers/JavaClassRelationshipsVisualizer'));
const JavaAssociationVisualizer = lazy(() => import('../visualizers/JavaAssociationVisualizer'));
const JavaDependencyVisualizer = lazy(() => import('../visualizers/JavaDependencyVisualizer'));
const JavaInheritanceVisualizer = lazy(() => import('../visualizers/JavaInheritanceVisualizer'));
const JavaPolymorphismVisualizer = lazy(() => import('../visualizers/JavaPolymorphismVisualizer'));
const JavaAbstractionVisualizer = lazy(() => import('../visualizers/JavaAbstractionVisualizer'));
const JavaInterfacesVisualizer = lazy(() => import('../visualizers/JavaInterfacesVisualizer'));
const JavaEncapsulationVisualizer = lazy(() => import('../visualizers/JavaEncapsulationVisualizer'));
const JavaPackagesVisualizer = lazy(() => import('../visualizers/JavaPackagesVisualizer'));
const JavaAccessModifiersVisualizer = lazy(() => import('../visualizers/JavaAccessModifiersVisualizer'));
const JavaThisKeywordVisualizer = lazy(() => import('../visualizers/JavaThisKeywordVisualizer'));
const JavaSuperKeywordVisualizer = lazy(() => import('../visualizers/JavaSuperKeywordVisualizer'));
const JavaStaticKeywordVisualizer = lazy(() => import('../visualizers/JavaStaticKeywordVisualizer'));
const JavaFinalKeywordVisualizer = lazy(() => import('../visualizers/JavaFinalKeywordVisualizer'));
const JavaExceptionHandlingVisualizer = lazy(() => import('../visualizers/JavaExceptionHandlingVisualizer'));
const JavaWhatIsExceptionVisualizer = lazy(() => import('../visualizers/JavaWhatIsExceptionVisualizer'));
const JavaErrorVsExceptionVisualizer = lazy(() => import('../visualizers/JavaErrorVsExceptionVisualizer'));
const JavaCheckedUncheckedVisualizer = lazy(() => import('../visualizers/JavaCheckedUncheckedVisualizer'));
const JavaTryCatchVisualizer = lazy(() => import('../visualizers/JavaTryCatchVisualizer'));
const JavaMultipleCatchVisualizer = lazy(() => import('../visualizers/JavaMultipleCatchVisualizer'));
const JavaMultiCatchPipeVisualizer = lazy(() => import('../visualizers/JavaMultiCatchPipeVisualizer'));
const JavaFinallyBlockVisualizer = lazy(() => import('../visualizers/JavaFinallyBlockVisualizer'));
const JavaTryWithResourcesVisualizer = lazy(() => import('../visualizers/JavaTryWithResourcesVisualizer'));
const JavaThrowKeywordVisualizer = lazy(() => import('../visualizers/JavaThrowKeywordVisualizer'));
const JavaThrowsKeywordVisualizer = lazy(() => import('../visualizers/JavaThrowsKeywordVisualizer'));
const JavaThrowVsThrowsVisualizer = lazy(() => import('../visualizers/JavaThrowVsThrowsVisualizer'));
const JavaCustomExceptionVisualizer = lazy(() => import('../visualizers/JavaCustomExceptionVisualizer'));
const JavaReflectionIntroVisualizer = lazy(() => import('../visualizers/JavaReflectionIntroVisualizer'));
const JavaClassClassVisualizer = lazy(() => import('../visualizers/JavaClassClassVisualizer'));
const JavaMemberInterfaceVisualizer = lazy(() => import('../visualizers/JavaMemberInterfaceVisualizer'));
const JavaFieldClassVisualizer = lazy(() => import('../visualizers/JavaFieldClassVisualizer'));
const JavaMethodClassVisualizer = lazy(() => import('../visualizers/JavaMethodClassVisualizer'));
const JavaConstructorClassVisualizer = lazy(() => import('../visualizers/JavaConstructorClassVisualizer'));
const JavaReflectionAccessControlVisualizer = lazy(() => import('../visualizers/JavaReflectionAccessControlVisualizer'));
const JavaArrayIntroVisualizer = lazy(() => import('../visualizers/JavaArrayIntroVisualizer'));
const Java1DArrayVisualizer = lazy(() => import('../visualizers/Java1DArrayVisualizer'));
const Java2DArrayVisualizer = lazy(() => import('../visualizers/Java2DArrayVisualizer'));
const JavaMatrixArrayVisualizer = lazy(() => import('../visualizers/JavaMatrixArrayVisualizer'));
const JavaJaggedArrayVisualizer = lazy(() => import('../visualizers/JavaJaggedArrayVisualizer'));
const JavaArrayProgramsVisualizer = lazy(() => import('../visualizers/JavaArrayProgramsVisualizer'));
const JavaArraysClassVisualizer = lazy(() => import('../visualizers/JavaArraysClassVisualizer'));
const JavaStringIntroVisualizer = lazy(() => import('../visualizers/JavaStringIntroVisualizer'));
const JavaStringClassVisualizer = lazy(() => import('../visualizers/JavaStringClassVisualizer'));
const TwoPointersVisualizer = lazy(() => import('../visualizers/TwoPointersVisualizer'));
import HelloProgramDiagramCard from './HelloProgramDiagramCard';
import VariableBusDiagramCard from './VariableBusDiagramCard';

export default function TopicViewer({ 
  topic, 
  onOpenPlayground, 
  onToggleComplete, 
  isCompleted, 
  onToggleBookmark, 
  isBookmarked,
  allTopics = [],
  completedTopicIds = new Set(),
  onSelectTopic,
  activeTab: controlledActiveTab,
  onSelectTab
}) {
  // Controlled or internal activeTab
  const [internalActiveTab, setInternalActiveTab] = useState('notes');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;
  const setActiveTab = (tab) => {
    setInternalActiveTab(tab);
    onSelectTab?.(tab);
  };

  // Speech Synthesis Status for Active Text Karaoke Highlight
  const [spokenStatus, setSpokenStatus] = useState({ text: '', index: 0, isPlaying: false });

  useEffect(() => {
    setSpokenStatus({ text: '', index: 0, isPlaying: false });
  }, [topic?.id]);

  // Sliding Bubble Indicator for Topic Tabs
  const topicTabContainerRef = useRef(null);
  const [topicTabBubble, setTopicTabBubble] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    if (!topicTabContainerRef.current) return;
    const tabsList = ['notes', 'architecture', 'code'];
    const activeIndex = tabsList.indexOf(activeTab);
    const buttons = topicTabContainerRef.current.querySelectorAll('.topic-tab-btn');
    if (buttons && buttons[activeIndex]) {
      const el = buttons[activeIndex];
      setTopicTabBubble({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1
      });
    }
  }, [activeTab]);

  if (!topic) {
    return (
      <div className="glass-panel p-12 rounded-3xl text-center border border-slate-800 space-y-4">
        <Sparkles className="w-12 h-12 text-cyan-400 mx-auto animate-pulse" />
        <h3 className="text-xl font-bold text-white">Select a Topic to Start Learning</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Explore comprehensive tracks across Core Java, Spring Boot, System Design, and DSA.
        </p>
      </div>
    );
  }

  const isCourseIntro = topic.id === 'lld-welcome-course-introduction' || topic.title === 'Course Introduction';
  const isCourseRoadmap = topic.id === 'lld-welcome-course-roadmap-lld' || topic.title?.toLowerCase().includes('course roadmap');

  const renderVisualizer = () => {
    // 1. Check direct Topic ID matches
    if (topic.id === 'java-intro-what-is-java' || topic.id === 'java-intro-features-of-java' || topic.id === 'java-intro-use-of-java' || topic.id?.includes('features')) {
      return <JavaFeaturesVisualizer />;
    }
    if (topic.id === 'java-intro-structure-of-program' || topic.animationType === 'java-structure') {
      return <JavaStructureVisualizer />;
    }
    if (topic.id === 'java-intro-jdk-jre-jvm') {
      return <JdkArchitectureVisualizer />;
    }
    if (topic.id === 'java-intro-how-java-works') {
      return <JavaExecutionPipelineVisualizer />;
    }
    if (topic.id === 'java-intro-hello-program-deep-dive') {
      return <HelloProgramTokenVisualizer />;
    }
    if (topic.id === 'java-intro-compile-run-program' || topic.animationType === 'compile-run') {
      return <CompileRunJavaVisualizer />;
    }
    if (topic.id === 'java-terminologies-data-types' || topic.id === 'java-terminologies-variables-datatypes' || topic.animationType === 'data-types') {
      return <JavaDataTypesVisualizer />;
    }
    if (topic.id === 'java-terminologies-variables' || topic.animationType === 'variables') {
      return <JavaVariablesVisualizer />;
    }
    if (topic.id === 'java-terminologies-literals' || topic.animationType === 'literals') {
      return <JavaLiteralsVisualizer />;
    }
    if (topic.id === 'java-terminologies-operators' || topic.animationType === 'operators') {
      return <JavaOperatorsVisualizer />;
    }
    if (topic.id === 'java-terminologies-keywords' || topic.animationType === 'keywords') {
      return <JavaKeywordsVisualizer />;
    }
    if (topic.id === 'java-terminologies-identifiers' || topic.animationType === 'identifiers') {
      return <JavaIdentifiersVisualizer />;
    }
    if (topic.id === 'java-control-statements-conditional' || topic.animationType === 'conditional') {
      return <JavaConditionalVisualizer />;
    }
    if (topic.id === 'java-control-statements-looping' || topic.animationType === 'looping') {
      return <JavaLoopingVisualizer />;
    }
    if (topic.id === 'java-control-statements-jump' || topic.animationType === 'jump') {
      return <JavaJumpVisualizer />;
    }
    if (topic.id === 'java-control-statements-logical-programs' || topic.animationType === 'logical-programs' || topic.id?.includes('logical-programs')) {
      return <JavaLogicalProgramsVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-control-statements-star-patterns' || topic.animationType === 'star-patterns' || topic.id?.includes('star-patterns') || topic.id?.includes('star-pattern')) {
      return <JavaStarPatternsVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-control-statements-number-patterns' || topic.animationType === 'number-patterns' || topic.id?.includes('number-patterns') || topic.id?.includes('number-pattern')) {
      return <JavaNumberPatternsVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-oops-introduction' || topic.animationType === 'oops-intro') {
      return <JavaOopsIntroVisualizer />;
    }
    if (topic.id === 'java-classes-methods-objects' || topic.animationType === 'classes-methods-objects') {
      return <JavaClassesObjectsVisualizer />;
    }
    if (topic.id === 'java-constructors' || topic.animationType === 'constructors') {
      return <JavaConstructorsVisualizer />;
    }
    if (topic.id === 'java-relationship-between-classes' || topic.animationType === 'class-relationships' || topic.id?.includes('relationship-between-classes')) {
      return <JavaClassRelationshipsVisualizer />;
    }
    if (topic.id === 'java-association-has-a-relationship' || topic.animationType === 'association' || topic.id?.includes('association')) {
      return <JavaAssociationVisualizer />;
    }
    if (topic.id === 'java-dependency-uses-a-relationship' || topic.animationType === 'dependency' || topic.id?.includes('dependency')) {
      return <JavaDependencyVisualizer />;
    }
    if (topic.id === 'java-inheritance-is-a-relationship' || topic.animationType === 'inheritance' || topic.id?.includes('inheritance')) {
      return <JavaInheritanceVisualizer />;
    }
    if (topic.id === 'java-polymorphism' || topic.animationType === 'polymorphism' || topic.id?.includes('polymorphism')) {
      return <JavaPolymorphismVisualizer />;
    }
    if (topic.id === 'java-abstraction' || topic.animationType === 'abstraction' || topic.id?.includes('abstraction')) {
      return <JavaAbstractionVisualizer />;
    }
    if (topic.id === 'java-interfaces' || topic.animationType === 'interfaces' || topic.id?.includes('interfaces') || topic.id?.includes('interface')) {
      return <JavaInterfacesVisualizer />;
    }
    if (topic.id === 'java-encapsulation' || topic.animationType === 'encapsulation' || topic.id?.includes('encapsulation')) {
      return <JavaEncapsulationVisualizer />;
    }
    if (topic.id === 'java-packages' || topic.animationType === 'packages' || topic.id?.includes('packages') || topic.id?.includes('package')) {
      return <JavaPackagesVisualizer />;
    }
    if (topic.id === 'java-access-modifiers' || topic.animationType === 'access-modifiers' || topic.id?.includes('access-modifier') || topic.id?.includes('access-modifiers')) {
      return <JavaAccessModifiersVisualizer />;
    }
    if (topic.id === 'java-this-keyword' || topic.animationType === 'this-keyword' || topic.id?.includes('this-keyword') || topic.id?.includes('this')) {
      return <JavaThisKeywordVisualizer />;
    }
    if (topic.id === 'java-super-keyword' || topic.animationType === 'super-keyword' || topic.id?.includes('super-keyword') || topic.id?.includes('super')) {
      return <JavaSuperKeywordVisualizer />;
    }
    if (topic.id === 'java-static-keyword' || topic.animationType === 'static-keyword' || topic.id?.includes('static-keyword') || topic.id?.includes('static')) {
      return <JavaStaticKeywordVisualizer />;
    }
    if (topic.id === 'java-final-keyword' || topic.animationType === 'final-keyword' || topic.id?.includes('final-keyword') || topic.id?.includes('final')) {
      return <JavaFinalKeywordVisualizer />;
    }
    if (topic.id === 'java-exception-what-is-exception' || topic.animationType === 'what-is-exception') {
      return <JavaWhatIsExceptionVisualizer />;
    }
    if (topic.id === 'java-exception-error-vs-exception' || topic.animationType === 'error-vs-exception') {
      return <JavaErrorVsExceptionVisualizer />;
    }
    if (topic.id === 'java-exception-checked-vs-unchecked' || topic.animationType === 'checked-vs-unchecked') {
      return <JavaCheckedUncheckedVisualizer />;
    }
    if (topic.id === 'java-exception-multi-catch-block' || topic.animationType === 'multi-catch-pipe' || topic.id === '08-multi-catch-block' || (topic.id?.includes('multi-catch') && !topic.id?.includes('multiple-catch'))) {
      return <JavaMultiCatchPipeVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-exception-multiple-catch-block' || topic.animationType === 'multiple-catch' || topic.id?.includes('multiple-catch')) {
      return <JavaMultipleCatchVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-exception-custom-exception-class' || topic.animationType === 'custom-exception' || topic.id === '13-custom-exception-class' || topic.id?.includes('custom-exception')) {
      return <JavaCustomExceptionVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-exception-throw-vs-throws' || topic.animationType === 'throw-vs-throws' || topic.id === '12-throw-vs-throws' || topic.id?.includes('throw-vs-throws') || topic.id?.includes('throw-vs-throw')) {
      return <JavaThrowVsThrowsVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-exception-throw-keyword' || topic.animationType === 'throw-keyword' || topic.id === '10-throw-keyword' || (topic.id?.includes('throw') && !topic.id?.includes('throws'))) {
      return <JavaThrowKeywordVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-exception-throws-keyword' || topic.animationType === 'throws-keyword' || topic.id === '11-throws-keyword' || topic.id?.includes('throws')) {
      return <JavaThrowsKeywordVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-exception-try-with-resources' || topic.animationType === 'try-with-resources' || topic.id?.includes('try-with-resources') || topic.id?.includes('try-with-resource')) {
      return <JavaTryWithResourcesVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-exception-finally-block' || topic.animationType === 'finally-block' || topic.id?.includes('finally')) {
      return <JavaFinallyBlockVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-exception-try-catch-block' || topic.animationType === 'try-catch' || topic.animationType === 'try-catch-block' || (topic.id?.includes('try-catch') && !topic.id?.includes('multiple-catch') && !topic.id?.includes('finally'))) {
      return <JavaTryCatchVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.category === 'Exception Handling' || topic.id?.includes('exception') || topic.animationType === 'exception-handling') {
      return <JavaExceptionHandlingVisualizer />;
    }
    if (topic.id === 'java-reflection-class-class' || topic.animationType === 'reflection-class-class') {
      return <JavaClassClassVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-reflection-member-interface' || topic.animationType === 'reflection-member-interface') {
      return <JavaMemberInterfaceVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-reflection-field-class' || topic.animationType === 'reflection-field-class') {
      return <JavaFieldClassVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-reflection-method-class' || topic.animationType === 'method-class' || topic.animationType === 'reflection-method-class') {
      return <JavaMethodClassVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-reflection-constructor-class' || topic.animationType === 'constructor-class' || topic.animationType === 'reflection-constructor-class') {
      return <JavaConstructorClassVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-reflection-access-control' || topic.animationType === 'access-control' || topic.animationType === 'reflection-access-control') {
      return <JavaReflectionAccessControlVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.category === 'Reflection API' || topic.id?.includes('reflection') || topic.animationType === 'reflection-intro' || topic.animationType === 'reflection') {
      return <JavaReflectionIntroVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-arrays-introduction' || topic.animationType === 'array-intro' || topic.id === '01-array-introduction' || (topic.category === 'Arrays' && topic.title?.toLowerCase().includes('introduction'))) {
      return <JavaArrayIntroVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-arrays-1d' || topic.animationType === '1d-array' || topic.id === '02-1d-array' || (topic.category === 'Arrays' && (topic.title?.toLowerCase().includes('1 d') || topic.title?.toLowerCase().includes('one dimensional')))) {
      return <Java1DArrayVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-arrays-2d' || topic.animationType === '2d-array' || topic.id === '03-2d-array' || (topic.category === 'Arrays' && (topic.title?.toLowerCase().includes('2 d') || topic.title?.toLowerCase().includes('two dimensional')))) {
      return <Java2DArrayVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-arrays-matrix' || topic.animationType === 'matrix-array' || topic.id === '04-matrix-array' || (topic.category === 'Arrays' && topic.title?.toLowerCase().includes('matrix'))) {
      return <JavaMatrixArrayVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-arrays-jagged' || topic.animationType === 'jagged-array' || topic.id === '05-jagged-array' || (topic.category === 'Arrays' && topic.title?.toLowerCase().includes('jagged'))) {
      return <JavaJaggedArrayVisualizer onOpenPlayground={onOpenPlayground} />;
    }
    if (topic.id === 'java-arrays-programs' || topic.animationType === 'array-programs' || topic.id === '06-array-programs' || (topic.category === 'Arrays' && topic.title?.toLowerCase().includes('program'))) {
      return <JavaArrayProgramsVisualizer onOpenPlayground={onOpenPlayground} activeTab={activeTab} onSwitchTab={setActiveTab} />;
    }
    if (topic.id === 'java-arrays-class' || topic.animationType === 'arrays-class' || topic.id === '07-arrays-class' || (topic.category === 'Arrays' && topic.title?.toLowerCase().includes('arrays class'))) {
      return <JavaArraysClassVisualizer onOpenPlayground={onOpenPlayground} activeTab={activeTab} />;
    }
    if (topic.id === 'java-strings-introduction' || topic.animationType === 'string-intro' || topic.id === '01-string-introduction' || (topic.category === 'Strings' && topic.title?.toLowerCase().includes('introduction'))) {
      return <JavaStringIntroVisualizer onOpenPlayground={onOpenPlayground} activeTab={activeTab} />;
    }
    if (topic.id === 'java-strings-class' || topic.animationType === 'string-class' || topic.id === '02-string-class' || (topic.category === 'Strings' && topic.title?.toLowerCase().includes('string class'))) {
      return <JavaStringClassVisualizer onOpenPlayground={onOpenPlayground} activeTab={activeTab} />;
    }
    if (topic.id === 'dsa-two-pointers') {
      return <TwoPointersVisualizer />;
    }

    // 2. Check animationType matches
    switch (topic.animationType) {
      case 'jvm-memory':
        return <JvmMemoryVisualizer />;
      case 'multithreading':
        return <ThreadConcurrencyVisualizer />;
      case 'spring-pipeline':
        return <SpringRequestFlowVisualizer />;
      case 'lru-cache':
        return <LruCacheVisualizer />;
      case 'rate-limiter':
        return <RateLimiterVisualizer />;
      case 'hld-traffic':
        return <HldTrafficSimulator />;
      default:
        return null;
    }
  };

  const rawVisualizer = renderVisualizer();
  const visualizerComponent = rawVisualizer ? (
    <Suspense fallback={
      <div className="glass-panel p-10 rounded-3xl border border-cyan-900/40 bg-[#0B1222]/90 flex flex-col items-center justify-center space-y-3 min-h-[320px] shadow-2xl animate-pulse">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
        <div className="text-xs font-mono font-bold text-slate-300">Loading Interactive Visualizer...</div>
        <div className="text-[11px] text-slate-500 font-mono">Optimized on-demand code chunk</div>
      </div>
    }>
      {rawVisualizer}
    </Suspense>
  ) : null;

  const bankAccountCode = `public class BankAccount {
    private final String accountNumber;
    private final String ownerName;
    private double balance;

    public BankAccount(String accountNumber, String ownerName) {
        if (accountNumber == null || accountNumber.isBlank()) {
            throw new IllegalArgumentException("Account number cannot be empty");
        }
        if (ownerName == null || ownerName.isBlank()) {
            throw new IllegalArgumentException("Owner name cannot be empty");
        }
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0.0;
    }

    public synchronized void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        this.balance += amount;
    }

    public synchronized boolean withdraw(double amount) {
        if (amount <= 0 || amount > this.balance) {
            return false;
        }
        this.balance -= amount;
        return true;
    }

    public synchronized double getBalance() {
        return this.balance;
    }

    public String getAccountNumber() { return accountNumber; }
    public String getOwnerName() { return ownerName; }
}

// Test your implementation
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("123456", "John Doe");
        account.deposit(1000);
        System.out.println(account.getBalance());  // Should print 1000.0

        boolean success = account.withdraw(500);
        System.out.println(success);               // Should print true
        System.out.println(account.getBalance());  // Should print 500.0

        success = account.withdraw(1000);
        System.out.println(success);               // Should print false
    }
}`;

  // Complete 8 Modular Java Files for Tic-Tac-Toe Game Engine
  const ticTacToeFiles = {
    'Board.java': `class Board {
    private final Cell[][] grid;
    private final int size;

    public Board(int size) {
        this.size = size;
        this.grid = new Cell[size][size];
        initializeBoard();
    }

    private void initializeBoard() {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                grid[i][j] = new Cell();
            }
        }
    }

    public void placeSymbol(int row, int col, Symbol symbol) {
        validatePosition(row, col);
        if (!grid[row][col].isEmpty()) {
            throw new InvalidMoveException("Cell at (" + row + ", " + col + ") is already occupied");
        }
        grid[row][col].setSymbol(symbol);
    }

    public boolean isCellEmpty(int row, int col) {
        validatePosition(row, col);
        return grid[row][col].isEmpty();
    }

    public boolean isFull() {
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                if (grid[i][j].isEmpty()) return false;
            }
        }
        return true;
    }

    public Cell getCell(int row, int col) {
        validatePosition(row, col);
        return grid[row][col];
    }

    public int getSize() {
        return size;
    }

    private void validatePosition(int row, int col) {
        if (row < 0 || row >= size || col < 0 || col >= size) {
            throw new InvalidMoveException(
                "Position (" + row + ", " + col + ") is out of bounds"
            );
        }
    }

    public void printBoard() {
        System.out.println();
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                System.out.print(" " + grid[i][j].getSymbol().getDisplayChar() + " ");
                if (j < size - 1) System.out.print("|");
            }
            System.out.println();
            if (i < size - 1) {
                System.out.println("-".repeat(size * 4 - 1));
            }
        }
        System.out.println();
    }
}`,

    'Cell.java': `class Cell {
    private Symbol symbol;

    public Cell() {
        this.symbol = Symbol.EMPTY;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public void setSymbol(Symbol symbol) {
        this.symbol = symbol;
    }

    public boolean isEmpty() {
        return symbol == Symbol.EMPTY;
    }
}`,

    'Game.java': `class Game {
    private final Board board;
    private final Player[] players;
    private int currentPlayerIndex;
    private GameStatus status;

    public Game(Player player1, Player player2, int boardSize) {
        this.board = new Board(boardSize);
        this.players = new Player[]{player1, player2};
        this.currentPlayerIndex = 0;
        this.status = GameStatus.IN_PROGRESS;
    }

    public synchronized void makeMove(int row, int col) {
        if (status != GameStatus.IN_PROGRESS) {
            throw new InvalidMoveException("Game is already over with status: " + status);
        }

        Player current = getCurrentPlayer();
        board.placeSymbol(row, col, current.getSymbol());

        if (checkWin(row, col, current.getSymbol())) {
            this.status = (current.getSymbol() == Symbol.X) ? GameStatus.WINNER_X : GameStatus.WINNER_O;
            return;
        }

        if (board.isFull()) {
            this.status = GameStatus.DRAW;
            return;
        }

        // Switch to the other player
        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    }

    private boolean checkWin(int row, int col, Symbol symbol) {
        int n = board.getSize();

        // 1. Check Row
        boolean rowWin = true;
        for (int c = 0; c < n; c++) {
            if (board.getCell(row, c).getSymbol() != symbol) {
                rowWin = false;
                break;
            }
        }
        if (rowWin) return true;

        // 2. Check Column
        boolean colWin = true;
        for (int r = 0; r < n; r++) {
            if (board.getCell(r, col).getSymbol() != symbol) {
                colWin = false;
                break;
            }
        }
        if (colWin) return true;

        // 3. Check Main Diagonal
        if (row == col) {
            boolean diagWin = true;
            for (int i = 0; i < n; i++) {
                if (board.getCell(i, i).getSymbol() != symbol) {
                    diagWin = false;
                    break;
                }
            }
            if (diagWin) return true;
        }

        // 4. Check Anti-Diagonal
        if (row + col == n - 1) {
            boolean antiDiagWin = true;
            for (int i = 0; i < n; i++) {
                if (board.getCell(i, n - 1 - i).getSymbol() != symbol) {
                    antiDiagWin = false;
                    break;
                }
            }
            if (antiDiagWin) return true;
        }

        return false;
    }

    public Board getBoard() { return board; }
    public Player getCurrentPlayer() { return players[currentPlayerIndex]; }
    public GameStatus getStatus() { return status; }

    public Player getWinner() {
        if (status == GameStatus.WINNER_X) {
            return (players[0].getSymbol() == Symbol.X) ? players[0] : players[1];
        } else if (status == GameStatus.WINNER_O) {
            return (players[0].getSymbol() == Symbol.O) ? players[0] : players[1];
        }
        return null;
    }

    public void printBoard() {
        board.printBoard();
    }
}`,

    'Player.java': `class Player {
    private final String name;
    private final Symbol symbol;

    public Player(String name, Symbol symbol) {
        if (symbol == Symbol.EMPTY) {
            throw new IllegalArgumentException("Player cannot have EMPTY symbol");
        }
        this.name = name;
        this.symbol = symbol;
    }

    public String getName() {
        return name;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    @Override
    public String toString() {
        return name + " (" + symbol.getDisplayChar() + ")";
    }
}`,

    'GameStatus.java': `enum GameStatus {
    IN_PROGRESS,
    WINNER_X,
    WINNER_O,
    DRAW
}`,

    'Symbol.java': `enum Symbol {
    X('X'),
    O('O'),
    EMPTY('_');

    private final char displayChar;

    Symbol(char displayChar) {
        this.displayChar = displayChar;
    }

    public char getDisplayChar() {
        return displayChar;
    }
}`,

    'InvalidMoveException.java': `public class InvalidMoveException extends RuntimeException {
    public InvalidMoveException(String message) {
        super(message);
    }
}`,

    'TicTacToeDemo.java': `import java.util.*;

public class TicTacToeDemo {
    public static void main(String[] args) {
        Player alice = new Player("Alice", Symbol.X);
        Player bob = new Player("Bob", Symbol.O);

        Game game = new Game(alice, bob, 3);

        System.out.println("========== TIC TAC TOE ==========");

        // Alice (X) completes the top row and wins
        game.makeMove(0, 0);  // X at (0,0)
        game.makeMove(1, 0);  // O at (1,0)
        game.makeMove(0, 1);  // X at (0,1)
        game.makeMove(1, 1);  // O at (1,1)
        game.makeMove(0, 2);  // X at (0,2) - Alice wins!

        game.printBoard();

        System.out.println("Result: " + game.getStatus());
        Player winner = game.getWinner();
        if (winner != null) {
            System.out.println("Winner: " + winner.getName() + " (" + winner.getSymbol() + ")");
        }
    }
}`
  };

  // Dedicated Dynamic Render for Course Introduction (Loaded dynamically from Database)
  const renderCourseIntroContent = () => {
    const defaultDriveLink = "https://algomaster.io/learn/lld/course-introduction";
    const defaultHtmlLink = "https://algomaster.io/learn/lld/course-introduction";
    const driveLink = topic.driveLink || defaultDriveLink;
    const htmlLink = topic.localHtmlLink || defaultHtmlLink;

    return (
      <div className="space-y-8 animate-in fade-in duration-300">
        {/* Dynamic AI Voice Assistant Audio Companion for Course Introduction */}
        <AiVoiceReader
          title={topic.title}
          summary={topic.summary}
          deepDive={topic.deepDive}
          eli10={topic.eli10}
          mentalModel={topic.mentalModel}
          interviewTraps={topic.interviewTraps}
        />

        {/* Welcome & Overview Header (Database Driven) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-5 shadow-xl">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              <span>{topic.estimatedMinutes || 5} min read</span>
              <span>•</span>
              <span className="text-slate-400">Database Synced</span>
              {topic.difficulty && (
                <>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800 text-[10px]">
                    {topic.difficulty}
                  </span>
                </>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1.5">
              {topic.title}
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              {topic.summary}
            </p>
          </div>

          {/* Adapter Pattern Intro Visual Banner */}
          <AdapterPatternUmlCard />



          {/* Supported Languages */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono">
              Supported Languages (6+ Languages)
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Java (Primary)', color: 'bg-amber-950/80 text-amber-300 border-amber-800' },
                { name: 'Python', color: 'bg-blue-950/80 text-blue-300 border-blue-800' },
                { name: 'C++', color: 'bg-cyan-950/80 text-cyan-300 border-cyan-800' },
                { name: 'C#', color: 'bg-purple-950/80 text-purple-300 border-purple-800' },
                { name: 'Go', color: 'bg-teal-950/80 text-teal-300 border-teal-800' },
                { name: 'TypeScript', color: 'bg-indigo-950/80 text-indigo-300 border-indigo-800' },
              ].map(lang => (
                <span key={lang.name} className={`px-3 py-1 rounded-xl text-xs font-semibold border ${lang.color}`}>
                  {lang.name}
                </span>
              ))}
            </div>
          </div>

          {/* Additional Resources Cards (Database Links) */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-200 uppercase tracking-wide font-mono">
              Additional Resources &amp; Downloads
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <a
                href="https://algomaster.io/learn/lld/course-introduction"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-gradient-to-b from-indigo-950/60 to-slate-900/90 border border-indigo-500/40 hover:border-cyan-400 hover:bg-indigo-950/80 transition group flex flex-col justify-between space-y-2 shadow-lg shadow-indigo-950/40"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    AlgoMaster Course Intro
                  </span>
                  <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/90 px-2 py-0.2 rounded border border-cyan-800 flex items-center gap-1 font-bold">
                    OFFICIAL <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">Live official course introduction on AlgoMaster.io.</p>
              </a>

              <a
                href="https://github.com/ashishps1/awesome-low-level-design"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition flex items-center gap-1.5">
                    <Github className="w-4 h-4 text-cyan-400" />
                    LLD GitHub Repo
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/80 px-2 py-0.2 rounded border border-amber-800">25k+ ★</span>
                </div>
                <p className="text-[11px] text-slate-400">Popular open-source LLD repository with solutions.</p>
              </a>

              <a
                href="https://algomaster.io/learn/lld"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 transition group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-emerald-400" />
                    LLD Revision Sheet
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.2 rounded border border-emerald-800">FREE</span>
                </div>
                <p className="text-[11px] text-slate-400">Track progress, star topics &amp; take revision notes.</p>
              </a>

              <a
                href="https://algomaster.io/interview/low-level-design"
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-800/60 transition group flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-purple-300 transition flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-purple-400" />
                    AI Mock Interview
                  </span>
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/80 px-2 py-0.2 rounded border border-purple-800">PRACTICE</span>
                </div>
                <p className="text-[11px] text-slate-400">Simulate realistic LLD interviews with AI feedback.</p>
              </a>
            </div>
          </div>
        </div>

        {/* Pillar 1 & Main Comprehensive Study Material (Rendered dynamically from Database deepDive) */}
        {topic.deepDive && (
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">Course Curriculum &amp; Study Notes</h3>
              </div>
              <span className="text-xs text-cyan-400 font-mono font-semibold bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                Database Material
              </span>
            </div>

            <MarkdownRenderer 
              content={topic.deepDive} 
              className="pt-2" 
              activeSpokenText={spokenStatus.isPlaying ? spokenStatus.text : ''} 
            />
          </div>
        )}

        {/* Pillar 2: Class and Sequence Diagrams */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">2</span>
            <h4 className="text-lg font-bold text-white">Class and Sequence Diagrams</h4>
          </div>

          <MediaPlayerUmlCard />
          <SingletonSequenceDiagramCard />
        </div>

        {/* Pillar 3: Design Exercises (Bank Account Class - Dynamic Code Snippet) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <span className="w-6 h-6 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono text-xs flex items-center justify-center font-bold">3</span>
            <h4 className="text-lg font-bold text-white">Design Exercises: Bank Account Class</h4>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-200">Problem Statement &amp; Requirements:</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Create a thread-safe <code className="text-cyan-300">BankAccount</code> class that manages a simple bank account with deposit, withdrawal, and balance checking functionality.
            </p>
            <ul className="text-xs text-slate-300 space-y-1 pl-4 list-disc marker:text-emerald-400">
              <li><strong>Fields:</strong> <code className="text-cyan-300">accountNumber</code>, <code className="text-cyan-300">ownerName</code>, <code className="text-cyan-300">balance</code> (double)</li>
              <li><strong>Constructor:</strong> Initializes account with owner name and account number (balance starts at 0.0)</li>
              <li><strong>deposit(amount):</strong> Adds money to balance (only strictly positive amounts)</li>
              <li><strong>withdraw(amount):</strong> Removes money if sufficient funds exist, returns success/failure boolean</li>
              <li><strong>getBalance():</strong> Returns current balance</li>
            </ul>
          </div>

          {/* Embedded Runnable Playground for Bank Account */}
          <InteractiveCodeBox
            title="BankAccount.java"
            initialCode={topic.codeSnippet?.code || bankAccountCode}
            expectedOutput="1000.0&#10;true&#10;500.0&#10;false&#10;&#10;✓ All assertions passed: Balance invariants verified!"
            scenarioId="custom"
          />
        </div>

        {/* Pillar 4: Interactive Try-It-Yourself (Modular 8-File Tic-Tac-Toe Game Engine) */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-5 shadow-xl">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <span className="w-6 h-6 rounded-full bg-cyan-950 border border-cyan-500 text-cyan-300 font-mono text-xs flex items-center justify-center font-bold">4</span>
            <h4 className="text-lg font-bold text-white">Try It Yourself: Multi-File Tic-Tac-Toe Game Engine</h4>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Each interview problem includes hands-on implementation exercises. Explore the modular 8-file object-oriented architecture below, inspect entities, enums and game loop, and run the test demo:
          </p>

          {/* Embedded 8-File Project Explorer & Runner */}
          <MultiFileCodePlayground
            files={ticTacToeFiles}
            initialActiveFile="TicTacToeDemo.java"
            expectedOutput="========== TIC TAC TOE ==========&#10; X | X | X &#10;-----------&#10; O | O | _ &#10;-----------&#10; _ | _ | _ &#10;&#10;Result: WINNER_X&#10;Winner: Alice (X)"
            title="TicTacToe Engine Workspace"
          />
        </div>


        {/* Pillar 5: Interactive Quizzes (Dynamically Loaded from Database API) */}
        <CourseIntroQuiz topicId={topic.id} trackId={topic.trackId || 'system-design'} />

        {/* Pillar 6: Problem Simulation (Parking Lot) */}
        <ParkingLotSimulationCard />

        {/* Bottom Call to Action: Course Introduction HTML Resource */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-[#0d1829] via-[#0f172a] to-[#0d1829] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="space-y-2 text-center sm:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-300 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Official Online Masterclass</span>
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-white">
              {topic.title} on AlgoMaster.io
            </h4>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Access the complete interactive course curriculum, deep-dive architectures, and live updates directly on AlgoMaster.io.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 z-10">
            <a
              href="https://algomaster.io/learn/lld/course-introduction"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2.5 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition shrink-0"
            >
              <Globe className="w-4 h-4 text-cyan-200" />
              <span>Open on AlgoMaster.io</span>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-200" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-3.5">
      {/* Clean 3 Tabs Navigation with Animated Sliding Bubble Indicator */}
      <div 
        ref={topicTabContainerRef}
        className="flex items-center justify-between gap-1.5 p-1 rounded-2xl bg-[#090E1D] border border-slate-800/90 relative shadow-inner overflow-x-auto"
      >
        {/* Sliding Bubble Background Indicator */}
        <div 
          className="absolute top-1 bottom-1 rounded-xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 shadow-lg shadow-cyan-600/30 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-none"
          style={{
            left: `${topicTabBubble.left}px`,
            width: `${topicTabBubble.width}px`,
            opacity: topicTabBubble.opacity
          }}
        />

        <div className="flex items-center gap-1.5">
          {[
            { id: 'notes', label: 'Notes', icon: BookOpen },
            { id: 'architecture', label: 'Architecture', icon: Layers },
            { id: 'code', label: 'Code Playground', icon: Code },
          ].map(tab => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`topic-tab-btn relative z-10 flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap ${
                  isCurrent
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {(isCourseIntro || topic.driveLink) && (
          <a
            href={isCourseIntro ? "https://algomaster.io/learn/lld/course-introduction" : topic.driveLink}
            target="_blank"
            rel="noreferrer"
            className="relative z-10 mr-1 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-sm shadow-indigo-500/25 border border-indigo-400/30 transition group shrink-0"
            title={isCourseIntro ? "Open on AlgoMaster.io" : "Open Notes & PDF on Google Drive"}
          >
            {isCourseIntro ? (
              <Globe className="w-3.5 h-3.5 text-cyan-200 group-hover:scale-110 transition" />
            ) : (
              <Code className="w-3.5 h-3.5 text-cyan-200 group-hover:scale-110 transition" />
            )}
            <span>{isCourseIntro ? "AlgoMaster" : "Drive Notes"}</span>
            <ExternalLink className="w-3 h-3 text-cyan-200" />
          </a>
        )}
      </div>

      {/* Tab 1: Notes */}
      {activeTab === 'notes' && (
        isCourseIntro ? (
          renderCourseIntroContent()
        ) : isCourseRoadmap ? (
          <CourseRoadmapViewer 
            topics={allTopics} 
            completedTopicIds={completedTopicIds} 
            onSelectTopic={onSelectTopic} 
          />
        ) : (
          <div className="space-y-3.5 animate-in fade-in duration-300">
            {/* AI Voice Assistant Audio Companion */}
            <AiVoiceReader
              title={topic.title}
              summary={topic.summary}
              deepDive={topic.deepDive}
              eli10={topic.eli10}
              mentalModel={topic.mentalModel}
              interviewTraps={topic.interviewTraps}
              onSpeechStatusChange={setSpokenStatus}
            />

            {/* Main Comprehensive Study Notes Canvas or Programs List Suite */}
            {(topic.id?.includes('logical-programs') || topic.id?.includes('star-pattern') || topic.id?.includes('number-pattern') || topic.id === 'java-arrays-programs' || topic.id === '06-array-programs' || topic.animationType === 'logical-programs' || topic.animationType === 'array-programs' || topic.animationType === 'star-patterns' || topic.animationType === 'number-patterns') ? (
              <div className="space-y-4">
                {visualizerComponent}
              </div>
            ) : (
              topic.deepDive && (
                <div className="glass-panel p-6 sm:p-9 rounded-2xl border border-slate-800/80 bg-[#0B1120]/90 shadow-2xl relative overflow-hidden">
                  {/* Subtle Ambient Accent Glow */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
                  <MarkdownRenderer 
                    content={topic.deepDive} 
                    activeSpokenText={spokenStatus.isPlaying ? spokenStatus.text : ''} 
                  />
                </div>
              )
            )}
          </div>
        )
      )}

      {/* Tab 2: Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* For Course Introduction: Render Full Visual Diagram Suite in Architecture Tab */}
          {isCourseIntro && (
            <div className="space-y-6">
              <AdapterPatternUmlCard />
              <MediaPlayerUmlCard />
              <SingletonSequenceDiagramCard />
              <ParkingLotSimulationCard />
            </div>
          )}

          {/* Interactive Simulation / Visualizer */}
          {visualizerComponent ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1 px-1">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                  <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>Interactive Architecture Simulation Theater</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Live JVM &amp; OOP Engine</span>
              </div>
              {visualizerComponent}
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl border border-slate-800 bg-[#0B1222]/80 text-center space-y-3">
              <Cpu className="w-10 h-10 text-cyan-400 mx-auto animate-pulse" />
              <h4 className="text-base font-bold text-white">System Architecture &amp; Execution Specification</h4>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Detailed JVM runtime mechanics, memory layout invariants, and structural relationship flows for <strong>{topic.title}</strong>.
              </p>
            </div>
          )}

          {/* Comprehensive Technical Architectural Blueprint & System Internals Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#091122] via-[#070D1A] to-[#040812] space-y-6 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 shadow-md shadow-cyan-950/40">
                  <Layers className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold text-white">
                    Architectural Blueprint &amp; System Internals
                  </h4>
                  <p className="text-xs text-slate-400">
                    Deep technical breakdown of JVM memory, execution lifecycles, and enterprise patterns for {topic.title}.
                  </p>
                </div>
              </div>

              <span className="text-[10.5px] font-mono font-bold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800">
                JVM Spec v21
              </span>
            </div>

            {/* 3 Core Architecture Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Pillar 1: Memory & State Model */}
              <div className="p-4 rounded-2xl bg-[#060B16] border border-blue-500/30 space-y-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block border-b border-slate-800 pb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>1. Memory &amp; State Model</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {topic.category?.includes("OOP") 
                    ? "Objects reside on the Garbage-Collected Heap. Class metadata, bytecode definitions, and static members reside in Metaspace (Native RAM). Method invocations push lightweight stack frames containing Local Variable Arrays (LVA) and Operand Stacks."
                    : "Primitive variables and method execution frames reside directly in the Thread Call Stack with zero GC overhead. Reference pointers traverse the 64-bit address space to access Heap objects."
                  }
                </p>
              </div>

              {/* Pillar 2: Compiler & Dispatch Mechanics */}
              <div className="p-4 rounded-2xl bg-[#060B16] border border-emerald-500/30 space-y-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block border-b border-slate-800 pb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>2. Execution &amp; Dispatch</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {topic.category?.includes("OOP")
                    ? "Static methods and private calls resolve at compile time via 'invokestatic' and 'invokespecial'. Virtual method calls resolve dynamically at runtime via 'invokevirtual' (vtable) and 'invokeinterface' (itable), optimized by HotSpot JIT C1/C2 inlining."
                    : "Bytecode is verified by the Bytecode Verifier to ensure type safety before tiered JIT compilation converts hot loops into direct native assembly instructions."
                  }
                </p>
              </div>

              {/* Pillar 3: Enterprise Integration */}
              <div className="p-4 rounded-2xl bg-[#060B16] border border-purple-500/30 space-y-2.5 shadow-inner">
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block border-b border-slate-800 pb-1 flex items-center gap-1.5">
                  <Server className="w-3.5 h-3.5" />
                  <span>3. Enterprise Design</span>
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {topic.category?.includes("OOP")
                    ? "Serves as the foundation for Spring Framework Dependency Injection (IoC Container), Hibernate JPA Entity Lifecycle management, and microservice Domain-Driven Design (DDD) aggregate roots."
                    : "Ensures low-latency high-throughput data pipelines, zero memory leaks, thread-safe concurrent transactions, and horizontal scalability across containerized cloud pods."
                  }
                </p>
              </div>
            </div>

            {/* Technical Mental Model & System Invariant Callout */}
            {(topic.mentalModel || topic.eli10) && (
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Architectural Invariant &amp; Mental Model</span>
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {topic.mentalModel || topic.eli10}
                </p>
              </div>
            )}
          </div>

          {/* Step-by-Step Architecture Pipeline */}
          {topic.interactiveSteps && topic.interactiveSteps.length > 0 && (
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 bg-[#0B1222]/90 space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm pb-2 border-b border-slate-800">
                <Sparkles className="w-4 h-4" />
                <span>Execution Pipeline &amp; Step-by-Step Flow</span>
              </div>
              <div className="space-y-3 pt-2">
                {topic.interactiveSteps.map(st => (
                  <div key={st.stepNumber} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-3 hover:border-cyan-500/30 transition">
                    <span className="w-6 h-6 rounded-full bg-cyan-600/30 border border-cyan-500 text-cyan-300 font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {st.stepNumber}
                    </span>
                    <div className="space-y-1">
                      <h5 className="text-sm font-bold text-white">{st.title}</h5>
                      <p className="text-xs text-slate-300 leading-relaxed">{st.description}</p>
                      {st.highlightedComponent && (
                        <span className="inline-block mt-1 text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                          Active Component: {st.highlightedComponent}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Code Playground */}
      {activeTab === 'code' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {isCourseIntro ? (
            <UniversalCodePlayground
              files={ticTacToeFiles}
              initialActiveFile="TicTacToeDemo.java"
              expectedOutput="========== TIC TAC TOE ==========&#10; X | X | X &#10;-----------&#10; O | O | _ &#10;-----------&#10; _ | _ | _ &#10;&#10;Result: WINNER_X&#10;Winner: Alice (X)"
              title="TicTacToe Engine Project Workspace"
              defaultHeight="min-h-[460px]"
            />
          ) : topic.codeSnippet ? (
            <div className="space-y-6">
              <UniversalCodePlayground
                title={`${topic.title} Playground`}
                initialCode={topic.codeSnippet.code}
                scenarioId={topic.id}
                explanation={topic.codeSnippet.explanation}
                defaultHeight="min-h-[440px]"
              />
            </div>
          ) : (
            <UniversalCodePlayground
              title={`${topic.title} Playground`}
              initialCode={`// Interactive Java 21 Playground for: ${topic.title}\npublic class Solution {\n    public static void main(String[] args) {\n        System.out.println("Exploring: ${topic.title}");\n        System.out.println("Java 21 JVM Environment Ready.");\n    }\n}`}
              scenarioId={topic.id}
              defaultHeight="min-h-[440px]"
            />
          )}
        </div>
      )}
    </div>
  );
}
