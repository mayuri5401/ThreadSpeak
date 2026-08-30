---
id: "lld-design-patterns-exercise-abstract-factory-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Abstract Factory Design Pattern"
slug: "lld-design-patterns-exercise-abstract-factory-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Abstract Factory Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Abstract Factory Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Theme Factory

**Problem:** Build a theming system for a UI framework. Each theme (Light and Dark) produces two related products: a `ThemeColor` and a `ThemeFont`. The abstract factory ensures that colors and fonts from the same theme are always used together.

**Requirements:**

- `ThemeColor` interface with a `apply()` method
- `ThemeFont` interface with a `render()` method
- `LightColor` prints "Applying light color: [#FFFFFF](app://obsidian.md/index.html#FFFFFF) background, #000000 text"
- `DarkColor` prints "Applying dark color: [#1E1E1E](app://obsidian.md/index.html#1E1E1E) background, [#FFFFFF](app://obsidian.md/index.html#FFFFFF) text"
- `LightFont` prints "Rendering light theme font: Arial, 14px"
- `DarkFont` prints "Rendering dark theme font: Consolas, 14px"
- `ThemeFactory` with `createColor()` and `createFont()` methods
- `LightThemeFactory` and `DarkThemeFactory` concrete factories

```java
interface ThemeColor {
    void apply();
}

interface ThemeFont {
    void render();
}

class LightColor implements ThemeColor {
    @Override
    public void apply() {
        // TODO: Print "Applying light color: #FFFFFF background, #000000 text"
    }
}

class DarkColor implements ThemeColor {
    @Override
    public void apply() {
        // TODO: Print "Applying dark color: #1E1E1E background, #FFFFFF text"
    }
}

class LightFont implements ThemeFont {
    @Override
    public void render() {
        // TODO: Print "Rendering light theme font: Arial, 14px"
    }
}

class DarkFont implements ThemeFont {
    @Override
    public void render() {
        // TODO: Print "Rendering dark theme font: Consolas, 14px"
    }
}

interface ThemeFactory {
    ThemeColor createColor();
    ThemeFont createFont();
}

class LightThemeFactory implements ThemeFactory {
    @Override
    public ThemeColor createColor() {
        return null; // TODO: Return a new LightColor instance
    }

    @Override
    public ThemeFont createFont() {
        return null; // TODO: Return a new LightFont instance
    }
}

class DarkThemeFactory implements ThemeFactory {
    @Override
    public ThemeColor createColor() {
        return null; // TODO: Return a new DarkColor instance
    }

    @Override
    public ThemeFont createFont() {
        return null; // TODO: Return a new DarkFont instance
    }
}

class ThemeClient {
    private final ThemeColor color;
    private final ThemeFont font;

    public ThemeClient(ThemeFactory factory) {
        this.color = factory.createColor();
        this.font = factory.createFont();
    }

    public void applyTheme() {
        color.apply();
        font.render();
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Light Theme ===");
        ThemeClient lightClient = new ThemeClient(new LightThemeFactory());
        lightClient.applyTheme();

        System.out.println();

        System.out.println("=== Dark Theme ===");
        ThemeClient darkClient = new ThemeClient(new DarkThemeFactory());
        darkClient.applyTheme();
    }
}
```

```python
from abc import ABC, abstractmethod

class ThemeColor(ABC):
    @abstractmethod
    def apply(self):
        pass

class ThemeFont(ABC):
    @abstractmethod
    def render(self):
        pass

class LightColor(ThemeColor):
    def apply(self):
        # TODO: Print "Applying light color: #FFFFFF background, #000000 text"
        pass

class DarkColor(ThemeColor):
    def apply(self):
        # TODO: Print "Applying dark color: #1E1E1E background, #FFFFFF text"
        pass

class LightFont(ThemeFont):
    def render(self):
        # TODO: Print "Rendering light theme font: Arial, 14px"
        pass

class DarkFont(ThemeFont):
    def render(self):
        # TODO: Print "Rendering dark theme font: Consolas, 14px"
        pass

class ThemeFactory(ABC):
    @abstractmethod
    def create_color(self) -> ThemeColor:
        pass

    @abstractmethod
    def create_font(self) -> ThemeFont:
        pass

class LightThemeFactory(ThemeFactory):
    def create_color(self) -> ThemeColor:
        return None  # TODO: Return a new LightColor instance

    def create_font(self) -> ThemeFont:
        return None  # TODO: Return a new LightFont instance

class DarkThemeFactory(ThemeFactory):
    def create_color(self) -> ThemeColor:
        return None  # TODO: Return a new DarkColor instance

    def create_font(self) -> ThemeFont:
        return None  # TODO: Return a new DarkFont instance

class ThemeClient:
    def __init__(self, factory: ThemeFactory):
        self.color = factory.create_color()
        self.font = factory.create_font()

    def apply_theme(self):
        self.color.apply()
        self.font.render()

if __name__ == "__main__":
    print("=== Light Theme ===")
    light_client = ThemeClient(LightThemeFactory())
    light_client.apply_theme()

    print()

    print("=== Dark Theme ===")
    dark_client = ThemeClient(DarkThemeFactory())
    dark_client.apply_theme()
```

```cpp
#include <iostream>
using namespace std;

class ThemeColor {
public:
    virtual void apply() = 0;
    virtual ~ThemeColor() = default;
};

class ThemeFont {
public:
    virtual void render() = 0;
    virtual ~ThemeFont() = default;
};

class LightColor : public ThemeColor {
public:
    void apply() override {
        // TODO: Print "Applying light color: #FFFFFF background, #000000 text"
    }
};

class DarkColor : public ThemeColor {
public:
    void apply() override {
        // TODO: Print "Applying dark color: #1E1E1E background, #FFFFFF text"
    }
};

class LightFont : public ThemeFont {
public:
    void render() override {
        // TODO: Print "Rendering light theme font: Arial, 14px"
    }
};

class DarkFont : public ThemeFont {
public:
    void render() override {
        // TODO: Print "Rendering dark theme font: Consolas, 14px"
    }
};

class ThemeFactory {
public:
    virtual ThemeColor* createColor() = 0;
    virtual ThemeFont* createFont() = 0;
    virtual ~ThemeFactory() = default;
};

class LightThemeFactory : public ThemeFactory {
public:
    ThemeColor* createColor() override {
        return nullptr; // TODO: Return a new LightColor instance
    }

    ThemeFont* createFont() override {
        return nullptr; // TODO: Return a new LightFont instance
    }
};

class DarkThemeFactory : public ThemeFactory {
public:
    ThemeColor* createColor() override {
        return nullptr; // TODO: Return a new DarkColor instance
    }

    ThemeFont* createFont() override {
        return nullptr; // TODO: Return a new DarkFont instance
    }
};

class ThemeClient {
    ThemeColor* color;
    ThemeFont* font;

public:
    ThemeClient(ThemeFactory* factory) {
        color = factory->createColor();
        font = factory->createFont();
    }

    void applyTheme() {
        color->apply();
        font->render();
    }
};

int main() {
    cout << "=== Light Theme ===" << endl;
    LightThemeFactory lightFactory;
    ThemeClient lightClient(&lightFactory);
    lightClient.applyTheme();

    cout << endl;

    cout << "=== Dark Theme ===" << endl;
    DarkThemeFactory darkFactory;
    ThemeClient darkClient(&darkFactory);
    darkClient.applyTheme();

    return 0;
}
```

```go
package main

import "fmt"

type ThemeColor interface {
	apply()
}

type ThemeFont interface {
	render()
}

type LightColor struct{}

func (l *LightColor) apply() {
	// TODO: Print "Applying light color: #FFFFFF background, #000000 text"
}

type DarkColor struct{}

func (d *DarkColor) apply() {
	// TODO: Print "Applying dark color: #1E1E1E background, #FFFFFF text"
}

type LightFont struct{}

func (l *LightFont) render() {
	// TODO: Print "Rendering light theme font: Arial, 14px"
}

type DarkFont struct{}

func (d *DarkFont) render() {
	// TODO: Print "Rendering dark theme font: Consolas, 14px"
}

type ThemeFactory interface {
	createColor() ThemeColor
	createFont() ThemeFont
}

type LightThemeFactory struct{}

func (l *LightThemeFactory) createColor() ThemeColor {
	return nil // TODO: Return a new LightColor instance
}

func (l *LightThemeFactory) createFont() ThemeFont {
	return nil // TODO: Return a new LightFont instance
}

type DarkThemeFactory struct{}

func (d *DarkThemeFactory) createColor() ThemeColor {
	return nil // TODO: Return a new DarkColor instance
}

func (d *DarkThemeFactory) createFont() ThemeFont {
	return nil // TODO: Return a new DarkFont instance
}

type ThemeClient struct {
	color ThemeColor
	font  ThemeFont
}

func NewThemeClient(factory ThemeFactory) *ThemeClient {
	return &ThemeClient{
		color: factory.createColor(),
		font:  factory.createFont(),
	}
}

func (t *ThemeClient) applyTheme() {
	t.color.apply()
	t.font.render()
}

func main() {
	fmt.Println("=== Light Theme ===")
	lightClient := NewThemeClient(&LightThemeFactory{})
	lightClient.applyTheme()

	fmt.Println()

	fmt.Println("=== Dark Theme ===")
	darkClient := NewThemeClient(&DarkThemeFactory{})
	darkClient.applyTheme()
}
```

```csharp
using System;

interface IThemeColor { void Apply(); }
interface IThemeFont { void Render(); }

class LightColor : IThemeColor
{
    public void Apply()
    {
        // TODO: Print "Applying light color: #FFFFFF background, #000000 text"
    }
}

class DarkColor : IThemeColor
{
    public void Apply()
    {
        // TODO: Print "Applying dark color: #1E1E1E background, #FFFFFF text"
    }
}

class LightFont : IThemeFont
{
    public void Render()
    {
        // TODO: Print "Rendering light theme font: Arial, 14px"
    }
}

class DarkFont : IThemeFont
{
    public void Render()
    {
        // TODO: Print "Rendering dark theme font: Consolas, 14px"
    }
}

interface IThemeFactory
{
    IThemeColor CreateColor();
    IThemeFont CreateFont();
}

class LightThemeFactory : IThemeFactory
{
    public IThemeColor CreateColor()
    {
        return null; // TODO: Return a new LightColor instance
    }

    public IThemeFont CreateFont()
    {
        return null; // TODO: Return a new LightFont instance
    }
}

class DarkThemeFactory : IThemeFactory
{
    public IThemeColor CreateColor()
    {
        return null; // TODO: Return a new DarkColor instance
    }

    public IThemeFont CreateFont()
    {
        return null; // TODO: Return a new DarkFont instance
    }
}

class ThemeClient
{
    private readonly IThemeColor _color;
    private readonly IThemeFont _font;

    public ThemeClient(IThemeFactory factory)
    {
        _color = factory.CreateColor();
        _font = factory.CreateFont();
    }

    public void ApplyTheme()
    {
        _color.Apply();
        _font.Render();
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Light Theme ===");
        var lightClient = new ThemeClient(new LightThemeFactory());
        lightClient.ApplyTheme();

        Console.WriteLine();

        Console.WriteLine("=== Dark Theme ===");
        var darkClient = new ThemeClient(new DarkThemeFactory());
        darkClient.ApplyTheme();
    }
}
```

