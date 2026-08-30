---
id: "lld-solid-principles-exercise-interface-segregation-principle"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - SOLID Principles"
subSection: ""
title: "Exercise: Interface Segregation Principle"
slug: "lld-solid-principles-exercise-interface-segregation-principle"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Interface Segregation Principle as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Interface Segregation Principle Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","SOLID Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Fat MultiFunctionDevice

<!-- payload:lldCodingPracticeBlock:START {"id":"698f59f1c689f866135ff90b","title":"Refactor MultiFunctionDevice","difficulty":"","expectedOutput":"BasicPrinter -> Printing: report.pdf\nOfficePrinter -> Printing: memo.pdf\nOfficePrinter -> Scanning: memo.pdf\nOfficePrinter -> Faxing: memo.pdf to 555-1234\nFullDevice -> Printing: contract.pdf\nFullDevice -> Scanning: contract.pdf\nFullDevice -> Faxing: contract.pdf to 555-5678\nFullDevice -> Stapling: contract.pdf"} -->
**Problem:** You have a `MultiFunctionDevice` interface with `print()`, `scan()`, `fax()`, and `staple()` methods. A `BasicPrinter` only prints. Refactor into separate `Printable`, `Scannable`, and `Faxable` interfaces so that `BasicPrinter` only implements the capabilities it actually supports.

**Requirements:**

- Create four focused interfaces: `Printable`, `Scannable`, `Faxable`, and `Stapleable`
- `BasicPrinter` implements only `Printable`
- `OfficePrinter` implements `Printable`, `Scannable`, and `Faxable`
- `FullDevice` implements all four interfaces
- No class should have empty methods or throw `UnsupportedOperationException`

```java
// Before: Fat interface forces BasicPrinter to implement everything
interface MultiFunctionDevice {
    void print(String document);
    void scan(String document);
    void fax(String document, String number);
    void staple(String document);
}

class BasicPrinter implements MultiFunctionDevice {
    @Override
    public void print(String document) {
        System.out.println("Printing: " + document);
    }

    @Override
    public void scan(String document) {
        throw new UnsupportedOperationException("BasicPrinter cannot scan.");
    }

    @Override
    public void fax(String document, String number) {
        throw new UnsupportedOperationException("BasicPrinter cannot fax.");
    }

    @Override
    public void staple(String document) {
        throw new UnsupportedOperationException("BasicPrinter cannot staple.");
    }
}

public class Main {
    public static void main(String[] args) {
        BasicPrinter printer = new BasicPrinter();
        printer.print("report.pdf");
    }
}

// TODO: Create Printable, Scannable, Faxable, and Stapleable interfaces.
// TODO: Refactor BasicPrinter to implement only Printable.
// TODO: Create an OfficePrinter that implements Printable, Scannable, and Faxable.
// TODO: Create a FullDevice that implements all four interfaces.
```

```python
from abc import ABC, abstractmethod

# Before: Fat interface forces BasicPrinter to implement everything
class MultiFunctionDevice(ABC):
    @abstractmethod
    def print_doc(self, document):
        pass

    @abstractmethod
    def scan(self, document):
        pass

    @abstractmethod
    def fax(self, document, number):
        pass

    @abstractmethod
    def staple(self, document):
        pass

class BasicPrinter(MultiFunctionDevice):
    def print_doc(self, document):
        print(f"Printing: {document}")

    def scan(self, document):
        raise NotImplementedError("BasicPrinter cannot scan.")

    def fax(self, document, number):
        raise NotImplementedError("BasicPrinter cannot fax.")

    def staple(self, document):
        raise NotImplementedError("BasicPrinter cannot staple.")

if __name__ == "__main__":
    printer = BasicPrinter()
    printer.print_doc("report.pdf")

# TODO: Create Printable, Scannable, Faxable, and Stapleable interfaces.
# TODO: Refactor BasicPrinter to implement only Printable.
# TODO: Create an OfficePrinter that implements Printable, Scannable, and Faxable.
# TODO: Create a FullDevice that implements all four interfaces.
```

```cpp
#include <iostream>
#include <string>

using namespace std;

// Before: Fat interface forces BasicPrinter to implement everything
class MultiFunctionDevice {
public:
    virtual void print(const string& document) = 0;
    virtual void scan(const string& document) = 0;
    virtual void fax(const string& document, const string& number) = 0;
    virtual void staple(const string& document) = 0;
    virtual ~MultiFunctionDevice() = default;
};

class BasicPrinter : public MultiFunctionDevice {
public:
    void print(const string& document) override {
        cout << "Printing: " << document << endl;
    }

    void scan(const string& /*document*/) override {
        throw runtime_error("BasicPrinter cannot scan.");
    }

    void fax(const string& /*document*/, const string& /*number*/) override {
        throw runtime_error("BasicPrinter cannot fax.");
    }

    void staple(const string& /*document*/) override {
        throw runtime_error("BasicPrinter cannot staple.");
    }
};

int main() {
    BasicPrinter printer;
    printer.print("report.pdf");
    return 0;
}

// TODO: Create Printable, Scannable, Faxable, and Stapleable interfaces.
// TODO: Refactor BasicPrinter to implement only Printable.
// TODO: Create an OfficePrinter that implements Printable, Scannable, and Faxable.
// TODO: Create a FullDevice that implements all four interfaces.
```

```go
package main

import "fmt"

// Before: Fat interface forces BasicPrinter to implement everything
type MultiFunctionDevice interface {
	Print(document string)
	Scan(document string)
	Fax(document string, number string)
	Staple(document string)
}

type BasicPrinter struct{}

func (b *BasicPrinter) Print(document string) {
	fmt.Println("Printing: " + document)
}

func (b *BasicPrinter) Scan(document string) {
	// TODO: implement
	panic("BasicPrinter cannot scan.")
}

func (b *BasicPrinter) Fax(document string, number string) {
	// TODO: implement
	panic("BasicPrinter cannot fax.")
}

func (b *BasicPrinter) Staple(document string) {
	// TODO: implement
	panic("BasicPrinter cannot staple.")
}

func main() {
	printer := &BasicPrinter{}
	printer.Print("report.pdf")
}

// TODO: Create Printable, Scannable, Faxable, and Stapleable interfaces.
// TODO: Refactor BasicPrinter to implement only Printable.
// TODO: Create an OfficePrinter that implements Printable, Scannable, and Faxable.
// TODO: Create a FullDevice that implements all four interfaces.
```

```csharp
// Before: Fat interface forces BasicPrinter to implement everything
interface IMultiFunctionDevice
{
    void Print(string document);
    void Scan(string document);
    void Fax(string document, string number);
    void Staple(string document);
}

class BasicPrinter : IMultiFunctionDevice
{
    public void Print(string document)
    {
        Console.WriteLine("Printing: " + document);
    }

    public void Scan(string document)
    {
        throw new NotSupportedException("BasicPrinter cannot scan.");
    }

    public void Fax(string document, string number)
    {
        throw new NotSupportedException("BasicPrinter cannot fax.");
    }

    public void Staple(string document)
    {
        throw new NotSupportedException("BasicPrinter cannot staple.");
    }
}

class Program
{
    static void Main()
    {
        var printer = new BasicPrinter();
        printer.Print("report.pdf");
    }
}

// TODO: Create IPrintable, IScannable, IFaxable, and IStapleable interfaces.
// TODO: Refactor BasicPrinter to implement only IPrintable.
// TODO: Create an OfficePrinter that implements IPrintable, IScannable, and IFaxable.
// TODO: Create a FullDevice that implements all four interfaces.
```

