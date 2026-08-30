---
id: "lld-design-patterns-exercise-composite-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Composite Design Pattern"
slug: "lld-design-patterns-exercise-composite-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Composite Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Composite Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Menu System

**Problem:** Build a restaurant menu system where individual menu items and submenus share a common interface. A `MenuItem` is a leaf with a name and price. A `SubMenu` is a composite with a name that contains menu items and other submenus.

**Requirements:**

- Component interface: `Menu` with `display(indent)` and `getItemCount()` returning an int
- Leaf: `MenuItem` with a name and price. `display()` prints the item. `getItemCount()` returns 1.
- Composite: `SubMenu` with a name. `display()` prints its name then delegates to children. `getItemCount()` sums children's counts.

```java
interface Menu {
    void display(String indent);
    int getItemCount();
}

class MenuItem implements Menu {
    private final String name;
    private final double price;

    public MenuItem(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public void display(String indent) {
        System.out.printf("%s%s - $%.2f%n", indent, name, price);
    }

    @Override
    public int getItemCount() { return 1; }
}

class SubMenu implements Menu {
    // TODO: Add a field to store the submenu name (String)
    // TODO: Add a field to store the list of Menu children (List<Menu>)

    public SubMenu(String name) {
        // TODO: Store the name and initialize the children list
    }

    public void addItem(Menu item) {
        // TODO: Add the given item to the children list
    }

    @Override
    public void display(String indent) {
        // TODO: Print the submenu name with indent + colon
        // TODO: Loop through children, calling child.display() with indent + "  "
    }

    @Override
    public int getItemCount() {
        // TODO: Sum all children's getItemCount()
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        MenuItem burger = new MenuItem("Burger", 8.99);
        MenuItem fries = new MenuItem("Fries", 3.99);
        MenuItem cola = new MenuItem("Cola", 1.99);
        MenuItem water = new MenuItem("Water", 0.99);

        // SubMenu drinks = new SubMenu("Drinks");
        // drinks.addItem(cola);
        // drinks.addItem(water);

        // SubMenu mainMenu = new SubMenu("Main Menu");
        // mainMenu.addItem(burger);
        // mainMenu.addItem(fries);
        // mainMenu.addItem(drinks);

        // mainMenu.display("");
        // System.out.println("\nTotal items: " + mainMenu.getItemCount());
    }
}
```

```python
from abc import ABC, abstractmethod

class Menu(ABC):
    @abstractmethod
    def display(self, indent: str):
        pass

    @abstractmethod
    def get_item_count(self) -> int:
        pass

class MenuItem(Menu):
    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price

    def display(self, indent: str):
        print(f"{indent}{self.name} - ${self.price:.2f}")

    def get_item_count(self) -> int:
        return 1

class SubMenu(Menu):
    def __init__(self, name: str):
        # TODO: Store the name
        # TODO: Initialize an empty list of Menu children
        pass

    def add_item(self, item: Menu):
        # TODO: Add the given item to the children list
        pass

    def display(self, indent: str):
        # TODO: Print the submenu name with indent + colon
        # TODO: Loop through children, calling child.display() with indent + "  "
        pass

    def get_item_count(self) -> int:
        # TODO: Sum all children's get_item_count()
        return 0

if __name__ == "__main__":
    burger = MenuItem("Burger", 8.99)
    fries = MenuItem("Fries", 3.99)
    cola = MenuItem("Cola", 1.99)
    water = MenuItem("Water", 0.99)

    # drinks = SubMenu("Drinks")
    # drinks.add_item(cola)
    # drinks.add_item(water)

    # main_menu = SubMenu("Main Menu")
    # main_menu.add_item(burger)
    # main_menu.add_item(fries)
    # main_menu.add_item(drinks)

    # main_menu.display("")
    # print(f"\nTotal items: {main_menu.get_item_count()}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <cstdio>
using namespace std;

class Menu {
public:
    virtual void display(string indent) = 0;
    virtual int getItemCount() = 0;
    virtual ~Menu() {}
};

class MenuItem : public Menu {
private:
    string name;
    double price;

public:
    MenuItem(string name, double price) : name(name), price(price) {}

    void display(string indent) override {
        printf("%s%s - $%.2f\n", indent.c_str(), name.c_str(), price);
    }

    int getItemCount() override { return 1; }
};

class SubMenu : public Menu {
    // TODO: Add a field to store the submenu name (string)
    // TODO: Add a field to store the list of Menu* children (vector<Menu*>)

public:
    SubMenu(string name) {
        // TODO: Store the name
    }

    void addItem(Menu* item) {
        // TODO: Add the given item to the children list
    }

    void display(string indent) override {
        // TODO: Print the submenu name with indent + colon
        // TODO: Loop through children, calling child->display() with indent + "  "
    }

    int getItemCount() override {
        // TODO: Sum all children's getItemCount()
        return 0;
    }
};

int main() {
    MenuItem burger("Burger", 8.99);
    MenuItem fries("Fries", 3.99);
    MenuItem cola("Cola", 1.99);
    MenuItem water("Water", 0.99);

    // SubMenu drinks("Drinks");
    // drinks.addItem(&cola);
    // drinks.addItem(&water);

    // SubMenu mainMenu("Main Menu");
    // mainMenu.addItem(&burger);
    // mainMenu.addItem(&fries);
    // mainMenu.addItem(&drinks);

    // mainMenu.display("");
    // cout << "\nTotal items: " << mainMenu.getItemCount() << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Menu interface {
	Display(indent string)
	GetItemCount() int
}

type MenuItem struct {
	name  string
	price float64
}

func NewMenuItem(name string, price float64) *MenuItem {
	return &MenuItem{
		name:  name,
		price: price,
	}
}

func (m *MenuItem) Display(indent string) {
	fmt.Printf("%s%s - $%.2f\n", indent, m.name, m.price)
}

func (m *MenuItem) GetItemCount() int {
	return 1
}

type SubMenu struct {
	// TODO: Add a field to store the submenu name (string)
	// TODO: Add a field to store the list of Menu children ([]Menu)
}

func NewSubMenu(name string) *SubMenu {
	// TODO: Store the name and initialize the children slice
	return &SubMenu{}
}

func (s *SubMenu) AddItem(item Menu) {
	// TODO: Add the given item to the children slice
}

func (s *SubMenu) Display(indent string) {
	// TODO: Print the submenu name with indent + colon
	// TODO: Loop through children, calling child.Display() with indent + "  "
}

func (s *SubMenu) GetItemCount() int {
	// TODO: Sum all children's GetItemCount()
	return 0
}

func main() {
	burger := NewMenuItem("Burger", 8.99)
	fries := NewMenuItem("Fries", 3.99)
	cola := NewMenuItem("Cola", 1.99)
	water := NewMenuItem("Water", 0.99)

	_ = burger
	_ = fries
	_ = cola
	_ = water

	// drinks := NewSubMenu("Drinks")
	// drinks.AddItem(cola)
	// drinks.AddItem(water)

	// mainMenu := NewSubMenu("Main Menu")
	// mainMenu.AddItem(burger)
	// mainMenu.AddItem(fries)
	// mainMenu.AddItem(drinks)

	// mainMenu.Display("")
	// fmt.Println("\nTotal items:", mainMenu.GetItemCount())
}
```

