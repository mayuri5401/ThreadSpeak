---
id: "lld-design-patterns-exercise-command-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Command Design Pattern"
slug: "lld-design-patterns-exercise-command-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.\\"
eli10: "Imagine Exercise: Command Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Command Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.\

---

# Exercise 1: Restaurant Order System

Build a restaurant order system where a waiter (invoker) takes orders and can cancel them. A `Kitchen` receiver prepares and cancels dishes. `PlaceOrderCommand` tells the kitchen to prepare a dish, and `CancelOrderCommand` tells it to cancel. Both commands support undo.

**Requirements:**

- `Kitchen` receiver with `prepareDish(dish)` and `cancelDish(dish)` methods
- `PlaceOrderCommand` that calls `prepareDish` on execute and `cancelDish` on undo
- `CancelOrderCommand` that calls `cancelDish` on execute and `prepareDish` on undo
- `Waiter` invoker with `takeOrder(command)`, `submitOrders()` (executes all queued commands), and `undoLast()`

```java
interface OrderCommand {
    void execute();
    void undo();
}

class Kitchen {
    public void prepareDish(String dish) {
        // TODO: Print "Preparing: [dish]"
    }

    public void cancelDish(String dish) {
        // TODO: Print "Cancelling: [dish]"
    }
}

class PlaceOrderCommand implements OrderCommand {
    // TODO: Add fields (kitchen, dish)

    public PlaceOrderCommand(Kitchen kitchen, String dish) {
        // TODO: Store receiver and dish
    }

    @Override
    public void execute() {
        // TODO: Call kitchen.prepareDish(dish)
    }

    @Override
    public void undo() {
        // TODO: Call kitchen.cancelDish(dish)
    }
}

class CancelOrderCommand implements OrderCommand {
    // TODO: Add fields (kitchen, dish)

    public CancelOrderCommand(Kitchen kitchen, String dish) {
        // TODO: Store receiver and dish
    }

    @Override
    public void execute() {
        // TODO: Call kitchen.cancelDish(dish)
    }

    @Override
    public void undo() {
        // TODO: Call kitchen.prepareDish(dish)
    }
}

class Waiter {
    // TODO: Add a pending queue and a history stack

    public void takeOrder(OrderCommand command) {
        // TODO: Add command to pending queue
    }

    public void submitOrders() {
        // TODO: Execute all pending commands, move them to history
    }

    public void undoLast() {
        // TODO: Pop the most recent command from history and call undo()
    }
}

public class Main {
    public static void main(String[] args) {
        // Kitchen kitchen = new Kitchen();
        // Waiter waiter = new Waiter();
        // waiter.takeOrder(new PlaceOrderCommand(kitchen, "Pasta"));
        // waiter.takeOrder(new PlaceOrderCommand(kitchen, "Salad"));
        // waiter.submitOrders();
        // waiter.takeOrder(new CancelOrderCommand(kitchen, "Salad"));
        // waiter.submitOrders();
        // waiter.undoLast(); // undo the cancellation
    }
}
```

```python
from abc import ABC, abstractmethod

class OrderCommand(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass

class Kitchen:
    def prepare_dish(self, dish):
        # TODO: Print "Preparing: [dish]"
        pass

    def cancel_dish(self, dish):
        # TODO: Print "Cancelling: [dish]"
        pass

class PlaceOrderCommand(OrderCommand):
    def __init__(self, kitchen, dish):
        # TODO: Store receiver and dish
        pass

    def execute(self):
        # TODO: Call kitchen.prepare_dish(dish)
        pass

    def undo(self):
        # TODO: Call kitchen.cancel_dish(dish)
        pass

class CancelOrderCommand(OrderCommand):
    def __init__(self, kitchen, dish):
        # TODO: Store receiver and dish
        pass

    def execute(self):
        # TODO: Call kitchen.cancel_dish(dish)
        pass

    def undo(self):
        # TODO: Call kitchen.prepare_dish(dish)
        pass

class Waiter:
    def __init__(self):
        # TODO: Initialize pending queue and history stack
        pass

    def take_order(self, command):
        # TODO: Add command to pending queue
        pass

    def submit_orders(self):
        # TODO: Execute all pending commands, move them to history
        pass

    def undo_last(self):
        # TODO: Pop the most recent command from history and call undo()
        pass

if __name__ == "__main__":
    # kitchen = Kitchen()
    # waiter = Waiter()
    # waiter.take_order(PlaceOrderCommand(kitchen, "Pasta"))
    # waiter.take_order(PlaceOrderCommand(kitchen, "Salad"))
    # waiter.submit_orders()
    # waiter.take_order(CancelOrderCommand(kitchen, "Salad"))
    # waiter.submit_orders()
    # waiter.undo_last()
    pass
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class OrderCommand {
public:
    virtual ~OrderCommand() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
};

class Kitchen {
public:
    void prepareDish(const string& dish) {
        // TODO: Print "Preparing: [dish]"
    }

    void cancelDish(const string& dish) {
        // TODO: Print "Cancelling: [dish]"
    }
};

class PlaceOrderCommand : public OrderCommand {
    // TODO: Add fields (kitchen, dish)
public:
    PlaceOrderCommand(Kitchen* kitchen, const string& dish) {
        // TODO: Store receiver and dish
    }

    void execute() override {
        // TODO: Call kitchen->prepareDish(dish)
    }

    void undo() override {
        // TODO: Call kitchen->cancelDish(dish)
    }
};

class CancelOrderCommand : public OrderCommand {
    // TODO: Add fields (kitchen, dish)
public:
    CancelOrderCommand(Kitchen* kitchen, const string& dish) {
        // TODO: Store receiver and dish
    }

    void execute() override {
        // TODO: Call kitchen->cancelDish(dish)
    }

    void undo() override {
        // TODO: Call kitchen->prepareDish(dish)
    }
};

class Waiter {
    // TODO: Add a pending queue and a history stack
public:
    void takeOrder(OrderCommand* command) {
        // TODO: Add command to pending queue
    }

    void submitOrders() {
        // TODO: Execute all pending commands, move them to history
    }

    void undoLast() {
        // TODO: Pop the most recent command from history and call undo()
    }
};

int main() {
    // Kitchen kitchen;
    // Waiter waiter;
    // waiter.takeOrder(new PlaceOrderCommand(&kitchen, "Pasta"));
    // waiter.takeOrder(new PlaceOrderCommand(&kitchen, "Salad"));
    // waiter.submitOrders();
    // waiter.takeOrder(new CancelOrderCommand(&kitchen, "Salad"));
    // waiter.submitOrders();
    // waiter.undoLast();
    return 0;
}
```

```go
package main

type OrderCommand interface {
	Execute()
	Undo()
}

type Kitchen struct {
}

func (k *Kitchen) PrepareDish(dish string) {
	// TODO: Print "Preparing: [dish]"
}

func (k *Kitchen) CancelDish(dish string) {
	// TODO: Print "Cancelling: [dish]"
}

type PlaceOrderCommand struct {
	// TODO: Add fields (kitchen, dish)
}

func NewPlaceOrderCommand(kitchen *Kitchen, dish string) *PlaceOrderCommand {
	// TODO: Store receiver and dish
	return &PlaceOrderCommand{}
}

func (c *PlaceOrderCommand) Execute() {
	// TODO: Call kitchen.PrepareDish(dish)
}

func (c *PlaceOrderCommand) Undo() {
	// TODO: Call kitchen.CancelDish(dish)
}

type CancelOrderCommand struct {
	// TODO: Add fields (kitchen, dish)
}

func NewCancelOrderCommand(kitchen *Kitchen, dish string) *CancelOrderCommand {
	// TODO: Store receiver and dish
	return &CancelOrderCommand{}
}

func (c *CancelOrderCommand) Execute() {
	// TODO: Call kitchen.CancelDish(dish)
}

func (c *CancelOrderCommand) Undo() {
	// TODO: Call kitchen.PrepareDish(dish)
}

type Waiter struct {
	// TODO: Add a pending queue and a history stack
}

func NewWaiter() *Waiter {
	// TODO: Initialize pending queue and history stack
	return &Waiter{}
}

func (w *Waiter) TakeOrder(command OrderCommand) {
	// TODO: Add command to pending queue
}

func (w *Waiter) SubmitOrders() {
	// TODO: Execute all pending commands, move them to history
}

func (w *Waiter) UndoLast() {
	// TODO: Pop the most recent command from history and call undo()
}

func main() {
	// kitchen := &Kitchen{}
	// waiter := NewWaiter()
	// waiter.TakeOrder(NewPlaceOrderCommand(kitchen, "Pasta"))
	// waiter.TakeOrder(NewPlaceOrderCommand(kitchen, "Salad"))
	// waiter.SubmitOrders()
	// waiter.TakeOrder(NewCancelOrderCommand(kitchen, "Salad"))
	// waiter.SubmitOrders()
	// waiter.UndoLast() // undo the cancellation
}
```

```csharp
using System;
using System.Collections.Generic;

interface IOrderCommand
{
    void Execute();
    void Undo();
}

class Kitchen
{
    public void PrepareDish(string dish)
    {
        // TODO: Print "Preparing: [dish]"
    }

    public void CancelDish(string dish)
    {
        // TODO: Print "Cancelling: [dish]"
    }
}

class PlaceOrderCommand : IOrderCommand
{
    // TODO: Add fields (kitchen, dish)

    public PlaceOrderCommand(Kitchen kitchen, string dish)
    {
        // TODO: Store receiver and dish
    }

    public void Execute()
    {
        // TODO: Call kitchen.PrepareDish(dish)
    }

    public void Undo()
    {
        // TODO: Call kitchen.CancelDish(dish)
    }
}

class CancelOrderCommand : IOrderCommand
{
    // TODO: Add fields (kitchen, dish)

    public CancelOrderCommand(Kitchen kitchen, string dish)
    {
        // TODO: Store receiver and dish
    }

    public void Execute()
    {
        // TODO: Call kitchen.CancelDish(dish)
    }

    public void Undo()
    {
        // TODO: Call kitchen.PrepareDish(dish)
    }
}

class Waiter
{
    // TODO: Add a pending queue and a history stack

    public void TakeOrder(IOrderCommand command)
    {
        // TODO: Add command to pending queue
    }

    public void SubmitOrders()
    {
        // TODO: Execute all pending commands, move them to history
    }

    public void UndoLast()
    {
        // TODO: Pop the most recent command from history and call Undo()
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Kitchen kitchen = new Kitchen();
        // Waiter waiter = new Waiter();
        // waiter.TakeOrder(new PlaceOrderCommand(kitchen, "Pasta"));
        // waiter.TakeOrder(new PlaceOrderCommand(kitchen, "Salad"));
        // waiter.SubmitOrders();
        // waiter.TakeOrder(new CancelOrderCommand(kitchen, "Salad"));
        // waiter.SubmitOrders();
        // waiter.UndoLast();
    }
}
```

```typescript
interface OrderCommand {
    execute(): void;
    undo(): void;
}

class Kitchen {
    prepareDish(dish: string): void {
        // TODO: Print "Preparing: " + dish
    }

    cancelDish(dish: string): void {
        // TODO: Print "Cancelling: " + dish
    }
}

class PlaceOrderCommand implements OrderCommand {
    private kitchen: Kitchen;
    private dish: string;

    constructor(kitchen: Kitchen, dish: string) {
        this.kitchen = kitchen;
        this.dish = dish;
    }

    execute(): void {
        // TODO: Call this.kitchen.prepareDish(this.dish)
    }

    undo(): void {
        // TODO: Call this.kitchen.cancelDish(this.dish)
    }
}

class CancelOrderCommand implements OrderCommand {
    private kitchen: Kitchen;
    private dish: string;

    constructor(kitchen: Kitchen, dish: string) {
        this.kitchen = kitchen;
        this.dish = dish;
    }

    execute(): void {
        // TODO: Call this.kitchen.cancelDish(this.dish)
    }

    undo(): void {
        // TODO: Call this.kitchen.prepareDish(this.dish)
    }
}

class Waiter {
    private pending: OrderCommand[] = [];
    private history: OrderCommand[] = [];

    takeOrder(command: OrderCommand): void {
        // TODO: Add command to pending queue
    }

    submitOrders(): void {
        // TODO: Execute all pending commands, move to history, clear pending
    }

    undoLast(): void {
        // TODO: Pop from history and call undo()
    }
}

// const kitchen = new Kitchen();
// const waiter = new Waiter();
// waiter.takeOrder(new PlaceOrderCommand(kitchen, "Pasta"));
// waiter.takeOrder(new PlaceOrderCommand(kitchen, "Salad"));
// waiter.submitOrders();
// waiter.takeOrder(new CancelOrderCommand(kitchen, "Salad"));
// waiter.submitOrders();
// waiter.undoLast();
```

