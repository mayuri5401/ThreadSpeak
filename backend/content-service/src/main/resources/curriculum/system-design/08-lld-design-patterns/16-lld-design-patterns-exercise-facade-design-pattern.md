---
id: "lld-design-patterns-exercise-facade-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Facade Design Pattern"
slug: "lld-design-patterns-exercise-facade-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Facade Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Facade Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Smart Home Controller

**Problem:** Implement a `SmartHomeFacade` that controls lights, thermostat, and a security system. Provide `leaveHome()` and `arriveHome()` methods that coordinate all three subsystems.

**Requirements:**

- `leaveHome()` turns off lights, sets thermostat to eco mode (18C), arms security system
- `arriveHome()` turns on lights, sets thermostat to comfort mode (22C), disarms security system
- Each subsystem prints its actions to the console

```java
// Subsystem: Controls smart lights in the house
class SmartLightsSystem {
    public void on() {
        // TODO: Print "Lights: Turned on."
    }

    public void off() {
        // TODO: Print "Lights: Turned off."
    }
}

// Subsystem: Controls the thermostat temperature and mode
class Thermostat {
    private String mode;

    public void setTemperature(int degrees) {
        // TODO: Print "Thermostat: Mode set to {mode}. Temperature set to {degrees}C."
    }

    public void setMode(String mode) {
        // TODO: Store the mode
    }
}

// Subsystem: Controls the home security system
class SecuritySystem {
    public void arm() {
        // TODO: Print "Security: System armed."
    }

    public void disarm() {
        // TODO: Print "Security: System disarmed."
    }
}

// Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade {
    private SmartLightsSystem lights;
    private Thermostat thermostat;
    private SecuritySystem security;

    public SmartHomeFacade(SmartLightsSystem lights, Thermostat thermostat, SecuritySystem security) {
        // TODO: Store references to all subsystems
    }

    public void leaveHome() {
        // TODO: Print "--- Leaving Home ---"
        // TODO: Turn off lights, set thermostat to eco mode (18C), arm security
        // TODO: Print "--- Home secured ---"
    }

    public void arriveHome() {
        // TODO: Print "--- Arriving Home ---"
        // TODO: Turn on lights, set thermostat to comfort mode (22C), disarm security
        // TODO: Print "--- Welcome home! ---"
    }
}

public class Main {
    public static void main(String[] args) {
        SmartLightsSystem lights = new SmartLightsSystem();
        Thermostat thermostat = new Thermostat();
        SecuritySystem security = new SecuritySystem();

        SmartHomeFacade home = new SmartHomeFacade(lights, thermostat, security);
        home.leaveHome();
        System.out.println();
        home.arriveHome();
    }
}
```

```python
# Subsystem: Controls smart lights in the house
class SmartLightsSystem:
    def on(self):
        pass  # TODO: Print "Lights: Turned on."

    def off(self):
        pass  # TODO: Print "Lights: Turned off."

# Subsystem: Controls the thermostat temperature and mode
class Thermostat:
    def __init__(self):
        self._mode = ""

    def set_temperature(self, degrees: int):
        pass  # TODO: Print "Thermostat: Mode set to {mode}. Temperature set to {degrees}C."

    def set_mode(self, mode: str):
        pass  # TODO: Store the mode

# Subsystem: Controls the home security system
class SecuritySystem:
    def arm(self):
        pass  # TODO: Print "Security: System armed."

    def disarm(self):
        pass  # TODO: Print "Security: System disarmed."

# Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade:
    def __init__(self, lights: SmartLightsSystem, thermostat: Thermostat, security: SecuritySystem):
        pass  # TODO: Store references to all subsystems

    def leave_home(self):
        # TODO: Print "--- Leaving Home ---"
        # TODO: Turn off lights, set thermostat to eco mode (18C), arm security
        # TODO: Print "--- Home secured ---"
        pass

    def arrive_home(self):
        # TODO: Print "--- Arriving Home ---"
        # TODO: Turn on lights, set thermostat to comfort mode (22C), disarm security
        # TODO: Print "--- Welcome home! ---"
        pass

if __name__ == "__main__":
    lights = SmartLightsSystem()
    thermostat = Thermostat()
    security = SecuritySystem()

    home = SmartHomeFacade(lights, thermostat, security)
    home.leave_home()
    print()
    home.arrive_home()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

// Subsystem: Controls smart lights in the house
class SmartLightsSystem {
public:
    void on() {
        // TODO: Print "Lights: Turned on."
    }

    void off() {
        // TODO: Print "Lights: Turned off."
    }
};

// Subsystem: Controls the thermostat temperature and mode
class Thermostat {
    string mode;
public:
    void setTemperature(int degrees) {
        // TODO: Print "Thermostat: Mode set to {mode}. Temperature set to {degrees}C."
    }

    void setMode(const string& mode) {
        // TODO: Store the mode
    }
};

// Subsystem: Controls the home security system
class SecuritySystem {
public:
    void arm() {
        // TODO: Print "Security: System armed."
    }

    void disarm() {
        // TODO: Print "Security: System disarmed."
    }
};

// Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade {
    SmartLightsSystem& lights;
    Thermostat& thermostat;
    SecuritySystem& security;

public:
    SmartHomeFacade(SmartLightsSystem& lights, Thermostat& thermostat, SecuritySystem& security)
        : lights(lights), thermostat(thermostat), security(security)
    {
        // TODO: References are already initialized via initializer list
    }

    void leaveHome() {
        // TODO: Print "--- Leaving Home ---"
        // TODO: Turn off lights, set thermostat to eco mode (18C), arm security
        // TODO: Print "--- Home secured ---"
    }

    void arriveHome() {
        // TODO: Print "--- Arriving Home ---"
        // TODO: Turn on lights, set thermostat to comfort mode (22C), disarm security
        // TODO: Print "--- Welcome home! ---"
    }
};

int main() {
    SmartLightsSystem lights;
    Thermostat thermostat;
    SecuritySystem security;

    SmartHomeFacade home(lights, thermostat, security);
    home.leaveHome();
    cout << endl;
    home.arriveHome();
    return 0;
}
```

```go
package main

import "fmt"

// Subsystem: Controls smart lights in the house
type SmartLightsSystem struct{}

func (s *SmartLightsSystem) On() {
	// TODO: Print "Lights: Turned on."
	fmt.Println()
}

func (s *SmartLightsSystem) Off() {
	// TODO: Print "Lights: Turned off."
	fmt.Println()
}

// Subsystem: Controls the thermostat temperature and mode
type Thermostat struct {
	mode string
}

func (t *Thermostat) SetTemperature(degrees int) {
	// TODO: Print "Thermostat: Mode set to {mode}. Temperature set to {degrees}C."
	fmt.Println()
}

func (t *Thermostat) SetMode(mode string) {
	// TODO: Store the mode
	t.mode = mode
}

// Subsystem: Controls the home security system
type SecuritySystem struct{}

func (s *SecuritySystem) Arm() {
	// TODO: Print "Security: System armed."
	fmt.Println()
}

func (s *SecuritySystem) Disarm() {
	// TODO: Print "Security: System disarmed."
	fmt.Println()
}

// Facade: Provides simplified methods to control all smart home subsystems
type SmartHomeFacade struct {
	lights     *SmartLightsSystem
	thermostat *Thermostat
	security   *SecuritySystem
}

func NewSmartHomeFacade(lights *SmartLightsSystem, thermostat *Thermostat, security *SecuritySystem) *SmartHomeFacade {
	// TODO: Store references to all subsystems
	return &SmartHomeFacade{
		lights:     lights,
		thermostat: thermostat,
		security:   security,
	}
}

func (s *SmartHomeFacade) LeaveHome() {
	// TODO: Print "--- Leaving Home ---"
	// TODO: Turn off lights, set thermostat to eco mode (18C), arm security
	// TODO: Print "--- Home secured ---"
	fmt.Println()
}

func (s *SmartHomeFacade) ArriveHome() {
	// TODO: Print "--- Arriving Home ---"
	// TODO: Turn on lights, set thermostat to comfort mode (22C), disarm security
	// TODO: Print "--- Welcome home! ---"
	fmt.Println()
}

func main() {
	lights := &SmartLightsSystem{}
	thermostat := &Thermostat{}
	security := &SecuritySystem{}

	home := NewSmartHomeFacade(lights, thermostat, security)
	home.LeaveHome()
	fmt.Println()
	home.ArriveHome()
}
```

```csharp
using System;

// Subsystem: Controls smart lights in the house
class SmartLightsSystem
{
    public void On()
    {
        // TODO: Print "Lights: Turned on."
    }

    public void Off()
    {
        // TODO: Print "Lights: Turned off."
    }
}

// Subsystem: Controls the thermostat temperature and mode
class Thermostat
{
    private string mode;

    public void SetTemperature(int degrees)
    {
        // TODO: Print "Thermostat: Mode set to {mode}. Temperature set to {degrees}C."
    }

    public void SetMode(string mode)
    {
        // TODO: Store the mode
    }
}

// Subsystem: Controls the home security system
class SecuritySystem
{
    public void Arm()
    {
        // TODO: Print "Security: System armed."
    }

    public void Disarm()
    {
        // TODO: Print "Security: System disarmed."
    }
}

// Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade
{
    private SmartLightsSystem lights;
    private Thermostat thermostat;
    private SecuritySystem security;

    public SmartHomeFacade(SmartLightsSystem lights, Thermostat thermostat, SecuritySystem security)
    {
        // TODO: Store references to all subsystems
    }

    public void LeaveHome()
    {
        // TODO: Print "--- Leaving Home ---"
        // TODO: Turn off lights, set thermostat to eco mode (18C), arm security
        // TODO: Print "--- Home secured ---"
    }

    public void ArriveHome()
    {
        // TODO: Print "--- Arriving Home ---"
        // TODO: Turn on lights, set thermostat to comfort mode (22C), disarm security
        // TODO: Print "--- Welcome home! ---"
    }
}

class Program
{
    static void Main()
    {
        var lights = new SmartLightsSystem();
        var thermostat = new Thermostat();
        var security = new SecuritySystem();

        var home = new SmartHomeFacade(lights, thermostat, security);
        home.LeaveHome();
        Console.WriteLine();
        home.ArriveHome();
    }
}
```

```typescript
// Subsystem: Controls smart lights in the house
class SmartLightsSystem {
    on(): void {
        // TODO: Print "Lights: Turned on."
    }

    off(): void {
        // TODO: Print "Lights: Turned off."
    }
}

// Subsystem: Controls the thermostat temperature and mode
class Thermostat {
    private mode: string = "";

    setTemperature(degrees: number): void {
        // TODO: Print "Thermostat: Mode set to {mode}. Temperature set to {degrees}C."
    }

    setMode(mode: string): void {
        // TODO: Store the mode
    }
}

// Subsystem: Controls the home security system
class SecuritySystem {
    arm(): void {
        // TODO: Print "Security: System armed."
    }

    disarm(): void {
        // TODO: Print "Security: System disarmed."
    }
}

// Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade {
    private lights: SmartLightsSystem;
    private thermostat: Thermostat;
    private security: SecuritySystem;

    constructor(lights: SmartLightsSystem, thermostat: Thermostat, security: SecuritySystem) {
        // TODO: Store references to all subsystems
    }

    leaveHome(): void {
        // TODO: Print "--- Leaving Home ---"
        // TODO: Turn off lights, set thermostat to eco mode (18C), arm security
        // TODO: Print "--- Home secured ---"
    }

    arriveHome(): void {
        // TODO: Print "--- Arriving Home ---"
        // TODO: Turn on lights, set thermostat to comfort mode (22C), disarm security
        // TODO: Print "--- Welcome home! ---"
    }
}

const lights = new SmartLightsSystem();
const thermostat = new Thermostat();
const security = new SecuritySystem();

const home = new SmartHomeFacade(lights, thermostat, security);
home.leaveHome();
console.log();
home.arriveHome();
```

#### Solutions

```java
// Subsystem: Controls smart lights in the house
class SmartLightsSystem {
    public void on() {
        System.out.println("Lights: Turned on.");
    }

    public void off() {
        System.out.println("Lights: Turned off.");
    }
}

// Subsystem: Controls the thermostat temperature and mode
class Thermostat {
    private String mode;

    public void setTemperature(int degrees) {
        System.out.println("Thermostat: Mode set to " + mode + ". Temperature set to " + degrees + "C.");
    }

    public void setMode(String mode) {
        this.mode = mode;
    }
}

// Subsystem: Controls the home security system
class SecuritySystem {
    public void arm() {
        System.out.println("Security: System armed.");
    }

    public void disarm() {
        System.out.println("Security: System disarmed.");
    }
}

// Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade {
    private SmartLightsSystem lights;
    private Thermostat thermostat;
    private SecuritySystem security;

    public SmartHomeFacade(SmartLightsSystem lights, Thermostat thermostat, SecuritySystem security) {
        this.lights = lights;
        this.thermostat = thermostat;
        this.security = security;
    }

    public void leaveHome() {
        System.out.println("--- Leaving Home ---");
        lights.off();
        thermostat.setMode("eco");
        thermostat.setTemperature(18);
        security.arm();
        System.out.println("--- Home secured ---");
    }

    public void arriveHome() {
        System.out.println("--- Arriving Home ---");
        lights.on();
        thermostat.setMode("comfort");
        thermostat.setTemperature(22);
        security.disarm();
        System.out.println("--- Welcome home! ---");
    }
}

public class Main {
    public static void main(String[] args) {
        SmartLightsSystem lights = new SmartLightsSystem();
        Thermostat thermostat = new Thermostat();
        SecuritySystem security = new SecuritySystem();

        SmartHomeFacade home = new SmartHomeFacade(lights, thermostat, security);
        home.leaveHome();
        System.out.println();
        home.arriveHome();
    }
}
```

