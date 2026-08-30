---
id: "lld-design-patterns-exercise-observer-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Observer Design Pattern"
slug: "lld-design-patterns-exercise-observer-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Observer Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Observer Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Weather Station

<!-- payload:lldCodingPracticeBlock:START {"id":"6991651d7afcb26b29925c15","title":"Design Weather Station","difficulty":"easy","expectedOutput":"Current Conditions -> Temp: 25.0, Humidity: 65.0%, Pressure: 1013.0 hPa\nStatistics -> Avg Temperature: 25.0\nCurrent Conditions -> Temp: 28.0, Humidity: 70.0%, Pressure: 1012.0 hPa\nStatistics -> Avg Temperature: 26.5\nCurrent Conditions -> Temp: 22.0, Humidity: 90.0%, Pressure: 1011.0 hPa\nStatistics -> Avg Temperature: 25.0"} -->
Build a basic weather station system. A `WeatherStation` subject broadcasts temperature, humidity, and pressure readings. Two observers respond to each update: `CurrentConditionsDisplay` shows the latest reading, and `StatisticsDisplay` tracks and displays the average temperature across all readings received so far.

**Requirements:**

- Subject interface with register, remove, notify
- `WeatherStation` with `setMeasurements(temp, humidity, pressure)` that notifies observers
- `CurrentConditionsDisplay` prints the latest temperature, humidity, and pressure
- `StatisticsDisplay` tracks all temperature readings and prints the average temperature

```java
import java.util.*;

interface WeatherObserver {
    void update(WeatherStation station);
}

class WeatherStation {
    private double temperature;
    private double humidity;
    private double pressure;
    private List<WeatherObserver> observers = new ArrayList<>();

    public void registerObserver(WeatherObserver observer) {
        // TODO: Add observer to the list
    }

    public void removeObserver(WeatherObserver observer) {
        // TODO: Remove observer from the list
    }

    private void notifyObservers() {
        // TODO: Call update on each observer, passing this station
    }

    public void setMeasurements(double temperature, double humidity, double pressure) {
        // TODO: Update fields and notify observers
    }

    public double getTemperature() { return temperature; }
    public double getHumidity() { return humidity; }
    public double getPressure() { return pressure; }
}

class CurrentConditionsDisplay implements WeatherObserver {
    @Override
    public void update(WeatherStation station) {
        // TODO: Print "Current Conditions -> Temp: X, Humidity: Y%, Pressure: Z hPa"
    }
}

class StatisticsDisplay implements WeatherObserver {
    private List<Double> readings = new ArrayList<>();

    @Override
    public void update(WeatherStation station) {
        // TODO: Add temperature to readings, compute average, print "Statistics -> Avg Temperature: X"
    }
}

public class Main {
    public static void main(String[] args) {
        // WeatherStation station = new WeatherStation();
        // CurrentConditionsDisplay current = new CurrentConditionsDisplay();
        // StatisticsDisplay stats = new StatisticsDisplay();
        // station.registerObserver(current);
        // station.registerObserver(stats);
        // station.setMeasurements(25.0, 65.0, 1013.0);
        // station.setMeasurements(28.0, 70.0, 1012.0);
        // station.setMeasurements(22.0, 90.0, 1011.0);
    }
}
```

```python
from abc import ABC, abstractmethod

class WeatherObserver(ABC):
    @abstractmethod
    def update(self, station):
        pass

class WeatherStation:
    def __init__(self):
        self.temperature = 0.0
        self.humidity = 0.0
        self.pressure = 0.0
        self._observers = []

    def register_observer(self, observer):
        # TODO: Add observer to the list
        pass

    def remove_observer(self, observer):
        # TODO: Remove observer from the list
        pass

    def _notify_observers(self):
        # TODO: Call update on each observer, passing self
        pass

    def set_measurements(self, temperature, humidity, pressure):
        # TODO: Update fields and notify observers
        pass

class CurrentConditionsDisplay(WeatherObserver):
    def update(self, station):
        # TODO: Print "Current Conditions -> Temp: X, Humidity: Y%, Pressure: Z hPa"
        pass

class StatisticsDisplay(WeatherObserver):
    def __init__(self):
        self._readings = []

    def update(self, station):
        # TODO: Add temperature to readings, compute average, print "Statistics -> Avg Temperature: X"
        pass

if __name__ == "__main__":
    # station = WeatherStation()
    # current = CurrentConditionsDisplay()
    # stats = StatisticsDisplay()
    # station.register_observer(current)
    # station.register_observer(stats)
    # station.set_measurements(25.0, 65.0, 1013.0)
    # station.set_measurements(28.0, 70.0, 1012.0)
    # station.set_measurements(22.0, 90.0, 1011.0)
    pass
```

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <cstdio>
using namespace std;

class WeatherStation; // Forward declaration

class WeatherObserver {
public:
    virtual ~WeatherObserver() {}
    virtual void update(WeatherStation* station) = 0;
};

class WeatherStation {
    double temperature = 0;
    double humidity = 0;
    double pressure = 0;
    vector<WeatherObserver*> observers;

public:
    void registerObserver(WeatherObserver* observer) {
        // TODO: Add observer to the list
    }

    void removeObserver(WeatherObserver* observer) {
        // TODO: Remove observer from the list
    }

    void setMeasurements(double temperature, double humidity, double pressure) {
        // TODO: Update fields and notify observers
    }

    double getTemperature() const { return temperature; }
    double getHumidity() const { return humidity; }
    double getPressure() const { return pressure; }

private:
    void notifyObservers() {
        // TODO: Call update on each observer, passing this
    }
};

class CurrentConditionsDisplay : public WeatherObserver {
public:
    void update(WeatherStation* station) override {
        // TODO: Print "Current Conditions -> Temp: X, Humidity: Y%, Pressure: Z hPa"
    }
};

class StatisticsDisplay : public WeatherObserver {
    vector<double> readings;

public:
    void update(WeatherStation* station) override {
        // TODO: Add temperature to readings, compute average, print "Statistics -> Avg Temperature: X"
    }
};

int main() {
    // WeatherStation station;
    // CurrentConditionsDisplay current;
    // StatisticsDisplay stats;
    // station.registerObserver(&current);
    // station.registerObserver(&stats);
    // station.setMeasurements(25.0, 65.0, 1013.0);
    // station.setMeasurements(28.0, 70.0, 1012.0);
    // station.setMeasurements(22.0, 90.0, 1011.0);
    return 0;
}
```

```go
package main

type WeatherObserver interface {
	Update(station *WeatherStation)
}

type WeatherStation struct {
	temperature float64
	humidity    float64
	pressure    float64
	observers   []WeatherObserver
}

func (w *WeatherStation) RegisterObserver(observer WeatherObserver) {
	// TODO: Add observer to the list
}

func (w *WeatherStation) RemoveObserver(observer WeatherObserver) {
	// TODO: Remove observer from the list
}

func (w *WeatherStation) notifyObservers() {
	// TODO: Call update on each observer, passing this station
}

func (w *WeatherStation) SetMeasurements(temperature float64, humidity float64, pressure float64) {
	// TODO: Update fields and notify observers
}

func (w *WeatherStation) GetTemperature() float64 { return w.temperature }
func (w *WeatherStation) GetHumidity() float64    { return w.humidity }
func (w *WeatherStation) GetPressure() float64    { return w.pressure }

type CurrentConditionsDisplay struct{}

func (c *CurrentConditionsDisplay) Update(station *WeatherStation) {
	// TODO: Print "Current Conditions -> Temp: X, Humidity: Y%, Pressure: Z hPa"
}

type StatisticsDisplay struct {
	readings []float64
}

func (s *StatisticsDisplay) Update(station *WeatherStation) {
	// TODO: Add temperature to readings, compute average, print "Statistics -> Avg Temperature: X"
}

