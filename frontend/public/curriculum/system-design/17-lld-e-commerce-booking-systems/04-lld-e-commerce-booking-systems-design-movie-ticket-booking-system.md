---
id: "lld-e-commerce-booking-systems-design-movie-ticket-booking-system"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - E commerce Booking Systems"
subSection: ""
title: "Design Movie Ticket Booking System"
slug: "lld-e-commerce-booking-systems-design-movie-ticket-booking-system"
summary: "In this chapter, we will explore the low-level design of a movie ticket booking system in detail."
eli10: "Imagine Design Movie Ticket Booking System as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Movie Ticket Booking System Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","E commerce Booking Systems","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Movie Ticket Booking System"
  code: |
    enum PaymentStatus {
        SUCCESS,
        FAILURE,
        PENDING
    }
    
    enum SeatStatus {
        AVAILABLE,
        BOOKED,
        LOCKED // Temporarily held during booking process
    }
    
    enum SeatType {
        REGULAR(50.0),
        PREMIUM(80.0),
        RECLINER(120.0);
    
        private final double price;
    
        SeatType(double price) {
            this.price = price;
        }
    
        public double getPrice() {
            return price;
        }
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What a Movie Ticket Booking System"
>
> A **Movie Ticket Booking System** is a software application that enables users to **search for movies**, **view showtimes**, **select seats**, and **book tickets** at cinemas or multiplexes.
>
> 
> <!-- Simulation: movie-booking -->
> 

In this chapter, we will explore the **low-level design of a movie ticket booking system** in detail.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Is this system for the end-user (customer) to book tickets, or is it an internal system for cinema administrators to manage shows and screens"
>
> **Interviewer:** Let's focus on the customer-facing booking workflow. The primary user story is a customer finding a movie and booking seats for a specific show.
>
> **Candidate:** How should users find movies" Should they be able to search by movie title, city, or cinema"
>
> **Interviewer:** Users should be able to find all shows for a specific movie in a given city.
>
> **Candidate:** Should the system support different seat types such as ‘Standard’, ‘Premium’, and ‘Recliner’, with variable pricing"
>
> **Interviewer:** Yes, each screen can have multiple seat types with different pricing.
>
> **Candidate:** Should users be able to select specific seats, or should the system assign them automatically"
>
> **Interviewer:** Users must be able to select specific seats from a seat map during the booking process.
>
> **Candidate:** A critical issue in booking systems is concurrency. What should happen if two users try to book the same seat at the same time"
>
> **Interviewer:** Excellent point. The system must prevent double-booking. When a user selects seats, those seats should be temporarily locked for a short duration while they complete the payment. If the payment is not completed within the timeout, the seats should be released.
>
> **Candidate:** How is payment handled" Do we need to integrate with a real payment gateway"
>
> **Interviewer:** We can assume an external payment gateway. Our system should be able to initiate a payment process with a specific amount and handle success or failure responses. The design should allow for different payment methods, like credit cards or PayPal.
>
> **Candidate:** Should there be a notification feature" For example, notifying users when booking opens for a new, highly anticipated movie.
>
> **Interviewer:** Yes, that's a great feature to include. Let's add a mechanism for users to subscribe to a movie and receive a notification when it becomes available for booking.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Users can search for shows based on a movie title and a city.
- The system should support multiple cities, cinemas, screens, and shows.
- Each screen has a defined layout of seats with different types (e.g., REGULAR, PREMIUM).
- A user can book one or more available seats for a specific show.
- Double booking should be prevented.
- The ticket price should be calculated dynamically based on configurable rules (e.g., seat types)
- Users can subscribe to movies and receive notifications when booking opens for them.
- The system must be flexible to support different payment methods.

## 1.2 Non-Functional Requirements

- **Concurrency:** The system must be designed to handle concurrent booking requests gracefully, ensuring data integrity and preventing race conditions like double-booking.
- **Extensibility:** The design should be modular. It should be easy to add new pricing strategies (e.g., holiday pricing) or new payment methods without significant changes to the core system.
- **Modularity:** The system should follow good object-oriented principles with a clear separation of concerns.
- **Simplified Interface:** The system should expose a simple API for clients to interact with, hiding the underlying complexity of the booking, locking, and payment processes.

After the requirements are clear, lets identify the core entities/objects we will have in our system.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., movie, theater, screen, seat, user, booking) and **actions** (e.g., list, search, book, cancel, lock) from the functional requirements. These typically translate into **classes**, **enums**, or **interfaces** in an object-oriented design.

Let’s walk through the functional requirements and extract the relevant entities:

#### **1. Support searching for shows in multiple cities, cinemas, and screens.**

This establishes the hierarchical structure of the system's catalog.