```python
# Subsystem: Controls smart lights in the house
class SmartLightsSystem:
    def on(self):
        print("Lights: Turned on.")

    def off(self):
        print("Lights: Turned off.")

# Subsystem: Controls the thermostat temperature and mode
class Thermostat:
    def __init__(self):
        self._mode = ""

    def set_temperature(self, degrees: int):
        print(f"Thermostat: Mode set to {self._mode}. Temperature set to {degrees}C.")

    def set_mode(self, mode: str):
        self._mode = mode

# Subsystem: Controls the home security system
class SecuritySystem:
    def arm(self):
        print("Security: System armed.")

    def disarm(self):
        print("Security: System disarmed.")

# Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade:
    def __init__(self, lights: SmartLightsSystem, thermostat: Thermostat, security: SecuritySystem):
        self._lights = lights
        self._thermostat = thermostat
        self._security = security

    def leave_home(self):
        print("--- Leaving Home ---")
        self._lights.off()
        self._thermostat.set_mode("eco")
        self._thermostat.set_temperature(18)
        self._security.arm()
        print("--- Home secured ---")

    def arrive_home(self):
        print("--- Arriving Home ---")
        self._lights.on()
        self._thermostat.set_mode("comfort")
        self._thermostat.set_temperature(22)
        self._security.disarm()
        print("--- Welcome home! ---")

if __name__ == "__main__":
    lights = SmartLightsSystem()
    thermostat = Thermostat()
    security = SecuritySystem()

    home = SmartHomeFacade(lights, thermostat, security)
    home.leave_home()
    print()
    home.arrive_home()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

// Subsystem: Controls smart lights in the house
class SmartLightsSystem {
public:
    void on() {
        cout << "Lights: Turned on." << endl;
    }

    void off() {
        cout << "Lights: Turned off." << endl;
    }
};

// Subsystem: Controls the thermostat temperature and mode
class Thermostat {
    string mode;
public:
    void setTemperature(int degrees) {
        cout << "Thermostat: Mode set to " << mode << ". Temperature set to " << degrees << "C." << endl;
    }

    void setMode(const string& mode) {
        this->mode = mode;
    }
};

// Subsystem: Controls the home security system
class SecuritySystem {
public:
    void arm() {
        cout << "Security: System armed." << endl;
    }

    void disarm() {
        cout << "Security: System disarmed." << endl;
    }
};

// Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade {
    SmartLightsSystem& lights;
    Thermostat& thermostat;
    SecuritySystem& security;

public:
    SmartHomeFacade(SmartLightsSystem& lights, Thermostat& thermostat, SecuritySystem& security)
        : lights(lights), thermostat(thermostat), security(security)
    {}

    void leaveHome() {
        cout << "--- Leaving Home ---" << endl;
        lights.off();
        thermostat.setMode("eco");
        thermostat.setTemperature(18);
        security.arm();
        cout << "--- Home secured ---" << endl;
    }

    void arriveHome() {
        cout << "--- Arriving Home ---" << endl;
        lights.on();
        thermostat.setMode("comfort");
        thermostat.setTemperature(22);
        security.disarm();
        cout << "--- Welcome home! ---" << endl;
    }
};

int main() {
    SmartLightsSystem lights;
    Thermostat thermostat;
    SecuritySystem security;

    SmartHomeFacade home(lights, thermostat, security);
    home.leaveHome();
    cout << endl;
    home.arriveHome();
    return 0;
}
```

```go
package main

import "fmt"

// Subsystem: Controls smart lights in the house
type SmartLightsSystem struct{}

func (s *SmartLightsSystem) On() {
	fmt.Println("Lights: Turned on.")
}

func (s *SmartLightsSystem) Off() {
	fmt.Println("Lights: Turned off.")
}

// Subsystem: Controls the thermostat temperature and mode
type Thermostat struct {
	mode string
}

func (t *Thermostat) SetTemperature(degrees int) {
	fmt.Printf("Thermostat: Mode set to %s. Temperature set to %dC.\n", t.mode, degrees)
}

func (t *Thermostat) SetMode(mode string) {
	t.mode = mode
}

// Subsystem: Controls the home security system
type SecuritySystem struct{}

func (s *SecuritySystem) Arm() {
	fmt.Println("Security: System armed.")
}

func (s *SecuritySystem) Disarm() {
	fmt.Println("Security: System disarmed.")
}

// Facade: Provides simplified methods to control all smart home subsystems
type SmartHomeFacade struct {
	lights     *SmartLightsSystem
	thermostat *Thermostat
	security   *SecuritySystem
}

func NewSmartHomeFacade(lights *SmartLightsSystem, thermostat *Thermostat, security *SecuritySystem) *SmartHomeFacade {
	return &SmartHomeFacade{
		lights:     lights,
		thermostat: thermostat,
		security:   security,
	}
}

func (s *SmartHomeFacade) LeaveHome() {
	fmt.Println("--- Leaving Home ---")
	s.lights.Off()
	s.thermostat.SetMode("eco")
	s.thermostat.SetTemperature(18)
	s.security.Arm()
	fmt.Println("--- Home secured ---")
}

func (s *SmartHomeFacade) ArriveHome() {
	fmt.Println("--- Arriving Home ---")
	s.lights.On()
	s.thermostat.SetMode("comfort")
	s.thermostat.SetTemperature(22)
	s.security.Disarm()
	fmt.Println("--- Welcome home! ---")
}

func main() {
	lights := &SmartLightsSystem{}
	thermostat := &Thermostat{}
	security := &SecuritySystem{}

	home := NewSmartHomeFacade(lights, thermostat, security)
	home.LeaveHome()
	fmt.Println()
	home.ArriveHome()
}
```

```csharp
using System;

// Subsystem: Controls smart lights in the house
class SmartLightsSystem
{
    public void On()
    {
        Console.WriteLine("Lights: Turned on.");
    }

    public void Off()
    {
        Console.WriteLine("Lights: Turned off.");
    }
}

// Subsystem: Controls the thermostat temperature and mode
class Thermostat
{
    private string mode;

    public void SetTemperature(int degrees)
    {
        Console.WriteLine($"Thermostat: Mode set to {mode}. Temperature set to {degrees}C.");
    }

    public void SetMode(string mode)
    {
        this.mode = mode;
    }
}

// Subsystem: Controls the home security system
class SecuritySystem
{
    public void Arm()
    {
        Console.WriteLine("Security: System armed.");
    }

    public void Disarm()
    {
        Console.WriteLine("Security: System disarmed.");
    }
}

// Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade
{
    private SmartLightsSystem lights;
    private Thermostat thermostat;
    private SecuritySystem security;

    public SmartHomeFacade(SmartLightsSystem lights, Thermostat thermostat, SecuritySystem security)
    {
        this.lights = lights;
        this.thermostat = thermostat;
        this.security = security;
    }

    public void LeaveHome()
    {
        Console.WriteLine("--- Leaving Home ---");
        lights.Off();
        thermostat.SetMode("eco");
        thermostat.SetTemperature(18);
        security.Arm();
        Console.WriteLine("--- Home secured ---");
    }

    public void ArriveHome()
    {
        Console.WriteLine("--- Arriving Home ---");
        lights.On();
        thermostat.SetMode("comfort");
        thermostat.SetTemperature(22);
        security.Disarm();
        Console.WriteLine("--- Welcome home! ---");
    }
}

class Program
{
    static void Main()
    {
        var lights = new SmartLightsSystem();
        var thermostat = new Thermostat();
        var security = new SecuritySystem();

        var home = new SmartHomeFacade(lights, thermostat, security);
        home.LeaveHome();
        Console.WriteLine();
        home.ArriveHome();
    }
}
```

```typescript
// Subsystem: Controls smart lights in the house
class SmartLightsSystem {
    on(): void {
        console.log("Lights: Turned on.");
    }

    off(): void {
        console.log("Lights: Turned off.");
    }
}

// Subsystem: Controls the thermostat temperature and mode
class Thermostat {
    private mode: string = "";

    setTemperature(degrees: number): void {
        console.log(`Thermostat: Mode set to ${this.mode}. Temperature set to ${degrees}C.`);
    }

    setMode(mode: string): void {
        this.mode = mode;
    }
}

// Subsystem: Controls the home security system
class SecuritySystem {
    arm(): void {
        console.log("Security: System armed.");
    }

    disarm(): void {
        console.log("Security: System disarmed.");
    }
}

// Facade: Provides simplified methods to control all smart home subsystems
class SmartHomeFacade {
    private lights: SmartLightsSystem;
    private thermostat: Thermostat;
    private security: SecuritySystem;

    constructor(lights: SmartLightsSystem, thermostat: Thermostat, security: SecuritySystem) {
        this.lights = lights;
        this.thermostat = thermostat;
        this.security = security;
    }

    leaveHome(): void {
        console.log("--- Leaving Home ---");
        this.lights.off();
        this.thermostat.setMode("eco");
        this.thermostat.setTemperature(18);
        this.security.arm();
        console.log("--- Home secured ---");
    }

    arriveHome(): void {
        console.log("--- Arriving Home ---");
        this.lights.on();
        this.thermostat.setMode("comfort");
        this.thermostat.setTemperature(22);
        this.security.disarm();
        console.log("--- Welcome home! ---");
    }
}

const lights = new SmartLightsSystem();
const thermostat = new Thermostat();
const security = new SecuritySystem();

const home = new SmartHomeFacade(lights, thermostat, security);
home.leaveHome();
console.log();
home.arriveHome();
```

---

# Exercise 2: Travel Booking System

> [!PAYWALL] This content is for premium members only.

**Problem:** Implement a `TravelBookingFacade` that coordinates flight booking, hotel reservation, and car rental into a single `bookTrip()` method.

**Requirements:**

- `bookTrip(destination, checkIn, checkOut)` books a flight, reserves a hotel, and rents a car
- `cancelTrip(bookingId)` cancels all three reservations
- Each subsystem returns a confirmation ID
- The facade returns a combined booking summary

```java
// Subsystem: Handles flight bookings
class FlightBooking {
    private int counter = 1000;

    public String bookFlight(String destination, String date) {
        // TODO: Increment counter, generate ID "FL-{counter}"
        // TODO: Print "Flight: Booked to {destination} on {date}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    public void cancelFlight(String confirmationId) {
        // TODO: Print "Flight: Cancelled booking {confirmationId}."
    }
}

// Subsystem: Handles hotel reservations
class HotelReservation {
    private int counter = 2000;

    public String reserveRoom(String destination, String checkIn, String checkOut) {
        // TODO: Increment counter, generate ID "HT-{counter}"
        // TODO: Print "Hotel: Reserved in {destination} from {checkIn} to {checkOut}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    public void cancelReservation(String confirmationId) {
        // TODO: Print "Hotel: Cancelled reservation {confirmationId}."
    }
}

// Subsystem: Handles car rentals
class CarRental {
    private int counter = 3000;

    public String rentCar(String location, String pickupDate, String returnDate) {
        // TODO: Increment counter, generate ID "CR-{counter}"
        // TODO: Print "Car: Rented in {location} from {pickupDate} to {returnDate}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    public void cancelRental(String confirmationId) {
        // TODO: Print "Car: Cancelled rental {confirmationId}."
    }
}

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade {
    private FlightBooking flights;
    private HotelReservation hotels;
    private CarRental cars;
    private String flightId;
    private String hotelId;
    private String carId;

    public TravelBookingFacade(FlightBooking flights, HotelReservation hotels, CarRental cars) {
        // TODO: Store references to all subsystems
    }

    public void bookTrip(String destination, String checkIn, String checkOut) {
        // TODO: Print "--- Booking trip to {destination} ---"
        // TODO: Book flight, reserve hotel, rent car (store their IDs)
        // TODO: Print "--- Trip booked! ---"
    }

    public void cancelTrip() {
        // TODO: Print "--- Cancelling trip ---"
        // TODO: Cancel flight, hotel, and car using stored IDs
        // TODO: Print "--- Trip cancelled ---"
    }
}

public class Main {
    public static void main(String[] args) {
        FlightBooking flights = new FlightBooking();
        HotelReservation hotels = new HotelReservation();
        CarRental cars = new CarRental();

        TravelBookingFacade facade = new TravelBookingFacade(flights, hotels, cars);
        facade.bookTrip("Paris", "2025-06-01", "2025-06-07");
        System.out.println();
        facade.cancelTrip();
    }
}
```

