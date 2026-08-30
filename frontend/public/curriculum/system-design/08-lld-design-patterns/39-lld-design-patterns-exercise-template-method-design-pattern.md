---
id: "lld-design-patterns-exercise-template-method-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Template Method Design Pattern"
slug: "lld-design-patterns-exercise-template-method-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Template Method Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Template Method Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Beverage Maker

Build a beverage preparation system where different beverages follow the same overall recipe but differ in the brewing and condiment steps. The `BeverageMaker` base class defines the template: boil water, brew, pour into cup, add condiments. Brewing and adding condiments vary per beverage.

**Requirements:**

- Abstract base class: `BeverageMaker` with a template method `prepareBeverage()` that calls four steps in order: `boilWater()` [common], `brew()` [abstract], `pourInCup()` [common], `addCondiments()` [abstract]
- Concrete classes: `TeaMaker` (brews tea bag, adds lemon), `CoffeeMaker` (brews coffee grounds, adds sugar and milk)

```java
abstract class BeverageMaker {
    public final void prepareBeverage() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    private void boilWater() {
        System.out.println("Boiling water...");
    }

    protected abstract void brew();

    private void pourInCup() {
        System.out.println("Pouring into cup...");
    }

    protected abstract void addCondiments();
}

class TeaMaker extends BeverageMaker {
    @Override
    protected void brew() {
        // TODO: Print "Steeping the tea bag..."
    }

    @Override
    protected void addCondiments() {
        // TODO: Print "Adding lemon..."
    }
}

class CoffeeMaker extends BeverageMaker {
    @Override
    protected void brew() {
        // TODO: Print "Dripping coffee through filter..."
    }

    @Override
    protected void addCondiments() {
        // TODO: Print "Adding sugar and milk..."
    }
}

public class Main {
    public static void main(String[] args) {
        // BeverageMaker tea = new TeaMaker();
        // System.out.println("--- Making Tea ---");
        // tea.prepareBeverage();

        // System.out.println();

        // BeverageMaker coffee = new CoffeeMaker();
        // System.out.println("--- Making Coffee ---");
        // coffee.prepareBeverage();
    }
}
```

```python
from abc import ABC, abstractmethod

class BeverageMaker(ABC):
    def prepare_beverage(self):
        self._boil_water()
        self.brew()
        self._pour_in_cup()
        self.add_condiments()

    def _boil_water(self):
        print("Boiling water...")

    @abstractmethod
    def brew(self):
        pass

    def _pour_in_cup(self):
        print("Pouring into cup...")

    @abstractmethod
    def add_condiments(self):
        pass

class TeaMaker(BeverageMaker):
    def brew(self):
        pass  # TODO: Print "Steeping the tea bag..."

    def add_condiments(self):
        pass  # TODO: Print "Adding lemon..."

class CoffeeMaker(BeverageMaker):
    def brew(self):
        pass  # TODO: Print "Dripping coffee through filter..."

    def add_condiments(self):
        pass  # TODO: Print "Adding sugar and milk..."

if __name__ == "__main__":
    pass
    # print("--- Making Tea ---")
    # TeaMaker().prepare_beverage()

    # print()

    # print("--- Making Coffee ---")
    # CoffeeMaker().prepare_beverage()
```

```cpp
#include <iostream>
using namespace std;

class BeverageMaker {
public:
    virtual ~BeverageMaker() = default;

    void prepareBeverage() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

protected:
    virtual void brew() = 0;
    virtual void addCondiments() = 0;

private:
    void boilWater() {
        cout << "Boiling water..." << endl;
    }
    void pourInCup() {
        cout << "Pouring into cup..." << endl;
    }
};

class TeaMaker : public BeverageMaker {
protected:
    void brew() override {
        // TODO: Print "Steeping the tea bag..."
    }
    void addCondiments() override {
        // TODO: Print "Adding lemon..."
    }
};

class CoffeeMaker : public BeverageMaker {
protected:
    void brew() override {
        // TODO: Print "Dripping coffee through filter..."
    }
    void addCondiments() override {
        // TODO: Print "Adding sugar and milk..."
    }
};

int main() {
    // TeaMaker tea;
    // cout << "--- Making Tea ---" << endl;
    // tea.prepareBeverage();

    // cout << endl;

    // CoffeeMaker coffee;
    // cout << "--- Making Coffee ---" << endl;
    // coffee.prepareBeverage();

    return 0;
}
```

```go
package main

type BeverageMaker interface {
	prepareBeverage()
}

type beverageMakerBase struct{}

func (b *beverageMakerBase) prepareBeverage() {
	b.boilWater()
	b.brew()
	b.pourInCup()
	b.addCondiments()
}

func (b *beverageMakerBase) boilWater() {
	// TODO: Print "Boiling water..."
}

func (b *beverageMakerBase) brew() {
	// TODO: Implement in concrete type
}

func (b *beverageMakerBase) pourInCup() {
	// TODO: Print "Pouring into cup..."
}

func (b *beverageMakerBase) addCondiments() {
	// TODO: Implement in concrete type
}

type TeaMaker struct {
	beverageMakerBase
}

func (t *TeaMaker) brew() {
	// TODO: Print "Steeping the tea bag..."
}

func (t *TeaMaker) addCondiments() {
	// TODO: Print "Adding lemon..."
}

type CoffeeMaker struct {
	beverageMakerBase
}

func (c *CoffeeMaker) brew() {
	// TODO: Print "Dripping coffee through filter..."
}

func (c *CoffeeMaker) addCondiments() {
	// TODO: Print "Adding sugar and milk..."
}

func main() {
	// tea := &TeaMaker{}
	// println("--- Making Tea ---")
	// tea.prepareBeverage()

	// println()

	// coffee := &CoffeeMaker{}
	// println("--- Making Coffee ---")
	// coffee.prepareBeverage()
}
```

```csharp
using System;

abstract class BeverageMaker
{
    public void PrepareBeverage()
    {
        BoilWater();
        Brew();
        PourInCup();
        AddCondiments();
    }

    private void BoilWater()
    {
        Console.WriteLine("Boiling water...");
    }

    protected abstract void Brew();

    private void PourInCup()
    {
        Console.WriteLine("Pouring into cup...");
    }

    protected abstract void AddCondiments();
}

class TeaMaker : BeverageMaker
{
    protected override void Brew()
    {
        // TODO: Print "Steeping the tea bag..."
    }

    protected override void AddCondiments()
    {
        // TODO: Print "Adding lemon..."
    }
}

class CoffeeMaker : BeverageMaker
{
    protected override void Brew()
    {
        // TODO: Print "Dripping coffee through filter..."
    }

    protected override void AddCondiments()
    {
        // TODO: Print "Adding sugar and milk..."
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Console.WriteLine("--- Making Tea ---");
        // new TeaMaker().PrepareBeverage();

        // Console.WriteLine();

        // Console.WriteLine("--- Making Coffee ---");
        // new CoffeeMaker().PrepareBeverage();
    }
}
```

