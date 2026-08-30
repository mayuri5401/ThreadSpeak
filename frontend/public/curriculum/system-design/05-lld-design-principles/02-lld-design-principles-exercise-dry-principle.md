---
id: "lld-design-principles-exercise-dry-principle"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Principles"
subSection: ""
title: "Exercise: DRY Principle"
slug: "lld-design-principles-exercise-dry-principle"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: DRY Principle as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: DRY Principle Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Design Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: TaxCalculator

**Problem:** You have three region-specific order processors (`USOrderProcessor`, `EUOrderProcessor`, `UKOrderProcessor`) that each duplicate the same tax calculation logic. Your task is to extract a `TaxCalculator` interface with region-specific implementations, then refactor the order processors to use it.

**Requirements:**

- Create a `TaxCalculator` interface with a `calculateTax(amount)` method
- Implement `USTaxCalculator` (10% tax), `EUTaxCalculator` (20% tax), and `UKTaxCalculator` (15% tax)
- Refactor the order processors to accept a `TaxCalculator` instead of duplicating tax logic
- Each order processor should print the subtotal, tax amount, and total

```java
// Before: Each processor duplicates tax calculation
class USOrderProcessor {
    public void processOrder(double amount) {
        double tax = amount * 0.10; // Duplicated tax logic
        double total = amount + tax;
        System.out.println("US Order - Subtotal: $" + amount
            + ", Tax: $" + tax + ", Total: $" + total);
    }
}

class EUOrderProcessor {
    public void processOrder(double amount) {
        double tax = amount * 0.20; // Duplicated tax logic
        double total = amount + tax;
        System.out.println("EU Order - Subtotal: $" + amount
            + ", Tax: $" + tax + ", Total: $" + total);
    }
}

class UKOrderProcessor {
    public void processOrder(double amount) {
        double tax = amount * 0.15; // Duplicated tax logic
        double total = amount + tax;
        System.out.println("UK Order - Subtotal: $" + amount
            + ", Tax: $" + tax + ", Total: $" + total);
    }
}

// TODO: Extract a TaxCalculator interface and region implementations.
// TODO: Refactor OrderProcessor to accept a TaxCalculator.

public class Main {
    public static void main(String[] args) {
        // After refactoring, usage should look like:
        // OrderProcessor usProcessor = new OrderProcessor(new USTaxCalculator());
        // usProcessor.processOrder(100.0);
    }
}
```

```python
# Before: Each processor duplicates tax calculation
class USOrderProcessor:
    def process_order(self, amount: float) -> None:
        tax = amount * 0.10  # Duplicated tax logic
        total = amount + tax
        print(f"US Order - Subtotal: ${amount:.2f}, Tax: ${tax:.2f}, Total: ${total:.2f}")

class EUOrderProcessor:
    def process_order(self, amount: float) -> None:
        tax = amount * 0.20  # Duplicated tax logic
        total = amount + tax
        print(f"EU Order - Subtotal: ${amount:.2f}, Tax: ${tax:.2f}, Total: ${total:.2f}")

class UKOrderProcessor:
    def process_order(self, amount: float) -> None:
        tax = amount * 0.15  # Duplicated tax logic
        total = amount + tax
        print(f"UK Order - Subtotal: ${amount:.2f}, Tax: ${tax:.2f}, Total: ${total:.2f}")

# TODO: Extract a TaxCalculator interface (ABC) and region implementations.
# TODO: Refactor OrderProcessor to accept a TaxCalculator.

if __name__ == "__main__":
    # After refactoring, usage should look like:
    # us_processor = OrderProcessor(USTaxCalculator())
    # us_processor.process_order(100.0)
    pass
```

```cpp
#include <iostream>

using namespace std;

// Before: Each processor duplicates tax calculation
class USOrderProcessor {
public:
    void processOrder(double amount) {
        double tax = amount * 0.10; // Duplicated tax logic
        double total = amount + tax;
        cout << "US Order - Subtotal: $" << amount
             << ", Tax: $" << tax << ", Total: $" << total << endl;
    }
};

class EUOrderProcessor {
public:
    void processOrder(double amount) {
        double tax = amount * 0.20; // Duplicated tax logic
        double total = amount + tax;
        cout << "EU Order - Subtotal: $" << amount
             << ", Tax: $" << tax << ", Total: $" << total << endl;
    }
};

class UKOrderProcessor {
public:
    void processOrder(double amount) {
        double tax = amount * 0.15; // Duplicated tax logic
        double total = amount + tax;
        cout << "UK Order - Subtotal: $" << amount
             << ", Tax: $" << tax << ", Total: $" << total << endl;
    }
};

// TODO: Extract a TaxCalculator interface and region implementations.
// TODO: Refactor OrderProcessor to accept a TaxCalculator.

int main() {
    // After refactoring, usage should look like:
    // OrderProcessor usProcessor(make_unique<USTaxCalculator>());
    // usProcessor.processOrder(100.0);
    return 0;
}
```

