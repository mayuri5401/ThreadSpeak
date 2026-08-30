---
id: "lld-design-principles-exercise-coupling-and-cohesion"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Principles"
subSection: ""
title: "Exercise: Coupling and Cohesion"
slug: "lld-design-principles-exercise-coupling-and-cohesion"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Coupling and Cohesion as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Coupling and Cohesion Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Design Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Identify and Fix Low Cohesion

> [!PAYWALL] This content is for premium members only.

**Problem:** You have a `UserManager` class that handles four unrelated responsibilities: creating users, calculating subscription fees, formatting addresses, and logging activity. It works, but it violates cohesion because those responsibilities have nothing to do with each other. Your job is to split `UserManager` into four focused classes.

**Requirements:**

- Four skeleton classes are provided: `UserService`, `BillingService`, `AddressFormatter`, and `ActivityLogger`
- Each has the correct method signature but a TODO placeholder body (returns a default or does nothing)
- Move the corresponding logic from `UserManager` into each skeleton class
- Do not change the `User` class or the `main` method

```java
import java.util.*;

class User {
    private String name;
    private String email;
    private String tier;
    private String street;
    private String city;
    private String zip;

    public User(String name, String email, String tier,
                String street, String city, String zip) {
        this.name = name;
        this.email = email;
        this.tier = tier;
        this.street = street;
        this.city = city;
        this.zip = zip;
    }

    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getTier() { return tier; }
    public String getStreet() { return street; }
    public String getCity() { return city; }
    public String getZip() { return zip; }
}

// --- Reference: low-cohesion class (extract logic from here) ---
class UserManager {
    public User createUser(String name, String email, String tier,
                           String street, String city, String zip) {
        User user = new User(name, email, tier, street, city, zip);
        System.out.println("Created user: " + user.getName()
            + " (" + user.getEmail() + ")");
        return user;
    }

    public double calculateSubscriptionFee(User user) {
        switch (user.getTier()) {
            case "PREMIUM": return 19.99;
            case "BASIC":   return 9.99;
            default:        return 0.00;
        }
    }

    public String formatAddress(User user) {
        return user.getStreet() + ", " + user.getCity()
            + ", " + user.getZip();
    }

    public void logActivity(User user, String action) {
        System.out.println("Activity: " + user.getName()
            + " - " + action);
    }
}

// --- Refactored classes (fill in the TODOs) ---
class UserService {
    public User createUser(String name, String email, String tier,
                           String street, String city, String zip) {
        // TODO: Move the createUser() logic from UserManager here
        return new User(name, email, tier, street, city, zip);
    }
}

class BillingService {
    public double calculateSubscriptionFee(User user) {
        // TODO: Move the calculateSubscriptionFee() logic from UserManager here
        return 0.00;
    }
}

class AddressFormatter {
    public String formatAddress(User user) {
        // TODO: Move the formatAddress() logic from UserManager here
        return "";
    }
}

class ActivityLogger {
    public void logActivity(User user, String action) {
        // TODO: Move the logActivity() logic from UserManager here
    }
}

public class Main {
    public static void main(String[] args) {
        UserService userService = new UserService();
        BillingService billingService = new BillingService();
        AddressFormatter addressFormatter = new AddressFormatter();
        ActivityLogger activityLogger = new ActivityLogger();

        User alice = userService.createUser("Alice", "alice@example.com",
            "PREMIUM", "123 Main St", "Springfield", "62704");

        double fee = billingService.calculateSubscriptionFee(alice);
        System.out.printf("Subscription fee for %s user: $%.2f%n",
            alice.getTier(), fee);

        String address = addressFormatter.formatAddress(alice);
        System.out.println("Address: " + address);

        activityLogger.logActivity(alice, "logged in");
    }
}
```