```typescript
interface ThemeColor {
    apply(): void;
}

interface ThemeFont {
    render(): void;
}

class LightColor implements ThemeColor {
    apply(): void {
        // TODO: Print "Applying light color: #FFFFFF background, #000000 text"
    }
}

class DarkColor implements ThemeColor {
    apply(): void {
        // TODO: Print "Applying dark color: #1E1E1E background, #FFFFFF text"
    }
}

class LightFont implements ThemeFont {
    render(): void {
        // TODO: Print "Rendering light theme font: Arial, 14px"
    }
}

class DarkFont implements ThemeFont {
    render(): void {
        // TODO: Print "Rendering dark theme font: Consolas, 14px"
    }
}

interface ThemeFactory {
    createColor(): ThemeColor;
    createFont(): ThemeFont;
}

class LightThemeFactory implements ThemeFactory {
    createColor(): ThemeColor {
        return null as any; // TODO: Return a new LightColor instance
    }

    createFont(): ThemeFont {
        return null as any; // TODO: Return a new LightFont instance
    }
}

class DarkThemeFactory implements ThemeFactory {
    createColor(): ThemeColor {
        return null as any; // TODO: Return a new DarkColor instance
    }

    createFont(): ThemeFont {
        return null as any; // TODO: Return a new DarkFont instance
    }
}

class ThemeClient {
    private color: ThemeColor;
    private font: ThemeFont;

    constructor(factory: ThemeFactory) {
        this.color = factory.createColor();
        this.font = factory.createFont();
    }

    applyTheme(): void {
        this.color.apply();
        this.font.render();
    }
}

console.log("=== Light Theme ===");
const lightClient = new ThemeClient(new LightThemeFactory());
lightClient.applyTheme();

console.log();

console.log("=== Dark Theme ===");
const darkClient = new ThemeClient(new DarkThemeFactory());
darkClient.applyTheme();
```

#### Solutions

```java
interface ThemeColor {
    void apply();
}

interface ThemeFont {
    void render();
}

class LightColor implements ThemeColor {
    @Override
    public void apply() {
        System.out.println("Applying light color: #FFFFFF background, #000000 text");
    }
}

class DarkColor implements ThemeColor {
    @Override
    public void apply() {
        System.out.println("Applying dark color: #1E1E1E background, #FFFFFF text");
    }
}

class LightFont implements ThemeFont {
    @Override
    public void render() {
        System.out.println("Rendering light theme font: Arial, 14px");
    }
}

class DarkFont implements ThemeFont {
    @Override
    public void render() {
        System.out.println("Rendering dark theme font: Consolas, 14px");
    }
}

interface ThemeFactory {
    ThemeColor createColor();
    ThemeFont createFont();
}

class LightThemeFactory implements ThemeFactory {
    @Override
    public ThemeColor createColor() {
        return new LightColor();
    }

    @Override
    public ThemeFont createFont() {
        return new LightFont();
    }
}

class DarkThemeFactory implements ThemeFactory {
    @Override
    public ThemeColor createColor() {
        return new DarkColor();
    }

    @Override
    public ThemeFont createFont() {
        return new DarkFont();
    }
}

class ThemeClient {
    private final ThemeColor color;
    private final ThemeFont font;

    public ThemeClient(ThemeFactory factory) {
        this.color = factory.createColor();
        this.font = factory.createFont();
    }

    public void applyTheme() {
        color.apply();
        font.render();
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Light Theme ===");
        ThemeClient lightClient = new ThemeClient(new LightThemeFactory());
        lightClient.applyTheme();

        System.out.println();

        System.out.println("=== Dark Theme ===");
        ThemeClient darkClient = new ThemeClient(new DarkThemeFactory());
        darkClient.applyTheme();
    }
}
```

```python
from abc import ABC, abstractmethod

class ThemeColor(ABC):
    @abstractmethod
    def apply(self):
        pass

class ThemeFont(ABC):
    @abstractmethod
    def render(self):
        pass

class LightColor(ThemeColor):
    def apply(self):
        print("Applying light color: #FFFFFF background, #000000 text")

class DarkColor(ThemeColor):
    def apply(self):
        print("Applying dark color: #1E1E1E background, #FFFFFF text")

class LightFont(ThemeFont):
    def render(self):
        print("Rendering light theme font: Arial, 14px")

class DarkFont(ThemeFont):
    def render(self):
        print("Rendering dark theme font: Consolas, 14px")

class ThemeFactory(ABC):
    @abstractmethod
    def create_color(self) -> ThemeColor:
        pass

    @abstractmethod
    def create_font(self) -> ThemeFont:
        pass

class LightThemeFactory(ThemeFactory):
    def create_color(self) -> ThemeColor:
        return LightColor()

    def create_font(self) -> ThemeFont:
        return LightFont()

class DarkThemeFactory(ThemeFactory):
    def create_color(self) -> ThemeColor:
        return DarkColor()

    def create_font(self) -> ThemeFont:
        return DarkFont()

class ThemeClient:
    def __init__(self, factory: ThemeFactory):
        self.color = factory.create_color()
        self.font = factory.create_font()

    def apply_theme(self):
        self.color.apply()
        self.font.render()

if __name__ == "__main__":
    print("=== Light Theme ===")
    light_client = ThemeClient(LightThemeFactory())
    light_client.apply_theme()

    print()

    print("=== Dark Theme ===")
    dark_client = ThemeClient(DarkThemeFactory())
    dark_client.apply_theme()
```

```cpp
#include <iostream>
using namespace std;

class ThemeColor {
public:
    virtual void apply() = 0;
    virtual ~ThemeColor() = default;
};

class ThemeFont {
public:
    virtual void render() = 0;
    virtual ~ThemeFont() = default;
};

class LightColor : public ThemeColor {
public:
    void apply() override {
        cout << "Applying light color: #FFFFFF background, #000000 text" << endl;
    }
};

class DarkColor : public ThemeColor {
public:
    void apply() override {
        cout << "Applying dark color: #1E1E1E background, #FFFFFF text" << endl;
    }
};

class LightFont : public ThemeFont {
public:
    void render() override {
        cout << "Rendering light theme font: Arial, 14px" << endl;
    }
};

class DarkFont : public ThemeFont {
public:
    void render() override {
        cout << "Rendering dark theme font: Consolas, 14px" << endl;
    }
};

class ThemeFactory {
public:
    virtual ThemeColor* createColor() = 0;
    virtual ThemeFont* createFont() = 0;
    virtual ~ThemeFactory() = default;
};

class LightThemeFactory : public ThemeFactory {
public:
    ThemeColor* createColor() override {
        return new LightColor();
    }

    ThemeFont* createFont() override {
        return new LightFont();
    }
};

class DarkThemeFactory : public ThemeFactory {
public:
    ThemeColor* createColor() override {
        return new DarkColor();
    }

    ThemeFont* createFont() override {
        return new DarkFont();
    }
};

class ThemeClient {
    ThemeColor* color;
    ThemeFont* font;

public:
    ThemeClient(ThemeFactory* factory) {
        color = factory->createColor();
        font = factory->createFont();
    }

    void applyTheme() {
        color->apply();
        font->render();
    }
};

int main() {
    cout << "=== Light Theme ===" << endl;
    LightThemeFactory lightFactory;
    ThemeClient lightClient(&lightFactory);
    lightClient.applyTheme();

    cout << endl;

    cout << "=== Dark Theme ===" << endl;
    DarkThemeFactory darkFactory;
    ThemeClient darkClient(&darkFactory);
    darkClient.applyTheme();

    return 0;
}
```

```go
package main

import "fmt"

type ThemeColor interface {
	Apply()
}

type ThemeFont interface {
	Render()
}

type LightColor struct{}

func (l *LightColor) Apply() {
	fmt.Println("Applying light color: #FFFFFF background, #000000 text")
}

type DarkColor struct{}

func (d *DarkColor) Apply() {
	fmt.Println("Applying dark color: #1E1E1E background, #FFFFFF text")
}

type LightFont struct{}

func (l *LightFont) Render() {
	fmt.Println("Rendering light theme font: Arial, 14px")
}

type DarkFont struct{}

func (d *DarkFont) Render() {
	fmt.Println("Rendering dark theme font: Consolas, 14px")
}

type ThemeFactory interface {
	CreateColor() ThemeColor
	CreateFont() ThemeFont
}

type LightThemeFactory struct{}

func (l *LightThemeFactory) CreateColor() ThemeColor {
	return &LightColor{}
}

func (l *LightThemeFactory) CreateFont() ThemeFont {
	return &LightFont{}
}

type DarkThemeFactory struct{}

func (d *DarkThemeFactory) CreateColor() ThemeColor {
	return &DarkColor{}
}

func (d *DarkThemeFactory) CreateFont() ThemeFont {
	return &DarkFont{}
}

type ThemeClient struct {
	color ThemeColor
	font  ThemeFont
}

func NewThemeClient(factory ThemeFactory) *ThemeClient {
	return &ThemeClient{
		color: factory.CreateColor(),
		font:  factory.CreateFont(),
	}
}

func (t *ThemeClient) ApplyTheme() {
	t.color.Apply()
	t.font.Render()
}

func main() {
	fmt.Println("=== Light Theme ===")
	lightClient := NewThemeClient(&LightThemeFactory{})
	lightClient.ApplyTheme()

	fmt.Println()

	fmt.Println("=== Dark Theme ===")
	darkClient := NewThemeClient(&DarkThemeFactory{})
	darkClient.ApplyTheme()
}
```

```csharp
using System;

interface IThemeColor { void Apply(); }
interface IThemeFont { void Render(); }

class LightColor : IThemeColor
{
    public void Apply()
    {
        Console.WriteLine("Applying light color: #FFFFFF background, #000000 text");
    }
}

class DarkColor : IThemeColor
{
    public void Apply()
    {
        Console.WriteLine("Applying dark color: #1E1E1E background, #FFFFFF text");
    }
}

class LightFont : IThemeFont
{
    public void Render()
    {
        Console.WriteLine("Rendering light theme font: Arial, 14px");
    }
}

class DarkFont : IThemeFont
{
    public void Render()
    {
        Console.WriteLine("Rendering dark theme font: Consolas, 14px");
    }
}

interface IThemeFactory
{
    IThemeColor CreateColor();
    IThemeFont CreateFont();
}

class LightThemeFactory : IThemeFactory
{
    public IThemeColor CreateColor()
    {
        return new LightColor();
    }

    public IThemeFont CreateFont()
    {
        return new LightFont();
    }
}

class DarkThemeFactory : IThemeFactory
{
    public IThemeColor CreateColor()
    {
        return new DarkColor();
    }

    public IThemeFont CreateFont()
    {
        return new DarkFont();
    }
}

class ThemeClient
{
    private readonly IThemeColor _color;
    private readonly IThemeFont _font;

    public ThemeClient(IThemeFactory factory)
    {
        _color = factory.CreateColor();
        _font = factory.CreateFont();
    }

    public void ApplyTheme()
    {
        _color.Apply();
        _font.Render();
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Light Theme ===");
        var lightClient = new ThemeClient(new LightThemeFactory());
        lightClient.ApplyTheme();

        Console.WriteLine();

        Console.WriteLine("=== Dark Theme ===");
        var darkClient = new ThemeClient(new DarkThemeFactory());
        darkClient.ApplyTheme();
    }
}
```

