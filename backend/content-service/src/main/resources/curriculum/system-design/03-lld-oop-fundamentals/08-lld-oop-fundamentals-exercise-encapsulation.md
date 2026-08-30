---
id: "lld-oop-fundamentals-exercise-encapsulation"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - OOP Fundamentals"
subSection: ""
title: "Exercise: Encapsulation"
slug: "lld-oop-fundamentals-exercise-encapsulation"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Encapsulation as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Encapsulation Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","OOP Fundamentals","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: TemperatureSensor

**Problem:** Build a `TemperatureSensor` class that collects temperature readings and provides statistical access. The sensor should validate that readings fall within a reasonable range and never expose its internal list of readings directly.

**Requirements:**

- Private list of readings
- `addReading(value)`: adds a temperature reading, but only if it's between -50 and 150 degrees (inclusive). Reject out-of-range values.
- `getAverage()`: returns the average of all readings, or 0 if no readings exist
- `getReadingCount()`: returns how many readings have been recorded
- `getReadings()`: returns a copy of the readings list (not the original)

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class TemperatureSensor {
    private List<Double> readings = new ArrayList<>();

    public void addReading(double value) {
        // Only add if value is between -50 and 150 (inclusive)
    }

    public double getAverage() {
        // Return the average of all readings, or 0.0 if no readings exist
        return 0.0;
    }

    public int getReadingCount() {
        // Return how many readings have been recorded
        return 0;
    }

    public List<Double> getReadings() {
        // Return a defensive copy of the readings list (not the original)
        return new ArrayList<>();
    }
}

// Test your implementation
public class Main {
    public static void main(String[] args) {
        TemperatureSensor sensor = new TemperatureSensor();
        sensor.addReading(22.5);
        sensor.addReading(23.1);
        sensor.addReading(200.0);  // Should be rejected
        sensor.addReading(-10.0);

        System.out.println("Count: " + sensor.getReadingCount());  // 3
        System.out.println("Average: " + sensor.getAverage());     // 11.87
    }
}
```

```python
class TemperatureSensor:
    def __init__(self):
        self._readings: list[float] = []

    def add_reading(self, value: float) -> None:
        # Only add if value is between -50 and 150 (inclusive)
        pass

    def get_average(self) -> float:
        # Return the average of all readings, or 0.0 if no readings exist
        return 0.0

    def get_reading_count(self) -> int:
        # Return how many readings have been recorded
        return 0

    def get_readings(self) -> list[float]:
        # Return a copy of the readings list (not the original)
        return []

if __name__ == "__main__":
    sensor = TemperatureSensor()
    sensor.add_reading(22.5)
    sensor.add_reading(23.1)
    sensor.add_reading(200.0)  # Should be rejected
    sensor.add_reading(-10.0)

    print(f"Count: {sensor.get_reading_count()}")  # 3
    print(f"Average: {sensor.get_average()}")       # 11.87
```

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <cmath>

using namespace std;

class TemperatureSensor {
private:
    vector<double> readings;

public:
    void addReading(double value) {
        // Only add if value is between -50 and 150 (inclusive)
    }

    double getAverage() const {
        // Return the average of all readings, or 0.0 if no readings exist
        return 0.0;
    }

    int getReadingCount() const {
        // Return how many readings have been recorded
        return 0;
    }

    vector<double> getReadings() const {
        // Return a copy of the readings vector (not the original)
        return {};
    }
};

int main() {
    TemperatureSensor sensor;
    sensor.addReading(22.5);
    sensor.addReading(23.1);
    sensor.addReading(200.0);  // Should be rejected
    sensor.addReading(-10.0);

    cout << "Count: " << sensor.getReadingCount() << endl;  // 3
    cout << "Average: " << sensor.getAverage() << endl;     // 11.87
    return 0;
}
```

