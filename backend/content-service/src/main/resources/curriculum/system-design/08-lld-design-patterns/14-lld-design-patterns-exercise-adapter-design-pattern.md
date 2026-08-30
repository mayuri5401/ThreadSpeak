---
id: "lld-design-patterns-exercise-adapter-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Adapter Design Pattern"
slug: "lld-design-patterns-exercise-adapter-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Adapter Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Adapter Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Temperature Converter Adapter

**Problem:** You have a `Thermometer` interface that returns temperature in Celsius. A third-party weather sensor library provides readings in Fahrenheit through a different interface. Write an adapter so your application can use the Fahrenheit sensor as if it were a Celsius thermometer.

**Requirements:**

- Target interface: `Thermometer` with `getTemperature()` returning Celsius (double)
- Adaptee: `FahrenheitSensor` with `readFahrenheit()` returning Fahrenheit (double)
- Adapter: converts Fahrenheit to Celsius using `(F - 32) * 5/9`

```java
interface Thermometer {
    double getTemperature();  // Returns Celsius
}

class CelsiusSensor implements Thermometer {
    @Override
    public double getTemperature() {
        return 25.0;  // Simulated reading
    }
}

class FahrenheitSensor {
    public double readFahrenheit() {
        return 98.6;  // Simulated reading
    }
}

class FahrenheitSensorAdapter implements Thermometer {
    // TODO: Declare a private FahrenheitSensor field

    public FahrenheitSensorAdapter(FahrenheitSensor sensor) {
        // TODO: Store the sensor reference
    }

    @Override
    public double getTemperature() {
        // TODO: Read the Fahrenheit value from the sensor
        // TODO: Convert Fahrenheit to Celsius using (F - 32) * 5.0 / 9.0
        return 0; // TODO: Return the converted Celsius value
    }
}

public class Main {
    public static void main(String[] args) {
        Thermometer celsius = new CelsiusSensor();
        System.out.printf("Celsius sensor: %.1f C%n", celsius.getTemperature());

        // TODO: Uncomment the lines below after implementing the adapter
        // FahrenheitSensor sensor = new FahrenheitSensor();
        // Thermometer adapted = new FahrenheitSensorAdapter(sensor);
        // System.out.printf("Fahrenheit sensor (adapted): %.1f C%n", adapted.getTemperature());
    }
}
```

```python
from abc import ABC, abstractmethod

class Thermometer(ABC):
    @abstractmethod
    def get_temperature(self) -> float:
        """Returns temperature in Celsius."""
        pass

class CelsiusSensor(Thermometer):
    def get_temperature(self) -> float:
        return 25.0

class FahrenheitSensor:
    def read_fahrenheit(self) -> float:
        return 98.6

class FahrenheitSensorAdapter(Thermometer):
    def __init__(self, sensor: FahrenheitSensor):
        # TODO: Store the sensor reference
        pass

    def get_temperature(self) -> float:
        # TODO: Read the Fahrenheit value from the sensor
        # TODO: Convert Fahrenheit to Celsius using (F - 32) * 5.0 / 9.0
        return 0  # TODO: Return the converted Celsius value

if __name__ == "__main__":
    celsius = CelsiusSensor()
    print(f"Celsius sensor: {celsius.get_temperature():.1f} C")

    # TODO: Uncomment the lines below after implementing the adapter
    # sensor = FahrenheitSensor()
    # adapted = FahrenheitSensorAdapter(sensor)
    # print(f"Fahrenheit sensor (adapted): {adapted.get_temperature():.1f} C")
```

```cpp
#include <iostream>
#include <cstdio>
using namespace std;

class Thermometer {
public:
    virtual double getTemperature() = 0;  // Returns Celsius
    virtual ~Thermometer() {}
};

class CelsiusSensor : public Thermometer {
public:
    double getTemperature() override { return 25.0; }
};

class FahrenheitSensor {
public:
    double readFahrenheit() { return 98.6; }
};

class FahrenheitSensorAdapter : public Thermometer {
    // TODO: Declare a FahrenheitSensor* field

public:
    FahrenheitSensorAdapter(FahrenheitSensor* sensor) {
        // TODO: Store the sensor pointer
    }

    double getTemperature() override {
        // TODO: Read the Fahrenheit value from the sensor
        // TODO: Convert Fahrenheit to Celsius using (F - 32) * 5.0 / 9.0
        return 0; // TODO: Return the converted Celsius value
    }
};

int main() {
    CelsiusSensor celsius;
    printf("Celsius sensor: %.1f C\n", celsius.getTemperature());

    // TODO: Uncomment the lines below after implementing the adapter
    // FahrenheitSensor sensor;
    // FahrenheitSensorAdapter adapted(&sensor);
    // printf("Fahrenheit sensor (adapted): %.1f C\n", adapted.getTemperature());
    return 0;
}
```

```go
package main

import "fmt"

type Thermometer interface {
	GetTemperature() float64 // Returns Celsius
}

type CelsiusSensor struct{}

func (c *CelsiusSensor) GetTemperature() float64 {
	return 25.0
}

type FahrenheitSensor struct{}

func (f *FahrenheitSensor) ReadFahrenheit() float64 {
	return 98.6
}

type FahrenheitSensorAdapter struct {
	// TODO: Declare a private FahrenheitSensor field
}

func NewFahrenheitSensorAdapter(sensor *FahrenheitSensor) *FahrenheitSensorAdapter {
	// TODO: Store the sensor reference
	return &FahrenheitSensorAdapter{}
}

func (f *FahrenheitSensorAdapter) GetTemperature() float64 {
	// TODO: Read the Fahrenheit value from the sensor
	// TODO: Convert Fahrenheit to Celsius using (F - 32) * 5.0 / 9.0
	return 0 // TODO: Return the converted Celsius value
}

func main() {
	var celsius Thermometer = &CelsiusSensor{}
	fmt.Printf("Celsius sensor: %.1f C\n", celsius.GetTemperature())

	// TODO: Uncomment the lines below after implementing the adapter
	// sensor := &FahrenheitSensor{}
	// adapted := NewFahrenheitSensorAdapter(sensor)
	// fmt.Printf("Fahrenheit sensor (adapted): %.1f C\n", adapted.GetTemperature())
}
```

```csharp
using System;

interface IThermometer
{
    double GetTemperature();  // Returns Celsius
}

class CelsiusSensor : IThermometer
{
    public double GetTemperature() => 25.0;
}

class FahrenheitSensor
{
    public double ReadFahrenheit() => 98.6;
}

class FahrenheitSensorAdapter : IThermometer
{
    // TODO: Declare a private FahrenheitSensor field

    public FahrenheitSensorAdapter(FahrenheitSensor sensor)
    {
        // TODO: Store the sensor reference
    }

    public double GetTemperature()
    {
        // TODO: Read the Fahrenheit value from the sensor
        // TODO: Convert Fahrenheit to Celsius using (F - 32) * 5.0 / 9.0
        return 0; // TODO: Return the converted Celsius value
    }
}

public class Program
{
    public static void Main()
    {
        IThermometer celsius = new CelsiusSensor();
        Console.WriteLine($"Celsius sensor: {celsius.GetTemperature():F1} C");

        // TODO: Uncomment the lines below after implementing the adapter
        // var sensor = new FahrenheitSensor();
        // IThermometer adapted = new FahrenheitSensorAdapter(sensor);
        // Console.WriteLine($"Fahrenheit sensor (adapted): {adapted.GetTemperature():F1} C");
    }
}
```

```typescript
interface Thermometer {
    getTemperature(): number;  // Returns Celsius
}

class CelsiusSensor implements Thermometer {
    getTemperature(): number { return 25.0; }
}

class FahrenheitSensor {
    readFahrenheit(): number { return 98.6; }
}

class FahrenheitSensorAdapter implements Thermometer {
    // TODO: Declare a private FahrenheitSensor field

    constructor(sensor: FahrenheitSensor) {
        // TODO: Store the sensor reference
    }

    getTemperature(): number {
        // TODO: Read the Fahrenheit value from the sensor
        // TODO: Convert Fahrenheit to Celsius using (F - 32) * 5.0 / 9.0
        return 0; // TODO: Return the converted Celsius value
    }
}

const celsius: Thermometer = new CelsiusSensor();
console.log(`Celsius sensor: ${celsius.getTemperature().toFixed(1)} C`);

// TODO: Uncomment the lines below after implementing the adapter
// const sensor = new FahrenheitSensor();
// const adapted: Thermometer = new FahrenheitSensorAdapter(sensor);
// console.log(`Fahrenheit sensor (adapted): ${adapted.getTemperature().toFixed(1)} C`);
```

#### Solutions

```java
interface Thermometer {
    double getTemperature();  // Returns Celsius
}

class CelsiusSensor implements Thermometer {
    @Override
    public double getTemperature() {
        return 25.0;  // Simulated reading
    }
}

class FahrenheitSensor {
    public double readFahrenheit() {
        return 98.6;  // Simulated reading
    }
}

class FahrenheitSensorAdapter implements Thermometer {
    private FahrenheitSensor sensor;

    public FahrenheitSensorAdapter(FahrenheitSensor sensor) {
        this.sensor = sensor;
    }

    @Override
    public double getTemperature() {
        double fahrenheit = sensor.readFahrenheit();
        return (fahrenheit - 32) * 5.0 / 9.0;
    }
}

public class Main {
    public static void main(String[] args) {
        Thermometer celsius = new CelsiusSensor();
        System.out.printf("Celsius sensor: %.1f C%n", celsius.getTemperature());

        FahrenheitSensor sensor = new FahrenheitSensor();
        Thermometer adapted = new FahrenheitSensorAdapter(sensor);
        System.out.printf("Fahrenheit sensor (adapted): %.1f C%n", adapted.getTemperature());
    }
}
```

```python
from abc import ABC, abstractmethod

class Thermometer(ABC):
    @abstractmethod
    def get_temperature(self) -> float:
        """Returns temperature in Celsius."""
        pass

class CelsiusSensor(Thermometer):
    def get_temperature(self) -> float:
        return 25.0

class FahrenheitSensor:
    def read_fahrenheit(self) -> float:
        return 98.6

class FahrenheitSensorAdapter(Thermometer):
    def __init__(self, sensor: FahrenheitSensor):
        self.sensor = sensor

    def get_temperature(self) -> float:
        fahrenheit = self.sensor.read_fahrenheit()
        return (fahrenheit - 32) * 5.0 / 9.0

if __name__ == "__main__":
    celsius = CelsiusSensor()
    print(f"Celsius sensor: {celsius.get_temperature():.1f} C")

    sensor = FahrenheitSensor()
    adapted = FahrenheitSensorAdapter(sensor)
    print(f"Fahrenheit sensor (adapted): {adapted.get_temperature():.1f} C")
```

