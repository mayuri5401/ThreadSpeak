---
id: "java-relationship-between-classes"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Relationship Between Classes"
slug: "java-relationship-between-classes"
summary: "Master Relationship Between Classes in Java: Introduction, Association (HAS-A relationship), Dependency (USES-A relationship), Inheritance (IS-A relationship), how to achieve each relationship, practical programs, outputs, and comparison matrix."
eli10: "Classes collaborate like people! A Student HAS-A Backpack (Association), an Office Worker USES-A Printer (Dependency), and a Car IS-A Vehicle (Inheritance)!"
mentalModel: "HAS-A = Instance variable reference on Heap. USES-A = Temporary local variable inside stack frame. IS-A = Type hierarchy reusability."
difficulty: "Intermediate"
estimatedMinutes: 20
tags: ["OOP", "Relationship Between Classes", "Association", "HAS-A", "Dependency", "USES-A", "Inheritance", "IS-A", "Coupling"]
animationType: "class-relationships"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Association (HAS-A Relationship) in Java."
  code: |
    class Address {
        String city = "Delhi";
        String country = "India";

        void displayAddress() {
            System.out.println("City: " + city + ", Country: " + country);
        }
    }

    class Student {
        String name = "Deepak";
        int rollno = 101;

        // Association (HAS-A relationship)
        Address address = new Address();

        void displayInfo() {
            System.out.println("Name: " + name + ", Roll No: " + rollno);
            address.displayAddress();
        }
    }

    public class MainApp {
        public static void main(String[] args) {
            Student student = new Student();
            student.displayInfo();
        }
    }
---

# 🔗 Relationship Between Classes in Java

---

## 📖 Introduction

**Relationship between classes** describes how multiple classes **interact with or depend on each other**.  
These relationships help structure and organize code in a logical, reusable, and maintainable way.

### Types of relationships between classes in Java:
1. **Association (HAS-A relationship)**
2. **Dependency (USES-A relationship)**
3. **Inheritance (IS-A relationship)**

```text
                                Relationship Between Classes
                     ┌───────────────────────┼───────────────────────┐
                     ▼                       ▼                       ▼
            Association (HAS-A)     Dependency (USES-A)     Inheritance (IS-A)
           (Instance Field Link)     (Method-Scoped Use)     (extends / Hierarchy)
```

---

## 1️⃣ Association (HAS-A relationship)

### 📌 Definition:
**Association** is a relationship where **one class interacts with another class** by holding an object reference.

### 💡 Real-World Examples:
- `Student HAS-A Address`
- `Car HAS-A Engine`
- `Bank HAS-A Account`

### ⚙️ How to achieve Association ?
Association is achieved by **declaring object references as instance variables inside a class**.

### 💻 Program:
```java
class Address {
    String city = "Delhi";
    String country = "India";

    void displayAddress() {
        System.out.println("City: " + city + ", Country: " + country);
    }
}

class Student {
    String name = "Deepak";
    int rollno = 101;

    // Direct reference to another class (HAS-A relationship)
    Address address = new Address(); // Object created directly inside the class

    void displayInfo() {
        System.out.println("Name: " + name + ", Roll No: " + rollno);
        address.displayAddress();
    }
}

public class MainApp {
    public static void main(String[] args) {
        Student student = new Student(); // No need to pass Address manually
        student.displayInfo(); // Displays student info along with address
    }
}
```

### 🖥️ Output:
```text
Name: Deepak, Roll No: 101
City: Delhi, Country: India
```

---

## 2️⃣ Dependency (USES-A relationship)

### 📌 Definition:
**Dependency** is a relationship where **one class uses another class to perform a specific task**.  
It typically exists when one class depends on another **temporarily**, usually **within a method scope**.

### 💡 Real-World Examples:
- `Office Worker USES-A Printer`
- `Driver USES-A GPS`
- `Painter USES-A Brush`

### ⚙️ How to achieve Dependency ?
Dependency can be achieved through:
1. **Local variables inside methods**
2. **Method parameters**

### 💻 Program:
```java
class Printer {
    void printDocument(String doc) {
        System.out.println("Printing document: " + doc);
    }
}

class OfficeWorker {
    void doWork() {
        Printer printer = new Printer(); // Dependency via local variable inside method
        printer.printDocument("ProjectReport.pdf");
        System.out.println("Work completed.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        OfficeWorker worker = new OfficeWorker();
        worker.doWork(); // OfficeWorker depends on Printer to print
    }
}
```

### 🖥️ Output:
```text
Printing document: ProjectReport.pdf
Work completed.
```

---

## 3️⃣ Inheritance (IS-A relationship)

### 📌 Definition:
**IS-A (Inheritance)** is the process by which a **child class (subclass) inherits fields and methods from a parent class (superclass)**.

### 💡 Real-World Examples:
- `A Car IS-A Vehicle`
- `A Dog IS-A Animal`
- `A SavingsAccount IS-A BankAccount`

### ⚙️ How to achieve Inheritance ?
Inheritance is achieved using:
- **`extends`** keyword in the case of classes.
- **`implements`** keyword in the case of interfaces.

### 💻 Program:
```java
class Vehicle {
    void start() {
        System.out.println("Vehicle starts.");
    }
}

// Car IS-A Vehicle (inherits from Vehicle)
class Car extends Vehicle {
    void drive() {
        System.out.println("Car drives.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        Car myCar = new Car();
        myCar.start(); // Inherited from Vehicle parent class
        myCar.drive(); // Specific to Car child class
    }
}
```

### 🖥️ Output:
```text
Vehicle starts.
Car drives.
```

---

## 📊 Summary Comparison: HAS-A vs USES-A vs IS-A

| Relationship | Type | Implementation Syntax | Lifetime / Scope | Coupling Level | Canonical Example |
|:---|:---|:---|:---|:---|:---|
| **Association** | **HAS-A** | Instance variable in class (`Address addr = new Address();`) | **Long-lived** (Lives on Heap with parent object) | Medium / Strong | `Student HAS-A Address` |
| **Dependency** | **USES-A** | Local variable in method or parameter (`Printer p = new Printer();`) | **Short-lived** (Destroyed when method frame exits) | **Loose Coupling** (Transient) | `OfficeWorker USES-A Printer` |
| **Inheritance** | **IS-A** | `class Child extends Parent` | **Permanent** (Class type hierarchy) | **Tight Coupling** (Compile-time) | `Car IS-A Vehicle` |
