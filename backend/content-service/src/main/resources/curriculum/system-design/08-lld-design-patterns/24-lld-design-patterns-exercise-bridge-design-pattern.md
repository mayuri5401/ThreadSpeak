---
id: "lld-design-patterns-exercise-bridge-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Bridge Design Pattern"
slug: "lld-design-patterns-exercise-bridge-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Bridge Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Bridge Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Message Formatter

**Problem:** You are building a messaging system. Messages come in different types (TextMessage, UrgentMessage) and can be sent through different channels (EmailSender, SmsSender). Use Bridge to separate message types from sending mechanisms.

**Requirements:**

- Implementor: `MessageSender` with `sendMessage(content: String)`
- ConcreteImplementors: `EmailSender` (prints "Email: ..."), `SmsSender` (prints "SMS: ...")
- Abstraction: `Message` with a reference to `MessageSender` and a method `send()`
- RefinedAbstractions: `TextMessage` (sends content as-is), `UrgentMessage` (prefixes content with "[URGENT] ")

```java
interface MessageSender {
    void sendMessage(String content);
}

class EmailSender implements MessageSender {
    @Override
    public void sendMessage(String content) {
        System.out.println("Email: " + content);
    }
}

class SmsSender implements MessageSender {
    @Override
    public void sendMessage(String content) {
        System.out.println("SMS: " + content);
    }
}

abstract class Message {
    // TODO: Add a protected field for the MessageSender reference
    // TODO: Add a protected field for the message content (String)

    public Message(MessageSender sender, String content) {
        // TODO: Store the sender and content
    }

    public abstract void send();
}

class TextMessage extends Message {
    public TextMessage(MessageSender sender, String content) {
        // TODO: Call the parent constructor
    }

    @Override
    public void send() {
        // TODO: Delegate to sender.sendMessage() with the content as-is
    }
}

class UrgentMessage extends Message {
    public UrgentMessage(MessageSender sender, String content) {
        // TODO: Call the parent constructor
    }

    @Override
    public void send() {
        // TODO: Delegate to sender.sendMessage() with "[URGENT] " prepended to the content
    }
}

public class Main {
    public static void main(String[] args) {
        // MessageSender email = new EmailSender();
        // MessageSender sms = new SmsSender();
        // Message m1 = new TextMessage(email, "Hello there");
        // Message m2 = new UrgentMessage(sms, "Server is down");
        // m1.send();
        // m2.send();
    }
}
```

```python
from abc import ABC, abstractmethod

class MessageSender(ABC):
    @abstractmethod
    def send_message(self, content: str):
        pass

class EmailSender(MessageSender):
    def send_message(self, content: str):
        print(f"Email: {content}")

class SmsSender(MessageSender):
    def send_message(self, content: str):
        print(f"SMS: {content}")

class Message(ABC):
    def __init__(self, sender: MessageSender, content: str):
        # TODO: Store the sender and content as instance variables
        pass

    @abstractmethod
    def send(self):
        pass

class TextMessage(Message):
    def __init__(self, sender: MessageSender, content: str):
        # TODO: Call the parent constructor
        pass

    def send(self):
        # TODO: Delegate to self.sender.send_message() with the content as-is
        pass

class UrgentMessage(Message):
    def __init__(self, sender: MessageSender, content: str):
        # TODO: Call the parent constructor
        pass

    def send(self):
        # TODO: Delegate to self.sender.send_message() with "[URGENT] " prepended to the content
        pass

if __name__ == "__main__":
    # email = EmailSender()
    # sms = SmsSender()
    # m1 = TextMessage(email, "Hello there")
    # m2 = UrgentMessage(sms, "Server is down")
    # m1.send()
    # m2.send()
    pass
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class MessageSender {
public:
    virtual ~MessageSender() {}
    virtual void sendMessage(const string& content) = 0;
};

class EmailSender : public MessageSender {
public:
    void sendMessage(const string& content) override {
        cout << "Email: " << content << endl;
    }
};

class SmsSender : public MessageSender {
public:
    void sendMessage(const string& content) override {
        cout << "SMS: " << content << endl;
    }
};

class Message {
protected:
    // TODO: Add a MessageSender* field
    // TODO: Add a string field for the content

public:
    Message(MessageSender* sender, const string& content) {
        // TODO: Store the sender pointer and content
    }

    virtual ~Message() {}

    virtual void send() = 0;
};

class TextMessage : public Message {
public:
    TextMessage(MessageSender* sender, const string& content) : Message(sender, content) {}

    void send() override {
        // TODO: Delegate to sender->sendMessage() with the content as-is
    }
};

class UrgentMessage : public Message {
public:
    UrgentMessage(MessageSender* sender, const string& content) : Message(sender, content) {}

    void send() override {
        // TODO: Delegate to sender->sendMessage() with "[URGENT] " prepended to the content
    }
};

int main() {
    // EmailSender email;
    // SmsSender sms;
    // TextMessage m1(&email, "Hello there");
    // UrgentMessage m2(&sms, "Server is down");
    // m1.send();
    // m2.send();
    return 0;
}
```

```go
package main

import "fmt"

type MessageSender interface {
	SendMessage(content string)
}

type EmailSender struct{}

func (e *EmailSender) SendMessage(content string) {
	fmt.Println("Email: " + content)
}

type SmsSender struct{}

func (s *SmsSender) SendMessage(content string) {
	fmt.Println("SMS: " + content)
}

type Message struct {
	// TODO: Add a protected field for the MessageSender reference
	// TODO: Add a protected field for the message content (String)
	sender  MessageSender
	content string
}

func NewMessage(sender MessageSender, content string) *Message {
	// TODO: Store the sender and content
	return &Message{
		sender:  sender,
		content: content,
	}
}

func (m *Message) Send() {
	// TODO: Implement in derived types
}

type TextMessage struct {
	Message
}

func NewTextMessage(sender MessageSender, content string) *TextMessage {
	// TODO: Call the parent constructor
	return &TextMessage{
		Message: Message{
			sender:  sender,
			content: content,
		},
	}
}

func (m *TextMessage) Send() {
	// TODO: Delegate to sender.sendMessage() with the content as-is
}

type UrgentMessage struct {
	Message
}

func NewUrgentMessage(sender MessageSender, content string) *UrgentMessage {
	// TODO: Call the parent constructor
	return &UrgentMessage{
		Message: Message{
			sender:  sender,
			content: content,
		},
	}
}

func (m *UrgentMessage) Send() {
	// TODO: Delegate to sender.sendMessage() with "[URGENT] " prepended to the content
}

func main() {
	// email := &EmailSender{}
	// sms := &SmsSender{}
	// m1 := NewTextMessage(email, "Hello there")
	// m2 := NewUrgentMessage(sms, "Server is down")
	// m1.Send()
	// m2.Send()
}
```

```csharp
using System;

interface IMessageSender
{
    void SendMessage(string content);
}

class EmailSender : IMessageSender
{
    public void SendMessage(string content)
    {
        Console.WriteLine($"Email: {content}");
    }
}

class SmsSender : IMessageSender
{
    public void SendMessage(string content)
    {
        Console.WriteLine($"SMS: {content}");
    }
}

abstract class Message
{
    // TODO: Add a protected field for the IMessageSender reference
    // TODO: Add a protected field for the content (string)

    protected Message(IMessageSender sender, string content)
    {
        // TODO: Store the sender and content
    }

    public abstract void Send();
}

class TextMessage : Message
{
    public TextMessage(IMessageSender sender, string content)
        : base(sender, content) { }

    public override void Send()
    {
        // TODO: Delegate to sender.SendMessage() with the content as-is
    }
}

class UrgentMessage : Message
{
    public UrgentMessage(IMessageSender sender, string content)
        : base(sender, content) { }

    public override void Send()
    {
        // TODO: Delegate to sender.SendMessage() with "[URGENT] " prepended to the content
    }
}

public class Program
{
    public static void Main()
    {
        // IMessageSender email = new EmailSender();
        // IMessageSender sms = new SmsSender();
        // Message m1 = new TextMessage(email, "Hello there");
        // Message m2 = new UrgentMessage(sms, "Server is down");
        // m1.Send();
        // m2.Send();
    }
}
```

```typescript
interface MessageSender {
    sendMessage(content: string): void;
}

class EmailSender implements MessageSender {
    sendMessage(content: string): void {
        console.log(`Email: ${content}`);
    }
}

class SmsSender implements MessageSender {
    sendMessage(content: string): void {
        console.log(`SMS: ${content}`);
    }
}

abstract class Message {
    // TODO: Add a protected field for the MessageSender reference
    // TODO: Add a protected field for the content (string)

    constructor(sender: MessageSender, content: string) {
        // TODO: Store the sender and content
    }

    abstract send(): void;
}

class TextMessage extends Message {
    constructor(sender: MessageSender, content: string) {
        super(sender, content);
    }

    send(): void {
        // TODO: Delegate to this.sender.sendMessage() with the content as-is
    }
}

class UrgentMessage extends Message {
    constructor(sender: MessageSender, content: string) {
        super(sender, content);
    }

    send(): void {
        // TODO: Delegate to this.sender.sendMessage() with "[URGENT] " prepended to the content
    }
}

// const email: MessageSender = new EmailSender();
// const sms: MessageSender = new SmsSender();
// const m1 = new TextMessage(email, "Hello there");
// const m2 = new UrgentMessage(sms, "Server is down");
// m1.send();
// m2.send();
```

#### Solutions

```java
interface MessageSender {
    void sendMessage(String content);
}

class EmailSender implements MessageSender {
    @Override
    public void sendMessage(String content) {
        System.out.println("Email: " + content);
    }
}

class SmsSender implements MessageSender {
    @Override
    public void sendMessage(String content) {
        System.out.println("SMS: " + content);
    }
}

abstract class Message {
    protected MessageSender sender;
    protected String content;

    public Message(MessageSender sender, String content) {
        this.sender = sender;
        this.content = content;
    }

    public abstract void send();
}

class TextMessage extends Message {
    public TextMessage(MessageSender sender, String content) {
        super(sender, content);
    }

    @Override
    public void send() {
        sender.sendMessage(content);
    }
}

class UrgentMessage extends Message {
    public UrgentMessage(MessageSender sender, String content) {
        super(sender, content);
    }

    @Override
    public void send() {
        sender.sendMessage("[URGENT] " + content);
    }
}

public class Main {
    public static void main(String[] args) {
        MessageSender email = new EmailSender();
        MessageSender sms = new SmsSender();
        Message m1 = new TextMessage(email, "Hello there");
        Message m2 = new UrgentMessage(sms, "Server is down");
        m1.send();
        m2.send();
    }
}
```