#### Solutions

```java
import java.util.*;

interface OrderCommand {
    void execute();
    void undo();
}

class Kitchen {
    public void prepareDish(String dish) {
        System.out.println("Preparing: " + dish);
    }

    public void cancelDish(String dish) {
        System.out.println("Cancelling: " + dish);
    }
}

class PlaceOrderCommand implements OrderCommand {
    private Kitchen kitchen;
    private String dish;

    public PlaceOrderCommand(Kitchen kitchen, String dish) {
        this.kitchen = kitchen;
        this.dish = dish;
    }

    @Override
    public void execute() {
        kitchen.prepareDish(dish);
    }

    @Override
    public void undo() {
        kitchen.cancelDish(dish);
    }
}

class CancelOrderCommand implements OrderCommand {
    private Kitchen kitchen;
    private String dish;

    public CancelOrderCommand(Kitchen kitchen, String dish) {
        this.kitchen = kitchen;
        this.dish = dish;
    }

    @Override
    public void execute() {
        kitchen.cancelDish(dish);
    }

    @Override
    public void undo() {
        kitchen.prepareDish(dish);
    }
}

class Waiter {
    private List<OrderCommand> pending = new ArrayList<>();
    private Stack<OrderCommand> history = new Stack<>();

    public void takeOrder(OrderCommand command) {
        pending.add(command);
    }

    public void submitOrders() {
        for (OrderCommand cmd : pending) {
            cmd.execute();
            history.push(cmd);
        }
        pending.clear();
    }

    public void undoLast() {
        if (!history.isEmpty()) {
            history.pop().undo();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Kitchen kitchen = new Kitchen();
        Waiter waiter = new Waiter();
        waiter.takeOrder(new PlaceOrderCommand(kitchen, "Pasta"));
        waiter.takeOrder(new PlaceOrderCommand(kitchen, "Salad"));
        waiter.submitOrders();
        waiter.takeOrder(new CancelOrderCommand(kitchen, "Salad"));
        waiter.submitOrders();
        waiter.undoLast();
    }
}
```

```python
from abc import ABC, abstractmethod

class OrderCommand(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass

class Kitchen:
    def prepare_dish(self, dish):
        print(f"Preparing: {dish}")

    def cancel_dish(self, dish):
        print(f"Cancelling: {dish}")

class PlaceOrderCommand(OrderCommand):
    def __init__(self, kitchen, dish):
        self.kitchen = kitchen
        self.dish = dish

    def execute(self):
        self.kitchen.prepare_dish(self.dish)

    def undo(self):
        self.kitchen.cancel_dish(self.dish)

class CancelOrderCommand(OrderCommand):
    def __init__(self, kitchen, dish):
        self.kitchen = kitchen
        self.dish = dish

    def execute(self):
        self.kitchen.cancel_dish(self.dish)

    def undo(self):
        self.kitchen.prepare_dish(self.dish)

class Waiter:
    def __init__(self):
        self.pending = []
        self.history = []

    def take_order(self, command):
        self.pending.append(command)

    def submit_orders(self):
        for cmd in self.pending:
            cmd.execute()
            self.history.append(cmd)
        self.pending.clear()

    def undo_last(self):
        if self.history:
            self.history.pop().undo()

if __name__ == "__main__":
    kitchen = Kitchen()
    waiter = Waiter()
    waiter.take_order(PlaceOrderCommand(kitchen, "Pasta"))
    waiter.take_order(PlaceOrderCommand(kitchen, "Salad"))
    waiter.submit_orders()
    waiter.take_order(CancelOrderCommand(kitchen, "Salad"))
    waiter.submit_orders()
    waiter.undo_last()
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class OrderCommand {
public:
    virtual ~OrderCommand() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
};

class Kitchen {
public:
    void prepareDish(const string& dish) {
        cout << "Preparing: " << dish << endl;
    }

    void cancelDish(const string& dish) {
        cout << "Cancelling: " << dish << endl;
    }
};

class PlaceOrderCommand : public OrderCommand {
    Kitchen* kitchen;
    string dish;
public:
    PlaceOrderCommand(Kitchen* kitchen, const string& dish) : kitchen(kitchen), dish(dish) {}

    void execute() override { kitchen->prepareDish(dish); }
    void undo() override { kitchen->cancelDish(dish); }
};

class CancelOrderCommand : public OrderCommand {
    Kitchen* kitchen;
    string dish;
public:
    CancelOrderCommand(Kitchen* kitchen, const string& dish) : kitchen(kitchen), dish(dish) {}

    void execute() override { kitchen->cancelDish(dish); }
    void undo() override { kitchen->prepareDish(dish); }
};

class Waiter {
    vector<OrderCommand*> pending;
    vector<OrderCommand*> history;
public:
    void takeOrder(OrderCommand* command) {
        pending.push_back(command);
    }

    void submitOrders() {
        for (auto* cmd : pending) {
            cmd->execute();
            history.push_back(cmd);
        }
        pending.clear();
    }

    void undoLast() {
        if (!history.empty()) {
            history.back()->undo();
            history.pop_back();
        }
    }
};

int main() {
    Kitchen kitchen;
    Waiter waiter;
    waiter.takeOrder(new PlaceOrderCommand(&kitchen, "Pasta"));
    waiter.takeOrder(new PlaceOrderCommand(&kitchen, "Salad"));
    waiter.submitOrders();
    waiter.takeOrder(new CancelOrderCommand(&kitchen, "Salad"));
    waiter.submitOrders();
    waiter.undoLast();
    return 0;
}
```

```go
package main

import "fmt"

type OrderCommand interface {
	Execute()
	Undo()
}

type Kitchen struct{}

func (k *Kitchen) PrepareDish(dish string) {
	fmt.Println("Preparing: " + dish)
}

func (k *Kitchen) CancelDish(dish string) {
	fmt.Println("Cancelling: " + dish)
}

type PlaceOrderCommand struct {
	kitchen *Kitchen
	dish    string
}

func NewPlaceOrderCommand(kitchen *Kitchen, dish string) *PlaceOrderCommand {
	return &PlaceOrderCommand{kitchen: kitchen, dish: dish}
}

func (c *PlaceOrderCommand) Execute() {
	c.kitchen.PrepareDish(c.dish)
}

func (c *PlaceOrderCommand) Undo() {
	c.kitchen.CancelDish(c.dish)
}

type CancelOrderCommand struct {
	kitchen *Kitchen
	dish    string
}

func NewCancelOrderCommand(kitchen *Kitchen, dish string) *CancelOrderCommand {
	return &CancelOrderCommand{kitchen: kitchen, dish: dish}
}

func (c *CancelOrderCommand) Execute() {
	c.kitchen.CancelDish(c.dish)
}

func (c *CancelOrderCommand) Undo() {
	c.kitchen.PrepareDish(c.dish)
}

type Waiter struct {
	pending []OrderCommand
	history []OrderCommand
}

func NewWaiter() *Waiter {
	return &Waiter{
		pending: make([]OrderCommand, 0),
		history: make([]OrderCommand, 0),
	}
}

func (w *Waiter) TakeOrder(command OrderCommand) {
	w.pending = append(w.pending, command)
}

func (w *Waiter) SubmitOrders() {
	for _, cmd := range w.pending {
		cmd.Execute()
		w.history = append(w.history, cmd)
	}
	w.pending = w.pending[:0]
}

func (w *Waiter) UndoLast() {
	if len(w.history) > 0 {
		last := w.history[len(w.history)-1]
		w.history = w.history[:len(w.history)-1]
		last.Undo()
	}
}

func main() {
	kitchen := &Kitchen{}
	waiter := NewWaiter()

	waiter.TakeOrder(NewPlaceOrderCommand(kitchen, "Pasta"))
	waiter.TakeOrder(NewPlaceOrderCommand(kitchen, "Salad"))
	waiter.SubmitOrders()

	waiter.TakeOrder(NewCancelOrderCommand(kitchen, "Salad"))
	waiter.SubmitOrders()

	waiter.UndoLast()
}
```

```csharp
using System;
using System.Collections.Generic;

interface IOrderCommand
{
    void Execute();
    void Undo();
}

class Kitchen
{
    public void PrepareDish(string dish)
    {
        Console.WriteLine("Preparing: " + dish);
    }

    public void CancelDish(string dish)
    {
        Console.WriteLine("Cancelling: " + dish);
    }
}

class PlaceOrderCommand : IOrderCommand
{
    private Kitchen kitchen;
    private string dish;

    public PlaceOrderCommand(Kitchen kitchen, string dish)
    {
        this.kitchen = kitchen;
        this.dish = dish;
    }

    public void Execute() { kitchen.PrepareDish(dish); }
    public void Undo() { kitchen.CancelDish(dish); }
}

class CancelOrderCommand : IOrderCommand
{
    private Kitchen kitchen;
    private string dish;

    public CancelOrderCommand(Kitchen kitchen, string dish)
    {
        this.kitchen = kitchen;
        this.dish = dish;
    }

    public void Execute() { kitchen.CancelDish(dish); }
    public void Undo() { kitchen.PrepareDish(dish); }
}

class Waiter
{
    private List<IOrderCommand> pending = new List<IOrderCommand>();
    private Stack<IOrderCommand> history = new Stack<IOrderCommand>();

    public void TakeOrder(IOrderCommand command)
    {
        pending.Add(command);
    }

    public void SubmitOrders()
    {
        foreach (var cmd in pending)
        {
            cmd.Execute();
            history.Push(cmd);
        }
        pending.Clear();
    }

    public void UndoLast()
    {
        if (history.Count > 0)
            history.Pop().Undo();
    }
}

class Program
{
    static void Main(string[] args)
    {
        Kitchen kitchen = new Kitchen();
        Waiter waiter = new Waiter();
        waiter.TakeOrder(new PlaceOrderCommand(kitchen, "Pasta"));
        waiter.TakeOrder(new PlaceOrderCommand(kitchen, "Salad"));
        waiter.SubmitOrders();
        waiter.TakeOrder(new CancelOrderCommand(kitchen, "Salad"));
        waiter.SubmitOrders();
        waiter.UndoLast();
    }
}
```

```typescript
interface OrderCommand {
    execute(): void;
    undo(): void;
}

class Kitchen {
    prepareDish(dish: string): void {
        console.log("Preparing: " + dish);
    }

    cancelDish(dish: string): void {
        console.log("Cancelling: " + dish);
    }
}

class PlaceOrderCommand implements OrderCommand {
    private kitchen: Kitchen;
    private dish: string;

    constructor(kitchen: Kitchen, dish: string) {
        this.kitchen = kitchen;
        this.dish = dish;
    }

    execute(): void { this.kitchen.prepareDish(this.dish); }
    undo(): void { this.kitchen.cancelDish(this.dish); }
}

class CancelOrderCommand implements OrderCommand {
    private kitchen: Kitchen;
    private dish: string;

    constructor(kitchen: Kitchen, dish: string) {
        this.kitchen = kitchen;
        this.dish = dish;
    }

    execute(): void { this.kitchen.cancelDish(this.dish); }
    undo(): void { this.kitchen.prepareDish(this.dish); }
}

class Waiter {
    private pending: OrderCommand[] = [];
    private history: OrderCommand[] = [];

    takeOrder(command: OrderCommand): void {
        this.pending.push(command);
    }

    submitOrders(): void {
        for (const cmd of this.pending) {
            cmd.execute();
            this.history.push(cmd);
        }
        this.pending = [];
    }

    undoLast(): void {
        if (this.history.length > 0) {
            this.history.pop()!.undo();
        }
    }
}

const kitchen = new Kitchen();
const waiter = new Waiter();
waiter.takeOrder(new PlaceOrderCommand(kitchen, "Pasta"));
waiter.takeOrder(new PlaceOrderCommand(kitchen, "Salad"));
waiter.submitOrders();
waiter.takeOrder(new CancelOrderCommand(kitchen, "Salad"));
waiter.submitOrders();
waiter.undoLast();
```

