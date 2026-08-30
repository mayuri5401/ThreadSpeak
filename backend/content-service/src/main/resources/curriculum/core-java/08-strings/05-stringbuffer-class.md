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

# 🧵 StringBuffer Class in Java (`java.lang.StringBuffer`)

---

## 📌 1. What is `StringBuffer`?

`java.lang.StringBuffer` is a **mutable**, **thread-safe** sequence of characters.

Unlike `String` where every modification creates a new object, `StringBuffer` allows you to append, insert, replace, and reverse characters **directly in-place within the same Heap memory buffer**.

```mermaid
graph LR
    subgraph StringImmutable["String (Immutable)"]
        S1["'Hello'"] -->|concat(' World')| S2["'Hello World' (New Object)"]
    end

    subgraph StringBufferMutable["StringBuffer (Mutable)"]
        SB["Buffer [H, e, l, l, o]"] -->|append(' World')| SB2["Same Buffer [H, e, l, l, o,  , W, o, r, l, d]"]
    end
```

---

## 🔒 2. Thread Safety & Synchronization

Every public mutating method in `StringBuffer` is marked with the **`synchronized`** keyword:

```java
public synchronized StringBuffer append(String str) {
    toStringCache = null;
    super.append(str);
    return this;
}

public synchronized StringBuffer reverse() {
    toStringCache = null;
    super.reverse();
    return this;
}
```

- **Thread-Safe**: Multiple threads can safely manipulate the same `StringBuffer` instance without corrupting characters.
- **Performance Trade-off**: Acquiring and releasing monitor locks incurs a slight execution overhead compared to `StringBuilder`.

---

## 📐 3. Dynamic Capacity & Growth Formula

When a `StringBuffer` is created, it allocates an internal character array buffer:

1. **Default Constructor (`new StringBuffer()`)**: Initial capacity = **16 characters**.
2. **String Constructor (`new StringBuffer("Hello")`)**: Initial capacity = **Length of string (5) + 16 = 21 characters**.
3. **Custom Capacity (`new StringBuffer(50)`)**: Initial capacity = **50 characters**.

### 📈 Capacity Growth Algorithm:
When the content exceeds the current buffer capacity, `StringBuffer` dynamically grows its buffer:

$$\text{New Capacity} = (\text{Old Capacity} \times 2) + 2$$

```java
StringBuffer sb = new StringBuffer(); // Capacity = 16
sb.append("1234567890123456");       // Length = 16 (Full!)
sb.append("A");                      // Length = 17 -> Triggers expansion!

// New Capacity = (16 * 2) + 2 = 34 characters!
System.out.println("New Capacity: " + sb.capacity()); // Prints 34
```

---

## 🛠️ 4. Essential `StringBuffer` Methods

| Method | Description | Code Example |
| :--- | :--- | :--- |
| `append(data)` | Appends text/primitives to end of buffer | `sb.append(" Java");` |
| `insert(offset, data)` | Inserts text at specified 0-based offset | `sb.insert(5, " 21");` |
| `replace(start, end, str)` | Replaces characters from `start` to `end` with `str` | `sb.replace(0, 5, "Hi");` |
| `delete(start, end)` | Deletes characters in range `[start, end)` | `sb.delete(5, 10);` |
| `deleteCharAt(index)` | Deletes single character at index | `sb.deleteCharAt(0);` |
| `reverse()` | Reverses the character sequence in-place | `sb.reverse();` |
| `capacity()` | Returns total allocated buffer capacity | `int cap = sb.capacity();` |
| `length()` | Returns current number of stored characters | `int len = sb.length();` |
| `setLength(newLength)` | Truncates or pads buffer with null characters | `sb.setLength(5);` |