```typescript
// Before: Fat interface forces BasicPrinter to implement everything
interface MultiFunctionDevice {
    print(document: string): void;
    scan(document: string): void;
    fax(document: string, number: string): void;
    staple(document: string): void;
}

class BasicPrinter implements MultiFunctionDevice {
    print(document: string): void {
        console.log(`Printing: ${document}`);
    }

    scan(document: string): void {
        throw new Error("BasicPrinter cannot scan.");
    }

    fax(document: string, number: string): void {
        throw new Error("BasicPrinter cannot fax.");
    }

    staple(document: string): void {
        throw new Error("BasicPrinter cannot staple.");
    }
}

// Usage
const printer = new BasicPrinter();
printer.print("report.pdf");

// TODO: Create Printable, Scannable, Faxable, and Stapleable interfaces.
// TODO: Refactor BasicPrinter to implement only Printable.
// TODO: Create an OfficePrinter that implements Printable, Scannable, and Faxable.
// TODO: Create a FullDevice that implements all four interfaces.
```

#### Solutions

```java
// Segregated interfaces - each with a single capability
interface Printable {
    void print(String document);
}

interface Scannable {
    void scan(String document);
}

interface Faxable {
    void fax(String document, String number);
}

interface Stapleable {
    void staple(String document);
}

// BasicPrinter only implements Printable
class BasicPrinter implements Printable {
    @Override
    public void print(String document) {
        System.out.println("BasicPrinter -> Printing: " + document);
    }
}

// OfficePrinter implements three interfaces
class OfficePrinter implements Printable, Scannable, Faxable {
    @Override
    public void print(String document) {
        System.out.println("OfficePrinter -> Printing: " + document);
    }

    @Override
    public void scan(String document) {
        System.out.println("OfficePrinter -> Scanning: " + document);
    }

    @Override
    public void fax(String document, String number) {
        System.out.println("OfficePrinter -> Faxing: " + document + " to " + number);
    }
}

// FullDevice implements all four interfaces
class FullDevice implements Printable, Scannable, Faxable, Stapleable {
    @Override
    public void print(String document) {
        System.out.println("FullDevice -> Printing: " + document);
    }

    @Override
    public void scan(String document) {
        System.out.println("FullDevice -> Scanning: " + document);
    }

    @Override
    public void fax(String document, String number) {
        System.out.println("FullDevice -> Faxing: " + document + " to " + number);
    }

    @Override
    public void staple(String document) {
        System.out.println("FullDevice -> Stapling: " + document);
    }
}

public class Main {
    public static void main(String[] args) {
        BasicPrinter basic = new BasicPrinter();
        basic.print("report.pdf");

        OfficePrinter office = new OfficePrinter();
        office.print("memo.pdf");
        office.scan("memo.pdf");
        office.fax("memo.pdf", "555-1234");

        FullDevice full = new FullDevice();
        full.print("contract.pdf");
        full.scan("contract.pdf");
        full.fax("contract.pdf", "555-5678");
        full.staple("contract.pdf");
    }
}
```

```python
from abc import ABC, abstractmethod

# Segregated interfaces - each with a single capability
class Printable(ABC):
    @abstractmethod
    def print_doc(self, document):
        pass

class Scannable(ABC):
    @abstractmethod
    def scan(self, document):
        pass

class Faxable(ABC):
    @abstractmethod
    def fax(self, document, number):
        pass

class Stapleable(ABC):
    @abstractmethod
    def staple(self, document):
        pass

# BasicPrinter only implements Printable
class BasicPrinter(Printable):
    def print_doc(self, document):
        print(f"BasicPrinter -> Printing: {document}")

# OfficePrinter implements three interfaces
class OfficePrinter(Printable, Scannable, Faxable):
    def print_doc(self, document):
        print(f"OfficePrinter -> Printing: {document}")

    def scan(self, document):
        print(f"OfficePrinter -> Scanning: {document}")

    def fax(self, document, number):
        print(f"OfficePrinter -> Faxing: {document} to {number}")

# FullDevice implements all four interfaces
class FullDevice(Printable, Scannable, Faxable, Stapleable):
    def print_doc(self, document):
        print(f"FullDevice -> Printing: {document}")

    def scan(self, document):
        print(f"FullDevice -> Scanning: {document}")

    def fax(self, document, number):
        print(f"FullDevice -> Faxing: {document} to {number}")

    def staple(self, document):
        print(f"FullDevice -> Stapling: {document}")

if __name__ == "__main__":
    basic = BasicPrinter()
    basic.print_doc("report.pdf")

    office = OfficePrinter()
    office.print_doc("memo.pdf")
    office.scan("memo.pdf")
    office.fax("memo.pdf", "555-1234")

    full = FullDevice()
    full.print_doc("contract.pdf")
    full.scan("contract.pdf")
    full.fax("contract.pdf", "555-5678")
    full.staple("contract.pdf")
```

```cpp
#include <iostream>
#include <string>

using namespace std;

// Segregated interfaces - each with a single capability
class Printable {
public:
    virtual void print(const string& document) = 0;
    virtual ~Printable() = default;
};

class Scannable {
public:
    virtual void scan(const string& document) = 0;
    virtual ~Scannable() = default;
};

class Faxable {
public:
    virtual void fax(const string& document, const string& number) = 0;
    virtual ~Faxable() = default;
};

class Stapleable {
public:
    virtual void staple(const string& document) = 0;
    virtual ~Stapleable() = default;
};

// BasicPrinter only implements Printable
class BasicPrinter : public Printable {
public:
    void print(const string& document) override {
        cout << "BasicPrinter -> Printing: " << document << endl;
    }
};

// OfficePrinter implements three interfaces
class OfficePrinter : public Printable, public Scannable, public Faxable {
public:
    void print(const string& document) override {
        cout << "OfficePrinter -> Printing: " << document << endl;
    }

    void scan(const string& document) override {
        cout << "OfficePrinter -> Scanning: " << document << endl;
    }

    void fax(const string& document, const string& number) override {
        cout << "OfficePrinter -> Faxing: " << document << " to " << number << endl;
    }
};

// FullDevice implements all four interfaces
class FullDevice : public Printable, public Scannable, public Faxable, public Stapleable {
public:
    void print(const string& document) override {
        cout << "FullDevice -> Printing: " << document << endl;
    }

    void scan(const string& document) override {
        cout << "FullDevice -> Scanning: " << document << endl;
    }

    void fax(const string& document, const string& number) override {
        cout << "FullDevice -> Faxing: " << document << " to " << number << endl;
    }

    void staple(const string& document) override {
        cout << "FullDevice -> Stapling: " << document << endl;
    }
};

int main() {
    BasicPrinter basic;
    basic.print("report.pdf");

    OfficePrinter office;
    office.print("memo.pdf");
    office.scan("memo.pdf");
    office.fax("memo.pdf", "555-1234");

    FullDevice full;
    full.print("contract.pdf");
    full.scan("contract.pdf");
    full.fax("contract.pdf", "555-5678");
    full.staple("contract.pdf");

    return 0;
}
```

