---
id: "lld-lld-introduction-what-is-low-level-design-lld"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - LLD Introduction"
subSection: ""
title: "What is Low-Level Design (LLD)?"
slug: "lld-lld-introduction-what-is-low-level-design-lld"
summary: "When preparing for software engineering interviews, you'll often hear about two types of design rounds: High-Level Design (HLD) and Low-Level Design (LLD)."
eli10: "Imagine What is Low-Level Design (LLD)? as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "What is Low-Level Design (LLD)? Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","LLD Introduction","System Design","Architecture"]

---

When preparing for software engineering interviews, you'll often hear about two types of design rounds: **High-Level Design (HLD)** and **Low-Level Design (LLD)**.

While **HLD** focuses on system architecture, components, and how they interact at a macro level, **LLD** zooms in on the details of individual components.

Think of it this way:

- **HLD answers:** "What components do we need and how do they communicate""
- **LLD answers:** "How do we actually implement each component""

---

# What is Low-Level Design"

> **Low-Level Design (LLD)**
>
>  is the process of translating high-level components into working code structure. It bridges the gap between architecture and implementation.

It is about answering the **“how”** of implementation. It moves beyond the "what" and dives into the granular details of the code structure. It defines the classes, interfaces, methods, and their relationships that implement a specific functionality.

#### **Example:**

- **High-Level Design (HLD) says:** “We need a Notification Service.”
- **Low-Level Design (LLD) says:** “We’ll use an interface **NotificationSender** with concrete classes like **EmailSender**, **SmsSender**, and **PushNotificationSender**, all managed by a **NotificationManager**.”

#### Where LLD Fits in the Development Process

```mermaid
flowchart LR
    REQ[Requirements] --> HLD[High-Level Design]
    HLD --> LLD[Low-Level Design]
    LLD --> CODE[Code Implementation]

    style REQ fill:#00ceff,stroke:#000,color:#000
    style HLD fill:#ffa94d,stroke:#000,color:#000
    style LLD fill:#69db7c,stroke:#000,color:#000
    style CODE fill:#9775fa,stroke:#000,color:#000
```

LLD is not just about writing code that works, it’s about **writing code that’s modular, testable, extensible, and easy to reason about** as the system grows.

---

# Core Components of LLD

Let’s break down the core elements that LLD focuses on:

### 1. Classes and Objects

This is where design truly begins. You identify the **main entities** and their roles within the system:

- **What are the key classes"**
- **What are their responsibilities"**
- **What data do they hold (attributes)"**
- **What operations do they perform (methods)"**

> 💡 **Key Insight:**

> **EXAMPLE**
>
> In a food delivery system, we can have classes like `Restaurant`, `Order`, `Customer`, and `DeliveryAgent`
>
> - `Customer` places orders
> - `Restaurant` prepares food
> - `DeliveryAgent` delivers it
> - `Order` encapsulates the transaction
>
> An `Order` class would have:
>
> - **Attributes: **`orderId`, `customerId`, `items`, `totalAmount`, `status`
> - **Methods:** `calculateTotal()`, `addItem(Item item)`, `updateStatus(newStatus)`

### 2. Interfaces and Abstractions

Interfaces define **contracts** between components. They are critical to ensure **loose coupling,** allowing multiple components to interact without depending on each other's internal implementation details.

Ask yourself:

- What functionality should a class expose to the outside world"
- What details should remain hidden"
- Which parts of the system are likely to change or have multiple variations"

> 💡 **Key Insight:**

> **EXAMPLE**
>
> A `PaymentProcessor` interface defines a contract for payment with multiple implementations:
>
> - `StripePaymentProcessor`
> - `RazorpayPaymentProcessor`
> - `PayPalPaymentProcessor`
>
> Now, the core application logic interacts only with the `PaymentProcessor` interface. This allows you to switch between Stripe and Razorpay or add a new provider without changing a single line of your business logic.

### 3. Relationships Between Classes

Classes don't exist in isolation. LLD defines these relationships clearly and precisely.

##### **Key relationships include:**

- **Association:** A general "uses-a" relationship. A `Doctor` *uses a* `Stethoscope`.
- **Aggregation (Weak "has-a"):** An object contains other objects, but they can exist independently. A `Department` *has* `Professors`. If the department is closed, the professors still exist.
- **Composition (Strong "has-a"):** An object is *composed of* other objects, and their lifecycles are tied. A `House` is *composed of* `Rooms`. If you demolish the house, the rooms are destroyed with it.
- **Inheritance ("is-a"):** A class inherits properties and behaviors from a parent. A `Car` *is a* `Vehicle`.

You also define **cardinality** to specify **the number of instances** involved in a relationship.

- **One-to-One: **One instance of A is linked to one instance of B.
   - **Example: **Each `User` has one `Profile`.
- **One-to-Many: **One instance of A is linked to multiple instances of B.
   - **Example: **A `Customer` can have multiple `Orders`.
