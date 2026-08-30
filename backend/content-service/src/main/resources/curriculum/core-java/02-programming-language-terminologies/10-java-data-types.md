---
id: "java-terminologies-data-types"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Programming Language Terminologies"
title: "Data Types"
slug: "java-terminologies-data-types"
summary: "Comprehensive guide to Data Types in Java: Purpose, Memory Allocation, Primitive (8 types) vs Non-Primitive (Classes, Interfaces, Arrays, Collections, Enums), Dynamic Sizing, Garbage Collection, and 20-point Deep Comparison Matrix."
eli10: "Data types tell Java what kind of value a box holds. Primitive types are fixed-size basic values stored directly on the stack. Non-Primitive types are complex objects living in heap memory (like Strings and Lists) with dynamic sizes, methods, and automatic garbage collection!"
mentalModel: "Stack Memory (Primitive Values & Object Reference Pointers) vs Heap Memory (Non-Primitive Object Payloads & Arrays managed by Garbage Collection)."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["Data Types", "Primitive", "Non-Primitive", "String", "Arrays", "Classes", "Interfaces", "Stack vs Heap", "Garbage Collection"]
animationType: "data-types"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Primitive and Non-Primitive data types in Java."
  code: |
    import java.util.ArrayList;

    public class DataTypesDemo {
        public static void main(String[] args) {
            // 1. Primitive Data Types (Direct value on Stack, Fixed size)
            int rollno = 101;              // 4 bytes integer
            float marks = 91.4f;           // 4 bytes floating point
            char grade = 'A';              // 2 bytes Unicode character
            boolean isPassed = true;       // 1 bit logical flag

            // 2. Non-Primitive Data Types (Object references on Stack, Payload on Heap)
            String name = "Deepak";        // 6 characters = 12 bytes payload
            int[] scores = {85, 90, 78};   // Array object
            
            ArrayList<String> subjects = new ArrayList<>();
            subjects.add("Core Java");
            subjects.add("Spring Boot");

            System.out.println("Roll No: " + rollno + " | Name: " + name);
            System.out.println("Marks: " + marks + "% (Grade: " + grade + ")");
            System.out.println("Subjects List: " + subjects);
        }
    }
---

# 📦 Data Types in Java

## 📖 Introduction: What are Data Types?

In Java, when we provide data like `101`, `Deepak`, `91.4`, etc., we need to specify which type of data we are providing.

- For example, we need to specify that:
  - `101` is of type **`int`**
  - `Deepak` is of type **`String`**
  - `91.4` is of type **`float`** or **`double`**

So, we can say that in Java, **every piece of data has a specific type, known as a "data type"**.

```java
int rollno = 101;          // 'int' is a data type for integers
String name = "deepak";    // 'String' is a non-primitive data type for text
int[] marks = {85, 90, 78}; // 'int[]' is an array to store multiple integers
```

---

## 🎯 Purpose of Data Types

1. **Informs the Compiler**: Data types inform the compiler about the kind of data to be stored in a variable.  
   - *Example*: Declaring `int rollno = 101;` tells the compiler that `rollno` will store an integer.
2. **Allocates Memory Efficiently**: They help allocate the necessary memory for that data, ensuring that the program uses memory efficiently and that data is stored and processed correctly.  
   - *Example*: `int rollno` allocates **4 bytes** of memory; similarly, `float marks` will also allocate **4 bytes** of memory.

---

## 🏷️ Data Types & Variables

Data is stored in **variables**, and each variable is assigned a specific data type.

A variable's data type determines:
- What kind of value it can hold.
- What operations can be performed on it.

### Anatomy of a Variable Declaration:

```java
int rollno = 101;
```

```text
┌─────────────────┬──────────────────┬─────────────────┐
│       int       │      rollno      │       101       │
├─────────────────┼──────────────────┼─────────────────┤
│    Data Type    │  Variable Name   │ Literal / Data  │
│ (Memory: 4B)    │   (Identifier)   │ (Assigned Value)│
└─────────────────┴──────────────────┴─────────────────┘
```

- **`int`** ➔ **Data Type** (tells compiler to reserve 4 bytes of integer storage).
- **`rollno`** ➔ **Variable** (the named container holding the value).
- **`101`** ➔ **Literal / Data** (the actual constant value assigned to the variable).

---

## ☀️ Types of Data Types in Java

There are **2 types of Data Types in Java**:
1. **Primitive Data Types**
2. **Non - Primitive Data Types**

---

## 🗺️ Complete Data Types Classification Tree

