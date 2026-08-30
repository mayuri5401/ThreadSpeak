---
id: "lld-solid-principles-exercise-single-responsibility-principle"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - SOLID Principles"
subSection: ""
title: "Exercise: Single Responsibility Principle"
slug: "lld-solid-principles-exercise-single-responsibility-principle"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Single Responsibility Principle as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Single Responsibility Principle Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","SOLID Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: OrderService God Class

**Problem:** You have an `OrderService` class that handles order processing, inventory management, and sending notifications. This class has three distinct responsibilities tangled together. Your task is to refactor it into three focused classes: `OrderProcessor`, `InventoryManager`, and `NotificationService`.

**Requirements:**

- `OrderProcessor` should handle order validation and total calculation
- `InventoryManager` should handle stock checks and stock updates
- `NotificationService` should handle sending order confirmation messages
- Each class should accept dependencies through its constructor (or method parameters) rather than doing everything internally

```java
import java.util.*;

// Before: One class doing three unrelated jobs
class OrderService {
    private Map<String, Integer> inventory = new HashMap<>();
    private List<String> orders = new ArrayList<>();

    public OrderService() {
        inventory.put("LAPTOP", 10);
        inventory.put("PHONE", 25);
        inventory.put("TABLET", 15);
    }

    public void placeOrder(String productId, int quantity, String customerEmail) {
        // Responsibility 1: Inventory check
        Integer stock = inventory.get(productId);
        if (stock == null || stock < quantity) {
            System.out.println("Insufficient stock for " + productId);
            return;
        }

        // Responsibility 2: Order processing
        double pricePerUnit = 100.0; // Simplified pricing
        double total = pricePerUnit * quantity;
        String orderId = "ORD-" + (orders.size() + 1);
        orders.add(orderId);

        // Responsibility 3: Update inventory
        inventory.put(productId, stock - quantity);

        // Responsibility 4: Send notification
        System.out.println("Email to " + customerEmail + ": Order " + orderId
            + " confirmed. Total: $" + total);
    }
}

// TODO: Refactor into OrderProcessor, InventoryManager, and NotificationService.

public class Main {
    public static void main(String[] args) {
        // After refactoring, usage should look like:
        // InventoryManager inventory = new InventoryManager();
        // NotificationService notifications = new NotificationService();
        // OrderProcessor processor = new OrderProcessor(inventory, notifications);
        // processor.placeOrder("LAPTOP", 2, "alice@example.com");
    }
}
```

```python
# Before: One class doing three unrelated jobs
class OrderService:
    def __init__(self):
        self.inventory = {"LAPTOP": 10, "PHONE": 25, "TABLET": 15}
        self.orders = []

    def place_order(self, product_id: str, quantity: int, customer_email: str):
        # Responsibility 1: Inventory check
        stock = self.inventory.get(product_id, 0)
        if stock < quantity:
            print(f"Insufficient stock for {product_id}")
            return

        # Responsibility 2: Order processing
        price_per_unit = 100.0
        total = price_per_unit * quantity
        order_id = f"ORD-{len(self.orders) + 1}"
        self.orders.append(order_id)

        # Responsibility 3: Update inventory
        self.inventory[product_id] = stock - quantity

        # Responsibility 4: Send notification
        print(f"Email to {customer_email}: Order {order_id} confirmed. Total: ${total}")

# TODO: Refactor into OrderProcessor, InventoryManager, and NotificationService.

if __name__ == "__main__":
    # After refactoring, usage should look like:
    # inventory = InventoryManager()
    # notifications = NotificationService()
    # processor = OrderProcessor(inventory, notifications)
    # processor.place_order("LAPTOP", 2, "alice@example.com")
    pass
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>

using namespace std;

// Before: One class doing three unrelated jobs
class OrderService {
private:
    map<string, int> inventory;
    vector<string> orders;

public:
    OrderService() {
        inventory["LAPTOP"] = 10;
        inventory["PHONE"] = 25;
        inventory["TABLET"] = 15;
    }

    void placeOrder(const string& productId, int quantity,
                    const string& customerEmail) {
        // Responsibility 1: Inventory check
        auto it = inventory.find(productId);
        if (it == inventory.end() || it->second < quantity) {
            cout << "Insufficient stock for " << productId << endl;
            return;
        }

        // Responsibility 2: Order processing
        double pricePerUnit = 100.0;
        double total = pricePerUnit * quantity;
        string orderId = "ORD-" + to_string(orders.size() + 1);
        orders.push_back(orderId);

        // Responsibility 3: Update inventory
        it->second -= quantity;

        // Responsibility 4: Send notification
        cout << "Email to " << customerEmail << ": Order " << orderId
                  << " confirmed. Total: $" << total << endl;
    }
};

// TODO: Refactor into OrderProcessor, InventoryManager, and NotificationService.

int main() {
    // After refactoring, usage should look like:
    // InventoryManager inventory;
    // NotificationService notifications;
    // OrderProcessor processor(inventory, notifications);
    // processor.placeOrder("LAPTOP", 2, "alice@example.com");
    return 0;
}
```

