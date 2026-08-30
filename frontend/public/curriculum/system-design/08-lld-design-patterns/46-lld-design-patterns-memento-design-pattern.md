---
id: "lld-design-patterns-memento-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Memento Design Pattern"
slug: "lld-design-patterns-memento-design-pattern"
summary: "It’s particularly useful in situations where:"
eli10: "Imagine Memento Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Memento Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Memento Design Pattern"
  code: |
    class TextEditorNaive {
        private String content = "";
    
        public void type(String newText) {
            content += newText;
        }
    
        public void undo(String previousContent) {
            content = previousContent;
        }
    
        public String getContent() {
            return content;
        }
    }
---

> 💡 **Key Insight:**

> **DEFINITION**
>
> The **Memento Design Pattern** is a **behavioral design pattern** that lets you **capture and store an object’s internal state** so it can be **restored later**, without violating encapsulation.

It’s particularly useful in situations where:

- You need to implement **undo/redo** functionality.
- You want to support **checkpointing or versioning** of an object’s state.
- You want to separate the concerns of **state storage** from **state management logic**.

Let’s walk through a real-world example to see how we can apply the Memento Pattern to solve a problem that involves implementing undo functionality in a text editor.

---

# 1. The Problem: Implementing Undo in a Text Editor

Imagine you’re building a simple **text editor**. The editor supports basic operations like:

- `type(String text)` – appends text to the current document
- `getContent()` – returns the current document text
- `undo()` – reverts to the previous version of the content

Implementing typing and reading is easy. The real challenge is **undo**.

### The Naive Approach: Client Manages Snapshots

The most straightforward approach is to have the client manually capture the editor's state before each operation and feed it back during undo:

```mermaid
sequenceDiagram
    participant Client as Client
    participant Editor as TextEditor

    Client->>Editor: type("Hello")
    Client->>Editor: getContent()
    Editor-->>Client: "Hello"
    Note over Client: Stores "Hello" locally

    Client->>Editor: type(" World")
    Client->>Editor: getContent()
    Editor-->>Client: "Hello World"
    Note over Client: Stores "Hello World" locally

    Client->>Editor: undo("Hello")
    Note over Editor: content = "Hello"
```

The client is doing all the heavy lifting: fetching internal state, storing it, and feeding it back during undo.

```java
class TextEditorNaive {
    private String content = "";

    public void type(String newText) {
        content += newText;
    }

    public void undo(String previousContent) {
        content = previousContent;
    }

    public String getContent() {
        return content;
    }
}
```

Here is how the client uses it:

```java
public class TextEditorUndoV1 {
    public static void main(String[] args) {
        TextEditorNaive editor = new TextEditorNaive();

        editor.type("Hello");
        String snapshot1 = editor.getContent(); // manual snapshot

        editor.type(" World");
        String snapshot2 = editor.getContent();

        System.out.println("Current Content: " + editor.getContent()); // Hello World

        // Undo 1 step
        editor.undo(snapshot1);
        System.out.println("After Undo: " + editor.getContent()); // Hello
    }
}
```

### What’s Wrong with This Design"

While this naive implementation works for very basic undo logic, it introduces several **major issues**:

#### 1. Encapsulation is Broken

The client must call `getContent()` to fetch internal state and pass it directly to `undo()`. This means the client knows that the editor's state is a string called "content." 

If the editor later adds cursor position, selection range, or formatting metadata, the client must be updated to snapshot all of those too. The editor's internal structure has leaked into every class that implements undo.

#### 2. Client Bears the Responsibility

The client must remember to take a snapshot before every operation. Miss one, and you have a gap in your undo history. This is manual, error-prone, and scatters undo logic across the entire codebase instead of centralizing it.

#### 3. Not Scalable

What if the editor's state grows to include cursor position, selection range, font formatting, and scroll position" The client would need to capture all of those fields separately, store them in some custom structure, and feed them all back during undo. The snapshot logic balloons in complexity, and it is all in the wrong place, outside the editor instead of inside it.

#### 4. No Separation of Concerns

The same code that handles user interactions is also managing state snapshots. This violates the single responsibility principle and makes both the UI code and the undo logic harder to test, maintain, and extend.

### What We Really Need

We need a design that:

- Lets the **TextEditor** capture and restore its own state without exposing its internals
- Gives the **client** a way to manage state history without understanding what is inside each snapshot
- Scales cleanly when the editor's internal state grows more complex
- Separates undo management from editing logic

This is exactly what the **Memento pattern** provides.

---

# 2. What is the Memento Pattern