```typescript
interface ThemeColor {
    apply(): void;
}

interface ThemeFont {
    render(): void;
}

class LightColor implements ThemeColor {
    apply(): void {
        console.log("Applying light color: #FFFFFF background, #000000 text");
    }
}

class DarkColor implements ThemeColor {
    apply(): void {
        console.log("Applying dark color: #1E1E1E background, #FFFFFF text");
    }
}

class LightFont implements ThemeFont {
    render(): void {
        console.log("Rendering light theme font: Arial, 14px");
    }
}

class DarkFont implements ThemeFont {
    render(): void {
        console.log("Rendering dark theme font: Consolas, 14px");
    }
}

interface ThemeFactory {
    createColor(): ThemeColor;
    createFont(): ThemeFont;
}

class LightThemeFactory implements ThemeFactory {
    createColor(): ThemeColor {
        return new LightColor();
    }

    createFont(): ThemeFont {
        return new LightFont();
    }
}

class DarkThemeFactory implements ThemeFactory {
    createColor(): ThemeColor {
        return new DarkColor();
    }

    createFont(): ThemeFont {
        return new DarkFont();
    }
}

class ThemeClient {
    private color: ThemeColor;
    private font: ThemeFont;

    constructor(factory: ThemeFactory) {
        this.color = factory.createColor();
        this.font = factory.createFont();
    }

    applyTheme(): void {
        this.color.apply();
        this.font.render();
    }
}

console.log("=== Light Theme ===");
const lightClient = new ThemeClient(new LightThemeFactory());
lightClient.applyTheme();

console.log();

console.log("=== Dark Theme ===");
const darkClient = new ThemeClient(new DarkThemeFactory());
darkClient.applyTheme();
```

---

# Exercise 2: Notification Suite

> [!PAYWALL] This content is for premium members only.

**Problem:** Build a notification system that supports two channels: Email and SMS. Each channel requires three related products: a `Formatter` (formats the message), a `DeliveryChannel` (sends the message), and a `Logger` (logs the delivery). Use Abstract Factory to ensure all three products come from the same channel.

**Requirements:**

- `Formatter` interface with `format(message)` that returns a formatted string
- `DeliveryChannel` interface with `deliver(formattedMessage)` that sends the message
- `Logger` interface with `log(message)` that records the delivery
- Email variants: formatter adds "Subject: " prefix, channel prints "Sending via SMTP...", logger prints "Email log: ..."
- SMS variants: formatter truncates to 160 chars with "[SMS] " prefix, channel prints "Sending via SMS gateway...", logger prints "SMS log: ..."
- A `NotificationClient` that uses the factory to format, deliver, and log a message

```java
interface Formatter {
    String format(String message);
}

interface DeliveryChannel {
    void deliver(String formattedMessage);
}

interface Logger {
    void log(String message);
}

class EmailFormatter implements Formatter {
    @Override
    public String format(String message) {
        return ""; // TODO: Return "Subject: " + message
    }
}

class SMSFormatter implements Formatter {
    @Override
    public String format(String message) {
        return ""; // TODO: Return "[SMS] " + message (truncated to 160 chars)
    }
}

class EmailChannel implements DeliveryChannel {
    @Override
    public void deliver(String formattedMessage) {
        // TODO: Print "Sending via SMTP: " + formattedMessage
    }
}

class SMSChannel implements DeliveryChannel {
    @Override
    public void deliver(String formattedMessage) {
        // TODO: Print "Sending via SMS gateway: " + formattedMessage
    }
}

class EmailLogger implements Logger {
    @Override
    public void log(String message) {
        // TODO: Print "Email log: " + message
    }
}

class SMSLogger implements Logger {
    @Override
    public void log(String message) {
        // TODO: Print "SMS log: " + message
    }
}

interface NotificationFactory {
    Formatter createFormatter();
    DeliveryChannel createDeliveryChannel();
    Logger createLogger();
}

class EmailNotificationFactory implements NotificationFactory {
    @Override
    public Formatter createFormatter() {
        return null; // TODO: Return a new EmailFormatter instance
    }

    @Override
    public DeliveryChannel createDeliveryChannel() {
        return null; // TODO: Return a new EmailChannel instance
    }

    @Override
    public Logger createLogger() {
        return null; // TODO: Return a new EmailLogger instance
    }
}

class SMSNotificationFactory implements NotificationFactory {
    @Override
    public Formatter createFormatter() {
        return null; // TODO: Return a new SMSFormatter instance
    }

    @Override
    public DeliveryChannel createDeliveryChannel() {
        return null; // TODO: Return a new SMSChannel instance
    }

    @Override
    public Logger createLogger() {
        return null; // TODO: Return a new SMSLogger instance
    }
}

class NotificationClient {
    private final Formatter formatter;
    private final DeliveryChannel channel;
    private final Logger logger;

    public NotificationClient(NotificationFactory factory) {
        this.formatter = factory.createFormatter();
        this.channel = factory.createDeliveryChannel();
        this.logger = factory.createLogger();
    }

    public void send(String message) {
        String formatted = formatter.format(message);
        channel.deliver(formatted);
        logger.log(formatted);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Email Notification ===");
        NotificationClient emailClient = new NotificationClient(new EmailNotificationFactory());
        emailClient.send("Your order has been shipped!");

        System.out.println();

        System.out.println("=== SMS Notification ===");
        NotificationClient smsClient = new NotificationClient(new SMSNotificationFactory());
        smsClient.send("Your order has been shipped!");
    }
}
```

```python
from abc import ABC, abstractmethod

class Formatter(ABC):
    @abstractmethod
    def format(self, message: str) -> str:
        pass

class DeliveryChannel(ABC):
    @abstractmethod
    def deliver(self, formatted_message: str):
        pass

class Logger(ABC):
    @abstractmethod
    def log(self, message: str):
        pass

class EmailFormatter(Formatter):
    def format(self, message: str) -> str:
        # TODO: Return "Subject: " + message
        return ""

class SMSFormatter(Formatter):
    def format(self, message: str) -> str:
        # TODO: Return "[SMS] " + message (truncated to 160 chars)
        return ""

class EmailChannel(DeliveryChannel):
    def deliver(self, formatted_message: str):
        # TODO: Print "Sending via SMTP: " + formatted_message
        pass

class SMSChannel(DeliveryChannel):
    def deliver(self, formatted_message: str):
        # TODO: Print "Sending via SMS gateway: " + formatted_message
        pass

class EmailLogger(Logger):
    def log(self, message: str):
        # TODO: Print "Email log: " + message
        pass

class SMSLogger(Logger):
    def log(self, message: str):
        # TODO: Print "SMS log: " + message
        pass

class NotificationFactory(ABC):
    @abstractmethod
    def create_formatter(self) -> Formatter:
        pass

    @abstractmethod
    def create_delivery_channel(self) -> DeliveryChannel:
        pass

    @abstractmethod
    def create_logger(self) -> Logger:
        pass

class EmailNotificationFactory(NotificationFactory):
    def create_formatter(self) -> Formatter:
        return None  # TODO: Return a new EmailFormatter instance

    def create_delivery_channel(self) -> DeliveryChannel:
        return None  # TODO: Return a new EmailChannel instance

    def create_logger(self) -> Logger:
        return None  # TODO: Return a new EmailLogger instance

class SMSNotificationFactory(NotificationFactory):
    def create_formatter(self) -> Formatter:
        return None  # TODO: Return a new SMSFormatter instance

    def create_delivery_channel(self) -> DeliveryChannel:
        return None  # TODO: Return a new SMSChannel instance

    def create_logger(self) -> Logger:
        return None  # TODO: Return a new SMSLogger instance

class NotificationClient:
    def __init__(self, factory: NotificationFactory):
        self.formatter = factory.create_formatter()
        self.channel = factory.create_delivery_channel()
        self.logger = factory.create_logger()

    def send(self, message: str):
        formatted = self.formatter.format(message)
        self.channel.deliver(formatted)
        self.logger.log(formatted)

if __name__ == "__main__":
    print("=== Email Notification ===")
    email_client = NotificationClient(EmailNotificationFactory())
    email_client.send("Your order has been shipped!")

    print()

    print("=== SMS Notification ===")
    sms_client = NotificationClient(SMSNotificationFactory())
    sms_client.send("Your order has been shipped!")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Formatter {
public:
    virtual string format(const string& message) = 0;
    virtual ~Formatter() = default;
};

class DeliveryChannel {
public:
    virtual void deliver(const string& formattedMessage) = 0;
    virtual ~DeliveryChannel() = default;
};

class Logger {
public:
    virtual void log(const string& message) = 0;
    virtual ~Logger() = default;
};

class EmailFormatter : public Formatter {
public:
    string format(const string& message) override {
        return ""; // TODO: Return "Subject: " + message
    }
};

class SMSFormatter : public Formatter {
public:
    string format(const string& message) override {
        return ""; // TODO: Return "[SMS] " + message (truncated to 160 chars)
    }
};

class EmailChannel : public DeliveryChannel {
public:
    void deliver(const string& formattedMessage) override {
        // TODO: Print "Sending via SMTP: " + formattedMessage
    }
};

class SMSChannel : public DeliveryChannel {
public:
    void deliver(const string& formattedMessage) override {
        // TODO: Print "Sending via SMS gateway: " + formattedMessage
    }
};

class EmailLogger : public Logger {
public:
    void log(const string& message) override {
        // TODO: Print "Email log: " + message
    }
};

class SMSLogger : public Logger {
public:
    void log(const string& message) override {
        // TODO: Print "SMS log: " + message
    }
};

class NotificationFactory {
public:
    virtual Formatter* createFormatter() = 0;
    virtual DeliveryChannel* createDeliveryChannel() = 0;
    virtual Logger* createLogger() = 0;
    virtual ~NotificationFactory() = default;
};

class EmailNotificationFactory : public NotificationFactory {
public:
    Formatter* createFormatter() override {
        return nullptr; // TODO: Return a new EmailFormatter instance
    }

    DeliveryChannel* createDeliveryChannel() override {
        return nullptr; // TODO: Return a new EmailChannel instance
    }

    Logger* createLogger() override {
        return nullptr; // TODO: Return a new EmailLogger instance
    }
};

class SMSNotificationFactory : public NotificationFactory {
public:
    Formatter* createFormatter() override {
        return nullptr; // TODO: Return a new SMSFormatter instance
    }

    DeliveryChannel* createDeliveryChannel() override {
        return nullptr; // TODO: Return a new SMSChannel instance
    }

    Logger* createLogger() override {
        return nullptr; // TODO: Return a new SMSLogger instance
    }
};

class NotificationClient {
    Formatter* formatter;
    DeliveryChannel* channel;
    Logger* logger;

public:
    NotificationClient(NotificationFactory* factory) {
        formatter = factory->createFormatter();
        channel = factory->createDeliveryChannel();
        logger = factory->createLogger();
    }

    void send(const string& message) {
        string formatted = formatter->format(message);
        channel->deliver(formatted);
        logger->log(formatted);
    }
};

int main() {
    cout << "=== Email Notification ===" << endl;
    EmailNotificationFactory emailFactory;
    NotificationClient emailClient(&emailFactory);
    emailClient.send("Your order has been shipped!");

    cout << endl;

    cout << "=== SMS Notification ===" << endl;
    SMSNotificationFactory smsFactory;
    NotificationClient smsClient(&smsFactory);
    smsClient.send("Your order has been shipped!");

    return 0;
}
```

