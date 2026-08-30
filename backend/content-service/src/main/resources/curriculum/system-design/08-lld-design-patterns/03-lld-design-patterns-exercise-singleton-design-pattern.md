---
id: "lld-design-patterns-exercise-singleton-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Singleton Design Pattern"
slug: "lld-design-patterns-exercise-singleton-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Singleton Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Singleton Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Thread-Safe Counter

**Problem:** Implement a `Counter` singleton that tracks a count across the application. Multiple components should be able to increment the counter, and all must see the same value.

**Requirements:**

- `increment()` increases the count by 1
- `getCount()` returns the current count
- Thread-safe: concurrent increments must not lose updates
- Calling the constructor/access method from different places returns the same instance

```java
class Counter {
    // TODO: Implement as singleton
    // Hint: Use enum or Bill Pugh pattern

    private int count = 0;

    public void increment() {
        // TODO: Make thread-safe
    }

    public int getCount() {
        // TODO: Return current count
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        // After implementing, usage should look like:
        // Counter c1 = Counter.getInstance();
        // Counter c2 = Counter.getInstance();
        // System.out.println("Same instance: " + (c1 == c2));
        // for (int i = 0; i < 5; i++) {
        //     c1.increment();
        // }
        // System.out.println("Count after 5 increments: " + c1.getCount());
    }
}
```

```python
class Counter:
    # TODO: Implement as singleton (module-level or __new__)

    def __init__(self):
        self._count = 0

    def increment(self):
        # TODO: Make thread-safe
        pass

    def get_count(self):
        # TODO: Return current count
        return 0

if __name__ == "__main__":
    # After implementing, usage should look like:
    # c1 = get_counter()  # or Counter()
    # c2 = get_counter()
    # print(f"Same instance: {c1 is c2}")
    # for _ in range(5):
    #     c1.increment()
    # print(f"Count after 5 increments: {c1.get_count()}")
    pass
```

```cpp
#include <iostream>
#include <mutex>

using namespace std;

class Counter {
    // TODO: Implement as Meyers' Singleton
    // Hint: static local variable in getInstance()

private:
    int count_ = 0;
    // TODO: Add mutex for thread safety

public:
    void increment() {
        // TODO: Make thread-safe
    }

    int getCount() {
        // TODO: Return current count
        return 0;
    }
};

int main() {
    // After implementing, usage should look like:
    // Counter& c1 = Counter::getInstance();
    // Counter& c2 = Counter::getInstance();
    // cout << "Same instance: " << (&c1 == &c2 " "true" : "false") << endl;
    // for (int i = 0; i < 5; i++) {
    //     c1.increment();
    // }
    // cout << "Count after 5 increments: " << c1.getCount() << endl;
    return 0;
}
```

```go
package main

import "fmt"

type Counter struct {
	// TODO: Implement as singleton
	// Hint: Use package-level instance or sync.Once pattern

	count int
}

func (c *Counter) Increment() {
	// TODO: Make thread-safe
}

func (c *Counter) GetCount() int {
	// TODO: Return current count
	return 0
}

func main() {
	// After implementing, usage should look like:
	// c1 := GetCounter()
	// c2 := GetCounter()
	// fmt.Println("Same instance:", c1 == c2)
	// for i := 0; i < 5; i++ {
	//     c1.Increment()
	// }
	// fmt.Println("Count after 5 increments:", c1.GetCount())

	_ = fmt.Println
}
```

```csharp
using System;
using System.Threading;

public sealed class Counter
{
    // TODO: Implement as singleton using Lazy<T>

    private int _count = 0;

    public void Increment()
    {
        // TODO: Make thread-safe (Interlocked or lock)
    }

    public int Count
    {
        get
        {
            // TODO: Return current count
            return 0;
        }
    }
}

public class Program
{
    public static void Main()
    {
        // After implementing, usage should look like:
        // var c1 = Counter.Instance;
        // var c2 = Counter.Instance;
        // Console.WriteLine($"Same instance: {c1 == c2}");
        // for (int i = 0; i < 5; i++)
        //     c1.Increment();
        // Console.WriteLine($"Count after 5 increments: {c1.Count}");
    }
}
```

```typescript
// TODO: Implement as ES module singleton or class-based singleton

class Counter {
    private count: number = 0;

    increment(): void {
        // TODO: Increment count
    }

    getCount(): number {
        // TODO: Return current count
        return 0;
    }
}

// export const counter = new Counter();

// After implementing, usage should look like:
// const c1 = Counter.getInstance();
// const c2 = Counter.getInstance();
// console.log("Same instance:", c1 === c2);
// for (let i = 0; i < 5; i++) {
//     c1.increment();
// }
// console.log("Count after 5 increments:", c1.getCount());
```

#### Solutions

```java
import java.util.concurrent.atomic.AtomicInteger;

enum Counter {
    INSTANCE;

    private final AtomicInteger count = new AtomicInteger(0);

    public static Counter getInstance() {
        return INSTANCE;
    }

    public void increment() {
        count.incrementAndGet();
    }

    public int getCount() {
        return count.get();
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c1 = Counter.getInstance();
        Counter c2 = Counter.getInstance();
        System.out.println("Same instance: " + (c1 == c2));
        for (int i = 0; i < 5; i++) {
            c1.increment();
        }
        System.out.println("Count after 5 increments: " + c1.getCount());
    }
}
```

