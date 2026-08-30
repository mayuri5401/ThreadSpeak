---
id: "java-association-has-a-relationship"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Association (HAS-A Relationship)"
slug: "java-association-has-a-relationship"
summary: "Master Association (HAS-A Relationship) in Java: Definition, 3 Ways to Inject Dependencies (Direct Reference Variables, Constructor Injection, Setter Injection), Aggregation (Weak HAS-A) vs Composition (Strong HAS-A), Cardinality of Associations (1:1, 1:N, N:1, M:N), and runnable code examples."
eli10: "Association is when one object holds a reference to another. A Car HAS-A Engine (Composition) and a Car HAS-A Music Player (Aggregation)!"
mentalModel: "HAS-A is represented by object reference variables stored on the JVM Heap. The lifetime dependency separates Aggregation from Composition."
difficulty: "Intermediate"
estimatedMinutes: 20
tags: ["Association", "HAS-A", "Composition", "Aggregation", "Dependency Injection", "Constructor Injection", "Setter Injection", "Cardinality"]
animationType: "association"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Constructor Injection in Association (HAS-A Relationship)."
  code: |
    class Engine {
        void startEngine() {
            System.out.println("Engine starts.");
        }
    }

    class Car {
        // HAS-A relationship: Car has an Engine
        private Engine engine;

        // Constructor Injection: Engine is provided from outside
        Car(Engine engine) {
            this.engine = engine;
        }

        void startCar() {
            engine.startEngine(); // Car uses Engine to start
            System.out.println("Car starts.");
        }
    }

    public class MainApp {
        public static void main(String[] args) {
            Engine engine = new Engine();
            Car myCar = new Car(engine);
            myCar.startCar();
        }
    }
---

# 🤝 Association (HAS-A Relationship) in Java

---

## ❓ Definition

**Association** is a relationship where **one class uses or interacts with another class by holding a reference to it**.  
It represents a **HAS-A relationship** in object-oriented programming.

### 💡 Real-World Examples:
- `Student HAS-A Address`
- `Car HAS-A Engine`
- `Laptop HAS-A Processor`

---

## ⚙️ How to Achieve Association ?

Association is achieved by **declaring object references as instance variables inside a class**.

We can inject dependent objects using **3 primary approaches**:
1. **Direct Reference Variables**: Creating the object directly inside the class.
2. **Constructor Injection**: Passing the dependent object through the constructor.
3. **Setter Injection**: Injecting the dependent object using a public setter method.

---

### 📝 Program 1: Association using Direct Reference Variables

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

    // Direct reference to another class (HAS-A)
    Address address = new Address(); // Object created directly inside the class

    void displayInfo() {
        System.out.println("Name: " + name + ", Roll No: " + rollno);
        address.displayAddress();
    }
}

public class MainApp {
    public static void main(String[] args) {
        Student student = new Student(); // No need to pass Address
        student.displayInfo();           // Displays student info along with address
    }
}
```

#### 🖥️ Output:
```text
Name: Deepak, Roll No: 101
City: Delhi, Country: India
```

---

### 📝 Program 2: Association using Constructor Injection

```java
class Engine {
    void startEngine() {
        System.out.println("Engine starts.");
    }
}

class Car {
    // HAS-A relationship: Car has an Engine
    private Engine engine;

    // Constructor Injection: Engine is provided from outside
    Car(Engine engine) {
        this.engine = engine;
    }

    void startCar() {
        engine.startEngine(); // Car uses Engine to start
        System.out.println("Car starts.");
    }
}

public class MainApp {
    public static void main(String[] args) {
        // 1. Create the dependency
        Engine engine = new Engine();

        // 2. Inject it into Car via constructor
        Car myCar = new Car(engine);
        myCar.startCar();
    }
}
```

#### 🖥️ Output:
```text
Engine starts.
Car starts.
```

---

### 📝 Program 3: Association using Setter Injection

```java
class Processor {
    void startProcessor() {
        System.out.println("Processor starts processing.");
    }
}

class Laptop {
    // HAS-A relationship: Laptop has a Processor
    private Processor processor;

    // Setter Injection: Injecting dependency through setter method
    public void setProcessor(Processor processor) {
        this.processor = processor;
    }

    void startLaptop() {
        if (processor != null) {
            processor.startProcessor();
            System.out.println("Laptop starts.");
        }
    }
}

public class MainApp {
    public static void main(String[] args) {
        // 1. Create the dependency
        Processor processor = new Processor();

        // 2. Create the dependent object
        Laptop myLaptop = new Laptop();

        // 3. Inject dependency using setter
        myLaptop.setProcessor(processor);

        // 4. Use the dependent object
        myLaptop.startLaptop();
    }
}
```

#### 🖥️ Output:
```text
Processor starts processing.
Laptop starts.
```

---

## 🏷️ Types of Association: Aggregation vs Composition

```text
                                     Association (HAS-A)
                         ┌────────────────────┴────────────────────┐
                         ▼                                         ▼
               Aggregation (Weak HAS-A)                  Composition (Strong HAS-A)
            (Independent Object Lifetimes)              (Death-Bound / Inseparable Lifetime)
             e.g. Car HAS-A Music Player                   e.g. Car HAS-A Engine
```

### 1️⃣ Aggregation (Weak Association)
- **Weak relationship** between classes.
- Objects can **exist independently** of each other.
- **Example**: `A Car HAS-A Music Player`.
  - The Music Player can be removed, reused, or replaced — it can exist without the car.

### 2️⃣ Composition (Strong Association)
- **Strong relationship** between classes.
- One object is **fully dependent on the other**; their lifecycles are bound together.
- **Example**: `A Car HAS-A Engine`.
  - The Engine is an essential part of the car — if the car is destroyed, the engine has no standalone meaning in the context of that vehicle.

> **📌 NOTE** : In both Aggregation and Composition, the **program logic remains the same**, but the **architectural lifecycle and ownership between the classes is different**.

---

## 🔢 Cardinality of Associations

**Cardinality** refers to the count or the number of connections between associating classes:

1. **One-to-One (1:1)**:
   - One instance of Class A is associated with exactly one instance of Class B.
   - *Example*: `One Person HAS-A One Passport`.
2. **One-to-Many (1:N)**:
   - One instance of Class A is associated with multiple instances of Class B.
   - *Example*: `One Department HAS-A List of Many Employees`.
3. **Many-to-One (N:1)**:
   - Multiple instances of Class A belong to a single instance of Class B.
   - *Example*: `Many Students belong to One College`.
4. **Many-to-Many (M:N)**:
   - Multiple instances of Class A associate with multiple instances of Class B.
   - *Example*: `Many Students enroll in Many Courses`.
