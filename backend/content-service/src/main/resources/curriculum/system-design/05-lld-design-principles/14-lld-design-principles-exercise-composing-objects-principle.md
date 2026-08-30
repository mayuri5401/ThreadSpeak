---
id: "lld-design-principles-exercise-composing-objects-principle"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Principles"
subSection: ""
title: "Exercise: Composing Objects Principle"
slug: "lld-design-principles-exercise-composing-objects-principle"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Composing Objects Principle as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Composing Objects Principle Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Design Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: NotificationBuilder

> [!PAYWALL] This content is for premium members only.

**Problem:** You have inherited  a notification system with a combinatorial explosion of classes: `EmailNotification`, `UrgentEmailNotification`, `ScheduledSmsNotification`, `UrgentScheduledEmailNotification`, and so on. The system has been refactored to use composition with a `DeliveryChannel`, `Priority`, and `Schedule`, but the method bodies are empty. Your job is to fill in the TODOs so each component prints the correct output.

**Requirements:**

- The interfaces (`DeliveryChannel`, `Schedule`), the `Priority` enum, and all skeleton classes are provided
- Fill in each channel's `deliver()` method to print the correct format
- Fill in each schedule's `apply()` method to print the correct format
- Fill in `Notification.send()` to call `schedule.apply()` then `channel.deliver()`
- Do not change the `main` method

```java
enum Priority { LOW, NORMAL, URGENT }

interface DeliveryChannel {
    void deliver(String priority, String message);
}

interface Schedule {
    void apply(String priority);
}

class EmailChannel implements DeliveryChannel {
    @Override
    public void deliver(String priority, String message) {
        // TODO: Print "[<priority>] Sending via Email: <message>"
    }
}

class SmsChannel implements DeliveryChannel {
    @Override
    public void deliver(String priority, String message) {
        // TODO: Print "[<priority>] Sending via SMS: <message>"
    }
}

class PushChannel implements DeliveryChannel {
    @Override
    public void deliver(String priority, String message) {
        // TODO: Print "[<priority>] Sending via Push Notification: <message>"
    }
}

class ImmediateSchedule implements Schedule {
    @Override
    public void apply(String priority) {
        // TODO: Print "[<priority>] Scheduling: sending immediately"
    }
}

class DelayedSchedule implements Schedule {
    private final int minutes;
    public DelayedSchedule(int minutes) { this.minutes = minutes; }

    @Override
    public void apply(String priority) {
        // TODO: Print "[<priority>] Scheduling: delayed by <minutes> minutes"
    }
}

class Notification {
    private final DeliveryChannel channel;
    private final Priority priority;
    private final Schedule schedule;

    public Notification(DeliveryChannel channel, Priority priority, Schedule schedule) {
        this.channel = channel;
        this.priority = priority;
        this.schedule = schedule;
    }

    public void send(String message) {
        // TODO: Call schedule.apply() with priority.name(), then
        //       call channel.deliver() with priority.name() and message
    }
}

public class Main {
    public static void main(String[] args) {
        Notification urgentEmail = new Notification(
            new EmailChannel(), Priority.URGENT, new ImmediateSchedule());
        urgentEmail.send("Server is down!");

        System.out.println();

        Notification scheduledSms = new Notification(
            new SmsChannel(), Priority.LOW, new DelayedSchedule(30));
        scheduledSms.send("Weekly report is ready.");

        System.out.println();

        Notification pushNotif = new Notification(
            new PushChannel(), Priority.NORMAL, new ImmediateSchedule());
        pushNotif.send("You have a new follower.");
    }
}
```

```python
from abc import ABC, abstractmethod
from enum import Enum

class Priority(Enum):
    LOW = "LOW"
    NORMAL = "NORMAL"
    URGENT = "URGENT"

class DeliveryChannel(ABC):
    @abstractmethod
    def deliver(self, priority, message):
        pass

class Schedule(ABC):
    @abstractmethod
    def apply(self, priority):
        pass

class EmailChannel(DeliveryChannel):
    def deliver(self, priority, message):
        # TODO: Print "[<priority>] Sending via Email: <message>"
        pass

class SmsChannel(DeliveryChannel):
    def deliver(self, priority, message):
        # TODO: Print "[<priority>] Sending via SMS: <message>"
        pass

class PushChannel(DeliveryChannel):
    def deliver(self, priority, message):
        # TODO: Print "[<priority>] Sending via Push Notification: <message>"
        pass

class ImmediateSchedule(Schedule):
    def apply(self, priority):
        # TODO: Print "[<priority>] Scheduling: sending immediately"
        pass

class DelayedSchedule(Schedule):
    def __init__(self, minutes):
        self.minutes = minutes

    def apply(self, priority):
        # TODO: Print "[<priority>] Scheduling: delayed by <minutes> minutes"
        pass

class Notification:
    def __init__(self, channel, priority, schedule):
        self.channel = channel
        self.priority = priority
        self.schedule = schedule

    def send(self, message):
        # TODO: Call self.schedule.apply() with self.priority.value, then
        #       call self.channel.deliver() with self.priority.value and message
        pass

if __name__ == "__main__":
    urgent_email = Notification(
        EmailChannel(), Priority.URGENT, ImmediateSchedule())
    urgent_email.send("Server is down!")

    print()

    scheduled_sms = Notification(
        SmsChannel(), Priority.LOW, DelayedSchedule(30))
    scheduled_sms.send("Weekly report is ready.")

    print()

    push_notif = Notification(
        PushChannel(), Priority.NORMAL, ImmediateSchedule())
    push_notif.send("You have a new follower.")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

enum class Priority { LOW, NORMAL, URGENT };

string priorityName(Priority p) {
    switch (p) {
        case Priority::LOW:    return "LOW";
        case Priority::NORMAL: return "NORMAL";
        case Priority::URGENT: return "URGENT";
    }
    return "";
}

class DeliveryChannel {
public:
    virtual void deliver(const string& priority, const string& message) = 0;
    virtual ~DeliveryChannel() = default;
};

class Schedule {
public:
    virtual void apply(const string& priority) = 0;
    virtual ~Schedule() = default;
};

class EmailChannel : public DeliveryChannel {
public:
    void deliver(const string& priority, const string& message) override {
        // TODO: Print "[<priority>] Sending via Email: <message>"
    }
};

class SmsChannel : public DeliveryChannel {
public:
    void deliver(const string& priority, const string& message) override {
        // TODO: Print "[<priority>] Sending via SMS: <message>"
    }
};

class PushChannel : public DeliveryChannel {
public:
    void deliver(const string& priority, const string& message) override {
        // TODO: Print "[<priority>] Sending via Push Notification: <message>"
    }
};

class ImmediateSchedule : public Schedule {
public:
    void apply(const string& priority) override {
        // TODO: Print "[<priority>] Scheduling: sending immediately"
    }
};

class DelayedSchedule : public Schedule {
    int minutes;
public:
    DelayedSchedule(int minutes) : minutes(minutes) {}
    void apply(const string& priority) override {
        // TODO: Print "[<priority>] Scheduling: delayed by <minutes> minutes"
    }
};

class Notification {
    DeliveryChannel* channel;
    Priority priority;
    Schedule* schedule;
public:
    Notification(DeliveryChannel* channel, Priority priority, Schedule* schedule)
        : channel(channel), priority(priority), schedule(schedule) {}

    void send(const string& message) {
        // TODO: Call schedule->apply() with priorityName(priority), then
        //       call channel->deliver() with priorityName(priority) and message
    }
};

int main() {
    EmailChannel email;
    ImmediateSchedule immediate1;
    Notification urgentEmail(&email, Priority::URGENT, &immediate1);
    urgentEmail.send("Server is down!");

    cout << endl;

    SmsChannel sms;
    DelayedSchedule delayed(30);
    Notification scheduledSms(&sms, Priority::LOW, &delayed);
    scheduledSms.send("Weekly report is ready.");

    cout << endl;

    PushChannel push;
    ImmediateSchedule immediate2;
    Notification pushNotif(&push, Priority::NORMAL, &immediate2);
    pushNotif.send("You have a new follower.");

    return 0;
}
```

