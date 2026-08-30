---
id: "lld-oop-fundamentals-exercise-classes-and-objects"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - OOP Fundamentals"
subSection: ""
title: "Exercise: Classes and Objects"
slug: "lld-oop-fundamentals-exercise-classes-and-objects"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Classes and Objects as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Classes and Objects Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","OOP Fundamentals","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Bank Account

**Problem:** Create a `BankAccount` class that manages a simple bank account with deposit, withdrawal, and balance checking functionality.

**Requirements:**

- Fields: `accountNumber`, `ownerName`, `balance`
- Constructor that initializes the account with owner name and account number (balance starts at 0)
- `deposit(amount)`: adds money to balance (only positive amounts)
- `withdraw(amount)`: removes money if sufficient balance exists, returns success/failure
- `getBalance()`: returns current balance

```java
class BankAccount {
    // Add private fields: accountNumber (String), ownerName (String), balance (double)

    public BankAccount(String accountNumber, String ownerName) {
        // Initialize fields. Balance should start at 0.
    }

    public void deposit(double amount) {
        // Add amount to balance (only if amount is positive)
    }

    public boolean withdraw(double amount) {
        // Remove amount from balance if sufficient funds exist
        // Return true if successful, false otherwise
        return false;
    }

    public double getBalance() {
        // Return the current balance
        return 0;
    }
}

// Test your implementation
public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("123456", "John Doe");
        account.deposit(1000);
        System.out.println(account.getBalance());  // Should print 1000.0

        boolean success = account.withdraw(500);
        System.out.println(success);               // Should print true
        System.out.println(account.getBalance());  // Should print 500.0

        success = account.withdraw(1000);
        System.out.println(success);               // Should print false
    }
}
```

```python
class BankAccount:
    def __init__(self, account_number: str, owner_name: str):
        # Initialize fields: account_number, owner_name, balance (starts at 0)
        pass

    def deposit(self, amount: float) -> None:
        # Add amount to balance (only if amount is positive)
        pass

    def withdraw(self, amount: float) -> bool:
        # Remove amount from balance if sufficient funds exist
        # Return True if successful, False otherwise
        return False

    def get_balance(self) -> float:
        # Return the current balance
        return 0

if __name__ == "__main__":
    account = BankAccount("123456", "John Doe")
    account.deposit(1000)
    print(account.get_balance())  # Should print 1000.0

    success = account.withdraw(500)
    print(str(success).lower())   # Should print true
    print(account.get_balance())  # Should print 500.0

    success = account.withdraw(1000)
    print(str(success).lower())   # Should print false
```

```cpp
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

class BankAccount {
private:
    // Add private fields: accountNumber (string), ownerName (string), balance (double)

public:
    BankAccount(const string& accountNumber, const string& ownerName) {
        // Initialize fields. Balance should start at 0.
    }

    void deposit(double amount) {
        // Add amount to balance (only if amount is positive)
    }

    bool withdraw(double amount) {
        // Remove amount from balance if sufficient funds exist
        // Return true if successful, false otherwise
        return false;
    }

    double getBalance() const {
        // Return the current balance
        return 0;
    }
};

int main() {
    BankAccount account("123456", "John Doe");
    account.deposit(1000);
    cout << fixed << setprecision(1) << account.getBalance() << endl;  // Should print 1000.0

    bool success = account.withdraw(500);
    cout << boolalpha << success << endl;  // Should print true
    cout << fixed << setprecision(1) << account.getBalance() << endl;  // Should print 500.0

    success = account.withdraw(1000);
    cout << boolalpha << success << endl;  // Should print false

    return 0;
}
```

