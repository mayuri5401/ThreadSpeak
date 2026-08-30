---
id: "hld-microservices-patterns-backend-for-frontend-bff"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Microservices Patterns"
subSection: ""
title: "Backend for Frontend (BFF)"
slug: "hld-microservices-patterns-backend-for-frontend-bff"
summary: "An API gateway gives clients a controlled entry point. A Backend for Frontend goes one step further: it gives each client experience an API shaped for that experience."
eli10: "Imagine Backend for Frontend (BFF) as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Backend for Frontend (BFF) Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["HLD","Microservices Patterns","System Design","Architecture"]

---

An API gateway gives clients a controlled entry point. A Backend for Frontend goes one step further: it gives each client experience an API shaped for that experience.

A web app, mobile app, partner integration, and admin console may use the same product domain but need different payloads, caching behavior, latency budgets, permissions, and release cycles.

The **Backend for Frontend (BFF)** pattern creates a small backend for one client family. It receives client requests, calls backend services, composes the result, and returns a response that fits that client.

The goal is to keep client-specific behavior close to the client without polluting core services or turning a shared gateway into a pile of client-specific branches.

---

# The Problem: One API Shape Does Not Fit Every Client

Consider a product detail page used by three clients.

| Client | Needs |
|--------|-------|
| Web app | Full description, large images, reviews, related products, SEO metadata |
| Mobile app | Compact description, small images, rating summary, stock status |
| Partner API | Product ID, SKU, price, availability, bulk sync metadata |

Those clients are asking about the same product, but they are not asking for the same representation.

### Different Interaction Patterns

```mermaid
flowchart LR
    subgraph Partner["Partner Integration"]
        direction LR
        P1[Scheduled job]:::teal --> P2[Bulk catalog fetch]:::teal --> P3[Local sync]:::teal
    end

    subgraph Mobile["Mobile App"]
        direction LR
        M1[Screen opens]:::orange --> M2[One compact API call]:::orange --> M3[Native UI renders]:::orange
    end

    subgraph Web["Web Application"]
        direction LR
        W1[Page request]:::rose --> W2[Server render or parallel fetch]:::rose --> W3[Browser hydrates UI]:::rose
    end

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

The mobile app is sensitive to payload size and unreliable networks. The web app may care about server rendering, SEO metadata, and rich interaction. The partner API may prefer stable bulk-oriented contracts over UI-friendly responses.

### Different Release Cycles

| Client | Typical Release Constraint |
|--------|----------------------------|
| Web app | Can deploy many times per day |
| iOS app | App Store review and slow client upgrade curve |
| Android app | Faster than iOS in many teams, still client-version constrained |
| Partner API | Breaking changes may require months of notice |
| Admin console | Operational workflows may need fast iteration and richer permissions |

A shared API must protect the slowest-moving consumer. BFFs let each client contract evolve at the pace of that client.

### Shared Gateway Drift

When every client-specific concern goes into one gateway, the gateway stops being a clean edge layer.

```mermaid
flowchart LR
    subgraph Clients
        direction LR
        Web[Web]:::rose
        Mobile[Mobile]:::rose
        Partner[Partner]:::rose
        Admin[Admin]:::rose
    end

    subgraph Gateway["Shared Gateway"]
        GW[Gateway Logic]:::orange
        Logic1[Mobile payload trimming]:::yellow
        Logic2[Partner bulk format]:::yellow
        Logic3[Web SEO fields]:::yellow
        Logic4[Admin workflow fields]:::yellow

        GW --> Logic1
        GW --> Logic2
        GW --> Logic3
        GW --> Logic4
    end

    Clients --> Gateway

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
```

Changes for one client start creating risk for every other client. Ownership also gets murky: the platform team owns the gateway, but product teams keep adding product-specific behavior to it.

---

# The Solution: Backend for Frontend

> [!PAYWALL] This content is for premium members only.

A BFF is a client-specific backend. It sits between one frontend experience and the core backend services.

```mermaid
flowchart TD
    Web[Web Application]:::rose --> WebBFF[Web BFF]:::orange
    Mobile[Mobile App]:::rose --> MobileBFF[Mobile BFF]:::orange
    Partner[Partner API Client]:::rose --> PartnerBFF[Partner BFF]:::orange
    Admin[Admin Console]:::rose --> AdminBFF[Admin BFF]:::orange

    WebBFF --> Product[Product Service]:::primary
    WebBFF --> Review[Review Service]:::primary
    WebBFF --> Search[Search Service]:::primary

    MobileBFF --> Product
    MobileBFF --> Review

    PartnerBFF --> Product
    AdminBFF --> Product
    AdminBFF --> Search

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
```

Each BFF owns the client-facing contract for one client family:

- URL paths, GraphQL schema, or tool schema
- Payload shape and field naming
- Aggregation strategy
- Client-specific caching and fallback behavior
- API versioning for that client
- Translation between frontend needs and backend service APIs

Business invariants still belong in core services. A BFF can shape a checkout request for mobile. The order service still validates inventory, pricing, payment state, and order rules.

---

# Example: Product Detail Endpoint

A mobile BFF returns a compact representation.

A web BFF returns data needed by a richer page.

The backend product service may expose neither of these shapes. It can expose a domain-oriented product API. The BFF adapts that API for the client.

---

# How a BFF Handles Aggregation

```mermaid
sequenceDiagram
    participant M as Mobile App
    participant BFF as Mobile BFF
    participant P as Product Service
    participant R as Review Service
    participant I as Inventory Service

    M->>BFF: GET /api/products/12345

    par Parallel calls
        BFF->>P: Product details
        BFF->>R: Review summary
        BFF->>I: Stock status
    end

    P-->>BFF: Product data
    R-->>BFF: Rating and count
    I-->>BFF: In stock

    BFF->>BFF: Compose compact response
    BFF-->>M: Product response
