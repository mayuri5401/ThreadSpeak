---
id: "hld-caching-what-is-caching"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Caching"
subSection: ""
title: "What is Caching?"
slug: "hld-caching-what-is-caching"
summary: "A cache is a fast storage layer that holds copies of frequently used data so requests can be served without hitting slower systems like databases or external APIs."
eli10: "Imagine What is Caching? as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "What is Caching? Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["HLD","Caching","System Design","Architecture"]

---

A cache is a fast storage layer that holds copies of frequently used data so requests can be served without hitting slower systems like databases or external APIs.

Used well, caching reduces latency, lowers infrastructure cost, and improves reliability under traffic spikes.

---

# Why Caching Matters

Consider a social media application. When a user opens their feed, the application must:

1. Authenticate the user (database query)
2. Fetch the user's profile (database query)
3. Retrieve the list of followed accounts (database query)
4. Fetch recent posts from followed accounts (many database queries)
5. Get like counts and comment counts for each post (more queries)
6. Retrieve profile pictures for all post authors (even more queries)

Without caching, a single feed load might trigger 50+ database queries. Multiply by millions of users, and no database can keep up.

```mermaid
flowchart LR

    subgraph With Caching
		direction LR
        U2[User Request]:::rose --> App2[Application]:::primary
        App2 --> Cache[Cache]:::orange
        Cache --> |Hit: 45 queries| App2
        Cache --> |Miss: 5 queries| DB2[(Database)]:::teal
    end

    subgraph Without Caching
		direction LR
        U1[User Request]:::rose --> App1[Application]:::primary
        App1 --> DB1[(Database)]:::teal
        DB1 --> |50+ queries| App1
    end

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

**Illustrative Performance Impact:**

| Metric | Without Cache | With Cache | Improvement |
|--------|--------------|------------|-------------|
| Response time | 500ms | 50ms | 10x faster |
| Database queries/sec | 500,000 | 50,000 | 10x reduction |
| Database CPU | 95% | 30% | Headroom for growth |
| Infrastructure cost | $50,000/month | $20,000/month | 60% savings |

---

### The Anatomy of a Cache

At its core, a cache is a key-value store optimized for fast lookups:

```mermaid
flowchart TD
    subgraph Cache["Cache Structure"]
        direction TB
        KV1["key: user:123 → value: {name: 'Alice', ...}"]:::primary
        KV2["key: product:456 → value: {title: 'Widget', ...}"]:::primary
        KV3["key: session:abc → value: {userId: 123, ...}"]:::primary
    end

    classDef primary fill:#00ceff,stroke:#000,color:#000
```

#### Key Components

**Keys** are unique identifiers for cached data. A good key is deterministic, so the same request always produces the same key. It is descriptive, naming the data it represents. And it is collision-free, so different data never shares a key.

**Values** are the cached data itself. They can be serialized objects (JSON, Protocol Buffers, MessagePack), raw strings or binary data, or pre-computed results like HTML fragments or aggregated statistics.

**Metadata** describes the cached entry: the creation timestamp, the expiration time (TTL), the access count used for eviction decisions, and the size in bytes.

---

# Cache Layers

Caching happens at multiple levels in a system. Each layer has different characteristics:

```mermaid
flowchart LR
    User[User]:::rose --> Browser[Browser Cache]:::primary
    Browser --> CDN[CDN Cache]:::orange
    CDN --> LB[Load Balancer]:::teal
    LB --> App[Application Cache]:::primary
    App --> Distributed[Distributed Cache<br/>Redis/Memcached]:::orange
    Distributed --> DB[(Database<br/>Buffer Pool)]:::teal

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

#### Browser Cache

The browser cache is the closest cache to the user. It stores static assets and API responses on the user's device with effectively zero latency, typically holding 50MB to 2GB per origin. Behavior is controlled through HTTP headers like `Cache-Control` and `ETag`, which makes it a natural fit for static assets and data that does not change often.

#### CDN Cache

Content Delivery Networks cache content at edge locations worldwide. Latency to the nearest edge is typically 10-50ms depending on geographic proximity, and the network as a whole holds terabytes of content. CDNs are controlled through HTTP headers and the provider's configuration, and they work best for static content, media files, and public pages.