```python
from abc import ABC, abstractmethod

class MessageSender(ABC):
    @abstractmethod
    def send_message(self, content: str):
        pass

class EmailSender(MessageSender):
    def send_message(self, content: str):
        print(f"Email: {content}")

class SmsSender(MessageSender):
    def send_message(self, content: str):
        print(f"SMS: {content}")

class Message(ABC):
    def __init__(self, sender: MessageSender, content: str):
        self.sender = sender
        self.content = content

    @abstractmethod
    def send(self):
        pass

class TextMessage(Message):
    def __init__(self, sender: MessageSender, content: str):
        super().__init__(sender, content)

    def send(self):
        self.sender.send_message(self.content)

class UrgentMessage(Message):
    def __init__(self, sender: MessageSender, content: str):
        super().__init__(sender, content)

    def send(self):
        self.sender.send_message("[URGENT] " + self.content)

if __name__ == "__main__":
    email = EmailSender()
    sms = SmsSender()
    m1 = TextMessage(email, "Hello there")
    m2 = UrgentMessage(sms, "Server is down")
    m1.send()
    m2.send()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class MessageSender {
public:
    virtual ~MessageSender() {}
    virtual void sendMessage(const string& content) = 0;
};

class EmailSender : public MessageSender {
public:
    void sendMessage(const string& content) override {
        cout << "Email: " << content << endl;
    }
};

class SmsSender : public MessageSender {
public:
    void sendMessage(const string& content) override {
        cout << "SMS: " << content << endl;
    }
};

class Message {
protected:
    MessageSender* sender;
    string content;

public:
    Message(MessageSender* sender, const string& content)
        : sender(sender), content(content) {}

    virtual ~Message() {}

    virtual void send() = 0;
};

class TextMessage : public Message {
public:
    TextMessage(MessageSender* sender, const string& content)
        : Message(sender, content) {}

    void send() override {
        sender->sendMessage(content);
    }
};

class UrgentMessage : public Message {
public:
    UrgentMessage(MessageSender* sender, const string& content)
        : Message(sender, content) {}

    void send() override {
        sender->sendMessage("[URGENT] " + content);
    }
};

int main() {
    EmailSender email;
    SmsSender sms;
    TextMessage m1(&email, "Hello there");
    UrgentMessage m2(&sms, "Server is down");
    m1.send();
    m2.send();
    return 0;
}
```

```go
package main

import "fmt"

type MessageSender interface {
	SendMessage(content string)
}

type EmailSender struct{}

func (e EmailSender) SendMessage(content string) {
	fmt.Println("Email:", content)
}

type SmsSender struct{}

func (s SmsSender) SendMessage(content string) {
	fmt.Println("SMS:", content)
}

type Message interface {
	Send()
}

type baseMessage struct {
	sender  MessageSender
	content string
}

type TextMessage struct {
	baseMessage
}

func NewTextMessage(sender MessageSender, content string) *TextMessage {
	return &TextMessage{baseMessage{sender: sender, content: content}}
}

func (m *TextMessage) Send() {
	m.sender.SendMessage(m.content)
}

type UrgentMessage struct {
	baseMessage
}

func NewUrgentMessage(sender MessageSender, content string) *UrgentMessage {
	return &UrgentMessage{baseMessage{sender: sender, content: content}}
}

func (m *UrgentMessage) Send() {
	m.sender.SendMessage("[URGENT] " + m.content)
}

func main() {
	var email MessageSender = EmailSender{}
	var sms MessageSender = SmsSender{}

	var m1 Message = NewTextMessage(email, "Hello there")
	var m2 Message = NewUrgentMessage(sms, "Server is down")

	m1.Send()
	m2.Send()
}
```

```csharp
using System;

interface IMessageSender
{
    void SendMessage(string content);
}

class EmailSender : IMessageSender
{
    public void SendMessage(string content)
    {
        Console.WriteLine($"Email: {content}");
    }
}

class SmsSender : IMessageSender
{
    public void SendMessage(string content)
    {
        Console.WriteLine($"SMS: {content}");
    }
}

abstract class Message
{
    protected IMessageSender sender;
    protected string content;

    protected Message(IMessageSender sender, string content)
    {
        this.sender = sender;
        this.content = content;
    }

    public abstract void Send();
}

class TextMessage : Message
{
    public TextMessage(IMessageSender sender, string content)
        : base(sender, content) { }

    public override void Send()
    {
        sender.SendMessage(content);
    }
}

class UrgentMessage : Message
{
    public UrgentMessage(IMessageSender sender, string content)
        : base(sender, content) { }

    public override void Send()
    {
        sender.SendMessage("[URGENT] " + content);
    }
}

public class Program
{
    public static void Main()
    {
        IMessageSender email = new EmailSender();
        IMessageSender sms = new SmsSender();
        Message m1 = new TextMessage(email, "Hello there");
        Message m2 = new UrgentMessage(sms, "Server is down");
        m1.Send();
        m2.Send();
    }
}
```

```typescript
interface MessageSender {
    sendMessage(content: string): void;
}

class EmailSender implements MessageSender {
    sendMessage(content: string): void {
        console.log(`Email: ${content}`);
    }
}

class SmsSender implements MessageSender {
    sendMessage(content: string): void {
        console.log(`SMS: ${content}`);
    }
}

abstract class Message {
    protected sender: MessageSender;
    protected content: string;

    constructor(sender: MessageSender, content: string) {
        this.sender = sender;
        this.content = content;
    }

    abstract send(): void;
}

class TextMessage extends Message {
    constructor(sender: MessageSender, content: string) {
        super(sender, content);
    }

    send(): void {
        this.sender.sendMessage(this.content);
    }
}

class UrgentMessage extends Message {
    constructor(sender: MessageSender, content: string) {
        super(sender, content);
    }

    send(): void {
        this.sender.sendMessage("[URGENT] " + this.content);
    }
}

const email: MessageSender = new EmailSender();
const sms: MessageSender = new SmsSender();
const m1 = new TextMessage(email, "Hello there");
const m2 = new UrgentMessage(sms, "Server is down");
m1.send();
m2.send();
```

---

# Exercise 2: Database Abstraction Layer

> [!PAYWALL] This content is for premium members only.

**Problem:** Design a data access layer using Bridge. The abstraction side represents repository types (UserRepository, OrderRepository), and the implementation side represents database drivers (PostgresDriver, MongoDriver). Repositories define high-level data operations, drivers define low-level database calls.

**Requirements:**

- Implementor: `DatabaseDriver` with `connect()`, `execute(query: String): String`, `close()`
- ConcreteImplementors: `PostgresDriver`, `MongoDriver`
- Abstraction: `Repository` with a reference to `DatabaseDriver`
- RefinedAbstractions: `UserRepository` with `findById(id)` and `save(name, email)`, `OrderRepository` with `findByUserId(userId)` and `createOrder(userId, product, amount)`

```java
interface DatabaseDriver {
    void connect();
    String execute(String query);
    void close();
}

class PostgresDriver implements DatabaseDriver {
    @Override
    public void connect() {
        System.out.println("PostgreSQL: Connected");
    }

    @Override
    public String execute(String query) {
        System.out.println("PostgreSQL: Executing: " + query);
        return "pg_result";
    }

    @Override
    public void close() {
        System.out.println("PostgreSQL: Connection closed");
    }
}

class MongoDriver implements DatabaseDriver {
    @Override
    public void connect() {
        // TODO: Print "MongoDB: Connected"
    }

    @Override
    public String execute(String query) {
        // TODO: Print "MongoDB: Executing: " + query
        // TODO: Return "mongo_result"
        return "";
    }

    @Override
    public void close() {
        // TODO: Print "MongoDB: Connection closed"
    }
}

abstract class Repository {
    // TODO: Add a protected field for the DatabaseDriver reference

    public Repository(DatabaseDriver driver) {
        // TODO: Store the driver
    }
}

class UserRepository extends Repository {
    public UserRepository(DatabaseDriver driver) {
        super(driver);
    }

    public void findById(int id) {
        // TODO: Call driver.connect()
        // TODO: Call driver.execute() with query "SELECT * FROM users WHERE id = {id}"
        // TODO: Call driver.close()
    }

    public void save(String name, String email) {
        // TODO: Call driver.connect()
        // TODO: Call driver.execute() with query "INSERT INTO users (name, email) VALUES ('{name}', '{email}')"
        // TODO: Call driver.close()
    }
}

class OrderRepository extends Repository {
    public OrderRepository(DatabaseDriver driver) {
        super(driver);
    }

    public void findByUserId(int userId) {
        // TODO: Call driver.connect()
        // TODO: Call driver.execute() with query "SELECT * FROM orders WHERE user_id = {userId}"
        // TODO: Call driver.close()
    }

    public void createOrder(int userId, String product, double amount) {
        // TODO: Call driver.connect()
        // TODO: Call driver.execute() with query "INSERT INTO orders (user_id, product, amount) VALUES ({userId}, '{product}', {amount})"
        // TODO: Call driver.close()
    }
}

public class Main {
    public static void main(String[] args) {
        // DatabaseDriver pg = new PostgresDriver();
        // UserRepository userRepo = new UserRepository(pg);
        // userRepo.findById(42);
        // userRepo.save("Alice", "alice@example.com");
    }
}
```

