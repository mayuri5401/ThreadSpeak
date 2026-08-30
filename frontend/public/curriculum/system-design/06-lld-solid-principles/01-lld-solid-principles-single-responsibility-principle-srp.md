---
id: "lld-solid-principles-single-responsibility-principle-srp"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - SOLID Principles"
subSection: ""
title: "Single Responsibility Principle (SRP)"
slug: "lld-solid-principles-single-responsibility-principle-srp"
summary: "Have you ever changed one part of your code... and suddenly, five unrelated things broke\""
eli10: "Imagine Single Responsibility Principle (SRP) as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Single Responsibility Principle (SRP) Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","SOLID Principles","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Single Responsibility Principle (SRP)"
  code: |
    class UserService {
        private String username;
        private String email;
        private String password;
    
        // Constructor, getters, setters...
    
        public String validateAndHashPassword() {
            // Check password strength
            // Generate salt
            // Hash with bcrypt
        }
    
        public void saveToDatabase() {
            // Connect to database
            // Prepare SQL
            // Execute query
        }
    
        public String generateAuthToken() {
            // Create JWT payload
            // Sign with secret key
            // Return token string
        }
    
        public void sendWelcomeEmail() {
            // Connect to email server
            // Build welcome template
            // Send email
        }
    }
---

**Have you ever changed one part of your code... and suddenly, five unrelated things broke"**

Or added a small feature... and ended up editing dozens of lines across a single class"

If yes, you’ve probably encountered a violation of one of the most important design principles in software engineering: **The Single Responsibility Principle (SRP).**

Let's understand it by looking at a common problem and seeing exactly why it violates SRP.

---

# 1. The Problem: The God Class

You have probably seen this kind of class before. Maybe you have even written one. It is called a **God Class** because it tries to do everything, and like most things that try to do everything, it does nothing particularly well.

```java
class UserService {
    private String username;
    private String email;
    private String password;

    // Constructor, getters, setters...

    public String validateAndHashPassword() {
        // Check password strength
        // Generate salt
        // Hash with bcrypt
    }

    public void saveToDatabase() {
        // Connect to database
        // Prepare SQL
        // Execute query
    }

    public String generateAuthToken() {
        // Create JWT payload
        // Sign with secret key
        // Return token string
    }

    public void sendWelcomeEmail() {
        // Connect to email server
        // Build welcome template
        // Send email
    }
}
```

At first glance, this may seem convenient. Everything about user registration is in one place. But let's pause and examine what this class is actually doing:

- Validating and hashing passwords
- Saving data to the database
- Generating authentication tokens
- Sending a welcome email

That’s **four distinct responsibilities** rolled into one class. And each one introduces a separate reason for the class to change:

- If password hashing rules change (e.g., switching from bcrypt to argon2), this class changes.
- If the auth token format changes (e.g., switching from JWT to opaque tokens), this class changes.
- If the database schema changes, this class changes.
- If the email service provider is replaced, this class changes again.

This class is tightly coupled to **four different reasons to change**. That’s a red flag.

---

# 2. Enter: The Single Responsibility Principle

> **A class should have one, and only one, reason to change.**
>
>  — Robert C. Martin (Uncle Bob)

In simple words: **A class should do one thing and do it well.**

The Single Responsibility Principle (SRP) is the "S" in the famous SOLID principles of object-oriented design. It is the first principle for a good reason: it forms the foundation for writing maintainable, testable, and flexible code.

***But what exactly is a "responsibility""***

It’s not a method. It’s not a function. It’s a reason for the class to change.

Ask yourself this:

> **How many reasons might someone need to update this class in the future"**

If the answer is more than one, the class is likely breaking SRP.

> 💡 **Key Insight:**

> **Real-World Analogy**
>
> Think of a **restaurant**. Would you hire one person to do all of these"
>
> - Cook the food
> - Take orders
> - Clean the tables
> - Do the accounts
>
> Of course not. You would hire a chef, a waiter, a cleaner, and an accountant. Each with a single responsibility. 
>
> Why should your code be any different"

---

# 3. Why Does SRP Matter"

#### **Easier to read**

You immediately understand what the class is supposed to do. No surprises, no scrolling through hundreds of lines to find the method you need.

#### **Easier to test**

Smaller responsibilities mean smaller test cases and fewer dependencies. You can test a password hasher without needing a database connection or an email server.

