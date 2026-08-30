---
id: "lld-managing-states-design-traffic-control-system"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Managing States"
subSection: ""
title: "Design Traffic Control System"
slug: "lld-managing-states-design-traffic-control-system"
summary: "In this chapter, we will explore the low-level design of a traffic control signal system in detail."
eli10: "Imagine Design Traffic Control System as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Traffic Control System Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Managing States","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Traffic Control System"
  code: |
    enum Direction {
        NORTH, 
        SOUTH, 
        EAST, 
        WEST
    }
    
    enum LightColor {
        GREEN,
        YELLOW,
        RED
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a **Traffic Control System"**
>
> A **Traffic Control Signal System** is an automated system used to manage the movement of vehicles and pedestrians at road intersections by controlling traffic lights (red, yellow, green) in a coordinated and safe manner.
>
> 
> <!-- Simulation: traffic-control -->
> 

>
> Its main objectives are to:
>
> - **Regulate traffic flow** by assigning right-of-way through signal phases
> - **Reduce congestion** and waiting times at busy intersections
> - **Enhance safety** by preventing collisions and ensuring orderly movement

In this chapter, we will explore the **low-level design of a traffic control signal system** in detail.

Lets start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the system handle just a single intersection or manage multiple intersections concurrently"
>
> **Interviewer:** It should be able to manage multiple intersections, each operating independently but centrally monitored.
>
> **Candidate:** Do we need to handle emergency scenarios like green light overrides for ambulances or fire trucks"
>
> **Interviewer:** Not for this version. Assume normal conditions.
>
> **Candidate:** Should the system simulate real-world timing for green, yellow, and red lights"
>
> **Interviewer:** Yes. Each intersection should respect configurable durations for green and yellow lights. Red is implied by the other directions being green.
>
> **Candidate:** Should we monitor traffic light changes in real time" **Interviewer:** Yes, notify a central monitor  when lights change.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Handle multiple intersections, each operating independently
- Control signals for all four directions at a single intersection
- Support fixed configurable timing intervals for each signal phase (green, yellow, red)
- Automatically cycle through signal phases in the correct order
- Notify a central monitor when the traffic light state changes.

## 1.2 Non-Functional Requirements

- **Modularity:** The system should have clearly separated components
- **Extensibility:** The design should be easily extensible to support future additions
- **Real-Time Responsiveness:** Timing should be precise to the second, ensuring synchronization across lights
- **Maintainability:** The code should follow object-oriented design and be easy to update or extend
- **Safety:** The system must prevent conflicting signals from being active simultaneously

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing the key nouns and responsibilities from the functional requirements, which naturally map to object-oriented abstractions like classes, enums, and interfaces.

Let’s walk through the functional requirements and extract the relevant entities:

#### **1. Handle multiple intersections, each with signals for four directions.**

This immediately suggests an `IntersectionController` entity to manage a single intersection. Each intersection is composed of multiple signal lights, leading to a `TrafficLight` entity. The directions themselves can be represented by a `Direction` enum (NORTH, SOUTH, EAST, WEST).

#### **2. Automatically cycle through signal phases (green, yellow, red) with configurable timing.**

The colors of a traffic light are a fixed set of states, making a `LightColor` enum (GREEN, YELLOW, RED) appropriate. The complex, state-dependent behavior of both a single light and the entire intersection is a perfect fit for the State design pattern.

This leads to two distinct state abstractions:

1. `SignalState`** (Interface)**: Manages the lifecycle of a single TrafficLight (e.g., GreenState transitions to YellowState).
2. `IntersectionState`** (Interface)**: Manages the overall traffic flow for an IntersectionController (e.g., NorthSouthGreenState transitions to EastWestGreenState), orchestrating the states of all its individual lights.

#### **3. Notify a central monitor when a traffic light's state changes.**

This requirement is a classic use case for the Observer design pattern. It introduces a TrafficObserver interface that a monitoring component can implement. A `CentralMonitor` class is a concrete implementation of this observer. The TrafficLight acts as the Subject, notifying all its subscribed observers whenever its color changes.

#### **4. Provide a central management point for the entire system.**

To manage the network of multiple `IntersectionController` instances, a top-level entity is needed. The `TrafficControlSystem` class serves this purpose, acting as a Facade and Singleton. It provides a simple API to add intersections and start or stop the entire simulation, hiding the underlying complexity of threading and state management.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - `Enums` (Direction, LightColor): Define fixed sets of constants for traffic directions and light colors, ensuring type safety and consistency.
> - `IntersectionController`: Manages a single intersection's traffic flow. It contains four TrafficLight objects, cycling through traffic phases.
> - `TrafficLight`: Represents a single traffic signal for a specific direction.
> - `IntersectionState`** (Interface)**: Defines the contract for the high-level State pattern that controls the entire intersection's behavior (e.g., NorthSouthGreenState, EastWestGreenState).
> - `SignalState`** (Interface)**: Defines the contract for the low-level State pattern that manages an individual TrafficLight's color lifecycle (e.g., GreenState, YellowState).
> - `CentralMonitor`: A concrete implementation of TrafficObserver that logs light changes to the console.
> - `TrafficControlSystem`: A Facade and Singleton that serves as the main entry point for the application. It manages the lifecycle of all IntersectionController instances.

These core entities define the essential abstractions of a Traffic Control Signal System and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

- `Direction`: Represents the four cardinal directions of traffic flow at an intersection (`NORTH`, `SOUTH`, `EAST`, `WEST`).
- `LightColor`: Defines the possible colors of a traffic signal (`GREEN`, `YELLOW`, `RED`).

### **Data Classes**

This design does not utilize simple data classes, as most objects encapsulate both state and behavior.

### **Core Classes**

#### `TrafficLight`

Represents a single traffic signal for a specific direction.

It acts as the **Context** for the `SignalState` pattern and the **Subject** for the `TrafficObserver` pattern, notifying observers when its color changes.

#### `IntersectionController`

The core engine for a single intersection.

It manages four `TrafficLight` objects and runs in its own thread. It acts as the **Context** for the `IntersectionState` pattern, delegating the complex task of coordinating all four lights to its current state object. Its construction is handled by a nested `Builder`.

#### `TrafficControlSystem`** (Singleton & Facade)**

The primary entry point for the application.

It manages the entire network of `IntersectionController`s, provides a simplified API for system-wide operations, and coordinates the threads for each intersection.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- `TrafficControlSystem` is composed of a list of `IntersectionController`s, managing their lifecycle.
- An `IntersectionController` is composed of a map of `TrafficLight`s, one for each `Direction`.

### **Association**

- An `IntersectionController` (Context) is associated with its current `IntersectionState`.
- A `TrafficLight` (Context) is associated with its current `SignalState`.
- A `TrafficLight` (Subject) is associated with a list of `TrafficObserver`s.

### **Inheritance / Implementation**

- Concrete `SignalState` classes (`GreenState`, etc.) implement the `SignalState` interface.
- Concrete `IntersectionState` classes (`NorthSouthGreenState`, etc.) implement the `IntersectionState` interface.
- `CentralMonitor` implements the `TrafficObserver` interface.
- `IntersectionController` implements the `Runnable` interface to allow it to run in a separate thread.

### **Dependency**

- The client (`TrafficSystemDemo`) depends on the `TrafficControlSystem` facade to set up and run the simulation.
- The `TrafficControlSystem` depends on the `IntersectionController.Builder` to create and configure new intersections.
- An `IntersectionState` depends on its `IntersectionController` (context) to access the traffic lights it needs to control.

## 3.3 Key Design Patterns

### **State Pattern (Nested)**

This is the most prominent pattern, used at two levels.

#### [**Low-Level (Signal Control)**](/learn/lld/state)

Each `TrafficLight` uses the State pattern with `SignalState` to manage its own simple, linear lifecycle (Green -> Yellow -> Red).

#### **High-Level (Intersection Control)**

The `IntersectionController` uses the State pattern with `IntersectionState` to manage the complex, cyclical flow of the entire intersection (e.g., N-S Green cycle -> E-W Green cycle). The high-level state orchestrates the low-level states of the individual lights.

### [**Observer Pattern**](/learn/lld/observer)

This pattern decouples the operational logic of a `TrafficLight` from any monitoring or logging systems. The `TrafficLight` (Subject) notifies all registered `TrafficObserver`s (like `CentralMonitor`) whenever its color changes, without needing to know the specifics of the observers.

### [**Builder Pattern**](/learn/lld/builder)

The `IntersectionController.Builder` provides a fluent API for constructing `IntersectionController` objects. This allows for flexible and readable configuration of parameters like signal durations and observers.

### [**Facade Pattern**](/learn/lld/facade)

`TrafficControlSystem` also acts as a facade. It provides a simple, high-level API (`addIntersection`, `startSystem`, `stopSystem`) that hides the underlying complexity of managing threads, controllers, states, and observers from the client.

### [**Singleton Pattern**](/learn/lld/singleton)

`TrafficControlSystem` is implemented as a singleton to ensure there is a single, globally accessible point of control for the entire network of traffic intersections.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Enums

```java
enum Direction {
    NORTH, 
    SOUTH, 
    EAST, 
    WEST
}

enum LightColor {
    GREEN,
    YELLOW,
    RED
}
```

- `Direction` represents traffic flow directions at an intersection.
- `LightColor` indicates the current color of a traffic signal.

### 4.2 `SignalState` (State Pattern for Signal Light)

The first application of the State pattern manages the lifecycle of a single traffic light (Red -> Green -> Yellow -> Red).

Each state class encapsulates the behavior for a specific light color.

```java
interface SignalState {
    void handle(TrafficLight context);
}

class YellowState implements SignalState {
    @Override
    public void handle(TrafficLight context) {
        context.setColor(LightColor.YELLOW);
        // After being yellow, the next state is red.
        context.setNextState(new RedState());
    }
}

class GreenState implements SignalState {
    @Override
    public void handle(TrafficLight context) {
        context.setColor(LightColor.GREEN);
        // After being green, the next state is yellow.
        context.setNextState(new YellowState());
    }
}

class RedState implements SignalState {
    @Override
    public void handle(TrafficLight context) {
        context.setColor(LightColor.RED);
        // Red is a stable state, it transitions to green only when the intersection controller commands it.
        // So, the next state is self.
        context.setNextState(new RedState());
    }
}
```

### 4.3 `IntersectionState` (State Pattern for Intersection Control)

The second, higher-level application of the State pattern manages the overall state of an entire intersection (e.g., "North-South flow is green" vs. "East-West flow is green").

Each state class encapsulates the logic for a complete traffic flow cycle.

```java
$bd
```

Each IntersectionState orchestrates the behavior of all four TrafficLight objects within its intersection. It commands which lights turn green, waits for the appropriate durations, and then commands them to transition.

### 4.4 `TrafficObserver` (Observer Pattern)

This implements the Observer pattern to monitor light changes.

Observes real-time updates of traffic light color changes. Can be extended to integrate with dashboards or alert systems.

```java
interface TrafficObserver {
    void update(int intersectionId, Direction direction, LightColor color);
}

class CentralMonitor implements TrafficObserver {
    @Override
    public void update(int intersectionId, Direction direction, LightColor color) {
        System.out.printf("[MONITOR] Intersection %d: Light for %s direction changed to %s.\n",
                intersectionId, direction, color);
    }
}
```

### 4.5 `TrafficLight`

Models a single direction's traffic light.

```java
$c4
```

Notifies observers on state change. Uses `SignalState` to manage transitions (e.g., green → yellow → red).

### 4.6 `IntersectionController` (Runnable)

This class manages a single intersection, runs in its own thread, and acts as the "Context" for the IntersectionState pattern.

```java
$ca
```

Each controller manages 4-directional lights. Uses the **Builder pattern** to support configurable durations and observers.

### 4.7 `TrafficControlSystem` (Facade + Singleton)

This is the main entry point for managing the entire network of intersections.

```java
$d0
```

Acts as a **Facade** for managing all intersections. Uses **Singleton pattern** to centralize system control and coordinates threading via an `ExecutorService`.

### 4.8 `TrafficSystemDemo`

The demo class shows how a client would interact with the system facade.

```java
public class TrafficSystemDemo {
    public static void main(String[] args) {
        // 1. Get the singleton TrafficControlSystem instance
        TrafficControlSystem system = TrafficControlSystem.getInstance();

        // 2. Add intersections to the system
        system.addIntersection(1, 500, 200);
        system.addIntersection(2, 700, 150);

        // 3. Start the system
        system.startSystem();

        // 4. Let the simulation run for a while (e.g., 5 seconds)
        try {
            TimeUnit.SECONDS.sleep(5);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        // 5. Stop the system gracefully
        system.stopSystem();
    }
}
```

---

# 5. Run and Test

---

# 6. Quiz
