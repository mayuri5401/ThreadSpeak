---
id: "hld-distributed-transactions-the-problem-with-distributed-transactions"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Distributed Transactions"
subSection: ""
title: "The Problem with Distributed Transactions"
slug: "hld-distributed-transactions-the-problem-with-distributed-transactions"
summary: "A local transaction is simple because one database owns the data. The application runs a sequence of statements, and the database commits everything or rolls everything back."
eli10: "Imagine The Problem with Distributed Transactions as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "The Problem with Distributed Transactions Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["HLD","Distributed Transactions","System Design","Architecture"]

---

A local transaction is simple because one database owns the data. The application runs a sequence of statements, and the database commits everything or rolls everything back.

Distributed systems remove that single point of control. One business operation, like placing an order, may touch several services that each own their own database and commit independently. That creates the core problem: **how do we keep the whole business operation correct when some steps commit and later steps fail"**

If payment succeeds but the order is never confirmed, the customer is charged for something the system cannot ship. If inventory is reserved but payment fails, stock sits locked even though nobody bought it. This chapter looks at why local ACID transactions do not extend naturally across services, why failures in distributed workflows are hard to interpret, and what any solution must handle.

---

# Local Transactions Are Simple

In a single database, the transaction manager sees all the data involved.

```mermaid
sequenceDiagram
    participant App as Application
    participant DB as Database

    App->>DB: BEGIN TRANSACTION
    App->>DB: INSERT INTO orders (...)
    App->>DB: UPDATE inventory SET quantity = quantity - 1
    App->>DB: INSERT INTO payments (...)

    alt All operations succeed
        App->>DB: COMMIT
        Note over DB: All changes become durable together
    else Any operation fails
        App->>DB: ROLLBACK
        Note over DB: No partial result is committed
    end
```

The database provides ACID guarantees:

| Property | Guarantee |
|----------|-----------|
| **Atomicity** | The transaction commits completely or not at all |
| **Consistency** | Committed data satisfies the database's rules and constraints |
| **Isolation** | Concurrent transactions do not observe unsafe intermediate states |
| **Durability** | Committed changes survive crashes according to the database's durability settings |

This works because the database can lock rows, track uncommitted changes, check constraints, and recover from its own log. One system owns the decision.

---

# Distributed Work Has No Single Owner

Now split the same operation across services.

```mermaid
flowchart TB
    Client[Client]:::rose

    Client --> OS[Order Service]:::primary
    OS --> IS[Inventory Service]:::primary
    OS --> PS[Payment Service]:::primary

    OS --> DB1[(Orders DB)]:::purple
    IS --> DB2[(Inventory DB)]:::purple
    PS --> DB3[(Payments DB)]:::purple

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef purple fill:#38d9a9,stroke:#000,color:#000
```

Each service can make a correct local decision and still leave the overall workflow in a bad state.

```mermaid
sequenceDiagram
    participant Client
    participant Order as Order Service
    participant Inventory as Inventory Service
    participant Payment as Payment Service

    Client->>Order: Place order
    Order->>Order: Create order PENDING (commit)
    Order->>Inventory: Reserve items
    Inventory->>Inventory: Create reservation (commit)
    Order->>Payment: Charge customer
    Payment-->>Order: Payment failed

    Note over Order,Payment: Order exists and inventory is reserved
    Note over Order,Payment: Payment did not complete
```

The order database cannot roll back the inventory database. The inventory service cannot know the payment result unless someone tells it. The payment service may not even be part of the same infrastructure.

Once a service commits a local transaction, undoing it is no longer a database rollback. It is a new business action, such as canceling an order, releasing a reservation, voiding an authorization, or issuing a refund.

---

# Why Not Use One Shared Database"

Putting all data in one database can be the right answer for many systems, especially early in a product's life. A modular monolith with strong local transactions is often simpler and safer than premature microservices.

But large systems sometimes split ownership for good reasons:

| Reason | What It Means |
|--------|---------------|
| **Independent scaling** | Payment, search, inventory, and order traffic may have very different load patterns |
| **Data ownership** | Teams need clear authority over schemas, writes, and invariants |
| **Technology fit** | Some workloads need relational storage, others need document, key-value, search, or ledger-style stores |
| **Fault isolation** | One overloaded subsystem should not take down every workflow |
| **Deployment independence** | Teams may need to change services without coordinating every database migration |

The trade-off is real. Service autonomy moves some consistency work out of the database and into the system design.

---

# Failure Scenarios

Distributed failures are often partial. One service may commit, another may time out, and a third may still be processing.

### Partial Commit

