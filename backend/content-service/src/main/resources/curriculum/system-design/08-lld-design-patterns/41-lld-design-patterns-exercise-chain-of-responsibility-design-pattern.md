---
id: "lld-design-patterns-exercise-chain-of-responsibility-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Chain of Responsibility Design Pattern"
slug: "lld-design-patterns-exercise-chain-of-responsibility-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Chain of Responsibility Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Chain of Responsibility Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Logging Framework

Build a log level filter chain where each logger handles messages at or above its level. A `DebugLogger` handles all messages, `InfoLogger` handles INFO and above, `WarnLogger` handles WARN and above, and `ErrorLogger` handles only ERROR. Each logger prints the message at its level and passes it to the next logger.

**Requirements:**

- `LogLevel` constants: `DEBUG=1`, `INFO=2`, `WARN=3`, `ERROR=4`
- `LogMessage` class with `level` and `message` fields
- `Logger` interface with `setNext()` and `log()` methods
- `BaseLogger` abstract class with forwarding logic
- `DebugLogger` handles level >= 1, prints `[DEBUG] message`
- `InfoLogger` handles level >= 2, prints `[INFO] message`
- `WarnLogger` handles level >= 3, prints `[WARN] message`
- `ErrorLogger` handles level >= 4, prints `[ERROR] message`

```java
class LogMessage {
    public int level;
    public String message;

    public LogMessage(int level, String message) {
        this.level = level;
        this.message = message;
    }
}

interface Logger {
    void setNext(Logger next);
    void log(LogMessage msg);
}

abstract class BaseLogger implements Logger {
    protected Logger next;

    @Override
    public void setNext(Logger next) { this.next = next; }

    protected void forward(LogMessage msg) {
        if (next != null) next.log(msg);
    }
}

class ErrorLogger extends BaseLogger {
    @Override
    public void log(LogMessage msg) {
        // TODO: If msg.level >= 4, print "[ERROR] " + msg.message
        // TODO: Always forward to next
    }
}

class WarnLogger extends BaseLogger {
    @Override
    public void log(LogMessage msg) {
        // TODO: If msg.level >= 3, print "[WARN] " + msg.message
        // TODO: Always forward to next
    }
}

class InfoLogger extends BaseLogger {
    @Override
    public void log(LogMessage msg) {
        // TODO: If msg.level >= 2, print "[INFO] " + msg.message
        // TODO: Always forward to next
    }
}

class DebugLogger extends BaseLogger {
    @Override
    public void log(LogMessage msg) {
        // TODO: If msg.level >= 1, print "[DEBUG] " + msg.message
        // TODO: Always forward to next
    }
}

public class Main {
    public static void main(String[] args) {
        // ErrorLogger -> WarnLogger -> InfoLogger -> DebugLogger
        // error.log(new LogMessage(2, "User logged in"));
        // error.log(new LogMessage(4, "Database connection lost"));
    }
}
```

```python
from abc import ABC, abstractmethod

class LogMessage:
    def __init__(self, level, message):
        self.level = level
        self.message = message

class Logger(ABC):
    @abstractmethod
    def set_next(self, next_logger): pass

    @abstractmethod
    def log(self, msg): pass

class BaseLogger(Logger):
    def __init__(self):
        self.next = None

    def set_next(self, next_logger):
        self.next = next_logger

    def forward(self, msg):
        if self.next:
            self.next.log(msg)

class ErrorLogger(BaseLogger):
    def log(self, msg):
        # TODO: If msg.level >= 4, print "[ERROR] " + msg.message
        # TODO: Always forward to next
        pass

class WarnLogger(BaseLogger):
    def log(self, msg):
        # TODO: If msg.level >= 3, print "[WARN] " + msg.message
        # TODO: Always forward to next
        pass

class InfoLogger(BaseLogger):
    def log(self, msg):
        # TODO: If msg.level >= 2, print "[INFO] " + msg.message
        # TODO: Always forward to next
        pass

class DebugLogger(BaseLogger):
    def log(self, msg):
        # TODO: If msg.level >= 1, print "[DEBUG] " + msg.message
        # TODO: Always forward to next
        pass

# error = ErrorLogger()
# warn = WarnLogger()
# info = InfoLogger()
# debug = DebugLogger()
# error.set_next(warn); warn.set_next(info); info.set_next(debug)
# error.log(LogMessage(2, "User logged in"))
# error.log(LogMessage(4, "Database connection lost"))
```

```cpp
#include <iostream>
#include <string>
using namespace std;

struct LogMessage {
    int level;
    string message;
    LogMessage(int level, string message) : level(level), message(message) {}
};

class Logger {
public:
    virtual void setNext(Logger* next) = 0;
    virtual void log(LogMessage msg) = 0;
    virtual ~Logger() {}
};

class BaseLogger : public Logger {
protected:
    Logger* next = nullptr;
public:
    void setNext(Logger* next) override { this->next = next; }
    void forward(LogMessage msg) { if (next) next->log(msg); }
};

class ErrorLogger : public BaseLogger {
public:
    void log(LogMessage msg) override {
        // TODO: If msg.level >= 4, print "[ERROR] " + msg.message
        // TODO: Always forward to next
    }
};

class WarnLogger : public BaseLogger {
public:
    void log(LogMessage msg) override {
        // TODO: If msg.level >= 3, print "[WARN] " + msg.message
        // TODO: Always forward to next
    }
};

class InfoLogger : public BaseLogger {
public:
    void log(LogMessage msg) override {
        // TODO: If msg.level >= 2, print "[INFO] " + msg.message
        // TODO: Always forward to next
    }
};

class DebugLogger : public BaseLogger {
public:
    void log(LogMessage msg) override {
        // TODO: If msg.level >= 1, print "[DEBUG] " + msg.message
        // TODO: Always forward to next
    }
};

int main() {
    // ErrorLogger error; WarnLogger warn; InfoLogger info; DebugLogger debug;
    // error.setNext(&warn); warn.setNext(&info); info.setNext(&debug);
    // error.log(LogMessage(2, "User logged in"));
    // error.log(LogMessage(4, "Database connection lost"));
    return 0;
}
```

```go
package main

type LogMessage struct {
	Level   int
	Message string
}

func NewLogMessage(level int, message string) LogMessage {
	return LogMessage{
		Level:   level,
		Message: message,
	}
}

type Logger interface {
	SetNext(next Logger)
	Log(msg LogMessage)
}

type BaseLogger struct {
	next Logger
}

func (b *BaseLogger) SetNext(next Logger) {
	b.next = next
}

func (b *BaseLogger) forward(msg LogMessage) {
	if b.next != nil {
		b.next.Log(msg)
	}
}

type ErrorLogger struct {
	BaseLogger
}

func (e *ErrorLogger) Log(msg LogMessage) {
	// TODO: If msg.Level >= 4, print "[ERROR] " + msg.Message
	// TODO: Always forward to next
}

type WarnLogger struct {
	BaseLogger
}

func (w *WarnLogger) Log(msg LogMessage) {
	// TODO: If msg.Level >= 3, print "[WARN] " + msg.Message
	// TODO: Always forward to next
}

type InfoLogger struct {
	BaseLogger
}

func (i *InfoLogger) Log(msg LogMessage) {
	// TODO: If msg.Level >= 2, print "[INFO] " + msg.Message
	// TODO: Always forward to next
}

type DebugLogger struct {
	BaseLogger
}

func (d *DebugLogger) Log(msg LogMessage) {
	// TODO: If msg.Level >= 1, print "[DEBUG] " + msg.Message
	// TODO: Always forward to next
}

func main() {
	// errorLogger := &ErrorLogger{}
	// warnLogger := &WarnLogger{}
	// infoLogger := &InfoLogger{}
	// debugLogger := &DebugLogger{}
	// errorLogger.SetNext(warnLogger)
	// warnLogger.SetNext(infoLogger)
	// infoLogger.SetNext(debugLogger)
	// errorLogger.Log(NewLogMessage(2, "User logged in"))
	// errorLogger.Log(NewLogMessage(4, "Database connection lost"))
}
```