```go
package main

import "fmt"

type BankAccount struct {
	// Add private fields: accountNumber (string), ownerName (string), balance (float64)
}

func NewBankAccount(accountNumber string, ownerName string) *BankAccount {
	// Initialize fields. Balance should start at 0.
	return &BankAccount{}
}

func (b *BankAccount) Deposit(amount float64) {
	// Add amount to balance (only if amount is positive)
}

func (b *BankAccount) Withdraw(amount float64) bool {
	// Remove amount from balance if sufficient funds exist
	// Return true if successful, false otherwise
	return false
}

func (b *BankAccount) GetBalance() float64 {
	// Return the current balance
	return 0
}

// Test your implementation
func main() {
	account := NewBankAccount("123456", "John Doe")
	account.Deposit(1000)
	fmt.Printf("%.1f\n", account.GetBalance()) // Should print 1000.0

	success := account.Withdraw(500)
	fmt.Println(success)                      // Should print true
	fmt.Printf("%.1f\n", account.GetBalance()) // Should print 500.0

	success = account.Withdraw(1000)
	fmt.Println(success) // Should print false
}
```

```csharp
using System;

public class BankAccount
{
    // Add private fields: _accountNumber (string), _ownerName (string), _balance (double)

    public BankAccount(string accountNumber, string ownerName)
    {
        // Initialize fields. Balance should start at 0.
    }

    public void Deposit(double amount)
    {
        // Add amount to balance (only if amount is positive)
    }

    public bool Withdraw(double amount)
    {
        // Remove amount from balance if sufficient funds exist
        // Return true if successful, false otherwise
        return false;
    }

    public double GetBalance()
    {
        // Return the current balance
        return 0;
    }
}

public class Program
{
    public static void Main()
    {
        var account = new BankAccount("123456", "John Doe");
        account.Deposit(1000);
        Console.WriteLine($"{account.GetBalance():F1}");  // Should print 1000.0

        bool success = account.Withdraw(500);
        Console.WriteLine(success.ToString().ToLower());  // Should print true
        Console.WriteLine($"{account.GetBalance():F1}");  // Should print 500.0

        success = account.Withdraw(1000);
        Console.WriteLine(success.ToString().ToLower());  // Should print false
    }
}
```

```typescript
class BankAccount {
    // Add private fields: accountNumber (string), ownerName (string), balance (number)

    constructor(accountNumber: string, ownerName: string) {
        // Initialize fields. Balance should start at 0.
    }

    deposit(amount: number): void {
        // Add amount to balance (only if amount is positive)
    }

    withdraw(amount: number): boolean {
        // Remove amount from balance if sufficient funds exist
        // Return true if successful, false otherwise
        return false;
    }

    getBalance(): number {
        // Return the current balance
        return 0;
    }
}

// Test your implementation
const account = new BankAccount("123456", "John Doe");
account.deposit(1000);
console.log(account.getBalance().toFixed(1));  // Should print 1000.0

let success = account.withdraw(500);
console.log(success);                          // Should print true
console.log(account.getBalance().toFixed(1));  // Should print 500.0

success = account.withdraw(1000);
console.log(success);                          // Should print false
```

#### Solutions

```java
class BankAccount {
    private String accountNumber;
    private String ownerName;
    private double balance;

    public BankAccount(String accountNumber, String ownerName) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    public double getBalance() {
        return balance;
    }
}

public class Main {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("123456", "John Doe");
        account.deposit(1000);
        System.out.println(account.getBalance());

        boolean success = account.withdraw(500);
        System.out.println(success);
        System.out.println(account.getBalance());

        success = account.withdraw(1000);
        System.out.println(success);
    }
}
```

```python
class BankAccount:
    def __init__(self, account_number: str, owner_name: str):
        self._account_number = account_number
        self._owner_name = owner_name
        self._balance = 0.0

    def deposit(self, amount: float) -> None:
        if amount > 0:
            self._balance += amount

    def withdraw(self, amount: float) -> bool:
        if amount > 0 and self._balance >= amount:
            self._balance -= amount
            return True
        return False

    def get_balance(self) -> float:
        return self._balance

if __name__ == "__main__":
    account = BankAccount("123456", "John Doe")
    account.deposit(1000)
    print(account.get_balance())

    success = account.withdraw(500)
    print(str(success).lower())
    print(account.get_balance())

    success = account.withdraw(1000)
    print(str(success).lower())
```

