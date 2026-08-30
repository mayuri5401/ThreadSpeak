---
id: "lld-communication-messaging-design-simple-chat-application"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Communication Messaging"
subSection: ""
title: "Design Simple Chat Application"
slug: "lld-communication-messaging-design-simple-chat-application"
summary: "In this chapter, we will explore the low-level design of a simple in-memory chat application."
eli10: "Imagine Design Simple Chat Application as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Simple Chat Application Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Communication Messaging","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Simple Chat Application"
  code: |
    class User {
        private final String id;
        private final String name;
    
        public User(String name) {
            this.id = UUID.randomUUID().toString();
            this.name = name;
        }
    
        public String getId() {
            return id;
        }
    
        public String getName() {
            return name;
        }
    
        public void onMessageReceived(Message message, Chat chatContext) {
            System.out.printf("[Notification for %s in chat '%s'] %s: %s\n",
                    this.getName(), chatContext.getName(this), message.getSender().getName(), message.getContent());
        }
    
        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            User user = (User) o;
            return id.equals(user.id);
        }
    
        @Override
        public int hashCode() {
            return Objects.hash(id);
        }
    
        @Override
        public String toString() {
            return "User{" + "id='" + id + '\'' + ", name='" + name + '\'' + '}';
        }
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Chat Application"
>
> A **chat application** enables real-time communication between users through text-based messages. It is commonly used in personal messaging, customer support, collaboration tools, and social networking platforms.
>
> 
> <!-- Simulation: chat-app -->
> 

In this chapter, we will explore the **low-level design of a simple in-memory chat application**.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the application support both one-on-one and group chats"
>
> **Interviewer:** Yes, it should support both types of conversations.
>
> **Candidate:** Can the users edit or delete message after sending"
>
> **Interviewer:** No. Once a message is sent, it cannot be modified or deleted.
>
> **Candidate:** Should users be able to see their chat history"
>
> **Interviewer:** Yes, the system should store and display full conversation history for each user.
>
> **Candidate:** Should we support message delivery status indicators, such as sent, delivered, or read"
>
> **Interviewer:** Not for this version. Just assume messages are delivered once they are sent. No need to track read receipts or delivery confirmations.
>
> **Candidate:** Should the system preserve the order of messages"
>
> **Interviewer:** Yes, messages must be delivered in the order they were sent.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Support **one-on-one** and **group messaging**
- Allow users to view their **complete chat history**
- Ensure **message ordering is preserved**, i.e., messages must be delivered in the order they were sent

## 1.2 Non-Functional Requirements

- **Modularity:** The system should follow object-oriented design principles with well-defined components.
- **Scalability:** The system must support many concurrent users and deliver messages in real time with minimal latency.
- **Extensibility:** The design should be flexible enough to support future features like file sharing, typing indicators, or message reactions
- **Maintainability:** Code should be clean, testable, and easy to update or extend as requirements evolve.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing key **nouns** (e.g., user, message, chat, session, contact list) and **actions** (e.g., authenticate, send, receive, display, store) from the functional requirements. These often translate directly into **classes**, **enums**, or **interfaces** in an object-oriented design.

Below, we break down the functional requirements and extract the relevant entities. Related requirements are grouped together when they represent the same conceptual unit.

#### **1. The system should support both one-on-one and group chats.**

This suggests the need for a `Chat` entity that can represent either a **one-on-one chat** or a **group conversation**. Each chat has a list of participating users and a collection of messages.

Additionally, we need a `ChatService` to act as the orchestrator. It will be responsible for creating new chats, adding participants, retrieving chat history, and managing chat-level operations.

#### **2. Users should be able to send and receive messages.**

This introduces the `User` entity, which represents each participant in the system. A user can be part of multiple chats and can send or receive messages.

Messages themselves are modeled using the `Message` entity, which includes sender, timestamp and the message content.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Final List of Core Entities
>
> - **User**: Represents a user of the chat application.
> - **Message**: Represents an individual message with sender, timestamp, and content.
> - **Chat**: Represents a one-on-one or group conversation thread between two users.
> - **ChatService: **Acts as the system’s orchestrator. Responsible for creating chats, sending messages and retrieving chat history.

