---
id: "lld-solid-principles-exercise-dependency-inversion-principle"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - SOLID Principles"
subSection: ""
title: "Exercise: Dependency Inversion Principle"
slug: "lld-solid-principles-exercise-dependency-inversion-principle"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Dependency Inversion Principle as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Dependency Inversion Principle Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","SOLID Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: OrderService and Database

<!-- payload:lldCodingPracticeBlock:START {"id":"698f570e41740cf3d58e6d13","title":"Refactor OrderService","difficulty":"","expectedOutput":"--- MySQL ---\nPlacing order: ORD-001\nMySQL: Inserting into orders -> { item: 'Widget', qty: 3 }\nOrder placed successfully.\nMySQL: Querying orders for id ORD-001\nOrder: { id: ORD-001, item: 'Widget' }\n\n--- PostgreSQL ---\nPlacing order: ORD-001\nPostgreSQL: Inserting into orders -> { item: 'Widget', qty: 3 }\nOrder placed successfully.\nPostgreSQL: Querying orders for id ORD-001\nOrder: { id: ORD-001, item: 'Widget' }"} -->
**Problem:** An `OrderService` directly creates and uses a `MySQLDatabase` object to save orders. If you want to switch to PostgreSQL or MongoDB, you would have to rewrite `OrderService`. Refactor by introducing a `Database` interface so `OrderService` depends on the abstraction, not the concrete database. Then add a `PostgresDatabase` implementation and show both databases working with the same `OrderService`.

**Requirements:**

- Create a `Database` interface with `insert(table, data)` and `query(table, id)` methods
- Make `MySQLDatabase` implement the `Database` interface
- Create a `PostgresDatabase` implementation that prints "PostgreSQL: ..." instead of "MySQL: ..."
- Refactor `OrderService` to accept a `Database` through its constructor instead of creating one internally
- Show `OrderService` working with both databases without changing `OrderService`

```java
// Before: OrderService is tightly coupled to MySQLDatabase
class MySQLDatabase {
    public void insert(String table, String data) {
        System.out.println("MySQL: Inserting into " + table + " -> " + data);
    }

    public String query(String table, String id) {
        System.out.println("MySQL: Querying " + table + " for id " + id);
        return "{ id: " + id + ", item: 'Widget' }";
    }
}

class OrderService {
    private MySQLDatabase database;

    public OrderService() {
        this.database = new MySQLDatabase(); // Direct dependency!
    }

    public void placeOrder(String orderId, String orderData) {
        System.out.println("Placing order: " + orderId);
        database.insert("orders", orderData);
        System.out.println("Order placed successfully.");
    }

    public String getOrder(String orderId) {
        return database.query("orders", orderId);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        OrderService service = new OrderService();
        service.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
        String order = service.getOrder("ORD-001");
        System.out.println("Order: " + order);
    }
}

// TODO: Create a Database interface with insert() and query() methods.
// TODO: Make MySQLDatabase implement the interface.
// TODO: Create a PostgresDatabase that prints "PostgreSQL: ..." instead of "MySQL: ...".
// TODO: Refactor OrderService to accept a Database via its constructor.
```

```python
# Before: OrderService is tightly coupled to MySQLDatabase
class MySQLDatabase:
    def insert(self, table: str, data: str) -> None:
        print(f"MySQL: Inserting into {table} -> {data}")

    def query(self, table: str, id: str) -> str:
        print(f"MySQL: Querying {table} for id {id}")
        return f"{{ id: {id}, item: 'Widget' }}"

class OrderService:
    def __init__(self):
        self.database = MySQLDatabase()  # Direct dependency!

    def place_order(self, order_id: str, order_data: str) -> None:
        print(f"Placing order: {order_id}")
        self.database.insert("orders", order_data)
        print("Order placed successfully.")

    def get_order(self, order_id: str) -> str:
        return self.database.query("orders", order_id)

if __name__ == "__main__":
    service = OrderService()
    service.place_order("ORD-001", "{ item: 'Widget', qty: 3 }")
    order = service.get_order("ORD-001")
    print(f"Order: {order}")

# TODO: Create a Database ABC with insert() and query() methods.
# TODO: Make MySQLDatabase implement the interface.
# TODO: Create a PostgresDatabase that prints "PostgreSQL: ..." instead of "MySQL: ...".
# TODO: Refactor OrderService to accept a Database via its constructor.
```