---

# Exercise 2: File System Operations

> [!PAYWALL] This content is for premium members only.

<!-- payload:lldCodingPracticeBlock:START {"id":"69915ec17fdcc15926ebb462","title":"Design File System Operations","difficulty":"medium","expectedOutput":"Created: readme.md\nCreated: app.java\nRenamed: app.java -> Main.java\nDeleted: readme.md\nFiles: [Main.java]\nRestored: readme.md\nRenamed: Main.java -> app.java\nFiles: [app.java, readme.md]"} -->
Build a file system manager that supports creating, deleting, and renaming files, with full undo support. The `FileSystem` receiver tracks files as a set of names. Each command captures enough state to reverse its operation.

**Requirements:**

- `FileSystem` receiver with `createFile(name)`, `deleteFile(name)`, and `renameFile(oldName, newName)`
- `CreateFileCommand`: creates a file on execute, deletes it on undo
- `DeleteFileCommand`: deletes a file on execute (saves the name), recreates it on undo
- `RenameFileCommand`: renames on execute (saves old name), renames back on undo
- Invoker with command history and undo support

```java
import java.util.*;

interface FileCommand {
    void execute();
    void undo();
}

class FileSystem {
    private TreeSet<String> files = new TreeSet<>();

    public void createFile(String name) {
        // TODO: Add file to set, print "Created: " + name
    }

    public void deleteFile(String name) {
        // TODO: Remove file from set, print "Deleted: " + name
    }

    public void renameFile(String oldName, String newName) {
        // TODO: Remove old, add new, print "Renamed: old -> new"
    }

    public void listFiles() {
        // TODO: Print "Files: " + files
    }
}

class CreateFileCommand implements FileCommand {
    private FileSystem fileSystem;
    private String name;

    public CreateFileCommand(FileSystem fileSystem, String name) {
        this.fileSystem = fileSystem;
        this.name = name;
    }

    @Override
    public void execute() {
        // TODO: Call fileSystem.createFile(name)
    }

    @Override
    public void undo() {
        // TODO: Call fileSystem.deleteFile(name)
    }
}

class DeleteFileCommand implements FileCommand {
    private FileSystem fileSystem;
    private String name;

    public DeleteFileCommand(FileSystem fileSystem, String name) {
        this.fileSystem = fileSystem;
        this.name = name;
    }

    @Override
    public void execute() {
        // TODO: Call fileSystem.deleteFile(name)
    }

    @Override
    public void undo() {
        // TODO: Print "Restored: " + name, then call fileSystem.createFile(name)
    }
}

class RenameFileCommand implements FileCommand {
    private FileSystem fileSystem;
    private String oldName;
    private String newName;

    public RenameFileCommand(FileSystem fileSystem, String oldName, String newName) {
        this.fileSystem = fileSystem;
        this.oldName = oldName;
        this.newName = newName;
    }

    @Override
    public void execute() {
        // TODO: Call fileSystem.renameFile(oldName, newName)
    }

    @Override
    public void undo() {
        // TODO: Call fileSystem.renameFile(newName, oldName) to reverse
    }
}

class FileManager {
    private Stack<FileCommand> history = new Stack<>();

    public void executeCommand(FileCommand command) {
        // TODO: Execute command and push to history
    }

    public void undo() {
        // TODO: Pop from history and call undo()
    }
}

public class Main {
    public static void main(String[] args) {
        // FileSystem fs = new FileSystem();
        // FileManager manager = new FileManager();
        // manager.executeCommand(new CreateFileCommand(fs, "readme.md"));
        // manager.executeCommand(new CreateFileCommand(fs, "app.java"));
        // manager.executeCommand(new RenameFileCommand(fs, "app.java", "Main.java"));
        // manager.executeCommand(new DeleteFileCommand(fs, "readme.md"));
        // fs.listFiles();
        // manager.undo(); // undo delete
        // manager.undo(); // undo rename
        // fs.listFiles();
    }
}
```

```python
from abc import ABC, abstractmethod

class FileCommand(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass

class FileSystem:
    def __init__(self):
        self.files = set()

    def create_file(self, name):
        # TODO: Add file to set, print "Created: " + name
        pass

    def delete_file(self, name):
        # TODO: Remove file from set, print "Deleted: " + name
        pass

    def rename_file(self, old_name, new_name):
        # TODO: Remove old, add new, print "Renamed: old -> new"
        pass

    def list_files(self):
        # TODO: Print "Files: " + sorted(files)
        pass

class CreateFileCommand(FileCommand):
    def __init__(self, file_system, name):
        self.file_system = file_system
        self.name = name

    def execute(self):
        # TODO: Call self.file_system.create_file(self.name)
        pass

    def undo(self):
        # TODO: Call self.file_system.delete_file(self.name)
        pass

class DeleteFileCommand(FileCommand):
    def __init__(self, file_system, name):
        self.file_system = file_system
        self.name = name

    def execute(self):
        # TODO: Call self.file_system.delete_file(self.name)
        pass

    def undo(self):
        # TODO: Print "Restored: " + name, then call self.file_system.create_file(self.name)
        pass

class RenameFileCommand(FileCommand):
    def __init__(self, file_system, old_name, new_name):
        self.file_system = file_system
        self.old_name = old_name
        self.new_name = new_name

    def execute(self):
        # TODO: Call self.file_system.rename_file(self.old_name, self.new_name)
        pass

    def undo(self):
        # TODO: Call self.file_system.rename_file(self.new_name, self.old_name)
        pass

class FileManager:
    def __init__(self):
        self.history = []

    def execute_command(self, command):
        # TODO: Execute command and append to history
        pass

    def undo(self):
        # TODO: Pop from history and call undo()
        pass

if __name__ == "__main__":
    # fs = FileSystem()
    # manager = FileManager()
    # manager.execute_command(CreateFileCommand(fs, "readme.md"))
    # manager.execute_command(CreateFileCommand(fs, "app.java"))
    # manager.execute_command(RenameFileCommand(fs, "app.java", "Main.java"))
    # manager.execute_command(DeleteFileCommand(fs, "readme.md"))
    # fs.list_files()
    # manager.undo()
    # manager.undo()
    # fs.list_files()
    pass
```

```cpp
#include <iostream>
#include <set>
#include <string>
#include <vector>
using namespace std;

class FileCommand {
public:
    virtual ~FileCommand() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
};

class FileSystem {
    set<string> files;
public:
    void createFile(const string& name) {
        // TODO: Add file to set, print "Created: " + name
    }

    void deleteFile(const string& name) {
        // TODO: Remove file from set, print "Deleted: " + name
    }

    void renameFile(const string& oldName, const string& newName) {
        // TODO: Remove old, add new, print "Renamed: old -> new"
    }

    void listFiles() {
        // TODO: Print "Files: [...]"
    }
};

class CreateFileCommand : public FileCommand {
    FileSystem* fs;
    string name;
public:
    CreateFileCommand(FileSystem* fs, const string& name) : fs(fs), name(name) {}
    void execute() override {
        // TODO: Call fs->createFile(name)
    }
    void undo() override {
        // TODO: Call fs->deleteFile(name)
    }
};

class DeleteFileCommand : public FileCommand {
    FileSystem* fs;
    string name;
public:
    DeleteFileCommand(FileSystem* fs, const string& name) : fs(fs), name(name) {}
    void execute() override {
        // TODO: Call fs->deleteFile(name)
    }
    void undo() override {
        // TODO: Print "Restored: " + name, then call fs->createFile(name)
    }
};

class RenameFileCommand : public FileCommand {
    FileSystem* fs;
    string oldName, newName;
public:
    RenameFileCommand(FileSystem* fs, const string& oldName, const string& newName)
        : fs(fs), oldName(oldName), newName(newName) {}
    void execute() override {
        // TODO: Call fs->renameFile(oldName, newName)
    }
    void undo() override {
        // TODO: Call fs->renameFile(newName, oldName)
    }
};

class FileManager {
    vector<FileCommand*> history;
public:
    void executeCommand(FileCommand* command) {
        // TODO: Execute command and add to history
    }

    void undo() {
        // TODO: Pop from history and call undo()
    }
};

int main() {
    // FileSystem fs;
    // FileManager manager;
    // manager.executeCommand(new CreateFileCommand(&fs, "readme.md"));
    // manager.executeCommand(new CreateFileCommand(&fs, "app.java"));
    // manager.executeCommand(new RenameFileCommand(&fs, "app.java", "Main.java"));
    // manager.executeCommand(new DeleteFileCommand(&fs, "readme.md"));
    // fs.listFiles();
    // manager.undo();
    // manager.undo();
    // fs.listFiles();
    return 0;
}
```

```go
package main

type FileCommand interface {
	Execute()
	Undo()
}

type FileSystem struct {
	files map[string]struct{}
}

func NewFileSystem() *FileSystem {
	return &FileSystem{
		files: make(map[string]struct{}),
	}
}

func (fs *FileSystem) createFile(name string) {
	// TODO: Add file to set, print "Created: " + name
}

func (fs *FileSystem) deleteFile(name string) {
	// TODO: Remove file from set, print "Deleted: " + name
}

func (fs *FileSystem) renameFile(oldName string, newName string) {
	// TODO: Remove old, add new, print "Renamed: old -> new"
}

func (fs *FileSystem) listFiles() {
	// TODO: Print "Files: " + files
}

type CreateFileCommand struct {
	fileSystem *FileSystem
	name       string
}

func NewCreateFileCommand(fileSystem *FileSystem, name string) *CreateFileCommand {
	return &CreateFileCommand{
		fileSystem: fileSystem,
		name:       name,
	}
}

func (c *CreateFileCommand) Execute() {
	// TODO: Call fileSystem.createFile(name)
}

func (c *CreateFileCommand) Undo() {
	// TODO: Call fileSystem.deleteFile(name)
}

type DeleteFileCommand struct {
	fileSystem *FileSystem
	name       string
}

func NewDeleteFileCommand(fileSystem *FileSystem, name string) *DeleteFileCommand {
	return &DeleteFileCommand{
		fileSystem: fileSystem,
		name:       name,
	}
}

func (c *DeleteFileCommand) Execute() {
	// TODO: Call fileSystem.deleteFile(name)
}

func (c *DeleteFileCommand) Undo() {
	// TODO: Print "Restored: " + name, then call fileSystem.createFile(name)
}

type RenameFileCommand struct {
	fileSystem *FileSystem
	oldName    string
	newName    string
}

func NewRenameFileCommand(fileSystem *FileSystem, oldName string, newName string) *RenameFileCommand {
	return &RenameFileCommand{
		fileSystem: fileSystem,
		oldName:    oldName,
		newName:    newName,
	}
}

func (c *RenameFileCommand) Execute() {
	// TODO: Call fileSystem.renameFile(oldName, newName)
}

func (c *RenameFileCommand) Undo() {
	// TODO: Call fileSystem.renameFile(newName, oldName) to reverse
}

type FileManager struct {
	history []FileCommand
}

func NewFileManager() *FileManager {
	return &FileManager{
		history: make([]FileCommand, 0),
	}
}

func (m *FileManager) ExecuteCommand(command FileCommand) {
	// TODO: Execute command and push to history
}

func (m *FileManager) Undo() {
	// TODO: Pop from history and call undo()
}

func main() {
	// fs := NewFileSystem()
	// manager := NewFileManager()
	// manager.ExecuteCommand(NewCreateFileCommand(fs, "readme.md"))
	// manager.ExecuteCommand(NewCreateFileCommand(fs, "app.java"))
	// manager.ExecuteCommand(NewRenameFileCommand(fs, "app.java", "Main.java"))
	// manager.ExecuteCommand(NewDeleteFileCommand(fs, "readme.md"))
	// fs.listFiles()
	// manager.Undo()
	// manager.Undo()
	// fs.listFiles()
}
```