```go
package main

import "fmt"

type Priority int

const (
	LOW Priority = iota
	NORMAL
	URGENT
)

func (p Priority) String() string {
	switch p {
	case LOW:
		return "LOW"
	case NORMAL:
		return "NORMAL"
	case URGENT:
		return "URGENT"
	default:
		return ""
	}
}

type DeliveryChannel interface {
	deliver(priority string, message string)
}

type Schedule interface {
	apply(priority string)
}

type EmailChannel struct{}

func (e *EmailChannel) deliver(priority string, message string) {
	// TODO: Print "[<priority>] Sending via Email: <message>"
	_ = priority
	_ = message
}

type SmsChannel struct{}

func (s *SmsChannel) deliver(priority string, message string) {
	// TODO: Print "[<priority>] Sending via SMS: <message>"
	_ = priority
	_ = message
}

type PushChannel struct{}

func (p *PushChannel) deliver(priority string, message string) {
	// TODO: Print "[<priority>] Sending via Push Notification: <message>"
	_ = priority
	_ = message
}

type ImmediateSchedule struct{}

func (i *ImmediateSchedule) apply(priority string) {
	// TODO: Print "[<priority>] Scheduling: sending immediately"
	_ = priority
}

type DelayedSchedule struct {
	minutes int
}

func NewDelayedSchedule(minutes int) *DelayedSchedule {
	return &DelayedSchedule{minutes: minutes}
}

func (d *DelayedSchedule) apply(priority string) {
	// TODO: Print "[<priority>] Scheduling: delayed by <minutes> minutes"
	_ = priority
	_ = d.minutes
}

type Notification struct {
	channel  DeliveryChannel
	priority Priority
	schedule Schedule
}

func NewNotification(channel DeliveryChannel, priority Priority, schedule Schedule) *Notification {
	return &Notification{
		channel:  channel,
		priority: priority,
		schedule: schedule,
	}
}

func (n *Notification) send(message string) {
	// TODO: Call schedule.apply() with priority.String(), then
	//       call channel.deliver() with priority.String() and message
	_ = message
}

func main() {
	urgentEmail := NewNotification(
		&EmailChannel{}, URGENT, &ImmediateSchedule{})
	urgentEmail.send("Server is down!")

	fmt.Println()

	scheduledSms := NewNotification(
		&SmsChannel{}, LOW, NewDelayedSchedule(30))
	scheduledSms.send("Weekly report is ready.")

	fmt.Println()

	pushNotif := NewNotification(
		&PushChannel{}, NORMAL, &ImmediateSchedule{})
	pushNotif.send("You have a new follower.")
}
```

```csharp
using System;

enum Priority { LOW, NORMAL, URGENT }

interface IDeliveryChannel
{
    void Deliver(string priority, string message);
}

interface ISchedule
{
    void Apply(string priority);
}

class EmailChannel : IDeliveryChannel
{
    public void Deliver(string priority, string message)
    {
        // TODO: Print "[<priority>] Sending via Email: <message>"
    }
}

class SmsChannel : IDeliveryChannel
{
    public void Deliver(string priority, string message)
    {
        // TODO: Print "[<priority>] Sending via SMS: <message>"
    }
}

class PushChannel : IDeliveryChannel
{
    public void Deliver(string priority, string message)
    {
        // TODO: Print "[<priority>] Sending via Push Notification: <message>"
    }
}

class ImmediateSchedule : ISchedule
{
    public void Apply(string priority)
    {
        // TODO: Print "[<priority>] Scheduling: sending immediately"
    }
}

class DelayedSchedule : ISchedule
{
    private readonly int minutes;
    public DelayedSchedule(int minutes) { this.minutes = minutes; }

    public void Apply(string priority)
    {
        // TODO: Print "[<priority>] Scheduling: delayed by <minutes> minutes"
    }
}

class Notification
{
    private readonly IDeliveryChannel channel;
    private readonly Priority priority;
    private readonly ISchedule schedule;

    public Notification(IDeliveryChannel channel, Priority priority, ISchedule schedule)
    {
        this.channel = channel;
        this.priority = priority;
        this.schedule = schedule;
    }

    public void Send(string message)
    {
        // TODO: Call schedule.Apply() with priority.ToString(), then
        //       call channel.Deliver() with priority.ToString() and message
    }
}

class Program
{
    static void Main(string[] args)
    {
        var urgentEmail = new Notification(
            new EmailChannel(), Priority.URGENT, new ImmediateSchedule());
        urgentEmail.Send("Server is down!");

        Console.WriteLine();

        var scheduledSms = new Notification(
            new SmsChannel(), Priority.LOW, new DelayedSchedule(30));
        scheduledSms.Send("Weekly report is ready.");

        Console.WriteLine();

        var pushNotif = new Notification(
            new PushChannel(), Priority.NORMAL, new ImmediateSchedule());
        pushNotif.Send("You have a new follower.");
    }
}
```

