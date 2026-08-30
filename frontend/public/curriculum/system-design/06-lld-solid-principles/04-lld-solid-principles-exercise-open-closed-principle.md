---
id: "lld-solid-principles-exercise-open-closed-principle"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - SOLID Principles"
subSection: ""
title: "Exercise: Open-Closed Principle"
slug: "lld-solid-principles-exercise-open-closed-principle"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Open-Closed Principle as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Open-Closed Principle Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","SOLID Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: ShippingCostCalculator

**Problem:** A `ShippingCostCalculator` uses `if-else` to determine the shipping cost based on the shipping type (Standard, Express, Overnight, International). Every time a new shipping type is added, someone has to modify the calculator. Refactor this so that new shipping types can be added without modifying the calculator.

**Requirements:**

- Define a `ShippingStrategy` interface with a `calculateCost(weight)` method
- Create concrete implementations: `StandardShipping`, `ExpressShipping`, `OvernightShipping`, `InternationalShipping`
- Refactor `ShippingCostCalculator` to accept a `ShippingStrategy` instead of a string
- The calculator should delegate cost computation to the strategy

```java
class ShippingCostCalculator {
    public double calculate(String shippingType, double weight) {
        if ("Standard".equals(shippingType)) {
            return weight * 1.5;
        } else if ("Express".equals(shippingType)) {
            return weight * 3.0;
        } else if ("Overnight".equals(shippingType)) {
            return weight * 5.0;
        } else if ("International".equals(shippingType)) {
            return weight * 10.0;
        }
        throw new IllegalArgumentException("Unknown shipping type: " + shippingType);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        ShippingCostCalculator calculator = new ShippingCostCalculator();
        System.out.println("Standard: $" + calculator.calculate("Standard", 2.0));
        System.out.println("Express: $" + calculator.calculate("Express", 2.0));
    }
}

// TODO: Define a ShippingStrategy interface with a calculateCost(weight) method.
// TODO: Create concrete implementations for each shipping type.
// TODO: Refactor ShippingCostCalculator to accept a ShippingStrategy.
```

```python
class ShippingCostCalculator:
    def calculate(self, shipping_type: str, weight: float) -> float:
        if shipping_type == "Standard":
            return weight * 1.5
        elif shipping_type == "Express":
            return weight * 3.0
        elif shipping_type == "Overnight":
            return weight * 5.0
        elif shipping_type == "International":
            return weight * 10.0
        raise ValueError(f"Unknown shipping type: {shipping_type}")

# Usage
calculator = ShippingCostCalculator()
print(f"Standard: ${calculator.calculate('Standard', 2.0)}")
print(f"Express: ${calculator.calculate('Express', 2.0)}")

# TODO: Define a ShippingStrategy interface (ABC) with a calculate_cost(weight) method.
# TODO: Create concrete implementations for each shipping type.
# TODO: Refactor ShippingCostCalculator to accept a ShippingStrategy.
```

```cpp
#include <iostream>
#include <string>
#include <stdexcept>

using namespace std;

class ShippingCostCalculator {
public:
    double calculate(const string& shippingType, double weight) {
        if (shippingType == "Standard") {
            return weight * 1.5;
        } else if (shippingType == "Express") {
            return weight * 3.0;
        } else if (shippingType == "Overnight") {
            return weight * 5.0;
        } else if (shippingType == "International") {
            return weight * 10.0;
        }
        throw invalid_argument("Unknown shipping type: " + shippingType);
    }
};

int main() {
    ShippingCostCalculator calculator;
    cout << "Standard: $" << calculator.calculate("Standard", 2.0) << endl;
    cout << "Express: $" << calculator.calculate("Express", 2.0) << endl;
    return 0;
}

// TODO: Define a ShippingStrategy interface with a calculateCost(weight) method.
// TODO: Create concrete implementations for each shipping type.
// TODO: Refactor ShippingCostCalculator to accept a ShippingStrategy.
```

```go
package main

import "fmt"

type ShippingCostCalculator struct {
}

func (s *ShippingCostCalculator) Calculate(shippingType string, weight float64) float64 {
	// TODO: implement
	return 0
}

// Usage
func main() {
	calculator := &ShippingCostCalculator{}
	fmt.Printf("Standard: $%v\n", calculator.Calculate("Standard", 2.0))
	fmt.Printf("Express: $%v\n", calculator.Calculate("Express", 2.0))
}

// TODO: Define a ShippingStrategy interface with a CalculateCost(weight) method.
// TODO: Create concrete implementations for each shipping type.
// TODO: Refactor ShippingCostCalculator to accept a ShippingStrategy.
```

