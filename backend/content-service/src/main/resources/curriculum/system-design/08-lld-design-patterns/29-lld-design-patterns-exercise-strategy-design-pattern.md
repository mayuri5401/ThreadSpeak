---
id: "lld-design-patterns-exercise-strategy-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Strategy Design Pattern"
slug: "lld-design-patterns-exercise-strategy-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Strategy Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Strategy Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Text Formatter

Build a text formatting system where different strategies format text in different ways. The `TextEditor` context should allow swapping formatters at runtime, so the same editor can produce uppercase, lowercase, or title case output depending on the active strategy.

**Requirements:**

- Strategy interface: `TextFormatter` with a method `format(text)` that returns a formatted string
- Concrete strategies: `UpperCaseFormatter`, `LowerCaseFormatter`, `TitleCaseFormatter`
- Context: `TextEditor` with `setFormatter()` to swap strategies and `publishText()` to format and print text

```java
interface TextFormatter {
    String format(String text);
}

class UpperCaseFormatter implements TextFormatter {
    @Override
    public String format(String text) {
        return null; // TODO: Return text converted to upper case
    }
}

class LowerCaseFormatter implements TextFormatter {
    @Override
    public String format(String text) {
        return null; // TODO: Return text converted to lower case
    }
}

class TitleCaseFormatter implements TextFormatter {
    @Override
    public String format(String text) {
        return null; // TODO: Split by space, capitalize first letter of each word, rejoin
    }
}

class TextEditor {
    private TextFormatter formatter;

    public TextEditor(TextFormatter formatter) {
        this.formatter = formatter;
    }

    public void setFormatter(TextFormatter formatter) {
        this.formatter = formatter;
    }

    public void publishText(String text) {
        System.out.println(formatter.format(text));
    }
}

public class Main {
    public static void main(String[] args) {
        // TextEditor editor = new TextEditor(new UpperCaseFormatter());
        // editor.publishText("hello world from strategy pattern");

        // editor.setFormatter(new LowerCaseFormatter());
        // editor.publishText("Hello World From Strategy Pattern");

        // editor.setFormatter(new TitleCaseFormatter());
        // editor.publishText("hello world from strategy pattern");
    }
}
```

```python
from abc import ABC, abstractmethod

class TextFormatter(ABC):
    @abstractmethod
    def format(self, text: str) -> str:
        pass

class UpperCaseFormatter(TextFormatter):
    def format(self, text: str) -> str:
        pass  # TODO: Return text converted to upper case

class LowerCaseFormatter(TextFormatter):
    def format(self, text: str) -> str:
        pass  # TODO: Return text converted to lower case

class TitleCaseFormatter(TextFormatter):
    def format(self, text: str) -> str:
        pass  # TODO: Return text converted to title case (hint: use .title())

class TextEditor:
    def __init__(self, formatter: TextFormatter):
        self._formatter = formatter

    def set_formatter(self, formatter: TextFormatter):
        self._formatter = formatter

    def publish_text(self, text: str):
        print(self._formatter.format(text))

if __name__ == "__main__":
    pass
    # editor = TextEditor(UpperCaseFormatter())
    # editor.publish_text("hello world from strategy pattern")

    # editor.set_formatter(LowerCaseFormatter())
    # editor.publish_text("Hello World From Strategy Pattern")

    # editor.set_formatter(TitleCaseFormatter())
    # editor.publish_text("hello world from strategy pattern")
```

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

class TextFormatter {
public:
    virtual ~TextFormatter() {}
    virtual string format(const string& text) = 0;
};

class UpperCaseFormatter : public TextFormatter {
public:
    string format(const string& text) override {
        return ""; // TODO: Return text converted to upper case
    }
};

class LowerCaseFormatter : public TextFormatter {
public:
    string format(const string& text) override {
        return ""; // TODO: Return text converted to lower case
    }
};

class TitleCaseFormatter : public TextFormatter {
public:
    string format(const string& text) override {
        return ""; // TODO: Split by spaces, capitalize first char of each word
    }
};

class TextEditor {
private:
    TextFormatter* formatter;

public:
    TextEditor(TextFormatter* formatter) : formatter(formatter) {}

    void setFormatter(TextFormatter* formatter) {
        this->formatter = formatter;
    }

    void publishText(const string& text) {
        cout << formatter->format(text) << endl;
    }
};

int main() {
    // UpperCaseFormatter upper;
    // TextEditor editor(&upper);
    // editor.publishText("hello world from strategy pattern");

    // LowerCaseFormatter lower;
    // editor.setFormatter(&lower);
    // editor.publishText("Hello World From Strategy Pattern");

    // TitleCaseFormatter title;
    // editor.setFormatter(&title);
    // editor.publishText("hello world from strategy pattern");

    return 0;
}
```

```go
package main

import "fmt"

type TextFormatter interface {
	Format(text string) string
}

type UpperCaseFormatter struct{}

func (u *UpperCaseFormatter) Format(text string) string {
	// TODO: Return text converted to upper case
	return ""
}

type LowerCaseFormatter struct{}

func (l *LowerCaseFormatter) Format(text string) string {
	// TODO: Return text converted to lower case
	return ""
}

type TitleCaseFormatter struct{}

func (t *TitleCaseFormatter) Format(text string) string {
	// TODO: Split by space, capitalize first letter of each word, rejoin
	return ""
}

type TextEditor struct {
	formatter TextFormatter
}

func NewTextEditor(formatter TextFormatter) *TextEditor {
	return &TextEditor{formatter: formatter}
}

func (e *TextEditor) SetFormatter(formatter TextFormatter) {
	e.formatter = formatter
}

func (e *TextEditor) PublishText(text string) {
	fmt.Println(e.formatter.Format(text))
}

func main() {
	// editor := NewTextEditor(&UpperCaseFormatter{})
	// editor.PublishText("hello world from strategy pattern")

	// editor.SetFormatter(&LowerCaseFormatter{})
	// editor.PublishText("Hello World From Strategy Pattern")

	// editor.SetFormatter(&TitleCaseFormatter{})
	// editor.PublishText("hello world from strategy pattern")
}
```

```csharp
using System;
using System.Globalization;

interface ITextFormatter
{
    string Format(string text);
}

class UpperCaseFormatter : ITextFormatter
{
    public string Format(string text)
    {
        return null; // TODO: Return text converted to upper case
    }
}

class LowerCaseFormatter : ITextFormatter
{
    public string Format(string text)
    {
        return null; // TODO: Return text converted to lower case
    }
}

class TitleCaseFormatter : ITextFormatter
{
    public string Format(string text)
    {
        return null; // TODO: Return text converted to title case (hint: use CultureInfo.CurrentCulture.TextInfo.ToTitleCase())
    }
}

class TextEditor
{
    private ITextFormatter _formatter;

    public TextEditor(ITextFormatter formatter)
    {
        _formatter = formatter;
    }

    public void SetFormatter(ITextFormatter formatter)
    {
        _formatter = formatter;
    }

    public void PublishText(string text)
    {
        Console.WriteLine(_formatter.Format(text));
    }
}

class Program
{
    static void Main(string[] args)
    {
        // TextEditor editor = new TextEditor(new UpperCaseFormatter());
        // editor.PublishText("hello world from strategy pattern");

        // editor.SetFormatter(new LowerCaseFormatter());
        // editor.PublishText("Hello World From Strategy Pattern");

        // editor.SetFormatter(new TitleCaseFormatter());
        // editor.PublishText("hello world from strategy pattern");
    }
}
```

```typescript
interface TextFormatter {
    format(text: string): string;
}

class UpperCaseFormatter implements TextFormatter {
    format(text: string): string {
        return ""; // TODO: Return text converted to upper case
    }
}

class LowerCaseFormatter implements TextFormatter {
    format(text: string): string {
        return ""; // TODO: Return text converted to lower case
    }
}

class TitleCaseFormatter implements TextFormatter {
    format(text: string): string {
        return ""; // TODO: Split by space, capitalize first letter of each word, rejoin
    }
}