```python
from abc import ABC, abstractmethod

class DatabaseDriver(ABC):
    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def execute(self, query: str) -> str:
        pass

    @abstractmethod
    def close(self):
        pass

class PostgresDriver(DatabaseDriver):
    def connect(self):
        print("PostgreSQL: Connected")

    def execute(self, query: str) -> str:
        print(f"PostgreSQL: Executing: {query}")
        return "pg_result"

    def close(self):
        print("PostgreSQL: Connection closed")

class MongoDriver(DatabaseDriver):
    def connect(self):
        # TODO: Print "MongoDB: Connected"
        pass

    def execute(self, query: str) -> str:
        # TODO: Print "MongoDB: Executing: {query}"
        # TODO: Return "mongo_result"
        return ""

    def close(self):
        # TODO: Print "MongoDB: Connection closed"
        pass

class Repository(ABC):
    def __init__(self, driver: DatabaseDriver):
        # TODO: Store the driver as an instance variable
        pass

class UserRepository(Repository):
    def __init__(self, driver: DatabaseDriver):
        # TODO: Call the parent constructor
        pass

    def find_by_id(self, user_id: int):
        # TODO: Call self.driver.connect()
        # TODO: Call self.driver.execute() with query "SELECT * FROM users WHERE id = {user_id}"
        # TODO: Call self.driver.close()
        pass

    def save(self, name: str, email: str):
        # TODO: Call self.driver.connect()
        # TODO: Call self.driver.execute() with query "INSERT INTO users (name, email) VALUES ('{name}', '{email}')"
        # TODO: Call self.driver.close()
        pass

class OrderRepository(Repository):
    def __init__(self, driver: DatabaseDriver):
        # TODO: Call the parent constructor
        pass

    def find_by_user_id(self, user_id: int):
        # TODO: Call self.driver.connect()
        # TODO: Call self.driver.execute() with query "SELECT * FROM orders WHERE user_id = {user_id}"
        # TODO: Call self.driver.close()
        pass

    def create_order(self, user_id: int, product: str, amount: float):
        # TODO: Call self.driver.connect()
        # TODO: Call self.driver.execute() with query "INSERT INTO orders (user_id, product, amount) VALUES ({user_id}, '{product}', {amount})"
        # TODO: Call self.driver.close()
        pass

if __name__ == "__main__":
    # pg = PostgresDriver()
    # user_repo = UserRepository(pg)
    # user_repo.find_by_id(42)
    # user_repo.save("Alice", "alice@example.com")
    pass
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class DatabaseDriver {
public:
    virtual ~DatabaseDriver() {}
    virtual void connect() = 0;
    virtual string execute(const string& query) = 0;
    virtual void close() = 0;
};

class PostgresDriver : public DatabaseDriver {
public:
    void connect() override {
        cout << "PostgreSQL: Connected" << endl;
    }

    string execute(const string& query) override {
        cout << "PostgreSQL: Executing: " << query << endl;
        return "pg_result";
    }

    void close() override {
        cout << "PostgreSQL: Connection closed" << endl;
    }
};

class MongoDriver : public DatabaseDriver {
public:
    void connect() override {
        // TODO: Print "MongoDB: Connected"
    }

    string execute(const string& query) override {
        // TODO: Print "MongoDB: Executing: " << query
        // TODO: Return "mongo_result"
        return "";
    }

    void close() override {
        // TODO: Print "MongoDB: Connection closed"
    }
};

class Repository {
protected:
    // TODO: Add a DatabaseDriver* field

public:
    Repository(DatabaseDriver* driver) {
        // TODO: Store the driver pointer
    }

    virtual ~Repository() {}
};

class UserRepository : public Repository {
public:
    UserRepository(DatabaseDriver* driver) : Repository(driver) {}

    void findById(int id) {
        // TODO: Call driver->connect()
        // TODO: Call driver->execute() with query "SELECT * FROM users WHERE id = " + to_string(id)
        // TODO: Call driver->close()
    }

    void save(const string& name, const string& email) {
        // TODO: Call driver->connect()
        // TODO: Call driver->execute() with query "INSERT INTO users (name, email) VALUES ('{name}', '{email}')"
        // TODO: Call driver->close()
    }
};

class OrderRepository : public Repository {
public:
    OrderRepository(DatabaseDriver* driver) : Repository(driver) {}

    void findByUserId(int userId) {
        // TODO: Call driver->connect()
        // TODO: Call driver->execute() with query "SELECT * FROM orders WHERE user_id = " + to_string(userId)
        // TODO: Call driver->close()
    }

    void createOrder(int userId, const string& product, double amount) {
        // TODO: Call driver->connect()
        // TODO: Call driver->execute() with query "INSERT INTO orders (user_id, product, amount) VALUES ({userId}, '{product}', {amount})"
        // TODO: Call driver->close()
    }
};

int main() {
    // PostgresDriver pg;
    // UserRepository userRepo(&pg);
    // userRepo.findById(42);
    // userRepo.save("Alice", "alice@example.com");
    return 0;
}
```

```go
package main

type DatabaseDriver interface {
	connect()
	execute(query string) string
	close()
}

type PostgresDriver struct{}

func (p *PostgresDriver) connect() {
	println("PostgreSQL: Connected")
}

func (p *PostgresDriver) execute(query string) string {
	println("PostgreSQL: Executing: " + query)
	return "pg_result"
}

func (p *PostgresDriver) close() {
	println("PostgreSQL: Connection closed")
}

type MongoDriver struct{}

func (m *MongoDriver) connect() {
	// TODO: Print "MongoDB: Connected"
}

func (m *MongoDriver) execute(query string) string {
	// TODO: Print "MongoDB: Executing: " + query
	// TODO: Return "mongo_result"
	return ""
}

func (m *MongoDriver) close() {
	// TODO: Print "MongoDB: Connection closed"
}

type Repository struct {
	// TODO: Add a protected field for the DatabaseDriver reference
	driver DatabaseDriver
}

func NewRepository(driver DatabaseDriver) *Repository {
	// TODO: Store the driver
	return &Repository{}
}

type UserRepository struct {
	Repository
}

func NewUserRepository(driver DatabaseDriver) *UserRepository {
	return &UserRepository{
		Repository: Repository{},
	}
}

func (u *UserRepository) findById(id int) {
	// TODO: Call driver.connect()
	// TODO: Call driver.execute() with query "SELECT * FROM users WHERE id = {id}"
	// TODO: Call driver.close()
}

func (u *UserRepository) save(name string, email string) {
	// TODO: Call driver.connect()
	// TODO: Call driver.execute() with query "INSERT INTO users (name, email) VALUES ('{name}', '{email}')"
	// TODO: Call driver.close()
}

type OrderRepository struct {
	Repository
}

func NewOrderRepository(driver DatabaseDriver) *OrderRepository {
	return &OrderRepository{
		Repository: Repository{},
	}
}

func (o *OrderRepository) findByUserId(userId int) {
	// TODO: Call driver.connect()
	// TODO: Call driver.execute() with query "SELECT * FROM orders WHERE user_id = {userId}"
	// TODO: Call driver.close()
}

func (o *OrderRepository) createOrder(userId int, product string, amount float64) {
	// TODO: Call driver.connect()
	// TODO: Call driver.execute() with query "INSERT INTO orders (user_id, product, amount) VALUES ({userId}, '{product}', {amount})"
	// TODO: Call driver.close()
}

func main() {
	// pg := &PostgresDriver{}
	// userRepo := NewUserRepository(pg)
	// userRepo.findById(42)
	// userRepo.save("Alice", "alice@example.com")
}
```

```csharp
using System;

interface IDatabaseDriver
{
    void Connect();
    string Execute(string query);
    void Close();
}

class PostgresDriver : IDatabaseDriver
{
    public void Connect() => Console.WriteLine("PostgreSQL: Connected");

    public string Execute(string query)
    {
        Console.WriteLine($"PostgreSQL: Executing: {query}");
        return "pg_result";
    }

    public void Close() => Console.WriteLine("PostgreSQL: Connection closed");
}

class MongoDriver : IDatabaseDriver
{
    public void Connect()
    {
        // TODO: Print "MongoDB: Connected"
    }

    public string Execute(string query)
    {
        // TODO: Print "MongoDB: Executing: {query}"
        // TODO: Return "mongo_result"
        return "";
    }

    public void Close()
    {
        // TODO: Print "MongoDB: Connection closed"
    }
}

abstract class Repository
{
    // TODO: Add a protected field for the IDatabaseDriver reference

    protected Repository(IDatabaseDriver driver)
    {
        // TODO: Store the driver
    }
}

class UserRepository : Repository
{
    public UserRepository(IDatabaseDriver driver) : base(driver) { }

    public void FindById(int id)
    {
        // TODO: Call driver.Connect()
        // TODO: Call driver.Execute() with query "SELECT * FROM users WHERE id = {id}"
        // TODO: Call driver.Close()
    }

    public void Save(string name, string email)
    {
        // TODO: Call driver.Connect()
        // TODO: Call driver.Execute() with query "INSERT INTO users (name, email) VALUES ('{name}', '{email}')"
        // TODO: Call driver.Close()
    }
}

class OrderRepository : Repository
{
    public OrderRepository(IDatabaseDriver driver) : base(driver) { }

    public void FindByUserId(int userId)
    {
        // TODO: Call driver.Connect()
        // TODO: Call driver.Execute() with query "SELECT * FROM orders WHERE user_id = {userId}"
        // TODO: Call driver.Close()
    }

    public void CreateOrder(int userId, string product, double amount)
    {
        // TODO: Call driver.Connect()
        // TODO: Call driver.Execute() with query "INSERT INTO orders (user_id, product, amount) VALUES ({userId}, '{product}', {amount})"
        // TODO: Call driver.Close()
    }
}

public class Program
{
    public static void Main()
    {
        // IDatabaseDriver pg = new PostgresDriver();
        // var userRepo = new UserRepository(pg);
        // userRepo.FindById(42);
        // userRepo.Save("Alice", "alice@example.com");
    }
}
```