```go
package main

type TemperatureSensor struct {
	readings []float64
}

func NewTemperatureSensor() *TemperatureSensor {
	return &TemperatureSensor{
		readings: []float64{},
	}
}

func (t *TemperatureSensor) AddReading(value float64) {
	// Only add if value is between -50 and 150 (inclusive)
}

func (t *TemperatureSensor) GetAverage() float64 {
	// Return the average of all readings, or 0.0 if no readings exist
	return 0.0
}

func (t *TemperatureSensor) GetReadingCount() int {
	// Return how many readings have been recorded
	return 0
}

func (t *TemperatureSensor) GetReadings() []float64 {
	// Return a defensive copy of the readings slice (not the original)
	return []float64{}
}

func main() {
	sensor := NewTemperatureSensor()
	sensor.AddReading(22.5)
	sensor.AddReading(23.1)
	sensor.AddReading(200.0) // Should be rejected
	sensor.AddReading(-10.0)

	println("Count:", sensor.GetReadingCount())   // 3
	println("Average:", sensor.GetAverage())      // 11.87
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class TemperatureSensor
{
    private List<double> _readings = new List<double>();

    public void AddReading(double value)
    {
        // Only add if value is between -50 and 150 (inclusive)
    }

    public double GetAverage()
    {
        // Return the average of all readings, or 0.0 if no readings exist
        return 0.0;
    }

    public int GetReadingCount()
    {
        // Return how many readings have been recorded
        return 0;
    }

    public List<double> GetReadings()
    {
        // Return a defensive copy of the readings list (not the original)
        return new List<double>();
    }
}

public class Program
{
    public static void Main()
    {
        var sensor = new TemperatureSensor();
        sensor.AddReading(22.5);
        sensor.AddReading(23.1);
        sensor.AddReading(200.0);  // Should be rejected
        sensor.AddReading(-10.0);

        Console.WriteLine($"Count: {sensor.GetReadingCount()}");  // 3
        Console.WriteLine($"Average: {sensor.GetAverage()}");     // 11.87
    }
}
```

```typescript
class TemperatureSensor {
    private readings: number[] = [];

    addReading(value: number): void {
        // Only add if value is between -50 and 150 (inclusive)
    }

    getAverage(): number {
        // Return the average of all readings, or 0 if no readings exist
        return 0;
    }

    getReadingCount(): number {
        // Return how many readings have been recorded
        return 0;
    }

    getReadings(): number[] {
        // Return a copy of the readings array (not the original)
        return [];
    }
}

// Test your implementation
const sensor = new TemperatureSensor();
sensor.addReading(22.5);
sensor.addReading(23.1);
sensor.addReading(200.0);  // Should be rejected
sensor.addReading(-10.0);

console.log(`Count: ${sensor.getReadingCount()}`);  // 3
console.log(`Average: ${sensor.getAverage()}`);     // 11.87
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class TemperatureSensor {
    private List<Double> readings = new ArrayList<>();

    public void addReading(double value) {
        if (value >= -50 && value <= 150) {
            readings.add(value);
        }
    }

    public double getAverage() {
        if (readings.isEmpty()) {
            return 0.0;
        }
        double sum = 0;
        for (double r : readings) {
            sum += r;
        }
        return Math.round(sum / readings.size() * 100.0) / 100.0;
    }

    public int getReadingCount() {
        return readings.size();
    }

    public List<Double> getReadings() {
        return new ArrayList<>(readings);
    }
}

public class Main {
    public static void main(String[] args) {
        TemperatureSensor sensor = new TemperatureSensor();
        sensor.addReading(22.5);
        sensor.addReading(23.1);
        sensor.addReading(200.0);  // Should be rejected
        sensor.addReading(-10.0);

        System.out.println("Count: " + sensor.getReadingCount());  // 3
        System.out.println("Average: " + sensor.getAverage());     // 11.87
    }
}
```

