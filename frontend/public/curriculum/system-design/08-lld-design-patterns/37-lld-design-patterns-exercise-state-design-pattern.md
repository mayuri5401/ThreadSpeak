---
id: "lld-design-patterns-exercise-state-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: State Design Pattern"
slug: "lld-design-patterns-exercise-state-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: State Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: State Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Traffic Light Controller

Build a traffic light system where the light cycles through three states: Red, Green, and Yellow. Each state has a different duration and transitions to the next state in the cycle. The `TrafficLight` context should support a `change()` method that advances to the next state and prints the current light color.

**Requirements:**

- State interface: `TrafficLightState` with a method `change(context)` that prints the current color and transitions to the next state
- Concrete states:
   - `RedState` -- prints "RED light - Stop" and transitions to Green
   - `GreenState` -- prints "GREEN light - Go" and transitions to Yellow
   - `YellowState` -- prints "YELLOW light - Slow down" and transitions to Red
- Context: `TrafficLight` with `setState()` and `change()`

```java
interface TrafficLightState {
    void change(TrafficLight context);
}

class RedState implements TrafficLightState {
    public void change(TrafficLight context) {
        // TODO: Print "RED light - Stop" and transition to GreenState
    }
}

class GreenState implements TrafficLightState {
    public void change(TrafficLight context) {
        // TODO: Print "GREEN light - Go" and transition to YellowState
    }
}

class YellowState implements TrafficLightState {
    public void change(TrafficLight context) {
        // TODO: Print "YELLOW light - Slow down" and transition to RedState
    }
}

class TrafficLight {
    private TrafficLightState state;

    public TrafficLight() {
        this.state = new RedState(); // Start with red
    }

    public void setState(TrafficLightState state) {
        this.state = state;
    }

    public void change() {
        state.change(this);
    }
}

public class Main {
    public static void main(String[] args) {
        // TrafficLight light = new TrafficLight();
        // light.change(); // RED light - Stop
        // light.change(); // GREEN light - Go
        // light.change(); // YELLOW light - Slow down
        // light.change(); // RED light - Stop
        // light.change(); // GREEN light - Go
    }
}
```

```python
from abc import ABC, abstractmethod

class TrafficLightState(ABC):
    @abstractmethod
    def change(self, context):
        pass

class RedState(TrafficLightState):
    def change(self, context):
        pass  # TODO: Print "RED light - Stop" and transition to GreenState

class GreenState(TrafficLightState):
    def change(self, context):
        pass  # TODO: Print "GREEN light - Go" and transition to YellowState

class YellowState(TrafficLightState):
    def change(self, context):
        pass  # TODO: Print "YELLOW light - Slow down" and transition to RedState

class TrafficLight:
    def __init__(self):
        self._state = RedState()  # Start with red

    def set_state(self, state):
        self._state = state

    def change(self):
        self._state.change(self)

if __name__ == "__main__":
    pass
    # light = TrafficLight()
    # light.change()  # RED light - Stop
    # light.change()  # GREEN light - Go
    # light.change()  # YELLOW light - Slow down
    # light.change()  # RED light - Stop
    # light.change()  # GREEN light - Go
```

```cpp
#include <iostream>
using namespace std;

class TrafficLight;

class TrafficLightState {
public:
    virtual ~TrafficLightState() = default;
    virtual void change(TrafficLight* context) = 0;
};

class RedState : public TrafficLightState {
public:
    void change(TrafficLight* context) override {
        // TODO: Print "RED light - Stop" and transition to GreenState
    }
};

class GreenState : public TrafficLightState {
public:
    void change(TrafficLight* context) override {
        // TODO: Print "GREEN light - Go" and transition to YellowState
    }
};

class YellowState : public TrafficLightState {
public:
    void change(TrafficLight* context) override {
        // TODO: Print "YELLOW light - Slow down" and transition to RedState
    }
};

class TrafficLight {
private:
    TrafficLightState* state;
public:
    TrafficLight();
    ~TrafficLight() { delete state; }
    void setState(TrafficLightState* s) { delete state; state = s; }
    void change() { state->change(this); }
};

TrafficLight::TrafficLight() { state = new RedState(); } // Start with red

int main() {
    // TrafficLight light;
    // light.change(); // RED light - Stop
    // light.change(); // GREEN light - Go
    // light.change(); // YELLOW light - Slow down
    // light.change(); // RED light - Stop
    // light.change(); // GREEN light - Go
    return 0;
}
```

```go
package main

type TrafficLightState interface {
	change(context *TrafficLight)
}

type RedState struct{}

func (r *RedState) Change(context *TrafficLight) {
	// TODO: Print "RED light - Stop" and transition to GreenState
}

type GreenState struct{}

func (g *GreenState) Change(context *TrafficLight) {
	// TODO: Print "GREEN light - Go" and transition to YellowState
}

type YellowState struct{}

func (y *YellowState) Change(context *TrafficLight) {
	// TODO: Print "YELLOW light - Slow down" and transition to RedState
}

type TrafficLight struct {
	state TrafficLightState
}

func NewTrafficLight() *TrafficLight {
	return &TrafficLight{state: &RedState{}} // Start with red
}

func (t *TrafficLight) SetState(state TrafficLightState) {
	t.state = state
}

func (t *TrafficLight) Change() {
	t.state.change(t)
}

func main() {
	// light := NewTrafficLight()
	// light.Change() // RED light - Stop
	// light.Change() // GREEN light - Go
	// light.Change() // YELLOW light - Slow down
	// light.Change() // RED light - Stop
	// light.Change() // GREEN light - Go
}
```

```csharp
using System;

interface ITrafficLightState
{
    void Change(TrafficLight context);
}

class RedState : ITrafficLightState
{
    public void Change(TrafficLight context) {
        // TODO: Print "RED light - Stop" and transition to GreenState
    }
}

class GreenState : ITrafficLightState
{
    public void Change(TrafficLight context) {
        // TODO: Print "GREEN light - Go" and transition to YellowState
    }
}

class YellowState : ITrafficLightState
{
    public void Change(TrafficLight context) {
        // TODO: Print "YELLOW light - Slow down" and transition to RedState
    }
}

class TrafficLight
{
    private ITrafficLightState _state;

    public TrafficLight()
    {
        _state = new RedState(); // Start with red
    }

    public void SetState(ITrafficLightState state) {
        _state = state;
    }
    public void Change() {
        _state.Change(this);
    }
}

class Program
{
    static void Main(string[] args)
    {
        // TrafficLight light = new TrafficLight();
        // light.Change(); // RED light - Stop
        // light.Change(); // GREEN light - Go
        // light.Change(); // YELLOW light - Slow down
        // light.Change(); // RED light - Stop
        // light.Change(); // GREEN light - Go
    }
}
```

```typescript
interface TrafficLightState {
    change(context: TrafficLight): void;
}

class RedState implements TrafficLightState {
    change(context: TrafficLight): void {
        // TODO: Print "RED light - Stop" and transition to GreenState
    }
}

class GreenState implements TrafficLightState {
    change(context: TrafficLight): void {
        // TODO: Print "GREEN light - Go" and transition to YellowState
    }
}

class YellowState implements TrafficLightState {
    change(context: TrafficLight): void {
        // TODO: Print "YELLOW light - Slow down" and transition to RedState
    }
}

class TrafficLight {
    private state: TrafficLightState;

    constructor() {
        this.state = new RedState(); // Start with red
    }

    setState(state: TrafficLightState): void {
        this.state = state;
    }
    change(): void {
        this.state.change(this);
    }
}

// const light = new TrafficLight();
// light.change(); // RED light - Stop
// light.change(); // GREEN light - Go
// light.change(); // YELLOW light - Slow down
// light.change(); // RED light - Stop
// light.change(); // GREEN light - Go
```

#### Solutions

```java
interface TrafficLightState {
    void change(TrafficLight context);
}

class RedState implements TrafficLightState {
    public void change(TrafficLight context) {
        System.out.println("RED light - Stop");
        context.setState(new GreenState());
    }
}

class GreenState implements TrafficLightState {
    public void change(TrafficLight context) {
        System.out.println("GREEN light - Go");
        context.setState(new YellowState());
    }
}

class YellowState implements TrafficLightState {
    public void change(TrafficLight context) {
        System.out.println("YELLOW light - Slow down");
        context.setState(new RedState());
    }
}

class TrafficLight {
    private TrafficLightState state;

    public TrafficLight() {
        this.state = new RedState(); // Start with red
    }

    public void setState(TrafficLightState state) {
        this.state = state;
    }

    public void change() {
        state.change(this);
    }
}

public class Main {
    public static void main(String[] args) {
        TrafficLight light = new TrafficLight();
        light.change(); // RED light - Stop
        light.change(); // GREEN light - Go
        light.change(); // YELLOW light - Slow down
        light.change(); // RED light - Stop
        light.change(); // GREEN light - Go
    }
}
```

```python
from abc import ABC, abstractmethod

class TrafficLightState(ABC):
    @abstractmethod
    def change(self, context):
        pass

class RedState(TrafficLightState):
    def change(self, context):
        print("RED light - Stop")
        context.set_state(GreenState())

class GreenState(TrafficLightState):
    def change(self, context):
        print("GREEN light - Go")
        context.set_state(YellowState())

class YellowState(TrafficLightState):
    def change(self, context):
        print("YELLOW light - Slow down")
        context.set_state(RedState())

class TrafficLight:
    def __init__(self):
        self._state = RedState()  # Start with red

    def set_state(self, state):
        self._state = state

    def change(self):
        self._state.change(self)

if __name__ == "__main__":
    light = TrafficLight()
    light.change()  # RED light - Stop
    light.change()  # GREEN light - Go
    light.change()  # YELLOW light - Slow down
    light.change()  # RED light - Stop
    light.change()  # GREEN light - Go
```

```cpp
#include <iostream>
using namespace std;

class TrafficLight;

class TrafficLightState {
public:
    virtual ~TrafficLightState() = default;
    virtual void change(TrafficLight* context) = 0;
};

class GreenState;
class YellowState;

class RedState : public TrafficLightState {
public:
    void change(TrafficLight* context) override;
};

class GreenState : public TrafficLightState {
public:
    void change(TrafficLight* context) override;
};

class YellowState : public TrafficLightState {
public:
    void change(TrafficLight* context) override;
};

class TrafficLight {
private:
    TrafficLightState* state;
public:
    TrafficLight();
    ~TrafficLight() { delete state; }
    void setState(TrafficLightState* s) { delete state; state = s; }
    void change() { state->change(this); }
};

TrafficLight::TrafficLight() { state = new RedState(); }

void RedState::change(TrafficLight* context) {
    cout << "RED light - Stop" << endl;
    context->setState(new GreenState());
}

void GreenState::change(TrafficLight* context) {
    cout << "GREEN light - Go" << endl;
    context->setState(new YellowState());
}

void YellowState::change(TrafficLight* context) {
    cout << "YELLOW light - Slow down" << endl;
    context->setState(new RedState());
}

int main() {
    TrafficLight light;
    light.change();
    light.change();
    light.change();
    light.change();
    light.change();
    return 0;
}
```

```go
package main

import "fmt"

type TrafficLightState interface {
	change(context *TrafficLight)
}

type RedState struct{}

func (r *RedState) change(context *TrafficLight) {
	fmt.Println("RED light - Stop")
	context.setState(&GreenState{})
}

type GreenState struct{}

func (g *GreenState) change(context *TrafficLight) {
	fmt.Println("GREEN light - Go")
	context.setState(&YellowState{})
}

type YellowState struct{}

func (y *YellowState) change(context *TrafficLight) {
	fmt.Println("YELLOW light - Slow down")
	context.setState(&RedState{})
}

type TrafficLight struct {
	state TrafficLightState
}

func NewTrafficLight() *TrafficLight {
	return &TrafficLight{state: &RedState{}}
}

func (t *TrafficLight) setState(state TrafficLightState) {
	t.state = state
}

func (t *TrafficLight) change() {
	t.state.change(t)
}

func main() {
	light := NewTrafficLight()
	light.change()
	light.change()
	light.change()
	light.change()
	light.change()
}
```

```csharp
using System;

interface ITrafficLightState
{
    void Change(TrafficLight context);
}

class RedState : ITrafficLightState
{
    public void Change(TrafficLight context)
    {
        Console.WriteLine("RED light - Stop");
        context.SetState(new GreenState());
    }
}

class GreenState : ITrafficLightState
{
    public void Change(TrafficLight context)
    {
        Console.WriteLine("GREEN light - Go");
        context.SetState(new YellowState());
    }
}

class YellowState : ITrafficLightState
{
    public void Change(TrafficLight context)
    {
        Console.WriteLine("YELLOW light - Slow down");
        context.SetState(new RedState());
    }
}

class TrafficLight
{
    private ITrafficLightState _state;

    public TrafficLight()
    {
        _state = new RedState();
    }

    public void SetState(ITrafficLightState state) {
        _state = state;
    }
    public void Change() {
        _state.Change(this);
    }
}

class Program
{
    static void Main(string[] args)
    {
        TrafficLight light = new TrafficLight();
        light.Change();
        light.Change();
        light.Change();
        light.Change();
        light.Change();
    }
}
```