```

The BFF turns one client request into several backend calls. This is useful, but it changes the failure model.

If the review service is slow, the product page should probably still load with `reviewsUnavailable: true`. If the inventory service is unavailable, the BFF may need to hide the buy button. These are product decisions, and the BFF is often the right place to encode the client-facing fallback.

Use:

- Short per-service timeouts
- Bounded parallelism
- Partial responses when the product can tolerate them
- Clear error fields for optional data
- Retries only for safe operations
- Request tracing across every downstream call

---

# BFF and API Gateway Together

BFFs and API gateways are commonly used together.

```mermaid
flowchart TD
    Web[Web App]:::rose --> Gateway[API Gateway]:::green
    Mobile[Mobile App]:::rose --> Gateway
    Partner[Partner Client]:::rose --> Gateway
    Admin[Admin Console]:::rose --> Gateway

    Gateway --> WebBFF[Web BFF]:::orange
    Gateway --> MobileBFF[Mobile BFF]:::orange
    Gateway --> PartnerBFF[Partner BFF]:::orange
    Gateway --> AdminBFF[Admin BFF]:::orange

    WebBFF --> Services[Backend Services]:::primary
    MobileBFF --> Services
    PartnerBFF --> Services
    AdminBFF --> Services

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
```

The API gateway handles shared edge concerns:

- TLS termination
- Authentication entry point
- WAF, bot protection, and abuse controls
- Global rate limits
- Request logging
- Routing to the correct BFF

The BFF handles client-specific concerns:

- Payload shape
- Client-specific aggregation
- Frontend version compatibility
- UI-oriented fallback behavior
- Client-specific caching
- Admin workflow contracts and permissions

This split keeps the gateway from becoming an application layer while still giving clients tailored APIs.

---

# Ownership Models

### Frontend Team Ownership

The team that owns the frontend also owns its BFF.

```mermaid
flowchart TD
    subgraph WebTeam["Web Team"]
        WebApp[Web App]:::rose
        WebBFF[Web BFF]:::orange
    end

    subgraph MobileTeam["Mobile Team"]
        MobileApp[Mobile App]:::teal
        MobileBFF[Mobile BFF]:::orange
    end

    subgraph Core["Core Services"]
        Services[Backend Services]:::primary
    end

    WebApp --> WebBFF
    WebBFF --> Services

    MobileApp --> MobileBFF
    MobileBFF --> Services

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
```

This model gives the client team control over release cadence and API shape. It works well when frontend engineers are comfortable owning server-side code, observability, security reviews, and incident response.

### Platform Ownership

A platform or API team owns the BFF layer for all clients.

```mermaid
flowchart TD
    subgraph Clients["Client Teams"]
        WebTeam[Web Team]:::rose
        MobileTeam[Mobile Team]:::teal
        AgentTeam[Agent Team]:::teal
    end

    subgraph Platform["API Platform Team"]
        WebBFF[Web BFF]:::orange
        MobileBFF[Mobile BFF]:::orange
        AgentBFF[Agent BFF]:::orange
    end

    subgraph Services["Core Services"]
        S1[Product Service]:::primary
        S2[Order Service]:::primary
        S3[Search Service]:::primary
    end

    WebTeam --> WebBFF
    MobileTeam --> MobileBFF
    AgentTeam --> AgentBFF

    WebBFF --> S1
    WebBFF --> S2
    MobileBFF --> S1
    AgentBFF --> S1
    AgentBFF --> S3

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
```

This model improves consistency, but it can slow product teams down. It also risks recreating the same one-size-fits-all API problem inside a different team.

The best ownership model depends on team maturity. A common compromise is platform-owned infrastructure and templates, with product teams owning BFF behavior.

---

# BFF vs API Gateway

| Aspect | API Gateway | BFF |
|--------|-------------|-----|
| Primary job | Shared edge policy and routing | Client-specific API contract |
| Typical owner | Platform or infrastructure team | Client/product team, sometimes platform |
| Logic | Auth entry point, rate limits, routing, logging | Aggregation, shaping, fallbacks, client compatibility |
| Scope | Many clients | One client family |
| Coupling | Low coupling to client UI | Intentionally coupled to one client experience |
| Failure impact | Broad if shared gateway fails | Usually limited to one client family |

A BFF is not a replacement for an API gateway. It is a place for client-specific behavior that should not live in the gateway or core services.

---

# Implementation Options

### Dedicated Service

A BFF can be a normal service written in Node.js, Java, Go, Python, C#, or another backend stack. This is the clearest model when the BFF has nontrivial aggregation, background caching, strict SLOs, or complex dependencies.

### Framework-Integrated BFF

Modern frontend frameworks often include server-side capabilities. For example, Next.js supports BFF-style endpoints through Route Handlers and proxy behavior. This can be a good fit when the BFF is closely tied to a web app.

There are constraints. Route handlers are public HTTP endpoints and need proper authentication, validation, and error handling. For server-rendered components, calling your own route handler can add an unnecessary HTTP round trip; fetching directly from the data source or shared server module is usually better.

### Serverless BFF

Serverless functions are useful for small BFF endpoints, webhooks, and low-operations workloads. Watch cold starts, execution limits, connection management, and provider-specific behavior.

### GraphQL BFF

GraphQL can act as a BFF when clients need flexible field selection.

```mermaid
flowchart LR
    Client[Client]:::rose -->|GraphQL query| BFF[GraphQL BFF]:::orange
    BFF --> Resolvers{Resolvers}:::yellow

    Resolvers --> Product[Product Service]:::primary
    Resolvers --> User[User Service]:::primary
    Resolvers --> Review[Review Service]:::primary

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
```

GraphQL helps with over-fetching and under-fetching, but it is not automatically simpler. It needs query complexity limits, authorization at field or resolver boundaries, caching strategy, schema governance, and good resolver performance. In larger organizations, GraphQL federation can combine multiple APIs into a single graph, which may reduce the need for many separate BFFs.

### Agent BFF

AI agents introduce a newer version of the BFF problem. An agent may need tool schemas, constrained actions, retrieval endpoints, model selection, and safety checks that are different from a human UI.

An Agent BFF can:

- Expose stable tool contracts
- Convert tool calls into backend service calls
- Apply tenant and permission checks
- Limit dangerous operations
- Add retrieval context
- Enforce model and token budgets
- Return machine-readable errors that the agent can recover from

Treat agent-facing APIs as client contracts. A small schema change can alter agent behavior even when the backend service still works.

---

# Design Rules

### Keep BFFs Thin

BFFs should aggregate, adapt, and protect client contracts. Core business logic belongs in domain services.

### Good BFF Responsibilities

- Combine product, review, and inventory data
- Return mobile-specific image sizes
- Translate backend errors into client-safe errors
- Add pagination metadata for one client

### Poor BFF Responsibilities

- Calculate shipping costs
- Apply discount eligibility rules
- Decide whether payment can be captured
- Update domain databases directly

### Define Explicit Contracts

Each BFF should have a documented contract. Use OpenAPI, GraphQL schema, protobuf, AsyncAPI, or tool schema definitions depending on the interface.

Contracts prevent accidental coupling. They are especially important for mobile apps, partners, and AI agents because client upgrades are not always immediate.

### Share Infrastructure, Not Client Behavior

Share:

- Deployment templates
- Observability libraries
- Authentication middleware
- Generated service clients
- Error handling conventions
- Security scanning and dependency management

Avoid sharing:

- Client response schemas
- Endpoint definitions
- UI-specific transformations
- Agent tool prompts or tool schemas

Shared libraries are useful until they become a hidden shared BFF. Keep shared code boring and infrastructural.

### Design for Partial Failure

BFFs often fan out to multiple services. A single slow dependency can dominate the user experience.

```mermaid
flowchart TD
    BFF[Mobile BFF]:::orange

    BFF --> Product[Product Service]:::green
    BFF --> Review[Review Service]:::red
    BFF --> Inventory[Inventory Service]:::green

    BFF --> Response{Compose Response}:::yellow

    Response -->|Include| ProductData[Product Data]:::green
    Response -->|Fallback| ReviewData[Reviews unavailable]:::red
    Response -->|Include| InventoryData[Inventory Data]:::green

    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