```csharp
using System;

class LogMessage
{
    public int Level;
    public string Message;
    public LogMessage(int level, string message)
    {
        Level = level;
        Message = message;
    }
}

interface ILogger
{
    void SetNext(ILogger next);
    void Log(LogMessage msg);
}

abstract class BaseLogger : ILogger
{
    protected ILogger next;
    public void SetNext(ILogger next)
    {
        this.next = next;
    }
    protected void Forward(LogMessage msg)
    {
        next".Log(msg);
    }
    public abstract void Log(LogMessage msg);
}

class ErrorLogger : BaseLogger
{
    public override void Log(LogMessage msg)
    {
        // TODO: If msg.Level >= 4, print "[ERROR] " + msg.Message
        // TODO: Always forward to next
    }
}

class WarnLogger : BaseLogger
{
    public override void Log(LogMessage msg)
    {
        // TODO: If msg.Level >= 3, print "[WARN] " + msg.Message
        // TODO: Always forward to next
    }
}

class InfoLogger : BaseLogger
{
    public override void Log(LogMessage msg)
    {
        // TODO: If msg.Level >= 2, print "[INFO] " + msg.Message
        // TODO: Always forward to next
    }
}

class DebugLogger : BaseLogger
{
    public override void Log(LogMessage msg)
    {
        // TODO: If msg.Level >= 1, print "[DEBUG] " + msg.Message
        // TODO: Always forward to next
    }
}

class Program
{
    static void Main(string[] args)
    {
        // var error = new ErrorLogger(); var warn = new WarnLogger();
        // var info = new InfoLogger(); var debug = new DebugLogger();
        // error.SetNext(warn); warn.SetNext(info); info.SetNext(debug);
        // error.Log(new LogMessage(2, "User logged in"));
        // error.Log(new LogMessage(4, "Database connection lost"));
    }
}
```

```typescript
class LogMessage {
    level: number;
    message: string;
    constructor(level: number, message: string) {
        this.level = level;
        this.message = message;
    }
}

interface Logger {
    setNext(next: Logger): void;
    log(msg: LogMessage): void;
}

abstract class BaseLogger implements Logger {
    protected next: Logger | null = null;
    setNext(next: Logger): void {
        this.next = next;
    }
    protected forward(msg: LogMessage): void {
        this.next".log(msg);
    }
    abstract log(msg: LogMessage): void;
}

class ErrorLogger extends BaseLogger {
    log(msg: LogMessage): void {
        // TODO: If msg.level >= 4, print "[ERROR] " + msg.message
        // TODO: Always forward to next
    }
}

class WarnLogger extends BaseLogger {
    log(msg: LogMessage): void {
        // TODO: If msg.level >= 3, print "[WARN] " + msg.message
        // TODO: Always forward to next
    }
}

class InfoLogger extends BaseLogger {
    log(msg: LogMessage): void {
        // TODO: If msg.level >= 2, print "[INFO] " + msg.message
        // TODO: Always forward to next
    }
}

class DebugLogger extends BaseLogger {
    log(msg: LogMessage): void {
        // TODO: If msg.level >= 1, print "[DEBUG] " + msg.message
        // TODO: Always forward to next
    }
}

// const error = new ErrorLogger(); const warn = new WarnLogger();
// const info = new InfoLogger(); const debug = new DebugLogger();
// error.setNext(warn); warn.setNext(info); info.setNext(debug);
// error.log(new LogMessage(2, "User logged in"));
// error.log(new LogMessage(4, "Database connection lost"));
```

#### Solutions

```java
class LogMessage {
    public int level;
    public String message;

    public LogMessage(int level, String message) {
        this.level = level;
        this.message = message;
    }
}

interface Logger {
    void setNext(Logger next);
    void log(LogMessage msg);
}

abstract class BaseLogger implements Logger {
    protected Logger next;

    @Override
    public void setNext(Logger next) { this.next = next; }

    protected void forward(LogMessage msg) {
        if (next != null) next.log(msg);
    }
}

class ErrorLogger extends BaseLogger {
    @Override
    public void log(LogMessage msg) {
        if (msg.level >= 4) System.out.println("[ERROR] " + msg.message);
        forward(msg);
    }
}

class WarnLogger extends BaseLogger {
    @Override
    public void log(LogMessage msg) {
        if (msg.level >= 3) System.out.println("[WARN] " + msg.message);
        forward(msg);
    }
}

class InfoLogger extends BaseLogger {
    @Override
    public void log(LogMessage msg) {
        if (msg.level >= 2) System.out.println("[INFO] " + msg.message);
        forward(msg);
    }
}

class DebugLogger extends BaseLogger {
    @Override
    public void log(LogMessage msg) {
        if (msg.level >= 1) System.out.println("[DEBUG] " + msg.message);
        forward(msg);
    }
}

public class Main {
    public static void main(String[] args) {
        ErrorLogger error = new ErrorLogger();
        WarnLogger warn = new WarnLogger();
        InfoLogger info = new InfoLogger();
        DebugLogger debug = new DebugLogger();
        error.setNext(warn);
        warn.setNext(info);
        info.setNext(debug);
        error.log(new LogMessage(2, "User logged in"));
        error.log(new LogMessage(4, "Database connection lost"));
    }
}
```

```python
from abc import ABC, abstractmethod

class LogMessage:
    def __init__(self, level, message):
        self.level = level
        self.message = message

class Logger(ABC):
    @abstractmethod
    def set_next(self, next_logger): pass

    @abstractmethod
    def log(self, msg): pass

class BaseLogger(Logger):
    def __init__(self):
        self.next = None

    def set_next(self, next_logger):
        self.next = next_logger

    def forward(self, msg):
        if self.next:
            self.next.log(msg)

class ErrorLogger(BaseLogger):
    def log(self, msg):
        if msg.level >= 4:
            print(f"[ERROR] {msg.message}")
        self.forward(msg)

class WarnLogger(BaseLogger):
    def log(self, msg):
        if msg.level >= 3:
            print(f"[WARN] {msg.message}")
        self.forward(msg)

class InfoLogger(BaseLogger):
    def log(self, msg):
        if msg.level >= 2:
            print(f"[INFO] {msg.message}")
        self.forward(msg)

class DebugLogger(BaseLogger):
    def log(self, msg):
        if msg.level >= 1:
            print(f"[DEBUG] {msg.message}")
        self.forward(msg)

error = ErrorLogger()
warn = WarnLogger()
info = InfoLogger()
debug = DebugLogger()
error.set_next(warn)
warn.set_next(info)
info.set_next(debug)
error.log(LogMessage(2, "User logged in"))
error.log(LogMessage(4, "Database connection lost"))
```

```cpp
#include <iostream>
#include <string>
using namespace std;

struct LogMessage {
    int level;
    string message;
    LogMessage(int level, string message) : level(level), message(message) {}
};

class Logger {
public:
    virtual void setNext(Logger* next) = 0;
    virtual void log(LogMessage msg) = 0;
    virtual ~Logger() {}
};

class BaseLogger : public Logger {
protected:
    Logger* next = nullptr;
public:
    void setNext(Logger* next) override { this->next = next; }
    void forward(LogMessage msg) { if (next) next->log(msg); }
};

class ErrorLogger : public BaseLogger {
public:
    void log(LogMessage msg) override {
        if (msg.level >= 4) cout << "[ERROR] " << msg.message << endl;
        forward(msg);
    }
};

class WarnLogger : public BaseLogger {
public:
    void log(LogMessage msg) override {
        if (msg.level >= 3) cout << "[WARN] " << msg.message << endl;
        forward(msg);
    }
};

class InfoLogger : public BaseLogger {
public:
    void log(LogMessage msg) override {
        if (msg.level >= 2) cout << "[INFO] " << msg.message << endl;
        forward(msg);
    }
};

class DebugLogger : public BaseLogger {
public:
    void log(LogMessage msg) override {
        if (msg.level >= 1) cout << "[DEBUG] " << msg.message << endl;
        forward(msg);
    }
};

int main() {
    ErrorLogger error; 
	WarnLogger warn; 
	InfoLogger info; 
	DebugLogger debug;
    error.setNext(&warn); 
	warn.setNext(&info); 
	info.setNext(&debug);
    error.log(LogMessage(2, "User logged in"));
    error.log(LogMessage(4, "Database connection lost"));
    return 0;
}
```

```go
package main

import "fmt"

type LogMessage struct {
	Level   int
	Message string
}

type Logger interface {
	SetNext(next Logger)
	Log(msg LogMessage)
}

type BaseLogger struct {
	next Logger
}

func (b *BaseLogger) SetNext(next Logger) {
	b.next = next
}

func (b *BaseLogger) forward(msg LogMessage) {
	if b.next != nil {
		b.next.Log(msg)
	}
}

type ErrorLogger struct {
	BaseLogger
}

func (l *ErrorLogger) Log(msg LogMessage) {
	if msg.Level >= 4 {
		fmt.Println("[ERROR] " + msg.Message)
	}
	l.forward(msg)
}

type WarnLogger struct {
	BaseLogger
}

func (l *WarnLogger) Log(msg LogMessage) {
	if msg.Level >= 3 {
		fmt.Println("[WARN] " + msg.Message)
	}
	l.forward(msg)
}

type InfoLogger struct {
	BaseLogger
}

func (l *InfoLogger) Log(msg LogMessage) {
	if msg.Level >= 2 {
		fmt.Println("[INFO] " + msg.Message)
	}
	l.forward(msg)
}

type DebugLogger struct {
	BaseLogger
}

func (l *DebugLogger) Log(msg LogMessage) {
	if msg.Level >= 1 {
		fmt.Println("[DEBUG] " + msg.Message)
	}
	l.forward(msg)
}

func main() {
	errorLogger := &ErrorLogger{}
	warnLogger := &WarnLogger{}
	infoLogger := &InfoLogger{}
	debugLogger := &DebugLogger{}

	errorLogger.SetNext(warnLogger)
	warnLogger.SetNext(infoLogger)
	infoLogger.SetNext(debugLogger)

	errorLogger.Log(LogMessage{Level: 2, Message: "User logged in"})
	errorLogger.Log(LogMessage{Level: 4, Message: "Database connection lost"})
}
```

