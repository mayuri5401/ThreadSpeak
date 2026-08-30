---
id: "lld-e-commerce-booking-systems-design-auction-system"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - E commerce Booking Systems"
subSection: ""
title: "Design Auction System"
slug: "lld-e-commerce-booking-systems-design-auction-system"
summary: "In this chapter, we will explore the low-level design of an online auction system in detail."
eli10: "Imagine Design Auction System as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Auction System Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","E commerce Booking Systems","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Auction System"
  code: |
    interface AuctionObserver {
        void onUpdate(Auction auction, String message);
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is an Online Auction System"
>
> An **Online Auction System** is a digital platform that facilitates the **buying and selling of items through competitive bidding**, typically over a fixed time window. Sellers can list products for auction, and buyers can place incremental bids to compete for ownership.
>
> 
> <!-- Simulation: auction-system -->
> 

>
> At the end of the auction period, the **highest bidder wins**, and the system finalizes the transaction. Examples of such platforms include **eBay**, **Sotheby’s**, and **GovDeals**.

In this chapter, we will explore the **low-level design of an online auction system** in detail.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions, clarify ambiguities, and define the system's scope more precisely.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Can a user place bids on multiple items simultaneously"
>
> **Interviewer:** Yes, users should be able to participate in multiple ongoing auctions at the same time.
>
> **Candidate:** How is the winner of an auction determined" Is it simply the highest bid at the end time"
>
> **Interviewer:** Correct. The user with the highest bid when the auction ends wins the item. In case of a tie, the earliest bid should be considered the winner.
>
> **Candidate:** Should users receive notifications when they’re outbid or when an auction they’re involved in ends"
>
> **Interviewer:** Yes, users should be notified when they’re outbid, and when an auction they’re participating in ends.
>
> **Candidate:** Should we keep a record of all bids for an item"
>
> **Interviewer:** Yes, the system should maintain a complete bid history for each auction item.
>
> **Candidate:** What about post-auction activities like payment processing and shipping"
>
> **Interviewer:** Let's consider those out of scope. The system's responsibility ends once the auction is closed and a winner is declared.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Allow users to **create and list auction items** with a title, description, starting price, and end time
- Allow users to **place bids** on active auctions
- **Support concurrent bidding** on multiple items by the same or different users
- Determine the winner based on the **highest bid** at auction end; resolve ties by earliest bid.
- **Notify users** when they are outbid or when the auction ends
- **Prevent bids** once the auction has ended.
- Maintain a complete **bid history** for each auction item.

## 1.2 Non-Functional Requirements

- **Concurrency:** The system must be thread-safe to handle multiple simultaneous bids on the same auction without data integrity issues.
- **Modularity:** The system should follow object-oriented design with clear separation of concerns.
- **Reliability:** The mechanism for closing auctions at their specified end time must be reliable and function automatically.
- **Maintainability:** The codebase should be clean, testable, and easy to enhance or debug.
- **Extensibility:** The design should be modular, making it easy to add new features in the future, such as different auction types or user roles.
- **Simplified Interface:** The system should provide a simple, high-level API for clients to perform key actions like creating an auction or placing a bid, hiding the underlying complexity.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., user, auction, bid, item, notification) and **actions** (e.g., create, bid, outbid, win, notify) from the functional requirements. These often translate directly into **classes**, **enums**, or **interfaces** in an object-oriented design.

Let’s walk through the functional requirements and extract the relevant entities:

#### **1. Allow users to create and list auction items, and place bids on them.**

This points to three fundamental entities:

- `User`: Represents a participant in the auction, who can act as a bidder.
- `Auction`: The central entity representing a single item up for auction. It holds the item's details, manages its state, and maintains a history of all bids.
- `Bid`: A data object representing a single bid made by a User on an Auction, containing the amount and a timestamp.

#### **2. The system must manage the auction lifecycle and prevent bids after it has ended.**

An Auction has a clear lifecycle (e.g., active, closed). This is best represented by an `AuctionState` enum, which helps control what actions are permissible at different times.

#### **3. Reliably close auctions at their end time and provide a simplified interface for the entire system.**

To manage the lifecycle of multiple auctions and provide a clean entry point, a central service layer is necessary.

- `AuctionService`: This class acts as a **Facade** and **Singleton**. It provides a simple, high-level API for all client interactions (like creating an auction or placing a bid), hiding the complexity of managing auction states, notifications, and scheduling.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **User**: Represents a registered participant in the system. Can act as a seller or bidder.
> - **Auction**: The core entity representing a single auctionable item.
> - **Bid**: A simple data object that encapsulates a bid's amount, the User who placed it, and a timestamp.
> - **AuctionState (Enum)**: Defines the distinct lifecycle states of an auction, such as ACTIVE and CLOSED, to control its behavior.
> - **AuctionService: **A **Facade** and **Singleton** that provides a unified, high-level interface to the entire system.

These core entities define the essential abstractions of the Online Auction System and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

#### `AuctionState`

Defines the discrete lifecycle stages of an auction: `PENDING`, `ACTIVE`, and `CLOSED`. 

This enum is used for state management within the `Auction` class.

### **Data Classes**

#### `Bid`

A data class representing a single bid made by a user.

It encapsulates the `bidder`, the `amount`, and a `timestamp`. It implements `Comparable` to allow for easy determination of the highest bid, first by amount and then by timestamp.

### **Core Classes**

#### `User`

Represents a participant in the auction. 