```csharp
using System;
using System.Collections.Generic;

interface IMenu
{
    void Display(string indent);
    int GetItemCount();
}

class MenuItem : IMenu
{
    private readonly string name;
    private readonly double price;

    public MenuItem(string name, double price)
    {
        this.name = name;
        this.price = price;
    }

    public void Display(string indent)
    {
        Console.WriteLine($"{indent}{name} - ${price:F2}");
    }

    public int GetItemCount() { return 1; }
}

class SubMenu : IMenu
{
    // TODO: Add a field to store the submenu name (string)
    // TODO: Add a field to store the list of IMenu children (List<IMenu>)

    public SubMenu(string name)
    {
        // TODO: Store the name and initialize the children list
    }

    public void AddItem(IMenu item)
    {
        // TODO: Add the given item to the children list
    }

    public void Display(string indent)
    {
        // TODO: Print the submenu name with indent + colon
        // TODO: Loop through children, calling child.Display() with indent + "  "
    }

    public int GetItemCount()
    {
        // TODO: Sum all children's GetItemCount()
        return 0;
    }
}

class Program
{
    public static void Main()
    {
        var burger = new MenuItem("Burger", 8.99);
        var fries = new MenuItem("Fries", 3.99);
        var cola = new MenuItem("Cola", 1.99);
        var water = new MenuItem("Water", 0.99);

        // var drinks = new SubMenu("Drinks");
        // drinks.AddItem(cola);
        // drinks.AddItem(water);

        // var mainMenu = new SubMenu("Main Menu");
        // mainMenu.AddItem(burger);
        // mainMenu.AddItem(fries);
        // mainMenu.AddItem(drinks);

        // mainMenu.Display("");
        // Console.WriteLine("\nTotal items: " + mainMenu.GetItemCount());
    }
}
```

```typescript
interface Menu {
    display(indent: string): void;
    getItemCount(): number;
}

class MenuItem implements Menu {
    private readonly name: string;
    private readonly price: number;
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    display(indent: string): void {
        console.log(`${indent}${this.name} - $${this.price.toFixed(2)}`);
    }

    getItemCount(): number { return 1; }
}

class SubMenu implements Menu {
    // TODO: Add a field to store the submenu name (string)
    // TODO: Add a field to store the list of Menu children (Menu[])

    constructor(name: string) {
        // TODO: Store the name and initialize the children array
    }

    addItem(item: Menu): void {
        // TODO: Add the given item to the children array
    }

    display(indent: string): void {
        // TODO: Print the submenu name with indent + colon
        // TODO: Loop through children, calling child.display() with indent + "  "
    }

    getItemCount(): number {
        // TODO: Sum all children's getItemCount()
        return 0;
    }
}

const burger = new MenuItem("Burger", 8.99);
const fries = new MenuItem("Fries", 3.99);
const cola = new MenuItem("Cola", 1.99);
const water = new MenuItem("Water", 0.99);

// const drinks = new SubMenu("Drinks");
// drinks.addItem(cola);
// drinks.addItem(water);

// const mainMenu = new SubMenu("Main Menu");
// mainMenu.addItem(burger);
// mainMenu.addItem(fries);
// mainMenu.addItem(drinks);

// mainMenu.display("");
// console.log("\nTotal items: " + mainMenu.getItemCount());
```

#### Solutions

```java
interface Menu {
    void display(String indent);
    int getItemCount();
}

class MenuItem implements Menu {
    private final String name;
    private final double price;

    public MenuItem(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public void display(String indent) {
        System.out.printf("%s%s - $%.2f%n", indent, name, price);
    }

    @Override
    public int getItemCount() { return 1; }
}

class SubMenu implements Menu {
    private final String name;
    private final java.util.List<Menu> children;

    public SubMenu(String name) {
        this.name = name;
        this.children = new java.util.ArrayList<>();
    }

    public void addItem(Menu item) {
        children.add(item);
    }

    @Override
    public void display(String indent) {
        System.out.println(indent + name + ":");
        for (Menu child : children) {
            child.display(indent + "  ");
        }
    }

    @Override
    public int getItemCount() {
        int count = 0;
        for (Menu child : children) {
            count += child.getItemCount();
        }
        return count;
    }
}

public class Main {
    public static void main(String[] args) {
        MenuItem burger = new MenuItem("Burger", 8.99);
        MenuItem fries = new MenuItem("Fries", 3.99);
        MenuItem cola = new MenuItem("Cola", 1.99);
        MenuItem water = new MenuItem("Water", 0.99);

        SubMenu drinks = new SubMenu("Drinks");
        drinks.addItem(cola);
        drinks.addItem(water);

        SubMenu mainMenu = new SubMenu("Main Menu");
        mainMenu.addItem(burger);
        mainMenu.addItem(fries);
        mainMenu.addItem(drinks);

        mainMenu.display("");
        System.out.println("\nTotal items: " + mainMenu.getItemCount());
    }
}
```

```python
from abc import ABC, abstractmethod

class Menu(ABC):
    @abstractmethod
    def display(self, indent: str):
        pass

    @abstractmethod
    def get_item_count(self) -> int:
        pass

class MenuItem(Menu):
    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price

    def display(self, indent: str):
        print(f"{indent}{self.name} - ${self.price:.2f}")

    def get_item_count(self) -> int:
        return 1

class SubMenu(Menu):
    def __init__(self, name: str):
        self.name = name
        self.children: list[Menu] = []

    def add_item(self, item: Menu):
        self.children.append(item)

    def display(self, indent: str):
        print(f"{indent}{self.name}:")
        for child in self.children:
            child.display(indent + "  ")

    def get_item_count(self) -> int:
        return sum(child.get_item_count() for child in self.children)

if __name__ == "__main__":
    burger = MenuItem("Burger", 8.99)
    fries = MenuItem("Fries", 3.99)
    cola = MenuItem("Cola", 1.99)
    water = MenuItem("Water", 0.99)

    drinks = SubMenu("Drinks")
    drinks.add_item(cola)
    drinks.add_item(water)

    main_menu = SubMenu("Main Menu")
    main_menu.add_item(burger)
    main_menu.add_item(fries)
    main_menu.add_item(drinks)

    main_menu.display("")
    print(f"\nTotal items: {main_menu.get_item_count()}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <cstdio>
using namespace std;

class Menu {
public:
    virtual void display(string indent) = 0;
    virtual int getItemCount() = 0;
    virtual ~Menu() {}
};

class MenuItem : public Menu {
private:
    string name;
    double price;

public:
    MenuItem(string name, double price) : name(name), price(price) {}

    void display(string indent) override {
        printf("%s%s - $%.2f\n", indent.c_str(), name.c_str(), price);
    }

    int getItemCount() override { return 1; }
};

class SubMenu : public Menu {
    string name;
    vector<Menu*> children;

public:
    SubMenu(string name) : name(name) {}

    void addItem(Menu* item) {
        children.push_back(item);
    }

    void display(string indent) override {
        cout << indent << name << ":" << endl;
        for (auto child : children) {
            child->display(indent + "  ");
        }
    }

    int getItemCount() override {
        int count = 0;
        for (auto child : children) {
            count += child->getItemCount();
        }
        return count;
    }
};

int main() {
    MenuItem burger("Burger", 8.99);
    MenuItem fries("Fries", 3.99);
    MenuItem cola("Cola", 1.99);
    MenuItem water("Water", 0.99);

    SubMenu drinks("Drinks");
    drinks.addItem(&cola);
    drinks.addItem(&water);

    SubMenu mainMenu("Main Menu");
    mainMenu.addItem(&burger);
    mainMenu.addItem(&fries);
    mainMenu.addItem(&drinks);

    mainMenu.display("");
    cout << "\nTotal items: " << mainMenu.getItemCount() << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Menu interface {
	Display(indent string)
	GetItemCount() int
}

type MenuItem struct {
	name  string
	price float64
}

func NewMenuItem(name string, price float64) *MenuItem {
	return &MenuItem{name: name, price: price}
}

func (m *MenuItem) Display(indent string) {
	fmt.Printf("%s%s - $%.2f\n", indent, m.name, m.price)
}

func (m *MenuItem) GetItemCount() int {
	return 1
}

type SubMenu struct {
	name     string
	children []Menu
}

func NewSubMenu(name string) *SubMenu {
	return &SubMenu{name: name, children: make([]Menu, 0)}
}

func (s *SubMenu) AddItem(item Menu) {
	s.children = append(s.children, item)
}

func (s *SubMenu) Display(indent string) {
	fmt.Println(indent + s.name + ":")
	for _, child := range s.children {
		child.Display(indent + "  ")
	}
}

func (s *SubMenu) GetItemCount() int {
	count := 0
	for _, child := range s.children {
		count += child.GetItemCount()
	}
	return count
}

func main() {
	burger := NewMenuItem("Burger", 8.99)
	fries := NewMenuItem("Fries", 3.99)
	cola := NewMenuItem("Cola", 1.99)
	water := NewMenuItem("Water", 0.99)

	drinks := NewSubMenu("Drinks")
	drinks.AddItem(cola)
	drinks.AddItem(water)

	mainMenu := NewSubMenu("Main Menu")
	mainMenu.AddItem(burger)
	mainMenu.AddItem(fries)
	mainMenu.AddItem(drinks)

	mainMenu.Display("")
	fmt.Printf("\nTotal items: %d\n", mainMenu.GetItemCount())
}
```