class TextEditor {
    private formatter: TextFormatter;

    constructor(formatter: TextFormatter) {
        this.formatter = formatter;
    }

    setFormatter(formatter: TextFormatter): void {
        this.formatter = formatter;
    }

    publishText(text: string): void {
        console.log(this.formatter.format(text));
    }
}

// const editor = new TextEditor(new UpperCaseFormatter());
// editor.publishText("hello world from strategy pattern");

// editor.setFormatter(new LowerCaseFormatter());
// editor.publishText("Hello World From Strategy Pattern");

// editor.setFormatter(new TitleCaseFormatter());
// editor.publishText("hello world from strategy pattern");
```

#### Solutions

```java
interface TextFormatter {
    String format(String text);
}

class UpperCaseFormatter implements TextFormatter {
    public String format(String text) {
        return text.toUpperCase();
    }
}

class LowerCaseFormatter implements TextFormatter {
    public String format(String text) {
        return text.toLowerCase();
    }
}

class TitleCaseFormatter implements TextFormatter {
    public String format(String text) {
        String[] words = text.split(" ");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            if (i > 0) sb.append(" ");
            sb.append(Character.toUpperCase(words[i].charAt(0)));
            sb.append(words[i].substring(1).toLowerCase());
        }
        return sb.toString();
    }
}

class TextEditor {
    private TextFormatter formatter;

    public TextEditor(TextFormatter formatter) {
        this.formatter = formatter;
    }

    public void setFormatter(TextFormatter formatter) {
        this.formatter = formatter;
    }

    public void publishText(String text) {
        System.out.println(formatter.format(text));
    }
}

public class Main {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor(new UpperCaseFormatter());
        editor.publishText("hello world from strategy pattern");

        editor.setFormatter(new LowerCaseFormatter());
        editor.publishText("Hello World From Strategy Pattern");

        editor.setFormatter(new TitleCaseFormatter());
        editor.publishText("hello world from strategy pattern");
    }
}
```

```python
from abc import ABC, abstractmethod

class TextFormatter(ABC):
    @abstractmethod
    def format(self, text: str) -> str:
        pass

class UpperCaseFormatter(TextFormatter):
    def format(self, text: str) -> str:
        return text.upper()

class LowerCaseFormatter(TextFormatter):
    def format(self, text: str) -> str:
        return text.lower()

class TitleCaseFormatter(TextFormatter):
    def format(self, text: str) -> str:
        return text.title()

class TextEditor:
    def __init__(self, formatter: TextFormatter):
        self._formatter = formatter

    def set_formatter(self, formatter: TextFormatter):
        self._formatter = formatter

    def publish_text(self, text: str):
        print(self._formatter.format(text))

if __name__ == "__main__":
    editor = TextEditor(UpperCaseFormatter())
    editor.publish_text("hello world from strategy pattern")

    editor.set_formatter(LowerCaseFormatter())
    editor.publish_text("Hello World From Strategy Pattern")

    editor.set_formatter(TitleCaseFormatter())
    editor.publish_text("hello world from strategy pattern")
```

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

class TextFormatter {
public:
    virtual ~TextFormatter() {}
    virtual string format(const string& text) = 0;
};

class UpperCaseFormatter : public TextFormatter {
public:
    string format(const string& text) override {
        string result = text;
        transform(result.begin(), result.end(), result.begin(), ::toupper);
        return result;
    }
};

class LowerCaseFormatter : public TextFormatter {
public:
    string format(const string& text) override {
        string result = text;
        transform(result.begin(), result.end(), result.begin(), ::tolower);
        return result;
    }
};

class TitleCaseFormatter : public TextFormatter {
public:
    string format(const string& text) override {
        string result = text;
        transform(result.begin(), result.end(), result.begin(), ::tolower);
        bool capitalize = true;
        for (size_t i = 0; i < result.size(); i++) {
            if (capitalize && isalpha(result[i])) {
                result[i] = toupper(result[i]);
                capitalize = false;
            }
            if (result[i] == ' ') capitalize = true;
        }
        return result;
    }
};

class TextEditor {
private:
    TextFormatter* formatter;

public:
    TextEditor(TextFormatter* formatter) : formatter(formatter) {}

    void setFormatter(TextFormatter* formatter) {
        this->formatter = formatter;
    }

    void publishText(const string& text) {
        cout << formatter->format(text) << endl;
    }
};

int main() {
    UpperCaseFormatter upper;
    TextEditor editor(&upper);
    editor.publishText("hello world from strategy pattern");

    LowerCaseFormatter lower;
    editor.setFormatter(&lower);
    editor.publishText("Hello World From Strategy Pattern");

    TitleCaseFormatter title;
    editor.setFormatter(&title);
    editor.publishText("hello world from strategy pattern");

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type TextFormatter interface {
	Format(text string) string
}

type UpperCaseFormatter struct{}

func (f UpperCaseFormatter) Format(text string) string {
	return strings.ToUpper(text)
}

type LowerCaseFormatter struct{}

func (f LowerCaseFormatter) Format(text string) string {
	return strings.ToLower(text)
}

type TitleCaseFormatter struct{}

func (f TitleCaseFormatter) Format(text string) string {
	words := strings.Split(text, " ")
	for i, word := range words {
		if len(word) == 0 {
			continue
		}
		lower := strings.ToLower(word)
		words[i] = strings.ToUpper(lower[:1]) + lower[1:]
	}
	return strings.Join(words, " ")
}

type TextEditor struct {
	formatter TextFormatter
}

func NewTextEditor(formatter TextFormatter) *TextEditor {
	return &TextEditor{formatter: formatter}
}

func (e *TextEditor) SetFormatter(formatter TextFormatter) {
	e.formatter = formatter
}

func (e *TextEditor) PublishText(text string) {
	fmt.Println(e.formatter.Format(text))
}

func main() {
	editor := NewTextEditor(UpperCaseFormatter{})
	editor.PublishText("hello world from strategy pattern")

	editor.SetFormatter(LowerCaseFormatter{})
	editor.PublishText("Hello World From Strategy Pattern")

	editor.SetFormatter(TitleCaseFormatter{})
	editor.PublishText("hello world from strategy pattern")
}
```

```csharp
using System;
using System.Globalization;

interface ITextFormatter
{
    string Format(string text);
}

class UpperCaseFormatter : ITextFormatter
{
    public string Format(string text) => text.ToUpper();
}

class LowerCaseFormatter : ITextFormatter
{
    public string Format(string text) => text.ToLower();
}

class TitleCaseFormatter : ITextFormatter
{
    public string Format(string text)
    {
        return CultureInfo.CurrentCulture.TextInfo.ToTitleCase(text.ToLower());
    }
}

class TextEditor
{
    private ITextFormatter _formatter;

    public TextEditor(ITextFormatter formatter)
    {
        _formatter = formatter;
    }

    public void SetFormatter(ITextFormatter formatter)
    {
        _formatter = formatter;
    }

    public void PublishText(string text)
    {
        Console.WriteLine(_formatter.Format(text));
    }
}

class Program
{
    static void Main(string[] args)
    {
        TextEditor editor = new TextEditor(new UpperCaseFormatter());
        editor.PublishText("hello world from strategy pattern");

        editor.SetFormatter(new LowerCaseFormatter());
        editor.PublishText("Hello World From Strategy Pattern");

        editor.SetFormatter(new TitleCaseFormatter());
        editor.PublishText("hello world from strategy pattern");
    }
}
```