```csharp
using System;

class LogMessage
{
    public int Level;
    public string Message;
    public LogMessage(int level, string message)
    {
        Level = level;
        Message = message;
    }
}

interface ILogger
{
    void SetNext(ILogger next);
    void Log(LogMessage msg);
}

abstract class BaseLogger : ILogger
{
    protected ILogger next;
    public void SetNext(ILogger next)
    {
        this.next = next;
    }
    protected void Forward(LogMessage msg)
    {
        next".Log(msg);
    }
    public abstract void Log(LogMessage msg);
}

class ErrorLogger : BaseLogger
{
    public override void Log(LogMessage msg)
    {
        if (msg.Level >= 4) Console.WriteLine("[ERROR] " + msg.Message);
        Forward(msg);
    }
}

class WarnLogger : BaseLogger
{
    public override void Log(LogMessage msg)
    {
        if (msg.Level >= 3) Console.WriteLine("[WARN] " + msg.Message);
        Forward(msg);
    }
}

class InfoLogger : BaseLogger
{
    public override void Log(LogMessage msg)
    {
        if (msg.Level >= 2) Console.WriteLine("[INFO] " + msg.Message);
        Forward(msg);
    }
}

class DebugLogger : BaseLogger
{
    public override void Log(LogMessage msg)
    {
        if (msg.Level >= 1) Console.WriteLine("[DEBUG] " + msg.Message);
        Forward(msg);
    }
}

class Program
{
    static void Main(string[] args)
    {
        var error = new ErrorLogger();
        var warn = new WarnLogger();
        var info = new InfoLogger();
        var debug = new DebugLogger();

        error.SetNext(warn);
        warn.SetNext(info);
        info.SetNext(debug);

        error.Log(new LogMessage(2, "User logged in"));
        error.Log(new LogMessage(4, "Database connection lost"));
    }
}
```

```typescript
class LogMessage {
    level: number;
    message: string;
    constructor(level: number, message: string) {
        this.level = level;
        this.message = message;
    }
}

interface Logger {
    setNext(next: Logger): void;
    log(msg: LogMessage): void;
}

abstract class BaseLogger implements Logger {
    protected next: Logger | null = null;
    setNext(next: Logger): void {
        this.next = next;
    }
    protected forward(msg: LogMessage): void {
        this.next".log(msg);
    }
    abstract log(msg: LogMessage): void;
}

class ErrorLogger extends BaseLogger {
    log(msg: LogMessage): void {
        if (msg.level >= 4) console.log("[ERROR] " + msg.message);
        this.forward(msg);
    }
}

class WarnLogger extends BaseLogger {
    log(msg: LogMessage): void {
        if (msg.level >= 3) console.log("[WARN] " + msg.message);
        this.forward(msg);
    }
}

class InfoLogger extends BaseLogger {
    log(msg: LogMessage): void {
        if (msg.level >= 2) console.log("[INFO] " + msg.message);
        this.forward(msg);
    }
}

class DebugLogger extends BaseLogger {
    log(msg: LogMessage): void {
        if (msg.level >= 1) console.log("[DEBUG] " + msg.message);
        this.forward(msg);
    }
}

const error = new ErrorLogger(); 
const warn = new WarnLogger();
const info = new InfoLogger(); 
const debug = new DebugLogger();
error.setNext(warn); warn.setNext(info); info.setNext(debug);
error.log(new LogMessage(2, "User logged in"));
error.log(new LogMessage(4, "Database connection lost"));
```

---

# Exercise 2: Discount Calculator

> [!PAYWALL] This content is for premium members only.

Build a chain of discount handlers that apply discounts to an order. Each handler checks if its discount applies and modifies the order total. All applicable discounts stack.

**Requirements:**

- `Order` class with `customerId`, `total` (double), `isLoyalCustomer` (boolean), `itemCount` (int), `couponCode` (String)
- `DiscountHandler` interface with `setNext()` and `apply()` methods
- `LoyaltyDiscount`: if `isLoyalCustomer`, apply 10% discount, print the discount
- `BulkDiscount`: if `itemCount >= 10`, apply 5% discount, print the discount
- `CouponDiscount`: if `couponCode` equals `"SAVE20"`, apply 20% discount, print the discount
- Each handler applies its discount (if applicable) AND passes to next (impure chain)

```java
class Order {
    public String customerId;
    public double total;
    public boolean isLoyalCustomer;
    public int itemCount;
    public String couponCode;

    public Order(String customerId, double total, boolean isLoyalCustomer, int itemCount, String couponCode) {
        this.customerId = customerId;
        this.total = total;
        this.isLoyalCustomer = isLoyalCustomer;
        this.itemCount = itemCount;
        this.couponCode = couponCode;
    }
}

interface DiscountHandler {
    void setNext(DiscountHandler next);
    void apply(Order order);
}

abstract class BaseDiscountHandler implements DiscountHandler {
    protected DiscountHandler next;

    @Override
    public void setNext(DiscountHandler next) { this.next = next; }

    protected void forward(Order order) {
        if (next != null) next.apply(order);
    }
}

class LoyaltyDiscount extends BaseDiscountHandler {
    @Override
    public void apply(Order order) {
        // TODO: If order.isLoyalCustomer, calculate 10% discount, subtract from total, print discount
        // TODO: Forward to next
    }
}

class BulkDiscount extends BaseDiscountHandler {
    @Override
    public void apply(Order order) {
        // TODO: If order.itemCount >= 10, calculate 5% discount, subtract from total, print discount
        // TODO: Forward to next
    }
}

class CouponDiscount extends BaseDiscountHandler {
    @Override
    public void apply(Order order) {
        // TODO: If order.couponCode equals "SAVE20", calculate 20% discount, subtract from total, print discount
        // TODO: Forward to next
    }
}

public class Main {
    public static void main(String[] args) {
        // Order order = new Order("C-100", 200.0, true, 15, "SAVE20");
        // LoyaltyDiscount loyalty = new LoyaltyDiscount();
        // BulkDiscount bulk = new BulkDiscount();
        // CouponDiscount coupon = new CouponDiscount();
        // loyalty.setNext(bulk); bulk.setNext(coupon);
        // System.out.println("Original total: $" + order.total);
        // loyalty.apply(order);
        // System.out.println("Final total: $" + order.total);
    }
}
```

```python
from abc import ABC, abstractmethod

class Order:
    def __init__(self, customer_id, total, is_loyal, item_count, coupon_code):
        self.customer_id = customer_id
        self.total = total
        self.is_loyal = is_loyal
        self.item_count = item_count
        self.coupon_code = coupon_code

class DiscountHandler(ABC):
    @abstractmethod
    def set_next(self, handler): pass

    @abstractmethod
    def apply(self, order): pass

class BaseDiscountHandler(DiscountHandler):
    def __init__(self):
        self.next = None

    def set_next(self, handler):
        self.next = handler

    def forward(self, order):
        if self.next:
            self.next.apply(order)

class LoyaltyDiscount(BaseDiscountHandler):
    def apply(self, order):
        # TODO: If order.is_loyal, calculate 10% discount, subtract from total, print discount
        # TODO: Forward to next
        pass

class BulkDiscount(BaseDiscountHandler):
    def apply(self, order):
        # TODO: If order.item_count >= 10, calculate 5% discount, subtract from total, print discount
        # TODO: Forward to next
        pass

class CouponDiscount(BaseDiscountHandler):
    def apply(self, order):
        # TODO: If order.coupon_code == "SAVE20", calculate 20% discount, subtract from total, print discount
        # TODO: Forward to next
        pass

# order = Order("C-100", 200.0, True, 15, "SAVE20")
# loyalty = LoyaltyDiscount(); bulk = BulkDiscount(); coupon = CouponDiscount()
# loyalty.set_next(bulk); bulk.set_next(coupon)
# print(f"Original total: ${order.total}")
# loyalty.apply(order)
# print(f"Final total: ${order.total}")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Order {
    string customerId;
    double total;
    bool isLoyalCustomer;
    int itemCount;
    string couponCode;

    Order(string id, double total, bool loyal, int items, string coupon)
        : customerId(id), total(total), isLoyalCustomer(loyal), itemCount(items), couponCode(coupon) {}
};

class DiscountHandler {
public:
    virtual void setNext(DiscountHandler* next) = 0;
    virtual void apply(Order& order) = 0;
    virtual ~DiscountHandler() {}
};

class BaseDiscountHandler : public DiscountHandler {
protected:
    DiscountHandler* next = nullptr;
public:
    void setNext(DiscountHandler* next) override { this->next = next; }
    void forward(Order& order) { if (next) next->apply(order); }
};

class LoyaltyDiscount : public BaseDiscountHandler {
public:
    void apply(Order& order) override {
        // TODO: If order.isLoyalCustomer, calculate 10% discount, subtract, print
        // TODO: Forward to next
    }
};

class BulkDiscount : public BaseDiscountHandler {
public:
    void apply(Order& order) override {
        // TODO: If order.itemCount >= 10, calculate 5% discount, subtract, print
        // TODO: Forward to next
    }
};

class CouponDiscount : public BaseDiscountHandler {
public:
    void apply(Order& order) override {
        // TODO: If order.couponCode == "SAVE20", calculate 20% discount, subtract, print
        // TODO: Forward to next
    }
};

int main() {
    // Order order("C-100", 200.0, true, 15, "SAVE20");
    // LoyaltyDiscount loyalty; BulkDiscount bulk; CouponDiscount coupon;
    // loyalty.setNext(&bulk); bulk.setNext(&coupon);
    // cout << "Original total: $" << order.total << endl;
    // loyalty.apply(order);
    // cout << "Final total: $" << order.total << endl;
    return 0;
}
```

