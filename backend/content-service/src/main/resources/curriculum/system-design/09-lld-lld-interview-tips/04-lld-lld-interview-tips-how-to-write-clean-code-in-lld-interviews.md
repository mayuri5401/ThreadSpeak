---
id: "lld-lld-interview-tips-how-to-write-clean-code-in-lld-interviews"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - LLD Interview Tips"
subSection: ""
title: "How to Write Clean Code in LLD Interviews"
slug: "lld-lld-interview-tips-how-to-write-clean-code-in-lld-interviews"
summary: "In LLD interviews, writing code that works is only half the battle. What truly sets strong candidates apart is their ability to write clean, structured, and maintainable code that reflects real-world engineering practices."
eli10: "Imagine How to Write Clean Code in LLD Interviews as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "How to Write Clean Code in LLD Interviews Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","LLD Interview Tips","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for How to Write Clean Code in LLD Interviews"
  code: |
    class PM { }       // Payment Manager? Product Model?
    class Handler { }  // Handles what?
    class Data { }     // What kind of data?
---

In LLD interviews, writing code that works is only half the battle. What truly sets strong candidates apart is their ability to write **clean, structured, and maintainable code** that reflects real-world engineering practices.

You are not just evaluated on whether your solution solves the problem. You are also judged on how you organize classes, define responsibilities, manage dependencies, name things, handle edge cases, and communicate your design through code.

Clean code makes your design easier to understand, extend, test, and discuss. In this chapter, you will learn the principles, practices, and mindset needed to write clean code in LLD interviews.

---

# 1. Your Code is a Conversation

> [!PAYWALL] This content is for premium members only.

Before you touch a single line of code, adopt this mindset: **your primary audience is the interviewer, not the compiler.** The compiler only cares about syntax. The interviewer cares about what your code communicates:

- **Clarity:** Can I understand your thought process just by reading the code"
- **Intent:** Does the code clearly express what it is trying to do and why"
- **Maintainability:** If I were your teammate, how easy would it be to modify, extend, or debug this"
- **Design maturity:** Does the structure reflect solid design principles and good abstractions"

Every variable name, method, and class is a sentence in that conversation. Make it clear, concise, and professional.

---

# 2. The First Impression: Naming Matters

In a time-pressured interview, it’s tempting to use short names: `u` for user, `p` for payment, `calc` for some calculation. Don’t.

Short names might save you a few seconds, but they cost the interviewer minutes of mental effort. That’s a terrible trade in an interview where clarity is the goal.

**Principle:** Names should be explicit, unambiguous, and intention-revealing. Avoid single-letter variables (except for loop counters), abbreviations, and generic terms.

### a) Classes: Domain Nouns

Classes represent things in your domain, so name them with domain nouns: `ParkingSpot`, `MeetingRoom`, `Reservation`. Avoid generic suffixes like `Manager`, `Handler`, `Helper`, or `Processor` unless the class genuinely manages a lifecycle or processes a pipeline.

Your class names should answer: "What does this represent""

#### Bad:

```java
class PM { }       // Payment Manager" Product Model"
class Handler { }  // Handles what"
class Data { }     // What kind of data"
```

#### Good:

```java
class PaymentProcessor { }
class OrderValidator { }
class ParkingSpot { }
```

### b) Methods: Verb-Noun Pairs

Method names should answer: "What action does this perform""

Use verb-noun pairs: `findAvailableSpot`, `calculateFee`, `assignRoom`. For boolean methods, use `is`, `has`, or `can` prefixes: `isAvailable()`, `hasConflict()`, `canAccommodate()`.

Avoid vague verbs like `process`, `handle`, `manage`, or `doWork`. These tell the reader nothing about what actually happens. 

#### **Bad:**

```java
void process();     // Process what" How"
void handle();      // Too vague
void doStuff();     // Please no
boolean check();    // Check what"
```

#### Good:

```java
void processPayment();
void validateOrder();
boolean isSpotAvailable();
Payment chargeCustomer(Order order);
```