```typescript
interface TrafficLightState {
    change(context: TrafficLight): void;
}

class RedState implements TrafficLightState {
    change(context: TrafficLight): void {
        console.log("RED light - Stop");
        context.setState(new GreenState());
    }
}

class GreenState implements TrafficLightState {
    change(context: TrafficLight): void {
        console.log("GREEN light - Go");
        context.setState(new YellowState());
    }
}

class YellowState implements TrafficLightState {
    change(context: TrafficLight): void {
        console.log("YELLOW light - Slow down");
        context.setState(new RedState());
    }
}

class TrafficLight {
    private state: TrafficLightState;

    constructor() {
        this.state = new RedState();
    }

    setState(state: TrafficLightState): void {
        this.state = state;
    }
    change(): void {
        this.state.change(this);
    }
}

const light = new TrafficLight();
light.change();
light.change();
light.change();
light.change();
light.change();
```

---

# Exercise 2: Order Processing

> [!PAYWALL] This content is for premium members only.

Build an order processing system where an order moves through states: Placed, Paid, Shipped, Delivered, and Cancelled. Each state supports operations: `pay()`, `ship()`, `deliver()`, and `cancel()`. Invalid operations should be gracefully rejected.

**Requirements:**

- State interface: `OrderState` with methods `pay(context)`, `ship(context)`, `deliver(context)`, and `cancel(context)`
- Concrete states:
   - `PlacedState` -- can be paid or cancelled
   - `PaidState` -- can be shipped or cancelled (with refund message)
   - `ShippedState` -- can be delivered, cannot be cancelled
   - `DeliveredState` -- terminal state, all operations rejected
   - `CancelledState` -- terminal state, all operations rejected
- Context: `Order` with an `orderId` field and methods for each operation

```java
interface OrderState {
    void pay(Order context);
    void ship(Order context);
    void deliver(Order context);
    void cancel(Order context);
}

class PlacedState implements OrderState {
    public void pay(Order context) {
        // TODO: Print "Order [id] paid." and transition to PaidState
    }
    public void ship(Order context) {
        // TODO: Print "Cannot ship. Order not paid yet."
    }
    public void deliver(Order context) {
        // TODO: Print "Cannot deliver. Order not shipped yet."
    }
    public void cancel(Order context) {
        // TODO: Print "Order [id] cancelled." and transition to CancelledState
    }
}

class PaidState implements OrderState {
    public void pay(Order context) {
        // TODO: Print "Order already paid."
    }
    public void ship(Order context) {
        // TODO: Print "Order [id] shipped." and transition to ShippedState
    }
    public void deliver(Order context) {
        // TODO: Print "Cannot deliver. Order not shipped yet."
    }
    public void cancel(Order context) {
        // TODO: Print "Order [id] cancelled. Refund issued." and transition to CancelledState
    }
}

class ShippedState implements OrderState {
    public void pay(Order context) {
        // TODO: Print "Order already paid."
    }
    public void ship(Order context) {
        // TODO: Print "Order already shipped."
    }
    public void deliver(Order context) {
        // TODO: Print "Order [id] delivered." and transition to DeliveredState
    }
    public void cancel(Order context) {
        // TODO: Print "Cannot cancel. Order already shipped."
    }
}

class DeliveredState implements OrderState {
    public void pay(Order context) {
        // TODO: Print "Order already delivered."
    }
    public void ship(Order context) {
        // TODO: Print "Order already delivered."
    }
    public void deliver(Order context) {
        // TODO: Print "Order already delivered."
    }
    public void cancel(Order context) {
        // TODO: Print "Order already delivered."
    }
}

class CancelledState implements OrderState {
    public void pay(Order context) {
        // TODO: Print "Order is cancelled."
    }
    public void ship(Order context) {
        // TODO: Print "Order is cancelled."
    }
    public void deliver(Order context) {
        // TODO: Print "Order is cancelled."
    }
    public void cancel(Order context) {
        // TODO: Print "Order is cancelled."
    }
}

class Order {
    private OrderState state;
    private String orderId;

    public Order(String orderId) {
        this.orderId = orderId;
        this.state = new PlacedState();
    }

    public String getOrderId() { return orderId; }
    public void setState(OrderState state) { this.state = state; }
    public void pay() { state.pay(this); }
    public void ship() { state.ship(this); }
    public void deliver() { state.deliver(this); }
    public void cancel() { state.cancel(this); }
}

public class Main {
    public static void main(String[] args) {
        // Order order = new Order("ORD-001");
        // order.pay();
        // order.ship();
        // order.deliver();
        // order.cancel();  // Should be rejected

        // System.out.println();

        // Order order2 = new Order("ORD-002");
        // order2.cancel();
        // order2.pay();    // Should be rejected
    }
}
```

```python
from abc import ABC, abstractmethod

class OrderState(ABC):
    @abstractmethod
    def pay(self, context): pass
    @abstractmethod
    def ship(self, context): pass
    @abstractmethod
    def deliver(self, context): pass
    @abstractmethod
    def cancel(self, context): pass

class PlacedState(OrderState):
    def pay(self, context):
        pass  # TODO: Print "Order [id] paid." and transition to PaidState

    def ship(self, context):
        pass  # TODO: Print "Cannot ship. Order not paid yet."

    def deliver(self, context):
        pass  # TODO: Print "Cannot deliver. Order not shipped yet."

    def cancel(self, context):
        pass  # TODO: Print "Order [id] cancelled." and transition to CancelledState

class PaidState(OrderState):
    def pay(self, context):
        pass  # TODO: Print "Order already paid."

    def ship(self, context):
        pass  # TODO: Print "Order [id] shipped." and transition to ShippedState

    def deliver(self, context):
        pass  # TODO: Print "Cannot deliver. Order not shipped yet."

    def cancel(self, context):
        pass  # TODO: Print "Order [id] cancelled. Refund issued." and transition to CancelledState

class ShippedState(OrderState):
    def pay(self, context):
        pass  # TODO: Print "Order already paid."

    def ship(self, context):
        pass  # TODO: Print "Order already shipped."

    def deliver(self, context):
        pass  # TODO: Print "Order [id] delivered." and transition to DeliveredState

    def cancel(self, context):
        pass  # TODO: Print "Cannot cancel. Order already shipped."

class DeliveredState(OrderState):
    def pay(self, context):
        pass  # TODO: Print "Order already delivered."

    def ship(self, context):
        pass  # TODO: Print "Order already delivered."

    def deliver(self, context):
        pass  # TODO: Print "Order already delivered."

    def cancel(self, context):
        pass  # TODO: Print "Order already delivered."

class CancelledState(OrderState):
    def pay(self, context):
        pass  # TODO: Print "Order is cancelled."

    def ship(self, context):
        pass  # TODO: Print "Order is cancelled."

    def deliver(self, context):
        pass  # TODO: Print "Order is cancelled."

    def cancel(self, context):
        pass  # TODO: Print "Order is cancelled."

class Order:
    def __init__(self, order_id):
        self.order_id = order_id
        self._state = PlacedState()

    def set_state(self, state):
        self._state = state

    def pay(self): self._state.pay(self)
    def ship(self): self._state.ship(self)
    def deliver(self): self._state.deliver(self)
    def cancel(self): self._state.cancel(self)

if __name__ == "__main__":
    pass
    # order = Order("ORD-001")
    # order.pay()
    # order.ship()
    # order.deliver()
    # order.cancel()   # Should be rejected
    #
    # print()
    #
    # order2 = Order("ORD-002")
    # order2.cancel()
    # order2.pay()     # Should be rejected
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Order;

class OrderState {
public:
    virtual ~OrderState() = default;
    virtual void pay(Order* context) = 0;
    virtual void ship(Order* context) = 0;
    virtual void deliver(Order* context) = 0;
    virtual void cancel(Order* context) = 0;
};

class PlacedState : public OrderState {
public:
    void pay(Order* context) override {
        // TODO: Print "Order [id] paid." and transition to PaidState
    }
    void ship(Order* context) override {
        // TODO: Print "Cannot ship. Order not paid yet."
    }
    void deliver(Order* context) override {
        // TODO: Print "Cannot deliver. Order not shipped yet."
    }
    void cancel(Order* context) override {
        // TODO: Print "Order [id] cancelled." and transition to CancelledState
    }
};

class PaidState : public OrderState {
public:
    void pay(Order* context) override {
        // TODO: Print "Order already paid."
    }
    void ship(Order* context) override {
        // TODO: Print "Order [id] shipped." and transition to ShippedState
    }
    void deliver(Order* context) override {
        // TODO: Print "Cannot deliver. Order not shipped yet."
    }
    void cancel(Order* context) override {
        // TODO: Print "Order [id] cancelled. Refund issued." and transition to CancelledState
    }
};

class ShippedState : public OrderState {
public:
    void pay(Order* context) override {
        // TODO: Print "Order already paid."
    }
    void ship(Order* context) override {
        // TODO: Print "Order already shipped."
    }
    void deliver(Order* context) override {
        // TODO: Print "Order [id] delivered." and transition to DeliveredState
    }
    void cancel(Order* context) override {
        // TODO: Print "Cannot cancel. Order already shipped."
    }
};

class DeliveredState : public OrderState {
public:
    void pay(Order* context) override {
        // TODO: Print "Order already delivered."
    }
    void ship(Order* context) override {
        // TODO: Print "Order already delivered."
    }
    void deliver(Order* context) override {
        // TODO: Print "Order already delivered."
    }
    void cancel(Order* context) override {
        // TODO: Print "Order already delivered."
    }
};

class CancelledState : public OrderState {
public:
    void pay(Order* context) override {
        // TODO: Print "Order is cancelled."
    }
    void ship(Order* context) override {
        // TODO: Print "Order is cancelled."
    }
    void deliver(Order* context) override {
        // TODO: Print "Order is cancelled."
    }
    void cancel(Order* context) override {
        // TODO: Print "Order is cancelled."
    }
};

class Order {
private:
    OrderState* state;
    string orderId;
public:
    Order(string id) : orderId(id) { state = new PlacedState(); }
    ~Order() { delete state; }
    string getOrderId() { return orderId; }
    void setState(OrderState* s) { delete state; state = s; }
    void pay() { state->pay(this); }
    void ship() { state->ship(this); }
    void deliver() { state->deliver(this); }
    void cancel() { state->cancel(this); }
};

int main() {
    // Order order("ORD-001");
    // order.pay();
    // order.ship();
    // order.deliver();
    // order.cancel();  // Should be rejected
    //
    // cout << endl;
    //
    // Order order2("ORD-002");
    // order2.cancel();
    // order2.pay();    // Should be rejected
    return 0;
}
```

```go
package main

type OrderState interface {
	Pay(context *Order)
	Ship(context *Order)
	Deliver(context *Order)
	Cancel(context *Order)
}

type PlacedState struct{}

func (s *PlacedState) Pay(context *Order) {
	// TODO: Print "Order [id] paid." and transition to PaidState
}

func (s *PlacedState) Ship(context *Order) {
	// TODO: Print "Cannot ship. Order not paid yet."
}

func (s *PlacedState) Deliver(context *Order) {
	// TODO: Print "Cannot deliver. Order not shipped yet."
}

func (s *PlacedState) Cancel(context *Order) {
	// TODO: Print "Order [id] cancelled." and transition to CancelledState
}

type PaidState struct{}

func (s *PaidState) Pay(context *Order) {
	// TODO: Print "Order already paid."
}

func (s *PaidState) Ship(context *Order) {
	// TODO: Print "Order [id] shipped." and transition to ShippedState
}

func (s *PaidState) Deliver(context *Order) {
	// TODO: Print "Cannot deliver. Order not shipped yet."
}

func (s *PaidState) Cancel(context *Order) {
	// TODO: Print "Order [id] cancelled. Refund issued." and transition to CancelledState
}

type ShippedState struct{}

func (s *ShippedState) Pay(context *Order) {
	// TODO: Print "Order already paid."
}

func (s *ShippedState) Ship(context *Order) {
	// TODO: Print "Order already shipped."
}

func (s *ShippedState) Deliver(context *Order) {
	// TODO: Print "Order [id] delivered." and transition to DeliveredState
}

func (s *ShippedState) Cancel(context *Order) {
	// TODO: Print "Cannot cancel. Order already shipped."
}

type DeliveredState struct{}

func (s *DeliveredState) Pay(context *Order) {
	// TODO: Print "Order already delivered."
}

func (s *DeliveredState) Ship(context *Order) {
	// TODO: Print "Order already delivered."
}

func (s *DeliveredState) Deliver(context *Order) {
	// TODO: Print "Order already delivered."
}

func (s *DeliveredState) Cancel(context *Order) {
	// TODO: Print "Order already delivered."
}

type CancelledState struct{}

func (s *CancelledState) Pay(context *Order) {
	// TODO: Print "Order is cancelled."
}

func (s *CancelledState) Ship(context *Order) {
	// TODO: Print "Order is cancelled."
}

func (s *CancelledState) Deliver(context *Order) {
	// TODO: Print "Order is cancelled."
}

func (s *CancelledState) Cancel(context *Order) {
	// TODO: Print "Order is cancelled."
}

type Order struct {
	state   OrderState
	orderId string
}

func NewOrder(orderId string) *Order {
	return &Order{
		orderId: orderId,
		state:   &PlacedState{},
	}
}

func (o *Order) GetOrderId() string {
	return o.orderId
}

func (o *Order) SetState(state OrderState) {
	o.state = state
}

func (o *Order) Pay() {
	o.state.Pay(o)
}

func (o *Order) Ship() {
	o.state.Ship(o)
}

func (o *Order) Deliver() {
	o.state.Deliver(o)
}

func (o *Order) Cancel() {
	o.state.Cancel(o)
}

func main() {
	// order := NewOrder("ORD-001")
	// order.Pay()
	// order.Ship()
	// order.Deliver()
	// order.Cancel()  // Should be rejected
	//
	// fmt.Println()
	//
	// order2 := NewOrder("ORD-002")
	// order2.Cancel()
	// order2.Pay()    // Should be rejected
}
```

