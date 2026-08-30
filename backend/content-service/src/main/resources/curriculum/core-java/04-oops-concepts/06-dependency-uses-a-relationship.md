---
id: "java-dependency-uses-a-relationship"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Dependency (USES-A Relationship)"
slug: "java-dependency-uses-a-relationship"
summary: "Master Dependency (USES-A Relationship) in Java: Definition, characteristics of transient short-lived relationships, 2 ways to achieve dependency (Local Variables inside Method, Method Parameters), Program 1 (Whiteboard & Teacher), Program 2 (Printer & OfficeWorker), and Dependency vs Association Master Comparison."
eli10: "Dependency is temporary! A Teacher USES-A Whiteboard while teaching a lesson, but doesn't take the whiteboard home in their pocket."
mentalModel: "Dependency references live strictly on the method Call Stack. Once the method execution finishes and returns, the dependency object reference is popped and destroyed."
difficulty: "Intermediate"
estimatedMinutes: 20
tags: ["Dependency", "USES-A", "Method Parameters", "Local Variables", "Loose Coupling", "Dependency vs Association", "OOP"]
animationType: "dependency"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Dependency (USES-A Relationship) via Method Parameter in Java."
  code: |
    // Dependent class
    class Printer {
        void printDocument() {
            System.out.println("Printing document...");
        }
    }

    // Main class that depends on Printer
    class OfficeWorker {
        // Dependency injected via method parameter
        void performTask(Printer printer) {
            printer.printDocument(); // Temporary usage
            System.out.println("OfficeWorker has completed printing task.");
        }
    }

    public class MainApp {
        public static void main(String[] args) {
            Printer printer = new Printer();          // Create dependency
            OfficeWorker worker = new OfficeWorker(); // Create dependent

            // Inject dependency via method parameter
            worker.performTask(printer);
        }
    }
---

# 🔄 Dependency (USES-A Relationship) in Java

---

## ❓ Definition

**Dependency** is a relationship where **one class uses another class temporarily to perform a specific task**.  
This means the dependent object is **used within a method**, rather than being stored as an instance variable in the class.

- It represents a **USES-A relationship**.
- The dependency is **typically short-lived (transient)**, existing only during the execution of that specific method.

### 💡 Real-World Examples:
- `Teacher USES-A Whiteboard`
- `Office Worker USES-A Printer`
- `Painter USES-A Brush`

---

## ⚙️ How to Achieve Dependency ?

Dependency is achieved by **creating or using objects of another class inside a method**, instead of holding them as long-term instance variables.

We can inject dependent objects using **2 primary techniques**:
1. **Local Variable inside Method**: The dependent object is created directly inside a method.
2. **Method Parameter**: The dependent object is passed as a method argument (promotes higher flexibility and testability).

---

### 📝 Program 1: Dependency using Local Variable inside Method

```java
// Dependent class
class Whiteboard {
    void writeOnBoard() {
        System.out.println("Writing on the whiteboard...");
    }
}

// Main class that uses Whiteboard
class Teacher {
    void teachLesson() {
        // Local variable: Dependency created inside the method
        Whiteboard board = new Whiteboard();
        board.writeOnBoard(); // Temporary usage
        System.out.println("Teacher is explaining the topic.");
    }
}

// Entry point
public class MainApp {
    public static void main(String[] args) {
        Teacher teacher = new Teacher();
        teacher.teachLesson(); // Trigger method that shows dependency
    }
}
```

#### 🖥️ Output:
```text
Writing on the whiteboard...
Teacher is explaining the topic.
```

---

### 📝 Program 2: Dependency using Method Parameter

```java
// Dependent class
class Printer {
    void printDocument() {
        System.out.println("Printing document...");
    }
}

// Main class that depends on Printer
class OfficeWorker {
    // Dependency injected via method parameter
    void performTask(Printer printer) {
        printer.printDocument(); // Temporary usage
        System.out.println("OfficeWorker has completed printing task.");
    }
}

// Entry point
public class MainApp {
    public static void main(String[] args) {
        Printer printer = new Printer();          // Create dependency
        OfficeWorker worker = new OfficeWorker(); // Create dependent

        // Inject dependency via method parameter
        worker.performTask(printer);
    }
}
```

#### 🖥️ Output:
```text
Printing document...
OfficeWorker has completed printing task.
```

---

## 📊 Master Comparison: Dependency (USES-A) vs Association (HAS-A)

| Feature | Association (HAS-A) | Dependency (USES-A) |
|:---|:---|:---|
| **Duration / Lifetime** | **Long-term** (Object reference is stored in the class) | **Temporary** (Used strictly within a method call) |
| **Object Location** | **Instance variable** (Heap instance field) | **Local variable** or **Method parameter** |
| **Real-World Example** | `Car HAS-A Engine` | `OfficeWorker USES-A Printer` |
| **Usage Scope** | Reused across multiple methods throughout object lifespan | Used **only within one method** and then discarded |
| **Coupling Level** | Stronger coupling | **Loose coupling** (High modularity) |
