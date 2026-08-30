---
id: "lld-design-patterns-adapter-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Adapter Design Pattern"
slug: "lld-design-patterns-adapter-design-pattern"
summary: "It’s particularly useful in situations where:"
eli10: "Imagine Adapter Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Adapter Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Adapter Design Pattern"
  code: |
    interface PaymentProcessor {
        void processPayment(double amount, String currency);
        boolean isPaymentSuccessful();
        String getTransactionId();
    }
---



> 💡 **Key Insight:**

> **DEFINITION**
>
> The **Adapter Design Pattern** is a **structural design pattern** that allows incompatible interfaces to work together by **converting the interface of one class into another that the client expects**.

It’s particularly useful in situations where:

- You’re integrating with a **legacy system** or a **third-party library** that doesn’t match your current interface.
- You want to **reuse existing functionality** without modifying its source code.
- You need to **bridge the gap between new and old code**, or between systems built with different interface designs.

When faced with incompatible interfaces, developers often resort to rewriting large parts of code or embedding conditionals like `if (legacyType)` to handle special cases. But as more incompatible services or modules are introduced, this approach quickly becomes **messy, tightly coupled**, and violates the **Open/Closed Principle** making the system hard to scale or refactor.

The **Adapter Pattern** solves this by introducing a **wrapper class** that sits between your system and the incompatible component. It translates calls from your interface into calls the legacy or third-party system understands  **without changing either side**.

Let’s walk through a real-world example to see how we can apply the Adapter Pattern to seamlessly integrate incompatible components and create a more flexible and maintainable architecture.

---

# 1. The Problem: Incompatible Payment Interfaces

Imagine you are building the checkout component of an e-commerce application. Your checkout service is designed to work with a `PaymentProcessor` interface for handling payments.

### The Expected Interface

Here’s the contract your `CheckoutService` expects any payment provider to follow:

```java
interface PaymentProcessor {
    void processPayment(double amount, String currency);
    boolean isPaymentSuccessful();
    String getTransactionId();
}
```

This abstraction makes it easy to swap payment providers without changing any core business logic.

### Your In-House Implementation

Your team already has an internal payment processor that fits this interface perfectly:

```java
class InHousePaymentProcessor implements PaymentProcessor {
    private String transactionId;
    private boolean paymentSuccessful;

    @Override
    public void processPayment(double amount, String currency) {
        System.out.println("InHouseProcessor: Processing " + amount + " " + currency);
        transactionId = "TXN_" + System.currentTimeMillis();
        paymentSuccessful = true;
        System.out.println("InHouseProcessor: Success. Txn ID: " + transactionId);
    }

    @Override
    public boolean isPaymentSuccessful() {
        return paymentSuccessful;
    }

    @Override
    public String getTransactionId() {
        return transactionId;
    }
}
```

Your `CheckoutService` uses this interface and works beautifully with the in-house payment processor:

```java
class CheckoutService {
    private final PaymentProcessor paymentProcessor;

    public CheckoutService(PaymentProcessor paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }

    public void checkout(double amount, String currency) {
        System.out.println("Checkout: Processing order for $" + amount + " " + currency);
        paymentProcessor.processPayment(amount, currency);
        if (paymentProcessor.isPaymentSuccessful()) {
            System.out.println("Checkout: Order successful! Txn: "
                + paymentProcessor.getTransactionId());
        } else {
            System.out.println("Checkout: Order failed.");
        }
    }
}
```

Here’s how it gets called from your main e-commerce application:

```java
public class ECommerceAppV1 {
    public static void main(String[] args) {
        PaymentProcessor processor = new InHousePaymentProcessor();
        CheckoutService checkout = new CheckoutService(processor);
        checkout.checkout(199.99, "USD");
    }
}
```

Everything works smoothly. You’ve decoupled your checkout business logic from the underlying payment implementation, allowing future flexibility. Great job so far.

