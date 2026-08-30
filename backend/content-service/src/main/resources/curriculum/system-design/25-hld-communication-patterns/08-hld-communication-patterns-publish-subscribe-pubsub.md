---
id: "hld-communication-patterns-publish-subscribe-pubsub"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Communication Patterns"
subSection: ""
title: "Publish-Subscribe (Pub/Sub)"
slug: "hld-communication-patterns-publish-subscribe-pubsub"
summary: "When an order is placed, several independent systems may need to react. Inventory may reserve stock, notifications may send a confirmation email, analytics may record the event, fraud detection may evaluate the order, and shipping may prepare fulf..."
eli10: "Imagine Publish-Subscribe (Pub/Sub) as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Publish-Subscribe (Pub/Sub) Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["HLD","Communication Patterns","System Design","Architecture"]

---

When an order is placed, several independent systems may need to react. Inventory may reserve stock, notifications may send a confirmation email, analytics may record the event, fraud detection may evaluate the order, and shipping may prepare fulfillment.

The order service should not call all of those services directly. That creates tight coupling and makes the order path slower and more fragile.

**Publish-subscribe**, usually called **pub/sub**, solves this by letting a publisher announce an event to a topic. Subscribers that care about that topic receive their own copy and react independently.

The publisher does not need to know who is listening.

---

# What Is Pub/Sub"

Pub/sub is a messaging pattern with three core ideas:

1. A **publisher** writes an event.
2. A **topic** receives the event.
3. Each **subscription** attached to that topic gets its own stream of messages.

```mermaid
flowchart LR
    Order[Order Service]:::primary -->|"OrderPlaced"| Topic[(orders.events)]:::purple

    Topic --> InvSub["Inventory Subscription"]:::orange
    Topic --> EmailSub["Email Subscription"]:::orange
    Topic --> FraudSub["Fraud Subscription"]:::orange

    InvSub --> Inventory[Inventory Service]:::teal
    EmailSub --> Email[Email Service]:::teal
    FraudSub --> Fraud[Fraud Service]:::teal

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef purple fill:#da77f2,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

The subscription is important. In many systems, the topic is where events are published, but the subscription is where delivery state lives: acknowledgments, backlog, filters, retry policy, and dead-letter policy.

---

# Queue vs Pub/Sub

Queues and pub/sub often work together, but they solve different problems.

| Question | Work Queue | Pub/Sub |
|----------|------------|---------|
| Who receives a message" | One worker from a pool | Every interested subscription |
| Main purpose | Distribute work | Fan out events |
| Producer intent | "Someone should do this task" | "This thing happened" |
| Consumer ownership | Workers usually share one job type | Each subscriber owns its own reaction |
| Example | Resize this image | User registered |

A useful rule of thumb is to use a **work queue** for commands or tasks, and **pub/sub** for events and fan-out. Commands ask for work to be done. Events state that something already happened.

---

# Core Concepts

### Publisher

A publisher creates events and sends them to a topic. It should publish facts, not instructions for every downstream service.

Good event:

Less useful event:

The first event lets subscribers decide what to do. The second leaks downstream implementation details into the publisher.

### Topic

A topic is a named stream or channel where events are published. Topic design should be boring and predictable, with names like `orders.events`, `payments.events`, `users.events`, and `inventory.events`.

Avoid creating a new topic for every tiny variation unless the broker and team can operate that many topics cleanly.

### Subscription

A subscription connects a consumer or service to a topic. Each subscription usually has its own backlog, acknowledgment state, retry policy, dead-letter policy, filter rules, and consumer instances.

```mermaid
flowchart TB
    Topic[(payments.events)]:::purple

    Topic --> LedgerSub["ledger-sub"]:::orange
    Topic --> EmailSub["email-sub"]:::orange

    LedgerSub --> L1[Ledger Worker 1]:::teal
    LedgerSub --> L2[Ledger Worker 2]:::teal

    EmailSub --> E1[Email Worker 1]:::green

    classDef purple fill:#da77f2,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

Here, the ledger service and email service each receive payment events. Within `ledger-sub`, multiple ledger workers share the work.

### Message

A pub/sub message should include enough information for subscribers to process it safely. That usually means an event ID, an event type, an aggregate or entity ID, a timestamp, a schema version, a correlation or trace ID, the payload itself, and attributes for filtering when the broker supports them.

Subscribers should not need to guess what the event means.

---

# How Pub/Sub Works

The basic flow:

```mermaid
sequenceDiagram
    participant P as Publisher
    participant T as Topic
    participant A as Subscription A
    participant B as Subscription B
    participant C1 as Consumer A
    participant C2 as Consumer B

    P->>T: Publish OrderPlaced
    T-->>P: Publish acknowledged
    T->>A: Copy for Subscription A
    T->>B: Copy for Subscription B
    A->>C1: Deliver message
    B->>C2: Deliver message
    C1-->>A: ACK
    C2-->>B: ACK
```

Each subscription processes independently. If the email subscriber is down, the inventory subscriber can continue. If analytics falls behind, it should not block fraud detection.

That independence is the real value of pub/sub.

