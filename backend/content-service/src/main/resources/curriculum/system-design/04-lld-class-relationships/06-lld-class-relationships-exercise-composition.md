---
id: "lld-class-relationships-exercise-composition"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Class Relationships"
subSection: ""
title: "Exercise: Composition"
slug: "lld-class-relationships-exercise-composition"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Composition as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Composition Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Class Relationships","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Computer System

**Problem:** Build a `Computer` that composes a `CPU`, `RAM`, and `HardDrive`. The computer creates these parts internally based on specs passed to its constructor. No component exists outside of a computer, and destroying the computer destroys all its components.

**Requirements:**

- `CPU` with a model name and core count. A `describe()` method that prints the specs.
- `RAM` with a size in GB. A `describe()` method that prints the capacity.
- `HardDrive` with a capacity in GB. A `describe()` method that prints the capacity.
- `Computer` that takes spec parameters in its constructor and creates all three components internally. A `describeSpecs()` method that prints all component details.

```java
class CPU {
    private String model;
    private int cores;

    public CPU(String model, int cores) {
        this.model = model;
        this.cores = cores;
    }

    public void describe() {
        // TODO: Print CPU model and core count
    }
}

class RAM {
    private int sizeGB;

    public RAM(int sizeGB) {
        this.sizeGB = sizeGB;
    }

    public void describe() {
        // TODO: Print RAM size
    }

    public int getSizeGB() { return sizeGB; }
}

class HardDrive {
    private int capacityGB;

    public HardDrive(int capacityGB) {
        this.capacityGB = capacityGB;
    }

    public void describe() {
        // TODO: Print hard drive capacity
    }
}

class Computer {
    private String name;
    private CPU cpu;
    private RAM ram;
    private HardDrive hardDrive;

    public Computer(String name, String cpuModel, int cpuCores,
                    int ramGB, int storageGB) {
        this.name = name;
        // TODO: Create CPU, RAM, and HardDrive internally
    }

    public void describeSpecs() {
        // TODO: Print computer name and describe all components
    }

    public void upgradeRAM(int newSizeGB) {
        // TODO (Challenge): Replace RAM with a higher-capacity one
    }
}

public class Main {
    public static void main(String[] args) {
        Computer pc = new Computer("Dev Workstation",
            "Intel i7-13700K", 16, 32, 1000);

        pc.describeSpecs();

        // Challenge: upgrade RAM and verify
        pc.upgradeRAM(64);
        System.out.println("\nAfter RAM upgrade:");
        pc.describeSpecs();

        // When pc is destroyed, all components are destroyed with it.
    }
}
```

```python
class CPU:
    def __init__(self, model, cores):
        self.model = model
        self.cores = cores

    def describe(self):
        # TODO: Print CPU model and core count
        pass

class RAM:
    def __init__(self, size_gb):
        self.size_gb = size_gb

    def describe(self):
        # TODO: Print RAM size
        pass

class HardDrive:
    def __init__(self, capacity_gb):
        self.capacity_gb = capacity_gb

    def describe(self):
        # TODO: Print hard drive capacity
        pass

class Computer:
    def __init__(self, name, cpu_model, cpu_cores, ram_gb, storage_gb):
        self.name = name
        # TODO: Create CPU, RAM, and HardDrive internally
        self.cpu = None
        self.ram = None
        self.hard_drive = None

    def describe_specs(self):
        # TODO: Print computer name and describe all components
        pass

    def upgrade_ram(self, new_size_gb):
        # TODO (Challenge): Replace RAM with a higher-capacity one
        pass

if __name__ == "__main__":
    pc = Computer("Dev Workstation", "Intel i7-13700K", 16, 32, 1000)

    pc.describe_specs()

    # Challenge: upgrade RAM and verify
    pc.upgrade_ram(64)
    print("\nAfter RAM upgrade:")
    pc.describe_specs()

    # When pc is destroyed, all components are destroyed with it.
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class CPU {
private:
    string model;
    int cores;
public:
    CPU(const string& model, int cores) : model(model), cores(cores) {}

    void describe() const {
        // TODO: Print CPU model and core count
    }
};

class RAM {
private:
    int sizeGB;
public:
    RAM(int sizeGB) : sizeGB(sizeGB) {}

    void describe() const {
        // TODO: Print RAM size
    }

    int getSizeGB() const { return sizeGB; }
};

class HardDrive {
private:
    int capacityGB;
public:
    HardDrive(int capacityGB) : capacityGB(capacityGB) {}

    void describe() const {
        // TODO: Print hard drive capacity
    }
};

class Computer {
private:
    string name;
    CPU cpu;
    RAM ram;
    HardDrive hardDrive;
public:
    Computer(const string& name, const string& cpuModel, int cpuCores,
             int ramGB, int storageGB)
        : name(name),
          cpu("", 0),       // TODO: Initialize with actual values
          ram(0),            // TODO: Initialize with actual values
          hardDrive(0) {}    // TODO: Initialize with actual values

    void describeSpecs() const {
        // TODO: Print computer name and describe all components
    }

    void upgradeRAM(int newSizeGB) {
        // TODO (Challenge): Replace RAM with a higher-capacity one
    }
};

int main() {
    Computer pc("Dev Workstation", "Intel i7-13700K", 16, 32, 1000);

    pc.describeSpecs();

    // Challenge: upgrade RAM and verify
    pc.upgradeRAM(64);
    cout << "\nAfter RAM upgrade:" << endl;
    pc.describeSpecs();

    // When pc goes out of scope, all components are destroyed via RAII.
    return 0;
}
```