```python
class TemperatureSensor:
    def __init__(self):
        self._readings: list[float] = []

    def add_reading(self, value: float) -> None:
        if -50 <= value <= 150:
            self._readings.append(value)

    def get_average(self) -> float:
        if not self._readings:
            return 0.0
        return round(sum(self._readings) / len(self._readings), 2)

    def get_reading_count(self) -> int:
        return len(self._readings)

    def get_readings(self) -> list[float]:
        return list(self._readings)

if __name__ == "__main__":
    sensor = TemperatureSensor()
    sensor.add_reading(22.5)
    sensor.add_reading(23.1)
    sensor.add_reading(200.0)  # Should be rejected
    sensor.add_reading(-10.0)

    print(f"Count: {sensor.get_reading_count()}")  # 3
    print(f"Average: {sensor.get_average()}")       # 11.87
```

```cpp
#include <iostream>
#include <vector>
#include <numeric>
#include <cmath>

using namespace std;

class TemperatureSensor {
private:
    vector<double> readings;

public:
    void addReading(double value) {
        if (value >= -50 && value <= 150) {
            readings.push_back(value);
        }
    }

    double getAverage() const {
        if (readings.empty()) {
            return 0.0;
        }
        double sum = accumulate(readings.begin(), readings.end(), 0.0);
        return round(sum / readings.size() * 100.0) / 100.0;
    }

    int getReadingCount() const {
        return readings.size();
    }

    vector<double> getReadings() const {
        return readings;
    }
};

int main() {
    TemperatureSensor sensor;
    sensor.addReading(22.5);
    sensor.addReading(23.1);
    sensor.addReading(200.0);  // Should be rejected
    sensor.addReading(-10.0);

    cout << "Count: " << sensor.getReadingCount() << endl;  // 3
    cout << "Average: " << sensor.getAverage() << endl;     // 11.87
    return 0;
}
```

```go
package main

import (
	"fmt"
	"math"
)

type TemperatureSensor struct {
	readings []float64
}

func NewTemperatureSensor() *TemperatureSensor {
	return &TemperatureSensor{
		readings: make([]float64, 0),
	}
}

func (t *TemperatureSensor) AddReading(value float64) {
	if value >= -50 && value <= 150 {
		t.readings = append(t.readings, value)
	}
}

func (t *TemperatureSensor) GetAverage() float64 {
	if len(t.readings) == 0 {
		return 0.0
	}
	sum := 0.0
	for _, r := range t.readings {
		sum += r
	}
	return math.Round((sum/float64(len(t.readings)))*100.0) / 100.0
}

func (t *TemperatureSensor) GetReadingCount() int {
	return len(t.readings)
}

func (t *TemperatureSensor) GetReadings() []float64 {
	res := make([]float64, len(t.readings))
	copy(res, t.readings)
	return res
}

func main() {
	sensor := NewTemperatureSensor()
	sensor.AddReading(22.5)
	sensor.AddReading(23.1)
	sensor.AddReading(200.0) // Should be rejected
	sensor.AddReading(-10.0)

	fmt.Printf("Count: %d\n", sensor.GetReadingCount())   // 3
	fmt.Printf("Average: %.2f\n", sensor.GetAverage())    // 11.87
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class TemperatureSensor
{
    private List<double> _readings = new List<double>();

    public void AddReading(double value)
    {
        if (value >= -50 && value <= 150)
        {
            _readings.Add(value);
        }
    }

    public double GetAverage()
    {
        if (_readings.Count == 0)
            return 0.0;
        return Math.Round(_readings.Average(), 2);
    }

    public int GetReadingCount()
    {
        return _readings.Count;
    }

    public List<double> GetReadings()
    {
        return new List<double>(_readings);
    }
}

public class Program
{
    public static void Main()
    {
        var sensor = new TemperatureSensor();
        sensor.AddReading(22.5);
        sensor.AddReading(23.1);
        sensor.AddReading(200.0);  // Should be rejected
        sensor.AddReading(-10.0);

        Console.WriteLine($"Count: {sensor.GetReadingCount()}");  // 3
        Console.WriteLine($"Average: {sensor.GetAverage()}");     // 11.87
    }
}
```

