---
id: "lld-class-relationships-exercise-aggregation"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Class Relationships"
subSection: ""
title: "Exercise: Aggregation"
slug: "lld-class-relationships-exercise-aggregation"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Aggregation as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Aggregation Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Class Relationships","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Shopping Cart System

**Problem:** Build an e-commerce system where products exist in a catalog and customers add them to shopping carts. This exercise practices aggregation where parts (products) are shared across multiple wholes (carts) and survive when a cart is cleared.

**Requirements:**

- `Product` with a name and price.
- `Catalog` with a list of `Product` objects. A `findByName(name)` method that returns the matching product.
- `Cart` with a list of `Product` objects. `addItem(product)` and `clearCart()` methods. A `getTotal()` method that sums the prices.
- `Customer` with a name and a `Cart`. A `checkout()` method that prints the cart contents and total, then clears the cart.

```java
import java.util.ArrayList;
import java.util.List;

class Product {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
}

class Catalog {
    private List<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        // TODO: Add product to catalog
    }

    public Product findByName(String name) {
        // TODO: Find and return product by name, return null if not found
        return null;
    }

    public int getProductCount() { return products.size(); }
}

class Cart {
    private List<Product> items = new ArrayList<>();

    public void addItem(Product product) {
        // TODO: Add product to cart
    }

    public void clearCart() {
        // TODO: Remove all items (don't destroy the products!)
    }

    public double getTotal() {
        // TODO: Sum prices of all items
        return 0;
    }

    public List<Product> getItems() { return items; }
    public int getItemCount() { return items.size(); }
}

class Customer {
    private String name;
    private Cart cart;

    public Customer(String name, Cart cart) {
        this.name = name;
        this.cart = cart;
    }

    public void checkout() {
        // TODO: Print cart items and total, then clear cart
    }

    public String getName() { return name; }
    public Cart getCart() { return cart; }
}

public class Main {
    public static void main(String[] args) {
        // Create products and add to catalog
        Product laptop = new Product("Laptop", 999.99);
        Product mouse = new Product("Mouse", 29.99);
        Product keyboard = new Product("Keyboard", 79.99);

        Catalog catalog = new Catalog();
        catalog.addProduct(laptop);
        catalog.addProduct(mouse);
        catalog.addProduct(keyboard);

        // Two customers share the same catalog products
        Cart cart1 = new Cart();
        Cart cart2 = new Cart();

        Customer alice = new Customer("Alice", cart1);
        Customer bob = new Customer("Bob", cart2);

        // Both customers add the same laptop to their carts
        cart1.addItem(laptop);
        cart1.addItem(mouse);
        cart2.addItem(laptop);
        cart2.addItem(keyboard);

        System.out.println("Alice's cart: " + cart1.getItemCount() + " items, $" + cart1.getTotal());
        System.out.println("Bob's cart: " + cart2.getItemCount() + " items, $" + cart2.getTotal());

        alice.checkout();

        // After Alice checks out, products still exist
        System.out.println("Catalog still has " + catalog.getProductCount() + " products");
        System.out.println("Bob's cart still has " + cart2.getItemCount() + " items");
        System.out.println("Laptop still exists: " + laptop.getName());
    }
}
```

```python
class Product:
    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price

class Catalog:
    def __init__(self):
        self.products = []

    def add_product(self, product: Product):
        # TODO: Add product to catalog
        pass

    def find_by_name(self, name: str):
        # TODO: Find and return product by name, return None if not found
        return None

    def get_product_count(self):
        return len(self.products)

class Cart:
    def __init__(self):
        self.items = []

    def add_item(self, product: Product):
        # TODO: Add product to cart
        pass

    def clear_cart(self):
        # TODO: Remove all items (don't destroy the products!)
        pass

    def get_total(self):
        # TODO: Sum prices of all items
        return 0

    def get_item_count(self):
        return len(self.items)

class Customer:
    def __init__(self, name: str, cart: Cart):
        self.name = name
        self.cart = cart

    def checkout(self):
        # TODO: Print cart items and total, then clear cart
        pass

if __name__ == "__main__":
    laptop = Product("Laptop", 999.99)
    mouse = Product("Mouse", 29.99)
    keyboard = Product("Keyboard", 79.99)

    catalog = Catalog()
    catalog.add_product(laptop)
    catalog.add_product(mouse)
    catalog.add_product(keyboard)

    cart1 = Cart()
    cart2 = Cart()

    alice = Customer("Alice", cart1)
    bob = Customer("Bob", cart2)

    cart1.add_item(laptop)
    cart1.add_item(mouse)
    cart2.add_item(laptop)
    cart2.add_item(keyboard)

    print(f"Alice's cart: {cart1.get_item_count()} items, ${cart1.get_total()}")
    print(f"Bob's cart: {cart2.get_item_count()} items, ${cart2.get_total()}")

    alice.checkout()

    print(f"Catalog still has {catalog.get_product_count()} products")
    print(f"Bob's cart still has {cart2.get_item_count()} items")
    print(f"Laptop still exists: {laptop.name}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Product {
private:
    string name;
    double price;
public:
    Product(const string& name, double price) : name(name), price(price) {}
    string getName() const { return name; }
    double getPrice() const { return price; }
};

class Catalog {
private:
    vector<Product*> products;
public:
    void addProduct(Product* product) {
        // TODO: Add product to catalog
    }

    Product* findByName(const string& name) {
        // TODO: Find and return product by name, return nullptr if not found
        return nullptr;
    }

    int getProductCount() const { return products.size(); }
};

class Cart {
private:
    vector<Product*> items;
public:
    void addItem(Product* product) {
        // TODO: Add product to cart
    }

    void clearCart() {
        // TODO: Remove all items (don't destroy the products!)
    }

    double getTotal() const {
        // TODO: Sum prices of all items
        return 0;
    }

    vector<Product*> getItems() const { return items; }
    int getItemCount() const { return items.size(); }
};

class Customer {
private:
    string name;
    Cart* cart;
public:
    Customer(const string& name, Cart* cart) : name(name), cart(cart) {}

    void checkout() {
        // TODO: Print cart items and total, then clear cart
    }

    string getName() const { return name; }
    Cart* getCart() const { return cart; }
};

int main() {
    Product laptop("Laptop", 999.99);
    Product mouse("Mouse", 29.99);
    Product keyboard("Keyboard", 79.99);

    Catalog catalog;
    catalog.addProduct(&laptop);
    catalog.addProduct(&mouse);
    catalog.addProduct(&keyboard);

    Cart cart1, cart2;
    Customer alice("Alice", &cart1);
    Customer bob("Bob", &cart2);

    cart1.addItem(&laptop);
    cart1.addItem(&mouse);
    cart2.addItem(&laptop);
    cart2.addItem(&keyboard);

    cout << "Alice's cart: " << cart1.getItemCount() << " items, $" << cart1.getTotal() << endl;
    cout << "Bob's cart: " << cart2.getItemCount() << " items, $" << cart2.getTotal() << endl;

    alice.checkout();

    cout << "Catalog still has " << catalog.getProductCount() << " products" << endl;
    cout << "Bob's cart still has " << cart2.getItemCount() << " items" << endl;
    cout << "Laptop still exists: " << laptop.getName() << endl;

    return 0;
}
```