```go
package main

import "fmt"

// Before: Each processor duplicates tax calculation
type USOrderProcessor struct{}

func (p *USOrderProcessor) ProcessOrder(amount float64) {
	tax := amount * 0.10 // Duplicated tax logic
	total := amount + tax
	fmt.Printf("US Order - Subtotal: $%.2f, Tax: $%.2f, Total: $%.2f\n", amount, tax, total)
}

type EUOrderProcessor struct{}

func (p *EUOrderProcessor) ProcessOrder(amount float64) {
	tax := amount * 0.20 // Duplicated tax logic
	total := amount + tax
	fmt.Printf("EU Order - Subtotal: $%.2f, Tax: $%.2f, Total: $%.2f\n", amount, tax, total)
}

type UKOrderProcessor struct{}

func (p *UKOrderProcessor) ProcessOrder(amount float64) {
	tax := amount * 0.15 // Duplicated tax logic
	total := amount + tax
	fmt.Printf("UK Order - Subtotal: $%.2f, Tax: $%.2f, Total: $%.2f\n", amount, tax, total)
}

// TODO: Extract a TaxCalculator interface and region implementations.
// TODO: Refactor OrderProcessor to accept a TaxCalculator.

type TaxCalculator interface {
	CalculateTax(amount float64) float64
}

type USTaxCalculator struct{}

func (c *USTaxCalculator) CalculateTax(amount float64) float64 {
	// TODO: Implement tax calculation for US region.
	return 0
}

type EUTaxCalculator struct{}

func (c *EUTaxCalculator) CalculateTax(amount float64) float64 {
	// TODO: Implement tax calculation for EU region.
	return 0
}

type UKTaxCalculator struct{}

func (c *UKTaxCalculator) CalculateTax(amount float64) float64 {
	// TODO: Implement tax calculation for UK region.
	return 0
}

type OrderProcessor struct {
	taxCalculator TaxCalculator
}

func NewOrderProcessor(taxCalculator TaxCalculator) *OrderProcessor {
	// TODO: Initialize OrderProcessor with the provided TaxCalculator.
	return &OrderProcessor{taxCalculator: taxCalculator}
}

func (p *OrderProcessor) ProcessOrder(amount float64) {
	// TODO: Use p.taxCalculator to calculate tax and print the order summary.
}

func main() {
	// After refactoring, usage should look like:
	// usProcessor := NewOrderProcessor(&USTaxCalculator{})
	// usProcessor.ProcessOrder(100.0)
}
```

```csharp
using System;

// Before: Each processor duplicates tax calculation
public class USOrderProcessor
{
    public void ProcessOrder(double amount)
    {
        double tax = amount * 0.10; // Duplicated tax logic
        double total = amount + tax;
        Console.WriteLine($"US Order - Subtotal: ${amount:F2}, Tax: ${tax:F2}, Total: ${total:F2}");
    }
}

public class EUOrderProcessor
{
    public void ProcessOrder(double amount)
    {
        double tax = amount * 0.20; // Duplicated tax logic
        double total = amount + tax;
        Console.WriteLine($"EU Order - Subtotal: ${amount:F2}, Tax: ${tax:F2}, Total: ${total:F2}");
    }
}

public class UKOrderProcessor
{
    public void ProcessOrder(double amount)
    {
        double tax = amount * 0.15; // Duplicated tax logic
        double total = amount + tax;
        Console.WriteLine($"UK Order - Subtotal: ${amount:F2}, Tax: ${tax:F2}, Total: ${total:F2}");
    }
}

// TODO: Extract an ITaxCalculator interface and region implementations.
// TODO: Refactor OrderProcessor to accept an ITaxCalculator.

public class Program
{
    public static void Main()
    {
        // After refactoring, usage should look like:
        // var usProcessor = new OrderProcessor(new USTaxCalculator());
        // usProcessor.ProcessOrder(100.0);
    }
}
```

```typescript
// Before: Each processor duplicates tax calculation
class USOrderProcessor {
    processOrder(amount: number): void {
        const tax = amount * 0.10; // Duplicated tax logic
        const total = amount + tax;
        console.log(`US Order - Subtotal: $${amount.toFixed(2)}, Tax: $${tax.toFixed(2)}, Total: $${total.toFixed(2)}`);
    }
}

class EUOrderProcessor {
    processOrder(amount: number): void {
        const tax = amount * 0.20; // Duplicated tax logic
        const total = amount + tax;
        console.log(`EU Order - Subtotal: $${amount.toFixed(2)}, Tax: $${tax.toFixed(2)}, Total: $${total.toFixed(2)}`);
    }
}

class UKOrderProcessor {
    processOrder(amount: number): void {
        const tax = amount * 0.15; // Duplicated tax logic
        const total = amount + tax;
        console.log(`UK Order - Subtotal: $${amount.toFixed(2)}, Tax: $${tax.toFixed(2)}, Total: $${total.toFixed(2)}`);
    }
}

// TODO: Extract a TaxCalculator interface and region implementations.
// TODO: Refactor OrderProcessor to accept a TaxCalculator.

// After refactoring, usage should look like:
// const usProcessor = new OrderProcessor(new USTaxCalculator());
// usProcessor.processOrder(100.0);
```