```go
package main

type Order struct {
	customerId      string
	total           float64
	isLoyalCustomer bool
	itemCount       int
	couponCode      string
}

func NewOrder(customerId string, total float64, isLoyalCustomer bool, itemCount int, couponCode string) *Order {
	return &Order{
		customerId:      customerId,
		total:           total,
		isLoyalCustomer: isLoyalCustomer,
		itemCount:       itemCount,
		couponCode:      couponCode,
	}
}

type DiscountHandler interface {
	setNext(next DiscountHandler)
	apply(order *Order)
}

type BaseDiscountHandler struct {
	next DiscountHandler
}

func (b *BaseDiscountHandler) setNext(next DiscountHandler) {
	b.next = next
}

func (b *BaseDiscountHandler) forward(order *Order) {
	if b.next != nil {
		b.next.apply(order)
	}
}

type LoyaltyDiscount struct {
	BaseDiscountHandler
}

func (l *LoyalDiscount) apply(order *Order) {
	// TODO: If order.isLoyalCustomer, calculate 10% discount, subtract from total, print discount
	// TODO: Forward to next
}

type BulkDiscount struct {
	BaseDiscountHandler
}

func (b *BulkDiscount) apply(order *Order) {
	// TODO: If order.itemCount >= 10, calculate 5% discount, subtract from total, print discount
	// TODO: Forward to next
}

type CouponDiscount struct {
	BaseDiscountHandler
}

func (c *CouponDiscount) apply(order *Order) {
	// TODO: If order.couponCode equals "SAVE20", calculate 20% discount, subtract from total, print discount
	// TODO: Forward to next
}

func main() {
	// order := NewOrder("C-100", 200.0, true, 15, "SAVE20")
	// loyalty := &LoyaltyDiscount{}
	// bulk := &BulkDiscount{}
	// coupon := &CouponDiscount{}
	// loyalty.setNext(bulk)
	// bulk.setNext(coupon)
	// println("Original total: $" + fmt.Sprint(order.total))
	// loyalty.apply(order)
	// println("Final total: $" + fmt.Sprint(order.total))
}
```

```csharp
using System;

class Order
{
    public string CustomerId;
    public double Total;
    public bool IsLoyalCustomer;
    public int ItemCount;
    public string CouponCode;

    public Order(string id, double total, bool loyal, int items, string coupon)
    {
        CustomerId = id; Total = total; IsLoyalCustomer = loyal;
        ItemCount = items; CouponCode = coupon;
    }
}

interface IDiscountHandler
{
    void SetNext(IDiscountHandler next);
    void Apply(Order order);
}

abstract class BaseDiscountHandler : IDiscountHandler
{
    protected IDiscountHandler next;
    public void SetNext(IDiscountHandler next)
    {
        this.next = next;
    }
    protected void Forward(Order order)
    {
        next".Apply(order);
    }
    public abstract void Apply(Order order);
}

class LoyaltyDiscount : BaseDiscountHandler
{
    public override void Apply(Order order)
    {
        // TODO: If order.IsLoyalCustomer, calculate 10% discount, subtract, print
        // TODO: Forward to next
    }
}

class BulkDiscount : BaseDiscountHandler
{
    public override void Apply(Order order)
    {
        // TODO: If order.ItemCount >= 10, calculate 5% discount, subtract, print
        // TODO: Forward to next
    }
}

class CouponDiscount : BaseDiscountHandler
{
    public override void Apply(Order order)
    {
        // TODO: If order.CouponCode == "SAVE20", calculate 20% discount, subtract, print
        // TODO: Forward to next
    }
}

class Program
{
    static void Main(string[] args)
    {
        // var order = new Order("C-100", 200.0, true, 15, "SAVE20");
        // var loyalty = new LoyaltyDiscount(); var bulk = new BulkDiscount(); var coupon = new CouponDiscount();
        // loyalty.SetNext(bulk); bulk.SetNext(coupon);
        // Console.WriteLine($"Original total: ${order.Total}");
        // loyalty.Apply(order);
        // Console.WriteLine($"Final total: ${order.Total}");
    }
}
```

```typescript
class Order {
    customerId: string;
    total: number;
    isLoyalCustomer: boolean;
    itemCount: number;
    couponCode: string;

    constructor(customerId: string, total: number, isLoyalCustomer: boolean, itemCount: number, couponCode: string) {
        this.customerId = customerId;
        this.total = total;
        this.isLoyalCustomer = isLoyalCustomer;
        this.itemCount = itemCount;
        this.couponCode = couponCode;
    }
}

interface DiscountHandler {
    setNext(next: DiscountHandler): void;
    apply(order: Order): void;
}

abstract class BaseDiscountHandler implements DiscountHandler {
    protected next: DiscountHandler | null = null;
    setNext(next: DiscountHandler): void {
        this.next = next;
    }
    protected forward(order: Order): void {
        this.next".apply(order);
    }
    abstract apply(order: Order): void;
}

class LoyaltyDiscount extends BaseDiscountHandler {
    apply(order: Order): void {
        // TODO: If order.isLoyalCustomer, calculate 10% discount, subtract, print
        // TODO: Forward to next
    }
}

class BulkDiscount extends BaseDiscountHandler {
    apply(order: Order): void {
        // TODO: If order.itemCount >= 10, calculate 5% discount, subtract, print
        // TODO: Forward to next
    }
}

class CouponDiscount extends BaseDiscountHandler {
    apply(order: Order): void {
        // TODO: If order.couponCode === "SAVE20", calculate 20% discount, subtract, print
        // TODO: Forward to next
    }
}

// const order = new Order("C-100", 200.0, true, 15, "SAVE20");
// const loyalty = new LoyaltyDiscount(); const bulk = new BulkDiscount(); const coupon = new CouponDiscount();
// loyalty.setNext(bulk); bulk.setNext(coupon);
// console.log(`Original total: $${order.total}`);
// loyalty.apply(order);
// console.log(`Final total: $${order.total}`);
```

#### Solutions

```java
class Order {
    public String customerId;
    public double total;
    public boolean isLoyalCustomer;
    public int itemCount;
    public String couponCode;

    public Order(String customerId, double total, boolean isLoyalCustomer, int itemCount, String couponCode) {
        this.customerId = customerId;
        this.total = total;
        this.isLoyalCustomer = isLoyalCustomer;
        this.itemCount = itemCount;
        this.couponCode = couponCode;
    }
}

interface DiscountHandler {
    void setNext(DiscountHandler next);
    void apply(Order order);
}

abstract class BaseDiscountHandler implements DiscountHandler {
    protected DiscountHandler next;

    @Override
    public void setNext(DiscountHandler next) { this.next = next; }

    protected void forward(Order order) {
        if (next != null) next.apply(order);
    }
}

class LoyaltyDiscount extends BaseDiscountHandler {
    @Override
    public void apply(Order order) {
        if (order.isLoyalCustomer) {
            double discount = order.total * 0.10;
            order.total -= discount;
            System.out.println("LoyaltyDiscount: -$" + String.format("%.2f", discount) + " (10% off)");
        }
        forward(order);
    }
}

class BulkDiscount extends BaseDiscountHandler {
    @Override
    public void apply(Order order) {
        if (order.itemCount >= 10) {
            double discount = order.total * 0.05;
            order.total -= discount;
            System.out.println("BulkDiscount: -$" + String.format("%.2f", discount) + " (5% off)");
        }
        forward(order);
    }
}

class CouponDiscount extends BaseDiscountHandler {
    @Override
    public void apply(Order order) {
        if ("SAVE20".equals(order.couponCode)) {
            double discount = order.total * 0.20;
            order.total -= discount;
            System.out.println("CouponDiscount: -$" + String.format("%.2f", discount) + " (20% off)");
        }
        forward(order);
    }
}

public class Main {
    public static void main(String[] args) {
        Order order = new Order("C-100", 200.0, true, 15, "SAVE20");
        LoyaltyDiscount loyalty = new LoyaltyDiscount();
        BulkDiscount bulk = new BulkDiscount();
        CouponDiscount coupon = new CouponDiscount();
        loyalty.setNext(bulk); bulk.setNext(coupon);
        System.out.printf("Original total: $%.1f%n", order.total);
        loyalty.apply(order);
        System.out.printf("Final total: $%.2f%n", order.total);
    }
}
```