These core entities define the essential abstractions of a simple chat application and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section outlines the classes that form the core of the chat application, the relationships between them, and the key design patterns employed to ensure a scalable and maintainable architecture.

## 3.1 Class Definitions

The system is defined by a set of core classes and data classes.

### Data Classes

#### `Message`

This is an immutable data class representing a single message.

It encapsulates the message `id`, `sender` (`User`), `content`, and `timestamp`. Once a `Message` object is created, its state cannot be changed, which is ideal for representing historical records like chat messages.

### Core Classes

#### `User`

Represents a participant in the chat system.

Each `User` has a unique `id` and a `name`. Crucially, it contains the `onMessageReceived` method, which acts as a callback for the Observer pattern, allowing a user to be "notified" of new messages.

`Chat`** (Abstract Class)**: This class serves as the blueprint for all types of conversations. It manages a collection of `members` (`User` objects) and `messages` (`Message` objects). It defines the common behavior for all chats but delegates the specific implementation of retrieving the chat's name to its subclasses via the abstract `getName` method.

#### `OneToOneChat` 

A concrete implementation of `Chat` designed for a private conversation between exactly two users.

#### `GroupChat`

A concrete implementation of `Chat` for conversations involving multiple users. It includes functionality to add or remove members.

#### `ChatService`

The central hub of the application.

It manages the lifecycle and registration of all users and chats. It acts as a go-between for all interactions, such as sending messages and creating new chats.

## 3.2 Class Relationships

The relationships between classes define the structure and interaction flow of the application.

### **Inheritance (Generalization)**

- `OneToOneChat` and `GroupChat` both **extend** the abstract `Chat` class. This is an "is-a" relationship, where both concrete classes are specialized types of a `Chat`. They inherit the common state (members, messages) and behavior (`addMessage`) while providing their own specific implementation for `getName`.

### **Composition**

- A `Chat` is **composed of** `Message`s. A `Message` cannot exist without being part of a `Chat`. The `Chat` class manages the lifecycle of the `Message` objects within its `messages` list. This strong "part-of" relationship is a classic example of composition. `Chat` (Whole) `*`---`Message` (Part)

### **Aggregation**

- A `Chat` **aggregates** `User`s as its members. A `User` can exist independently of any single chat and can be a member of multiple chats simultaneously. This is a "has-a" relationship, but the lifecycle of a `User` is not tied to the lifecycle of a `Chat`. `Chat` (Whole) `<>`---`User` (Part)
- The `ChatService` **aggregates** all `User` and `Chat` objects in the system. It holds references to them in its maps but doesn't exclusively own them in a compositional sense.

### **Association**

- There is a unidirectional **association** from `Message` to `User`. Each `Message` object holds a reference to the `User` who sent it. This relationship is essential for identifying the sender of any given message. `Message` ---`>` `User` (sender)

## 3.3 Key Design Patterns

Several design patterns are utilized to create a decoupled and organized system.

### [**Mediator Pattern**](/learn/lld/mediator)

The `ChatService` is a textbook implementation of the Mediator pattern. It acts as a central communications hub, preventing `User` objects from needing to reference each other directly. All communication, like sending a message, is routed through the `ChatService`. This decouples users and chats, simplifying the system and making it easier to manage and extend. For example, a `User` sending a message only needs to know the `chatId`, not the details of all other recipients.

### [**Observer Pattern**](/learn/lld/observer)

This pattern is used to notify users of new messages.

- **Subject**: The `ChatService` acts as the subject. When its `sendMessage` method is called, it triggers an event (a new message).
- **Observer**: The `User` class is the observer. Its `onMessageReceived` method is the callback that is invoked by the `ChatService` for every member of a chat when a new message is posted. This creates a push-based notification system.

### [**Strategy Pattern**](/learn/lld/strategy)

The abstract `getName(User perspectiveUser)` method in the `Chat` class and its concrete implementations in `OneToOneChat` and `GroupChat` exemplify the Strategy pattern. The algorithm (or strategy) for determining a chat's display name varies depending on the chat type.

- `OneToOneChat`** Strategy**: The name is the name of the *other* user.
- `GroupChat`** Strategy**: The name is the fixed `groupName`. This allows the client code to get the appropriate name polymorphically without needing to know the concrete type of the chat.

