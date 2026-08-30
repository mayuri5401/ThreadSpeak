---
id: "java-strings-stringbuilder"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Strings"
title: "StringBuilder class"
slug: "java-strings-stringbuilder"
summary: "Master java.lang.StringBuilder: High-performance, mutable, non-synchronized string manipulation class introduced in Java 5. Explore single-threaded speed advantages, capacity management, and compiler string concatenation optimization."
eli10: "StringBuilder is like StringBuffer without any door lock. Because it doesn't waste time locking and unlocking doors, it is super fast and perfect for 99% of single-threaded string building tasks!"
mentalModel: "StringBuilder provides an identical API to StringBuffer (append, insert, reverse, capacity), but omits the synchronized keyword on its methods. This eliminates thread lock contention overhead."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["StringBuilder", "Mutable Strings", "High Performance", "Java 5", "Non-Synchronized"]
animationType: "stringbuilder-class"
codeSnippet:
  language: "java"
  explanation: "Fast string building in loops using StringBuilder vs slow string concatenation."
  code: |
    public class StringBuilderDemo {
        public static void main(String[] args) {
            // Fast loop concatenation using StringBuilder
            StringBuilder sb = new StringBuilder();
            
            for (int i = 1; i <= 5; i++) {
                sb.append("Item-").append(i).append(" ");
            }
            
            System.out.println("Result: " + sb.toString());
            
            // Method chaining pattern
            sb.reverse().append(" [COMPLETED]");
            System.out.println("Chained: " + sb.toString());
        }
    }
---

# ⚡ StringBuilder Class in Java (`java.lang.StringBuilder`)

---

## 📌 1. What is `StringBuilder`?

`java.lang.StringBuilder` was introduced in **Java 5** as a high-performance, **non-synchronized replacement** for `StringBuffer`.

Like `StringBuffer`, it represents a **mutable sequence of characters** that allows in-place character modifications without allocating new objects on every operation.

---

## 🚀 2. Why Was `StringBuilder` Introduced in Java 5?

In over 95% of real-world software applications, string building operations (such as parsing JSON, generating SQL queries, formatting CSV files, or building HTML templates) occur **within a single thread** (e.g. inside a local method frame).

- In `StringBuffer`, every method invocation acquired a synchronized monitor lock, wasting CPU cycles on unnecessary locking.
- `StringBuilder` removed the `synchronized` modifier from all methods, offering **up to 2x - 3x faster execution speeds** for single-threaded tasks!

---

## 🔄 3. How the Java Compiler Uses `StringBuilder`

Whenever you use the `+` operator to concatenate strings in Java (from Java 5 to Java 8), the Java compiler automatically translates your code into a `StringBuilder` under the hood!

```java
// What you write in your source code:
String result = "Hello " + name + ", score: " + score;

// How the Java Compiler (javac) optimizes it:
String result = new StringBuilder()
                    .append("Hello ")
                    .append(name)
                    .append(", score: ")
                    .append(score)
                    .toString();
```

> [!CAUTION]
> **Warning: Avoid `+` Concatenation Inside Loops!**
> Using `str += i` inside a loop of $N$ iterations instantiates $N$ separate `StringBuilder` objects and $N$ intermediate `String` objects, degrading performance to $O(N^2)$. Always instantiate a single `StringBuilder` **outside the loop**!

```java
// ❌ BAD: O(N^2) time & huge Garbage Collection churn
String s = "";
for (int i = 0; i < 10000; i++) {
    s += i; // Creates 10,000 StringBuilders and Strings!
}

// ✅ GOOD: O(N) time with zero garbage churn
StringBuilder sb = new StringBuilder(10000);
for (int i = 0; i < 10000; i++) {
    sb.append(i);
}
String s = sb.toString();
```

---

## 🛠️ 4. Core Methods Summary

`StringBuilder` shares the exact same method signatures as `StringBuffer`:
- `append(data)` — appends data to buffer.
- `insert(offset, data)` — inserts at 0-based offset.
- `delete(start, end)` — deletes character range `[start, end)`.
- `reverse()` — reverses characters in-place.
- `capacity()` — returns allocated buffer capacity.
- `toString()` — converts mutable buffer to immutable `String`.
