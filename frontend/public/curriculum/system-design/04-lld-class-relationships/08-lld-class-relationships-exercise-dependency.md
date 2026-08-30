---
id: "lld-class-relationships-exercise-dependency"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Class Relationships"
subSection: ""
title: "Exercise: Dependency"
slug: "lld-class-relationships-exercise-dependency"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Dependency as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Dependency Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Class Relationships","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: File Conversion Service

<!-- payload:lldCodingPracticeBlock:START {"id":"698dde2b99b6ab40f1a6e8e4","title":"Design File Conversion Service","difficulty":"","expectedOutput":"Reading file: data.csv\nContent: name,age,city\nParsing content to JSON format\nParsed: [{\"name\":\"Alice\",\"age\":30,\"city\":\"NYC\"}]\nWriting to file: output.json\nFile conversion complete: data.csv -> output.json"} -->
**Problem:** Build a `FileConverter` that converts files from one format to another. During the `convert()` method, it depends on a `FileReader` to read the source file, a `FormatParser` to parse the content, and a `FileWriter` to write the output. None of these are stored as fields.

**Requirements:**

- `FileReader` with a `read(filePath)` method that returns the file content as a string.
- `FormatParser` with a `parse(content, targetFormat)` method that returns the converted content.
- `FileWriter` with a `write(filePath, content)` method that writes the content to a file.
- `FileConverter` with a `convert(sourcePath, targetPath, targetFormat, reader, parser, writer)` method that coordinates the three dependencies. No fields.

```java
class FileReader {
    public String read(String filePath) {
        // TODO: Simulate reading a file and return its content
        return "";
    }
}

class FormatParser {
    public String parse(String content, String targetFormat) {
        // TODO: Simulate converting content to the target format
        return "";
    }
}

class FileWriter {
    public void write(String filePath, String content) {
        // TODO: Simulate writing content to a file
    }
}

class FileConverter {
    public void convert(String sourcePath, String targetPath, String targetFormat,
                        FileReader reader, FormatParser parser, FileWriter writer) {
        // TODO: Use reader to read, parser to parse, writer to write
        // Print each step so you can verify the flow
    }
}

public class Main {
    public static void main(String[] args) {
        FileConverter converter = new FileConverter();

        FileReader reader = new FileReader();
        FormatParser parser = new FormatParser();
        FileWriter writer = new FileWriter();

        converter.convert("data.csv", "output.json", "JSON", reader, parser, writer);
    }
}
```

```python
class FileReader:
    def read(self, file_path):
        # TODO: Simulate reading a file and return its content
        return ""

class FormatParser:
    def parse(self, content, target_format):
        # TODO: Simulate converting content to the target format
        return ""

class FileWriter:
    def write(self, file_path, content):
        # TODO: Simulate writing content to a file
        pass

class FileConverter:
    def convert(self, source_path, target_path, target_format,
                reader, parser, writer):
        # TODO: Use reader to read, parser to parse, writer to write
        # Print each step so you can verify the flow
        pass

if __name__ == "__main__":
    converter = FileConverter()

    reader = FileReader()
    parser = FormatParser()
    writer = FileWriter()

    converter.convert("data.csv", "output.json", "JSON", reader, parser, writer)
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class FileReader {
public:
    string read(const string& filePath) {
        // TODO: Simulate reading a file and return its content
        return "";
    }
};

class FormatParser {
public:
    string parse(const string& content, const string& targetFormat) {
        // TODO: Simulate converting content to the target format
        return "";
    }
};

class FileWriter {
public:
    void write(const string& filePath, const string& content) {
        // TODO: Simulate writing content to a file
    }
};

class FileConverter {
public:
    void convert(const string& sourcePath, const string& targetPath,
                 const string& targetFormat, FileReader& reader,
                 FormatParser& parser, FileWriter& writer) {
        // TODO: Use reader to read, parser to parse, writer to write
        // Print each step so you can verify the flow
    }
};

int main() {
    FileConverter converter;

    FileReader reader;
    FormatParser parser;
    FileWriter writer;

    converter.convert("data.csv", "output.json", "JSON", reader, parser, writer);

    return 0;
}
```

