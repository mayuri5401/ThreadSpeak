---
id: "lld-oop-fundamentals-exercise-enums"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - OOP Fundamentals"
subSection: ""
title: "Exercise: Enums"
slug: "lld-oop-fundamentals-exercise-enums"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Enums as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Enums Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","OOP Fundamentals","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Traffic Light

**Problem:** Create a `TrafficLight` enum where each light has a color (RED, YELLOW, GREEN), a duration in seconds, and a `next()` method that returns the next light in the cycle (RED -> GREEN -> YELLOW -> RED).

**Requirements:**

- Each light has a `duration` property: RED = 30s, YELLOW = 5s, GREEN = 25s
- `next()` method returns the next `TrafficLight` in the cycle
- `display()` method prints the color and duration

```java
enum TrafficLight {
    // Define enum constants with duration: RED(30), YELLOW(5), GREEN(25)
    RED(0),
    YELLOW(0),
    GREEN(0);

    private final int duration;

    TrafficLight(int duration) {
        this.duration = duration;
    }

    public int getDuration() {
        return duration;
    }

    public TrafficLight next() {
        // Return next light: RED->GREEN, GREEN->YELLOW, YELLOW->RED
        return this;
    }

    public void display() {
        // Print: "COLOR (Xs)" e.g. "RED (30s)"
    }
}

// Test your implementation
public class Main {
    public static void main(String[] args) {
        TrafficLight light = TrafficLight.RED;
        for (int i = 0; i < 6; i++) {
            light.display();  // Should show color and duration
            light = light.next();
        }
    }
}
```

```python
from enum import Enum

class TrafficLight(Enum):
    # Set values to duration: RED = 30, YELLOW = 5, GREEN = 25
    RED = 0
    YELLOW = 0
    GREEN = 0

    def next(self) -> "TrafficLight":
        # Return next light: RED->GREEN, GREEN->YELLOW, YELLOW->RED
        return self

    def display(self) -> None:
        # Print: "COLOR (Xs)" e.g. "RED (30s)"
        pass

if __name__ == "__main__":
    light = TrafficLight.RED
    for _ in range(6):
        light.display()
        light = light.next()
```

```cpp
#include <iostream>
#include <string>

using namespace std;

enum class TrafficLight { RED, YELLOW, GREEN };

int getDuration(TrafficLight light) {
    // Return duration: RED=30, YELLOW=5, GREEN=25
    return 0;
}

TrafficLight next(TrafficLight light) {
    // Return next light: RED->GREEN, GREEN->YELLOW, YELLOW->RED
    return light;
}

void display(TrafficLight light) {
    // Print: "COLOR (Xs)" e.g. "RED (30s)"
}

int main() {
    TrafficLight light = TrafficLight::RED;
    for (int i = 0; i < 6; i++) {
        display(light);
        light = next(light);
    }
    return 0;
}
```

```go
package main

import "fmt"

type TrafficLight struct {
	name     string
	duration int
}

var (
	RED    = TrafficLight{name: "RED", duration: 0}
	YELLOW = TrafficLight{name: "YELLOW", duration: 0}
	GREEN  = TrafficLight{name: "GREEN", duration: 0}
)

func (t TrafficLight) GetDuration() int {
	// Return duration: RED=30, YELLOW=5, GREEN=25
	return t.duration
}

func (t TrafficLight) Next() TrafficLight {
	// Return next light: RED->GREEN, GREEN->YELLOW, YELLOW->RED
	return t
}

func (t TrafficLight) Display() {
	// Print: "COLOR (Xs)" e.g. "RED (30s)"
	fmt.Printf("")
}

func main() {
	light := RED
	for i := 0; i < 6; i++ {
		light.Display()
		light = light.Next()
	}
}
```

