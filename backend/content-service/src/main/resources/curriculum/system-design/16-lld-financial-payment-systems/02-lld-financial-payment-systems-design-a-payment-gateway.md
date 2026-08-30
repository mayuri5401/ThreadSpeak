---
id: "lld-financial-payment-systems-design-a-payment-gateway"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Financial Payment Systems"
subSection: ""
title: "Design a Payment Gateway"
slug: "lld-financial-payment-systems-design-a-payment-gateway"
summary: "In this chapter, we will explore the low-level design of a Payment Gateway."
eli10: "Imagine Design a Payment Gateway as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design a Payment Gateway Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Financial Payment Systems","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design a Payment Gateway"
  code: |
    enum PaymentMethod {
        CREDIT_CARD,
        PAYPAL,
        UPI
    }
    
    enum PaymentStatus {
        INITIATED,
        SUCCESSFUL,
        FAILED
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Payment Gateway"
>
> A payment gateway is a critical component in any online transaction system. It acts as a bridge between the user, the merchant, and financial institutions by securely processing payment requests, verifying details, and ensuring funds are transferred correctly.
>
> 
> <!-- Simulation: payment-gateway -->
> 

>
> For example, when a customer purchases a product on an e-commerce platform, the payment gateway handles the steps of capturing payment details, validating them, interacting with the bank or wallet provider, and communicating the result (success or failure) to the application.

In this chapter, we will explore the **low-level design of a Payment Gateway**.

Let’s start by clarifying the requirements:

---

# 1. Clarifying Requirements

Designing a payment gateway involves many moving parts. Before diving into the implementation, it's critical to clarify the scope and constraints of the system we are expected to design.

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate**: Should the payment gateway support multiple payment methods"
>
> **Interviewer**: Yes, it should support at least **Credit Card**, **PayPal**, and **UPI**. Additional methods can be added later.
>
> **Candidate**: Should we support retry logic if a payment fails"
>
> **Interviewer**: Yes, implement a basic retry mechanism—for example, retrying failed payments up to 3 times.
>
> **Candidate**: What happens after a payment is processed" Should we notify anyone"
>
> **Interviewer**: Yes, the system should notify the **merchant** and **customer** about transaction status updates.
>
> **Candidate**: Are refunds or reversals in scope"
>
> **Interviewer**: No. Just implement the core payment flow from request to processing to response.
>
> **Candidate**: Do we need to support currency conversions"
>
> **Interviewer**: No, just support basic multi-currency payments, but assume the currency is provided by the merchant.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- The system supports **multiple payment methods**, including **Credit Card**, **PayPal**, and **UPI**.
- The system processes the request using the appropriate **payment processor**.
- If processing fails, the system retries the request up to a maximum number of times (e.g., 3).
- The system should notify interested parties (e.g., customer, merchant) upon payment status updates.

## 1.2 Non-Functional Requirements

- The design should follow **object-oriented principles** and be **modular** to support future extensions (e.g., new payment methods).
- The system should be **testable**, **extensible**, and simulate real-world payment flows without actual external API calls.

After the requirements are clear, the next step is to identify the core entities that we will form the foundation of our design.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing the functional requirements and highlighting the key nouns and responsibilities that naturally map to object-oriented abstractions such as classes, enums, or interfaces.

Let’s walk through the functional requirements and extract the relevant entities:

#### **The system must accept payment requests from merchants.**

A merchant's request to initiate a payment will contain various pieces of information, such as the amount, currency, and customer details. This suggests the need for a **PaymentRequest** entity to encapsulate all this incoming data into a single object. Correspondingly, the system must provide an immediate result of the processing attempt, leading to a **PaymentResponse** entity to hold the status and a message.

#### **The system must support multiple payment methods, such as Credit Card, PayPal, and UPI.**

The different payment methods can be represented by a **PaymentMethod** enum, ensuring type safety. Since the logic for processing a payment is different for each method, we need a common abstraction. This points to a **PaymentProcessor** interface (Strategy Pattern), which defines a standard processPayment method. We will then have concrete implementations like **CreditCardProcessor**, **PayPalProcessor**, and **UPIProcessor**, each handling the specifics of its method.

#### **The system must create, track, and log every payment attempt.**

Each payment request should be treated as a unique **Transaction**. This entity will serve as the central record, holding the original PaymentRequest and tracking its lifecycle. The state of this lifecycle (e.g., INITIATED, SUCCESSFUL, FAILED) can be modeled with a **PaymentStatus** enum.

#### **The gateway must be able to select the correct payment processor dynamically.**

To avoid coupling the main service with the creation logic of concrete processors, we can introduce a **PaymentProcessorFactory**. This factory's sole responsibility will be to instantiate and return the appropriate PaymentProcessor based on the PaymentMethod specified in the request.

#### **When a transaction's status changes, other systems (e.g., merchant backend, customer notification service) must be informed.**

This is an event-driven requirement, best solved with the Observer pattern. We'll define a **PaymentObserver** interface for any component that needs to react to transaction updates. Concrete implementations, such as **CustomerNotifier** and **MerchantNotifier**, can then subscribe to receive these updates.

#### **The system must provide a simple, unified interface for merchants to integrate with.**

To hide the internal complexity of factories, processors, and observers, we need a single, easy-to-use entry point. A **PaymentGatewayService** will act as a Facade, providing a clean API for merchants to process payments and abstracting away the underlying orchestration.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **PaymentMethod & PaymentStatus**: Enums that provide type-safe representations for the different ways to pay and the various states a transaction can be in.
> - **PaymentRequest**: A data object that encapsulates all the details provided by a merchant to initiate a payment.
> - **PaymentResponse**: A data object that represents the immediate synchronous result of a payment processing attempt.
> - **Transaction**: The central entity representing a single payment lifecycle. It links a PaymentRequest to its current PaymentStatus and serves as a record for logging and auditing.
> - **PaymentProcessor**: An interface (Strategy) that defines a common contract for processing payments. Concrete classes like CreditCardProcessor and PayPalProcessor implement this interface.
> - **PaymentProcessorFactory**: A factory class responsible for creating the correct PaymentProcessor instance based on the requested PaymentMethod.
> - **PaymentObserver**: An interface (Observer) for objects that need to be notified about changes in a Transaction's status.
> - **PaymentGatewayService**: The main service class that acts as a Facade for the entire system. It orchestrates the payment flow, from receiving the request to notifying observers, providing a simple API to the outside world.

---

# 3. Designing Classes and Relationships

This section details the design of each class identified previously, including their specific attributes and methods. We will also illustrate how these classes relate to one another and highlight the key design patterns that underpin our solution.

## 3.1 Class Definitions

We can categorize our classes into enums, data-holding classes, and core classes that encapsulate the system's primary logic.

### Enums

#### **PaymentMethod**

A type-safe enumeration to represent the different payment instruments supported by the gateway.

- **Values**: CREDIT_CARD, PAYPAL, UPI.

#### **PaymentStatus**

A type-safe enumeration to represent the distinct states a transaction can be in throughout its lifecycle.

- **Values**: INITIATED, SUCCESSFUL, FAILED.

### Data Classes

#### PaymentRequest

 A data transfer object (DTO) that encapsulates all the necessary information from a merchant to initiate a payment. It is constructed using the Builder pattern for flexibility and readability.

- **Attributes**: transactionId, payerId, amount, currency, paymentMethod, paymentDetails (a map for method-specific data like card numbers).

#### PaymentResponse

A simple DTO that carries the immediate synchronous result of a payment processing attempt back to the caller.

- **Attributes**: status (PaymentStatus), message (String).

#### Transaction

 The central domain object representing a single payment from start to finish. It links the initial request with its evolving status, serving as a single source of truth for that payment's history.

- **Attributes**: id, request (PaymentRequest), status (PaymentStatus), timestamp.
- **Methods**: setStatus(PaymentStatus status).

### Core Classes

#### PaymentGatewayService

Acts as the system's Facade and Singleton entry point. It orchestrates the entire payment flow: receiving a request, using the factory to get a processor, executing the payment, updating the transaction status, and notifying all registered observers.

- **Attributes**: instance (for Singleton), observers (a list of PaymentObserver).
- **Methods**: getInstance(), addObserver(), processPayment(), notifyObservers().

### PaymentProcessor

## 3.2 Class Relationships

### **Implementation**

- CreditCardProcessor, PayPalProcessor, and UPIProcessor **extend** the AbstractPaymentProcessor.
- AbstractPaymentProcessor **implements** the PaymentProcessor interface.
- CustomerNotifier and MerchantNotifier **implement** the PaymentObserver interface.

### **Composition / Aggregation**

- Transaction **has a** PaymentRequest.
- PaymentGatewayService **has a list of** PaymentObservers.

### **Dependency / "Uses-a**

- PaymentGatewayService **uses** PaymentProcessorFactory to obtain a PaymentProcessor.
- PaymentGatewayService **uses** the PaymentProcessor to process the payment.
- PaymentGatewayService **creates** and manages Transaction objects.
- Concrete PaymentProcessors **create** PaymentResponse objects.

## 3.3 Key Design Patterns

### [**Strategy** Pattern](/learn/lld/strategy)

The PaymentProcessor interface and its concrete implementations (CreditCardProcessor, PayPalProcessor, etc.) embody this pattern. Each processor is a different "strategy" for handling a payment. This allows the system to easily support new payment methods by simply adding a new processor class.

### [Observer Pattern](/learn/lld/observer)

The PaymentObserver interface, concrete observers (CustomerNotifier, MerchantNotifier), and the PaymentGatewayService (as the subject) form a classic Observer pattern. This allows different parts of the system to react to transaction status changes without being tightly coupled to the payment processing logic.

### [**Factory Pattern (Simple Factory)**](/learn/lld/factory-method)

The PaymentProcessorFactory centralizes the creation logic for PaymentProcessor objects. This decouples the client (PaymentGatewayService) from the concrete processor classes, making the system more flexible and adhering to the open/closed principle.

### [Builder Pattern](/learn/lld/builder)

The PaymentRequest.Builder provides a clean and fluent API for constructing a PaymentRequest object, which has multiple parameters. This improves readability and is more flexible than using telescoping constructors.

### [**Template Method Pattern**](/learn/lld/template-method)

The AbstractPaymentProcessor uses this pattern to define a skeleton algorithm for processing a payment (including retries) while allowing subclasses to override the specific doProcess step. This avoids code duplication (retry logic) across different processors.

### [**Facade** Pattern](/learn/lld/facade)

The PaymentGatewayService serves as a Facade. It provides a single, simplified interface for merchants to interact with, hiding the complex internal machinery of factories, processors, transactions, and observers.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Enums

```java
enum PaymentMethod {
    CREDIT_CARD,
    PAYPAL,
    UPI
}

enum PaymentStatus {
    INITIATED,
    SUCCESSFUL,
    FAILED
}
```

### 4.2 PaymentRequest

```java
$b8
```

### 4.3 PaymentResponse

```java
class PaymentResponse {
    private final PaymentStatus status;
    private final String message;

    public PaymentResponse(PaymentStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public PaymentStatus getStatus() { return status; }
    public String getMessage() { return message; }
}
```

### 4.4 PaymentResponse

```java
class Transaction {
    private final String id;
    private final PaymentRequest request;
    private PaymentStatus status;
    private final LocalDateTime timestamp;

    public Transaction(PaymentRequest request) {
        this.id = request.getTransactionId();
        this.request = request;
        this.status = PaymentStatus.INITIATED;
        this.timestamp = LocalDateTime.now();
    }

    public void setStatus(PaymentStatus status) { this.status = status; }

    public String getId() { return id; }
    public PaymentStatus getStatus() { return status; }
    public PaymentRequest getRequest() { return request; }
}
```

### 4.5 PaymentObserver

```java
interface PaymentObserver {
    void onTransactionUpdate(Transaction transaction);
}

class CustomerNotifier implements PaymentObserver {
    @Override
    public void onTransactionUpdate(Transaction transaction) {
        if (transaction.getStatus() == PaymentStatus.SUCCESSFUL) {
            System.out.println("--- CUSTOMER EMAIL ---");
            System.out.println("Your payment of " + transaction.getRequest().getAmount() + " was successful. Transaction ID: " + transaction.getId());
            System.out.println("----------------------");
        }
    }
}

class MerchantNotifier implements PaymentObserver {
    @Override
    public void onTransactionUpdate(Transaction transaction) {
        System.out.println("--- MERCHANT NOTIFICATION ---");
        System.out.println("Transaction " + transaction.getId() + " status updated to: " + transaction.getStatus());
        System.out.println("-----------------------------");
    }
}
```

### 4.6 PaymentProcessor

```java
interface PaymentProcessor {
    PaymentResponse processPayment(PaymentRequest request);
}

abstract class AbstractPaymentProcessor implements PaymentProcessor {
    private static final int MAX_RETRIES = 3;

    @Override
    public PaymentResponse processPayment(PaymentRequest request) {
        int attempts = 0;
        PaymentResponse response;
        do {
            response = doProcess(request);
            attempts++;
        } while (response.getStatus() == PaymentStatus.FAILED && attempts < MAX_RETRIES);
        return response;
    }

    protected abstract PaymentResponse doProcess(PaymentRequest request);
}
```

### 4.7 PaymentProcessor Implementation

```java
$bf
```

### 4.8 PaymentProcessorFactory

```java
class PaymentProcessorFactory {
    public static PaymentProcessor getProcessor(PaymentMethod method) {
        return switch (method) {
            case CREDIT_CARD -> new CreditCardProcessor();
            case UPI -> new UPIProcessor();
            case PAYPAL -> new PayPalProcessor();
            // case BANK_TRANSFER -> new BankTransferProcessor();
            default -> throw new IllegalArgumentException("Unsupported payment method: " + method);
        };
    }
}
```

### 4.9 PaymentGatewayService

```java
$c3
```

### 4.10 PaymentGatewayDemo

```java
$c9
```

---

# 5. Run and Test

---

# 6. Quiz
