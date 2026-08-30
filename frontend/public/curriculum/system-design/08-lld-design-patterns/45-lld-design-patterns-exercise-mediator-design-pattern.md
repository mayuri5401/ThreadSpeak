---
id: "lld-design-patterns-exercise-mediator-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Mediator Design Pattern"
slug: "lld-design-patterns-exercise-mediator-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Mediator Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Mediator Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Smart Home Controller

Build a smart home system where devices interact through a central hub mediator. When one device changes state, the hub coordinates responses from other devices. Devices should not know about each other.

**Requirements:**

- `SmartHomeMediator` interface with `notify(device, event)` and `registerDevice(device)` methods
- `SmartDevice` abstract class with a reference to the mediator and a `name`
- `Thermostat` device: when temperature exceeds 75, emits `"TEMP_HIGH"` event
- `Lights` device: can be turned on and off via `receiveCommand(command)`
- `AirConditioner` device: can be turned on and off via `receiveCommand(command)`
- `SmartHomeHub` mediator: when `"TEMP_HIGH"` received, turns on AC; when `"TEMP_NORMAL"` received, turns off AC; when `"NIGHT_MODE"` received, turns off lights

```java
import java.util.*;

interface SmartHomeMediator {
    void notify(SmartDevice device, String event);
    void registerDevice(SmartDevice device);
}

abstract class SmartDevice {
    protected SmartHomeMediator mediator;
    protected String name;

    public SmartDevice(SmartHomeMediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }

    public String getName() { return name; }
    public abstract void receiveCommand(String command);
}

// Colleagues
class Thermostat extends SmartDevice {
    private int temperature = 72;

    public Thermostat(SmartHomeMediator mediator, String name) {
        super(mediator, name);
    }

    public void setTemperature(int temp) {
        // TODO: Set temperature field to temp
        // TODO: Print "Name: Temperature set to X"
        // TODO: If temp > 75, notify mediator with "TEMP_HIGH"
        // TODO: If temp <= 75, notify mediator with "TEMP_NORMAL"
    }

    @Override
    public void receiveCommand(String command) {
        // TODO: Handle commands if needed
    }
}

class Lights extends SmartDevice {
    public Lights(SmartHomeMediator mediator, String name) {
        super(mediator, name);
    }

    @Override
    public void receiveCommand(String command) {
        // TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
    }
}

class AirConditioner extends SmartDevice {
    public AirConditioner(SmartHomeMediator mediator, String name) {
        super(mediator, name);
    }

    @Override
    public void receiveCommand(String command) {
        // TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
    }
}

// Concrete Mediator
class SmartHomeHub implements SmartHomeMediator {
    private List<SmartDevice> devices = new ArrayList<>();

    @Override
    public void registerDevice(SmartDevice device) {
        // TODO: Add device to the list
    }

    @Override
    public void notify(SmartDevice device, String event) {
        // TODO: Print "[SmartHomeHub] EVENT detected. Action message."
        // TODO: "TEMP_HIGH" -> find AirConditioner, send "ON" command
        // TODO: "TEMP_NORMAL" -> find AirConditioner, send "OFF" command
        // TODO: "NIGHT_MODE" -> find Lights, send "OFF" command
    }
}

public class Main {
    public static void main(String[] args) {
        // SmartHomeHub hub = new SmartHomeHub();
        // Thermostat thermostat = new Thermostat(hub, "Living Room Thermostat");
        // Lights lights = new Lights(hub, "Living Room Lights");
        // AirConditioner ac = new AirConditioner(hub, "Central AC");
        // hub.registerDevice(thermostat);
        // hub.registerDevice(lights);
        // hub.registerDevice(ac);
        // thermostat.setTemperature(80);  // should trigger AC on
        // thermostat.setTemperature(70);  // should trigger AC off
        // hub.notify(lights, "NIGHT_MODE"); // should turn off lights
    }
}
```

```python
from abc import ABC, abstractmethod

class SmartHomeMediator(ABC):
    @abstractmethod
    def notify(self, device, event):
        pass

    @abstractmethod
    def register_device(self, device):
        pass

class SmartDevice(ABC):
    def __init__(self, mediator, name):
        self.mediator = mediator
        self.name = name

    @abstractmethod
    def receive_command(self, command):
        pass

# Colleagues
class Thermostat(SmartDevice):
    def __init__(self, mediator, name):
        super().__init__(mediator, name)
        self.temperature = 72

    def set_temperature(self, temp):
        # TODO: Set temperature field to temp
        # TODO: Print "Name: Temperature set to X"
        # TODO: If temp > 75, notify mediator with "TEMP_HIGH"
        # TODO: If temp <= 75, notify mediator with "TEMP_NORMAL"
        pass

    def receive_command(self, command):
        # TODO: Handle commands if needed
        pass

class Lights(SmartDevice):
    def __init__(self, mediator, name):
        super().__init__(mediator, name)

    def receive_command(self, command):
        # TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
        pass

class AirConditioner(SmartDevice):
    def __init__(self, mediator, name):
        super().__init__(mediator, name)

    def receive_command(self, command):
        # TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
        pass

# Concrete Mediator
class SmartHomeHub(SmartHomeMediator):
    def __init__(self):
        self.devices = []

    def register_device(self, device):
        # TODO: Add device to the list
        pass

    def notify(self, device, event):
        # TODO: Print "[SmartHomeHub] EVENT detected. Action message."
        # TODO: "TEMP_HIGH" -> find AirConditioner, send "ON" command
        # TODO: "TEMP_NORMAL" -> find AirConditioner, send "OFF" command
        # TODO: "NIGHT_MODE" -> find Lights, send "OFF" command
        pass

if __name__ == "__main__":
    # hub = SmartHomeHub()
    # thermostat = Thermostat(hub, "Living Room Thermostat")
    # lights = Lights(hub, "Living Room Lights")
    # ac = AirConditioner(hub, "Central AC")
    # hub.register_device(thermostat)
    # hub.register_device(lights)
    # hub.register_device(ac)
    # thermostat.set_temperature(80)
    # thermostat.set_temperature(70)
    # hub.notify(lights, "NIGHT_MODE")
    pass
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
using namespace std;

class SmartDevice;

class SmartHomeMediator {
public:
    virtual ~SmartHomeMediator() = default;
    virtual void notify(SmartDevice* device, const string& event) = 0;
    virtual void registerDevice(SmartDevice* device) = 0;
};

class SmartDevice {
protected:
    SmartHomeMediator* mediator;
    string name;
public:
    SmartDevice(SmartHomeMediator* mediator, const string& name) : mediator(mediator), name(name) {}
    virtual ~SmartDevice() = default;
    string getName() const { return name; }
    virtual void receiveCommand(const string& command) = 0;
};

// Colleagues
class Thermostat : public SmartDevice {
    int temperature = 72;
public:
    Thermostat(SmartHomeMediator* mediator, const string& name) : SmartDevice(mediator, name) {}

    void setTemperature(int temp) {
        // TODO: Set temperature field to temp
        // TODO: Print "Name: Temperature set to X"
        // TODO: If temp > 75, notify mediator with "TEMP_HIGH"
        // TODO: If temp <= 75, notify mediator with "TEMP_NORMAL"
    }

    void receiveCommand(const string& command) override {
        // TODO: Handle commands if needed
    }
};

class Lights : public SmartDevice {
public:
    Lights(SmartHomeMediator* mediator, const string& name) : SmartDevice(mediator, name) {}

    void receiveCommand(const string& command) override {
        // TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
    }
};

class AirConditioner : public SmartDevice {
public:
    AirConditioner(SmartHomeMediator* mediator, const string& name) : SmartDevice(mediator, name) {}

    void receiveCommand(const string& command) override {
        // TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
    }
};

// Concrete Mediator
class SmartHomeHub : public SmartHomeMediator {
    vector<SmartDevice*> devices;
public:
    void registerDevice(SmartDevice* device) override {
        // TODO: Add device to the list
    }

    void notify(SmartDevice* device, const string& event) override {
        // TODO: Print "[SmartHomeHub] EVENT detected. Action message."
        // TODO: "TEMP_HIGH" -> find AirConditioner, send "ON" command
        // TODO: "TEMP_NORMAL" -> find AirConditioner, send "OFF" command
        // TODO: "NIGHT_MODE" -> find Lights, send "OFF" command
    }
};

int main() {
    // SmartHomeHub hub;
    // Thermostat thermostat(&hub, "Living Room Thermostat");
    // Lights lights(&hub, "Living Room Lights");
    // AirConditioner ac(&hub, "Central AC");
    // hub.registerDevice(&thermostat);
    // hub.registerDevice(&lights);
    // hub.registerDevice(&ac);
    // thermostat.setTemperature(80);
    // thermostat.setTemperature(70);
    // hub.notify(&lights, "NIGHT_MODE");
    return 0;
}
```

```go
package main

type SmartHomeMediator interface {
	Notify(device SmartDevice, event string)
	RegisterDevice(device SmartDevice)
}

type SmartDevice interface {
	GetName() string
	ReceiveCommand(command string)
}

// Colleagues
type DeviceBase struct {
	mediator SmartHomeMediator
	name     string
}

func (d *DeviceBase) GetName() string {
	return d.name
}

type Thermostat struct {
	DeviceBase
	temperature int
}

func NewThermostat(mediator SmartHomeMediator, name string) *Thermostat {
	return &Thermostat{
		DeviceBase: DeviceBase{
			mediator: mediator,
			name:     name,
		},
		temperature: 72,
	}
}

func (t *Thermostat) SetTemperature(temp int) {
	// TODO: Set temperature field to temp
	// TODO: Print "Name: Temperature set to X"
	// TODO: If temp > 75, notify mediator with "TEMP_HIGH"
	// TODO: If temp <= 75, notify mediator with "TEMP_NORMAL"
}

func (t *Thermostat) ReceiveCommand(command string) {
	// TODO: Handle commands if needed
}

type Lights struct {
	DeviceBase
}

func NewLights(mediator SmartHomeMediator, name string) *Lights {
	return &Lights{
		DeviceBase: DeviceBase{
			mediator: mediator,
			name:     name,
		},
	}
}

func (l *Lights) ReceiveCommand(command string) {
	// TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
}

type AirConditioner struct {
	DeviceBase
}

func NewAirConditioner(mediator SmartHomeMediator, name string) *AirConditioner {
	return &AirConditioner{
		DeviceBase: DeviceBase{
			mediator: mediator,
			name:     name,
		},
	}
}

func (a *AirConditioner) ReceiveCommand(command string) {
	// TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
}

// Concrete Mediator
type SmartHomeHub struct {
	devices []SmartDevice
}

func NewSmartHomeHub() *SmartHomeHub {
	return &SmartHomeHub{
		devices: []SmartDevice{},
	}
}

func (s *SmartHomeHub) RegisterDevice(device SmartDevice) {
	// TODO: Add device to the list
}

func (s *SmartHomeHub) Notify(device SmartDevice, event string) {
	// TODO: Print "[SmartHomeHub] EVENT detected. Action message."
	// TODO: "TEMP_HIGH" -> find AirConditioner, send "ON" command
	// TODO: "TEMP_NORMAL" -> find AirConditioner, send "OFF" command
	// TODO: "NIGHT_MODE" -> find Lights, send "OFF" command
}

func main() {
	// hub := NewSmartHomeHub()
	// thermostat := NewThermostat(hub, "Living Room Thermostat")
	// lights := NewLights(hub, "Living Room Lights")
	// ac := NewAirConditioner(hub, "Central AC")
	// hub.RegisterDevice(thermostat)
	// hub.RegisterDevice(lights)
	// hub.RegisterDevice(ac)
	// thermostat.SetTemperature(80)
	// thermostat.SetTemperature(70)
	// hub.Notify(lights, "NIGHT_MODE")
}
```