```python
import threading

class Counter:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._count = 0
                    cls._instance._count_lock = threading.Lock()
        return cls._instance

    def increment(self):
        with self._count_lock:
            self._count += 1

    def get_count(self):
        return self._count

if __name__ == "__main__":
    c1 = Counter()
    c2 = Counter()
    print(f"Same instance: {c1 is c2}")
    for _ in range(5):
        c1.increment()
    print(f"Count after 5 increments: {c1.get_count()}")
```

```cpp
#include <iostream>
#include <mutex>

using namespace std;

class Counter {
public:
    static Counter& getInstance() {
        static Counter instance;
        return instance;
    }

    Counter(const Counter&) = delete;
    Counter& operator=(const Counter&) = delete;

    void increment() {
        lock_guard<mutex> lock(mutex_);
        count_++;
    }

    int getCount() {
        lock_guard<mutex> lock(mutex_);
        return count_;
    }

private:
    Counter() = default;
    int count_ = 0;
    mutex mutex_;
};

int main() {
    Counter& c1 = Counter::getInstance();
    Counter& c2 = Counter::getInstance();
    cout << "Same instance: " << (&c1 == &c2 " "true" : "false") << endl;
    for (int i = 0; i < 5; i++) {
        c1.increment();
    }
    cout << "Count after 5 increments: " << c1.getCount() << endl;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"sync"
	"sync/atomic"
)

type Counter struct {
	count int64
}

var (
	instance *Counter
	once     sync.Once
)

func GetInstance() *Counter {
	once.Do(func() {
		instance = &Counter{}
	})
	return instance
}

func (c *Counter) Increment() {
	atomic.AddInt64(&c.count, 1)
}

func (c *Counter) GetCount() int64 {
	return atomic.LoadInt64(&c.count)
}

func main() {
	c1 := GetInstance()
	c2 := GetInstance()
	fmt.Println("Same instance:", c1 == c2)
	for i := 0; i < 5; i++ {
		c1.Increment()
	}
	fmt.Println("Count after 5 increments:", c1.GetCount())
}
```

```csharp
using System;
using System.Threading;

public sealed class Counter
{
    private static readonly Lazy<Counter> _lazy = new Lazy<Counter>(() => new Counter());
    public static Counter Instance => _lazy.Value;

    private int _count = 0;

    private Counter() { }

    public void Increment()
    {
        Interlocked.Increment(ref _count);
    }

    public int Count
    {
        get
        {
            return _count;
        }
    }
}

public class Program
{
    public static void Main()
    {
        var c1 = Counter.Instance;
        var c2 = Counter.Instance;
        Console.WriteLine($"Same instance: {c1 == c2}");
        for (int i = 0; i < 5; i++)
            c1.Increment();
        Console.WriteLine($"Count after 5 increments: {c1.Count}");
    }
}
```

```typescript
class Counter {
    private static instance: Counter;
    private count: number = 0;

    private constructor() {}

    static getInstance(): Counter {
        if (!Counter.instance) {
            Counter.instance = new Counter();
        }
        return Counter.instance;
    }

    increment(): void {
        this.count++;
    }

    getCount(): number {
        return this.count;
    }
}

const c1 = Counter.getInstance();
const c2 = Counter.getInstance();
console.log("Same instance:", c1 === c2);
for (let i = 0; i < 5; i++) {
    c1.increment();
}
console.log("Count after 5 increments:", c1.getCount());
```

---

# Exercise 2: Logger with Log Levels

> [!PAYWALL] This content is for premium members only.

**Problem:** Implement a singleton Logger that supports log levels. Only messages at or above the configured minimum level should be written.

**Requirements:**

- Log levels: DEBUG, INFO, WARN, ERROR (in increasing severity)
- `setLevel(level)` sets the minimum log level
- `debug(msg)`, `info(msg)`, `warn(msg)`, `error(msg)` log at the respective level
- Messages below the minimum level are silently discarded
- Output format: `[LEVEL] message`
- Thread-safe

```java
class Logger {
    // TODO: Implement as singleton

    public enum Level { DEBUG, INFO, WARN, ERROR }

    private Level minLevel = Level.INFO;

    public void setLevel(Level level) {
        // TODO
    }

    private void log(Level level, String message) {
        // TODO: Only log if level >= minLevel
    }

    public void debug(String msg) { log(Level.DEBUG, msg); }
    public void info(String msg)  { log(Level.INFO, msg); }
    public void warn(String msg)  { log(Level.WARN, msg); }
    public void error(String msg) { log(Level.ERROR, msg); }
}

public class Main {
    public static void main(String[] args) {
        // After implementing, usage should look like:
        // Logger l1 = Logger.getInstance();
        // Logger l2 = Logger.getInstance();
        // System.out.println("Same instance: " + (l1 == l2));
        // l1.setLevel(Logger.Level.WARN);
        // l1.debug("Starting up");
        // l1.info("Server listening on port 8080");
        // l1.warn("Connection pool running low");
        // l1.error("Failed to connect to database");
    }
}
```

```python
from enum import IntEnum

class LogLevel(IntEnum):
    DEBUG = 0
    INFO = 1
    WARN = 2
    ERROR = 3

class Logger:
    # TODO: Implement as singleton

    def __init__(self):
        self._min_level = LogLevel.INFO
        # TODO: Add lock

    def set_level(self, level: LogLevel):
        # TODO
        pass

    def _log(self, level: LogLevel, message: str):
        # TODO: Only log if level >= min_level
        pass

    def debug(self, msg): self._log(LogLevel.DEBUG, msg)
    def info(self, msg):  self._log(LogLevel.INFO, msg)
    def warn(self, msg):  self._log(LogLevel.WARN, msg)
    def error(self, msg): self._log(LogLevel.ERROR, msg)

if __name__ == "__main__":
    # After implementing, usage should look like:
    # l1 = get_logger()  # or Logger()
    # l2 = get_logger()
    # print(f"Same instance: {l1 is l2}")
    # l1.set_level(LogLevel.WARN)
    # l1.debug("Starting up")
    # l1.info("Server listening on port 8080")
    # l1.warn("Connection pool running low")
    # l1.error("Failed to connect to database")
    pass
```

