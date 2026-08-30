---
id: "java-control-statements-looping"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Control Statements"
title: "Looping Statements"
slug: "java-control-statements-looping"
summary: "Master Java Looping Statements: for loop, while loop, do-while loop, enhanced for-each loop, syntax breakdowns, optional curly braces, and complete runnable programs."
eli10: "Looping statements are code repeaters! Instead of writing the same line 100 times, loops tell Java: 'Repeat this block until our condition is satisfied!'."
mentalModel: "Iterative execution cycle: Initialization ➔ Condition Evaluation ➔ Body Execution ➔ Counter Update ➔ Loop Termination."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["Looping Statements", "Iteration", "for loop", "while loop", "do-while loop", "for-each", "Enhanced For Loop", "Scanner Input"]
animationType: "looping"
codeSnippet:
  language: "java"
  explanation: "Demonstration of for loop, while loop, do-while loop, and enhanced for-each loop in Java."
  code: |
    public class LoopingDemo {
        public static void main(String[] args) {
            // 1. for loop
            for (int i = 1; i <= 5; i++) {
                System.out.println("Number: " + i);
            }

            // 2. while loop
            int no = 2;
            while (no <= 10) {
                System.out.print(no + " ");
                no += 2;
            }
            System.out.println();

            // 3. enhanced for-each loop
            String[] fruits = {"Apple", "Banana", "Cherry"};
            for (String fruit : fruits) {
                System.out.println(fruit);
            }
        }
    }
---

# 🔄 Java Looping Statements with Examples

## 📖 Introduction

**Looping Statements** are also known as **"Iteration Statements"**.  
Looping statements allow us to repeat a block of code multiple times, making our programs much more efficient and drastically reducing code redundancy.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        🔄 Why Do We Need Loops?                        │
│                                                                        │
│  🖨️  Printing data multiple times without copy-pasting                  │
│  ⏳  Executing tasks repeatedly until a specific condition is met      │
│  📦  Iterating smoothly through arrays and collections                 │
│  🎮  Running continuous game loops and background worker services      │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 🗺️ Examples of Looping Statements in Java:
- **`for` loop**: Repeats a block of code a specific, predetermined number of times.
- **`while` loop**: Executes a block of code as long as a specified boolean condition is `true`.
- **`do-while` loop**: Executes a block of code once first, then repeats it as long as the condition is `true`.
- **`for-each` (Enhanced For Loop)**: Iterates sequentially over elements in an array or collection.

These are explained deeply below with syntax breakdowns, programs, outputs, and key rules.

---

## 🔹 1. "for" Loop in Java

The **`for` loop** is used to repeat a block of code a **specific number of times**.  
The `for` loop is especially useful when the **number of iterations is known beforehand** (i.e. we know exactly how many times we need to repeat a task), such as when working with fixed-size arrays or running a counter from $1$ to $N$.

```text
┌────────────────────────────────────────────────────────┐
│                      for Loop Flow                     │
│                                                        │
│   1. Initialization (int i = 1) [Runs Once]            │
│          │                                             │
│          ▼                                             │
│   2. Test Condition (i <= 5) ── False ──► [Exit Loop]  │
│          │ (True)                                      │
│          ▼                                             │
│   3. Loop Body Code                                    │
│          │                                             │
│          ▼                                             │
│   4. Increment / Decrement (i++) ──────────────────────┘
└────────────────────────────────────────────────────────┘
```

#### 📌 Syntax:
```java
for (initialization; condition; increment/decrement)
{
    // statements (code to execute)
}
```

#### 🔍 Syntax Explanation:
1. **Initialization**: The loop control variable is initialized before the loop starts. This part runs **only once** at the very beginning.
2. **Condition**: Checks the boolean condition before each iteration. If the condition is `true`, the loop executes the statements inside the `for` block. If `false`, the loop terminates.
3. **Increment/Decrement**: Updates the loop control variable after each iteration, helping the loop progress toward termination.
4. **Statements**: The code block executed whenever the `for` loop condition is `true`.

