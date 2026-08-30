---
id: "lld-e-commerce-booking-systems-design-online-shopping-system-like-amazon"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - E commerce Booking Systems"
subSection: ""
title: "Design Online Shopping System like Amazon"
slug: "lld-e-commerce-booking-systems-design-online-shopping-system-like-amazon"
summary: "In this chapter, we will explore the low-level design of online shopping system like Amazon in detail."
eli10: "Imagine Design Online Shopping System like Amazon as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Online Shopping System like Amazon Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","E commerce Booking Systems","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Online Shopping System like Amazon"
  code: |
    enum OrderStatus {
        PENDING_PAYMENT,
        PLACED,
        SHIPPED,
        DELIVERED,
        CANCELLED,
        RETURNED
    }
    
    enum ProductCategory {
        ELECTRONICS,
        BOOKS,
        CLOTHING,
        HOME_GOODS,
        GROCERY
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is Amazon"
>
> Amazon is a large-scale **e-commerce platform** that enables users to **browse**, **search**, and **purchase** products from a wide range of categories, all from the convenience of a digital interface.
>
> 
> <!-- Simulation: amazon -->
> 

>
> Products are often sold by **multiple sellers**, with the platform acting as a central hub for managing listings, payments, logistics, and order fulfillment.

In this chapter, we will explore the **low-level design of online shopping system like Amazon** in detail.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the system support both buyers and sellers, or are we focusing only on the customer-facing side for now"
>
> **Interviewer:** Let’s focus on the customer-facing side. You can assume that the product catalog is already populated by sellers.
>
> **Candidate:** Should we support product categories, filters, and search functionality for browsing the catalog"
>
> **Interviewer:** Yes, users should be able to search products by name and filter products by category,.
>
> **Candidate:** Do we need to support features like cart management and order history"
>
> **Interviewer:** Yes, customers should be able to add products to their cart, remove them, and view past orders.
>
> **Candidate:** Should the system handle real-time inventory validation during checkout"
>
> **Interviewer:** Yes. The system must check inventory before confirming an order and update stock levels immediately after a successful purchase.
>
> **Candidate:** Are we implementing payment processing"
>
> **Interviewer:** For this version, assume that payment is handled externally and is always successful. However, the system should be designed to support multiple payment strategies in the future.
>
> **Candidate:** Should we allow users to leave reviews and ratings for products"
>
> **Interviewer:** Not in this version. Let’s skip reviews and focus on browsing, ordering, and cart management.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Allow users to browse and search products by **name** and **category**
- Enable users to view product details (title, description, price, availability)
- Support **adding** and **removing** items in a shopping cart
- Allow users to **place orders** from items in the cart
- **Validate inventory** before confirming orders and update stock upon purchase
- Allow users to **view past orders**
- Support integration with **multiple payment gateways** (assume payment is always successful in this version)

## 1.2 Non-Functional Requirements

- **Modularity:** The system should consist of well-separated components
- **Extensibility:** The design should allow for future features like seller dashboards, product reviews, wishlists, and delivery tracking
- **Consistency:** Inventory and order placement should be transactionally consistent to avoid overselling
- **Maintainability:** The code should be organized, testable, and easy to extend

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., user, product, cart, order, inventory) and **actions** (e.g., browse, search, add to cart, checkout, authenticate) from the functional requirements. These typically translate directly into **classes**, **enums**, or **interfaces** in an object-oriented design.

Let’s walk through the functional requirements and extract the relevant entities:

#### **1.  Allow users to browse and search for products by name and category.**

This points directly to a `Product` entity, which represents an item for sale. Products are classified, leading to a `ProductCategory` enum. The action of searching is encapsulated in a `SearchService` that operates on the product catalog.

#### **2. Support adding and removing items in a shopping cart.**

The concept of a `ShoppingCart` is a core entity that holds items a customer intends to buy. Each entry in the cart is a `CartItem`, which links a Product to a specific quantity. The cart itself is associated with a user's `Account`.

#### **3. Allow customers to place orders and view their history.**

The central entity for a purchase is the `Order`. It captures a transaction at a specific point in time and contains immutable `OrderLineItem` objects, which are snapshots of the products' details (name, price) at the time of purchase. An Order also has a lifecycle, which is managed by an `OrderStatus` enum (PLACED, SHIPPED, etc.).

#### **4. A customer must be able to register and manage their details.**

The user of the system is a `Customer`. This entity holds personal information, an `Account` for managing credentials and the cart, and an `Address` for shipping.

#### **5. Validate inventory before confirming orders.**

To manage product availability, an `InventoryService` is crucial. This service is responsible for checking and updating stock levels transactionally to prevent overselling.