```cpp
#include <iostream>
#include <cstdio>
using namespace std;

class Thermometer {
public:
    virtual double getTemperature() = 0;  // Returns Celsius
    virtual ~Thermometer() {}
};

class CelsiusSensor : public Thermometer {
public:
    double getTemperature() override { return 25.0; }
};

class FahrenheitSensor {
public:
    double readFahrenheit() { return 98.6; }
};

class FahrenheitSensorAdapter : public Thermometer {
    FahrenheitSensor* sensor;

public:
    FahrenheitSensorAdapter(FahrenheitSensor* sensor) : sensor(sensor) {}

    double getTemperature() override {
        double fahrenheit = sensor->readFahrenheit();
        return (fahrenheit - 32) * 5.0 / 9.0;
    }
};

int main() {
    CelsiusSensor celsius;
    printf("Celsius sensor: %.1f C\n", celsius.getTemperature());

    FahrenheitSensor sensor;
    FahrenheitSensorAdapter adapted(&sensor);
    printf("Fahrenheit sensor (adapted): %.1f C\n", adapted.getTemperature());
    return 0;
}
```

```go
package main

import "fmt"

type Thermometer interface {
	GetTemperature() float64 // Returns Celsius
}

type CelsiusSensor struct{}

func (c *CelsiusSensor) GetTemperature() float64 {
	return 25.0
}

type FahrenheitSensor struct{}

func (f *FahrenheitSensor) ReadFahrenheit() float64 {
	return 98.6
}

type FahrenheitSensorAdapter struct {
	sensor *FahrenheitSensor
}

func NewFahrenheitSensorAdapter(sensor *FahrenheitSensor) *FahrenheitSensorAdapter {
	return &FahrenheitSensorAdapter{sensor: sensor}
}

func (a *FahrenheitSensorAdapter) GetTemperature() float64 {
	fahrenheit := a.sensor.ReadFahrenheit()
	return (fahrenheit - 32) * 5.0 / 9.0
}

func main() {
	var celsius Thermometer = &CelsiusSensor{}
	fmt.Printf("Celsius sensor: %.1f C\n", celsius.GetTemperature())

	sensor := &FahrenheitSensor{}
	var adapted Thermometer = NewFahrenheitSensorAdapter(sensor)
	fmt.Printf("Fahrenheit sensor (adapted): %.1f C\n", adapted.GetTemperature())
}
```

```csharp
using System;

interface IThermometer
{
    double GetTemperature();  // Returns Celsius
}

class CelsiusSensor : IThermometer
{
    public double GetTemperature() => 25.0;
}

class FahrenheitSensor
{
    public double ReadFahrenheit() => 98.6;
}

class FahrenheitSensorAdapter : IThermometer
{
    private FahrenheitSensor sensor;

    public FahrenheitSensorAdapter(FahrenheitSensor sensor)
    {
        this.sensor = sensor;
    }

    public double GetTemperature()
    {
        double fahrenheit = sensor.ReadFahrenheit();
        return (fahrenheit - 32) * 5.0 / 9.0;
    }
}

public class Program
{
    public static void Main()
    {
        IThermometer celsius = new CelsiusSensor();
        Console.WriteLine($"Celsius sensor: {celsius.GetTemperature():F1} C");

        var sensor = new FahrenheitSensor();
        IThermometer adapted = new FahrenheitSensorAdapter(sensor);
        Console.WriteLine($"Fahrenheit sensor (adapted): {adapted.GetTemperature():F1} C");
    }
}
```

```typescript
interface Thermometer {
    getTemperature(): number;  // Returns Celsius
}

class CelsiusSensor implements Thermometer {
    getTemperature(): number { return 25.0; }
}

class FahrenheitSensor {
    readFahrenheit(): number { return 98.6; }
}

class FahrenheitSensorAdapter implements Thermometer {
    private sensor: FahrenheitSensor;

    constructor(sensor: FahrenheitSensor) {
        this.sensor = sensor;
    }

    getTemperature(): number {
        const fahrenheit = this.sensor.readFahrenheit();
        return (fahrenheit - 32) * 5.0 / 9.0;
    }
}

const celsius: Thermometer = new CelsiusSensor();
console.log(`Celsius sensor: ${celsius.getTemperature().toFixed(1)} C`);

const sensor = new FahrenheitSensor();
const adapted: Thermometer = new FahrenheitSensorAdapter(sensor);
console.log(`Fahrenheit sensor (adapted): ${adapted.getTemperature().toFixed(1)} C`);
```

---

# Exercise 2: Notification Adapter

> [!PAYWALL] This content is for premium members only.

<!-- payload:lldCodingPracticeBlock:START {"id":"699196b4692e2fc4cb5bb4a6","title":"Design Notification Adapter","difficulty":"medium","expectedOutput":"Slack -> #general: Build succeeded (bot=true)\nTeams -> https://webhook.teams.com/abc: [Deployment] Service deployed to production\nDiscord -> channel 123456789: CPU usage above 90% (tts=false)"} -->
**Problem:** Your application sends notifications through a `NotificationSender` interface. You need to integrate three external services (Slack, Teams, Discord) that each have completely different APIs. Write adapters for all three.

**Requirements:**

- Target: `NotificationSender` with `send(String recipient, String message)`
- Adaptees:
   - `SlackClient` with `postMessage(String channel, String text, boolean asBot)`
   - `TeamsWebhook` with `sendCard(String title, String body, String webhookUrl)`
   - `DiscordBot` with `sendMessage(long channelId, String content, boolean tts)`
- Each adapter translates `send()` to the appropriate service call

```java
interface NotificationSender {
    void send(String recipient, String message);
}

class SlackClient {
    public void postMessage(String channel, String text, boolean asBot) {
        System.out.println("Slack -> #" + channel + ": " + text + " (bot=" + asBot + ")");
    }
}

class TeamsWebhook {
    public void sendCard(String title, String body, String webhookUrl) {
        System.out.println("Teams -> " + webhookUrl + ": [" + title + "] " + body);
    }
}

class DiscordBot {
    public void sendMessage(long channelId, String content, boolean tts) {
        System.out.println("Discord -> channel " + channelId + ": " + content + " (tts=" + tts + ")");
    }
}

class SlackAdapter implements NotificationSender {
    // TODO: Declare a private SlackClient field

    public SlackAdapter(SlackClient slackClient) {
        // TODO: Store the slackClient reference
    }

    @Override
    public void send(String recipient, String message) {
        // TODO: Call slackClient.postMessage() with recipient as channel, message as text, true for asBot
    }
}

class TeamsAdapter implements NotificationSender {
    // TODO: Declare a private TeamsWebhook field
    // TODO: Declare a private String webhookUrl field

    public TeamsAdapter(TeamsWebhook teamsWebhook, String webhookUrl) {
        // TODO: Store the teamsWebhook reference
        // TODO: Store the webhookUrl
    }

    @Override
    public void send(String recipient, String message) {
        // TODO: Call teamsWebhook.sendCard() with recipient as title, message as body, webhookUrl
    }
}

class DiscordAdapter implements NotificationSender {
    // TODO: Declare a private DiscordBot field
    // TODO: Declare a private long channelId field

    public DiscordAdapter(DiscordBot discordBot, long channelId) {
        // TODO: Store the discordBot reference
        // TODO: Store the channelId
    }

    @Override
    public void send(String recipient, String message) {
        // TODO: Call discordBot.sendMessage() with channelId, message as content, false for tts
    }
}

public class Main {
    public static void main(String[] args) {
        // TODO: Uncomment the lines below after implementing the adapters
        // NotificationSender slack = new SlackAdapter(new SlackClient());
        // NotificationSender teams = new TeamsAdapter(new TeamsWebhook(), "https://webhook.teams.com/abc");
        // NotificationSender discord = new DiscordAdapter(new DiscordBot(), 123456789L);

        // slack.send("general", "Build succeeded");
        // teams.send("Deployment", "Service deployed to production");
        // discord.send("alerts", "CPU usage above 90%");
    }
}
```

