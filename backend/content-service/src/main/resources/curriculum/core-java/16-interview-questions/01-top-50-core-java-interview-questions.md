---
id: "java-core-interview-questions-top50"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Interview Questions"
title: "Top 50 Core Java Interview Questions & Answers"
slug: "java-core-interview-questions-top50"
summary: "Master the Top 50 most frequently asked Core Java interview questions across FAANG and Tier-1 tech firms: OOPs, JVM Memory, String Pool, Multithreading, Collections HashMap internals, Exception Handling, and Java 8 Streams."
eli10: "A curated ultimate cheat sheet of the top 50 Core Java questions asked in technical interviews, with crisp explanations and code snippets!"
mentalModel: "Comprehensive categorization of Core Java interview questions by architectural domains: OOPs, Concurrency, Memory Model, Collections, and Modern Features."
difficulty: "Advanced"
estimatedMinutes: 35
tags: ["Interview Questions", "Core Java", "FAANG", "HashMap", "Multithreading", "OOPs", "JVM Memory"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Core Java interview snippet: String pool, HashMap contract, and volatile visibility."
  code: |
    public class CoreJavaInterviewSnippets {
        public static void main(String[] args) {
            // 1. String Pool equality
            String s1 = "Java";
            String s2 = new String("Java").intern();
            System.out.println("s1 == s2: " + (s1 == s2)); // true

            // 2. Autoboxing caching (-128 to 127)
            Integer a = 127, b = 127;
            Integer c = 128, d = 128;
            System.out.println("a == b (127 cached): " + (a == b)); // true
            System.out.println("c == d (128 heap):   " + (c == d)); // false
        }
    }
---

# 🏆 Top 50 Core Java Interview Questions & Answers

---

## 🏛️ 1. OOPs & Core Fundamentals

### Q1: Why is Java not purely Object-Oriented?
Because Java supports **8 primitive data types** (`byte`, `short`, `int`, `long`, `float`, `double`, `boolean`, `char`) which are stored directly on the stack as raw binary values without being wrapped as objects.

### Q2: What is the difference between Abstract Class and Interface (Java 8+)?
- An **Abstract Class** can have instance state (non-static, non-final fields) and constructors. A class can extend only **one** abstract class (single inheritance).
- An **Interface** can only have `public static final` constants. A class can implement **multiple** interfaces. Since Java 8, interfaces can contain `default` and `static` methods. Since Java 9, they can contain `private` helper methods.

### Q3: What is the Diamond Problem and how does Java 8 resolve it?
If class `C` implements interfaces `A` and `B`, and both provide a `default void display()`, a compiler error occurs. Class `C` must explicitly override `display()` and specify: `A.super.display();` or `B.super.display();`.

---

## 🧵 2. Strings & Memory Management

### Q4: Why is String immutable in Java?
1. **String Constant Pool (SCP)** caching saves memory.
2. **Thread-safety** without synchronization.
3. **Security** for classloading, database URLs, and network ports.
4. **Cached Hashcode** for fast `HashMap` lookups.

### Q5: What is the difference between `==` and `.equals()`?
- **`==`** compares **memory addresses (references)**.
- **`.equals()`** is a method in `Object` (default compares references) which classes like `String` override to compare **logical content / value equality**.

---

## 📚 3. Collections Framework

### Q6: How does `HashMap` work internally in Java 8+?
`HashMap` stores data in an array of `Node<K,V>[]` buckets. The bucket index is computed as `(n - 1) & hash(key.hashCode())`.
- Collisions form a linked list.
- When a bucket reaches **8 nodes** and total map capacity $\ge 64$, the bucket is **treeified into a Red-Black Tree**, improving worst-case search from $O(n)$ to $O(\log n)$.

### Q7: What is the contract between `equals()` and `hashCode()`?
1. If two objects are equal according to `equals()`, their `hashCode()` **MUST** be identical.
2. If two objects have the same `hashCode()`, they are **NOT** necessarily equal (hash collision).
3. If you override `equals()`, you **MUST** override `hashCode()`.

---

## ⚡ 4. Multithreading & Concurrency

### Q8: What is the difference between `wait()` and `sleep()`?
- **`Thread.sleep(ms)`**: Keeps the intrinsic monitor lock and puts current thread to sleep.
- **`obj.wait()`**: **Releases the monitor lock** and moves thread to waiting queue until `notify()`/`notifyAll()` is called. Must be called inside a `synchronized` context.

### Q9: What is the `volatile` keyword?
Guarantees **Visibility** in the Java Memory Model (JMM). It forces all reads and writes directly from/to Main Memory (RAM), bypassing CPU L1/L2 core caches, preventing stale reads.

---

## 🛡️ 5. Exception Handling

### Q10: What is the difference between `throw` and `throws`?
- **`throw`**: An action statement inside a method body that instantiates and throws a single exception object at runtime (`throw new IOException();`).
- **`throws`**: A clause in a method signature that declares potential checked exceptions to callers (`void read() throws IOException, SQLException`).