```mermaid
flowchart TB
    Request[Place Order]:::primary

    Request --> Step1[1. Create Order]:::green
    Step1 --> Step2[2. Reserve Inventory]:::green
    Step2 --> Step3[3. Charge Payment]:::red
    Step3 --> Step4[4. Confirm Order]:::yellow

    Step1 -.-> Note1[Committed]:::green
    Step2 -.-> Note2[Committed]:::green
    Step3 -.-> Note3[Failed]:::red
    Step4 -.-> Note4[Never reached]:::yellow

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
```

The first two services did exactly what they were asked to do. The workflow is still incomplete.

### Network Partition

```mermaid
flowchart LR
    subgraph DC1["Data Center 1"]
        OS[Order Service]:::primary
        DB1[(Orders DB)]:::purple
    end

    subgraph DC2["Data Center 2"]
        PS[Payment Service]:::primary
        DB2[(Payments DB)]:::purple
    end

    OS <-->|Network partition| PS

    OS --> DB1
    PS --> DB2

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef purple fill:#38d9a9,stroke:#000,color:#000
```

When services cannot communicate, the caller does not know whether the remote service is down, slow, isolated, or still doing the work.

### Timeout Ambiguity

A timeout is not a result. It is the absence of a result.

```mermaid
flowchart TD
    Request[Payment Request]:::primary --> Timeout{Timeout}:::yellow

    Timeout --> Q1[Did the request reach<br/>the service"]:::yellow
    Timeout --> Q2[Did the service<br/>process it"]:::yellow
    Timeout --> Q3[Did the response<br/>get lost"]:::yellow

    Q1 --> Unknown[Unknown]:::red
    Q2 --> Unknown
    Q3 --> Unknown

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
```

| What Happened | Payment State | Retrying Without Protection |
|---------------|---------------|-----------------------------|
| Request never arrived | Not charged | Safe |
| Request arrived and failed before commit | Not charged | Usually safe |
| Request succeeded but response was lost | Charged | May double-charge |

This is why production payment and ordering systems rely on idempotency keys, durable request records, unique constraints, and reconciliation jobs. Retrying is necessary, but blind retrying is dangerous.

### Service Crash

```mermaid
sequenceDiagram
    participant OS as Order Service
    participant PS as Payment Service
    participant DB as Payment DB

    OS->>PS: Charge $100
    PS->>DB: BEGIN
    PS->>DB: INSERT payment

    Note over PS: Service crashes before COMMIT

    Note over DB: Local transaction rolls back
    Note over OS: Caller waits, then times out
```

The payment was not committed, but the caller does not automatically know that. A crash after commit but before the response would look similar from the caller's point of view.

---

# Consistency Choices

Local transactions usually give one application a strong view of one database. Distributed systems make you choose where strong consistency is worth the cost.

### Strong Consistency

Strong consistency means reads reflect the latest committed write according to the system's contract. In practice, this usually requires coordination before the write is acknowledged or before a read is served.

```mermaid
sequenceDiagram
    participant W as Writer
    participant N1 as Node 1
    participant N2 as Node 2
    participant R as Reader

    W->>N1: Write X=5
    N1->>N2: Replicate X=5
    Note over N1,N2: Wait for required acknowledgment
    N2-->>N1: ACK
    N1-->>W: Write complete

    R->>N2: Read X
    N2-->>R: X=5
```

The cost is latency and reduced availability when the required participants cannot communicate.

### Eventual Consistency

Eventual consistency means replicas or services may disagree for a while, but converge if updates stop and messages are delivered.

```mermaid
sequenceDiagram
    participant W as Writer
    participant N1 as Node 1
    participant N2 as Node 2
    participant R as Reader

    W->>N1: Write X=5
    N1-->>W: Write complete

    Note over N1,N2: Async replication

    R->>N2: Read X
    N2-->>R: Old value

    N1->>N2: Replicate X=5

    R->>N2: Read X
    N2-->>R: X=5
```

The benefit is lower latency and better availability. The cost is that application code must handle intermediate states.

### The CAP Connection

During a network partition, a distributed system cannot always provide both a consistent answer and an available answer.

```mermaid
flowchart TD
    P[Network partition]:::orange --> Choice{What should the system do"}:::yellow

    Choice -->|Preserve consistency| Block[Reject or delay some operations]:::purple
    Choice -->|Preserve availability| Accept[Accept operations that may conflict]:::purple

    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
    classDef purple fill:#38d9a9,stroke:#000,color:#000
```

This is the practical lesson from CAP. Partitions are not an exotic edge case; they are part of operating distributed systems. Your design must decide what happens when coordination is not possible.

---

# Real Consequences

Inconsistent state becomes support tickets, accounting gaps, unavailable inventory, and manual cleanup.

### Double Charge

Scenario: payment succeeds, but the response is lost

1. Order Service calls Payment Service.
2. Payment Service charges the customer.
3. The response is lost.
4. Order Service times out and retries.
5. Payment Service charges the customer again.

### Unconfirmed Order

Scenario: payment succeeds, but order confirmation fails

