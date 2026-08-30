---
id: "java-final-keyword"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "\"final\" Keyword in Java"
slug: "java-final-keyword"
summary: "Master the 'final' keyword in Java: Introduction, Definition as non-access modifier, and the 3 Core Applications with full programs and outputs (final Variable/Constants, final Method/Prevent Overriding, and final Class/Prevent Inheritance) along with final vs finally vs finalize comparison."
eli10: "'final' means 'No more changes allowed!'. A final variable cannot be changed (like your birthdate), a final method cannot be overridden (like the law of gravity), and a final class cannot have children (like a sterile plant)."
mentalModel: "'final' enforces compile-time and runtime immutability and finality across variables, method lookup tables, and class inheritance hierarchies."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["final", "final keyword", "Constants", "final Variables", "final Methods", "final Classes", "Immutability", "finally", "finalize", "OOP"]
animationType: "final-keyword"
codeSnippet:
  language: "java"
  explanation: "Demonstrating the 'final' keyword in Java."
  code: |
    public class FinalDemo {
        public static void main(String[] args) {
            final int MAX_MARKS = 100;  // final variable (constant)
            System.out.println("Maximum marks allowed: " + MAX_MARKS);

            // MAX_MARKS = MAX_MARKS + 50; // Error: cannot assign a value to final variable
        }
    }
---

# 🛑 "final" Keyword in Java

---

## 📖 Introduction

The **`final` keyword is a non-access modifier in Java**.
- It is used to **restrict modification of variables, methods, and classes**.

### If we use `final` keyword with:
1. **Variable**: Its value **cannot be changed** once initialized (creates constants).
2. **Method**: It **cannot be overridden** by subclasses.
3. **Class**: It **cannot be subclassed or extended**.

---

## 1️⃣ 1. "final" Variable

- A final variable's value **cannot be changed** once it is assigned.
- It must be initialized either at the time of declaration or inside the constructor.
- `final` variables are commonly used to **define constants**.

### 💻 Java Program Example:
```java
public class FinalDemo
{
    public static void main(String[] args)
    {
        final int MAX_MARKS = 100;  // final variable (constant)
        System.out.println("Maximum marks allowed: " + MAX_MARKS);

        // MAX_MARKS = MAX_MARKS + 50;  // error as we cannot change the final variable value
    }
}
```

### 🖥️ Output:
```text
Maximum marks allowed: 100
```

---

## 2️⃣ 2. "final" Method

- A final method **cannot be overridden by subclasses**.
- This is useful when we want to **stop other classes from changing or tampering with the code inside the method**.

### 💻 Java Program Example:
```java
class Parent
{
    final void showMessage()
    {
        System.out.println("This is a final method from the Parent class.");
    }
}

class Child extends Parent
{
    // Trying to override the final method will cause a compile-time error:
    /*
    void showMessage()
    {
        System.out.println("Trying to override.");
    }
    */
}

public class FinalDemo
{
    public static void main(String[] args)
    {
        Child obj = new Child();
        obj.showMessage();
    }
}
```

### 🖥️ Output:
```text
This is a final method from the Parent class.
```

---

## 3️⃣ 3. "final" Class

- A final class **cannot be extended** (i.e., no class can inherit it).
- This is useful for **security and immutability** (like the built-in `String` and primitive wrapper classes).

### 💻 Java Program Example:
```java
// Final class - cannot be extended
final class A
{
    void mA()
    {
        System.out.println("This is class A.");
    }
}

// Trying to extend a final class will cause a compile-time error:
/*
class B extends A
{

}
*/

public class FinalDemo
{
    public static void main(String[] args)
    {
        A obj = new A();
        obj.mA();
    }
}
```

### 🖥️ Output:
```text
This is class A.
```

---

## 📊 Summary Comparison: `final` vs `finally` vs `finalize()`

| Identifier | Category | Purpose & Behavior |
|:---|:---|:---|
| **`final`** | **Non-Access Modifier** | Restricts modification: creates constants on variables, prevents method overriding, and prevents class inheritance. |
| **`finally`** | **Exception Handling Block** | Executes cleanup code (closing files, releasing DB connections) guaranteed, regardless of whether exceptions were thrown or caught. |
| **`finalize()`** | **Object Method** | Called by the Garbage Collector before reclaiming object memory from the Heap (Deprecated since Java 9). |