```cpp
#include <iostream>
#include <string>
#include <memory>

using namespace std;

// Before: OrderService is tightly coupled to MySQLDatabase
class MySQLDatabase {
public:
    void insert(const string& table, const string& data) {
        cout << "MySQL: Inserting into " << table << " -> " << data << endl;
    }

    string query(const string& table, const string& id) {
        cout << "MySQL: Querying " << table << " for id " << id << endl;
        return "{ id: " + id + ", item: 'Widget' }";
    }
};

class OrderService {
private:
    MySQLDatabase database; // Direct dependency!

public:
    void placeOrder(const string& orderId, const string& orderData) {
        cout << "Placing order: " << orderId << endl;
        database.insert("orders", orderData);
        cout << "Order placed successfully." << endl;
    }

    string getOrder(const string& orderId) {
        return database.query("orders", orderId);
    }
};

int main() {
    OrderService service;
    service.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
    string order = service.getOrder("ORD-001");
    cout << "Order: " << order << endl;
    return 0;
}

// TODO: Create a Database interface (abstract class) with insert() and query().
// TODO: Make MySQLDatabase implement the interface.
// TODO: Create a PostgresDatabase that prints "PostgreSQL: ..." instead of "MySQL: ...".
// TODO: Refactor OrderService to accept a Database via its constructor.
```

```go
package main

import "fmt"

// Before: OrderService is tightly coupled to MySQLDatabase
type Database interface {
	Insert(table string, data string)
	Query(table string, id string) string
}

type MySQLDatabase struct{}

func (m *MySQLDatabase) Insert(table string, data string) {
	// TODO: implement
	fmt.Println("MySQL: Inserting into", table, "->", data)
}

func (m *MySQLDatabase) Query(table string, id string) string {
	// TODO: implement
	fmt.Println("MySQL: Querying", table, "for id", id)
	return ""
}

type PostgresDatabase struct{}

func (p *PostgresDatabase) Insert(table string, data string) {
	// TODO: implement
	fmt.Println("PostgreSQL: Inserting into", table, "->", data)
}

func (p *PostgresDatabase) Query(table string, id string) string {
	// TODO: implement
	fmt.Println("PostgreSQL: Querying", table, "for id", id)
	return ""
}

type OrderService struct {
	database Database
}

func NewOrderService() *OrderService {
	// TODO: refactor to accept a Database via constructor
	return &OrderService{
		database: &MySQLDatabase{},
	}
}

func (o *OrderService) PlaceOrder(orderId string, orderData string) {
	// TODO: implement
	fmt.Println("Placing order:", orderId)
	o.database.Insert("orders", orderData)
	fmt.Println("Order placed successfully.")
}

func (o *OrderService) GetOrder(orderId string) string {
	// TODO: implement
	return o.database.Query("orders", orderId)
}

func main() {
	service := NewOrderService()
	service.PlaceOrder("ORD-001", "{ item: 'Widget', qty: 3 }")
	order := service.GetOrder("ORD-001")
	fmt.Println("Order:", order)
}

// TODO: Create a Database interface with Insert() and Query() methods.
// TODO: Make MySQLDatabase implement the interface.
// TODO: Create a PostgresDatabase that prints "PostgreSQL: ..." instead of "MySQL: ...".
// TODO: Refactor OrderService to accept a Database via its constructor.
```

```csharp
using System;

// Before: OrderService is tightly coupled to MySQLDatabase
class MySQLDatabase
{
    public void Insert(string table, string data)
    {
        Console.WriteLine($"MySQL: Inserting into {table} -> {data}");
    }

    public string Query(string table, string id)
    {
        Console.WriteLine($"MySQL: Querying {table} for id {id}");
        return $"{{ id: {id}, item: 'Widget' }}";
    }
}

class OrderService
{
    private MySQLDatabase _database;

    public OrderService()
    {
        _database = new MySQLDatabase(); // Direct dependency!
    }

    public void PlaceOrder(string orderId, string orderData)
    {
        Console.WriteLine($"Placing order: {orderId}");
        _database.Insert("orders", orderData);
        Console.WriteLine("Order placed successfully.");
    }

    public string GetOrder(string orderId)
    {
        return _database.Query("orders", orderId);
    }
}

// Usage
class Program
{
    static void Main()
    {
        var service = new OrderService();
        service.PlaceOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
        string order = service.GetOrder("ORD-001");
        Console.WriteLine($"Order: {order}");
    }
}

// TODO: Create an IDatabase interface with Insert() and Query() methods.
// TODO: Make MySQLDatabase implement the interface.
// TODO: Create a PostgresDatabase that prints "PostgreSQL: ..." instead of "MySQL: ...".
// TODO: Refactor OrderService to accept an IDatabase via its constructor.
```

