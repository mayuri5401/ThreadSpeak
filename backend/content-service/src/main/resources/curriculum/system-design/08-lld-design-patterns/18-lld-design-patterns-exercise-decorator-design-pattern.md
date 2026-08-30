---
id: "lld-design-patterns-exercise-decorator-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Decorator Design Pattern"
slug: "lld-design-patterns-exercise-decorator-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Decorator Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Decorator Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Pizza Topping System

**Problem:** Build a pizza ordering system where customers can add toppings to a base pizza. Each topping adds to the cost and description.

**Requirements:**

- Component interface: `Pizza` with `getCost()` returning a double and `getDescription()` returning a String
- ConcreteComponent: `PlainPizza` with a base cost of $5.00 and description "Plain pizza"
- Decorators: `CheeseDecorator` (+$1.50), `PepperoniDecorator` (+$2.00), `MushroomDecorator` (+$1.00)
- Each decorator appends its topping name to the description

```java
interface Pizza {
    double getCost();
    String getDescription();
}

class PlainPizza implements Pizza {
    @Override
    public double getCost() {
        return 5.00;
    }

    @Override
    public String getDescription() {
        return "Plain pizza";
    }
}

abstract class PizzaDecorator implements Pizza {
    // TODO: Add a protected field to store the wrapped Pizza reference

    public PizzaDecorator(Pizza pizza) {
        // TODO: Store the wrapped pizza
    }

    @Override
    public double getCost() {
        // TODO: Delegate to the wrapped pizza's getCost()
        return 0;
    }

    @Override
    public String getDescription() {
        // TODO: Delegate to the wrapped pizza's getDescription()
        return "";
    }
}

class CheeseDecorator extends PizzaDecorator {
    public CheeseDecorator(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getCost() {
        // TODO: Return the wrapped pizza's cost + 1.50
        return 0;
    }

    @Override
    public String getDescription() {
        // TODO: Return the wrapped pizza's description + ", cheese"
        return "";
    }
}

class OliveDecorator extends PizzaDecorator {
    public OliveDecorator(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getCost() {
        // TODO: Return the wrapped pizza's cost + 2.00
        return 0;
    }

    @Override
    public String getDescription() {
        // TODO: Return the wrapped pizza's description + ", olives"
        return "";
    }
}

class MushroomDecorator extends PizzaDecorator {
    public MushroomDecorator(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getCost() {
        // TODO: Return the wrapped pizza's cost + 1.00
        return 0;
    }

    @Override
    public String getDescription() {
        // TODO: Return the wrapped pizza's description + ", mushrooms"
        return "";
    }
}

public class Main {
    public static void main(String[] args) {
        Pizza plain = new PlainPizza();
        System.out.printf("%s | $%.2f%n", plain.getDescription(), plain.getCost());

        // Pizza cheeseOlive = new OliveDecorator(new CheeseDecorator(new PlainPizza()));
        // System.out.printf("%s | $%.2f%n", cheeseOlive.getDescription(), cheeseOlive.getCost());

        // Pizza loaded = new MushroomDecorator(
        //     new OliveDecorator(new CheeseDecorator(new PlainPizza())));
        // System.out.printf("%s | $%.2f%n", loaded.getDescription(), loaded.getCost());
    }
}
```

```python
from abc import ABC, abstractmethod

class Pizza(ABC):
    @abstractmethod
    def get_cost(self) -> float:
        pass

    @abstractmethod
    def get_description(self) -> str:
        pass

class PlainPizza(Pizza):
    def get_cost(self) -> float:
        return 5.00

    def get_description(self) -> str:
        return "Plain pizza"

class PizzaDecorator(Pizza):
    def __init__(self, pizza: Pizza):
        # TODO: Store the wrapped pizza
        pass

    def get_cost(self) -> float:
        # TODO: Delegate to the wrapped pizza's get_cost()
        return 0

    def get_description(self) -> str:
        # TODO: Delegate to the wrapped pizza's get_description()
        return ""

class CheeseDecorator(PizzaDecorator):
    def __init__(self, pizza: Pizza):
        # TODO: Call the parent constructor
        pass

    def get_cost(self) -> float:
        # TODO: Return the wrapped pizza's cost + 1.50
        return 0

    def get_description(self) -> str:
        # TODO: Return the wrapped pizza's description + ", cheese"
        return ""

class OliveDecorator(PizzaDecorator):
    def __init__(self, pizza: Pizza):
        # TODO: Call the parent constructor
        pass

    def get_cost(self) -> float:
        # TODO: Return the wrapped pizza's cost + 2.00
        return 0

    def get_description(self) -> str:
        # TODO: Return the wrapped pizza's description + ", olives"
        return ""

class MushroomDecorator(PizzaDecorator):
    def __init__(self, pizza: Pizza):
        # TODO: Call the parent constructor
        pass

    def get_cost(self) -> float:
        # TODO: Return the wrapped pizza's cost + 1.00
        return 0

    def get_description(self) -> str:
        # TODO: Return the wrapped pizza's description + ", mushrooms"
        return ""

if __name__ == "__main__":
    plain = PlainPizza()
    print(f"{plain.get_description()} | ${plain.get_cost():.2f}")

    # cheese_olive = OliveDecorator(CheeseDecorator(PlainPizza()))
    # print(f"{cheese_olive.get_description()} | ${cheese_olive.get_cost():.2f}")

    # loaded = MushroomDecorator(OliveDecorator(CheeseDecorator(PlainPizza())))
    # print(f"{loaded.get_description()} | ${loaded.get_cost():.2f}")
```

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;

class Pizza {
public:
    virtual double getCost() = 0;
    virtual string getDescription() = 0;
    virtual ~Pizza() {}
};

class PlainPizza : public Pizza {
public:
    double getCost() override { return 5.00; }
    string getDescription() override { return "Plain pizza"; }
};

class PizzaDecorator : public Pizza {
protected:
    // TODO: Add a Pizza* field to store the wrapped pizza
public:
    PizzaDecorator(Pizza* pizza) {
        // TODO: Store the wrapped pizza pointer
    }

    double getCost() override {
        // TODO: Delegate to the wrapped pizza's getCost()
        return 0;
    }

    string getDescription() override {
        // TODO: Delegate to the wrapped pizza's getDescription()
        return "";
    }
};

class CheeseDecorator : public PizzaDecorator {
public:
    CheeseDecorator(Pizza* pizza) : PizzaDecorator(pizza) {}

    double getCost() override {
        // TODO: Return the wrapped pizza's cost + 1.50
        return 0;
    }

    string getDescription() override {
        // TODO: Return the wrapped pizza's description + ", cheese"
        return "";
    }
};

class OliveDecorator : public PizzaDecorator {
public:
    OliveDecorator(Pizza* pizza) : PizzaDecorator(pizza) {}

    double getCost() override {
        // TODO: Return the wrapped pizza's cost + 2.00
        return 0;
    }

    string getDescription() override {
        // TODO: Return the wrapped pizza's description + ", olives"
        return "";
    }
};

class MushroomDecorator : public PizzaDecorator {
public:
    MushroomDecorator(Pizza* pizza) : PizzaDecorator(pizza) {}

    double getCost() override {
        // TODO: Return the wrapped pizza's cost + 1.00
        return 0;
    }

    string getDescription() override {
        // TODO: Return the wrapped pizza's description + ", mushrooms"
        return "";
    }
};

int main() {
    PlainPizza plain;
    printf("%s | $%.2f\n", plain.getDescription().c_str(), plain.getCost());

    // PlainPizza p2;
    // CheeseDecorator cheese(&p2);
    // OliveDecorator cheeseOlive(&cheese);
    // printf("%s | $%.2f\n", cheeseOlive.getDescription().c_str(), cheeseOlive.getCost());

    // PlainPizza p3;
    // CheeseDecorator c3(&p3);
    // OliveDecorator o3(&c3);
    // MushroomDecorator loaded(&o3);
    // printf("%s | $%.2f\n", loaded.getDescription().c_str(), loaded.getCost());
    return 0;
}
```

```go
package main

import "fmt"

type Pizza interface {
	GetCost() float64
	GetDescription() string
}

type PlainPizza struct{}

func (p *PlainPizza) GetCost() float64 {
	return 5.00
}

func (p *PlainPizza) GetDescription() string {
	return "Plain pizza"
}

type PizzaDecorator struct {
	// TODO: Add a field to store the wrapped Pizza reference
	pizza Pizza
}

func NewPizzaDecorator(pizza Pizza) *PizzaDecorator {
	// TODO: Store the wrapped pizza
	return &PizzaDecorator{pizza: pizza}
}

func (p *PizzaDecorator) GetCost() float64 {
	// TODO: Delegate to the wrapped pizza's GetCost()
	return 0
}

func (p *PizzaDecorator) GetDescription() string {
	// TODO: Delegate to the wrapped pizza's GetDescription()
	return ""
}

type CheeseDecorator struct {
	*PizzaDecorator
}

func NewCheeseDecorator(pizza Pizza) *CheeseDecorator {
	return &CheeseDecorator{PizzaDecorator: NewPizzaDecorator(pizza)}
}

func (c *CheeseDecorator) GetCost() float64 {
	// TODO: Return the wrapped pizza's cost + 1.50
	return 0
}

func (c *CheeseDecorator) GetDescription() string {
	// TODO: Return the wrapped pizza's description + ", cheese"
	return ""
}

type OliveDecorator struct {
	*PizzaDecorator
}

func NewOliveDecorator(pizza Pizza) *OliveDecorator {
	return &OliveDecorator{PizzaDecorator: NewPizzaDecorator(pizza)}
}

func (o *OliveDecorator) GetCost() float64 {
	// TODO: Return the wrapped pizza's cost + 2.00
	return 0
}

func (o *OliveDecorator) GetDescription() string {
	// TODO: Return the wrapped pizza's description + ", olives"
	return ""
}

type MushroomDecorator struct {
	*PizzaDecorator
}

func NewMushroomDecorator(pizza Pizza) *MushroomDecorator {
	return &MushroomDecorator{PizzaDecorator: NewPizzaDecorator(pizza)}
}

func (m *MushroomDecorator) GetCost() float64 {
	// TODO: Return the wrapped pizza's cost + 1.00
	return 0
}

func (m *MushroomDecorator) GetDescription() string {
	// TODO: Return the wrapped pizza's description + ", mushrooms"
	return ""
}

func main() {
	plain := &PlainPizza{}
	fmt.Printf("%s | $%.2f\n", plain.GetDescription(), plain.GetCost())

	// cheeseOlive := NewOliveDecorator(NewCheeseDecorator(&PlainPizza{}))
	// fmt.Printf("%s | $%.2f\n", cheeseOlive.GetDescription(), cheeseOlive.GetCost())

	// loaded := NewMushroomDecorator(
	// 	NewOliveDecorator(NewCheeseDecorator(&PlainPizza{})))
	// fmt.Printf("%s | $%.2f\n", loaded.GetDescription(), loaded.GetCost())
}
```

```csharp
using System;

