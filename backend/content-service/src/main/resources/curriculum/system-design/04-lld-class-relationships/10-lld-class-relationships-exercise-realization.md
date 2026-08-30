---
id: "lld-class-relationships-exercise-realization"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Class Relationships"
subSection: ""
title: "Exercise: Realization"
slug: "lld-class-relationships-exercise-realization"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Realization as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Realization Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Class Relationships","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Shape Drawing System

**Problem:** Build a drawing system where different shapes implement a common `Drawable` interface. A `Canvas` class renders all shapes through the interface without knowing the concrete types.

**Requirements:**

- `Drawable` interface with `draw()` and `getArea()` methods.
- `Circle` with a radius, `Rectangle` with width and height, `Triangle` with base and height. All three implement `Drawable`.
- `Canvas` with a `drawAll(shapes)` method that iterates over a list of `Drawable` objects, calls `draw()` on each, and prints the area.

```java
import java.util.List;

interface Drawable {
    void draw();
    double getArea();
}

class Circle implements Drawable {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public void draw() {
        // TODO: print "Drawing circle with radius X"
    }

    public double getArea() {
        // TODO: return π * r²
        return 0;
    }
}

class Rectangle implements Drawable {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public void draw() {
        // TODO: print "Drawing rectangle WxH"
    }

    public double getArea() {
        // TODO: return width * height
        return 0;
    }
}

class Triangle implements Drawable {
    private double base;
    private double height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    public void draw() {
        // TODO: print "Drawing triangle with base B and height H"
    }

    public double getArea() {
        // TODO: return 0.5 * base * height
        return 0;
    }
}

class Canvas {
    public void drawAll(List<Drawable> shapes) {
        // TODO: For each shape, call draw() and print its area
    }
}

public class Main {
    public static void main(String[] args) {
        Canvas canvas = new Canvas();

        List<Drawable> shapes = List.of(
            new Circle(5.0),
            new Rectangle(4.0, 6.0),
            new Triangle(3.0, 8.0)
        );

        canvas.drawAll(shapes);
    }
}
```

```python
from abc import ABC, abstractmethod
import math

class Drawable(ABC):
    @abstractmethod
    def draw(self):
        pass

    @abstractmethod
    def get_area(self):
        pass

class Circle(Drawable):
    def __init__(self, radius):
        self.radius = radius

    def draw(self):
        pass  # TODO: print "Drawing circle with radius X"

    def get_area(self):
        return 0  # TODO: return π * r²

class Rectangle(Drawable):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def draw(self):
        pass  # TODO: print "Drawing rectangle WxH"

    def get_area(self):
        return 0  # TODO: return width * height

class Triangle(Drawable):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def draw(self):
        pass  # TODO: print "Drawing triangle with base B and height H"

    def get_area(self):
        return 0  # TODO: return 0.5 * base * height

class Canvas:
    def draw_all(self, shapes):
        # TODO: For each shape, call draw() and print its area
        pass

if __name__ == "__main__":
    canvas = Canvas()

    shapes = [
        Circle(5.0),
        Rectangle(4.0, 6.0),
        Triangle(3.0, 8.0),
    ]

    canvas.draw_all(shapes)
```

```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <cmath>
using namespace std;

class Drawable {
public:
    virtual void draw() = 0;
    virtual double getArea() = 0;
    virtual ~Drawable() = default;
};

class Circle : public Drawable {
private:
    double radius;
public:
    Circle(double radius) : radius(radius) {}

    void draw() override {
        // TODO: print "Drawing circle with radius X"
    }

    double getArea() override {
        // TODO: return π * r²
        return 0;
    }
};

class Rectangle : public Drawable {
private:
    double width, height;
public:
    Rectangle(double width, double height) : width(width), height(height) {}

    void draw() override {
        // TODO: print "Drawing rectangle WxH"
    }

    double getArea() override {
        // TODO: return width * height
        return 0;
    }
};

class Triangle : public Drawable {
private:
    double base, height;
public:
    Triangle(double base, double height) : base(base), height(height) {}

    void draw() override {
        // TODO: print "Drawing triangle with base B and height H"
    }

    double getArea() override {
        // TODO: return 0.5 * base * height
        return 0;
    }
};

class Canvas {
public:
    void drawAll(vector<unique_ptr<Drawable>>& shapes) {
        // TODO: For each shape, call draw() and print its area
    }
};

int main() {
    Canvas canvas;

    vector<unique_ptr<Drawable>> shapes;
    shapes.push_back(make_unique<Circle>(5.0));
    shapes.push_back(make_unique<Rectangle>(4.0, 6.0));
    shapes.push_back(make_unique<Triangle>(3.0, 8.0));

    canvas.drawAll(shapes);

    return 0;
}
```