```csharp
using System;

class ShippingCostCalculator
{
    public double Calculate(string shippingType, double weight)
    {
        if (shippingType == "Standard")
            return weight * 1.5;
        else if (shippingType == "Express")
            return weight * 3.0;
        else if (shippingType == "Overnight")
            return weight * 5.0;
        else if (shippingType == "International")
            return weight * 10.0;
        throw new ArgumentException($"Unknown shipping type: {shippingType}");
    }
}

// Usage
class Program
{
    static void Main()
    {
        var calculator = new ShippingCostCalculator();
        Console.WriteLine($"Standard: ${calculator.Calculate("Standard", 2.0)}");
        Console.WriteLine($"Express: ${calculator.Calculate("Express", 2.0)}");
    }
}

// TODO: Define an IShippingStrategy interface with a CalculateCost(weight) method.
// TODO: Create concrete implementations for each shipping type.
// TODO: Refactor ShippingCostCalculator to accept an IShippingStrategy.
```

```typescript
class ShippingCostCalculator {
    calculate(shippingType: string, weight: number): number {
        if (shippingType === "Standard") {
            return weight * 1.5;
        } else if (shippingType === "Express") {
            return weight * 3.0;
        } else if (shippingType === "Overnight") {
            return weight * 5.0;
        } else if (shippingType === "International") {
            return weight * 10.0;
        }
        throw new Error(`Unknown shipping type: ${shippingType}`);
    }
}

// Usage
const calculator = new ShippingCostCalculator();
console.log(`Standard: $${calculator.calculate("Standard", 2.0)}`);
console.log(`Express: $${calculator.calculate("Express", 2.0)}`);

// TODO: Define a ShippingStrategy interface with a calculateCost(weight) method.
// TODO: Create concrete implementations for each shipping type.
// TODO: Refactor ShippingCostCalculator to accept a ShippingStrategy.
```

#### Solutions

```java
// ShippingStrategy interface
interface ShippingStrategy {
    double calculateCost(double weight);
}

// Concrete strategies
class StandardShipping implements ShippingStrategy {
    @Override
    public double calculateCost(double weight) {
        return weight * 1.5;
    }
}

class ExpressShipping implements ShippingStrategy {
    @Override
    public double calculateCost(double weight) {
        return weight * 3.0;
    }
}

class OvernightShipping implements ShippingStrategy {
    @Override
    public double calculateCost(double weight) {
        return weight * 5.0;
    }
}

class InternationalShipping implements ShippingStrategy {
    @Override
    public double calculateCost(double weight) {
        return weight * 10.0;
    }
}

// Refactored calculator - no if-else
class ShippingCostCalculator {
    private final ShippingStrategy strategy;

    public ShippingCostCalculator(ShippingStrategy strategy) {
        this.strategy = strategy;
    }

    public double calculate(double weight) {
        return strategy.calculateCost(weight);
    }
}

// Main
public class Main {
    public static void main(String[] args) {
        double weight = 2.0;

        ShippingCostCalculator standard = new ShippingCostCalculator(new StandardShipping());
        ShippingCostCalculator express = new ShippingCostCalculator(new ExpressShipping());
        ShippingCostCalculator overnight = new ShippingCostCalculator(new OvernightShipping());
        ShippingCostCalculator international = new ShippingCostCalculator(new InternationalShipping());

        System.out.println("Standard: $" + standard.calculate(weight));
        System.out.println("Express: $" + express.calculate(weight));
        System.out.println("Overnight: $" + overnight.calculate(weight));
        System.out.println("International: $" + international.calculate(weight));
    }
}
```