```go
package main

import "fmt"

// Before: One class doing three unrelated jobs
type OrderService struct {
	inventory map[string]int
	orders    []string
}

func NewOrderService() *OrderService {
	return &OrderService{
		inventory: map[string]int{
			"LAPTOP": 10,
			"PHONE":  25,
			"TABLET": 15,
		},
		orders: []string{},
	}
}

func (s *OrderService) PlaceOrder(productId string, quantity int, customerEmail string) {
	// Responsibility 1: Inventory check
	stock, ok := s.inventory[productId]
	if !ok || stock < quantity {
		fmt.Println("Insufficient stock for " + productId)
		return
	}

	// Responsibility 2: Order processing
	pricePerUnit := 100.0
	total := pricePerUnit * float64(quantity)
	orderId := fmt.Sprintf("ORD-%d", len(s.orders)+1)
	s.orders = append(s.orders, orderId)

	// Responsibility 3: Update inventory
	s.inventory[productId] = stock - quantity

	// Responsibility 4: Send notification
	fmt.Printf("Email to %s: Order %s confirmed. Total: $%v\n", customerEmail, orderId, total)
}

// TODO: Refactor into OrderProcessor, InventoryManager, and NotificationService.

func main() {
	// After refactoring, usage should look like:
	// inventory := NewInventoryManager()
	// notifications := NewNotificationService()
	// processor := NewOrderProcessor(inventory, notifications)
	// processor.PlaceOrder("LAPTOP", 2, "alice@example.com")
}
```

```csharp
using System;
using System.Collections.Generic;

// Before: One class doing three unrelated jobs
class OrderService
{
    private Dictionary<string, int> inventory = new Dictionary<string, int>();
    private List<string> orders = new List<string>();

    public OrderService()
    {
        inventory["LAPTOP"] = 10;
        inventory["PHONE"] = 25;
        inventory["TABLET"] = 15;
    }

    public void PlaceOrder(string productId, int quantity, string customerEmail)
    {
        // Responsibility 1: Inventory check
        if (!inventory.ContainsKey(productId) || inventory[productId] < quantity)
        {
            Console.WriteLine("Insufficient stock for " + productId);
            return;
        }

        // Responsibility 2: Order processing
        double pricePerUnit = 100.0;
        double total = pricePerUnit * quantity;
        string orderId = "ORD-" + (orders.Count + 1);
        orders.Add(orderId);

        // Responsibility 3: Update inventory
        inventory[productId] -= quantity;

        // Responsibility 4: Send notification
        Console.WriteLine($"Email to {customerEmail}: Order {orderId} confirmed. Total: ${total}");
    }
}

// TODO: Refactor into OrderProcessor, InventoryManager, and NotificationService.

class Program
{
    static void Main()
    {
        // After refactoring, usage should look like:
        // var inventory = new InventoryManager();
        // var notifications = new NotificationService();
        // var processor = new OrderProcessor(inventory, notifications);
        // processor.PlaceOrder("LAPTOP", 2, "alice@example.com");
    }
}
```

