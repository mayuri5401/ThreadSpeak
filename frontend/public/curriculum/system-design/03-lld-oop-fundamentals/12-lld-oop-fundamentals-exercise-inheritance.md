---
id: "lld-oop-fundamentals-exercise-inheritance"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - OOP Fundamentals"
subSection: ""
title: "Exercise: Inheritance"
slug: "lld-oop-fundamentals-exercise-inheritance"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Inheritance as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Inheritance Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","OOP Fundamentals","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Bank Account Hierarchy

**Problem:** Build a bank account system using inheritance. The base `BankAccount` class has common fields and methods for deposits and withdrawals. Specialized account types have different withdrawal rules.

**Requirements:**

- Base `BankAccount` class with `ownerName`, `accountNumber`, and `balance` (protected). A `deposit(amount)` method that adds to the balance if the amount is positive. A `withdraw(amount)` method that subtracts from the balance if funds are sufficient and returns true/false. A `displayAccount()` method that prints the owner's name, account number, and formatted balance.
- `SavingsAccount`: adds an `interestRate` field. Overrides `withdraw()` to enforce a minimum balance of $100 (the withdrawal fails if it would drop the balance below $100). Adds an `applyInterest()` method that increases the balance by `balance * interestRate / 100`.
- `CheckingAccount`: adds an `overdraftLimit` field. Overrides `withdraw()` to allow withdrawals up to `balance + overdraftLimit`.
- `displayAccount()` should work correctly for all account types without any changes to the base class.

```java
class BankAccount {
    protected String ownerName;
    protected String accountNumber;
    protected double balance;

    public BankAccount(String ownerName, String accountNumber, double balance) {
        // TODO: initialize ownerName, accountNumber, and balance
    }

    public boolean deposit(double amount) {
        // TODO: add amount to balance if amount > 0, return true if successful
        return false;
    }

    public boolean withdraw(double amount) {
        // TODO: subtract amount from balance if balance >= amount, return true
        return false;
    }

    public void displayAccount() {
        // TODO: print "ownerName (accountNumber) | Balance: $balance"
        // Hint: use String.format("$%.2f", balance) for formatting
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate;

    public SavingsAccount(String ownerName, String accountNumber,
                          double balance, double interestRate) {
        super(ownerName, accountNumber, balance);
        // TODO: initialize interestRate
    }

    @Override
    public boolean withdraw(double amount) {
        // TODO: only allow if (balance - amount) >= 100 (minimum balance rule)
        return false;
    }

    public void applyInterest() {
        // TODO: add (balance * interestRate / 100) to balance
    }
}

class CheckingAccount extends BankAccount {
    private double overdraftLimit;

    public CheckingAccount(String ownerName, String accountNumber,
                           double balance, double overdraftLimit) {
        super(ownerName, accountNumber, balance);
        // TODO: initialize overdraftLimit
    }

    @Override
    public boolean withdraw(double amount) {
        // TODO: allow if (balance + overdraftLimit) >= amount
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        SavingsAccount savings = new SavingsAccount("Alice", "SAV-001", 1000, 2.0);
        savings.displayAccount();
        System.out.println("Withdraw $950: " + savings.withdraw(950));
        savings.applyInterest();
        savings.displayAccount();

        System.out.println();

        CheckingAccount checking = new CheckingAccount("Bob", "CHK-002", 500, 300);
        checking.displayAccount();
        System.out.println("Withdraw $700: " + checking.withdraw(700));
        checking.displayAccount();
    }
}
```

```python
class BankAccount:
    def __init__(self, owner_name: str, account_number: str, balance: float):
        # TODO: initialize self._owner_name, self._account_number, and self._balance
        pass

    def deposit(self, amount: float) -> bool:
        # TODO: add amount to balance if amount > 0, return True if successful
        return False

    def withdraw(self, amount: float) -> bool:
        # TODO: subtract amount from balance if balance >= amount, return True
        return False

    def display_account(self):
        # TODO: print "owner_name (account_number) | Balance: $balance"
        # Hint: use f"${self._balance:.2f}" for formatting
        pass

class SavingsAccount(BankAccount):
    def __init__(self, owner_name: str, account_number: str,
                 balance: float, interest_rate: float):
        super().__init__(owner_name, account_number, balance)
        # TODO: initialize self._interest_rate

    def withdraw(self, amount: float) -> bool:
        # TODO: only allow if (balance - amount) >= 100
        return False

    def apply_interest(self):
        # TODO: add (balance * interest_rate / 100) to balance
        pass

class CheckingAccount(BankAccount):
    def __init__(self, owner_name: str, account_number: str,
                 balance: float, overdraft_limit: float):
        super().__init__(owner_name, account_number, balance)
        # TODO: initialize self._overdraft_limit

    def withdraw(self, amount: float) -> bool:
        # TODO: allow if (balance + overdraft_limit) >= amount
        return False

if __name__ == "__main__":
    savings = SavingsAccount("Alice", "SAV-001", 1000, 2.0)
    savings.display_account()
    print(f"Withdraw $950: {str(savings.withdraw(950)).lower()}")
    savings.apply_interest()
    savings.display_account()

    print()

    checking = CheckingAccount("Bob", "CHK-002", 500, 300)
    checking.display_account()
    print(f"Withdraw $700: {str(checking.withdraw(700)).lower()}")
    checking.display_account()
```