```go
package main

type CPU struct {
	model string
	cores int
}

func NewCPU(model string, cores int) *CPU {
	return &CPU{
		model: model,
		cores: cores,
	}
}

func (c *CPU) Describe() {
	// TODO: Print CPU model and core count
}

type RAM struct {
	sizeGB int
}

func NewRAM(sizeGB int) *RAM {
	return &RAM{
		sizeGB: sizeGB,
	}
}

func (r *RAM) Describe() {
	// TODO: Print RAM size
}

func (r *RAM) GetSizeGB() int {
	return r.sizeGB
}

type HardDrive struct {
	capacityGB int
}

func NewHardDrive(capacityGB int) *HardDrive {
	return &HardDrive{
		capacityGB: capacityGB,
	}
}

func (h *HardDrive) Describe() {
	// TODO: Print hard drive capacity
}

type Computer struct {
	name       string
	cpu        *CPU
	ram        *RAM
	hardDrive  *HardDrive
}

func NewComputer(name string, cpuModel string, cpuCores int, ramGB int, storageGB int) *Computer {
	return &Computer{
		name: name,
		// TODO: Create CPU, RAM, and HardDrive internally
		cpu:       nil,
		ram:       nil,
		hardDrive: nil,
	}
}

func (c *Computer) DescribeSpecs() {
	// TODO: Print computer name and describe all components
}

func (c *Computer) UpgradeRAM(newSizeGB int) {
	// TODO (Challenge): Replace RAM with a higher-capacity one
}

func main() {
	pc := NewComputer("Dev Workstation", "Intel i7-13700K", 16, 32, 1000)

	pc.DescribeSpecs()

	// Challenge: upgrade RAM and verify
	pc.UpgradeRAM(64)
	println("\nAfter RAM upgrade:")
	pc.DescribeSpecs()

	// When pc is destroyed, all components are destroyed with it.
}
```

```csharp
using System;

class CPU
{
    private string model;
    private int cores;

    public CPU(string model, int cores)
    {
        this.model = model;
        this.cores = cores;
    }

    public void Describe()
    {
        // TODO: Print CPU model and core count
    }
}

class RAM
{
    private int sizeGB;

    public RAM(int sizeGB)
    {
        this.sizeGB = sizeGB;
    }

    public void Describe()
    {
        // TODO: Print RAM size
    }

    public int GetSizeGB() { return sizeGB; }
}

class HardDrive
{
    private int capacityGB;

    public HardDrive(int capacityGB)
    {
        this.capacityGB = capacityGB;
    }

    public void Describe()
    {
        // TODO: Print hard drive capacity
    }
}

class Computer
{
    private string name;
    private CPU cpu;
    private RAM ram;
    private HardDrive hardDrive;

    public Computer(string name, string cpuModel, int cpuCores,
                    int ramGB, int storageGB)
    {
        this.name = name;
        // TODO: Create CPU, RAM, and HardDrive internally
    }

    public void DescribeSpecs()
    {
        // TODO: Print computer name and describe all components
    }

    public void UpgradeRAM(int newSizeGB)
    {
        // TODO (Challenge): Replace RAM with a higher-capacity one
    }
}

class Program
{
    static void Main()
    {
        Computer pc = new Computer("Dev Workstation",
            "Intel i7-13700K", 16, 32, 1000);

        pc.DescribeSpecs();

        // Challenge: upgrade RAM and verify
        pc.UpgradeRAM(64);
        Console.WriteLine("\nAfter RAM upgrade:");
        pc.DescribeSpecs();

        // When pc is garbage collected, all components go with it.
    }
}
```

```typescript
class CPU {
    private model: string;
    private cores: number;

    constructor(model: string, cores: number) {
        this.model = model;
        this.cores = cores;
    }

    describe(): void {
        // TODO: Print CPU model and core count
    }
}

class RAM {
    private sizeGB: number;

    constructor(sizeGB: number) {
        this.sizeGB = sizeGB;
    }

    describe(): void {
        // TODO: Print RAM size
    }

    getSizeGB(): number { return this.sizeGB; }
}

class HardDrive {
    private capacityGB: number;

    constructor(capacityGB: number) {
        this.capacityGB = capacityGB;
    }

    describe(): void {
        // TODO: Print hard drive capacity
    }
}

class Computer {
    private name: string;
    private cpu: CPU;
    private ram: RAM;
    private hardDrive: HardDrive;

    constructor(name: string, cpuModel: string, cpuCores: number,
                ramGB: number, storageGB: number) {
        this.name = name;
        // TODO: Create CPU, RAM, and HardDrive internally
        this.cpu = null as any;
        this.ram = null as any;
        this.hardDrive = null as any;
    }

    describeSpecs(): void {
        // TODO: Print computer name and describe all components
    }

    upgradeRAM(newSizeGB: number): void {
        // TODO (Challenge): Replace RAM with a higher-capacity one
    }
}

const pc = new Computer("Dev Workstation", "Intel i7-13700K", 16, 32, 1000);

pc.describeSpecs();

// Challenge: upgrade RAM and verify
pc.upgradeRAM(64);
console.log("\nAfter RAM upgrade:");
pc.describeSpecs();

// When pc is garbage collected, all components go with it.
```

#### Solutions

```java
class CPU {
    private String model;
    private int cores;

    public CPU(String model, int cores) {
        this.model = model;
        this.cores = cores;
    }

    public void describe() {
        System.out.println("  CPU: " + model + " (" + cores + " cores)");
    }
}

class RAM {
    private int sizeGB;

    public RAM(int sizeGB) {
        this.sizeGB = sizeGB;
    }

    public void describe() {
        System.out.println("  RAM: " + sizeGB + " GB");
    }

    public int getSizeGB() { return sizeGB; }
}

class HardDrive {
    private int capacityGB;

    public HardDrive(int capacityGB) {
        this.capacityGB = capacityGB;
    }

    public void describe() {
        System.out.println("  Storage: " + capacityGB + " GB");
    }
}

class Computer {
    private String name;
    private CPU cpu;
    private RAM ram;
    private HardDrive hardDrive;

    public Computer(String name, String cpuModel, int cpuCores,
                    int ramGB, int storageGB) {
        this.name = name;
        this.cpu = new CPU(cpuModel, cpuCores);
        this.ram = new RAM(ramGB);
        this.hardDrive = new HardDrive(storageGB);
    }

    public void describeSpecs() {
        System.out.println("Computer: " + name);
        cpu.describe();
        ram.describe();
        hardDrive.describe();
    }

    public void upgradeRAM(int newSizeGB) {
        this.ram = new RAM(newSizeGB);
    }
}

public class Main {
    public static void main(String[] args) {
        Computer pc = new Computer("Dev Workstation",
            "Intel i7-13700K", 16, 32, 1000);

        pc.describeSpecs();

        pc.upgradeRAM(64);
        System.out.println("\nAfter RAM upgrade:");
        pc.describeSpecs();
    }
}
```