func main() {
	// station := &WeatherStation{}
	// current := &CurrentConditionsDisplay{}
	// stats := &StatisticsDisplay{}
	// station.RegisterObserver(current)
	// station.RegisterObserver(stats)
	// station.SetMeasurements(25.0, 65.0, 1013.0)
	// station.SetMeasurements(28.0, 70.0, 1012.0)
	// station.SetMeasurements(22.0, 90.0, 1011.0)
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

interface IWeatherObserver
{
    void Update(WeatherStation station);
}

class WeatherStation
{
    private double temperature;
    private double humidity;
    private double pressure;
    private List<IWeatherObserver> observers = new List<IWeatherObserver>();

    public void RegisterObserver(IWeatherObserver observer)
    {
        // TODO: Add observer to the list
    }

    public void RemoveObserver(IWeatherObserver observer)
    {
        // TODO: Remove observer from the list
    }

    private void NotifyObservers()
    {
        // TODO: Call Update on each observer, passing this station
    }

    public void SetMeasurements(double temperature, double humidity, double pressure)
    {
        // TODO: Update fields and notify observers
    }

    public double GetTemperature() { return temperature; }
    public double GetHumidity() { return humidity; }
    public double GetPressure() { return pressure; }
}

class CurrentConditionsDisplay : IWeatherObserver
{
    public void Update(WeatherStation station)
    {
        // TODO: Print "Current Conditions -> Temp: X, Humidity: Y%, Pressure: Z hPa"
    }
}

class StatisticsDisplay : IWeatherObserver
{
    private List<double> readings = new List<double>();

    public void Update(WeatherStation station)
    {
        // TODO: Add temperature to readings, compute average, print "Statistics -> Avg Temperature: X"
    }
}

class Program
{
    static void Main(string[] args)
    {
        // WeatherStation station = new WeatherStation();
        // CurrentConditionsDisplay current = new CurrentConditionsDisplay();
        // StatisticsDisplay stats = new StatisticsDisplay();
        // station.RegisterObserver(current);
        // station.RegisterObserver(stats);
        // station.SetMeasurements(25.0, 65.0, 1013.0);
        // station.SetMeasurements(28.0, 70.0, 1012.0);
        // station.SetMeasurements(22.0, 90.0, 1011.0);
    }
}
```

```typescript
interface WeatherObserver {
    update(station: WeatherStation): void;
}

class WeatherStation {
    private temperature: number = 0;
    private humidity: number = 0;
    private pressure: number = 0;
    private observers: WeatherObserver[] = [];

    registerObserver(observer: WeatherObserver): void {
        // TODO: Add observer to the list
    }

    removeObserver(observer: WeatherObserver): void {
        // TODO: Remove observer from the list
    }

    private notifyObservers(): void {
        // TODO: Call update on each observer, passing this
    }

    setMeasurements(temperature: number, humidity: number, pressure: number): void {
        // TODO: Update fields and notify observers
    }

    getTemperature(): number { return this.temperature; }
    getHumidity(): number { return this.humidity; }
    getPressure(): number { return this.pressure; }
}

class CurrentConditionsDisplay implements WeatherObserver {
    update(station: WeatherStation): void {
        // TODO: Print "Current Conditions -> Temp: X, Humidity: Y%, Pressure: Z hPa"
    }
}

class StatisticsDisplay implements WeatherObserver {
    private readings: number[] = [];

    update(station: WeatherStation): void {
        // TODO: Add temperature to readings, compute average, print "Statistics -> Avg Temperature: X"
    }
}

// const station = new WeatherStation();
// const current = new CurrentConditionsDisplay();
// const stats = new StatisticsDisplay();
// station.registerObserver(current);
// station.registerObserver(stats);
// station.setMeasurements(25.0, 65.0, 1013.0);
// station.setMeasurements(28.0, 70.0, 1012.0);
// station.setMeasurements(22.0, 90.0, 1011.0);
```

#### Solutions

```java
import java.util.*;

interface WeatherObserver {
    void update(WeatherStation station);
}

class WeatherStation {
    private double temperature;
    private double humidity;
    private double pressure;
    private List<WeatherObserver> observers = new ArrayList<>();

    public void registerObserver(WeatherObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(WeatherObserver observer) {
        observers.remove(observer);
    }

    private void notifyObservers() {
        for (WeatherObserver observer : observers) {
            observer.update(this);
        }
    }

    public void setMeasurements(double temperature, double humidity, double pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        notifyObservers();
    }

    public double getTemperature() { return temperature; }
    public double getHumidity() { return humidity; }
    public double getPressure() { return pressure; }
}

class CurrentConditionsDisplay implements WeatherObserver {
    @Override
    public void update(WeatherStation station) {
        double temp = station.getTemperature();
        double humidity = station.getHumidity();
        double pressure = station.getPressure();
        System.out.println("Current Conditions -> Temp: " + temp + ", Humidity: " + humidity + "%, Pressure: " + pressure + " hPa");
    }
}

class StatisticsDisplay implements WeatherObserver {
    private List<Double> readings = new ArrayList<>();

    @Override
    public void update(WeatherStation station) {
        readings.add(station.getTemperature());
        double sum = 0;
        for (double r : readings) sum += r;
        double avg = sum / readings.size();
        System.out.println("Statistics -> Avg Temperature: " + avg);
    }
}

public class Main {
    public static void main(String[] args) {
        WeatherStation station = new WeatherStation();
        CurrentConditionsDisplay current = new CurrentConditionsDisplay();
        StatisticsDisplay stats = new StatisticsDisplay();
        station.registerObserver(current);
        station.registerObserver(stats);
        station.setMeasurements(25.0, 65.0, 1013.0);
        station.setMeasurements(28.0, 70.0, 1012.0);
        station.setMeasurements(22.0, 90.0, 1011.0);
    }
}
```

```python
from abc import ABC, abstractmethod

class WeatherObserver(ABC):
    @abstractmethod
    def update(self, station):
        pass

class WeatherStation:
    def __init__(self):
        self.temperature = 0.0
        self.humidity = 0.0
        self.pressure = 0.0
        self._observers = []

    def register_observer(self, observer):
        self._observers.append(observer)

    def remove_observer(self, observer):
        self._observers.remove(observer)

    def _notify_observers(self):
        for observer in self._observers:
            observer.update(self)

    def set_measurements(self, temperature, humidity, pressure):
        self.temperature = temperature
        self.humidity = humidity
        self.pressure = pressure
        self._notify_observers()

class CurrentConditionsDisplay(WeatherObserver):
    def update(self, station):
        print(f"Current Conditions -> Temp: {station.temperature}, Humidity: {station.humidity}%, Pressure: {station.pressure} hPa")

class StatisticsDisplay(WeatherObserver):
    def __init__(self):
        self._readings = []

    def update(self, station):
        self._readings.append(station.temperature)
        avg = sum(self._readings) / len(self._readings)
        print(f"Statistics -> Avg Temperature: {avg}")

if __name__ == "__main__":
    station = WeatherStation()
    current = CurrentConditionsDisplay()
    stats = StatisticsDisplay()
    station.register_observer(current)
    station.register_observer(stats)
    station.set_measurements(25.0, 65.0, 1013.0)
    station.set_measurements(28.0, 70.0, 1012.0)
    station.set_measurements(22.0, 90.0, 1011.0)
```

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <cstdio>
using namespace std;

class WeatherStation; // Forward declaration

class WeatherObserver {
public:
    virtual ~WeatherObserver() {}
    virtual void update(WeatherStation* station) = 0;
};

class WeatherStation {
    double temperature = 0;
    double humidity = 0;
    double pressure = 0;
    vector<WeatherObserver*> observers;

public:
    void registerObserver(WeatherObserver* observer) {
        observers.push_back(observer);
    }

    void removeObserver(WeatherObserver* observer) {
        observers.erase(remove(observers.begin(), observers.end(), observer), observers.end());
    }

    void setMeasurements(double temperature, double humidity, double pressure) {
        this->temperature = temperature;
        this->humidity = humidity;
        this->pressure = pressure;
        notifyObservers();
    }

    double getTemperature() const { return temperature; }
    double getHumidity() const { return humidity; }
    double getPressure() const { return pressure; }

private:
    void notifyObservers() {
        for (auto* observer : observers) {
            observer->update(this);
        }
    }
};

class CurrentConditionsDisplay : public WeatherObserver {
public:
    void update(WeatherStation* station) override {
        printf("Current Conditions -> Temp: %.1f, Humidity: %.1f%%, Pressure: %.1f hPa\n",
            station->getTemperature(), station->getHumidity(), station->getPressure());
    }
};

class StatisticsDisplay : public WeatherObserver {
    vector<double> readings;

public:
    void update(WeatherStation* station) override {
        readings.push_back(station->getTemperature());
        double sum = accumulate(readings.begin(), readings.end(), 0.0);
        double avg = sum / readings.size();
        printf("Statistics -> Avg Temperature: %.1f\n", avg);
    }
};

int main() {
    WeatherStation station;
    CurrentConditionsDisplay current;
    StatisticsDisplay stats;
    station.registerObserver(&current);
    station.registerObserver(&stats);
    station.setMeasurements(25.0, 65.0, 1013.0);
    station.setMeasurements(28.0, 70.0, 1012.0);
    station.setMeasurements(22.0, 90.0, 1011.0);
    return 0;
}
```

```go
package main

import (
	"fmt"
)

type WeatherObserver interface {
	Update(station *WeatherStation)
}

type WeatherStation struct {
	temperature float64
	humidity    float64
	pressure    float64
	observers   []WeatherObserver
}

func (w *WeatherStation) RegisterObserver(observer WeatherObserver) {
	w.observers = append(w.observers, observer)
}

func (w *WeatherStation) RemoveObserver(observer WeatherObserver) {
	for i, o := range w.observers {
		if o == observer {
			w.observers = append(w.observers[:i], w.observers[i+1:]...)
			return
		}
	}
}

func (w *WeatherStation) notifyObservers() {
	for _, observer := range w.observers {
		observer.Update(w)
	}
}

func (w *WeatherStation) SetMeasurements(temperature, humidity, pressure float64) {
	w.temperature = temperature
	w.humidity = humidity
	w.pressure = pressure
	w.notifyObservers()
}

func (w *WeatherStation) GetTemperature() float64 {
	return w.temperature
}

func (w *WeatherStation) GetHumidity() float64 {
	return w.humidity
}

func (w *WeatherStation) GetPressure() float64 {
	return w.pressure
}

type CurrentConditionsDisplay struct{}

func (c *CurrentConditionsDisplay) Update(station *WeatherStation) {
	fmt.Printf("Current Conditions -> Temp: %.1f, Humidity: %.1f%%, Pressure: %.1f hPa\n",
		station.GetTemperature(), station.GetHumidity(), station.GetPressure())
}

type StatisticsDisplay struct {
	readings []float64
}

func (s *StatisticsDisplay) Update(station *WeatherStation) {
	s.readings = append(s.readings, station.GetTemperature())
	sum := 0.0
	for _, r := range s.readings {
		sum += r
	}
	avg := sum / float64(len(s.readings))
	fmt.Printf("Statistics -> Avg Temperature: %.1f\n", avg)
}

func main() {
	station := &WeatherStation{}
	current := &CurrentConditionsDisplay{}
	stats := &StatisticsDisplay{}

	station.RegisterObserver(current)
	station.RegisterObserver(stats)

	station.SetMeasurements(25.0, 65.0, 1013.0)
	station.SetMeasurements(28.0, 70.0, 1012.0)
	station.SetMeasurements(22.0, 90.0, 1011.0)
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

interface IWeatherObserver
{
    void Update(WeatherStation station);
}

class WeatherStation
{
    private double temperature;
    private double humidity;
    private double pressure;
    private List<IWeatherObserver> observers = new List<IWeatherObserver>();

    public void RegisterObserver(IWeatherObserver observer)
    {
        observers.Add(observer);
    }

    public void RemoveObserver(IWeatherObserver observer)
    {
        observers.Remove(observer);
    }

    private void NotifyObservers()
    {
        foreach (var observer in observers)
            observer.Update(this);
    }

    public void SetMeasurements(double temperature, double humidity, double pressure)
    {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        NotifyObservers();
    }

    public double GetTemperature() { return temperature; }
    public double GetHumidity() { return humidity; }
    public double GetPressure() { return pressure; }
}

class CurrentConditionsDisplay : IWeatherObserver
{
    public void Update(WeatherStation station)
    {
        Console.WriteLine($"Current Conditions -> Temp: {station.GetTemperature():F1}, Humidity: {station.GetHumidity():F1}%, Pressure: {station.GetPressure():F1} hPa");
    }
}

class StatisticsDisplay : IWeatherObserver
{
    private List<double> readings = new List<double>();

    public void Update(WeatherStation station)
    {
        readings.Add(station.GetTemperature());
        double avg = readings.Average();
        Console.WriteLine($"Statistics -> Avg Temperature: {avg:F1}");
    }
}

class Program
{
    static void Main(string[] args)
    {
        WeatherStation station = new WeatherStation();
        CurrentConditionsDisplay current = new CurrentConditionsDisplay();
        StatisticsDisplay stats = new StatisticsDisplay();
        station.RegisterObserver(current);
        station.RegisterObserver(stats);
        station.SetMeasurements(25.0, 65.0, 1013.0);
        station.SetMeasurements(28.0, 70.0, 1012.0);
        station.SetMeasurements(22.0, 90.0, 1011.0);
    }
}
```

```typescript
interface WeatherObserver {
    update(station: WeatherStation): void;
}

class WeatherStation {
    private temperature: number = 0;
    private humidity: number = 0;
    private pressure: number = 0;
    private observers: WeatherObserver[] = [];

    registerObserver(observer: WeatherObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: WeatherObserver): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    private notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    setMeasurements(temperature: number, humidity: number, pressure: number): void {
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.notifyObservers();
    }

    getTemperature(): number { return this.temperature; }
    getHumidity(): number { return this.humidity; }
    getPressure(): number { return this.pressure; }
}

class CurrentConditionsDisplay implements WeatherObserver {
    update(station: WeatherStation): void {
        const temp = station.getTemperature().toFixed(1);
        const hum = station.getHumidity().toFixed(1);
        const pres = station.getPressure().toFixed(1);
        console.log(`Current Conditions -> Temp: ${temp}, Humidity: ${hum}%, Pressure: ${pres} hPa`);
    }
}

class StatisticsDisplay implements WeatherObserver {
    private readings: number[] = [];

    update(station: WeatherStation): void {
        this.readings.push(station.getTemperature());
        const sum = this.readings.reduce((a, b) => a + b, 0);
        const avg = sum / this.readings.length;
        console.log(`Statistics -> Avg Temperature: ${avg.toFixed(1)}`);
    }
}

const station = new WeatherStation();
const current = new CurrentConditionsDisplay();
const stats = new StatisticsDisplay();
station.registerObserver(current);
station.registerObserver(stats);
station.setMeasurements(25.0, 65.0, 1013.0);
station.setMeasurements(28.0, 70.0, 1012.0);
station.setMeasurements(22.0, 90.0, 1011.0);
```

---

# Exercise 2: Auction System

> [!PAYWALL] This content is for premium members only.

<!-- payload:lldCodingPracticeBlock:START {"id":"699165967afcb26b29925c16","title":"Design Auction System","difficulty":"medium","expectedOutput":"Bid Update -> [Vintage Watch] Current bid: $50.00 by Alice\nAutoBot bids $60.00 on Vintage Watch\nBid Update -> [Vintage Watch] Current bid: $60.00 by AutoBot\nBid Update -> [Vintage Watch] Current bid: $120.00 by Bob\nAutoBot bids $130.00 on Vintage Watch\nBid Update -> [Vintage Watch] Current bid: $130.00 by AutoBot\nBid Update -> [Vintage Watch] Current bid: $200.00 by Alice"} -->
Build an auction system where an `Auction` subject notifies bidders when a new bid is placed. One observer, `AutoBidder`, automatically places a higher bid if the current bid is below its maximum. This demonstrates an observer that modifies the subject, which introduces a re-entrant notification challenge you will need to handle.

**Requirements:**

- `Auction` subject with `placeBid(bidderName, amount)`, maintains current highest bid
- `BidDisplay` observer prints each new bid
- `AutoBidder` observer automatically outbids by $10 if current bid is below its max
- Handle the re-entrant notification issue (AutoBidder's counter-bid triggers another notification round)

```java
import java.util.*;

interface AuctionObserver {
    void onNewBid(Auction auction);
}

class Auction {
    private String itemName;
    private double highestBid;
    private String highestBidder;
    private List<AuctionObserver> observers = new ArrayList<>();
    private boolean notifying = false;

    public Auction(String itemName) {
        this.itemName = itemName;
        this.highestBid = 0;
        this.highestBidder = "";
    }

    public void addObserver(AuctionObserver observer) {
        // TODO: Add observer to the list
    }

    public void removeObserver(AuctionObserver observer) {
        // TODO: Remove observer from the list
    }

    private void notifyObservers() {
        // TODO: Guard against re-entrant calls using notifying flag, then notify all observers
    }

    public void placeBid(String bidderName, double amount) {
        // TODO: If amount > highestBid, update fields and notify observers
    }

    public String getItemName() { return itemName; }
    public double getHighestBid() { return highestBid; }
    public String getHighestBidder() { return highestBidder; }
}

class BidDisplay implements AuctionObserver {
    @Override
    public void onNewBid(Auction auction) {
        // TODO: Print "Bid Update -> [itemName] Current bid: $X by BidderName"
    }
}

class AutoBidder implements AuctionObserver {
    private String name;
    private double maxBid;

    public AutoBidder(String name, double maxBid) {
        this.name = name;
        this.maxBid = maxBid;
    }

    @Override
    public void onNewBid(Auction auction) {
        // TODO: If highest bidder is not self and current + 10 <= maxBid, place a counter-bid
    }
}

public class Main {
    public static void main(String[] args) {
        // Auction auction = new Auction("Vintage Watch");
        // BidDisplay display = new BidDisplay();
        // AutoBidder bot = new AutoBidder("AutoBot", 150.0);
        // auction.addObserver(display);
        // auction.addObserver(bot);
        // auction.placeBid("Alice", 50.0);
        // auction.placeBid("Bob", 120.0);
        // auction.placeBid("Alice", 200.0);
    }
}
```

```python
from abc import ABC, abstractmethod

class AuctionObserver(ABC):
    @abstractmethod
    def on_new_bid(self, auction):
        pass

class Auction:
    def __init__(self, item_name):
        self.item_name = item_name
        self.highest_bid = 0.0
        self.highest_bidder = ""
        self._observers = []
        self._notifying = False

    def add_observer(self, observer):
        # TODO: Add observer to the list
        pass

    def remove_observer(self, observer):
        # TODO: Remove observer from the list
        pass

    def _notify_observers(self):
        # TODO: Guard against re-entrant calls using _notifying flag, then notify all observers
        pass

    def place_bid(self, bidder_name, amount):
        # TODO: If amount > highest_bid, update fields and notify observers
        pass

class BidDisplay(AuctionObserver):
    def on_new_bid(self, auction):
        # TODO: Print "Bid Update -> [item_name] Current bid: $X by BidderName"
        pass

class AutoBidder(AuctionObserver):
    def __init__(self, name, max_bid):
        self.name = name
        self.max_bid = max_bid

    def on_new_bid(self, auction):
        # TODO: If highest bidder is not self and current + 10 <= max_bid, place a counter-bid
        pass

if __name__ == "__main__":
    # auction = Auction("Vintage Watch")
    # display = BidDisplay()
    # bot = AutoBidder("AutoBot", 150.0)
    # auction.add_observer(display)
    # auction.add_observer(bot)
    # auction.place_bid("Alice", 50.0)
    # auction.place_bid("Bob", 120.0)
    # auction.place_bid("Alice", 200.0)
    pass
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <iomanip>
using namespace std;

class Auction; // Forward declaration

class AuctionObserver {
public:
    virtual ~AuctionObserver() {}
    virtual void onNewBid(Auction* auction) = 0;
};

class Auction {
    string itemName;
    double highestBid;
    string highestBidder;
    vector<AuctionObserver*> observers;
    bool notifying = false;

public:
    Auction(const string& itemName) : itemName(itemName), highestBid(0), highestBidder("") {}

    void addObserver(AuctionObserver* observer) {
        // TODO: Add observer to the list
    }

    void removeObserver(AuctionObserver* observer) {
        // TODO: Remove observer from the list
    }

    void placeBid(const string& bidderName, double amount) {
        // TODO: If amount > highestBid, update fields and notify observers
    }

    const string& getItemName() const { return itemName; }
    double getHighestBid() const { return highestBid; }
    const string& getHighestBidder() const { return highestBidder; }

private:
    void notifyObservers() {
        // TODO: Guard against re-entrant calls using notifying flag, then notify all observers
    }
};

class BidDisplay : public AuctionObserver {
public:
    void onNewBid(Auction* auction) override {
        // TODO: Print "Bid Update -> [itemName] Current bid: $X by BidderName"
    }
};

class AutoBidder : public AuctionObserver {
    string name;
    double maxBid;

public:
    AutoBidder(const string& name, double maxBid) : name(name), maxBid(maxBid) {}

    void onNewBid(Auction* auction) override {
        // TODO: If highest bidder is not self and current + 10 <= maxBid, place a counter-bid
    }
};

int main() {
    // Auction auction("Vintage Watch");
    // BidDisplay display;
    // AutoBidder bot("AutoBot", 150.0);
    // auction.addObserver(&display);
    // auction.addObserver(&bot);
    // auction.placeBid("Alice", 50.0);
    // auction.placeBid("Bob", 120.0);
    // auction.placeBid("Alice", 200.0);
    return 0;
}
```

```go
package main

type AuctionObserver interface {
	OnNewBid(auction *Auction)
}

type Auction struct {
	itemName     string
	highestBid   float64
	highestBidder string
	observers    []AuctionObserver
	notifying    bool
}

func NewAuction(itemName string) *Auction {
	return &Auction{
		itemName:     itemName,
		highestBid:   0,
		highestBidder: "",
		observers:    make([]AuctionObserver, 0),
		notifying:    false,
	}
}

func (a *Auction) AddObserver(observer AuctionObserver) {
	// TODO: Add observer to the list
}

func (a *Auction) RemoveObserver(observer AuctionObserver) {
	// TODO: Remove observer from the list
}

func (a *Auction) notifyObservers() {
	// TODO: Guard against re-entrant calls using notifying flag, then notify all observers
}

func (a *Auction) PlaceBid(bidderName string, amount float64) {
	// TODO: If amount > highestBid, update fields and notify observers
}

func (a *Auction) GetItemName() string {
	return a.itemName
}

func (a *Auction) GetHighestBid() float64 {
	return a.highestBid
}

func (a *Auction) GetHighestBidder() string {
	return a.highestBidder
}

type BidDisplay struct{}

func (b *BidDisplay) OnNewBid(auction *Auction) {
	// TODO: Print "Bid Update -> [itemName] Current bid: $X by BidderName"
}

type AutoBidder struct {
	name   string
	maxBid float64
}

func NewAutoBidder(name string, maxBid float64) *AutoBidder {
	return &AutoBidder{
		name:   name,
		maxBid: maxBid,
	}
}

func (a *AutoBidder) OnNewBid(auction *Auction) {
	// TODO: If highest bidder is not self and current + 10 <= maxBid, place a counter-bid
}

func main() {
	// auction := NewAuction("Vintage Watch")
	// display := &BidDisplay{}
	// bot := NewAutoBidder("AutoBot", 150.0)
	// auction.AddObserver(display)
	// auction.AddObserver(bot)
	// auction.PlaceBid("Alice", 50.0)
	// auction.PlaceBid("Bob", 120.0)
	// auction.PlaceBid("Alice", 200.0)
}
```

```csharp
using System;
using System.Collections.Generic;

interface IAuctionObserver
{
    void OnNewBid(Auction auction);
}

class Auction
{
    private string itemName;
    private double highestBid;
    private string highestBidder;
    private List<IAuctionObserver> observers = new List<IAuctionObserver>();
    private bool notifying = false;

    public Auction(string itemName)
    {
        this.itemName = itemName;
        this.highestBid = 0;
        this.highestBidder = "";
    }

    public void AddObserver(IAuctionObserver observer)
    {
        // TODO: Add observer to the list
    }

    public void RemoveObserver(IAuctionObserver observer)
    {
        // TODO: Remove observer from the list
    }

    private void NotifyObservers()
    {
        // TODO: Guard against re-entrant calls using notifying flag, then notify all observers
    }

    public void PlaceBid(string bidderName, double amount)
    {
        // TODO: If amount > highestBid, update fields and notify observers
    }

    public string GetItemName() { return itemName; }
    public double GetHighestBid() { return highestBid; }
    public string GetHighestBidder() { return highestBidder; }
}

class BidDisplay : IAuctionObserver
{
    public void OnNewBid(Auction auction)
    {
        // TODO: Print "Bid Update -> [itemName] Current bid: $X by BidderName"
    }
}

class AutoBidder : IAuctionObserver
{
    private string name;
    private double maxBid;

    public AutoBidder(string name, double maxBid)
    {
        this.name = name;
        this.maxBid = maxBid;
    }

    public void OnNewBid(Auction auction)
    {
        // TODO: If highest bidder is not self and current + 10 <= maxBid, place a counter-bid
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Auction auction = new Auction("Vintage Watch");
        // BidDisplay display = new BidDisplay();
        // AutoBidder bot = new AutoBidder("AutoBot", 150.0);
        // auction.AddObserver(display);
        // auction.AddObserver(bot);
        // auction.PlaceBid("Alice", 50.0);
        // auction.PlaceBid("Bob", 120.0);
        // auction.PlaceBid("Alice", 200.0);
    }
}
```

```typescript
interface AuctionObserver {
    onNewBid(auction: Auction): void;
}

class Auction {
    private itemName: string;
    private highestBid: number = 0;
    private highestBidder: string = "";
    private observers: AuctionObserver[] = [];
    private notifying: boolean = false;

    constructor(itemName: string) {
        this.itemName = itemName;
    }

    addObserver(observer: AuctionObserver): void {
        // TODO: Add observer to the list
    }

    removeObserver(observer: AuctionObserver): void {
        // TODO: Remove observer from the list
    }

    private notifyObservers(): void {
        // TODO: Guard against re-entrant calls using notifying flag, then notify all observers
    }

    placeBid(bidderName: string, amount: number): void {
        // TODO: If amount > highestBid, update fields and notify observers
    }

    getItemName(): string { return this.itemName; }
    getHighestBid(): number { return this.highestBid; }
    getHighestBidder(): string { return this.highestBidder; }
}

class BidDisplay implements AuctionObserver {
    onNewBid(auction: Auction): void {
        // TODO: Print "Bid Update -> [itemName] Current bid: $X by BidderName"
    }
}

class AutoBidder implements AuctionObserver {
    private name: string;
    private maxBid: number;

    constructor(name: string, maxBid: number) {
        this.name = name;
        this.maxBid = maxBid;
    }

    onNewBid(auction: Auction): void {
        // TODO: If highest bidder is not self and current + 10 <= maxBid, place a counter-bid
    }
}

// const auction = new Auction("Vintage Watch");
// const display = new BidDisplay();
// const bot = new AutoBidder("AutoBot", 150.0);
// auction.addObserver(display);
// auction.addObserver(bot);
// auction.placeBid("Alice", 50.0);
// auction.placeBid("Bob", 120.0);
// auction.placeBid("Alice", 200.0);
```

#### Solutions

```java
import java.util.*;

interface AuctionObserver {
    void onNewBid(Auction auction);
}

class Auction {
    private String itemName;
    private double highestBid;
    private String highestBidder;
    private List<AuctionObserver> observers = new ArrayList<>();

    public Auction(String itemName) {
        this.itemName = itemName;
        this.highestBid = 0;
        this.highestBidder = "";
    }

    public void addObserver(AuctionObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(AuctionObserver observer) {
        observers.remove(observer);
    }

    private void notifyObservers() {
        for (AuctionObserver observer : observers) {
            observer.onNewBid(this);
        }
    }

    public void placeBid(String bidderName, double amount) {
        if (amount > highestBid) {
            highestBid = amount;
            highestBidder = bidderName;
            notifyObservers();
        }
    }

    public String getItemName() { return itemName; }
    public double getHighestBid() { return highestBid; }
    public String getHighestBidder() { return highestBidder; }
}

class BidDisplay implements AuctionObserver {
    @Override
    public void onNewBid(Auction auction) {
        System.out.println("Bid Update -> [" + auction.getItemName() + "] Current bid: $" + String.format("%.2f", auction.getHighestBid()) + " by " + auction.getHighestBidder());
    }
}

class AutoBidder implements AuctionObserver {
    private String name;
    private double maxBid;

    public AutoBidder(String name, double maxBid) {
        this.name = name;
        this.maxBid = maxBid;
    }

    @Override
    public void onNewBid(Auction auction) {
        if (auction.getHighestBidder().equals(name)) return;
        double newBid = auction.getHighestBid() + 10;
        if (newBid <= maxBid) {
            System.out.println(name + " bids $" + String.format("%.2f", newBid) + " on " + auction.getItemName());
            auction.placeBid(name, newBid);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Auction auction = new Auction("Vintage Watch");
        BidDisplay display = new BidDisplay();
        AutoBidder bot = new AutoBidder("AutoBot", 150.0);
        auction.addObserver(display);
        auction.addObserver(bot);
        auction.placeBid("Alice", 50.0);
        auction.placeBid("Bob", 120.0);
        auction.placeBid("Alice", 200.0);
    }
}
```

```python
from abc import ABC, abstractmethod

class AuctionObserver(ABC):
    @abstractmethod
    def on_new_bid(self, auction):
        pass

class Auction:
    def __init__(self, item_name):
        self.item_name = item_name
        self.highest_bid = 0.0
        self.highest_bidder = ""
        self._observers = []

    def add_observer(self, observer):
        self._observers.append(observer)

    def remove_observer(self, observer):
        self._observers.remove(observer)

    def _notify_observers(self):
        for observer in self._observers:
            observer.on_new_bid(self)

    def place_bid(self, bidder_name, amount):
        if amount > self.highest_bid:
            self.highest_bid = amount
            self.highest_bidder = bidder_name
            self._notify_observers()

class BidDisplay(AuctionObserver):
    def on_new_bid(self, auction):
        print(f"Bid Update -> [{auction.item_name}] Current bid: ${auction.highest_bid:.2f} by {auction.highest_bidder}")

class AutoBidder(AuctionObserver):
    def __init__(self, name, max_bid):
        self.name = name
        self.max_bid = max_bid

    def on_new_bid(self, auction):
        if auction.highest_bidder == self.name:
            return
        new_bid = auction.highest_bid + 10
        if new_bid <= self.max_bid:
            print(f"{self.name} bids ${new_bid:.2f} on {auction.item_name}")
            auction.place_bid(self.name, new_bid)

if __name__ == "__main__":
    auction = Auction("Vintage Watch")
    display = BidDisplay()
    bot = AutoBidder("AutoBot", 150.0)
    auction.add_observer(display)
    auction.add_observer(bot)
    auction.place_bid("Alice", 50.0)
    auction.place_bid("Bob", 120.0)
    auction.place_bid("Alice", 200.0)
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <iomanip>
using namespace std;

class Auction; // Forward declaration

class AuctionObserver {
public:
    virtual ~AuctionObserver() {}
    virtual void onNewBid(Auction* auction) = 0;
};

class Auction {
    string itemName;
    double highestBid;
    string highestBidder;
    vector<AuctionObserver*> observers;

public:
    Auction(const string& itemName) : itemName(itemName), highestBid(0), highestBidder("") {}

    void addObserver(AuctionObserver* observer) {
        observers.push_back(observer);
    }

    void removeObserver(AuctionObserver* observer) {
        observers.erase(remove(observers.begin(), observers.end(), observer), observers.end());
    }

    void placeBid(const string& bidderName, double amount) {
        if (amount > highestBid) {
            highestBid = amount;
            highestBidder = bidderName;
            notifyObservers();
        }
    }

    const string& getItemName() const { return itemName; }
    double getHighestBid() const { return highestBid; }
    const string& getHighestBidder() const { return highestBidder; }

private:
    void notifyObservers() {
        for (auto* observer : observers) {
            observer->onNewBid(this);
        }
    }
};

class BidDisplay : public AuctionObserver {
public:
    void onNewBid(Auction* auction) override {
        cout << "Bid Update -> [" << auction->getItemName() << "] Current bid: $"
             << fixed << setprecision(2) << auction->getHighestBid()
             << " by " << auction->getHighestBidder() << endl;
    }
};

class AutoBidder : public AuctionObserver {
    string name;
    double maxBid;

public:
    AutoBidder(const string& name, double maxBid) : name(name), maxBid(maxBid) {}

    void onNewBid(Auction* auction) override {
        if (auction->getHighestBidder() == name) return;
        double newBid = auction->getHighestBid() + 10;
        if (newBid <= maxBid) {
            cout << name << " bids $" << fixed << setprecision(2) << newBid
                 << " on " << auction->getItemName() << endl;
            auction->placeBid(name, newBid);
        }
    }
};

int main() {
    Auction auction("Vintage Watch");
    BidDisplay display;
    AutoBidder bot("AutoBot", 150.0);
    auction.addObserver(&display);
    auction.addObserver(&bot);
    auction.placeBid("Alice", 50.0);
    auction.placeBid("Bob", 120.0);
    auction.placeBid("Alice", 200.0);
    return 0;
}
```

```go
package main

import (
	"fmt"
)

type AuctionObserver interface {
	OnNewBid(auction *Auction)
}

type Auction struct {
	itemName      string
	highestBid    float64
	highestBidder string
	observers     []AuctionObserver
}

func NewAuction(itemName string) *Auction {
	return &Auction{
		itemName:      itemName,
		highestBid:    0,
		highestBidder: "",
		observers:     make([]AuctionObserver, 0),
	}
}

func (a *Auction) AddObserver(observer AuctionObserver) {
	a.observers = append(a.observers, observer)
}

func (a *Auction) RemoveObserver(observer AuctionObserver) {
	for i, obs := range a.observers {
		if obs == observer {
			a.observers = append(a.observers[:i], a.observers[i+1:]...)
			return
		}
	}
}

func (a *Auction) notifyObservers() {
	for _, observer := range a.observers {
		observer.OnNewBid(a)
	}
}

func (a *Auction) PlaceBid(bidderName string, amount float64) {
	if amount > a.highestBid {
		a.highestBid = amount
		a.highestBidder = bidderName
		a.notifyObservers()
	}
}

func (a *Auction) GetItemName() string {
	return a.itemName
}

func (a *Auction) GetHighestBid() float64 {
	return a.highestBid
}

func (a *Auction) GetHighestBidder() string {
	return a.highestBidder
}

type BidDisplay struct{}

func (b *BidDisplay) OnNewBid(auction *Auction) {
	fmt.Printf("Bid Update -> [%s] Current bid: $%.2f by %s\n",
		auction.GetItemName(),
		auction.GetHighestBid(),
		auction.GetHighestBidder())
}

type AutoBidder struct {
	name   string
	maxBid float64
}

func NewAutoBidder(name string, maxBid float64) *AutoBidder {
	return &AutoBidder{name: name, maxBid: maxBid}
}

func (a *AutoBidder) OnNewBid(auction *Auction) {
	if auction.GetHighestBidder() == a.name {
		return
	}
	newBid := auction.GetHighestBid() + 10
	if newBid <= a.maxBid {
		fmt.Printf("%s bids $%.2f on %s\n", a.name, newBid, auction.GetItemName())
		auction.PlaceBid(a.name, newBid)
	}
}

func main() {
	auction := NewAuction("Vintage Watch")
	display := &BidDisplay{}
	bot := NewAutoBidder("AutoBot", 150.0)

	auction.AddObserver(display)
	auction.AddObserver(bot)

	auction.PlaceBid("Alice", 50.0)
	auction.PlaceBid("Bob", 120.0)
	auction.PlaceBid("Alice", 200.0)
}
```

```csharp
using System;
using System.Collections.Generic;

interface IAuctionObserver
{
    void OnNewBid(Auction auction);
}

class Auction
{
    private string itemName;
    private double highestBid;
    private string highestBidder;
    private List<IAuctionObserver> observers = new List<IAuctionObserver>();

    public Auction(string itemName)
    {
        this.itemName = itemName;
        this.highestBid = 0;
        this.highestBidder = "";
    }

    public void AddObserver(IAuctionObserver observer)
    {
        observers.Add(observer);
    }

    public void RemoveObserver(IAuctionObserver observer)
    {
        observers.Remove(observer);
    }

    private void NotifyObservers()
    {
        foreach (var observer in observers)
            observer.OnNewBid(this);
    }

    public void PlaceBid(string bidderName, double amount)
    {
        if (amount > highestBid)
        {
            highestBid = amount;
            highestBidder = bidderName;
            NotifyObservers();
        }
    }

    public string GetItemName() { return itemName; }
    public double GetHighestBid() { return highestBid; }
    public string GetHighestBidder() { return highestBidder; }
}

class BidDisplay : IAuctionObserver
{
    public void OnNewBid(Auction auction)
    {
        Console.WriteLine($"Bid Update -> [{auction.GetItemName()}] Current bid: ${auction.GetHighestBid():F2} by {auction.GetHighestBidder()}");
    }
}

class AutoBidder : IAuctionObserver
{
    private string name;
    private double maxBid;

    public AutoBidder(string name, double maxBid)
    {
        this.name = name;
        this.maxBid = maxBid;
    }

    public void OnNewBid(Auction auction)
    {
        if (auction.GetHighestBidder() == name) return;
        double newBid = auction.GetHighestBid() + 10;
        if (newBid <= maxBid)
        {
            Console.WriteLine($"{name} bids ${newBid:F2} on {auction.GetItemName()}");
            auction.PlaceBid(name, newBid);
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        Auction auction = new Auction("Vintage Watch");
        BidDisplay display = new BidDisplay();
        AutoBidder bot = new AutoBidder("AutoBot", 150.0);
        auction.AddObserver(display);
        auction.AddObserver(bot);
        auction.PlaceBid("Alice", 50.0);
        auction.PlaceBid("Bob", 120.0);
        auction.PlaceBid("Alice", 200.0);
    }
}
```

```typescript
interface AuctionObserver {
    onNewBid(auction: Auction): void;
}

class Auction {
    private itemName: string;
    private highestBid: number = 0;
    private highestBidder: string = "";
    private observers: AuctionObserver[] = [];

    constructor(itemName: string) {
        this.itemName = itemName;
    }

    addObserver(observer: AuctionObserver): void {
        this.observers.push(observer);
    }

    removeObserver(observer: AuctionObserver): void {
        this.observers = this.observers.filter(o => o !== observer);
    }

    private notifyObservers(): void {
        for (const observer of this.observers) {
            observer.onNewBid(this);
        }
    }

    placeBid(bidderName: string, amount: number): void {
        if (amount > this.highestBid) {
            this.highestBid = amount;
            this.highestBidder = bidderName;
            this.notifyObservers();
        }
    }

    getItemName(): string { return this.itemName; }
    getHighestBid(): number { return this.highestBid; }
    getHighestBidder(): string { return this.highestBidder; }
}

class BidDisplay implements AuctionObserver {
    onNewBid(auction: Auction): void {
        console.log(`Bid Update -> [${auction.getItemName()}] Current bid: $${auction.getHighestBid().toFixed(2)} by ${auction.getHighestBidder()}`);
    }
}

class AutoBidder implements AuctionObserver {
    private name: string;
    private maxBid: number;

    constructor(name: string, maxBid: number) {
        this.name = name;
        this.maxBid = maxBid;
    }

    onNewBid(auction: Auction): void {
        if (auction.getHighestBidder() === this.name) return;
        const newBid = auction.getHighestBid() + 10;
        if (newBid <= this.maxBid) {
            console.log(`${this.name} bids $${newBid.toFixed(2)} on ${auction.getItemName()}`);
            auction.placeBid(this.name, newBid);
        }
    }
}

const auction = new Auction("Vintage Watch");
const display = new BidDisplay();
const bot = new AutoBidder("AutoBot", 150.0);
auction.addObserver(display);
auction.addObserver(bot);
auction.placeBid("Alice", 50.0);
auction.placeBid("Bob", 120.0);
auction.placeBid("Alice", 200.0);
```

---

# Exercise 3: File Watcher

<!-- payload:lldCodingPracticeBlock:START {"id":"699166117afcb26b29925c18","title":"Design File Watcher","difficulty":"hard","expectedOutput":"BackupService -> Backing up CREATED file: report.pdf\nAuditLogger -> [CREATED] report.pdf\nBackupService -> Backing up MODIFIED file: report.pdf\nAuditLogger -> [MODIFIED] report.pdf\nAuditLogger -> [DELETED] old-data.csv\nCleanupService -> Cleaning up after deleted file: old-data.csv\nBackupService -> Backing up CREATED file: summary.docx\nAuditLogger -> [CREATED] summary.docx"} -->
Build a file watcher system that emits typed events (CREATED, MODIFIED, DELETED) and lets observers selectively handle only the event types they care about. Each observer receives all events but filters internally based on what it is interested in.

**Requirements:**

- `FileEvent` with type (CREATED/MODIFIED/DELETED), filename, and timestamp
- `FileWatcher` subject that emits `FileEvent` objects
- `FileEventListener` interface with `onFileEvent(event)`
- `BackupService` observer handles only CREATED and MODIFIED events (ignores DELETED)
- `AuditLogger` observer logs all events
- `CleanupService` observer handles only DELETED events

```java
import java.util.*;

enum FileEventType { CREATED, MODIFIED, DELETED }

class FileEvent {
    private final FileEventType type;
    private final String filename;
    private final long timestamp;

    public FileEvent(FileEventType type, String filename) {
        this.type = type;
        this.filename = filename;
        this.timestamp = System.currentTimeMillis();
    }

    public FileEventType getType() { return type; }
    public String getFilename() { return filename; }
    public long getTimestamp() { return timestamp; }
}

interface FileEventListener {
    void onFileEvent(FileEvent event);
}

class FileWatcher {
    private List<FileEventListener> listeners = new ArrayList<>();

    public void addListener(FileEventListener listener) {
        // TODO: Add listener to the list
    }

    public void removeListener(FileEventListener listener) {
        // TODO: Remove listener from the list
    }

    public void simulateEvent(FileEventType type, String filename) {
        // TODO: Create a FileEvent and notify all listeners
    }
}

class BackupService implements FileEventListener {
    @Override
    public void onFileEvent(FileEvent event) {
        // TODO: If event type is CREATED or MODIFIED, print "BackupService -> Backing up TYPE file: filename"
    }
}

class AuditLogger implements FileEventListener {
    @Override
    public void onFileEvent(FileEvent event) {
        // TODO: Print "AuditLogger -> [TYPE] filename"
    }
}

class CleanupService implements FileEventListener {
    @Override
    public void onFileEvent(FileEvent event) {
        // TODO: If event type is DELETED, print "CleanupService -> Cleaning up after deleted file: filename"
    }
}

public class Main {
    public static void main(String[] args) {
        // FileWatcher watcher = new FileWatcher();
        // watcher.addListener(new BackupService());
        // watcher.addListener(new AuditLogger());
        // watcher.addListener(new CleanupService());
        //
        // watcher.simulateEvent(FileEventType.CREATED, "report.pdf");
        // watcher.simulateEvent(FileEventType.MODIFIED, "report.pdf");
        // watcher.simulateEvent(FileEventType.DELETED, "old-data.csv");
        // watcher.simulateEvent(FileEventType.CREATED, "summary.docx");
    }
}
```

```python
from abc import ABC, abstractmethod
from enum import Enum
import time

class FileEventType(Enum):
    CREATED = "CREATED"
    MODIFIED = "MODIFIED"
    DELETED = "DELETED"

class FileEvent:
    def __init__(self, event_type, filename):
        self.type = event_type
        self.filename = filename
        self.timestamp = time.time()

class FileEventListener(ABC):
    @abstractmethod
    def on_file_event(self, event):
        pass

class FileWatcher:
    def __init__(self):
        self._listeners = []

    def add_listener(self, listener):
        # TODO: Add listener to the list
        pass

    def remove_listener(self, listener):
        # TODO: Remove listener from the list
        pass

    def simulate_event(self, event_type, filename):
        # TODO: Create a FileEvent and notify all listeners
        pass

class BackupService(FileEventListener):
    def on_file_event(self, event):
        # TODO: If event type is CREATED or MODIFIED, print "BackupService -> Backing up TYPE file: filename"
        pass

class AuditLogger(FileEventListener):
    def on_file_event(self, event):
        # TODO: Print "AuditLogger -> [TYPE] filename"
        pass

class CleanupService(FileEventListener):
    def on_file_event(self, event):
        # TODO: If event type is DELETED, print "CleanupService -> Cleaning up after deleted file: filename"
        pass

if __name__ == "__main__":
    # watcher = FileWatcher()
    # watcher.add_listener(BackupService())
    # watcher.add_listener(AuditLogger())
    # watcher.add_listener(CleanupService())
    #
    # watcher.simulate_event(FileEventType.CREATED, "report.pdf")
    # watcher.simulate_event(FileEventType.MODIFIED, "report.pdf")
    # watcher.simulate_event(FileEventType.DELETED, "old-data.csv")
    # watcher.simulate_event(FileEventType.CREATED, "summary.docx")
    pass
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <ctime>
using namespace std;

enum class FileEventType { CREATED, MODIFIED, DELETED };

struct FileEvent {
    FileEventType type;
    string filename;
    time_t timestamp;

    FileEvent(FileEventType type, const string& filename)
        : type(type), filename(filename), timestamp(time(nullptr)) {}
};

class FileEventListener {
public:
    virtual ~FileEventListener() {}
    virtual void onFileEvent(const FileEvent& event) = 0;
};

class FileWatcher {
    vector<FileEventListener*> listeners;

public:
    void addListener(FileEventListener* listener) {
        // TODO: Add listener to the list
    }

    void removeListener(FileEventListener* listener) {
        // TODO: Remove listener from the list
    }

    void simulateEvent(FileEventType type, const string& filename) {
        // TODO: Create a FileEvent and notify all listeners
    }
};

class BackupService : public FileEventListener {
public:
    void onFileEvent(const FileEvent& event) override {
        // TODO: If event type is CREATED or MODIFIED, print "BackupService -> Backing up TYPE file: filename"
    }
};

class AuditLogger : public FileEventListener {
public:
    void onFileEvent(const FileEvent& event) override {
        // TODO: Print "AuditLogger -> [TYPE] filename"
    }
};

class CleanupService : public FileEventListener {
public:
    void onFileEvent(const FileEvent& event) override {
        // TODO: If event type is DELETED, print "CleanupService -> Cleaning up after deleted file: filename"
    }
};

int main() {
    // FileWatcher watcher;
    // BackupService backup;
    // AuditLogger audit;
    // CleanupService cleanup;
    // watcher.addListener(&backup);
    // watcher.addListener(&audit);
    // watcher.addListener(&cleanup);
    //
    // watcher.simulateEvent(FileEventType::CREATED, "report.pdf");
    // watcher.simulateEvent(FileEventType::MODIFIED, "report.pdf");
    // watcher.simulateEvent(FileEventType::DELETED, "old-data.csv");
    // watcher.simulateEvent(FileEventType::CREATED, "summary.docx");
    return 0;
}
```

```go
package main

import (
	"time"
)

type FileEventType string

const (
	FileEventTypeCreated  FileEventType = "CREATED"
	FileEventTypeModified FileEventType = "MODIFIED"
	FileEventTypeDeleted  FileEventType = "DELETED"
)

type FileEvent struct {
	Type      FileEventType
	Filename  string
	Timestamp time.Time
}

func NewFileEvent(eventType FileEventType, filename string) FileEvent {
	return FileEvent{
		Type:      eventType,
		Filename:  filename,
		Timestamp: time.Now(),
	}
}

type FileEventListener interface {
	OnFileEvent(event FileEvent)
}

type FileWatcher struct {
	listeners []FileEventListener
}

func (fw *FileWatcher) AddListener(listener FileEventListener) {
	// TODO: Add listener to the list
}

func (fw *FileWatcher) RemoveListener(listener FileEventListener) {
	// TODO: Remove listener from the list
}

func (fw *FileWatcher) SimulateEvent(eventType FileEventType, filename string) {
	// TODO: Create a FileEvent and notify all listeners
}

type BackupService struct{}

func (b *BackupService) OnFileEvent(event FileEvent) {
	// TODO: If event type is CREATED or MODIFIED, print "BackupService -> Backing up TYPE file: filename"
}

type AuditLogger struct{}

func (a *AuditLogger) OnFileEvent(event FileEvent) {
	// TODO: Print "AuditLogger -> [TYPE] filename"
}

type CleanupService struct{}

func (c *CleanupService) OnFileEvent(event FileEvent) {
	// TODO: If event type is DELETED, print "CleanupService -> Cleaning up after deleted file: filename"
}

func main() {
	// watcher := FileWatcher{}
	// watcher.AddListener(&BackupService{})
	// watcher.AddListener(&AuditLogger{})
	// watcher.AddListener(&CleanupService{})
	//
	// watcher.SimulateEvent(FileEventTypeCreated, "report.pdf")
	// watcher.SimulateEvent(FileEventTypeModified, "report.pdf")
	// watcher.SimulateEvent(FileEventTypeDeleted, "old-data.csv")
	// watcher.SimulateEvent(FileEventTypeCreated, "summary.docx")
}
```

```csharp
using System;
using System.Collections.Generic;

enum FileEventType { Created, Modified, Deleted }

class FileEvent
{
    public FileEventType Type { get; }
    public string Filename { get; }
    public DateTime Timestamp { get; }

    public FileEvent(FileEventType type, string filename)
    {
        Type = type;
        Filename = filename;
        Timestamp = DateTime.Now;
    }
}

interface IFileEventListener
{
    void OnFileEvent(FileEvent fileEvent);
}

class FileWatcher
{
    private List<IFileEventListener> listeners = new List<IFileEventListener>();

    public void AddListener(IFileEventListener listener)
    {
        // TODO: Add listener to the list
    }

    public void RemoveListener(IFileEventListener listener)
    {
        // TODO: Remove listener from the list
    }

    public void SimulateEvent(FileEventType type, string filename)
    {
        // TODO: Create a FileEvent and notify all listeners
    }
}

class BackupService : IFileEventListener
{
    public void OnFileEvent(FileEvent fileEvent)
    {
        // TODO: If event type is Created or Modified, print "BackupService -> Backing up TYPE file: filename"
    }
}

class AuditLogger : IFileEventListener
{
    public void OnFileEvent(FileEvent fileEvent)
    {
        // TODO: Print "AuditLogger -> [TYPE] filename"
    }
}

class CleanupService : IFileEventListener
{
    public void OnFileEvent(FileEvent fileEvent)
    {
        // TODO: If event type is Deleted, print "CleanupService -> Cleaning up after deleted file: filename"
    }
}

class Program
{
    static void Main(string[] args)
    {
        // FileWatcher watcher = new FileWatcher();
        // watcher.AddListener(new BackupService());
        // watcher.AddListener(new AuditLogger());
        // watcher.AddListener(new CleanupService());
        //
        // watcher.SimulateEvent(FileEventType.Created, "report.pdf");
        // watcher.SimulateEvent(FileEventType.Modified, "report.pdf");
        // watcher.SimulateEvent(FileEventType.Deleted, "old-data.csv");
        // watcher.SimulateEvent(FileEventType.Created, "summary.docx");
    }
}
```

```typescript
const FileEventType = { CREATED: "CREATED", MODIFIED: "MODIFIED", DELETED: "DELETED" } as const;
type FileEventType = (typeof FileEventType)[keyof typeof FileEventType];

class FileEvent {
    readonly type: FileEventType;
    readonly filename: string;
    readonly timestamp: number;

    constructor(type: FileEventType, filename: string, timestamp: number = Date.now()) {
        this.type = type;
        this.filename = filename;
        this.timestamp = timestamp;
    }
}

interface FileEventListener {
    onFileEvent(event: FileEvent): void;
}

class FileWatcher {
    private listeners: FileEventListener[] = [];

    addListener(listener: FileEventListener): void {
        // TODO: Add listener to the list
    }

    removeListener(listener: FileEventListener): void {
        // TODO: Remove listener from the list
    }

    simulateEvent(type: FileEventType, filename: string): void {
        // TODO: Create a FileEvent and notify all listeners
    }
}

class BackupService implements FileEventListener {
    onFileEvent(event: FileEvent): void {
        // TODO: If event type is CREATED or MODIFIED, print "BackupService -> Backing up TYPE file: filename"
    }
}

class AuditLogger implements FileEventListener {
    onFileEvent(event: FileEvent): void {
        // TODO: Print "AuditLogger -> [TYPE] filename"
    }
}

class CleanupService implements FileEventListener {
    onFileEvent(event: FileEvent): void {
        // TODO: If event type is DELETED, print "CleanupService -> Cleaning up after deleted file: filename"
    }
}

// const watcher = new FileWatcher();
// watcher.addListener(new BackupService());
// watcher.addListener(new AuditLogger());
// watcher.addListener(new CleanupService());
//
// watcher.simulateEvent(FileEventType.CREATED, "report.pdf");
// watcher.simulateEvent(FileEventType.MODIFIED, "report.pdf");
// watcher.simulateEvent(FileEventType.DELETED, "old-data.csv");
// watcher.simulateEvent(FileEventType.CREATED, "summary.docx");
```

#### Solutions

```java
import java.util.*;

enum FileEventType { CREATED, MODIFIED, DELETED }

class FileEvent {
    private final FileEventType type;
    private final String filename;
    private final long timestamp;

    public FileEvent(FileEventType type, String filename) {
        this.type = type;
        this.filename = filename;
        this.timestamp = System.currentTimeMillis();
    }

    public FileEventType getType() { return type; }
    public String getFilename() { return filename; }
    public long getTimestamp() { return timestamp; }
}

interface FileEventListener {
    void onFileEvent(FileEvent event);
}

class FileWatcher {
    private List<FileEventListener> listeners = new ArrayList<>();

    public void addListener(FileEventListener listener) {
        listeners.add(listener);
    }

    public void removeListener(FileEventListener listener) {
        listeners.remove(listener);
    }

    public void simulateEvent(FileEventType type, String filename) {
        FileEvent event = new FileEvent(type, filename);
        for (FileEventListener listener : listeners) {
            listener.onFileEvent(event);
        }
    }
}

class BackupService implements FileEventListener {
    @Override
    public void onFileEvent(FileEvent event) {
        if (event.getType() == FileEventType.CREATED || event.getType() == FileEventType.MODIFIED) {
            System.out.println("BackupService -> Backing up " + event.getType() + " file: " + event.getFilename());
        }
    }
}

class AuditLogger implements FileEventListener {
    @Override
    public void onFileEvent(FileEvent event) {
        System.out.println("AuditLogger -> [" + event.getType() + "] " + event.getFilename());
    }
}

class CleanupService implements FileEventListener {
    @Override
    public void onFileEvent(FileEvent event) {
        if (event.getType() == FileEventType.DELETED) {
            System.out.println("CleanupService -> Cleaning up after deleted file: " + event.getFilename());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        FileWatcher watcher = new FileWatcher();
        watcher.addListener(new BackupService());
        watcher.addListener(new AuditLogger());
        watcher.addListener(new CleanupService());

        watcher.simulateEvent(FileEventType.CREATED, "report.pdf");
        watcher.simulateEvent(FileEventType.MODIFIED, "report.pdf");
        watcher.simulateEvent(FileEventType.DELETED, "old-data.csv");
        watcher.simulateEvent(FileEventType.CREATED, "summary.docx");
    }
}
```

```python
from abc import ABC, abstractmethod
from enum import Enum
import time

class FileEventType(Enum):
    CREATED = "CREATED"
    MODIFIED = "MODIFIED"
    DELETED = "DELETED"

class FileEvent:
    def __init__(self, event_type, filename):
        self.type = event_type
        self.filename = filename
        self.timestamp = time.time()

class FileEventListener(ABC):
    @abstractmethod
    def on_file_event(self, event):
        pass

class FileWatcher:
    def __init__(self):
        self._listeners = []

    def add_listener(self, listener):
        self._listeners.append(listener)

    def remove_listener(self, listener):
        self._listeners.remove(listener)

    def simulate_event(self, event_type, filename):
        event = FileEvent(event_type, filename)
        for listener in self._listeners:
            listener.on_file_event(event)

class BackupService(FileEventListener):
    def on_file_event(self, event):
        if event.type in (FileEventType.CREATED, FileEventType.MODIFIED):
            print(f"BackupService -> Backing up {event.type.value} file: {event.filename}")

class AuditLogger(FileEventListener):
    def on_file_event(self, event):
        print(f"AuditLogger -> [{event.type.value}] {event.filename}")

class CleanupService(FileEventListener):
    def on_file_event(self, event):
        if event.type == FileEventType.DELETED:
            print(f"CleanupService -> Cleaning up after deleted file: {event.filename}")

if __name__ == "__main__":
    watcher = FileWatcher()
    watcher.add_listener(BackupService())
    watcher.add_listener(AuditLogger())
    watcher.add_listener(CleanupService())

    watcher.simulate_event(FileEventType.CREATED, "report.pdf")
    watcher.simulate_event(FileEventType.MODIFIED, "report.pdf")
    watcher.simulate_event(FileEventType.DELETED, "old-data.csv")
    watcher.simulate_event(FileEventType.CREATED, "summary.docx")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <ctime>
using namespace std;

enum class FileEventType { CREATED, MODIFIED, DELETED };

string eventTypeToString(FileEventType type) {
    switch (type) {
        case FileEventType::CREATED: return "CREATED";
        case FileEventType::MODIFIED: return "MODIFIED";
        case FileEventType::DELETED: return "DELETED";
    }
    return "";
}

struct FileEvent {
    FileEventType type;
    string filename;
    time_t timestamp;

    FileEvent(FileEventType type, const string& filename)
        : type(type), filename(filename), timestamp(time(nullptr)) {}
};

class FileEventListener {
public:
    virtual ~FileEventListener() {}
    virtual void onFileEvent(const FileEvent& event) = 0;
};

class FileWatcher {
    vector<FileEventListener*> listeners;

public:
    void addListener(FileEventListener* listener) {
        listeners.push_back(listener);
    }

    void removeListener(FileEventListener* listener) {
        listeners.erase(remove(listeners.begin(), listeners.end(), listener), listeners.end());
    }

    void simulateEvent(FileEventType type, const string& filename) {
        FileEvent event(type, filename);
        for (auto* listener : listeners) {
            listener->onFileEvent(event);
        }
    }
};

class BackupService : public FileEventListener {
public:
    void onFileEvent(const FileEvent& event) override {
        if (event.type == FileEventType::CREATED || event.type == FileEventType::MODIFIED) {
            cout << "BackupService -> Backing up " << eventTypeToString(event.type) << " file: " << event.filename << endl;
        }
    }
};

class AuditLogger : public FileEventListener {
public:
    void onFileEvent(const FileEvent& event) override {
        cout << "AuditLogger -> [" << eventTypeToString(event.type) << "] " << event.filename << endl;
    }
};

class CleanupService : public FileEventListener {
public:
    void onFileEvent(const FileEvent& event) override {
        if (event.type == FileEventType::DELETED) {
            cout << "CleanupService -> Cleaning up after deleted file: " << event.filename << endl;
        }
    }
};

int main() {
    FileWatcher watcher;
    BackupService backup;
    AuditLogger audit;
    CleanupService cleanup;
    watcher.addListener(&backup);
    watcher.addListener(&audit);
    watcher.addListener(&cleanup);

    watcher.simulateEvent(FileEventType::CREATED, "report.pdf");
    watcher.simulateEvent(FileEventType::MODIFIED, "report.pdf");
    watcher.simulateEvent(FileEventType::DELETED, "old-data.csv");
    watcher.simulateEvent(FileEventType::CREATED, "summary.docx");
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
	"time"
)

type FileEventType int

const (
	CREATED FileEventType = iota
	MODIFIED
	DELETED
)

func (t FileEventType) String() string {
	switch t {
	case CREATED:
		return "CREATED"
	case MODIFIED:
		return "MODIFIED"
	case DELETED:
		return "DELETED"
	default:
		return ""
	}
}

type FileEvent struct {
	Type      FileEventType
	Filename  string
	Timestamp time.Time
}

func NewFileEvent(eventType FileEventType, filename string) FileEvent {
	return FileEvent{
		Type:      eventType,
		Filename:  filename,
		Timestamp: time.Now(),
	}
}

type FileEventListener interface {
	OnFileEvent(event FileEvent)
}

type FileWatcher struct {
	listeners []FileEventListener
}

func NewFileWatcher() *FileWatcher {
	return &FileWatcher{
		listeners: make([]FileEventListener, 0),
	}
}

func (fw *FileWatcher) AddListener(listener FileEventListener) {
	fw.listeners = append(fw.listeners, listener)
}

func (fw *FileWatcher) RemoveListener(listener FileEventListener) {
	for i, l := range fw.listeners {
		if fmt.Sprintf("%T", l) == fmt.Sprintf("%T", listener) && strings.EqualFold(fmt.Sprintf("%v", l), fmt.Sprintf("%v", listener)) {
			fw.listeners = append(fw.listeners[:i], fw.listeners[i+1:]...)
			return
		}
	}
}

func (fw *FileWatcher) SimulateEvent(eventType FileEventType, filename string) {
	event := NewFileEvent(eventType, filename)
	for _, listener := range fw.listeners {
		listener.OnFileEvent(event)
	}
}

type BackupService struct{}

func (b *BackupService) OnFileEvent(event FileEvent) {
	if event.Type == CREATED || event.Type == MODIFIED {
		fmt.Printf("BackupService -> Backing up %s file: %s\n", event.Type.String(), event.Filename)
	}
}

type AuditLogger struct{}

func (a *AuditLogger) OnFileEvent(event FileEvent) {
	fmt.Printf("AuditLogger -> [%s] %s\n", event.Type.String(), event.Filename)
}

type CleanupService struct{}

func (c *CleanupService) OnFileEvent(event FileEvent) {
	if event.Type == DELETED {
		fmt.Printf("CleanupService -> Cleaning up after deleted file: %s\n", event.Filename)
	}
}

func main() {
	watcher := NewFileWatcher()
	watcher.AddListener(&BackupService{})
	watcher.AddListener(&AuditLogger{})
	watcher.AddListener(&CleanupService{})

	watcher.SimulateEvent(CREATED, "report.pdf")
	watcher.SimulateEvent(MODIFIED, "report.pdf")
	watcher.SimulateEvent(DELETED, "old-data.csv")
	watcher.SimulateEvent(CREATED, "summary.docx")
}
```

```csharp
using System;
using System.Collections.Generic;

enum FileEventType { Created, Modified, Deleted }

class FileEvent
{
    public FileEventType Type { get; }
    public string Filename { get; }
    public DateTime Timestamp { get; }

    public FileEvent(FileEventType type, string filename)
    {
        Type = type;
        Filename = filename;
        Timestamp = DateTime.Now;
    }
}

interface IFileEventListener
{
    void OnFileEvent(FileEvent fileEvent);
}

class FileWatcher
{
    private List<IFileEventListener> listeners = new List<IFileEventListener>();

    public void AddListener(IFileEventListener listener)
    {
        listeners.Add(listener);
    }

    public void RemoveListener(IFileEventListener listener)
    {
        listeners.Remove(listener);
    }

    public void SimulateEvent(FileEventType type, string filename)
    {
        FileEvent fileEvent = new FileEvent(type, filename);
        foreach (var listener in listeners)
        {
            listener.OnFileEvent(fileEvent);
        }
    }
}

class BackupService : IFileEventListener
{
    public void OnFileEvent(FileEvent fileEvent)
    {
        if (fileEvent.Type == FileEventType.Created || fileEvent.Type == FileEventType.Modified)
        {
            Console.WriteLine($"BackupService -> Backing up {fileEvent.Type.ToString().ToUpper()} file: {fileEvent.Filename}");
        }
    }
}

class AuditLogger : IFileEventListener
{
    public void OnFileEvent(FileEvent fileEvent)
    {
        Console.WriteLine($"AuditLogger -> [{fileEvent.Type.ToString().ToUpper()}] {fileEvent.Filename}");
    }
}

class CleanupService : IFileEventListener
{
    public void OnFileEvent(FileEvent fileEvent)
    {
        if (fileEvent.Type == FileEventType.Deleted)
        {
            Console.WriteLine($"CleanupService -> Cleaning up after deleted file: {fileEvent.Filename}");
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        FileWatcher watcher = new FileWatcher();
        watcher.AddListener(new BackupService());
        watcher.AddListener(new AuditLogger());
        watcher.AddListener(new CleanupService());

        watcher.SimulateEvent(FileEventType.Created, "report.pdf");
        watcher.SimulateEvent(FileEventType.Modified, "report.pdf");
        watcher.SimulateEvent(FileEventType.Deleted, "old-data.csv");
        watcher.SimulateEvent(FileEventType.Created, "summary.docx");
    }
}
```

```typescript
const FileEventType = { CREATED: "CREATED", MODIFIED: "MODIFIED", DELETED: "DELETED" } as const;
type FileEventType = (typeof FileEventType)[keyof typeof FileEventType];

class FileEvent {
    readonly type: FileEventType;
    readonly filename: string;
    readonly timestamp: number;

    constructor(type: FileEventType, filename: string, timestamp: number = Date.now()) {
        this.type = type;
        this.filename = filename;
        this.timestamp = timestamp;
    }
}

interface FileEventListener {
    onFileEvent(event: FileEvent): void;
}

class FileWatcher {
    private listeners: FileEventListener[] = [];

    addListener(listener: FileEventListener): void {
        this.listeners.push(listener);
    }

    removeListener(listener: FileEventListener): void {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

    simulateEvent(type: FileEventType, filename: string): void {
        const event = new FileEvent(type, filename);
        for (const listener of this.listeners) {
            listener.onFileEvent(event);
        }
    }
}

class BackupService implements FileEventListener {
    onFileEvent(event: FileEvent): void {
        if (event.type === FileEventType.CREATED || event.type === FileEventType.MODIFIED) {
            console.log(`BackupService -> Backing up ${event.type} file: ${event.filename}`);
        }
    }
}

class AuditLogger implements FileEventListener {
    onFileEvent(event: FileEvent): void {
        console.log(`AuditLogger -> [${event.type}] ${event.filename}`);
    }
}

class CleanupService implements FileEventListener {
    onFileEvent(event: FileEvent): void {
        if (event.type === FileEventType.DELETED) {
            console.log(`CleanupService -> Cleaning up after deleted file: ${event.filename}`);
        }
    }
}

const watcher = new FileWatcher();
watcher.addListener(new BackupService());
watcher.addListener(new AuditLogger());
watcher.addListener(new CleanupService());

watcher.simulateEvent(FileEventType.CREATED, "report.pdf");
watcher.simulateEvent(FileEventType.MODIFIED, "report.pdf");
watcher.simulateEvent(FileEventType.DELETED, "old-data.csv");
watcher.simulateEvent(FileEventType.CREATED, "summary.docx");
```