```cpp
#include <iostream>
#include <string>
#include <cstdio>

using namespace std;

class BankAccount {
protected:
    string ownerName;
    string accountNumber;
    double balance;

public:
    BankAccount(const string& ownerName, const string& accountNumber,
                double balance) {
        // TODO: initialize this->ownerName, this->accountNumber, and this->balance
    }

    virtual ~BankAccount() {}

    bool deposit(double amount) {
        // TODO: add amount to balance if amount > 0, return true if successful
        return false;
    }

    virtual bool withdraw(double amount) {
        // TODO: subtract amount from balance if balance >= amount, return true
        return false;
    }

    void displayAccount() {
        // TODO: print "ownerName (accountNumber) | Balance: $balance"
        // Hint: use printf("$%.2f", balance) for formatting
    }
};

class SavingsAccount : public BankAccount {
private:
    double interestRate;

public:
    SavingsAccount(const string& ownerName, const string& accountNumber,
                   double balance, double interestRate)
        : BankAccount(ownerName, accountNumber, balance) {
        // TODO: initialize this->interestRate
    }

    bool withdraw(double amount) override {
        // TODO: only allow if (balance - amount) >= 100
        return false;
    }

    void applyInterest() {
        // TODO: add (balance * interestRate / 100) to balance
    }
};

class CheckingAccount : public BankAccount {
private:
    double overdraftLimit;

public:
    CheckingAccount(const string& ownerName, const string& accountNumber,
                    double balance, double overdraftLimit)
        : BankAccount(ownerName, accountNumber, balance) {
        // TODO: initialize this->overdraftLimit
    }

    bool withdraw(double amount) override {
        // TODO: allow if (balance + overdraftLimit) >= amount
        return false;
    }
};

int main() {
    SavingsAccount savings("Alice", "SAV-001", 1000, 2.0);
    savings.displayAccount();
    cout << "Withdraw $950: " << (savings.withdraw(950) " "true" : "false") << endl;
    savings.applyInterest();
    savings.displayAccount();

    cout << endl;

    CheckingAccount checking("Bob", "CHK-002", 500, 300);
    checking.displayAccount();
    cout << "Withdraw $700: " << (checking.withdraw(700) " "true" : "false") << endl;
    checking.displayAccount();

    return 0;
}
```

```go
package main

import "fmt"

type BankAccount struct {
	ownerName     string
	accountNumber string
	balance       float64
}

func NewBankAccount(ownerName string, accountNumber string, balance float64) *BankAccount {
	// TODO: initialize ownerName, accountNumber, and balance
	return &BankAccount{}
}

func (b *BankAccount) Deposit(amount float64) bool {
	// TODO: add amount to balance if amount > 0, return true if successful
	return false
}

func (b *BankAccount) Withdraw(amount float64) bool {
	// TODO: subtract amount from balance if balance >= amount, return true
	return false
}

func (b *BankAccount) DisplayAccount() {
	// TODO: print "ownerName (accountNumber) | Balance: $balance"
	// Hint: use fmt.Sprintf("$%.2f", balance) for formatting
	_ = fmt.Sprintf("$%.2f", b.balance)
}

type SavingsAccount struct {
	BankAccount
	interestRate float64
}

func NewSavingsAccount(ownerName string, accountNumber string, balance float64, interestRate float64) *SavingsAccount {
	// TODO: initialize interestRate
	return &SavingsAccount{}
}

func (s *SavingsAccount) Withdraw(amount float64) bool {
	// TODO: only allow if (balance - amount) >= 100 (minimum balance rule)
	return false
}

func (s *SavingsAccount) ApplyInterest() {
	// TODO: add (balance * interestRate / 100) to balance
}

type CheckingAccount struct {
	BankAccount
	overdraftLimit float64
}

func NewCheckingAccount(ownerName string, accountNumber string, balance float64, overdraftLimit float64) *CheckingAccount {
	// TODO: initialize overdraftLimit
	return &CheckingAccount{}
}

func (c *CheckingAccount) Withdraw(amount float64) bool {
	// TODO: allow if (balance + overdraftLimit) >= amount
	return false
}

func main() {
	savings := NewSavingsAccount("Alice", "SAV-001", 1000, 2.0)
	savings.DisplayAccount()
	fmt.Println("Withdraw $950:", savings.Withdraw(950))
	savings.ApplyInterest()
	savings.DisplayAccount()

	fmt.Println()

	checking := NewCheckingAccount("Bob", "CHK-002", 500, 300)
	checking.DisplayAccount()
	fmt.Println("Withdraw $700:", checking.Withdraw(700))
	checking.DisplayAccount()
}
```

