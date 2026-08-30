---
id: "java-strings-memory-scp"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Strings"
title: "String Memory Management (SCP)"
slug: "java-strings-memory-scp"
summary: "Master String Constant Pool (SCP) memory management in the JVM Heap: Literal deduplication, new String() object allocation, == vs equals(), and the intern() method."
eli10: "The String Constant Pool (SCP) is like a shared pantry in the JVM. When two people ask for 'Apple', Java doesn't buy two apples—it gives both people a pointer to the same single apple in the pantry to save memory!"
mentalModel: "SCP is a specialized hashtable (StringTable) residing inside the JVM Heap. String literals share existing SCP memory references. Calling .intern() returns the canonical reference from SCP."
difficulty: "Intermediate"
estimatedMinutes: 20
tags: ["String Constant Pool", "SCP", "intern()", "JVM Memory", "Heap Memory", "StringTable"]
animationType: "string-scp"
codeSnippet:
  language: "java"
  explanation: "Demonstrating String Constant Pool (SCP) reference pooling and intern() method."
  code: |
    public class StringScpMemoryDemo {
        public static void main(String[] args) {
            // 1. Literals: Stored in SCP (Shared reference)
            String s1 = "Java";
            String s2 = "Java";

            // 2. New Keyword: Stored in regular Heap (Separate reference)
            String s3 = new String("Java");

            System.out.println("s1 == s2 (Both in SCP):       " + (s1 == s2));      // true
            System.out.println("s1 == s3 (SCP vs Heap):       " + (s1 == s3));      // false
            System.out.println("s1.equals(s3) (Same Content): " + s1.equals(s3));  // true

            // 3. String Interning: Retrieves canonical SCP reference
            String s4 = s3.intern();
            System.out.println("s1 == s4 (After intern()):    " + (s1 == s4));      // true
        }
    }
---

# 🧠 String Memory Management & String Constant Pool (SCP)

---

## 📌 1. What is the String Constant Pool (SCP)?

The **String Constant Pool (SCP)**, also known as the **String Intern Pool**, is a dedicated memory region inside the **JVM Heap memory** designed specifically to optimize memory usage by caching unique String literal instances.

```mermaid
flowchart TD
    subgraph STACK["🥞 Stack Frame"]
        s1["String s1"]
        s2["String s2"]
        s3["String s3"]
    end

    subgraph HEAP["💾 JVM Heap Memory"]
        subgraph SCP["📦 String Constant Pool (SCP)"]
            poolObj["'Java' (Address: 0x100)"]
        end
        heapObj["String Object (Address: 0x500) -> value: 'Java'"]
    end

    s1 --> poolObj
    s2 --> poolObj
    s3 --> heapObj
    heapObj -.->|internal reference| poolObj
```

---

## ⚡ 2. How Java Allocates Strings in Memory

### Scenario A: String Literals (`String s = "Hello"`)
1. The JVM checks the SCP hashtable (`StringTable`) for `"Hello"`.
2. **If present**: The JVM returns the memory address of the existing SCP object.
3. **If absent**: The JVM creates a new String object inside the SCP and stores its reference.
4. **Result**: Maximum memory reuse. 1000 variables holding `"Hello"` point to a **single object** in memory.

---

### Scenario B: The `new` Keyword (`String s = new String("Hello")`)
1. The `new` operator **forces** the JVM to create a brand new `String` object in normal **Heap RAM** (outside SCP).
2. The literal parameter `"Hello"` ensures an object also exists inside the **SCP**.
3. **Total Objects Created**: **2 objects** (1 in Heap, 1 in SCP if not previously created).

---

## 🔍 3. The `intern()` Method

The `public native String intern()` method in `java.lang.String` allows manual pooling of Heap strings:
- When invoked on a String object, if the SCP already contains a string equal to this `String` object (determined by `.equals()`), the reference from the pool is returned.
- Otherwise, this `String` object is added to the pool and a reference to this `String` object is returned.

```java
String nonPool = new String("Spring"); // Heap object (e.g. 0x888)
String pooled = nonPool.intern();      // Fetches SCP reference (e.g. 0x111)

String literal = "Spring";             // Already in SCP (0x111)

System.out.println(nonPool == literal); // false (Heap vs SCP)
System.out.println(pooled == literal);  // true (Both point to 0x111 in SCP!)
```

---

## 📜 4. Evolution of SCP in JVM Architecture

```mermaid
graph LR
    subgraph Java6["Java 6 & Prior"]
        PG["PermGen (Fixed Size, OOM PermGen Space)"]
    end

    subgraph Java7Plus["Java 7, 8, 17, 21+"]
        HP["JVM Heap Memory (Eligible for Garbage Collection & Dynamic Resizing)"]
    end
```

1. **Java 6 and earlier**: SCP was located in **PermGen (Permanent Generation)** memory. PermGen had a fixed default size and was prone to `java.lang.OutOfMemoryError: PermGen space`.
2. **Java 7 to Java 21+**: Oracle moved the SCP directly into the **Main Heap Memory**.
   - **Advantage**: Strings in SCP can now be cleaned up by the **Garbage Collector (GC)** when no longer referenced, completely eliminating PermGen OOM errors!

---

## 💡 5. Best Practice Rule

> [!TIP]
> **Always prefer String Literals over `new String()`**
> `String s = "text";` saves memory by utilizing the String Constant Pool. `String s = new String("text");` creates unnecessary duplicate objects on the Heap.