```typescript
interface TextFormatter {
    format(text: string): string;
}

class UpperCaseFormatter implements TextFormatter {
    format(text: string): string {
        return text.toUpperCase();
    }
}

class LowerCaseFormatter implements TextFormatter {
    format(text: string): string {
        return text.toLowerCase();
    }
}

class TitleCaseFormatter implements TextFormatter {
    format(text: string): string {
        return text.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    }
}

class TextEditor {
    private formatter: TextFormatter;

    constructor(formatter: TextFormatter) {
        this.formatter = formatter;
    }

    setFormatter(formatter: TextFormatter): void {
        this.formatter = formatter;
    }

    publishText(text: string): void {
        console.log(this.formatter.format(text));
    }
}

const editor = new TextEditor(new UpperCaseFormatter());
editor.publishText("hello world from strategy pattern");

editor.setFormatter(new LowerCaseFormatter());
editor.publishText("Hello World From Strategy Pattern");

editor.setFormatter(new TitleCaseFormatter());
editor.publishText("hello world from strategy pattern");
```

---

# Exercise 2: Discount Calculator

> [!PAYWALL] This content is for premium members only.

Build a discount system for an e-commerce checkout where different discount strategies calculate the final price differently. The `ShoppingCart` should be able to switch between discount strategies at runtime, allowing the same cart to apply different promotions depending on the situation.

**Requirements:**

- Strategy interface: `DiscountStrategy` with a method `applyDiscount(price)` that returns the discounted price
- Concrete strategies:
   - `NoDiscount` - returns the original price unchanged
   - `PercentageDiscount` - takes a percentage (e.g., 20) and reduces the price by that percent
   - `FlatDiscount` - takes a fixed amount and subtracts it from the price (minimum $0)
- Context: `ShoppingCart` with `setDiscountStrategy()` and `checkout(price)` that prints the original and final price

```java
interface DiscountStrategy {
    double applyDiscount(double price);
}

class NoDiscount implements DiscountStrategy {
    @Override
    public double applyDiscount(double price) {
        return 0; // TODO: Return the original price unchanged
    }
}

class PercentageDiscount implements DiscountStrategy {
    private double percentage;

    public PercentageDiscount(double percentage) {
        this.percentage = percentage;
    }

    @Override
    public double applyDiscount(double price) {
        return 0; // TODO: Return price * (1 - percentage / 100)
    }
}

class FlatDiscount implements DiscountStrategy {
    private double amount;

    public FlatDiscount(double amount) {
        this.amount = amount;
    }

    @Override
    public double applyDiscount(double price) {
        return 0; // TODO: Return Math.max(0, price - amount)
    }
}

class ShoppingCart {
    private DiscountStrategy discountStrategy;

    public ShoppingCart(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public void setDiscountStrategy(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public void checkout(double price) {
        double finalPrice = discountStrategy.applyDiscount(price);
        System.out.printf("Original: $%.2f | Final: $%.2f%n", price, finalPrice);
    }
}

public class Main {
    public static void main(String[] args) {
        // ShoppingCart cart = new ShoppingCart(new NoDiscount());
        // cart.checkout(100.00);

        // cart.setDiscountStrategy(new PercentageDiscount(20));
        // cart.checkout(100.00);

        // cart.setDiscountStrategy(new FlatDiscount(15.00));
        // cart.checkout(100.00);
    }
}
```

```python
from abc import ABC, abstractmethod

class DiscountStrategy(ABC):
    @abstractmethod
    def apply_discount(self, price: float) -> float:
        pass

class NoDiscount(DiscountStrategy):
    def apply_discount(self, price: float) -> float:
        pass  # TODO: Return the original price unchanged

class PercentageDiscount(DiscountStrategy):
    def __init__(self, percentage: float):
        self._percentage = percentage

    def apply_discount(self, price: float) -> float:
        pass  # TODO: Return price * (1 - percentage / 100)

class FlatDiscount(DiscountStrategy):
    def __init__(self, amount: float):
        self._amount = amount

    def apply_discount(self, price: float) -> float:
        pass  # TODO: Return max(0, price - amount)

class ShoppingCart:
    def __init__(self, discount_strategy: DiscountStrategy):
        self._discount_strategy = discount_strategy

    def set_discount_strategy(self, discount_strategy: DiscountStrategy):
        self._discount_strategy = discount_strategy

    def checkout(self, price: float):
        final_price = self._discount_strategy.apply_discount(price)
        print(f"Original: ${price:.2f} | Final: ${final_price:.2f}")

if __name__ == "__main__":
    pass
    # cart = ShoppingCart(NoDiscount())
    # cart.checkout(100.00)

    # cart.set_discount_strategy(PercentageDiscount(20))
    # cart.checkout(100.00)

    # cart.set_discount_strategy(FlatDiscount(15.00))
    # cart.checkout(100.00)
```

```cpp
#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

class DiscountStrategy {
public:
    virtual ~DiscountStrategy() {}
    virtual double applyDiscount(double price) = 0;
};

class NoDiscount : public DiscountStrategy {
public:
    double applyDiscount(double price) override {
        return 0; // TODO: Return the original price unchanged
    }
};

class PercentageDiscount : public DiscountStrategy {
    double percentage;
public:
    PercentageDiscount(double percentage) : percentage(percentage) {}
    double applyDiscount(double price) override {
        return 0; // TODO: Return price * (1 - percentage / 100)
    }
};

class FlatDiscount : public DiscountStrategy {
    double amount;
public:
    FlatDiscount(double amount) : amount(amount) {}
    double applyDiscount(double price) override {
        return 0; // TODO: Return max(0.0, price - amount)
    }
};

class ShoppingCart {
private:
    DiscountStrategy* discountStrategy;

public:
    ShoppingCart(DiscountStrategy* strategy) : discountStrategy(strategy) {}

    void setDiscountStrategy(DiscountStrategy* strategy) {
        discountStrategy = strategy;
    }

    void checkout(double price) {
        double finalPrice = discountStrategy->applyDiscount(price);
        printf("Original: $%.2f | Final: $%.2f\n", price, finalPrice);
    }
};

int main() {
    // NoDiscount noDiscount;
    // ShoppingCart cart(&noDiscount);
    // cart.checkout(100.00);

    // PercentageDiscount percentage(20);
    // cart.setDiscountStrategy(&percentage);
    // cart.checkout(100.00);

    // FlatDiscount flat(15.00);
    // cart.setDiscountStrategy(&flat);
    // cart.checkout(100.00);

    return 0;
}
```

```go
package main

import "fmt"

type DiscountStrategy interface {
	ApplyDiscount(price float64) float64
}

type NoDiscount struct{}

func (n *NoDiscount) ApplyDiscount(price float64) float64 {
	return 0 // TODO: Return the original price unchanged
}

type PercentageDiscount struct {
	percentage float64
}

func NewPercentageDiscount(percentage float64) *PercentageDiscount {
	return &PercentageDiscount{percentage: percentage}
}

func (p *PercentageDiscount) ApplyDiscount(price float64) float64 {
	return 0 // TODO: Return price * (1 - percentage / 100)
}

type FlatDiscount struct {
	amount float64
}

func NewFlatDiscount(amount float64) *FlatDiscount {
	return &FlatDiscount{amount: amount}
}

func (f *FlatDiscount) ApplyDiscount(price float64) float64 {
	return 0 // TODO: Return max(0, price - amount)
}

type ShoppingCart struct {
	discountStrategy DiscountStrategy
}

func NewShoppingCart(discountStrategy DiscountStrategy) *ShoppingCart {
	return &ShoppingCart{discountStrategy: discountStrategy}
}

func (s *ShoppingCart) SetDiscountStrategy(discountStrategy DiscountStrategy) {
	s.discountStrategy = discountStrategy
}

func (s *ShoppingCart) Checkout(price float64) {
	finalPrice := s.discountStrategy.ApplyDiscount(price)
	fmt.Printf("Original: $%.2f | Final: $%.2f\n", price, finalPrice)
}

func main() {
	// cart := NewShoppingCart(&NoDiscount{})
	// cart.Checkout(100.00)

	// cart.SetDiscountStrategy(NewPercentageDiscount(20))
	// cart.Checkout(100.00)

	// cart.SetDiscountStrategy(NewFlatDiscount(15.00))
	// cart.Checkout(100.00)
}
```

