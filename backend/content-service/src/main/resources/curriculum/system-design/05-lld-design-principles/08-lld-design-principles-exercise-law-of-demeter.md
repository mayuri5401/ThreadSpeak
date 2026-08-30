---
id: "lld-design-principles-exercise-law-of-demeter"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Principles"
subSection: ""
title: "Exercise: Law of Demeter"
slug: "lld-design-principles-exercise-law-of-demeter"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Law of Demeter as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Law of Demeter Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Design Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: OrderSummary Printer

**Problem:** You have an `OrderSummaryPrinter` that uses train wrecks to access nested data. Refactor it so the printer only calls methods on the `Order` object directly.

The current code accesses:

- `order.getCustomer().getAddress().getCity()` for the customer's city
- `order.getPayment().getCreditCard().getLast4Digits()` for the last 4 digits of the card

**Requirements:**

- Add delegation methods to `Order` so the printer never reaches past it
- The delegation methods should have clear, descriptive names
- Handle null/empty cases gracefully

```java
class Address {
    private String city;

    public Address(String city) { this.city = city; }

    public String getCity() { return city; }
}

class Customer {
    private Address address;

    public Customer(Address address) { this.address = address; }

    public Address getAddress() { return address; }
}

class CreditCard {
    private String last4Digits;

    public CreditCard(String last4Digits) { this.last4Digits = last4Digits; }

    public String getLast4Digits() { return last4Digits; }
}

class Payment {
    private CreditCard creditCard;

    public Payment(CreditCard creditCard) { this.creditCard = creditCard; }

    public CreditCard getCreditCard() { return creditCard; }
}

class Order {
    private Customer customer;
    private Payment payment;

    public Order(Customer customer, Payment payment) {
        this.customer = customer;
        this.payment = payment;
    }

    // TODO: Add delegation methods

    public Customer getCustomer() { return customer; }
    public Payment getPayment() { return payment; }
}

class OrderSummaryPrinter {
    public void print(Order order) {
        // CURRENT (violates LoD):
        // String city = order.getCustomer().getAddress().getCity();
        // String last4 = order.getPayment().getCreditCard().getLast4Digits();

        // TODO: Refactor to use delegation methods on Order
        String city = ""; // replace with order.getCustomerCity()
        String last4 = ""; // replace with order.getPaymentLast4Digits()

        System.out.println("Ship to: " + city);
        System.out.println("Paid with card ending in: " + last4);
    }
}

class Main {
    public static void main(String[] args) {
        Address address = new Address("San Francisco");
        Customer customer = new Customer(address);
        CreditCard card = new CreditCard("4242");
        Payment payment = new Payment(card);
        Order order = new Order(customer, payment);

        OrderSummaryPrinter printer = new OrderSummaryPrinter();
        printer.print(order);
    }
}
```

```python
class Address:
    def __init__(self, city):
        self._city = city

    def get_city(self):
        return self._city

class Customer:
    def __init__(self, address):
        self._address = address

    def get_address(self):
        return self._address

class CreditCard:
    def __init__(self, last_4_digits):
        self._last_4_digits = last_4_digits

    def get_last_4_digits(self):
        return self._last_4_digits

class Payment:
    def __init__(self, credit_card):
        self._credit_card = credit_card

    def get_credit_card(self):
        return self._credit_card

class Order:
    def __init__(self, customer, payment):
        self._customer = customer
        self._payment = payment

    # TODO: Add delegation methods

    def get_customer(self):
        return self._customer

    def get_payment(self):
        return self._payment

class OrderSummaryPrinter:
    def print_summary(self, order):
        # CURRENT (violates LoD):
        # city = order.get_customer().get_address().get_city()
        # last4 = order.get_payment().get_credit_card().get_last_4_digits()

        # TODO: Refactor to use delegation methods on Order
        city = ""  # replace with order.get_customer_city()
        last4 = ""  # replace with order.get_payment_last_4_digits()

        print(f"Ship to: {city}")
        print(f"Paid with card ending in: {last4}")

if __name__ == "__main__":
    address = Address("San Francisco")
    customer = Customer(address)
    card = CreditCard("4242")
    payment = Payment(card)
    order = Order(customer, payment)

    printer = OrderSummaryPrinter()
    printer.print_summary(order)
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Address {
    string city;
public:
    Address(string city) : city(city) {}

    string getCity() const { return city; }
};

class Customer {
    Address address;
public:
    Customer(Address address) : address(address) {}

    Address getAddress() const { return address; }
};

class CreditCard {
    string last4Digits;
public:
    CreditCard(string last4Digits) : last4Digits(last4Digits) {}

    string getLast4Digits() const { return last4Digits; }
};

class Payment {
    CreditCard creditCard;
public:
    Payment(CreditCard creditCard) : creditCard(creditCard) {}

    CreditCard getCreditCard() const { return creditCard; }
};

class Order {
    Customer customer;
    Payment payment;
public:
    Order(Customer customer, Payment payment)
        : customer(customer), payment(payment) {}

    // TODO: Add delegation methods

    Customer getCustomer() const { return customer; }
    Payment getPayment() const { return payment; }
};

class OrderSummaryPrinter {
public:
    void print(const Order& order) {
        // CURRENT (violates LoD):
        // string city = order.getCustomer().getAddress().getCity();
        // string last4 = order.getPayment().getCreditCard().getLast4Digits();

        // TODO: Refactor to use delegation methods on Order
        string city = ""; // replace with order.getCustomerCity()
        string last4 = ""; // replace with order.getPaymentLast4Digits()

        cout << "Ship to: " << city << endl;
        cout << "Paid with card ending in: " << last4 << endl;
    }
};

int main() {
    Address address("San Francisco");
    Customer customer(address);
    CreditCard card("4242");
    Payment payment(card);
    Order order(customer, payment);

    OrderSummaryPrinter printer;
    printer.print(order);
    return 0;
}
```

