---
id: "lld-solid-principles-exercise-liskov-substitution-principle"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - SOLID Principles"
subSection: ""
title: "Exercise:  Liskov Substitution Principle"
slug: "lld-solid-principles-exercise-liskov-substitution-principle"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise:  Liskov Substitution Principle as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise:  Liskov Substitution Principle Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","SOLID Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: The Rectangle/Square Problem

**Problem:** This is the classic LSP example. A `Square` class extends `Rectangle` but overrides `setWidth` and `setHeight` to maintain equal sides. This breaks client code that expects width and height to be independent.

Refactor the design using a `Shape` interface with a `getArea()` method, so that `Rectangle` and `Square` are both valid shapes without one inheriting from the other.

**Requirements:**

- Create a `Shape` interface with a `getArea()` method
- Implement `Rectangle` with independent width and height, set via constructor
- Implement `Square` with a single side length, set via constructor
- Neither class should extend the other
- Client code should work with any `Shape` without assumptions about mutability

```java
// Before: Square extends Rectangle but breaks its contract
class Rectangle {
    protected int width;
    protected int height;

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getArea() {
        return width * height;
    }
}

class Square extends Rectangle {
    @Override
    public void setWidth(int width) {
        this.width = width;
        this.height = width; // Forces equal sides
    }

    @Override
    public void setHeight(int height) {
        this.width = height; // Forces equal sides
        this.height = height;
    }
}

// Client code that breaks with Square
public class Main {
    public static void resize(Rectangle rect) {
        rect.setWidth(5);
        rect.setHeight(10);
        // Expects area = 50, but Square gives 100
        System.out.println("Area: " + rect.getArea());
    }

    public static void main(String[] args) {
        resize(new Rectangle()); // Area: 50
        resize(new Square());    // Area: 100 -- LSP violation!
    }
}

// TODO: Refactor using a Shape interface with getArea().
// TODO: Rectangle and Square should be independent implementations of Shape.
```

```python
# Before: Square extends Rectangle but breaks its contract
class Rectangle:
    def __init__(self):
        self.width = 0
        self.height = 0

    def set_width(self, width):
        self.width = width

    def set_height(self, height):
        self.height = height

    def get_area(self):
        return self.width * self.height

class Square(Rectangle):
    def set_width(self, width):
        self.width = width
        self.height = width  # Forces equal sides

    def set_height(self, height):
        self.width = height  # Forces equal sides
        self.height = height

# Client code that breaks with Square
def resize(rect):
    rect.set_width(5)
    rect.set_height(10)
    print("Area:", rect.get_area())

resize(Rectangle())  # Area: 50
resize(Square())     # Area: 100 -- LSP violation!

# TODO: Refactor using a Shape interface (ABC) with get_area().
# TODO: Rectangle and Square should be independent implementations of Shape.
```

```cpp
#include <iostream>

using namespace std;

// Before: Square extends Rectangle but breaks its contract
class Rectangle {
protected:
    int width = 0;
    int height = 0;

public:
    virtual void setWidth(int w) { width = w; }
    virtual void setHeight(int h) { height = h; }
    int getArea() const { return width * height; }
    virtual ~Rectangle() = default;
};

class Square : public Rectangle {
public:
    void setWidth(int w) override { width = w; height = w; }
    void setHeight(int h) override { width = h; height = h; }
};

// Client code that breaks with Square
void resize(Rectangle& rect) {
    rect.setWidth(5);
    rect.setHeight(10);
    cout << "Area: " << rect.getArea() << endl;
}

int main() {
    Rectangle rect;
    Square sq;
    resize(rect); // Area: 50
    resize(sq);   // Area: 100 -- LSP violation!
    return 0;
}

// TODO: Refactor using a Shape interface with getArea().
// TODO: Rectangle and Square should be independent implementations of Shape.
```