```csharp
using System;

public class BankAccount
{
    protected string OwnerName;
    protected string AccountNumber;
    protected double Balance;

    public BankAccount(string ownerName, string accountNumber, double balance)
    {
        // TODO: initialize OwnerName, AccountNumber, and Balance
    }

    public bool Deposit(double amount)
    {
        // TODO: add amount to Balance if amount > 0, return true if successful
        return false;
    }

    public virtual bool Withdraw(double amount)
    {
        // TODO: subtract amount from Balance if Balance >= amount, return true
        return false;
    }

    public void DisplayAccount()
    {
        // TODO: print "OwnerName (AccountNumber) | Balance: $Balance"
        // Hint: use $"{Balance:F2}" for formatting
    }
}

public class SavingsAccount : BankAccount
{
    private double _interestRate;

    public SavingsAccount(string ownerName, string accountNumber,
                          double balance, double interestRate)
        : base(ownerName, accountNumber, balance)
    {
        // TODO: initialize _interestRate
    }

    public override bool Withdraw(double amount)
    {
        // TODO: only allow if (Balance - amount) >= 100
        return false;
    }

    public void ApplyInterest()
    {
        // TODO: add (Balance * _interestRate / 100) to Balance
    }
}

public class CheckingAccount : BankAccount
{
    private double _overdraftLimit;

    public CheckingAccount(string ownerName, string accountNumber,
                           double balance, double overdraftLimit)
        : base(ownerName, accountNumber, balance)
    {
        // TODO: initialize _overdraftLimit
    }

    public override bool Withdraw(double amount)
    {
        // TODO: allow if (Balance + _overdraftLimit) >= amount
        return false;
    }
}

public class Program
{
    public static void Main()
    {
        var savings = new SavingsAccount("Alice", "SAV-001", 1000, 2.0);
        savings.DisplayAccount();
        Console.WriteLine("Withdraw $950: " + savings.Withdraw(950).ToString().ToLower());
        savings.ApplyInterest();
        savings.DisplayAccount();

        Console.WriteLine();

        var checking = new CheckingAccount("Bob", "CHK-002", 500, 300);
        checking.DisplayAccount();
        Console.WriteLine("Withdraw $700: " + checking.Withdraw(700).ToString().ToLower());
        checking.DisplayAccount();
    }
}
```

```typescript
class BankAccount {
    protected ownerName: string;
    protected accountNumber: string;
    protected balance: number;

    constructor(ownerName: string, accountNumber: string, balance: number) {
        // TODO: initialize using the constructor parameters
        this.ownerName = "";
        this.accountNumber = "";
        this.balance = 0;
    }

    deposit(amount: number): boolean {
        // TODO: add amount to balance if amount > 0, return true if successful
        return false;
    }

    withdraw(amount: number): boolean {
        // TODO: subtract amount from balance if balance >= amount, return true
        return false;
    }

    displayAccount(): void {
        // TODO: print "ownerName (accountNumber) | Balance: $balance"
        // Hint: use this.balance.toFixed(2) for formatting
    }
}

class SavingsAccount extends BankAccount {
    private interestRate: number;

    constructor(ownerName: string, accountNumber: string,
                balance: number, interestRate: number) {
        super(ownerName, accountNumber, balance);
        // TODO: initialize this.interestRate using the parameter
        this.interestRate = 0;
    }

    withdraw(amount: number): boolean {
        // TODO: only allow if (balance - amount) >= 100
        return false;
    }

    applyInterest(): void {
        // TODO: add (balance * interestRate / 100) to balance
    }
}

class CheckingAccount extends BankAccount {
    private overdraftLimit: number;

    constructor(ownerName: string, accountNumber: string,
                balance: number, overdraftLimit: number) {
        super(ownerName, accountNumber, balance);
        // TODO: initialize this.overdraftLimit using the parameter
        this.overdraftLimit = 0;
    }

    withdraw(amount: number): boolean {
        // TODO: allow if (balance + overdraftLimit) >= amount
        return false;
    }
}

const savings = new SavingsAccount("Alice", "SAV-001", 1000, 2.0);
savings.displayAccount();
console.log("Withdraw $950: " + savings.withdraw(950));
savings.applyInterest();
savings.displayAccount();

console.log();

const checking = new CheckingAccount("Bob", "CHK-002", 500, 300);
checking.displayAccount();
console.log("Withdraw $700: " + checking.withdraw(700));
checking.displayAccount();
```

#### Solutions

```java
class BankAccount {
    protected String ownerName;
    protected String accountNumber;
    protected double balance;

    public BankAccount(String ownerName, String accountNumber, double balance) {
        this.ownerName = ownerName;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    public boolean deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            return true;
        }
        return false;
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public void displayAccount() {
        System.out.println(ownerName + " (" + accountNumber + ") | Balance: "
            + String.format("$%.2f", balance));
    }
}

class SavingsAccount extends BankAccount {
    private double interestRate;

    public SavingsAccount(String ownerName, String accountNumber,
                          double balance, double interestRate) {
        super(ownerName, accountNumber, balance);
        this.interestRate = interestRate;
    }

    @Override
    public boolean withdraw(double amount) {
        if (amount > 0 && (balance - amount) >= 100) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public void applyInterest() {
        balance += balance * interestRate / 100;
    }
}

class CheckingAccount extends BankAccount {
    private double overdraftLimit;

    public CheckingAccount(String ownerName, String accountNumber,
                           double balance, double overdraftLimit) {
        super(ownerName, accountNumber, balance);
        this.overdraftLimit = overdraftLimit;
    }

    @Override
    public boolean withdraw(double amount) {
        if (amount > 0 && (balance + overdraftLimit) >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        SavingsAccount savings = new SavingsAccount("Alice", "SAV-001", 1000, 2.0);
        savings.displayAccount();
        System.out.println("Withdraw $950: " + savings.withdraw(950));
        savings.applyInterest();
        savings.displayAccount();

        System.out.println();

        CheckingAccount checking = new CheckingAccount("Bob", "CHK-002", 500, 300);
        checking.displayAccount();
        System.out.println("Withdraw $700: " + checking.withdraw(700));
        checking.displayAccount();
    }
}
```

