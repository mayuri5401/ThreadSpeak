---
id: "lld-design-patterns-introduction-to-design-patterns"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Introduction to Design Patterns"
slug: "lld-design-patterns-introduction-to-design-patterns"
summary: "You have probably encountered this situation: you are building a feature, and partway through, you realize you have written similar code before. The structure feels familiar. Maybe it was handling different payment methods, or notifying multiple c..."
eli10: "Imagine Introduction to Design Patterns as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Introduction to Design Patterns Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

You have probably encountered this situation: you are building a feature, and partway through, you realize you have written similar code before. The structure feels familiar. Maybe it was handling different payment methods, or notifying multiple components when something changed, or creating objects without hardcoding their exact types. 

You solved it then, but now you cannot quite remember how, and you end up reinventing a solution from scratch.

**Design patterns** are named solutions to these **recurring problems**. They give you a vocabulary to describe common structures, a toolkit of proven approaches, and a way to communicate design decisions with other developers without explaining everything from first principles.

---

# What Are Design Patterns"

A design pattern is a reusable solution to a commonly occurring problem in software design. It is not a finished piece of code you can copy-paste. 

It is more like a template or blueprint that describes how to solve a problem in a way that can be adapted to many different situations.

> 💡 **Key Insight:**

> **Real-World Analogy: Furniture Assembly**
>
> Imagine assembling furniture from IKEA:
>
> - You don't invent a new method to connect every screw or panel.
> - You follow a **repeatable set of instructions** (the pattern).
> - This ensures the outcome is **predictable, reliable, and efficient**.
>
> That’s exactly what design patterns do in software. They reduce chaos by giving you a well-tested plan.

---

# Why Should You Use Design Patterns"

### 1. Reusability

> **“Don’t just solve the problem. Solve it **
>
> ***well***
>
> **, and solve it **
>
> ***once***
>
> **.”**

Design patterns are like reusable mental models. Instead of solving a problem from scratch every time, you apply a pattern that has already been validated by decades of software engineering practice.

For example:

- Instead of figuring out how to restrict a class to a single instance, just use the **Singleton Pattern**.
- Need a pluggable behavior at runtime" Reach for the **Strategy Pattern**.

This kind of reuse isn’t about copying code, it’s about **reusing ideas** and **structures** that work.

### 2. **Maintainability**

> **“Clean design today prevents chaos tomorrow.”**

When your system is built using well-structured patterns:

- Each component has a clearly defined role.
- Logic is modular, isolated, and easier to understand.
- Making changes or fixing bugs becomes straightforward.

Patterns like **Factory Method**, **Decorator**, and **Observer** make your system easier to **modify without rewriting** everything.

If your business logic changes, you only need to tweak the specific implementation, not the whole design.

### 3. Readability

> **“Good code is read more often than it is written.”**

Design patterns give your code a **shared vocabulary**. When you name a class `AbstractFactory` or `Strategy`, experienced developers immediately understand the role that class plays.

The result" **Instant clarity**. New team members, code reviewers, or interviewers can understand your design faster and with fewer explanations.

### 4. Flexibility

> **“Design for change. Because change **
>
> ***will***
>
> ** come.”**

Patterns are often built around **abstraction**, **decoupling**, and **composition over inheritance**. This makes your system more adaptable to future changes.

- Want to add a new type of payment method" The **Strategy Pattern** lets you do it without touching existing payment logic.
- Need to introduce caching or logging to an existing service" The **Decorator Pattern** lets you do it without modifying the core class.
- Want to handle user actions as undoable commands" Use the **Command Pattern** for full control.

In other words, patterns empower your code to **respond to new requirements with minimal disruption**.

---

# Brief History

Design patterns did not emerge from a single source. The concept comes from architecture, specifically from Christopher Alexander's 1977 book "A Pattern Language," which described patterns for building towns and houses. Software engineers recognized that similar ideas applied to code.

The landmark moment came in 1994 with the publication of "Design Patterns: Elements of Reusable Object-Oriented Software" by Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides. These four authors became known as the "Gang of Four" (GoF), and their book catalogued 23 patterns that have become the foundation of object-oriented design vocabulary.