```typescript
class TemperatureSensor {
    private readings: number[] = [];

    addReading(value: number): void {
        if (value >= -50 && value <= 150) {
            this.readings.push(value);
        }
    }

    getAverage(): number {
        if (this.readings.length === 0) {
            return 0;
        }
        const sum = this.readings.reduce((a, b) => a + b, 0);
        return Math.round((sum / this.readings.length) * 100) / 100;
    }

    getReadingCount(): number {
        return this.readings.length;
    }

    getReadings(): number[] {
        return [...this.readings];
    }
}

const sensor = new TemperatureSensor();
sensor.addReading(22.5);
sensor.addReading(23.1);
sensor.addReading(200.0);  // Should be rejected
sensor.addReading(-10.0);

console.log(`Count: ${sensor.getReadingCount()}`);  // 3
console.log(`Average: ${sensor.getAverage()}`);     // 11.87
```

---

# Exercise 2: ShoppingCart

**Problem:** Build a `ShoppingCart` class that manages items, supports a one-time discount code, and prevents modifications after checkout.

**Requirements:**

- Private map/dictionary of items (item name to price)
- Private discount code (can only be applied once)
- Private `isCheckedOut` flag
- `addItem(name, price)`: adds an item, but only if the cart hasn't been checked out
- `applyDiscount(code)`: if the code is "SAVE10" and no discount has been applied yet, marks the discount as applied and stores it. Returns success/failure.
- `getTotal()`: returns the sum of all prices, minus 10% if a discount was applied
- `checkout()`: marks the cart as checked out if it has at least one item. After checkout, no items can be added and no discounts can be applied.

```java
import java.util.HashMap;
import java.util.Map;

class ShoppingCart {
    private Map<String, Double> items = new HashMap<>();
    private boolean discountApplied = false;
    private boolean isCheckedOut = false;

    public void addItem(String name, double price) {
        // Add item to cart, but reject if already checked out
    }

    public boolean applyDiscount(String code) {
        // If code is "SAVE10" and no discount applied yet and not checked out,
        // mark discount as applied and return true. Otherwise return false.
        return false;
    }

    public double getTotal() {
        // Sum all item prices. If discount was applied, subtract 10%.
        return 0.0;
    }

    public void checkout() {
        // Mark cart as checked out (only if it has items and isn't already checked out)
    }
}

// Test your implementation
public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem("Laptop", 999.99);
        cart.addItem("Mouse", 29.99);

        System.out.println("Total: $" + cart.getTotal());            // 1029.98

        System.out.println("Discount: " + cart.applyDiscount("SAVE10")); // true
        System.out.println("Total: $" + cart.getTotal());            // 926.98

        System.out.println("Discount: " + cart.applyDiscount("SAVE10")); // false (already applied)

        cart.checkout();
        cart.addItem("Keyboard", 79.99);  // Should be rejected
        System.out.println("Total: $" + cart.getTotal());            // 926.98 (unchanged)
    }
}
```