```csharp
using System;

interface IDiscountStrategy
{
    double ApplyDiscount(double price);
}

class NoDiscount : IDiscountStrategy
{
    public double ApplyDiscount(double price)
    {
        return 0; // TODO: Return the original price unchanged
    }
}

class PercentageDiscount : IDiscountStrategy
{
    private readonly double _percentage;
    public PercentageDiscount(double percentage) { _percentage = percentage; }
    public double ApplyDiscount(double price)
    {
        return 0; // TODO: Return price * (1 - percentage / 100)
    }
}

class FlatDiscount : IDiscountStrategy
{
    private readonly double _amount;
    public FlatDiscount(double amount) { _amount = amount; }
    public double ApplyDiscount(double price)
    {
        return 0; // TODO: Return Math.Max(0, price - amount)
    }
}

class ShoppingCart
{
    private IDiscountStrategy _discountStrategy;

    public ShoppingCart(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }

    public void SetDiscountStrategy(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }

    public void Checkout(double price)
    {
        double finalPrice = _discountStrategy.ApplyDiscount(price);
        Console.WriteLine($"Original: ${price:F2} | Final: ${finalPrice:F2}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        // ShoppingCart cart = new ShoppingCart(new NoDiscount());
        // cart.Checkout(100.00);

        // cart.SetDiscountStrategy(new PercentageDiscount(20));
        // cart.Checkout(100.00);

        // cart.SetDiscountStrategy(new FlatDiscount(15.00));
        // cart.Checkout(100.00);
    }
}
```

```typescript
interface DiscountStrategy {
    applyDiscount(price: number): number;
}

class NoDiscount implements DiscountStrategy {
    applyDiscount(price: number): number {
        return 0; // TODO: Return the original price unchanged
    }
}

class PercentageDiscount implements DiscountStrategy {
    private percentage: number;
    constructor(percentage: number) {
        this.percentage = percentage;
    }
    applyDiscount(price: number): number {
        return 0; // TODO: Return price * (1 - percentage / 100)
    }
}

class FlatDiscount implements DiscountStrategy {
    private amount: number;
    constructor(amount: number) {
        this.amount = amount;
    }
    applyDiscount(price: number): number {
        return 0; // TODO: Return Math.max(0, price - amount)
    }
}

class ShoppingCart {
    private discountStrategy: DiscountStrategy;

    constructor(discountStrategy: DiscountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    setDiscountStrategy(discountStrategy: DiscountStrategy): void {
        this.discountStrategy = discountStrategy;
    }

    checkout(price: number): void {
        const finalPrice = this.discountStrategy.applyDiscount(price);
        console.log(`Original: $${price.toFixed(2)} | Final: $${finalPrice.toFixed(2)}`);
    }
}

// const cart = new ShoppingCart(new NoDiscount());
// cart.checkout(100.00);

// cart.setDiscountStrategy(new PercentageDiscount(20));
// cart.checkout(100.00);

// cart.setDiscountStrategy(new FlatDiscount(15.00));
// cart.checkout(100.00);
```

#### Solutions

```java
interface DiscountStrategy {
    double applyDiscount(double price);
}

class NoDiscount implements DiscountStrategy {
    public double applyDiscount(double price) {
        return price;
    }
}

class PercentageDiscount implements DiscountStrategy {
    private double percentage;

    public PercentageDiscount(double percentage) {
        this.percentage = percentage;
    }

    public double applyDiscount(double price) {
        return price * (1 - percentage / 100);
    }
}

class FlatDiscount implements DiscountStrategy {
    private double amount;

    public FlatDiscount(double amount) {
        this.amount = amount;
    }

    public double applyDiscount(double price) {
        return Math.max(0, price - amount);
    }
}

class ShoppingCart {
    private DiscountStrategy discountStrategy;

    public ShoppingCart(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public void setDiscountStrategy(DiscountStrategy discountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    public void checkout(double price) {
        double finalPrice = discountStrategy.applyDiscount(price);
        System.out.printf("Original: $%.2f | Final: $%.2f%n", price, finalPrice);
    }
}

public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart(new NoDiscount());
        cart.checkout(100.00);

        cart.setDiscountStrategy(new PercentageDiscount(20));
        cart.checkout(100.00);

        cart.setDiscountStrategy(new FlatDiscount(15.00));
        cart.checkout(100.00);
    }
}
```

```python
from abc import ABC, abstractmethod

class DiscountStrategy(ABC):
    @abstractmethod
    def apply_discount(self, price: float) -> float:
        pass

class NoDiscount(DiscountStrategy):
    def apply_discount(self, price: float) -> float:
        return price

class PercentageDiscount(DiscountStrategy):
    def __init__(self, percentage: float):
        self._percentage = percentage

    def apply_discount(self, price: float) -> float:
        return price * (1 - self._percentage / 100)

class FlatDiscount(DiscountStrategy):
    def __init__(self, amount: float):
        self._amount = amount

    def apply_discount(self, price: float) -> float:
        return max(0, price - self._amount)

class ShoppingCart:
    def __init__(self, discount_strategy: DiscountStrategy):
        self._discount_strategy = discount_strategy

    def set_discount_strategy(self, discount_strategy: DiscountStrategy):
        self._discount_strategy = discount_strategy

    def checkout(self, price: float):
        final_price = self._discount_strategy.apply_discount(price)
        print(f"Original: ${price:.2f} | Final: ${final_price:.2f}")

if __name__ == "__main__":
    cart = ShoppingCart(NoDiscount())
    cart.checkout(100.00)

    cart.set_discount_strategy(PercentageDiscount(20))
    cart.checkout(100.00)

    cart.set_discount_strategy(FlatDiscount(15.00))
    cart.checkout(100.00)
```

```cpp
#include <iostream>
#include <cstdio>
#include <algorithm>
using namespace std;

class DiscountStrategy {
public:
    virtual ~DiscountStrategy() {}
    virtual double applyDiscount(double price) = 0;
};

class NoDiscount : public DiscountStrategy {
public:
    double applyDiscount(double price) override {
        return price;
    }
};

class PercentageDiscount : public DiscountStrategy {
    double percentage;
public:
    PercentageDiscount(double percentage) : percentage(percentage) {}
    double applyDiscount(double price) override {
        return price * (1 - percentage / 100);
    }
};

class FlatDiscount : public DiscountStrategy {
    double amount;
public:
    FlatDiscount(double amount) : amount(amount) {}
    double applyDiscount(double price) override {
        return max(0.0, price - amount);
    }
};

class ShoppingCart {
private:
    DiscountStrategy* discountStrategy;

public:
    ShoppingCart(DiscountStrategy* strategy) : discountStrategy(strategy) {}

    void setDiscountStrategy(DiscountStrategy* strategy) {
        discountStrategy = strategy;
    }

    void checkout(double price) {
        double finalPrice = discountStrategy->applyDiscount(price);
        printf("Original: $%.2f | Final: $%.2f\n", price, finalPrice);
    }
};

int main() {
    NoDiscount noDiscount;
    ShoppingCart cart(&noDiscount);
    cart.checkout(100.00);

    PercentageDiscount percentage(20);
    cart.setDiscountStrategy(&percentage);
    cart.checkout(100.00);

    FlatDiscount flat(15.00);
    cart.setDiscountStrategy(&flat);
    cart.checkout(100.00);

    return 0;
}
```