### c) Variables: Say What It Holds

A variable name should tell you exactly what it holds without needing to trace its origin.

Generic names like `list`, `map`, `data`, or `items` force the reader to trace back to the declaration to understand what they contain. Descriptive names make the code self-documenting.

#### Bad:

```java
int d;              // Days" Distance" Duration"
String s;           // String of what"
List<User> list;    // What kind of list"
boolean flag;       // Flag for what"
```

#### Good:

```java
int daysUntilExpiry;
String customerEmail;
List<User> activeUsers;
boolean isEligibleForDiscount;
```

### The Pronounceability Test

If you can't say a name out loud without sounding ridiculous, change it.

```java
// Bad: Try saying this in the interview
DtaRcrd102 genymdhms;

// Good: You can actually discuss this
DataRecord record;
DateTime generatedTimestamp;
```

When you explain your code verbally, you'll say things like "the parking spot checks if it's available." If your code says `ps.chkAvl()`, there's a disconnect that makes your explanation harder to follow.

Here's what these naming principles look like applied to a real class. The bad version compiles and runs, but the good version communicates.

```java
// Bad: Generic names, unclear intent
class Spot {
    int num;
    String sz;
    Object v;
    boolean flag;

    boolean check() { return flag; }
    void doAction(Object o) { /* ... */ }
}

// Good: Self-documenting names
class ParkingSpot {
    private int spotNumber;
    private SpotSize size;
    private Vehicle parkedVehicle;
    private boolean isOccupied;

    public boolean isAvailable() { return !isOccupied; }
    public void parkVehicle(Vehicle vehicle) { /* ... */ }
}
```

---

# 3. Structuring Classes with Intention

In LLD interviews, you'll create multiple classes. How you structure them reveals your design thinking.

Individual names and methods matter, but the structure of the class as a whole communicates how you think about organization. A well-structured class has a predictable layout, clear boundaries, and a focused responsibility.

### Private Fields by Default

Every field should be private unless there's a specific reason to expose it. Public fields break encapsulation and let any class reach in and modify internal state. Use getter methods when external access is genuinely needed, and skip getters for fields that are only used internally.

### Constructor Clarity

A constructor with five or more parameters is a red flag. It usually means the class is doing too much, or that a subset of those parameters should be grouped into a separate object.

For example, a `Meeting` constructor that takes `title`, `startTime`, `endTime`, `organizer`, `room`, `priority`, and `recurrencePattern` could be simplified.

Group `startTime` and `endTime` into a `TimeSlot` object. If `recurrencePattern` is optional, use a builder or a factory method instead of overloading constructors.

The real win isn't just aesthetics. A `TimeSlot` object can carry its own validation (`endTime` must be after `startTime`) and its own behavior (`overlaps(TimeSlot other)`). That logic would otherwise end up scattered across the `Meeting` class, the `Room` class, and anywhere else that deals with time ranges.

### Internal Ordering

Consistent internal ordering makes classes easier to scan. A widely followed convention:

1. Constants
2. Private fields
3. Constructor(s)
4. Public methods
5. Private helper methods

This isn't a hard rule, but following it means the reader always knows where to look. Constants and fields at the top tell them what the class holds. Public methods in the middle tell them what it does. Private helpers at the bottom tell them how.

### Avoid the God Class

If a class exceeds 150 lines, it's probably doing too much. The most common God class in interview submissions is the main system class like a `ParkingLot` that handles spot allocation, fee calculation, ticket management, floor searching, and display logic all in one place.

This same problem shows up in other domains too. Consider an `OrderProcessor` that validates payment, saves the order to a database, and sends a confirmation email, all inside a single `processOrder()` method. That's three distinct responsibilities tangled together.

