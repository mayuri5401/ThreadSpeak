---
id: "lld-design-patterns-exercise-flyweight-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Flyweight Design Pattern"
slug: "lld-design-patterns-exercise-flyweight-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Flyweight Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Flyweight Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Word Processor Font Styles

**Problem:** Build a word processor where characters share `FontStyle` flyweight objects. Each `FontStyle` stores the font family, size, and whether it is bold or italic. The position (line, column) is extrinsic state that varies per character.

**Requirements:**

- Flyweight interface: `FontStyle` with a method `format(int line, int column, char character)`
- Concrete flyweight: `ConcreteFontStyle` storing `fontFamily` (String), `fontSize` (int), `bold` (boolean), `italic` (boolean)
- Factory: `FontStyleFactory` with `getFontStyle(fontFamily, fontSize, bold, italic)` and `getStyleCount()`
- Client code creates multiple characters sharing styles, then prints them

```java
import java.util.HashMap;
import java.util.Map;

interface FontStyle {
    void format(int line, int column, char character);
}

class ConcreteFontStyle implements FontStyle {
    // TODO: Add fields (fontFamily, fontSize, bold, italic)

    public ConcreteFontStyle(String fontFamily, int fontSize, boolean bold, boolean italic) {
        // TODO: Store fontFamily, fontSize, bold, italic
    }

    @Override
    public void format(int line, int column, char character) {
        // TODO: Print "[fontFamily, fontSize, style] 'character' at line:column"
        // where style is "bold" if bold, "italic" if italic, otherwise "normal"
        // Example: "[Arial, 12, normal] 'H' at 1:1"
    }
}

class FontStyleFactory {
    // TODO: Add a Map<String, FontStyle> cache field

    public FontStyle getFontStyle(String fontFamily, int fontSize, boolean bold, boolean italic) {
        // TODO: Build key from fontFamily + fontSize + bold + italic
        // TODO: If key exists in cache, return cached instance
        // TODO: Otherwise create new ConcreteFontStyle, store in cache, return it
        return null;
    }

    public int getStyleCount() {
        // TODO: Return the number of cached styles
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        // FontStyleFactory factory = new FontStyleFactory();
        // FontStyle arial12 = factory.getFontStyle("Arial", 12, false, false);
        // FontStyle arial12Bold = factory.getFontStyle("Arial", 12, true, false);
        // FontStyle arial12Again = factory.getFontStyle("Arial", 12, false, false);
        //
        // arial12.format(1, 1, 'H');
        // arial12Bold.format(1, 2, 'e');
        // arial12Again.format(1, 3, 'l');
        //
        // System.out.println("Same instance" " + (arial12 == arial12Again));
        // System.out.println("Total styles: " + factory.getStyleCount());
    }
}
```

```python
from abc import ABC, abstractmethod

class FontStyle(ABC):
    @abstractmethod
    def format(self, line: int, column: int, character: str):
        pass

class ConcreteFontStyle(FontStyle):
    def __init__(self, font_family: str, font_size: int, bold: bool, italic: bool):
        # TODO: Store font_family, font_size, bold, italic
        pass

    def format(self, line: int, column: int, character: str):
        # TODO: Print "[fontFamily, fontSize, style] 'character' at line:column"
        # where style is "bold" if bold, "italic" if italic, otherwise "normal"
        # Example: "[Arial, 12, normal] 'H' at 1:1"
        pass

class FontStyleFactory:
    def __init__(self):
        # TODO: Initialize an empty dict for the cache
        pass

    def get_font_style(self, font_family: str, font_size: int, bold: bool, italic: bool):
        # TODO: Build key from font_family + font_size + bold + italic
        # TODO: If key exists in cache, return cached instance
        # TODO: Otherwise create new ConcreteFontStyle, store in cache, return it
        pass

    def get_style_count(self) -> int:
        # TODO: Return the number of cached styles
        return 0

if __name__ == "__main__":
    pass
    # factory = FontStyleFactory()
    # arial12 = factory.get_font_style("Arial", 12, False, False)
    # arial12_bold = factory.get_font_style("Arial", 12, True, False)
    # arial12_again = factory.get_font_style("Arial", 12, False, False)
    #
    # arial12.format(1, 1, 'H')
    # arial12_bold.format(1, 2, 'e')
    # arial12_again.format(1, 3, 'l')
    #
    # print(f"Same instance" {arial12 is arial12_again}")
    # print(f"Total styles: {factory.get_style_count()}")
```

```cpp
#include <iostream>
#include <string>
#include <map>
using namespace std;

class FontStyle {
public:
    virtual ~FontStyle() {}
    virtual void format(int line, int column, char character) = 0;
};

class ConcreteFontStyle : public FontStyle {
    // TODO: Add fields (fontFamily, fontSize, bold, italic)

public:
    ConcreteFontStyle(const string& fontFamily, int fontSize, bool bold, bool italic) {
        // TODO: Store fontFamily, fontSize, bold, italic
    }

    void format(int line, int column, char character) override {
        // TODO: Print "[fontFamily, fontSize, style] 'character' at line:column"
        // where style is "bold" if bold, "italic" if italic, otherwise "normal"
        // Example: "[Arial, 12, normal] 'H' at 1:1"
    }
};

class FontStyleFactory {
    // TODO: Add a map<string, FontStyle*> cache field

public:
    FontStyle* getFontStyle(const string& fontFamily, int fontSize, bool bold, bool italic) {
        // TODO: Build key from fontFamily + fontSize + bold + italic
        // TODO: If key exists in cache, return cached instance
        // TODO: Otherwise create new ConcreteFontStyle, store in cache, return it
        return nullptr;
    }

    int getStyleCount() {
        // TODO: Return the number of cached styles
        return 0;
    }
};

int main() {
    // FontStyleFactory factory;
    // FontStyle* arial12 = factory.getFontStyle("Arial", 12, false, false);
    // FontStyle* arial12Bold = factory.getFontStyle("Arial", 12, true, false);
    // FontStyle* arial12Again = factory.getFontStyle("Arial", 12, false, false);
    //
    // arial12->format(1, 1, 'H');
    // arial12Bold->format(1, 2, 'e');
    // arial12Again->format(1, 3, 'l');
    //
    // cout << "Same instance" " << (arial12 == arial12Again " "true" : "false") << endl;
    // cout << "Total styles: " << factory.getStyleCount() << endl;
    return 0;
}
```

```go
package main

import "fmt"

type FontStyle interface {
	Format(line int, column int, character rune)
}

type ConcreteFontStyle struct {
	// TODO: Add fields (fontFamily, fontSize, bold, italic)
}

func NewConcreteFontStyle(fontFamily string, fontSize int, bold bool, italic bool) *ConcreteFontStyle {
	// TODO: Store fontFamily, fontSize, bold, italic
	return &ConcreteFontStyle{}
}

func (c *ConcreteFontStyle) Format(line int, column int, character rune) {
	// TODO: Print "[fontFamily, fontSize, style] 'character' at line:column"
	// where style is "bold" if bold, "italic" if italic, otherwise "normal"
	// Example: "[Arial, 12, normal] 'H' at 1:1"
	_ = fmt.Sprintf("")
}

type FontStyleFactory struct {
	// TODO: Add a map[string]FontStyle cache field
}

func NewFontStyleFactory() *FontStyleFactory {
	// TODO: Initialize an empty map for the cache
	return &FontStyleFactory{}
}

func (f *FontStyleFactory) GetFontStyle(fontFamily string, fontSize int, bold bool, italic bool) FontStyle {
	// TODO: Build key from fontFamily + fontSize + bold + italic
	// TODO: If key exists in cache, return cached instance
	// TODO: Otherwise create new ConcreteFontStyle, store in cache, return it
	return nil
}

func (f *FontStyleFactory) GetStyleCount() int {
	// TODO: Return the number of cached styles
	return 0
}

func main() {
	// factory := NewFontStyleFactory()
	// arial12 := factory.GetFontStyle("Arial", 12, false, false)
	// arial12Bold := factory.GetFontStyle("Arial", 12, true, false)
	// arial12Again := factory.GetFontStyle("Arial", 12, false, false)
	//
	// arial12.Format(1, 1, 'H')
	// arial12Bold.Format(1, 2, 'e')
	// arial12Again.Format(1, 3, 'l')
	//
	// fmt.Println("Same instance"", arial12 == arial12Again)
	// fmt.Println("Total styles:", factory.GetStyleCount())
}
```

```csharp
using System;
using System.Collections.Generic;

interface IFontStyle
{
    void Format(int line, int column, char character);
}

class ConcreteFontStyle : IFontStyle
{
    // TODO: Add fields (fontFamily, fontSize, bold, italic)

    public ConcreteFontStyle(string fontFamily, int fontSize, bool bold, bool italic)
    {
        // TODO: Store fontFamily, fontSize, bold, italic
    }

    public void Format(int line, int column, char character)
    {
        // TODO: Print "[fontFamily, fontSize, style] 'character' at line:column"
        // where style is "bold" if bold, "italic" if italic, otherwise "normal"
        // Example: "[Arial, 12, normal] 'H' at 1:1"
    }
}

class FontStyleFactory
{
    // TODO: Add a Dictionary<string, IFontStyle> cache field

    public IFontStyle GetFontStyle(string fontFamily, int fontSize, bool bold, bool italic)
    {
        // TODO: Build key from fontFamily + fontSize + bold + italic
        // TODO: If key exists in cache, return cached instance
        // TODO: Otherwise create new ConcreteFontStyle, store in cache, return it
        return null;
    }

    public int GetStyleCount()
    {
        // TODO: Return the number of cached styles
        return 0;
    }
}

public class Program
{
    public static void Main()
    {
        // FontStyleFactory factory = new FontStyleFactory();
        // IFontStyle arial12 = factory.GetFontStyle("Arial", 12, false, false);
        // IFontStyle arial12Bold = factory.GetFontStyle("Arial", 12, true, false);
        // IFontStyle arial12Again = factory.GetFontStyle("Arial", 12, false, false);
        //
        // arial12.Format(1, 1, 'H');
        // arial12Bold.Format(1, 2, 'e');
        // arial12Again.Format(1, 3, 'l');
        //
        // Console.WriteLine("Same instance" " + (arial12 == arial12Again));
        // Console.WriteLine("Total styles: " + factory.GetStyleCount());
    }
}
```