interface IPizza
{
    double GetCost();
    string GetDescription();
}

class PlainPizza : IPizza
{
    public double GetCost() => 5.00;
    public string GetDescription() => "Plain pizza";
}

abstract class PizzaDecorator : IPizza
{
    // TODO: Add a protected IPizza field to store the wrapped pizza

    protected PizzaDecorator(IPizza pizza)
    {
        // TODO: Store the wrapped pizza
    }

    public virtual double GetCost()
    {
        // TODO: Delegate to the wrapped pizza's GetCost()
        return 0;
    }

    public virtual string GetDescription()
    {
        // TODO: Delegate to the wrapped pizza's GetDescription()
        return "";
    }
}

class CheeseDecorator : PizzaDecorator
{
    public CheeseDecorator(IPizza pizza) : base(pizza) {}

    public override double GetCost()
    {
        // TODO: Return the wrapped pizza's cost + 1.50
        return 0;
    }

    public override string GetDescription()
    {
        // TODO: Return the wrapped pizza's description + ", cheese"
        return "";
    }
}

class OliveDecorator : PizzaDecorator
{
    public OliveDecorator(IPizza pizza) : base(pizza) {}

    public override double GetCost()
    {
        // TODO: Return the wrapped pizza's cost + 2.00
        return 0;
    }

    public override string GetDescription()
    {
        // TODO: Return the wrapped pizza's description + ", olives"
        return "";
    }
}

class MushroomDecorator : PizzaDecorator
{
    public MushroomDecorator(IPizza pizza) : base(pizza) {}

    public override double GetCost()
    {
        // TODO: Return the wrapped pizza's cost + 1.00
        return 0;
    }

    public override string GetDescription()
    {
        // TODO: Return the wrapped pizza's description + ", mushrooms"
        return "";
    }
}

class Program
{
    public static void Main()
    {
        IPizza plain = new PlainPizza();
        Console.WriteLine($"{plain.GetDescription()} | ${plain.GetCost():F2}");

        // IPizza cheeseOlive = new OliveDecorator(new CheeseDecorator(new PlainPizza()));
        // Console.WriteLine($"{cheeseOlive.GetDescription()} | ${cheeseOlive.GetCost():F2}");

        // IPizza loaded = new MushroomDecorator(
        //     new OliveDecorator(new CheeseDecorator(new PlainPizza())));
        // Console.WriteLine($"{loaded.GetDescription()} | ${loaded.GetCost():F2}");
    }
}
```

```typescript
interface Pizza {
    getCost(): number;
    getDescription(): string;
}

class PlainPizza implements Pizza {
    getCost(): number { return 5.00; }
    getDescription(): string { return "Plain pizza"; }
}

abstract class PizzaDecorator implements Pizza {
    // TODO: Add a protected field to store the wrapped Pizza reference

    constructor(pizza: Pizza) {
        // TODO: Store the wrapped pizza
    }

    getCost(): number {
        // TODO: Delegate to the wrapped pizza's getCost()
        return 0;
    }

    getDescription(): string {
        // TODO: Delegate to the wrapped pizza's getDescription()
        return "";
    }
}

class CheeseDecorator extends PizzaDecorator {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    getCost(): number {
        // TODO: Return the wrapped pizza's cost + 1.50
        return 0;
    }

    getDescription(): string {
        // TODO: Return the wrapped pizza's description + ", cheese"
        return "";
    }
}

class OliveDecorator extends PizzaDecorator {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    getCost(): number {
        // TODO: Return the wrapped pizza's cost + 2.00
        return 0;
    }

    getDescription(): string {
        // TODO: Return the wrapped pizza's description + ", olives"
        return "";
    }
}

class MushroomDecorator extends PizzaDecorator {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    getCost(): number {
        // TODO: Return the wrapped pizza's cost + 1.00
        return 0;
    }

    getDescription(): string {
        // TODO: Return the wrapped pizza's description + ", mushrooms"
        return "";
    }
}

const plain: Pizza = new PlainPizza();
console.log(`${plain.getDescription()} | $${plain.getCost().toFixed(2)}`);

// const cheeseOlive: Pizza = new OliveDecorator(new CheeseDecorator(new PlainPizza()));
// console.log(`${cheeseOlive.getDescription()} | $${cheeseOlive.getCost().toFixed(2)}`);

// const loaded: Pizza = new MushroomDecorator(
//     new OliveDecorator(new CheeseDecorator(new PlainPizza())));
// console.log(`${loaded.getDescription()} | $${loaded.getCost().toFixed(2)}`);
```

#### Solutions

```java
interface Pizza {
    double getCost();
    String getDescription();
}

class PlainPizza implements Pizza {
    @Override
    public double getCost() {
        return 5.00;
    }

    @Override
    public String getDescription() {
        return "Plain pizza";
    }
}

abstract class PizzaDecorator implements Pizza {
    protected Pizza pizza;

    public PizzaDecorator(Pizza pizza) {
        this.pizza = pizza;
    }

    @Override
    public double getCost() {
        return pizza.getCost();
    }

    @Override
    public String getDescription() {
        return pizza.getDescription();
    }
}

class CheeseDecorator extends PizzaDecorator {
    public CheeseDecorator(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getCost() {
        return pizza.getCost() + 1.50;
    }

    @Override
    public String getDescription() {
        return pizza.getDescription() + ", cheese";
    }
}

class OliveDecorator extends PizzaDecorator {
    public OliveDecorator(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getCost() {
        return pizza.getCost() + 2.00;
    }

    @Override
    public String getDescription() {
        return pizza.getDescription() + ", olives";
    }
}

class MushroomDecorator extends PizzaDecorator {
    public MushroomDecorator(Pizza pizza) {
        super(pizza);
    }

    @Override
    public double getCost() {
        return pizza.getCost() + 1.00;
    }

    @Override
    public String getDescription() {
        return pizza.getDescription() + ", mushrooms";
    }
}

public class Main {
    public static void main(String[] args) {
        Pizza plain = new PlainPizza();
        System.out.printf("%s | $%.2f%n", plain.getDescription(), plain.getCost());

        Pizza cheeseOlive = new OliveDecorator(new CheeseDecorator(new PlainPizza()));
        System.out.printf("%s | $%.2f%n", cheeseOlive.getDescription(), cheeseOlive.getCost());

        Pizza loaded = new MushroomDecorator(
            new OliveDecorator(new CheeseDecorator(new PlainPizza())));
        System.out.printf("%s | $%.2f%n", loaded.getDescription(), loaded.getCost());
    }
}
```

```python
from abc import ABC, abstractmethod

class Pizza(ABC):
    @abstractmethod
    def get_cost(self) -> float:
        pass

    @abstractmethod
    def get_description(self) -> str:
        pass

class PlainPizza(Pizza):
    def get_cost(self) -> float:
        return 5.00

    def get_description(self) -> str:
        return "Plain pizza"

class PizzaDecorator(Pizza):
    def __init__(self, pizza: Pizza):
        self._pizza = pizza

    def get_cost(self) -> float:
        return self._pizza.get_cost()

    def get_description(self) -> str:
        return self._pizza.get_description()

class CheeseDecorator(PizzaDecorator):
    def __init__(self, pizza: Pizza):
        super().__init__(pizza)

    def get_cost(self) -> float:
        return self._pizza.get_cost() + 1.50

    def get_description(self) -> str:
        return self._pizza.get_description() + ", cheese"

class OliveDecorator(PizzaDecorator):
    def __init__(self, pizza: Pizza):
        super().__init__(pizza)

    def get_cost(self) -> float:
        return self._pizza.get_cost() + 2.00

    def get_description(self) -> str:
        return self._pizza.get_description() + ", olives"

class MushroomDecorator(PizzaDecorator):
    def __init__(self, pizza: Pizza):
        super().__init__(pizza)

    def get_cost(self) -> float:
        return self._pizza.get_cost() + 1.00

    def get_description(self) -> str:
        return self._pizza.get_description() + ", mushrooms"

if __name__ == "__main__":
    plain = PlainPizza()
    print(f"{plain.get_description()} | ${plain.get_cost():.2f}")

    cheese_olive = OliveDecorator(CheeseDecorator(PlainPizza()))
    print(f"{cheese_olive.get_description()} | ${cheese_olive.get_cost():.2f}")