```csharp
using System;

interface IOrderState
{
    void Pay(Order context);
    void Ship(Order context);
    void Deliver(Order context);
    void Cancel(Order context);
}

class PlacedState : IOrderState
{
    public void Pay(Order context) {
        // TODO: Print "Order [id] paid." and transition to PaidState
    }
    public void Ship(Order context) {
        // TODO: Print "Cannot ship. Order not paid yet."
    }
    public void Deliver(Order context) {
        // TODO: Print "Cannot deliver. Order not shipped yet."
    }
    public void Cancel(Order context) {
        // TODO: Print "Order [id] cancelled." and transition to CancelledState
    }
}

class PaidState : IOrderState
{
    public void Pay(Order context) {
        // TODO: Print "Order already paid."
    }
    public void Ship(Order context) {
        // TODO: Print "Order [id] shipped." and transition to ShippedState
    }
    public void Deliver(Order context) {
        // TODO: Print "Cannot deliver. Order not shipped yet."
    }
    public void Cancel(Order context) {
        // TODO: Print "Order [id] cancelled. Refund issued." and transition to CancelledState
    }
}

class ShippedState : IOrderState
{
    public void Pay(Order context) {
        // TODO: Print "Order already paid."
    }
    public void Ship(Order context) {
        // TODO: Print "Order already shipped."
    }
    public void Deliver(Order context) {
        // TODO: Print "Order [id] delivered." and transition to DeliveredState
    }
    public void Cancel(Order context) {
        // TODO: Print "Cannot cancel. Order already shipped."
    }
}

class DeliveredState : IOrderState
{
    public void Pay(Order context) {
        // TODO: Print "Order already delivered."
    }
    public void Ship(Order context) {
        // TODO: Print "Order already delivered."
    }
    public void Deliver(Order context) {
        // TODO: Print "Order already delivered."
    }
    public void Cancel(Order context) {
        // TODO: Print "Order already delivered."
    }
}

class CancelledState : IOrderState
{
    public void Pay(Order context) {
        // TODO: Print "Order is cancelled."
    }
    public void Ship(Order context) {
        // TODO: Print "Order is cancelled."
    }
    public void Deliver(Order context) {
        // TODO: Print "Order is cancelled."
    }
    public void Cancel(Order context) {
        // TODO: Print "Order is cancelled."
    }
}

class Order
{
    private IOrderState _state;
    public string OrderId { get; }

    public Order(string orderId)
    {
        OrderId = orderId;
        _state = new PlacedState();
    }

    public void SetState(IOrderState state) {
        _state = state;
    }
    public void Pay() {
        _state.Pay(this);
    }
    public void Ship() {
        _state.Ship(this);
    }
    public void Deliver() {
        _state.Deliver(this);
    }
    public void Cancel() {
        _state.Cancel(this);
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Order order = new Order("ORD-001");
        // order.Pay();
        // order.Ship();
        // order.Deliver();
        // order.Cancel();  // Should be rejected
        //
        // Console.WriteLine();
        //
        // Order order2 = new Order("ORD-002");
        // order2.Cancel();
        // order2.Pay();    // Should be rejected
    }
}
```

```typescript
interface OrderState {
    pay(context: Order): void;
    ship(context: Order): void;
    deliver(context: Order): void;
    cancel(context: Order): void;
}

class PlacedState implements OrderState {
    pay(context: Order): void {
        // TODO: Print "Order [id] paid." and transition to PaidState
    }
    ship(context: Order): void {
        // TODO: Print "Cannot ship. Order not paid yet."
    }
    deliver(context: Order): void {
        // TODO: Print "Cannot deliver. Order not shipped yet."
    }
    cancel(context: Order): void {
        // TODO: Print "Order [id] cancelled." and transition to CancelledState
    }
}

class PaidState implements OrderState {
    pay(context: Order): void {
        // TODO: Print "Order already paid."
    }
    ship(context: Order): void {
        // TODO: Print "Order [id] shipped." and transition to ShippedState
    }
    deliver(context: Order): void {
        // TODO: Print "Cannot deliver. Order not shipped yet."
    }
    cancel(context: Order): void {
        // TODO: Print "Order [id] cancelled. Refund issued." and transition to CancelledState
    }
}

class ShippedState implements OrderState {
    pay(context: Order): void {
        // TODO: Print "Order already paid."
    }
    ship(context: Order): void {
        // TODO: Print "Order already shipped."
    }
    deliver(context: Order): void {
        // TODO: Print "Order [id] delivered." and transition to DeliveredState
    }
    cancel(context: Order): void {
        // TODO: Print "Cannot cancel. Order already shipped."
    }
}

class DeliveredState implements OrderState {
    pay(context: Order): void {
        // TODO: Print "Order already delivered."
    }
    ship(context: Order): void {
        // TODO: Print "Order already delivered."
    }
    deliver(context: Order): void {
        // TODO: Print "Order already delivered."
    }
    cancel(context: Order): void {
        // TODO: Print "Order already delivered."
    }
}

class CancelledState implements OrderState {
    pay(context: Order): void {
        // TODO: Print "Order is cancelled."
    }
    ship(context: Order): void {
        // TODO: Print "Order is cancelled."
    }
    deliver(context: Order): void {
        // TODO: Print "Order is cancelled."
    }
    cancel(context: Order): void {
        // TODO: Print "Order is cancelled."
    }
}

class Order {
    private state: OrderState;
    public orderId: string;

    constructor(orderId: string) {
        this.orderId = orderId;
        this.state = new PlacedState();
    }

    setState(state: OrderState): void {
        this.state = state;
    }
    pay(): void {
        this.state.pay(this);
    }
    ship(): void {
        this.state.ship(this);
    }
    deliver(): void {
        this.state.deliver(this);
    }
    cancel(): void {
        this.state.cancel(this);
    }
}

// const order = new Order("ORD-001");
// order.pay();
// order.ship();
// order.deliver();
// order.cancel();  // Should be rejected
//
// console.log();
//
// const order2 = new Order("ORD-002");
// order2.cancel();
// order2.pay();    // Should be rejected
```

#### Solutions

```java
interface OrderState {
    void pay(Order context);
    void ship(Order context);
    void deliver(Order context);
    void cancel(Order context);
}

class PlacedState implements OrderState {
    public void pay(Order context) {
        System.out.println("Order " + context.getOrderId() + " paid.");
        context.setState(new PaidState());
    }

    public void ship(Order context) {
        System.out.println("Cannot ship. Order not paid yet.");
    }

    public void deliver(Order context) {
        System.out.println("Cannot deliver. Order not shipped yet.");
    }

    public void cancel(Order context) {
        System.out.println("Order " + context.getOrderId() + " cancelled.");
        context.setState(new CancelledState());
    }
}

class PaidState implements OrderState {
    public void pay(Order context) {
        System.out.println("Order already paid.");
    }

    public void ship(Order context) {
        System.out.println("Order " + context.getOrderId() + " shipped.");
        context.setState(new ShippedState());
    }

    public void deliver(Order context) {
        System.out.println("Cannot deliver. Order not shipped yet.");
    }

    public void cancel(Order context) {
        System.out.println("Order " + context.getOrderId() + " cancelled. Refund issued.");
        context.setState(new CancelledState());
    }
}

class ShippedState implements OrderState {
    public void pay(Order context) {
        System.out.println("Order already paid.");
    }

    public void ship(Order context) {
        System.out.println("Order already shipped.");
    }

    public void deliver(Order context) {
        System.out.println("Order " + context.getOrderId() + " delivered.");
        context.setState(new DeliveredState());
    }

    public void cancel(Order context) {
        System.out.println("Cannot cancel. Order already shipped.");
    }
}

class DeliveredState implements OrderState {
    public void pay(Order context) {
        System.out.println("Order already delivered.");
    }

    public void ship(Order context) {
        System.out.println("Order already delivered.");
    }

    public void deliver(Order context) {
        System.out.println("Order already delivered.");
    }

    public void cancel(Order context) {
        System.out.println("Order already delivered.");
    }
}

class CancelledState implements OrderState {
    public void pay(Order context) {
        System.out.println("Order is cancelled.");
    }

    public void ship(Order context) {
        System.out.println("Order is cancelled.");
    }

    public void deliver(Order context) {
        System.out.println("Order is cancelled.");
    }

    public void cancel(Order context) {
        System.out.println("Order is cancelled.");
    }
}

class Order {
    private OrderState state;
    private String orderId;

    public Order(String orderId) {
        this.orderId = orderId;
        this.state = new PlacedState();
    }

    public String getOrderId() {
        return orderId;
    }

    public void setState(OrderState state) {
        this.state = state;
    }

    public void pay() {
        state.pay(this);
    }

    public void ship() {
        state.ship(this);
    }

    public void deliver() {
        state.deliver(this);
    }

    public void cancel() {
        state.cancel(this);
    }
}

public class Main {
    public static void main(String[] args) {
        Order order = new Order("ORD-001");
        order.pay();
        order.ship();
        order.deliver();
        order.cancel();  // Should be rejected

        System.out.println();

        Order order2 = new Order("ORD-002");
        order2.cancel();
        order2.pay();    // Should be rejected
    }
}
```

```python
from abc import ABC, abstractmethod

class OrderState(ABC):
    @abstractmethod
    def pay(self, context): pass
    @abstractmethod
    def ship(self, context): pass
    @abstractmethod
    def deliver(self, context): pass
    @abstractmethod
    def cancel(self, context): pass

class PlacedState(OrderState):
    def pay(self, context):
        print(f"Order {context.order_id} paid.")
        context.set_state(PaidState())

    def ship(self, context):
        print("Cannot ship. Order not paid yet.")

    def deliver(self, context):
        print("Cannot deliver. Order not shipped yet.")

    def cancel(self, context):
        print(f"Order {context.order_id} cancelled.")
        context.set_state(CancelledState())

class PaidState(OrderState):
    def pay(self, context):
        print("Order already paid.")

    def ship(self, context):
        print(f"Order {context.order_id} shipped.")
        context.set_state(ShippedState())

    def deliver(self, context):
        print("Cannot deliver. Order not shipped yet.")

    def cancel(self, context):
        print(f"Order {context.order_id} cancelled. Refund issued.")
        context.set_state(CancelledState())

class ShippedState(OrderState):
    def pay(self, context):
        print("Order already paid.")

    def ship(self, context):
        print("Order already shipped.")

    def deliver(self, context):
        print(f"Order {context.order_id} delivered.")
        context.set_state(DeliveredState())

    def cancel(self, context):
        print("Cannot cancel. Order already shipped.")

class DeliveredState(OrderState):
    def pay(self, context):
        print("Order already delivered.")

    def ship(self, context):
        print("Order already delivered.")

    def deliver(self, context):
        print("Order already delivered.")

    def cancel(self, context):
        print("Order already delivered.")

class CancelledState(OrderState):
    def pay(self, context):
        print("Order is cancelled.")

    def ship(self, context):
        print("Order is cancelled.")

    def deliver(self, context):
        print("Order is cancelled.")

    def cancel(self, context):
        print("Order is cancelled.")

class Order:
    def __init__(self, order_id):
        self.order_id = order_id
        self._state = PlacedState()

    def set_state(self, state):
        self._state = state

    def pay(self):
        self._state.pay(self)

    def ship(self):
        self._state.ship(self)

    def deliver(self):
        self._state.deliver(self)

    def cancel(self):
        self._state.cancel(self)

if __name__ == "__main__":
    order = Order("ORD-001")
    order.pay()
    order.ship()
    order.deliver()
    order.cancel()

    print()

    order2 = Order("ORD-002")
    order2.cancel()
    order2.pay()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Order;

class OrderState {
public:
    virtual ~OrderState() = default;
    virtual void pay(Order* context) = 0;
    virtual void ship(Order* context) = 0;
    virtual void deliver(Order* context) = 0;
    virtual void cancel(Order* context) = 0;
};

class PlacedState;
class PaidState;
class ShippedState;
class DeliveredState;
class CancelledState;

class Order {
private:
    OrderState* state;
    string orderId;
public:
    Order(string id);

    ~Order() {
        delete state;
    }

    string getOrderId() {
        return orderId;
    }

    void setState(OrderState* s) {
        delete state;
        state = s;
    }

    void pay() {
        state->pay(this);
    }

    void ship() {
        state->ship(this);
    }

    void deliver() {
        state->deliver(this);
    }

    void cancel() {
        state->cancel(this);
    }
};

class DeliveredState : public OrderState {
public:
    void pay(Order* ctx) override {
        cout << "Order already delivered." << endl;
    }

    void ship(Order* ctx) override {
        cout << "Order already delivered." << endl;
    }

    void deliver(Order* ctx) override {
        cout << "Order already delivered." << endl;
    }

    void cancel(Order* ctx) override {
        cout << "Order already delivered." << endl;
    }
};

class CancelledState : public OrderState {
public:
    void pay(Order* ctx) override {
        cout << "Order is cancelled." << endl;
    }

    void ship(Order* ctx) override {
        cout << "Order is cancelled." << endl;
    }

    void deliver(Order* ctx) override {
        cout << "Order is cancelled." << endl;
    }

    void cancel(Order* ctx) override {
        cout << "Order is cancelled." << endl;
    }
};

class ShippedState : public OrderState {
public:
    void pay(Order* ctx) override {
        cout << "Order already paid." << endl;
    }

    void ship(Order* ctx) override {
        cout << "Order already shipped." << endl;
    }

    void deliver(Order* ctx) override {
        cout << "Order " << ctx->getOrderId() << " delivered." << endl;
        ctx->setState(new DeliveredState());
    }

    void cancel(Order* ctx) override {
        cout << "Cannot cancel. Order already shipped." << endl;
    }
};

class PaidState : public OrderState {
public:
    void pay(Order* ctx) override {
        cout << "Order already paid." << endl;
    }

    void ship(Order* ctx) override {
        cout << "Order " << ctx->getOrderId() << " shipped." << endl;
        ctx->setState(new ShippedState());
    }

    void deliver(Order* ctx) override {
        cout << "Cannot deliver. Order not shipped yet." << endl;
    }

    void cancel(Order* ctx) override {
        cout << "Order " << ctx->getOrderId() << " cancelled. Refund issued." << endl;
        ctx->setState(new CancelledState());
    }
};

class PlacedState : public OrderState {
public:
    void pay(Order* ctx) override {
        cout << "Order " << ctx->getOrderId() << " paid." << endl;
        ctx->setState(new PaidState());
    }

    void ship(Order* ctx) override {
        cout << "Cannot ship. Order not paid yet." << endl;
    }

    void deliver(Order* ctx) override {
        cout << "Cannot deliver. Order not shipped yet." << endl;
    }

    void cancel(Order* ctx) override {
        cout << "Order " << ctx->getOrderId() << " cancelled." << endl;
        ctx->setState(new CancelledState());
    }
};

Order::Order(string id) : orderId(id) {
    state = new PlacedState();
}

int main() {
    Order order("ORD-001");
    order.pay();
    order.ship();
    order.deliver();
    order.cancel();

    cout << endl;

    Order order2("ORD-002");
    order2.cancel();
    order2.pay();
    return 0;
}
```

