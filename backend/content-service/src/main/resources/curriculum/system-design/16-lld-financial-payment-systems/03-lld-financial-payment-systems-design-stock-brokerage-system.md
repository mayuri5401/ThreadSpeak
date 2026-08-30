---
id: "lld-financial-payment-systems-design-stock-brokerage-system"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Financial Payment Systems"
subSection: ""
title: "Design Stock Brokerage System"
slug: "lld-financial-payment-systems-design-stock-brokerage-system"
summary: "In this chapter, we will explore the low-level design of an online stock exchange system in detail."
eli10: "Imagine Design Stock Brokerage System as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Stock Brokerage System Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Financial Payment Systems","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Stock Brokerage System"
  code: |
    enum OrderType {
        MARKET,
        LIMIT
    }
    
    enum TransactionType {
        BUY,
        SELL
    }
    
    enum OrderStatus {
        OPEN,
        PARTIALLY_FILLED,
        FILLED,
        CANCELLED,
        FAILED
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is an Online Stock Exchange"
>
> An **Online Stock Exchange** is a digital platform where investors can trade **stocks** and other **financial instruments** electronically. It serves as a marketplace that brings together buyers and sellers, facilitates order matching, and ensures smooth execution of trades in real time.
>
> 
> <!-- Simulation: stock-exchange -->
> 

>
> Modern stock exchanges also provide:
>
> - Live market data and stock price updates
> - Historical trade information
> - Tools for portfolio and order management
> - Support for various types of orders (e.g., market, limit)

In this chapter, we will explore the **low-level design of an online stock exchange system** in detail.

Lets start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** What types of orders should the system support" Just basic market and limit orders, or more complex types like stop-loss or fill-or-kill"
>
> **Interviewer:** For this design, let's stick to **Market** and **Limit** orders for both buying and selling.
>
> **Candidate:** Should the system handle user accounts, including cash balances and stock portfolios"
>
> **Interviewer:** Yes, each user must have an account that tracks their cash balance and the quantity of each stock they own. The system must ensure that a user has sufficient funds to buy or enough stock to sell.
>
> **Candidate:** Should we support multiple stocks being traded simultaneously, or focus on a single stock for simplicity"
>
> **Interviewer:** Multiple stocks should be supported.
>
> **Candidate:** How should the order matching engine work" Should it follow a price-time priority (first come, first served at the same price), or is simple price priority sufficient"
>
> **Interviewer:** Let's keep the matching logic simple. The engine should match the highest bid (buy order) with the lowest ask (sell order) as long as the bid is greater than or equal to the ask. We can ignore the time priority aspect for now.
>
> **Candidate:** Do we need to notify users of  events like when a trade executes or when a stock's price changes"
>
> **Interviewer:** A user should be notified about status changes to their own orders (e.g., OPEN -> FILLED). It would also be great if users could "subscribe" to specific stocks and get notified when their prices change.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Each user must have an account with a cash balance and a portfolio of owned stocks.
- Support trading of multiple stock symbols
- Allow users to place limit and market orders (buy or sell)
- Allow users to cancel pending (unmatched) orders
- Users should be notified of status updates for their orders.
- Users should be able to subscribe to stock price updates and receive notifications when the price changes.
- Before placing an order, the system must validate it (e.g., check for sufficient funds for a buy order or sufficient stock quantity for a sell order).

## 1.2 Non-Functional Requirements

- **Concurrency:** The system must be thread-safe to handle concurrent requests from multiple users placing orders simultaneously.
- **Modularity:** The system should be designed using object-oriented principles, with clear separation of concerns between components like accounts, orders, and the matching engine.
- **Extensibility:** The design should be modular and easy to extend. For instance, adding new order types (e.g., Stop-Loss) or different notification channels (e.g., SMS, Email) should not require major refactoring.
- **Simplicity:** The system should provide a simple, high-level interface for clients to perform common actions like placing an order, without exposing the underlying complexity of the matching engine.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., user, stock, order, order book, trade) and **actions** (e.g., place, match, cancel, publish, view) from the functional requirements. These typically translate directly into **classes**, **enums**, or **interfaces** in an object-oriented design.

Let’s walk through the functional requirements and extract the relevant entities:

#### **1. Manage user accounts, cash balances, and stock portfolios.**

This points to a `User` entity as the primary actor. Each User has an `Account`, which is responsible for managing their cash balance and a portfolio of owned stocks. The stocks themselves are represented by a `Stock` entity, which includes a symbol and a market price.

#### **2. Requirement: Allow users to place Market and Limit orders for buying and selling.**

An `Order` is a central entity representing a user's intent to trade. Key attributes like `OrderType` (MARKET, LIMIT), `TransactionType` (BUY, SELL), and `OrderStatus` (OPEN, FILLED) are best represented by Enums.

#### **3. A central engine must match buy and sell orders.**

The core matching logic is encapsulated in a `StockExchange` entity. This class acts as the central marketplace, holding the order books for all stocks. It is implemented as a **Singleton** to ensure there is only one exchange in the system.