```go
package main

type Product struct {
	name  string
	price float64
}

func NewProduct(name string, price float64) *Product {
	return &Product{name: name, price: price}
}

func (p *Product) GetName() string {
	return p.name
}

func (p *Product) GetPrice() float64 {
	return p.price
}

type Catalog struct {
	products []*Product
}

func NewCatalog() *Catalog {
	return &Catalog{products: []*Product{}}
}

func (c *Catalog) AddProduct(product *Product) {
	// TODO: Add product to catalog
}

func (c *Catalog) FindByName(name string) *Product {
	// TODO: Find and return product by name, return nil if not found
	return nil
}

func (c *Catalog) GetProductCount() int {
	return len(c.products)
}

type Cart struct {
	items []*Product
}

func NewCart() *Cart {
	return &Cart{items: []*Product{}}
}

func (c *Cart) AddItem(product *Product) {
	// TODO: Add product to cart
}

func (c *Cart) ClearCart() {
	// TODO: Remove all items (don't destroy the products!)
}

func (c *Cart) GetTotal() float64 {
	// TODO: Sum prices of all items
	return 0
}

func (c *Cart) GetItems() []*Product {
	return c.items
}

func (c *Cart) GetItemCount() int {
	return len(c.items)
}

type Customer struct {
	name string
	cart *Cart
}

func NewCustomer(name string, cart *Cart) *Customer {
	return &Customer{name: name, cart: cart}
}

func (c *Customer) Checkout() {
	// TODO: Print cart items and total, then clear cart
}

func (c *Customer) GetName() string {
	return c.name
}

func (c *Customer) GetCart() *Cart {
	return c.cart
}

func main() {
	laptop := NewProduct("Laptop", 999.99)
	mouse := NewProduct("Mouse", 29.99)
	keyboard := NewProduct("Keyboard", 79.99)

	catalog := NewCatalog()
	catalog.AddProduct(laptop)
	catalog.AddProduct(mouse)
	catalog.AddProduct(keyboard)

	cart1 := NewCart()
	cart2 := NewCart()

	alice := NewCustomer("Alice", cart1)
	bob := NewCustomer("Bob", cart2)

	cart1.AddItem(laptop)
	cart1.AddItem(mouse)
	cart2.AddItem(laptop)
	cart2.AddItem(keyboard)

	_ = alice
	_ = bob
	_ = catalog
	_ = cart1
	_ = cart2
	_ = laptop
	_ = mouse
	_ = keyboard
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Product {
    public string Name { get; }
    public double Price { get; }

    public Product(string name, double price) {
        Name = name;
        Price = price;
    }
}

class Catalog {
    private List<Product> products = new List<Product>();

    public void AddProduct(Product product) {
        // TODO: Add product to catalog
    }

    public Product FindByName(string name) {
        // TODO: Find and return product by name, return null if not found
        return null;
    }

    public int GetProductCount() { return products.Count; }
}

class Cart {
    private List<Product> items = new List<Product>();

    public void AddItem(Product product) {
        // TODO: Add product to cart
    }

    public void ClearCart() {
        // TODO: Remove all items (don't destroy the products!)
    }

    public double GetTotal() {
        // TODO: Sum prices of all items
        return 0;
    }

    public List<Product> GetItems() { return items; }
    public int GetItemCount() { return items.Count; }
}

class Customer {
    public string Name { get; }
    public Cart Cart { get; }

    public Customer(string name, Cart cart) {
        Name = name;
        Cart = cart;
    }

    public void Checkout() {
        // TODO: Print cart items and total, then clear cart
    }
}

class Program {
    static void Main() {
        var laptop = new Product("Laptop", 999.99);
        var mouse = new Product("Mouse", 29.99);
        var keyboard = new Product("Keyboard", 79.99);

        var catalog = new Catalog();
        catalog.AddProduct(laptop);
        catalog.AddProduct(mouse);
        catalog.AddProduct(keyboard);

        var cart1 = new Cart();
        var cart2 = new Cart();

        var alice = new Customer("Alice", cart1);
        var bob = new Customer("Bob", cart2);

        cart1.AddItem(laptop);
        cart1.AddItem(mouse);
        cart2.AddItem(laptop);
        cart2.AddItem(keyboard);

        Console.WriteLine($"Alice's cart: {cart1.GetItemCount()} items, ${cart1.GetTotal()}");
        Console.WriteLine($"Bob's cart: {cart2.GetItemCount()} items, ${cart2.GetTotal()}");

        alice.Checkout();

        Console.WriteLine($"Catalog still has {catalog.GetProductCount()} products");
        Console.WriteLine($"Bob's cart still has {cart2.GetItemCount()} items");
        Console.WriteLine($"Laptop still exists: {laptop.Name}");
    }
}
```

```typescript
class Product {
    private name: string;
    private price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    getName(): string { return this.name; }
    getPrice(): number { return this.price; }
}

class Catalog {
    private products: Product[] = [];

    addProduct(product: Product): void {
        // TODO: Add product to catalog
    }

    findByName(name: string): Product | undefined {
        // TODO: Find and return product by name, return undefined if not found
        return undefined;
    }

    getProductCount(): number { return this.products.length; }
}

class Cart {
    private items: Product[] = [];

    addItem(product: Product): void {
        // TODO: Add product to cart
    }

    clearCart(): void {
        // TODO: Remove all items (don't destroy the products!)
    }

    getTotal(): number {
        // TODO: Sum prices of all items
        return 0;
    }

    getItems(): Product[] { return this.items; }
    getItemCount(): number { return this.items.length; }
}

class Customer {
    private name: string;
    private cart: Cart;

    constructor(name: string, cart: Cart) {
        this.name = name;
        this.cart = cart;
    }

    checkout(): void {
        // TODO: Print cart items and total, then clear cart
    }

    getName(): string { return this.name; }
    getCart(): Cart { return this.cart; }
}

const laptop = new Product("Laptop", 999.99);
const mouse = new Product("Mouse", 29.99);
const keyboard = new Product("Keyboard", 79.99);

const catalog = new Catalog();
catalog.addProduct(laptop);
catalog.addProduct(mouse);
catalog.addProduct(keyboard);

const cart1 = new Cart();
const cart2 = new Cart();

const alice = new Customer("Alice", cart1);
const bob = new Customer("Bob", cart2);

cart1.addItem(laptop);
cart1.addItem(mouse);
cart2.addItem(laptop);
cart2.addItem(keyboard);

console.log(`Alice's cart: ${cart1.getItemCount()} items, $${cart1.getTotal()}`);
console.log(`Bob's cart: ${cart2.getItemCount()} items, $${cart2.getTotal()}`);

alice.checkout();

console.log(`Catalog still has ${catalog.getProductCount()} products`);
console.log(`Bob's cart still has ${cart2.getItemCount()} items`);
console.log(`Laptop still exists: ${laptop.getName()}`);
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.List;

class Product {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() { return name; }
    public double getPrice() { return price; }
}

class Catalog {
    private List<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        products.add(product);
    }

    public Product findByName(String name) {
        for (Product p : products) {
            if (p.getName().equals(name)) return p;
        }
        return null;
    }

    public int getProductCount() { return products.size(); }
}

class Cart {
    private List<Product> items = new ArrayList<>();

    public void addItem(Product product) {
        items.add(product);
    }

    public void clearCart() {
        items.clear();
    }

    public double getTotal() {
        double total = 0;
        for (Product p : items) {
            total += p.getPrice();
        }
        return total;
    }

    public List<Product> getItems() { return items; }
    public int getItemCount() { return items.size(); }
}

class Customer {
    private String name;
    private Cart cart;

    public Customer(String name, Cart cart) {
        this.name = name;
        this.cart = cart;
    }

    public void checkout() {
        System.out.println(name + " checking out:");
        for (Product p : cart.getItems()) {
            System.out.println("  - " + p.getName() + ": $" + p.getPrice());
        }
        System.out.println("  Total: $" + cart.getTotal());
        cart.clearCart();
    }

    public String getName() { return name; }
    public Cart getCart() { return cart; }
}

public class Main {
    public static void main(String[] args) {
        Product laptop = new Product("Laptop", 999.99);
        Product mouse = new Product("Mouse", 29.99);
        Product keyboard = new Product("Keyboard", 79.99);

        Catalog catalog = new Catalog();
        catalog.addProduct(laptop);
        catalog.addProduct(mouse);
        catalog.addProduct(keyboard);

        Cart cart1 = new Cart();
        Cart cart2 = new Cart();

        Customer alice = new Customer("Alice", cart1);
        Customer bob = new Customer("Bob", cart2);

        cart1.addItem(laptop);
        cart1.addItem(mouse);
        cart2.addItem(laptop);
        cart2.addItem(keyboard);

        System.out.println("Alice's cart: " + cart1.getItemCount() + " items, $" + cart1.getTotal());
        System.out.println("Bob's cart: " + cart2.getItemCount() + " items, $" + cart2.getTotal());

        alice.checkout();

        System.out.println("Catalog still has " + catalog.getProductCount() + " products");
        System.out.println("Bob's cart still has " + cart2.getItemCount() + " items");
        System.out.println("Laptop still exists: " + laptop.getName());
    }
}
```

```python
class Product:
    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price

