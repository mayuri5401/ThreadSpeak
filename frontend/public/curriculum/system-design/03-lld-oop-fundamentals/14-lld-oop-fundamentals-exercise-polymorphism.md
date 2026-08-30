---
id: "lld-oop-fundamentals-exercise-polymorphism"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - OOP Fundamentals"
subSection: ""
title: "Exercise: Polymorphism"
slug: "lld-oop-fundamentals-exercise-polymorphism"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Polymorphism as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Polymorphism Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","OOP Fundamentals","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Discount Calculator

<!-- payload:lldCodingPracticeBlock:START {"id":"698ddac599b6ab40f1a6e8dc","title":"Design Discount Calculator Class","difficulty":"","expectedOutput":"Item: Laptop\n20.0% off: $999.99 -> $799.99\nItem: Headphones\n$15.0 off: $49.99 -> $34.99\nItem: Keyboard\nBuy 1 Get 1 Free: $79.98 -> $39.99"} -->
**Problem:** Build a pricing system where an `OrderProcessor` applies discounts polymorphically. Different discount types share a common base class with shared formatting logic, but each one calculates the discounted price differently. The processor works with any discount through the abstract `Discount` type.

**Requirements:**

- Abstract `Discount` class with a `label` field (protected), an abstract `apply(price)` method that returns the discounted price, and a concrete `describe(originalPrice)` method that prints "label: $originalPrice -> $discountedPrice".
- `PercentageDiscount`: takes a percentage (e.g., 20 means 20% off). Label is "20.0% off". Returns `price * (1 - percentage/100)`.
- `FlatDiscount`: takes a fixed amount off. Label is "$15.0 off". Returns `price - amount` (minimum 0).
- `BuyOneGetOneFree`: halves the price. Label is "Buy 1 Get 1 Free". Returns `price / 2`.
- `OrderProcessor` class with a `processOrder(itemName, price, discount)` method that prints the item name and calls `describe()` on the discount.

```java
abstract class Discount {
    protected String label;

    public Discount(String label) {
        this.label = label;
    }

    abstract double apply(double price);

    public void describe(double originalPrice) {
        // TODO: call apply(originalPrice) and print:
        //   "label: $originalPrice -> $discountedPrice"
        // Hint: use String.format("%.2f", value) for formatting
    }
}

class PercentageDiscount extends Discount {
    private double percentage;

    public PercentageDiscount(double percentage) {
        super(percentage + "% off");
        // TODO: initialize this.percentage
    }

    double apply(double price) {
        // TODO: return price * (1 - percentage / 100)
        return 0;
    }
}

class FlatDiscount extends Discount {
    private double amount;

    public FlatDiscount(double amount) {
        super("$" + amount + " off");
        // TODO: initialize this.amount
    }

    double apply(double price) {
        // TODO: return max(price - amount, 0)
        return 0;
    }
}

class BuyOneGetOneFree extends Discount {
    public BuyOneGetOneFree() {
        super("Buy 1 Get 1 Free");
    }

    double apply(double price) {
        // TODO: return price / 2
        return 0;
    }
}

class OrderProcessor {
    public void processOrder(String itemName, double price, Discount discount) {
        // TODO: print "Item: itemName" then call discount.describe(price)
    }
}

public class Main {
    public static void main(String[] args) {
        OrderProcessor processor = new OrderProcessor();

        processor.processOrder("Laptop", 999.99, new PercentageDiscount(20));
        processor.processOrder("Headphones", 49.99, new FlatDiscount(15));
        processor.processOrder("Keyboard", 79.98, new BuyOneGetOneFree());
    }
}
```

```python
from abc import ABC, abstractmethod

class Discount(ABC):
    def __init__(self, label: str):
        self._label = label

    @abstractmethod
    def apply(self, price: float) -> float:
        pass

    def describe(self, original_price: float):
        # TODO: call self.apply(original_price) and print:
        #   "label: $original_price -> $discounted_price"
        # Hint: use f"{value:.2f}" for formatting
        pass

class PercentageDiscount(Discount):
    def __init__(self, percentage: float):
        super().__init__(f"{percentage:.1f}% off")
        # TODO: initialize self._percentage

    def apply(self, price: float) -> float:
        # TODO: return price * (1 - percentage / 100)
        return 0

class FlatDiscount(Discount):
    def __init__(self, amount: float):
        super().__init__(f"${amount:.1f} off")
        # TODO: initialize self._amount

    def apply(self, price: float) -> float:
        # TODO: return max(price - amount, 0)
        return 0

class BuyOneGetOneFree(Discount):
    def __init__(self):
        super().__init__("Buy 1 Get 1 Free")

    def apply(self, price: float) -> float:
        # TODO: return price / 2
        return 0

class OrderProcessor:
    def process_order(self, item_name: str, price: float, discount: Discount):
        # TODO: print "Item: item_name" then call discount.describe(price)
        pass

if __name__ == "__main__":
    processor = OrderProcessor()

    processor.process_order("Laptop", 999.99, PercentageDiscount(20))
    processor.process_order("Headphones", 49.99, FlatDiscount(15))
    processor.process_order("Keyboard", 79.98, BuyOneGetOneFree())
```