#### Application Cache

The application cache lives in-memory inside the application process itself. Lookups finish in under a millisecond because the data is already in the same process, and the cache size is bounded by server RAM. The application code controls what goes in and out, which makes it a good fit for hot data, computed values, and session state.

The downside is that each application instance keeps its own cache, which leads to inconsistency and memory duplication across instances.

#### Distributed Cache

A distributed cache is a separate caching service shared by all application instances, with Redis and Memcached as the most common choices. Lookups take 1-5ms because each one crosses a network hop, but the cluster can grow to hundreds of gigabytes or even terabytes of capacity. The application code and cache client decide what gets cached, and the workload is usually shared state, session storage, and database query results.

```mermaid
flowchart LR
    App1[App Server 1]:::primary --> Redis[(Redis Cluster)]:::orange
    App2[App Server 2]:::primary --> Redis
    App3[App Server 3]:::primary --> Redis
    Redis --> DB[(Database)]:::teal

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

#### Database Buffer Pool

Databases maintain their own cache of frequently accessed pages in memory on the database server. Reads from cached pages complete in under a millisecond. The buffer pool size is set through database configuration and is engine-dependent: Postgres' `shared_buffers` is typically around 25% of RAM, while MySQL's InnoDB buffer pool is commonly configured to 60-80% of RAM. This layer is transparent to the application; the database manages it automatically.

---

# Cache Hit and Miss

When the application requests data from the cache, two things can happen:

**Cache Hit:** The data exists in the cache. Return it immediately.

**Cache Miss:** The data is not in the cache. Fetch from the source, optionally store in cache, then return.

```mermaid
flowchart TD
    Request[Request for key X]:::rose --> Check{Key X in cache"}:::yellow

    Check -->|Yes: Cache Hit| Return[Return cached value]:::green
    Check -->|No: Cache Miss| Fetch[Fetch from database]:::orange

    Fetch --> Store[Store in cache]:::primary
    Store --> ReturnFetched[Return value]:::green

    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
```

#### Cache Hit Ratio

The percentage of requests served from cache versus total requests:

| Hit Ratio | Interpretation |
|-----------|----------------|
| > 95% | Excellent. Cache is highly effective. |
| 80-95% | Good. Normal for most applications. |
| 50-80% | Moderate. May need tuning or different caching strategy. |
| < 50% | Poor. Cache may be undersized or data not cache-friendly. |

A 90% hit ratio means 90% of requests avoid the database entirely. If your database can handle 10,000 QPS, a 90% hit ratio means your system can effectively handle 100,000 QPS.

---

# What to Cache

Not all data benefits equally from caching.

Caching pays off the most for read-heavy data where the same value is requested many times, for expensive computations such as aggregations and joins, for slow data sources like external APIs and legacy systems, and for stable data like configuration and reference tables.

It is a poor fit for write-heavy data where invalidation overhead exceeds the benefit, for unique requests where every request needs different data, for large objects that consume cache memory quickly, and for time-sensitive data where even short staleness is unacceptable.

#### The 80/20 Rule

In most applications, 20% of the data serves 80% of the requests. Focus caching efforts on that hot 20%:

---

# Cache Consistency

Cache consistency means keeping cached data in sync with the source of truth. When the underlying data changes, the cache can become stale.

```mermaid
flowchart TB
    subgraph Problem["Stale Cache Problem"]
        DB1[(Database<br/>price: $20)]:::teal
        Cache1[Cache<br/>price: $15]:::red
        User1[User sees $15<br/>Incorrect!]:::rose
    end

    Cache1 --> User1
    DB1 -.->|Updated, but<br/>cache not| Cache1

    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef rose fill:#f783ac,stroke:#000,color:#000
```

#### Consistency Approaches

| Approach | How It Works | Trade-off |
|----------|--------------|-----------|
| **TTL-based** | Data expires after a time period | Simple but allows staleness up to TTL |
| **Invalidation** | Explicitly remove/update cache on changes | Consistent but complex to implement |
| **Write-through** | Update cache and database together | Consistent but higher write latency |
| **Eventual consistency** | Accept temporary staleness | High performance but requires tolerance |

The right approach depends on your consistency requirements. A product price being stale for 5 minutes might be acceptable. A bank account balance being stale for 5 seconds is not.

---

# Caching Anti-Patterns

Caching has costs as well as benefits. The patterns below often cause more problems than they solve.

#### Cache Everything

Blindly caching all data leads to memory exhaustion, low hit ratios as the cache fills with rarely accessed entries, and increased complexity without proportional benefit.

#### Infinite TTL

Data that never expires becomes stale indefinitely, requires explicit invalidation on every change, and creates subtle bugs the moment an invalidation is missed.

#### Cache as Primary Storage

Treating the cache as the source of truth invites data loss on cache failure or eviction, leaves no durability guarantees, and makes recovery effectively impossible.

#### The Thundering Herd

When a popular cache entry expires, many requests simultaneously hit the database:

```mermaid
flowchart TD
    subgraph Before["Popular Item Cached"]
        C1[Cache: product:123]:::green
        R1[1000 requests/sec]:::rose --> C1
    end

    subgraph After["Cache Expired - Thundering Herd"]
        C2[Cache: empty]:::red
        R2[1000 requests/sec]:::rose --> DB[(Database)]:::teal
        DB --> |OVERLOADED| Crash[System Crash]:::red
    end

    Before -->|TTL expires| After

    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef rose fill:#f783ac,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

Solutions include locking (only one request fetches), probabilistic early expiration, and background refresh.

---

# Cache in Distributed Systems

In distributed systems, caching introduces additional considerations beyond what a single-instance cache faces.

#### Consistency Across Nodes

When multiple application servers share a cache, or when data is replicated:

```mermaid
flowchart TB
    subgraph App Servers
        A1[Server 1]:::primary
        A2[Server 2]:::primary
        A3[Server 3]:::primary
    end

    subgraph Cache Cluster
        C1[Cache Node 1]:::orange
        C2[Cache Node 2]:::orange
        C3[Cache Node 3]:::orange
    end

    A1 --> C1
    A2 --> C2
    A3 --> C3

    C1 <--> C2
    C2 <--> C3
    C1 <--> C3

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
```

Cache entries must be invalidated across all nodes. Replication introduces latency before all nodes are consistent.

#### Data Partitioning

Large caches partition data across multiple nodes. Consistent hashing minimizes data movement when nodes are added or removed:

#### Failure Handling

What happens when cache is unavailable"

| Strategy | Behavior | Use Case |
|----------|----------|----------|
| **Fail open** | Bypass cache, hit database directly | Cache is optional optimization |
| **Fail closed** | Return error to user | Cache data is critical |
| **Graceful degradation** | Serve stale data if available | Availability over consistency |

---

# Measuring Cache Performance

The key metrics to track are the hit ratio (how effective the cache is), latency at p50 and p99 (the cache's impact on response time), memory usage (capacity utilization), eviction rate (whether the cache is undersized), and miss latency (the database impact when requests fall through).

A sudden drop in hit ratio or spike in evictions signals a problem: either traffic patterns changed, the cache is undersized, or keys are being invalidated too aggressively.

---

# Summary

Caching stores frequently accessed data in a faster storage layer to reduce latency and backend load. Multiple cache layers exist across the stack, from the browser and CDN to the application, distributed cache, and database buffer pool, and each has different characteristics and use cases. The hit ratio is the key metric to watch: a 90% hit ratio gives roughly a 10x improvement in effective capacity.

What gets cached matters more than how much. Read-heavy, expensive-to-compute, and stable data benefit the most. Write-heavy data and unique requests rarely do. Consistency requires picking between TTL-based expiration, explicit invalidation, and write-through patterns based on freshness requirements. Common anti-patterns to avoid include caching everything indiscriminately, setting infinite TTLs, treating the cache as primary storage, and ignoring the thundering herd when popular entries expire.

Understanding what caching is and why it matters sets the stage for the next question: how exactly should an application interact with the cache" That brings us to caching patterns, starting with the most common one, the cache-aside pattern, where the application explicitly manages what goes in and out of the cache.

---

# Quiz
