---
id: "lld-solid-principles-liskov-substitution-principle-lsp"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - SOLID Principles"
subSection: ""
title: "Liskov Substitution Principle (LSP)"
slug: "lld-solid-principles-liskov-substitution-principle-lsp"
summary: "Have you ever passed a subclass into a method expecting the parent class… and watched your program crash or behave in unexpected ways\""
eli10: "Imagine Liskov Substitution Principle (LSP) as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Liskov Substitution Principle (LSP) Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","SOLID Principles","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Liskov Substitution Principle (LSP)"
  code: |
    class Document {
        protected String data;
    
        public Document(String data) {
            this.data = data;
        }
    
        public void open() {
            System.out.println("Document opened. Data: " + data.substring(0, Math.min(data.length(), 20)) + "...");
        }
    
        public void save(String newData) {
            this.data = newData;
            System.out.println("Document saved.");
        }
    
        public String getData() {
            return data;
        }
    }
---

Have you ever passed a subclass into a method expecting the parent class… and watched your program crash or behave in unexpected ways"

Or extended a class… only to find yourself overriding methods just to throw exceptions"

If yes, you’ve probably run into a violation of one of the most misunderstood object-oriented design principles: **The Liskov Substitution Principle (LSP).**

Let’s understand it with a real-world example and why it breaks LSP.

---

# 1. The Problem: A Document System Gone Wrong

Imagine you are building a system to manage different types of documents. You start with a simple base class.

```java
class Document {
    protected String data;

    public Document(String data) {
        this.data = data;
    }

    public void open() {
        System.out.println("Document opened. Data: " + data.substring(0, Math.min(data.length(), 20)) + "...");
    }

    public void save(String newData) {
        this.data = newData;
        System.out.println("Document saved.");
    }

    public String getData() {
        return data;
    }
}
```

Now, a new requirement comes in: "We need a read-only document type for sensitive content like government reports or signed contracts."

You think: a `ReadOnlyDocument` is still a kind of `Document`, so inheritance makes sense. You extend the `Document` class and override `save()` to block writes.

```java
class ReadOnlyDocument extends Document {
    public ReadOnlyDocument(String data) {
        super(data);
    }

    @Override
    public void save(String newData) {
        throw new UnsupportedOperationException("Cannot save a read-only document!");
    }
}
```

Seems reasonable, right"

**But Then Reality Hits…**

Let's see how this plays out in client code. A `DocumentProcessor` class takes any `Document` and tries to process and save it.

```java
$9e
```

**Output:**

```plaintext
--- Processing Regular Document ---
Document opened. Data: Initial project proposal content.
Document saved.
Document processing complete.

--- Processing ReadOnly Document ---
Document opened. Data: Top secret government data.
Error: Cannot save a read-only document!
```

The client code expected *any* `Document` to be savable. But when it received a `ReadOnlyDocument`, that assumption exploded into a runtime exception.

#### **What Went Wrong"**

At the heart of this failure is a violation of a fundamental design principle: the Liskov Substitution Principle. Our subtype (`ReadOnlyDocument`) cannot be seamlessly substituted for its base type (`Document`) without altering the desired behavior of the program.

If you ever find yourself overriding a method just to throw an exception, or adding subtype-specific conditions in client code, you are likely violating LSP.

```mermaid
classDiagram
    class Document {
        #data: String
        +open()
        +save(newData)
        +getData()
    }
    class ReadOnlyDocument {
        +save(newData) throws Exception
    }

    Document <|-- ReadOnlyDocument

    style Document fill:#ffa94d,stroke:#000,color:#000
    style ReadOnlyDocument fill:#ff8787,stroke:#000,color:#000
```

`ReadOnlyDocument` inherits `save()` from `Document` but throws an exception instead of saving, breaking the contract that any `Document` should be saveable.

---

# 2. Introducing the Liskov Substitution Principle (LSP)

> **"If S is a subtype of T, then objects of type T may be replaced with objects of type S without altering any of the desirable properties of that program (correctness, task performed, etc.)."**
>
>  — 
>
> *Barbara Liskov, 1987*

In simpler terms: if a class `S` extends or implements class `T`, then you should be able to use `S` anywhere `T` is expected, without breaking the program's behavior or logic.

Subtypes must honor the expectations set by their base types. The client code should not need to know or care which specific subtype it is dealing with. Everything should "just work."

### Why Does LSP Matter"

#### **1. Reliability and Predictability**

When LSP is followed, your code behaves consistently. You can substitute any subtype and still get the behavior your client code expects. No unpleasant surprises.

#### **2. Reduced Bugs**

LSP violations often lead to conditional logic (e.g., `if (obj instanceof ReadOnlyDocument)`) in client code to handle subtypes differently. This is a code smell. It is a sign that your design is leaking abstraction. When client code has to "know" the subtype to behave correctly, you have broken polymorphism.

#### **3. Maintainability and Extensibility**

