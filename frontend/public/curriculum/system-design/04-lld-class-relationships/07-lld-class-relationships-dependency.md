---
id: "lld-class-relationships-dependency"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Class Relationships"
subSection: ""
title: "Dependency"
slug: "lld-class-relationships-dependency"
summary: "What happens when a class needs to use another class for a brief moment to get a job done, without needing to hold onto it forever\""
eli10: "Imagine Dependency as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Dependency Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Class Relationships","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Dependency"
  code: |
    class Document {
        private String content;
    
        public Document(String content) {
            this.content = content;
        }
    
        public String getContent() {
            return content;
        }
    }
    
    class Printer {
        public void print(Document document) {
            System.out.println("Printing: " + document.getContent());
        }
    }
    
    public class Main {
        public static void main(String[] args) {
            Document doc = new Document("Hello, World!");
            Printer printer = new Printer();
    
            printer.print(doc);
    
            // After print() returns, the printer has no reference to the document.
            // The document can be garbage collected independently of the printer.
        }
    }
---

What happens when a class needs to use another class for a brief moment to get a job done, without needing to hold onto it forever"

That’s **dependency**. It represents the weakest form of relationship between classes.

Unlike association, aggregation, or composition, a dependency isn’t a structural “we belong together” relationship. There’s no shared lifecycle and no long-term connection. 

Instead, it reflects a **one-time interaction**, often through method parameters, local variables, or return types.

---

# 1. What is Dependency"

A **Dependency** exists when **one class relies on another** to fulfill a responsibility, but does so **without retaining a permanent reference** to it.

This typically happens when:

- A class **accepts another class as a method parameter**.
- A class **instantiates or uses another class inside a method**.
- A class **returns an object of another class** from a method.

#### Key Characteristics of Dependency

- **Short-lived**: The relationship exists **only during method execution**.
- **No ownership**: The dependent class does **not store** the other as a field.
- **"Uses-a" relationship**: The class uses another to **accomplish a task**, but does not retain it.

> 💡 **Key Insight:**

> **Real-World Analogy**
>
> Imagine a **Chef** preparing a meal.
>
> - The chef picks up a **Knife** to chop vegetables.
> - Once the chopping is done, the knife is **put away or reused** elsewhere.
> - The chef doesn’t necessarily **own** the knife or keep it stored long-term.
>
> This represents a **dependency**. The chef depends on the knife only during the cooking process.

---

# 2. UML Representation

In UML class diagrams, dependency is represented by a **dashed arrow** (`..>`) pointing from the dependent class to the class it depends on. This is the lightest notation in UML, reflecting the fact that dependency is the lightest relationship.

```mermaid
classDiagram
    class Printer {
        +print(doc: Document)
    }

    class Document {
        -content: String
        +getContent(): String
    }

    Printer ..> Document : uses

    style Printer fill:#00ceff,stroke:#000,color:#000
    style Document fill:#69db7c,stroke:#000,color:#000
```

This diagram reads: "`Printer` depends on `Document`." The `Printer` uses a `Document` during its `print()` method, but doesn't store it as a field. The dashed arrow is the visual shorthand for this temporary relationship.

---

# 3. Code Example

Let's model a simple `Printer` that depends on a `Document` to print. The `Printer` receives the document as a method parameter, uses it, and doesn't store it.

```java
class Document {
    private String content;

    public Document(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}

class Printer {
    public void print(Document document) {
        System.out.println("Printing: " + document.getContent());
    }
}

public class Main {
    public static void main(String[] args) {
        Document doc = new Document("Hello, World!");
        Printer printer = new Printer();

        printer.print(doc);

        // After print() returns, the printer has no reference to the document.
        // The document can be garbage collected independently of the printer.
    }
}
```

Pay attention to what makes this a dependency and not an association:

- `Printer` has **no fields** referencing `Document`. The `Printer` class has zero instance variables pointing to `Document`. The document exists only as a parameter inside the `print()` method.
- The relationship is **scoped to one method call**. Once `print()` returns, the `Printer` object has no knowledge that a `Document` was ever involved.
- The `Document` is **created externally** and passed in. The `Printer` doesn't construct, own, or manage the document's lifecycle.

If the `Printer` stored a `Document` reference as a field (`private Document lastPrinted`), it would become an association. The structural link would persist beyond the method call.