```typescript
const Priority = { LOW: "LOW", NORMAL: "NORMAL", URGENT: "URGENT" } as const;
type Priority = typeof Priority[keyof typeof Priority];

interface DeliveryChannel {
    deliver(priority: string, message: string): void;
}

interface Schedule {
    apply(priority: string): void;
}

class EmailChannel implements DeliveryChannel {
    deliver(priority: string, message: string): void {
        // TODO: Print "[<priority>] Sending via Email: <message>"
    }
}

class SmsChannel implements DeliveryChannel {
    deliver(priority: string, message: string): void {
        // TODO: Print "[<priority>] Sending via SMS: <message>"
    }
}

class PushChannel implements DeliveryChannel {
    deliver(priority: string, message: string): void {
        // TODO: Print "[<priority>] Sending via Push Notification: <message>"
    }
}

class ImmediateSchedule implements Schedule {
    apply(priority: string): void {
        // TODO: Print "[<priority>] Scheduling: sending immediately"
    }
}

class DelayedSchedule implements Schedule {
    private minutes: number;

    constructor(minutes: number) {
        this.minutes = minutes;
    }

    apply(priority: string): void {
        // TODO: Print "[<priority>] Scheduling: delayed by <minutes> minutes"
    }
}

class Notification {
    private channel: DeliveryChannel;
    private priority: Priority;
    private schedule: Schedule;

    constructor(channel: DeliveryChannel, priority: Priority, schedule: Schedule) {
        this.channel = channel;
        this.priority = priority;
        this.schedule = schedule;
    }

    send(message: string): void {
        // TODO: Call this.schedule.apply() with this.priority, then
        //       call this.channel.deliver() with this.priority and message
    }
}

const urgentEmail = new Notification(
    new EmailChannel(), Priority.URGENT, new ImmediateSchedule());
urgentEmail.send("Server is down!");

console.log();

const scheduledSms = new Notification(
    new SmsChannel(), Priority.LOW, new DelayedSchedule(30));
scheduledSms.send("Weekly report is ready.");

console.log();

const pushNotif = new Notification(
    new PushChannel(), Priority.NORMAL, new ImmediateSchedule());
pushNotif.send("You have a new follower.");
```

#### Solutions

```java
enum Priority { LOW, NORMAL, URGENT }

interface DeliveryChannel {
    void deliver(String priority, String message);
}

interface Schedule {
    void apply(String priority);
}

class EmailChannel implements DeliveryChannel {
    @Override
    public void deliver(String priority, String message) {
        System.out.println("[" + priority + "] Sending via Email: " + message);
    }
}

class SmsChannel implements DeliveryChannel {
    @Override
    public void deliver(String priority, String message) {
        System.out.println("[" + priority + "] Sending via SMS: " + message);
    }
}

class PushChannel implements DeliveryChannel {
    @Override
    public void deliver(String priority, String message) {
        System.out.println("[" + priority + "] Sending via Push Notification: " + message);
    }
}

class ImmediateSchedule implements Schedule {
    @Override
    public void apply(String priority) {
        System.out.println("[" + priority + "] Scheduling: sending immediately");
    }
}

class DelayedSchedule implements Schedule {
    private final int minutes;
    public DelayedSchedule(int minutes) { this.minutes = minutes; }

    @Override
    public void apply(String priority) {
        System.out.println("[" + priority + "] Scheduling: delayed by " + minutes + " minutes");
    }
}

class Notification {
    private final DeliveryChannel channel;
    private final Priority priority;
    private final Schedule schedule;

    public Notification(DeliveryChannel channel, Priority priority, Schedule schedule) {
        this.channel = channel;
        this.priority = priority;
        this.schedule = schedule;
    }

    public void send(String message) {
        schedule.apply(priority.name());
        channel.deliver(priority.name(), message);
    }
}

public class Main {
    public static void main(String[] args) {
        Notification urgentEmail = new Notification(
            new EmailChannel(), Priority.URGENT, new ImmediateSchedule());
        urgentEmail.send("Server is down!");

        System.out.println();

        Notification scheduledSms = new Notification(
            new SmsChannel(), Priority.LOW, new DelayedSchedule(30));
        scheduledSms.send("Weekly report is ready.");

        System.out.println();

        Notification pushNotif = new Notification(
            new PushChannel(), Priority.NORMAL, new ImmediateSchedule());
        pushNotif.send("You have a new follower.");
    }
}
```