```csharp
using System;
using System.Collections.Generic;

interface ISmartHomeMediator
{
    void Notify(SmartDevice device, string eventName);
    void RegisterDevice(SmartDevice device);
}

abstract class SmartDevice
{
    protected ISmartHomeMediator mediator;
    protected string name;

    public SmartDevice(ISmartHomeMediator mediator, string name)
    {
        this.mediator = mediator;
        this.name = name;
    }

    public string Name => name;
    public abstract void ReceiveCommand(string command);
}

// Colleagues
class Thermostat : SmartDevice
{
    private int temperature = 72;

    public Thermostat(ISmartHomeMediator mediator, string name) : base(mediator, name)
    {
    }

    public void SetTemperature(int temp)
    {
        // TODO: Set temperature field to temp
        // TODO: Print "Name: Temperature set to X"
        // TODO: If temp > 75, notify mediator with "TEMP_HIGH"
        // TODO: If temp <= 75, notify mediator with "TEMP_NORMAL"
    }

    public override void ReceiveCommand(string command)
    {
        // TODO: Handle commands if needed
    }
}

class Lights : SmartDevice
{
    public Lights(ISmartHomeMediator mediator, string name) : base(mediator, name)
    {
    }

    public override void ReceiveCommand(string command)
    {
        // TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
    }
}

class AirConditioner : SmartDevice
{
    public AirConditioner(ISmartHomeMediator mediator, string name) : base(mediator, name)
    {
    }

    public override void ReceiveCommand(string command)
    {
        // TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
    }
}

// Concrete Mediator
class SmartHomeHub : ISmartHomeMediator
{
    private List<SmartDevice> devices = new List<SmartDevice>();

    public void RegisterDevice(SmartDevice device)
    {
        // TODO: Add device to the list
    }

    public void Notify(SmartDevice device, string eventName)
    {
        // TODO: Print "[SmartHomeHub] EVENT detected. Action message."
        // TODO: "TEMP_HIGH" -> find AirConditioner, send "ON" command
        // TODO: "TEMP_NORMAL" -> find AirConditioner, send "OFF" command
        // TODO: "NIGHT_MODE" -> find Lights, send "OFF" command
    }
}

class Program
{
    static void Main(string[] args)
    {
        // SmartHomeHub hub = new SmartHomeHub();
        // Thermostat thermostat = new Thermostat(hub, "Living Room Thermostat");
        // Lights lights = new Lights(hub, "Living Room Lights");
        // AirConditioner ac = new AirConditioner(hub, "Central AC");
        // hub.RegisterDevice(thermostat);
        // hub.RegisterDevice(lights);
        // hub.RegisterDevice(ac);
        // thermostat.SetTemperature(80);
        // thermostat.SetTemperature(70);
        // hub.Notify(lights, "NIGHT_MODE");
    }
}
```

```typescript
interface SmartHomeMediator {
    notify(device: SmartDevice, event: string): void;
    registerDevice(device: SmartDevice): void;
}

abstract class SmartDevice {
    protected mediator: SmartHomeMediator;
    protected name: string;

    constructor(mediator: SmartHomeMediator, name: string) {
        this.mediator = mediator;
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
    abstract receiveCommand(command: string): void;
}

// Colleagues
class Thermostat extends SmartDevice {
    private temperature: number = 72;

    constructor(mediator: SmartHomeMediator, name: string) {
        super(mediator, name);
    }

    setTemperature(temp: number): void {
        // TODO: Set temperature field to temp
        // TODO: Print "Name: Temperature set to X"
        // TODO: If temp > 75, notify mediator with "TEMP_HIGH"
        // TODO: If temp <= 75, notify mediator with "TEMP_NORMAL"
    }

    receiveCommand(command: string): void {
        // TODO: Handle commands if needed
    }
}

class Lights extends SmartDevice {
    constructor(mediator: SmartHomeMediator, name: string) {
        super(mediator, name);
    }

    receiveCommand(command: string): void {
        // TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
    }
}

class AirConditioner extends SmartDevice {
    constructor(mediator: SmartHomeMediator, name: string) {
        super(mediator, name);
    }

    receiveCommand(command: string): void {
        // TODO: Print "Name: Turned ON" or "Name: Turned OFF" based on command
    }
}

// Concrete Mediator
class SmartHomeHub implements SmartHomeMediator {
    private devices: SmartDevice[] = [];

    registerDevice(device: SmartDevice): void {
        // TODO: Add device to the list
    }

    notify(device: SmartDevice, event: string): void {
        // TODO: Print "[SmartHomeHub] EVENT detected. Action message."
        // TODO: "TEMP_HIGH" -> find AirConditioner, send "ON" command
        // TODO: "TEMP_NORMAL" -> find AirConditioner, send "OFF" command
        // TODO: "NIGHT_MODE" -> find Lights, send "OFF" command
    }
}

// const hub = new SmartHomeHub();
// const thermostat = new Thermostat(hub, "Living Room Thermostat");
// const lights = new Lights(hub, "Living Room Lights");
// const ac = new AirConditioner(hub, "Central AC");
// hub.registerDevice(thermostat);
// hub.registerDevice(lights);
// hub.registerDevice(ac);
// thermostat.setTemperature(80);
// thermostat.setTemperature(70);
// hub.notify(lights, "NIGHT_MODE");
```

#### Solutions

```java
import java.util.*;

interface SmartHomeMediator {
    void notify(SmartDevice device, String event);
    void registerDevice(SmartDevice device);
}

abstract class SmartDevice {
    protected SmartHomeMediator mediator;
    protected String name;

    public SmartDevice(SmartHomeMediator mediator, String name) {
        this.mediator = mediator;
        this.name = name;
    }

    public String getName() { return name; }
    public abstract void receiveCommand(String command);
}

// Colleagues
class Thermostat extends SmartDevice {
    private int temperature = 72;

    public Thermostat(SmartHomeMediator mediator, String name) {
        super(mediator, name);
    }

    public void setTemperature(int temp) {
        this.temperature = temp;
        System.out.println(name + ": Temperature set to " + temp);
        if (temp > 75) {
            mediator.notify(this, "TEMP_HIGH");
        } else {
            mediator.notify(this, "TEMP_NORMAL");
        }
    }

    @Override
    public void receiveCommand(String command) {
        // Thermostat does not respond to commands
    }
}

class Lights extends SmartDevice {
    public Lights(SmartHomeMediator mediator, String name) {
        super(mediator, name);
    }

    @Override
    public void receiveCommand(String command) {
        if (command.equals("ON")) {
            System.out.println(name + ": Turned ON");
        } else if (command.equals("OFF")) {
            System.out.println(name + ": Turned OFF");
        }
    }
}

class AirConditioner extends SmartDevice {
    public AirConditioner(SmartHomeMediator mediator, String name) {
        super(mediator, name);
    }

    @Override
    public void receiveCommand(String command) {
        if (command.equals("ON")) {
            System.out.println(name + ": Turned ON");
        } else if (command.equals("OFF")) {
            System.out.println(name + ": Turned OFF");
        }
    }
}

// Concrete Mediator
class SmartHomeHub implements SmartHomeMediator {
    private List<SmartDevice> devices = new ArrayList<>();

    @Override
    public void registerDevice(SmartDevice device) {
        devices.add(device);
    }

    @Override
    public void notify(SmartDevice device, String event) {
        if (event.equals("TEMP_HIGH")) {
            System.out.println("[SmartHomeHub] TEMP_HIGH detected. Turning on AC.");
            for (SmartDevice d : devices) {
                if (d instanceof AirConditioner) {
                    d.receiveCommand("ON");
                }
            }
        } else if (event.equals("TEMP_NORMAL")) {
            System.out.println("[SmartHomeHub] TEMP_NORMAL detected. Turning off AC.");
            for (SmartDevice d : devices) {
                if (d instanceof AirConditioner) {
                    d.receiveCommand("OFF");
                }
            }
        } else if (event.equals("NIGHT_MODE")) {
            System.out.println("[SmartHomeHub] NIGHT_MODE activated. Turning off lights.");
            for (SmartDevice d : devices) {
                if (d instanceof Lights) {
                    d.receiveCommand("OFF");
                }
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        SmartHomeHub hub = new SmartHomeHub();
        Thermostat thermostat = new Thermostat(hub, "Living Room Thermostat");
        Lights lights = new Lights(hub, "Living Room Lights");
        AirConditioner ac = new AirConditioner(hub, "Central AC");
        hub.registerDevice(thermostat);
        hub.registerDevice(lights);
        hub.registerDevice(ac);
        thermostat.setTemperature(80);  // should trigger AC on
        thermostat.setTemperature(70);  // should trigger AC off
        hub.notify(lights, "NIGHT_MODE"); // should turn off lights
    }
}
```

```python
from abc import ABC, abstractmethod

class SmartHomeMediator(ABC):
    @abstractmethod
    def notify(self, device, event):
        pass

    @abstractmethod
    def register_device(self, device):
        pass

class SmartDevice(ABC):
    def __init__(self, mediator, name):
        self.mediator = mediator
        self.name = name

    @abstractmethod
    def receive_command(self, command):
        pass

# Colleagues
class Thermostat(SmartDevice):
    def __init__(self, mediator, name):
        super().__init__(mediator, name)
        self.temperature = 72

    def set_temperature(self, temp):
        self.temperature = temp
        print(f"{self.name}: Temperature set to {temp}")
        if temp > 75:
            self.mediator.notify(self, "TEMP_HIGH")
        else:
            self.mediator.notify(self, "TEMP_NORMAL")

    def receive_command(self, command):
        pass

class Lights(SmartDevice):
    def __init__(self, mediator, name):
        super().__init__(mediator, name)

    def receive_command(self, command):
        if command == "ON":
            print(f"{self.name}: Turned ON")
        elif command == "OFF":
            print(f"{self.name}: Turned OFF")

class AirConditioner(SmartDevice):
    def __init__(self, mediator, name):
        super().__init__(mediator, name)

    def receive_command(self, command):
        if command == "ON":
            print(f"{self.name}: Turned ON")
        elif command == "OFF":
            print(f"{self.name}: Turned OFF")

# Concrete Mediator
class SmartHomeHub(SmartHomeMediator):
    def __init__(self):
        self.devices = []

    def register_device(self, device):
        self.devices.append(device)

    def notify(self, device, event):
        if event == "TEMP_HIGH":
            print("[SmartHomeHub] TEMP_HIGH detected. Turning on AC.")
            for d in self.devices:
                if isinstance(d, AirConditioner):
                    d.receive_command("ON")
        elif event == "TEMP_NORMAL":
            print("[SmartHomeHub] TEMP_NORMAL detected. Turning off AC.")
            for d in self.devices:
                if isinstance(d, AirConditioner):
                    d.receive_command("OFF")
        elif event == "NIGHT_MODE":
            print("[SmartHomeHub] NIGHT_MODE activated. Turning off lights.")
            for d in self.devices:
                if isinstance(d, Lights):
                    d.receive_command("OFF")

if __name__ == "__main__":
    hub = SmartHomeHub()
    thermostat = Thermostat(hub, "Living Room Thermostat")
    lights = Lights(hub, "Living Room Lights")
    ac = AirConditioner(hub, "Central AC")
    hub.register_device(thermostat)
    hub.register_device(lights)
    hub.register_device(ac)
    thermostat.set_temperature(80)
    thermostat.set_temperature(70)
    hub.notify(lights, "NIGHT_MODE")
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
using namespace std;

class SmartDevice;

class SmartHomeMediator {
public:
    virtual ~SmartHomeMediator() = default;
    virtual void notify(SmartDevice* device, const string& event) = 0;
    virtual void registerDevice(SmartDevice* device) = 0;
};

class SmartDevice {
protected:
    SmartHomeMediator* mediator;
    string name;
public:
    SmartDevice(SmartHomeMediator* mediator, const string& name) : mediator(mediator), name(name) {}
    virtual ~SmartDevice() = default;
    string getName() const { return name; }
    virtual void receiveCommand(const string& command) = 0;
};

// Colleagues
class Thermostat : public SmartDevice {
    int temperature = 72;
public:
    Thermostat(SmartHomeMediator* mediator, const string& name) : SmartDevice(mediator, name) {}

    void setTemperature(int temp) {
        temperature = temp;
        cout << name << ": Temperature set to " << temp << endl;
        if (temp > 75) {
            mediator->notify(this, "TEMP_HIGH");
        } else {
            mediator->notify(this, "TEMP_NORMAL");
        }
    }

    void receiveCommand(const string& command) override {
        // Thermostat does not respond to commands
    }
};

class Lights : public SmartDevice {
public:
    Lights(SmartHomeMediator* mediator, const string& name) : SmartDevice(mediator, name) {}

    void receiveCommand(const string& command) override {
        if (command == "ON") {
            cout << name << ": Turned ON" << endl;
        } else if (command == "OFF") {
            cout << name << ": Turned OFF" << endl;
        }
    }
};

class AirConditioner : public SmartDevice {
public:
    AirConditioner(SmartHomeMediator* mediator, const string& name) : SmartDevice(mediator, name) {}

    void receiveCommand(const string& command) override {
        if (command == "ON") {
            cout << name << ": Turned ON" << endl;
        } else if (command == "OFF") {
            cout << name << ": Turned OFF" << endl;
        }
    }
};

// Concrete Mediator
class SmartHomeHub : public SmartHomeMediator {
    vector<SmartDevice*> devices;
public:
    void registerDevice(SmartDevice* device) override {
        devices.push_back(device);
    }

    void notify(SmartDevice* device, const string& event) override {
        if (event == "TEMP_HIGH") {
            cout << "[SmartHomeHub] TEMP_HIGH detected. Turning on AC." << endl;
            for (auto d : devices) {
                if (dynamic_cast<AirConditioner*>(d)) {
                    d->receiveCommand("ON");
                }
            }
        } else if (event == "TEMP_NORMAL") {
            cout << "[SmartHomeHub] TEMP_NORMAL detected. Turning off AC." << endl;
            for (auto d : devices) {
                if (dynamic_cast<AirConditioner*>(d)) {
                    d->receiveCommand("OFF");
                }
            }
        } else if (event == "NIGHT_MODE") {
            cout << "[SmartHomeHub] NIGHT_MODE activated. Turning off lights." << endl;
            for (auto d : devices) {
                if (dynamic_cast<Lights*>(d)) {
                    d->receiveCommand("OFF");
                }
            }
        }
    }
};

int main() {
    SmartHomeHub hub;
    Thermostat thermostat(&hub, "Living Room Thermostat");
    Lights lights(&hub, "Living Room Lights");
    AirConditioner ac(&hub, "Central AC");
    hub.registerDevice(&thermostat);
    hub.registerDevice(&lights);
    hub.registerDevice(&ac);
    thermostat.setTemperature(80);
    thermostat.setTemperature(70);
    hub.notify(&lights, "NIGHT_MODE");
    return 0;
}
```

