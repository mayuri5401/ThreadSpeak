---
id: "lld-managing-states-design-vending-machine"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Managing States"
subSection: ""
title: "Design Vending Machine"
slug: "lld-managing-states-design-vending-machine"
summary: "In this chapter, we will explore the low level design of a vending machine in detail."
eli10: "Imagine Design Vending Machine as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Vending Machine Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Managing States","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Vending Machine"
  code: |
    enum Coin {
        PENNY(1), 
        NICKEL(5), 
        DIME(10), 
        QUARTER(25);
        
        private int value;
    
        Coin(int value) {
            this.value = value;
        }
    
        public int getValue() {
            return value;
        }
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Vending Machine"
>
> A **vending machine** is a self-service automated device that dispenses items like snacks, beverages, or other products to users **without the need for human assistance**. These machines are commonly found in places like offices, schools, airports, and train stations.
>
> 
> <!-- Simulation: vending-machine -->
> 

>
> Users typically interact with the machine by:
>
> 1. **Selecting an item** (using a code, button, or touchscreen),
> 2. **Inserting payment** (coins, bills, cards, or digital wallets),
> 3. And then **receiving the item** from a dispensing slot.

In this chapter, we will explore the **low level design of a vending machine** in detail.

Lets start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a discussion between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the machine allow multiple transactions to run concurrently"
>
> **Interviewer:** No, only one transaction should be allowed at a time.
>
> **Candidate:** Should the vending machine support multiple payment methods, such as coins, notes, and digital payments"
>
> **Interviewer:** For this version, let’s support only coin-based transactions. The machine should accept fixed denominations such as $1, $5, and $10.
>
> **Candidate:** Should the machine be able to return change if the inserted amount exceeds the item price"
>
> **Interviewer:** Yes, returning the correct change is an important part of the system.
>
> **Candidate:** Can users cancel a transaction midway and get their money back"
>
> **Interviewer:** Yes, users should be able to cancel a transaction any time before an item is dispensed. The full amount inserted should be refunded.
>
> **Candidate:** Do we need to support admin operations such as restocking items or updating item prices"
>
> **Interviewer:** The system should support restocking items or adding new items with a specified quantity. For simplicity, let's skip price updates for now.
>
> **Candidate:** Do we need to track and log transaction history or sales data"
>
> **Interviewer:** No need to maintain detailed transaction history. However, we can display intermediate states during a transaction
>
> **Candidate:** Should the machine generate a receipt after the purchase"
>
> **Interviewer:** No, receipt generation is not required for this version.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Accept **coin-based payments** using fixed denominations (e.g., $1, $5, $10)
- Allow **adding new items** or **restocking** existing items in the vending machine
- Allow users to **view available items** along with their price
- Users can **select an item** by entering the item code
- The machine should **dispense the selected item** if sufficient money is inserted
- **Return change** if the inserted amount exceeds the item’s price
- Allow users to **cancel a transaction** before item dispensing and receive a full refund
- Display **intermediate states** such as inserted amount, selected item, or refund messages

## 1.2 Non-Functional Requirements

- **Maintainability:** The system should follow object-oriented principles, ensuring modularity, testability, and ease of extension
- **Atomicity:** The purchase operation must be atomic. A user either receives the item and correct change, or receives a full refund
- **Concurrency Control:** The machine must handle only one transaction at a time. While a transaction is in progress, the system should remain locked to other inputs
- **Extensibility:** The system should be designed in a way that future features (e.g., digital payments) can be added with minimal changes

After the requirements are clear, lets identify the core entities/objects we will have in our system.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., item, coin, transaction, display, vending machine) and **actions** (e.g., select, dispense, refund, restock) from the functional requirements. These typically translate into classes, enums, or interfaces in an object-oriented design.

Below, we break down the functional requirements and extract the relevant entities. Related requirements are grouped together when they represent the same conceptual unit.

#### **1. **Accept **coin-based payments** using fixed denominations

This introduces:

- `Coin`** (enum)**: Represents valid coin denominations accepted by the machine (e.g., `$1`, `$5`, `$10`). Using an enum helps enforce a fixed set of supported denominations and simplifies validation and change calculation.

#### **2. The system should allow adding new items and restocking.**

This introduces:

- `Item`: Represents a product sold by the machine. Each item has attributes such as code, name, price, and quantity.
- `Inventory`: Manages the machine’s stock of items. It maintains a mapping of item codes to their corresponding `Item` objects and provides operations to add, restock, reduce, and check availability.

#### **3. Machine accepts coins, dispenses items and returns change.**

This introduces:

- `VendingMachine`: The central orchestrator that coordinates all user interactions and internal processes. It manages the current balance, selected item code, coin validation, transaction flow, state transitions, and interactions with the inventory.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Final List of Core Entities
>
> - `Item`: Represents a product in the machine with attributes like code, name, price, and quantity.
> - `Coin`** (Enum)**: Defines the set of valid denominations accepted by the machine (e.g., `$1`, `$5`, `$10`).
> - `Inventory`: Manages all items in the vending machine. Provides methods to add new items, restock inventory, check item availability, and reduce stock after a purchase.
> - `VendingMachine`: Central class that handles coin insertion, item selection, inventory access, dispensing logic, change calculation, and state transitions.

