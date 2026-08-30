---
id: "java-terminologies-literals"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Programming Language Terminologies"
title: "Literals"
slug: "java-terminologies-literals"
summary: "Comprehensive guide to Java Literals: Integer (Decimal, Binary 0b, Octal 0, Hex 0x), Floating-Point (Float f, Double, Scientific Notation e), Character & Escape Sequences, String, Boolean, Null, and Java 7 Underscores in numbers."
eli10: "A literal is raw data written directly into your code! 101, 3.14f, 'A', 'Hello', true, and null are all literals that give variables their starting values."
mentalModel: "Literals are the constant source values that feed variable memory containers."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["Literals", "Integer Literals", "Floating-Point Literals", "Character Literals", "String Literals", "Boolean Literals", "Null Literal", "Number Systems"]
animationType: "literals"
codeSnippet:
  language: "java"
  explanation: "Demonstration of Integer, Floating-Point, Character, String, Boolean, and Null literals in Java."
  code: |
    public class LiteralsDemo {
        public static void main(String[] args) {
            // 1. Integer Literals in different number systems
            int decimal = 42;
            int binary = 0b1010;        // 10 in decimal
            int octal = 010;            // 8 in decimal
            int hex = 0x1F;             // 31 in decimal
            long bigNum = 123456789L;
            int million = 1_000_000;    // Java 7+ Underscores

            // 2. Floating-Point Literals
            float pi = 3.14F;
            double e = 2.718;
            double sci = 1.23e4;        // 12300.0

            // 3. Character & Escape Sequences
            char grade = 'A';
            char tab = '\t';

            // 4. String & Boolean & Null Literals
            String greeting = "Hello, World!";
            boolean isJavaFun = true;
            String emptyRef = null;

            System.out.println("Decimal: " + decimal + " | Binary: " + binary + " | Hex: " + hex);
            System.out.println("Sum of all integer bases: " + (decimal + binary + octal + hex)); // 91
            System.out.println("Float: " + pi + " | Scientific: " + sci);
            System.out.println("String: " + greeting + " | Boolean: " + isJavaFun);
        }
    }
---

# 💎 Literals in Java

## 📖 Introduction

**Literals are constants used in Java programs to represent fixed values.**  
They represent fixed values such as numeric values, characters, strings, and booleans that are directly assigned to variables in source code.

```java
int rollno = 101;
```

```text
┌─────────────────┬──────────────────┬─────────────────┐
│       int       │      rollno      │       101       │
├─────────────────┼──────────────────┼─────────────────┤
│    Data Type    │  Variable Name   │ Literal / Data  │
│ (Memory: 4B)    │   (Identifier)   │ (Assigned Value)│
└─────────────────┴──────────────────┴─────────────────┘
```

- **`int`** ➔ Data Type
- **`rollno`** ➔ Variable Identifier
- **`101`** ➔ **Literal (Constant Value)**

---

## 🗺️ Types of Literals in Java

Java provides **6 primary categories of literals**:

```text
                              Java Literals
                                    │
    ┌──────────┬──────────┬─────────┴────────┬──────────┬──────────┐
    ▼          ▼          ▼                  ▼          ▼          ▼
 1. Integer 2. Float  3. Character       4. String  5. Boolean 6. Null
 (Dec/Bin/  (f / d /  ('A', '\n', '\t')  ("Hello")  (true/     (null)
  Oct/Hex)   Sci-e)                                  false)
```

---

## 🔹 1. Integer Literals

Integer literals represent **whole numbers** and can be written in **4 different number systems**:

| Number System | Base | Prefix | Example | Decimal Value |
|:---|:---:|:---:|:---|:---:|
| **Decimal** | Base 10 | *None* | `int decimal = 42;` | `42` |
| **Binary** | Base 2 | `0b` or `0B` | `int binary = 0b1010;` | `10` |
| **Octal** | Base 8 | `0` (Leading zero) | `int octal = 010;` | `8` |
| **Hexadecimal** | Base 16 | `0x` or `0X` | `int hex = 0x1F;` | `31` |

### Rules for Integer Literals:
1. By default, all integer literals are of type **`int`** (4 bytes).
2. Use **`L`** or **`l`** suffix to specify a **`long`** literal (8 bytes):  
   `long bigNum = 123456789L;`

### 💻 Program for Integer Literals:

```java
public class IntegerLiteralsExample {
    public static void main(String[] args) {
        // Decimal Literal (Base 10): Regular whole numbers
        int decimal = 42;
        System.out.println("Decimal Literal: " + decimal); // Output: 42

        // Binary Literal (Base 2): Starts with 0b or 0B
        int binary = 0b1010; // Binary for decimal 10
        System.out.println("Binary Literal: " + binary); // Output: 10

        // Octal Literal (Base 8): Starts with 0
        int octal = 010; // Octal for decimal 8
        System.out.println("Octal Literal: " + octal); // Output: 8

        // Hexadecimal Literal (Base 16): Starts with 0x or 0X
        int hexadecimal = 0x1F; // Hexadecimal for decimal 31
        System.out.println("Hexadecimal Literal: " + hexadecimal); // Output: 31

        // Long Literal: Specified with L or l at the end
        long bigNum = 123456789L;
        System.out.println("Long Literal: " + bigNum); // Output: 123456789

        // Example of usage of all types together in calculations
        int sum = decimal + binary + octal + hexadecimal;
        System.out.println("Sum of all literals: " + sum); // Output: 91
    }
}
```