```python
class User:
    def __init__(self, name, email, tier, street, city, zip_code):
        self.name = name
        self.email = email
        self.tier = tier
        self.street = street
        self.city = city
        self.zip_code = zip_code

# --- Reference: low-cohesion class (extract logic from here) ---
class UserManager:
    def create_user(self, name, email, tier, street, city, zip_code):
        user = User(name, email, tier, street, city, zip_code)
        print(f"Created user: {user.name} ({user.email})")
        return user

    def calculate_subscription_fee(self, user):
        if user.tier == "PREMIUM":
            return 19.99
        elif user.tier == "BASIC":
            return 9.99
        return 0.00

    def format_address(self, user):
        return f"{user.street}, {user.city}, {user.zip_code}"

    def log_activity(self, user, action):
        print(f"Activity: {user.name} - {action}")

# --- Refactored classes (fill in the TODOs) ---
class UserService:
    def create_user(self, name, email, tier, street, city, zip_code):
        # TODO: Move the create_user() logic from UserManager here
        return User(name, email, tier, street, city, zip_code)

class BillingService:
    def calculate_subscription_fee(self, user):
        # TODO: Move the calculate_subscription_fee() logic from UserManager here
        return 0.00

class AddressFormatter:
    def format_address(self, user):
        # TODO: Move the format_address() logic from UserManager here
        return ""

class ActivityLogger:
    def log_activity(self, user, action):
        # TODO: Move the log_activity() logic from UserManager here
        pass

if __name__ == "__main__":
    user_service = UserService()
    billing_service = BillingService()
    address_formatter = AddressFormatter()
    activity_logger = ActivityLogger()

    alice = user_service.create_user("Alice", "alice@example.com",
        "PREMIUM", "123 Main St", "Springfield", "62704")

    fee = billing_service.calculate_subscription_fee(alice)
    print(f"Subscription fee for {alice.tier} user: ${fee:.2f}")

    address = address_formatter.format_address(alice)
    print(f"Address: {address}")

    activity_logger.log_activity(alice, "logged in")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class User {
    string name, email, tier, street, city, zip;
public:
    User(string name, string email, string tier,
         string street, string city, string zip)
        : name(name), email(email), tier(tier),
          street(street), city(city), zip(zip) {}

    string getName() const { return name; }
    string getEmail() const { return email; }
    string getTier() const { return tier; }
    string getStreet() const { return street; }
    string getCity() const { return city; }
    string getZip() const { return zip; }
};

// --- Reference: low-cohesion class (extract logic from here) ---
class UserManager {
public:
    User createUser(const string& name, const string& email,
                    const string& tier, const string& street,
                    const string& city, const string& zip) {
        User user(name, email, tier, street, city, zip);
        cout << "Created user: " << user.getName()
             << " (" << user.getEmail() << ")" << endl;
        return user;
    }

    double calculateSubscriptionFee(const User& user) {
        if (user.getTier() == "PREMIUM") return 19.99;
        if (user.getTier() == "BASIC")   return 9.99;
        return 0.00;
    }

    string formatAddress(const User& user) {
        return user.getStreet() + ", " + user.getCity()
            + ", " + user.getZip();
    }

    void logActivity(const User& user, const string& action) {
        cout << "Activity: " << user.getName()
             << " - " << action << endl;
    }
};

// --- Refactored classes (fill in the TODOs) ---
class UserService {
public:
    User createUser(const string& name, const string& email,
                    const string& tier, const string& street,
                    const string& city, const string& zip) {
        // TODO: Move the createUser() logic from UserManager here
        return User(name, email, tier, street, city, zip);
    }
};

class BillingService {
public:
    double calculateSubscriptionFee(const User& user) {
        // TODO: Move the calculateSubscriptionFee() logic from UserManager here
        return 0.00;
    }
};

class AddressFormatter {
public:
    string formatAddress(const User& user) {
        // TODO: Move the formatAddress() logic from UserManager here
        return "";
    }
};

class ActivityLogger {
public:
    void logActivity(const User& user, const string& action) {
        // TODO: Move the logActivity() logic from UserManager here
    }
};

int main() {
    UserService userService;
    BillingService billingService;
    AddressFormatter addressFormatter;
    ActivityLogger activityLogger;

    User alice = userService.createUser("Alice", "alice@example.com",
        "PREMIUM", "123 Main St", "Springfield", "62704");

    double fee = billingService.calculateSubscriptionFee(alice);
    printf("Subscription fee for %s user: $%.2f\n",
        alice.getTier().c_str(), fee);

    string address = addressFormatter.formatAddress(alice);
    cout << "Address: " << address << endl;

    activityLogger.logActivity(alice, "logged in");

    return 0;
}
```

