---
id: "hld-observability-three-pillars-of-observability"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Observability"
subSection: ""
title: "Three Pillars of Observability"
slug: "hld-observability-three-pillars-of-observability"
summary: "Observability is the ability to understand what is happening inside a system by examining its outputs. It helps teams answer why a system is behaving a certain way, not only whether it is up."
eli10: "Imagine Three Pillars of Observability as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Three Pillars of Observability Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["HLD","Observability","System Design","Architecture"]

---

Observability is the ability to understand what is happening inside a system by examining its outputs. It helps teams answer why a system is behaving a certain way, not only whether it is up.

In distributed systems, one request can cross many services, databases, queues, caches, and third-party dependencies. Logs, metrics, and traces give engineers different views of that behavior.

In this chapter, you will learn how logs, metrics, and traces work together to explain system behavior, especially when monitoring alone is not enough.

---

# Why Observability Matters

In a monolithic application, debugging is relatively straightforward. You have one process, one log file, and one stack trace when something goes wrong. You can step through code with a debugger and reproduce issues locally.

Distributed systems change everything. A single user request might touch dozens of services, each running on different machines, each with its own logs and failure modes. The problem might be in any of them, or in the network between them, or in the interaction between services that individually work fine.

```mermaid
flowchart LR
    U[User Request]:::rose --> GW[API Gateway]:::primary
    GW --> Auth[Auth Service]:::primary
    GW --> Product[Product Service]:::primary
    Product --> Inventory[Inventory]:::primary
    Product --> Pricing[Pricing]:::primary
    Product --> Cache[(Redis)]:::purple
    Product --> DB[(Database)]:::purple
    Pricing --> External[External API]:::orange

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef purple fill:#9775fa,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef rose fill:#f783ac,stroke:#000,color:#000
```

When latency spikes in this system, where do you look first" Is it the database" The external API" Network congestion between services" A slow cache lookup" 

Without observability, finding the answer requires guesswork and luck.

### The Debugging Challenge

Traditional debugging approaches fail in distributed systems. Debuggers are useful in local development but not across production services, print statements collapse under high-volume traffic, local log files stop helping once work spans many servers, and reproducing locally rarely captures race conditions, network behavior, or load-dependent bugs.

Observability tools fill this gap. They collect and correlate data from across your entire system, making it possible to ask why a specific request took 5 seconds, which service is causing an error-rate increase, or what changed between a healthy period and a broken one.

---

# The Three Pillars

Observability rests on three pillars: **logs**, **metrics**, and **traces**. Each one answers a different kind of question, and together they give you a clear, end-to-end view of what’s happening inside your system.