```csharp
using System;
using System.Collections.Generic;

interface IMenu
{
    void Display(string indent);
    int GetItemCount();
}

class MenuItem : IMenu
{
    private readonly string name;
    private readonly double price;

    public MenuItem(string name, double price)
    {
        this.name = name;
        this.price = price;
    }

    public void Display(string indent)
    {
        Console.WriteLine($"{indent}{name} - ${price:F2}");
    }

    public int GetItemCount() { return 1; }
}

class SubMenu : IMenu
{
    private readonly string name;
    private readonly List<IMenu> children;

    public SubMenu(string name)
    {
        this.name = name;
        this.children = new List<IMenu>();
    }

    public void AddItem(IMenu item)
    {
        children.Add(item);
    }

    public void Display(string indent)
    {
        Console.WriteLine(indent + name + ":");
        foreach (var child in children)
        {
            child.Display(indent + "  ");
        }
    }

    public int GetItemCount()
    {
        int count = 0;
        foreach (var child in children)
        {
            count += child.GetItemCount();
        }
        return count;
    }
}

public class Program
{
    public static void Main()
    {
        var burger = new MenuItem("Burger", 8.99);
        var fries = new MenuItem("Fries", 3.99);
        var cola = new MenuItem("Cola", 1.99);
        var water = new MenuItem("Water", 0.99);

        var drinks = new SubMenu("Drinks");
        drinks.AddItem(cola);
        drinks.AddItem(water);

        var mainMenu = new SubMenu("Main Menu");
        mainMenu.AddItem(burger);
        mainMenu.AddItem(fries);
        mainMenu.AddItem(drinks);

        mainMenu.Display("");
        Console.WriteLine("\nTotal items: " + mainMenu.GetItemCount());
    }
}
```

```typescript
interface Menu {
    display(indent: string): void;
    getItemCount(): number;
}

class MenuItem implements Menu {
    private readonly name: string;
    private readonly price: number;
    constructor(name: string, price: number) {
        this.name = name;
        this.price = price;
    }

    display(indent: string): void {
        console.log(`${indent}${this.name} - $${this.price.toFixed(2)}`);
    }

    getItemCount(): number { return 1; }
}

class SubMenu implements Menu {
    private name: string;
    private children: Menu[];

    constructor(name: string) {
        this.name = name;
        this.children = [];
    }

    addItem(item: Menu): void {
        this.children.push(item);
    }

    display(indent: string): void {
        console.log(`${indent}${this.name}:`);
        for (const child of this.children) {
            child.display(indent + "  ");
        }
    }

    getItemCount(): number {
        return this.children.reduce((sum, child) => sum + child.getItemCount(), 0);
    }
}

const burger = new MenuItem("Burger", 8.99);
const fries = new MenuItem("Fries", 3.99);
const cola = new MenuItem("Cola", 1.99);
const water = new MenuItem("Water", 0.99);

const drinks = new SubMenu("Drinks");
drinks.addItem(cola);
drinks.addItem(water);

const mainMenu = new SubMenu("Main Menu");
mainMenu.addItem(burger);
mainMenu.addItem(fries);
mainMenu.addItem(drinks);

mainMenu.display("");
console.log("\nTotal items: " + mainMenu.getItemCount());
```

---

# Exercise 2: HTML Element Tree

> [!PAYWALL] This content is for premium members only.

<!-- payload:lldCodingPracticeBlock:START {"id":"6991847b4bb44561316af6e1","title":"Design HTML Element Tree","difficulty":"medium","expectedOutput":"<div>\n  My List:\n  <ul>\n    <li>\n      Item 1\n    </li>\n    <li>\n      Item 2\n    </li>\n  </ul>\n</div>"} -->
**Problem:** Build a simplified HTML renderer. A `TextNode` is a leaf containing plain text. An `HtmlElement` is a composite representing a tag (like `div`, `ul`, `li`) that can contain text nodes and other elements.

**Requirements:**

- Component interface: `HtmlNode` with `render(indent)` returning a String
- Leaf: `TextNode` stores plain text. `render()` returns the text with the given indentation.
- Composite: `HtmlElement` has a tag name. `render()` produces properly nested HTML with opening and closing tags.

```java
interface HtmlNode {
    String render(String indent);
}

class TextNode implements HtmlNode {
    private final String text;

    public TextNode(String text) { this.text = text; }

    @Override
    public String render(String indent) {
        return indent + text;
    }
}

class HtmlElement implements HtmlNode {
    // TODO: Add a field to store the tag name (String)
    // TODO: Add a field to store the list of HtmlNode children (List<HtmlNode>)

    public HtmlElement(String tag) {
        // TODO: Store the tag and initialize the children list
    }

    public void addChild(HtmlNode child) {
        // TODO: Add the given child to the children list
    }

    @Override
    public String render(String indent) {
        // TODO: Start with indent + "<tag>\n"
        // TODO: Loop through children, appending child.render(indent + "  ") + "\n"
        // TODO: End with indent + "</tag>"
        // TODO: Return the built string
        return "";
    }
}

public class Main {
    public static void main(String[] args) {
        // HtmlElement li1 = new HtmlElement("li");
        // li1.addChild(new TextNode("Item 1"));

        // HtmlElement li2 = new HtmlElement("li");
        // li2.addChild(new TextNode("Item 2"));

        // HtmlElement ul = new HtmlElement("ul");
        // ul.addChild(li1);
        // ul.addChild(li2);

        // HtmlElement div = new HtmlElement("div");
        // div.addChild(new TextNode("My List:"));
        // div.addChild(ul);

        // System.out.println(div.render(""));
    }
}
```

