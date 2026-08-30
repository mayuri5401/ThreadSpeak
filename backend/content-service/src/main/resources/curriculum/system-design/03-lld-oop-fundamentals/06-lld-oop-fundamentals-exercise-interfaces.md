---
id: "lld-oop-fundamentals-exercise-interfaces"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - OOP Fundamentals"
subSection: ""
title: "Exercise: Interfaces"
slug: "lld-oop-fundamentals-exercise-interfaces"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Interfaces as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Interfaces Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","OOP Fundamentals","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Log Formatter

**Problem:** Build a logging system where the format of log messages is configurable. A `Logger` class writes log messages, but the format (plain text vs. JSON) is determined by an injected `Formatter` interface.

**Requirements:**

- `Formatter` interface with a `format(message)` method that takes a string and returns a formatted string
- `PlainFormatter`: returns the message as-is (e.g., `"Server started on port 8080"`)
- `JsonFormatter`: returns the message wrapped in JSON (e.g., `{"log": "Server started on port 8080"}`)
- `Logger` class takes a `Formatter` in its constructor and has a `log(message)` method that formats the message, then prints it

```java
interface Formatter {
    String format(String message);
}

class PlainFormatter implements Formatter {
    public String format(String message) {
        // Return the message as-is
        return "";
    }
}

class JsonFormatter implements Formatter {
    public String format(String message) {
        // Return the message wrapped in JSON: {"log": "message"}
        return "";
    }
}

class Logger {
    private Formatter formatter;

    public Logger(Formatter formatter) {
        this.formatter = formatter;
    }

    public void log(String message) {
        // Use the formatter to format the message, then print the result
    }
}

// Test your implementation
public class Main {
    public static void main(String[] args) {
        Logger plainLogger = new Logger(new PlainFormatter());
        plainLogger.log("Server started on port 8080");

        Logger jsonLogger = new Logger(new JsonFormatter());
        jsonLogger.log("Server started on port 8080");
    }
}
```

```python
from abc import ABC, abstractmethod

class Formatter(ABC):
    @abstractmethod
    def format(self, message: str) -> str:
        pass

class PlainFormatter(Formatter):
    def format(self, message: str) -> str:
        # Return the message as-is
        return ""

class JsonFormatter(Formatter):
    def format(self, message: str) -> str:
        # Return the message wrapped in JSON: {"log": "message"}
        return ""

class Logger:
    def __init__(self, formatter: Formatter):
        self._formatter = formatter

    def log(self, message: str) -> None:
        # Use the formatter to format the message, then print the result
        pass

if __name__ == "__main__":
    plain_logger = Logger(PlainFormatter())
    plain_logger.log("Server started on port 8080")

    json_logger = Logger(JsonFormatter())
    json_logger.log("Server started on port 8080")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Formatter {
public:
    virtual ~Formatter() {}
    virtual string format(const string& message) = 0;
};

class PlainFormatter : public Formatter {
public:
    string format(const string& message) override {
        // Return the message as-is
        return "";
    }
};

class JsonFormatter : public Formatter {
public:
    string format(const string& message) override {
        // Return the message wrapped in JSON: {"log": "message"}
        return "";
    }
};

class Logger {
    Formatter* formatter;
public:
    Logger(Formatter* formatter) : formatter(formatter) {}

    void log(const string& message) {
        // Use the formatter to format the message, then print the result
    }
};

int main() {
    PlainFormatter plain;
    Logger plainLogger(&plain);
    plainLogger.log("Server started on port 8080");

    JsonFormatter json;
    Logger jsonLogger(&json);
    jsonLogger.log("Server started on port 8080");

    return 0;
}
```