```python
class CPU:
    def __init__(self, model, cores):
        self.model = model
        self.cores = cores

    def describe(self):
        print(f"  CPU: {self.model} ({self.cores} cores)")

class RAM:
    def __init__(self, size_gb):
        self.size_gb = size_gb

    def describe(self):
        print(f"  RAM: {self.size_gb} GB")

class HardDrive:
    def __init__(self, capacity_gb):
        self.capacity_gb = capacity_gb

    def describe(self):
        print(f"  Storage: {self.capacity_gb} GB")

class Computer:
    def __init__(self, name, cpu_model, cpu_cores, ram_gb, storage_gb):
        self.name = name
        self.cpu = CPU(cpu_model, cpu_cores)
        self.ram = RAM(ram_gb)
        self.hard_drive = HardDrive(storage_gb)

    def describe_specs(self):
        print(f"Computer: {self.name}")
        self.cpu.describe()
        self.ram.describe()
        self.hard_drive.describe()

    def upgrade_ram(self, new_size_gb):
        self.ram = RAM(new_size_gb)

if __name__ == "__main__":
    pc = Computer("Dev Workstation", "Intel i7-13700K", 16, 32, 1000)

    pc.describe_specs()

    pc.upgrade_ram(64)
    print("\nAfter RAM upgrade:")
    pc.describe_specs()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class CPU {
private:
    string model;
    int cores;
public:
    CPU(const string& model, int cores) : model(model), cores(cores) {}

    void describe() const {
        cout << "  CPU: " << model << " (" << cores << " cores)" << endl;
    }
};

class RAM {
private:
    int sizeGB;
public:
    RAM(int sizeGB) : sizeGB(sizeGB) {}

    void describe() const {
        cout << "  RAM: " << sizeGB << " GB" << endl;
    }

    int getSizeGB() const { return sizeGB; }
};

class HardDrive {
private:
    int capacityGB;
public:
    HardDrive(int capacityGB) : capacityGB(capacityGB) {}

    void describe() const {
        cout << "  Storage: " << capacityGB << " GB" << endl;
    }
};

class Computer {
private:
    string name;
    CPU cpu;
    RAM ram;
    HardDrive hardDrive;
public:
    Computer(const string& name, const string& cpuModel, int cpuCores,
             int ramGB, int storageGB)
        : name(name),
          cpu(cpuModel, cpuCores),
          ram(ramGB),
          hardDrive(storageGB) {}

    void describeSpecs() const {
        cout << "Computer: " << name << endl;
        cpu.describe();
        ram.describe();
        hardDrive.describe();
    }

    void upgradeRAM(int newSizeGB) {
        ram = RAM(newSizeGB);
    }
};

int main() {
    Computer pc("Dev Workstation", "Intel i7-13700K", 16, 32, 1000);

    pc.describeSpecs();

    pc.upgradeRAM(64);
    cout << "\nAfter RAM upgrade:" << endl;
    pc.describeSpecs();

    return 0;
}
```

```go
package main

import "fmt"

type CPU struct {
	model string
	cores int
}

func NewCPU(model string, cores int) CPU {
	return CPU{model: model, cores: cores}
}

func (c CPU) Describe() {
	fmt.Printf("  CPU: %s (%d cores)\n", c.model, c.cores)
}

type RAM struct {
	sizeGB int
}

func NewRAM(sizeGB int) RAM {
	return RAM{sizeGB: sizeGB}
}

func (r RAM) Describe() {
	fmt.Printf("  RAM: %d GB\n", r.sizeGB)
}

func (r RAM) GetSizeGB() int {
	return r.sizeGB
}

type HardDrive struct {
	capacityGB int
}

func NewHardDrive(capacityGB int) HardDrive {
	return HardDrive{capacityGB: capacityGB}
}

func (h HardDrive) Describe() {
	fmt.Printf("  Storage: %d GB\n", h.capacityGB)
}

type Computer struct {
	name       string
	cpu        CPU
	ram        RAM
	hardDrive  HardDrive
}

func NewComputer(name, cpuModel string, cpuCores, ramGB, storageGB int) *Computer {
	return &Computer{
		name:      name,
		cpu:       NewCPU(cpuModel, cpuCores),
		ram:       NewRAM(ramGB),
		hardDrive: NewHardDrive(storageGB),
	}
}

func (c *Computer) DescribeSpecs() {
	fmt.Printf("Computer: %s\n", c.name)
	c.cpu.Describe()
	c.ram.Describe()
	c.hardDrive.Describe()
}

func (c *Computer) UpgradeRAM(newSizeGB int) {
	c.ram = NewRAM(newSizeGB)
}

func main() {
	pc := NewComputer("Dev Workstation", "Intel i7-13700K", 16, 32, 1000)

	pc.DescribeSpecs()

	pc.UpgradeRAM(64)
	fmt.Println("\nAfter RAM upgrade:")
	pc.DescribeSpecs()
}
```