    loaded = MushroomDecorator(OliveDecorator(CheeseDecorator(PlainPizza())))
    print(f"{loaded.get_description()} | ${loaded.get_cost():.2f}")
```

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;

class Pizza {
public:
    virtual double getCost() = 0;
    virtual string getDescription() = 0;
    virtual ~Pizza() {}
};

class PlainPizza : public Pizza {
public:
    double getCost() override { return 5.00; }
    string getDescription() override { return "Plain pizza"; }
};

class PizzaDecorator : public Pizza {
protected:
    Pizza* pizza;
public:
    PizzaDecorator(Pizza* pizza) : pizza(pizza) {}

    double getCost() override {
        return pizza->getCost();
    }

    string getDescription() override {
        return pizza->getDescription();
    }
};

class CheeseDecorator : public PizzaDecorator {
public:
    CheeseDecorator(Pizza* pizza) : PizzaDecorator(pizza) {}

    double getCost() override {
        return pizza->getCost() + 1.50;
    }

    string getDescription() override {
        return pizza->getDescription() + ", cheese";
    }
};

class OliveDecorator : public PizzaDecorator {
public:
    OliveDecorator(Pizza* pizza) : PizzaDecorator(pizza) {}

    double getCost() override {
        return pizza->getCost() + 2.00;
    }

    string getDescription() override {
        return pizza->getDescription() + ", olives";
    }
};

class MushroomDecorator : public PizzaDecorator {
public:
    MushroomDecorator(Pizza* pizza) : PizzaDecorator(pizza) {}

    double getCost() override {
        return pizza->getCost() + 1.00;
    }

    string getDescription() override {
        return pizza->getDescription() + ", mushrooms";
    }
};

int main() {
    PlainPizza plain;
    printf("%s | $%.2f\n", plain.getDescription().c_str(), plain.getCost());

    CheeseDecorator cheese(&plain);
    OliveDecorator cheeseOlive(&cheese);
    printf("%s | $%.2f\n", cheeseOlive.getDescription().c_str(), cheeseOlive.getCost());

    PlainPizza plain2;
    CheeseDecorator cheese2(&plain2);
    OliveDecorator olive2(&cheese2);
    MushroomDecorator loaded(&olive2);
    printf("%s | $%.2f\n", loaded.getDescription().c_str(), loaded.getCost());
    return 0;
}
```

```go
package main

import "fmt"

type Pizza interface {
	GetCost() float64
	GetDescription() string
}

type PlainPizza struct{}

func (p *PlainPizza) GetCost() float64 {
	return 5.00
}

func (p *PlainPizza) GetDescription() string {
	return "Plain pizza"
}

type PizzaDecorator struct {
	pizza Pizza
}

func (d *PizzaDecorator) GetCost() float64 {
	return d.pizza.GetCost()
}

func (d *PizzaDecorator) GetDescription() string {
	return d.pizza.GetDescription()
}

type CheeseDecorator struct {
	PizzaDecorator
}

func NewCheeseDecorator(pizza Pizza) *CheeseDecorator {
	return &CheeseDecorator{PizzaDecorator{pizza: pizza}}
}

func (d *CheeseDecorator) GetCost() float64 {
	return d.pizza.GetCost() + 1.50
}

func (d *CheeseDecorator) GetDescription() string {
	return d.pizza.GetDescription() + ", cheese"
}

type OliveDecorator struct {
	PizzaDecorator
}

func NewOliveDecorator(pizza Pizza) *OliveDecorator {
	return &OliveDecorator{PizzaDecorator{pizza: pizza}}
}

func (d *OliveDecorator) GetCost() float64 {
	return d.pizza.GetCost() + 2.00
}

func (d *OliveDecorator) GetDescription() string {
	return d.pizza.GetDescription() + ", olives"
}

type MushroomDecorator struct {
	PizzaDecorator
}

func NewMushroomDecorator(pizza Pizza) *MushroomDecorator {
	return &MushroomDecorator{PizzaDecorator{pizza: pizza}}
}

func (d *MushroomDecorator) GetCost() float64 {
	return d.pizza.GetCost() + 1.00
}

func (d *MushroomDecorator) GetDescription() string {
	return d.pizza.GetDescription() + ", mushrooms"
}

func main() {
	var plain Pizza = &PlainPizza{}
	fmt.Printf("%s | $%.2f\n", plain.GetDescription(), plain.GetCost())

	cheeseOlive := NewOliveDecorator(NewCheeseDecorator(&PlainPizza{}))
	fmt.Printf("%s | $%.2f\n", cheeseOlive.GetDescription(), cheeseOlive.GetCost())

	loaded := NewMushroomDecorator(NewOliveDecorator(NewCheeseDecorator(&PlainPizza{})))
	fmt.Printf("%s | $%.2f\n", loaded.GetDescription(), loaded.GetCost())
}
```

```csharp
using System;

interface IPizza
{
    double GetCost();
    string GetDescription();
}

class PlainPizza : IPizza
{
    public double GetCost() => 5.00;
    public string GetDescription() => "Plain pizza";
}

abstract class PizzaDecorator : IPizza
{
    protected IPizza pizza;

    protected PizzaDecorator(IPizza pizza)
    {
        this.pizza = pizza;
    }

    public virtual double GetCost()
    {
        return pizza.GetCost();
    }

    public virtual string GetDescription()
    {
        return pizza.GetDescription();
    }
}

class CheeseDecorator : PizzaDecorator
{
    public CheeseDecorator(IPizza pizza) : base(pizza) {}

    public override double GetCost()
    {
        return pizza.GetCost() + 1.50;
    }

    public override string GetDescription()
    {
        return pizza.GetDescription() + ", cheese";
    }
}

class OliveDecorator : PizzaDecorator
{
    public OliveDecorator(IPizza pizza) : base(pizza) {}

    public override double GetCost()
    {
        return pizza.GetCost() + 2.00;
    }

    public override string GetDescription()
    {
        return pizza.GetDescription() + ", olives";
    }
}

class MushroomDecorator : PizzaDecorator
{
    public MushroomDecorator(IPizza pizza) : base(pizza) {}

    public override double GetCost()
    {
        return pizza.GetCost() + 1.00;
    }

    public override string GetDescription()
    {
        return pizza.GetDescription() + ", mushrooms";
    }
}

public class Program
{
    public static void Main()
    {
        IPizza plain = new PlainPizza();
        Console.WriteLine($"{plain.GetDescription()} | ${plain.GetCost():F2}");

        IPizza cheeseOlive = new OliveDecorator(new CheeseDecorator(new PlainPizza()));
        Console.WriteLine($"{cheeseOlive.GetDescription()} | ${cheeseOlive.GetCost():F2}");

        IPizza loaded = new MushroomDecorator(
            new OliveDecorator(new CheeseDecorator(new PlainPizza())));
        Console.WriteLine($"{loaded.GetDescription()} | ${loaded.GetCost():F2}");
    }
}
```

```typescript
interface Pizza {
    getCost(): number;
    getDescription(): string;
}

class PlainPizza implements Pizza {
    getCost(): number { return 5.00; }
    getDescription(): string { return "Plain pizza"; }
}

abstract class PizzaDecorator implements Pizza {
    protected pizza: Pizza;

    constructor(pizza: Pizza) {
        this.pizza = pizza;
    }

    getCost(): number {
        return this.pizza.getCost();
    }

    getDescription(): string {
        return this.pizza.getDescription();
    }
}

class CheeseDecorator extends PizzaDecorator {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    getCost(): number {
        return this.pizza.getCost() + 1.50;
    }

    getDescription(): string {
        return this.pizza.getDescription() + ", cheese";
    }
}

class OliveDecorator extends PizzaDecorator {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    getCost(): number {
        return this.pizza.getCost() + 2.00;
    }

    getDescription(): string {
        return this.pizza.getDescription() + ", olives";
    }
}

class MushroomDecorator extends PizzaDecorator {
    constructor(pizza: Pizza) {
        super(pizza);
    }

    getCost(): number {
        return this.pizza.getCost() + 1.00;
    }

    getDescription(): string {
        return this.pizza.getDescription() + ", mushrooms";
    }
}

const plain: Pizza = new PlainPizza();
console.log(`${plain.getDescription()} | $${plain.getCost().toFixed(2)}`);

const cheeseOlive: Pizza = new OliveDecorator(new CheeseDecorator(new PlainPizza()));
console.log(`${cheeseOlive.getDescription()} | $${cheeseOlive.getCost().toFixed(2)}`);

const loaded: Pizza = new MushroomDecorator(
    new OliveDecorator(new CheeseDecorator(new PlainPizza())));
console.log(`${loaded.getDescription()} | $${loaded.getCost().toFixed(2)}`);
```

---

# Exercise 2: Character Abilities in a Game

> [!PAYWALL] This content is for premium members only.

**Problem:** Build a character ability system for an RPG where equipment decorators modify a character's stats.

**Requirements:**

- Component interface: `Character` with `getAttackPower()`, `getDefense()`, and `getDescription()`
- ConcreteComponent: `BasicCharacter` with 10 attack, 5 defense, description "Basic Character"
- Decorators:
   - `SwordDecorator`: +10 attack, +0 defense, appends " + Sword"
   - `ShieldDecorator`: +0 attack, +15 defense, appends " + Shield"
   - `SpeedBootsDecorator`: +5 attack, +5 defense, appends " + Speed Boots"

```java
interface Character {
    int getAttackPower();
    int getDefense();
    String getDescription();
}

class BasicCharacter implements Character {
    @Override
    public int getAttackPower() { return 10; }

    @Override
    public int getDefense() { return 5; }

    @Override
    public String getDescription() { return "Basic Character"; }
}

abstract class CharacterDecorator implements Character {
    // TODO: Add a protected field to store the wrapped Character reference

    public CharacterDecorator(Character character) {
        // TODO: Store the wrapped character
    }

    @Override
    public int getAttackPower() {
        // TODO: Delegate to the wrapped character's getAttackPower()
        return 0;
    }

    @Override
    public int getDefense() {
        // TODO: Delegate to the wrapped character's getDefense()
        return 0;
    }

    @Override
    public String getDescription() {
        // TODO: Delegate to the wrapped character's getDescription()
        return "";
    }
}

class SwordDecorator extends CharacterDecorator {
    public SwordDecorator(Character character) {
        super(character);
    }

    @Override
    public int getAttackPower() {
        // TODO: Return the wrapped character's attack power + 10
        return 0;
    }

    @Override
    public String getDescription() {
        // TODO: Return the wrapped character's description + " + Sword"
        return "";
    }
}

class ShieldDecorator extends CharacterDecorator {
    public ShieldDecorator(Character character) {
        super(character);
    }

    @Override
    public int getDefense() {
        // TODO: Return the wrapped character's defense + 15
        return 0;
    }

    @Override
    public String getDescription() {
        // TODO: Return the wrapped character's description + " + Shield"
        return "";
    }
}

class SpeedBootsDecorator extends CharacterDecorator {
    public SpeedBootsDecorator(Character character) {
        super(character);
    }

    @Override
    public int getAttackPower() {
        // TODO: Return the wrapped character's attack power + 5
        return 0;
    }

    @Override
    public int getDefense() {
        // TODO: Return the wrapped character's defense + 5
        return 0;
    }

    @Override
    public String getDescription() {
        // TODO: Return the wrapped character's description + " + Speed Boots"
        return "";
    }
}

public class Main {
    public static void main(String[] args) {
        Character hero = new BasicCharacter();
        System.out.printf("%s | ATK: %d | DEF: %d%n",
            hero.getDescription(), hero.getAttackPower(), hero.getDefense());

        // Character warrior = new ShieldDecorator(new SwordDecorator(new BasicCharacter()));
        // System.out.printf("%s | ATK: %d | DEF: %d%n",
        //     warrior.getDescription(), warrior.getAttackPower(), warrior.getDefense());

        // Character fullGear = new SpeedBootsDecorator(
        //     new ShieldDecorator(new SwordDecorator(new BasicCharacter())));
        // System.out.printf("%s | ATK: %d | DEF: %d%n",
        //     fullGear.getDescription(), fullGear.getAttackPower(), fullGear.getDefense());
    }
}
```

```python
from abc import ABC, abstractmethod

class Character(ABC):
    @abstractmethod
    def get_attack_power(self) -> int:
        pass

    @abstractmethod
    def get_defense(self) -> int:
        pass

    @abstractmethod
    def get_description(self) -> str:
        pass

class BasicCharacter(Character):
    def get_attack_power(self) -> int: return 10
    def get_defense(self) -> int: return 5
    def get_description(self) -> str: return "Basic Character"

class CharacterDecorator(Character):
    def __init__(self, character: Character):
        # TODO: Store the wrapped character
        pass

    def get_attack_power(self) -> int:
        # TODO: Delegate to the wrapped character's get_attack_power()
        return 0

    def get_defense(self) -> int:
        # TODO: Delegate to the wrapped character's get_defense()
        return 0

    def get_description(self) -> str:
        # TODO: Delegate to the wrapped character's get_description()
        return ""

class SwordDecorator(CharacterDecorator):
    def __init__(self, character: Character):
        # TODO: Call the parent constructor
        pass

    def get_attack_power(self) -> int:
        # TODO: Return the wrapped character's attack power + 10
        return 0

    def get_description(self) -> str:
        # TODO: Return the wrapped character's description + " + Sword"
        return ""

class ShieldDecorator(CharacterDecorator):
    def __init__(self, character: Character):
        # TODO: Call the parent constructor
        pass

    def get_defense(self) -> int:
        # TODO: Return the wrapped character's defense + 15
        return 0

    def get_description(self) -> str:
        # TODO: Return the wrapped character's description + " + Shield"
        return ""

class SpeedBootsDecorator(CharacterDecorator):
    def __init__(self, character: Character):
        # TODO: Call the parent constructor
        pass

    def get_attack_power(self) -> int:
        # TODO: Return the wrapped character's attack power + 5
        return 0

    def get_defense(self) -> int:
        # TODO: Return the wrapped character's defense + 5
        return 0

    def get_description(self) -> str:
        # TODO: Return the wrapped character's description + " + Speed Boots"
        return ""

if __name__ == "__main__":
    hero = BasicCharacter()
    print(f"{hero.get_description()} | ATK: {hero.get_attack_power()} | DEF: {hero.get_defense()}")

    # warrior = ShieldDecorator(SwordDecorator(BasicCharacter()))
    # print(f"{warrior.get_description()} | ATK: {warrior.get_attack_power()} | DEF: {warrior.get_defense()}")

    # full_gear = SpeedBootsDecorator(ShieldDecorator(SwordDecorator(BasicCharacter())))
    # print(f"{full_gear.get_description()} | ATK: {full_gear.get_attack_power()} | DEF: {full_gear.get_defense()}")
```

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;

class Character {
public:
    virtual int getAttackPower() = 0;
    virtual int getDefense() = 0;
    virtual string getDescription() = 0;
    virtual ~Character() {}
};

class BasicCharacter : public Character {
public:
    int getAttackPower() override { return 10; }
    int getDefense() override { return 5; }
    string getDescription() override { return "Basic Character"; }
};

class CharacterDecorator : public Character {
protected:
    // TODO: Add a Character* field to store the wrapped character
public:
    CharacterDecorator(Character* character) {
        // TODO: Store the wrapped character pointer
    }

