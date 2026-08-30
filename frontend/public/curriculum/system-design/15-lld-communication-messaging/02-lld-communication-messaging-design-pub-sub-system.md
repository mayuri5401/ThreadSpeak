---
id: "lld-communication-messaging-design-pub-sub-system"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Communication Messaging"
subSection: ""
title: "Design Pub Sub System"
slug: "lld-communication-messaging-design-pub-sub-system"
summary: "In this chapter, we will explore the low-level design of a simple in-memory pub-sub system."
eli10: "Imagine Design Pub Sub System as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Pub Sub System Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Communication Messaging","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Pub Sub System"
  code: |
    class Message {
        private final String payload;
        private final Instant timestamp;
    
        public Message(String payload) {
            this.payload = payload;
            this.timestamp = Instant.now();
        }
    
        public String getPayload() {
            return payload;
        }
    
        @Override
        public String toString() {
            return "Message{" + "payload='" + payload + '\'' + '}';
        }
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Pub-Sub System"
>
> A **Publish-Subscribe (Pub-Sub) system** is a messaging pattern where **publishers** send messages to **topics** without knowing who will receive them, and **subscribers** receive messages by subscribing to those topics.
>
> 
> <!-- Simulation: pub-sub -->
> 

>
> This decouples senders and receivers, making it easier to build scalable and flexible systems. Popular examples include Kafka, Redis Pub/Sub, and Google Cloud Pub/Sub.

In this chapter, we will explore the **low-level design of a simple in-memory pub-sub system**.

Lets start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the system support multiple publishers and subscribers for a single topic"
>
> **Interviewer:** Yes, each topic can have multiple publishers and multiple subscribers. For this design, the publisher can simply be the client / demo using it.
>
> **Candidate:** Should message delivery be synchronous or asynchronous"
>
> **Interviewer:** It should be asynchronous. When a publisher sends a message, it should not wait for subscribers to consume it.
>
> **Candidate:** Do we need to guarantee message ordering for subscribers"
>
> **Interviewer:** Yes, messages within a topic should be delivered to each subscriber in the order they were published.
>
> **Candidate:** Should we support different delivery semantics like exactly-once or at-least-once delivery"
>
> **Interviewer:**  For this design, let’s keep it simple and go with a "fire-and-forget" model. That means best-effort delivery without retries, acknowledgments, or delivery guarantees.
>
> **Candidate:** Can subscribers unsubscribe at any point during runtime"
>
> **Interviewer:** Yes, subscribers should be able to dynamically subscribe and unsubscribe from topics at any time.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Support **creation** and **management** of multiple topics
- Allow **multiple publishers** to publish messages to a topic
- Allow **multiple subscribers** to subscribe to one or more topics
- Deliver messages to all **active subscribers** of a topic in the order they were published
- Ensure **non-blocking**, **asynchronous** message delivery
- Follow a **"fire-and-forget"** delivery model: no retries, or acknowledgments

## 1.2 Non-Functional Requirements

- **Modularity:** The system should follow object-oriented principles with clear separation of responsibilities
- **Scalability:** The system should efficiently support many concurrent publishers and subscribers
- **Extensibility:** The design should be flexible enough to support future enhancements such as message persistence, retries, or delivery guarantees
- **Reliability:** While exact delivery guarantees are not required, message ordering and dispatching must remain consistent and predictable within each topic

After the requirements are clear, lets identify the core entities/objects we will have in our system.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing the functional requirements and highlighting the key nouns and responsibilities that naturally map to object-oriented abstractions such as classes, interfaces, or enums.

Let’s walk through the functional requirements and extract the relevant entities:

#### **1. Support creation and management of multiple topics.**

This suggests the need for a `Topic` entity, which acts as a named communication channel. Each topic maintains a list of subscribers and is responsible for dispatching published messages to them in order.

#### **2. Multiple publishers can publish messages to a topic.**

This introduces the need for a `Message` entity to represent each published unit of communication.

For this design, we can treat the client or demo class as the publisher. There is no need for a separate `Publisher` class unless extended functionality is required.

A central `PubSubService` entity will serve as the orchestrator of the system.** **It will handle topic creation, manage subscriptions, accept published messages and route them to appropriate topic for distribution.

#### **3. Multiple subscribers can subscribe to one or more topics.**

This indicates the need for a `Subscriber` entity, which registers interest in specific topics and receives messages from them.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - `Topic`: Represents a named communication channel. Manages a list of subscribers and distributes messages to them asynchronously.
> - `Message:`** **Represents a single unit of data published to a topic. Contains metadata such as payload, timestamp, and possibly a unique identifier.
> - `Subscriber`: Represents an entity that listens to messages from one or more topics. Can subscribe/unsubscribe at runtime.
> - `PubSubService:`** **The central coordinator. Provides APIs for creating topics, managing subscriptions, and routing published messages to the appropriate topic.

These core entities define the key abstractions of a Pub-Sub system and will guide the structure of our low-level design and class diagrams.

---

# 3. Class Design

This section details the classes, their relationships, and the design patterns used to structure the Pub-Sub system.

## 3.1 Class Definitions

The system is built around a few core classes and interfaces that manage topics, messages, and subscribers.

### Data Classes

#### `Message`

A simple, immutable Data Transfer Object (DTO) that represents the data being transmitted.

It contains a `String` **payload** and an `Instant` **timestamp**. Its immutability makes it inherently thread-safe.

#### Core Classes

#### `Subscriber` (Interface)

Defines the contract for any class that wishes to receive messages.

It declares two methods: `getId()` to uniquely identify the subscriber and `onMessage(Message message)` which is the callback method invoked when a message is delivered.

`AlertSubscriber` & `NewsSubscriber`

These are concrete implementations of the `Subscriber` interface. They demonstrate how different types of subscribers can handle the same message in unique ways, promoting system flexibility.

#### `Topic`

Represents a distinct message channel.

It maintains a thread-safe set of `Subscriber` objects and is responsible for broadcasting messages to them. Message delivery is handled asynchronously using an `ExecutorService` to avoid blocking the publisher.

#### `PubSubService`

The central entry point and control hub for the entire system.

It manages the lifecycle of topics and provides a clean API for clients to publish messages and manage subscriptions. It is implemented as a Singleton to ensure a single point of control.

## 3.2 Class Relationships

The relationships between classes define the system's architecture, ensuring loose coupling and high cohesion.

### **Composition**

A strong "has-a" relationship where one object owns another.

- `PubSubService` **has** `Topic`s: The `PubSubService` creates and manages a `Map<String, Topic>`. The lifecycle of a `Topic` is controlled entirely by the `PubSubService`.
- `Topic` **has** `Subscriber`s: A `Topic` manages a `Set<Subscriber>` for its channel. It controls which subscribers are associated with it.

### **Association**

A "has-a" relationship where objects are related but have independent lifecycles.

- `PubSubService` **has an** `ExecutorService`: The service creates and owns a thread pool for message delivery.
- `Topic` **is associated with an** `ExecutorService`: Each topic is given a reference to the shared `ExecutorService` from `PubSubService` to perform its broadcasting tasks.

### **Implementation**

An "is-a" relationship based on an interface contract.

- `AlertSubscriber` and `NewsSubscriber` **are** `Subscriber`s. They both implement the `Subscriber` interface, providing concrete logic for the `onMessage()` method.

### **Dependency**

A "uses-a" relationship where one class depends on another to perform its function.

- The `PubSubService`, `Topic`, and `Subscriber` classes all **depend** on the `Message` class to publish, broadcast, and receive data, respectively.

## 3.3 Key Design Patterns

Several design patterns are employed to create a robust, scalable, and maintainable system.

### [**Observer Pattern**](/learn/lld/observer)

This is the foundational pattern of the system.

- **Subject**: The `Topic` class acts as the subject. It maintains a list of observers and notifies them of state changes (new messages).
- **Observer**: The `Subscriber` interface acts as the observer. Concrete subscribers (`NewsSubscriber`, `AlertSubscriber`) register with a `Topic` to receive updates.
- **Mechanism**: When `PubSubService.publish()` is called, the corresponding `Topic`'s `broadcast()` method iterates through its `Subscriber` list and calls the `onMessage()` method on each one, decoupling the `Topic` from the concrete `Subscriber` implementations.

### [**Strategy Pattern**](/learn/lld/strategy)

The `Subscriber` interface can be viewed as a strategy interface. It defines an algorithm (`onMessage`). Concrete implementations (`AlertSubscriber`, `NewsSubscriber`) provide different strategies for how a message should be processed. The `Topic` is configured with a set of these strategies (its subscribers) and applies them when a message is broadcast.

### [**Facade Pattern**](/learn/lld/facade)

The `PubSubService` serves as a facade. It provides a simplified, high-level interface (`createTopic`, `subscribe`, `publish`) to the client, hiding the more complex underlying components and interactions, such as topic creation, subscriber registration, and asynchronous message delivery.

### [**Singleton Pattern**](/learn/lld/singleton)

The `PubSubService` is implemented as a singleton. This ensures there is only one instance managing all topics and the shared thread pool, providing a single, globally accessible point of control for the entire pub-sub mechanism.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Message

This class is a simple, immutable Data Transfer Object (DTO) that represents the content being sent through the system.

```java
class Message {
    private final String payload;
    private final Instant timestamp;

    public Message(String payload) {
        this.payload = payload;
        this.timestamp = Instant.now();
    }

    public String getPayload() {
        return payload;
    }

    @Override
    public String toString() {
        return "Message{" + "payload='" + payload + '\'' + '}';
    }
}
```

Each `Message` includes:

- A `payload`: the actual message text.
- A `timestamp`: marks when the message was created.

The **payload** and **timestamp** fields are marked as final, making Message objects immutable. 

### 4.2 Subscriber Interface and Implementations

The **Subscriber interface** defines the contract for any object that wishes to receive messages. This follows the **Observer design pattern**, allowing the system to be decoupled from the concrete classes that consume messages.

```java
interface Subscriber {
    String getId();
    void onMessage(Message message);
}

class AlertSubscriber implements Subscriber {
    private final String id;

    public AlertSubscriber(String id) {
        this.id = id;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void onMessage(Message message) {
        System.out.printf("!!! [ALERT - %s] : '%s' !!!%n", id, message.getPayload());
    }
}

class NewsSubscriber implements Subscriber {
    private final String id;

    public NewsSubscriber(String id) {
        this.id = id;
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void onMessage(Message message) {
        System.out.printf("[Subscriber %s] received message '%s'%n", id, message.getPayload());
    }
}
```

The `onMessage()` method is called when a message is delivered.

Two different subscriber types simulate real-world use cases:

- `AlertSubscriber`: Reacts to critical alerts.
- `NewsSubscriber`: Receives general news.

Each implementation customizes the display behavior of received messages.

### 4.3 Topic

A Topic represents a distinct channel for messages. It maintains its own list of subscribers and is responsible for broadcasting messages to them.

```java
$b7
```

Represents a channel to which messages are published and from which subscribers receive messages.

- `subscribers`: A thread-safe set of subscribers.
- `broadcast()`: Asynchronously delivers a message to all subscribers using a thread pool.

### 4.4 PubSubService (Singleton)

This is the main facade for the system. It manages the lifecycle of topics and provides a centralized API for clients to interact with the system.

```java
$ba
```

- **Singleton Pattern:** The service is implemented as a singleton to ensure a single, central point of control for the pub/sub functionality within the application.
- Maintains a registry of all topics.
- Uses a shared executor to handle asynchronous message delivery.

#### Methods:

- `createTopic()`: Creates a new topic if it doesn't already exist.
- `subscribe()` / `unsubscribe()`: Manage subscriber enrollment.
- `publish()`: Triggers broadcast of a message to all subscribers of a topic.

### 4.5 Demo: PubSubDemo

The LoggingFrameworkDemo class demonstrates how a client would use the PubSubService to create topics, manage subscriptions, and publish messages.

```java
$c0
```

---

# 5. Run and Test

---

# 6. Quiz