```csharp
using System;

class CPU
{
    private string model;
    private int cores;

    public CPU(string model, int cores)
    {
        this.model = model;
        this.cores = cores;
    }

    public void Describe()
    {
        Console.WriteLine($"  CPU: {model} ({cores} cores)");
    }
}

class RAM
{
    private int sizeGB;

    public RAM(int sizeGB)
    {
        this.sizeGB = sizeGB;
    }

    public void Describe()
    {
        Console.WriteLine($"  RAM: {sizeGB} GB");
    }

    public int GetSizeGB() { return sizeGB; }
}

class HardDrive
{
    private int capacityGB;

    public HardDrive(int capacityGB)
    {
        this.capacityGB = capacityGB;
    }

    public void Describe()
    {
        Console.WriteLine($"  Storage: {capacityGB} GB");
    }
}

class Computer
{
    private string name;
    private CPU cpu;
    private RAM ram;
    private HardDrive hardDrive;

    public Computer(string name, string cpuModel, int cpuCores,
                    int ramGB, int storageGB)
    {
        this.name = name;
        this.cpu = new CPU(cpuModel, cpuCores);
        this.ram = new RAM(ramGB);
        this.hardDrive = new HardDrive(storageGB);
    }

    public void DescribeSpecs()
    {
        Console.WriteLine($"Computer: {name}");
        cpu.Describe();
        ram.Describe();
        hardDrive.Describe();
    }

    public void UpgradeRAM(int newSizeGB)
    {
        this.ram = new RAM(newSizeGB);
    }
}

class Program
{
    static void Main()
    {
        Computer pc = new Computer("Dev Workstation",
            "Intel i7-13700K", 16, 32, 1000);

        pc.DescribeSpecs();

        pc.UpgradeRAM(64);
        Console.WriteLine("\nAfter RAM upgrade:");
        pc.DescribeSpecs();
    }
}
```

```typescript
class CPU {
    private model: string;
    private cores: number;

    constructor(model: string, cores: number) {
        this.model = model;
        this.cores = cores;
    }

    describe(): void {
        console.log(`  CPU: ${this.model} (${this.cores} cores)`);
    }
}

class RAM {
    private sizeGB: number;

    constructor(sizeGB: number) {
        this.sizeGB = sizeGB;
    }

    describe(): void {
        console.log(`  RAM: ${this.sizeGB} GB`);
    }

    getSizeGB(): number { return this.sizeGB; }
}

class HardDrive {
    private capacityGB: number;

    constructor(capacityGB: number) {
        this.capacityGB = capacityGB;
    }

    describe(): void {
        console.log(`  Storage: ${this.capacityGB} GB`);
    }
}

class Computer {
    private name: string;
    private cpu: CPU;
    private ram: RAM;
    private hardDrive: HardDrive;

    constructor(name: string, cpuModel: string, cpuCores: number,
                ramGB: number, storageGB: number) {
        this.name = name;
        this.cpu = new CPU(cpuModel, cpuCores);
        this.ram = new RAM(ramGB);
        this.hardDrive = new HardDrive(storageGB);
    }

    describeSpecs(): void {
        console.log(`Computer: ${this.name}`);
        this.cpu.describe();
        this.ram.describe();
        this.hardDrive.describe();
    }

    upgradeRAM(newSizeGB: number): void {
        this.ram = new RAM(newSizeGB);
    }
}

const pc = new Computer("Dev Workstation", "Intel i7-13700K", 16, 32, 1000);

pc.describeSpecs();

pc.upgradeRAM(64);
console.log("\nAfter RAM upgrade:");
pc.describeSpecs();
```

---

# Exercise 2: Chat Conversation System

**Problem:** A `Conversation` composes `Message` objects. Messages are created when `sendMessage(sender, text)` is called. Deleting a conversation deletes all its messages. Messages belong to exactly one conversation and have no meaning outside of it.

**Requirements:**

- `Message` with a sender name, text, and a timestamp. A `display()` method that prints the message.
- `Conversation` with a title and a list of `Message` objects. A `sendMessage(sender, text)` method that creates a `Message` internally. A `printHistory()` method that prints all messages. A `delete()` method that clears all messages.

```java
import java.util.ArrayList;
import java.util.List;

class Message {
    private String sender;
    private String text;
    private long timestamp;

    public Message(String sender, String text) {
        this.sender = sender;
        this.text = text;
        this.timestamp = System.currentTimeMillis();
    }

    public void display() {
        // TODO: Print message in format "[sender]: text"
    }

    public String getSender() { return sender; }
    public String getText() { return text; }
}

class Conversation {
    private String title;
    private List<Message> messages;

    public Conversation(String title) {
        this.title = title;
        this.messages = new ArrayList<>();
    }

    public void sendMessage(String sender, String text) {
        // TODO: Create a Message internally and add it to the list
    }

    public void printHistory() {
        // TODO: Print conversation title and all messages
    }

    public void delete() {
        // TODO: Clear all messages (they are destroyed with the conversation)
    }

    public int getMessageCount() { return messages.size(); }
    public String getTitle() { return title; }

    public void forwardMessage(Conversation target, int messageIndex) {
        // TODO (Challenge): Copy message content into a NEW Message
        // in the target conversation. Don't move the original.
    }
}

public class Main {
    public static void main(String[] args) {
        Conversation teamChat = new Conversation("Team Discussion");
        Conversation projectChat = new Conversation("Project Alpha");

        teamChat.sendMessage("Alice", "Hey team, standup in 5 minutes");
        teamChat.sendMessage("Bob", "Got it, joining now");
        teamChat.sendMessage("Alice", "Don't forget to update your tasks");

        projectChat.sendMessage("Charlie", "Deployment is scheduled for Friday");

        System.out.println("Before deletion:");
        teamChat.printHistory();
        System.out.println("Project chat has " + projectChat.getMessageCount() + " messages\n");

        // Challenge: forward a message
        teamChat.forwardMessage(projectChat, 2);
        System.out.println("After forwarding:");
        projectChat.printHistory();

        // Delete team chat - all its messages are destroyed
        teamChat.delete();
        System.out.println("\nAfter deleting team chat:");
        System.out.println("Team chat has " + teamChat.getMessageCount() + " messages");
        System.out.println("Project chat still has " + projectChat.getMessageCount() + " messages");
    }
}
```