```go
package main

import "fmt"

type Formatter interface {
	Format(message string) string
}

type PlainFormatter struct{}

func (p *PlainFormatter) Format(message string) string {
	// Return the message as-is
	return ""
}

type JsonFormatter struct{}

func (j *JsonFormatter) Format(message string) string {
	// Return the message wrapped in JSON: {"log": "message"}
	return ""
}

type Logger struct {
	formatter Formatter
}

func NewLogger(formatter Formatter) *Logger {
	return &Logger{
		formatter: formatter,
	}
}

func (l *Logger) Log(message string) {
	// Use the formatter to format the message, then print the result
	_ = message
	fmt.Println("")
}

func main() {
	plainLogger := NewLogger(&PlainFormatter{})
	plainLogger.Log("Server started on port 8080")

	jsonLogger := NewLogger(&JsonFormatter{})
	jsonLogger.Log("Server started on port 8080")
}
```

```csharp
using System;

public interface IFormatter
{
    string Format(string message);
}

public class PlainFormatter : IFormatter
{
    public string Format(string message)
    {
        // Return the message as-is
        return "";
    }
}

public class JsonFormatter : IFormatter
{
    public string Format(string message)
    {
        // Return the message wrapped in JSON: {"log": "message"}
        return "";
    }
}

public class Logger
{
    private IFormatter _formatter;

    public Logger(IFormatter formatter)
    {
        _formatter = formatter;
    }

    public void Log(string message)
    {
        // Use the formatter to format the message, then print the result
    }
}

public class Program
{
    public static void Main()
    {
        var plainLogger = new Logger(new PlainFormatter());
        plainLogger.Log("Server started on port 8080");

        var jsonLogger = new Logger(new JsonFormatter());
        jsonLogger.Log("Server started on port 8080");
    }
}
```

```typescript
interface Formatter {
    format(message: string): string;
}

class PlainFormatter implements Formatter {
    format(message: string): string {
        // Return the message as-is
        return "";
    }
}

class JsonFormatter implements Formatter {
    format(message: string): string {
        // Return the message wrapped in JSON: {"log": "message"}
        return "";
    }
}

class Logger {
    private formatter: Formatter;

    constructor(formatter: Formatter) {
        this.formatter = formatter;
    }

    log(message: string): void {
        // Use the formatter to format the message, then print the result
    }
}

// Test your implementation
const plainLogger = new Logger(new PlainFormatter());
plainLogger.log("Server started on port 8080");

const jsonLogger = new Logger(new JsonFormatter());
jsonLogger.log("Server started on port 8080");
```

#### Solutions

```java
interface Formatter {
    String format(String message);
}

class PlainFormatter implements Formatter {
    public String format(String message) {
        return message;
    }
}

class JsonFormatter implements Formatter {
    public String format(String message) {
        return "{\"log\": \"" + message + "\"}";
    }
}

class Logger {
    private Formatter formatter;

    public Logger(Formatter formatter) {
        this.formatter = formatter;
    }

    public void log(String message) {
        System.out.println(formatter.format(message));
    }
}

public class Main {
    public static void main(String[] args) {
        Logger plainLogger = new Logger(new PlainFormatter());
        plainLogger.log("Server started on port 8080");

        Logger jsonLogger = new Logger(new JsonFormatter());
        jsonLogger.log("Server started on port 8080");
    }
}
```

```python
from abc import ABC, abstractmethod

class Formatter(ABC):
    @abstractmethod
    def format(self, message: str) -> str:
        pass

class PlainFormatter(Formatter):
    def format(self, message: str) -> str:
        return message

class JsonFormatter(Formatter):
    def format(self, message: str) -> str:
        return '{"log": "' + message + '"}'

class Logger:
    def __init__(self, formatter: Formatter):
        self._formatter = formatter

    def log(self, message: str) -> None:
        print(self._formatter.format(message))

if __name__ == "__main__":
    plain_logger = Logger(PlainFormatter())
    plain_logger.log("Server started on port 8080")

    json_logger = Logger(JsonFormatter())
    json_logger.log("Server started on port 8080")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Formatter {
public:
    virtual ~Formatter() {}
    virtual string format(const string& message) = 0;
};

class PlainFormatter : public Formatter {
public:
    string format(const string& message) override {
        return message;
    }
};

class JsonFormatter : public Formatter {
public:
    string format(const string& message) override {
        return "{\"log\": \"" + message + "\"}";
    }
};

class Logger {
    Formatter* formatter;
public:
    Logger(Formatter* formatter) : formatter(formatter) {}

    void log(const string& message) {
        cout << formatter->format(message) << endl;
    }
};

int main() {
    PlainFormatter plain;
    Logger plainLogger(&plain);
    plainLogger.log("Server started on port 8080");

    JsonFormatter json;
    Logger jsonLogger(&json);
    jsonLogger.log("Server started on port 8080");

    return 0;
}
```