```python
# Subsystem: Handles flight bookings
class FlightBooking:
    def __init__(self):
        self._counter = 1000

    def book_flight(self, destination: str, date: str) -> str:
        # TODO: Increment counter, generate ID "FL-{counter}"
        # TODO: Print "Flight: Booked to {destination} on {date}. Confirmation: {id}"
        # TODO: Return the confirmation ID
        return ""

    def cancel_flight(self, confirmation_id: str):
        pass  # TODO: Print "Flight: Cancelled booking {confirmation_id}."

# Subsystem: Handles hotel reservations
class HotelReservation:
    def __init__(self):
        self._counter = 2000

    def reserve_room(self, destination: str, check_in: str, check_out: str) -> str:
        # TODO: Increment counter, generate ID "HT-{counter}"
        # TODO: Print "Hotel: Reserved in {destination} from {check_in} to {check_out}. Confirmation: {id}"
        # TODO: Return the confirmation ID
        return ""

    def cancel_reservation(self, confirmation_id: str):
        pass  # TODO: Print "Hotel: Cancelled reservation {confirmation_id}."

# Subsystem: Handles car rentals
class CarRental:
    def __init__(self):
        self._counter = 3000

    def rent_car(self, location: str, pickup_date: str, return_date: str) -> str:
        # TODO: Increment counter, generate ID "CR-{counter}"
        # TODO: Print "Car: Rented in {location} from {pickup_date} to {return_date}. Confirmation: {id}"
        # TODO: Return the confirmation ID
        return ""

    def cancel_rental(self, confirmation_id: str):
        pass  # TODO: Print "Car: Cancelled rental {confirmation_id}."

# Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade:
    def __init__(self, flights: FlightBooking, hotels: HotelReservation, cars: CarRental):
        # TODO: Store references to all subsystems
        # TODO: Initialize fields for flight_id, hotel_id, car_id
        pass

    def book_trip(self, destination: str, check_in: str, check_out: str):
        # TODO: Print "--- Booking trip to {destination} ---"
        # TODO: Book flight, reserve hotel, rent car (store their IDs)
        # TODO: Print "--- Trip booked! ---"
        pass

    def cancel_trip(self):
        # TODO: Print "--- Cancelling trip ---"
        # TODO: Cancel flight, hotel, and car using stored IDs
        # TODO: Print "--- Trip cancelled ---"
        pass

if __name__ == "__main__":
    flights = FlightBooking()
    hotels = HotelReservation()
    cars = CarRental()

    facade = TravelBookingFacade(flights, hotels, cars)
    facade.book_trip("Paris", "2025-06-01", "2025-06-07")
    print()
    facade.cancel_trip()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

// Subsystem: Handles flight bookings
class FlightBooking {
    int counter = 1000;

public:
    string bookFlight(const string& destination, const string& date) {
        // TODO: Increment counter, generate ID "FL-{counter}"
        // TODO: Print "Flight: Booked to {destination} on {date}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    void cancelFlight(const string& confirmationId) {
        // TODO: Print "Flight: Cancelled booking {confirmationId}."
    }
};

// Subsystem: Handles hotel reservations
class HotelReservation {
    int counter = 2000;

public:
    string reserveRoom(const string& destination, const string& checkIn, const string& checkOut) {
        // TODO: Increment counter, generate ID "HT-{counter}"
        // TODO: Print "Hotel: Reserved in {destination} from {checkIn} to {checkOut}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    void cancelReservation(const string& confirmationId) {
        // TODO: Print "Hotel: Cancelled reservation {confirmationId}."
    }
};

// Subsystem: Handles car rentals
class CarRental {
    int counter = 3000;

public:
    string rentCar(const string& location, const string& pickupDate, const string& returnDate) {
        // TODO: Increment counter, generate ID "CR-{counter}"
        // TODO: Print "Car: Rented in {location} from {pickupDate} to {returnDate}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    void cancelRental(const string& confirmationId) {
        // TODO: Print "Car: Cancelled rental {confirmationId}."
    }
};

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade {
    FlightBooking& flights;
    HotelReservation& hotels;
    CarRental& cars;
    string flightId, hotelId, carId;

public:
    TravelBookingFacade(FlightBooking& flights, HotelReservation& hotels, CarRental& cars)
        : flights(flights), hotels(hotels), cars(cars)
    {}

    void bookTrip(const string& destination, const string& checkIn, const string& checkOut) {
        // TODO: Print "--- Booking trip to {destination} ---"
        // TODO: Book flight, reserve hotel, rent car (store their IDs)
        // TODO: Print "--- Trip booked! ---"
    }

    void cancelTrip() {
        // TODO: Print "--- Cancelling trip ---"
        // TODO: Cancel flight, hotel, and car using stored IDs
        // TODO: Print "--- Trip cancelled ---"
    }
};

int main() {
    FlightBooking flights;
    HotelReservation hotels;
    CarRental cars;

    TravelBookingFacade facade(flights, hotels, cars);
    facade.bookTrip("Paris", "2025-06-01", "2025-06-07");
    cout << endl;
    facade.cancelTrip();
    return 0;
}
```

```go
package main

import "fmt"

// Subsystem: Handles flight bookings
type FlightBooking struct {
	counter int
}

func NewFlightBooking() *FlightBooking {
	return &FlightBooking{counter: 1000}
}

func (f *FlightBooking) BookFlight(destination string, date string) string {
	// TODO: Increment counter, generate ID "FL-{counter}"
	// TODO: Print "Flight: Booked to {destination} on {date}. Confirmation: {id}"
	// TODO: Return the confirmation ID
	return ""
}

func (f *FlightBooking) CancelFlight(confirmationId string) {
	// TODO: Print "Flight: Cancelled booking {confirmationId}."
}

// Subsystem: Handles hotel reservations
type HotelReservation struct {
	counter int
}

func NewHotelReservation() *HotelReservation {
	return &HotelReservation{counter: 2000}
}

func (h *HotelReservation) ReserveRoom(destination string, checkIn string, checkOut string) string {
	// TODO: Increment counter, generate ID "HT-{counter}"
	// TODO: Print "Hotel: Reserved in {destination} from {checkIn} to {checkOut}. Confirmation: {id}"
	// TODO: Return the confirmation ID
	return ""
}

func (h *HotelReservation) CancelReservation(confirmationId string) {
	// TODO: Print "Hotel: Cancelled reservation {confirmationId}."
}

// Subsystem: Handles car rentals
type CarRental struct {
	counter int
}

func NewCarRental() *CarRental {
	return &CarRental{counter: 3000}
}

func (c *CarRental) RentCar(location string, pickupDate string, returnDate string) string {
	// TODO: Increment counter, generate ID "CR-{counter}"
	// TODO: Print "Car: Rented in {location} from {pickupDate} to {returnDate}. Confirmation: {id}"
	// TODO: Return the confirmation ID
	return ""
}

func (c *CarRental) CancelRental(confirmationId string) {
	// TODO: Print "Car: Cancelled rental {confirmationId}."
}

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
type TravelBookingFacade struct {
	flights  *FlightBooking
	hotels   *HotelReservation
	cars     *CarRental
	flightId string
	hotelId  string
	carId    string
}

func NewTravelBookingFacade(flights *FlightBooking, hotels *HotelReservation, cars *CarRental) *TravelBookingFacade {
	// TODO: Store references to all subsystems
	return &TravelBookingFacade{}
}

func (t *TravelBookingFacade) BookTrip(destination string, checkIn string, checkOut string) {
	// TODO: Print "--- Booking trip to {destination} ---"
	// TODO: Book flight, reserve hotel, rent car (store their IDs)
	// TODO: Print "--- Trip booked! ---"
}

func (t *TravelBookingFacade) CancelTrip() {
	// TODO: Print "--- Cancelling trip ---"
	// TODO: Cancel flight, hotel, and car using stored IDs
	// TODO: Print "--- Trip cancelled ---"
}

func main() {
	flights := NewFlightBooking()
	hotels := NewHotelReservation()
	cars := NewCarRental()

	facade := NewTravelBookingFacade(flights, hotels, cars)
	facade.BookTrip("Paris", "2025-06-01", "2025-06-07")
	fmt.Println()
	facade.CancelTrip()
}
```

```csharp
using System;

// Subsystem: Handles flight bookings
class FlightBooking
{
    private int counter = 1000;

    public string BookFlight(string destination, string date)
    {
        // TODO: Increment counter, generate ID "FL-{counter}"
        // TODO: Print "Flight: Booked to {destination} on {date}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    public void CancelFlight(string confirmationId)
    {
        // TODO: Print "Flight: Cancelled booking {confirmationId}."
    }
}

// Subsystem: Handles hotel reservations
class HotelReservation
{
    private int counter = 2000;

    public string ReserveRoom(string destination, string checkIn, string checkOut)
    {
        // TODO: Increment counter, generate ID "HT-{counter}"
        // TODO: Print "Hotel: Reserved in {destination} from {checkIn} to {checkOut}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    public void CancelReservation(string confirmationId)
    {
        // TODO: Print "Hotel: Cancelled reservation {confirmationId}."
    }
}

// Subsystem: Handles car rentals
class CarRental
{
    private int counter = 3000;

    public string RentCar(string location, string pickupDate, string returnDate)
    {
        // TODO: Increment counter, generate ID "CR-{counter}"
        // TODO: Print "Car: Rented in {location} from {pickupDate} to {returnDate}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    public void CancelRental(string confirmationId)
    {
        // TODO: Print "Car: Cancelled rental {confirmationId}."
    }
}

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade
{
    private FlightBooking flights;
    private HotelReservation hotels;
    private CarRental cars;
    private string flightId;
    private string hotelId;
    private string carId;

    public TravelBookingFacade(FlightBooking flights, HotelReservation hotels, CarRental cars)
    {
        // TODO: Store references to all subsystems
    }

    public void BookTrip(string destination, string checkIn, string checkOut)
    {
        // TODO: Print "--- Booking trip to {destination} ---"
        // TODO: Book flight, reserve hotel, rent car (store their IDs)
        // TODO: Print "--- Trip booked! ---"
    }

    public void CancelTrip()
    {
        // TODO: Print "--- Cancelling trip ---"
        // TODO: Cancel flight, hotel, and car using stored IDs
        // TODO: Print "--- Trip cancelled ---"
    }
}

class Program
{
    static void Main()
    {
        var flights = new FlightBooking();
        var hotels = new HotelReservation();
        var cars = new CarRental();

        var facade = new TravelBookingFacade(flights, hotels, cars);
        facade.BookTrip("Paris", "2025-06-01", "2025-06-07");
        Console.WriteLine();
        facade.CancelTrip();
    }
}
```

```typescript
// Subsystem: Handles flight bookings
class FlightBooking {
    private counter = 1000;

    bookFlight(destination: string, date: string): string {
        // TODO: Increment counter, generate ID "FL-{counter}"
        // TODO: Print "Flight: Booked to {destination} on {date}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    cancelFlight(confirmationId: string): void {
        // TODO: Print "Flight: Cancelled booking {confirmationId}."
    }
}

// Subsystem: Handles hotel reservations
class HotelReservation {
    private counter = 2000;

    reserveRoom(destination: string, checkIn: string, checkOut: string): string {
        // TODO: Increment counter, generate ID "HT-{counter}"
        // TODO: Print "Hotel: Reserved in {destination} from {checkIn} to {checkOut}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    cancelReservation(confirmationId: string): void {
        // TODO: Print "Hotel: Cancelled reservation {confirmationId}."
    }
}

// Subsystem: Handles car rentals
class CarRental {
    private counter = 3000;

    rentCar(location: string, pickupDate: string, returnDate: string): string {
        // TODO: Increment counter, generate ID "CR-{counter}"
        // TODO: Print "Car: Rented in {location} from {pickupDate} to {returnDate}. Confirmation: {id}"
        // TODO: Return the confirmation ID
        return "";
    }

    cancelRental(confirmationId: string): void {
        // TODO: Print "Car: Cancelled rental {confirmationId}."
    }
}

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade {
    private flights: FlightBooking;
    private hotels: HotelReservation;
    private cars: CarRental;
    private flightId: string = "";
    private hotelId: string = "";
    private carId: string = "";

    constructor(flights: FlightBooking, hotels: HotelReservation, cars: CarRental) {
        // TODO: Store references to all subsystems
    }

    bookTrip(destination: string, checkIn: string, checkOut: string): void {
        // TODO: Print "--- Booking trip to {destination} ---"
        // TODO: Book flight, reserve hotel, rent car (store their IDs)
        // TODO: Print "--- Trip booked! ---"
    }

    cancelTrip(): void {
        // TODO: Print "--- Cancelling trip ---"
        // TODO: Cancel flight, hotel, and car using stored IDs
        // TODO: Print "--- Trip cancelled ---"
    }
}

const flights = new FlightBooking();
const hotels = new HotelReservation();
const cars = new CarRental();

const facade = new TravelBookingFacade(flights, hotels, cars);
facade.bookTrip("Paris", "2025-06-01", "2025-06-07");
console.log();
facade.cancelTrip();
```