```python
import time

class Message:
    def __init__(self, sender, text):
        self.sender = sender
        self.text = text
        self.timestamp = time.time()

    def display(self):
        # TODO: Print message in format "[sender]: text"
        pass

class Conversation:
    def __init__(self, title):
        self.title = title
        self.messages = []

    def send_message(self, sender, text):
        # TODO: Create a Message internally and add it to the list
        pass

    def print_history(self):
        # TODO: Print conversation title and all messages
        pass

    def delete(self):
        # TODO: Clear all messages (they are destroyed with the conversation)
        pass

    def get_message_count(self):
        return len(self.messages)

    def forward_message(self, target, message_index):
        # TODO (Challenge): Copy message content into a NEW Message
        # in the target conversation. Don't move the original.
        pass

if __name__ == "__main__":
    team_chat = Conversation("Team Discussion")
    project_chat = Conversation("Project Alpha")

    team_chat.send_message("Alice", "Hey team, standup in 5 minutes")
    team_chat.send_message("Bob", "Got it, joining now")
    team_chat.send_message("Alice", "Don't forget to update your tasks")

    project_chat.send_message("Charlie", "Deployment is scheduled for Friday")

    print("Before deletion:")
    team_chat.print_history()
    print(f"Project chat has {project_chat.get_message_count()} messages\n")

    # Challenge: forward a message
    team_chat.forward_message(project_chat, 2)
    print("After forwarding:")
    project_chat.print_history()

    # Delete team chat - all its messages are destroyed
    team_chat.delete()
    print("\nAfter deleting team chat:")
    print(f"Team chat has {team_chat.get_message_count()} messages")
    print(f"Project chat still has {project_chat.get_message_count()} messages")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <ctime>
using namespace std;

class Message {
private:
    string sender;
    string text;
    time_t timestamp;
public:
    Message(const string& sender, const string& text)
        : sender(sender), text(text), timestamp(time(nullptr)) {}

    void display() const {
        // TODO: Print message in format "[sender]: text"
    }

    string getSender() const { return sender; }
    string getText() const { return text; }
};

class Conversation {
private:
    string title;
    vector<Message> messages;
public:
    Conversation(const string& title) : title(title) {}

    void sendMessage(const string& sender, const string& text) {
        // TODO: Create a Message internally and add it to the list
    }

    void printHistory() const {
        // TODO: Print conversation title and all messages
    }

    void deleteConversation() {
        // TODO: Clear all messages (they are destroyed with the conversation)
    }

    int getMessageCount() const { return messages.size(); }
    string getTitle() const { return title; }

    void forwardMessage(Conversation& target, int messageIndex) {
        // TODO (Challenge): Copy message content into a NEW Message
        // in the target conversation. Don't move the original.
    }
};

int main() {
    Conversation teamChat("Team Discussion");
    Conversation projectChat("Project Alpha");

    teamChat.sendMessage("Alice", "Hey team, standup in 5 minutes");
    teamChat.sendMessage("Bob", "Got it, joining now");
    teamChat.sendMessage("Alice", "Don't forget to update your tasks");

    projectChat.sendMessage("Charlie", "Deployment is scheduled for Friday");

    cout << "Before deletion:" << endl;
    teamChat.printHistory();
    cout << "Project chat has " << projectChat.getMessageCount() << " messages" << endl << endl;

    // Challenge: forward a message
    teamChat.forwardMessage(projectChat, 2);
    cout << "After forwarding:" << endl;
    projectChat.printHistory();

    // Delete team chat - all its messages are destroyed
    teamChat.deleteConversation();
    cout << "\nAfter deleting team chat:" << endl;
    cout << "Team chat has " << teamChat.getMessageCount() << " messages" << endl;
    cout << "Project chat still has " << projectChat.getMessageCount() << " messages" << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"time"
)

type Message struct {
	sender    string
	text      string
	timestamp time.Time
}

func NewMessage(sender, text string) *Message {
	return &Message{
		sender:    sender,
		text:      text,
		timestamp: time.Now(),
	}
}

func (m *Message) Display() {
	// TODO: Print message in format "[sender]: text"
}

func (m *Message) GetSender() string {
	return m.sender
}

func (m *Message) GetText() string {
	return m.text
}

type Conversation struct {
	title    string
	messages []*Message
}

func NewConversation(title string) *Conversation {
	return &Conversation{
		title:    title,
		messages: []*Message{},
	}
}

func (c *Conversation) SendMessage(sender, text string) {
	// TODO: Create a Message internally and add it to the list
}

func (c *Conversation) PrintHistory() {
	// TODO: Print conversation title and all messages
}

func (c *Conversation) Delete() {
	// TODO: Clear all messages (they are destroyed with the conversation)
}

func (c *Conversation) GetMessageCount() int {
	return len(c.messages)
}

func (c *Conversation) GetTitle() string {
	return c.title
}

func (c *Conversation) ForwardMessage(target *Conversation, messageIndex int) {
	// TODO (Challenge): Copy message content into a NEW Message
	// in the target conversation. Don't move the original.
}

func main() {
	teamChat := NewConversation("Team Discussion")
	projectChat := NewConversation("Project Alpha")

	teamChat.SendMessage("Alice", "Hey team, standup in 5 minutes")
	teamChat.SendMessage("Bob", "Got it, joining now")
	teamChat.SendMessage("Alice", "Don't forget to update your tasks")

	projectChat.SendMessage("Charlie", "Deployment is scheduled for Friday")

	fmt.Println("Before deletion:")
	teamChat.PrintHistory()
	fmt.Printf("Project chat has %d messages\n\n", projectChat.GetMessageCount())

	// Challenge: forward a message
	teamChat.ForwardMessage(projectChat, 2)
	fmt.Println("After forwarding:")
	projectChat.PrintHistory()

	// Delete team chat - all its messages are destroyed
	teamChat.Delete()
	fmt.Println("\nAfter deleting team chat:")
	fmt.Printf("Team chat has %d messages\n", teamChat.GetMessageCount())
	fmt.Printf("Project chat still has %d messages\n", projectChat.GetMessageCount())
}
```

