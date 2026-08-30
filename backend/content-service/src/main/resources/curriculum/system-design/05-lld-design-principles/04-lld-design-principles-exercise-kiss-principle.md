---
id: "lld-design-principles-exercise-kiss-principle"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Principles"
subSection: ""
title: "Exercise: KISS Principle"
slug: "lld-design-principles-exercise-kiss-principle"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: KISS Principle as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: KISS Principle Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Design Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Simplify a StringFormatter

**Problem:** A developer built an overengineered string formatting system. There is a `FormatterRegistry` that stores formatters, a `FormatterFactory` that creates them, and a `FormatterChain` that applies them in sequence. All of this just to format a user's display name (trim whitespace and capitalize the first letter).

Your task: replace the entire system with a single `formatDisplayName` method.

**Requirements:**

- Accept a raw name string (e.g., `" john doe "`)
- Trim leading and trailing whitespace
- Capitalize the first letter of the result
- Return the formatted string (e.g., `"John doe"`)

```java
class DisplayNameFormatter {
    public String formatDisplayName(String name) {
        // Your implementation here
        return "";
    }
}

// Test
public class Main {
    public static void main(String[] args) {
        DisplayNameFormatter formatter = new DisplayNameFormatter();
        System.out.println(formatter.formatDisplayName("  john doe  "));
        System.out.println(formatter.formatDisplayName("ALICE"));
        System.out.println(formatter.formatDisplayName("  bob  "));
    }
}
```

```python
class DisplayNameFormatter:
    def format_display_name(self, name: str) -> str:
        # Your implementation here
        return ""

# Test
formatter = DisplayNameFormatter()
print(formatter.format_display_name("  john doe  "))
print(formatter.format_display_name("ALICE"))
print(formatter.format_display_name("  bob  "))
```

```cpp
#include <iostream>
#include <string>

using namespace std;

class DisplayNameFormatter {
public:
    string formatDisplayName(const string& name) {
        // Your implementation here
        return "";
    }
};

int main() {
    DisplayNameFormatter formatter;
    cout << formatter.formatDisplayName("  john doe  ") << endl;
    cout << formatter.formatDisplayName("ALICE") << endl;
    cout << formatter.formatDisplayName("  bob  ") << endl;
    return 0;
}
```

```go
package main

import "fmt"

type DisplayNameFormatter struct{}

func (d *DisplayNameFormatter) FormatDisplayName(name string) string {
	// Your implementation here
	return ""
}

// Test
func main() {
	formatter := &DisplayNameFormatter{}
	fmt.Println(formatter.FormatDisplayName("  john doe  "))
	fmt.Println(formatter.FormatDisplayName("ALICE"))
	fmt.Println(formatter.FormatDisplayName("  bob  "))
}
```

```csharp
using System;

class DisplayNameFormatter
{
    public string FormatDisplayName(string name)
    {
        // Your implementation here
        return "";
    }
}

// Test
class Program
{
    static void Main()
    {
        DisplayNameFormatter formatter = new DisplayNameFormatter();
        Console.WriteLine(formatter.FormatDisplayName("  john doe  "));
        Console.WriteLine(formatter.FormatDisplayName("ALICE"));
        Console.WriteLine(formatter.FormatDisplayName("  bob  "));
    }
}
```

```typescript
class DisplayNameFormatter {
    formatDisplayName(name: string): string {
        // Your implementation here
        return "";
    }
}

// Test
const formatter = new DisplayNameFormatter();
console.log(formatter.formatDisplayName("  john doe  "));
console.log(formatter.formatDisplayName("ALICE"));
console.log(formatter.formatDisplayName("  bob  "));
```

#### Solutions

```java
class DisplayNameFormatter {
    public String formatDisplayName(String name) {
        if (name == null || name.trim().isEmpty()) {
            return "";
        }
        String trimmed = name.trim();
        return Character.toUpperCase(trimmed.charAt(0)) + trimmed.substring(1).toLowerCase();
    }
}

// Test
public class Main {
    public static void main(String[] args) {
        DisplayNameFormatter formatter = new DisplayNameFormatter();
        System.out.println(formatter.formatDisplayName("  john doe  "));
        System.out.println(formatter.formatDisplayName("ALICE"));
        System.out.println(formatter.formatDisplayName("  bob  "));
    }
}
```

