---
id: "lld-developer-tools-infrastructure-design-in-memory-rate-limiter"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Developer Tools Infrastructure"
subSection: ""
title: "Design In-Memory Rate Limiter"
slug: "lld-developer-tools-infrastructure-design-in-memory-rate-limiter"
summary: "In this chapter, we will explore the low-level design of a rate limiter like system in detail."
eli10: "Imagine Design In-Memory Rate Limiter as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design In-Memory Rate Limiter Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Developer Tools Infrastructure","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design In-Memory Rate Limiter"
  code: |
    interface RateLimitingStrategy {
        boolean allowRequest(String userId);
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### **What is a Rate-Limiter"**
>
> A **rate limiter** is a system component or algorithm used to **control the rate of operations** performed by a user, client, or service over a given period. It helps prevent abuse, reduce load, and ensure fair usage of system resources.
>
> 
> <!-- Simulation: rate-limiter -->
> 

>
> Rate limiters are commonly applied to:
>
> - API request throttling
> - Login attempt restrictions
> - Messaging or notification limits
> - Preventing denial-of-service (DoS) attacks

In this chapter, we will explore the **low-level design of a rate limiter like system** in detail.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions, clarify ambiguities, and define the system's scope more precisely.

Here is an example of how a discussion between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the rate limiter work on a per-user basis, or should it be based on API key or IP address"
>
> **Interviewer:** Let’s keep it simple and go with per-user rate limiting. You can assume users are uniquely identified by a user ID or token.
>
> **Candidate:** Which rate limiting algorithm should we implement fixed window, sliding window, or token bucket"
>
> **Interviewer:** Use the fixed window algorithm and token bucket if possible for this version. We can consider more advanced approaches later.
>
> **Candidate:** Should all users have the same rate limit, or can it vary per user"
>
> **Interviewer:** Assume the same rate limit for all users (e.g., 100 requests per 60 seconds).
>
> **Candidate:** What should happen when a user exceeds the rate limit" Should we silently drop the request or notify the user"
>
> **Interviewer:** The system should clearly inform the user that they’ve exceeded the limit.
>
> **Candidate:** Do we need to handle concurrency in case of multiple threads trying to access or update rate limits for the same user"
>
> **Interviewer:** **:** Yes, the implementation should be thread-safe and handle concurrent access reliably.

After gathering the details, we can summarize the key system requirements.

### 1.1 Functional Requirements

- Support rate limiting on a per-user basis.
- Enforce a fixed number of allowed requests (e.g., 100) within a defined time window (e.g., 60 seconds).
- Reject requests that exceed the allowed limit and return an appropriate response.
- Provide a simple way to simulate requests in a demo or main method.

### 1.2 Non-Functional Requirements

- **Thread-Safety:** The rate limiter must handle concurrent access from multiple threads without race conditions.
- **Modularity:** The system should follow object-oriented design principles with clear separation of concerns.
- **Extensibility:** The design should be flexible enough to support other rate limiting strategies like sliding window or token bucket.
- **Maintainability:** The codebase should be clean, testable, and easy to extend or debug.
- **Performance:** The implementation should efficiently support high-frequency request patterns using optimal data structures.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

The core of our design challenge is that there isn't one "best" rate-limiting algorithm. Each has its own trade-offs. This is a perfect scenario for the **Strategy Design Pattern**.

We can define a common RateLimitingStrategy interface and create concrete implementations for each algorithm. This allows the main RateLimiter class to be completely decoupled from the specific algorithm being used.

**Popular Algorithms to Consider:**

1. **Token Bucket:** A simple and popular algorithm. A bucket has a fixed capacity of tokens, which are refilled at a constant rate. Each request consumes one token. If the bucket is empty, the request is rejected.
2. **Fixed Window Counter:** The simplest approach. A time window is divided into fixed slots (e.g., 0-60 seconds). We count requests in the current window. At the start of a new window, the count resets. **Weakness:** A burst of traffic at the edge of a window can exceed the rate (e.g., 10 requests at 00:59 and 10 at 01:00).
3. **Sliding Window Log:** The most accurate approach. We store timestamps of all requests within the window. When a new request arrives, we discard all timestamps older than the window and count the remaining ones. **Weakness:** Can be memory-intensive.

**Key Entities/Classes:**

- **RateLimiter (Facade/Context):** The main entry point for clients. It manages a map of client IDs to their specific rate-limiting rules and strategies.
- **RateLimitingStrategy (Interface):** Defines the isAllowed() contract that all algorithms must implement.
- **SlidingWindowLogStrategy (Concrete Strategy):** An implementation of the strategy interface that uses a queue of timestamps to track requests.
- **Rule:** A simple data object to hold the configuration for a rate limit (e.g., 100 requests per 60 seconds).
- **UserRateLimiter:** A helper class that bundles a user's specific Rule and their instance of a RateLimitingStrategy.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

There are no enums used in this design.

### **Data Classes**

- `UserRequestInfo`: A private inner class within `FixedWindowStrategy`. It acts as a data holder to track the `windowStart` time and the `requestCount` (as an `AtomicInteger` for thread safety) for a specific user.
- `TokenBucket`: A private inner class within `TokenBucketStrategy`. It models the token bucket for a single user, containing its `capacity`, current number of `tokens`, `refillRatePerSecond`, and the `lastRefillTimestamp`.

### **Core Classes**

- `RateLimitingStrategy`** (Interface)**: This is the core of the **Strategy Pattern**. It defines a single contract, `allowRequest(String userId)`, that all concrete rate-limiting algorithms must implement. This allows the system to switch between different limiting strategies seamlessly.
- `FixedWindowStrategy`** (Concrete Strategy)**: An implementation of `RateLimitingStrategy` that limits the number of requests within a fixed time window. It uses a map to store `UserRequestInfo` for each user to track their request counts.
- `TokenBucketStrategy`** (Concrete Strategy)**: Another implementation of `RateLimitingStrategy` that uses the token bucket algorithm. This strategy allows for bursts of traffic by maintaining a bucket of tokens for each user that refills at a constant rate.
- `RateLimiterService`** (Singleton & Facade)**: The primary entry point for any client. It holds a reference to the currently active `RateLimitingStrategy`. It simplifies the interaction for the client, which only needs to call a single `handleRequest` method, delegating the actual rate-limiting logic to the configured strategy.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- `RateLimiterService` "has-a" `RateLimitingStrategy`. The service's behavior is defined by the strategy it holds.
- `FixedWindowStrategy` "has-a" map of `UserRequestInfo` objects to maintain state for each user.
- `TokenBucketStrategy` "has-a" map of `TokenBucket` objects.

### **Inheritance**

- `FixedWindowStrategy` and `TokenBucketStrategy` both implement the `RateLimitingStrategy` interface. This allows them to be used interchangeably by the `RateLimiterService`.

### **Dependency**

- The client (`RateLimiterDemo`) depends on the `RateLimiterService` to handle requests. It does not need to know about the concrete strategies.
- The `RateLimiterService` depends on the `RateLimitingStrategy` interface, not the concrete implementations.

### 3.3 Key Design Patterns

### [**Strategy Pattern**](/learn/lld/strategy)

This is the primary design pattern used. It allows the rate-limiting algorithm to be selected and changed at runtime. The `RateLimiterService` (Context) delegates the decision-making process to a concrete `RateLimitingStrategy` object (`FixedWindowStrategy` or `TokenBucketStrategy`). This makes the system flexible and easy to extend with new limiting algorithms (e.g., Sliding Window Log) without modifying the service class.

### [**Singleton Pattern**](/learn/lld/singleton)

The `RateLimiterService` is implemented as a singleton. This ensures that there is only one instance of the rate limiter service controlling the policies for the entire application, providing a single, global point of access and preventing conflicting states.

### [**Facade Pattern**](/learn/lld/facade)

The `RateLimiterService` also acts as a facade. It provides a simple, unified interface (`handleRequest`) to the client, hiding the underlying complexity of which strategy is being used and how it manages user-specific data like time windows or token buckets.

### 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 RateLimitingStrategy Interface

This interface defines the contract for all rate limiting strategies. Each strategy decides whether a user’s request should be allowed based on internal logic.

```java
interface RateLimitingStrategy {
    boolean allowRequest(String userId);
}
```

### 4.2 FixedWindowStrategy

This strategy limits requests within a fixed, discrete time window (e.g., 100 requests per minute).

```java
$98
```

- **Algorithm:** This class maintains a start time (windowStart) and a counter (requestCount) for each user. When a request arrives, it checks if the current time is outside the window. If it is, the window and counter are reset. Otherwise, it checks if the counter has exceeded the maxRequests.

### 4.3 TokenBucketRateLimiter

The **Token Bucket** strategy provides a more flexible rate limit, allowing for bursts of requests by using a "bucket" of tokens that refills over time.

```java
$9e
```

- **Algorithm:** Each user has a TokenBucket with a fixed capacity. Tokens are added to the bucket at a constant refillRate. When a request arrives, it attempts to consume one token. If the bucket is empty, the request is denied. This allows for bursts of traffic up to the bucket's capacity.
- **Refill Logic:** The refill method calculates how many tokens should have been generated since the last refill and adds them to the bucket, ensuring the total never exceeds capacity

### 4.4 RateLimiterService

This class acts as a central **Singleton** and **Facade**, providing a simplified API for clients to use the rate-limiting functionality.

```java
class RateLimiterService {
    private static RateLimiterService instance;
    private RateLimitingStrategy rateLimitingStrategy;

    private RateLimiterService() {}

    public static synchronized RateLimiterService getInstance() {
        if (instance == null) {
            instance = new RateLimiterService();
        }
        return instance;
    }

    public void setRateLimitingStrategy(RateLimitingStrategy rateLimitingStrategy) {
        this.rateLimitingStrategy = rateLimitingStrategy;
    }

    public void handleRequest(String userId) {
        if (rateLimitingStrategy.allowRequest(userId)) {
            System.out.println("Request from user " + userId + " is allowed");
        } else {
            System.out.println("Request from user " + userId + " is rejected: Rate limit exceeded");
        }
    }
}
```

It delegates the request evaluation to the chosen strategy and acts as the facade to client code.

- **Singleton Pattern:** The service is a Singleton to ensure there is a single, globally accessible instance controlling the rate-limiting policies for the entire application.
- **Facade Pattern:** It provides a simple handleRequest method that hides the complexity of the underlying strategy. The client code doesn't need to know which algorithm is currently active; it just interacts with this clean API.

### 4.5 RateLimiterDemo

This demo simulates client requests under both rate limiting strategies using multiple threads. It demonstrates how the same service interface supports different strategies interchangeably.

```java
$a6
```

---

# 5. Run and Test

---

# 6. Quiz