```go
package main

import "fmt"

type SmartHomeMediator interface {
	Notify(device SmartDevice, event string)
	RegisterDevice(device SmartDevice)
}

type SmartDevice interface {
	GetName() string
	ReceiveCommand(command string)
}

// Colleagues

type BaseSmartDevice struct {
	mediator SmartHomeMediator
	name     string
}

func (b *BaseSmartDevice) GetName() string {
	return b.name
}

type Thermostat struct {
	BaseSmartDevice
	temperature int
}

func NewThermostat(mediator SmartHomeMediator, name string) *Thermostat {
	return &Thermostat{
		BaseSmartDevice: BaseSmartDevice{
			mediator: mediator,
			name:     name,
		},
		temperature: 72,
	}
}

func (t *Thermostat) SetTemperature(temp int) {
	t.temperature = temp
	fmt.Printf("%s: Temperature set to %d\n", t.name, temp)
	if temp > 75 {
		t.mediator.Notify(t, "TEMP_HIGH")
	} else {
		t.mediator.Notify(t, "TEMP_NORMAL")
	}
}

func (t *Thermostat) ReceiveCommand(command string) {
	// Thermostat does not respond to commands
}

type Lights struct {
	BaseSmartDevice
}

func NewLights(mediator SmartHomeMediator, name string) *Lights {
	return &Lights{
		BaseSmartDevice: BaseSmartDevice{
			mediator: mediator,
			name:     name,
		},
	}
}

func (l *Lights) ReceiveCommand(command string) {
	if command == "ON" {
		fmt.Printf("%s: Turned ON\n", l.name)
	} else if command == "OFF" {
		fmt.Printf("%s: Turned OFF\n", l.name)
	}
}

type AirConditioner struct {
	BaseSmartDevice
}

func NewAirConditioner(mediator SmartHomeMediator, name string) *AirConditioner {
	return &AirConditioner{
		BaseSmartDevice: BaseSmartDevice{
			mediator: mediator,
			name:     name,
		},
	}
}

func (a *AirConditioner) ReceiveCommand(command string) {
	if command == "ON" {
		fmt.Printf("%s: Turned ON\n", a.name)
	} else if command == "OFF" {
		fmt.Printf("%s: Turned OFF\n", a.name)
	}
}

// Concrete Mediator

type SmartHomeHub struct {
	devices []SmartDevice
}

func NewSmartHomeHub() *SmartHomeHub {
	return &SmartHomeHub{
		devices: make([]SmartDevice, 0),
	}
}

func (s *SmartHomeHub) RegisterDevice(device SmartDevice) {
	s.devices = append(s.devices, device)
}

func (s *SmartHomeHub) Notify(device SmartDevice, event string) {
	_ = device
	if event == "TEMP_HIGH" {
		fmt.Println("[SmartHomeHub] TEMP_HIGH detected. Turning on AC.")
		for _, d := range s.devices {
			if _, ok := d.(*AirConditioner); ok {
				d.ReceiveCommand("ON")
			}
		}
	} else if event == "TEMP_NORMAL" {
		fmt.Println("[SmartHomeHub] TEMP_NORMAL detected. Turning off AC.")
		for _, d := range s.devices {
			if _, ok := d.(*AirConditioner); ok {
				d.ReceiveCommand("OFF")
			}
		}
	} else if event == "NIGHT_MODE" {
		fmt.Println("[SmartHomeHub] NIGHT_MODE activated. Turning off lights.")
		for _, d := range s.devices {
			if _, ok := d.(*Lights); ok {
				d.ReceiveCommand("OFF")
			}
		}
	}
}

func main() {
	hub := NewSmartHomeHub()
	thermostat := NewThermostat(hub, "Living Room Thermostat")
	lights := NewLights(hub, "Living Room Lights")
	ac := NewAirConditioner(hub, "Central AC")

	hub.RegisterDevice(thermostat)
	hub.RegisterDevice(lights)
	hub.RegisterDevice(ac)

	thermostat.SetTemperature(80)
	thermostat.SetTemperature(70)
	hub.Notify(lights, "NIGHT_MODE")
}
```

```csharp
using System;
using System.Collections.Generic;

interface ISmartHomeMediator
{
    void Notify(SmartDevice device, string eventName);
    void RegisterDevice(SmartDevice device);
}

abstract class SmartDevice
{
    protected ISmartHomeMediator mediator;
    protected string name;

    public SmartDevice(ISmartHomeMediator mediator, string name)
    {
        this.mediator = mediator;
        this.name = name;
    }

    public string Name => name;
    public abstract void ReceiveCommand(string command);
}

// Colleagues
class Thermostat : SmartDevice
{
    private int temperature = 72;

    public Thermostat(ISmartHomeMediator mediator, string name) : base(mediator, name)
    {
    }

    public void SetTemperature(int temp)
    {
        temperature = temp;
        Console.WriteLine(name + ": Temperature set to " + temp);
        if (temp > 75)
            mediator.Notify(this, "TEMP_HIGH");
        else
            mediator.Notify(this, "TEMP_NORMAL");
    }

    public override void ReceiveCommand(string command)
    {
        // Thermostat does not respond to commands
    }
}

class Lights : SmartDevice
{
    public Lights(ISmartHomeMediator mediator, string name) : base(mediator, name)
    {
    }

    public override void ReceiveCommand(string command)
    {
        if (command == "ON") Console.WriteLine(name + ": Turned ON");
        else if (command == "OFF") Console.WriteLine(name + ": Turned OFF");
    }
}

class AirConditioner : SmartDevice
{
    public AirConditioner(ISmartHomeMediator mediator, string name) : base(mediator, name)
    {
    }

    public override void ReceiveCommand(string command)
    {
        if (command == "ON") Console.WriteLine(name + ": Turned ON");
        else if (command == "OFF") Console.WriteLine(name + ": Turned OFF");
    }
}

// Concrete Mediator
class SmartHomeHub : ISmartHomeMediator
{
    private List<SmartDevice> devices = new List<SmartDevice>();

    public void RegisterDevice(SmartDevice device)
    {
        devices.Add(device);
    }

    public void Notify(SmartDevice device, string eventName)
    {
        if (eventName == "TEMP_HIGH")
        {
            Console.WriteLine("[SmartHomeHub] TEMP_HIGH detected. Turning on AC.");
            foreach (var d in devices)
                if (d is AirConditioner) d.ReceiveCommand("ON");
        }
        else if (eventName == "TEMP_NORMAL")
        {
            Console.WriteLine("[SmartHomeHub] TEMP_NORMAL detected. Turning off AC.");
            foreach (var d in devices)
                if (d is AirConditioner) d.ReceiveCommand("OFF");
        }
        else if (eventName == "NIGHT_MODE")
        {
            Console.WriteLine("[SmartHomeHub] NIGHT_MODE activated. Turning off lights.");
            foreach (var d in devices)
                if (d is Lights) d.ReceiveCommand("OFF");
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        SmartHomeHub hub = new SmartHomeHub();
        Thermostat thermostat = new Thermostat(hub, "Living Room Thermostat");
        Lights lights = new Lights(hub, "Living Room Lights");
        AirConditioner ac = new AirConditioner(hub, "Central AC");
        hub.RegisterDevice(thermostat);
        hub.RegisterDevice(lights);
        hub.RegisterDevice(ac);
        thermostat.SetTemperature(80);
        thermostat.SetTemperature(70);
        hub.Notify(lights, "NIGHT_MODE");
    }
}
```

