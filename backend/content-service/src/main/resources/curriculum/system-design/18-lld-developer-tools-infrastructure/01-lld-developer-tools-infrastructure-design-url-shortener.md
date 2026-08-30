---
id: "lld-developer-tools-infrastructure-design-url-shortener"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Developer Tools Infrastructure"
subSection: ""
title: "Design URL Shortener"
slug: "lld-developer-tools-infrastructure-design-url-shortener"
summary: "In this chapter, we will explore the low-level design of an url shortener in detail."
eli10: "Imagine Design URL Shortener as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design URL Shortener Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Developer Tools Infrastructure","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design URL Shortener"
  code: |
    enum EventType {
        URL_CREATED,
        URL_ACCESSED
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a URL Shortener"
>
> A **URL shortener** is a service that converts a long URL into a shorter, more manageable version. These short links typically contain a short domain name and a unique identifier (e.g., `bit.ly/abc123`) that maps back to the original long URL.
>
> 
> <!-- Simulation: url-shortener -->
> 

>
> Popular services like **TinyURL**, **Bitly**, and **t.co** (used by Twitter) rely on URL shorteners to:
>
> - Improve link sharing (especially on character-limited platforms)
> - Track clicks and analytics
> - Redirect users quickly and efficiently

In this chapter, we will explore the **low-level design of an url shortener** in detail.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions, clarify ambiguities, and define the system's scope more precisely.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the system automatically generate short URLs, or should users be able to specify custom aliases"
>
> **Interviewer:** The system should support both. . By default, it should generate a unique short URL automatically, but users can also provide a custom alias if they prefer.
>
> **Candidate:** Should the short URLs have an expiration policy, or should they remain valid indefinitely"
>
> **Interviewer:** By default, short URLs should not expire. But we should allow users to specify an expiration date if needed.
>
> **Candidate:** Do we need to support analytics, like tracking click counts and timestamps"
>
> **Interviewer:** For now, basic click count tracking will suffice.

## 1.1 Functional

- Automatically generate a **unique short URL** for any given long URL
- Allow users to optionally specify a **custom alias** for the short URL
- Allow users to define and optional **expiration dates** for short URLs
- **Redirect users** to the original long URL when the short URL is accessed
- **Handle** **URL conflicts** gracefully (e.g., when a custom alias is already taken)
- Track and store the number of times a short URL has been visited

## 1.2 Non-Functional

- **Uniqueness:** Each short URL (including custom aliases) must be unique across the system
- **Extensibility:** The design should be flexible enough to support future enhancements
- **Maintainability:** Code should follow object-oriented principles, with clean abstractions and clear separation of concerns

---

# 2. Core Entities & Algorithm

> [!PAYWALL] This content is for premium members only.

The heart of the problem lies in how we generate the short URL. A common and robust approach is to use a counter-based system.

1. Each time a new URL is submitted, we get a unique, incrementing ID from a counter (e.g., 1, 2, 3, ...).
2. We then convert this numerical ID into a short, alphanumeric string.

The best way to do this conversion is using a **base-62 encoding**. A base-10 number system uses 10 digits (0-9). A base-62 system uses 62 characters: [0-9], [a-z], and [A-Z].

**Example:**

- ID 10 in base-10 = k in base-62.
- ID 61 in base-10 = Z in base-62.
- ID 62 in base-10 = 10 in base-62.

This approach guarantees that every ID will produce a unique string, and the strings will grow slowly in length.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **EventType**: An enum that defines the types of events that can occur within the system, such as URL_CREATED and URL_ACCESSED, for use by the Observer pattern.
> - **ShortenedURL**: A data class that represents the core mapping between a long URL and its generated short key, along with relevant metadata.
> - **KeyGenerationStrategy**: An interface (Strategy Pattern) that defines the contract for various algorithms used to generate the short key. Concrete implementations provide different methods (e.g., random, Base62).
> - **URLRepository**: An interface (Repository Pattern) that abstracts the data persistence layer. It defines methods for saving, retrieving, and querying ShortenedURL data, decoupling the service from the storage implementation.
> - **Observer**: An interface (Observer Pattern) for objects that need to be notified of system events. The AnalyticsService is a concrete example that tracks URL creation and access counts.
> - **URLShortenerService**: The central engine and Facade of the system. It orchestrates the entire workflow, including key generation, collision handling, data persistence, and notifying observers. It provides a simple, unified API for clients to shorten and resolve URLs.

These core entities define the key abstractions of the URL shortener and will guide the structure of our low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section details the design of each class identified previously, including their specific attributes and methods. We will also illustrate how these classes relate to one another and highlight the key design patterns that underpin our solution.

## 3.1 Class Definitions

We can categorize our classes into enums, data-holding classes, and core classes that encapsulate the system's primary logic.

### Enum

#### **EventType**

A type-safe enumeration to represent the different events within the system that observers can subscribe to.

- **Values**: URL_CREATED, URL_ACCESSED.

### Data Classes

#### **ShortenedURL**

An immutable data class representing the core mapping between a long URL and its generated short key. It is constructed using an inner Builder class to ensure clean and flexible instantiation.

- **Attributes**: longURL, shortKey, creationDate.

### URLShortenerService

This is the central engine and Facade of the system. It orchestrates the entire URL shortening and resolution process, coordinating the repository and key generation strategy, and notifying observers of events.

- **Attributes**: INSTANCE (for Singleton), urlRepository, keyGenerationStrategy, domain, observers (a list).
- **Methods**: getInstance(), configure(), shorten(), resolve(), addObserver(), notifyObservers().

## 3.2 Class Relationships

### **Implementation**

- InMemoryURLRepository **implements** the URLRepository interface.
- RandomStrategy, Base62Strategy, etc., **implement** the KeyGenerationStrategy interface.
- AnalyticsService **implements** the Observer interface.

### **Composition / Aggregation**

- URLShortenerService **has a** URLRepository and **has a** KeyGenerationStrategy. These are its core dependencies, injected via a configure method.
- URLShortenerService **has a list of** Observers to which it broadcasts events.

#### **Dependency / "Uses-a"**

- The URLShortenerService **creates and uses** ShortenedURL objects to represent the mapping it stores in the repository.
- A client **uses** the URLShortenerService Singleton instance to interact with the system.

## 3.3 Key Design Patterns

### [**Strategy Pattern**](/learn/lld/strategy)

The KeyGenerationStrategy interface and its concrete implementations are a clear application of the Strategy Pattern. This allows the algorithm for generating short keys to be selected and changed without altering the URLShortenerService, making the system highly flexible.

### [Observer** Pattern**](/learn/lld/observer)

The Observer interface, AnalyticsService, and the URLShortenerService (as the "subject") form the Observer Pattern. This allows for a clean separation of concerns, enabling features like analytics, logging, or caching to be added by simply creating new observers, without modifying the core shortening logic.

### [Builder Pattern](/learn/lld/builder)

The ShortenedURL.Builder provides a clean, fluent API for constructing immutable ShortenedURL objects. This is particularly useful for objects with multiple fields, improving code readability and maintainability.

### [Repository** Pattern**](/learn/lld/repository)

The URLRepository interface abstracts the data access logic from the business logic within URLShortenerService. This separation of concerns means the underlying storage can be changed (e.g., from in-memory to a SQL or NoSQL database) with minimal impact on the core service.

### [**Facade Pattern**](/learn/lld/facade)

The URLShortenerService acts as a Facade. It provides a simple, high-level interface (shorten, resolve) that hides the complex interactions between the repository, key generation strategies, and observer notifications.

### [**Singleton Pattern**](/learn/lld/singleton)

The URLShortenerService uses this pattern to ensure a single, shared instance throughout the application. This is useful for managing a central resource and state, such as the list of observers and configuration.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 EventType

```java
enum EventType {
    URL_CREATED,
    URL_ACCESSED
}
```

### 4.2 ShortenedURL

```java
$9f
```

### 4.3 URLRepository

```java
$a2
```

### 4.4 Observer

```java
interface Observer {
    void update(EventType type, ShortenedURL url);
}

class AnalyticsService implements Observer {
    private final Map<String, AtomicLong> clickCounts = new ConcurrentHashMap<>();

    @Override
    public void update(EventType type, ShortenedURL url) {
        switch (type) {
            case URL_CREATED:
                clickCounts.put(url.getShortKey(), new AtomicLong(0));
                System.out.printf("[Analytics] URL Created: Key=%s, Original=%s%n",
                        url.getShortKey(), url.getLongURL());
                break;
            case URL_ACCESSED:
                AtomicLong count = clickCounts.computeIfAbsent(url.getShortKey(), k -> new AtomicLong(0));
                count.incrementAndGet();
                System.out.printf("[Analytics] URL Accessed: Key=%s, Clicks=%d%n",
                        url.getShortKey(), count.get());
                break;
        }
    }
}
```

### 4.5 KeyGenerationStrategy

```java
$a9
```

### 4.6 URLShortenerService

```java
$af
```

### 4.7 URLShortenerDemo

```java
$b5
```

---

# 5. Run and Test

---

# 6. Quiz