1. Payment Service captures $100.
2. Order Service fails before marking the order `CONFIRMED`.
3. The order remains `PENDING` or lacks its payment reference.
4. Support sees a charge with no clear fulfillment state.

### Orphaned Reservation

Scenario: inventory is reserved, but payment fails

1. Inventory Service reserves 5 items.
2. Payment Service declines the card.
3. The workflow crashes before releasing the reservation.
4. Items appear unavailable until cleanup runs.

### Conflicting Decisions

Scenario: two services make local decisions from stale information

1. Inventory says the last item is available.
2. Two order workflows reserve it concurrently.
3. Both payments succeed.
4. Only one order can be fulfilled.

---

# Why Agreement Is Hard

Distributed transaction systems are built on unreliable communication between independently failing components.

### No Shared Memory

Services cannot share local variables, process memory, or database locks. They coordinate by sending messages.

Messages can be delayed, lost, duplicated, reordered, or delivered after the caller has already given up.

### No Perfect Failure Detector

If a service does not respond, you cannot tell from the outside whether it crashed, paused for garbage collection, lost network connectivity, or completed the work but lost the response.

Timeouts are useful engineering tools. They are not proof of failure.

### No Reliable Global Clock

Each machine has its own clock, and clocks drift.

```mermaid
flowchart TB
    subgraph S1["Service 1"]
        C1[Clock: 10:00:00.000]:::primary
    end

    subgraph S2["Service 2"]
        C2[Clock: 10:00:00.003]:::primary
    end

    subgraph S3["Service 3"]
        C3[Clock: 09:59:59.998]:::primary
    end

    C1 --> Q[Which event happened first"]:::yellow
    C2 --> Q
    C3 --> Q

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
```

Timestamps are useful for observability, ordering within one system, and conflict resolution policies. They are not an authoritative source of truth for cross-service transaction order.

### Agreement Needs Durable State

If a coordinator asks three participants to commit, every participant must be able to recover its local transaction state after a crash. That means durable logs, transaction IDs, retries, and careful handling of duplicate messages.

This is why distributed transaction protocols are more than "call three services and roll back on error." The hard part is recovery after failures at every point in the workflow.

---

# What a Good Solution Must Handle

A practical design must answer these questions:

| Question | Why It Matters |
|----------|----------------|
| **Who decides the final outcome"** | Without a decision point, services may disagree forever |
| **What is recorded durably"** | Recovery depends on facts that survive crashes |
| **Are retries safe"** | Duplicate requests are normal in distributed systems |
| **What states can users see"** | Intermediate states must be valid business states |
| **How are failures repaired"** | Some work needs compensation, reconciliation, or manual review |
| **What is the availability trade-off"** | Stronger coordination often means more waiting or blocking |

No pattern gives perfect atomicity, isolation, availability, low latency, and simple operations across arbitrary services. Good systems choose the right trade-off for each workflow.

---

# Approaches

Several patterns address distributed transactions, each with different trade-offs.

```mermaid
flowchart TD
    Problem[Distributed transaction problem]:::primary

    Problem --> TwoPC[Two-Phase Commit]:::orange
    Problem --> ThreePC[Three-Phase Commit]:::orange
    Problem --> Saga[Saga Pattern]:::green
    Problem --> Outbox[Outbox Pattern]:::green

    TwoPC --> Strong[Atomic commit<br/>with blocking risk]:::purple
    ThreePC --> Assumptions[Non-blocking under<br/>strong timing assumptions]:::purple
    Saga --> Eventual[Eventual consistency<br/>with compensation]:::purple
    Outbox --> Messaging[Reliable event publishing<br/>with local transactions]:::purple

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef purple fill:#38d9a9,stroke:#000,color:#000
```

| Pattern | Best Fit | Main Trade-off |
|---------|----------|----------------|
| **Two-Phase Commit** | Databases or tightly controlled transactional resources | Strong atomic commit, but participants can block while holding locks |
| **Three-Phase Commit** | Teaching distributed commit limitations | Adds a phase, but relies on assumptions that rarely hold in real networks |
| **Saga** | Long-running business workflows across services | Higher availability, but intermediate states and compensation are visible |
| **Outbox** | Reliable event publishing from a service database | Solves message publishing consistency, not the whole business transaction by itself |

---

# Summary

Distributed transactions are hard because the system loses the one thing local transactions depend on: a single authority with complete control over the data.

In a distributed workflow:

- each service commits its own local transaction
- later failures cannot be erased by database rollback
- timeouts do not tell you what happened
- retries can create duplicates unless operations are idempotent
- intermediate states must be valid and observable
- recovery requires durable state, not just error handling

The goal is not to pretend distributed workflows behave like one database transaction. The goal is to design explicit coordination, compensation, retry, and reconciliation paths so the system reaches a correct business outcome.