```python
from abc import ABC, abstractmethod

class Order:
    def __init__(self, customer_id, total, is_loyal, item_count, coupon_code):
        self.customer_id = customer_id
        self.total = total
        self.is_loyal = is_loyal
        self.item_count = item_count
        self.coupon_code = coupon_code

class DiscountHandler(ABC):
    @abstractmethod
    def set_next(self, handler): pass

    @abstractmethod
    def apply(self, order): pass

class BaseDiscountHandler(DiscountHandler):
    def __init__(self):
        self.next = None

    def set_next(self, handler):
        self.next = handler

    def forward(self, order):
        if self.next:
            self.next.apply(order)

class LoyaltyDiscount(BaseDiscountHandler):
    def apply(self, order):
        if order.is_loyal:
            discount = order.total * 0.10
            order.total -= discount
            print(f"LoyaltyDiscount: -${discount:.2f} (10% off)")
        self.forward(order)

class BulkDiscount(BaseDiscountHandler):
    def apply(self, order):
        if order.item_count >= 10:
            discount = order.total * 0.05
            order.total -= discount
            print(f"BulkDiscount: -${discount:.2f} (5% off)")
        self.forward(order)

class CouponDiscount(BaseDiscountHandler):
    def apply(self, order):
        if order.coupon_code == "SAVE20":
            discount = order.total * 0.20
            order.total -= discount
            print(f"CouponDiscount: -${discount:.2f} (20% off)")
        self.forward(order)

order = Order("C-100", 200.0, True, 15, "SAVE20")
loyalty = LoyaltyDiscount(); bulk = BulkDiscount(); coupon = CouponDiscount()
loyalty.set_next(bulk); bulk.set_next(coupon)
print(f"Original total: ${order.total:.1f}")
loyalty.apply(order)
print(f"Final total: ${order.total:.2f}")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

struct Order {
    string customerId;
    double total;
    bool isLoyalCustomer;
    int itemCount;
    string couponCode;

    Order(string id, double total, bool loyal, int items, string coupon)
        : customerId(id), total(total), isLoyalCustomer(loyal), itemCount(items), couponCode(coupon) {}
};

class DiscountHandler {
public:
    virtual void setNext(DiscountHandler* next) = 0;
    virtual void apply(Order& order) = 0;
    virtual ~DiscountHandler() {}
};

class BaseDiscountHandler : public DiscountHandler {
protected:
    DiscountHandler* next = nullptr;
public:
    void setNext(DiscountHandler* next) override { this->next = next; }
    void forward(Order& order) { if (next) next->apply(order); }
};

class LoyaltyDiscount : public BaseDiscountHandler {
public:
    void apply(Order& order) override {
        if (order.isLoyalCustomer) {
            double discount = order.total * 0.10;
            order.total -= discount;
            printf("LoyaltyDiscount: -$%.2f (10%% off)\n", discount);
        }
        forward(order);
    }
};

class BulkDiscount : public BaseDiscountHandler {
public:
    void apply(Order& order) override {
        if (order.itemCount >= 10) {
            double discount = order.total * 0.05;
            order.total -= discount;
            printf("BulkDiscount: -$%.2f (5%% off)\n", discount);
        }
        forward(order);
    }
};

class CouponDiscount : public BaseDiscountHandler {
public:
    void apply(Order& order) override {
        if (order.couponCode == "SAVE20") {
            double discount = order.total * 0.20;
            order.total -= discount;
            printf("CouponDiscount: -$%.2f (20%% off)\n", discount);
        }
        forward(order);
    }
};

int main() {
    Order order("C-100", 200.0, true, 15, "SAVE20");
    LoyaltyDiscount loyalty; BulkDiscount bulk; CouponDiscount coupon;
    loyalty.setNext(&bulk); bulk.setNext(&coupon);
    printf("Original total: $%.1f\n", order.total);
    loyalty.apply(order);
    printf("Final total: $%.2f\n", order.total);
    return 0;
}
```

```go
package main

import (
	"fmt"
)

type Order struct {
	CustomerID       string
	Total            float64
	IsLoyalCustomer  bool
	ItemCount        int
	CouponCode       string
}

func NewOrder(customerID string, total float64, isLoyalCustomer bool, itemCount int, couponCode string) *Order {
	return &Order{
		CustomerID:      customerID,
		Total:           total,
		IsLoyalCustomer: isLoyalCustomer,
		ItemCount:       itemCount,
		CouponCode:      couponCode,
	}
}

type DiscountHandler interface {
	SetNext(next DiscountHandler)
	Apply(order *Order)
}

type BaseDiscountHandler struct {
	next DiscountHandler
}

func (b *BaseDiscountHandler) SetNext(next DiscountHandler) {
	b.next = next
}

func (b *BaseDiscountHandler) forward(order *Order) {
	if b.next != nil {
		b.next.Apply(order)
	}
}

type LoyaltyDiscount struct {
	BaseDiscountHandler
}

func (l *LoyaltyDiscount) Apply(order *Order) {
	if order.IsLoyalCustomer {
		discount := order.Total * 0.10
		order.Total -= discount
		fmt.Printf("LoyaltyDiscount: -$%.2f (10%% off)\n", discount)
	}
	l.forward(order)
}

type BulkDiscount struct {
	BaseDiscountHandler
}

func (b *BulkDiscount) Apply(order *Order) {
	if order.ItemCount >= 10 {
		discount := order.Total * 0.05
		order.Total -= discount
		fmt.Printf("BulkDiscount: -$%.2f (5%% off)\n", discount)
	}
	b.forward(order)
}

type CouponDiscount struct {
	BaseDiscountHandler
}

func (c *CouponDiscount) Apply(order *Order) {
	if order.CouponCode == "SAVE20" {
		discount := order.Total * 0.20
		order.Total -= discount
		fmt.Printf("CouponDiscount: -$%.2f (20%% off)\n", discount)
	}
	c.forward(order)
}

func main() {
	order := NewOrder("C-100", 200.0, true, 15, "SAVE20")

	loyalty := &LoyaltyDiscount{}
	bulk := &BulkDiscount{}
	coupon := &CouponDiscount{}

	loyalty.SetNext(bulk)
	bulk.SetNext(coupon)

	fmt.Printf("Original total: $%.1f\n", order.Total)
	loyalty.Apply(order)
	fmt.Printf("Final total: $%.2f\n", order.Total)
}
```

```csharp
using System;

class Order
{
    public string CustomerId;
    public double Total;
    public bool IsLoyalCustomer;
    public int ItemCount;
    public string CouponCode;

    public Order(string id, double total, bool loyal, int items, string coupon)
    {
        CustomerId = id; Total = total; IsLoyalCustomer = loyal;
        ItemCount = items; CouponCode = coupon;
    }
}

interface IDiscountHandler
{
    void SetNext(IDiscountHandler next);
    void Apply(Order order);
}

abstract class BaseDiscountHandler : IDiscountHandler
{
    protected IDiscountHandler next;
    public void SetNext(IDiscountHandler next)
    {
        this.next = next;
    }
    protected void Forward(Order order)
    {
        next".Apply(order);
    }
    public abstract void Apply(Order order);
}

class LoyaltyDiscount : BaseDiscountHandler
{
    public override void Apply(Order order)
    {
        if (order.IsLoyalCustomer)
        {
            double discount = order.Total * 0.10;
            order.Total -= discount;
            Console.WriteLine($"LoyaltyDiscount: -${discount:F2} (10% off)");
        }
        Forward(order);
    }
}

class BulkDiscount : BaseDiscountHandler
{
    public override void Apply(Order order)
    {
        if (order.ItemCount >= 10)
        {
            double discount = order.Total * 0.05;
            order.Total -= discount;
            Console.WriteLine($"BulkDiscount: -${discount:F2} (5% off)");
        }
        Forward(order);
    }
}

class CouponDiscount : BaseDiscountHandler
{
    public override void Apply(Order order)
    {
        if (order.CouponCode == "SAVE20")
        {
            double discount = order.Total * 0.20;
            order.Total -= discount;
            Console.WriteLine($"CouponDiscount: -${discount:F2} (20% off)");
        }
        Forward(order);
    }
}

class Program
{
    static void Main(string[] args)
    {
        var order = new Order("C-100", 200.0, true, 15, "SAVE20");
        var loyalty = new LoyaltyDiscount();
        var bulk = new BulkDiscount();
        var coupon = new CouponDiscount();

        loyalty.SetNext(bulk);
        bulk.SetNext(coupon);

        Console.WriteLine($"Original total: ${order.Total:F1}");
        loyalty.Apply(order);
        Console.WriteLine($"Final total: ${order.Total:F2}");
    }
}
```