```go
package main

import "fmt"

type User struct {
	name   string
	email  string
	tier   string
	street string
	city   string
	zip    string
}

func NewUser(name, email, tier, street, city, zip string) *User {
	return &User{
		name:   name,
		email:  email,
		tier:   tier,
		street: street,
		city:   city,
		zip:    zip,
	}
}

func (u *User) GetName() string {
	return u.name
}

func (u *User) GetEmail() string {
	return u.email
}

func (u *User) GetTier() string {
	return u.tier
}

func (u *User) GetStreet() string {
	return u.street
}

func (u *User) GetCity() string {
	return u.city
}

func (u *User) GetZip() string {
	return u.zip
}

// --- Reference: low-cohesion class (extract logic from here) ---
type UserManager struct{}

func (um *UserManager) CreateUser(name, email, tier, street, city, zip string) *User {
	user := NewUser(name, email, tier, street, city, zip)
	fmt.Printf("Created user: %s (%s)\n", user.GetName(), user.GetEmail())
	return user
}

func (um *UserManager) CalculateSubscriptionFee(user *User) float64 {
	switch user.GetTier() {
	case "PREMIUM":
		return 19.99
	case "BASIC":
		return 9.99
	default:
		return 0.00
	}
}

func (um *UserManager) FormatAddress(user *User) string {
	return user.GetStreet() + ", " + user.GetCity() + ", " + user.GetZip()
}

func (um *UserManager) LogActivity(user *User, action string) {
	fmt.Printf("Activity: %s - %s\n", user.GetName(), action)
}

// --- Refactored classes (fill in the TODOs) ---
type UserService struct{}

func (us *UserService) CreateUser(name, email, tier, street, city, zip string) *User {
	// TODO: Move the CreateUser() logic from UserManager here
	return NewUser(name, email, tier, street, city, zip)
}

type BillingService struct{}

func (bs *BillingService) CalculateSubscriptionFee(user *User) float64 {
	// TODO: Move the CalculateSubscriptionFee() logic from UserManager here
	return 0.00
}

type AddressFormatter struct{}

func (af *AddressFormatter) FormatAddress(user *User) string {
	// TODO: Move the FormatAddress() logic from UserManager here
	return ""
}

type ActivityLogger struct{}

func (al *ActivityLogger) LogActivity(user *User, action string) {
	// TODO: Move the LogActivity() logic from UserManager here
}

func main() {
	userService := &UserService{}
	billingService := &BillingService{}
	addressFormatter := &AddressFormatter{}
	activityLogger := &ActivityLogger{}

	alice := userService.CreateUser("Alice", "alice@example.com",
		"PREMIUM", "123 Main St", "Springfield", "62704")

	fee := billingService.CalculateSubscriptionFee(alice)
	fmt.Printf("Subscription fee for %s user: $%.2f\n",
		alice.GetTier(), fee)

	address := addressFormatter.FormatAddress(alice)
	fmt.Println("Address:", address)

	activityLogger.LogActivity(alice, "logged in")
}
```