```csharp
using System;

public class TrafficLight
{
    public static readonly TrafficLight RED = new TrafficLight("RED", 0);
    public static readonly TrafficLight YELLOW = new TrafficLight("YELLOW", 0);
    public static readonly TrafficLight GREEN = new TrafficLight("GREEN", 0);

    public string Name { get; }
    public int Duration { get; }

    private TrafficLight(string name, int duration)
    {
        Name = name;
        Duration = duration;
    }

    public TrafficLight Next()
    {
        // Return next light: RED->GREEN, GREEN->YELLOW, YELLOW->RED
        return this;
    }

    public void Display()
    {
        // Print: "COLOR (Xs)" e.g. "RED (30s)"
    }
}

public class Program
{
    public static void Main()
    {
        var light = TrafficLight.RED;
        for (int i = 0; i < 6; i++)
        {
            light.Display();
            light = light.Next();
        }
    }
}
```

```typescript
class TrafficLight {
    static readonly RED = new TrafficLight("RED", 0);
    static readonly YELLOW = new TrafficLight("YELLOW", 0);
    static readonly GREEN = new TrafficLight("GREEN", 0);

    readonly color: string;
    readonly duration: number;

    private constructor(color: string, duration: number) {
        this.color = color;
        this.duration = duration;
    }

    next(): TrafficLight {
        // Return next light: RED->GREEN, GREEN->YELLOW, YELLOW->RED
        return this;
    }

    display(): void {
        // Print: "COLOR (Xs)" e.g. "RED (30s)"
    }
}

// Test your implementation
let light = TrafficLight.RED;
for (let i = 0; i < 6; i++) {
    light.display();
    light = light.next();
}
```

#### Solutions

```java
enum TrafficLight {
    RED(30),
    YELLOW(5),
    GREEN(25);

    private final int duration;

    TrafficLight(int duration) {
        this.duration = duration;
    }

    public int getDuration() {
        return duration;
    }

    public TrafficLight next() {
        switch (this) {
            case RED: return GREEN;
            case GREEN: return YELLOW;
            case YELLOW: return RED;
            default: return this;
        }
    }

    public void display() {
        System.out.println(this.name() + " (" + duration + "s)");
    }
}

public class Main {
    public static void main(String[] args) {
        TrafficLight light = TrafficLight.RED;
        for (int i = 0; i < 6; i++) {
            light.display();
            light = light.next();
        }
    }
}
```

```python
from enum import Enum

class TrafficLight(Enum):
    RED = 30
    YELLOW = 5
    GREEN = 25

    def next(self) -> "TrafficLight":
        if self == TrafficLight.RED:
            return TrafficLight.GREEN
        elif self == TrafficLight.GREEN:
            return TrafficLight.YELLOW
        else:
            return TrafficLight.RED

    def display(self) -> None:
        print(f"{self.name} ({self.value}s)")

if __name__ == "__main__":
    light = TrafficLight.RED
    for _ in range(6):
        light.display()
        light = light.next()
```

```cpp
#include <iostream>
#include <string>

using namespace std;

enum class TrafficLight { RED, YELLOW, GREEN };

int getDuration(TrafficLight light) {
    switch (light) {
        case TrafficLight::RED: return 30;
        case TrafficLight::YELLOW: return 5;
        case TrafficLight::GREEN: return 25;
        default: return 0;
    }
}

TrafficLight next(TrafficLight light) {
    switch (light) {
        case TrafficLight::RED: return TrafficLight::GREEN;
        case TrafficLight::GREEN: return TrafficLight::YELLOW;
        case TrafficLight::YELLOW: return TrafficLight::RED;
        default: return light;
    }
}

void display(TrafficLight light) {
    string name;
    switch (light) {
        case TrafficLight::RED: name = "RED"; break;
        case TrafficLight::YELLOW: name = "YELLOW"; break;
        case TrafficLight::GREEN: name = "GREEN"; break;
    }
    cout << name << " (" << getDuration(light) << "s)" << endl;
}

int main() {
    TrafficLight light = TrafficLight::RED;
    for (int i = 0; i < 6; i++) {
        display(light);
        light = next(light);
    }
    return 0;
}
```