    int getAttackPower() override {
        // TODO: Delegate to the wrapped character's getAttackPower()
        return 0;
    }

    int getDefense() override {
        // TODO: Delegate to the wrapped character's getDefense()
        return 0;
    }

    string getDescription() override {
        // TODO: Delegate to the wrapped character's getDescription()
        return "";
    }
};

class SwordDecorator : public CharacterDecorator {
public:
    SwordDecorator(Character* character) : CharacterDecorator(character) {}

    int getAttackPower() override {
        // TODO: Return the wrapped character's attack power + 10
        return 0;
    }

    string getDescription() override {
        // TODO: Return the wrapped character's description + " + Sword"
        return "";
    }
};

class ShieldDecorator : public CharacterDecorator {
public:
    ShieldDecorator(Character* character) : CharacterDecorator(character) {}

    int getDefense() override {
        // TODO: Return the wrapped character's defense + 15
        return 0;
    }

    string getDescription() override {
        // TODO: Return the wrapped character's description + " + Shield"
        return "";
    }
};

class SpeedBootsDecorator : public CharacterDecorator {
public:
    SpeedBootsDecorator(Character* character) : CharacterDecorator(character) {}

    int getAttackPower() override {
        // TODO: Return the wrapped character's attack power + 5
        return 0;
    }

    int getDefense() override {
        // TODO: Return the wrapped character's defense + 5
        return 0;
    }

    string getDescription() override {
        // TODO: Return the wrapped character's description + " + Speed Boots"
        return "";
    }
};

int main() {
    BasicCharacter hero;
    printf("%s | ATK: %d | DEF: %d\n",
        hero.getDescription().c_str(), hero.getAttackPower(), hero.getDefense());

    // BasicCharacter b2;
    // SwordDecorator sword(&b2);
    // ShieldDecorator warrior(&sword);
    // printf("%s | ATK: %d | DEF: %d\n",
    //     warrior.getDescription().c_str(), warrior.getAttackPower(), warrior.getDefense());

    // BasicCharacter b3;
    // SwordDecorator s3(&b3);
    // ShieldDecorator sh3(&s3);
    // SpeedBootsDecorator fullGear(&sh3);
    // printf("%s | ATK: %d | DEF: %d\n",
    //     fullGear.getDescription().c_str(), fullGear.getAttackPower(), fullGear.getDefense());
    return 0;
}
```

```go
package main

import "fmt"

type Character interface {
	GetAttackPower() int
	GetDefense() int
	GetDescription() string
}

type BasicCharacter struct{}

func (b *BasicCharacter) GetAttackPower() int { return 10 }
func (b *BasicCharacter) GetDefense() int      { return 5 }
func (b *BasicCharacter) GetDescription() string {
	return "Basic Character"
}

type CharacterDecorator struct {
	// TODO: Add a field to store the wrapped Character reference
}

func NewCharacterDecorator(character Character) *CharacterDecorator {
	// TODO: Store the wrapped character
	return &CharacterDecorator{}
}

func (c *CharacterDecorator) GetAttackPower() int {
	// TODO: Delegate to the wrapped character's GetAttackPower()
	return 0
}

func (c *CharacterDecorator) GetDefense() int {
	// TODO: Delegate to the wrapped character's GetDefense()
	return 0
}

func (c *CharacterDecorator) GetDescription() string {
	// TODO: Delegate to the wrapped character's GetDescription()
	return ""
}

type SwordDecorator struct {
	*CharacterDecorator
}

func NewSwordDecorator(character Character) *SwordDecorator {
	// TODO: Call the parent constructor
	return &SwordDecorator{}
}

func (s *SwordDecorator) GetAttackPower() int {
	// TODO: Return the wrapped character's attack power + 10
	return 0
}

func (s *SwordDecorator) GetDescription() string {
	// TODO: Return the wrapped character's description + " + Sword"
	return ""
}

type ShieldDecorator struct {
	*CharacterDecorator
}

func NewShieldDecorator(character Character) *ShieldDecorator {
	// TODO: Call the parent constructor
	return &ShieldDecorator{}
}

func (s *ShieldDecorator) GetDefense() int {
	// TODO: Return the wrapped character's defense + 15
	return 0
}

func (s *ShieldDecorator) GetDescription() string {
	// TODO: Return the wrapped character's description + " + Shield"
	return ""
}

type SpeedBootsDecorator struct {
	*CharacterDecorator
}

func NewSpeedBootsDecorator(character Character) *SpeedBootsDecorator {
	// TODO: Call the parent constructor
	return &SpeedBootsDecorator{}
}

func (s *SpeedBootsDecorator) GetAttackPower() int {
	// TODO: Return the wrapped character's attack power + 5
	return 0
}

func (s *SpeedBootsDecorator) GetDefense() int {
	// TODO: Return the wrapped character's defense + 5
	return 0
}

func (s *SpeedBootsDecorator) GetDescription() string {
	// TODO: Return the wrapped character's description + " + Speed Boots"
	return ""
}

func main() {
	var hero Character = &BasicCharacter{}
	fmt.Printf("%s | ATK: %d | DEF: %d\n",
		hero.GetDescription(), hero.GetAttackPower(), hero.GetDefense())

	// var warrior Character = NewShieldDecorator(NewSwordDecorator(&BasicCharacter{}))
	// fmt.Printf("%s | ATK: %d | DEF: %d\n",
	// 	warrior.GetDescription(), warrior.GetAttackPower(), warrior.GetDefense())

	// var fullGear Character = NewSpeedBootsDecorator(
	// 	NewShieldDecorator(NewSwordDecorator(&BasicCharacter{})))
	// fmt.Printf("%s | ATK: %d | DEF: %d\n",
	// 	fullGear.GetDescription(), fullGear.GetAttackPower(), fullGear.GetDefense())
}
```

```csharp
using System;

interface ICharacter
{
    int GetAttackPower();
    int GetDefense();
    string GetDescription();
}

class BasicCharacter : ICharacter
{
    public int GetAttackPower() => 10;
    public int GetDefense() => 5;
    public string GetDescription() => "Basic Character";
}

abstract class CharacterDecorator : ICharacter
{
    // TODO: Add a protected ICharacter field to store the wrapped character

    protected CharacterDecorator(ICharacter character)
    {
        // TODO: Store the wrapped character
    }

    public virtual int GetAttackPower()
    {
        // TODO: Delegate to the wrapped character's GetAttackPower()
        return 0;
    }

    public virtual int GetDefense()
    {
        // TODO: Delegate to the wrapped character's GetDefense()
        return 0;
    }

    public virtual string GetDescription()
    {
        // TODO: Delegate to the wrapped character's GetDescription()
        return "";
    }
}

class SwordDecorator : CharacterDecorator
{
    public SwordDecorator(ICharacter character) : base(character) {}

    public override int GetAttackPower()
    {
        // TODO: Return the wrapped character's attack power + 10
        return 0;
    }

    public override string GetDescription()
    {
        // TODO: Return the wrapped character's description + " + Sword"
        return "";
    }
}

class ShieldDecorator : CharacterDecorator
{
    public ShieldDecorator(ICharacter character) : base(character) {}

    public override int GetDefense()
    {
        // TODO: Return the wrapped character's defense + 15
        return 0;
    }

    public override string GetDescription()
    {
        // TODO: Return the wrapped character's description + " + Shield"
        return "";
    }
}

class SpeedBootsDecorator : CharacterDecorator
{
    public SpeedBootsDecorator(ICharacter character) : base(character) {}

    public override int GetAttackPower()
    {
        // TODO: Return the wrapped character's attack power + 5
        return 0;
    }

    public override int GetDefense()
    {
        // TODO: Return the wrapped character's defense + 5
        return 0;
    }

    public override string GetDescription()
    {
        // TODO: Return the wrapped character's description + " + Speed Boots"
        return "";
    }
}

class Program
{
    public static void Main()
    {
        ICharacter hero = new BasicCharacter();
        Console.WriteLine($"{hero.GetDescription()} | ATK: {hero.GetAttackPower()} | DEF: {hero.GetDefense()}");

        // ICharacter warrior = new ShieldDecorator(new SwordDecorator(new BasicCharacter()));
        // Console.WriteLine($"{warrior.GetDescription()} | ATK: {warrior.GetAttackPower()} | DEF: {warrior.GetDefense()}");

        // ICharacter fullGear = new SpeedBootsDecorator(
        //     new ShieldDecorator(new SwordDecorator(new BasicCharacter())));
        // Console.WriteLine($"{fullGear.GetDescription()} | ATK: {fullGear.GetAttackPower()} | DEF: {fullGear.GetDefense()}");
    }
}
```

```typescript
interface Character {
    getAttackPower(): number;
    getDefense(): number;
    getDescription(): string;
}

class BasicCharacter implements Character {
    getAttackPower(): number { return 10; }
    getDefense(): number { return 5; }
    getDescription(): string { return "Basic Character"; }
}

abstract class CharacterDecorator implements Character {
    // TODO: Add a protected field to store the wrapped Character reference

    constructor(character: Character) {
        // TODO: Store the wrapped character
    }

    getAttackPower(): number {
        // TODO: Delegate to the wrapped character's getAttackPower()
        return 0;
    }

    getDefense(): number {
        // TODO: Delegate to the wrapped character's getDefense()
        return 0;
    }

    getDescription(): string {
        // TODO: Delegate to the wrapped character's getDescription()
        return "";
    }
}

class SwordDecorator extends CharacterDecorator {
    constructor(character: Character) {
        // TODO: Call the parent constructor
    }