```go
package main

import "fmt"

// Segregated interfaces - each with a single capability
type Printable interface {
	Print(document string)
}

type Scannable interface {
	Scan(document string)
}

type Faxable interface {
	Fax(document string, number string)
}

type Stapleable interface {
	Staple(document string)
}

// BasicPrinter only implements Printable
type BasicPrinter struct{}

func (b BasicPrinter) Print(document string) {
	fmt.Println("BasicPrinter -> Printing: " + document)
}

// OfficePrinter implements three interfaces
type OfficePrinter struct{}

func (o OfficePrinter) Print(document string) {
	fmt.Println("OfficePrinter -> Printing: " + document)
}

func (o OfficePrinter) Scan(document string) {
	fmt.Println("OfficePrinter -> Scanning: " + document)
}

func (o OfficePrinter) Fax(document string, number string) {
	fmt.Println("OfficePrinter -> Faxing: " + document + " to " + number)
}

// FullDevice implements all four interfaces
type FullDevice struct{}

func (f FullDevice) Print(document string) {
	fmt.Println("FullDevice -> Printing: " + document)
}

func (f FullDevice) Scan(document string) {
	fmt.Println("FullDevice -> Scanning: " + document)
}

func (f FullDevice) Fax(document string, number string) {
	fmt.Println("FullDevice -> Faxing: " + document + " to " + number)
}

func (f FullDevice) Staple(document string) {
	fmt.Println("FullDevice -> Stapling: " + document)
}

func main() {
	basic := BasicPrinter{}
	basic.Print("report.pdf")

	office := OfficePrinter{}
	office.Print("memo.pdf")
	office.Scan("memo.pdf")
	office.Fax("memo.pdf", "555-1234")

	full := FullDevice{}
	full.Print("contract.pdf")
	full.Scan("contract.pdf")
	full.Fax("contract.pdf", "555-5678")
	full.Staple("contract.pdf")
}
```

```csharp
using System;

// Segregated interfaces - each with a single capability
interface IPrintable
{
    void Print(string document);
}

interface IScannable
{
    void Scan(string document);
}

interface IFaxable
{
    void Fax(string document, string number);
}

interface IStapleable
{
    void Staple(string document);
}

// BasicPrinter only implements IPrintable
class BasicPrinter : IPrintable
{
    public void Print(string document)
    {
        Console.WriteLine("BasicPrinter -> Printing: " + document);
    }
}

// OfficePrinter implements three interfaces
class OfficePrinter : IPrintable, IScannable, IFaxable
{
    public void Print(string document)
    {
        Console.WriteLine("OfficePrinter -> Printing: " + document);
    }

    public void Scan(string document)
    {
        Console.WriteLine("OfficePrinter -> Scanning: " + document);
    }

    public void Fax(string document, string number)
    {
        Console.WriteLine("OfficePrinter -> Faxing: " + document + " to " + number);
    }
}

// FullDevice implements all four interfaces
class FullDevice : IPrintable, IScannable, IFaxable, IStapleable
{
    public void Print(string document)
    {
        Console.WriteLine("FullDevice -> Printing: " + document);
    }

    public void Scan(string document)
    {
        Console.WriteLine("FullDevice -> Scanning: " + document);
    }

    public void Fax(string document, string number)
    {
        Console.WriteLine("FullDevice -> Faxing: " + document + " to " + number);
    }

    public void Staple(string document)
    {
        Console.WriteLine("FullDevice -> Stapling: " + document);
    }
}

class Program
{
    static void Main()
    {
        var basic = new BasicPrinter();
        basic.Print("report.pdf");

        var office = new OfficePrinter();
        office.Print("memo.pdf");
        office.Scan("memo.pdf");
        office.Fax("memo.pdf", "555-1234");

        var full = new FullDevice();
        full.Print("contract.pdf");
        full.Scan("contract.pdf");
        full.Fax("contract.pdf", "555-5678");
        full.Staple("contract.pdf");
    }
}
```

```typescript
// Segregated interfaces - each with a single capability
interface Printable {
    print(document: string): void;
}

interface Scannable {
    scan(document: string): void;
}

interface Faxable {
    fax(document: string, number: string): void;
}

interface Stapleable {
    staple(document: string): void;
}

// BasicPrinter only implements Printable
class BasicPrinter implements Printable {
    print(document: string): void {
        console.log(`BasicPrinter -> Printing: ${document}`);
    }
}

// OfficePrinter implements three interfaces
class OfficePrinter implements Printable, Scannable, Faxable {
    print(document: string): void {
        console.log(`OfficePrinter -> Printing: ${document}`);
    }

    scan(document: string): void {
        console.log(`OfficePrinter -> Scanning: ${document}`);
    }

    fax(document: string, number: string): void {
        console.log(`OfficePrinter -> Faxing: ${document} to ${number}`);
    }
}

// FullDevice implements all four interfaces
class FullDevice implements Printable, Scannable, Faxable, Stapleable {
    print(document: string): void {
        console.log(`FullDevice -> Printing: ${document}`);
    }

    scan(document: string): void {
        console.log(`FullDevice -> Scanning: ${document}`);
    }

    fax(document: string, number: string): void {
        console.log(`FullDevice -> Faxing: ${document} to ${number}`);
    }

    staple(document: string): void {
        console.log(`FullDevice -> Stapling: ${document}`);
    }
}

// Usage
const basic = new BasicPrinter();
basic.print("report.pdf");

const office = new OfficePrinter();
office.print("memo.pdf");
office.scan("memo.pdf");
office.fax("memo.pdf", "555-1234");

const full = new FullDevice();
full.print("contract.pdf");
full.scan("contract.pdf");
full.fax("contract.pdf", "555-5678");
full.staple("contract.pdf");
```

---

# Exercise 2: Fat UserService

<!-- payload:lldCodingPracticeBlock:START {"id":"698f5ab9c689f866135ff90c","title":"Refactor UserService","difficulty":"","expectedOutput":"BasicUserService -> Creating user: Alice (alice@example.com)\nBasicUserService -> Fetching user: u123\nAdminUserService -> Creating user: Bob (bob@example.com)\nAdminUserService -> Banning user u456: spam\nAdminUserService -> Promoting user u456 to admin\nFullUserService -> Creating user: Carol (carol@example.com)\nFullUserService -> Banning user u789: abuse\nFullUserService -> Login history for u789: [2024-01-01, 2024-01-05]"} -->
**Problem:** A `UserService` interface bundles CRUD operations, admin operations (`ban`, `promote`), and audit operations (`getLoginHistory`, `getActivityLog`). Most implementations only need CRUD. Refactor into `UserCrud`, `AdminControls`, and `AuditLog` interfaces.

**Requirements:**

- Create three focused interfaces: `UserCrud` (create, get, update, delete), `AdminControls` (ban, promote), and `AuditLog` (getLoginHistory, getActivityLog)
- `BasicUserService` implements only `UserCrud`
- `AdminUserService` implements `UserCrud` and `AdminControls`
- `FullUserService` implements all three interfaces
- No class should have empty methods or throw `UnsupportedOperationException`