```python
class BankAccount:
    def __init__(self, owner_name: str, account_number: str, balance: float):
        self._owner_name = owner_name
        self._account_number = account_number
        self._balance = balance

    def deposit(self, amount: float) -> bool:
        if amount > 0:
            self._balance += amount
            return True
        return False

    def withdraw(self, amount: float) -> bool:
        if amount > 0 and self._balance >= amount:
            self._balance -= amount
            return True
        return False

    def display_account(self):
        print(f"{self._owner_name} ({self._account_number}) | Balance: ${self._balance:.2f}")

class SavingsAccount(BankAccount):
    def __init__(self, owner_name: str, account_number: str,
                 balance: float, interest_rate: float):
        super().__init__(owner_name, account_number, balance)
        self._interest_rate = interest_rate

    def withdraw(self, amount: float) -> bool:
        if amount > 0 and (self._balance - amount) >= 100:
            self._balance -= amount
            return True
        return False

    def apply_interest(self):
        self._balance += self._balance * self._interest_rate / 100

class CheckingAccount(BankAccount):
    def __init__(self, owner_name: str, account_number: str,
                 balance: float, overdraft_limit: float):
        super().__init__(owner_name, account_number, balance)
        self._overdraft_limit = overdraft_limit

    def withdraw(self, amount: float) -> bool:
        if amount > 0 and (self._balance + self._overdraft_limit) >= amount:
            self._balance -= amount
            return True
        return False

if __name__ == "__main__":
    savings = SavingsAccount("Alice", "SAV-001", 1000, 2.0)
    savings.display_account()
    print(f"Withdraw $950: {str(savings.withdraw(950)).lower()}")
    savings.apply_interest()
    savings.display_account()

    print()

    checking = CheckingAccount("Bob", "CHK-002", 500, 300)
    checking.display_account()
    print(f"Withdraw $700: {str(checking.withdraw(700)).lower()}")
    checking.display_account()
```

```cpp
#include <iostream>
#include <string>
#include <cstdio>

using namespace std;

class BankAccount {
protected:
    string ownerName;
    string accountNumber;
    double balance;

public:
    BankAccount(const string& ownerName, const string& accountNumber,
                double balance)
        : ownerName(ownerName), accountNumber(accountNumber), balance(balance) {}

    virtual ~BankAccount() {}

    bool deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            return true;
        }
        return false;
    }

    virtual bool withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    void displayAccount() {
        char buf[32];
        sprintf(buf, "$%.2f", balance);
        cout << ownerName << " (" << accountNumber << ") | Balance: "
             << buf << endl;
    }
};

class SavingsAccount : public BankAccount {
private:
    double interestRate;

public:
    SavingsAccount(const string& ownerName, const string& accountNumber,
                   double balance, double interestRate)
        : BankAccount(ownerName, accountNumber, balance), interestRate(interestRate) {}

    bool withdraw(double amount) override {
        if (amount > 0 && (balance - amount) >= 100) {
            balance -= amount;
            return true;
        }
        return false;
    }

    void applyInterest() {
        balance += balance * interestRate / 100;
    }
};

class CheckingAccount : public BankAccount {
private:
    double overdraftLimit;

public:
    CheckingAccount(const string& ownerName, const string& accountNumber,
                    double balance, double overdraftLimit)
        : BankAccount(ownerName, accountNumber, balance), overdraftLimit(overdraftLimit) {}

    bool withdraw(double amount) override {
        if (amount > 0 && (balance + overdraftLimit) >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }
};

int main() {
    SavingsAccount savings("Alice", "SAV-001", 1000, 2.0);
    savings.displayAccount();
    cout << "Withdraw $950: " << (savings.withdraw(950) " "true" : "false") << endl;
    savings.applyInterest();
    savings.displayAccount();

    cout << endl;

    CheckingAccount checking("Bob", "CHK-002", 500, 300);
    checking.displayAccount();
    cout << "Withdraw $700: " << (checking.withdraw(700) " "true" : "false") << endl;
    checking.displayAccount();

    return 0;
}
```