```go
package main

import "fmt"

type Formatter interface {
	Format(message string) string
}

type DeliveryChannel interface {
	Deliver(formattedMessage string)
}

type Logger interface {
	Log(message string)
}

type EmailFormatter struct{}

func (e *EmailFormatter) Format(message string) string {
	// TODO: Return "Subject: " + message
	return ""
}

type SMSFormatter struct{}

func (s *SMSFormatter) Format(message string) string {
	// TODO: Return "[SMS] " + message (truncated to 160 chars)
	return ""
}

type EmailChannel struct{}

func (e *EmailChannel) Deliver(formattedMessage string) {
	// TODO: Print "Sending via SMTP: " + formattedMessage
	_ = formattedMessage
}

type SMSChannel struct{}

func (s *SMSChannel) Deliver(formattedMessage string) {
	// TODO: Print "Sending via SMS gateway: " + formattedMessage
	_ = formattedMessage
}

type EmailLogger struct{}

func (e *EmailLogger) Log(message string) {
	// TODO: Print "Email log: " + message
	_ = message
}

type SMSLogger struct{}

func (s *SMSLogger) Log(message string) {
	// TODO: Print "SMS log: " + message
	_ = message
}

type NotificationFactory interface {
	CreateFormatter() Formatter
	CreateDeliveryChannel() DeliveryChannel
	CreateLogger() Logger
}

type EmailNotificationFactory struct{}

func (e *EmailNotificationFactory) CreateFormatter() Formatter {
	return nil // TODO: Return a new EmailFormatter instance
}

func (e *EmailNotificationFactory) CreateDeliveryChannel() DeliveryChannel {
	return nil // TODO: Return a new EmailChannel instance
}

func (e *EmailNotificationFactory) CreateLogger() Logger {
	return nil // TODO: Return a new EmailLogger instance
}

type SMSNotificationFactory struct{}

func (s *SMSNotificationFactory) CreateFormatter() Formatter {
	return nil // TODO: Return a new SMSFormatter instance
}

func (s *SMSNotificationFactory) CreateDeliveryChannel() DeliveryChannel {
	return nil // TODO: Return a new SMSChannel instance
}

func (s *SMSNotificationFactory) CreateLogger() Logger {
	return nil // TODO: Return a new SMSLogger instance
}

type NotificationClient struct {
	formatter Formatter
	channel   DeliveryChannel
	logger    Logger
}

func NewNotificationClient(factory NotificationFactory) *NotificationClient {
	return &NotificationClient{
		formatter: factory.CreateFormatter(),
		channel:   factory.CreateDeliveryChannel(),
		logger:    factory.CreateLogger(),
	}
}

func (n *NotificationClient) Send(message string) {
	formatted := n.formatter.Format(message)
	n.channel.Deliver(formatted)
	n.logger.Log(formatted)
}

func main() {
	fmt.Println("=== Email Notification ===")
	emailClient := NewNotificationClient(&EmailNotificationFactory{})
	emailClient.Send("Your order has been shipped!")

	fmt.Println()

	fmt.Println("=== SMS Notification ===")
	smsClient := NewNotificationClient(&SMSNotificationFactory{})
	smsClient.Send("Your order has been shipped!")
}
```

```csharp
using System;

interface IFormatter { string Format(string message); }
interface IDeliveryChannel { void Deliver(string formattedMessage); }
interface ILogger { void Log(string message); }

class EmailFormatter : IFormatter
{
    public string Format(string message)
    {
        return ""; // TODO: Return "Subject: " + message
    }
}

class SMSFormatter : IFormatter
{
    public string Format(string message)
    {
        return ""; // TODO: Return "[SMS] " + message (truncated to 160 chars)
    }
}

class EmailChannel : IDeliveryChannel
{
    public void Deliver(string formattedMessage)
    {
        // TODO: Print "Sending via SMTP: " + formattedMessage
    }
}

class SMSChannel : IDeliveryChannel
{
    public void Deliver(string formattedMessage)
    {
        // TODO: Print "Sending via SMS gateway: " + formattedMessage
    }
}

class EmailLogger : ILogger
{
    public void Log(string message)
    {
        // TODO: Print "Email log: " + message
    }
}

class SMSLogger : ILogger
{
    public void Log(string message)
    {
        // TODO: Print "SMS log: " + message
    }
}

interface INotificationFactory
{
    IFormatter CreateFormatter();
    IDeliveryChannel CreateDeliveryChannel();
    ILogger CreateLogger();
}

class EmailNotificationFactory : INotificationFactory
{
    public IFormatter CreateFormatter()
    {
        return null; // TODO: Return a new EmailFormatter instance
    }

    public IDeliveryChannel CreateDeliveryChannel()
    {
        return null; // TODO: Return a new EmailChannel instance
    }

    public ILogger CreateLogger()
    {
        return null; // TODO: Return a new EmailLogger instance
    }
}

class SMSNotificationFactory : INotificationFactory
{
    public IFormatter CreateFormatter()
    {
        return null; // TODO: Return a new SMSFormatter instance
    }

    public IDeliveryChannel CreateDeliveryChannel()
    {
        return null; // TODO: Return a new SMSChannel instance
    }

    public ILogger CreateLogger()
    {
        return null; // TODO: Return a new SMSLogger instance
    }
}

class NotificationClient
{
    private readonly IFormatter _formatter;
    private readonly IDeliveryChannel _channel;
    private readonly ILogger _logger;

    public NotificationClient(INotificationFactory factory)
    {
        _formatter = factory.CreateFormatter();
        _channel = factory.CreateDeliveryChannel();
        _logger = factory.CreateLogger();
    }

    public void Send(string message)
    {
        string formatted = _formatter.Format(message);
        _channel.Deliver(formatted);
        _logger.Log(formatted);
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Email Notification ===");
        var emailClient = new NotificationClient(new EmailNotificationFactory());
        emailClient.Send("Your order has been shipped!");

        Console.WriteLine();

        Console.WriteLine("=== SMS Notification ===");
        var smsClient = new NotificationClient(new SMSNotificationFactory());
        smsClient.Send("Your order has been shipped!");
    }
}
```

```typescript
interface Formatter {
    format(message: string): string;
}

interface DeliveryChannel {
    deliver(formattedMessage: string): void;
}

interface Logger {
    log(message: string): void;
}

class EmailFormatter implements Formatter {
    format(message: string): string {
        return ""; // TODO: Return "Subject: " + message
    }
}

class SMSFormatter implements Formatter {
    format(message: string): string {
        return ""; // TODO: Return "[SMS] " + message (truncated to 160 chars)
    }
}

class EmailChannel implements DeliveryChannel {
    deliver(formattedMessage: string): void {
        // TODO: Print "Sending via SMTP: " + formattedMessage
    }
}

class SMSChannel implements DeliveryChannel {
    deliver(formattedMessage: string): void {
        // TODO: Print "Sending via SMS gateway: " + formattedMessage
    }
}

class EmailLogger implements Logger {
    log(message: string): void {
        // TODO: Print "Email log: " + message
    }
}

class SMSLogger implements Logger {
    log(message: string): void {
        // TODO: Print "SMS log: " + message
    }
}

interface NotificationFactory {
    createFormatter(): Formatter;
    createDeliveryChannel(): DeliveryChannel;
    createLogger(): Logger;
}

class EmailNotificationFactory implements NotificationFactory {
    createFormatter(): Formatter {
        return null as any; // TODO: Return a new EmailFormatter instance
    }

    createDeliveryChannel(): DeliveryChannel {
        return null as any; // TODO: Return a new EmailChannel instance
    }

    createLogger(): Logger {
        return null as any; // TODO: Return a new EmailLogger instance
    }
}

class SMSNotificationFactory implements NotificationFactory {
    createFormatter(): Formatter {
        return null as any; // TODO: Return a new SMSFormatter instance
    }

    createDeliveryChannel(): DeliveryChannel {
        return null as any; // TODO: Return a new SMSChannel instance
    }

    createLogger(): Logger {
        return null as any; // TODO: Return a new SMSLogger instance
    }
}

class NotificationClient {
    private formatter: Formatter;
    private channel: DeliveryChannel;
    private logger: Logger;

    constructor(factory: NotificationFactory) {
        this.formatter = factory.createFormatter();
        this.channel = factory.createDeliveryChannel();
        this.logger = factory.createLogger();
    }

    send(message: string): void {
        const formatted = this.formatter.format(message);
        this.channel.deliver(formatted);
        this.logger.log(formatted);
    }
}

console.log("=== Email Notification ===");
const emailClient = new NotificationClient(new EmailNotificationFactory());
emailClient.send("Your order has been shipped!");

console.log();

console.log("=== SMS Notification ===");
const smsClient = new NotificationClient(new SMSNotificationFactory());
smsClient.send("Your order has been shipped!");
```

#### Solutions

```java
interface Formatter {
    String format(String message);
}

interface DeliveryChannel {
    void deliver(String formattedMessage);
}

interface Logger {
    void log(String message);
}

class EmailFormatter implements Formatter {
    @Override
    public String format(String message) {
        return "Subject: " + message;
    }
}

class SMSFormatter implements Formatter {
    @Override
    public String format(String message) {
        String result = "[SMS] " + message;
        return result.length() > 160 " result.substring(0, 160) : result;
    }
}

class EmailChannel implements DeliveryChannel {
    @Override
    public void deliver(String formattedMessage) {
        System.out.println("Sending via SMTP: " + formattedMessage);
    }
}

class SMSChannel implements DeliveryChannel {
    @Override
    public void deliver(String formattedMessage) {
        System.out.println("Sending via SMS gateway: " + formattedMessage);
    }
}

class EmailLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("Email log: " + message);
    }
}

class SMSLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("SMS log: " + message);
    }
}

interface NotificationFactory {
    Formatter createFormatter();
    DeliveryChannel createDeliveryChannel();
    Logger createLogger();
}

class EmailNotificationFactory implements NotificationFactory {
    @Override
    public Formatter createFormatter() {
        return new EmailFormatter();
    }

    @Override
    public DeliveryChannel createDeliveryChannel() {
        return new EmailChannel();
    }

    @Override
    public Logger createLogger() {
        return new EmailLogger();
    }
}

class SMSNotificationFactory implements NotificationFactory {
    @Override
    public Formatter createFormatter() {
        return new SMSFormatter();
    }

    @Override
    public DeliveryChannel createDeliveryChannel() {
        return new SMSChannel();
    }

    @Override
    public Logger createLogger() {
        return new SMSLogger();
    }
}

class NotificationClient {
    private final Formatter formatter;
    private final DeliveryChannel channel;
    private final Logger logger;

    public NotificationClient(NotificationFactory factory) {
        this.formatter = factory.createFormatter();
        this.channel = factory.createDeliveryChannel();
        this.logger = factory.createLogger();
    }

    public void send(String message) {
        String formatted = formatter.format(message);
        channel.deliver(formatted);
        logger.log(formatted);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== Email Notification ===");
        NotificationClient emailClient = new NotificationClient(new EmailNotificationFactory());
        emailClient.send("Your order has been shipped!");

        System.out.println();

        System.out.println("=== SMS Notification ===");
        NotificationClient smsClient = new NotificationClient(new SMSNotificationFactory());
        smsClient.send("Your order has been shipped!");
    }
}
```