#### 💻 Program:
```java
public class ForLoopExample
{
    public static void main(String[] args)
    {
        // Print numbers from 1 to 5 using a for loop
        for (int i = 1; i <= 5; i++)
        {
            System.out.println("Number: " + i);
        }
    }
}
```

#### 🖥️ Output:
```text
Number: 1
Number: 2
Number: 3
Number: 4
Number: 5
```

---

### 💡 NOTE on Single-Statement `for` Loops:
> If there is **only one statement** in the `for` loop body, then the curly braces `{}` are **optional**.

#### 📌 Single-Statement Syntax:
```java
for (initialization; condition; increment/decrement)
    statement;
```

#### 💻 Example:
```java
public class ForLoopExample
{
    public static void main(String[] args)
    {
        for (int i = 1; i <= 5; i++)
            System.out.println("Number: " + i);
    }
}
```

---

## 🔹 2. "while" Loop in Java

The **`while` loop** is used to repeat a block of code **as long as a specific condition is true**.  
The `while` loop is useful when we **don’t know in advance how many times** we need to repeat the task, and the loop should continue running as long as the condition holds `true`.

```text
               [ Start ]
                   │
                   ▼
            /  Condition  \
           <   Is True?    > ────── False ──────┐
            \             /                     │
                   │ True                       │
                   ▼                            ▼
            ┌──────────────┐             ┌──────────────┐
            │  Loop Body   │             │  Next Code   │
            └──────────────┘             └──────────────┘
                   │                            ▲
                   └────────────────────────────┘
```

#### 📌 Syntax:
```java
while (condition)
{
    // statements (code to execute)
}
```

#### 🔍 Syntax Explanation:
- **Condition**: Evaluated before each iteration (**entry-controlled**). If `true`, the loop body executes; if `false`, the loop exits.
- **Statements**: The statements inside the loop are executed repeatedly as long as the condition remains `true`.

> ⚠️ **Important Notes:**
> - If the condition is `false` initially, the loop **will not run even once**.
> - If the condition is always `true` (and the variable is not updated), the loop will run **infinitely**.

---

#### 💻 Task & Solution:
- **Task:** Print all the even numbers between $1$ and $17$.
- **Solution:** Since we don't know the exact count of even numbers in an arbitrary range upfront, we can cleanly use a `while` loop starting at $2$ and incrementing by $+2$.

```java
public class WhileLoopExample
{
    public static void main(String[] args)
    {
        int no = 2; // Start from the smallest even number

        while (no <= 17)
        {
            System.out.println("Even Number: " + no);
            no = no + 2; // Skip directly to the next even number
        }
    }
}
```

#### 🖥️ Output:
```text
Even Number: 2
Even Number: 4
Even Number: 6
Even Number: 8
Even Number: 10
Even Number: 12
Even Number: 14
Even Number: 16
```

---

### 💡 NOTE on Single-Statement `while` Loops:
> If there is **only one statement** inside the `while` loop, curly braces `{}` are **optional**.

#### 📌 Single-Statement Syntax:
```java
while (condition)
    statement;
```

---

## 🔹 3. "do-while" Loop in Java

The **`do-while` loop** is used to repeat a block of code **at least once** and then repeatedly as long as the condition is `true`.  
The `do-while` loop is useful when we want the code to **run at least once**, even if the condition evaluates to `false` initially.

```text
            ┌──────────────┐
            │  Loop Body   │ ◄─── (Executes at least once)
            └──────────────┘
                   │
                   ▼
            /  Condition  \
           <   Is True?    > ─── True ───► [ Repeat Body ]
            \             /
                   │ False
                   ▼
             [ Exit Loop ]
```

#### 📌 Syntax:
```java
do
{
    // statements (code to execute)
} while (condition);
```

#### 🔍 Syntax Explanation:
- **Statements**: The block of code that is executed **at least once**, regardless of the condition.
- **Condition**: After executing the statements, the condition is checked (**exit-controlled**). If `true`, the loop continues; if `false`, it terminates. Note the mandatory trailing semicolon (`;`).