```python
from abc import ABC, abstractmethod

# ShippingStrategy interface
class ShippingStrategy(ABC):
    @abstractmethod
    def calculate_cost(self, weight: float) -> float:
        pass

# Concrete strategies
class StandardShipping(ShippingStrategy):
    def calculate_cost(self, weight: float) -> float:
        return weight * 1.5

class ExpressShipping(ShippingStrategy):
    def calculate_cost(self, weight: float) -> float:
        return weight * 3.0

class OvernightShipping(ShippingStrategy):
    def calculate_cost(self, weight: float) -> float:
        return weight * 5.0

class InternationalShipping(ShippingStrategy):
    def calculate_cost(self, weight: float) -> float:
        return weight * 10.0

# Refactored calculator - no if-else
class ShippingCostCalculator:
    def __init__(self, strategy: ShippingStrategy):
        self.strategy = strategy

    def calculate(self, weight: float) -> float:
        return self.strategy.calculate_cost(weight)

# Main
if __name__ == "__main__":
    weight = 2.0

    standard = ShippingCostCalculator(StandardShipping())
    express = ShippingCostCalculator(ExpressShipping())
    overnight = ShippingCostCalculator(OvernightShipping())
    international = ShippingCostCalculator(InternationalShipping())

    print(f"Standard: ${standard.calculate(weight)}")
    print(f"Express: ${express.calculate(weight)}")
    print(f"Overnight: ${overnight.calculate(weight)}")
    print(f"International: ${international.calculate(weight)}")
```

```cpp
#include <iostream>
#include <iomanip>
#include <memory>
using namespace std;

// ShippingStrategy interface
class ShippingStrategy {
public:
    virtual ~ShippingStrategy() = default;
    virtual double calculateCost(double weight) const = 0;
};

// Concrete strategies
class StandardShipping : public ShippingStrategy {
public:
    double calculateCost(double weight) const override {
        return weight * 1.5;
    }
};

class ExpressShipping : public ShippingStrategy {
public:
    double calculateCost(double weight) const override {
        return weight * 3.0;
    }
};

class OvernightShipping : public ShippingStrategy {
public:
    double calculateCost(double weight) const override {
        return weight * 5.0;
    }
};

class InternationalShipping : public ShippingStrategy {
public:
    double calculateCost(double weight) const override {
        return weight * 10.0;
    }
};

// Refactored calculator - no if-else
class ShippingCostCalculator {
private:
    unique_ptr<ShippingStrategy> strategy;
public:
    ShippingCostCalculator(unique_ptr<ShippingStrategy> strategy)
        : strategy(move(strategy)) {}

    double calculate(double weight) const {
        return strategy->calculateCost(weight);
    }
};

int main() {
    double weight = 2.0;

    ShippingCostCalculator standard(make_unique<StandardShipping>());
    ShippingCostCalculator express(make_unique<ExpressShipping>());
    ShippingCostCalculator overnight(make_unique<OvernightShipping>());
    ShippingCostCalculator international(make_unique<InternationalShipping>());

    cout << fixed << setprecision(1);
    cout << "Standard: $" << standard.calculate(weight) << endl;
    cout << "Express: $" << express.calculate(weight) << endl;
    cout << "Overnight: $" << overnight.calculate(weight) << endl;
    cout << "International: $" << international.calculate(weight) << endl;

    return 0;
}
```

```go
package main

import "fmt"

// ShippingStrategy interface
type ShippingStrategy interface {
	CalculateCost(weight float64) float64
}

// Concrete strategies
type StandardShipping struct{}

func (s StandardShipping) CalculateCost(weight float64) float64 {
	return weight * 1.5
}

type ExpressShipping struct{}

func (s ExpressShipping) CalculateCost(weight float64) float64 {
	return weight * 3.0
}

type OvernightShipping struct{}

func (s OvernightShipping) CalculateCost(weight float64) float64 {
	return weight * 5.0
}

type InternationalShipping struct{}

func (s InternationalShipping) CalculateCost(weight float64) float64 {
	return weight * 10.0
}

// Refactored calculator - no if-else
type ShippingCostCalculator struct {
	strategy ShippingStrategy
}

func NewShippingCostCalculator(strategy ShippingStrategy) *ShippingCostCalculator {
	return &ShippingCostCalculator{strategy: strategy}
}

func (c *ShippingCostCalculator) Calculate(weight float64) float64 {
	return c.strategy.CalculateCost(weight)
}

// Main
func main() {
	weight := 2.0

	standard := NewShippingCostCalculator(StandardShipping{})
	express := NewShippingCostCalculator(ExpressShipping{})
	overnight := NewShippingCostCalculator(OvernightShipping{})
	international := NewShippingCostCalculator(InternationalShipping{})

	fmt.Printf("Standard: $%.1f\n", standard.Calculate(weight))
	fmt.Printf("Express: $%.1f\n", express.Calculate(weight))
	fmt.Printf("Overnight: $%.1f\n", overnight.Calculate(weight))
	fmt.Printf("International: $%.1f\n", international.Calculate(weight))
}
```