```python
from abc import ABC, abstractmethod

class NotificationSender(ABC):
    @abstractmethod
    def send(self, recipient: str, message: str):
        pass

class SlackClient:
    def post_message(self, channel: str, text: str, as_bot: bool):
        print(f"Slack -> #{channel}: {text} (bot={as_bot})")

class TeamsWebhook:
    def send_card(self, title: str, body: str, webhook_url: str):
        print(f"Teams -> {webhook_url}: [{title}] {body}")

class DiscordBot:
    def send_message(self, channel_id: int, content: str, tts: bool):
        print(f"Discord -> channel {channel_id}: {content} (tts={tts})")

class SlackAdapter(NotificationSender):
    def __init__(self, slack_client: SlackClient):
        # TODO: Store the slack_client reference
        pass

    def send(self, recipient: str, message: str):
        # TODO: Call self.slack_client.post_message() with recipient as channel, message as text, True for as_bot
        pass

class TeamsAdapter(NotificationSender):
    def __init__(self, teams_webhook: TeamsWebhook, webhook_url: str):
        # TODO: Store the teams_webhook reference
        # TODO: Store the webhook_url
        pass

    def send(self, recipient: str, message: str):
        # TODO: Call self.teams_webhook.send_card() with recipient as title, message as body, self.webhook_url
        pass

class DiscordAdapter(NotificationSender):
    def __init__(self, discord_bot: DiscordBot, channel_id: int):
        # TODO: Store the discord_bot reference
        # TODO: Store the channel_id
        pass

    def send(self, recipient: str, message: str):
        # TODO: Call self.discord_bot.send_message() with self.channel_id, message as content, False for tts
        pass

if __name__ == "__main__":
    # TODO: Uncomment the lines below after implementing the adapters
    # slack = SlackAdapter(SlackClient())
    # teams = TeamsAdapter(TeamsWebhook(), "https://webhook.teams.com/abc")
    # discord = DiscordAdapter(DiscordBot(), 123456789)

    # slack.send("general", "Build succeeded")
    # teams.send("Deployment", "Service deployed to production")
    # discord.send("alerts", "CPU usage above 90%")
    pass
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class NotificationSender {
public:
    virtual void send(string recipient, string message) = 0;
    virtual ~NotificationSender() {}
};

class SlackClient {
public:
    void postMessage(string channel, string text, bool asBot) {
        cout << "Slack -> #" << channel << ": " << text << " (bot=" << asBot << ")" << endl;
    }
};

class TeamsWebhook {
public:
    void sendCard(string title, string body, string webhookUrl) {
        cout << "Teams -> " << webhookUrl << ": [" << title << "] " << body << endl;
    }
};

class DiscordBot {
public:
    void sendMessage(long channelId, string content, bool tts) {
        cout << "Discord -> channel " << channelId << ": " << content << " (tts=" << tts << ")" << endl;
    }
};

class SlackAdapter : public NotificationSender {
    // TODO: Declare a SlackClient* field

public:
    SlackAdapter(SlackClient* slackClient) {
        // TODO: Store the slackClient pointer
    }

    void send(string recipient, string message) override {
        // TODO: Call slackClient->postMessage() with recipient as channel, message as text, true for asBot
    }
};

class TeamsAdapter : public NotificationSender {
    // TODO: Declare a TeamsWebhook* field
    // TODO: Declare a string webhookUrl field

public:
    TeamsAdapter(TeamsWebhook* teamsWebhook, string webhookUrl) {
        // TODO: Store the teamsWebhook pointer
        // TODO: Store the webhookUrl
    }

    void send(string recipient, string message) override {
        // TODO: Call teamsWebhook->sendCard() with recipient as title, message as body, webhookUrl
    }
};

class DiscordAdapter : public NotificationSender {
    // TODO: Declare a DiscordBot* field
    // TODO: Declare a long channelId field

public:
    DiscordAdapter(DiscordBot* discordBot, long channelId) {
        // TODO: Store the discordBot pointer
        // TODO: Store the channelId
    }

    void send(string recipient, string message) override {
        // TODO: Call discordBot->sendMessage() with channelId, message as content, false for tts
    }
};

int main() {
    // TODO: Uncomment the lines below after implementing the adapters
    // SlackClient slackClient;
    // SlackAdapter slack(&slackClient);
    // slack.send("general", "Build succeeded");

    // TeamsWebhook teamsWebhook;
    // TeamsAdapter teams(&teamsWebhook, "https://webhook.teams.com/abc");
    // teams.send("Deployment", "Service deployed to production");

    // DiscordBot discordBot;
    // DiscordAdapter discord(&discordBot, 123456789L);
    // discord.send("alerts", "CPU usage above 90%");
    return 0;
}
```

```go
package main

type NotificationSender interface {
	Send(recipient string, message string)
}

type SlackClient struct{}

func (s *SlackClient) PostMessage(channel string, text string, asBot bool) {
	// TODO: Implement Slack message posting
}

type TeamsWebhook struct{}

func (t *TeamsWebhook) SendCard(title string, body string, webhookUrl string) {
	// TODO: Implement Teams card sending
}

type DiscordBot struct{}

func (d *DiscordBot) SendMessage(channelId int64, content string, tts bool) {
	// TODO: Implement Discord message sending
}

type SlackAdapter struct {
	// TODO: Declare a private SlackClient field
	slackClient *SlackClient
}

func NewSlackAdapter(slackClient *SlackClient) *SlackAdapter {
	// TODO: Store the slackClient reference
	return &SlackAdapter{}
}

func (s *SlackAdapter) Send(recipient string, message string) {
	// TODO: Call slackClient.PostMessage() with recipient as channel, message as text, true for asBot
}

type TeamsAdapter struct {
	// TODO: Declare a private TeamsWebhook field
	// TODO: Declare a private string webhookUrl field
	teamsWebhook *TeamsWebhook
	webhookUrl   string
}

func NewTeamsAdapter(teamsWebhook *TeamsWebhook, webhookUrl string) *TeamsAdapter {
	// TODO: Store the teamsWebhook reference
	// TODO: Store the webhookUrl
	return &TeamsAdapter{}
}

func (t *TeamsAdapter) Send(recipient string, message string) {
	// TODO: Call teamsWebhook.SendCard() with recipient as title, message as body, webhookUrl
}

type DiscordAdapter struct {
	// TODO: Declare a private DiscordBot field
	// TODO: Declare a private long channelId field
	discordBot *DiscordBot
	channelId  int64
}

func NewDiscordAdapter(discordBot *DiscordBot, channelId int64) *DiscordAdapter {
	// TODO: Store the discordBot reference
	// TODO: Store the channelId
	return &DiscordAdapter{}
}

func (d *DiscordAdapter) Send(recipient string, message string) {
	// TODO: Call discordBot.SendMessage() with channelId, message as content, false for tts
}

func main() {
	// TODO: Uncomment the lines below after implementing the adapters
	// slack := NewSlackAdapter(&SlackClient{})
	// teams := NewTeamsAdapter(&TeamsWebhook{}, "https://webhook.teams.com/abc")
	// discord := NewDiscordAdapter(&DiscordBot{}, 123456789)

	// slack.Send("general", "Build succeeded")
	// teams.Send("Deployment", "Service deployed to production")
	// discord.Send("alerts", "CPU usage above 90%")
}
```

```csharp
using System;

interface INotificationSender
{
    void Send(string recipient, string message);
}

class SlackClient
{
    public void PostMessage(string channel, string text, bool asBot)
    {
        Console.WriteLine($"Slack -> #{channel}: {text} (bot={asBot})");
    }
}

class TeamsWebhook
{
    public void SendCard(string title, string body, string webhookUrl)
    {
        Console.WriteLine($"Teams -> {webhookUrl}: [{title}] {body}");
    }
}

class DiscordBot
{
    public void SendMessage(long channelId, string content, bool tts)
    {
        Console.WriteLine($"Discord -> channel {channelId}: {content} (tts={tts})");
    }
}

class SlackAdapter : INotificationSender
{
    // TODO: Declare a private SlackClient field

    public SlackAdapter(SlackClient slackClient)
    {
        // TODO: Store the slackClient reference
    }

    public void Send(string recipient, string message)
    {
        // TODO: Call slackClient.PostMessage() with recipient as channel, message as text, true for asBot
    }
}

class TeamsAdapter : INotificationSender
{
    // TODO: Declare a private TeamsWebhook field
    // TODO: Declare a private string webhookUrl field

    public TeamsAdapter(TeamsWebhook teamsWebhook, string webhookUrl)
    {
        // TODO: Store the teamsWebhook reference
        // TODO: Store the webhookUrl
    }

    public void Send(string recipient, string message)
    {
        // TODO: Call teamsWebhook.SendCard() with recipient as title, message as body, webhookUrl
    }
}

class DiscordAdapter : INotificationSender
{
    // TODO: Declare a private DiscordBot field
    // TODO: Declare a private long channelId field

    public DiscordAdapter(DiscordBot discordBot, long channelId)
    {
        // TODO: Store the discordBot reference
        // TODO: Store the channelId
    }

    public void Send(string recipient, string message)
    {
        // TODO: Call discordBot.SendMessage() with channelId, message as content, false for tts
    }
}

public class Program
{
    public static void Main()
    {
        // TODO: Uncomment the lines below after implementing the adapters
        // INotificationSender slack = new SlackAdapter(new SlackClient());
        // INotificationSender teams = new TeamsAdapter(new TeamsWebhook(), "https://webhook.teams.com/abc");
        // INotificationSender discord = new DiscordAdapter(new DiscordBot(), 123456789L);

        // slack.Send("general", "Build succeeded");
        // teams.Send("Deployment", "Service deployed to production");
        // discord.Send("alerts", "CPU usage above 90%");
    }
}
```

```typescript
interface NotificationSender {
    send(recipient: string, message: string): void;
}

class SlackClient {
    postMessage(channel: string, text: string, asBot: boolean): void {
        console.log(`Slack -> #${channel}: ${text} (bot=${asBot})`);
    }
}

class TeamsWebhook {
    sendCard(title: string, body: string, webhookUrl: string): void {
        console.log(`Teams -> ${webhookUrl}: [${title}] ${body}`);
    }
}

class DiscordBot {
    sendMessage(channelId: number, content: string, tts: boolean): void {
        console.log(`Discord -> channel ${channelId}: ${content} (tts=${tts})`);
    }
}

class SlackAdapter implements NotificationSender {
    // TODO: Declare a private SlackClient field

    constructor(slackClient: SlackClient) {
        // TODO: Store the slackClient reference
    }

    send(recipient: string, message: string): void {
        // TODO: Call this.slackClient.postMessage() with recipient as channel, message as text, true for asBot
    }
}

class TeamsAdapter implements NotificationSender {
    // TODO: Declare a private TeamsWebhook field
    // TODO: Declare a private string webhookUrl field

    constructor(teamsWebhook: TeamsWebhook, webhookUrl: string) {
        // TODO: Store the teamsWebhook reference
        // TODO: Store the webhookUrl
    }

    send(recipient: string, message: string): void {
        // TODO: Call this.teamsWebhook.sendCard() with recipient as title, message as body, this.webhookUrl
    }
}

class DiscordAdapter implements NotificationSender {
    // TODO: Declare a private DiscordBot field
    // TODO: Declare a private number channelId field

    constructor(discordBot: DiscordBot, channelId: number) {
        // TODO: Store the discordBot reference
        // TODO: Store the channelId
    }

    send(recipient: string, message: string): void {
        // TODO: Call this.discordBot.sendMessage() with this.channelId, message as content, false for tts
    }
}

// TODO: Uncomment the lines below after implementing the adapters
// const slack: NotificationSender = new SlackAdapter(new SlackClient());
// const teams: NotificationSender = new TeamsAdapter(new TeamsWebhook(), "https://webhook.teams.com/abc");
// const discord: NotificationSender = new DiscordAdapter(new DiscordBot(), 123456789);

// slack.send("general", "Build succeeded");
// teams.send("Deployment", "Service deployed to production");
// discord.send("alerts", "CPU usage above 90%");
```

#### Solutions

```java
interface NotificationSender {
    void send(String recipient, String message);
}