```typescript
interface FontStyle {
    format(line: number, column: number, character: string): void;
}

class ConcreteFontStyle implements FontStyle {
    // TODO: Add fields (fontFamily, fontSize, bold, italic)

    constructor(fontFamily: string, fontSize: number, bold: boolean, italic: boolean) {
        // TODO: Store fontFamily, fontSize, bold, italic
    }

    format(line: number, column: number, character: string): void {
        // TODO: Print "[fontFamily, fontSize, style] 'character' at line:column"
        // where style is "bold" if bold, "italic" if italic, otherwise "normal"
        // Example: "[Arial, 12, normal] 'H' at 1:1"
    }
}

class FontStyleFactory {
    // TODO: Add a Map<string, FontStyle> cache field

    getFontStyle(fontFamily: string, fontSize: number, bold: boolean, italic: boolean): FontStyle {
        // TODO: Build key from fontFamily + fontSize + bold + italic
        // TODO: If key exists in cache, return cached instance
        // TODO: Otherwise create new ConcreteFontStyle, store in cache, return it
        return null as any;
    }

    getStyleCount(): number {
        // TODO: Return the number of cached styles
        return 0;
    }
}

// const factory = new FontStyleFactory();
// const arial12 = factory.getFontStyle("Arial", 12, false, false);
// const arial12Bold = factory.getFontStyle("Arial", 12, true, false);
// const arial12Again = factory.getFontStyle("Arial", 12, false, false);
//
// arial12.format(1, 1, "H");
// arial12Bold.format(1, 2, "e");
// arial12Again.format(1, 3, "l");
//
// console.log("Same instance" " + (arial12 === arial12Again));
// console.log("Total styles: " + factory.getStyleCount());
```

#### Solutions

```java
import java.util.HashMap;
import java.util.Map;

interface FontStyle {
    void format(int line, int column, char character);
}

class ConcreteFontStyle implements FontStyle {
    private String fontFamily;
    private int fontSize;
    private boolean bold;
    private boolean italic;

    public ConcreteFontStyle(String fontFamily, int fontSize, boolean bold, boolean italic) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.bold = bold;
        this.italic = italic;
    }

    @Override
    public void format(int line, int column, char character) {
        String style = bold " "bold" : (italic " "italic" : "normal");
        System.out.println("[" + fontFamily + ", " + fontSize + ", " + style + "] '" + character + "' at " + line + ":" + column);
    }
}

class FontStyleFactory {
    private Map<String, FontStyle> cache = new HashMap<>();

    public FontStyle getFontStyle(String fontFamily, int fontSize, boolean bold, boolean italic) {
        String key = fontFamily + fontSize + bold + italic;
        if (cache.containsKey(key)) {
            return cache.get(key);
        }
        FontStyle style = new ConcreteFontStyle(fontFamily, fontSize, bold, italic);
        cache.put(key, style);
        return style;
    }

    public int getStyleCount() {
        return cache.size();
    }
}

public class Main {
    public static void main(String[] args) {
        FontStyleFactory factory = new FontStyleFactory();
        FontStyle arial12 = factory.getFontStyle("Arial", 12, false, false);
        FontStyle arial12Bold = factory.getFontStyle("Arial", 12, true, false);
        FontStyle arial12Again = factory.getFontStyle("Arial", 12, false, false);

        arial12.format(1, 1, 'H');
        arial12Bold.format(1, 2, 'e');
        arial12Again.format(1, 3, 'l');

        System.out.println("Same instance" " + (arial12 == arial12Again));
        System.out.println("Total styles: " + factory.getStyleCount());
    }
}
```

```python
from abc import ABC, abstractmethod

class FontStyle(ABC):
    @abstractmethod
    def format(self, line: int, column: int, character: str):
        pass

class ConcreteFontStyle(FontStyle):
    def __init__(self, font_family: str, font_size: int, bold: bool, italic: bool):
        self.font_family = font_family
        self.font_size = font_size
        self.bold = bold
        self.italic = italic

    def format(self, line: int, column: int, character: str):
        style = "bold" if self.bold else ("italic" if self.italic else "normal")
        print(f"[{self.font_family}, {self.font_size}, {style}] '{character}' at {line}:{column}")

class FontStyleFactory:
    def __init__(self):
        self._cache = {}

    def get_font_style(self, font_family: str, font_size: int, bold: bool, italic: bool):
        key = f"{font_family}{font_size}{bold}{italic}"
        if key in self._cache:
            return self._cache[key]
        style = ConcreteFontStyle(font_family, font_size, bold, italic)
        self._cache[key] = style
        return style

    def get_style_count(self) -> int:
        return len(self._cache)

if __name__ == "__main__":
    factory = FontStyleFactory()
    arial12 = factory.get_font_style("Arial", 12, False, False)
    arial12_bold = factory.get_font_style("Arial", 12, True, False)
    arial12_again = factory.get_font_style("Arial", 12, False, False)

    arial12.format(1, 1, 'H')
    arial12_bold.format(1, 2, 'e')
    arial12_again.format(1, 3, 'l')

    print(f"Same instance" {arial12 is arial12_again}")
    print(f"Total styles: {factory.get_style_count()}")
```

```cpp
#include <iostream>
#include <string>
#include <map>

using namespace std;

class FontStyle {
public:
    virtual ~FontStyle() {}
    virtual void format(int line, int column, char character) = 0;
};

class ConcreteFontStyle : public FontStyle {
    string fontFamily;
    int fontSize;
    bool bold;
    bool italic;
public:
    ConcreteFontStyle(const string& fontFamily, int fontSize, bool bold, bool italic)
        : fontFamily(fontFamily), fontSize(fontSize), bold(bold), italic(italic) {}

    void format(int line, int column, char character) override {
        string style = bold " "bold" : (italic " "italic" : "normal");
        cout << "[" << fontFamily << ", " << fontSize << ", " << style << "] '" << character << "' at " << line << ":" << column << endl;
    }
};

class FontStyleFactory {
    map<string, FontStyle*> cache;
public:
    FontStyle* getFontStyle(const string& fontFamily, int fontSize, bool bold, bool italic) {
        string key = fontFamily + to_string(fontSize) + (bold " "true" : "false") + (italic " "true" : "false");
        if (cache.find(key) != cache.end()) {
            return cache[key];
        }
        FontStyle* style = new ConcreteFontStyle(fontFamily, fontSize, bold, italic);
        cache[key] = style;
        return style;
    }

    int getStyleCount() {
        return cache.size();
    }
};

int main() {
    FontStyleFactory factory;
    FontStyle* arial12 = factory.getFontStyle("Arial", 12, false, false);
    FontStyle* arial12Bold = factory.getFontStyle("Arial", 12, true, false);
    FontStyle* arial12Again = factory.getFontStyle("Arial", 12, false, false);

    arial12->format(1, 1, 'H');
    arial12Bold->format(1, 2, 'e');
    arial12Again->format(1, 3, 'l');

    cout << "Same instance" " << (arial12 == arial12Again " "true" : "false") << endl;
    cout << "Total styles: " << factory.getStyleCount() << endl;
    return 0;
}
```

```go
package main

import (
	"fmt"
	"strconv"
)

type FontStyle interface {
	Format(line int, column int, character rune)
}

type ConcreteFontStyle struct {
	fontFamily string
	fontSize   int
	bold       bool
	italic     bool
}

func NewConcreteFontStyle(fontFamily string, fontSize int, bold bool, italic bool) *ConcreteFontStyle {
	return &ConcreteFontStyle{
		fontFamily: fontFamily,
		fontSize:    fontSize,
		bold:        bold,
		italic:      italic,
	}
}

func (c *ConcreteFontStyle) Format(line int, column int, character rune) {
	style := "normal"
	if c.bold {
		style = "bold"
	} else if c.italic {
		style = "italic"
	}
	fmt.Printf("[%s, %d, %s] '%c' at %d:%d\n", c.fontFamily, c.fontSize, style, character, line, column)
}

type FontStyleFactory struct {
	cache map[string]FontStyle
}

func NewFontStyleFactory() *FontStyleFactory {
	return &FontStyleFactory{
		cache: make(map[string]FontStyle),
	}
}

func (f *FontStyleFactory) GetFontStyle(fontFamily string, fontSize int, bold bool, italic bool) FontStyle {
	key := fontFamily + strconv.Itoa(fontSize) + strconv.FormatBool(bold) + strconv.FormatBool(italic)
	if style, ok := f.cache[key]; ok {
		return style
	}
	style := NewConcreteFontStyle(fontFamily, fontSize, bold, italic)
	f.cache[key] = style
	return style
}

func (f *FontStyleFactory) GetStyleCount() int {
	return len(f.cache)
}

func main() {
	factory := NewFontStyleFactory()
	arial12 := factory.GetFontStyle("Arial", 12, false, false)
	arial12Bold := factory.GetFontStyle("Arial", 12, true, false)
	arial12Again := factory.GetFontStyle("Arial", 12, false, false)

	arial12.Format(1, 1, 'H')
	arial12Bold.Format(1, 2, 'e')
	arial12Again.Format(1, 3, 'l')

	fmt.Printf("Same instance" %v\n", arial12 == arial12Again)
	fmt.Printf("Total styles: %d\n", factory.GetStyleCount())
}
```