```csharp
using System;

// ShippingStrategy interface
interface IShippingStrategy
{
    double CalculateCost(double weight);
}

// Concrete strategies
class StandardShipping : IShippingStrategy
{
    public double CalculateCost(double weight) => weight * 1.5;
}

class ExpressShipping : IShippingStrategy
{
    public double CalculateCost(double weight) => weight * 3.0;
}

class OvernightShipping : IShippingStrategy
{
    public double CalculateCost(double weight) => weight * 5.0;
}

class InternationalShipping : IShippingStrategy
{
    public double CalculateCost(double weight) => weight * 10.0;
}

// Refactored calculator - no if-else
class ShippingCostCalculator
{
    private readonly IShippingStrategy _strategy;

    public ShippingCostCalculator(IShippingStrategy strategy)
    {
        _strategy = strategy;
    }

    public double Calculate(double weight)
    {
        return _strategy.CalculateCost(weight);
    }
}

class Program
{
    static void Main()
    {
        double weight = 2.0;

        var standard = new ShippingCostCalculator(new StandardShipping());
        var express = new ShippingCostCalculator(new ExpressShipping());
        var overnight = new ShippingCostCalculator(new OvernightShipping());
        var international = new ShippingCostCalculator(new InternationalShipping());

        Console.WriteLine($"Standard: ${standard.Calculate(weight):F1}");
        Console.WriteLine($"Express: ${express.Calculate(weight):F1}");
        Console.WriteLine($"Overnight: ${overnight.Calculate(weight):F1}");
        Console.WriteLine($"International: ${international.Calculate(weight):F1}");
    }
}
```

```typescript
// ShippingStrategy interface
interface ShippingStrategy {
    calculateCost(weight: number): number;
}

// Concrete strategies
class StandardShipping implements ShippingStrategy {
    calculateCost(weight: number): number {
        return weight * 1.5;
    }
}

class ExpressShipping implements ShippingStrategy {
    calculateCost(weight: number): number {
        return weight * 3.0;
    }
}

class OvernightShipping implements ShippingStrategy {
    calculateCost(weight: number): number {
        return weight * 5.0;
    }
}

class InternationalShipping implements ShippingStrategy {
    calculateCost(weight: number): number {
        return weight * 10.0;
    }
}

// Refactored calculator - no if-else
class ShippingCostCalculator {
    private strategy: ShippingStrategy;

    constructor(strategy: ShippingStrategy) {
        this.strategy = strategy;
    }

    calculate(weight: number): number {
        return this.strategy.calculateCost(weight);
    }
}

// Main
const weight = 2.0;

const standard = new ShippingCostCalculator(new StandardShipping());
const express = new ShippingCostCalculator(new ExpressShipping());
const overnight = new ShippingCostCalculator(new OvernightShipping());
const international = new ShippingCostCalculator(new InternationalShipping());

console.log(`Standard: $${standard.calculate(weight).toFixed(1)}`);
console.log(`Express: $${express.calculate(weight).toFixed(1)}`);
console.log(`Overnight: $${overnight.calculate(weight).toFixed(1)}`);
console.log(`International: $${international.calculate(weight).toFixed(1)}`);
```

---

# Exercise 2: NotificationService

**Problem:** A `NotificationService` has hardcoded notification channels (Email and SMS). Every time the business wants to add a new channel (Push, Slack, WhatsApp), the service must be modified. Refactor it to make it extensible so that new channels can be added without modifying existing code.

**Requirements:**

- Define a `NotificationChannel` interface with a `send(message)` method
- Create concrete implementations: `EmailChannel`, `SMSChannel`, `PushChannel`, `SlackChannel`
- Refactor `NotificationService` to accept one or more `NotificationChannel` instances
- The service should delegate sending to the channel without knowing its type