```go
package main

type Drawable interface {
	Draw()
	GetArea() float64
}

type Circle struct {
	radius float64
}

func NewCircle(radius float64) *Circle {
	return &Circle{radius: radius}
}

func (c *Circle) Draw() {
	// TODO: print "Drawing circle with radius X"
}

func (c *Circle) GetArea() float64 {
	// TODO: return π * r²
	return 0
}

type Rectangle struct {
	width  float64
	height float64
}

func NewRectangle(width float64, height float64) *Rectangle {
	return &Rectangle{width: width, height: height}
}

func (r *Rectangle) Draw() {
	// TODO: print "Drawing rectangle WxH"
}

func (r *Rectangle) GetArea() float64 {
	// TODO: return width * height
	return 0
}

type Triangle struct {
	base   float64
	height float64
}

func NewTriangle(base float64, height float64) *Triangle {
	return &Triangle{base: base, height: height}
}

func (t *Triangle) Draw() {
	// TODO: print "Drawing triangle with base B and height H"
}

func (t *Triangle) GetArea() float64 {
	// TODO: return 0.5 * base * height
	return 0
}

type Canvas struct {
}

func NewCanvas() *Canvas {
	return &Canvas{}
}

func (c *Canvas) DrawAll(shapes []Drawable) {
	// TODO: For each shape, call draw() and print its area
}

func main() {
	canvas := NewCanvas()

	shapes := []Drawable{
		NewCircle(5.0),
		NewRectangle(4.0, 6.0),
		NewTriangle(3.0, 8.0),
	}

	canvas.DrawAll(shapes)
}
```

```csharp
using System;
using System.Collections.Generic;

interface IDrawable
{
    void Draw();
    double GetArea();
}

class Circle : IDrawable
{
    private double radius;

    public Circle(double radius) { this.radius = radius; }

    public void Draw()
    {
        // TODO: print "Drawing circle with radius X"
    }

    public double GetArea()
    {
        // TODO: return π * r²
        return 0;
    }
}

class Rectangle : IDrawable
{
    private double width, height;

    public Rectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    public void Draw()
    {
        // TODO: print "Drawing rectangle WxH"
    }

    public double GetArea()
    {
        // TODO: return width * height
        return 0;
    }
}

class Triangle : IDrawable
{
    private double baseLen, height;

    public Triangle(double baseLen, double height)
    {
        this.baseLen = baseLen;
        this.height = height;
    }

    public void Draw()
    {
        // TODO: print "Drawing triangle with base B and height H"
    }

    public double GetArea()
    {
        // TODO: return 0.5 * base * height
        return 0;
    }
}

class Canvas
{
    public void DrawAll(List<IDrawable> shapes)
    {
        // TODO: For each shape, call Draw() and print its area
    }
}

class Program
{
    static void Main()
    {
        var canvas = new Canvas();

        var shapes = new List<IDrawable>
        {
            new Circle(5.0),
            new Rectangle(4.0, 6.0),
            new Triangle(3.0, 8.0)
        };

        canvas.DrawAll(shapes);
    }
}
```

```typescript
interface Drawable {
    draw(): void;
    getArea(): number;
}

class Circle implements Drawable {
    private radius: number;

    constructor(radius: number) { this.radius = radius; }

    draw(): void {
        // TODO: print "Drawing circle with radius X"
    }

    getArea(): number {
        // TODO: return π * r²
        return 0;
    }
}

class Rectangle implements Drawable {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    draw(): void {
        // TODO: print "Drawing rectangle WxH"
    }

    getArea(): number {
        // TODO: return width * height
        return 0;
    }
}

class Triangle implements Drawable {
    private base: number;
    private height: number;

    constructor(base: number, height: number) {
        this.base = base;
        this.height = height;
    }

    draw(): void {
        // TODO: print "Drawing triangle with base B and height H"
    }

    getArea(): number {
        // TODO: return 0.5 * base * height
        return 0;
    }
}

class Canvas {
    drawAll(shapes: Drawable[]): void {
        // TODO: For each shape, call draw() and print its area
    }
}

const canvas = new Canvas();

const shapes: Drawable[] = [
    new Circle(5.0),
    new Rectangle(4.0, 6.0),
    new Triangle(3.0, 8.0),
];

canvas.drawAll(shapes);
```

#### Solutions