```csharp
using System;
using System.Collections.Generic;

interface IFileCommand
{
    void Execute();
    void Undo();
}

class FileSystem
{
    private SortedSet<string> files = new SortedSet<string>();

    public void CreateFile(string name)
    {
        // TODO: Add file to set, print "Created: " + name
    }

    public void DeleteFile(string name)
    {
        // TODO: Remove file from set, print "Deleted: " + name
    }

    public void RenameFile(string oldName, string newName)
    {
        // TODO: Remove old, add new, print "Renamed: old -> new"
    }

    public void ListFiles()
    {
        // TODO: Print "Files: [...]"
    }
}

class CreateFileCommand : IFileCommand
{
    private FileSystem fs;
    private string name;

    public CreateFileCommand(FileSystem fs, string name)
    {
        this.fs = fs;
        this.name = name;
    }
    public void Execute()
    {
        /* TODO: Call fs.CreateFile(name) */
    }
    public void Undo()
    {
        /* TODO: Call fs.DeleteFile(name) */
    }
}

class DeleteFileCommand : IFileCommand
{
    private FileSystem fs;
    private string name;

    public DeleteFileCommand(FileSystem fs, string name)
    {
        this.fs = fs;
        this.name = name;
    }
    public void Execute()
    {
        /* TODO: Call fs.DeleteFile(name) */
    }
    public void Undo()
    {
        // TODO: Print "Restored: " + name, then call fs.CreateFile(name)
    }
}

class RenameFileCommand : IFileCommand
{
    private FileSystem fs;
    private string oldName, newName;

    public RenameFileCommand(FileSystem fs, string oldName, string newName)
    {
        this.fs = fs; this.oldName = oldName; this.newName = newName;
    }

    public void Execute()
    {
        /* TODO: Call fs.RenameFile(oldName, newName) */
    }
    public void Undo()
    {
        /* TODO: Call fs.RenameFile(newName, oldName) */
    }
}

class FileManager
{
    private Stack<IFileCommand> history = new Stack<IFileCommand>();

    public void ExecuteCommand(IFileCommand command)
    {
        // TODO: Execute command and push to history
    }

    public void Undo()
    {
        // TODO: Pop from history and call Undo()
    }
}

class Program
{
    static void Main(string[] args)
    {
        // FileSystem fs = new FileSystem();
        // FileManager manager = new FileManager();
        // manager.ExecuteCommand(new CreateFileCommand(fs, "readme.md"));
        // manager.ExecuteCommand(new CreateFileCommand(fs, "app.java"));
        // manager.ExecuteCommand(new RenameFileCommand(fs, "app.java", "Main.java"));
        // manager.ExecuteCommand(new DeleteFileCommand(fs, "readme.md"));
        // fs.ListFiles();
        // manager.Undo();
        // manager.Undo();
        // fs.ListFiles();
    }
}
```

```typescript
interface FileCommand {
    execute(): void;
    undo(): void;
}

class FileSystem {
    private files: Set<string> = new Set();

    createFile(name: string): void {
        // TODO: Add file to set, print "Created: " + name
    }

    deleteFile(name: string): void {
        // TODO: Remove file from set, print "Deleted: " + name
    }

    renameFile(oldName: string, newName: string): void {
        // TODO: Remove old, add new, print "Renamed: old -> new"
    }

    listFiles(): void {
        // TODO: Print "Files: [...]"
    }
}

class CreateFileCommand implements FileCommand {
    private fs: FileSystem;
    private name: string;

    constructor(fs: FileSystem, name: string) {
        this.fs = fs;
        this.name = name;
    }
    execute(): void {
        /* TODO: Call this.fs.createFile(this.name) */
    }
    undo(): void {
        /* TODO: Call this.fs.deleteFile(this.name) */
    }
}

class DeleteFileCommand implements FileCommand {
    private fs: FileSystem;
    private name: string;

    constructor(fs: FileSystem, name: string) {
        this.fs = fs;
        this.name = name;
    }
    execute(): void {
        /* TODO: Call this.fs.deleteFile(this.name) */
    }
    undo(): void {
        // TODO: Print "Restored: " + name, then call this.fs.createFile(this.name)
    }
}

class RenameFileCommand implements FileCommand {
    private fs: FileSystem;
    private oldName: string;
    private newName: string;

    constructor(fs: FileSystem, oldName: string, newName: string) {
        this.fs = fs; this.oldName = oldName; this.newName = newName;
    }

    execute(): void {
        /* TODO: Call this.fs.renameFile(this.oldName, this.newName) */
    }
    undo(): void {
        /* TODO: Call this.fs.renameFile(this.newName, this.oldName) */
    }
}

class FileManager {
    private history: FileCommand[] = [];

    executeCommand(command: FileCommand): void {
        // TODO: Execute command and push to history
    }

    undo(): void {
        // TODO: Pop from history and call undo()
    }
}

// const fs = new FileSystem();
// const manager = new FileManager();
// manager.executeCommand(new CreateFileCommand(fs, "readme.md"));
// manager.executeCommand(new CreateFileCommand(fs, "app.java"));
// manager.executeCommand(new RenameFileCommand(fs, "app.java", "Main.java"));
// manager.executeCommand(new DeleteFileCommand(fs, "readme.md"));
// fs.listFiles();
// manager.undo();
// manager.undo();
// fs.listFiles();
```

#### Solutions

```java
import java.util.*;

interface FileCommand {
    void execute();
    void undo();
}

class FileSystem {
    private TreeSet<String> files = new TreeSet<>();

    public void createFile(String name) {
        files.add(name);
        System.out.println("Created: " + name);
    }

    public void deleteFile(String name) {
        files.remove(name);
        System.out.println("Deleted: " + name);
    }

    public void renameFile(String oldName, String newName) {
        files.remove(oldName);
        files.add(newName);
        System.out.println("Renamed: " + oldName + " -> " + newName);
    }

    public void restoreFile(String name) {
        files.add(name);
        System.out.println("Restored: " + name);
    }

    public void listFiles() {
        System.out.println("Files: " + files);
    }
}

class CreateFileCommand implements FileCommand {
    private FileSystem fileSystem;
    private String name;

    public CreateFileCommand(FileSystem fileSystem, String name) {
        this.fileSystem = fileSystem;
        this.name = name;
    }

    @Override
    public void execute() { fileSystem.createFile(name); }

    @Override
    public void undo() { fileSystem.deleteFile(name); }
}

class DeleteFileCommand implements FileCommand {
    private FileSystem fileSystem;
    private String name;

    public DeleteFileCommand(FileSystem fileSystem, String name) {
        this.fileSystem = fileSystem;
        this.name = name;
    }

    @Override
    public void execute() { fileSystem.deleteFile(name); }

    @Override
    public void undo() { fileSystem.restoreFile(name); }
}

class RenameFileCommand implements FileCommand {
    private FileSystem fileSystem;
    private String oldName;
    private String newName;

    public RenameFileCommand(FileSystem fileSystem, String oldName, String newName) {
        this.fileSystem = fileSystem;
        this.oldName = oldName;
        this.newName = newName;
    }

    @Override
    public void execute() { fileSystem.renameFile(oldName, newName); }

    @Override
    public void undo() { fileSystem.renameFile(newName, oldName); }
}

class FileManager {
    private Stack<FileCommand> history = new Stack<>();

    public void executeCommand(FileCommand command) {
        command.execute();
        history.push(command);
    }

    public void undo() {
        if (!history.isEmpty()) {
            history.pop().undo();
        }
    }
}

public class Main {
    public static void main(String[] args) {
        FileSystem fs = new FileSystem();
        FileManager manager = new FileManager();
        manager.executeCommand(new CreateFileCommand(fs, "readme.md"));
        manager.executeCommand(new CreateFileCommand(fs, "app.java"));
        manager.executeCommand(new RenameFileCommand(fs, "app.java", "Main.java"));
        manager.executeCommand(new DeleteFileCommand(fs, "readme.md"));
        fs.listFiles();
        manager.undo();
        manager.undo();
        fs.listFiles();
    }
}
```

```python
from abc import ABC, abstractmethod

class FileCommand(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass

class FileSystem:
    def __init__(self):
        self.files = set()

    def create_file(self, name):
        self.files.add(name)
        print(f"Created: {name}")

    def delete_file(self, name):
        self.files.discard(name)
        print(f"Deleted: {name}")

    def rename_file(self, old_name, new_name):
        self.files.discard(old_name)
        self.files.add(new_name)
        print(f"Renamed: {old_name} -> {new_name}")

    def restore_file(self, name):
        self.files.add(name)
        print(f"Restored: {name}")

    def list_files(self):
        print(f"Files: [{', '.join(sorted(self.files))}]")

class CreateFileCommand(FileCommand):
    def __init__(self, file_system, name):
        self.file_system = file_system
        self.name = name

    def execute(self):
        self.file_system.create_file(self.name)

    def undo(self):
        self.file_system.delete_file(self.name)

class DeleteFileCommand(FileCommand):
    def __init__(self, file_system, name):
        self.file_system = file_system
        self.name = name

    def execute(self):
        self.file_system.delete_file(self.name)

    def undo(self):
        self.file_system.restore_file(self.name)

class RenameFileCommand(FileCommand):
    def __init__(self, file_system, old_name, new_name):
        self.file_system = file_system
        self.old_name = old_name
        self.new_name = new_name

    def execute(self):
        self.file_system.rename_file(self.old_name, self.new_name)

    def undo(self):
        self.file_system.rename_file(self.new_name, self.old_name)

class FileManager:
    def __init__(self):
        self.history = []

    def execute_command(self, command):
        command.execute()
        self.history.append(command)

    def undo(self):
        if self.history:
            self.history.pop().undo()

if __name__ == "__main__":
    fs = FileSystem()
    manager = FileManager()
    manager.execute_command(CreateFileCommand(fs, "readme.md"))
    manager.execute_command(CreateFileCommand(fs, "app.java"))
    manager.execute_command(RenameFileCommand(fs, "app.java", "Main.java"))
    manager.execute_command(DeleteFileCommand(fs, "readme.md"))
    fs.list_files()
    manager.undo()
    manager.undo()
    fs.list_files()
```