```typescript
interface DatabaseDriver {
    connect(): void;
    execute(query: string): string;
    close(): void;
}

class PostgresDriver implements DatabaseDriver {
    connect(): void {
        console.log("PostgreSQL: Connected");
    }

    execute(query: string): string {
        console.log(`PostgreSQL: Executing: ${query}`);
        return "pg_result";
    }

    close(): void {
        console.log("PostgreSQL: Connection closed");
    }
}

class MongoDriver implements DatabaseDriver {
    connect(): void {
        // TODO: Log "MongoDB: Connected"
    }

    execute(query: string): string {
        // TODO: Log "MongoDB: Executing: {query}"
        // TODO: Return "mongo_result"
        return "";
    }

    close(): void {
        // TODO: Log "MongoDB: Connection closed"
    }
}

abstract class Repository {
    // TODO: Add a protected field for the DatabaseDriver reference

    constructor(driver: DatabaseDriver) {
        // TODO: Store the driver
    }
}

class UserRepository extends Repository {
    constructor(driver: DatabaseDriver) {
        super(driver);
    }

    findById(id: number): void {
        // TODO: Call this.driver.connect()
        // TODO: Call this.driver.execute() with query "SELECT * FROM users WHERE id = {id}"
        // TODO: Call this.driver.close()
    }

    save(name: string, email: string): void {
        // TODO: Call this.driver.connect()
        // TODO: Call this.driver.execute() with query "INSERT INTO users (name, email) VALUES ('{name}', '{email}')"
        // TODO: Call this.driver.close()
    }
}

class OrderRepository extends Repository {
    constructor(driver: DatabaseDriver) {
        super(driver);
    }

    findByUserId(userId: number): void {
        // TODO: Call this.driver.connect()
        // TODO: Call this.driver.execute() with query "SELECT * FROM orders WHERE user_id = {userId}"
        // TODO: Call this.driver.close()
    }

    createOrder(userId: number, product: string, amount: number): void {
        // TODO: Call this.driver.connect()
        // TODO: Call this.driver.execute() with query "INSERT INTO orders (user_id, product, amount) VALUES ({userId}, '{product}', {amount})"
        // TODO: Call this.driver.close()
    }
}

// const pg: DatabaseDriver = new PostgresDriver();
// const userRepo = new UserRepository(pg);
// userRepo.findById(42);
// userRepo.save("Alice", "alice@example.com");
```

#### Solutions

```java
interface DatabaseDriver {
    void connect();
    String execute(String query);
    void close();
}

class PostgresDriver implements DatabaseDriver {
    @Override
    public void connect() {
        System.out.println("PostgreSQL: Connected");
    }

    @Override
    public String execute(String query) {
        System.out.println("PostgreSQL: Executing: " + query);
        return "pg_result";
    }

    @Override
    public void close() {
        System.out.println("PostgreSQL: Connection closed");
    }
}

class MongoDriver implements DatabaseDriver {
    @Override
    public void connect() {
        System.out.println("MongoDB: Connected");
    }

    @Override
    public String execute(String query) {
        System.out.println("MongoDB: Executing: " + query);
        return "mongo_result";
    }

    @Override
    public void close() {
        System.out.println("MongoDB: Connection closed");
    }
}

abstract class Repository {
    protected DatabaseDriver driver;

    public Repository(DatabaseDriver driver) {
        this.driver = driver;
    }
}

class UserRepository extends Repository {
    public UserRepository(DatabaseDriver driver) {
        super(driver);
    }

    public void findById(int id) {
        driver.connect();
        driver.execute("SELECT * FROM users WHERE id = " + id);
        driver.close();
    }

    public void save(String name, String email) {
        driver.connect();
        driver.execute("INSERT INTO users (name, email) VALUES ('" + name + "', '" + email + "')");
        driver.close();
    }
}

class OrderRepository extends Repository {
    public OrderRepository(DatabaseDriver driver) {
        super(driver);
    }

    public void findByUserId(int userId) {
        driver.connect();
        driver.execute("SELECT * FROM orders WHERE user_id = " + userId);
        driver.close();
    }

    public void createOrder(int userId, String product, double amount) {
        driver.connect();
        driver.execute("INSERT INTO orders (user_id, product, amount) VALUES (" + userId + ", '" + product + "', " + amount + ")");
        driver.close();
    }
}

public class Main {
    public static void main(String[] args) {
        DatabaseDriver pg = new PostgresDriver();
        UserRepository userRepo = new UserRepository(pg);
        userRepo.findById(42);
        userRepo.save("Alice", "alice@example.com");
    }
}
```

```python
from abc import ABC, abstractmethod

class DatabaseDriver(ABC):
    @abstractmethod
    def connect(self):
        pass

    @abstractmethod
    def execute(self, query: str) -> str:
        pass

    @abstractmethod
    def close(self):
        pass

class PostgresDriver(DatabaseDriver):
    def connect(self):
        print("PostgreSQL: Connected")

    def execute(self, query: str) -> str:
        print(f"PostgreSQL: Executing: {query}")
        return "pg_result"

    def close(self):
        print("PostgreSQL: Connection closed")

class MongoDriver(DatabaseDriver):
    def connect(self):
        print("MongoDB: Connected")

    def execute(self, query: str) -> str:
        print(f"MongoDB: Executing: {query}")
        return "mongo_result"

    def close(self):
        print("MongoDB: Connection closed")

class Repository(ABC):
    def __init__(self, driver: DatabaseDriver):
        self.driver = driver

class UserRepository(Repository):
    def __init__(self, driver: DatabaseDriver):
        super().__init__(driver)

    def find_by_id(self, user_id: int):
        self.driver.connect()
        self.driver.execute(f"SELECT * FROM users WHERE id = {user_id}")
        self.driver.close()

    def save(self, name: str, email: str):
        self.driver.connect()
        self.driver.execute(f"INSERT INTO users (name, email) VALUES ('{name}', '{email}')")
        self.driver.close()

class OrderRepository(Repository):
    def __init__(self, driver: DatabaseDriver):
        super().__init__(driver)

    def find_by_user_id(self, user_id: int):
        self.driver.connect()
        self.driver.execute(f"SELECT * FROM orders WHERE user_id = {user_id}")
        self.driver.close()

    def create_order(self, user_id: int, product: str, amount: float):
        self.driver.connect()
        self.driver.execute(f"INSERT INTO orders (user_id, product, amount) VALUES ({user_id}, '{product}', {amount})")
        self.driver.close()

if __name__ == "__main__":
    pg = PostgresDriver()
    user_repo = UserRepository(pg)
    user_repo.find_by_id(42)
    user_repo.save("Alice", "alice@example.com")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class DatabaseDriver {
public:
    virtual ~DatabaseDriver() {}
    virtual void connect() = 0;
    virtual string execute(const string& query) = 0;
    virtual void close() = 0;
};

class PostgresDriver : public DatabaseDriver {
public:
    void connect() override {
        cout << "PostgreSQL: Connected" << endl;
    }

    string execute(const string& query) override {
        cout << "PostgreSQL: Executing: " << query << endl;
        return "pg_result";
    }

    void close() override {
        cout << "PostgreSQL: Connection closed" << endl;
    }
};

class MongoDriver : public DatabaseDriver {
public:
    void connect() override {
        cout << "MongoDB: Connected" << endl;
    }

    string execute(const string& query) override {
        cout << "MongoDB: Executing: " << query << endl;
        return "mongo_result";
    }

    void close() override {
        cout << "MongoDB: Connection closed" << endl;
    }
};

class Repository {
protected:
    DatabaseDriver* driver;

public:
    Repository(DatabaseDriver* driver) : driver(driver) {}

    virtual ~Repository() {}
};

class UserRepository : public Repository {
public:
    UserRepository(DatabaseDriver* driver) : Repository(driver) {}

    void findById(int id) {
        driver->connect();
        driver->execute("SELECT * FROM users WHERE id = " + to_string(id));
        driver->close();
    }

    void save(const string& name, const string& email) {
        driver->connect();
        driver->execute("INSERT INTO users (name, email) VALUES ('" + name + "', '" + email + "')");
        driver->close();
    }
};

class OrderRepository : public Repository {
public:
    OrderRepository(DatabaseDriver* driver) : Repository(driver) {}

    void findByUserId(int userId) {
        driver->connect();
        driver->execute("SELECT * FROM orders WHERE user_id = " + to_string(userId));
        driver->close();
    }

    void createOrder(int userId, const string& product, double amount) {
        driver->connect();
        driver->execute("INSERT INTO orders (user_id, product, amount) VALUES (" + to_string(userId) + ", '" + product + "', " + to_string(amount) + ")");
        driver->close();
    }
};

int main() {
    PostgresDriver pg;
    UserRepository userRepo(&pg);
    userRepo.findById(42);
    userRepo.save("Alice", "alice@example.com");
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strconv"
)

type DatabaseDriver interface {
	Connect()
	Execute(query string) string
	Close()
}

type PostgresDriver struct{}

func (p *PostgresDriver) Connect() {
	fmt.Println("PostgreSQL: Connected")
}

func (p *PostgresDriver) Execute(query string) string {
	fmt.Printf("PostgreSQL: Executing: %s\n", query)
	return "pg_result"
}

func (p *PostgresDriver) Close() {
	fmt.Println("PostgreSQL: Connection closed")
}

type MongoDriver struct{}

func (m *MongoDriver) Connect() {
	fmt.Println("MongoDB: Connected")
}

func (m *MongoDriver) Execute(query string) string {
	fmt.Printf("MongoDB: Executing: %s\n", query)
	return "mongo_result"
}

func (m *MongoDriver) Close() {
	fmt.Println("MongoDB: Connection closed")
}

type Repository struct {
	driver DatabaseDriver
}

func NewRepository(driver DatabaseDriver) *Repository {
	return &Repository{driver: driver}
}

type UserRepository struct {
	*Repository
}

func NewUserRepository(driver DatabaseDriver) *UserRepository {
	return &UserRepository{Repository: NewRepository(driver)}
}

func (u *UserRepository) FindByID(id int) {
	u.driver.Connect()
	u.driver.Execute("SELECT * FROM users WHERE id = " + strconv.Itoa(id))
	u.driver.Close()
}

func (u *UserRepository) Save(name, email string) {
	u.driver.Connect()
	u.driver.Execute("INSERT INTO users (name, email) VALUES ('" + name + "', '" + email + "')")
	u.driver.Close()
}

type OrderRepository struct {
	*Repository
}

func NewOrderRepository(driver DatabaseDriver) *OrderRepository {
	return &OrderRepository{Repository: NewRepository(driver)}
}

func (o *OrderRepository) FindByUserID(userID int) {
	o.driver.Connect()
	o.driver.Execute("SELECT * FROM orders WHERE user_id = " + strconv.Itoa(userID))
	o.driver.Close()
}

func (o *OrderRepository) CreateOrder(userID int, product string, amount float64) {
	o.driver.Connect()
	o.driver.Execute("INSERT INTO orders (user_id, product, amount) VALUES (" + strconv.Itoa(userID) + ", '" + product + "', " + strconv.FormatFloat(amount, 'f', -1, 64) + ")")
	o.driver.Close()
}

func main() {
	var pg DatabaseDriver = &PostgresDriver{}
	userRepo := NewUserRepository(pg)
	userRepo.FindByID(42)
	userRepo.Save("Alice", "alice@example.com")
}
```