```typescript
// Before: OrderService is tightly coupled to MySQLDatabase
class MySQLDatabase {
    insert(table: string, data: string): void {
        console.log(`MySQL: Inserting into ${table} -> ${data}`);
    }

    query(table: string, id: string): string {
        console.log(`MySQL: Querying ${table} for id ${id}`);
        return `{ id: ${id}, item: 'Widget' }`;
    }
}

class OrderService {
    private database: MySQLDatabase;

    constructor() {
        this.database = new MySQLDatabase(); // Direct dependency!
    }

    placeOrder(orderId: string, orderData: string): void {
        console.log(`Placing order: ${orderId}`);
        this.database.insert("orders", orderData);
        console.log("Order placed successfully.");
    }

    getOrder(orderId: string): string {
        return this.database.query("orders", orderId);
    }
}

// Usage
const service = new OrderService();
service.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
const order = service.getOrder("ORD-001");
console.log(`Order: ${order}`);

// TODO: Create a Database interface with insert() and query() methods.
// TODO: Make MySQLDatabase implement the interface.
// TODO: Create a PostgresDatabase that prints "PostgreSQL: ..." instead of "MySQL: ...".
// TODO: Refactor OrderService to accept a Database via its constructor.
```

#### Solutions

```java
interface Database {
    void insert(String table, String data);
    String query(String table, String id);
}

class MySQLDatabase implements Database {
    @Override
    public void insert(String table, String data) {
        System.out.println("MySQL: Inserting into " + table + " -> " + data);
    }

    @Override
    public String query(String table, String id) {
        System.out.println("MySQL: Querying " + table + " for id " + id);
        return "{ id: " + id + ", item: 'Widget' }";
    }
}

class PostgresDatabase implements Database {
    @Override
    public void insert(String table, String data) {
        System.out.println("PostgreSQL: Inserting into " + table + " -> " + data);
    }

    @Override
    public String query(String table, String id) {
        System.out.println("PostgreSQL: Querying " + table + " for id " + id);
        return "{ id: " + id + ", item: 'Widget' }";
    }
}

class OrderService {
    private final Database database;

    public OrderService(Database database) {
        this.database = database;
    }

    public void placeOrder(String orderId, String orderData) {
        System.out.println("Placing order: " + orderId);
        database.insert("orders", orderData);
        System.out.println("Order placed successfully.");
    }

    public String getOrder(String orderId) {
        return database.query("orders", orderId);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("--- MySQL ---");
        Database mysql = new MySQLDatabase();
        OrderService mysqlService = new OrderService(mysql);
        mysqlService.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
        String order1 = mysqlService.getOrder("ORD-001");
        System.out.println("Order: " + order1);

        System.out.println();
        System.out.println("--- PostgreSQL ---");
        Database postgres = new PostgresDatabase();
        OrderService pgService = new OrderService(postgres);
        pgService.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
        String order2 = pgService.getOrder("ORD-001");
        System.out.println("Order: " + order2);
    }
}
```