class SlackClient {
    public void postMessage(String channel, String text, boolean asBot) {
        System.out.println("Slack -> #" + channel + ": " + text + " (bot=" + asBot + ")");
    }
}

class TeamsWebhook {
    public void sendCard(String title, String body, String webhookUrl) {
        System.out.println("Teams -> " + webhookUrl + ": [" + title + "] " + body);
    }
}

class DiscordBot {
    public void sendMessage(long channelId, String content, boolean tts) {
        System.out.println("Discord -> channel " + channelId + ": " + content + " (tts=" + tts + ")");
    }
}

class SlackAdapter implements NotificationSender {
    private SlackClient slackClient;

    public SlackAdapter(SlackClient slackClient) {
        this.slackClient = slackClient;
    }

    @Override
    public void send(String recipient, String message) {
        slackClient.postMessage(recipient, message, true);
    }
}

class TeamsAdapter implements NotificationSender {
    private TeamsWebhook teamsWebhook;
    private String webhookUrl;

    public TeamsAdapter(TeamsWebhook teamsWebhook, String webhookUrl) {
        this.teamsWebhook = teamsWebhook;
        this.webhookUrl = webhookUrl;
    }

    @Override
    public void send(String recipient, String message) {
        teamsWebhook.sendCard(recipient, message, webhookUrl);
    }
}

class DiscordAdapter implements NotificationSender {
    private DiscordBot discordBot;
    private long channelId;

    public DiscordAdapter(DiscordBot discordBot, long channelId) {
        this.discordBot = discordBot;
        this.channelId = channelId;
    }

    @Override
    public void send(String recipient, String message) {
        discordBot.sendMessage(channelId, message, false);
    }
}

public class Main {
    public static void main(String[] args) {
        NotificationSender slack = new SlackAdapter(new SlackClient());
        NotificationSender teams = new TeamsAdapter(new TeamsWebhook(), "https://webhook.teams.com/abc");
        NotificationSender discord = new DiscordAdapter(new DiscordBot(), 123456789L);

        slack.send("general", "Build succeeded");
        teams.send("Deployment", "Service deployed to production");
        discord.send("alerts", "CPU usage above 90%");
    }
}
```

```python
from abc import ABC, abstractmethod

class NotificationSender(ABC):
    @abstractmethod
    def send(self, recipient: str, message: str):
        pass

class SlackClient:
    def post_message(self, channel: str, text: str, as_bot: bool):
        print(f"Slack -> #{channel}: {text} (bot={as_bot})")

class TeamsWebhook:
    def send_card(self, title: str, body: str, webhook_url: str):
        print(f"Teams -> {webhook_url}: [{title}] {body}")

class DiscordBot:
    def send_message(self, channel_id: int, content: str, tts: bool):
        print(f"Discord -> channel {channel_id}: {content} (tts={tts})")

class SlackAdapter(NotificationSender):
    def __init__(self, slack_client: SlackClient):
        self.slack_client = slack_client

    def send(self, recipient: str, message: str):
        self.slack_client.post_message(recipient, message, True)

class TeamsAdapter(NotificationSender):
    def __init__(self, teams_webhook: TeamsWebhook, webhook_url: str):
        self.teams_webhook = teams_webhook
        self.webhook_url = webhook_url

    def send(self, recipient: str, message: str):
        self.teams_webhook.send_card(recipient, message, self.webhook_url)

class DiscordAdapter(NotificationSender):
    def __init__(self, discord_bot: DiscordBot, channel_id: int):
        self.discord_bot = discord_bot
        self.channel_id = channel_id

    def send(self, recipient: str, message: str):
        self.discord_bot.send_message(self.channel_id, message, False)

if __name__ == "__main__":
    slack = SlackAdapter(SlackClient())
    teams = TeamsAdapter(TeamsWebhook(), "https://webhook.teams.com/abc")
    discord = DiscordAdapter(DiscordBot(), 123456789)

    slack.send("general", "Build succeeded")
    teams.send("Deployment", "Service deployed to production")
    discord.send("alerts", "CPU usage above 90%")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class NotificationSender {
public:
    virtual void send(string recipient, string message) = 0;
    virtual ~NotificationSender() {}
};

class SlackClient {
public:
    void postMessage(string channel, string text, bool asBot) {
        cout << "Slack -> #" << channel << ": " << text << " (bot=" << boolalpha << asBot << ")" << endl;
    }
};

class TeamsWebhook {
public:
    void sendCard(string title, string body, string webhookUrl) {
        cout << "Teams -> " << webhookUrl << ": [" << title << "] " << body << endl;
    }
};

class DiscordBot {
public:
    void sendMessage(long channelId, string content, bool tts) {
        cout << "Discord -> channel " << channelId << ": " << content << " (tts=" << boolalpha << tts << ")" << endl;
    }
};

class SlackAdapter : public NotificationSender {
    SlackClient* slackClient;

public:
    SlackAdapter(SlackClient* slackClient) : slackClient(slackClient) {}

    void send(string recipient, string message) override {
        slackClient->postMessage(recipient, message, true);
    }
};

class TeamsAdapter : public NotificationSender {
    TeamsWebhook* teamsWebhook;
    string webhookUrl;

public:
    TeamsAdapter(TeamsWebhook* teamsWebhook, string webhookUrl)
        : teamsWebhook(teamsWebhook), webhookUrl(webhookUrl) {}

    void send(string recipient, string message) override {
        teamsWebhook->sendCard(recipient, message, webhookUrl);
    }
};

class DiscordAdapter : public NotificationSender {
    DiscordBot* discordBot;
    long channelId;

public:
    DiscordAdapter(DiscordBot* discordBot, long channelId)
        : discordBot(discordBot), channelId(channelId) {}

    void send(string recipient, string message) override {
        discordBot->sendMessage(channelId, message, false);
    }
};

int main() {
    SlackClient slackClient;
    SlackAdapter slack(&slackClient);

    TeamsWebhook teamsWebhook;
    TeamsAdapter teams(&teamsWebhook, "https://webhook.teams.com/abc");

    DiscordBot discordBot;
    DiscordAdapter discord(&discordBot, 123456789L);

    slack.send("general", "Build succeeded");
    teams.send("Deployment", "Service deployed to production");
    discord.send("alerts", "CPU usage above 90%");
    return 0;
}
```

```go
package main

import "fmt"

type NotificationSender interface {
	Send(recipient string, message string)
}

type SlackClient struct{}

func (s *SlackClient) PostMessage(channel string, text string, asBot bool) {
	fmt.Printf("Slack -> #%s: %s (bot=%t)\n", channel, text, asBot)
}

type TeamsWebhook struct{}

func (t *TeamsWebhook) SendCard(title string, body string, webhookURL string) {
	fmt.Printf("Teams -> %s: [%s] %s\n", webhookURL, title, body)
}

type DiscordBot struct{}

func (d *DiscordBot) SendMessage(channelID int64, content string, tts bool) {
	fmt.Printf("Discord -> channel %d: %s (tts=%t)\n", channelID, content, tts)
}

type SlackAdapter struct {
	slackClient *SlackClient
}

func NewSlackAdapter(slackClient *SlackClient) *SlackAdapter {
	return &SlackAdapter{slackClient: slackClient}
}

func (s *SlackAdapter) Send(recipient string, message string) {
	s.slackClient.PostMessage(recipient, message, true)
}

type TeamsAdapter struct {
	teamsWebhook *TeamsWebhook
	webhookURL   string
}

func NewTeamsAdapter(teamsWebhook *TeamsWebhook, webhookURL string) *TeamsAdapter {
	return &TeamsAdapter{teamsWebhook: teamsWebhook, webhookURL: webhookURL}
}

func (t *TeamsAdapter) Send(recipient string, message string) {
	t.teamsWebhook.SendCard(recipient, message, t.webhookURL)
}

type DiscordAdapter struct {
	discordBot *DiscordBot
	channelID  int64
}

func NewDiscordAdapter(discordBot *DiscordBot, channelID int64) *DiscordAdapter {
	return &DiscordAdapter{discordBot: discordBot, channelID: channelID}
}

func (d *DiscordAdapter) Send(recipient string, message string) {
	d.discordBot.SendMessage(d.channelID, message, false)
}

func main() {
	var slack NotificationSender = NewSlackAdapter(&SlackClient{})
	var teams NotificationSender = NewTeamsAdapter(&TeamsWebhook{}, "https://webhook.teams.com/abc")
	var discord NotificationSender = NewDiscordAdapter(&DiscordBot{}, 123456789)

	slack.Send("general", "Build succeeded")
	teams.Send("Deployment", "Service deployed to production")
	discord.Send("alerts", "CPU usage above 90%")
}
```

```csharp
using System;

interface INotificationSender
{
    void Send(string recipient, string message);
}

class SlackClient
{
    public void PostMessage(string channel, string text, bool asBot)
    {
        Console.WriteLine($"Slack -> #{channel}: {text} (bot={asBot})");
    }
}

class TeamsWebhook
{
    public void SendCard(string title, string body, string webhookUrl)
    {
        Console.WriteLine($"Teams -> {webhookUrl}: [{title}] {body}");
    }
}

class DiscordBot
{
    public void SendMessage(long channelId, string content, bool tts)
    {
        Console.WriteLine($"Discord -> channel {channelId}: {content} (tts={tts})");
    }
}

class SlackAdapter : INotificationSender
{
    private SlackClient slackClient;

    public SlackAdapter(SlackClient slackClient)
    {
        this.slackClient = slackClient;
    }

    public void Send(string recipient, string message)
    {
        slackClient.PostMessage(recipient, message, true);
    }
}

class TeamsAdapter : INotificationSender
{
    private TeamsWebhook teamsWebhook;
    private string webhookUrl;

    public TeamsAdapter(TeamsWebhook teamsWebhook, string webhookUrl)
    {
        this.teamsWebhook = teamsWebhook;
        this.webhookUrl = webhookUrl;
    }

    public void Send(string recipient, string message)
    {
        teamsWebhook.SendCard(recipient, message, webhookUrl);
    }
}

class DiscordAdapter : INotificationSender
{
    private DiscordBot discordBot;
    private long channelId;

    public DiscordAdapter(DiscordBot discordBot, long channelId)
    {
        this.discordBot = discordBot;
        this.channelId = channelId;
    }

    public void Send(string recipient, string message)
    {
        discordBot.SendMessage(channelId, message, false);
    }
}