```go
package main

import "fmt"

type Address struct {
	city string
}

func NewAddress(city string) *Address {
	return &Address{city: city}
}

func (a *Address) GetCity() string {
	return a.city
}

type Customer struct {
	address *Address
}

func NewCustomer(address *Address) *Customer {
	return &Customer{address: address}
}

func (c *Customer) GetAddress() *Address {
	return c.address
}

type CreditCard struct {
	last4Digits string
}

func NewCreditCard(last4Digits string) *CreditCard {
	return &CreditCard{last4Digits: last4Digits}
}

func (c *CreditCard) GetLast4Digits() string {
	return c.last4Digits
}

type Payment struct {
	creditCard *CreditCard
}

func NewPayment(creditCard *CreditCard) *Payment {
	return &Payment{creditCard: creditCard}
}

func (p *Payment) GetCreditCard() *CreditCard {
	return p.creditCard
}

type Order struct {
	customer *Customer
	payment  *Payment
}

func NewOrder(customer *Customer, payment *Payment) *Order {
	return &Order{
		customer: customer,
		payment:  payment,
	}
}

// TODO: Add delegation methods

func (o *Order) GetCustomer() *Customer {
	return o.customer
}

func (o *Order) GetPayment() *Payment {
	return o.payment
}

type OrderSummaryPrinter struct{}

func NewOrderSummaryPrinter() *OrderSummaryPrinter {
	return &OrderSummaryPrinter{}
}

func (p *OrderSummaryPrinter) Print(order *Order) {
	// CURRENT (violates LoD):
	// city := order.GetCustomer().GetAddress().GetCity()
	// last4 := order.GetPayment().GetCreditCard().GetLast4Digits()

	// TODO: Refactor to use delegation methods on Order
	city := ""  // replace with order.GetCustomerCity()
	last4 := ""  // replace with order.GetPaymentLast4Digits()

	fmt.Println("Ship to: " + city)
	fmt.Println("Paid with card ending in: " + last4)
}

func main() {
	address := NewAddress("San Francisco")
	customer := NewCustomer(address)
	card := NewCreditCard("4242")
	payment := NewPayment(card)
	order := NewOrder(customer, payment)

	printer := NewOrderSummaryPrinter()
	printer.Print(order)
}
```

```csharp
using System;

class Address
{
    private string city;

    public Address(string city) { this.city = city; }

    public string GetCity() { return city; }
}

class Customer
{
    private Address address;

    public Customer(Address address) { this.address = address; }

    public Address GetAddress() { return address; }
}

class CreditCard
{
    private string last4Digits;

    public CreditCard(string last4Digits) { this.last4Digits = last4Digits; }

    public string GetLast4Digits() { return last4Digits; }
}

class Payment
{
    private CreditCard creditCard;

    public Payment(CreditCard creditCard) { this.creditCard = creditCard; }

    public CreditCard GetCreditCard() { return creditCard; }
}

class Order
{
    private Customer customer;
    private Payment payment;

    public Order(Customer customer, Payment payment)
    {
        this.customer = customer;
        this.payment = payment;
    }

    // TODO: Add delegation methods

    public Customer GetCustomer() { return customer; }
    public Payment GetPayment() { return payment; }
}

class OrderSummaryPrinter
{
    public void Print(Order order)
    {
        // CURRENT (violates LoD):
        // string city = order.GetCustomer().GetAddress().GetCity();
        // string last4 = order.GetPayment().GetCreditCard().GetLast4Digits();

        // TODO: Refactor to use delegation methods on Order
        string city = ""; // replace with order.GetCustomerCity()
        string last4 = ""; // replace with order.GetPaymentLast4Digits()

        Console.WriteLine("Ship to: " + city);
        Console.WriteLine("Paid with card ending in: " + last4);
    }
}

class Program
{
    static void Main(string[] args)
    {
        Address address = new Address("San Francisco");
        Customer customer = new Customer(address);
        CreditCard card = new CreditCard("4242");
        Payment payment = new Payment(card);
        Order order = new Order(customer, payment);

        OrderSummaryPrinter printer = new OrderSummaryPrinter();
        printer.Print(order);
    }
}
```

```typescript
class Address {
    private city: string;

    constructor(city: string) { this.city = city; }

    getCity(): string { return this.city; }
}

class Customer {
    private address: Address;

    constructor(address: Address) { this.address = address; }

    getAddress(): Address { return this.address; }
}

class CreditCard {
    private last4Digits: string;

    constructor(last4Digits: string) { this.last4Digits = last4Digits; }

    getLast4Digits(): string { return this.last4Digits; }
}

class Payment {
    private creditCard: CreditCard;

    constructor(creditCard: CreditCard) { this.creditCard = creditCard; }

    getCreditCard(): CreditCard { return this.creditCard; }
}

class Order {
    private customer: Customer;
    private payment: Payment;

    constructor(customer: Customer, payment: Payment) {
        this.customer = customer;
        this.payment = payment;
    }

    // TODO: Add delegation methods

    getCustomer(): Customer { return this.customer; }
    getPayment(): Payment { return this.payment; }
}

class OrderSummaryPrinter {
    print(order: Order): void {
        // CURRENT (violates LoD):
        // const city = order.getCustomer().getAddress().getCity();
        // const last4 = order.getPayment().getCreditCard().getLast4Digits();

        // TODO: Refactor to use delegation methods on Order
        const city = ""; // replace with order.getCustomerCity()
        const last4 = ""; // replace with order.getPaymentLast4Digits()

        console.log(`Ship to: ${city}`);
        console.log(`Paid with card ending in: ${last4}`);
    }
}

// --- Main ---
const address = new Address("San Francisco");
const customer = new Customer(address);
const card = new CreditCard("4242");
const payment = new Payment(card);
const order = new Order(customer, payment);

const printer = new OrderSummaryPrinter();
printer.print(order);
```

#### Solutions

```java
class Address {
    private String city;

    public Address(String city) { this.city = city; }

    public String getCity() { return city; }
}

class Customer {
    private Address address;

    public Customer(Address address) { this.address = address; }

    public Address getAddress() { return address; }

    public String getCity() {
        if (address == null) return "Unknown";
        return address.getCity();
    }
}

class CreditCard {
    private String last4Digits;

    public CreditCard(String last4Digits) { this.last4Digits = last4Digits; }

    public String getLast4Digits() { return last4Digits; }
}

class Payment {
    private CreditCard creditCard;

    public Payment(CreditCard creditCard) { this.creditCard = creditCard; }

    public CreditCard getCreditCard() { return creditCard; }

    public String getLast4Digits() {
        if (creditCard == null) return "Unknown";
        return creditCard.getLast4Digits();
    }
}

class Order {
    private Customer customer;
    private Payment payment;

    public Order(Customer customer, Payment payment) {
        this.customer = customer;
        this.payment = payment;
    }

    public String getCustomerCity() {
        if (customer == null) return "Unknown";
        return customer.getCity();
    }

    public String getPaymentLast4Digits() {
        if (payment == null) return "Unknown";
        return payment.getLast4Digits();
    }

    public Customer getCustomer() { return customer; }
    public Payment getPayment() { return payment; }
}

class OrderSummaryPrinter {
    public void print(Order order) {
        String city = order.getCustomerCity();
        String last4 = order.getPaymentLast4Digits();

        System.out.println("Ship to: " + city);
        System.out.println("Paid with card ending in: " + last4);
    }
}

public class Main {
    public static void main(String[] args) {
        Address address = new Address("San Francisco");
        Customer customer = new Customer(address);
        CreditCard card = new CreditCard("4242");
        Payment payment = new Payment(card);
        Order order = new Order(customer, payment);

        OrderSummaryPrinter printer = new OrderSummaryPrinter();
        printer.print(order);
    }
}
```

