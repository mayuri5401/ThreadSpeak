---
id: "lld-management-systems-design-restaurant-management-system"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Management Systems"
subSection: ""
title: "Design Restaurant Management System"
slug: "lld-management-systems-design-restaurant-management-system"
summary: "In this chapter, we will explore the low-level design of a restaurant management system in detail."
eli10: "Imagine Design Restaurant Management System as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Restaurant Management System Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Management Systems","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Restaurant Management System"
  code: |
    enum TableStatus {
        AVAILABLE,
        OCCUPIED,
        RESERVED
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Restaurant Management System"
>
> A **Restaurant Management System** is software that helps manage the day-to-day operations of a restaurant, including table reservations, order taking, kitchen coordination, billing, menu updates, and staff management.
>
> 
> <!-- Simulation: restaurant-management -->
> 

>
> It streamlines workflows, improves customer service, and increases overall efficiency.

In this chapter, we will explore the **low-level design of a restaurant management system** in detail.

Lets start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** What are the primary actors in this system" Are we designing a customer-facing app for ordering, or an internal system for staff management
>
> **Interviewer:** Let's focus on the internal system for staff (Waiters, Chefs) to manage orders and billing. Customer interaction is out of scope.
>
> **Candidate:** Should the system handle table reservations in advance, or only manage walk-in customers and their current table status"
>
> **Interviewer:** Good question. For now, let’s focus on the core workflow: taking an order, preparing it, serving it, and generating a bill. We can assume tables are managed in real-time (available, occupied), but a full reservation feature is not required.
>
> **Candidate:** Should the system track inventory for menu items" For example, knowing if we're out of a certain ingredient.
>
> **Interviewer:** That's a great extension, but let’s keep it out of scope for this interview. Assume all menu items are always available.
>
> **Candidate:** How are orders assigned to chefs"
>
> **Interviewer:** Let's assume a simple mechanism for now, like assigning an order to the first available chef.
>
> **Candidate:** How does a waiter know when an order item is ready for pickup from the kitchen"
>
> **Interviewer:** The waiter who takes the order should be notified specifically when an item they are responsible for is ready for pickup.
>
> **Candidate:** How should payments be handled" Do we need to integrate with a payment gateway for credit cards, or just calculate the final bill"
>
> **Interviewer:** Just focus on calculating the final bill. The bill should be flexible enough to include things like taxes or service charges. Assume payment processing is handled by a separate system.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- **Staff Management:** The system should support different staff roles, specifically **Waiters** and **Chefs**.
- **Table Management:** The system must track the status of each table (e.g., AVAILABLE, OCCUPIED).
- **Menu Management:** The system must maintain a menu of items, each with a name and a price.
- **Order Management:** Waiters can create an order for a specific table. The system must track the status of each individual order item.
- **Kitchen Workflow:** Chefs receive and prepare orders. The system must notify the correct waiter when an order item is ready for pickup.
- **Billing:** The system must be able to generate a bill for a given order. The bill calculation should be flexible enough to dynamically add charges like taxes and service fees.

## 1.2 Non-Functional Requirements

- **Modularity:** The design should follow solid object-oriented principles with clear separation of concerns.
- **Extensibility:** The design should be easy to extend to allow future enhancements. For example, it should be easy to add new types of bill charges (e.g., discounts) or new order item states without modifying existing code.
- **Maintainability:** The code should be clean, readable, and easy to maintain, leveraging appropriate design patterns to solve common problems.
- **Concurrency:** The system should be designed to handle multiple orders and staff interactions concurrently without data corruption.
- **Clarity:** The system should provide clear console output to demonstrate the workflow, such as state changes and notifications.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., order, table, menu item, staff, kitchen view, payment) and **actions** (e.g., create, customize, assign, track, pay) from the functional requirements. These typically translate directly into **classes**, **enums**, or **interfaces** in an object-oriented design.

Let’s walk through the functional requirements and extract the relevant entities:

#### **1. Manage Staff, Tables, and the Menu.**

This points to several foundational entities:

1. `Staff`: An abstract base class for employees. Concrete implementations are `Waiter` and `Chef`.
2. `Table`: Represents a physical table in the restaurant, with a status managed by the TableStatus enum.
3. `Menu`: A container for all available food and drink items.
4. `MenuItem`: Represents a single dish or drink with a name and price.
5. `Restaurant`: A Singleton class that acts as a central registry, holding all staff, tables, and the menu.

#### **2. Manage the entire order lifecycle, from creation to serving.**

This is the core workflow and involves several interacting entities:

