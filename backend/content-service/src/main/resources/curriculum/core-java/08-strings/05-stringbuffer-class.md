---
id: "java-strings-stringbuffer"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Strings"
title: "StringBuffer class"
slug: "java-strings-stringbuffer"
summary: "Master java.lang.StringBuffer: A peer class of String providing mutable, thread-safe character sequences. Explore capacity growth formula (old*2 + 2), synchronization, and methods: append(), insert(), delete(), reverse()."
eli10: "If String is a stone carving that cannot be changed, StringBuffer is an editable whiteboard in a shared meeting room with a door lock (thread-safe synchronization) so only one person writes on the whiteboard at a time!"
mentalModel: "StringBuffer is a thread-safe, mutable sequence of characters. It pre-allocates an internal expandable buffer (default 16 chars). All mutating methods are synchronized to prevent concurrent race conditions."
difficulty: "Intermediate"
estimatedMinutes: 20
tags: ["StringBuffer", "Thread Safety", "Synchronized", "Mutable Strings", "Capacity Growth"]
animationType: "stringbuffer-class"
codeSnippet:
  language: "java"
  explanation: "Demonstration of StringBuffer mutability, dynamic capacity growth, and in-place manipulation."
  code: |
    public class StringBufferDemo {
        public static void main(String[] args) {
            // 1. Default constructor initializes with 16-character capacity
            StringBuffer sb = new StringBuffer();
            System.out.println("Initial Capacity: " + sb.capacity() + " | Length: " + sb.length());

            // 2. In-place appending (Mutates existing object, no new Heap object created!)
            sb.append("Hello");
            sb.append(" World");
            System.out.println("After Append:     " + sb.toString());

            // 3. In-place insertion & replacement
            sb.insert(5, ", Java");
            System.out.println("After Insert:     " + sb.toString());

            // 4. In-place reverse
            sb.reverse();
            System.out.println("After Reverse:    " + sb.toString());
        }
    }
---

# StringBuffer Class in Java (`java.lang.StringBuffer`)

---

## 1. What is `StringBuffer`?

`java.lang.StringBuffer` is a **peer class of `String`** that provides a **mutable**, **thread-safe** sequence of characters.

Unlike `String` (where every modification creates a brand new Heap object), `StringBuffer` allows you to append, insert, replace, truncate, and reverse text **in-place directly within the same memory buffer**.

```mermaid
graph LR
    subgraph StringImmutable["String (Immutable)"]
        S1["'Hello' (0x100)"] -->|concat(' World')| S2["'Hello World' (0x200 - New Object!)"]
    end

    subgraph StringBufferMutable["StringBuffer (Mutable)"]
        SB["Buffer [H, e, l, l, o] (0x800)"] -->|append(' World')| SB2["Same Buffer [H, e, l, l, o,  , W, o, r, l, d] (0x800)"]
    end
```

---

## 2. Why Was `StringBuffer` Introduced?

In Java 1.0, developers frequently needed to construct strings dynamically (e.g. building SQL queries, XML messages, or log lines):

```java
// Anti-Pattern with String (Generates massive garbage in Heap!):
String sql = "SELECT * ";
sql += "FROM users ";
sql += "WHERE status = 'ACTIVE' ";
sql += "ORDER BY id DESC;";
```

In the loop or sequence above, every `+=` operation discards the old `String` and creates a new one, producing multiple short-lived garbage objects in the Heap and triggering frequent Garbage Collection (GC) pauses.

`StringBuffer` was designed to eliminate this problem by maintaining a single, expandable internal array where modifications happen **in-place with zero intermediate garbage creation**.

---

## 3. Thread Safety and Synchronization

Every public mutating method in `StringBuffer` is declared with the **`synchronized`** keyword:

```java
public final class StringBuffer extends AbstractStringBuilder implements Serializable, Comparable<StringBuffer>, CharSequence {
    
    @Override
    public synchronized StringBuffer append(String str) {
        toStringCache = null;
        super.append(str);
        return this;
    }

    @Override
    public synchronized StringBuffer insert(int offset, String str) {
        toStringCache = null;
        super.insert(offset, str);
        return this;
    }

    @Override
    public synchronized StringBuffer reverse() {
        toStringCache = null;
        super.reverse();
        return this;
    }
}
```

### Key Concurrency Characteristics:
1. **Thread-Safe**: Multiple concurrent threads can append to or modify the same `StringBuffer` instance without corrupting characters or throwing race-condition exceptions.
2. **Intrinsic Lock Overhead**: Every method invocation acquires and releases the object's intrinsic monitor lock (`this`). In single-threaded loops, this synchronization introduces minor unnecessary CPU overhead (which is why `StringBuilder` was later introduced in Java 5).