Well-behaved hierarchies are easier to understand, maintain, and extend. You can add new subtypes without fear of breaking existing code that relies on the base type's contract.

#### **4. True Polymorphism**

LSP is what makes polymorphism truly powerful. You can write generic algorithms that operate on a base type, confident that they will work correctly with any current or future subtype.

#### **5. Testability**

Tests written for the base class's interface should, in theory, pass for all its subtypes if LSP is respected. This means you can reuse test suites and trust that your inheritance hierarchies are well-formed.

Essentially, LSP helps you build systems that are easier to extend, less prone to bugs, and far more resilient to change.

---

# 3. Implementing LSP

Let’s refactor our design so that subtypes like `ReadOnlyDocument` can be used **without violating the expectations** set by the base type.

The root problem was that the base class `Document` **assumed all documents are editable**, but not all documents should be. To fix this, we need to:

1. Separate **editable** behavior from **read-only** behavior
2. Use **interfaces or abstract types** to model capabilities explicitly

### Step 1: Define Behavior Interfaces

Instead of having one base class with assumptions about mutability, let’s break responsibilities apart:

```java
interface Document {
    void open();
    String getData();
}

interface Editable extends Document {
    void save(String newData);
}
```

The `Document` interface represents read-only access: the ability to open and view data. `Editable` extends `Document`, adding the ability to save. Anything `Editable` is automatically a `Document` too, but not every `Document` is `Editable`. This clearly defines what each object can do, and prevents clients from assuming editability unless explicitly promised.

### Step 2: Implement `EditableDocument` and `ReadOnlyDocument`

Now we implement our two concrete types. The `EditableDocument` implements `Editable` (which already includes everything from `Document`), while the `ReadOnlyDocument` implements only `Document`.

#### **EditableDocument**

```java
class EditableDocument implements Editable {
    private String data;

    public EditableDocument(String data) {
        this.data = data;
    }

    @Override
    public void open() {
        System.out.println("Editable Document opened. Data: " + preview());
    }

    @Override
    public void save(String newData) {
        this.data = newData;
        System.out.println("Document saved.");
    }

    @Override
    public String getData() {
        return data;
    }

    private String preview() {
        return data.substring(0, Math.min(data.length(), 20)) + "...";
    }
}
```

#### **ReadOnlyDocument**

```java
class ReadOnlyDocument implements Document {
    private final String data;

    public ReadOnlyDocument(String data) {
        this.data = data;
    }

    @Override
    public void open() {
        System.out.println("Read-Only Document opened. Data: " + preview());
    }

    @Override
    public String getData() {
        return data;
    }

    private String preview() {
        return data.substring(0, Math.min(data.length(), 20)) + "...";
    }
}
```

Now both types are valid `Document` objects. `EditableDocument` implements `Editable` (which includes `Document`), while `ReadOnlyDocument` implements only `Document`. There is no risk of calling `save()` on a read-only document, because it simply is not part of its contract.

```mermaid
classDiagram
    class Document {
        <<interface>>
        +open()
        +getData()
    }
    class Editable {
        <<interface>>
        +open()
        +getData()
        +save(newData)
    }
    class EditableDocument {
        -data: String
        +open()
        +save(newData)
        +getData()
    }
    class ReadOnlyDocument {
        -data: String
        +open()
        +getData()
    }

    Document <|-- Editable
    Editable <|.. EditableDocument
    Document <|.. ReadOnlyDocument

    style Document fill:#00ceff,stroke:#000,color:#000
    style Editable fill:#ffa94d,stroke:#000,color:#000
    style EditableDocument fill:#69db7c,stroke:#000,color:#000
    style ReadOnlyDocument fill:#69db7c,stroke:#000,color:#000
```

Now the design is clean. `Editable` extends `Document`, so `EditableDocument` gets both reading and writing through a single interface. `ReadOnlyDocument` implements only `Document`. A `ReadOnlyDocument` never promises `save()` functionality, so it can never break that contract.

### Step 3: Refactor the Client Code

Now let's update `DocumentProcessor` to work with these new interfaces. Since `Editable` extends `Document`, the `processAndSave` method simply accepts an `Editable` parameter. 

The processor has two methods: `process()` accepts any `Document` for reading, and `processAndSave()` accepts an `Editable`, which guarantees both reading and writing capabilities. If you try to pass a `ReadOnlyDocument` to `processAndSave()`, the compiler rejects it before the program ever runs.

```java
class DocumentProcessor {
    public void process(Document doc) {
        doc.open();
        System.out.println("Document processed.");
    }

    public void processAndSave(Editable doc, String additionalInfo) {
        doc.open();
        String currentData = doc.getData();
        String newData = currentData + " | Processed: " + additionalInfo;
        doc.save(newData);
        System.out.println("Editable document processed and saved.");
    }
}
```