```java
class NotificationService {
    public void sendNotification(String channel, String message) {
        if ("Email".equals(channel)) {
            System.out.println("Sending EMAIL: " + message);
            // Email-specific logic (SMTP, templates, etc.)
        } else if ("SMS".equals(channel)) {
            System.out.println("Sending SMS: " + message);
            // SMS-specific logic (Twilio, carrier API, etc.)
        } else {
            throw new IllegalArgumentException("Unknown channel: " + channel);
        }
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        NotificationService service = new NotificationService();
        service.sendNotification("Email", "Your order has shipped!");
        service.sendNotification("SMS", "Your order has shipped!");
    }
}

// TODO: Define a NotificationChannel interface with a send(message) method.
// TODO: Create EmailChannel, SMSChannel, PushChannel, and SlackChannel.
// TODO: Refactor NotificationService to accept a NotificationChannel.
```

```python
class NotificationService:
    def send_notification(self, channel: str, message: str) -> None:
        if channel == "Email":
            print(f"Sending EMAIL: {message}")
            # Email-specific logic (SMTP, templates, etc.)
        elif channel == "SMS":
            print(f"Sending SMS: {message}")
            # SMS-specific logic (Twilio, carrier API, etc.)
        else:
            raise ValueError(f"Unknown channel: {channel}")

# Usage
service = NotificationService()
service.send_notification("Email", "Your order has shipped!")
service.send_notification("SMS", "Your order has shipped!")

# TODO: Define a NotificationChannel interface (ABC) with a send(message) method.
# TODO: Create EmailChannel, SMSChannel, PushChannel, and SlackChannel.
# TODO: Refactor NotificationService to accept a NotificationChannel.
```

```cpp
#include <iostream>
#include <string>
#include <stdexcept>

using namespace std;

class NotificationService {
public:
    void sendNotification(const string& channel, const string& message) {
        if (channel == "Email") {
            cout << "Sending EMAIL: " << message << endl;
            // Email-specific logic
        } else if (channel == "SMS") {
            cout << "Sending SMS: " << message << endl;
            // SMS-specific logic
        } else {
            throw invalid_argument("Unknown channel: " + channel);
        }
    }
};

int main() {
    NotificationService service;
    service.sendNotification("Email", "Your order has shipped!");
    service.sendNotification("SMS", "Your order has shipped!");
    return 0;
}

// TODO: Define a NotificationChannel interface with a send(message) method.
// TODO: Create EmailChannel, SMSChannel, PushChannel, and SlackChannel.
// TODO: Refactor NotificationService to accept a NotificationChannel.
```

```go
package main

import "fmt"

type NotificationService struct {
}

func (ns *NotificationService) SendNotification(channel string, message string) {
	if channel == "Email" {
		fmt.Println("Sending EMAIL:", message)
		// Email-specific logic (SMTP, templates, etc.)
	} else if channel == "SMS" {
		fmt.Println("Sending SMS:", message)
		// SMS-specific logic (Twilio, carrier API, etc.)
	} else {
		panic(fmt.Sprintf("Unknown channel: %s", channel))
	}
}

func main() {
	service := &NotificationService{}
	service.SendNotification("Email", "Your order has shipped!")
	service.SendNotification("SMS", "Your order has shipped!")
}

// TODO: Define a NotificationChannel interface with a send(message) method.
// TODO: Create EmailChannel, SMSChannel, PushChannel, and SlackChannel.
// TODO: Refactor NotificationService to accept a NotificationChannel.
```

```csharp
using System;

class NotificationService
{
    public void SendNotification(string channel, string message)
    {
        if (channel == "Email")
        {
            Console.WriteLine($"Sending EMAIL: {message}");
            // Email-specific logic
        }
        else if (channel == "SMS")
        {
            Console.WriteLine($"Sending SMS: {message}");
            // SMS-specific logic
        }
        else
        {
            throw new ArgumentException($"Unknown channel: {channel}");
        }
    }
}

class Program
{
    static void Main()
    {
        var service = new NotificationService();
        service.SendNotification("Email", "Your order has shipped!");
        service.SendNotification("SMS", "Your order has shipped!");
    }
}

// TODO: Define an INotificationChannel interface with a Send(message) method.
// TODO: Create EmailChannel, SMSChannel, PushChannel, and SlackChannel.
// TODO: Refactor NotificationService to accept an INotificationChannel.
```