#### **Less brittle**

Changes in one responsibility don't ripple across unrelated parts of the code. Updating the email service does not risk breaking password hashing.

#### **Easier to reuse**

Small, focused classes are more flexible and can be reused in different contexts. An `AuthTokenService` can serve both a web application and a mobile API.

#### **Scales better**

Teams can own different parts of the system without stepping on each other's toes. The database team can modify `UserRepository` without worrying about breaking the email workflow.

These benefits compound over time. A codebase that follows SRP from the start is far easier to extend six months later than one full of God Classes.

---

# 4. Applying SRP

Time to fix our original `UserService` God Class using SRP. We will take each distinct responsibility from the original class and extract it into its own focused, well-named class.

- Validating and hashing passwords is one responsibility.
- Saving to the database is another.
- Generating auth tokens is another.
- Sending the welcome email is yet another.

They all deserve their own classes. Let's walk through each one.

### The Core: User Class

Let's start by extracting a simple `User` data class. Its only job is to represent a user.

```java
class User {
    private String username;
    private String email;
    private String password;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public String getUsername() { return username; }
    public String getEmail() { return email; }
    public String getPassword() { return password; }
}
```

This class now does one thing: represent a user. It does not hash passwords, store itself, or send emails. That is the job of others.

### Responsibility 1: Password Hashing

This class handles just the logic of validating and hashing a password.

```java
class PasswordHasher {
    public String validateAndHash(String password) {
        if (password.length() < 8) {
            throw new IllegalArgumentException("Password must be at least 8 characters");
        }
        // Generate salt and hash with bcrypt
        return "bcrypt_hashed_" + password; // Simplified for illustration
    }
}
```

If the hashing algorithm changes (say, from bcrypt to argon2), we only update this class. Nothing else is affected.

### Responsibility 2: Persistence to Database

The responsibility for talking to the database belongs here.

```java
class UserRepository {
    public void save(User user) {
        // Example: JDBC code or ORM logic
        System.out.println("Saving user " + user.getUsername() + " to database...");
    }
}
```

You can swap out JDBC for JPA, switch from SQL to a NoSQL store, or change your ORM entirely without touching the rest of the system.

### Responsibility 3: Auth Token Generation

This class handles the creation of authentication tokens.

```java
class AuthTokenService {
    public String generateToken(User user) {
        // Create JWT payload with user claims
        String payload = "{\"username\":\"" + user.getUsername() + "\",\"email\":\"" + user.getEmail() + "\"}";
        // Sign with secret key (simplified)
        return "eyJhbGciOiJIUzI1NiJ9." + payload + ".signature";
    }
}
```

You can switch from JWT to opaque tokens, change the signing algorithm, or adjust token expiry without affecting the rest of your codebase. The auth logic is completely isolated from password hashing, database operations, and email delivery.

### Responsibility 4: Sending the Welcome Email

This class is responsible only for sending emails.

```java
class EmailService {
    public void sendWelcomeEmail(User user) {
        System.out.println("Sending welcome email to: " + user.getEmail());
        System.out.println("Welcome to our platform, " + user.getUsername() + "!");
    }
}
```

It does not hash passwords or generate tokens. It just sends the welcome email. If you need to switch from SMTP to a third-party email API, this is the only class you touch.

---

# 5. Common Pitfalls While Applying SRP

SRP sounds straightforward in theory, but developers run into several traps when applying it in practice. Let's look at the most common ones and how to avoid them.

### 1. Over-Splitting Responsibilities

The mistake here is breaking a class into too many tiny classes that don't add real value.

For example, creating separate classes for **PasswordValidator**, **SaltGenerator**, **BcryptEncoder**, and **HashAggregator** when all of these could be grouped into a cohesive `PasswordHasher`.

Why is this a problem" It leads to unnecessary complexity, makes the system harder to understand, and increases overhead in navigating and wiring too many classes together.

Each new class adds a file, an import, and a conceptual dependency that someone has to hold in their head.

> Focus on 
>
> **cohesion**
>
> , not fragmentation. Group logic that changes together or belongs to the same business concern.

### 2. Confusing Methods with Responsibilities

Sometimes developers assume each method must be its own class. Consider an `EmailService` that can send different types of emails.