#### **4. Provide a simple, high-level interface for the entire system.**

To hide the complexity of the underlying components (matching engine, state transitions, command execution), a `StockBrokerageSystem` class is introduced. It acts as a **Facade** and **Singleton**, providing a unified entry point for all client interactions.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **User**: Represents a trader who can place, cancel, and view orders.
> - **Account**: Manages a user's cash balance and portfolio of stocks.
> - **Stock**: Represents a tradable stock symbol.
> - **Order**: Represents an individual buy/sell request with metadata like type, price, quantity, and side.
> - **Enums** (OrderType, TransactionType, OrderStatus): Define fixed sets of constants for order details and lifecycles, ensuring consistency.
> - **StockExchange**: A Singleton that acts as the central matching engine, processing and executing trades by matching buy and sell orders.
> - **StockBrokerageSystem**: A Facade and Singleton that provides a simplified, high-level API for interacting with the entire system.

These core entities define the essential abstractions of an online stock exchange and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

### **Enums**

- `OrderType`: Distinguishes between `MARKET` and `LIMIT` orders.
- `TransactionType`: Indicates whether an order is a `BUY` or `SELL` transaction.
- `OrderStatus`: Tracks the lifecycle of an order (`OPEN`, `FILLED`, `CANCELLED`).

### **Data Classes**

#### `Account`

A thread-safe class that holds a user's cash balance and their portfolio of stocks.

It provides synchronized methods for debiting/crediting funds and adding/removing stocks.

#### `Stock`

Represents a publicly traded stock.

It holds the stock's symbol and its current market price. It also acts as the **Subject** in the Observer pattern, maintaining a list of observers to notify upon price changes.

### **Core Classes**

#### `User`

Represents a client of the brokerage.

It holds an `Account` and acts as a concrete **Observer** by implementing `StockObserver` to receive real-time price notifications. It also has a method to receive order status updates.

#### `Order`

A central class representing a single trade request.

It contains all details of the order, including the user, stock, type, and quantity. It acts as the **Context** for the State pattern, delegating cancellation logic to its `currentState` object.

#### `StockExchange`** (Singleton)**

The core engine of the system.

It maintains the order books (buy and sell orders) and contains the matching logic to execute trades when buy and sell orders align.

#### `StockBrokerageSystem`** (Singleton & Facade)**

The primary entry point for the application.

It hides the system's internal complexity from the client and provides a simple, unified API for all major operations like registering users and placing orders.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- A `User` "has-an" `Account`. The `Account`'s lifecycle is managed by the `User`.

### **Association**

- An `Order` is associated with one `User` and one `Stock`.
- An `Order` is associated with an `ExecutionStrategy` to determine its execution condition.
- An `Order` has a current `OrderState`.
- A `Stock` (Subject) is associated with a list of `StockObserver`s (which are `User`s).

### **Inheritance**

- `User` implements the `StockObserver` interface.
- `BuyStockCommand` and `SellStockCommand` implement the `OrderCommand` interface.
- Concrete state classes (`OpenState`, etc.) implement the `OrderState` interface.
- Concrete strategy classes (`MarketOrderStrategy`, etc.) implement the `ExecutionStrategy` interface.

### **Dependency**

- `StockBrokerageSystem` (Facade) depends on `OrderCommand` objects to place orders.
- The `OrderCommand`s depend on the `StockExchange` to submit the orders.
- A client depends on the `OrderBuilder` to construct an `Order` object.
- `StockExchange` depends on the `ExecutionStrategy` of an order to check if a trade can be made.

## 3.3 Key Design Patterns

### [**Strategy Pattern**](/learn/lld/strategy)

The `ExecutionStrategy` allows the logic for executing different order types (`Market`, `Limit`) to be encapsulated and made interchangeable.

The `StockExchange` can check if an order is executable without knowing the specific rules of that order type.

### [**State Pattern**](/learn/lld/state)

The lifecycle of an `Order` is managed using the State pattern. The `Order` (Context) delegates actions like `cancel()` to its current `OrderState` object.

