---
id: "lld-social-content-platforms-design-linkedin"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Social Content Platforms"
subSection: ""
title: "Design LinkedIn"
slug: "lld-social-content-platforms-design-linkedin"
summary: "In this chapter, we will explore the low-level design of LinkedIn like system in detail."
eli10: "Imagine Design LinkedIn as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design LinkedIn Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Social Content Platforms","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design LinkedIn"
  code: |
    enum ConnectionStatus {
        PENDING,
        ACCEPTED,
        REJECTED,
        WITHDRAWN
    }
    
    enum NotificationType {
        CONNECTION_REQUEST,
        POST_LIKE,
        POST_COMMENT
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is LinkedIn"
>
> **LinkedIn** is a professional networking platform that allows individuals to create and maintain an online career profile, connect with other professionals, apply for jobs, and share industry-related content.
>
> 
> <!-- Simulation: linkedin -->
> 

>
> It also serves as a recruiting and branding platform for companies to post job openings, build their presence, and hire qualified candidates.

In this chapter, we will explore the **low-level design of LinkedIn like system** in detail.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the system allow users to create detailed professional profiles"
>
> **Interviewer:** Yes, members should be able to add a summary, work experience, and educational background.
>
> **Candidate:** Should members be able to connect with each other"
>
> **Interviewer:** Yes, the system should allow one member to send a connection request to another. The receiver can accept or reject it.
>
> **Candidate:** Can members post updates, and should these be shown in a personalized feed"
>
> **Interviewer:** Yes, members can create posts. A member should see posts from their connections in their news feed.
>
> **Candidate:** Should members be able to like or comment on a post"
>
> **Interviewer:** Yes, and the post’s author should be notified of these interactions.
>
> **Candidate:** Do we support any search functionality"
>
> **Interviewer:** Yes. Members should be able to search for other members by name (case-insensitive substring match is enough for now).
>
> **Candidate:** Should the system include messaging, endorsements, job applications, or premium features"
>
> **Interviewer:** No, let’s keep it simple. Focus only on core features: profiles, connections, posting, feed, notifications, and search.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- **Profile Management:** Allow members to create and update their professional profiles
- **Connection Management:** Members can send connection requests to other members. Requests can be accepted or rejected.
- **Posting:** Members can create text-based posts.
- **News Feed:** Members can view a feed of posts made by their connections.
- **Post Interactions:** Members can like and comment on posts.
- **Notifications:** Members receive notifications for: Connection requests, Likes/Comments on their posts
- **Search:** Members can search for other members by name.

## 1.2 Non-Functional Requirements

- **Modularity:** The system should be organized into well separated components
- **Extensibility:** The design should be extensible to support future features like job postings, or premium accounts
- **Maintainability:** Code should follow object-oriented design principles and be easy to test, debug, and extend

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the foundational building blocks of our system. We identify them by analyzing key **nouns** (e.g., user, profile, connection request, message, activity log) and **actions** (e.g., connect, search, update, message, log) from the functional requirements. These typically translate into **classes**, **enums**, or **interfaces** in an object-oriented design.

Let’s walk through the key features and extract the relevant entities.

#### 1. **Members need profiles with experience and education.**

This directly points to a `Member` as the central entity representing a user. Each Member has a `Profile`, which in turn is composed of smaller, distinct entities: `Experience` and `Education`. These classes encapsulate the professional and academic history of a member.

#### **2. Members can connect with each other via requests.**

The relationship between two members is a key concept. This leads to a `Connection` entity, which models the request itself, including the sender, receiver, and its current state. To manage these states consistently, a `ConnectionStatus` enum (PENDING, ACCEPTED, etc.) is required. The logic for managing these connections is encapsulated in a `ConnectionService`.

#### **3. Members can create posts, which appear in their connections' news feeds.**

This introduces the `Post` entity as a piece of user-generated content. A `NewsFeed` entity is needed to represent the collection of posts displayed to a member. The logic for generating this feed is handled by a `NewsFeedService`. To allow for different ways of organizing the feed, a FeedSortingStrategy interface is introduced.

#### 4. **Members can interact with posts via likes and comments.**

Interactions on a `Post` are modeled as their own entities. This leads to `Like` and `Comment` classes, which are associated with a Post and capture who performed the action and when.

#### 5. **Members receive notifications for key events.**

To handle alerts, a `Notification` entity is needed to encapsulate the message content and its type. A `NotificationType` enum (CONNECTION_REQUEST, POST_LIKE, etc.) standardizes the kinds of alerts. A `NotificationService` is responsible for dispatching these notifications.

#### 6. **Members can search for other members by name.**

This functionality is encapsulated within a `SearchService`, which operates on the collection of Member entities to find matches.

#### 7. **The system needs a simple, unified entry point.**

To manage the complexity of interactions between various services and data models, a `LinkedInSystem` class is introduced. It acts as a Facade and Singleton, providing a high-level API for all client operations.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - `Member`: The central entity representing a user on the network. It holds a profile, and connections.
> - `Profile`: Contains a member's professional summary, a list of Experience objects, and a list of Education objects.
> - `Experience` & `Education`: Data classes that store details about a member's work history and academic background.
> - `Connection`: Represents a connection request between two members, tracking its status (PENDING, ACCEPTED, etc.).
> - `Post`: Represents a text-based update created by a member. It also acts as a Subject to notify its author of interactions.
> - `Like` & `Comment`: Represent interactions that members can perform on a Post.
> - `NewsFeed`: Represents a member's personalized feed, containing a collection of posts from their connections.
> - `Notification`: An entity representing an alert sent to a member for events like connection requests or post interactions.
> - `Enums` (ConnectionStatus, NotificationType): Define fixed sets of statuses and types to ensure consistency across the system.
> - `Services` (ConnectionService, NewsFeedService, SearchService, NotificationService): Classes that encapsulate the core business logic and orchestrate interactions between the data entities.
> - `LinkedInSystem`: A Facade and Singleton that provides a simplified, high-level API to the entire system, acting as the primary entry point.

These core entities define the essential abstractions of the LinkedIn system and will guide the structure of your low-level design and class diagrams.

---

# 3. Class Design

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

- `ConnectionStatus`: Defines the lifecycle states of a connection request (`PENDING`, `ACCEPTED`, `REJECTED`).
- `NotificationType`: Classifies the type of notification being sent (`CONNECTION_REQUEST`, `POST_LIKE`).

### **Data Classes**

#### `Education`**, **`Experience`

Simple data classes that capture a member's academic and professional history.

#### `Profile`

A container class that aggregates a member's `summary`, `experiences`, and `educations`.

#### `Connection`

Represents a connection request between two members, tracking its status and timestamps.

#### `Like`**, **`Comment`

Data classes that model user interactions on a `Post`.

#### `Notification`

A data class representing a single notification message to be sent to a user.

### **Core Classes**

#### `Member`

Represents a user of the platform.

It is a central class that acts as a concrete **Observer** (implementing `NotificationObserver`) to receive notifications. Its complex creation is handled by a nested `Builder`. It holds its `Profile`, a set of `connections`, and a list of `notifications`.

#### `Post`

Represents a single post in the news feed.

It is a concrete **Subject** (extending `Subject`) that notifies its author when other members interact with it (by liking or commenting).

#### `NewsFeed`

Responsible for displaying a collection of posts according to a given `FeedSortingStrategy`.

#### `ConnectionService`**, **`NewsFeedService`**, **`NotificationService`**, **`SearchService`

These are service-layer classes that encapsulate specific business logic. For instance, `ConnectionService` handles sending and accepting requests, while `NewsFeedService` manages creating posts and generating feeds for members.

#### `LinkedInSystem`** (Singleton & Facade)**

The primary entry point for the entire application.

It orchestrates all the services and manages the main data stores (e.g., the map of all members). It provides a simplified interface to the client, hiding the complex interactions between the various components.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- A `Member` "has-a" `Profile`. The `Profile`'s lifecycle is managed by the `Member`.
- A `Profile` "has-a" list of `Experience` and `Education` objects.
- `LinkedInSystem` "has-a" set of core services (`ConnectionService`, `NewsFeedService`, etc.) and manages the collection of all `Member`s.

### **Association**

- A `Member` is associated with a set of other `Member`s as `connections`.
- A `Connection` object links two `Member`s.
- A `Post` is associated with its author `Member`. `Like`s and `Comment`s are also associated with the `Member` who created them.
- A `NewsFeed` is associated with a `FeedSortingStrategy` to determine the display order.
- A `Post` (Subject) is associated with its `NotificationObserver`s (typically the author `Member`).

### **Inheritance**

- `Member` implements the `NotificationObserver` interface.
- `Post` extends the abstract `Subject` class.
- `ChronologicalSortStrategy` implements the `FeedSortingStrategy` interface.

### **Dependency**

- `LinkedInSystem` (Facade) depends on its various service classes to execute user commands.
- `ConnectionService` depends on `NotificationService` to inform users of new requests.
- A client depends on `Member.Builder` to construct new `Member` objects.
- `Post` depends on `Notification` to create update messages for its observers.

## 3.3 Key Design Patterns

### [**Strategy Pattern**](/learn/lld/strategy)

The `FeedSortingStrategy` allows the algorithm for sorting the news feed to be encapsulated and made interchangeable. The system can easily support new sorting methods (e.g., by relevance, by engagement) by creating new strategy classes without altering the `NewsFeed` or `NewsFeedService`.

### [**Observer Pattern**](/learn/lld/observer)

This pattern is fundamental for real-time notifications. A `Post` (Subject) notifies its author `Member` (Observer) whenever a new like or comment is added. This decouples the action (e.g., liking a post) from the notification logic.

### [**Builder Pattern**](/learn/lld/builder)

The `Member.Builder` class is used for the step-by-step construction of a `Member` object. This pattern is ideal for objects with many optional parameters (like `summary`, `experience`, `education`), providing a fluent and readable API while ensuring the `Member` object is created in a valid state.

### [**Facade Pattern**](/learn/lld/facade)

The `LinkedInSystem` class serves as a facade. It provides a simple, high-level API (`sendConnectionRequest`, `createPost`, `viewNewsFeed`) that hides the complex internal workflows involving multiple services, data models, and notifications.

### [**Singleton Pattern**](/learn/lld/singleton)

`LinkedInSystem` is implemented as a singleton to ensure a single, globally accessible point of control for the entire application. This prevents state inconsistencies and centralizes the management of services and data.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Enums

Defines standard statuses for connection requests and notification types to maintain consistency across services.

```java
enum ConnectionStatus {
    PENDING,
    ACCEPTED,
    REJECTED,
    WITHDRAWN
}

enum NotificationType {
    CONNECTION_REQUEST,
    POST_LIKE,
    POST_COMMENT
}
```

### 4.2 Profile Components: Education, Experience, Profile

Captures a member’s professional background. Supports dynamic updates and display functionality.

```java
$d6
```

### 4.3 Member (Builder + Observer Pattern)

Represents a LinkedIn member. Supports profile creation via the **Builder Pattern** and acts as an observer for real-time notifications.

```java
$dc
```

### 4.4 Connection

Models a connection request between members and tracks its lifecycle state.

```java
class Connection {
    private final Member fromMember;
    private final Member toMember;
    private ConnectionStatus status;
    private final LocalDateTime requestedAt;
    private LocalDateTime acceptedAt;

    public Connection(Member fromMember, Member toMember) {
        this.fromMember = fromMember;
        this.toMember = toMember;
        this.status = ConnectionStatus.PENDING;
        this.requestedAt = LocalDateTime.now();
    }

    public Member getFromMember() { return fromMember; }
    public Member getToMember() { return toMember; }
    public ConnectionStatus getStatus() { return status; }
 
    public void setStatus(ConnectionStatus status) {
        this.status = status;
        if (status == ConnectionStatus.ACCEPTED) {
            this.acceptedAt = LocalDateTime.now();
        }
    }
}
```

### 4.5 Post, Like, Comment (Observer Pattern)

Each post tracks likes and comments. Uses the **Observer Pattern** to notify the post’s author of new interactions.

```java
$e2
```

### 4.6 NewsFeed (Strategy Pattern)

```java
class NewsFeed {
    private final List<Post> posts;

    public NewsFeed(List<Post> posts) {
        this.posts = posts;
    }

    public void display(FeedSortingStrategy strategy) {
        List<Post> sortedPosts = strategy.sort(posts);
        if (sortedPosts.isEmpty()) {
            System.out.println("  Your news feed is empty.");
            return;
        }
        sortedPosts.forEach(post -> {
            System.out.println("----------------------------------------");
            System.out.printf("Post by: %s (at %s)%n", post.getAuthor().getName(), post.getCreatedAt().toLocalDate());
            System.out.println("Content: " + post.getContent());
            System.out.printf("Likes: %d, Comments: %d%n", post.getLikes().size(), post.getComments().size());
            System.out.println("----------------------------------------");
        });
    }
}
```

Implements the **Strategy Pattern** to support multiple feed sorting strategies. Currently defaults to reverse chronological.

### 4.7 Notification

Defines a generic notification system using the **Observer Pattern**.

```java
class Notification {
    private final String id;
    private final String memberId; // The ID of the member to notify
    private final NotificationType type;
    private final String content;
    private final LocalDateTime createdAt;
    private boolean isRead = false;

    public Notification(String memberId, NotificationType type, String content) {
        this.id = UUID.randomUUID().toString();
        this.memberId = memberId;
        this.type = type;
        this.content = content;
        this.createdAt = LocalDateTime.now();
    }

    public String getContent() { return content; }
    public void markAsRead() { this.isRead = true; }
    public boolean isRead() { return isRead; }
}
```

### 4.8 Observer

```java
interface NotificationObserver {
    void update(Notification notification);
}

abstract class Subject {
    private final List<NotificationObserver> observers = new ArrayList<>();

    public void addObserver(NotificationObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(NotificationObserver observer) {
        observers.remove(observer);
    }

    public void notifyObservers(Notification notification) {
        for (NotificationObserver observer : observers) {
            observer.update(notification);
        }
    }
}
```

### 4.9 FeedSortingStrategy

```java
interface FeedSortingStrategy {
    List<Post> sort(List<Post> posts);
}

class ChronologicalSortStrategy implements FeedSortingStrategy {
    @Override
    public List<Post> sort(List<Post> posts) {
        return posts.stream()
                .sorted(Comparator.comparing(Post::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }
}
```

### 4.10 NotificationService

```java
class NotificationService {
    public void sendNotification(Member member, Notification notification) {
        // In a real system, this would push to a queue or a websocket.
        // Here, we directly call the member's update method.
        member.update(notification);
    }
}
```

### 4.11 ConnectionService

```java
$e7
```

### 4.12 NewsFeedService

```java
$ed
```

### 4.13 SearchService

```java
class SearchService {
    private final Collection<Member> members;

    public SearchService(Collection<Member> members) {
        this.members = members;
    }

    public List<Member> searchByName(String name) {
        return members.stream()
                .filter(member -> member.getName().toLowerCase().contains(name.toLowerCase())) // substring search
                .collect(Collectors.toList());
    }
}
```

### 4.14 LinkedInSystem

This class is a **Singleton** that provides a simplified, high-level API to the entire complex subsystem.

```java
$f0
```

- **Facade Pattern:** The facade provides simple methods like sendConnectionRequest and viewNewsFeed, hiding the complex interactions between the various services and data models. A client interacts with the system through this single, clean interface.
- **Singleton Pattern:** A single LinkedInSystem instance acts as the central point of control and data management for the entire application. Double-checked locking ensures thread-safe lazy initialization.

### 4.15 LinkedInDemo

The demo class validates the entire system by simulating interactions on the professional network.

```java
$f6
```

---

# 5. Run and Test

---

# 6. Quiz
