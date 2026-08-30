---
id: "lld-design-principles-law-of-demeter"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Principles"
subSection: ""
title: "Law of Demeter"
slug: "lld-design-principles-law-of-demeter"
summary: "Have you ever called a method on an object… then chained another… and another… until the line looked like a trail of dots\""
eli10: "Imagine Law of Demeter as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Law of Demeter Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Design Principles","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Law of Demeter"
  code: |
    Money price = customer.getShoppingCart().getItems().get(0).getProduct().getPrice();
---

Have you ever called a method on an object… then chained another… and another… until the line looked like a trail of dots"

Or made a small internal change to one class, and suddenly had to update code across five other layers"

If yes, you’ve probably run into a violation of one of the most overlooked design principles in software engineering: **The Law of Demeter (LoD)**.

Let’s understand it with a real-world example and see why this principle matters more than you might think.

---

# 1. The Problem

Imagine you're building a simple e-commerce system.

You have:

- A `Customer` who owns a `ShoppingCart`
- The cart contains a list of `CartItems`
- Each `CartItem` refers to a `Product`
- And every `Product` has a `Price`

Now let’s say you want to display the price of the **first product** in a customer’s shopping cart.

```mermaid
flowchart LR
    OS[OrderService]:::red --> CU[Customer]:::red
    CU --> SC[ShoppingCart]:::red
    SC --> LI["List of CartItem"]:::red
    LI --> CI[CartItem]:::red
    CI --> PR[Product]:::red
    PR --> MO[Price]:::red

    classDef red fill:#ff8787,stroke:#000,color:#000
```

A common (but flawed) approach would be to write something like this:

```java
Money price = customer.getShoppingCart().getItems().get(0).getProduct().getPrice();
```

Look at that chain. `OrderService` is coupled to **six** classes deep. It knows about the customer's cart, the cart's internal list, the structure of a cart item, the product inside it, and the price object. A change to any of these classes could break the `OrderService`, even though those classes have nothing to do with order processing.

This is called a **"train wreck"** or **"dot-chaining"**: one object reaching through several others to get what it wants. You start with a `Customer`, go into their `ShoppingCart`, peek into its internal list of `CartItems`, grab the first one, extract the `Product`, and finally get the `Price`.

Here is the full function that uses this pattern:

```java
void displayFirstItemPrice(Customer customer) {
    Money price = customer.getShoppingCart()
                          .getItems()
                          .get(0)
                          .getProduct()
                          .getPrice();
    System.out.println("Price of the first item: " + price.getAmount());
}
```

This approach works. It compiles. It runs. But it **smells bad**, and it will cause real pain as your system evolves.

---

# 2. What’s Wrong With This"

#### 1. High Coupling

The `OrderService` method is now tightly coupled to the **entire internal structure** of the customer and their cart.

- If `ShoppingCart` changes how it stores items (e.g., using a `Map` instead of a `List`)
- If `CartItem` renames its `getProduct()` method
- Or if `Product` evolves to store pricing in a new way…

**Boom.** Your `OrderService` code breaks. Even though it had nothing to do with those decisions.

#### 2. Encapsulation Violation

You are reaching deep into object internals, violating encapsulation at multiple levels.

- `Customer` exposes its `ShoppingCart`
- `ShoppingCart` exposes its internal list
- You assume the structure of that list
- And even dig through `CartItem` and `Product` just to get a price

Every layer of reach is a layer of exposed internals. The whole point of encapsulation is to hide these details, and this code tears down every wall.

#### 3. Maintenance Nightmare

Imagine this change: You switch from using a `Money` wrapper to a `BigDecimal` for price representation in `Product`.

Now, every part of your codebase that dot-chased its way to `product.getPrice()` must be updated.

#### 4. Testability Issues

Testing `displayFirstItemPrice()` becomes a *mocking marathon*.

To test it in isolation, you'd need to mock:

- A `Customer`
- That returns a `ShoppingCart`
- That returns a `List`
- That returns a `CartItem`
- That returns a `Product`
- That returns a `Price`

One function. Six mocks. That is exhausting, fragile, and a clear sign something is wrong with the design.

---

# 3. Enter: The Law of Demeter (LoD)

> **“Only talk to your immediate friends.”**
>
>  — Law of Demeter

The Law of Demeter, also known as the **Principle of Least Knowledge**, was formulated in 1987 at Northeastern University during work on the Demeter project. Despite its age, it remains one of the most practical guidelines for writing maintainable object-oriented code.

The rule is straightforward. A method `M` on an object `O` should only call methods on:

1. **Itself** (the object `O`)
2. **Its own fields** (objects that `O` holds as instance variables)
3. **Its method parameters** (objects passed into `M`)
4. **Objects it creates** (objects instantiated within `M`)

That's it. In plain terms: **don't reach through one object to get to another.**