```java
import java.util.List;

// Before: Fat interface bundles three unrelated sets of operations
interface UserService {
    // CRUD operations
    void createUser(String name, String email);
    String getUser(String userId);
    void updateUser(String userId, String newEmail);
    void deleteUser(String userId);

    // Admin operations
    void banUser(String userId, String reason);
    void promoteUser(String userId, String role);

    // Audit operations
    List<String> getLoginHistory(String userId);
    List<String> getActivityLog(String userId);
}

class BasicUserService implements UserService {
    @Override
    public void createUser(String name, String email) {
        System.out.println("Creating user: " + name + " (" + email + ")");
    }

    @Override
    public String getUser(String userId) {
        System.out.println("Fetching user: " + userId);
        return "User-" + userId;
    }

    @Override
    public void updateUser(String userId, String newEmail) {
        System.out.println("Updating user " + userId + " email to " + newEmail);
    }

    @Override
    public void deleteUser(String userId) {
        System.out.println("Deleting user: " + userId);
    }

    // Methods this service should not need:
    @Override
    public void banUser(String userId, String reason) {
        throw new UnsupportedOperationException("Not an admin service.");
    }

    @Override
    public void promoteUser(String userId, String role) {
        throw new UnsupportedOperationException("Not an admin service.");
    }

    @Override
    public List<String> getLoginHistory(String userId) {
        throw new UnsupportedOperationException("No audit capability.");
    }

    @Override
    public List<String> getActivityLog(String userId) {
        throw new UnsupportedOperationException("No audit capability.");
    }
}

public class Main {
    public static void main(String[] args) {
        BasicUserService svc = new BasicUserService();
        svc.createUser("Alice", "alice@example.com");
        svc.getUser("u123");
    }
}

// TODO: Create UserCrud, AdminControls, and AuditLog interfaces.
// TODO: Refactor BasicUserService to implement only UserCrud.
// TODO: Create an AdminUserService that implements UserCrud and AdminControls.
// TODO: Create a FullUserService that implements all three interfaces.
```

```python
from abc import ABC, abstractmethod
from typing import List

# Before: Fat interface bundles three unrelated sets of operations
class UserService(ABC):
    @abstractmethod
    def create_user(self, name: str, email: str):
        pass

    @abstractmethod
    def get_user(self, user_id: str) -> str:
        pass

    @abstractmethod
    def update_user(self, user_id: str, new_email: str):
        pass

    @abstractmethod
    def delete_user(self, user_id: str):
        pass

    @abstractmethod
    def ban_user(self, user_id: str, reason: str):
        pass

    @abstractmethod
    def promote_user(self, user_id: str, role: str):
        pass

    @abstractmethod
    def get_login_history(self, user_id: str) -> List[str]:
        pass

    @abstractmethod
    def get_activity_log(self, user_id: str) -> List[str]:
        pass

class BasicUserService(UserService):
    def create_user(self, name, email):
        print(f"Creating user: {name} ({email})")

    def get_user(self, user_id):
        print(f"Fetching user: {user_id}")
        return f"User-{user_id}"

    def update_user(self, user_id, new_email):
        print(f"Updating user {user_id} email to {new_email}")

    def delete_user(self, user_id):
        print(f"Deleting user: {user_id}")

    def ban_user(self, user_id, reason):
        raise NotImplementedError("Not an admin service.")

    def promote_user(self, user_id, role):
        raise NotImplementedError("Not an admin service.")

    def get_login_history(self, user_id):
        raise NotImplementedError("No audit capability.")

    def get_activity_log(self, user_id):
        raise NotImplementedError("No audit capability.")

if __name__ == "__main__":
    svc = BasicUserService()
    svc.create_user("Alice", "alice@example.com")
    svc.get_user("u123")

# TODO: Create UserCrud, AdminControls, and AuditLog interfaces.
# TODO: Refactor BasicUserService to implement only UserCrud.
# TODO: Create an AdminUserService that implements UserCrud and AdminControls.
# TODO: Create a FullUserService that implements all three interfaces.
```

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

// Before: Fat interface bundles three unrelated sets of operations
class UserService {
public:
    virtual void createUser(const string& name, const string& email) = 0;
    virtual string getUser(const string& userId) = 0;
    virtual void updateUser(const string& userId, const string& newEmail) = 0;
    virtual void deleteUser(const string& userId) = 0;

    virtual void banUser(const string& userId, const string& reason) = 0;
    virtual void promoteUser(const string& userId, const string& role) = 0;

    virtual vector<string> getLoginHistory(const string& userId) = 0;
    virtual vector<string> getActivityLog(const string& userId) = 0;

    virtual ~UserService() = default;
};

class BasicUserService : public UserService {
public:
    void createUser(const string& name, const string& email) override {
        cout << "Creating user: " << name << " (" << email << ")" << endl;
    }

    string getUser(const string& userId) override {
        cout << "Fetching user: " << userId << endl;
        return "User-" + userId;
    }

    void updateUser(const string& userId, const string& newEmail) override {
        cout << "Updating user " << userId << " email to " << newEmail << endl;
    }

    void deleteUser(const string& userId) override {
        cout << "Deleting user: " << userId << endl;
    }

    void banUser(const string& /*userId*/, const string& /*reason*/) override {
        throw runtime_error("Not an admin service.");
    }

    void promoteUser(const string& /*userId*/, const string& /*role*/) override {
        throw runtime_error("Not an admin service.");
    }

    vector<string> getLoginHistory(const string& /*userId*/) override {
        throw runtime_error("No audit capability.");
    }

    vector<string> getActivityLog(const string& /*userId*/) override {
        throw runtime_error("No audit capability.");
    }
};

int main() {
    BasicUserService svc;
    svc.createUser("Alice", "alice@example.com");
    svc.getUser("u123");
    return 0;
}

// TODO: Create UserCrud, AdminControls, and AuditLog interfaces.
// TODO: Refactor BasicUserService to implement only UserCrud.
// TODO: Create an AdminUserService that implements UserCrud and AdminControls.
// TODO: Create a FullUserService that implements all three interfaces.
```

```go
package main

import "fmt"

// Before: Fat interface bundles three unrelated sets of operations
type UserService interface {
	// CRUD operations
	CreateUser(name string, email string)
	GetUser(userID string) string
	UpdateUser(userID string, newEmail string)
	DeleteUser(userID string)

	// Admin operations
	BanUser(userID string, reason string)
	PromoteUser(userID string, role string)

	// Audit operations
	GetLoginHistory(userID string) []string
	GetActivityLog(userID string) []string
}

type BasicUserService struct{}

func (b *BasicUserService) CreateUser(name string, email string) {
	// TODO: implement
	fmt.Printf("Creating user: %s (%s)\n", name, email)
}

func (b *BasicUserService) GetUser(userID string) string {
	// TODO: implement
	fmt.Printf("Fetching user: %s\n", userID)
	return "User-" + userID
}

func (b *BasicUserService) UpdateUser(userID string, newEmail string) {
	// TODO: implement
	fmt.Printf("Updating user %s email to %s\n", userID, newEmail)
}