```typescript
interface SmartHomeMediator {
    notify(device: SmartDevice, event: string): void;
    registerDevice(device: SmartDevice): void;
}

abstract class SmartDevice {
    protected mediator: SmartHomeMediator;
    protected name: string;

    constructor(mediator: SmartHomeMediator, name: string) {
        this.mediator = mediator;
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
    abstract receiveCommand(command: string): void;
}

// Colleagues
class Thermostat extends SmartDevice {
    private temperature: number = 72;

    constructor(mediator: SmartHomeMediator, name: string) {
        super(mediator, name);
    }

    setTemperature(temp: number): void {
        this.temperature = temp;
        console.log(`${this.name}: Temperature set to ${temp}`);
        if (temp > 75) {
            this.mediator.notify(this, "TEMP_HIGH");
        } else {
            this.mediator.notify(this, "TEMP_NORMAL");
        }
    }

    receiveCommand(command: string): void {
        // Thermostat does not respond to commands
    }
}

class Lights extends SmartDevice {
    constructor(mediator: SmartHomeMediator, name: string) {
        super(mediator, name);
    }

    receiveCommand(command: string): void {
        if (command === "ON") {
            console.log(`${this.name}: Turned ON`);
        } else if (command === "OFF") {
            console.log(`${this.name}: Turned OFF`);
        }
    }
}

class AirConditioner extends SmartDevice {
    constructor(mediator: SmartHomeMediator, name: string) {
        super(mediator, name);
    }

    receiveCommand(command: string): void {
        if (command === "ON") {
            console.log(`${this.name}: Turned ON`);
        } else if (command === "OFF") {
            console.log(`${this.name}: Turned OFF`);
        }
    }
}

// Concrete Mediator
class SmartHomeHub implements SmartHomeMediator {
    private devices: SmartDevice[] = [];

    registerDevice(device: SmartDevice): void {
        this.devices.push(device);
    }

    notify(device: SmartDevice, event: string): void {
        if (event === "TEMP_HIGH") {
            console.log("[SmartHomeHub] TEMP_HIGH detected. Turning on AC.");
            for (const d of this.devices) {
                if (d instanceof AirConditioner) d.receiveCommand("ON");
            }
        } else if (event === "TEMP_NORMAL") {
            console.log("[SmartHomeHub] TEMP_NORMAL detected. Turning off AC.");
            for (const d of this.devices) {
                if (d instanceof AirConditioner) d.receiveCommand("OFF");
            }
        } else if (event === "NIGHT_MODE") {
            console.log("[SmartHomeHub] NIGHT_MODE activated. Turning off lights.");
            for (const d of this.devices) {
                if (d instanceof Lights) d.receiveCommand("OFF");
            }
        }
    }
}

const hub = new SmartHomeHub();
const thermostat = new Thermostat(hub, "Living Room Thermostat");
const lights = new Lights(hub, "Living Room Lights");
const ac = new AirConditioner(hub, "Central AC");
hub.registerDevice(thermostat);
hub.registerDevice(lights);
hub.registerDevice(ac);
thermostat.setTemperature(80);
thermostat.setTemperature(70);
hub.notify(lights, "NIGHT_MODE");
```

---

> [!PAYWALL] This content is for premium members only.

# Exercise 2: Event Bus System

Build a typed event bus that acts as a mediator for publish/subscribe communication. Components publish events and subscribe to specific event types. The event bus routes events to the right subscribers.

**Requirements:**

- `EventBus` mediator that maps event types (strings) to lists of subscriber callbacks
- `subscribe(eventType, handler)` registers a handler for a specific event type
- `publish(eventType, data)` sends data to all handlers registered for that event type
- `unsubscribe(eventType, handler)` removes a specific handler
- Components interact only through the event bus, never directly
- Build at least 3 components: `UserService` (publishes user events), `EmailService` (subscribes to user events), `LogService` (subscribes to all events)

```java
import java.util.*;
import java.util.function.Consumer;

class EventBus {
    private Map<String, List<Consumer<String>>> subscribers = new HashMap<>();

    public void subscribe(String eventType, Consumer<String> handler) {
        // TODO: Add handler to the list for eventType (create list if needed)
    }

    public void publish(String eventType, String data) {
        // TODO: Call all handlers registered for eventType with data
    }

    public void unsubscribe(String eventType, Consumer<String> handler) {
        // TODO: Remove handler from the list for eventType
    }
}

class UserService {
    private EventBus bus;

    public UserService(EventBus bus) { this.bus = bus; }

    public void registerUser(String name) {
        // TODO: Publish "USER_REGISTERED" event with name as data
    }

    public void deleteUser(String name) {
        // TODO: Publish "USER_DELETED" event with name as data
    }
}

// Colleagues
class EmailService {
    public EmailService(EventBus bus) {
        // TODO: Subscribe to "USER_REGISTERED" event
        // TODO: Handler prints "Sending welcome email to [name]"
    }
}

class LogService {
    public LogService(EventBus bus) {
        // TODO: Subscribe to "USER_REGISTERED", "USER_DELETED" (or all event types)
        // TODO: Handler prints "[LOG] Event: [type], Data: [data]"
    }
}

public class Main {
    public static void main(String[] args) {
        // EventBus bus = new EventBus();
        // UserService userService = new UserService(bus);
        // EmailService emailService = new EmailService(bus);
        // LogService logService = new LogService(bus);
        // userService.registerUser("Alice");
        // userService.registerUser("Bob");
        // userService.deleteUser("Alice");
    }
}
```

```python
class EventBus:
    def __init__(self):
        self.subscribers = {}

    def subscribe(self, event_type, handler):
        # TODO: Add handler to the list for event_type (create list if needed)
        pass

    def publish(self, event_type, data):
        # TODO: Call all handlers registered for event_type with data
        pass

    def unsubscribe(self, event_type, handler):
        # TODO: Remove handler from the list for event_type
        pass

class UserService:
    def __init__(self, bus):
        self.bus = bus

    def register_user(self, name):
        # TODO: Publish "USER_REGISTERED" event with name as data
        pass

    def delete_user(self, name):
        # TODO: Publish "USER_DELETED" event with name as data
        pass

# Colleagues
class EmailService:
    def __init__(self, bus):
        # TODO: Subscribe to "USER_REGISTERED" event
        # TODO: Handler prints "Sending welcome email to [name]"
        pass

class LogService:
    def __init__(self, bus):
        # TODO: Subscribe to "USER_REGISTERED", "USER_DELETED" (or all event types)
        # TODO: Handler prints "[LOG] Event: [type], Data: [data]"
        pass

if __name__ == "__main__":
    # bus = EventBus()
    # user_service = UserService(bus)
    # email_service = EmailService(bus)
    # log_service = LogService(bus)
    # user_service.register_user("Alice")
    # user_service.register_user("Bob")
    # user_service.delete_user("Alice")
    pass
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <functional>
using namespace std;

class EventBus {
private:
    map<string, vector<function<void(const string&)>>> subscribers;

public:
    void subscribe(const string& eventType, function<void(const string&)> handler) {
        // TODO: Add handler to the list for eventType (create list if needed)
    }

    void publish(const string& eventType, const string& data) {
        // TODO: Call all handlers registered for eventType with data
    }
};

// Colleagues
class UserService {
    EventBus& bus;
public:
    UserService(EventBus& bus) : bus(bus) {}

    void registerUser(const string& name) {
        // TODO: Publish "USER_REGISTERED" event with name as data
    }

    void deleteUser(const string& name) {
        // TODO: Publish "USER_DELETED" event with name as data
    }
};

class EmailService {
public:
    EmailService(EventBus& bus) {
        // TODO: Subscribe to "USER_REGISTERED" event
        // TODO: Handler prints "Sending welcome email to [name]"
    }
};

class LogService {
public:
    LogService(EventBus& bus) {
        // TODO: Subscribe to "USER_REGISTERED", "USER_DELETED" (or all event types)
        // TODO: Handler prints "[LOG] Event: [type], Data: [data]"
    }
};

int main() {
    // EventBus bus;
    // UserService userService(bus);
    // EmailService emailService(bus);
    // LogService logService(bus);
    // userService.registerUser("Alice");
    // userService.registerUser("Bob");
    // userService.deleteUser("Alice");
    return 0;
}
```

```go
package main

type Handler func(data string)

type EventBus struct {
	subscribers map[string][]Handler
}

func NewEventBus() *EventBus {
	return &EventBus{
		subscribers: make(map[string][]Handler),
	}
}

func (e *EventBus) Subscribe(eventType string, handler Handler) {
	// TODO: Add handler to the list for eventType (create list if needed)
}

func (e *EventBus) Publish(eventType string, data string) {
	// TODO: Call all handlers registered for eventType with data
}

func (e *EventBus) Unsubscribe(eventType string, handler Handler) {
	// TODO: Remove handler from the list for eventType
}

// Colleagues
type UserService struct {
	bus *EventBus
}

func NewUserService(bus *EventBus) *UserService {
	return &UserService{bus: bus}
}

func (u *UserService) RegisterUser(name string) {
	// TODO: Publish "USER_REGISTERED" event with name as data
}

func (u *UserService) DeleteUser(name string) {
	// TODO: Publish "USER_DELETED" event with name as data
}

type EmailService struct {
}

func NewEmailService(bus *EventBus) *EmailService {
	// TODO: Subscribe to "USER_REGISTERED" event
	// TODO: Handler prints "Sending welcome email to [name]"
	return &EmailService{}
}

type LogService struct {
}

func NewLogService(bus *EventBus) *LogService {
	// TODO: Subscribe to "USER_REGISTERED", "USER_DELETED" (or all event types)
	// TODO: Handler prints "[LOG] Event: [type], Data: [data]"
	return &LogService{}
}

func main() {
	// bus := NewEventBus()
	// userService := NewUserService(bus)
	// emailService := NewEmailService(bus)
	// logService := NewLogService(bus)
	// userService.RegisterUser("Alice")
	// userService.RegisterUser("Bob")
	// userService.DeleteUser("Alice")
}
```

```csharp
using System;
using System.Collections.Generic;

class EventBus
{
    private Dictionary<string, List<Action<string>>> subscribers = new Dictionary<string, List<Action<string>>>();

    public void Subscribe(string eventType, Action<string> handler)
    {
        // TODO: Add handler to the list for eventType (create list if needed)
    }

    public void Publish(string eventType, string data)
    {
        // TODO: Call all handlers registered for eventType with data
    }

    public void Unsubscribe(string eventType, Action<string> handler)
    {
        // TODO: Remove handler from the list for eventType
    }
}

// Colleagues
class UserService
{
    private EventBus bus;

    public UserService(EventBus bus)
    {
        this.bus = bus;
    }

    public void RegisterUser(string name)
    {
        // TODO: Publish "USER_REGISTERED" event with name as data
    }

    public void DeleteUser(string name)
    {
        // TODO: Publish "USER_DELETED" event with name as data
    }
}

class EmailService
{
    public EmailService(EventBus bus)
    {
        // TODO: Subscribe to "USER_REGISTERED" event
        // TODO: Handler prints "Sending welcome email to [name]"
    }
}

class LogService
{
    public LogService(EventBus bus)
    {
        // TODO: Subscribe to "USER_REGISTERED", "USER_DELETED" (or all event types)
        // TODO: Handler prints "[LOG] Event: [type], Data: [data]"
    }
}

class Program
{
    static void Main(string[] args)
    {
        // EventBus bus = new EventBus();
        // UserService userService = new UserService(bus);
        // EmailService emailService = new EmailService(bus);
        // LogService logService = new LogService(bus);
        // userService.RegisterUser("Alice");
        // userService.RegisterUser("Bob");
        // userService.DeleteUser("Alice");
    }
}
```

```typescript
type Handler = (data: string) => void;

class EventBus {
    private subscribers: Map<string, Handler[]> = new Map();

    subscribe(eventType: string, handler: Handler): void {
        // TODO: Add handler to the list for eventType (create list if needed)
    }

    publish(eventType: string, data: string): void {
        // TODO: Call all handlers registered for eventType with data
    }

    unsubscribe(eventType: string, handler: Handler): void {
        // TODO: Remove handler from the list for eventType
    }
}

// Colleagues
class UserService {
    private bus: EventBus;

    constructor(bus: EventBus) {
        this.bus = bus;
    }

    registerUser(name: string): void {
        // TODO: Publish "USER_REGISTERED" event with name as data
    }

    deleteUser(name: string): void {
        // TODO: Publish "USER_DELETED" event with name as data
    }
}

class EmailService {
    constructor(bus: EventBus) {
        // TODO: Subscribe to "USER_REGISTERED" event
        // TODO: Handler prints "Sending welcome email to [name]"
    }
}

class LogService {
    constructor(bus: EventBus) {
        // TODO: Subscribe to "USER_REGISTERED", "USER_DELETED" (or all event types)
        // TODO: Handler prints "[LOG] Event: [type], Data: [data]"
    }
}

// const bus = new EventBus();
// const userService = new UserService(bus);
// const emailService = new EmailService(bus);
// const logService = new LogService(bus);
// userService.registerUser("Alice");
// userService.registerUser("Bob");
// userService.deleteUser("Alice");
```