```java
// Bad: OrderProcessor does everything
class OrderProcessor {
    public void processOrder(Order order) {
        // validate payment (20 lines)
        // save to database (15 lines)
        // send confirmation email (10 lines)
    }
}

// Good: Each responsibility gets its own class
class PaymentService {
    public void validatePayment(Payment payment) { /* ... */ }
}

class OrderRepository {
    public void save(Order order) { /* ... */ }
}

class NotificationService {
    public void sendOrderConfirmation(Order order) { /* ... */ }
}

class OrderService {
    private final PaymentService paymentService;
    private final OrderRepository orderRepository;
    private final NotificationService notificationService;

    public void placeOrder(Order order) {
        paymentService.validatePayment(order.getPayment());
        orderRepository.save(order);
        notificationService.sendOrderConfirmation(order);
    }
}
```

Now `OrderService` is a thin orchestrator. Each collaborator can be tested, replaced, and reasoned about independently.

### Parking Lot Example

#### Bad: One class doing everything

```java
class ParkingLot {
    // Mixed responsibilities: parking + storage + payment + notifications + reporting
    private List<ParkingSpot> spots;
    private Map<String, Vehicle> vehicles;
    private PaymentProcessor paymentProcessor;

    public void parkVehicle(Vehicle v) { /* ... */ }
    public void removeVehicle(String plateNumber) { /* ... */ }

    public double calculateFee(Vehicle v) { /* ... */ }
    public void processPayment(double amount) { /* ... */ }

    public void sendReceipt(String email) { /* ... */ }
    public void generateReport() { /* ... */ }
    public void sendAlertToAdmin() { /* ... */ }
}
```

This class is doing parking, payments, notifications, and reporting. It will be hard to explain, hard to extend, and signals poor design skills.

#### Good: Separate classes with clear responsibilities

```java
class ParkingLot {
    // Core orchestration: entry/exit flow
    private List<ParkingFloor> floors;
    private TicketService ticketService;
    private PaymentService paymentService;

    public Ticket parkVehicle(Vehicle vehicle) { /* ... */ }
    public Payment exitVehicle(Ticket ticket, PaymentMethod method) { /* ... */ }
}

class ParkingFloor {
    // Finds available spots on a given floor
    private List<ParkingSpot> spots;

    public ParkingSpot findAvailableSpot(VehicleType type) { /* ... */ }
}

class TicketService {
    // Ticket creation + duration calculation
    public Ticket generateTicket(ParkingSpot spot, Vehicle vehicle) { /* ... */ }
    public Duration calculateDuration(Ticket ticket) { /* ... */ }
}

class PaymentService {
    // Payment processing only
    public Payment processPayment(Ticket ticket, PaymentMethod method) { /* ... */ }
}
```

Now each class has a clear job:

- `ParkingLot`: Coordinates the overall parking flow
- `ParkingFloor`: Manages spots on a floor
- `TicketService`: Handles ticket logic
- `PaymentService`: Processes payments

### Keep Related Things Together

Group fields and methods that work together. Don't scatter related logic across the class.

#### Bad: Random ordering

```java
class Order {
    private double total;
    private String customerId;
    private List<Item> items;
    private String status;
    private Address shippingAddress;

    public void ship() { /* ... */ }
    public double calculateTotal() { /* ... */ }
    public void setCustomerId(String id) { /* ... */ }
    public void addItem(Item item) { /* ... */ }
    public String getStatus() { /* ... */ }
}
```

#### Good: Logical grouping

```java
class Order {
    // Identity
    private String orderId;
    private String customerId;

    // Order contents
    private List<Item> items;
    private double total;

    // Fulfillment
    private String status;
    private Address shippingAddress;

    // Item management
    public void addItem(Item item) { /* ... */ }
    public void removeItem(String itemId) { /* ... */ }

    // Pricing
    public double calculateTotal() { /* ... */ }
    public void applyDiscount(Discount discount) { /* ... */ }

    // Status management
    public void markAsShipped() { /* ... */ }
    public void markAsDelivered() { /* ... */ }
}
```

---

# 4. Program to Interfaces