This cleanly separates state-specific logic (e.g., you can't cancel a `Filled` order) and makes the system robust.

### [**Observer Pattern**](/learn/lld/observer)

This pattern is used to notify users of stock price changes. The `Stock` object (Subject) notifies all subscribed `User`s (Observers) whenever its price is updated, enabling real-time updates.

### [**Command Pattern**](/learn/lld/command)

The `OrderCommand` interface and its implementations (`BuyStockCommand`, `SellStockCommand`) encapsulate a request as an object.

This decouples the client that initiates an order from the object that knows how to perform it (the `StockExchange`).

### [**Builder Pattern**](/learn/lld/builder)

The `OrderBuilder` provides a fluent API for constructing complex `Order` objects. This is ideal for an object with multiple parameters, improving readability and ensuring that orders are created in a valid state.

### [**Facade Pattern**](/learn/lld/facade)

The `StockBrokerageSystem` class serves as a facade. It provides a simple, high-level API (`registerUser`, `placeBuyOrder`) that hides the complex internal workflows involving accounts, order books, and the matching engine.

### [**Singleton Pattern**](/learn/lld/singleton)

`StockBrokerageSystem` and `StockExchange` are implemented as singletons. This ensures a single, globally accessible point of control for the entire application and for the central order book, preventing state inconsistencies.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Enums

```java
enum OrderType {
    MARKET,
    LIMIT
}

enum TransactionType {
    BUY,
    SELL
}

enum OrderStatus {
    OPEN,
    PARTIALLY_FILLED,
    FILLED,
    CANCELLED,
    FAILED
}
```

- `OrderType` distinguishes between **market** and **limit** orders.
- `TransactionType` indicates whether the action is a **buy** or **sell**.
- `OrderStatus` tracks the lifecycle of an order.

### 4.2 Custom Exceptions

```java
class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

class InsufficientStockException extends RuntimeException {
    public InsufficientStockException(String message) {
        super(message);
    }
}
```

These exceptions are thrown during trade validations:

- `InsufficientFundsException`: not enough cash to buy.
- `InsufficientStockException`: not enough stock to sell.

### 4.3 Account

```java
$d4
```

The `Account` class holds the user's cash balance and owned stocks. All operations are thread-safe via `synchronized` to ensure consistency in concurrent environments.

### 4.4 Stock and Observer Pattern

#### StockObserver

Implements the **Observer Pattern**. Users are notified when stock prices change.

```java
interface StockObserver {
    void update(Stock stock);
}
```

```java
class Stock {
    private final String symbol;
    private double price;
    private final List<StockObserver> observers = new ArrayList<>();

    public Stock(String symbol, double initialPrice) {
        this.symbol = symbol;
        this.price = initialPrice;
    }

    public String getSymbol() {
        return symbol;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double newPrice) {
        if (this.price != newPrice) {
            this.price = newPrice;
            notifyObservers();
        }
    }

    public void addObserver(StockObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(StockObserver observer) {
        observers.remove(observer);
    }

    private void notifyObservers() {
        for (StockObserver observer : observers) {
            observer.update(this);
        }
    }
}
```

### 4.5 User

Each `User` holds an `Account` and receives stock price and order status updates. Acts as an observer of stock price changes.

```java
class User implements StockObserver {
    private final String userId;
    private final String name;
    private final Account account;

    public User(String name, double initialCash) {
        this.userId = UUID.randomUUID().toString();
        this.name = name;
        this.account = new Account(initialCash);
    }

    public String getUserId() { return userId; }
    public String getName() { return name; }
    public Account getAccount() { return account; }

    @Override
    public void update(Stock stock) {
        System.out.printf("[Notification for %s] Stock %s price updated to: $%.2f%n",
                name, stock.getSymbol(), stock.getPrice());
    }

    public void orderStatusUpdate(Order order) {
        System.out.printf("[Order Notification for %s] Order %s for %s is now %s.%n",
                name, order.getOrderId(), order.getStock(), order.getStatus());
    }
}
```

### 4.6 Order and State Pattern

Uses the **State Pattern** to allow state-specific behavior for `cancel()`.

```java
$dc
```

### 4.7 Order Builder Pattern

Provides a fluent API to construct complex `Order` objects step-by-step.

```java
$e2
```

### 4.8 OrderCommand

Encapsulates buy/sell operations using the **Command Pattern** to decouple order placement from the execution logic.

```java
$e8
```

### 4.9 State

Implements the **State Pattern** for each valid `OrderStatus`, restricting transitions (e.g., filled orders can't be cancelled).

```java
$ee
```

### 4.10 ExecutionStrategy

Encapsulates different execution rules using the **Strategy Pattern**. This cleanly separates decision logic for market vs. limit orders.

```java
interface ExecutionStrategy {
    boolean canExecute(Order order, double marketPrice);
}

class LimitOrderStrategy implements ExecutionStrategy {
    private final TransactionType type;

    public LimitOrderStrategy(TransactionType type) {
        this.type = type;
    }

    @Override
    public boolean canExecute(Order order, double marketPrice) {
        if (type == TransactionType.BUY) {
            // Buy if market price is less than or equal to limit price
            return marketPrice <= order.getPrice();
        } else { // SELL
            // Sell if market price is greater than or equal to limit price
            return marketPrice >= order.getPrice();
        }
    }
}

class MarketOrderStrategy implements ExecutionStrategy {
    @Override
    public boolean canExecute(Order order, double marketPrice) {
        return true; // Market orders can always execute
    }
}
```

### 4.11 StockExchange

Implements the order matching engine. Supports atomic trade execution and uses synchronized blocks to ensure consistency.

```java
$f0
```

### 4.12 StockBrokerageSystem

Acts as a **Facade** for the entire brokerage system. Encapsulates user registration, stock management, and order processing.

```java
$f6
```

### StockBrokerageSystemDemo

The demo class simulates user actions to validate the system.

```java
$fc
```

---

# 5. Run and Test

---

# 6. Quiz
