---
id: "lld-class-relationships-composition"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Class Relationships"
subSection: ""
title: "Composition"
slug: "lld-class-relationships-composition"
summary: "What if a relationship is so strong that the \"part\" is meaningless and cannot even exist without the \"whole\"\""
eli10: "Imagine Composition as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Composition Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Class Relationships","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Composition"
  code: |
    $71
---

What if a relationship is so strong that the "part" is meaningless and cannot even exist without the "whole"" 

This is the world of **Composition**. It represents the strongest form of **"has-a"** relationship, where the whole owns the parts and controls their lifecycle.

When you use composition, you're saying:

- *“This object is composed of other objects.”*
- *“And if the container goes away, so do its parts.”*

---

# 1. What is Composition"

**Composition** is a special type of association that signifies **strong ownership** between objects. The “whole” class is **fully responsible** for creating, managing, and destroying the “part” objects. In fact, the parts **cannot exist without** the whole.

#### Key Characteristics of Composition:

- Represents a **strong “has-a”** relationship.
- The **whole owns** the part and **controls its lifecycle**.
- When the whole is destroyed, the **parts are also destroyed**.
- The parts are **not shared** with any other object.
- The part has **no independent meaning or identity** outside the whole.

> If the part makes no sense without the whole, 
>
> **use composition**
>
> .

> 💡 **Key Insight:**

> **Real-World Analogy**
>
> Imagine a **House** and its **Rooms**:
>
> - A house **has** a living room, a kitchen, a bedroom.
> - These rooms **do not exist on their own**. They are part of the house.
> - When the house is demolished, the rooms are gone with it.
> - You don’t transfer a bedroom from one house to another.
>
> This is a textbook example of **composition**. The rooms are tightly bound to the house—not just logically, but in **lifecycle and ownership** as well.

---

# 2. UML Representation

In UML class diagrams, **composition** is represented by a **filled diamond (◆)** at the “whole” end of the relationship. This is in contrast to aggregation's hollow diamond (◊) and association's plain solid line.

```mermaid
classDiagram
    class Order {
        -orderId: String
        -lineItems: List~LineItem~
        +addItem(product: String, qty: int, price: double)
        +removeItem(product: String)
        +getTotal(): double
    }

    class LineItem {
        -productName: String
        -quantity: int
        -unitPrice: double
        +getSubtotal(): double
    }

    Order "1" *-- "*" LineItem : contains

    style Order fill:#00ceff,stroke:#000,color:#000
    style LineItem fill:#69db7c,stroke:#000,color:#000
```

The diagram shows two classes connected by composition:

- **Order** owns and manages a list of `LineItem` objects. The `1` to `*` multiplicity means one order can contain many line items.
- **LineItem** is a dependent entity. It holds data about a single product in the order (name, quantity, unit price), but it has no identity or purpose outside of its parent order.
- The **filled diamond** (`*--`) on the `Order` side is the UML notation for composition. It signals that `Order` is the "whole" and `LineItem` is the "part," and that the line items are owned by the order.

### Multiple Compositions

A class can be composed of multiple other objects. A `Car` is composed of an `Engine`, a `Transmission`, and a `Chassis`. These are integral parts of the car. You don't take the engine out and share it between two cars simultaneously. If the car is scrapped, these parts are scrapped with it. 

In the software model, the `Car` creates these components and controls their lifecycle.

```mermaid
classDiagram
    class Car {
        -engine: Engine
        -transmission: Transmission
        -chassis: Chassis
        +start()
        +drive()
    }

    class Engine {
        -horsepower: int
        -type: String
        +ignite()
    }

    class Transmission {
        -gears: int
        -type: String
        +shiftUp()
        +shiftDown()
    }

    class Chassis {
        -material: String
        -weight: double
    }

    Car "1" *-- "1" Engine : has
    Car "1" *-- "1" Transmission : has
    Car "1" *-- "1" Chassis : has

    style Car fill:#00ceff,stroke:#000,color:#000
    style Engine fill:#ffa94d,stroke:#000,color:#000
    style Transmission fill:#ffa94d,stroke:#000,color:#000
    style Chassis fill:#ffa94d,stroke:#000,color:#000
```

The filled diamonds on the `Car` side tell you: `Car` creates and owns these components. They don't float around the system independently.

---

# 3. Code Example