class Catalog:
    def __init__(self):
        self.products = []

    def add_product(self, product: Product):
        self.products.append(product)

    def find_by_name(self, name: str):
        for p in self.products:
            if p.name == name:
                return p
        return None

    def get_product_count(self):
        return len(self.products)

class Cart:
    def __init__(self):
        self.items = []

    def add_item(self, product: Product):
        self.items.append(product)

    def clear_cart(self):
        self.items.clear()

    def get_total(self):
        return sum(p.price for p in self.items)

    def get_item_count(self):
        return len(self.items)

class Customer:
    def __init__(self, name: str, cart: Cart):
        self.name = name
        self.cart = cart

    def checkout(self):
        print(f"{self.name} checking out:")
        for p in self.cart.items:
            print(f"  - {p.name}: ${p.price}")
        print(f"  Total: ${self.cart.get_total()}")
        self.cart.clear_cart()

if __name__ == "__main__":
    laptop = Product("Laptop", 999.99)
    mouse = Product("Mouse", 29.99)
    keyboard = Product("Keyboard", 79.99)

    catalog = Catalog()
    catalog.add_product(laptop)
    catalog.add_product(mouse)
    catalog.add_product(keyboard)

    cart1 = Cart()
    cart2 = Cart()

    alice = Customer("Alice", cart1)
    bob = Customer("Bob", cart2)

    cart1.add_item(laptop)
    cart1.add_item(mouse)
    cart2.add_item(laptop)
    cart2.add_item(keyboard)

    print(f"Alice's cart: {cart1.get_item_count()} items, ${cart1.get_total()}")
    print(f"Bob's cart: {cart2.get_item_count()} items, ${cart2.get_total()}")

    alice.checkout()

    print(f"Catalog still has {catalog.get_product_count()} products")
    print(f"Bob's cart still has {cart2.get_item_count()} items")
    print(f"Laptop still exists: {laptop.name}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Product {
private:
    string name;
    double price;
public:
    Product(const string& name, double price) : name(name), price(price) {}
    string getName() const { return name; }
    double getPrice() const { return price; }
};

class Catalog {
private:
    vector<Product*> products;
public:
    void addProduct(Product* product) {
        products.push_back(product);
    }

    Product* findByName(const string& name) {
        for (auto* p : products) {
            if (p->getName() == name) return p;
        }
        return nullptr;
    }

    int getProductCount() const { return products.size(); }
};

class Cart {
private:
    vector<Product*> items;
public:
    void addItem(Product* product) {
        items.push_back(product);
    }

    void clearCart() {
        items.clear();
    }

    double getTotal() const {
        double total = 0;
        for (auto* p : items) {
            total += p->getPrice();
        }
        return total;
    }

    vector<Product*> getItems() const { return items; }
    int getItemCount() const { return items.size(); }
};

class Customer {
private:
    string name;
    Cart* cart;
public:
    Customer(const string& name, Cart* cart) : name(name), cart(cart) {}

    void checkout() {
        cout << name << " checking out:" << endl;
        for (auto* p : cart->getItems()) {
            cout << "  - " << p->getName() << ": $" << p->getPrice() << endl;
        }
        cout << "  Total: $" << cart->getTotal() << endl;
        cart->clearCart();
    }

    string getName() const { return name; }
    Cart* getCart() const { return cart; }
};