func (b *BasicUserService) DeleteUser(userID string) {
	// TODO: implement
	fmt.Printf("Deleting user: %s\n", userID)
}

func (b *BasicUserService) BanUser(userID string, reason string) {
	// TODO: implement
	panic("Not an admin service.")
}

func (b *BasicUserService) PromoteUser(userID string, role string) {
	// TODO: implement
	panic("Not an admin service.")
}

func (b *BasicUserService) GetLoginHistory(userID string) []string {
	// TODO: implement
	panic("No audit capability.")
}

func (b *BasicUserService) GetActivityLog(userID string) []string {
	// TODO: implement
	panic("No audit capability.")
}

func main() {
	svc := &BasicUserService{}
	svc.CreateUser("Alice", "alice@example.com")
	svc.GetUser("u123")
}

// TODO: Create UserCrud, AdminControls, and AuditLog interfaces.
// TODO: Refactor BasicUserService to implement only UserCrud.
// TODO: Create an AdminUserService that implements UserCrud and AdminControls.
// TODO: Create a FullUserService that implements all three interfaces.
```

```csharp
using System;
using System.Collections.Generic;

// Before: Fat interface bundles three unrelated sets of operations
interface IUserService
{
    void CreateUser(string name, string email);
    string GetUser(string userId);
    void UpdateUser(string userId, string newEmail);
    void DeleteUser(string userId);

    void BanUser(string userId, string reason);
    void PromoteUser(string userId, string role);

    List<string> GetLoginHistory(string userId);
    List<string> GetActivityLog(string userId);
}

class BasicUserService : IUserService
{
    public void CreateUser(string name, string email)
    {
        Console.WriteLine($"Creating user: {name} ({email})");
    }

    public string GetUser(string userId)
    {
        Console.WriteLine($"Fetching user: {userId}");
        return "User-" + userId;
    }

    public void UpdateUser(string userId, string newEmail)
    {
        Console.WriteLine($"Updating user {userId} email to {newEmail}");
    }

    public void DeleteUser(string userId)
    {
        Console.WriteLine($"Deleting user: {userId}");
    }

    public void BanUser(string userId, string reason)
    {
        throw new NotSupportedException("Not an admin service.");
    }

    public void PromoteUser(string userId, string role)
    {
        throw new NotSupportedException("Not an admin service.");
    }

    public List<string> GetLoginHistory(string userId)
    {
        throw new NotSupportedException("No audit capability.");
    }

    public List<string> GetActivityLog(string userId)
    {
        throw new NotSupportedException("No audit capability.");
    }
}

class Program
{
    static void Main()
    {
        var svc = new BasicUserService();
        svc.CreateUser("Alice", "alice@example.com");
        svc.GetUser("u123");
    }
}

// TODO: Create IUserCrud, IAdminControls, and IAuditLog interfaces.
// TODO: Refactor BasicUserService to implement only IUserCrud.
// TODO: Create an AdminUserService that implements IUserCrud and IAdminControls.
// TODO: Create a FullUserService that implements all three interfaces.
```

```typescript
// Before: Fat interface bundles three unrelated sets of operations
interface UserService {
    createUser(name: string, email: string): void;
    getUser(userId: string): string;
    updateUser(userId: string, newEmail: string): void;
    deleteUser(userId: string): void;

    banUser(userId: string, reason: string): void;
    promoteUser(userId: string, role: string): void;

    getLoginHistory(userId: string): string[];
    getActivityLog(userId: string): string[];
}

class BasicUserService implements UserService {
    createUser(name: string, email: string): void {
        console.log(`Creating user: ${name} (${email})`);
    }

    getUser(userId: string): string {
        console.log(`Fetching user: ${userId}`);
        return `User-${userId}`;
    }

    updateUser(userId: string, newEmail: string): void {
        console.log(`Updating user ${userId} email to ${newEmail}`);
    }

    deleteUser(userId: string): void {
        console.log(`Deleting user: ${userId}`);
    }

    banUser(userId: string, reason: string): void {
        throw new Error("Not an admin service.");
    }

    promoteUser(userId: string, role: string): void {
        throw new Error("Not an admin service.");
    }

    getLoginHistory(userId: string): string[] {
        throw new Error("No audit capability.");
    }

    getActivityLog(userId: string): string[] {
        throw new Error("No audit capability.");
    }
}

// Usage
const svc = new BasicUserService();
svc.createUser("Alice", "alice@example.com");
svc.getUser("u123");

// TODO: Create UserCrud, AdminControls, and AuditLog interfaces.
// TODO: Refactor BasicUserService to implement only UserCrud.
// TODO: Create an AdminUserService that implements UserCrud and AdminControls.
// TODO: Create a FullUserService that implements all three interfaces.
```

#### Solutions

```java
import java.util.Arrays;
import java.util.List;

// Segregated interfaces
interface UserCrud {
    void createUser(String name, String email);
    String getUser(String userId);
    void updateUser(String userId, String newEmail);
    void deleteUser(String userId);
}

interface AdminControls {
    void banUser(String userId, String reason);
    void promoteUser(String userId, String role);
}

interface AuditLog {
    List<String> getLoginHistory(String userId);
    List<String> getActivityLog(String userId);
}

// BasicUserService implements only UserCrud
class BasicUserService implements UserCrud {
    @Override
    public void createUser(String name, String email) {
        System.out.println("BasicUserService -> Creating user: " + name + " (" + email + ")");
    }

    @Override
    public String getUser(String userId) {
        System.out.println("BasicUserService -> Fetching user: " + userId);
        return "User-" + userId;
    }

    @Override
    public void updateUser(String userId, String newEmail) {
        System.out.println("BasicUserService -> Updating user " + userId + " email to " + newEmail);
    }

    @Override
    public void deleteUser(String userId) {
        System.out.println("BasicUserService -> Deleting user: " + userId);
    }
}

// AdminUserService implements UserCrud and AdminControls
class AdminUserService implements UserCrud, AdminControls {
    @Override
    public void createUser(String name, String email) {
        System.out.println("AdminUserService -> Creating user: " + name + " (" + email + ")");
    }

    @Override
    public String getUser(String userId) {
        System.out.println("AdminUserService -> Fetching user: " + userId);
        return "User-" + userId;
    }

    @Override
    public void updateUser(String userId, String newEmail) {
        System.out.println("AdminUserService -> Updating user " + userId + " email to " + newEmail);
    }

    @Override
    public void deleteUser(String userId) {
        System.out.println("AdminUserService -> Deleting user: " + userId);
    }

    @Override
    public void banUser(String userId, String reason) {
        System.out.println("AdminUserService -> Banning user " + userId + ": " + reason);
    }

    @Override
    public void promoteUser(String userId, String role) {
        System.out.println("AdminUserService -> Promoting user " + userId + " to " + role);
    }
}

// FullUserService implements all three interfaces
class FullUserService implements UserCrud, AdminControls, AuditLog {
    @Override
    public void createUser(String name, String email) {
        System.out.println("FullUserService -> Creating user: " + name + " (" + email + ")");
    }

    @Override
    public String getUser(String userId) {
        System.out.println("FullUserService -> Fetching user: " + userId);
        return "User-" + userId;
    }