```cpp
#include <iostream>
#include <mutex>
#include <string>

using namespace std;

class Logger {
public:
    enum class Level { DEBUG, INFO, WARN, ERROR };

    // TODO: Implement as Meyers' Singleton

    void setLevel(Level level) {
        // TODO
    }

    void debug(const string& msg) { log(Level::DEBUG, msg); }
    void info(const string& msg)  { log(Level::INFO, msg); }
    void warn(const string& msg)  { log(Level::WARN, msg); }
    void error(const string& msg) { log(Level::ERROR, msg); }

private:
    Level minLevel_ = Level::INFO;
    mutex mutex_;

    void log(Level level, const string& msg) {
        // TODO: Only log if level >= minLevel_
    }
};

int main() {
    // After implementing, usage should look like:
    // Logger& l1 = Logger::getInstance();
    // Logger& l2 = Logger::getInstance();
    // cout << "Same instance: " << (&l1 == &l2 " "true" : "false") << endl;
    // l1.setLevel(Logger::Level::WARN);
    // l1.debug("Starting up");
    // l1.info("Server listening on port 8080");
    // l1.warn("Connection pool running low");
    // l1.error("Failed to connect to database");
    return 0;
}
```

```go
package main

import "sync"

type Level int

const (
	Debug Level = iota
	Info
	Warn
	Error
)

type Logger struct {
	minLevel Level
	// TODO: Add lock
	mu sync.Mutex
}

// TODO: Implement as singleton

func (l *Logger) SetLevel(level Level) {
	// TODO
}

func (l *Logger) log(level Level, message string) {
	// TODO: Only log if level >= minLevel
}

func (l *Logger) Debug(msg string) { l.log(Debug, msg) }
func (l *Logger) Info(msg string)  { l.log(Info, msg) }
func (l *Logger) Warn(msg string)  { l.log(Warn, msg) }
func (l *Logger) Error(msg string) { l.log(Error, msg) }

func main() {
	// After implementing, usage should look like:
	// l1 := GetLogger()
	// l2 := GetLogger()
	// println("Same instance:", l1 == l2)
	// l1.SetLevel(Warn)
	// l1.Debug("Starting up")
	// l1.Info("Server listening on port 8080")
	// l1.Warn("Connection pool running low")
	// l1.Error("Failed to connect to database")
}
```

```csharp
using System;

public sealed class Logger
{
    public enum Level { Debug, Info, Warn, Error }

    // TODO: Implement as singleton using Lazy<T>

    private Level _minLevel = Level.Info;

    public void SetLevel(Level level)
    {
        // TODO
    }

    private void Log(Level level, string message)
    {
        // TODO: Only log if level >= _minLevel
    }

    public void Debug(string msg) => Log(Level.Debug, msg);
    public void Info(string msg)  => Log(Level.Info, msg);
    public void Warn(string msg)  => Log(Level.Warn, msg);
    public void Error(string msg) => Log(Level.Error, msg);
}

public class Program
{
    public static void Main()
    {
        // After implementing, usage should look like:
        // var l1 = Logger.Instance;
        // var l2 = Logger.Instance;
        // Console.WriteLine($"Same instance: {l1 == l2}");
        // l1.SetLevel(Logger.Level.Warn);
        // l1.Debug("Starting up");
        // l1.Info("Server listening on port 8080");
        // l1.Warn("Connection pool running low");
        // l1.Error("Failed to connect to database");
    }
}
```

```typescript
const LogLevel = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
} as const;
type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

class Logger {
    private minLevel: LogLevel = LogLevel.INFO;

    setLevel(level: LogLevel): void {
        // TODO
    }

    private log(level: LogLevel, message: string): void {
        // TODO: Only log if level >= minLevel
    }

    debug(msg: string): void { this.log(LogLevel.DEBUG, msg); }
    info(msg: string): void  { this.log(LogLevel.INFO, msg); }
    warn(msg: string): void  { this.log(LogLevel.WARN, msg); }
    error(msg: string): void { this.log(LogLevel.ERROR, msg); }
}

// TODO: Export as module-level singleton

// After implementing, usage should look like:
// const l1 = Logger.getInstance();
// const l2 = Logger.getInstance();
// console.log("Same instance:", l1 === l2);
// l1.setLevel(LogLevel.WARN);
// l1.debug("Starting up");
// l1.info("Server listening on port 8080");
// l1.warn("Connection pool running low");
// l1.error("Failed to connect to database");
```

#### Solutions