```python
class Address:
    def __init__(self, city):
        self._city = city

    def get_city(self):
        return self._city

class Customer:
    def __init__(self, address):
        self._address = address

    def get_address(self):
        return self._address

    def get_city(self):
        if self._address is None:
            return "Unknown"
        return self._address.get_city()

class CreditCard:
    def __init__(self, last_4_digits):
        self._last_4_digits = last_4_digits

    def get_last_4_digits(self):
        return self._last_4_digits

class Payment:
    def __init__(self, credit_card):
        self._credit_card = credit_card

    def get_credit_card(self):
        return self._credit_card

    def get_last_4_digits(self):
        if self._credit_card is None:
            return "Unknown"
        return self._credit_card.get_last_4_digits()

class Order:
    def __init__(self, customer, payment):
        self._customer = customer
        self._payment = payment

    def get_customer_city(self):
        if self._customer is None:
            return "Unknown"
        return self._customer.get_city()

    def get_payment_last_4_digits(self):
        if self._payment is None:
            return "Unknown"
        return self._payment.get_last_4_digits()

    def get_customer(self):
        return self._customer

    def get_payment(self):
        return self._payment

class OrderSummaryPrinter:
    def print_summary(self, order):
        city = order.get_customer_city()
        last4 = order.get_payment_last_4_digits()

        print(f"Ship to: {city}")
        print(f"Paid with card ending in: {last4}")

if __name__ == "__main__":
    address = Address("San Francisco")
    customer = Customer(address)
    card = CreditCard("4242")
    payment = Payment(card)
    order = Order(customer, payment)

    printer = OrderSummaryPrinter()
    printer.print_summary(order)
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Address {
    string city;
public:
    Address(string city) : city(city) {}

    string getCity() const { return city; }
};

class Customer {
    Address address;
public:
    Customer(Address address) : address(address) {}

    Address getAddress() const { return address; }

    string getCity() const {
        return address.getCity();
    }
};

class CreditCard {
    string last4Digits;
public:
    CreditCard(string last4Digits) : last4Digits(last4Digits) {}

    string getLast4Digits() const { return last4Digits; }
};

class Payment {
    CreditCard creditCard;
public:
    Payment(CreditCard creditCard) : creditCard(creditCard) {}

    CreditCard getCreditCard() const { return creditCard; }

    string getLast4Digits() const {
        return creditCard.getLast4Digits();
    }
};

class Order {
    Customer customer;
    Payment payment;
public:
    Order(Customer customer, Payment payment)
        : customer(customer), payment(payment) {}

    string getCustomerCity() const {
        return customer.getCity();
    }

    string getPaymentLast4Digits() const {
        return payment.getLast4Digits();
    }

    Customer getCustomer() const { return customer; }
    Payment getPayment() const { return payment; }
};

class OrderSummaryPrinter {
public:
    void print(const Order& order) {
        string city = order.getCustomerCity();
        string last4 = order.getPaymentLast4Digits();

        cout << "Ship to: " << city << endl;
        cout << "Paid with card ending in: " << last4 << endl;
    }
};

int main() {
    Address address("San Francisco");
    Customer customer(address);
    CreditCard card("4242");
    Payment payment(card);
    Order order(customer, payment);

    OrderSummaryPrinter printer;
    printer.print(order);
    return 0;
}
```

```go
package main

import "fmt"

type Address struct {
	city string
}

func NewAddress(city string) *Address {
	return &Address{city: city}
}

func (a *Address) GetCity() string {
	return a.city
}

type Customer struct {
	address *Address
}

func NewCustomer(address *Address) *Customer {
	return &Customer{address: address}
}

func (c *Customer) GetAddress() *Address {
	return c.address
}

func (c *Customer) GetCity() string {
	if c.address == nil {
		return "Unknown"
	}
	return c.address.GetCity()
}

type CreditCard struct {
	last4Digits string
}

func NewCreditCard(last4Digits string) *CreditCard {
	return &CreditCard{last4Digits: last4Digits}
}

func (c *CreditCard) GetLast4Digits() string {
	return c.last4Digits
}

type Payment struct {
	creditCard *CreditCard
}

func NewPayment(creditCard *CreditCard) *Payment {
	return &Payment{creditCard: creditCard}
}

func (p *Payment) GetCreditCard() *CreditCard {
	return p.creditCard
}

func (p *Payment) GetLast4Digits() string {
	if p.creditCard == nil {
		return "Unknown"
	}
	return p.creditCard.GetLast4Digits()
}

type Order struct {
	customer *Customer
	payment  *Payment
}

func NewOrder(customer *Customer, payment *Payment) *Order {
	return &Order{customer: customer, payment: payment}
}

func (o *Order) GetCustomerCity() string {
	if o.customer == nil {
		return "Unknown"
	}
	return o.customer.GetCity()
}

func (o *Order) GetPaymentLast4Digits() string {
	if o.payment == nil {
		return "Unknown"
	}
	return o.payment.GetLast4Digits()
}

func (o *Order) GetCustomer() *Customer {
	return o.customer
}

func (o *Order) GetPayment() *Payment {
	return o.payment
}

type OrderSummaryPrinter struct{}

func NewOrderSummaryPrinter() *OrderSummaryPrinter {
	return &OrderSummaryPrinter{}
}

func (p *OrderSummaryPrinter) Print(order *Order) {
	city := order.GetCustomerCity()
	last4 := order.GetPaymentLast4Digits()

	fmt.Println("Ship to: " + city)
	fmt.Println("Paid with card ending in: " + last4)
}

func main() {
	address := NewAddress("San Francisco")
	customer := NewCustomer(address)
	card := NewCreditCard("4242")
	payment := NewPayment(card)
	order := NewOrder(customer, payment)

	printer := NewOrderSummaryPrinter()
	printer.Print(order)
}
```