    @Override
    public void updateUser(String userId, String newEmail) {
        System.out.println("FullUserService -> Updating user " + userId + " email to " + newEmail);
    }

    @Override
    public void deleteUser(String userId) {
        System.out.println("FullUserService -> Deleting user: " + userId);
    }

    @Override
    public void banUser(String userId, String reason) {
        System.out.println("FullUserService -> Banning user " + userId + ": " + reason);
    }

    @Override
    public void promoteUser(String userId, String role) {
        System.out.println("FullUserService -> Promoting user " + userId + " to " + role);
    }

    @Override
    public List<String> getLoginHistory(String userId) {
        List<String> history = Arrays.asList("2024-01-01", "2024-01-05");
        System.out.println("FullUserService -> Login history for " + userId + ": " + history);
        return history;
    }

    @Override
    public List<String> getActivityLog(String userId) {
        List<String> log = Arrays.asList("created_post", "updated_profile");
        System.out.println("FullUserService -> Activity log for " + userId + ": " + log);
        return log;
    }
}

public class Main {
    public static void main(String[] args) {
        BasicUserService basic = new BasicUserService();
        basic.createUser("Alice", "alice@example.com");
        basic.getUser("u123");

        AdminUserService admin = new AdminUserService();
        admin.createUser("Bob", "bob@example.com");
        admin.banUser("u456", "spam");
        admin.promoteUser("u456", "admin");

        FullUserService full = new FullUserService();
        full.createUser("Carol", "carol@example.com");
        full.banUser("u789", "abuse");
        full.getLoginHistory("u789");
    }
}
```

```python
from abc import ABC, abstractmethod
from typing import List

# Segregated interfaces
class UserCrud(ABC):
    @abstractmethod
    def create_user(self, name: str, email: str):
        pass

    @abstractmethod
    def get_user(self, user_id: str) -> str:
        pass

    @abstractmethod
    def update_user(self, user_id: str, new_email: str):
        pass

    @abstractmethod
    def delete_user(self, user_id: str):
        pass

class AdminControls(ABC):
    @abstractmethod
    def ban_user(self, user_id: str, reason: str):
        pass

    @abstractmethod
    def promote_user(self, user_id: str, role: str):
        pass

class AuditLog(ABC):
    @abstractmethod
    def get_login_history(self, user_id: str) -> List[str]:
        pass

    @abstractmethod
    def get_activity_log(self, user_id: str) -> List[str]:
        pass

# BasicUserService implements only UserCrud
class BasicUserService(UserCrud):
    def create_user(self, name, email):
        print(f"BasicUserService -> Creating user: {name} ({email})")

    def get_user(self, user_id):
        print(f"BasicUserService -> Fetching user: {user_id}")
        return f"User-{user_id}"

    def update_user(self, user_id, new_email):
        print(f"BasicUserService -> Updating user {user_id} email to {new_email}")

    def delete_user(self, user_id):
        print(f"BasicUserService -> Deleting user: {user_id}")

# AdminUserService implements UserCrud and AdminControls
class AdminUserService(UserCrud, AdminControls):
    def create_user(self, name, email):
        print(f"AdminUserService -> Creating user: {name} ({email})")

    def get_user(self, user_id):
        print(f"AdminUserService -> Fetching user: {user_id}")
        return f"User-{user_id}"

    def update_user(self, user_id, new_email):
        print(f"AdminUserService -> Updating user {user_id} email to {new_email}")

    def delete_user(self, user_id):
        print(f"AdminUserService -> Deleting user: {user_id}")

    def ban_user(self, user_id, reason):
        print(f"AdminUserService -> Banning user {user_id}: {reason}")

    def promote_user(self, user_id, role):
        print(f"AdminUserService -> Promoting user {user_id} to {role}")

# FullUserService implements all three interfaces
class FullUserService(UserCrud, AdminControls, AuditLog):
    def create_user(self, name, email):
        print(f"FullUserService -> Creating user: {name} ({email})")

    def get_user(self, user_id):
        print(f"FullUserService -> Fetching user: {user_id}")
        return f"User-{user_id}"

    def update_user(self, user_id, new_email):
        print(f"FullUserService -> Updating user {user_id} email to {new_email}")

    def delete_user(self, user_id):
        print(f"FullUserService -> Deleting user: {user_id}")

    def ban_user(self, user_id, reason):
        print(f"FullUserService -> Banning user {user_id}: {reason}")

    def promote_user(self, user_id, role):
        print(f"FullUserService -> Promoting user {user_id} to {role}")

    def get_login_history(self, user_id):
        history = ["2024-01-01", "2024-01-05"]
        print(f"FullUserService -> Login history for {user_id}: [{', '.join(history)}]")
        return history

    def get_activity_log(self, user_id):
        log = ["created_post", "updated_profile"]
        print(f"FullUserService -> Activity log for {user_id}: [{', '.join(log)}]")
        return log

if __name__ == "__main__":
    basic = BasicUserService()
    basic.create_user("Alice", "alice@example.com")
    basic.get_user("u123")

    admin = AdminUserService()
    admin.create_user("Bob", "bob@example.com")
    admin.ban_user("u456", "spam")
    admin.promote_user("u456", "admin")

    full = FullUserService()
    full.create_user("Carol", "carol@example.com")
    full.ban_user("u789", "abuse")
    full.get_login_history("u789")