1. **Order**: A container object that groups multiple OrderItems for a specific Table.
2. **OrderItem**: A crucial entity representing a single menu item within an order

#### **3. Generate a flexible bill with dynamic charges like taxes and service fees.**

This calls for a `Bill` entity. The requirement for flexibility is met using the **Decorator pattern**.

#### **4. Provide a simplified, high-level interface to the system.**

To hide the internal complexity we introduce a facade called `RestaurantManagementSystemFacade`. It acts as a Singleton and provides a simple API for all major operations like taking an order or generating a bill.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **Staff** (Waiter, Chef): Represent the employees who interact with the system.
> - **Table**: Represents a dining table with a specific status (AVAILABLE, OCCUPIED).
> - **Menu** and **MenuItem**: Represent the restaurant's offerings and their prices.
> - **Restaurant: **Acts as a central registry, holding all staff, tables, and the menu.
> - **Order**: A container for a collection of OrderItems associated with a Table.
> - **OrderItem**: Represents a single item in an order.
> - **Bill**: Tracks the total cost of an order including taxes.
> - **RestaurantManagementSystemFacade**: A Singleton that acts as a Facade, providing a simplified and unified interface to the entire restaurant management system.

These core entities define the essential abstractions of a Restaurant Management System and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

`TableStatus`

Defines the status of a table (`AVAILABLE`, `OCCUPIED`, `RESERVED`).

### **Data Classes**

#### `Table`

Represents a dining table with an ID, capacity, and status.

#### `MenuItem`

A simple data class for a menu item, holding its ID, name, and price.

#### `Menu`

A container class that holds a collection of `MenuItem`s for the restaurant.

#### `Order`

Represents a customer's order for a specific table. It contains a list of `OrderItem`s.

#### `Bill`

A wrapper class that holds a `BillComponent` and provides a method to print the final, decorated bill.

### **Core Classes**

#### `Staff`** (Abstract Class)**

A base class for all employees, holding common properties like ID and name.

- `Chef`** & **`Waiter`: Concrete implementations of `Staff`. The `Chef` is responsible for preparing orders. The `Waiter` takes orders, serves them, and, crucially, acts as an **Observer** to get notified when items are ready for pickup.

#### `OrderItem`

A central class representing a single item within an order. 

It acts as the **Context** for the State pattern (delegating state transitions to its `state` object) and the **Subject** for the Observer pattern (notifying its observers, i.e., the `Waiter`).

#### `BaseBill`

The concrete component that calculates the initial total based on the order's items.

#### `Restaurant`** (Singleton)**

A class that holds all the restaurant's core assets like staff, tables, and the menu.

#### `RestaurantManagementSystemFacade`** (Singleton & Facade)**

The primary entry point for the application.

It hides the system's internal complexity and provides a simple, unified API for all major operations like taking orders and generating bills.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- The `Restaurant` is composed of `Table`s, `Staff` (Chefs and Waiters), and a `Menu`.
- An `Order` is composed of a list of `OrderItem`s.
- A `Menu` is composed of `MenuItem`s.

### **Association**

- An `OrderItem` is associated with a single `MenuItem`.
- A `Bill` is associated with a `BillComponent` (which can be a `BaseBill` or a decorated one).
- An `OrderItem` (Subject) is associated with a list of `OrderObserver`s (the `Waiter`).
- An `OrderItem` (Context) is associated with a single, current `OrderItemState`.

### **Inheritance**

- `Chef` and `Waiter` inherit from the abstract `Staff` class.
- `Waiter` implements the `OrderObserver` interface.
- Concrete state classes (`OrderedState`, etc.) implement the `OrderItemState` interface.
- Concrete command classes (`PrepareOrderCommand`, etc.) implement the `Command` interface.
- `BillDecorator` implements `BillComponent`, and concrete decorators like `TaxDecorator` extend `BillDecorator`.

### **Dependency**

- The `RestaurantManagementSystemFacade` depends on `Command` objects to process orders.
- The `ReadyForPickupState` depends on the `OrderItem`'s `notifyObservers` method to signal waiters.
- A client depends on the `RestaurantManagementSystemFacade` to interact with the system.

## 3.3 Key Design Patterns

### [**State Pattern**](/learn/lld/state)

The lifecycle of an `OrderItem` is managed using the State pattern. The `OrderItem` (Context) delegates its behavior to different `OrderItemState` objects. This cleanly separates the logic for each stage of preparation and makes the flow robust.

### [**Observer Pattern**](/learn/lld/observer)

