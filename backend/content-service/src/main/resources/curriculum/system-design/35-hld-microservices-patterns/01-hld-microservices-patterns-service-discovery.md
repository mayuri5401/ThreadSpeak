---
id: "hld-microservices-patterns-service-discovery"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Microservices Patterns"
subSection: ""
title: "Service Discovery"
slug: "hld-microservices-patterns-service-discovery"
summary: "In a monolith, components call each other inside one process. In a distributed system, that call becomes a network request to an instance whose address can change at any time."
eli10: "Imagine Service Discovery as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Service Discovery Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["HLD","Microservices Patterns","System Design","Architecture"]

---

In a monolith, components call each other inside one process. In a distributed system, that call becomes a network request to an instance whose address can change at any time.

Containers restart, autoscalers add capacity, nodes fail, deploys replace old instances, and traffic shifts between regions. Hardcoded addresses quickly become stale.

**Service discovery** maps a stable logical service name, such as `payment-api`, to the set of currently usable network endpoints behind that service.

The goal is simple: callers should depend on service names, while the platform keeps track of healthy, current instances.

---

# The Problem: Addresses Are Not Stable

Consider an order service that calls inventory and payment services.

In a small static deployment, configuration like this may look harmless:

The first outage teaches the lesson.

```mermaid
flowchart LR
    subgraph Before["Initial State"]
        O1[Order Service]:::primary --> I1[Inventory<br/>192.168.1.10]:::green
        O1 --> P1[Payment<br/>192.168.1.11]:::green
    end

    subgraph After["After Scaling"]
        O2[Order Service]:::primary --> I2[Inventory<br/>192.168.1.10]:::green
        O2 --> P2[Payment<br/>192.168.1.11]:::green
        I3[Inventory<br/>192.168.1.12]:::red
        I4[Inventory<br/>192.168.1.13]:::red
        P3[Payment<br/>192.168.1.14]:::red
    end

    Before --> After

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
```

The new inventory and payment instances exist, but order traffic still goes to the original addresses. Capacity was added, but the caller cannot use it.

The failure cases are predictable:

| Scenario | What Breaks |
|----------|-------------|
| **Scale out** | New instances do not receive traffic |
| **Scale in** | Clients keep calling removed instances |
| **Instance failure** | Traffic continues to hit dead endpoints until configuration changes |
| **Rolling deployment** | Old and new instances overlap, but clients may only know one side |
| **Container restart** | Pod or task IPs change even when the logical service did not |
| **Multi-region failover** | Clients need a way to move from one pool of endpoints to another |

Service discovery replaces this brittle configuration with an automatically maintained mapping:

The caller asks for `payment-api`. The platform decides which healthy instance should receive the request.

---

# What Service Discovery Provides

A service discovery system usually provides three capabilities.

1. **Registration:** The platform records that an instance exists.
2. **Discovery:** Clients or proxies look up usable endpoints for a logical service name.
3. **Health filtering:** Failed, starting, and draining instances are removed from normal traffic.

```mermaid
flowchart LR
    subgraph Services
        S1[Service A]:::primary
        S2[Service B]:::primary
        S3[Service C]:::primary
    end

    subgraph Registry[Service Registry]
        R[(Registry<br/>Service name -> endpoints)]:::green
    end

    S1 -->|Register or observed by platform| R
    S2 -->|Register or observed by platform| R
    S3 -->|Register or observed by platform| R

    S1 -->|Discover Service B| R
    R -->|Healthy B endpoints| S1

    S1 -->|Call selected endpoint| S2

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

The registry may be an explicit product such as Consul, a control-plane store such as etcd behind Kubernetes, cloud service discovery such as AWS Cloud Map, or a service-mesh control plane feeding proxies through xDS. The implementation varies. The contract stays the same: names resolve to healthy endpoints.

---

# Service Registry

The service registry is the source of discovery data. It tracks:

- Service name
- Instance address and port
- Health and readiness state
- Zone, region, and environment
- Version, shard, model, tenant, or capability metadata

Metadata affects routing decisions. A request for `embedding-service` may need a CPU pool for background indexing, while a latency-sensitive chat request needs a GPU pool in the caller's region. A canary release may expose `version=v3` to only 1% of traffic.

### Registration Process

Registration can be explicit or platform-managed.

```mermaid
sequenceDiagram
    participant S as Service Instance
    participant R as Service Registry

    S->>R: Register(name, address, port, metadata)
    R-->>S: Registered with lease or TTL

    loop Periodically
        S->>R: Renew lease or heartbeat
        R-->>S: Acknowledged
    end

    Note over S,R: If the lease expires, the endpoint is removed from discovery