```csharp
using System;

class User
{
    public string Name { get; }
    public string Email { get; }
    public string Tier { get; }
    public string Street { get; }
    public string City { get; }
    public string Zip { get; }

    public User(string name, string email, string tier,
                string street, string city, string zip)
    {
        Name = name; Email = email; Tier = tier;
        Street = street; City = city; Zip = zip;
    }
}

// --- Reference: low-cohesion class (extract logic from here) ---
class UserManager
{
    public User CreateUser(string name, string email, string tier,
                           string street, string city, string zip)
    {
        var user = new User(name, email, tier, street, city, zip);
        Console.WriteLine($"Created user: {user.Name} ({user.Email})");
        return user;
    }

    public double CalculateSubscriptionFee(User user)
    {
        switch (user.Tier)
        {
            case "PREMIUM": return 19.99;
            case "BASIC":   return 9.99;
            default:        return 0.00;
        }
    }

    public string FormatAddress(User user)
    {
        return $"{user.Street}, {user.City}, {user.Zip}";
    }

    public void LogActivity(User user, string action)
    {
        Console.WriteLine($"Activity: {user.Name} - {action}");
    }
}

// --- Refactored classes (fill in the TODOs) ---
class UserService
{
    public User CreateUser(string name, string email, string tier,
                           string street, string city, string zip)
    {
        // TODO: Move the CreateUser() logic from UserManager here
        return new User(name, email, tier, street, city, zip);
    }
}

class BillingService
{
    public double CalculateSubscriptionFee(User user)
    {
        // TODO: Move the CalculateSubscriptionFee() logic from UserManager here
        return 0.00;
    }
}

class AddressFormatter
{
    public string FormatAddress(User user)
    {
        // TODO: Move the FormatAddress() logic from UserManager here
        return "";
    }
}

class ActivityLogger
{
    public void LogActivity(User user, string action)
    {
        // TODO: Move the LogActivity() logic from UserManager here
    }
}

class Program
{
    static void Main(string[] args)
    {
        var userService = new UserService();
        var billingService = new BillingService();
        var addressFormatter = new AddressFormatter();
        var activityLogger = new ActivityLogger();

        var alice = userService.CreateUser("Alice", "alice@example.com",
            "PREMIUM", "123 Main St", "Springfield", "62704");

        double fee = billingService.CalculateSubscriptionFee(alice);
        Console.WriteLine($"Subscription fee for {alice.Tier} user: ${fee:F2}");

        string address = addressFormatter.FormatAddress(alice);
        Console.WriteLine($"Address: {address}");

        activityLogger.LogActivity(alice, "logged in");
    }
}
```

#### Solutions

```go
package main

import "fmt"

type Appointment struct {
	ID     string
	Title  string
	Notes  string
	Hour   int
	Minute int
}

func (a Appointment) String() string {
	return fmt.Sprintf("[%s] %s at %02d:%02d - %s", a.ID, a.Title, a.Hour, a.Minute, a.Notes)
}

type AppointmentStore interface {
	Add(Appointment)
	List() []Appointment
	FindByID(string) (Appointment, bool)
}

type InMemoryAppointmentStore struct {
	items map[string]Appointment
	order []string
}

func NewInMemoryAppointmentStore() *InMemoryAppointmentStore {
	return &InMemoryAppointmentStore{
		items: make(map[string]Appointment),
		order: make([]string, 0),
	}
}

func (s *InMemoryAppointmentStore) Add(a Appointment) {
	if _, exists := s.items[a.ID]; !exists {
		s.order = append(s.order, a.ID)
	}
	s.items[a.ID] = a
}

func (s *InMemoryAppointmentStore) List() []Appointment {
	result := make([]Appointment, 0, len(s.order))
	for _, id := range s.order {
		result = append(result, s.items[id])
	}
	return result
}

func (s *InMemoryAppointmentStore) FindByID(id string) (Appointment, bool) {
	a, ok := s.items[id]
	return a, ok
}

type AppointmentValidator interface {
	Validate(Appointment) error
}

type BasicAppointmentValidator struct{}

func (v BasicAppointmentValidator) Validate(a Appointment) error {
	if a.ID == "" {
		return fmt.Errorf("appointment id cannot be empty")
	}
	if a.Title == "" {
		return fmt.Errorf("appointment title cannot be empty")
	}
	if a.Hour < 0 || a.Hour > 23 {
		return fmt.Errorf("hour must be between 0 and 23")
	}
	if a.Minute < 0 || a.Minute > 59 {
		return fmt.Errorf("minute must be between 0 and 59")
	}
	return nil
}

type AppointmentFormatter interface {
	Format(Appointment) string
}

type SimpleAppointmentFormatter struct{}

func (f SimpleAppointmentFormatter) Format(a Appointment) string {
	return a.String()
}

type AppointmentNotifier interface {
	Notify(string)
}

type ConsoleNotifier struct{}

func (n ConsoleNotifier) Notify(message string) {
	fmt.Println(message)
}

type AppointmentService struct {
	store     AppointmentStore
	validator AppointmentValidator
	formatter  AppointmentFormatter
	notifier   AppointmentNotifier
}

func NewAppointmentService(store AppointmentStore, validator AppointmentValidator, formatter AppointmentFormatter, notifier AppointmentNotifier) *AppointmentService {
	return &AppointmentService{
		store:     store,
		validator: validator,
		formatter: formatter,
		notifier:   notifier,
	}
}

func (s *AppointmentService) Create(a Appointment) error {
	if err := s.validator.Validate(a); err != nil {
		return err
	}
	s.store.Add(a)
	if s.notifier != nil {
		s.notifier.Notify("Created appointment: " + s.formatter.Format(a))
	}
	return nil
}

func (s *AppointmentService) GetAllFormatted() []string {
	items := s.store.List()
	out := make([]string, 0, len(items))
	for _, item := range items {
		out = append(out, s.formatter.Format(item))
	}
	return out
}

func (s *AppointmentService) GetByID(id string) (Appointment, bool) {
	return s.store.FindByID(id)
}

func main() {
	store := NewInMemoryAppointmentStore()
	validator := BasicAppointmentValidator{}
	formatter := SimpleAppointmentFormatter{}
	notifier := ConsoleNotifier{}

	service := NewAppointmentService(store, validator, formatter, notifier)

	appointments := []Appointment{
		{ID: "A1", Title: "Doctor Visit", Notes: "Annual checkup", Hour: 9, Minute: 30},
		{ID: "A2", Title: "Team Sync", Notes: "Weekly stand-up", Hour: 11, Minute: 0},
		{ID: "A3", Title: "Dinner", Notes: "With family", Hour: 19, Minute: 15},
	}

	for _, a := range appointments {
		if err := service.Create(a); err != nil {
			fmt.Println("error:", err)
		}
	}

	fmt.Println()
	fmt.Println("Appointments:")
	for _, line := range service.GetAllFormatted() {
		fmt.Println(line)
	}

	fmt.Println()
	if a, ok := service.GetByID("A2"); ok {
		fmt.Println("Found:", formatter.Format(a))
	}
}
```