```java
enum Logger {
    INSTANCE;

    public enum Level { DEBUG, INFO, WARN, ERROR }

    public static Logger getInstance() { return INSTANCE; }

    private Level minLevel = Level.INFO;

    public void setLevel(Level level) {
        this.minLevel = level;
    }

    private void log(Level level, String message) {
        if (level.ordinal() >= minLevel.ordinal()) {
            System.out.println("[" + level + "] " + message);
        }
    }

    public void debug(String msg) { log(Level.DEBUG, msg); }
    public void info(String msg)  { log(Level.INFO, msg); }
    public void warn(String msg)  { log(Level.WARN, msg); }
    public void error(String msg) { log(Level.ERROR, msg); }
}

public class Main {
    public static void main(String[] args) {
        Logger l1 = Logger.getInstance();
        Logger l2 = Logger.getInstance();
        System.out.println("Same instance: " + (l1 == l2));
        l1.setLevel(Logger.Level.WARN);
        l1.debug("Starting up");
        l1.info("Server listening on port 8080");
        l1.warn("Connection pool running low");
        l1.error("Failed to connect to database");
    }
}
```

```python
from enum import IntEnum
import threading

class LogLevel(IntEnum):
    DEBUG = 0
    INFO = 1
    WARN = 2
    ERROR = 3

class Logger:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance._min_level = LogLevel.INFO
                    cls._instance._rlock = threading.RLock()
        return cls._instance

    def set_level(self, level: LogLevel):
        with self._rlock:
            self._min_level = level

    def _log(self, level: LogLevel, message: str):
        with self._rlock:
            if level >= self._min_level:
                print(f"[{level.name}] {message}")

    def debug(self, msg): self._log(LogLevel.DEBUG, msg)
    def info(self, msg):  self._log(LogLevel.INFO, msg)
    def warn(self, msg):  self._log(LogLevel.WARN, msg)
    def error(self, msg): self._log(LogLevel.ERROR, msg)

if __name__ == "__main__":
    l1 = Logger()
    l2 = Logger()
    print(f"Same instance: {l1 is l2}")
    l1.set_level(LogLevel.WARN)
    l1.debug("Starting up")
    l1.info("Server listening on port 8080")
    l1.warn("Connection pool running low")
    l1.error("Failed to connect to database")
```

```cpp
#include <iostream>
#include <mutex>
#include <string>

using namespace std;

class Logger {
public:
    enum class Level { DEBUG, INFO, WARN, ERROR };

    static Logger& getInstance() {
        static Logger instance;
        return instance;
    }

    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;

    void setLevel(Level level) {
        lock_guard<mutex> lock(mutex_);
        minLevel_ = level;
    }

    void debug(const string& msg) { log(Level::DEBUG, msg); }
    void info(const string& msg)  { log(Level::INFO, msg); }
    void warn(const string& msg)  { log(Level::WARN, msg); }
    void error(const string& msg) { log(Level::ERROR, msg); }

private:
    Level minLevel_ = Level::INFO;
    mutex mutex_;

    void log(Level level, const string& msg) {
        lock_guard<mutex> lock(mutex_);
        if (level >= minLevel_) {
            const char* names[] = {"DEBUG", "INFO", "WARN", "ERROR"};
            cout << "[" << names[static_cast<int>(level)] << "] " << msg << endl;
        }
    }

    Logger() = default;
};

int main() {
    Logger& l1 = Logger::getInstance();
    Logger& l2 = Logger::getInstance();
    cout << "Same instance: " << (&l1 == &l2 " "true" : "false") << endl;
    l1.setLevel(Logger::Level::WARN);
    l1.debug("Starting up");
    l1.info("Server listening on port 8080");
    l1.warn("Connection pool running low");
    l1.error("Failed to connect to database");
    return 0;
}
```

```go
package main

import (
	"fmt"
	"sync"
)

type LogLevel int

const (
	DEBUG LogLevel = iota
	INFO
	WARN
	ERROR
)

func (l LogLevel) String() string {
	switch l {
	case DEBUG:
		return "DEBUG"
	case INFO:
		return "INFO"
	case WARN:
		return "WARN"
	case ERROR:
		return "ERROR"
	default:
		return "UNKNOWN"
	}
}

type Logger struct {
	minLevel LogLevel
	mu       sync.RWMutex
}

var (
	instance *Logger
	once     sync.Once
)

func GetInstance() *Logger {
	once.Do(func() {
		instance = &Logger{
			minLevel: INFO,
		}
	})
	return instance
}

func (l *Logger) SetLevel(level LogLevel) {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.minLevel = level
}

func (l *Logger) log(level LogLevel, message string) {
	l.mu.RLock()
	minLevel := l.minLevel
	l.mu.RUnlock()

	if level >= minLevel {
		fmt.Printf("[%s] %s\n", level.String(), message)
	}
}

func (l *Logger) Debug(msg string) { l.log(DEBUG, msg) }
func (l *Logger) Info(msg string)  { l.log(INFO, msg) }
func (l *Logger) Warn(msg string)  { l.log(WARN, msg) }
func (l *Logger) Error(msg string) { l.log(ERROR, msg) }

func main() {
	l1 := GetInstance()
	l2 := GetInstance()
	fmt.Printf("Same instance: %t\n", l1 == l2)
	l1.SetLevel(WARN)
	l1.Debug("Starting up")
	l1.Info("Server listening on port 8080")
	l1.Warn("Connection pool running low")
	l1.Error("Failed to connect to database")
}
```