#### Solutions

```java
import java.util.HashMap;
import java.util.Map;

// Subsystem: Handles flight bookings
class FlightBooking {
    private int counter = 1000;

    public String bookFlight(String destination, String date) {
        counter++;
        String id = "FL-" + counter;
        System.out.println("Flight: Booked to " + destination + " on " + date + ". Confirmation: " + id);
        return id;
    }

    public void cancelFlight(String confirmationId) {
        System.out.println("Flight: Cancelled booking " + confirmationId + ".");
    }
}

// Subsystem: Handles hotel reservations
class HotelReservation {
    private int counter = 2000;

    public String reserveRoom(String destination, String checkIn, String checkOut) {
        counter++;
        String id = "HT-" + counter;
        System.out.println("Hotel: Reserved in " + destination + " from " + checkIn + " to " + checkOut + ". Confirmation: " + id);
        return id;
    }

    public void cancelReservation(String confirmationId) {
        System.out.println("Hotel: Cancelled reservation " + confirmationId + ".");
    }
}

// Subsystem: Handles car rentals
class CarRental {
    private int counter = 3000;

    public String rentCar(String location, String pickupDate, String returnDate) {
        counter++;
        String id = "CR-" + counter;
        System.out.println("Car: Rented in " + location + " from " + pickupDate + " to " + returnDate + ". Confirmation: " + id);
        return id;
    }

    public void cancelRental(String confirmationId) {
        System.out.println("Car: Cancelled rental " + confirmationId + ".");
    }
}

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade {
    private FlightBooking flights;
    private HotelReservation hotels;
    private CarRental cars;
    private String flightId;
    private String hotelId;
    private String carId;

    public TravelBookingFacade(FlightBooking flights, HotelReservation hotels, CarRental cars) {
        this.flights = flights;
        this.hotels = hotels;
        this.cars = cars;
    }

    public void bookTrip(String destination, String checkIn, String checkOut) {
        System.out.println("--- Booking trip to " + destination + " ---");
        flightId = flights.bookFlight(destination, checkIn);
        hotelId = hotels.reserveRoom(destination, checkIn, checkOut);
        carId = cars.rentCar(destination, checkIn, checkOut);
        System.out.println("--- Trip booked! ---");
    }

    public void cancelTrip() {
        System.out.println("--- Cancelling trip ---");
        flights.cancelFlight(flightId);
        hotels.cancelReservation(hotelId);
        cars.cancelRental(carId);
        System.out.println("--- Trip cancelled ---");
    }
}

public class Main {
    public static void main(String[] args) {
        FlightBooking flights = new FlightBooking();
        HotelReservation hotels = new HotelReservation();
        CarRental cars = new CarRental();

        TravelBookingFacade facade = new TravelBookingFacade(flights, hotels, cars);
        facade.bookTrip("Paris", "2025-06-01", "2025-06-07");
        System.out.println();
        facade.cancelTrip();
    }
}
```

```python
# Subsystem: Handles flight bookings
class FlightBooking:
    def __init__(self):
        self._counter = 1000

    def book_flight(self, destination: str, date: str) -> str:
        self._counter += 1
        confirmation_id = f"FL-{self._counter}"
        print(f"Flight: Booked to {destination} on {date}. Confirmation: {confirmation_id}")
        return confirmation_id

    def cancel_flight(self, confirmation_id: str):
        print(f"Flight: Cancelled booking {confirmation_id}.")

# Subsystem: Handles hotel reservations
class HotelReservation:
    def __init__(self):
        self._counter = 2000

    def reserve_room(self, destination: str, check_in: str, check_out: str) -> str:
        self._counter += 1
        confirmation_id = f"HT-{self._counter}"
        print(f"Hotel: Reserved in {destination} from {check_in} to {check_out}. Confirmation: {confirmation_id}")
        return confirmation_id

    def cancel_reservation(self, confirmation_id: str):
        print(f"Hotel: Cancelled reservation {confirmation_id}.")

# Subsystem: Handles car rentals
class CarRental:
    def __init__(self):
        self._counter = 3000

    def rent_car(self, location: str, pickup_date: str, return_date: str) -> str:
        self._counter += 1
        confirmation_id = f"CR-{self._counter}"
        print(f"Car: Rented in {location} from {pickup_date} to {return_date}. Confirmation: {confirmation_id}")
        return confirmation_id

    def cancel_rental(self, confirmation_id: str):
        print(f"Car: Cancelled rental {confirmation_id}.")

# Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade:
    def __init__(self, flights: FlightBooking, hotels: HotelReservation, cars: CarRental):
        self._flights = flights
        self._hotels = hotels
        self._cars = cars
        self._flight_id = ""
        self._hotel_id = ""
        self._car_id = ""

    def book_trip(self, destination: str, check_in: str, check_out: str):
        print(f"--- Booking trip to {destination} ---")
        self._flight_id = self._flights.book_flight(destination, check_in)
        self._hotel_id = self._hotels.reserve_room(destination, check_in, check_out)
        self._car_id = self._cars.rent_car(destination, check_in, check_out)
        print("--- Trip booked! ---")

    def cancel_trip(self):
        print("--- Cancelling trip ---")
        self._flights.cancel_flight(self._flight_id)
        self._hotels.cancel_reservation(self._hotel_id)
        self._cars.cancel_rental(self._car_id)
        print("--- Trip cancelled ---")

if __name__ == "__main__":
    flights = FlightBooking()
    hotels = HotelReservation()
    cars = CarRental()

    facade = TravelBookingFacade(flights, hotels, cars)
    facade.book_trip("Paris", "2025-06-01", "2025-06-07")
    print()
    facade.cancel_trip()
```

```cpp
#include <iostream>
#include <string>
using namespace std;

// Subsystem: Handles flight bookings
class FlightBooking {
    int counter = 1000;

public:
    string bookFlight(const string& destination, const string& date) {
        counter++;
        string id = "FL-" + to_string(counter);
        cout << "Flight: Booked to " << destination << " on " << date << ". Confirmation: " << id << endl;
        return id;
    }

    void cancelFlight(const string& confirmationId) {
        cout << "Flight: Cancelled booking " << confirmationId << "." << endl;
    }
};

// Subsystem: Handles hotel reservations
class HotelReservation {
    int counter = 2000;

public:
    string reserveRoom(const string& destination, const string& checkIn, const string& checkOut) {
        counter++;
        string id = "HT-" + to_string(counter);
        cout << "Hotel: Reserved in " << destination << " from " << checkIn << " to " << checkOut << ". Confirmation: " << id << endl;
        return id;
    }

    void cancelReservation(const string& confirmationId) {
        cout << "Hotel: Cancelled reservation " << confirmationId << "." << endl;
    }
};

// Subsystem: Handles car rentals
class CarRental {
    int counter = 3000;

public:
    string rentCar(const string& location, const string& pickupDate, const string& returnDate) {
        counter++;
        string id = "CR-" + to_string(counter);
        cout << "Car: Rented in " << location << " from " << pickupDate << " to " << returnDate << ". Confirmation: " << id << endl;
        return id;
    }

    void cancelRental(const string& confirmationId) {
        cout << "Car: Cancelled rental " << confirmationId << "." << endl;
    }
};

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade {
    FlightBooking& flights;
    HotelReservation& hotels;
    CarRental& cars;
    string flightId, hotelId, carId;

public:
    TravelBookingFacade(FlightBooking& flights, HotelReservation& hotels, CarRental& cars)
        : flights(flights), hotels(hotels), cars(cars)
    {}

    void bookTrip(const string& destination, const string& checkIn, const string& checkOut) {
        cout << "--- Booking trip to " << destination << " ---" << endl;
        flightId = flights.bookFlight(destination, checkIn);
        hotelId = hotels.reserveRoom(destination, checkIn, checkOut);
        carId = cars.rentCar(destination, checkIn, checkOut);
        cout << "--- Trip booked! ---" << endl;
    }

    void cancelTrip() {
        cout << "--- Cancelling trip ---" << endl;
        flights.cancelFlight(flightId);
        hotels.cancelReservation(hotelId);
        cars.cancelRental(carId);
        cout << "--- Trip cancelled ---" << endl;
    }
};

int main() {
    FlightBooking flights;
    HotelReservation hotels;
    CarRental cars;

    TravelBookingFacade facade(flights, hotels, cars);
    facade.bookTrip("Paris", "2025-06-01", "2025-06-07");
    cout << endl;
    facade.cancelTrip();
    return 0;
}
```

```go
package main

import "fmt"

// Subsystem: Handles flight bookings
type FlightBooking struct {
	counter int
}

func NewFlightBooking() *FlightBooking {
	return &FlightBooking{counter: 1000}
}

func (f *FlightBooking) BookFlight(destination, date string) string {
	f.counter++
	id := fmt.Sprintf("FL-%d", f.counter)
	fmt.Printf("Flight: Booked to %s on %s. Confirmation: %s\n", destination, date, id)
	return id
}

func (f *FlightBooking) CancelFlight(confirmationID string) {
	fmt.Printf("Flight: Cancelled booking %s.\n", confirmationID)
}

// Subsystem: Handles hotel reservations
type HotelReservation struct {
	counter int
}

func NewHotelReservation() *HotelReservation {
	return &HotelReservation{counter: 2000}
}

func (h *HotelReservation) ReserveRoom(destination, checkIn, checkOut string) string {
	h.counter++
	id := fmt.Sprintf("HT-%d", h.counter)
	fmt.Printf("Hotel: Reserved in %s from %s to %s. Confirmation: %s\n", destination, checkIn, checkOut, id)
	return id
}

func (h *HotelReservation) CancelReservation(confirmationID string) {
	fmt.Printf("Hotel: Cancelled reservation %s.\n", confirmationID)
}

// Subsystem: Handles car rentals
type CarRental struct {
	counter int
}

func NewCarRental() *CarRental {
	return &CarRental{counter: 3000}
}

func (c *CarRental) RentCar(location, pickupDate, returnDate string) string {
	c.counter++
	id := fmt.Sprintf("CR-%d", c.counter)
	fmt.Printf("Car: Rented in %s from %s to %s. Confirmation: %s\n", location, pickupDate, returnDate, id)
	return id
}

func (c *CarRental) CancelRental(confirmationID string) {
	fmt.Printf("Car: Cancelled rental %s.\n", confirmationID)
}

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
type TravelBookingFacade struct {
	flights  *FlightBooking
	hotels   *HotelReservation
	cars     *CarRental
	flightID string
	hotelID  string
	carID    string
}

func NewTravelBookingFacade(flights *FlightBooking, hotels *HotelReservation, cars *CarRental) *TravelBookingFacade {
	return &TravelBookingFacade{
		flights: flights,
		hotels:  hotels,
		cars:    cars,
	}
}

func (t *TravelBookingFacade) BookTrip(destination, checkIn, checkOut string) {
	fmt.Printf("--- Booking trip to %s ---\n", destination)
	t.flightID = t.flights.BookFlight(destination, checkIn)
	t.hotelID = t.hotels.ReserveRoom(destination, checkIn, checkOut)
	t.carID = t.cars.RentCar(destination, checkIn, checkOut)
	fmt.Println("--- Trip booked! ---")
}

func (t *TravelBookingFacade) CancelTrip() {
	fmt.Println("--- Cancelling trip ---")
	t.flights.CancelFlight(t.flightID)
	t.hotels.CancelReservation(t.hotelID)
	t.cars.CancelRental(t.carID)
	fmt.Println("--- Trip cancelled ---")
}

func main() {
	flights := NewFlightBooking()
	hotels := NewHotelReservation()
	cars := NewCarRental()

	facade := NewTravelBookingFacade(flights, hotels, cars)
	facade.BookTrip("Paris", "2025-06-01", "2025-06-07")
	fmt.Println()
	facade.CancelTrip()
}
```

