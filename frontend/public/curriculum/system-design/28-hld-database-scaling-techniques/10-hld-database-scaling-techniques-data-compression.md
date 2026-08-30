---
id: "hld-database-scaling-techniques-data-compression"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Database Scaling Techniques"
subSection: ""
title: "Data Compression"
slug: "hld-database-scaling-techniques-data-compression"
summary: "Data compression reduces the number of bytes needed to store or transmit data. Fewer bytes can mean lower storage cost, less network traffic, faster disk reads, better cache density, and cheaper backups."
eli10: "Imagine Data Compression as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Data Compression Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["HLD","Database Scaling Techniques","System Design","Architecture"]

---

Data compression reduces the number of bytes needed to store or transmit data. Fewer bytes can mean lower storage cost, less network traffic, faster disk reads, better cache density, and cheaper backups.

Compression is not free. It trades CPU time for smaller data. A good design uses compression where bytes are expensive and avoids it where CPU, latency, or random access matter more.

---

# 1. What is Data Compression"

> [!PAYWALL] This content is for premium members only.

Data compression encodes the same information using fewer bytes.

For example, the string:

can be represented as:

That example is simplified, but the idea is the same: find patterns, remove repetition, and store a smaller representation.

Compression works best when data has structure or repeated patterns. Text, JSON, HTML, CSV, logs, metrics, database pages, columnar data, and backups all compress well.

It works poorly on data that is already compressed or highly random, such as JPEG images, MP4 videos, ZIP files, encrypted data, random identifiers, and other high-entropy binary blobs. Compressing already-compressed data often wastes CPU and may make the payload slightly larger.

---

# 2. Why Compression Matters

Compression can improve a system in several different places.

#### 2.1 Network Bandwidth

HTTP APIs, web pages, mobile clients, replication streams, event pipelines, and backups all move bytes over the network.

Reducing payload size can lower transfer time and bandwidth cost.

For example, a JSON API response with repeated field names often compresses well:

The repeated keys and values give algorithms like gzip, Brotli, and Zstandard something to exploit.

#### 2.2 Storage Cost

Logs, events, backups, analytical datasets, and object storage archives can grow quickly.

Compression can reduce how much disk or object storage you need. It can also reduce replication and backup traffic because there are fewer bytes to copy.

#### 2.3 I/O Performance

If a workload is limited by disk or network I/O, compression can make it faster.

Reading 20 MB of compressed data and spending a few milliseconds decompressing it can be faster than reading 100 MB from storage.

The opposite is also possible. If the workload is already CPU-bound, compression can make latency worse.

#### 2.4 Cache Efficiency

Compressed values can let an in-memory cache hold more items in the same amount of RAM.

This is useful for large cached objects, but not every cached value should be compressed. Very small values may cost more to compress and decompress than they save.

---

# 3. Lossless vs Lossy Compression

Compression comes in two broad types.

#### 3.1 Lossless Compression

Lossless compression can reconstruct the original data exactly. Use it for application and infrastructure data: API responses, logs, database backups, Kafka messages, source code, documents, Parquet and ORC files, and database storage pages.

If a customer record, payment event, audit log, or database backup loses information, the system is broken. These workloads need lossless compression.

#### 3.2 Lossy Compression

Lossy compression throws away information that is less important to human perception. Use it for media: JPEG and WebP images; MP3, AAC, and Opus audio; H.264, H.265, VP9, and AV1 video.

Lossy compression can produce much smaller files, but the original data cannot be reconstructed exactly.

Most system design discussions about databases, logs, caches, queues, and APIs are about lossless compression.

---

# 4. How Compression Works

You do not need to implement compression algorithms by hand, but it helps to understand the basic ideas.

#### 4.1 Run-Length Encoding

Run-length encoding stores repeated values as a count plus a value.

This is simple and works well when the same value repeats many times.

Columnar formats use related ideas when many adjacent rows have the same value.

#### 4.2 Dictionary Compression

Dictionary compression replaces repeated strings or byte sequences with shorter references.

For example, a log file might repeat the same service name, host name, request path, and error message thousands of times.

Instead of storing each full value every time, the compressor stores the value once and refers to it later.

#### 4.3 Delta Encoding

Delta encoding stores the difference between values instead of storing each full value.

For example:

can be represented as:

This works well for timestamps, counters, sorted IDs, and time-series data.

#### 4.4 Entropy Encoding

Entropy encoding uses fewer bits for common symbols and more bits for rare symbols.

Huffman coding and arithmetic coding are common examples. Many practical compressors combine dictionary-style matching with entropy encoding.

---

# 5. Where Compression is Used

Compression shows up in many parts of a system. The right place depends on what you are trying to optimize.

#### 5.1 HTTP Responses

Web servers and API gateways often compress text responses with gzip, Brotli, or Zstandard.

The threshold matters. Compressing a 100-byte response is usually not worth it.

For static assets such as JavaScript and CSS, pre-compressing during build or deployment is often better than compressing on every request.

#### 5.2 Databases

Databases apply compression in several places: large values, table or index pages, columnar storage, backups, and replication or wire traffic.