The GoF book was written in the context of C++ and Smalltalk, but the patterns themselves are language-agnostic. They apply to Java, Python, C#, JavaScript, and most other object-oriented languages, though the implementation details vary.

---

# Categories of Design Patterns

The classic “Gang of Four” (GoF) book categorized design patterns into **three groups**:

## 1. **Creational Patterns**

Creational patterns deal with object creation mechanisms. They abstract the instantiation process, making systems independent of how objects are created, composed, and represented.

| Pattern | Intent | When to Use |
|---------|--------|-------------|
| **Singleton** | Ensure a class has only one instance with global access | Configuration managers, connection pools, logging |
| **Factory Method** | Define interface for creating objects, let subclasses decide which class | When a class cannot anticipate the type of objects it must create |
| **Abstract Factory** | Create families of related objects without specifying concrete classes | Cross-platform UI, consistent product families |
| **Builder** | Construct complex objects step by step | Objects with many optional parameters, immutable objects |
| **Prototype** | Create objects by cloning existing instances | When object creation is expensive, configuration templates |

## 2. **Structural Patterns**

Structural patterns deal with how classes and objects are composed to form larger structures. They help ensure that when parts of a system change, the entire structure does not need to change.

| Pattern | Intent | When to Use |
|---------|--------|-------------|
| **Adapter** | Convert interface of a class into another interface clients expect | Integrating legacy code, third-party libraries |
| **Bridge** | Decouple abstraction from implementation so both can vary | Platform-independent abstractions, driver architectures |
| **Composite** | Compose objects into tree structures, treat individual and composite uniformly | File systems, UI components, organization hierarchies |
| **Decorator** | Attach additional responsibilities dynamically | Adding features without subclass explosion, I/O streams |
| **Facade** | Provide unified interface to a set of interfaces | Simplifying complex subsystems, API design |
| **Flyweight** | Share fine-grained objects efficiently | Large numbers of similar objects, text rendering |
| **Proxy** | Provide surrogate for another object to control access | Lazy loading, access control, remote objects |

## 3. **Behavioral Patterns**

Behavioral patterns deal with algorithms and the assignment of responsibilities between objects. They describe patterns of communication between objects.

| Pattern | Intent | When to Use |
|---------|--------|-------------|
| **Chain of Responsibility** | Pass request along chain until one handler processes it | Middleware, event handling, logging levels |
| **Command** | Encapsulate request as object | Undo/redo, queuing operations, transactions |
| **Interpreter** | Define grammar and interpreter for a language | DSLs, expression evaluation, simple parsers |
| **Iterator** | Access elements sequentially without exposing representation | Traversing collections uniformly |
| **Mediator** | Centralize complex communication between objects | Chat rooms, air traffic control, MVC controllers |
| **Memento** | Capture and restore object state without violating encapsulation | Undo, save/restore, checkpoints |
| **Observer** | One-to-many dependency with automatic notification | Event systems, data binding, pub/sub |
| **State** | Alter behavior when internal state changes | Finite state machines, workflow engines |
| **Strategy** | Define family of interchangeable algorithms | Sorting, compression, payment processing |
| **Template Method** | Define algorithm skeleton, let subclasses fill in steps | Frameworks, standardized processes |
| **Visitor** | Add operations without changing element classes | AST processing, serialization, reporting |

---

# A Note on Pattern Criticism

Design patterns are not universally praised. Some common criticisms:

**"Patterns are workarounds for language limitations."** There is truth here. Some patterns (like Singleton or Strategy) are trivial in languages with first-class functions or module systems. A Python module is already a singleton. A lambda can be a strategy without a separate class.

**"Patterns lead to over-engineering."** Also valid. Inexperienced developers sometimes use patterns to seem sophisticated, adding layers of abstraction that make code harder to understand. The cure is worse than the disease.

**"Patterns are dated."** The GoF book is from 1994. Some patterns are less relevant today. Interpreter is rarely implemented manually. Iterator is built into every modern language. Functional programming offers alternatives to many behavioral patterns.

These criticisms do not make patterns worthless. They mean you should:

- Understand the underlying problem, not just the solution
- Apply patterns when they genuinely help, not to show off
- Adapt patterns to modern language features
- Know when simpler approaches are better

With that perspective, let's dive into the patterns themselves.