```go
package main

import (
	"fmt"
)

type BankAccount struct {
	ownerName     string
	accountNumber string
	balance       float64
}

func NewBankAccount(ownerName, accountNumber string, balance float64) *BankAccount {
	return &BankAccount{
		ownerName:     ownerName,
		accountNumber: accountNumber,
		balance:       balance,
	}
}

func (b *BankAccount) Deposit(amount float64) bool {
	if amount > 0 {
		b.balance += amount
		return true
	}
	return false
}

func (b *BankAccount) Withdraw(amount float64) bool {
	if amount > 0 && b.balance >= amount {
		b.balance -= amount
		return true
	}
	return false
}

func (b *BankAccount) DisplayAccount() {
	fmt.Printf("%s (%s) | Balance: $%.2f\n", b.ownerName, b.accountNumber, b.balance)
}

type SavingsAccount struct {
	*BankAccount
	interestRate float64
}

func NewSavingsAccount(ownerName, accountNumber string, balance, interestRate float64) *SavingsAccount {
	return &SavingsAccount{
		BankAccount:  NewBankAccount(ownerName, accountNumber, balance),
		interestRate: interestRate,
	}
}

func (s *SavingsAccount) Withdraw(amount float64) bool {
	if amount > 0 && (s.balance-amount) >= 100 {
		s.balance -= amount
		return true
	}
	return false
}

func (s *SavingsAccount) ApplyInterest() {
	s.balance += s.balance * s.interestRate / 100
}

type CheckingAccount struct {
	*BankAccount
	overdraftLimit float64
}

func NewCheckingAccount(ownerName, accountNumber string, balance, overdraftLimit float64) *CheckingAccount {
	return &CheckingAccount{
		BankAccount:    NewBankAccount(ownerName, accountNumber, balance),
		overdraftLimit: overdraftLimit,
	}
}

func (c *CheckingAccount) Withdraw(amount float64) bool {
	if amount > 0 && (c.balance+c.overdraftLimit) >= amount {
		c.balance -= amount
		return true
	}
	return false
}

func main() {
	savings := NewSavingsAccount("Alice", "SAV-001", 1000, 2.0)
	savings.DisplayAccount()
	fmt.Printf("Withdraw $950: %t\n", savings.Withdraw(950))
	savings.ApplyInterest()
	savings.DisplayAccount()

	fmt.Println()

	checking := NewCheckingAccount("Bob", "CHK-002", 500, 300)
	checking.DisplayAccount()
	fmt.Printf("Withdraw $700: %t\n", checking.Withdraw(700))
	checking.DisplayAccount()
}
```

```csharp
using System;

public class BankAccount
{
    protected string OwnerName;
    protected string AccountNumber;
    protected double Balance;

    public BankAccount(string ownerName, string accountNumber, double balance)
    {
        OwnerName = ownerName;
        AccountNumber = accountNumber;
        Balance = balance;
    }

    public bool Deposit(double amount)
    {
        if (amount > 0)
        {
            Balance += amount;
            return true;
        }
        return false;
    }

    public virtual bool Withdraw(double amount)
    {
        if (amount > 0 && Balance >= amount)
        {
            Balance -= amount;
            return true;
        }
        return false;
    }

    public void DisplayAccount()
    {
        Console.WriteLine($"{OwnerName} ({AccountNumber}) | Balance: ${Balance:F2}");
    }
}

public class SavingsAccount : BankAccount
{
    private double _interestRate;

    public SavingsAccount(string ownerName, string accountNumber,
                          double balance, double interestRate)
        : base(ownerName, accountNumber, balance)
    {
        _interestRate = interestRate;
    }

    public override bool Withdraw(double amount)
    {
        if (amount > 0 && (Balance - amount) >= 100)
        {
            Balance -= amount;
            return true;
        }
        return false;
    }

    public void ApplyInterest()
    {
        Balance += Balance * _interestRate / 100;
    }
}

public class CheckingAccount : BankAccount
{
    private double _overdraftLimit;

    public CheckingAccount(string ownerName, string accountNumber,
                           double balance, double overdraftLimit)
        : base(ownerName, accountNumber, balance)
    {
        _overdraftLimit = overdraftLimit;
    }

    public override bool Withdraw(double amount)
    {
        if (amount > 0 && (Balance + _overdraftLimit) >= amount)
        {
            Balance -= amount;
            return true;
        }
        return false;
    }
}

public class Program
{
    public static void Main()
    {
        var savings = new SavingsAccount("Alice", "SAV-001", 1000, 2.0);
        savings.DisplayAccount();
        Console.WriteLine("Withdraw $950: " + savings.Withdraw(950).ToString().ToLower());
        savings.ApplyInterest();
        savings.DisplayAccount();

        Console.WriteLine();

        var checking = new CheckingAccount("Bob", "CHK-002", 500, 300);
        checking.DisplayAccount();
        Console.WriteLine("Withdraw $700: " + checking.Withdraw(700).ToString().ToLower());
        checking.DisplayAccount();
    }
}
```