```python
from abc import ABC, abstractmethod

class HtmlNode(ABC):
    @abstractmethod
    def render(self, indent: str) -> str:
        pass

class TextNode(HtmlNode):
    def __init__(self, text: str):
        self.text = text

    def render(self, indent: str) -> str:
        return indent + self.text

class HtmlElement(HtmlNode):
    def __init__(self, tag: str):
        # TODO: Store the tag
        # TODO: Initialize an empty list of HtmlNode children
        pass

    def add_child(self, child: HtmlNode):
        # TODO: Add the given child to the children list
        pass

    def render(self, indent: str) -> str:
        # TODO: Start with indent + "<tag>\n"
        # TODO: Loop through children, appending child.render(indent + "  ") + "\n"
        # TODO: End with indent + "</tag>"
        # TODO: Return the built string
        return ""

if __name__ == "__main__":
    pass
    # li1 = HtmlElement("li")
    # li1.add_child(TextNode("Item 1"))

    # li2 = HtmlElement("li")
    # li2.add_child(TextNode("Item 2"))

    # ul = HtmlElement("ul")
    # ul.add_child(li1)
    # ul.add_child(li2)

    # div = HtmlElement("div")
    # div.add_child(TextNode("My List:"))
    # div.add_child(ul)

    # print(div.render(""))
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class HtmlNode {
public:
    virtual string render(string indent) = 0;
    virtual ~HtmlNode() {}
};

class TextNode : public HtmlNode {
private:
    string text;

public:
    TextNode(string text) : text(text) {}

    string render(string indent) override {
        return indent + text;
    }
};

class HtmlElement : public HtmlNode {
    // TODO: Add a field to store the tag name (string)
    // TODO: Add a field to store the list of HtmlNode* children (vector<HtmlNode*>)

public:
    HtmlElement(string tag) {
        // TODO: Store the tag
    }

    void addChild(HtmlNode* child) {
        // TODO: Add the given child to the children list
    }

    string render(string indent) override {
        // TODO: Start with indent + "<tag>\n"
        // TODO: Loop through children, appending child->render(indent + "  ") + "\n"
        // TODO: End with indent + "</tag>"
        // TODO: Return the built string
        return "";
    }
};

int main() {
    // HtmlElement li1("li");
    // li1.addChild(new TextNode("Item 1"));

    // HtmlElement li2("li");
    // li2.addChild(new TextNode("Item 2"));

    // HtmlElement ul("ul");
    // ul.addChild(&li1);
    // ul.addChild(&li2);

    // HtmlElement div("div");
    // div.addChild(new TextNode("My List:"));
    // div.addChild(&ul);

    // cout << div.render("") << endl;

    return 0;
}
```

```go
package main

type HtmlNode interface {
	Render(indent string) string
}

type TextNode struct {
	text string
}

func NewTextNode(text string) *TextNode {
	return &TextNode{text: text}
}

func (t *TextNode) Render(indent string) string {
	return indent + t.text
}

type HtmlElement struct {
	// TODO: Add a field to store the tag name (string)
	// TODO: Add a field to store the list of HtmlNode children ([]HtmlNode)
}

func NewHtmlElement(tag string) *HtmlElement {
	// TODO: Store the tag and initialize the children list
	return &HtmlElement{}
}

func (h *HtmlElement) AddChild(child HtmlNode) {
	// TODO: Add the given child to the children list
}

func (h *HtmlElement) Render(indent string) string {
	// TODO: Start with indent + "<tag>\n"
	// TODO: Loop through children, appending child.Render(indent + "  ") + "\n"
	// TODO: End with indent + "</tag>"
	// TODO: Return the built string
	return ""
}

func main() {
	// li1 := NewHtmlElement("li")
	// li1.AddChild(NewTextNode("Item 1"))

	// li2 := NewHtmlElement("li")
	// li2.AddChild(NewTextNode("Item 2"))

	// ul := NewHtmlElement("ul")
	// ul.AddChild(li1)
	// ul.AddChild(li2)

	// div := NewHtmlElement("div")
	// div.AddChild(NewTextNode("My List:"))
	// div.AddChild(ul)

	// println(div.Render(""))
}
```

```csharp
using System;
using System.Collections.Generic;

interface IHtmlNode
{
    string Render(string indent);
}

class TextNode : IHtmlNode
{
    private readonly string text;

    public TextNode(string text) { this.text = text; }

    public string Render(string indent) { return indent + text; }
}

class HtmlElement : IHtmlNode
{
    // TODO: Add a field to store the tag name (string)
    // TODO: Add a field to store the list of IHtmlNode children (List<IHtmlNode>)

    public HtmlElement(string tag)
    {
        // TODO: Store the tag and initialize the children list
    }

    public void AddChild(IHtmlNode child)
    {
        // TODO: Add the given child to the children list
    }

    public string Render(string indent)
    {
        // TODO: Start with indent + "<tag>\n"
        // TODO: Loop through children, appending child.Render(indent + "  ") + "\n"
        // TODO: End with indent + "</tag>"
        // TODO: Return the built string
        return "";
    }
}

public class Program
{
    public static void Main()
    {
        // var li1 = new HtmlElement("li");
        // li1.AddChild(new TextNode("Item 1"));

        // var li2 = new HtmlElement("li");
        // li2.AddChild(new TextNode("Item 2"));

        // var ul = new HtmlElement("ul");
        // ul.AddChild(li1);
        // ul.AddChild(li2);

        // var div = new HtmlElement("div");
        // div.AddChild(new TextNode("My List:"));
        // div.AddChild(ul);

        // Console.WriteLine(div.Render(""));
    }
}
```

```typescript
interface HtmlNode {
    render(indent: string): string;
}

class TextNode implements HtmlNode {
    private readonly text: string;
    constructor(text: string) {
        this.text = text;
    }

    render(indent: string): string {
        return indent + this.text;
    }
}

class HtmlElement implements HtmlNode {
    // TODO: Add a field to store the tag name (string)
    // TODO: Add a field to store the list of HtmlNode children (HtmlNode[])

    constructor(tag: string) {
        // TODO: Store the tag and initialize the children array
    }

    addChild(child: HtmlNode): void {
        // TODO: Add the given child to the children array
    }

    render(indent: string): string {
        // TODO: Start with indent + "<tag>\n"
        // TODO: Loop through children, appending child.render(indent + "  ") + "\n"
        // TODO: End with indent + "</tag>"
        // TODO: Return the built string
        return "";
    }
}

// const li1 = new HtmlElement("li");
// li1.addChild(new TextNode("Item 1"));

// const li2 = new HtmlElement("li");
// li2.addChild(new TextNode("Item 2"));

// const ul = new HtmlElement("ul");
// ul.addChild(li1);
// ul.addChild(li2);

// const div = new HtmlElement("div");
// div.addChild(new TextNode("My List:"));
// div.addChild(ul);

// console.log(div.render(""));
```

#### Solutions