#### Solutions

```java
import java.util.*;
import java.util.function.Consumer;

class EventBus {
    private Map<String, List<Consumer<String>>> subscribers = new HashMap<>();

    public void subscribe(String eventType, Consumer<String> handler) {
        subscribers.computeIfAbsent(eventType, k -> new ArrayList<>()).add(handler);
    }

    public void publish(String eventType, String data) {
        List<Consumer<String>> handlers = subscribers.get(eventType);
        if (handlers != null) {
            for (Consumer<String> handler : handlers) {
                handler.accept(data);
            }
        }
    }

    public void unsubscribe(String eventType, Consumer<String> handler) {
        List<Consumer<String>> handlers = subscribers.get(eventType);
        if (handlers != null) {
            handlers.remove(handler);
        }
    }
}

class UserService {
    private EventBus bus;

    public UserService(EventBus bus) { this.bus = bus; }

    public void registerUser(String name) {
        bus.publish("USER_REGISTERED", name);
    }

    public void deleteUser(String name) {
        bus.publish("USER_DELETED", name);
    }
}

// Colleagues
class EmailService {
    public EmailService(EventBus bus) {
        bus.subscribe("USER_REGISTERED", name ->
            System.out.println("Sending welcome email to " + name));
    }
}

class LogService {
    public LogService(EventBus bus) {
        bus.subscribe("USER_REGISTERED", data ->
            System.out.println("[LOG] Event: USER_REGISTERED, Data: " + data));
        bus.subscribe("USER_DELETED", data ->
            System.out.println("[LOG] Event: USER_DELETED, Data: " + data));
    }
}

public class Main {
    public static void main(String[] args) {
        EventBus bus = new EventBus();
        UserService userService = new UserService(bus);
        LogService logService = new LogService(bus);
        EmailService emailService = new EmailService(bus);
        userService.registerUser("Alice");
        userService.registerUser("Bob");
        userService.deleteUser("Alice");
    }
}
```

```python
class EventBus:
    def __init__(self):
        self.subscribers = {}

    def subscribe(self, event_type, handler):
        if event_type not in self.subscribers:
            self.subscribers[event_type] = []
        self.subscribers[event_type].append(handler)

    def publish(self, event_type, data):
        handlers = self.subscribers.get(event_type, [])
        for handler in handlers:
            handler(data)

    def unsubscribe(self, event_type, handler):
        handlers = self.subscribers.get(event_type, [])
        if handler in handlers:
            handlers.remove(handler)

class UserService:
    def __init__(self, bus):
        self.bus = bus

    def register_user(self, name):
        self.bus.publish("USER_REGISTERED", name)

    def delete_user(self, name):
        self.bus.publish("USER_DELETED", name)

# Colleagues
class EmailService:
    def __init__(self, bus):
        bus.subscribe("USER_REGISTERED", lambda name: print(f"Sending welcome email to {name}"))

class LogService:
    def __init__(self, bus):
        bus.subscribe("USER_REGISTERED", lambda data: print(f"[LOG] Event: USER_REGISTERED, Data: {data}"))
        bus.subscribe("USER_DELETED", lambda data: print(f"[LOG] Event: USER_DELETED, Data: {data}"))

if __name__ == "__main__":
    bus = EventBus()
    user_service = UserService(bus)
    log_service = LogService(bus)
    email_service = EmailService(bus)
    user_service.register_user("Alice")
    user_service.register_user("Bob")
    user_service.delete_user("Alice")
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <functional>
using namespace std;

class EventBus {
private:
    map<string, vector<function<void(const string&)>>> subscribers;

public:
    void subscribe(const string& eventType, function<void(const string&)> handler) {
        subscribers[eventType].push_back(handler);
    }

    void publish(const string& eventType, const string& data) {
        auto it = subscribers.find(eventType);
        if (it != subscribers.end()) {
            for (auto& handler : it->second) {
                handler(data);
            }
        }
    }
};

// Colleagues
class UserService {
    EventBus& bus;
public:
    UserService(EventBus& bus) : bus(bus) {}

    void registerUser(const string& name) {
        bus.publish("USER_REGISTERED", name);
    }

    void deleteUser(const string& name) {
        bus.publish("USER_DELETED", name);
    }
};

class EmailService {
public:
    EmailService(EventBus& bus) {
        bus.subscribe("USER_REGISTERED", [](const string& name) {
            cout << "Sending welcome email to " << name << endl;
        });
    }
};

class LogService {
public:
    LogService(EventBus& bus) {
        bus.subscribe("USER_REGISTERED", [](const string& data) {
            cout << "[LOG] Event: USER_REGISTERED, Data: " << data << endl;
        });
        bus.subscribe("USER_DELETED", [](const string& data) {
            cout << "[LOG] Event: USER_DELETED, Data: " << data << endl;
        });
    }
};

int main() {
    EventBus bus;
    UserService userService(bus);
    LogService logService(bus);
    EmailService emailService(bus);
    userService.registerUser("Alice");
    userService.registerUser("Bob");
    userService.deleteUser("Alice");
    return 0;
}
```

```go
package main

import "fmt"

type Handler func(string)

type EventBus struct {
	subscribers map[string][]Handler
}

func NewEventBus() *EventBus {
	return &EventBus{
		subscribers: make(map[string][]Handler),
	}
}

func (b *EventBus) Subscribe(eventType string, handler Handler) {
	if _, ok := b.subscribers[eventType]; !ok {
		b.subscribers[eventType] = make([]Handler, 0)
	}
	b.subscribers[eventType] = append(b.subscribers[eventType], handler)
}

func (b *EventBus) Publish(eventType, data string) {
	handlers := b.subscribers[eventType]
	for _, handler := range handlers {
		handler(data)
	}
}

func (b *EventBus) Unsubscribe(eventType string, handler Handler) {
	handlers, ok := b.subscribers[eventType]
	if !ok {
		return
	}
	for i, h := range handlers {
		if fmt.Sprintf("%p", h) == fmt.Sprintf("%p", handler) {
			b.subscribers[eventType] = append(handlers[:i], handlers[i+1:]...)
			return
		}
	}
}

// Colleagues
type UserService struct {
	bus *EventBus
}

func NewUserService(bus *EventBus) *UserService {
	return &UserService{bus: bus}
}

func (s *UserService) RegisterUser(name string) {
	s.bus.Publish("USER_REGISTERED", name)
}

func (s *UserService) DeleteUser(name string) {
	s.bus.Publish("USER_DELETED", name)
}

type EmailService struct{}

func NewEmailService(bus *EventBus) *EmailService {
	bus.Subscribe("USER_REGISTERED", func(name string) {
		fmt.Println("Sending welcome email to", name)
	})
	return &EmailService{}
}

type LogService struct{}

func NewLogService(bus *EventBus) *LogService {
	bus.Subscribe("USER_REGISTERED", func(data string) {
		fmt.Println("[LOG] Event: USER_REGISTERED, Data:", data)
	})
	bus.Subscribe("USER_DELETED", func(data string) {
		fmt.Println("[LOG] Event: USER_DELETED, Data:", data)
	})
	return &LogService{}
}

func main() {
	bus := NewEventBus()
	userService := NewUserService(bus)
	logService := NewLogService(bus)
	emailService := NewEmailService(bus)

	_, _, _ = logService, emailService, userService

	userService.RegisterUser("Alice")
	userService.RegisterUser("Bob")
	userService.DeleteUser("Alice")
}
```

```csharp
using System;
using System.Collections.Generic;

class EventBus
{
    private Dictionary<string, List<Action<string>>> subscribers = new Dictionary<string, List<Action<string>>>();

    public void Subscribe(string eventType, Action<string> handler)
    {
        if (!subscribers.ContainsKey(eventType))
            subscribers[eventType] = new List<Action<string>>();
        subscribers[eventType].Add(handler);
    }

    public void Publish(string eventType, string data)
    {
        if (subscribers.ContainsKey(eventType))
            foreach (var handler in subscribers[eventType])
                handler(data);
    }

    public void Unsubscribe(string eventType, Action<string> handler)
    {
        if (subscribers.ContainsKey(eventType))
            subscribers[eventType].Remove(handler);
    }
}

// Colleagues
class UserService
{
    private EventBus bus;

    public UserService(EventBus bus)
    {
        this.bus = bus;
    }

    public void RegisterUser(string name)
    {
        bus.Publish("USER_REGISTERED", name);
    }

    public void DeleteUser(string name)
    {
        bus.Publish("USER_DELETED", name);
    }
}

class EmailService
{
    public EmailService(EventBus bus)
    {
        bus.Subscribe("USER_REGISTERED", name =>
            Console.WriteLine("Sending welcome email to " + name));
    }
}

class LogService
{
    public LogService(EventBus bus)
    {
        bus.Subscribe("USER_REGISTERED", data =>
            Console.WriteLine("[LOG] Event: USER_REGISTERED, Data: " + data));
        bus.Subscribe("USER_DELETED", data =>
            Console.WriteLine("[LOG] Event: USER_DELETED, Data: " + data));
    }
}

class Program
{
    static void Main(string[] args)
    {
        EventBus bus = new EventBus();
        UserService userService = new UserService(bus);
        LogService logService = new LogService(bus);
        EmailService emailService = new EmailService(bus);
        userService.RegisterUser("Alice");
        userService.RegisterUser("Bob");
        userService.DeleteUser("Alice");
    }
}
```

```typescript
type Handler = (data: string) => void;

class EventBus {
    private subscribers: Map<string, Handler[]> = new Map();

    subscribe(eventType: string, handler: Handler): void {
        if (!this.subscribers.has(eventType)) {
            this.subscribers.set(eventType, []);
        }
        this.subscribers.get(eventType)!.push(handler);
    }

    publish(eventType: string, data: string): void {
        const handlers = this.subscribers.get(eventType);
        if (handlers) {
            for (const handler of handlers) {
                handler(data);
            }
        }
    }

    unsubscribe(eventType: string, handler: Handler): void {
        const handlers = this.subscribers.get(eventType);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index !== -1) handlers.splice(index, 1);
        }
    }
}

// Colleagues
class UserService {
    private bus: EventBus;

    constructor(bus: EventBus) {
        this.bus = bus;
    }

    registerUser(name: string): void {
        this.bus.publish("USER_REGISTERED", name);
    }

    deleteUser(name: string): void {
        this.bus.publish("USER_DELETED", name);
    }
}

class EmailService {
    constructor(bus: EventBus) {
        bus.subscribe("USER_REGISTERED", (name: string) =>
            console.log(`Sending welcome email to ${name}`));
    }
}

class LogService {
    constructor(bus: EventBus) {
        bus.subscribe("USER_REGISTERED", (data: string) =>
            console.log(`[LOG] Event: USER_REGISTERED, Data: ${data}`));
        bus.subscribe("USER_DELETED", (data: string) =>
            console.log(`[LOG] Event: USER_DELETED, Data: ${data}`));
    }
}

const bus = new EventBus();
const userService = new UserService(bus);
const logService = new LogService(bus);
const emailService = new EmailService(bus);
userService.registerUser("Alice");
userService.registerUser("Bob");
userService.deleteUser("Alice");
```

---

# Exercise 3: Auction System

Build an auction system where bidders place bids through an auctioneer mediator. The auctioneer tracks the current highest bid, validates bids, enforces a minimum increment, and notifies all bidders of updates.

**Requirements:**

- `AuctionMediator` interface with `placeBid(bidder, amount)`, `registerBidder(bidder)`, and `closeAuction()` methods
- `Auctioneer` mediator that:
   - Tracks current highest bid and highest bidder
   - Rejects bids that are not at least $10 more than the current highest bid
   - Notifies all bidders when a new highest bid is placed
   - Announces the winner when the auction closes