```java
import java.util.List;

interface Drawable {
    void draw();
    double getArea();
}

class Circle implements Drawable {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public void draw() {
        System.out.println("Drawing circle with radius " + radius);
    }

    public double getArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Drawable {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public void draw() {
        System.out.println("Drawing rectangle " + width + "x" + height);
    }

    public double getArea() {
        return width * height;
    }
}

class Triangle implements Drawable {
    private double base;
    private double height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    public void draw() {
        System.out.println("Drawing triangle with base " + base + " and height " + height);
    }

    public double getArea() {
        return 0.5 * base * height;
    }
}

class Canvas {
    public void drawAll(List<Drawable> shapes) {
        for (Drawable shape : shapes) {
            shape.draw();
            System.out.printf("  Area: %.2f%n%n", shape.getArea());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Canvas canvas = new Canvas();

        List<Drawable> shapes = List.of(
            new Circle(5.0),
            new Rectangle(4.0, 6.0),
            new Triangle(3.0, 8.0)
        );

        canvas.drawAll(shapes);
    }
}
```

```python
from abc import ABC, abstractmethod
import math

class Drawable(ABC):
    @abstractmethod
    def draw(self):
        pass

    @abstractmethod
    def get_area(self):
        pass

class Circle(Drawable):
    def __init__(self, radius):
        self.radius = radius

    def draw(self):
        print(f"Drawing circle with radius {self.radius}")

    def get_area(self):
        return math.pi * self.radius * self.radius

class Rectangle(Drawable):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def draw(self):
        print(f"Drawing rectangle {self.width}x{self.height}")

    def get_area(self):
        return self.width * self.height

class Triangle(Drawable):
    def __init__(self, base, height):
        self.base = base
        self.height = height

    def draw(self):
        print(f"Drawing triangle with base {self.base} and height {self.height}")

    def get_area(self):
        return 0.5 * self.base * self.height

class Canvas:
    def draw_all(self, shapes):
        for shape in shapes:
            shape.draw()
            print(f"  Area: {shape.get_area():.2f}\n")

if __name__ == "__main__":
    canvas = Canvas()

    shapes = [
        Circle(5.0),
        Rectangle(4.0, 6.0),
        Triangle(3.0, 8.0),
    ]

    canvas.draw_all(shapes)
```

```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <cmath>
using namespace std;

class Drawable {
public:
    virtual void draw() = 0;
    virtual double getArea() = 0;
    virtual ~Drawable() = default;
};

class Circle : public Drawable {
private:
    double radius;
public:
    Circle(double radius) : radius(radius) {}

    void draw() override {
        printf("Drawing circle with radius %.1f\n", radius);
    }

    double getArea() override {
        return M_PI * radius * radius;
    }
};

class Rectangle : public Drawable {
private:
    double width, height;
public:
    Rectangle(double width, double height) : width(width), height(height) {}

    void draw() override {
        printf("Drawing rectangle %.1fx%.1f\n", width, height);
    }

    double getArea() override {
        return width * height;
    }
};

class Triangle : public Drawable {
private:
    double base, height;
public:
    Triangle(double base, double height) : base(base), height(height) {}

    void draw() override {
        printf("Drawing triangle with base %.1f and height %.1f\n", base, height);
    }

    double getArea() override {
        return 0.5 * base * height;
    }
};

class Canvas {
public:
    void drawAll(vector<unique_ptr<Drawable>>& shapes) {
        for (auto& shape : shapes) {
            shape->draw();
            printf("  Area: %.2f\n\n", shape->getArea());
        }
    }
};

int main() {
    Canvas canvas;

    vector<unique_ptr<Drawable>> shapes;
    shapes.push_back(make_unique<Circle>(5.0));
    shapes.push_back(make_unique<Rectangle>(4.0, 6.0));
    shapes.push_back(make_unique<Triangle>(3.0, 8.0));

    canvas.drawAll(shapes);

    return 0;
}
```

```go
package main

import (
	"fmt"
	"math"
)

type Drawable interface {
	Draw()
	GetArea() float64
}

type Circle struct {
	radius float64
}

func NewCircle(radius float64) *Circle {
	return &Circle{radius: radius}
}

func (c *Circle) Draw() {
	fmt.Printf("Drawing circle with radius %.1f\n", c.radius)
}

func (c *Circle) GetArea() float64 {
	return math.Pi * c.radius * c.radius
}

type Rectangle struct {
	width  float64
	height float64
}

func NewRectangle(width, height float64) *Rectangle {
	return &Rectangle{width: width, height: height}
}

func (r *Rectangle) Draw() {
	fmt.Printf("Drawing rectangle %.1fx%.1f\n", r.width, r.height)
}

func (r *Rectangle) GetArea() float64 {
	return r.width * r.height
}

type Triangle struct {
	base   float64
	height float64
}

func NewTriangle(base, height float64) *Triangle {
	return &Triangle{base: base, height: height}
}

func (t *Triangle) Draw() {
	fmt.Printf("Drawing triangle with base %.1f and height %.1f\n", t.base, t.height)
}

func (t *Triangle) GetArea() float64 {
	return 0.5 * t.base * t.height
}

type Canvas struct{}

func (c *Canvas) DrawAll(shapes []Drawable) {
	for _, shape := range shapes {
		shape.Draw()
		fmt.Printf("  Area: %.2f\n\n", shape.GetArea())
	}
}

func main() {
	canvas := &Canvas{}

	shapes := []Drawable{
		NewCircle(5.0),
		NewRectangle(4.0, 6.0),
		NewTriangle(3.0, 8.0),
	}

	canvas.DrawAll(shapes)
}
```