```csharp
using System;

// Subsystem: Handles flight bookings
class FlightBooking
{
    private int counter = 1000;

    public string BookFlight(string destination, string date)
    {
        counter++;
        string id = "FL-" + counter;
        Console.WriteLine($"Flight: Booked to {destination} on {date}. Confirmation: {id}");
        return id;
    }

    public void CancelFlight(string confirmationId)
    {
        Console.WriteLine($"Flight: Cancelled booking {confirmationId}.");
    }
}

// Subsystem: Handles hotel reservations
class HotelReservation
{
    private int counter = 2000;

    public string ReserveRoom(string destination, string checkIn, string checkOut)
    {
        counter++;
        string id = "HT-" + counter;
        Console.WriteLine($"Hotel: Reserved in {destination} from {checkIn} to {checkOut}. Confirmation: {id}");
        return id;
    }

    public void CancelReservation(string confirmationId)
    {
        Console.WriteLine($"Hotel: Cancelled reservation {confirmationId}.");
    }
}

// Subsystem: Handles car rentals
class CarRental
{
    private int counter = 3000;

    public string RentCar(string location, string pickupDate, string returnDate)
    {
        counter++;
        string id = "CR-" + counter;
        Console.WriteLine($"Car: Rented in {location} from {pickupDate} to {returnDate}. Confirmation: {id}");
        return id;
    }

    public void CancelRental(string confirmationId)
    {
        Console.WriteLine($"Car: Cancelled rental {confirmationId}.");
    }
}

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade
{
    private FlightBooking flights;
    private HotelReservation hotels;
    private CarRental cars;
    private string flightId;
    private string hotelId;
    private string carId;

    public TravelBookingFacade(FlightBooking flights, HotelReservation hotels, CarRental cars)
    {
        this.flights = flights;
        this.hotels = hotels;
        this.cars = cars;
    }

    public void BookTrip(string destination, string checkIn, string checkOut)
    {
        Console.WriteLine($"--- Booking trip to {destination} ---");
        flightId = flights.BookFlight(destination, checkIn);
        hotelId = hotels.ReserveRoom(destination, checkIn, checkOut);
        carId = cars.RentCar(destination, checkIn, checkOut);
        Console.WriteLine("--- Trip booked! ---");
    }

    public void CancelTrip()
    {
        Console.WriteLine("--- Cancelling trip ---");
        flights.CancelFlight(flightId);
        hotels.CancelReservation(hotelId);
        cars.CancelRental(carId);
        Console.WriteLine("--- Trip cancelled ---");
    }
}

class Program
{
    static void Main()
    {
        var flights = new FlightBooking();
        var hotels = new HotelReservation();
        var cars = new CarRental();

        var facade = new TravelBookingFacade(flights, hotels, cars);
        facade.BookTrip("Paris", "2025-06-01", "2025-06-07");
        Console.WriteLine();
        facade.CancelTrip();
    }
}
```

```typescript
// Subsystem: Handles flight bookings
class FlightBooking {
    private counter = 1000;

    bookFlight(destination: string, date: string): string {
        this.counter++;
        const id = `FL-${this.counter}`;
        console.log(`Flight: Booked to ${destination} on ${date}. Confirmation: ${id}`);
        return id;
    }

    cancelFlight(confirmationId: string): void {
        console.log(`Flight: Cancelled booking ${confirmationId}.`);
    }
}

// Subsystem: Handles hotel reservations
class HotelReservation {
    private counter = 2000;

    reserveRoom(destination: string, checkIn: string, checkOut: string): string {
        this.counter++;
        const id = `HT-${this.counter}`;
        console.log(`Hotel: Reserved in ${destination} from ${checkIn} to ${checkOut}. Confirmation: ${id}`);
        return id;
    }

    cancelReservation(confirmationId: string): void {
        console.log(`Hotel: Cancelled reservation ${confirmationId}.`);
    }
}

// Subsystem: Handles car rentals
class CarRental {
    private counter = 3000;

    rentCar(location: string, pickupDate: string, returnDate: string): string {
        this.counter++;
        const id = `CR-${this.counter}`;
        console.log(`Car: Rented in ${location} from ${pickupDate} to ${returnDate}. Confirmation: ${id}`);
        return id;
    }

    cancelRental(confirmationId: string): void {
        console.log(`Car: Cancelled rental ${confirmationId}.`);
    }
}

// Facade: Coordinates flight, hotel, and car rental into a single trip booking
class TravelBookingFacade {
    private flights: FlightBooking;
    private hotels: HotelReservation;
    private cars: CarRental;
    private flightId: string = "";
    private hotelId: string = "";
    private carId: string = "";

    constructor(flights: FlightBooking, hotels: HotelReservation, cars: CarRental) {
        this.flights = flights;
        this.hotels = hotels;
        this.cars = cars;
    }

    bookTrip(destination: string, checkIn: string, checkOut: string): void {
        console.log(`--- Booking trip to ${destination} ---`);
        this.flightId = this.flights.bookFlight(destination, checkIn);
        this.hotelId = this.hotels.reserveRoom(destination, checkIn, checkOut);
        this.carId = this.cars.rentCar(destination, checkIn, checkOut);
        console.log("--- Trip booked! ---");
    }

    cancelTrip(): void {
        console.log("--- Cancelling trip ---");
        this.flights.cancelFlight(this.flightId);
        this.hotels.cancelReservation(this.hotelId);
        this.cars.cancelRental(this.carId);
        console.log("--- Trip cancelled ---");
    }
}

const flights = new FlightBooking();
const hotels = new HotelReservation();
const cars = new CarRental();

const facade = new TravelBookingFacade(flights, hotels, cars);
facade.bookTrip("Paris", "2025-06-01", "2025-06-07");
console.log();
facade.cancelTrip();
```

---

# Exercise 3: Online Order Processing

**Problem:** Implement an `OrderFacade` that processes e-commerce orders. A single `placeOrder()` call should check inventory, process payment, arrange shipping, and send notifications.

**Requirements:**

- `InventoryService` checks stock and reserves items
- `PaymentService` validates and charges a payment method
- `ShippingService` creates a shipment and generates a tracking number
- `NotificationService` sends order confirmation via email
- If any step fails, the facade should roll back previous steps (release inventory, refund payment)

```java
import java.util.HashMap;
import java.util.Map;

// Subsystem: Manages product inventory and stock reservations
class InventoryService {
    private Map<String, Integer> stock = new HashMap<>();

    public InventoryService() {
        // Pre-populate with some stock for testing
        stock.put("SKU-001", 5);
        stock.put("SKU-002", 0);
    }

    public boolean checkStock(String productId, int quantity) {
        // TODO: Return true if productId exists in stock and has enough quantity
        return false;
    }

    public void reserveStock(String productId, int quantity) {
        // TODO: Print "Inventory: Product {productId} in stock ({available} available). Reserved {quantity} units."
        // TODO: Decrease the stock count
    }

    public void releaseStock(String productId, int quantity) {
        // TODO: Increase the stock count back
        // TODO: Print "Rolling back: Releasing {quantity} units of {productId}."
    }
}

// Subsystem: Handles payment processing and refunds
class PaymentService {
    private int counter = 4000;

    public String charge(String paymentMethod, double amount) {
        // TODO: If paymentMethod is "expired-card", print failure and return null
        // TODO: Otherwise, increment counter, generate ID "TXN-{counter}"
        // TODO: Print "Payment: Charged ${amount} to {paymentMethod}. Transaction: {id}"
        // TODO: Return the transaction ID (or null on failure)
        return null;
    }

    public void refund(String transactionId) {
        // TODO: Print "Rolling back: Refunding transaction {transactionId}."
    }
}

// Subsystem: Creates shipments and generates tracking numbers
class ShippingService {
    private int counter = 5000;

    public String createShipment(String productId, String address) {
        // TODO: Increment counter, generate ID "TRK-{counter}"
        // TODO: Print "Shipping: Shipment created for {productId} to {address}. Tracking: {id}"
        // TODO: Return the tracking number
        return "";
    }

    public void cancelShipment(String trackingNumber) {
        // TODO: Print "Rolling back: Cancelling shipment {trackingNumber}."
    }
}

// Subsystem: Sends notifications to customers
class NotificationService {
    public void sendOrderConfirmation(String email, String orderId, String trackingNumber) {
        // TODO: Print "Notification: Order confirmation sent to {email}. Order: {orderId}, Tracking: {trackingNumber}"
    }
}

// Facade: Orchestrates the full order process with rollback on failure
class OrderFacade {
    private InventoryService inventory;
    private PaymentService payment;
    private ShippingService shipping;
    private NotificationService notification;
    private int orderCounter = 6000;

    public OrderFacade(InventoryService inventory, PaymentService payment,
                       ShippingService shipping, NotificationService notification) {
        // TODO: Store references to all subsystems
    }

    public boolean placeOrder(String productId, int quantity, String paymentMethod,
                              double amount, String address, String email) {
        // TODO: Print "--- Processing order ---"
        // TODO: 1. Check stock - if not available, print failure and return false
        // TODO: 2. Reserve stock
        // TODO: 3. Charge payment - if fails, release stock (rollback) and return false
        // TODO: 4. Create shipment
        // TODO: 5. Generate order ID "ORD-{counter}" and send notification
        // TODO: Print "--- Order placed successfully! ---" and return true
        return false;
    }
}

public class Main {
    public static void main(String[] args) {
        InventoryService inventory = new InventoryService();
        PaymentService payment = new PaymentService();
        ShippingService shipping = new ShippingService();
        NotificationService notification = new NotificationService();

        OrderFacade facade = new OrderFacade(inventory, payment, shipping, notification);

        // Test 1: Successful order
        boolean success = facade.placeOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com");
        System.out.println();

        // Test 2: Failed order (payment failure triggers rollback)
        boolean failed = facade.placeOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com");
    }
}
```

```python
# Subsystem: Manages product inventory and stock reservations
class InventoryService:
    def __init__(self):
        # Pre-populate with some stock for testing
        self._stock = {"SKU-001": 5, "SKU-002": 0}

    def check_stock(self, product_id: str, quantity: int) -> bool:
        # TODO: Return True if product_id exists in stock and has enough quantity
        return False

    def reserve_stock(self, product_id: str, quantity: int):
        # TODO: Print "Inventory: Product {product_id} in stock ({available} available). Reserved {quantity} units."
        # TODO: Decrease the stock count
        pass

    def release_stock(self, product_id: str, quantity: int):
        # TODO: Increase the stock count back
        # TODO: Print "Rolling back: Releasing {quantity} units of {product_id}."
        pass

# Subsystem: Handles payment processing and refunds
class PaymentService:
    def __init__(self):
        self._counter = 4000

    def charge(self, payment_method: str, amount: float) -> str:
        # TODO: If payment_method is "expired-card", print failure and return None
        # TODO: Otherwise, increment counter, generate ID "TXN-{counter}"
        # TODO: Print "Payment: Charged ${amount} to {payment_method}. Transaction: {id}"
        # TODO: Return the transaction ID (or None on failure)
        return None

    def refund(self, transaction_id: str):
        pass  # TODO: Print "Rolling back: Refunding transaction {transaction_id}."

# Subsystem: Creates shipments and generates tracking numbers
class ShippingService:
    def __init__(self):
        self._counter = 5000

    def create_shipment(self, product_id: str, address: str) -> str:
        # TODO: Increment counter, generate ID "TRK-{counter}"
        # TODO: Print "Shipping: Shipment created for {product_id} to {address}. Tracking: {id}"
        # TODO: Return the tracking number
        return ""

    def cancel_shipment(self, tracking_number: str):
        pass  # TODO: Print "Rolling back: Cancelling shipment {tracking_number}."

# Subsystem: Sends notifications to customers
class NotificationService:
    def send_order_confirmation(self, email: str, order_id: str, tracking_number: str):
        pass  # TODO: Print "Notification: Order confirmation sent to {email}. Order: {order_id}, Tracking: {tracking_number}"

# Facade: Orchestrates the full order process with rollback on failure
class OrderFacade:
    def __init__(self, inventory: InventoryService, payment: PaymentService,
                 shipping: ShippingService, notification: NotificationService):
        # TODO: Store references to all subsystems
        # TODO: Initialize order_counter = 6000
        pass

    def place_order(self, product_id: str, quantity: int, payment_method: str,
                    amount: float, address: str, email: str) -> bool:
        # TODO: Print "--- Processing order ---"
        # TODO: 1. Check stock - if not available, print failure and return False
        # TODO: 2. Reserve stock
        # TODO: 3. Charge payment - if fails, release stock (rollback) and return False
        # TODO: 4. Create shipment
        # TODO: 5. Generate order ID "ORD-{counter}" and send notification
        # TODO: Print "--- Order placed successfully! ---" and return True
        return False

if __name__ == "__main__":
    inventory = InventoryService()
    payment = PaymentService()
    shipping = ShippingService()
    notification = NotificationService()

    facade = OrderFacade(inventory, payment, shipping, notification)

    # Test 1: Successful order
    success = facade.place_order("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com")
    print()

    # Test 2: Failed order (payment failure triggers rollback)
    failed = facade.place_order("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com")
```

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

// Subsystem: Manages product inventory and stock reservations
class InventoryService {
    unordered_map<string, int> stock;

public:
    InventoryService() {
        // Pre-populate with some stock for testing
        stock["SKU-001"] = 5;
        stock["SKU-002"] = 0;
    }

    bool checkStock(const string& productId, int quantity) {
        // TODO: Return true if productId exists in stock and has enough quantity
        return false;
    }