```cpp
#include <iostream>
#include <iomanip>
#include <string>
using namespace std;

class BankAccount {
private:
    string accountNumber;
    string ownerName;
    double balance;

public:
    BankAccount(const string& accountNumber, const string& ownerName)
        : accountNumber(accountNumber), ownerName(ownerName), balance(0) {}

    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    bool withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    double getBalance() const {
        return balance;
    }
};

int main() {
    BankAccount account("123456", "John Doe");
    account.deposit(1000);
    cout << fixed << setprecision(1) << account.getBalance() << endl;

    bool success = account.withdraw(500);
    cout << boolalpha << success << endl;
    cout << fixed << setprecision(1) << account.getBalance() << endl;

    success = account.withdraw(1000);
    cout << boolalpha << success << endl;

    return 0;
}
```

```go
package main

import "fmt"

type BankAccount struct {
	accountNumber string
	ownerName     string
	balance       float64
}

func NewBankAccount(accountNumber, ownerName string) *BankAccount {
	return &BankAccount{
		accountNumber: accountNumber,
		ownerName:     ownerName,
		balance:       0,
	}
}

func (b *BankAccount) Deposit(amount float64) {
	if amount > 0 {
		b.balance += amount
	}
}

func (b *BankAccount) Withdraw(amount float64) bool {
	if amount > 0 && b.balance >= amount {
		b.balance -= amount
		return true
	}
	return false
}

func (b *BankAccount) GetBalance() float64 {
	return b.balance
}

func main() {
	account := NewBankAccount("123456", "John Doe")
	account.Deposit(1000)
	fmt.Printf("%.1f\n", account.GetBalance())

	success := account.Withdraw(500)
	fmt.Println(success)
	fmt.Printf("%.1f\n", account.GetBalance())

	success = account.Withdraw(1000)
	fmt.Println(success)
}
```

```csharp
using System;

public class BankAccount
{
    private string _accountNumber;
    private string _ownerName;
    private double _balance;

    public BankAccount(string accountNumber, string ownerName)
    {
        _accountNumber = accountNumber;
        _ownerName = ownerName;
        _balance = 0;
    }

    public void Deposit(double amount)
    {
        if (amount > 0)
        {
            _balance += amount;
        }
    }

    public bool Withdraw(double amount)
    {
        if (amount > 0 && _balance >= amount)
        {
            _balance -= amount;
            return true;
        }
        return false;
    }

    public double GetBalance()
    {
        return _balance;
    }
}

public class Program
{
    public static void Main()
    {
        var account = new BankAccount("123456", "John Doe");
        account.Deposit(1000);
        Console.WriteLine($"{account.GetBalance():F1}");

        bool success = account.Withdraw(500);
        Console.WriteLine(success.ToString().ToLower());
        Console.WriteLine($"{account.GetBalance():F1}");

        success = account.Withdraw(1000);
        Console.WriteLine(success.ToString().ToLower());
    }
}
```

```typescript
class BankAccount {
    private accountNumber: string;
    private ownerName: string;
    private balance: number;

    constructor(accountNumber: string, ownerName: string) {
        this.accountNumber = accountNumber;
        this.ownerName = ownerName;
        this.balance = 0;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }

    withdraw(amount: number): boolean {
        if (amount > 0 && this.balance >= amount) {
            this.balance -= amount;
            return true;
        }
        return false;
    }

    getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount("123456", "John Doe");
account.deposit(1000);
console.log(account.getBalance().toFixed(1));

let success = account.withdraw(500);
console.log(success);
console.log(account.getBalance().toFixed(1));

success = account.withdraw(1000);
console.log(success);
```

---

# Exercise 2: Library Book

**Problem:** Create a `Book` class for a library management system.

**Requirements:**

- Fields: `title`, `author`, `isbn`, `isAvailable`
- Constructor that initializes all fields (book starts as available)
- `borrowBook()`: marks book as unavailable if currently available, returns success/failure
- `returnBook()`: marks book as available
- `displayInfo()`: prints book details including availability status

