---
id: "lld-e-commerce-booking-systems-design-ride-hailing-service-like-uber"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - E commerce Booking Systems"
subSection: ""
title: "Design Ride Hailing Service like Uber"
slug: "lld-e-commerce-booking-systems-design-ride-hailing-service-like-uber"
summary: "In this chapter, we will explore the low-level design of a simplified ride-sharing platform."
eli10: "Imagine Design Ride Hailing Service like Uber as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Ride Hailing Service like Uber Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","E commerce Booking Systems","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Ride Hailing Service like Uber"
  code: |
    enum RideType {
        SEDAN,
        SUV,
        AUTO
    }
    
    enum DriverStatus {
        ONLINE,
        IN_TRIP,
        OFFLINE
    }
    
    enum TripStatus {
        REQUESTED,
        ASSIGNED,
        IN_PROGRESS,
        COMPLETED,
        CANCELLED
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Ride-Hailing Service"
>
> A **ride-hailing service** is a digital platform that enables users to request on-demand transportation by connecting them with nearby drivers through a mobile or web application.
>
> 
> <!-- Simulation: uber -->
> 

>
> **Uber**, one of the most popular ride-sharing platforms, allows passengers to:
>
> - Book rides in real time
> - Match with available drivers based on location
> - Track ride progress via GPS
> - Make cashless payments
> - Rate and review trips after completion

In this chapter, we will explore the **low-level design **of a simplified ride-sharing platform.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions, clarify ambiguities, and define the system's scope more precisely.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should we allow riders to choose the type of ride (e.g., Sedan, SUV, Auto)"
>
> **Interviewer:** Yes, riders should be able to select from available ride types.
>
> **Candidate:** Should drivers be assigned automatically, or should they have the option to accept or reject a ride"
>
> **Interviewer:** The system should notify nearby drivers. Drivers can accept or reject a ride.
>
> **Candidate:** Are we considering payments and ratings as part of this design"
>
> **Interviewer:** Assume payments are handled externally and are always successful. Lets skip ratings for this version.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Allow **riders** to request a ride by specifying pickup and drop-off locations and preferred **ride type.**
- Notify drivers of incoming ride requests and allow them to **accept or reject** the request.
- Allow **drivers to start and end** a trip once accepted.
- Update and maintain **trip status** throughout its lifecycle. Notify riders of trip status changes.
- Maintain **trip history** for both riders and drivers

## 1.2 Non-Functional Requirements

- **Modularity:** The system should follow object-oriented principles with well-defined components.
- **Extensibility:** The design should be flexible enough to support future enhancements.
- **Maintainability:** Code should be clean, modular, and testable, making it easy to debug, refactor, and extend

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., rider, driver, trip, location, vehicle) and **actions** (e.g., request, match, track, rate, update) from the functional requirements. These typically translate directly into **classes**, **enums**, or **interfaces** in an object-oriented design.

Below, we break down the functional requirements and extract the relevant entities. Related requirements are grouped together when they represent the same conceptual domain.

#### **1. Riders should be able to request a ride with pickup, drop-off, and ride type.**

This introduces several entities:

- `Rider`: Represents a user who requests rides. A rider can initiate new trips and view past trip history.
- `Location`: Represents a point on the map (latitude, longitude) and is used to calculate distances between users and drivers.
- `RideType` *(enum)*: Enum to represent types of rides (e.g., `SEDAN`, `SUV`, `AUTO`).

#### 2. Notify nearby drivers of incoming ride requests, and allow them to accept/reject the request.

This introduces:

- `Driver`: Represents a service provider who can accept ride requests. Tracks attributes like current location, availability status, and assigned vehicle.
- `Vehicle`: Represents the driver’s car or auto. Includes metadata such as license plate, vehicle type, and capacity.
- `DriverStatus` *(enum)*: Indicates whether a driver is `ONLINE`, `IN_TRIP`, or `OFFLINE`.

#### **3. The system must manage and update trip status as it progresses.**

This introduces:

- `Trip`: Represents an actual ride that connects a rider and a driver. It evolves through various stages and holds information such as start/end times, route, and fare (if needed).
- `TripStatus` *(enum)*: Represents the lifecycle of a trip—e.g., `REQUESTED`, `ACCEPTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`.

#### 4. System-wide coordination is needed to manage ride requests and driver assignments.

This requires an orchestrator:

- `RideSharingService`: A central component responsible for handling ride requests, matching riders with available drivers, managing trip lifecycle, and updating system state.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Final List of Core Entities
>
> - `Rider`: Represents a customer who requests rides. Has profile and trip history.
> - `Driver`: Represents a driver available to accept ride requests. Includes current status, location, and associated vehicle.
> - `DriverStatus`** (Enum)**: Current state of a driver — ONLINE, ASSIGNED, OFFLINE.
> - `Vehicle`: Represents a car, auto, or bike used by a driver. Includes type and identifying details.
> - `Location`: Represents a point on the map using latitude and longitude.
> - `Trip`: Represents a ride from pickup to drop-off with fare, status, and timestamps.
> - `TripStatus`** (Enum)**: Lifecycle of a trip — REQUESTED, ACCEPTED, IN_PROGRESS, COMPLETED, etc.
> - `RideType`** (Enum)**: Type of ride — SEDAN, SUV, AUTO, etc.
> - `RideSharingService`: Orchestrates the system. Handles ride requests, driver matching, trip state transitions, and overall coordination.

These core entities define the essential abstractions of the ride-hailing platform and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

- `RideType`: Defines the categories of vehicles available (e.g., `SEDAN`, `SUV`).
- `DriverStatus`: Represents the real-time status of a driver (`ONLINE`, `IN_TRIP`, `OFFLINE`).
- `TripStatus`: Captures the various stages of a ride's lifecycle (`REQUESTED`, `ASSIGNED`, `COMPLETED`).

### **Data Classes**

#### `Location`

A data class holding geographic coordinates.

It includes a utility method to calculate distances, which is fundamental for matching drivers and calculating fares.

#### `Vehicle`

Represents a driver's vehicle, containing details like `licenseNumber`, `model`, and `RideType`.

### **Core Classes**

#### `User`** (Abstract Class)**

A base class for `Rider` and `Driver`, holding common properties like ID, name, and trip history. It implements `TripObserver`.

- `Rider`** & **`Driver`: Concrete user classes. They act as **Observers** to receive trip updates. The `Driver` class also manages their `Vehicle`, current `Location`, and `DriverStatus`.

#### `Trip`

The central entity representing a single ride from request to completion.

It acts as the **Context** for the State pattern (delegating actions to its `currentState` object) and the **Subject** for the Observer pattern (notifying observers of status changes). Its construction is handled by a nested `TripBuilder`.

#### `RideSharingService`** (Singleton & Facade)**

The main entry point for all client interactions.

It orchestrates the entire ride-hailing process, from registering users and handling requests to assigning drivers and processing t

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- `RideSharingService` "has-a" collection of `Rider`s, `Driver`s, and `Trip`s, managing their lifecycle within the system.
- A `Driver` "has-a" `Vehicle`.

### **Association**

- A `Trip` is associated with one `Rider` and one `Driver`.
- `RideSharingService` is associated with a `PricingStrategy` and a `DriverMatchingStrategy` to perform its core logic.
- A `Trip` is associated with a single `TripState` at any given time.
- A `Trip` (Subject) is associated with multiple `TripObserver`s (Rider and Driver).

### **Inheritance**

- `Rider` and `Driver` inherit from the abstract `User` class.
- The concrete state classes (`RequestedState`, etc.) implement the `TripState` interface.
- The concrete strategy classes (`NearestDriverMatchingStrategy`, etc.) implement their respective strategy interfaces.

### **Dependency**

- The `RideSharingService` depends on the strategy interfaces to remain decoupled from specific algorithms.
- The `Trip` class uses the `TripBuilder` class for its instantiation.
- The client (`RideSharingServiceDemo`) depends on the `RideSharingService` facade.

