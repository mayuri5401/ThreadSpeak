---
id: "java-this-keyword"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "\"this\" Keyword in Java"
slug: "java-this-keyword"
summary: "Master the 'this' keyword in Java: Introduction, Definition as reference variable, and the 6 Core Usages with full programs and outputs (Refer to current instance variable, invoke current method, constructor chaining via this(), pass this to method, pass this to constructor, return this for method chaining)."
eli10: "'this' is like pointing at yourself. When a teacher asks 'Who broke the vase?', you point at yourself: 'this person here'. In Java, 'this' refers to the exact object currently executing the code."
mentalModel: "'this' is an implicit reference parameter passed automatically to all non-static instance methods and constructors pointing to the caller's Heap address."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["this", "this keyword", "Variable Shadowing", "Constructor Chaining", "Method Chaining", "this()", "OOP"]
animationType: "this-keyword"
codeSnippet:
  language: "java"
  explanation: "Demonstrating the 'this' keyword in Java."
  code: |
    public class ThisDemo {
        int no = 10;

        void m1(int no) {
            System.out.println("1. no : " + no);       // Prints local parameter
            System.out.println("2. no : " + this.no);  // Refers to instance variable
        }

        public static void main(String[] args) {
            ThisDemo obj = new ThisDemo();
            obj.m1(20);
        }
    }
---

# 👈 "this" Keyword in Java

---

## 📖 Introduction

In Java, the **`this` keyword is a reference variable**.
- It **refers to the current class object** (the object whose method or constructor is being invoked).

---

## 🎯 Use of `this` Keyword:

1. **It is used to refer to the current class instance variable.**
2. **It is used to refer to the current class method.**
3. **It is used to refer to the current class constructor (`this()`).**
4. **It is used to pass the current class instance as a parameter to the method.**
5. **It is used to pass the current class instance as a parameter to the constructor.**
6. **It is used to return the current class instance from the method (Method Chaining).**

---

### 1️⃣ 1. It is used to refer to the current class instance variable

When a method or constructor parameter has the same name as an instance variable (variable shadowing), `this.` is used to disambiguate the instance field from the local parameter.

#### 💻 Java Program Example 1:
```java
public class ThisDemo
{
    int no = 10;

    void m1(int no)
    {
        System.out.println("1. no : " + no);       // Prints the value of the local parameter 'no' (method argument)

        System.out.println("2. no : " + this.no);  // 'this.no' refers to the instance variable of the current object
    }

    public static void main(String[] args)
    {
        ThisDemo obj = new ThisDemo();
        obj.m1(20);
    }
}
```

#### 🖥️ Output:
```text
1. no : 20
2. no : 10
```

#### 💻 Java Program Example 2 (Constructor Variable Shadowing):
```java
class Student
{
    int id;
    String name;

    // Constructor with parameters having the same name as instance variables
    Student(int id, String name)
    {
        this.id = id;         // 'this.id' refers to the instance variable
        this.name = name;     // 'name' on the right refers to the parameter
    }

    void display()
    {
        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
    }

    public static void main(String[] args)
    {
        Student s1 = new Student(101, "Deepak");
        s1.display();
    }
}
```

#### 🖥️ Output:
```text
ID: 101
Name: Deepak
```

---

### 2️⃣ 2. It is used to refer to the current class method

You can invoke another method of the current class explicitly using `this.methodName()`. (If omitted, the compiler inserts it implicitly).

#### 💻 Java Program Example:
```java
public class ThisDemo
{
    void showMessage()
    {
        System.out.println("Hello from showMessage() method");
    }

    void display()
    {
        // Calling another method of the same class using 'this'
        this.showMessage();  // Optional: can also call showMessage() directly
        System.out.println("Inside display() method");
    }

    public static void main(String[] args)
    {
        ThisDemo obj = new ThisDemo();
        obj.display();
    }
}
```

#### 🖥️ Output:
```text
Hello from showMessage() method
Inside display() method
```

---

### 3️⃣ 3. It is used to refer to the current class constructor (`this()`)

Used to call another constructor within the same class (Constructor Chaining).

#### 💻 Java Program Example:
```java
public class ThisDemo
{
    // Default constructor
    ThisDemo()
    {
        System.out.println("Default constructor called");
    }

    // Parameterized constructor
    ThisDemo(String name)
    {
        // Calling default constructor using 'this()'
        this();  // Must be the first statement in the constructor
        System.out.println("Hello, " + name);
    }

    public static void main(String[] args)
    {
        // Creating object using parameterized constructor
        ThisDemo obj = new ThisDemo("Deepak");
    }
}
```

#### 🖥️ Output:
```text
Default constructor called
Hello, Deepak
```

> **📌 Note: `this()` must be the first statement in a constructor**:
> - If used, the call to another constructor in the same class (`this()`) **must appear as the very first statement** in the constructor body.
> - It is used to achieve **constructor chaining** within the same class to eliminate redundant initialization logic.

---

### 4️⃣ 4. It is used to pass the current class instance as a parameter to the method

Useful when an object needs to delegate work to an external utility method while passing its own instance.

#### 💻 Java Program Example:
```java
public class ThisDemo
{
    void display(ThisDemo obj)
    {
        System.out.println("display() method is called");
    }

    void call()
    {
        // Passing current object as argument using 'this'
        display(this);
    }

    public static void main(String[] args)
    {
        ThisDemo obj = new ThisDemo();
        obj.call();
    }
}
```

#### 🖥️ Output:
```text
display() method is called
```

---

### 5️⃣ 5. It is used to pass the current class instance as a parameter to the constructor

Useful when a child helper object needs a reference back to its enclosing parent instance.

#### 💻 Java Program Example:
```java
class A
{
    int value = 10;

    A()
    {
        // Passing current instance of A to B's constructor
        B b = new B(this);
    }
}

class B
{
    // Constructor of class B that accepts a reference to class A
    B(A obj)
    {
        System.out.println("Constructor of B is called");
        System.out.println("Value from class A: " + obj.value);
    }
}

public class ThisDemo
{
    public static void main(String[] args)
    {
        A a = new A();
    }
}
```

#### 🖥️ Output:
```text
Constructor of B is called
Value from class A: 10
```

---

### 6️⃣ 6. It is used to return the current class instance from the method (Method Chaining)

By returning `this`, you can chain multiple method invocations together fluently on a single line.

#### 💻 Java Program Example:
```java
public class ThisDemo
{
    int no;

    // Method that sets the no and returns the current class instance
    ThisDemo setValue(int no)
    {
        this.no = no;
        return this; // returning current object
    }

    // Method to display the no
    void display()
    {
        System.out.println("Number: " + no);
    }

    public static void main(String[] args)
    {
        // Method chaining using returned instance
        ThisDemo obj = new ThisDemo();
        obj.setValue(100).display();  // chaining method call
    }
}
```

#### 🖥️ Output:
```text
Number: 100
```