#### **6. Support integration with multiple payment gateways.**

The need for flexible payment options suggests a `PaymentStrategy` interface, allowing different payment methods (e.g., `CreditCardPaymentStrategy`, `UPIPaymentStrategy`) to be used interchangeably. A `PaymentService` coordinates the execution of the chosen strategy.

#### **7. Provide a simplified, high-level interface to the system.**

To manage the interactions between all these components, an `OnlineShoppingSystem` class acts as a Facade and Singleton. It provides a simple entry point for clients to perform actions like registering customers, adding products to the cart, and placing orders.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - `Customer`: Represents the user of the system. Holds personal details, an Account, and an Address.
> - `Product`: Represents an item available for sale in the catalog.
> - `ShoppingCart`: A temporary container for CartItem objects that a customer intends to purchase.
> - `CartItem`: Represents a specific quantity of a Product within a ShoppingCart.
> - `Order`: Represents a successful transaction with one or more ordered items.
> - `OrderLineItem`: An immutable record of a product included in an Order, capturing its price and quantity at the time of purchase.
> - `Enums` (OrderStatus, ProductCategory): Define fixed sets of constants for order statuses and product categories, ensuring consistency.
> - `Services` (InventoryService, OrderService, PaymentService, SearchService): Encapsulate the core business logic for managing stock, creating orders, processing payments, and searching the product catalog.
> - `OnlineShoppingSystem`: A Facade and Singleton that provides a unified, high-level interface to the entire e-commerce platform.

These core entities define the essential abstractions of an online shopping system like Amazon and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

- `OrderStatus`: Defines the discrete stages of an order's lifecycle, such as `PLACED`, `SHIPPED`, and `DELIVERED`.
- `ProductCategory`: Classifies products into fixed categories like `ELECTRONICS`, `BOOKS`, and `CLOTHING`.

### **Data Classes**

#### `Address`

A simple data class holding a customer's shipping location.

#### `Account`

Encapsulates a user's credentials and owns their `ShoppingCart`.

#### `CartItem`

A data class that links a `Product` to a specific quantity within a shopping cart.

#### `ShoppingCart`

A container for a collection of `CartItem`s, responsible for managing items and calculating the total price.

#### `OrderLineItem`

An immutable snapshot of a product's details (ID, name, price, quantity) at the moment an order is placed. This prevents issues if product prices or names change later.

### **Core Classes**

#### `Customer`

Represents a user of the shopping system.

It acts as a concrete **Observer**, receiving status updates for its orders. It holds an `Account` and personal details.

#### `Product`** (Abstract Class)**

The base class for all items sold on the platform.

Its construction is simplified by a nested `Builder`.

#### `Order`

The central class representing a customer's purchase.

It acts as the **Context** for the State pattern (delegating actions to its `currentState` object) and as the **Subject** for the Observer pattern (notifying the `Customer` of status changes).

#### `InventoryService`**, **`OrderService`**, **`PaymentService`**, **`SearchService`

Service-layer classes that encapsulate specific business logic, such as managing stock, creating orders, processing payments, and searching the product catalog.

#### `OnlineShoppingSystem`** (Singleton & Facade)**

The primary entry point for the application.

It orchestrates all the services and manages the main data stores (products, customers, orders). It provides a simplified interface to the client, hiding the complex interactions between the various components.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- A `Customer` "has-an" `Account`. The `Account`'s lifecycle is managed by the `Customer`.
- An `Account` "has-a" `ShoppingCart`.
- A `ShoppingCart` "has-a" collection of `CartItem`s.
- An `Order` "has-a" list of `OrderLineItem`s.
- `OnlineShoppingSystem` "has-a" set of core services and manages the collections of all `Product`s and `Customer`s.

### **Association**

- An `Order` is associated with one `Customer`.
- A `CartItem` is associated with a `Product`.
- `PaymentService` is associated with a `PaymentStrategy` to process a payment.
- An `Order` (Subject) is associated with its `OrderObserver`s (the `Customer`).
- An `Order` (Context) is associated with a single, current `OrderState`.

### **Inheritance**

- `ProductDecorator` extends `Product`. `GiftWrapDecorator` extends `ProductDecorator`.
- `Order` extends the abstract `Subject` class.
- `Customer` implements the `OrderObserver` interface.
- Concrete `OrderState` classes implement the `OrderState` interface.
- Concrete `PaymentStrategy` classes implement the `PaymentStrategy` interface.

### **Dependency**

- `OnlineShoppingSystem` (Facade) depends on its various service classes to execute commands.
- `OrderService` depends on `InventoryService` to validate and update stock.
- A client depends on `Product.Builder` to construct new `Product` objects.
- An `Order` depends on `OrderObserver` to send notifications.