```csharp
using System;

public sealed class Logger
{
    public enum Level { Debug, Info, Warn, Error }

    private static readonly Lazy<Logger> _lazy = new Lazy<Logger>(() => new Logger());
    public static Logger Instance => _lazy.Value;

    private Level _minLevel = Level.Info;

    private Logger() { }

    public void SetLevel(Level level)
    {
        _minLevel = level;
    }

    private void Log(Level level, string message)
    {
        if (level >= _minLevel)
        {
            Console.WriteLine($"[{level.ToString().ToUpper()}] {message}");
        }
    }

    public void Debug(string msg) => Log(Level.Debug, msg);
    public void Info(string msg)  => Log(Level.Info, msg);
    public void Warn(string msg)  => Log(Level.Warn, msg);
    public void Error(string msg) => Log(Level.Error, msg);
}

public class Program
{
    public static void Main()
    {
        var l1 = Logger.Instance;
        var l2 = Logger.Instance;
        Console.WriteLine($"Same instance: {l1 == l2}");
        l1.SetLevel(Logger.Level.Warn);
        l1.Debug("Starting up");
        l1.Info("Server listening on port 8080");
        l1.Warn("Connection pool running low");
        l1.Error("Failed to connect to database");
    }
}
```

```typescript
const LogLevel = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
} as const;
type LogLevel = (typeof LogLevel)[keyof typeof LogLevel];

class Logger {
    private static instance: Logger;
    private minLevel: LogLevel = LogLevel.INFO;

    private constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    setLevel(level: LogLevel): void {
        this.minLevel = level;
    }

    private log(level: LogLevel, message: string): void {
        if (level >= this.minLevel) {
            const names = ["DEBUG", "INFO", "WARN", "ERROR"];
            console.log(`[${names[level]}] ${message}`);
        }
    }

    debug(msg: string): void { this.log(LogLevel.DEBUG, msg); }
    info(msg: string): void  { this.log(LogLevel.INFO, msg); }
    warn(msg: string): void  { this.log(LogLevel.WARN, msg); }
    error(msg: string): void { this.log(LogLevel.ERROR, msg); }
}

const l1 = Logger.getInstance();
const l2 = Logger.getInstance();
console.log("Same instance:", l1 === l2);
l1.setLevel(LogLevel.WARN);
l1.debug("Starting up");
l1.info("Server listening on port 8080");
l1.warn("Connection pool running low");
l1.error("Failed to connect to database");
```

---

# Exercise 3: Database Connection Pool

**Problem:** Implement a `ConnectionPool` singleton that manages a fixed number of reusable database connections. Components request connections, use them, and release them back to the pool.

**Requirements:**

- Constructor takes a `maxConnections` parameter (e.g., 5)
- `getConnection()` returns an available connection (blocks or throws if none available)
- `releaseConnection(connection)` returns a connection to the pool
- `getAvailableCount()` returns the number of idle connections
- Thread-safe: multiple threads request and release connections concurrently
- Connections are represented as simple objects with an `id` and `inUse` flag

```java
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class ConnectionPool {
    // TODO: Implement as singleton

    private final BlockingQueue<Connection> pool;
    private final int maxConnections;

    public static class Connection {
        private final int id;

        Connection(int id) { this.id = id; }

        public int getId() { return id; }

        @Override
        public String toString() { return "Connection-" + id; }
    }

    private ConnectionPool(int maxConnections) {
        this.maxConnections = maxConnections;
        this.pool = new LinkedBlockingQueue<>(maxConnections);
        // TODO: Pre-create connections and add to pool
    }

    public Connection getConnection() throws InterruptedException {
        // TODO: Take from pool (blocks if empty)
        return null;
    }

    public void releaseConnection(Connection conn) {
        // TODO: Return to pool
    }

    public int getAvailableCount() {
        // TODO
        return 0;
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        // After implementing, usage should look like:
        // ConnectionPool p1 = ConnectionPool.getInstance();
        // ConnectionPool p2 = ConnectionPool.getInstance();
        // System.out.println("Same instance: " + (p1 == p2));
        // System.out.println("Available connections: " + p1.getAvailableCount());
        // ConnectionPool.Connection c1 = p1.getConnection();
        // System.out.println("Acquired: " + c1);
        // ConnectionPool.Connection c2 = p1.getConnection();
        // System.out.println("Acquired: " + c2);
        // System.out.println("Available after acquiring 2: " + p1.getAvailableCount());
        // p1.releaseConnection(c1);
        // System.out.println("Released: " + c1);
        // System.out.println("Available after release: " + p1.getAvailableCount());
    }
}
```

```python
import threading
from queue import Queue

class Connection:
    def __init__(self, conn_id: int):
        self.id = conn_id

    def __repr__(self):
        return f"Connection-{self.id}"

class ConnectionPool:
    # TODO: Implement as singleton

    def __init__(self, max_connections: int = 5):
        self._pool = Queue(maxsize=max_connections)
        self._max = max_connections
        # TODO: Pre-create connections

    def get_connection(self, timeout=None):
        # TODO: Get from pool (block if empty)
        return None

    def release_connection(self, conn: Connection):
        # TODO: Return to pool
        pass

    def get_available_count(self) -> int:
        # TODO
        return 0

if __name__ == "__main__":
    # After implementing, usage should look like:
    # p1 = get_pool()  # or ConnectionPool()
    # p2 = get_pool()
    # print(f"Same instance: {p1 is p2}")
    # print(f"Available connections: {p1.get_available_count()}")
    # c1 = p1.get_connection()
    # print(f"Acquired: {c1}")
    # c2 = p1.get_connection()
    # print(f"Acquired: {c2}")
    # print(f"Available after acquiring 2: {p1.get_available_count()}")
    # p1.release_connection(c1)
    # print(f"Released: {c1}")
    # print(f"Available after release: {p1.get_available_count()}")
    pass
```