```mermaid
flowchart TB
    subgraph Observability
        L[Logs<br/>What happened"]:::primary
        M[Metrics<br/>How much/many"]:::orange
        T[Traces<br/>Where did it go"]:::teal
    end

    L --> Debug[Debug specific issues]:::green
    M --> Trend[Track trends and thresholds]:::green
    T --> Flow[Follow request flow]:::green

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

**Logs** give you detailed, time-ordered records that help you debug specific issues.

**Metrics** give you aggregated numbers that help you track trends, set thresholds, and catch problems early.

**Traces** give you a request’s journey across services, showing the full flow and where time is spent.

A simple way to remember them is to think of a doctor’s toolkit: logs are clinical notes, metrics are vital signs, and traces are scans that reveal paths and connections.

---

# Pillar 1: Logs

Logs are timestamped records of discrete events in your system. Whenever something meaningful happens, your code writes a log entry that describes it.

### What Logs Look Like

Each entry typically captures when the event happened, where it happened, what occurred, and enough searchable context, such as `order_id`, `user_id`, or error details.

### Structured vs Unstructured Logs

Modern systems prefer **structured logs** (usually JSON) over plain text because structured logs are easier to parse, index, and query.

#### Unstructured (hard to parse reliably)

#### Structured (machine-readable)

With structured logs, queries become straightforward: show all **ERROR** logs from `payment-service` in the last hour, find failed orders over `$1000`, or count events by type per service.

### What Logs Are Good For

Logs are especially useful for debugging errors, preserving audit trails, investigating security events, and understanding why a specific decision was made.

### Limitations of Logs

Logs are essential, but they do not scale gracefully on their own. High-traffic systems can produce billions of lines per day, storage and indexing get expensive, useful entries get buried in noise, logs describe individual events rather than trends, and one service’s log rarely explains the whole distributed request.

This is why logs alone are not enough. Next, we’ll use **metrics** to zoom out and understand the system’s overall health and trends.

---

# Pillar 2: Metrics

Metrics are numerical measurements collected over time. While logs capture individual events, metrics aggregate those events into **time series** so you can spot trends, compare behavior over time, and detect issues early.

### What Metrics Look Like

### Types of Metrics

Metrics generally fall into a few common types:

#### Counters

Counters track totals that only go up, such as requests served, errors occurred, or bytes transferred.

#### **Gauges**

Gauges track current values that can go up or down, such as active connections, queue depth, or memory usage.

#### **Histograms**

Histograms track distributions by bucket, such as request latency, request size, or processing duration.

Here’s a quick summary:

| Type | Description | Example | Operations |
|------|-------------|---------|------------|
| **Counter** | Monotonically increasing value | Total requests, errors, bytes | Rate, increase |
| **Gauge** | Current value that can go up or down | Memory usage, queue size, temperature | Current, min, max, avg |
| **Histogram** | Distribution of observations | Request latency, response size | Percentiles, averages |
| **Summary** | Like histogram but with pre-calculated percentiles | Same use cases, lower storage | p50, p95, p99 |

### The Four Golden Signals

If you track nothing else, track these four. They cover the most important ways services fail or degrade.

```mermaid
flowchart TB
    subgraph Golden Signals
        L[Latency<br/>How long requests take]:::primary
        T[Traffic<br/>Requests per second]:::orange
        E[Errors<br/>Request failure rate]:::red
        S[Saturation<br/>Resource utilization]:::teal
    end

    L --> Example1[p50=50ms, p99=500ms]:::primary
    T --> Example2[1000 req/sec]:::orange
    E --> Example3[0.1% error rate]:::red
    S --> Example4[CPU 75%, Memory 60%]:::teal

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

Latency shows how long requests take, traffic shows demand, errors show failure rate, and saturation shows how full constrained resources are.

They quickly tell you whether your service is healthy and whether it is trending toward trouble.

### What Metrics Are Good For

Metrics are useful for alerting, capacity planning, SLA tracking, anomaly detection, and dashboard visualization because they turn many events into trends that can be graphed and compared.

### Limitations of Metrics

Metrics are powerful, but they have blind spots. Aggregation hides details, high-cardinality labels can make the backend unmanageable, error spikes do not reveal which users were affected, and you can only query metrics you decided to collect in advance.

Metrics usually tell you *that* something is wrong. To find *where* it went wrong in a distributed system, you need **traces**.

---

# Pillar 3: Traces

Traces follow a single request as it moves through your distributed system. They show which services were called, in what order, and how long each step took. If metrics tell you *something* is wrong, traces help you find *where* it went wrong.

### What Traces Look Like

```mermaid
flowchart TB
    subgraph Trace["Trace: abc-123 (Total: 450ms)"]
        A["API Gateway<br/>50ms"]:::primary --> B["Auth Service<br/>30ms"]:::primary
        A --> C["Order Service<br/>200ms"]:::orange
        C --> D["Inventory Service<br/>80ms"]:::primary
        C --> E["Database<br/>100ms"]:::red
        D --> F["Cache<br/>5ms"]:::primary
    end

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
```

A trace is made up of **spans**. Each span represents a unit of work, like a service call, a database query, or a cache lookup.

### What a span typically includes

A span usually includes a trace ID, span ID, parent span ID, operation name, start and end time, and key-value attributes that describe the work.

### What Traces Are Good For

Traces are useful for finding bottlenecks, understanding service dependencies, debugging specific requests, identifying cascading failures, and optimizing critical paths.

### Limitations of Traces

Traces are powerful, but they come with practical constraints. Most systems sample because storing every trace is expensive, every service must propagate trace context, traces cost more to retain than metrics, and large traces with hundreds of spans can be hard to analyze.

---

# How the Pillars Work Together