If you call `a.getB().getC().doSomething()`, you are violating LoD because you are reaching through `B` to talk to `C`. You should only be talking to `A`, and let `A` figure out how to get the job done.

---

# 4. Refactoring with LoD in Mind

Let's rewrite the e-commerce example in a cleaner, more respectful way. The strategy is to **push the responsibility down** to the classes that own the data. Each class will expose a meaningful method instead of exposing its internals.

#### Step 1: Add a method to `ShoppingCart`

The `ShoppingCart` knows about its items. So it should be the one to answer questions about them.

```java
class ShoppingCart {
    private List<CartItem> items;

    // ... constructor, other methods ...

    public Money getFirstItemPrice() {
        if (items.isEmpty()) return Money.ZERO;
        return items.get(0).getProduct().getPrice();
    }
}
```

Notice that `ShoppingCart` still reaches into `CartItem` and `Product`. That is fine here because `ShoppingCart` owns the items. The chain stays within the cart's own responsibility boundary. The important thing is that **external callers** no longer need to know about these internals.

#### Step 2: Add a method to `Customer`

The `Customer` owns the `ShoppingCart`, so it should be the one to delegate cart-related queries.

```java
class Customer {
    private ShoppingCart shoppingCart;

    // ... constructor, other methods ...

    public Money getFirstCartItemPrice() {
        return shoppingCart.getFirstItemPrice();
    }
}
```

#### Step 3: Update the `OrderService`

Now the `OrderService` only talks to its direct friend: the `Customer`.

```java
void displayFirstItemPrice(Customer customer) {
    Money price = customer.getFirstCartItemPrice();
    System.out.println("Price of the first item: " + price.getAmount());
}
```

Much better. Now the dependency chain looks completely different:

```mermaid
flowchart LR
    OS[OrderService]:::green --> CU[Customer]:::green
    CU --> SC[ShoppingCart]:::green
    SC --> CI[CartItem]:::green

    classDef green fill:#69db7c,stroke:#000,color:#000
```

`OrderService` only talks to `Customer`. `Customer` only talks to `ShoppingCart`. Each layer hides the next one. Now `OrderService` does not care about:

- How the cart stores items
- What a `CartItem` contains
- How the `Product` holds its price

It just asks the `Customer` for what it needs, and the `Customer` delegates to the objects it owns. This is the Law of Demeter at work.

---

# 5. Benefits of Law of Demeter

#### **Low Coupling**

Each class depends only on its immediate collaborators. Code changes in one place don't ripple across your codebase. When `ShoppingCart` changes its internal storage from a `List` to a `Map`, only `ShoppingCart` needs updating.

#### **Better Encapsulation**

Each class handles its own logic. No external code peeks into internals. Objects expose meaningful behaviors ("give me the first item price") instead of raw structure ("give me your list so I can dig through it").

#### **Easier Refactoring**

You can evolve internal implementations without affecting consumers. If `Product` changes how it stores pricing, only `CartItem` and `ShoppingCart` need to adapt. The `OrderService` remains untouched.

#### **Improved Testability**

Fewer mocks are needed. To test the refactored `displayFirstItemPrice`, you only need to mock `Customer` and have it return a `Money` value. No more six-layer mock chains.

#### **Cleaner APIs**

Public methods become expressive, intentional, and meaningful. Instead of forcing callers to navigate your object graph, you provide clear entry points that describe what the caller actually wants.

---

# 6. Common Questions About LoD

#### Isn't this just more code" I have to write all these wrapper methods!

Yes, following LoD can result in additional small, delegating methods. But this “extra” code serves a critical purpose: **it reduces coupling**.

Think of it this way: would you rather write 3 lines now to isolate behavior, or refactor 300 later when your system breaks"

These small wrappers protect the rest of your codebase from internal changes. They enforce the principle of **“Tell, Don’t Ask”, **you tell an object what you want it to do, instead of reaching inside and doing it yourself.

#### Does the Law of Demeter mean I can’t use getters at all"

Not at all. LoD doesn’t forbid getters.

Simple property access like `customer.getName()` is perfectly fine—`name` is a direct part of `Customer`.

The issue arises with **chained getters** across object boundaries:

```java
customer.getCart().getItems().get(0).getProduct().getPrice();
```

This creates tight coupling between the caller and the internal structure of several unrelated classes. Instead, you’re encouraged to **delegate** the operation to the object that owns the knowledge.

#### What about data structures" Can I call `size()` on a list I get from an object"

This is a nuanced area.

If `getUsers()` returns a standard collection like `List<User>`, then `getUsers().size()` is generally **acceptable**. Lists are transparent and well-understood abstractions, and operations like `size()` don’t break encapsulation.

However, this would be a violation:

```java
getUsers().get(0).getAddress().getStreet();
```

