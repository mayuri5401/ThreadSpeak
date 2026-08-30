---
id: "java-control-statements-jump"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Control Statements"
title: "Jump Statements"
slug: "java-control-statements-jump"
summary: "Master Java Jump Statements: break in loops & switch, continue in for & while loops, return with values & void methods, unreachable code rules, and complete runnable programs."
eli10: "Jump statements are code shortcuts! 'break' hits the emergency brakes on a loop. 'continue' skips the current step and jumps to the next. 'return' finishes the method and hands back the result!"
mentalModel: "Program Counter (PC) branching: break exits loop scope, continue resets loop cycle, return pops method call stack."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["Jump Statements", "break", "continue", "return", "Branching", "Void Methods", "Unreachable Code"]
animationType: "jump"
codeSnippet:
  language: "java"
  explanation: "Demonstrating break in loops, continue in while loops, and return in methods."
  code: |
    public class JumpDemo {
        public static int add(int a, int b) {
            return a + b; // Returns sum
        }

        public static void main(String[] args) {
            for (int i = 1; i <= 5; i++) {
                if (i == 3) continue; // Skip 3
                if (i == 5) break;    // Stop at 5
                System.out.print(i + " ");
            }
            System.out.println("\nAdd: " + add(5, 3));
        }
    }
---

# 🚀 Java Jump Statements with Examples

## 📖 Introduction

**Jump statements** transfer the program's control from one part of the code to another, skipping the lines in between.

