---
id: "java-collections-hashmap-internals"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Collections Framework"
title: "HashMap Internals, Bucket Collisions & Treeification"
slug: "java-collections-hashmap-internals"
summary: "Master HashMap Internal Working in Java 8+: Node<K,V> array buckets, hash(key) calculation, index formula (n-1 & hash), collision handling, load factor 0.75, and LinkedList to Red-Black Tree treeification at threshold 8."
eli10: "HashMap is like a wall of mailboxes (buckets). When you put a letter in, Java computes the mailbox number using your key's hash code. If too many letters pile into one box, Java organizes them into a sorted tree for fast retrieval!"
mentalModel: "HashMap uses an array of Node<K,V> buckets. When bucket collision count >= 8 and table capacity >= 64, the linked list is treeified into a TreeNode (Red-Black Tree) improving worst-case search from O(n) to O(log n)."
difficulty: "Advanced"
estimatedMinutes: 25
tags: ["HashMap", "HashMap Internals", "Treeification", "Red-Black Tree", "Load Factor", "Hash Collisions"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Demonstrating HashMap operations and understanding hashCode and equals contract."
  code: |
    import java.util.HashMap;
    import java.util.Map;
    import java.util.Objects;

    class ProductKey {
        private final String sku;

        public ProductKey(String sku) { this.sku = sku; }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof ProductKey that)) return false;
            return Objects.equals(sku, that.sku);
        }

        @Override
        public int hashCode() {
            return Objects.hash(sku);
        }
    }

    public class HashMapDemo {
        public static void main(String[] args) {
            Map<ProductKey, Integer> stock = new HashMap<>();
            stock.put(new ProductKey("SKU-99"), 150);

            // Re-lookup using identical logical key (guaranteed by hashCode & equals contract!)
            Integer count = stock.get(new ProductKey("SKU-99"));
            System.out.println("Retrieved Inventory Count: " + count);
        }
    }
---

# 🧠 HashMap Internals, Bucket Collisions & Treeification

---

## 📖 1. The Core Architecture of `HashMap`

A `HashMap` in Java is an array of buckets (`Node<K,V>[] table`), where each bucket stores key-value pairs.

### 📐 The Mathematical Index Formula:
When you call `map.put(key, value)`:
1. `hash = hash(key.hashCode())` (Applies bit-mixing to distribute bits evenly)
2. `index = (n - 1) & hash` (Computes bucket index, where $n$ is the array power-of-two capacity, default 16)

```mermaid
flowchart TD
    subgraph BucketArray["Node&lt;K,V&gt;[] table (Default Capacity: 16)"]
        B0["Bucket [0]: null"]
        B1["Bucket [1]: Node(Key1, Val1) -> Node(Key2, Val2)"]
        B2["Bucket [2]: null"]
        B3["Bucket [3]: TreeNode (Red-Black Tree Root)"]
    end
```

---

## 🌳 2. The Java 8+ Treeification Thresholds

In Java 7, collisions formed a linear `LinkedList`, degrading lookup to $O(n)$ under adversarial hash collisions (Denial of Service risk).

In **Java 8+**:
- **Treeification Rule**: When a single bucket's linked list reaches **8 nodes (`TREEIFY_THRESHOLD = 8`)** AND total table capacity is at least **64 (`MIN_TREEIFY_CAPACITY = 64`)**, Java converts the bucket into a **Red-Black Balanced Binary Search Tree (`TreeNode<K,V>`)**.
- **Performance Impact**: Worst-case lookup time improves from $O(n)$ to **$O(\log n)$**.
- **Untreeify Rule**: If removals drop the node count in a bucket down to **6 (`UNTREEIFY_THRESHOLD = 6`)**, it converts back into a simple linked list.

---

## ⚖️ 3. Default Capacity & Load Factor (0.75)

- **Default Initial Capacity**: `16`
- **Default Load Factor**: `0.75`
- **Threshold for Resizing**: $\text{Capacity} \times \text{LoadFactor} = 16 \times 0.75 = 12$.
- When the 13th unique key is added, the bucket array **doubles in size** (16 $\rightarrow$ 32 $\rightarrow$ 64 $\rightarrow$ 128), and all elements are re-hashed/re-indexed.