```typescript
class Order {
    customerId: string;
    total: number;
    isLoyalCustomer: boolean;
    itemCount: number;
    couponCode: string;

    constructor(customerId: string, total: number, isLoyalCustomer: boolean, itemCount: number, couponCode: string) {
        this.customerId = customerId;
        this.total = total;
        this.isLoyalCustomer = isLoyalCustomer;
        this.itemCount = itemCount;
        this.couponCode = couponCode;
    }
}

interface DiscountHandler {
    setNext(next: DiscountHandler): void;
    apply(order: Order): void;
}

abstract class BaseDiscountHandler implements DiscountHandler {
    protected next: DiscountHandler | null = null;
    setNext(next: DiscountHandler): void {
        this.next = next;
    }
    protected forward(order: Order): void {
        this.next".apply(order);
    }
    abstract apply(order: Order): void;
}

class LoyaltyDiscount extends BaseDiscountHandler {
    apply(order: Order): void {
        if (order.isLoyalCustomer) {
            const discount = order.total * 0.10;
            order.total -= discount;
            console.log(`LoyaltyDiscount: -$${discount.toFixed(2)} (10% off)`);
        }
        this.forward(order);
    }
}

class BulkDiscount extends BaseDiscountHandler {
    apply(order: Order): void {
        if (order.itemCount >= 10) {
            const discount = order.total * 0.05;
            order.total -= discount;
            console.log(`BulkDiscount: -$${discount.toFixed(2)} (5% off)`);
        }
        this.forward(order);
    }
}

class CouponDiscount extends BaseDiscountHandler {
    apply(order: Order): void {
        if (order.couponCode === "SAVE20") {
            const discount = order.total * 0.20;
            order.total -= discount;
            console.log(`CouponDiscount: -$${discount.toFixed(2)} (20% off)`);
        }
        this.forward(order);
    }
}

const order = new Order("C-100", 200.0, true, 15, "SAVE20");
const loyalty = new LoyaltyDiscount(); const bulk = new BulkDiscount(); const coupon = new CouponDiscount();
loyalty.setNext(bulk); bulk.setNext(coupon);
console.log(`Original total: $${order.total.toFixed(1)}`);
loyalty.apply(order);
console.log(`Final total: $${order.total.toFixed(2)}`);
```

---

# Exercise 3: Input Sanitization Pipeline

<!-- payload:lldCodingPracticeBlock:START {"id":"699157cc8cbf792b774d589d","title":"Design Input Sanitization Pipeline","difficulty":"hard","expectedOutput":"Input: \"  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  \"\nTrimProcessor: trimmed whitespace\nHtmlStripper: removed HTML tags\nProfanityFilter: censored profanity\nLengthTruncator: truncated to 50 chars\nOutput: \"Hello this is a *** test with *** content that is...\""} -->
Build a text processing pipeline where each handler transforms the input and passes the modified text to the next handler. This is an **impure chain** where all handlers process.

**Requirements:**

- `TextProcessor` interface with `setNext()` and `process(text) -> String` methods
- `BaseTextProcessor` abstract class with forwarding logic
- `TrimProcessor`: trims leading/trailing whitespace
- `HtmlStripper`: removes all HTML tags (anything between `<` and `>`)
- `ProfanityFilter`: replaces the words "badword" and "offensive" with `"***"` (case-insensitive)
- `LengthTruncator`: truncates text to max 50 characters, appending `"..."` if truncated
- Each handler transforms the text, prints what it did, and passes the result to the next handler
- The final result is returned from the chain

```java
interface TextProcessor {
    void setNext(TextProcessor next);
    String process(String text);
}

abstract class BaseTextProcessor implements TextProcessor {
    protected TextProcessor next;

    @Override
    public void setNext(TextProcessor next) { this.next = next; }

    protected String forward(String text) {
        if (next != null) return next.process(text);
        return text;
    }
}

class TrimProcessor extends BaseTextProcessor {
    @Override
    public String process(String text) {
        // TODO: Trim whitespace, print "TrimProcessor: trimmed whitespace"
        // TODO: Return forward(trimmed)
        return text;
    }
}

class HtmlStripper extends BaseTextProcessor {
    @Override
    public String process(String text) {
        // TODO: Remove HTML tags using replaceAll("<[^>]*>", "")
        // TODO: Print "HtmlStripper: removed HTML tags"
        // TODO: Return forward(stripped)
        return text;
    }
}

class ProfanityFilter extends BaseTextProcessor {
    @Override
    public String process(String text) {
        // TODO: Replace "badword" and "offensive" (case-insensitive) with "***"
        // TODO: Print "ProfanityFilter: censored profanity"
        // TODO: Return forward(filtered)
        return text;
    }
}

class LengthTruncator extends BaseTextProcessor {
    @Override
    public String process(String text) {
        // TODO: If text length > 50, truncate to 50 chars and append "..."
        // TODO: Print "LengthTruncator: truncated to 50 chars" or "LengthTruncator: no truncation needed"
        // TODO: Return forward(result)
        return text;
    }
}

public class Main {
    public static void main(String[] args) {
        // Build chain: Trim -> HtmlStripper -> ProfanityFilter -> LengthTruncator
        // Test with: "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  "
    }
}
```

```python
import re
from abc import ABC, abstractmethod

class TextProcessor(ABC):
    @abstractmethod
    def set_next(self, handler): pass

    @abstractmethod
    def process(self, text): pass

class BaseTextProcessor(TextProcessor):
    def __init__(self):
        self.next = None

    def set_next(self, handler):
        self.next = handler

    def forward(self, text):
        if self.next:
            return self.next.process(text)
        return text

class TrimProcessor(BaseTextProcessor):
    def process(self, text):
        # TODO: Trim whitespace, print "TrimProcessor: trimmed whitespace"
        # TODO: Return forward(trimmed)
        return text

class HtmlStripper(BaseTextProcessor):
    def process(self, text):
        # TODO: Remove HTML tags using re.sub(r'<[^>]*>', '', text)
        # TODO: Print "HtmlStripper: removed HTML tags"
        # TODO: Return forward(stripped)
        return text

class ProfanityFilter(BaseTextProcessor):
    def process(self, text):
        # TODO: Replace "badword" and "offensive" (case-insensitive) with "***"
        # TODO: Print "ProfanityFilter: censored profanity"
        # TODO: Return forward(filtered)
        return text

class LengthTruncator(BaseTextProcessor):
    def process(self, text):
        # TODO: If text length > 50, truncate to 50 chars and append "..."
        # TODO: Print "LengthTruncator: truncated to 50 chars" or "LengthTruncator: no truncation needed"
        # TODO: Return forward(result)
        return text

if __name__ == "__main__":
    pass
    # Build chain: Trim -> HtmlStripper -> ProfanityFilter -> LengthTruncator
    # Test with: "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  "
```

```cpp
#include <iostream>
#include <string>
#include <regex>
using namespace std;

class TextProcessor {
public:
    virtual void setNext(TextProcessor* next) = 0;
    virtual string process(string text) = 0;
    virtual ~TextProcessor() {}
};

class BaseTextProcessor : public TextProcessor {
protected:
    TextProcessor* next = nullptr;
public:
    void setNext(TextProcessor* next) override { this->next = next; }
    string forward(string text) {
        if (next) return next->process(text);
        return text;
    }
};

class TrimProcessor : public BaseTextProcessor {
public:
    string process(string text) override {
        // TODO: Trim whitespace, print "TrimProcessor: trimmed whitespace"
        // TODO: Return forward(trimmed)
        return text;
    }
};

class HtmlStripper : public BaseTextProcessor {
public:
    string process(string text) override {
        // TODO: Remove HTML tags using regex_replace(text, regex("<[^>]*>"), "")
        // TODO: Print "HtmlStripper: removed HTML tags"
        // TODO: Return forward(stripped)
        return text;
    }
};

class ProfanityFilter : public BaseTextProcessor {
public:
    string process(string text) override {
        // TODO: Replace "badword" and "offensive" (case-insensitive) with "***"
        // TODO: Print "ProfanityFilter: censored profanity"
        // TODO: Return forward(filtered)
        return text;
    }
};

class LengthTruncator : public BaseTextProcessor {
public:
    string process(string text) override {
        // TODO: If text length > 50, truncate to 50 chars and append "..."
        // TODO: Print "LengthTruncator: truncated to 50 chars" or "LengthTruncator: no truncation needed"
        // TODO: Return forward(result)
        return text;
    }
};

int main() {
    // Build chain: Trim -> HtmlStripper -> ProfanityFilter -> LengthTruncator
    // Test with: "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  "
    return 0;
}
```