> 💡 **Key Rule:** The `do-while` loop guarantees that the code inside the loop will run **at least once** because the condition is checked after execution.

---

#### 💻 Task & Solution:
- **Task:** Prompt the user for a number, and keep asking until they provide a positive number ($> 0$).
- **Solution:** Since we must always take input from the user at least once before testing if it's positive, a `do-while` loop is the ideal choice.

```java
import java.util.Scanner;

public class DoWhileExample
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);
        int number;

        // Prompting user for a positive number
        do
        {
            System.out.print("Enter a positive number: ");
            number = scanner.nextInt();
        } while (number <= 0);

        System.out.println("You entered a valid positive number: " + number);
    }
}
```

> 📖 *Note on User Input:* Here we used the `Scanner` class to read console input. [Click Here](https://smartprogramming.in/tutorials/java/java-looping-statements#) to read more about Scanner and looping statements.

#### 🖥️ Sample Console Execution:
```text
Enter a positive number: -20
Enter a positive number: 0
Enter a positive number: 5
You entered a valid positive number: 5
```

---

## 🔹 4. "for-each" Loop (Enhanced For Loop) in Java

The **`for-each` loop** (also called the **Enhanced For Loop**) in Java is used to **iterate over elements in an array or collection** without needing an explicit index variable.  
It is commonly used when we don’t need to manipulate index counters and simply want to process each element in sequence.

```text
┌────────────────────────────────────────────────────────┐
│                   Enhanced for-each                    │
│                                                        │
│   ["Apple", "Banana", "Cherry"]                        │
│       │         │         │                            │
│    Step 1    Step 2    Step 3                          │
│       ▼         ▼         ▼                            │
│    "Apple"   "Banana"  "Cherry" ──► Auto Terminate     │
└────────────────────────────────────────────────────────┘
```

#### 📌 Syntax:
```java
for (dataType variable : collection)
{
    // statements (code to execute)
}
```

#### 🔍 Syntax Explanation:
- **`dataType`**: Specifies the type of the elements stored in the array or collection (e.g. `int`, `String`).
- **`variable`**: Represents the current element during each iteration.
- **`collection`**: The array or collection (e.g. `List`, `Set`, array) being iterated over.

> 💡 **NOTE:** The `for-each` loop is primarily used with arrays and collections, but it can be used with any object implementing the **`Iterable`** interface.

#### 💻 Program:
```java
public class EnhancedForLoopExample
{
    public static void main(String[] args)
    {
        String[] fruits = {"Apple", "Banana", "Cherry"};

        // Using Enhanced For Loop (For-each loop)
        for (String fruit : fruits)
        {
            System.out.println(fruit);
        }
    }
}
```

#### 🖥️ Output:
```text
Apple
Banana
Cherry
```

---

### 🌟 Key Advantages of Enhanced `for-each` Loop:
1. **Cleaner Code**: Eliminates boilerplates (initialization, index counter `i`, boundary check `i < length`, and increment `i++`).
2. **Safe from Out-of-Bounds**: Eliminates `ArrayIndexOutOfBoundsException` risks since the JVM automatically bounds traversal.
3. **High Readability**: Makes intention crystal clear when reading through datasets.

---

## 📊 Summary Comparison: `for` vs `while` vs `do-while` vs `for-each`

| Feature | `for` Loop | `while` Loop | `do-while` Loop | Enhanced `for-each` |
|:---|:---|:---|:---|:---|
| **Control Point** | Entry-controlled | Entry-controlled | **Exit-controlled** | Internal Iterator |
| **Best Scenario** | Known number of iterations | Unknown number of iterations | Must execute **at least once** | Iterating arrays & collections |
| **Minimum Runs** | 0 times | 0 times | **1 time guaranteed** | 0 times (empty array) |
| **Index Access** | Direct (`i`) | Manual (`no`) | Manual (`count`) | No direct index |
| **Trailing `;`** | No | No | **Mandatory (`;`)** | No |