```typescript
class NotificationService {
    sendNotification(channel: string, message: string): void {
        if (channel === "Email") {
            console.log(`Sending EMAIL: ${message}`);
            // Email-specific logic (SMTP, templates, etc.)
        } else if (channel === "SMS") {
            console.log(`Sending SMS: ${message}`);
            // SMS-specific logic (Twilio, carrier API, etc.)
        } else {
            throw new Error(`Unknown channel: ${channel}`);
        }
    }
}

// Usage
const service = new NotificationService();
service.sendNotification("Email", "Your order has shipped!");
service.sendNotification("SMS", "Your order has shipped!");

// TODO: Define a NotificationChannel interface with a send(message) method.
// TODO: Create EmailChannel, SMSChannel, PushChannel, and SlackChannel.
// TODO: Refactor NotificationService to accept a NotificationChannel.
```

#### Solutions

```java
import java.util.List;

// NotificationChannel interface
interface NotificationChannel {
    void send(String message);
}

// Concrete channels
class EmailChannel implements NotificationChannel {
    @Override
    public void send(String message) {
        System.out.println("Sending EMAIL: " + message);
    }
}

class SMSChannel implements NotificationChannel {
    @Override
    public void send(String message) {
        System.out.println("Sending SMS: " + message);
    }
}

class PushChannel implements NotificationChannel {
    @Override
    public void send(String message) {
        System.out.println("Sending PUSH: " + message);
    }
}

class SlackChannel implements NotificationChannel {
    @Override
    public void send(String message) {
        System.out.println("Sending SLACK: " + message);
    }
}

// Refactored service - no if-else
class NotificationService {
    private final List<NotificationChannel> channels;

    public NotificationService(List<NotificationChannel> channels) {
        this.channels = channels;
    }

    public void sendNotification(String message) {
        for (NotificationChannel channel : channels) {
            channel.send(message);
        }
    }
}

// Main
public class Main {
    public static void main(String[] args) {
        List<NotificationChannel> channels = List.of(
            new EmailChannel(),
            new SMSChannel(),
            new PushChannel(),
            new SlackChannel()
        );

        NotificationService service = new NotificationService(channels);
        service.sendNotification("Your order has shipped!");
    }
}
```

```python
from abc import ABC, abstractmethod

# NotificationChannel interface
class NotificationChannel(ABC):
    @abstractmethod
    def send(self, message: str) -> None:
        pass

# Concrete channels
class EmailChannel(NotificationChannel):
    def send(self, message: str) -> None:
        print(f"Sending EMAIL: {message}")

class SMSChannel(NotificationChannel):
    def send(self, message: str) -> None:
        print(f"Sending SMS: {message}")

class PushChannel(NotificationChannel):
    def send(self, message: str) -> None:
        print(f"Sending PUSH: {message}")

class SlackChannel(NotificationChannel):
    def send(self, message: str) -> None:
        print(f"Sending SLACK: {message}")

# Refactored service - no if-else
class NotificationService:
    def __init__(self, channels: list[NotificationChannel]):
        self.channels = channels

    def send_notification(self, message: str) -> None:
        for channel in self.channels:
            channel.send(message)

# Main
if __name__ == "__main__":
    channels = [
        EmailChannel(),
        SMSChannel(),
        PushChannel(),
        SlackChannel(),
    ]

    service = NotificationService(channels)
    service.send_notification("Your order has shipped!")
```

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <vector>
using namespace std;

// NotificationChannel interface
class NotificationChannel {
public:
    virtual ~NotificationChannel() = default;
    virtual void send(const string& message) const = 0;
};

// Concrete channels
class EmailChannel : public NotificationChannel {
public:
    void send(const string& message) const override {
        cout << "Sending EMAIL: " << message << endl;
    }
};

class SMSChannel : public NotificationChannel {
public:
    void send(const string& message) const override {
        cout << "Sending SMS: " << message << endl;
    }
};

class PushChannel : public NotificationChannel {
public:
    void send(const string& message) const override {
        cout << "Sending PUSH: " << message << endl;
    }
};

class SlackChannel : public NotificationChannel {
public:
    void send(const string& message) const override {
        cout << "Sending SLACK: " << message << endl;
    }
};

// Refactored service - no if-else
class NotificationService {
private:
    vector<unique_ptr<NotificationChannel>> channels;
public:
    NotificationService(vector<unique_ptr<NotificationChannel>> channels)
        : channels(move(channels)) {}

    void sendNotification(const string& message) const {
        for (const auto& channel : channels) {
            channel->send(message);
        }
    }
};