    getAttackPower(): number {
        // TODO: Return the wrapped character's attack power + 10
        return 0;
    }

    getDescription(): string {
        // TODO: Return the wrapped character's description + " + Sword"
        return "";
    }
}

class ShieldDecorator extends CharacterDecorator {
    constructor(character: Character) {
        // TODO: Call the parent constructor
    }

    getDefense(): number {
        // TODO: Return the wrapped character's defense + 15
        return 0;
    }

    getDescription(): string {
        // TODO: Return the wrapped character's description + " + Shield"
        return "";
    }
}

class SpeedBootsDecorator extends CharacterDecorator {
    constructor(character: Character) {
        // TODO: Call the parent constructor
    }

    getAttackPower(): number {
        // TODO: Return the wrapped character's attack power + 5
        return 0;
    }

    getDefense(): number {
        // TODO: Return the wrapped character's defense + 5
        return 0;
    }

    getDescription(): string {
        // TODO: Return the wrapped character's description + " + Speed Boots"
        return "";
    }
}

const hero: Character = new BasicCharacter();
console.log(`${hero.getDescription()} | ATK: ${hero.getAttackPower()} | DEF: ${hero.getDefense()}`);

// const warrior: Character = new ShieldDecorator(new SwordDecorator(new BasicCharacter()));
// console.log(`${warrior.getDescription()} | ATK: ${warrior.getAttackPower()} | DEF: ${warrior.getDefense()}`);

// const fullGear: Character = new SpeedBootsDecorator(
//     new ShieldDecorator(new SwordDecorator(new BasicCharacter())));
// console.log(`${fullGear.getDescription()} | ATK: ${fullGear.getAttackPower()} | DEF: ${fullGear.getDefense()}`);
```

#### Solutions

```java
interface Character {
    int getAttackPower();
    int getDefense();
    String getDescription();
}

class BasicCharacter implements Character {
    @Override
    public int getAttackPower() { return 10; }

    @Override
    public int getDefense() { return 5; }

    @Override
    public String getDescription() { return "Basic Character"; }
}

abstract class CharacterDecorator implements Character {
    protected Character character;

    public CharacterDecorator(Character character) {
        this.character = character;
    }

    @Override
    public int getAttackPower() {
        return character.getAttackPower();
    }

    @Override
    public int getDefense() {
        return character.getDefense();
    }

    @Override
    public String getDescription() {
        return character.getDescription();
    }
}

class SwordDecorator extends CharacterDecorator {
    public SwordDecorator(Character character) {
        super(character);
    }

    @Override
    public int getAttackPower() {
        return character.getAttackPower() + 10;
    }

    @Override
    public String getDescription() {
        return character.getDescription() + " + Sword";
    }
}

class ShieldDecorator extends CharacterDecorator {
    public ShieldDecorator(Character character) {
        super(character);
    }

    @Override
    public int getDefense() {
        return character.getDefense() + 15;
    }

    @Override
    public String getDescription() {
        return character.getDescription() + " + Shield";
    }
}

class SpeedBootsDecorator extends CharacterDecorator {
    public SpeedBootsDecorator(Character character) {
        super(character);
    }

    @Override
    public int getAttackPower() {
        return character.getAttackPower() + 5;
    }

    @Override
    public int getDefense() {
        return character.getDefense() + 5;
    }

    @Override
    public String getDescription() {
        return character.getDescription() + " + Speed Boots";
    }
}

public class Main {
    public static void main(String[] args) {
        Character hero = new BasicCharacter();
        System.out.printf("%s | ATK: %d | DEF: %d%n",
            hero.getDescription(), hero.getAttackPower(), hero.getDefense());

        Character warrior = new ShieldDecorator(new SwordDecorator(new BasicCharacter()));
        System.out.printf("%s | ATK: %d | DEF: %d%n",
            warrior.getDescription(), warrior.getAttackPower(), warrior.getDefense());

        Character fullGear = new SpeedBootsDecorator(
            new ShieldDecorator(new SwordDecorator(new BasicCharacter())));
        System.out.printf("%s | ATK: %d | DEF: %d%n",
            fullGear.getDescription(), fullGear.getAttackPower(), fullGear.getDefense());
    }
}
```

```python
from abc import ABC, abstractmethod

class Character(ABC):
    @abstractmethod
    def get_attack_power(self) -> int:
        pass

    @abstractmethod
    def get_defense(self) -> int:
        pass

    @abstractmethod
    def get_description(self) -> str:
        pass

class BasicCharacter(Character):
    def get_attack_power(self) -> int: return 10
    def get_defense(self) -> int: return 5
    def get_description(self) -> str: return "Basic Character"

class CharacterDecorator(Character):
    def __init__(self, character: Character):
        self._character = character

    def get_attack_power(self) -> int:
        return self._character.get_attack_power()

    def get_defense(self) -> int:
        return self._character.get_defense()

    def get_description(self) -> str:
        return self._character.get_description()

class SwordDecorator(CharacterDecorator):
    def __init__(self, character: Character):
        super().__init__(character)

    def get_attack_power(self) -> int:
        return self._character.get_attack_power() + 10

    def get_description(self) -> str:
        return self._character.get_description() + " + Sword"

class ShieldDecorator(CharacterDecorator):
    def __init__(self, character: Character):
        super().__init__(character)

    def get_defense(self) -> int:
        return self._character.get_defense() + 15

    def get_description(self) -> str:
        return self._character.get_description() + " + Shield"

class SpeedBootsDecorator(CharacterDecorator):
    def __init__(self, character: Character):
        super().__init__(character)

    def get_attack_power(self) -> int:
        return self._character.get_attack_power() + 5

    def get_defense(self) -> int:
        return self._character.get_defense() + 5

    def get_description(self) -> str:
        return self._character.get_description() + " + Speed Boots"

if __name__ == "__main__":
    hero = BasicCharacter()
    print(f"{hero.get_description()} | ATK: {hero.get_attack_power()} | DEF: {hero.get_defense()}")

    warrior = ShieldDecorator(SwordDecorator(BasicCharacter()))
    print(f"{warrior.get_description()} | ATK: {warrior.get_attack_power()} | DEF: {warrior.get_defense()}")

    full_gear = SpeedBootsDecorator(ShieldDecorator(SwordDecorator(BasicCharacter())))
    print(f"{full_gear.get_description()} | ATK: {full_gear.get_attack_power()} | DEF: {full_gear.get_defense()}")
```

```cpp
#include <iostream>
#include <string>
#include <cstdio>
using namespace std;

class Character {
public:
    virtual int getAttackPower() = 0;
    virtual int getDefense() = 0;
    virtual string getDescription() = 0;
    virtual ~Character() {}
};

class BasicCharacter : public Character {
public:
    int getAttackPower() override { return 10; }
    int getDefense() override { return 5; }
    string getDescription() override { return "Basic Character"; }
};

class CharacterDecorator : public Character {
protected:
    Character* character;
public:
    CharacterDecorator(Character* character) : character(character) {}

    int getAttackPower() override {
        return character->getAttackPower();
    }

    int getDefense() override {
        return character->getDefense();
    }

    string getDescription() override {
        return character->getDescription();
    }
};

class SwordDecorator : public CharacterDecorator {
public:
    SwordDecorator(Character* character) : CharacterDecorator(character) {}

    int getAttackPower() override {
        return character->getAttackPower() + 10;
    }

    string getDescription() override {
        return character->getDescription() + " + Sword";
    }
};

class ShieldDecorator : public CharacterDecorator {
public:
    ShieldDecorator(Character* character) : CharacterDecorator(character) {}

    int getDefense() override {
        return character->getDefense() + 15;
    }

    string getDescription() override {
        return character->getDescription() + " + Shield";
    }
};

class SpeedBootsDecorator : public CharacterDecorator {
public:
    SpeedBootsDecorator(Character* character) : CharacterDecorator(character) {}

    int getAttackPower() override {
        return character->getAttackPower() + 5;
    }

    int getDefense() override {
        return character->getDefense() + 5;
    }

    string getDescription() override {
        return character->getDescription() + " + Speed Boots";
    }
};

int main() {
    BasicCharacter hero;
    printf("%s | ATK: %d | DEF: %d\n",
        hero.getDescription().c_str(), hero.getAttackPower(), hero.getDefense());

    BasicCharacter b2;
    SwordDecorator sword(&b2);
    ShieldDecorator warrior(&sword);
    printf("%s | ATK: %d | DEF: %d\n",
        warrior.getDescription().c_str(), warrior.getAttackPower(), warrior.getDefense());

    BasicCharacter b3;
    SwordDecorator s3(&b3);
    ShieldDecorator sh3(&s3);
    SpeedBootsDecorator fullGear(&sh3);
    printf("%s | ATK: %d | DEF: %d\n",
        fullGear.getDescription().c_str(), fullGear.getAttackPower(), fullGear.getDefense());
    return 0;
}
```

```go
package main

import "fmt"

type Character interface {
	GetAttackPower() int
	GetDefense() int
	GetDescription() string
}

type BasicCharacter struct{}

func (b *BasicCharacter) GetAttackPower() int {
	return 10
}

func (b *BasicCharacter) GetDefense() int {
	return 5
}

func (b *BasicCharacter) GetDescription() string {
	return "Basic Character"
}

type CharacterDecorator struct {
	character Character
}

func NewCharacterDecorator(character Character) *CharacterDecorator {
	return &CharacterDecorator{character: character}
}

func (d *CharacterDecorator) GetAttackPower() int {
	return d.character.GetAttackPower()
}

func (d *CharacterDecorator) GetDefense() int {
	return d.character.GetDefense()
}

func (d *CharacterDecorator) GetDescription() string {
	return d.character.GetDescription()
}

type SwordDecorator struct {
	*CharacterDecorator
}

func NewSwordDecorator(character Character) *SwordDecorator {
	return &SwordDecorator{CharacterDecorator: NewCharacterDecorator(character)}
}

func (s *SwordDecorator) GetAttackPower() int {
	return s.character.GetAttackPower() + 10
}

func (s *SwordDecorator) GetDescription() string {
	return s.character.GetDescription() + " + Sword"
}

type ShieldDecorator struct {
	*CharacterDecorator
}

func NewShieldDecorator(character Character) *ShieldDecorator {
	return &ShieldDecorator{CharacterDecorator: NewCharacterDecorator(character)}
}

func (s *ShieldDecorator) GetDefense() int {
	return s.character.GetDefense() + 15
}

func (s *ShieldDecorator) GetDescription() string {
	return s.character.GetDescription() + " + Shield"
}

type SpeedBootsDecorator struct {
	*CharacterDecorator
}

func NewSpeedBootsDecorator(character Character) *SpeedBootsDecorator {
	return &SpeedBootsDecorator{CharacterDecorator: NewCharacterDecorator(character)}
}

func (s *SpeedBootsDecorator) GetAttackPower() int {
	return s.character.GetAttackPower() + 5
}

func (s *SpeedBootsDecorator) GetDefense() int {
	return s.character.GetDefense() + 5
}

func (s *SpeedBootsDecorator) GetDescription() string {
	return s.character.GetDescription() + " + Speed Boots"
}

func main() {
	hero := &BasicCharacter{}
	fmt.Printf("%s | ATK: %d | DEF: %d\n",
		hero.GetDescription(), hero.GetAttackPower(), hero.GetDefense())

	warrior := NewShieldDecorator(NewSwordDecorator(&BasicCharacter{}))
	fmt.Printf("%s | ATK: %d | DEF: %d\n",
		warrior.GetDescription(), warrior.GetAttackPower(), warrior.GetDefense())

	fullGear := NewSpeedBootsDecorator(
		NewShieldDecorator(NewSwordDecorator(&BasicCharacter{})))
	fmt.Printf("%s | ATK: %d | DEF: %d\n",
		fullGear.GetDescription(), fullGear.GetAttackPower(), fullGear.GetDefense())
}
```

```csharp
using System;

interface ICharacter
{
    int GetAttackPower();
    int GetDefense();
    string GetDescription();
}

class BasicCharacter : ICharacter
{
    public int GetAttackPower() => 10;
    public int GetDefense() => 5;
    public string GetDescription() => "Basic Character";
}

abstract class CharacterDecorator : ICharacter
{
    protected ICharacter character;

