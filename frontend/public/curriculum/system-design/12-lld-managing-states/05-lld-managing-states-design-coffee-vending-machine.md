---
id: "lld-managing-states-design-coffee-vending-machine"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Managing States"
subSection: ""
title: "Design Coffee Vending Machine"
slug: "lld-managing-states-design-coffee-vending-machine"
summary: "In this chapter, we will explore the low-level design of a coffee vending machine in detail."
eli10: "Imagine Design Coffee Vending Machine as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Coffee Vending Machine Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Managing States","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Coffee Vending Machine"
  code: |
    enum CoffeeType {
        ESPRESSO,
        LATTE,
        CAPPUCCINO;
    }
    
    enum Ingredient {
        COFFEE_BEANS,
        MILK,
        SUGAR,
        WATER,
        CARAMEL_SYRUP
    }
    
    enum ToppingType {
        EXTRA_SUGAR,
        CARAMEL_SYRUP
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Coffee Vending Machine"
>
> A **coffee vending machine** is an automated machine that prepares and dispenses coffee and related beverages (like espresso, cappuccino, or tea) to users with minimal human intervention.
>
> 
> <!-- Simulation: coffee-machine -->
> 

>
> Users typically interact with the machine by:
>
> - Selecting a drink from a menu
> - Customizing options (e.g., sugar level, milk type, size)
> - Making payment (coins, cash, card, or digital wallet)
> - Receiving the prepared beverage
>
> Internally, the machine manages ingredient inventory (coffee powder, water, milk, sugar), tracks user inputs, processes payments, and maintains operational states (e.g., idle, dispensing, out of service).

In this chapter, we will explore the **low-level design of a coffee vending machine** in detail.

Lets start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the machine support multiple beverage types"
>
> **Interviewer:** Yes, the machine should support a configurable menu of beverage types like espresso, cappuccino, latte, black coffee, etc.
>
> **Candidate:** Does the system need to support payment functionality"
>
> **Interviewer:** No, we can skip payment handling. You can assume this machine is used in environments like offices or homes where no payment is required.
>
> **Candidate:** Should the machine allow customization, such as choosing sugar level or milk quantity"
>
> **Interviewer:** Yes, users should be able to make basic customizations such as choosing sugar and milk levels per beverage.
>
> **Candidate:** Should the machine track inventory of ingredients like coffee, milk, and sugar"
>
> **Interviewer:** Yes, it should maintain an internal inventory for all ingredients.
>
> **Candidate:** How should the system handle situations where some ingredients are unavailable"
>
> **Interviewer:** The system should notify the user with an appropriate message.
>
> **Candidate:** Does the machine need to support concurrent user interactions"
>
> **Interviewer:** No, assume the machine handles one request at a time.
>
> **Candidate:** Should the machine support an admin interface for restocking and maintenance"
>
> **Interviewer:** Yes, an admin should be able to view current inventory levels and refill or reset the machine as needed.

With the scope clarified, we can now summarize the core system requirements.

## 1.1 Functional Requirements

- Support a configurable list of beverage types (e.g., espresso, cappuccino, latte)
- Allow adding/updating the ingredient stock
- Allow users to select a beverage and customize basic options such as sugar and milk levels
- Deduct the appropriate amount of ingredients from inventory after each successful order.
- Display an appropriate message if a selected beverage cannot be prepared due to insufficient ingredients.
- Serve one customer at a time (no concurrency required)

## 1.2 Non-Functional Requirements

- **Modularity:** The system should have clear separation of concerns
- **Extensibility:** The design should support adding new drink types, and customizing ingredient mixes
- **Maintainability:** The codebase should follow object-oriented principles and allow easy modification or extension
- **User Feedback:** The machine should provide clear instructions and status updates to the user throughout the interaction

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., beverage, ingredient, payment, inventory, customization) and **actions** (e.g., select, pay, prepare, refill, notify) from the functional requirements. These typically translate into classes, enums, or interfaces in an object-oriented design.

Let’s walk through the requirements and extract the relevant entities:

#### **1. Support a configurable list of beverage types (e.g., espresso, cappuccino, latte).**

This points directly to a `Coffee` entity (an abstract base class) representing a generic beverage. Concrete subclasses like `Espresso`, `Latte`, and `Cappuccino` define specific coffee types.

#### **2. Allow users to customize basic options (sugar, milk) per beverage.**

The ability to dynamically add features like sugar or caramel syrup without altering the base Coffee class is a classic use case for the **Decorator pattern**. This introduces a `CoffeeDecorator` abstract class and concrete decorator classes like `ExtraSugarDecorator` and `CaramelSyrupDecorator`, which wrap Coffee objects to add customization. `ToppingType` enum helps specify these options.

#### **3. Deduct ingredients from inventory and display messages if unavailable.**