```java
class Book {
    // Add private fields: title (String), author (String), isbn (String), isAvailable (boolean)

    public Book(String title, String author, String isbn) {
        // Initialize fields. Book starts as available.
    }

    public boolean borrowBook() {
        // Mark book as unavailable if currently available
        // Return true if successful, false if already borrowed
        return false;
    }

    public void returnBook() {
        // Mark book as available
    }

    public void displayInfo() {
        // Print: "Title by Author (ISBN: isbn) - Available" or "- Borrowed"
    }
}

// Test your implementation
public class Main {
    public static void main(String[] args) {
        Book book = new Book("The Pragmatic Programmer", "David Thomas", "978-0135957059");
        book.displayInfo();

        boolean success = book.borrowBook();
        System.out.println("Borrow successful: " + success);
        book.displayInfo();

        success = book.borrowBook();
        System.out.println("Borrow successful: " + success);

        book.returnBook();
        book.displayInfo();
    }
}
```

```python
class Book:
    def __init__(self, title: str, author: str, isbn: str):
        # Initialize fields: title, author, isbn, is_available (starts as True)
        pass

    def borrow_book(self) -> bool:
        # Mark book as unavailable if currently available
        # Return True if successful, False if already borrowed
        return False

    def return_book(self) -> None:
        # Mark book as available
        pass

    def display_info(self) -> None:
        # Print: "Title by Author (ISBN: isbn) - Available" or "- Borrowed"
        pass

if __name__ == "__main__":
    book = Book("The Pragmatic Programmer", "David Thomas", "978-0135957059")
    book.display_info()

    success = book.borrow_book()
    print(f"Borrow successful: {str(success).lower()}")
    book.display_info()

    success = book.borrow_book()
    print(f"Borrow successful: {str(success).lower()}")

    book.return_book()
    book.display_info()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Book {
private:
    // Add private fields: title (string), author (string), isbn (string), isAvailable (bool)

public:
    Book(const string& title, const string& author, const string& isbn) {
        // Initialize fields. Book starts as available.
    }

    bool borrowBook() {
        // Mark book as unavailable if currently available
        // Return true if successful, false if already borrowed
        return false;
    }

    void returnBook() {
        // Mark book as available
    }

    void displayInfo() const {
        // Print: "Title by Author (ISBN: isbn) - Available" or "- Borrowed"
    }
};

int main() {
    Book book("The Pragmatic Programmer", "David Thomas", "978-0135957059");
    book.displayInfo();

    bool success = book.borrowBook();
    cout << "Borrow successful: " << boolalpha << success << endl;
    book.displayInfo();

    success = book.borrowBook();
    cout << "Borrow successful: " << success << endl;

    book.returnBook();
    book.displayInfo();

    return 0;
}
```

```go
package main

import "fmt"

type Book struct {
	// Add private fields: title (string), author (string), isbn (string), isAvailable (bool)
}

func NewBook(title string, author string, isbn string) *Book {
	// Initialize fields. Book starts as available.
	return &Book{}
}

func (b *Book) BorrowBook() bool {
	// Mark book as unavailable if currently available
	// Return true if successful, false if already borrowed
	return false
}

func (b *Book) ReturnBook() {
	// Mark book as available
}

func (b *Book) DisplayInfo() {
	// Print: "Title by Author (ISBN: isbn) - Available" or "- Borrowed"
	fmt.Println()
}

func main() {
	book := NewBook("The Pragmatic Programmer", "David Thomas", "978-0135957059")
	book.DisplayInfo()

	success := book.BorrowBook()
	fmt.Printf("Borrow successful: %t\n", success)
	book.DisplayInfo()

	success = book.BorrowBook()
	fmt.Printf("Borrow successful: %t\n", success)

	book.ReturnBook()
	book.DisplayInfo()
}
```