The more layers of domain objects you traverse, the more you're violating LoD. The key is whether you're interacting with a **simple data structure** or delving into **another object’s responsibility chain**.

#### When is it okay to “violate” the Law of Demeter"

Like most principles, LoD is a guideline—not a hard rule. Some common exceptions include:

- **DTOs / Value Objects**: It’s acceptable to traverse simple data carriers where behavior isn't expected.
- **Stable, Low-Level Libraries**: Using well-known APIs (like `Map.get()` or `List.size()`) is typically safe.
- **Fluent APIs / Builders**: Method chaining in fluent interfaces is usually an intentional design, not a violation.

The key is **intentional design**. If you understand the coupling trade-off and still find it justifiable, go for it. Just don’t do it by accident.

In short: **LoD is like a guardrail**. It helps you avoid the slippery slope of exposing internals and tying your code together too tightly.

---

# 7. Practical Example: Ride Notification

Let's look at another scenario to reinforce the pattern. This time, we are building a notification system for a ride-sharing app like Uber or Lyft.

### The Problem

A `NotificationService` class needs three pieces of information to send a ride update to a passenger:

- The driver's name (from the driver's profile)
- The car's license plate (from the driver's vehicle registration)
- The passenger's phone number (from their contact info)

A developer in a hurry writes the following:

```java
class NotificationService {
    public void sendRideUpdate(Ride ride) {
        // Train wreck 1: reaching through Driver -> Profile to get name
        String driverName = ride.getDriver()
                                .getProfile()
                                .getFullName();

        // Train wreck 2: reaching through Driver -> Vehicle -> Registration
        String plate = ride.getDriver()
                           .getVehicle()
                           .getRegistration()
                           .getLicensePlate();

        // Train wreck 3: reaching through Passenger -> ContactInfo
        String phone = ride.getPassenger()
                           .getContactInfo()
                           .getPhoneNumber();

        String message = String.format(
            "Your driver %s is arriving in a %s. Contact: %s",
            driverName, plate, phone);
        System.out.println("SMS to " + phone + ": " + message);
    }
}
```

Look at what the `NotificationService` now knows about. It is coupled to `Driver`, `Profile`, `Vehicle`, `Registration`, `Passenger`, `ContactInfo`, and their internal structures.

```mermaid
flowchart TD
    NS[NotificationService]:::red --> R[Ride]:::red
    R --> D[Driver]:::red
    D --> P[Profile]:::red
    D --> V[Vehicle]:::red
    V --> REG[Registration]:::red
    R --> PA[Passenger]:::red
    PA --> CI[ContactInfo]:::red

    classDef red fill:#ff8787,stroke:#000,color:#000
```

If `Vehicle` restructures how it stores registration data, the notification service breaks. If `Passenger` changes from `ContactInfo` to a different contact model, the notification service breaks. Every internal change in any of these classes becomes a potential breaking change for `NotificationService`.

### The Fix: Delegation Methods

Instead of letting `NotificationService` navigate the entire object graph, we add delegation methods to `Ride`. The `Ride` class already has references to its driver and passenger, so it is the natural place to answer these questions.

```java
class Ride {
    private Driver driver;
    private Passenger passenger;

    // ... constructor, other methods ...

    public String getDriverName() {
        return driver.getProfile().getFullName();
    }

    public String getVehiclePlate() {
        return driver.getVehicle().getRegistration().getLicensePlate();
    }

    public String getPassengerPhone() {
        return passenger.getContactInfo().getPhoneNumber();
    }
}
```

Now the `NotificationService` becomes simple and clean:

```java
class NotificationService {
    public void sendRideUpdate(Ride ride) {
        String driverName = ride.getDriverName();
        String plate = ride.getVehiclePlate();
        String phone = ride.getPassengerPhone();

        String message = String.format(
            "Your driver %s is arriving in a %s. Contact: %s",
            driverName, plate, phone);
        System.out.println("SMS to " + phone + ": " + message);
    }
}
```

The dependency picture is now dramatically simpler:

```mermaid
flowchart LR
    NS[NotificationService]:::green --> R[Ride]:::green

    classDef green fill:#69db7c,stroke:#000,color:#000
```

`NotificationService` only knows about `Ride`. It has no idea that `Driver`, `Profile`, `Vehicle`, `Registration`, `Passenger`, or `ContactInfo` even exist.

#### Why This Design Works

- **Single point of change.** If `Vehicle` restructures how it stores registration data, you update `Ride.getVehiclePlate()` and nothing else.
- **Easy to test.** To test `NotificationService`, you only mock `Ride` with three simple return values.
- **Self-documenting.** Method names like `getDriverName()` and `getPassengerPhone()` clearly describe what data is being retrieved without exposing how it is obtained.
- **Contained ripple effects.** Internal restructuring of `Driver`, `Vehicle`, or `Passenger` stays contained within the classes that own them.