```go
package main

type FileReader struct{}

func (fr *FileReader) Read(filePath string) string {
	// TODO: Simulate reading a file and return its content
	return ""
}

type FormatParser struct{}

func (fp *FormatParser) Parse(content string, targetFormat string) string {
	// TODO: Simulate converting content to the target format
	return ""
}

type FileWriter struct{}

func (fw *FileWriter) Write(filePath string, content string) {
	// TODO: Simulate writing content to a file
}

type FileConverter struct{}

func (fc *FileConverter) Convert(sourcePath string, targetPath string, targetFormat string,
	reader *FileReader, parser *FormatParser, writer *FileWriter) {
	// TODO: Use reader to read, parser to parse, writer to write
	// Print each step so you can verify the flow
}

func main() {
	converter := &FileConverter{}

	reader := &FileReader{}
	parser := &FormatParser{}
	writer := &FileWriter{}

	converter.Convert("data.csv", "output.json", "JSON", reader, parser, writer)
}
```

```csharp
using System;

class FileReader
{
    public string Read(string filePath)
    {
        // TODO: Simulate reading a file and return its content
        return "";
    }
}

class FormatParser
{
    public string Parse(string content, string targetFormat)
    {
        // TODO: Simulate converting content to the target format
        return "";
    }
}

class FileWriter
{
    public void Write(string filePath, string content)
    {
        // TODO: Simulate writing content to a file
    }
}

class FileConverter
{
    public void Convert(string sourcePath, string targetPath, string targetFormat,
                        FileReader reader, FormatParser parser, FileWriter writer)
    {
        // TODO: Use reader to read, parser to parse, writer to write
        // Print each step so you can verify the flow
    }
}

class Program
{
    static void Main()
    {
        var converter = new FileConverter();

        var reader = new FileReader();
        var parser = new FormatParser();
        var writer = new FileWriter();

        converter.Convert("data.csv", "output.json", "JSON", reader, parser, writer);
    }
}
```

```typescript
class FileReader {
    read(filePath: string): string {
        // TODO: Simulate reading a file and return its content
        return "";
    }
}

class FormatParser {
    parse(content: string, targetFormat: string): string {
        // TODO: Simulate converting content to the target format
        return "";
    }
}

class FileWriter {
    write(filePath: string, content: string): void {
        // TODO: Simulate writing content to a file
    }
}

class FileConverter {
    convert(sourcePath: string, targetPath: string, targetFormat: string,
            reader: FileReader, parser: FormatParser, writer: FileWriter): void {
        // TODO: Use reader to read, parser to parse, writer to write
        // Print each step so you can verify the flow
    }
}

const converter = new FileConverter();

const reader = new FileReader();
const parser = new FormatParser();
const writer = new FileWriter();

converter.convert("data.csv", "output.json", "JSON", reader, parser, writer);
```

#### Solutions

```java
class FileReader {
    public String read(String filePath) {
        System.out.println("Reading file: " + filePath);
        String content = "name,age,city";
        System.out.println("Content: " + content);
        return content;
    }
}

class FormatParser {
    public String parse(String content, String targetFormat) {
        System.out.println("Parsing content to " + targetFormat + " format");
        String parsed = "[{\"name\":\"Alice\",\"age\":30,\"city\":\"NYC\"}]";
        System.out.println("Parsed: " + parsed);
        return parsed;
    }
}

class FileWriter {
    public void write(String filePath, String content) {
        System.out.println("Writing to file: " + filePath);
    }
}

class FileConverter {
    public void convert(String sourcePath, String targetPath, String targetFormat,
                        FileReader reader, FormatParser parser, FileWriter writer) {
        String content = reader.read(sourcePath);
        String parsed = parser.parse(content, targetFormat);
        writer.write(targetPath, parsed);
        System.out.println("File conversion complete: " + sourcePath + " -> " + targetPath);
    }
}

public class Main {
    public static void main(String[] args) {
        FileConverter converter = new FileConverter();

        FileReader reader = new FileReader();
        FormatParser parser = new FormatParser();
        FileWriter writer = new FileWriter();

        converter.convert("data.csv", "output.json", "JSON", reader, parser, writer);
    }
}
```