```python
from abc import ABC, abstractmethod
from enum import Enum

class Priority(Enum):
    LOW = "LOW"
    NORMAL = "NORMAL"
    URGENT = "URGENT"

class DeliveryChannel(ABC):
    @abstractmethod
    def deliver(self, priority, message):
        pass

class Schedule(ABC):
    @abstractmethod
    def apply(self, priority):
        pass

class EmailChannel(DeliveryChannel):
    def deliver(self, priority, message):
        print(f"[{priority}] Sending via Email: {message}")

class SmsChannel(DeliveryChannel):
    def deliver(self, priority, message):
        print(f"[{priority}] Sending via SMS: {message}")

class PushChannel(DeliveryChannel):
    def deliver(self, priority, message):
        print(f"[{priority}] Sending via Push Notification: {message}")

class ImmediateSchedule(Schedule):
    def apply(self, priority):
        print(f"[{priority}] Scheduling: sending immediately")

class DelayedSchedule(Schedule):
    def __init__(self, minutes):
        self.minutes = minutes

    def apply(self, priority):
        print(f"[{priority}] Scheduling: delayed by {self.minutes} minutes")

class Notification:
    def __init__(self, channel, priority, schedule):
        self.channel = channel
        self.priority = priority
        self.schedule = schedule

    def send(self, message):
        self.schedule.apply(self.priority.value)
        self.channel.deliver(self.priority.value, message)

if __name__ == "__main__":
    urgent_email = Notification(
        EmailChannel(), Priority.URGENT, ImmediateSchedule())
    urgent_email.send("Server is down!")

    print()

    scheduled_sms = Notification(
        SmsChannel(), Priority.LOW, DelayedSchedule(30))
    scheduled_sms.send("Weekly report is ready.")

    print()

    push_notif = Notification(
        PushChannel(), Priority.NORMAL, ImmediateSchedule())
    push_notif.send("You have a new follower.")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

enum class Priority { LOW, NORMAL, URGENT };

string priorityName(Priority p) {
    switch (p) {
        case Priority::LOW:    return "LOW";
        case Priority::NORMAL: return "NORMAL";
        case Priority::URGENT: return "URGENT";
    }
    return "";
}

class DeliveryChannel {
public:
    virtual void deliver(const string& priority, const string& message) = 0;
    virtual ~DeliveryChannel() = default;
};

class Schedule {
public:
    virtual void apply(const string& priority) = 0;
    virtual ~Schedule() = default;
};

class EmailChannel : public DeliveryChannel {
public:
    void deliver(const string& priority, const string& message) override {
        cout << "[" << priority << "] Sending via Email: " << message << endl;
    }
};

class SmsChannel : public DeliveryChannel {
public:
    void deliver(const string& priority, const string& message) override {
        cout << "[" << priority << "] Sending via SMS: " << message << endl;
    }
};

class PushChannel : public DeliveryChannel {
public:
    void deliver(const string& priority, const string& message) override {
        cout << "[" << priority << "] Sending via Push Notification: " << message << endl;
    }
};

class ImmediateSchedule : public Schedule {
public:
    void apply(const string& priority) override {
        cout << "[" << priority << "] Scheduling: sending immediately" << endl;
    }
};

class DelayedSchedule : public Schedule {
    int minutes;
public:
    DelayedSchedule(int minutes) : minutes(minutes) {}
    void apply(const string& priority) override {
        cout << "[" << priority << "] Scheduling: delayed by " << minutes << " minutes" << endl;
    }
};

class Notification {
    DeliveryChannel* channel;
    Priority priority;
    Schedule* schedule;
public:
    Notification(DeliveryChannel* channel, Priority priority, Schedule* schedule)
        : channel(channel), priority(priority), schedule(schedule) {}

    void send(const string& message) {
        schedule->apply(priorityName(priority));
        channel->deliver(priorityName(priority), message);
    }
};

int main() {
    EmailChannel email;
    ImmediateSchedule immediate1;
    Notification urgentEmail(&email, Priority::URGENT, &immediate1);
    urgentEmail.send("Server is down!");

    cout << endl;

    SmsChannel sms;
    DelayedSchedule delayed(30);
    Notification scheduledSms(&sms, Priority::LOW, &delayed);
    scheduledSms.send("Weekly report is ready.");

    cout << endl;

    PushChannel push;
    ImmediateSchedule immediate2;
    Notification pushNotif(&push, Priority::NORMAL, &immediate2);
    pushNotif.send("You have a new follower.");

    return 0;
}
```

```go
package main

import "fmt"

type Priority string

const (
	LOW    Priority = "LOW"
	NORMAL Priority = "NORMAL"
	URGENT Priority = "URGENT"
)

type DeliveryChannel interface {
	Deliver(priority string, message string)
}

type Schedule interface {
	Apply(priority string)
}

type EmailChannel struct{}

func (e *EmailChannel) Deliver(priority string, message string) {
	fmt.Printf("[%s] Sending via Email: %s\n", priority, message)
}

type SmsChannel struct{}

func (s *SmsChannel) Deliver(priority string, message string) {
	fmt.Printf("[%s] Sending via SMS: %s\n", priority, message)
}

type PushChannel struct{}

func (p *PushChannel) Deliver(priority string, message string) {
	fmt.Printf("[%s] Sending via Push Notification: %s\n", priority, message)
}

type ImmediateSchedule struct{}

func (i *ImmediateSchedule) Apply(priority string) {
	fmt.Printf("[%s] Scheduling: sending immediately\n", priority)
}

type DelayedSchedule struct {
	minutes int
}

func NewDelayedSchedule(minutes int) *DelayedSchedule {
	return &DelayedSchedule{minutes: minutes}
}

func (d *DelayedSchedule) Apply(priority string) {
	fmt.Printf("[%s] Scheduling: delayed by %d minutes\n", priority, d.minutes)
}

type Notification struct {
	channel  DeliveryChannel
	priority Priority
	schedule Schedule
}

func NewNotification(channel DeliveryChannel, priority Priority, schedule Schedule) *Notification {
	return &Notification{
		channel:  channel,
		priority: priority,
		schedule: schedule,
	}
}

func (n *Notification) Send(message string) {
	n.schedule.Apply(string(n.priority))
	n.channel.Deliver(string(n.priority), message)
}

func main() {
	urgentEmail := NewNotification(
		&EmailChannel{}, URGENT, &ImmediateSchedule{})
	urgentEmail.Send("Server is down!")

	fmt.Println()

	scheduledSms := NewNotification(
		&SmsChannel{}, LOW, NewDelayedSchedule(30))
	scheduledSms.Send("Weekly report is ready.")

	fmt.Println()

	pushNotif := NewNotification(
		&PushChannel{}, NORMAL, &ImmediateSchedule{})
	pushNotif.Send("You have a new follower.")
}
```

