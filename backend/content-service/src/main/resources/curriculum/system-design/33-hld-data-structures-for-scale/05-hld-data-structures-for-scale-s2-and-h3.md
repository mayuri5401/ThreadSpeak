---
id: "hld-data-structures-for-scale-s2-and-h3"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Data Structures for Scale"
subSection: ""
title: "S2 and H3"
slug: "hld-data-structures-for-scale-s2-and-h3"
summary: "Global systems often need to group, query, and aggregate locations across the entire Earth."
eli10: "Imagine S2 and H3 as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "S2 and H3 Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["HLD","Data Structures for Scale","System Design","Architecture"]

---

Global systems often need to group, query, and aggregate locations across the entire Earth.

**S2** and **H3** are hierarchical spatial cell systems. They turn latitude and longitude into cell IDs that can be used for indexing, sharding, analytics, map aggregation, and regional routing.

They solve a different problem from a custom in-memory spatial tree. Instead of building your own geometry partitioning from scratch, you use a well-defined global cell system with library support and known edge cases.

---

# 1. Why Global Cell Systems Exist

Geohash is simple and useful, but it has awkward behavior around cell boundaries, latitude distortion, poles, and the antimeridian. Quad Trees and R-Trees are powerful, but they are usually tied to an in-memory index or a database spatial engine.

S2 and H3 give distributed systems a reusable way to name regions of the Earth. A cell ID becomes a compact key that can flow through databases, caches, stream processors, metrics systems, and routing layers.

Common use cases include marketplace balancing, delivery zones, ride matching, ads targeting, heatmaps, geofencing, abuse detection, and regional analytics.

---

# 2. S2

> [!PAYWALL] This content is for premium members only.

S2 projects the sphere onto the faces of a cube, then recursively subdivides each face into cells.

Important properties:

| Property | Why It Matters |
|----------|----------------|
| Hierarchical cells | Parent cells cover larger regions; child cells cover smaller regions |
| Spherical geometry | Handles global geometry better than latitude-longitude rectangles |
| Cell coverings | Can approximate points, lines, and polygons with sets of cells |
| Stable cell IDs | Useful for indexes, keys, routing, and storage |

S2 is often a strong fit when you care about global geometry, polygon covering, and precise spatial relationships.

For example, a system might cover a delivery zone polygon with S2 cells, store those cell IDs in an index, and use them to quickly find candidate zones for a customer location.

---

# 3. H3

H3 partitions the world into mostly hexagonal cells.

Hexagons are attractive because they have more uniform neighbor behavior than squares. Each cell usually has six neighbors at the same resolution, which makes H3 convenient for regional aggregation, heatmaps, marketplace balancing, and nearby-cell expansion.

H3 is not a perfect hex grid. The Earth cannot be tiled entirely with perfect equal hexagons, so H3 has special pentagon cells and hierarchy edge cases. Production code should use the official library behavior rather than assuming every cell behaves identically.

---

# 4. Resolution and Cell Size

Both S2 and H3 are hierarchical. A coarse resolution covers a large area. A fine resolution covers a small area.

Choosing resolution is a product and workload decision:

| If the resolution is too coarse | If the resolution is too fine |
|---------------------------------|-------------------------------|
| Cells contain too many objects | Queries fan out across too many cells |
| Hot regions overload one key | Storage and aggregation cardinality increase |
| Local results are noisy | Boundary and update churn increase |
| Analytics hide important variation | Dashboards and streams become more expensive |

Measure real candidate counts by region. Dense cities, suburbs, highways, and rural areas behave very differently.

---

# 5. Query Patterns

The most common pattern is two-stage retrieval:

1. Convert a point, radius, or polygon into a set of cell IDs.
2. Use those cell IDs to fetch candidates from an index, cache, stream, or shard map.
3. Run exact geometry, distance, eligibility, or ranking logic on the candidates.

This mirrors the pattern from Geohash, Quad Trees, and R-Trees. The cell system narrows the search. The final check enforces correctness.

For larger areas, generate a covering set. For nearby searches, expand to neighboring cells at the selected resolution. For analytics, aggregate by cell and roll up to parent resolutions when dashboards need a wider view.

---

# 6. System Design Uses

## 6.1 Sharding and Routing

A marketplace can route work by cell ID. For example, active drivers, open restaurants, and live orders can be partitioned by region so local queries avoid global fan-out.

The hard part is hot cells. A downtown cell during peak traffic may need extra splitting, load-aware routing, or secondary bucketing.

## 6.2 Analytics and Heatmaps

H3 is especially common for heatmaps and regional analytics. A stream processor can aggregate events by `(cell_id, time_bucket)` and later merge cells into coarser views.

This is useful for demand maps, delivery imbalance, fraud hotspots, incident density, and regional growth dashboards.

## 6.3 Polygon Coverage

S2 is often used when polygon coverage matters. A system can approximate a service area, geofence, or administrative boundary as a set of cells, then use those cells as index keys.

Coverings are approximations unless the final geometry check is also performed. Coarser coverings are cheaper but return more false positives.

---

# 7. Code Implementation (Python)

Real systems should use official S2 or H3 libraries for cell generation, neighbor lookup, and polygon covering. The code below shows the application-side pattern after a library has already produced cell IDs.

It aggregates live supply and demand by cell, then expands a query to neighboring cells and ranks candidate cells by imbalance.

Expected output:

---

# 8. S2 vs H3 vs Geohash

| System | Strengths | Watch Out For |
|--------|-----------|---------------|
| **Geohash** | Simple strings, prefix scans, easy storage | Rectangular cells, boundary issues, latitude distortion |
| **S2** | Spherical geometry, strong coverings, global edge-case handling | More complex API and mental model |
| **H3** | Hexagonal cells, neighbor expansion, analytics ecosystem | Pentagon cells and hierarchy quirks |

Use Geohash when simple prefix indexing is enough. Use H3 when regional aggregation and neighbor behavior matter. Use S2 when robust global geometry and polygon covering are central to the design.

---

# 9. Key Takeaways

S2 and H3 are global hierarchical cell systems for spatial indexing, routing, aggregation, and analytics.

They are not replacements for exact geometry checks. They usually produce candidate cells or approximate coverings that need a second-stage validation when correctness matters.

S2 is especially strong for spherical geometry and polygon coverings. H3 is especially popular for hexagonal analytics, heatmaps, and marketplace balancing.

Choose resolution from measured candidate counts, load distribution, and product accuracy needs.