```python
class FileReader:
    def read(self, file_path):
        print(f"Reading file: {file_path}")
        content = "name,age,city"
        print(f"Content: {content}")
        return content

class FormatParser:
    def parse(self, content, target_format):
        print(f"Parsing content to {target_format} format")
        parsed = '[{"name":"Alice","age":30,"city":"NYC"}]'
        print(f"Parsed: {parsed}")
        return parsed

class FileWriter:
    def write(self, file_path, content):
        print(f"Writing to file: {file_path}")

class FileConverter:
    def convert(self, source_path, target_path, target_format,
                reader, parser, writer):
        content = reader.read(source_path)
        parsed = parser.parse(content, target_format)
        writer.write(target_path, parsed)
        print(f"File conversion complete: {source_path} -> {target_path}")

if __name__ == "__main__":
    converter = FileConverter()

    reader = FileReader()
    parser = FormatParser()
    writer = FileWriter()

    converter.convert("data.csv", "output.json", "JSON", reader, parser, writer)
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class FileReader {
public:
    string read(const string& filePath) {
        cout << "Reading file: " << filePath << endl;
        string content = "name,age,city";
        cout << "Content: " << content << endl;
        return content;
    }
};

class FormatParser {
public:
    string parse(const string& content, const string& targetFormat) {
        cout << "Parsing content to " << targetFormat << " format" << endl;
        string parsed = "[{\"name\":\"Alice\",\"age\":30,\"city\":\"NYC\"}]";
        cout << "Parsed: " << parsed << endl;
        return parsed;
    }
};

class FileWriter {
public:
    void write(const string& filePath, const string& content) {
        cout << "Writing to file: " << filePath << endl;
    }
};

class FileConverter {
public:
    void convert(const string& sourcePath, const string& targetPath,
                 const string& targetFormat, FileReader& reader,
                 FormatParser& parser, FileWriter& writer) {
        string content = reader.read(sourcePath);
        string parsed = parser.parse(content, targetFormat);
        writer.write(targetPath, parsed);
        cout << "File conversion complete: " << sourcePath << " -> " << targetPath << endl;
    }
};

int main() {
    FileConverter converter;

    FileReader reader;
    FormatParser parser;
    FileWriter writer;

    converter.convert("data.csv", "output.json", "JSON", reader, parser, writer);

    return 0;
}
```

```go
package main

import "fmt"

type FileReader struct{}

func (fr *FileReader) Read(filePath string) string {
	fmt.Println("Reading file:", filePath)
	content := "name,age,city"
	fmt.Println("Content:", content)
	return content
}

type FormatParser struct{}

func (fp *FormatParser) Parse(content string, targetFormat string) string {
	fmt.Println("Parsing content to", targetFormat, "format")
	parsed := `[{"name":"Alice","age":30,"city":"NYC"}]`
	fmt.Println("Parsed:", parsed)
	return parsed
}

type FileWriter struct{}

func (fw *FileWriter) Write(filePath string, content string) {
	fmt.Println("Writing to file:", filePath)
}

type FileConverter struct{}

func (fc *FileConverter) Convert(sourcePath string, targetPath string, targetFormat string,
	reader *FileReader, parser *FormatParser, writer *FileWriter) {
	content := reader.Read(sourcePath)
	parsed := parser.Parse(content, targetFormat)
	writer.Write(targetPath, parsed)
	fmt.Println("File conversion complete:", sourcePath, "->", targetPath)
}

func main() {
	converter := &FileConverter{}

	reader := &FileReader{}
	parser := &FormatParser{}
	writer := &FileWriter{}

	converter.Convert("data.csv", "output.json", "JSON", reader, parser, writer)
}
```