- `City`: The top-level geographical entity.
- `Cinema`: A physical location within a City that contains multiple screens.
- `Screen`: A specific auditorium within a Cinema.
- `Seat`: The smallest unit within a Screen. It has properties like `SeatType` (REGULAR, PREMIUM) and `SeatStatus` (AVAILABLE, BOOKED, LOCKED), which are managed by enums.
- `Movie`: Represents the content being shown.
- `Show`: The central entity that connects a Movie to a Screen at a specific time. This is what a user ultimately books.

#### **2. A user can book seats for a specific show.**

This introduces the core actors and the outcome of the booking process.

- `User`: Represents the customer making the booking.
- `Booking`: An entity that represents a confirmed transaction, linking a User, a Show, and a specific list of Seats.

#### **3. Prevent double-booking by temporarily locking seats.**

This critical concurrency requirement necessitates a dedicated manager for handling seat states.

- `SeatLockManager`: A service entity responsible for atomically locking and unlocking seats for a user during the payment process. It prevents race conditions where two users might try to book the same seat simultaneously.

#### **4. Calculate prices dynamically and support multiple payment methods.**

These requirements for flexible, interchangeable algorithms are ideal for the **Strategy Pattern**.

- `PricingStrategy`** (Interface)**: Defines a contract for different pricing models (e.g., WeekdayPricingStrategy, WeekendPricingStrategy). A Show is configured with a specific strategy.
- `PaymentStrategy`** (Interface)**: Defines a contract for various payment gateways (e.g., CreditCardPaymentStrategy).
- `Payment`: An entity to record the details of the financial transaction.

#### **5. Provide a simple, high-level interface to the complex booking workflow.**

To manage the orchestration of locking, pricing, payment, and booking confirmation, two key service entities are introduced.

- `BookingManager`: Orchestrates the step-by-step workflow of creating a single booking.
- `MovieBookingService`: Acts as a **Facade** and **Singleton**, providing a unified and simplified entry point for all client interactions, hiding the complexity of the underlying services and data models.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **Structural Entities** (City, Cinema, Screen, Seat, Movie, Show): These form the core catalog of the booking system.
> - **Transactional Entities** (User, Booking, Payment): Represent the actors and the results of the booking process.
> - **Concurrency Management** (SeatLockManager): A crucial service that handles the temporary locking of seats to prevent double-booking.
> - **Enums** (SeatType, SeatStatus, PaymentStatus): Define fixed sets of constants for seat properties and transaction states.
> - **Strategy Interfaces** (PricingStrategy, PaymentStrategy): Allow for interchangeable algorithms for calculating prices and processing payments, promoting extensibility.
> - **Orchestration and System Interface** (BookingManager, MovieBookingService): Service-layer classes that manage the complex booking workflow and provide a simplified Facade for clients.

These core entities define the key abstractions of the Movie Ticket Booking System and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

- `PaymentStatus`: Defines the outcome of a payment transaction (`SUCCESS`, `FAILURE`, `PENDING`).
- `SeatStatus`: Represents the state of a seat (`AVAILABLE`, `BOOKED`, `LOCKED`). The `LOCKED` state is crucial for handling concurrency during the booking process.
- `SeatType`: Classifies seats and associates a base price with each type (`REGULAR`, `PREMIUM`, `RECLINER`).

### **Data Classes**

#### `User`

Represents a customer of the booking system.

#### `City`

Represents a geographical city where cinemas are located.

#### `Movie`

Represents a film, containing its title and duration. It also acts as a Subject in the Observer pattern.

`Seat`

Represents a single seat in a cinema screen, with properties like row, column, type, and status.

#### `Screen`

A container for a collection of `Seat`s.

#### `Cinema`

Represents a physical movie theater, containing its name, city, and a list of its `Screen`s.

#### `Payment`

A data object that records the details of a completed payment transaction.

`Booking`

A data class that encapsulates all details of a confirmed booking, including the user, show, seats, and payment information. 

It is constructed using the Builder pattern.

### **Core Classes**

#### `Show`

Represents a specific screening of a `Movie` at a particular `Screen` and `startTime`. It is associated with a `PricingStrategy` to determine ticket costs.

#### `SeatLockManager`

A critical service responsible for handling concurrency.

It temporarily locks seats for a user during the booking process to prevent double-booking, and automatically releases them after a timeout.

#### `BookingManager`

An orchestrator class that manages the entire booking workflow.

It uses the `SeatLockManager` and a `PaymentStrategy` to ensure a booking is processed atomically and reliably.

#### `MovieBookingService`** (Singleton & Facade)**

The main entry point for the application.

It hides the system's internal complexity from the client and provides a simple, unified API for all major operations like searching for shows and booking tickets.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- A `Cinema` is composed of one or more `Screen`s.
- A `Screen` is composed of a collection of `Seat`s.
- The `MovieBookingService` "has-a" collection of all core entities like `Cinema`s, `Movie`s, and `Show`s, managing their lifecycle.

