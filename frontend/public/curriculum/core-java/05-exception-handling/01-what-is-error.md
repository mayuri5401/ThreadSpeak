---
id: "java-exception-what-is-error"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Exception Handling"
title: "What is Error"
slug: "java-exception-what-is-error"
summary: "Comprehensive guide to Errors in Java: Introduction, Definition as unrecoverable runtime problems, 3 Major Error Categories (Compile-Time Errors, Runtime Errors, Logical Errors), Error Class Hierarchy, and Examples."
eli10: "An Error is like a building running out of electricity or collapsing — it is a catastrophic system-level failure that your code cannot fix while running."
mentalModel: "Errors inherit from java.lang.Throwable -> java.lang.Error. They are unchecked and signify fatal environmental/JVM resource failures (Heap exhaustion, Stack overflow)."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["Error", "java.lang.Error", "Compile-Time Errors", "Runtime Errors", "Logical Errors", "StackOverflowError", "OutOfMemoryError", "Throwable", "Exception Handling"]
animationType: "exception-handling"
codeSnippet:
  language: "java"
  explanation: "Demonstrating StackOverflowError via infinite recursion in Java."
  code: |
    public class StackErrorExample {
        public static void main(String[] args) {
            // Infinite recursive call exhausts thread call stack
            main(null);
        }
    }
---

# ⚠️ What is Error in Java

---

## 📖 Introduction

An **Error in Java** is a **serious problem that occurs at runtime** (during the execution of a program).
- Errors usually happen due to **system-level issues** (like memory shortage or JVM crash) rather than problems in the application logic.
- Errors are **beyond the control of the programmer** and generally **cannot be recovered from** within the code.

---

## 💻 Key Examples of Errors:

### 1️⃣ 1. `StackOverflowError`
- Occurs when there is **deep or infinite recursion** that exhausts the JVM thread call stack.

#### 💻 Program:
```java
public class StackErrorExample
{
    public static void main(String[] args)
    {
        main(null); // infinite recursive call
    }
}
```

#### 🖥️ Output:
```text
Exception in thread "main" java.lang.StackOverflowError
	at StackErrorExample.main(StackErrorExample.java:5)
	at StackErrorExample.main(StackErrorExample.java:5)
    ...
```

---

### 2️⃣ 2. `OutOfMemoryError`
- Occurs when the **JVM runs out of memory (Heap Space)** to allocate new objects and the Garbage Collector cannot free any more memory.

#### 💻 Program:
```java
import java.util.ArrayList;

public class MemoryErrorExample
{
    public static void main(String[] args)
    {
        ArrayList<int[]> list = new ArrayList<>();
        while (true)
        {
            list.add(new int[1000000]); // keeps consuming memory continuously
        }
    }
}
```

#### 🖥️ Output:
```text
Exception in thread "main" java.lang.OutOfMemoryError: Java heap space
```

---

### 3️⃣ 3. `VirtualMachineError`
- Thrown when the **Java Virtual Machine (JVM) encounters a serious internal problem** or runs out of resources needed to operate.
- **Example**: JVM crash due to insufficient native OS resources.
- Rare, but indicates the JVM is in an unstable state.

---

## 📂 Types of Errors in Java

Errors in Java can be broadly divided into **three main categories**:

```text
                             Types of Errors
                                    │
        ┌───────────────────────────┼───────────────────────────┐
        ▼                           ▼                           ▼
1. Compile-Time Errors       2. Runtime Errors           3. Logical Errors
 (Lexical, Syntax, Semantic)   (Errors vs Exceptions)     (Wrong Formula / Logic)
```

---

### 1️⃣ 1. Compile-Time Errors
Errors that occur **when the program is being compiled by `javac`**. These are detected by the compiler before execution.
> **Note**: The program **cannot run** until all compile-time errors are fixed.

- **Lexical Errors**: Mistakes in keywords or identifiers.
  - *Example*: Writing `statc` instead of `static`, or `viod` instead of `void`.
- **Syntax Errors**: Violation of Java grammar rules.
  - *Example*: Missing semicolon `;`, wrong variable declaration, mismatched curly braces `{ }`.
- **Semantic Errors**: Code is syntactically valid structure, but meaningless or impossible.
  - *Example*: `int x = "hello";`
- **Type Checking Errors**: Mismatch of data types.
  - *Example*: Assigning a `String` literal to an `int` variable or passing the wrong argument type.

---

### 2️⃣ 2. Runtime Errors
Errors that **occur while the program is running** (after successful compilation). These are caused by invalid operations at runtime.

Runtime problems are divided into **2 types**:
1. **Errors (Serious, Not Recoverable)**:
   - Thrown by the JVM; usually cannot and should not be handled in application programs.
   - *Examples*: `StackOverflowError`, `OutOfMemoryError`.
2. **Exceptions (Recoverable Problems)**:
   - Can be caught and handled gracefully using `try-catch` blocks.
   - *Examples*:
     - `ArithmeticException` $\to$ Divide by zero (`10 / 0`)
     - `NullPointerException` $\to$ Accessing fields/methods on a `null` object
     - `ArrayIndexOutOfBoundsException` $\to$ Invalid array index access

---

### 3️⃣ 3. Logical Errors (Hardest to Detect)
The program compiles and **runs successfully without throwing any errors or exceptions**, but produces **incorrect or unexpected output due to flawed logic**.
- It is **NOT detected by the compiler or JVM**.
- Requires careful debugging, unit testing, and code review.

#### 💻 Java Program Example:
```java
// Example of Logical Error
public class LogicalErrorExample
{
    public static void main(String[] args)
    {
        int side = 5;
        // Formula for Area of Square is (side * side), but programmer wrote (4 * side):
        int area = 4 * side; // ❌ Wrong formula! (Calculates perimeter instead of area)

        System.out.println("Area = " + area); // Incorrect result: Area = 20 (Expected: 25)
    }
}
```

#### 🖥️ Output:
```text
Area = 20
```

---

## 🗺️ Error Class Hierarchy

`Error` is a predefined class in Java that inherits directly from `java.lang.Throwable`.

```text
                           java.lang.Object
                                  │
                        java.lang.Throwable
                                  │
                  ┌───────────────┴───────────────┐
                  ▼                               ▼
          java.lang.Error                java.lang.Exception
       (Unchecked, Fatal)              (Recoverable Conditions)
       ├── VirtualMachineError                   │
       │   ├── StackOverflowError      ┌─────────┴─────────┐
       │   └── OutOfMemoryError        ▼                   ▼
       ├── LinkageError             Checked             Unchecked
       │   └── NoClassDefFoundError Exceptions         (RuntimeException)
       └── AssertionError
```

---

## 📌 Points to Remember:

1. **`Object` class** is the root superclass of all classes in Java.
2. **`Throwable` class** is the direct parent class of `Error` and `Exception`.
3. **All Error classes are considered Unchecked** (because they are not checked at compile-time by `javac`).
4. **Core Difference**:
   - **`Error`**: Represents serious problems in the JVM/environment that cannot be handled by the program.
   - **`Exception`**: Represents conditions that can be caught and handled by the program.