```csharp
using System;

class FileReader
{
    public string Read(string filePath)
    {
        Console.WriteLine("Reading file: " + filePath);
        string content = "name,age,city";
        Console.WriteLine("Content: " + content);
        return content;
    }
}

class FormatParser
{
    public string Parse(string content, string targetFormat)
    {
        Console.WriteLine("Parsing content to " + targetFormat + " format");
        string parsed = "[{\"name\":\"Alice\",\"age\":30,\"city\":\"NYC\"}]";
        Console.WriteLine("Parsed: " + parsed);
        return parsed;
    }
}

class FileWriter
{
    public void Write(string filePath, string content)
    {
        Console.WriteLine("Writing to file: " + filePath);
    }
}

class FileConverter
{
    public void Convert(string sourcePath, string targetPath, string targetFormat,
                        FileReader reader, FormatParser parser, FileWriter writer)
    {
        string content = reader.Read(sourcePath);
        string parsed = parser.Parse(content, targetFormat);
        writer.Write(targetPath, parsed);
        Console.WriteLine("File conversion complete: " + sourcePath + " -> " + targetPath);
    }
}

class Program
{
    static void Main()
    {
        var converter = new FileConverter();

        var reader = new FileReader();
        var parser = new FormatParser();
        var writer = new FileWriter();

        converter.Convert("data.csv", "output.json", "JSON", reader, parser, writer);
    }
}
```

```typescript
class FileReader {
    read(filePath: string): string {
        console.log("Reading file: " + filePath);
        const content = "name,age,city";
        console.log("Content: " + content);
        return content;
    }
}

class FormatParser {
    parse(content: string, targetFormat: string): string {
        console.log("Parsing content to " + targetFormat + " format");
        const parsed = '[{"name":"Alice","age":30,"city":"NYC"}]';
        console.log("Parsed: " + parsed);
        return parsed;
    }
}

class FileWriter {
    write(filePath: string, content: string): void {
        console.log("Writing to file: " + filePath);
    }
}

class FileConverter {
    convert(sourcePath: string, targetPath: string, targetFormat: string,
            reader: FileReader, parser: FormatParser, writer: FileWriter): void {
        const content = reader.read(sourcePath);
        const parsed = parser.parse(content, targetFormat);
        writer.write(targetPath, parsed);
        console.log("File conversion complete: " + sourcePath + " -> " + targetPath);
    }
}

const converter = new FileConverter();

const reader = new FileReader();
const parser = new FormatParser();
const writer = new FileWriter();

converter.convert("data.csv", "output.json", "JSON", reader, parser, writer);
```

---

# Exercise 2: Order Processing Pipeline

**Problem:** Build an `OrderProcessor` that processes customer orders. During `processOrder()`, it depends on an `InventoryChecker` to verify stock, a `PriceCalculator` to compute the total, and an `InvoiceGenerator` to create the invoice. All dependencies come in as method parameters.

**Requirements:**

- `InventoryChecker` with a `checkStock(itemName, quantity)` method that returns `true` if stock is available.
- `PriceCalculator` with a `calculate(itemName, quantity)` method that returns the total price.
- `InvoiceGenerator` with a `generate(itemName, quantity, total)` method that returns an invoice string.
- `OrderProcessor` with a `processOrder(itemName, quantity, checker, calculator, generator)` method that coordinates the pipeline. No fields.