```csharp
using System;

enum Priority { LOW, NORMAL, URGENT }

interface IDeliveryChannel
{
    void Deliver(string priority, string message);
}

interface ISchedule
{
    void Apply(string priority);
}

class EmailChannel : IDeliveryChannel
{
    public void Deliver(string priority, string message)
    {
        Console.WriteLine($"[{priority}] Sending via Email: {message}");
    }
}

class SmsChannel : IDeliveryChannel
{
    public void Deliver(string priority, string message)
    {
        Console.WriteLine($"[{priority}] Sending via SMS: {message}");
    }
}

class PushChannel : IDeliveryChannel
{
    public void Deliver(string priority, string message)
    {
        Console.WriteLine($"[{priority}] Sending via Push Notification: {message}");
    }
}

class ImmediateSchedule : ISchedule
{
    public void Apply(string priority)
    {
        Console.WriteLine($"[{priority}] Scheduling: sending immediately");
    }
}

class DelayedSchedule : ISchedule
{
    private readonly int minutes;
    public DelayedSchedule(int minutes) { this.minutes = minutes; }

    public void Apply(string priority)
    {
        Console.WriteLine($"[{priority}] Scheduling: delayed by {minutes} minutes");
    }
}

class Notification
{
    private readonly IDeliveryChannel channel;
    private readonly Priority priority;
    private readonly ISchedule schedule;

    public Notification(IDeliveryChannel channel, Priority priority, ISchedule schedule)
    {
        this.channel = channel;
        this.priority = priority;
        this.schedule = schedule;
    }

    public void Send(string message)
    {
        schedule.Apply(priority.ToString());
        channel.Deliver(priority.ToString(), message);
    }
}

class Program
{
    static void Main(string[] args)
    {
        var urgentEmail = new Notification(
            new EmailChannel(), Priority.URGENT, new ImmediateSchedule());
        urgentEmail.Send("Server is down!");

        Console.WriteLine();

        var scheduledSms = new Notification(
            new SmsChannel(), Priority.LOW, new DelayedSchedule(30));
        scheduledSms.Send("Weekly report is ready.");

        Console.WriteLine();

        var pushNotif = new Notification(
            new PushChannel(), Priority.NORMAL, new ImmediateSchedule());
        pushNotif.Send("You have a new follower.");
    }
}
```

```typescript
const Priority = { LOW: "LOW", NORMAL: "NORMAL", URGENT: "URGENT" } as const;
type Priority = typeof Priority[keyof typeof Priority];

interface DeliveryChannel {
    deliver(priority: string, message: string): void;
}

interface Schedule {
    apply(priority: string): void;
}

class EmailChannel implements DeliveryChannel {
    deliver(priority: string, message: string): void {
        console.log(`[${priority}] Sending via Email: ${message}`);
    }
}

class SmsChannel implements DeliveryChannel {
    deliver(priority: string, message: string): void {
        console.log(`[${priority}] Sending via SMS: ${message}`);
    }
}

class PushChannel implements DeliveryChannel {
    deliver(priority: string, message: string): void {
        console.log(`[${priority}] Sending via Push Notification: ${message}`);
    }
}

class ImmediateSchedule implements Schedule {
    apply(priority: string): void {
        console.log(`[${priority}] Scheduling: sending immediately`);
    }
}

class DelayedSchedule implements Schedule {
    private minutes: number;

    constructor(minutes: number) {
        this.minutes = minutes;
    }

    apply(priority: string): void {
        console.log(`[${priority}] Scheduling: delayed by ${this.minutes} minutes`);
    }
}

class Notification {
    private channel: DeliveryChannel;
    private priority: Priority;
    private schedule: Schedule;

    constructor(channel: DeliveryChannel, priority: Priority, schedule: Schedule) {
        this.channel = channel;
        this.priority = priority;
        this.schedule = schedule;
    }

    send(message: string): void {
        this.schedule.apply(this.priority);
        this.channel.deliver(this.priority, message);
    }
}

const urgentEmail = new Notification(
    new EmailChannel(), Priority.URGENT, new ImmediateSchedule());
urgentEmail.send("Server is down!");

console.log();

const scheduledSms = new Notification(
    new SmsChannel(), Priority.LOW, new DelayedSchedule(30));
scheduledSms.send("Weekly report is ready.");

console.log();

const pushNotif = new Notification(
    new PushChannel(), Priority.NORMAL, new ImmediateSchedule());
pushNotif.send("You have a new follower.");
```

---

# Exercise 2: CharacterCreator

**Problem:** You are building a role-playing game. Instead of creating classes like `SwordKnightWithFireball` and `BowRogueWithInvisibility`, the system uses composition: a `Character` composes a `Weapon`, an `Armor`, and an `Ability`. The interfaces, skeleton implementations, and `Character` class are provided, but the method bodies are empty. Your job is to fill in the TODOs so each component returns the correct description and the `Character` delegates to its composed objects.

**Requirements:**

- The interfaces (`Weapon`, `Armor`, `Ability`), skeleton implementations, and `Character` class are provided
- Fill in each weapon/armor/ability's method to return the correct description string
- Fill in `Character`'s `attack()`, `defend()`, and `useAbility()` methods to print the character's name followed by the component's description
- Do not change the `main` method

```java
interface Weapon {
    String attack();
}

interface Armor {
    String defend();
}

interface Ability {
    String useAbility();
}

class SwordWeapon implements Weapon {
    public String attack() {
        // TODO: Return "attacks with a sword: Slash!"
        return "";
    }
}

class BowWeapon implements Weapon {
    public String attack() {
        // TODO: Return "attacks with a bow: Arrow shot!"
        return "";
    }
}

class HeavyArmor implements Armor {
    public String defend() {
        // TODO: Return "defends with heavy armor: Blocks 80% damage"
        return "";
    }
}

class FireballAbility implements Ability {
    public String useAbility() {
        // TODO: Return "uses ability: Fireball! Deals 50 fire damage"
        return "";
    }
}

class Character {
    private String name;
    private Weapon weapon;
    private Armor armor;
    private Ability ability;

    public Character(String name, Weapon weapon, Armor armor, Ability ability) {
        this.name = name;
        this.weapon = weapon;
        this.armor = armor;
        this.ability = ability;
    }

    public void setWeapon(Weapon weapon) { this.weapon = weapon; }

    public void attack() {
        // TODO: Print "<name> <weapon.attack()>"
    }

    public void defend() {
        // TODO: Print "<name> <armor.defend()>"
    }

    public void useAbility() {
        // TODO: Print "<name> <ability.useAbility()>"
    }
}

public class Main {
    public static void main(String[] args) {
        Character knight = new Character("Arthur",
            new SwordWeapon(), new HeavyArmor(), new FireballAbility());
        knight.attack();
        knight.defend();
        knight.useAbility();

        System.out.println();
        System.out.println("Arthur finds a magic bow!");
        knight.setWeapon(new BowWeapon());
        knight.attack();
    }
}
```