```typescript
abstract class BeverageMaker {
    public prepareBeverage(): void {
        this.boilWater();
        this.brew();
        this.pourInCup();
        this.addCondiments();
    }

    private boilWater(): void {
        console.log("Boiling water...");
    }

    protected abstract brew(): void;

    private pourInCup(): void {
        console.log("Pouring into cup...");
    }

    protected abstract addCondiments(): void;
}

class TeaMaker extends BeverageMaker {
    protected brew(): void {
        // TODO: Print "Steeping the tea bag..."
    }

    protected addCondiments(): void {
        // TODO: Print "Adding lemon..."
    }
}

class CoffeeMaker extends BeverageMaker {
    protected brew(): void {
        // TODO: Print "Dripping coffee through filter..."
    }

    protected addCondiments(): void {
        // TODO: Print "Adding sugar and milk..."
    }
}

// console.log("--- Making Tea ---");
// new TeaMaker().prepareBeverage();

// console.log();

// console.log("--- Making Coffee ---");
// new CoffeeMaker().prepareBeverage();
```

#### Solutions

```java
abstract class BeverageMaker {
    public final void prepareBeverage() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

    private void boilWater() {
        System.out.println("Boiling water...");
    }

    protected abstract void brew();

    private void pourInCup() {
        System.out.println("Pouring into cup...");
    }

    protected abstract void addCondiments();
}

class TeaMaker extends BeverageMaker {
    protected void brew() { System.out.println("Steeping the tea bag..."); }
    protected void addCondiments() { System.out.println("Adding lemon..."); }
}

class CoffeeMaker extends BeverageMaker {
    protected void brew() { System.out.println("Dripping coffee through filter..."); }
    protected void addCondiments() { System.out.println("Adding sugar and milk..."); }
}

public class Main {
    public static void main(String[] args) {
        BeverageMaker tea = new TeaMaker();
        System.out.println("--- Making Tea ---");
        tea.prepareBeverage();

        System.out.println();

        BeverageMaker coffee = new CoffeeMaker();
        System.out.println("--- Making Coffee ---");
        coffee.prepareBeverage();
    }
}
```

```python
from abc import ABC, abstractmethod

class BeverageMaker(ABC):
    def prepare_beverage(self):
        self._boil_water()
        self.brew()
        self._pour_in_cup()
        self.add_condiments()

    def _boil_water(self):
        print("Boiling water...")

    @abstractmethod
    def brew(self):
        pass

    def _pour_in_cup(self):
        print("Pouring into cup...")

    @abstractmethod
    def add_condiments(self):
        pass

class TeaMaker(BeverageMaker):
    def brew(self):
        print("Steeping the tea bag...")
    def add_condiments(self):
        print("Adding lemon...")

class CoffeeMaker(BeverageMaker):
    def brew(self):
        print("Dripping coffee through filter...")
    def add_condiments(self):
        print("Adding sugar and milk...")

if __name__ == "__main__":
    print("--- Making Tea ---")
    TeaMaker().prepare_beverage()

    print()

    print("--- Making Coffee ---")
    CoffeeMaker().prepare_beverage()
```

```cpp
#include <iostream>
using namespace std;

class BeverageMaker {
public:
    virtual ~BeverageMaker() = default;

    void prepareBeverage() {
        boilWater();
        brew();
        pourInCup();
        addCondiments();
    }

protected:
    virtual void brew() = 0;
    virtual void addCondiments() = 0;

private:
    void boilWater() {
        cout << "Boiling water..." << endl;
    }
    void pourInCup() {
        cout << "Pouring into cup..." << endl;
    }
};

class TeaMaker : public BeverageMaker {
protected:
    void brew() override {
        cout << "Steeping the tea bag..." << endl;
    }
    void addCondiments() override {
        cout << "Adding lemon..." << endl;
    }
};

class CoffeeMaker : public BeverageMaker {
protected:
    void brew() override {
        cout << "Dripping coffee through filter..." << endl;
    }
    void addCondiments() override {
        cout << "Adding sugar and milk..." << endl;
    }
};

int main() {
    TeaMaker tea;
    cout << "--- Making Tea ---" << endl;
    tea.prepareBeverage();

    cout << endl;

    CoffeeMaker coffee;
    cout << "--- Making Coffee ---" << endl;
    coffee.prepareBeverage();

    return 0;
}
```

```go
package main

import "fmt"

type beverageMaker interface {
	prepareBeverage()
}

type BeverageMaker struct {
	brewFunc          func()
	addCondimentsFunc func()
}

func (b *BeverageMaker) prepareBeverage() {
	b.boilWater()
	b.brew()
	b.pourInCup()
	b.addCondiments()
}

func (b *BeverageMaker) boilWater() {
	fmt.Println("Boiling water...")
}

func (b *BeverageMaker) brew() {
	if b.brewFunc != nil {
		b.brewFunc()
	}
}

func (b *BeverageMaker) pourInCup() {
	fmt.Println("Pouring into cup...")
}

func (b *BeverageMaker) addCondiments() {
	if b.addCondimentsFunc != nil {
		b.addCondimentsFunc()
	}
}

type TeaMaker struct {
	BeverageMaker
}

func NewTeaMaker() *TeaMaker {
	t := &TeaMaker{}
	t.brewFunc = func() {
		fmt.Println("Steeping the tea bag...")
	}
	t.addCondimentsFunc = func() {
		fmt.Println("Adding lemon...")
	}
	return t
}

type CoffeeMaker struct {
	BeverageMaker
}

func NewCoffeeMaker() *CoffeeMaker {
	c := &CoffeeMaker{}
	c.brewFunc = func() {
		fmt.Println("Dripping coffee through filter...")
	}
	c.addCondimentsFunc = func() {
		fmt.Println("Adding sugar and milk...")
	}
	return c
}

func main() {
	tea := NewTeaMaker()
	fmt.Println("--- Making Tea ---")
	tea.prepareBeverage()

	fmt.Println()

	coffee := NewCoffeeMaker()
	fmt.Println("--- Making Coffee ---")
	coffee.prepareBeverage()
}
```

```csharp
using System;

abstract class BeverageMaker
{
    public void PrepareBeverage()
    {
        BoilWater();
        Brew();
        PourInCup();
        AddCondiments();
    }

    private void BoilWater()
    {
        Console.WriteLine("Boiling water...");
    }

    protected abstract void Brew();

    private void PourInCup()
    {
        Console.WriteLine("Pouring into cup...");
    }

    protected abstract void AddCondiments();
}

class TeaMaker : BeverageMaker
{
    protected override void Brew()
    {
        Console.WriteLine("Steeping the tea bag...");
    }

    protected override void AddCondiments()
    {
        Console.WriteLine("Adding lemon...");
    }
}

class CoffeeMaker : BeverageMaker
{
    protected override void Brew()
    {
        Console.WriteLine("Dripping coffee through filter...");
    }

    protected override void AddCondiments()
    {
        Console.WriteLine("Adding sugar and milk...");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("--- Making Tea ---");
        new TeaMaker().PrepareBeverage();

        Console.WriteLine();

        Console.WriteLine("--- Making Coffee ---");
        new CoffeeMaker().PrepareBeverage();
    }
}
```

```typescript
abstract class BeverageMaker {
    public prepareBeverage(): void {
        this.boilWater();
        this.brew();
        this.pourInCup();
        this.addCondiments();
    }

    private boilWater(): void {
        console.log("Boiling water...");
    }

    protected abstract brew(): void;

    private pourInCup(): void {
        console.log("Pouring into cup...");
    }

    protected abstract addCondiments(): void;
}

class TeaMaker extends BeverageMaker {
    protected brew(): void {
        console.log("Steeping the tea bag...");
    }

    protected addCondiments(): void {
        console.log("Adding lemon...");
    }
}

class CoffeeMaker extends BeverageMaker {
    protected brew(): void {
        console.log("Dripping coffee through filter...");
    }

    protected addCondiments(): void {
        console.log("Adding sugar and milk...");
    }
}

console.log("--- Making Tea ---");
new TeaMaker().prepareBeverage();

console.log();

console.log("--- Making Coffee ---");
new CoffeeMaker().prepareBeverage();
```

