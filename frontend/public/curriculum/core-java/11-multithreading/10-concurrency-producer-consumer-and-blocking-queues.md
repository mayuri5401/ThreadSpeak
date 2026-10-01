---
id: "java-producer-consumer-blockingqueues"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Multithreading"
title: "Producer-Consumer Pattern & Bounded Blocking Queues"
slug: "java-producer-consumer-blockingqueues"
summary: "Build high-throughput Producer-Consumer architectures in Java: wait/notifyAll vs ReentrantLock with dual Conditions (notFull, notEmpty), bounded buffer sizing, poison pills, and backpressure management."
eli10: "Imagine a bakery conveyor belt. The baker (Producer) bakes cakes and puts them on the belt. The customer (Consumer) picks cakes off the belt. If the belt is full, the baker waits. If the belt is empty, the customer waits!"
mentalModel: "Producer-Consumer decouples data generation rate from consumption rate through a synchronized bounded queue buffer that signals condition variables when capacity changes."
difficulty: "Advanced"
estimatedMinutes: 30
tags: ["Producer-Consumer", "BlockingQueue", "Condition", "Backpressure", "Thread Safety", "Architecture"]
animationType: "multithreading"
codeSnippet:
  language: "java"
  explanation: "Implementing a custom high-performance Bounded Blocking Queue using ReentrantLock and dual Conditions."
  code: |
    import java.util.concurrent.locks.Condition;
    import java.util.concurrent.locks.ReentrantLock;

    public class CustomBoundedBlockingQueue<T> {
        private final Object[] items;
        private int putIndex, takeIndex, count;

        private final ReentrantLock lock = new ReentrantLock();
        private final Condition notFull = lock.newCondition();
        private final Condition notEmpty = lock.newCondition();

        public CustomBoundedBlockingQueue(int capacity) {
            if (capacity <= 0) throw new IllegalArgumentException();
            this.items = new Object[capacity];
        }

        public void put(T x) throws InterruptedException {
            lock.lock();
            try {
                // Must use while loop to protect against spurious wakeups
                while (count == items.length) {
                    notFull.await(); // Producer thread sleeps until space opens
                }
                items[putIndex] = x;
                if (++putIndex == items.length) putIndex = 0;
                count++;
                notEmpty.signal(); // Wake up waiting consumers
            } finally {
                lock.unlock();
            }
        }

        @SuppressWarnings("unchecked")
        public T take() throws InterruptedException {
            lock.lock();
            try {
                while (count == 0) {
                    notEmpty.await(); // Consumer thread sleeps until item arrives
                }
                T x = (T) items[takeIndex];
                items[takeIndex] = null; // Prevent memory leak
                if (++takeIndex == items.length) takeIndex = 0;
                count--;
                notFull.signal(); // Wake up waiting producers
                return x;
            } finally {
                lock.unlock();
            }
        }

        public int size() {
            lock.lock();
            try { return count; } finally { lock.unlock(); }
        }
    }
---

# Producer-Consumer Pattern & Bounded Blocking Queues

---

## 1. Why Producer-Consumer is Fundamental to Distributed Systems

In real-world software engineering, systems rarely produce and consume data at identical velocities:
- **Traffic Spikes**: Web servers receive bursts of 10,000 HTTP requests/sec during flash sales.
- **Slow Downstream**: Database writes or payment gateway calls take 150ms per transaction.

Without a decoupled bounded queue buffer, the system either crashes from memory exhaustion or drops incoming traffic.

```mermaid
sequenceDiagram
    autonumber
    participant P as Producer Threads
    participant Q as Bounded Blocking Queue [Capacity: 5]
    participant C as Consumer Workers

    P->>Q: put(Message #1, #2, #3, #4, #5)
    Note over Q: Queue is FULL (count == 5)
    P->>Q: put(Message #6) -> Producer sleeps on notFull.await()
    C->>Q: take() -> Consumes Message #1
    Q-->>P: notFull.signal() -> Producer wakes up and enqueues #6
    C->>Q: take() -> Processes #2, #3, #4, #5, #6
    Note over Q: Queue is EMPTY (count == 0)
    C->>Q: take() -> Consumer sleeps on notEmpty.await()
```

---

## 2. Why `while` Loops are Mandatory (Spurious Wakeups)

When waiting on a condition (`obj.wait()` or `condition.await()`), you **MUST ALWAYS** check the condition inside a `while` loop, never an `if` statement:

```java
// ❌ WRONG: Vulnerable to Spurious Wakeup & Race Conditions
if (count == items.length) {
    notFull.await();
}

// ✅ CORRECT: Re-checks condition immediately upon waking
while (count == items.length) {
    notFull.await();
}
```

### Reasons:
1. **Spurious Wakeup**: Operating systems can wake waiting threads without any `signal()` or `notify()` call.
2. **Stolen Signal**: In a multi-consumer setup, `signal()` might wake Thread A, but Thread B swoops in first and takes the item, leaving the queue empty again when Thread A finally acquires the lock.

---

## 3. Graceful Poison Pill Termination

How does a producer tell consumers to finish processing and shut down cleanly?
Use a sentinel **Poison Pill** object:

```java
public class PoisonPillConsumerService {
    private static final String POISON_PILL = "STOP_CONSUMING_IMMEDIATELY_SENTINEL";
    private final BlockingQueue<String> queue = new ArrayBlockingQueue<>(100);

    public void start() {
        Runnable consumer = () -> {
            try {
                while (true) {
                    String task = queue.take();
                    if (task == POISON_PILL) {
                        System.out.println("🛑 Received Poison Pill. Shutting down consumer worker gracefully.");
                        break;
                    }
                    processTask(task);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        };

        new Thread(consumer).start();
    }

    public void stop(int numWorkers) {
        // Enqueue one poison pill per worker thread
        for (int i = 0; i < numWorkers; i++) {
            queue.offer(POISON_PILL);
        }
    }

    private void processTask(String task) {
        System.out.println("Processing: " + task);
    }
}
```