```cpp
#include <iostream>
#include <string>
#include <cstdio>
#include <algorithm>
using namespace std;

class Discount {
protected:
    string label;

public:
    Discount(const string& label) : label(label) {}
    virtual ~Discount() {}

    virtual double apply(double price) = 0;

    void describe(double originalPrice) {
        // TODO: call apply(originalPrice) and print:
        //   "label: $originalPrice -> $discountedPrice"
        // Hint: use printf("%.2f", value) for formatting
    }
};

class PercentageDiscount : public Discount {
    double percentage;

public:
    PercentageDiscount(double percentage)
        : Discount(string()) {
        char buf[32];
        snprintf(buf, sizeof(buf), "%.1f", percentage);
        this->label = string(buf) + "% off";
        // TODO: initialize this->percentage
    }

    double apply(double price) override {
        // TODO: return price * (1 - percentage / 100)
        return 0;
    }
};

class FlatDiscount : public Discount {
    double amount;

public:
    FlatDiscount(double amount)
        : Discount(string()) {
        char buf[32];
        snprintf(buf, sizeof(buf), "%.1f", amount);
        this->label = "$" + string(buf) + " off";
        // TODO: initialize this->amount
    }

    double apply(double price) override {
        // TODO: return max(price - amount, 0.0)
        return 0;
    }
};

class BuyOneGetOneFree : public Discount {
public:
    BuyOneGetOneFree() : Discount("Buy 1 Get 1 Free") {}

    double apply(double price) override {
        // TODO: return price / 2
        return 0;
    }
};

class OrderProcessor {
public:
    void processOrder(const string& itemName, double price, Discount& discount) {
        // TODO: print "Item: itemName" then call discount.describe(price)
    }
};

int main() {
    OrderProcessor processor;

    PercentageDiscount pct(20);
    FlatDiscount flat(15);
    BuyOneGetOneFree bogo;

    processor.processOrder("Laptop", 999.99, pct);
    processor.processOrder("Headphones", 49.99, flat);
    processor.processOrder("Keyboard", 79.98, bogo);
    return 0;
}
```

```go
package main

import "fmt"

type Discount interface {
	apply(price float64) float64
	describe(originalPrice float64)
}

type discountBase struct {
	label string
}

func (d *discountBase) describe(originalPrice float64) {
	// TODO: call apply(originalPrice) and print:
	//   "label: $originalPrice -> $discountedPrice"
	// Hint: use fmt.Sprintf("%.2f", value) for formatting
}

type PercentageDiscount struct {
	discountBase
	percentage float64
}

func NewPercentageDiscount(percentage float64) *PercentageDiscount {
	d := &PercentageDiscount{}
	d.label = fmt.Sprintf("%.1f%% off", percentage)
	// TODO: initialize d.percentage using the parameter
	return d
}

func (d *PercentageDiscount) apply(price float64) float64 {
	// TODO: return price * (1 - percentage / 100)
	return 0
}

type FlatDiscount struct {
	discountBase
	amount float64
}

func NewFlatDiscount(amount float64) *FlatDiscount {
	d := &FlatDiscount{}
	d.label = fmt.Sprintf("$%.1f off", amount)
	// TODO: initialize d.amount using the parameter
	return d
}

func (d *FlatDiscount) apply(price float64) float64 {
	// TODO: return max(price - amount, 0)
	return 0
}

type BuyOneGetOneFree struct {
	discountBase
}

func NewBuyOneGetOneFree() *BuyOneGetOneFree {
	return &BuyOneGetOneFree{
		discountBase: discountBase{label: "Buy 1 Get 1 Free"},
	}
}

func (d *BuyOneGetOneFree) apply(price float64) float64 {
	// TODO: return price / 2
	return 0
}

type OrderProcessor struct{}

func (o *OrderProcessor) processOrder(itemName string, price float64, discount Discount) {
	// TODO: print "Item: itemName" then call discount.describe(price)
}

func main() {
	processor := &OrderProcessor{}

	processor.processOrder("Laptop", 999.99, NewPercentageDiscount(20))
	processor.processOrder("Headphones", 49.99, NewFlatDiscount(15))
	processor.processOrder("Keyboard", 79.98, NewBuyOneGetOneFree())
}
```

```csharp
using System;

public abstract class Discount
{
    protected string Label;

    public Discount(string label) { Label = label; }

    public abstract double Apply(double price);

    public void Describe(double originalPrice)
    {
        // TODO: call Apply(originalPrice) and print:
        //   "Label: $originalPrice -> $discountedPrice"
        // Hint: use $"{value:F2}" for formatting
    }
}

public class PercentageDiscount : Discount
{
    private double _percentage;

    public PercentageDiscount(double percentage) : base($"{percentage:F1}% off")
    {
        // TODO: initialize _percentage
    }

    public override double Apply(double price)
    {
        // TODO: return price * (1 - _percentage / 100)
        return 0;
    }
}

public class FlatDiscount : Discount
{
    private double _amount;

    public FlatDiscount(double amount) : base($"${amount:F1} off")
    {
        // TODO: initialize _amount
    }

    public override double Apply(double price)
    {
        // TODO: return Math.Max(price - _amount, 0)
        return 0;
    }
}

public class BuyOneGetOneFree : Discount
{
    public BuyOneGetOneFree() : base("Buy 1 Get 1 Free") {}

    public override double Apply(double price)
    {
        // TODO: return price / 2
        return 0;
    }
}

public class OrderProcessor
{
    public void ProcessOrder(string itemName, double price, Discount discount)
    {
        // TODO: print "Item: itemName" then call discount.Describe(price)
    }
}

public class Program
{
    public static void Main()
    {
        var processor = new OrderProcessor();

        processor.ProcessOrder("Laptop", 999.99, new PercentageDiscount(20));
        processor.ProcessOrder("Headphones", 49.99, new FlatDiscount(15));
        processor.ProcessOrder("Keyboard", 79.98, new BuyOneGetOneFree());
    }
}
```