    protected CharacterDecorator(ICharacter character)
    {
        this.character = character;
    }

    public virtual int GetAttackPower()
    {
        return character.GetAttackPower();
    }

    public virtual int GetDefense()
    {
        return character.GetDefense();
    }

    public virtual string GetDescription()
    {
        return character.GetDescription();
    }
}

class SwordDecorator : CharacterDecorator
{
    public SwordDecorator(ICharacter character) : base(character) {}

    public override int GetAttackPower()
    {
        return character.GetAttackPower() + 10;
    }

    public override string GetDescription()
    {
        return character.GetDescription() + " + Sword";
    }
}

class ShieldDecorator : CharacterDecorator
{
    public ShieldDecorator(ICharacter character) : base(character) {}

    public override int GetDefense()
    {
        return character.GetDefense() + 15;
    }

    public override string GetDescription()
    {
        return character.GetDescription() + " + Shield";
    }
}

class SpeedBootsDecorator : CharacterDecorator
{
    public SpeedBootsDecorator(ICharacter character) : base(character) {}

    public override int GetAttackPower()
    {
        return character.GetAttackPower() + 5;
    }

    public override int GetDefense()
    {
        return character.GetDefense() + 5;
    }

    public override string GetDescription()
    {
        return character.GetDescription() + " + Speed Boots";
    }
}

public class Program
{
    public static void Main()
    {
        ICharacter hero = new BasicCharacter();
        Console.WriteLine($"{hero.GetDescription()} | ATK: {hero.GetAttackPower()} | DEF: {hero.GetDefense()}");

        ICharacter warrior = new ShieldDecorator(new SwordDecorator(new BasicCharacter()));
        Console.WriteLine($"{warrior.GetDescription()} | ATK: {warrior.GetAttackPower()} | DEF: {warrior.GetDefense()}");

        ICharacter fullGear = new SpeedBootsDecorator(
            new ShieldDecorator(new SwordDecorator(new BasicCharacter())));
        Console.WriteLine($"{fullGear.GetDescription()} | ATK: {fullGear.GetAttackPower()} | DEF: {fullGear.GetDefense()}");
    }
}
```

```typescript
interface Character {
    getAttackPower(): number;
    getDefense(): number;
    getDescription(): string;
}

class BasicCharacter implements Character {
    getAttackPower(): number { return 10; }
    getDefense(): number { return 5; }
    getDescription(): string { return "Basic Character"; }
}

abstract class CharacterDecorator implements Character {
    protected character: Character;
    constructor(character: Character) {
        this.character = character;
    }

    getAttackPower(): number {
        return this.character.getAttackPower();
    }

    getDefense(): number {
        return this.character.getDefense();
    }

    getDescription(): string {
        return this.character.getDescription();
    }
}

class SwordDecorator extends CharacterDecorator {
    constructor(character: Character) {
        super(character);
    }

    getAttackPower(): number {
        return this.character.getAttackPower() + 10;
    }

    getDescription(): string {
        return this.character.getDescription() + " + Sword";
    }
}

class ShieldDecorator extends CharacterDecorator {
    constructor(character: Character) {
        super(character);
    }

    getDefense(): number {
        return this.character.getDefense() + 15;
    }

    getDescription(): string {
        return this.character.getDescription() + " + Shield";
    }
}

class SpeedBootsDecorator extends CharacterDecorator {
    constructor(character: Character) {
        super(character);
    }

    getAttackPower(): number {
        return this.character.getAttackPower() + 5;
    }

    getDefense(): number {
        return this.character.getDefense() + 5;
    }

    getDescription(): string {
        return this.character.getDescription() + " + Speed Boots";
    }
}

const hero: Character = new BasicCharacter();
console.log(`${hero.getDescription()} | ATK: ${hero.getAttackPower()} | DEF: ${hero.getDefense()}`);

const warrior: Character = new ShieldDecorator(new SwordDecorator(new BasicCharacter()));
console.log(`${warrior.getDescription()} | ATK: ${warrior.getAttackPower()} | DEF: ${warrior.getDefense()}`);

const fullGear: Character = new SpeedBootsDecorator(
    new ShieldDecorator(new SwordDecorator(new BasicCharacter())));
console.log(`${fullGear.getDescription()} | ATK: ${fullGear.getAttackPower()} | DEF: ${fullGear.getDefense()}`);
```

---

# Exercise 3: Logging Formatter

**Problem:** Build a logging system where decorators format log messages in layers. The challenge is that decorators modify the message content, and the order of application produces different output.

**Requirements:**

- Component interface: `Logger` with `log(String message)`
- ConcreteComponent: `SimpleLogger` that prints the message as-is
- Decorators:
   - `TimestampDecorator`: prepends "[2024-01-15 10:30:00] " to the message
   - `LogLevelDecorator`: takes a level in the constructor, prepends "[LEVEL] " to the message
   - `JsonFormatterDecorator`: wraps message into JSON format: `{"message": "[original]"}`
   - `UpperCaseDecorator`: converts the message to uppercase before delegating
- Show that `JsonFormatter(Timestamp(LogLevel(base)))` produces different output than `Timestamp(LogLevel(JsonFormatter(base)))`

```java
interface Logger {
    void log(String message);
}

class SimpleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println(message);
    }
}

abstract class LoggerDecorator implements Logger {
    // TODO: Add a protected field to store the wrapped Logger reference

    public LoggerDecorator(Logger logger) {
        // TODO: Store the wrapped logger
    }

    @Override
    public void log(String message) {
        // TODO: Delegate to the wrapped logger's log()
    }
}

class TimestampDecorator extends LoggerDecorator {
    public TimestampDecorator(Logger logger) {
        super(logger);
    }

    @Override
    public void log(String message) {
        // TODO: Prepend "[2024-01-15 10:30:00] " to the message,
        //       then delegate to the wrapped logger
    }
}

class LogLevelDecorator extends LoggerDecorator {
    // TODO: Add a private field to store the log level

    public LogLevelDecorator(Logger logger, String level) {
        super(logger);
    }

    @Override
    public void log(String message) {
        // TODO: Prepend "[LEVEL] " to the message (using stored level),
        //       then delegate to the wrapped logger
    }
}

class JsonFormatterDecorator extends LoggerDecorator {
    public JsonFormatterDecorator(Logger logger) {
        super(logger);
    }

    @Override
    public void log(String message) {
        // TODO: Wrap message into JSON format: {"message": "[original]"}
        //       then delegate to the wrapped logger
    }
}

class UpperCaseDecorator extends LoggerDecorator {
    public UpperCaseDecorator(Logger logger) {
        super(logger);
    }

    @Override
    public void log(String message) {
        // TODO: Convert message to uppercase,
        //       then delegate to the wrapped logger
    }
}

public class Main {
    public static void main(String[] args) {
        Logger simple = new SimpleLogger();
        simple.log("Application started");

        // Logger pipeline1 = new LogLevelDecorator(
        //     new TimestampDecorator(new JsonFormatterDecorator(new SimpleLogger())), "INFO");
        // pipeline1.log("Application started");

        // Logger pipeline2 = new JsonFormatterDecorator(
        //     new LogLevelDecorator(new TimestampDecorator(new SimpleLogger()), "INFO"));
        // pipeline2.log("Application started");

        // Logger loud = new UpperCaseDecorator(
        //     new LogLevelDecorator(new SimpleLogger(), "ERROR"));
        // loud.log("Disk full");
    }
}
```

```python
from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, message: str):
        pass

class SimpleLogger(Logger):
    def log(self, message: str):
        print(message)

class LoggerDecorator(Logger):
    def __init__(self, logger: Logger):
        # TODO: Store the wrapped logger
        pass

    def log(self, message: str):
        # TODO: Delegate to the wrapped logger's log()
        pass

class TimestampDecorator(LoggerDecorator):
    def __init__(self, logger: Logger):
        super().__init__(logger)

    def log(self, message: str):
        # TODO: Prepend "[2024-01-15 10:30:00] " to the message,
        #       then delegate to the wrapped logger
        pass

class LogLevelDecorator(LoggerDecorator):
    def __init__(self, logger: Logger, level: str):
        super().__init__(logger)

    def log(self, message: str):
        # TODO: Prepend "[LEVEL] " to the message (using stored level),
        #       then delegate to the wrapped logger
        pass

class JsonFormatterDecorator(LoggerDecorator):
    def __init__(self, logger: Logger):
        super().__init__(logger)

    def log(self, message: str):
        # TODO: Wrap message into JSON format: {"message": "[original]"}
        #       then delegate to the wrapped logger
        pass

class UpperCaseDecorator(LoggerDecorator):
    def __init__(self, logger: Logger):
        super().__init__(logger)

    def log(self, message: str):
        # TODO: Convert message to uppercase,
        #       then delegate to the wrapped logger
        pass

if __name__ == "__main__":
    simple = SimpleLogger()
    simple.log("Application started")

    # pipeline1 = LogLevelDecorator(
    #     TimestampDecorator(JsonFormatterDecorator(SimpleLogger())), "INFO")
    # pipeline1.log("Application started")

    # pipeline2 = JsonFormatterDecorator(
    #     LogLevelDecorator(TimestampDecorator(SimpleLogger()), "INFO"))
    # pipeline2.log("Application started")

    # loud = UpperCaseDecorator(
    #     LogLevelDecorator(SimpleLogger(), "ERROR"))
    # loud.log("Disk full")