---

# Exercise 2: Online Order Processor

> [!PAYWALL] This content is for premium members only.

Build an order processing system where physical and digital orders follow the same overall workflow but differ in how totals are calculated, how discounts are applied, and how payments are processed. This exercise introduces a **hook method** — `applyDiscount()` has a default (no discount) that can be optionally overridden.

**Requirements:**

- Abstract base class: `OrderProcessor` with a template method `processOrder()` that calls: `validateOrder()` [common], `calculateTotal()` [abstract], `applyDiscount()` [hook - default: no discount], `processPayment()` [abstract], `sendConfirmation()` [common]
- Concrete classes:
   - `PhysicalOrderProcessor` — calculates total with shipping, processes payment via credit card, overrides `applyDiscount()` to apply 10% for orders over $100
   - `DigitalOrderProcessor` — calculates total without shipping, processes payment via digital wallet, uses default no-discount hook

```java
abstract class OrderProcessor {
    public final void processOrder() {
        validateOrder();
        calculateTotal();
        applyDiscount();
        processPayment();
        sendConfirmation();
    }

    private void validateOrder() {
        System.out.println("Validating order items...");
    }

    protected abstract void calculateTotal();

    protected void applyDiscount() { // Hook method
        System.out.println("No discount applied (default).");
    }

    protected abstract void processPayment();

    private void sendConfirmation() {
        System.out.println("Sending order confirmation email...");
    }
}

class PhysicalOrderProcessor extends OrderProcessor {
    @Override
    protected void calculateTotal() {
        // TODO: Print "Calculating total: items + $5.99 shipping..."
    }

    @Override
    protected void applyDiscount() {
        // TODO: Print "Applying 10% discount for orders over $100..."
    }

    @Override
    protected void processPayment() {
        // TODO: Print "Processing credit card payment..."
    }
}

class DigitalOrderProcessor extends OrderProcessor {
    @Override
    protected void calculateTotal() {
        // TODO: Print "Calculating total: digital items (no shipping)..."
    }

    // applyDiscount() not overridden — default "no discount" is used

    @Override
    protected void processPayment() {
        // TODO: Print "Processing digital wallet payment..."
    }
}

public class Main {
    public static void main(String[] args) {
        // OrderProcessor physical = new PhysicalOrderProcessor();
        // System.out.println("--- Physical Order ---");
        // physical.processOrder();

        // System.out.println();

        // OrderProcessor digital = new DigitalOrderProcessor();
        // System.out.println("--- Digital Order ---");
        // digital.processOrder();
    }
}
```

```python
from abc import ABC, abstractmethod

class OrderProcessor(ABC):
    def process_order(self):
        self._validate_order()
        self.calculate_total()
        self.apply_discount()
        self.process_payment()
        self._send_confirmation()

    def _validate_order(self):
        print("Validating order items...")

    @abstractmethod
    def calculate_total(self):
        pass

    def apply_discount(self):  # Hook method
        print("No discount applied (default).")

    @abstractmethod
    def process_payment(self):
        pass

    def _send_confirmation(self):
        print("Sending order confirmation email...")

class PhysicalOrderProcessor(OrderProcessor):
    def calculate_total(self):
        pass  # TODO: Print "Calculating total: items + $5.99 shipping..."

    def apply_discount(self):
        pass  # TODO: Print "Applying 10% discount for orders over $100..."

    def process_payment(self):
        pass  # TODO: Print "Processing credit card payment..."

class DigitalOrderProcessor(OrderProcessor):
    def calculate_total(self):
        pass  # TODO: Print "Calculating total: digital items (no shipping)..."

    # apply_discount() not overridden — default "no discount" is used

    def process_payment(self):
        pass  # TODO: Print "Processing digital wallet payment..."

if __name__ == "__main__":
    pass
    # print("--- Physical Order ---")
    # PhysicalOrderProcessor().process_order()

    # print()

    # print("--- Digital Order ---")
    # DigitalOrderProcessor().process_order()
```

```cpp
#include <iostream>
using namespace std;

class OrderProcessor {
public:
    virtual ~OrderProcessor() = default;

    void processOrder() {
        validateOrder();
        calculateTotal();
        applyDiscount();
        processPayment();
        sendConfirmation();
    }

protected:
    virtual void calculateTotal() = 0;
    virtual void applyDiscount() {
        cout << "No discount applied (default)." << endl;
    }
    virtual void processPayment() = 0;

private:
    void validateOrder() {
        cout << "Validating order items..." << endl;
    }
    void sendConfirmation() {
        cout << "Sending order confirmation email..." << endl;
    }
};

class PhysicalOrderProcessor : public OrderProcessor {
protected:
    void calculateTotal() override {
        // TODO: Print "Calculating total: items + $5.99 shipping..."
    }
    void applyDiscount() override {
        // TODO: Print "Applying 10% discount for orders over $100..."
    }
    void processPayment() override {
        // TODO: Print "Processing credit card payment..."
    }
};

class DigitalOrderProcessor : public OrderProcessor {
protected:
    void calculateTotal() override {
        // TODO: Print "Calculating total: digital items (no shipping)..."
    }
    // applyDiscount() not overridden — uses default
    void processPayment() override {
        // TODO: Print "Processing digital wallet payment..."
    }
};

int main() {
    // PhysicalOrderProcessor physical;
    // cout << "--- Physical Order ---" << endl;
    // physical.processOrder();

    // cout << endl;

    // DigitalOrderProcessor digital;
    // cout << "--- Digital Order ---" << endl;
    // digital.processOrder();

    return 0;
}
```

```go
package main

import "fmt"

type OrderProcessor interface {
	ProcessOrder()
}

type BaseOrderProcessor struct{}

func (b *BaseOrderProcessor) ProcessOrder() {
	b.validateOrder()
	b.calculateTotal()
	b.applyDiscount()
	b.processPayment()
	b.sendConfirmation()
}

func (b *BaseOrderProcessor) validateOrder() {
	fmt.Println("Validating order items...")
}

func (b *BaseOrderProcessor) calculateTotal() {
	// TODO: Print "Calculating total..."
}

func (b *BaseOrderProcessor) applyDiscount() {
	fmt.Println("No discount applied (default).")
}

func (b *BaseOrderProcessor) processPayment() {
	// TODO: Print "Processing payment..."
}

func (b *BaseOrderProcessor) sendConfirmation() {
	fmt.Println("Sending order confirmation email...")
}

type PhysicalOrderProcessor struct {
	BaseOrderProcessor
}

func (p *PhysicalOrderProcessor) calculateTotal() {
	// TODO: Print "Calculating total: items + $5.99 shipping..."
}

func (p *PhysicalOrderProcessor) applyDiscount() {
	// TODO: Print "Applying 10% discount for orders over $100..."
}

func (p *PhysicalOrderProcessor) processPayment() {
	// TODO: Print "Processing credit card payment..."
}

type DigitalOrderProcessor struct {
	BaseOrderProcessor
}

func (d *DigitalOrderProcessor) calculateTotal() {
	// TODO: Print "Calculating total: digital items (no shipping)..."
}

func (d *DigitalOrderProcessor) processPayment() {
	// TODO: Print "Processing digital wallet payment..."
}

func main() {
	// physical := &PhysicalOrderProcessor{}
	// fmt.Println("--- Physical Order ---")
	// physical.ProcessOrder()

	// fmt.Println()

	// digital := &DigitalOrderProcessor{}
	// fmt.Println("--- Digital Order ---")
	// digital.ProcessOrder()
}
```

