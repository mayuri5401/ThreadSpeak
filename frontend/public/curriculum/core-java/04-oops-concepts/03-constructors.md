---
id: "java-constructors"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Constructors"
slug: "java-constructors"
summary: "Master Constructors in Java: Definition, Use of Constructor, Rules for Constructors, 3 Types of Constructors (Default, No-Args, Parameterized), Constructor Overloading, Constructor Chaining (this() and super()), Constructor vs Method Comparison Table, Copy Constructors, and Private Constructors."
eli10: "A Constructor is like the initial setup wizard of an app. When you install (create) a new object, the constructor sets up initial usernames and settings!"
mentalModel: "The 'new' keyword creates and allocates physical memory on the JVM Heap. The Constructor initializes that memory with state and logic."
difficulty: "Beginner"
estimatedMinutes: 25
tags: ["Constructors", "Default Constructor", "No-Args Constructor", "Parameterized Constructor", "Constructor Overloading", "Constructor Chaining", "this()", "super()", "Private Constructor"]
animationType: "constructors"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Parameterized Constructor and Constructor Chaining in Java."
  code: |
    class Student {
        String name;
        int rollno;

        // 1. No-Args Constructor (Chains to Parameterized via this())
        Student() {
            this("Guest Student", 0); // Constructor Chaining
        }

        // 2. Parameterized Constructor
        Student(String name, int rollno) {
            this.name = name;
            this.rollno = rollno;
        }

        void display() {
            System.out.println("Name: " + name + ", Roll No.: " + rollno);
        }

        public static void main(String[] args) {
            Student s1 = new Student();
            Student s2 = new Student("Deepak", 101);

            s1.display(); // Name: Guest Student, Roll No.: 0
            s2.display(); // Name: Deepak, Roll No.: 101
        }
    }
---

# 🏗️ Constructors in Java

---

## ❓ What is Constructor in Java ?

A **constructor in Java** is a special type of method used to **initialize objects**.
- It is called when an instance of the class is created (when an object of a class is created).
- Whenever an object is created using the **`new`** keyword, **at least one constructor is called**.

### Syntax:
```java
access-modifiers ClassName(list of parameters)
{
    // Body
}
```

### Example:
```java
public class Test
{
    // Constructor
    public Test()
    {
        // Body
    }

    public static void main(String[] args)
    {
        Test t = new Test(); // Constructor called automatically when we create object
    }
}
```

---

## 🎯 Use of Constructor

Constructors are used to **initialize the object**.  
This means that a constructor **assigns values to instance variables** when an object is created. This can be done manually by the programmer or automatically by Java using a default constructor.

> **📌 NOTE** : **Constructors are NOT used to create an object.** They are only used to **initialize an object**.  
> The **`new`** keyword creates the object and allocates memory in the Heap; the constructor initializes its fields.

---

## 📜 Rules for Constructors in Java

Below are the mandatory rules for constructors in Java:

1. **The constructor must have the SAME name as the class name.**
2. **A constructor DOES NOT have a return type** (not even `void`).
   - *If you add a return type like `void Test()`, Java treats it as a regular method, NOT a constructor!*
3. **Constructors can have any access modifier** (`public`, `private`, `protected`, or `default`).
   - *Constructors CANNOT have non-access modifiers like `static`, `final`, `abstract`, `synchronized`.*
4. **The constructor is called automatically** when an object is created using `new`.

---

## 🏷️ Types of Constructors in Java

There are **3 types of constructors in Java**:
1. **Default Constructor** (created automatically by compiler)
2. **No-Args (No Argument) Constructor** (created by programmer)
3. **Parameterized Constructor** (created by programmer)

---

### 1️⃣ Default Constructor
If the programmer **does not create any constructor**, then the Java compiler automatically creates one constructor which is known as the **Default Constructor**.
- It initializes object properties with default values (`0`, `null`, `false`).

#### Syntax:
```java
class ClassName
{
    // Default constructor is automatically provided by Java Compiler
}
```

#### Example:
```java
public class Test
{
    // Here programmer didn't create any constructor, 
    // so Java compiler will create default constructor automatically.
    
    public static void main(String[] args)
    {
        Test t = new Test(); // Default constructor called automatically
    }
}
```

#### 📌 Important Points for Default Constructor:
- The access modifier of the Default Constructor is the same as that of the class. If a class is `public`, the default constructor is `public`, and so on.
- The Default Constructor has **no parameters**.
- The Default Constructor automatically calls the superclass constructor (`super()`):

```java
public Test()
{
    super();
}
```

---