The Printer/Document example is simple, but dependencies in real code take several different forms. Let's look at the most common ones so you can spot them in code reviews and interviews.

---

# 4. Recognizing Dependencies in Code

Dependencies can appear in several common forms within a class:

### **As Method Parameters**

This is the most common and most recognizable form of dependency. The dependent class receives another class as a parameter, uses it during the method, and lets it go.

```java
class ReportGenerator {
    public String generate(DataSource source) {
        List<String> data = source.fetchAll();
        // Format data into report...
        return formattedReport;
    }
}
```

`ReportGenerator` depends on `DataSource`, but doesn't store it. The `DataSource` comes in, gets used, and is gone once `generate()` returns.

### As Local Variables

Sometimes a class creates another class inside a method, uses it, and discards it. The created object never escapes the method scope.

```java
class OrderProcessor {
    public void process(Order order) {
        JsonFormatter formatter = new JsonFormatter();
        String json = formatter.format(order);
        // Send json to external API...
    }
}
```

`OrderProcessor` depends on `JsonFormatter`, but the formatter is a local variable. It's created inside the method and disappears when the method ends. No field, no structural link.

### As Return Types

A method can return an object of another class, creating a dependency on that type even if the class doesn't store it.

```java
class UserFactory {
    public User createUser(String name, String email) {
        return new User(name, email);
    }
}
```

`UserFactory` depends on `User` because it creates and returns `User` objects, but it doesn't store any `User` as a field. The factory's job is to produce users, not to hold onto them.

### As Static Method Calls

A class can depend on another class by calling its static methods. There's no object reference at all, just a class-level dependency.

```java
class PasswordService {
    public boolean verify(String input, String hash) {
        return HashUtils.sha256(input).equals(hash);
    }
}
```

`PasswordService` depends on `HashUtils`, but there's no instance of `HashUtils` stored anywhere. The dependency is purely at the class level through a static call.

---

# 5. Dependency Injection (DI)

In real-world applications, classes often depend on other classes to get their work done.

A **UserService** might rely on a **DatabaseClient** to fetch users, or a **NotificationService** might rely on an **EmailSender** to send messages.

But how should these dependencies be provided"

You could let the class **create** its own dependencies internally but that leads to **tight coupling**, making your code rigid and hard to test.

A better approach is to **inject** those dependencies from the outside.

This is called **Dependency Injection (DI),** one of the most powerful principles in modern software design.

**Dependency Injection** is a design technique where a class receives the objects it depends on, instead of creating them itself.

This leads to:

- **Better testability:** You can inject mock dependencies during unit tests.
- **Greater modularity:** Swap implementations (e.g., `EmailSender` → `SMSSender`) without changing core logic.
- **Loose coupling:** Classes only depend on abstract contracts (interfaces), not concrete implementations.

### Example

Consider a `NotificationService` that sends email notifications. A straightforward implementation might create its own `EmailSender` internally:

```mermaid
classDiagram
    direction LR

    class NotificationService {
        -sender: EmailSender
        +notifyUser(message)
    }

    class EmailSender["EmailSender"] {
        +send(message)
    }

    NotificationService *-- EmailSender : creates internally

    style NotificationService fill:#ff8787,stroke:#000,color:#000
    style EmailSender fill:#ff8787,stroke:#000,color:#000
```

```java
class NotificationService {
    private EmailSender sender;

    public NotificationService() {
        this.sender = new EmailSender(); // Creates its own dependency
    }

    public void notifyUser(String message) {
        sender.send(message);
    }
}
```

This looks reasonable, but it has several problems:

- **Can't switch implementations.** Want to send SMS instead of email" You have to modify the `NotificationService` class itself.
- **Can't test in isolation.** Unit tests will actually send real emails (or fail trying) because there's no way to substitute a mock.
- **Violates the Open/Closed Principle.** Adding a new notification channel requires changing existing code rather than extending it.

The `NotificationService` is tightly coupled to `EmailSender`. It controls what sender it uses, and nobody from the outside can change that.

### The Solution: Inject from Outside

Instead of letting the class create its own dependencies, you provide them from outside. This is Dependency Injection: a design technique where a class receives the objects it depends on rather than creating them itself.

