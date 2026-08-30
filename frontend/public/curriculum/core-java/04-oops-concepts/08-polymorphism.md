---
id: "java-polymorphism"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Polymorphism"
slug: "java-polymorphism"
summary: "Master Polymorphism in Java: Linguistic origins (Poly=Many, Morph=Forms), Real-world Examples, Advantages, Compile-Time Polymorphism (Static Binding / Method Overloading), Runtime Polymorphism (Dynamic Binding / Method Overriding / Upcasting), Variable Hiding vs Polymorphism, Method Hiding (Static methods), Covariant Return Types, and JVM vtable internals."
eli10: "Polymorphism means 'many forms'! A single remote button (Power) turns on a TV, an AC, or a Music System depending on what device is connected!"
mentalModel: "Compile-Time Polymorphism binds at build-time using method signatures. Runtime Polymorphism uses dynamic dispatch (vtable lookup) based on the concrete Heap instance."
difficulty: "Intermediate"
estimatedMinutes: 30
tags: ["Polymorphism", "Compile-Time Polymorphism", "Runtime Polymorphism", "Static Binding", "Dynamic Binding", "Method Overloading", "Method Overriding", "Upcasting", "Downcasting", "Field Hiding", "Covariant Return Types", "vtable", "OOP"]
animationType: "polymorphism"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Runtime Polymorphism and Upcasting with real-world Payment processing in Java."
  code: |
    interface Payment {
        void processPayment(double amount);
    }

    class UPIPayment implements Payment {
        @Override
        public void processPayment(double amount) {
            System.out.println("Processing ₹" + amount + " via UPI (GooglePay / PhonePe).");
        }
    }

    class CreditCardPayment implements Payment {
        @Override
        public void processPayment(double amount) {
            System.out.println("Processing ₹" + amount + " via Credit Card Gateway.");
        }
    }

    public class MainApp {
        public static void processOrder(Payment payment, double amount) {
            // Polymorphic dispatch: Caller doesn't care which payment mode is used!
            payment.processPayment(amount);
        }

        public static void main(String[] args) {
            Payment p1 = new UPIPayment();
            Payment p2 = new CreditCardPayment();

            processOrder(p1, 1499.0); // Output: Processing ₹1499.0 via UPI...
            processOrder(p2, 2999.0); // Output: Processing ₹2999.0 via Credit Card...
        }
    }
---

# 🎭 Polymorphism in Java

---

## 📖 1. Introduction & Meaning

**Polymorphism** is one of the foundational pillars of **Object-Oriented Programming (OOP)** in Java.
- **Linguistic Roots**: Derived from two Greek words:
  - **Poly** $\to$ *Many*
  - **Morph** $\to$ *Forms*
  - Therefore, **Polymorphism means "Many Forms"**.
- **Formal Definition**: The capability of a single entity (such as a method, object, or operator) to take on different behaviors or perform different tasks depending on the runtime context.
- **Architectural Goal**: Enables programmers to write generic, flexible, and decoupled code where high-level business workflows interact with clean abstractions without being tied to brittle concrete implementations.

### 💡 Real-world Examples:
- **A Person**: A person simultaneously exhibits multiple identities — acting as an *employee/teacher* at office, a *father* at home, a *son* with parents, and a *customer* at a shopping mall.
- **Water**: Takes on distinct physical states and shapes depending on temperature and container (liquid water in a glass, rigid solid ice cube in a tray, invisible vapor in the atmosphere).
- **Universal Remote Control**: A single `Power` button powers ON a television, an air conditioner, or a sound system depending on which device it is aimed at.

---

## 🌟 2. Advantages of Polymorphism

1. **Increases Flexibility and Reusability**: You can write general methods that work across entire families of classes (e.g. `List<Shape> shapes` can render circles, squares, and triangles in a single loop).
2. **Supports the Open/Closed Principle (SOLID)**: Code is **open for extension but closed for modification**. You can add new subclasses (e.g. `CryptoPayment`) without altering existing, tested order processing code.
3. **Single Interface, Multiple Implementations**: Standardizes API contracts across an entire system (e.g. `save()`, `connect()`, `execute()`).
4. **Simplifies Code Maintenance & Testing**: Makes mock objects and dependency injection seamless in automated unit testing.