```go
package main

import (
	"fmt"
	"math"
)

type DiscountStrategy interface {
	ApplyDiscount(price float64) float64
}

type NoDiscount struct{}

func (n NoDiscount) ApplyDiscount(price float64) float64 {
	return price
}

type PercentageDiscount struct {
	percentage float64
}

func NewPercentageDiscount(percentage float64) *PercentageDiscount {
	return &PercentageDiscount{percentage: percentage}
}

func (p *PercentageDiscount) ApplyDiscount(price float64) float64 {
	return price * (1 - p.percentage/100)
}

type FlatDiscount struct {
	amount float64
}

func NewFlatDiscount(amount float64) *FlatDiscount {
	return &FlatDiscount{amount: amount}
}

func (f *FlatDiscount) ApplyDiscount(price float64) float64 {
	return math.Max(0, price-f.amount)
}

type ShoppingCart struct {
	discountStrategy DiscountStrategy
}

func NewShoppingCart(discountStrategy DiscountStrategy) *ShoppingCart {
	return &ShoppingCart{discountStrategy: discountStrategy}
}

func (s *ShoppingCart) SetDiscountStrategy(discountStrategy DiscountStrategy) {
	s.discountStrategy = discountStrategy
}

func (s *ShoppingCart) Checkout(price float64) {
	finalPrice := s.discountStrategy.ApplyDiscount(price)
	fmt.Printf("Original: $%.2f | Final: $%.2f\n", price, finalPrice)
}

func main() {
	cart := NewShoppingCart(NoDiscount{})
	cart.Checkout(100.00)

	cart.SetDiscountStrategy(NewPercentageDiscount(20))
	cart.Checkout(100.00)

	cart.SetDiscountStrategy(NewFlatDiscount(15.00))
	cart.Checkout(100.00)
}
```

```csharp
using System;

interface IDiscountStrategy
{
    double ApplyDiscount(double price);
}

class NoDiscount : IDiscountStrategy
{
    public double ApplyDiscount(double price) => price;
}

class PercentageDiscount : IDiscountStrategy
{
    private readonly double _percentage;
    public PercentageDiscount(double percentage) { _percentage = percentage; }
    public double ApplyDiscount(double price) => price * (1 - _percentage / 100);
}

class FlatDiscount : IDiscountStrategy
{
    private readonly double _amount;
    public FlatDiscount(double amount) { _amount = amount; }
    public double ApplyDiscount(double price) => Math.Max(0, price - _amount);
}

class ShoppingCart
{
    private IDiscountStrategy _discountStrategy;

    public ShoppingCart(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }

    public void SetDiscountStrategy(IDiscountStrategy discountStrategy)
    {
        _discountStrategy = discountStrategy;
    }

    public void Checkout(double price)
    {
        double finalPrice = _discountStrategy.ApplyDiscount(price);
        Console.WriteLine($"Original: ${price:F2} | Final: ${finalPrice:F2}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        ShoppingCart cart = new ShoppingCart(new NoDiscount());
        cart.Checkout(100.00);

        cart.SetDiscountStrategy(new PercentageDiscount(20));
        cart.Checkout(100.00);

        cart.SetDiscountStrategy(new FlatDiscount(15.00));
        cart.Checkout(100.00);
    }
}
```

```typescript
interface DiscountStrategy {
    applyDiscount(price: number): number;
}

class NoDiscount implements DiscountStrategy {
    applyDiscount(price: number): number { return price; }
}

class PercentageDiscount implements DiscountStrategy {
    private percentage: number;
    constructor(percentage: number) {
        this.percentage = percentage;
    }
    applyDiscount(price: number): number {
        return price * (1 - this.percentage / 100);
    }
}

class FlatDiscount implements DiscountStrategy {
    private amount: number;
    constructor(amount: number) {
        this.amount = amount;
    }
    applyDiscount(price: number): number {
        return Math.max(0, price - this.amount);
    }
}

class ShoppingCart {
    private discountStrategy: DiscountStrategy;

    constructor(discountStrategy: DiscountStrategy) {
        this.discountStrategy = discountStrategy;
    }

    setDiscountStrategy(discountStrategy: DiscountStrategy): void {
        this.discountStrategy = discountStrategy;
    }

    checkout(price: number): void {
        const finalPrice = this.discountStrategy.applyDiscount(price);
        console.log(`Original: $${price.toFixed(2)} | Final: $${finalPrice.toFixed(2)}`);
    }
}

const cart = new ShoppingCart(new NoDiscount());
cart.checkout(100.00);

cart.setDiscountStrategy(new PercentageDiscount(20));
cart.checkout(100.00);

cart.setDiscountStrategy(new FlatDiscount(15.00));
cart.checkout(100.00);
```

---

# Exercise 3: Sorting Strategy

Build a sorting system where different strategies sort an array of integers using different algorithms. Each strategy prints the algorithm name before sorting and returns the sorted result. The challenge adds a timing decorator that wraps any sort strategy and measures its execution time, combining the Strategy pattern with the Decorator pattern.

**Requirements:**

- Strategy interface `SortStrategy` with a method `sort(array)` that returns a sorted copy of the input array
- Three concrete strategies:
   - `BubbleSortStrategy` - implements actual bubble sort, prints `"Using Bubble Sort"`
   - `MergeSortStrategy` - uses the language's built-in sort as a simulation, prints `"Using Merge Sort"`
   - `QuickSortStrategy` - uses the language's built-in sort as a simulation, prints `"Using Quick Sort"`
- Context class `Sorter` with `setStrategy()` and `sortArray(array)` that prints the sorted result
- **Challenge:** Create a `TimedSortStrategy` that wraps any `SortStrategy`, delegates the sort call, measures the elapsed time, and prints it. This combines Strategy with the Decorator pattern since the wrapper itself implements the same strategy interface.

```java
import java.util.Arrays;

interface SortStrategy {
    int[] sort(int[] array);
}

class BubbleSortStrategy implements SortStrategy {
    @Override
    public int[] sort(int[] array) {
        System.out.println("Using Bubble Sort");
        int[] arr = array.clone();
        // TODO: Implement bubble sort on arr using nested loops
        return arr;
    }
}

class MergeSortStrategy implements SortStrategy {
    @Override
    public int[] sort(int[] array) {
        System.out.println("Using Merge Sort");
        int[] arr = array.clone();
        // TODO: Sort arr (can use Arrays.sort())
        return arr;
    }
}

class QuickSortStrategy implements SortStrategy {
    @Override
    public int[] sort(int[] array) {
        System.out.println("Using Quick Sort");
        int[] arr = array.clone();
        // TODO: Sort arr (can use Arrays.sort())
        return arr;
    }
}

class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void sortArray(int[] array) {
        int[] result = strategy.sort(array);
        System.out.println("Result: " + Arrays.toString(result));
    }
}

// TODO (Challenge): Implement TimedSortStrategy that wraps another SortStrategy
// class TimedSortStrategy implements SortStrategy {
//     private SortStrategy inner;
//     public TimedSortStrategy(SortStrategy inner) { this.inner = inner; }
//     public int[] sort(int[] array) {
//         // measure time, delegate to inner, print elapsed time
//     }
// }

public class Main {
    public static void main(String[] args) {
        int[] data = {38, 27, 43, 3, 9, 82, 10};

        // Sorter sorter = new Sorter(new BubbleSortStrategy());
        // sorter.sortArray(data.clone());

        // sorter.setStrategy(new MergeSortStrategy());
        // sorter.sortArray(data.clone());

        // sorter.setStrategy(new QuickSortStrategy());
        // sorter.sortArray(data.clone());

        // Challenge: Wrap with timed decorator
        // sorter.setStrategy(new TimedSortStrategy(new BubbleSortStrategy()));
        // sorter.sortArray(data.clone());
    }
}
```

