---
id: "java-terminologies-operators"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Programming Language Terminologies"
title: "Operators"
slug: "java-terminologies-operators"
summary: "Comprehensive guide to Java Operators: 9 complete categories including Arithmetic, Assignment, Relational, Logical, Ternary, Unary (pre/post increment), Bitwise, Shift (<<, >>, >>>), and Instanceof."
eli10: "Operators are mathematical and logical action tools in code! In '10 + 20', '+' is the operator doing the addition, and 10 and 20 are the operands."
mentalModel: "Operators act on Operands to compute values or test conditions."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["Operators", "Arithmetic", "Relational", "Logical", "Bitwise", "Shift", "Ternary", "Unary", "Instanceof"]
animationType: "operators"
codeSnippet:
  language: "java"
  explanation: "Demonstration of all major operator categories in Java."
  code: |
    public class OperatorsDemo {
        public static void main(String[] args) {
            int a = 10, b = 20;

            // 1. Arithmetic & Assignment
            int sum = a + b;
            sum += 5; // sum = sum + 5 = 35

            // 2. Relational & Logical
            boolean isGreater = (b > a) && (a != 0); // true

            // 3. Ternary Operator
            int max = (a > b) ? a : b; // 20

            // 4. Unary (Prefix vs Postfix)
            int x = 5;
            int y = ++x; // x=6, y=6

            // 5. Bitwise & Shift
            int bitAnd = a & b;     // 10 & 20 = 0
            int leftShift = a << 1; // 10 * 2^1 = 20

            // 6. Instanceof
            String name = "Deepak";
            boolean isStr = name instanceof String; // true

            System.out.println("Sum: " + sum + " | Max: " + max);
            System.out.println("Logical Condition: " + isGreater);
            System.out.println("Left Shift (10 << 1): " + leftShift);
            System.out.println("isStr: " + isStr);
        }
    }
---

# ⚡ Operators in Java

## 📖 Introduction

**Operators are special symbols used to perform operations on one or more operands.**

```java
int no1 = 10, no2 = 20;
int res = no1 + no2;
```

```text
┌─────────────────┬──────────────────┬─────────────────┐
│       no1       │        +         │       no2       │
├─────────────────┼──────────────────┼─────────────────┤
│     Operand     │     Operator     │     Operand     │
│ (Data Value: 10)│ (Addition Action)│ (Data Value: 20)│
└─────────────────┴──────────────────┴─────────────────┘
```

- **`+`** and **`=`** are **Operators**.
- **`no1`** and **`no2`** are **Operands**.

---

## 🗺️ Complete List of Operator Categories in Java

Java provides **9 distinct categories of operators**:

```text
                              Java Operators
                                    │
    ┌──────────┬──────────┬─────────┴────────┬──────────┬──────────┐
    ▼          ▼          ▼                  ▼          ▼          ▼
1.Arithmetic 2.Assignment 3.Relational   4.Logical  5.Ternary  6.Unary
 (+, -, *,   (=, +=, -=,  (==, !=, <,    (&&, ||,   (?:)       (++, --,
  /, %)       *=, /=, %=)  >, <=, >=)     !)                    +, -, !)
                                    │
                      ┌─────────────┴─────────────┐
                      ▼                           ▼
                 7. Bitwise                   8. Shift         9. Instanceof
                 (&, |, ^, ~)                 (<<, >>, >>>)    (instanceof)
```

---

## 📊 Comprehensive Master Operator Table

| Category | Description | Operators | Example Expression | Result |
|:---|:---|:---|:---|:---:|
| **1. Arithmetic** | Basic mathematical operations | `+`, `-`, `*`, `/`, `%` | `10 + 20`<br>`20 % 3` | `30`<br>`2` |
| **2. Assignment** | Assigns values to variables | `=`, `+=`, `-=`, `*=`, `/=`, `%=` | `int a = 10;`<br>`a += 5;` | `15` |
| **3. Relational** | Compares values; returns boolean | `==`, `!=`, `<`, `>`, `<=`, `>=` | `10 < 20`<br>`10 == 20` | `true`<br>`false` |
| **4. Logical** | Logical conditions on boolean expressions | `&&` (AND), `\|\|` (OR), `!` (NOT) | `(10 < 20) && (5 > 2)`<br>`!(10 == 20)` | `true`<br>`true` |
| **5. Ternary** | Shorthand for simple `if-else` | `condition ? val1 : val2` | `(10 > 20) ? 10 : 20` | `20` |
| **6. Unary** | Operates on a single operand | `+`, `-`, `++`, `--`, `!` | `int x = 5; ++x;`<br>`!true` | `6`<br>`false` |
| **7. Bitwise** | Operates on binary bit representations | `&` (AND), `\|` (OR), `^` (XOR), `~` (NOT) | `5 & 3` (0101 & 0011)<br>`5 \| 3` (0101 \| 0011) | `1` (0001)<br>`7` (0111) |
| **8. Shift** | Shifts bits left or right | `<<` (Left), `>>` (Right), `>>>` (Unsigned) | `10 << 1` ($10 \times 2^1$)<br>`10 >> 1` ($10 / 2^1$) | `20`<br>`5` |
| **9. Instanceof** | Checks if object is an instance of a Class | `object instanceof ClassName` | `"Deepak" instanceof String` | `true` |

---

## 🔍 Detailed Breakdown of Operator Categories

### 🔹 1. Arithmetic Operators
Used for arithmetic math calculations:
- **`+` (Addition)**: Adds two operands (`10 + 20 = 30`).
- **`-` (Subtraction)**: Subtracts right operand from left (`20 - 10 = 10`).
- **`*` (Multiplication)**: Multiplies two operands (`10 * 5 = 50`).
- **`/` (Division)**: Divides left by right operand (`20 / 4 = 5`).
- **`%` (Modulus)**: Returns remainder of integer division (`20 % 3 = 2`).