```go
package main

import "fmt"

type TrafficLight int

const (
	RED TrafficLight = iota
	YELLOW
	GREEN
)

func (t TrafficLight) getDuration() int {
	switch t {
	case RED:
		return 30
	case YELLOW:
		return 5
	case GREEN:
		return 25
	default:
		return 0
	}
}

func (t TrafficLight) next() TrafficLight {
	switch t {
	case RED:
		return GREEN
	case GREEN:
		return YELLOW
	case YELLOW:
		return RED
	default:
		return t
	}
}

func (t TrafficLight) display() {
	var name string
	switch t {
	case RED:
		name = "RED"
	case YELLOW:
		name = "YELLOW"
	case GREEN:
		name = "GREEN"
	default:
		name = "UNKNOWN"
	}
	fmt.Printf("%s (%ds)\n", name, t.getDuration())
}

func main() {
	light := RED
	for i := 0; i < 6; i++ {
		light.display()
		light = light.next()
	}
}
```

```csharp
using System;

public class TrafficLight
{
    public static readonly TrafficLight RED = new TrafficLight("RED", 30);
    public static readonly TrafficLight YELLOW = new TrafficLight("YELLOW", 5);
    public static readonly TrafficLight GREEN = new TrafficLight("GREEN", 25);

    public string Name { get; }
    public int Duration { get; }

    private TrafficLight(string name, int duration)
    {
        Name = name;
        Duration = duration;
    }

    public TrafficLight Next()
    {
        if (this == RED) return GREEN;
        if (this == GREEN) return YELLOW;
        return RED;
    }

    public void Display()
    {
        Console.WriteLine($"{Name} ({Duration}s)");
    }
}

public class Program
{
    public static void Main()
    {
        var light = TrafficLight.RED;
        for (int i = 0; i < 6; i++)
        {
            light.Display();
            light = light.Next();
        }
    }
}
```

```typescript
class TrafficLight {
    static readonly RED = new TrafficLight("RED", 30);
    static readonly YELLOW = new TrafficLight("YELLOW", 5);
    static readonly GREEN = new TrafficLight("GREEN", 25);

    readonly color: string;
    readonly duration: number;

    private constructor(color: string, duration: number) {
        this.color = color;
        this.duration = duration;
    }

    next(): TrafficLight {
        if (this === TrafficLight.RED) return TrafficLight.GREEN;
        if (this === TrafficLight.GREEN) return TrafficLight.YELLOW;
        return TrafficLight.RED;
    }

    display(): void {
        console.log(`${this.color} (${this.duration}s)`);
    }
}

let light = TrafficLight.RED;
for (let i = 0; i < 6; i++) {
    light.display();
    light = light.next();
}
```

---

# Exercise 2: HTTP Status Code

**Problem:** Create an `HttpStatus` enum where each status has a numeric code and a message string.

**Requirements:**

- Values: OK(200, "OK"), BAD_REQUEST(400, "Bad Request"), NOT_FOUND(404, "Not Found"), INTERNAL_SERVER_ERROR(500, "Internal Server Error")
- `isSuccess()` method that returns true if the code is less than 400
- `display()` method that prints "CODE MESSAGE" (e.g. "200 OK")
- A static `fromCode(int)` method that returns the HttpStatus for a given code, or null/None if not found

```java
enum HttpStatus {
    // Define constants: OK(200, "OK"), BAD_REQUEST(400, "Bad Request"),
    // NOT_FOUND(404, "Not Found"), INTERNAL_SERVER_ERROR(500, "Internal Server Error")
    OK(0, ""),
    BAD_REQUEST(0, ""),
    NOT_FOUND(0, ""),
    INTERNAL_SERVER_ERROR(0, "");

    private final int code;
    private final String message;

    HttpStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        // Return true if code < 400
        return false;
    }

    public void display() {
        // Print: "CODE MESSAGE" e.g. "200 OK"
    }

    public static HttpStatus fromCode(int code) {
        // Return the HttpStatus matching the code, or null if not found
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        HttpStatus.OK.display();
        HttpStatus.NOT_FOUND.display();

        System.out.println("Is 200 success" " + HttpStatus.OK.isSuccess());
        System.out.println("Is 404 success" " + HttpStatus.NOT_FOUND.isSuccess());

        HttpStatus found = HttpStatus.fromCode(500);
        if (found != null) {
            System.out.print("Found by code 500: ");
            found.display();
        }
    }
}
```