```go
package main

import "fmt"

type Formatter interface {
	Format(message string) string
}

type PlainFormatter struct{}

func (p PlainFormatter) Format(message string) string {
	return message
}

type JsonFormatter struct{}

func (j JsonFormatter) Format(message string) string {
	return "{\"log\": \"" + message + "\"}"
}

type Logger struct {
	formatter Formatter
}

func NewLogger(formatter Formatter) *Logger {
	return &Logger{formatter: formatter}
}

func (l *Logger) Log(message string) {
	fmt.Println(l.formatter.Format(message))
}

func main() {
	plainLogger := NewLogger(PlainFormatter{})
	plainLogger.Log("Server started on port 8080")

	jsonLogger := NewLogger(JsonFormatter{})
	jsonLogger.Log("Server started on port 8080")
}
```

```csharp
using System;

public interface IFormatter
{
    string Format(string message);
}

public class PlainFormatter : IFormatter
{
    public string Format(string message)
    {
        return message;
    }
}

public class JsonFormatter : IFormatter
{
    public string Format(string message)
    {
        return "{\"log\": \"" + message + "\"}";
    }
}

public class Logger
{
    private IFormatter _formatter;

    public Logger(IFormatter formatter)
    {
        _formatter = formatter;
    }

    public void Log(string message)
    {
        Console.WriteLine(_formatter.Format(message));
    }
}

public class Program
{
    public static void Main()
    {
        var plainLogger = new Logger(new PlainFormatter());
        plainLogger.Log("Server started on port 8080");

        var jsonLogger = new Logger(new JsonFormatter());
        jsonLogger.Log("Server started on port 8080");
    }
}
```

```typescript
interface Formatter {
    format(message: string): string;
}

class PlainFormatter implements Formatter {
    format(message: string): string {
        return message;
    }
}

class JsonFormatter implements Formatter {
    format(message: string): string {
        return `{"log": "${message}"}`;
    }
}

class Logger {
    private formatter: Formatter;

    constructor(formatter: Formatter) {
        this.formatter = formatter;
    }

    log(message: string): void {
        console.log(this.formatter.format(message));
    }
}

const plainLogger = new Logger(new PlainFormatter());
plainLogger.log("Server started on port 8080");

const jsonLogger = new Logger(new JsonFormatter());
jsonLogger.log("Server started on port 8080");
```

---

# Exercise 2: Input Validator

**Problem:** Build a registration system where multiple validation rules are applied to user input. Each rule is a separate implementation of a `Validator` interface, and the `RegistrationService` runs all validators before accepting the registration.

**Requirements:**

- `Validator` interface with a `validate(input)` method that returns `true` if valid, `false` otherwise
- `EmailValidator`: returns `true` if the input contains `@`
- `PasswordValidator`: returns `true` if the input has 8 or more characters
- `RegistrationService`: takes a list of validators in its constructor. Its `register(input)` method runs all validators and prints whether the input passed or failed

```java
import java.util.List;

interface Validator {
    boolean validate(String input);
}

class EmailValidator implements Validator {
    public boolean validate(String input) {
        // Return true if input contains "@"
        return false;
    }
}

class PasswordValidator implements Validator {
    public boolean validate(String input) {
        // Return true if input.length() >= 8
        return false;
    }
}

class RegistrationService {
    private List<Validator> validators;

    public RegistrationService(List<Validator> validators) {
        this.validators = validators;
    }

    public void register(String input) {
        // Run all validators on input. If all pass, print "input" - PASSED
        // If any fail, print "input" - FAILED
    }
}

// Test your implementation
public class Main {
    public static void main(String[] args) {
        List<Validator> emailValidators = List.of(new EmailValidator());
        RegistrationService emailReg = new RegistrationService(emailValidators);
        emailReg.register("user@example.com"); // Should pass
        emailReg.register("invalid-email");     // Should fail

        List<Validator> passwordValidators = List.of(new PasswordValidator());
        RegistrationService passReg = new RegistrationService(passwordValidators);
        passReg.register("strongpassword"); // Should pass
        passReg.register("short");           // Should fail
    }
}
```