```csharp
using System;

interface IDatabaseDriver
{
    void Connect();
    string Execute(string query);
    void Close();
}

class PostgresDriver : IDatabaseDriver
{
    public void Connect() => Console.WriteLine("PostgreSQL: Connected");

    public string Execute(string query)
    {
        Console.WriteLine($"PostgreSQL: Executing: {query}");
        return "pg_result";
    }

    public void Close() => Console.WriteLine("PostgreSQL: Connection closed");
}

class MongoDriver : IDatabaseDriver
{
    public void Connect()
    {
        Console.WriteLine("MongoDB: Connected");
    }

    public string Execute(string query)
    {
        Console.WriteLine($"MongoDB: Executing: {query}");
        return "mongo_result";
    }

    public void Close()
    {
        Console.WriteLine("MongoDB: Connection closed");
    }
}

abstract class Repository
{
    protected IDatabaseDriver driver;

    protected Repository(IDatabaseDriver driver)
    {
        this.driver = driver;
    }
}

class UserRepository : Repository
{
    public UserRepository(IDatabaseDriver driver) : base(driver) { }

    public void FindById(int id)
    {
        driver.Connect();
        driver.Execute($"SELECT * FROM users WHERE id = {id}");
        driver.Close();
    }

    public void Save(string name, string email)
    {
        driver.Connect();
        driver.Execute($"INSERT INTO users (name, email) VALUES ('{name}', '{email}')");
        driver.Close();
    }
}

class OrderRepository : Repository
{
    public OrderRepository(IDatabaseDriver driver) : base(driver) { }

    public void FindByUserId(int userId)
    {
        driver.Connect();
        driver.Execute($"SELECT * FROM orders WHERE user_id = {userId}");
        driver.Close();
    }

    public void CreateOrder(int userId, string product, double amount)
    {
        driver.Connect();
        driver.Execute($"INSERT INTO orders (user_id, product, amount) VALUES ({userId}, '{product}', {amount})");
        driver.Close();
    }
}

public class Program
{
    public static void Main()
    {
        IDatabaseDriver pg = new PostgresDriver();
        var userRepo = new UserRepository(pg);
        userRepo.FindById(42);
        userRepo.Save("Alice", "alice@example.com");
    }
}
```

```typescript
interface DatabaseDriver {
    connect(): void;
    execute(query: string): string;
    close(): void;
}

class PostgresDriver implements DatabaseDriver {
    connect(): void {
        console.log("PostgreSQL: Connected");
    }

    execute(query: string): string {
        console.log(`PostgreSQL: Executing: ${query}`);
        return "pg_result";
    }

    close(): void {
        console.log("PostgreSQL: Connection closed");
    }
}

class MongoDriver implements DatabaseDriver {
    connect(): void {
        console.log("MongoDB: Connected");
    }

    execute(query: string): string {
        console.log(`MongoDB: Executing: ${query}`);
        return "mongo_result";
    }

    close(): void {
        console.log("MongoDB: Connection closed");
    }
}

abstract class Repository {
    protected driver: DatabaseDriver;

    constructor(driver: DatabaseDriver) {
        this.driver = driver;
    }
}

class UserRepository extends Repository {
    constructor(driver: DatabaseDriver) {
        super(driver);
    }

    findById(id: number): void {
        this.driver.connect();
        this.driver.execute(`SELECT * FROM users WHERE id = ${id}`);
        this.driver.close();
    }

    save(name: string, email: string): void {
        this.driver.connect();
        this.driver.execute(`INSERT INTO users (name, email) VALUES ('${name}', '${email}')`);
        this.driver.close();
    }
}

class OrderRepository extends Repository {
    constructor(driver: DatabaseDriver) {
        super(driver);
    }

    findByUserId(userId: number): void {
        this.driver.connect();
        this.driver.execute(`SELECT * FROM orders WHERE user_id = ${userId}`);
        this.driver.close();
    }

    createOrder(userId: number, product: string, amount: number): void {
        this.driver.connect();
        this.driver.execute(`INSERT INTO orders (user_id, product, amount) VALUES (${userId}, '${product}', ${amount})`);
        this.driver.close();
    }
}

const pg: DatabaseDriver = new PostgresDriver();
const userRepo = new UserRepository(pg);
userRepo.findById(42);
userRepo.save("Alice", "alice@example.com");
```

---

# Exercise 3: Theme Engine

**Problem:** Build a UI component system where widgets (Button, TextField, Checkbox) can be rendered with different themes (DarkTheme, LightTheme). The widget knows its content and behavior, the theme knows colors and styles.

**Requirements:**

- Implementor: `Theme` with `applyButtonStyle(label: String)`, `applyTextFieldStyle(placeholder: String)`, `applyCheckboxStyle(label: String, checked: boolean)`
- ConcreteImplementors: `DarkTheme` (dark background, light text), `LightTheme` (light background, dark text)
- Abstraction: `Widget` with a reference to `Theme` and a method `render()`
- RefinedAbstractions: `Button` (label), `TextField` (placeholder), `Checkbox` (label, checked state)

```java
interface Theme {
    void applyButtonStyle(String label);
    void applyTextFieldStyle(String placeholder);
    void applyCheckboxStyle(String label, boolean checked);
}

class DarkTheme implements Theme {
    @Override
    public void applyButtonStyle(String label) {
        // TODO: Print '[Dark] Button: "{label}" | bg=#1a1a2e, text=#ffffff'
    }

    @Override
    public void applyTextFieldStyle(String placeholder) {
        // TODO: Print '[Dark] TextField: "{placeholder}" | bg=#1a1a2e, text=#ffffff'
    }

    @Override
    public void applyCheckboxStyle(String label, boolean checked) {
        // TODO: Set mark to "x" if checked, " " if not
        // TODO: Print '[Dark] Checkbox: "{label}" [{mark}] | bg=#1a1a2e, text=#ffffff'
    }
}

class LightTheme implements Theme {
    @Override
    public void applyButtonStyle(String label) {
        // TODO: Print '[Light] Button: "{label}" | bg=#ffffff, text=#1a1a2e'
    }

    @Override
    public void applyTextFieldStyle(String placeholder) {
        // TODO: Print '[Light] TextField: "{placeholder}" | bg=#ffffff, text=#1a1a2e'
    }

    @Override
    public void applyCheckboxStyle(String label, boolean checked) {
        // TODO: Set mark to "x" if checked, " " if not
        // TODO: Print '[Light] Checkbox: "{label}" [{mark}] | bg=#ffffff, text=#1a1a2e'
    }
}

abstract class Widget {
    // TODO: Add a protected field for the Theme reference

    public Widget(Theme theme) {
        // TODO: Store the theme
    }

    public abstract void render();
}

class Button extends Widget {
    // TODO: Add a private field for the label (String)

    public Button(Theme theme, String label) {
        super(theme);
        // TODO: Store the label
    }

    @Override
    public void render() {
        // TODO: Delegate to theme.applyButtonStyle(label)
    }
}

class TextField extends Widget {
    // TODO: Add a private field for the placeholder (String)

    public TextField(Theme theme, String placeholder) {
        super(theme);
        // TODO: Store the placeholder
    }

    @Override
    public void render() {
        // TODO: Delegate to theme.applyTextFieldStyle(placeholder)
    }
}

class Checkbox extends Widget {
    // TODO: Add a private field for the label (String)
    // TODO: Add a private field for the checked state (boolean)

    public Checkbox(Theme theme, String label, boolean checked) {
        super(theme);
        // TODO: Store label and checked
    }

    @Override
    public void render() {
        // TODO: Delegate to theme.applyCheckboxStyle(label, checked)
    }
}

public class Main {
    public static void main(String[] args) {
        // Theme dark = new DarkTheme();
        // Theme light = new LightTheme();
        // Widget btn = new Button(dark, "Submit");
        // Widget txt = new TextField(light, "Enter name...");
        // Widget chk = new Checkbox(dark, "Remember me", true);
        // btn.render();
        // txt.render();
        // chk.render();
    }
}
```