```typescript
class BankAccount {
    protected ownerName: string;
    protected accountNumber: string;
    protected balance: number;

    constructor(ownerName: string, accountNumber: string, balance: number) {
        this.ownerName = ownerName;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    deposit(amount: number): boolean {
        if (amount > 0) {
            this.balance += amount;
            return true;
        }
        return false;
    }

    withdraw(amount: number): boolean {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    displayAccount(): void {
        console.log(`${this.ownerName} (${this.accountNumber}) | Balance: $${this.balance.toFixed(2)}`);
    }
}

class SavingsAccount extends BankAccount {
    private interestRate: number;

    constructor(ownerName: string, accountNumber: string,
                balance: number, interestRate: number) {
        super(ownerName, accountNumber, balance);
        this.interestRate = interestRate;
    }

    withdraw(amount: number): boolean {
        if (amount > 0 && (this.balance - amount) >= 100) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    applyInterest(): void {
        this.balance += this.balance * this.interestRate / 100;
    }
}

class CheckingAccount extends BankAccount {
    private overdraftLimit: number;

    constructor(ownerName: string, accountNumber: string,
                balance: number, overdraftLimit: number) {
        super(ownerName, accountNumber, balance);
        this.overdraftLimit = overdraftLimit;
    }

    withdraw(amount: number): boolean {
        if (amount > 0 && (this.balance + this.overdraftLimit) >= amount) {
            this.balance -= amount;
            return true;
        }
        return false;
    }
}

const savings = new SavingsAccount("Alice", "SAV-001", 1000, 2.0);
savings.displayAccount();
console.log("Withdraw $950: " + savings.withdraw(950));
savings.applyInterest();
savings.displayAccount();

console.log();

const checking = new CheckingAccount("Bob", "CHK-002", 500, 300);
checking.displayAccount();
console.log("Withdraw $700: " + checking.withdraw(700));
checking.displayAccount();
```

---

# Exercise 2: Shape Hierarchy

**Problem:** Build a shape hierarchy where the base class provides a shared `describe()` method, and each child class implements its own `area()` and `perimeter()` methods.

**Requirements:**

- Base `Shape` class with a `name` field (protected). A `describe()` method that prints "Shape: [name], Area: [area], Perimeter: [perimeter]". Abstract-like `area()` and `perimeter()` methods that return 0 by default.
- `Circle`: takes a `radius`. Area = pi *r^2, Perimeter = 2 *pi * r.
- `Rectangle`: takes `width` and `height`. Area = w *h, Perimeter = 2 *(w + h).
- `describe()` should work for any shape without modification because it calls `area()` and `perimeter()` internally.

```java
class Shape {
    protected String name;

    public Shape(String name) {
        this.name = name;
    }

    public double area() {
        // TODO: return 0 by default
        return 0;
    }

    public double perimeter() {
        // TODO: return 0 by default
        return 0;
    }

    public void describe() {
        // TODO: print "Shape: name, Area: area, Perimeter: perimeter"
        // Hint: use String.format("%.2f", value) for formatting
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        super("Circle");
        // TODO: initialize this.radius
    }

    @Override
    public double area() {
        // TODO: return Math.PI * radius * radius
        return 0;
    }

    @Override
    public double perimeter() {
        // TODO: return 2 * Math.PI * radius
        return 0;
    }
}

class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        super("Rectangle");
        // TODO: initialize this.width and this.height
    }

    @Override
    public double area() {
        // TODO: return width * height
        return 0;
    }

    @Override
    public double perimeter() {
        // TODO: return 2 * (width + height)
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Circle circle = new Circle(5.0);
        circle.describe();

        Rectangle rect = new Rectangle(4.0, 6.0);
        rect.describe();
    }
}
```

```python
import math

class Shape:
    def __init__(self, name: str):
        self._name = name

    def area(self) -> float:
        # TODO: return 0 by default
        return 0

    def perimeter(self) -> float:
        # TODO: return 0 by default
        return 0

    def describe(self):
        # TODO: print "Shape: name, Area: area, Perimeter: perimeter"
        # Hint: use f"{value:.2f}" for formatting
        pass

class Circle(Shape):
    def __init__(self, radius: float):
        super().__init__("Circle")
        # TODO: initialize self._radius

    def area(self) -> float:
        # TODO: return math.pi * radius * radius
        return 0

    def perimeter(self) -> float:
        # TODO: return 2 * math.pi * radius
        return 0

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        super().__init__("Rectangle")
        # TODO: initialize self._width and self._height

    def area(self) -> float:
        # TODO: return width * height
        return 0

    def perimeter(self) -> float:
        # TODO: return 2 * (width + height)
        return 0

if __name__ == "__main__":
    circle = Circle(5.0)
    circle.describe()

    rect = Rectangle(4.0, 6.0)
    rect.describe()
```

```cpp
#include <iostream>
#include <string>
#include <cmath>
#include <cstdio>

using namespace std;

class Shape {
protected:
    string name;

public:
    Shape(const string& name) : name(name) {}
    virtual ~Shape() {}

    virtual double area() {
        // TODO: return 0 by default
        return 0;
    }

    virtual double perimeter() {
        // TODO: return 0 by default
        return 0;
    }

    void describe() {
        // TODO: print "Shape: name, Area: area, Perimeter: perimeter"
        // Hint: use printf("%.2f", value) for formatting
    }
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double radius) : Shape("Circle") {
        // TODO: initialize this->radius
    }

    double area() override {
        // TODO: return M_PI * radius * radius
        return 0;
    }

    double perimeter() override {
        // TODO: return 2 * M_PI * radius
        return 0;
    }
};

class Rectangle : public Shape {
private:
    double width;
    double height;

public:
    Rectangle(double width, double height) : Shape("Rectangle") {
        // TODO: initialize this->width and this->height
    }

    double area() override {
        // TODO: return width * height
        return 0;
    }

    double perimeter() override {
        // TODO: return 2 * (width + height)
        return 0;
    }
};

int main() {
    Circle circle(5.0);
    circle.describe();

    Rectangle rect(4.0, 6.0);
    rect.describe();

    return 0;
}
```