#### Solutions

```java
interface TaxCalculator {
    double calculateTax(double amount);
    String getRegion();
}

class USTaxCalculator implements TaxCalculator {
    public double calculateTax(double amount) {
        return amount * 0.10;
    }

    public String getRegion() {
        return "US";
    }
}

class EUTaxCalculator implements TaxCalculator {
    public double calculateTax(double amount) {
        return amount * 0.20;
    }

    public String getRegion() {
        return "EU";
    }
}

class UKTaxCalculator implements TaxCalculator {
    public double calculateTax(double amount) {
        return amount * 0.15;
    }

    public String getRegion() {
        return "UK";
    }
}

class OrderProcessor {
    private final TaxCalculator taxCalculator;

    public OrderProcessor(TaxCalculator taxCalculator) {
        this.taxCalculator = taxCalculator;
    }

    public void processOrder(double amount) {
        double tax = taxCalculator.calculateTax(amount);
        double total = amount + tax;
        System.out.printf("%s Order - Subtotal: $%.2f, Tax: $%.2f, Total: $%.2f%n",
            taxCalculator.getRegion(), amount, tax, total);
    }
}

public class Main {
    public static void main(String[] args) {
        OrderProcessor usProcessor = new OrderProcessor(new USTaxCalculator());
        usProcessor.processOrder(100.0);

        OrderProcessor euProcessor = new OrderProcessor(new EUTaxCalculator());
        euProcessor.processOrder(100.0);

        OrderProcessor ukProcessor = new OrderProcessor(new UKTaxCalculator());
        ukProcessor.processOrder(100.0);
    }
}
```

```python
from abc import ABC, abstractmethod

class TaxCalculator(ABC):
    @abstractmethod
    def calculate_tax(self, amount: float) -> float:
        pass

    @abstractmethod
    def get_region(self) -> str:
        pass

class USTaxCalculator(TaxCalculator):
    def calculate_tax(self, amount: float) -> float:
        return amount * 0.10

    def get_region(self) -> str:
        return "US"

class EUTaxCalculator(TaxCalculator):
    def calculate_tax(self, amount: float) -> float:
        return amount * 0.20

    def get_region(self) -> str:
        return "EU"

class UKTaxCalculator(TaxCalculator):
    def calculate_tax(self, amount: float) -> float:
        return amount * 0.15

    def get_region(self) -> str:
        return "UK"

class OrderProcessor:
    def __init__(self, tax_calculator: TaxCalculator):
        self.tax_calculator = tax_calculator

    def process_order(self, amount: float) -> None:
        tax = self.tax_calculator.calculate_tax(amount)
        total = amount + tax
        print(f"{self.tax_calculator.get_region()} Order - "
              f"Subtotal: ${amount:.2f}, Tax: ${tax:.2f}, Total: ${total:.2f}")

if __name__ == "__main__":
    us_processor = OrderProcessor(USTaxCalculator())
    us_processor.process_order(100.0)

    eu_processor = OrderProcessor(EUTaxCalculator())
    eu_processor.process_order(100.0)

    uk_processor = OrderProcessor(UKTaxCalculator())
    uk_processor.process_order(100.0)
```

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <iomanip>

using namespace std;

class TaxCalculator {
public:
    virtual ~TaxCalculator() = default;
    virtual double calculateTax(double amount) const = 0;
    virtual string getRegion() const = 0;
};

class USTaxCalculator : public TaxCalculator {
public:
    double calculateTax(double amount) const override {
        return amount * 0.10;
    }

    string getRegion() const override {
        return "US";
    }
};

class EUTaxCalculator : public TaxCalculator {
public:
    double calculateTax(double amount) const override {
        return amount * 0.20;
    }

    string getRegion() const override {
        return "EU";
    }
};

class UKTaxCalculator : public TaxCalculator {
public:
    double calculateTax(double amount) const override {
        return amount * 0.15;
    }

    string getRegion() const override {
        return "UK";
    }
};

class OrderProcessor {
private:
    unique_ptr<TaxCalculator> taxCalculator;

public:
    OrderProcessor(unique_ptr<TaxCalculator> calculator)
        : taxCalculator(move(calculator)) {}

    void processOrder(double amount) {
        double tax = taxCalculator->calculateTax(amount);
        double total = amount + tax;
        cout << taxCalculator->getRegion() << " Order - Subtotal: $"
             << fixed << setprecision(2) << amount << ", Tax: $" << tax
             << ", Total: $" << total << endl;
    }
};

int main() {
    OrderProcessor usProcessor(make_unique<USTaxCalculator>());
    usProcessor.processOrder(100.0);

    OrderProcessor euProcessor(make_unique<EUTaxCalculator>());
    euProcessor.processOrder(100.0);

    OrderProcessor ukProcessor(make_unique<UKTaxCalculator>());
    ukProcessor.processOrder(100.0);

    return 0;
}
```

```go
package main

