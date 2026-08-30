---
id: "java-synchronization-locks"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Synchronization"
title: "Synchronization: Monitors, volatile & Locks"
slug: "java-synchronization-locks"
summary: "Prevent race conditions, thread interference, and memory visibility issues using synchronized methods/blocks, JVM intrinsic object monitors, volatile variables, ReentrantLock, and deadlock prevention."
eli10: "Synchronization is a single key to the bathroom door. Only one person (thread) holding the key can enter at a time, preventing two people from entering simultaneously and causing chaos!"
mentalModel: "Object Header Mark Word Lock State (Biased ➔ Lightweight CAS ➔ Heavyweight OS Mutex Monitor)."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["Synchronization", "synchronized", "volatile", "Monitor Lock", "Deadlock", "ReentrantLock"]
animationType: "multithreading"
codeSnippet:
  language: "java"
  explanation: "Synchronized counter preventing race conditions across multiple threads."
  code: |
    class SafeCounter {
        private int count = 0;
        public synchronized void increment() {
            count++;
        }
        public synchronized int getCount() {
            return count;
        }
    }
    
    public class SyncDemo {
        public static void main(String[] args) throws InterruptedException {
            SafeCounter counter = new SafeCounter();
            Thread t1 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });
            Thread t2 = new Thread(() -> { for (int i = 0; i < 1000; i++) counter.increment(); });
            
            t1.start(); t2.start();
            t1.join(); t2.join();
            
            System.out.println("Final Thread-Safe Count: " + counter.getCount() + " (Expected: 2000)");
        }
    }
---

# 🔒 Synchronization: Thread Safety & Monitors

Synchronization in Java is the capability to control the access of multiple threads to any shared resource.