public class Program
{
    public static void Main()
    {
        INotificationSender slack = new SlackAdapter(new SlackClient());
        INotificationSender teams = new TeamsAdapter(new TeamsWebhook(), "https://webhook.teams.com/abc");
        INotificationSender discord = new DiscordAdapter(new DiscordBot(), 123456789L);

        slack.Send("general", "Build succeeded");
        teams.Send("Deployment", "Service deployed to production");
        discord.Send("alerts", "CPU usage above 90%");
    }
}
```

```typescript
interface NotificationSender {
    send(recipient: string, message: string): void;
}

class SlackClient {
    postMessage(channel: string, text: string, asBot: boolean): void {
        console.log(`Slack -> #${channel}: ${text} (bot=${asBot})`);
    }
}

class TeamsWebhook {
    sendCard(title: string, body: string, webhookUrl: string): void {
        console.log(`Teams -> ${webhookUrl}: [${title}] ${body}`);
    }
}

class DiscordBot {
    sendMessage(channelId: number, content: string, tts: boolean): void {
        console.log(`Discord -> channel ${channelId}: ${content} (tts=${tts})`);
    }
}

class SlackAdapter implements NotificationSender {
    private slackClient: SlackClient;

    constructor(slackClient: SlackClient) {
        this.slackClient = slackClient;
    }

    send(recipient: string, message: string): void {
        this.slackClient.postMessage(recipient, message, true);
    }
}

class TeamsAdapter implements NotificationSender {
    private teamsWebhook: TeamsWebhook;
    private webhookUrl: string;

    constructor(teamsWebhook: TeamsWebhook, webhookUrl: string) {
        this.teamsWebhook = teamsWebhook;
        this.webhookUrl = webhookUrl;
    }

    send(recipient: string, message: string): void {
        this.teamsWebhook.sendCard(recipient, message, this.webhookUrl);
    }
}

class DiscordAdapter implements NotificationSender {
    private discordBot: DiscordBot;
    private channelId: number;

    constructor(discordBot: DiscordBot, channelId: number) {
        this.discordBot = discordBot;
        this.channelId = channelId;
    }

    send(recipient: string, message: string): void {
        this.discordBot.sendMessage(this.channelId, message, false);
    }
}

const slack: NotificationSender = new SlackAdapter(new SlackClient());
const teams: NotificationSender = new TeamsAdapter(new TeamsWebhook(), "https://webhook.teams.com/abc");
const discord: NotificationSender = new DiscordAdapter(new DiscordBot(), 123456789);

slack.send("general", "Build succeeded");
teams.send("Deployment", "Service deployed to production");
discord.send("alerts", "CPU usage above 90%");
```

---

# Exercise 3: Two-Way Adapter

<!-- payload:lldCodingPracticeBlock:START {"id":"69919719692e2fc4cb5bb4a7","title":"Design Two-Way Adapter Class","difficulty":"hard","expectedOutput":"JsonService: Sent {\"data\":\"hello\"}\nReceived: <status>ok</status>\nXmlService: Sent <data>hello</data>\nReceived: {\"status\":\"ok\"}"} -->
**Problem:** You have two systems that need to communicate bidirectionally. System A uses a `JsonApi` interface with `sendJson(String json)` and `receiveJson()`. System B uses an `XmlApi` interface with `sendXml(String xml)` and `receiveXml()`. Write a two-way adapter that allows either system to be used where the other is expected.

**Requirements:**

- `JsonToXmlAdapter` implements `XmlApi` and wraps `JsonApi` (converts JSON to XML and vice versa)
- `XmlToJsonAdapter` implements `JsonApi` and wraps `XmlApi` (converts XML to JSON and vice versa)
- Use simple string manipulation for conversion (not a real parser): `{"key":"value"}` becomes `<key>value</key>` and vice versa

```java
interface JsonApi {
    void sendJson(String json);
    String receiveJson();
}

interface XmlApi {
    void sendXml(String xml);
    String receiveXml();
}

class JsonService implements JsonApi {
    private String lastReceived;

    @Override
    public void sendJson(String json) {
        System.out.println("JsonService: Sent " + json);
        lastReceived = json;
    }

    @Override
    public String receiveJson() {
        return "{\"status\":\"ok\"}";
    }
}

class XmlService implements XmlApi {
    private String lastReceived;

    @Override
    public void sendXml(String xml) {
        System.out.println("XmlService: Sent " + xml);
        lastReceived = xml;
    }

    @Override
    public String receiveXml() {
        return "<status>ok</status>";
    }
}

class JsonToXmlAdapter implements XmlApi {
    // TODO: Declare a private JsonApi field

    public JsonToXmlAdapter(JsonApi jsonApi) {
        // TODO: Store the jsonApi reference
    }

    @Override
    public void sendXml(String xml) {
        // TODO: Extract the key and value from the XML string (e.g., "<data>hello</data>" -> key="data", value="hello")
        // TODO: Build a JSON string: {"key":"value"}
        // TODO: Call jsonApi.sendJson() with the JSON string
    }

    @Override
    public String receiveXml() {
        // TODO: Call jsonApi.receiveJson() to get a JSON string
        // TODO: Extract the key and value from the JSON string (e.g., {"status":"ok"} -> key="status", value="ok")
        // TODO: Build and return an XML string: <key>value</key>
        return ""; // TODO: Return the converted XML string
    }
}

class XmlToJsonAdapter implements JsonApi {
    // TODO: Declare a private XmlApi field

    public XmlToJsonAdapter(XmlApi xmlApi) {
        // TODO: Store the xmlApi reference
    }

    @Override
    public void sendJson(String json) {
        // TODO: Extract the key and value from the JSON string (e.g., {"data":"hello"} -> key="data", value="hello")
        // TODO: Build an XML string: <key>value</key>
        // TODO: Call xmlApi.sendXml() with the XML string
    }

    @Override
    public String receiveJson() {
        // TODO: Call xmlApi.receiveXml() to get an XML string
        // TODO: Extract the key and value from the XML string
        // TODO: Build and return a JSON string: {"key":"value"}
        return ""; // TODO: Return the converted JSON string
    }
}

public class Main {
    public static void main(String[] args) {
        // TODO: Uncomment the lines below after implementing the adapters
        // JsonApi jsonService = new JsonService();
        // XmlApi xmlService = new XmlService();

        // Use JSON service where XML is expected
        // XmlApi jsonAsXml = new JsonToXmlAdapter(jsonService);
        // jsonAsXml.sendXml("<data>hello</data>");
        // System.out.println("Received: " + jsonAsXml.receiveXml());

        // Use XML service where JSON is expected
        // JsonApi xmlAsJson = new XmlToJsonAdapter(xmlService);
        // xmlAsJson.sendJson("{\"data\":\"hello\"}");
        // System.out.println("Received: " + xmlAsJson.receiveJson());
    }
}
```

```python
from abc import ABC, abstractmethod

class JsonApi(ABC):
    @abstractmethod
    def send_json(self, json_str: str):
        pass

    @abstractmethod
    def receive_json(self) -> str:
        pass

class XmlApi(ABC):
    @abstractmethod
    def send_xml(self, xml_str: str):
        pass

    @abstractmethod
    def receive_xml(self) -> str:
        pass

class JsonService(JsonApi):
    def __init__(self):
        self.last_received = None

    def send_json(self, json_str: str):
        print(f"JsonService: Sent {json_str}")
        self.last_received = json_str

    def receive_json(self) -> str:
        return '{"status":"ok"}'

class XmlService(XmlApi):
    def __init__(self):
        self.last_received = None

    def send_xml(self, xml_str: str):
        print(f"XmlService: Sent {xml_str}")
        self.last_received = xml_str

    def receive_xml(self) -> str:
        return "<status>ok</status>"

class JsonToXmlAdapter(XmlApi):
    def __init__(self, json_api: JsonApi):
        # TODO: Store the json_api reference
        pass

    def send_xml(self, xml_str: str):
        # TODO: Extract the key and value from the XML string (e.g., "<data>hello</data>" -> key="data", value="hello")
        # TODO: Build a JSON string: {"key":"value"}
        # TODO: Call self.json_api.send_json() with the JSON string
        pass

    def receive_xml(self) -> str:
        # TODO: Call self.json_api.receive_json() to get a JSON string
        # TODO: Extract the key and value from the JSON string (e.g., {"status":"ok"} -> key="status", value="ok")
        # TODO: Build and return an XML string: <key>value</key>
        return ""  # TODO: Return the converted XML string

class XmlToJsonAdapter(JsonApi):
    def __init__(self, xml_api: XmlApi):
        # TODO: Store the xml_api reference
        pass

    def send_json(self, json_str: str):
        # TODO: Extract the key and value from the JSON string (e.g., {"data":"hello"} -> key="data", value="hello")
        # TODO: Build an XML string: <key>value</key>
        # TODO: Call self.xml_api.send_xml() with the XML string
        pass

    def receive_json(self) -> str:
        # TODO: Call self.xml_api.receive_xml() to get an XML string
        # TODO: Extract the key and value from the XML string
        # TODO: Build and return a JSON string: {"key":"value"}
        return ""  # TODO: Return the converted JSON string

if __name__ == "__main__":
    # TODO: Uncomment the lines below after implementing the adapters
    # json_service = JsonService()
    # xml_service = XmlService()

    # Use JSON service where XML is expected
    # json_as_xml = JsonToXmlAdapter(json_service)
    # json_as_xml.send_xml("<data>hello</data>")
    # print(f"Received: {json_as_xml.receive_xml()}")

    # Use XML service where JSON is expected
    # xml_as_json = XmlToJsonAdapter(xml_service)
    # xml_as_json.send_json('{"data":"hello"}')
    # print(f"Received: {xml_as_json.receive_json()}")
    pass
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class JsonApi {
public:
    virtual void sendJson(string json) = 0;
    virtual string receiveJson() = 0;
    virtual ~JsonApi() {}
};

class XmlApi {
public:
    virtual void sendXml(string xml) = 0;
    virtual string receiveXml() = 0;
    virtual ~XmlApi() {}
};

class JsonService : public JsonApi {
public:
    void sendJson(string json) override {
        cout << "JsonService: Sent " << json << endl;
    }
    string receiveJson() override {
        return "{\"status\":\"ok\"}";
    }
};