```java
class InventoryChecker {
    public boolean checkStock(String itemName, int quantity) {
        // TODO: Simulate checking inventory
        // Return true if available, false otherwise
        return false;
    }
}

class PriceCalculator {
    public double calculate(String itemName, int quantity) {
        // TODO: Simulate calculating the price
        return 0.0;
    }
}

class InvoiceGenerator {
    public String generate(String itemName, int quantity, double total) {
        // TODO: Simulate generating an invoice string
        return "";
    }
}

class OrderProcessor {
    public String processOrder(String itemName, int quantity,
                               InventoryChecker checker, PriceCalculator calculator,
                               InvoiceGenerator generator) {
        // TODO: Check stock, calculate price, generate invoice
        // Return the invoice string, or an error message if out of stock
        return "";
    }
}

public class Main {
    public static void main(String[] args) {
        OrderProcessor processor = new OrderProcessor();

        InventoryChecker checker = new InventoryChecker();
        PriceCalculator calculator = new PriceCalculator();
        InvoiceGenerator generator = new InvoiceGenerator();

        String invoice = processor.processOrder("Laptop", 2,
            checker, calculator, generator);
        System.out.println(invoice);
    }
}
```

```python
class InventoryChecker:
    def check_stock(self, item_name, quantity):
        # TODO: Simulate checking inventory
        # Return True if available, False otherwise
        return False

class PriceCalculator:
    def calculate(self, item_name, quantity):
        # TODO: Simulate calculating the price
        return 0.0

class InvoiceGenerator:
    def generate(self, item_name, quantity, total):
        # TODO: Simulate generating an invoice string
        return ""

class OrderProcessor:
    def process_order(self, item_name, quantity, checker, calculator, generator):
        # TODO: Check stock, calculate price, generate invoice
        # Return the invoice string, or an error message if out of stock
        return ""

if __name__ == "__main__":
    processor = OrderProcessor()

    checker = InventoryChecker()
    calculator = PriceCalculator()
    generator = InvoiceGenerator()

    invoice = processor.process_order("Laptop", 2, checker, calculator, generator)
    print(invoice)
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class InventoryChecker {
public:
    bool checkStock(const string& itemName, int quantity) {
        // TODO: Simulate checking inventory
        return false;
    }
};

class PriceCalculator {
public:
    double calculate(const string& itemName, int quantity) {
        // TODO: Simulate calculating the price
        return 0.0;
    }
};

class InvoiceGenerator {
public:
    string generate(const string& itemName, int quantity, double total) {
        // TODO: Simulate generating an invoice string
        return "";
    }
};

class OrderProcessor {
public:
    string processOrder(const string& itemName, int quantity,
                        InventoryChecker& checker, PriceCalculator& calculator,
                        InvoiceGenerator& generator) {
        // TODO: Check stock, calculate price, generate invoice
        return "";
    }
};

int main() {
    OrderProcessor processor;

    InventoryChecker checker;
    PriceCalculator calculator;
    InvoiceGenerator generator;

    string invoice = processor.processOrder("Laptop", 2,
        checker, calculator, generator);
    cout << invoice << endl;

    return 0;
}
```

```go
package main

import "fmt"

type InventoryChecker struct{}

func (ic *InventoryChecker) CheckStock(itemName string, quantity int) bool {
	// TODO: Simulate checking inventory
	// Return true if available, false otherwise
	return false
}

type PriceCalculator struct{}

func (pc *PriceCalculator) Calculate(itemName string, quantity int) float64 {
	// TODO: Simulate calculating the price
	return 0.0
}

type InvoiceGenerator struct{}

func (ig *InvoiceGenerator) Generate(itemName string, quantity int, total float64) string {
	// TODO: Simulate generating an invoice string
	return ""
}

type OrderProcessor struct{}

func (op *OrderProcessor) ProcessOrder(itemName string, quantity int,
	checker *InventoryChecker, calculator *PriceCalculator,
	generator *InvoiceGenerator) string {
	// TODO: Check stock, calculate price, generate invoice
	// Return the invoice string, or an error message if out of stock
	return ""
}

func main() {
	processor := &OrderProcessor{}

	checker := &InventoryChecker{}
	calculator := &PriceCalculator{}
	generator := &InvoiceGenerator{}

	invoice := processor.ProcessOrder("Laptop", 2, checker, calculator, generator)
	fmt.Println(invoice)
}
```