```

Define which dependencies are required and which are optional. Product details may be required. Reviews may be optional. Inventory may be required if the screen includes a buy button.

### Monitor Per Client

Track BFF metrics separately:

- Request rate
- p50, p95, and p99 latency
- Error rate by route
- Downstream call count per request
- Response size
- Cache hit rate
- Partial response rate
- Client version
- Tenant or partner where applicable

For Agent BFFs, also track tool-call success, recoverable errors, rejected actions, token usage, model fallback, and safety-policy outcomes.

---

# Common Pitfalls

### 1. BFF Becomes a Monolith

The BFF starts as a thin composition layer and gradually absorbs business rules, persistence, and workflow orchestration.

```mermaid
flowchart LR
    subgraph Start["Start"]
        BFF1[Thin BFF<br/>aggregation and shaping]:::green
    end

    subgraph Later["Later"]
        BFF2[Fat BFF<br/>business rules<br/>database writes<br/>workflow logic]:::red
    end

    Start --> Later

    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
```

Review BFF code for business rules during design and code review. Move durable rules into the service that owns the data.

### 2. Too Many BFFs

Create BFFs for meaningful differences in client behavior, not every platform variant.

| Usually Too Many | Usually Reasonable |
|------------------|--------------------|
| iPhone BFF | Mobile BFF |
| iPad BFF | Web BFF |
| Android Phone BFF | Partner BFF |
| Android Tablet BFF | Agent BFF |
| Mobile Web BFF | Admin BFF |

iOS and Android can often share a Mobile BFF if their API needs are similar. Split them only when the contracts, release constraints, or behavior truly diverge.

### 3. Hidden Duplication

Some duplication is acceptable because clients differ. Dangerous duplication is business logic copied into multiple BFFs.

Use generated clients, shared middleware, contract tests, and platform templates to reduce accidental duplication. Keep client-specific response shaping local to each BFF.

### 4. Missing Version Strategy

Mobile and partner BFFs need explicit versioning and deprecation policies.

Use client version headers, URL versions, capability negotiation, or separate routes. Support old mobile versions long enough for realistic upgrade curves. For agent tools, version schemas because agents may depend on field names and error shapes.

### 5. Security Drift

Multiple BFFs can drift in authentication, authorization, logging, and header handling.

Centralize shared security middleware where possible. Strip untrusted headers at the edge. Pass trusted identity context downstream. Keep domain authorization in backend services.

---

# When to Use BFF

| Good Fit | Reason |
|----------|--------|
| Web and mobile clients need different payloads | Each client gets a contract shaped for its experience |
| Mobile apps have slow upgrade cycles | BFF can preserve compatibility per client version |
| Partner APIs need stable bulk contracts | Partner BFF isolates external contracts from internal services |
| Frontend teams need independent release cadence | Team-owned BFF reduces coordination delay |
| AI agents need stable tools and safety policy | Agent BFF isolates tool contracts and guardrails |

Avoid a BFF when there is only one client, client needs are nearly identical, the API gateway already provides enough routing and transformation, or the team cannot operate another production service responsibly.

GraphQL may reduce the need for many BFFs when one well-governed graph can serve multiple clients. It can also become its own BFF layer, depending on ownership and schema design.

---

# Summary

Backend for Frontend creates a client-specific backend that adapts core services to one frontend experience.

- A shared API shape creates friction when web, mobile, partner, admin, and agent clients need different contracts.
- A BFF owns client-specific aggregation, response shaping, fallback behavior, and compatibility.
- API gateways and BFFs work well together: the gateway handles shared edge policy, while BFFs handle client-specific API behavior.
- Frontend-team ownership gives speed, but requires backend operational maturity.
- Platform ownership improves consistency, but can become a bottleneck.
- GraphQL, serverless functions, and framework-integrated route handlers are implementation options, not automatic replacements for good ownership and boundaries.
- Keep BFFs thin. Durable business rules belong in the services that own the data.
- Monitor per client, design for partial failure, and version contracts explicitly.

Use BFF when client differences are real enough to justify another backend surface. The pattern is useful when it lets clients move independently without corrupting shared backend APIs.

---

# Quiz