```go
package main

import "fmt"

type OrderState interface {
	pay(context *Order)
	ship(context *Order)
	deliver(context *Order)
	cancel(context *Order)
}

type PlacedState struct{}

func (s *PlacedState) pay(context *Order) {
	fmt.Printf("Order %s paid.\n", context.GetOrderID())
	context.setState(&PaidState{})
}

func (s *PlacedState) ship(context *Order) {
	fmt.Println("Cannot ship. Order not paid yet.")
}

func (s *PlacedState) deliver(context *Order) {
	fmt.Println("Cannot deliver. Order not shipped yet.")
}

func (s *PlacedState) cancel(context *Order) {
	fmt.Printf("Order %s cancelled.\n", context.GetOrderID())
	context.setState(&CancelledState{})
}

type PaidState struct{}

func (s *PaidState) pay(context *Order) {
	fmt.Println("Order already paid.")
}

func (s *PaidState) ship(context *Order) {
	fmt.Printf("Order %s shipped.\n", context.GetOrderID())
	context.setState(&ShippedState{})
}

func (s *PaidState) deliver(context *Order) {
	fmt.Println("Cannot deliver. Order not shipped yet.")
}

func (s *PaidState) cancel(context *Order) {
	fmt.Printf("Order %s cancelled. Refund issued.\n", context.GetOrderID())
	context.setState(&CancelledState{})
}

type ShippedState struct{}

func (s *ShippedState) pay(context *Order) {
	fmt.Println("Order already paid.")
}

func (s *ShippedState) ship(context *Order) {
	fmt.Println("Order already shipped.")
}

func (s *ShippedState) deliver(context *Order) {
	fmt.Printf("Order %s delivered.\n", context.GetOrderID())
	context.setState(&DeliveredState{})
}

func (s *ShippedState) cancel(context *Order) {
	fmt.Println("Cannot cancel. Order already shipped.")
}

type DeliveredState struct{}

func (s *DeliveredState) pay(context *Order) {
	fmt.Println("Order already delivered.")
}

func (s *DeliveredState) ship(context *Order) {
	fmt.Println("Order already delivered.")
}

func (s *DeliveredState) deliver(context *Order) {
	fmt.Println("Order already delivered.")
}

func (s *DeliveredState) cancel(context *Order) {
	fmt.Println("Order already delivered.")
}

type CancelledState struct{}

func (s *CancelledState) pay(context *Order) {
	fmt.Println("Order is cancelled.")
}

func (s *CancelledState) ship(context *Order) {
	fmt.Println("Order is cancelled.")
}

func (s *CancelledState) deliver(context *Order) {
	fmt.Println("Order is cancelled.")
}

func (s *CancelledState) cancel(context *Order) {
	fmt.Println("Order is cancelled.")
}

type Order struct {
	state   OrderState
	orderID string
}

func NewOrder(orderID string) *Order {
	return &Order{
		orderID: orderID,
		state:   &PlacedState{},
	}
}

func (o *Order) GetOrderID() string {
	return o.orderID
}

func (o *Order) setState(state OrderState) {
	o.state = state
}

func (o *Order) Pay() {
	o.state.pay(o)
}

func (o *Order) Ship() {
	o.state.ship(o)
}

func (o *Order) Deliver() {
	o.state.deliver(o)
}

func (o *Order) Cancel() {
	o.state.cancel(o)
}

func main() {
	order := NewOrder("ORD-001")
	order.Pay()
	order.Ship()
	order.Deliver()
	order.Cancel()

	fmt.Println()

	order2 := NewOrder("ORD-002")
	order2.Cancel()
	order2.Pay()
}
```

```csharp
using System;

interface IOrderState
{
    void Pay(Order context);
    void Ship(Order context);
    void Deliver(Order context);
    void Cancel(Order context);
}

class PlacedState : IOrderState
{
    public void Pay(Order context) {
        Console.WriteLine($"Order {context.OrderId} paid.");
        context.SetState(new PaidState());
    }
    public void Ship(Order context) {
        Console.WriteLine("Cannot ship. Order not paid yet.");
    }
    public void Deliver(Order context) {
        Console.WriteLine("Cannot deliver. Order not shipped yet.");
    }
    public void Cancel(Order context) {
        Console.WriteLine($"Order {context.OrderId} cancelled.");
        context.SetState(new CancelledState());
    }
}

class PaidState : IOrderState
{
    public void Pay(Order context) {
        Console.WriteLine("Order already paid.");
    }
    public void Ship(Order context) {
        Console.WriteLine($"Order {context.OrderId} shipped.");
        context.SetState(new ShippedState());
    }
    public void Deliver(Order context) {
        Console.WriteLine("Cannot deliver. Order not shipped yet.");
    }
    public void Cancel(Order context) {
        Console.WriteLine($"Order {context.OrderId} cancelled. Refund issued.");
        context.SetState(new CancelledState());
    }
}

class ShippedState : IOrderState
{
    public void Pay(Order context) {
        Console.WriteLine("Order already paid.");
    }
    public void Ship(Order context) {
        Console.WriteLine("Order already shipped.");
    }
    public void Deliver(Order context) {
        Console.WriteLine($"Order {context.OrderId} delivered.");
        context.SetState(new DeliveredState());
    }
    public void Cancel(Order context) {
        Console.WriteLine("Cannot cancel. Order already shipped.");
    }
}

class DeliveredState : IOrderState
{
    public void Pay(Order context) {
        Console.WriteLine("Order already delivered.");
    }
    public void Ship(Order context) {
        Console.WriteLine("Order already delivered.");
    }
    public void Deliver(Order context) {
        Console.WriteLine("Order already delivered.");
    }
    public void Cancel(Order context) {
        Console.WriteLine("Order already delivered.");
    }
}

class CancelledState : IOrderState
{
    public void Pay(Order context) {
        Console.WriteLine("Order is cancelled.");
    }
    public void Ship(Order context) {
        Console.WriteLine("Order is cancelled.");
    }
    public void Deliver(Order context) {
        Console.WriteLine("Order is cancelled.");
    }
    public void Cancel(Order context) {
        Console.WriteLine("Order is cancelled.");
    }
}

class Order
{
    private IOrderState _state;
    public string OrderId { get; }

    public Order(string orderId)
    {
        OrderId = orderId;
        _state = new PlacedState();
    }

    public void SetState(IOrderState state) {
        _state = state;
    }
    public void Pay() {
        _state.Pay(this);
    }
    public void Ship() {
        _state.Ship(this);
    }
    public void Deliver() {
        _state.Deliver(this);
    }
    public void Cancel() {
        _state.Cancel(this);
    }
}

class Program
{
    static void Main(string[] args)
    {
        Order order = new Order("ORD-001");
        order.Pay();
        order.Ship();
        order.Deliver();
        order.Cancel();

        Console.WriteLine();

        Order order2 = new Order("ORD-002");
        order2.Cancel();
        order2.Pay();
    }
}
```

```typescript
interface OrderState {
    pay(context: Order): void;
    ship(context: Order): void;
    deliver(context: Order): void;
    cancel(context: Order): void;
}

class PlacedState implements OrderState {
    pay(ctx: Order): void {
        console.log(`Order ${ctx.orderId} paid.`);
        ctx.setState(new PaidState());
    }
    ship(ctx: Order): void {
        console.log("Cannot ship. Order not paid yet.");
    }
    deliver(ctx: Order): void {
        console.log("Cannot deliver. Order not shipped yet.");
    }
    cancel(ctx: Order): void {
        console.log(`Order ${ctx.orderId} cancelled.`);
        ctx.setState(new CancelledState());
    }
}

class PaidState implements OrderState {
    pay(ctx: Order): void {
        console.log("Order already paid.");
    }
    ship(ctx: Order): void {
        console.log(`Order ${ctx.orderId} shipped.`);
        ctx.setState(new ShippedState());
    }
    deliver(ctx: Order): void {
        console.log("Cannot deliver. Order not shipped yet.");
    }
    cancel(ctx: Order): void {
        console.log(`Order ${ctx.orderId} cancelled. Refund issued.`);
        ctx.setState(new CancelledState());
    }
}

class ShippedState implements OrderState {
    pay(ctx: Order): void {
        console.log("Order already paid.");
    }
    ship(ctx: Order): void {
        console.log("Order already shipped.");
    }
    deliver(ctx: Order): void {
        console.log(`Order ${ctx.orderId} delivered.`);
        ctx.setState(new DeliveredState());
    }
    cancel(ctx: Order): void {
        console.log("Cannot cancel. Order already shipped.");
    }
}

class DeliveredState implements OrderState {
    pay(ctx: Order): void {
        console.log("Order already delivered.");
    }
    ship(ctx: Order): void {
        console.log("Order already delivered.");
    }
    deliver(ctx: Order): void {
        console.log("Order already delivered.");
    }
    cancel(ctx: Order): void {
        console.log("Order already delivered.");
    }
}

class CancelledState implements OrderState {
    pay(ctx: Order): void {
        console.log("Order is cancelled.");
    }
    ship(ctx: Order): void {
        console.log("Order is cancelled.");
    }
    deliver(ctx: Order): void {
        console.log("Order is cancelled.");
    }
    cancel(ctx: Order): void {
        console.log("Order is cancelled.");
    }
}

class Order {
    private state: OrderState;
    public orderId: string;

    constructor(orderId: string) {
        this.orderId = orderId;
        this.state = new PlacedState();
    }

    setState(state: OrderState): void {
        this.state = state;
    }
    pay(): void {
        this.state.pay(this);
    }
    ship(): void {
        this.state.ship(this);
    }
    deliver(): void {
        this.state.deliver(this);
    }
    cancel(): void {
        this.state.cancel(this);
    }
}

const order = new Order("ORD-001");
order.pay();
order.ship();
order.deliver();
order.cancel();

console.log();

const order2 = new Order("ORD-002");
order2.cancel();
order2.pay();
```

---

# Exercise 3: ATM Machine

Build an ATM system with states: Idle, CardInserted, Authenticated, TransactionInProgress, and OutOfService. The ATM supports: `insertCard()`, `enterPin(pin)`, `withdraw(amount)`, `ejectCard()`, and `reportError()`. This exercise combines authentication, transaction logic, and error handling in a single state machine.

**Requirements:**

- State interface: `AtmState` with methods `insertCard(context)`, `enterPin(context, pin)`, `withdraw(context, amount)`, `ejectCard(context)`, and `reportError(context)`
- Concrete states:
   - `IdleState`: only insertCard is valid
   - `CardInsertedState`: only enterPin and ejectCard are valid
   - `AuthenticatedState`: withdraw and ejectCard are valid, enterPin rejected
   - `TransactionState`: all operations rejected until transaction completes, auto-transitions back to Authenticated
   - `OutOfServiceState`: all operations rejected, prints "ATM is out of service"
- Context: `Atm` with a `balance` field (starts at 10000), a `correctPin` field (set to "1234")
- Pin validation: `CardInsertedState.enterPin()` checks if pin matches, transitions to Authenticated if correct, ejects card if wrong
- Withdrawal: checks if amount <= balance, deducts and prints new balance, auto-transitions back to Authenticated
- `reportError()` from any state transitions to OutOfService