```go
package main

import "fmt"

type Shape struct {
	name string
}

func NewShape(name string) *Shape {
	return &Shape{name: name}
}

func (s *Shape) Area() float64 {
	// TODO: return 0 by default
	return 0
}

func (s *Shape) Perimeter() float64 {
	// TODO: return 0 by default
	return 0
}

func (s *Shape) Describe() {
	// TODO: print "Shape: name, Area: area, Perimeter: perimeter"
	// Hint: use fmt.Sprintf("%.2f", value) for formatting
	_ = fmt.Sprintf("Shape: %s, Area: %.2f, Perimeter: %.2f", s.name, s.Area(), s.Perimeter())
}

type Circle struct {
	Shape
	radius float64
}

func NewCircle(radius float64) *Circle {
	c := &Circle{
		Shape: NewShape("Circle"),
	}
	// TODO: initialize this.radius
	return c
}

func (c *Circle) Area() float64 {
	// TODO: return math.Pi * radius * radius
	return 0
}

func (c *Circle) Perimeter() float64 {
	// TODO: return 2 * math.Pi * radius
	return 0
}

type Rectangle struct {
	Shape
	width  float64
	height float64
}

func NewRectangle(width float64, height float64) *Rectangle {
	r := &Rectangle{
		Shape: NewShape("Rectangle"),
	}
	// TODO: initialize this.width and this.height
	return r
}

func (r *Rectangle) Area() float64 {
	// TODO: return width * height
	return 0
}

func (r *Rectangle) Perimeter() float64 {
	// TODO: return 2 * (width + height)
	return 0
}

func main() {
	circle := NewCircle(5.0)
	circle.Describe()

	rect := NewRectangle(4.0, 6.0)
	rect.Describe()
}
```

```csharp
using System;

public class Shape
{
    protected string Name;

    public Shape(string name) { Name = name; }

    public virtual double Area()
    {
        // TODO: return 0 by default
        return 0;
    }

    public virtual double Perimeter()
    {
        // TODO: return 0 by default
        return 0;
    }

    public void Describe()
    {
        // TODO: print "Shape: Name, Area: area, Perimeter: perimeter"
        // Hint: use $"{value:F2}" for formatting
    }
}

public class Circle : Shape
{
    private double _radius;

    public Circle(double radius) : base("Circle")
    {
        // TODO: initialize _radius
    }

    public override double Area()
    {
        // TODO: return Math.PI * _radius * _radius
        return 0;
    }

    public override double Perimeter()
    {
        // TODO: return 2 * Math.PI * _radius
        return 0;
    }
}

public class Rectangle : Shape
{
    private double _width;
    private double _height;

    public Rectangle(double width, double height) : base("Rectangle")
    {
        // TODO: initialize _width and _height
    }

    public override double Area()
    {
        // TODO: return _width * _height
        return 0;
    }

    public override double Perimeter()
    {
        // TODO: return 2 * (_width + _height)
        return 0;
    }
}

public class Program
{
    public static void Main()
    {
        var circle = new Circle(5.0);
        circle.Describe();

        var rect = new Rectangle(4.0, 6.0);
        rect.Describe();
    }
}
```

```typescript
class Shape {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    area(): number {
        // TODO: return 0 by default
        return 0;
    }

    perimeter(): number {
        // TODO: return 0 by default
        return 0;
    }

    describe(): void {
        // TODO: print "Shape: name, Area: area, Perimeter: perimeter"
        // Hint: use value.toFixed(2) for formatting
    }
}

class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super("Circle");
        // TODO: initialize this.radius using the parameter
        this.radius = 0;
    }

    area(): number {
        // TODO: return Math.PI * radius * radius
        return 0;
    }

    perimeter(): number {
        // TODO: return 2 * Math.PI * radius
        return 0;
    }
}

class Rectangle extends Shape {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        super("Rectangle");
        // TODO: initialize this.width and this.height using the parameters
        this.width = 0;
        this.height = 0;
    }

    area(): number {
        // TODO: return width * height
        return 0;
    }

    perimeter(): number {
        // TODO: return 2 * (width + height)
        return 0;
    }
}

const circle = new Circle(5.0);
circle.describe();

const rect = new Rectangle(4.0, 6.0);
rect.describe();
```

#### Solutions

```java
class Shape {
    protected String name;

    public Shape(String name) {
        this.name = name;
    }

    public double area() {
        return 0;
    }

    public double perimeter() {
        return 0;
    }

    public void describe() {
        System.out.println("Shape: " + name + ", Area: "
            + String.format("%.2f", area()) + ", Perimeter: "
            + String.format("%.2f", perimeter()));
    }
}

class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        super("Circle");
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }

    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}

public class Main {
    public static void main(String[] args) {
        Circle circle = new Circle(5.0);
        circle.describe();

        Rectangle rect = new Rectangle(4.0, 6.0);
        rect.describe();
    }
}
```