```cpp
#include <iostream>
#include <set>
#include <string>
#include <vector>
using namespace std;

class FileCommand {
public:
    virtual ~FileCommand() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
};

class FileSystem {
    set<string> files;
public:
    void createFile(const string& name) {
        files.insert(name);
        cout << "Created: " << name << endl;
    }

    void deleteFile(const string& name) {
        files.erase(name);
        cout << "Deleted: " << name << endl;
    }

    void renameFile(const string& oldName, const string& newName) {
        files.erase(oldName);
        files.insert(newName);
        cout << "Renamed: " << oldName << " -> " << newName << endl;
    }

    void restoreFile(const string& name) {
        files.insert(name);
        cout << "Restored: " << name << endl;
    }

    void listFiles() {
        cout << "Files: [";
        bool first = true;
        for (const auto& f : files) {
            if (!first) cout << ", ";
            cout << f;
            first = false;
        }
        cout << "]" << endl;
    }
};

class CreateFileCommand : public FileCommand {
    FileSystem* fs;
    string name;
public:
    CreateFileCommand(FileSystem* fs, const string& name) : fs(fs), name(name) {}

    void execute() override {
        fs->createFile(name);
    }

    void undo() override {
        fs->deleteFile(name);
    }
};

class DeleteFileCommand : public FileCommand {
    FileSystem* fs;
    string name;
public:
    DeleteFileCommand(FileSystem* fs, const string& name) : fs(fs), name(name) {}

    void execute() override {
        fs->deleteFile(name);
    }

    void undo() override {
        fs->restoreFile(name);
    }
};

class RenameFileCommand : public FileCommand {
    FileSystem* fs;
    string oldName, newName;
public:
    RenameFileCommand(FileSystem* fs, const string& oldName, const string& newName)
        : fs(fs), oldName(oldName), newName(newName) {}

    void execute() override {
        fs->renameFile(oldName, newName);
    }

    void undo() override {
        fs->renameFile(newName, oldName);
    }
};

class FileManager {
    vector<FileCommand*> history;
public:
    void executeCommand(FileCommand* command) {
        command->execute();
        history.push_back(command);
    }

    void undo() {
        if (!history.empty()) {
            history.back()->undo();
            history.pop_back();
        }
    }
};

int main() {
    FileSystem fs;
    FileManager manager;
    manager.executeCommand(new CreateFileCommand(&fs, "readme.md"));
    manager.executeCommand(new CreateFileCommand(&fs, "app.java"));
    manager.executeCommand(new RenameFileCommand(&fs, "app.java", "Main.java"));
    manager.executeCommand(new DeleteFileCommand(&fs, "readme.md"));
    fs.listFiles();
    manager.undo();
    manager.undo();
    fs.listFiles();
    return 0;
}
```

```go
package main

import (
	"fmt"
	"sort"
	"strings"
)

type FileCommand interface {
	Execute()
	Undo()
}

type FileSystem struct {
	files map[string]struct{}
}

func NewFileSystem() *FileSystem {
	return &FileSystem{files: make(map[string]struct{})}
}

func (fs *FileSystem) createFile(name string) {
	fs.files[name] = struct{}{}
	fmt.Println("Created: " + name)
}

func (fs *FileSystem) deleteFile(name string) {
	delete(fs.files, name)
	fmt.Println("Deleted: " + name)
}

func (fs *FileSystem) renameFile(oldName, newName string) {
	delete(fs.files, oldName)
	fs.files[newName] = struct{}{}
	fmt.Printf("Renamed: %s -> %s\n", oldName, newName)
}

func (fs *FileSystem) restoreFile(name string) {
	fs.files[name] = struct{}{}
	fmt.Println("Restored: " + name)
}

func (fs *FileSystem) listFiles() {
	names := make([]string, 0, len(fs.files))
	for name := range fs.files {
		names = append(names, name)
	}
	sort.Strings(names)
	fmt.Println("Files: [" + strings.Join(names, ", ") + "]")
}

type CreateFileCommand struct {
	fileSystem *FileSystem
	name       string
}

func NewCreateFileCommand(fileSystem *FileSystem, name string) *CreateFileCommand {
	return &CreateFileCommand{fileSystem: fileSystem, name: name}
}

func (c *CreateFileCommand) Execute() {
	c.fileSystem.createFile(c.name)
}

func (c *CreateFileCommand) Undo() {
	c.fileSystem.deleteFile(c.name)
}

type DeleteFileCommand struct {
	fileSystem *FileSystem
	name       string
}

func NewDeleteFileCommand(fileSystem *FileSystem, name string) *DeleteFileCommand {
	return &DeleteFileCommand{fileSystem: fileSystem, name: name}
}

func (c *DeleteFileCommand) Execute() {
	c.fileSystem.deleteFile(c.name)
}

func (c *DeleteFileCommand) Undo() {
	c.fileSystem.restoreFile(c.name)
}

type RenameFileCommand struct {
	fileSystem *FileSystem
	oldName    string
	newName    string
}

func NewRenameFileCommand(fileSystem *FileSystem, oldName, newName string) *RenameFileCommand {
	return &RenameFileCommand{fileSystem: fileSystem, oldName: oldName, newName: newName}
}

func (c *RenameFileCommand) Execute() {
	c.fileSystem.renameFile(c.oldName, c.newName)
}

func (c *RenameFileCommand) Undo() {
	c.fileSystem.renameFile(c.newName, c.oldName)
}

type FileManager struct {
	history []FileCommand
}

func NewFileManager() *FileManager {
	return &FileManager{history: make([]FileCommand, 0)}
}

func (fm *FileManager) ExecuteCommand(command FileCommand) {
	command.Execute()
	fm.history = append(fm.history, command)
}

func (fm *FileManager) Undo() {
	if len(fm.history) == 0 {
		return
	}
	last := fm.history[len(fm.history)-1]
	fm.history = fm.history[:len(fm.history)-1]
	last.Undo()
}

func main() {
	fs := NewFileSystem()
	manager := NewFileManager()

	manager.ExecuteCommand(NewCreateFileCommand(fs, "readme.md"))
	manager.ExecuteCommand(NewCreateFileCommand(fs, "app.java"))
	manager.ExecuteCommand(NewRenameFileCommand(fs, "app.java", "Main.java"))
	manager.ExecuteCommand(NewDeleteFileCommand(fs, "readme.md"))

	fs.listFiles()

	manager.Undo()
	manager.Undo()

	fs.listFiles()
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

interface IFileCommand
{
    void Execute();
    void Undo();
}

class FileSystem
{
    private SortedSet<string> files = new SortedSet<string>();

    public void CreateFile(string name)
    {
        files.Add(name);
        Console.WriteLine("Created: " + name);
    }

    public void DeleteFile(string name)
    {
        files.Remove(name);
        Console.WriteLine("Deleted: " + name);
    }

    public void RenameFile(string oldName, string newName)
    {
        files.Remove(oldName);
        files.Add(newName);
        Console.WriteLine($"Renamed: {oldName} -> {newName}");
    }

    public void RestoreFile(string name)
    {
        files.Add(name);
        Console.WriteLine("Restored: " + name);
    }

    public void ListFiles()
    {
        Console.WriteLine("Files: [" + string.Join(", ", files) + "]");
    }
}

class CreateFileCommand : IFileCommand
{
    private FileSystem fs;
    private string name;

    public CreateFileCommand(FileSystem fs, string name)
    {
        this.fs = fs;
        this.name = name;
    }
    public void Execute()
    {
        fs.CreateFile(name);
    }
    public void Undo()
    {
        fs.DeleteFile(name);
    }
}

class DeleteFileCommand : IFileCommand
{
    private FileSystem fs;
    private string name;

    public DeleteFileCommand(FileSystem fs, string name)
    {
        this.fs = fs;
        this.name = name;
    }
    public void Execute()
    {
        fs.DeleteFile(name);
    }
    public void Undo()
    {
        fs.RestoreFile(name);
    }
}

class RenameFileCommand : IFileCommand
{
    private FileSystem fs;
    private string oldName, newName;

    public RenameFileCommand(FileSystem fs, string oldName, string newName)
    {
        this.fs = fs; this.oldName = oldName; this.newName = newName;
    }

    public void Execute()
    {
        fs.RenameFile(oldName, newName);
    }
    public void Undo()
    {
        fs.RenameFile(newName, oldName);
    }
}

class FileManager
{
    private Stack<IFileCommand> history = new Stack<IFileCommand>();

    public void ExecuteCommand(IFileCommand command)
    {
        command.Execute();
        history.Push(command);
    }

    public void Undo()
    {
        if (history.Count > 0)
            history.Pop().Undo();
    }
}

class Program
{
    static void Main(string[] args)
    {
        FileSystem fs = new FileSystem();
        FileManager manager = new FileManager();
        manager.ExecuteCommand(new CreateFileCommand(fs, "readme.md"));
        manager.ExecuteCommand(new CreateFileCommand(fs, "app.java"));
        manager.ExecuteCommand(new RenameFileCommand(fs, "app.java", "Main.java"));
        manager.ExecuteCommand(new DeleteFileCommand(fs, "readme.md"));
        fs.ListFiles();
        manager.Undo();
        manager.Undo();
        fs.ListFiles();
    }
}
```

```typescript
interface FileCommand {
    execute(): void;
    undo(): void;
}

class FileSystem {
    private files: Set<string> = new Set();

    createFile(name: string): void {
        this.files.add(name);
        console.log("Created: " + name);
    }

    deleteFile(name: string): void {
        this.files.delete(name);
        console.log("Deleted: " + name);
    }

    renameFile(oldName: string, newName: string): void {
        this.files.delete(oldName);
        this.files.add(newName);
        console.log(`Renamed: ${oldName} -> ${newName}`);
    }

    restoreFile(name: string): void {
        this.files.add(name);
        console.log("Restored: " + name);
    }

    listFiles(): void {
        console.log("Files: [" + [...this.files].sort().join(", ") + "]");
    }
}

class CreateFileCommand implements FileCommand {
    private fs: FileSystem;
    private name: string;

    constructor(fs: FileSystem, name: string) {
        this.fs = fs;
        this.name = name;
    }
    execute(): void {
        this.fs.createFile(this.name);
    }
    undo(): void {
        this.fs.deleteFile(this.name);
    }
}

class DeleteFileCommand implements FileCommand {
    private fs: FileSystem;
    private name: string;

    constructor(fs: FileSystem, name: string) {
        this.fs = fs;
        this.name = name;
    }
    execute(): void {
        this.fs.deleteFile(this.name);
    }
    undo(): void {
        this.fs.restoreFile(this.name);
    }
}

class RenameFileCommand implements FileCommand {
    private fs: FileSystem;
    private oldName: string;
    private newName: string;

    constructor(fs: FileSystem, oldName: string, newName: string) {
        this.fs = fs; this.oldName = oldName; this.newName = newName;
    }

    execute(): void {
        this.fs.renameFile(this.oldName, this.newName);
    }
    undo(): void {
        this.fs.renameFile(this.newName, this.oldName);
    }
}

class FileManager {
    private history: FileCommand[] = [];

    executeCommand(command: FileCommand): void {
        command.execute();
        this.history.push(command);
    }

    undo(): void {
        if (this.history.length > 0) {
            this.history.pop()!.undo();
        }
    }
}

const fs = new FileSystem();
const manager = new FileManager();
manager.executeCommand(new CreateFileCommand(fs, "readme.md"));
manager.executeCommand(new CreateFileCommand(fs, "app.java"));
manager.executeCommand(new RenameFileCommand(fs, "app.java", "Main.java"));
manager.executeCommand(new DeleteFileCommand(fs, "readme.md"));
fs.listFiles();
manager.undo();
manager.undo();
fs.listFiles();
```

---

# Exercise 3: Command Queue with Priority

Build a command queue system where commands have priorities and are executed in priority order. The queue supports delayed execution, logging of all executed commands with timestamps, and undo of the most recently executed command.

**Requirements:**

- `PriorityCommand` interface extending `Command` with `getPriority()` (1 = highest)
- `CommandQueue` invoker that:
   - Accepts commands via `addCommand(command)`
   - Executes all queued commands in priority order via `processQueue()`
   - Logs each execution with a timestamp
   - Supports `undoLast()` for the most recently processed command
   - `getLog()` returns the execution history
- At least two concrete commands with different priorities