```csharp
using System;

abstract class OrderProcessor
{
    public void ProcessOrder()
    {
        ValidateOrder();
        CalculateTotal();
        ApplyDiscount();
        ProcessPayment();
        SendConfirmation();
    }

    private void ValidateOrder()
    {
        Console.WriteLine("Validating order items...");
    }

    protected abstract void CalculateTotal();

    protected virtual void ApplyDiscount()
    {
        Console.WriteLine("No discount applied (default).");
    }

    protected abstract void ProcessPayment();

    private void SendConfirmation()
    {
        Console.WriteLine("Sending order confirmation email...");
    }
}

class PhysicalOrderProcessor : OrderProcessor
{
    protected override void CalculateTotal()
    {
        // TODO: Print "Calculating total: items + $5.99 shipping..."
    }

    protected override void ApplyDiscount()
    {
        // TODO: Print "Applying 10% discount for orders over $100..."
    }

    protected override void ProcessPayment()
    {
        // TODO: Print "Processing credit card payment..."
    }
}

class DigitalOrderProcessor : OrderProcessor
{
    protected override void CalculateTotal()
    {
        // TODO: Print "Calculating total: digital items (no shipping)..."
    }

    // ApplyDiscount() not overridden — uses default

    protected override void ProcessPayment()
    {
        // TODO: Print "Processing digital wallet payment..."
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Console.WriteLine("--- Physical Order ---");
        // new PhysicalOrderProcessor().ProcessOrder();

        // Console.WriteLine();

        // Console.WriteLine("--- Digital Order ---");
        // new DigitalOrderProcessor().ProcessOrder();
    }
}
```

```typescript
abstract class OrderProcessor {
    public processOrder(): void {
        this.validateOrder();
        this.calculateTotal();
        this.applyDiscount();
        this.processPayment();
        this.sendConfirmation();
    }

    private validateOrder(): void {
        console.log("Validating order items...");
    }

    protected abstract calculateTotal(): void;

    protected applyDiscount(): void {
        console.log("No discount applied (default).");
    }

    protected abstract processPayment(): void;

    private sendConfirmation(): void {
        console.log("Sending order confirmation email...");
    }
}

class PhysicalOrderProcessor extends OrderProcessor {
    protected calculateTotal(): void {
        // TODO: Print "Calculating total: items + $5.99 shipping..."
    }

    protected applyDiscount(): void {
        // TODO: Print "Applying 10% discount for orders over $100..."
    }

    protected processPayment(): void {
        // TODO: Print "Processing credit card payment..."
    }
}

class DigitalOrderProcessor extends OrderProcessor {
    protected calculateTotal(): void {
        // TODO: Print "Calculating total: digital items (no shipping)..."
    }

    // applyDiscount() not overridden — uses default

    protected processPayment(): void {
        // TODO: Print "Processing digital wallet payment..."
    }
}

// console.log("--- Physical Order ---");
// new PhysicalOrderProcessor().processOrder();

// console.log();

// console.log("--- Digital Order ---");
// new DigitalOrderProcessor().processOrder();
```

#### Solutions

```java
abstract class OrderProcessor {
    public final void processOrder() {
        validateOrder();
        calculateTotal();
        applyDiscount();
        processPayment();
        sendConfirmation();
    }

    private void validateOrder() {
        System.out.println("Validating order items...");
    }

    protected abstract void calculateTotal();

    protected void applyDiscount() { // Hook method
        System.out.println("No discount applied (default).");
    }

    protected abstract void processPayment();

    private void sendConfirmation() {
        System.out.println("Sending order confirmation email...");
    }
}

class PhysicalOrderProcessor extends OrderProcessor {
    @Override
    protected void calculateTotal() {
        System.out.println("Calculating total: items + $5.99 shipping...");
    }

    @Override
    protected void applyDiscount() {
        System.out.println("Applying 10% discount for orders over $100...");
    }

    @Override
    protected void processPayment() {
        System.out.println("Processing credit card payment...");
    }
}

class DigitalOrderProcessor extends OrderProcessor {
    @Override
    protected void calculateTotal() {
        System.out.println("Calculating total: digital items (no shipping)...");
    }

    @Override
    protected void processPayment() {
        System.out.println("Processing digital wallet payment...");
    }
}

public class Main {
    public static void main(String[] args) {
        OrderProcessor physical = new PhysicalOrderProcessor();
        System.out.println("--- Physical Order ---");
        physical.processOrder();

        System.out.println();

        OrderProcessor digital = new DigitalOrderProcessor();
        System.out.println("--- Digital Order ---");
        digital.processOrder();
    }
}
```

```python
from abc import ABC, abstractmethod

class OrderProcessor(ABC):
    def process_order(self):
        self._validate_order()
        self.calculate_total()
        self.apply_discount()
        self.process_payment()
        self._send_confirmation()

    def _validate_order(self):
        print("Validating order items...")

    @abstractmethod
    def calculate_total(self):
        pass

    def apply_discount(self):  # Hook method
        print("No discount applied (default).")

    @abstractmethod
    def process_payment(self):
        pass

    def _send_confirmation(self):
        print("Sending order confirmation email...")

class PhysicalOrderProcessor(OrderProcessor):
    def calculate_total(self):
        print("Calculating total: items + $5.99 shipping...")

    def apply_discount(self):
        print("Applying 10% discount for orders over $100...")

    def process_payment(self):
        print("Processing credit card payment...")

class DigitalOrderProcessor(OrderProcessor):
    def calculate_total(self):
        print("Calculating total: digital items (no shipping)...")

    def process_payment(self):
        print("Processing digital wallet payment...")

if __name__ == "__main__":
    print("--- Physical Order ---")
    PhysicalOrderProcessor().process_order()

    print()

    print("--- Digital Order ---")
    DigitalOrderProcessor().process_order()
```

```cpp
#include <iostream>
using namespace std;

class OrderProcessor {
public:
    virtual ~OrderProcessor() = default;

    void processOrder() {
        validateOrder();
        calculateTotal();
        applyDiscount();
        processPayment();
        sendConfirmation();
    }

protected:
    virtual void calculateTotal() = 0;
    virtual void applyDiscount() {
        cout << "No discount applied (default)." << endl;
    }
    virtual void processPayment() = 0;

private:
    void validateOrder() {
        cout << "Validating order items..." << endl;
    }
    void sendConfirmation() {
        cout << "Sending order confirmation email..." << endl;
    }
};

class PhysicalOrderProcessor : public OrderProcessor {
protected:
    void calculateTotal() override {
        cout << "Calculating total: items + $5.99 shipping..." << endl;
    }
    void applyDiscount() override {
        cout << "Applying 10% discount for orders over $100..." << endl;
    }
    void processPayment() override {
        cout << "Processing credit card payment..." << endl;
    }
};

class DigitalOrderProcessor : public OrderProcessor {
protected:
    void calculateTotal() override {
        cout << "Calculating total: digital items (no shipping)..." << endl;
    }
    void processPayment() override {
        cout << "Processing digital wallet payment..." << endl;
    }
};

int main() {
    PhysicalOrderProcessor physical;
    cout << "--- Physical Order ---" << endl;
    physical.processOrder();

    cout << endl;

    DigitalOrderProcessor digital;
    cout << "--- Digital Order ---" << endl;
    digital.processOrder();

    return 0;
}
```