```

In orchestrated environments, the service process often does not register itself. The platform already knows which pods, tasks, or VMs exist and updates the registry from control-plane state.

### Registration Patterns

**Self-registration:** The service registers itself with the registry during startup and renews its lease while it runs.

```mermaid
flowchart LR
    S[Service Instance]:::primary -->|Register and renew lease| R[(Registry)]:::green

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

Self-registration is simple in a homogeneous stack, but it leaks infrastructure concerns into application code. Every language runtime needs a correct client library. Every service needs correct startup, shutdown, retry, and authentication behavior.

**Platform registration:** The scheduler, node agent, sidecar, or controller observes workloads and updates discovery records.

```mermaid
flowchart LR
    S[Service Instance]:::primary
    Reg[Platform Controller]:::orange
    R[(Registry)]:::green

    Reg -->|Watch workload state| S
    Reg -->|Publish endpoints| R

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

Kubernetes follows this model. Pods are selected by Services, readiness gates determine whether they are eligible for traffic, and EndpointSlices hold the backend endpoint set at scale.

Platform registration is the common default today because it keeps application code simpler and makes discovery behavior consistent across languages.

---

# Discovery Patterns

There are three patterns you should recognize: DNS discovery, client-side discovery, and server-side discovery. Production systems often combine them.

---

# DNS-Based Discovery

DNS is the most common discovery interface because every runtime can resolve a name.

In Kubernetes, a service named `payment-api` in namespace `production` can be addressed as:

A normal Kubernetes Service resolves to a stable ClusterIP. A headless Service resolves directly to the backing pod IPs. Consul also exposes service discovery through DNS names such as:

DNS discovery is easy to adopt, but it has sharp edges:

- DNS answers are cached. Low TTLs improve freshness but increase query load.
- Not every client respects TTLs exactly.
- DNS tells you where something is; it does not give you rich per-request routing by itself.
- Long-lived HTTP/2 or gRPC connections may keep using an old endpoint until the connection is recycled.

For many services, DNS plus a platform load balancer is enough. For latency-sensitive model serving or high-cardinality routing, teams usually add a smarter client, gateway, or service mesh.

---

# Client-Side Discovery

In client-side discovery, the caller obtains a list of healthy endpoints and chooses one.

```mermaid
flowchart TD
    C[Client Service]:::primary
    R[(Service Registry)]:::green

    C -->|1. Query payment-api| R
    R -->|2. Return endpoints<br/>10.0.0.5:8080<br/>10.0.0.6:8080<br/>10.0.0.7:8080| C

    C -->|3. Select endpoint| LB{Client-side<br/>load balancer}:::yellow

    LB -->|4. Call selected instance| P1[Payment<br/>10.0.0.5]:::green
    LB -.-> P2[Payment<br/>10.0.0.6]:::teal
    LB -.-> P3[Payment<br/>10.0.0.7]:::teal

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
```

The client may use round robin, random selection, least requests, locality preference, consistent hashing, or weighted routing. For example, an embedding service client may prefer endpoints in the same availability zone to avoid cross-zone latency and data-transfer cost. A cache client may use consistent hashing so the same key tends to land on the same backend.

### Client-Side Discovery Example: Eureka

Netflix Eureka is the classic example from the early cloud microservices era. Services register with Eureka, clients fetch registry snapshots, and client libraries choose instances locally.

```mermaid
flowchart TB
    subgraph Region[AWS Region]
        E1[Eureka Server 1]:::green
        E2[Eureka Server 2]:::green
        E1 <-->|Replicate registry| E2

        subgraph Services
            S1[Service A]:::primary
            S2[Service B]:::primary
            S3[Service B]:::primary
        end

        S1 -->|Register| E1
        S2 -->|Register| E1
        S3 -->|Register| E2

        S1 -->|Fetch registry| E1
        S1 -->|Call Service B directly| S2
    end

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

Eureka is still useful to understand, especially in Java/Spring systems that adopted Netflix OSS. For greenfield systems, the center of gravity has moved toward Kubernetes Services, cloud-native discovery, Consul, and service-mesh control planes. Ribbon, the old Netflix client-side load balancer often mentioned with Eureka, is no longer the default recommendation in modern Spring Cloud stacks.

### Advantages of Client-Side Discovery