```typescript
// Before: One class doing three unrelated jobs
class OrderService {
    private inventory: Map<string, number> = new Map([
        ["LAPTOP", 10],
        ["PHONE", 25],
        ["TABLET", 15],
    ]);
    private orders: string[] = [];

    placeOrder(productId: string, quantity: number, customerEmail: string): void {
        // Responsibility 1: Inventory check
        const stock = this.inventory.get(productId) "" 0;
        if (stock < quantity) {
            console.log(`Insufficient stock for ${productId}`);
            return;
        }

        // Responsibility 2: Order processing
        const pricePerUnit = 100.0;
        const total = pricePerUnit * quantity;
        const orderId = `ORD-${this.orders.length + 1}`;
        this.orders.push(orderId);

        // Responsibility 3: Update inventory
        this.inventory.set(productId, stock - quantity);

        // Responsibility 4: Send notification
        console.log(`Email to ${customerEmail}: Order ${orderId} confirmed. Total: $${total}`);
    }
}

// TODO: Refactor into OrderProcessor, InventoryManager, and NotificationService.

// After refactoring, usage should look like:
// const inventory = new InventoryManager();
// const notifications = new NotificationService();
// const processor = new OrderProcessor(inventory, notifications);
// processor.placeOrder("LAPTOP", 2, "alice@example.com");
```

#### Solutions

```java
import java.util.*;

class InventoryManager {
    private Map<String, Integer> stock = new HashMap<>();

    public InventoryManager() {
        stock.put("LAPTOP", 10);
        stock.put("PHONE", 25);
        stock.put("TABLET", 15);
    }

    public boolean checkStock(String productId, int quantity) {
        return stock.getOrDefault(productId, 0) >= quantity;
    }

    public void reduceStock(String productId, int quantity) {
        stock.put(productId, stock.get(productId) - quantity);
    }
}

class NotificationService {
    public void sendOrderConfirmation(String customerEmail, String orderId, double total) {
        System.out.println("Email to " + customerEmail + ": Order " + orderId + " confirmed. Total: $" + total);
    }
}

class OrderProcessor {
    private InventoryManager inventoryManager;
    private NotificationService notificationService;
    private int orderCounter = 0;

    public OrderProcessor(InventoryManager inventoryManager, NotificationService notificationService) {
        this.inventoryManager = inventoryManager;
        this.notificationService = notificationService;
    }

    public void placeOrder(String productId, int quantity, String customerEmail) {
        if (!inventoryManager.checkStock(productId, quantity)) {
            System.out.println("Insufficient stock for " + productId);
            return;
        }
        inventoryManager.reduceStock(productId, quantity);
        double total = quantity * 100.0;
        orderCounter++;
        String orderId = "ORD-" + orderCounter;
        notificationService.sendOrderConfirmation(customerEmail, orderId, total);
    }
}

public class Main {
    public static void main(String[] args) {
        InventoryManager inventory = new InventoryManager();
        NotificationService notifications = new NotificationService();
        OrderProcessor processor = new OrderProcessor(inventory, notifications);
        processor.placeOrder("LAPTOP", 2, "alice@example.com");
    }
}
```

```python
class InventoryManager:
    def __init__(self):
        self.stock = {"LAPTOP": 10, "PHONE": 25, "TABLET": 15}

    def check_stock(self, product_id, quantity):
        return self.stock.get(product_id, 0) >= quantity

    def reduce_stock(self, product_id, quantity):
        self.stock[product_id] -= quantity

class NotificationService:
    def send_order_confirmation(self, customer_email, order_id, total):
        print(f"Email to {customer_email}: Order {order_id} confirmed. Total: ${total}")

class OrderProcessor:
    def __init__(self, inventory_manager, notification_service):
        self.inventory_manager = inventory_manager
        self.notification_service = notification_service
        self.order_counter = 0

    def place_order(self, product_id, quantity, customer_email):
        if not self.inventory_manager.check_stock(product_id, quantity):
            print(f"Insufficient stock for {product_id}")
            return
        self.inventory_manager.reduce_stock(product_id, quantity)
        total = quantity * 100.0
        self.order_counter += 1
        order_id = f"ORD-{self.order_counter}"
        self.notification_service.send_order_confirmation(
            customer_email, order_id, total
        )

if __name__ == "__main__":
    inventory = InventoryManager()
    notifications = NotificationService()
    processor = OrderProcessor(inventory, notifications)
    processor.place_order("LAPTOP", 2, "alice@example.com")
```