class XmlService : public XmlApi {
public:
    void sendXml(string xml) override {
        cout << "XmlService: Sent " << xml << endl;
    }
    string receiveXml() override {
        return "<status>ok</status>";
    }
};

class JsonToXmlAdapter : public XmlApi {
    // TODO: Declare a JsonApi* field

public:
    JsonToXmlAdapter(JsonApi* jsonApi) {
        // TODO: Store the jsonApi pointer
    }

    void sendXml(string xml) override {
        // TODO: Extract the key and value from the XML string (e.g., "<data>hello</data>" -> key="data", value="hello")
        // TODO: Build a JSON string: {"key":"value"}
        // TODO: Call jsonApi->sendJson() with the JSON string
    }

    string receiveXml() override {
        // TODO: Call jsonApi->receiveJson() to get a JSON string
        // TODO: Extract the key and value from the JSON string (e.g., {"status":"ok"} -> key="status", value="ok")
        // TODO: Build and return an XML string: <key>value</key>
        return ""; // TODO: Return the converted XML string
    }
};

class XmlToJsonAdapter : public JsonApi {
    // TODO: Declare an XmlApi* field

public:
    XmlToJsonAdapter(XmlApi* xmlApi) {
        // TODO: Store the xmlApi pointer
    }

    void sendJson(string json) override {
        // TODO: Extract the key and value from the JSON string (e.g., {"data":"hello"} -> key="data", value="hello")
        // TODO: Build an XML string: <key>value</key>
        // TODO: Call xmlApi->sendXml() with the XML string
    }

    string receiveJson() override {
        // TODO: Call xmlApi->receiveXml() to get an XML string
        // TODO: Extract the key and value from the XML string
        // TODO: Build and return a JSON string: {"key":"value"}
        return ""; // TODO: Return the converted JSON string
    }
};

int main() {
    // TODO: Uncomment the lines below after implementing the adapters
    // JsonService jsonService;
    // XmlService xmlService;

    // Use JSON service where XML is expected
    // JsonToXmlAdapter jsonAsXml(&jsonService);
    // jsonAsXml.sendXml("<data>hello</data>");
    // cout << "Received: " << jsonAsXml.receiveXml() << endl;

    // Use XML service where JSON is expected
    // XmlToJsonAdapter xmlAsJson(&xmlService);
    // xmlAsJson.sendJson("{\"data\":\"hello\"}");
    // cout << "Received: " << xmlAsJson.receiveJson() << endl;
    return 0;
}
```

```go
package main

import "fmt"

type JsonApi interface {
	SendJson(json string)
	ReceiveJson() string
}

type XmlApi interface {
	SendXml(xml string)
	ReceiveXml() string
}

type JsonService struct {
	lastReceived string
}

func (s *JsonService) SendJson(json string) {
	fmt.Printf("JsonService: Sent %s\n", json)
	s.lastReceived = json
}

func (s *JsonService) ReceiveJson() string {
	return "{\"status\":\"ok\"}"
}

type XmlService struct {
	lastReceived string
}

func (s *XmlService) SendXml(xml string) {
	fmt.Printf("XmlService: Sent %s\n", xml)
	s.lastReceived = xml
}

func (s *XmlService) ReceiveXml() string {
	return "<status>ok</status>"
}

type JsonToXmlAdapter struct {
	// TODO: Declare a private JsonApi field
	jsonApi JsonApi
}

func NewJsonToXmlAdapter(jsonApi JsonApi) *JsonToXmlAdapter {
	return &JsonToXmlAdapter{
		// TODO: Store the jsonApi reference
		jsonApi: jsonApi,
	}
}

func (a *JsonToXmlAdapter) SendXml(xml string) {
	// TODO: Extract the key and value from the XML string (e.g., "<data>hello</data>" -> key="data", value="hello")
	// TODO: Build a JSON string: {"key":"value"}
	// TODO: Call jsonApi.SendJson() with the JSON string
}

func (a *JsonToXmlAdapter) ReceiveXml() string {
	// TODO: Call jsonApi.ReceiveJson() to get a JSON string
	// TODO: Extract the key and value from the JSON string (e.g., {"status":"ok"} -> key="status", value="ok")
	// TODO: Build and return an XML string: <key>value</key>
	return "" // TODO: Return the converted XML string
}

type XmlToJsonAdapter struct {
	// TODO: Declare a private XmlApi field
	xmlApi XmlApi
}

func NewXmlToJsonAdapter(xmlApi XmlApi) *XmlToJsonAdapter {
	return &XmlToJsonAdapter{
		// TODO: Store the xmlApi reference
		xmlApi: xmlApi,
	}
}

func (a *XmlToJsonAdapter) SendJson(json string) {
	// TODO: Extract the key and value from the JSON string (e.g., {"data":"hello"} -> key="data", value="hello")
	// TODO: Build an XML string: <key>value</key>
	// TODO: Call xmlApi.SendXml() with the XML string
}

func (a *XmlToJsonAdapter) ReceiveJson() string {
	// TODO: Call xmlApi.ReceiveXml() to get an XML string
	// TODO: Extract the key and value from the XML string
	// TODO: Build and return a JSON string: {"key":"value"}
	return "" // TODO: Return the converted JSON string
}

func main() {
	// TODO: Uncomment the lines below after implementing the adapters
	// jsonService := &JsonService{}
	// xmlService := &XmlService{}

	// Use JSON service where XML is expected
	// jsonAsXml := NewJsonToXmlAdapter(jsonService)
	// jsonAsXml.SendXml("<data>hello</data>")
	// fmt.Printf("Received: %s\n", jsonAsXml.ReceiveXml())

	// Use XML service where JSON is expected
	// xmlAsJson := NewXmlToJsonAdapter(xmlService)
	// xmlAsJson.SendJson("{\"data\":\"hello\"}")
	// fmt.Printf("Received: %s\n", xmlAsJson.ReceiveJson())
}
```

```csharp
using System;

interface IJsonApi
{
    void SendJson(string json);
    string ReceiveJson();
}

interface IXmlApi
{
    void SendXml(string xml);
    string ReceiveXml();
}

class JsonService : IJsonApi
{
    public void SendJson(string json) => Console.WriteLine($"JsonService: Sent {json}");
    public string ReceiveJson() => "{\"status\":\"ok\"}";
}

class XmlService : IXmlApi
{
    public void SendXml(string xml) => Console.WriteLine($"XmlService: Sent {xml}");
    public string ReceiveXml() => "<status>ok</status>";
}

class JsonToXmlAdapter : IXmlApi
{
    // TODO: Declare a private IJsonApi field

    public JsonToXmlAdapter(IJsonApi jsonApi)
    {
        // TODO: Store the jsonApi reference
    }

    public void SendXml(string xml)
    {
        // TODO: Extract the key and value from the XML string (e.g., "<data>hello</data>" -> key="data", value="hello")
        // TODO: Build a JSON string: {"key":"value"}
        // TODO: Call jsonApi.SendJson() with the JSON string
    }

    public string ReceiveXml()
    {
        // TODO: Call jsonApi.ReceiveJson() to get a JSON string
        // TODO: Extract the key and value from the JSON string (e.g., {"status":"ok"} -> key="status", value="ok")
        // TODO: Build and return an XML string: <key>value</key>
        return ""; // TODO: Return the converted XML string
    }
}

class XmlToJsonAdapter : IJsonApi
{
    // TODO: Declare a private IXmlApi field

    public XmlToJsonAdapter(IXmlApi xmlApi)
    {
        // TODO: Store the xmlApi reference
    }

    public void SendJson(string json)
    {
        // TODO: Extract the key and value from the JSON string (e.g., {"data":"hello"} -> key="data", value="hello")
        // TODO: Build an XML string: <key>value</key>
        // TODO: Call xmlApi.SendXml() with the XML string
    }

    public string ReceiveJson()
    {
        // TODO: Call xmlApi.ReceiveXml() to get an XML string
        // TODO: Extract the key and value from the XML string
        // TODO: Build and return a JSON string: {"key":"value"}
        return ""; // TODO: Return the converted JSON string
    }
}

public class Program
{
    public static void Main()
    {
        // TODO: Uncomment the lines below after implementing the adapters
        // IJsonApi jsonService = new JsonService();
        // IXmlApi xmlService = new XmlService();

        // Use JSON service where XML is expected
        // IXmlApi jsonAsXml = new JsonToXmlAdapter(jsonService);
        // jsonAsXml.SendXml("<data>hello</data>");
        // Console.WriteLine($"Received: {jsonAsXml.ReceiveXml()}");

        // Use XML service where JSON is expected
        // IJsonApi xmlAsJson = new XmlToJsonAdapter(xmlService);
        // xmlAsJson.SendJson("{\"data\":\"hello\"}");
        // Console.WriteLine($"Received: {xmlAsJson.ReceiveJson()}");
    }
}
```

```typescript
interface JsonApi {
    sendJson(json: string): void;
    receiveJson(): string;
}

interface XmlApi {
    sendXml(xml: string): void;
    receiveXml(): string;
}

class JsonService implements JsonApi {
    sendJson(json: string): void { console.log(`JsonService: Sent ${json}`); }
    receiveJson(): string { return '{"status":"ok"}'; }
}

class XmlService implements XmlApi {
    sendXml(xml: string): void { console.log(`XmlService: Sent ${xml}`); }
    receiveXml(): string { return "<status>ok</status>"; }
}

class JsonToXmlAdapter implements XmlApi {
    // TODO: Declare a private JsonApi field

    constructor(jsonApi: JsonApi) {
        // TODO: Store the jsonApi reference
    }

    sendXml(xml: string): void {
        // TODO: Extract the key and value from the XML string (e.g., "<data>hello</data>" -> key="data", value="hello")
        // TODO: Build a JSON string: {"key":"value"}
        // TODO: Call this.jsonApi.sendJson() with the JSON string
    }

    receiveXml(): string {
        // TODO: Call this.jsonApi.receiveJson() to get a JSON string
        // TODO: Extract the key and value from the JSON string (e.g., {"status":"ok"} -> key="status", value="ok")
        // TODO: Build and return an XML string: <key>value</key>
        return ""; // TODO: Return the converted XML string
    }
}

class XmlToJsonAdapter implements JsonApi {
    // TODO: Declare a private XmlApi field