- **No proxy hop:** The client can call the selected instance directly.
- **Local control:** The client can use service-specific routing and retry rules.
- **Fast failover:** A client with a fresh local endpoint cache can avoid a known bad instance quickly.
- **Useful for stateful routing:** Consistent hashing and shard-aware routing are easier at the caller.

### Disadvantages of Client-Side Discovery

- **Client complexity:** Every client needs correct discovery, load balancing, retries, backoff, and connection handling.
- **Language drift:** Java, Go, Python, and Node clients may behave differently unless carefully standardized.
- **Stale views:** Cached endpoint lists can lag behind reality.
- **Registry coupling:** Application code often becomes tied to a specific discovery API.

Client-side discovery is powerful, but it requires discipline. The failure modes live in every caller.

---

# Server-Side Discovery

In server-side discovery, the client sends traffic to a stable endpoint. A load balancer, proxy, gateway, or node-level data plane discovers the backend instances and forwards the request.

```mermaid
flowchart TD
    C[Client Service]:::primary
    LB[Load Balancer / Proxy]:::orange
    R[(Service Registry)]:::green

    C -->|1. Call payment-api| LB
    LB -->|2. Read endpoint set| R
    R -->|3. Healthy instances| LB
    LB -->|4. Forward request| P1[Payment<br/>10.0.0.5]:::green

    P2[Payment<br/>10.0.0.6]:::teal
    P3[Payment<br/>10.0.0.7]:::teal

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

Kubernetes Services are the standard example. The client resolves a service name through cluster DNS, receives a stable virtual IP for a normal Service, and the cluster networking layer sends traffic to one of the ready backends.

```mermaid
flowchart TD
    subgraph Cluster[Kubernetes Cluster]
        C[Client Pod]:::primary
        DNS[CoreDNS]:::green
        KS[Kubernetes Service<br/>payment-api]:::orange
        ES[EndpointSlices<br/>ready pod IPs]:::green

        subgraph Pods[Payment Pods]
            P1[Pod 1<br/>10.0.1.5]:::green
            P2[Pod 2<br/>10.0.1.6]:::green
            P3[Pod 3<br/>10.0.1.7]:::green
        end

        C -->|1. DNS lookup<br/>payment-api| DNS
        DNS -->|2. ClusterIP<br/>10.96.0.100| C
        ES -->|backend set| KS
        C -->|3. Request to ClusterIP| KS
        KS -->|4. Route via data plane| P2
    end

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

Modern Kubernetes clusters usually use CoreDNS for service-name resolution. EndpointSlices replaced the older Endpoints API for scalable backend tracking. Traffic may be implemented through kube-proxy with iptables or IPVS, or through an eBPF-based data plane such as Cilium. Do not assume every cluster routes traffic the same way.

### Advantages of Server-Side Discovery

- **Simple clients:** Clients call a stable name or address.
- **Language agnostic:** Any runtime that can make network calls can participate.
- **Centralized policy:** Load balancing, health filtering, and routing rules live in infrastructure.
- **Operational consistency:** Platform teams can improve routing without changing every service.

### Disadvantages of Server-Side Discovery

- **Proxy or data-plane dependency:** If that layer is unhealthy, many services are affected.
- **Less caller-specific logic:** Fine-grained routing can require extra configuration.
- **Possible extra hop:** A gateway or proxy may add latency, though node-local data planes often avoid a separate network hop.
- **Hidden behavior:** Application developers may not see why a request was routed to a given instance unless observability is good.

---

# Service Mesh Discovery

A service mesh moves much of discovery, load balancing, retries, and security into sidecars or node-level proxies. The application calls a local or transparent proxy. The mesh control plane distributes endpoint data and routing policy to the proxies.

