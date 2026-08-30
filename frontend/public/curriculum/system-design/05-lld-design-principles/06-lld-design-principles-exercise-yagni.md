---
id: "lld-design-principles-exercise-yagni"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Principles"
subSection: ""
title: "Exercise: YAGNI"
slug: "lld-design-principles-exercise-yagni"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: YAGNI as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: YAGNI Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Design Principles","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Exercise: YAGNI"
  code: |
    $3a
---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Simplify an Overengineered PasswordValidator

**Problem:** A developer built a full validation rules engine with an interface, three rule classes, and a validation engine. But the actual requirement is simple: check if a password is at least 8 characters long.

Here is the overengineered code:

```java
$3a
```

That is 1 interface, 3 rule classes, and a validation engine for a single length check. Way too much.

**Your task:** Strip the code down to a single class with a single `isValid` method. Fill in the method body in the starter code below.

**Requirements:**

- Accept a password string
- Return `true` if the password is at least 8 characters, `false` otherwise
- Handle null/empty passwords (return `false`)

```java
class PasswordValidator {
    public boolean isValid(String password) {
        // Your implementation here
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        PasswordValidator validator = new PasswordValidator();
        System.out.println(validator.isValid("short"));
        System.out.println(validator.isValid("longenough"));
        System.out.println(validator.isValid("12345678"));
        System.out.println(validator.isValid(""));
    }
}
```

```python
class PasswordValidator:
    def is_valid(self, password: str) -> bool:
        # Your implementation here
        return False

validator = PasswordValidator()
print(str(validator.is_valid("short")).lower())
print(str(validator.is_valid("longenough")).lower())
print(str(validator.is_valid("12345678")).lower())
print(str(validator.is_valid("")).lower())
```

```cpp
#include <iostream>
#include <string>

using namespace std;

class PasswordValidator {
public:
    bool isValid(const string& password) {
        // Your implementation here
        return false;
    }
};

int main() {
    PasswordValidator validator;
    cout << boolalpha;
    cout << validator.isValid("short") << endl;
    cout << validator.isValid("longenough") << endl;
    cout << validator.isValid("12345678") << endl;
    cout << validator.isValid("") << endl;
    return 0;
}
```

```go
package main

import "fmt"

type PasswordValidator struct{}

func (p PasswordValidator) IsValid(password string) bool {
	// Your implementation here
	return false
}

func main() {
	validator := PasswordValidator{}
	fmt.Println(validator.IsValid("short"))
	fmt.Println(validator.IsValid("longenough"))
	fmt.Println(validator.IsValid("12345678"))
	fmt.Println(validator.IsValid(""))
}
```

```csharp
using System;

class PasswordValidator
{
    public bool IsValid(string password)
    {
        // Your implementation here
        return false;
    }
}

class Program
{
    static void Main()
    {
        PasswordValidator validator = new PasswordValidator();
        Console.WriteLine(validator.IsValid("short").ToString().ToLower());
        Console.WriteLine(validator.IsValid("longenough").ToString().ToLower());
        Console.WriteLine(validator.IsValid("12345678").ToString().ToLower());
        Console.WriteLine(validator.IsValid("").ToString().ToLower());
    }
}
```

```typescript
class PasswordValidator {
    isValid(password: string): boolean {
        // Your implementation here
        return false;
    }
}

const validator = new PasswordValidator();
console.log(validator.isValid("short"));
console.log(validator.isValid("longenough"));
console.log(validator.isValid("12345678"));
console.log(validator.isValid(""));
```

#### Solutions

```java
class PasswordValidator {
    public boolean isValid(String password) {
        if (password == null || password.isEmpty()) {
            return false;
        }
        return password.length() >= 8;
    }
}

public class Main {
    public static void main(String[] args) {
        PasswordValidator validator = new PasswordValidator();
        System.out.println(validator.isValid("short"));
        System.out.println(validator.isValid("longenough"));
        System.out.println(validator.isValid("12345678"));
        System.out.println(validator.isValid(""));
    }
}
```

```python
class PasswordValidator:
    def is_valid(self, password: str) -> bool:
        if not password:
            return False
        return len(password) >= 8

validator = PasswordValidator()
print(str(validator.is_valid("short")).lower())
print(str(validator.is_valid("longenough")).lower())
print(str(validator.is_valid("12345678")).lower())
print(str(validator.is_valid("")).lower())
```

```cpp
#include <iostream>
#include <string>

using namespace std;

class PasswordValidator {
public:
    bool isValid(const string& password) {
        return password.length() >= 8;
    }
};

int main() {
    PasswordValidator validator;
    cout << boolalpha;
    cout << validator.isValid("short") << endl;
    cout << validator.isValid("longenough") << endl;
    cout << validator.isValid("12345678") << endl;
    cout << validator.isValid("") << endl;
    return 0;
}
```

```go
package main

import "fmt"

type PasswordValidator struct{}

func (p PasswordValidator) IsValid(password string) bool {
	if password == "" {
		return false
	}
	return len(password) >= 8
}

func main() {
	validator := PasswordValidator{}
	fmt.Println(validator.IsValid("short"))
	fmt.Println(validator.IsValid("longenough"))
	fmt.Println(validator.IsValid("12345678"))
	fmt.Println(validator.IsValid(""))
}
```

```csharp
using System;

class PasswordValidator
{
    public bool IsValid(string password)
    {
        if (string.IsNullOrEmpty(password))
        {
            return false;
        }
        return password.Length >= 8;
    }
}

class Program
{
    static void Main()
    {
        PasswordValidator validator = new PasswordValidator();
        Console.WriteLine(validator.IsValid("short").ToString().ToLower());
        Console.WriteLine(validator.IsValid("longenough").ToString().ToLower());
        Console.WriteLine(validator.IsValid("12345678").ToString().ToLower());
        Console.WriteLine(validator.IsValid("").ToString().ToLower());
    }
}
```

```typescript
class PasswordValidator {
    isValid(password: string): boolean {
        if (!password) {
            return false;
        }
        return password.length >= 8;
    }
}

const validator = new PasswordValidator();
console.log(validator.isValid("short"));
console.log(validator.isValid("longenough"));
console.log(validator.isValid("12345678"));
console.log(validator.isValid(""));
```