## 3.3 Key Design Patterns

### **Facade Pattern**

The `RideSharingService` class serves as a facade. It provides a simple, high-level API (`requestRide`, `acceptRide`, `endTrip`) that hides the complex internal workflows involving state transitions, driver matching, pricing, and notifications.

### **Singleton Pattern**

`RideSharingService` is implemented as a singleton to ensure there is only one instance coordinating the entire system. This provides a single, global point of access and control.

### **Strategy Pattern**

This pattern is used to make core algorithms interchangeable and extensible.

#### **Driver Matching**

`DriverMatchingStrategy` allows the system to easily switch between different methods for finding drivers (e.g., nearest, highest-rated, least busy)

#### **Pricing**

`PricingStrategy` allows the fare calculation logic to be changed dynamically (e.g., flat rate, vehicle-based, surge pricing).

### **State Pattern**

The lifecycle of a `Trip` is managed using the State pattern. The `Trip` (Context) delegates state-specific behavior to its current `TripState` object. This avoids large conditional blocks and makes adding new states (e.g., `CancelledState`) easier.

### **Observer Pattern**

This pattern facilitates real-time communication. The `Trip` (Subject) automatically notifies the `Rider` and `Driver` (Observers) whenever its status changes, ensuring all parties are kept up-to-date.

### **Builder Pattern**

The `Trip.TripBuilder` is used for the complex construction of a `Trip` object. It ensures that a trip is only created with all the necessary information (rider, locations, fare), improving immutability and robustness.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Enums

```java
enum RideType {
    SEDAN,
    SUV,
    AUTO
}

enum DriverStatus {
    ONLINE,
    IN_TRIP,
    OFFLINE
}

enum TripStatus {
    REQUESTED,
    ASSIGNED,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}
```

These enums capture essential classifications and states for vehicles, drivers, and trip progress.

### 4.2 Location

Represents a geographic coordinate and computes Euclidean distance for simplicity.

```java
class Location {
    private final double latitude;
    private final double longitude;

    public Location(double latitude, double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public double distanceTo(Location other) {
        double dx = this.latitude - other.latitude;
        double dy = this.longitude - other.longitude;
        return Math.sqrt(dx * dx + dy * dy); // Euclidean for simplicity
    }

    @Override
    public String toString() {
        return "Location(" + latitude + ", " + longitude + ")";
    }
}
```

### 4.3 Vehicle

Encapsulates vehicle identity and classification, used for fare calculation and filtering compatible rides.

```java
class Vehicle {
    private final String licenseNumber;
    private final String model;
    private final RideType type;

    public Vehicle(String licenseNumber, String model, RideType type) {
        this.licenseNumber = licenseNumber;
        this.model = model;
        this.type = type;
    }

    public String getLicenseNumber() { return licenseNumber; }

    public String getModel() { return model; }

    public RideType getType() { return type; }
}
```

### TripObserver

```java
interface TripObserver {
    void onUpdate(Trip trip);
}
```

### 4.4 Users: Rider & Driver (Observer Pattern)

#### User

An abstract User class provides a common base for Rider and Driver, reducing code duplication for shared attributes like id, name, and tripHistory

```java
abstract class User implements TripObserver {
    private final String id;
    private final String name;
    private final String contact;
    private final List<Trip> tripHistory;

    public User(String name, String contact) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.contact = contact;
        this.tripHistory = new ArrayList<>();
    }

    public void addTripToHistory(Trip trip) {
        tripHistory.add(trip);
    }

    public List<Trip> getTripHistory() {
        return tripHistory;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getContact() {
        return contact;
    }
}
```

#### Rider