```go
package main

import "fmt"

type OrderProcessor interface {
	processOrder()
	calculateTotal()
	applyDiscount()
	processPayment()
}

type BaseOrderProcessor struct {
	self OrderProcessor
}

func (b *BaseOrderProcessor) processOrder() {
	b.validateOrder()
	b.self.calculateTotal()
	b.self.applyDiscount()
	b.self.processPayment()
	b.sendConfirmation()
}

func (b *BaseOrderProcessor) validateOrder() {
	fmt.Println("Validating order items...")
}

func (b *BaseOrderProcessor) applyDiscount() {
	fmt.Println("No discount applied (default).")
}

func (b *BaseOrderProcessor) sendConfirmation() {
	fmt.Println("Sending order confirmation email...")
}

type PhysicalOrderProcessor struct {
	BaseOrderProcessor
}

func NewPhysicalOrderProcessor() *PhysicalOrderProcessor {
	p := &PhysicalOrderProcessor{}
	p.BaseOrderProcessor.self = p
	return p
}

func (p *PhysicalOrderProcessor) calculateTotal() {
	fmt.Println("Calculating total: items + $5.99 shipping...")
}

func (p *PhysicalOrderProcessor) applyDiscount() {
	fmt.Println("Applying 10% discount for orders over $100...")
}

func (p *PhysicalOrderProcessor) processPayment() {
	fmt.Println("Processing credit card payment...")
}

type DigitalOrderProcessor struct {
	BaseOrderProcessor
}

func NewDigitalOrderProcessor() *DigitalOrderProcessor {
	d := &DigitalOrderProcessor{}
	d.BaseOrderProcessor.self = d
	return d
}

func (d *DigitalOrderProcessor) calculateTotal() {
	fmt.Println("Calculating total: digital items (no shipping)...")
}

func (d *DigitalOrderProcessor) processPayment() {
	fmt.Println("Processing digital wallet payment...")
}

func main() {
	physical := NewPhysicalOrderProcessor()
	fmt.Println("--- Physical Order ---")
	physical.processOrder()

	fmt.Println()

	digital := NewDigitalOrderProcessor()
	fmt.Println("--- Digital Order ---")
	digital.processOrder()
}
```

```csharp
using System;

abstract class OrderProcessor
{
    public void ProcessOrder()
    {
        ValidateOrder();
        CalculateTotal();
        ApplyDiscount();
        ProcessPayment();
        SendConfirmation();
    }

    private void ValidateOrder()
    {
        Console.WriteLine("Validating order items...");
    }

    protected abstract void CalculateTotal();

    protected virtual void ApplyDiscount()
    {
        Console.WriteLine("No discount applied (default).");
    }

    protected abstract void ProcessPayment();

    private void SendConfirmation()
    {
        Console.WriteLine("Sending order confirmation email...");
    }
}

class PhysicalOrderProcessor : OrderProcessor
{
    protected override void CalculateTotal()
    {
        Console.WriteLine("Calculating total: items + $5.99 shipping...");
    }

    protected override void ApplyDiscount()
    {
        Console.WriteLine("Applying 10% discount for orders over $100...");
    }

    protected override void ProcessPayment()
    {
        Console.WriteLine("Processing credit card payment...");
    }
}

class DigitalOrderProcessor : OrderProcessor
{
    protected override void CalculateTotal()
    {
        Console.WriteLine("Calculating total: digital items (no shipping)...");
    }

    protected override void ProcessPayment()
    {
        Console.WriteLine("Processing digital wallet payment...");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("--- Physical Order ---");
        new PhysicalOrderProcessor().ProcessOrder();

        Console.WriteLine();

        Console.WriteLine("--- Digital Order ---");
        new DigitalOrderProcessor().ProcessOrder();
    }
}
```

```typescript
abstract class OrderProcessor {
    public processOrder(): void {
        this.validateOrder();
        this.calculateTotal();
        this.applyDiscount();
        this.processPayment();
        this.sendConfirmation();
    }

    private validateOrder(): void {
        console.log("Validating order items...");
    }

    protected abstract calculateTotal(): void;

    protected applyDiscount(): void {
        console.log("No discount applied (default).");
    }

    protected abstract processPayment(): void;

    private sendConfirmation(): void {
        console.log("Sending order confirmation email...");
    }
}

class PhysicalOrderProcessor extends OrderProcessor {
    protected calculateTotal(): void {
        console.log("Calculating total: items + $5.99 shipping...");
    }

    protected applyDiscount(): void {
        console.log("Applying 10% discount for orders over $100...");
    }

    protected processPayment(): void {
        console.log("Processing credit card payment...");
    }
}

class DigitalOrderProcessor extends OrderProcessor {
    protected calculateTotal(): void {
        console.log("Calculating total: digital items (no shipping)...");
    }

    protected processPayment(): void {
        console.log("Processing digital wallet payment...");
    }
}

console.log("--- Physical Order ---");
new PhysicalOrderProcessor().processOrder();

console.log();

console.log("--- Digital Order ---");
new DigitalOrderProcessor().processOrder();
```

---

# Exercise 3: Build Pipeline

Build a CI/CD build pipeline where different programming languages follow the same build sequence but differ in compilation, testing, and packaging. The `BuildPipeline` base class defines the template: fetch source, compile, run tests, package artifact, optionally deploy, and notify the team. Deployment is a hook that defaults to "skipping deployment."

**Requirements:**

- Abstract base class: `BuildPipeline` with a template method `runBuild()` that calls: `fetchSource()` [common], `compileSources()` [abstract], `runTests()` [abstract], `packageArtifact()` [abstract], `deploy()` [hook - default: "Skipping deployment (not configured)."], `notifyTeam()` [common]
- Concrete classes:
   - `JavaBuildPipeline` — compiles with `javac`, runs JUnit tests, packages as JAR, overrides `deploy()` to deploy to Nexus
   - `PythonBuildPipeline` — runs `pylint` (no compilation), runs `pytest` tests, packages as wheel, uses default deploy hook (no deployment)