```go
package main

type TextProcessor interface {
	SetNext(next TextProcessor)
	Process(text string) string
}

type BaseTextProcessor struct {
	next TextProcessor
}

func (b *BaseTextProcessor) SetNext(next TextProcessor) {
	b.next = next
}

func (b *BaseTextProcessor) forward(text string) string {
	if b.next != nil {
		return b.next.Process(text)
	}
	return text
}

type TrimProcessor struct {
	BaseTextProcessor
}

func (t *TrimProcessor) Process(text string) string {
	// TODO: Trim whitespace, print "TrimProcessor: trimmed whitespace"
	// TODO: Return forward(trimmed)
	return text
}

type HtmlStripper struct {
	BaseTextProcessor
}

func (h *HtmlStripper) Process(text string) string {
	// TODO: Remove HTML tags using strings.ReplaceAll / regexp equivalent for "<[^>]*>", ""
	// TODO: Print "HtmlStripper: removed HTML tags"
	// TODO: Return forward(stripped)
	return text
}

type ProfanityFilter struct {
	BaseTextProcessor
}

func (p *ProfanityFilter) Process(text string) string {
	// TODO: Replace "badword" and "offensive" (case-insensitive) with "***"
	// TODO: Print "ProfanityFilter: censored profanity"
	// TODO: Return forward(filtered)
	return text
}

type LengthTruncator struct {
	BaseTextProcessor
}

func (l *LengthTruncator) Process(text string) string {
	// TODO: If text length > 50, truncate to 50 chars and append "..."
	// TODO: Print "LengthTruncator: truncated to 50 chars" or "LengthTruncator: no truncation needed"
	// TODO: Return forward(result)
	return text
}

func main() {
	// Build chain: Trim -> HtmlStripper -> ProfanityFilter -> LengthTruncator
	// Test with: "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  "
}
```

```csharp
using System;
using System.Text.RegularExpressions;

interface ITextProcessor
{
    void SetNext(ITextProcessor next);
    string Process(string text);
}

abstract class BaseTextProcessor : ITextProcessor
{
    protected ITextProcessor next;
    public void SetNext(ITextProcessor next)
    {
        this.next = next;
    }
    protected string Forward(string text)
    {
        return next != null " next.Process(text) : text;
    }
    public abstract string Process(string text);
}

class TrimProcessor : BaseTextProcessor
{
    public override string Process(string text)
    {
        // TODO: Trim whitespace, print "TrimProcessor: trimmed whitespace"
        // TODO: Return Forward(trimmed)
        return text;
    }
}

class HtmlStripper : BaseTextProcessor
{
    public override string Process(string text)
    {
        // TODO: Remove HTML tags using Regex.Replace(text, "<[^>]*>", "")
        // TODO: Print "HtmlStripper: removed HTML tags"
        // TODO: Return Forward(stripped)
        return text;
    }
}

class ProfanityFilter : BaseTextProcessor
{
    public override string Process(string text)
    {
        // TODO: Replace "badword" and "offensive" (case-insensitive) with "***"
        // TODO: Print "ProfanityFilter: censored profanity"
        // TODO: Return Forward(filtered)
        return text;
    }
}

class LengthTruncator : BaseTextProcessor
{
    public override string Process(string text)
    {
        // TODO: If text length > 50, truncate to 50 chars and append "..."
        // TODO: Print "LengthTruncator: truncated to 50 chars" or "LengthTruncator: no truncation needed"
        // TODO: Return Forward(result)
        return text;
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Build chain: Trim -> HtmlStripper -> ProfanityFilter -> LengthTruncator
        // Test with: "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  "
    }
}
```

```typescript
interface TextProcessor {
    setNext(next: TextProcessor): void;
    process(text: string): string;
}

abstract class BaseTextProcessor implements TextProcessor {
    protected next: TextProcessor | null = null;
    setNext(next: TextProcessor): void {
        this.next = next;
    }
    protected forward(text: string): string {
        return this.next " this.next.process(text) : text;
    }
    abstract process(text: string): string;
}

class TrimProcessor extends BaseTextProcessor {
    process(text: string): string {
        // TODO: Trim whitespace, print "TrimProcessor: trimmed whitespace"
        // TODO: Return forward(trimmed)
        return text;
    }
}

class HtmlStripper extends BaseTextProcessor {
    process(text: string): string {
        // TODO: Remove HTML tags using text.replace(/<[^>]*>/g, "")
        // TODO: Print "HtmlStripper: removed HTML tags"
        // TODO: Return forward(stripped)
        return text;
    }
}

class ProfanityFilter extends BaseTextProcessor {
    process(text: string): string {
        // TODO: Replace "badword" and "offensive" (case-insensitive) with "***"
        // TODO: Print "ProfanityFilter: censored profanity"
        // TODO: Return forward(filtered)
        return text;
    }
}

class LengthTruncator extends BaseTextProcessor {
    process(text: string): string {
        // TODO: If text length > 50, truncate to 50 chars and append "..."
        // TODO: Print "LengthTruncator: truncated to 50 chars" or "LengthTruncator: no truncation needed"
        // TODO: Return forward(result)
        return text;
    }
}

// Build chain: Trim -> HtmlStripper -> ProfanityFilter -> LengthTruncator
// Test with: "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  "
```

#### Solutions

```java
interface TextProcessor {
    void setNext(TextProcessor next);
    String process(String text);
}

abstract class BaseTextProcessor implements TextProcessor {
    protected TextProcessor next;

    @Override
    public void setNext(TextProcessor next) { this.next = next; }

    protected String forward(String text) {
        if (next != null) return next.process(text);
        return text;
    }
}

class TrimProcessor extends BaseTextProcessor {
    @Override
    public String process(String text) {
        String trimmed = text.trim();
        System.out.println("TrimProcessor: trimmed whitespace");
        return forward(trimmed);
    }
}

class HtmlStripper extends BaseTextProcessor {
    @Override
    public String process(String text) {
        String stripped = text.replaceAll("<[^>]*>", "");
        System.out.println("HtmlStripper: removed HTML tags");
        return forward(stripped);
    }
}

class ProfanityFilter extends BaseTextProcessor {
    @Override
    public String process(String text) {
        String filtered = text.replaceAll("("i)badword", "***").replaceAll("("i)offensive", "***");
        System.out.println("ProfanityFilter: censored profanity");
        return forward(filtered);
    }
}

class LengthTruncator extends BaseTextProcessor {
    @Override
    public String process(String text) {
        if (text.length() > 50) {
            text = text.substring(0, 50).stripTrailing() + "...";
            System.out.println("LengthTruncator: truncated to 50 chars");
        } else {
            System.out.println("LengthTruncator: no truncation needed");
        }
        return forward(text);
    }
}

public class Main {
    public static void main(String[] args) {
        TrimProcessor trim = new TrimProcessor();
        HtmlStripper html = new HtmlStripper();
        ProfanityFilter profanity = new ProfanityFilter();
        LengthTruncator truncator = new LengthTruncator();

        trim.setNext(html);
        html.setNext(profanity);
        profanity.setNext(truncator);

        String input = "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  ";
        System.out.println("Input: \"" + input + "\"");
        String output = trim.process(input);
        System.out.println("Output: \"" + output + "\"");
    }
}
```

```python
import re
from abc import ABC, abstractmethod

class TextProcessor(ABC):
    @abstractmethod
    def set_next(self, handler): pass

    @abstractmethod
    def process(self, text): pass

class BaseTextProcessor(TextProcessor):
    def __init__(self):
        self.next = None

    def set_next(self, handler):
        self.next = handler

    def forward(self, text):
        if self.next:
            return self.next.process(text)
        return text

class TrimProcessor(BaseTextProcessor):
    def process(self, text):
        trimmed = text.strip()
        print("TrimProcessor: trimmed whitespace")
        return self.forward(trimmed)

class HtmlStripper(BaseTextProcessor):
    def process(self, text):
        stripped = re.sub(r'<[^>]*>', '', text)
        print("HtmlStripper: removed HTML tags")
        return self.forward(stripped)

class ProfanityFilter(BaseTextProcessor):
    def process(self, text):
        filtered = re.sub(r'("i)badword', '***', text)
        filtered = re.sub(r'("i)offensive', '***', filtered)
        print("ProfanityFilter: censored profanity")
        return self.forward(filtered)

class LengthTruncator(BaseTextProcessor):
    def process(self, text):
        if len(text) > 50:
            text = text[:50].rstrip() + "..."
            print("LengthTruncator: truncated to 50 chars")
        else:
            print("LengthTruncator: no truncation needed")
        return self.forward(text)

trim = TrimProcessor()
html = HtmlStripper()
profanity = ProfanityFilter()
truncator = LengthTruncator()

trim.set_next(html)
html.set_next(profanity)
profanity.set_next(truncator)

input_text = "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  "
print(f'Input: "{input_text}"')
output = trim.process(input_text)
print(f'Output: "{output}"')
```