```python
from enum import Enum

class HttpStatus(Enum):
    # Set values to (code, message) tuples:
    # OK = (200, "OK"), BAD_REQUEST = (400, "Bad Request"),
    # NOT_FOUND = (404, "Not Found"), INTERNAL_SERVER_ERROR = (500, "Internal Server Error")
    OK = (0, "")
    BAD_REQUEST = (0, "")
    NOT_FOUND = (0, "")
    INTERNAL_SERVER_ERROR = (0, "")

    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message

    def is_success(self) -> bool:
        # Return True if code < 400
        return False

    def display(self) -> None:
        # Print: "CODE MESSAGE" e.g. "200 OK"
        pass

    @staticmethod
    def from_code(code: int):
        # Return the HttpStatus matching the code, or None if not found
        return None

if __name__ == "__main__":
    HttpStatus.OK.display()
    HttpStatus.NOT_FOUND.display()

    print(f"Is 200 success" {str(HttpStatus.OK.is_success()).lower()}")
    print(f"Is 404 success" {str(HttpStatus.NOT_FOUND.is_success()).lower()}")

    found = HttpStatus.from_code(500)
    if found is not None:
        print("Found by code 500: ", end="")
        found.display()
```

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct HttpStatus {
    int code;
    string message;

    static const HttpStatus OK;
    static const HttpStatus BAD_REQUEST;
    static const HttpStatus NOT_FOUND;
    static const HttpStatus INTERNAL_SERVER_ERROR;

    bool isSuccess() const {
        // Return true if code < 400
        return false;
    }

    void display() const {
        // Print: "CODE MESSAGE" e.g. "200 OK"
    }

    static const HttpStatus* fromCode(int code) {
        // Return pointer to HttpStatus matching the code, or nullptr if not found
        return nullptr;
    }

    static const vector<const HttpStatus*>& values() {
        static vector<const HttpStatus*> v = {&OK, &BAD_REQUEST, &NOT_FOUND, &INTERNAL_SERVER_ERROR};
        return v;
    }
};

// Set correct values: OK(200, "OK"), BAD_REQUEST(400, "Bad Request"),
// NOT_FOUND(404, "Not Found"), INTERNAL_SERVER_ERROR(500, "Internal Server Error")
const HttpStatus HttpStatus::OK{0, ""};
const HttpStatus HttpStatus::BAD_REQUEST{0, ""};
const HttpStatus HttpStatus::NOT_FOUND{0, ""};
const HttpStatus HttpStatus::INTERNAL_SERVER_ERROR{0, ""};

int main() {
    HttpStatus::OK.display();
    HttpStatus::NOT_FOUND.display();

    cout << "Is 200 success" " << (HttpStatus::OK.isSuccess() " "true" : "false") << endl;
    cout << "Is 404 success" " << (HttpStatus::NOT_FOUND.isSuccess() " "true" : "false") << endl;

    const HttpStatus* found = HttpStatus::fromCode(500);
    if (found != nullptr) {
        cout << "Found by code 500: ";
        found->display();
    }
    return 0;
}
```

```go
package main

import "fmt"

type HttpStatus struct {
	code    int
	message string
}

var (
	// Set correct values: OK(200, "OK"), BAD_REQUEST(400, "Bad Request"),
	// NOT_FOUND(404, "Not Found"), INTERNAL_SERVER_ERROR(500, "Internal Server Error")
	OK                  = HttpStatus{0, ""}
	BAD_REQUEST         = HttpStatus{0, ""}
	NOT_FOUND           = HttpStatus{0, ""}
	INTERNAL_SERVER_ERROR = HttpStatus{0, ""}

	allValues = []HttpStatus{
		OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR,
	}
)