Creating separate classes is good. Making those classes communicate through **interfaces** is even better. It shows you understand **decoupling**, which is essential for building systems that are flexible, testable, and easy to evolve.

> **Principle:**
>
>  Depend on abstractions (interfaces), not on concrete implementations.

When you identify a responsibility like “send notification”, start by defining a **contract** (interface). Then provide one or more implementations behind it.

#### **Before (High Coupling):**

`OrderService` is directly tied to `EmailNotificationService`.

```java
public class OrderService {
    // Tightly coupled to a specific implementation
    private final EmailNotificationService notificationService;

    public OrderService() {
        this.notificationService = new EmailNotificationService(); // Ouch!
    }

    // ...
}
```

What if the business wants to add SMS notifications" You'd have to change the OrderService class.

#### **After (Low Coupling via Interfaces):**

```java
// 1) Define the contract (the "What")
public interface NotificationService {
    void sendOrderConfirmation(User user, Order order);
}

// 2) Implementations (the "How")
public class EmailNotificationService implements NotificationService {
    @Override
    public void sendOrderConfirmation(User user, Order order) { /* ... */ }
}

public class SmsNotificationService implements NotificationService {
    @Override
    public void sendOrderConfirmation(User user, Order order) { /* ... */ }
}

// 3) Orchestrator depends only on the contract
public class OrderService {
    private final NotificationService notificationService;

    public OrderService(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    public void placeOrder(Order order) {
        // ...
        notificationService.sendOrderConfirmation(order.getUser(), order);
        // ...
    }
}
```

Now `OrderService` depends only on the **interface**. The concrete implementation is **injected** from outside, so swapping Email for SMS is a configuration change, not a redesign.

---

# 5. Methods That Tell a Story

Long methods are the most common code quality issue in LLD interviews. A single 40-line method that mixes validation, calculations, state updates, and I/O forces the reader to mentally break it into steps.

Do that decomposition yourself.

When each method has one job, the top-level method reads like a narrative. The interviewer can scan it and immediately understand the flow.

> **Rule of thumb:**
>
>  If you have to scroll to see the whole method, it’s probably doing too much.

### Keep Methods Short and Focused

#### Bad: 40-line method doing everything

```java
$dc
```

This is hard to follow and impossible to test in isolation.

#### Good: Small methods that each do one thing

```java
$e2
```

Now `processOrder` reads like a story: validate, calculate, charge, update, save. Each helper method can be understood in isolation.

### Favor Early Returns

Deep nesting makes code hard to follow. Return early to keep the happy path at the lowest indentation level.

Here is a concrete example. The bad version is a single method that does everything. The good version reads like a checklist of steps.

#### Bad: Deep nesting

```java
public ParkingSpot findSpot(Vehicle vehicle) {
    // Nested checks hide the happy path
    if (vehicle != null) {
        if (hasAvailableSpots()) {
            for (ParkingFloor floor : floors) {
                ParkingSpot spot = floor.findSpot(vehicle.getType());
                if (spot != null) {
                    return spot; // Return first match
                }
            }
        }
    }

    // If any condition fails, we silently fall through
    return null;
}
```

#### Good: Early returns

```java
public ParkingSpot findSpot(Vehicle vehicle) {
    // Guard clause: invalid input
    if (vehicle == null) {
        return null;
    }

    // Guard clause: quick rejection when lot is full
    if (!hasAvailableSpots()) {
        return null;
    }

    // Happy path: scan floors and return the first matching spot
    for (ParkingFloor floor : floors) {
        ParkingSpot spot = floor.findSpot(vehicle.getType());
        if (spot != null) {
            return spot;
        }
    }

    // Nothing found on any floor
    return null;
}
```

The second version is flatter and easier to scan.

---

# 6. Meaningful Use of Enums

Enums are one of the simplest ways to show strong modeling instincts in an LLD interview. Anytime you represent a fixed category using raw strings or integer constants, you give up **type safety**, **readability**, and **IDE support**.