Crucially, it also acts as a concrete **Observer** by implementing the `AuctionObserver` interface. This allows a `User` object to be directly subscribed to an auction and receive notifications.

#### `Auction`

This is the central class representing a single auction event.

It manages all bids, the auction's state (`AuctionState`), and the end time. It acts as the **Subject** in the Observer pattern, maintaining a list of subscribed observers (`User`s) and notifying them of key events, such as when a new highest bid is placed or when the auction ends.

#### `AuctionService`** (Singleton & Facade)**

The primary entry point for the entire application.

It orchestrates all high-level operations, such as creating users and auctions, and processing bids. It manages the collections of all active users and auctions, and it uses a `ScheduledExecutorService` to handle the automatic closing of auctions when their end time is reached.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- `AuctionService` "has-a" collection of `User`s and `Auction`s, managing their lifecycle within the system.
- An `Auction` "has-a" list of `Bid`s.

### **Association**

- An `Auction` (Subject) is associated with a set of `AuctionObserver`s (which are `User`s).
- A `Bid` is associated with the `User` who placed it.

### **Inheritance**

- The `User` class implements the `AuctionObserver` interface, allowing it to act as an observer.

### **Dependency**

- The `AuctionService` (Facade) depends on `Auction` and `User` objects to carry out its operations.
- The `Auction` class depends on the `Bid` class to record bidding activity.

## 3.3 Key Design Patterns

### [**Observer Pattern**](/learn/lld/observer)

This is the core pattern for providing real-time updates to participants.

The `Auction` object acts as the **Subject**, and bidding `User`s act as **Observers**. When a significant event occurs (e.g., a user is outbid, the auction ends), the `Auction` automatically notifies all relevant observers, ensuring they are kept in sync with the auction's state.

### [**Facade Pattern**](/learn/lld/facade)

The `AuctionService` class serves as a facade. It provides a simple, high-level API (`createAuction`, `placeBid`, `endAuction`) that hides the complex internal workflows of managing users, auctions, bidding logic, and scheduling. Clients interact with the system through this single, clean interface.

### [**Singleton Pattern**](/learn/lld/singleton)

`AuctionService` is implemented as a singleton to ensure there is a single, globally accessible point of control for the entire auction system. This centralizes the management of all auctions and users and prevents state inconsistencies.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 AuctionObserver (Observer Pattern)

Defines the **Observer** interface to receive updates about an auction’s state (e.g., when outbid or when the auction ends). All participants placing bids become observers automatically.

```java
interface AuctionObserver {
    void onUpdate(Auction auction, String message);
}
```

### 4.2 User

The User class represents a participant, and crucially, it also acts as an "Observer" to receive notifications.

```java
class User implements AuctionObserver {
    private final String id;
    private final String name;

    public User(String name) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    @Override
    public void onUpdate(Auction auction, String message) {
        System.out.printf("--- Notification for %s ---\n", this.name);
        System.out.printf("Auction: %s\n", auction.getItemName());
        System.out.printf("Message: %s\n", message);
        System.out.println("---------------------------\n");
    }
}
```

Each user has a unique ID and name.

By implementing AuctionObserver, the User class can be directly subscribed to an Auction. The onUpdate method is the callback that the Auction will invoke to send notifications, such as "You have been outbid" or "The auction has ended." This decouples the auction logic from the user notification mechanism.

### 4.3 AuctionState

Represents the current lifecycle state of an auction.

```java
enum AuctionState {
    PENDING,
    ACTIVE,
    CLOSED
}
```

### 4.4 Bid

A data object representing a single bid, designed to be comparable for easily finding the highest bid.

```java
class Bid implements Comparable<Bid> {
    private final User bidder;
    private final BigDecimal amount;
    private final LocalDateTime timestamp;

    public Bid(User bidder, BigDecimal amount) {
        this.bidder = bidder;
        this.amount = amount;
        this.timestamp = LocalDateTime.now();
    }

    public User getBidder() {
        return bidder;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    @Override
    public int compareTo(Bid other) {
        int amountComparison = this.amount.compareTo(other.amount);
        if (amountComparison != 0) {
            return amountComparison;
        }
        return other.timestamp.compareTo(this.timestamp);
    }

    @Override
    public String toString() {
        return String.format("Bidder: %s, Amount: %.2f, Time: %s", bidder.getName(), amount, timestamp);
    }
}
```

Each `Bid` is timestamped and comparable by amount (higher is better) and time (earlier wins in case of tie). This makes sorting and comparison straightforward.

### 4.5 Auction

This is the central class for a single auction. It manages the bidding process, its own state, and acts as the "Subject" in the Observer pattern.

```java
$b4
```

- The Auction class is the "Subject." It maintains a set of observers (bidders). When a significant event occurs (a new highest bid, auction ends), it calls its notification methods.

### 4.6 AuctionService

This class acts as a central **Singleton** and **Facade**, providing a simplified API for clients to interact with the entire auction system.

```java
$ba
```

- **Facade Pattern:** The service provides a simple, high-level API (createAuction, placeBid) that hides the complexity of object creation, scheduling, and direct interaction with Auction objects.
- **Singleton Pattern:** A single AuctionService instance manages all users and auctions, acting as the central nervous system of the application. The getInstance() method is synchronized to ensure thread-safe lazy initialization.

### 4.7 AuctionSystemDemo

This driver class simulates a real-world bidding scenario, validating the end-to-end functionality of the system.

```java
$c0
```

---

# 5. Run and Test

---

# 6. Quiz