```csharp
using System;
using System.Collections.Generic;

interface IFontStyle
{
    void Format(int line, int column, char character);
}

class ConcreteFontStyle : IFontStyle
{
    private string fontFamily;
    private int fontSize;
    private bool bold;
    private bool italic;

    public ConcreteFontStyle(string fontFamily, int fontSize, bool bold, bool italic)
    {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.bold = bold;
        this.italic = italic;
    }

    public void Format(int line, int column, char character)
    {
        string style = bold " "bold" : (italic " "italic" : "normal");
        Console.WriteLine($"[{fontFamily}, {fontSize}, {style}] '{character}' at {line}:{column}");
    }
}

class FontStyleFactory
{
    private Dictionary<string, IFontStyle> cache = new Dictionary<string, IFontStyle>();

    public IFontStyle GetFontStyle(string fontFamily, int fontSize, bool bold, bool italic)
    {
        string key = fontFamily + fontSize + bold + italic;
        if (cache.ContainsKey(key))
            return cache[key];
        IFontStyle style = new ConcreteFontStyle(fontFamily, fontSize, bold, italic);
        cache[key] = style;
        return style;
    }

    public int GetStyleCount()
    {
        return cache.Count;
    }
}

public class Program
{
    public static void Main()
    {
        FontStyleFactory factory = new FontStyleFactory();
        IFontStyle arial12 = factory.GetFontStyle("Arial", 12, false, false);
        IFontStyle arial12Bold = factory.GetFontStyle("Arial", 12, true, false);
        IFontStyle arial12Again = factory.GetFontStyle("Arial", 12, false, false);

        arial12.Format(1, 1, 'H');
        arial12Bold.Format(1, 2, 'e');
        arial12Again.Format(1, 3, 'l');

        Console.WriteLine("Same instance" " + (arial12 == arial12Again));
        Console.WriteLine("Total styles: " + factory.GetStyleCount());
    }
}
```

```typescript
interface FontStyle {
    format(line: number, column: number, character: string): void;
}

class ConcreteFontStyle implements FontStyle {
    private fontFamily: string;
    private fontSize: number;
    private bold: boolean;
    private italic: boolean;

    constructor(fontFamily: string, fontSize: number, bold: boolean, italic: boolean) {
        this.fontFamily = fontFamily;
        this.fontSize = fontSize;
        this.bold = bold;
        this.italic = italic;
    }

    format(line: number, column: number, character: string): void {
        const style = this.bold " "bold" : (this.italic " "italic" : "normal");
        console.log(`[${this.fontFamily}, ${this.fontSize}, ${style}] '${character}' at ${line}:${column}`);
    }
}

class FontStyleFactory {
    private cache: Map<string, FontStyle> = new Map();

    constructor() {}

    getFontStyle(fontFamily: string, fontSize: number, bold: boolean, italic: boolean): FontStyle {
        const key = `${fontFamily}${fontSize}${bold}${italic}`;
        if (this.cache.has(key)) {
            return this.cache.get(key)!;
        }
        const style = new ConcreteFontStyle(fontFamily, fontSize, bold, italic);
        this.cache.set(key, style);
        return style;
    }

    getStyleCount(): number {
        return this.cache.size;
    }
}

const factory = new FontStyleFactory();
const arial12 = factory.getFontStyle("Arial", 12, false, false);
const arial12Bold = factory.getFontStyle("Arial", 12, true, false);
const arial12Again = factory.getFontStyle("Arial", 12, false, false);

arial12.format(1, 1, "H");
arial12Bold.format(1, 2, "e");
arial12Again.format(1, 3, "l");

console.log("Same instance"", arial12 === arial12Again);
console.log("Total styles:", factory.getStyleCount());
```

---

# Exercise 2: Web Browser Icon Cache

> [!PAYWALL] This content is for premium members only.

**Problem:** Build a web browser icon cache with a maximum size limit. When the cache is full and a new icon type is requested, evict the least recently used (LRU) entry. This exercise combines the Flyweight pattern with a cache eviction policy, which is something you will encounter in real systems where memory is bounded.

**Requirements:**

- Flyweight interface: `PageIcon` with `display(String url, int x, int y)`
- Concrete flyweight: `ConcretePageIcon` storing `iconType` (e.g., "favicon", "bookmark", "history"), `color`, `size`
- Factory: `IconCacheFactory` with a max capacity (e.g., 3), `getIcon(iconType, color, size)`, and LRU eviction
- When the cache is full and a new icon type is requested, evict the least recently used entry and print a message
- `getIcon()` for an existing entry should update its "last used" timestamp

```java
import java.util.LinkedHashMap;
import java.util.Map;

interface PageIcon {
    void display(String url, int x, int y);
}

class ConcretePageIcon implements PageIcon {
    // TODO: Add fields (iconType, color, size)

    public ConcretePageIcon(String iconType, String color, int size) {
        // TODO: Store iconType, color, size
    }

    @Override
    public void display(String url, int x, int y) {
        // TODO: Print "[iconType, color, sizepx] at url (x,y)"
        // Example: "[favicon, blue, 16px] at google.com (10,10)"
    }
}

class IconCacheFactory {
    // TODO: Add fields (cache with LRU tracking, maxCapacity)
    // Hint: Use LinkedHashMap with accessOrder=true for automatic LRU ordering

    public IconCacheFactory(int maxCapacity) {
        // TODO: Store maxCapacity and initialize cache
    }

    public PageIcon getIcon(String iconType, String color, int size) {
        // TODO: Step 1 - Build key as iconType + "_" + color + "_" + size
        // TODO: Step 2 - If key exists in cache:
        //                 print "Cache HIT: [key]", update LRU order, return cached icon
        // TODO: Step 3 - If cache is full (size >= maxCapacity):
        //                 find LRU entry (oldest), print "Evicting icon: [key]", remove it
        // TODO: Step 4 - Print "Cache MISS: [key]", create new ConcretePageIcon, add to cache, return it
        return null;
    }

    public int getCacheSize() {
        // TODO: Return the current number of cached icons
        return 0;
    }
}

public class Main {
    public static void main(String[] args) {
        // IconCacheFactory cache = new IconCacheFactory(3);
        //
        // cache.getIcon("favicon", "blue", 16).display("google.com", 10, 10);
        // cache.getIcon("bookmark", "gold", 24).display("github.com", 30, 10);
        // cache.getIcon("history", "gray", 16).display("stackoverflow.com", 50, 10);
        // cache.getIcon("favicon", "blue", 16).display("google.com", 70, 10);  // HIT
        // cache.getIcon("download", "green", 32).display("example.com", 90, 10);  // evicts LRU
        //
        // System.out.println("Cache size: " + cache.getCacheSize());
    }
}
```

```python
from abc import ABC, abstractmethod
from collections import OrderedDict

class PageIcon(ABC):
    @abstractmethod
    def display(self, url: str, x: int, y: int):
        pass

class ConcretePageIcon(PageIcon):
    def __init__(self, icon_type: str, color: str, size: int):
        # TODO: Store icon_type, color, size
        pass

    def display(self, url: str, x: int, y: int):
        # TODO: Print "[iconType, color, sizepx] at url (x,y)"
        # Example: "[favicon, blue, 16px] at google.com (10,10)"
        pass

class IconCacheFactory:
    def __init__(self, max_capacity: int):
        # TODO: Store max_capacity and initialize cache
        # Hint: Use OrderedDict for automatic LRU ordering
        pass

    def get_icon(self, icon_type: str, color: str, size: int):
        # TODO: Step 1 - Build key as icon_type + "_" + color + "_" + str(size)
        # TODO: Step 2 - If key exists in cache:
        #                 print "Cache HIT: [key]", move to end (most recent), return cached icon
        # TODO: Step 3 - If cache is full (len >= max_capacity):
        #                 pop first item (LRU), print "Evicting icon: [key]"
        # TODO: Step 4 - Print "Cache MISS: [key]", create new ConcretePageIcon, add to cache, return it
        pass

    def get_cache_size(self) -> int:
        # TODO: Return the current number of cached icons
        return 0

if __name__ == "__main__":
    pass
    # cache = IconCacheFactory(max_capacity=3)
    #
    # cache.get_icon("favicon", "blue", 16).display("google.com", 10, 10)
    # cache.get_icon("bookmark", "gold", 24).display("github.com", 30, 10)
    # cache.get_icon("history", "gray", 16).display("stackoverflow.com", 50, 10)
    # cache.get_icon("favicon", "blue", 16).display("google.com", 70, 10)  # HIT
    # cache.get_icon("download", "green", 32).display("example.com", 90, 10)  # evicts LRU
    #
    # print(f"Cache size: {cache.get_cache_size()}")
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <list>
using namespace std;

class PageIcon {
public:
    virtual ~PageIcon() {}
    virtual void display(const string& url, int x, int y) = 0;
};

class ConcretePageIcon : public PageIcon {
    // TODO: Add fields (iconType, color, size)

public:
    ConcretePageIcon(const string& iconType, const string& color, int size) {
        // TODO: Store iconType, color, size
    }

    void display(const string& url, int x, int y) override {
        // TODO: Print "[iconType, color, sizepx] at url (x,y)"
        // Example: "[favicon, blue, 16px] at google.com (10,10)"
    }
};

class IconCacheFactory {
    // TODO: Add fields (cache map, LRU tracking list, maxCapacity)
    // Hint: Use list<string> for LRU order + map<string, PageIcon*> for cache

public:
    IconCacheFactory(int maxCapacity) {
        // TODO: Store maxCapacity and initialize cache and LRU list
    }

    PageIcon* getIcon(const string& iconType, const string& color, int size) {
        // TODO: Step 1 - Build key as iconType + "_" + color + "_" + to_string(size)
        // TODO: Step 2 - If key exists in cache:
        //                 print "Cache HIT: [key]", move to back of LRU list, return cached icon
        // TODO: Step 3 - If cache is full (size >= maxCapacity):
        //                 get front of LRU list (oldest), print "Evicting icon: [key]", remove from cache and list
        // TODO: Step 4 - Print "Cache MISS: [key]", create new ConcretePageIcon, add to cache and LRU list, return it
        return nullptr;
    }

    int getCacheSize() {
        // TODO: Return the current number of cached icons
        return 0;
    }
};

int main() {
    // IconCacheFactory cache(3);
    //
    // cache.getIcon("favicon", "blue", 16)->display("google.com", 10, 10);
    // cache.getIcon("bookmark", "gold", 24)->display("github.com", 30, 10);
    // cache.getIcon("history", "gray", 16)->display("stackoverflow.com", 50, 10);
    // cache.getIcon("favicon", "blue", 16)->display("google.com", 70, 10);  // HIT
    // cache.getIcon("download", "green", 32)->display("example.com", 90, 10);  // evicts LRU
    //
    // cout << "Cache size: " << cache.getCacheSize() << endl;
    return 0;
}
```