```java
class EmailService {
    public void sendWelcomeEmail() {}
    public void sendPayslipEmail() {}
}
```

Some developers might try to split this into **WelcomeEmailSender** and **PayslipEmailSender**. But both methods deal with the same responsibility: sending emails. Splitting them adds more boilerplate without clear benefits.

> Don't confuse the 
>
> *number of methods*
>
>  with the 
>
> *number of responsibilities*
>
> . If the methods serve the same purpose (sending emails), it is fine to keep them together.

### 3. Ignoring SRP in Small or Utility Classes

The mistake is thinking, "This class is small and works fine, no need to split it." But a utility class that starts off simple can quietly grow into a mess.

```java
class ReportUtils {
    public void generateCSV() {}
    public void sendReportEmail() {}
    public void archiveReport() {}
}
```

These responsibilities often evolve independently. The CSV format might change because of a new business requirement, the email service might switch providers, and the archive strategy might move from local storage to cloud. Small changes to one feature might introduce bugs in others.

> Watch for creeping responsibilities even in utility classes. Apply SRP early, before small classes become unmanageable.

### 4. Misunderstanding “Reason to Change”

The mistake is taking the "reason to change" definition too literally or too vaguely.

A bad interpretation would be: "I only ever change this class when a stakeholder asks for a change, so it has one reason to change." 

SRP is not about who asks for the change, but what kind of change is being made. A class that handles both password hashing and database persistence has two reasons to change, even if the same product manager requests both updates.

> Clarify the responsibility in terms of 
>
> **business logic or technical behavior**
>
> . Ask: 
>
> *Is this logic cohesive, or are unrelated concerns bundled together"*

---

# 6. Common Questions About SRP

> ❓ **Interview Q&A:**

> #### "Doesn't this create too many small classes""

Yes, **you’ll likely end up with more classes** but that’s not a bad thing.

Instead of having one massive class doing everything poorly, you have smaller, focused classes doing one thing well. These classes are:

- Easier to **read**
- Easier to **test**
- Easier to **maintain**
- Easier to **reuse**

Think of it as **managing complexity through separation**, not increasing it. When responsibilities are clearly separated, your system becomes easier to reason about even if the file count grows.

> SRP helps reduce cognitive load, even if it increases the class count.

> ❓ **Interview Q&A:**

> #### "How small should a responsibility be""

There’s no hard-and-fast rule. It depends on your domain and use case. But here’s a simple **heuristic**:

> **If you need to use the word “and” or “or” to describe what your class does, it probably has more than one responsibility.**

**Example:**

- "This class generates reports *and* sends emails." → Two responsibilities

Another tip: If the **reasons for change** are unrelated say, a tax policy update vs. a new email template, your class is likely doing too much.

> ❓ **Interview Q&A:**

> #### "Does SRP apply beyond classes""

Absolutely. SRP can and should be applied across multiple levels:

- **Class: **A class should have one reason to change.
- **Method: **A method should do one thing.
- **Module: **A module should encapsulate one area of functionality.
- **Service: **A service (or microservice) should serve a single domain.
- **System: **Even large systems can be organized around single responsibilities.

> SRP is a mindset: 
>
> **separate concerns to improve clarity and adaptability**
>
> , no matter the scale.

> ❓ **Interview Q&A:**

> #### "Does SRP make testing harder or easier""

When a class does only one thing, testing becomes straightforward.

You don’t have to:

- Mock half the world
- Stub unrelated services
- Worry about hidden side effects

You can focus on the specific input/output of a class without worrying about unrelated functionality baked into it.

> ❓ **Interview Q&A:**

> #### "What if the responsibilities are related""

Sometimes it’s okay to group closely related behaviors into one class.

For example, a `EmailService` class that:

- Sends welcome emails
- Sends password reset emails
- Sends payslip emails

That’s fine. They all fall under the same responsibility: **sending emails**. But if that class also starts doing PDF generation or user authentication, it’s time to split it up.

> ❓ **Interview Q&A:**

> #### "Is SRP just another rule I have to follow""

Think of SRP less as a strict rule and more as a **guiding principle**. It won’t always be obvious where to draw the line, and that’s okay.

Use SRP to:

- Make your code easier to evolve
- Isolate reasons for change
- Reduce the blast radius of bugs

When used wisely, SRP becomes a **tool to manage change and complexity**, not a burden.


