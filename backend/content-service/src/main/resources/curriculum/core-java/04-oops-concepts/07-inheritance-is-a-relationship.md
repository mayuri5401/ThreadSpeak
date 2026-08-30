---
id: "java-inheritance-is-a-relationship"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Inheritance (IS-A Relationship)"
slug: "java-inheritance-is-a-relationship"
summary: "Master Inheritance (IS-A Relationship) in Java: Introduction, how to achieve inheritance (extends vs implements), Program 1 (extends) and Program 2 (implements), Advantages & Disadvantages, the 5 Types of Inheritance (Single, Multilevel, Hierarchical, Multiple via Interfaces, Hybrid), and Important Points & Rules."
eli10: "Inheritance is like inheriting eye color or traits from your parents! A Car IS-A Vehicle, so it gets the engine starting capability automatically!"
mentalModel: "Subclass objects allocate parent fields in memory and link to the parent virtual method table (vtable) for method resolution."
difficulty: "Intermediate"
estimatedMinutes: 25
tags: ["Inheritance", "IS-A", "extends", "implements", "Single Inheritance", "Multilevel Inheritance", "Hierarchical Inheritance", "Multiple Inheritance", "Diamond Problem", "OOP"]
animationType: "inheritance"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Class Inheritance using extends keyword in Java."
  code: |
    class Vehicle {
        void start() {
            System.out.println("Vehicle starts.");
        }
    }

    class Car extends Vehicle {
        void drive() {
            System.out.println("Car drives.");
        }
    }

    public class MainApp {
        public static void main(String[] args) {
            Car myCar = new Car();
            myCar.start(); // inherited from Vehicle
            myCar.drive(); // specific to Car
        }
    }
---

# 🧬 Inheritance (IS-A Relationship) in Java

---

## 📖 Introduction

**Inheritance** in Java means **acquiring the properties and behaviors of a parent class in a child class**.
- It allows a **subclass (child class)** to inherit fields and methods from a **superclass (parent class)**, promoting **code reuse** and **method overriding**.
- Inheritance represents an **IS-A relationship**, also known as a **parent-child relationship**. It signifies that a subclass is a type of its superclass.

### 💡 Real-World Examples:
- `A Car IS-A Vehicle.`
- `A Dog IS-A Animal.`
- `A Surgeon IS-A Doctor.`

---

## ⚙️ How to Achieve Inheritance in Java ?

Inheritance is achieved in Java using:
1. **`extends` keyword**: For class-to-class inheritance.
2. **`implements` keyword**: For class-to-interface inheritance.

---

### 📝 Program 1: Using `extends` Keyword (Class Inheritance)

```java
class Vehicle {
    void start() {
        System.out.println("Vehicle starts.");
    }
}

class Car extends Vehicle {
    void drive() {
        System.out.println("Car drives.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.start(); // inherited from Vehicle
        myCar.drive(); // specific to Car
    }
}
```

#### 🖥️ Output:
```text
Vehicle starts.
Car drives.
```

---

### 📝 Program 2: Using `implements` Keyword (Interface Inheritance)

```java
interface Animal {
    void eat();
}

class Dog implements Animal {
    public void eat() {
        System.out.println("Dog eats.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        Dog myDog = new Dog();
        myDog.eat(); // inherited from Animal contract

        // Animal myAnimal = new Animal(); 
        // ❌ Error: Cannot create an object of an interface directly!
    }
}
```

#### 🖥️ Output:
```text
Dog eats.
```

---

## 🌟 Advantages of Inheritance

1. **Code Reusability**: Inheritance allows a child class to reuse the code of its parent class without rewriting it.
2. **Easy Maintenance**: Changes made in the parent class automatically propagate to child classes, simplifying maintenance.
3. **Method Overriding**: Enables a child class to provide a specific, customized implementation of a parent method.
4. **Polymorphism**: Inheritance forms the foundation for **runtime polymorphism (dynamic method dispatch)**.

---

## ⚠️ Disadvantages of Inheritance

1. **Tight Coupling**: Inheritance creates a tight coupling between parent and child classes. Changing the parent class implementation may break subclasses (Fragile Base Class problem).
2. **Increased Complexity**: Deep inheritance hierarchies make code harder to trace, navigate, and test.

> **📌 NOTE** : Inheritance should be used carefully. It is not always the best solution for code reuse. In many scenarios, **composition (using objects of other classes / HAS-A)** provides a cleaner, more modular design.

---

## 🏷️ Types of Inheritance in Java

There are **5 types of inheritance in Object-Oriented Programming**:

```text
       1. Single             2. Multilevel           3. Hierarchical
        ┌─────┐                 ┌─────┐                  ┌─────┐
        │  A  │                 │  A  │                  │  A  │
        └──┬──┘                 └──┬──┘               ┌──┴─────┴──┐
           │                       │                  ▼           ▼
        ┌──▼──┐                 ┌──▼──┐            ┌─────┐     ┌─────┐
        │  B  │                 │  B  │            │  B  │     │  C  │
        └─────┘                 └──┬──┘            └─────┘     └─────┘
                                   │
                                ┌──▼──┐
                                │  C  │
                                └─────┘

      4. Multiple (Interfaces)                 5. Hybrid (Interfaces)
        ┌─────┐     ┌─────┐                      ┌─────┐     ┌─────┐
        │  A  │     │  B  │                      │  A  │     │  B  │
        └──┬──┘     └──┬──┘                      └──┬──┘     └──┬──┘
           └─────┬─────┘                            └─────┬─────┘
                 ▼                                        ▼
              ┌─────┐                                  ┌─────┐
              │  C  │                                  │  C  │
              └─────┘                                  └─────┘
```

1. **Single Inheritance**: One class inherits the properties and behaviors of one parent class (`A -> B`).
2. **Multilevel Inheritance**: One class inherits from a parent, and that class is inherited by another class (`A -> B -> C`).
3. **Hierarchical Inheritance**: Multiple classes inherit from a single parent class (`A -> B` and `A -> C`).
4. **Multiple Inheritance**: One class inherits from multiple parent classes.  
   *(⚠️ Not supported in Java directly with classes to prevent ambiguity; achieved using **interfaces**).*
5. **Hybrid Inheritance**: A combination of two or more types of inheritance.  
   *(⚠️ Achieved using **interfaces** in Java).*

---

## 📌 Important Points to Remember

- **No Multiple / Hybrid Class Inheritance**: Java does not support multiple and hybrid inheritance with classes to avoid ambiguity, specifically the **Diamond Problem**.
- **Single Class Extension**: A class can extend only one class at a time (`class B extends A`).
- **Private & Constructors are NOT Inherited**: Constructors and `private` members of the parent class are **not inherited** by the child class.
- **Multiple Interface Implementation**: A class can implement multiple interfaces (`class C implements A, B`), which is Java's clean way of achieving multiple inheritance.
- **`super` keyword**: Used to refer to the parent class (e.g. `super.method()` or `super(...)`).
- **`this` keyword**: Used to refer to the current class instance (e.g. `this.variable = variable`).