This necessitates an `Inventory` entity to manage the stock levels of various raw materials. The raw materials themselves are represented by the Ingredient enum (COFFEE_BEANS, MILK, SUGAR, etc.). The Inventory is implemented as a Singleton to ensure a single, consistent view of stock.

#### **4. Serve one customer at a time, with specific interaction flows (selection, dispensing).**

The overall control and flow of the vending machine's operations are managed by the `CoffeeVendingMachine` entity.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - `Coffee`** (Abstract Class)**: The base entity for all beverages. It defines the common preparation steps and abstract methods for price and recipe, which concrete coffee types implement.
> - `Concrete Coffee Types` (Espresso, Latte, Cappuccino): Subclasses of Coffee that define specific beverage recipes, prices, and unique condiment additions.
> - `Ingredient`** (Enum)**: Defines the various raw materials (e.g., COFFEE_BEANS, MILK) managed by the Inventory.
> - `ToppingType`** (Enum)**: Defines the available optional toppings for customization.
> - `Inventory`: A Singleton entity responsible for managing the stock levels of all Ingredients, including checking availability and deducting used quantities.
> - `CoffeeVendingMachine`: The central class and client-facing interface. It orchestrates the creation and customization of beverages, interacting with the Inventory.

These core entities define the essential abstractions of a Coffee Vending Machine and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

- `CoffeeType`: Defines the base types of coffee available (`ESPRESSO`, `LATTE`, `CAPPUCCINO`).
- `Ingredient`: Represents all raw materials managed by the inventory (`COFFEE_BEANS`, `MILK`, etc.).
- `ToppingType`: Defines the optional add-ons a user can select (`EXTRA_SUGAR`, `CARAMEL_SYRUP`).

### **Data Classes**

This design does not use simple data classes, as most objects encapsulate both state and behavior.

### **Core Classes**

#### `Coffee`** (Abstract Class)**

The base class for all beverage products.

It defines the skeleton of the preparation algorithm using the **Template Method pattern**, with a core `prepare()` method and an abstract `addCondiments()` "hook" for subclasses to implement.

- `Espresso`**, **`Latte`**, **`Cappuccino`: Concrete implementations of `Coffee`. Each class provides a specific implementation for `addCondiments()`, along with its unique price and recipe.

#### `CoffeeFactory`

A simple factory class responsible for creating instances of concrete `Coffee` types based on a `CoffeeType` enum.

#### `Inventory`** (Singleton)**

A thread-safe class that manages the stock levels of all `Ingredient`s. It provides a single, global point of access to the machine's physical inventory.

#### `CoffeeVendingMachine`** (Singleton & Facade)**

The main class and the primary entry point for all client interactions. It acts as the **Context** for the State pattern, delegating all user actions to its current state object. It also acts as a **Facade**, simplifying the complex process of coffee creation and dispensing for the client.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Inheritance / Implementation**

- `Espresso`, `Latte`, `Cappuccino`, and the abstract `CoffeeDecorator` all extend the `Coffee` abstract class.
- `ExtraSugarDecorator` and `CaramelSyrupDecorator` extend the `CoffeeDecorator` abstract class.
- Concrete state classes like `ReadyState` and `SelectingState` implement the `VendingMachineState` interface.

### **Composition**

- The `CoffeeVendingMachine` "has-a" `VendingMachineState` object that defines its current behavior.
- A `CoffeeDecorator` object is composed of another `Coffee` object (the one it wraps), forming a recursive structure.

### **Association**

- The `CoffeeVendingMachine` is associated with the `Coffee` object that the user has selected.

### **Dependency**

- The `CoffeeVendingMachine` (client) depends on the `CoffeeFactory` to create base coffee objects.
- The `CoffeeVendingMachine` depends on concrete `CoffeeDecorator`s to add toppings.
- The `CoffeeVendingMachine` depends on the `Inventory` singleton to check for and deduct ingredients.
- All concrete `VendingMachineState`s depend on the `CoffeeVendingMachine` (the context) to access machine data and trigger state transitions.

## 3.3 Key Design Patterns

### [**State Pattern**](/learn/lld/state)

The lifecycle of a user transaction is managed using the State pattern.

The `CoffeeVendingMachine` (Context) delegates its behavior to different `VendingMachineState` objects (`ReadyState`, `SelectingState`, etc.). This cleanly separates state-specific logic and makes managing the user interaction flow robust and easy to extend.

### [**Decorator Pattern**](/learn/lld/decorator)

This pattern is used to add toppings to a coffee dynamically. The `CoffeeDecorator` classes wrap a base `Coffee` object (or another decorator), allowing for flexible combinations of toppings. Each decorator adds its own cost, recipe ingredients, and preparation steps without altering the base coffee classes.

### [**Template Method Pattern**](/learn/lld/template-method)

The abstract `Coffee` class defines the `prepare()` method, which serves as a template for making any coffee. It standardizes the algorithm (grind, brew, pour) while allowing subclasses (`Latte`, `Cappuccino`) to provide their own implementation for the `addCondiments()` step.

