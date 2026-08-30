---
id: "lld-e-commerce-booking-systems-design-online-food-delivery-service-like-swiggy"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - E commerce Booking Systems"
subSection: ""
title: "Design Online Food Delivery Service like Swiggy"
slug: "lld-e-commerce-booking-systems-design-online-food-delivery-service-like-swiggy"
summary: "In this chapter, we will explore the low-level design of a simplified food delivery service."
eli10: "Imagine Design Online Food Delivery Service like Swiggy as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Online Food Delivery Service like Swiggy Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","E commerce Booking Systems","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Online Food Delivery Service like Swiggy"
  code: |
    enum OrderStatus {
        PENDING,
        CONFIRMED,
        PREPARING,
        READY_FOR_PICKUP,
        OUT_FOR_DELIVERY,
        DELIVERED,
        CANCELLED
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### **What is an Online Food Delivery Service"**
>
> An **Online Food Delivery Service** is a digital platform that connects users with nearby restaurants, allowing them to **browse menus**, **place food orders**, and have meals **delivered to their doorstep** by delivery partners.
>
> 
> <!-- Simulation: food-delivery -->
> 

>
> The platform acts as a bridge between **customers**, **restaurants**, and **delivery agents**, coordinating everything from order placement to payment processing and delivery logistics.

In this chapter, we will explore the **low-level design of a simplified food delivery service**.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions, clarify ambiguities, and define the system's scope more precisely.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the system allow adding new restaurants and updating their menus"
>
> **Interviewer:** Yes, the system should be able to onboard new restaurants and add new menu items.
>
> **Candidate:** Should users be able to search for restaurants by location"
>
> **Interviewer:** Yes, users should be able to search by city, menu keywords, and proximity. A simple string-based or distance-based search is sufficient for now.
>
> **Candidate:** How should delivery assignment work" Should we auto-assign based on availability and proximity"
>
> **Interviewer: **Yes, delivery agents should be auto-assigned based on availability and the combined proximity from agent to restaurant and from restaurant to customer.
>
> **Candidate:** Do we need to support order cancellation" If yes, under what conditions"
>
> **Interviewer:** Yes, users can cancel orders, but only if the order status is still "PENDING." Once the restaurant has started preparing, cancellations should not be allowed.
>
> **Candidate:** Should the system notify customers, restaurants, or delivery agents when the order status changes"
>
> **Interviewer: **Yes, all relevant parties should be notified whenever the order status is updated.
>
> **Candidate:** Do we need to support payments as part of this design"
>
> **Interviewer:** You can skip payments for this design. Assume payment is handled automatically when the order is placed.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Support registration of new **users**, **delivery agents** and **restaurants**.
- Support adding **restaurants** and **menu items**.
- Allow customers to **search for restaurants** based on city, menu or location.
- Allow customers to **place orders** containing multiple items from a selected restaurant.
- Notify restaurants of **new incoming orders** and allow them to update the order status.
- **Auto-assign delivery agents** based on availability and proximity
- **Notify** relevant parties when the order status changes.
- Maintain **order history** for customers.

## 1.2 Non-Functional Requirements

- **Modularity:** The system should be designed with clear separation of components.
- **Extensibility:** The design should be flexible enough to support future features.
- **Maintainability:** Code should follow object-oriented principles and be easy to test, debug, and evolve.

After the requirements are clear, lets identify the **core entities** and their responsibilities within the system.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., restaurant, user, order, item, delivery agent) and **actions** (e.g., browse, order, track, update, assign) from the functional requirements. These typically translate directly into **classes**, **enums**, or **interfaces** in an object-oriented design.

Below, we break down the functional requirements and extract the relevant entities. Related requirements are grouped together when they represent the same conceptual unit.

#### 1. Support onboarding and management of restaurants and menu items.

This introduces two key entities:

- `Restaurant`: Represents a food provider on the platform. Stores metadata such as name, address, cuisine type, and a reference to its menu.
- `MenuItem`: Represents an individual dish offered by a restaurant. Includes attributes like name, description, price, and availability.
- `Menu`: Represents a collection of `MenuItem` objects for a given restaurant.
- `Address`: Represents the location of the restaurant, stored in a standardized format for filtering, searching, and delivery logistics.