#### 🖥️ Output:
```text
Decimal Literal: 42
Binary Literal: 10
Octal Literal: 8
Hexadecimal Literal: 31
Long Literal: 123456789
Sum of all literals: 91
```

---

## 🔹 2. Floating-Point Literals

Floating-point literals represent numbers containing **fractional parts (decimal points)**.

| Type | Suffix Requirement | Example | Description |
|:---|:---:|:---|:---|
| **`float`** | **`F`** or **`f`** (Mandatory) | `float pi = 3.14F;` | 32-bit single precision |
| **`double`** | *Optional* `D` or `d` | `double e = 2.718;` | 64-bit double precision (Default) |
| **Scientific** | `e` or `E` (Exponent: $10^x$) | `double sci = 1.23e4;` | $1.23 \times 10^4 = 12300.0$ |

### 💻 Program for Floating-Point Literals:

```java
public class FloatingPointLiteralsExample {
    public static void main(String[] args) {
        // Float Literal: Ends with F or f
        float pi = 3.14F; // The 'F' indicates it's a float literal
        System.out.println("Float Literal (pi): " + pi); // Output: 3.14

        // Double Literal: Default type for decimal numbers
        double e = 2.718; // By default, this is considered a double
        System.out.println("Double Literal (e): " + e); // Output: 2.718

        // Scientific Notation: Large number in scientific format
        double largeNum = 1.23e4; // Equivalent to 1.23 * 10^4 = 12300.0
        System.out.println("Scientific Notation (largeNum): " + largeNum); // Output: 12300.0

        // Scientific Notation: Very small number
        double smallNum = 4.56e-3; // Equivalent to 4.56 * 10^-3 = 0.00456
        System.out.println("Scientific Notation (smallNum): " + smallNum); // Output: 0.00456

        // Demonstrating precision with double
        double preciseNum = 3.14159265359; // Double can hold up to 15-16 decimal digits
        System.out.println("Double with precision (preciseNum): " + preciseNum);
    }
}
```

#### 🖥️ Output:
```text
Float Literal (pi): 3.14
Double Literal (e): 2.718
Scientific Notation (largeNum): 12300.0
Scientific Notation (smallNum): 0.00456
Double with precision (preciseNum): 3.14159265359
```

---

## 🔹 3. Character Literals & Escape Sequences

Character literals represent a single **16-bit Unicode character** enclosed in **single quotes (`' '`)**.

```java
char letter = 'A';
char digit = '7';
char specialChar = '@';
```

### Escape Sequences in Java:
Escape sequences allow representing non-printable or special characters:

| Escape Sequence | Description | Output Effect |
|:---:|:---|:---|
| **`\n`** | Newline | Moves cursor to next line |
| **`\t`** | Horizontal Tab | Inserts standard tab space |
| **`\'`** | Single Quote | Inserts single quote character |
| **`\"`** | Double Quote | Inserts double quote inside strings |
| **`\\`** | Backslash | Inserts backslash character |
| **`\r`** | Carriage Return | Resets cursor to beginning of line |
| **`\b`** | Backspace | Erases previous character |

### 💻 Program for Character Literals:

```java
public class CharacterLiteralsExample {
    public static void main(String[] args) {
        // Character Literal: A single character enclosed in single quotes
        char letter = 'A';
        System.out.println("Character Literal (letter): " + letter); // Output: A

        // Character Literal: A digit as a character
        char digit = '7';
        System.out.println("Character Literal (digit): " + digit); // Output: 7

        // Character Literal: A special character
        char specialChar = '@';
        System.out.println("Character Literal (specialChar): " + specialChar); // Output: @

        // Using Escape Sequences for special characters
        char newlineChar = '\n';
        char tabChar = '\t';
        char singleQuoteChar = '\'';
        char backslashChar = '\\';

        System.out.println("Escape Sequence (newline):" + newlineChar + "This is after newline.");
        System.out.println("Escape Sequence (tab):" + tabChar + "This is after tab.");
        System.out.println("Escape Sequence (single quote): " + singleQuoteChar + "This is single quote.");
        System.out.println("Escape Sequence (backslash): " + backslashChar + "This is backslash.");
    }
}
```

#### 🖥️ Output:
```text
Character Literal (letter): A
Character Literal (digit): 7
Character Literal (specialChar): @
Escape Sequence (newline):
This is after newline.
Escape Sequence (tab):	This is after tab.
Escape Sequence (single quote): 'This is single quote.
Escape Sequence (backslash): \This is backslash.
```

---

## 🔹 4. String Literals

String literals represent a **sequence of characters** enclosed in **double quotes (`" "`)**.

```java
String greeting = "Hello, World!";
String empty = ""; // An empty string
```