```csharp
using System;

class Address
{
    private string city;

    public Address(string city) { this.city = city; }

    public string GetCity() { return city; }
}

class Customer
{
    private Address address;

    public Customer(Address address) { this.address = address; }

    public Address GetAddress() { return address; }

    public string GetCity()
    {
        if (address == null) return "Unknown";
        return address.GetCity();
    }
}

class CreditCard
{
    private string last4Digits;

    public CreditCard(string last4Digits) { this.last4Digits = last4Digits; }

    public string GetLast4Digits() { return last4Digits; }
}

class Payment
{
    private CreditCard creditCard;

    public Payment(CreditCard creditCard) { this.creditCard = creditCard; }

    public CreditCard GetCreditCard() { return creditCard; }

    public string GetLast4Digits()
    {
        if (creditCard == null) return "Unknown";
        return creditCard.GetLast4Digits();
    }
}

class Order
{
    private Customer customer;
    private Payment payment;

    public Order(Customer customer, Payment payment)
    {
        this.customer = customer;
        this.payment = payment;
    }

    public string GetCustomerCity()
    {
        if (customer == null) return "Unknown";
        return customer.GetCity();
    }

    public string GetPaymentLast4Digits()
    {
        if (payment == null) return "Unknown";
        return payment.GetLast4Digits();
    }

    public Customer GetCustomer() { return customer; }
    public Payment GetPayment() { return payment; }
}

class OrderSummaryPrinter
{
    public void Print(Order order)
    {
        string city = order.GetCustomerCity();
        string last4 = order.GetPaymentLast4Digits();

        Console.WriteLine("Ship to: " + city);
        Console.WriteLine("Paid with card ending in: " + last4);
    }
}

class Program
{
    static void Main(string[] args)
    {
        Address address = new Address("San Francisco");
        Customer customer = new Customer(address);
        CreditCard card = new CreditCard("4242");
        Payment payment = new Payment(card);
        Order order = new Order(customer, payment);

        OrderSummaryPrinter printer = new OrderSummaryPrinter();
        printer.Print(order);
    }
}
```

```typescript
class Address {
    private city: string;

    constructor(city: string) { this.city = city; }

    getCity(): string { return this.city; }
}

class Customer {
    private address: Address | null;

    constructor(address: Address) { this.address = address; }

    getAddress(): Address | null { return this.address; }

    getCity(): string {
        if (!this.address) return "Unknown";
        return this.address.getCity();
    }
}

class CreditCard {
    private last4Digits: string;

    constructor(last4Digits: string) { this.last4Digits = last4Digits; }

    getLast4Digits(): string { return this.last4Digits; }
}

class Payment {
    private creditCard: CreditCard | null;

    constructor(creditCard: CreditCard) { this.creditCard = creditCard; }

    getCreditCard(): CreditCard | null { return this.creditCard; }

    getLast4Digits(): string {
        if (!this.creditCard) return "Unknown";
        return this.creditCard.getLast4Digits();
    }
}

class Order {
    private customer: Customer | null;
    private payment: Payment | null;

    constructor(customer: Customer, payment: Payment) {
        this.customer = customer;
        this.payment = payment;
    }

    getCustomerCity(): string {
        if (!this.customer) return "Unknown";
        return this.customer.getCity();
    }

    getPaymentLast4Digits(): string {
        if (!this.payment) return "Unknown";
        return this.payment.getLast4Digits();
    }

    getCustomer(): Customer | null { return this.customer; }
    getPayment(): Payment | null { return this.payment; }
}

class OrderSummaryPrinter {
    print(order: Order): void {
        const city = order.getCustomerCity();
        const last4 = order.getPaymentLast4Digits();

        console.log(`Ship to: ${city}`);
        console.log(`Paid with card ending in: ${last4}`);
    }
}

// --- Main ---
const address = new Address("San Francisco");
const customer = new Customer(address);
const card = new CreditCard("4242");
const payment = new Payment(card);
const order = new Order(customer, payment);

const printer = new OrderSummaryPrinter();
printer.print(order);
```

---

# Exercise 2: Library Checkout System

**Problem:** Build a checkout system where a `CheckoutService` only talks to a `Library` object, never reaching into shelves, sections, or books directly.

**Requirements:**

- The `Library` contains `Sections` (Fiction, Non-Fiction, etc.)
- Each `Section` contains a list of `Books`
- Each `Book` has a title, author, and availability status
- `CheckoutService` should be able to check out a book by title, but it should only call methods on `Library`
- `Library` handles all the internal navigation

```java
import java.util.List;
import java.util.ArrayList;

class Book {
    private String title;
    private String author;
    private boolean available;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.available = true;
    }

    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public boolean isAvailable() { return available; }
    public void markCheckedOut() { this.available = false; }
}

class Section {
    private String name;
    private List<Book> books;

    public Section(String name) {
        this.name = name;
        this.books = new ArrayList<>();
    }

    public void addBook(Book book) { books.add(book); }

    // TODO: Add a checkoutBook(String title) method that returns boolean
    // - Search through this section's books for a matching title
    // - If found AND available, mark it as checked out and return true
    // - If not found or already checked out, return false
}

class Library {
    private List<Section> sections;

    public Library() {
        this.sections = new ArrayList<>();
    }

    public void addSection(Section section) { sections.add(section); }

    // TODO: Add a checkoutBook(String title) method that returns boolean
    // - Iterate through all sections and delegate to each section's checkoutBook()
    // - Return true as soon as any section successfully checks out the book
    // - Return false if no section has the book or it's unavailable
    // - CheckoutService should only need to call this single method
}

class CheckoutService {
    private Library library;

    public CheckoutService(Library library) {
        this.library = library;
    }

    public boolean checkout(String bookTitle) {
        // TODO: Replace with a single call to library's checkoutBook() method
        // This method should be one line - no direct access to sections or books
        return false;
    }
}

class Main {
    public static void main(String[] args) {
        Library library = new Library();

        Section fiction = new Section("Fiction");
        fiction.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald"));
        fiction.addBook(new Book("1984", "George Orwell"));
        library.addSection(fiction);

        Section nonFiction = new Section("Non-Fiction");
        nonFiction.addBook(new Book("Clean Code", "Robert C. Martin"));
        library.addSection(nonFiction);

        CheckoutService service = new CheckoutService(library);

        boolean result1 = service.checkout("The Great Gatsby");
        System.out.println("Checking out \"The Great Gatsby\"... " + (result1 " "Success!" : "Failed (not found)"));

        boolean result2 = service.checkout("The Great Gatsby");
        System.out.println("Checking out \"The Great Gatsby\"... " + (result2 " "Success!" : "Failed (already checked out)"));

        boolean result3 = service.checkout("Unknown Book");
        System.out.println("Checking out \"Unknown Book\"... " + (result3 " "Success!" : "Failed (not found)"));
    }
}
```

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.available = True

    def mark_checked_out(self):
        self.available = False