By default, Java programs execute statements sequentially line by line from top to bottom. Jump statements allow us to:
- **Break the usual execution order** *(e.g., exit a loop early using `break`)*.
- **Skip parts of the code** *(e.g., skip an iteration using `continue`)*.
- **Return control to the method caller** *(e.g., exit a method and optionally return a value using `return`)*.

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        🚀 Jump Statements in Java                      │
│                                                                        │
│  🛑 break     ➔ Stops the loop completely when a condition is true     │
│  ⏭️ continue  ➔ Skips the current loop step and moves to the next one  │
│  ↩️ return    ➔ Ends the method and sends a result back, if needed     │
└────────────────────────────────────────────────────────────────────────┘
```

---

### 🗺️ Examples of Jump Statements in Java:
1. **`break`**: Stops the loop or switch block completely when a condition is `true`.
2. **`continue`**: Skips the current loop iteration and moves directly to the next one.
3. **`return`**: Ends the method and sends a result back to the caller, if needed.

These are explained deeply below with syntax, mechanics, programs, and outputs.

---

## 🔹 1. "break" Statement in Java

The **`break` statement** is used to **exit a loop or a switch statement** before it has completed its normal execution.

- **In Loops**: The `break` statement can be used to terminate loops (`for`, `while`, `do-while`) prematurely when a specific condition is met.
- **In Switch Statements**: It is commonly used in `switch` statements to exit a particular `case` and prevent the execution of subsequent cases (preventing fall-through).

```text
┌────────────────────────────────────────────────────────┐
│                      break Flow                        │
│                                                        │
│   for (int i = 1; i <= 10; i++) {                      │
│       if (i == 5) {                                    │
│           break; ───────────► [Exits Loop Immediately] │
│       }                                                │
│       System.out.println(i);                           │
│   }                                                    │
└────────────────────────────────────────────────────────┘
```

#### ⚙️ How It Works:
The `break` statement stops the loop or case execution and immediately moves control to the **first statement outside the loop or switch block**.

#### 📌 Syntax:
```java
break;
```

---

#### 💻 Program 1: Using `break` in a Loop
```java
public class BreakExample
{
    public static void main(String[] args)
    {
        for (int i = 1; i <= 10; i++)
        {
            if (i == 5)
            {
                System.out.println("Loop stopped at: " + i);
                break; // Exit the loop when i equals 5
            }
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
Loop stopped at: 5
```

---

#### 💻 Program 2: Using `break` in a `switch` Statement
```java
public class BreakSwitchExample
{
    public static void main(String[] args)
    {
        int day = 3;

        switch (day)
        {
            case 1:
                System.out.println("Monday");
                break;
            case 2:
                System.out.println("Tuesday");
                break;
            case 3:
                System.out.println("Wednesday");
                break;
            case 4:
                System.out.println("Thursday");
                break;
            case 5:
                System.out.println("Friday");
                break;
            case 6:
                System.out.println("Saturday");
                break;
            case 7:
                System.out.println("Sunday");
                break;
            default:
                System.out.println("Invalid day");
        }
    }
}
```

#### 🖥️ Output:
```text
Wednesday
```

---

### ⚠️ Important Notes on `break`:
1. **Nested Loops**: If placed inside nested loops, the `break` statement only terminates the **innermost loop** it is directly inside.
2. **Clean Logic**: Use `break` wisely to avoid abrupt terminations that can make the program logic harder to follow and debug.

---

## 🔹 2. "continue" Statements in Java

The **`continue` statement** is used to **skip the current iteration** of a loop and move directly to the next iteration without completing the remaining code in the loop body for that iteration.  
It is useful when we want to skip specific items or conditions and proceed with the rest of the loop.

```text
┌────────────────────────────────────────────────────────┐
│                     continue Flow                      │
│                                                        │
│   for (int i = 1; i <= 5; i++) {                       │
│       if (i == 3) {                                    │
│           continue; ───────► [Skips to Next Iteration] │
│       }                                                │
│       System.out.println(i);                           │
│   }                                                    │
└────────────────────────────────────────────────────────┘
```

#### ⚙️ How It Works in Loops:
- When the `continue` statement is encountered, the loop **immediately jumps to the next iteration**.
- In a **`for` loop**, the **increment/decrement step** is executed next.
- In a **`while` or `do-while` loop**, the **boolean condition** is checked again.

#### 📌 Syntax:
```java
continue;
```

---

#### 💻 Program 1: Using `continue` in a `for` Loop
```java
public class ContinueExample
{
    public static void main(String[] args)
    {
        for (int i = 1; i <= 5; i++)
        {
            if (i == 3)
            {
                System.out.println("Skipping number: " + i);
                continue; // Skip the rest of the code in this iteration
            }
            System.out.println("Number: " + i);
        }
    }
}
```

#### 🖥️ Output:
```text
Number: 1
Number: 2
Skipping number: 3
Number: 4
Number: 5
```

---

#### 💻 Program 2: Using `continue` in a `while` Loop
```java
public class ContinueWhileExample
{
    public static void main(String[] args)
    {
        int number = 1;

        while (number <= 5)
        {
            if (number == 3)
            {
                System.out.println("Skipping number: " + number);
                number++; // Increment the number to avoid an infinite loop
                continue; // Skip the rest of the code in this iteration
            }
            System.out.println("Number: " + number);
            number++;
        }
    }
}
```

#### 🖥️ Output:
```text
Number: 1
Number: 2
Skipping number: 3
Number: 4
Number: 5
```

---

### ⚠️ Important Notes on `continue`:
1. The `continue` statement works with `for`, `while`, and `do-while` loops.
2. It **only skips the current iteration** and does **not** terminate the loop entirely.
3. In `while` loops, make sure to update the counter variable **before** calling `continue`, otherwise it may cause an infinite loop!

---

## 🔹 3. "return" Statements in Java

The **`return` statement** is used to **exit from a method** and optionally send a value back to the method's caller.  
It is essential for returning computed results from a method or terminating the execution of a method before it reaches its end.

The usage of the `return` keyword in Java is categorized into **two main cases**:
1. **Methods returning a value**: The `return` keyword sends a value back to the caller matching the return type.
2. **Methods not returning a value (`void` methods)**:
   - *Without return*: The method naturally ends after reaching its closing brace `}`.
   - *With void return (`return;`)*: Exits the method early without returning a value.

> 📖 [Click Here](https://smartprogramming.in/tutorials/java/java-methods) to read deep explanation of Java Methods and return usage.

#### 📌 Syntax:
```java
return value; // For methods with return types (e.g. int, String), to send a value back.
return;       // For void methods, to exit the method early.
```

---

#### 💻 Program 1: Using `return` in a Value-Returning Method
```java
public class ReturnExample
{
    public static void main(String[] args)
    {
        System.out.println("Result: " + addNumbers(5, 3)); // Calling method
    }

    public static int addNumbers(int a, int b)
    {
        int sum = a + b;
        return sum; // Return the sum to the caller
    }
}
```

#### 🖥️ Output:
```text
Result: 8
```

---

#### 💻 Program 2: Using `return` in a `void` Method (Early Exit)
```java
public class ReturnVoidExample
{
    public static void main(String[] args)
    {
        checkAge(16); // Testing with an age less than 18
        // checkAge(20); // Testing with an age greater than or equal to 18
        System.out.println("Voting Ended.");
    }

    public static void checkAge(int age)
    {
        if (age < 18)
        {
            return; // Exits the method early if age is less than 18
        }
        System.out.println("You can vote");
    }
}
```

#### 🖥️ Output:
```text
Voting Ended.
```

---

### ⚠️ NOTE on Unreachable Code:
> **After the `return` statement, no other statements can be written in that block** because control has already been returned to the caller. Writing code after an unconditional return causes a **compile-time error**: *"Unreachable code"*.

```java
public static int getScore() {
    return 100;
    System.out.println("Done"); // ❌ Compile Error: Unreachable code
}
```

---

## 📊 Summary Comparison: `break` vs `continue` vs `return`

| Property | `break` | `continue` | `return` |
|:---|:---|:---|:---|
| **Effect on Flow** | **Terminates** the loop or switch block completely | **Skips current iteration**, jumps to next | **Exits entire method** immediately |
| **Applicability** | Loops (`for`, `while`, `do-while`) & `switch` | Loops only | Any method or constructor |
| **Returns a Value?** | No | No | Yes (optional in `void`, mandatory in non-`void`) |
| **Next Step** | First statement after loop/switch | Next iteration condition / increment | Control returns to the caller method |