```text
                                              ┌────────────┐
                                              │ Data Types │
                                              └──────┬─────┘
                                                     │
                  ┌──────────────────────────────────┴──────────────────────────────────┐
                  ▼                                                                     ▼
            ┌───────────┐                                                       ┌───────────────┐
            │ Primitive │                                                       │ Non-Primitive │
            └─────┬─────┘                                                       └───────┬───────┘
                  │                                                                     │
         ┌────────┴────────┐                                    ┌───────────┬───────────┼───────────┐
         ▼                 ▼                                    ▼           ▼           ▼           ▼
    ┌─────────┐       ┌─────────┐                           ┌────────┐  ┌────────┐  ┌─────────┐ ┌────────────┐
    │ Boolean │       │ Numeric │                           │ String │  │ Arrays │  │ Classes │ │ Interfaces │
    └────┬────┘       └────┬────┘                           └────────┘  └────────┘  └─────────┘ └────────────┘
         │                 │
         ▼           ┌─────┴─────┐
    ┌─────────┐      ▼           ▼
    │ boolean │ ┌───────────┐┌──────────┐
    └─────────┘ │ Character ││ Integral │
                └─────┬─────┘└────┬─────┘
                      │           │
                      ▼     ┌─────┴─────┐
                   ┌──────┐ ▼           ▼
                   │ char │┌─────────┐┌────────────────┐
                   └──────┘│ Integer ││ Floating Point │
                           └───┬─────┘└───────┬────────┘
                               │              │
                   ┌────┬──────┼────┬────┐ ┌──┴───┬────────┐
                   ▼    ▼      ▼    ▼    ▼ ▼      ▼        ▼
                ┌────┐┌─────┐┌───┐┌────┐ ┌───────┐┌────────┐
                │byte││short││int││long│ │ float ││ double │
                └────┘└─────┘└───┘└────┘ └───────┘└────────┘
```

---

## 🔹 1. Primitive Data Types

- **Pre-defined**: Primitive data types are built-in, core data types recognized directly by the compiler.
- **Total Count**: There are **8 primitive data types** in Java: `boolean`, `char`, `byte`, `short`, `int`, `long`, `float`, and `double`.
- **Fixed Memory Size**: Primitive data types have fixed memory footprints across all platforms:
  - `boolean`: 1 bit logical flag (`true` or `false`)
  - `byte`: 1 byte (8 bits), range: `-128` to `127`
  - `short`: 2 bytes (16 bits), range: `-32,768` to `32,767`
  - `int`: 4 bytes (32 bits), range: `-2,147,483,648` to `2,147,483,647`
  - `long`: 8 bytes (64 bits), range: `±9.22 × 10^18`
  - `float`: 4 bytes (32 bits IEEE 754 floating point)
  - `double`: 8 bytes (64 bits IEEE 754 double precision)
  - `char`: 2 bytes (16 bits Unicode UTF-16, `\u0000` to `\uffff`)

---

## 🔹 2. Non-Primitive Data Types in Java

### a) Non-Primitive Data Types are User-Defined or Derived Data Types
- Non-primitive data types are more complex structures in Java.
- They are not pre-defined by the compiler but are created by programmers using **classes** or **interfaces**.
- Non-primitive data types store **references to objects or collections of data**, such as strings, arrays, or custom objects.

#### Example:
```java
String name = "Deepak";
```
In this case:
- The compiler knows that `String` is a class capable of storing sequences of characters.
- There are a total of 6 characters in the `name` variable; thus, it allocates **12 bytes of memory** (6 characters × 2 bytes per char) to store the string value payload on the Heap.

> [!NOTE]
> **Key Points to Note**:
> 1. **Flexibility**: Non-Primitive Data Types are created by the programmer using classes or interfaces and provide immense flexibility.
> 2. **Reference Overhead**: Non-Primitive Data Types store references (memory addresses) to data in Heap memory instead of directly storing raw values on the stack.
> 3. **Rich Methods**: Non-Primitive Data Types are objects offering methods and functionality beyond raw data storage (e.g., `name.toUpperCase()`, `list.add()`).

---

### b) Non-Primitive Data Types Categories
Java does not have a fixed limit on the number of non-primitive data types. While Java provides standard library classes (like `String`, `Scanner`, and collections), you can create an infinite number of custom classes and interfaces.

1. **Classes**: User-defined types acting as blueprints for creating objects (e.g., `String`, `Scanner`, `Student`, `BankAccount`).
2. **Interfaces**: Abstract types that specify contract methods a class must implement (e.g., `List`, `Runnable`, `Comparable`).
3. **Arrays**: Containers holding multiple values of the same type in contiguous memory (e.g., `int[]`, `String[]`).
4. **Collections**: Rich data structures from `java.util` (e.g., `ArrayList`, `HashMap`, `HashSet`, `LinkedList`).
5. **Enums**: Fixed sets of predefined constants (e.g., `enum Day { MONDAY, TUESDAY }`).