```python
class ShoppingCart:
    def __init__(self):
        self._items: dict[str, float] = {}
        self._discount_applied = False
        self._is_checked_out = False

    def add_item(self, name: str, price: float) -> None:
        # Add item to cart, but reject if already checked out
        pass

    def apply_discount(self, code: str) -> bool:
        # If code is "SAVE10" and no discount applied yet and not checked out,
        # mark discount as applied and return True. Otherwise return False.
        return False

    def get_total(self) -> float:
        # Sum all item prices. If discount was applied, subtract 10%.
        return 0.0

    def checkout(self) -> None:
        # Mark cart as checked out (only if it has items and isn't already checked out)
        pass

if __name__ == "__main__":
    cart = ShoppingCart()
    cart.add_item("Laptop", 999.99)
    cart.add_item("Mouse", 29.99)

    print(f"Total: ${cart.get_total():.2f}")                     # 1029.98

    print(f"Discount: {str(cart.apply_discount('SAVE10')).lower()}")          # true
    print(f"Total: ${cart.get_total():.2f}")                     # 926.98

    print(f"Discount: {str(cart.apply_discount('SAVE10')).lower()}")          # false

    cart.checkout()
    cart.add_item("Keyboard", 79.99)  # Should be rejected
    print(f"Total: ${cart.get_total():.2f}")                     # 926.98
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <cmath>

using namespace std;

class ShoppingCart {
private:
    map<string, double> items;
    bool discountApplied = false;
    bool isCheckedOut = false;

public:
    void addItem(const string& name, double price) {
        // Add item to cart, but reject if already checked out
    }

    bool applyDiscount(const string& code) {
        // If code is "SAVE10" and no discount applied yet and not checked out,
        // mark discount as applied and return true. Otherwise return false.
        return false;
    }

    double getTotal() const {
        // Sum all item prices. If discount was applied, subtract 10%.
        return 0.0;
    }

    void checkout() {
        // Mark cart as checked out (only if it has items and isn't already checked out)
    }
};

int main() {
    ShoppingCart cart;
    cart.addItem("Laptop", 999.99);
    cart.addItem("Mouse", 29.99);

    cout << "Total: $" << cart.getTotal() << endl;                    // 1029.98

    cout << "Discount: " << boolalpha << cart.applyDiscount("SAVE10") << endl; // true
    cout << "Total: $" << cart.getTotal() << endl;                    // 926.98

    cout << "Discount: " << cart.applyDiscount("SAVE10") << endl;     // false

    cart.checkout();
    cart.addItem("Keyboard", 79.99); // Should be rejected
    cout << "Total: $" << cart.getTotal() << endl;                    // 926.98

    return 0;
}
```

```go
package main

type ShoppingCart struct {
	items           map[string]float64
	discountApplied bool
	isCheckedOut    bool
}

func NewShoppingCart() *ShoppingCart {
	return &ShoppingCart{
		items: make(map[string]float64),
	}
}

func (s *ShoppingCart) AddItem(name string, price float64) {
	// Add item to cart, but reject if already checked out
}

func (s *ShoppingCart) ApplyDiscount(code string) bool {
	// If code is "SAVE10" and no discount applied yet and not checked out,
	// mark discount as applied and return true. Otherwise return false.
	return false
}

func (s *ShoppingCart) GetTotal() float64 {
	// Sum all item prices. If discount was applied, subtract 10%.
	return 0.0
}

func (s *ShoppingCart) Checkout() {
	// Mark cart as checked out (only if it has items and isn't already checked out)
}

func main() {
	cart := NewShoppingCart()
	cart.AddItem("Laptop", 999.99)
	cart.AddItem("Mouse", 29.99)

	_ = cart.GetTotal()
	_ = cart.ApplyDiscount("SAVE10")
	_ = cart.GetTotal()
	_ = cart.ApplyDiscount("SAVE10")

	cart.Checkout()
	cart.AddItem("Keyboard", 79.99)
	_ = cart.GetTotal()
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class ShoppingCart
{
    private Dictionary<string, double> _items = new Dictionary<string, double>();
    private bool _discountApplied = false;
    private bool _isCheckedOut = false;

    public void AddItem(string name, double price)
    {
        // Add item to cart, but reject if already checked out
    }

    public bool ApplyDiscount(string code)
    {
        // If code is "SAVE10" and no discount applied yet and not checked out,
        // mark discount as applied and return true. Otherwise return false.
        return false;
    }

    public double GetTotal()
    {
        // Sum all item prices. If discount was applied, subtract 10%.
        return 0.0;
    }

    public void Checkout()
    {
        // Mark cart as checked out (only if it has items and isn't already checked out)
    }
}

public class Program
{
    public static void Main()
    {
        var cart = new ShoppingCart();
        cart.AddItem("Laptop", 999.99);
        cart.AddItem("Mouse", 29.99);

        Console.WriteLine($"Total: ${cart.GetTotal():F2}");                     // 1029.98

        Console.WriteLine($"Discount: {cart.ApplyDiscount("SAVE10").ToString().ToLower()}");         // true
        Console.WriteLine($"Total: ${cart.GetTotal():F2}");                     // 926.98

        Console.WriteLine($"Discount: {cart.ApplyDiscount("SAVE10").ToString().ToLower()}");         // false

        cart.Checkout();
        cart.AddItem("Keyboard", 79.99); // Should be rejected
        Console.WriteLine($"Total: ${cart.GetTotal():F2}");                     // 926.98
    }
}
```