```python
from abc import ABC, abstractmethod

class Theme(ABC):
    @abstractmethod
    def apply_button_style(self, label: str):
        pass

    @abstractmethod
    def apply_text_field_style(self, placeholder: str):
        pass

    @abstractmethod
    def apply_checkbox_style(self, label: str, checked: bool):
        pass

class DarkTheme(Theme):
    def apply_button_style(self, label: str):
        # TODO: Print '[Dark] Button: "{label}" | bg=#1a1a2e, text=#ffffff'
        pass

    def apply_text_field_style(self, placeholder: str):
        # TODO: Print '[Dark] TextField: "{placeholder}" | bg=#1a1a2e, text=#ffffff'
        pass

    def apply_checkbox_style(self, label: str, checked: bool):
        # TODO: Set mark to "x" if checked, " " if not
        # TODO: Print '[Dark] Checkbox: "{label}" [{mark}] | bg=#1a1a2e, text=#ffffff'
        pass

class LightTheme(Theme):
    def apply_button_style(self, label: str):
        # TODO: Print '[Light] Button: "{label}" | bg=#ffffff, text=#1a1a2e'
        pass

    def apply_text_field_style(self, placeholder: str):
        # TODO: Print '[Light] TextField: "{placeholder}" | bg=#ffffff, text=#1a1a2e'
        pass

    def apply_checkbox_style(self, label: str, checked: bool):
        # TODO: Set mark to "x" if checked, " " if not
        # TODO: Print '[Light] Checkbox: "{label}" [{mark}] | bg=#ffffff, text=#1a1a2e'
        pass

class Widget(ABC):
    def __init__(self, theme: Theme):
        # TODO: Store the theme as an instance variable
        pass

    @abstractmethod
    def render(self):
        pass

class Button(Widget):
    def __init__(self, theme: Theme, label: str):
        # TODO: Call the parent constructor and store the label
        pass

    def render(self):
        # TODO: Delegate to self.theme.apply_button_style(self.label)
        pass

class TextField(Widget):
    def __init__(self, theme: Theme, placeholder: str):
        # TODO: Call the parent constructor and store the placeholder
        pass

    def render(self):
        # TODO: Delegate to self.theme.apply_text_field_style(self.placeholder)
        pass

class Checkbox(Widget):
    def __init__(self, theme: Theme, label: str, checked: bool):
        # TODO: Call the parent constructor and store label and checked
        pass

    def render(self):
        # TODO: Delegate to self.theme.apply_checkbox_style(self.label, self.checked)
        pass

if __name__ == "__main__":
    # dark = DarkTheme()
    # light = LightTheme()
    # btn = Button(dark, "Submit")
    # txt = TextField(light, "Enter name...")
    # chk = Checkbox(dark, "Remember me", True)
    # btn.render()
    # txt.render()
    # chk.render()
    pass
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Theme {
public:
    virtual ~Theme() {}
    virtual void applyButtonStyle(const string& label) = 0;
    virtual void applyTextFieldStyle(const string& placeholder) = 0;
    virtual void applyCheckboxStyle(const string& label, bool checked) = 0;
};

class DarkTheme : public Theme {
public:
    void applyButtonStyle(const string& label) override {
        // TODO: Print '[Dark] Button: "{label}" | bg=#1a1a2e, text=#ffffff'
    }

    void applyTextFieldStyle(const string& placeholder) override {
        // TODO: Print '[Dark] TextField: "{placeholder}" | bg=#1a1a2e, text=#ffffff'
    }

    void applyCheckboxStyle(const string& label, bool checked) override {
        // TODO: Set mark to "x" if checked, " " if not
        // TODO: Print '[Dark] Checkbox: "{label}" [{mark}] | bg=#1a1a2e, text=#ffffff'
    }
};

class LightTheme : public Theme {
public:
    void applyButtonStyle(const string& label) override {
        // TODO: Print '[Light] Button: "{label}" | bg=#ffffff, text=#1a1a2e'
    }

    void applyTextFieldStyle(const string& placeholder) override {
        // TODO: Print '[Light] TextField: "{placeholder}" | bg=#ffffff, text=#1a1a2e'
    }

    void applyCheckboxStyle(const string& label, bool checked) override {
        // TODO: Set mark to "x" if checked, " " if not
        // TODO: Print '[Light] Checkbox: "{label}" [{mark}] | bg=#ffffff, text=#1a1a2e'
    }
};

class Widget {
protected:
    // TODO: Add a Theme* field

public:
    Widget(Theme* theme) {
        // TODO: Store the theme pointer
    }

    virtual ~Widget() {}

    virtual void render() = 0;
};

class Button : public Widget {
    // TODO: Add a string field for the label

public:
    Button(Theme* theme, const string& label) : Widget(theme) {
        // TODO: Store the label
    }

    void render() override {
        // TODO: Delegate to theme->applyButtonStyle(label)
    }
};

class TextField : public Widget {
    // TODO: Add a string field for the placeholder

public:
    TextField(Theme* theme, const string& placeholder) : Widget(theme) {
        // TODO: Store the placeholder
    }

    void render() override {
        // TODO: Delegate to theme->applyTextFieldStyle(placeholder)
    }
};

class Checkbox : public Widget {
    // TODO: Add a string field for the label
    // TODO: Add a bool field for the checked state

public:
    Checkbox(Theme* theme, const string& label, bool checked) : Widget(theme) {
        // TODO: Store label and checked
    }

    void render() override {
        // TODO: Delegate to theme->applyCheckboxStyle(label, checked)
    }
};

int main() {
    // DarkTheme dark;
    // LightTheme light;
    // Button btn(&dark, "Submit");
    // TextField txt(&light, "Enter name...");
    // Checkbox chk(&dark, "Remember me", true);
    // btn.render();
    // txt.render();
    // chk.render();
    return 0;
}
```

```go
package main

type Theme interface {
	applyButtonStyle(label string)
	applyTextFieldStyle(placeholder string)
	applyCheckboxStyle(label string, checked bool)
}

type DarkTheme struct{}

func (d *DarkTheme) applyButtonStyle(label string) {
	// TODO: Print '[Dark] Button: "{label}" | bg=#1a1a2e, text=#ffffff'
}

func (d *DarkTheme) applyTextFieldStyle(placeholder string) {
	// TODO: Print '[Dark] TextField: "{placeholder}" | bg=#1a1a2e, text=#ffffff'
}

func (d *DarkTheme) applyCheckboxStyle(label string, checked bool) {
	// TODO: Set mark to "x" if checked, " " if not
	// TODO: Print '[Dark] Checkbox: "{label}" [{mark}] | bg=#1a1a2e, text=#ffffff'
}

type LightTheme struct{}

func (l *LightTheme) applyButtonStyle(label string) {
	// TODO: Print '[Light] Button: "{label}" | bg=#ffffff, text=#1a1a2e'
}

func (l *LightTheme) applyTextFieldStyle(placeholder string) {
	// TODO: Print '[Light] TextField: "{placeholder}" | bg=#ffffff, text=#1a1a2e'
}

func (l *LightTheme) applyCheckboxStyle(label string, checked bool) {
	// TODO: Set mark to "x" if checked, " " if not
	// TODO: Print '[Light] Checkbox: "{label}" [{mark}] | bg=#ffffff, text=#1a1a2e'
}

type Widget struct {
	// TODO: Add a protected field for the Theme reference
	theme Theme
}

func NewWidget(theme Theme) *Widget {
	// TODO: Store the theme
	return &Widget{theme: theme}
}

func (w *Widget) render() {
	// TODO: Implement in derived types
}

type Button struct {
	Widget
	// TODO: Add a private field for the label (string)
	label string
}

func NewButton(theme Theme, label string) *Button {
	w := NewWidget(theme)
	// TODO: Store the label
	return &Button{Widget: *w, label: label}
}

func (b *Button) render() {
	// TODO: Delegate to theme.applyButtonStyle(label)
}

type TextField struct {
	Widget
	// TODO: Add a private field for the placeholder (string)
	placeholder string
}

func NewTextField(theme Theme, placeholder string) *TextField {
	w := NewWidget(theme)
	// TODO: Store the placeholder
	return &TextField{Widget: *w, placeholder: placeholder}
}

func (t *TextField) render() {
	// TODO: Delegate to theme.applyTextFieldStyle(placeholder)
}

type Checkbox struct {
	Widget
	// TODO: Add a private field for the label (string)
	// TODO: Add a private field for the checked state (boolean)
	label   string
	checked bool
}

func NewCheckbox(theme Theme, label string, checked bool) *Checkbox {
	w := NewWidget(theme)
	// TODO: Store label and checked
	return &Checkbox{Widget: *w, label: label, checked: checked}
}

func (c *Checkbox) render() {
	// TODO: Delegate to theme.applyCheckboxStyle(label, checked)
}

func main() {
	// dark := &DarkTheme{}
	// light := &LightTheme{}
	// btn := NewButton(dark, "Submit")
	// txt := NewTextField(light, "Enter name...")
	// chk := NewCheckbox(dark, "Remember me", true)
	// btn.render()
	// txt.render()
	// chk.render()
}
```

```csharp
using System;

interface ITheme
{
    void ApplyButtonStyle(string label);
    void ApplyTextFieldStyle(string placeholder);
    void ApplyCheckboxStyle(string label, bool isChecked);
}

class DarkTheme : ITheme
{
    public void ApplyButtonStyle(string label)
    {
        // TODO: Print '[Dark] Button: "{label}" | bg=#1a1a2e, text=#ffffff'
    }

    public void ApplyTextFieldStyle(string placeholder)
    {
        // TODO: Print '[Dark] TextField: "{placeholder}" | bg=#1a1a2e, text=#ffffff'
    }

    public void ApplyCheckboxStyle(string label, bool isChecked)
    {
        // TODO: Set mark to "x" if isChecked, " " if not
        // TODO: Print '[Dark] Checkbox: "{label}" [{mark}] | bg=#1a1a2e, text=#ffffff'
    }
}

class LightTheme : ITheme
{
    public void ApplyButtonStyle(string label)
    {
        // TODO: Print '[Light] Button: "{label}" | bg=#ffffff, text=#1a1a2e'
    }

    public void ApplyTextFieldStyle(string placeholder)
    {
        // TODO: Print '[Light] TextField: "{placeholder}" | bg=#ffffff, text=#1a1a2e'
    }

    public void ApplyCheckboxStyle(string label, bool isChecked)
    {
        // TODO: Set mark to "x" if isChecked, " " if not
        // TODO: Print '[Light] Checkbox: "{label}" [{mark}] | bg=#ffffff, text=#1a1a2e'
    }
}

abstract class Widget
{
    // TODO: Add a protected field for the ITheme reference

    protected Widget(ITheme theme)
    {
        // TODO: Store the theme
    }

    public abstract void Render();
}

class Button : Widget
{
    // TODO: Add a private field for the label (string)

    public Button(ITheme theme, string label) : base(theme)
    {
        // TODO: Store the label
    }

    public override void Render()
    {
        // TODO: Delegate to theme.ApplyButtonStyle(label)
    }
}

class TextField : Widget
{
    // TODO: Add a private field for the placeholder (string)

    public TextField(ITheme theme, string placeholder) : base(theme)
    {
        // TODO: Store the placeholder
    }

    public override void Render()
    {
        // TODO: Delegate to theme.ApplyTextFieldStyle(placeholder)
    }
}

class Checkbox : Widget
{
    // TODO: Add a private field for the label (string)
    // TODO: Add a private field for the isChecked state (bool)

    public Checkbox(ITheme theme, string label, bool isChecked) : base(theme)
    {
        // TODO: Store label and isChecked
    }

    public override void Render()
    {
        // TODO: Delegate to theme.ApplyCheckboxStyle(label, isChecked)
    }
}

public class Program
{
    public static void Main()
    {
        // ITheme dark = new DarkTheme();
        // ITheme light = new LightTheme();
        // Widget btn = new Button(dark, "Submit");
        // Widget txt = new TextField(light, "Enter name...");
        // Widget chk = new Checkbox(dark, "Remember me", true);
        // btn.Render();
        // txt.Render();
        // chk.Render();
    }
}
```