The real power of observability comes from combining **metrics, traces, and logs**. Each pillar answers a different question, and together they take you from “something feels wrong” to a concrete root cause.

```mermaid
flowchart LR
    Problem[Production Issue]:::red --> M{Check Metrics}:::yellow
    M --> |High latency detected| T{Find Traces}:::yellow
    T --> |Slow database calls| L{Check Logs}:::yellow
    L --> |Connection pool exhausted| Fix[Fix the Issue]:::green

    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

### A practical debugging workflow

Imagine users report slow checkout. Metrics tell you there is a problem: the dashboard shows p99 latency spiking from 500ms to 5s and error rate increasing from 0.1% to 2%. Traces tell you where the problem is: slow traces show Payment Service taking 4s instead of 100ms because an external API is timing out. Logs tell you why: Payment Service logs show "Connection to payment gateway refused: max retries exceeded," pointing to a payment gateway outage.

Without all three, you end up guessing. With all three, you can move quickly and confidently from symptom to cause.

---

# Monitoring vs Observability

These terms are often used interchangeably, but they represent different philosophies.

**Monitoring** is about watching for *known* problems. You decide ahead of time what to measure, set thresholds, and alert when something crosses the line. This works well for predictable failure modes.

**Observability** is about investigating *unknown* problems. You collect enough high-quality signals (logs, metrics, traces, plus useful context) so you can ask new questions when something unexpected happens. This is what helps in complex distributed systems where failures do not follow a script.

```mermaid
flowchart TB

    subgraph Observability
		direction TB
        O1[Collect rich data]:::orange --> O2[Ask any question]:::orange
        O2 --> O3[Explore and discover]:::orange
    end
	
    subgraph Monitoring
		direction TB
        M1[Define thresholds]:::primary --> M2[Watch dashboards]:::primary
        M2 --> M3[Get alerts]:::primary
    end	

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
```

### Quick comparison

| Monitoring | Observability |
|------------|---------------|
| Answers known questions | Answers unknown questions |
| Predefined alerts | Ad-hoc queries |
| "Is the server up"" | "Why is this user's request slow"" |
| Dashboards | Exploration tools |
| Reactive | Proactive and reactive |

In practice, you need both. Monitoring catches the issues you can predict. Observability helps you debug the ones you cannot.

---

# Building an Observable System

Observability does not happen by accident. You have to design for it from day one, just like scalability or reliability.

### 1. Instrument Everything

Every service should emit **logs, metrics, and traces** as a first-class part of the codebase.

```mermaid
flowchart TB
    App[Application Code]:::primary --> Inst[Instrumentation Layer]:::orange
    Inst --> L[Logs]:::teal
    Inst --> M[Metrics]:::teal
    Inst --> T[Traces]:::teal

    L --> Collector[Observability Backend]:::purple
    M --> Collector
    T --> Collector

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef purple fill:#9775fa,stroke:#000,color:#000
```

### 2. Use Consistent Standards

Observability breaks down quickly when every team does things differently. Standardize logs around consistent JSON fields, metrics around clear names and bounded labels, and traces around stable span attributes plus context propagation standards such as **W3C Trace Context**.

### 3. Connect the Pillars

The pillars are most useful when you can move between them quickly. Include **trace IDs** in log entries and attach **exemplars** to metric points when possible.

This lets you jump from a metric spike to the exact traces behind it, then to the logs for the failing span.

### 4. Design for Debuggability

A good rule of thumb is simple: *If this breaks during an incident, what will I need to know to fix it"*

Then make sure the system captures that information by default, not as an afterthought.

---

# Summary

Observability is about understanding what is happening inside your system. Logs record discrete events with full context, metrics aggregate behavior into time series, and traces follow requests through distributed systems.

Each pillar answers a different question. Metrics help you notice that something is wrong, traces help you locate where it went wrong, and logs help explain why it happened.

The pillars work best together. A typical debugging flow starts with metrics detecting an anomaly, traces locating the problem, and logs revealing the root cause.

With the fundamentals established, we will now dive deeper into each pillar. The next chapter focuses on logging, the most familiar pillar but one that is often implemented poorly. We will cover how to write useful logs, choose the right level, structure log data, and avoid common mistakes that make logs useless when you need them most.

---

# Quiz
