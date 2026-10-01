---
id: "java-memory-model-happens-before"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Synchronization"
title: "Java Memory Model (JMM), Happens-Before & Volatile"
slug: "java-memory-model-happens-before"
summary: "Master the Java Memory Model: Hardware CPU caches (L1/L2/L3), instruction reordering, memory barriers, the 8 Happens-Before consistency rules, and precise volatile read/write semantics."
eli10: "Imagine you write a note on your desk, but don't post it on the community whiteboard. Other people won't see your note until you publish it! Volatile forces Java to immediately write changes to the shared whiteboard so every thread sees the truth instantly."
mentalModel: "The JMM defines how and when changes made by one thread to shared memory become visible to other threads, formalizing visibility and ordering guarantees via Happens-Before relationships."
difficulty: "Advanced"
estimatedMinutes: 30
tags: ["JMM", "Volatile", "Happens-Before", "Memory Barriers", "Cache Coherence", "Instruction Reordering"]
animationType: "synchronization"
codeSnippet:
  language: "java"
  explanation: "Safe double-checked locking singleton with volatile memory barrier preventing publication leaks."
  code: |
    public class SafeDoubleCheckedLockingSingleton {
        // volatile prevents instruction reordering during instance instantiation
        private static volatile SafeDoubleCheckedLockingSingleton instance;

        private final String configurationData;

        private SafeDoubleCheckedLockingSingleton() {
            // Expensive initialization
            this.configurationData = "Cluster-Config-Payload-v2";
        }

        public static SafeDoubleCheckedLockingSingleton getInstance() {
            if (instance == null) { // 1st Check (no lock overhead)
                synchronized (SafeDoubleCheckedLockingSingleton.class) {
                    if (instance == null) { // 2nd Check (under mutual exclusion)
                        instance = new SafeDoubleCheckedLockingSingleton();
                    }
                }
            }
            return instance;
        }

        public String getConfigurationData() { return configurationData; }
    }
---

# Java Memory Model (JMM), Happens-Before & Volatile

---

## 1. The Hardware Concurrency Problem

Modern CPUs execute billions of instructions per second and use multi-level hardware caches:

```mermaid
graph TD
    subgraph CPU Socket 0
        Core1[CPU Core 1] --> L1a[L1 Cache] --> L2a[L2 Cache]
    end
    subgraph CPU Socket 1
        Core2[CPU Core 2] --> L1b[L1 Cache] --> L2b[L2 Cache]
    end
    L2a --> L3[Shared L3 Cache]
    L2b --> L3
    L3 --> RAM[Main Memory / RAM]
```

### The Three Fundamental Hazards:
1. **Visibility Problem:** Changes written to Core 1's L1 cache might not be flushed to RAM before Core 2 reads RAM.
2. **Instruction Reordering:** Compilers and Out-of-Order CPUs reorder independent bytecode instructions to optimize CPU pipelining.
3. **Atomicity Problem:** 64-bit primitive operations (`long`, `double`) can be split into two 32-bit operations on older 32-bit hardware.

---

## 2. What `volatile` Actually Guarantees

In Java, declaring a field `volatile` provides two critical guarantees:
1. **Visibility Guarantee:** Any write to a `volatile` variable is immediately flushed to main memory. Any read of a `volatile` variable is always fetched from main memory, bypassing stale CPU caches.
2. **Ordering Guarantee (Memory Barriers):** The compiler and CPU are forbidden from reordering instructions across volatile read/write boundaries by inserting hardware memory barriers:
   - **StoreStore & StoreLoad Barrier** before and after volatile write.
   - **LoadLoad & LoadStore Barrier** after volatile read.

> [!CAUTION]
> **`volatile` does NOT guarantee atomicity!**
> Operations like `count++` consist of 3 distinct bytecode operations: `getfield`, `iadd`, `putfield`. Two threads calling `count++` on a volatile integer will still experience lost updates. Use `AtomicInteger` for atomicity.

---

## 3. The 8 Happens-Before Rules in JMM

If action $A$ **Happens-Before** action $B$ ($A \xrightarrow{hb} B$), then memory changes performed by $A$ are guaranteed to be visible to $B$, and $A$ is ordered before $B$.

1. **Program Order Rule:** Each action in a single thread happens-before every subsequent action in that same thread.
2. **Monitor Lock Rule:** An `unlock()` on a monitor/lock happens-before every subsequent `lock()` on the same monitor.
3. **Volatile Variable Rule:** A write to a `volatile` field happens-before every subsequent read of that same `volatile` field.
4. **Thread Start Rule:** A call to `Thread.start()` happens-before any action in the started thread.
5. **Thread Termination Rule:** Any action in a thread happens-before any other thread detects that thread has terminated (via `t.join()` or `t.isAlive() == false`).
6. **Interruption Rule:** A thread calling `interrupt()` on another thread happens-before the interrupted thread discovers the interruption (via `Thread.interrupted()`).
7. **Finalizer Rule:** The end of an object's constructor happens-before the start of its finalizer.
8. **Transitivity Rule:** If $A \xrightarrow{hb} B$ and $B \xrightarrow{hb} C$, then $A \xrightarrow{hb} C$.

---

## 4. Why Without `volatile`, Double-Checked Locking is Broken

When executing `instance = new Singleton()`:
1. Allocate heap memory for object.
2. Run constructor to initialize fields.
3. Assign memory address to `instance` variable.

Under CPU instruction reordering, step 3 can execute **before** step 2!
Another thread executing the 1st check (`if (instance != null)`) sees a non-null instance and consumes **half-initialized garbage memory**, crashing the application. Declaring `volatile instance` creates a memory fence preventing step 3 from reordering before step 2.