```python
from abc import ABC, abstractmethod

class Validator(ABC):
    @abstractmethod
    def validate(self, input: str) -> bool:
        pass

class EmailValidator(Validator):
    def validate(self, input: str) -> bool:
        # Return True if "@" in input
        return False

class PasswordValidator(Validator):
    def validate(self, input: str) -> bool:
        # Return True if len(input) >= 8
        return False

class RegistrationService:
    def __init__(self, validators: list[Validator]):
        self._validators = validators

    def register(self, input: str) -> None:
        # Run all validators on input. If all pass, print "input" - PASSED
        # If any fail, print "input" - FAILED
        pass

if __name__ == "__main__":
    email_reg = RegistrationService([EmailValidator()])
    email_reg.register("user@example.com")  # Should pass
    email_reg.register("invalid-email")      # Should fail

    pass_reg = RegistrationService([PasswordValidator()])
    pass_reg.register("strongpassword")  # Should pass
    pass_reg.register("short")            # Should fail
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Validator {
public:
    virtual ~Validator() {}
    virtual bool validate(const string& input) = 0;
};

class EmailValidator : public Validator {
public:
    bool validate(const string& input) override {
        // Return true if input contains "@"
        return false;
    }
};

class PasswordValidator : public Validator {
public:
    bool validate(const string& input) override {
        // Return true if input.length() >= 8
        return false;
    }
};

class RegistrationService {
    vector<Validator*> validators;
public:
    RegistrationService(const vector<Validator*>& validators)
        : validators(validators) {}

    void registerInput(const string& input) {
        // Run all validators on input. If all pass, print "input" - PASSED
        // If any fail, print "input" - FAILED
    }
};

int main() {
    EmailValidator emailVal;
    vector<Validator*> emailValidators = {&emailVal};
    RegistrationService emailReg(emailValidators);
    emailReg.registerInput("user@example.com"); // Should pass
    emailReg.registerInput("invalid-email");     // Should fail

    PasswordValidator passVal;
    vector<Validator*> passValidators = {&passVal};
    RegistrationService passReg(passValidators);
    passReg.registerInput("strongpassword"); // Should pass
    passReg.registerInput("short");           // Should fail

    return 0;
}
```

```go
package main

type Validator interface {
	Validate(input string) bool
}

type EmailValidator struct{}

func (e *EmailValidator) Validate(input string) bool {
	// Return true if input contains "@"
	return false
}

type PasswordValidator struct{}

func (p *PasswordValidator) Validate(input string) bool {
	// Return true if input.length() >= 8
	return false
}

type RegistrationService struct {
	validators []Validator
}

func NewRegistrationService(validators []Validator) *RegistrationService {
	return &RegistrationService{
		validators: validators,
	}
}

func (r *RegistrationService) Register(input string) {
	// Run all validators on input. If all pass, print "input" - PASSED
	// If any fail, print "input" - FAILED
}

func main() {
	emailReg := NewRegistrationService([]Validator{&EmailValidator{}})
	emailReg.Register("user@example.com") // Should pass
	emailReg.Register("invalid-email")     // Should fail

	passReg := NewRegistrationService([]Validator{&PasswordValidator{}})
	passReg.Register("strongpassword") // Should pass
	passReg.Register("short")          // Should fail
}
```