### [**Factory Pattern (Simple Factory)**](/learn/lld/factory-method)

The `CoffeeFactory` encapsulates the logic for creating different types of `Coffee`. This decouples the `CoffeeVendingMachine` from the instantiation of concrete coffee classes, making it easy to add new coffee types in the future.

### [**Facade Pattern**](/learn/lld/facade)

The `CoffeeVendingMachine` class acts as a facade. It provides a simple, high-level API (`selectCoffee`, `insertMoney`, `dispenseCoffee`) that hides the complex internal interactions between the factory, decorators, states, and inventory from the client.

### [**Singleton Pattern**](/learn/lld/singleton)

`CoffeeVendingMachine` and `Inventory` are implemented as singletons. This is a logical choice as it models a single physical machine with a single, shared inventory, ensuring a global point of access and control.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Enums

```java
enum CoffeeType {
    ESPRESSO,
    LATTE,
    CAPPUCCINO;
}

enum Ingredient {
    COFFEE_BEANS,
    MILK,
    SUGAR,
    WATER,
    CARAMEL_SYRUP
}

enum ToppingType {
    EXTRA_SUGAR,
    CARAMEL_SYRUP
}
```

- `CoffeeType`: Defines the base beverages.
- `Ingredient`: Inventory-managed raw materials.
- `ToppingType`: Optional add-ons for customization.

### 4.2 `Coffee` (Template Method Pattern)

This pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. This is perfect for coffee preparation, where the core steps are the same, but the condiments vary.

**Coffee** class defines the template method `prepare()` and the abstract `addCondiments()` step.

```java
abstract class Coffee {
    protected String coffeeType = "Unknown Coffee";

    public String getCoffeeType() {
        return coffeeType;
    }

    // The Template Method
    public void prepare() {
        System.out.println("\nPreparing your " + this.getCoffeeType() + "...");
        grindBeans();
        brew();
        addCondiments(); // The "hook" for base coffee types
        pourIntoCup();
        System.out.println(this.getCoffeeType() + " is ready!");
    }

    // Common steps
    private void grindBeans() { System.out.println("- Grinding fresh coffee beans."); }
    private void brew() { System.out.println("- Brewing coffee with hot water."); }
    private void pourIntoCup() { System.out.println("- Pouring into a cup."); }

    // Abstract step to be implemented by subclasses
    protected abstract void addCondiments();

    public abstract int getPrice();
    public abstract Map<Ingredient, Integer> getRecipe();
}
```

Implements the **Template Method pattern** for beverage preparation, allowing subclasses to override `addCondiments()`.

The prepare() method is marked final (implicitly in this structure) to ensure subclasses cannot override the overall preparation sequence.

The addCondiments() method is the "hook" where subclasses can insert their unique logic (like adding milk for a latte) into the predefined algorithm. This promotes code reuse for the common steps.

### 4.3 Concrete `Coffee` Types

Each subclass provides its price, recipe, and custom condiments.

```java
$c0
```

### 4.4 `CoffeeFactory`

Implements the **Factory pattern** to abstract coffee object creation.

```java
class CoffeeFactory {
    public static Coffee createCoffee(CoffeeType type) {
        switch (type) {
            case ESPRESSO:
                return new Espresso();
            case LATTE:
                return new Latte();
            case CAPPUCCINO:
                return new Cappuccino();
            default:
                throw new IllegalArgumentException("Unsupported coffee type: " + type);
        }
    }
}
```

### 4.5 `CoffeeDecorator` and Topping Decorators

Implements the **Decorator pattern** to layer toppings dynamically. Each decorator adjusts the recipe and final preparation behavior.

```java
$c5
```

Decorators allow for flexible combinations. A client can create a Latte, wrap it with ExtraSugarDecorator, and then wrap that result with CaramelSyrupDecorator. The final object will have the combined price, recipe, and preparation steps of all components.

### 4.7 `VendingMachineState` Interface and Concrete States

Implements the **State pattern** to handle user interaction flow:

- Selection → Payment → Dispensing → Reset

```java
$cb
```

Each state class handles user actions appropriately. In ReadyState, only selectCoffee is valid. In SelectingState, insertMoney and cancel are valid. This eliminates a massive if/else or switch block in the main machine class.

### Inventory

Manages the stock levels of all ingredients.

```java
$d1
```

- **Singleton Pattern:** A single Inventory instance is shared across the entire application, representing the physical inventory of the machine.

### 4.8 `CoffeeVendingMachine` (Singleton + Context)

This is the main class that clients interact with.

```java
$d6
```

The machine provides a simple, high-level API (selectCoffee, insertMoney) that hides the internal complexity of factories, decorators, states, and inventory.

### 4.9 `CoffeeVendingMachineDemo`

The demo class validates the entire system by simulating various user scenarios.

```java
$dc
```

---

# 5. Run and Test

---

# 6. Quiz