```

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

// Segregated interfaces
class UserCrud {
public:
    virtual void createUser(const string& name, const string& email) = 0;
    virtual string getUser(const string& userId) = 0;
    virtual void updateUser(const string& userId, const string& newEmail) = 0;
    virtual void deleteUser(const string& userId) = 0;
    virtual ~UserCrud() = default;
};

class AdminControls {
public:
    virtual void banUser(const string& userId, const string& reason) = 0;
    virtual void promoteUser(const string& userId, const string& role) = 0;
    virtual ~AdminControls() = default;
};

class AuditLog {
public:
    virtual vector<string> getLoginHistory(const string& userId) = 0;
    virtual vector<string> getActivityLog(const string& userId) = 0;
    virtual ~AuditLog() = default;
};

// BasicUserService implements only UserCrud
class BasicUserService : public UserCrud {
public:
    void createUser(const string& name, const string& email) override {
        cout << "BasicUserService -> Creating user: " << name << " (" << email << ")" << endl;
    }

    string getUser(const string& userId) override {
        cout << "BasicUserService -> Fetching user: " << userId << endl;
        return "User-" + userId;
    }

    void updateUser(const string& userId, const string& newEmail) override {
        cout << "BasicUserService -> Updating user " << userId << " email to " << newEmail << endl;
    }

    void deleteUser(const string& userId) override {
        cout << "BasicUserService -> Deleting user: " << userId << endl;
    }
};

// AdminUserService implements UserCrud and AdminControls
class AdminUserService : public UserCrud, public AdminControls {
public:
    void createUser(const string& name, const string& email) override {
        cout << "AdminUserService -> Creating user: " << name << " (" << email << ")" << endl;
    }

    string getUser(const string& userId) override {
        cout << "AdminUserService -> Fetching user: " << userId << endl;
        return "User-" + userId;
    }

    void updateUser(const string& userId, const string& newEmail) override {
        cout << "AdminUserService -> Updating user " << userId << " email to " << newEmail << endl;
    }

    void deleteUser(const string& userId) override {
        cout << "AdminUserService -> Deleting user: " << userId << endl;
    }

    void banUser(const string& userId, const string& reason) override {
        cout << "AdminUserService -> Banning user " << userId << ": " << reason << endl;
    }

    void promoteUser(const string& userId, const string& role) override {
        cout << "AdminUserService -> Promoting user " << userId << " to " << role << endl;
    }
};

// FullUserService implements all three interfaces
class FullUserService : public UserCrud, public AdminControls, public AuditLog {
public:
    void createUser(const string& name, const string& email) override {
        cout << "FullUserService -> Creating user: " << name << " (" << email << ")" << endl;
    }

    string getUser(const string& userId) override {
        cout << "FullUserService -> Fetching user: " << userId << endl;
        return "User-" + userId;
    }

    void updateUser(const string& userId, const string& newEmail) override {
        cout << "FullUserService -> Updating user " << userId << " email to " << newEmail << endl;
    }

    void deleteUser(const string& userId) override {
        cout << "FullUserService -> Deleting user: " << userId << endl;
    }

    void banUser(const string& userId, const string& reason) override {
        cout << "FullUserService -> Banning user " << userId << ": " << reason << endl;
    }

    void promoteUser(const string& userId, const string& role) override {
        cout << "FullUserService -> Promoting user " << userId << " to " << role << endl;
    }

    vector<string> getLoginHistory(const string& userId) override {
        vector<string> history = {"2024-01-01", "2024-01-05"};
        cout << "FullUserService -> Login history for " << userId << ": [2024-01-01, 2024-01-05]" << endl;
        return history;
    }

    vector<string> getActivityLog(const string& userId) override {
        vector<string> log = {"created_post", "updated_profile"};
        cout << "FullUserService -> Activity log for " << userId << ": [created_post, updated_profile]" << endl;
        return log;
    }
};

int main() {
    BasicUserService basic;
    basic.createUser("Alice", "alice@example.com");
    basic.getUser("u123");

    AdminUserService admin;
    admin.createUser("Bob", "bob@example.com");
    admin.banUser("u456", "spam");
    admin.promoteUser("u456", "admin");

    FullUserService full;
    full.createUser("Carol", "carol@example.com");
    full.banUser("u789", "abuse");
    full.getLoginHistory("u789");

    return 0;
}
```

```go
package main

import "fmt"

// Segregated interfaces
type UserCrud interface {
	CreateUser(name, email string)
	GetUser(userID string) string
	UpdateUser(userID, newEmail string)
	DeleteUser(userID string)
}

type AdminControls interface {
	BanUser(userID, reason string)
	PromoteUser(userID, role string)
}

type AuditLog interface {
	GetLoginHistory(userID string) []string
	GetActivityLog(userID string) []string
}

// BasicUserService implements only UserCrud
type BasicUserService struct{}

func (b *BasicUserService) CreateUser(name, email string) {
	fmt.Printf("BasicUserService -> Creating user: %s (%s)\n", name, email)
}

func (b *BasicUserService) GetUser(userID string) string {
	fmt.Printf("BasicUserService -> Fetching user: %s\n", userID)
	return "User-" + userID
}

func (b *BasicUserService) UpdateUser(userID, newEmail string) {
	fmt.Printf("BasicUserService -> Updating user %s email to %s\n", userID, newEmail)
}

func (b *BasicUserService) DeleteUser(userID string) {
	fmt.Printf("BasicUserService -> Deleting user: %s\n", userID)
}

// AdminUserService implements UserCrud and AdminControls
type AdminUserService struct{}

func (a *AdminUserService) CreateUser(name, email string) {
	fmt.Printf("AdminUserService -> Creating user: %s (%s)\n", name, email)
}

func (a *AdminUserService) GetUser(userID string) string {
	fmt.Printf("AdminUserService -> Fetching user: %s\n", userID)
	return "User-" + userID
}

func (a *AdminUserService) UpdateUser(userID, newEmail string) {
	fmt.Printf("AdminUserService -> Updating user %s email to %s\n", userID, newEmail)
}

func (a *AdminUserService) DeleteUser(userID string) {
	fmt.Printf("AdminUserService -> Deleting user: %s\n", userID)
}

func (a *AdminUserService) BanUser(userID, reason string) {
	fmt.Printf("AdminUserService -> Banning user %s: %s\n", userID, reason)
}

func (a *AdminUserService) PromoteUser(userID, role string) {
	fmt.Printf("AdminUserService -> Promoting user %s to %s\n", userID, role)
}

// FullUserService implements all three interfaces
type FullUserService struct{}

func (f *FullUserService) CreateUser(name, email string) {
	fmt.Printf("FullUserService -> Creating user: %s (%s)\n", name, email)
}

func (f *FullUserService) GetUser(userID string) string {
	fmt.Printf("FullUserService -> Fetching user: %s\n", userID)
	return "User-" + userID
}

func (f *FullUserService) UpdateUser(userID, newEmail string) {
	fmt.Printf("FullUserService -> Updating user %s email to %s\n", userID, newEmail)
}

func (f *FullUserService) DeleteUser(userID string) {
	fmt.Printf("FullUserService -> Deleting user: %s\n", userID)
}

func (f *FullUserService) BanUser(userID, reason string) {
	fmt.Printf("FullUserService -> Banning user %s: %s\n", userID, reason)
}

func (f *FullUserService) PromoteUser(userID, role string) {
	fmt.Printf("FullUserService -> Promoting user %s to %s\n", userID, role)
}

func (f *FullUserService) GetLoginHistory(userID string) []string {
	history := []string{"2024-01-01", "2024-01-05"}
	fmt.Printf("FullUserService -> Login history for %s: %v\n", userID, history)
	return history
}

func (f *FullUserService) GetActivityLog(userID string) []string {
	log := []string{"created_post", "updated_profile"}
	fmt.Printf("FullUserService -> Activity log for %s: %v\n", userID, log)
	return log
}

func main() {
	basic := &BasicUserService{}
	basic.CreateUser("Alice", "alice@example.com")
	basic.GetUser("u123")

	admin := &AdminUserService{}
	admin.CreateUser("Bob", "bob@example.com")
	admin.BanUser("u456", "spam")
	admin.PromoteUser("u456", "admin")

	full := &FullUserService{}
	full.CreateUser("Carol", "carol@example.com")
	full.BanUser("u789", "abuse")
	full.GetLoginHistory("u789")
}
```