```cpp
#include <iostream>
#include <iomanip>
#include <unordered_map>
#include <string>

using namespace std;

class InventoryManager {
    unordered_map<string, int> stock;
public:
    InventoryManager() {
        stock["LAPTOP"] = 10;
        stock["PHONE"] = 25;
        stock["TABLET"] = 15;
    }

    bool checkStock(const string& productId, int quantity) {
        auto it = stock.find(productId);
        return it != stock.end() && it->second >= quantity;
    }

    void reduceStock(const string& productId, int quantity) {
        stock[productId] -= quantity;
    }
};

class NotificationService {
public:
    void sendOrderConfirmation(const string& customerEmail,
                               const string& orderId, double total) {
        cout << fixed << setprecision(1);
        cout << "Email to " << customerEmail << ": Order " << orderId
             << " confirmed. Total: $" << total << endl;
    }
};

class OrderProcessor {
    InventoryManager& inventoryManager;
    NotificationService& notificationService;
    int orderCounter = 0;
public:
    OrderProcessor(InventoryManager& inv, NotificationService& notif)
        : inventoryManager(inv), notificationService(notif) {}

    void placeOrder(const string& productId, int quantity,
                    const string& customerEmail) {
        if (!inventoryManager.checkStock(productId, quantity)) {
            cout << "Insufficient stock for " << productId << endl;
            return;
        }
        inventoryManager.reduceStock(productId, quantity);
        double total = quantity * 100.0;
        orderCounter++;
        string orderId = "ORD-" + to_string(orderCounter);
        notificationService.sendOrderConfirmation(customerEmail, orderId, total);
    }
};

int main() {
    InventoryManager inventory;
    NotificationService notifications;
    OrderProcessor processor(inventory, notifications);
    processor.placeOrder("LAPTOP", 2, "alice@example.com");
    return 0;
}
```

```go
package main

import "fmt"

type InventoryManager struct {
	stock map[string]int
}

func NewInventoryManager() *InventoryManager {
	return &InventoryManager{
		stock: map[string]int{
			"LAPTOP": 10,
			"PHONE":  25,
			"TABLET": 15,
		},
	}
}

func (im *InventoryManager) CheckStock(productID string, quantity int) bool {
	return im.stock[productID] >= quantity
}

func (im *InventoryManager) ReduceStock(productID string, quantity int) {
	im.stock[productID] -= quantity
}

type NotificationService struct{}

func NewNotificationService() *NotificationService {
	return &NotificationService{}
}

func (ns *NotificationService) SendOrderConfirmation(customerEmail, orderID string, total float64) {
	fmt.Printf("Email to %s: Order %s confirmed. Total: $%.1f\n", customerEmail, orderID, total)
}

type OrderProcessor struct {
	inventoryManager   *InventoryManager
	notificationService *NotificationService
	orderCounter       int
}

func NewOrderProcessor(inventoryManager *InventoryManager, notificationService *NotificationService) *OrderProcessor {
	return &OrderProcessor{
		inventoryManager:   inventoryManager,
		notificationService: notificationService,
	}
}

func (op *OrderProcessor) PlaceOrder(productID string, quantity int, customerEmail string) {
	if !op.inventoryManager.CheckStock(productID, quantity) {
		fmt.Printf("Insufficient stock for %s\n", productID)
		return
	}
	op.inventoryManager.ReduceStock(productID, quantity)
	total := float64(quantity) * 100.0
	op.orderCounter++
	orderID := fmt.Sprintf("ORD-%d", op.orderCounter)
	op.notificationService.SendOrderConfirmation(customerEmail, orderID, total)
}

func main() {
	inventory := NewInventoryManager()
	notifications := NewNotificationService()
	processor := NewOrderProcessor(inventory, notifications)
	processor.PlaceOrder("LAPTOP", 2, "alice@example.com")
}
```

