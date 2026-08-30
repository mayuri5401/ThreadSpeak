---
id: "lld-oop-fundamentals-interfaces"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - OOP Fundamentals"
subSection: ""
title: "Interfaces"
slug: "lld-oop-fundamentals-interfaces"
summary: "In object-oriented design, interfaces play a foundational role in building systems that are extensible, testable, and loosely coupled."
eli10: "Imagine Interfaces as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Interfaces Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","OOP Fundamentals","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Interfaces"
  code: |
    public interface PaymentGateway {
        void initiatePayment(double amount);
    }
---

In object-oriented design, **interfaces** play a foundational role in building systems that are **extensible**, **testable**, and **loosely coupled**.

They define **what** a component should do, not **how** it should do it.

This separation of definition and implementation allows different parts of your system to work together through **well-defined contracts**, without needing to know each other’s internal details.

---

# 1. What is an Interface"

At its core, an **interface** is a **contract:** a list of methods that any implementing class *must* provide. It specifies a set of behaviors that a class agrees to implement but leaves the *details* of those behaviors up to each implementation.

In other words:

> **An interface defines the "what", while classes provide the "how".**

> 💡 **Key Insight:**

> **Real-World Analogy**
>
> Consider a remote control. It exposes a standard set of buttons:
>
> - `play()`
> - `pause()`
> - `volumeUp()`
> - `powerOff()`
>
> The person using the remote doesn’t care if it controls a TV, a soundbar, or a projector, they all understand the same set of commands.
>
> 
> ```mermaid
> classDiagram
>      class RemoteControl {
>          <<interface>>
>          +play()
>          +pause()
>          +volumeUp()
>          +powerOff()
>      }
>
>      class TV {
>          +play()
>          +pause()
>          +volumeUp()
>          +powerOff()
>      }
>
>      class SoundBar {
>          +play()
>          +pause()
>          +volumeUp()
>          +powerOff()
>      }
>
>      class Projector {
>          +play()
>          +pause()
>          +volumeUp()
>          +powerOff()
>      }
>
>      RemoteControl <|.. TV
>      RemoteControl <|.. SoundBar
>      RemoteControl <|.. Projector
>
>      style RemoteControl fill:#00ceff,stroke:#000,color:#000
>      style TV fill:#69db7c,stroke:#000,color:#000
>      style SoundBar fill:#69db7c,stroke:#000,color:#000
>      style Projector fill:#69db7c,stroke:#000,color:#000
> ```
> 

>
> The **remote** is the **interface**. The **devices** (TV, soundbar, projector) are the **implementations**.
>
> Each device behaves differently when you press `play()`, but the *contract* remains consistent.

---

# 2. Key Properties of Interfaces

Interfaces are more than just method declarations, they are the **foundation of flexible software design**.

Here are their most important characteristics:

#### a) Defines Behavior Without Dictating Implementation

An interface only declares *what* operations are expected. It doesn’t define *how* they are carried out.

This gives freedom to implementers to provide their own version of the logic, while still honoring the same contract.

#### b) Enables Polymorphism

Different classes can implement the same interface in different ways. This allows your code to work with multiple implementations **interchangeably**.

#### c) Promotes Decoupling

Code that depends on interfaces is insulated from changes in the concrete classes that implement them.

This makes your code easier to:

- Extend (add new implementations without modifying existing ones),
- Test (mock interfaces in unit tests),
- Maintain (fewer ripple effects from code changes).

#### Example:

```mermaid
flowchart LR
    A[CheckoutService]:::orange --> |depends on| B[PaymentGateway<br/>Interface]:::green
    B --> C[StripePayment]:::primary
    B --> D[RazorpayPayment]:::primary
    B --> E[PayPalPayment]:::primary

    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
```

As long as all payment providers implement the `PaymentGateway` interface, the `CheckoutService` can use any of them without changing its own code.

---

# 3. Code Example: Payment Gateway Interface

Let’s say you’re designing a payment processing module that supports multiple providers like **Stripe**, **Razorpay**, and **PayPal**.

You don’t want your business logic to depend on a specific provider. You just want a common way to initiate a payment.

### Defining an Interface

Here's the `PaymentGateway` interface that defines a single operation: initiate a payment with a given amount.

```java
public interface PaymentGateway {
    void initiatePayment(double amount);
}
```

This interface defines the **contract**. Every payment gateway must provide a `initiatePayment()` method. But it doesn’t specify how each provider processes payments.

### Implementing an Interface

Now let's create two classes that fulfill this contract: one for Stripe and one for Razorpay. Each processes payments differently, but both satisfy the `PaymentGateway` interface.

```mermaid
classDiagram
    class PaymentGateway {
        <<interface>>
        +initiatePayment(amount: double)
    }

    class StripePayment {
        +initiatePayment(amount: double)
    }

    class RazorpayPayment {
        +initiatePayment(amount: double)
    }

    class CheckoutService {
        -paymentGateway: PaymentGateway
        +CheckoutService(gateway: PaymentGateway)
        +checkout(amount: double)
    }

    PaymentGateway <|.. StripePayment
    PaymentGateway <|.. RazorpayPayment
    CheckoutService --> PaymentGateway : uses

    style PaymentGateway fill:#38d9a9,stroke:#000,color:#000
    style StripePayment fill:#69db7c,stroke:#000,color:#000
    style RazorpayPayment fill:#69db7c,stroke:#000,color:#000
    style CheckoutService fill:#00ceff,stroke:#000,color:#000
```