```python
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def insert(self, table: str, data: str) -> None:
        pass

    @abstractmethod
    def query(self, table: str, id: str) -> str:
        pass

class MySQLDatabase(Database):
    def insert(self, table: str, data: str) -> None:
        print(f"MySQL: Inserting into {table} -> {data}")

    def query(self, table: str, id: str) -> str:
        print(f"MySQL: Querying {table} for id {id}")
        return f"{{ id: {id}, item: 'Widget' }}"

class PostgresDatabase(Database):
    def insert(self, table: str, data: str) -> None:
        print(f"PostgreSQL: Inserting into {table} -> {data}")

    def query(self, table: str, id: str) -> str:
        print(f"PostgreSQL: Querying {table} for id {id}")
        return f"{{ id: {id}, item: 'Widget' }}"

class OrderService:
    def __init__(self, database: Database):
        self.database = database

    def place_order(self, order_id: str, order_data: str) -> None:
        print(f"Placing order: {order_id}")
        self.database.insert("orders", order_data)
        print("Order placed successfully.")

    def get_order(self, order_id: str) -> str:
        return self.database.query("orders", order_id)

if __name__ == "__main__":
    print("--- MySQL ---")
    mysql = MySQLDatabase()
    mysql_service = OrderService(mysql)
    mysql_service.place_order("ORD-001", "{ item: 'Widget', qty: 3 }")
    order1 = mysql_service.get_order("ORD-001")
    print(f"Order: {order1}")

    print()
    print("--- PostgreSQL ---")
    postgres = PostgresDatabase()
    pg_service = OrderService(postgres)
    pg_service.place_order("ORD-001", "{ item: 'Widget', qty: 3 }")
    order2 = pg_service.get_order("ORD-001")
    print(f"Order: {order2}")
```

```cpp
#include <iostream>
#include <string>
#include <memory>

using namespace std;

class Database {
public:
    virtual ~Database() = default;
    virtual void insert(const string& table, const string& data) = 0;
    virtual string query(const string& table, const string& id) = 0;
};

class MySQLDatabase : public Database {
public:
    void insert(const string& table, const string& data) override {
        cout << "MySQL: Inserting into " << table << " -> " << data << endl;
    }

    string query(const string& table, const string& id) override {
        cout << "MySQL: Querying " << table << " for id " << id << endl;
        return "{ id: " + id + ", item: 'Widget' }";
    }
};

class PostgresDatabase : public Database {
public:
    void insert(const string& table, const string& data) override {
        cout << "PostgreSQL: Inserting into " << table << " -> " << data << endl;
    }

    string query(const string& table, const string& id) override {
        cout << "PostgreSQL: Querying " << table << " for id " << id << endl;
        return "{ id: " + id + ", item: 'Widget' }";
    }
};

class OrderService {
private:
    unique_ptr<Database> database;

public:
    OrderService(unique_ptr<Database> db) : database(move(db)) {}

    void placeOrder(const string& orderId, const string& orderData) {
        cout << "Placing order: " << orderId << endl;
        database->insert("orders", orderData);
        cout << "Order placed successfully." << endl;
    }

    string getOrder(const string& orderId) {
        return database->query("orders", orderId);
    }
};

int main() {
    cout << "--- MySQL ---" << endl;
    auto mysqlService = OrderService(make_unique<MySQLDatabase>());
    mysqlService.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
    string order1 = mysqlService.getOrder("ORD-001");
    cout << "Order: " << order1 << endl;

    cout << endl;
    cout << "--- PostgreSQL ---" << endl;
    auto pgService = OrderService(make_unique<PostgresDatabase>());
    pgService.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
    string order2 = pgService.getOrder("ORD-001");
    cout << "Order: " << order2 << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Database interface {
	insert(table string, data string)
	query(table string, id string) string
}

type MySQLDatabase struct{}

func (m *MySQLDatabase) insert(table string, data string) {
	fmt.Printf("MySQL: Inserting into %s -> %s\n", table, data)
}

func (m *MySQLDatabase) query(table string, id string) string {
	fmt.Printf("MySQL: Querying %s for id %s\n", table, id)
	return fmt.Sprintf("{ id: %s, item: 'Widget' }", id)
}

type PostgresDatabase struct{}

func (p *PostgresDatabase) insert(table string, data string) {
	fmt.Printf("PostgreSQL: Inserting into %s -> %s\n", table, data)
}

func (p *PostgresDatabase) query(table string, id string) string {
	fmt.Printf("PostgreSQL: Querying %s for id %s\n", table, id)
	return fmt.Sprintf("{ id: %s, item: 'Widget' }", id)
}

type OrderService struct {
	database Database
}

func NewOrderService(database Database) *OrderService {
	return &OrderService{database: database}
}

func (o *OrderService) placeOrder(orderId string, orderData string) {
	fmt.Printf("Placing order: %s\n", orderId)
	o.database.insert("orders", orderData)
	fmt.Println("Order placed successfully.")
}

func (o *OrderService) getOrder(orderId string) string {
	return o.database.query("orders", orderId)
}

func main() {
	fmt.Println("--- MySQL ---")
	mysql := &MySQLDatabase{}
	mysqlService := NewOrderService(mysql)
	mysqlService.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }")
	order1 := mysqlService.getOrder("ORD-001")
	fmt.Printf("Order: %s\n", order1)

	fmt.Println()
	fmt.Println("--- PostgreSQL ---")
	postgres := &PostgresDatabase{}
	pgService := NewOrderService(postgres)
	pgService.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }")
	order2 := pgService.getOrder("ORD-001")
	fmt.Printf("Order: %s\n", order2)
}
```