```cpp
#include <queue>
#include <mutex>
#include <condition_variable>
#include <memory>
#include <string>
#include <iostream>

using namespace std;

struct Connection {
    int id;
    Connection(int id) : id(id) {}
    string toString() { return "Connection-" + to_string(id); }
};

class ConnectionPool {
    // TODO: Implement as Meyers' Singleton

private:
    queue<shared_ptr<Connection>> pool_;
    mutex mutex_;
    condition_variable cv_;
    int maxConnections_;

    ConnectionPool(int maxConnections) : maxConnections_(maxConnections) {
        // TODO: Pre-create connections
    }

public:
    shared_ptr<Connection> getConnection() {
        // TODO: Wait if pool is empty
        return nullptr;
    }

    void releaseConnection(shared_ptr<Connection> conn) {
        // TODO: Return to pool and notify waiting threads
    }

    int getAvailableCount() {
        // TODO
        return 0;
    }
};

int main() {
    // After implementing, usage should look like:
    // ConnectionPool& p1 = ConnectionPool::getInstance();
    // ConnectionPool& p2 = ConnectionPool::getInstance();
    // cout << "Same instance: " << (&p1 == &p2 " "true" : "false") << endl;
    // cout << "Available connections: " << p1.getAvailableCount() << endl;
    // auto c1 = p1.getConnection();
    // cout << "Acquired: " << c1->toString() << endl;
    // auto c2 = p1.getConnection();
    // cout << "Acquired: " << c2->toString() << endl;
    // cout << "Available after acquiring 2: " << p1.getAvailableCount() << endl;
    // p1.releaseConnection(c1);
    // cout << "Released: " << c1->toString() << endl;
    // cout << "Available after release: " << p1.getAvailableCount() << endl;
    return 0;
}
```

```go
package main

import "fmt"

type Connection struct {
	id int
}

func NewConnection(id int) *Connection {
	return &Connection{id: id}
}

func (c *Connection) ID() int {
	return c.id
}

func (c *Connection) String() string {
	return fmt.Sprintf("Connection-%d", c.id)
}

type ConnectionPool struct {
	// TODO: Implement as singleton

	pool          []*Connection
	maxConnections int
}

func NewConnectionPool(maxConnections int) *ConnectionPool {
	pool := &ConnectionPool{
		maxConnections: maxConnections,
		pool:           make([]*Connection, 0, maxConnections),
	}
	// TODO: Pre-create connections and add to pool
	return pool
}

func (p *ConnectionPool) GetConnection() *Connection {
	// TODO: Take from pool (blocks if empty)
	return nil
}

func (p *ConnectionPool) ReleaseConnection(conn *Connection) {
	// TODO: Return to pool
}

func (p *ConnectionPool) GetAvailableCount() int {
	// TODO
	return 0
}

func main() {
	// After implementing, usage should look like:
	// p1 := GetConnectionPool() // or NewConnectionPool(...)
	// p2 := GetConnectionPool()
	// fmt.Println("Same instance:", p1 == p2)
	// fmt.Println("Available connections:", p1.GetAvailableCount())
	// c1 := p1.GetConnection()
	// fmt.Println("Acquired:", c1)
	// c2 := p1.GetConnection()
	// fmt.Println("Acquired:", c2)
	// fmt.Println("Available after acquiring 2:", p1.GetAvailableCount())
	// p1.ReleaseConnection(c1)
	// fmt.Println("Released:", c1)
	// fmt.Println("Available after release:", p1.GetAvailableCount())
}
```

```csharp
using System.Collections.Concurrent;

public class Connection
{
    public int Id { get; }
    public Connection(int id) { Id = id; }
    public override string ToString() => $"Connection-{Id}";
}

public sealed class ConnectionPool
{
    // TODO: Implement as singleton using Lazy<T>

    private readonly BlockingCollection<Connection> _pool;
    private readonly int _maxConnections;

    private ConnectionPool(int maxConnections)
    {
        _maxConnections = maxConnections;
        _pool = new BlockingCollection<Connection>(maxConnections);
        // TODO: Pre-create connections
    }

    public Connection GetConnection()
    {
        // TODO: Take from pool (blocks if empty)
        return null;
    }

    public void ReleaseConnection(Connection conn)
    {
        // TODO: Return to pool
    }

    public int AvailableCount => _pool.Count;
}

public class Program
{
    public static void Main()
    {
        // After implementing, usage should look like:
        // var p1 = ConnectionPool.Instance;
        // var p2 = ConnectionPool.Instance;
        // Console.WriteLine($"Same instance: {p1 == p2}");
        // Console.WriteLine($"Available connections: {p1.AvailableCount}");
        // var c1 = p1.GetConnection();
        // Console.WriteLine($"Acquired: {c1}");
        // var c2 = p1.GetConnection();
        // Console.WriteLine($"Acquired: {c2}");
        // Console.WriteLine($"Available after acquiring 2: {p1.AvailableCount}");
        // p1.ReleaseConnection(c1);
        // Console.WriteLine($"Released: {c1}");
        // Console.WriteLine($"Available after release: {p1.AvailableCount}");
    }
}
```