Notice there is no `instanceof` check or runtime type verification anywhere. Because `Editable` extends `Document`, the `processAndSave` method accepts an `Editable` and gets access to both `open()`/`getData()` and `save()` through a single parameter. 

The type system itself prevents you from passing a `ReadOnlyDocument` to `processAndSave()`. If you try, the compiler rejects it. This is the real power of the LSP-compliant design: correctness is enforced at compile time, not discovered at runtime through exceptions.

Here is a usage example showing the refactored code in action.

```java
class Main {
    public static void main(String[] args) {
        EditableDocument editable = new EditableDocument("Draft proposal for Q3.");
        ReadOnlyDocument readOnly = new ReadOnlyDocument("Top secret strategy.");

        DocumentProcessor processor = new DocumentProcessor();

        System.out.println("--- Processing Editable Document ---");
        processor.processAndSave(editable, "Reviewed by Alice");

        System.out.println("\n--- Processing Read-Only Document ---");
        processor.process(readOnly); // Works fine

        // processor.processAndSave(readOnly, "Reviewed by Bob");
        // Won't compile! ReadOnlyDocument doesn't implement Editable.
    }
}
```

---

# 4. Common Pitfalls While Applying LSP

Understanding the Liskov Substitution Principle is one thing. Applying it correctly in the real world is where the challenges begin. Here are some of the most common traps to watch out for.

#### 1. The “Is-A” Linguistic Trap

Just because something *sounds* like it "is a" something else in natural language does not mean it is a valid subtype in code.

Take this classic example:

> 💡 **Key Insight:**

> **WARNING**
>
> A **penguin** *is a* **bird**, but penguins can’t fly.If your `Bird` class has a `fly()` method, and you override it in `Penguin` to throw an exception or do nothing—you've violated LSP.

The key insight: subtyping must be based on behavior, not just taxonomy. A penguin might be a bird in biology, but if your `Bird` interface promises flight, then `Penguin` is not a valid subtype.

#### 2. Overriding Methods to Do Nothing or Throw Exceptions

If you find yourself writing code like this:

```java
@Override
public void save(String data) {
    throw new UnsupportedOperationException("Not supported.");
}
```

That is a clear warning sign. If a subclass cannot meaningfully implement a method defined in the base class, it is likely not a valid subtype. This leads to brittle code and runtime surprises, which is exactly what LSP aims to prevent.

#### 3. Violating Preconditions or Postconditions

Changing the assumptions of a method is a subtle but dangerous LSP violation.

- **Precondition violation**: The subtype requires more than the base class contract promised. For example, a base class method accepts any positive number, but the subtype requires the number to be greater than 100.
- **Postcondition violation**: The subtype delivers less than the base class guaranteed. For example, a base class method guarantees a non-null return value, but the subtype sometimes returns null.

These break the trust that clients place in the base class's behavior.

#### 4. Type Checks in Client Code

Code like this is often a symptom of broken design:

```java
if (document instanceof ReadOnlyDocument) {
    // Special-case logic
}
```

Whenever client code has to know the exact subtype to behave correctly, you have violated the principle of substitution. Polymorphism should make the client code unaware of specific subtypes. If you are relying on `instanceof`, it is time to revisit your abstraction.

#### 5. Restricting or Relaxing Behavior Unexpectedly

Subclasses should not arbitrarily tighten or loosen the behavior defined by the base class. For example, making a mutable property in the base class immutable in the subclass (or vice versa) can lead to subtle bugs. Changing validation logic in ways that break existing assumptions in client code is another LSP violation.

Consistency is key. If the base type makes a promise, every subtype must keep it.

---

# 5. Common Questions About LSP

> ❓ **Interview Q&A:**

> #### "Isn’t LSP just about “good inheritance”""

**Yes, but it’s more precise.**LSP defines what *correct* behavioral inheritance actually looks like. It’s not just about **reusing code**, it’s about preserving **correctness and intention**.

Think of LSP as a **safety net for polymorphism**. It ensures your abstractions can scale and evolve cleanly.

> ❓ **Interview Q&A:**

> #### "What if my subclass really can’t do what the base class does""

This is **exactly when you should stop and rethink your hierarchy**.

Some options:

- **Maybe it shouldn’t be a subtype at all**: A `ReadOnlyDocument` that can't be saved probably shouldn't inherit from a `Document` class that supports saving.
- **Split responsibilities**: Use interfaces like `Readable`, `Editable`, etc., to model capabilities explicitly.
- **Favor composition over inheritance**: Instead of trying to "be" something, let your object **have** a capability.

> ❓ **Interview Q&A:**

> #### "Does this mean I can never use `instanceof` or casting""

Not never, but be cautious.

There are **legitimate, narrow use cases**: implementing `equals()`, serialization, certain framework hooks.

But if you’re using `instanceof` to drive **business logic** or alter behavior, you’re likely covering up an LSP violation.

**Ask yourself:**

> “Am I using this because I broke polymorphism"”

If yes, revisit your design.