    void reserveStock(const string& productId, int quantity) {
        // TODO: Print "Inventory: Product {productId} in stock ({available} available). Reserved {quantity} units."
        // TODO: Decrease the stock count
    }

    void releaseStock(const string& productId, int quantity) {
        // TODO: Increase the stock count back
        // TODO: Print "Rolling back: Releasing {quantity} units of {productId}."
    }
};

// Subsystem: Handles payment processing and refunds
class PaymentService {
    int counter = 4000;

public:
    string charge(const string& paymentMethod, double amount) {
        // TODO: If paymentMethod is "expired-card", print failure and return ""
        // TODO: Otherwise, increment counter, generate ID "TXN-{counter}"
        // TODO: Print "Payment: Charged ${amount} to {paymentMethod}. Transaction: {id}"
        // TODO: Return the transaction ID (or "" on failure)
        return "";
    }

    void refund(const string& transactionId) {
        // TODO: Print "Rolling back: Refunding transaction {transactionId}."
    }
};

// Subsystem: Creates shipments and generates tracking numbers
class ShippingService {
    int counter = 5000;

public:
    string createShipment(const string& productId, const string& address) {
        // TODO: Increment counter, generate ID "TRK-{counter}"
        // TODO: Print "Shipping: Shipment created for {productId} to {address}. Tracking: {id}"
        // TODO: Return the tracking number
        return "";
    }

    void cancelShipment(const string& trackingNumber) {
        // TODO: Print "Rolling back: Cancelling shipment {trackingNumber}."
    }
};

// Subsystem: Sends notifications to customers
class NotificationService {
public:
    void sendOrderConfirmation(const string& email, const string& orderId,
                                const string& trackingNumber) {
        // TODO: Print "Notification: Order confirmation sent to {email}. Order: {orderId}, Tracking: {trackingNumber}"
    }
};

// Facade: Orchestrates the full order process with rollback on failure
class OrderFacade {
    InventoryService& inventory;
    PaymentService& payment;
    ShippingService& shipping;
    NotificationService& notification;
    int orderCounter = 6000;

public:
    OrderFacade(InventoryService& inventory, PaymentService& payment,
                ShippingService& shipping, NotificationService& notification)
        : inventory(inventory), payment(payment), shipping(shipping), notification(notification)
    {}

    bool placeOrder(const string& productId, int quantity, const string& paymentMethod,
                    double amount, const string& address, const string& email) {
        // TODO: Print "--- Processing order ---"
        // TODO: 1. Check stock - if not available, print failure and return false
        // TODO: 2. Reserve stock
        // TODO: 3. Charge payment - if fails (empty string), release stock (rollback) and return false
        // TODO: 4. Create shipment
        // TODO: 5. Generate order ID "ORD-{counter}" and send notification
        // TODO: Print "--- Order placed successfully! ---" and return true
        return false;
    }
};

int main() {
    InventoryService inventory;
    PaymentService payment;
    ShippingService shipping;
    NotificationService notification;

    OrderFacade facade(inventory, payment, shipping, notification);

    // Test 1: Successful order
    bool success = facade.placeOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com");
    cout << endl;

    // Test 2: Failed order (payment failure triggers rollback)
    bool failed = facade.placeOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com");
    return 0;
}
```

```go
package main

// Subsystem: Manages product inventory and stock reservations
type InventoryService struct {
	stock map[string]int
}

func NewInventoryService() *InventoryService {
	// Pre-populate with some stock for testing
	return &InventoryService{
		stock: map[string]int{
			"SKU-001": 5,
			"SKU-002": 0,
		},
	}
}

func (i *InventoryService) CheckStock(productId string, quantity int) bool {
	// TODO: Return true if productId exists in stock and has enough quantity
	return false
}

func (i *InventoryService) ReserveStock(productId string, quantity int) {
	// TODO: Print "Inventory: Product {productId} in stock ({available} available). Reserved {quantity} units."
	// TODO: Decrease the stock count
}

func (i *InventoryService) ReleaseStock(productId string, quantity int) {
	// TODO: Increase the stock count back
	// TODO: Print "Rolling back: Releasing {quantity} units of {productId}."
}

// Subsystem: Handles payment processing and refunds
type PaymentService struct {
	counter int
}

func NewPaymentService() *PaymentService {
	return &PaymentService{
		counter: 4000,
	}
}

func (p *PaymentService) Charge(paymentMethod string, amount float64) string {
	// TODO: If paymentMethod is "expired-card", print failure and return empty string
	// TODO: Otherwise, increment counter, generate ID "TXN-{counter}"
	// TODO: Print "Payment: Charged ${amount} to {paymentMethod}. Transaction: {id}"
	// TODO: Return the transaction ID (or empty string on failure)
	return ""
}

func (p *PaymentService) Refund(transactionId string) {
	// TODO: Print "Rolling back: Refunding transaction {transactionId}."
}

// Subsystem: Creates shipments and generates tracking numbers
type ShippingService struct {
	counter int
}

func NewShippingService() *ShippingService {
	return &ShippingService{
		counter: 5000,
	}
}

func (s *ShippingService) CreateShipment(productId string, address string) string {
	// TODO: Increment counter, generate ID "TRK-{counter}"
	// TODO: Print "Shipping: Shipment created for {productId} to {address}. Tracking: {id}"
	// TODO: Return the tracking number
	return ""
}

func (s *ShippingService) CancelShipment(trackingNumber string) {
	// TODO: Print "Rolling back: Cancelling shipment {trackingNumber}."
}

// Subsystem: Sends notifications to customers
type NotificationService struct{}

func NewNotificationService() *NotificationService {
	return &NotificationService{}
}

func (n *NotificationService) SendOrderConfirmation(email string, orderId string, trackingNumber string) {
	// TODO: Print "Notification: Order confirmation sent to {email}. Order: {orderId}, Tracking: {trackingNumber}"
}

// Facade: Orchestrates the full order process with rollback on failure
type OrderFacade struct {
	inventory    *InventoryService
	payment      *PaymentService
	shipping     *ShippingService
	notification *NotificationService
	orderCounter int
}

func NewOrderFacade(inventory *InventoryService, payment *PaymentService,
	shipping *ShippingService, notification *NotificationService) *OrderFacade {
	// TODO: Store references to all subsystems
	return &OrderFacade{
		inventory:    inventory,
		payment:      payment,
		shipping:     shipping,
		notification: notification,
		orderCounter: 6000,
	}
}

func (o *OrderFacade) PlaceOrder(productId string, quantity int, paymentMethod string,
	amount float64, address string, email string) bool {
	// TODO: Print "--- Processing order ---"
	// TODO: 1. Check stock - if not available, print failure and return false
	// TODO: 2. Reserve stock
	// TODO: 3. Charge payment - if fails (empty string), release stock (rollback) and return false
	// TODO: 4. Create shipment
	// TODO: 5. Generate order ID "ORD-{counter}" and send notification
	// TODO: Print "--- Order placed successfully! ---" and return true
	return false
}

func main() {
	inventory := NewInventoryService()
	payment := NewPaymentService()
	shipping := NewShippingService()
	notification := NewNotificationService()

	facade := NewOrderFacade(inventory, payment, shipping, notification)

	// Test 1: Successful order
	success := facade.PlaceOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com")
	_ = success

	println()

	// Test 2: Failed order (payment failure triggers rollback)
	failed := facade.PlaceOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com")
	_ = failed
}
```

```csharp
using System;
using System.Collections.Generic;

// Subsystem: Manages product inventory and stock reservations
class InventoryService
{
    private Dictionary<string, int> stock = new Dictionary<string, int>();

    public InventoryService()
    {
        // Pre-populate with some stock for testing
        stock["SKU-001"] = 5;
        stock["SKU-002"] = 0;
    }

    public bool CheckStock(string productId, int quantity)
    {
        // TODO: Return true if productId exists in stock and has enough quantity
        return false;
    }

    public void ReserveStock(string productId, int quantity)
    {
        // TODO: Print "Inventory: Product {productId} in stock ({available} available). Reserved {quantity} units."
        // TODO: Decrease the stock count
    }

    public void ReleaseStock(string productId, int quantity)
    {
        // TODO: Increase the stock count back
        // TODO: Print "Rolling back: Releasing {quantity} units of {productId}."
    }
}

// Subsystem: Handles payment processing and refunds
class PaymentService
{
    private int counter = 4000;

    public string Charge(string paymentMethod, double amount)
    {
        // TODO: If paymentMethod is "expired-card", print failure and return null
        // TODO: Otherwise, increment counter, generate ID "TXN-{counter}"
        // TODO: Print "Payment: Charged ${amount} to {paymentMethod}. Transaction: {id}"
        // TODO: Return the transaction ID (or null on failure)
        return null;
    }

    public void Refund(string transactionId)
    {
        // TODO: Print "Rolling back: Refunding transaction {transactionId}."
    }
}

// Subsystem: Creates shipments and generates tracking numbers
class ShippingService
{
    private int counter = 5000;

    public string CreateShipment(string productId, string address)
    {
        // TODO: Increment counter, generate ID "TRK-{counter}"
        // TODO: Print "Shipping: Shipment created for {productId} to {address}. Tracking: {id}"
        // TODO: Return the tracking number
        return "";
    }

    public void CancelShipment(string trackingNumber)
    {
        // TODO: Print "Rolling back: Cancelling shipment {trackingNumber}."
    }
}

// Subsystem: Sends notifications to customers
class NotificationService
{
    public void SendOrderConfirmation(string email, string orderId, string trackingNumber)
    {
        // TODO: Print "Notification: Order confirmation sent to {email}. Order: {orderId}, Tracking: {trackingNumber}"
    }
}

// Facade: Orchestrates the full order process with rollback on failure
class OrderFacade
{
    private InventoryService inventory;
    private PaymentService payment;
    private ShippingService shipping;
    private NotificationService notification;
    private int orderCounter = 6000;

    public OrderFacade(InventoryService inventory, PaymentService payment,
                       ShippingService shipping, NotificationService notification)
    {
        // TODO: Store references to all subsystems
    }

    public bool PlaceOrder(string productId, int quantity, string paymentMethod,
                           double amount, string address, string email)
    {
        // TODO: Print "--- Processing order ---"
        // TODO: 1. Check stock - if not available, print failure and return false
        // TODO: 2. Reserve stock
        // TODO: 3. Charge payment - if fails (null), release stock (rollback) and return false
        // TODO: 4. Create shipment
        // TODO: 5. Generate order ID "ORD-{counter}" and send notification
        // TODO: Print "--- Order placed successfully! ---" and return true
        return false;
    }
}

class Program
{
    static void Main()
    {
        var inventory = new InventoryService();
        var payment = new PaymentService();
        var shipping = new ShippingService();
        var notification = new NotificationService();

        var facade = new OrderFacade(inventory, payment, shipping, notification);

        // Test 1: Successful order
        bool success = facade.PlaceOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com");
        Console.WriteLine();

        // Test 2: Failed order (payment failure triggers rollback)
        bool failed = facade.PlaceOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com");
    }
}
```

```typescript
// Subsystem: Manages product inventory and stock reservations
class InventoryService {
    private stock: Map<string, number> = new Map();

    constructor() {
        // Pre-populate with some stock for testing
        this.stock.set("SKU-001", 5);
        this.stock.set("SKU-002", 0);
    }

    checkStock(productId: string, quantity: number): boolean {
        // TODO: Return true if productId exists in stock and has enough quantity
        return false;
    }

    reserveStock(productId: string, quantity: number): void {
        // TODO: Print "Inventory: Product {productId} in stock ({available} available). Reserved {quantity} units."
        // TODO: Decrease the stock count
    }

    releaseStock(productId: string, quantity: number): void {
        // TODO: Increase the stock count back
        // TODO: Print "Rolling back: Releasing {quantity} units of {productId}."
    }
}

// Subsystem: Handles payment processing and refunds
class PaymentService {
    private counter = 4000;

    charge(paymentMethod: string, amount: number): string | null {
        // TODO: If paymentMethod is "expired-card", print failure and return null
        // TODO: Otherwise, increment counter, generate ID "TXN-{counter}"
        // TODO: Print "Payment: Charged ${amount} to {paymentMethod}. Transaction: {id}"
        // TODO: Return the transaction ID (or null on failure)
        return null;
    }

    refund(transactionId: string): void {
        // TODO: Print "Rolling back: Refunding transaction {transactionId}."
    }
}

// Subsystem: Creates shipments and generates tracking numbers
class ShippingService {
    private counter = 5000;

    createShipment(productId: string, address: string): string {
        // TODO: Increment counter, generate ID "TRK-{counter}"
        // TODO: Print "Shipping: Shipment created for {productId} to {address}. Tracking: {id}"
        // TODO: Return the tracking number
        return "";
    }

    cancelShipment(trackingNumber: string): void {
        // TODO: Print "Rolling back: Cancelling shipment {trackingNumber}."
    }
}

