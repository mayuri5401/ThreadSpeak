---
id: "java-strings-stringtokenizer"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Strings"
title: "StringTokenizer class"
slug: "java-strings-stringtokenizer"
summary: "Master java.util.StringTokenizer: A legacy utility class to break a string into individual tokens based on delimiters. Explore constructors, hasMoreTokens(), nextToken(), countTokens(), and comparison with String.split()."
eli10: "Think of a bread slicer machine. You give it a loaf of bread (the full string) and tell it where to cut (the delimiter like comma or space). Each slice that comes out is a token!"
mentalModel: "StringTokenizer is a legacy token parsing utility in java.util. It processes string characters without compiling regular expressions, making simple delimiter splitting faster than regex-based String.split()."
difficulty: "Intermediate"
estimatedMinutes: 20
tags: ["StringTokenizer", "Tokens", "Delimiters", "java.util.StringTokenizer", "String.split"]
animationType: "stringtokenizer-class"
codeSnippet:
  language: "java"
  explanation: "Demonstration of StringTokenizer constructors, custom delimiters, and token iteration."
  code: |
    import java.util.StringTokenizer;

    public class StringTokenizerDemo {
        public static void main(String[] args) {
            String csvData = "Java,Spring Boot,Microservices,Kafka,Docker";

            // 1. Instantiate StringTokenizer with comma delimiter
            StringTokenizer st = new StringTokenizer(csvData, ",");

            System.out.println("Total Tokens: " + st.countTokens());

            // 2. Iterate through all tokens
            int tokenIndex = 1;
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                System.out.println("Token " + tokenIndex++ + ": " + token);
            }
        }
    }
---

# ✂️ StringTokenizer Class in Java (`java.util.StringTokenizer`)

---

## 📌 1. What is `StringTokenizer`?

`java.util.StringTokenizer` is a predefined utility class in the **`java.util`** package used to break a given string into smaller individual units called **tokens**, separated by specified boundary characters called **delimiters**.

```java
package java.util;

public class StringTokenizer implements Enumeration<Object> {
    // Constructors and token extraction methods...
}
```

---

## 🏗️ 2. `StringTokenizer` Constructors

| Constructor Signature | Description |
| :--- | :--- |
| `StringTokenizer(String str)` | Splits by default whitespace delimiters (`" \t\n\r\f"`). |
| `StringTokenizer(String str, String delim)` | Splits using the specified custom delimiter characters. |
| `StringTokenizer(String str, String delim, boolean returnDelims)` | If `returnDelims` is `true`, delimiter characters are also returned as individual tokens. |

```java
// 1. Default whitespace split
StringTokenizer st1 = new StringTokenizer("Hello World Java");

// 2. Custom comma and hyphen delimiters
StringTokenizer st2 = new StringTokenizer("2026-08-30,12:00:00", "-,:");

// 3. Return delimiters as tokens
StringTokenizer st3 = new StringTokenizer("A+B*C", "+*", true);
```

---

## 🛠️ 3. Essential Methods of `StringTokenizer`

| Method | Return Type | Description |
| :--- | :--- | :--- |
| `hasMoreTokens()` | `boolean` | Returns `true` if one or more tokens remain in the string. |
| `nextToken()` | `String` | Returns the next token string from the tokenizer. |
| `nextToken(String delim)` | `String` | Switches the active delimiter set and returns the next token. |
| `countTokens()` | `int` | Returns the number of tokens remaining to be processed. |
| `hasMoreElements()` | `boolean` | Identical to `hasMoreTokens()` (implements `Enumeration`). |
| `nextElement()` | `Object` | Returns the next token as an `Object`. |

---

## 📊 4. `StringTokenizer` vs `String.split()` vs `Scanner`

| Feature | `StringTokenizer` | `String.split(regex)` | `java.util.Scanner` |
| :--- | :--- | :--- | :--- |
| **Package** | `java.util` | `java.lang.String` | `java.util` |
| **Parsing Mechanism** | Simple character delimiters | Full Regular Expressions (Regex) | Streams, Regex, and Primitive types |
| **Memory Efficiency** | High (Processes stream on-the-fly) | Creates array storing all tokens at once | Moderate |
| **Status** | Legacy (Maintained for backward compatibility) | Modern standard for string splitting | Modern standard for console/file token parsing |

---

## 💡 5. Complete Code Example

```java
import java.util.StringTokenizer;

public class StringTokenizerAdvancedDemo {
    public static void main(String[] args) {
        String logEntry = "2026-08-30 | ERROR | DatabaseConnectionPool | Connection timed out";

        StringTokenizer tokenizer = new StringTokenizer(logEntry, "|");

        System.out.println("Processing Log Entry (Tokens remaining: " + tokenizer.countTokens() + "):");

        while (tokenizer.hasMoreTokens()) {
            String token = tokenizer.nextToken().trim();
            System.out.println("-> " + token);
        }
    }
}
```
