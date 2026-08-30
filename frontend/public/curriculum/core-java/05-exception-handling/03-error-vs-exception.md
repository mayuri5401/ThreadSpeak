---
id: "java-exception-error-vs-exception"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Exception Handling"
title: "Error vs Exception"
slug: "java-exception-error-vs-exception"
summary: "Comprehensive guide to Difference Between Error and Exception in Java: Detailed definitions, origins, recoverability, categories, examples, occurrence timing, and predictability comparison."
eli10: "An Error is like a building running out of power or collapsing — your program cannot fix it while running. An Exception is like a flat tire or traffic jam — your program can replace the tire (catch block) and continue driving safely!"
mentalModel: "Errors inherit from java.lang.Error and represent fatal system/JVM resource failures (cannot be recovered). Exceptions inherit from java.lang.Exception and represent recoverable application anomalies (can be caught and handled with try-catch)."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["Error vs Exception", "Difference Between Error and Exception", "Throwable", "OutOfMemoryError", "StackOverflowError", "Checked Exceptions", "Unchecked Exceptions", "Recovery", "Exception Handling"]
animationType: "error-vs-exception"
codeSnippet:
  language: "java"
  explanation: "Demonstrating how an Exception can be caught and recovered from, whereas an Error causes JVM termination."
  code: |
    public class ErrorVsExceptionDemo {
        public static void main(String[] args) {
            // 1. Exception: Recoverable via try-catch
            try {
                int result = 10 / 0; // Throws ArithmeticException
                System.out.println("Result: " + result);
            } catch (ArithmeticException e) {
                System.out.println("✅ Exception caught and handled: " + e.getMessage());
            }

            // Normal flow continues smoothly after Exception handling!
            System.out.println("🚀 Program continues running smoothly!");
        }
    }
---

# ⚖️ Difference Between Error and Exception in Java

---

## 📌 Exception vs Error

### ⚠️ Error:
An **[Error](https://smartprogramming.in/tutorials/java/error-in-java.php)** in Java is a **serious runtime problem** that usually occurs due to **system-level issues** such as memory shortage or a JVM crash.
- **[Errors](https://smartprogramming.in/tutorials/java/error-in-java.php)** cannot be handled in our code because they are caused by system failures, not by mistakes in the program’s logic.
- 👉 **[Click Here](https://smartprogramming.in/tutorials/java/error-in-java.php)** to read about Errors more deeply.

---

### 🛡️ Exception:
An **[Exception](https://smartprogramming.in/tutorials/java/exception-in-java.php)** in Java is an **unwanted event** that occurs during the execution of a program and **disrupts the normal flow of instructions**.
- **[Exceptions](https://smartprogramming.in/tutorials/java/exception-in-java.php)** usually happen due to problems in the program’s logic or invalid user input, and they **can be handled in our code**.
- 👉 **[Click Here](https://smartprogramming.in/tutorials/java/exception-in-java.php)** to read about Exception more deeply.

---

## 📊 Below are some differences between Error and Exception:

| Aspect | ⚠️ Error | 🛡️ Exception |
| :--- | :--- | :--- |
| **Definition** | A serious runtime issue that the application typically **cannot recover from** (e.g., memory or system failures). | An abnormal, **often recoverable event** that disrupts program flow, caused by logic or environmental issues. |
| **Cause / Origin** | Caused by **system-level or JVM issues** (e.g., memory exhaustion, VM crash). | Caused by **Application-level problems** such as invalid input, faulty logic, or resource access errors. |
| **Recoverability** | **We cannot recover the error**, the program should log it and terminate. | **We can recover the exception** using `try-catch` blocks or throwing exceptions back to the caller. |
| **Types / Categories** | **System-related only**; not divided further in the Exception hierarchy. | **Two categories:**<br>• **Checked Exceptions** (must be handled or declared)<br>• **Unchecked Exceptions** (runtime exceptions) |
| **Examples** | `OutOfMemoryError`, `StackOverflowError`, `VirtualMachineError` | **Checked:** `IOException`, `SQLException`<br>**Unchecked:** `NullPointerException`, `ArithmeticException`, `ArrayIndexOutOfBoundsException` |
| **When They Occur** | Can occur both at **compile time and runtime**. | Primarily occur at **runtime**, though checked exceptions can be detected at compile time. |
| **Predictability** | **Unpredictable** and often outside the control of the application. | **Can be expected and handled** through proper coding practices. |

---

## 🌲 Visual Throwable Inheritance Tree

Both `Error` and `Exception` inherit directly from **`java.lang.Throwable`**:

```mermaid
flowchart TD
    Obj["👑 java.lang.Object"] --> Thr["⚡ java.lang.Throwable"]
    
    Thr --> Err["🛑 java.lang.Error<br><b>(System / Fatal Level)</b><br><i>* Unrecoverable *</i>"]
    Thr --> Exc["🛡️ java.lang.Exception<br><b>(Application Level)</b><br><i>* Recoverable *</i>"]
    
    Err --> SOE["💥 StackOverflowError"]
    Err --> OOME["💥 OutOfMemoryError"]
    Err --> VME["💥 VirtualMachineError"]
    
    Exc --> Checked["🔒 Checked Exceptions<br><i>(Compile-Time Enforced)</i>"]
    Exc --> Unchecked["⚡ RuntimeException<br><i>(Unchecked Exceptions)</i>"]
    
    Checked --> IOE["📄 IOException"]
    Checked --> SQLE["🗄️ SQLException"]
    Checked --> CNFE["🔍 ClassNotFoundException"]
    
    Unchecked --> AE["🔢 ArithmeticException"]
    Unchecked --> NPE["🚫 NullPointerException"]
    Unchecked --> AIOOBE["📊 ArrayIndexOutOfBoundsException"]
```

---

## 💻 Code Demonstration: Exception Recovery vs Error Crash

### 🟢 1. Handling an Exception (Graceful Recovery):
```java
public class ExceptionRecoveryDemo {
    public static void main(String[] args) {
        System.out.println("Step 1: Program starts.");

        try {
            int a = 10;
            int b = 0;
            int result = a / b; // Throws ArithmeticException
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("⚠️ Step 2: Caught Exception safely: Cannot divide by zero!");
        }

        // Program continues executing smoothly!
        System.out.println("Step 3: Program completes successfully without crashing.");
    }
}
```

#### 🖥️ Output:
```text
Step 1: Program starts.
⚠️ Step 2: Caught Exception safely: Cannot divide by zero!
Step 3: Program completes successfully without crashing.
```

---

### 🔴 2. Unrecoverable Error (Fatal System Failure):
```java
public class FatalErrorDemo {
    // Infinite recursion causes StackOverflowError
    public static void recursiveMethod() {
        recursiveMethod(); // Fills JVM thread stack memory
    }

    public static void main(String[] args) {
        System.out.println("Step 1: Program starts.");
        
        // This exhausts the thread call stack (-Xss)
        recursiveMethod(); 

        // NEVER reached! The JVM terminates the process.
        System.out.println("Step 2: Program finished.");
    }
}
```

#### 🖥️ Output (JVM Crash):
```text
Step 1: Program starts.
Exception in thread "main" java.lang.StackOverflowError
	at FatalErrorDemo.recursiveMethod(FatalErrorDemo.java:4)
	at FatalErrorDemo.recursiveMethod(FatalErrorDemo.java:4)
    ...
```