```csharp
using System;
using System.Collections.Generic;

class InventoryManager {
    private Dictionary<string, int> stock = new Dictionary<string, int> {
        { "LAPTOP", 10 }, { "PHONE", 25 }, { "TABLET", 15 }
    };

    public bool CheckStock(string productId, int quantity) {
        return stock.ContainsKey(productId) && stock[productId] >= quantity;
    }

    public void ReduceStock(string productId, int quantity) {
        stock[productId] -= quantity;
    }
}

class NotificationService {
    public void SendOrderConfirmation(string customerEmail, string orderId, double total) {
        Console.WriteLine($"Email to {customerEmail}: Order {orderId} confirmed. Total: ${total:F1}");
    }
}

class OrderProcessor {
    private InventoryManager inventoryManager;
    private NotificationService notificationService;
    private int orderCounter = 0;

    public OrderProcessor(InventoryManager inventoryManager, NotificationService notificationService) {
        this.inventoryManager = inventoryManager;
        this.notificationService = notificationService;
    }

    public void PlaceOrder(string productId, int quantity, string customerEmail) {
        if (!inventoryManager.CheckStock(productId, quantity)) {
            Console.WriteLine($"Insufficient stock for {productId}");
            return;
        }
        inventoryManager.ReduceStock(productId, quantity);
        double total = quantity * 100.0;
        orderCounter++;
        string orderId = "ORD-" + orderCounter;
        notificationService.SendOrderConfirmation(customerEmail, orderId, total);
    }
}

class Program {
    static void Main() {
        var inventory = new InventoryManager();
        var notifications = new NotificationService();
        var processor = new OrderProcessor(inventory, notifications);
        processor.PlaceOrder("LAPTOP", 2, "alice@example.com");
    }
}
```

```typescript
class InventoryManager {
  private stock: Map<string, number>;

  constructor() {
    this.stock = new Map([
      ["LAPTOP", 10],
      ["PHONE", 25],
      ["TABLET", 15],
    ]);
  }

  checkStock(productId: string, quantity: number): boolean {
    return (this.stock.get(productId) "" 0) >= quantity;
  }

  reduceStock(productId: string, quantity: number): void {
    this.stock.set(productId, this.stock.get(productId)! - quantity);
  }
}

class NotificationService {
  sendOrderConfirmation(customerEmail: string, orderId: string, total: number): void {
    console.log(`Email to ${customerEmail}: Order ${orderId} confirmed. Total: $${total.toFixed(1)}`);
  }
}

class OrderProcessor {
  private inventoryManager: InventoryManager;
  private notificationService: NotificationService;
  private orderCounter = 0;

  constructor(inventoryManager: InventoryManager, notificationService: NotificationService) {
    this.inventoryManager = inventoryManager;
    this.notificationService = notificationService;
  }

  placeOrder(productId: string, quantity: number, customerEmail: string): void {
    if (!this.inventoryManager.checkStock(productId, quantity)) {
      console.log(`Insufficient stock for ${productId}`);
      return;
    }
    this.inventoryManager.reduceStock(productId, quantity);
    const total = quantity * 100.0;
    this.orderCounter++;
    const orderId = `ORD-${this.orderCounter}`;
    this.notificationService.sendOrderConfirmation(customerEmail, orderId, total);
  }
}

const inventory = new InventoryManager();
const notifications = new NotificationService();
const processor = new OrderProcessor(inventory, notifications);
processor.placeOrder("LAPTOP", 2, "alice@example.com");
```

---

# Exercise 2: ReportManager

**Problem:** You have a `ReportManager` class that generates report data, formats it into a specific output (CSV, JSON), and distributes it via email. These are three distinct responsibilities bundled into one class. Your task is to refactor it into `ReportGenerator`, `ReportFormatter`, and `ReportDistributor`.

**Requirements:**

- `ReportGenerator` should gather and return raw report data (a list of records)
- `ReportFormatter` should take raw data and format it as CSV text
- `ReportDistributor` should take a formatted report and "send" it to a recipient
- The main workflow should compose these three classes together

```java
import java.util.*;

// Before: One class doing three unrelated jobs
class ReportManager {
    public void createAndSendReport(String recipient) {
        // Responsibility 1: Generate report data
        List<String[]> data = new ArrayList<>();
        data.add(new String[]{"Name", "Sales", "Region"});
        data.add(new String[]{"Alice", "15000", "North"});
        data.add(new String[]{"Bob", "22000", "South"});
        data.add(new String[]{"Charlie", "18000", "East"});

        // Responsibility 2: Format as CSV
        StringBuilder csv = new StringBuilder();
        for (String[] row : data) {
            csv.append(String.join(",", row)).append("\n");
        }

        // Responsibility 3: Distribute via email
        System.out.println("Sending report to: " + recipient);
        System.out.println(csv.toString());
        System.out.println("Report sent successfully.");
    }
}

// TODO: Refactor into ReportGenerator, ReportFormatter, and ReportDistributor.

public class Main {
    public static void main(String[] args) {
        // After refactoring, usage should look like:
        // ReportGenerator generator = new ReportGenerator();
        // ReportFormatter formatter = new ReportFormatter();
        // ReportDistributor distributor = new ReportDistributor();
        // List<String[]> data = generator.generate();
        // String formatted = formatter.formatAsCsv(data);
        // distributor.distribute("manager@company.com", formatted);
    }
}
```