```python
from abc import ABC, abstractmethod

class Formatter(ABC):
    @abstractmethod
    def format(self, message: str) -> str:
        pass

class DeliveryChannel(ABC):
    @abstractmethod
    def deliver(self, formatted_message: str):
        pass

class Logger(ABC):
    @abstractmethod
    def log(self, message: str):
        pass

class EmailFormatter(Formatter):
    def format(self, message: str) -> str:
        return f"Subject: {message}"

class SMSFormatter(Formatter):
    def format(self, message: str) -> str:
        result = f"[SMS] {message}"
        return result[:160]

class EmailChannel(DeliveryChannel):
    def deliver(self, formatted_message: str):
        print(f"Sending via SMTP: {formatted_message}")

class SMSChannel(DeliveryChannel):
    def deliver(self, formatted_message: str):
        print(f"Sending via SMS gateway: {formatted_message}")

class EmailLogger(Logger):
    def log(self, message: str):
        print(f"Email log: {message}")

class SMSLogger(Logger):
    def log(self, message: str):
        print(f"SMS log: {message}")

class NotificationFactory(ABC):
    @abstractmethod
    def create_formatter(self) -> Formatter:
        pass

    @abstractmethod
    def create_delivery_channel(self) -> DeliveryChannel:
        pass

    @abstractmethod
    def create_logger(self) -> Logger:
        pass

class EmailNotificationFactory(NotificationFactory):
    def create_formatter(self) -> Formatter:
        return EmailFormatter()

    def create_delivery_channel(self) -> DeliveryChannel:
        return EmailChannel()

    def create_logger(self) -> Logger:
        return EmailLogger()

class SMSNotificationFactory(NotificationFactory):
    def create_formatter(self) -> Formatter:
        return SMSFormatter()

    def create_delivery_channel(self) -> DeliveryChannel:
        return SMSChannel()

    def create_logger(self) -> Logger:
        return SMSLogger()

class NotificationClient:
    def __init__(self, factory: NotificationFactory):
        self.formatter = factory.create_formatter()
        self.channel = factory.create_delivery_channel()
        self.logger = factory.create_logger()

    def send(self, message: str):
        formatted = self.formatter.format(message)
        self.channel.deliver(formatted)
        self.logger.log(formatted)

if __name__ == "__main__":
    print("=== Email Notification ===")
    email_client = NotificationClient(EmailNotificationFactory())
    email_client.send("Your order has been shipped!")

    print()

    print("=== SMS Notification ===")
    sms_client = NotificationClient(SMSNotificationFactory())
    sms_client.send("Your order has been shipped!")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Formatter {
public:
    virtual string format(const string& message) = 0;
    virtual ~Formatter() = default;
};

class DeliveryChannel {
public:
    virtual void deliver(const string& formattedMessage) = 0;
    virtual ~DeliveryChannel() = default;
};

class Logger {
public:
    virtual void log(const string& message) = 0;
    virtual ~Logger() = default;
};

class EmailFormatter : public Formatter {
public:
    string format(const string& message) override {
        return "Subject: " + message;
    }
};

class SMSFormatter : public Formatter {
public:
    string format(const string& message) override {
        string result = "[SMS] " + message;
        return result.length() > 160 " result.substr(0, 160) : result;
    }
};

class EmailChannel : public DeliveryChannel {
public:
    void deliver(const string& formattedMessage) override {
        cout << "Sending via SMTP: " << formattedMessage << endl;
    }
};

class SMSChannel : public DeliveryChannel {
public:
    void deliver(const string& formattedMessage) override {
        cout << "Sending via SMS gateway: " << formattedMessage << endl;
    }
};

class EmailLogger : public Logger {
public:
    void log(const string& message) override {
        cout << "Email log: " << message << endl;
    }
};

class SMSLogger : public Logger {
public:
    void log(const string& message) override {
        cout << "SMS log: " << message << endl;
    }
};

class NotificationFactory {
public:
    virtual Formatter* createFormatter() = 0;
    virtual DeliveryChannel* createDeliveryChannel() = 0;
    virtual Logger* createLogger() = 0;
    virtual ~NotificationFactory() = default;
};

class EmailNotificationFactory : public NotificationFactory {
public:
    Formatter* createFormatter() override {
        return new EmailFormatter();
    }

    DeliveryChannel* createDeliveryChannel() override {
        return new EmailChannel();
    }

    Logger* createLogger() override {
        return new EmailLogger();
    }
};

class SMSNotificationFactory : public NotificationFactory {
public:
    Formatter* createFormatter() override {
        return new SMSFormatter();
    }

    DeliveryChannel* createDeliveryChannel() override {
        return new SMSChannel();
    }

    Logger* createLogger() override {
        return new SMSLogger();
    }
};

class NotificationClient {
    Formatter* formatter;
    DeliveryChannel* channel;
    Logger* logger;

public:
    NotificationClient(NotificationFactory* factory) {
        formatter = factory->createFormatter();
        channel = factory->createDeliveryChannel();
        logger = factory->createLogger();
    }

    void send(const string& message) {
        string formatted = formatter->format(message);
        channel->deliver(formatted);
        logger->log(formatted);
    }
};

int main() {
    cout << "=== Email Notification ===" << endl;
    EmailNotificationFactory emailFactory;
    NotificationClient emailClient(&emailFactory);
    emailClient.send("Your order has been shipped!");

    cout << endl;

    cout << "=== SMS Notification ===" << endl;
    SMSNotificationFactory smsFactory;
    NotificationClient smsClient(&smsFactory);
    smsClient.send("Your order has been shipped!");

    return 0;
}
```

```go
package main

import (
	"fmt"
)

type Formatter interface {
	Format(message string) string
}

type DeliveryChannel interface {
	Deliver(formattedMessage string)
}

type Logger interface {
	Log(message string)
}

type EmailFormatter struct{}

func (e *EmailFormatter) Format(message string) string {
	return "Subject: " + message
}

type SMSFormatter struct{}

func (s *SMSFormatter) Format(message string) string {
	result := "[SMS] " + message
	if len(result) > 160 {
		return result[:160]
	}
	return result
}

type EmailChannel struct{}

func (e *EmailChannel) Deliver(formattedMessage string) {
	fmt.Println("Sending via SMTP: " + formattedMessage)
}

type SMSChannel struct{}

func (s *SMSChannel) Deliver(formattedMessage string) {
	fmt.Println("Sending via SMS gateway: " + formattedMessage)
}

type EmailLogger struct{}

func (e *EmailLogger) Log(message string) {
	fmt.Println("Email log: " + message)
}

type SMSLogger struct{}

func (s *SMSLogger) Log(message string) {
	fmt.Println("SMS log: " + message)
}

type NotificationFactory interface {
	CreateFormatter() Formatter
	CreateDeliveryChannel() DeliveryChannel
	CreateLogger() Logger
}

type EmailNotificationFactory struct{}

func (e *EmailNotificationFactory) CreateFormatter() Formatter {
	return &EmailFormatter{}
}

func (e *EmailNotificationFactory) CreateDeliveryChannel() DeliveryChannel {
	return &EmailChannel{}
}

func (e *EmailNotificationFactory) CreateLogger() Logger {
	return &EmailLogger{}
}

type SMSNotificationFactory struct{}

func (s *SMSNotificationFactory) CreateFormatter() Formatter {
	return &SMSFormatter{}
}

func (s *SMSNotificationFactory) CreateDeliveryChannel() DeliveryChannel {
	return &SMSChannel{}
}

func (s *SMSNotificationFactory) CreateLogger() Logger {
	return &SMSLogger{}
}

type NotificationClient struct {
	formatter Formatter
	channel   DeliveryChannel
	logger    Logger
}

func NewNotificationClient(factory NotificationFactory) *NotificationClient {
	return &NotificationClient{
		formatter: factory.CreateFormatter(),
		channel:   factory.CreateDeliveryChannel(),
		logger:    factory.CreateLogger(),
	}
}

func (n *NotificationClient) Send(message string) {
	formatted := n.formatter.Format(message)
	n.channel.Deliver(formatted)
	n.logger.Log(formatted)
}

func main() {
	fmt.Println("=== Email Notification ===")
	emailClient := NewNotificationClient(&EmailNotificationFactory{})
	emailClient.Send("Your order has been shipped!")

	fmt.Println()

	fmt.Println("=== SMS Notification ===")
	smsClient := NewNotificationClient(&SMSNotificationFactory{})
	smsClient.Send("Your order has been shipped!")
}
```

```csharp
using System;

interface IFormatter { string Format(string message); }
interface IDeliveryChannel { void Deliver(string formattedMessage); }
interface ILogger { void Log(string message); }

class EmailFormatter : IFormatter
{
    public string Format(string message)
    {
        return "Subject: " + message;
    }
}

class SMSFormatter : IFormatter
{
    public string Format(string message)
    {
        string result = "[SMS] " + message;
        return result.Length > 160 " result.Substring(0, 160) : result;
    }
}

class EmailChannel : IDeliveryChannel
{
    public void Deliver(string formattedMessage)
    {
        Console.WriteLine("Sending via SMTP: " + formattedMessage);
    }
}

class SMSChannel : IDeliveryChannel
{
    public void Deliver(string formattedMessage)
    {
        Console.WriteLine("Sending via SMS gateway: " + formattedMessage);
    }
}

class EmailLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine("Email log: " + message);
    }
}

class SMSLogger : ILogger
{
    public void Log(string message)
    {
        Console.WriteLine("SMS log: " + message);
    }
}

interface INotificationFactory
{
    IFormatter CreateFormatter();
    IDeliveryChannel CreateDeliveryChannel();
    ILogger CreateLogger();
}

class EmailNotificationFactory : INotificationFactory
{
    public IFormatter CreateFormatter()
    {
        return new EmailFormatter();
    }

    public IDeliveryChannel CreateDeliveryChannel()
    {
        return new EmailChannel();
    }

    public ILogger CreateLogger()
    {
        return new EmailLogger();
    }
}

class SMSNotificationFactory : INotificationFactory
{
    public IFormatter CreateFormatter()
    {
        return new SMSFormatter();
    }

    public IDeliveryChannel CreateDeliveryChannel()
    {
        return new SMSChannel();
    }

    public ILogger CreateLogger()
    {
        return new SMSLogger();
    }
}

class NotificationClient
{
    private readonly IFormatter _formatter;
    private readonly IDeliveryChannel _channel;
    private readonly ILogger _logger;

    public NotificationClient(INotificationFactory factory)
    {
        _formatter = factory.CreateFormatter();
        _channel = factory.CreateDeliveryChannel();
        _logger = factory.CreateLogger();
    }

    public void Send(string message)
    {
        string formatted = _formatter.Format(message);
        _channel.Deliver(formatted);
        _logger.Log(formatted);
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== Email Notification ===");
        var emailClient = new NotificationClient(new EmailNotificationFactory());
        emailClient.Send("Your order has been shipped!");

        Console.WriteLine();

        Console.WriteLine("=== SMS Notification ===");
        var smsClient = new NotificationClient(new SMSNotificationFactory());
        smsClient.Send("Your order has been shipped!");
    }
}
```