---

# Exercise 2: Reduce Coupling

**Problem:** A tightly coupled `NotificationService` used to directly create `EmailSender`, `SmsSender`, and `PushSender` inside its `notifyUser` method. The structure has been refactored to use a `MessageSender` interface and dependency injection, but the method bodies are empty. Your job is to fill in the TODOs so each sender prints the correct output.

**Requirements:**

- The `MessageSender` interface, the three sender skeletons, and the `NotificationService` constructor are already provided
- Fill in each sender's `send()` method to print the correct output format
- Fill in `notifyUser()` to loop through the injected senders
- Do not change the `main` method or the `MessageSender` interface

```java
import java.util.*;

interface MessageSender {
    void send(String userId, String message);
}

class EmailSender implements MessageSender {
    @Override
    public void send(String userId, String message) {
        // TODO: Print "[Email] Sent to <userId>@company.com: <message>"
    }
}

class SmsSender implements MessageSender {
    @Override
    public void send(String userId, String message) {
        // TODO: Print "[SMS] Sent to +1234567890: <message>"
    }
}

class PushSender implements MessageSender {
    @Override
    public void send(String userId, String message) {
        // TODO: Print "[Push] Sent to <userId>: <message>"
    }
}

class NotificationService {
    private final List<MessageSender> senders;

    public NotificationService(List<MessageSender> senders) {
        this.senders = senders;
    }

    public void notifyUser(String userId, String message) {
        // TODO: Loop through this.senders and call send(userId, message) on each
    }
}

public class Main {
    public static void main(String[] args) {
        List<MessageSender> senders = List.of(
            new EmailSender(),
            new SmsSender(),
            new PushSender()
        );
        NotificationService service = new NotificationService(senders);
        service.notifyUser("user42", "Your order has been shipped");
    }
}
```