```typescript
abstract class Discount {
    protected label: string;

    constructor(label: string) { this.label = label; }

    abstract apply(price: number): number;

    describe(originalPrice: number): void {
        // TODO: call this.apply(originalPrice) and print:
        //   "label: $originalPrice -> $discountedPrice"
        // Hint: use value.toFixed(2) for formatting
    }
}

class PercentageDiscount extends Discount {
    private percentage: number;

    constructor(percentage: number) {
        super(percentage.toFixed(1) + "% off");
        // TODO: initialize this.percentage using the parameter
        this.percentage = 0;
    }

    apply(price: number): number {
        // TODO: return price * (1 - percentage / 100)
        return 0;
    }
}

class FlatDiscount extends Discount {
    private amount: number;

    constructor(amount: number) {
        super("$" + amount.toFixed(1) + " off");
        // TODO: initialize this.amount using the parameter
        this.amount = 0;
    }

    apply(price: number): number {
        // TODO: return Math.max(price - amount, 0)
        return 0;
    }
}

class BuyOneGetOneFree extends Discount {
    constructor() {
        super("Buy 1 Get 1 Free");
    }

    apply(price: number): number {
        // TODO: return price / 2
        return 0;
    }
}

class OrderProcessor {
    processOrder(itemName: string, price: number, discount: Discount): void {
        // TODO: print "Item: itemName" then call discount.describe(price)
    }
}

const processor = new OrderProcessor();

processor.processOrder("Laptop", 999.99, new PercentageDiscount(20));
processor.processOrder("Headphones", 49.99, new FlatDiscount(15));
processor.processOrder("Keyboard", 79.98, new BuyOneGetOneFree());
```

#### Solutions

```java
abstract class Discount {
    protected String label;

    public Discount(String label) {
        this.label = label;
    }

    abstract double apply(double price);

    public void describe(double originalPrice) {
        double discountedPrice = apply(originalPrice);
        System.out.println(label + ": $" + String.format("%.2f", originalPrice)
            + " -> $" + String.format("%.2f", discountedPrice));
    }
}

class PercentageDiscount extends Discount {
    private double percentage;

    public PercentageDiscount(double percentage) {
        super(percentage + "% off");
        this.percentage = percentage;
    }

    double apply(double price) {
        return price * (1 - percentage / 100);
    }
}

class FlatDiscount extends Discount {
    private double amount;

    public FlatDiscount(double amount) {
        super("$" + amount + " off");
        this.amount = amount;
    }

    double apply(double price) {
        return Math.max(price - amount, 0);
    }
}

class BuyOneGetOneFree extends Discount {
    public BuyOneGetOneFree() {
        super("Buy 1 Get 1 Free");
    }

    double apply(double price) {
        return price / 2;
    }
}

class OrderProcessor {
    public void processOrder(String itemName, double price, Discount discount) {
        System.out.println("Item: " + itemName);
        discount.describe(price);
    }
}

public class Main {
    public static void main(String[] args) {
        OrderProcessor processor = new OrderProcessor();

        processor.processOrder("Laptop", 999.99, new PercentageDiscount(20));
        processor.processOrder("Headphones", 49.99, new FlatDiscount(15));
        processor.processOrder("Keyboard", 79.98, new BuyOneGetOneFree());
    }
}
```

```python
from abc import ABC, abstractmethod

class Discount(ABC):
    def __init__(self, label: str):
        self._label = label

    @abstractmethod
    def apply(self, price: float) -> float:
        pass

    def describe(self, original_price: float):
        discounted_price = self.apply(original_price)
        print(f"{self._label}: ${original_price:.2f} -> ${discounted_price:.2f}")

class PercentageDiscount(Discount):
    def __init__(self, percentage: float):
        super().__init__(f"{percentage:.1f}% off")
        self._percentage = percentage

    def apply(self, price: float) -> float:
        return price * (1 - self._percentage / 100)

class FlatDiscount(Discount):
    def __init__(self, amount: float):
        super().__init__(f"${amount:.1f} off")
        self._amount = amount

    def apply(self, price: float) -> float:
        return max(price - self._amount, 0)

class BuyOneGetOneFree(Discount):
    def __init__(self):
        super().__init__("Buy 1 Get 1 Free")

    def apply(self, price: float) -> float:
        return price / 2

class OrderProcessor:
    def process_order(self, item_name: str, price: float, discount: Discount):
        print(f"Item: {item_name}")
        discount.describe(price)

if __name__ == "__main__":
    processor = OrderProcessor()

    processor.process_order("Laptop", 999.99, PercentageDiscount(20))
    processor.process_order("Headphones", 49.99, FlatDiscount(15))
    processor.process_order("Keyboard", 79.98, BuyOneGetOneFree())
```