These core entities define the essential abstractions of the vending machine system and will guide the structure of our low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

- `Coin`: Represents the set of valid coin denominations accepted by the machine. Using an `enum` ensures type safety and centralizes the value of each coin (e.g., `PENNY(1)`, `QUARTER(25)`), making the system easy to extend with new coin types without changing the core logic.

### **Data Classes**

#### `Item`

A simple Plain Old Java Object (POJO) or data class that models a product. It holds product-specific information: a unique `code` for selection (e.g., "A1"), a `name` ("Coke"), and a `price` (in cents). This class has no business logic; its sole purpose is to encapsulate data.

### **Core Classes**

#### `Inventory`

This class is responsible for managing the stock of all items.

It uses two maps: one to associate an item `code` with its `Item` object and another to track the quantity (`stock`) of each item. Its responsibilities are limited to adding items, checking availability, and reducing stock, adhering to the Single Responsibility Principle.

#### `VendingMachine`** (The Context)**

This is the main class and the primary entry point for any client interaction.

It holds references to the current state (`currentState`), the `Inventory`, the current `balance`, and the `selectedItemCode`. It delegates all user actions to the current state object, which handles the request based on the machine's current context.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

- **Composition (**`VendingMachine`** has an **`Inventory`**)**: The `VendingMachine` owns the `Inventory`. The `Inventory` cannot exist without the `VendingMachine`, and its lifecycle is managed by the `VendingMachine`. This is a strong "has-a" relationship.
- **Aggregation (**`Inventory`** has **`Item`**s)**: The `Inventory` manages a collection of `Item` objects. While the inventory contains items, the `Item` objects themselves can be considered independent entities. This is a "has-a" relationship, but weaker than composition.
- **Association (**`VendingMachine`** has a **`VendingMachineState`**)**: The `VendingMachine` maintains a reference to its current state object. This reference can change dynamically at runtime, which is the essence of the State pattern. Furthermore, each `VendingMachineState` object holds a reference back to the `VendingMachine` to access its context and trigger state transitions.
- **Inheritance (**`IdleState`** is a **`VendingMachineState`**)**: The concrete state classes (`IdleState`, `ItemSelectedState`, etc.) extend the abstract `VendingMachineState` class. This enforces a common contract across all states and allows the `VendingMachine` to treat them polymorphically.

## 3.3 Key Design Patterns

Several design patterns are employed to create a clean, maintainable, and extensible system.

### [**State Pattern**](/learn/lld/state)

This is the primary pattern used. It allows the `VendingMachine` to alter its behavior when its internal state changes.

The machine delegates requests to a state object, which implements the behavior for that specific state. This eliminates the need for large `if/else` or `switch` blocks for managing state-dependent logic, making the system cleaner and easier to modify.

- **Context**: `VendingMachine`
- **State**: `VendingMachineState` (abstract class)
- **Concrete States**: `IdleState`, `ItemSelectedState`, `HasMoneyState`, `DispensingState`

### [**Singleton Pattern**](/learn/lld/singleton)

The `VendingMachine` is implemented as a Singleton. This ensures that only one instance of the machine is created throughout the application's lifecycle. This is a logical choice as it models a real-world scenario where you interact with a single, physical machine.

### [**Facade Pattern**](/learn/lld/facade)

The `VendingMachine` class acts as a Facade. It provides a simple, unified interface (`insertCoin()`, `selectItem()`, etc.) to the client. The client interacts with this simplified interface without needing to know about the complex internal subsystems like state management, inventory tracking, or state transition logic.

## 3.4 Class Diagram

---

# 4. Implementation

### 4.1 `Coin` Enum

Represents accepted coin denominations and their values (in cents).

```java
enum Coin {
    PENNY(1), 
    NICKEL(5), 
    DIME(10), 
    QUARTER(25);
    
    private int value;

    Coin(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
```

### 4.2 `Item`

Models a product available for purchase in the vending machine.

```java
class Item {
    private String code;
    private String name;
    private int price;

    public Item(String code, String name, int price) {
        this.code = code;
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }
}
```

Each item has a unique code, name, and price.

### 4.3 `Inventory`

This component is responsible for storing and tracking the available items and their quantities.

```java
class Inventory {
    private final Map<String, Item> itemMap = new HashMap<>();
    private final Map<String, Integer> stockMap = new HashMap<>();

    public void addItem(String code, Item item, int quantity) {
        itemMap.put(code, item);
        stockMap.put(code, quantity);
    }

    public Item getItem(String code) {
        return itemMap.get(code);
    }

    public boolean isAvailable(String code) {
        return stockMap.getOrDefault(code, 0) > 0;
    }

    public void reduceStock(String code) {
        stockMap.put(code, stockMap.get(code) - 1);
    }
}
```

The Inventory class has a single, clear purpose: to manage the collection of items and their stock levels. It is decoupled from the machine's operational logic (like handling money or state transitions).

- `addItem()` registers new stock.
- `reduceStock()` decrements stock after dispensing.