Restaurants will have a one-to-many relationship with menu items, and each restaurant is associated with a unique menu.

#### **2. Customers should be able to place orders and view their order history.**

This introduces:

- `Customer`: Represents a platform user who can browse restaurants, place orders, and track their order history.
- `Order`: Represents a food order placed by a customer. It includes details such as selected restaurant, delivery address, list of items, and order status.
- `OrderItem`: Represents a line item within an order. It references a `MenuItem` along with quantity and subtotal.

#### **3. The system must support automatic delivery agent assignment.**

This introduces:

- `DeliveryAgent`: A specialized user who fulfills delivery tasks. Each agent has attributes such as name, availability, current location, and assigned orders.

Assignment of delivery agents can be coordinated based on availability and proximity using a centralized service.

#### **4. Notify relevant parties when the order status changes.**

This requires:

- `OrderStatus` *(enum)*: Represents the lifecycle state of an order. Possible values include `PENDING`, `ACCEPTED`, `PREPARING`, `OUT_FOR_DELIVERY`, `DELIVERED`, and `CANCELLED`.

Notifications can be sent when the order status transitions, informing the customer, restaurant, and delivery agent.

#### **5. Central orchestration of ordering, assignment, and tracking.**

This suggests the need for a core orchestrator:

- `FoodDeliveryService`: A high-level service responsible for coordinating the main workflows—placing orders, assigning delivery agents, updating order status, and notifying users.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Final List of Core Entities
>
> - `User`: Base class representing any system user. Extended by specific roles like customer and delivery agent.
> - `Customer`: A user who browses restaurants and places orders.
> - `DeliveryAgent`: A user who delivers food. Has attributes like availability and current location.
> - `Restaurant`: Represents a restaurant and its metadata (name, location, men).
> - `Menu`: Represents a restaurant’s menu — a list of available items.
> - `MenuItem`: A single dish in a restaurant’s menu, with attributes like name, price, and availability.
> - `Address`: A geographic area or address used for restaurant filtering and delivery coordination.
> - `Order`: Represents a placed order. Contains details about customer, restaurant, order items, status, and timestamps.
> - `OrderItem`: Represents an individual menu item in an order and its quantity.
> - `OrderStatus`** (Enum)**: Enum to represent the lifecycle of an order — PENDING, ACCEPTED, PREPARING, DISPATCHED, etc.
> - `FoodDeliveryService`**:** Core orchestrator that coordinates ordering, assignment, tracking, and status updates.

These core entities define the key abstractions of the Online Food Delivery Service and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

#### `OrderStatus`

Represents the distinct stages in the lifecycle of an order, such as `PENDING`, `PREPARING`, `OUT_FOR_DELIVERY`, and `DELIVERED`. 

This enables clear state management and triggers for notifications.

### **Data Classes**

#### `Address`

A data class holding location information (street, city, coordinates).

It includes a utility method to calculate the distance to another address, which is crucial for proximity-based searches and delivery agent assignment.

#### `MenuItem`

Represents a single food item available at a restaurant, containing its ID, name, price, and availability.

#### `Menu`

Acts as a container for a collection of `MenuItem` objects, representing a restaurant's full menu.

#### `OrderItem`

A linking class that connects a `MenuItem` with a specific quantity for an `Order`.

### **Core Classes**

#### `User`** (Abstract Class)**

A base class for all human actors in the system (`Customer`, `DeliveryAgent`).

Holds common properties like ID, name, and phone number. It also implements `OrderObserver`.

- `Customer`: Represents the end-user placing an order. It holds personal details, address information, and a history of their orders. It acts as a concrete Observer.
- `DeliveryAgent`: Represents the person responsible for delivering the order. It maintains their current location and availability status (`isAvailable`). It also acts as a concrete Observer.

#### `Restaurant`

Represents a food establishment.

It contains its address, a `Menu` of items it offers, and also acts as a concrete Observer to track the status of orders placed with it.

#### `Order`

The central and most critical class in the system.

It encapsulates all details of a single transaction: the `Customer`, `Restaurant`, `OrderItem`s, and assigned `DeliveryAgent`. It acts as the **Subject** in the Observer pattern, maintaining a list of observers and notifying them whenever its `status` changes.

#### `FoodDeliveryService`** (Singleton & Facade)**

The main entry point for all client interactions.