```cpp
#include <iostream>
#include <string>
#include <cstdio>
#include <algorithm>
using namespace std;

class Discount {
protected:
    string label;

public:
    Discount(const string& label) : label(label) {}
    virtual ~Discount() {}

    virtual double apply(double price) = 0;

    void describe(double originalPrice) {
        double discountedPrice = apply(originalPrice);
        printf("%s: $%.2f -> $%.2f\n", label.c_str(), originalPrice, discountedPrice);
    }
};

class PercentageDiscount : public Discount {
    double percentage;

public:
    PercentageDiscount(double percentage)
        : Discount(string()) {
        char buf[32];
        snprintf(buf, sizeof(buf), "%.1f", percentage);
        this->label = string(buf) + "% off";
        this->percentage = percentage;
    }

    double apply(double price) override {
        return price * (1 - percentage / 100);
    }
};

class FlatDiscount : public Discount {
    double amount;

public:
    FlatDiscount(double amount)
        : Discount(string()) {
        char buf[32];
        snprintf(buf, sizeof(buf), "%.1f", amount);
        this->label = "$" + string(buf) + " off";
        this->amount = amount;
    }

    double apply(double price) override {
        return max(price - amount, 0.0);
    }
};

class BuyOneGetOneFree : public Discount {
public:
    BuyOneGetOneFree() : Discount("Buy 1 Get 1 Free") {}

    double apply(double price) override {
        return price / 2;
    }
};

class OrderProcessor {
public:
    void processOrder(const string& itemName, double price, Discount& discount) {
        cout << "Item: " << itemName << endl;
        discount.describe(price);
    }
};

int main() {
    OrderProcessor processor;

    PercentageDiscount pct(20);
    FlatDiscount flat(15);
    BuyOneGetOneFree bogo;

    processor.processOrder("Laptop", 999.99, pct);
    processor.processOrder("Headphones", 49.99, flat);
    processor.processOrder("Keyboard", 79.98, bogo);
    return 0;
}
```

```go
package main

import (
	"fmt"
	"math"
)

type Discount interface {
	apply(price float64) float64
	describe(originalPrice float64)
}

type baseDiscount struct {
	label string
}

func (b *baseDiscount) describe(originalPrice float64, discountedPrice float64) {
	fmt.Printf("%s: $%.2f -> $%.2f\n", b.label, originalPrice, discountedPrice)
}

type PercentageDiscount struct {
	baseDiscount
	percentage float64
}

func NewPercentageDiscount(percentage float64) *PercentageDiscount {
	return &PercentageDiscount{
		baseDiscount: baseDiscount{label: fmt.Sprintf("%.1f%% off", percentage)},
		percentage:   percentage,
	}
}

func (p *PercentageDiscount) apply(price float64) float64 {
	return price * (1 - p.percentage/100)
}

func (p *PercentageDiscount) describe(originalPrice float64) {
	p.baseDiscount.describe(originalPrice, p.apply(originalPrice))
}

type FlatDiscount struct {
	baseDiscount
	amount float64
}

func NewFlatDiscount(amount float64) *FlatDiscount {
	return &FlatDiscount{
		baseDiscount: baseDiscount{label: fmt.Sprintf("$%.1f off", amount)},
		amount:       amount,
	}
}

func (f *FlatDiscount) apply(price float64) float64 {
	return math.Max(price-f.amount, 0)
}

func (f *FlatDiscount) describe(originalPrice float64) {
	f.baseDiscount.describe(originalPrice, f.apply(originalPrice))
}

type BuyOneGetOneFree struct {
	baseDiscount
}

func NewBuyOneGetOneFree() *BuyOneGetOneFree {
	return &BuyOneGetOneFree{
		baseDiscount: baseDiscount{label: "Buy 1 Get 1 Free"},
	}
}

func (b *BuyOneGetOneFree) apply(price float64) float64 {
	return price / 2
}

func (b *BuyOneGetOneFree) describe(originalPrice float64) {
	b.baseDiscount.describe(originalPrice, b.apply(originalPrice))
}

type OrderProcessor struct{}

func (o *OrderProcessor) processOrder(itemName string, price float64, discount Discount) {
	fmt.Printf("Item: %s\n", itemName)
	discount.describe(price)
}

func main() {
	processor := &OrderProcessor{}

	processor.processOrder("Laptop", 999.99, NewPercentageDiscount(20))
	processor.processOrder("Headphones", 49.99, NewFlatDiscount(15))
	processor.processOrder("Keyboard", 79.98, NewBuyOneGetOneFree())
}
```

```csharp
using System;

public abstract class Discount
{
    protected string Label;

    public Discount(string label) { Label = label; }

    public abstract double Apply(double price);

    public void Describe(double originalPrice)
    {
        double discountedPrice = Apply(originalPrice);
        Console.WriteLine($"{Label}: ${originalPrice:F2} -> ${discountedPrice:F2}");
    }
}

public class PercentageDiscount : Discount
{
    private double _percentage;

    public PercentageDiscount(double percentage) : base($"{percentage:F1}% off")
    {
        _percentage = percentage;
    }

    public override double Apply(double price)
    {
        return price * (1 - _percentage / 100);
    }
}

public class FlatDiscount : Discount
{
    private double _amount;

    public FlatDiscount(double amount) : base($"${amount:F1} off")
    {
        _amount = amount;
    }

    public override double Apply(double price)
    {
        return Math.Max(price - _amount, 0);
    }
}

public class BuyOneGetOneFree : Discount
{
    public BuyOneGetOneFree() : base("Buy 1 Get 1 Free") {}

    public override double Apply(double price)
    {
        return price / 2;
    }
}

public class OrderProcessor
{
    public void ProcessOrder(string itemName, double price, Discount discount)
    {
        Console.WriteLine($"Item: {itemName}");
        discount.Describe(price);
    }
}

public class Program
{
    public static void Main()
    {
        var processor = new OrderProcessor();

        processor.ProcessOrder("Laptop", 999.99, new PercentageDiscount(20));
        processor.ProcessOrder("Headphones", 49.99, new FlatDiscount(15));
        processor.ProcessOrder("Keyboard", 79.98, new BuyOneGetOneFree());
    }
}
```