// Subsystem: Sends notifications to customers
class NotificationService {
    sendOrderConfirmation(email: string, orderId: string, trackingNumber: string): void {
        // TODO: Print "Notification: Order confirmation sent to {email}. Order: {orderId}, Tracking: {trackingNumber}"
    }
}

// Facade: Orchestrates the full order process with rollback on failure
class OrderFacade {
    private inventory: InventoryService;
    private payment: PaymentService;
    private shipping: ShippingService;
    private notification: NotificationService;
    private orderCounter = 6000;

    constructor(inventory: InventoryService, payment: PaymentService,
                shipping: ShippingService, notification: NotificationService) {
        // TODO: Store references to all subsystems
    }

    placeOrder(productId: string, quantity: number, paymentMethod: string,
               amount: number, address: string, email: string): boolean {
        // TODO: Print "--- Processing order ---"
        // TODO: 1. Check stock - if not available, print failure and return false
        // TODO: 2. Reserve stock
        // TODO: 3. Charge payment - if fails (null), release stock (rollback) and return false
        // TODO: 4. Create shipment
        // TODO: 5. Generate order ID "ORD-{counter}" and send notification
        // TODO: Print "--- Order placed successfully! ---" and return true
        return false;
    }
}

const inventory = new InventoryService();
const payment = new PaymentService();
const shipping = new ShippingService();
const notification = new NotificationService();

const facade = new OrderFacade(inventory, payment, shipping, notification);

// Test 1: Successful order
const success = facade.placeOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com");
console.log();

// Test 2: Failed order (payment failure triggers rollback)
const failed = facade.placeOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com");
```

#### Solutions

```java
import java.util.HashMap;
import java.util.Map;

// Subsystem: Manages product inventory and stock reservations
class InventoryService {
    private Map<String, Integer> stock = new HashMap<>();

    public InventoryService() {
        stock.put("SKU-001", 5);
        stock.put("SKU-002", 0);
    }

    public boolean checkStock(String productId, int quantity) {
        return stock.containsKey(productId) && stock.get(productId) >= quantity;
    }

    public void reserveStock(String productId, int quantity) {
        int available = stock.get(productId);
        System.out.println("Inventory: Product " + productId + " in stock (" + available + " available). Reserved " + quantity + " units.");
        stock.put(productId, available - quantity);
    }

    public void releaseStock(String productId, int quantity) {
        stock.put(productId, stock.get(productId) + quantity);
        System.out.println("Rolling back: Releasing " + quantity + " units of " + productId + ".");
    }
}

// Subsystem: Handles payment processing and refunds
class PaymentService {
    private int counter = 4000;

    public String charge(String paymentMethod, double amount) {
        if (paymentMethod.equals("expired-card")) {
            System.out.println("Payment: FAILED to charge $" + amount + " to " + paymentMethod + ".");
            return null;
        }
        counter++;
        String id = "TXN-" + counter;
        System.out.println("Payment: Charged $" + amount + " to " + paymentMethod + ". Transaction: " + id);
        return id;
    }

    public void refund(String transactionId) {
        System.out.println("Rolling back: Refunding transaction " + transactionId + ".");
    }
}

// Subsystem: Creates shipments and generates tracking numbers
class ShippingService {
    private int counter = 5000;

    public String createShipment(String productId, String address) {
        counter++;
        String id = "TRK-" + counter;
        System.out.println("Shipping: Shipment created for " + productId + " to " + address + ". Tracking: " + id);
        return id;
    }

    public void cancelShipment(String trackingNumber) {
        System.out.println("Rolling back: Cancelling shipment " + trackingNumber + ".");
    }
}

// Subsystem: Sends notifications to customers
class NotificationService {
    private int counter = 6000;

    public void sendOrderConfirmation(String email, String orderId, String trackingNumber) {
        System.out.println("Notification: Order confirmation sent to " + email + ". Order: " + orderId + ", Tracking: " + trackingNumber);
    }
}

// Facade: Orchestrates the full order process with rollback on failure
class OrderFacade {
    private InventoryService inventory;
    private PaymentService payment;
    private ShippingService shipping;
    private NotificationService notification;
    private int orderCounter = 6000;

    public OrderFacade(InventoryService inventory, PaymentService payment,
                       ShippingService shipping, NotificationService notification) {
        this.inventory = inventory;
        this.payment = payment;
        this.shipping = shipping;
        this.notification = notification;
    }

    public boolean placeOrder(String productId, int quantity, String paymentMethod,
                              double amount, String address, String email) {
        System.out.println("--- Processing order ---");

        if (!inventory.checkStock(productId, quantity)) {
            System.out.println("Inventory: Product " + productId + " is out of stock.");
            System.out.println("--- Order failed ---");
            return false;
        }
        inventory.reserveStock(productId, quantity);

        String txnId = payment.charge(paymentMethod, amount);
        if (txnId == null) {
            inventory.releaseStock(productId, quantity);
            System.out.println("--- Order failed ---");
            return false;
        }

        String trackingNumber = shipping.createShipment(productId, address);

        orderCounter++;
        String orderId = "ORD-" + orderCounter;
        notification.sendOrderConfirmation(email, orderId, trackingNumber);

        System.out.println("--- Order placed successfully! ---");
        return true;
    }
}

public class Main {
    public static void main(String[] args) {
        InventoryService inventory = new InventoryService();
        PaymentService payment = new PaymentService();
        ShippingService shipping = new ShippingService();
        NotificationService notification = new NotificationService();

        OrderFacade facade = new OrderFacade(inventory, payment, shipping, notification);

        // Test 1: Successful order
        boolean success = facade.placeOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com");
        System.out.println();

        // Test 2: Failed order (payment failure triggers rollback)
        boolean failed = facade.placeOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com");
    }
}
```

```python
# Subsystem: Manages product inventory and stock reservations
class InventoryService:
    def __init__(self):
        self._stock = {"SKU-001": 5, "SKU-002": 0}

    def check_stock(self, product_id: str, quantity: int) -> bool:
        return product_id in self._stock and self._stock[product_id] >= quantity

    def reserve_stock(self, product_id: str, quantity: int):
        available = self._stock[product_id]
        print(f"Inventory: Product {product_id} in stock ({available} available). Reserved {quantity} units.")
        self._stock[product_id] = available - quantity

    def release_stock(self, product_id: str, quantity: int):
        self._stock[product_id] = self._stock[product_id] + quantity
        print(f"Rolling back: Releasing {quantity} units of {product_id}.")

# Subsystem: Handles payment processing and refunds
class PaymentService:
    def __init__(self):
        self._counter = 4000

    def charge(self, payment_method: str, amount: float) -> str:
        if payment_method == "expired-card":
            print(f"Payment: FAILED to charge ${amount} to {payment_method}.")
            return None
        self._counter += 1
        txn_id = f"TXN-{self._counter}"
        print(f"Payment: Charged ${amount} to {payment_method}. Transaction: {txn_id}")
        return txn_id

    def refund(self, transaction_id: str):
        print(f"Rolling back: Refunding transaction {transaction_id}.")

# Subsystem: Creates shipments and generates tracking numbers
class ShippingService:
    def __init__(self):
        self._counter = 5000

    def create_shipment(self, product_id: str, address: str) -> str:
        self._counter += 1
        tracking = f"TRK-{self._counter}"
        print(f"Shipping: Shipment created for {product_id} to {address}. Tracking: {tracking}")
        return tracking

    def cancel_shipment(self, tracking_number: str):
        print(f"Rolling back: Cancelling shipment {tracking_number}.")

# Subsystem: Sends notifications to customers
class NotificationService:
    def __init__(self):
        self._counter = 6000

    def send_order_confirmation(self, email: str, order_id: str, tracking_number: str):
        print(f"Notification: Order confirmation sent to {email}. Order: {order_id}, Tracking: {tracking_number}")

# Facade: Orchestrates the full order process with rollback on failure
class OrderFacade:
    def __init__(self, inventory: InventoryService, payment: PaymentService,
                 shipping: ShippingService, notification: NotificationService):
        self._inventory = inventory
        self._payment = payment
        self._shipping = shipping
        self._notification = notification
        self._order_counter = 6000

    def place_order(self, product_id: str, quantity: int, payment_method: str,
                    amount: float, address: str, email: str) -> bool:
        print("--- Processing order ---")

        if not self._inventory.check_stock(product_id, quantity):
            print(f"Inventory: Product {product_id} is out of stock.")
            print("--- Order failed ---")
            return False
        self._inventory.reserve_stock(product_id, quantity)

        txn_id = self._payment.charge(payment_method, amount)
        if txn_id is None:
            self._inventory.release_stock(product_id, quantity)
            print("--- Order failed ---")
            return False

        tracking = self._shipping.create_shipment(product_id, address)

        self._order_counter += 1
        order_id = f"ORD-{self._order_counter}"
        self._notification.send_order_confirmation(email, order_id, tracking)

        print("--- Order placed successfully! ---")
        return True

if __name__ == "__main__":
    inventory = InventoryService()
    payment = PaymentService()
    shipping = ShippingService()
    notification = NotificationService()

    facade = OrderFacade(inventory, payment, shipping, notification)

    # Test 1: Successful order
    success = facade.place_order("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com")
    print()

    # Test 2: Failed order (payment failure triggers rollback)
    failed = facade.place_order("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com")
```

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

// Subsystem: Manages product inventory and stock reservations
class InventoryService {
    unordered_map<string, int> stock;

public:
    InventoryService() {
        stock["SKU-001"] = 5;
        stock["SKU-002"] = 0;
    }

    bool checkStock(const string& productId, int quantity) {
        return stock.count(productId) && stock[productId] >= quantity;
    }

    void reserveStock(const string& productId, int quantity) {
        int available = stock[productId];
        cout << "Inventory: Product " << productId << " in stock (" << available << " available). Reserved " << quantity << " units." << endl;
        stock[productId] = available - quantity;
    }

    void releaseStock(const string& productId, int quantity) {
        stock[productId] += quantity;
        cout << "Rolling back: Releasing " << quantity << " units of " << productId << "." << endl;
    }
};

// Subsystem: Handles payment processing and refunds
class PaymentService {
    int counter = 4000;

public:
    string charge(const string& paymentMethod, double amount) {
        if (paymentMethod == "expired-card") {
            cout << "Payment: FAILED to charge $" << amount << " to " << paymentMethod << "." << endl;
            return "";
        }
        counter++;
        string id = "TXN-" + to_string(counter);
        cout << "Payment: Charged $" << amount << " to " << paymentMethod << ". Transaction: " << id << endl;
        return id;
    }

    void refund(const string& transactionId) {
        cout << "Rolling back: Refunding transaction " << transactionId << "." << endl;
    }
};

// Subsystem: Creates shipments and generates tracking numbers
class ShippingService {
    int counter = 5000;

public:
    string createShipment(const string& productId, const string& address) {
        counter++;
        string id = "TRK-" + to_string(counter);
        cout << "Shipping: Shipment created for " << productId << " to " << address << ". Tracking: " << id << endl;
        return id;
    }

    void cancelShipment(const string& trackingNumber) {
        cout << "Rolling back: Cancelling shipment " << trackingNumber << "." << endl;
    }
};

// Subsystem: Sends notifications to customers
class NotificationService {
public:
    void sendOrderConfirmation(const string& email, const string& orderId,
                                const string& trackingNumber) {
        cout << "Notification: Order confirmation sent to " << email << ". Order: " << orderId << ", Tracking: " << trackingNumber << endl;
    }
};

// Facade: Orchestrates the full order process with rollback on failure
class OrderFacade {
    InventoryService& inventory;
    PaymentService& payment;
    ShippingService& shipping;
    NotificationService& notification;
    int orderCounter = 6000;

public:
    OrderFacade(InventoryService& inventory, PaymentService& payment,
                ShippingService& shipping, NotificationService& notification)
        : inventory(inventory), payment(payment), shipping(shipping), notification(notification)
    {}

    bool placeOrder(const string& productId, int quantity, const string& paymentMethod,
                    double amount, const string& address, const string& email) {
        cout << "--- Processing order ---" << endl;

        if (!inventory.checkStock(productId, quantity)) {
            cout << "Inventory: Product " << productId << " is out of stock." << endl;
            cout << "--- Order failed ---" << endl;
            return false;
        }
        inventory.reserveStock(productId, quantity);

        string txnId = payment.charge(paymentMethod, amount);
        if (txnId.empty()) {
            inventory.releaseStock(productId, quantity);
            cout << "--- Order failed ---" << endl;
            return false;
        }

        string tracking = shipping.createShipment(productId, address);

        orderCounter++;
        string orderId = "ORD-" + to_string(orderCounter);
        notification.sendOrderConfirmation(email, orderId, tracking);

        cout << "--- Order placed successfully! ---" << endl;
        return true;
    }
};

int main() {
    InventoryService inventory;
    PaymentService payment;
    ShippingService shipping;
    NotificationService notification;

    OrderFacade facade(inventory, payment, shipping, notification);

    // Test 1: Successful order
    bool success = facade.placeOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com");
    cout << endl;

    // Test 2: Failed order (payment failure triggers rollback)
    bool failed = facade.placeOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com");
    return 0;
}
```