```go
package main

import "fmt"

// Before: Square extends Rectangle but breaks its contract
type Rectangle struct {
	width  int
	height int
}

func (r *Rectangle) setWidth(w int) {
	// TODO: implement
	r.width = w
}

func (r *Rectangle) setHeight(h int) {
	// TODO: implement
	r.height = h
}

func (r *Rectangle) getArea() int {
	// TODO: implement
	return r.width * r.height
}

type Square struct {
	Rectangle
}

func (s *Square) setWidth(w int) {
	// TODO: implement
	s.width = w
	s.height = w // Forces equal sides
}

func (s *Square) setHeight(h int) {
	// TODO: implement
	s.width = h // Forces equal sides
	s.height = h
}

// Client code that breaks with Square
func resize(rect interface {
	setWidth(int)
	setHeight(int)
	getArea() int
}) {
	rect.setWidth(5)
	rect.setHeight(10)
	// Expects area = 50, but Square gives 100
	fmt.Println("Area:", rect.getArea())
}

func main() {
	resize(&Rectangle{}) // Area: 50
	resize(&Square{})    // Area: 100 -- LSP violation!
}

// TODO: Refactor using a Shape interface with getArea().
// TODO: Rectangle and Square should be independent implementations of Shape.
```

```csharp
using System;

// Before: Square extends Rectangle but breaks its contract
class Rectangle
{
    protected int width;
    protected int height;

    public virtual void SetWidth(int w) { width = w; }
    public virtual void SetHeight(int h) { height = h; }
    public int GetArea() { return width * height; }
}

class Square : Rectangle
{
    public override void SetWidth(int w) { width = w; height = w; }
    public override void SetHeight(int h) { width = h; height = h; }
}

// Client code that breaks with Square
class Program
{
    static void Resize(Rectangle rect)
    {
        rect.SetWidth(5);
        rect.SetHeight(10);
        Console.WriteLine("Area: " + rect.GetArea());
    }

    static void Main()
    {
        Resize(new Rectangle()); // Area: 50
        Resize(new Square());    // Area: 100 -- LSP violation!
    }
}

// TODO: Refactor using an IShape interface with GetArea().
// TODO: Rectangle and Square should be independent implementations of IShape.
```

```typescript
// Before: Square extends Rectangle but breaks its contract
class Rectangle {
    protected width: number = 0;
    protected height: number = 0;

    setWidth(w: number): void { this.width = w; }
    setHeight(h: number): void { this.height = h; }
    getArea(): number { return this.width * this.height; }
}

class Square extends Rectangle {
    setWidth(w: number): void { this.width = w; this.height = w; }
    setHeight(h: number): void { this.width = h; this.height = h; }
}

// Client code that breaks with Square
function resize(rect: Rectangle): void {
    rect.setWidth(5);
    rect.setHeight(10);
    console.log("Area:", rect.getArea());
}

resize(new Rectangle()); // Area: 50
resize(new Square());    // Area: 100 -- LSP violation!

// TODO: Refactor using a Shape interface with getArea().
// TODO: Rectangle and Square should be independent implementations of Shape.
```

#### Solutions

```java
interface Shape {
    double getArea();
}

class Rectangle implements Shape {
    private final double width;
    private final double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double getArea() {
        return width * height;
    }
}

class Square implements Shape {
    private final double side;

    public Square(double side) {
        this.side = side;
    }

    @Override
    public double getArea() {
        return side * side;
    }
}

public class Main {
    public static void main(String[] args) {
        Shape rectangle = new Rectangle(5, 10);
        Shape square = new Square(5);

        System.out.println("Rectangle area: " + (int) rectangle.getArea());
        System.out.println("Square area: " + (int) square.getArea());
    }
}
```

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def get_area(self) -> float:
        pass

class Rectangle(Shape):
    def __init__(self, width: float, height: float):
        self._width = width
        self._height = height

    def get_area(self) -> float:
        return self._width * self._height

class Square(Shape):
    def __init__(self, side: float):
        self._side = side

    def get_area(self) -> float:
        return self._side * self._side

if __name__ == "__main__":
    rectangle: Shape = Rectangle(5, 10)
    square: Shape = Square(5)

    print(f"Rectangle area: {int(rectangle.get_area())}")
    print(f"Square area: {int(square.get_area())}")
```

```cpp
#include <iostream>
using namespace std;

class Shape {
public:
    virtual double getArea() const = 0;
    virtual ~Shape() = default;
};

class Rectangle : public Shape {
private:
    double width;
    double height;

public:
    Rectangle(double width, double height) : width(width), height(height) {}