```typescript
abstract class Discount {
    protected label: string;

    constructor(label: string) { this.label = label; }

    abstract apply(price: number): number;

    describe(originalPrice: number): void {
        const discountedPrice = this.apply(originalPrice);
        console.log(`${this.label}: $${originalPrice.toFixed(2)} -> $${discountedPrice.toFixed(2)}`);
    }
}

class PercentageDiscount extends Discount {
    private percentage: number;

    constructor(percentage: number) {
        super(percentage.toFixed(1) + "% off");
        this.percentage = percentage;
    }

    apply(price: number): number {
        return price * (1 - this.percentage / 100);
    }
}

class FlatDiscount extends Discount {
    private amount: number;

    constructor(amount: number) {
        super("$" + amount.toFixed(1) + " off");
        this.amount = amount;
    }

    apply(price: number): number {
        return Math.max(price - this.amount, 0);
    }
}

class BuyOneGetOneFree extends Discount {
    constructor() {
        super("Buy 1 Get 1 Free");
    }

    apply(price: number): number {
        return price / 2;
    }
}

class OrderProcessor {
    processOrder(itemName: string, price: number, discount: Discount): void {
        console.log(`Item: ${itemName}`);
        discount.describe(price);
    }
}

const processor = new OrderProcessor();

processor.processOrder("Laptop", 999.99, new PercentageDiscount(20));
processor.processOrder("Headphones", 49.99, new FlatDiscount(15));
processor.processOrder("Keyboard", 79.98, new BuyOneGetOneFree());
```

---

# Exercise 2: Logging System

**Problem:** Build a logging system where the application uses a `Logger` interface polymorphically. Different logger implementations send messages to different destinations, and the application doesn't know or care which one it's using.

**Requirements:**

- `Logger` interface with `log(level, message)` and `getDestination()` methods.
- `ConsoleLogger`: prints formatted log messages to the console.
- `FileLogger`: simulates writing to a file (print with file path prefix).
- `DatabaseLogger`: simulates inserting into a database (print with table name prefix).
- `Application` class that takes a `Logger` in its constructor and uses it throughout.

```java
import java.util.List;

interface Logger {
    void log(String level, String message);
    String getDestination();
}

class ConsoleLogger implements Logger {
    public void log(String level, String message) {
        // TODO: print "[level] message" to console
    }

    public String getDestination() {
        // TODO: return "Console"
        return "";
    }
}

class FileLogger implements Logger {
    private String filePath;

    public FileLogger(String filePath) {
        // TODO: initialize this.filePath
    }

    public void log(String level, String message) {
        // TODO: print "Writing to filePath: [level] message"
    }

    public String getDestination() {
        // TODO: return "File: filePath"
        return "";
    }
}

class DatabaseLogger implements Logger {
    private String tableName;

    public DatabaseLogger(String tableName) {
        // TODO: initialize this.tableName
    }

    public void log(String level, String message) {
        // TODO: print "INSERT INTO tableName: [level] message"
    }

    public String getDestination() {
        // TODO: return "Database: tableName"
        return "";
    }
}

class Application {
    private Logger logger;

    public Application(Logger logger) {
        // TODO: initialize this.logger
    }

    public void run() {
        // TODO: log three messages with level "INFO":
        //   "Application starting..."
        //   "Processing data..."
        //   "Application shutting down."
    }
}

public class Main {
    public static void main(String[] args) {
        List<Logger> loggers = List.of(
            new ConsoleLogger(),
            new FileLogger("/var/log/app.log"),
            new DatabaseLogger("app_logs")
        );

        for (Logger logger : loggers) {
            System.out.println("--- Using " + logger.getDestination() + " ---");
            Application app = new Application(logger);
            app.run();
            System.out.println();
        }
    }
}
```

```python
from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, level: str, message: str) -> None:
        pass

    @abstractmethod
    def get_destination(self) -> str:
        pass

class ConsoleLogger(Logger):
    def log(self, level: str, message: str) -> None:
        # TODO: print "[level] message" to console
        pass

    def get_destination(self) -> str:
        # TODO: return "Console"
        return ""

class FileLogger(Logger):
    def __init__(self, file_path: str):
        # TODO: initialize self._file_path
        pass

    def log(self, level: str, message: str) -> None:
        # TODO: print "Writing to file_path: [level] message"
        pass

    def get_destination(self) -> str:
        # TODO: return "File: file_path"
        return ""

class DatabaseLogger(Logger):
    def __init__(self, table_name: str):
        # TODO: initialize self._table_name
        pass

    def log(self, level: str, message: str) -> None:
        # TODO: print "INSERT INTO table_name: [level] message"
        pass

    def get_destination(self) -> str:
        # TODO: return "Database: table_name"
        return ""

class Application:
    def __init__(self, logger: Logger):
        # TODO: initialize self._logger
        pass

    def run(self):
        # TODO: log three messages with level "INFO":
        #   "Application starting..."
        #   "Processing data..."
        #   "Application shutting down."
        pass

if __name__ == "__main__":
    loggers = [
        ConsoleLogger(),
        FileLogger("/var/log/app.log"),
        DatabaseLogger("app_logs"),
    ]

    for logger in loggers:
        print(f"--- Using {logger.get_destination()} ---")
        app = Application(logger)
        app.run()
        print()
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Logger {
public:
    virtual ~Logger() {}
    virtual void log(const string& level, const string& message) = 0;
    virtual string getDestination() = 0;
};

class ConsoleLogger : public Logger {
public:
    void log(const string& level, const string& message) override {
        // TODO: print "[level] message" to console
    }

    string getDestination() override {
        // TODO: return "Console"
        return "";
    }
};

class FileLogger : public Logger {
private:
    string filePath;

public:
    FileLogger(const string& filePath) {
        // TODO: initialize this->filePath
    }

    void log(const string& level, const string& message) override {
        // TODO: print "Writing to filePath: [level] message"
    }

    string getDestination() override {
        // TODO: return "File: filePath"
        return "";
    }
};

class DatabaseLogger : public Logger {
private:
    string tableName;

public:
    DatabaseLogger(const string& tableName) {
        // TODO: initialize this->tableName
    }

    void log(const string& level, const string& message) override {
        // TODO: print "INSERT INTO tableName: [level] message"
    }

    string getDestination() override {
        // TODO: return "Database: tableName"
        return "";
    }
};

class Application {
private:
    Logger* logger;

public:
    Application(Logger* logger) {
        // TODO: initialize this->logger
    }

    void run() {
        // TODO: log three messages with level "INFO":
        //   "Application starting..."
        //   "Processing data..."
        //   "Application shutting down."
    }
};

int main() {
    ConsoleLogger console;
    FileLogger file("/var/log/app.log");
    DatabaseLogger db("app_logs");

    vector<Logger*> loggers = {&console, &file, &db};

    for (auto* logger : loggers) {
        cout << "--- Using " << logger->getDestination() << " ---" << endl;
        Application app(logger);
        app.run();
        cout << endl;
    }

    return 0;
}
```