```go
package main

import (
	"fmt"
)

// Subsystem: Manages product inventory and stock reservations
type InventoryService struct {
	stock map[string]int
}

func NewInventoryService() *InventoryService {
	return &InventoryService{
		stock: map[string]int{
			"SKU-001": 5,
			"SKU-002": 0,
		},
	}
}

func (i *InventoryService) CheckStock(productId string, quantity int) bool {
	available, ok := i.stock[productId]
	return ok && available >= quantity
}

func (i *InventoryService) ReserveStock(productId string, quantity int) {
	available := i.stock[productId]
	fmt.Printf("Inventory: Product %s in stock (%d available). Reserved %d units.\n", productId, available, quantity)
	i.stock[productId] = available - quantity
}

func (i *InventoryService) ReleaseStock(productId string, quantity int) {
	i.stock[productId] += quantity
	fmt.Printf("Rolling back: Releasing %d units of %s.\n", quantity, productId)
}

// Subsystem: Handles payment processing and refunds
type PaymentService struct {
	counter int
}

func NewPaymentService() *PaymentService {
	return &PaymentService{counter: 4000}
}

func (p *PaymentService) Charge(paymentMethod string, amount float64) string {
	if paymentMethod == "expired-card" {
		fmt.Printf("Payment: FAILED to charge $%v to %s.\n", amount, paymentMethod)
		return ""
	}
	p.counter++
	id := fmt.Sprintf("TXN-%d", p.counter)
	fmt.Printf("Payment: Charged $%v to %s. Transaction: %s\n", amount, paymentMethod, id)
	return id
}

func (p *PaymentService) Refund(transactionId string) {
	fmt.Printf("Rolling back: Refunding transaction %s.\n", transactionId)
}

// Subsystem: Creates shipments and generates tracking numbers
type ShippingService struct {
	counter int
}

func NewShippingService() *ShippingService {
	return &ShippingService{counter: 5000}
}

func (s *ShippingService) CreateShipment(productId string, address string) string {
	s.counter++
	id := fmt.Sprintf("TRK-%d", s.counter)
	fmt.Printf("Shipping: Shipment created for %s to %s. Tracking: %s\n", productId, address, id)
	return id
}

func (s *ShippingService) CancelShipment(trackingNumber string) {
	fmt.Printf("Rolling back: Cancelling shipment %s.\n", trackingNumber)
}

// Subsystem: Sends notifications to customers
type NotificationService struct{}

func NewNotificationService() *NotificationService {
	return &NotificationService{}
}

func (n *NotificationService) SendOrderConfirmation(email string, orderId string, trackingNumber string) {
	fmt.Printf("Notification: Order confirmation sent to %s. Order: %s, Tracking: %s\n", email, orderId, trackingNumber)
}

// Facade: Orchestrates the full order process with rollback on failure
type OrderFacade struct {
	inventory    *InventoryService
	payment      *PaymentService
	shipping     *ShippingService
	notification *NotificationService
	orderCounter int
}

func NewOrderFacade(inventory *InventoryService, payment *PaymentService,
	shipping *ShippingService, notification *NotificationService) *OrderFacade {
	return &OrderFacade{
		inventory:    inventory,
		payment:      payment,
		shipping:     shipping,
		notification: notification,
		orderCounter: 6000,
	}
}

func (o *OrderFacade) PlaceOrder(productId string, quantity int, paymentMethod string,
	amount float64, address string, email string) bool {
	fmt.Println("--- Processing order ---")

	if !o.inventory.CheckStock(productId, quantity) {
		fmt.Printf("Inventory: Product %s is out of stock.\n", productId)
		fmt.Println("--- Order failed ---")
		return false
	}
	o.inventory.ReserveStock(productId, quantity)

	txnId := o.payment.Charge(paymentMethod, amount)
	if txnId == "" {
		o.inventory.ReleaseStock(productId, quantity)
		fmt.Println("--- Order failed ---")
		return false
	}

	trackingNumber := o.shipping.CreateShipment(productId, address)

	o.orderCounter++
	orderId := fmt.Sprintf("ORD-%d", o.orderCounter)
	o.notification.SendOrderConfirmation(email, orderId, trackingNumber)

	fmt.Println("--- Order placed successfully! ---")
	return true
}

func main() {
	inventory := NewInventoryService()
	payment := NewPaymentService()
	shipping := NewShippingService()
	notification := NewNotificationService()

	facade := NewOrderFacade(inventory, payment, shipping, notification)

	// Test 1: Successful order
	success := facade.PlaceOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com")
	_ = success
	fmt.Println()

	// Test 2: Failed order (payment failure triggers rollback)
	failed := facade.PlaceOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com")
	_ = failed
}
```

```csharp
using System;
using System.Collections.Generic;

// Subsystem: Manages product inventory and stock reservations
class InventoryService
{
    private Dictionary<string, int> stock = new Dictionary<string, int>();

    public InventoryService()
    {
        // Pre-populate with some stock for testing
        stock["SKU-001"] = 5;
        stock["SKU-002"] = 0;
    }

    public bool CheckStock(string productId, int quantity)
    {
        return stock.ContainsKey(productId) && stock[productId] >= quantity;
    }

    public void ReserveStock(string productId, int quantity)
    {
        int available = stock[productId];
        Console.WriteLine($"Inventory: Product {productId} in stock ({available} available). Reserved {quantity} units.");
        stock[productId] = available - quantity;
    }

    public void ReleaseStock(string productId, int quantity)
    {
        stock[productId] += quantity;
        Console.WriteLine($"Rolling back: Releasing {quantity} units of {productId}.");
    }
}

// Subsystem: Handles payment processing and refunds
class PaymentService
{
    private int counter = 4000;

    public string Charge(string paymentMethod, double amount)
    {
        if (paymentMethod == "expired-card")
        {
            Console.WriteLine($"Payment: FAILED to charge ${amount} to {paymentMethod}.");
            return null;
        }
        counter++;
        string id = "TXN-" + counter;
        Console.WriteLine($"Payment: Charged ${amount} to {paymentMethod}. Transaction: {id}");
        return id;
    }

    public void Refund(string transactionId)
    {
        Console.WriteLine($"Rolling back: Refunding transaction {transactionId}.");
    }
}

// Subsystem: Creates shipments and generates tracking numbers
class ShippingService
{
    private int counter = 5000;

    public string CreateShipment(string productId, string address)
    {
        counter++;
        string id = "TRK-" + counter;
        Console.WriteLine($"Shipping: Shipment created for {productId} to {address}. Tracking: {id}");
        return id;
    }

    public void CancelShipment(string trackingNumber)
    {
        Console.WriteLine($"Rolling back: Cancelling shipment {trackingNumber}.");
    }
}

// Subsystem: Sends notifications to customers
class NotificationService
{
    public void SendOrderConfirmation(string email, string orderId, string trackingNumber)
    {
        Console.WriteLine($"Notification: Order confirmation sent to {email}. Order: {orderId}, Tracking: {trackingNumber}");
    }
}

// Facade: Orchestrates the full order process with rollback on failure
class OrderFacade
{
    private InventoryService inventory;
    private PaymentService payment;
    private ShippingService shipping;
    private NotificationService notification;
    private int orderCounter = 6000;

    public OrderFacade(InventoryService inventory, PaymentService payment,
                       ShippingService shipping, NotificationService notification)
    {
        this.inventory = inventory;
        this.payment = payment;
        this.shipping = shipping;
        this.notification = notification;
    }

    public bool PlaceOrder(string productId, int quantity, string paymentMethod,
                           double amount, string address, string email)
    {
        Console.WriteLine("--- Processing order ---");

        if (!inventory.CheckStock(productId, quantity))
        {
            Console.WriteLine($"Inventory: Product {productId} is out of stock.");
            Console.WriteLine("--- Order failed ---");
            return false;
        }
        inventory.ReserveStock(productId, quantity);

        string txnId = payment.Charge(paymentMethod, amount);
        if (txnId == null)
        {
            inventory.ReleaseStock(productId, quantity);
            Console.WriteLine("--- Order failed ---");
            return false;
        }

        string tracking = shipping.CreateShipment(productId, address);

        orderCounter++;
        string orderId = "ORD-" + orderCounter;
        notification.SendOrderConfirmation(email, orderId, tracking);

        Console.WriteLine("--- Order placed successfully! ---");
        return true;
    }
}

class Program
{
    static void Main()
    {
        var inventory = new InventoryService();
        var payment = new PaymentService();
        var shipping = new ShippingService();
        var notification = new NotificationService();

        var facade = new OrderFacade(inventory, payment, shipping, notification);

        // Test 1: Successful order
        bool success = facade.PlaceOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com");
        Console.WriteLine();

        // Test 2: Failed order (payment failure triggers rollback)
        bool failed = facade.PlaceOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com");
    }
}
```

```typescript
// Subsystem: Manages product inventory and stock reservations
class InventoryService {
    private stock: Map<string, number> = new Map();

    constructor() {
        this.stock.set("SKU-001", 5);
        this.stock.set("SKU-002", 0);
    }

    checkStock(productId: string, quantity: number): boolean {
        return this.stock.has(productId) && (this.stock.get(productId)! >= quantity);
    }

    reserveStock(productId: string, quantity: number): void {
        const available = this.stock.get(productId)!;
        console.log(`Inventory: Product ${productId} in stock (${available} available). Reserved ${quantity} units.`);
        this.stock.set(productId, available - quantity);
    }

    releaseStock(productId: string, quantity: number): void {
        this.stock.set(productId, this.stock.get(productId)! + quantity);
        console.log(`Rolling back: Releasing ${quantity} units of ${productId}.`);
    }
}

// Subsystem: Handles payment processing and refunds
class PaymentService {
    private counter = 4000;

    charge(paymentMethod: string, amount: number): string | null {
        if (paymentMethod === "expired-card") {
            console.log(`Payment: FAILED to charge $${amount} to ${paymentMethod}.`);
            return null;
        }
        this.counter++;
        const id = `TXN-${this.counter}`;
        console.log(`Payment: Charged $${amount} to ${paymentMethod}. Transaction: ${id}`);
        return id;
    }

    refund(transactionId: string): void {
        console.log(`Rolling back: Refunding transaction ${transactionId}.`);
    }
}

// Subsystem: Creates shipments and generates tracking numbers
class ShippingService {
    private counter = 5000;

    createShipment(productId: string, address: string): string {
        this.counter++;
        const id = `TRK-${this.counter}`;
        console.log(`Shipping: Shipment created for ${productId} to ${address}. Tracking: ${id}`);
        return id;
    }

    cancelShipment(trackingNumber: string): void {
        console.log(`Rolling back: Cancelling shipment ${trackingNumber}.`);
    }
}

// Subsystem: Sends notifications to customers
class NotificationService {
    sendOrderConfirmation(email: string, orderId: string, trackingNumber: string): void {
        console.log(`Notification: Order confirmation sent to ${email}. Order: ${orderId}, Tracking: ${trackingNumber}`);
    }
}

// Facade: Orchestrates the full order process with rollback on failure
class OrderFacade {
    private inventory: InventoryService;
    private payment: PaymentService;
    private shipping: ShippingService;
    private notification: NotificationService;
    private orderCounter = 6000;

    constructor(inventory: InventoryService, payment: PaymentService,
                shipping: ShippingService, notification: NotificationService) {
        this.inventory = inventory;
        this.payment = payment;
        this.shipping = shipping;
        this.notification = notification;
    }

    placeOrder(productId: string, quantity: number, paymentMethod: string,
               amount: number, address: string, email: string): boolean {
        console.log("--- Processing order ---");

        if (!this.inventory.checkStock(productId, quantity)) {
            console.log(`Inventory: Product ${productId} is out of stock.`);
            console.log("--- Order failed ---");
            return false;
        }
        this.inventory.reserveStock(productId, quantity);

        const txnId = this.payment.charge(paymentMethod, amount);
        if (txnId === null) {
            this.inventory.releaseStock(productId, quantity);
            console.log("--- Order failed ---");
            return false;
        }

        const tracking = this.shipping.createShipment(productId, address);

        this.orderCounter++;
        const orderId = `ORD-${this.orderCounter}`;
        this.notification.sendOrderConfirmation(email, orderId, tracking);

        console.log("--- Order placed successfully! ---");
        return true;
    }
}

const inventory = new InventoryService();
const payment = new PaymentService();
const shipping = new ShippingService();
const notification = new NotificationService();

const facade = new OrderFacade(inventory, payment, shipping, notification);

// Test 1: Successful order
const success = facade.placeOrder("SKU-001", 2, "credit-card", 49.99, "123 Main St", "user@example.com");
console.log();

// Test 2: Failed order (payment failure triggers rollback)
const failed = facade.placeOrder("SKU-001", 1, "expired-card", 29.99, "456 Oak Ave", "user@example.com");
```