```java
interface AtmState {
    void insertCard(Atm context);
    void enterPin(Atm context, String pin);
    void withdraw(Atm context, double amount);
    void ejectCard(Atm context);
    void reportError(Atm context);
}

class IdleState implements AtmState {
    public void insertCard(Atm context) {
        // TODO: Print "Card inserted." and transition to CardInsertedState
    }
    public void enterPin(Atm context, String pin) {
        // TODO: Print "No card inserted."
    }
    public void withdraw(Atm context, double amount) {
        // TODO: Print "No card inserted."
    }
    public void ejectCard(Atm context) {
        // TODO: Print "No card inserted."
    }
    public void reportError(Atm context) {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class CardInsertedState implements AtmState {
    public void insertCard(Atm context) {
        // TODO: Print "Card already inserted."
    }
    public void enterPin(Atm context, String pin) {
        // TODO: Validate pin against context.getCorrectPin()
        // If correct: print "Pin accepted." and transition to AuthenticatedState
        // If wrong: print "Incorrect pin. Ejecting card." and transition to IdleState
    }
    public void withdraw(Atm context, double amount) {
        // TODO: Print "Please enter pin first."
    }
    public void ejectCard(Atm context) {
        // TODO: Print "Card ejected." and transition to IdleState
    }
    public void reportError(Atm context) {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class AuthenticatedState implements AtmState {
    public void insertCard(Atm context) {
        // TODO: Print "Card already inserted."
    }
    public void enterPin(Atm context, String pin) {
        // TODO: Print "Already authenticated."
    }
    public void withdraw(Atm context, double amount) {
        // TODO: Print "Processing withdrawal..." and transition to TransactionState
        // Then process: check if amount <= context.getBalance()
    }
    public void ejectCard(Atm context) {
        // TODO: Print "Card ejected." and transition to IdleState
    }
    public void reportError(Atm context) {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class TransactionState implements AtmState {
    public void insertCard(Atm context) {
        // TODO: Print "Transaction in progress."
    }
    public void enterPin(Atm context, String pin) {
        // TODO: Print "Transaction in progress."
    }
    public void withdraw(Atm context, double amount) {
        // TODO: Check balance, deduct amount, print new balance, transition to AuthenticatedState
    }
    public void ejectCard(Atm context) {
        // TODO: Print "Transaction in progress."
    }
    public void reportError(Atm context) {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class OutOfServiceState implements AtmState {
    public void insertCard(Atm context) {
        // TODO: Print "ATM is out of service."
    }
    public void enterPin(Atm context, String pin) {
        // TODO: Print "ATM is out of service."
    }
    public void withdraw(Atm context, double amount) {
        // TODO: Print "ATM is out of service."
    }
    public void ejectCard(Atm context) {
        // TODO: Print "ATM is out of service."
    }
    public void reportError(Atm context) {
        // TODO: Print "ATM is already out of service."
    }
}

class Atm {
    private AtmState state;
    private double balance;
    private final String correctPin;

    public Atm(double initialBalance) {
        this.balance = initialBalance;
        this.correctPin = "1234";
        this.state = new IdleState();
    }

    public void setState(AtmState state) { this.state = state; }
    public double getBalance() { return balance; }
    public void setBalance(double balance) { this.balance = balance; }
    public String getCorrectPin() { return correctPin; }

    public void insertCard() { state.insertCard(this); }
    public void enterPin(String pin) { state.enterPin(this, pin); }
    public void withdraw(double amount) { state.withdraw(this, amount); }
    public void ejectCard() { state.ejectCard(this); }
    public void reportError() { state.reportError(this); }
}

public class Main {
    public static void main(String[] args) {
        // Atm atm = new Atm(10000);
        //
        // atm.insertCard();
        // atm.enterPin("0000");        // Wrong pin
        //
        // atm.insertCard();
        // atm.enterPin("1234");        // Correct
        // atm.withdraw(3000);          // Success
        // atm.withdraw(5000);          // Success
        // atm.withdraw(5000);          // Insufficient funds
        // atm.ejectCard();
        //
        // atm.insertCard();
        // atm.reportError();           // Out of service
        // atm.insertCard();            // Rejected
    }
}
```

```python
from abc import ABC, abstractmethod

class AtmState(ABC):
    @abstractmethod
    def insert_card(self, context): pass
    @abstractmethod
    def enter_pin(self, context, pin): pass
    @abstractmethod
    def withdraw(self, context, amount): pass
    @abstractmethod
    def eject_card(self, context): pass
    @abstractmethod
    def report_error(self, context): pass

class IdleState(AtmState):
    def insert_card(self, context):
        pass  # TODO: Print "Card inserted." and transition to CardInsertedState

    def enter_pin(self, context, pin):
        pass  # TODO: Print "No card inserted."

    def withdraw(self, context, amount):
        pass  # TODO: Print "No card inserted."

    def eject_card(self, context):
        pass  # TODO: Print "No card inserted."

    def report_error(self, context):
        pass  # TODO: Print "ATM error reported." and transition to OutOfServiceState

class CardInsertedState(AtmState):
    def insert_card(self, context):
        pass  # TODO: Print "Card already inserted."

    def enter_pin(self, context, pin):
        pass  # TODO: Validate pin against context.correct_pin
        # If correct: print "Pin accepted." and transition to AuthenticatedState
        # If wrong: print "Incorrect pin. Ejecting card." and transition to IdleState

    def withdraw(self, context, amount):
        pass  # TODO: Print "Please enter pin first."

    def eject_card(self, context):
        pass  # TODO: Print "Card ejected." and transition to IdleState

    def report_error(self, context):
        pass  # TODO: Print "ATM error reported." and transition to OutOfServiceState

class AuthenticatedState(AtmState):
    def insert_card(self, context):
        pass  # TODO: Print "Card already inserted."

    def enter_pin(self, context, pin):
        pass  # TODO: Print "Already authenticated."

    def withdraw(self, context, amount):
        pass  # TODO: Print "Processing withdrawal..." and transition to TransactionState

    def eject_card(self, context):
        pass  # TODO: Print "Card ejected." and transition to IdleState

    def report_error(self, context):
        pass  # TODO: Print "ATM error reported." and transition to OutOfServiceState

class TransactionState(AtmState):
    def insert_card(self, context):
        pass  # TODO: Print "Transaction in progress."

    def enter_pin(self, context, pin):
        pass  # TODO: Print "Transaction in progress."

    def withdraw(self, context, amount):
        pass  # TODO: Check balance, deduct amount, print new balance, transition to AuthenticatedState

    def eject_card(self, context):
        pass  # TODO: Print "Transaction in progress."

    def report_error(self, context):
        pass  # TODO: Print "ATM error reported." and transition to OutOfServiceState

class OutOfServiceState(AtmState):
    def insert_card(self, context):
        pass  # TODO: Print "ATM is out of service."

    def enter_pin(self, context, pin):
        pass  # TODO: Print "ATM is out of service."

    def withdraw(self, context, amount):
        pass  # TODO: Print "ATM is out of service."

    def eject_card(self, context):
        pass  # TODO: Print "ATM is out of service."

    def report_error(self, context):
        pass  # TODO: Print "ATM is already out of service."

class Atm:
    def __init__(self, initial_balance):
        self.balance = initial_balance
        self.correct_pin = "1234"
        self._state = IdleState()

    def set_state(self, state): self._state = state
    def insert_card(self): self._state.insert_card(self)
    def enter_pin(self, pin): self._state.enter_pin(self, pin)
    def withdraw(self, amount): self._state.withdraw(self, amount)
    def eject_card(self): self._state.eject_card(self)
    def report_error(self): self._state.report_error(self)

if __name__ == "__main__":
    pass
    # atm = Atm(10000)
    #
    # atm.insert_card()
    # atm.enter_pin("0000")        # Wrong pin
    #
    # atm.insert_card()
    # atm.enter_pin("1234")        # Correct
    # atm.withdraw(3000)           # Success
    # atm.withdraw(5000)           # Success
    # atm.withdraw(5000)           # Insufficient funds
    # atm.eject_card()
    #
    # atm.insert_card()
    # atm.report_error()           # Out of service
    # atm.insert_card()            # Rejected
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Atm;

class AtmState {
public:
    virtual ~AtmState() = default;
    virtual void insertCard(Atm* ctx) = 0;
    virtual void enterPin(Atm* ctx, string pin) = 0;
    virtual void withdraw(Atm* ctx, double amount) = 0;
    virtual void ejectCard(Atm* ctx) = 0;
    virtual void reportError(Atm* ctx) = 0;
};

class IdleState : public AtmState {
public:
    void insertCard(Atm* ctx) override {
        // TODO: Print "Card inserted." and transition to CardInsertedState
    }
    void enterPin(Atm* ctx, string pin) override {
        // TODO: Print "No card inserted."
    }
    void withdraw(Atm* ctx, double amount) override {
        // TODO: Print "No card inserted."
    }
    void ejectCard(Atm* ctx) override {
        // TODO: Print "No card inserted."
    }
    void reportError(Atm* ctx) override {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
};

class CardInsertedState : public AtmState {
public:
    void insertCard(Atm* ctx) override {
        // TODO: Print "Card already inserted."
    }
    void enterPin(Atm* ctx, string pin) override {
        // TODO: Validate pin against ctx->getCorrectPin()
        // If correct: print "Pin accepted." and transition to AuthenticatedState
        // If wrong: print "Incorrect pin. Ejecting card." and transition to IdleState
    }
    void withdraw(Atm* ctx, double amount) override {
        // TODO: Print "Please enter pin first."
    }
    void ejectCard(Atm* ctx) override {
        // TODO: Print "Card ejected." and transition to IdleState
    }
    void reportError(Atm* ctx) override {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
};

class AuthenticatedState : public AtmState {
public:
    void insertCard(Atm* ctx) override {
        // TODO: Print "Card already inserted."
    }
    void enterPin(Atm* ctx, string pin) override {
        // TODO: Print "Already authenticated."
    }
    void withdraw(Atm* ctx, double amount) override {
        // TODO: Print "Processing withdrawal..." and transition to TransactionState
    }
    void ejectCard(Atm* ctx) override {
        // TODO: Print "Card ejected." and transition to IdleState
    }
    void reportError(Atm* ctx) override {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
};

class TransactionState : public AtmState {
public:
    void insertCard(Atm* ctx) override {
        // TODO: Print "Transaction in progress."
    }
    void enterPin(Atm* ctx, string pin) override {
        // TODO: Print "Transaction in progress."
    }
    void withdraw(Atm* ctx, double amount) override {
        // TODO: Check balance, deduct amount, print new balance, transition to AuthenticatedState
    }
    void ejectCard(Atm* ctx) override {
        // TODO: Print "Transaction in progress."
    }
    void reportError(Atm* ctx) override {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
};

class OutOfServiceState : public AtmState {
public:
    void insertCard(Atm* ctx) override {
        // TODO: Print "ATM is out of service."
    }
    void enterPin(Atm* ctx, string pin) override {
        // TODO: Print "ATM is out of service."
    }
    void withdraw(Atm* ctx, double amount) override {
        // TODO: Print "ATM is out of service."
    }
    void ejectCard(Atm* ctx) override {
        // TODO: Print "ATM is out of service."
    }
    void reportError(Atm* ctx) override {
        // TODO: Print "ATM is already out of service."
    }
};

class Atm {
private:
    AtmState* state;
    double balance;
    string correctPin;
public:
    Atm(double initialBalance) : balance(initialBalance), correctPin("1234") {
        state = new IdleState();
    }
    ~Atm() { delete state; }
    void setState(AtmState* s) { delete state; state = s; }
    double getBalance() { return balance; }
    void setBalance(double b) { balance = b; }
    string getCorrectPin() { return correctPin; }
    void insertCard() { state->insertCard(this); }
    void enterPin(string pin) { state->enterPin(this, pin); }
    void withdraw(double amount) { state->withdraw(this, amount); }
    void ejectCard() { state->ejectCard(this); }
    void reportError() { state->reportError(this); }
};

int main() {
    // Atm atm(10000);
    //
    // atm.insertCard();
    // atm.enterPin("0000");        // Wrong pin
    //
    // atm.insertCard();
    // atm.enterPin("1234");        // Correct
    // atm.withdraw(3000);          // Success
    // atm.withdraw(5000);          // Success
    // atm.withdraw(5000);          // Insufficient funds
    // atm.ejectCard();
    //
    // atm.insertCard();
    // atm.reportError();           // Out of service
    // atm.insertCard();            // Rejected
    return 0;
}
```

