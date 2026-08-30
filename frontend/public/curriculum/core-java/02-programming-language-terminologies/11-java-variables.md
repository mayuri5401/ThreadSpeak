---
id: "java-terminologies-variables"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Programming Language Terminologies"
title: "Variables"
slug: "java-terminologies-variables"
summary: "Understand Java Variables: Definition, real-world bus analogy, RAM memory allocation (4 bytes for int), 3 variable types (Local, Instance, Static), execution scope rules, and comprehensive comparison table."
eli10: "Think of a bus: The bus is the memory location in RAM, the passenger sitting inside is the data (value 101), and the bus number plate (AA 123) is the variable name pointing to it!"
mentalModel: "Local Variables (Thread Stack) vs Instance Variables (Heap Object Fields) vs Static Variables (Class Area/Metaspace)."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["Variables", "Local Variables", "Instance Variables", "Static Variables", "Memory Allocation", "Scopes"]
animationType: "variables"
codeSnippet:
  language: "java"
  explanation: "Deep demonstration of Local, Instance, and Static variables with method execution."
  code: |
    public class MainApp {
        int no = 100;           // Instance Variable (Heap)
        static int sno = 200;   // Static Variable (Metaspace)

        void m1() {
            int no1 = 10;       // Local Variable (Stack)
            System.out.println("Result 1 : " + (no1 + no));
            System.out.println("Result 2 : " + (no1 + no + sno));
        }

        void m2() {
            int no2 = 20;       // Local Variable (Stack)
            System.out.println("Result 4 : " + (no2 + no));
            System.out.println("Result 5 : " + (no2 + no + sno));
        }

        static void m3() {
            int no3 = 30;       // Local Variable (Stack)
            System.out.println("Result 8 : " + (no3 + sno));
        }

        public static void main(String[] args) {
            MainApp obj = new MainApp();
            obj.m1();
            obj.m2();

            MainApp.m3();  // Static method called directly by class name
        }
    }
---

# 📦 Variables in Java

## 📖 Introduction

A **variable** is the name of a memory location that can store data.  
In simple words, **variables are the containers used to store data values**.

---

## 🚌 Real-World Analogy: The Bus Analogy

```text
┌────────────────────────────────────────────────────────┐
│                        🚌 BUS                          │
│  ┌─────────────────┐             ┌──────────────────┐  │
│  │   👤 Passenger   │             │   👤 Passenger    │  │ ➔ Data (Value: 101)
│  └─────────────────┘             └──────────────────┘  │
│                                                        │
│                  ┌─────────────────┐                   │
│                  │  Plate: AA 123  │                   │ ➔ Variable Name (rollno)
│                  └─────────────────┘                   │
└────────────────────────────────────────────────────────┘
                           ▲
                           │
                 Memory Location (RAM)
```

- **Memory Location (RAM)** ➔ The **Bus** (the physical space reserved in memory).
- **Data** ➔ The **Passenger** (the actual data value stored inside, e.g., `101`).
- **Variable Name** ➔ The **Number Plate** (the unique identifier pointing to that memory location, e.g., `rollno`).

---

## 💻 Java Example & RAM Allocation

```java
int rollno = 101;
```

```text
       Variable Name: rollno (Points to memory address 0x1004)
              │
              ▼
   ┌──────┬──────┬──────┬──────┐
   │ 0110 │ 0101 │ 0000 │ 0000 │  ➔ 4 Bytes in RAM holding Literal: 101
   └──────┴──────┴──────┴──────┘
   [ Byte 1 | Byte 2 | Byte 3 | Byte 4 ]
```

Here:
- **Data (Literal)**: `101` is stored in physical RAM memory.
- **Variable Name**: `rollno` points to that memory address.
- **Data Type**: `int` tells the compiler to allocate **4 bytes of memory**.

### Every variable in Java consists of 3 elements:
1. **Data Type**: The type of data it stores (e.g., `int`, `char`, `float`, `double`).
2. **Variable Name**: The unique identifier within its scope that points to the memory location.
3. **Value (Literal)**: The actual data assigned to the variable.

---

## 📌 Important Characteristics of Variables

1. **Statically Typed**:  
   Java is a statically typed language. We **must declare the data type** before using any variable.
   ```java
   int rollno = 101; // Data type 'int' is mandatory
   ```

2. **Values Can Change (Vary)**:  
   The value stored in a variable can change during program execution—which is why it is called a *"variable"*.

   ```java
   int no = 10;
   System.out.println("no : " + no);     // Output: no : 10

   no = no + 20;
   System.out.println("no : " + no);     // Output: no : 30
   ```

---

## 🔍 Types of Variables in Java