```java
abstract class BuildPipeline {
    public final void runBuild() {
        fetchSource();
        compileSources();
        runTests();
        packageArtifact();
        deploy();
        notifyTeam();
    }

    private void fetchSource() {
        System.out.println("  Fetching source from repository...");
    }

    protected abstract void compileSources();
    protected abstract void runTests();
    protected abstract void packageArtifact();

    protected void deploy() { // Hook
        System.out.println("  Skipping deployment (not configured).");
    }

    private void notifyTeam() {
        System.out.println("  Notifying team: Build complete!");
    }
}

class JavaBuildPipeline extends BuildPipeline {
    @Override
    protected void compileSources() {
        // TODO: Print "  Compiling Java sources with javac..."
    }

    @Override
    protected void runTests() {
        // TODO: Print "  Running JUnit tests..."
    }

    @Override
    protected void packageArtifact() {
        // TODO: Print "  Packaging as JAR file..."
    }

    @Override
    protected void deploy() {
        // TODO: Print "  Deploying JAR to Nexus repository..."
    }
}

class PythonBuildPipeline extends BuildPipeline {
    @Override
    protected void compileSources() {
        // TODO: Print "  Running pylint static analysis (no compilation needed)..."
    }

    @Override
    protected void runTests() {
        // TODO: Print "  Running pytest tests..."
    }

    @Override
    protected void packageArtifact() {
        // TODO: Print "  Packaging as Python wheel..."
    }

    // deploy() not overridden — uses default "skipping"
}

public class Main {
    public static void main(String[] args) {
        // BuildPipeline javaBuild = new JavaBuildPipeline();
        // System.out.println("=== Java Build ===");
        // javaBuild.runBuild();

        // System.out.println();

        // BuildPipeline pythonBuild = new PythonBuildPipeline();
        // System.out.println("=== Python Build ===");
        // pythonBuild.runBuild();
    }
}
```

```python
from abc import ABC, abstractmethod

class BuildPipeline(ABC):
    def run_build(self):
        self._fetch_source()
        self.compile_sources()
        self.run_tests()
        self.package_artifact()
        self.deploy()
        self._notify_team()

    def _fetch_source(self):
        print("  Fetching source from repository...")

    @abstractmethod
    def compile_sources(self):
        pass

    @abstractmethod
    def run_tests(self):
        pass

    @abstractmethod
    def package_artifact(self):
        pass

    def deploy(self):  # Hook
        print("  Skipping deployment (not configured).")

    def _notify_team(self):
        print("  Notifying team: Build complete!")

class JavaBuildPipeline(BuildPipeline):
    def compile_sources(self):
        pass  # TODO: Print "  Compiling Java sources with javac..."

    def run_tests(self):
        pass  # TODO: Print "  Running JUnit tests..."

    def package_artifact(self):
        pass  # TODO: Print "  Packaging as JAR file..."

    def deploy(self):
        pass  # TODO: Print "  Deploying JAR to Nexus repository..."

class PythonBuildPipeline(BuildPipeline):
    def compile_sources(self):
        pass  # TODO: Print "  Running pylint static analysis (no compilation needed)..."

    def run_tests(self):
        pass  # TODO: Print "  Running pytest tests..."

    def package_artifact(self):
        pass  # TODO: Print "  Packaging as Python wheel..."

    # deploy() not overridden — uses default "skipping"

if __name__ == "__main__":
    pass
    # print("=== Java Build ===")
    # JavaBuildPipeline().run_build()

    # print()

    # print("=== Python Build ===")
    # PythonBuildPipeline().run_build()
```

```cpp
#include <iostream>
using namespace std;

class BuildPipeline {
public:
    virtual ~BuildPipeline() = default;

    void runBuild() {
        fetchSource();
        compileSources();
        runTests();
        packageArtifact();
        deploy();
        notifyTeam();
    }

protected:
    virtual void compileSources() = 0;
    virtual void runTests() = 0;
    virtual void packageArtifact() = 0;
    virtual void deploy() {
        cout << "  Skipping deployment (not configured)." << endl;
    }

private:
    void fetchSource() {
        cout << "  Fetching source from repository..." << endl;
    }
    void notifyTeam() {
        cout << "  Notifying team: Build complete!" << endl;
    }
};

class JavaBuildPipeline : public BuildPipeline {
protected:
    void compileSources() override {
        // TODO: Print "  Compiling Java sources with javac..."
    }
    void runTests() override {
        // TODO: Print "  Running JUnit tests..."
    }
    void packageArtifact() override {
        // TODO: Print "  Packaging as JAR file..."
    }
    void deploy() override {
        // TODO: Print "  Deploying JAR to Nexus repository..."
    }
};

class PythonBuildPipeline : public BuildPipeline {
protected:
    void compileSources() override {
        // TODO: Print "  Running pylint static analysis (no compilation needed)..."
    }
    void runTests() override {
        // TODO: Print "  Running pytest tests..."
    }
    void packageArtifact() override {
        // TODO: Print "  Packaging as Python wheel..."
    }
    // deploy() not overridden — uses default
};

int main() {
    // JavaBuildPipeline javaBuild;
    // cout << "=== Java Build ===" << endl;
    // javaBuild.runBuild();

    // cout << endl;

    // PythonBuildPipeline pythonBuild;
    // cout << "=== Python Build ===" << endl;
    // pythonBuild.runBuild();

    return 0;
}
```

```go
package main

import "fmt"

type BuildPipeline interface {
	RunBuild()
	compileSources()
	runTests()
	packageArtifact()
	deploy()
}

type buildPipelineBase struct{}

func (b *buildPipelineBase) RunBuild() {
	b.fetchSource()
	b.compileSources()
	b.runTests()
	b.packageArtifact()
	b.deploy()
	b.notifyTeam()
}

func (b *buildPipelineBase) fetchSource() {
	fmt.Println("  Fetching source from repository...")
}

func (b *buildPipelineBase) deploy() {
	fmt.Println("  Skipping deployment (not configured).")
}

func (b *buildPipelineBase) notifyTeam() {
	fmt.Println("  Notifying team: Build complete!")
}

type JavaBuildPipeline struct {
	buildPipelineBase
}

func (j *JavaBuildPipeline) compileSources() {
	// TODO: Print "  Compiling Java sources with javac..."
}

func (j *JavaBuildPipeline) runTests() {
	// TODO: Print "  Running JUnit tests..."
}

func (j *JavaBuildPipeline) packageArtifact() {
	// TODO: Print "  Packaging as JAR file..."
}

func (j *JavaBuildPipeline) deploy() {
	// TODO: Print "  Deploying JAR to Nexus repository..."
}

type PythonBuildPipeline struct {
	buildPipelineBase
}

func (p *PythonBuildPipeline) compileSources() {
	// TODO: Print "  Running pylint static analysis (no compilation needed)..."
}

func (p *PythonBuildPipeline) runTests() {
	// TODO: Print "  Running pytest tests..."
}

func (p *PythonBuildPipeline) packageArtifact() {
	// TODO: Print "  Packaging as Python wheel..."
}

// deploy() not overridden — uses default "skipping"

func main() {
	// javaBuild := &JavaBuildPipeline{}
	// fmt.Println("=== Java Build ===")
	// javaBuild.RunBuild()

	// fmt.Println()

	// pythonBuild := &PythonBuildPipeline{}
	// fmt.Println("=== Python Build ===")
	// pythonBuild.RunBuild()
}
```

