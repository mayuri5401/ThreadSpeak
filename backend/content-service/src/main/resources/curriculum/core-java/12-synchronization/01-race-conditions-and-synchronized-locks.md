---
id: "java-synchronization-locks"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Synchronization"
title: "Race Conditions & synchronized Keyword"
slug: "java-synchronization-locks"
summary: "Master Thread Synchronization in Java: Race conditions, critical sections, intrinsic object monitors, synchronized methods vs blocks, and class-level static locking."
eli10: "If two people try to edit the same shared notebook at the exact same second, words get jumbled. The synchronized keyword is like putting a lock on the door: only one person can enter and write at a time!"
mentalModel: "Every Object in Java has an Intrinsic Monitor Lock. When a thread enters a synchronized method/block, it acquires the monitor; other threads are blocked until the lock is released."
difficulty: "Intermediate"
estimatedMinutes: 20
tags: ["Synchronization", "Race Condition", "Thread Safety", "Intrinsic Lock", "Monitor", "Critical Section"]
animationType: "thread-concurrency"
codeSnippet:
  language: "java"
  explanation: "Demonstrating how synchronized prevents race conditions on shared counter."
  code: |
    class BankAccount {
        private int balance = 0;

        // Synchronized method guarantees mutual exclusion
        public synchronized void deposit(int amount) {
            balance += amount;
        }

        public int getBalance() { return balance; }
    }

    public class SynchronizationDemo {
        public static void main(String[] args) throws InterruptedException {
            BankAccount account = new BankAccount();

            // Spawn 2 threads each depositing $1, 1000 times
            Thread t1 = new Thread(() -> {
                for (int i = 0; i < 1000; i++) account.deposit(1);
            });
            Thread t2 = new Thread(() -> {
                for (int i = 0; i < 1000; i++) account.deposit(1);
            });

            t1.start();
            t2.start();
            t1.join();
            t2.join();

            System.out.println("Expected Balance: 2000");
            System.out.println("Actual Balance:   " + account.getBalance());
        }
    }
---

# 🔒 Race Conditions & synchronized Keyword

---

## 📖 1. What is a Race Condition?

A **race condition** occurs when two or more threads attempt to read and write **shared mutable state** concurrently, and the final outcome depends on the non-deterministic order of thread scheduling.

```mermaid
sequenceDiagram
    autonumber
    actor Thread1 as Thread A
    actor Thread2 as Thread B
    participant Counter as Shared counter = 0

    Thread1->>Counter: 1. Read counter (0)
    Thread2->>Counter: 2. Read counter (0)
    Thread1->>Counter: 3. Writes 0 + 1 = 1
    Thread2->>Counter: 4. Writes 0 + 1 = 1 (Overwrites Thread A's update!)
    Note over Counter: 💥 Lost Update Bug! Expected 2, but actual is 1!
```

---

## 🔑 2. Synchronized Methods vs Synchronized Blocks

```java
// 1. Synchronized Method (Locks on 'this' instance)
public synchronized void withdraw(int amount) {
    this.balance -= amount;
}

// 2. Synchronized Block (Finer granularity - Recommended!)
public void transfer(int amount) {
    // Non-critical operations (logging, validation) happen without lock
    validateInput(amount);

    synchronized(this) {
        this.balance -= amount;
    }
}

// 3. Static Synchronized Method (Locks on Class token: BankAccount.class)
public static synchronized void printTotalAccounts() {
    System.out.println(totalAccounts);
}
```
