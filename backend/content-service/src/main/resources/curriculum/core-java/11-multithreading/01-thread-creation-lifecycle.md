---
id: "java-multithreading-lifecycle"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Multithreading"
title: "Multithreading: Thread Creation & Lifecycle States"
slug: "java-multithreading-lifecycle"
summary: "Master Java Multithreading: Extending Thread class vs implementing Runnable vs Callable, Thread lifecycle states (NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED), sleep, join, and daemon threads."
eli10: "Multithreading is like hiring 4 chefs in a restaurant instead of 1. Each chef works on a different customer order at the exact same time!"
mentalModel: "Threads are independent execution paths sharing the same Heap memory but possessing their own private Stack frames and Program Counter (PC) registers."
difficulty: "Intermediate"
estimatedMinutes: 25
tags: ["Multithreading", "Thread", "Runnable", "Thread Lifecycle", "Join", "Sleep", "Daemon"]
animationType: "multithreading"
codeSnippet:
  language: "java"
  explanation: "Creating threads via Runnable and managing execution with start() and join()."
  code: |
    class WorkerTask implements Runnable {
        private final String taskName;

        public WorkerTask(String name) { this.taskName = name; }

        @Override
        public void run() {
            System.out.println("⚡ " + taskName + " running on thread: " + Thread.currentThread().getName());
            try {
                Thread.sleep(500); // Simulate work
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println("✅ " + taskName + " completed.");
        }
    }

    public class ThreadDemo {
        public static void main(String[] args) throws InterruptedException {
            Thread t1 = new Thread(new WorkerTask("Order-Processing"));
            Thread t2 = new Thread(new WorkerTask("Payment-Validation"));

            t1.start();
            t2.start();

            // Wait for both threads to finish
            t1.join();
            t2.join();

            System.out.println("🏁 All background tasks finished. Main resuming.");
        }
    }
---

# ⚡ Multithreading: Thread Creation & Lifecycle States

---

## 📖 1. The 6 Thread Lifecycle States in Java

Every thread in the JVM transitions through the states defined in **`Thread.State`**:

```mermaid
stateDiagram-v2
    [*] --> NEW: new Thread()
    NEW --> RUNNABLE: t.start()
    RUNNABLE --> BLOCKED: Waiting to acquire synchronized lock
    BLOCKED --> RUNNABLE: Lock acquired
    RUNNABLE --> WAITING: obj.wait() / t.join()
    WAITING --> RUNNABLE: obj.notify() / notifyAll()
    RUNNABLE --> TIMED_WAITING: Thread.sleep(ms) / wait(ms)
    TIMED_WAITING --> RUNNABLE: Timeout expires
    RUNNABLE --> TERMINATED: run() finishes or uncaught exception
    TERMINATED --> [*]
```

---

## 🏗️ 2. Thread vs Runnable vs Callable

| Approach | Inheritance Tradeoff | Returns Result? | Throws Checked Exception? |
| :--- | :--- | :--- | :--- |
| **`extends Thread`** | ❌ Wastes single inheritance | ❌ No (`void run()`) | ❌ No |
| **`implements Runnable`** | ✅ Class can still extend others | ❌ No (`void run()`) | ❌ No |
| **`implements Callable<V>`** | ✅ Class can still extend others | ✅ **Yes (`V call()`)** | ✅ **Yes** |
