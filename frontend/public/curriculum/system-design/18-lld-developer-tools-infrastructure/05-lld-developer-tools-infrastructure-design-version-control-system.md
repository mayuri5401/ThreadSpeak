---
id: "lld-developer-tools-infrastructure-design-version-control-system"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Developer Tools Infrastructure"
subSection: ""
title: "Design Version Control System"
slug: "lld-developer-tools-infrastructure-design-version-control-system"
summary: "In this chapter, we will explore the low-level design of a simplified version control system."
eli10: "Imagine Design Version Control System as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Version Control System Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Developer Tools Infrastructure","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Version Control System"
  code: |
    abstract class FileSystemNode {
        protected String name;
    
        public FileSystemNode(String name) {
            this.name = name;
        }
    
        public String getName() {
            return name;
        }
    
        // Abstract clone method for deep copying (Prototype Pattern)
        public abstract FileSystemNode clone();
    
        public abstract void print(String indent);
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Version Control System"
>
> A **Version Control System (VCS)** is a tool that helps individuals and teams manage changes to source code or files over time. It records a history of edits, enables collaborative development, and allows users to revert to previous versions if needed.
>
> 
> <!-- Simulation: git -->
> 

>
> Key features of a typical VCS include:
>
> - **Commit history**: Track incremental changes with context
> - **Branching and merging**: Experiment or isolate features without affecting the main line
> - **Collaboration support**: Prevent developers from overwriting each other’s work
> - **Version retrieval**: View or restore any past state of the system
>
> Popular version control tools include **Git**, **Subversion (SVN)**, and **Mercurial**.

In this chapter, we will explore the **low-level design of a simplified version control system**.

Let's start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions, clarify ambiguities, and define the system's scope more precisely.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should the system support nested directories and a hierarchical file structure"
>
> **Interviewer:** Yes, the system should support managing files in a directory tree structure, similar to a typical file system.
>
> **Candidate:** Should we store full snapshots of files or just the differences (deltas) between versions"
>
> **Interviewer:** To keep things simple, store full snapshots for each commit. In real-world systems, we would optimize this using deltas.
>
> **Candidate:** Do we need to support a staging area where users can select specific files to include in a commit"
>
> **Interviewer:** No, assume that the entire repository is committed at once.
>
> **Candidate:** Do we need to support branching and merging features"
>
> **Interviewer:** Yes, basic branching should be supported. You can skip merging for now.
>
> **Candidate:** Should the system allow users to roll back to a previous version"
>
> **Interviewer:** Yes, the system should allow viewing commit history and reverting the repository to any prior commit.
>
> **Candidate:** Should the system support viewing diffs between any two commits"
>
> **Interviewer:** It would be nice to have, but let’s leave that out for this design.
>
> **Candidate:** Should we use a command-line interface or just hardcode a sequence of operations for demonstration"
>
> **Interviewer:** A hardcoded sequence is fine for demonstration purposes.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Support **creation** and **versioning** of multiple files within a hierarchical directory structure.
- Allow users to **commit changes** across the entire repository (no staging area).
- Support **basic branching operations** (create and switch branches).
- Maintain a commit history for each branch.
- Allow users to **rollback** to any previous commit in the history.
- **Store full snapshots** of the file system at the time of each commit.
- Enable viewing the **commit history** of the repository.

## 1.2 Non-Functional Requirements

- **Modularity:** The system should be designed with clear separation between modules.
- **Maintainability:** Code should follow object-oriented principles, be easy to test, and allow for future changes with minimal impact
- **Reliability:** Ensure consistency and correctness of the file system across commits, branches, and rollbacks.
- **Usability:** Provide a simple interface to demonstrate core operations such as `commit`, `checkout`, `branch`, and `revert`

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing the functional requirements and highlighting the **key nouns** and responsibilities that naturally map to object-oriented abstractions such as **classes**, **enums**, or **interfaces**.

Let’s walk through the functional requirements and extract the relevant entities:

#### 1. **We need to model files and folders in a directory tree.**

A version control system manages codebases, which are nothing more than directories containing files and subdirectories. To represent this structure:

- We introduce a common abstraction `FileSystemNode`, which acts as the base class for anything that can exist in the repository, either a `File` or a `Directory`.
- The `File` class represents a single file with its name and contents.
- The `Directory` class can contain multiple `FileSystemNode` children, enabling a tree-like structure to model folders and subfolders.

#### 2. **We need to take a snapshot of the file system every time the user commits.**

Each time a user commits, the system needs to save the entire state of the file system. This is where the `Commit` class comes in.

- A `Commit` object stores a full snapshot of the repository at a specific point in time.
- It contains metadata like a unique ID, timestamp, commit message, and a reference to the root `Directory` of that snapshot.

To manage and retrieve these commits efficiently:

- The `CommitManager` acts as a registry for all commits. It handles commit creation and lookup operations.

#### 3. **We need to support branches and maintain separate commit histories.**

Branches allow developers to work in isolated timelines. Each branch has its own set of commits.

- The `Branch` class represents a line of development. It keeps track of its name and points to the latest commit (HEAD).
- The `BranchManager` is responsible for creating new branches, switching between them, and maintaining all the branches in the system.

This setup ensures that multiple versions of the project can be developed independently.

#### 4. **We need a central engine to coordinate everything—commits, branches, and file states.**

To tie everything together, we need a top-level controller that understands the current state and user operations:

- The `VersionControlSystem` class plays this role. It manages the active branch, handles operations like `commit`, `checkout`, and `revert`, and interfaces with both the `CommitManager` and `BranchManager`.

This class is the main entry point for any core version control operation.

#### 5. **We need a simple way to demonstrate how the system works.**

For testing and demonstration purposes:

- The `VersionControlSystemDemo` class runs a predefined sequence of operations (like creating files, committing, switching branches) to showcase how the system behaves.

This helps in validating the logic without building a full-fledged CLI.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **FileSystemNode**: Represents a file in the repository. Each file may have multiple versions across commits.
> - **File**: Represents a file in the repository. Each file may have multiple versions across commits.
> - **Directory**: Represents a folder in a hierarchical file structure.
> - **Commit**: Stores a snapshot of the repository at a specific point in time.
> - **CommitManager: **Manages creation, retrieval, and tracking of commits.
> - **Branch**: Represents a branch with a name and a pointer to its latest commit.
> - **BranchManager**: Handles creation, switching, and management of branches.
> - **VersionControlSystem**: Central controller for the entire version control logic.
> - **VersionControlSystemDemo**: Driver class that simulates user operations for testing/demo purposes.

These core entities define the key abstractions of a version control system and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

In this section, we outline the core classes involved in the design of a lightweight, in-memory version control system.

## 3.1 Class Definitions

#### Commit

Represents a snapshot of the entire file system at a given point in time.

#### CommitManager

Responsible for creating and storing `Commit` objects.

#### Branch

Represents a named pointer to a chain of commits.

#### BranchManager

Manages multiple branches using a `Map<branchName, Branch>`.

#### VersionControlSystem

The central controller class that exposes the public API of the version control system.

## 3.2 Key Design Patterns

### [Composite Pattern](/learn/lld/composite)

**Problem it Solves:** The system needs to manage a file system, which is a tree-like structure containing both individual files (leaves) and directories (containers/branches of the tree). We need a way to treat both individual objects and compositions of objects uniformly.

**How it's Applied:**

- We define a common abstract class or interface, FileSystemNode.
- File is a "leaf" class that implements FileSystemNode.
- Directory is a "composite" class that implements FileSystemNode and holds a collection of other FileSystemNodes (which can be either Files or other Directorys).

**Benefits:**

- **Simplicity:** Client code (like the commit logic) doesn't need to differentiate between files and directories. It can simply call a method like root.clone() and the entire tree is cloned recursively, regardless of its structure.
- **Extensibility:** Adding new types of nodes (e.g., SymbolicLink) is easy; you just create a new class that extends FileSystemNode.

**Where used**: `DirectoryNode` and `FileNode` both inherit from a common `Node` base, and directories hold children of type `Node`.

**Why**: Lets you treat individual files and folders uniformly and walk the tree recursively.

### [Prototype Pattern](/learn/lld/prototype)

**Problem it Solves:** The requirement is to store "full snapshots" of the file system for each commit. This means we need to create an independent, deep copy of the entire workingDirectory tree every time a commit is made. Manually iterating and creating new objects would be complex and error-prone.

- **Where used**: `clone()` methods on `FileNode` and `DirectoryNode` to create deep copies of the filesystem snapshot.
- **Why**: Decouples snapshot creation from concrete classes and makes “make a copy” a first-class operation.

**How it's Applied:**

- The FileSystemNode abstract class defines a clone() method.
- Both File and Directory provide concrete implementations of clone(). The Directory's clone() method recursively calls clone() on all its children, ensuring a deep copy is made.

**Benefits:**

- **Encapsulates Complexity:** The logic for creating a complete copy is contained within the objects themselves, not in a separate manager class.
- **Performance:** While our implementation is simple, in more complex scenarios, cloning can be more efficient than creating a new object from scratch.

### [Facade Pattern](/learn/lld/facade)

**Problem it Solves:** The internal workings of the VCS are complex. There are Commit objects, Branch pointers, a map of all historical commits, and the workingDirectory. A user shouldn't have to interact with all these components directly. They need a simple, high-level API.

**How it's Applied:**

- The VersionControlSystem class acts as the facade. It provides a clean and simple interface with methods like commit(), checkoutBranch(), log(), and revert().
- It hides the complexity of creating Commit objects, managing the branches map, deep-cloning the workingDirectory, and traversing the commit history.

**Benefits:**

- **Decoupling:** The client code (the Main driver class) is completely decoupled from the system's internal implementation.
- **Usability:** It makes the system much easier to use and understand from an external perspective.

### [**Memento Pattern**](/learn/lld/memento)

- **Where used**: `Commit` holds a snapshot (the memento) of the entire `DirectoryNode`.
- **Why**: Encapsulates the internal state of the file tree so you can restore it later (e.g. on revert or checkout).

## 3.3 Full Class Diagram

---

# 4. Implementation

### 4.1 FileSystemNode

An abstract base class representing a node in the file system.

```java
abstract class FileSystemNode {
    protected String name;

    public FileSystemNode(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    // Abstract clone method for deep copying (Prototype Pattern)
    public abstract FileSystemNode clone();

    public abstract void print(String indent);
}
```

It defines a common interface for files and directories, including methods for cloning (Prototype Pattern) and printing the structure.

### 4.2 File

A concrete subclass of `FileSystemNode` representing a file.

```java
class File extends FileSystemNode {
    private String content;

    public File(String name, String content) {
        super(name);
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public FileSystemNode clone() {
        return new File(this.name, this.content);
    }

    @Override
    public void print(String indent) {
        System.out.println(indent + "- " + name + " (File)");
    }
}
```

It stores file content and supports deep cloning of file state for snapshotting during commits.

### 4.3 Directory

A concrete subclass of `FileSystemNode` representing a directory.

```java
class Directory extends FileSystemNode {
    private Map<String, FileSystemNode> children = new HashMap<>();

    public Directory(String name) {
        super(name);
    }

    public void addChild(FileSystemNode node) {
        children.put(node.getName(), node);
    }

    public FileSystemNode getChild(String name) {
        return children.get(name);
    }

    public Map<String, FileSystemNode> getChildren() {
        return children;
    }

    @Override
    public FileSystemNode clone() {
        Directory newDir = new Directory(this.name);
        for (FileSystemNode child : this.children.values()) {
            newDir.addChild(child.clone()); // Recursively clone children
        }
        return newDir;
    }

    @Override
    public void print(String indent) {
        System.out.println(indent + "+ " + name + " (Directory)");
        for (FileSystemNode child : children.values()) {
            child.print(indent + "  ");
        }
    }
}
```

It can contain other `FileSystemNode` instances (files or subdirectories), supports recursive cloning, and enables hierarchical structure.

### 4.4 Commit

Represents a single commit in the version control system.

```java
class Commit {
    private final String id;
    private final String message;
    private final String author;
    private final LocalDateTime timestamp;
    private final Commit parent;
    private final Directory rootSnapshot;

    public Commit(String author, String message, Commit parent, Directory rootSnapshot) {
        this.id = UUID.randomUUID().toString().substring(0, 8); // Simple unique ID
        this.author = author;
        this.message = message;
        this.parent = parent;
        this.rootSnapshot = rootSnapshot;
        this.timestamp = LocalDateTime.now();
    }

    // Getters
    public String getId() { return id; }
    public String getMessage() { return message; }
    public String getAuthor() { return author; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public Commit getParent() { return parent; }
    public Directory getRootSnapshot() { return rootSnapshot; }
}
```

It captures a snapshot of the file system (`Directory`), the commit metadata (author, message, timestamp), and a reference to its parent commit, forming a chain of history.

### 4.5 CommitManager

Handles the creation and retrieval of commits.

```java
$ca
```

Maintains a map of all commit IDs and provides functionality to print the commit history starting from a specific commit.

### 4.6 Branch

Represents a branch in the version control system.

```java
class Branch {
    private String name;
    private Commit head;

    public Branch(String name, Commit head) {
        this.name = name;
        this.head = head;
    }

    public String getName() {
        return name;
    }

    public Commit getHead() {
        return head;
    }

    public void setHead(Commit head) {
        this.head = head;
    }
}
```

Each branch has a name and a reference to its latest commit (the head).

### 4.7 BranchManager

Manages all branches in the system.

```java
$ce
```

Supports creating new branches, switching between them, and updating the head commit of the current branch.

### 4.8 VersionControlSystem

The central singleton class that coordinates all components.

```java
$d3
```

It manages the working directory, delegates commit and branch operations, and supports key VCS operations like commit, revert, branch creation, checkout, and logging.

### 4.9 VersionControlSystemDemo

A demonstration class that simulates interactions with the version control system.

```java
$d9
```

It walks through scenarios such as making commits, branching, switching branches, and reverting to previous commits.

---

# 5. Run and Test

---

# 6. Quiz