```csharp
using System;
using System.Collections.Generic;

interface IDrawable
{
    void Draw();
    double GetArea();
}

class Circle : IDrawable
{
    private double radius;

    public Circle(double radius) { this.radius = radius; }

    public void Draw()
    {
        Console.WriteLine($"Drawing circle with radius {radius:F1}");
    }

    public double GetArea()
    {
        return Math.PI * radius * radius;
    }
}

class Rectangle : IDrawable
{
    private double width, height;

    public Rectangle(double width, double height)
    {
        this.width = width;
        this.height = height;
    }

    public void Draw()
    {
        Console.WriteLine($"Drawing rectangle {width:F1}x{height:F1}");
    }

    public double GetArea()
    {
        return width * height;
    }
}

class Triangle : IDrawable
{
    private double baseLen, height;

    public Triangle(double baseLen, double height)
    {
        this.baseLen = baseLen;
        this.height = height;
    }

    public void Draw()
    {
        Console.WriteLine($"Drawing triangle with base {baseLen:F1} and height {height:F1}");
    }

    public double GetArea()
    {
        return 0.5 * baseLen * height;
    }
}

class Canvas
{
    public void DrawAll(List<IDrawable> shapes)
    {
        foreach (var shape in shapes)
        {
            shape.Draw();
            Console.WriteLine($"  Area: {shape.GetArea():F2}\n");
        }
    }
}

class Program
{
    static void Main()
    {
        var canvas = new Canvas();

        var shapes = new List<IDrawable>
        {
            new Circle(5.0),
            new Rectangle(4.0, 6.0),
            new Triangle(3.0, 8.0)
        };

        canvas.DrawAll(shapes);
    }
}
```

```typescript
interface Drawable {
    draw(): void;
    getArea(): number;
}

class Circle implements Drawable {
    private radius: number;

    constructor(radius: number) { this.radius = radius; }

    draw(): void {
        console.log(`Drawing circle with radius ${this.radius.toFixed(1)}`);
    }

    getArea(): number {
        return Math.PI * this.radius * this.radius;
    }
}

class Rectangle implements Drawable {
    private width: number;
    private height: number;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    draw(): void {
        console.log(`Drawing rectangle ${this.width.toFixed(1)}x${this.height.toFixed(1)}`);
    }

    getArea(): number {
        return this.width * this.height;
    }
}

class Triangle implements Drawable {
    private base: number;
    private height: number;

    constructor(base: number, height: number) {
        this.base = base;
        this.height = height;
    }

    draw(): void {
        console.log(`Drawing triangle with base ${this.base.toFixed(1)} and height ${this.height.toFixed(1)}`);
    }

    getArea(): number {
        return 0.5 * this.base * this.height;
    }
}

class Canvas {
    drawAll(shapes: Drawable[]): void {
        for (const shape of shapes) {
            shape.draw();
            console.log(`  Area: ${shape.getArea().toFixed(2)}\n`);
        }
    }
}

const canvas = new Canvas();

const shapes: Drawable[] = [
    new Circle(5.0),
    new Rectangle(4.0, 6.0),
    new Triangle(3.0, 8.0),
];

canvas.drawAll(shapes);
```

---

# Exercise 2: Plugin System

**Problem:** Build a text editor plugin system. A `Plugin` interface defines what every plugin can do, and a `TextEditor` loads and runs plugins through the interface without knowing their concrete types.

**Requirements:**

- `Plugin` interface with `execute(text)` that returns the processed text, and `getName()` that returns the plugin name.
- `SpellCheckPlugin` that converts common misspellings (e.g., "teh" to "the").
- `WordCountPlugin` that appends a word count to the text.
- `UpperCasePlugin` that converts text to uppercase.
- `TextEditor` with `registerPlugin(plugin)` and `runPlugins(text)` methods. It stores plugins as a list of `Plugin` references and runs them in sequence.