```go
package main

type AtmState interface {
	InsertCard(context *Atm)
	EnterPin(context *Atm, pin string)
	Withdraw(context *Atm, amount float64)
	EjectCard(context *Atm)
	ReportError(context *Atm)
}

type IdleState struct{}

func (s *IdleState) InsertCard(context *Atm) {
	// TODO: Print "Card inserted." and transition to CardInsertedState
}

func (s *IdleState) EnterPin(context *Atm, pin string) {
	// TODO: Print "No card inserted."
}

func (s *IdleState) Withdraw(context *Atm, amount float64) {
	// TODO: Print "No card inserted."
}

func (s *IdleState) EjectCard(context *Atm) {
	// TODO: Print "No card inserted."
}

func (s *IdleState) ReportError(context *Atm) {
	// TODO: Print "ATM error reported." and transition to OutOfServiceState
}

type CardInsertedState struct{}

func (s *CardInsertedState) InsertCard(context *Atm) {
	// TODO: Print "Card already inserted."
}

func (s *CardInsertedState) EnterPin(context *Atm, pin string) {
	// TODO: Validate pin against context.getCorrectPin()
	// If correct: print "Pin accepted." and transition to AuthenticatedState
	// If wrong: print "Incorrect pin. Ejecting card." and transition to IdleState
}

func (s *CardInsertedState) Withdraw(context *Atm, amount float64) {
	// TODO: Print "Please enter pin first."
}

func (s *CardInsertedState) EjectCard(context *Atm) {
	// TODO: Print "Card ejected." and transition to IdleState
}

func (s *CardInsertedState) ReportError(context *Atm) {
	// TODO: Print "ATM error reported." and transition to OutOfServiceState
}

type AuthenticatedState struct{}

func (s *AuthenticatedState) InsertCard(context *Atm) {
	// TODO: Print "Card already inserted."
}

func (s *AuthenticatedState) EnterPin(context *Atm, pin string) {
	// TODO: Print "Already authenticated."
}

func (s *AuthenticatedState) Withdraw(context *Atm, amount float64) {
	// TODO: Print "Processing withdrawal..." and transition to TransactionState
	// Then process: check if amount <= context.GetBalance()
}

func (s *AuthenticatedState) EjectCard(context *Atm) {
	// TODO: Print "Card ejected." and transition to IdleState
}

func (s *AuthenticatedState) ReportError(context *Atm) {
	// TODO: Print "ATM error reported." and transition to OutOfServiceState
}

type TransactionState struct{}

func (s *TransactionState) InsertCard(context *Atm) {
	// TODO: Print "Transaction in progress."
}

func (s *TransactionState) EnterPin(context *Atm, pin string) {
	// TODO: Print "Transaction in progress."
}

func (s *TransactionState) Withdraw(context *Atm, amount float64) {
	// TODO: Check balance, deduct amount, print new balance, transition to AuthenticatedState
}

func (s *TransactionState) EjectCard(context *Atm) {
	// TODO: Print "Transaction in progress."
}

func (s *TransactionState) ReportError(context *Atm) {
	// TODO: Print "ATM error reported." and transition to OutOfServiceState
}

type OutOfServiceState struct{}

func (s *OutOfServiceState) InsertCard(context *Atm) {
	// TODO: Print "ATM is out of service."
}

func (s *OutOfServiceState) EnterPin(context *Atm, pin string) {
	// TODO: Print "ATM is out of service."
}

func (s *OutOfServiceState) Withdraw(context *Atm, amount float64) {
	// TODO: Print "ATM is out of service."
}

func (s *OutOfServiceState) EjectCard(context *Atm) {
	// TODO: Print "ATM is out of service."
}

func (s *OutOfServiceState) ReportError(context *Atm) {
	// TODO: Print "ATM is already out of service."
}

type Atm struct {
	state      AtmState
	balance    float64
	correctPin string
}

func NewAtm(initialBalance float64) *Atm {
	return &Atm{
		balance:    initialBalance,
		correctPin: "1234",
		state:      &IdleState{},
	}
}

func (a *Atm) SetState(state AtmState) {
	a.state = state
}

func (a *Atm) GetBalance() float64 {
	return a.balance
}

func (a *Atm) SetBalance(balance float64) {
	a.balance = balance
}

func (a *Atm) GetCorrectPin() string {
	return a.correctPin
}

func (a *Atm) InsertCard() {
	a.state.InsertCard(a)
}

func (a *Atm) EnterPin(pin string) {
	a.state.EnterPin(a, pin)
}

func (a *Atm) Withdraw(amount float64) {
	a.state.Withdraw(a, amount)
}

func (a *Atm) EjectCard() {
	a.state.EjectCard(a)
}

func (a *Atm) ReportError() {
	a.state.ReportError(a)
}

func main() {
	// atm := NewAtm(10000)
	//
	// atm.InsertCard()
	// atm.EnterPin("0000")        // Wrong pin
	//
	// atm.InsertCard()
	// atm.EnterPin("1234")        // Correct
	// atm.Withdraw(3000)          // Success
	// atm.Withdraw(5000)          // Success
	// atm.Withdraw(5000)          // Insufficient funds
	// atm.EjectCard()
	//
	// atm.InsertCard()
	// atm.ReportError()           // Out of service
	// atm.InsertCard()            // Rejected
}
```

```csharp
using System;

interface IAtmState
{
    void InsertCard(Atm context);
    void EnterPin(Atm context, string pin);
    void Withdraw(Atm context, double amount);
    void EjectCard(Atm context);
    void ReportError(Atm context);
}

class IdleState : IAtmState
{
    public void InsertCard(Atm context) {
        // TODO: Print "Card inserted." and transition to CardInsertedState
    }
    public void EnterPin(Atm context, string pin) {
        // TODO: Print "No card inserted."
    }
    public void Withdraw(Atm context, double amount) {
        // TODO: Print "No card inserted."
    }
    public void EjectCard(Atm context) {
        // TODO: Print "No card inserted."
    }
    public void ReportError(Atm context) {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class CardInsertedState : IAtmState
{
    public void InsertCard(Atm context) {
        // TODO: Print "Card already inserted."
    }
    public void EnterPin(Atm context, string pin) {
        // TODO: Validate pin against context.CorrectPin
        // If correct: print "Pin accepted." and transition to AuthenticatedState
        // If wrong: print "Incorrect pin. Ejecting card." and transition to IdleState
    }
    public void Withdraw(Atm context, double amount) {
        // TODO: Print "Please enter pin first."
    }
    public void EjectCard(Atm context) {
        // TODO: Print "Card ejected." and transition to IdleState
    }
    public void ReportError(Atm context) {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class AuthenticatedState : IAtmState
{
    public void InsertCard(Atm context) {
        // TODO: Print "Card already inserted."
    }
    public void EnterPin(Atm context, string pin) {
        // TODO: Print "Already authenticated."
    }
    public void Withdraw(Atm context, double amount) {
        // TODO: Print "Processing withdrawal..." and transition to TransactionState
    }
    public void EjectCard(Atm context) {
        // TODO: Print "Card ejected." and transition to IdleState
    }
    public void ReportError(Atm context) {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class TransactionState : IAtmState
{
    public void InsertCard(Atm context) {
        // TODO: Print "Transaction in progress."
    }
    public void EnterPin(Atm context, string pin) {
        // TODO: Print "Transaction in progress."
    }
    public void Withdraw(Atm context, double amount) {
        // TODO: Check balance, deduct amount, print new balance, transition to AuthenticatedState
    }
    public void EjectCard(Atm context) {
        // TODO: Print "Transaction in progress."
    }
    public void ReportError(Atm context) {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class OutOfServiceState : IAtmState
{
    public void InsertCard(Atm context) {
        // TODO: Print "ATM is out of service."
    }
    public void EnterPin(Atm context, string pin) {
        // TODO: Print "ATM is out of service."
    }
    public void Withdraw(Atm context, double amount) {
        // TODO: Print "ATM is out of service."
    }
    public void EjectCard(Atm context) {
        // TODO: Print "ATM is out of service."
    }
    public void ReportError(Atm context) {
        // TODO: Print "ATM is already out of service."
    }
}

class Atm
{
    private IAtmState _state;
    public double Balance { get; set; }
    public string CorrectPin { get; } = "1234";

    public Atm(double initialBalance)
    {
        Balance = initialBalance;
        _state = new IdleState();
    }

    public void SetState(IAtmState state) {
        _state = state;
    }
    public void InsertCard() {
        _state.InsertCard(this);
    }
    public void EnterPin(string pin) {
        _state.EnterPin(this, pin);
    }
    public void Withdraw(double amount) {
        _state.Withdraw(this, amount);
    }
    public void EjectCard() {
        _state.EjectCard(this);
    }
    public void ReportError() {
        _state.ReportError(this);
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Atm atm = new Atm(10000);
        //
        // atm.InsertCard();
        // atm.EnterPin("0000");        // Wrong pin
        //
        // atm.InsertCard();
        // atm.EnterPin("1234");        // Correct
        // atm.Withdraw(3000);          // Success
        // atm.Withdraw(5000);          // Success
        // atm.Withdraw(5000);          // Insufficient funds
        // atm.EjectCard();
        //
        // atm.InsertCard();
        // atm.ReportError();           // Out of service
        // atm.InsertCard();            // Rejected
    }
}
```

```typescript
interface AtmState {
    insertCard(context: Atm): void;
    enterPin(context: Atm, pin: string): void;
    withdraw(context: Atm, amount: number): void;
    ejectCard(context: Atm): void;
    reportError(context: Atm): void;
}

class IdleState implements AtmState {
    insertCard(context: Atm): void {
        // TODO: Print "Card inserted." and transition to CardInsertedState
    }
    enterPin(context: Atm, pin: string): void {
        // TODO: Print "No card inserted."
    }
    withdraw(context: Atm, amount: number): void {
        // TODO: Print "No card inserted."
    }
    ejectCard(context: Atm): void {
        // TODO: Print "No card inserted."
    }
    reportError(context: Atm): void {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class CardInsertedState implements AtmState {
    insertCard(context: Atm): void {
        // TODO: Print "Card already inserted."
    }
    enterPin(context: Atm, pin: string): void {
        // TODO: Validate pin against context.correctPin
        // If correct: print "Pin accepted." and transition to AuthenticatedState
        // If wrong: print "Incorrect pin. Ejecting card." and transition to IdleState
    }
    withdraw(context: Atm, amount: number): void {
        // TODO: Print "Please enter pin first."
    }
    ejectCard(context: Atm): void {
        // TODO: Print "Card ejected." and transition to IdleState
    }
    reportError(context: Atm): void {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class AuthenticatedState implements AtmState {
    insertCard(context: Atm): void {
        // TODO: Print "Card already inserted."
    }
    enterPin(context: Atm, pin: string): void {
        // TODO: Print "Already authenticated."
    }
    withdraw(context: Atm, amount: number): void {
        // TODO: Print "Processing withdrawal..." and transition to TransactionState
    }
    ejectCard(context: Atm): void {
        // TODO: Print "Card ejected." and transition to IdleState
    }
    reportError(context: Atm): void {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class TransactionState implements AtmState {
    insertCard(context: Atm): void {
        // TODO: Print "Transaction in progress."
    }
    enterPin(context: Atm, pin: string): void {
        // TODO: Print "Transaction in progress."
    }
    withdraw(context: Atm, amount: number): void {
        // TODO: Check balance, deduct amount, print new balance, transition to AuthenticatedState
    }
    ejectCard(context: Atm): void {
        // TODO: Print "Transaction in progress."
    }
    reportError(context: Atm): void {
        // TODO: Print "ATM error reported." and transition to OutOfServiceState
    }
}

class OutOfServiceState implements AtmState {
    insertCard(context: Atm): void {
        // TODO: Print "ATM is out of service."
    }
    enterPin(context: Atm, pin: string): void {
        // TODO: Print "ATM is out of service."
    }
    withdraw(context: Atm, amount: number): void {
        // TODO: Print "ATM is out of service."
    }
    ejectCard(context: Atm): void {
        // TODO: Print "ATM is out of service."
    }
    reportError(context: Atm): void {
        // TODO: Print "ATM is already out of service."
    }
}

class Atm {
    private state: AtmState;
    public balance: number;
    public readonly correctPin: string = "1234";

    constructor(initialBalance: number) {
        this.balance = initialBalance;
        this.state = new IdleState();
    }

    setState(state: AtmState): void {
        this.state = state;
    }
    insertCard(): void {
        this.state.insertCard(this);
    }
    enterPin(pin: string): void {
        this.state.enterPin(this, pin);
    }
    withdraw(amount: number): void {
        this.state.withdraw(this, amount);
    }
    ejectCard(): void {
        this.state.ejectCard(this);
    }
    reportError(): void {
        this.state.reportError(this);
    }
}

// const atm = new Atm(10000);
//
// atm.insertCard();
// atm.enterPin("0000");        // Wrong pin
//
// atm.insertCard();
// atm.enterPin("1234");        // Correct
// atm.withdraw(3000);          // Success
// atm.withdraw(5000);          // Success
// atm.withdraw(5000);          // Insufficient funds
// atm.ejectCard();
//
// atm.insertCard();
// atm.reportError();           // Out of service
// atm.insertCard();            // Rejected
```

#### Solutions