```python
import time
from abc import ABC, abstractmethod

class SortStrategy(ABC):
    @abstractmethod
    def sort(self, array: list[int]) -> list[int]:
        pass

class BubbleSortStrategy(SortStrategy):
    def sort(self, array: list[int]) -> list[int]:
        print("Using Bubble Sort")
        arr = array.copy()
        # TODO: Implement bubble sort on arr using nested loops
        return arr

class MergeSortStrategy(SortStrategy):
    def sort(self, array: list[int]) -> list[int]:
        print("Using Merge Sort")
        pass  # TODO: Return sorted(array)

class QuickSortStrategy(SortStrategy):
    def sort(self, array: list[int]) -> list[int]:
        print("Using Quick Sort")
        pass  # TODO: Return sorted(array)

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: SortStrategy):
        self._strategy = strategy

    def sort_array(self, array: list[int]):
        result = self._strategy.sort(array)
        print(f"Result: {result}")

# TODO (Challenge): Implement TimedSortStrategy that wraps another SortStrategy
# class TimedSortStrategy(SortStrategy):
#     def __init__(self, inner: SortStrategy):
#         self._inner = inner
#
#     def sort(self, array: list[int]) -> list[int]:
#         # measure time, delegate to inner, print elapsed time
#         pass

if __name__ == "__main__":
    data = [38, 27, 43, 3, 9, 82, 10]

    # sorter = Sorter(BubbleSortStrategy())
    # sorter.sort_array(data.copy())

    # sorter.set_strategy(MergeSortStrategy())
    # sorter.sort_array(data.copy())

    # sorter.set_strategy(QuickSortStrategy())
    # sorter.sort_array(data.copy())

    # Challenge: Wrap with timed decorator
    # sorter.set_strategy(TimedSortStrategy(BubbleSortStrategy()))
    # sorter.sort_array(data.copy())
    pass
```

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
using namespace std;

class SortStrategy {
public:
    virtual ~SortStrategy() {}
    virtual vector<int> sort(vector<int> array) = 0;
};

class BubbleSortStrategy : public SortStrategy {
public:
    vector<int> sort(vector<int> array) override {
        cout << "Using Bubble Sort" << endl;
        // TODO: Implement bubble sort on array using nested loops
        return array;
    }
};

class MergeSortStrategy : public SortStrategy {
public:
    vector<int> sort(vector<int> array) override {
        cout << "Using Merge Sort" << endl;
        // TODO: Sort array (can use std::sort())
        return array;
    }
};

class QuickSortStrategy : public SortStrategy {
public:
    vector<int> sort(vector<int> array) override {
        cout << "Using Quick Sort" << endl;
        // TODO: Sort array (can use std::sort())
        return array;
    }
};

class Sorter {
private:
    SortStrategy* strategy;

public:
    Sorter(SortStrategy* strategy) : strategy(strategy) {}

    void setStrategy(SortStrategy* strategy) {
        this->strategy = strategy;
    }

    void sortArray(vector<int> array) {
        vector<int> result = strategy->sort(array);
        cout << "Result: [";
        for (size_t i = 0; i < result.size(); i++) {
            if (i > 0) cout << ", ";
            cout << result[i];
        }
        cout << "]" << endl;
    }
};

// TODO (Challenge): Implement TimedSortStrategy that wraps another SortStrategy
// class TimedSortStrategy : public SortStrategy {
// private:
//     SortStrategy* inner;
// public:
//     TimedSortStrategy(SortStrategy* inner) : inner(inner) {}
//     vector<int> sort(vector<int> array) override {
//         // measure time with chrono, delegate to inner, print elapsed time
//     }
// };

int main() {
    vector<int> data = {38, 27, 43, 3, 9, 82, 10};

    // BubbleSortStrategy bubble;
    // Sorter sorter(&bubble);
    // sorter.sortArray(data);

    // MergeSortStrategy merge;
    // sorter.setStrategy(&merge);
    // sorter.sortArray(data);

    // QuickSortStrategy quick;
    // sorter.setStrategy(&quick);
    // sorter.sortArray(data);

    // Challenge: Wrap with timed decorator
    // BubbleSortStrategy bubble2;
    // TimedSortStrategy timed(&bubble2);
    // sorter.setStrategy(&timed);
    // sorter.sortArray(data);

    return 0;
}
```

```go
package main

import (
	"fmt"
)

type SortStrategy interface {
	Sort(array []int) []int
}

type BubbleSortStrategy struct{}

func (b *BubbleSortStrategy) Sort(array []int) []int {
	fmt.Println("Using Bubble Sort")
	arr := append([]int(nil), array...)
	// TODO: Implement bubble sort on arr using nested loops
	return arr
}

type MergeSortStrategy struct{}

func (m *MergeSortStrategy) Sort(array []int) []int {
	fmt.Println("Using Merge Sort")
	arr := append([]int(nil), array...)
	// TODO: Sort arr (can use sort.Ints())
	return arr
}

type QuickSortStrategy struct{}

func (q *QuickSortStrategy) Sort(array []int) []int {
	fmt.Println("Using Quick Sort")
	arr := append([]int(nil), array...)
	// TODO: Sort arr (can use sort.Ints())
	return arr
}

type Sorter struct {
	strategy SortStrategy
}

func NewSorter(strategy SortStrategy) *Sorter {
	return &Sorter{strategy: strategy}
}

func (s *Sorter) SetStrategy(strategy SortStrategy) {
	s.strategy = strategy
}

func (s *Sorter) SortArray(array []int) {
	result := s.strategy.Sort(array)
	fmt.Printf("Result: %v\n", result)
}

// TODO (Challenge): Implement TimedSortStrategy that wraps another SortStrategy
// type TimedSortStrategy struct {
// 	inner SortStrategy
// }
//
// func NewTimedSortStrategy(inner SortStrategy) *TimedSortStrategy {
// 	return &TimedSortStrategy{inner: inner}
// }
//
// func (t *TimedSortStrategy) Sort(array []int) []int {
// 	// measure time, delegate to inner, print elapsed time
// 	return nil
// }

func main() {
	data := []int{38, 27, 43, 3, 9, 82, 10}

	// sorter := NewSorter(&BubbleSortStrategy{})
	// sorter.SortArray(append([]int(nil), data...))

	// sorter.SetStrategy(&MergeSortStrategy{})
	// sorter.SortArray(append([]int(nil), data...))

	// sorter.SetStrategy(&QuickSortStrategy{})
	// sorter.SortArray(append([]int(nil), data...))

	// Challenge: Wrap with timed decorator
	// sorter.SetStrategy(NewTimedSortStrategy(&BubbleSortStrategy{}))
	// sorter.SortArray(append([]int(nil), data...))
}
```

```csharp
using System;
using System.Diagnostics;

interface ISortStrategy
{
    int[] Sort(int[] array);
}

class BubbleSortStrategy : ISortStrategy
{
    public int[] Sort(int[] array)
    {
        Console.WriteLine("Using Bubble Sort");
        int[] arr = (int[])array.Clone();
        // TODO: Implement bubble sort on arr using nested loops
        return arr;
    }
}

class MergeSortStrategy : ISortStrategy
{
    public int[] Sort(int[] array)
    {
        Console.WriteLine("Using Merge Sort");
        int[] arr = (int[])array.Clone();
        // TODO: Sort arr (can use Array.Sort())
        return arr;
    }
}

class QuickSortStrategy : ISortStrategy
{
    public int[] Sort(int[] array)
    {
        Console.WriteLine("Using Quick Sort");
        int[] arr = (int[])array.Clone();
        // TODO: Sort arr (can use Array.Sort())
        return arr;
    }
}

class Sorter
{
    private ISortStrategy _strategy;

    public Sorter(ISortStrategy strategy)
    {
        _strategy = strategy;
    }

    public void SetStrategy(ISortStrategy strategy)
    {
        _strategy = strategy;
    }

    public void SortArray(int[] array)
    {
        int[] result = _strategy.Sort(array);
        Console.WriteLine("Result: [" + string.Join(", ", result) + "]");
    }
}

// TODO (Challenge): Implement TimedSortStrategy that wraps another ISortStrategy
// class TimedSortStrategy : ISortStrategy
// {
//     private ISortStrategy _inner;
//     public TimedSortStrategy(ISortStrategy inner) { _inner = inner; }
//     public int[] Sort(int[] array)
//     {
//         // measure time with Stopwatch, delegate to inner, print elapsed time
//     }
// }