Now management drops a new requirement: integrate with a legacy third-party payment provider. Its SDK is battle-tested and reliable, but its interface looks nothing like yours.

### The Incompatible Legacy Gateway

Here’s what that legacy payment class looks like:

```java
class LegacyGateway {
    private long transactionReference;
    private boolean paymentSuccessful;

    public void executeTransaction(double totalAmount, String currency) {
        System.out.println("LegacyGateway: Executing " + currency + " " + totalAmount);
        transactionReference = System.nanoTime();
        paymentSuccessful = true;
        System.out.println("LegacyGateway: Done. Ref: " + transactionReference);
    }

    public boolean checkStatus(long ref) {
        System.out.println("LegacyGateway: Checking status for ref: " + ref);
        return paymentSuccessful;
    }

    public long getReferenceNumber() {
        return transactionReference;
    }
}
```

You now have two interfaces that do the same thing but speak different languages:

| Your Interface (PaymentProcessor) | Legacy Interface (LegacyGateway) | Mismatch |
|-------------------------------------|-----------------------------------|----------|
| `processPayment(double, String)` | `executeTransaction(double, String)` | Different method name |
| `isPaymentSuccessful()` | `checkStatus(long)` | Different name + requires a parameter |
| `getTransactionId()` returns `String` | `getReferenceNumber()` returns `long` | Different name + different return type |

And here is the constraint:

- You **cannot change** `CheckoutService`, it is used system-wide and depends on `PaymentProcessor`
- You **cannot modify** `LegacyGateway`, it is from an external vendor
- But you **must make them work together**

What you need is a translator, a class that sits between `CheckoutService` and `LegacyGateway`, adapting the incompatible interface into one that works with your system.

This is exactly what the **Adapter Design Pattern** does.

---

# 2. What is the Adapter Pattern

The Adapter pattern converts the interface of an existing class into a different interface that clients expect. It lets classes work together that otherwise could not because of incompatible interfaces.

Two characteristics define the pattern:

1. **Interface translation:** The adapter maps method calls from one interface to another, handling differences in method names, parameter types, return types, and calling conventions.
2. **No source modification:** Neither the client's expected interface nor the incompatible class is changed. The adapter wraps the incompatible class and presents the expected interface to the client.

> 💡 **Key Insight:**

> **Real-World Analogy**
>
> Imagine you're traveling from the **United States** to **Europe**. Your laptop charger uses a **Type A plug** (used in the US), but European wall sockets expect a **Type C plug**.
>
> You can’t plug your charger in directly, the interfaces don’t match.
>
> Instead of buying a new charger, you use a **travel plug adapter**. This device accepts your Type A plug and converts it into a Type C shape that fits into the European socket.
>
> The Adapter pattern does the same thing for software interfaces.

### Two Types of Adapters

There are two primary ways to implement an adapter, depending on the language and use case:

#### 1. Object Adapter (Preferred)

- Uses **composition**: the adapter holds a reference to the adaptee (the object it wraps).
- Allows flexibility and reuse across class hierarchies.
- This is the most common and recommended approach.

#### 2. Class Adapter

- Uses **inheritance**: the adapter inherits from both the target interface and the adaptee.
- Requires **multiple inheritance**, which languages like Java doesn’t support for classes.
- More suitable for languages like **C++**.

---

## Class Diagram

Adapter has four participants.

#### **Target Interface**

The interface that the client code depends on. Every method call from the client goes through this interface.

In our payment example, `PaymentProcessor` is the Target. The checkout service only knows about `processPayment()`, `isPaymentSuccessful()`, and `getTransactionId()`.

#### **Adaptee**

The existing class with a useful implementation but an incompatible interface.

In our example, `LegacyGateway` is the Adaptee. It can process payments, but its methods (`executeTransaction()`, `checkStatus()`, `getReferenceNumber()`) do not match what the checkout service expects.

#### **Adapter**

The translator. It implements the Target interface and holds a reference to the Adaptee, delegating calls with the necessary translation.