```typescript
class ShoppingCart {
    private items: Map<string, number> = new Map();
    private discountApplied: boolean = false;
    private isCheckedOut: boolean = false;

    addItem(name: string, price: number): void {
        // Add item to cart, but reject if already checked out
    }

    applyDiscount(code: string): boolean {
        // If code is "SAVE10" and no discount applied yet and not checked out,
        // mark discount as applied and return true. Otherwise return false.
        return false;
    }

    getTotal(): number {
        // Sum all item prices. If discount was applied, subtract 10%.
        return 0;
    }

    checkout(): void {
        // Mark cart as checked out (only if it has items and isn't already checked out)
    }
}

// Test your implementation
const cart = new ShoppingCart();
cart.addItem("Laptop", 999.99);
cart.addItem("Mouse", 29.99);

console.log(`Total: $${cart.getTotal().toFixed(2)}`);                    // 1029.98

console.log(`Discount: ${cart.applyDiscount("SAVE10")}`);                // true
console.log(`Total: $${cart.getTotal().toFixed(2)}`);                    // 926.98

console.log(`Discount: ${cart.applyDiscount("SAVE10")}`);                // false

cart.checkout();
cart.addItem("Keyboard", 79.99); // Should be rejected
console.log(`Total: $${cart.getTotal().toFixed(2)}`);                    // 926.98
```

#### Solutions

```java
import java.util.HashMap;
import java.util.Map;

class ShoppingCart {
    private Map<String, Double> items = new HashMap<>();
    private boolean discountApplied = false;
    private boolean isCheckedOut = false;

    public void addItem(String name, double price) {
        if (isCheckedOut) {
            System.out.println("Cannot modify a checked-out cart");
            return;
        }
        items.put(name, price);
    }

    public boolean applyDiscount(String code) {
        if (code.equals("SAVE10") && !discountApplied && !isCheckedOut) {
            discountApplied = true;
            return true;
        }
        return false;
    }

    public double getTotal() {
        double total = 0;
        for (double price : items.values()) {
            total += price;
        }
        if (discountApplied) {
            total *= 0.9;
        }
        return Math.round(total * 100.0) / 100.0;
    }

    public void checkout() {
        if (!items.isEmpty() && !isCheckedOut) {
            isCheckedOut = true;
        }
    }
}

public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem("Laptop", 999.99);
        cart.addItem("Mouse", 29.99);

        System.out.println("Total: $" + cart.getTotal());            // 1029.98

        System.out.println("Discount: " + cart.applyDiscount("SAVE10")); // true
        System.out.println("Total: $" + cart.getTotal());            // 926.98

        System.out.println("Discount: " + cart.applyDiscount("SAVE10")); // false

        cart.checkout();
        cart.addItem("Keyboard", 79.99);  // Should be rejected
        System.out.println("Total: $" + cart.getTotal());            // 926.98
    }
}
```