This pattern is crucial for communication between the kitchen and serving staff. The `OrderItem` (Subject) notifies the `Waiter` (Observer) when it is ready for pickup. This decouples the chef's actions from the waiter's responsibilities.

### [**Command Pattern**](/learn/lld/command)

The `Command` pattern encapsulates a request as an object (e.g., `PrepareOrderCommand`). This decouples the object that issues a request (the facade) from the object that performs it (the `Chef` or `Waiter`).

### [**Decorator Pattern**](/learn/lld/decorator)

The `BillComponent` and its decorators (`TaxDecorator`, `ServiceChargeDecorator`) are used to add responsibilities (costs) to the bill dynamically. This allows for flexible calculation of the final total without altering the base bill object.

### [**Facade Pattern**](/learn/lld/facade)

The `RestaurantManagementSystemFacade` class serves as a facade. It provides a simple, high-level API (`takeOrder`, `generateBill`) that hides the complex internal workflows involving states, observers, commands, and decorators.

### [**Singleton Pattern**](/learn/lld/singleton)

`Restaurant` and `RestaurantManagementSystemFacade` are implemented as singletons to ensure a single, globally accessible point of control for restaurant assets and system operations.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 `TableStatus` Enum

Defines the current state of a table — whether it's free, in use, or booked.

```java
enum TableStatus {
    AVAILABLE,
    OCCUPIED,
    RESERVED
}
```

### 4.2 `Table` Class

Represents a dining table in the restaurant.

```java
class Table {
    private final int id;
    private final int capacity;
    private TableStatus status;

    public Table(int id, int capacity) {
        this.id = id;
        this.capacity = capacity;
        this.status = TableStatus.AVAILABLE;
    }

    public int getId() { return id; }
    public int getCapacity() { return capacity; }
    public TableStatus getStatus() { return status; }
    public void setStatus(TableStatus status) { this.status = status; }
}
```

Each table has a unique ID, a seating capacity, and a status to indicate availability.

### 4.3 Staff

`Staff` is the base class shared by `Chef` and `Waiter`.

```java
$e0
```

- `Chef` prepares an order and transitions each item to the `PREPARING` state.
- `Waiter` observes order items and serves them once notified (implements **Observer pattern** via `OrderObserver`).

### 4.4 `Menu` and `MenuItem`

`Menu` is a container of `MenuItem`s, each identified by a unique ID. Allows adding and retrieving items efficiently.

```java
class MenuItem {
    private final String id;
    private final String name;
    private final double price;

    public MenuItem(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }
}

class Menu {
    private final Map<String, MenuItem> items = new HashMap<>();

    public void addItem(MenuItem item) {
        items.put(item.getId(), item);
    }

    public MenuItem getItem(String id) {
        MenuItem item = items.get(id);
        if (item == null) {
            throw new IllegalArgumentException("Menu item with ID " + id + " not found.");
        }
        return item;
    }
}
```

### Restaurant

```java
class Restaurant {
    private static final Restaurant INSTANCE = new Restaurant();
    private final Map<String, Waiter> waiters = new HashMap<>();
    private final Map<String, Chef> chefs = new HashMap<>();
    private final Map<Integer, Table> tables = new HashMap<>();
    private final Menu menu = new Menu();

    private Restaurant() {}

    public static Restaurant getInstance() {
        return INSTANCE;
    }

    public void addWaiter(Waiter waiter) { waiters.put(waiter.getId(), waiter); }
    public Waiter getWaiter(String id) { return waiters.get(id); }

    public void addChef(Chef chef) { chefs.put(chef.getId(), chef); }
    public Chef getChef(String id) { return chefs.get(id); }

    public List<Chef> getChefs() {
        return chefs.values().stream().toList();
    }

    public List<Waiter> getWaiters() {
        return waiters.values().stream().toList();
    }

    public void addTable(Table table) { tables.put(table.getId(), table); }

    public Menu getMenu() { return menu; }
}
```

### OrderItem

This class represents a single item within an order and acts as the Context for the OrderItemState and the Subject for the OrderObserver.

```java
class OrderItem {
    private final MenuItem menuItem;
    private final Order order;
    private OrderItemState state;
    private final List<OrderObserver> observers = new ArrayList<>();

    public OrderItem(MenuItem menuItem, Order order) {
        this.menuItem = menuItem;
        this.order = order;
        this.state = new OrderedState();
    }

    public void changeState(OrderItemState newState) {
        this.state = newState;
        System.out.println("Item '" + menuItem.getName() + "' state changed to: " + newState.getStatus());
    }

    public void nextState() {
        state.next(this);
    }

    public void setState(OrderItemState state) {
        this.state = state;
    }

    public void addObserver(OrderObserver observer) {
        observers.add(observer);
    }

    public void notifyObservers() {
        new ArrayList<>(observers).forEach(observer -> observer.update(this));
    }

    public MenuItem getMenuItem() { return menuItem; }
    public Order getOrder() { return order; }
}
```