```

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

class Logger {
public:
    virtual void log(string message) = 0;
    virtual ~Logger() {}
};

class SimpleLogger : public Logger {
public:
    void log(string message) override {
        cout << message << endl;
    }
};

class LoggerDecorator : public Logger {
protected:
    // TODO: Add a Logger* field to store the wrapped logger
public:
    LoggerDecorator(Logger* logger) {
        // TODO: Store the wrapped logger pointer
    }

    void log(string message) override {
        // TODO: Delegate to the wrapped logger's log()
    }
};

class TimestampDecorator : public LoggerDecorator {
public:
    TimestampDecorator(Logger* logger) : LoggerDecorator(logger) {}

    void log(string message) override {
        // TODO: Prepend "[2024-01-15 10:30:00] " to the message,
        //       then delegate to the wrapped logger
    }
};

class LogLevelDecorator : public LoggerDecorator {
    // TODO: Add a string field to store the log level
public:
    LogLevelDecorator(Logger* logger, const string& level) : LoggerDecorator(logger) {
        // TODO: Store the level
    }

    void log(string message) override {
        // TODO: Prepend "[LEVEL] " to the message (using stored level),
        //       then delegate to the wrapped logger
    }
};

class JsonFormatterDecorator : public LoggerDecorator {
public:
    JsonFormatterDecorator(Logger* logger) : LoggerDecorator(logger) {}

    void log(string message) override {
        // TODO: Wrap message into JSON format: {"message": "[original]"}
        //       then delegate to the wrapped logger
    }
};

class UpperCaseDecorator : public LoggerDecorator {
public:
    UpperCaseDecorator(Logger* logger) : LoggerDecorator(logger) {}

    void log(string message) override {
        // TODO: Convert message to uppercase,
        //       then delegate to the wrapped logger
    }
};

int main() {
    SimpleLogger simple;
    simple.log("Application started");

    // SimpleLogger s2;
    // JsonFormatterDecorator json2(&s2);
    // TimestampDecorator ts2(&json2);
    // LogLevelDecorator pipeline1(&ts2, "INFO");
    // pipeline1.log("Application started");

    // SimpleLogger s3;
    // TimestampDecorator ts3(&s3);
    // LogLevelDecorator level3(&ts3, "INFO");
    // JsonFormatterDecorator pipeline2(&level3);
    // pipeline2.log("Application started");

    // SimpleLogger s4;
    // LogLevelDecorator level4(&s4, "ERROR");
    // UpperCaseDecorator loud(&level4);
    // loud.log("Disk full");
    return 0;
}
```

```go
package main

import "fmt"

type Logger interface {
	log(message string)
}

type SimpleLogger struct{}

func (s *SimpleLogger) log(message string) {
	fmt.Println(message)
}

type LoggerDecorator struct {
	// TODO: Add a protected field to store the wrapped Logger reference
	logger Logger
}

func NewLoggerDecorator(logger Logger) *LoggerDecorator {
	return &LoggerDecorator{
		// TODO: Store the wrapped logger
		logger: logger,
	}
}

func (d *LoggerDecorator) log(message string) {
	// TODO: Delegate to the wrapped logger's log()
}

type TimestampDecorator struct {
	*LoggerDecorator
}

func NewTimestampDecorator(logger Logger) *TimestampDecorator {
	return &TimestampDecorator{
		LoggerDecorator: NewLoggerDecorator(logger),
	}
}

func (d *TimestampDecorator) log(message string) {
	// TODO: Prepend "[2024-01-15 10:30:00] " to the message,
	//       then delegate to the wrapped logger
}

type LogLevelDecorator struct {
	*LoggerDecorator
	// TODO: Add a private field to store the log level
	level string
}

func NewLogLevelDecorator(logger Logger, level string) *LogLevelDecorator {
	return &LogLevelDecorator{
		LoggerDecorator: NewLoggerDecorator(logger),
		// TODO: Store the level
		level: level,
	}
}

func (d *LogLevelDecorator) log(message string) {
	// TODO: Prepend "[LEVEL] " to the message (using stored level),
	//       then delegate to the wrapped logger
}

type JsonFormatterDecorator struct {
	*LoggerDecorator
}

func NewJsonFormatterDecorator(logger Logger) *JsonFormatterDecorator {
	return &JsonFormatterDecorator{
		LoggerDecorator: NewLoggerDecorator(logger),
	}
}

func (d *JsonFormatterDecorator) log(message string) {
	// TODO: Wrap message into JSON format: {"message": "[original]"}
	//       then delegate to the wrapped logger
}

type UpperCaseDecorator struct {
	*LoggerDecorator
}

func NewUpperCaseDecorator(logger Logger) *UpperCaseDecorator {
	return &UpperCaseDecorator{
		LoggerDecorator: NewLoggerDecorator(logger),
	}
}

func (d *UpperCaseDecorator) log(message string) {
	// TODO: Convert message to uppercase,
	//       then delegate to the wrapped logger
}

func main() {
	simple := &SimpleLogger{}
	simple.log("Application started")

	// pipeline1 := NewLogLevelDecorator(
	// 	NewTimestampDecorator(NewJsonFormatterDecorator(&SimpleLogger{})), "INFO")
	// pipeline1.log("Application started")

	// pipeline2 := NewJsonFormatterDecorator(
	// 	NewLogLevelDecorator(NewTimestampDecorator(&SimpleLogger{}), "INFO"))
	// pipeline2.log("Application started")

	// loud := NewUpperCaseDecorator(
	// 	NewLogLevelDecorator(&SimpleLogger{}, "ERROR"))
	// loud.log("Disk full")
}
```

```csharp
using System;

interface ILogger
{
    void Log(string message);
}

class SimpleLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine(message);
    }
}

abstract class LoggerDecorator : ILogger
{
    // TODO: Add a protected ILogger field to store the wrapped logger

    protected LoggerDecorator(ILogger logger)
    {
        // TODO: Store the wrapped logger
    }

    public virtual void Log(string message)
    {
        // TODO: Delegate to the wrapped logger's Log()
    }
}

class TimestampDecorator : LoggerDecorator
{
    public TimestampDecorator(ILogger logger) : base(logger) {}

    public override void Log(string message)
    {
        // TODO: Prepend "[2024-01-15 10:30:00] " to the message,
        //       then delegate to the wrapped logger
    }
}

class LogLevelDecorator : LoggerDecorator
{
    // TODO: Add a private string field to store the log level

    public LogLevelDecorator(ILogger logger, string level) : base(logger)
    {
        // TODO: Store the level
    }

    public override void Log(string message)
    {
        // TODO: Prepend "[LEVEL] " to the message (using stored level),
        //       then delegate to the wrapped logger
    }
}

class JsonFormatterDecorator : LoggerDecorator
{
    public JsonFormatterDecorator(ILogger logger) : base(logger) {}

    public override void Log(string message)
    {
        // TODO: Wrap message into JSON format: {"message": "[original]"}
        //       then delegate to the wrapped logger
    }
}

class UpperCaseDecorator : LoggerDecorator
{
    public UpperCaseDecorator(ILogger logger) : base(logger) {}

    public override void Log(string message)
    {
        // TODO: Convert message to uppercase,
        //       then delegate to the wrapped logger
    }
}

class Program
{
    public static void Main()
    {
        ILogger simple = new SimpleLogger();
        simple.Log("Application started");

        // ILogger pipeline1 = new LogLevelDecorator(
        //     new TimestampDecorator(new JsonFormatterDecorator(new SimpleLogger())), "INFO");
        // pipeline1.Log("Application started");

        // ILogger pipeline2 = new JsonFormatterDecorator(
        //     new LogLevelDecorator(new TimestampDecorator(new SimpleLogger()), "INFO"));
        // pipeline2.Log("Application started");

        // ILogger loud = new UpperCaseDecorator(
        //     new LogLevelDecorator(new SimpleLogger(), "ERROR"));
        // loud.Log("Disk full");
    }
}
```

```typescript
interface Logger {
    log(message: string): void;
}

class SimpleLogger implements Logger {
    log(message: string): void {
        console.log(message);
    }
}

abstract class LoggerDecorator implements Logger {
    // TODO: Add a protected field to store the wrapped Logger reference

    constructor(logger: Logger) {
        // TODO: Store the wrapped logger
    }

    log(message: string): void {
        // TODO: Delegate to the wrapped logger's log()
    }
}

class TimestampDecorator extends LoggerDecorator {
    constructor(logger: Logger) {
        super(logger);
    }

    log(message: string): void {
        // TODO: Prepend "[2024-01-15 10:30:00] " to the message,
        //       then delegate to the wrapped logger
    }
}

class LogLevelDecorator extends LoggerDecorator {
    // TODO: Add a private field to store the log level

    constructor(logger: Logger, level: string) {
        super(logger);
    }

    log(message: string): void {
        // TODO: Prepend "[LEVEL] " to the message (using stored level),
        //       then delegate to the wrapped logger
    }
}

class JsonFormatterDecorator extends LoggerDecorator {
    constructor(logger: Logger) {
        super(logger);
    }

    log(message: string): void {
        // TODO: Wrap message into JSON format: {"message": "[original]"}
        //       then delegate to the wrapped logger
    }
}

class UpperCaseDecorator extends LoggerDecorator {
    constructor(logger: Logger) {
        super(logger);
    }

    log(message: string): void {
        // TODO: Convert message to uppercase,
        //       then delegate to the wrapped logger
    }
}

const simple: Logger = new SimpleLogger();
simple.log("Application started");

// const pipeline1: Logger = new LogLevelDecorator(
//     new TimestampDecorator(new JsonFormatterDecorator(new SimpleLogger())), "INFO");
// pipeline1.log("Application started");

// const pipeline2: Logger = new JsonFormatterDecorator(
//     new LogLevelDecorator(new TimestampDecorator(new SimpleLogger()), "INFO"));
// pipeline2.log("Application started");

// const loud: Logger = new UpperCaseDecorator(
//     new LogLevelDecorator(new SimpleLogger(), "ERROR"));
// loud.log("Disk full");
```

#### Solutions

```java
interface Logger {
    void log(String message);
}

class SimpleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println(message);
    }
}

abstract class LoggerDecorator implements Logger {
    protected Logger logger;

    public LoggerDecorator(Logger logger) {
        this.logger = logger;
    }

    @Override
    public void log(String message) {
        logger.log(message);
    }
}

class TimestampDecorator extends LoggerDecorator {
    public TimestampDecorator(Logger logger) {
        super(logger);
    }

    @Override
    public void log(String message) {
        logger.log("[2024-01-15 10:30:00] " + message);
    }
}

class LogLevelDecorator extends LoggerDecorator {
    private String level;

    public LogLevelDecorator(Logger logger, String level) {
        super(logger);
        this.level = level;
    }

    @Override
    public void log(String message) {
        logger.log("[" + level + "] " + message);
    }
}

class JsonFormatterDecorator extends LoggerDecorator {
    public JsonFormatterDecorator(Logger logger) {
        super(logger);
    }

    @Override
    public void log(String message) {
        logger.log("{\"message\": \"" + message + "\"}");
    }
}

class UpperCaseDecorator extends LoggerDecorator {
    public UpperCaseDecorator(Logger logger) {
        super(logger);
    }

    @Override
    public void log(String message) {
        logger.log(message.toUpperCase());
    }
}

public class Main {
    public static void main(String[] args) {
        Logger simple = new SimpleLogger();
        simple.log("Application started");

        Logger pipeline1 = new LogLevelDecorator(
            new TimestampDecorator(new JsonFormatterDecorator(new SimpleLogger())), "INFO");
        pipeline1.log("Application started");

        Logger pipeline2 = new JsonFormatterDecorator(
            new LogLevelDecorator(new TimestampDecorator(new SimpleLogger()), "INFO"));
        pipeline2.log("Application started");

        Logger loud = new UpperCaseDecorator(
            new LogLevelDecorator(new SimpleLogger(), "ERROR"));
        loud.log("Disk full");
    }
}
```