> The 
>
> **Memento Design Pattern**
>
>  allows an object to 
>
> **save and restore its state**
>
>  without exposing its internal structure. It achieves this by encapsulating the state in a special object called a 
>
> **Memento**
>
> .

Two characteristics define the Memento pattern:

1. **State capture without exposure.** The originator (the object whose state you want to save) creates a memento that contains a snapshot of its private internal state. The memento does not expose that state to the outside world. Only the originator can read it back. This preserves encapsulation while enabling state restoration.
2. **External state management.** A separate object called the caretaker stores and manages the mementos. The caretaker decides when to save (before a risky operation) and when to restore (undo). But it never inspects or modifies the memento's contents. It treats each memento as an opaque black box.

### Class Diagram

```mermaid
classDiagram
    class Originator {
        -state
        +save(): Memento
        +restore(m: Memento)
    }

    class Memento {
        -state
        +getState()
    }

    class Caretaker {
        -history: Stack~Memento~
        +save(originator)
        +undo(originator)
    }

    Originator ..> Memento : creates
    Caretaker --> Memento : stores
    Caretaker --> Originator : calls save/restore

    style Originator fill:#00ceff,stroke:#000,color:#000
    style Memento fill:#ffa94d,stroke:#000,color:#000
    style Caretaker fill:#38d9a9,stroke:#000,color:#000
```

Memento has three participants.

#### 1. Originator (e.g., `TextEditor`)

The object whose internal state you want to capture and restore.

The originator is the only participant that touches its own private fields. It packages them into a memento during save, and unpacks them during restore. No other object needs to know what those fields are or how they are structured.

#### 2. Memento (e.g., `TextEditorMemento`)

An immutable snapshot of the originator's state at a specific point in time. Store the originator's state in a way that prevents external modification

#### 3. Caretaker (e.g., `UndoManager`)

The external object that decides when to save and restore state. It manages the lifecycle of mementos. It never examines or modifies the content of a memento, it just treats it as a black box.

---

# 3. How It Works

Here is the Memento workflow step by step:

```mermaid
sequenceDiagram
    participant Client as Client
    participant Caretaker as UndoManager
    participant Originator as TextEditor
    participant Memento as Memento

    Client->>Caretaker: save(editor)
    Caretaker->>Originator: save()
    Originator->>Memento: new Memento(state)
    Originator-->>Caretaker: memento
    Note over Caretaker: Push onto history stack

    Client->>Originator: type(" World")
    Note over Originator: state changes

    Client->>Caretaker: undo(editor)
    Note over Caretaker: Pop from history stack
    Caretaker->>Originator: restore(memento)
    Originator->>Memento: getState()
    Note over Originator: State restored
```

#### **Step 1: Caretaker requests a save**

Before the user performs an operation (like typing, deleting, or formatting), the caretaker asks the originator to save its current state.

#### **Step 2: Originator creates a memento**

The originator reads its own private fields, packages them into a new memento object, and returns it to the caretaker.

#### **Step 3: Caretaker stores the memento**

The caretaker pushes the memento onto a history stack (or list). It does not open the memento or read its contents.

#### **Step 4: User performs operations**

The originator's state changes through normal operations (typing text, moving shapes, etc.).

#### **Step 5: User triggers undo**

The caretaker pops the most recent memento from the history stack and passes it to the originator.

#### **Step 6: Originator restores from the memento**

The originator reads the state from the memento and overwrites its current fields. The object is now back to exactly how it was when the memento was created.

---

# 4. Implementing Memento Pattern

Let’s refactor our naive text editor into a clean, maintainable design using the **Memento Pattern**. We will create the memento, then the originator, then the caretaker, and finally wire them together in client code.

```mermaid
classDiagram
    class TextEditor {
        -content: String
        +type(text: String)
        +getContent(): String
        +save(): TextEditorMemento
        +restore(m: TextEditorMemento)
    }

    class TextEditorMemento {
        -state: String
        +getState(): String
    }

    class TextEditorUndoManager {
        -history: Stack~TextEditorMemento~
        +save(editor: TextEditor)
        +undo(editor: TextEditor)
    }

    TextEditor ..> TextEditorMemento : creates
    TextEditorUndoManager --> TextEditorMemento : stores
    TextEditorUndoManager --> TextEditor : calls save/restore

    style TextEditor fill:#00ceff,stroke:#000,color:#000
    style TextEditorMemento fill:#ffa94d,stroke:#000,color:#000
    style TextEditorUndoManager fill:#38d9a9,stroke:#000,color:#000
```

### Step 1: Create the Memento - TextEditorMemento

The memento stores a snapshot of the `TextEditor`'s internal state. It has three important properties:

- **Immutable** — fields are `private final` (or readonly) and cannot be changed after creation
- **Minimal** — it stores only what is needed for restoration
- **Encapsulated** — only the originator should read its contents

```java
class TextEditorMemento {
    private final String state;

    public TextEditorMemento(String state) {
        this.state = state;
    }

    public String getState() {
        return state;
    }
}
```

This class is passive. It does not contain any logic, just a frozen snapshot of the editor's state at the moment it was created.

### Step 2: Create the Originator – `TextEditor`

The originator is the object whose state we want to save and restore. It provides two key methods beyond its normal operations:

- `save()` — creates a memento capturing the current state
- `restore(memento)` — replaces the current state with the state from the memento

```java
class TextEditor {
    private String content = "";

    public void type(String newText) {
        content += newText;
        System.out.println("Typed: \"" + newText + "\"");
    }

    public String getContent() {
        return content;
    }

    public TextEditorMemento save() {
        System.out.println("Saving state: \"" + content + "\"");
        return new TextEditorMemento(content);
    }

    public void restore(TextEditorMemento memento) {
        content = memento.getState();
        System.out.println("Restored state to: \"" + content + "\"");
    }
}
```

Notice that the `save()` and `restore()` methods are the only ones that interact with the memento. The rest of the editor (typing, getting content) works exactly as before. The memento pattern adds state capture without changing how the object normally operates.

### Step 3: Create the Caretaker – TextEditorUndoManager

The caretaker manages the history of mementos. It is responsible for:

- Asking the originator to save its state at the right times
- Storing mementos in a stack (last-in, first-out for undo)
- Passing mementos back to the originator for restoration
- Never inspecting or modifying memento contents

```java
class TextEditorUndoManager {
    private final Stack<TextEditorMemento> history = new Stack<>();

    public void save(TextEditor editor) {
        history.push(editor.save());
    }

    public void undo(TextEditor editor) {
        if (!history.isEmpty()) {
            editor.restore(history.pop());
        } else {
            System.out.println("Nothing to undo.");
        }
    }

    public int historySize() {
        return history.size();
    }
}
```

The `TextEditorUndoManager` allows undo operations without the client managing snapshots directly. Notice that `save()` and `undo()` take a `TextEditor` reference but never call `getContent()` or any other method that exposes internal state. They only call `save()` and `restore()`, which return and accept opaque mementos.

### Step 4: Using the Memento from the Client

Now let's put it all together. The client creates an editor and an undo manager, performs operations, saves state at appropriate moments, and undoes when needed.

```java
public class TextEditorDemo {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        TextEditorUndoManager undoManager = new TextEditorUndoManager();

        editor.type("Hello");
        undoManager.save(editor);

        editor.type(" World");
        undoManager.save(editor);

        editor.type("!");
        System.out.println("Current: " + editor.getContent());

        System.out.println("\n--- Undo 1 ---");
        undoManager.undo(editor);
        System.out.println("Content: " + editor.getContent());

        System.out.println("\n--- Undo 2 ---");
        undoManager.undo(editor);
        System.out.println("Content: " + editor.getContent());

        System.out.println("\n--- Undo 3 ---");
        undoManager.undo(editor);
    }
}
```

#### Expected Output:

```shell
Typed: "Hello"
Saving state: "Hello"
Typed: " World"
Saving state: "Hello World"
Typed: "!"
Current: Hello World!

--- Undo 1 ---
Restored state to: "Hello World"
Content: Hello World

--- Undo 2 ---
Restored state to: "Hello"
Content: Hello

--- Undo 3 ---
Nothing to undo.
```

### What We Achieved

- **Encapsulation: **Editor’s internal state is never exposed directly to the client
- **Clean undo logic: **The client doesn’t need to manage or interpret state — it just saves and restores
- **Separation of concerns: **The `TextEditor` handles state, and the `TextEditorUndoManager` handles history
- **Scalability: **Easy to extend with redo support, multi-level undo, or persistent versioning

---

# 5. Evolving the System: Adding Cursor Position

What happens when the product manager says "We need to restore cursor position too, not just content"" With the naive approach, this would be a nightmare. The client would need to capture two fields instead of one, store them in some tuple or object, and know about both when undoing.

With Memento, the change is entirely inside the originator.

```java
$a3
```

The undo manager did not change at all. Neither did the client code. The only files that changed were the memento and the editor. This is the Open/Closed Principle at work. You extended the system's capability (restoring cursor position) by modifying only the originator and its memento, without touching any external code.

If you later add selection range, scroll position, or font formatting, the same principle applies. The memento and editor grow, but the undo manager and client remain untouched.