```csharp
using System;
using System.Collections.Generic;

class Message
{
    private string sender;
    private string text;
    private DateTime timestamp;

    public Message(string sender, string text)
    {
        this.sender = sender;
        this.text = text;
        this.timestamp = DateTime.Now;
    }

    public void Display()
    {
        // TODO: Print message in format "[sender]: text"
    }

    public string GetSender() { return sender; }
    public string GetText() { return text; }
}

class Conversation
{
    private string title;
    private List<Message> messages;

    public Conversation(string title)
    {
        this.title = title;
        this.messages = new List<Message>();
    }

    public void SendMessage(string sender, string text)
    {
        // TODO: Create a Message internally and add it to the list
    }

    public void PrintHistory()
    {
        // TODO: Print conversation title and all messages
    }

    public void Delete()
    {
        // TODO: Clear all messages (they are destroyed with the conversation)
    }

    public int GetMessageCount() { return messages.Count; }
    public string GetTitle() { return title; }

    public void ForwardMessage(Conversation target, int messageIndex)
    {
        // TODO (Challenge): Copy message content into a NEW Message
        // in the target conversation. Don't move the original.
    }
}

class Program
{
    static void Main()
    {
        Conversation teamChat = new Conversation("Team Discussion");
        Conversation projectChat = new Conversation("Project Alpha");

        teamChat.SendMessage("Alice", "Hey team, standup in 5 minutes");
        teamChat.SendMessage("Bob", "Got it, joining now");
        teamChat.SendMessage("Alice", "Don't forget to update your tasks");

        projectChat.SendMessage("Charlie", "Deployment is scheduled for Friday");

        Console.WriteLine("Before deletion:");
        teamChat.PrintHistory();
        Console.WriteLine($"Project chat has {projectChat.GetMessageCount()} messages\n");

        // Challenge: forward a message
        teamChat.ForwardMessage(projectChat, 2);
        Console.WriteLine("After forwarding:");
        projectChat.PrintHistory();

        // Delete team chat - all its messages are destroyed
        teamChat.Delete();
        Console.WriteLine("\nAfter deleting team chat:");
        Console.WriteLine($"Team chat has {teamChat.GetMessageCount()} messages");
        Console.WriteLine($"Project chat still has {projectChat.GetMessageCount()} messages");
    }
}
```

```typescript
class Message {
    private sender: string;
    private text: string;
    private timestamp: Date;

    constructor(sender: string, text: string) {
        this.sender = sender;
        this.text = text;
        this.timestamp = new Date();
    }

    display(): void {
        // TODO: Print message in format "[sender]: text"
    }

    getSender(): string { return this.sender; }
    getText(): string { return this.text; }
}

class Conversation {
    private title: string;
    private messages: Message[];

    constructor(title: string) {
        this.title = title;
        this.messages = [];
    }

    sendMessage(sender: string, text: string): void {
        // TODO: Create a Message internally and add it to the list
    }

    printHistory(): void {
        // TODO: Print conversation title and all messages
    }

    delete(): void {
        // TODO: Clear all messages (they are destroyed with the conversation)
    }

    getMessageCount(): number { return this.messages.length; }
    getTitle(): string { return this.title; }

    forwardMessage(target: Conversation, messageIndex: number): void {
        // TODO (Challenge): Copy message content into a NEW Message
        // in the target conversation. Don't move the original.
    }
}

const teamChat = new Conversation("Team Discussion");
const projectChat = new Conversation("Project Alpha");

teamChat.sendMessage("Alice", "Hey team, standup in 5 minutes");
teamChat.sendMessage("Bob", "Got it, joining now");
teamChat.sendMessage("Alice", "Don't forget to update your tasks");

projectChat.sendMessage("Charlie", "Deployment is scheduled for Friday");

console.log("Before deletion:");
teamChat.printHistory();
console.log(`Project chat has ${projectChat.getMessageCount()} messages\n`);

// Challenge: forward a message
teamChat.forwardMessage(projectChat, 2);
console.log("After forwarding:");
projectChat.printHistory();

// Delete team chat - all its messages are destroyed
teamChat.delete();
console.log("\nAfter deleting team chat:");
console.log(`Team chat has ${teamChat.getMessageCount()} messages`);
console.log(`Project chat still has ${projectChat.getMessageCount()} messages`);
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.List;

class Message {
    private String sender;
    private String text;
    private long timestamp;

    public Message(String sender, String text) {
        this.sender = sender;
        this.text = text;
        this.timestamp = System.currentTimeMillis();
    }

    public void display() {
        System.out.println("[" + sender + "]: " + text);
    }

    public String getSender() { return sender; }
    public String getText() { return text; }
}

class Conversation {
    private String title;
    private List<Message> messages;

    public Conversation(String title) {
        this.title = title;
        this.messages = new ArrayList<>();
    }

    public void sendMessage(String sender, String text) {
        messages.add(new Message(sender, text));
    }

    public void printHistory() {
        System.out.println("--- " + title + " ---");
        for (Message msg : messages) {
            msg.display();
        }
    }

    public void delete() {
        messages.clear();
    }

    public int getMessageCount() { return messages.size(); }
    public String getTitle() { return title; }

    public void forwardMessage(Conversation target, int messageIndex) {
        if (messageIndex >= 0 && messageIndex < messages.size()) {
            Message original = messages.get(messageIndex);
            target.sendMessage(original.getSender(), original.getText());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Conversation teamChat = new Conversation("Team Discussion");
        Conversation projectChat = new Conversation("Project Alpha");

        teamChat.sendMessage("Alice", "Hey team, standup in 5 minutes");
        teamChat.sendMessage("Bob", "Got it, joining now");
        teamChat.sendMessage("Alice", "Don't forget to update your tasks");

        projectChat.sendMessage("Charlie", "Deployment is scheduled for Friday");

        System.out.println("Before deletion:");
        teamChat.printHistory();
        System.out.println("Project chat has " + projectChat.getMessageCount() + " messages\n");

        teamChat.forwardMessage(projectChat, 2);
        System.out.println("After forwarding:");
        projectChat.printHistory();

        teamChat.delete();
        System.out.println("\nAfter deleting team chat:");
        System.out.println("Team chat has " + teamChat.getMessageCount() + " messages");
        System.out.println("Project chat still has " + projectChat.getMessageCount() + " messages");
    }
}
```