```csharp
using System;

class InventoryChecker
{
    public bool CheckStock(string itemName, int quantity)
    {
        // TODO: Simulate checking inventory
        return false;
    }
}

class PriceCalculator
{
    public double Calculate(string itemName, int quantity)
    {
        // TODO: Simulate calculating the price
        return 0.0;
    }
}

class InvoiceGenerator
{
    public string Generate(string itemName, int quantity, double total)
    {
        // TODO: Simulate generating an invoice string
        return "";
    }
}

class OrderProcessor
{
    public string ProcessOrder(string itemName, int quantity,
                               InventoryChecker checker, PriceCalculator calculator,
                               InvoiceGenerator generator)
    {
        // TODO: Check stock, calculate price, generate invoice
        return "";
    }
}

class Program
{
    static void Main()
    {
        var processor = new OrderProcessor();

        var checker = new InventoryChecker();
        var calculator = new PriceCalculator();
        var generator = new InvoiceGenerator();

        string invoice = processor.ProcessOrder("Laptop", 2,
            checker, calculator, generator);
        Console.WriteLine(invoice);
    }
}
```

```typescript
class InventoryChecker {
    checkStock(itemName: string, quantity: number): boolean {
        // TODO: Simulate checking inventory
        return false;
    }
}

class PriceCalculator {
    calculate(itemName: string, quantity: number): number {
        // TODO: Simulate calculating the price
        return 0;
    }
}

class InvoiceGenerator {
    generate(itemName: string, quantity: number, total: number): string {
        // TODO: Simulate generating an invoice string
        return "";
    }
}

class OrderProcessor {
    processOrder(itemName: string, quantity: number,
                 checker: InventoryChecker, calculator: PriceCalculator,
                 generator: InvoiceGenerator): string {
        // TODO: Check stock, calculate price, generate invoice
        return "";
    }
}

const processor = new OrderProcessor();

const checker = new InventoryChecker();
const calculator = new PriceCalculator();
const generator = new InvoiceGenerator();

const invoice = processor.processOrder("Laptop", 2,
    checker, calculator, generator);
console.log(invoice);
```

#### Solutions

```java
class InventoryChecker {
    public boolean checkStock(String itemName, int quantity) {
        System.out.println("Checking stock for " + itemName + " (x" + quantity + ")");
        System.out.println("Stock available: true");
        return true;
    }
}

class PriceCalculator {
    public double calculate(String itemName, int quantity) {
        double unitPrice = 1249.99;
        double total = unitPrice * quantity;
        System.out.printf("Calculating price: %s x %d = $%.2f%n", itemName, quantity, total);
        return total;
    }
}

class InvoiceGenerator {
    public String generate(String itemName, int quantity, double total) {
        System.out.println("Generating invoice...");
        return String.format("--- INVOICE ---\nItem: %s\nQuantity: %d\nTotal: $%.2f\n--- END ---",
            itemName, quantity, total);
    }
}

class OrderProcessor {
    public String processOrder(String itemName, int quantity,
                               InventoryChecker checker, PriceCalculator calculator,
                               InvoiceGenerator generator) {
        boolean inStock = checker.checkStock(itemName, quantity);
        if (!inStock) {
            return "Order rejected: " + itemName + " is out of stock.";
        }
        double total = calculator.calculate(itemName, quantity);
        return generator.generate(itemName, quantity, total);
    }
}

public class Main {
    public static void main(String[] args) {
        OrderProcessor processor = new OrderProcessor();

        InventoryChecker checker = new InventoryChecker();
        PriceCalculator calculator = new PriceCalculator();
        InvoiceGenerator generator = new InvoiceGenerator();

        String invoice = processor.processOrder("Laptop", 2,
            checker, calculator, generator);
        System.out.println(invoice);
    }
}
```