class Section:
    def __init__(self, name):
        self.name = name
        self._books = []

    def add_book(self, book):
        self._books.append(book)

    # TODO: Add a checkout_book(title) method that returns bool
    # - Search through this section's books for a matching title
    # - If found AND available, mark it as checked out and return True
    # - If not found or already checked out, return False

class Library:
    def __init__(self):
        self._sections = []

    def add_section(self, section):
        self._sections.append(section)

    # TODO: Add a checkout_book(title) method that returns bool
    # - Iterate through all sections and delegate to each section's checkout_book()
    # - Return True as soon as any section successfully checks out the book
    # - Return False if no section has the book or it's unavailable
    # - CheckoutService should only need to call this single method

class CheckoutService:
    def __init__(self, library):
        self._library = library

    def checkout(self, book_title):
        # TODO: Replace with a single call to library's checkout_book() method
        # This method should be one line - no direct access to sections or books
        return False

if __name__ == "__main__":
    library = Library()

    fiction = Section("Fiction")
    fiction.add_book(Book("The Great Gatsby", "F. Scott Fitzgerald"))
    fiction.add_book(Book("1984", "George Orwell"))
    library.add_section(fiction)

    non_fiction = Section("Non-Fiction")
    non_fiction.add_book(Book("Clean Code", "Robert C. Martin"))
    library.add_section(non_fiction)

    service = CheckoutService(library)

    result1 = service.checkout("The Great Gatsby")
    print(f'Checking out "The Great Gatsby"... {"Success!" if result1 else "Failed (not found)"}')

    result2 = service.checkout("The Great Gatsby")
    print(f'Checking out "The Great Gatsby"... {"Success!" if result2 else "Failed (already checked out)"}')

    result3 = service.checkout("Unknown Book")
    print(f'Checking out "Unknown Book"... {"Success!" if result3 else "Failed (not found)"}')
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Book {
    string title;
    string author;
    bool available;
public:
    Book(string title, string author)
        : title(title), author(author), available(true) {}

    string getTitle() const { return title; }
    string getAuthor() const { return author; }
    bool isAvailable() const { return available; }
    void markCheckedOut() { available = false; }
};

class Section {
    string name;
    vector<Book> books;
public:
    Section(string name) : name(name) {}

    void addBook(const Book& book) { books.push_back(book); }

    // TODO: Add a checkoutBook(const string& title) method that returns bool
    // - Search through this section's books for a matching title
    // - If found AND available, mark it as checked out and return true
    // - If not found or already checked out, return false
};

class Library {
    vector<Section> sections;
public:
    void addSection(const Section& section) { sections.push_back(section); }

    // TODO: Add a checkoutBook(const string& title) method that returns bool
    // - Iterate through all sections and delegate to each section's checkoutBook()
    // - Return true as soon as any section successfully checks out the book
    // - Return false if no section has the book or it's unavailable
    // - CheckoutService should only need to call this single method
};

class CheckoutService {
    Library* library;
public:
    CheckoutService(Library* library) : library(library) {}

    bool checkout(const string& bookTitle) {
        // TODO: Replace with a single call to library's checkoutBook() method
        // This method should be one line - no direct access to sections or books
        return false;
    }
};