```java
interface HtmlNode {
    String render(String indent);
}

class TextNode implements HtmlNode {
    private final String text;

    public TextNode(String text) { this.text = text; }

    @Override
    public String render(String indent) {
        return indent + text;
    }
}

class HtmlElement implements HtmlNode {
    private final String tag;
    private final java.util.List<HtmlNode> children;

    public HtmlElement(String tag) {
        this.tag = tag;
        this.children = new java.util.ArrayList<>();
    }

    public void addChild(HtmlNode child) {
        children.add(child);
    }

    @Override
    public String render(String indent) {
        StringBuilder sb = new StringBuilder();
        sb.append(indent).append("<").append(tag).append(">\n");
        for (HtmlNode child : children) {
            sb.append(child.render(indent + "  ")).append("\n");
        }
        sb.append(indent).append("</").append(tag).append(">");
        return sb.toString();
    }
}

public class Main {
    public static void main(String[] args) {
        HtmlElement li1 = new HtmlElement("li");
        li1.addChild(new TextNode("Item 1"));

        HtmlElement li2 = new HtmlElement("li");
        li2.addChild(new TextNode("Item 2"));

        HtmlElement ul = new HtmlElement("ul");
        ul.addChild(li1);
        ul.addChild(li2);

        HtmlElement div = new HtmlElement("div");
        div.addChild(new TextNode("My List:"));
        div.addChild(ul);

        System.out.println(div.render(""));
    }
}
```

```python
from abc import ABC, abstractmethod

class HtmlNode(ABC):
    @abstractmethod
    def render(self, indent: str) -> str:
        pass

class TextNode(HtmlNode):
    def __init__(self, text: str):
        self.text = text

    def render(self, indent: str) -> str:
        return indent + self.text

class HtmlElement(HtmlNode):
    def __init__(self, tag: str):
        self.tag = tag
        self.children: list[HtmlNode] = []

    def add_child(self, child: HtmlNode):
        self.children.append(child)

    def render(self, indent: str) -> str:
        result = f"{indent}<{self.tag}>\n"
        for child in self.children:
            result += child.render(indent + "  ") + "\n"
        result += f"{indent}</{self.tag}>"
        return result

if __name__ == "__main__":
    li1 = HtmlElement("li")
    li1.add_child(TextNode("Item 1"))

    li2 = HtmlElement("li")
    li2.add_child(TextNode("Item 2"))

    ul = HtmlElement("ul")
    ul.add_child(li1)
    ul.add_child(li2)

    div = HtmlElement("div")
    div.add_child(TextNode("My List:"))
    div.add_child(ul)

    print(div.render(""))
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class HtmlNode {
public:
    virtual string render(string indent) = 0;
    virtual ~HtmlNode() {}
};

class TextNode : public HtmlNode {
private:
    string text;

public:
    TextNode(string text) : text(text) {}

    string render(string indent) override {
        return indent + text;
    }
};

class HtmlElement : public HtmlNode {
    string tag;
    vector<HtmlNode*> children;

public:
    HtmlElement(string tag) : tag(tag) {}

    void addChild(HtmlNode* child) {
        children.push_back(child);
    }

    string render(string indent) override {
        string result = indent + "<" + tag + ">\n";
        for (auto child : children) {
            result += child->render(indent + "  ") + "\n";
        }
        result += indent + "</" + tag + ">";
        return result;
    }
};

int main() {
    HtmlElement li1("li");
    li1.addChild(new TextNode("Item 1"));

    HtmlElement li2("li");
    li2.addChild(new TextNode("Item 2"));

    HtmlElement ul("ul");
    ul.addChild(&li1);
    ul.addChild(&li2);

    HtmlElement div("div");
    div.addChild(new TextNode("My List:"));
    div.addChild(&ul);

    cout << div.render("") << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type HtmlNode interface {
	Render(indent string) string
}

type TextNode struct {
	text string
}

func NewTextNode(text string) *TextNode {
	return &TextNode{text: text}
}

func (t *TextNode) Render(indent string) string {
	return indent + t.text
}

type HtmlElement struct {
	tag      string
	children  []HtmlNode
}

func NewHtmlElement(tag string) *HtmlElement {
	return &HtmlElement{
		tag:     tag,
		children: make([]HtmlNode, 0),
	}
}

func (h *HtmlElement) AddChild(child HtmlNode) {
	h.children = append(h.children, child)
}

func (h *HtmlElement) Render(indent string) string {
	var sb strings.Builder
	sb.WriteString(indent)
	sb.WriteString("<")
	sb.WriteString(h.tag)
	sb.WriteString(">\n")

	for _, child := range h.children {
		sb.WriteString(child.Render(indent + "  "))
		sb.WriteString("\n")
	}

	sb.WriteString(indent)
	sb.WriteString("</")
	sb.WriteString(h.tag)
	sb.WriteString(">")
	return sb.String()
}

func main() {
	li1 := NewHtmlElement("li")
	li1.AddChild(NewTextNode("Item 1"))

	li2 := NewHtmlElement("li")
	li2.AddChild(NewTextNode("Item 2"))

	ul := NewHtmlElement("ul")
	ul.AddChild(li1)
	ul.AddChild(li2)

	div := NewHtmlElement("div")
	div.AddChild(NewTextNode("My List:"))
	div.AddChild(ul)

	fmt.Println(div.Render(""))
}
```

```csharp
using System;
using System.Collections.Generic;

interface IHtmlNode
{
    string Render(string indent);
}

class TextNode : IHtmlNode
{
    private readonly string text;

    public TextNode(string text) { this.text = text; }

    public string Render(string indent) { return indent + text; }
}

class HtmlElement : IHtmlNode
{
    private readonly string tag;
    private readonly List<IHtmlNode> children;

    public HtmlElement(string tag)
    {
        this.tag = tag;
        this.children = new List<IHtmlNode>();
    }

    public void AddChild(IHtmlNode child)
    {
        children.Add(child);
    }

    public string Render(string indent)
    {
        string result = indent + "<" + tag + ">\n";
        foreach (var child in children)
        {
            result += child.Render(indent + "  ") + "\n";
        }
        result += indent + "</" + tag + ">";
        return result;
    }
}

public class Program
{
    public static void Main()
    {
        var li1 = new HtmlElement("li");
        li1.AddChild(new TextNode("Item 1"));

        var li2 = new HtmlElement("li");
        li2.AddChild(new TextNode("Item 2"));

        var ul = new HtmlElement("ul");
        ul.AddChild(li1);
        ul.AddChild(li2);

        var div = new HtmlElement("div");
        div.AddChild(new TextNode("My List:"));
        div.AddChild(ul);

        Console.WriteLine(div.Render(""));
    }
}
```

```typescript
interface HtmlNode {
    render(indent: string): string;
}

class TextNode implements HtmlNode {
    private readonly text: string;
    constructor(text: string) {
        this.text = text;
    }

    render(indent: string): string {
        return indent + this.text;
    }
}

class HtmlElement implements HtmlNode {
    private tag: string;
    private children: HtmlNode[];

    constructor(tag: string) {
        this.tag = tag;
        this.children = [];
    }

    addChild(child: HtmlNode): void {
        this.children.push(child);
    }

    render(indent: string): string {
        let result = `${indent}<${this.tag}>\n`;
        for (const child of this.children) {
            result += child.render(indent + "  ") + "\n";
        }
        result += `${indent}</${this.tag}>`;
        return result;
    }
}

const li1 = new HtmlElement("li");
li1.addChild(new TextNode("Item 1"));

const li2 = new HtmlElement("li");
li2.addChild(new TextNode("Item 2"));

const ul = new HtmlElement("ul");
ul.addChild(li1);
ul.addChild(li2);

const div = new HtmlElement("div");
div.addChild(new TextNode("My List:"));
div.addChild(ul);

console.log(div.render(""));
```

