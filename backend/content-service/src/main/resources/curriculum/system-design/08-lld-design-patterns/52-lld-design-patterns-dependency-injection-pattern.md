---
id: "lld-design-patterns-dependency-injection-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Dependency Injection Pattern"
slug: "lld-design-patterns-dependency-injection-pattern"
summary: "Most codebases start clean, then slowly get messy in the same place: object creation inside business classes."
eli10: "Imagine Dependency Injection Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Dependency Injection Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Dependency Injection Pattern"
  code: |
    class OrderService {
        private final PaymentGateway gateway = new StripeGateway();
        private final Notifier notifier = new EmailNotifier();
    }
---

Most codebases start clean, then slowly get messy in the same place: **object creation inside business classes**.

You write:

```java
class OrderService {
    private final PaymentGateway gateway = new StripeGateway();
    private final Notifier notifier = new EmailNotifier();
}
```

It works, until requirements change: mock the gateway for tests, switch notifier per user, add retries/logging, support a new provider. Now `OrderService` is doing two jobs: **business logic** and **wiring dependencies**. That tight coupling makes changes risky and testing painful.

The **Dependency Injection (DI) Pattern** fixes this by flipping control: instead of creating collaborators, a class **receives** them (usually via constructor). Your class depends on *interfaces*, and composition happens outside.

---

# 1. What is Dependency Injection"

> [!PAYWALL] This content is for premium members only.

**Dependency Injection** is a design pattern where an object receives its dependencies from an external source rather than creating them itself.

**The key insight:** Don't call us, we'll call you. A class should not instantiate its collaborators. Instead, collaborators should be provided (injected) by someone else.

```mermaid
flowchart TB

    subgraph With DI
        direction TB
        A2[OrderService]:::primary --> B2[receives]:::green
        E2[Injector]:::secondary --> B2
        E2 --> C2[PaymentProcessor]:::orange
        E2 --> D2[EmailService]:::orange
    end

    subgraph Without DI
        direction TB
        A1[OrderService]:::primary --> B1[creates]:::red
        B1 --> C1[PaymentProcessor]:::orange
        B1 --> D1[EmailService]:::orange
    end

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef secondary fill:#38d9a9,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

The pattern is part of a broader principle called **Inversion of Control (IoC)**, where the control of object creation is inverted from the class itself to an external entity.

---

# 2. The Problem: Tight Coupling

Without dependency injection, classes directly instantiate their dependencies. This creates tight coupling that ripples through your codebase.

This approach has several problems:

### Problem 1: Impossible to Test in Isolation

When `OrderService` creates a `StripePaymentProcessor` internally, every test actually hits the Stripe API. You cannot test order logic without making real payment calls.

### Problem 2: Cannot Swap Implementations

Switching from Stripe to PayPal means finding every place that creates `StripePaymentProcessor` and changing it. If you have 50 services using payments, that's 50 files to modify.

### Problem 3: Hidden Dependencies

Looking at the class signature tells you nothing about what it needs:

### Problem 4: Violates Single Responsibility

The class now has two jobs: its actual business logic AND managing the lifecycle of its dependencies.

### Problem 5: Hard to Configure

What if `EmailService` needs different SMTP settings in development vs production" The configuration is buried inside the class that uses it.

---

# 3. The Solution: Inject Dependencies

With dependency injection, classes declare what they need and receive it from outside:

```mermaid
flowchart TD
    subgraph External["External Configuration"]
        I[Injector/Container]:::secondary
    end

    subgraph Dependencies
        P[PaymentProcessor]:::orange
        E[EmailService]:::orange
        INV[InventoryService]:::orange
    end

    subgraph Service
        O[OrderService]:::primary
    end

    I --> P
    I --> E
    I --> INV
    I -->|injects| O

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef secondary fill:#38d9a9,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
```

Now `OrderService`:

- Declares its dependencies explicitly
- Receives them through its constructor
- Works with any implementation that satisfies the interface
- Can be tested with mock implementations

---

# 4. Three Types of Dependency Injection

There are three ways to inject dependencies into a class. Each has its use cases.

### 4.1 Constructor Injection (Recommended)

Dependencies are provided through the class constructor.

#### **Advantages:**

- Dependencies are explicit and visible in the constructor signature
- Object is fully initialized after construction
- Dependencies can be made `final` (immutable)
- Easy to see if a class has too many dependencies

**When to Use:** This should be your default choice for required dependencies.

### 4.2 Setter Injection

Dependencies are provided through setter methods after construction.

#### **Advantages:**

- Allows optional dependencies
- Dependencies can be changed at runtime
- Useful for circular dependency scenarios

#### **Disadvantages:**

- Object may be in an invalid state if setters aren't called
- Dependencies are mutable (can be changed unexpectedly)
- Harder to ensure all dependencies are provided

**When to Use:** For optional dependencies or when you need to change dependencies at runtime.

### 4.3 Interface Injection

The dependency provides an injector method that clients must implement.

**When to Use:** Rarely. This is the least common form. You might see it in plugin architectures or frameworks.

### Comparison

| Type        | Best For                 | Dependencies                 |
| Constructor | Required dependencies    | Immutable, explicit          |
| Setter      | Optional dependencies    | Mutable, can be null         |
| Interface   | Framework integration    | Defined by contract          |

---

# 5. Dependency Injection in Action

Let's visualize how DI transforms our order processing system:

### Before: Tight Coupling

```mermaid
flowchart TD
    A[OrderService]:::primary

    A -->|creates| B["new StripePaymentProcessor()"]:::red
    A -->|creates| C["new SmtpEmailService()"]:::red
    A -->|creates| D["new MySqlInventory()"]:::red

    B --> E[Stripe]:::green
    C --> F[SMTP]:::green
    D --> G[(MySQL)]:::green

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef red fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