---

### 🔹 2. Assignment Operators
Used to assign and update values stored in variables:
- **`=`**: Simple assignment (`int x = 10;`).
- **`+=`**: Addition assignment (`x += 5` is equivalent to `x = x + 5`).
- **`-=`**: Subtraction assignment (`x -= 2` is equivalent to `x = x - 2`).
- **`*=`**: Multiplication assignment (`x *= 3` is equivalent to `x = x * 3`).
- **`/=`**: Division assignment (`x /= 2` is equivalent to `x = x / 2`).
- **`%=`**: Modulus assignment (`x %= 3` is equivalent to `x = x % 3`).

---

### 🔹 3. Relational (Comparison) Operators
Compare two values and always return a **`boolean` (`true` or `false`)**:
- **`==`**: Equal to (`10 == 10` ➔ `true`).
- **`!=`**: Not equal to (`10 != 20` ➔ `true`).
- **`<`**: Less than (`10 < 20` ➔ `true`).
- **`>`**: Greater than (`10 > 20` ➔ `false`).
- **`<=`**: Less than or equal to (`10 <= 10` ➔ `true`).
- **`>=`**: Greater than or equal to (`20 >= 10` ➔ `true`).

---

### 🔹 4. Logical Operators
Used to combine multiple relational expressions:
- **`&&` (Logical AND)**: Returns `true` if **both** conditions are `true`.
- **`||` (Logical OR)**: Returns `true` if **at least one** condition is `true`.
- **`!` (Logical NOT)**: Inverts the boolean result (`!true` ➔ `false`).

---

### 🔹 5. Ternary Operator (`?:`)
The ternary operator is a compact shorthand replacement for a simple `if-else` statement:

```java
int max = (no1 > no2) ? no1 : no2;
```

If `(no1 > no2)` is `true`, `no1` is returned; otherwise, `no2` is returned.

---

### 🔹 6. Unary Operators
Unary operators require only **one operand**:
- **`++` (Increment)**: Increases value by 1.
  - **Pre-increment (`++x`)**: Increments value first, then uses it in expression.
  - **Post-increment (`x++`)**: Uses current value first, then increments it.
- **`--` (Decrement)**: Decreases value by 1 (Prefix `--x` or Postfix `x--`).
- **`!` (Logical NOT)**: Inverts boolean flag.

---

### 🔹 7. Bitwise Operators
Perform bit-level manipulation on binary bits (0 and 1):
- **`&` (Bitwise AND)**: 1 if both corresponding bits are 1.
- **`|` (Bitwise OR)**: 1 if either bit is 1.
- **`^` (Bitwise XOR)**: 1 if bits are different (0 and 1 or 1 and 0).
- **`~` (Bitwise NOT / Invert)**: Inverts all bits (0 ➔ 1, 1 ➔ 0).

---

### 🔹 8. Shift Operators
Shifts the binary bit positions of an integer:
- **`<<` (Left Shift)**: Shifts bits left, filling right with zeros. Multiplies by $2^{\text{shift}}$:
  `10 << 1` ➔ $10 \times 2 = 20$.
- **`>>` (Signed Right Shift)**: Shifts bits right, preserving the sign bit. Divides by $2^{\text{shift}}$:
  `20 >> 1` ➔ $20 / 2 = 10$.
- **`>>>` (Unsigned Right Shift)**: Shifts bits right and always fills left with `0`.

---

### 🔹 9. Instanceof Operator
Tests whether an object reference is an instance of a specific Class or Interface:

```java
String name = "Deepak";
boolean check = name instanceof String; // true
```

---

## 💻 Complete Java Program Demonstrating All 9 Operators

```java
public class OperatorsDemo {
    public static void main(String[] args) {
        int no1 = 10, no2 = 20;

        // 1. Arithmetic Operators
        System.out.println("Addition: " + (no1 + no2));        // 30
        System.out.println("Modulus: " + (no2 % 3));           // 2

        // 2. Assignment Operators
        int x = 10;
        x += 5;
        System.out.println("x after += 5: " + x);              // 15

        // 3. Relational Operators
        System.out.println("Is no1 < no2? " + (no1 < no2));    // true

        // 4. Logical Operators
        boolean res = (no1 < no2) && (no2 > 15);
        System.out.println("Logical AND Result: " + res);      // true

        // 5. Ternary Operator
        int min = (no1 < no2) ? no1 : no2;
        System.out.println("Ternary Min Value: " + min);       // 10

        // 6. Unary Operators
        int count = 5;
        System.out.println("Post-increment: " + (count++));    // Prints 5, then count becomes 6
        System.out.println("Pre-increment: " + (++count));     // count becomes 7, prints 7

        // 7. Bitwise Operators
        System.out.println("Bitwise AND (5 & 3): " + (5 & 3)); // 1

        // 8. Shift Operators
        System.out.println("Left Shift (10 << 1): " + (10 << 1)); // 20

        // 9. Instanceof Operator
        String author = "Deepak";
        System.out.println("Is author String? " + (author instanceof String)); // true
    }
}
```

#### 🖥️ Program Output:
```text
Addition: 30
Modulus: 2
x after += 5: 15
Is no1 < no2? true
Logical AND Result: true
Ternary Min Value: 10
Post-increment: 5
Pre-increment: 7
Bitwise AND (5 & 3): 1
Left Shift (10 << 1): 20
Is author String? true
```