```python
from abc import ABC, abstractmethod

class Weapon(ABC):
    @abstractmethod
    def attack(self):
        pass

class Armor(ABC):
    @abstractmethod
    def defend(self):
        pass

class Ability(ABC):
    @abstractmethod
    def use_ability(self):
        pass

class SwordWeapon(Weapon):
    def attack(self):
        # TODO: Return "attacks with a sword: Slash!"
        return ""

class BowWeapon(Weapon):
    def attack(self):
        # TODO: Return "attacks with a bow: Arrow shot!"
        return ""

class HeavyArmor(Armor):
    def defend(self):
        # TODO: Return "defends with heavy armor: Blocks 80% damage"
        return ""

class FireballAbility(Ability):
    def use_ability(self):
        # TODO: Return "uses ability: Fireball! Deals 50 fire damage"
        return ""

class Character:
    def __init__(self, name, weapon, armor, ability):
        self.name = name
        self.weapon = weapon
        self.armor = armor
        self.ability = ability

    def set_weapon(self, weapon):
        self.weapon = weapon

    def attack(self):
        # TODO: Print "<name> <weapon.attack()>"
        pass

    def defend(self):
        # TODO: Print "<name> <armor.defend()>"
        pass

    def use_ability(self):
        # TODO: Print "<name> <ability.use_ability()>"
        pass

if __name__ == "__main__":
    knight = Character("Arthur",
        SwordWeapon(), HeavyArmor(), FireballAbility())
    knight.attack()
    knight.defend()
    knight.use_ability()

    print()
    print("Arthur finds a magic bow!")
    knight.set_weapon(BowWeapon())
    knight.attack()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Weapon {
public:
    virtual string attack() = 0;
    virtual ~Weapon() = default;
};

class Armor {
public:
    virtual string defend() = 0;
    virtual ~Armor() = default;
};

class Ability {
public:
    virtual string useAbility() = 0;
    virtual ~Ability() = default;
};

class SwordWeapon : public Weapon {
public:
    string attack() override {
        // TODO: Return "attacks with a sword: Slash!"
        return "";
    }
};

class BowWeapon : public Weapon {
public:
    string attack() override {
        // TODO: Return "attacks with a bow: Arrow shot!"
        return "";
    }
};

class HeavyArmor : public Armor {
public:
    string defend() override {
        // TODO: Return "defends with heavy armor: Blocks 80% damage"
        return "";
    }
};

class FireballAbility : public Ability {
public:
    string useAbility() override {
        // TODO: Return "uses ability: Fireball! Deals 50 fire damage"
        return "";
    }
};

class Character {
    string name;
    Weapon* weapon;
    Armor* armor;
    Ability* ability;
public:
    Character(const string& name, Weapon* weapon, Armor* armor, Ability* ability)
        : name(name), weapon(weapon), armor(armor), ability(ability) {}

    void setWeapon(Weapon* w) { weapon = w; }

    void attack() {
        // TODO: Print "<name> <weapon->attack()>"
    }

    void defend() {
        // TODO: Print "<name> <armor->defend()>"
    }

    void useAbility() {
        // TODO: Print "<name> <ability->useAbility()>"
    }
};

int main() {
    SwordWeapon sword;
    BowWeapon bow;
    HeavyArmor heavyArmor;
    FireballAbility fireball;

    Character knight("Arthur", &sword, &heavyArmor, &fireball);
    knight.attack();
    knight.defend();
    knight.useAbility();

    cout << endl;
    cout << "Arthur finds a magic bow!" << endl;
    knight.setWeapon(&bow);
    knight.attack();

    return 0;
}
```

```go
package main

import "fmt"

type Weapon interface {
	Attack() string
}

type Armor interface {
	Defend() string
}

type Ability interface {
	UseAbility() string
}

type SwordWeapon struct{}

func (s *SwordWeapon) Attack() string {
	// TODO: Return "attacks with a sword: Slash!"
	return ""
}

type BowWeapon struct{}

func (b *BowWeapon) Attack() string {
	// TODO: Return "attacks with a bow: Arrow shot!"
	return ""
}

type HeavyArmor struct{}

func (h *HeavyArmor) Defend() string {
	// TODO: Return "defends with heavy armor: Blocks 80% damage"
	return ""
}

type FireballAbility struct{}

func (f *FireballAbility) UseAbility() string {
	// TODO: Return "uses ability: Fireball! Deals 50 fire damage"
	return ""
}

type Character struct {
	name    string
	weapon  Weapon
	armor   Armor
	ability Ability
}

func NewCharacter(name string, weapon Weapon, armor Armor, ability Ability) *Character {
	return &Character{
		name:    name,
		weapon:  weapon,
		armor:   armor,
		ability: ability,
	}
}

func (c *Character) SetWeapon(weapon Weapon) {
	c.weapon = weapon
}

func (c *Character) Attack() {
	// TODO: Print "<name> <weapon.attack()>"
	fmt.Println()
}

func (c *Character) Defend() {
	// TODO: Print "<name> <armor.defend()>"
	fmt.Println()
}

func (c *Character) UseAbility() {
	// TODO: Print "<name> <ability.useAbility()>"
	fmt.Println()
}

func main() {
	knight := NewCharacter("Arthur",
		&SwordWeapon{}, &HeavyArmor{}, &FireballAbility{})
	knight.Attack()
	knight.Defend()
	knight.UseAbility()

	fmt.Println()
	fmt.Println("Arthur finds a magic bow!")
	knight.SetWeapon(&BowWeapon{})
	knight.Attack()
}
```

```csharp
using System;

interface IWeapon
{
    string Attack();
}

interface IArmor
{
    string Defend();
}

interface IAbility
{
    string UseAbility();
}

class SwordWeapon : IWeapon
{
    public string Attack()
    {
        // TODO: Return "attacks with a sword: Slash!"
        return "";
    }
}

class BowWeapon : IWeapon
{
    public string Attack()
    {
        // TODO: Return "attacks with a bow: Arrow shot!"
        return "";
    }
}

class HeavyArmor : IArmor
{
    public string Defend()
    {
        // TODO: Return "defends with heavy armor: Blocks 80% damage"
        return "";
    }
}

class FireballAbility : IAbility
{
    public string UseAbility()
    {
        // TODO: Return "uses ability: Fireball! Deals 50 fire damage"
        return "";
    }
}

class Character
{
    private string name;
    private IWeapon weapon;
    private IArmor armor;
    private IAbility ability;

    public Character(string name, IWeapon weapon, IArmor armor, IAbility ability)
    {
        this.name = name;
        this.weapon = weapon;
        this.armor = armor;
        this.ability = ability;
    }

    public void SetWeapon(IWeapon weapon) { this.weapon = weapon; }

    public void Attack()
    {
        // TODO: Print "<name> <weapon.Attack()>"
    }

    public void Defend()
    {
        // TODO: Print "<name> <armor.Defend()>"
    }

    public void UseAbility()
    {
        // TODO: Print "<name> <ability.UseAbility()>"
    }
}

class Program
{
    static void Main(string[] args)
    {
        var knight = new Character("Arthur",
            new SwordWeapon(), new HeavyArmor(), new FireballAbility());
        knight.Attack();
        knight.Defend();
        knight.UseAbility();

        Console.WriteLine();
        Console.WriteLine("Arthur finds a magic bow!");
        knight.SetWeapon(new BowWeapon());
        knight.Attack();
    }
}
```