    double getArea() const override {
        return width * height;
    }
};

class Square : public Shape {
private:
    double side;

public:
    Square(double side) : side(side) {}

    double getArea() const override {
        return side * side;
    }
};

int main() {
    Rectangle rectangle(5, 10);
    Square square(5);

    cout << "Rectangle area: " << static_cast<int>(rectangle.getArea()) << endl;
    cout << "Square area: " << static_cast<int>(square.getArea()) << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Shape interface {
	GetArea() float64
}

type Rectangle struct {
	width  float64
	height float64
}

func NewRectangle(width, height float64) *Rectangle {
	return &Rectangle{
		width:  width,
		height: height,
	}
}

func (r *Rectangle) GetArea() float64 {
	return r.width * r.height
}

type Square struct {
	side float64
}

func NewSquare(side float64) *Square {
	return &Square{
		side: side,
	}
}

func (s *Square) GetArea() float64 {
	return s.side * s.side
}

func main() {
	var rectangle Shape = NewRectangle(5, 10)
	var square Shape = NewSquare(5)

	fmt.Printf("Rectangle area: %d\n", int(rectangle.GetArea()))
	fmt.Printf("Square area: %d\n", int(square.GetArea()))
}
```

```csharp
using System;

interface IShape
{
    double GetArea();
}

class Rectangle : IShape
{
    private readonly double _width;
    private readonly double _height;

    public Rectangle(double width, double height)
    {
        _width = width;
        _height = height;
    }

    public double GetArea()
    {
        return _width * _height;
    }
}

class Square : IShape
{
    private readonly double _side;

    public Square(double side)
    {
        _side = side;
    }

    public double GetArea()
    {
        return _side * _side;
    }
}

class Program
{
    static void Main(string[] args)
    {
        IShape rectangle = new Rectangle(5, 10);
        IShape square = new Square(5);

        Console.WriteLine($"Rectangle area: {(int)rectangle.GetArea()}");
        Console.WriteLine($"Square area: {(int)square.GetArea()}");
    }
}
```

```typescript
interface Shape {
  getArea(): number;
}

class Rectangle implements Shape {
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class Square implements Shape {
  private readonly side: number;

  constructor(side: number) {
    this.side = side;
  }

  getArea(): number {
    return this.side * this.side;
  }
}

const rectangle: Shape = new Rectangle(5, 10);
const square: Shape = new Square(5);

console.log(`Rectangle area: ${rectangle.getArea()}`);
console.log(`Square area: ${square.getArea()}`);
```

---

# Exercise 2: The Bird/Penguin Problem

**Problem:**  A `Bird` class has both `eat()` and `fly()` methods. A `Penguin` subclass extends `Bird` but overrides `fly()` to throw an exception, since penguins cannot fly. Any client code that calls `fly()` on a `Bird` reference will crash at runtime when it gets a `Penguin`. 

**Requirements:**

- Create a `Bird` interface with only an `eat()` method
- Create a `FlyingBird` interface that extends `Bird` and adds a `fly()` method
- `Sparrow` implements `FlyingBird` (it can eat and fly)
- `Penguin` implements `Bird` (it can eat, but not fly)
- Client code that works with `Bird` should never call `fly()`, and code that needs flight should accept `FlyingBird`

```java
// Before: Penguin extends Bird but can't fly
class Bird {
    public void eat() {
        System.out.println(getClass().getSimpleName() + " is eating");
    }

    public void fly() {
        System.out.println(getClass().getSimpleName() + " is flying");
    }
}

class Sparrow extends Bird {}

class Penguin extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Penguins can't fly!");
    }
}

public class Main {
    public static void makeBirdFly(Bird bird) {
        bird.fly(); // Crashes for Penguin!
    }

    public static void main(String[] args) {
        makeBirdFly(new Sparrow()); // Works fine
        makeBirdFly(new Penguin()); // UnsupportedOperationException!
    }
}

// TODO: Split Bird into a Bird interface (eat) and a FlyingBird interface (fly).
// TODO: Sparrow implements FlyingBird, Penguin implements only Bird.
```

```python
# Before: Penguin extends Bird but can't fly
class Bird:
    def eat(self):
        print(f"{self.__class__.__name__} is eating")

    def fly(self):
        print(f"{self.__class__.__name__} is flying")