```java
class Rider extends User {
    public Rider(String name, String contact) {
        super(name, contact);
    }

    @Override
    public void onUpdate(Trip trip) {
        System.out.printf("--- Notification for Rider %s ---\n", getName());
        System.out.printf("  Trip %s is now %s.\n", trip.getId(), trip.getStatus());
        if (trip.getDriver() != null) {
            System.out.printf("  Driver: %s in a %s (%s)\n",
                    trip.getDriver().getName(), trip.getDriver().getVehicle().getModel(),
                    trip.getDriver().getVehicle().getLicenseNumber());
        }
        System.out.println("--------------------------------\n");
    }
}
```

#### Driver

```java
$d4
```

Both Rider and Driver implement the TripObserver interface. This is a key design choice that allows them to be "subscribed" to a Trip and receive real-time status updates via the onUpdate() method.

### 4.5 TripState (State Pattern)

Implements the **State Pattern** to encapsulate transitions between various stages of a ride:

- Requested → Assigned → InProgress → Completed

```java
$da
```

### 4.6 Trip

Encapsulates the lifecycle and behavior of a single ride.

```java
$e0
```

- Uses **Builder Pattern** for creation.
- Uses **State Pattern** for managing trip transitions.
- Uses **Observer Pattern** to notify driver and rider on state changes.

### 4.7 DriverMatchingStrategy (Strategy Pattern)

Implements **Strategy Pattern** to enable multiple matching algorithms.

```java
interface DriverMatchingStrategy {
    List<Driver> findDrivers(List<Driver> allDrivers, Location pickupLocation, RideType rideType);
}

class NearestDriverMatchingStrategy implements DriverMatchingStrategy {
    private static final double MAX_DISTANCE_KM = 5.0; // Max distance to consider a driver "nearby"

    @Override
    public List<Driver> findDrivers(List<Driver> allDrivers, Location pickupLocation, RideType rideType) {
        System.out.println("Finding nearest drivers for ride type: " + rideType);
        return allDrivers.stream()
                .filter(driver -> driver.getStatus() == DriverStatus.ONLINE)
                .filter(driver -> driver.getVehicle().getType() == rideType)
                .filter(driver -> pickupLocation.distanceTo(driver.getCurrentLocation()) <= MAX_DISTANCE_KM)
                .sorted(Comparator.comparingDouble(driver -> pickupLocation.distanceTo(driver.getCurrentLocation())))
                .collect(Collectors.toList());
    }
}
```

### 4.8 PricingStrategy (Strategy Pattern)

Encapsulates dynamic pricing logic using the **Strategy Pattern**. Strategies can vary based on vehicle type or flat distance.

```java
interface PricingStrategy {
    double calculateFare(Location pickup, Location dropoff, RideType rideType);
}

class FlatRatePricingStrategy implements PricingStrategy {
    private static final double BASE_FARE = 5.0;
    private static final double FLAT_RATE = 1.5;

    @Override
    public double calculateFare(Location pickup, Location dropoff, RideType rideType) {
        double distance = pickup.distanceTo(dropoff);
        return BASE_FARE + distance * FLAT_RATE;
    }
}

class VehicleBasedPricingStrategy implements PricingStrategy {
    private static final double BASE_FARE = 2.50;
    private static final Map<RideType, Double> RATE_PER_KM = Map.of(
            RideType.SEDAN, 1.50,
            RideType.SUV, 2.00,
            RideType.AUTO, 1.00
    );

    @Override
    public double calculateFare(Location pickup, Location dropoff, RideType rideType) {
        return BASE_FARE + RATE_PER_KM.get(rideType) * pickup.distanceTo(dropoff);
    }
}
```

### 4.9 RideSharingService (Singleton + Facade)

Acts as the central coordinator. This class is a **Singleton** that provides a simplified, high-level API to the entire complex subsystem.

```java
$e9
```

- Uses **Singleton Pattern** for global access.
- Implements **Facade Pattern** to abstract complex workflows like ride creation, driver assignment, and trip state transitions.

### 4.10 RideSharingServiceDemo

The demo class validates the end-to-end functionality by simulating a rider requesting and completing a trip.

```java
$ef
```

---

# 5. Run and Test

---

# 6. Quiz