```python
class DisplayNameFormatter:
    def format_display_name(self, name: str) -> str:
        trimmed = name.strip()
        if not trimmed:
            return ""
        return trimmed[0].upper() + trimmed[1:].lower()

# Test
formatter = DisplayNameFormatter()
print(formatter.format_display_name("  john doe  "))
print(formatter.format_display_name("ALICE"))
print(formatter.format_display_name("  bob  "))
```

```cpp
#include <iostream>
#include <string>
#include <algorithm>
#include <cctype>

using namespace std;

class DisplayNameFormatter {
public:
    string formatDisplayName(const string& name) {
        // Trim leading whitespace
        size_t start = name.find_first_not_of(' ');
        if (start == string::npos) return "";
        // Trim trailing whitespace
        size_t end = name.find_last_not_of(' ');
        string trimmed = name.substr(start, end - start + 1);

        // Lowercase everything, then capitalize first letter
        transform(trimmed.begin(), trimmed.end(), trimmed.begin(), ::tolower);
        trimmed[0] = toupper(trimmed[0]);
        return trimmed;
    }
};

int main() {
    DisplayNameFormatter formatter;
    cout << formatter.formatDisplayName("  john doe  ") << endl;
    cout << formatter.formatDisplayName("ALICE") << endl;
    cout << formatter.formatDisplayName("  bob  ") << endl;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type DisplayNameFormatter struct{}

func (f DisplayNameFormatter) FormatDisplayName(name string) string {
	trimmed := strings.TrimSpace(name)
	if trimmed == "" {
		return ""
	}
	return strings.ToUpper(trimmed[:1]) + strings.ToLower(trimmed[1:])
}

func main() {
	formatter := DisplayNameFormatter{}
	fmt.Println(formatter.FormatDisplayName("  john doe  "))
	fmt.Println(formatter.FormatDisplayName("ALICE"))
	fmt.Println(formatter.FormatDisplayName("  bob  "))
}
```

```csharp
using System;

class DisplayNameFormatter
{
    public string FormatDisplayName(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return "";
        }
        string trimmed = name.Trim();
        return char.ToUpper(trimmed[0]) + trimmed.Substring(1).ToLower();
    }
}

// Test
class Program
{
    static void Main()
    {
        DisplayNameFormatter formatter = new DisplayNameFormatter();
        Console.WriteLine(formatter.FormatDisplayName("  john doe  "));
        Console.WriteLine(formatter.FormatDisplayName("ALICE"));
        Console.WriteLine(formatter.FormatDisplayName("  bob  "));
    }
}
```

```typescript
class DisplayNameFormatter {
    formatDisplayName(name: string): string {
        const trimmed = name.trim();
        if (trimmed.length === 0) {
            return "";
        }
        return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
    }
}

// Test
const formatter = new DisplayNameFormatter();
console.log(formatter.formatDisplayName("  john doe  "));
console.log(formatter.formatDisplayName("ALICE"));
console.log(formatter.formatDisplayName("  bob  "));
```

---

# Exercise 2: Build a Simple ReportExporter

**Problem:** Build a simple CSV report exporter. No interfaces, no abstract classes, no factory. Just a class that takes a list of records and writes them as CSV.

**Requirements:**

- Accept a list of string arrays, where each array is a row.
- The first row is the header.
- Return the CSV as a single string (rows separated by newlines, values separated by commas).

```java
import java.util.List;

class ReportExporter {
    public String exportCsv(List<String[]> rows) {
        // Your implementation here
        return "";
    }
}

// Test
public class Main {
    public static void main(String[] args) {
        ReportExporter exporter = new ReportExporter();
        List<String[]> data = List.of(
            new String[]{"Name", "Age", "City"},
            new String[]{"Alice", "30", "New York"},
            new String[]{"Bob", "25", "London"}
        );
        System.out.println(exporter.exportCsv(data));
    }
}
```

```python
class ReportExporter:
    def export_csv(self, rows: list[list[str]]) -> str:
        # Your implementation here
        return ""

# Test
exporter = ReportExporter()
data = [
    ["Name", "Age", "City"],
    ["Alice", "30", "New York"],
    ["Bob", "25", "London"]
]
print(exporter.export_csv(data))
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <sstream>

using namespace std;

class ReportExporter {
public:
    string exportCsv(const vector<vector<string>>& rows) {
        // Your implementation here
        return "";
    }
};

int main() {
    ReportExporter exporter;
    vector<vector<string>> data = {
        {"Name", "Age", "City"},
        {"Alice", "30", "New York"},
        {"Bob", "25", "London"}
    };
    cout << exporter.exportCsv(data) << endl;
    return 0;
}
```