```python
class InventoryChecker:
    def check_stock(self, item_name, quantity):
        print(f"Checking stock for {item_name} (x{quantity})")
        print("Stock available: true")
        return True

class PriceCalculator:
    def calculate(self, item_name, quantity):
        unit_price = 1249.99
        total = unit_price * quantity
        print(f"Calculating price: {item_name} x {quantity} = ${total:.2f}")
        return total

class InvoiceGenerator:
    def generate(self, item_name, quantity, total):
        print("Generating invoice...")
        return f"--- INVOICE ---\nItem: {item_name}\nQuantity: {quantity}\nTotal: ${total:.2f}\n--- END ---"

class OrderProcessor:
    def process_order(self, item_name, quantity, checker, calculator, generator):
        in_stock = checker.check_stock(item_name, quantity)
        if not in_stock:
            return f"Order rejected: {item_name} is out of stock."
        total = calculator.calculate(item_name, quantity)
        return generator.generate(item_name, quantity, total)

if __name__ == "__main__":
    processor = OrderProcessor()

    checker = InventoryChecker()
    calculator = PriceCalculator()
    generator = InvoiceGenerator()

    invoice = processor.process_order("Laptop", 2, checker, calculator, generator)
    print(invoice)
```

```cpp
#include <iostream>
#include <string>
using namespace std;

class InventoryChecker {
public:
    bool checkStock(const string& itemName, int quantity) {
        cout << "Checking stock for " << itemName << " (x" << quantity << ")" << endl;
        cout << "Stock available: true" << endl;
        return true;
    }
};

class PriceCalculator {
public:
    double calculate(const string& itemName, int quantity) {
        double unitPrice = 1249.99;
        double total = unitPrice * quantity;
        printf("Calculating price: %s x %d = $%.2f\n", itemName.c_str(), quantity, total);
        return total;
    }
};

class InvoiceGenerator {
public:
    string generate(const string& itemName, int quantity, double total) {
        cout << "Generating invoice..." << endl;
        char buffer[256];
        snprintf(buffer, sizeof(buffer),
            "--- INVOICE ---\nItem: %s\nQuantity: %d\nTotal: $%.2f\n--- END ---",
            itemName.c_str(), quantity, total);
        return string(buffer);
    }
};

class OrderProcessor {
public:
    string processOrder(const string& itemName, int quantity,
                        InventoryChecker& checker, PriceCalculator& calculator,
                        InvoiceGenerator& generator) {
        bool inStock = checker.checkStock(itemName, quantity);
        if (!inStock) {
            return "Order rejected: " + itemName + " is out of stock.";
        }
        double total = calculator.calculate(itemName, quantity);
        return generator.generate(itemName, quantity, total);
    }
};

int main() {
    OrderProcessor processor;

    InventoryChecker checker;
    PriceCalculator calculator;
    InvoiceGenerator generator;

    string invoice = processor.processOrder("Laptop", 2,
        checker, calculator, generator);
    cout << invoice << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
)

type InventoryChecker struct{}

func (ic InventoryChecker) CheckStock(itemName string, quantity int) bool {
	fmt.Printf("Checking stock for %s (x%d)\n", itemName, quantity)
	fmt.Println("Stock available: true")
	return true
}

type PriceCalculator struct{}

func (pc PriceCalculator) Calculate(itemName string, quantity int) float64 {
	unitPrice := 1249.99
	total := unitPrice * float64(quantity)
	fmt.Printf("Calculating price: %s x %d = $%.2f\n", itemName, quantity, total)
	return total
}

type InvoiceGenerator struct{}

func (ig InvoiceGenerator) Generate(itemName string, quantity int, total float64) string {
	fmt.Println("Generating invoice...")
	return fmt.Sprintf("--- INVOICE ---\nItem: %s\nQuantity: %d\nTotal: $%.2f\n--- END ---",
		itemName, quantity, total)
}

type OrderProcessor struct{}

func (op OrderProcessor) ProcessOrder(itemName string, quantity int,
	checker InventoryChecker, calculator PriceCalculator,
	generator InvoiceGenerator) string {
	inStock := checker.CheckStock(itemName, quantity)
	if !inStock {
		return fmt.Sprintf("Order rejected: %s is out of stock.", itemName)
	}
	total := calculator.Calculate(itemName, quantity)
	return generator.Generate(itemName, quantity, total)
}

func main() {
	processor := OrderProcessor{}

	checker := InventoryChecker{}
	calculator := PriceCalculator{}
	generator := InvoiceGenerator{}

	invoice := processor.ProcessOrder("Laptop", 2, checker, calculator, generator)
	fmt.Println(invoice)
}
```