```csharp
using System;
using System.Collections.Generic;

// Segregated interfaces
interface IUserCrud
{
    void CreateUser(string name, string email);
    string GetUser(string userId);
    void UpdateUser(string userId, string newEmail);
    void DeleteUser(string userId);
}

interface IAdminControls
{
    void BanUser(string userId, string reason);
    void PromoteUser(string userId, string role);
}

interface IAuditLog
{
    List<string> GetLoginHistory(string userId);
    List<string> GetActivityLog(string userId);
}

// BasicUserService implements only IUserCrud
class BasicUserService : IUserCrud
{
    public void CreateUser(string name, string email)
    {
        Console.WriteLine($"BasicUserService -> Creating user: {name} ({email})");
    }

    public string GetUser(string userId)
    {
        Console.WriteLine($"BasicUserService -> Fetching user: {userId}");
        return "User-" + userId;
    }

    public void UpdateUser(string userId, string newEmail)
    {
        Console.WriteLine($"BasicUserService -> Updating user {userId} email to {newEmail}");
    }

    public void DeleteUser(string userId)
    {
        Console.WriteLine($"BasicUserService -> Deleting user: {userId}");
    }
}

// AdminUserService implements IUserCrud and IAdminControls
class AdminUserService : IUserCrud, IAdminControls
{
    public void CreateUser(string name, string email)
    {
        Console.WriteLine($"AdminUserService -> Creating user: {name} ({email})");
    }

    public string GetUser(string userId)
    {
        Console.WriteLine($"AdminUserService -> Fetching user: {userId}");
        return "User-" + userId;
    }

    public void UpdateUser(string userId, string newEmail)
    {
        Console.WriteLine($"AdminUserService -> Updating user {userId} email to {newEmail}");
    }

    public void DeleteUser(string userId)
    {
        Console.WriteLine($"AdminUserService -> Deleting user: {userId}");
    }

    public void BanUser(string userId, string reason)
    {
        Console.WriteLine($"AdminUserService -> Banning user {userId}: {reason}");
    }

    public void PromoteUser(string userId, string role)
    {
        Console.WriteLine($"AdminUserService -> Promoting user {userId} to {role}");
    }
}

// FullUserService implements all three interfaces
class FullUserService : IUserCrud, IAdminControls, IAuditLog
{
    public void CreateUser(string name, string email)
    {
        Console.WriteLine($"FullUserService -> Creating user: {name} ({email})");
    }

    public string GetUser(string userId)
    {
        Console.WriteLine($"FullUserService -> Fetching user: {userId}");
        return "User-" + userId;
    }

    public void UpdateUser(string userId, string newEmail)
    {
        Console.WriteLine($"FullUserService -> Updating user {userId} email to {newEmail}");
    }

    public void DeleteUser(string userId)
    {
        Console.WriteLine($"FullUserService -> Deleting user: {userId}");
    }

    public void BanUser(string userId, string reason)
    {
        Console.WriteLine($"FullUserService -> Banning user {userId}: {reason}");
    }

    public void PromoteUser(string userId, string role)
    {
        Console.WriteLine($"FullUserService -> Promoting user {userId} to {role}");
    }

    public List<string> GetLoginHistory(string userId)
    {
        var history = new List<string> { "2024-01-01", "2024-01-05" };
        Console.WriteLine($"FullUserService -> Login history for {userId}: [{string.Join(", ", history)}]");
        return history;
    }

    public List<string> GetActivityLog(string userId)
    {
        var log = new List<string> { "created_post", "updated_profile" };
        Console.WriteLine($"FullUserService -> Activity log for {userId}: [{string.Join(", ", log)}]");
        return log;
    }
}

class Program
{
    static void Main()
    {
        var basic = new BasicUserService();
        basic.CreateUser("Alice", "alice@example.com");
        basic.GetUser("u123");

        var admin = new AdminUserService();
        admin.CreateUser("Bob", "bob@example.com");
        admin.BanUser("u456", "spam");
        admin.PromoteUser("u456", "admin");

        var full = new FullUserService();
        full.CreateUser("Carol", "carol@example.com");
        full.BanUser("u789", "abuse");
        full.GetLoginHistory("u789");
    }
}
```

```typescript
// Segregated interfaces
interface UserCrud {
    createUser(name: string, email: string): void;
    getUser(userId: string): string;
    updateUser(userId: string, newEmail: string): void;
    deleteUser(userId: string): void;
}

interface AdminControls {
    banUser(userId: string, reason: string): void;
    promoteUser(userId: string, role: string): void;
}

interface AuditLog {
    getLoginHistory(userId: string): string[];
    getActivityLog(userId: string): string[];
}

// BasicUserService implements only UserCrud
class BasicUserService implements UserCrud {
    createUser(name: string, email: string): void {
        console.log(`BasicUserService -> Creating user: ${name} (${email})`);
    }

    getUser(userId: string): string {
        console.log(`BasicUserService -> Fetching user: ${userId}`);
        return `User-${userId}`;
    }

    updateUser(userId: string, newEmail: string): void {
        console.log(`BasicUserService -> Updating user ${userId} email to ${newEmail}`);
    }

    deleteUser(userId: string): void {
        console.log(`BasicUserService -> Deleting user: ${userId}`);
    }
}

// AdminUserService implements UserCrud and AdminControls
class AdminUserService implements UserCrud, AdminControls {
    createUser(name: string, email: string): void {
        console.log(`AdminUserService -> Creating user: ${name} (${email})`);
    }

    getUser(userId: string): string {
        console.log(`AdminUserService -> Fetching user: ${userId}`);
        return `User-${userId}`;
    }

    updateUser(userId: string, newEmail: string): void {
        console.log(`AdminUserService -> Updating user ${userId} email to ${newEmail}`);
    }

    deleteUser(userId: string): void {
        console.log(`AdminUserService -> Deleting user: ${userId}`);
    }

    banUser(userId: string, reason: string): void {
        console.log(`AdminUserService -> Banning user ${userId}: ${reason}`);
    }

    promoteUser(userId: string, role: string): void {
        console.log(`AdminUserService -> Promoting user ${userId} to ${role}`);
    }
}

// FullUserService implements all three interfaces
class FullUserService implements UserCrud, AdminControls, AuditLog {
    createUser(name: string, email: string): void {
        console.log(`FullUserService -> Creating user: ${name} (${email})`);
    }

    getUser(userId: string): string {
        console.log(`FullUserService -> Fetching user: ${userId}`);
        return `User-${userId}`;
    }

    updateUser(userId: string, newEmail: string): void {
        console.log(`FullUserService -> Updating user ${userId} email to ${newEmail}`);
    }

    deleteUser(userId: string): void {
        console.log(`FullUserService -> Deleting user: ${userId}`);
    }

    banUser(userId: string, reason: string): void {
        console.log(`FullUserService -> Banning user ${userId}: ${reason}`);
    }

    promoteUser(userId: string, role: string): void {
        console.log(`FullUserService -> Promoting user ${userId} to ${role}`);
    }

    getLoginHistory(userId: string): string[] {
        const history = ["2024-01-01", "2024-01-05"];
        console.log(`FullUserService -> Login history for ${userId}: [${history.join(", ")}]`);
        return history;
    }

    getActivityLog(userId: string): string[] {
        const log = ["created_post", "updated_profile"];
        console.log(`FullUserService -> Activity log for ${userId}: [${log.join(", ")}]`);
        return log;
    }
}

// Usage
const basic = new BasicUserService();
basic.createUser("Alice", "alice@example.com");
basic.getUser("u123");

const admin = new AdminUserService();
admin.createUser("Bob", "bob@example.com");
admin.banUser("u456", "spam");
admin.promoteUser("u456", "admin");

const full = new FullUserService();
full.createUser("Carol", "carol@example.com");
full.banUser("u789", "abuse");
full.getLoginHistory("u789");
```