```python
# Before: One class doing three unrelated jobs
class ReportManager:
    def create_and_send_report(self, recipient: str):
        # Responsibility 1: Generate report data
        data = [
            ["Name", "Sales", "Region"],
            ["Alice", "15000", "North"],
            ["Bob", "22000", "South"],
            ["Charlie", "18000", "East"],
        ]

        # Responsibility 2: Format as CSV
        csv_lines = []
        for row in data:
            csv_lines.append(",".join(row))
        csv_output = "\n".join(csv_lines)

        # Responsibility 3: Distribute via email
        print(f"Sending report to: {recipient}")
        print(csv_output)
        print("Report sent successfully.")

# TODO: Refactor into ReportGenerator, ReportFormatter, and ReportDistributor.

if __name__ == "__main__":
    # After refactoring, usage should look like:
    # generator = ReportGenerator()
    # formatter = ReportFormatter()
    # distributor = ReportDistributor()
    # data = generator.generate()
    # formatted = formatter.format_as_csv(data)
    # distributor.distribute("manager@company.com", formatted)
    pass
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <sstream>

using namespace std;

// Before: One class doing three unrelated jobs
class ReportManager {
public:
    void createAndSendReport(const string& recipient) {
        // Responsibility 1: Generate report data
        vector<vector<string>> data = {
            {"Name", "Sales", "Region"},
            {"Alice", "15000", "North"},
            {"Bob", "22000", "South"},
            {"Charlie", "18000", "East"}
        };

        // Responsibility 2: Format as CSV
        stringstream csv;
        for (const auto& row : data) {
            for (size_t i = 0; i < row.size(); i++) {
                if (i > 0) csv << ",";
                csv << row[i];
            }
            csv << "\n";
        }

        // Responsibility 3: Distribute via email
        cout << "Sending report to: " << recipient << endl;
        cout << csv.str();
        cout << "Report sent successfully." << endl;
    }
};

// TODO: Refactor into ReportGenerator, ReportFormatter, and ReportDistributor.

int main() {
    // After refactoring, usage should look like:
    // ReportGenerator generator;
    // ReportFormatter formatter;
    // ReportDistributor distributor;
    // auto data = generator.generate();
    // auto formatted = formatter.formatAsCsv(data);
    // distributor.distribute("manager@company.com", formatted);
    return 0;
}
```

```go
package main

import "fmt"

// Before: One class doing three unrelated jobs
type ReportManager struct{}

func (r *ReportManager) CreateAndSendReport(recipient string) {
	// Responsibility 1: Generate report data
	data := [][]string{
		{"Name", "Sales", "Region"},
		{"Alice", "15000", "North"},
		{"Bob", "22000", "South"},
		{"Charlie", "18000", "East"},
	}

	// Responsibility 2: Format as CSV
	csv := ""
	for _, row := range data {
		for i, value := range row {
			if i > 0 {
				csv += ","
			}
			csv += value
		}
		csv += "\n"
	}

	// Responsibility 3: Distribute via email
	fmt.Println("Sending report to:", recipient)
	fmt.Print(csv)
	fmt.Println("Report sent successfully.")
}

// TODO: Refactor into ReportGenerator, ReportFormatter, and ReportDistributor.

type ReportGenerator struct{}

func (r *ReportGenerator) Generate() [][]string {
	// TODO: implement
	return nil
}

type ReportFormatter struct{}

func (r *ReportFormatter) FormatAsCsv(data [][]string) string {
	// TODO: implement
	return ""
}

type ReportDistributor struct{}

func (r *ReportDistributor) Distribute(recipient string, formatted string) {
	// TODO: implement
}

func main() {
	// After refactoring, usage should look like:
	// generator := ReportGenerator{}
	// formatter := ReportFormatter{}
	// distributor := ReportDistributor{}
	// data := generator.Generate()
	// formatted := formatter.FormatAsCsv(data)
	// distributor.Distribute("manager@company.com", formatted)
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Text;

// Before: One class doing three unrelated jobs
class ReportManager
{
    public void CreateAndSendReport(string recipient)
    {
        // Responsibility 1: Generate report data
        var data = new List<string[]>
        {
            new[] { "Name", "Sales", "Region" },
            new[] { "Alice", "15000", "North" },
            new[] { "Bob", "22000", "South" },
            new[] { "Charlie", "18000", "East" }
        };

        // Responsibility 2: Format as CSV
        var csv = new StringBuilder();
        foreach (var row in data)
        {
            csv.AppendLine(string.Join(",", row));
        }

        // Responsibility 3: Distribute via email
        Console.WriteLine("Sending report to: " + recipient);
        Console.Write(csv.ToString());
        Console.WriteLine("Report sent successfully.");
    }
}

// TODO: Refactor into ReportGenerator, ReportFormatter, and ReportDistributor.

class Program
{
    static void Main()
    {
        // After refactoring, usage should look like:
        // var generator = new ReportGenerator();
        // var formatter = new ReportFormatter();
        // var distributor = new ReportDistributor();
        // var data = generator.Generate();
        // var formatted = formatter.FormatAsCsv(data);
        // distributor.Distribute("manager@company.com", formatted);
    }
}
```