```mermaid
classDiagram
    direction LR

    class NotificationService {
        -sender: Sender
        +notifyUser(message)
    }

    class Sender["«interface» Sender"] {
        +send(message)
    }

    class EmailSender {
        +send(message)
    }

    class SmsSender {
        +send(message)
    }

    NotificationService --> Sender : depends on
    EmailSender ..|> Sender : implements
    SmsSender ..|> Sender : implements

    style NotificationService fill:#69db7c,stroke:#000,color:#000
    style Sender fill:#00ceff,stroke:#000,color:#000
    style EmailSender fill:#ffa94d,stroke:#000,color:#000
    style SmsSender fill:#ffa94d,stroke:#000,color:#000
```

```java
interface Sender {
    void send(String message);
}

class EmailSender implements Sender {
    public void send(String message) {
        System.out.println("Email: " + message);
    }
}

class SmsSender implements Sender {
    public void send(String message) {
        System.out.println("SMS: " + message);
    }
}

class NotificationService {
    private final Sender sender;

    public NotificationService(Sender sender) {
        this.sender = sender; // Injected from outside
    }

    public void notifyUser(String message) {
        sender.send(message);
    }
}
```

Now the `NotificationService` depends on a `Sender` interface, not a concrete `EmailSender`. The specific implementation is provided from outside through the constructor.

This gives you three concrete benefits:

- **Swappable implementations.** Pass `EmailSender` in production, `SmsSender` for mobile users, or `PushSender` for in-app notifications. No code changes needed inside `NotificationService`.
- **Easy testing.** Pass a `MockSender` in unit tests that records messages instead of actually sending them. You can verify what was sent without side effects.
- **Loose coupling.** `NotificationService` depends only on the `Sender` interface. It doesn't know or care how messages are actually delivered.

In real-world applications, frameworks like Spring (Java), ASP.NET (C#), and NestJS (TypeScript) handle DI for you. They automatically resolve and inject dependencies based on configuration or annotations, so you don't have to wire everything manually. But the underlying concept is the same: classes declare what they need, and something external provides it.

---

# 6. Practical Example: Event Ticketing System

Let's put dependency into practice with a realistic scenario. A `TicketBookingService` handles the complete flow of booking an event ticket. During the `bookTicket()` method, it needs to validate that seats are available, process a payment, generate a QR code for the ticket, and send a confirmation email. Each of these responsibilities belongs to a separate class, and the booking service depends on all four of them, but only during the booking method.

```mermaid
classDiagram
    class TicketBookingService {
        +bookTicket(eventId, seatNumber, email, amount)
    }

    class SeatValidator {
        +isAvailable(eventId, seatNumber): boolean
    }

    class PaymentProcessor {
        +charge(email, amount): boolean
    }

    class QRCodeGenerator {
        +generate(eventId, seatNumber): String
    }

    class EmailService {
        +sendConfirmation(email, qrCode)
    }

    TicketBookingService ..> SeatValidator : uses
    TicketBookingService ..> PaymentProcessor : uses
    TicketBookingService ..> QRCodeGenerator : uses
    TicketBookingService ..> EmailService : uses

    style TicketBookingService fill:#00ceff,stroke:#000,color:#000
    style SeatValidator fill:#ffa94d,stroke:#000,color:#000
    style PaymentProcessor fill:#ffa94d,stroke:#000,color:#000
    style QRCodeGenerator fill:#ffa94d,stroke:#000,color:#000
    style EmailService fill:#ffa94d,stroke:#000,color:#000
```

All four dashed arrows point outward from `TicketBookingService`. None of these classes are stored as fields. They're all received as method parameters, used during booking, and released.

#### Implementation

```java
$93
```

#### Why This Design Works

- **All dependencies are method parameters.** `TicketBookingService` has zero fields. Every collaborator comes in through `bookTicket()` and disappears when the method returns. This is pure dependency with no structural coupling.
- **Each class has a single responsibility.** `SeatValidator` validates seats. `PaymentProcessor` handles payments. `QRCodeGenerator` generates codes. `EmailService` sends emails. The booking service just coordinates the flow.
- **Testing is straightforward.** You can pass mock implementations of any dependency without touching the booking service. Want to test what happens when payment fails" Pass a mock `PaymentProcessor` that returns `false`.
- **Swapping implementations is trivial.** Need to switch from email to SMS notifications" Pass an `SmsService` instead of `EmailService`. The booking service doesn't care, it just calls the method on whatever it receives.