---

## 🏷️ 3. Types of Polymorphism in Java

Java categorizes polymorphism into **two major types**:

```text
                                  Polymorphism
                         ┌─────────────┴─────────────┐
                         ▼                           ▼
              Compile-Time Polymorphism     Runtime Polymorphism
             (Static / Early Binding)      (Dynamic / Late Binding)
             ┌───────────┴───────────┐                   │
             ▼                       ▼                   ▼
     Method Overloading     Operator Overloading  Method Overriding & Upcasting
```

---

### 1️⃣ Compile-Time Polymorphism (Static Binding / Early Binding)

- **Definition**: Method invocation is resolved and bound by the **Java Compiler (`javac`)** during compilation time.
- **Also Known As**: **Static Binding** or **Early Binding**.
- **Primary Mechanism**: **Method Overloading** (multiple methods with the same name but distinct parameter signatures).
- **Secondary Mechanism**: **Operator Overloading** (Java does not support user-defined operator overloading, but internally overloads the `+` operator for arithmetic addition and string concatenation).

#### 🔍 How javac Resolves It:
The compiler inspects the **number of arguments**, **data types of arguments**, and **sequence of argument types** alongside the reference variable type to select the exact method descriptor at build time.

#### 💻 Program (Method Overloading):
```java
class Calculator {
    // Method 1: Takes two integer arguments
    void add(int a, int b) {
        System.out.println("Sum (int): " + (a + b));
    }

    // Method 2: Takes two double arguments (Overloaded)
    void add(double a, double b) {
        System.out.println("Sum (double): " + (a + b));
    }

    // Method 3: Takes three integer arguments (Overloaded)
    void add(int a, int b, int c) {
        System.out.println("Sum (3 ints): " + (a + b + c));
    }
}

public class MainApp {
    public static void main(String[] args) {
        Calculator calc = new Calculator(); // Reference type = Calculator

        // Bound at compile time:
        calc.add(10, 20);       // Binds to add(int, int)
        calc.add(10.5, 20.5);   // Binds to add(double, double)
        calc.add(1, 2, 3);      // Binds to add(int, int, int)
    }
}
```

#### 🖥️ Output:
```text
Sum (int): 30
Sum (double): 31.0
Sum (3 ints): 6
```

---

### 2️⃣ Runtime Polymorphism (Dynamic Binding / Late Binding)

- **Definition**: Method invocation is resolved and dispatched dynamically by the **Java Virtual Machine (JVM)** at runtime while the program is actively executing.
- **Also Known As**: **Dynamic Binding**, **Late Binding**, or **Dynamic Virtual Method Dispatch**.
- **Primary Mechanism**: **Method Overriding** combined with **Upcasting**.
- **Resolution Basis**: The JVM determines which method body to execute based on the **actual object type residing in Heap memory**, regardless of what type the reference variable was declared as!

#### 💻 Program (Method Overriding & Upcasting):
```java
class Animal {
    void makeSound() {
        System.out.println("Some generic animal sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks: Woof! Woof!");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat meows: Meow! Meow!");
    }
}

public class MainApp {
    public static void main(String[] args) {
        // Upcasting: Parent reference holding Child object
        Animal obj1 = new Dog(); // Reference = Animal, Heap Object = Dog
        Animal obj2 = new Cat(); // Reference = Animal, Heap Object = Cat

        // Dynamic binding: JVM resolves method based on Heap object at runtime
        obj1.makeSound(); // Output: Dog barks: Woof! Woof!
        obj2.makeSound(); // Output: Cat meows: Meow! Meow!
    }
}
```

#### 🖥️ Output:
```text
Dog barks: Woof! Woof!
Cat meows: Meow! Meow!
```

---

## 🏛️ 4. Real-World Enterprise Example: Payment Gateway

Consider an eCommerce payment processing engine. By relying on runtime polymorphism, we can process transactions across multiple payment providers without modifying the checkout service:

```java
interface Payment {
    void processPayment(double amount);
}

class UPIPayment implements Payment {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing ₹" + amount + " via UPI (GooglePay / PhonePe).");
    }
}

class CreditCardPayment implements Payment {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing ₹" + amount + " via Credit Card Gateway.");
    }
}

class NetBankingPayment implements Payment {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing ₹" + amount + " via Net Banking Portal.");
    }
}

public class CheckoutService {
    // Polymorphic method accepting any Payment subtype
    public static void processOrder(Payment paymentMethod, double amount) {
        paymentMethod.processPayment(amount); // Dynamic dispatch
    }

    public static void main(String[] args) {
        Payment p1 = new UPIPayment();
        Payment p2 = new CreditCardPayment();

        processOrder(p1, 1499.0);
        processOrder(p2, 4999.0);
    }
}
```

---

## ⚠️ 5. Critical Edge Cases & Rules

### ❌ Rule 1: Runtime Polymorphism Does NOT Apply to Data Members (Variables)!
In Java, **methods are overridden, but instance variables are NOT overridden**.  
Variables are resolved at **compile-time based on the reference type** (known as **Variable Shadowing / Field Hiding**).

```java
class Parent {
    int speed = 90;
}

class Child extends Parent {
    int speed = 150;
}

public class Test {
    public static void main(String[] args) {
        Parent obj = new Child(); // Upcasting
        System.out.println(obj.speed); // ⚠️ Prints 90 (Parent speed), NOT 150!
    }
}
```

---

### ❌ Rule 2: Static Methods Cannot Be Overridden (Method Hiding)
`static` methods belong to the **Class metadata**, not to individual object instances.  
If a child class declares a `static` method with the exact same signature as a parent `static` method, it is called **Method Hiding** (resolved at compile-time by reference type), **NOT** Method Overriding!

```java
class Parent {
    static void display() { System.out.println("Parent static display"); }
}

class Child extends Parent {
    static void display() { System.out.println("Child static display"); }
}

public class Test {
    public static void main(String[] args) {
        Parent obj = new Child();
        obj.display(); // ⚠️ Prints "Parent static display" (Bound by compiler to Parent type)
    }
}
```

---

### ❌ Rule 3: Private and Final Methods Cannot Be Overridden
- **`private` Methods**: Accessible only inside their enclosing class; invisible to subclasses.
- **`final` Methods**: Explicitly marked by the developer to prevent overriding.

---

### ✨ Rule 4: Covariant Return Types
Since Java 5, an overriding method in a subclass can declare a **more specific return type (subtype)** than the return type declared in the parent method:

```java
class SuperClass {
    Animal getAnimal() { return new Animal(); }
}

class SubClass extends SuperClass {
    @Override
    Dog getAnimal() { return new Dog(); } // Valid: Dog is a subtype of Animal (Covariant)
}
```

---

## ⚙️ 6. Under the Hood: How JVM Performs Dynamic Dispatch (`vtable`)

When the JVM loads a class into memory, it generates a **Virtual Method Table (`vtable`)** in Metaspace:
1. Every class with virtual (non-static, non-private, non-final) methods receives a `vtable` containing memory pointers to its method implementations.
2. If `Dog` overrides `makeSound()`, `Dog`'s `vtable` points to `Dog.makeSound()`.
3. When `obj.makeSound()` executes with bytecode opcode `INVOKEVIRTUAL`, the JVM follows the object header on the Heap to `Dog`'s `vtable` and dispatches execution directly to `Dog.makeSound()`.

---

## 📊 7. Summary Comparison Matrix

| Feature | Compile-Time Polymorphism | Runtime Polymorphism |
|:---|:---|:---|
| **Aliases** | Static Binding / Early Binding | Dynamic Binding / Late Binding / Virtual Dispatch |
| **Achieved By** | **Method Overloading** / Operator `+` | **Method Overriding** & Upcasting |
| **Deciding Entity** | **Java Compiler (`javac`)** | **Java Virtual Machine (JVM)** |
| **Resolution Criteria** | Method signature (name + args) + reference type | **Actual object instance on Heap** |
| **Data Member Support** | Yes (Field access resolved by reference) | **No** (Fields cannot be polymorphically overridden) |
| **Static Method Support**| Yes (Method Hiding) | **No** (Static methods cannot be dynamically dispatched)|
| **Performance** | Maximum speed (Zero runtime lookup overhead) | Minor lookup overhead via JVM `vtable` |
| **Architectural Role** | Method signature convenience & readability | **Open/Closed Principle & Polymorphic Subtyping** |