class Sparrow(Bird):
    pass

class Penguin(Bird):
    def fly(self):
        raise NotImplementedError("Penguins can't fly!")

def make_bird_fly(bird):
    bird.fly()  # Crashes for Penguin!

make_bird_fly(Sparrow())  # Works fine
make_bird_fly(Penguin())  # NotImplementedError!

# TODO: Split Bird into a Bird ABC (eat) and a FlyingBird ABC (fly).
# TODO: Sparrow implements FlyingBird, Penguin implements only Bird.
```

```cpp
#include <iostream>
#include <string>
#include <stdexcept>

// Before: Penguin extends Bird but can't fly
class Bird {
public:
    virtual void eat() {
        std::cout << "Bird is eating" << std::endl;
    }

    virtual void fly() {
        std::cout << "Bird is flying" << std::endl;
    }

    virtual ~Bird() = default;
};

class Sparrow : public Bird {
public:
    void eat() override { std::cout << "Sparrow is eating" << std::endl; }
    void fly() override { std::cout << "Sparrow is flying" << std::endl; }
};

class Penguin : public Bird {
public:
    void eat() override { std::cout << "Penguin is eating" << std::endl; }
    void fly() override {
        throw std::runtime_error("Penguins can't fly!");
    }
};

void makeBirdFly(Bird& bird) {
    bird.fly(); // Crashes for Penguin!
}

int main() {
    Sparrow sparrow;
    Penguin penguin;
    makeBirdFly(sparrow); // Works fine
    makeBirdFly(penguin); // runtime_error!
    return 0;
}

// TODO: Split Bird into a Bird interface (eat) and a FlyingBird interface (fly).
// TODO: Sparrow implements FlyingBird, Penguin implements only Bird.
```

```go
package main

import "fmt"

// Before: Penguin extends Bird but can't fly
type Bird struct{}

func (b Bird) Eat() {
	fmt.Println("Bird is eating")
}

func (b Bird) Fly() {
	fmt.Println("Bird is flying")
}

type Sparrow struct {
	Bird
}

type Penguin struct {
	Bird
}

func (p Penguin) Fly() {
	panic("Penguins can't fly!")
}

func makeBirdFly(bird Bird) {
	bird.Fly() // Crashes for Penguin!
}

func main() {
	makeBirdFly(Bird{}) // Works fine
	makeBirdFly(Bird{}) // Error!
}

// TODO: Split Bird into a Bird interface (eat) and a FlyingBird interface (fly).
// TODO: Sparrow implements FlyingBird, Penguin implements only Bird.
```

```csharp
using System;

// Before: Penguin extends Bird but can't fly
class Bird
{
    public virtual void Eat()
    {
        Console.WriteLine(GetType().Name + " is eating");
    }

    public virtual void Fly()
    {
        Console.WriteLine(GetType().Name + " is flying");
    }
}

class Sparrow : Bird { }

class Penguin : Bird
{
    public override void Fly()
    {
        throw new NotSupportedException("Penguins can't fly!");
    }
}

class Program
{
    static void MakeBirdFly(Bird bird)
    {
        bird.Fly(); // Crashes for Penguin!
    }

    static void Main()
    {
        MakeBirdFly(new Sparrow()); // Works fine
        MakeBirdFly(new Penguin()); // NotSupportedException!
    }
}

// TODO: Split Bird into an IBird interface (Eat) and an IFlyingBird interface (Fly).
// TODO: Sparrow implements IFlyingBird, Penguin implements only IBird.
```

```typescript
// Before: Penguin extends Bird but can't fly
class Bird {
    eat(): void {
        console.log(`${this.constructor.name} is eating`);
    }

    fly(): void {
        console.log(`${this.constructor.name} is flying`);
    }
}

class Sparrow extends Bird {}

class Penguin extends Bird {
    fly(): void {
        throw new Error("Penguins can't fly!");
    }
}

function makeBirdFly(bird: Bird): void {
    bird.fly(); // Crashes for Penguin!
}