```python
import time

class Message:
    def __init__(self, sender, text):
        self.sender = sender
        self.text = text
        self.timestamp = time.time()

    def display(self):
        print(f"[{self.sender}]: {self.text}")

class Conversation:
    def __init__(self, title):
        self.title = title
        self.messages = []

    def send_message(self, sender, text):
        self.messages.append(Message(sender, text))

    def print_history(self):
        print(f"--- {self.title} ---")
        for msg in self.messages:
            msg.display()

    def delete(self):
        self.messages.clear()

    def get_message_count(self):
        return len(self.messages)

    def forward_message(self, target, message_index):
        if 0 <= message_index < len(self.messages):
            original = self.messages[message_index]
            target.send_message(original.sender, original.text)

if __name__ == "__main__":
    team_chat = Conversation("Team Discussion")
    project_chat = Conversation("Project Alpha")

    team_chat.send_message("Alice", "Hey team, standup in 5 minutes")
    team_chat.send_message("Bob", "Got it, joining now")
    team_chat.send_message("Alice", "Don't forget to update your tasks")

    project_chat.send_message("Charlie", "Deployment is scheduled for Friday")

    print("Before deletion:")
    team_chat.print_history()
    print(f"Project chat has {project_chat.get_message_count()} messages\n")

    team_chat.forward_message(project_chat, 2)
    print("After forwarding:")
    project_chat.print_history()

    team_chat.delete()
    print("\nAfter deleting team chat:")
    print(f"Team chat has {team_chat.get_message_count()} messages")
    print(f"Project chat still has {project_chat.get_message_count()} messages")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <ctime>
using namespace std;

class Message {
private:
    string sender;
    string text;
    time_t timestamp;
public:
    Message(const string& sender, const string& text)
        : sender(sender), text(text), timestamp(time(nullptr)) {}

    void display() const {
        cout << "[" << sender << "]: " << text << endl;
    }

    string getSender() const { return sender; }
    string getText() const { return text; }
};

class Conversation {
private:
    string title;
    vector<Message> messages;
public:
    Conversation(const string& title) : title(title) {}

    void sendMessage(const string& sender, const string& text) {
        messages.emplace_back(sender, text);
    }

    void printHistory() const {
        cout << "--- " << title << " ---" << endl;
        for (const auto& msg : messages) {
            msg.display();
        }
    }

    void deleteConversation() {
        messages.clear();
    }

    int getMessageCount() const { return messages.size(); }
    string getTitle() const { return title; }

    void forwardMessage(Conversation& target, int messageIndex) {
        if (messageIndex >= 0 && messageIndex < (int)messages.size()) {
            const Message& original = messages[messageIndex];
            target.sendMessage(original.getSender(), original.getText());
        }
    }
};

int main() {
    Conversation teamChat("Team Discussion");
    Conversation projectChat("Project Alpha");

    teamChat.sendMessage("Alice", "Hey team, standup in 5 minutes");
    teamChat.sendMessage("Bob", "Got it, joining now");
    teamChat.sendMessage("Alice", "Don't forget to update your tasks");

    projectChat.sendMessage("Charlie", "Deployment is scheduled for Friday");

    cout << "Before deletion:" << endl;
    teamChat.printHistory();
    cout << "Project chat has " << projectChat.getMessageCount() << " messages" << endl << endl;

    teamChat.forwardMessage(projectChat, 2);
    cout << "After forwarding:" << endl;
    projectChat.printHistory();

    teamChat.deleteConversation();
    cout << "\nAfter deleting team chat:" << endl;
    cout << "Team chat has " << teamChat.getMessageCount() << " messages" << endl;
    cout << "Project chat still has " << projectChat.getMessageCount() << " messages" << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"time"
)

type Message struct {
	sender    string
	text      string
	timestamp time.Time
}

func NewMessage(sender, text string) Message {
	return Message{
		sender:    sender,
		text:      text,
		timestamp: time.Now(),
	}
}

func (m Message) Display() {
	fmt.Printf("[%s]: %s\n", m.sender, m.text)
}

func (m Message) GetSender() string { return m.sender }
func (m Message) GetText() string    { return m.text }

type Conversation struct {
	title    string
	messages []Message
}

func NewConversation(title string) *Conversation {
	return &Conversation{
		title:    title,
		messages: make([]Message, 0),
	}
}

func (c *Conversation) SendMessage(sender, text string) {
	c.messages = append(c.messages, NewMessage(sender, text))
}

func (c *Conversation) PrintHistory() {
	fmt.Printf("--- %s ---\n", c.title)
	for _, msg := range c.messages {
		msg.Display()
	}
}

func (c *Conversation) Delete() {
	c.messages = c.messages[:0]
}

func (c *Conversation) GetMessageCount() int { return len(c.messages) }
func (c *Conversation) GetTitle() string     { return c.title }

func (c *Conversation) ForwardMessage(target *Conversation, messageIndex int) {
	if messageIndex >= 0 && messageIndex < len(c.messages) {
		original := c.messages[messageIndex]
		target.SendMessage(original.GetSender(), original.GetText())
	}
}

func main() {
	teamChat := NewConversation("Team Discussion")
	projectChat := NewConversation("Project Alpha")

	teamChat.SendMessage("Alice", "Hey team, standup in 5 minutes")
	teamChat.SendMessage("Bob", "Got it, joining now")
	teamChat.SendMessage("Alice", "Don't forget to update your tasks")

	projectChat.SendMessage("Charlie", "Deployment is scheduled for Friday")

	fmt.Println("Before deletion:")
	teamChat.PrintHistory()
	fmt.Printf("Project chat has %d messages\n\n", projectChat.GetMessageCount())

	teamChat.ForwardMessage(projectChat, 2)
	fmt.Println("After forwarding:")
	projectChat.PrintHistory()

	teamChat.Delete()
	fmt.Println("\nAfter deleting team chat:")
	fmt.Printf("Team chat has %d messages\n", teamChat.GetMessageCount())
	fmt.Printf("Project chat still has %d messages\n", projectChat.GetMessageCount())
}
```