---

## 4. Constructors and Capacity Allocation

When a `StringBuffer` is instantiated, it pre-allocates an internal character buffer:

| Constructor | Initial Capacity | Description |
| :--- | :--- | :--- |
| `new StringBuffer()` | **16 characters** | Default empty buffer with 16 capacity. |
| `new StringBuffer(int initialCapacity)` | **Custom `capacity`** | Pre-allocates buffer of specified size to prevent resizing. |
| `new StringBuffer(String str)` | **`str.length() + 16`** | Allocates length of input string plus 16 extra buffer slots. |
| `new StringBuffer(CharSequence seq)` | **`seq.length() + 16`** | Allocates length of character sequence plus 16 extra slots. |

---

## 5. The Dynamic Capacity Growth Formula

When appending content that exceeds the current buffer capacity, `StringBuffer` dynamically grows its internal buffer automatically using the following mathematical rule:

$$\text{New Capacity} = (\text{Old Capacity} \times 2) + 2$$

### Code Demonstration of Capacity Growth:

```java
public class CapacityGrowthDemo {
    public static void main(String[] args) {
        StringBuffer sb = new StringBuffer(); // Initial Capacity: 16
        System.out.println("1. Initial Capacity: " + sb.capacity()); // 16

        sb.append("1234567890123456"); // Length = 16 (Full capacity utilized)
        System.out.println("2. Full Capacity:    " + sb.capacity() + " | Length: " + sb.length()); // Cap: 16, Len: 16

        sb.append("A"); // Length = 17 -> Exceeds capacity!
        // New Capacity = (16 * 2) + 2 = 34
        System.out.println("3. Expanded Capacity: " + sb.capacity() + " | Length: " + sb.length()); // Cap: 34, Len: 17

        sb.append("123456789012345678"); // Exceeds 34
        // New Capacity = (34 * 2) + 2 = 70
        System.out.println("4. Second Expansion:  " + sb.capacity() + " | Length: " + sb.length()); // Cap: 70
    }
}
```

> [!TIP]
> **Performance Optimization Tip:**
> If you know in advance that your final string will contain approximately 500 characters, always initialize with `new StringBuffer(500)`. This completely avoids expensive array re-allocations and `System.arraycopy()` operations!

---

## 6. Comprehensive `StringBuffer` Method Catalog

| Method Signature | Return Type | Description | Code Example |
| :--- | :--- | :--- | :--- |
| `append(datatype data)` | `StringBuffer` | Appends text/primitives to the end of buffer | `sb.append(" Java");` |
| `insert(int offset, datatype data)` | `StringBuffer` | Inserts data at specified 0-based index | `sb.insert(5, " 21");` |
| `replace(int start, int end, String str)` | `StringBuffer` | Replaces characters in range `[start, end)` | `sb.replace(0, 5, "Hi");` |
| `delete(int start, int end)` | `StringBuffer` | Deletes characters in range `[start, end)` | `sb.delete(5, 10);` |
| `deleteCharAt(int index)` | `StringBuffer` | Deletes single character at index | `sb.deleteCharAt(0);` |
| `reverse()` | `StringBuffer` | Reverses the character sequence in-place | `sb.reverse();` |
| `capacity()` | `int` | Returns total allocated buffer capacity | `sb.capacity();` |
| `length()` | `int` | Returns count of currently stored characters | `sb.length();` |
| `charAt(int index)` | `char` | Returns character at index | `sb.charAt(2);` |
| `setCharAt(int index, char ch)` | `void` | Updates character at index in-place | `sb.setCharAt(0, 'H');` |
| `setLength(int newLength)` | `void` | Truncates or pads buffer with null chars | `sb.setLength(5);` |
| `ensureCapacity(int minCapacity)` | `void` | Guarantees buffer has at least min capacity | `sb.ensureCapacity(100);` |
| `trimToSize()` | `void` | Trims unused buffer capacity to match length | `sb.trimToSize();` |
| `toString()` | `String` | Converts buffer to immutable `String` | `String s = sb.toString();` |

---

## 7. `StringBuffer` Method Chaining Pattern

Because all mutating methods return `this` (the current `StringBuffer` reference), you can chain multiple operations cleanly in a single line:

```java
StringBuffer sb = new StringBuffer("Java");
String result = sb.append(" 21")
                  .insert(0, "Modern ")
                  .reverse()
                  .toString();

System.out.println(result);
```