```csharp
using System;

public class Book
{
    // Add private fields: _title (string), _author (string), _isbn (string), _isAvailable (bool)

    public Book(string title, string author, string isbn)
    {
        // Initialize fields. Book starts as available.
    }

    public bool BorrowBook()
    {
        // Mark book as unavailable if currently available
        // Return true if successful, false if already borrowed
        return false;
    }

    public void ReturnBook()
    {
        // Mark book as available
    }

    public void DisplayInfo()
    {
        // Print: "Title by Author (ISBN: isbn) - Available" or "- Borrowed"
    }
}

public class Program
{
    public static void Main()
    {
        var book = new Book("The Pragmatic Programmer", "David Thomas", "978-0135957059");
        book.DisplayInfo();

        bool success = book.BorrowBook();
        Console.WriteLine($"Borrow successful: {success.ToString().ToLower()}");
        book.DisplayInfo();

        success = book.BorrowBook();
        Console.WriteLine($"Borrow successful: {success.ToString().ToLower()}");

        book.ReturnBook();
        book.DisplayInfo();
    }
}
```

```typescript
class Book {
    // Add private fields: title (string), author (string), isbn (string), isAvailable (boolean)

    constructor(title: string, author: string, isbn: string) {
        // Initialize fields. Book starts as available.
    }

    borrowBook(): boolean {
        // Mark book as unavailable if currently available
        // Return true if successful, false if already borrowed
        return false;
    }

    returnBook(): void {
        // Mark book as available
    }

    displayInfo(): void {
        // Print: "Title by Author (ISBN: isbn) - Available" or "- Borrowed"
    }
}

// Test your implementation
const book = new Book("The Pragmatic Programmer", "David Thomas", "978-0135957059");
book.displayInfo();

let success = book.borrowBook();
console.log(`Borrow successful: ${success}`);
book.displayInfo();

success = book.borrowBook();
console.log(`Borrow successful: ${success}`);

book.returnBook();
book.displayInfo();
```

#### Solutions

```java
class Book {
    private String title;
    private String author;
    private String isbn;
    private boolean isAvailable;

    public Book(String title, String author, String isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true;
    }

    public boolean borrowBook() {
        if (isAvailable) {
            isAvailable = false;
            return true;
        }
        return false;
    }

    public void returnBook() {
        isAvailable = true;
    }

    public void displayInfo() {
        String status = isAvailable " "Available" : "Borrowed";
        System.out.println(title + " by " + author + " (ISBN: " + isbn + ") - " + status);
    }
}

public class Main {
    public static void main(String[] args) {
        Book book = new Book("The Pragmatic Programmer", "David Thomas", "978-0135957059");
        book.displayInfo();

        boolean success = book.borrowBook();
        System.out.println("Borrow successful: " + success);
        book.displayInfo();

        success = book.borrowBook();
        System.out.println("Borrow successful: " + success);

        book.returnBook();
        book.displayInfo();
    }
}
```

```python
class Book:
    def __init__(self, title: str, author: str, isbn: str):
        self._title = title
        self._author = author
        self._isbn = isbn
        self._is_available = True

    def borrow_book(self) -> bool:
        if self._is_available:
            self._is_available = False
            return True
        return False

    def return_book(self) -> None:
        self._is_available = True

    def display_info(self) -> None:
        status = "Available" if self._is_available else "Borrowed"
        print(f"{self._title} by {self._author} (ISBN: {self._isbn}) - {status}")

if __name__ == "__main__":
    book = Book("The Pragmatic Programmer", "David Thomas", "978-0135957059")
    book.display_info()

    success = book.borrow_book()
    print(f"Borrow successful: {str(success).lower()}")
    book.display_info()

    success = book.borrow_book()
    print(f"Borrow successful: {str(success).lower()}")

    book.return_book()
    book.display_info()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Book {
private:
    string title;
    string author;
    string isbn;
    bool isAvailable;

public:
    Book(const string& title, const string& author, const string& isbn)
        : title(title), author(author), isbn(isbn), isAvailable(true) {}

    bool borrowBook() {
        if (isAvailable) {
            isAvailable = false;
            return true;
        }
        return false;
    }

    void returnBook() {
        isAvailable = true;
    }

    void displayInfo() const {
        string status = isAvailable " "Available" : "Borrowed";
        cout << title << " by " << author << " (ISBN: " << isbn << ") - " << status << endl;
    }
};

int main() {
    Book book("The Pragmatic Programmer", "David Thomas", "978-0135957059");
    book.displayInfo();

    bool success = book.borrowBook();
    cout << "Borrow successful: " << boolalpha << success << endl;
    book.displayInfo();

    success = book.borrowBook();
    cout << "Borrow successful: " << success << endl;

    book.returnBook();
    book.displayInfo();

    return 0;
}
```

