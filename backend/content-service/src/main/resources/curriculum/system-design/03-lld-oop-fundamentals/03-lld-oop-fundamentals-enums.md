---
id: "lld-oop-fundamentals-enums"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - OOP Fundamentals"
subSection: ""
title: "Enums"
slug: "lld-oop-fundamentals-enums"
summary: "Imagine you're building an e-commerce platform and you need to track the status of every order. Orders flow through various states: placed, confirmed, shipped, delivered, or cancelled. How do you represent these states in code\""
eli10: "Imagine Enums as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Enums Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","OOP Fundamentals","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Enums"
  code: |
    String status = "PENDING";
    
    // Somewhere else in the codebase...
    if (status.equals("PNDING")) {  // Typo! This condition is never true
        processOrder();
    }
---

Imagine you're building an e-commerce platform and you need to track the status of every order. Orders flow through various states: placed, confirmed, shipped, delivered, or cancelled. How do you represent these states in code"

You could use strings: `"PLACED"`, `"SHIPPED"`, `"DELIVERED"`. But what happens when someone types `"Shiped"` instead of `"SHIPPED"`" 

The compiler won't catch it and your code will silently fail at runtime.

You could use integers: `1` for placed, `2` for shipped, `3` for delivered. But now your code is littered with magic numbers. What does `if (status == 2)` mean"

This is exactly the type of problem **enums** solve.

---

# 1. What is an Enum"

An **enum** (short for enumeration) is a special data type that defines a fixed set of named constants. Unlike strings or integers, enums are **type-safe**, meaning the compiler ensures you can only use values that actually exist in your defined set.

They ensure that a variable can only take **one out of a predefined set of valid options**.

<!-- payload:mermaidBlock:START {"id":"698245e58a938064df02bea7","caption":"In UML, enums are represented with the <<enumeration>> stereotype","disableInteraction":false,"size":"100"} -->
```mermaid
classDiagram
    class OrderStatus {
        <<enumeration>>
        PLACED
        CONFIRMED
        SHIPPED
		DELIVERED
		CANCELLED
    }
    style OrderStatus fill:#ffa94d,stroke:#000,color:#000
```

> If a value can only be one of a predefined set of options, consider using an enum.

### Why Use Enums"

To appreciate what enums give you, consider the alternative. Without enums, you'd represent order statuses as strings scattered throughout your codebase:

```java
String status = "PENDING";

// Somewhere else in the codebase...
if (status.equals("PNDING")) {  // Typo! This condition is never true
    processOrder();
}
```

This code compiles without any warnings. The typo `"PNDING"` is a perfectly valid string as far as the compiler is concerned. The bug only surfaces when a customer complains that their order never gets processed. 

Enums eliminate this entire category of bugs. When you define `OrderStatus` as an enum with values like `PENDING`, `CONFIRMED`, `SHIPPED`, and `DELIVERED`, the compiler knows exactly which values are valid.

Here are several key advantages Enums provide over plain constants or strings:

- **Avoid “magic values”:** No more scattered strings or integers like `"PENDING"` or `3` in your code.
- **Improve readability:** Enums make your intent clear — `OrderStatus.SHIPPED` is far more descriptive than `3`.
- **Enable compiler checks:** The compiler validates enum usage, catching typos and invalid assignments early.
- **Support IDE features:** Most IDEs provide auto-completion and refactoring tools for enum values.
- **Reduce bugs:** You can’t accidentally assign a random string or number that doesn’t belong to enum.

### Example Enums

Enums are perfect for defining categories or states that rarely change.

- Order States (e.g., `PENDING`, `IN_PROGRESS`, `COMPLETED`)
- User Roles (e.g., `ADMIN`, `CUSTOMER`, `DRIVER`)
- Vehicle Types (e.g., `CAR`, `BIKE`, `TRUCK`)
- Directions (e.g., `NORTH`, `SOUTH`, `EAST`, `WEST`)

By using enums instead of raw strings, you make your system easier to understand and harder to misuse.

---

# 2. Enum Examples

## Simple Enum

The most basic form of an enum defines a list of named constants under a single type. Let's model the status of an order in an e-commerce system.

```mermaid
classDiagram
    class OrderStatus {
        <<enumeration>>
        PLACED
        CONFIRMED
        SHIPPED
        DELIVERED
        CANCELLED
    }

    class Order {
        -Long orderId
        -OrderStatus status
        -Date createdAt
        +getStatus() OrderStatus
        +setStatus(OrderStatus) void
    }

    Order --> OrderStatus : uses

    style OrderStatus fill:#ffa94d,stroke:#000,color:#000
    style Order fill:#00ceff,stroke:#000,color:#000
```

```java
public enum OrderStatus {
    PLACED,
    CONFIRMED,
    SHIPPED,
    DELIVERED,
    CANCELLED
}
```

This enum defines a **finite set of valid states** an order can have. Nothing else is allowed.

#### **Using it in code**

```java
OrderStatus status = OrderStatus.SHIPPED;

if (status == OrderStatus.SHIPPED) {
    System.out.println("Your package is on the way!");
}
```

Simple enums work well when you just need a list of named constants. But what if each constant needs to carry additional data"

## Enums with Properties and Methods

Enums can do more than just name constants. In many languages, each enum value can hold additional data and even define behavior. This makes them surprisingly powerful for modeling domain concepts.

Let’s consider a `Coin` enum that represents U.S. coins and their denominations. Each coin has a name (PENNY, NICKEL, DIME, QUARTER) and a value in cents (1, 5, 10, 25). Instead of maintaining a separate lookup table for coin values, you can embed the value directly in the enum.

```java
public enum Coin {
    PENNY(1),
    NICKEL(5),
    DIME(10),
    QUARTER(25);

    private final int value;

    Coin(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
```

#### Using It in Code

```java
int total = Coin.DIME.getValue() + Coin.QUARTER.getValue(); // 35
```

This is far more elegant and safe than maintaining separate arrays or lookup maps. The data lives right next to the constant it belongs to, so there's no risk of the value and the name getting out of sync.

---

# 3. Practical Example: Order Processing System

Let's build a small order processing system that uses two enums: `OrderStatus` (which we've already seen) and `PaymentMethod`. Together, they demonstrate how enums bring structure and safety to a real domain model.

The `Order` class tracks an order's status, payment method, and total amount. It provides methods to advance the status through its lifecycle, cancel the order, and display order information.

The key insight is that enums control the valid transitions: an order can only move forward through the status chain (PLACED to CONFIRMED to SHIPPED to DELIVERED), and cancellation is only allowed before shipping.

```java
$71
```

#### Why This Design Works

- **Status transitions are controlled:** The `advanceStatus()` method enforces that orders move through a valid sequence. You can't jump from PLACED to DELIVERED or go backwards from SHIPPED to CONFIRMED. The enum combined with the switch statement makes the valid transitions explicit.
- **Payment fees are self-contained:** Each `PaymentMethod` carries its own fee percentage. There's no separate lookup table or configuration file to keep in sync. Adding a new payment method means adding one enum value with its fee, and the rest of the code works automatically.
- **Cancellation rules are clear:** The `cancel()` method uses enum comparison to enforce business rules. You can only cancel before shipping. If someone tries to cancel a shipped order, the method returns false. No ambiguity, no string matching.
- **Easy to extend:** Need to add a `RETURNED` status" Add it to the enum and update the switch statement. The compiler will remind you if you miss handling it. Need a new payment method like `WALLET`" Add one line to the enum with its display name and fee.
