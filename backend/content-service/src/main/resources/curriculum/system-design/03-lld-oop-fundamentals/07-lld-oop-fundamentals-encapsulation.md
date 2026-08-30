---
id: "lld-oop-fundamentals-encapsulation"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - OOP Fundamentals"
subSection: ""
title: "Encapsulation"
slug: "lld-oop-fundamentals-encapsulation"
summary: "Encapsulation is one of the four foundational principles of object-oriented design. It is the practice of grouping data (variables) and behavior (methods) that operate on that data into a single unit (typically a class) and restricting direct acce..."
eli10: "Imagine Encapsulation as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Encapsulation Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","OOP Fundamentals","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Encapsulation"
  code: |
    public class Product {
        private String name;         // Only this class can access
        private double price;        // Only this class can access
    
        public Product(String name, double price) {
            this.name = name;
            this.price = price;
        }
    
        public String getName() {    // Anyone can read the name
            return name;
        }
    
        public double getPrice() {   // Anyone can read the price
            return price;
        }
    }
---

Encapsulation is one of the four foundational principles of object-oriented design. It is the practice of **grouping data (variables) and behavior (methods)** that operate on that data into a single unit (typically a class) and **restricting direct access to the internal details** of that class.

In simple terms:

> **Encapsulation = Data hiding + Controlled access**

---

> 💡 **Key Insight:**

> **Real-World Analogy**
>
> Think of a bank account as a **vault inside a bank**. You don't walk into the vault and change the numbers yourself.
>
> Instead, you interact with it through a **well-defined interface, **the **ATM**.
>
> The ATM provides limited but specific operations:
>
> - `deposit()`
> - `withdraw()`
> - `checkBalance()`
>
> 
> ```mermaid
> classDiagram
>      class User {
>          +depositMoney()
>          +checkBalance()
>      }
>      class BankAccount {
>          -balance: double
>          +deposit(amount: double) void
>          +withdraw(amount: double) void
>          +getBalance() double
>      }
>      User --> BankAccount : interacts via public methods
>
>      style User fill:#00ceff,stroke:#000,color:#000
>      style BankAccount fill:#69db7c,stroke:#000,color:#000
> ```
> 

>
> You can’t directly access or modify the bank’s internal data.
>
> The bank might change how it stores information, applies interest, or validates transactions but none of that affects how you use the ATM.
>
> That’s **encapsulation** in action: hiding internal complexity and exposing only what’s necessary.

In a well-encapsulated design, external code doesn't need to know **how** something is done. It only needs to know **what** can be done.

---

# 1. Why Encapsulation Matters

Encapsulation isn’t just about data protection, it’s about designing systems that are **robust**, **secure**, and **easy to maintain**.

Here's why that matters in practice:

#### **1. Data Hiding**

Sensitive data (like a bank balance or password) should not be exposed directly. Encapsulation keeps this data private and accessible only through controlled methods.

#### **2. Controlled Access **and Validation

It ensures that data can only be modified in **controlled, predictable ways**.

For example, you can prevent invalid deposits or withdrawals by validating input inside methods.

#### **3. Improved Maintainability**

Because internal details are hidden, you can change the implementation (e.g., how data is stored or validated) without affecting the code that depends on it.

#### 4. **Security and Stability**

By preventing external tampering, encapsulation reduces the risk of inconsistent or invalid system states.

---

# **2. How Encapsulation is Achieved**

Encapsulation is primarily implemented using two language features: **access modifiers** that control visibility, and **getters/setters** that provide controlled access to private data.

### 1. Access Modifiers

Access modifiers are keywords that control which parts of your code can see and interact with a class's fields and methods. The three most common are:

- `private`: Accessible only within the same class. This is the primary tool for hiding data.
- `protected`: Accessible within the same class and its subclasses. Useful when child classes need access to parent data.
- `public`: Accessible from anywhere. This is what you use for the controlled interface.

The general rule is simple: **make everything private by default**, then selectively expose what needs to be public.

Here's a minimal example showing the difference:

```java
public class Product {
    private String name;         // Only this class can access
    private double price;        // Only this class can access

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {    // Anyone can read the name
        return name;
    }

    public double getPrice() {   // Anyone can read the price
        return price;
    }
}
```

### 2. Getters and Setters

These are public methods that provide controlled, indirect access to `private` attributes.

- **Getter (e.g., **`getBalance()`**):** Provides read-only access to an attribute.
- **Setter (e.g., **`setAmount()`**):** Allows modifying an attribute, often with validation logic built-in.

Here's an example where a setter prevents invalid data from ever entering the object:

```java
public class Product {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        setPrice(price); // Use the setter for validation
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        if (price < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
        this.price = price;
    }
}
```

---

# 3. Encapsulation in Practice: BankAccount

Now let's see a complete encapsulated class with proper validation, controlled access, and business rules. The `BankAccount` class keeps `balance` private and only allows modifications through `deposit()` and `withdraw()`, each of which enforces its own rules.

```java
public class BankAccount {
    private String accountHolder;
    private double balance;

    public BankAccount(String accountHolder) {
        this.accountHolder = accountHolder;
        this.balance = 0.0;
    }

    public void deposit(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be positive");
        }
        balance += amount;
    }

    public void withdraw(double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be positive");
        }
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient funds");
        }
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }

    public String getAccountHolder() {
        return accountHolder;
    }
}
```

Notice what's happening here:

- `balance` is marked `private`, so no external class can access or modify it directly.
- `deposit()` and `withdraw()` are **public entry points** that validate user input before updating the state.
- `getBalance()` allows **read-only access** without revealing the underlying variable or letting external code change it.

This ensures the account remains in a valid state at all times and business rules are enforced through controlled interfaces.

---

# 4. Practical Example: PaymentProcessor

Let’s take a more realistic example. You're building a `PaymentProcessor` class that handles credit card transactions. The raw card number must never be stored or visible anywhere in the system. If a developer accidentally logs the payment object or inspects it in a debugger, they should only see a masked version. 

The masking logic, the amount, and the processing flow are all internal details that the caller doesn't need to worry about.

```java
class PaymentProcessor {
    private String cardNumber;
    private double amount;

    public PaymentProcessor(String cardNumber, double amount) {
        this.cardNumber = maskCardNumber(cardNumber);
        this.amount = amount;
    }

    private String maskCardNumber(String cardNumber) {
        return "****-****-****-" + cardNumber.substring(cardNumber.length() - 4);
    }

    public void processPayment() {
        System.out.println("Processing payment of $" + amount + " for card " + cardNumber);
    }
}

public class Main {
    public static void main(String[] args) {
        PaymentProcessor payment = new PaymentProcessor("1234567812345678", 250.00);
        payment.processPayment();
    }
}
```

#### Why This Design Works

- **The raw card number is never stored.** The constructor masks it immediately, so even if someone accesses the object's internal state through debugging or reflection, they only see the masked version.
- **Masking is handled internally via a private method.** The caller doesn't need to know how masking works. They pass the full card number, and the class handles the rest.
- **The external caller has a minimal interface.** Just create a `PaymentProcessor` and call `processPayment()`. No need to call `maskCardNumber()` first, no need to worry about storing the original number safely.
- **Changes to the masking logic are contained.** If you later decide to mask differently (showing the first 4 instead of the last 4, or using a different format), you change one private method. No external code is affected.

This is encapsulation applied to security: sensitive data enters the class, gets transformed into a safe representation, and the original is never exposed.