In PostgreSQL, large variable-length values can be compressed through TOAST. Newer PostgreSQL versions also allow choosing the compression method for eligible columns:

The exact options depend on the database version and build. The important idea is not the syntax; it is that database-native compression usually preserves query semantics while reducing storage and I/O.

#### 5.3 Event Streaming

Systems like Kafka commonly compress batches of messages.

Batch compression is usually more effective than compressing one message at a time because the compressor can find repeated patterns across many messages.

For example, a producer might send batches compressed with LZ4, Snappy, gzip, or Zstandard. The best choice depends on whether you care more about CPU, latency, or compression ratio.

#### 5.4 Logs and Object Storage

Logs are often repetitive, append-only, and rarely updated. That makes them excellent candidates for compression.

A common pattern is:

- Keep recent logs hot and searchable
- Move older logs to cheaper object storage
- Compress archived logs with gzip or Zstandard
- Query them later with batch tools when needed

Columnar formats such as Parquet and ORC can compress analytical data especially well because similar values are stored together.

#### 5.5 Caches

Compression can help caches when values are large and memory is expensive.

For example, compressing a large JSON document before storing it in Redis may improve cache capacity.

But compression can also add latency to every cache hit. Measure before enabling it broadly.

---

# 6. Choosing an Algorithm

There is no best compression algorithm for every system. Choose based on data type, compression ratio, CPU cost, decompression speed, compatibility, and operational simplicity.

| Algorithm | Type | Strength | Good For |
| --- | --- | --- | --- |
| gzip / Deflate | Lossless | Widely supported, reasonable compression | HTTP responses, logs, backups, general compatibility |
| Brotli | Lossless | Higher compression ratio than gzip for text, native browser support | Pre-compressed static web assets, browser delivery |
| Zstandard (zstd) | Lossless | Strong ratio with tunable speed | Logs, backups, databases, object storage, internal services |
| LZ4 | Lossless | Very fast compression and decompression | Low-latency services, caches, event streams |
| Snappy | Lossless | Fast and simple, moderate compression | Kafka, Hadoop-style pipelines, storage engines |
| JPEG / WebP / AVIF | Lossy (WebP and AVIF also support lossless) | Small image files | Photos and web images |
| H.264 / H.265 / AV1 | Lossy | Small video streams | Video upload, playback, and streaming |

Practical guidance:

- Use gzip when compatibility matters.
- Use Brotli for static web assets when clients support it.
- Use Zstandard for modern server-side compression when you can control both ends.
- Use LZ4 or Snappy when latency and CPU are more important than maximum compression ratio.
- Use media codecs for images, audio, and video instead of generic compression.

---

# 7. Compression Tradeoffs

Compression improves one part of the system by spending resources somewhere else.

#### 7.1 CPU Cost

Compression and decompression require CPU.

High compression levels can save more bytes but may increase request latency or background job time. For user-facing paths, fast decompression usually matters more than the absolute smallest payload.

#### 7.2 Tail Latency

Compression can increase p95 or p99 latency if large responses are compressed synchronously on request threads.

For predictable latency:

- Compress large static assets ahead of time
- Use a minimum response-size threshold
- Avoid high compression levels on hot request paths
- Monitor CPU saturation and queueing

#### 7.3 Random Access

Compressed data often needs to be decompressed in blocks.

If you compress a huge file as one stream, reading one small record may require reading and decompressing much more data than expected.

Storage systems solve this by compressing data in blocks or pages. Analytical file formats use row groups and column chunks for the same reason.

#### 7.4 Already-Compressed Data

Do not gzip a JPEG, MP4, ZIP, or encrypted blob and expect a benefit.

The useful patterns are already gone.

#### 7.5 Encryption Order

Compress before encrypting.

Encryption makes data look random, and random-looking data does not compress well.

Be careful when compressing responses that contain secrets alongside attacker-controlled input. Some historical web attacks exploited compressed response sizes to infer secrets. For sensitive responses, review whether HTTP compression should be disabled or separated from secret-bearing content.

---

# 8. A Practical Checklist

Before enabling compression, answer these questions:

- What bottleneck are we solving: storage, bandwidth, disk I/O, cache size, or backup time"
- Is the data compressible"
- Is the workload CPU-bound or I/O-bound"
- Is the data read often, written often, or archived"
- Do we need random access"
- What is the minimum payload size worth compressing"
- Which clients or systems must support the algorithm"
- How will we measure compression ratio, CPU usage, and latency"

Measure with production-like data. Synthetic examples often compress better than real traffic.

---

# Summary

Compression reduces storage and transfer size by encoding repeated or predictable data more compactly.

Use lossless compression for databases, logs, APIs, queues, caches, and backups. Use lossy compression for media where exact reconstruction is not required.

Compression helps most when the system is limited by bytes: disk I/O, network bandwidth, memory, or storage cost.

It can hurt when the system is limited by CPU, tail latency, random access, or data that is already compressed.

Compression always trades CPU for bytes; the practical question is where that trade pays off.

---

# Quiz