    constructor(xmlApi: XmlApi) {
        // TODO: Store the xmlApi reference
    }

    sendJson(json: string): void {
        // TODO: Extract the key and value from the JSON string (e.g., {"data":"hello"} -> key="data", value="hello")
        // TODO: Build an XML string: <key>value</key>
        // TODO: Call this.xmlApi.sendXml() with the XML string
    }

    receiveJson(): string {
        // TODO: Call this.xmlApi.receiveXml() to get an XML string
        // TODO: Extract the key and value from the XML string
        // TODO: Build and return a JSON string: {"key":"value"}
        return ""; // TODO: Return the converted JSON string
    }
}

// TODO: Uncomment the lines below after implementing the adapters
// const jsonService: JsonApi = new JsonService();
// const xmlService: XmlApi = new XmlService();

// Use JSON service where XML is expected
// const jsonAsXml: XmlApi = new JsonToXmlAdapter(jsonService);
// jsonAsXml.sendXml("<data>hello</data>");
// console.log(`Received: ${jsonAsXml.receiveXml()}`);

// Use XML service where JSON is expected
// const xmlAsJson: JsonApi = new XmlToJsonAdapter(xmlService);
// xmlAsJson.sendJson('{"data":"hello"}');
// console.log(`Received: ${xmlAsJson.receiveJson()}`);
```

#### Solutions

```java
interface JsonApi {
    void sendJson(String json);
    String receiveJson();
}

interface XmlApi {
    void sendXml(String xml);
    String receiveXml();
}

class JsonService implements JsonApi {
    private String lastReceived;

    @Override
    public void sendJson(String json) {
        System.out.println("JsonService: Sent " + json);
        lastReceived = json;
    }

    @Override
    public String receiveJson() {
        return "{\"status\":\"ok\"}";
    }
}

class XmlService implements XmlApi {
    private String lastReceived;

    @Override
    public void sendXml(String xml) {
        System.out.println("XmlService: Sent " + xml);
        lastReceived = xml;
    }

    @Override
    public String receiveXml() {
        return "<status>ok</status>";
    }
}

class JsonToXmlAdapter implements XmlApi {
    private JsonApi jsonApi;

    public JsonToXmlAdapter(JsonApi jsonApi) {
        this.jsonApi = jsonApi;
    }

    @Override
    public void sendXml(String xml) {
        String key = xml.substring(xml.indexOf('<') + 1, xml.indexOf('>'));
        String value = xml.substring(xml.indexOf('>') + 1, xml.lastIndexOf('<'));
        String json = "{\"" + key + "\":\"" + value + "\"}";
        jsonApi.sendJson(json);
    }

    @Override
    public String receiveXml() {
        String json = jsonApi.receiveJson();
        String inner = json.substring(1, json.length() - 1);
        String[] parts = inner.split(":");
        String key = parts[0].replace("\"", "");
        String value = parts[1].replace("\"", "");
        return "<" + key + ">" + value + "</" + key + ">";
    }
}

class XmlToJsonAdapter implements JsonApi {
    private XmlApi xmlApi;

    public XmlToJsonAdapter(XmlApi xmlApi) {
        this.xmlApi = xmlApi;
    }

    @Override
    public void sendJson(String json) {
        String inner = json.substring(1, json.length() - 1);
        String[] parts = inner.split(":");
        String key = parts[0].replace("\"", "");
        String value = parts[1].replace("\"", "");
        String xml = "<" + key + ">" + value + "</" + key + ">";
        xmlApi.sendXml(xml);
    }

    @Override
    public String receiveJson() {
        String xml = xmlApi.receiveXml();
        String key = xml.substring(xml.indexOf('<') + 1, xml.indexOf('>'));
        String value = xml.substring(xml.indexOf('>') + 1, xml.lastIndexOf('<'));
        return "{\"" + key + "\":\"" + value + "\"}";
    }
}

public class Main {
    public static void main(String[] args) {
        JsonApi jsonService = new JsonService();
        XmlApi xmlService = new XmlService();

        // Use JSON service where XML is expected
        XmlApi jsonAsXml = new JsonToXmlAdapter(jsonService);
        jsonAsXml.sendXml("<data>hello</data>");
        System.out.println("Received: " + jsonAsXml.receiveXml());

        // Use XML service where JSON is expected
        JsonApi xmlAsJson = new XmlToJsonAdapter(xmlService);
        xmlAsJson.sendJson("{\"data\":\"hello\"}");
        System.out.println("Received: " + xmlAsJson.receiveJson());
    }
}
```

```python
from abc import ABC, abstractmethod

class JsonApi(ABC):
    @abstractmethod
    def send_json(self, json_str: str):
        pass

    @abstractmethod
    def receive_json(self) -> str:
        pass

class XmlApi(ABC):
    @abstractmethod
    def send_xml(self, xml_str: str):
        pass

    @abstractmethod
    def receive_xml(self) -> str:
        pass

class JsonService(JsonApi):
    def __init__(self):
        self.last_received = None

    def send_json(self, json_str: str):
        print(f"JsonService: Sent {json_str}")
        self.last_received = json_str

    def receive_json(self) -> str:
        return '{"status":"ok"}'

class XmlService(XmlApi):
    def __init__(self):
        self.last_received = None

    def send_xml(self, xml_str: str):
        print(f"XmlService: Sent {xml_str}")
        self.last_received = xml_str

    def receive_xml(self) -> str:
        return "<status>ok</status>"

class JsonToXmlAdapter(XmlApi):
    def __init__(self, json_api: JsonApi):
        self.json_api = json_api

    def send_xml(self, xml_str: str):
        key = xml_str[xml_str.index('<') + 1:xml_str.index('>')]
        value = xml_str[xml_str.index('>') + 1:xml_str.rindex('<')]
        json_str = '{' + f'"{key}":"{value}"' + '}'
        self.json_api.send_json(json_str)

    def receive_xml(self) -> str:
        json_str = self.json_api.receive_json()
        inner = json_str[1:-1]
        key, value = inner.split(':')
        key = key.strip('"')
        value = value.strip('"')
        return f"<{key}>{value}</{key}>"

class XmlToJsonAdapter(JsonApi):
    def __init__(self, xml_api: XmlApi):
        self.xml_api = xml_api

    def send_json(self, json_str: str):
        inner = json_str[1:-1]
        key, value = inner.split(':')
        key = key.strip('"')
        value = value.strip('"')
        xml_str = f"<{key}>{value}</{key}>"
        self.xml_api.send_xml(xml_str)

    def receive_json(self) -> str:
        xml_str = self.xml_api.receive_xml()
        key = xml_str[xml_str.index('<') + 1:xml_str.index('>')]
        value = xml_str[xml_str.index('>') + 1:xml_str.rindex('<')]
        return '{' + f'"{key}":"{value}"' + '}'

if __name__ == "__main__":
    json_service = JsonService()
    xml_service = XmlService()

    # Use JSON service where XML is expected
    json_as_xml = JsonToXmlAdapter(json_service)
    json_as_xml.send_xml("<data>hello</data>")
    print(f"Received: {json_as_xml.receive_xml()}")

    # Use XML service where JSON is expected
    xml_as_json = XmlToJsonAdapter(xml_service)
    xml_as_json.send_json('{"data":"hello"}')
    print(f"Received: {xml_as_json.receive_json()}")
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class JsonApi {
public:
    virtual void sendJson(string json) = 0;
    virtual string receiveJson() = 0;
    virtual ~JsonApi() {}
};

class XmlApi {
public:
    virtual void sendXml(string xml) = 0;
    virtual string receiveXml() = 0;
    virtual ~XmlApi() {}
};

class JsonService : public JsonApi {
public:
    void sendJson(string json) override {
        cout << "JsonService: Sent " << json << endl;
    }
    string receiveJson() override {
        return "{\"status\":\"ok\"}";
    }
};

class XmlService : public XmlApi {
public:
    void sendXml(string xml) override {
        cout << "XmlService: Sent " << xml << endl;
    }
    string receiveXml() override {
        return "<status>ok</status>";
    }
};

class JsonToXmlAdapter : public XmlApi {
    JsonApi* jsonApi;

public:
    JsonToXmlAdapter(JsonApi* jsonApi) : jsonApi(jsonApi) {}

    void sendXml(string xml) override {
        size_t keyStart = xml.find('<') + 1;
        size_t keyEnd = xml.find('>');
        string key = xml.substr(keyStart, keyEnd - keyStart);
        size_t valStart = keyEnd + 1;
        size_t valEnd = xml.rfind('<');
        string value = xml.substr(valStart, valEnd - valStart);
        string json = "{\"" + key + "\":\"" + value + "\"}";
        jsonApi->sendJson(json);
    }

    string receiveXml() override {
        string json = jsonApi->receiveJson();
        string inner = json.substr(1, json.size() - 2);
        size_t colonPos = inner.find(':');
        string key = inner.substr(1, colonPos - 2);
        string value = inner.substr(colonPos + 2, inner.size() - colonPos - 3);
        return "<" + key + ">" + value + "</" + key + ">";
    }
};

class XmlToJsonAdapter : public JsonApi {
    XmlApi* xmlApi;

public:
    XmlToJsonAdapter(XmlApi* xmlApi) : xmlApi(xmlApi) {}

    void sendJson(string json) override {
        string inner = json.substr(1, json.size() - 2);
        size_t colonPos = inner.find(':');
        string key = inner.substr(1, colonPos - 2);
        string value = inner.substr(colonPos + 2, inner.size() - colonPos - 3);
        string xml = "<" + key + ">" + value + "</" + key + ">";
        xmlApi->sendXml(xml);
    }

    string receiveJson() override {
        string xml = xmlApi->receiveXml();
        size_t keyStart = xml.find('<') + 1;
        size_t keyEnd = xml.find('>');
        string key = xml.substr(keyStart, keyEnd - keyStart);
        size_t valStart = keyEnd + 1;
        size_t valEnd = xml.rfind('<');
        string value = xml.substr(valStart, valEnd - valStart);
        return "{\"" + key + "\":\"" + value + "\"}";
    }
};