```java
import java.util.List;
import java.util.ArrayList;

interface Plugin {
    String execute(String text);
    String getName();
}

class SpellCheckPlugin implements Plugin {
    public String execute(String text) {
        // TODO: replace "teh" with "the", "adn" with "and"
        return text;
    }

    public String getName() {
        return "Spell Check";
    }
}

class WordCountPlugin implements Plugin {
    public String execute(String text) {
        // TODO: append "\n[Word count: X]" to the text
        return text;
    }

    public String getName() {
        return "Word Count";
    }
}

class UpperCasePlugin implements Plugin {
    public String execute(String text) {
        // TODO: return text.toUpperCase()
        return text;
    }

    public String getName() {
        return "Upper Case";
    }
}

class TextEditor {
    private List<Plugin> plugins = new ArrayList<>();

    public void registerPlugin(Plugin plugin) {
        // TODO: Add the plugin to the list and print "Registered: [name]"
    }

    public String runPlugins(String text) {
        // TODO: Run each plugin in sequence, passing output of one as input to the next
        // Print "Running: [name]" before each plugin
        // Return the final processed text
        return text;
    }
}

public class Main {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        editor.registerPlugin(new SpellCheckPlugin());
        editor.registerPlugin(new WordCountPlugin());

        String result = editor.runPlugins("teh quick brown fox adn teh lazy dog");
        System.out.println("\nFinal output: " + result);
    }
}
```

```python
from abc import ABC, abstractmethod

class Plugin(ABC):
    @abstractmethod
    def execute(self, text):
        pass

    @abstractmethod
    def get_name(self):
        pass

class SpellCheckPlugin(Plugin):
    def execute(self, text):
        return text  # TODO: replace "teh" with "the", "adn" with "and"

    def get_name(self):
        return "Spell Check"

class WordCountPlugin(Plugin):
    def execute(self, text):
        return text  # TODO: append "\n[Word count: X]" to the text

    def get_name(self):
        return "Word Count"

class UpperCasePlugin(Plugin):
    def execute(self, text):
        return text  # TODO: return text.upper()

    def get_name(self):
        return "Upper Case"

class TextEditor:
    def __init__(self):
        self.plugins = []

    def register_plugin(self, plugin):
        # TODO: Add the plugin to the list and print "Registered: [name]"
        pass

    def run_plugins(self, text):
        # TODO: Run each plugin in sequence, passing output of one as input to the next
        # Print "Running: [name]" before each plugin
        # Return the final processed text
        return text

if __name__ == "__main__":
    editor = TextEditor()
    editor.register_plugin(SpellCheckPlugin())
    editor.register_plugin(WordCountPlugin())

    result = editor.run_plugins("teh quick brown fox adn teh lazy dog")
    print(f"\nFinal output: {result}")
```

```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

class Plugin {
public:
    virtual string execute(const string& text) = 0;
    virtual string getName() = 0;
    virtual ~Plugin() = default;
};

class SpellCheckPlugin : public Plugin {
public:
    string execute(const string& text) override {
        // TODO: replace "teh" with "the", "adn" with "and"
        return text;
    }

    string getName() override {
        return "Spell Check";
    }
};

class WordCountPlugin : public Plugin {
public:
    string execute(const string& text) override {
        // TODO: append "\n[Word count: X]" to the text
        return text;
    }

    string getName() override {
        return "Word Count";
    }
};

class UpperCasePlugin : public Plugin {
public:
    string execute(const string& text) override {
        // TODO: return text in uppercase
        return text;
    }

    string getName() override {
        return "Upper Case";
    }
};

class TextEditor {
    vector<unique_ptr<Plugin>> plugins;

public:
    void registerPlugin(unique_ptr<Plugin> plugin) {
        // TODO: Add the plugin to the list and print "Registered: [name]"
    }

    string runPlugins(const string& text) {
        // TODO: Run each plugin in sequence, passing output of one as input to the next
        // Print "Running: [name]" before each plugin
        // Return the final processed text
        return text;
    }
};

int main() {
    TextEditor editor;
    editor.registerPlugin(make_unique<SpellCheckPlugin>());
    editor.registerPlugin(make_unique<WordCountPlugin>());

    string result = editor.runPlugins("teh quick brown fox adn teh lazy dog");
    cout << "\nFinal output: " << result << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Plugin interface {
	Execute(text string) string
	GetName() string
}

type SpellCheckPlugin struct{}

func (p *SpellCheckPlugin) Execute(text string) string {
	// TODO: replace "teh" with "the", "adn" with "and"
	return text
}

func (p *SpellCheckPlugin) GetName() string {
	return "Spell Check"
}

type WordCountPlugin struct{}

func (p *WordCountPlugin) Execute(text string) string {
	// TODO: append "\n[Word count: X]" to the text
	return text
}

func (p *WordCountPlugin) GetName() string {
	return "Word Count"
}

type UpperCasePlugin struct{}

func (p *UpperCasePlugin) Execute(text string) string {
	// TODO: return text.toUpperCase()
	return text
}

func (p *UpperCasePlugin) GetName() string {
	return "Upper Case"
}

type TextEditor struct {
	plugins []Plugin
}

func (t *TextEditor) RegisterPlugin(plugin Plugin) {
	// TODO: Add the plugin to the list and print "Registered: [name]"
}

func (t *TextEditor) RunPlugins(text string) string {
	// TODO: Run each plugin in sequence, passing output of one as input to the next
	// Print "Running: [name]" before each plugin
	// Return the final processed text
	return text
}

func main() {
	editor := &TextEditor{}
	editor.RegisterPlugin(&SpellCheckPlugin{})
	editor.RegisterPlugin(&WordCountPlugin{})

	result := editor.RunPlugins("teh quick brown fox adn teh lazy dog")
	fmt.Printf("\nFinal output: %s\n", result)
}
```