import "fmt"

type TaxCalculator interface {
	CalculateTax(amount float64) float64
	GetRegion() string
}

type USTaxCalculator struct{}

func (u USTaxCalculator) CalculateTax(amount float64) float64 {
	return amount * 0.10
}

func (u USTaxCalculator) GetRegion() string {
	return "US"
}

type EUTaxCalculator struct{}

func (e EUTaxCalculator) CalculateTax(amount float64) float64 {
	return amount * 0.20
}

func (e EUTaxCalculator) GetRegion() string {
	return "EU"
}

type UKTaxCalculator struct{}

func (u UKTaxCalculator) CalculateTax(amount float64) float64 {
	return amount * 0.15
}

func (u UKTaxCalculator) GetRegion() string {
	return "UK"
}

type OrderProcessor struct {
	taxCalculator TaxCalculator
}

func NewOrderProcessor(taxCalculator TaxCalculator) *OrderProcessor {
	return &OrderProcessor{taxCalculator: taxCalculator}
}

func (o *OrderProcessor) ProcessOrder(amount float64) {
	tax := o.taxCalculator.CalculateTax(amount)
	total := amount + tax
	fmt.Printf("%s Order - Subtotal: $%.2f, Tax: $%.2f, Total: $%.2f\n",
		o.taxCalculator.GetRegion(), amount, tax, total)
}

func main() {
	usProcessor := NewOrderProcessor(USTaxCalculator{})
	usProcessor.ProcessOrder(100.0)

	euProcessor := NewOrderProcessor(EUTaxCalculator{})
	euProcessor.ProcessOrder(100.0)

	ukProcessor := NewOrderProcessor(UKTaxCalculator{})
	ukProcessor.ProcessOrder(100.0)
}
```

```csharp
using System;

public interface ITaxCalculator
{
    double CalculateTax(double amount);
    string GetRegion();
}

public class USTaxCalculator : ITaxCalculator
{
    public double CalculateTax(double amount) => amount * 0.10;
    public string GetRegion() => "US";
}

public class EUTaxCalculator : ITaxCalculator
{
    public double CalculateTax(double amount) => amount * 0.20;
    public string GetRegion() => "EU";
}

public class UKTaxCalculator : ITaxCalculator
{
    public double CalculateTax(double amount) => amount * 0.15;
    public string GetRegion() => "UK";
}

public class OrderProcessor
{
    private readonly ITaxCalculator taxCalculator;

    public OrderProcessor(ITaxCalculator taxCalculator)
    {
        this.taxCalculator = taxCalculator;
    }

    public void ProcessOrder(double amount)
    {
        double tax = taxCalculator.CalculateTax(amount);
        double total = amount + tax;
        Console.WriteLine($"{taxCalculator.GetRegion()} Order - Subtotal: ${amount:F2}, Tax: ${tax:F2}, Total: ${total:F2}");
    }
}

public class Program
{
    public static void Main()
    {
        var usProcessor = new OrderProcessor(new USTaxCalculator());
        usProcessor.ProcessOrder(100.0);

        var euProcessor = new OrderProcessor(new EUTaxCalculator());
        euProcessor.ProcessOrder(100.0);

        var ukProcessor = new OrderProcessor(new UKTaxCalculator());
        ukProcessor.ProcessOrder(100.0);
    }
}
```

```typescript
interface TaxCalculator {
    calculateTax(amount: number): number;
    getRegion(): string;
}

class USTaxCalculator implements TaxCalculator {
    calculateTax(amount: number): number {
        return amount * 0.10;
    }

    getRegion(): string {
        return "US";
    }
}

class EUTaxCalculator implements TaxCalculator {
    calculateTax(amount: number): number {
        return amount * 0.20;
    }

    getRegion(): string {
        return "EU";
    }
}

class UKTaxCalculator implements TaxCalculator {
    calculateTax(amount: number): number {
        return amount * 0.15;
    }

    getRegion(): string {
        return "UK";
    }
}

class OrderProcessor {
    private taxCalculator: TaxCalculator;

    constructor(taxCalculator: TaxCalculator) {
        this.taxCalculator = taxCalculator;
    }

    processOrder(amount: number): void {
        const tax = this.taxCalculator.calculateTax(amount);
        const total = amount + tax;
        console.log(`${this.taxCalculator.getRegion()} Order - Subtotal: $${amount.toFixed(2)}, Tax: $${tax.toFixed(2)}, Total: $${total.toFixed(2)}`);
    }
}

const usProcessor = new OrderProcessor(new USTaxCalculator());
usProcessor.processOrder(100.0);

const euProcessor = new OrderProcessor(new EUTaxCalculator());
euProcessor.processOrder(100.0);