class Program
{
    static void Main(string[] args)
    {
        int[] data = {38, 27, 43, 3, 9, 82, 10};

        // Sorter sorter = new Sorter(new BubbleSortStrategy());
        // sorter.SortArray((int[])data.Clone());

        // sorter.SetStrategy(new MergeSortStrategy());
        // sorter.SortArray((int[])data.Clone());

        // sorter.SetStrategy(new QuickSortStrategy());
        // sorter.SortArray((int[])data.Clone());

        // Challenge: Wrap with timed decorator
        // sorter.SetStrategy(new TimedSortStrategy(new BubbleSortStrategy()));
        // sorter.SortArray((int[])data.Clone());
    }
}
```

```typescript
interface SortStrategy {
    sort(array: number[]): number[];
}

class BubbleSortStrategy implements SortStrategy {
    sort(array: number[]): number[] {
        console.log("Using Bubble Sort");
        const arr = Array.from(array);
        // TODO: Implement bubble sort on arr using nested loops
        return arr;
    }
}

class MergeSortStrategy implements SortStrategy {
    sort(array: number[]): number[] {
        console.log("Using Merge Sort");
        const arr = Array.from(array);
        // TODO: Sort arr (can use arr.sort((a, b) => a - b))
        return arr;
    }
}

class QuickSortStrategy implements SortStrategy {
    sort(array: number[]): number[] {
        console.log("Using Quick Sort");
        const arr = Array.from(array);
        // TODO: Sort arr (can use arr.sort((a, b) => a - b))
        return arr;
    }
}

class Sorter {
    private strategy: SortStrategy;

    constructor(strategy: SortStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: SortStrategy): void {
        this.strategy = strategy;
    }

    sortArray(array: number[]): void {
        const result = this.strategy.sort(array);
        console.log("Result: [" + result.join(", ") + "]");
    }
}

// TODO (Challenge): Implement TimedSortStrategy that wraps another SortStrategy
// class TimedSortStrategy implements SortStrategy {
//     private inner: SortStrategy;
//     constructor(inner: SortStrategy) { this.inner = inner; }
//     sort(array: number[]): number[] {
//         // measure time with performance.now(), delegate to inner, print elapsed time
//     }
// }

// const data = [38, 27, 43, 3, 9, 82, 10];

// const sorter = new Sorter(new BubbleSortStrategy());
// sorter.sortArray(Array.from(data));

// sorter.setStrategy(new MergeSortStrategy());
// sorter.sortArray(Array.from(data));

// sorter.setStrategy(new QuickSortStrategy());
// sorter.sortArray(Array.from(data));

// Challenge: Wrap with timed decorator
// sorter.setStrategy(new TimedSortStrategy(new BubbleSortStrategy()));
// sorter.sortArray(Array.from(data));
```

#### Solutions

```java
import java.util.Arrays;

interface SortStrategy {
    int[] sort(int[] array);
}

class BubbleSortStrategy implements SortStrategy {
    public int[] sort(int[] array) {
        System.out.println("Using Bubble Sort");
        int[] arr = array.clone();
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        return arr;
    }
}

class MergeSortStrategy implements SortStrategy {
    public int[] sort(int[] array) {
        System.out.println("Using Merge Sort");
        int[] arr = array.clone();
        Arrays.sort(arr);
        return arr;
    }
}

class QuickSortStrategy implements SortStrategy {
    public int[] sort(int[] array) {
        System.out.println("Using Quick Sort");
        int[] arr = array.clone();
        Arrays.sort(arr);
        return arr;
    }
}

class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void sortArray(int[] array) {
        int[] result = strategy.sort(array);
        System.out.println("Result: " + Arrays.toString(result));
    }
}

class TimedSortStrategy implements SortStrategy {
    private SortStrategy inner;
    public TimedSortStrategy(SortStrategy inner) { this.inner = inner; }
    public int[] sort(int[] array) {
        long start = System.currentTimeMillis();
        int[] result = inner.sort(array);
        long elapsed = System.currentTimeMillis() - start;
        System.out.println("Sorting took " + elapsed + " ms");
        return result;
    }
}

public class Main {
    public static void main(String[] args) {
        int[] data = {38, 27, 43, 3, 9, 82, 10};

        Sorter sorter = new Sorter(new BubbleSortStrategy());
        sorter.sortArray(data.clone());

        sorter.setStrategy(new MergeSortStrategy());
        sorter.sortArray(data.clone());

        sorter.setStrategy(new QuickSortStrategy());
        sorter.sortArray(data.clone());

        // Challenge: Wrap with timed decorator
        sorter.setStrategy(new TimedSortStrategy(new BubbleSortStrategy()));
        sorter.sortArray(data.clone());
    }
}
```

```python
import time
from abc import ABC, abstractmethod

class SortStrategy(ABC):
    @abstractmethod
    def sort(self, array: list[int]) -> list[int]:
        pass

class BubbleSortStrategy(SortStrategy):
    def sort(self, array: list[int]) -> list[int]:
        print("Using Bubble Sort")
        arr = array.copy()
        n = len(arr)
        for i in range(n - 1):
            for j in range(n - i - 1):
                if arr[j] > arr[j + 1]:
                    arr[j], arr[j + 1] = arr[j + 1], arr[j]
        return arr

class MergeSortStrategy(SortStrategy):
    def sort(self, array: list[int]) -> list[int]:
        print("Using Merge Sort")
        return sorted(array)

class QuickSortStrategy(SortStrategy):
    def sort(self, array: list[int]) -> list[int]:
        print("Using Quick Sort")
        return sorted(array)

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self._strategy = strategy

    def set_strategy(self, strategy: SortStrategy):
        self._strategy = strategy

    def sort_array(self, array: list[int]):
        result = self._strategy.sort(array)
        print(f"Result: {result}")

class TimedSortStrategy(SortStrategy):
    def __init__(self, inner: SortStrategy):
        self._inner = inner

    def sort(self, array: list[int]) -> list[int]:
        start = time.time()
        result = self._inner.sort(array)
        elapsed = int((time.time() - start) * 1000)
        print(f"Sorting took {elapsed} ms")
        return result

if __name__ == "__main__":
    data = [38, 27, 43, 3, 9, 82, 10]

    sorter = Sorter(BubbleSortStrategy())
    sorter.sort_array(data.copy())

    sorter.set_strategy(MergeSortStrategy())
    sorter.sort_array(data.copy())

    sorter.set_strategy(QuickSortStrategy())
    sorter.sort_array(data.copy())

    # Challenge: Wrap with timed decorator
    sorter.set_strategy(TimedSortStrategy(BubbleSortStrategy()))
    sorter.sort_array(data.copy())
```

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <chrono>
using namespace std;

class SortStrategy {
public:
    virtual ~SortStrategy() {}
    virtual vector<int> sort(vector<int> array) = 0;
};

class BubbleSortStrategy : public SortStrategy {
public:
    vector<int> sort(vector<int> array) override {
        cout << "Using Bubble Sort" << endl;
        int n = array.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    swap(array[j], array[j + 1]);
                }
            }
        }
        return array;
    }
};

class MergeSortStrategy : public SortStrategy {
public:
    vector<int> sort(vector<int> array) override {
        cout << "Using Merge Sort" << endl;
        std::sort(array.begin(), array.end());
        return array;
    }
};

class QuickSortStrategy : public SortStrategy {
public:
    vector<int> sort(vector<int> array) override {
        cout << "Using Quick Sort" << endl;
        std::sort(array.begin(), array.end());
        return array;
    }
};

class Sorter {
private:
    SortStrategy* strategy;

public:
    Sorter(SortStrategy* strategy) : strategy(strategy) {}

    void setStrategy(SortStrategy* strategy) {
        this->strategy = strategy;
    }

    void sortArray(vector<int> array) {
        vector<int> result = strategy->sort(array);
        cout << "Result: [";
        for (size_t i = 0; i < result.size(); i++) {
            if (i > 0) cout << ", ";
            cout << result[i];
        }
        cout << "]" << endl;
    }
};

class TimedSortStrategy : public SortStrategy {
private:
    SortStrategy* inner;
public:
    TimedSortStrategy(SortStrategy* inner) : inner(inner) {}
    vector<int> sort(vector<int> array) override {
        auto start = chrono::high_resolution_clock::now();
        vector<int> result = inner->sort(array);
        auto end = chrono::high_resolution_clock::now();
        auto elapsed = chrono::duration_cast<chrono::milliseconds>(end - start).count();
        cout << "Sorting took " << elapsed << " ms" << endl;
        return result;
    }
};

int main() {
    vector<int> data = {38, 27, 43, 3, 9, 82, 10};

    BubbleSortStrategy bubble;
    Sorter sorter(&bubble);
    sorter.sortArray(data);

    MergeSortStrategy merge;
    sorter.setStrategy(&merge);
    sorter.sortArray(data);

    QuickSortStrategy quick;
    sorter.setStrategy(&quick);
    sorter.sortArray(data);

    // Challenge: Wrap with timed decorator
    BubbleSortStrategy bubble2;
    TimedSortStrategy timed(&bubble2);
    sorter.setStrategy(&timed);
    sorter.sortArray(data);

    return 0;
}
```