It manages all the core entities (customers, restaurants, agents, orders) and orchestrates the entire workflow from searching and placing an order to assigning a delivery agent. It provides a simple, unified API to the complex underlying system.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- `FoodDeliveryService` has collections of `Customer`, `Restaurant`, `DeliveryAgent`, and `Order`. These entities are managed within and have their lifecycle controlled by the service.
- A `Restaurant` has a `Menu`.
- A `Menu` has a collection of `MenuItem`s.
- An `Order` is composed of a list of `OrderItem`s.

### **Association**

- An `Order` is associated with one `Customer`, one `Restaurant`, and one `DeliveryAgent`.
- `FoodDeliveryService` is associated with a `DeliveryAssignmentStrategy` to decide how to assign agents.
- `FoodDeliveryService` uses one or more `RestaurantSearchStrategy` objects to filter restaurants.
- An `Order` (Subject) is associated with multiple `OrderObserver`s.

### **Inheritance**

- `Customer` and `DeliveryAgent` are specialized types of `User` and inherit from it.
- The concrete strategy classes (`NearestAvailableAgentStrategy`, `SearchByCityStrategy`, etc.) implement their respective strategy interfaces.

### **Dependency**

- The `FoodDeliveryService` depends on the strategy interfaces to perform its core functions of searching and assignment.
- The `Order` class depends on the `OrderObserver` interface to notify participants.
- The client (`FoodDeliveryServiceDemo`) depends on the `FoodDeliveryService` facade to interact with the system.

## 3.3 Key Design Patterns

### **Facade Pattern**

The `FoodDeliveryService` class serves as a facade. It provides a simple, high-level API (`placeOrder`, `searchRestaurants`, `updateOrderStatus`) that hides the complex internal interactions between orders, users, strategies, and notifications.

### **Singleton Pattern**

`FoodDeliveryService` is implemented as a singleton to ensure there is only one instance coordinating the entire system. This provides a single, global point of access and prevents state inconsistencies.

### **Strategy Pattern**

This pattern is used extensively to provide flexibility for core business logic.

#### **Restaurant Searching**

`RestaurantSearchStrategy` allows the system to use different algorithms (by city, proximity, menu keyword) to filter restaurants without changing the `FoodDeliveryService` class. These strategies can even be chained together.

#### **Delivery Assignment**

`DeliveryAssignmentStrategy` allows the logic for assigning delivery agents to be swapped out easily.

### **Observer Pattern**

This pattern is crucial for real-time notifications. The `Order` object is the **Subject**, and the `Customer`, `Restaurant`, and `DeliveryAgent` are **Observers**.

When the order's status changes (e.g., from `PREPARING` to `READY_FOR_PICKUP`), the `Order` automatically notifies all its registered observers, keeping them in sync.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 OrderStatus (Enum)

Defines the stages of an order’s lifecycle, enabling status transitions, validations, and notification triggers.

```java
enum OrderStatus {
    PENDING,
    CONFIRMED,
    PREPARING,
    READY_FOR_PICKUP,
    OUT_FOR_DELIVERY,
    DELIVERED,
    CANCELLED
}
```

### 4.2 Address

Represents the physical location of users, restaurants, and delivery agents.

```java
class Address {
    private String street;
    private String city;
    private String zipCode;
    private double latitude;
    private double longitude;

    public Address(String street, String city, String zipCode, double latitude, double longitude) {
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getCity() {
        return city;
    }

    public double distanceTo(Address other) {
        double latDiff = this.latitude - other.latitude;
        double lonDiff = this.longitude - other.longitude;
        return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
    }

    @Override
    public String toString() {
        return street + ", " + city + ", " + zipCode + " @(" + latitude + ", " + longitude + ")";
    }
}
```

Distance computation is used for proximity-based search and agent assignment.

### 4.3 OrderObserver

Abstract contract for all order participants (Customer, Restaurant, DeliveryAgent) to receive live order updates.

```java
interface OrderObserver {
    void onUpdate(Order order);
}
```

### 4.4 User

```java
abstract class User implements OrderObserver {
    private final String id;
    private String name;
    private String phone;

    public User(String name, String phone) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.phone = phone;
    }

    public String getId() { return id; }
    public String getName() { return name; }
}
```

### 4.5 Customer

