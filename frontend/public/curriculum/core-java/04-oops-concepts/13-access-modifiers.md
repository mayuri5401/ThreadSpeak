---
id: "java-access-modifiers"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Access Modifiers in Java"
slug: "java-access-modifiers"
summary: "Master Access Modifiers in Java: Introduction, Why Use Access Modifiers, 4 Types (public, protected, default, private), Master Access Control Table, Java Program Example with Car class, and Rules for Method Overriding with Visibility."
eli10: "Think of security clearances in a building: 'private' is your personal locked diary (only you). 'default' is your living room (family/same package). 'protected' is family members visiting from out of town (subclasses). 'public' is a public street billboard (everyone)!"
mentalModel: "Access modifiers configure JVM compile-time and runtime visibility scopes across classes, packages, and inheritance trees."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["Access Modifiers", "public", "private", "protected", "default", "Package Private", "Access Control Table", "OOP"]
animationType: "access-modifiers"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Access Modifiers with Car class in Java."
  code: |
    public class Car {
        private String model;
        protected int speed;

        public void startEngine() {
            System.out.println("Engine started");
        }
    }
---

# 🔐 Access-Modifiers in Java

---

## 📖 Introduction

**Access modifiers** are the keywords used to **set access levels (visibility)** for classes, methods, variables, and constructors.
- They help in **implementing encapsulation** and maintaining security in object-oriented programming.

### Java provides four types of access modifiers:
1. **`public`**
2. **`protected`**
3. **`default`** (no modifier specified)
4. **`private`**

---

## 🎯 Why Use Access Modifiers?

- **To hide internal implementation details (data hiding)**.
- **To control access to class members** from outside the class or package.
- **To follow the principles of encapsulation** and object-oriented design.
- **To protect sensitive data** and ensure modularity in large applications.

---

## 🔍 Types of Access Modifiers

### 1️⃣ `public`
- The member is **accessible from anywhere in the program**.
- Can be used across packages and classes.

### 2️⃣ `protected`
- The member is **accessible within the same package** and also in **subclasses** (even if they are in different packages).
- Cannot be accessed by non-subclass classes outside the package.

### 3️⃣ `default` (no modifier specified)
- The member is **accessible only within the same package**.
- Cannot be accessed from classes in different packages.

### 4️⃣ `private`
- The member is **accessible only within the same class**.
- Cannot be accessed from outside the class, even by subclasses.

---

## 📊 Access Control Table

| Access Modifier | Same Class | Same Package | Subclass (Other Package) | Other Package (World) |
|:---|:---:|:---:|:---:|:---:|
| **`public`** | ✅ | ✅ | ✅ | ✅ |
| **`protected`** | ✅ | ✅ | ✅ | ❌ |
| **`default`** | ✅ | ✅ | ❌ | ❌ |
| **`private`** | ✅ | ❌ | ❌ | ❌ |

---

## 💻 Java Program Example:

```java
public class Car
{
    private String model;
    protected int speed;

    public void startEngine()
    {
        System.out.println("Engine started");
    }
}
```

### Multi-Package Practical Demonstration:

#### 📄 Package 1: `pkg1/Car.java`
```java
package pkg1;

public class Car {
    private String model = "Safari";
    int year = 2026;             // default access
    protected int speed = 120;   // protected access
    public String brand = "Tata"; // public access

    public void startEngine() {
        System.out.println("Engine started for " + model);
    }
}
```

#### 📄 Package 2: `pkg2/SportsCar.java` (Subclass in Different Package)
```java
package pkg2;

import pkg1.Car;

public class SportsCar extends Car {
    public void display() {
        // System.out.println(model); // ❌ Compile Error: model is private
        // System.out.println(year);  // ❌ Compile Error: year is default (package-private)
        System.out.println("Speed: " + speed); // ✅ ALLOWED: speed is protected
        System.out.println("Brand: " + brand); // ✅ ALLOWED: brand is public
        startEngine();                         // ✅ ALLOWED: startEngine() is public
    }

    public static void main(String[] args) {
        SportsCar sc = new SportsCar();
        sc.display();
    }
}
```

#### 🖥️ Output:
```text
Speed: 120
Brand: Tata
Engine started for Safari
```

---

## ⚠️ Method Overriding Access Rule

> **🔥 IMPORTANT RULE**: An overriding method in a child class **CANNOT assign a more restrictive access modifier** than the parent method:
> - `public` $\to$ must remain `public`.
> - `protected` $\to$ can remain `protected` or widen to `public`.
> - `default` $\to$ can remain `default`, or widen to `protected` or `public`.