const ukProcessor = new OrderProcessor(new UKTaxCalculator());
ukProcessor.processOrder(100.0);
```

---

# Exercise 2: ConfigLoader

**Problem:** Your application loads configuration from three sources: a config file, environment variables, and default values. Each source currently has its own parsing and validation pipeline, but the pipeline logic (read, parse, validate, return) is identical. Your task is to eliminate this duplication.

**Requirements:**

- Create a `ConfigSource` interface with a `loadValue(key)` method
- Implement `FileConfigSource`, `EnvConfigSource`, and `DefaultConfigSource`
- Create a `ConfigLoader` that tries each source in priority order (file first, then env, then defaults) and returns the first non-null value
- Add validation: config values must be non-empty strings

```java
import java.util.Map;
import java.util.HashMap;

// Before: Each source has its own load-parse-validate pipeline
class AppConfig {
    private Map<String, String> fileConfig = new HashMap<>();
    private Map<String, String> defaults = new HashMap<>();

    public AppConfig() {
        fileConfig.put("db.host", "localhost");
        fileConfig.put("db.port", "5432");
        defaults.put("db.host", "127.0.0.1");
        defaults.put("db.port", "3306");
        defaults.put("db.timeout", "30");
    }

    public String getFromFile(String key) {
        String value = fileConfig.get(key);
        if (value == null || value.isEmpty()) return null; // Duplicated validation
        return value;
    }

    public String getFromEnv(String key) {
        String value = System.getenv(key.replace(".", "_").toUpperCase());
        if (value == null || value.isEmpty()) return null; // Duplicated validation
        return value;
    }

    public String getFromDefaults(String key) {
        String value = defaults.get(key);
        if (value == null || value.isEmpty()) return null; // Duplicated validation
        return value;
    }
}

// TODO: Extract a ConfigSource interface.
// TODO: Create a ConfigLoader that tries sources in priority order.

public class Main {
    public static void main(String[] args) {
        // After refactoring, usage should look like:
        // ConfigLoader loader = new ConfigLoader(
        //     new FileConfigSource(fileConfig),
        //     new EnvConfigSource(),
        //     new DefaultConfigSource(defaults)
        // );
        // String host = loader.get("db.host");
        // System.out.println("db.host = " + host);
    }
}
```

```python
import os

# Before: Each source has its own load-parse-validate pipeline
class AppConfig:
    def __init__(self):
        self.file_config = {"db.host": "localhost", "db.port": "5432"}
        self.defaults = {"db.host": "127.0.0.1", "db.port": "3306", "db.timeout": "30"}

    def get_from_file(self, key: str):
        value = self.file_config.get(key)
        if value is None or value == "":  # Duplicated validation
            return None
        return value

    def get_from_env(self, key: str):
        value = os.environ.get(key.replace(".", "_").upper())
        if value is None or value == "":  # Duplicated validation
            return None
        return value

    def get_from_defaults(self, key: str):
        value = self.defaults.get(key)
        if value is None or value == "":  # Duplicated validation
            return None
        return value

# TODO: Extract a ConfigSource interface (ABC) and create a ConfigLoader.

if __name__ == "__main__":
    # After refactoring, usage should look like:
    # loader = ConfigLoader([file_source, env_source, default_source])
    # host = loader.get("db.host")
    # print(f"db.host = {host}")
    pass
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <cstdlib>

using namespace std;

// Before: Each source has its own load-parse-validate pipeline
class AppConfig {
private:
    map<string, string> fileConfig;
    map<string, string> defaults;

public:
    AppConfig() {
        fileConfig["db.host"] = "localhost";
        fileConfig["db.port"] = "5432";
        defaults["db.host"] = "127.0.0.1";
        defaults["db.port"] = "3306";
        defaults["db.timeout"] = "30";
    }

    string getFromFile(const string& key) {
        auto it = fileConfig.find(key);
        if (it == fileConfig.end() || it->second.empty()) return ""; // Duplicated
        return it->second;
    }

    string getFromEnv(const string& key) {
        const char* value = getenv(key.c_str());
        if (value == nullptr || string(value).empty()) return ""; // Duplicated
        return string(value);
    }

    string getFromDefaults(const string& key) {
        auto it = defaults.find(key);
        if (it == defaults.end() || it->second.empty()) return ""; // Duplicated
        return it->second;
    }
};

// TODO: Extract a ConfigSource interface and create a ConfigLoader.

int main() {
    // After refactoring, usage should look like:
    // ConfigLoader loader({fileSource, envSource, defaultSource});
    // string host = loader.get("db.host");
    return 0;
}
```

```go
package main

import "fmt"

// Before: Each source has its own load-parse-validate pipeline
type AppConfig struct {
	fileConfig map[string]string
	defaults   map[string]string
}

func NewAppConfig() *AppConfig {
	cfg := &AppConfig{
		fileConfig: make(map[string]string),
		defaults:   make(map[string]string),
	}
	cfg.fileConfig["db.host"] = "localhost"
	cfg.fileConfig["db.port"] = "5432"
	cfg.defaults["db.host"] = "127.0.0.1"
	cfg.defaults["db.port"] = "3306"
	cfg.defaults["db.timeout"] = "30"
	return cfg
}

