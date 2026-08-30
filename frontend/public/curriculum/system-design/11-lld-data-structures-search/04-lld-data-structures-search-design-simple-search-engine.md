---
id: "lld-data-structures-search-design-simple-search-engine"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Data Structures Search"
subSection: ""
title: "Design Simple Search Engine"
slug: "lld-data-structures-search-design-simple-search-engine"
summary: "In this chapter, we will explore the low-level design of a simple in-memory search engine."
eli10: "Imagine Design Simple Search Engine as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Simple Search Engine Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Data Structures Search","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Simple Search Engine"
  code: |
    class Document {
        private final String id;
        private final String title;
        private final String content;
    
        public Document(String id, String title, String content) {
            this.id = id;
            this.title = title;
            this.content = content;
        }
    
        public String getId() { return id; }
        public String getTitle() { return title; }
        public String getContent() { return content; }
    
        @Override
        public String toString() {
            return "Document(id=" + id + ", title='" + title + "')";
        }
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Search Engine"
>
> A **search engine** is a software system that helps users find relevant information from a large collection of data by processing queries and returning matching results.
>
> 
> <!-- Simulation: search-engine -->
> 

>
> It typically works by **indexing** content (such as web pages or documents), allowing users to perform **keyword-based searches**, and **ranking** the results based on relevance.
>
> Popular real-world examples include **Google**, **Bing**, and **Elasticsearch**.

In this chapter, we will explore the **low-level design** of a **simple in-memory search engine**.

Let's start by clarifying the requirements:

---

## 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions, clarify ambiguities, and define the system's scope more precisely.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Implementing web crawling can add significant complexity. Should we preload documents or web pages into the system"
>
> **Interviewer:** For this version, assume a predefined set of documents or web pages is already available in memory. No need to implement crawling.
>
> **Candidate:** Should the search engine support only keyword-based search, or also handle phrases queries and logical operators"
>
> **Interviewer:** Keep it simple for now. Basic keyword-based search is sufficient.
>
> **Candidate:** Should the system return only exact matches, or also support partial and fuzzy matches"
>
> **Interviewer:** Let's support exact matches only for now. You can assume case-insensitive search.
>
> **Candidate:** Do we need to rank the results, or is returning any matching document enough"
>
> **Interviewer:** Basic scoring and ranking should be implemented (e.g., based on the frequency of the keyword within each document).
>
> **Candidate:** Should we include text processing techniques like stop-word removal or stemming during indexing and querying"
>
> **Interviewer:** Not for this version. Treat all words equally. No stop-word removal or stemming.
>
> **Candidate:** Should we allow users to input search queries dynamically, or can we hardcode a set of search queries"
>
> **Interviewer: **For this version, assume queries are predefined and supplied via code. No need to handle runtime user input.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Index a **predefined** set of documents available in memory.
- Support **case-insensitive, keyword-based** search. Return a list of documents containing the specified keyword.
- Support **basic ranking** of search results (e.g., using keyword frequency within each document)
- Provide a **simple interface** to input queries and display search results

## 1.2 Non-Functional Requirements

- **Modularity:** The system should follow clean object-oriented design with well-separated responsibilities.
- **Performance:** Search queries should return results quickly, even when handling large sets of documents.
- **Maintainability:** The code should be easy to test, debug, and evolve over time
- **Memory Efficiency:** The indexing structure should be memory-optimized to store and search documents efficiently

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing the functional requirements and mapping the key responsibilities to object-oriented abstractions—classes, interfaces, or enums.

Let’s walk through the functional requirements and extract the relevant entities:

#### **1. **The system should index a predefined set of documents in memory.

This indicates the need for a `Document` entity to represent each searchable item. Each document should have a unique identifier and raw text content.

To manage all available documents, we introduce a `DocumentStore` entity. This serves as an in-memory container that exposes APIs to add and retrieve documents.

For efficient keyword-based retrieval, we require an `InvertedIndex`—a well-known data structure in search engines. It maps **terms** (keywords) to the list of documents that contain them, along with metadata such as frequency.

#### **2. **The system should return matching documents ranked by keyword frequency.

To support this, we define a `Posting` entity that represents an occurrence of a term in a document. Each posting includes:

- Document ID
- Term frequency (i.e., how many times the term appears in the document)

In addition, we introduce a `SearchResult` entity that packages:

- A matched `Document`
- A relevance score (e.g., based on term frequency)

#### **3. **The system should process queries and return ranked results.

To orchestrate the entire search pipeline, we define a `SearchEngine` entity.

- It builds the inverted index using the document store.
- It accepts queries, applies scoring and ranking strategies, and returns results.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - `Document`: Represents a searchable item with fields like ID, title, and content.
> - `DocumentStore`: Maintains all documents in memory and provides retrieval methods.
> - `InvertedIndex`: Core data structure mapping terms to their document postings.
> - `Posting`: Represents the occurrence of a term in a document (document ID, frequency, etc.).
> - `SearchResult`: Represents a matched document along with metadata and  relevance score.
> - `SearchEngine`: Coordinates the search process, from indexing and query parsing to retrieval.

These core entities define the essential abstractions of the in-memory search engine and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section outlines the classes that form the building blocks of the search engine, their responsibilities, and the relationships between them.

## 3.1 Class Definitions

The system is designed with a clear separation of concerns, categorized into data classes that hold information and core classes that implement the engine's logic.

### Data Classes

These are simple Plain Old Java Objects (POJOs) or data containers with minimal logic.

#### `Document`

Represents a single unit of information to be indexed and searched. It contains a unique `id`, a `title`, and its `content`.

#### `Posting` 

An entry in the inverted index. 

It encapsulates the `documentId` where a term appears and the `frequency` of that term within the document.

#### `SearchResult`

A container that pairs a `Document` with its calculated relevance `score`, used for ranking and display.

#### Core Classes

These classes contain the main business logic for indexing, searching, scoring, and ranking.

#### `DocumentStore`

Acts as an in-memory database, mapping document IDs to `Document` objects for quick retrieval.

#### `InvertedIndex`

The central data structure of the engine. 

It maps each term (word) to a list of `Posting` objects, enabling fast lookups of documents containing a specific term.

A concrete implementation of `RankingStrategy` that sorts by score, using the document title alphabetically as a tie-breaker.

#### `SearchEngine`

The main orchestrator class.

It provides a simple public API for indexing documents and performing searches, hiding the underlying complexity of the system.

## 3.2 Class Relationships

The classes interact through a combination of composition, association, and dependency, creating a robust and flexible system.

### **Composition**

The `SearchEngine` has a strong "owns-a" relationship with its core components.

- `SearchEngine` ◆── `InvertedIndex`: The `SearchEngine` creates and manages the lifecycle of its `InvertedIndex`. The index cannot exist without the engine.
- `SearchEngine` ◆── `DocumentStore`: Similarly, the `DocumentStore` is an integral part of the `SearchEngine` and is managed by it.

### **Aggregation**

The index and store have "has-a" relationships with their data objects.

- `InvertedIndex` ◇── `Posting`: The `InvertedIndex` contains a map of terms to lists of `Posting` objects. The postings are part of the index but represent data linked to independent documents.
- `DocumentStore` ◇── `Document`: The `DocumentStore` holds a collection of `Document` objects, which are created externally and added to the store.

### **Association**

The `SearchEngine` has a "uses-a" relationship with its strategies.

- `SearchEngine` → `ScoringStrategy`: The `SearchEngine` holds a reference to a `ScoringStrategy` object. This allows the scoring algorithm to be changed dynamically (pluggable behavior).
- `SearchEngine` → `RankingStrategy`: The `SearchEngine` also holds a reference to a `RankingStrategy`, allowing the ranking logic to be easily swapped.
- `SearchResult` → `Document`: Each `SearchResult` is associated with the `Document` it represents.

### **Dependency**

Several classes depend on others to perform their tasks, often as method parameters.

- `SearchEngine` depends on `Document` for indexing and `SearchResult` for returning search results.
- The `ScoringStrategy` implementations depend on `Posting` and `Document` to calculate a score.

## 3.3 Key Design Patterns

Several design patterns are employed to ensure the system is efficient, scalable, and maintainable.

### [**Strategy Pattern**](/learn/lld/strategy)

This pattern is used to make the scoring and ranking algorithms interchangeable.

#### `ScoringStrategy`

The `ScoringStrategy` interface and its concrete implementations (`TermFrequencyScoringStrategy`, `TitleBoostScoringStrategy`) allow the client to choose how documents are scored without modifying the `SearchEngine`.

#### `RankingStrategy`

Likewise, the `RankingStrategy` interface and its implementations allow the sorting logic for results to be defined and selected at runtime.

### [**Facade Pattern**](/learn/lld/facade)

The `SearchEngine` class acts as a Facade. It provides a simplified, high-level interface (`indexDocuments`, `search`) to the more complex underlying subsystem of indexing, data storage, scoring, and ranking. This decouples the client from the internal workings of the search engine.

### [**Singleton Pattern**](/learn/lld/singleton)

The `SearchEngine` is implemented as a Singleton to ensure there is only one instance managing the index and document store for the entire application. This provides a single, global point of access and prevents inconsistencies from multiple competing instances.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Document

Represents a unit of information indexed by the search engine.

```java
class Document {
    private final String id;
    private final String title;
    private final String content;

    public Document(String id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public String getContent() { return content; }

    @Override
    public String toString() {
        return "Document(id=" + id + ", title='" + title + "')";
    }
}
```

Each document has:

- A unique `id`
- A `title` and `content` for search and scoring

### 4.2 DocumentStore

Acts as an in-memory database for documents.

```java
class DocumentStore {
    private final Map<String, Document> store = new HashMap<>();

    public void addDocument(Document doc) {
        store.put(doc.getId(), doc);
    }

    public Document getDocument(String docId) {
        return store.get(docId);
    }
}
```

Supports retrieval by ID during scoring and search result generation.

### 4.3 Posting

Encapsulates term-specific metadata within a document. Used as entries in the inverted index.

```java
class Posting {
    private final String documentId;
    private final int frequency;

    public Posting(String documentId, int frequency) {
        this.documentId = documentId;
        this.frequency = frequency;
    }

    public String getDocumentId() { return documentId; }
    public int getFrequency() { return frequency; }
}
```

- `documentId`: The document where the term appears
- `frequency`: How often the term occurs (used for scoring)

### 4.4 InvertedIndex

Maps each term to a list of `Posting`s.

```java
class InvertedIndex {
    // The core of the search engine: maps a term to a list of documents where it appears.
    private final Map<String, List<Posting>> index = new HashMap<>();

    public void add(String term, String documentId, int frequency) {
        // Use getOrDefault to handle cases where the term is new.
        List<Posting> postings = index.getOrDefault(term, new ArrayList<>());
        postings.add(new Posting(documentId, frequency));
        index.put(term, postings);
    }

    public List<Posting> getPostings(String term) {
        return index.getOrDefault(term, Collections.emptyList());
    }
}
```

This is the heart of the search engine that enables fast lookup of documents containing a query term.

An inverted index is the fundamental data structure that makes search engines fast. Instead of scanning every document for a query term (which would be very slow), we pre-process the documents and build a map from each term (word) to a list of documents that contain it.

### 4.5 SearchResult

Pairs a document with its calculated relevance score. Used for ranking and presenting the final search results to the user.

```java
class SearchResult {
    private final Document document;
    private final double score;

    public SearchResult(Document document, double score) {
        this.document = document;
        this.score = score;
    }

    public Document getDocument() { return document; }

    public double getScore() { return score; }

    @Override
    public String toString() {
        return "  - " + document.getTitle() + " (Score: " + String.format("%.2f", score) + ")";
    }
}
```

### 4.6 Scoring Strategies

Implements the Strategy pattern for scoring. 

```java
interface ScoringStrategy {
    double calculateScore(String term, Posting posting, Document document);
}

class TermFrequencyScoringStrategy implements ScoringStrategy {
    @Override
    public double calculateScore(String term, Posting posting, Document document) {
        // The simplest strategy: score is just the term frequency.
        return posting.getFrequency();
    }
}

class TitleBoostScoringStrategy implements ScoringStrategy {
    private static final double TITLE_BOOST_FACTOR = 1.5;

    @Override
    public double calculateScore(String term, Posting posting, Document document) {
        double score = posting.getFrequency();
        // Give a boost if the term appears in the title.
        if (document.getTitle().toLowerCase().contains(term)) {
            score *= TITLE_BOOST_FACTOR;
        }
        return score;
    }
}
```

 The ScoringStrategy interface defines a contract for any scoring algorithm. The SearchEngine holds a reference to an object of this type. This allows us to easily switch between a simple TermFrequencyScoringStrategy and a more advanced TitleBoostScoringStrategy at runtime.

### 4.7 Ranking Strategies

Implements the Strategy pattern for ranking. 

```java
interface RankingStrategy {
    void rank(List<SearchResult> results);
}

class ScoreBasedRankingStrategy implements RankingStrategy {
    @Override
    public void rank(List<SearchResult> results) {
        // Sorts purely by score in descending order.
        results.sort(Comparator.comparing(SearchResult::getScore).reversed());
    }
}

class ScoreThenAlphabeticalRankingStrategy implements RankingStrategy {
    @Override
    public void rank(List<SearchResult> results) {
        // Create a composite comparator.
        // 1. Primary sort: by score, descending.
        // 2. Secondary sort (for ties): by document title, ascending.
        Comparator<SearchResult> compositeComparator = Comparator
                .comparing(SearchResult::getScore)
                .reversed()
                .thenComparing(result -> result.getDocument().getTitle());

        results.sort(compositeComparator);
    }
}
```

Similar to scoring, the RankingStrategy allows us to define different ways to order the final results. The ScoreBasedRankingStrategy provides a standard relevance sort, while the ScoreThenAlphabeticalRankingStrategy shows how we can handle tie-breaking gracefully, a common requirement in real-world systems.

### 4.8 SearchEngine

This class acts as a central **Facade** and **Singleton**, orchestrating all the components to provide a simple API for indexing and searching.

```java
$cd
```

- **Singleton Pattern:** The engine is a Singleton to ensure there is only one instance managing the index and document store for the entire application.
- **Facade Pattern:** It provides a simple, high-level API (indexDocuments, search) that hides the underlying complexity of tokenization, index management, scoring, and ranking.
- **Indexing Process:** The indexDocument method demonstrates the full pipeline: tokenizing text, counting term frequencies, and populating the InvertedIndex.
- **Search Process:** The search method orchestrates the retrieval: it gets candidate documents from the index, uses the injected ScoringStrategy to calculate their relevance, and then uses the injected RankingStrategy to sort them before returning the final list.

### 4.9 SearchEngineDemo

This driver class shows how a client would interact with the SearchEngine and demonstrates the flexibility of the strategy-based design.

```java
$d3
```

---

# 5. Run and Test

---

# 6. Quiz