```typescript
interface Formatter {
    format(message: string): string;
}

interface DeliveryChannel {
    deliver(formattedMessage: string): void;
}

interface Logger {
    log(message: string): void;
}

class EmailFormatter implements Formatter {
    format(message: string): string {
        return "Subject: " + message;
    }
}

class SMSFormatter implements Formatter {
    format(message: string): string {
        const result = "[SMS] " + message;
        return result.length > 160 " result.substring(0, 160) : result;
    }
}

class EmailChannel implements DeliveryChannel {
    deliver(formattedMessage: string): void {
        console.log("Sending via SMTP: " + formattedMessage);
    }
}

class SMSChannel implements DeliveryChannel {
    deliver(formattedMessage: string): void {
        console.log("Sending via SMS gateway: " + formattedMessage);
    }
}

class EmailLogger implements Logger {
    log(message: string): void {
        console.log("Email log: " + message);
    }
}

class SMSLogger implements Logger {
    log(message: string): void {
        console.log("SMS log: " + message);
    }
}

interface NotificationFactory {
    createFormatter(): Formatter;
    createDeliveryChannel(): DeliveryChannel;
    createLogger(): Logger;
}

class EmailNotificationFactory implements NotificationFactory {
    createFormatter(): Formatter {
        return new EmailFormatter();
    }

    createDeliveryChannel(): DeliveryChannel {
        return new EmailChannel();
    }

    createLogger(): Logger {
        return new EmailLogger();
    }
}

class SMSNotificationFactory implements NotificationFactory {
    createFormatter(): Formatter {
        return new SMSFormatter();
    }

    createDeliveryChannel(): DeliveryChannel {
        return new SMSChannel();
    }

    createLogger(): Logger {
        return new SMSLogger();
    }
}

class NotificationClient {
    private formatter: Formatter;
    private channel: DeliveryChannel;
    private logger: Logger;

    constructor(factory: NotificationFactory) {
        this.formatter = factory.createFormatter();
        this.channel = factory.createDeliveryChannel();
        this.logger = factory.createLogger();
    }

    send(message: string): void {
        const formatted = this.formatter.format(message);
        this.channel.deliver(formatted);
        this.logger.log(formatted);
    }
}

console.log("=== Email Notification ===");
const emailClient = new NotificationClient(new EmailNotificationFactory());
emailClient.send("Your order has been shipped!");

console.log();

console.log("=== SMS Notification ===");
const smsClient = new NotificationClient(new SMSNotificationFactory());
smsClient.send("Your order has been shipped!");
```

---

# Exercise 3: Cloud Provider Factory

**Problem:** Build a cloud infrastructure abstraction that supports AWS and GCP. Each provider offers three services: `Compute` (virtual machines), `Storage` (object storage), and `Database` (managed databases). A deployment must use services from the same provider, as cross-provider resources cannot communicate over private networks.

**Requirements:**

- `Compute` interface with `launch(instanceType)` method
- `Storage` interface with `createBucket(name)` method
- `Database` interface with `provision(engine, size)` method
- AWS variants: "Launching EC2 instance: t3.micro", "Creating S3 bucket: my-app-data", "Provisioning RDS: mysql, 100GB"
- GCP variants: "Launching GCE instance: t3.micro", "Creating GCS bucket: my-app-data", "Provisioning Cloud SQL: mysql, 100GB"
- `CloudFactory` with `createCompute()`, `createStorage()`, `createDatabase()`
- `AWSFactory` and `GCPFactory`
- A `DeploymentClient` that launches compute, creates storage, and provisions a database

```java
interface Compute {
    void launch(String instanceType);
}

interface Storage {
    void createBucket(String name);
}

interface Database {
    void provision(String engine, String size);
}

class AWSCompute implements Compute {
    @Override
    public void launch(String instanceType) {
        // TODO: Print "Launching EC2 instance: " + instanceType
    }
}

class GCPCompute implements Compute {
    @Override
    public void launch(String instanceType) {
        // TODO: Print "Launching GCE instance: " + instanceType
    }
}

class AWSStorage implements Storage {
    @Override
    public void createBucket(String name) {
        // TODO: Print "Creating S3 bucket: " + name
    }
}

class GCPStorage implements Storage {
    @Override
    public void createBucket(String name) {
        // TODO: Print "Creating GCS bucket: " + name
    }
}

class AWSDatabase implements Database {
    @Override
    public void provision(String engine, String size) {
        // TODO: Print "Provisioning RDS: " + engine + ", " + size
    }
}

class GCPDatabase implements Database {
    @Override
    public void provision(String engine, String size) {
        // TODO: Print "Provisioning Cloud SQL: " + engine + ", " + size
    }
}

interface CloudFactory {
    Compute createCompute();
    Storage createStorage();
    Database createDatabase();
}

class AWSFactory implements CloudFactory {
    @Override
    public Compute createCompute() {
        return null; // TODO: Return a new AWSCompute instance
    }

    @Override
    public Storage createStorage() {
        return null; // TODO: Return a new AWSStorage instance
    }

    @Override
    public Database createDatabase() {
        return null; // TODO: Return a new AWSDatabase instance
    }
}

class GCPFactory implements CloudFactory {
    @Override
    public Compute createCompute() {
        return null; // TODO: Return a new GCPCompute instance
    }

    @Override
    public Storage createStorage() {
        return null; // TODO: Return a new GCPStorage instance
    }

    @Override
    public Database createDatabase() {
        return null; // TODO: Return a new GCPDatabase instance
    }
}

class DeploymentClient {
    private final Compute compute;
    private final Storage storage;
    private final Database database;

    public DeploymentClient(CloudFactory factory) {
        this.compute = factory.createCompute();
        this.storage = factory.createStorage();
        this.database = factory.createDatabase();
    }

    public void deploy() {
        compute.launch("t3.micro");
        storage.createBucket("my-app-data");
        database.provision("mysql", "100GB");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== AWS Deployment ===");
        DeploymentClient aws = new DeploymentClient(new AWSFactory());
        aws.deploy();

        System.out.println();

        System.out.println("=== GCP Deployment ===");
        DeploymentClient gcp = new DeploymentClient(new GCPFactory());
        gcp.deploy();
    }
}
```

```python
from abc import ABC, abstractmethod

class Compute(ABC):
    @abstractmethod
    def launch(self, instance_type: str):
        pass

class Storage(ABC):
    @abstractmethod
    def create_bucket(self, name: str):
        pass

class Database(ABC):
    @abstractmethod
    def provision(self, engine: str, size: str):
        pass

class AWSCompute(Compute):
    def launch(self, instance_type: str):
        # TODO: Print f"Launching EC2 instance: {instance_type}"
        pass

class GCPCompute(Compute):
    def launch(self, instance_type: str):
        # TODO: Print f"Launching GCE instance: {instance_type}"
        pass

class AWSStorage(Storage):
    def create_bucket(self, name: str):
        # TODO: Print f"Creating S3 bucket: {name}"
        pass

class GCPStorage(Storage):
    def create_bucket(self, name: str):
        # TODO: Print f"Creating GCS bucket: {name}"
        pass

class AWSDatabase(Database):
    def provision(self, engine: str, size: str):
        # TODO: Print f"Provisioning RDS: {engine}, {size}"
        pass

class GCPDatabase(Database):
    def provision(self, engine: str, size: str):
        # TODO: Print f"Provisioning Cloud SQL: {engine}, {size}"
        pass

class CloudFactory(ABC):
    @abstractmethod
    def create_compute(self) -> Compute:
        pass

    @abstractmethod
    def create_storage(self) -> Storage:
        pass

    @abstractmethod
    def create_database(self) -> Database:
        pass

class AWSFactory(CloudFactory):
    def create_compute(self) -> Compute:
        return None  # TODO: Return a new AWSCompute instance

    def create_storage(self) -> Storage:
        return None  # TODO: Return a new AWSStorage instance

    def create_database(self) -> Database:
        return None  # TODO: Return a new AWSDatabase instance

class GCPFactory(CloudFactory):
    def create_compute(self) -> Compute:
        return None  # TODO: Return a new GCPCompute instance

    def create_storage(self) -> Storage:
        return None  # TODO: Return a new GCPStorage instance

    def create_database(self) -> Database:
        return None  # TODO: Return a new GCPDatabase instance

class DeploymentClient:
    def __init__(self, factory: CloudFactory):
        self.compute = factory.create_compute()
        self.storage = factory.create_storage()
        self.database = factory.create_database()

    def deploy(self):
        self.compute.launch("t3.micro")
        self.storage.create_bucket("my-app-data")
        self.database.provision("mysql", "100GB")

if __name__ == "__main__":
    print("=== AWS Deployment ===")
    aws = DeploymentClient(AWSFactory())
    aws.deploy()

    print()

    print("=== GCP Deployment ===")
    gcp = DeploymentClient(GCPFactory())
    gcp.deploy()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Compute {
public:
    virtual void launch(const string& instanceType) = 0;
    virtual ~Compute() = default;
};

class Storage {
public:
    virtual void createBucket(const string& name) = 0;
    virtual ~Storage() = default;
};

class Database {
public:
    virtual void provision(const string& engine, const string& size) = 0;
    virtual ~Database() = default;
};

class AWSCompute : public Compute {
public:
    void launch(const string& instanceType) override {
        // TODO: Print "Launching EC2 instance: " + instanceType
    }
};

class GCPCompute : public Compute {
public:
    void launch(const string& instanceType) override {
        // TODO: Print "Launching GCE instance: " + instanceType
    }
};

class AWSStorage : public Storage {
public:
    void createBucket(const string& name) override {
        // TODO: Print "Creating S3 bucket: " + name
    }
};

class GCPStorage : public Storage {
public:
    void createBucket(const string& name) override {
        // TODO: Print "Creating GCS bucket: " + name
    }
};

class AWSDatabase : public Database {
public:
    void provision(const string& engine, const string& size) override {
        // TODO: Print "Provisioning RDS: " + engine + ", " + size
    }
};

class GCPDatabase : public Database {
public:
    void provision(const string& engine, const string& size) override {
        // TODO: Print "Provisioning Cloud SQL: " + engine + ", " + size
    }
};

class CloudFactory {
public:
    virtual Compute* createCompute() = 0;
    virtual Storage* createStorage() = 0;
    virtual Database* createDatabase() = 0;
    virtual ~CloudFactory() = default;
};

class AWSFactory : public CloudFactory {
public:
    Compute* createCompute() override {
        return nullptr; // TODO: Return a new AWSCompute instance
    }

    Storage* createStorage() override {
        return nullptr; // TODO: Return a new AWSStorage instance
    }

    Database* createDatabase() override {
        return nullptr; // TODO: Return a new AWSDatabase instance
    }
};

class GCPFactory : public CloudFactory {
public:
    Compute* createCompute() override {
        return nullptr; // TODO: Return a new GCPCompute instance
    }

    Storage* createStorage() override {
        return nullptr; // TODO: Return a new GCPStorage instance
    }

    Database* createDatabase() override {
        return nullptr; // TODO: Return a new GCPDatabase instance
    }
};

class DeploymentClient {
    Compute* compute;
    Storage* storage;
    Database* database;

public:
    DeploymentClient(CloudFactory* factory) {
        compute = factory->createCompute();
        storage = factory->createStorage();
        database = factory->createDatabase();
    }

    void deploy() {
        compute->launch("t3.micro");
        storage->createBucket("my-app-data");
        database->provision("mysql", "100GB");
    }
};

int main() {
    cout << "=== AWS Deployment ===" << endl;
    AWSFactory awsFactory;
    DeploymentClient aws(&awsFactory);
    aws.deploy();

    cout << endl;

    cout << "=== GCP Deployment ===" << endl;
    GCPFactory gcpFactory;
    DeploymentClient gcp(&gcpFactory);
    gcp.deploy();

    return 0;
}
```