- **Context for State:** The OrderItem delegates state transition logic to its state object by calling state.next(this).
- **Subject for Observer:** It also maintains a list of observers (typically the waiter who took the order). When its state transitions out of ReadyForPickup, it notifies these observers. This is a powerful combination of the State and Observer patterns.

### Order

An order is associated with a table and contains multiple `OrderItem`s.

```java
class Order {
    private final int orderId;
    private final int tableId;
    private final List<OrderItem> items = new ArrayList<>();

    public Order(int orderId, int tableId) {
        this.orderId = orderId;
        this.tableId = tableId;
    }

    public void addItem(OrderItem item) {
        items.add(item);
    }

    public double getTotalPrice() {
        return items.stream()
                .mapToDouble(item -> item.getMenuItem().getPrice())
                .sum();
    }

    public int getOrderId() { return orderId; }
    public int getTableId() { return tableId; }
    public List<OrderItem> getOrderItems() { return items; }
}
```

### OrderObserver

```java
interface OrderObserver {
    void update(OrderItem item);
}
```

### Command

This pattern encapsulates a request as an object, allowing us to decouple the object that issues a request from the object that performs it.

```java
interface Command {
    void execute();
}

class PrepareOrderCommand implements Command {
    private final Order order;
    private final Chef chef;

    public PrepareOrderCommand(Order order, Chef chef) {
        this.order = order;
        this.chef = chef;
    }

    @Override
    public void execute() {
        chef.prepareOrder(order);
    }
}

class ServeOrderCommand implements Command{
    private final Order order;
    private final Waiter waiter;

    public ServeOrderCommand(Order order, Waiter waiter) {
        this.order = order;
        this.waiter = waiter;
    }

    @Override
    public void execute() {
        waiter.serveOrder(order);
    }
}
```

- **Encapsulated Requests:** A PrepareOrderCommand encapsulates everything needed to prepare an order: the Order itself and the Chef who will prepare it.

### OrderItemState

An OrderItem progresses through several states: Ordered -> Preparing -> ReadyForPickup -> Served. The State pattern is used to manage this flow and the behavior in each state.

```java
$ec
```

Each state class encapsulates the logic for that state. The next() method defines the valid transition to the subsequent state.

The ReadyForPickupState is special. Its next() method is responsible for triggering the notifyObservers() call on the OrderItem. This is how the system signals that a chef has finished preparing an item.

### Bill and Decorators

```java
interface BillComponent {
    double calculateTotal();
    String getDescription();
}

class Bill {
    private final BillComponent component;

    public Bill(BillComponent component) {
        this.component = component;
    }

    public void printBill() {
        System.out.println("\n--- BILL ---");
        System.out.printf("Description: %s\n", component.getDescription());
        System.out.printf("Total: $%.2f\n", component.calculateTotal());
        System.out.println("------------");
    }
}

class BaseBill implements BillComponent {
    private final Order order;
    public BaseBill(Order order) { this.order = order; }

    @Override
    public double calculateTotal() { return order.getTotalPrice(); }

    @Override
    public String getDescription() { return "Order Items"; }
}
```

### Bill Decorators

The **Decorator Pattern** adds dynamic pricing behaviors (e.g., tax, service charge) without modifying the core billing logic.

This pattern allows behavior (in this case, costs) to be added to an object dynamically. It's perfect for adding taxes, service charges, or discounts to a bill.

```java
$f2
```

### RestaurantManagementSystemFacade

This class is a **Singleton** that provides a simplified, high-level interface to the complex subsystem.

```java
$f8
```

- **Facade Pattern:** This class provides simple methods like takeOrder and generateBill, hiding the complex interactions between states, observers, commands, and decorators.
- **Orchestration:** The facade's methods are responsible for orchestrating the creation and wiring of different objects. For example, takeOrder is responsible for finding the staff, creating the Order and OrderItem objects, and crucially, registering the Waiter as an observer on each OrderItem.

### RestaurantManagementSystemDemo

The demo class validates the entire system by simulating a typical restaurant scenario.

```java
$fe
```

---

# 5. Run and Test

---

# 6. Quiz