```typescript
interface Weapon {
    attack(): string;
}

interface Armor {
    defend(): string;
}

interface Ability {
    useAbility(): string;
}

class SwordWeapon implements Weapon {
    attack(): string {
        // TODO: Return "attacks with a sword: Slash!"
        return "";
    }
}

class BowWeapon implements Weapon {
    attack(): string {
        // TODO: Return "attacks with a bow: Arrow shot!"
        return "";
    }
}

class HeavyArmor implements Armor {
    defend(): string {
        // TODO: Return "defends with heavy armor: Blocks 80% damage"
        return "";
    }
}

class FireballAbility implements Ability {
    useAbility(): string {
        // TODO: Return "uses ability: Fireball! Deals 50 fire damage"
        return "";
    }
}

class Character {
    private name: string;
    private weapon: Weapon;
    private armor: Armor;
    private ability: Ability;

    constructor(name: string, weapon: Weapon, armor: Armor, ability: Ability) {
        this.name = name;
        this.weapon = weapon;
        this.armor = armor;
        this.ability = ability;
    }

    setWeapon(weapon: Weapon): void { this.weapon = weapon; }

    attack(): void {
        // TODO: Print "<name> <weapon.attack()>"
    }

    defend(): void {
        // TODO: Print "<name> <armor.defend()>"
    }

    useAbility(): void {
        // TODO: Print "<name> <ability.useAbility()>"
    }
}

const knight = new Character("Arthur",
    new SwordWeapon(), new HeavyArmor(), new FireballAbility());
knight.attack();
knight.defend();
knight.useAbility();

console.log();
console.log("Arthur finds a magic bow!");
knight.setWeapon(new BowWeapon());
knight.attack();
```

#### Solutions

```java
interface Weapon {
    String attack();
}

interface Armor {
    String defend();
}

interface Ability {
    String useAbility();
}

class SwordWeapon implements Weapon {
    public String attack() {
        return "attacks with a sword: Slash!";
    }
}

class BowWeapon implements Weapon {
    public String attack() {
        return "attacks with a bow: Arrow shot!";
    }
}

class HeavyArmor implements Armor {
    public String defend() {
        return "defends with heavy armor: Blocks 80% damage";
    }
}

class FireballAbility implements Ability {
    public String useAbility() {
        return "uses ability: Fireball! Deals 50 fire damage";
    }
}

class Character {
    private String name;
    private Weapon weapon;
    private Armor armor;
    private Ability ability;

    public Character(String name, Weapon weapon, Armor armor, Ability ability) {
        this.name = name;
        this.weapon = weapon;
        this.armor = armor;
        this.ability = ability;
    }

    public void setWeapon(Weapon weapon) { this.weapon = weapon; }

    public void attack() {
        System.out.println(name + " " + weapon.attack());
    }

    public void defend() {
        System.out.println(name + " " + armor.defend());
    }

    public void useAbility() {
        System.out.println(name + " " + ability.useAbility());
    }
}

public class Main {
    public static void main(String[] args) {
        Character knight = new Character("Arthur",
            new SwordWeapon(), new HeavyArmor(), new FireballAbility());
        knight.attack();
        knight.defend();
        knight.useAbility();

        System.out.println();
        System.out.println("Arthur finds a magic bow!");
        knight.setWeapon(new BowWeapon());
        knight.attack();
    }
}
```

```python
from abc import ABC, abstractmethod

class Weapon(ABC):
    @abstractmethod
    def attack(self):
        pass

class Armor(ABC):
    @abstractmethod
    def defend(self):
        pass

class Ability(ABC):
    @abstractmethod
    def use_ability(self):
        pass

class SwordWeapon(Weapon):
    def attack(self):
        return "attacks with a sword: Slash!"

class BowWeapon(Weapon):
    def attack(self):
        return "attacks with a bow: Arrow shot!"

class HeavyArmor(Armor):
    def defend(self):
        return "defends with heavy armor: Blocks 80% damage"

class FireballAbility(Ability):
    def use_ability(self):
        return "uses ability: Fireball! Deals 50 fire damage"

class Character:
    def __init__(self, name, weapon, armor, ability):
        self.name = name
        self.weapon = weapon
        self.armor = armor
        self.ability = ability

    def set_weapon(self, weapon):
        self.weapon = weapon

    def attack(self):
        print(f"{self.name} {self.weapon.attack()}")

    def defend(self):
        print(f"{self.name} {self.armor.defend()}")

    def use_ability(self):
        print(f"{self.name} {self.ability.use_ability()}")

if __name__ == "__main__":
    knight = Character("Arthur",
        SwordWeapon(), HeavyArmor(), FireballAbility())
    knight.attack()
    knight.defend()
    knight.use_ability()

    print()
    print("Arthur finds a magic bow!")
    knight.set_weapon(BowWeapon())
    knight.attack()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class Weapon {
public:
    virtual string attack() = 0;
    virtual ~Weapon() = default;
};

class Armor {
public:
    virtual string defend() = 0;
    virtual ~Armor() = default;
};

class Ability {
public:
    virtual string useAbility() = 0;
    virtual ~Ability() = default;
};

class SwordWeapon : public Weapon {
public:
    string attack() override {
        return "attacks with a sword: Slash!";
    }
};

class BowWeapon : public Weapon {
public:
    string attack() override {
        return "attacks with a bow: Arrow shot!";
    }
};

class HeavyArmor : public Armor {
public:
    string defend() override {
        return "defends with heavy armor: Blocks 80% damage";
    }
};

class FireballAbility : public Ability {
public:
    string useAbility() override {
        return "uses ability: Fireball! Deals 50 fire damage";
    }
};

class Character {
    string name;
    Weapon* weapon;
    Armor* armor;
    Ability* ability;
public:
    Character(const string& name, Weapon* weapon, Armor* armor, Ability* ability)
        : name(name), weapon(weapon), armor(armor), ability(ability) {}

    void setWeapon(Weapon* w) { weapon = w; }

    void attack() {
        cout << name << " " << weapon->attack() << endl;
    }

    void defend() {
        cout << name << " " << armor->defend() << endl;
    }

    void useAbility() {
        cout << name << " " << ability->useAbility() << endl;
    }
};

int main() {
    SwordWeapon sword;
    BowWeapon bow;
    HeavyArmor heavyArmor;
    FireballAbility fireball;

    Character knight("Arthur", &sword, &heavyArmor, &fireball);
    knight.attack();
    knight.defend();
    knight.useAbility();

    cout << endl;
    cout << "Arthur finds a magic bow!" << endl;
    knight.setWeapon(&bow);
    knight.attack();

    return 0;
}
```