### 4.4 `VendingMachineState` Interface and Concrete States

The State pattern allows an object (the VendingMachine) to change its behavior when its internal state changes. The object appears to change its class.

#### `VendingMachineState`

This defines the contract for all possible states.

```java
abstract class VendingMachineState {
    VendingMachine machine;

    VendingMachineState(VendingMachine machine) {
        this.machine = machine;
    }

    public abstract void insertCoin(Coin coin);
    public abstract void selectItem(String code);
    public abstract void dispense();
    public abstract void refund();
}
```

Each class represents a specific state of the vending machine and implements the behavior appropriate for that state.

#### IdleState

The default state when the machine is waiting for a user to begin an interaction.

```java
class IdleState extends VendingMachineState {
    public IdleState(VendingMachine machine) {
        super(machine);
    }

    @Override
    public void insertCoin(Coin coin) {
        System.out.println("Please select an item before inserting money.");
    }

    @Override
    public void selectItem(String code) {
        if (!machine.getInventory().isAvailable(code)) {
            System.out.println("Item not available.");
            return;
        }
        machine.setSelectedItemCode(code);
        machine.setState(new ItemSelectedState(machine));
        System.out.println("Item selected: " + code);
    }

    @Override
    public void dispense() {
        System.out.println("No item selected.");
    }

    @Override
    public void refund() {
        System.out.println("No money to refund.");
    }
}

```

In the IdleState, only selectItem is a valid action. All other actions, like insertCoin or dispense, are invalid and result in an error message. A successful selection triggers a **state transition** to ItemSelectedState.

#### ItemSelectedState

 The state after a user has selected an item, and the machine is waiting for money.

```java
class ItemSelectedState extends VendingMachineState {
    public ItemSelectedState(VendingMachine machine) {
        super(machine);
    }

    @Override
    public void insertCoin(Coin coin) {
        machine.addBalance(coin.getValue());
        System.out.println("Coin Inserted: " + coin.getValue());
        int price = machine.getSelectedItem().getPrice();
        if (machine.getBalance() >= price) {
            System.out.println("Sufficient money received.");
            machine.setState(new HasMoneyState(machine));
        }
    }

    @Override
    public void selectItem(String code) {
        System.out.println("Item already selected.");
    }

    @Override
    public void dispense() {
        System.out.println("Please insert sufficient money.");
    }

    @Override
    public void refund() {
        machine.reset();
        machine.setState(new IdleState(machine));
    }
}
```

In this state, the primary valid action is insertCoin. The state keeps track of the inserted money and, upon receiving sufficient funds, transitions the machine to the `HasMoneyState`.

#### HasMoneyState

 The state when the machine has received enough money for the selected item and is ready to dispense.

```java
class HasMoneyState extends VendingMachineState {
    public HasMoneyState(VendingMachine machine) {
        super(machine);
    }

    @Override
    public void insertCoin(Coin coin) {
        System.out.println("Already received full amount.");
    }

    @Override
    public void selectItem(String code) {
        System.out.println("Item already selected.");
    }

    @Override
    public void dispense() {
        machine.setState(new DispensingState(machine));
        machine.dispenseItem();
    }

    @Override
    public void refund() {
        machine.refundBalance();
        machine.reset();
        machine.setState(new IdleState(machine));
    }
}
```

he only valid action from the user's perspective is dispense. This action immediately transitions the machine to the DispensingState to prevent any other user interactions during the physical dispensing process.

#### DispensingState

A transient state that locks the machine while an item is being physically dispensed.

```java
class DispensingState extends VendingMachineState {
    public DispensingState(VendingMachine machine) {
        super(machine);
    }

    @Override
    public void insertCoin(Coin coin) {
        System.out.println("Currently dispensing. Please wait.");
    }

    @Override
    public void selectItem(String code) {
        System.out.println("Currently dispensing. Please wait.");
    }

    @Override
    public void dispense() {
        // already triggered by HasMoneyState
    }

    @Override
    public void refund() {
        System.out.println("Dispensing in progress. Refund not allowed.");
    }
}
```

This state effectively blocks all user input. The actual dispensing logic is handled by the VendingMachine's dispenseItem method, which, upon completion, will transition the machine back to the IdleState.

### 4.5 `VendingMachine` Class (Context)

This class is the main entry point for all client interactions. It holds the current state and delegates actions to it.

```java
$bd
```

- **State Pattern "Context":** The VendingMachine class is the Context for the State pattern. It holds a reference to the currentState and delegates all user actions to that state object.
- **Facade Pattern:** It also acts as a Facade, providing a simple, unified interface (insertCoin, selectItem, etc.) to the client. The client does not need to know about the complex internal states or the inventory management.
- **Singleton Pattern:** The machine is implemented as a Singleton (getInstance()) because in the real world, you interact with one single instance of a physical machine.
- **State Transition Control:** The machine provides a setState method, allowing the state objects themselves to control the machine's transitions.

### 4.6 `VendingMachineDemo`

This driver class demonstrates a complete user journey, showcasing the state transitions in action.

```java
$c3
```

---

# 5. Run and Test

---

# 6. Quiz