```csharp
using System;
using System.Collections.Generic;

public interface IValidator
{
    bool Validate(string input);
}

public class EmailValidator : IValidator
{
    public bool Validate(string input)
    {
        // Return true if input contains "@"
        return false;
    }
}

public class PasswordValidator : IValidator
{
    public bool Validate(string input)
    {
        // Return true if input.Length >= 8
        return false;
    }
}

public class RegistrationService
{
    private List<IValidator> _validators;

    public RegistrationService(List<IValidator> validators)
    {
        _validators = validators;
    }

    public void Register(string input)
    {
        // Run all validators on input. If all pass, print "input" - PASSED
        // If any fail, print "input" - FAILED
    }
}

public class Program
{
    public static void Main()
    {
        var emailReg = new RegistrationService(new List<IValidator> { new EmailValidator() });
        emailReg.Register("user@example.com"); // Should pass
        emailReg.Register("invalid-email");     // Should fail

        var passReg = new RegistrationService(new List<IValidator> { new PasswordValidator() });
        passReg.Register("strongpassword"); // Should pass
        passReg.Register("short");           // Should fail
    }
}
```

```typescript
interface Validator {
    validate(input: string): boolean;
}

class EmailValidator implements Validator {
    validate(input: string): boolean {
        // Return true if input includes "@"
        return false;
    }
}

class PasswordValidator implements Validator {
    validate(input: string): boolean {
        // Return true if input.length >= 8
        return false;
    }
}

class RegistrationService {
    private validators: Validator[];

    constructor(validators: Validator[]) {
        this.validators = validators;
    }

    register(input: string): void {
        // Run all validators on input. If all pass, print "input" - PASSED
        // If any fail, print "input" - FAILED
    }
}

// Test your implementation
const emailReg = new RegistrationService([new EmailValidator()]);
emailReg.register("user@example.com"); // Should pass
emailReg.register("invalid-email");     // Should fail

const passReg = new RegistrationService([new PasswordValidator()]);
passReg.register("strongpassword"); // Should pass
passReg.register("short");           // Should fail
```

#### Solutions

```java
import java.util.List;

interface Validator {
    boolean validate(String input);
}

class EmailValidator implements Validator {
    public boolean validate(String input) {
        return input.contains("@");
    }
}

class PasswordValidator implements Validator {
    public boolean validate(String input) {
        return input.length() >= 8;
    }
}

class RegistrationService {
    private List<Validator> validators;

    public RegistrationService(List<Validator> validators) {
        this.validators = validators;
    }

    public void register(String input) {
        boolean allPassed = true;
        for (Validator validator : validators) {
            if (!validator.validate(input)) {
                allPassed = false;
                break;
            }
        }
        System.out.println("\"" + input + "\" - " + (allPassed " "PASSED" : "FAILED"));
    }
}

public class Main {
    public static void main(String[] args) {
        List<Validator> emailValidators = List.of(new EmailValidator());
        RegistrationService emailReg = new RegistrationService(emailValidators);
        emailReg.register("user@example.com");
        emailReg.register("invalid-email");

        List<Validator> passwordValidators = List.of(new PasswordValidator());
        RegistrationService passReg = new RegistrationService(passwordValidators);
        passReg.register("strongpassword");
        passReg.register("short");
    }
}
```