makeBirdFly(new Sparrow()); // Works fine
makeBirdFly(new Penguin()); // Error!

// TODO: Split Bird into a Bird interface (eat) and a FlyingBird interface (fly).
// TODO: Sparrow implements FlyingBird, Penguin implements only Bird.
```

#### Solutions

```java
interface Bird {
    void eat();
}

interface FlyingBird extends Bird {
    void fly();
}

class Sparrow implements FlyingBird {
    @Override
    public void eat() {
        System.out.println("Sparrow is eating");
    }

    @Override
    public void fly() {
        System.out.println("Sparrow is flying");
    }
}

class Penguin implements Bird {
    @Override
    public void eat() {
        System.out.println("Penguin is eating");
    }
}

public class Main {
    public static void main(String[] args) {
        Sparrow sparrow = new Sparrow();
        sparrow.eat();
        sparrow.fly();

        Penguin penguin = new Penguin();
        penguin.eat();
    }
}
```

```python
from abc import ABC, abstractmethod

class Bird(ABC):
    @abstractmethod
    def eat(self) -> None:
        pass

class FlyingBird(Bird):
    @abstractmethod
    def fly(self) -> None:
        pass

class Sparrow(FlyingBird):
    def eat(self) -> None:
        print("Sparrow is eating")

    def fly(self) -> None:
        print("Sparrow is flying")

class Penguin(Bird):
    def eat(self) -> None:
        print("Penguin is eating")

if __name__ == "__main__":
    sparrow = Sparrow()
    sparrow.eat()
    sparrow.fly()

    penguin = Penguin()
    penguin.eat()
```

```cpp
#include <iostream>
using namespace std;

class Bird {
public:
    virtual void eat() = 0;
    virtual ~Bird() = default;
};

class FlyingBird : public Bird {
public:
    virtual void fly() = 0;
};

class Sparrow : public FlyingBird {
public:
    void eat() override {
        cout << "Sparrow is eating" << endl;
    }

    void fly() override {
        cout << "Sparrow is flying" << endl;
    }
};

class Penguin : public Bird {
public:
    void eat() override {
        cout << "Penguin is eating" << endl;
    }
};

int main() {
    Sparrow sparrow;
    sparrow.eat();
    sparrow.fly();

    Penguin penguin;
    penguin.eat();

    return 0;
}
```

```go
package main

import "fmt"

type Bird interface {
	Eat()
}

type FlyingBird interface {
	Bird
	Fly()
}

type Sparrow struct{}

func (s Sparrow) Eat() {
	fmt.Println("Sparrow is eating")
}

func (s Sparrow) Fly() {
	fmt.Println("Sparrow is flying")
}

type Penguin struct{}

func (p Penguin) Eat() {
	fmt.Println("Penguin is eating")
}

func main() {
	sparrow := Sparrow{}
	sparrow.Eat()
	sparrow.Fly()

	penguin := Penguin{}
	penguin.Eat()
}
```

```csharp
using System;

interface IBird
{
    void Eat();
}

interface IFlyingBird : IBird
{
    void Fly();
}

class Sparrow : IFlyingBird
{
    public void Eat()
    {
        Console.WriteLine("Sparrow is eating");
    }

    public void Fly()
    {
        Console.WriteLine("Sparrow is flying");
    }
}

class Penguin : IBird
{
    public void Eat()
    {
        Console.WriteLine("Penguin is eating");
    }
}

class Program
{
    static void Main(string[] args)
    {
        Sparrow sparrow = new Sparrow();
        sparrow.Eat();
        sparrow.Fly();

        Penguin penguin = new Penguin();
        penguin.Eat();
    }
}
```

```typescript
interface Bird {
  eat(): void;
}

interface FlyingBird extends Bird {
  fly(): void;
}

class Sparrow implements FlyingBird {
  eat(): void {
    console.log("Sparrow is eating");
  }

  fly(): void {
    console.log("Sparrow is flying");
  }
}

class Penguin implements Bird {
  eat(): void {
    console.log("Penguin is eating");
  }
}

const sparrow = new Sparrow();
sparrow.eat();
sparrow.fly();

const penguin = new Penguin();
penguin.eat();
```