### Key Characteristics:
1. **Immutable**: Strings in Java cannot be modified in place once created.
2. **Escape Sequences**: Strings can embed escape sequences like `\n`, `\t`, and `\"`.

### 💻 Program for String Literals:

```java
public class StringLiteralsExample {
    public static void main(String[] args) {
        // String Literal: Simple sequence in double quotes
        String greeting = "Hello, World!";
        System.out.println("String Literal (greeting): " + greeting);

        // String Literal: An empty string
        String empty = "";
        System.out.println("String Literal (empty): '" + empty + "'");

        // String with Escape Sequences
        String multiLineString = "Line1\nLine2";
        System.out.println("String with Escape Sequences (multiLineString): \n" + multiLineString);

        String quotedString = "He said, \"Hello!\"";
        System.out.println("String with Escape Sequences (quotedString): " + quotedString);

        String tabbedString = "Item1\tItem2";
        System.out.println("String with Escape Sequences (tabbedString): " + tabbedString);
    }
}
```

#### 🖥️ Output:
```text
String Literal (greeting): Hello, World!
String Literal (empty): ''
String with Escape Sequences (multiLineString): 
Line1
Line2
String with Escape Sequences (quotedString): He said, "Hello!"
String with Escape Sequences (tabbedString): Item1	Item2
```

---

## 🔹 5. Boolean Literals

Boolean literals represent truth values and can only be **`true`** or **`false`**.

```java
boolean isJavaFun = true;
boolean isHot = false;
```

### 💻 Program for Boolean Literals:

```java
public class BooleanLiteralsExample {
    public static void main(String[] args) {
        boolean isJavaFun = true;
        boolean isHot = false;

        System.out.println("Is Java Fun? " + isJavaFun); // Output: true
        System.out.println("Is it Hot? " + isHot);       // Output: false

        // Conditional branching
        if (isJavaFun) {
            System.out.println("Java is fun!");
        } else {
            System.out.println("Java is not fun!");
        }

        if (!isHot) {
            System.out.println("It is not hot today!");
        } else {
            System.out.println("It is hot today!");
        }
    }
}
```

#### 🖥️ Output:
```text
Is Java Fun? true
Is it Hot? false
Java is fun!
It is not hot today!
```

---

## 🔹 6. Null Literal

The **`null`** literal represents the **absence of a value or object reference**.

```java
String str = null; // str points to no object in memory
```

> [!IMPORTANT]
> **Null Rule**: `null` can **only** be assigned to reference data types (`String`, `Arrays`, `Classes`, `Interfaces`). It **cannot** be assigned to primitive data types (e.g. `int x = null;` ❌ Compilation Error).

### 💻 Program for Null Literal:

```java
public class NullLiteralExample {
    public static void main(String[] args) {
        String str = null; // Null literal assigned to reference type

        if (str == null) {
            System.out.println("The string is null, no value assigned.");
        } else {
            System.out.println("The string has a value: " + str);
        }
    }
}
```

#### 🖥️ Output:
```text
The string is null, no value assigned.
```

---

## ⚡ Underscores in Numeric Literals (Java 7+)

From Java 7 onwards, you can place **underscores (`_`) inside numeric literals** to significantly improve code readability without altering the number's numeric value.

```java
int million = 1_000_000;          // Equivalent to 1000000
double pi = 3.141_592_653;        // Equivalent to 3.141592653
long creditCard = 1234_5678_9012L;
```

### 🚫 Rules for Using Underscores:
- ❌ **Cannot** be at the beginning or end of a number: `_100` ❌ or `100_` ❌
- ❌ **Cannot** be adjacent to a decimal point: `3._14` ❌ or `3_.14` ❌
- ❌ **Cannot** be before an `L` or `F` suffix: `100_L` ❌

### 💻 Program for Underscores in Numeric Literals:

```java
public class NumericLiteralsWithUnderscore {
    public static void main(String[] args) {
        int million = 1_000_000;    // Underscores separating thousands
        double pi = 3.141_592_653;  // Underscores in floating-point digits

        System.out.println("Million: " + million);  // Output: 1000000
        System.out.println("Pi value: " + pi);      // Output: 3.141592653
    }
}
```

#### 🖥️ Output:
```text
Million: 1000000
Pi value: 3.141592653
```

---

## 📊 Summary: Java Literals Quick Reference

| Literal Category | Examples | Default Type / Notes |
|:---|:---|:---|
| **Integer** | `42`, `0b1010` (Bin), `010` (Oct), `0x1F` (Hex), `100L` | `int` (Use `L` for `long`) |
| **Floating-Point** | `3.14F`, `2.718`, `1.23e4` | `double` (Use `F` for `float`) |
| **Character** | `'A'`, `'7'`, `'@'`, `'\n'`, `'\t'`, `'\\'` | `char` (16-bit Unicode) |
| **String** | `"Hello, World!"`, `""`, `"Line1\nLine2"` | `String` (Immutable object) |
| **Boolean** | `true`, `false` | `boolean` (Control flow) |
| **Null** | `null` | Reference types only |
| **Underscores** | `1_000_000`, `3.141_592_653` | Java 7+ readability feature |