func (a *AppConfig) GetFromFile(key string) string {
	// TODO: Implement duplicated validation logic
	return ""
}

func (a *AppConfig) GetFromEnv(key string) string {
	// TODO: Implement duplicated validation logic
	return ""
}

func (a *AppConfig) GetFromDefaults(key string) string {
	// TODO: Implement duplicated validation logic
	return ""
}

// TODO: Extract a ConfigSource interface.
// TODO: Create a ConfigLoader that tries sources in priority order.

func main() {
	// After refactoring, usage should look like:
	// loader := NewConfigLoader(fileSource, envSource, defaultSource)
	// host := loader.Get("db.host")
	// fmt.Println("db.host =", host)

	_ = fmt.Sprint("")
}
```

```csharp
using System;
using System.Collections.Generic;

// Before: Each source has its own load-parse-validate pipeline
public class AppConfig
{
    private Dictionary<string, string> fileConfig = new Dictionary<string, string>();
    private Dictionary<string, string> defaults = new Dictionary<string, string>();

    public AppConfig()
    {
        fileConfig["db.host"] = "localhost";
        fileConfig["db.port"] = "5432";
        defaults["db.host"] = "127.0.0.1";
        defaults["db.port"] = "3306";
        defaults["db.timeout"] = "30";
    }

    public string GetFromFile(string key)
    {
        fileConfig.TryGetValue(key, out var value);
        if (string.IsNullOrEmpty(value)) return null; // Duplicated validation
        return value;
    }

    public string GetFromEnv(string key)
    {
        var value = Environment.GetEnvironmentVariable(key.Replace(".", "_").ToUpper());
        if (string.IsNullOrEmpty(value)) return null; // Duplicated validation
        return value;
    }

    public string GetFromDefaults(string key)
    {
        defaults.TryGetValue(key, out var value);
        if (string.IsNullOrEmpty(value)) return null; // Duplicated validation
        return value;
    }
}

// TODO: Extract an IConfigSource interface and create a ConfigLoader.

public class Program
{
    public static void Main()
    {
        // After refactoring, usage should look like:
        // var loader = new ConfigLoader(fileSource, envSource, defaultSource);
        // string host = loader.Get("db.host");
    }
}
```

```typescript
// Before: Each source has its own load-parse-validate pipeline
class AppConfig {
    private fileConfig: Map<string, string> = new Map([
        ["db.host", "localhost"],
        ["db.port", "5432"],
    ]);
    private defaults: Map<string, string> = new Map([
        ["db.host", "127.0.0.1"],
        ["db.port", "3306"],
        ["db.timeout", "30"],
    ]);

    getFromFile(key: string): string | null {
        const value = this.fileConfig.get(key);
        if (!value || value === "") return null; // Duplicated validation
        return value;
    }

    getFromEnv(key: string): string | null {
        const value = process.env[key.replace(/\./g, "_").toUpperCase()];
        if (!value || value === "") return null; // Duplicated validation
        return value;
    }

    getFromDefaults(key: string): string | null {
        const value = this.defaults.get(key);
        if (!value || value === "") return null; // Duplicated validation
        return value;
    }
}

// TODO: Extract a ConfigSource interface and create a ConfigLoader.

// After refactoring, usage should look like:
// const loader = new ConfigLoader([fileSource, envSource, defaultSource]);
// const host = loader.get("db.host");
// console.log(`db.host = ${host}`);
```

#### Solutions

```java
import java.util.Map;
import java.util.HashMap;
import java.util.List;

interface ConfigSource {
    String loadValue(String key);
}

class FileConfigSource implements ConfigSource {
    private final Map<String, String> config;

    public FileConfigSource(Map<String, String> config) {
        this.config = config;
    }

    public String loadValue(String key) {
        return config.get(key);
    }
}

class EnvConfigSource implements ConfigSource {
    public String loadValue(String key) {
        return System.getenv(key.replace(".", "_").toUpperCase());
    }
}

class DefaultConfigSource implements ConfigSource {
    private final Map<String, String> defaults;

    public DefaultConfigSource(Map<String, String> defaults) {
        this.defaults = defaults;
    }

    public String loadValue(String key) {
        return defaults.get(key);
    }
}

class ConfigLoader {
    private final List<ConfigSource> sources;

    public ConfigLoader(ConfigSource... sources) {
        this.sources = List.of(sources);
    }