```csharp
using System;
using System.Collections.Generic;

interface IPlugin
{
    string Execute(string text);
    string GetName();
}

class SpellCheckPlugin : IPlugin
{
    public string Execute(string text)
    {
        // TODO: replace "teh" with "the", "adn" with "and"
        return text;
    }

    public string GetName() => "Spell Check";
}

class WordCountPlugin : IPlugin
{
    public string Execute(string text)
    {
        // TODO: append "\n[Word count: X]" to the text
        return text;
    }

    public string GetName() => "Word Count";
}

class UpperCasePlugin : IPlugin
{
    public string Execute(string text)
    {
        // TODO: return text.ToUpper()
        return text;
    }

    public string GetName() => "Upper Case";
}

class TextEditor
{
    private List<IPlugin> plugins = new List<IPlugin>();

    public void RegisterPlugin(IPlugin plugin)
    {
        // TODO: Add the plugin to the list and print "Registered: [name]"
    }

    public string RunPlugins(string text)
    {
        // TODO: Run each plugin in sequence, passing output of one as input to the next
        // Print "Running: [name]" before each plugin
        // Return the final processed text
        return text;
    }
}

class Program
{
    static void Main()
    {
        var editor = new TextEditor();
        editor.RegisterPlugin(new SpellCheckPlugin());
        editor.RegisterPlugin(new WordCountPlugin());

        string result = editor.RunPlugins("teh quick brown fox adn teh lazy dog");
        Console.WriteLine($"\nFinal output: {result}");
    }
}
```

```typescript
interface Plugin {
    execute(text: string): string;
    getName(): string;
}

class SpellCheckPlugin implements Plugin {
    execute(text: string): string {
        // TODO: replace "teh" with "the", "adn" with "and"
        return text;
    }

    getName(): string {
        return "Spell Check";
    }
}

class WordCountPlugin implements Plugin {
    execute(text: string): string {
        // TODO: append "\n[Word count: X]" to the text
        return text;
    }

    getName(): string {
        return "Word Count";
    }
}

class UpperCasePlugin implements Plugin {
    execute(text: string): string {
        // TODO: return text.toUpperCase()
        return text;
    }

    getName(): string {
        return "Upper Case";
    }
}

class TextEditor {
    private plugins: Plugin[] = [];

    registerPlugin(plugin: Plugin): void {
        // TODO: Add the plugin to the list and print "Registered: [name]"
    }

    runPlugins(text: string): string {
        // TODO: Run each plugin in sequence, passing output of one as input to the next
        // Print "Running: [name]" before each plugin
        // Return the final processed text
        return text;
    }
}

const editor = new TextEditor();
editor.registerPlugin(new SpellCheckPlugin());
editor.registerPlugin(new WordCountPlugin());

const result = editor.runPlugins("teh quick brown fox adn teh lazy dog");
console.log(`\nFinal output: ${result}`);
```

#### Solutions