```csharp
using System;

abstract class BuildPipeline
{
    public void RunBuild()
    {
        FetchSource();
        CompileSources();
        RunTests();
        PackageArtifact();
        Deploy();
        NotifyTeam();
    }

    private void FetchSource()
    {
        Console.WriteLine("  Fetching source from repository...");
    }

    protected abstract void CompileSources();
    protected abstract void RunTests();
    protected abstract void PackageArtifact();

    protected virtual void Deploy()
    {
        Console.WriteLine("  Skipping deployment (not configured).");
    }

    private void NotifyTeam()
    {
        Console.WriteLine("  Notifying team: Build complete!");
    }
}

class JavaBuildPipeline : BuildPipeline
{
    protected override void CompileSources()
    {
        // TODO: Print "  Compiling Java sources with javac..."
    }

    protected override void RunTests()
    {
        // TODO: Print "  Running JUnit tests..."
    }

    protected override void PackageArtifact()
    {
        // TODO: Print "  Packaging as JAR file..."
    }

    protected override void Deploy()
    {
        // TODO: Print "  Deploying JAR to Nexus repository..."
    }
}

class PythonBuildPipeline : BuildPipeline
{
    protected override void CompileSources()
    {
        // TODO: Print "  Running pylint static analysis (no compilation needed)..."
    }

    protected override void RunTests()
    {
        // TODO: Print "  Running pytest tests..."
    }

    protected override void PackageArtifact()
    {
        // TODO: Print "  Packaging as Python wheel..."
    }

    // Deploy() not overridden — uses default
}

class Program
{
    static void Main(string[] args)
    {
        // Console.WriteLine("=== Java Build ===");
        // new JavaBuildPipeline().RunBuild();

        // Console.WriteLine();

        // Console.WriteLine("=== Python Build ===");
        // new PythonBuildPipeline().RunBuild();
    }
}
```

```typescript
abstract class BuildPipeline {
    public runBuild(): void {
        this.fetchSource();
        this.compileSources();
        this.runTests();
        this.packageArtifact();
        this.deploy();
        this.notifyTeam();
    }

    private fetchSource(): void {
        console.log("  Fetching source from repository...");
    }

    protected abstract compileSources(): void;
    protected abstract runTests(): void;
    protected abstract packageArtifact(): void;

    protected deploy(): void {
        console.log("  Skipping deployment (not configured).");
    }

    private notifyTeam(): void {
        console.log("  Notifying team: Build complete!");
    }
}

class JavaBuildPipeline extends BuildPipeline {
    protected compileSources(): void {
        // TODO: Print "  Compiling Java sources with javac..."
    }

    protected runTests(): void {
        // TODO: Print "  Running JUnit tests..."
    }

    protected packageArtifact(): void {
        // TODO: Print "  Packaging as JAR file..."
    }

    protected deploy(): void {
        // TODO: Print "  Deploying JAR to Nexus repository..."
    }
}

class PythonBuildPipeline extends BuildPipeline {
    protected compileSources(): void {
        // TODO: Print "  Running pylint static analysis (no compilation needed)..."
    }

    protected runTests(): void {
        // TODO: Print "  Running pytest tests..."
    }

    protected packageArtifact(): void {
        // TODO: Print "  Packaging as Python wheel..."
    }

    // deploy() not overridden — uses default
}

// console.log("=== Java Build ===");
// new JavaBuildPipeline().runBuild();

// console.log();

// console.log("=== Python Build ===");
// new PythonBuildPipeline().runBuild();
```

#### Solutions

```java
abstract class BuildPipeline {
    public final void runBuild() {
        fetchSource();
        compileSources();
        runTests();
        packageArtifact();
        deploy();
        notifyTeam();
    }

    private void fetchSource() {
        System.out.println("  Fetching source from repository...");
    }

    protected abstract void compileSources();
    protected abstract void runTests();
    protected abstract void packageArtifact();

    protected void deploy() { // Hook
        System.out.println("  Skipping deployment (not configured).");
    }

    private void notifyTeam() {
        System.out.println("  Notifying team: Build complete!");
    }
}

class JavaBuildPipeline extends BuildPipeline {
    @Override
    protected void compileSources() {
        System.out.println("  Compiling Java sources with javac...");
    }

    @Override
    protected void runTests() {
        System.out.println("  Running JUnit tests...");
    }

    @Override
    protected void packageArtifact() {
        System.out.println("  Packaging as JAR file...");
    }

    @Override
    protected void deploy() {
        System.out.println("  Deploying JAR to Nexus repository...");
    }
}

class PythonBuildPipeline extends BuildPipeline {
    @Override
    protected void compileSources() {
        System.out.println("  Running pylint static analysis (no compilation needed)...");
    }

    @Override
    protected void runTests() {
        System.out.println("  Running pytest tests...");
    }

    @Override
    protected void packageArtifact() {
        System.out.println("  Packaging as Python wheel...");
    }
}

public class Main {
    public static void main(String[] args) {
        BuildPipeline javaBuild = new JavaBuildPipeline();
        System.out.println("=== Java Build ===");
        javaBuild.runBuild();

        System.out.println();

        BuildPipeline pythonBuild = new PythonBuildPipeline();
        System.out.println("=== Python Build ===");
        pythonBuild.runBuild();
    }
}
```

```python
from abc import ABC, abstractmethod

class BuildPipeline(ABC):
    def run_build(self):
        self._fetch_source()
        self.compile_sources()
        self.run_tests()
        self.package_artifact()
        self.deploy()
        self._notify_team()

    def _fetch_source(self):
        print("  Fetching source from repository...")

    @abstractmethod
    def compile_sources(self):
        pass

    @abstractmethod
    def run_tests(self):
        pass

    @abstractmethod
    def package_artifact(self):
        pass

    def deploy(self):  # Hook
        print("  Skipping deployment (not configured).")

    def _notify_team(self):
        print("  Notifying team: Build complete!")

class JavaBuildPipeline(BuildPipeline):
    def compile_sources(self):
        print("  Compiling Java sources with javac...")

    def run_tests(self):
        print("  Running JUnit tests...")

    def package_artifact(self):
        print("  Packaging as JAR file...")

    def deploy(self):
        print("  Deploying JAR to Nexus repository...")

class PythonBuildPipeline(BuildPipeline):
    def compile_sources(self):
        print("  Running pylint static analysis (no compilation needed)...")

    def run_tests(self):
        print("  Running pytest tests...")

    def package_artifact(self):
        print("  Packaging as Python wheel...")

if __name__ == "__main__":
    print("=== Java Build ===")
    JavaBuildPipeline().run_build()

    print()

    print("=== Python Build ===")
    PythonBuildPipeline().run_build()
```

```cpp
#include <iostream>
using namespace std;

class BuildPipeline {
public:
    virtual ~BuildPipeline() = default;

    void runBuild() {
        fetchSource();
        compileSources();
        runTests();
        packageArtifact();
        deploy();
        notifyTeam();
    }

protected:
    virtual void compileSources() = 0;
    virtual void runTests() = 0;
    virtual void packageArtifact() = 0;
    virtual void deploy() {
        cout << "  Skipping deployment (not configured)." << endl;
    }

private:
    void fetchSource() {
        cout << "  Fetching source from repository..." << endl;
    }
    void notifyTeam() {
        cout << "  Notifying team: Build complete!" << endl;
    }
};

class JavaBuildPipeline : public BuildPipeline {
protected:
    void compileSources() override {
        cout << "  Compiling Java sources with javac..." << endl;
    }
    void runTests() override {
        cout << "  Running JUnit tests..." << endl;
    }
    void packageArtifact() override {
        cout << "  Packaging as JAR file..." << endl;
    }
    void deploy() override {
        cout << "  Deploying JAR to Nexus repository..." << endl;
    }
};

class PythonBuildPipeline : public BuildPipeline {
protected:
    void compileSources() override {
        cout << "  Running pylint static analysis (no compilation needed)..." << endl;
    }
    void runTests() override {
        cout << "  Running pytest tests..." << endl;
    }
    void packageArtifact() override {
        cout << "  Packaging as Python wheel..." << endl;
    }
};

int main() {
    JavaBuildPipeline javaBuild;
    cout << "=== Java Build ===" << endl;
    javaBuild.runBuild();

    cout << endl;

    PythonBuildPipeline pythonBuild;
    cout << "=== Python Build ===" << endl;
    pythonBuild.runBuild();

    return 0;
}
```