- `Bidder` class with mediator reference, name, and balance
   - Cannot bid more than their balance
   - Receives notifications about other bids

```java
import java.util.*;

interface AuctionMediator {
    void registerBidder(Bidder bidder);
    void placeBid(Bidder bidder, int amount);
    void closeAuction();
}

class Bidder {
    private AuctionMediator mediator;
    private String name;
    private int balance;

    public Bidder(AuctionMediator mediator, String name, int balance) {
        this.mediator = mediator;
        this.name = name;
        this.balance = balance;
    }

    public String getName() { return name; }
    public int getBalance() { return balance; }

    public void bid(int amount) {
        System.out.println(name + " places bid: $" + amount);
        mediator.placeBid(this, amount);
    }

    public void receiveNotification(String message) {
        System.out.println("[" + name + "] " + message);
    }
}

// Concrete Mediator
class Auctioneer implements AuctionMediator {
    private List<Bidder> bidders = new ArrayList<>();
    private int highestBid = 0;
    private Bidder highestBidder = null;
    private String itemName;
    private static final int MINIMUM_INCREMENT = 10;

    public Auctioneer(String itemName) {
        // TODO: Store item name
    }

    @Override
    public void registerBidder(Bidder bidder) {
        // TODO: Add bidder to the list
    }

    @Override
    public void placeBid(Bidder bidder, int amount) {
        // TODO: Reject if amount <= highestBid + MINIMUM_INCREMENT, notify bidder
        // TODO: Reject if amount > bidder balance, notify bidder
        // TODO: On valid bid: update highestBid and highestBidder
        // TODO: Notify all other bidders of the new highest bid
    }

    @Override
    public void closeAuction() {
        // TODO: If no bids, notify all "Auction closed. No bids on itemName."
        // TODO: If winner, notify all "Auction closed! Winner: name with $X for itemName"
    }
}

public class Main {
    public static void main(String[] args) {
        // Auctioneer auctioneer = new Auctioneer("Vintage Watch");
        // Bidder alice = new Bidder(auctioneer, "Alice", 500);
        // Bidder bob = new Bidder(auctioneer, "Bob", 300);
        // Bidder charlie = new Bidder(auctioneer, "Charlie", 700);
        // auctioneer.registerBidder(alice);
        // auctioneer.registerBidder(bob);
        // auctioneer.registerBidder(charlie);
        // alice.bid(100);
        // bob.bid(105);     // too low (need 110+)
        // bob.bid(150);
        // charlie.bid(200);
        // alice.bid(250);
        // bob.bid(400);     // exceeds Bob's balance of 300
        // charlie.bid(300);
        // auctioneer.closeAuction();
    }
}
```

```python
from abc import ABC, abstractmethod

class AuctionMediator(ABC):
    @abstractmethod
    def register_bidder(self, bidder): pass
    @abstractmethod
    def place_bid(self, bidder, amount): pass
    @abstractmethod
    def close_auction(self): pass

class Bidder:
    def __init__(self, mediator, name, balance):
        self.mediator = mediator
        self.name = name
        self.balance = balance

    def bid(self, amount):
        print(f"{self.name} places bid: ${amount}")
        self.mediator.place_bid(self, amount)

    def receive_notification(self, message):
        print(f"[{self.name}] {message}")

# Concrete Mediator
class Auctioneer(AuctionMediator):
    def __init__(self, item_name):
        self.bidders = []
        self.highest_bid = 0
        self.highest_bidder = None
        self.item_name = item_name
        self.MINIMUM_INCREMENT = 10

    def register_bidder(self, bidder):
        # TODO: Add bidder to the list
        pass

    def place_bid(self, bidder, amount):
        # TODO: Reject if amount <= highest_bid + MINIMUM_INCREMENT, notify bidder
        # TODO: Reject if amount > bidder balance, notify bidder
        # TODO: On valid bid: update highest_bid and highest_bidder
        # TODO: Notify all other bidders of the new highest bid
        pass

    def close_auction(self):
        # TODO: If no bids, notify all "Auction closed. No bids on item_name."
        # TODO: If winner, notify all "Auction closed! Winner: name with $X for item_name"
        pass

if __name__ == "__main__":
    # auctioneer = Auctioneer("Vintage Watch")
    # alice = Bidder(auctioneer, "Alice", 500)
    # bob = Bidder(auctioneer, "Bob", 300)
    # charlie = Bidder(auctioneer, "Charlie", 700)
    # auctioneer.register_bidder(alice)
    # auctioneer.register_bidder(bob)
    # auctioneer.register_bidder(charlie)
    # alice.bid(100)
    # bob.bid(105)
    # bob.bid(150)
    # charlie.bid(200)
    # alice.bid(250)
    # bob.bid(400)
    # charlie.bid(300)
    # auctioneer.close_auction()
    pass
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Bidder;

class AuctionMediator {
public:
    virtual ~AuctionMediator() = default;
    virtual void registerBidder(Bidder* bidder) = 0;
    virtual void placeBid(Bidder* bidder, int amount) = 0;
    virtual void closeAuction() = 0;
};

class Bidder {
private:
    AuctionMediator* mediator;
    string name;
    int balance;
public:
    Bidder(AuctionMediator* mediator, const string& name, int balance)
        : mediator(mediator), name(name), balance(balance) {}
    string getName() const { return name; }
    int getBalance() const { return balance; }
    void bid(int amount) {
        cout << name << " places bid: $" << amount << endl;
        mediator->placeBid(this, amount);
    }
    void receiveNotification(const string& message) {
        cout << "[" << name << "] " << message << endl;
    }
};

// Concrete Mediator
class Auctioneer : public AuctionMediator {
    vector<Bidder*> bidders;
    int highestBid = 0;
    Bidder* highestBidder = nullptr;
    string itemName;
    static const int MINIMUM_INCREMENT = 10;
public:
    Auctioneer(const string& itemName) : itemName(itemName) {}

    void registerBidder(Bidder* bidder) override {
        // TODO: Add bidder to the list
    }

    void placeBid(Bidder* bidder, int amount) override {
        // TODO: Reject if amount <= highestBid + MINIMUM_INCREMENT, notify bidder
        // TODO: Reject if amount > bidder balance, notify bidder
        // TODO: On valid bid: update highestBid and highestBidder
        // TODO: Notify all other bidders of the new highest bid
    }

    void closeAuction() override {
        // TODO: If no bids, notify all "Auction closed. No bids on itemName."
        // TODO: If winner, notify all "Auction closed! Winner: name with $X for itemName"
    }
};

int main() {
    // Auctioneer auctioneer("Vintage Watch");
    // Bidder alice(&auctioneer, "Alice", 500);
    // Bidder bob(&auctioneer, "Bob", 300);
    // Bidder charlie(&auctioneer, "Charlie", 700);
    // auctioneer.registerBidder(&alice);
    // auctioneer.registerBidder(&bob);
    // auctioneer.registerBidder(&charlie);
    // alice.bid(100);
    // bob.bid(105);
    // bob.bid(150);
    // charlie.bid(200);
    // alice.bid(250);
    // bob.bid(400);
    // charlie.bid(300);
    // auctioneer.closeAuction();
    return 0;
}
```

```go
package main

type AuctionMediator interface {
	RegisterBidder(bidder *Bidder)
	PlaceBid(bidder *Bidder, amount int)
	CloseAuction()
}

type Bidder struct {
	mediator AuctionMediator
	name     string
	balance  int
}

func NewBidder(mediator AuctionMediator, name string, balance int) *Bidder {
	return &Bidder{
		mediator: mediator,
		name:     name,
		balance:  balance,
	}
}

func (b *Bidder) GetName() string {
	return b.name
}

func (b *Bidder) GetBalance() int {
	return b.balance
}

func (b *Bidder) Bid(amount int) {
	// TODO: Print bidder placing bid and delegate to mediator
	b.mediator.PlaceBid(b, amount)
}

func (b *Bidder) ReceiveNotification(message string) {
	// TODO: Print bidder notification
}

// Concrete Mediator
type Auctioneer struct {
	bidders            []*Bidder
	highestBid         int
	highestBidder      *Bidder
	itemName           string
	MINIMUM_INCREMENT int
}

func NewAuctioneer(itemName string) *Auctioneer {
	return &Auctioneer{
		bidders:            []*Bidder{},
		highestBid:         0,
		highestBidder:      nil,
		itemName:           itemName,
		MINIMUM_INCREMENT: 10,
	}
}

func (a *Auctioneer) RegisterBidder(bidder *Bidder) {
	// TODO: Add bidder to the list
}

func (a *Auctioneer) PlaceBid(bidder *Bidder, amount int) {
	// TODO: Reject if amount <= highestBid + MINIMUM_INCREMENT, notify bidder
	// TODO: Reject if amount > bidder balance, notify bidder
	// TODO: On valid bid: update highestBid and highestBidder
	// TODO: Notify all other bidders of the new highest bid
}

func (a *Auctioneer) CloseAuction() {
	// TODO: If no bids, notify all "Auction closed. No bids on itemName."
	// TODO: If winner, notify all "Auction closed! Winner: name with $X for itemName"
}

func main() {
	// auctioneer := NewAuctioneer("Vintage Watch")
	// alice := NewBidder(auctioneer, "Alice", 500)
	// bob := NewBidder(auctioneer, "Bob", 300)
	// charlie := NewBidder(auctioneer, "Charlie", 700)
	// auctioneer.RegisterBidder(alice)
	// auctioneer.RegisterBidder(bob)
	// auctioneer.RegisterBidder(charlie)
	// alice.Bid(100)
	// bob.Bid(105)
	// bob.Bid(150)
	// charlie.Bid(200)
	// alice.Bid(250)
	// bob.Bid(400)
	// charlie.Bid(300)
	// auctioneer.CloseAuction()
}
```

```csharp
using System;
using System.Collections.Generic;

interface IAuctionMediator
{
    void RegisterBidder(Bidder bidder);
    void PlaceBid(Bidder bidder, int amount);
    void CloseAuction();
}

class Bidder
{
    private IAuctionMediator mediator;
    private string name;
    private int balance;

    public Bidder(IAuctionMediator mediator, string name, int balance)
    {
        this.mediator = mediator;
        this.name = name;
        this.balance = balance;
    }

    public string Name => name;
    public int Balance => balance;

    public void Bid(int amount)
    {
        Console.WriteLine(name + " places bid: $" + amount);
        mediator.PlaceBid(this, amount);
    }

    public void ReceiveNotification(string message)
    {
        Console.WriteLine("[" + name + "] " + message);
    }
}

// Concrete Mediator
class Auctioneer : IAuctionMediator
{
    private List<Bidder> bidders = new List<Bidder>();
    private int highestBid = 0;
    private Bidder highestBidder = null;
    private string itemName;
    private const int MinimumIncrement = 10;

    public Auctioneer(string itemName)
    {
        // TODO: Store item name
        this.itemName = itemName;
    }

    public void RegisterBidder(Bidder bidder)
    {
        // TODO: Add bidder to the list
    }

    public void PlaceBid(Bidder bidder, int amount)
    {
        // TODO: Reject if amount <= highestBid + MinimumIncrement, notify bidder
        // TODO: Reject if amount > bidder balance, notify bidder
        // TODO: On valid bid: update highestBid and highestBidder
        // TODO: Notify all other bidders of the new highest bid
    }

    public void CloseAuction()
    {
        // TODO: If no bids, notify all "Auction closed. No bids on itemName."
        // TODO: If winner, notify all "Auction closed! Winner: name with $X for itemName"
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Auctioneer auctioneer = new Auctioneer("Vintage Watch");
        // Bidder alice = new Bidder(auctioneer, "Alice", 500);
        // Bidder bob = new Bidder(auctioneer, "Bob", 300);
        // Bidder charlie = new Bidder(auctioneer, "Charlie", 700);
        // auctioneer.RegisterBidder(alice);
        // auctioneer.RegisterBidder(bob);
        // auctioneer.RegisterBidder(charlie);
        // alice.Bid(100);
        // bob.Bid(105);
        // bob.Bid(150);
        // charlie.Bid(200);
        // alice.Bid(250);
        // bob.Bid(400);
        // charlie.Bid(300);
        // auctioneer.CloseAuction();
    }
}
```

