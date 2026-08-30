---
id: "java-8-streams-api-pipeline"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Java 8 Features"
title: "Stream API: Pipelines, Intermediate & Terminal Operations"
slug: "java-8-streams-api-pipeline"
summary: "Master the Java 8 Stream API: Lazy evaluation, filter, map, flatMap, distinct, sorted, reduce, collect (groupingBy, partitioningBy), and parallel streams."
eli10: "A Stream is like a factory assembly line for data. Items flow through conveyor stations (filter bad items, paint items, box items) in a single smooth pipeline!"
mentalModel: "A Stream pipeline consists of a Source -> 0 or more Lazy Intermediate Operations -> 1 Terminal Operation that triggers computation."
difficulty: "Intermediate"
estimatedMinutes: 25
tags: ["Stream API", "Streams", "filter", "map", "reduce", "collect", "groupingBy"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Stream pipeline filtering even numbers, squaring them, and collecting into a list."
  code: |
    import java.util.List;
    import java.util.stream.Collectors;

    public class StreamDemo {
        public static void main(String[] args) {
            List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

            // Stream Pipeline: Source -> filter -> map -> collect
            List<Integer> evenSquares = numbers.stream()
                .filter(n -> n % 2 == 0)       // Intermediate: keeps 2, 4, 6, 8, 10
                .map(n -> n * n)               // Intermediate: squares to 4, 16, 36, 64, 100
                .collect(Collectors.toList()); // Terminal: triggers pipeline

            System.out.println("Even Squares: " + evenSquares);
        }
    }
---

# 🌊 Stream API: Pipelines, Intermediate & Terminal Operations

---

## 📖 1. The Stream Lifecycle & Lazy Evaluation

A Java Stream is **NOT a data structure** (it does not store data). It is a pipeline of computational steps executed lazily.

```mermaid
flowchart LR
    Source["Data Source<br>List / Set / Array"] --> F["filter(predicate)<br><i>Lazy Intermediate</i>"]
    F --> M["map(function)<br><i>Lazy Intermediate</i>"]
    M --> S["sorted()<br><i>Lazy Intermediate</i>"]
    S --> T["collect() / forEach()<br><b>Terminal Operation (Triggers Run)</b>"]
```

---

## 📊 2. Intermediate vs Terminal Operations

| Category | Execution Nature | Return Type | Examples |
| :--- | :--- | :--- | :--- |
| **Intermediate Operations** | **Lazy** (Queued until terminal op is called) | Returns a new `Stream<T>` | `filter()`, `map()`, `flatMap()`, `distinct()`, `sorted()`, `limit()`, `skip()` |
| **Terminal Operations** | **Eager** (Triggers pipeline execution & closes stream) | Non-Stream (e.g. `List`, `long`, `Optional`, `void`) | `collect()`, `forEach()`, `reduce()`, `count()`, `findFirst()`, `anyMatch()`, `toList()` |