## 3.3 Key Design Patterns

### [**Strategy Pattern**](/learn/lld/strategy)

The `PaymentStrategy` allows the algorithm for processing payments to be encapsulated and made interchangeable. The system can easily support new payment methods (e.g., PayPal, NetBanking) by creating new strategy classes without altering the `PaymentService`.

### [**State Pattern**](/learn/lld/state)

The lifecycle of an `Order` is managed using the State pattern. The `Order` (Context) delegates its behavior to different `OrderState` objects (`PlacedState`, `ShippedState`). This cleanly separates state-specific logic and makes managing transitions robust and easy to understand.

### [**Observer Pattern**](/learn/lld/observer)

This pattern is fundamental for providing real-time updates. The `Order` (Subject) notifies the `Customer` (Observer) whenever its status changes. This decouples the core order processing logic from the notification mechanism.

### [**Decorator Pattern**](/learn/lld/decorator)

The `GiftWrapDecorator` adds new functionality (extra cost and a modified description) to a `Product` object dynamically at runtime. This allows for flexible feature extension without creating a large number of subclasses.

### [**Builder Pattern**](/learn/lld/builder)

The `Product.Builder` class is used for the step-by-step construction of a `Product` object. This is ideal for objects with many optional parameters (like `description` and `category`), providing a fluent API while ensuring the object is created in a valid state.

### [**Facade Pattern**](/learn/lld/facade)

The `OnlineShoppingSystem` class acts as a facade. It provides a simple, high-level API (`addProduct`, `placeOrder`, `addToCart`) that hides the complex internal workflows involving multiple services, data models, and state management.

### [**Singleton Pattern**](/learn/lld/singleton)

`OnlineShoppingSystem` is implemented as a singleton to ensure a single, globally accessible point of control for the entire application. This centralizes the management of services and data stores.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Enums

Defines standard constants for order lifecycle and product classification to ensure consistent use across the system.

```java
enum OrderStatus {
    PENDING_PAYMENT,
    PLACED,
    SHIPPED,
    DELIVERED,
    CANCELLED,
    RETURNED
}

enum ProductCategory {
    ELECTRONICS,
    BOOKS,
    CLOTHING,
    HOME_GOODS,
    GROCERY
}
```

### 4.2 Address

Represents a customer’s delivery location.

```java
class Address {
    private final String street;
    private final String city;
    private final String state;
    private final String zipCode;

    public Address(String street, String city, String state, String zipCode) {
        this.street = street;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
    }

    @Override
    public String toString() {
        return String.format("%s, %s, %s %s", street, city, state, zipCode);
    }
}
```

### 4.3 Customer (Observer)

```java
$ed
```

Each `Customer` has a personal cart and is notified about order status changes using the **Observer Pattern**.

### 4.4 Product

```java
$f0
```

Uses the **Builder Pattern** to simplify product creation.

### Decorator

```java
$f6
```

### CartItem

`CartItem` holds a product and quantity.

```java
class CartItem {
    private final Product product;
    private int quantity;

    public CartItem(Product product, int quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    public Product getProduct() { return product; }
    public int getQuantity() { return quantity; }
    public void incrementQuantity(int amount) { this.quantity += amount; }
    public double getPrice() { return product.getPrice() * quantity; }
}
```

### ShoppingCart

`ShoppingCart` aggregates items and provides cart operations.

```java
class ShoppingCart {
    private final Map<String, CartItem> items = new HashMap<>();

    public void addItem(Product product, int quantity) {
        if (items.containsKey(product.getId())) {
            items.get(product.getId()).incrementQuantity(quantity);
        } else {
            items.put(product.getId(), new CartItem(product, quantity));
        }
    }

    public void removeItem(String productId) {
        items.remove(productId);
    }

    public Map<String, CartItem> getItems() { return Map.copyOf(items); }

    public double calculateTotal() {
        return items.values().stream().mapToDouble(CartItem::getPrice).sum();
    }

    public void clearCart() {
        items.clear();
    }
}
```

### Account

Encapsulates a user’s credentials and their shopping cart.

```java
class Account {
    private final String username;
    private final String password; // Hashed password in real system
    private final ShoppingCart cart;

    public Account(String username, String password) {
        this.username = username;
        this.password = password;
        this.cart = new ShoppingCart();
    }
    public ShoppingCart getCart() { return cart; }
}
```

### OrderLineItem

Represents immutable snapshots of a product at time of purchase.