```go
package main

type Logger interface {
	Log(level string, message string)
	GetDestination() string
}

type ConsoleLogger struct{}

func (c *ConsoleLogger) Log(level string, message string) {
	// TODO: print "[level] message" to console
}

func (c *ConsoleLogger) GetDestination() string {
	// TODO: return "Console"
	return ""
}

type FileLogger struct {
	filePath string
}

func NewFileLogger(filePath string) *FileLogger {
	// TODO: initialize this.filePath using the parameter
	return &FileLogger{}
}

func (f *FileLogger) Log(level string, message string) {
	// TODO: print "Writing to filePath: [level] message"
}

func (f *FileLogger) GetDestination() string {
	// TODO: return "File: filePath"
	return ""
}

type DatabaseLogger struct {
	tableName string
}

func NewDatabaseLogger(tableName string) *DatabaseLogger {
	// TODO: initialize this.tableName using the parameter
	return &DatabaseLogger{}
}

func (d *DatabaseLogger) Log(level string, message string) {
	// TODO: print "INSERT INTO tableName: [level] message"
}

func (d *DatabaseLogger) GetDestination() string {
	// TODO: return "Database: tableName"
	return ""
}

type Application struct {
	logger Logger
}

func NewApplication(logger Logger) *Application {
	// TODO: initialize this.logger
	return &Application{}
}

func (a *Application) Run() {
	// TODO: log three messages with level "INFO":
	//   "Application starting..."
	//   "Processing data..."
	//   "Application shutting down."
}

func main() {
	loggers := []Logger{
		&ConsoleLogger{},
		NewFileLogger("/var/log/app.log"),
		NewDatabaseLogger("app_logs"),
	}

	for _, logger := range loggers {
		println("--- Using " + logger.GetDestination() + " ---")
		app := NewApplication(logger)
		app.Run()
		println()
	}
}
```

```csharp
using System;
using System.Collections.Generic;

public interface ILogger
{
    void Log(string level, string message);
    string GetDestination();
}

public class ConsoleLogger : ILogger
{
    public void Log(string level, string message)
    {
        // TODO: print "[level] message" to console
    }

    public string GetDestination()
    {
        // TODO: return "Console"
        return "";
    }
}

public class FileLogger : ILogger
{
    private string _filePath;

    public FileLogger(string filePath)
    {
        // TODO: initialize _filePath
    }

    public void Log(string level, string message)
    {
        // TODO: print "Writing to _filePath: [level] message"
    }

    public string GetDestination()
    {
        // TODO: return "File: _filePath"
        return "";
    }
}

public class DatabaseLogger : ILogger
{
    private string _tableName;

    public DatabaseLogger(string tableName)
    {
        // TODO: initialize _tableName
    }

    public void Log(string level, string message)
    {
        // TODO: print "INSERT INTO _tableName: [level] message"
    }

    public string GetDestination()
    {
        // TODO: return "Database: _tableName"
        return "";
    }
}

public class Application
{
    private ILogger _logger;

    public Application(ILogger logger)
    {
        // TODO: initialize _logger
    }

    public void Run()
    {
        // TODO: log three messages with level "INFO":
        //   "Application starting..."
        //   "Processing data..."
        //   "Application shutting down."
    }
}

public class Program
{
    public static void Main()
    {
        var loggers = new List<ILogger>
        {
            new ConsoleLogger(),
            new FileLogger("/var/log/app.log"),
            new DatabaseLogger("app_logs")
        };

        foreach (var logger in loggers)
        {
            Console.WriteLine($"--- Using {logger.GetDestination()} ---");
            var app = new Application(logger);
            app.Run();
            Console.WriteLine();
        }
    }
}
```