```java
import java.util.*;

interface PriorityCommand {
    void execute();
    void undo();
    int getPriority(); // Lower number = higher priority
    String getDescription();
}

class Server {
    public void backup() {
        // TODO: Print "[Backup] Backing up server..."
    }

    public void deploy(String version) {
        // TODO: Print "[Deploy] Deploying version " + version + "..."
    }

    public void restart() {
        // TODO: Print "[Restart] Restarting server..."
    }

    public void rollbackDeploy(String version) {
        // TODO: Print "[Deploy] Rolled back version " + version
    }

    public void rollbackRestart() {
        // TODO: Print "[Restart] Server restart rolled back"
    }

    public void rollbackBackup() {
        // TODO: Print "[Backup] Backup rolled back"
    }
}

class BackupCommand implements PriorityCommand {
    private Server server;

    public BackupCommand(Server server) { this.server = server; }

    @Override
    public void execute() { /* TODO: Call server.backup() */ }

    @Override
    public void undo() { /* TODO: Call server.rollbackBackup() */ }

    @Override
    public int getPriority() { return 1; }

    @Override
    public String getDescription() { return "Backup"; }
}

class DeployCommand implements PriorityCommand {
    private Server server;
    private String version;

    public DeployCommand(Server server, String version) {
        this.server = server;
        this.version = version;
    }

    @Override
    public void execute() { /* TODO: Call server.deploy(version) */ }

    @Override
    public void undo() { /* TODO: Call server.rollbackDeploy(version) */ }

    @Override
    public int getPriority() { return 2; }

    @Override
    public String getDescription() { return "Deploy " + version; }
}

class RestartCommand implements PriorityCommand {
    private Server server;

    public RestartCommand(Server server) { this.server = server; }

    @Override
    public void execute() { /* TODO: Call server.restart() */ }

    @Override
    public void undo() { /* TODO: Call server.rollbackRestart() */ }

    @Override
    public int getPriority() { return 3; }

    @Override
    public String getDescription() { return "Restart"; }
}

class CommandQueue {
    private List<PriorityCommand> queue = new ArrayList<>();
    private Stack<PriorityCommand> history = new Stack<>();
    private List<String> log = new ArrayList<>();

    public void addCommand(PriorityCommand command) {
        // TODO: Add command to queue
    }

    public void processQueue() {
        // TODO: Sort by priority, execute all, log each, clear queue
    }

    public void undoLast() {
        // TODO: Pop from history and call undo()
    }

    public List<String> getLog() {
        return log;
    }
}

public class Main {
    public static void main(String[] args) {
        // Server server = new Server();
        // CommandQueue queue = new CommandQueue();
        // queue.addCommand(new RestartCommand(server));    // priority 3
        // queue.addCommand(new BackupCommand(server));     // priority 1
        // queue.addCommand(new DeployCommand(server, "v2.0")); // priority 2
        // queue.processQueue(); // Should execute: Backup, Deploy, Restart
        // queue.getLog().forEach(System.out::println);
        // queue.undoLast(); // undo Restart (last executed)
    }
}
```

```python
from abc import ABC, abstractmethod

class PriorityCommand(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass

    @abstractmethod
    def get_priority(self):
        pass

    @abstractmethod
    def get_description(self):
        pass

class Server:
    def backup(self):
        # TODO: Print "[Backup] Backing up server..."
        pass

    def deploy(self, version):
        # TODO: Print "[Deploy] Deploying version {version}..."
        pass

    def restart(self):
        # TODO: Print "[Restart] Restarting server..."
        pass

    def rollback_deploy(self, version):
        # TODO: Print "[Deploy] Rolled back version {version}"
        pass

    def rollback_restart(self):
        # TODO: Print "[Restart] Server restart rolled back"
        pass

    def rollback_backup(self):
        # TODO: Print "[Backup] Backup rolled back"
        pass

class BackupCommand(PriorityCommand):
    def __init__(self, server):
        self.server = server

    def execute(self):
        # TODO: Call self.server.backup()
        pass

    def undo(self):
        # TODO: Call self.server.rollback_backup()
        pass

    def get_priority(self):
        return 1

    def get_description(self):
        return "Backup"

class DeployCommand(PriorityCommand):
    def __init__(self, server, version):
        self.server = server
        self.version = version

    def execute(self):
        # TODO: Call self.server.deploy(self.version)
        pass

    def undo(self):
        # TODO: Call self.server.rollback_deploy(self.version)
        pass

    def get_priority(self):
        return 2

    def get_description(self):
        return f"Deploy {self.version}"

class RestartCommand(PriorityCommand):
    def __init__(self, server):
        self.server = server

    def execute(self):
        # TODO: Call self.server.restart()
        pass

    def undo(self):
        # TODO: Call self.server.rollback_restart()
        pass

    def get_priority(self):
        return 3

    def get_description(self):
        return "Restart"

class CommandQueue:
    def __init__(self):
        self._queue = []
        self._history = []
        self._log = []

    def add_command(self, command):
        # TODO: Add command to queue
        pass

    def process_queue(self):
        # TODO: Sort by priority, execute all, log each, clear queue
        pass

    def undo_last(self):
        # TODO: Pop from history and call undo()
        pass

    def get_log(self):
        return self._log

if __name__ == "__main__":
    # server = Server()
    # queue = CommandQueue()
    # queue.add_command(RestartCommand(server))
    # queue.add_command(BackupCommand(server))
    # queue.add_command(DeployCommand(server, "v2.0"))
    # queue.process_queue()
    # for entry in queue.get_log():
    #     print(entry)
    # queue.undo_last()
    pass
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class PriorityCommand {
public:
    virtual ~PriorityCommand() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
    virtual int getPriority() = 0;
    virtual string getDescription() = 0;
};

class Server {
public:
    void backup() {
        /* TODO: Print "[Backup] Backing up server..." */
    }

    void deploy(const string& version) {
        /* TODO: Print "[Deploy] Deploying version..." */
    }

    void restart() {
        /* TODO: Print "[Restart] Restarting server..." */
    }

    void rollbackDeploy(const string& version) {
        /* TODO: Print "[Deploy] Rolled back version..." */
    }

    void rollbackRestart() {
        /* TODO: Print "[Restart] Server restart rolled back" */
    }

    void rollbackBackup() {
        /* TODO: Print "[Backup] Backup rolled back" */
    }
};

class BackupCommand : public PriorityCommand {
    Server* server;
public:
    BackupCommand(Server* server) : server(server) {}

    void execute() override {
        /* TODO: Call server->backup() */
    }

    void undo() override {
        /* TODO: Call server->rollbackBackup() */
    }

    int getPriority() override {
        return 1;
    }

    string getDescription() override {
        return "Backup";
    }
};

class DeployCommand : public PriorityCommand {
    Server* server;
    string version;
public:
    DeployCommand(Server* server, const string& version) : server(server), version(version) {}

    void execute() override {
        /* TODO: Call server->deploy(version) */
    }

    void undo() override {
        /* TODO: Call server->rollbackDeploy(version) */
    }

    int getPriority() override {
        return 2;
    }

    string getDescription() override {
        return "Deploy " + version;
    }
};

class RestartCommand : public PriorityCommand {
    Server* server;
public:
    RestartCommand(Server* server) : server(server) {}

    void execute() override {
        /* TODO: Call server->restart() */
    }

    void undo() override {
        /* TODO: Call server->rollbackRestart() */
    }

    int getPriority() override {
        return 3;
    }

    string getDescription() override {
        return "Restart";
    }
};

class CommandQueue {
    vector<PriorityCommand*> queue;
    vector<PriorityCommand*> history;
    vector<string> log;
public:
    void addCommand(PriorityCommand* command) {
        // TODO: Add command to queue
    }

    void processQueue() {
        // TODO: Sort by priority, execute all, log each, clear queue
    }

    void undoLast() {
        // TODO: Pop from history and call undo()
    }

    vector<string> getLog() {
        return log;
    }
};

int main() {
    // Server server;
    // CommandQueue queue;
    // queue.addCommand(new RestartCommand(&server));
    // queue.addCommand(new BackupCommand(&server));
    // queue.addCommand(new DeployCommand(&server, "v2.0"));
    // queue.processQueue();
    // cout << "\nExecution Log:" << endl;
    // for (const auto& entry : queue.getLog())
    //     cout << "  " << entry << endl;
    // queue.undoLast();
    return 0;
}
```

```go
package main

type PriorityCommand interface {
	Execute()
	Undo()
	GetPriority() int // Lower number = higher priority
	GetDescription() string
}

type Server struct{}

func (s *Server) Backup() {
	// TODO: Print "[Backup] Backing up server..."
}

func (s *Server) Deploy(version string) {
	// TODO: Print "[Deploy] Deploying version " + version + "..."
}

func (s *Server) Restart() {
	// TODO: Print "[Restart] Restarting server..."
}

func (s *Server) RollbackDeploy(version string) {
	// TODO: Print "[Deploy] Rolled back version " + version
}

func (s *Server) RollbackRestart() {
	// TODO: Print "[Restart] Server restart rolled back"
}

func (s *Server) RollbackBackup() {
	// TODO: Print "[Backup] Backup rolled back"
}

type BackupCommand struct {
	server *Server
}

func NewBackupCommand(server *Server) *BackupCommand {
	return &BackupCommand{server: server}
}

func (c *BackupCommand) Execute() {
	// TODO: Call server.backup()
}

func (c *BackupCommand) Undo() {
	// TODO: Call server.rollbackBackup()
}

func (c *BackupCommand) GetPriority() int {
	return 1
}

func (c *BackupCommand) GetDescription() string {
	return "Backup"
}

type DeployCommand struct {
	server  *Server
	version string
}

func NewDeployCommand(server *Server, version string) *DeployCommand {
	return &DeployCommand{server: server, version: version}
}

func (c *DeployCommand) Execute() {
	// TODO: Call server.deploy(version)
}

func (c *DeployCommand) Undo() {
	// TODO: Call server.rollbackDeploy(version)
}

func (c *DeployCommand) GetPriority() int {
	return 2
}

func (c *DeployCommand) GetDescription() string {
	return "Deploy " + c.version
}

type RestartCommand struct {
	server *Server
}

func NewRestartCommand(server *Server) *RestartCommand {
	return &RestartCommand{server: server}
}

func (c *RestartCommand) Execute() {
	// TODO: Call server.restart()
}

func (c *RestartCommand) Undo() {
	// TODO: Call server.rollbackRestart()
}

func (c *RestartCommand) GetPriority() int {
	return 3
}

func (c *RestartCommand) GetDescription() string {
	return "Restart"
}

type CommandQueue struct {
	queue   []PriorityCommand
	history []PriorityCommand
	log     []string
}

func NewCommandQueue() *CommandQueue {
	return &CommandQueue{
		queue:   []PriorityCommand{},
		history: []PriorityCommand{},
		log:     []string{},
	}
}

func (q *CommandQueue) AddCommand(command PriorityCommand) {
	// TODO: Add command to queue
}

func (q *CommandQueue) ProcessQueue() {
	// TODO: Sort by priority, execute all, log each, clear queue
}

func (q *CommandQueue) UndoLast() {
	// TODO: Pop from history and call undo()
}

func (q *CommandQueue) GetLog() []string {
	return q.log
}

func main() {
	// server := &Server{}
	// queue := NewCommandQueue()
	// queue.AddCommand(NewRestartCommand(server))    // priority 3
	// queue.AddCommand(NewBackupCommand(server))     // priority 1
	// queue.AddCommand(NewDeployCommand(server, "v2.0")) // priority 2
	// queue.ProcessQueue() // Should execute: Backup, Deploy, Restart
	// for _, entry := range queue.GetLog() {
	// 	println(entry)
	// }
	// queue.UndoLast() // undo Restart (last executed)
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

interface IPriorityCommand
{
    void Execute();
    void Undo();
    int GetPriority();
    string GetDescription();
}

class Server
{
    public void Backup()
    {
        /* TODO: Print "[Backup] Backing up server..." */
    }
    public void Deploy(string version)
    {
        /* TODO: Print "[Deploy] Deploying version..." */
    }
    public void Restart()
    {
        /* TODO: Print "[Restart] Restarting server..." */
    }
    public void RollbackDeploy(string version)
    {
        /* TODO: Print "[Deploy] Rolled back version..." */
    }
    public void RollbackRestart()
    {
        /* TODO: Print "[Restart] Server restart rolled back" */
    }
    public void RollbackBackup()
    {
        /* TODO: Print "[Backup] Backup rolled back" */
    }
}

class BackupCommand : IPriorityCommand
{
    private Server server;
    public BackupCommand(Server server)
    {
        this.server = server;
    }
    public void Execute()
    {
        /* TODO: Call server.Backup() */
    }
    public void Undo()
    {
        /* TODO: Call server.RollbackBackup() */
    }
    public int GetPriority()
    {
        return 1;
    }
    public string GetDescription()
    {
        return "Backup";
    }
}

class DeployCommand : IPriorityCommand
{
    private Server server;
    private string version;
    public DeployCommand(Server server, string version)
    {
        this.server = server;
        this.version = version;
    }
    public void Execute()
    {
        /* TODO: Call server.Deploy(version) */
    }
    public void Undo()
    {
        /* TODO: Call server.RollbackDeploy(version) */
    }
    public int GetPriority()
    {
        return 2;
    }
    public string GetDescription()
    {
        return $"Deploy {version}";
    }
}

class RestartCommand : IPriorityCommand
{
    private Server server;
    public RestartCommand(Server server)
    {
        this.server = server;
    }
    public void Execute()
    {
        /* TODO: Call server.Restart() */
    }
    public void Undo()
    {
        /* TODO: Call server.RollbackRestart() */
    }
    public int GetPriority()
    {
        return 3;
    }
    public string GetDescription()
    {
        return "Restart";
    }
}

class CommandQueue
{
    private List<IPriorityCommand> queue = new List<IPriorityCommand>();
    private Stack<IPriorityCommand> history = new Stack<IPriorityCommand>();
    private List<string> log = new List<string>();

    public void AddCommand(IPriorityCommand command)
    {
        // TODO: Add command to queue
    }

    public void ProcessQueue()
    {
        // TODO: Sort by priority, execute all, log each, clear queue
    }

    public void UndoLast()
    {
        // TODO: Pop from history and call Undo()
    }

    public List<string> GetLog()
    {
        return log;
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Server server = new Server();
        // CommandQueue queue = new CommandQueue();
        // queue.AddCommand(new RestartCommand(server));
        // queue.AddCommand(new BackupCommand(server));
        // queue.AddCommand(new DeployCommand(server, "v2.0"));
        // queue.ProcessQueue();
        // Console.WriteLine("\nExecution Log:");
        // foreach (var entry in queue.GetLog())
        //     Console.WriteLine("  " + entry);
        // queue.UndoLast();
    }
}
```