```csharp
using System;

interface IDatabase
{
    void Insert(string table, string data);
    string Query(string table, string id);
}

class MySQLDatabase : IDatabase
{
    public void Insert(string table, string data)
    {
        Console.WriteLine($"MySQL: Inserting into {table} -> {data}");
    }

    public string Query(string table, string id)
    {
        Console.WriteLine($"MySQL: Querying {table} for id {id}");
        return $"{{ id: {id}, item: 'Widget' }}";
    }
}

class PostgresDatabase : IDatabase
{
    public void Insert(string table, string data)
    {
        Console.WriteLine($"PostgreSQL: Inserting into {table} -> {data}");
    }

    public string Query(string table, string id)
    {
        Console.WriteLine($"PostgreSQL: Querying {table} for id {id}");
        return $"{{ id: {id}, item: 'Widget' }}";
    }
}

class OrderService
{
    private readonly IDatabase _database;

    public OrderService(IDatabase database)
    {
        _database = database;
    }

    public void PlaceOrder(string orderId, string orderData)
    {
        Console.WriteLine($"Placing order: {orderId}");
        _database.Insert("orders", orderData);
        Console.WriteLine("Order placed successfully.");
    }

    public string GetOrder(string orderId)
    {
        return _database.Query("orders", orderId);
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("--- MySQL ---");
        IDatabase mysql = new MySQLDatabase();
        var mysqlService = new OrderService(mysql);
        mysqlService.PlaceOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
        string order1 = mysqlService.GetOrder("ORD-001");
        Console.WriteLine($"Order: {order1}");

        Console.WriteLine();
        Console.WriteLine("--- PostgreSQL ---");
        IDatabase postgres = new PostgresDatabase();
        var pgService = new OrderService(postgres);
        pgService.PlaceOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
        string order2 = pgService.GetOrder("ORD-001");
        Console.WriteLine($"Order: {order2}");
    }
}
```

```typescript
interface Database {
    insert(table: string, data: string): void;
    query(table: string, id: string): string;
}

class MySQLDatabase implements Database {
    insert(table: string, data: string): void {
        console.log(`MySQL: Inserting into ${table} -> ${data}`);
    }

    query(table: string, id: string): string {
        console.log(`MySQL: Querying ${table} for id ${id}`);
        return `{ id: ${id}, item: 'Widget' }`;
    }
}

class PostgresDatabase implements Database {
    insert(table: string, data: string): void {
        console.log(`PostgreSQL: Inserting into ${table} -> ${data}`);
    }

    query(table: string, id: string): string {
        console.log(`PostgreSQL: Querying ${table} for id ${id}`);
        return `{ id: ${id}, item: 'Widget' }`;
    }
}

class OrderService {
    private database: Database;

    constructor(database: Database) {
        this.database = database;
    }

    placeOrder(orderId: string, orderData: string): void {
        console.log(`Placing order: ${orderId}`);
        this.database.insert("orders", orderData);
        console.log("Order placed successfully.");
    }

    getOrder(orderId: string): string {
        return this.database.query("orders", orderId);
    }
}

// Main
console.log("--- MySQL ---");
const mysqlService = new OrderService(new MySQLDatabase());
mysqlService.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
const order1 = mysqlService.getOrder("ORD-001");
console.log(`Order: ${order1}`);

console.log();
console.log("--- PostgreSQL ---");
const pgService = new OrderService(new PostgresDatabase());
pgService.placeOrder("ORD-001", "{ item: 'Widget', qty: 3 }");
const order2 = pgService.getOrder("ORD-001");
console.log(`Order: ${order2}`);
```

---

# Exercise 2: WeatherApp and Weather Provider

**Problem:** A `WeatherApp` directly calls `OpenWeatherMapAPI` to fetch weather data. If you want to switch to a different weather API (like WeatherStack or a local mock for testing), you would have to modify `WeatherApp`. Refactor by introducing a `WeatherProvider` interface so the app can work with any weather data source.

