---
id: "hld-data-structures-for-scale-bloom-filters"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Data Structures for Scale"
subSection: ""
title: "Bloom Filters"
slug: "hld-data-structures-for-scale-bloom-filters"
summary: "A Bloom filter answers one narrow question:"
eli10: "Imagine Bloom Filters as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Bloom Filters Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["HLD","Data Structures for Scale","System Design","Architecture"]

---

A Bloom filter answers one narrow question:

> Have we probably seen this item before"

It gives two possible answers:

- **Definitely no**
- **Probably yes**

That asymmetry is the whole point. A Bloom filter can reject items that are definitely absent without storing the full set. It may sometimes say "probably yes" for an item that was never inserted, but it will not say "definitely no" for an inserted item, assuming the filter is used correctly and the hash functions are stable.

This makes Bloom filters useful as cheap pre-checks before expensive work:

- avoid checking SSTables that cannot contain a key
- avoid cache lookups for keys that were never cached
- avoid crawling URLs that are probably already seen
- avoid sending definitely unseen IDs to a remote service

They are not a replacement for a database, cache, or set when exact membership matters.

<!-- Visualization -->

---

# 1. What Is a Bloom Filter"

A **Bloom filter** is a probabilistic membership structure.

It stores:

- a bit array of length `m`
- `k` hash functions

It does not store the original items.

<!-- Visualization -->

To insert an item:

1. Hash the item `k` times.
2. Map each hash to a bit position.
3. Set those bits to `1`.

To query an item:

1. Hash it the same `k` ways.
2. Check the same bit positions.
3. If any bit is `0`, the item is definitely absent.
4. If all bits are `1`, the item is probably present.

> 💡 **Key Insight:**

> **TIP**
>
> Bloom filters are most useful when a negative answer lets you skip expensive work.

---

# 2. Example: URL Deduplication

Suppose a crawler wants to avoid fetching the same URL repeatedly.

An exact set of all visited URLs may be too large to keep in memory. A Bloom filter can act as a compact pre-check.

## 2.1 Initialize the Filter

Start with an empty bit array.

<!-- Visualization -->

For a toy example, use:

- bit array size `m = 10`
- hash functions `k = 2`

Real filters are much larger and use carefully chosen hash functions.

## 2.2 Add a URL

Add `example.com`.

The two hash functions map it to positions `3` and `7`.

<!-- Visualization -->

Set bits `3` and `7` to `1`.

## 2.3 Add Another URL

Add `algomaster.io`.

The two hash functions map it to positions `1` and `4`.

<!-- Visualization -->

Set bits `1` and `4` to `1`.

## 2.4 Query a Present URL

Check `example.com`.

<!-- Visualization -->

Both bits are `1`, so the answer is "probably present."

## 2.5 Query an Absent URL

Check `nonexistent.com`.

<!-- Visualization -->

At least one checked bit is `0`, so the answer is "definitely absent."

---

# 3. False Positives

Bloom filters have no false negatives for inserted items, but they can have false positives.

A false positive happens when an item was never inserted, but all its hash positions were already set by other items.

This is acceptable only when a false positive causes extra work, not incorrect behavior.

Good:

- "This SSTable might contain the key; check it."
- "This URL might be seen; maybe skip or verify elsewhere depending on crawler policy."
- "This cache might contain the object; perform the cache lookup."

Risky:

- "This user is definitely blocked."
- "This payment has definitely been processed."
- "This customer has definitely accepted the legal agreement."

For correctness-sensitive decisions, Bloom filters should only be used as a pre-filter before an exact check.

---

# 4. Sizing a Bloom Filter

Bloom filters must be sized for expected capacity.

If you insert far more items than planned, too many bits become `1`, and the false-positive rate rises sharply.

Variables:

- `n`: expected number of inserted items
- `p`: target false-positive probability
- `m`: number of bits
- `k`: number of hash functions

Common formulas:

Approximate bits per item:

| Target False Positive Rate | Bits per Item | Hash Functions |
|----------------------------|---------------|----------------|
| 10% | ~4.8 | ~3 |
| 1% | ~9.6 | ~7 |
| 0.1% | ~14.4 | ~10 |
| 0.01% | ~19.2 | ~13 |

Example:

For `100 million` keys and `1%` false positives:

That is much smaller than storing 100 million full keys in a hash set, but it is not free. Bloom filters trade exactness for compactness, not for zero memory.

---

# 5. Hash Functions

A Bloom filter needs hash outputs that are stable and well distributed.

Do not use language-default hashes when persistence or cross-process compatibility matters. For example, Python's built-in `hash()` is randomized between processes by default.

Production implementations commonly derive multiple hash positions from two base hashes:

This is called double hashing. It avoids running many independent hash functions while still producing good positions for Bloom filter use.

Hash quality matters. Poor hash distribution raises the false-positive rate beyond what the sizing formula predicts.

---

# 6. Implementation (Python)

This implementation uses a stable BLAKE2b hash and double hashing.

It is for learning, not a replacement for a battle-tested library.

Expected output:

The `False` result for `user:999` is typical in a mostly empty filter. After the filter approaches its planned capacity, some absent items will return `True`.

---

# 7. Production Uses

## 7.1 LSM-Tree Databases

Bloom filters are heavily used in LSM-tree storage engines.

In systems such as Cassandra and RocksDB, data is stored in immutable sorted files. A point lookup may need to check several files. Bloom filters let the engine skip files that definitely do not contain the key.

This reduces disk reads and improves tail latency for missing keys.

In Cassandra, Bloom filter false-positive chance is tunable per table. Lower false-positive rates use more memory. Existing SSTables may need compaction or rewrite before new settings apply.

## 7.2 Caches

A Bloom filter can act as a negative pre-check for a cache:

1. If the filter says "definitely not present," skip the cache lookup.
2. If the filter says "probably present," check the cache.

This only helps when negative lookups are common and cache lookup is expensive enough to justify the extra filter maintenance.

## 7.3 Web Crawlers

Crawlers use Bloom filters to reduce duplicate URL processing.

False positives can cause a crawler to skip a URL it has not actually visited. Whether that is acceptable depends on the crawler. For broad discovery, it may be fine. For compliance, archival, or exhaustive crawling, an exact visited set or verification layer is required.

## 7.4 RedisBloom

RedisBloom provides Bloom filters with commands such as:

RedisBloom can create scalable Bloom filters by adding sub-filters as capacity is reached. That is convenient, but it costs more memory and CPU than sizing the filter correctly up front.

---

# 8. Variants

## 8.1 Counting Bloom Filter

A counting Bloom filter uses counters instead of bits.

It supports deletion by decrementing counters. This costs more memory and introduces counter-overflow concerns. Deletion is safe only if you delete items that were actually inserted the corresponding number of times.

## 8.2 Scalable Bloom Filter

A scalable Bloom filter adds new sub-filters as the set grows.

This avoids hard capacity failure, but queries must check multiple filters, and the combined false-positive rate must be managed.

## 8.3 Cuckoo Filter

Cuckoo filters are another approximate membership structure. They store fingerprints in a cuckoo hash table and can support deletion more naturally than standard Bloom filters.

They can be a better fit when deletion is common.

## 8.4 Ribbon Filter

Ribbon filters are newer static filters designed for better space efficiency. RocksDB has explored Ribbon filters as an alternative to Bloom filters for some workloads.

They are attractive when the set is built once and queried many times.

---

# 9. Limitations

Bloom filters have sharp boundaries:

| Limitation | Practical Impact |
|------------|------------------|
| False positives | A "yes" answer must be verified if correctness matters |
| No original items | You cannot list the set or retrieve stored values |
| No deletion in standard form | Removing one item may break other items |
| Capacity-sensitive | Overfilling increases false positives |
| Hash-dependent | Bad or unstable hashes break assumptions |
| Not adversary-proof by default | Attackers may craft inputs to raise false positives |

False positives are not bugs. They are part of the design. The bug is using a Bloom filter where a false positive changes correctness instead of only causing extra work.

---

# 10. Bloom Filters vs Related Structures

| Structure | Answers | False Positives | False Negatives | Stores Items" |
|-----------|---------|-----------------|-----------------|---------------|
| **Hash Set** | Exact membership | No | No | Yes |
| **Bloom Filter** | Approximate membership | Yes | No |
| **Counting Bloom Filter** | Approximate membership with deletion | Yes | No, if used correctly | No |
| **Cuckoo Filter** | Approximate membership with deletion | Yes | No, if used correctly | Fingerprints only |
| **HyperLogLog** | Approximate distinct count | N/A | N/A | No |
| **Count-Min Sketch** | Approximate item frequency | Overestimates | No underestimates in standard model | No |

Use a Bloom filter when you need approximate membership. Use HyperLogLog for cardinality and Count-Min Sketch for frequency.

---

# 11. Key Takeaways

Bloom filters are compact membership filters that answer "definitely not present" or "probably present."

They have false positives but no false negatives for inserted items when used correctly.

Sizing matters. Choose capacity and false-positive rate up front, then derive the bit-array size and number of hash functions.

Bloom filters are best as pre-filters before expensive lookups, especially in databases, caches, crawlers, and distributed systems.

Do not use them for exact membership, legal/security decisions, item enumeration, or workloads with frequent deletion unless you use an appropriate variant.

---

# Quiz