```python
from abc import ABC, abstractmethod

class Logger(ABC):
    @abstractmethod
    def log(self, message: str):
        pass

class SimpleLogger(Logger):
    def log(self, message: str):
        print(message)

class LoggerDecorator(Logger):
    def __init__(self, logger: Logger):
        self._logger = logger

    def log(self, message: str):
        self._logger.log(message)

class TimestampDecorator(LoggerDecorator):
    def __init__(self, logger: Logger):
        super().__init__(logger)

    def log(self, message: str):
        self._logger.log("[2024-01-15 10:30:00] " + message)

class LogLevelDecorator(LoggerDecorator):
    def __init__(self, logger: Logger, level: str):
        super().__init__(logger)
        self._level = level

    def log(self, message: str):
        self._logger.log(f"[{self._level}] " + message)

class JsonFormatterDecorator(LoggerDecorator):
    def __init__(self, logger: Logger):
        super().__init__(logger)

    def log(self, message: str):
        self._logger.log(f'{{"message": "{message}"}}')

class UpperCaseDecorator(LoggerDecorator):
    def __init__(self, logger: Logger):
        super().__init__(logger)

    def log(self, message: str):
        self._logger.log(message.upper())

if __name__ == "__main__":
    simple = SimpleLogger()
    simple.log("Application started")

    pipeline1 = LogLevelDecorator(
        TimestampDecorator(JsonFormatterDecorator(SimpleLogger())), "INFO")
    pipeline1.log("Application started")

    pipeline2 = JsonFormatterDecorator(
        LogLevelDecorator(TimestampDecorator(SimpleLogger()), "INFO"))
    pipeline2.log("Application started")

    loud = UpperCaseDecorator(
        LogLevelDecorator(SimpleLogger(), "ERROR"))
    loud.log("Disk full")
```

```cpp
#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

class Logger {
public:
    virtual void log(string message) = 0;
    virtual ~Logger() {}
};

class SimpleLogger : public Logger {
public:
    void log(string message) override {
        cout << message << endl;
    }
};

class LoggerDecorator : public Logger {
protected:
    Logger* logger;
public:
    LoggerDecorator(Logger* logger) : logger(logger) {}

    void log(string message) override {
        logger->log(message);
    }
};

class TimestampDecorator : public LoggerDecorator {
public:
    TimestampDecorator(Logger* logger) : LoggerDecorator(logger) {}

    void log(string message) override {
        logger->log("[2024-01-15 10:30:00] " + message);
    }
};

class LogLevelDecorator : public LoggerDecorator {
    string level;
public:
    LogLevelDecorator(Logger* logger, const string& level) : LoggerDecorator(logger), level(level) {}

    void log(string message) override {
        logger->log("[" + level + "] " + message);
    }
};

class JsonFormatterDecorator : public LoggerDecorator {
public:
    JsonFormatterDecorator(Logger* logger) : LoggerDecorator(logger) {}

    void log(string message) override {
        logger->log("{\"message\": \"" + message + "\"}");
    }
};

class UpperCaseDecorator : public LoggerDecorator {
public:
    UpperCaseDecorator(Logger* logger) : LoggerDecorator(logger) {}

    void log(string message) override {
        transform(message.begin(), message.end(), message.begin(), ::toupper);
        logger->log(message);
    }
};

int main() {
    SimpleLogger simple;
    simple.log("Application started");

    SimpleLogger s2;
    JsonFormatterDecorator json2(&s2);
    TimestampDecorator ts2(&json2);
    LogLevelDecorator pipeline1(&ts2, "INFO");
    pipeline1.log("Application started");

    SimpleLogger s3;
    TimestampDecorator ts3(&s3);
    LogLevelDecorator level3(&ts3, "INFO");
    JsonFormatterDecorator pipeline2(&level3);
    pipeline2.log("Application started");

    SimpleLogger simple3;
    LogLevelDecorator levelDec3(&simple3, "ERROR");
    UpperCaseDecorator loud(&levelDec3);
    loud.log("Disk full");
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type Logger interface {
	Log(message string)
}

type SimpleLogger struct{}

func (s SimpleLogger) Log(message string) {
	fmt.Println(message)
}

type LoggerDecorator struct {
	logger Logger
}

func (d LoggerDecorator) Log(message string) {
	d.logger.Log(message)
}

type TimestampDecorator struct {
	LoggerDecorator
}

func NewTimestampDecorator(logger Logger) *TimestampDecorator {
	return &TimestampDecorator{
		LoggerDecorator: LoggerDecorator{logger: logger},
	}
}

func (t *TimestampDecorator) Log(message string) {
	t.logger.Log("[2024-01-15 10:30:00] " + message)
}

type LogLevelDecorator struct {
	LoggerDecorator
	level string
}

func NewLogLevelDecorator(logger Logger, level string) *LogLevelDecorator {
	return &LogLevelDecorator{
		LoggerDecorator: LoggerDecorator{logger: logger},
		level:           level,
	}
}

func (l *LogLevelDecorator) Log(message string) {
	l.logger.Log("[" + l.level + "] " + message)
}

type JsonFormatterDecorator struct {
	LoggerDecorator
}

func NewJsonFormatterDecorator(logger Logger) *JsonFormatterDecorator {
	return &JsonFormatterDecorator{
		LoggerDecorator: LoggerDecorator{logger: logger},
	}
}

func (j *JsonFormatterDecorator) Log(message string) {
	j.logger.Log("{\"message\": \"" + message + "\"}")
}

type UpperCaseDecorator struct {
	LoggerDecorator
}

func NewUpperCaseDecorator(logger Logger) *UpperCaseDecorator {
	return &UpperCaseDecorator{
		LoggerDecorator: LoggerDecorator{logger: logger},
	}
}

func (u *UpperCaseDecorator) Log(message string) {
	u.logger.Log(strings.ToUpper(message))
}

func main() {
	var simple Logger = SimpleLogger{}
	simple.Log("Application started")

	var pipeline1 Logger = NewLogLevelDecorator(
		NewTimestampDecorator(NewJsonFormatterDecorator(SimpleLogger{})), "INFO")
	pipeline1.Log("Application started")

	var pipeline2 Logger = NewJsonFormatterDecorator(
		NewLogLevelDecorator(NewTimestampDecorator(SimpleLogger{}), "INFO"))
	pipeline2.Log("Application started")

	var loud Logger = NewUpperCaseDecorator(
		NewLogLevelDecorator(SimpleLogger{}, "ERROR"))
	loud.Log("Disk full")
}
```

```csharp
using System;

interface ILogger
{
    void Log(string message);
}

class SimpleLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine(message);
    }
}

abstract class LoggerDecorator : ILogger
{
    protected ILogger logger;

    protected LoggerDecorator(ILogger logger)
    {
        this.logger = logger;
    }

    public virtual void Log(string message)
    {
        logger.Log(message);
    }
}

class TimestampDecorator : LoggerDecorator
{
    public TimestampDecorator(ILogger logger) : base(logger) {}

    public override void Log(string message)
    {
        logger.Log("[2024-01-15 10:30:00] " + message);
    }
}

class LogLevelDecorator : LoggerDecorator
{
    private string level;

    public LogLevelDecorator(ILogger logger, string level) : base(logger)
    {
        this.level = level;
    }

    public override void Log(string message)
    {
        logger.Log("[" + level + "] " + message);
    }
}

class JsonFormatterDecorator : LoggerDecorator
{
    public JsonFormatterDecorator(ILogger logger) : base(logger) {}

    public override void Log(string message)
    {
        logger.Log("{\"message\": \"" + message + "\"}");
    }
}

class UpperCaseDecorator : LoggerDecorator
{
    public UpperCaseDecorator(ILogger logger) : base(logger) {}

    public override void Log(string message)
    {
        logger.Log(message.ToUpper());
    }
}

public class Program
{
    public static void Main()
    {
        ILogger simple = new SimpleLogger();
        simple.Log("Application started");

        ILogger pipeline1 = new LogLevelDecorator(
            new TimestampDecorator(new JsonFormatterDecorator(new SimpleLogger())), "INFO");
        pipeline1.Log("Application started");

        ILogger pipeline2 = new JsonFormatterDecorator(
            new LogLevelDecorator(new TimestampDecorator(new SimpleLogger()), "INFO"));
        pipeline2.Log("Application started");

        ILogger loud = new UpperCaseDecorator(
            new LogLevelDecorator(new SimpleLogger(), "ERROR"));
        loud.Log("Disk full");
    }
}
```

```typescript
interface Logger {
    log(message: string): void;
}

class SimpleLogger implements Logger {
    log(message: string): void {
        console.log(message);
    }
}

abstract class LoggerDecorator implements Logger {
    protected logger: Logger;
    constructor(logger: Logger) {
        this.logger = logger;
    }

    log(message: string): void {
        this.logger.log(message);
    }
}

class TimestampDecorator extends LoggerDecorator {
    constructor(logger: Logger) {
        super(logger);
    }

    log(message: string): void {
        this.logger.log("[2024-01-15 10:30:00] " + message);
    }
}

class LogLevelDecorator extends LoggerDecorator {
    private level: string;

    constructor(logger: Logger, level: string) {
        super(logger);
        this.level = level;
    }

    log(message: string): void {
        this.logger.log(`[${this.level}] ` + message);
    }
}

class JsonFormatterDecorator extends LoggerDecorator {
    constructor(logger: Logger) {
        super(logger);
    }

    log(message: string): void {
        this.logger.log(`{"message": "${message}"}`);
    }
}

class UpperCaseDecorator extends LoggerDecorator {
    constructor(logger: Logger) {
        super(logger);
    }

    log(message: string): void {
        this.logger.log(message.toUpperCase());
    }
}

const simple: Logger = new SimpleLogger();
simple.log("Application started");

const pipeline1: Logger = new LogLevelDecorator(
    new TimestampDecorator(new JsonFormatterDecorator(new SimpleLogger())), "INFO");
pipeline1.log("Application started");

const pipeline2: Logger = new JsonFormatterDecorator(
    new LogLevelDecorator(new TimestampDecorator(new SimpleLogger()), "INFO"));
pipeline2.log("Application started");

const loud: Logger = new UpperCaseDecorator(
    new LogLevelDecorator(new SimpleLogger(), "ERROR"));
loud.log("Disk full");
```