```python
from abc import ABC, abstractmethod

class Validator(ABC):
    @abstractmethod
    def validate(self, input: str) -> bool:
        pass

class EmailValidator(Validator):
    def validate(self, input: str) -> bool:
        return "@" in input

class PasswordValidator(Validator):
    def validate(self, input: str) -> bool:
        return len(input) >= 8

class RegistrationService:
    def __init__(self, validators: list[Validator]):
        self._validators = validators

    def register(self, input: str) -> None:
        all_passed = all(v.validate(input) for v in self._validators)
        result = "PASSED" if all_passed else "FAILED"
        print(f'"{input}" - {result}')

if __name__ == "__main__":
    email_reg = RegistrationService([EmailValidator()])
    email_reg.register("user@example.com")
    email_reg.register("invalid-email")

    pass_reg = RegistrationService([PasswordValidator()])
    pass_reg.register("strongpassword")
    pass_reg.register("short")
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Validator {
public:
    virtual ~Validator() {}
    virtual bool validate(const string& input) = 0;
};

class EmailValidator : public Validator {
public:
    bool validate(const string& input) override {
        return input.find('@') != string::npos;
    }
};

class PasswordValidator : public Validator {
public:
    bool validate(const string& input) override {
        return input.length() >= 8;
    }
};

class RegistrationService {
    vector<Validator*> validators;
public:
    RegistrationService(const vector<Validator*>& validators)
        : validators(validators) {}

    void registerInput(const string& input) {
        bool allPassed = true;
        for (auto* validator : validators) {
            if (!validator->validate(input)) {
                allPassed = false;
                break;
            }
        }
        cout << "\"" << input << "\" - " << (allPassed " "PASSED" : "FAILED") << endl;
    }
};

int main() {
    EmailValidator emailVal;
    vector<Validator*> emailValidators = {&emailVal};
    RegistrationService emailReg(emailValidators);
    emailReg.registerInput("user@example.com");
    emailReg.registerInput("invalid-email");

    PasswordValidator passVal;
    vector<Validator*> passValidators = {&passVal};
    RegistrationService passReg(passValidators);
    passReg.registerInput("strongpassword");
    passReg.registerInput("short");

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type Validator interface {
	Validate(input string) bool
}

type EmailValidator struct{}

func (e EmailValidator) Validate(input string) bool {
	return strings.Contains(input, "@")
}

type PasswordValidator struct{}

func (p PasswordValidator) Validate(input string) bool {
	return len(input) >= 8
}

type RegistrationService struct {
	validators []Validator
}

func NewRegistrationService(validators []Validator) *RegistrationService {
	return &RegistrationService{validators: validators}
}

func (r *RegistrationService) Register(input string) {
	allPassed := true
	for _, validator := range r.validators {
		if !validator.Validate(input) {
			allPassed = false
			break
		}
	}
	result := "FAILED"
	if allPassed {
		result = "PASSED"
	}
	fmt.Printf("\"%s\" - %s\n", input, result)
}

func main() {
	emailReg := NewRegistrationService([]Validator{EmailValidator{}})
	emailReg.Register("user@example.com")
	emailReg.Register("invalid-email")

	passReg := NewRegistrationService([]Validator{PasswordValidator{}})
	passReg.Register("strongpassword")
	passReg.Register("short")
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

public interface IValidator
{
    bool Validate(string input);
}

public class EmailValidator : IValidator
{
    public bool Validate(string input)
    {
        return input.Contains("@");
    }
}

public class PasswordValidator : IValidator
{
    public bool Validate(string input)
    {
        return input.Length >= 8;
    }
}

public class RegistrationService
{
    private List<IValidator> _validators;

    public RegistrationService(List<IValidator> validators)
    {
        _validators = validators;
    }

    public void Register(string input)
    {
        bool allPassed = _validators.All(v => v.Validate(input));
        Console.WriteLine($"\"{input}\" - {(allPassed " "PASSED" : "FAILED")}");
    }
}

public class Program
{
    public static void Main()
    {
        var emailReg = new RegistrationService(new List<IValidator> { new EmailValidator() });
        emailReg.Register("user@example.com");
        emailReg.Register("invalid-email");

        var passReg = new RegistrationService(new List<IValidator> { new PasswordValidator() });
        passReg.Register("strongpassword");
        passReg.Register("short");
    }
}
```

```typescript
interface Validator {
    validate(input: string): boolean;
}

class EmailValidator implements Validator {
    validate(input: string): boolean {
        return input.includes("@");
    }
}

class PasswordValidator implements Validator {
    validate(input: string): boolean {
        return input.length >= 8;
    }
}

class RegistrationService {
    private validators: Validator[];

    constructor(validators: Validator[]) {
        this.validators = validators;
    }

    register(input: string): void {
        const allPassed = this.validators.every(v => v.validate(input));
        console.log(`"${input}" - ${allPassed " "PASSED" : "FAILED"}`);
    }
}

const emailReg = new RegistrationService([new EmailValidator()]);
emailReg.register("user@example.com");
emailReg.register("invalid-email");

const passReg = new RegistrationService([new PasswordValidator()]);
passReg.register("strongpassword");
passReg.register("short");
```


