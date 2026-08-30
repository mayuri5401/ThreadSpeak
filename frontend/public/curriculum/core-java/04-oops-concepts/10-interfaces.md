---
id: "java-interfaces"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Interface in Java"
slug: "java-interfaces"
summary: "Master Interfaces in Java: Introduction, Version history (Java 7 -> 8 -> 9), Syntax, 5 Core Uses of Interfaces with programs & outputs (100% Abstraction, Common behavior across unrelated classes, Multiple Inheritance, Loose Coupling with Payment Gateway, Frameworks/APIs/Design Patterns), and Abstract Class vs Interface comparison."
eli10: "An Interface is a USB port standard. Any flash drive, keyboard, or mouse manufacturer can plug into your laptop as long as they implement the exact USB standard shape and pins!"
mentalModel: "Interfaces are behavioral specifications decoupled from class hierarchies. A class can implement multiple independent interfaces simultaneously."
difficulty: "Intermediate"
estimatedMinutes: 25
tags: ["Interfaces", "implements", "100% Abstraction", "Multiple Inheritance", "Loose Coupling", "Default Methods", "Static Methods", "Private Methods", "Frameworks", "OOP"]
animationType: "interfaces"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Loose Coupling using Interfaces in Java."
  code: |
    // Interface to achieve loose coupling
    interface Payment {
        void pay();
    }

    // UPI Payment Implementation
    class UpiPayment implements Payment {
        public void pay() {
            System.out.println("Payment done using UPI.");
        }
    }

    // Net Banking Payment Implementation
    class NetBankingPayment implements Payment {
        public void pay() {
            System.out.println("Payment done using Net Banking.");
        }
    }

    // Checkout class using interface (loosely coupled)
    class PaymentCheckout {
        void payment(Payment payment) {
            payment.pay(); // Works with any class implementing Payment
        }
    }

    public class MainApp {
        public static void main(String[] args) {
            PaymentCheckout checkout = new PaymentCheckout();
            checkout.payment(new UpiPayment());
            checkout.payment(new NetBankingPayment());
        }
    }
---

# 🔌 Interface in Java

---

## 📖 Introduction

An **interface in Java** is a **blueprint of a class**, containing only **method signatures (no implementations)** and **constants**.
- Interfaces are similar to abstract classes but have **all methods of abstract type**.

> **📌 Note on Java Version Evolution**:
> - **Till Java 7**: Interfaces can contain **only abstract methods and constants**.
> - **In Java 8**: We can provide the implementation of methods using **`default` methods** and **`static` methods**.
> - **In Java 9**: We can provide internal helper implementation using **`private` methods** and **`private static` methods**.

### Syntax:
```java
interface InterfaceName
{
    // public static final variables (constants)
    // public abstract methods
}
```

---

## 🎯 Use of Interfaces

Interfaces in Java serve **5 vital purposes**:
1. **Used to achieve 100% abstraction in Java.**
2. **Used to define a common behaviour across unrelated classes.**
3. **Used to achieve multiple inheritance in Java.**
4. **Used to achieve loose coupling in our code.**
5. **Used extensively in frameworks, APIs, and design patterns** (e.g., DAO, Service Layer).

---

### 1️⃣ Used to Achieve 100% Abstraction in Java

Interfaces specify the full operational contract without exposing any internal implementation.

#### Example Program:
```java
// Interface with 100% abstraction
interface Vehicle
{
    void start();
    void stop();
}

// Car class implements the interface
class Car implements Vehicle
{
    public void start()
    {
        System.out.println("Car is starting...");
    }

    public void stop()
    {
        System.out.println("Car is stopping...");
    }
}

// Main class to test
public class Main
{
    public static void main(String[] args)
    {
        Vehicle v = new Car();  // Interface reference (polymorphism)
        v.start();
        v.stop();
    }
}
```

#### 🖥️ Output:
```text
Car is starting...
Car is stopping...
```

---

### 2️⃣ Used to Define a Common Behaviour Across Unrelated Classes

Two classes that have completely different inheritance hierarchies (like `Document` and `Image`) can share a unified contract via an interface.