Let's model the ordering scenario. An `Order` composes multiple `LineItem` objects. The order creates line items internally when items are added, and destroys them when the order is destroyed.

```java
$71
```

Pay attention to three things that make this composition:

- **The order creates its own line items.** The `addItem()` method takes raw data (product name, quantity, price) and internally creates a `new LineItem(...)`. The line items are not passed in from outside. This is the key structural difference from aggregation, where parts are created externally and passed into the whole.
- **Line items have no independent existence.** There is no `LineItem` floating around in the system outside of an `Order`. No other class holds a reference to these line items. They are born inside the order and die with the order.
- **Destroying the order destroys all line items.** When the `Order` object is garbage collected (or goes out of scope in C++), all its `LineItem` objects are destroyed too. No orphaned line items, no cleanup code, no dangling references.

This is a true composition relationship: the parts exist only within the context of the whole, and their lifecycle is completely controlled by it.

---

# 4. When to Use Composition

Use composition when you can answer "yes" to these questions:

- **Is the part meaningless without the whole"** A line item without an order has no purpose. A room without a house makes no sense. If the part loses its identity outside the whole, that's composition.
- **Should the whole control the part's lifecycle"** If the whole creates the parts and destroys them, that's composition. If the parts are created externally and passed in, that leans toward aggregation.
- **Are the parts exclusive to one whole"** If a part belongs to exactly one whole and is never shared, that's composition. If the same part can appear in multiple wholes (like a song in multiple playlists), that's aggregation.
- **Do you want to model strong containment"** When the relationship is "is composed of" rather than "groups together," composition is the right choice.

Composition is a **preferred alternative to inheritance** when building flexible systems.

> “
>
> **Favor composition over inheritance**
>
> .” — GoF Design Principle

### Why"

- You can build complex behavior by **composing smaller, reusable parts**.
- It avoids the **tight coupling** and **fragility** of inheritance hierarchies.
- You can **swap out parts dynamically** to modify behavior.

For example:

- A `Vehicle` can **compose** an `Engine` interface.
- Swap between `PetrolEngine`, `ElectricEngine`, or `HybridEngine` at runtime.

This leads to **cleaner, testable, and decoupled code**.

---

# 5. Composition vs Aggregation vs Association

Let’s compare **association**, **aggregation**, and **composition** side-by-side to understand how they differ in ownership, lifecycle, reusability, and usage in real systems.

| Feature | Association | Aggregation | Composition |
| --- | --- | --- | --- |
| **Ownership** | None | Weak -- has-a | Strong -- owns-a |
| **Lifecycle** | Independent | Independent | Dependent -- part dies with whole |
| **Tightness** | Loose coupling | Moderate coupling | Tight coupling |
| **Multiplicity** | Flexible (1:1, 1:N, N:N) | Whole can group many parts | Whole composed of integral parts |
| **Reusability** | High -- parts reusable | Moderate -- parts often reused | Low -- parts not reused outside |
| **UML Symbol** | Solid Line | Hollow Diamond (◊) | Filled Diamond (◆) |
| **Who creates parts"** | Either side or external | External -- passed in | Whole -- created internally |
| **Real Example** | `Student ↔ Course` | `Playlist → Song` | `Order → LineItem` |

### Think of it like this:

- **Association** is a general connection: two classes simply know about each other.
- **Aggregation** is a *grouping:* the whole and parts can exist independently.
- **Composition** is an *ownership:* the part’s existence is bound to the whole.

### Decision Flowchart

```mermaid
flowchart TD
    A[Do you have a<br/>whole-part relationship"]
    A -->|No| B[Use Association]
    A -->|Yes| C{Can the part exist<br/>independently"}
    C -->|Yes| D{Can the part be<br/>shared"}
    C -->|No| E[Use Composition]
    D -->|Yes| F[Use Aggregation]
    D -->|No| G{Who creates<br/>the part"}
    G -->|Whole creates it| E
    G -->|External creates it| F

    style A fill:#00ceff,stroke:#000,color:#000
    style B fill:#69db7c,stroke:#000,color:#000
    style C fill:#ffa94d,stroke:#000,color:#000
    style D fill:#ffa94d,stroke:#000,color:#000
    style E fill:#ff8787,stroke:#000,color:#000
    style F fill:#9775fa,stroke:#000,color:#000
    style G fill:#ffa94d,stroke:#000,color:#000
```