**Requirements:**

- Create a `WeatherProvider` interface with a `getWeather(city)` method
- Create `OpenWeatherMapProvider` that implements the interface (wrapping the API call)
- Create `WeatherStackProvider` as a second implementation that returns different simulated data
- Refactor `WeatherApp` to accept a `WeatherProvider` through its constructor
- Show the app working with both providers without changing `WeatherApp`

```java
// Before: WeatherApp is tightly coupled to OpenWeatherMapAPI
class OpenWeatherMapAPI {
    public String fetchWeather(String city) {
        System.out.println("Calling OpenWeatherMap API for: " + city);
        // Simulated API response
        return "Sunny, 25C";
    }
}

class WeatherApp {
    private OpenWeatherMapAPI api;

    public WeatherApp() {
        this.api = new OpenWeatherMapAPI(); // Direct dependency!
    }

    public void displayWeather(String city) {
        String weather = api.fetchWeather(city);
        System.out.println("Weather in " + city + ": " + weather);
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        WeatherApp app = new WeatherApp();
        app.displayWeather("London");
    }
}

// TODO: Create a WeatherProvider interface with a getWeather(city) method.
// TODO: Make OpenWeatherMapProvider implement the interface.
// TODO: Refactor WeatherApp to accept a WeatherProvider via its constructor.
```

```python
# Before: WeatherApp is tightly coupled to OpenWeatherMapAPI
class OpenWeatherMapAPI:
    def fetch_weather(self, city: str) -> str:
        print(f"Calling OpenWeatherMap API for: {city}")
        return "Sunny, 25C"

class WeatherApp:
    def __init__(self):
        self.api = OpenWeatherMapAPI()  # Direct dependency!

    def display_weather(self, city: str) -> None:
        weather = self.api.fetch_weather(city)
        print(f"Weather in {city}: {weather}")

if __name__ == "__main__":
    app = WeatherApp()
    app.display_weather("London")

# TODO: Create a WeatherProvider ABC with a get_weather(city) method.
# TODO: Refactor WeatherApp to accept a WeatherProvider via its constructor.
```

```cpp
#include <iostream>
#include <string>
#include <memory>

using namespace std;

// Before: WeatherApp is tightly coupled to OpenWeatherMapAPI
class OpenWeatherMapAPI {
public:
    string fetchWeather(const string& city) {
        cout << "Calling OpenWeatherMap API for: " << city << endl;
        return "Sunny, 25C";
    }
};

class WeatherApp {
private:
    OpenWeatherMapAPI api; // Direct dependency!

public:
    void displayWeather(const string& city) {
        string weather = api.fetchWeather(city);
        cout << "Weather in " << city << ": " << weather << endl;
    }
};

int main() {
    WeatherApp app;
    app.displayWeather("London");
    return 0;
}

// TODO: Create a WeatherProvider interface (abstract class).
// TODO: Refactor WeatherApp to accept a WeatherProvider via its constructor.
```

```go
package main

import "fmt"

// Before: WeatherApp is tightly coupled to OpenWeatherMapAPI
type OpenWeatherMapAPI struct{}

func (o *OpenWeatherMapAPI) fetchWeather(city string) string {
	fmt.Println("Calling OpenWeatherMap API for:", city)
	// Simulated API response
	return "Sunny, 25C"
}

type WeatherApp struct {
	api *OpenWeatherMapAPI
}

func NewWeatherApp() *WeatherApp {
	return &WeatherApp{
		api: &OpenWeatherMapAPI{}, // Direct dependency!
	}
}

func (w *WeatherApp) displayWeather(city string) {
	weather := w.api.fetchWeather(city)
	fmt.Println("Weather in", city+":", weather)
}

func main() {
	app := NewWeatherApp()
	app.displayWeather("London")
}

// TODO: Create a WeatherProvider interface with a getWeather(city) method.
// TODO: Make OpenWeatherMapProvider implement the interface.
// TODO: Refactor WeatherApp to accept a WeatherProvider via its constructor.
```