```csharp
using System;

class InventoryChecker
{
    public bool CheckStock(string itemName, int quantity)
    {
        Console.WriteLine($"Checking stock for {itemName} (x{quantity})");
        Console.WriteLine("Stock available: true");
        return true;
    }
}

class PriceCalculator
{
    public double Calculate(string itemName, int quantity)
    {
        double unitPrice = 1249.99;
        double total = unitPrice * quantity;
        Console.WriteLine($"Calculating price: {itemName} x {quantity} = ${total:F2}");
        return total;
    }
}

class InvoiceGenerator
{
    public string Generate(string itemName, int quantity, double total)
    {
        Console.WriteLine("Generating invoice...");
        return $"--- INVOICE ---\nItem: {itemName}\nQuantity: {quantity}\nTotal: ${total:F2}\n--- END ---";
    }
}

class OrderProcessor
{
    public string ProcessOrder(string itemName, int quantity,
                               InventoryChecker checker, PriceCalculator calculator,
                               InvoiceGenerator generator)
    {
        bool inStock = checker.CheckStock(itemName, quantity);
        if (!inStock)
        {
            return $"Order rejected: {itemName} is out of stock.";
        }
        double total = calculator.Calculate(itemName, quantity);
        return generator.Generate(itemName, quantity, total);
    }
}

class Program
{
    static void Main()
    {
        var processor = new OrderProcessor();

        var checker = new InventoryChecker();
        var calculator = new PriceCalculator();
        var generator = new InvoiceGenerator();

        string invoice = processor.ProcessOrder("Laptop", 2,
            checker, calculator, generator);
        Console.WriteLine(invoice);
    }
}
```

```typescript
class InventoryChecker {
    checkStock(itemName: string, quantity: number): boolean {
        console.log(`Checking stock for ${itemName} (x${quantity})`);
        console.log("Stock available: true");
        return true;
    }
}

class PriceCalculator {
    calculate(itemName: string, quantity: number): number {
        const unitPrice = 1249.99;
        const total = unitPrice * quantity;
        console.log(`Calculating price: ${itemName} x ${quantity} = $${total.toFixed(2)}`);
        return total;
    }
}

class InvoiceGenerator {
    generate(itemName: string, quantity: number, total: number): string {
        console.log("Generating invoice...");
        return `--- INVOICE ---\nItem: ${itemName}\nQuantity: ${quantity}\nTotal: $${total.toFixed(2)}\n--- END ---`;
    }
}

class OrderProcessor {
    processOrder(itemName: string, quantity: number,
                 checker: InventoryChecker, calculator: PriceCalculator,
                 generator: InvoiceGenerator): string {
        const inStock = checker.checkStock(itemName, quantity);
        if (!inStock) {
            return `Order rejected: ${itemName} is out of stock.`;
        }
        const total = calculator.calculate(itemName, quantity);
        return generator.generate(itemName, quantity, total);
    }
}

const processor = new OrderProcessor();

const checker = new InventoryChecker();
const calculator = new PriceCalculator();
const generator = new InvoiceGenerator();

const invoice = processor.processOrder("Laptop", 2,
    checker, calculator, generator);
console.log(invoice);
```