```java
interface AtmState {
    void insertCard(Atm context);
    void enterPin(Atm context, String pin);
    void withdraw(Atm context, double amount);
    void ejectCard(Atm context);
    void reportError(Atm context);
}

class IdleState implements AtmState {
    public void insertCard(Atm context) {
        System.out.println("Card inserted. Enter your PIN.");
        context.setState(new CardInsertedState());
    }
    public void enterPin(Atm context, String pin) {
        System.out.println("Please insert your card first.");
    }

    public void withdraw(Atm context, double amount) {
        System.out.println("Please insert your card first.");
    }

    public void ejectCard(Atm context) {
        System.out.println("No card inserted.");
    }

    public void reportError(Atm context) {
        System.out.println("ATM error reported. Shutting down.");
        context.setState(new OutOfServiceState());
    }
}

class CardInsertedState implements AtmState {
    public void insertCard(Atm context) {
        System.out.println("Card already inserted.");
    }
    public void enterPin(Atm context, String pin) {
        if (pin.equals(context.getCorrectPin())) {
            System.out.println("PIN accepted. You are authenticated.");
            context.setState(new AuthenticatedState());
        } else {
            System.out.println("Incorrect PIN. Card ejected.");
            context.setState(new IdleState());
        }
    }
    public void withdraw(Atm context, double amount) {
        System.out.println("Please enter your PIN first.");
    }

    public void ejectCard(Atm context) {
        System.out.println("Card ejected.");
        context.setState(new IdleState());
    }
    public void reportError(Atm context) {
        System.out.println("ATM error reported. Shutting down.");
        context.setState(new OutOfServiceState());
    }
}

class AuthenticatedState implements AtmState {
    public void insertCard(Atm context) {
        System.out.println("Card already inserted.");
    }

    public void enterPin(Atm context, String pin) {
        System.out.println("Already authenticated.");
    }
    public void withdraw(Atm context, double amount) {
        if (amount > context.getBalance()) {
            System.out.printf("Insufficient funds. Balance: $%.2f%n", context.getBalance());
        } else {
            context.setBalance(context.getBalance() - amount);
            System.out.printf("Withdrawing $%.2f. New balance: $%.2f%n", amount, context.getBalance());
        }
    }
    public void ejectCard(Atm context) {
        System.out.println("Card ejected. Returning to idle.");
        context.setState(new IdleState());
    }
    public void reportError(Atm context) {
        System.out.println("ATM error reported. Shutting down.");
        context.setState(new OutOfServiceState());
    }
}

class TransactionState implements AtmState {
    public void insertCard(Atm context) {
        System.out.println("Transaction in progress.");
    }

    public void enterPin(Atm context, String pin) {
        System.out.println("Transaction in progress.");
    }

    public void withdraw(Atm context, double amount) {
        System.out.println("Transaction in progress.");
    }

    public void ejectCard(Atm context) {
        System.out.println("Transaction in progress.");
    }
    public void reportError(Atm context) {
        System.out.println("ATM error reported. Shutting down.");
        context.setState(new OutOfServiceState());
    }
}

class OutOfServiceState implements AtmState {
    public void insertCard(Atm context) {
        System.out.println("ATM is out of service.");
    }

    public void enterPin(Atm context, String pin) {
        System.out.println("ATM is out of service.");
    }

    public void withdraw(Atm context, double amount) {
        System.out.println("ATM is out of service.");
    }

    public void ejectCard(Atm context) {
        System.out.println("ATM is out of service.");
    }

    public void reportError(Atm context) {
        System.out.println("ATM is out of service.");
    }
}

class Atm {
    private AtmState state;
    private double balance;
    private final String correctPin;

    public Atm(double initialBalance) {
        this.balance = initialBalance;
        this.correctPin = "1234";
        this.state = new IdleState();
    }

    public void setState(AtmState state) {
        this.state = state;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }

    public String getCorrectPin() {
        return correctPin;
    }

    public void insertCard() {
        state.insertCard(this);
    }

    public void enterPin(String pin) {
        state.enterPin(this, pin);
    }

    public void withdraw(double amount) {
        state.withdraw(this, amount);
    }

    public void ejectCard() {
        state.ejectCard(this);
    }

    public void reportError() {
        state.reportError(this);
    }
}

public class Main {
    public static void main(String[] args) {
        Atm atm = new Atm(10000);

        atm.insertCard();
        atm.enterPin("0000");        // Wrong pin

        atm.insertCard();
        atm.enterPin("1234");        // Correct
        atm.withdraw(3000);          // Success
        atm.withdraw(5000);          // Success
        atm.withdraw(5000);          // Insufficient funds
        atm.ejectCard();

        atm.insertCard();
        atm.reportError();           // Out of service
        atm.insertCard();            // Rejected
    }
}
```

```python
from abc import ABC, abstractmethod

class AtmState(ABC):
    @abstractmethod
    def insert_card(self, context): pass
    @abstractmethod
    def enter_pin(self, context, pin): pass
    @abstractmethod
    def withdraw(self, context, amount): pass
    @abstractmethod
    def eject_card(self, context): pass
    @abstractmethod
    def report_error(self, context): pass

class IdleState(AtmState):
    def insert_card(self, context):
        print("Card inserted. Enter your PIN.")
        context.set_state(CardInsertedState())
    def enter_pin(self, context, pin):
        print("Please insert your card first.")

    def withdraw(self, context, amount):
        print("Please insert your card first.")

    def eject_card(self, context):
        print("No card inserted.")

    def report_error(self, context):
        print("ATM error reported. Shutting down.")
        context.set_state(OutOfServiceState())

class CardInsertedState(AtmState):
    def insert_card(self, context):
        print("Card already inserted.")
    def enter_pin(self, context, pin):
        if pin == context.correct_pin:
            print("PIN accepted. You are authenticated.")
            context.set_state(AuthenticatedState())
        else:
            print("Incorrect PIN. Card ejected.")
            context.set_state(IdleState())
    def withdraw(self, context, amount):
        print("Please enter your PIN first.")

    def eject_card(self, context):
        print("Card ejected.")
        context.set_state(IdleState())
    def report_error(self, context):
        print("ATM error reported. Shutting down.")
        context.set_state(OutOfServiceState())

class AuthenticatedState(AtmState):
    def insert_card(self, context):
        print("Card already inserted.")

    def enter_pin(self, context, pin):
        print("Already authenticated.")
    def withdraw(self, context, amount):
        if amount > context.balance:
            print(f"Insufficient funds. Balance: ${context.balance:.2f}")
        else:
            context.balance -= amount
            print(f"Withdrawing ${amount:.2f}. New balance: ${context.balance:.2f}")
    def eject_card(self, context):
        print("Card ejected. Returning to idle.")
        context.set_state(IdleState())
    def report_error(self, context):
        print("ATM error reported. Shutting down.")
        context.set_state(OutOfServiceState())

class TransactionState(AtmState):
    def insert_card(self, context):
        print("Transaction in progress.")

    def enter_pin(self, context, pin):
        print("Transaction in progress.")

    def withdraw(self, context, amount):
        print("Transaction in progress.")

    def eject_card(self, context):
        print("Transaction in progress.")
    def report_error(self, context):
        print("ATM error reported. Shutting down.")
        context.set_state(OutOfServiceState())

class OutOfServiceState(AtmState):
    def insert_card(self, context):
        print("ATM is out of service.")

    def enter_pin(self, context, pin):
        print("ATM is out of service.")

    def withdraw(self, context, amount):
        print("ATM is out of service.")

    def eject_card(self, context):
        print("ATM is out of service.")

    def report_error(self, context):
        print("ATM is out of service.")

class Atm:
    def __init__(self, initial_balance):
        self.balance = initial_balance
        self.correct_pin = "1234"
        self._state = IdleState()

    def set_state(self, state):
        self._state = state

    def insert_card(self):
        self._state.insert_card(self)

    def enter_pin(self, pin):
        self._state.enter_pin(self, pin)

    def withdraw(self, amount):
        self._state.withdraw(self, amount)

    def eject_card(self):
        self._state.eject_card(self)

    def report_error(self):
        self._state.report_error(self)

if __name__ == "__main__":
    atm = Atm(10000)
    atm.insert_card()
    atm.enter_pin("0000")
    atm.insert_card()
    atm.enter_pin("1234")
    atm.withdraw(3000)
    atm.withdraw(5000)
    atm.withdraw(5000)
    atm.eject_card()
    atm.insert_card()
    atm.report_error()
    atm.insert_card()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Atm;

class AtmState {
public:
    virtual ~AtmState() = default;
    virtual void insertCard(Atm* ctx) = 0;
    virtual void enterPin(Atm* ctx, string pin) = 0;
    virtual void withdraw(Atm* ctx, double amount) = 0;
    virtual void ejectCard(Atm* ctx) = 0;
    virtual void reportError(Atm* ctx) = 0;
};

class IdleState;
class CardInsertedState;
class AuthenticatedState;
class TransactionState;
class OutOfServiceState;

class Atm {
private:
    AtmState* state;
    double balance;
    string correctPin;
public:
    Atm(double initialBalance);
    ~Atm() {
        delete state;
    }

    void setState(AtmState* s) {
        delete state;
        state = s;
    }

    double getBalance() {
        return balance;
    }

    void setBalance(double b) {
        balance = b;
    }

    string getCorrectPin() {
        return correctPin;
    }

    void insertCard() {
        state->insertCard(this);
    }

    void enterPin(string pin) {
        state->enterPin(this, pin);
    }

    void withdraw(double amount) {
        state->withdraw(this, amount);
    }

    void ejectCard() {
        state->ejectCard(this);
    }

    void reportError() {
        state->reportError(this);
    }
};

class OutOfServiceState : public AtmState {
public:
    void insertCard(Atm* ctx) override {
        cout << "ATM is out of service." << endl;
    }

    void enterPin(Atm* ctx, string pin) override {
        cout << "ATM is out of service." << endl;
    }

    void withdraw(Atm* ctx, double amount) override {
        cout << "ATM is out of service." << endl;
    }

    void ejectCard(Atm* ctx) override {
        cout << "ATM is out of service." << endl;
    }

    void reportError(Atm* ctx) override {
        cout << "ATM is out of service." << endl;
    }
};

class TransactionState : public AtmState {
public:
    void insertCard(Atm* ctx) override {
        cout << "Transaction in progress." << endl;
    }

    void enterPin(Atm* ctx, string pin) override {
        cout << "Transaction in progress." << endl;
    }

    void withdraw(Atm* ctx, double amount) override {
        cout << "Transaction in progress." << endl;
    }

    void ejectCard(Atm* ctx) override {
        cout << "Transaction in progress." << endl;
    }

    void reportError(Atm* ctx) override {
        cout << "ATM error reported. Shutting down." << endl;
        ctx->setState(new OutOfServiceState());
    }
};

class IdleState : public AtmState {
public:
    void insertCard(Atm* ctx) override;

    void enterPin(Atm* ctx, string pin) override {
        cout << "Please insert your card first." << endl;
    }

    void withdraw(Atm* ctx, double amount) override {
        cout << "Please insert your card first." << endl;
    }

    void ejectCard(Atm* ctx) override {
        cout << "No card inserted." << endl;
    }

    void reportError(Atm* ctx) override {
        cout << "ATM error reported. Shutting down." << endl;
        ctx->setState(new OutOfServiceState());
    }
};

class AuthenticatedState : public AtmState {
public:
    void insertCard(Atm* ctx) override {
        cout << "Card already inserted." << endl;
    }

    void enterPin(Atm* ctx, string pin) override {
        cout << "Already authenticated." << endl;
    }

    void withdraw(Atm* ctx, double amount) override {
        if (amount > ctx->getBalance()) {
            printf("Insufficient funds. Balance: $%.2f\n", ctx->getBalance());
        } else {
            ctx->setBalance(ctx->getBalance() - amount);
            printf("Withdrawing $%.2f. New balance: $%.2f\n", amount, ctx->getBalance());
        }
    }

    void ejectCard(Atm* ctx) override {
        cout << "Card ejected. Returning to idle." << endl;
        ctx->setState(new IdleState());
    }

    void reportError(Atm* ctx) override {
        cout << "ATM error reported. Shutting down." << endl;
        ctx->setState(new OutOfServiceState());
    }
};

class CardInsertedState : public AtmState {
public:
    void insertCard(Atm* ctx) override {
        cout << "Card already inserted." << endl;
    }

    void enterPin(Atm* ctx, string pin) override {
        if (pin == ctx->getCorrectPin()) {
            cout << "PIN accepted. You are authenticated." << endl;
            ctx->setState(new AuthenticatedState());
        } else {
            cout << "Incorrect PIN. Card ejected." << endl;
            ctx->setState(new IdleState());
        }
    }

    void withdraw(Atm* ctx, double amount) override {
        cout << "Please enter your PIN first." << endl;
    }

    void ejectCard(Atm* ctx) override {
        cout << "Card ejected." << endl;
        ctx->setState(new IdleState());
    }

    void reportError(Atm* ctx) override {
        cout << "ATM error reported. Shutting down." << endl;
        ctx->setState(new OutOfServiceState());
    }
};

void IdleState::insertCard(Atm* ctx) {
    cout << "Card inserted. Enter your PIN." << endl;
    ctx->setState(new CardInsertedState());
}

Atm::Atm(double initialBalance) : balance(initialBalance), correctPin("1234") {
    state = new IdleState();
}

int main() {
    Atm atm(10000);
    atm.insertCard();
    atm.enterPin("0000");
    atm.insertCard();
    atm.enterPin("1234");
    atm.withdraw(3000);
    atm.withdraw(5000);
    atm.withdraw(5000);
    atm.ejectCard();
    atm.insertCard();
    atm.reportError();
    atm.insertCard();
    return 0;
}
```