```cpp
#include <iostream>
#include <string>
#include <regex>
using namespace std;

class TextProcessor {
public:
    virtual void setNext(TextProcessor* next) = 0;
    virtual string process(string text) = 0;
    virtual ~TextProcessor() {}
};

class BaseTextProcessor : public TextProcessor {
protected:
    TextProcessor* next = nullptr;
public:
    void setNext(TextProcessor* next) override { this->next = next; }
    string forward(string text) {
        if (next) return next->process(text);
        return text;
    }
};

class TrimProcessor : public BaseTextProcessor {
public:
    string process(string text) override {
        size_t start = text.find_first_not_of(" \t\n\r");
        size_t end = text.find_last_not_of(" \t\n\r");
        string trimmed = (start == string::npos) " "" : text.substr(start, end - start + 1);
        cout << "TrimProcessor: trimmed whitespace" << endl;
        return forward(trimmed);
    }
};

class HtmlStripper : public BaseTextProcessor {
public:
    string process(string text) override {
        string stripped = regex_replace(text, regex("<[^>]*>"), "");
        cout << "HtmlStripper: removed HTML tags" << endl;
        return forward(stripped);
    }
};

class ProfanityFilter : public BaseTextProcessor {
public:
    string process(string text) override {
        string filtered = regex_replace(text, regex("badword", regex::icase), "***");
        filtered = regex_replace(filtered, regex("offensive", regex::icase), "***");
        cout << "ProfanityFilter: censored profanity" << endl;
        return forward(filtered);
    }
};

class LengthTruncator : public BaseTextProcessor {
public:
    string process(string text) override {
        if (text.length() > 50) {
            string truncated = text.substr(0, 50);
            truncated.erase(truncated.find_last_not_of(' ') + 1);
            text = truncated + "...";
            cout << "LengthTruncator: truncated to 50 chars" << endl;
        } else {
            cout << "LengthTruncator: no truncation needed" << endl;
        }
        return forward(text);
    }
};

int main() {
    TrimProcessor trim;
    HtmlStripper html;
    ProfanityFilter profanity;
    LengthTruncator truncator;

    trim.setNext(&html);
    html.setNext(&profanity);
    profanity.setNext(&truncator);

    string input = "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  ";
    cout << "Input: \"" << input << "\"" << endl;
    string output = trim.process(input);
    cout << "Output: \"" << output << "\"" << endl;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"regexp"
	"strings"
)

type TextProcessor interface {
	SetNext(next TextProcessor)
	Process(text string) string
}

type BaseTextProcessor struct {
	next TextProcessor
}

func (b *BaseTextProcessor) SetNext(next TextProcessor) {
	b.next = next
}

func (b *BaseTextProcessor) Forward(text string) string {
	if b.next != nil {
		return b.next.Process(text)
	}
	return text
}

type TrimProcessor struct {
	BaseTextProcessor
}

func (t *TrimProcessor) Process(text string) string {
	trimmed := strings.TrimSpace(text)
	fmt.Println("TrimProcessor: trimmed whitespace")
	return t.Forward(trimmed)
}

type HtmlStripper struct {
	BaseTextProcessor
}

var htmlTagRegex = regexp.MustCompile(`<[^>]*>`)

func (h *HtmlStripper) Process(text string) string {
	stripped := htmlTagRegex.ReplaceAllString(text, "")
	fmt.Println("HtmlStripper: removed HTML tags")
	return h.Forward(stripped)
}

type ProfanityFilter struct {
	BaseTextProcessor
}

var badwordRegex = regexp.MustCompile(`("i)badword`)
var offensiveRegex = regexp.MustCompile(`("i)offensive`)

func (p *ProfanityFilter) Process(text string) string {
	filtered := badwordRegex.ReplaceAllString(text, "***")
	filtered = offensiveRegex.ReplaceAllString(filtered, "***")
	fmt.Println("ProfanityFilter: censored profanity")
	return p.Forward(filtered)
}

type LengthTruncator struct {
	BaseTextProcessor
}

func (l *LengthTruncator) Process(text string) string {
	if len(text) > 50 {
		text = strings.TrimRight(text[:50], " \t\n\r") + "..."
		fmt.Println("LengthTruncator: truncated to 50 chars")
	} else {
		fmt.Println("LengthTruncator: no truncation needed")
	}
	return l.Forward(text)
}

func main() {
	trim := &TrimProcessor{}
	html := &HtmlStripper{}
	profanity := &ProfanityFilter{}
	truncator := &LengthTruncator{}

	trim.SetNext(html)
	html.SetNext(profanity)
	profanity.SetNext(truncator)

	input := "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  "
	fmt.Printf("Input: %q\n", input)
	output := trim.Process(input)
	fmt.Printf("Output: %q\n", output)
}
```

```csharp
using System;
using System.Text.RegularExpressions;

interface ITextProcessor
{
    void SetNext(ITextProcessor next);
    string Process(string text);
}

abstract class BaseTextProcessor : ITextProcessor
{
    protected ITextProcessor next;
    public void SetNext(ITextProcessor next)
    {
        this.next = next;
    }
    protected string Forward(string text)
    {
        return next != null " next.Process(text) : text;
    }
    public abstract string Process(string text);
}

class TrimProcessor : BaseTextProcessor
{
    public override string Process(string text)
    {
        string trimmed = text.Trim();
        Console.WriteLine("TrimProcessor: trimmed whitespace");
        return Forward(trimmed);
    }
}

class HtmlStripper : BaseTextProcessor
{
    public override string Process(string text)
    {
        string stripped = Regex.Replace(text, "<[^>]*>", "");
        Console.WriteLine("HtmlStripper: removed HTML tags");
        return Forward(stripped);
    }
}

class ProfanityFilter : BaseTextProcessor
{
    public override string Process(string text)
    {
        string filtered = Regex.Replace(text, "badword", "***", RegexOptions.IgnoreCase);
        filtered = Regex.Replace(filtered, "offensive", "***", RegexOptions.IgnoreCase);
        Console.WriteLine("ProfanityFilter: censored profanity");
        return Forward(filtered);
    }
}

class LengthTruncator : BaseTextProcessor
{
    public override string Process(string text)
    {
        if (text.Length > 50)
        {
            text = text.Substring(0, 50).TrimEnd() + "...";
            Console.WriteLine("LengthTruncator: truncated to 50 chars");
        }
        else
        {
            Console.WriteLine("LengthTruncator: no truncation needed");
        }
        return Forward(text);
    }
}

class Program
{
    static void Main(string[] args)
    {
        var trim = new TrimProcessor();
        var html = new HtmlStripper();
        var profanity = new ProfanityFilter();
        var truncator = new LengthTruncator();

        trim.SetNext(html);
        html.SetNext(profanity);
        profanity.SetNext(truncator);

        string input = "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  ";
        Console.WriteLine($"Input: \"{input}\"");
        string output = trim.Process(input);
        Console.WriteLine($"Output: \"{output}\"");
    }
}
```

```typescript
interface TextProcessor {
    setNext(next: TextProcessor): void;
    process(text: string): string;
}

abstract class BaseTextProcessor implements TextProcessor {
    protected next: TextProcessor | null = null;
    setNext(next: TextProcessor): void {
        this.next = next;
    }
    protected forward(text: string): string {
        return this.next " this.next.process(text) : text;
    }
    abstract process(text: string): string;
}

class TrimProcessor extends BaseTextProcessor {
    process(text: string): string {
        const trimmed = text.trim();
        console.log("TrimProcessor: trimmed whitespace");
        return this.forward(trimmed);
    }
}

class HtmlStripper extends BaseTextProcessor {
    process(text: string): string {
        const stripped = text.replace(/<[^>]*>/g, "");
        console.log("HtmlStripper: removed HTML tags");
        return this.forward(stripped);
    }
}

class ProfanityFilter extends BaseTextProcessor {
    process(text: string): string {
        let filtered = text.replace(/badword/gi, "***");
        filtered = filtered.replace(/offensive/gi, "***");
        console.log("ProfanityFilter: censored profanity");
        return this.forward(filtered);
    }
}

class LengthTruncator extends BaseTextProcessor {
    process(text: string): string {
        if (text.length > 50) {
            text = text.substring(0, 50).trimEnd() + "...";
            console.log("LengthTruncator: truncated to 50 chars");
        } else {
            console.log("LengthTruncator: no truncation needed");
        }
        return this.forward(text);
    }
}

const trim = new TrimProcessor();
const html = new HtmlStripper();
const profanity = new ProfanityFilter();
const truncator = new LengthTruncator();

trim.setNext(html);
html.setNext(profanity);
profanity.setNext(truncator);

const input = "  <b>Hello</b> this is a badword test with <i>offensive</i> content that is quite long  ";
console.log(`Input: "${input}"`);
const output = trim.process(input);
console.log(`Output: "${output}"`);
```