```typescript
interface Theme {
    applyButtonStyle(label: string): void;
    applyTextFieldStyle(placeholder: string): void;
    applyCheckboxStyle(label: string, checked: boolean): void;
}

class DarkTheme implements Theme {
    applyButtonStyle(label: string): void {
        // TODO: Log '[Dark] Button: "{label}" | bg=#1a1a2e, text=#ffffff'
    }

    applyTextFieldStyle(placeholder: string): void {
        // TODO: Log '[Dark] TextField: "{placeholder}" | bg=#1a1a2e, text=#ffffff'
    }

    applyCheckboxStyle(label: string, checked: boolean): void {
        // TODO: Set mark to "x" if checked, " " if not
        // TODO: Log '[Dark] Checkbox: "{label}" [{mark}] | bg=#1a1a2e, text=#ffffff'
    }
}

class LightTheme implements Theme {
    applyButtonStyle(label: string): void {
        // TODO: Log '[Light] Button: "{label}" | bg=#ffffff, text=#1a1a2e'
    }

    applyTextFieldStyle(placeholder: string): void {
        // TODO: Log '[Light] TextField: "{placeholder}" | bg=#ffffff, text=#1a1a2e'
    }

    applyCheckboxStyle(label: string, checked: boolean): void {
        // TODO: Set mark to "x" if checked, " " if not
        // TODO: Log '[Light] Checkbox: "{label}" [{mark}] | bg=#ffffff, text=#1a1a2e'
    }
}

abstract class Widget {
    // TODO: Add a protected field for the Theme reference

    constructor(theme: Theme) {
        // TODO: Store the theme
    }

    abstract render(): void;
}

class Button extends Widget {
    // TODO: Add a private field for the label (string)

    constructor(theme: Theme, label: string) {
        super(theme);
        // TODO: Store the label
    }

    render(): void {
        // TODO: Delegate to this.theme.applyButtonStyle(this.label)
    }
}

class TextField extends Widget {
    // TODO: Add a private field for the placeholder (string)

    constructor(theme: Theme, placeholder: string) {
        super(theme);
        // TODO: Store the placeholder
    }

    render(): void {
        // TODO: Delegate to this.theme.applyTextFieldStyle(this.placeholder)
    }
}

class Checkbox extends Widget {
    // TODO: Add a private field for the label (string)
    // TODO: Add a private field for the checked state (boolean)

    constructor(theme: Theme, label: string, checked: boolean) {
        super(theme);
        // TODO: Store label and checked
    }

    render(): void {
        // TODO: Delegate to this.theme.applyCheckboxStyle(this.label, this.checked)
    }
}

// const dark: Theme = new DarkTheme();
// const light: Theme = new LightTheme();
// const btn = new Button(dark, "Submit");
// const txt = new TextField(light, "Enter name...");
// const chk = new Checkbox(dark, "Remember me", true);
// btn.render();
// txt.render();
// chk.render();
```

#### Solutions

```java
interface Theme {
    void applyButtonStyle(String label);
    void applyTextFieldStyle(String placeholder);
    void applyCheckboxStyle(String label, boolean checked);
}

class DarkTheme implements Theme {
    @Override
    public void applyButtonStyle(String label) {
        System.out.println("[Dark] Button: \"" + label + "\" | bg=#1a1a2e, text=#ffffff");
    }

    @Override
    public void applyTextFieldStyle(String placeholder) {
        System.out.println("[Dark] TextField: \"" + placeholder + "\" | bg=#1a1a2e, text=#ffffff");
    }

    @Override
    public void applyCheckboxStyle(String label, boolean checked) {
        String mark = checked " "x" : " ";
        System.out.println("[Dark] Checkbox: \"" + label + "\" [" + mark + "] | bg=#1a1a2e, text=#ffffff");
    }
}

class LightTheme implements Theme {
    @Override
    public void applyButtonStyle(String label) {
        System.out.println("[Light] Button: \"" + label + "\" | bg=#ffffff, text=#1a1a2e");
    }

    @Override
    public void applyTextFieldStyle(String placeholder) {
        System.out.println("[Light] TextField: \"" + placeholder + "\" | bg=#ffffff, text=#1a1a2e");
    }

    @Override
    public void applyCheckboxStyle(String label, boolean checked) {
        String mark = checked " "x" : " ";
        System.out.println("[Light] Checkbox: \"" + label + "\" [" + mark + "] | bg=#ffffff, text=#1a1a2e");
    }
}

abstract class Widget {
    protected Theme theme;

    public Widget(Theme theme) {
        this.theme = theme;
    }

    public abstract void render();
}

class Button extends Widget {
    private String label;

    public Button(Theme theme, String label) {
        super(theme);
        this.label = label;
    }

    @Override
    public void render() {
        theme.applyButtonStyle(label);
    }
}

class TextField extends Widget {
    private String placeholder;

    public TextField(Theme theme, String placeholder) {
        super(theme);
        this.placeholder = placeholder;
    }

    @Override
    public void render() {
        theme.applyTextFieldStyle(placeholder);
    }
}

class Checkbox extends Widget {
    private String label;
    private boolean checked;

    public Checkbox(Theme theme, String label, boolean checked) {
        super(theme);
        this.label = label;
        this.checked = checked;
    }

    @Override
    public void render() {
        theme.applyCheckboxStyle(label, checked);
    }
}

public class Main {
    public static void main(String[] args) {
        Theme dark = new DarkTheme();
        Theme light = new LightTheme();
        Widget btn = new Button(dark, "Submit");
        Widget txt = new TextField(light, "Enter name...");
        Widget chk = new Checkbox(dark, "Remember me", true);
        btn.render();
        txt.render();
        chk.render();
    }
}
```

```python
from abc import ABC, abstractmethod

class Theme(ABC):
    @abstractmethod
    def apply_button_style(self, label: str):
        pass

    @abstractmethod
    def apply_text_field_style(self, placeholder: str):
        pass

    @abstractmethod
    def apply_checkbox_style(self, label: str, checked: bool):
        pass

class DarkTheme(Theme):
    def apply_button_style(self, label: str):
        print(f'[Dark] Button: "{label}" | bg=#1a1a2e, text=#ffffff')

    def apply_text_field_style(self, placeholder: str):
        print(f'[Dark] TextField: "{placeholder}" | bg=#1a1a2e, text=#ffffff')

    def apply_checkbox_style(self, label: str, checked: bool):
        mark = "x" if checked else " "
        print(f'[Dark] Checkbox: "{label}" [{mark}] | bg=#1a1a2e, text=#ffffff')

class LightTheme(Theme):
    def apply_button_style(self, label: str):
        print(f'[Light] Button: "{label}" | bg=#ffffff, text=#1a1a2e')

    def apply_text_field_style(self, placeholder: str):
        print(f'[Light] TextField: "{placeholder}" | bg=#ffffff, text=#1a1a2e')

    def apply_checkbox_style(self, label: str, checked: bool):
        mark = "x" if checked else " "
        print(f'[Light] Checkbox: "{label}" [{mark}] | bg=#ffffff, text=#1a1a2e')

class Widget(ABC):
    def __init__(self, theme: Theme):
        self.theme = theme

    @abstractmethod
    def render(self):
        pass

class Button(Widget):
    def __init__(self, theme: Theme, label: str):
        super().__init__(theme)
        self.label = label

    def render(self):
        self.theme.apply_button_style(self.label)

class TextField(Widget):
    def __init__(self, theme: Theme, placeholder: str):
        super().__init__(theme)
        self.placeholder = placeholder

    def render(self):
        self.theme.apply_text_field_style(self.placeholder)

class Checkbox(Widget):
    def __init__(self, theme: Theme, label: str, checked: bool):
        super().__init__(theme)
        self.label = label
        self.checked = checked

    def render(self):
        self.theme.apply_checkbox_style(self.label, self.checked)

if __name__ == "__main__":
    dark = DarkTheme()
    light = LightTheme()
    btn = Button(dark, "Submit")
    txt = TextField(light, "Enter name...")
    chk = Checkbox(dark, "Remember me", True)
    btn.render()
    txt.render()
    chk.render()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Theme {
public:
    virtual ~Theme() {}
    virtual void applyButtonStyle(const string& label) = 0;
    virtual void applyTextFieldStyle(const string& placeholder) = 0;
    virtual void applyCheckboxStyle(const string& label, bool checked) = 0;
};

class DarkTheme : public Theme {
public:
    void applyButtonStyle(const string& label) override {
        cout << "[Dark] Button: \"" << label << "\" | bg=#1a1a2e, text=#ffffff" << endl;
    }

    void applyTextFieldStyle(const string& placeholder) override {
        cout << "[Dark] TextField: \"" << placeholder << "\" | bg=#1a1a2e, text=#ffffff" << endl;
    }

    void applyCheckboxStyle(const string& label, bool checked) override {
        string mark = checked " "x" : " ";
        cout << "[Dark] Checkbox: \"" << label << "\" [" << mark << "] | bg=#1a1a2e, text=#ffffff" << endl;
    }
};

class LightTheme : public Theme {
public:
    void applyButtonStyle(const string& label) override {
        cout << "[Light] Button: \"" << label << "\" | bg=#ffffff, text=#1a1a2e" << endl;
    }

    void applyTextFieldStyle(const string& placeholder) override {
        cout << "[Light] TextField: \"" << placeholder << "\" | bg=#ffffff, text=#1a1a2e" << endl;
    }

    void applyCheckboxStyle(const string& label, bool checked) override {
        string mark = checked " "x" : " ";
        cout << "[Light] Checkbox: \"" << label << "\" [" << mark << "] | bg=#ffffff, text=#1a1a2e" << endl;
    }
};

class Widget {
protected:
    Theme* theme;

public:
    Widget(Theme* theme) : theme(theme) {}

    virtual ~Widget() {}

    virtual void render() = 0;
};

class Button : public Widget {
    string label;

public:
    Button(Theme* theme, const string& label)
        : Widget(theme), label(label) {}

    void render() override {
        theme->applyButtonStyle(label);
    }
};

class TextField : public Widget {
    string placeholder;

public:
    TextField(Theme* theme, const string& placeholder)
        : Widget(theme), placeholder(placeholder) {}

    void render() override {
        theme->applyTextFieldStyle(placeholder);
    }
};

class Checkbox : public Widget {
    string label;
    bool checked;

public:
    Checkbox(Theme* theme, const string& label, bool checked)
        : Widget(theme), label(label), checked(checked) {}

    void render() override {
        theme->applyCheckboxStyle(label, checked);
    }
};

int main() {
    DarkTheme dark;
    LightTheme light;
    Button btn(&dark, "Submit");
    TextField txt(&light, "Enter name...");
    Checkbox chk(&dark, "Remember me", true);
    btn.render();
    txt.render();
    chk.render();
    return 0;
}
```