```go
package main

import "fmt"

type BuildPipeline interface {
	RunBuild()
}

type buildPipelineBase struct {
	compileSources func()
	runTests       func()
	packageArtifact func()
	deploy         func()
}

func (b *buildPipelineBase) runBuild() {
	b.fetchSource()
	b.compileSources()
	b.runTests()
	b.packageArtifact()
	b.deploy()
	b.notifyTeam()
}

func (b *buildPipelineBase) fetchSource() {
	fmt.Println("  Fetching source from repository...")
}

func (b *buildPipelineBase) notifyTeam() {
	fmt.Println("  Notifying team: Build complete!")
}

type JavaBuildPipeline struct {
	buildPipelineBase
}

func NewJavaBuildPipeline() *JavaBuildPipeline {
	p := &JavaBuildPipeline{}
	p.compileSources = p.compileSourcesImpl
	p.runTests = p.runTestsImpl
	p.packageArtifact = p.packageArtifactImpl
	p.deploy = p.deployImpl
	p.buildPipelineBase.deploy = func() {
		fmt.Println("  Deploying JAR to Nexus repository...")
	}
	p.buildPipelineBase.compileSources = p.compileSourcesImpl
	p.buildPipelineBase.runTests = p.runTestsImpl
	p.buildPipelineBase.packageArtifact = p.packageArtifactImpl
	p.buildPipelineBase.deploy = p.deployImpl
	return p
}

func (p *JavaBuildPipeline) RunBuild() {
	p.buildPipelineBase.runBuild()
}

func (p *JavaBuildPipeline) compileSourcesImpl() {
	fmt.Println("  Compiling Java sources with javac...")
}

func (p *JavaBuildPipeline) runTestsImpl() {
	fmt.Println("  Running JUnit tests...")
}

func (p *JavaBuildPipeline) packageArtifactImpl() {
	fmt.Println("  Packaging as JAR file...")
}

func (p *JavaBuildPipeline) deployImpl() {
	fmt.Println("  Deploying JAR to Nexus repository...")
}

type PythonBuildPipeline struct {
	buildPipelineBase
}

func NewPythonBuildPipeline() *PythonBuildPipeline {
	p := &PythonBuildPipeline{}
	p.compileSources = p.compileSourcesImpl
	p.runTests = p.runTestsImpl
	p.packageArtifact = p.packageArtifactImpl
	p.deploy = p.deployImpl
	p.buildPipelineBase.compileSources = p.compileSourcesImpl
	p.buildPipelineBase.runTests = p.runTestsImpl
	p.buildPipelineBase.packageArtifact = p.packageArtifactImpl
	p.buildPipelineBase.deploy = p.deployImpl
	return p
}

func (p *PythonBuildPipeline) RunBuild() {
	p.buildPipelineBase.runBuild()
}

func (p *PythonBuildPipeline) compileSourcesImpl() {
	fmt.Println("  Running pylint static analysis (no compilation needed)...")
}

func (p *PythonBuildPipeline) runTestsImpl() {
	fmt.Println("  Running pytest tests...")
}

func (p *PythonBuildPipeline) packageArtifactImpl() {
	fmt.Println("  Packaging as Python wheel...")
}

func (p *PythonBuildPipeline) deployImpl() {
	fmt.Println("  Skipping deployment (not configured).")
}

func main() {
	javaBuild := NewJavaBuildPipeline()
	fmt.Println("=== Java Build ===")
	javaBuild.RunBuild()

	fmt.Println()

	pythonBuild := NewPythonBuildPipeline()
	fmt.Println("=== Python Build ===")
	pythonBuild.RunBuild()
}
```

```csharp
using System;

abstract class BuildPipeline
{
    public void RunBuild()
    {
        FetchSource();
        CompileSources();
        RunTests();
        PackageArtifact();
        Deploy();
        NotifyTeam();
    }

    private void FetchSource()
    {
        Console.WriteLine("  Fetching source from repository...");
    }

    protected abstract void CompileSources();
    protected abstract void RunTests();
    protected abstract void PackageArtifact();

    protected virtual void Deploy()
    {
        Console.WriteLine("  Skipping deployment (not configured).");
    }

    private void NotifyTeam()
    {
        Console.WriteLine("  Notifying team: Build complete!");
    }
}

class JavaBuildPipeline : BuildPipeline
{
    protected override void CompileSources()
    {
        Console.WriteLine("  Compiling Java sources with javac...");
    }

    protected override void RunTests()
    {
        Console.WriteLine("  Running JUnit tests...");
    }

    protected override void PackageArtifact()
    {
        Console.WriteLine("  Packaging as JAR file...");
    }

    protected override void Deploy()
    {
        Console.WriteLine("  Deploying JAR to Nexus repository...");
    }
}

class PythonBuildPipeline : BuildPipeline
{
    protected override void CompileSources()
    {
        Console.WriteLine("  Running pylint static analysis (no compilation needed)...");
    }

    protected override void RunTests()
    {
        Console.WriteLine("  Running pytest tests...");
    }

    protected override void PackageArtifact()
    {
        Console.WriteLine("  Packaging as Python wheel...");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("=== Java Build ===");
        new JavaBuildPipeline().RunBuild();

        Console.WriteLine();

        Console.WriteLine("=== Python Build ===");
        new PythonBuildPipeline().RunBuild();
    }
}
```

```typescript
abstract class BuildPipeline {
    public runBuild(): void {
        this.fetchSource();
        this.compileSources();
        this.runTests();
        this.packageArtifact();
        this.deploy();
        this.notifyTeam();
    }

    private fetchSource(): void {
        console.log("  Fetching source from repository...");
    }

    protected abstract compileSources(): void;
    protected abstract runTests(): void;
    protected abstract packageArtifact(): void;

    protected deploy(): void {
        console.log("  Skipping deployment (not configured).");
    }

    private notifyTeam(): void {
        console.log("  Notifying team: Build complete!");
    }
}

class JavaBuildPipeline extends BuildPipeline {
    protected compileSources(): void {
        console.log("  Compiling Java sources with javac...");
    }

    protected runTests(): void {
        console.log("  Running JUnit tests...");
    }

    protected packageArtifact(): void {
        console.log("  Packaging as JAR file...");
    }

    protected deploy(): void {
        console.log("  Deploying JAR to Nexus repository...");
    }
}

class PythonBuildPipeline extends BuildPipeline {
    protected compileSources(): void {
        console.log("  Running pylint static analysis (no compilation needed)...");
    }

    protected runTests(): void {
        console.log("  Running pytest tests...");
    }

    protected packageArtifact(): void {
        console.log("  Packaging as Python wheel...");
    }
}

console.log("=== Java Build ===");
new JavaBuildPipeline().runBuild();

console.log();

console.log("=== Python Build ===");
new PythonBuildPipeline().runBuild();
```


