---
id: "java-oops-introduction"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "OOP's Introduction"
slug: "java-oops-introduction"
summary: "Comprehensive introduction to Object Oriented Programming in Java: Programming Paradigms (Procedural, OOP, Functional, Declarative), What is OOPS, the 6 Main Pillars of OOP (Class, Object, Inheritance, Polymorphism, Abstraction, Encapsulation), and why Java is strongly OOP but not purely OOP."
eli10: "A programming paradigm is a style of building things. OOP is like building with LEGO blocks (Objects): each brick has its own color and shape (state) and can snap into other bricks (behavior)."
mentalModel: "Software as a universe of collaborating autonomous agents (Objects), each managing their own internal state and communicating via messages (Method calls)."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["OOP", "Object Oriented Programming", "Programming Paradigm", "6 Pillars", "Class", "Object", "Pure OOP", "Strongly OOP"]
animationType: "oops-intro"
codeSnippet:
  language: "java"
  explanation: "Real-world modeling of an entity using Object-Oriented principles."
  code: |
    // 1. Class: A blueprint for creating objects
    class Car {
        // State (Fields)
        String brand;
        int speed;

        // Behavior (Method)
        void accelerate() {
            speed += 10;
            System.out.println(brand + " speed is now " + speed + " km/h 🚗");
        }
    }

    public class OopsIntroDemo {
        public static void main(String[] args) {
            // 2. Object: An instance of a class
            Car myCar = new Car();
            myCar.brand = "Tesla Model 3";
            myCar.accelerate();
        }
    }
---

# 🌐 Object Oriented Programming in Java

---

## 🧭 What is Programming Paradigm ?

A **programming paradigm** is a way or style of programming based on certain principles and techniques.  
It defines how code is written, structured, and executed.

Some main programming paradigms are:

| Paradigm | Description | Languages |
|:---|:---|:---|
| **Procedural** | Step-by-step execution using functions and procedures. | C, Pascal, Fortran |
| **Object-Oriented (OOP)** | Uses objects and classes to structure code for reusability. | Java, C++, Python, C# |
| **Functional** | Focuses on pure functions, immutability, and avoiding state changes. | Haskell, Lisp, Scala, JavaScript (functional features) |
| **Declarative** | Describes what to do rather than how to do it. | SQL, Prolog, HTML |

---

## 🏛️ What is OOP's ?

**OOPS** stands for **Object-Oriented Programming System**.  
**OOPs in Java** is a programming paradigm or approach that organizes code using **objects and classes** to improve **reusability, modularity, and maintainability**.

---

## 🏛️ 6 Main Pillars of OOP's

The **6 main pillars of OOP's** are:

1. **Class**: A blueprint for creating objects (e.g., `Car`, `Person`).
2. **Object**: An instance of a class (e.g., `myCar`, `john`).
3. **Inheritance**: Allowing a class to inherit properties and behavior from another class.
4. **Polymorphism**: Having multiple methods with the same name but different behavior (method overloading/overriding).
5. **Abstraction**: Hiding complex details and showing only the essential features.
6. **Encapsulation**: Hiding data using private variables and public getter/setter methods.

```text
                                  6 Pillars of OOP's
             ┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
             ▼              ▼              ▼              ▼              ▼              ▼
           Class          Object      Inheritance    Polymorphism    Abstraction    Encapsulation
        (Blueprint)     (Instance)     (Reusability)  (Many Forms)   (Hide Details)  (Data Hiding)
```

---

## ⚠️ NOTE : Is Java a Purely Object Oriented Language?

> **NOTE** : Java is a **strongly Object Oriented Language** but **not purely Object oriented** because Java has **primitive data types** (`int`, `char`, `boolean`, etc.) and the **`static` keyword** concept which is not related or tied to objects.
>
> **Smalltalk, Ruby, Scala** etc. are purely object oriented languages where literally everything (including numbers and booleans) is an Object.