```typescript
// Before: One class doing three unrelated jobs
class ReportManager {
    createAndSendReport(recipient: string): void {
        // Responsibility 1: Generate report data
        const data: string[][] = [
            ["Name", "Sales", "Region"],
            ["Alice", "15000", "North"],
            ["Bob", "22000", "South"],
            ["Charlie", "18000", "East"],
        ];

        // Responsibility 2: Format as CSV
        const csv = data.map(row => row.join(",")).join("\n");

        // Responsibility 3: Distribute via email
        console.log(`Sending report to: ${recipient}`);
        console.log(csv);
        console.log("Report sent successfully.");
    }
}

// TODO: Refactor into ReportGenerator, ReportFormatter, and ReportDistributor.

// After refactoring, usage should look like:
// const generator = new ReportGenerator();
// const formatter = new ReportFormatter();
// const distributor = new ReportDistributor();
// const data = generator.generate();
// const formatted = formatter.formatAsCsv(data);
// distributor.distribute("manager@company.com", formatted);
```

#### Solutions

```java
import java.util.*;

class ReportGenerator {
    public List<String[]> generate() {
        List<String[]> data = new ArrayList<>();
        data.add(new String[]{"Name", "Sales", "Region"});
        data.add(new String[]{"Alice", "15000", "North"});
        data.add(new String[]{"Bob", "22000", "South"});
        data.add(new String[]{"Charlie", "18000", "East"});
        return data;
    }
}

class ReportFormatter {
    public String formatAsCsv(List<String[]> data) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < data.size(); i++) {
            sb.append(String.join(",", data.get(i)));
            if (i < data.size() - 1) {
                sb.append("\n");
            }
        }
        return sb.toString();
    }
}

class ReportDistributor {
    public void distribute(String recipient, String formattedReport) {
        System.out.println("Sending report to: " + recipient);
        System.out.println(formattedReport);
        System.out.println("Report sent successfully.");
    }
}

public class Main {
    public static void main(String[] args) {
        ReportGenerator generator = new ReportGenerator();
        ReportFormatter formatter = new ReportFormatter();
        ReportDistributor distributor = new ReportDistributor();

        List<String[]> data = generator.generate();
        String csv = formatter.formatAsCsv(data);
        distributor.distribute("manager@company.com", csv);
    }
}
```