```go
package main

import "fmt"

type PageIcon interface {
	display(url string, x int, y int)
}

type ConcretePageIcon struct {
	// TODO: Add fields (iconType, color, size)
}

func NewConcretePageIcon(iconType string, color string, size int) *ConcretePageIcon {
	// TODO: Store iconType, color, size
	return &ConcretePageIcon{}
}

func (c *ConcretePageIcon) display(url string, x int, y int) {
	// TODO: Print "[iconType, color, sizepx] at url (x,y)"
	// Example: "[favicon, blue, 16px] at google.com (10,10)"
	_ = fmt.Sprintf("")
}

type IconCacheFactory struct {
	// TODO: Add fields (cache with LRU tracking, maxCapacity)
	// Hint: Use a map with access-order tracking via a doubly linked list or similar structure
}

func NewIconCacheFactory(maxCapacity int) *IconCacheFactory {
	// TODO: Store maxCapacity and initialize cache
	return &IconCacheFactory{}
}

func (i *IconCacheFactory) getIcon(iconType string, color string, size int) PageIcon {
	// TODO: Step 1 - Build key as iconType + "_" + color + "_" + size
	// TODO: Step 2 - If key exists in cache:
	//                 print "Cache HIT: [key]", update LRU order, return cached icon
	// TODO: Step 3 - If cache is full (size >= maxCapacity):
	//                 find LRU entry (oldest), print "Evicting icon: [key]", remove it
	// TODO: Step 4 - Print "Cache MISS: [key]", create new ConcretePageIcon, add to cache, return it
	return nil
}

func (i *IconCacheFactory) getCacheSize() int {
	// TODO: Return the current number of cached icons
	return 0
}

func main() {
	// cache := NewIconCacheFactory(3)
	//
	// cache.getIcon("favicon", "blue", 16).display("google.com", 10, 10)
	// cache.getIcon("bookmark", "gold", 24).display("github.com", 30, 10)
	// cache.getIcon("history", "gray", 16).display("stackoverflow.com", 50, 10)
	// cache.getIcon("favicon", "blue", 16).display("google.com", 70, 10)  // HIT
	// cache.getIcon("download", "green", 32).display("example.com", 90, 10)  // evicts LRU
	//
	// fmt.Println("Cache size:", cache.getCacheSize())
}
```

```csharp
using System;
using System.Collections.Generic;

interface IPageIcon
{
    void Display(string url, int x, int y);
}

class ConcretePageIcon : IPageIcon
{
    // TODO: Add fields (iconType, color, size)

    public ConcretePageIcon(string iconType, string color, int size)
    {
        // TODO: Store iconType, color, size
    }

    public void Display(string url, int x, int y)
    {
        // TODO: Print "[iconType, color, sizepx] at url (x,y)"
        // Example: "[favicon, blue, 16px] at google.com (10,10)"
    }
}

class IconCacheFactory
{
    // TODO: Add fields (cache dictionary, LRU tracking list, maxCapacity)
    // Hint: Use LinkedList<string> for LRU order + Dictionary<string, IPageIcon> for cache

    public IconCacheFactory(int maxCapacity)
    {
        // TODO: Store maxCapacity and initialize cache and LRU list
    }

    public IPageIcon GetIcon(string iconType, string color, int size)
    {
        // TODO: Step 1 - Build key as iconType + "_" + color + "_" + size
        // TODO: Step 2 - If key exists in cache:
        //                 print "Cache HIT: [key]", move to end of LRU list, return cached icon
        // TODO: Step 3 - If cache is full (Count >= maxCapacity):
        //                 get first of LRU list (oldest), print "Evicting icon: [key]", remove from cache and list
        // TODO: Step 4 - Print "Cache MISS: [key]", create new ConcretePageIcon, add to cache and LRU list, return it
        return null;
    }

    public int GetCacheSize()
    {
        // TODO: Return the current number of cached icons
        return 0;
    }
}

public class Program
{
    public static void Main()
    {
        // IconCacheFactory cache = new IconCacheFactory(3);
        //
        // cache.GetIcon("favicon", "blue", 16).Display("google.com", 10, 10);
        // cache.GetIcon("bookmark", "gold", 24).Display("github.com", 30, 10);
        // cache.GetIcon("history", "gray", 16).Display("stackoverflow.com", 50, 10);
        // cache.GetIcon("favicon", "blue", 16).Display("google.com", 70, 10);  // HIT
        // cache.GetIcon("download", "green", 32).Display("example.com", 90, 10);  // evicts LRU
        //
        // Console.WriteLine("Cache size: " + cache.GetCacheSize());
    }
}
```

```typescript
interface PageIcon {
    display(url: string, x: number, y: number): void;
}

class ConcretePageIcon implements PageIcon {
    // TODO: Add fields (iconType, color, size)

    constructor(iconType: string, color: string, size: number) {
        // TODO: Store iconType, color, size
    }

    display(url: string, x: number, y: number): void {
        // TODO: Print "[iconType, color, sizepx] at url (x,y)"
        // Example: "[favicon, blue, 16px] at google.com (10,10)"
    }
}

class IconCacheFactory {
    // TODO: Add fields (cache Map, LRU tracking, maxCapacity)
    // Hint: Map maintains insertion order in JS/TS — delete and re-insert to update LRU order

    constructor(maxCapacity: number) {
        // TODO: Store maxCapacity and initialize cache
    }

    getIcon(iconType: string, color: string, size: number): PageIcon {
        // TODO: Step 1 - Build key as iconType + "_" + color + "_" + size
        // TODO: Step 2 - If key exists in cache:
        //                 print "Cache HIT: [key]", delete and re-insert to update LRU order, return cached icon
        // TODO: Step 3 - If cache is full (size >= maxCapacity):
        //                 get first key from Map (oldest), print "Evicting icon: [key]", delete it
        // TODO: Step 4 - Print "Cache MISS: [key]", create new ConcretePageIcon, add to cache, return it
        return null as any;
    }

    getCacheSize(): number {
        // TODO: Return the current number of cached icons
        return 0;
    }
}

// const cache = new IconCacheFactory(3);
//
// cache.getIcon("favicon", "blue", 16).display("google.com", 10, 10);
// cache.getIcon("bookmark", "gold", 24).display("github.com", 30, 10);
// cache.getIcon("history", "gray", 16).display("stackoverflow.com", 50, 10);
// cache.getIcon("favicon", "blue", 16).display("google.com", 70, 10);  // HIT
// cache.getIcon("download", "green", 32).display("example.com", 90, 10);  // evicts LRU
//
// console.log("Cache size: " + cache.getCacheSize());
```

#### Solutions

```java
import java.util.LinkedHashMap;
import java.util.Map;

interface PageIcon {
    void display(String url, int x, int y);
}

class ConcretePageIcon implements PageIcon {
    private String iconType;
    private String color;
    private int size;

    public ConcretePageIcon(String iconType, String color, int size) {
        this.iconType = iconType;
        this.color = color;
        this.size = size;
    }

    @Override
    public void display(String url, int x, int y) {
        System.out.println("[" + iconType + ", " + color + ", " + size + "px] at " + url + " (" + x + "," + y + ")");
    }
}

class IconCacheFactory {
    private LinkedHashMap<String, PageIcon> cache;
    private int maxCapacity;

    public IconCacheFactory(int maxCapacity) {
        this.maxCapacity = maxCapacity;
        this.cache = new LinkedHashMap<>(16, 0.75f, true);
    }

    public PageIcon getIcon(String iconType, String color, int size) {
        String key = iconType + "_" + color + "_" + size;
        if (cache.containsKey(key)) {
            System.out.println("Cache HIT: " + key);
            return cache.get(key);
        }
        if (cache.size() >= maxCapacity) {
            String lruKey = cache.keySet().iterator().next();
            cache.remove(lruKey);
            System.out.println("Evicting icon: " + lruKey);
        }
        System.out.println("Cache MISS: " + key);
        PageIcon icon = new ConcretePageIcon(iconType, color, size);
        cache.put(key, icon);
        return icon;
    }

    public int getCacheSize() {
        return cache.size();
    }
}

public class Main {
    public static void main(String[] args) {
        IconCacheFactory cache = new IconCacheFactory(3);

        cache.getIcon("favicon", "blue", 16).display("google.com", 10, 10);
        cache.getIcon("bookmark", "gold", 24).display("github.com", 30, 10);
        cache.getIcon("history", "gray", 16).display("stackoverflow.com", 50, 10);
        cache.getIcon("favicon", "blue", 16).display("google.com", 70, 10);  // HIT
        cache.getIcon("download", "green", 32).display("example.com", 90, 10);  // evicts LRU

        System.out.println("Cache size: " + cache.getCacheSize());
    }
}
```

