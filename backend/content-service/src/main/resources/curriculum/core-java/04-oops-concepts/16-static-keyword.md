---
id: "java-static-keyword"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "\"static\" Keyword in Java"
slug: "java-static-keyword"
summary: "Master the 'static' keyword in Java: Introduction, Definition as non-access modifier, and the 4 Core Usages with full programs and outputs (Static Variables, Static Methods, Static Blocks, and Static Nested Classes) with Metaspace vs Heap memory management."
eli10: "If 100 students attend the same school, each student has their own unique 'name' (instance variable), but all 100 students share the exact same 'schoolName' (static variable) in memory."
mentalModel: "Static members belong to the Class template loaded in Metaspace / Method Area, shared across all Heap instances. They exist before any objects are created."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["static", "static keyword", "Static Variables", "Static Methods", "Static Blocks", "Static Nested Class", "Class Loading", "Metaspace", "OOP"]
animationType: "static-keyword"
codeSnippet:
  language: "java"
  explanation: "Demonstrating the 'static' keyword in Java."
  code: |
    class Student {
        String name;
        int rollNo;
        static String schoolName = "ABC Public School";  // static variable shared by all students

        Student(String name, int rollNo) {
            this.name = name;
            this.rollNo = rollNo;
        }

        void displayDetails() {
            System.out.println("Name     : " + name);
            System.out.println("Roll No  : " + rollNo);
            System.out.println("School   : " + schoolName);
            System.out.println("==========================");
        }
    }

    public class StaticDemo {
        public static void main(String[] args) {
            Student s1 = new Student("Amit", 101);
            Student s2 = new Student("Deepak", 102);
            Student s3 = new Student("Rahul", 103);

            s1.displayDetails();
            s2.displayDetails();
            s3.displayDetails();
        }
    }
---

# ⚡ "static" Keyword in Java

---

## 📖 Introduction

The **`static` keyword is a non-access modifier in Java**.
- It is used to **create members (variables, methods, blocks, or nested classes) that belong to the class rather than any specific object**.
- We **don't need to create an object to access a static member** — we can access it using the class name directly.

---

## 🎯 Use of `static` Keyword:

- It is used for **memory management** by sharing data among all instances of a class.
- It means a **static member is shared among all objects of the class**.

---

### 1️⃣ 1. Static Variable (Class Variable)

- A **static variable is shared among all objects** of a class.
- It is initialized **only once**, at the start of program execution when the class is loaded.
- Useful for defining **common properties or global counters**.

#### 💻 Java Program Example 1 (Shared School Name):
```java
class Student
{
    String name;
    int rollNo;
    static String schoolName = "ABC Public School";  // static variable shared by all students

    // Constructor
    Student(String name, int rollNo)
    {
        this.name = name;
        this.rollNo = rollNo;
    }

    // Method to display student details
    void displayDetails()
    {
        System.out.println("Name     : " + name);
        System.out.println("Roll No  : " + rollNo);
        System.out.println("School   : " + schoolName);
        System.out.println("--------------------------");
    }
}

public class StaticDemo
{
    public static void main(String[] args)
    {
        // Creating student objects
        Student s1 = new Student("Amit", 101);
        Student s2 = new Student("Deepak", 102);
        Student s3 = new Student("Rahul", 103);

        // Displaying student details
        s1.displayDetails();
        s2.displayDetails();
        s3.displayDetails();
    }
}
```

#### 🖥️ Output:
```text
Name     : Amit
Roll No  : 101
School   : ABC Public School
--------------------------
Name     : Deepak
Roll No  : 102
School   : ABC Public School
--------------------------
Name     : Rahul
Roll No  : 103
School   : ABC Public School
--------------------------
```

#### 💻 Java Program Example 2 (Object Counter):
```java
public class Counter
{
    // static variable to keep count of objects
    static int count = 0;

    // Constructor
    Counter()
    {
        count++;  // Increment static counter
        System.out.println("Object created. Count = " + count);
    }

    public static void main(String[] args)
    {
        // Creating objects
        Counter c1 = new Counter();
        Counter c2 = new Counter();
        Counter c3 = new Counter();
    }
}
```

#### 🖥️ Output:
```text
Object created. Count = 1
Object created. Count = 2
Object created. Count = 3
```

---

### 2️⃣ 2. Static Method

- A **static method belongs to the class**, not to any specific object.
- It can be called **without creating an object** of the class (`ClassName.methodName()`).

#### 💻 Java Program Example:
```java
public class StaticDemo
{
    // Static method
    static void greet()
    {
        System.out.println("Hello! This is a static method.");
    }

    // Non-static method
    void showMessage()
    {
        System.out.println("This is a non-static method.");
    }

    public static void main(String[] args)
    {
        // Calling static method directly without creating an object
        greet();

        // Calling non-static method requires an object
        StaticDemo obj = new StaticDemo();
        obj.showMessage();
    }
}
```

#### 🖥️ Output:
```text
Hello! This is a static method.
This is a non-static method.
```

> **📌 Note on Static Methods**:
> 1. A static method **cannot access non-static (instance) variables or methods directly**.
> 2. Static methods **cannot use `this` or `super` keywords**.
> 3. Static methods are often used for **utility or helper functions** like `Math.pow()`, `Math.sqrt()`, `Arrays.sort()`.

---

### 3️⃣ 3. Static Block

- A **static block is used to initialize static variables**.
- It is **executed only once**, when the class is first loaded into memory by the JVM (even before the `main()` method runs).
- Useful for setting up complex static values, database connection pools, or loading native drivers.

#### 💻 Java Program Example:
```java
public class StaticDemo
{
    static int maxLimit;

    static
    {
        maxLimit = 100;  // static block for initialization
        System.out.println("Static block executed.");
    }

    public static void main(String[] args)
    {
        System.out.println("Max Limit : " + maxLimit);
        System.out.println("Main method executed");
    }
}
```

#### 🖥️ Output:
```text
Static block executed.
Max Limit : 100
Main method executed
```

---

### 4️⃣ 4. Static Class (Nested Class)

- Java allows the creation of **static nested classes** (a class inside another class declared as `static`).
- A static nested class **can access only static members** of the outer class.
- It **doesn't need an instance of the outer class** to be instantiated.

#### 💻 Java Program Example:
```java
public class Outer
{
    // Static nested class
    static class Inner
    {
        void show()
        {
            System.out.println("Static nested class method.");
        }
    }

    public static void main(String[] args)
    {
        // Creating an object of the static nested class directly
        Outer.Inner obj = new Outer.Inner();
        obj.show();
    }
}
```

#### 🖥️ Output:
```text
Static nested class method.
```

---

## 📊 Summary Comparison: Static vs Instance Members

| Feature | Static Member (Class-Level) | Instance Member (Object-Level) |
|:---|:---|:---|
| **Memory Location** | **Metaspace / Method Area** | **Heap Memory** (inside each object) |
| **Creation Timing** | Allocated **only once** when class loads | Allocated **every time** `new` is called |
| **Access Syntax** | `ClassName.member` | `objectReference.member` |
| **Access to Instance Fields** | ❌ Cannot access instance fields directly | ✅ Can access both instance & static |
| **`this` & `super` Usage** | ❌ Forbidden in static context | ✅ Fully supported |