```python
class ShoppingCart:
    def __init__(self):
        self._items: dict[str, float] = {}
        self._discount_applied = False
        self._is_checked_out = False

    def add_item(self, name: str, price: float) -> None:
        if self._is_checked_out:
            print("Cannot modify a checked-out cart")
            return
        self._items[name] = price

    def apply_discount(self, code: str) -> bool:
        if code == "SAVE10" and not self._discount_applied and not self._is_checked_out:
            self._discount_applied = True
            return True
        return False

    def get_total(self) -> float:
        total = sum(self._items.values())
        if self._discount_applied:
            total *= 0.9
        return round(total, 2)

    def checkout(self) -> None:
        if self._items and not self._is_checked_out:
            self._is_checked_out = True

if __name__ == "__main__":
    cart = ShoppingCart()
    cart.add_item("Laptop", 999.99)
    cart.add_item("Mouse", 29.99)

    print(f"Total: ${cart.get_total():.2f}")                     # 1029.98

    print(f"Discount: {str(cart.apply_discount('SAVE10')).lower()}")          # true
    print(f"Total: ${cart.get_total():.2f}")                     # 926.98

    print(f"Discount: {str(cart.apply_discount('SAVE10')).lower()}")          # false

    cart.checkout()
    cart.add_item("Keyboard", 79.99)  # Should be rejected
    print(f"Total: ${cart.get_total():.2f}")                     # 926.98
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <cmath>

using namespace std;

class ShoppingCart {
private:
    map<string, double> items;
    bool discountApplied = false;
    bool isCheckedOut = false;

public:
    void addItem(const string& name, double price) {
        if (isCheckedOut) {
            cout << "Cannot modify a checked-out cart" << endl;
            return;
        }
        items[name] = price;
    }

    bool applyDiscount(const string& code) {
        if (code == "SAVE10" && !discountApplied && !isCheckedOut) {
            discountApplied = true;
            return true;
        }
        return false;
    }

    double getTotal() const {
        double total = 0;
        for (const auto& pair : items) {
            total += pair.second;
        }
        if (discountApplied) {
            total *= 0.9;
        }
        return round(total * 100.0) / 100.0;
    }

    void checkout() {
        if (!items.empty() && !isCheckedOut) {
            isCheckedOut = true;
        }
    }
};

int main() {
    ShoppingCart cart;
    cart.addItem("Laptop", 999.99);
    cart.addItem("Mouse", 29.99);

    cout << "Total: $" << cart.getTotal() << endl;                    // 1029.98

    cout << "Discount: " << boolalpha << cart.applyDiscount("SAVE10") << endl; // true
    cout << "Total: $" << cart.getTotal() << endl;                    // 926.98

    cout << "Discount: " << cart.applyDiscount("SAVE10") << endl;     // false

    cart.checkout();
    cart.addItem("Keyboard", 79.99); // Should be rejected
    cout << "Total: $" << cart.getTotal() << endl;                    // 926.98

    return 0;
}
```