---

# Fan-Out and Filtering

### Fan-Out

Fan-out means one event is delivered to multiple subscriptions.

```mermaid
flowchart TB
    Publisher[Publisher]:::primary -->|"UserRegistered"| Topic[(users.events)]:::purple

    Topic --> Welcome["Welcome Email"]:::teal
    Topic --> CRM["CRM Sync"]:::teal
    Topic --> Audit["Audit Log"]:::teal
    Topic --> Metrics["Product Metrics"]:::teal

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef purple fill:#da77f2,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

This keeps the publisher simple. New subscribers can be added without changing the publisher.

### Filtering

Filtering lets a subscription receive only matching messages.

```mermaid
flowchart TB
    Topic[(orders.events)]:::purple

    Topic -->|"eventType = OrderPlaced"| Inventory[Inventory Subscription]:::teal
    Topic -->|"eventType = OrderCancelled"| Refunds[Refund Subscription]:::teal
    Topic -->|"region = EU"| Compliance[EU Compliance Subscription]:::orange
    Topic -->|"all events"| Analytics[Analytics Subscription]:::green

    classDef purple fill:#da77f2,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

Prefer filtering on metadata or attributes when your broker supports it. Filtering by parsing large payloads in every consumer wastes work and spreads business rules everywhere.

---

# Push vs Pull Delivery

Pub/sub systems usually deliver messages in one of two ways.

### Push

The broker calls a subscriber endpoint.

```mermaid
flowchart LR
    Topic[(Topic)]:::purple --> Subscription[Subscription]:::orange
    Subscription -->|"HTTP push"| Endpoint[Subscriber Endpoint]:::teal

    classDef purple fill:#da77f2,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

Push is convenient for webhooks and low-latency delivery. The subscriber must expose a reliable endpoint and handle bursts.

### Pull

Subscribers fetch messages when they are ready.

```mermaid
flowchart LR
    Worker[Subscriber Worker]:::teal -->|"pull batch"| Subscription[Subscription]:::orange
    Subscription -->|"messages"| Worker
    Worker -->|"ack"| Subscription

    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

Pull gives consumers more control over batching, concurrency, and backpressure.

| Delivery Mode | Strength | Trade-off |
|---------------|----------|-----------|
| **Push** | Simple for web-facing endpoints and near-real-time callbacks | Backpressure is harder; endpoint must stay reachable |
| **Pull** | Consumer controls rate, batching, and concurrency | Consumer must run polling workers |

---

# Consumer Groups and Shared Subscriptions

Pub/sub fan-out and load balancing are different ideas.

Fan-out sends a copy to each subscription. Load balancing spreads one subscription's messages across multiple instances.

```mermaid
flowchart TB
    Topic[(orders.events)]:::purple

    Topic --> EmailSub["email-sub"]:::orange
    Topic --> AnalyticsSub["analytics-sub"]:::orange

    EmailSub --> E1[Email Worker 1]:::teal
    EmailSub --> E2[Email Worker 2]:::teal

    AnalyticsSub --> A1[Analytics Worker 1]:::green
    AnalyticsSub --> A2[Analytics Worker 2]:::green
    AnalyticsSub --> A3[Analytics Worker 3]:::green

    classDef purple fill:#da77f2,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

Kafka calls this a **consumer group**. Other systems may call it a shared subscription or competing consumers. The idea is the same: each service gets its own subscription, and instances of that service share the work.

---

# Durability and Replay

Pub/sub systems differ a lot in what they store.

Some are ephemeral: messages are delivered only to currently connected subscribers. If a subscriber is offline, it misses the message.

Others are durable: messages are retained for a period of time, and subscribers can catch up from their backlog.

| Mode | Behavior | Good For |
|------|----------|----------|
| **Ephemeral** | Only online subscribers receive messages | Presence, cache invalidation, low-value live updates |
| **Durable subscription** | Messages wait until the subscriber acknowledges them or retention expires | Business events, background processing |
| **Replayable log** | Consumers can seek to older offsets or timestamps within retention | Data pipelines, reprocessing, stream processing |

Replay is useful, but it is not free. Replaying old events can create duplicate side effects unless consumers are idempotent.

---

# Ordering

Most pub/sub systems do not provide global ordering. If they provide ordering, it is usually scoped to a partition, message group, ordering key, or entity key.

Design for this from the start. Put related events on the same key, such as `orderId` or `accountId`. Include fields like `eventId`, `eventTime`, and `version` so consumers can ignore stale events when a newer version has already been applied. Avoid workflows that require perfect global ordering.

```mermaid
flowchart LR
    Topic[(orders.events)]:::purple --> K1["key=order_1"]:::orange
    Topic --> K2["key=order_2"]:::orange

    K1 --> A["Placed -> Paid -> Shipped"]:::teal
    K2 --> B["Placed -> Cancelled"]:::teal

    classDef purple fill:#da77f2,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

Per-order ordering is usually realistic. Ordering every event in the whole company is not.

---

# Delivery Failures

Most durable pub/sub systems use at-least-once delivery. A subscriber may receive the same event more than once.