int main() {
    Product laptop("Laptop", 999.99);
    Product mouse("Mouse", 29.99);
    Product keyboard("Keyboard", 79.99);

    Catalog catalog;
    catalog.addProduct(&laptop);
    catalog.addProduct(&mouse);
    catalog.addProduct(&keyboard);

    Cart cart1, cart2;
    Customer alice("Alice", &cart1);
    Customer bob("Bob", &cart2);

    cart1.addItem(&laptop);
    cart1.addItem(&mouse);
    cart2.addItem(&laptop);
    cart2.addItem(&keyboard);

    cout << "Alice's cart: " << cart1.getItemCount() << " items, $" << cart1.getTotal() << endl;
    cout << "Bob's cart: " << cart2.getItemCount() << " items, $" << cart2.getTotal() << endl;

    alice.checkout();

    cout << "Catalog still has " << catalog.getProductCount() << " products" << endl;
    cout << "Bob's cart still has " << cart2.getItemCount() << " items" << endl;
    cout << "Laptop still exists: " << laptop.getName() << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Product struct {
	name  string
	price float64
}

func NewProduct(name string, price float64) *Product {
	return &Product{name: name, price: price}
}

func (p *Product) GetName() string {
	return p.name
}

func (p *Product) GetPrice() float64 {
	return p.price
}

type Catalog struct {
	products []*Product
}

func NewCatalog() *Catalog {
	return &Catalog{products: make([]*Product, 0)}
}

func (c *Catalog) AddProduct(product *Product) {
	c.products = append(c.products, product)
}

func (c *Catalog) FindByName(name string) *Product {
	for _, p := range c.products {
		if p.GetName() == name {
			return p
		}
	}
	return nil
}

func (c *Catalog) GetProductCount() int {
	return len(c.products)
}

type Cart struct {
	items []*Product
}

func NewCart() *Cart {
	return &Cart{items: make([]*Product, 0)}
}

func (c *Cart) AddItem(product *Product) {
	c.items = append(c.items, product)
}

func (c *Cart) ClearCart() {
	c.items = c.items[:0]
}

func (c *Cart) GetTotal() float64 {
	total := 0.0
	for _, p := range c.items {
		total += p.GetPrice()
	}
	return total
}

func (c *Cart) GetItems() []*Product {
	return c.items
}

func (c *Cart) GetItemCount() int {
	return len(c.items)
}

type Customer struct {
	name string
	cart *Cart
}

func NewCustomer(name string, cart *Cart) *Customer {
	return &Customer{name: name, cart: cart}
}

func (c *Customer) Checkout() {
	fmt.Printf("%s checking out:\n", c.name)
	for _, p := range c.cart.GetItems() {
		fmt.Printf("  - %s: $%.2f\n", p.GetName(), p.GetPrice())
	}
	fmt.Printf("  Total: $%.2f\n", c.cart.GetTotal())
	c.cart.ClearCart()
}

func (c *Customer) GetName() string {
	return c.name
}

func (c *Customer) GetCart() *Cart {
	return c.cart
}

func main() {
	laptop := NewProduct("Laptop", 999.99)
	mouse := NewProduct("Mouse", 29.99)
	keyboard := NewProduct("Keyboard", 79.99)

	catalog := NewCatalog()
	catalog.AddProduct(laptop)
	catalog.AddProduct(mouse)
	catalog.AddProduct(keyboard)

	cart1 := NewCart()
	cart2 := NewCart()

	alice := NewCustomer("Alice", cart1)
	bob := NewCustomer("Bob", cart2)

	cart1.AddItem(laptop)
	cart1.AddItem(mouse)
	cart2.AddItem(laptop)
	cart2.AddItem(keyboard)

	fmt.Printf("Alice's cart: %d items, $%.2f\n", cart1.GetItemCount(), cart1.GetTotal())
	fmt.Printf("Bob's cart: %d items, $%.2f\n", cart2.GetItemCount(), cart2.GetTotal())

	alice.Checkout()

	fmt.Printf("Catalog still has %d products\n", catalog.GetProductCount())
	fmt.Printf("Bob's cart still has %d items\n", cart2.GetItemCount())
	fmt.Printf("Laptop still exists: %s\n", laptop.GetName())
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Product {
    public string Name { get; }
    public double Price { get; }

    public Product(string name, double price) {
        Name = name;
        Price = price;
    }
}

class Catalog {
    private List<Product> products = new List<Product>();

    public void AddProduct(Product product) {
        products.Add(product);
    }

    public Product FindByName(string name) {
        foreach (var p in products) {
            if (p.Name == name) return p;
        }
        return null;
    }

    public int GetProductCount() { return products.Count; }
}

class Cart {
    private List<Product> items = new List<Product>();

    public void AddItem(Product product) {
        items.Add(product);
    }

    public void ClearCart() {
        items.Clear();
    }

    public double GetTotal() {
        return items.Sum(p => p.Price);
    }

    public List<Product> GetItems() { return items; }
    public int GetItemCount() { return items.Count; }
}

class Customer {
    public string Name { get; }
    public Cart Cart { get; }

    public Customer(string name, Cart cart) {
        Name = name;
        Cart = cart;
    }

    public void Checkout() {
        Console.WriteLine($"{Name} checking out:");
        foreach (var p in Cart.GetItems()) {
            Console.WriteLine($"  - {p.Name}: ${p.Price}");
        }
        Console.WriteLine($"  Total: ${Cart.GetTotal()}");
        Cart.ClearCart();
    }
}

class Program {
    static void Main() {
        var laptop = new Product("Laptop", 999.99);
        var mouse = new Product("Mouse", 29.99);
        var keyboard = new Product("Keyboard", 79.99);

        var catalog = new Catalog();
        catalog.AddProduct(laptop);
        catalog.AddProduct(mouse);
        catalog.AddProduct(keyboard);

        var cart1 = new Cart();
        var cart2 = new Cart();

        var alice = new Customer("Alice", cart1);
        var bob = new Customer("Bob", cart2);

        cart1.AddItem(laptop);
        cart1.AddItem(mouse);
        cart2.AddItem(laptop);
        cart2.AddItem(keyboard);

        Console.WriteLine($"Alice's cart: {cart1.GetItemCount()} items, ${cart1.GetTotal()}");
        Console.WriteLine($"Bob's cart: {cart2.GetItemCount()} items, ${cart2.GetTotal()}");

        alice.Checkout();

        Console.WriteLine($"Catalog still has {catalog.GetProductCount()} products");
        Console.WriteLine($"Bob's cart still has {cart2.GetItemCount()} items");
        Console.WriteLine($"Laptop still exists: {laptop.Name}");
    }
}
```

```typescript
class Product {
    private name: string;
    private price: number;

    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    getName(): string { return this.name; }
    getPrice(): number { return this.price; }
}

class Catalog {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    findByName(name: string): Product | undefined {
        return this.products.find(p => p.getName() === name);
    }

    getProductCount(): number { return this.products.length; }
}

class Cart {
    private items: Product[] = [];

    addItem(product: Product): void {
        this.items.push(product);
    }

    clearCart(): void {
        this.items = [];
    }

    getTotal(): number {
        return this.items.reduce((sum, p) => sum + p.getPrice(), 0);
    }

    getItems(): Product[] { return this.items; }
    getItemCount(): number { return this.items.length; }
}

class Customer {
    private name: string;
    private cart: Cart;

    constructor(name: string, cart: Cart) {
        this.name = name;
        this.cart = cart;
    }

    checkout(): void {
        console.log(`${this.name} checking out:`);
        for (const p of this.cart.getItems()) {
            console.log(`  - ${p.getName()}: $${p.getPrice()}`);
        }
        console.log(`  Total: $${this.cart.getTotal()}`);
        this.cart.clearCart();
    }

    getName(): string { return this.name; }
    getCart(): Cart { return this.cart; }
}

const laptop = new Product("Laptop", 999.99);
const mouse = new Product("Mouse", 29.99);
const keyboard = new Product("Keyboard", 79.99);

const catalog = new Catalog();
catalog.addProduct(laptop);
catalog.addProduct(mouse);
catalog.addProduct(keyboard);

const cart1 = new Cart();
const cart2 = new Cart();

const alice = new Customer("Alice", cart1);
const bob = new Customer("Bob", cart2);

cart1.addItem(laptop);
cart1.addItem(mouse);
cart2.addItem(laptop);
cart2.addItem(keyboard);

console.log(`Alice's cart: ${cart1.getItemCount()} items, $${cart1.getTotal()}`);
console.log(`Bob's cart: ${cart2.getItemCount()} items, $${cart2.getTotal()}`);

alice.checkout();

console.log(`Catalog still has ${catalog.getProductCount()} products`);
console.log(`Bob's cart still has ${cart2.getItemCount()} items`);
console.log(`Laptop still exists: ${laptop.getName()}`);
```

---

# Exercise 2: Company Team Management

**Problem:** Build a company system where employees can belong to multiple teams. Dissolving a team doesn't remove the employees. This exercise reinforces that aggregation parts survive the deletion of the whole and can be shared.

**Requirements:**

- `Employee` with a name and role. A `getTeamNames()` method that returns the names of all teams the employee belongs to.
- `Team` with a name and a list of `Employee` objects. An `addMember(employee)` method that adds the employee and registers the team on the employee. A `dissolve()` method that clears the member list without destroying employees.
- `Company` with a name and lists of both `Employee` and `Team` objects. A `dissolveTeam(team)` method that dissolves the team and removes it from the company.

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private String role;
    private List<Team> teams = new ArrayList<>();

    public Employee(String name, String role) {
        this.name = name;
        this.role = role;
    }

    public void addTeam(Team team) {
        // TODO: Add team to employee's team list
    }

    public void removeTeam(Team team) {
        // TODO: Remove team from employee's team list
    }

    public List<String> getTeamNames() {
        // TODO: Return list of team names this employee belongs to
        return new ArrayList<>();
    }

    public String getName() { return name; }
    public String getRole() { return role; }
}

class Team {
    private String name;
    private List<Employee> members = new ArrayList<>();

    public Team(String name) {
        this.name = name;
    }

    public void addMember(Employee employee) {
        // TODO: Add employee to team and register this team on the employee
    }

    public void dissolve() {
        // TODO: Remove all members (notify employees to drop this team), don't destroy employees
    }

    public String getName() { return name; }
    public List<Employee> getMembers() { return members; }
    public int getMemberCount() { return members.size(); }
}

class Company {
    private String name;
    private List<Employee> employees = new ArrayList<>();
    private List<Team> teams = new ArrayList<>();

    public Company(String name) {
        this.name = name;
    }

    public void addEmployee(Employee employee) {
        // TODO: Add employee to company
    }

    public void addTeam(Team team) {
        // TODO: Add team to company
    }

    public void dissolveTeam(Team team) {
        // TODO: Dissolve the team and remove it from the company's team list
    }

    public String getName() { return name; }
    public int getEmployeeCount() { return employees.size(); }
    public int getTeamCount() { return teams.size(); }
}

public class Main {
    public static void main(String[] args) {
        Company company = new Company("TechCorp");

        Employee alice = new Employee("Alice", "Engineer");
        Employee bob = new Employee("Bob", "Designer");
        Employee charlie = new Employee("Charlie", "Engineer");

        company.addEmployee(alice);
        company.addEmployee(bob);
        company.addEmployee(charlie);

        Team backend = new Team("Backend");
        Team frontend = new Team("Frontend");

        company.addTeam(backend);
        company.addTeam(frontend);

        // Alice is on both teams
        backend.addMember(alice);
        backend.addMember(charlie);
        frontend.addMember(alice);
        frontend.addMember(bob);

        System.out.println("Before dissolving:");
        System.out.println("  " + alice.getName() + "'s teams: " + alice.getTeamNames());
        System.out.println("  Backend has " + backend.getMemberCount() + " members");
        System.out.println("  Company has " + company.getTeamCount() + " teams, "
            + company.getEmployeeCount() + " employees");

        company.dissolveTeam(backend);

        System.out.println("\nAfter dissolving Backend:");
        System.out.println("  " + alice.getName() + "'s teams: " + alice.getTeamNames());
        System.out.println("  " + charlie.getName() + "'s teams: " + charlie.getTeamNames());
        System.out.println("  Company has " + company.getTeamCount() + " teams, "
            + company.getEmployeeCount() + " employees");
        System.out.println("  " + alice.getName() + " still exists: " + alice.getRole());
    }
}
```

```python
class Employee:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role
        self.teams = []

    def add_team(self, team):
        # TODO: Add team to employee's team list
        pass

    def remove_team(self, team):
        # TODO: Remove team from employee's team list
        pass

    def get_team_names(self):
        # TODO: Return list of team names this employee belongs to
        return []

class Team:
    def __init__(self, name: str):
        self.name = name
        self.members = []

    def add_member(self, employee: Employee):
        # TODO: Add employee to team and register this team on the employee
        pass

    def dissolve(self):
        # TODO: Remove all members, don't destroy employees
        pass

    def get_member_count(self):
        return len(self.members)

class Company:
    def __init__(self, name: str):
        self.name = name
        self.employees = []
        self.teams = []

    def add_employee(self, employee: Employee):
        # TODO: Add employee to company
        pass

    def add_team(self, team: Team):
        # TODO: Add team to company
        pass

    def dissolve_team(self, team: Team):
        # TODO: Dissolve the team and remove it from the company's team list
        pass

    def get_employee_count(self):
        return len(self.employees)

    def get_team_count(self):
        return len(self.teams)

if __name__ == "__main__":
    company = Company("TechCorp")

    alice = Employee("Alice", "Engineer")
    bob = Employee("Bob", "Designer")
    charlie = Employee("Charlie", "Engineer")

    company.add_employee(alice)
    company.add_employee(bob)
    company.add_employee(charlie)

    backend = Team("Backend")
    frontend = Team("Frontend")

    company.add_team(backend)
    company.add_team(frontend)

    backend.add_member(alice)
    backend.add_member(charlie)
    frontend.add_member(alice)
    frontend.add_member(bob)

    print("Before dissolving:")
    print(f"  {alice.name}'s teams: [{', '.join(alice.get_team_names())}]")
    print(f"  Backend has {backend.get_member_count()} members")
    print(f"  Company has {company.get_team_count()} teams, {company.get_employee_count()} employees")

    company.dissolve_team(backend)

    print("\nAfter dissolving Backend:")
    print(f"  {alice.name}'s teams: [{', '.join(alice.get_team_names())}]")
    print(f"  {charlie.name}'s teams: [{', '.join(charlie.get_team_names())}]")
    print(f"  Company has {company.get_team_count()} teams, {company.get_employee_count()} employees")
    print(f"  {alice.name} still exists: {alice.role}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Team;

class Employee {
private:
    string name;
    string role;
    vector<Team*> teams;
public:
    Employee(const string& name, const string& role) : name(name), role(role) {}

    void addTeam(Team* team) {
        // TODO: Add team to employee's team list
    }

    void removeTeam(Team* team) {
        // TODO: Remove team from employee's team list
    }

    vector<string> getTeamNames() const {
        // TODO: Return list of team names
        return {};
    }

    string getName() const { return name; }
    string getRole() const { return role; }
};

class Team {
private:
    string name;
    vector<Employee*> members;
public:
    Team(const string& name) : name(name) {}

    void addMember(Employee* employee) {
        // TODO: Add employee to team and register this team on the employee
    }

    void dissolve() {
        // TODO: Remove all members, don't destroy employees
    }

    string getName() const { return name; }
    vector<Employee*> getMembers() const { return members; }
    int getMemberCount() const { return members.size(); }
};

class Company {
private:
    string name;
    vector<Employee*> employees;
    vector<Team*> teams;
public:
    Company(const string& name) : name(name) {}

    void addEmployee(Employee* employee) {
        // TODO: Add employee to company
    }

    void addTeam(Team* team) {
        // TODO: Add team to company
    }

    void dissolveTeam(Team* team) {
        // TODO: Dissolve the team and remove it from company's team list
    }

    string getName() const { return name; }
    int getEmployeeCount() const { return employees.size(); }
    int getTeamCount() const { return teams.size(); }
};

int main() {
    Company company("TechCorp");

    Employee alice("Alice", "Engineer");
    Employee bob("Bob", "Designer");
    Employee charlie("Charlie", "Engineer");

    company.addEmployee(&alice);
    company.addEmployee(&bob);
    company.addEmployee(&charlie);

    Team backend("Backend");
    Team frontend("Frontend");

    company.addTeam(&backend);
    company.addTeam(&frontend);

    backend.addMember(&alice);
    backend.addMember(&charlie);
    frontend.addMember(&alice);
    frontend.addMember(&bob);

    cout << "Before dissolving:" << endl;
    auto aliceTeams = alice.getTeamNames();
    cout << "  " << alice.getName() << "'s teams: [";
    for (size_t i = 0; i < aliceTeams.size(); i++) {
        if (i > 0) cout << ", ";
        cout << aliceTeams[i];
    }
    cout << "]" << endl;
    cout << "  Backend has " << backend.getMemberCount() << " members" << endl;
    cout << "  Company has " << company.getTeamCount() << " teams, "
         << company.getEmployeeCount() << " employees" << endl;

    company.dissolveTeam(&backend);

    cout << "\nAfter dissolving Backend:" << endl;
    aliceTeams = alice.getTeamNames();
    cout << "  " << alice.getName() << "'s teams: [";
    for (size_t i = 0; i < aliceTeams.size(); i++) {
        if (i > 0) cout << ", ";
        cout << aliceTeams[i];
    }
    cout << "]" << endl;

    auto charlieTeams = charlie.getTeamNames();
    cout << "  " << charlie.getName() << "'s teams: [";
    for (size_t i = 0; i < charlieTeams.size(); i++) {
        if (i > 0) cout << ", ";
        cout << charlieTeams[i];
    }
    cout << "]" << endl;

    cout << "  Company has " << company.getTeamCount() << " teams, "
         << company.getEmployeeCount() << " employees" << endl;
    cout << "  " << alice.getName() << " still exists: " << alice.getRole() << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Employee struct {
	name  string
	role  string
	teams []*Team
}

func NewEmployee(name string, role string) *Employee {
	return &Employee{
		name: name,
		role: role,
	}
}

func (e *Employee) AddTeam(team *Team) {
	// TODO: Add team to employee's team list
}

func (e *Employee) RemoveTeam(team *Team) {
	// TODO: Remove team from employee's team list
}

func (e *Employee) GetTeamNames() []string {
	// TODO: Return list of team names this employee belongs to
	return []string{}
}

func (e *Employee) GetName() string {
	return e.name
}

func (e *Employee) GetRole() string {
	return e.role
}

type Team struct {
	name    string
	members []*Employee
}

func NewTeam(name string) *Team {
	return &Team{
		name: name,
	}
}

func (t *Team) AddMember(employee *Employee) {
	// TODO: Add employee to team and register this team on the employee
}

func (t *Team) Dissolve() {
	// TODO: Remove all members, don't destroy employees
}

func (t *Team) GetName() string {
	return t.name
}

func (t *Team) GetMembers() []*Employee {
	return t.members
}

func (t *Team) GetMemberCount() int {
	return len(t.members)
}

type Company struct {
	name      string
	employees []*Employee
	teams     []*Team
}

func NewCompany(name string) *Company {
	return &Company{
		name: name,
	}
}

func (c *Company) AddEmployee(employee *Employee) {
	// TODO: Add employee to company
}

func (c *Company) AddTeam(team *Team) {
	// TODO: Add team to company
}

func (c *Company) DissolveTeam(team *Team) {
	// TODO: Dissolve the team and remove it from the company's team list
}

func (c *Company) GetName() string {
	return c.name
}

func (c *Company) GetEmployeeCount() int {
	return len(c.employees)
}

func (c *Company) GetTeamCount() int {
	return len(c.teams)
}

func main() {
	company := NewCompany("TechCorp")

	alice := NewEmployee("Alice", "Engineer")
	bob := NewEmployee("Bob", "Designer")
	charlie := NewEmployee("Charlie", "Engineer")

	company.AddEmployee(alice)
	company.AddEmployee(bob)
	company.AddEmployee(charlie)

	backend := NewTeam("Backend")
	frontend := NewTeam("Frontend")

	company.AddTeam(backend)
	company.AddTeam(frontend)

	backend.AddMember(alice)
	backend.AddMember(charlie)
	frontend.AddMember(alice)
	frontend.AddMember(bob)

	fmt.Println("Before dissolving:")
	fmt.Printf("  %s's teams: %v\n", alice.GetName(), alice.GetTeamNames())
	fmt.Printf("  Backend has %d members\n", backend.GetMemberCount())
	fmt.Printf("  Company has %d teams, %d employees\n", company.GetTeamCount(), company.GetEmployeeCount())

	company.DissolveTeam(backend)

	fmt.Println("\nAfter dissolving Backend:")
	fmt.Printf("  %s's teams: %v\n", alice.GetName(), alice.GetTeamNames())
	fmt.Printf("  %s's teams: %v\n", charlie.GetName(), charlie.GetTeamNames())
	fmt.Printf("  Company has %d teams, %d employees\n", company.GetTeamCount(), company.GetEmployeeCount())
	fmt.Printf("  %s still exists: %s\n", alice.GetName(), alice.GetRole())
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Employee {
    public string Name { get; }
    public string Role { get; }
    private List<Team> teams = new List<Team>();

    public Employee(string name, string role) {
        Name = name;
        Role = role;
    }

    public void AddTeam(Team team) {
        // TODO: Add team to employee's team list
    }

    public void RemoveTeam(Team team) {
        // TODO: Remove team from employee's team list
    }

    public List<string> GetTeamNames() {
        // TODO: Return list of team names this employee belongs to
        return new List<string>();
    }
}

class Team {
    public string Name { get; }
    private List<Employee> members = new List<Employee>();

    public Team(string name) { Name = name; }

    public void AddMember(Employee employee) {
        // TODO: Add employee to team and register this team on the employee
    }

    public void Dissolve() {
        // TODO: Remove all members, don't destroy employees
    }

    public List<Employee> GetMembers() { return members; }
    public int GetMemberCount() { return members.Count; }
}

class Company {
    public string Name { get; }
    private List<Employee> employees = new List<Employee>();
    private List<Team> teams = new List<Team>();

    public Company(string name) { Name = name; }

    public void AddEmployee(Employee employee) {
        // TODO: Add employee to company
    }

    public void AddTeam(Team team) {
        // TODO: Add team to company
    }

    public void DissolveTeam(Team team) {
        // TODO: Dissolve the team and remove it from company's team list
    }

    public int GetEmployeeCount() { return employees.Count; }
    public int GetTeamCount() { return teams.Count; }
}

class Program {
    static void Main() {
        var company = new Company("TechCorp");

        var alice = new Employee("Alice", "Engineer");
        var bob = new Employee("Bob", "Designer");
        var charlie = new Employee("Charlie", "Engineer");

        company.AddEmployee(alice);
        company.AddEmployee(bob);
        company.AddEmployee(charlie);

        var backend = new Team("Backend");
        var frontend = new Team("Frontend");

        company.AddTeam(backend);
        company.AddTeam(frontend);

        backend.AddMember(alice);
        backend.AddMember(charlie);
        frontend.AddMember(alice);
        frontend.AddMember(bob);

        Console.WriteLine("Before dissolving:");
        Console.WriteLine($"  {alice.Name}'s teams: [{string.Join(", ", alice.GetTeamNames())}]");
        Console.WriteLine($"  Backend has {backend.GetMemberCount()} members");
        Console.WriteLine($"  Company has {company.GetTeamCount()} teams, {company.GetEmployeeCount()} employees");

        company.DissolveTeam(backend);

        Console.WriteLine("\nAfter dissolving Backend:");
        Console.WriteLine($"  {alice.Name}'s teams: [{string.Join(", ", alice.GetTeamNames())}]");
        Console.WriteLine($"  {charlie.Name}'s teams: [{string.Join(", ", charlie.GetTeamNames())}]");
        Console.WriteLine($"  Company has {company.GetTeamCount()} teams, {company.GetEmployeeCount()} employees");
        Console.WriteLine($"  {alice.Name} still exists: {alice.Role}");
    }
}
```

```typescript
class Employee {
    private name: string;
    private role: string;
    private teams: Team[] = [];

    constructor(name: string, role: string) {
        this.name = name;
        this.role = role;
    }

    addTeam(team: Team): void {
        // TODO: Add team to employee's team list
    }

    removeTeam(team: Team): void {
        // TODO: Remove team from employee's team list
    }

    getTeamNames(): string[] {
        // TODO: Return list of team names this employee belongs to
        return [];
    }

    getName(): string { return this.name; }
    getRole(): string { return this.role; }
}

class Team {
    private name: string;
    private members: Employee[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addMember(employee: Employee): void {
        // TODO: Add employee to team and register this team on the employee
    }

    dissolve(): void {
        // TODO: Remove all members, don't destroy employees
    }

    getName(): string { return this.name; }
    getMembers(): Employee[] { return this.members; }
    getMemberCount(): number { return this.members.length; }
}

class Company {
    private name: string;
    private employees: Employee[] = [];
    private teams: Team[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addEmployee(employee: Employee): void {
        // TODO: Add employee to company
    }

    addTeam(team: Team): void {
        // TODO: Add team to company
    }

    dissolveTeam(team: Team): void {
        // TODO: Dissolve the team and remove it from company's team list
    }

    getName(): string { return this.name; }
    getEmployeeCount(): number { return this.employees.length; }
    getTeamCount(): number { return this.teams.length; }
}

const company = new Company("TechCorp");

const alice = new Employee("Alice", "Engineer");
const bob = new Employee("Bob", "Designer");
const charlie = new Employee("Charlie", "Engineer");

company.addEmployee(alice);
company.addEmployee(bob);
company.addEmployee(charlie);

const backend = new Team("Backend");
const frontend = new Team("Frontend");

company.addTeam(backend);
company.addTeam(frontend);

backend.addMember(alice);
backend.addMember(charlie);
frontend.addMember(alice);
frontend.addMember(bob);

console.log("Before dissolving:");
console.log(`  ${alice.getName()}'s teams: [${alice.getTeamNames().join(", ")}]`);
console.log(`  Backend has ${backend.getMemberCount()} members`);
console.log(`  Company has ${company.getTeamCount()} teams, ${company.getEmployeeCount()} employees`);

company.dissolveTeam(backend);

console.log("\nAfter dissolving Backend:");
console.log(`  ${alice.getName()}'s teams: [${alice.getTeamNames().join(", ")}]`);
console.log(`  ${charlie.getName()}'s teams: [${charlie.getTeamNames().join(", ")}]`);
console.log(`  Company has ${company.getTeamCount()} teams, ${company.getEmployeeCount()} employees`);
console.log(`  ${alice.getName()} still exists: ${alice.getRole()}`);
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

class Employee {
    private String name;
    private String role;
    private List<Team> teams = new ArrayList<>();

    public Employee(String name, String role) {
        this.name = name;
        this.role = role;
    }

    public void addTeam(Team team) {
        teams.add(team);
    }

    public void removeTeam(Team team) {
        teams.remove(team);
    }

    public List<String> getTeamNames() {
        return teams.stream().map(Team::getName).collect(Collectors.toList());
    }

    public String getName() { return name; }
    public String getRole() { return role; }
}

class Team {
    private String name;
    private List<Employee> members = new ArrayList<>();

    public Team(String name) {
        this.name = name;
    }

    public void addMember(Employee employee) {
        members.add(employee);
        employee.addTeam(this);
    }

    public void dissolve() {
        for (Employee e : members) {
            e.removeTeam(this);
        }
        members.clear();
    }

    public String getName() { return name; }
    public List<Employee> getMembers() { return members; }
    public int getMemberCount() { return members.size(); }
}

class Company {
    private String name;
    private List<Employee> employees = new ArrayList<>();
    private List<Team> teams = new ArrayList<>();

    public Company(String name) {
        this.name = name;
    }

    public void addEmployee(Employee employee) {
        employees.add(employee);
    }

    public void addTeam(Team team) {
        teams.add(team);
    }

    public void dissolveTeam(Team team) {
        team.dissolve();
        teams.remove(team);
    }

    public String getName() { return name; }
    public int getEmployeeCount() { return employees.size(); }
    public int getTeamCount() { return teams.size(); }
}

public class Main {
    public static void main(String[] args) {
        Company company = new Company("TechCorp");

        Employee alice = new Employee("Alice", "Engineer");
        Employee bob = new Employee("Bob", "Designer");
        Employee charlie = new Employee("Charlie", "Engineer");

        company.addEmployee(alice);
        company.addEmployee(bob);
        company.addEmployee(charlie);

        Team backend = new Team("Backend");
        Team frontend = new Team("Frontend");

        company.addTeam(backend);
        company.addTeam(frontend);

        backend.addMember(alice);
        backend.addMember(charlie);
        frontend.addMember(alice);
        frontend.addMember(bob);

        System.out.println("Before dissolving:");
        System.out.println("  " + alice.getName() + "'s teams: " + alice.getTeamNames());
        System.out.println("  Backend has " + backend.getMemberCount() + " members");
        System.out.println("  Company has " + company.getTeamCount() + " teams, "
            + company.getEmployeeCount() + " employees");

        company.dissolveTeam(backend);

        System.out.println("\nAfter dissolving Backend:");
        System.out.println("  " + alice.getName() + "'s teams: " + alice.getTeamNames());
        System.out.println("  " + charlie.getName() + "'s teams: " + charlie.getTeamNames());
        System.out.println("  Company has " + company.getTeamCount() + " teams, "
            + company.getEmployeeCount() + " employees");
        System.out.println("  " + alice.getName() + " still exists: " + alice.getRole());
    }
}
```

```python
class Employee:
    def __init__(self, name: str, role: str):
        self.name = name
        self.role = role
        self.teams = []

    def add_team(self, team):
        self.teams.append(team)

    def remove_team(self, team):
        self.teams.remove(team)

    def get_team_names(self):
        return [t.name for t in self.teams]

class Team:
    def __init__(self, name: str):
        self.name = name
        self.members = []

    def add_member(self, employee: Employee):
        self.members.append(employee)
        employee.add_team(self)

    def dissolve(self):
        for e in self.members:
            e.remove_team(self)
        self.members.clear()

    def get_member_count(self):
        return len(self.members)

class Company:
    def __init__(self, name: str):
        self.name = name
        self.employees = []
        self.teams = []

    def add_employee(self, employee: Employee):
        self.employees.append(employee)

    def add_team(self, team: Team):
        self.teams.append(team)

    def dissolve_team(self, team: Team):
        team.dissolve()
        self.teams.remove(team)

    def get_employee_count(self):
        return len(self.employees)

    def get_team_count(self):
        return len(self.teams)

if __name__ == "__main__":
    company = Company("TechCorp")

    alice = Employee("Alice", "Engineer")
    bob = Employee("Bob", "Designer")
    charlie = Employee("Charlie", "Engineer")

    company.add_employee(alice)
    company.add_employee(bob)
    company.add_employee(charlie)

    backend = Team("Backend")
    frontend = Team("Frontend")

    company.add_team(backend)
    company.add_team(frontend)

    backend.add_member(alice)
    backend.add_member(charlie)
    frontend.add_member(alice)
    frontend.add_member(bob)

    print("Before dissolving:")
    print(f"  {alice.name}'s teams: [{', '.join(alice.get_team_names())}]")
    print(f"  Backend has {backend.get_member_count()} members")
    print(f"  Company has {company.get_team_count()} teams, {company.get_employee_count()} employees")

    company.dissolve_team(backend)

    print("\nAfter dissolving Backend:")
    print(f"  {alice.name}'s teams: [{', '.join(alice.get_team_names())}]")
    print(f"  {charlie.name}'s teams: [{', '.join(charlie.get_team_names())}]")
    print(f"  Company has {company.get_team_count()} teams, {company.get_employee_count()} employees")
    print(f"  {alice.name} still exists: {alice.role}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

class Team;

class Employee {
private:
    string name;
    string role;
    vector<Team*> teams;
public:
    Employee(const string& name, const string& role) : name(name), role(role) {}

    void addTeam(Team* team) {
        teams.push_back(team);
    }

    void removeTeam(Team* team) {
        teams.erase(remove(teams.begin(), teams.end(), team), teams.end());
    }

    vector<string> getTeamNames() const;

    string getName() const { return name; }
    string getRole() const { return role; }
};

class Team {
private:
    string name;
    vector<Employee*> members;
public:
    Team(const string& name) : name(name) {}

    void addMember(Employee* employee) {
        members.push_back(employee);
        employee->addTeam(this);
    }

    void dissolve() {
        for (auto* e : members) {
            e->removeTeam(this);
        }
        members.clear();
    }

    string getName() const { return name; }
    vector<Employee*> getMembers() const { return members; }
    int getMemberCount() const { return members.size(); }
};

vector<string> Employee::getTeamNames() const {
    vector<string> names;
    for (auto* t : teams) {
        names.push_back(t->getName());
    }
    return names;
}

class Company {
private:
    string name;
    vector<Employee*> employees;
    vector<Team*> teams;
public:
    Company(const string& name) : name(name) {}

    void addEmployee(Employee* employee) {
        employees.push_back(employee);
    }

    void addTeam(Team* team) {
        teams.push_back(team);
    }

    void dissolveTeam(Team* team) {
        team->dissolve();
        teams.erase(remove(teams.begin(), teams.end(), team), teams.end());
    }

    string getName() const { return name; }
    int getEmployeeCount() const { return employees.size(); }
    int getTeamCount() const { return teams.size(); }
};

int main() {
    Company company("TechCorp");

    Employee alice("Alice", "Engineer");
    Employee bob("Bob", "Designer");
    Employee charlie("Charlie", "Engineer");

    company.addEmployee(&alice);
    company.addEmployee(&bob);
    company.addEmployee(&charlie);

    Team backend("Backend");
    Team frontend("Frontend");

    company.addTeam(&backend);
    company.addTeam(&frontend);

    backend.addMember(&alice);
    backend.addMember(&charlie);
    frontend.addMember(&alice);
    frontend.addMember(&bob);

    cout << "Before dissolving:" << endl;
    auto aliceTeams = alice.getTeamNames();
    cout << "  " << alice.getName() << "'s teams: [";
    for (size_t i = 0; i < aliceTeams.size(); i++) {
        if (i > 0) cout << ", ";
        cout << aliceTeams[i];
    }
    cout << "]" << endl;
    cout << "  Backend has " << backend.getMemberCount() << " members" << endl;
    cout << "  Company has " << company.getTeamCount() << " teams, "
         << company.getEmployeeCount() << " employees" << endl;

    company.dissolveTeam(&backend);

    cout << "\nAfter dissolving Backend:" << endl;
    aliceTeams = alice.getTeamNames();
    cout << "  " << alice.getName() << "'s teams: [";
    for (size_t i = 0; i < aliceTeams.size(); i++) {
        if (i > 0) cout << ", ";
        cout << aliceTeams[i];
    }
    cout << "]" << endl;

    auto charlieTeams = charlie.getTeamNames();
    cout << "  " << charlie.getName() << "'s teams: [";
    for (size_t i = 0; i < charlieTeams.size(); i++) {
        if (i > 0) cout << ", ";
        cout << charlieTeams[i];
    }
    cout << "]" << endl;

    cout << "  Company has " << company.getTeamCount() << " teams, "
         << company.getEmployeeCount() << " employees" << endl;
    cout << "  " << alice.getName() << " still exists: " << alice.getRole() << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type Employee struct {
	name  string
	role  string
	teams []*Team
}

func NewEmployee(name, role string) *Employee {
	return &Employee{name: name, role: role, teams: []*Team{}}
}

func (e *Employee) addTeam(team *Team) {
	e.teams = append(e.teams, team)
}

func (e *Employee) removeTeam(team *Team) {
	for i, t := range e.teams {
		if t == team {
			e.teams = append(e.teams[:i], e.teams[i+1:]...)
			return
		}
	}
}

func (e *Employee) getTeamNames() []string {
	names := make([]string, 0, len(e.teams))
	for _, t := range e.teams {
		names = append(names, t.getName())
	}
	return names
}

func (e *Employee) getName() string { return e.name }
func (e *Employee) getRole() string { return e.role }

type Team struct {
	name    string
	members []*Employee
}

func NewTeam(name string) *Team {
	return &Team{name: name, members: []*Employee{}}
}

func (t *Team) addMember(employee *Employee) {
	t.members = append(t.members, employee)
	employee.addTeam(t)
}

func (t *Team) dissolve() {
	for _, e := range t.members {
		e.removeTeam(t)
	}
	t.members = nil
}

func (t *Team) getName() string { return t.name }
func (t *Team) getMembers() []*Employee { return t.members }
func (t *Team) getMemberCount() int { return len(t.members) }

type Company struct {
	name      string
	employees []*Employee
	teams     []*Team
}

func NewCompany(name string) *Company {
	return &Company{name: name, employees: []*Employee{}, teams: []*Team{}}
}

func (c *Company) addEmployee(employee *Employee) {
	c.employees = append(c.employees, employee)
}

func (c *Company) addTeam(team *Team) {
	c.teams = append(c.teams, team)
}

func (c *Company) dissolveTeam(team *Team) {
	team.dissolve()
	for i, t := range c.teams {
		if t == team {
			c.teams = append(c.teams[:i], c.teams[i+1:]...)
			return
		}
	}
}

func (c *Company) getName() string { return c.name }
func (c *Company) getEmployeeCount() int { return len(c.employees) }
func (c *Company) getTeamCount() int { return len(c.teams) }

func formatNames(names []string) string {
	return "[" + strings.Join(names, ", ") + "]"
}

func main() {
	company := NewCompany("TechCorp")

	alice := NewEmployee("Alice", "Engineer")
	bob := NewEmployee("Bob", "Designer")
	charlie := NewEmployee("Charlie", "Engineer")

	company.addEmployee(alice)
	company.addEmployee(bob)
	company.addEmployee(charlie)

	backend := NewTeam("Backend")
	frontend := NewTeam("Frontend")

	company.addTeam(backend)
	company.addTeam(frontend)

	backend.addMember(alice)
	backend.addMember(charlie)
	frontend.addMember(alice)
	frontend.addMember(bob)

	fmt.Println("Before dissolving:")
	fmt.Printf("  %s's teams: %s\n", alice.getName(), formatNames(alice.getTeamNames()))
	fmt.Printf("  Backend has %d members\n", backend.getMemberCount())
	fmt.Printf("  Company has %d teams, %d employees\n", company.getTeamCount(), company.getEmployeeCount())

	company.dissolveTeam(backend)

	fmt.Println("\nAfter dissolving Backend:")
	fmt.Printf("  %s's teams: %s\n", alice.getName(), formatNames(alice.getTeamNames()))
	fmt.Printf("  %s's teams: %s\n", charlie.getName(), formatNames(charlie.getTeamNames()))
	fmt.Printf("  Company has %d teams, %d employees\n", company.getTeamCount(), company.getEmployeeCount())
	fmt.Printf("  %s still exists: %s\n", alice.getName(), alice.getRole())
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Employee {
    public string Name { get; }
    public string Role { get; }
    private List<Team> teams = new List<Team>();

    public Employee(string name, string role) {
        Name = name;
        Role = role;
    }

    public void AddTeam(Team team) {
        teams.Add(team);
    }

    public void RemoveTeam(Team team) {
        teams.Remove(team);
    }

    public List<string> GetTeamNames() {
        return teams.Select(t => t.Name).ToList();
    }
}

class Team {
    public string Name { get; }
    private List<Employee> members = new List<Employee>();

    public Team(string name) { Name = name; }

    public void AddMember(Employee employee) {
        members.Add(employee);
        employee.AddTeam(this);
    }

    public void Dissolve() {
        foreach (var e in members) {
            e.RemoveTeam(this);
        }
        members.Clear();
    }

    public List<Employee> GetMembers() { return members; }
    public int GetMemberCount() { return members.Count; }
}

class Company {
    public string Name { get; }
    private List<Employee> employees = new List<Employee>();
    private List<Team> teams = new List<Team>();

    public Company(string name) { Name = name; }

    public void AddEmployee(Employee employee) {
        employees.Add(employee);
    }

    public void AddTeam(Team team) {
        teams.Add(team);
    }

    public void DissolveTeam(Team team) {
        team.Dissolve();
        teams.Remove(team);
    }

    public int GetEmployeeCount() { return employees.Count; }
    public int GetTeamCount() { return teams.Count; }
}

class Program {
    static void Main() {
        var company = new Company("TechCorp");

        var alice = new Employee("Alice", "Engineer");
        var bob = new Employee("Bob", "Designer");
        var charlie = new Employee("Charlie", "Engineer");

        company.AddEmployee(alice);
        company.AddEmployee(bob);
        company.AddEmployee(charlie);

        var backend = new Team("Backend");
        var frontend = new Team("Frontend");

        company.AddTeam(backend);
        company.AddTeam(frontend);

        backend.AddMember(alice);
        backend.AddMember(charlie);
        frontend.AddMember(alice);
        frontend.AddMember(bob);

        Console.WriteLine("Before dissolving:");
        Console.WriteLine($"  {alice.Name}'s teams: [{string.Join(", ", alice.GetTeamNames())}]");
        Console.WriteLine($"  Backend has {backend.GetMemberCount()} members");
        Console.WriteLine($"  Company has {company.GetTeamCount()} teams, {company.GetEmployeeCount()} employees");

        company.DissolveTeam(backend);

        Console.WriteLine("\nAfter dissolving Backend:");
        Console.WriteLine($"  {alice.Name}'s teams: [{string.Join(", ", alice.GetTeamNames())}]");
        Console.WriteLine($"  {charlie.Name}'s teams: [{string.Join(", ", charlie.GetTeamNames())}]");
        Console.WriteLine($"  Company has {company.GetTeamCount()} teams, {company.GetEmployeeCount()} employees");
        Console.WriteLine($"  {alice.Name} still exists: {alice.Role}");
    }
}
```

```typescript
class Employee {
    private name: string;
    private role: string;
    private teams: Team[] = [];

    constructor(name: string, role: string) {
        this.name = name;
        this.role = role;
    }

    addTeam(team: Team): void {
        this.teams.push(team);
    }

    removeTeam(team: Team): void {
        const index = this.teams.indexOf(team);
        if (index !== -1) {
            this.teams.splice(index, 1);
        }
    }

    getTeamNames(): string[] {
        return this.teams.map(t => t.getName());
    }

    getName(): string { return this.name; }
    getRole(): string { return this.role; }
}

class Team {
    private name: string;
    private members: Employee[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addMember(employee: Employee): void {
        this.members.push(employee);
        employee.addTeam(this);
    }

    dissolve(): void {
        for (const e of this.members) {
            e.removeTeam(this);
        }
        this.members = [];
    }

    getName(): string { return this.name; }
    getMembers(): Employee[] { return this.members; }
    getMemberCount(): number { return this.members.length; }
}

class Company {
    private name: string;
    private employees: Employee[] = [];
    private teams: Team[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    addTeam(team: Team): void {
        this.teams.push(team);
    }

    dissolveTeam(team: Team): void {
        team.dissolve();
        const index = this.teams.indexOf(team);
        if (index !== -1) {
            this.teams.splice(index, 1);
        }
    }

    getName(): string { return this.name; }
    getEmployeeCount(): number { return this.employees.length; }
    getTeamCount(): number { return this.teams.length; }
}

const company = new Company("TechCorp");

const alice = new Employee("Alice", "Engineer");
const bob = new Employee("Bob", "Designer");
const charlie = new Employee("Charlie", "Engineer");

company.addEmployee(alice);
company.addEmployee(bob);
company.addEmployee(charlie);

const backend = new Team("Backend");
const frontend = new Team("Frontend");

company.addTeam(backend);
company.addTeam(frontend);

backend.addMember(alice);
backend.addMember(charlie);
frontend.addMember(alice);
frontend.addMember(bob);

console.log("Before dissolving:");
console.log(`  ${alice.getName()}'s teams: [${alice.getTeamNames().join(", ")}]`);
console.log(`  Backend has ${backend.getMemberCount()} members`);
console.log(`  Company has ${company.getTeamCount()} teams, ${company.getEmployeeCount()} employees`);

company.dissolveTeam(backend);

console.log("\nAfter dissolving Backend:");
console.log(`  ${alice.getName()}'s teams: [${alice.getTeamNames().join(", ")}]`);
console.log(`  ${charlie.getName()}'s teams: [${charlie.getTeamNames().join(", ")}]`);
console.log(`  Company has ${company.getTeamCount()} teams, ${company.getEmployeeCount()} employees`);
console.log(`  ${alice.getName()} still exists: ${alice.getRole()}`);
```