```java
import java.util.List;
import java.util.ArrayList;

interface Plugin {
    String execute(String text);
    String getName();
}

class SpellCheckPlugin implements Plugin {
    public String execute(String text) {
        return text.replace("teh", "the").replace("adn", "and");
    }

    public String getName() {
        return "Spell Check";
    }
}

class WordCountPlugin implements Plugin {
    public String execute(String text) {
        int count = text.trim().split("\\s+").length;
        return text + "\n[Word count: " + count + "]";
    }

    public String getName() {
        return "Word Count";
    }
}

class UpperCasePlugin implements Plugin {
    public String execute(String text) {
        return text.toUpperCase();
    }

    public String getName() {
        return "Upper Case";
    }
}

class TextEditor {
    private List<Plugin> plugins = new ArrayList<>();

    public void registerPlugin(Plugin plugin) {
        plugins.add(plugin);
        System.out.println("Registered: " + plugin.getName());
    }

    public String runPlugins(String text) {
        String result = text;
        for (Plugin plugin : plugins) {
            System.out.println("Running: " + plugin.getName());
            result = plugin.execute(result);
        }
        return result;
    }
}

public class Main {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        editor.registerPlugin(new SpellCheckPlugin());
        editor.registerPlugin(new WordCountPlugin());

        String result = editor.runPlugins("teh quick brown fox adn teh lazy dog");
        System.out.println("\nFinal output: " + result);
    }
}
```

```python
from abc import ABC, abstractmethod

class Plugin(ABC):
    @abstractmethod
    def execute(self, text):
        pass

    @abstractmethod
    def get_name(self):
        pass

class SpellCheckPlugin(Plugin):
    def execute(self, text):
        return text.replace("teh", "the").replace("adn", "and")

    def get_name(self):
        return "Spell Check"

class WordCountPlugin(Plugin):
    def execute(self, text):
        count = len(text.strip().split())
        return text + f"\n[Word count: {count}]"

    def get_name(self):
        return "Word Count"

class UpperCasePlugin(Plugin):
    def execute(self, text):
        return text.upper()

    def get_name(self):
        return "Upper Case"

class TextEditor:
    def __init__(self):
        self.plugins = []

    def register_plugin(self, plugin):
        self.plugins.append(plugin)
        print(f"Registered: {plugin.get_name()}")

    def run_plugins(self, text):
        result = text
        for plugin in self.plugins:
            print(f"Running: {plugin.get_name()}")
            result = plugin.execute(result)
        return result

if __name__ == "__main__":
    editor = TextEditor()
    editor.register_plugin(SpellCheckPlugin())
    editor.register_plugin(WordCountPlugin())

    result = editor.run_plugins("teh quick brown fox adn teh lazy dog")
    print(f"\nFinal output: {result}")
```

```cpp
#include <iostream>
#include <vector>
#include <memory>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

class Plugin {
public:
    virtual string execute(const string& text) = 0;
    virtual string getName() = 0;
    virtual ~Plugin() = default;
};

class SpellCheckPlugin : public Plugin {
public:
    string execute(const string& text) override {
        string result = text;
        size_t pos;
        while ((pos = result.find("teh")) != string::npos) {
            result.replace(pos, 3, "the");
        }
        while ((pos = result.find("adn")) != string::npos) {
            result.replace(pos, 3, "and");
        }
        return result;
    }

    string getName() override {
        return "Spell Check";
    }
};

class WordCountPlugin : public Plugin {
public:
    string execute(const string& text) override {
        istringstream stream(text);
        string word;
        int count = 0;
        while (stream >> word) {
            count++;
        }
        return text + "\n[Word count: " + to_string(count) + "]";
    }

    string getName() override {
        return "Word Count";
    }
};

class UpperCasePlugin : public Plugin {
public:
    string execute(const string& text) override {
        string result = text;
        transform(result.begin(), result.end(), result.begin(), ::toupper);
        return result;
    }

    string getName() override {
        return "Upper Case";
    }
};

class TextEditor {
    vector<unique_ptr<Plugin>> plugins;

public:
    void registerPlugin(unique_ptr<Plugin> plugin) {
        cout << "Registered: " << plugin->getName() << endl;
        plugins.push_back(move(plugin));
    }

    string runPlugins(const string& text) {
        string result = text;
        for (auto& plugin : plugins) {
            cout << "Running: " << plugin->getName() << endl;
            result = plugin->execute(result);
        }
        return result;
    }
};

int main() {
    TextEditor editor;
    editor.registerPlugin(make_unique<SpellCheckPlugin>());
    editor.registerPlugin(make_unique<WordCountPlugin>());

    string result = editor.runPlugins("teh quick brown fox adn teh lazy dog");
    cout << "\nFinal output: " << result << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type Plugin interface {
	Execute(text string) string
	GetName() string
}

type SpellCheckPlugin struct{}

func (p SpellCheckPlugin) Execute(text string) string {
	return strings.ReplaceAll(strings.ReplaceAll(text, "teh", "the"), "adn", "and")
}

func (p SpellCheckPlugin) GetName() string {
	return "Spell Check"
}

type WordCountPlugin struct{}

func (p WordCountPlugin) Execute(text string) string {
	fields := strings.Fields(text)
	count := len(fields)
	return fmt.Sprintf("%s\n[Word count: %d]", text, count)
}

func (p WordCountPlugin) GetName() string {
	return "Word Count"
}

type UpperCasePlugin struct{}

func (p UpperCasePlugin) Execute(text string) string {
	return strings.ToUpper(text)
}

func (p UpperCasePlugin) GetName() string {
	return "Upper Case"
}

type TextEditor struct {
	plugins []Plugin
}

func NewTextEditor() *TextEditor {
	return &TextEditor{
		plugins: make([]Plugin, 0),
	}
}

func (e *TextEditor) RegisterPlugin(plugin Plugin) {
	e.plugins = append(e.plugins, plugin)
	fmt.Printf("Registered: %s\n", plugin.GetName())
}

func (e *TextEditor) RunPlugins(text string) string {
	result := text
	for _, plugin := range e.plugins {
		fmt.Printf("Running: %s\n", plugin.GetName())
		result = plugin.Execute(result)
	}
	return result
}

func main() {
	editor := NewTextEditor()
	editor.RegisterPlugin(SpellCheckPlugin{})
	editor.RegisterPlugin(WordCountPlugin{})

	result := editor.RunPlugins("teh quick brown fox adn teh lazy dog")
	fmt.Printf("\nFinal output: %s\n", result)
}
```