```go
package main

import "fmt"

type AtmState interface {
	insertCard(context *Atm)
	enterPin(context *Atm, pin string)
	withdraw(context *Atm, amount float64)
	ejectCard(context *Atm)
	reportError(context *Atm)
}

type IdleState struct{}

func (s *IdleState) insertCard(context *Atm) {
	fmt.Println("Card inserted. Enter your PIN.")
	context.setState(&CardInsertedState{})
}

func (s *IdleState) enterPin(context *Atm, pin string) {
	fmt.Println("Please insert your card first.")
}

func (s *IdleState) withdraw(context *Atm, amount float64) {
	fmt.Println("Please insert your card first.")
}

func (s *IdleState) ejectCard(context *Atm) {
	fmt.Println("No card inserted.")
}

func (s *IdleState) reportError(context *Atm) {
	fmt.Println("ATM error reported. Shutting down.")
	context.setState(&OutOfServiceState{})
}

type CardInsertedState struct{}

func (s *CardInsertedState) insertCard(context *Atm) {
	fmt.Println("Card already inserted.")
}

func (s *CardInsertedState) enterPin(context *Atm, pin string) {
	if pin == context.getCorrectPin() {
		fmt.Println("PIN accepted. You are authenticated.")
		context.setState(&AuthenticatedState{})
	} else {
		fmt.Println("Incorrect PIN. Card ejected.")
		context.setState(&IdleState{})
	}
}

func (s *CardInsertedState) withdraw(context *Atm, amount float64) {
	fmt.Println("Please enter your PIN first.")
}

func (s *CardInsertedState) ejectCard(context *Atm) {
	fmt.Println("Card ejected.")
	context.setState(&IdleState{})
}

func (s *CardInsertedState) reportError(context *Atm) {
	fmt.Println("ATM error reported. Shutting down.")
	context.setState(&OutOfServiceState{})
}

type AuthenticatedState struct{}

func (s *AuthenticatedState) insertCard(context *Atm) {
	fmt.Println("Card already inserted.")
}

func (s *AuthenticatedState) enterPin(context *Atm, pin string) {
	fmt.Println("Already authenticated.")
}

func (s *AuthenticatedState) withdraw(context *Atm, amount float64) {
	if amount > context.getBalance() {
		fmt.Printf("Insufficient funds. Balance: $%.2f\n", context.getBalance())
	} else {
		context.setBalance(context.getBalance() - amount)
		fmt.Printf("Withdrawing $%.2f. New balance: $%.2f\n", amount, context.getBalance())
	}
}

func (s *AuthenticatedState) ejectCard(context *Atm) {
	fmt.Println("Card ejected. Returning to idle.")
	context.setState(&IdleState{})
}

func (s *AuthenticatedState) reportError(context *Atm) {
	fmt.Println("ATM error reported. Shutting down.")
	context.setState(&OutOfServiceState{})
}

type TransactionState struct{}

func (s *TransactionState) insertCard(context *Atm) {
	fmt.Println("Transaction in progress.")
}

func (s *TransactionState) enterPin(context *Atm, pin string) {
	fmt.Println("Transaction in progress.")
}

func (s *TransactionState) withdraw(context *Atm, amount float64) {
	fmt.Println("Transaction in progress.")
}

func (s *TransactionState) ejectCard(context *Atm) {
	fmt.Println("Transaction in progress.")
}

func (s *TransactionState) reportError(context *Atm) {
	fmt.Println("ATM error reported. Shutting down.")
	context.setState(&OutOfServiceState{})
}

type OutOfServiceState struct{}

func (s *OutOfServiceState) insertCard(context *Atm) {
	fmt.Println("ATM is out of service.")
}

func (s *OutOfServiceState) enterPin(context *Atm, pin string) {
	fmt.Println("ATM is out of service.")
}

func (s *OutOfServiceState) withdraw(context *Atm, amount float64) {
	fmt.Println("ATM is out of service.")
}

func (s *OutOfServiceState) ejectCard(context *Atm) {
	fmt.Println("ATM is out of service.")
}

func (s *OutOfServiceState) reportError(context *Atm) {
	fmt.Println("ATM is out of service.")
}

type Atm struct {
	state      AtmState
	balance    float64
	correctPin string
}

func NewAtm(initialBalance float64) *Atm {
	return &Atm{
		state:      &IdleState{},
		balance:    initialBalance,
		correctPin: "1234",
	}
}

func (a *Atm) setState(state AtmState) {
	a.state = state
}

func (a *Atm) getBalance() float64 {
	return a.balance
}

func (a *Atm) setBalance(balance float64) {
	a.balance = balance
}

func (a *Atm) getCorrectPin() string {
	return a.correctPin
}

func (a *Atm) insertCard() {
	a.state.insertCard(a)
}

func (a *Atm) enterPin(pin string) {
	a.state.enterPin(a, pin)
}

func (a *Atm) withdraw(amount float64) {
	a.state.withdraw(a, amount)
}

func (a *Atm) ejectCard() {
	a.state.ejectCard(a)
}

func (a *Atm) reportError() {
	a.state.reportError(a)
}

func main() {
	atm := NewAtm(10000)

	atm.insertCard()
	atm.enterPin("0000")

	atm.insertCard()
	atm.enterPin("1234")
	atm.withdraw(3000)
	atm.withdraw(5000)
	atm.withdraw(5000)
	atm.ejectCard()

	atm.insertCard()
	atm.reportError()
	atm.insertCard()
}
```

```csharp
using System;

interface IAtmState
{
    void InsertCard(Atm context);
    void EnterPin(Atm context, string pin);
    void Withdraw(Atm context, double amount);
    void EjectCard(Atm context);
    void ReportError(Atm context);
}

class IdleState : IAtmState
{
    public void InsertCard(Atm ctx) {
        Console.WriteLine("Card inserted. Enter your PIN.");
        ctx.SetState(new CardInsertedState());
    }
    public void EnterPin(Atm ctx, string pin) {
        Console.WriteLine("Please insert your card first.");
    }
    public void Withdraw(Atm ctx, double amount) {
        Console.WriteLine("Please insert your card first.");
    }
    public void EjectCard(Atm ctx) {
        Console.WriteLine("No card inserted.");
    }
    public void ReportError(Atm ctx) {
        Console.WriteLine("ATM error reported. Shutting down.");
        ctx.SetState(new OutOfServiceState());
    }
}

class CardInsertedState : IAtmState
{
    public void InsertCard(Atm ctx) {
        Console.WriteLine("Card already inserted.");
    }
    public void EnterPin(Atm ctx, string pin)
    {
        if (pin == ctx.CorrectPin)
        {
            Console.WriteLine("PIN accepted. You are authenticated.");
            ctx.SetState(new AuthenticatedState());
        }
        else
        {
            Console.WriteLine("Incorrect PIN. Card ejected.");
            ctx.SetState(new IdleState());
        }
    }
    public void Withdraw(Atm ctx, double amount) {
        Console.WriteLine("Please enter your PIN first.");
    }
    public void EjectCard(Atm ctx) {
        Console.WriteLine("Card ejected.");
        ctx.SetState(new IdleState());
    }
    public void ReportError(Atm ctx) {
        Console.WriteLine("ATM error reported. Shutting down.");
        ctx.SetState(new OutOfServiceState());
    }
}

class AuthenticatedState : IAtmState
{
    public void InsertCard(Atm ctx) {
        Console.WriteLine("Card already inserted.");
    }
    public void EnterPin(Atm ctx, string pin) {
        Console.WriteLine("Already authenticated.");
    }
    public void Withdraw(Atm ctx, double amount)
    {
        if (amount > ctx.Balance)
        {
            Console.WriteLine($"Insufficient funds. Balance: ${ctx.Balance:F2}");
        }
        else
        {
            ctx.Balance -= amount;
            Console.WriteLine($"Withdrawing ${amount:F2}. New balance: ${ctx.Balance:F2}");
        }
    }
    public void EjectCard(Atm ctx) {
        Console.WriteLine("Card ejected. Returning to idle.");
        ctx.SetState(new IdleState());
    }
    public void ReportError(Atm ctx) {
        Console.WriteLine("ATM error reported. Shutting down.");
        ctx.SetState(new OutOfServiceState());
    }
}

class TransactionState : IAtmState
{
    public void InsertCard(Atm ctx) {
        Console.WriteLine("Transaction in progress.");
    }
    public void EnterPin(Atm ctx, string pin) {
        Console.WriteLine("Transaction in progress.");
    }
    public void Withdraw(Atm ctx, double amount) {
        Console.WriteLine("Transaction in progress.");
    }
    public void EjectCard(Atm ctx) {
        Console.WriteLine("Transaction in progress.");
    }
    public void ReportError(Atm ctx) {
        Console.WriteLine("ATM error reported. Shutting down.");
        ctx.SetState(new OutOfServiceState());
    }
}

class OutOfServiceState : IAtmState
{
    public void InsertCard(Atm ctx) {
        Console.WriteLine("ATM is out of service.");
    }
    public void EnterPin(Atm ctx, string pin) {
        Console.WriteLine("ATM is out of service.");
    }
    public void Withdraw(Atm ctx, double amount) {
        Console.WriteLine("ATM is out of service.");
    }
    public void EjectCard(Atm ctx) {
        Console.WriteLine("ATM is out of service.");
    }
    public void ReportError(Atm ctx) {
        Console.WriteLine("ATM is out of service.");
    }
}

class Atm
{
    private IAtmState _state;
    public double Balance { get; set; }
    public string CorrectPin { get; } = "1234";

    public Atm(double initialBalance)
    {
        Balance = initialBalance;
        _state = new IdleState();
    }

    public void SetState(IAtmState state) {
        _state = state;
    }
    public void InsertCard() {
        _state.InsertCard(this);
    }
    public void EnterPin(string pin) {
        _state.EnterPin(this, pin);
    }
    public void Withdraw(double amount) {
        _state.Withdraw(this, amount);
    }
    public void EjectCard() {
        _state.EjectCard(this);
    }
    public void ReportError() {
        _state.ReportError(this);
    }
}

class Program
{
    static void Main(string[] args)
    {
        Atm atm = new Atm(10000);
        atm.InsertCard();
        atm.EnterPin("0000");
        atm.InsertCard();
        atm.EnterPin("1234");
        atm.Withdraw(3000);
        atm.Withdraw(5000);
        atm.Withdraw(5000);
        atm.EjectCard();
        atm.InsertCard();
        atm.ReportError();
        atm.InsertCard();
    }
}
```

```typescript
interface AtmState {
    insertCard(context: Atm): void;
    enterPin(context: Atm, pin: string): void;
    withdraw(context: Atm, amount: number): void;
    ejectCard(context: Atm): void;
    reportError(context: Atm): void;
}

class IdleState implements AtmState {
    insertCard(ctx: Atm): void {
        console.log("Card inserted. Enter your PIN.");
        ctx.setState(new CardInsertedState());
    }
    enterPin(ctx: Atm, pin: string): void {
        console.log("Please insert your card first.");
    }
    withdraw(ctx: Atm, amount: number): void {
        console.log("Please insert your card first.");
    }
    ejectCard(ctx: Atm): void {
        console.log("No card inserted.");
    }
    reportError(ctx: Atm): void {
        console.log("ATM error reported. Shutting down.");
        ctx.setState(new OutOfServiceState());
    }
}

class CardInsertedState implements AtmState {
    insertCard(ctx: Atm): void {
        console.log("Card already inserted.");
    }
    enterPin(ctx: Atm, pin: string): void {
        if (pin === ctx.correctPin) {
            console.log("PIN accepted. You are authenticated.");
            ctx.setState(new AuthenticatedState());
        } else {
            console.log("Incorrect PIN. Card ejected.");
            ctx.setState(new IdleState());
        }
    }
    withdraw(ctx: Atm, amount: number): void {
        console.log("Please enter your PIN first.");
    }
    ejectCard(ctx: Atm): void {
        console.log("Card ejected.");
        ctx.setState(new IdleState());
    }
    reportError(ctx: Atm): void {
        console.log("ATM error reported. Shutting down.");
        ctx.setState(new OutOfServiceState());
    }
}

class AuthenticatedState implements AtmState {
    insertCard(ctx: Atm): void {
        console.log("Card already inserted.");
    }
    enterPin(ctx: Atm, pin: string): void {
        console.log("Already authenticated.");
    }
    withdraw(ctx: Atm, amount: number): void {
        if (amount > ctx.balance) {
            console.log(`Insufficient funds. Balance: $${ctx.balance.toFixed(2)}`);
        } else {
            ctx.balance -= amount;
            console.log(`Withdrawing $${amount.toFixed(2)}. New balance: $${ctx.balance.toFixed(2)}`);
        }
    }
    ejectCard(ctx: Atm): void {
        console.log("Card ejected. Returning to idle.");
        ctx.setState(new IdleState());
    }
    reportError(ctx: Atm): void {
        console.log("ATM error reported. Shutting down.");
        ctx.setState(new OutOfServiceState());
    }
}

class TransactionState implements AtmState {
    insertCard(ctx: Atm): void {
        console.log("Transaction in progress.");
    }
    enterPin(ctx: Atm, pin: string): void {
        console.log("Transaction in progress.");
    }
    withdraw(ctx: Atm, amount: number): void {
        console.log("Transaction in progress.");
    }
    ejectCard(ctx: Atm): void {
        console.log("Transaction in progress.");
    }
    reportError(ctx: Atm): void {
        console.log("ATM error reported. Shutting down.");
        ctx.setState(new OutOfServiceState());
    }
}

class OutOfServiceState implements AtmState {
    insertCard(ctx: Atm): void {
        console.log("ATM is out of service.");
    }
    enterPin(ctx: Atm, pin: string): void {
        console.log("ATM is out of service.");
    }
    withdraw(ctx: Atm, amount: number): void {
        console.log("ATM is out of service.");
    }
    ejectCard(ctx: Atm): void {
        console.log("ATM is out of service.");
    }
    reportError(ctx: Atm): void {
        console.log("ATM is out of service.");
    }
}

class Atm {
    private state: AtmState;
    public balance: number;
    public readonly correctPin: string = "1234";

    constructor(initialBalance: number) {
        this.balance = initialBalance;
        this.state = new IdleState();
    }

    setState(state: AtmState): void {
        this.state = state;
    }
    insertCard(): void {
        this.state.insertCard(this);
    }
    enterPin(pin: string): void {
        this.state.enterPin(this, pin);
    }
    withdraw(amount: number): void {
        this.state.withdraw(this, amount);
    }
    ejectCard(): void {
        this.state.ejectCard(this);
    }
    reportError(): void {
        this.state.reportError(this);
    }
}

const atm = new Atm(10000);
atm.insertCard();
atm.enterPin("0000");
atm.insertCard();
atm.enterPin("1234");
atm.withdraw(3000);
atm.withdraw(5000);
atm.withdraw(5000);
atm.ejectCard();
atm.insertCard();
atm.reportError();
atm.insertCard();
```