```mermaid
flowchart LR
    A[Application]:::primary --> P1[Local Proxy]:::orange
    P1 --> P2[Destination Proxy]:::orange
    P2 --> B[Backend Service]:::green

    CP[Mesh Control Plane]:::green -->|Endpoints and policy| P1
    CP -->|Endpoints and policy| P2

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

This model is common with Envoy-based systems. It works well when teams need mutual TLS, traffic splitting, retries, outlier detection, and detailed telemetry across many services.

The tradeoff is operational cost. A mesh adds another control plane, more moving parts, and another place to debug latency. Use it when the organization needs the control it provides. Many microservice systems run well without one.

---

# Comparing Discovery Patterns

| Aspect | DNS / Platform | Client-Side | Server-Side / Proxy |
|--------|----------------|-------------|---------------------|
| **Client complexity** | Low | High | Low |
| **Routing control** | Basic to moderate | High | Moderate to high |
| **Language dependence** | Low | High | Low |
| **Failure mode** | DNS cache, stale connections | Stale client registry, inconsistent libraries | Proxy or data-plane problems |
| **Good fit** | Most internal services | Shard-aware or highly customized clients | Gateways, Kubernetes Services, service mesh |
| **Examples** | Kubernetes DNS, Consul DNS | Eureka clients, custom gRPC resolvers | Kubernetes Service routing, Envoy, cloud load balancers |

Do not choose a pattern by fashion. Choose it by ownership.

If application teams can reliably own smart clients, client-side discovery can be effective. If platform teams own routing, security, and traffic policy, server-side discovery or a mesh usually fits better. If the service only needs stable in-cluster naming, DNS-backed Services are often enough.

---

# Health Checking

Discovery is dangerous when it returns bad endpoints. Health checks decide whether an instance should receive traffic.

A bad health check treats "process is alive" as "service is ready." Those are different states.

```mermaid
flowchart TD
    subgraph Types[Health Check Types]
        L[Liveness<br/>Should this process be restarted"]:::green
        R[Readiness<br/>Should this instance receive traffic"]:::orange
        S[Startup<br/>Is initialization still in progress"]:::teal
        D[Dependency-aware<br/>Is a required dependency unavailable"]:::green
    end

    L --> Example1[Process deadlock<br/>main loop stuck]:::orange
    R --> Example2[Model not loaded<br/>connection pool not ready]:::orange
    S --> Example3[Large model warming up<br/>index loading]:::orange
    D --> Example4[Database unavailable<br/>GPU worker exhausted]:::orange

    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

| Check Type | Question | Typical Action |
|------------|----------|----------------|
| **Liveness** | Is the process irrecoverably stuck" | Restart the instance |
| **Readiness** | Can this instance accept new traffic" | Remove from load balancing |
| **Startup** | Is slow initialization still expected" | Delay liveness/readiness decisions |
| **Dependency-aware** | Is a required dependency unavailable" | Degrade, drain, or alert depending on impact |

For AI systems, readiness is especially important. A model-serving pod should not receive traffic just because the HTTP server has started. It may still be loading weights, warming CUDA kernels, downloading adapters, or building a tokenizer cache. Mark it ready only when it can serve the request class it advertises.

### Health Endpoint Example

Keep liveness checks shallow. A liveness check that fails because a downstream database is slow can cause a restart storm. Use readiness to remove an instance from traffic; use liveness to restart a process that cannot recover by itself.

### Push and Pull Checks

**Push-based checks** use heartbeats or lease renewal.

```mermaid
sequenceDiagram
    participant S as Service
    participant R as Registry

    loop Every 10 seconds
        S->>R: Renew lease
        R-->>S: OK
    end

    Note over S,R: If renewal stops, the lease expires
    R->>R: Remove endpoint from discovery
```

**Pull-based checks** are performed by a registry, load balancer, orchestrator, or proxy.

```mermaid
sequenceDiagram
    participant R as Registry or Load Balancer
    participant S as Service

    loop Periodically
        R->>S: GET /ready
        S-->>R: 200 OK
    end

    R->>S: GET /ready
    S-->>R: 503 Service Unavailable

    R->>R: Stop routing new requests to this instance
```

Both styles are used in production. The discovery system must converge quickly enough without flapping during short failures.

---

# Common Implementations

### Kubernetes

Kubernetes provides discovery through Services, DNS, and EndpointSlices.

Use normal Services when clients should not care which pod handles a request. Use headless Services when the client needs individual pod identities, common with StatefulSets, brokers, databases, and some sharded systems.

### Consul

Consul is a general-purpose service discovery and service networking platform. It is common in VM-heavy, hybrid, and multi-runtime environments where Kubernetes is not the only scheduler.

```mermaid
flowchart TB
    subgraph DC[Datacenter]
        C1[Consul Server 1]:::green
        C2[Consul Server 2]:::green
        C3[Consul Server 3]:::green

        C1 <--> C2 <--> C3

        subgraph Services
            S1[Service A]:::primary
            S2[Service B]:::primary
            Agent1[Consul Agent]:::orange
            Agent2[Consul Agent]:::orange
        end

        S1 --- Agent1
        S2 --- Agent2
        Agent1 --> C1
        Agent2 --> C2
    end

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
```

Consul supports discovery through DNS and HTTP APIs, health checks, prepared queries, multi-datacenter operation, and service mesh features. It is a strong fit when services span VMs, containers, multiple clouds, and legacy networks.

### etcd and ZooKeeper

etcd and ZooKeeper are coordination systems. They can store discovery data, leases, and watches, but application teams should avoid building a bespoke discovery layer on top of them unless they have a clear reason.

etcd is best known as Kubernetes' backing store. ZooKeeper appears in older distributed systems and data infrastructure. Both are useful to understand because they explain how strongly consistent registries, leases, and watches work.

### Cloud Load Balancers and Cloud Service Discovery

Cloud platforms provide managed discovery and routing through services such as AWS Elastic Load Balancing, AWS Cloud Map, Google Cloud service discovery features, Azure internal load balancers, and managed Kubernetes integrations.

Managed options reduce operational work, but they come with provider-specific behavior, limits, health-check semantics, and pricing. Treat those details as part of the design, not an implementation footnote.

---

# Best Practices

### 1. Keep Service Names Stable

Names should describe the capability, not the current implementation.

| Better Names | Poor Names |
|--------------|------------|
| `payment-api` | `svc1` |
| `inventory-api` | `my-service` |
| `embedding-service` | `fastapi-new` |
| `reranker-service` | `temp-gpu-service` |

Implementation names age badly. Capabilities age more slowly.

### 2. Use Metadata Deliberately

Discovery metadata should support routing and operations.

Do not let metadata become an ungoverned dumping ground. If routing depends on a key, document its meaning and allowed values.

### 3. Separate Liveness From Readiness

Use liveness to restart broken processes. Use readiness to control traffic. This distinction prevents many avoidable incidents.

For model-serving workloads, readiness should include model availability, required accelerator state, and any local assets needed to serve the advertised route.

### 4. Drain Before Shutdown

On shutdown, stop accepting new work, fail readiness, allow the discovery system to remove the instance, then finish in-flight requests.

```mermaid
flowchart LR
    A[Receive SIGTERM]:::primary --> B[Fail readiness<br/>or deregister]:::orange
    B --> C[Stop accepting<br/>new requests]:::orange
    C --> D[Finish in-flight<br/>requests]:::orange
    D --> E[Close connections]:::orange
    E --> F[Exit]:::green

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

This is especially important for long-running inference, streaming responses, queue consumers, and batch workers.

### 5. Design for Stale Discovery Data

Discovery data is never perfectly current. Build clients and proxies as if an endpoint can disappear immediately after lookup.

- Use timeouts on every network call.
- Retry only idempotent operations or requests with idempotency keys.
- Apply exponential backoff with jitter.
- Circuit-break repeatedly failing endpoints.
- Re-resolve names after connection failures.

Retries are not a substitute for correctness. Retrying a non-idempotent payment or job submission can create duplicate side effects.

### 6. Watch DNS and Connection Caching

DNS TTL does not guarantee fast traffic movement if clients hold long-lived connections. HTTP keep-alive, HTTP/2, gRPC, database pools, and SDK-level caches can keep using old endpoints.

For services that need fast failover, tune connection lifetimes, idle timeouts, resolver behavior, and load-balancer health thresholds together.

### 7. Avoid Thundering Herds

When a registry recovers, thousands of clients may refresh at once.

Add jitter to refresh intervals, retries, and reconnect loops.

---

# Summary

Service discovery maps stable service names to healthy, current endpoints.

- Static IP configuration fails when services scale, fail, restart, or move.
- A registry stores service names, endpoints, health state, and routing metadata.
- DNS-based discovery is simple and widely supported, but caching and long-lived connections matter.
- Client-side discovery gives callers more control, but pushes complexity into every client.
- Server-side discovery keeps clients simple and lets infrastructure own routing behavior.
- Modern Kubernetes discovery is built around Services, CoreDNS, and EndpointSlices; avoid older explanations that rely only on kube-dns, Endpoints, or iptables.
- Health checks must distinguish liveness from readiness, especially for slow-starting AI workloads such as model servers.
- Good discovery design assumes stale data, failed endpoints, graceful shutdown, retries with jitter, and clear ownership between application and platform teams.

Service discovery answers "where is the service"" The next design question is usually "who should be allowed to call it, and through which entry point"" That leads naturally to API gateways, ingress, and service-to-service traffic policy.

---

# Quiz