```go
package main

type ReportExporter struct{}

func (r *ReportExporter) ExportCsv(rows [][]string) string {
	// Your implementation here
	return ""
}
```

```csharp
using System;
using System.Collections.Generic;

class ReportExporter
{
    public string ExportCsv(List<string[]> rows)
    {
        // Your implementation here
        return "";
    }
}

// Test
class Program
{
    static void Main()
    {
        ReportExporter exporter = new ReportExporter();
        List<string[]> data = new List<string[]>
        {
            new[] { "Name", "Age", "City" },
            new[] { "Alice", "30", "New York" },
            new[] { "Bob", "25", "London" }
        };
        Console.WriteLine(exporter.ExportCsv(data));
    }
}
```

```typescript
class ReportExporter {
    exportCsv(rows: string[][]): string {
        // Your implementation here
        return "";
    }
}

// Test
const exporter = new ReportExporter();
const data = [
    ["Name", "Age", "City"],
    ["Alice", "30", "New York"],
    ["Bob", "25", "London"]
];
console.log(exporter.exportCsv(data));
```

#### Solutions

```java
import java.util.List;

class ReportExporter {
    public String exportCsv(List<String[]> rows) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < rows.size(); i++) {
            sb.append(String.join(",", rows.get(i)));
            if (i < rows.size() - 1) {
                sb.append("\n");
            }
        }
        return sb.toString();
    }
}

// Test
public class Main {
    public static void main(String[] args) {
        ReportExporter exporter = new ReportExporter();
        List<String[]> data = List.of(
            new String[]{"Name", "Age", "City"},
            new String[]{"Alice", "30", "New York"},
            new String[]{"Bob", "25", "London"}
        );
        System.out.println(exporter.exportCsv(data));
    }
}
```

```python
class ReportExporter:
    def export_csv(self, rows: list[list[str]]) -> str:
        return "\n".join(",".join(row) for row in rows)

# Test
exporter = ReportExporter()
data = [
    ["Name", "Age", "City"],
    ["Alice", "30", "New York"],
    ["Bob", "25", "London"]
]
print(exporter.export_csv(data))
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <sstream>

using namespace std;

class ReportExporter {
public:
    string exportCsv(const vector<vector<string>>& rows) {
        string result;
        for (size_t i = 0; i < rows.size(); i++) {
            for (size_t j = 0; j < rows[i].size(); j++) {
                if (j > 0) result += ",";
                result += rows[i][j];
            }
            if (i < rows.size() - 1) result += "\n";
        }
        return result;
    }
};

int main() {
    ReportExporter exporter;
    vector<vector<string>> data = {
        {"Name", "Age", "City"},
        {"Alice", "30", "New York"},
        {"Bob", "25", "London"}
    };
    cout << exporter.exportCsv(data) << endl;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type ReportExporter struct{}

func (r ReportExporter) ExportCsv(rows [][]string) string {
	lines := make([]string, 0, len(rows))
	for _, row := range rows {
		lines = append(lines, strings.Join(row, ","))
	}
	return strings.Join(lines, "\n")
}

func main() {
	exporter := ReportExporter{}
	data := [][]string{
		{"Name", "Age", "City"},
		{"Alice", "30", "New York"},
		{"Bob", "25", "London"},
	}
	fmt.Println(exporter.ExportCsv(data))
}
```

```csharp
using System;
using System.Collections.Generic;

class ReportExporter
{
    public string ExportCsv(List<string[]> rows)
    {
        var lines = new List<string>();
        foreach (var row in rows)
        {
            lines.Add(string.Join(",", row));
        }
        return string.Join("\n", lines);
    }
}

// Test
class Program
{
    static void Main()
    {
        ReportExporter exporter = new ReportExporter();
        List<string[]> data = new List<string[]>
        {
            new[] { "Name", "Age", "City" },
            new[] { "Alice", "30", "New York" },
            new[] { "Bob", "25", "London" }
        };
        Console.WriteLine(exporter.ExportCsv(data));
    }
}
```

```typescript
class ReportExporter {
    exportCsv(rows: string[][]): string {
        return rows.map(row => row.join(",")).join("\n");
    }
}

// Test
const exporter = new ReportExporter();
const data = [
    ["Name", "Age", "City"],
    ["Alice", "30", "New York"],
    ["Bob", "25", "London"]
];
console.log(exporter.exportCsv(data));
```