---

### c) Non-Primitive Data Types Have Variable (Dynamic) Memory Sizes
Non-primitive data types do not have fixed memory sizes. Their memory usage depends dynamically on the data they store and the runtime environment:

- **Dynamic Payload Sizing**:
  ```java
  String name = "deepak"; // Allocates 12 bytes for character storage (6 chars × 2 bytes)
  ```
- **Dynamic Growth & Shrinkage**:
  An `ArrayList` grows dynamically as elements are added:
  ```java
  ArrayList<Integer> numbers = new ArrayList<>();
  numbers.add(10); // Memory adjusts dynamically as elements are added
  ```
- **Automatic Garbage Collection**:
  Java uses Garbage Collection to clean up unreachable heap objects automatically:
  ```java
  String unused = new String("Garbage");
  unused = null; // The memory for "Garbage" is now eligible for garbage collection!
  ```

---

## 📊 Deep Comparison: Primitive vs Non-Primitive Data Types

| # | Property | Primitive Data Types | Non-Primitive Data Types |
|:---:|:---|:---|:---|
| **1** | **Definition** | Pre-defined by Java, representing simple, fixed-size data values like numbers or characters. | User-defined or pre-defined types representing complex structures like arrays, classes, interfaces. |
| **2** | **Origin** | Built into the Java language by the Java compiler. | Defined by the programmer or Java's standard libraries. |
| **3** | **Examples** | Total **8 types**: `boolean`, `char`, `byte`, `short`, `int`, `long`, `float`, and `double`. | `String`, `Array`, `Class`, `Interface`, `ArrayList`, `HashMap`, `LinkedList`, etc. |
| **4** | **Naming Convention** | Typically start with **lowercase letters** (e.g., `int`, `char`, `boolean`). | Typically start with **uppercase letters** (e.g., `String`, `ArrayList`, `Scanner`). |
| **5** | **Data Type Size** | **Fixed size** regardless of platform (e.g., `int` is always 4 bytes). | **Size depends** on the object or class type (fields, string length, collection capacity). |
| **6** | **Default Value** | Pre-defined default values (`int` is `0`, `char` is `'\u0000'`, `boolean` is `false`). | Default value for reference types is **`null`**. |
| **7** | **Nullability** | **Cannot be null**; they always hold a valid value (e.g., `int` cannot be null). | **Can be null**; a reference variable can point to no object (`null`). |
| **8** | **Data Representation** | Represents only **one** single value (e.g., `int` for a number, `char` for a character). | Can represent **multiple values** and complex internal states (e.g., `ArrayList`). |
| **9** | **Performance** | **Faster**, as there is no overhead for reference handling. Direct access to memory. | **Slower** in comparison, as it involves reference handling and heap pointer dereferencing. |
| **10** | **Memory Allocation** | Stored **directly in Stack memory**. | Reference pointer on Stack; actual object instance resides in **Heap memory**. |
| **11** | **Value Storage** | Stores the **actual value** directly. | Stores a **reference (memory address)** to the value, not the value itself. |
| **12** | **Mutability** | **Immutable by default** (value is replaced upon re-assignment). | Can be **mutable or immutable** (e.g., `String` is immutable; `ArrayList`, `StringBuilder` are mutable). |
| **13** | **When Copied** | **Value Copy**: Values are duplicated; variables hold separate independent copies. | **Reference Copy**: Copies pointer; both variables point to same Heap object. |
| **14** | **Memory Efficiency** | **More memory-efficient** (holds raw values directly without object headers). | **Less memory-efficient** (requires object header, padding, and reference pointers). |
| **15** | **Garbage Collection** | **Not subject** to garbage collection (popped automatically with stack frame). | **Subject to garbage collection** when all references are lost. |
| **16** | **Use Case** | Best for simple, small data storage like numeric values, flags, and characters. | Used for complex data structures, entities, collections, and domain modeling. |
| **17** | **Methods & Operations** | **Cannot invoke methods** directly on primitive types (`int.toString()` ❌). | **Can invoke methods** (e.g., `name.length()`, `list.add()`). |
| **18** | **Example Use Case** | Storing simple values like `age` (`int`), `price` (`float`), or `grade` (`char`). | Representing entities like lists of students (`ArrayList`), user names (`String`). |
| **19** | **Write Once, Run Anywhere** | Guarantees identical size and behavior on all platforms due to fixed byte sizes. | Relies on JVM memory management and class library implementations. |
| **20** | **Memory Management** | Automatically cleaned up when stack frame goes out of scope. | Managed by JVM Garbage Collector once objects become unreachable. |
