---
id: "java-encapsulation"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Encapsulation in Java"
slug: "java-encapsulation"
summary: "Master Encapsulation in Java: Definition, Real-World Examples (Capsule, Car), Simple Encapsulation without Data Hiding, Rules for Proper Encapsulation (Private Variables & Public Getters/Setters), Uses of Encapsulation with Banking Program & Output, and Interview Questions."
eli10: "A medical capsule wraps all powder medicine inside a protective gelatin shell. Encapsulation wraps all your sensitive data inside a class, with security guards (Getters & Setters) deciding who can read or change it."
mentalModel: "Encapsulation creates a protective barrier around object state, ensuring external code can only interact via validated public method APIs."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["Encapsulation", "Data Hiding", "Getters and Setters", "Private Variables", "Validation", "Interview Questions", "OOP"]
animationType: "encapsulation"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Proper Encapsulation with Data Hiding and Validation in Java."
  code: |
    class Account {
        // Protects data by hiding it from direct access
        private String accountHolder;
        private double balance;

        public String getAccountHolder() {
            return accountHolder;
        }

        public void setAccountHolder(String accountHolder) {
            this.accountHolder = accountHolder;
        }

        public double getBalance() {
            return balance;
        }

        public void deposit(double amount) {
            if (amount > 0) {
                balance = balance + amount;
                System.out.println("You have deposited " + amount + " Rs.");
                System.out.println("New balance is: " + getBalance() + " Rs.");
            } else {
                System.out.println("Invalid deposit amount");
            }
        }

        public void withdraw(double amount) {
            if (amount > 0 && amount <= balance) {
                balance = balance - amount;
                System.out.println("You have withdrawn " + amount + " Rs.");
                System.out.println("New balance is: " + getBalance() + " Rs.");
            } else {
                System.out.println("Invalid or Insufficient balance for withdrawal");
            }
        }
    }

    public class BankApp {
        public static void main(String[] args) {
            Account account = new Account();
            account.setAccountHolder("Deepak");

            account.deposit(10000);
            account.withdraw(3000);
            account.deposit(-20000);
            account.withdraw(100000);
        }
    }
---

# 💊 Encapsulation in Java

---

## 📖 Introduction

**Encapsulation** is the mechanism of **binding data (variables) and actions (methods) into a single unit, called a class**.
- Technically, **every class in Java is an example of encapsulation**.

### 💡 Real World Examples:
1. **Capsule**: A capsule in which the main medicine powders are encapsulated within a soluble shell.
2. **Car**: A car in which the engine, wheels, fuel tank, and other mechanical parts are encapsulated inside a protective chassis.

---

## 📝 Java Program Example (Simple Encapsulation Without Data Hiding)

```java
class Car
{
    // Data members (variables)
    String brand;
    int speed;

    // Method to display car details
    void setDetails(String b, int s)
    {
        brand = b;
        speed = s;
    }

    void printDetails()
    {
        System.out.println("Brand : " + brand);
        System.out.println("Speed : " + speed);
    }
}

public class Main
{
    public static void main(String[] args)
    {
        // Creating object
        Car c = new Car();

        // Calling method
        c.setDetails("Tata", 100);
        c.printDetails();
    }
}
```

### 🖥️ Output:
```text
Brand : Tata
Speed : 100
```

### 🔍 Explanation & Note:
- The `Car` class contains both data (`brand`, `speed`) and methods (`printDetails()`). Everything is inside one unit (class) — this is the essence of encapsulation.
- **📌 NOTE**: The above example is a simple encapsulated class, **but it does NOT provide any data hiding**. Outside classes can still alter `c.speed = -500;` directly!
- Therefore, to create **proper encapsulation**, we must follow the rules below.

---

## 📜 Rules for Proper Encapsulation

1. **Private Variables**:
   - Declare variables as **`private`** so that they **cannot be accessed directly from outside the class**.
2. **Public Getter & Setter Methods**:
   - Provide **`public` getter and setter methods** to access and modify the private variables with validation.

---

## ✅ Actual / Proper Encapsulated Java Program Example

```java
class Car
{
    // Private data members (encapsulated)
    private String brand;
    private int speed;

    // Public setter for brand
    public void setBrand(String brand)
    {
        this.brand = brand;
    }

    // Public getter for brand
    public String getBrand()
    {
        return brand;
    }

    // Public setter for speed
    public void setSpeed(int speed)
    {
        // Validation: Prevents negative speed corruption
        if (speed >= 0)
        {
            this.speed = speed;
        }
    }

    // Public getter for speed
    public int getSpeed()
    {
        return speed;
    }

    // Method to print car details
    public void printDetails()
    {
        System.out.println("Brand : " + brand);
        System.out.println("Speed : " + speed);
    }
}

public class MainApp
{
    public static void main(String[] args)
    {
        Car c = new Car();

        // Setting values using setters
        c.setBrand("Tata");
        c.setSpeed(100);

        // Printing car details
        c.printDetails();
    }
}
```

