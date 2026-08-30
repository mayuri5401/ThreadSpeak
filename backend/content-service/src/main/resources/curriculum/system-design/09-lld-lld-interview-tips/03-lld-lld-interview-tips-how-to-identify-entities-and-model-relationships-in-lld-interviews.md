---
id: "lld-lld-interview-tips-how-to-identify-entities-and-model-relationships-in-lld-interviews"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - LLD Interview Tips"
subSection: ""
title: "How to Identify Entities and Model Relationships in LLD Interviews"
slug: "lld-lld-interview-tips-how-to-identify-entities-and-model-relationships-in-lld-interviews"
summary: "In most LLD interviews, the quality of your solution depends heavily on how well you model the problem before writing any code. And at the heart of good modeling lies one critical skill: identifying the right entities and defining how they relate ..."
eli10: "Imagine How to Identify Entities and Model Relationships in LLD Interviews as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "How to Identify Entities and Model Relationships in LLD Interviews Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","LLD Interview Tips","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for How to Identify Entities and Model Relationships in LLD Interviews"
  code: |
    $9c
---

In most LLD interviews, the quality of your solution depends heavily on how well you model the problem before writing any code. And at the heart of good modeling lies one critical skill: identifying the right entities and defining how they relate to each other.

Many candidates jump straight into classes, methods, and design patterns. But strong designs rarely begin there. They begin with understanding the domain. What are the core objects in the system" What data do they hold" How do they interact" Which objects own or control others" 

Getting these fundamentals right makes the rest of the design feel natural and coherent. Getting them wrong leads to confusion, tight coupling, and fragile code.

This chapter will teach you how to systematically extract entities from problem statements.

---

# 1. The Noun-Verb Technique

The core intuition is straightforward: **nouns in the requirements often map to entities (classes)**, and **verbs often map to behaviors (methods)**.

But if you apply this rule literally, it backfires.

A typical problem statement can easily contain **15–25 nouns**, and your first pass will produce a long list of “possible classes.” In reality, only **6–10** of them usually deserve to become real entities in your design. The rest are attributes, enums, or concepts that don't need their own entity.

Let's walk through this with a concrete example. Here's a simplified Movie Ticket Booking problem statement:

> "Users can browse movies showing at different theaters. Each theater has multiple screens, and each screen hosts shows at specific times. Users select a show, choose seats, and make a booking. The system generates a ticket with a unique ID. Different seat types (Regular, Premium, VIP) have different prices."

Start by underlining every noun: User, movie, theater, screen, show, time, seat, booking, system, ticket, ID, seat type, price. 

That’s **13 nouns**. If you convert all of them into classes, your design will blow up immediately. The real skill is the next step: **filtering**.

### Filter the nouns into the right buckets

| Raw Noun | Classification | Reasoning |
|----------|---------------|-----------|
| User | Keep as class | Has state (name, email), performs actions |
| Movie | Keep as class | Has attributes (title, duration, genre), referenced by Show |
| Theater | Keep as class | Contains screens, has location |
| Screen | Keep as class | Belongs to theater, has seats, hosts shows |
| Show | Keep as class | Links movie to screen at a time, has its own lifecycle |
| Time | Discard (attribute) | Property of Show, not an independent entity |
| Seat | Keep as class | Has number, type, physical location in screen |
| Booking | Keep as class | Tracks user, show, seats, payment status |
| System | Discard (meta-concept) | This is the application, not a domain entity |
| Ticket | Merge with Booking | In this context, the ticket IS the booking confirmation |
| ID | Discard (attribute) | Property of Ticket/Booking, not a standalone entity |
| Seat Type | Keep as enum | Fixed set: REGULAR, PREMIUM, VIP |
| Price | Discard (attribute) | Property of seat type or show, not its own entity |

13 nouns became 7 entities and 1 enum. The filtering rules that got us there:

- **Discard system-level concepts:** "System," "platform," "application" describe what you're building, not what lives inside it.
- **Discard properties of other nouns:** "Price," "time," "ID," "name" are attributes that belong on another entity, not classes of their own.
- **Merge overlapping nouns:** If two nouns describe the same thing from different angles (Ticket and Booking), pick the one with richer behavior and drop the other.
- **Convert fixed categories to enums:** If you can list every possible value upfront (REGULAR, PREMIUM, VIP) and the set won't grow at runtime, it's an enum, not a class.

