---
id: "java-super-keyword"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "\"super\" Keyword in Java"
slug: "java-super-keyword"
summary: "Master the 'super' keyword in Java: Introduction, Definition as superclass reference variable, and the 3 Core Usages with full programs and outputs (Refer to parent instance variable, invoke parent method, and invoke parent constructor via super())."
eli10: "'super' is like calling your parents on the phone when you need help with a family recipe. If both you and your mom have a 'cookDinner()' recipe, 'super.cookDinner()' calls your mom's recipe!"
mentalModel: "'super' is a compiler reference to the immediate parent class namespace inside a subclass, allowing explicit access to shadowed parent fields and overridden methods."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["super", "super keyword", "Parent Class", "super()", "Method Overriding", "Constructor Chaining", "this vs super", "OOP"]
animationType: "super-keyword"
codeSnippet:
  language: "java"
  explanation: "Demonstrating the 'super' keyword in Java."
  code: |
    class Parent {
        int num = 100;
    }

    class Child extends Parent {
        int num = 200;

        void display() {
            System.out.println("Child num: " + num);
            System.out.println("Parent num: " + super.num);  // referring to parent class variable
        }
    }

    public class SuperDemo {
        public static void main(String[] args) {
            Child c = new Child();
            c.display();
        }
    }
---

# ⬆️ "super" Keyword in Java

---

## 📖 Introduction

In Java, the **`super` keyword is a reference variable**.
- It is used to **refer to the immediate parent class object** (i.e., the superclass of the current object).
- This keyword is **mainly used in inheritance** when a subclass needs to access members (methods, constructors, or variables) of its parent class.

---

## 🎯 Use of `super` Keyword:

1. **It is used to refer to the parent class instance variable.**
2. **It is used to refer to the parent class method.**
3. **It is used to refer to the parent class constructor (`super()`).**

---

### 1️⃣ 1. It is used to refer to the parent class instance variable

When a child subclass declares a variable with the same name as an instance variable in its parent class (variable shadowing), `super.variableName` is used to explicitly refer to the parent's field.

#### 💻 Java Program Example:
```java
class Parent
{
    int num = 100;
}

class Child extends Parent
{
    int num = 200;

    void display()
    {
        System.out.println("Child num: " + num);
        System.out.println("Parent num: " + super.num);  // referring to parent class variable
    }
}

public class SuperDemo
{
    public static void main(String[] args)
    {
        Child c = new Child();
        c.display();
    }
}
```

#### 🖥️ Output:
```text
Child num: 200
Parent num: 100
```

---

### 2️⃣ 2. It is used to refer to the parent class method

When a child class overrides a method from its parent superclass, `super.methodName()` allows invoking the parent class implementation.

#### 💻 Java Program Example:
```java
class Parent
{
    void showMessage()
    {
        System.out.println("Hello from Parent class showMessage() method");
    }
}

class Child extends Parent
{
    void display()
    {
        // Calling parent class method using 'super'
        super.showMessage();
        System.out.println("Inside Child class display() method");
    }
}

public class SuperDemo
{
    public static void main(String[] args)
    {
        Child obj = new Child();
        obj.display();
    }
}
```

#### 🖥️ Output:
```text
Hello from Parent class showMessage() method
Inside Child class display() method
```

---

### 3️⃣ 3. It is used to refer to the parent class constructor (`super()`)

Used to invoke the constructor of the immediate parent class.

#### 💻 Java Program Example:
```java
class Parent
{
    Parent()
    {
        System.out.println("Parent constructor called");
    }
}

class Child extends Parent
{
    Child()
    {
        super(); // calls Parent's constructor
        System.out.println("Child constructor called");
    }
}

public class SuperDemo
{
    public static void main(String[] args)
    {
        Child c = new Child();
    }
}
```

#### 🖥️ Output:
```text
Parent constructor called
Child constructor called
```

> **📌 Note: `super()` must be the first statement in a constructor**:
> - If used, the call to the parent class constructor (`super()`) **must appear as the very first statement** in the child class constructor.
> - If not explicitly written, Java automatically inserts a default `super();` call.

---

## 📊 Summary Comparison: `this` vs `super`

| Feature | `this` Keyword | `super` Keyword |
|:---|:---|:---|
| **Target Reference** | Refers to the **current class instance**. | Refers to the **immediate parent class instance**. |
| **Constructor Invocation** | `this()` calls an overloaded constructor in the **same class**. | `super()` calls a constructor in the **parent class**. |
| **Placement Rule** | Must be the **1st line** in constructor. | Must be the **1st line** in constructor. |
| **Coexistence Rule** | **Cannot use both `this()` and `super()`** in the same constructor! | **Cannot use both `this()` and `super()`** in the same constructor! |
| **Static Context** | ❌ Cannot be used inside `static` methods. | ❌ Cannot be used inside `static` methods. |