---

# Exercise 3: Expression Tree

**Problem:** Build an arithmetic expression evaluator using Composite. A `NumberExpression` is a leaf holding a numeric value. A `BinaryExpression` is a composite with an operator (`+`, `-`, `*`, `/`) and two child expressions.

**Requirements:**

- Component interface: `Expression` with `evaluate()` returning a double and `toString()` returning a readable string
- Leaf: `NumberExpression` stores a value. `evaluate()` returns it. `toString()` returns the number as a string.
- Composite: `BinaryExpression` has an operator and two children (left, right). `evaluate()` applies the operator. `toString()` returns `(left op right)`.

```java
interface Expression {
    double evaluate();
    String toExprString();
}

class NumberExpression implements Expression {
    private final double value;

    public NumberExpression(double value) { this.value = value; }

    @Override
    public double evaluate() { return value; }

    @Override
    public String toExprString() {
        if (value == (int) value) return String.valueOf((int) value);
        return String.valueOf(value);
    }
}

class BinaryExpression implements Expression {
    // TODO: Add a field to store the operator (char)
    // TODO: Add a field to store the left Expression
    // TODO: Add a field to store the right Expression

    public BinaryExpression(char operator, Expression left, Expression right) {
        // TODO: Store the operator, left, and right
    }

    @Override
    public double evaluate() {
        // TODO: Use a switch on the operator:
        //   '+' -> left.evaluate() + right.evaluate()
        //   '-' -> left.evaluate() - right.evaluate()
        //   '*' -> left.evaluate() * right.evaluate()
        //   '/' -> left.evaluate() / right.evaluate()
        return 0;
    }

    @Override
    public String toExprString() {
        // TODO: Return "(" + left.toExprString() + " " + operator + " " + right.toExprString() + ")"
        return "";
    }
}

public class Main {
    public static void main(String[] args) {
        // Expression expr = new BinaryExpression('+',
        //     new BinaryExpression('*',
        //         new NumberExpression(3),
        //         new NumberExpression(4)),
        //     new NumberExpression(5));

        // System.out.println(expr.toExprString() + " = " + expr.evaluate());

        // Expression expr2 = new BinaryExpression('*',
        //     new BinaryExpression('+',
        //         new NumberExpression(2),
        //         new NumberExpression(3)),
        //     new BinaryExpression('-',
        //         new NumberExpression(10),
        //         new NumberExpression(4)));

        // System.out.println(expr2.toExprString() + " = " + expr2.evaluate());
    }
}
```

```python
from abc import ABC, abstractmethod

class Expression(ABC):
    @abstractmethod
    def evaluate(self) -> float:
        pass

    @abstractmethod
    def to_expr_string(self) -> str:
        pass

class NumberExpression(Expression):
    def __init__(self, value: float):
        self.value = value

    def evaluate(self) -> float:
        return self.value

    def to_expr_string(self) -> str:
        if self.value == int(self.value):
            return str(int(self.value))
        return str(self.value)

class BinaryExpression(Expression):
    def __init__(self, operator: str, left: Expression, right: Expression):
        # TODO: Store the operator, left, and right
        pass

    def evaluate(self) -> float:
        # TODO: Check the operator and compute:
        #   '+' -> left.evaluate() + right.evaluate()
        #   '-' -> left.evaluate() - right.evaluate()
        #   '*' -> left.evaluate() * right.evaluate()
        #   '/' -> left.evaluate() / right.evaluate()
        return 0

    def to_expr_string(self) -> str:
        # TODO: Return "(" + left.to_expr_string() + " " + operator + " " + right.to_expr_string() + ")"
        return ""

if __name__ == "__main__":
    pass
    # expr = BinaryExpression('+',
    #     BinaryExpression('*',
    #         NumberExpression(3),
    #         NumberExpression(4)),
    #     NumberExpression(5))

    # print(f"{expr.to_expr_string()} = {expr.evaluate()}")

    # expr2 = BinaryExpression('*',
    #     BinaryExpression('+',
    #         NumberExpression(2),
    #         NumberExpression(3)),
    #     BinaryExpression('-',
    #         NumberExpression(10),
    #         NumberExpression(4)))

    # print(f"{expr2.to_expr_string()} = {expr2.evaluate()}")
```

```cpp
#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

class Expression {
public:
    virtual double evaluate() = 0;
    virtual string toExprString() = 0;
    virtual ~Expression() {}
};

class NumberExpression : public Expression {
private:
    double value;

public:
    NumberExpression(double value) : value(value) {}

    double evaluate() override { return value; }

    string toExprString() override {
        if (value == (int)value) return to_string((int)value);
        return to_string(value);
    }
};

class BinaryExpression : public Expression {
    // TODO: Add a field to store the operator (char)
    // TODO: Add a field to store the left Expression* child
    // TODO: Add a field to store the right Expression* child

public:
    BinaryExpression(char op, Expression* left, Expression* right) {
        // TODO: Store the operator, left, and right
    }

    double evaluate() override {
        // TODO: Use a switch on the operator:
        //   '+' -> left->evaluate() + right->evaluate()
        //   '-' -> left->evaluate() - right->evaluate()
        //   '*' -> left->evaluate() * right->evaluate()
        //   '/' -> left->evaluate() / right->evaluate()
        return 0;
    }

    string toExprString() override {
        // TODO: Return "(" + left->toExprString() + " " + op + " " + right->toExprString() + ")"
        return "";
    }
};

int main() {
    // auto expr = new BinaryExpression('+',
    //     new BinaryExpression('*',
    //         new NumberExpression(3),
    //         new NumberExpression(4)),
    //     new NumberExpression(5));

    // cout << expr->toExprString() << " = " << fixed << setprecision(1) << expr->evaluate() << endl;
    return 0;
}
```

```go
package main

type Expression interface {
	Evaluate() float64
	ToExprString() string
}

type NumberExpression struct {
	value float64
}

func NewNumberExpression(value float64) *NumberExpression {
	return &NumberExpression{value: value}
}

func (n *NumberExpression) Evaluate() float64 {
	return n.value
}

func (n *NumberExpression) ToExprString() string {
	if n.value == float64(int(n.value)) {
		return formatInt(int(n.value))
	}
	return formatFloat(n.value)
}

type BinaryExpression struct {
	// TODO: Add a field to store the operator (rune)
	// TODO: Add a field to store the left Expression child
	// TODO: Add a field to store the right Expression child

	operator rune
	left     Expression
	right    Expression
}

func NewBinaryExpression(operator rune, left Expression, right Expression) *BinaryExpression {
	// TODO: Store the operator, left, and right
	return &BinaryExpression{
		operator: operator,
		left:     left,
		right:    right,
	}
}

func (b *BinaryExpression) Evaluate() float64 {
	// TODO: Use a switch on the operator:
	//   '+' -> left.Evaluate() + right.Evaluate()
	//   '-' -> left.Evaluate() - right.Evaluate()
	//   '*' -> left.Evaluate() * right.Evaluate()
	//   '/' -> left.Evaluate() / right.Evaluate()
	return 0
}

func (b *BinaryExpression) ToExprString() string {
	// TODO: Return "(" + left.ToExprString() + " " + operator + " " + right.ToExprString() + ")"
	return ""
}

func formatInt(value int) string {
	return string(rune(0))
}

func formatFloat(value float64) string {
	return string(rune(0))
}

func main() {
	// expr := NewBinaryExpression('+',
	// 	NewBinaryExpression('*',
	// 		NewNumberExpression(3),
	// 		NewNumberExpression(4)),
	// 	NewNumberExpression(5))

	// println(expr.ToExprString() + " = " + expr.Evaluate())

	// expr2 := NewBinaryExpression('*',
	// 	NewBinaryExpression('+',
	// 		NewNumberExpression(2),
	// 		NewNumberExpression(3)),
	// 	NewBinaryExpression('-',
	// 		NewNumberExpression(10),
	// 		NewNumberExpression(4)))

	// println(expr2.ToExprString() + " = " + expr2.Evaluate())
}
```