```typescript
class Connection {
    readonly id: number;
    constructor(id: number) { this.id = id; }
    toString(): string { return `Connection-${this.id}`; }
}

class ConnectionPool {
    private pool: Connection[] = [];
    private maxConnections: number;

    constructor(maxConnections: number = 5) {
        this.maxConnections = maxConnections;
        // TODO: Pre-create connections
    }

    getConnection(): Connection | undefined {
        // TODO: Return an available connection
        return undefined;
    }

    releaseConnection(conn: Connection): void {
        // TODO: Return to pool
    }

    getAvailableCount(): number {
        // TODO
        return 0;
    }
}

// TODO: Export as module-level singleton

// After implementing, usage should look like:
// const p1 = ConnectionPool.getInstance();
// const p2 = ConnectionPool.getInstance();
// console.log("Same instance:", p1 === p2);
// console.log("Available connections:", p1.getAvailableCount());
// const c1 = p1.getConnection();
// console.log("Acquired:", c1".toString());
// const c2 = p1.getConnection();
// console.log("Acquired:", c2".toString());
// console.log("Available after acquiring 2:", p1.getAvailableCount());
// if (c1) p1.releaseConnection(c1);
// console.log("Released:", c1".toString());
// console.log("Available after release:", p1.getAvailableCount());
```

#### Solutions

```java
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class ConnectionPool {
    // Singleton implementation using Holder pattern

    private final BlockingQueue<Connection> pool;
    private final int maxConnections;

    public static class Connection {
        private final int id;

        Connection(int id) { this.id = id; }

        public int getId() { return id; }

        @Override
        public String toString() { return "Connection-" + id; }
    }

    private ConnectionPool(int maxConnections) {
        this.maxConnections = maxConnections;
        this.pool = new LinkedBlockingQueue<>(maxConnections);
        for (int i = 1; i <= maxConnections; i++) {
            pool.add(new Connection(i));
        }
    }

    private static class Holder {
        static final ConnectionPool INSTANCE = new ConnectionPool(5);
    }

    public static ConnectionPool getInstance() {
        return Holder.INSTANCE;
    }

    public Connection getConnection() throws InterruptedException {
        return pool.take();
    }

    public void releaseConnection(Connection conn) {
        pool.offer(conn);
    }

    public int getAvailableCount() {
        return pool.size();
    }
}

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ConnectionPool p1 = ConnectionPool.getInstance();
        ConnectionPool p2 = ConnectionPool.getInstance();
        System.out.println("Same instance: " + (p1 == p2));
        System.out.println("Available connections: " + p1.getAvailableCount());
        ConnectionPool.Connection c1 = p1.getConnection();
        System.out.println("Acquired: " + c1);
        ConnectionPool.Connection c2 = p1.getConnection();
        System.out.println("Acquired: " + c2);
        System.out.println("Available after acquiring 2: " + p1.getAvailableCount());
        p1.releaseConnection(c1);
        System.out.println("Released: " + c1);
        System.out.println("Available after release: " + p1.getAvailableCount());
    }
}
```

```python
import threading
from queue import Queue

class Connection:
    def __init__(self, conn_id: int):
        self.id = conn_id

    def __repr__(self):
        return f"Connection-{self.id}"

class ConnectionPool:
    _instance = None
    _lock = threading.Lock()

    def __new__(cls, max_connections: int = 5):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    inst = super().__new__(cls)
                    inst._pool = Queue(maxsize=max_connections)
                    inst._max = max_connections
                    for i in range(1, max_connections + 1):
                        inst._pool.put(Connection(i))
                    cls._instance = inst
        return cls._instance

    def get_connection(self, timeout=None):
        return self._pool.get(timeout=timeout)

    def release_connection(self, conn: Connection):
        self._pool.put(conn)

    def get_available_count(self) -> int:
        return self._pool.qsize()

if __name__ == "__main__":
    p1 = ConnectionPool()
    p2 = ConnectionPool()
    print(f"Same instance: {p1 is p2}")
    print(f"Available connections: {p1.get_available_count()}")
    c1 = p1.get_connection()
    print(f"Acquired: {c1}")
    c2 = p1.get_connection()
    print(f"Acquired: {c2}")
    print(f"Available after acquiring 2: {p1.get_available_count()}")
    p1.release_connection(c1)
    print(f"Released: {c1}")
    print(f"Available after release: {p1.get_available_count()}")
```