    public String get(String key) {
        for (ConfigSource source : sources) {
            String value = source.loadValue(key);
            if (value != null && !value.isEmpty()) {
                return value;
            }
        }
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        Map<String, String> fileConfig = new HashMap<>();
        fileConfig.put("db.host", "localhost");
        fileConfig.put("db.port", "5432");

        Map<String, String> defaults = new HashMap<>();
        defaults.put("db.host", "127.0.0.1");
        defaults.put("db.port", "3306");
        defaults.put("db.timeout", "30");

        ConfigLoader loader = new ConfigLoader(
            new FileConfigSource(fileConfig),
            new EnvConfigSource(),
            new DefaultConfigSource(defaults)
        );

        System.out.println("db.host = " + loader.get("db.host"));
        System.out.println("db.port = " + loader.get("db.port"));
        System.out.println("db.timeout = " + loader.get("db.timeout"));
    }
}
```

```python
import os
from abc import ABC, abstractmethod

class ConfigSource(ABC):
    @abstractmethod
    def load_value(self, key: str):
        pass

class FileConfigSource(ConfigSource):
    def __init__(self, config: dict):
        self.config = config

    def load_value(self, key: str):
        return self.config.get(key)

class EnvConfigSource(ConfigSource):
    def load_value(self, key: str):
        return os.environ.get(key.replace(".", "_").upper())

class DefaultConfigSource(ConfigSource):
    def __init__(self, defaults: dict):
        self.defaults = defaults

    def load_value(self, key: str):
        return self.defaults.get(key)

class ConfigLoader:
    def __init__(self, sources: list):
        self.sources = sources

    def get(self, key: str):
        for source in self.sources:
            value = source.load_value(key)
            if value is not None and value != "":
                return value
        return None

if __name__ == "__main__":
    file_config = {"db.host": "localhost", "db.port": "5432"}
    defaults = {"db.host": "127.0.0.1", "db.port": "3306", "db.timeout": "30"}

    loader = ConfigLoader([
        FileConfigSource(file_config),
        EnvConfigSource(),
        DefaultConfigSource(defaults),
    ])

    print(f"db.host = {loader.get('db.host')}")
    print(f"db.port = {loader.get('db.port')}")
    print(f"db.timeout = {loader.get('db.timeout')}")
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <memory>
#include <cstdlib>

using namespace std;

class ConfigSource {
public:
    virtual ~ConfigSource() = default;
    virtual string loadValue(const string& key) const = 0;
};

class FileConfigSource : public ConfigSource {
private:
    map<string, string> config;

public:
    FileConfigSource(const map<string, string>& config)
        : config(config) {}

    string loadValue(const string& key) const override {
        auto it = config.find(key);
        if (it != config.end()) return it->second;
        return "";
    }
};

class EnvConfigSource : public ConfigSource {
public:
    string loadValue(const string& key) const override {
        string envKey = key;
        for (auto& c : envKey) {
            if (c == '.') c = '_';
            else c = toupper(c);
        }
        const char* value = getenv(envKey.c_str());
        return value " string(value) : "";
    }
};

class DefaultConfigSource : public ConfigSource {
private:
    map<string, string> defaults;

public:
    DefaultConfigSource(const map<string, string>& defaults)
        : defaults(defaults) {}

    string loadValue(const string& key) const override {
        auto it = defaults.find(key);
        if (it != defaults.end()) return it->second;
        return "";
    }
};

class ConfigLoader {
private:
    vector<unique_ptr<ConfigSource>> sources;

public:
    ConfigLoader(vector<unique_ptr<ConfigSource>> sources)
        : sources(move(sources)) {}

    string get(const string& key) const {
        for (const auto& source : sources) {
            string value = source->loadValue(key);
            if (!value.empty()) {
                return value;
            }
        }
        return "";
    }
};

int main() {
    map<string, string> fileConfig = {
        {"db.host", "localhost"}, {"db.port", "5432"}
    };
    map<string, string> defaults = {
        {"db.host", "127.0.0.1"}, {"db.port", "3306"}, {"db.timeout", "30"}
    };

    vector<unique_ptr<ConfigSource>> sources;
    sources.push_back(make_unique<FileConfigSource>(fileConfig));
    sources.push_back(make_unique<EnvConfigSource>());
    sources.push_back(make_unique<DefaultConfigSource>(defaults));

    ConfigLoader loader(move(sources));

    cout << "db.host = " << loader.get("db.host") << endl;
    cout << "db.port = " << loader.get("db.port") << endl;
    cout << "db.timeout = " << loader.get("db.timeout") << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"os"
	"strings"
)

type ConfigSource interface {
	LoadValue(key string) string
}

type FileConfigSource struct {
	config map[string]string
}

func NewFileConfigSource(config map[string]string) *FileConfigSource {
	return &FileConfigSource{config: config}
}

func (f *FileConfigSource) LoadValue(key string) string {
	return f.config[key]
}

type EnvConfigSource struct{}

func NewEnvConfigSource() *EnvConfigSource {
	return &EnvConfigSource{}
}

func (e *EnvConfigSource) LoadValue(key string) string {
	envKey := strings.ToUpper(strings.ReplaceAll(key, ".", "_"))
	return os.Getenv(envKey)
}

type DefaultConfigSource struct {
	defaults map[string]string
}

func NewDefaultConfigSource(defaults map[string]string) *DefaultConfigSource {
	return &DefaultConfigSource{defaults: defaults}
}