```python
from abc import ABC, abstractmethod
from collections import OrderedDict

class PageIcon(ABC):
    @abstractmethod
    def display(self, url: str, x: int, y: int):
        pass

class ConcretePageIcon(PageIcon):
    def __init__(self, icon_type: str, color: str, size: int):
        self.icon_type = icon_type
        self.color = color
        self.size = size

    def display(self, url: str, x: int, y: int):
        print(f"[{self.icon_type}, {self.color}, {self.size}px] at {url} ({x},{y})")

class IconCacheFactory:
    def __init__(self, max_capacity: int):
        self._max_capacity = max_capacity
        self._cache = OrderedDict()

    def get_icon(self, icon_type: str, color: str, size: int):
        key = f"{icon_type}_{color}_{size}"
        if key in self._cache:
            print(f"Cache HIT: {key}")
            self._cache.move_to_end(key)
            return self._cache[key]
        if len(self._cache) >= self._max_capacity:
            lru_key, _ = self._cache.popitem(last=False)
            print(f"Evicting icon: {lru_key}")
        print(f"Cache MISS: {key}")
        icon = ConcretePageIcon(icon_type, color, size)
        self._cache[key] = icon
        return icon

    def get_cache_size(self) -> int:
        return len(self._cache)

if __name__ == "__main__":
    cache = IconCacheFactory(max_capacity=3)

    cache.get_icon("favicon", "blue", 16).display("google.com", 10, 10)
    cache.get_icon("bookmark", "gold", 24).display("github.com", 30, 10)
    cache.get_icon("history", "gray", 16).display("stackoverflow.com", 50, 10)
    cache.get_icon("favicon", "blue", 16).display("google.com", 70, 10)  # HIT
    cache.get_icon("download", "green", 32).display("example.com", 90, 10)  # evicts LRU

    print(f"Cache size: {cache.get_cache_size()}")
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <list>

using namespace std;

class PageIcon {
public:
    virtual ~PageIcon() {}
    virtual void display(const string& url, int x, int y) = 0;
};

class ConcretePageIcon : public PageIcon {
    string iconType;
    string color;
    int size;
public:
    ConcretePageIcon(const string& iconType, const string& color, int size)
        : iconType(iconType), color(color), size(size) {}

    void display(const string& url, int x, int y) override {
        cout << "[" << iconType << ", " << color << ", " << size << "px] at " << url << " (" << x << "," << y << ")" << endl;
    }
};

class IconCacheFactory {
    map<string, PageIcon*> cache;
    list<string> lruOrder;
    int maxCapacity;
public:
    IconCacheFactory(int maxCapacity) : maxCapacity(maxCapacity) {}

    PageIcon* getIcon(const string& iconType, const string& color, int size) {
        string key = iconType + "_" + color + "_" + to_string(size);
        if (cache.find(key) != cache.end()) {
            cout << "Cache HIT: " << key << endl;
            lruOrder.remove(key);
            lruOrder.push_back(key);
            return cache[key];
        }
        if ((int)cache.size() >= maxCapacity) {
            string lruKey = lruOrder.front();
            lruOrder.pop_front();
            delete cache[lruKey];
            cache.erase(lruKey);
            cout << "Evicting icon: " << lruKey << endl;
        }
        cout << "Cache MISS: " << key << endl;
        PageIcon* icon = new ConcretePageIcon(iconType, color, size);
        cache[key] = icon;
        lruOrder.push_back(key);
        return icon;
    }

    int getCacheSize() {
        return cache.size();
    }
};

int main() {
    IconCacheFactory cache(3);

    cache.getIcon("favicon", "blue", 16)->display("google.com", 10, 10);
    cache.getIcon("bookmark", "gold", 24)->display("github.com", 30, 10);
    cache.getIcon("history", "gray", 16)->display("stackoverflow.com", 50, 10);
    cache.getIcon("favicon", "blue", 16)->display("google.com", 70, 10);  // HIT
    cache.getIcon("download", "green", 32)->display("example.com", 90, 10);  // evicts LRU

    cout << "Cache size: " << cache.getCacheSize() << endl;
    return 0;
}
```

```go
package main

import (
	"container/list"
	"fmt"
)

type PageIcon interface {
	Display(url string, x int, y int)
}

type ConcretePageIcon struct {
	iconType string
	color    string
	size     int
}

func NewConcretePageIcon(iconType, color string, size int) *ConcretePageIcon {
	return &ConcretePageIcon{
		iconType: iconType,
		color:    color,
		size:     size,
	}
}

func (c *ConcretePageIcon) Display(url string, x int, y int) {
	fmt.Printf("[%s, %s, %dpx] at %s (%d,%d)\n", c.iconType, c.color, c.size, url, x, y)
}

type IconCacheFactory struct {
	cache       map[string]*list.Element
	lruOrder    *list.List
	maxCapacity int
}

type cacheEntry struct {
	key  string
	icon PageIcon
}

func NewIconCacheFactory(maxCapacity int) *IconCacheFactory {
	return &IconCacheFactory{
		cache:       make(map[string]*list.Element),
		lruOrder:    list.New(),
		maxCapacity: maxCapacity,
	}
}

func (f *IconCacheFactory) GetIcon(iconType, color string, size int) PageIcon {
	key := fmt.Sprintf("%s_%s_%d", iconType, color, size)

	if elem, ok := f.cache[key]; ok {
		fmt.Printf("Cache HIT: %s\n", key)
		f.lruOrder.MoveToBack(elem)
		return elem.Value.(*cacheEntry).icon
	}

	if len(f.cache) >= f.maxCapacity && f.lruOrder.Len() > 0 {
		front := f.lruOrder.Front()
		entry := front.Value.(*cacheEntry)
		f.lruOrder.Remove(front)
		delete(f.cache, entry.key)
		fmt.Printf("Evicting icon: %s\n", entry.key)
	}

	fmt.Printf("Cache MISS: %s\n", key)
	icon := NewConcretePageIcon(iconType, color, size)
	elem := f.lruOrder.PushBack(&cacheEntry{
		key:  key,
		icon: icon,
	})
	f.cache[key] = elem
	return icon
}

func (f *IconCacheFactory) GetCacheSize() int {
	return len(f.cache)
}

func main() {
	cache := NewIconCacheFactory(3)

	cache.GetIcon("favicon", "blue", 16).Display("google.com", 10, 10)
	cache.GetIcon("bookmark", "gold", 24).Display("github.com", 30, 10)
	cache.GetIcon("history", "gray", 16).Display("stackoverflow.com", 50, 10)
	cache.GetIcon("favicon", "blue", 16).Display("google.com", 70, 10)
	cache.GetIcon("download", "green", 32).Display("example.com", 90, 10)

	fmt.Println("Cache size:", cache.GetCacheSize())
}
```

```csharp
using System;
using System.Collections.Generic;

interface IPageIcon
{
    void Display(string url, int x, int y);
}

class ConcretePageIcon : IPageIcon
{
    private string iconType;
    private string color;
    private int size;

    public ConcretePageIcon(string iconType, string color, int size)
    {
        this.iconType = iconType;
        this.color = color;
        this.size = size;
    }

    public void Display(string url, int x, int y)
    {
        Console.WriteLine($"[{iconType}, {color}, {size}px] at {url} ({x},{y})");
    }
}

class IconCacheFactory
{
    private Dictionary<string, IPageIcon> cache = new Dictionary<string, IPageIcon>();
    private LinkedList<string> lruOrder = new LinkedList<string>();
    private int maxCapacity;

    public IconCacheFactory(int maxCapacity)
    {
        this.maxCapacity = maxCapacity;
    }

    public IPageIcon GetIcon(string iconType, string color, int size)
    {
        string key = iconType + "_" + color + "_" + size;
        if (cache.ContainsKey(key))
        {
            Console.WriteLine("Cache HIT: " + key);
            lruOrder.Remove(key);
            lruOrder.AddLast(key);
            return cache[key];
        }
        if (cache.Count >= maxCapacity)
        {
            string lruKey = lruOrder.First.Value;
            lruOrder.RemoveFirst();
            cache.Remove(lruKey);
            Console.WriteLine("Evicting icon: " + lruKey);
        }
        Console.WriteLine("Cache MISS: " + key);
        IPageIcon icon = new ConcretePageIcon(iconType, color, size);
        cache[key] = icon;
        lruOrder.AddLast(key);
        return icon;
    }

    public int GetCacheSize()
    {
        return cache.Count;
    }
}

public class Program
{
    public static void Main()
    {
        IconCacheFactory cache = new IconCacheFactory(3);

        cache.GetIcon("favicon", "blue", 16).Display("google.com", 10, 10);
        cache.GetIcon("bookmark", "gold", 24).Display("github.com", 30, 10);
        cache.GetIcon("history", "gray", 16).Display("stackoverflow.com", 50, 10);
        cache.GetIcon("favicon", "blue", 16).Display("google.com", 70, 10);  // HIT
        cache.GetIcon("download", "green", 32).Display("example.com", 90, 10);  // evicts LRU

        Console.WriteLine("Cache size: " + cache.GetCacheSize());
    }
}
```

```typescript
interface PageIcon {
    display(url: string, x: number, y: number): void;
}

class ConcretePageIcon implements PageIcon {
    private iconType: string;
    private color: string;
    private size: number;

    constructor(iconType: string, color: string, size: number) {
        this.iconType = iconType;
        this.color = color;
        this.size = size;
    }

    display(url: string, x: number, y: number): void {
        console.log(`[${this.iconType}, ${this.color}, ${this.size}px] at ${url} (${x},${y})`);
    }
}

class IconCacheFactory {
    private cache: Map<string, PageIcon> = new Map();
    private maxCapacity: number;

    constructor(maxCapacity: number) {
        this.maxCapacity = maxCapacity;
    }

    getIcon(iconType: string, color: string, size: number): PageIcon {
        const key = `${iconType}_${color}_${size}`;
        if (this.cache.has(key)) {
            console.log(`Cache HIT: ${key}`);
            const icon = this.cache.get(key)!;
            this.cache.delete(key);
            this.cache.set(key, icon);
            return icon;
        }
        if (this.cache.size >= this.maxCapacity) {
            const lruKey = this.cache.keys().next().value!;
            this.cache.delete(lruKey);
            console.log(`Evicting icon: ${lruKey}`);
        }
        console.log(`Cache MISS: ${key}`);
        const icon = new ConcretePageIcon(iconType, color, size);
        this.cache.set(key, icon);
        return icon;
    }

    getCacheSize(): number {
        return this.cache.size;
    }
}

const cache = new IconCacheFactory(3);

cache.getIcon("favicon", "blue", 16).display("google.com", 10, 10);
cache.getIcon("bookmark", "gold", 24).display("github.com", 30, 10);
cache.getIcon("history", "gray", 16).display("stackoverflow.com", 50, 10);
cache.getIcon("favicon", "blue", 16).display("google.com", 70, 10);  // HIT
cache.getIcon("download", "green", 32).display("example.com", 90, 10);  // evicts LRU

console.log("Cache size:", cache.getCacheSize());
```

---

# Exercise 3: Particle System

**Problem:** Build a particle system for a game engine. Particles come in types (fire, smoke, spark, snow) with shared visual properties (color, sprite, blendMode). Each active particle has unique position (x, y), velocity (vx, vy), and remaining lifetime. The system should support creating and rendering many particles efficiently. This is one of the most common real-world applications of the Flyweight pattern, where thousands of particles share a handful of type definitions.