### 2️⃣ No-Args (No Argument) Constructor
If a programmer **explicitly creates a constructor without any parameters**, it is known as a **No Argument Constructor**.
- It is used to initialize objects with predefined default values or perform basic startup configuration.

#### Syntax:
```java
class ClassName
{
    // No-Argument Constructor
    ClassName()
    {
        // Initialization code (if needed)
    }
}
```

#### Example:
```java
public class Student
{
    String name;

    // No-Argument Constructor
    Student()
    {
        name = "Deepak"; // Assigning default value
    }

    void display()
    {
        System.out.println("Student Name: " + name);
    }

    public static void main(String[] args)
    {
        Student s1 = new Student(); // Calls no-argument constructor
        s1.display(); // Output: Student Name: Deepak
    }
}
```

**Output:**
```text
Student Name: Deepak
```

---

### 3️⃣ Parameterized Constructor
If a programmer creates a constructor with parameters, it is known as a **Parameterized Constructor**.

#### It is used to:
- **Initialize objects with specific, custom values** instead of default values.
- **Avoid the need for setter methods** immediately after object creation.
- **Improve code readability and safety** by directly passing required values at instantiation.

#### Syntax:
```java
class ClassName
{
    ClassName(dataType parameter1, dataType parameter2)
    {
        // Initialization code
    }
}
```

#### Example:
```java
class Student
{
    String name;
    int rollno;

    // Parameterized Constructor
    Student(String n, int rn)
    {
        name = n;
        rollno = rn;
    }

    void display()
    {
        System.out.println("Name: " + name + ", Roll No.: " + rollno);
    }

    public static void main(String[] args)
    {
        Student s1 = new Student("Deepak", 101); // Passing values
        s1.display();  // Output: Name: Deepak, Roll No.: 101
    }
}
```

**Output:**
```text
Name: Deepak, Roll No.: 101
```

---

## 🔄 Constructor Overloading

**Constructor Overloading** in Java is a technique of having **more than one constructor with different parameter lists** (different number of arguments, different data types, or different argument order) within the same class.

```java
public class Employee {
    int id;
    String name;
    double salary;

    // 1. No-args constructor
    Employee() {
        this.id = 0;
        this.name = "Unknown";
        this.salary = 30000.0;
    }

    // 2. 2-parameter constructor
    Employee(int id, String name) {
        this.id = id;
        this.name = name;
        this.salary = 50000.0;
    }

    // 3. 3-parameter constructor
    Employee(int id, String name, double salary) {
        this.id = id;
        this.name = name;
        this.salary = salary;
    }
}
```

---

## ⛓️ Constructor Chaining (`this()` and `super()`)

**Constructor Chaining** is the process of calling one constructor from another constructor:

1. **Within the Same Class (`this()`)**: Used to delegate initialization from one constructor to an overloaded constructor in the same class.
2. **From Subclass to Superclass (`super()`)**: Used to call the constructor of the parent class.

> **⚠️ CRITICAL RULES**:
> - `this()` or `super()` **MUST be the very first statement** in any constructor body!
> - You **cannot use both `this()` and `super()` in the same constructor** because both require being on the first line.

```java
class Vehicle {
    String type;
    Vehicle(String type) {
        this.type = type;
        System.out.println("Vehicle super constructor called");
    }
}

class Car extends Vehicle {
    String model;

    Car() {
        this("Tesla Model 3"); // Calls 1-arg Car constructor
    }

    Car(String model) {
        super("Electric Automobile"); // Calls Vehicle super constructor
        this.model = model;
    }
}
```

---

## 📊 Master Comparison: Constructor vs Method

| Feature | Constructor | Method |
|:---|:---|:---|
| **Purpose** | Used to **initialize an object's state**. | Used to **execute business behavior & computations**. |
| **Name** | Must have the **exact same name** as the class. | Can have **any valid identifier name**. |
| **Return Type** | **No return type** (not even `void`). | **Must specify a return type** (`void`, `int`, etc.). |
| **Invocation** | Called **automatically** when `new` is executed. | Called **explicitly** using object reference (`obj.method()`). |
| **Compiler Default** | Provided automatically if 0 constructors exist. | **Never provided automatically** by compiler. |
| **Inheritance** | **Cannot be inherited** by child classes. | **Can be inherited** and overridden by subclasses. |

---

## 🔒 Special Case: Private Constructors & Singleton Pattern

If a constructor is declared **`private`**, objects of that class **cannot be instantiated from outside the class using `new`**.

This is used in:
1. **Singleton Design Pattern**: Ensuring only 1 single instance exists throughout JVM lifecycle.
2. **Utility Classes** (e.g. `java.lang.Math`, `java.util.Collections`): Classes with only `static` methods that should never be instantiated.