```go
package main

type Compute interface {
	Launch(instanceType string)
}

type Storage interface {
	CreateBucket(name string)
}

type Database interface {
	Provision(engine string, size string)
}

type AWSCompute struct{}

func (a *AWSCompute) Launch(instanceType string) {
	// TODO: Print "Launching EC2 instance: " + instanceType
}

type GCPCompute struct{}

func (g *GCPCompute) Launch(instanceType string) {
	// TODO: Print "Launching GCE instance: " + instanceType
}

type AWSStorage struct{}

func (a *AWSStorage) CreateBucket(name string) {
	// TODO: Print "Creating S3 bucket: " + name
}

type GCPStorage struct{}

func (g *GCPStorage) CreateBucket(name string) {
	// TODO: Print "Creating GCS bucket: " + name
}

type AWSDatabase struct{}

func (a *AWSDatabase) Provision(engine string, size string) {
	// TODO: Print "Provisioning RDS: " + engine + ", " + size
}

type GCPDatabase struct{}

func (g *GCPDatabase) Provision(engine string, size string) {
	// TODO: Print "Provisioning Cloud SQL: " + engine + ", " + size
}

type CloudFactory interface {
	CreateCompute() Compute
	CreateStorage() Storage
	CreateDatabase() Database
}

type AWSFactory struct{}

func (a *AWSFactory) CreateCompute() Compute {
	return nil // TODO: Return a new AWSCompute instance
}

func (a *AWSFactory) CreateStorage() Storage {
	return nil // TODO: Return a new AWSStorage instance
}

func (a *AWSFactory) CreateDatabase() Database {
	return nil // TODO: Return a new AWSDatabase instance
}

type GCPFactory struct{}

func (g *GCPFactory) CreateCompute() Compute {
	return nil // TODO: Return a new GCPCompute instance
}

func (g *GCPFactory) CreateStorage() Storage {
	return nil // TODO: Return a new GCPStorage instance
}

func (g *GCPFactory) CreateDatabase() Database {
	return nil // TODO: Return a new GCPDatabase instance
}

type DeploymentClient struct {
	compute  Compute
	storage  Storage
	database Database
}

func NewDeploymentClient(factory CloudFactory) *DeploymentClient {
	return &DeploymentClient{
		compute:  factory.CreateCompute(),
		storage:  factory.CreateStorage(),
		database: factory.CreateDatabase(),
	}
}

func (d *DeploymentClient) Deploy() {
	d.compute.Launch("t3.micro")
	d.storage.CreateBucket("my-app-data")
	d.database.Provision("mysql", "100GB")
}

func main() {
	println("=== AWS Deployment ===")
	aws := NewDeploymentClient(&AWSFactory{})
	aws.Deploy()

	println()

	println("=== GCP Deployment ===")
	gcp := NewDeploymentClient(&GCPFactory{})
	gcp.Deploy()
}
```

```csharp
using System;

interface ICompute { void Launch(string instanceType); }
interface IStorage { void CreateBucket(string name); }
interface IDatabase { void Provision(string engine, string size); }

class AWSCompute : ICompute
{
    public void Launch(string instanceType)
    {
        // TODO: Print "Launching EC2 instance: " + instanceType
    }
}

class GCPCompute : ICompute
{
    public void Launch(string instanceType)
    {
        // TODO: Print "Launching GCE instance: " + instanceType
    }
}

class AWSStorage : IStorage
{
    public void CreateBucket(string name)
    {
        // TODO: Print "Creating S3 bucket: " + name
    }
}

class GCPStorage : IStorage
{
    public void CreateBucket(string name)
    {
        // TODO: Print "Creating GCS bucket: " + name
    }
}

class AWSDatabase : IDatabase
{
    public void Provision(string engine, string size)
    {
        // TODO: Print "Provisioning RDS: " + engine + ", " + size
    }
}

class GCPDatabase : IDatabase
{
    public void Provision(string engine, string size)
    {
        // TODO: Print "Provisioning Cloud SQL: " + engine + ", " + size
    }
}

interface ICloudFactory
{
    ICompute CreateCompute();
    IStorage CreateStorage();
    IDatabase CreateDatabase();
}

class AWSFactory : ICloudFactory
{
    public ICompute CreateCompute()
    {
        return null; // TODO: Return a new AWSCompute instance
    }

    public IStorage CreateStorage()
    {
        return null; // TODO: Return a new AWSStorage instance
    }

    public IDatabase CreateDatabase()
    {
        return null; // TODO: Return a new AWSDatabase instance
    }
}

class GCPFactory : ICloudFactory
{
    public ICompute CreateCompute()
    {
        return null; // TODO: Return a new GCPCompute instance
    }

    public IStorage CreateStorage()
    {
        return null; // TODO: Return a new GCPStorage instance
    }

    public IDatabase CreateDatabase()
    {
        return null; // TODO: Return a new GCPDatabase instance
    }
}

class DeploymentClient
{
    private readonly ICompute _compute;
    private readonly IStorage _storage;
    private readonly IDatabase _database;

    public DeploymentClient(ICloudFactory factory)
    {
        _compute = factory.CreateCompute();
        _storage = factory.CreateStorage();
        _database = factory.CreateDatabase();
    }

    public void Deploy()
    {
        _compute.Launch("t3.micro");
        _storage.CreateBucket("my-app-data");
        _database.Provision("mysql", "100GB");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== AWS Deployment ===");
        var aws = new DeploymentClient(new AWSFactory());
        aws.Deploy();

        Console.WriteLine();

        Console.WriteLine("=== GCP Deployment ===");
        var gcp = new DeploymentClient(new GCPFactory());
        gcp.Deploy();
    }
}
```

```typescript
interface Compute {
    launch(instanceType: string): void;
}

interface Storage {
    createBucket(name: string): void;
}

interface Database {
    provision(engine: string, size: string): void;
}

class AWSCompute implements Compute {
    launch(instanceType: string): void {
        // TODO: Print "Launching EC2 instance: " + instanceType
    }
}

class GCPCompute implements Compute {
    launch(instanceType: string): void {
        // TODO: Print "Launching GCE instance: " + instanceType
    }
}

class AWSStorage implements Storage {
    createBucket(name: string): void {
        // TODO: Print "Creating S3 bucket: " + name
    }
}

class GCPStorage implements Storage {
    createBucket(name: string): void {
        // TODO: Print "Creating GCS bucket: " + name
    }
}

class AWSDatabase implements Database {
    provision(engine: string, size: string): void {
        // TODO: Print "Provisioning RDS: " + engine + ", " + size
    }
}

class GCPDatabase implements Database {
    provision(engine: string, size: string): void {
        // TODO: Print "Provisioning Cloud SQL: " + engine + ", " + size
    }
}

interface CloudFactory {
    createCompute(): Compute;
    createStorage(): Storage;
    createDatabase(): Database;
}

class AWSFactory implements CloudFactory {
    createCompute(): Compute {
        return null as any; // TODO: Return a new AWSCompute instance
    }

    createStorage(): Storage {
        return null as any; // TODO: Return a new AWSStorage instance
    }

    createDatabase(): Database {
        return null as any; // TODO: Return a new AWSDatabase instance
    }
}

class GCPFactory implements CloudFactory {
    createCompute(): Compute {
        return null as any; // TODO: Return a new GCPCompute instance
    }

    createStorage(): Storage {
        return null as any; // TODO: Return a new GCPStorage instance
    }

    createDatabase(): Database {
        return null as any; // TODO: Return a new GCPDatabase instance
    }
}

class DeploymentClient {
    private compute: Compute;
    private storage: Storage;
    private database: Database;

    constructor(factory: CloudFactory) {
        this.compute = factory.createCompute();
        this.storage = factory.createStorage();
        this.database = factory.createDatabase();
    }

    deploy(): void {
        this.compute.launch("t3.micro");
        this.storage.createBucket("my-app-data");
        this.database.provision("mysql", "100GB");
    }
}

console.log("=== AWS Deployment ===");
const aws = new DeploymentClient(new AWSFactory());
aws.deploy();

console.log();

console.log("=== GCP Deployment ===");
const gcp = new DeploymentClient(new GCPFactory());
gcp.deploy();
```

#### Solutions

```java
interface Compute {
    void launch(String instanceType);
}

interface Storage {
    void createBucket(String name);
}

interface Database {
    void provision(String engine, String size);
}

class AWSCompute implements Compute {
    @Override
    public void launch(String instanceType) {
        System.out.println("Launching EC2 instance: " + instanceType);
    }
}

class GCPCompute implements Compute {
    @Override
    public void launch(String instanceType) {
        System.out.println("Launching GCE instance: " + instanceType);
    }
}

class AWSStorage implements Storage {
    @Override
    public void createBucket(String name) {
        System.out.println("Creating S3 bucket: " + name);
    }
}

class GCPStorage implements Storage {
    @Override
    public void createBucket(String name) {
        System.out.println("Creating GCS bucket: " + name);
    }
}

class AWSDatabase implements Database {
    @Override
    public void provision(String engine, String size) {
        System.out.println("Provisioning RDS: " + engine + ", " + size);
    }
}

class GCPDatabase implements Database {
    @Override
    public void provision(String engine, String size) {
        System.out.println("Provisioning Cloud SQL: " + engine + ", " + size);
    }
}

interface CloudFactory {
    Compute createCompute();
    Storage createStorage();
    Database createDatabase();
}

class AWSFactory implements CloudFactory {
    @Override
    public Compute createCompute() {
        return new AWSCompute();
    }

    @Override
    public Storage createStorage() {
        return new AWSStorage();
    }

    @Override
    public Database createDatabase() {
        return new AWSDatabase();
    }
}

class GCPFactory implements CloudFactory {
    @Override
    public Compute createCompute() {
        return new GCPCompute();
    }

    @Override
    public Storage createStorage() {
        return new GCPStorage();
    }

    @Override
    public Database createDatabase() {
        return new GCPDatabase();
    }
}

class DeploymentClient {
    private final Compute compute;
    private final Storage storage;
    private final Database database;

    public DeploymentClient(CloudFactory factory) {
        this.compute = factory.createCompute();
        this.storage = factory.createStorage();
        this.database = factory.createDatabase();
    }

    public void deploy() {
        compute.launch("t3.micro");
        storage.createBucket("my-app-data");
        database.provision("mysql", "100GB");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("=== AWS Deployment ===");
        DeploymentClient aws = new DeploymentClient(new AWSFactory());
        aws.deploy();

        System.out.println();

        System.out.println("=== GCP Deployment ===");
        DeploymentClient gcp = new DeploymentClient(new GCPFactory());
        gcp.deploy();
    }
}
```