### **Association**

- A `Show` is associated with one `Movie`, one `Screen`, and one `PricingStrategy`.
- A `Booking` is associated with one `User`, one `Show`, and a list of `Seat`s.
- A `MovieSubject` (the `Movie`) is associated with a list of `MovieObserver`s.

### **Inheritance**

- `Movie` extends the abstract `MovieSubject` class.
- `UserObserver` implements the `MovieObserver` interface.
- Concrete strategy classes (`WeekdayPricingStrategy`, `CreditCardPaymentStrategy`, etc.) implement their respective `PricingStrategy` and `PaymentStrategy` interfaces.

### **Dependency**

- The `MovieBookingService` (Facade) depends on the `BookingManager` to handle the booking process.
- The `BookingManager` depends on the `SeatLockManager` to handle seat locking and on a `PaymentStrategy` to process payments.
- A client depends on the `Booking.BookingBuilder` to construct a `Booking` object.

## 3.3 Key Design Patterns

### [**Strategy Pattern**](/learn/lld/strategy)

This pattern is used to make core algorithms interchangeable.

#### **Pricing**

The `PricingStrategy` allows different pricing models (e.g., weekday vs. weekend) to be applied to a `Show` without changing the `Show` or `BookingManager` classes.

#### **Payment**

The `PaymentStrategy` allows different payment methods (e.g., Credit Card, UPI) to be used for a booking.

### [**Observer Pattern**](/learn/lld/observer)

This pattern is used to notify users about movie updates.

The `Movie` (Subject) can notify all subscribed `UserObserver`s when an event occurs (e.g., bookings open), decoupling the movie entity from the user notification logic.

### [**Builder Pattern**](/learn/lld/builder)

The `Booking.BookingBuilder` is used for the step-by-step construction of a `Booking` object. This is ideal for an object with multiple required fields, ensuring it is created in a valid and consistent state.

### [**Facade Pattern**](/learn/lld/facade)

The `MovieBookingService` class serves as a facade. It provides a simple, high-level API (`findShows`, `bookTickets`) that hides the complex internal workflows involving seat locking, payment processing, and data management.

### [**Singleton Pattern**](/learn/lld/singleton)

`MovieBookingService` is implemented as a singleton to ensure there is a single, globally accessible point of control for the entire booking system. This centralizes the management of all data and services.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Enums

These enums standardize constants used across the system

```java
enum PaymentStatus {
    SUCCESS,
    FAILURE,
    PENDING
}

enum SeatStatus {
    AVAILABLE,
    BOOKED,
    LOCKED // Temporarily held during booking process
}

enum SeatType {
    REGULAR(50.0),
    PREMIUM(80.0),
    RECLINER(120.0);

    private final double price;

    SeatType(double price) {
        this.price = price;
    }

    public double getPrice() {
        return price;
    }
}
```

- `SeatType` maps each seat type to a price.
- `SeatStatus` enables clear transitions during the booking process.
- `PaymentStatus` helps track payment outcomes.

### 4.2 User

```java
class User {
    private final String id;
    private final String name;
    private final String email;

    public User(String name, String email) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
```

### 4.3 City

```java
class City {
    private final String id;
    private final String name;

    public City(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
```

### 4.4 Movie

```java
class Movie extends MovieSubject {
    private final String id;
    private final String title;
    private final int durationInMinutes;

    public Movie(String id, String title, int durationInMinutes) {
        this.id = id;
        this.title = title;
        this.durationInMinutes = durationInMinutes;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    // Additional movie details like genre, language etc. can be added here
}
```

### 4.5 Seat

```java
class Seat {
    private final String id;
    private final int row;
    private final int col;
    private final SeatType type;
    private SeatStatus status;

    public Seat(String id, int row, int col, SeatType type) {
        this.id = id;
        this.row = row;
        this.col = col;
        this.type = type;
        this.status = SeatStatus.AVAILABLE;
    }

    // Getters and a setter for status
    public String getId() { return id; }
    public int getRow() { return row; }
    public int getCol() { return col; }
    public SeatType getType() { return type; }
    public SeatStatus getStatus() { return status; }
    public void setStatus(SeatStatus status) { this.status = status; }
}
```

### 4.6 Screen

```java
class Screen {
    private final String id;
    private final List<Seat> seats;

    public Screen(String id) {
        this.id = id;
        this.seats = new ArrayList<>();
    }

    public void addSeat(Seat seat) {
        seats.add(seat);
    }

    public String getId() { return id; }
    public List<Seat> getSeats() { return seats; }
}
```

### 4.7 Cinema

```java
class Cinema {
    private final String id;
    private final String name;
    private final City city;
    private final List<Screen> screens;

    public Cinema(String id, String name, City city, List<Screen> screens) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.screens = screens;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public City getCity() { return city; }
    public List<Screen> getScreens() { return screens; }
}
```

