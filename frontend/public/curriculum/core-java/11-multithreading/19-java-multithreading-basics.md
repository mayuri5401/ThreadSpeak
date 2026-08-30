---
id: "java-multithreading-core"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Multithreading"
title: "Multithreading: Lifecycle, Runnable & Executors"
slug: "java-multithreading-core"
summary: "Master concurrency fundamentals: Thread lifecycle states (NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED), extending Thread vs implementing Runnable, and ExecutorService thread pooling."
eli10: "Multithreading is having multiple chefs working in the same restaurant kitchen at the same time, sharing the pantry to prepare dishes in parallel."
mentalModel: "Process (Memory Space) ➔ Multiple Threads (Own Program Counter & Stack, Shared Heap Memory)."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["Multithreading", "Thread", "Runnable", "Thread Lifecycle", "ExecutorService"]
animationType: "multithreading"
codeSnippet:
  language: "java"
  explanation: "Creating and launching concurrent threads in Java."
  code: |
    public class MultithreadDemo {
        public static void main(String[] args) {
            Thread t1 = new Thread(() -> {
                System.out.println("⚡ Thread 1 running: " + Thread.currentThread().getName());
            });
            
            Thread t2 = new Thread(() -> {
                System.out.println("🚀 Thread 2 running: " + Thread.currentThread().getName());
            });
            
            t1.start();
            t2.start();
        }
    }
---

# ⚡ Multithreading: Concurrent Thread Execution

Multithreading in Java is a process of executing multiple threads simultaneously. A thread is a lightweight sub-process, the smallest unit of processing.
