---
id: "lld-management-systems-design-library-management-system"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Management Systems"
subSection: ""
title: "Design Library Management System"
slug: "lld-management-systems-design-library-management-system"
summary: "In this chapter, we will explore the low-level design of a library management system in detail."
eli10: "Imagine Design Library Management System as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Library Management System Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Management Systems","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Library Management System"
  code: |
    enum ItemType {
        BOOK,
        MAGAZINE
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Library Management System"
>
> A **Library Management System** is software used to manage the operations of a library, such as tracking books, managing inventory, handling book checkouts and returns, maintaining user records, and enforcing due dates and fines.
>
> 
> <!-- Simulation: library-management -->
> 

>
> It helps librarians and users efficiently organize and access library resources.

In this chapter, we will explore the **low-level design of a library management system** in detail.

Lets start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Can a book have multiple copies, and should each copy be tracked individually"
>
> **Interviewer:** Yes, a book can have multiple copies, and each copy should be treated as a separate entity
>
> **Candidate:** Should we support different user roles, such as librarian and members, with different permissions"
>
> **Interviewer:** Yes. Librarians can manage the book inventory, issue/return books, and handle user accounts. Members can search for books, borrow them, and view their own history.
>
> **Candidate:** Do we need to enforce borrowing limits, such as maximum books per user or due dates for returns"
>
> **Interviewer:** Yes, each member should be allowed to borrow up to a fixed number of books (say 5), and each book should have a due date, after which fines can be applied.
>
> **Candidate:** Should the system support searching and filtering books by title, author, genre, etc."
>
> **Interviewer:** Yes, the system should allow users to search and filter books using various criteria such as title, author, genre, or ISBN.
>
> **Candidate:** Should we maintain a borrowing history for each member"
>
> **Interviewer:** Yes, the system should maintain borrowing and return history for every member for tracking purpose.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Support **user registration **with different roles (librarian, member)
- Allow librarians to **add**, **update**, and **remove** books from the catalog.
- Track multiple physical copies of the same book as separate entities.
- Librarians can manage the **book catalog** and issue/return books
- Members can **borrow** and **return** books
- Enable members to search for books by title, author, and ISBN.
- Limit maximum active borrowed books per user and due dates.
- Fines should be calculated for overdue returns.
- Maintain a **transaction log** for all borrow and return activities

## 1.2 Non-Functional Requirements

- **Modularity:** The system should follow object-oriented principles with clear separation between modules like user management and catalog management
- **Extensibility:** The design should be easy to extend to support future features
- **Maintainability:** The system should be easy to test, debug, and enhance over time

After the requirements are clear, lets identify the core entities/objects we will have in our system.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing the functional requirements and highlighting the **key nouns** and responsibilities that naturally map to object-oriented abstractions such as **classes**, **enums**, or **interfaces**.

Let’s walk through the functional requirements and extract the relevant entities:

#### 1. The system must support different user roles such as librarians and members.

This indicates the need for a `User` entity with a `UserRole` enum to differentiate between librarian and member permissions. Behavior like adding books, issuing, and returning will be restricted based on role.

#### 2. **Books can have multiple physical copies, each tracked individually.**

We need a `Book` entity to represent the bibliographic details (title, author, ISBN, genre), and a `BookCopy` entity to represent each physical copy with a unique identifier and current availability status.

#### 3. **Librarians can manage the book catalog and perform inventory operations.**

The `Librarian` (or part of `User` with `LIBRARIAN` role) will be allowed to add, update, or remove books from the system and manage issuing and returning of books to members.

#### **4. Members can borrow books, with a borrowing limit and due date.**

This introduces a `BorrowRecord` entity to track borrowing transactions. Each record will include the member, the specific `BookCopy`, issue date, due date, and return date (if returned). It will also be used to check borrowing limits.

#### **5. The system should calculate fines for overdue books.**

This behavior can be encapsulated in a utility method or part of the `BorrowRecord` or `FineCalculator` component that computes the fine based on the due and return dates.

#### **6. Users should be able to search and filter books by attributes.**

This functionality will be supported via methods in a `Catalog` or `SearchService` class, which indexes books by title, author, genre, and ISBN.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - `User`: Represents a system user (librarian or member). Includes attributes like user ID, name, and role.
> - `Book`: Represents a book in the catalog. Includes metadata like title, author, ISBN, and genre.
> - `BookCopy`: Represents an individual physical copy of a book. Each copy has a unique ID and status (e.g., AVAILABLE, ISSUED).

These core entities define the essential abstractions of the Library Management System and will guide the structure of our low-level design and class diagrams.

---

# 3. Designing Classes and Relationship

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

- `ItemType`: Represents the supported categories of items in the library (e.g., `BOOK`, `MAGAZINE`). Using an `enum` ensures type safety and allows the `ItemFactory` to easily distinguish which type of object to create.

### **Data Classes**

#### `Loan`

A simple data class that acts as a record, linking a specific `BookCopy` to a `Member`.

It encapsulates the core information of a borrowing transaction, including the item, the borrower, and the `checkoutDate`.

### **Core Classes**

#### `Member`

Represents a library user.

Each member has a unique ID and name. This class also plays the role of an **Observer** in the Observer pattern, containing an `update()` method to receive notifications when a book they have on hold becomes available. It maintains a list of its current `Loan`s.

#### `LibraryItem`** (Abstract Class)**

The base class for all borrowable items.

It holds common data like `id` and `title`. Crucially, it acts as the **Subject** in the Observer pattern, maintaining a list of `Member`s (observers) who have placed a hold on it. It also manages all its physical copies (`BookCopy`).

- `Book`** & **`Magazine`: Concrete implementations of `LibraryItem`. They extend the base class to add specific metadata (`author` for `Book`, `publisher` for `Magazine`), demonstrating polymorphism.

#### `BookCopy`

Represents a single, physical copy of a `LibraryItem`.

This class is the **Context** for the State pattern, holding a reference to its current state (`ItemState`). It delegates all actions like `checkout()`, `returnItem()`, and `placeHold()` to its current state object, which determines the v

#### `ItemFactory`

A simple factory class responsible for creating instances of `LibraryItem` subclasses. It decouples the `LibraryManagementSystem` from the concrete instantiation logic of `Book`s and `Magazine`s.

#### `TransactionService`** (Singleton)**

A service class that manages the lifecycle of `Loan`s.

It centralizes the logic for creating and ending loans, ensuring that a book copy is not loaned out to multiple members simultaneously.

#### `LibraryManagementSystem`** (Singleton & Facade)**

The main entry point for all client interactions.

It simplifies the complex underlying subsystem by providing a clean, high-level API for operations like adding items, managing members, checking out items, and searching. It holds the central data stores (catalog, members, copies).

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition (**`LibraryManagementSystem`** has catalogs)**

The `LibraryManagementSystem` owns and manages the lifecycle of the `catalog`, `members`, and `copies` collections. These collections do not exist outside the context of the system. Similarly, a `LibraryItem` is composed of its `BookCopy`s.

### **Association**

- A `Loan` object forms an association between one `Member` and one `BookCopy`.
- A `BookCopy` is associated with a single `ItemState` at any given time.
- The `LibraryManagementSystem` is associated with a `SearchStrategy` when performing a search.
- Each `ItemState` holds a reference back to its context, the `BookCopy`, to change its state.

### **Inheritance**

- `Book` and `Magazine` inherit from the abstract `LibraryItem` class.
- `AvailableState`, `CheckedOutState`, and `OnHoldState` implement the `ItemState` interface.
- `SearchByTitleStrategy` and `SearchByAuthorStrategy` implement the `SearchStrategy` interface.

### **Dependency**

- The `LibraryManagementSystem` depends on the `ItemFactory` to create new library items.
- The state objects (e.g., `AvailableState`) depend on the `TransactionService` to create loans.
- The client (`LibraryManagementDemo`) depends on the `LibraryManagementSystem` facade.

## 3.3 Key Design Patterns

### [**State Pattern**](/learn/lld/state)

Used to manage the status of a `BookCopy`. The `BookCopy` (Context) delegates its behavior to different `ItemState` objects. This allows a copy to change its behavior dynamically as its state changes (e.g., from `Available` to `CheckedOut`) without using complex conditional logic.

### [**Strategy Pattern**](/learn/lld/strategy)

Used for searching the catalog. The `LibraryManagementSystem` can be configured with different `SearchStrategy` objects (`SearchByTitleStrategy`, `SearchByAuthorStrategy`) to perform different kinds of searches without changing its own code.

### [**Observer Pattern**](/learn/lld/observer)

Used for the hold notification system. The `LibraryItem` is the Subject, and `Member`s are Observers. When a `BookCopy` is returned and has holds, it notifies all waiting `Member`s via the `LibraryItem`'s `notifyObservers()` method.

### [**Factory Pattern (Simple Factory)**](/learn/lld/factory-method)

The `ItemFactory` class provides a static method to create different types of `LibraryItem`s. This encapsulates the instantiation logic and decouples the client (`LibraryManagementSystem`) from concrete item classes.

### [**Facade Pattern**](/learn/lld/facade)

`LibraryManagementSystem` acts as a facade, providing a simplified, high-level interface to the complex subsystem of state management, transactions, and notifications. The client interacts only with the facade, not the individual components.

### [**Singleton Pattern**](/learn/lld/singleton)

Both `LibraryManagementSystem` and `TransactionService` are singletons. This ensures a single, globally accessible point of control for library operations and loan management, respectively, preventing inconsistent states.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 `ItemType` Enum

Defines different types of library items supported in the system.

```java
enum ItemType {
    BOOK,
    MAGAZINE
}
```

### 4.2 `Member`

Represents a library member.

```java
class Member {
    private final String id;
    private final String name;
    private final List<Loan> loans = new ArrayList<>();

    public Member(String id, String name) {
        this.id = id;
        this.name = name;
    }

    // Observer update method
    public void update(LibraryItem item) {
        System.out.println("NOTIFICATION for " + name + ": The book '" + item.getTitle() + "' you placed a hold on is now available!");
    }

    public void addLoan(Loan loan) { loans.add(loan); }
    public void removeLoan(Loan loan) { loans.remove(loan); }
    public String getId() { return id; }
    public String getName() { return name; }
    public List<Loan> getLoans() { return loans; }
}
```

Maintains a list of active `Loan` records.

### 4.3 `LibraryItem` (Abstract Base)

Base class for items like `Book` and `Magazine`.

```java
$d7
```

Implements the **Observer pattern** to notify members when a held item becomes available. Tracks all physical `BookCopy` instances of this title.

### 4.4 `Book` and `Magazine`

Concrete subclasses of `LibraryItem`. Differentiate based on metadata: books have authors, magazines have publishers.

#### Book

```java
class Book extends LibraryItem {
    private final String author;

    public Book(String id, String title, String author) {
        super(id, title);
        this.author = author;
    }

    @Override
    public String getAuthorOrPublisher() { return author; }
}
```

#### Magazine

```java
class Magazine extends LibraryItem {
    private final String publisher;

    public Magazine(String id, String title, String publisher) {
        super(id, title);
        this.publisher = publisher;
    }

    @Override
    public String getAuthorOrPublisher() { return publisher; }
}
```

### 4.5 `ItemFactory`

Implements the **Factory pattern** to decouple item instantiation from client code.

```java
class ItemFactory {
    public static LibraryItem createItem(ItemType type, String id, String title, String author) {
        switch (type) {
            case BOOK: return new Book(id, title, author);
            case MAGAZINE: return new Magazine(id, title, author); // Author might be publisher here
            default: throw new IllegalArgumentException("Unknown item type.");
        }
    }
}
```

### 4.6 `BookCopy`

Represents a physical instance of a `LibraryItem`.

```java
class BookCopy {
    private final String id;
    private final LibraryItem item;
    private ItemState currentState;

    public BookCopy(String id, LibraryItem item) {
        this.id = id;
        this.item = item;
        this.currentState = new AvailableState();
        item.addCopy(this);
    }

    public void checkout(Member member) { currentState.checkout(this, member); }
    public void returnItem() { currentState.returnItem(this); }
    public void placeHold(Member member) { currentState.placeHold(this, member); }

    public void setState(ItemState state) { this.currentState = state; }
    public String getId() { return id; }
    public LibraryItem getItem() { return item; }
    public boolean isAvailable() { return currentState instanceof AvailableState; }
}
```

Uses the **State pattern** to control and delegate behavior based on availability.

### 4.7 `Loan`

Captures borrowing information of a `BookCopy` by a `Member`. Used to track active checkouts and enforce borrowing rules.

```java
class Loan {
    private final BookCopy copy;
    private final Member member;
    private final LocalDate checkoutDate;

    public Loan(BookCopy copy, Member member) {
        this.copy = copy;
        this.member = member;
        this.checkoutDate = LocalDate.now();
    }

    public BookCopy getCopy() { return copy; }
    public Member getMember() { return member; }
}
```

### 4.8 `SearchStrategy` and Implementations

Implements the **Strategy pattern** for searching. Strategies can filter by title, author, or any future criteria.

```java
interface SearchStrategy {
    List<LibraryItem> search(String query, List<LibraryItem> items);
}

class SearchByTitleStrategy implements SearchStrategy {
    @Override
    public List<LibraryItem> search(String query, List<LibraryItem> items) {
        return items.stream()
                .filter(item -> item.getTitle().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }
}

class SearchByAuthorStrategy implements SearchStrategy {
    @Override
    public List<LibraryItem> search(String query, List<LibraryItem> items) {
        return items.stream()
                .filter(item -> item.getAuthorOrPublisher().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }
}
```

- **Strategy Pattern:** This pattern allows us to define a family of search algorithms (by title, by author) and make them interchangeable. The main library system can perform a search using any provided strategy without being coupled to the specific search logic.

### 4.9 `ItemState` Interface and Implementations

Implements the **State pattern** to manage different stages of a book copy

```java
$de
```

### 4.10 `TransactionService` (Singleton)

```java
class TransactionService {
    private static final TransactionService INSTANCE = new TransactionService();
    private final Map<String, Loan> activeLoans = new HashMap<>(); // Key: BookCopy ID

    private TransactionService() {}
    public static TransactionService getInstance() { return INSTANCE; }

    public void createLoan(BookCopy copy, Member member) {
        if (activeLoans.containsKey(copy.getId())) {
            throw new IllegalStateException("This copy is already on loan.");
        }
        Loan loan = new Loan(copy, member);
        activeLoans.put(copy.getId(), loan);
        member.addLoan(loan);
    }

    public void endLoan(BookCopy copy) {
        Loan loan = activeLoans.remove(copy.getId());
        if (loan != null) {
            loan.getMember().removeLoan(loan);
        }
    }
}
```

### 4.11 `LibraryManagementSystem` (Facade)

This class is the single entry point for all client interactions, simplifying the use of the complex subsystem.

```java
$e4
```

- **Singleton and Facade:** This class is a Singleton that also acts as a Facade. It provides a simple, high-level API (checkout, returnItem, search) that hides the underlying complexity of states, observers, factories, and services.

### 4.12 `LibraryManagementDemo`

The demo class validates the entire system by simulating common library interactions.

```java
$ea
```

---

# 5. Run and Test

---

# 6. Quiz