int main() {
    vector<unique_ptr<NotificationChannel>> channels;
    channels.push_back(make_unique<EmailChannel>());
    channels.push_back(make_unique<SMSChannel>());
    channels.push_back(make_unique<PushChannel>());
    channels.push_back(make_unique<SlackChannel>());

    NotificationService service(move(channels));
    service.sendNotification("Your order has shipped!");

    return 0;
}
```

```go
package main

import "fmt"

// NotificationChannel interface
type NotificationChannel interface {
	Send(message string)
}

// Concrete channels
type EmailChannel struct{}

func (e *EmailChannel) Send(message string) {
	fmt.Println("Sending EMAIL: " + message)
}

type SMSChannel struct{}

func (s *SMSChannel) Send(message string) {
	fmt.Println("Sending SMS: " + message)
}

type PushChannel struct{}

func (p *PushChannel) Send(message string) {
	fmt.Println("Sending PUSH: " + message)
}

type SlackChannel struct{}

func (s *SlackChannel) Send(message string) {
	fmt.Println("Sending SLACK: " + message)
}

// Refactored service - no if-else
type NotificationService struct {
	channels []NotificationChannel
}

func NewNotificationService(channels []NotificationChannel) *NotificationService {
	return &NotificationService{channels: channels}
}

func (ns *NotificationService) SendNotification(message string) {
	for _, channel := range ns.channels {
		channel.Send(message)
	}
}

func main() {
	channels := []NotificationChannel{
		&EmailChannel{},
		&SMSChannel{},
		&PushChannel{},
		&SlackChannel{},
	}

	service := NewNotificationService(channels)
	service.SendNotification("Your order has shipped!")
}
```

```csharp
using System;
using System.Collections.Generic;

// NotificationChannel interface
interface INotificationChannel
{
    void Send(string message);
}

// Concrete channels
class EmailChannel : INotificationChannel
{
    public void Send(string message)
    {
        Console.WriteLine($"Sending EMAIL: {message}");
    }
}

class SMSChannel : INotificationChannel
{
    public void Send(string message)
    {
        Console.WriteLine($"Sending SMS: {message}");
    }
}

class PushChannel : INotificationChannel
{
    public void Send(string message)
    {
        Console.WriteLine($"Sending PUSH: {message}");
    }
}

class SlackChannel : INotificationChannel
{
    public void Send(string message)
    {
        Console.WriteLine($"Sending SLACK: {message}");
    }
}

// Refactored service - no if-else
class NotificationService
{
    private readonly List<INotificationChannel> _channels;

    public NotificationService(List<INotificationChannel> channels)
    {
        _channels = channels;
    }

    public void SendNotification(string message)
    {
        foreach (var channel in _channels)
        {
            channel.Send(message);
        }
    }
}

class Program
{
    static void Main()
    {
        var channels = new List<INotificationChannel>
        {
            new EmailChannel(),
            new SMSChannel(),
            new PushChannel(),
            new SlackChannel()
        };

        var service = new NotificationService(channels);
        service.SendNotification("Your order has shipped!");
    }
}
```

```typescript
// NotificationChannel interface
interface NotificationChannel {
    send(message: string): void;
}

// Concrete channels
class EmailChannel implements NotificationChannel {
    send(message: string): void {
        console.log(`Sending EMAIL: ${message}`);
    }
}

class SMSChannel implements NotificationChannel {
    send(message: string): void {
        console.log(`Sending SMS: ${message}`);
    }
}

class PushChannel implements NotificationChannel {
    send(message: string): void {
        console.log(`Sending PUSH: ${message}`);
    }
}

class SlackChannel implements NotificationChannel {
    send(message: string): void {
        console.log(`Sending SLACK: ${message}`);
    }
}

// Refactored service - no if-else
class NotificationService {
    private channels: NotificationChannel[];

    constructor(channels: NotificationChannel[]) {
        this.channels = channels;
    }

    sendNotification(message: string): void {
        for (const channel of this.channels) {
            channel.send(message);
        }
    }
}

// Main
const channels: NotificationChannel[] = [
    new EmailChannel(),
    new SMSChannel(),
    new PushChannel(),
    new SlackChannel(),
];

const service = new NotificationService(channels);
service.sendNotification("Your order has shipped!");
```