```go
package main

import (
	"fmt"
	"sort"
	"time"
)

type SortStrategy interface {
	Sort(array []int) []int
}

type BubbleSortStrategy struct{}

func (b *BubbleSortStrategy) Sort(array []int) []int {
	fmt.Println("Using Bubble Sort")
	arr := append([]int(nil), array...)
	n := len(arr)
	for i := 0; i < n-1; i++ {
		for j := 0; j < n-i-1; j++ {
			if arr[j] > arr[j+1] {
				arr[j], arr[j+1] = arr[j+1], arr[j]
			}
		}
	}
	return arr
}

type MergeSortStrategy struct{}

func (m *MergeSortStrategy) Sort(array []int) []int {
	fmt.Println("Using Merge Sort")
	arr := append([]int(nil), array...)
	sort.Ints(arr)
	return arr
}

type QuickSortStrategy struct{}

func (q *QuickSortStrategy) Sort(array []int) []int {
	fmt.Println("Using Quick Sort")
	arr := append([]int(nil), array...)
	sort.Ints(arr)
	return arr
}

type Sorter struct {
	strategy SortStrategy
}

func NewSorter(strategy SortStrategy) *Sorter {
	return &Sorter{strategy: strategy}
}

func (s *Sorter) SetStrategy(strategy SortStrategy) {
	s.strategy = strategy
}

func (s *Sorter) SortArray(array []int) {
	result := s.strategy.Sort(array)
	fmt.Printf("Result: %v\n", result)
}

type TimedSortStrategy struct {
	inner SortStrategy
}

func NewTimedSortStrategy(inner SortStrategy) *TimedSortStrategy {
	return &TimedSortStrategy{inner: inner}
}

func (t *TimedSortStrategy) Sort(array []int) []int {
	start := time.Now()
	result := t.inner.Sort(array)
	elapsed := time.Since(start).Milliseconds()
	fmt.Printf("Sorting took %d ms\n", elapsed)
	return result
}

func main() {
	data := []int{38, 27, 43, 3, 9, 82, 10}

	sorter := NewSorter(&BubbleSortStrategy{})
	sorter.SortArray(append([]int(nil), data...))

	sorter.SetStrategy(&MergeSortStrategy{})
	sorter.SortArray(append([]int(nil), data...))

	sorter.SetStrategy(&QuickSortStrategy{})
	sorter.SortArray(append([]int(nil), data...))

	// Challenge: Wrap with timed decorator
	sorter.SetStrategy(NewTimedSortStrategy(&BubbleSortStrategy{}))
	sorter.SortArray(append([]int(nil), data...))
}
```

```csharp
using System;
using System.Diagnostics;

interface ISortStrategy
{
    int[] Sort(int[] array);
}

class BubbleSortStrategy : ISortStrategy
{
    public int[] Sort(int[] array)
    {
        Console.WriteLine("Using Bubble Sort");
        int[] arr = (int[])array.Clone();
        int n = arr.Length;

        for (int i = 0; i < n - 1; i++)
        {
            for (int j = 0; j < n - i - 1; j++)
            {
                if (arr[j] > arr[j + 1])
                {
                    int tmp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = tmp;
                }
            }
        }
        return arr;
    }
}

class MergeSortStrategy : ISortStrategy
{
    public int[] Sort(int[] array)
    {
        Console.WriteLine("Using Merge Sort");
        int[] arr = (int[])array.Clone();
        Array.Sort(arr);
        return arr;
    }
}

class QuickSortStrategy : ISortStrategy
{
    public int[] Sort(int[] array)
    {
        Console.WriteLine("Using Quick Sort");
        int[] arr = (int[])array.Clone();
        Array.Sort(arr);
        return arr;
    }
}

class Sorter
{
    private ISortStrategy _strategy;

    public Sorter(ISortStrategy strategy)
    {
        _strategy = strategy;
    }

    public void SetStrategy(ISortStrategy strategy)
    {
        _strategy = strategy;
    }

    public void SortArray(int[] array)
    {
        int[] result = _strategy.Sort(array);
        Console.WriteLine("Result: [" + string.Join(", ", result) + "]");
    }
}

class TimedSortStrategy : ISortStrategy
{
    private ISortStrategy _inner;
    public TimedSortStrategy(ISortStrategy inner) { _inner = inner; }

    public int[] Sort(int[] array)
    {
        var sw = Stopwatch.StartNew();
        int[] result = _inner.Sort(array);
        sw.Stop();
        Console.WriteLine("Sorting took " + sw.ElapsedMilliseconds + " ms");
        return result;
    }
}

class Program
{
    static void Main(string[] args)
    {
        int[] data = { 38, 27, 43, 3, 9, 82, 10 };

        Sorter sorter = new Sorter(new BubbleSortStrategy());
        sorter.SortArray((int[])data.Clone());

        sorter.SetStrategy(new MergeSortStrategy());
        sorter.SortArray((int[])data.Clone());

        sorter.SetStrategy(new QuickSortStrategy());
        sorter.SortArray((int[])data.Clone());

        sorter.SetStrategy(new TimedSortStrategy(new BubbleSortStrategy()));
        sorter.SortArray((int[])data.Clone());
    }
}

```

```typescript
interface SortStrategy {
    sort(array: number[]): number[];
}

class BubbleSortStrategy implements SortStrategy {
    sort(array: number[]): number[] {
        console.log("Using Bubble Sort");
        const arr = Array.from(array);
        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
}

class MergeSortStrategy implements SortStrategy {
    sort(array: number[]): number[] {
        console.log("Using Merge Sort");
        return Array.from(array).sort((a, b) => a - b);
    }
}

class QuickSortStrategy implements SortStrategy {
    sort(array: number[]): number[] {
        console.log("Using Quick Sort");
        return Array.from(array).sort((a, b) => a - b);
    }
}

class Sorter {
    private strategy: SortStrategy;

    constructor(strategy: SortStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: SortStrategy): void {
        this.strategy = strategy;
    }

    sortArray(array: number[]): void {
        const result = this.strategy.sort(array);
        console.log("Result: [" + result.join(", ") + "]");
    }
}

class TimedSortStrategy implements SortStrategy {
    private inner: SortStrategy;
    constructor(inner: SortStrategy) { this.inner = inner; }
    sort(array: number[]): number[] {
        const start = Date.now();
        const result = this.inner.sort(array);
        const elapsed = Date.now() - start;
        console.log(`Sorting took ${elapsed} ms`);
        return result;
    }
}

const data = [38, 27, 43, 3, 9, 82, 10];

const sorter = new Sorter(new BubbleSortStrategy());
sorter.sortArray(Array.from(data));

sorter.setStrategy(new MergeSortStrategy());
sorter.sortArray(Array.from(data));

sorter.setStrategy(new QuickSortStrategy());
sorter.sortArray(Array.from(data));

// Challenge: Wrap with timed decorator
sorter.setStrategy(new TimedSortStrategy(new BubbleSortStrategy()));
sorter.sortArray(Array.from(data));
```