```go
package main

import "fmt"

type Book struct {
	title       string
	author      string
	isbn        string
	isAvailable bool
}

func NewBook(title, author, isbn string) *Book {
	return &Book{
		title:       title,
		author:      author,
		isbn:        isbn,
		isAvailable: true,
	}
}

func (b *Book) BorrowBook() bool {
	if b.isAvailable {
		b.isAvailable = false
		return true
	}
	return false
}

func (b *Book) ReturnBook() {
	b.isAvailable = true
}

func (b *Book) DisplayInfo() {
	status := "Borrowed"
	if b.isAvailable {
		status = "Available"
	}
	fmt.Printf("%s by %s (ISBN: %s) - %s\n", b.title, b.author, b.isbn, status)
}

func main() {
	book := NewBook("The Pragmatic Programmer", "David Thomas", "978-0135957059")
	book.DisplayInfo()

	success := book.BorrowBook()
	fmt.Printf("Borrow successful: %t\n", success)
	book.DisplayInfo()

	success = book.BorrowBook()
	fmt.Printf("Borrow successful: %t\n", success)

	book.ReturnBook()
	book.DisplayInfo()
}
```

```csharp
using System;

public class Book
{
    private string _title;
    private string _author;
    private string _isbn;
    private bool _isAvailable;

    public Book(string title, string author, string isbn)
    {
        _title = title;
        _author = author;
        _isbn = isbn;
        _isAvailable = true;
    }

    public bool BorrowBook()
    {
        if (_isAvailable)
        {
            _isAvailable = false;
            return true;
        }
        return false;
    }

    public void ReturnBook()
    {
        _isAvailable = true;
    }

    public void DisplayInfo()
    {
        string status = _isAvailable " "Available" : "Borrowed";
        Console.WriteLine($"{_title} by {_author} (ISBN: {_isbn}) - {status}");
    }
}

public class Program
{
    public static void Main()
    {
        var book = new Book("The Pragmatic Programmer", "David Thomas", "978-0135957059");
        book.DisplayInfo();

        bool success = book.BorrowBook();
        Console.WriteLine($"Borrow successful: {success.ToString().ToLower()}");
        book.DisplayInfo();

        success = book.BorrowBook();
        Console.WriteLine($"Borrow successful: {success.ToString().ToLower()}");

        book.ReturnBook();
        book.DisplayInfo();
    }
}
```

```typescript
class Book {
    private title: string;
    private author: string;
    private isbn: string;
    private isAvailable: boolean;

    constructor(title: string, author: string, isbn: string) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true;
    }

    borrowBook(): boolean {
        if (this.isAvailable) {
            this.isAvailable = false;
            return true;
        }
        return false;
    }

    returnBook(): void {
        this.isAvailable = true;
    }

    displayInfo(): void {
        const status = this.isAvailable " "Available" : "Borrowed";
        console.log(`${this.title} by ${this.author} (ISBN: ${this.isbn}) - ${status}`);
    }
}

const book = new Book("The Pragmatic Programmer", "David Thomas", "978-0135957059");
book.displayInfo();

let success = book.borrowBook();
console.log(`Borrow successful: ${success}`);
book.displayInfo();

success = book.borrowBook();
console.log(`Borrow successful: ${success}`);

book.returnBook();
book.displayInfo();
```