```go
package main

import "fmt"

type Theme interface {
	ApplyButtonStyle(label string)
	ApplyTextFieldStyle(placeholder string)
	ApplyCheckboxStyle(label string, checked bool)
}

type DarkTheme struct{}

func (d DarkTheme) ApplyButtonStyle(label string) {
	fmt.Printf("[Dark] Button: %q | bg=#1a1a2e, text=#ffffff\n", label)
}

func (d DarkTheme) ApplyTextFieldStyle(placeholder string) {
	fmt.Printf("[Dark] TextField: %q | bg=#1a1a2e, text=#ffffff\n", placeholder)
}

func (d DarkTheme) ApplyCheckboxStyle(label string, checked bool) {
	mark := " "
	if checked {
		mark = "x"
	}
	fmt.Printf("[Dark] Checkbox: %q [%s] | bg=#1a1a2e, text=#ffffff\n", label, mark)
}

type LightTheme struct{}

func (l LightTheme) ApplyButtonStyle(label string) {
	fmt.Printf("[Light] Button: %q | bg=#ffffff, text=#1a1a2e\n", label)
}

func (l LightTheme) ApplyTextFieldStyle(placeholder string) {
	fmt.Printf("[Light] TextField: %q | bg=#ffffff, text=#1a1a2e\n", placeholder)
}

func (l LightTheme) ApplyCheckboxStyle(label string, checked bool) {
	mark := " "
	if checked {
		mark = "x"
	}
	fmt.Printf("[Light] Checkbox: %q [%s] | bg=#ffffff, text=#1a1a2e\n", label, mark)
}

type Widget interface {
	Render()
}

type BaseWidget struct {
	theme Theme
}

func NewBaseWidget(theme Theme) BaseWidget {
	return BaseWidget{theme: theme}
}

type Button struct {
	BaseWidget
	label string
}

func NewButton(theme Theme, label string) *Button {
	return &Button{
		BaseWidget: NewBaseWidget(theme),
		label:      label,
	}
}

func (b *Button) Render() {
	b.theme.ApplyButtonStyle(b.label)
}

type TextField struct {
	BaseWidget
	placeholder string
}

func NewTextField(theme Theme, placeholder string) *TextField {
	return &TextField{
		BaseWidget:  NewBaseWidget(theme),
		placeholder: placeholder,
	}
}

func (t *TextField) Render() {
	t.theme.ApplyTextFieldStyle(t.placeholder)
}

type Checkbox struct {
	BaseWidget
	label   string
	checked bool
}

func NewCheckbox(theme Theme, label string, checked bool) *Checkbox {
	return &Checkbox{
		BaseWidget: NewBaseWidget(theme),
		label:      label,
		checked:    checked,
	}
}

func (c *Checkbox) Render() {
	c.theme.ApplyCheckboxStyle(c.label, c.checked)
}

func main() {
	var dark Theme = DarkTheme{}
	var light Theme = LightTheme{}

	var btn Widget = NewButton(dark, "Submit")
	var txt Widget = NewTextField(light, "Enter name...")
	var chk Widget = NewCheckbox(dark, "Remember me", true)

	btn.Render()
	txt.Render()
	chk.Render()
}
```

```csharp
using System;

interface ITheme
{
    void ApplyButtonStyle(string label);
    void ApplyTextFieldStyle(string placeholder);
    void ApplyCheckboxStyle(string label, bool isChecked);
}

class DarkTheme : ITheme
{
    public void ApplyButtonStyle(string label)
    {
        Console.WriteLine($"[Dark] Button: \"{label}\" | bg=#1a1a2e, text=#ffffff");
    }

    public void ApplyTextFieldStyle(string placeholder)
    {
        Console.WriteLine($"[Dark] TextField: \"{placeholder}\" | bg=#1a1a2e, text=#ffffff");
    }

    public void ApplyCheckboxStyle(string label, bool isChecked)
    {
        string mark = isChecked " "x" : " ";
        Console.WriteLine($"[Dark] Checkbox: \"{label}\" [{mark}] | bg=#1a1a2e, text=#ffffff");
    }
}

class LightTheme : ITheme
{
    public void ApplyButtonStyle(string label)
    {
        Console.WriteLine($"[Light] Button: \"{label}\" | bg=#ffffff, text=#1a1a2e");
    }

    public void ApplyTextFieldStyle(string placeholder)
    {
        Console.WriteLine($"[Light] TextField: \"{placeholder}\" | bg=#ffffff, text=#1a1a2e");
    }

    public void ApplyCheckboxStyle(string label, bool isChecked)
    {
        string mark = isChecked " "x" : " ";
        Console.WriteLine($"[Light] Checkbox: \"{label}\" [{mark}] | bg=#ffffff, text=#1a1a2e");
    }
}

abstract class Widget
{
    protected ITheme theme;

    protected Widget(ITheme theme)
    {
        this.theme = theme;
    }

    public abstract void Render();
}

class Button : Widget
{
    private string label;

    public Button(ITheme theme, string label) : base(theme)
    {
        this.label = label;
    }

    public override void Render()
    {
        theme.ApplyButtonStyle(label);
    }
}

class TextField : Widget
{
    private string placeholder;

    public TextField(ITheme theme, string placeholder) : base(theme)
    {
        this.placeholder = placeholder;
    }

    public override void Render()
    {
        theme.ApplyTextFieldStyle(placeholder);
    }
}

class Checkbox : Widget
{
    private string label;
    private bool isChecked;

    public Checkbox(ITheme theme, string label, bool isChecked) : base(theme)
    {
        this.label = label;
        this.isChecked = isChecked;
    }

    public override void Render()
    {
        theme.ApplyCheckboxStyle(label, isChecked);
    }
}

public class Program
{
    public static void Main()
    {
        ITheme dark = new DarkTheme();
        ITheme light = new LightTheme();
        Widget btn = new Button(dark, "Submit");
        Widget txt = new TextField(light, "Enter name...");
        Widget chk = new Checkbox(dark, "Remember me", true);
        btn.Render();
        txt.Render();
        chk.Render();
    }
}
```

```typescript
interface Theme {
    applyButtonStyle(label: string): void;
    applyTextFieldStyle(placeholder: string): void;
    applyCheckboxStyle(label: string, checked: boolean): void;
}

class DarkTheme implements Theme {
    applyButtonStyle(label: string): void {
        console.log(`[Dark] Button: "${label}" | bg=#1a1a2e, text=#ffffff`);
    }

    applyTextFieldStyle(placeholder: string): void {
        console.log(`[Dark] TextField: "${placeholder}" | bg=#1a1a2e, text=#ffffff`);
    }

    applyCheckboxStyle(label: string, checked: boolean): void {
        const mark = checked " "x" : " ";
        console.log(`[Dark] Checkbox: "${label}" [${mark}] | bg=#1a1a2e, text=#ffffff`);
    }
}

class LightTheme implements Theme {
    applyButtonStyle(label: string): void {
        console.log(`[Light] Button: "${label}" | bg=#ffffff, text=#1a1a2e`);
    }

    applyTextFieldStyle(placeholder: string): void {
        console.log(`[Light] TextField: "${placeholder}" | bg=#ffffff, text=#1a1a2e`);
    }

    applyCheckboxStyle(label: string, checked: boolean): void {
        const mark = checked " "x" : " ";
        console.log(`[Light] Checkbox: "${label}" [${mark}] | bg=#ffffff, text=#1a1a2e`);
    }
}

abstract class Widget {
    protected theme: Theme;

    constructor(theme: Theme) {
        this.theme = theme;
    }

    abstract render(): void;
}

class Button extends Widget {
    private label: string;

    constructor(theme: Theme, label: string) {
        super(theme);
        this.label = label;
    }

    render(): void {
        this.theme.applyButtonStyle(this.label);
    }
}

class TextField extends Widget {
    private placeholder: string;

    constructor(theme: Theme, placeholder: string) {
        super(theme);
        this.placeholder = placeholder;
    }

    render(): void {
        this.theme.applyTextFieldStyle(this.placeholder);
    }
}

class Checkbox extends Widget {
    private label: string;
    private checked: boolean;

    constructor(theme: Theme, label: string, checked: boolean) {
        super(theme);
        this.label = label;
        this.checked = checked;
    }

    render(): void {
        this.theme.applyCheckboxStyle(this.label, this.checked);
    }
}

const dark: Theme = new DarkTheme();
const light: Theme = new LightTheme();
const btn = new Button(dark, "Submit");
const txt = new TextField(light, "Enter name...");
const chk = new Checkbox(dark, "Remember me", true);
btn.render();
txt.render();
chk.render();
```