```go
package main

import (
	"fmt"
	"math"
)

type ShoppingCart struct {
	items           map[string]float64
	discountApplied bool
	isCheckedOut    bool
}

func NewShoppingCart() *ShoppingCart {
	return &ShoppingCart{
		items: make(map[string]float64),
	}
}

func (c *ShoppingCart) AddItem(name string, price float64) {
	if c.isCheckedOut {
		fmt.Println("Cannot modify a checked-out cart")
		return
	}
	c.items[name] = price
}

func (c *ShoppingCart) ApplyDiscount(code string) bool {
	if code == "SAVE10" && !c.discountApplied && !c.isCheckedOut {
		c.discountApplied = true
		return true
	}
	return false
}

func (c *ShoppingCart) GetTotal() float64 {
	total := 0.0
	for _, price := range c.items {
		total += price
	}
	if c.discountApplied {
		total *= 0.9
	}
	return math.Round(total*100.0) / 100.0
}

func (c *ShoppingCart) Checkout() {
	if len(c.items) > 0 && !c.isCheckedOut {
		c.isCheckedOut = true
	}
}

func main() {
	cart := NewShoppingCart()
	cart.AddItem("Laptop", 999.99)
	cart.AddItem("Mouse", 29.99)

	fmt.Printf("Total: $%.2f\n", cart.GetTotal()) // 1029.98

	fmt.Printf("Discount: %t\n", cart.ApplyDiscount("SAVE10")) // true
	fmt.Printf("Total: $%.2f\n", cart.GetTotal())              // 926.98

	fmt.Printf("Discount: %t\n", cart.ApplyDiscount("SAVE10")) // false

	cart.Checkout()
	cart.AddItem("Keyboard", 79.99) // Should be rejected
	fmt.Printf("Total: $%.2f\n", cart.GetTotal())              // 926.98
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public class ShoppingCart
{
    private Dictionary<string, double> _items = new Dictionary<string, double>();
    private bool _discountApplied = false;
    private bool _isCheckedOut = false;

    public void AddItem(string name, double price)
    {
        if (_isCheckedOut)
        {
            Console.WriteLine("Cannot modify a checked-out cart");
            return;
        }
        _items[name] = price;
    }

    public bool ApplyDiscount(string code)
    {
        if (code == "SAVE10" && !_discountApplied && !_isCheckedOut)
        {
            _discountApplied = true;
            return true;
        }
        return false;
    }

    public double GetTotal()
    {
        double total = _items.Values.Sum();
        if (_discountApplied)
        {
            total *= 0.9;
        }
        return Math.Round(total, 2);
    }

    public void Checkout()
    {
        if (_items.Count > 0 && !_isCheckedOut)
        {
            _isCheckedOut = true;
        }
    }
}

public class Program
{
    public static void Main()
    {
        var cart = new ShoppingCart();
        cart.AddItem("Laptop", 999.99);
        cart.AddItem("Mouse", 29.99);

        Console.WriteLine($"Total: ${cart.GetTotal():F2}");                     // 1029.98

        Console.WriteLine($"Discount: {cart.ApplyDiscount("SAVE10").ToString().ToLower()}");         // true
        Console.WriteLine($"Total: ${cart.GetTotal():F2}");                     // 926.98

        Console.WriteLine($"Discount: {cart.ApplyDiscount("SAVE10").ToString().ToLower()}");         // false

        cart.Checkout();
        cart.AddItem("Keyboard", 79.99); // Should be rejected
        Console.WriteLine($"Total: ${cart.GetTotal():F2}");                     // 926.98
    }
}
```

```typescript
class ShoppingCart {
    private items: Map<string, number> = new Map();
    private discountApplied: boolean = false;
    private isCheckedOut: boolean = false;

    addItem(name: string, price: number): void {
        if (this.isCheckedOut) {
            console.log("Cannot modify a checked-out cart");
            return;
        }
        this.items.set(name, price);
    }

    applyDiscount(code: string): boolean {
        if (code === "SAVE10" && !this.discountApplied && !this.isCheckedOut) {
            this.discountApplied = true;
            return true;
        }
        return false;
    }

    getTotal(): number {
        let total = 0;
        this.items.forEach((price) => {
            total += price;
        });
        if (this.discountApplied) {
            total *= 0.9;
        }
        return Math.round(total * 100) / 100;
    }

    checkout(): void {
        if (this.items.size > 0 && !this.isCheckedOut) {
            this.isCheckedOut = true;
        }
    }
}

const cart = new ShoppingCart();
cart.addItem("Laptop", 999.99);
cart.addItem("Mouse", 29.99);

console.log(`Total: $${cart.getTotal().toFixed(2)}`);                    // 1029.98

console.log(`Discount: ${cart.applyDiscount("SAVE10")}`);                // true
console.log(`Total: $${cart.getTotal().toFixed(2)}`);                    // 926.98

console.log(`Discount: ${cart.applyDiscount("SAVE10")}`);                // false

cart.checkout();
cart.addItem("Keyboard", 79.99); // Should be rejected
console.log(`Total: $${cart.getTotal().toFixed(2)}`);                    // 926.98
```