```typescript
interface AuctionMediator {
    registerBidder(bidder: Bidder): void;
    placeBid(bidder: Bidder, amount: number): void;
    closeAuction(): void;
}

class Bidder {
    private mediator: AuctionMediator;
    private name: string;
    private balance: number;

    constructor(mediator: AuctionMediator, name: string, balance: number) {
        this.mediator = mediator;
        this.name = name;
        this.balance = balance;
    }

    getName(): string {
        return this.name;
    }
    getBalance(): number {
        return this.balance;
    }

    bid(amount: number): void {
        console.log(`${this.name} places bid: $${amount}`);
        this.mediator.placeBid(this, amount);
    }

    receiveNotification(message: string): void {
        console.log(`[${this.name}] ${message}`);
    }
}

// Concrete Mediator
class Auctioneer implements AuctionMediator {
    private bidders: Bidder[] = [];
    private highestBid: number = 0;
    private highestBidder: Bidder | null = null;
    private itemName: string;
    private readonly MINIMUM_INCREMENT = 10;

    constructor(itemName: string) {
        this.itemName = itemName;
    }

    registerBidder(bidder: Bidder): void {
        // TODO: Add bidder to the list
    }

    placeBid(bidder: Bidder, amount: number): void {
        // TODO: Reject if amount <= highestBid + MINIMUM_INCREMENT, notify bidder
        // TODO: Reject if amount > bidder balance, notify bidder
        // TODO: On valid bid: update highestBid and highestBidder
        // TODO: Notify all other bidders of the new highest bid
    }

    closeAuction(): void {
        // TODO: If no bids, notify all "Auction closed. No bids on itemName."
        // TODO: If winner, notify all "Auction closed! Winner: name with $X for itemName"
    }
}

// const auctioneer = new Auctioneer("Vintage Watch");
// const alice = new Bidder(auctioneer, "Alice", 500);
// const bob = new Bidder(auctioneer, "Bob", 300);
// const charlie = new Bidder(auctioneer, "Charlie", 700);
// auctioneer.registerBidder(alice);
// auctioneer.registerBidder(bob);
// auctioneer.registerBidder(charlie);
// alice.bid(100);
// bob.bid(105);
// bob.bid(150);
// charlie.bid(200);
// alice.bid(250);
// bob.bid(400);
// charlie.bid(300);
// auctioneer.closeAuction();
```

#### Solutions

```java
import java.util.*;

interface AuctionMediator {
    void registerBidder(Bidder bidder);
    void placeBid(Bidder bidder, int amount);
    void closeAuction();
}

class Bidder {
    private AuctionMediator mediator;
    private String name;
    private int balance;

    public Bidder(AuctionMediator mediator, String name, int balance) {
        this.mediator = mediator;
        this.name = name;
        this.balance = balance;
    }

    public String getName() { return name; }
    public int getBalance() { return balance; }

    public void bid(int amount) {
        System.out.println(name + " places bid: $" + amount);
        mediator.placeBid(this, amount);
    }

    public void receiveNotification(String message) {
        System.out.println("[" + name + "] " + message);
    }
}

// Concrete Mediator
class Auctioneer implements AuctionMediator {
    private List<Bidder> bidders = new ArrayList<>();
    private int highestBid = 0;
    private Bidder highestBidder = null;
    private String itemName;
    private static final int MINIMUM_INCREMENT = 10;

    public Auctioneer(String itemName) {
        this.itemName = itemName;
    }

    @Override
    public void registerBidder(Bidder bidder) {
        bidders.add(bidder);
        if (bidders.size() == 1) {
            System.out.println("[Auctioneer] Auction for \"" + itemName + "\" is open!");
        }
    }

    @Override
    public void placeBid(Bidder bidder, int amount) {
        if (amount < highestBid + MINIMUM_INCREMENT) {
            bidder.receiveNotification("Bid rejected. Minimum bid is $" + (highestBid + MINIMUM_INCREMENT)
                + " (current: $" + highestBid + " + $" + MINIMUM_INCREMENT + " increment).");
            return;
        }
        if (amount > bidder.getBalance()) {
            bidder.receiveNotification("Bid rejected. Amount exceeds your balance of $" + bidder.getBalance() + ".");
            return;
        }
        highestBid = amount;
        highestBidder = bidder;
        System.out.println("[Auctioneer] New highest bid: $" + amount + " by " + bidder.getName());
        for (Bidder b : bidders) {
            if (b != bidder) {
                b.receiveNotification(bidder.getName() + " bid $" + amount + " on \"" + itemName + "\"");
            }
        }
    }

    @Override
    public void closeAuction() {
        if (highestBidder == null) {
            System.out.println("[Auctioneer] Auction closed. No bids on " + itemName + ".");
        } else {
            System.out.println("[Auctioneer] Auction closed! Winner: " + highestBidder.getName()
                + " with $" + highestBid + " for \"" + itemName + "\"");
            for (Bidder b : bidders) {
                if (b == highestBidder) {
                    b.receiveNotification("Congratulations! You won \"" + itemName + "\" for $" + highestBid + "!");
                } else {
                    b.receiveNotification("Auction ended. Winner: " + highestBidder.getName() + " with $" + highestBid);
                }
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Auctioneer auctioneer = new Auctioneer("Vintage Watch");
        Bidder alice = new Bidder(auctioneer, "Alice", 500);
        Bidder bob = new Bidder(auctioneer, "Bob", 300);
        Bidder charlie = new Bidder(auctioneer, "Charlie", 700);
        auctioneer.registerBidder(alice);
        auctioneer.registerBidder(bob);
        auctioneer.registerBidder(charlie);
        alice.bid(100);
        bob.bid(105);     // too low (need 110+)
        bob.bid(150);
        charlie.bid(200);
        alice.bid(250);
        bob.bid(400);     // exceeds Bob's balance of 300
        charlie.bid(300);
        auctioneer.closeAuction();
    }
}
```

```python
from abc import ABC, abstractmethod

class AuctionMediator(ABC):
    @abstractmethod
    def register_bidder(self, bidder): pass
    @abstractmethod
    def place_bid(self, bidder, amount): pass
    @abstractmethod
    def close_auction(self): pass

class Bidder:
    def __init__(self, mediator, name, balance):
        self.mediator = mediator
        self.name = name
        self.balance = balance

    def bid(self, amount):
        print(f"{self.name} places bid: ${amount}")
        self.mediator.place_bid(self, amount)

    def receive_notification(self, message):
        print(f"[{self.name}] {message}")

# Concrete Mediator
class Auctioneer(AuctionMediator):
    def __init__(self, item_name):
        self.bidders = []
        self.highest_bid = 0
        self.highest_bidder = None
        self.item_name = item_name
        self.MINIMUM_INCREMENT = 10

    def register_bidder(self, bidder):
        self.bidders.append(bidder)
        if len(self.bidders) == 1:
            print(f'[Auctioneer] Auction for "{self.item_name}" is open!')

    def place_bid(self, bidder, amount):
        if amount < self.highest_bid + self.MINIMUM_INCREMENT:
            bidder.receive_notification(
                f"Bid rejected. Minimum bid is ${self.highest_bid + self.MINIMUM_INCREMENT}"
                f" (current: ${self.highest_bid} + ${self.MINIMUM_INCREMENT} increment).")
            return
        if amount > bidder.balance:
            bidder.receive_notification(f"Bid rejected. Amount exceeds your balance of ${bidder.balance}.")
            return
        self.highest_bid = amount
        self.highest_bidder = bidder
        print(f"[Auctioneer] New highest bid: ${amount} by {bidder.name}")
        for b in self.bidders:
            if b is not bidder:
                b.receive_notification(f'{bidder.name} bid ${amount} on "{self.item_name}"')

    def close_auction(self):
        if self.highest_bidder is None:
            print(f"[Auctioneer] Auction closed. No bids on {self.item_name}.")
        else:
            print(f'[Auctioneer] Auction closed! Winner: {self.highest_bidder.name}'
                  f' with ${self.highest_bid} for "{self.item_name}"')
            for b in self.bidders:
                if b is self.highest_bidder:
                    b.receive_notification(
                        f'Congratulations! You won "{self.item_name}" for ${self.highest_bid}!')
                else:
                    b.receive_notification(
                        f"Auction ended. Winner: {self.highest_bidder.name} with ${self.highest_bid}")

if __name__ == "__main__":
    auctioneer = Auctioneer("Vintage Watch")
    alice = Bidder(auctioneer, "Alice", 500)
    bob = Bidder(auctioneer, "Bob", 300)
    charlie = Bidder(auctioneer, "Charlie", 700)
    auctioneer.register_bidder(alice)
    auctioneer.register_bidder(bob)
    auctioneer.register_bidder(charlie)
    alice.bid(100)
    bob.bid(105)
    bob.bid(150)
    charlie.bid(200)
    alice.bid(250)
    bob.bid(400)
    charlie.bid(300)
    auctioneer.close_auction()
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Bidder;

class AuctionMediator {
public:
    virtual ~AuctionMediator() = default;
    virtual void registerBidder(Bidder* bidder) = 0;
    virtual void placeBid(Bidder* bidder, int amount) = 0;
    virtual void closeAuction() = 0;
};

class Bidder {
private:
    AuctionMediator* mediator;
    string name;
    int balance;
public:
    Bidder(AuctionMediator* mediator, const string& name, int balance)
        : mediator(mediator), name(name), balance(balance) {}
    string getName() const { return name; }
    int getBalance() const { return balance; }
    void bid(int amount) {
        cout << name << " places bid: $" << amount << endl;
        mediator->placeBid(this, amount);
    }
    void receiveNotification(const string& message) {
        cout << "[" << name << "] " << message << endl;
    }
};

// Concrete Mediator
class Auctioneer : public AuctionMediator {
    vector<Bidder*> bidders;
    int highestBid = 0;
    Bidder* highestBidder = nullptr;
    string itemName;
    static const int MINIMUM_INCREMENT = 10;
public:
    Auctioneer(const string& itemName) : itemName(itemName) {}

    void registerBidder(Bidder* bidder) override {
        bidders.push_back(bidder);
        if (bidders.size() == 1) {
            cout << "[Auctioneer] Auction for \"" << itemName << "\" is open!" << endl;
        }
    }

    void placeBid(Bidder* bidder, int amount) override {
        if (amount < highestBid + MINIMUM_INCREMENT) {
            bidder->receiveNotification("Bid rejected. Minimum bid is $" + to_string(highestBid + MINIMUM_INCREMENT)
                + " (current: $" + to_string(highestBid) + " + $" + to_string(MINIMUM_INCREMENT) + " increment).");
            return;
        }
        if (amount > bidder->getBalance()) {
            bidder->receiveNotification("Bid rejected. Amount exceeds your balance of $" + to_string(bidder->getBalance()) + ".");
            return;
        }
        highestBid = amount;
        highestBidder = bidder;
        cout << "[Auctioneer] New highest bid: $" << amount << " by " << bidder->getName() << endl;
        for (auto b : bidders) {
            if (b != bidder) {
                b->receiveNotification(bidder->getName() + " bid $" + to_string(amount) + " on \"" + itemName + "\"");
            }
        }
    }

    void closeAuction() override {
        if (highestBidder == nullptr) {
            cout << "[Auctioneer] Auction closed. No bids on " << itemName << "." << endl;
        } else {
            cout << "[Auctioneer] Auction closed! Winner: " << highestBidder->getName()
                 << " with $" << highestBid << " for \"" << itemName << "\"" << endl;
            for (auto b : bidders) {
                if (b == highestBidder) {
                    b->receiveNotification("Congratulations! You won \"" + itemName + "\" for $" + to_string(highestBid) + "!");
                } else {
                    b->receiveNotification("Auction ended. Winner: " + highestBidder->getName() + " with $" + to_string(highestBid));
                }
            }
        }
    }
};

int main() {
    Auctioneer auctioneer("Vintage Watch");
    Bidder alice(&auctioneer, "Alice", 500);
    Bidder bob(&auctioneer, "Bob", 300);
    Bidder charlie(&auctioneer, "Charlie", 700);
    auctioneer.registerBidder(&alice);
    auctioneer.registerBidder(&bob);
    auctioneer.registerBidder(&charlie);
    alice.bid(100);
    bob.bid(105);
    bob.bid(150);
    charlie.bid(200);
    alice.bid(250);
    bob.bid(400);
    charlie.bid(300);
    auctioneer.closeAuction();
    return 0;
}
```

