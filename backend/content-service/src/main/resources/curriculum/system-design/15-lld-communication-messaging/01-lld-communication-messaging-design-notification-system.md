---
id: "lld-communication-messaging-design-notification-system"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Communication Messaging"
subSection: ""
title: "Design Notification System"
slug: "lld-communication-messaging-design-notification-system"
summary: "In this chapter, we will explore the low-level design of a Notification System in detail."
eli10: "Imagine Design Notification System as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Notification System Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Communication Messaging","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Notification System"
  code: |
    enum NotificationType {
        EMAIL,
        SMS,
        PUSH
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Notification System"
>
> A Notification System is a critical component in modern applications used to inform users about events such as new messages, payment updates, reminders, and alerts.
>
> 
> <!-- Simulation: notification-system -->
> 

>
> For example, when a user receives a friend request or their order is shipped, the system should notify them via their preferred channels (like email or push notification) based on their settings.

In this chapter, we will explore the **low-level design of a Notification System** in detail.

Let’s start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before diving into the design, it’s essential to clarify how the notification system is expected to behave. Asking the right questions helps uncover assumptions, define boundaries, and shape the system with confidence and clarity.

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate**: What types of notifications should the system support"
>
> **Interviewer**: Let's support three types for now: EMAIL, SMS, and PUSH.
>
> **Candidate**: Should we support retry logic in case a notification fails"
>
> **Interviewer**: Yes, retrying failed deliveries is important. Assume a simple retry mechanism with a maximum number of retries and a delay between attempts.
>
> **Candidate**: Should sending be synchronous or asynchronous"
>
> **Interviewer**: Asynchronous. The system should not block while sending notifications.
>
> **Candidate**: Will the system support bulk notifications or just single notifications per request"
>
> **Interviewer**: For this version, let’s keep it simple and only support sending one notification at a time.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- The system should support sending notifications via **EMAIL**, **SMS**, and **PUSH**.
- Each **notification** targets a single recipient and a specific channel.
- The system should **send notifications asynchronously**.
- If sending fails, the system should **retry** the operation a few times before giving up.
- Notifications may contain a **subject** (optional) and a **message body** (mandatory).

## 1.2 Non-Functional Requirements

- The system should follow **object-oriented design** with clear separation of concerns.
- It should be **extensible**, allowing future support for new notification types (e.g., WhatsApp, Slack).
- Delivery should be **non-blocking**, using a **thread pool** to manage parallel sending.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing the functional requirements and highlighting the key nouns and responsibilities that naturally map to object-oriented abstractions such as classes, enums, or interfaces.

Let’s walk through the functional requirements and extract the relevant entities:

#### **The system must send a message to a specific user.**

This implies the need for an entity to represent the message itself, which we will call **Notification**. This class will encapsulate all the data related to a single message, such as its content, subject, and a unique identifier. It also requires an entity to represent the destination user, which we'll call **Recipient**. This class will hold the user's ID and all their potential contact points, like an email address, phone number, or push notification token.

#### **The system must support various delivery channels, such as Email, SMS, and Push notifications.**

Since the set of channels is predefined and fixed, this is a perfect use case for an enum. We will define a **NotificationType** enum to represent the possible channels (EMAIL, SMS, PUSH). This provides type safety and makes the code more readable.

#### **The system should provide a simple, unified interface for clients and handle sending operations asynchronously.**

To hide the complexity of factory selection, decoration, and asynchronous execution, we introduce a central facade class, the **NotificationService**. This class will be the main entry point for clients. It will manage a thread pool to process sending requests off the main thread, select the correct gateway, wrap it with retry logic, and execute the send operation.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **NotificationType**: An enum that defines the supported delivery channels (e.g., EMAIL, SMS, PUSH).
> - **Recipient**: Represents the end-user who will receive the notification. It stores the user's ID and their contact information for various channels.
> - **Notification**: Represents the message to be sent. It contains the recipient, type, message content, and other metadata like a subject. A Builder is used for its construction.
> - **NotificationService**: Acts as a Facade for the system, providing a simple public API. It orchestrates the entire process of sending a notification, including asynchronous execution and applying retry logic.

These core entities define the key abstractions of the notification system and will guide the structure of our low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section details the design of each class identified previously, including their specific attributes and methods. We will also illustrate how these classes relate to one another and highlight the key design patterns that underpin our solution.

## 3.1 Class Definitions

We can categorize our classes into enums, data-holding classes, and core classes that encapsulate the system's primary logic.

### Enums

#### **NotificationType**

A type-safe enumeration to represent the different communication channels the system supports. It prevents errors from using invalid string literals and simplifies logic that depends on the channel type.

### Data Classes

#### Recipient

A data container that holds all necessary contact information for a single user.

**Attributes**:

- userId: A String that uniquely identifies the user.
- email, phoneNumber, pushToken: Optional<String> fields holding the contact details for each channel. Using Optional clearly communicates that a recipient may not have contact information for every channel.

#### Notification

Represents a single notification request.

**Attributes**:

- id: A unique String identifier for the notification.
- recipient: The Recipient object to whom the notification is addressed.
- type: The NotificationType enum indicating the delivery channel.
- message: The String content of the notification body.
- subject: An optional String for the subject line, primarily used for emails.

### Core Classes

#### NotificationService

Acts as the main entry point and Facade for the system. It hides the complexity of gateway creation, decoration, and asynchronous execution from the client.

**Attributes**:

- executor: An ExecutorService (thread pool) to handle notification sending asynchronously.

**Methods**:

- sendNotification(Notification notification): The primary public method. It accepts a Notification object and submits a task to the thread pool to handle the sending process.
- shutdown(): A method to gracefully shut down the internal thread pool.

## 3.2 Class Relationships

### **Implementation**

EmailGateway, SmsGateway, PushGateway, and RetryableGatewayDecorator **are all implementations of** the NotificationGateway interface.

### **Composition**

- RetryableGatewayDecorator **has a** NotificationGateway. It holds a reference to the gateway it decorates.
- NotificationService **has an** ExecutorService to manage its thread pool.
- A Notification **has a** Recipient and a NotificationType.

### **Dependency**

- The NotificationService **uses** the NotificationFactory to get a gateway and **uses** the RetryableGatewayDecorator to add retry logic.
- Concrete gateways (e.g., EmailGateway) **use** the Notification and Recipient objects to extract the data needed for sending.

## 3.3 Key Design Patterns

### [Strategy Pattern](/learn/lld/strategy)

The NotificationGateway interface and its concrete implementations (EmailGateway, SmsGateway, etc.) embody the Strategy Pattern.

Each gateway is a different "strategy" for sending a notification. The system can select and use the appropriate strategy at runtime based on the NotificationType.

### [**Factory Pattern (Simple Factory)**](/learn/lld/factory-method)

The NotificationFactory implements a Simple Factory. It encapsulates the instantiation logic for the family of NotificationGateway objects, decoupling the NotificationService from the knowledge of which concrete gateway class to create.

### [Builder Pattern](/learn/lld/builder)

The Notification.Builder inner class is used to construct Notification objects.

This pattern is ideal for objects with many parameters, especially optional ones, as it improves code readability and maintainability compared to telescoping constructors.

### [**Decorator **Pattern](/learn/lld/decorator)

The `RetryableGatewayDecorator` is a prime example of the Decorator Pattern. It dynamically adds behavior (retry logic) to any NotificationGateway object without affecting other objects of the same class.

### [**Facade **Pattern](/learn/lld/facade)

The `NotificationService` acts as a Facade. It provides a single, simplified interface to the client, hiding the complex underlying subsystem of factories, multiple gateway types, decorators, and asynchronous processing. The client only needs to interact with `sendNotification()`.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 NotificationType Enum

Defines the types of notifications supported in the system

```java
enum NotificationType {
    EMAIL,
    SMS,
    PUSH
}
```

### 4.2 Recipient

Represents the notification recipient.

```java
class Recipient {
    private final String userId;
    private final Optional<String> email;
    private final Optional<String> phoneNumber;
    private final Optional<String> pushToken;

    public Recipient(String userId, String email, String phoneNumber, String pushToken) {
        this.userId = userId;
        this.email = Optional.ofNullable(email);
        this.phoneNumber = Optional.ofNullable(phoneNumber);
        this.pushToken = Optional.ofNullable(pushToken);
    }

    public String getUserId() {
        return userId;
    }

    public Optional<String> getEmail() {
        return email;
    }

    public Optional<String> getPhoneNumber() {
        return phoneNumber;
    }

    public Optional<String> getPushToken() {
        return pushToken;
    }
}
```

- Contains user identifier and optional contact methods: `email`, `phoneNumber`, and `pushToken`
- Uses `Optional` to represent possibly unavailable channels

### 4.3 Notification

Encapsulates the complete notification message to be delivered.

```java
$ba
```

- Includes `id`, `recipient`, `type`, `subject`, and `message`
- Uses the **Builder Pattern** to construct flexible, optional-parameter-based notifications

### 4.4 NotificationGateway

Defines a contract for all notification delivery mechanisms. Each concrete implementation sends notifications through a specific channel (Email, SMS, or Push)

```java
$c0
```

- **EmailGateway: **Sends notifications via email. Requires recipient's email and subject.
- **PushGateway:** Sends notifications as push messages. Uses the push token.
- **SmsGateway**: Sends text messages to mobile numbers. Requires a valid phone number.

### 4.5 NotificationFactory

Implements the **Factory Pattern** to instantiate appropriate gateway based on `NotificationType`.

```java
class NotificationFactory {
    private static final Map<NotificationType, NotificationGateway> gatewayMap = new HashMap<>();

    public static NotificationGateway createGateway(NotificationType type) {
        if (gatewayMap.containsKey(type)) {
            return gatewayMap.get(type);
        }

        NotificationGateway gateway = null;

        switch (type) {
            case EMAIL:
                gateway = new EmailGateway();
                break;
            case SMS:
                gateway = new SmsGateway();
                break;
            case PUSH:
                gateway = new PushGateway();
                break;
        }

        gatewayMap.put(type, gateway);
        return gateway;
    }
}
```

Uses caching (`gatewayMap`) to reuse gateway instances

### 4.6 RetryableGatewayDecorator

Implements the **Decorator Pattern** to enhance any `NotificationGateway` with retry logic.

```java
$c6
```

- Automatically retries failed sends up to a defined number of attempts
- Adds delay between retries and logs retry attempts

### 4.7 NotificationService

The **Facade** and **Executor-backed asynchronous orchestrator** of the system.

```java
class NotificationService {
    private final ExecutorService executor;

    public NotificationService(int poolSize) {
        this.executor = Executors.newFixedThreadPool(poolSize);
    }

    public void sendNotification(Notification notification) {
        executor.submit(() -> {
            NotificationGateway gateway = new RetryableGatewayDecorator(
                    NotificationFactory.createGateway(notification.getType()),
                    3,
                    1000);
            try {
                gateway.send(notification);
            } catch (Exception e) {
                System.out.println("Exception while sending notification: " + e);
            }
        });
    }

    public void shutdown() {
        executor.shutdown();
    }
}
```

- Receives notification requests and dispatches them using the appropriate decorated gateway
- Uses a thread pool (`ExecutorService`) for parallel delivery
- Wraps each send operation with retry capability

### 4.8 NotificationSystemDemo

Demonstrates the usage of the notification system.

```java
$cc
```

- Registers the service
- Defines recipients
- Sends sample notifications across all supported channels
- Simulates asynchronous behavior and clean shutdown

---

# 5. Run and Test

---

# 6. Quiz