```go
package main

import "fmt"

type Weapon interface {
	Attack() string
}

type Armor interface {
	Defend() string
}

type Ability interface {
	UseAbility() string
}

type SwordWeapon struct{}

func (SwordWeapon) Attack() string {
	return "attacks with a sword: Slash!"
}

type BowWeapon struct{}

func (BowWeapon) Attack() string {
	return "attacks with a bow: Arrow shot!"
}

type HeavyArmor struct{}

func (HeavyArmor) Defend() string {
	return "defends with heavy armor: Blocks 80% damage"
}

type FireballAbility struct{}

func (FireballAbility) UseAbility() string {
	return "uses ability: Fireball! Deals 50 fire damage"
}

type Character struct {
	name    string
	weapon  Weapon
	armor   Armor
	ability Ability
}

func NewCharacter(name string, weapon Weapon, armor Armor, ability Ability) *Character {
	return &Character{
		name:    name,
		weapon:  weapon,
		armor:   armor,
		ability: ability,
	}
}

func (c *Character) SetWeapon(weapon Weapon) {
	c.weapon = weapon
}

func (c *Character) Attack() {
	fmt.Println(c.name, c.weapon.Attack())
}

func (c *Character) Defend() {
	fmt.Println(c.name, c.armor.Defend())
}

func (c *Character) UseAbility() {
	fmt.Println(c.name, c.ability.UseAbility())
}

func main() {
	knight := NewCharacter("Arthur", SwordWeapon{}, HeavyArmor{}, FireballAbility{})
	knight.Attack()
	knight.Defend()
	knight.UseAbility()

	fmt.Println()
	fmt.Println("Arthur finds a magic bow!")
	knight.SetWeapon(BowWeapon{})
	knight.Attack()
}
```

```csharp
using System;

interface IWeapon
{
    string Attack();
}

interface IArmor
{
    string Defend();
}

interface IAbility
{
    string UseAbility();
}

class SwordWeapon : IWeapon
{
    public string Attack()
    {
        return "attacks with a sword: Slash!";
    }
}

class BowWeapon : IWeapon
{
    public string Attack()
    {
        return "attacks with a bow: Arrow shot!";
    }
}

class HeavyArmor : IArmor
{
    public string Defend()
    {
        return "defends with heavy armor: Blocks 80% damage";
    }
}

class FireballAbility : IAbility
{
    public string UseAbility()
    {
        return "uses ability: Fireball! Deals 50 fire damage";
    }
}

class Character
{
    private string name;
    private IWeapon weapon;
    private IArmor armor;
    private IAbility ability;

    public Character(string name, IWeapon weapon, IArmor armor, IAbility ability)
    {
        this.name = name;
        this.weapon = weapon;
        this.armor = armor;
        this.ability = ability;
    }

    public void SetWeapon(IWeapon weapon) { this.weapon = weapon; }

    public void Attack()
    {
        Console.WriteLine($"{name} {weapon.Attack()}");
    }

    public void Defend()
    {
        Console.WriteLine($"{name} {armor.Defend()}");
    }

    public void UseAbility()
    {
        Console.WriteLine($"{name} {ability.UseAbility()}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        var knight = new Character("Arthur",
            new SwordWeapon(), new HeavyArmor(), new FireballAbility());
        knight.Attack();
        knight.Defend();
        knight.UseAbility();

        Console.WriteLine();
        Console.WriteLine("Arthur finds a magic bow!");
        knight.SetWeapon(new BowWeapon());
        knight.Attack();
    }
}
```

```typescript
interface Weapon {
    attack(): string;
}

interface Armor {
    defend(): string;
}

interface Ability {
    useAbility(): string;
}

class SwordWeapon implements Weapon {
    attack(): string {
        return "attacks with a sword: Slash!";
    }
}

class BowWeapon implements Weapon {
    attack(): string {
        return "attacks with a bow: Arrow shot!";
    }
}

class HeavyArmor implements Armor {
    defend(): string {
        return "defends with heavy armor: Blocks 80% damage";
    }
}

class FireballAbility implements Ability {
    useAbility(): string {
        return "uses ability: Fireball! Deals 50 fire damage";
    }
}

class Character {
    private name: string;
    private weapon: Weapon;
    private armor: Armor;
    private ability: Ability;

    constructor(name: string, weapon: Weapon, armor: Armor, ability: Ability) {
        this.name = name;
        this.weapon = weapon;
        this.armor = armor;
        this.ability = ability;
    }

    setWeapon(weapon: Weapon): void { this.weapon = weapon; }

    attack(): void {
        console.log(`${this.name} ${this.weapon.attack()}`);
    }

    defend(): void {
        console.log(`${this.name} ${this.armor.defend()}`);
    }

    useAbility(): void {
        console.log(`${this.name} ${this.ability.useAbility()}`);
    }
}

const knight = new Character("Arthur",
    new SwordWeapon(), new HeavyArmor(), new FireballAbility());
knight.attack();
knight.defend();
knight.useAbility();

console.log();
console.log("Arthur finds a magic bow!");
knight.setWeapon(new BowWeapon());
knight.attack();
```