### 🖥️ Output:
```text
Brand : Tata
Speed : 100
```

---

## 🎯 Use of Encapsulation

Encapsulation provides **6 critical benefits**:
1. **Protects data**: Hides data from direct external access using private variables.
2. **Controls data access**: Provides controlled read/write access through public getters and setters.
3. **Allows data validation**: Enables validation before updating variables (e.g., rejecting negative amounts).
4. **Improves code maintainability**: Keeps internal implementation hidden, making modifications easier without breaking caller code.
5. **Enhances flexibility**: Internal logic can change without affecting external client code.
6. **Prevents unauthorized or accidental modifications**: Limits who and how data can be altered.

---

## 💻 Program Elaborating the Uses of Encapsulation: Bank Account

```java
// Class demonstrating proper encapsulation
class Account
{
    // 🔒 Protects data by hiding it from direct access
    private String accountHolder;
    private double balance;

    // ✅ Public getter (controlled access to private data)
    public String getAccountHolder()
    {
        return accountHolder;
    }

    // ✅ Public setter (controlled access with flexibility for future validation)
    public void setAccountHolder(String accountHolder)
    {
        this.accountHolder = accountHolder;
    }

    // ✅ Getter for balance
    public double getBalance()
    {
        return balance;
    }

    // 💰 Method to deposit money
    public void deposit(double amount)
    {
        // 🛡️ Allows data validation before modifying balance
        if (amount > 0)
        {
            balance = balance + amount;
            System.out.println("You have deposited " + amount + " Rs.");
            System.out.println("New balance is: " + getBalance() + " Rs.");
        }
        else
        {
            System.out.println("Invalid deposit amount");
        }
    }

    // 💸 Method to withdraw money
    public void withdraw(double amount)
    {
        // 🛡️ Data validation: prevents negative balance and overdrafts
        if (amount > 0 && amount <= balance)
        {
            balance = balance - amount;
            System.out.println("You have withdrawn " + amount + " Rs.");
            System.out.println("New balance is: " + getBalance() + " Rs.");
        }
        else
        {
            System.out.println("Invalid or Insufficient balance for withdrawal");
        }
    }
}

public class BankApp
{
    public static void main(String[] args)
    {
        // 👨‍💼 Creating object
        Account account = new Account();

        // 🚫 Cannot access private fields directly:
        // account.balance = 10000; // ❌ Not allowed (Encapsulation Guard)

        // ✅ Uses public setters and methods
        account.setAccountHolder("Deepak");

        // ✅ Proper access via methods ensures validation
        account.deposit(10000);      // Valid deposit
        account.withdraw(3000);      // Valid withdrawal

        account.deposit(-20000);     // Invalid deposit
        account.withdraw(100000);    // Invalid withdrawal (insufficient funds)
    }
}
```

### 🖥️ Output:
```text
You have deposited 10000.0 Rs.
New balance is: 10000.0 Rs.
You have withdrawn 3000.0 Rs.
New balance is: 7000.0 Rs.
Invalid deposit amount
Invalid or Insufficient balance for withdrawal
```

---

## 🎯 Interview Questions & Answers

### 1. What is Encapsulation & its use ?
**Answer**: Encapsulation is the process of wrapping variables and methods together in a single class while keeping variables `private`. Its primary uses are **Data Hiding**, **Controlled Access via Getters/Setters**, **Input Validation**, and **Code Maintainability**.

### 2. What is Data Hiding ?
**Answer**: Data Hiding is the practice of declaring class fields as `private` to prevent direct external access and modification, ensuring that state changes occur only through authenticated, validated methods.

### 3. Provide examples of Encapsulation in Java.
**Answer**:
- Any **JavaBean / POJO** class with `private` fields and `public` getters/setters.
- The `java.lang.String` class (internal `char[]` or `byte[]` is private and immutable).
- Banking `Account` class guarding `balance` with `deposit()` and `withdraw()`.

### 4. What is the difference between Abstraction & Encapsulation ?
| Feature | Abstraction | Encapsulation |
|:---|:---|:---|
| **Concept** | **Hiding implementation complexity** and showing only essential features | **Data Hiding & Protection** by binding data and methods together |
| **Question** | *"WHAT does the entity do?"* | *"HOW is the internal data secured and accessed?"* |
| **Achieved By** | `abstract class` and `interface` | `private` variables and `public` getters/setters |
| **Focus** | Outer Design & Contract | Internal Class Security & Integrity |