```python
import math

class Shape:
    def __init__(self, name: str):
        self._name = name

    def area(self) -> float:
        return 0

    def perimeter(self) -> float:
        return 0

    def describe(self):
        print(f"Shape: {self._name}, Area: {self.area():.2f}, Perimeter: {self.perimeter():.2f}")

class Circle(Shape):
    def __init__(self, radius: float):
        super().__init__("Circle")
        self._radius = radius

    def area(self) -> float:
        return math.pi * self._radius * self._radius

    def perimeter(self) -> float:
        return 2 * math.pi * self._radius

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        super().__init__("Rectangle")
        self._width = width
        self._height = height

    def area(self) -> float:
        return self._width * self._height

    def perimeter(self) -> float:
        return 2 * (self._width + self._height)

if __name__ == "__main__":
    circle = Circle(5.0)
    circle.describe()

    rect = Rectangle(4.0, 6.0)
    rect.describe()
```

```cpp
#include <iostream>
#include <string>
#include <cmath>
#include <cstdio>

using namespace std;

class Shape {
protected:
    string name;

public:
    Shape(const string& name) : name(name) {}
    virtual ~Shape() {}

    virtual double area() {
        return 0;
    }

    virtual double perimeter() {
        return 0;
    }

    void describe() {
        printf("Shape: %s, Area: %.2f, Perimeter: %.2f\n",
               name.c_str(), area(), perimeter());
    }
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double radius) : Shape("Circle"), radius(radius) {}

    double area() override {
        return M_PI * radius * radius;
    }

    double perimeter() override {
        return 2 * M_PI * radius;
    }
};

class Rectangle : public Shape {
private:
    double width;
    double height;

public:
    Rectangle(double width, double height)
        : Shape("Rectangle"), width(width), height(height) {}

    double area() override {
        return width * height;
    }

    double perimeter() override {
        return 2 * (width + height);
    }
};

int main() {
    Circle circle(5.0);
    circle.describe();

    Rectangle rect(4.0, 6.0);
    rect.describe();

    return 0;
}
```

```go
package main

import (
	"fmt"
	"math"
)

type Shape struct {
	name string
}

func NewShape(name string) *Shape {
	return &Shape{name: name}
}

func (s *Shape) Area() float64 {
	return 0
}

func (s *Shape) Perimeter() float64 {
	return 0
}

func (s *Shape) Describe() {
	fmt.Printf("Shape: %s, Area: %.2f, Perimeter: %.2f\n", s.name, s.Area(), s.Perimeter())
}

type Circle struct {
	*Shape
	radius float64
}

func NewCircle(radius float64) *Circle {
	return &Circle{
		Shape:  NewShape("Circle"),
		radius: radius,
	}
}

func (c *Circle) Area() float64 {
	return math.Pi * c.radius * c.radius
}

func (c *Circle) Perimeter() float64 {
	return 2 * math.Pi * c.radius
}

type Rectangle struct {
	*Shape
	width  float64
	height float64
}

func NewRectangle(width float64, height float64) *Rectangle {
	return &Rectangle{
		Shape:  NewShape("Rectangle"),
		width:  width,
		height: height,
	}
}

func (r *Rectangle) Area() float64 {
	return r.width * r.height
}

func (r *Rectangle) Perimeter() float64 {
	return 2 * (r.width + r.height)
}

func main() {
	circle := NewCircle(5.0)
	circle.Describe()

	rect := NewRectangle(4.0, 6.0)
	rect.Describe()
}
```

```csharp
using System;

public class Shape
{
    protected string Name;

    public Shape(string name) { Name = name; }

    public virtual double Area()
    {
        return 0;
    }

    public virtual double Perimeter()
    {
        return 0;
    }

    public void Describe()
    {
        Console.WriteLine($"Shape: {Name}, Area: {Area():F2}, Perimeter: {Perimeter():F2}");
    }
}

public class Circle : Shape
{
    private double _radius;

    public Circle(double radius) : base("Circle")
    {
        _radius = radius;
    }

    public override double Area()
    {
        return Math.PI * _radius * _radius;
    }

    public override double Perimeter()
    {
        return 2 * Math.PI * _radius;
    }
}

public class Rectangle : Shape
{
    private double _width;
    private double _height;

    public Rectangle(double width, double height) : base("Rectangle")
    {
        _width = width;
        _height = height;
    }

    public override double Area()
    {
        return _width * _height;
    }

    public override double Perimeter()
    {
        return 2 * (_width + _height);
    }
}

public class Program
{
    public static void Main()
    {
        var circle = new Circle(5.0);
        circle.Describe();

        var rect = new Rectangle(4.0, 6.0);
        rect.Describe();
    }
}
```

```typescript
class Shape {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    area(): number {
        return 0;
    }

    perimeter(): number {
        return 0;
    }

    describe(): void {
        console.log(`Shape: ${this.name}, Area: ${this.area().toFixed(2)}, Perimeter: ${this.perimeter().toFixed(2)}`);
    }
}

class Circle extends Shape {
    private radius: number;

    constructor(radius: number) {
        super("Circle");
        this.radius = radius;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle extends Shape {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }

    area(): number {
        return this.width * this.height;
    }

    perimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const circle = new Circle(5.0);
circle.describe();

const rect = new Rectangle(4.0, 6.0);
rect.describe();
```