func (d *DefaultConfigSource) LoadValue(key string) string {
	return d.defaults[key]
}

type ConfigLoader struct {
	sources []ConfigSource
}

func NewConfigLoader(sources ...ConfigSource) *ConfigLoader {
	return &ConfigLoader{sources: sources}
}

func (c *ConfigLoader) Get(key string) string {
	for _, source := range c.sources {
		value := source.LoadValue(key)
		if value != "" {
			return value
		}
	}
	return ""
}

func main() {
	fileConfig := map[string]string{
		"db.host": "localhost",
		"db.port": "5432",
	}

	defaults := map[string]string{
		"db.host":    "127.0.0.1",
		"db.port":    "3306",
		"db.timeout": "30",
	}

	loader := NewConfigLoader(
		NewFileConfigSource(fileConfig),
		NewEnvConfigSource(),
		NewDefaultConfigSource(defaults),
	)

	fmt.Println("db.host = " + loader.Get("db.host"))
	fmt.Println("db.port = " + loader.Get("db.port"))
	fmt.Println("db.timeout = " + loader.Get("db.timeout"))
}
```

```csharp
using System;
using System.Collections.Generic;

public interface IConfigSource
{
    string LoadValue(string key);
}

public class FileConfigSource : IConfigSource
{
    private readonly Dictionary<string, string> config;

    public FileConfigSource(Dictionary<string, string> config)
    {
        this.config = config;
    }

    public string LoadValue(string key)
    {
        config.TryGetValue(key, out var value);
        return value;
    }
}

public class EnvConfigSource : IConfigSource
{
    public string LoadValue(string key)
    {
        return Environment.GetEnvironmentVariable(key.Replace(".", "_").ToUpper());
    }
}

public class DefaultConfigSource : IConfigSource
{
    private readonly Dictionary<string, string> defaults;

    public DefaultConfigSource(Dictionary<string, string> defaults)
    {
        this.defaults = defaults;
    }

    public string LoadValue(string key)
    {
        defaults.TryGetValue(key, out var value);
        return value;
    }
}

public class ConfigLoader
{
    private readonly IConfigSource[] sources;

    public ConfigLoader(params IConfigSource[] sources)
    {
        this.sources = sources;
    }

    public string Get(string key)
    {
        foreach (var source in sources)
        {
            string value = source.LoadValue(key);
            if (!string.IsNullOrEmpty(value))
            {
                return value;
            }
        }
        return null;
    }
}

public class Program
{
    public static void Main()
    {
        var fileConfig = new Dictionary<string, string>
        {
            ["db.host"] = "localhost",
            ["db.port"] = "5432"
        };
        var defaults = new Dictionary<string, string>
        {
            ["db.host"] = "127.0.0.1",
            ["db.port"] = "3306",
            ["db.timeout"] = "30"
        };

        var loader = new ConfigLoader(
            new FileConfigSource(fileConfig),
            new EnvConfigSource(),
            new DefaultConfigSource(defaults)
        );

        Console.WriteLine("db.host = " + loader.Get("db.host"));
        Console.WriteLine("db.port = " + loader.Get("db.port"));
        Console.WriteLine("db.timeout = " + loader.Get("db.timeout"));
    }
}
```

```typescript
interface ConfigSource {
    loadValue(key: string): string | null;
}

class FileConfigSource implements ConfigSource {
    private config: Map<string, string>;

    constructor(config: Map<string, string>) {
        this.config = config;
    }

    loadValue(key: string): string | null {
        return this.config.get(key) "" null;
    }
}

class EnvConfigSource implements ConfigSource {
    loadValue(key: string): string | null {
        return process.env[key.replace(/\./g, "_").toUpperCase()] "" null;
    }
}

class DefaultConfigSource implements ConfigSource {
    private defaults: Map<string, string>;

    constructor(defaults: Map<string, string>) {
        this.defaults = defaults;
    }

    loadValue(key: string): string | null {
        return this.defaults.get(key) "" null;
    }
}

class ConfigLoader {
    private sources: ConfigSource[];

    constructor(sources: ConfigSource[]) {
        this.sources = sources;
    }

    get(key: string): string | null {
        for (const source of this.sources) {
            const value = source.loadValue(key);
            if (value !== null && value !== "") {
                return value;
            }
        }
        return null;
    }
}

const fileConfig = new Map([
    ["db.host", "localhost"],
    ["db.port", "5432"],
]);
const defaults = new Map([
    ["db.host", "127.0.0.1"],
    ["db.port", "3306"],
    ["db.timeout", "30"],
]);

const loader = new ConfigLoader([
    new FileConfigSource(fileConfig),
    new EnvConfigSource(),
    new DefaultConfigSource(defaults),
]);

console.log(`db.host = ${loader.get("db.host")}`);
console.log(`db.port = ${loader.get("db.port")}`);
console.log(`db.timeout = ${loader.get("db.timeout")}`);
```