#### Example Program:
```java
// Interface with a common method
interface Printable
{
    void print();
}

// Unrelated class 1
class Document implements Printable
{
    public void print()
    {
        System.out.println("Printing document...");
    }
}

// Unrelated class 2
class Image implements Printable
{
    public void print()
    {
        System.out.println("Printing image...");
    }
}

// Main class
public class Main
{
    public static void main(String[] args)
    {
        Printable p1 = new Document();
        Printable p2 = new Image();

        p1.print();
        p2.print();
    }
}
```

#### 🖥️ Output:
```text
Printing document...
Printing image...
```

---

### 3️⃣ Used to Achieve Multiple Inheritance in Java

A Java class can implement multiple interfaces simultaneously with zero ambiguity.

#### Example Program:
```java
interface I1
{
    void m1();
}

interface I2
{
    void m2();
}

// Multiple Inheritance using interfaces
class A implements I1, I2
{
    public void m1()
    {
        System.out.println("Method m1 from interface I1");
    }

    public void m2()
    {
        System.out.println("Method m2 from interface I2");
    }
}

// Main class
public class Main
{
    public static void main(String[] args)
    {
        A obj = new A();
        obj.m1();
        obj.m2();
    }
}
```

#### 🖥️ Output:
```text
Method m1 from interface I1
Method m2 from interface I2
```

---

### 4️⃣ Used to Achieve Loose Coupling in Our Code

Loose coupling allows classes to interact without being tightly bound to concrete implementations, making systems modular and easily extensible.

#### Example Program:
```java
import java.util.Scanner;

// Interface to achieve loose coupling
interface Payment
{
    void pay();
}

// UPI Payment Implementation
class UpiPayment implements Payment
{
    public void pay()
    {
        System.out.println("Payment done using UPI.");
    }
}

// Net Banking Payment Implementation
class NetBankingPayment implements Payment
{
    public void pay()
    {
        System.out.println("Payment done using Net Banking.");
    }
}

// Checkout class using interface (not tightly bound to any one payment method)
class PaymentCheckout
{
    void payment(Payment payment)
    {
        payment.pay();  // Loose coupling: works with any class that implements Payment
    }
}

// Main class with switch-case
public class MainApp
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);
        PaymentCheckout checkout = new PaymentCheckout();

        System.out.println("Choose payment method:");
        System.out.println("1. UPI");
        System.out.println("2. Net Banking");
        System.out.print("Enter choice: ");
        int choice = scanner.nextInt();

        switch (choice)
        {
            case 1:
                checkout.payment(new UpiPayment());
                break;
            case 2:
                checkout.payment(new NetBankingPayment());
                break;
            default:
                System.out.println("Invalid choice");
        }
    }
}
```

#### 🖥️ Output:
```text
If user enters 1:
Choose payment method:
1. UPI
2. Net Banking
Enter choice: 1
Payment done using UPI.

If user enters 2:
Choose payment method:
1. UPI
2. Net Banking
Enter choice: 2
Payment done using Net Banking.
```

---

### 5️⃣ Used Extensively in Frameworks, APIs, and Design Patterns

- **Frameworks**:
  - Spring Framework uses interfaces like `CrudRepository`, `JpaRepository`, and `ApplicationContext` to facilitate dependency injection and clean service layers.
- **Java Standard APIs**:
  - **Java Collections Framework**: Uses interfaces like `List`, `Set`, `Map`, and `Queue`.
  - **JDBC (Java Database Connectivity)**: Provides standard interfaces like `Connection`, `Statement`, and `ResultSet` implemented by database vendor drivers (PostgreSQL, MySQL, Oracle).
- **Design Patterns**:
  - **DAO Pattern (Data Access Object)**: Interface defines standard CRUD data access methods.
  - **Service Layer**: Interface declares business logic contracts.
- **Unit Testing & Mocking**:
  - Interfaces are mocked (e.g. using Mockito) in automated unit tests for modularity and isolation without needing actual databases or network connections.

---

## 📊 Summary Comparison: Abstract Class vs Interface

| Feature | Abstract Class | Interface |
|:---|:---|:---|
| **Keyword** | `abstract class` | `interface` |
| **Inheritance** | `extends` (Single only) | `implements` (Multiple allowed) |
| **Abstraction Level** | $0\%$ to $100\%$ (Partial/Full) | **100% Pure Contract** |
| **Variables** | Instance, static, final, private, protected | **`public static final` constants only** |
| **Constructors** | Can have constructors | **No constructors allowed** |
| **Speed** | Slightly faster (Direct `vtable` indexing) | Requires `itable` (interface table) lookup |