```csharp
using System;

// Before: WeatherApp is tightly coupled to OpenWeatherMapAPI
class OpenWeatherMapAPI
{
    public string FetchWeather(string city)
    {
        Console.WriteLine($"Calling OpenWeatherMap API for: {city}");
        return "Sunny, 25C";
    }
}

class WeatherApp
{
    private OpenWeatherMapAPI _api;

    public WeatherApp()
    {
        _api = new OpenWeatherMapAPI(); // Direct dependency!
    }

    public void DisplayWeather(string city)
    {
        string weather = _api.FetchWeather(city);
        Console.WriteLine($"Weather in {city}: {weather}");
    }
}

// Usage
class Program
{
    static void Main()
    {
        var app = new WeatherApp();
        app.DisplayWeather("London");
    }
}

// TODO: Create an IWeatherProvider interface with a GetWeather(city) method.
// TODO: Refactor WeatherApp to accept an IWeatherProvider via its constructor.
```

```typescript
// Before: WeatherApp is tightly coupled to OpenWeatherMapAPI
class OpenWeatherMapAPI {
    fetchWeather(city: string): string {
        console.log(`Calling OpenWeatherMap API for: ${city}`);
        return "Sunny, 25C";
    }
}

class WeatherApp {
    private api: OpenWeatherMapAPI;

    constructor() {
        this.api = new OpenWeatherMapAPI(); // Direct dependency!
    }

    displayWeather(city: string): void {
        const weather = this.api.fetchWeather(city);
        console.log(`Weather in ${city}: ${weather}`);
    }
}

// Usage
const app = new WeatherApp();
app.displayWeather("London");

// TODO: Create a WeatherProvider interface with a getWeather(city) method.
// TODO: Refactor WeatherApp to accept a WeatherProvider via its constructor.
```

#### Solutions

```java
interface WeatherProvider {
    String getWeather(String city);
}

class OpenWeatherMapProvider implements WeatherProvider {
    @Override
    public String getWeather(String city) {
        System.out.println("Calling OpenWeatherMap API for: " + city);
        return "Sunny, 25C";
    }
}

class WeatherStackProvider implements WeatherProvider {
    @Override
    public String getWeather(String city) {
        System.out.println("Calling WeatherStack API for: " + city);
        return "Cloudy, 18C";
    }
}

class WeatherApp {
    private final WeatherProvider provider;

    public WeatherApp(WeatherProvider provider) {
        this.provider = provider;
    }

    public void displayWeather(String city) {
        String weather = provider.getWeather(city);
        System.out.println("Weather in " + city + ": " + weather);
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("--- OpenWeatherMap ---");
        WeatherApp app1 = new WeatherApp(new OpenWeatherMapProvider());
        app1.displayWeather("London");

        System.out.println();
        System.out.println("--- WeatherStack ---");
        WeatherApp app2 = new WeatherApp(new WeatherStackProvider());
        app2.displayWeather("London");
    }
}
```

```python
from abc import ABC, abstractmethod

class WeatherProvider(ABC):
    @abstractmethod
    def get_weather(self, city: str) -> str:
        pass

class OpenWeatherMapProvider(WeatherProvider):
    def get_weather(self, city: str) -> str:
        print(f"Calling OpenWeatherMap API for: {city}")
        return "Sunny, 25C"

class WeatherStackProvider(WeatherProvider):
    def get_weather(self, city: str) -> str:
        print(f"Calling WeatherStack API for: {city}")
        return "Cloudy, 18C"

class WeatherApp:
    def __init__(self, provider: WeatherProvider):
        self.provider = provider

    def display_weather(self, city: str) -> None:
        weather = self.provider.get_weather(city)
        print(f"Weather in {city}: {weather}")

if __name__ == "__main__":
    print("--- OpenWeatherMap ---")
    app1 = WeatherApp(OpenWeatherMapProvider())
    app1.display_weather("London")

    print()
    print("--- WeatherStack ---")
    app2 = WeatherApp(WeatherStackProvider())
    app2.display_weather("London")
```