> **Rule:**
>
>  If a value comes from a small, fixed set of options, model it as an enum.

This avoids “magic strings” like `"large"` or `"occupied"` floating around your codebase. Those strings are easy to mistype and hard to refactor safely.

#### Bad: Magic strings scattered everywhere

```java
class ParkingSpot {
    private String size;  // "small", "medium", "large"
    private String status; // "available", "occupied", "reserved"

    public boolean canFit(String vehicleType) {
        if (vehicleType.equals("motorcycle")) {
            return true;
        } else if (vehicleType.equals("car")) {
            return size.equals("medium") || size.equals("large");
        } else if (vehicleType.equals("truck")) {
            return size.equals("large");
        }
        return false;
    }
}
```

The moment someone types `"Motorcycle"` instead of `"motorcycle"`, or `"LARGE"` instead of `"large"`, you get bugs that your compiler cannot catch.

#### Good: Enums with behavior

```java
enum VehicleType {
    MOTORCYCLE(1),
    CAR(2),
    TRUCK(3);

    private final int sizeRequirement;

    VehicleType(int sizeRequirement) {
        this.sizeRequirement = sizeRequirement;
    }

    public int getSizeRequirement() {
        return sizeRequirement;
    }
}

enum SpotSize {
    SMALL(1),
    MEDIUM(2),
    LARGE(3);

    private final int capacity;

    SpotSize(int capacity) {
        this.capacity = capacity;
    }

    public boolean canFit(VehicleType type) {
        return this.capacity >= type.getSizeRequirement();
    }
}

enum SpotStatus {
    AVAILABLE,
    OCCUPIED,
    RESERVED,
    OUT_OF_SERVICE
}

class ParkingSpot {
    private SpotSize size;
    private SpotStatus status;

    public boolean canFit(VehicleType vehicleType) {
        return status == SpotStatus.AVAILABLE && size.canFit(vehicleType);
    }
}
```

Benefits:

- **Type safety**: You can't pass an invalid value
- **IDE support**: Auto-complete shows all options
- **Encapsulated logic**: The `canFit` logic lives with the data
- **Easy to extend**: Adding a new vehicle type is one place

---

# 7. Error Handling Without Clutter

Error handling in interview code usually fails in one of two ways:

1. It’s missing entirely, so edge cases slip through silently.
2. It’s everywhere, with `try/catch` wrapped around every other line, making the core logic impossible to read.

A clean approach sits in the middle: **validate at the boundary, then keep the inside clean.**

### Validate at Entry Points

Your **public methods** are entry points. Validate inputs there: null checks, range checks, and state checks. After that, your private helpers can assume valid data.

This keeps validation logic centralized and prevents defensive checks from spreading across every method.

```java
public class ParkingLot {
    public Ticket parkVehicle(Vehicle vehicle) {
        // Validate at the boundary (entry point)
        validateVehicle(vehicle);

        // After validation, internal code can assume vehicle is valid
        ParkingSpot spot = findAvailableSpot(vehicle.getType());
        if (spot == null) {
            throw new ParkingFullException("No spots available for " + vehicle.getType());
        }

        return ticketService.generateTicket(spot, vehicle);
    }

    private void validateVehicle(Vehicle vehicle) {
        // Null check
        if (vehicle == null) {
            throw new IllegalArgumentException("Vehicle cannot be null");
        }

        // Required fields
        if (vehicle.getLicensePlate() == null || vehicle.getLicensePlate().isEmpty()) {
            throw new IllegalArgumentException("License plate is required");
        }
        if (vehicle.getType() == null) {
            throw new IllegalArgumentException("Vehicle type is required");
        }
    }
}
```

### Use Custom Exceptions

Generic exceptions like `RuntimeException` or `Exception` don't communicate intent. Custom exceptions make error handling clear.