Subscribers should be idempotent and should classify failures. Retry transient failures with backoff, dead-letter poison messages after a bounded number of attempts, alert on growing backlog and DLQ count, and avoid retry storms when a downstream dependency is unhealthy.

```mermaid
flowchart LR
    Sub[Subscription]:::orange --> Worker[Subscriber]:::teal
    Worker -->|"success"| Ack[ACK]:::green
    Worker -->|"transient failure"| Retry[Retry with backoff]:::yellow
    Retry --> Sub
    Worker -->|"permanent failure"| DLQ[(Dead Letter Topic)]:::red

    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
```

Pub/sub does not remove failure handling. It moves failure handling to each subscriber.

---

# Schema Evolution

Events become contracts. Once several services consume an event, changing it casually can break production.

Prefer additive changes, and keep old fields until consumers migrate off them. Include a schema version when it helps, and for high-volume or strongly typed event streams, use a schema registry. Treat event removal as a breaking change, and document who owns each event.

Avoid publishing database rows directly as events. Internal table shape is not a stable public contract.

---

# Common Patterns

### Event Notification

Publish a small event that says something happened. Subscribers fetch more data if they need it.

```mermaid
flowchart LR
    Order[Order Service]:::primary -->|"OrderPlaced"| Topic[(orders.events)]:::purple
    Topic --> Email[Email Service]:::teal
    Topic --> Inventory[Inventory Service]:::teal
    Topic --> Analytics[Analytics Service]:::teal

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef purple fill:#da77f2,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

This is a good default when services need to react independently.

### Fan-Out to Queues

Use pub/sub to fan out events, then give each subscriber its own queue for buffering and worker scaling.

```mermaid
flowchart TB
    Publisher[Publisher]:::primary --> Topic[(Event Topic)]:::purple

    Topic --> Q1[(Email Queue)]:::orange
    Topic --> Q2[(Inventory Queue)]:::orange
    Topic --> Q3[(Analytics Queue)]:::orange

    Q1 --> W1[Email Workers]:::teal
    Q2 --> W2[Inventory Workers]:::teal
    Q3 --> W3[Analytics Workers]:::teal

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef purple fill:#da77f2,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

This is common with systems such as SNS to SQS. The topic handles fan-out; each queue handles durable work for one subscriber.

### Event-Carried State Transfer

The event contains enough state for subscribers to update themselves without calling the publisher.

Example: `ProductPriceChanged` includes product ID, old price, new price, currency, and version.

This reduces synchronous calls but makes schema design more important.

### Event Sourcing

Event sourcing is a separate architectural pattern where the source of truth is an append-only event log. Pub/sub can distribute those events, but publishing events does not automatically mean the system is doing event sourcing.

That distinction matters. Many systems use pub/sub for notifications while still storing current state in normal databases.

---

# Popular Implementations

| System | Model | Notes |
|--------|-------|-------|
| **Apache Kafka** | Durable partitioned log | Great for event streams, replay, consumer groups, and high-throughput pipelines. Ordering is per partition. |
| **Amazon SNS** | Managed fan-out service | Publishes to protocols such as SQS, Lambda, HTTP/S, email, and SMS. For failed deliveries, retries depend on protocol; DLQs can be attached to subscriptions. |
| **Google Cloud Pub/Sub** | Managed topics and subscriptions | Supports push and pull subscriptions, at-least-once delivery, ack deadlines, replay with retention, ordering keys, filters, and dead-letter topics. |
| **Azure Service Bus Topics** | Managed topics and subscriptions | Good for enterprise messaging with filters, sessions, scheduled delivery, and dead-letter subqueues. |
| **Redis Pub/Sub** | Ephemeral in-memory pub/sub | Very fast but at-most-once and not durable. Use Redis Streams when persistence and consumer groups matter. |

Do not choose only by brand name. Choose based on whether you need durability, replay, filtering, ordering, throughput, cloud integration, or low-latency ephemeral delivery.

---

# When to Use Pub/Sub

Use pub/sub when:

- Multiple services need to react to the same event.
- The publisher should not know all consumers.
- Subscribers can process independently.
- Eventual consistency is acceptable.
- New consumers may be added over time.

Avoid pub/sub when:

- The caller needs an immediate answer from the consumer.
- There is exactly one handler and no fan-out.
- The workflow needs strict step-by-step orchestration.
- Subscribers cannot tolerate duplicate or out-of-order events.
- Nobody owns monitoring the subscriptions and backlogs.

For multi-step business workflows, a workflow engine or orchestrator may be clearer than a chain of loosely connected events.

---

# Summary

Pub/sub lets publishers announce events without knowing who will consume them. Each subscription gets its own copy and can process independently.

The pattern is excellent for fan-out, event-driven workflows, and loose coupling. It also brings operational responsibilities: duplicate delivery, backlog monitoring, schema evolution, ordering limits, retries, and dead-letter handling.

Use pub/sub for events, not as a way to hide every service call. Design events as stable contracts, make subscribers idempotent, and choose a broker whose durability and replay model match the workload.

---

# Quiz