```csharp
using System;
using System.Collections.Generic;

class Message
{
    private string sender;
    private string text;
    private DateTime timestamp;

    public Message(string sender, string text)
    {
        this.sender = sender;
        this.text = text;
        this.timestamp = DateTime.Now;
    }

    public void Display()
    {
        Console.WriteLine($"[{sender}]: {text}");
    }

    public string GetSender() { return sender; }
    public string GetText() { return text; }
}

class Conversation
{
    private string title;
    private List<Message> messages;

    public Conversation(string title)
    {
        this.title = title;
        this.messages = new List<Message>();
    }

    public void SendMessage(string sender, string text)
    {
        messages.Add(new Message(sender, text));
    }

    public void PrintHistory()
    {
        Console.WriteLine($"--- {title} ---");
        foreach (var msg in messages)
        {
            msg.Display();
        }
    }

    public void Delete()
    {
        messages.Clear();
    }

    public int GetMessageCount() { return messages.Count; }
    public string GetTitle() { return title; }

    public void ForwardMessage(Conversation target, int messageIndex)
    {
        if (messageIndex >= 0 && messageIndex < messages.Count)
        {
            Message original = messages[messageIndex];
            target.SendMessage(original.GetSender(), original.GetText());
        }
    }
}

class Program
{
    static void Main()
    {
        Conversation teamChat = new Conversation("Team Discussion");
        Conversation projectChat = new Conversation("Project Alpha");

        teamChat.SendMessage("Alice", "Hey team, standup in 5 minutes");
        teamChat.SendMessage("Bob", "Got it, joining now");
        teamChat.SendMessage("Alice", "Don't forget to update your tasks");

        projectChat.SendMessage("Charlie", "Deployment is scheduled for Friday");

        Console.WriteLine("Before deletion:");
        teamChat.PrintHistory();
        Console.WriteLine($"Project chat has {projectChat.GetMessageCount()} messages\n");

        teamChat.ForwardMessage(projectChat, 2);
        Console.WriteLine("After forwarding:");
        projectChat.PrintHistory();

        teamChat.Delete();
        Console.WriteLine("\nAfter deleting team chat:");
        Console.WriteLine($"Team chat has {teamChat.GetMessageCount()} messages");
        Console.WriteLine($"Project chat still has {projectChat.GetMessageCount()} messages");
    }
}
```

```typescript
class Message {
    private sender: string;
    private text: string;
    private timestamp: Date;

    constructor(sender: string, text: string) {
        this.sender = sender;
        this.text = text;
        this.timestamp = new Date();
    }

    display(): void {
        console.log(`[${this.sender}]: ${this.text}`);
    }

    getSender(): string { return this.sender; }
    getText(): string { return this.text; }
}

class Conversation {
    private title: string;
    private messages: Message[];

    constructor(title: string) {
        this.title = title;
        this.messages = [];
    }

    sendMessage(sender: string, text: string): void {
        this.messages.push(new Message(sender, text));
    }

    printHistory(): void {
        console.log(`--- ${this.title} ---`);
        for (const msg of this.messages) {
            msg.display();
        }
    }

    delete(): void {
        this.messages = [];
    }

    getMessageCount(): number { return this.messages.length; }
    getTitle(): string { return this.title; }

    forwardMessage(target: Conversation, messageIndex: number): void {
        if (messageIndex >= 0 && messageIndex < this.messages.length) {
            const original = this.messages[messageIndex];
            target.sendMessage(original.getSender(), original.getText());
        }
    }
}

const teamChat = new Conversation("Team Discussion");
const projectChat = new Conversation("Project Alpha");

teamChat.sendMessage("Alice", "Hey team, standup in 5 minutes");
teamChat.sendMessage("Bob", "Got it, joining now");
teamChat.sendMessage("Alice", "Don't forget to update your tasks");

projectChat.sendMessage("Charlie", "Deployment is scheduled for Friday");

console.log("Before deletion:");
teamChat.printHistory();
console.log(`Project chat has ${projectChat.getMessageCount()} messages\n`);

teamChat.forwardMessage(projectChat, 2);
console.log("After forwarding:");
projectChat.printHistory();

teamChat.delete();
console.log("\nAfter deleting team chat:");
console.log(`Team chat has ${teamChat.getMessageCount()} messages`);
console.log(`Project chat still has ${projectChat.getMessageCount()} messages`);
```