```csharp
using System;
using System.Collections.Generic;

interface IPlugin
{
    string Execute(string text);
    string GetName();
}

class SpellCheckPlugin : IPlugin
{
    public string Execute(string text)
    {
        return text.Replace("teh", "the").Replace("adn", "and");
    }

    public string GetName() => "Spell Check";
}

class WordCountPlugin : IPlugin
{
    public string Execute(string text)
    {
        int count = text.Trim().Split(new[] { ' ' },
            StringSplitOptions.RemoveEmptyEntries).Length;
        return text + $"\n[Word count: {count}]";
    }

    public string GetName() => "Word Count";
}

class UpperCasePlugin : IPlugin
{
    public string Execute(string text)
    {
        return text.ToUpper();
    }

    public string GetName() => "Upper Case";
}

class TextEditor
{
    private List<IPlugin> plugins = new List<IPlugin>();

    public void RegisterPlugin(IPlugin plugin)
    {
        plugins.Add(plugin);
        Console.WriteLine($"Registered: {plugin.GetName()}");
    }

    public string RunPlugins(string text)
    {
        string result = text;
        foreach (var plugin in plugins)
        {
            Console.WriteLine($"Running: {plugin.GetName()}");
            result = plugin.Execute(result);
        }
        return result;
    }
}

class Program
{
    static void Main()
    {
        var editor = new TextEditor();
        editor.RegisterPlugin(new SpellCheckPlugin());
        editor.RegisterPlugin(new WordCountPlugin());

        string result = editor.RunPlugins("teh quick brown fox adn teh lazy dog");
        Console.WriteLine($"\nFinal output: {result}");
    }
}
```

```typescript
interface Plugin {
    execute(text: string): string;
    getName(): string;
}

class SpellCheckPlugin implements Plugin {
    execute(text: string): string {
        return text.replace(/teh/g, "the").replace(/adn/g, "and");
    }

    getName(): string {
        return "Spell Check";
    }
}

class WordCountPlugin implements Plugin {
    execute(text: string): string {
        const count = text.trim().split(/\s+/).length;
        return text + `\n[Word count: ${count}]`;
    }

    getName(): string {
        return "Word Count";
    }
}

class UpperCasePlugin implements Plugin {
    execute(text: string): string {
        return text.toUpperCase();
    }

    getName(): string {
        return "Upper Case";
    }
}

class TextEditor {
    private plugins: Plugin[] = [];

    registerPlugin(plugin: Plugin): void {
        this.plugins.push(plugin);
        console.log(`Registered: ${plugin.getName()}`);
    }

    runPlugins(text: string): string {
        let result = text;
        for (const plugin of this.plugins) {
            console.log(`Running: ${plugin.getName()}`);
            result = plugin.execute(result);
        }
        return result;
    }
}

const editor = new TextEditor();
editor.registerPlugin(new SpellCheckPlugin());
editor.registerPlugin(new WordCountPlugin());

const result = editor.runPlugins("teh quick brown fox adn teh lazy dog");
console.log(`\nFinal output: ${result}`);
```