```csharp
using System;

interface IExpression
{
    double Evaluate();
    string ToExprString();
}

class NumberExpression : IExpression
{
    private readonly double value;

    public NumberExpression(double value) { this.value = value; }

    public double Evaluate() { return value; }

    public string ToExprString()
    {
        if (value == (int)value) return ((int)value).ToString();
        return value.ToString();
    }
}

class BinaryExpression : IExpression
{
    // TODO: Add a field to store the operator (char)
    // TODO: Add a field to store the left IExpression child
    // TODO: Add a field to store the right IExpression child

    public BinaryExpression(char op, IExpression left, IExpression right)
    {
        // TODO: Store the operator, left, and right
    }

    public double Evaluate()
    {
        // TODO: Use a switch on the operator:
        //   '+' -> left.Evaluate() + right.Evaluate()
        //   '-' -> left.Evaluate() - right.Evaluate()
        //   '*' -> left.Evaluate() * right.Evaluate()
        //   '/' -> left.Evaluate() / right.Evaluate()
        return 0;
    }

    public string ToExprString()
    {
        // TODO: Return "(" + left.ToExprString() + " " + op + " " + right.ToExprString() + ")"
        return "";
    }
}

public class Program
{
    public static void Main()
    {
        // var expr = new BinaryExpression('+',
        //     new BinaryExpression('*',
        //         new NumberExpression(3),
        //         new NumberExpression(4)),
        //     new NumberExpression(5));

        // Console.WriteLine(expr.ToExprString() + " = " + expr.Evaluate().ToString("F1"));
    }
}
```

```typescript
interface Expression {
    evaluate(): number;
    toExprString(): string;
}

class NumberExpression implements Expression {
    private readonly value: number;
    constructor(value: number) {
        this.value = value;
    }

    evaluate(): number { return this.value; }

    toExprString(): string {
        if (this.value === Math.floor(this.value)) return this.value.toFixed(0);
        return this.value.toString();
    }
}

class BinaryExpression implements Expression {
    // TODO: Add a field to store the operator (string)
    // TODO: Add a field to store the left Expression child
    // TODO: Add a field to store the right Expression child

    constructor(operator: string, left: Expression, right: Expression) {
        // TODO: Store the operator, left, and right
    }

    evaluate(): number {
        // TODO: Use a switch on the operator:
        //   '+' -> left.evaluate() + right.evaluate()
        //   '-' -> left.evaluate() - right.evaluate()
        //   '*' -> left.evaluate() * right.evaluate()
        //   '/' -> left.evaluate() / right.evaluate()
        return 0;
    }

    toExprString(): string {
        // TODO: Return "(" + left.toExprString() + " " + operator + " " + right.toExprString() + ")"
        return "";
    }
}

// const expr = new BinaryExpression('+',
//     new BinaryExpression('*',
//         new NumberExpression(3),
//         new NumberExpression(4)),
//     new NumberExpression(5));

// console.log(expr.toExprString() + " = " + expr.evaluate().toFixed(1));
```

#### Solutions

```java
interface Expression {
    double evaluate();
    String toExprString();
}

class NumberExpression implements Expression {
    private final double value;

    public NumberExpression(double value) { this.value = value; }

    @Override
    public double evaluate() { return value; }

    @Override
    public String toExprString() {
        if (value == (int) value) return String.valueOf((int) value);
        return String.valueOf(value);
    }
}

class BinaryExpression implements Expression {
    private final char operator;
    private final Expression left;
    private final Expression right;

    public BinaryExpression(char operator, Expression left, Expression right) {
        this.operator = operator;
        this.left = left;
        this.right = right;
    }

    @Override
    public double evaluate() {
        switch (operator) {
            case '+': return left.evaluate() + right.evaluate();
            case '-': return left.evaluate() - right.evaluate();
            case '*': return left.evaluate() * right.evaluate();
            case '/': return left.evaluate() / right.evaluate();
            default: throw new IllegalArgumentException("Unknown operator: " + operator);
        }
    }

    @Override
    public String toExprString() {
        return "(" + left.toExprString() + " " + operator + " " + right.toExprString() + ")";
    }
}

public class Main {
    public static void main(String[] args) {
        Expression expr = new BinaryExpression('+',
            new BinaryExpression('*',
                new NumberExpression(3),
                new NumberExpression(4)),
            new NumberExpression(5));

        System.out.println(expr.toExprString() + " = " + expr.evaluate());

        Expression expr2 = new BinaryExpression('*',
            new BinaryExpression('+',
                new NumberExpression(2),
                new NumberExpression(3)),
            new BinaryExpression('-',
                new NumberExpression(10),
                new NumberExpression(4)));

        System.out.println(expr2.toExprString() + " = " + expr2.evaluate());
    }
}
```

```python
from abc import ABC, abstractmethod

class Expression(ABC):
    @abstractmethod
    def evaluate(self) -> float:
        pass

    @abstractmethod
    def to_expr_string(self) -> str:
        pass

class NumberExpression(Expression):
    def __init__(self, value: float):
        self.value = float(value)

    def evaluate(self) -> float:
        return self.value

    def to_expr_string(self) -> str:
        if self.value == int(self.value):
            return str(int(self.value))
        return str(self.value)

class BinaryExpression(Expression):
    def __init__(self, operator: str, left: Expression, right: Expression):
        self.operator = operator
        self.left = left
        self.right = right

    def evaluate(self) -> float:
        if self.operator == '+':
            return self.left.evaluate() + self.right.evaluate()
        elif self.operator == '-':
            return self.left.evaluate() - self.right.evaluate()
        elif self.operator == '*':
            return self.left.evaluate() * self.right.evaluate()
        elif self.operator == '/':
            return self.left.evaluate() / self.right.evaluate()
        raise ValueError(f"Unknown operator: {self.operator}")

    def to_expr_string(self) -> str:
        return f"({self.left.to_expr_string()} {self.operator} {self.right.to_expr_string()})"

if __name__ == "__main__":
    expr = BinaryExpression('+',
        BinaryExpression('*',
            NumberExpression(3),
            NumberExpression(4)),
        NumberExpression(5))

    print(f"{expr.to_expr_string()} = {expr.evaluate()}")

    expr2 = BinaryExpression('*',
        BinaryExpression('+',
            NumberExpression(2),
            NumberExpression(3)),
        BinaryExpression('-',
            NumberExpression(10),
            NumberExpression(4)))

    print(f"{expr2.to_expr_string()} = {expr2.evaluate()}")
```