**Requirements:**

- Flyweight interface: `ParticleType` with `render(double x, double y, double lifetime)`
- Concrete flyweight: `ConcreteParticleType` storing `name`, `color`, `sprite`, `blendMode`
- Factory: `ParticleTypeFactory` with `getType(name, color, sprite, blendMode)`
- `Particle` class storing: `ParticleType` reference, `x`, `y`, `vx`, `vy`, `lifetime`
- `ParticleSystem` class with `emit(name, color, sprite, blendMode, x, y, vx, vy, lifetime)` and `renderAll()`
- Demo: emit 8 particles of various types and render them

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

interface ParticleType {
    void render(double x, double y, double lifetime);
}

class ConcreteParticleType implements ParticleType {
    // TODO: Add fields (name, color, sprite, blendMode)

    public ConcreteParticleType(String name, String color, String sprite, String blendMode) {
        // TODO: Store name, color, sprite, blendMode
    }

    @Override
    public void render(double x, double y, double lifetime) {
        // TODO: Print "[name] (color, sprite, blendMode) at (x,y) life=lifetime"
        // Example: "[fire] (orange, fire.png, additive) at (100.0,200.0) life=1.0"
    }
}

class ParticleTypeFactory {
    // TODO: Add a Map<String, ParticleType> cache field

    public ParticleType getType(String name, String color, String sprite, String blendMode) {
        // TODO: Build key from name + color + sprite + blendMode
        // TODO: If key exists in cache, return cached instance
        // TODO: Otherwise create new ConcreteParticleType, store in cache, return it
        return null;
    }

    public int getTypeCount() {
        // TODO: Return the number of cached particle types
        return 0;
    }
}

class Particle {
    // TODO: Add fields (type, x, y, vx, vy, lifetime)

    public Particle(ParticleType type, double x, double y, double vx, double vy, double lifetime) {
        // TODO: Store type, x, y, vx, vy, lifetime
    }

    public void draw() {
        // TODO: Delegate to type.render(x, y, lifetime)
    }
}

class ParticleSystem {
    // TODO: Add fields (particles list, factory)

    public ParticleSystem() {
        // TODO: Initialize particles list and factory
    }

    public void emit(String name, String color, String sprite, String blendMode,
                     double x, double y, double vx, double vy, double lifetime) {
        // TODO: Get or create ParticleType from factory
        // TODO: Create new Particle and add to particles list
    }

    public void renderAll() {
        // TODO: Draw all particles, then print total count and unique type count
        // Example: "Total particles: 8"
        //          "Unique particle types: 4"
    }
}

public class Main {
    public static void main(String[] args) {
        // ParticleSystem system = new ParticleSystem();
        // system.emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0);
        // system.emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8);
        // system.emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0);
        // system.emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3);
        // system.emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2);
        // system.emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5);
        // system.emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0);
        // system.emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5);
        // system.renderAll();
    }
}
```

```python
from abc import ABC, abstractmethod

class ParticleType(ABC):
    @abstractmethod
    def render(self, x: float, y: float, lifetime: float):
        pass

class ConcreteParticleType(ParticleType):
    def __init__(self, name: str, color: str, sprite: str, blend_mode: str):
        # TODO: Store name, color, sprite, blend_mode
        pass

    def render(self, x: float, y: float, lifetime: float):
        # TODO: Print "[name] (color, sprite, blendMode) at (x,y) life=lifetime"
        # Example: "[fire] (orange, fire.png, additive) at (100.0,200.0) life=1.0"
        pass

class ParticleTypeFactory:
    def __init__(self):
        # TODO: Initialize an empty dict for the cache
        pass

    def get_type(self, name: str, color: str, sprite: str, blend_mode: str):
        # TODO: Build key from name + color + sprite + blend_mode
        # TODO: If key exists in cache, return cached instance
        # TODO: Otherwise create new ConcreteParticleType, store in cache, return it
        pass

    def get_type_count(self) -> int:
        # TODO: Return the number of cached particle types
        return 0

class Particle:
    def __init__(self, particle_type: ParticleType, x: float, y: float,
                 vx: float, vy: float, lifetime: float):
        # TODO: Store particle_type, x, y, vx, vy, lifetime
        pass

    def draw(self):
        # TODO: Delegate to particle_type.render(x, y, lifetime)
        pass

class ParticleSystem:
    def __init__(self):
        # TODO: Initialize particles list and factory
        pass

    def emit(self, name: str, color: str, sprite: str, blend_mode: str,
             x: float, y: float, vx: float, vy: float, lifetime: float):
        # TODO: Get or create ParticleType from factory
        # TODO: Create new Particle and add to particles list
        pass

    def render_all(self):
        # TODO: Draw all particles, then print total count and unique type count
        # Example: "Total particles: 8"
        #          "Unique particle types: 4"
        pass

if __name__ == "__main__":
    pass
    # system = ParticleSystem()
    # system.emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0)
    # system.emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8)
    # system.emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0)
    # system.emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3)
    # system.emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2)
    # system.emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5)
    # system.emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0)
    # system.emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5)
    # system.render_all()
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <cstdio>
using namespace std;

class ParticleType {
public:
    virtual ~ParticleType() {}
    virtual void render(double x, double y, double lifetime) = 0;
};

class ConcreteParticleType : public ParticleType {
    // TODO: Add fields (name, color, sprite, blendMode)

public:
    ConcreteParticleType(const string& name, const string& color,
                         const string& sprite, const string& blendMode) {
        // TODO: Store name, color, sprite, blendMode
    }

    void render(double x, double y, double lifetime) override {
        // TODO: Print "[name] (color, sprite, blendMode) at (x,y) life=lifetime"
        // Example: "[fire] (orange, fire.png, additive) at (100.0,200.0) life=1.0"
    }
};

class ParticleTypeFactory {
    // TODO: Add a map<string, ParticleType*> cache field

public:
    ParticleType* getType(const string& name, const string& color,
                          const string& sprite, const string& blendMode) {
        // TODO: Build key from name + color + sprite + blendMode
        // TODO: If key exists in cache, return cached instance
        // TODO: Otherwise create new ConcreteParticleType, store in cache, return it
        return nullptr;
    }

    int getTypeCount() {
        // TODO: Return the number of cached particle types
        return 0;
    }
};

class Particle {
    // TODO: Add fields (type, x, y, vx, vy, lifetime)

public:
    Particle(ParticleType* type, double x, double y, double vx, double vy, double lifetime) {
        // TODO: Store type, x, y, vx, vy, lifetime
    }

    void draw() {
        // TODO: Delegate to type->render(x, y, lifetime)
    }
};

class ParticleSystem {
    // TODO: Add fields (particles vector, factory)

public:
    ParticleSystem() {
        // TODO: Initialize factory (particles vector is default-initialized)
    }

    void emit(const string& name, const string& color, const string& sprite,
              const string& blendMode, double x, double y, double vx, double vy, double lifetime) {
        // TODO: Get or create ParticleType from factory
        // TODO: Create new Particle and add to particles vector
    }

    void renderAll() {
        // TODO: Draw all particles, then print total count and unique type count
        // Example: "Total particles: 8"
        //          "Unique particle types: 4"
    }
};

int main() {
    // ParticleSystem system;
    // system.emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0);
    // system.emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8);
    // system.emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0);
    // system.emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3);
    // system.emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2);
    // system.emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5);
    // system.emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0);
    // system.emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5);
    // system.renderAll();
    return 0;
}
```

```go
package main

import "fmt"

type ParticleType interface {
	render(x float64, y float64, lifetime float64)
}

type ConcreteParticleType struct {
	// TODO: Add fields (name, color, sprite, blendMode)
}

func NewConcreteParticleType(name string, color string, sprite string, blendMode string) *ConcreteParticleType {
	// TODO: Store name, color, sprite, blendMode
	return &ConcreteParticleType{}
}

func (c *ConcreteParticleType) render(x float64, y float64, lifetime float64) {
	// TODO: Print "[name] (color, sprite, blendMode) at (x,y) life=lifetime"
	// Example: "[fire] (orange, fire.png, additive) at (100.0,200.0) life=1.0"
	_ = fmt.Sprintf("%v %v %v %v %v %v", x, y, lifetime, x, y, lifetime)
}

type ParticleTypeFactory struct {
	// TODO: Add a map[string]ParticleType cache field
}

func NewParticleTypeFactory() *ParticleTypeFactory {
	// TODO: Initialize an empty map for the cache
	return &ParticleTypeFactory{}
}

func (p *ParticleTypeFactory) getType(name string, color string, sprite string, blendMode string) ParticleType {
	// TODO: Build key from name + color + sprite + blendMode
	// TODO: If key exists in cache, return cached instance
	// TODO: Otherwise create new ConcreteParticleType, store in cache, return it
	return nil
}

func (p *ParticleTypeFactory) getTypeCount() int {
	// TODO: Return the number of cached particle types
	return 0
}

type Particle struct {
	// TODO: Add fields (type, x, y, vx, vy, lifetime)
}

func NewParticle(particleType ParticleType, x float64, y float64, vx float64, vy float64, lifetime float64) *Particle {
	// TODO: Store type, x, y, vx, vy, lifetime
	return &Particle{}
}

func (p *Particle) draw() {
	// TODO: Delegate to type.render(x, y, lifetime)
}

type ParticleSystem struct {
	// TODO: Add fields (particles list, factory)
}

func NewParticleSystem() *ParticleSystem {
	// TODO: Initialize particles list and factory
	return &ParticleSystem{}
}

func (p *ParticleSystem) emit(name string, color string, sprite string, blendMode string,
	x float64, y float64, vx float64, vy float64, lifetime float64) {
	// TODO: Get or create ParticleType from factory
	// TODO: Create new Particle and add to particles list
}

func (p *ParticleSystem) renderAll() {
	// TODO: Draw all particles, then print total count and unique type count
	// Example: "Total particles: 8"
	//          "Unique particle types: 4"
}

