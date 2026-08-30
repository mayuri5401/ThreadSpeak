---
id: "java-multithreading-virtual-threads"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Multithreading"
title: "ExecutorService & Java 21 Virtual Threads (Project Loom)"
slug: "java-multithreading-virtual-threads"
summary: "Master Thread Pools with ExecutorService and explore Java 21 Virtual Threads (Project Loom): Running millions of concurrent lightweight tasks without OS thread exhaustion."
eli10: "Platform threads are heavy 18-wheeler trucks (you can only run ~2,000 before your computer crashes). Virtual threads are like light digital drones (you can easily fly 1,000,000 at the exact same time)!"
mentalModel: "Virtual threads mount continuations onto a small pool of Carrier OS threads. When a virtual thread blocks on I/O, it unmounts from its carrier, leaving the OS thread free to serve other tasks."
difficulty: "Advanced"
estimatedMinutes: 20
tags: ["Virtual Threads", "Project Loom", "ExecutorService", "Thread Pools", "Java 21"]
animationType: "thread-concurrency"
codeSnippet:
  language: "java"
  explanation: "Launching 100,000 virtual threads concurrently in Java 21."
  code: |
    import java.util.concurrent.Executors;
    import java.util.stream.IntStream;

    public class VirtualThreadsMastery {
        public static void main(String[] args) {
            long startTime = System.currentTimeMillis();

            // Java 21 Virtual Thread Per Task Executor with try-with-resources
            try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
                IntStream.range(0, 10_000).forEach(i -> {
                    executor.submit(() -> {
                        Thread.sleep(100); // Non-blocking simulation
                        return i;
                    });
                });
            } // Auto-waits for all 10,000 virtual threads to complete!

            long endTime = System.currentTimeMillis();
            System.out.println("✅ Successfully executed 10,000 Virtual Threads in: " + (endTime - startTime) + " ms!");
        }
    }
---

# 🚀 ExecutorService & Java 21 Virtual Threads (Project Loom)

---

## 📖 1. Platform Threads vs Java 21 Virtual Threads

| Metric | Traditional Platform Thread | Java 21 Virtual Thread |
| :--- | :--- | :--- |
| **Mapping** | 1:1 with OS Kernel Thread | $M:N$ mounted dynamically onto Carrier Threads |
| **Stack Memory** | ~1 MB (pre-allocated) | ~A few Kilobytes (dynamically resizeable in Heap) |
| **Creation Cost** | Expensive (~1-2 ms syscall) | Extremely cheap (~1 microsecond) |
| **Concurrency Ceiling** | Thousands before `OutOfMemoryError` | **Millions concurrently!** |
| **Blocking I/O Handling** | Blocks OS thread completely | Unmounts continuation; frees carrier thread |