Once your entities are clear, extract verbs and attach them to whoever performs the action:

- “Users **browse** movies” → `browseMovies()` lives in a **MovieCatalogService** (or Search/Browse service).
- “Users **select** a show, **choose** seats” → selection logic belongs to a **BookingService**.
- “Users **make** a booking” → `createBooking()` belongs to **BookingService**, produces a `Booking`.
- “System **generates** a ticket” → ticket generation is a step inside booking confirmation (often `Booking.confirm()` or `TicketFactory.createFrom(booking)`).

Verbs tell you where behavior lives, which prevents the God class problem where one entity accumulates every method.

---

# 2. The Entity Decision Tree

The filtering step tells you which nouns are worth keeping. The next question is just as important:

**What should each kept noun become"** An **enum**, an **attribute**, a **concrete class**, an **abstract class**, or an **interface**"

A simple decision tree makes this deterministic.

```mermaid
flowchart TD
    START["Found a noun<br/>in requirements"]:::primary
    Q1{"Fixed set<br/>of values""}:::orange
    ENUM["Enum"]:::green
    Q2{"Has its own<br/>state""}:::orange
    ATTR["Attribute<br/>on another class"]:::red
    Q3{"Multiple<br/>implementations""}:::orange
    CONCRETE["Concrete Class"]:::green
    Q4{"Shared state +<br/>partial behavior""}:::orange
    ABSTRACT["Abstract Class"]:::green
    INTERFACE["Interface"]:::green

    START --> Q1
    Q1 -->|"Yes"| ENUM
    Q1 -->|"No"| Q2
    Q2 -->|"No"| ATTR
    Q2 -->|"Yes"| Q3
    Q3 -->|"No"| CONCRETE
    Q3 -->|"Yes"| Q4
    Q4 -->|"Yes"| ABSTRACT
    Q4 -->|"No"| INTERFACE

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
```

Let's walk through each decision point with examples from course problems.

#### **Fixed set of values" Yes -> Enum**

Examples:

- `BookingStatus = {PENDING, CONFIRMED, CANCELLED}`
- `SeatType = {REGULAR, PREMIUM, VIP}`

A quick test:

- Can I list all possible values today"
- Will new values not appear at runtime"

If both are true, it’s an enum.

If the set can grow dynamically (for example, a restaurant creating custom categories in a food delivery system), you likely want a **class** (or configuration-driven data) instead of an enum.

#### **Has its own state" No -> Attribute**

Some nouns are real concepts, but they don’t deserve an object.

Examples:

- `price` is a property on `SeatType` or part of pricing rules for a `Show`
- `duration` belongs on `Movie`
- `startTime` belongs on `Show`
- `id` belongs on any entity that needs identity

A common edge case is **Address**:

- If it’s just a string, treat it as an attribute.
- If it’s structured (street, city, zip) and has behavior (formatting, validation), make it a **Value Object** (still not an entity, but richer than a primitive).

#### **Multiple implementations" No -> Concrete Class**

Most nouns that survive filtering become concrete classes.

Examples:

- `User`, `Movie`, `Theater`, `Screen`, `Show`
- `Booking`, `ParkingSpot`, `Ticket` (depending on your model)

These have state + behavior, and there’s no strong reason to create multiple variants.

#### **Multiple implementations with shared state" Yes -> Abstract Class**

Use an abstract class when:

- multiple subtypes exist, and
- they share fields, and
- they share some implementation.

Example: **Parking Lot**

- `abstract class Vehicle { licensePlate, vehicleType }`
- subclasses `Car`, `Motorcycle`, `Truck`
- `Vehicle` can implement shared logic like `getLicensePlate()` but keep subtype-specific logic abstract, like `getRequiredSpotSize()`.

The key distinction:

- Abstract class = shared state + partial implementation
- Interface = contract only

#### **Multiple implementations, no shared state" -> Interface**

Use an interface when:

- the behavior varies by implementation, and
- there’s no shared data worth inheriting.

Examples:

- `PricingStrategy { calculateFee(...) }`
- `NotificationService { send(...) }`
- `SpotAllocationStrategy { findSpot(...) }`

Interfaces are especially common for pluggable components where you want to swap implementations without changing the rest of the design.

| Construct | Has State" | Has Behavior" | Multiple Implementations" | When to Use | Example |
|-----------|-----------|---------------|--------------------------|-------------|---------|
| Enum | No (just values) | Minimal (can carry data) | No | Fixed categories known at compile time | VehicleType, OrderStatus |
| Attribute | No (lives on host) | No | No | Simple property of another entity | price, duration, name |
| Concrete Class | Yes | Yes | No | Standard entity with unique state + behavior | ParkingSpot, Ticket, User |
| Abstract Class | Yes (shared) | Yes (partial) | Yes | Shared fields + some shared methods across subtypes | Vehicle, Notification |
| Interface | No | Yes (contract only) | Yes | Behavior varies, no shared state | PricingStrategy, Observer |

---

# 3. Modeling Relationships

Once you know your entities, the next step is to define how they relate to each other. In LLD interviews, relationships communicate two core things:

- **Ownership:** who “owns” whom"
- **Lifecycle coupling:** if one object disappears, does the other still make sense"

Almost every relationship you’ll model in an interview fits into **four types**. Each one answers a different question.

#### **Composition: "If the whole is destroyed, does the part lose meaning""**

In **composition**, the part’s lifecycle is tightly bound to the whole. The whole creates the part, owns it, and usually destroys it.

Example:

- A `ParkingFloor` without a `ParkingLot` makes no sense.
- Floors exist because the lot exists.
- If the parking lot is shut down, its floors cease to exist.

That’s composition: **the part cannot outlive the whole**.

#### **Aggregation: "Can the part exist independently""**

In **aggregation**, the whole holds a reference to a part, but does not own its lifecycle. The part existed before, and it can continue to exist after.

Example:

- A `Vehicle` exists independently of a `ParkingLot`.
- The lot “has” vehicles while they are parked, but it doesn’t own them.
- When the vehicle leaves, it still exists.

That’s aggregation: **the whole uses the part, but doesn’t own it**.

#### **Association: "Do they interact without ownership""**

In **association**, two entities reference each other because they collaborate, but **neither owns the other** and their lifecycles are independent.

Example:

- A `User` makes a `Booking`.
- The booking can be cancelled, archived, or transferred without affecting the user.
- The user can exist with zero bookings.

That’s association: **they are connected by interaction, not containment**.

#### **Dependency: "Does one use another temporarily""**

A **dependency** is the weakest relationship. One class uses another to do a job, typically through a method parameter or an injected collaborator. Swapping the dependency does not affect the dependent object’s identity or lifecycle.

Example:

- `ParkingLot` uses a `PricingStrategy` to calculate fees.
- The strategy can be replaced without changing the parking lot’s existence.

That’s dependency: **a temporary “uses-a” relationship**.

| Relationship | Lifecycle Coupling | Ownership | Strength | Example |
|-------------|-------------------|-----------|----------|---------|
| Composition | Part dies with whole | Whole owns part | Strongest | ParkingLot -> ParkingFloor |
| Aggregation | Part survives independently | Whole uses part, no ownership | Moderate | ParkingSpot -> Vehicle |
| Association | Independent lifecycles | No ownership | Moderate | User -> Booking |
| Dependency | No lifecycle coupling | No ownership | Weakest | ParkingLot -> PricingStrategy |

### How this shows up in code

A useful interview trick is to point out that you can often “see” the relationship type by looking at **how a field is obtained**:

- **Created inside** the class → usually **composition**
- **Passed in / injected** → usually **dependency**
- **Referenced from outside** (stored temporarily) → often **aggregation**
- **Linked due to interaction** → often **association**

Here’s a single class that demonstrates all four.

```java
$9c
```

The key signal is **ownership through construction**:

- `floors` are created internally, so the lot owns them (**composition**).
- `pricingStrategy` is provided from outside, so it’s a swap-friendly collaborator (**dependency**).
- `Vehicle` is passed in and only referenced while parked (**aggregation**).
- `Ticket` and other domain objects connect actors and actions without ownership (**association**).