func main() {
	// system := NewParticleSystem()
	// system.emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0)
	// system.emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8)
	// system.emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0)
	// system.emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3)
	// system.emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2)
	// system.emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5)
	// system.emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0)
	// system.emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5)
	// system.renderAll()
}
```

```csharp
using System;
using System.Collections.Generic;

interface IParticleType
{
    void Render(double x, double y, double lifetime);
}

class ConcreteParticleType : IParticleType
{
    // TODO: Add fields (name, color, sprite, blendMode)

    public ConcreteParticleType(string name, string color, string sprite, string blendMode)
    {
        // TODO: Store name, color, sprite, blendMode
    }

    public void Render(double x, double y, double lifetime)
    {
        // TODO: Print "[name] (color, sprite, blendMode) at (x,y) life=lifetime"
        // Example: "[fire] (orange, fire.png, additive) at (100.0,200.0) life=1.0"
    }
}

class ParticleTypeFactory
{
    // TODO: Add a Dictionary<string, IParticleType> cache field

    public IParticleType GetType(string name, string color, string sprite, string blendMode)
    {
        // TODO: Build key from name + color + sprite + blendMode
        // TODO: If key exists in cache, return cached instance
        // TODO: Otherwise create new ConcreteParticleType, store in cache, return it
        return null;
    }

    public int GetTypeCount()
    {
        // TODO: Return the number of cached particle types
        return 0;
    }
}

class Particle
{
    // TODO: Add fields (type, x, y, vx, vy, lifetime)

    public Particle(IParticleType type, double x, double y, double vx, double vy, double lifetime)
    {
        // TODO: Store type, x, y, vx, vy, lifetime
    }

    public void Draw()
    {
        // TODO: Delegate to type.Render(x, y, lifetime)
    }
}

class ParticleSystem
{
    // TODO: Add fields (particles list, factory)

    public ParticleSystem()
    {
        // TODO: Initialize particles list and factory
    }

    public void Emit(string name, string color, string sprite, string blendMode,
                     double x, double y, double vx, double vy, double lifetime)
    {
        // TODO: Get or create ParticleType from factory
        // TODO: Create new Particle and add to particles list
    }

    public void RenderAll()
    {
        // TODO: Draw all particles, then print total count and unique type count
        // Example: "Total particles: 8"
        //          "Unique particle types: 4"
    }
}

public class Program
{
    public static void Main()
    {
        // ParticleSystem system = new ParticleSystem();
        // system.Emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0);
        // system.Emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8);
        // system.Emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0);
        // system.Emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3);
        // system.Emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2);
        // system.Emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5);
        // system.Emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0);
        // system.Emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5);
        // system.RenderAll();
    }
}
```

```typescript
interface ParticleType {
    render(x: number, y: number, lifetime: number): void;
}

class ConcreteParticleType implements ParticleType {
    // TODO: Add fields (name, color, sprite, blendMode)

    constructor(name: string, color: string, sprite: string, blendMode: string) {
        // TODO: Store name, color, sprite, blendMode
    }

    render(x: number, y: number, lifetime: number): void {
        // TODO: Print "[name] (color, sprite, blendMode) at (x,y) life=lifetime"
        // Example: "[fire] (orange, fire.png, additive) at (100.0,200.0) life=1.0"
    }
}

class ParticleTypeFactory {
    // TODO: Add a Map<string, ParticleType> cache field

    getType(name: string, color: string, sprite: string, blendMode: string): ParticleType {
        // TODO: Build key from name + color + sprite + blendMode
        // TODO: If key exists in cache, return cached instance
        // TODO: Otherwise create new ConcreteParticleType, store in cache, return it
        return null as any;
    }

    getTypeCount(): number {
        // TODO: Return the number of cached particle types
        return 0;
    }
}

class Particle {
    // TODO: Add fields (type, x, y, vx, vy, lifetime)

    constructor(type: ParticleType, x: number, y: number, vx: number, vy: number, lifetime: number) {
        // TODO: Store type, x, y, vx, vy, lifetime
    }

    draw(): void {
        // TODO: Delegate to type.render(x, y, lifetime)
    }
}

class ParticleSystem {
    // TODO: Add fields (particles array, factory)

    constructor() {
        // TODO: Initialize particles array and factory
    }

    emit(name: string, color: string, sprite: string, blendMode: string,
         x: number, y: number, vx: number, vy: number, lifetime: number): void {
        // TODO: Get or create ParticleType from factory
        // TODO: Create new Particle and add to particles array
    }

    renderAll(): void {
        // TODO: Draw all particles, then print total count and unique type count
        // Example: "Total particles: 8"
        //          "Unique particle types: 4"
    }
}

// const system = new ParticleSystem();
// system.emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0);
// system.emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8);
// system.emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0);
// system.emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3);
// system.emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2);
// system.emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5);
// system.emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0);
// system.emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5);
// system.renderAll();
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

interface ParticleType {
    void render(double x, double y, double lifetime);
}

class ConcreteParticleType implements ParticleType {
    private String name;
    private String color;
    private String sprite;
    private String blendMode;

    public ConcreteParticleType(String name, String color, String sprite, String blendMode) {
        this.name = name;
        this.color = color;
        this.sprite = sprite;
        this.blendMode = blendMode;
    }

    @Override
    public void render(double x, double y, double lifetime) {
        System.out.printf("[%s] (%s, %s, %s) at (%.1f,%.1f) life=%.1f%n", name, color, sprite, blendMode, x, y, lifetime);
    }
}

class ParticleTypeFactory {
    private Map<String, ParticleType> cache = new HashMap<>();

    public ParticleType getType(String name, String color, String sprite, String blendMode) {
        String key = name + color + sprite + blendMode;
        if (cache.containsKey(key)) {
            return cache.get(key);
        }
        ParticleType type = new ConcreteParticleType(name, color, sprite, blendMode);
        cache.put(key, type);
        return type;
    }

    public int getTypeCount() {
        return cache.size();
    }
}

class Particle {
    private ParticleType type;
    private double x, y, vx, vy, lifetime;

    public Particle(ParticleType type, double x, double y, double vx, double vy, double lifetime) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.lifetime = lifetime;
    }

    public void draw() {
        type.render(x, y, lifetime);
    }
}

class ParticleSystem {
    private List<Particle> particles = new ArrayList<>();
    private ParticleTypeFactory factory = new ParticleTypeFactory();

    public ParticleSystem() {}

    public void emit(String name, String color, String sprite, String blendMode, double x, double y, double vx, double vy, double lifetime) {
        ParticleType type = factory.getType(name, color, sprite, blendMode);
        Particle particle = new Particle(type, x, y, vx, vy, lifetime);
        particles.add(particle);
    }

    public void renderAll() {
        for (Particle p : particles) {
            p.draw();
        }
        System.out.println("\nTotal particles: " + particles.size());
        System.out.println("Unique particle types: " + factory.getTypeCount());
    }
}

public class Main {
    public static void main(String[] args) {
        ParticleSystem system = new ParticleSystem();
        system.emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0);
        system.emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8);
        system.emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0);
        system.emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3);
        system.emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2);
        system.emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5);
        system.emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0);
        system.emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5);
        system.renderAll();
    }
}
```

```python
from abc import ABC, abstractmethod

class ParticleType(ABC):
    @abstractmethod
    def render(self, x: float, y: float, lifetime: float):
        pass

class ConcreteParticleType(ParticleType):
    def __init__(self, name: str, color: str, sprite: str, blend_mode: str):
        self.name = name
        self.color = color
        self.sprite = sprite
        self.blend_mode = blend_mode

    def render(self, x: float, y: float, lifetime: float):
        print(f"[{self.name}] ({self.color}, {self.sprite}, {self.blend_mode}) at ({x:.1f},{y:.1f}) life={lifetime:.1f}")

class ParticleTypeFactory:
    def __init__(self):
        self._cache = {}

    def get_type(self, name: str, color: str, sprite: str, blend_mode: str):
        key = name + color + sprite + blend_mode
        if key in self._cache:
            return self._cache[key]
        ptype = ConcreteParticleType(name, color, sprite, blend_mode)
        self._cache[key] = ptype
        return ptype

    def get_type_count(self) -> int:
        return len(self._cache)

class Particle:
    def __init__(self, particle_type, x: float, y: float, vx: float, vy: float, lifetime: float):
        self.particle_type = particle_type
        self.x = x
        self.y = y
        self.vx = vx
        self.vy = vy
        self.lifetime = lifetime

    def draw(self):
        self.particle_type.render(self.x, self.y, self.lifetime)

class ParticleSystem:
    def __init__(self):
        self._particles = []
        self._factory = ParticleTypeFactory()

    def emit(self, name: str, color: str, sprite: str, blend_mode: str, x: float, y: float, vx: float, vy: float, lifetime: float):
        ptype = self._factory.get_type(name, color, sprite, blend_mode)
        particle = Particle(ptype, x, y, vx, vy, lifetime)
        self._particles.append(particle)

    def render_all(self):
        for p in self._particles:
            p.draw()
        print(f"\nTotal particles: {len(self._particles)}")
        print(f"Unique particle types: {self._factory.get_type_count()}")

if __name__ == "__main__":
    system = ParticleSystem()
    system.emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0)
    system.emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8)
    system.emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0)
    system.emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3)
    system.emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2)
    system.emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5)
    system.emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0)
    system.emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5)
    system.render_all()
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>

using namespace std;

class ParticleType {
public:
    virtual ~ParticleType() {}
    virtual void render(double x, double y, double lifetime) = 0;
};

class ConcreteParticleType : public ParticleType {
    string name;
    string color;
    string sprite;
    string blendMode;
public:
    ConcreteParticleType(const string& name, const string& color, const string& sprite, const string& blendMode)
        : name(name), color(color), sprite(sprite), blendMode(blendMode) {}

    void render(double x, double y, double lifetime) override {
        printf("[%s] (%s, %s, %s) at (%.1f,%.1f) life=%.1f\n", name.c_str(), color.c_str(), sprite.c_str(), blendMode.c_str(), x, y, lifetime);
    }
};