int main() {
    Library library;

    Section fiction("Fiction");
    fiction.addBook(Book("The Great Gatsby", "F. Scott Fitzgerald"));
    fiction.addBook(Book("1984", "George Orwell"));
    library.addSection(fiction);

    Section nonFiction("Non-Fiction");
    nonFiction.addBook(Book("Clean Code", "Robert C. Martin"));
    library.addSection(nonFiction);

    CheckoutService service(&library);

    bool result1 = service.checkout("The Great Gatsby");
    cout << "Checking out \"The Great Gatsby\"... " << (result1 " "Success!" : "Failed (not found)") << endl;

    bool result2 = service.checkout("The Great Gatsby");
    cout << "Checking out \"The Great Gatsby\"... " << (result2 " "Success!" : "Failed (already checked out)") << endl;

    bool result3 = service.checkout("Unknown Book");
    cout << "Checking out \"Unknown Book\"... " << (result3 " "Success!" : "Failed (not found)") << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Book struct {
	title     string
	author    string
	available bool
}

func NewBook(title string, author string) *Book {
	return &Book{
		title:     title,
		author:    author,
		available: true,
	}
}

func (b *Book) GetTitle() string {
	return b.title
}

func (b *Book) GetAuthor() string {
	return b.author
}

func (b *Book) IsAvailable() bool {
	return b.available
}

func (b *Book) MarkCheckedOut() {
	b.available = false
}

type Section struct {
	name  string
	books []*Book
}

func NewSection(name string) *Section {
	return &Section{
		name:  name,
		books: []*Book{},
	}
}

func (s *Section) AddBook(book *Book) {
	s.books = append(s.books, book)
}

// TODO: Add a checkoutBook(title string) method that returns bool
// - Search through this section's books for a matching title
// - If found AND available, mark it as checked out and return true
// - If not found or already checked out, return false
func (s *Section) CheckoutBook(title string) bool {
	// TODO
	return false
}

type Library struct {
	sections []*Section
}

func NewLibrary() *Library {
	return &Library{
		sections: []*Section{},
	}
}

func (l *Library) AddSection(section *Section) {
	l.sections = append(l.sections, section)
}

// TODO: Add a checkoutBook(title string) method that returns bool
// - Iterate through all sections and delegate to each section's checkoutBook()
// - Return true as soon as any section successfully checks out the book
// - Return false if no section has the book or it's unavailable
// - CheckoutService should only need to call this single method
func (l *Library) CheckoutBook(title string) bool {
	// TODO
	return false
}

type CheckoutService struct {
	library *Library
}

func NewCheckoutService(library *Library) *CheckoutService {
	return &CheckoutService{
		library: library,
	}
}

func (c *CheckoutService) Checkout(bookTitle string) bool {
	// TODO: Replace with a single call to library's checkoutBook() method
	// This method should be one line - no direct access to sections or books
	return false
}

func main() {
	library := NewLibrary()

	fiction := NewSection("Fiction")
	fiction.AddBook(NewBook("The Great Gatsby", "F. Scott Fitzgerald"))
	fiction.AddBook(NewBook("1984", "George Orwell"))
	library.AddSection(fiction)

	nonFiction := NewSection("Non-Fiction")
	nonFiction.AddBook(NewBook("Clean Code", "Robert C. Martin"))
	library.AddSection(nonFiction)

	service := NewCheckoutService(library)

	result1 := service.Checkout("The Great Gatsby")
	fmt.Printf("Checking out %q... %s\n", "The Great Gatsby", ternary(result1, "Success!", "Failed (not found)"))

	result2 := service.Checkout("The Great Gatsby")
	fmt.Printf("Checking out %q... %s\n", "The Great Gatsby", ternary(result2, "Success!", "Failed (already checked out)"))

	result3 := service.Checkout("Unknown Book")
	fmt.Printf("Checking out %q... %s\n", "Unknown Book", ternary(result3, "Success!", "Failed (not found)"))
}

func ternary(condition bool, trueValue string, falseValue string) string {
	if condition {
		return trueValue
	}
	return falseValue
}
```

```csharp
using System;
using System.Collections.Generic;

class Book
{
    public string Title { get; }
    public string Author { get; }
    public bool Available { get; private set; }

    public Book(string title, string author)
    {
        Title = title;
        Author = author;
        Available = true;
    }

    public void MarkCheckedOut() { Available = false; }
}

class Section
{
    public string Name { get; }
    private List<Book> books;

    public Section(string name)
    {
        Name = name;
        books = new List<Book>();
    }

    public void AddBook(Book book) { books.Add(book); }

    // TODO: Add a CheckoutBook(string title) method that returns bool
    // - Search through this section's books for a matching title
    // - If found AND available, mark it as checked out and return true
    // - If not found or already checked out, return false
}

class Library
{
    private List<Section> sections;

    public Library()
    {
        sections = new List<Section>();
    }

    public void AddSection(Section section) { sections.Add(section); }

    // TODO: Add a CheckoutBook(string title) method that returns bool
    // - Iterate through all sections and delegate to each section's CheckoutBook()
    // - Return true as soon as any section successfully checks out the book
    // - Return false if no section has the book or it's unavailable
    // - CheckoutService should only need to call this single method
}

class CheckoutService
{
    private Library library;

    public CheckoutService(Library library)
    {
        this.library = library;
    }

    public bool Checkout(string bookTitle)
    {
        // TODO: Replace with a single call to library's CheckoutBook() method
        // This method should be one line - no direct access to sections or books
        return false;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Library library = new Library();

        Section fiction = new Section("Fiction");
        fiction.AddBook(new Book("The Great Gatsby", "F. Scott Fitzgerald"));
        fiction.AddBook(new Book("1984", "George Orwell"));
        library.AddSection(fiction);

        Section nonFiction = new Section("Non-Fiction");
        nonFiction.AddBook(new Book("Clean Code", "Robert C. Martin"));
        library.AddSection(nonFiction);

        CheckoutService service = new CheckoutService(library);

        bool result1 = service.Checkout("The Great Gatsby");
        Console.WriteLine($"Checking out \"The Great Gatsby\"... {(result1 " "Success!" : "Failed (not found)")}");

        bool result2 = service.Checkout("The Great Gatsby");
        Console.WriteLine($"Checking out \"The Great Gatsby\"... {(result2 " "Success!" : "Failed (already checked out)")}");

        bool result3 = service.Checkout("Unknown Book");
        Console.WriteLine($"Checking out \"Unknown Book\"... {(result3 " "Success!" : "Failed (not found)")}");
    }
}
```

```typescript
class Book {
    private title: string;
    private author: string;
    private available: boolean;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
        this.available = true;
    }

    getTitle(): string { return this.title; }
    getAuthor(): string { return this.author; }
    isAvailable(): boolean { return this.available; }
    markCheckedOut(): void { this.available = false; }
}

class Section {
    private name: string;
    private books: Book[];

    constructor(name: string) {
        this.name = name;
        this.books = [];
    }

    addBook(book: Book): void { this.books.push(book); }

    // TODO: Add a checkoutBook(title: string) method that returns boolean
    // - Search through this section's books for a matching title
    // - If found AND available, mark it as checked out and return true
    // - If not found or already checked out, return false
}

class Library {
    private sections: Section[];

    constructor() {
        this.sections = [];
    }

    addSection(section: Section): void { this.sections.push(section); }

    // TODO: Add a checkoutBook(title: string) method that returns boolean
    // - Iterate through all sections and delegate to each section's checkoutBook()
    // - Return true as soon as any section successfully checks out the book
    // - Return false if no section has the book or it's unavailable
    // - CheckoutService should only need to call this single method
}

class CheckoutService {
    private library: Library;

    constructor(library: Library) {
        this.library = library;
    }

    checkout(bookTitle: string): boolean {
        // TODO: Replace with a single call to library's checkoutBook() method
        // This method should be one line - no direct access to sections or books
        return false;
    }
}

// --- Main ---
const library = new Library();

const fiction = new Section("Fiction");
fiction.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald"));
fiction.addBook(new Book("1984", "George Orwell"));
library.addSection(fiction);

const nonFiction = new Section("Non-Fiction");
nonFiction.addBook(new Book("Clean Code", "Robert C. Martin"));
library.addSection(nonFiction);

const service = new CheckoutService(library);

const result1 = service.checkout("The Great Gatsby");
console.log(`Checking out "The Great Gatsby"... ${result1 " "Success!" : "Failed (not found)"}`);

const result2 = service.checkout("The Great Gatsby");
console.log(`Checking out "The Great Gatsby"... ${result2 " "Success!" : "Failed (already checked out)"}`);

const result3 = service.checkout("Unknown Book");
console.log(`Checking out "Unknown Book"... ${result3 " "Success!" : "Failed (not found)"}`);
```

#### Solutions

```java
import java.util.List;
import java.util.ArrayList;

class Book {
    private String title;
    private String author;
    private boolean available;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.available = true;
    }

    public String getTitle() { return title; }
    public String getAuthor() { return author; }
    public boolean isAvailable() { return available; }
    public void markCheckedOut() { this.available = false; }
}

class Section {
    private String name;
    private List<Book> books;

    public Section(String name) {
        this.name = name;
        this.books = new ArrayList<>();
    }

    public void addBook(Book book) { books.add(book); }