There are **3 types of variables** in Java:

```text
                           Variables in Java
                                   │
            ┌──────────────────────┼──────────────────────┐
            ▼                      ▼                      ▼
    1. Local Variables    2. Instance Variables   3. Static Variables
   (Inside methods)       (Inside class/object)   (Class-level static)
   [Memory: Stack]        [Memory: Heap]          [Memory: Metaspace]
```

---

### 🔹 1. Local Variables
- **Definition**: A variable defined within a block, method, or constructor is called a local variable.
- **Creation & Destruction**: Created when the block/method is called and destroyed as soon as the method exits.
- **Scope**: Limited strictly to the block in which it is declared; cannot be accessed from outside.
- **Initialization**: **Must be initialized before use** (no default values provided).

---

### 🔹 2. Instance Variables
- **Definition**: A variable defined inside a class but outside any method, block, or constructor is called an instance variable.
- **Creation & Destruction**: Created when an object of the class is instantiated (`new` keyword) and destroyed when the object is garbage-collected.
- **Object Copy**: Each object instance gets its **own separate copy** of instance variables.
- **Default Values**: Automatically initialized with default values (`0` for integers, `null` for objects, `false` for booleans).

---

### 🔹 3. Static Variables
- **Definition**: A variable defined with the **`static`** keyword inside a class is called a static variable.
- **Single Shared Copy**: Shared across **all instances** of the class; only one copy exists in memory.
- **Creation & Destruction**: Created when the class is loaded by JVM and destroyed when the class is unloaded.
- **Access**: Can be accessed directly using the class name without creating any object (`MainApp.sno`).

---

## 💻 Deep Code Demonstration: Local, Instance & Static Variables

```java
public class MainApp {
    int no = 100;           // Instance Variable (Heap)
    static int sno = 200;   // Static Variable (Metaspace / Class Area)

    void m1() {
        int no1 = 10;       // Local Variable (Stack)
        System.out.println("Result 1 : " + (no1 + no));
        System.out.println("Result 2 : " + (no1 + no + sno));
        // System.out.println("Result 3 : " + (no1 + no2)); 
        // ❌ Error: no2 is local to m2() and cannot be accessed inside m1()
    }

    void m2() {
        int no2 = 20;       // Local Variable (Stack)
        System.out.println("Result 4 : " + (no2 + no));
        System.out.println("Result 5 : " + (no2 + no + sno));
        // System.out.println("Result 6 : " + (no2 + no1)); 
        // ❌ Error: no1 is local to m1() and cannot be accessed inside m2()
    }

    static void m3() {
        int no3 = 30;       // Local Variable (Stack)
        // System.out.println("Result 7 : " + (no3 + no)); 
        // ❌ Error: Cannot access non-static instance variable 'no' from static context!
        System.out.println("Result 8 : " + (no3 + sno));
        // System.out.println("Result 9 : " + (no1 + no2 + no3)); 
        // ❌ Error: no1 and no2 are not visible in m3()
    }

    public static void main(String[] args) {
        MainApp obj = new MainApp();
        obj.m1();
        obj.m2();

        MainApp.m3();  // Static method called directly using class name
    }
}
```

### 🖥️ Program Output:
```text
Result 1 : 110
Result 2 : 310
Result 4 : 120
Result 5 : 320
Result 8 : 230
```

---

## 📊 Summary Comparison: Local vs Instance vs Static Variables

| Property | Local Variables | Instance Variables | Static Variables |
|:---|:---|:---|:---|
| **Declaration** | Declared inside methods, constructors, or blocks. | Declared inside a class but outside methods, constructors, or blocks. | Declared inside a class with the `static` keyword. |
| **Scope** | Accessible only within the block, method, or constructor in which it is defined. | Accessible within the object of the class across non-static methods. | Accessible across all instances and static contexts using the Class Name. |
| **Memory Allocation** | Memory allocated when block/method is executed and deallocated on exit. | Memory allocated when object is created (`new`) and deallocated upon Garbage Collection. | Memory allocated at class loading and persists as long as the class is in memory. |
| **Memory Area** | Allocated in **Stack memory area**. | Allocated in **Heap memory area**. | Allocated in **Method Area / Metaspace**. |
| **Default Values** | **Must be initialized before use**; no default values assigned. | Assigned default values automatically (`0` for `int`, `null` for objects). | Assigned default values automatically (`0` for `int`, `null` for objects). |
| **Access Modifiers** | **Cannot** use access modifiers (`public`, `private`). | **Can** use access modifiers (`public`, `private`, `protected`). | **Can** use access modifiers (`public`, `private`, `protected`). |