```cpp
#include <iostream>
#include <string>
#include <memory>

using namespace std;

class WeatherProvider {
public:
    virtual ~WeatherProvider() = default;
    virtual string getWeather(const string& city) = 0;
};

class OpenWeatherMapProvider : public WeatherProvider {
public:
    string getWeather(const string& city) override {
        cout << "Calling OpenWeatherMap API for: " << city << endl;
        return "Sunny, 25C";
    }
};

class WeatherStackProvider : public WeatherProvider {
public:
    string getWeather(const string& city) override {
        cout << "Calling WeatherStack API for: " << city << endl;
        return "Cloudy, 18C";
    }
};

class WeatherApp {
private:
    unique_ptr<WeatherProvider> provider;

public:
    WeatherApp(unique_ptr<WeatherProvider> p) : provider(move(p)) {}

    void displayWeather(const string& city) {
        string weather = provider->getWeather(city);
        cout << "Weather in " << city << ": " << weather << endl;
    }
};

int main() {
    cout << "--- OpenWeatherMap ---" << endl;
    WeatherApp app1(make_unique<OpenWeatherMapProvider>());
    app1.displayWeather("London");

    cout << endl;
    cout << "--- WeatherStack ---" << endl;
    WeatherApp app2(make_unique<WeatherStackProvider>());
    app2.displayWeather("London");

    return 0;
}
```

```go
package main

import "fmt"

type WeatherProvider interface {
	GetWeather(city string) string
}

type OpenWeatherMapProvider struct{}

func (o *OpenWeatherMapProvider) GetWeather(city string) string {
	fmt.Println("Calling OpenWeatherMap API for:", city)
	return "Sunny, 25C"
}

type WeatherStackProvider struct{}

func (w *WeatherStackProvider) GetWeather(city string) string {
	fmt.Println("Calling WeatherStack API for:", city)
	return "Cloudy, 18C"
}

type WeatherApp struct {
	provider WeatherProvider
}

func NewWeatherApp(provider WeatherProvider) *WeatherApp {
	return &WeatherApp{provider: provider}
}

func (a *WeatherApp) DisplayWeather(city string) {
	weather := a.provider.GetWeather(city)
	fmt.Println("Weather in", city+":", weather)
}

func main() {
	fmt.Println("--- OpenWeatherMap ---")
	app1 := NewWeatherApp(&OpenWeatherMapProvider{})
	app1.DisplayWeather("London")

	fmt.Println()
	fmt.Println("--- WeatherStack ---")
	app2 := NewWeatherApp(&WeatherStackProvider{})
	app2.DisplayWeather("London")
}
```

```csharp
using System;

interface IWeatherProvider
{
    string GetWeather(string city);
}

class OpenWeatherMapProvider : IWeatherProvider
{
    public string GetWeather(string city)
    {
        Console.WriteLine($"Calling OpenWeatherMap API for: {city}");
        return "Sunny, 25C";
    }
}

class WeatherStackProvider : IWeatherProvider
{
    public string GetWeather(string city)
    {
        Console.WriteLine($"Calling WeatherStack API for: {city}");
        return "Cloudy, 18C";
    }
}

class WeatherApp
{
    private readonly IWeatherProvider _provider;

    public WeatherApp(IWeatherProvider provider)
    {
        _provider = provider;
    }

    public void DisplayWeather(string city)
    {
        string weather = _provider.GetWeather(city);
        Console.WriteLine($"Weather in {city}: {weather}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("--- OpenWeatherMap ---");
        var app1 = new WeatherApp(new OpenWeatherMapProvider());
        app1.DisplayWeather("London");

        Console.WriteLine();
        Console.WriteLine("--- WeatherStack ---");
        var app2 = new WeatherApp(new WeatherStackProvider());
        app2.DisplayWeather("London");
    }
}
```

```typescript
interface WeatherProvider {
    getWeather(city: string): string;
}

class OpenWeatherMapProvider implements WeatherProvider {
    getWeather(city: string): string {
        console.log(`Calling OpenWeatherMap API for: ${city}`);
        return "Sunny, 25C";
    }
}

class WeatherStackProvider implements WeatherProvider {
    getWeather(city: string): string {
        console.log(`Calling WeatherStack API for: ${city}`);
        return "Cloudy, 18C";
    }
}

class WeatherApp {
    private provider: WeatherProvider;

    constructor(provider: WeatherProvider) {
        this.provider = provider;
    }

    displayWeather(city: string): void {
        const weather = this.provider.getWeather(city);
        console.log(`Weather in ${city}: ${weather}`);
    }
}

// Main
console.log("--- OpenWeatherMap ---");
const app1 = new WeatherApp(new OpenWeatherMapProvider());
app1.displayWeather("London");

console.log();
console.log("--- WeatherStack ---");
const app2 = new WeatherApp(new WeatherStackProvider());
app2.displayWeather("London");
```