    public boolean checkoutBook(String title) {
        for (Book book : books) {
            if (book.getTitle().equals(title)) {
                if (book.isAvailable()) {
                    book.markCheckedOut();
                    return true;
                }
                return false;
            }
        }
        return false;
    }
}

class Library {
    private List<Section> sections;

    public Library() {
        this.sections = new ArrayList<>();
    }

    public void addSection(Section section) { sections.add(section); }

    public boolean checkoutBook(String title) {
        for (Section section : sections) {
            if (section.checkoutBook(title)) {
                return true;
            }
        }
        return false;
    }
}

class CheckoutService {
    private Library library;

    public CheckoutService(Library library) {
        this.library = library;
    }

    public boolean checkout(String bookTitle) {
        return library.checkoutBook(bookTitle);
    }
}

public class Main {
    public static void main(String[] args) {
        Library library = new Library();

        Section fiction = new Section("Fiction");
        fiction.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald"));
        fiction.addBook(new Book("1984", "George Orwell"));
        library.addSection(fiction);

        Section nonFiction = new Section("Non-Fiction");
        nonFiction.addBook(new Book("Clean Code", "Robert C. Martin"));
        library.addSection(nonFiction);

        CheckoutService service = new CheckoutService(library);

        boolean result1 = service.checkout("The Great Gatsby");
        System.out.println("Checking out \"The Great Gatsby\"... " + (result1 " "Success!" : "Failed (not found)"));

        boolean result2 = service.checkout("The Great Gatsby");
        System.out.println("Checking out \"The Great Gatsby\"... " + (result2 " "Success!" : "Failed (already checked out)"));

        boolean result3 = service.checkout("Unknown Book");
        System.out.println("Checking out \"Unknown Book\"... " + (result3 " "Success!" : "Failed (not found)"));
    }
}
```

```python
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author
        self.available = True

    def mark_checked_out(self):
        self.available = False

class Section:
    def __init__(self, name):
        self.name = name
        self._books = []

    def add_book(self, book):
        self._books.append(book)

    def checkout_book(self, title):
        for book in self._books:
            if book.title == title:
                if book.available:
                    book.mark_checked_out()
                    return True
                return False
        return False

class Library:
    def __init__(self):
        self._sections = []

    def add_section(self, section):
        self._sections.append(section)

    def checkout_book(self, title):
        for section in self._sections:
            if section.checkout_book(title):
                return True
        return False

class CheckoutService:
    def __init__(self, library):
        self._library = library

    def checkout(self, book_title):
        return self._library.checkout_book(book_title)

if __name__ == "__main__":
    library = Library()

    fiction = Section("Fiction")
    fiction.add_book(Book("The Great Gatsby", "F. Scott Fitzgerald"))
    fiction.add_book(Book("1984", "George Orwell"))
    library.add_section(fiction)

    non_fiction = Section("Non-Fiction")
    non_fiction.add_book(Book("Clean Code", "Robert C. Martin"))
    library.add_section(non_fiction)

    service = CheckoutService(library)

    result1 = service.checkout("The Great Gatsby")
    print(f'Checking out "The Great Gatsby"... {"Success!" if result1 else "Failed (not found)"}')

    result2 = service.checkout("The Great Gatsby")
    print(f'Checking out "The Great Gatsby"... {"Success!" if result2 else "Failed (already checked out)"}')

    result3 = service.checkout("Unknown Book")
    print(f'Checking out "Unknown Book"... {"Success!" if result3 else "Failed (not found)"}')
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Book {
    string title;
    string author;
    bool available;
public:
    Book(string title, string author)
        : title(title), author(author), available(true) {}

    string getTitle() const { return title; }
    string getAuthor() const { return author; }
    bool isAvailable() const { return available; }
    void markCheckedOut() { available = false; }
};

class Section {
    string name;
    vector<Book> books;
public:
    Section(string name) : name(name) {}

    void addBook(const Book& book) { books.push_back(book); }

    bool checkoutBook(const string& title) {
        for (auto& book : books) {
            if (book.getTitle() == title) {
                if (book.isAvailable()) {
                    book.markCheckedOut();
                    return true;
                }
                return false;
            }
        }
        return false;
    }
};

class Library {
    vector<Section> sections;
public:
    void addSection(const Section& section) { sections.push_back(section); }

    bool checkoutBook(const string& title) {
        for (auto& section : sections) {
            if (section.checkoutBook(title)) {
                return true;
            }
        }
        return false;
    }
};

class CheckoutService {
    Library* library;
public:
    CheckoutService(Library* library) : library(library) {}

    bool checkout(const string& bookTitle) {
        return library->checkoutBook(bookTitle);
    }
};

int main() {
    Library library;

    Section fiction("Fiction");
    fiction.addBook(Book("The Great Gatsby", "F. Scott Fitzgerald"));
    fiction.addBook(Book("1984", "George Orwell"));
    library.addSection(fiction);

    Section nonFiction("Non-Fiction");
    nonFiction.addBook(Book("Clean Code", "Robert C. Martin"));
    library.addSection(nonFiction);

    CheckoutService service(&library);

    bool result1 = service.checkout("The Great Gatsby");
    cout << "Checking out \"The Great Gatsby\"... " << (result1 " "Success!" : "Failed (not found)") << endl;

    bool result2 = service.checkout("The Great Gatsby");
    cout << "Checking out \"The Great Gatsby\"... " << (result2 " "Success!" : "Failed (already checked out)") << endl;

    bool result3 = service.checkout("Unknown Book");
    cout << "Checking out \"Unknown Book\"... " << (result3 " "Success!" : "Failed (not found)") << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Book struct {
	title     string
	author    string
	available bool
}

func NewBook(title, author string) *Book {
	return &Book{
		title:     title,
		author:    author,
		available: true,
	}
}

func (b *Book) GetTitle() string {
	return b.title
}

func (b *Book) GetAuthor() string {
	return b.author
}

func (b *Book) IsAvailable() bool {
	return b.available
}

func (b *Book) MarkCheckedOut() {
	b.available = false
}

type Section struct {
	name  string
	books []*Book
}

func NewSection(name string) *Section {
	return &Section{
		name:  name,
		books: make([]*Book, 0),
	}
}

func (s *Section) AddBook(book *Book) {
	s.books = append(s.books, book)
}

func (s *Section) CheckoutBook(title string) bool {
	for _, book := range s.books {
		if book.GetTitle() == title {
			if book.IsAvailable() {
				book.MarkCheckedOut()
				return true
			}
			return false
		}
	}
	return false
}

type Library struct {
	sections []*Section
}

func NewLibrary() *Library {
	return &Library{
		sections: make([]*Section, 0),
	}
}

func (l *Library) AddSection(section *Section) {
	l.sections = append(l.sections, section)
}

func (l *Library) CheckoutBook(title string) bool {
	for _, section := range l.sections {
		if section.CheckoutBook(title) {
			return true
		}
	}
	return false
}

type CheckoutService struct {
	library *Library
}

func NewCheckoutService(library *Library) *CheckoutService {
	return &CheckoutService{library: library}
}

func (cs *CheckoutService) Checkout(bookTitle string) bool {
	return cs.library.CheckoutBook(bookTitle)
}

func main() {
	library := NewLibrary()

	fiction := NewSection("Fiction")
	fiction.AddBook(NewBook("The Great Gatsby", "F. Scott Fitzgerald"))
	fiction.AddBook(NewBook("1984", "George Orwell"))
	library.AddSection(fiction)

	nonFiction := NewSection("Non-Fiction")
	nonFiction.AddBook(NewBook("Clean Code", "Robert C. Martin"))
	library.AddSection(nonFiction)

	service := NewCheckoutService(library)

	result1 := service.Checkout("The Great Gatsby")
	fmt.Printf("Checking out \"The Great Gatsby\"... %s\n", statusMessage(result1, "not found"))

	result2 := service.Checkout("The Great Gatsby")
	fmt.Printf("Checking out \"The Great Gatsby\"... %s\n", statusMessage(result2, "already checked out"))

	result3 := service.Checkout("Unknown Book")
	fmt.Printf("Checking out \"Unknown Book\"... %s\n", statusMessage(result3, "not found"))
}

func statusMessage(success bool, failureReason string) string {
	if success {
		return "Success!"
	}
	return fmt.Sprintf("Failed (%s)", failureReason)
}
```

```csharp
using System;
using System.Collections.Generic;

class Book
{
    public string Title { get; }
    public string Author { get; }
    public bool Available { get; private set; }

    public Book(string title, string author)
    {
        Title = title;
        Author = author;
        Available = true;
    }

    public void MarkCheckedOut() { Available = false; }
}

class Section
{
    public string Name { get; }
    private List<Book> books;

    public Section(string name)
    {
        Name = name;
        books = new List<Book>();
    }

    public void AddBook(Book book) { books.Add(book); }

    public bool CheckoutBook(string title)
    {
        foreach (var book in books)
        {
            if (book.Title == title)
            {
                if (book.Available)
                {
                    book.MarkCheckedOut();
                    return true;
                }
                return false;
            }
        }
        return false;
    }
}

class Library
{
    private List<Section> sections;

    public Library()
    {
        sections = new List<Section>();
    }

    public void AddSection(Section section) { sections.Add(section); }

    public bool CheckoutBook(string title)
    {
        foreach (var section in sections)
        {
            if (section.CheckoutBook(title))
            {
                return true;
            }
        }
        return false;
    }
}

class CheckoutService
{
    private Library library;

    public CheckoutService(Library library)
    {
        this.library = library;
    }

    public bool Checkout(string bookTitle)
    {
        return library.CheckoutBook(bookTitle);
    }
}

class Program
{
    static void Main(string[] args)
    {
        Library library = new Library();

        Section fiction = new Section("Fiction");
        fiction.AddBook(new Book("The Great Gatsby", "F. Scott Fitzgerald"));
        fiction.AddBook(new Book("1984", "George Orwell"));
        library.AddSection(fiction);

        Section nonFiction = new Section("Non-Fiction");
        nonFiction.AddBook(new Book("Clean Code", "Robert C. Martin"));
        library.AddSection(nonFiction);

        CheckoutService service = new CheckoutService(library);

        bool result1 = service.Checkout("The Great Gatsby");
        Console.WriteLine($"Checking out \"The Great Gatsby\"... {(result1 " "Success!" : "Failed (not found)")}");

        bool result2 = service.Checkout("The Great Gatsby");
        Console.WriteLine($"Checking out \"The Great Gatsby\"... {(result2 " "Success!" : "Failed (already checked out)")}");

        bool result3 = service.Checkout("Unknown Book");
        Console.WriteLine($"Checking out \"Unknown Book\"... {(result3 " "Success!" : "Failed (not found)")}");
    }
}
```

```typescript
class Book {
    private title: string;
    private author: string;
    private available: boolean;

    constructor(title: string, author: string) {
        this.title = title;
        this.author = author;
        this.available = true;
    }

    getTitle(): string { return this.title; }
    getAuthor(): string { return this.author; }
    isAvailable(): boolean { return this.available; }
    markCheckedOut(): void { this.available = false; }
}

class Section {
    private name: string;
    private books: Book[];

    constructor(name: string) {
        this.name = name;
        this.books = [];
    }

    addBook(book: Book): void { this.books.push(book); }

    checkoutBook(title: string): boolean {
        for (const book of this.books) {
            if (book.getTitle() === title) {
                if (book.isAvailable()) {
                    book.markCheckedOut();
                    return true;
                }
                return false;
            }
        }
        return false;
    }
}

class Library {
    private sections: Section[];

    constructor() {
        this.sections = [];
    }

    addSection(section: Section): void { this.sections.push(section); }

    checkoutBook(title: string): boolean {
        for (const section of this.sections) {
            if (section.checkoutBook(title)) {
                return true;
            }
        }
        return false;
    }
}

class CheckoutService {
    private library: Library;

    constructor(library: Library) {
        this.library = library;
    }

    checkout(bookTitle: string): boolean {
        return this.library.checkoutBook(bookTitle);
    }
}

// --- Main ---
const library = new Library();

const fiction = new Section("Fiction");
fiction.addBook(new Book("The Great Gatsby", "F. Scott Fitzgerald"));
fiction.addBook(new Book("1984", "George Orwell"));
library.addSection(fiction);

const nonFiction = new Section("Non-Fiction");
nonFiction.addBook(new Book("Clean Code", "Robert C. Martin"));
library.addSection(nonFiction);

const service = new CheckoutService(library);

const result1 = service.checkout("The Great Gatsby");
console.log(`Checking out "The Great Gatsby"... ${result1 " "Success!" : "Failed (not found)"}`);

const result2 = service.checkout("The Great Gatsby");
console.log(`Checking out "The Great Gatsby"... ${result2 " "Success!" : "Failed (already checked out)"}`);

const result3 = service.checkout("Unknown Book");
console.log(`Checking out "Unknown Book"... ${result3 " "Success!" : "Failed (not found)"}`);
```


