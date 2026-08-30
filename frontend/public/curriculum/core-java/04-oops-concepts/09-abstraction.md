---
id: "java-abstraction"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Abstraction"
slug: "java-abstraction"
summary: "Master Abstraction in Java: Definition, Car Driving Real-World Analogy, How to achieve Abstraction (Abstract Classes vs Interfaces), Abstract Methods & Rules, Abstract Classes & Rules, Program Without Abstraction & Disadvantages, Program With Abstraction, and Master Comparison Matrix."
eli10: "Abstraction hides the complex engine under the hood and gives you simple pedals and a steering wheel to drive!"
mentalModel: "Abstraction defines the 'WHAT' (contract & interface), leaving the 'HOW' (internal implementation) to concrete subclasses."
difficulty: "Intermediate"
estimatedMinutes: 25
tags: ["Abstraction", "Abstract Class", "Abstract Method", "Polymorphism", "Contracts", "Java OOP"]
animationType: "abstraction"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Abstraction and Abstract Classes in Java."
  code: |
    abstract class Vehicle {
        int no_of_tyres;

        // Concrete method (reusable logic)
        void displayTyres() {
            System.out.println("This vehicle has " + no_of_tyres + " tyres.");
        }

        // Abstract method (mandatory contract for subclasses)
        abstract void start();
    }

    class Car extends Vehicle {
        Car() { no_of_tyres = 4; }

        @Override
        void start() {
            System.out.println("Car starts with key ignition.");
        }
    }

    class Scooter extends Vehicle {
        Scooter() { no_of_tyres = 2; }

        @Override
        void start() {
            System.out.println("Scooter starts with kick or self-start.");
        }
    }

    public class MainApp {
        public static void main(String[] args) {
            Vehicle v1 = new Car();
            v1.displayTyres();
            v1.start();

            System.out.println();

            Vehicle v2 = new Scooter();
            v2.displayTyres();
            v2.start();
        }
    }
---

# 🎭 Abstraction in Java

---

## 📖 Introduction

**Abstraction** is the foundational OOP concept of:
> **Hiding internal implementation details and showing only the essential features to the user.**

### 💡 Real World Example:
When you drive a car, you only need to know how to operate the **steering wheel, pedals, and gear shift**. You don't need to understand how the internal combustion engine injects fuel, how the brake hydraulics compress fluid, or how the transmission gearbox is designed.  
— *Concept popularized by James Gosling*

---

## ⚙️ How to Achieve Abstraction in Java ?

We can achieve Abstraction in Java in **two ways**:
1. **Using Abstract Classes** (Achieves $0\%$ to $100\%$ abstraction — can have both abstract & concrete methods).
2. **Using Interfaces** (Achieves $100\%$ pure abstraction contract).

---

## 🛑 Abstract Methods

### 📌 Introduction:
An **abstract method** is a method that is declared **without an implementation (no method body)**.
- It provides only the **method signature** and forces concrete subclasses to provide the actual implementation.
- Declared using the **`abstract`** keyword.

### 📝 Syntax & Example:
```java
// Syntax:
abstract returnType methodName(parameters);

// Example:
abstract void makeSound(); // Abstract method – no body, ends with semicolon (;)
```

### 📜 Rules of Abstract Method:
1. **No method body** — ends immediately with a semicolon (`;`).
2. **Must be declared inside an abstract class or interface**.
3. A class that contains at least one abstract method **must be declared abstract**.
4. Abstract methods **must be overridden by concrete subclasses** (unless the subclass is also abstract).
5. **Cannot be `private`, `static`, or `final`** — because it must be overridden!

---

## 🏛️ Abstract Class

### 📌 Introduction:
An **abstract class** in Java is a class that is declared using the **`abstract`** keyword.
- It can contain a mix of **abstract methods** (without body) and **concrete methods** (with body).
- It **cannot be instantiated** (you cannot create objects of it directly using `new`).

### 📝 Syntax & Example:
```java
abstract class Car {
    // Abstract method (must be implemented by subclasses)
    abstract void startEngine();

    // Concrete method (reusable behavior)
    void fuelType() {
        System.out.println("This car uses petrol or diesel.");
    }
}

class Sedan extends Car {
    @Override
    void startEngine() {
        System.out.println("Sedan engine started with key ignition.");
    }
}
```