In our example, `LegacyGatewayAdapter` implements `PaymentProcessor` and wraps `LegacyGateway`, translating `processPayment()` into `executeTransaction()` and converting the `long` reference number into a `String` transaction ID.

#### **Client**

The code that uses the Target interface. It is completely unaware of the Adaptee or the Adapter's internal workings.

---

# 3. How It Works

Here is the Adapter workflow, step by step:

```mermaid
sequenceDiagram
    participant Client as Client
    participant Adapter as LegacyGateway<br/>Adapter
    participant Adaptee as LegacyGateway

    Client->>Adapter: processPayment(199.99, "USD")
    Note over Adapter: Translate method call
    Adapter->>Adaptee: executeTransaction(199.99, "USD")
    Adaptee-->>Adapter: done (stores ref internally)
    Adapter->>Adaptee: getReferenceNumber()
    Adaptee-->>Adapter: 1234567890 (long)

    Client->>Adapter: isPaymentSuccessful()
    Adapter->>Adaptee: checkStatus(1234567890)
    Adaptee-->>Adapter: true

    Client->>Adapter: getTransactionId()
    Note over Adapter: Convert long → String
    Adapter-->>Client: "LEGACY_TXN_1234567890"

    Note over Client,Adaptee: Client sees PaymentProcessor.<br/>Adaptee sees its own methods.<br/>Neither knows about the other.
```

#### **Step 1: Client calls the Target interface**

The client holds a reference typed as `Target` (e.g., `PaymentProcessor`). It calls a method like `processPayment(amount, currency)` without knowing what is behind the interface.

#### **Step 2: Adapter receives the call**

The adapter implements `Target`, so it receives the method call. It now needs to translate this into something the adaptee understands.

#### **Step 3: Adapter translates and delegates**

The adapter maps the Target method to the corresponding Adaptee method. This may involve renaming the method, reordering parameters, converting types, or combining multiple adaptee calls into one.

#### **Step 4: Adaptee executes**

The adaptee runs its own logic, unaware that it was called through an adapter. It returns results in its own format.

#### **Step 5: Adapter translates the result**

If the return types differ, the adapter converts the adaptee's result into the format the Target interface expects and returns it to the client.

---

# 4. Implementing Adapter

To integrate the legacy `LegacyGateway` class into our modern e-commerce system, we’ll create an **object adapter** called `LegacyGatewayAdapter`.

This adapter will **implement the **`PaymentProcessor`** interface**, which our `CheckoutService` already depends on.

Internally, it will **translate method calls** into the appropriate operations on the `LegacyGateway` effectively **bridging the gap** between incompatible APIs.

### The Adapter Implementation

```java
class LegacyGatewayAdapter implements PaymentProcessor {
    private final LegacyGateway legacyGateway;
    private long currentRef;

    public LegacyGatewayAdapter(LegacyGateway legacyGateway) {
        this.legacyGateway = legacyGateway;
    }

    @Override
    public void processPayment(double amount, String currency) {
        System.out.println("Adapter: Translating processPayment() for " + amount + " " + currency);
        legacyGateway.executeTransaction(amount, currency);
        currentRef = legacyGateway.getReferenceNumber(); // Store for later use
    }

    @Override
    public boolean isPaymentSuccessful() {
        return legacyGateway.checkStatus(currentRef);
    }

    @Override
    public String getTransactionId() {
        return "LEGACY_TXN_" + currentRef;
    }
}
```

### Client Code Remains Unchanged

The beauty of the Adapter Pattern is that your client code remains completely unaware of the legacy integration.

**The **`CheckoutService`** doesn’t care** whether it’s processing a modern or legacy payment, it always talks to `PaymentProcessor`.

Here’s how the updated client code looks:

```java
public class ECommerceAppV2 {
    public static void main(String[] args) {
        // Modern processor
        PaymentProcessor processor = new InHousePaymentProcessor();
        CheckoutService modernCheckout = new CheckoutService(processor);
        System.out.println("--- Using Modern Processor ---");
        modernCheckout.checkout(199.99, "USD");

        // Legacy gateway through adapter
        System.out.println("\n--- Using Legacy Gateway via Adapter ---");
        LegacyGateway legacy = new LegacyGateway();
        processor = new LegacyGatewayAdapter(legacy);
        CheckoutService legacyCheckout = new CheckoutService(processor);
        legacyCheckout.checkout(75.50, "USD");
    }
}
```

#### Expected Output:

```plaintext
--- Using Modern Processor ---
Checkout: Processing order for $199.99 USD
InHouseProcessor: Processing 199.99 USD
InHouseProcessor: Success. Txn ID: TXN_1734567890123
Checkout: Order successful! Txn: TXN_1734567890123

--- Using Legacy Gateway via Adapter ---
Checkout: Processing order for $75.5 USD
LegacyGateway: Executing USD 75.5
LegacyGateway: Done. Ref: 1734567890456789
Checkout: Order successful! Txn: LEGACY_TXN_1734567890456789
```

### What Makes This Adapter Work"

#### Composition Over Inheritance

The adapter wraps `LegacyGateway` instead of subclassing it. This keeps the adapter loosely coupled, easy to test, and flexible enough to adapt any class that provides similar functionality.

#### Method Translation

Each method in `PaymentProcessor` is translated into the equivalent call on the legacy API. This includes renaming methods (`processPayment` becomes `executeTransaction`), bridging parameter differences (`isPaymentSuccessful()` must supply the reference number to `checkStatus(long)`), and converting return types (`long` to `String`).

#### **Type conversion**

The legacy gateway returns a `long` reference number. The adapter converts it to a `String` transaction ID by prefixing it with `"LEGACY_TXN_"`. The client never sees the raw `long`.

#### Encapsulation

The adapter shields the rest of the codebase from the legacy API's quirks. If the vendor releases a new version with different method names, only the adapter changes.

---

# 5. Practical Example: Media Player Adapter

Lets say you are building a media player that natively plays MP3 files. The product team wants to add support for VLC (can play both MP4 and AVI) and MP4 formats. Rather than rewriting the player, you will use adapters to integrate external codec libraries.

```mermaid
classDiagram
    class MediaPlayer {
        <<interface>>
        +play(filename: String)
    }

    class Mp3Player {
        +play(filename: String)
    }

    class VlcCodec {
        +playVlc(filename: String)
    }

    class Mp4Codec {
        +playMp4(filename: String)
    }

    class VlcPlayerAdapter {
        -codec: VlcCodec
        +play(filename: String)
    }

    class Mp4PlayerAdapter {
        -codec: Mp4Codec
        +play(filename: String)
    }

    MediaPlayer <|.. Mp3Player
    MediaPlayer <|.. VlcPlayerAdapter
    MediaPlayer <|.. Mp4PlayerAdapter
    VlcPlayerAdapter --> VlcCodec : delegates to
    Mp4PlayerAdapter --> Mp4Codec : delegates to

    style MediaPlayer fill:#69db7c,stroke:#000,color:#000
    style Mp3Player fill:#00ceff,stroke:#000,color:#000
    style VlcCodec fill:#ffa94d,stroke:#000,color:#000
    style Mp4Codec fill:#ffa94d,stroke:#000,color:#000
    style VlcPlayerAdapter fill:#38d9a9,stroke:#000,color:#000
    style Mp4PlayerAdapter fill:#38d9a9,stroke:#000,color:#000
```

### Implementation

```java
$b1
```

The `AudioPlayer` works exclusively with the `MediaPlayer` interface. MP3 files play natively. MP4 and VLC files play through adapters that translate the `play()` call into the codec-specific method. Adding a new format (say, FLAC) means writing a new adapter, not modifying the `AudioPlayer`.