### [**Factory Method (Simplified)**](/learn/lld/factory-method)

The `ChatService` class acts as a factory for creating core domain objects. Methods like `createUser`, `createOneToOneChat`, and `createGroupChat` centralize the instantiation logic. This simplifies the creation process for the client and ensures that all created objects are properly registered within the service.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 `User`

Represents a user in the chat system.

```java
class User {
    private final String id;
    private final String name;

    public User(String name) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void onMessageReceived(Message message, Chat chatContext) {
        System.out.printf("[Notification for %s in chat '%s'] %s: %s\n",
                this.getName(), chatContext.getName(this), message.getSender().getName(), message.getContent());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "User{" + "id='" + id + '\'' + ", name='" + name + '\'' + '}';
    }
}
```

- Each user has a unique ID and name.
- The `onMessageReceived()` method is called when the user receives a new message in a chat, simulating push notifications.

### 4.2 `Message`

Represents a single message sent in a chat.

```java
final class Message {
    private final String id;
    private final User sender;
    private final String content;
    private final LocalDateTime timestamp;

    public Message(User sender, String content) {
        this.id = UUID.randomUUID().toString();
        this.sender = sender;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }

    public String getId() {
        return id;
    }

    public User getSender() {
        return sender;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    @Override
    public String toString() {
        return String.format("[%s] %s: %s", timestamp, sender.getName(), content);
    }
}
```

### 4.3 `Chat` (Abstract Class)

Abstract base class for all types of chats. Maintains a list of members and messages.

```java
abstract class Chat {
    protected final String id;
    protected final List<User> members;
    protected final List<Message> messages;

    public Chat() {
        this.id = UUID.randomUUID().toString();
        this.members = new CopyOnWriteArrayList<>(); // Thread-safe for reads
        this.messages = new CopyOnWriteArrayList<>();
    }

    public String getId() {
        return id;
    }

    public List<User> getMembers() {
        return List.copyOf(members); // Return an immutable view
    }

    public List<Message> getMessages() {
        return List.copyOf(messages); // Return an immutable view
    }

    public void addMessage(Message message) {
        this.messages.add(message);
    }

    public abstract String getName(User perspectiveUser);
}
```

### 4.4 `OneToOneChat`

Concrete chat class for private messaging between two users.

```java
class OneToOneChat extends Chat {

    public OneToOneChat(User user1, User user2) {
        super();
        this.members.addAll(List.of(user1, user2));
    }

    @Override
    public String getName(User perspectiveUser) {
        // The chat name from a user's perspective is the other user's name.
        return members.stream()
                .filter(member -> !member.equals(perspectiveUser))
                .findFirst()
                .map(User::getName)
                .orElse("Unknown Chat");
    }
}
```

### 4.5 `GroupChat`

Represents a group chat with multiple members.

```java
class GroupChat extends Chat {
    private String groupName;

    public GroupChat(String groupName, List<User> initialMembers) {
        super();
        this.groupName = groupName;
        this.members.addAll(initialMembers);
    }

    public void addMember(User user) {
        if (!members.contains(user)) {
            members.add(user);
        }
    }

    public void removeMember(User user) {
        members.remove(user);
    }

    @Override
    public String getName(User perspectiveUser) {
        return groupName;
    }
}
```

### 4.6 `ChatService` (Mediator)

This service class is the heart of the application. It acts as a central **Mediator** that handles all user and chat management, as well as message routing.

```java
$bb
```

**ChatService** is a classic example of the **Mediator pattern**. Users do not communicate directly with each other; they communicate only through the ChatService. This decouples users and centralizes the complex communication logic, making the system easier to manage and extend.

#### **sendMessage**()

This method orchestrates the entire process of sending a message:

1. It validates the sender and the chat.
2. It creates the Message object.
3. It adds the message to the chat's history.
4. **Notification (Observer):** It iterates through all members of the chat and calls their onMessageReceived method, effectively pushing a notification to each recipient.

### 4.7 ChatApplicationDemo

This driver class demonstrates the end-to-end functionality of the system, acting as a client to the ChatService.

```java
$c1
```

---

# 5. Run and Test

---

# 6. Quiz