### 📜 Rules of Abstract Class:
1. Must be declared using the **`abstract`** keyword.
2. Can contain both abstract and concrete methods (or even zero abstract methods).
3. **Cannot be instantiated directly** (`new Vehicle()` ❌).
4. Subclasses must override all inherited abstract methods or be declared abstract themselves.
5. **Can have constructors, static methods, and final methods**.
6. Can extend another class and implement interfaces.

---

## ❌ Program Without Abstraction (The Problem)

```java
// Car class without abstraction
class Car {
    int no_of_tyres = 4;

    void displayTyres() {
        System.out.println("Car has " + no_of_tyres + " tyres.");
    }

    void start() {
        System.out.println("Car starts with a key ignition.");
    }
}

// Scooter class without abstraction
class Scooter {
    int no_of_tyres = 2;

    void displayTyres() {
        System.out.println("Scooter has " + no_of_tyres + " tyres.");
    }

    void start() {
        System.out.println("Scooter starts with a kick or self-start.");
    }
}

// Main class to run the program
public class MainApp {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.displayTyres();
        myCar.start();

        System.out.println();

        Scooter myScooter = new Scooter();
        myScooter.displayTyres();
        myScooter.start();
    }
}
```

### 🖥️ Output:
```text
Car has 4 tyres.
Car starts with a key ignition.

Scooter has 2 tyres.
Scooter starts with a kick or self-start.
```

---

## ⚠️ Disadvantages of Not Using Abstraction

1. **No Polymorphism**:
   - We cannot use a common parent reference to refer to multiple vehicle types (`Vehicle vehicle = new Car();` is impossible because no common `Vehicle` type exists).
   - Limits architectural flexibility and prevents uniform collections (`List<Vehicle>`).
2. **Code Duplication**:
   - Common logic like `displayTyres()` is copy-pasted in every class (`Car`, `Scooter`, etc.).
   - In large enterprise systems, this leads to duplicate code, difficult maintenance, and bug propagation.
3. **No Method Enforcement**:
   - There is no guarantee that all vehicle-related classes will implement essential methods like `start()`.
   - A developer might forget to write a critical method in a new `Bike` class.
4. **Poor Scalability**:
   - As new vehicles are added, maintaining consistency becomes difficult. Changes to shared logic require editing every single class.
5. **No Common Structure or Contract**:
   - Without a common abstract class or interface, there is no standardized blueprint that all vehicle classes must adhere to.

---

## ✅ Program Using Abstraction (The Solution)

```java
// Abstract class used to remove code duplication and enforce method structure
abstract class Vehicle {
    int no_of_tyres;

    // Common method to avoid duplication (removes disadvantage #2)
    void displayTyres() {
        System.out.println("This vehicle has " + no_of_tyres + " tyres.");
    }

    // Abstract method to enforce implementation in all subclasses (removes disadvantage #3)
    abstract void start();
}

// Car class extends abstract class and provides its own implementation
class Car extends Vehicle {
    Car() {
        no_of_tyres = 4;
    }

    // Required by abstract class - enforces structure
    @Override
    void start() {
        System.out.println("Car starts with key ignition.");
    }
}

// Scooter class also extends abstract class
class Scooter extends Vehicle {
    Scooter() {
        no_of_tyres = 2;
    }

    @Override
    void start() {
        System.out.println("Scooter starts with kick or self-start.");
    }
}

// Main class to test polymorphism and abstraction
public class MainApp {
    public static void main(String[] args) {
        // Using polymorphism (removes disadvantage #1)
        Vehicle myVehicle1 = new Car();
        myVehicle1.displayTyres();
        myVehicle1.start();

        System.out.println();

        Vehicle myVehicle2 = new Scooter();
        myVehicle2.displayTyres();
        myVehicle2.start();

        // Easily scale and add new vehicle types consistently (removes disadvantage #4)
    }
}
```

### 🖥️ Output:
```text
This vehicle has 4 tyres.
Car starts with key ignition.

This vehicle has 2 tyres.
Scooter starts with kick or self-start.
```
