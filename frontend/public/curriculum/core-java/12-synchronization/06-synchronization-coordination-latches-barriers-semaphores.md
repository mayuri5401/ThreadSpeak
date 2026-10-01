---
id: "java-latches-barriers-semaphores"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Synchronization"
title: "Concurrency Synchronizers: CountDownLatch, CyclicBarrier, Semaphore & Phaser"
slug: "java-latches-barriers-semaphores"
summary: "Master Java Thread Coordination Primitives: One-shot CountDownLatch, reusable CyclicBarrier with barrier actions, Semaphore permit management for rate-limiting, and multi-phase dynamic Phasers."
eli10: "A CountDownLatch is like a rocket launch countdown (3, 2, 1, Liftoff!). A CyclicBarrier is like a tour group meeting at a tourist spot before moving together to the next location. A Semaphore is like a parking lot with 10 parking spots."
mentalModel: "Synchronizers in java.util.concurrent provide high-level thread rendezvous, permit bounding, and phase synchronization built atop the AbstractQueuedSynchronizer (AQS) framework."
difficulty: "Advanced"
estimatedMinutes: 30
tags: ["CountDownLatch", "CyclicBarrier", "Semaphore", "Phaser", "AQS", "Rate Limiter", "Thread Coordination"]
animationType: "synchronization"
codeSnippet:
  language: "java"
  explanation: "Microservice health check orchestrator using CountDownLatch and Semaphore rate-limiter."
  code: |
    import java.util.concurrent.*;

    public class SynchronizersOrchestrator {
        public static void main(String[] args) throws InterruptedException {
            int totalServices = 3;
            CountDownLatch readyLatch = new CountDownLatch(totalServices);
            
            // Limit concurrent outbound network probes to 2
            Semaphore outboundRateLimiter = new Semaphore(2);

            String[] services = {"Database-Cluster", "Kafka-Broker", "Redis-Cache"};

            for (String service : services) {
                new Thread(() -> {
                    try {
                        outboundRateLimiter.acquire(); // Acquire permit
                        System.out.println("🔍 Checking health for: " + service);
                        Thread.sleep(400); // Probe ping
                        System.out.println("✅ " + service + " is HEALTHY");
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    } finally {
                        outboundRateLimiter.release(); // Return permit
                        readyLatch.countDown(); // Decrement countdown latch
                    }
                }).start();
            }

            // Master thread awaits all subsystems
            readyLatch.await(3, TimeUnit.SECONDS);
            System.out.println("🚀 All microservices operational. API Gateway ready to accept traffic!");
        }
    }
---

# Concurrency Synchronizers: CountDownLatch, CyclicBarrier, Semaphore & Phaser

---

## 1. The Synchronizer Landscape at a Glance

Java provides four primary synchronizers built on AbstractQueuedSynchronizer (AQS):

```mermaid
graph TD
    A[AQS Framework] --> B[CountDownLatch: One-shot Gate]
    A --> C[CyclicBarrier: Reusable Group Meeting]
    A --> D[Semaphore: Bounded Resource Permits]
    A --> E[Phaser: Dynamic Multi-Phase Coordination]
```

---

## 2. CountDownLatch vs CyclicBarrier

| Dimension | `CountDownLatch` | `CyclicBarrier` |
| :--- | :--- | :--- |
| **Reusability** | ❌ **One-Shot Only** (Cannot be reset) | ✅ **Reusable** (Resets automatically after trip) |
| **Who Waits?** | Usually 1 master thread waits for $N$ worker events | All $N$ threads wait for each other at the barrier |
| **Decremented By** | `latch.countDown()` (Can be called by non-threads) | `barrier.await()` (Decrements and waits simultaneously) |
| **Barrier Action** | ❌ None | ✅ Optional runnable action executed when barrier trips |
| **Primary Use Case** | Application startup, waiting for initializations | Multi-threaded simulation rounds, parallel matrix multiply |

---

## 3. CyclicBarrier In Action (Multi-Phase Simulation)

```java
public class MultiplayerGameServer {
    public static void main(String[] args) {
        int players = 4;
        
        // CyclicBarrier triggers a barrier action whenever 4 players check in
        CyclicBarrier roundBarrier = new CyclicBarrier(players, () -> {
            System.out.println("🎮 All players ready! Starting next game round...\n");
        });

        for (int i = 1; i <= players; i++) {
            final int playerId = i;
            new Thread(() -> {
                try {
                    for (int round = 1; round <= 3; round++) {
                        System.out.println("Player #" + playerId + " calculating moves for Round " + round);
                        Thread.sleep((long) (Math.random() * 500));
                        
                        // Wait for all teammates before next round begins
                        roundBarrier.await();
                    }
                } catch (Exception e) {
                    Thread.currentThread().interrupt();
                }
            }).start();
        }
    }
}
```

---

## 4. `Semaphore` (Permit Allocation & Rate Limiting)

A `Semaphore` maintains a set of permits:
- `acquire()` takes a permit, blocking if none are available.
- `release()` returns a permit to the pool.

### Use Cases:
1. **Connection Pooling**: Restricting concurrent JDBC connections to max pool size.
2. **API Rate Limiting**: Capping simultaneous outbound downstream HTTP calls.
3. **Bounded Semaphore as Mutex**: `new Semaphore(1)` acts as a binary mutual exclusion lock.

---

## 5. `Phaser` (Advanced Dynamic Generation Coordination)

`Phaser` is a flexible alternative to `CyclicBarrier` and `CountDownLatch`:
- **Dynamic Party Registration**: Threads can register (`register()`) or deregister (`arriveAndDeregister()`) at runtime.
- **Hierarchical Phasers**: Can form trees to reduce contention on massive thread counts.
- **Phase Tracking**: Tracks current phase number with `getPhase()`.