```typescript
interface Logger {
    log(level: string, message: string): void;
    getDestination(): string;
}

class ConsoleLogger implements Logger {
    log(level: string, message: string): void {
        // TODO: print "[level] message" to console
    }

    getDestination(): string {
        // TODO: return "Console"
        return "";
    }
}

class FileLogger implements Logger {
    private filePath: string;

    constructor(filePath: string) {
        // TODO: initialize this.filePath using the parameter
        this.filePath = "";
    }

    log(level: string, message: string): void {
        // TODO: print "Writing to filePath: [level] message"
    }

    getDestination(): string {
        // TODO: return "File: filePath"
        return "";
    }
}

class DatabaseLogger implements Logger {
    private tableName: string;

    constructor(tableName: string) {
        // TODO: initialize this.tableName using the parameter
        this.tableName = "";
    }

    log(level: string, message: string): void {
        // TODO: print "INSERT INTO tableName: [level] message"
    }

    getDestination(): string {
        // TODO: return "Database: tableName"
        return "";
    }
}

class Application {
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    run(): void {
        // TODO: log three messages with level "INFO":
        //   "Application starting..."
        //   "Processing data..."
        //   "Application shutting down."
    }
}

const loggers: Logger[] = [
    new ConsoleLogger(),
    new FileLogger("/var/log/app.log"),
    new DatabaseLogger("app_logs"),
];

for (const logger of loggers) {
    console.log(`--- Using ${logger.getDestination()} ---`);
    const app = new Application(logger);
    app.run();
    console.log();
}
```

#### Solutions

```java
import java.util.List;

interface Logger {
    void log(String level, String message);
    String getDestination();
}

class ConsoleLogger implements Logger {
    public void log(String level, String message) {
        System.out.println("[" + level + "] " + message);
    }

    public String getDestination() {
        return "Console";
    }
}

class FileLogger implements Logger {
    private String filePath;

    public FileLogger(String filePath) {
        this.filePath = filePath;
    }

    public void log(String level, String message) {
        System.out.println("Writing to " + filePath + ": [" + level + "] " + message);
    }

    public String getDestination() {
        return "File: " + filePath;
    }
}

class DatabaseLogger implements Logger {
    private String tableName;

    public DatabaseLogger(String tableName) {
        this.tableName = tableName;
    }

    public void log(String level, String message) {
        System.out.println("INSERT INTO " + tableName + ": [" + level + "] " + message);
    }

    public String getDestination() {
        return "Database: " + tableName;
    }
}

class Application {
    private Logger logger;

    public Application(Logger logger) {
        this.logger = logger;
    }

    public void run() {
        logger.log("INFO", "Application starting...");
        logger.log("INFO", "Processing data...");
        logger.log("INFO", "Application shutting down.");
    }
}

public class Main {
    public static void main(String[] args) {
        List<Logger> loggers = List.of(
            new ConsoleLogger(),
            new FileLogger("/var/log/app.log"),
            new DatabaseLogger("app_logs")
        );

        for (Logger logger : loggers) {
            System.out.println("--- Using " + logger.getDestination() + " ---");
            Application app = new Application(logger);
            app.run();
            System.out.println();
        }
    }
}
```

```python
from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, level: str, message: str) -> None:
        pass

    @abstractmethod
    def get_destination(self) -> str:
        pass

class ConsoleLogger(Logger):
    def log(self, level: str, message: str) -> None:
        print(f"[{level}] {message}")

    def get_destination(self) -> str:
        return "Console"

class FileLogger(Logger):
    def __init__(self, file_path: str):
        self._file_path = file_path

    def log(self, level: str, message: str) -> None:
        print(f"Writing to {self._file_path}: [{level}] {message}")

    def get_destination(self) -> str:
        return f"File: {self._file_path}"

class DatabaseLogger(Logger):
    def __init__(self, table_name: str):
        self._table_name = table_name

    def log(self, level: str, message: str) -> None:
        print(f"INSERT INTO {self._table_name}: [{level}] {message}")

    def get_destination(self) -> str:
        return f"Database: {self._table_name}"

class Application:
    def __init__(self, logger: Logger):
        self._logger = logger

    def run(self):
        self._logger.log("INFO", "Application starting...")
        self._logger.log("INFO", "Processing data...")
        self._logger.log("INFO", "Application shutting down.")

if __name__ == "__main__":
    loggers = [
        ConsoleLogger(),
        FileLogger("/var/log/app.log"),
        DatabaseLogger("app_logs"),
    ]

    for logger in loggers:
        print(f"--- Using {logger.get_destination()} ---")
        app = Application(logger)
        app.run()
        print()
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Logger {
public:
    virtual ~Logger() {}
    virtual void log(const string& level, const string& message) = 0;
    virtual string getDestination() = 0;
};

class ConsoleLogger : public Logger {
public:
    void log(const string& level, const string& message) override {
        cout << "[" << level << "] " << message << endl;
    }

    string getDestination() override {
        return "Console";
    }
};

class FileLogger : public Logger {
private:
    string filePath;

public:
    FileLogger(const string& filePath) {
        this->filePath = filePath;
    }

    void log(const string& level, const string& message) override {
        cout << "Writing to " << filePath << ": [" << level << "] " << message << endl;
    }

    string getDestination() override {
        return "File: " + filePath;
    }
};

class DatabaseLogger : public Logger {
private:
    string tableName;

public:
    DatabaseLogger(const string& tableName) {
        this->tableName = tableName;
    }

    void log(const string& level, const string& message) override {
        cout << "INSERT INTO " << tableName << ": [" << level << "] " << message << endl;
    }

    string getDestination() override {
        return "Database: " + tableName;
    }
};

class Application {
private:
    Logger* logger;

public:
    Application(Logger* logger) {
        this->logger = logger;
    }

    void run() {
        logger->log("INFO", "Application starting...");
        logger->log("INFO", "Processing data...");
        logger->log("INFO", "Application shutting down.");
    }
};

int main() {
    ConsoleLogger console;
    FileLogger file("/var/log/app.log");
    DatabaseLogger db("app_logs");

    vector<Logger*> loggers = {&console, &file, &db};

    for (auto* logger : loggers) {
        cout << "--- Using " << logger->getDestination() << " ---" << endl;
        Application app(logger);
        app.run();
        cout << endl;
    }

    return 0;
}
```

