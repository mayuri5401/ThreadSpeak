---
id: "java-packages"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Packages in Java"
slug: "java-packages"
summary: "Master Packages in Java: Introduction, Why Use Packages, Syntax to Declare & Import Packages, Built-in Packages (java.lang, java.util, java.io) with Scanner Program, User-defined Packages (p1 and p2 multi-file example), Sub-packages & Domain Inversion, Static Imports, Compiling with -d flag, and Terminal CLI commands."
eli10: "Think of your computer's folders: You group photos in a 'Photos' folder and songs in a 'Music' folder to avoid messy files. A Java Package is a folder that groups related classes together and prevents name collisions!"
mentalModel: "Packages map 1-to-1 with OS directories on disk and create namespaces to prevent naming collisions across libraries."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["Packages", "package keyword", "import keyword", "Built-in Packages", "User-Defined Packages", "Namespace", "Sub-packages", "Static Import", "CLI Compilation", "OOP"]
animationType: "packages"
codeSnippet:
  language: "java"
  explanation: "Demonstrating user-defined package creation and importing across packages in Java."
  code: |
    // File 1: p1/MyClass.java
    package p1;

    public class MyClass {
        public void display() {
            System.out.println("Hello from MyClass in p1 package.");
        }
    }

    // File 2: p2/MainApp.java
    package p2;

    import p1.MyClass; // Importing MyClass from p1 package

    public class MainApp {
        public static void main(String[] args) {
            MyClass obj = new MyClass();
            obj.display();
        }
    }
---

# 📦 Packages in Java

---

## 📖 1. Introduction

A **package in Java** is a core concept used to **group related classes, interfaces, and sub-packages**.
- It is used to **avoid name conflicts**, group related code, and improve code maintainability and access control.
- You can think of a package as a **folder in a file system**, where similar Java files (classes or interfaces) are stored together — just like organizing documents into folders for easy access and management.

```text
📁 Java Project Root
 │
 ├── 📁 p1 (Package Folder)
 │    └── 📄 MyClass.java (Compiled to MyClass.class)
 │
 └── 📁 p2 (Package Folder)
      └── 📄 MainApp.java (Compiled to MainApp.class)
```

### Java has two types of packages:
1. **Built-in Packages** (like `java.util`, `java.io`, `java.lang`)
2. **User-defined Packages** (created by the programmer)

---

## 🎯 2. Why Use Packages?

- **Organizes classes logically** (e.g., utility classes, model classes, repository classes, controller classes).
- **Avoids class name conflicts** between different modules, libraries, or developers (e.g., `java.util.Date` vs `java.sql.Date`).
- **Provides access protection** (enables `public`, `protected`, and package-private `default` access boundaries).
- **Makes searching, locating, and using classes/interfaces easier**.
- **Enables modular software design** and clean project architecture.

---

## 📜 3. Syntax to Declare a Package

```java
package package_name;
```
> **⚠️ IMPORTANT**: The `package` declaration should **always be the very first statement** in our Java source file (excluding comments).

### Sub-packages & Domain Inversion Naming Convention:
In enterprise software, package names follow the **Reverse Internet Domain Name** standard to guarantee global uniqueness:
```java
package com.companyname.modulename.submodulename;
// Example: package com.threadspeak.service.payment;
```
- Maps on disk to the folder hierarchy: `./com/threadspeak/service/payment/`

---

## 📥 4. Syntax to Import a Package

1. **Importing a specific class**:
   ```java
   import package_name.class_name;
   // Example: import java.util.Scanner;
   ```
   *Used to import only a specific class from a package.*

2. **Importing all classes from a package**:
   ```java
   import package_name.*;
   // Example: import java.util.*;
   ```
   *Used to import all classes from that immediate package.*

> **🔥 CRITICAL GOTCHA**: `import java.util.*;` imports all classes directly under `java.util`, **but does NOT import classes in sub-packages** like `java.util.concurrent.*` or `java.util.regex.*`!

---

## ⚡ 5. Static Imports in Java

Introduced in Java 5, **Static Import** allows accessing `static` members (fields and methods) of a class directly without qualifying them with the class name:

```java
import static java.lang.Math.PI;
import static java.lang.Math.sqrt;

public class StaticImportDemo {
    public static void main(String[] args) {
        // Without static import: Math.sqrt(Math.PI)
        double result = sqrt(PI); // Clean and direct
        System.out.println("Result: " + result);
    }
}
```

---

## 1️⃣ 6. Built-in Packages

**Built-in packages** are part of the **Java Standard Library (JDK API)** and provide ready-made classes and interfaces for various functionalities like data structures, input/output, networking, GUI, and concurrency.

### Common built-in packages include:
- **`java.lang`**: Automatically imported by default into every Java program; contains core language classes like `String`, `Math`, `Object`, `System`, `Thread`, `Exception`.
- **`java.util`**: Contains the Collections Framework (`ArrayList`, `HashMap`, `HashSet`), `Scanner`, `Date`, `UUID`, `Random`.
- **`java.io` / `java.nio`**: For input/output file streams, readers, writers, and memory buffers.
- **`java.net`**: For socket programming, HTTP clients, and URL connections.
- **`java.sql`**: For JDBC database connectivity (`Connection`, `Statement`, `ResultSet`).

### 💻 Java Program Example (Built-in Package):
```java
import java.util.Scanner;

public class MainApp
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = sc.nextLine();
        System.out.println("Hello, " + name);
    }
}
```

#### 🖥️ Output:
```text
Enter your name: Deepak
Hello, Deepak
```

---

## 2️⃣ 7. User-Defined Packages

**User-defined packages** are created by programmers to logically group related classes and interfaces, improving code organization, reusability, and avoiding naming conflicts.

### 💻 Java Program Example (User-Defined Package):

#### 📄 File 1: `p1/MyClass.java`
```java
package p1;

public class MyClass
{
    public void display()
    {
        System.out.println("Hello from MyClass in p1 package.");
    }
}
```

#### 📄 File 2: `p2/MainApp.java`
```java
package p2;

import p1.MyClass;  // Importing MyClass from p1 package

public class MainApp
{
    public static void main(String[] args)
    {
        MyClass obj = new MyClass();
        obj.display();
    }
}
```

#### 🖥️ Output:
```text
Hello from MyClass in p1 package.
```

---

## 🖥️ 8. How to Compile and Run User-Defined Packages (Using Terminal)

### Method A: Direct File Path Compilation
```bash
# 1. Compile the package class
javac p1/MyClass.java

# 2. Compile the main consumer class using current directory as classpath
javac -cp . p2/MainApp.java

# 3. Run the program using fully qualified class name
java p2.MainApp
```

### Method B: Compiling with `-d` (Destination Directory) Flag
The `-d` flag tells the `javac` compiler to automatically generate the required package folder hierarchy on disk:
```bash
# Compile and auto-generate directory structure in current folder (.)
javac -d . MyClass.java MainApp.java

# Run using fully qualified package name
java p2.MainApp
```

---

## 🛡️ 9. Package Visibility & Access Control Rules

| Access Level | Same Class | Same Package | Subclass (Other Package) | Global / World |
|:---|:---:|:---:|:---:|:---:|
| **`private`** | ✅ | ❌ | ❌ | ❌ |
| **`default` (no keyword)** | ✅ | ✅ | ❌ | ❌ |
| **`protected`** | ✅ | ✅ | ✅ | ❌ |
| **`public`** | ✅ | ✅ | ✅ | ✅ |