- **Many-to-Many: **Multiple instances of A relate to multiple instances of B.
   - **Example: **A `Student` can enroll in multiple `Courses`, and each `Course` can have multiple `Students`.

### 4. Method Signatures

Once your classes and relationships are defined, the next step is deciding **how they behave **using methods. A well-designed method signature is self-documenting and intuitive.

You’ll need to decide:

- What methods should each class expose"
- What are the method's **input parameters**, and **return types**"
- Should the method be public, private, or protected"
- What **exceptions** might they throw"
- Is it **synchronous or asynchronous**"

Consistency, readability, and clarity in method signatures make your code intuitive and easier to maintain.

> 💡 **Key Insight:**

> **TIP**
>
> **Bad**: `void sendMsg(String str)`
>
> **Good**: `void sendNotification(Message message)`
>
> By designing expressive methods, you make your system intuitive to use and easy to extend, for example, adding new message types without rewriting existing code.

### 5. Design Patterns

LLD is also the stage where you **apply proven solutions** to common design problems using **design patterns**. These patterns provide reusable templates that bring structure, robustness, and maintainability to your code.

Some commonly used patterns in LLD include:

- **Singleton:** useful when you need exactly one instance of a class across your system.
- **Factory: **useful when you want to delegate object creation without exposing the instantiation details to the client.
- **Strategy: **useful when** **you need to switch between multiple algorithms or behaviors at runtime.
- **Observer:** useful for event-driven systems where you need to establish a publisher–subscriber relationship between objects.
- **Decorator: **useful when you want to add new behavior to objects without altering existing code.
- **Adapter: **useful when you need to bridge incompatible interfaces to work together.
- **Facade:** useful when you want to provide a simplified interface to a complex subsystem.

Using the right design patterns isn’t about memorizing their definitions, it’s about **recognizing the problems they solve**.

> **Tip:**
>
>  Don’t force patterns. Let the problem shape the pattern, not the other way around.

---

# **Importance of LLD in Software Development**

A good LLD bridges the gap between idea and execution. It turns broad architectural concepts into practical, working software components that can evolve and scale over time.

#### **Maintainability**

A well-designed system is easy to read, debug, and extend. When components have clear responsibilities and clean interfaces, you can make changes without fear of breaking unrelated parts of the system.

#### **Scalability & Performance** 

While **High-Level Design (HLD)** focuses on infrastructure-level scalability (like horizontal scaling or database sharding), LLD ensures that **individual components can scale gracefully**—e.g., a sorting module that works efficiently whether it handles 100 or 10,000 records.

#### **Testability** 

Clean LLD naturally leads to **loosely coupled components**, making unit testing straightforward. When each class does one thing well and depends only on abstractions, testing becomes faster, easier, and more reliable.

#### **Collaboration**

LLD provides a **clear blueprint** for developers, enabling multiple engineers to work on the same module concurrently. With well-defined contracts and responsibilities, there's less confusion and fewer merge conflicts.

#### **Reusability**

When you design modules with well-thought-out responsibilities and abstractions, those modules can often be reused in different parts of your codebase or even across projects.

---

# **Importance of LLD in Interviews**

LLD interviews go far beyond checking if you can write code that compiles. They assess **how you think**, **how you structure code**, and whether you can **build software that’s easy to understand, maintain, and evolve** over time.

Let’s break down what exactly interviewers are looking for.

#### **Problem-Solving**

Before writing code, great engineers think about design.

Interviewers want to see if you can take an open-ended problem and **break it down into smaller, manageable components**.

#### **Object-Oriented Principles**

Object-Oriented Programming (OOP) is the backbone of LLD interviews. Interviewers want to see if you truly **understand and apply** OOP principles like encapsulation, abstraction, inheritance, and polymorphism in a meaningful way.

#### **Design Principles**

A good engineer doesn’t just write code that works; they write **code that works well over time**. That’s where principles like **SOLID**, **DRY**, and **KISS** come in.

Interviewers want to know if you can use good design principles like the SOLID principle to build systems that are robust, flexible, and easy to change.

#### **Design Patterns**

Interviewers often expect you to recognize **when a classic pattern fits naturally** into your design.

Common examples include:

- **Strategy Pattern** for interchangeable behaviors (e.g., sorting algorithms, payment methods)
- **Observer Pattern** for event-driven systems (e.g., notifications, subscribers)
- **Factory Pattern** for flexible object creation without exposing instantiation logic

#### **Clean Code**

Do you care about clarity" Do your method names make sense" Are your responsibilities well-scoped" Interviewers look for signs that you write code **others can read, maintain, and trust**.

#### **Communication & Trade-offs**

Interviewers evaluate how well you can:

- Articulate your design choices.
- Justify trade-offs (e.g., flexibility vs. simplicity, performance vs. readability).
- Discuss alternative approaches and their pros/cons.

---

Now that you have a good understanding of what Low-Level Design (LLD) is, it’s time to take a step back and look at where LLD fits within the broader software design process.

This brings us to an important question:** “How is Low-Level Design different from High-Level Design"”**

In the next chapter, we will answer this question.