```python
from abc import ABC, abstractmethod

class Compute(ABC):
    @abstractmethod
    def launch(self, instance_type: str):
        pass

class Storage(ABC):
    @abstractmethod
    def create_bucket(self, name: str):
        pass

class Database(ABC):
    @abstractmethod
    def provision(self, engine: str, size: str):
        pass

class AWSCompute(Compute):
    def launch(self, instance_type: str):
        print(f"Launching EC2 instance: {instance_type}")

class GCPCompute(Compute):
    def launch(self, instance_type: str):
        print(f"Launching GCE instance: {instance_type}")

class AWSStorage(Storage):
    def create_bucket(self, name: str):
        print(f"Creating S3 bucket: {name}")

class GCPStorage(Storage):
    def create_bucket(self, name: str):
        print(f"Creating GCS bucket: {name}")

class AWSDatabase(Database):
    def provision(self, engine: str, size: str):
        print(f"Provisioning RDS: {engine}, {size}")

class GCPDatabase(Database):
    def provision(self, engine: str, size: str):
        print(f"Provisioning Cloud SQL: {engine}, {size}")

class CloudFactory(ABC):
    @abstractmethod
    def create_compute(self) -> Compute:
        pass

    @abstractmethod
    def create_storage(self) -> Storage:
        pass

    @abstractmethod
    def create_database(self) -> Database:
        pass

class AWSFactory(CloudFactory):
    def create_compute(self) -> Compute:
        return AWSCompute()

    def create_storage(self) -> Storage:
        return AWSStorage()

    def create_database(self) -> Database:
        return AWSDatabase()

class GCPFactory(CloudFactory):
    def create_compute(self) -> Compute:
        return GCPCompute()

    def create_storage(self) -> Storage:
        return GCPStorage()

    def create_database(self) -> Database:
        return GCPDatabase()

class DeploymentClient:
    def __init__(self, factory: CloudFactory):
        self.compute = factory.create_compute()
        self.storage = factory.create_storage()
        self.database = factory.create_database()

    def deploy(self):
        self.compute.launch("t3.micro")
        self.storage.create_bucket("my-app-data")
        self.database.provision("mysql", "100GB")

if __name__ == "__main__":
    print("=== AWS Deployment ===")
    aws = DeploymentClient(AWSFactory())
    aws.deploy()

    print()

    print("=== GCP Deployment ===")
    gcp = DeploymentClient(GCPFactory())
    gcp.deploy()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Compute {
public:
    virtual void launch(const string& instanceType) = 0;
    virtual ~Compute() = default;
};

class Storage {
public:
    virtual void createBucket(const string& name) = 0;
    virtual ~Storage() = default;
};

class Database {
public:
    virtual void provision(const string& engine, const string& size) = 0;
    virtual ~Database() = default;
};

class AWSCompute : public Compute {
public:
    void launch(const string& instanceType) override {
        cout << "Launching EC2 instance: " << instanceType << endl;
    }
};

class GCPCompute : public Compute {
public:
    void launch(const string& instanceType) override {
        cout << "Launching GCE instance: " << instanceType << endl;
    }
};

class AWSStorage : public Storage {
public:
    void createBucket(const string& name) override {
        cout << "Creating S3 bucket: " << name << endl;
    }
};

class GCPStorage : public Storage {
public:
    void createBucket(const string& name) override {
        cout << "Creating GCS bucket: " << name << endl;
    }
};

class AWSDatabase : public Database {
public:
    void provision(const string& engine, const string& size) override {
        cout << "Provisioning RDS: " << engine << ", " << size << endl;
    }
};

class GCPDatabase : public Database {
public:
    void provision(const string& engine, const string& size) override {
        cout << "Provisioning Cloud SQL: " << engine << ", " << size << endl;
    }
};

class CloudFactory {
public:
    virtual Compute* createCompute() = 0;
    virtual Storage* createStorage() = 0;
    virtual Database* createDatabase() = 0;
    virtual ~CloudFactory() = default;
};

class AWSFactory : public CloudFactory {
public:
    Compute* createCompute() override {
        return new AWSCompute();
    }

    Storage* createStorage() override {
        return new AWSStorage();
    }

    Database* createDatabase() override {
        return new AWSDatabase();
    }
};

class GCPFactory : public CloudFactory {
public:
    Compute* createCompute() override {
        return new GCPCompute();
    }

    Storage* createStorage() override {
        return new GCPStorage();
    }

    Database* createDatabase() override {
        return new GCPDatabase();
    }
};

class DeploymentClient {
    Compute* compute;
    Storage* storage;
    Database* database;

public:
    DeploymentClient(CloudFactory* factory) {
        compute = factory->createCompute();
        storage = factory->createStorage();
        database = factory->createDatabase();
    }

    void deploy() {
        compute->launch("t3.micro");
        storage->createBucket("my-app-data");
        database->provision("mysql", "100GB");
    }
};

int main() {
    cout << "=== AWS Deployment ===" << endl;
    AWSFactory awsFactory;
    DeploymentClient aws(&awsFactory);
    aws.deploy();

    cout << endl;

    cout << "=== GCP Deployment ===" << endl;
    GCPFactory gcpFactory;
    DeploymentClient gcp(&gcpFactory);
    gcp.deploy();

    return 0;
}
```

```go
package main

import "fmt"

type Compute interface {
	Launch(instanceType string)
}

type Storage interface {
	CreateBucket(name string)
}

type Database interface {
	Provision(engine, size string)
}

type AWSCompute struct{}

func (a *AWSCompute) Launch(instanceType string) {
	fmt.Println("Launching EC2 instance:", instanceType)
}

type GCPCompute struct{}

func (g *GCPCompute) Launch(instanceType string) {
	fmt.Println("Launching GCE instance:", instanceType)
}

type AWSStorage struct{}

func (a *AWSStorage) CreateBucket(name string) {
	fmt.Println("Creating S3 bucket:", name)
}

type GCPStorage struct{}

func (g *GCPStorage) CreateBucket(name string) {
	fmt.Println("Creating GCS bucket:", name)
}

type AWSDatabase struct{}

func (a *AWSDatabase) Provision(engine, size string) {
	fmt.Println("Provisioning RDS:", engine+",", size)
}

type GCPDatabase struct{}

func (g *GCPDatabase) Provision(engine, size string) {
	fmt.Println("Provisioning Cloud SQL:", engine+",", size)
}

type CloudFactory interface {
	CreateCompute() Compute
	CreateStorage() Storage
	CreateDatabase() Database
}

type AWSFactory struct{}

func (a *AWSFactory) CreateCompute() Compute {
	return &AWSCompute{}
}

func (a *AWSFactory) CreateStorage() Storage {
	return &AWSStorage{}
}

func (a *AWSFactory) CreateDatabase() Database {
	return &AWSDatabase{}
}

type GCPFactory struct{}

func (g *GCPFactory) CreateCompute() Compute {
	return &GCPCompute{}
}

func (g *GCPFactory) CreateStorage() Storage {
	return &GCPStorage{}
}

func (g *GCPFactory) CreateDatabase() Database {
	return &GCPDatabase{}
}

type DeploymentClient struct {
	compute  Compute
	storage  Storage
	database Database
}

func NewDeploymentClient(factory CloudFactory) *DeploymentClient {
	return &DeploymentClient{
		compute:  factory.CreateCompute(),
		storage:  factory.CreateStorage(),
		database: factory.CreateDatabase(),
	}
}

func (d *DeploymentClient) Deploy() {
	d.compute.Launch("t3.micro")
	d.storage.CreateBucket("my-app-data")
	d.database.Provision("mysql", "100GB")
}

func main() {
	fmt.Println("=== AWS Deployment ===")
	aws := NewDeploymentClient(&AWSFactory{})
	aws.Deploy()

	fmt.Println()

	fmt.Println("=== GCP Deployment ===")
	gcp := NewDeploymentClient(&GCPFactory{})
	gcp.Deploy()
}
```

```csharp
using System;

interface ICompute { void Launch(string instanceType); }
interface IStorage { void CreateBucket(string name); }
interface IDatabase { void Provision(string engine, string size); }

class AWSCompute : ICompute
{
    public void Launch(string instanceType)
    {
        Console.WriteLine("Launching EC2 instance: " + instanceType);
    }
}

class GCPCompute : ICompute
{
    public void Launch(string instanceType)
    {
        Console.WriteLine("Launching GCE instance: " + instanceType);
    }
}

class AWSStorage : IStorage
{
    public void CreateBucket(string name)
    {
        Console.WriteLine("Creating S3 bucket: " + name);
    }
}

class GCPStorage : IStorage
{
    public void CreateBucket(string name)
    {
        Console.WriteLine("Creating GCS bucket: " + name);
    }
}

class AWSDatabase : IDatabase
{
    public void Provision(string engine, string size)
    {
        Console.WriteLine("Provisioning RDS: " + engine + ", " + size);
    }
}

class GCPDatabase : IDatabase
{
    public void Provision(string engine, string size)
    {
        Console.WriteLine("Provisioning Cloud SQL: " + engine + ", " + size);
    }
}

interface ICloudFactory
{
    ICompute CreateCompute();
    IStorage CreateStorage();
    IDatabase CreateDatabase();
}

class AWSFactory : ICloudFactory
{
    public ICompute CreateCompute()
    {
        return new AWSCompute();
    }

    public IStorage CreateStorage()
    {
        return new AWSStorage();
    }

    public IDatabase CreateDatabase()
    {
        return new AWSDatabase();
    }
}

class GCPFactory : ICloudFactory
{
    public ICompute CreateCompute()
    {
        return new GCPCompute();
    }

    public IStorage CreateStorage()
    {
        return new GCPStorage();
    }

    public IDatabase CreateDatabase()
    {
        return new GCPDatabase();
    }
}

class DeploymentClient
{
    private readonly ICompute _compute;
    private readonly IStorage _storage;
    private readonly IDatabase _database;

    public DeploymentClient(ICloudFactory factory)
    {
        _compute = factory.CreateCompute();
        _storage = factory.CreateStorage();
        _database = factory.CreateDatabase();
    }

    public void Deploy()
    {
        _compute.Launch("t3.micro");
        _storage.CreateBucket("my-app-data");
        _database.Provision("mysql", "100GB");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== AWS Deployment ===");
        var aws = new DeploymentClient(new AWSFactory());
        aws.Deploy();

        Console.WriteLine();

        Console.WriteLine("=== GCP Deployment ===");
        var gcp = new DeploymentClient(new GCPFactory());
        gcp.Deploy();
    }
}
```

```typescript
interface Compute {
    launch(instanceType: string): void;
}

interface Storage {
    createBucket(name: string): void;
}

interface Database {
    provision(engine: string, size: string): void;
}

class AWSCompute implements Compute {
    launch(instanceType: string): void {
        console.log("Launching EC2 instance: " + instanceType);
    }
}

class GCPCompute implements Compute {
    launch(instanceType: string): void {
        console.log("Launching GCE instance: " + instanceType);
    }
}

class AWSStorage implements Storage {
    createBucket(name: string): void {
        console.log("Creating S3 bucket: " + name);
    }
}

class GCPStorage implements Storage {
    createBucket(name: string): void {
        console.log("Creating GCS bucket: " + name);
    }
}

class AWSDatabase implements Database {
    provision(engine: string, size: string): void {
        console.log("Provisioning RDS: " + engine + ", " + size);
    }
}

class GCPDatabase implements Database {
    provision(engine: string, size: string): void {
        console.log("Provisioning Cloud SQL: " + engine + ", " + size);
    }
}

interface CloudFactory {
    createCompute(): Compute;
    createStorage(): Storage;
    createDatabase(): Database;
}

class AWSFactory implements CloudFactory {
    createCompute(): Compute {
        return new AWSCompute();
    }

    createStorage(): Storage {
        return new AWSStorage();
    }

    createDatabase(): Database {
        return new AWSDatabase();
    }
}

class GCPFactory implements CloudFactory {
    createCompute(): Compute {
        return new GCPCompute();
    }

    createStorage(): Storage {
        return new GCPStorage();
    }

    createDatabase(): Database {
        return new GCPDatabase();
    }
}

class DeploymentClient {
    private compute: Compute;
    private storage: Storage;
    private database: Database;

    constructor(factory: CloudFactory) {
        this.compute = factory.createCompute();
        this.storage = factory.createStorage();
        this.database = factory.createDatabase();
    }

    deploy(): void {
        this.compute.launch("t3.micro");
        this.storage.createBucket("my-app-data");
        this.database.provision("mysql", "100GB");
    }
}

console.log("=== AWS Deployment ===");
const aws = new DeploymentClient(new AWSFactory());
aws.deploy();

console.log();

console.log("=== GCP Deployment ===");
const gcp = new DeploymentClient(new GCPFactory());
gcp.deploy();
```