```java
public class StripePayment implements PaymentGateway {
    public void initiatePayment(double amount) {
        System.out.println("Processing payment via Stripe: $" + amount);
    }
}

public class RazorpayPayment implements PaymentGateway {
    public void initiatePayment(double amount) {
        System.out.println("Processing payment via Razorpay: ₹" + amount);
    }
}
```

Both classes implement the same interface, but their internal logic is completely different. `StripePayment` talks to the Stripe API, `RazorpayPayment` talks to Razorpay. The interface guarantees that both provide the `initiatePayment()` method, so any code that depends on `PaymentGateway` can work with either one.

### Programming to the Interface

Here's where the real payoff happens. Instead of having `CheckoutService` depend on `StripePayment` or `RazorpayPayment`, it depends on the `PaymentGateway` interface. It doesn't know or care which implementation it's using.

```java
public class CheckoutService {
    private PaymentGateway paymentGateway;

    public CheckoutService(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public void setPaymentGateway(PaymentGateway paymentGateway) {
        this.paymentGateway = paymentGateway;
    }

    public void checkout(double amount) {
        paymentGateway.initiatePayment(amount);
    }
}
```

Look at the `CheckoutService` constructor. It takes a `PaymentGateway`, not a `StripePayment`. This single decision is what decouples the service from any specific provider. 

The `checkout()` method calls `initiatePayment()` on whatever gateway was injected. It could be Stripe, Razorpay, a mock for testing, or a provider that doesn't even exist yet.

This pattern is called **dependency injection**: instead of creating its own dependencies, the class receives them from the outside. And it only works because the dependency is typed as an interface, not a concrete class.

### Runtime Flexibility

The final piece is wiring everything together. At runtime, you choose which implementation to inject, and you can even swap it out on the fly.

```java
public class Main {
    public static void main(String[] args) {
        PaymentGateway stripeGateway = new StripePayment();
        CheckoutService service = new CheckoutService(stripeGateway);
        service.checkout(120.50);  // Output: Processing payment via Stripe: $120.5

       // Switch to Razorpay
        PaymentGateway razorpayGateway = new RazorpayPayment();
        service.setPaymentGateway(razorpayGateway);
        service.checkout(150.50);  // Output: Processing payment via Razorpay: ₹150.5        
    }
}
```

#### **Output:**

```plaintext
Processing payment via Stripe: $120.5
Processing payment via Razorpay: ₹150.5
```

The `CheckoutService` didn't change between the two calls. The only thing that changed was which implementation was plugged in. That's the power of programming to interfaces: the calling code is completely insulated from implementation details.

---

# 4. Practical Example: Notification Service

Let's apply interfaces to a different domain. Imagine you're building an alerting system for a DevOps platform. When something goes wrong (server down, high CPU, disk full), the system needs to send notifications. Some teams prefer email, others use Slack, and some have custom webhook integrations. 

The alerting service shouldn't know or care which channel is being used. It just sends the notification through whatever channel was configured.

Here's the class diagram for this design:

```mermaid
classDiagram
    class NotificationService {
        <<interface>>
        +send(recipient: String, message: String)
    }

    class EmailNotifier {
        +send(recipient: String, message: String)
    }

    class SlackNotifier {
        +send(recipient: String, message: String)
    }

    class WebhookNotifier {
        +send(recipient: String, message: String)
    }

    class AlertService {
        -notifier: NotificationService
        +AlertService(notifier: NotificationService)
        +triggerAlert(recipient: String, issue: String)
    }

    NotificationService <|.. EmailNotifier
    NotificationService <|.. SlackNotifier
    NotificationService <|.. WebhookNotifier
    AlertService --> NotificationService : uses

    style NotificationService fill:#38d9a9,stroke:#000,color:#000
    style EmailNotifier fill:#69db7c,stroke:#000,color:#000
    style SlackNotifier fill:#69db7c,stroke:#000,color:#000
    style WebhookNotifier fill:#69db7c,stroke:#000,color:#000
    style AlertService fill:#00ceff,stroke:#000,color:#000
```

The pattern is identical to the payment gateway example: one interface, multiple implementations, and a service that depends only on the interface. Let's see the full working code.

```java
$7e
```

#### Why This Design Works

- **Adding a new channel is trivial.** Need PagerDuty notifications" Create a `PagerDutyNotifier` class that implements `NotificationService`. The `AlertService` works with it immediately, no modifications needed.
- **Each notifier is independently testable.** You can unit test `EmailNotifier` to verify it formats messages correctly, without involving Slack or webhooks.
- **The alert service is channel-agnostic.** It doesn't import any notifier classes. It only knows about the `NotificationService` interface. This means you could move all the notifier implementations to a separate package or module, and `AlertService` would still compile without changes.
- **Configuration drives behavior.** In a real system, you'd read the notification channel from a config file or environment variable, create the appropriate notifier, and inject it. The alerting logic stays completely untouched regardless of which channel is active.
