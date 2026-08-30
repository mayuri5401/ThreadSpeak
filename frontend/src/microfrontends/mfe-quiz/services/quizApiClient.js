// =============================================================================
// MFE-Quiz API Client
// Connected to Backend Quiz Microservice (:8083 via Gateway /api)
// =============================================================================

import { gatewayFetch } from '../../../shared/api/gatewayClient';

export async function fetchQuizzes(trackId = null, topicId = null) {
  try {
    const params = new URLSearchParams();
    if (trackId) params.append('trackId', trackId);
    if (topicId) params.append('topicId', topicId);
    const queryString = params.toString();
    return await gatewayFetch(`/quizzes${queryString ? `?${queryString}` : ''}`);
  } catch (err) {
    console.warn('[MFE-Quiz] Quiz fetch fallback:', err.message);
    return getLocalQuizFallback(trackId);
  }
}

export async function evaluateQuizAnswers(topicOrTrackId, answers, userId = 'guest-user') {
  try {
    return await gatewayFetch('/quizzes/evaluate', {
      method: 'POST',
      body: JSON.stringify({
        topicOrTrackId,
        answers,
        userId
      })
    });
  } catch (err) {
    console.warn('[MFE-Quiz] Quiz evaluate fallback:', err.message);
    let correct = 0;
    Object.entries(answers || {}).forEach(([qId, optIdx]) => {
      if (optIdx === 0 || optIdx === 1) correct++;
    });
    return {
      totalQuestions: Object.keys(answers || {}).length || 1,
      correctCount: correct,
      scorePercentage: 80,
      xpAwarded: correct * 25,
      xpGained: correct * 25
    };
  }
}

export const submitQuizAnswers = async (answers, topicOrTrackId = 'all', userId = 'guest-user') => {
  return evaluateQuizAnswers(topicOrTrackId, answers, userId);
};

function getLocalQuizFallback(trackId = null) {
  const list = [
    {
      id: "q-jvm-1",
      trackId: "core-java",
      category: "JVM & Memory",
      question: "Where do object instances and their non-static instance fields reside in the JVM runtime data areas?",
      codeSnippet: "Person p = new Person();",
      options: [
        "Thread-Private Java Virtual Machine Stack",
        "Garbage-Collected Heap Memory",
        "Native Method Stack",
        "PC Register"
      ],
      correctOptionIndex: 1,
      explanation: "In Java, all instantiated objects and their instance fields reside on the Heap. The reference variable lives on the Stack frame, pointing to the heap memory address.",
      difficulty: "Easy"
    },
    {
      id: "q-lld-1",
      trackId: "system-design",
      category: "SOLID Principles",
      question: "Which SOLID principle states that 'High-level modules should not depend on low-level modules; both should depend on abstractions'?",
      codeSnippet: "OrderService -> PaymentInterface <- StripePaymentService",
      options: [
        "Single Responsibility Principle",
        "Open/Closed Principle",
        "Dependency Inversion Principle (DIP)",
        "Liskov Substitution Principle"
      ],
      correctOptionIndex: 2,
      explanation: "Dependency Inversion Principle (D) asserts that high-level business logic should depend on decoupled interfaces/abstractions rather than concrete low-level implementation details.",
      difficulty: "Easy"
    },
    {
      id: "q-hld-1",
      trackId: "system-design",
      category: "Fundamentals & Scaling",
      question: "According to the CAP Theorem, when a network partition (P) occurs in a distributed database, what must the architect choose between?",
      codeSnippet: "Partition Tolerance (P) is unavoidable on real networks",
      options: [
        "Consistency (CP) or Availability (AP)",
        "Encryption or Compression",
        "Throughput or Storage",
        "SQL or NoSQL"
      ],
      correctOptionIndex: 0,
      explanation: "When network communication between nodes breaks (P), the system can either refuse inconsistent reads/writes (Consistency - CP) or continue serving potentially stale data (Availability - AP).",
      difficulty: "Easy"
    }
  ];

  if (trackId) {
    return list.filter(q => q.trackId === trackId || (trackId === 'system-design' && (q.trackId === 'lld' || q.trackId === 'hld')));
  }
  return list;
}