### After: Loose Coupling

```mermaid
flowchart TD
    subgraph Interfaces
        I1[PaymentProcessor]:::secondary
        I2[EmailService]:::secondary
        I3[InventoryService]:::secondary
    end

    subgraph Implementations
        P1[StripePayment]:::orange
        P2[PayPalPayment]:::orange
        E1[SmtpEmail]:::orange
        E2[SendGridEmail]:::orange
        INV1[MySqlInventory]:::orange
        INV2[RedisInventory]:::orange
    end

    A[OrderService]:::primary --> I1
    A --> I2
    A --> I3

    I1 -.-> P1
    I1 -.-> P2
    I2 -.-> E1
    I2 -.-> E2
    I3 -.-> INV1
    I3 -.-> INV2

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef secondary fill:#38d9a9,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
```

The `OrderService` depends on interfaces, not implementations. Any class implementing those interfaces can be injected.

---

# 6. Testing with Dependency Injection

The biggest benefit is testability. With DI, you can inject test doubles:

```mermaid
flowchart TB

    subgraph Production
        direction TB
        D[OrderService] --> E[StripePayment]
        E --> F[Stripe API]
    end

    subgraph Testing
        direction TB
        A[OrderService] --> B[MockPayment]
        B --> C[In-Memory]
    end

    %% Optional styling to resemble the colors in the image
    style A fill:#00ceff,color:#000,stroke:#000
    style B fill:#ffa94d,color:#000,stroke:#000
    style C fill:#69db7c,color:#000,stroke:#000

    style D fill:#00ceff,color:#000,stroke:#000
    style E fill:#ffa94d,color:#000,stroke:#000
    style F fill:#69db7c,color:#000,stroke:#000
```

No Stripe API calls. No emails sent. No database connections. Fast, reliable, isolated tests.

---

# 7. DI Containers and Frameworks

While you can do dependency injection manually (as shown above), DI containers automate the process.

#### Popular DI frameworks:

| ##### Language | ##### Framework |
| --- | --- |
| **Java** | Spring, Guice, Dagger |
| **C#** | ASP.NET Core DI, Autofac |
| **Python** | dependency-injector |
| **TypeScript** | InversifyJS, tsyringe |

### How Containers Work

```mermaid
flowchart LR
    A[Application Start]:::primary --> B[Register Dependencies]:::secondary
    B --> C[Container Ready]:::green
    C --> D[Request Service]:::orange
    D --> E[Container Resolves Dependencies]:::secondary
    E --> F[Returns Instance]:::green

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef secondary fill:#38d9a9,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

1. **Registration:** You tell the container which implementation to use for each interface
2. **Resolution:** When you request a service, the container creates it with all dependencies
3. **Lifecycle Management:** The container manages singleton vs transient instances