```cpp
#include <iostream>
#include <string>
#include <iomanip>
using namespace std;

class Expression {
public:
    virtual double evaluate() = 0;
    virtual string toExprString() = 0;
    virtual ~Expression() {}
};

class NumberExpression : public Expression {
private:
    double value;

public:
    NumberExpression(double value) : value(value) {}

    double evaluate() override { return value; }

    string toExprString() override {
        if (value == (int)value) return to_string((int)value);
        return to_string(value);
    }
};

class BinaryExpression : public Expression {
    char op;
    Expression* left;
    Expression* right;

public:
    BinaryExpression(char op, Expression* left, Expression* right)
        : op(op), left(left), right(right) {}

    double evaluate() override {
        switch (op) {
            case '+': return left->evaluate() + right->evaluate();
            case '-': return left->evaluate() - right->evaluate();
            case '*': return left->evaluate() * right->evaluate();
            case '/': return left->evaluate() / right->evaluate();
            default: return 0;
        }
    }

    string toExprString() override {
        return "(" + left->toExprString() + " " + string(1, op) + " " + right->toExprString() + ")";
    }
};

int main() {
    auto expr = new BinaryExpression('+',
        new BinaryExpression('*',
            new NumberExpression(3),
            new NumberExpression(4)),
        new NumberExpression(5));

    cout << expr->toExprString() << " = " << fixed << setprecision(1) << expr->evaluate() << endl;

    auto expr2 = new BinaryExpression('*',
        new BinaryExpression('+',
            new NumberExpression(2),
            new NumberExpression(3)),
        new BinaryExpression('-',
            new NumberExpression(10),
            new NumberExpression(4)));

    cout << expr2->toExprString() << " = " << expr2->evaluate() << endl;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strconv"
)

type Expression interface {
	Evaluate() float64
	ToExprString() string
}

type NumberExpression struct {
	value float64
}

func NewNumberExpression(value float64) *NumberExpression {
	return &NumberExpression{value: value}
}

func (n *NumberExpression) Evaluate() float64 {
	return n.value
}

func (n *NumberExpression) ToExprString() string {
	if n.value == float64(int(n.value)) {
		return strconv.Itoa(int(n.value))
	}
	return strconv.FormatFloat(n.value, 'f', -1, 64)
}

type BinaryExpression struct {
	operator rune
	left     Expression
	right    Expression
}

func NewBinaryExpression(operator rune, left Expression, right Expression) *BinaryExpression {
	return &BinaryExpression{
		operator: operator,
		left:     left,
		right:    right,
	}
}

func (b *BinaryExpression) Evaluate() float64 {
	switch b.operator {
	case '+':
		return b.left.Evaluate() + b.right.Evaluate()
	case '-':
		return b.left.Evaluate() - b.right.Evaluate()
	case '*':
		return b.left.Evaluate() * b.right.Evaluate()
	case '/':
		return b.left.Evaluate() / b.right.Evaluate()
	default:
		panic(fmt.Sprintf("Unknown operator: %c", b.operator))
	}
}

func (b *BinaryExpression) ToExprString() string {
	return "(" + b.left.ToExprString() + " " + string(b.operator) + " " + b.right.ToExprString() + ")"
}

func main() {
	expr := NewBinaryExpression('+',
		NewBinaryExpression('*',
			NewNumberExpression(3),
			NewNumberExpression(4)),
		NewNumberExpression(5))

	fmt.Println(expr.ToExprString() + " = " + strconv.FormatFloat(expr.Evaluate(), 'f', -1, 64))

	expr2 := NewBinaryExpression('*',
		NewBinaryExpression('+',
			NewNumberExpression(2),
			NewNumberExpression(3)),
		NewBinaryExpression('-',
			NewNumberExpression(10),
			NewNumberExpression(4)))

	fmt.Println(expr2.ToExprString() + " = " + strconv.FormatFloat(expr2.Evaluate(), 'f', -1, 64))
}
```

```csharp
using System;

interface IExpression
{
    double Evaluate();
    string ToExprString();
}

class NumberExpression : IExpression
{
    private readonly double value;

    public NumberExpression(double value) { this.value = value; }

    public double Evaluate() { return value; }

    public string ToExprString()
    {
        if (value == (int)value) return ((int)value).ToString();
        return value.ToString();
    }
}

class BinaryExpression : IExpression
{
    private readonly char op;
    private readonly IExpression left;
    private readonly IExpression right;

    public BinaryExpression(char op, IExpression left, IExpression right)
    {
        this.op = op;
        this.left = left;
        this.right = right;
    }

    public double Evaluate()
    {
        switch (op)
        {
            case '+': return left.Evaluate() + right.Evaluate();
            case '-': return left.Evaluate() - right.Evaluate();
            case '*': return left.Evaluate() * right.Evaluate();
            case '/': return left.Evaluate() / right.Evaluate();
            default: throw new InvalidOperationException("Unknown operator: " + op);
        }
    }

    public string ToExprString()
    {
        return "(" + left.ToExprString() + " " + op + " " + right.ToExprString() + ")";
    }
}

public class Program
{
    public static void Main()
    {
        var expr = new BinaryExpression('+',
            new BinaryExpression('*',
                new NumberExpression(3),
                new NumberExpression(4)),
            new NumberExpression(5));

        Console.WriteLine(expr.ToExprString() + " = " + expr.Evaluate().ToString("F1"));

        var expr2 = new BinaryExpression('*',
            new BinaryExpression('+',
                new NumberExpression(2),
                new NumberExpression(3)),
            new BinaryExpression('-',
                new NumberExpression(10),
                new NumberExpression(4)));

        Console.WriteLine(expr2.ToExprString() + " = " + expr2.Evaluate().ToString("F1"));
    }
}
```

```typescript
interface Expression {
    evaluate(): number;
    toExprString(): string;
}

class NumberExpression implements Expression {
    private readonly value: number;
    constructor(value: number) {
        this.value = value;
    }

    evaluate(): number { return this.value; }

    toExprString(): string {
        if (this.value === Math.floor(this.value)) return this.value.toFixed(0);
        return this.value.toString();
    }
}

class BinaryExpression implements Expression {
    private op: string;
    private left: Expression;
    private right: Expression;

    constructor(operator: string, left: Expression, right: Expression) {
        this.op = operator;
        this.left = left;
        this.right = right;
    }

    evaluate(): number {
        switch (this.op) {
            case '+': return this.left.evaluate() + this.right.evaluate();
            case '-': return this.left.evaluate() - this.right.evaluate();
            case '*': return this.left.evaluate() * this.right.evaluate();
            case '/': return this.left.evaluate() / this.right.evaluate();
            default: throw new Error("Unknown operator: " + this.op);
        }
    }

    toExprString(): string {
        return "(" + this.left.toExprString() + " " + this.op + " " + this.right.toExprString() + ")";
    }
}

const expr = new BinaryExpression('+',
    new BinaryExpression('*',
        new NumberExpression(3),
        new NumberExpression(4)),
    new NumberExpression(5));

console.log(expr.toExprString() + " = " + expr.evaluate().toFixed(1));

const expr2 = new BinaryExpression('*',
    new BinaryExpression('+',
        new NumberExpression(2),
        new NumberExpression(3)),
    new BinaryExpression('-',
        new NumberExpression(10),
        new NumberExpression(4)));

console.log(expr2.toExprString() + " = " + expr2.evaluate().toFixed(1));
```