```typescript
interface PriorityCommand {
    execute(): void;
    undo(): void;
    getPriority(): number;
    getDescription(): string;
}

class Server {
    backup(): void {
        /* TODO: Print "[Backup] Backing up server..." */
    }
    deploy(version: string): void {
        /* TODO: Print "[Deploy] Deploying version..." */
    }
    restart(): void {
        /* TODO: Print "[Restart] Restarting server..." */
    }
    rollbackDeploy(version: string): void {
        /* TODO: Print "[Deploy] Rolled back version..." */
    }
    rollbackRestart(): void {
        /* TODO: Print "[Restart] Server restart rolled back" */
    }
    rollbackBackup(): void {
        /* TODO: Print "[Backup] Backup rolled back" */
    }
}

class BackupCommand implements PriorityCommand {
    private server: Server;
    constructor(server: Server) {
        this.server = server;
    }
    execute(): void {
        /* TODO: Call this.server.backup() */
    }
    undo(): void {
        /* TODO: Call this.server.rollbackBackup() */
    }
    getPriority(): number {
        return 1;
    }
    getDescription(): string {
        return "Backup";
    }
}

class DeployCommand implements PriorityCommand {
    private server: Server;
    private version: string;
    constructor(server: Server, version: string) {
        this.server = server;
        this.version = version;
    }
    execute(): void {
        /* TODO: Call this.server.deploy(this.version) */
    }
    undo(): void {
        /* TODO: Call this.server.rollbackDeploy(this.version) */
    }
    getPriority(): number {
        return 2;
    }
    getDescription(): string {
        return "Deploy " + this.version;
    }
}

class RestartCommand implements PriorityCommand {
    private server: Server;
    constructor(server: Server) {
        this.server = server;
    }
    execute(): void {
        /* TODO: Call this.server.restart() */
    }
    undo(): void {
        /* TODO: Call this.server.rollbackRestart() */
    }
    getPriority(): number {
        return 3;
    }
    getDescription(): string {
        return "Restart";
    }
}

class CommandQueue {
    private queue: PriorityCommand[] = [];
    private history: PriorityCommand[] = [];
    private log: string[] = [];

    addCommand(command: PriorityCommand): void {
        // TODO: Add command to queue
    }

    processQueue(): void {
        // TODO: Sort by priority, execute all, log each, clear queue
    }

    undoLast(): void {
        // TODO: Pop from history and call undo()
    }

    getLog(): string[] {
        return this.log;
    }
}

// const server = new Server();
// const queue = new CommandQueue();
// queue.addCommand(new RestartCommand(server));
// queue.addCommand(new BackupCommand(server));
// queue.addCommand(new DeployCommand(server, "v2.0"));
// queue.processQueue();
// console.log("\nExecution Log:");
// for (const entry of queue.getLog()) {
//     console.log("  " + entry);
// }
// queue.undoLast();
```

#### Solutions

```java
import java.util.*;

interface PriorityCommand {
    void execute();
    void undo();
    int getPriority();
    String getDescription();
}

class Server {
    public void backup() {
        System.out.println("[Backup] Backing up server...");
    }

    public void deploy(String version) {
        System.out.println("[Deploy] Deploying version " + version + "...");
    }

    public void restart() {
        System.out.println("[Restart] Restarting server...");
    }

    public void rollbackDeploy(String version) {
        System.out.println("[Deploy] Rolled back version " + version);
    }

    public void rollbackRestart() {
        System.out.println("[Restart] Server restart rolled back");
    }

    public void rollbackBackup() {
        System.out.println("[Backup] Backup rolled back");
    }
}

class BackupCommand implements PriorityCommand {
    private Server server;

    public BackupCommand(Server server) {
        this.server = server;
    }

    @Override
    public void execute() { server.backup(); }

    @Override
    public void undo() { server.rollbackBackup(); }

    @Override
    public int getPriority() { return 1; }

    @Override
    public String getDescription() { return "Backup"; }
}

class DeployCommand implements PriorityCommand {
    private Server server;
    private String version;

    public DeployCommand(Server server, String version) {
        this.server = server;
        this.version = version;
    }

    @Override
    public void execute() { server.deploy(version); }

    @Override
    public void undo() { server.rollbackDeploy(version); }

    @Override
    public int getPriority() { return 2; }

    @Override
    public String getDescription() { return "Deploy " + version; }
}

class RestartCommand implements PriorityCommand {
    private Server server;

    public RestartCommand(Server server) {
        this.server = server;
    }

    @Override
    public void execute() { server.restart(); }

    @Override
    public void undo() { server.rollbackRestart(); }

    @Override
    public int getPriority() { return 3; }

    @Override
    public String getDescription() { return "Restart"; }
}

class CommandQueue {
    private List<PriorityCommand> queue = new ArrayList<>();
    private Stack<PriorityCommand> history = new Stack<>();
    private List<String> log = new ArrayList<>();

    public void addCommand(PriorityCommand command) {
        queue.add(command);
    }

    public void processQueue() {
        queue.sort(Comparator.comparingInt(PriorityCommand::getPriority));
        for (PriorityCommand command : queue) {
            command.execute();
            history.push(command);
            log.add(command.getDescription() + " (priority " + command.getPriority() + ")");
        }
        queue.clear();
    }

    public void undoLast() {
        if (!history.isEmpty()) {
            System.out.println("\nUndoing last command...");
            history.pop().undo();
        }
    }

    public List<String> getLog() {
        return log;
    }
}

public class Main {
    public static void main(String[] args) {
        Server server = new Server();
        CommandQueue queue = new CommandQueue();
        queue.addCommand(new RestartCommand(server));
        queue.addCommand(new BackupCommand(server));
        queue.addCommand(new DeployCommand(server, "v2.0"));
        queue.processQueue();
        System.out.println("\nExecution Log:");
        queue.getLog().forEach(entry -> System.out.println("  " + entry));
        queue.undoLast();
    }
}
```

```python
from abc import ABC, abstractmethod

class PriorityCommand(ABC):
    @abstractmethod
    def execute(self):
        pass

    @abstractmethod
    def undo(self):
        pass

    @abstractmethod
    def get_priority(self):
        pass

    @abstractmethod
    def get_description(self):
        pass

class Server:
    def backup(self):
        print("[Backup] Backing up server...")

    def deploy(self, version):
        print(f"[Deploy] Deploying version {version}...")

    def restart(self):
        print("[Restart] Restarting server...")

    def rollback_deploy(self, version):
        print(f"[Deploy] Rolled back version {version}")

    def rollback_restart(self):
        print("[Restart] Server restart rolled back")

    def rollback_backup(self):
        print("[Backup] Backup rolled back")

class BackupCommand(PriorityCommand):
    def __init__(self, server):
        self.server = server

    def execute(self):
        self.server.backup()

    def undo(self):
        self.server.rollback_backup()

    def get_priority(self):
        return 1

    def get_description(self):
        return "Backup"

class DeployCommand(PriorityCommand):
    def __init__(self, server, version):
        self.server = server
        self.version = version

    def execute(self):
        self.server.deploy(self.version)

    def undo(self):
        self.server.rollback_deploy(self.version)

    def get_priority(self):
        return 2

    def get_description(self):
        return f"Deploy {self.version}"

class RestartCommand(PriorityCommand):
    def __init__(self, server):
        self.server = server

    def execute(self):
        self.server.restart()

    def undo(self):
        self.server.rollback_restart()

    def get_priority(self):
        return 3

    def get_description(self):
        return "Restart"

class CommandQueue:
    def __init__(self):
        self._queue = []
        self._history = []
        self._log = []

    def add_command(self, command):
        self._queue.append(command)

    def process_queue(self):
        self._queue.sort(key=lambda cmd: cmd.get_priority())
        for command in self._queue:
            command.execute()
            self._history.append(command)
            self._log.append(f"{command.get_description()} (priority {command.get_priority()})")
        self._queue.clear()

    def undo_last(self):
        if self._history:
            print("\nUndoing last command...")
            self._history.pop().undo()

    def get_log(self):
        return self._log

if __name__ == "__main__":
    server = Server()
    queue = CommandQueue()
    queue.add_command(RestartCommand(server))
    queue.add_command(BackupCommand(server))
    queue.add_command(DeployCommand(server, "v2.0"))
    queue.process_queue()
    print("\nExecution Log:")
    for entry in queue.get_log():
        print(f"  {entry}")
    queue.undo_last()
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

class PriorityCommand {
public:
    virtual ~PriorityCommand() = default;
    virtual void execute() = 0;
    virtual void undo() = 0;
    virtual int getPriority() = 0;
    virtual string getDescription() = 0;
};

class Server {
public:
    void backup() {
        cout << "[Backup] Backing up server..." << endl;
    }

    void deploy(const string& version) {
        cout << "[Deploy] Deploying version " << version << "..." << endl;
    }

    void restart() {
        cout << "[Restart] Restarting server..." << endl;
    }

    void rollbackDeploy(const string& version) {
        cout << "[Deploy] Rolled back version " << version << endl;
    }

    void rollbackRestart() {
        cout << "[Restart] Server restart rolled back" << endl;
    }

    void rollbackBackup() {
        cout << "[Backup] Backup rolled back" << endl;
    }
};

class BackupCommand : public PriorityCommand {
    Server* server;
public:
    BackupCommand(Server* server) : server(server) {}

    void execute() override {
        server->backup();
    }

    void undo() override {
        server->rollbackBackup();
    }

    int getPriority() override {
        return 1;
    }

    string getDescription() override {
        return "Backup";
    }
};

class DeployCommand : public PriorityCommand {
    Server* server;
    string version;
public:
    DeployCommand(Server* server, const string& version) : server(server), version(version) {}

    void execute() override {
        server->deploy(version);
    }

    void undo() override {
        server->rollbackDeploy(version);
    }

    int getPriority() override {
        return 2;
    }

    string getDescription() override {
        return "Deploy " + version;
    }
};

class RestartCommand : public PriorityCommand {
    Server* server;
public:
    RestartCommand(Server* server) : server(server) {}

    void execute() override {
        server->restart();
    }

    void undo() override {
        server->rollbackRestart();
    }

    int getPriority() override {
        return 3;
    }

    string getDescription() override {
        return "Restart";
    }
};

class CommandQueue {
    vector<PriorityCommand*> queue;
    vector<PriorityCommand*> history;
    vector<string> log;
public:
    void addCommand(PriorityCommand* command) {
        queue.push_back(command);
    }

    void processQueue() {
        sort(queue.begin(), queue.end(), [](PriorityCommand* a, PriorityCommand* b) {
            return a->getPriority() < b->getPriority();
        });
        for (auto* command : queue) {
            command->execute();
            history.push_back(command);
            log.push_back(command->getDescription() + " (priority " + to_string(command->getPriority()) + ")");
        }
        queue.clear();
    }

    void undoLast() {
        if (!history.empty()) {
            cout << "\nUndoing last command..." << endl;
            history.back()->undo();
            history.pop_back();
        }
    }

    vector<string> getLog() {
        return log;
    }
};

int main() {
    Server server;
    CommandQueue queue;
    queue.addCommand(new RestartCommand(&server));
    queue.addCommand(new BackupCommand(&server));
    queue.addCommand(new DeployCommand(&server, "v2.0"));
    queue.processQueue();
    cout << "\nExecution Log:" << endl;
    for (const auto& entry : queue.getLog()) {
        cout << "  " << entry << endl;
    }
    queue.undoLast();
    return 0;
}
```