```java
// Custom exceptions
class ParkingFullException extends RuntimeException {
    public ParkingFullException(String message) {
        super(message);
    }
}

class VehicleAlreadyParkedException extends RuntimeException {
    private final String licensePlate;

    public VehicleAlreadyParkedException(String licensePlate) {
        super("Vehicle already parked: " + licensePlate);
        this.licensePlate = licensePlate;
    }

    public String getLicensePlate() {
        return licensePlate;
    }
}

class InvalidTicketException extends RuntimeException {
    public InvalidTicketException(String ticketId) {
        super("Invalid or expired ticket: " + ticketId);
    }
}
```

Now error handling code is self-documenting:

```java
try {
    Ticket ticket = parkingLot.parkVehicle(vehicle);
} catch (ParkingFullException e) {
    // Redirect to nearby parking
} catch (VehicleAlreadyParkedException e) {
    // Show existing ticket
}
```

### Follow Consistent Pattern: Throw or Return, Not Both

Pick one error-handling style and stick with it. If your `findAvailableSpot()` throws an exception when no spot is found, don't have another method that returns `null` for the same situation. Inconsistency forces the caller to guess which pattern a method uses.

---

# 8. Avoiding the Most Visible Code Smells

Code smells are patterns that aren't bugs but signal deeper problems. In an interview, certain smells are immediately visible to the reviewer and can overshadow otherwise good design work. Here are the five most common ones and their fixes.

### Magic Numbers and Strings

A `3` buried in a calculation or a `"PREMIUM"` string in a conditional is a magic value. The reader doesn't know what it represents without tracing context. Extract it into a named constant.

```java
// Smell
if (hours > 3) { fee = hours * 5.0; }

// Fix
private static final int FREE_PARKING_HOURS = 3;
private static final double HOURLY_RATE = 5.0;

if (hours > FREE_PARKING_HOURS) { fee = hours * HOURLY_RATE; }
```

### Dead Code

Commented-out methods, unused variables, unreachable branches. Dead code distracts the reader and makes them wonder if it's intentional or accidental. Delete it. If you wrote something and then realized you don't need it, remove it entirely rather than commenting it out. In an interview, dead code suggests you lost track of your own implementation.

### Inconsistent Naming Conventions

Mixing `camelCase` and `snake_case` in the same language, or using `get` prefixes on some getters but not others, creates visual noise. Pick the convention standard for your language and apply it everywhere. Java uses `camelCase` for methods and fields. Python uses `snake_case`. C# uses `PascalCase` for public members. Consistency matters more than which convention you choose.

### Premature Optimization Complexity

Using a `TreeMap` with a custom comparator when a simple `ArrayList` with a linear scan works fine for 10 items. Implementing a caching layer when the data fits in a single HashMap. In an interview, simplicity wins over theoretical performance. If the interviewer wants to discuss optimization, they'll ask. Don't add complexity to solve a performance problem that doesn't exist in the interview scope.

### Overly Long Parameter Lists

A method with five or more parameters is hard to call correctly. The caller has to remember the exact order, and a swapped argument might not cause a compile error if the types are similar.

```java
// Smell
Meeting createMeeting(String title, LocalDateTime start, LocalDateTime end,
    User organizer, Room room, Priority priority) { ... }

// Fix: Group related parameters
Meeting createMeeting(String title, TimeSlot timeSlot,
    User organizer, Room room, Priority priority) { ... }
```

### Boolean Parameters

A method call like `processOrder(order, true, false, true)` is unreadable. The caller has to check the method signature to understand what each boolean means. Replace boolean parameters with enums or separate methods that make the intent explicit.

```java
// Bad: What do these booleans mean"
processOrder(order, true, false, true);

// Good: Use enums that reveal intent
processOrder(order, DeliveryType.EXPRESS, WrappingOption.NONE);
// Or use separate methods
processExpressOrder(order);
```

Each of these smells is quick to fix. The challenge isn't knowing the fix, it's noticing the smell in the first place. During your final review pass, do a dedicated scan for these smells. They take seconds to fix and they visibly improve your submission.
