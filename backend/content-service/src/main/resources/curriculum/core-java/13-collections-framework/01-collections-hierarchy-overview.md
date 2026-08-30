---
id: "java-collections-overview"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Collections Framework"
title: "Java Collections Framework Architecture & Hierarchy"
slug: "java-collections-overview"
summary: "Master the Java Collections Framework architecture: Iterable, Collection, List, Set, Queue, Deque, and Map hierarchies, with core time complexities."
eli10: "The Collections Framework is a ready-to-use toolkit of data structures: Lists for ordered sequences, Sets for unique items, Queues for line waiting, and Maps for dictionary key-value lookups!"
mentalModel: "The Collection hierarchy extends Iterable (enabling enhanced for-loops). Map stands alone as a separate key-value interface."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["Collections", "List", "Set", "Map", "Queue", "Data Structures", "Iterable"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Overview of core Java Collections: List, Set, and Map."
  code: |
    import java.util.*;

    public class CollectionsOverviewDemo {
        public static void main(String[] args) {
            // 1. List: Ordered, allows duplicates
            List<String> list = new ArrayList<>(List.of("Apple", "Banana", "Apple"));
            System.out.println("List (Ordered): " + list);

            // 2. Set: Unordered, unique elements only
            Set<String> set = new HashSet<>(list);
            System.out.println("Set (Unique):   " + set);

            // 3. Map: Key-Value pairs
            Map<String, Integer> map = new HashMap<>();
            map.put("Apple", 10);
            map.put("Banana", 25);
            System.out.println("Map (Key-Value): " + map);
        }
    }
---

# 📚 Java Collections Framework Architecture & Hierarchy

---

## 🗺️ 1. Complete Collection Framework Hierarchy

```mermaid
flowchart TD
    Iterable["Iterable&lt;T&gt; (Root Interface)"]
    Collection["Collection&lt;E&gt;"]
    
    Iterable --> Collection
    
    Collection --> List["List&lt;E&gt; (Ordered, Duplicates allowed)"]
    Collection --> Set["Set&lt;E&gt; (Unique, No duplicates)"]
    Collection --> Queue["Queue&lt;E&gt; / Deque&lt;E&gt; (FIFO / LIFO)"]
    
    List --> AL["ArrayList (Dynamic array, O(1) random access)"]
    List --> LL["LinkedList (Doubly linked list)"]
    List --> Vec["Vector / Stack (Legacy synchronized)"]
    
    Set --> HS["HashSet (O(1) Hashing)"]
    Set --> LHS["LinkedHashSet (Insertion ordered)"]
    Set --> TS["TreeSet (Sorted Red-Black Tree)"]
    
    Map["Map&lt;K, V&gt; (Separate Interface - Key Value)"]
    Map --> HM["HashMap (O(1) Hashing)"]
    Map --> LHM["LinkedHashMap (Maintains order)"]
    Map --> TM["TreeMap (Sorted by keys)"]
    Map --> CHM["ConcurrentHashMap (Thread-safe lock striping)"]
```

---

## 📊 2. Time Complexity Quick-Reference Table

| Collection Class | Interface | Underlying Structure | `add()` / `put()` | `get()` / `contains()` | `remove()` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`ArrayList`** | `List` | Dynamic Resizeable Array | $O(1)$ amortized | $O(1)$ by index | $O(n)$ shifting |
| **`LinkedList`** | `List` / `Deque` | Doubly-Linked List | $O(1)$ ends | $O(n)$ search | $O(1)$ known node |
| **`HashSet`** | `Set` | `HashMap` Instance | $O(1)$ average | $O(1)$ average | $O(1)$ average |
| **`TreeSet`** | `NavigableSet` | Red-Black Balanced BST | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |
| **`HashMap`** | `Map` | Array of Buckets (List/Tree) | $O(1)$ average | $O(1)$ average | $O(1)$ average |
| **`TreeMap`** | `NavigableMap` | Red-Black Balanced BST | $O(\log n)$ | $O(\log n)$ | $O(\log n)$ |