```go
package main

import "fmt"

type AuctionMediator interface {
	RegisterBidder(bidder *Bidder)
	PlaceBid(bidder *Bidder, amount int)
	CloseAuction()
}

type Bidder struct {
	mediator AuctionMediator
	name     string
	balance  int
}

func NewBidder(mediator AuctionMediator, name string, balance int) *Bidder {
	return &Bidder{
		mediator: mediator,
		name:     name,
		balance:  balance,
	}
}

func (b *Bidder) GetName() string {
	return b.name
}

func (b *Bidder) GetBalance() int {
	return b.balance
}

func (b *Bidder) Bid(amount int) {
	fmt.Printf("%s places bid: $%d\n", b.name, amount)
	b.mediator.PlaceBid(b, amount)
}

func (b *Bidder) ReceiveNotification(message string) {
	fmt.Printf("[%s] %s\n", b.name, message)
}

// Concrete Mediator
type Auctioneer struct {
	bidders      []*Bidder
	highestBid   int
	highestBidder *Bidder
	itemName     string
}

const MinimumIncrement = 10

func NewAuctioneer(itemName string) *Auctioneer {
	return &Auctioneer{
		bidders:    make([]*Bidder, 0),
		highestBid: 0,
		itemName:   itemName,
	}
}

func (a *Auctioneer) RegisterBidder(bidder *Bidder) {
	a.bidders = append(a.bidders, bidder)
	if len(a.bidders) == 1 {
		fmt.Printf("[Auctioneer] Auction for \"%s\" is open!\n", a.itemName)
	}
}

func (a *Auctioneer) PlaceBid(bidder *Bidder, amount int) {
	if amount < a.highestBid+MinimumIncrement {
		bidder.ReceiveNotification(fmt.Sprintf("Bid rejected. Minimum bid is $%d (current: $%d + $%d increment).",
			a.highestBid+MinimumIncrement, a.highestBid, MinimumIncrement))
		return
	}
	if amount > bidder.GetBalance() {
		bidder.ReceiveNotification(fmt.Sprintf("Bid rejected. Amount exceeds your balance of $%d.", bidder.GetBalance()))
		return
	}
	a.highestBid = amount
	a.highestBidder = bidder
	fmt.Printf("[Auctioneer] New highest bid: $%d by %s\n", amount, bidder.GetName())
	for _, b := range a.bidders {
		if b != bidder {
			b.ReceiveNotification(fmt.Sprintf("%s bid $%d on \"%s\"", bidder.GetName(), amount, a.itemName))
		}
	}
}

func (a *Auctioneer) CloseAuction() {
	if a.highestBidder == nil {
		fmt.Printf("[Auctioneer] Auction closed. No bids on %s.\n", a.itemName)
		return
	}

	fmt.Printf("[Auctioneer] Auction closed! Winner: %s with $%d for \"%s\"\n",
		a.highestBidder.GetName(), a.highestBid, a.itemName)
	for _, b := range a.bidders {
		if b == a.highestBidder {
			b.ReceiveNotification(fmt.Sprintf("Congratulations! You won \"%s\" for $%d!", a.itemName, a.highestBid))
		} else {
			b.ReceiveNotification(fmt.Sprintf("Auction ended. Winner: %s with $%d", a.highestBidder.GetName(), a.highestBid))
		}
	}
}

func main() {
	auctioneer := NewAuctioneer("Vintage Watch")
	alice := NewBidder(auctioneer, "Alice", 500)
	bob := NewBidder(auctioneer, "Bob", 300)
	charlie := NewBidder(auctioneer, "Charlie", 700)

	auctioneer.RegisterBidder(alice)
	auctioneer.RegisterBidder(bob)
	auctioneer.RegisterBidder(charlie)

	alice.Bid(100)
	bob.Bid(105)
	bob.Bid(150)
	charlie.Bid(200)
	alice.Bid(250)
	bob.Bid(400)
	charlie.Bid(300)

	auctioneer.CloseAuction()
}
```

```csharp
using System;
using System.Collections.Generic;

interface IAuctionMediator
{
    void RegisterBidder(Bidder bidder);
    void PlaceBid(Bidder bidder, int amount);
    void CloseAuction();
}

class Bidder
{
    private IAuctionMediator mediator;
    private string name;
    private int balance;

    public Bidder(IAuctionMediator mediator, string name, int balance)
    {
        this.mediator = mediator;
        this.name = name;
        this.balance = balance;
    }

    public string Name => name;
    public int Balance => balance;

    public void Bid(int amount)
    {
        Console.WriteLine(name + " places bid: $" + amount);
        mediator.PlaceBid(this, amount);
    }

    public void ReceiveNotification(string message)
    {
        Console.WriteLine("[" + name + "] " + message);
    }
}

// Concrete Mediator
class Auctioneer : IAuctionMediator
{
    private List<Bidder> bidders = new List<Bidder>();
    private int highestBid = 0;
    private Bidder highestBidder = null;
    private string itemName;
    private const int MinimumIncrement = 10;

    public Auctioneer(string itemName)
    {
        this.itemName = itemName;
    }

    public void RegisterBidder(Bidder bidder)
    {
        bidders.Add(bidder);
        if (bidders.Count == 1)
            Console.WriteLine("[Auctioneer] Auction for \"" + itemName + "\" is open!");
    }

    public void PlaceBid(Bidder bidder, int amount)
    {
        if (amount < highestBid + MinimumIncrement)
        {
            bidder.ReceiveNotification("Bid rejected. Minimum bid is $" + (highestBid + MinimumIncrement)
                + " (current: $" + highestBid + " + $" + MinimumIncrement + " increment).");
            return;
        }
        if (amount > bidder.Balance)
        {
            bidder.ReceiveNotification("Bid rejected. Amount exceeds your balance of $" + bidder.Balance + ".");
            return;
        }
        highestBid = amount;
        highestBidder = bidder;
        Console.WriteLine("[Auctioneer] New highest bid: $" + amount + " by " + bidder.Name);
        foreach (var b in bidders)
            if (b != bidder)
                b.ReceiveNotification(bidder.Name + " bid $" + amount + " on \"" + itemName + "\"");
    }

    public void CloseAuction()
    {
        if (highestBidder == null)
        {
            Console.WriteLine("[Auctioneer] Auction closed. No bids on " + itemName + ".");
        }
        else
        {
            Console.WriteLine("[Auctioneer] Auction closed! Winner: " + highestBidder.Name
                + " with $" + highestBid + " for \"" + itemName + "\"");
            foreach (var b in bidders)
            {
                if (b == highestBidder)
                    b.ReceiveNotification("Congratulations! You won \"" + itemName + "\" for $" + highestBid + "!");
                else
                    b.ReceiveNotification("Auction ended. Winner: " + highestBidder.Name + " with $" + highestBid);
            }
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        Auctioneer auctioneer = new Auctioneer("Vintage Watch");
        Bidder alice = new Bidder(auctioneer, "Alice", 500);
        Bidder bob = new Bidder(auctioneer, "Bob", 300);
        Bidder charlie = new Bidder(auctioneer, "Charlie", 700);
        auctioneer.RegisterBidder(alice);
        auctioneer.RegisterBidder(bob);
        auctioneer.RegisterBidder(charlie);
        alice.Bid(100);
        bob.Bid(105);
        bob.Bid(150);
        charlie.Bid(200);
        alice.Bid(250);
        bob.Bid(400);
        charlie.Bid(300);
        auctioneer.CloseAuction();
    }
}
```

```typescript
interface AuctionMediator {
    registerBidder(bidder: Bidder): void;
    placeBid(bidder: Bidder, amount: number): void;
    closeAuction(): void;
}

class Bidder {
    private mediator: AuctionMediator;
    private name: string;
    private balance: number;

    constructor(mediator: AuctionMediator, name: string, balance: number) {
        this.mediator = mediator;
        this.name = name;
        this.balance = balance;
    }

    getName(): string {
        return this.name;
    }
    getBalance(): number {
        return this.balance;
    }

    bid(amount: number): void {
        console.log(`${this.name} places bid: $${amount}`);
        this.mediator.placeBid(this, amount);
    }

    receiveNotification(message: string): void {
        console.log(`[${this.name}] ${message}`);
    }
}

// Concrete Mediator
class Auctioneer implements AuctionMediator {
    private bidders: Bidder[] = [];
    private highestBid: number = 0;
    private highestBidder: Bidder | null = null;
    private itemName: string;
    private readonly MINIMUM_INCREMENT = 10;

    constructor(itemName: string) {
        this.itemName = itemName;
    }

    registerBidder(bidder: Bidder): void {
        this.bidders.push(bidder);
        if (this.bidders.length === 1) {
            console.log(`[Auctioneer] Auction for "${this.itemName}" is open!`);
        }
    }

    placeBid(bidder: Bidder, amount: number): void {
        if (amount < this.highestBid + this.MINIMUM_INCREMENT) {
            bidder.receiveNotification(`Bid rejected. Minimum bid is $${this.highestBid + this.MINIMUM_INCREMENT} (current: $${this.highestBid} + $${this.MINIMUM_INCREMENT} increment).`);
            return;
        }
        if (amount > bidder.getBalance()) {
            bidder.receiveNotification(`Bid rejected. Amount exceeds your balance of $${bidder.getBalance()}.`);
            return;
        }
        this.highestBid = amount;
        this.highestBidder = bidder;
        console.log(`[Auctioneer] New highest bid: $${amount} by ${bidder.getName()}`);
        for (const b of this.bidders) {
            if (b !== bidder) {
                b.receiveNotification(`${bidder.getName()} bid $${amount} on "${this.itemName}"`);
            }
        }
    }

    closeAuction(): void {
        if (this.highestBidder === null) {
            console.log(`[Auctioneer] Auction closed. No bids on ${this.itemName}.`);
        } else {
            console.log(`[Auctioneer] Auction closed! Winner: ${this.highestBidder.getName()} with $${this.highestBid} for "${this.itemName}"`);
            for (const b of this.bidders) {
                if (b === this.highestBidder) {
                    b.receiveNotification(`Congratulations! You won "${this.itemName}" for $${this.highestBid}!`);
                } else {
                    b.receiveNotification(`Auction ended. Winner: ${this.highestBidder.getName()} with $${this.highestBid}`);
                }
            }
        }
    }
}

const auctioneer = new Auctioneer("Vintage Watch");
const alice = new Bidder(auctioneer, "Alice", 500);
const bob = new Bidder(auctioneer, "Bob", 300);
const charlie = new Bidder(auctioneer, "Charlie", 700);
auctioneer.registerBidder(alice);
auctioneer.registerBidder(bob);
auctioneer.registerBidder(charlie);
alice.bid(100);
bob.bid(105);
bob.bid(150);
charlie.bid(200);
alice.bid(250);
bob.bid(400);
charlie.bid(300);
auctioneer.closeAuction();
```