```go
package main

import (
	"fmt"
	"sort"
)

type PriorityCommand interface {
	Execute()
	Undo()
	GetPriority() int
	GetDescription() string
}

type Server struct{}

func (s *Server) Backup() {
	fmt.Println("[Backup] Backing up server...")
}

func (s *Server) Deploy(version string) {
	fmt.Printf("[Deploy] Deploying version %s...\n", version)
}

func (s *Server) Restart() {
	fmt.Println("[Restart] Restarting server...")
}

func (s *Server) RollbackDeploy(version string) {
	fmt.Printf("[Deploy] Rolled back version %s\n", version)
}

func (s *Server) RollbackRestart() {
	fmt.Println("[Restart] Server restart rolled back")
}

func (s *Server) RollbackBackup() {
	fmt.Println("[Backup] Backup rolled back")
}

type BackupCommand struct {
	server *Server
}

func NewBackupCommand(server *Server) *BackupCommand {
	return &BackupCommand{server: server}
}

func (c *BackupCommand) Execute() {
	c.server.Backup()
}

func (c *BackupCommand) Undo() {
	c.server.RollbackBackup()
}

func (c *BackupCommand) GetPriority() int {
	return 1
}

func (c *BackupCommand) GetDescription() string {
	return "Backup"
}

type DeployCommand struct {
	server  *Server
	version string
}

func NewDeployCommand(server *Server, version string) *DeployCommand {
	return &DeployCommand{server: server, version: version}
}

func (c *DeployCommand) Execute() {
	c.server.Deploy(c.version)
}

func (c *DeployCommand) Undo() {
	c.server.RollbackDeploy(c.version)
}

func (c *DeployCommand) GetPriority() int {
	return 2
}

func (c *DeployCommand) GetDescription() string {
	return "Deploy " + c.version
}

type RestartCommand struct {
	server *Server
}

func NewRestartCommand(server *Server) *RestartCommand {
	return &RestartCommand{server: server}
}

func (c *RestartCommand) Execute() {
	c.server.Restart()
}

func (c *RestartCommand) Undo() {
	c.server.RollbackRestart()
}

func (c *RestartCommand) GetPriority() int {
	return 3
}

func (c *RestartCommand) GetDescription() string {
	return "Restart"
}

type CommandQueue struct {
	queue   []PriorityCommand
	history []PriorityCommand
	log     []string
}

func NewCommandQueue() *CommandQueue {
	return &CommandQueue{
		queue:   make([]PriorityCommand, 0),
		history: make([]PriorityCommand, 0),
		log:     make([]string, 0),
	}
}

func (q *CommandQueue) AddCommand(command PriorityCommand) {
	q.queue = append(q.queue, command)
}

func (q *CommandQueue) ProcessQueue() {
	sort.Slice(q.queue, func(i, j int) bool {
		return q.queue[i].GetPriority() < q.queue[j].GetPriority()
	})
	for _, command := range q.queue {
		command.Execute()
		q.history = append(q.history, command)
		q.log = append(q.log, fmt.Sprintf("%s (priority %d)", command.GetDescription(), command.GetPriority()))
	}
	q.queue = q.queue[:0]
}

func (q *CommandQueue) UndoLast() {
	if len(q.history) > 0 {
		fmt.Println("\nUndoing last command...")
		last := q.history[len(q.history)-1]
		q.history = q.history[:len(q.history)-1]
		last.Undo()
	}
}

func (q *CommandQueue) GetLog() []string {
	return q.log
}

func main() {
	server := &Server{}
	queue := NewCommandQueue()

	queue.AddCommand(NewRestartCommand(server))
	queue.AddCommand(NewBackupCommand(server))
	queue.AddCommand(NewDeployCommand(server, "v2.0"))

	queue.ProcessQueue()

	fmt.Println("\nExecution Log:")
	for _, entry := range queue.GetLog() {
		fmt.Println("  " + entry)
	}

	queue.UndoLast()
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

interface IPriorityCommand
{
    void Execute();
    void Undo();
    int GetPriority();
    string GetDescription();
}

class Server
{
    public void Backup()
    {
        Console.WriteLine("[Backup] Backing up server...");
    }
    public void Deploy(string version)
    {
        Console.WriteLine($"[Deploy] Deploying version {version}...");
    }
    public void Restart()
    {
        Console.WriteLine("[Restart] Restarting server...");
    }
    public void RollbackDeploy(string version)
    {
        Console.WriteLine($"[Deploy] Rolled back version {version}");
    }
    public void RollbackRestart()
    {
        Console.WriteLine("[Restart] Server restart rolled back");
    }
    public void RollbackBackup()
    {
        Console.WriteLine("[Backup] Backup rolled back");
    }
}

class BackupCommand : IPriorityCommand
{
    private Server server;
    public BackupCommand(Server server)
    {
        this.server = server;
    }
    public void Execute()
    {
        server.Backup();
    }
    public void Undo()
    {
        server.RollbackBackup();
    }
    public int GetPriority()
    {
        return 1;
    }
    public string GetDescription()
    {
        return "Backup";
    }
}

class DeployCommand : IPriorityCommand
{
    private Server server;
    private string version;
    public DeployCommand(Server server, string version)
    {
        this.server = server;
        this.version = version;
    }
    public void Execute()
    {
        server.Deploy(version);
    }
    public void Undo()
    {
        server.RollbackDeploy(version);
    }
    public int GetPriority()
    {
        return 2;
    }
    public string GetDescription()
    {
        return $"Deploy {version}";
    }
}

class RestartCommand : IPriorityCommand
{
    private Server server;
    public RestartCommand(Server server)
    {
        this.server = server;
    }
    public void Execute()
    {
        server.Restart();
    }
    public void Undo()
    {
        server.RollbackRestart();
    }
    public int GetPriority()
    {
        return 3;
    }
    public string GetDescription()
    {
        return "Restart";
    }
}

class CommandQueue
{
    private List<IPriorityCommand> queue = new List<IPriorityCommand>();
    private Stack<IPriorityCommand> history = new Stack<IPriorityCommand>();
    private List<string> log = new List<string>();

    public void AddCommand(IPriorityCommand command)
    {
        queue.Add(command);
    }

    public void ProcessQueue()
    {
        queue = queue.OrderBy(c => c.GetPriority()).ToList();
        foreach (var command in queue)
        {
            command.Execute();
            history.Push(command);
            log.Add($"{command.GetDescription()} (priority {command.GetPriority()})");
        }
        queue.Clear();
    }

    public void UndoLast()
    {
        if (history.Count > 0)
        {
            Console.WriteLine("\nUndoing last command...");
            history.Pop().Undo();
        }
    }

    public List<string> GetLog()
    {
        return log;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Server server = new Server();
        CommandQueue queue = new CommandQueue();
        queue.AddCommand(new RestartCommand(server));
        queue.AddCommand(new BackupCommand(server));
        queue.AddCommand(new DeployCommand(server, "v2.0"));
        queue.ProcessQueue();
        Console.WriteLine("\nExecution Log:");
        foreach (var entry in queue.GetLog())
        {
            Console.WriteLine("  " + entry);
        }
        queue.UndoLast();
    }
}
```

```typescript
interface PriorityCommand {
    execute(): void;
    undo(): void;
    getPriority(): number;
    getDescription(): string;
}

class Server {
    backup(): void {
        console.log("[Backup] Backing up server...");
    }
    deploy(version: string): void {
        console.log(`[Deploy] Deploying version ${version}...`);
    }
    restart(): void {
        console.log("[Restart] Restarting server...");
    }
    rollbackDeploy(version: string): void {
        console.log(`[Deploy] Rolled back version ${version}`);
    }
    rollbackRestart(): void {
        console.log("[Restart] Server restart rolled back");
    }
    rollbackBackup(): void {
        console.log("[Backup] Backup rolled back");
    }
}

class BackupCommand implements PriorityCommand {
    private server: Server;
    constructor(server: Server) {
        this.server = server;
    }
    execute(): void {
        this.server.backup();
    }
    undo(): void {
        this.server.rollbackBackup();
    }
    getPriority(): number {
        return 1;
    }
    getDescription(): string {
        return "Backup";
    }
}

class DeployCommand implements PriorityCommand {
    private server: Server;
    private version: string;
    constructor(server: Server, version: string) {
        this.server = server;
        this.version = version;
    }
    execute(): void {
        this.server.deploy(this.version);
    }
    undo(): void {
        this.server.rollbackDeploy(this.version);
    }
    getPriority(): number {
        return 2;
    }
    getDescription(): string {
        return `Deploy ${this.version}`;
    }
}

class RestartCommand implements PriorityCommand {
    private server: Server;
    constructor(server: Server) {
        this.server = server;
    }
    execute(): void {
        this.server.restart();
    }
    undo(): void {
        this.server.rollbackRestart();
    }
    getPriority(): number {
        return 3;
    }
    getDescription(): string {
        return "Restart";
    }
}

class CommandQueue {
    private queue: PriorityCommand[] = [];
    private history: PriorityCommand[] = [];
    private log: string[] = [];

    addCommand(command: PriorityCommand): void {
        this.queue.push(command);
    }

    processQueue(): void {
        this.queue.sort((a, b) => a.getPriority() - b.getPriority());
        for (const command of this.queue) {
            command.execute();
            this.history.push(command);
            this.log.push(`${command.getDescription()} (priority ${command.getPriority()})`);
        }
        this.queue = [];
    }

    undoLast(): void {
        const command = this.history.pop();
        if (command) {
            console.log("\nUndoing last command...");
            command.undo();
        }
    }

    getLog(): string[] {
        return this.log;
    }
}

const server = new Server();
const queue = new CommandQueue();
queue.addCommand(new RestartCommand(server));
queue.addCommand(new BackupCommand(server));
queue.addCommand(new DeployCommand(server, "v2.0"));
queue.processQueue();
console.log("\nExecution Log:");
for (const entry of queue.getLog()) {
    console.log("  " + entry);
}
queue.undoLast();
```