class ParticleTypeFactory {
    map<string, ParticleType*> cache;
public:
    ParticleType* getType(const string& name, const string& color, const string& sprite, const string& blendMode) {
        string key = name + color + sprite + blendMode;
        if (cache.find(key) != cache.end()) {
            return cache[key];
        }
        ParticleType* type = new ConcreteParticleType(name, color, sprite, blendMode);
        cache[key] = type;
        return type;
    }

    int getTypeCount() {
        return cache.size();
    }
};

class Particle {
    ParticleType* type;
    double x, y, vx, vy, lifetime;
public:
    Particle(ParticleType* type, double x, double y, double vx, double vy, double lifetime)
        : type(type), x(x), y(y), vx(vx), vy(vy), lifetime(lifetime) {}

    void draw() {
        type->render(x, y, lifetime);
    }
};

class ParticleSystem {
    vector<Particle> particles;
    ParticleTypeFactory factory;
public:
    void emit(const string& name, const string& color, const string& sprite, const string& blendMode, double x, double y, double vx, double vy, double lifetime) {
        ParticleType* type = factory.getType(name, color, sprite, blendMode);
        particles.emplace_back(type, x, y, vx, vy, lifetime);
    }

    void renderAll() {
        for (auto& p : particles) {
            p.draw();
        }
        cout << "\nTotal particles: " << particles.size() << endl;
        cout << "Unique particle types: " << factory.getTypeCount() << endl;
    }
};

int main() {
    ParticleSystem system;
    system.emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0);
    system.emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8);
    system.emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0);
    system.emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3);
    system.emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2);
    system.emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5);
    system.emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0);
    system.emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5);
    system.renderAll();
    return 0;
}
```

```go
package main

import "fmt"

type ParticleType interface {
	Render(x, y, lifetime float64)
}

type ConcreteParticleType struct {
	name      string
	color     string
	sprite    string
	blendMode string
}

func NewConcreteParticleType(name, color, sprite, blendMode string) *ConcreteParticleType {
	return &ConcreteParticleType{
		name:      name,
		color:     color,
		sprite:    sprite,
		blendMode: blendMode,
	}
}

func (c *ConcreteParticleType) Render(x, y, lifetime float64) {
	fmt.Printf("[%s] (%s, %s, %s) at (%.1f,%.1f) life=%.1f\n", c.name, c.color, c.sprite, c.blendMode, x, y, lifetime)
}

type ParticleTypeFactory struct {
	cache map[string]ParticleType
}

func NewParticleTypeFactory() *ParticleTypeFactory {
	return &ParticleTypeFactory{
		cache: make(map[string]ParticleType),
	}
}

func (f *ParticleTypeFactory) GetType(name, color, sprite, blendMode string) ParticleType {
	key := name + color + sprite + blendMode
	if t, ok := f.cache[key]; ok {
		return t
	}
	typeObj := NewConcreteParticleType(name, color, sprite, blendMode)
	f.cache[key] = typeObj
	return typeObj
}

func (f *ParticleTypeFactory) GetTypeCount() int {
	return len(f.cache)
}

type Particle struct {
	particleType ParticleType
	x            float64
	y            float64
	vx           float64
	vy           float64
	lifetime     float64
}

func NewParticle(particleType ParticleType, x, y, vx, vy, lifetime float64) *Particle {
	return &Particle{
		particleType: particleType,
		x:            x,
		y:            y,
		vx:           vx,
		vy:           vy,
		lifetime:     lifetime,
	}
}

func (p *Particle) Draw() {
	p.particleType.Render(p.x, p.y, p.lifetime)
}

type ParticleSystem struct {
	particles []*Particle
	factory   *ParticleTypeFactory
}

func NewParticleSystem() *ParticleSystem {
	return &ParticleSystem{
		particles: make([]*Particle, 0),
		factory:   NewParticleTypeFactory(),
	}
}

func (ps *ParticleSystem) Emit(name, color, sprite, blendMode string, x, y, vx, vy, lifetime float64) {
	ptype := ps.factory.GetType(name, color, sprite, blendMode)
	particle := NewParticle(ptype, x, y, vx, vy, lifetime)
	ps.particles = append(ps.particles, particle)
}

func (ps *ParticleSystem) RenderAll() {
	for _, p := range ps.particles {
		p.Draw()
	}
	fmt.Printf("\nTotal particles: %d\n", len(ps.particles))
	fmt.Printf("Unique particle types: %d\n", ps.factory.GetTypeCount())
}

func main() {
	system := NewParticleSystem()
	system.Emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0)
	system.Emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8)
	system.Emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0)
	system.Emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3)
	system.Emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2)
	system.Emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5)
	system.Emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0)
	system.Emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5)
	system.RenderAll()
}
```

```csharp
using System;
using System.Collections.Generic;

interface IParticleType
{
    void Render(double x, double y, double lifetime);
}

class ConcreteParticleType : IParticleType
{
    private string name;
    private string color;
    private string sprite;
    private string blendMode;

    public ConcreteParticleType(string name, string color, string sprite, string blendMode)
    {
        this.name = name;
        this.color = color;
        this.sprite = sprite;
        this.blendMode = blendMode;
    }

    public void Render(double x, double y, double lifetime)
    {
        Console.WriteLine($"[{name}] ({color}, {sprite}, {blendMode}) at ({x:F1},{y:F1}) life={lifetime:F1}");
    }
}

class ParticleTypeFactory
{
    private Dictionary<string, IParticleType> cache = new Dictionary<string, IParticleType>();

    public IParticleType GetType(string name, string color, string sprite, string blendMode)
    {
        string key = name + color + sprite + blendMode;
        if (cache.ContainsKey(key))
            return cache[key];
        IParticleType type = new ConcreteParticleType(name, color, sprite, blendMode);
        cache[key] = type;
        return type;
    }

    public int GetTypeCount()
    {
        return cache.Count;
    }
}

class Particle
{
    private IParticleType type;
    private double x, y, vx, vy, lifetime;

    public Particle(IParticleType type, double x, double y, double vx, double vy, double lifetime)
    {
        this.type = type;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.lifetime = lifetime;
    }

    public void Draw()
    {
        type.Render(x, y, lifetime);
    }
}

class ParticleSystem
{
    private List<Particle> particles = new List<Particle>();
    private ParticleTypeFactory factory = new ParticleTypeFactory();

    public ParticleSystem() {}

    public void Emit(string name, string color, string sprite, string blendMode, double x, double y, double vx, double vy, double lifetime)
    {
        IParticleType type = factory.GetType(name, color, sprite, blendMode);
        Particle particle = new Particle(type, x, y, vx, vy, lifetime);
        particles.Add(particle);
    }

    public void RenderAll()
    {
        foreach (Particle p in particles)
            p.Draw();
        Console.WriteLine($"\nTotal particles: {particles.Count}");
        Console.WriteLine($"Unique particle types: {factory.GetTypeCount()}");
    }
}

public class Program
{
    public static void Main()
    {
        ParticleSystem system = new ParticleSystem();
        system.Emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0);
        system.Emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8);
        system.Emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0);
        system.Emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3);
        system.Emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2);
        system.Emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5);
        system.Emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0);
        system.Emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5);
        system.RenderAll();
    }
}
```

```typescript
interface ParticleType {
    render(x: number, y: number, lifetime: number): void;
}

class ConcreteParticleType implements ParticleType {
    private name: string;
    private color: string;
    private sprite: string;
    private blendMode: string;

    constructor(name: string, color: string, sprite: string, blendMode: string) {
        this.name = name;
        this.color = color;
        this.sprite = sprite;
        this.blendMode = blendMode;
    }

    render(x: number, y: number, lifetime: number): void {
        console.log(`[${this.name}] (${this.color}, ${this.sprite}, ${this.blendMode}) at (${x.toFixed(1)},${y.toFixed(1)}) life=${lifetime.toFixed(1)}`);
    }
}

class ParticleTypeFactory {
    private cache: Map<string, ParticleType> = new Map();

    constructor() {}

    getType(name: string, color: string, sprite: string, blendMode: string): ParticleType {
        const key = name + color + sprite + blendMode;
        if (this.cache.has(key)) {
            return this.cache.get(key)!;
        }
        const type = new ConcreteParticleType(name, color, sprite, blendMode);
        this.cache.set(key, type);
        return type;
    }

    getTypeCount(): number {
        return this.cache.size;
    }
}

class Particle {
    private type: ParticleType;
    private x: number;
    private y: number;
    private vx: number;
    private vy: number;
    private lifetime: number;

    constructor(type: ParticleType, x: number, y: number, vx: number, vy: number, lifetime: number) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.lifetime = lifetime;
    }

    draw(): void {
        this.type.render(this.x, this.y, this.lifetime);
    }
}

class ParticleSystem {
    private particles: Particle[] = [];
    private factory: ParticleTypeFactory = new ParticleTypeFactory();

    constructor() {}

    emit(name: string, color: string, sprite: string, blendMode: string, x: number, y: number, vx: number, vy: number, lifetime: number): void {
        const type = this.factory.getType(name, color, sprite, blendMode);
        const particle = new Particle(type, x, y, vx, vy, lifetime);
        this.particles.push(particle);
    }

    renderAll(): void {
        for (const p of this.particles) {
            p.draw();
        }
        console.log(`\nTotal particles: ${this.particles.length}`);
        console.log(`Unique particle types: ${this.factory.getTypeCount()}`);
    }
}

const system = new ParticleSystem();
system.emit("fire", "orange", "fire.png", "additive", 100, 200, 0, -2, 1.0);
system.emit("fire", "orange", "fire.png", "additive", 105, 205, 0.5, -1.8, 0.8);
system.emit("smoke", "gray", "smoke.png", "alpha", 100, 180, 0.2, -1, 2.0);
system.emit("spark", "yellow", "spark.png", "additive", 110, 210, 1, -3, 0.3);
system.emit("fire", "orange", "fire.png", "additive", 95, 195, -0.3, -2.2, 1.2);
system.emit("smoke", "gray", "smoke.png", "alpha", 98, 185, -0.1, -0.8, 2.5);
system.emit("snow", "white", "snow.png", "alpha", 200, 0, 0.1, 1, 5.0);
system.emit("snow", "white", "snow.png", "alpha", 250, 10, -0.2, 0.8, 4.5);
system.renderAll();
```