```cpp
#include <queue>
#include <mutex>
#include <condition_variable>
#include <memory>
#include <string>
#include <iostream>

using namespace std;

struct Connection {
    int id;
    Connection(int id) : id(id) {}
    string toString() { return "Connection-" + to_string(id); }
};

class ConnectionPool {
    // Meyers' Singleton implementation

private:
    queue<shared_ptr<Connection>> pool_;
    mutex mutex_;
    condition_variable cv_;
    int maxConnections_;

    ConnectionPool(int maxConnections) : maxConnections_(maxConnections) {
        for (int i = 1; i <= maxConnections; i++) {
            pool_.push(make_shared<Connection>(i));
        }
    }

public:
    static ConnectionPool& getInstance() {
        static ConnectionPool instance(5);
        return instance;
    }

    ConnectionPool(const ConnectionPool&) = delete;
    ConnectionPool& operator=(const ConnectionPool&) = delete;

    shared_ptr<Connection> getConnection() {
        unique_lock<mutex> lock(mutex_);
        cv_.wait(lock, [this] { return !pool_.empty(); });
        auto conn = pool_.front();
        pool_.pop();
        return conn;
    }

    void releaseConnection(shared_ptr<Connection> conn) {
        lock_guard<mutex> lock(mutex_);
        pool_.push(conn);
        cv_.notify_one();
    }

    int getAvailableCount() {
        lock_guard<mutex> lock(mutex_);
        return pool_.size();
    }
};

int main() {
    ConnectionPool& p1 = ConnectionPool::getInstance();
    ConnectionPool& p2 = ConnectionPool::getInstance();
    cout << "Same instance: " << (&p1 == &p2 " "true" : "false") << endl;
    cout << "Available connections: " << p1.getAvailableCount() << endl;
    auto c1 = p1.getConnection();
    cout << "Acquired: " << c1->toString() << endl;
    auto c2 = p1.getConnection();
    cout << "Acquired: " << c2->toString() << endl;
    cout << "Available after acquiring 2: " << p1.getAvailableCount() << endl;
    p1.releaseConnection(c1);
    cout << "Released: " << c1->toString() << endl;
    cout << "Available after release: " << p1.getAvailableCount() << endl;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"sync"
)

type Connection struct {
	id int
}

func (c *Connection) String() string {
	return fmt.Sprintf("Connection-%d", c.id)
}

type ConnectionPool struct {
	pool          chan *Connection
	maxConnections int
}

var (
	instance *ConnectionPool
	once     sync.Once
)

// Singleton implementation using sync.Once.
func GetInstance() *ConnectionPool {
	once.Do(func() {
		instance = newConnectionPool(5)
	})
	return instance
}

func newConnectionPool(maxConnections int) *ConnectionPool {
	p := &ConnectionPool{
		pool:           make(chan *Connection, maxConnections),
		maxConnections: maxConnections,
	}
	for i := 1; i <= maxConnections; i++ {
		p.pool <- &Connection{id: i}
	}
	return p
}

func (p *ConnectionPool) GetConnection() *Connection {
	return <-p.pool
}

func (p *ConnectionPool) ReleaseConnection(conn *Connection) {
	p.pool <- conn
}

func (p *ConnectionPool) GetAvailableCount() int {
	return len(p.pool)
}

func main() {
	p1 := GetInstance()
	p2 := GetInstance()

	fmt.Printf("Same instance: %v\n", p1 == p2)
	fmt.Printf("Available connections: %d\n", p1.GetAvailableCount())

	c1 := p1.GetConnection()
	fmt.Printf("Acquired: %v\n", c1)

	c2 := p1.GetConnection()
	fmt.Printf("Acquired: %v\n", c2)

	fmt.Printf("Available after acquiring 2: %d\n", p1.GetAvailableCount())

	p1.ReleaseConnection(c1)
	fmt.Printf("Released: %v\n", c1)

	fmt.Printf("Available after release: %d\n", p1.GetAvailableCount())
}
```

```csharp
using System.Collections.Concurrent;

public class Connection
{
    public int Id { get; }
    public Connection(int id) { Id = id; }
    public override string ToString() => $"Connection-{Id}";
}

public sealed class ConnectionPool
{
    private static readonly Lazy<ConnectionPool> _lazy = new Lazy<ConnectionPool>(() => new ConnectionPool(5));
    public static ConnectionPool Instance => _lazy.Value;

    private readonly BlockingCollection<Connection> _pool;
    private readonly int _maxConnections;

    private ConnectionPool(int maxConnections)
    {
        _maxConnections = maxConnections;
        _pool = new BlockingCollection<Connection>(maxConnections);
        for (int i = 1; i <= maxConnections; i++)
            _pool.Add(new Connection(i));
    }

    public Connection GetConnection()
    {
        return _pool.Take();
    }

    public void ReleaseConnection(Connection conn)
    {
        _pool.Add(conn);
    }

    public int AvailableCount => _pool.Count;
}

public class Program
{
    public static void Main()
    {
        var p1 = ConnectionPool.Instance;
        var p2 = ConnectionPool.Instance;
        Console.WriteLine($"Same instance: {p1 == p2}");
        Console.WriteLine($"Available connections: {p1.AvailableCount}");
        var c1 = p1.GetConnection();
        Console.WriteLine($"Acquired: {c1}");
        var c2 = p1.GetConnection();
        Console.WriteLine($"Acquired: {c2}");
        Console.WriteLine($"Available after acquiring 2: {p1.AvailableCount}");
        p1.ReleaseConnection(c1);
        Console.WriteLine($"Released: {c1}");
        Console.WriteLine($"Available after release: {p1.AvailableCount}");
    }
}
```

```typescript
class Connection {
    readonly id: number;
    constructor(id: number) { this.id = id; }
    toString(): string { return `Connection-${this.id}`; }
}

class ConnectionPool {
    private pool: Connection[] = [];
    private maxConnections: number;

    private static instance: ConnectionPool;

    private constructor(maxConnections: number = 5) {
        this.maxConnections = maxConnections;
        for (let i = 1; i <= maxConnections; i++) {
            this.pool.push(new Connection(i));
        }
    }

    static getInstance(): ConnectionPool {
        if (!ConnectionPool.instance) {
            ConnectionPool.instance = new ConnectionPool(5);
        }
        return ConnectionPool.instance;
    }

    getConnection(): Connection | undefined {
        return this.pool.shift();
    }

    releaseConnection(conn: Connection): void {
        this.pool.push(conn);
    }

    getAvailableCount(): number {
        return this.pool.length;
    }
}

const p1 = ConnectionPool.getInstance();
const p2 = ConnectionPool.getInstance();
console.log("Same instance:", p1 === p2);
console.log("Available connections:", p1.getAvailableCount());
const c1 = p1.getConnection();
console.log("Acquired:", c1".toString());
const c2 = p1.getConnection();
console.log("Acquired:", c2".toString());
console.log("Available after acquiring 2:", p1.getAvailableCount());
if (c1) p1.releaseConnection(c1);
console.log("Released:", c1".toString());
console.log("Available after release:", p1.getAvailableCount());
```