```python
class ReportGenerator:
    def generate(self):
        return [
            ["Name", "Sales", "Region"],
            ["Alice", "15000", "North"],
            ["Bob", "22000", "South"],
            ["Charlie", "18000", "East"],
        ]

class ReportFormatter:
    def format_as_csv(self, data):
        return "\n".join(",".join(row) for row in data)

class ReportDistributor:
    def distribute(self, recipient, formatted_report):
        print(f"Sending report to: {recipient}")
        print(formatted_report)
        print("Report sent successfully.")

if __name__ == "__main__":
    generator = ReportGenerator()
    formatter = ReportFormatter()
    distributor = ReportDistributor()

    data = generator.generate()
    csv = formatter.format_as_csv(data)
    distributor.distribute("manager@company.com", csv)
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <sstream>

using namespace std;

class ReportGenerator {
public:
    vector<vector<string>> generate() {
        return {
            {"Name", "Sales", "Region"},
            {"Alice", "15000", "North"},
            {"Bob", "22000", "South"},
            {"Charlie", "18000", "East"}
        };
    }
};

class ReportFormatter {
public:
    string formatAsCsv(const vector<vector<string>>& data) {
        ostringstream oss;
        for (size_t i = 0; i < data.size(); i++) {
            for (size_t j = 0; j < data[i].size(); j++) {
                if (j > 0) oss << ",";
                oss << data[i][j];
            }
            if (i < data.size() - 1) oss << "\n";
        }
        return oss.str();
    }
};

class ReportDistributor {
public:
    void distribute(const string& recipient, const string& formattedReport) {
        cout << "Sending report to: " << recipient << endl;
        cout << formattedReport << endl;
        cout << "Report sent successfully." << endl;
    }
};

int main() {
    ReportGenerator generator;
    ReportFormatter formatter;
    ReportDistributor distributor;

    auto data = generator.generate();
    string csv = formatter.formatAsCsv(data);
    distributor.distribute("manager@company.com", csv);
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type ReportGenerator struct{}

func (rg ReportGenerator) Generate() [][]string {
	return [][]string{
		{"Name", "Sales", "Region"},
		{"Alice", "15000", "North"},
		{"Bob", "22000", "South"},
		{"Charlie", "18000", "East"},
	}
}

type ReportFormatter struct{}

func (rf ReportFormatter) FormatAsCsv(data [][]string) string {
	lines := make([]string, 0, len(data))
	for _, row := range data {
		lines = append(lines, strings.Join(row, ","))
	}
	return strings.Join(lines, "\n")
}

type ReportDistributor struct{}

func (rd ReportDistributor) Distribute(recipient string, formattedReport string) {
	fmt.Println("Sending report to: " + recipient)
	fmt.Println(formattedReport)
	fmt.Println("Report sent successfully.")
}

func main() {
	generator := ReportGenerator{}
	formatter := ReportFormatter{}
	distributor := ReportDistributor{}

	data := generator.Generate()
	csv := formatter.FormatAsCsv(data)
	distributor.Distribute("manager@company.com", csv)
}
```

```csharp
using System;
using System.Collections.Generic;

class ReportGenerator {
    public List<string[]> Generate() {
        return new List<string[]> {
            new[] { "Name", "Sales", "Region" },
            new[] { "Alice", "15000", "North" },
            new[] { "Bob", "22000", "South" },
            new[] { "Charlie", "18000", "East" }
        };
    }
}

class ReportFormatter {
    public string FormatAsCsv(List<string[]> data) {
        var lines = new List<string>();
        foreach (var row in data) {
            lines.Add(string.Join(",", row));
        }
        return string.Join("\n", lines);
    }
}

class ReportDistributor {
    public void Distribute(string recipient, string formattedReport) {
        Console.WriteLine($"Sending report to: {recipient}");
        Console.WriteLine(formattedReport);
        Console.WriteLine("Report sent successfully.");
    }
}

class Program {
    static void Main() {
        var generator = new ReportGenerator();
        var formatter = new ReportFormatter();
        var distributor = new ReportDistributor();

        var data = generator.Generate();
        string csv = formatter.FormatAsCsv(data);
        distributor.Distribute("manager@company.com", csv);
    }
}
```

```typescript
class ReportGenerator {
  generate(): string[][] {
    return [
      ["Name", "Sales", "Region"],
      ["Alice", "15000", "North"],
      ["Bob", "22000", "South"],
      ["Charlie", "18000", "East"],
    ];
  }
}

class ReportFormatter {
  formatAsCsv(data: string[][]): string {
    return data.map((row) => row.join(",")).join("\n");
  }
}

class ReportDistributor {
  distribute(recipient: string, formattedReport: string): void {
    console.log(`Sending report to: ${recipient}`);
    console.log(formattedReport);
    console.log("Report sent successfully.");
  }
}

const generator = new ReportGenerator();
const formatter = new ReportFormatter();
const distributor = new ReportDistributor();

const data = generator.generate();
const csv = formatter.formatAsCsv(data);
distributor.distribute("manager@company.com", csv);
```