```go
package main

import "fmt"

type Logger interface {
	Log(level, message string)
	GetDestination() string
}

type ConsoleLogger struct{}

func (c ConsoleLogger) Log(level, message string) {
	fmt.Printf("[%s] %s\n", level, message)
}

func (c ConsoleLogger) GetDestination() string {
	return "Console"
}

type FileLogger struct {
	filePath string
}

func NewFileLogger(filePath string) *FileLogger {
	return &FileLogger{filePath: filePath}
}

func (f *FileLogger) Log(level, message string) {
	fmt.Printf("Writing to %s: [%s] %s\n", f.filePath, level, message)
}

func (f *FileLogger) GetDestination() string {
	return "File: " + f.filePath
}

type DatabaseLogger struct {
	tableName string
}

func NewDatabaseLogger(tableName string) *DatabaseLogger {
	return &DatabaseLogger{tableName: tableName}
}

func (d *DatabaseLogger) Log(level, message string) {
	fmt.Printf("INSERT INTO %s: [%s] %s\n", d.tableName, level, message)
}

func (d *DatabaseLogger) GetDestination() string {
	return "Database: " + d.tableName
}

type Application struct {
	logger Logger
}

func NewApplication(logger Logger) *Application {
	return &Application{logger: logger}
}

func (a *Application) Run() {
	a.logger.Log("INFO", "Application starting...")
	a.logger.Log("INFO", "Processing data...")
	a.logger.Log("INFO", "Application shutting down.")
}

func main() {
	loggers := []Logger{
		ConsoleLogger{},
		NewFileLogger("/var/log/app.log"),
		NewDatabaseLogger("app_logs"),
	}

	for _, logger := range loggers {
		fmt.Printf("--- Using %s ---\n", logger.GetDestination())
		app := NewApplication(logger)
		app.Run()
		fmt.Println()
	}
}
```

```csharp
using System;
using System.Collections.Generic;

public interface ILogger
{
    void Log(string level, string message);
    string GetDestination();
}

public class ConsoleLogger : ILogger
{
    public void Log(string level, string message)
    {
        Console.WriteLine($"[{level}] {message}");
    }

    public string GetDestination()
    {
        return "Console";
    }
}

public class FileLogger : ILogger
{
    private string _filePath;

    public FileLogger(string filePath)
    {
        _filePath = filePath;
    }

    public void Log(string level, string message)
    {
        Console.WriteLine($"Writing to {_filePath}: [{level}] {message}");
    }

    public string GetDestination()
    {
        return "File: " + _filePath;
    }
}

public class DatabaseLogger : ILogger
{
    private string _tableName;

    public DatabaseLogger(string tableName)
    {
        _tableName = tableName;
    }

    public void Log(string level, string message)
    {
        Console.WriteLine($"INSERT INTO {_tableName}: [{level}] {message}");
    }

    public string GetDestination()
    {
        return "Database: " + _tableName;
    }
}

public class Application
{
    private ILogger _logger;

    public Application(ILogger logger)
    {
        _logger = logger;
    }

    public void Run()
    {
        _logger.Log("INFO", "Application starting...");
        _logger.Log("INFO", "Processing data...");
        _logger.Log("INFO", "Application shutting down.");
    }
}

public class Program
{
    public static void Main()
    {
        var loggers = new List<ILogger>
        {
            new ConsoleLogger(),
            new FileLogger("/var/log/app.log"),
            new DatabaseLogger("app_logs")
        };

        foreach (var logger in loggers)
        {
            Console.WriteLine($"--- Using {logger.GetDestination()} ---");
            var app = new Application(logger);
            app.Run();
            Console.WriteLine();
        }
    }
}
```

```typescript
interface Logger {
    log(level: string, message: string): void;
    getDestination(): string;
}

class ConsoleLogger implements Logger {
    log(level: string, message: string): void {
        console.log(`[${level}] ${message}`);
    }

    getDestination(): string {
        return "Console";
    }
}

class FileLogger implements Logger {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    log(level: string, message: string): void {
        console.log(`Writing to ${this.filePath}: [${level}] ${message}`);
    }

    getDestination(): string {
        return "File: " + this.filePath;
    }
}

class DatabaseLogger implements Logger {
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    log(level: string, message: string): void {
        console.log(`INSERT INTO ${this.tableName}: [${level}] ${message}`);
    }

    getDestination(): string {
        return "Database: " + this.tableName;
    }
}

class Application {
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    run(): void {
        this.logger.log("INFO", "Application starting...");
        this.logger.log("INFO", "Processing data...");
        this.logger.log("INFO", "Application shutting down.");
    }
}

const loggers: Logger[] = [
    new ConsoleLogger(),
    new FileLogger("/var/log/app.log"),
    new DatabaseLogger("app_logs"),
];

for (const logger of loggers) {
    console.log(`--- Using ${logger.getDestination()} ---`);
    const app = new Application(logger);
    app.run();
    console.log();
}
```