### 4.8 Show

```java
class Show {
    private final String id;
    private final Movie movie;
    private final Screen screen;
    private final LocalDateTime startTime;
    private final PricingStrategy pricingStrategy;

    public Show(String id, Movie movie, Screen screen, LocalDateTime startTime, PricingStrategy pricingStrategy) {
        this.id = id;
        this.movie = movie;
        this.screen = screen;
        this.startTime = startTime;
        this.pricingStrategy = pricingStrategy;
    }

    public String getId() { return id; }
    public Movie getMovie() { return movie; }
    public Screen getScreen() { return screen; }
    public LocalDateTime getStartTime() { return startTime; }
    public PricingStrategy getPricingStrategy() { return pricingStrategy; }
}
```

### 4.9 Payment

```java
class Payment {
    private final String id;
    private final double amount;
    private final PaymentStatus status;
    private final String transactionId;

    public Payment(double amount, PaymentStatus status, String transactionId) {
        this.id = UUID.randomUUID().toString();
        this.amount = amount;
        this.status = status;
        this.transactionId = transactionId;
    }

    public PaymentStatus getStatus() { return status; }
}
```

### 4.10 Booking

```java
$eb
```

### 4.11 Observer

This pattern allows users to subscribe to movie updates, such as when booking opens. The Movie (Subject) is completely decoupled from the User (Observer). The Movie doesn't know what a User is; it only knows it has a list of MovieObservers to notify.

```java
interface MovieObserver {
    void update(Movie movie);
}

abstract class MovieSubject {
    private final List<MovieObserver> observers = new ArrayList<>();

    public void addObserver(MovieObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(MovieObserver observer) {
        observers.remove(observer);
    }

    public void notifyObservers() {
        for (MovieObserver observer : observers) {
            observer.update((Movie) this);
        }
    }
}

class UserObserver implements MovieObserver {
    private final User user;

    public UserObserver(User user) {
        this.user = user;
    }

    @Override
    public void update(Movie movie) {
        System.out.printf("Notification for %s (%s): Movie '%s' is now available for booking!%n",
                user.getName(), user.getId(), movie.getTitle());
    }
}
```

### 4.12 PricingStrategy

The Strategy pattern is used to define a family of algorithms, encapsulate each one, and make them interchangeable. This is perfect for pricing and payment, which can have multiple variations.

```java
interface PricingStrategy {
    double calculatePrice(List<Seat> seats);
}

class WeekdayPricingStrategy implements PricingStrategy {
    @Override
    public double calculatePrice(List<Seat> seats) {
        return seats.stream().mapToDouble(seat -> seat.getType().getPrice()).sum();
    }
}

class WeekendPricingStrategy implements PricingStrategy {
    private static final double WEEKEND_SURCHARGE = 1.2; // 20% surcharge

    @Override
    public double calculatePrice(List<Seat> seats) {
        double basePrice = seats.stream().mapToDouble(seat -> seat.getType().getPrice()).sum();
        return basePrice * WEEKEND_SURCHARGE;
    }
}
```

This pattern decouples the context (a Show or a BookingManager) from the concrete implementation of the algorithm. The Show doesn't need to know how to calculate a weekend price; it just calls calculatePrice() on its configured strategy object.

### 4.13 Payment Strategy

```java
interface PaymentStrategy {
    Payment pay(double amount);
}

class CreditCardPaymentStrategy implements PaymentStrategy {
    private final String cardNumber;
    private final String cvv;

    public CreditCardPaymentStrategy(String cardNumber, String cvv) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    @Override
    public Payment pay(double amount) {
        System.out.printf("Processing credit card payment of $%.2f%n", amount);
        // Simulate payment gateway interaction
        boolean paymentSuccess = Math.random() > 0.05; // 95% success rate
        return new Payment(
                amount,
                paymentSuccess " PaymentStatus.SUCCESS : PaymentStatus.FAILURE,
                "TXN_" + UUID.randomUUID()
        );
    }
}
```

### 4.14 SeatLockManager

```java
$f2
```

### 4.15 BookingManager

The BookingManager orchestrates the entire booking workflow.

```java
$f8
```

BookingManager defines the strict, sequential workflow for a booking: lock -> calculate price -> process payment -> create booking -> confirm. This ensures a consistent and reliable process.

### 4.16 MovieBookingService

This class is a **Singleton** that provides a simplified, high-level API for clients.

```java
$fe
```

- **Facade Pattern:** The facade hides the immense complexity of the system. A client (like a UI controller) doesn't need to know about SeatLockManager or BookingManager; it just calls the simple bookTickets method.

### 4.17 MovieBookingDemo

The demo class validates the entire system by simulating a user's booking journey.

```java
$104
```

---

# 5. Run and Test

---

# 6. Quiz