int main() {
    JsonService jsonService;
    XmlService xmlService;

    // Use JSON service where XML is expected
    JsonToXmlAdapter jsonAsXml(&jsonService);
    jsonAsXml.sendXml("<data>hello</data>");
    cout << "Received: " << jsonAsXml.receiveXml() << endl;

    // Use XML service where JSON is expected
    XmlToJsonAdapter xmlAsJson(&xmlService);
    xmlAsJson.sendJson("{\"data\":\"hello\"}");
    cout << "Received: " << xmlAsJson.receiveJson() << endl;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type JsonApi interface {
	SendJson(json string)
	ReceiveJson() string
}

type XmlApi interface {
	SendXml(xml string)
	ReceiveXml() string
}

type JsonService struct {
	lastReceived string
}

func (j *JsonService) SendJson(json string) {
	fmt.Printf("JsonService: Sent %s\n", json)
	j.lastReceived = json
}

func (j *JsonService) ReceiveJson() string {
	return "{\"status\":\"ok\"}"
}

type XmlService struct {
	lastReceived string
}

func (x *XmlService) SendXml(xml string) {
	fmt.Printf("XmlService: Sent %s\n", xml)
	x.lastReceived = xml
}

func (x *XmlService) ReceiveXml() string {
	return "<status>ok</status>"
}

type JsonToXmlAdapter struct {
	jsonApi JsonApi
}

func NewJsonToXmlAdapter(jsonApi JsonApi) *JsonToXmlAdapter {
	return &JsonToXmlAdapter{jsonApi: jsonApi}
}

func (a *JsonToXmlAdapter) SendXml(xml string) {
	keyStart := strings.Index(xml, "<") + 1
	keyEnd := strings.Index(xml, ">")
	key := xml[keyStart:keyEnd]
	valStart := keyEnd + 1
	valEnd := strings.LastIndex(xml, "<")
	value := xml[valStart:valEnd]
	json := "{\"" + key + "\":\"" + value + "\"}"
	a.jsonApi.SendJson(json)
}

func (a *JsonToXmlAdapter) ReceiveXml() string {
	json := a.jsonApi.ReceiveJson()
	inner := json[1 : len(json)-1]
	parts := strings.SplitN(inner, ":", 2)
	key := strings.ReplaceAll(parts[0], "\"", "")
	value := strings.ReplaceAll(parts[1], "\"", "")
	return "<" + key + ">" + value + "</" + key + ">"
}

type XmlToJsonAdapter struct {
	xmlApi XmlApi
}

func NewXmlToJsonAdapter(xmlApi XmlApi) *XmlToJsonAdapter {
	return &XmlToJsonAdapter{xmlApi: xmlApi}
}

func (a *XmlToJsonAdapter) SendJson(json string) {
	inner := json[1 : len(json)-1]
	parts := strings.SplitN(inner, ":", 2)
	key := strings.ReplaceAll(parts[0], "\"", "")
	value := strings.ReplaceAll(parts[1], "\"", "")
	xml := "<" + key + ">" + value + "</" + key + ">"
	a.xmlApi.SendXml(xml)
}

func (a *XmlToJsonAdapter) ReceiveJson() string {
	xml := a.xmlApi.ReceiveXml()
	keyStart := strings.Index(xml, "<") + 1
	keyEnd := strings.Index(xml, ">")
	key := xml[keyStart:keyEnd]
	valStart := keyEnd + 1
	valEnd := strings.LastIndex(xml, "<")
	value := xml[valStart:valEnd]
	return "{\"" + key + "\":\"" + value + "\"}"
}

func main() {
	jsonService := &JsonService{}
	xmlService := &XmlService{}

	// Use JSON service where XML is expected
	jsonAsXml := NewJsonToXmlAdapter(jsonService)
	jsonAsXml.SendXml("<data>hello</data>")
	fmt.Printf("Received: %s\n", jsonAsXml.ReceiveXml())

	// Use XML service where JSON is expected
	xmlAsJson := NewXmlToJsonAdapter(xmlService)
	xmlAsJson.SendJson("{\"data\":\"hello\"}")
	fmt.Printf("Received: %s\n", xmlAsJson.ReceiveJson())
}
```

```csharp
using System;

interface IJsonApi
{
    void SendJson(string json);
    string ReceiveJson();
}

interface IXmlApi
{
    void SendXml(string xml);
    string ReceiveXml();
}

class JsonService : IJsonApi
{
    public void SendJson(string json) => Console.WriteLine($"JsonService: Sent {json}");
    public string ReceiveJson() => "{\"status\":\"ok\"}";
}

class XmlService : IXmlApi
{
    public void SendXml(string xml) => Console.WriteLine($"XmlService: Sent {xml}");
    public string ReceiveXml() => "<status>ok</status>";
}

class JsonToXmlAdapter : IXmlApi
{
    private IJsonApi jsonApi;

    public JsonToXmlAdapter(IJsonApi jsonApi)
    {
        this.jsonApi = jsonApi;
    }

    public void SendXml(string xml)
    {
        int keyStart = xml.IndexOf('<') + 1;
        int keyEnd = xml.IndexOf('>');
        string key = xml.Substring(keyStart, keyEnd - keyStart);
        int valStart = keyEnd + 1;
        int valEnd = xml.LastIndexOf('<');
        string value = xml.Substring(valStart, valEnd - valStart);
        string json = "{\"" + key + "\":\"" + value + "\"}";
        jsonApi.SendJson(json);
    }

    public string ReceiveXml()
    {
        string json = jsonApi.ReceiveJson();
        string inner = json.Substring(1, json.Length - 2);
        int colonPos = inner.IndexOf(':');
        string key = inner.Substring(1, colonPos - 2);
        string value = inner.Substring(colonPos + 2, inner.Length - colonPos - 3);
        return $"<{key}>{value}</{key}>";
    }
}

class XmlToJsonAdapter : IJsonApi
{
    private IXmlApi xmlApi;

    public XmlToJsonAdapter(IXmlApi xmlApi)
    {
        this.xmlApi = xmlApi;
    }

    public void SendJson(string json)
    {
        string inner = json.Substring(1, json.Length - 2);
        int colonPos = inner.IndexOf(':');
        string key = inner.Substring(1, colonPos - 2);
        string value = inner.Substring(colonPos + 2, inner.Length - colonPos - 3);
        string xml = $"<{key}>{value}</{key}>";
        xmlApi.SendXml(xml);
    }

    public string ReceiveJson()
    {
        string xml = xmlApi.ReceiveXml();
        int keyStart = xml.IndexOf('<') + 1;
        int keyEnd = xml.IndexOf('>');
        string key = xml.Substring(keyStart, keyEnd - keyStart);
        int valStart = keyEnd + 1;
        int valEnd = xml.LastIndexOf('<');
        string value = xml.Substring(valStart, valEnd - valStart);
        return "{\"" + key + "\":\"" + value + "\"}";
    }
}

public class Program
{
    public static void Main()
    {
        IJsonApi jsonService = new JsonService();
        IXmlApi xmlService = new XmlService();

        // Use JSON service where XML is expected
        IXmlApi jsonAsXml = new JsonToXmlAdapter(jsonService);
        jsonAsXml.SendXml("<data>hello</data>");
        Console.WriteLine($"Received: {jsonAsXml.ReceiveXml()}");

        // Use XML service where JSON is expected
        IJsonApi xmlAsJson = new XmlToJsonAdapter(xmlService);
        xmlAsJson.SendJson("{\"data\":\"hello\"}");
        Console.WriteLine($"Received: {xmlAsJson.ReceiveJson()}");
    }
}
```

```typescript
interface JsonApi {
    sendJson(json: string): void;
    receiveJson(): string;
}

interface XmlApi {
    sendXml(xml: string): void;
    receiveXml(): string;
}

class JsonService implements JsonApi {
    sendJson(json: string): void { console.log(`JsonService: Sent ${json}`); }
    receiveJson(): string { return '{"status":"ok"}'; }
}

class XmlService implements XmlApi {
    sendXml(xml: string): void { console.log(`XmlService: Sent ${xml}`); }
    receiveXml(): string { return "<status>ok</status>"; }
}

class JsonToXmlAdapter implements XmlApi {
    private jsonApi: JsonApi;

    constructor(jsonApi: JsonApi) {
        this.jsonApi = jsonApi;
    }

    sendXml(xml: string): void {
        const keyStart = xml.indexOf('<') + 1;
        const keyEnd = xml.indexOf('>');
        const key = xml.substring(keyStart, keyEnd);
        const valStart = keyEnd + 1;
        const valEnd = xml.lastIndexOf('<');
        const value = xml.substring(valStart, valEnd);
        const json = `{"${key}":"${value}"}`;
        this.jsonApi.sendJson(json);
    }

    receiveXml(): string {
        const json = this.jsonApi.receiveJson();
        const inner = json.substring(1, json.length - 1);
        const colonPos = inner.indexOf(':');
        const key = inner.substring(1, colonPos - 1);
        const value = inner.substring(colonPos + 2, inner.length - 1);
        return `<${key}>${value}</${key}>`;
    }
}

class XmlToJsonAdapter implements JsonApi {
    private xmlApi: XmlApi;

    constructor(xmlApi: XmlApi) {
        this.xmlApi = xmlApi;
    }

    sendJson(json: string): void {
        const inner = json.substring(1, json.length - 1);
        const colonPos = inner.indexOf(':');
        const key = inner.substring(1, colonPos - 1);
        const value = inner.substring(colonPos + 2, inner.length - 1);
        const xml = `<${key}>${value}</${key}>`;
        this.xmlApi.sendXml(xml);
    }

    receiveJson(): string {
        const xml = this.xmlApi.receiveXml();
        const keyStart = xml.indexOf('<') + 1;
        const keyEnd = xml.indexOf('>');
        const key = xml.substring(keyStart, keyEnd);
        const valStart = keyEnd + 1;
        const valEnd = xml.lastIndexOf('<');
        const value = xml.substring(valStart, valEnd);
        return `{"${key}":"${value}"}`;
    }
}

const jsonService: JsonApi = new JsonService();
const xmlService: XmlApi = new XmlService();

// Use JSON service where XML is expected
const jsonAsXml: XmlApi = new JsonToXmlAdapter(jsonService);
jsonAsXml.sendXml("<data>hello</data>");
console.log(`Received: ${jsonAsXml.receiveXml()}`);

// Use XML service where JSON is expected
const xmlAsJson: JsonApi = new XmlToJsonAdapter(xmlService);
xmlAsJson.sendJson('{"data":"hello"}');
console.log(`Received: ${xmlAsJson.receiveJson()}`);
```