```java
class Customer extends User {
    private Address address;
    private final List<Order> orderHistory = new ArrayList<>();

    public Customer(String name, String phone, Address address) {
        super(name, phone);
        this.address = address;
    }

    public void addOrderToHistory(Order order) { this.orderHistory.add(order); }

    public Address getAddress() {
        return address;
    }

    @Override public void onUpdate(Order order) {
        System.out.printf("--- Notification for Customer %s ---\n", getName());
        System.out.printf("  Order %s is now %s.\n", order.getId(), order.getStatus());
        System.out.println("-------------------------------------\n");
    }
}
```

### 4.6 DeliveryAgent

```java
class DeliveryAgent extends User {
    private final AtomicBoolean isAvailable = new AtomicBoolean(true);
    private Address currentLocation;

    public DeliveryAgent(String name, String phone, Address currentLocation) {
        super(name, phone);
        this.currentLocation = currentLocation;
    }

    public void setAvailable(boolean available) {
        this.isAvailable.set(available);
    }

    public synchronized boolean isAvailable() {
        return isAvailable.get();
    }

    public void setCurrentLocation(Address currentLocation) { this.currentLocation = currentLocation; }

    public Address getCurrentLocation() { return currentLocation; }

    @Override public void onUpdate(Order order) {
        System.out.printf("--- Notification for Delivery Agent %s ---\n", getName());
        System.out.printf("  Order %s update: Status is %s.\n", order.getId(), order.getStatus());
        System.out.println("-------------------------------------------\n");
    }
}
```

### 4.7 MenuItem

```java
class MenuItem {
    private final String id;
    private final String name;
    private final double price;
    private boolean available;

    public MenuItem(String id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.available = true;
    }

    public String getId() {
        return id;
    }

    public void setAvailable(boolean available) {
        this.available = available;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public String getMenuItem() {
        return "Name: " + name + ", Price: " + price;
    }
}
```

### 4.8 Menu

```java
class Menu {
    private final Map<String, MenuItem> items = new HashMap<>();

    public void addItem(MenuItem item) {
        items.put(item.getId(), item);
    }

    public MenuItem getItem(String id) { return items.get(id); }

    public Map<String, MenuItem> getItems() { return items; }
}
```

### 4.9 Restaurant

```java
class Restaurant implements OrderObserver {
    private final String id;
    private final String name;
    private final Address address;
    private final Menu menu;

    public Restaurant(String name, Address address) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.address = address;
        this.menu = new Menu();
    }
    public void addToMenu(MenuItem item) { this.menu.addItem(item); }

    public String getId() { return id; }
    public String getName() { return name; }
    public Address getAddress() { return address; }
    public Menu getMenu() { return menu; }

    @Override public void onUpdate(Order order) {
        System.out.printf("--- Notification for Restaurant %s ---\n", getName());
        System.out.printf("  Order %s has been updated to %s.\n", order.getId(), order.getStatus());
        System.out.println("---------------------------------------\n");
    }
}
```

### 4.9 OrderItem

```java
class OrderItem {
    private final MenuItem item;
    private final int quantity;

    public OrderItem(MenuItem item, int quantity) {
        this.item = item;
        this.quantity = quantity;
    }

    public MenuItem getItem() { return item; }
    public int getQuantity() { return quantity; }
}
```

### 4.10 Order

```java
$e0
```

### 4.11 DeliveryAssignmentStrategy

```java
$e6
```

### 4.12 RestaurantSearchStrategy

The system's core business logic—how to search for restaurants and how to assign a delivery agent—can have many variations. The Strategy pattern makes these algorithms interchangeable.

```java
$eb
```

- Each strategy class encapsulates a specific algorithm. For example, SearchByProximityStrategy contains the logic for filtering and sorting restaurants by distance.

### 4.13 FoodDeliveryService

This class is a **Singleton** that provides a simplified, high-level API to the entire complex subsystem.

```java
$f1
```

- **Facade Pattern:** The facade provides simple methods like placeOrder and searchRestaurants, hiding the complex interactions between orders, observers, and strategies.

### 4.14 FoodDeliveryServiceDemo

The demo class validates the end-to-end functionality by simulating a customer's journey from searching to receiving an order.

```java
$f7
```

---

# 5. Run and Test

---

# 6. Quiz