```python
from abc import ABC, abstractmethod

class MessageSender(ABC):
    @abstractmethod
    def send(self, user_id, message):
        pass

class EmailSender(MessageSender):
    def send(self, user_id, message):
        # TODO: Print "[Email] Sent to <user_id>@company.com: <message>"
        pass

class SmsSender(MessageSender):
    def send(self, user_id, message):
        # TODO: Print "[SMS] Sent to +1234567890: <message>"
        pass

class PushSender(MessageSender):
    def send(self, user_id, message):
        # TODO: Print "[Push] Sent to <user_id>: <message>"
        pass

class NotificationService:
    def __init__(self, senders):
        self.senders = senders

    def notify_user(self, user_id, message):
        # TODO: Loop through self.senders and call send(user_id, message) on each
        pass

if __name__ == "__main__":
    senders = [EmailSender(), SmsSender(), PushSender()]
    service = NotificationService(senders)
    service.notify_user("user42", "Your order has been shipped")
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class MessageSender {
public:
    virtual void send(const string& userId, const string& message) = 0;
    virtual ~MessageSender() = default;
};

class EmailSender : public MessageSender {
public:
    void send(const string& userId, const string& message) override {
        // TODO: Print "[Email] Sent to <userId>@company.com: <message>"
    }
};

class SmsSender : public MessageSender {
public:
    void send(const string& userId, const string& message) override {
        // TODO: Print "[SMS] Sent to +1234567890: <message>"
    }
};

class PushSender : public MessageSender {
public:
    void send(const string& userId, const string& message) override {
        // TODO: Print "[Push] Sent to <userId>: <message>"
    }
};

class NotificationService {
    vector<MessageSender*> senders;
public:
    NotificationService(vector<MessageSender*> senders)
        : senders(senders) {}

    void notifyUser(const string& userId, const string& message) {
        // TODO: Loop through this->senders and call send(userId, message) on each
    }
};

int main() {
    vector<MessageSender*> senders = {
        new EmailSender(),
        new SmsSender(),
        new PushSender()
    };
    NotificationService service(senders);
    service.notifyUser("user42", "Your order has been shipped");

    for (auto* s : senders) delete s;
    return 0;
}
```

```go
package main

type MessageSender interface {
	Send(userId string, message string)
}

type EmailSender struct{}

func (e *EmailSender) Send(userId string, message string) {
	// TODO: Print "[Email] Sent to <userId>@company.com: <message>"
}

type SmsSender struct{}

func (s *SmsSender) Send(userId string, message string) {
	// TODO: Print "[SMS] Sent to +1234567890: <message>"
}

type PushSender struct{}

func (p *PushSender) Send(userId string, message string) {
	// TODO: Print "[Push] Sent to <userId>: <message>"
}

type NotificationService struct {
	senders []MessageSender
}

func NewNotificationService(senders []MessageSender) *NotificationService {
	return &NotificationService{
		senders: senders,
	}
}

func (n *NotificationService) NotifyUser(userId string, message string) {
	// TODO: Loop through this.senders and call Send(userId, message) on each
}

func main() {
	senders := []MessageSender{
		&EmailSender{},
		&SmsSender{},
		&PushSender{},
	}
	service := NewNotificationService(senders)
	service.NotifyUser("user42", "Your order has been shipped")
}
```

```csharp
using System;
using System.Collections.Generic;

interface IMessageSender
{
    void Send(string userId, string message);
}

class EmailSender : IMessageSender
{
    public void Send(string userId, string message)
    {
        // TODO: Print "[Email] Sent to <userId>@company.com: <message>"
    }
}

class SmsSender : IMessageSender
{
    public void Send(string userId, string message)
    {
        // TODO: Print "[SMS] Sent to +1234567890: <message>"
    }
}

class PushSender : IMessageSender
{
    public void Send(string userId, string message)
    {
        // TODO: Print "[Push] Sent to <userId>: <message>"
    }
}

class NotificationService
{
    private readonly List<IMessageSender> senders;

    public NotificationService(List<IMessageSender> senders)
    {
        this.senders = senders;
    }

    public void NotifyUser(string userId, string message)
    {
        // TODO: Loop through this.senders and call Send(userId, message) on each
    }
}

class Program
{
    static void Main(string[] args)
    {
        var senders = new List<IMessageSender>
        {
            new EmailSender(),
            new SmsSender(),
            new PushSender()
        };
        var service = new NotificationService(senders);
        service.NotifyUser("user42", "Your order has been shipped");
    }
}
```

#### Solutions