```java
class OrderLineItem {
    private final String productId;
    private final String productName;
    private final int quantity;
    private final double priceAtPurchase;

    public OrderLineItem(String productId, String productName, int quantity, double priceAtPurchase) {
        this.productId = productId;
        this.productName = productName;
        this.quantity = quantity;
        this.priceAtPurchase = priceAtPurchase;
    }
    
    public String getProductId() { return productId; }
    public int getQuantity() { return quantity; }
}
```

### Order

```java
$f9
```

### Exceptions

```java
class OutOfStockException extends RuntimeException {
    public OutOfStockException(String message) {
        super(message);
    }
}
```

### Observer

```java
interface OrderObserver {
    void update(Order order);
}

abstract class Subject {
    private final List<OrderObserver> observers = new ArrayList<>();

    public void addObserver(OrderObserver observer) { observers.add(observer); }
    public void removeObserver(OrderObserver observer) { observers.remove(observer); }
    public void notifyObservers(Order order) {
        for (OrderObserver observer : observers) {
            observer.update(order);
        }
    }
}
```

### OrderState

Encapsulates state-specific behavior and transitions for orders using the **State Pattern**.

```java
$ff
```

### PaymentStrategy

Defines a flexible way to support multiple payment options using the **Strategy Pattern**.

```java
interface PaymentStrategy {
    boolean pay(double amount);
}

class UPIPaymentStrategy implements PaymentStrategy{
    private final String upiId;

    public UPIPaymentStrategy(String upiId) { this.upiId = upiId; }

    @Override
    public boolean pay(double amount) {
        System.out.printf("Processing UPI payment of $%.2f with upi id %s.%n", amount, upiId);
        // Simulate payment gateway logic
        return true;
    }
}

class CreditCardPaymentStrategy implements PaymentStrategy {
    private final String cardNumber;

    public CreditCardPaymentStrategy(String cardNumber) { this.cardNumber = cardNumber; }

    @Override
    public boolean pay(double amount) {
        System.out.printf("Processing credit card payment of $%.2f with card %s.%n", amount, cardNumber);
        // Simulate payment gateway logic
        return true;
    }
}
```

### InventoryService

Manages stock validation and deduction with thread safety.

```java
class InventoryService {
    private final Map<String, Integer> stock; // productId -> quantity

    public InventoryService() {
        this.stock = new ConcurrentHashMap<>();
    }

    public void addStock(Product product, int quantity) {
        stock.put(product.getId(), stock.getOrDefault(product.getId(), 0) + quantity);
    }

    public synchronized void updateStockForOrder(List<OrderLineItem> items) {
        // First, check if all items are in stock
        for (OrderLineItem item : items) {
            if (stock.getOrDefault(item.getProductId(), 0) < item.getQuantity()) {
                throw new OutOfStockException("Not enough stock for product ID: " + item.getProductId());
            }
        }
        // If all checks pass, deduct the stock
        for (OrderLineItem item : items) {
            stock.compute(item.getProductId(), (id, currentStock) -> currentStock - item.getQuantity());
        }
    }
}
```

### OrderService

Coordinates inventory checks and order creation. Throws `OutOfStockException` if stock is insufficient.

```java
class OrderService {
    private final InventoryService inventoryService;

    public OrderService(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    public Order createOrder(Customer customer, ShoppingCart cart) {
        List<OrderLineItem> orderItems = cart.getItems().values().stream()
                .map(cartItem -> new OrderLineItem(
                        cartItem.getProduct().getId(),
                        cartItem.getProduct().getName(),
                        cartItem.getQuantity(),
                        cartItem.getProduct().getPrice()))
                .collect(Collectors.toList());

        // This is a critical section
        inventoryService.updateStockForOrder(orderItems);

        return new Order(customer, orderItems, customer.getShippingAddress(), cart.calculateTotal());
    }
}
```

### PaymentService

Delegates payment processing to the selected strategy implementation.

```java
class PaymentService {
    public boolean processPayment(PaymentStrategy strategy, double amount) {
        return strategy.pay(amount);
    }
}
```

### SearchService

Provides name- and category-based product search functionality.

```java
class SearchService {
    private final Collection<Product> productCatalog;

    public SearchService(Collection<Product> productCatalog) { this.productCatalog = productCatalog; }

    public List<Product> searchByName(String name) {
        return productCatalog.stream()
                .filter(p -> p.getName().toLowerCase().contains(name.toLowerCase()))
                .collect(Collectors.toList());
    }

    public List<Product> searchByCategory(ProductCategory category) {
        return productCatalog.stream()
                .filter(p -> p.getCategory() == category)
                .collect(Collectors.toList());
    }
}
```

### OnlineShoppingSystem

```java
$107
```

### OnlineShoppingDemo

```java
$10d
```

---

# 5. Run and Test

---

# 6. Quiz