func (h HttpStatus) IsSuccess() bool {
	// Return true if code < 400
	return false
}

func (h HttpStatus) Display() {
	// Print: "CODE MESSAGE" e.g. "200 OK"
	_ = fmt.Sprintf("%d %s", h.code, h.message)
}

func FromCode(code int) *HttpStatus {
	// Return the HttpStatus matching the code, or nil if not found
	return nil
}

func main() {
	OK.Display()
	NOT_FOUND.Display()

	fmt.Printf("Is 200 success" %t\n", OK.IsSuccess())
	fmt.Printf("Is 404 success" %t\n", NOT_FOUND.IsSuccess())

	found := FromCode(500)
	if found != nil {
		fmt.Print("Found by code 500: ")
		found.Display()
	}
}
```

```csharp
using System;
using System.Linq;

public class HttpStatus
{
    public static readonly HttpStatus OK = new HttpStatus(0, "");
    public static readonly HttpStatus BAD_REQUEST = new HttpStatus(0, "");
    public static readonly HttpStatus NOT_FOUND = new HttpStatus(0, "");
    public static readonly HttpStatus INTERNAL_SERVER_ERROR = new HttpStatus(0, "");

    public int Code { get; }
    public string Message { get; }

    private static readonly HttpStatus[] AllValues = { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR };

    private HttpStatus(int code, string message)
    {
        Code = code;
        Message = message;
    }

    public bool IsSuccess()
    {
        // Return true if Code < 400
        return false;
    }

    public void Display()
    {
        // Print: "CODE MESSAGE" e.g. "200 OK"
    }

    public static HttpStatus FromCode(int code)
    {
        // Return the HttpStatus matching the code, or null if not found
        return null;
    }
}

public class Program
{
    public static void Main()
    {
        HttpStatus.OK.Display();
        HttpStatus.NOT_FOUND.Display();

        Console.WriteLine($"Is 200 success" {HttpStatus.OK.IsSuccess().ToString().ToLower()}");
        Console.WriteLine($"Is 404 success" {HttpStatus.NOT_FOUND.IsSuccess().ToString().ToLower()}");

        var found = HttpStatus.FromCode(500);
        if (found != null)
        {
            Console.Write("Found by code 500: ");
            found.Display();
        }
    }
}
```

```typescript
class HttpStatus {
    // Set correct values: OK(200, "OK"), BAD_REQUEST(400, "Bad Request"),
    // NOT_FOUND(404, "Not Found"), INTERNAL_SERVER_ERROR(500, "Internal Server Error")
    static readonly OK = new HttpStatus(0, "");
    static readonly BAD_REQUEST = new HttpStatus(0, "");
    static readonly NOT_FOUND = new HttpStatus(0, "");
    static readonly INTERNAL_SERVER_ERROR = new HttpStatus(0, "");

    private static readonly ALL_VALUES = [
        HttpStatus.OK, HttpStatus.BAD_REQUEST,
        HttpStatus.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR
    ];

    readonly code: number;
    readonly message: string;

    private constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    isSuccess(): boolean {
        // Return true if code < 400
        return false;
    }

    display(): void {
        // Print: "CODE MESSAGE" e.g. "200 OK"
    }

    static fromCode(code: number): HttpStatus | null {
        // Return the HttpStatus matching the code, or null if not found
        return null;
    }
}

HttpStatus.OK.display();
HttpStatus.NOT_FOUND.display();

console.log(`Is 200 success" ${HttpStatus.OK.isSuccess()}`);
console.log(`Is 404 success" ${HttpStatus.NOT_FOUND.isSuccess()}`);

const found = HttpStatus.fromCode(500);
if (found !== null) {
    process.stdout.write("Found by code 500: ");
    found.display();
}
```

#### Solutions

```java
enum HttpStatus {
    OK(200, "OK"),
    BAD_REQUEST(400, "Bad Request"),
    NOT_FOUND(404, "Not Found"),
    INTERNAL_SERVER_ERROR(500, "Internal Server Error");

    private final int code;
    private final String message;

    HttpStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public boolean isSuccess() {
        return code < 400;
    }

    public void display() {
        System.out.println(code + " " + message);
    }

    public static HttpStatus fromCode(int code) {
        for (HttpStatus status : values()) {
            if (status.code == code) {
                return status;
            }
        }
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        HttpStatus.OK.display();
        HttpStatus.NOT_FOUND.display();

        System.out.println("Is 200 success" " + HttpStatus.OK.isSuccess());
        System.out.println("Is 404 success" " + HttpStatus.NOT_FOUND.isSuccess());

        HttpStatus found = HttpStatus.fromCode(500);
        if (found != null) {
            System.out.print("Found by code 500: ");
            found.display();
        }
    }
}
```

```python
from enum import Enum

class HttpStatus(Enum):
    OK = (200, "OK")
    BAD_REQUEST = (400, "Bad Request")
    NOT_FOUND = (404, "Not Found")
    INTERNAL_SERVER_ERROR = (500, "Internal Server Error")

    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message

    def is_success(self) -> bool:
        return self.code < 400

    def display(self) -> None:
        print(f"{self.code} {self.message}")

    @staticmethod
    def from_code(code: int):
        for status in HttpStatus:
            if status.code == code:
                return status
        return None

if __name__ == "__main__":
    HttpStatus.OK.display()
    HttpStatus.NOT_FOUND.display()

    print(f"Is 200 success" {str(HttpStatus.OK.is_success()).lower()}")
    print(f"Is 404 success" {str(HttpStatus.NOT_FOUND.is_success()).lower()}")

    found = HttpStatus.from_code(500)
    if found is not None:
        print("Found by code 500: ", end="")
        found.display()
```

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct HttpStatus {
    int code;
    string message;

    static const HttpStatus OK;
    static const HttpStatus BAD_REQUEST;
    static const HttpStatus NOT_FOUND;
    static const HttpStatus INTERNAL_SERVER_ERROR;

    bool isSuccess() const {
        return code < 400;
    }

    void display() const {
        cout << code << " " << message << endl;
    }

    static const HttpStatus* fromCode(int code) {
        for (const auto* status : values()) {
            if (status->code == code) {
                return status;
            }
        }
        return nullptr;
    }

    static const vector<const HttpStatus*>& values() {
        static vector<const HttpStatus*> v = {&OK, &BAD_REQUEST, &NOT_FOUND, &INTERNAL_SERVER_ERROR};
        return v;
    }
};

const HttpStatus HttpStatus::OK{200, "OK"};
const HttpStatus HttpStatus::BAD_REQUEST{400, "Bad Request"};
const HttpStatus HttpStatus::NOT_FOUND{404, "Not Found"};
const HttpStatus HttpStatus::INTERNAL_SERVER_ERROR{500, "Internal Server Error"};

int main() {
    HttpStatus::OK.display();
    HttpStatus::NOT_FOUND.display();

    cout << "Is 200 success" " << (HttpStatus::OK.isSuccess() " "true" : "false") << endl;
    cout << "Is 404 success" " << (HttpStatus::NOT_FOUND.isSuccess() " "true" : "false") << endl;

    const HttpStatus* found = HttpStatus::fromCode(500);
    if (found != nullptr) {
        cout << "Found by code 500: ";
        found->display();
    }
    return 0;
}
```

```go
package main

import "fmt"

type HttpStatus struct {
	code    int
	message string
}

var (
	OK                   = HttpStatus{code: 200, message: "OK"}
	BAD_REQUEST          = HttpStatus{code: 400, message: "Bad Request"}
	NOT_FOUND            = HttpStatus{code: 404, message: "Not Found"}
	INTERNAL_SERVER_ERROR = HttpStatus{code: 500, message: "Internal Server Error"}
)

var allValues = []*HttpStatus{&OK, &BAD_REQUEST, &NOT_FOUND, &INTERNAL_SERVER_ERROR}

func (h *HttpStatus) GetCode() int {
	return h.code
}

func (h *HttpStatus) GetMessage() string {
	return h.message
}

func (h *HttpStatus) IsSuccess() bool {
	return h.code < 400
}

func (h *HttpStatus) Display() {
	fmt.Println(h.code, h.message)
}

func FromCode(code int) *HttpStatus {
	for _, status := range allValues {
		if status.code == code {
			return status
		}
	}
	return nil
}

func main() {
	OK.Display()
	NOT_FOUND.Display()

	fmt.Println("Is 200 success"", OK.IsSuccess())
	fmt.Println("Is 404 success"", NOT_FOUND.IsSuccess())

	found := FromCode(500)
	if found != nil {
		fmt.Print("Found by code 500: ")
		found.Display()
	}
}
```

```csharp
using System;
using System.Linq;

public class HttpStatus
{
    public static readonly HttpStatus OK = new HttpStatus(200, "OK");
    public static readonly HttpStatus BAD_REQUEST = new HttpStatus(400, "Bad Request");
    public static readonly HttpStatus NOT_FOUND = new HttpStatus(404, "Not Found");
    public static readonly HttpStatus INTERNAL_SERVER_ERROR = new HttpStatus(500, "Internal Server Error");

    public int Code { get; }
    public string Message { get; }

    private static readonly HttpStatus[] AllValues = { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR };

    private HttpStatus(int code, string message)
    {
        Code = code;
        Message = message;
    }

    public bool IsSuccess()
    {
        return Code < 400;
    }

    public void Display()
    {
        Console.WriteLine($"{Code} {Message}");
    }

    public static HttpStatus FromCode(int code)
    {
        return AllValues.FirstOrDefault(s => s.Code == code);
    }
}

public class Program
{
    public static void Main()
    {
        HttpStatus.OK.Display();
        HttpStatus.NOT_FOUND.Display();

        Console.WriteLine($"Is 200 success" {HttpStatus.OK.IsSuccess().ToString().ToLower()}");
        Console.WriteLine($"Is 404 success" {HttpStatus.NOT_FOUND.IsSuccess().ToString().ToLower()}");

        var found = HttpStatus.FromCode(500);
        if (found != null)
        {
            Console.Write("Found by code 500: ");
            found.Display();
        }
    }
}
```

```typescript
class HttpStatus {
    static readonly OK = new HttpStatus(200, "OK");
    static readonly BAD_REQUEST = new HttpStatus(400, "Bad Request");
    static readonly NOT_FOUND = new HttpStatus(404, "Not Found");
    static readonly INTERNAL_SERVER_ERROR = new HttpStatus(500, "Internal Server Error");

    private static readonly ALL_VALUES = [
        HttpStatus.OK, HttpStatus.BAD_REQUEST,
        HttpStatus.NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR
    ];

    readonly code: number;
    readonly message: string;

    private constructor(code: number, message: string) {
        this.code = code;
        this.message = message;
    }

    isSuccess(): boolean {
        return this.code < 400;
    }

    display(): void {
        console.log(`${this.code} ${this.message}`);
    }

    static fromCode(code: number): HttpStatus | null {
        return HttpStatus.ALL_VALUES.find(s => s.code === code) "" null;
    }
}

HttpStatus.OK.display();
HttpStatus.NOT_FOUND.display();

console.log(`Is 200 success" ${HttpStatus.OK.isSuccess()}`);
console.log(`Is 404 success" ${HttpStatus.NOT_FOUND.isSuccess()}`);

const found = HttpStatus.fromCode(500);
if (found !== null) {
    process.stdout.write("Found by code 500: ");
    found.display();
}
```