```go
package main

import (
	"fmt"
	"sync"
)

type Notifier interface {
	Send(message string)
}

type ConsoleNotifier struct{}

func (c *ConsoleNotifier) Send(message string) {
	fmt.Println(message)
}

type EmailNotifier struct {
	address string
}

func NewEmailNotifier(address string) *EmailNotifier {
	return &EmailNotifier{address: address}
}

func (e *EmailNotifier) Send(message string) {
	fmt.Printf("Email to %s: %s\n", e.address, message)
}

type SMSNotifier struct {
	phone string
}

func NewSMSNotifier(phone string) *SMSNotifier {
	return &SMSNotifier{phone: phone}
}

func (s *SMSNotifier) Send(message string) {
	fmt.Printf("SMS to %s: %s\n", s.phone, message)
}

type NotificationService struct {
	notifier Notifier
}

func NewNotificationService(notifier Notifier) *NotificationService {
	return &NotificationService{notifier: notifier}
}

func (s *NotificationService) Notify(message string) {
	if s.notifier == nil {
		return
	}
	s.notifier.Send(message)
}

func (s *NotificationService) SetNotifier(notifier Notifier) {
	s.notifier = notifier
}

type Order struct {
	ID     string
	Status string
}

type OrderRepository struct {
	mu     sync.RWMutex
	orders map[string]*Order
}

func NewOrderRepository() *OrderRepository {
	return &OrderRepository{
		orders: make(map[string]*Order),
	}
}

func (r *OrderRepository) Save(order *Order) {
	r.mu.Lock()
	defer r.mu.Unlock()
	r.orders[order.ID] = order
}

func (r *OrderRepository) FindByID(id string) (*Order, bool) {
	r.mu.RLock()
	defer r.mu.RUnlock()
	order, ok := r.orders[id]
	return order, ok
}

type OrderService struct {
	repo      *OrderRepository
	notifier  Notifier
}

func NewOrderService(repo *OrderRepository, notifier Notifier) *OrderService {
	return &OrderService{
		repo:     repo,
		notifier: notifier,
	}
}

func (s *OrderService) CreateOrder(id string) {
	order := &Order{ID: id, Status: "CREATED"}
	s.repo.Save(order)
	if s.notifier != nil {
		s.notifier.Send(fmt.Sprintf("Order %s created", id))
	}
}

func (s *OrderService) ShipOrder(id string) {
	order, ok := s.repo.FindByID(id)
	if !ok {
		if s.notifier != nil {
			s.notifier.Send(fmt.Sprintf("Order %s not found", id))
		}
		return
	}
	order.Status = "SHIPPED"
	s.repo.Save(order)
	if s.notifier != nil {
		s.notifier.Send(fmt.Sprintf("Order %s shipped", id))
	}
}

type Logger interface {
	Log(message string)
}

type ConsoleLogger struct{}

func (c *ConsoleLogger) Log(message string) {
	fmt.Println("LOG:", message)
}

type Application struct {
	orderService *OrderService
	logger       Logger
}

func NewApplication(orderService *OrderService, logger Logger) *Application {
	return &Application{
		orderService: orderService,
		logger:       logger,
	}
}

func (a *Application) Run() {
	if a.logger != nil {
		a.logger.Log("application started")
	}

	a.orderService.CreateOrder("A100")
	a.orderService.ShipOrder("A100")
	a.orderService.ShipOrder("B200")

	if a.logger != nil {
		a.logger.Log("application finished")
	}
}

func main() {
	repo := NewOrderRepository()

	emailNotifier := NewEmailNotifier("ops@example.com")
	orderService := NewOrderService(repo, emailNotifier)

	logger := &ConsoleLogger{}
	app := NewApplication(orderService, logger)
	app.Run()

	fmt.Println("--- Swapping notifier to SMS without changing services ---")

	smsNotifier := NewSMSNotifier("+1-555-1234")
	orderService2 := NewOrderService(repo, smsNotifier)
	orderService2.CreateOrder("C300")
	orderService2.ShipOrder("C300")

	fmt.Println("--- Using a generic notification service with different implementations ---")

	notifService := NewNotificationService(&ConsoleNotifier{})
	notifService.Notify("System ready")

	notifService.SetNotifier(NewEmailNotifier("admin@example.com"))
	notifService.Notify("Deployment successful")
}
```


