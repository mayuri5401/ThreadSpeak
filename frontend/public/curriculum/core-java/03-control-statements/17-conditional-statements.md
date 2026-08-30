---
id: "java-control-statements-conditional"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Control Statements"
title: "Conditional Statements"
slug: "java-control-statements-conditional"
summary: "Master Java Conditional Statements: if, if-else, if-else if ladder, and switch statement with real-life analogies, syntax rules, optional curly braces, and full runnable programs."
eli10: "Conditional statements are like decision forks in a game! 'Is it raining?' If NO ➔ Let's play cricket! If YES ➔ Stay indoors. Java checks your true/false conditions to decide which code runs."
mentalModel: "Boolean decision branches: Evaluating conditions to true/false and jumping execution to the matching code block."
difficulty: "Beginner"
estimatedMinutes: 15
tags: ["Conditional Statements", "Decision Making", "if", "if-else", "if-else-if", "switch", "Syntax Rules", "Optional Braces"]
animationType: "conditional"
codeSnippet:
  language: "java"
  explanation: "Demonstration of if, if-else, if-else-if ladder, and switch statement in Java."
  code: |
    public class ConditionalDemo {
        public static void main(String[] args) {
            // 1. if-else example
            int number = 10;
            if (number > 0) {
                System.out.println("The number is positive.");
            } else {
                System.out.println("The number is negative.");
            }

            // 2. switch statement example
            int day = 3;
            switch (day) {
                case 1 -> System.out.println("Monday");
                case 2 -> System.out.println("Tuesday");
                case 3 -> System.out.println("Wednesday");
                default -> System.out.println("Other day");
            }
        }
    }
---

# 🔀 Java Conditional Statements with Examples

## 📖 Introduction & Real-World Analogy

<div class="my-6 rounded-2xl bg-gradient-to-b from-[#0F172A] via-[#0D1527] to-[#0A0F1D] border border-cyan-500/30 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
<div class="flex items-center justify-between pb-4 mb-5 border-b border-slate-800/80">
<div class="flex items-center gap-2.5">
<span class="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-300 text-base font-bold border border-cyan-500/30">🌧️</span>
<span class="text-xs sm:text-sm font-bold uppercase tracking-wider text-cyan-300 font-mono">Real-World Decision Analogy</span>
</div>
<span class="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 shadow-sm">Weather Decision</span>
</div>

<div class="space-y-4 max-w-xl mx-auto">
<div class="p-4 rounded-xl bg-slate-900/90 border border-slate-700 text-center shadow-md">
<span class="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-1">Testing Condition</span>
<p class="text-base sm:text-lg font-bold text-white m-0">"Is it raining?" 🌧️</p>
</div>

<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
<div class="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 shadow-sm">
<div class="flex items-center gap-2 mb-1.5">
<span class="text-xs font-bold font-mono px-2 py-0.5 rounded bg-emerald-900/80 text-emerald-300 border border-emerald-500/40">"No" (False)</span>
</div>
<p class="text-sm font-semibold text-emerald-200 m-0">➔ "Then let's play cricket! 🏏"</p>
</div>

<div class="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 shadow-sm">
<div class="flex items-center gap-2 mb-1.5">
<span class="text-xs font-bold font-mono px-2 py-0.5 rounded bg-rose-900/80 text-rose-300 border border-rose-500/40">"Yes" (True)</span>
</div>
<p class="text-sm font-semibold text-rose-200 m-0">➔ "Ohh, we can't play cricket. 🏠"</p>
</div>
</div>
</div>

<div class="mt-5 pt-4 border-t border-slate-800/80 bg-slate-900/60 rounded-xl p-4 border border-cyan-500/20">
<div class="flex items-start gap-3">
<span class="text-2xl mt-0.5">💡</span>
<div class="text-xs sm:text-sm text-slate-300 leading-relaxed">
<strong>The Key Idea:</strong> Just like in real life, in programming also, we face situations where we need to make decisions based on certain conditions. In Java, we use <strong>conditional statements</strong> to decide which part of the code should run depending on the condition.
</div>
</div>
</div>
</div>

---

### 🎯 Conditional Statements Help Us To:
1. **Control the flow of the program.**
2. **Decide which block of code should be executed when certain conditions are met.**

---

### 🗺️ Examples of Conditional Statements in Java:
- **`if`**: Runs code if a condition is `true`.
- **`if-else`**: Runs one block of code if `true`, and another block if `false`.
- **`if-else if ladder`**: Checks multiple conditions one by one and runs the block of code for the first `true` condition.
- **`switch`**: Chooses a block of code to run based on matching specific constant cases.

These are explained deeply below with syntax, code examples, and outputs.

---

## 🔹 1. "if" Statement in Java

The **`if`** statement in Java evaluates a **boolean condition**.  
If the condition is **`true`**, the block of code inside the `if` statement is executed. If `false`, the block is skipped.

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
            │  if block    │             │  Next Code   │
            └──────────────┘             └──────────────┘
```

#### 📌 Syntax:
```java
if (condition)
{
    // this block will be executed if the condition is true
}
```

#### 💻 Program:
```java
public class IfExample
{
    public static void main(String[] args)
    {
        int number = 10;

        // Check if the number is positive
        if (number > 0)
        {
            System.out.println("The number is positive.");
        }
    }
}
```

#### 🖥️ Output:
```text
The number is positive.
```

---

### 💡 NOTE on Single-Statement `if` Blocks:
> If there is **only one statement** in the `if` block, then the curly braces `{}` are **optional**.

#### 📌 Single-Statement Syntax:
```java
if (condition)
    statement;
```

#### 💻 Example:
```java
public class IfExample
{
    public static void main(String[] args)
    {
        int number = 10;

        if (number > 0)
            System.out.println("The number is positive.");
    }
}
```

---

## 🔹 2. "if-else" Statement in Java

The **`if-else`** statement in Java evaluates a **boolean condition**.  
If the condition is **`true`**, the block of code inside the `if` block is executed; otherwise, the code inside the **`else`** block runs.

```text
                     /  Condition  \
                    <   Is True?    >
                     \             /
                      /           \
               True  /             \  False
                    ▼               ▼
             ┌──────────────┐ ┌──────────────┐
             │   if block   │ │  else block  │
             └──────────────┘ └──────────────┘
                    │               │
                    └───────┬───────┘
                            ▼
                     [ Next Code ]
```

#### 📌 Syntax:
```java
if (condition)
{
    // this block will be executed if the condition is true
}
else
{
    // this block will be executed if condition is false   
}
```

#### 💻 Program:
```java
public class IfElseExample
{
    public static void main(String[] args)
    {
        int number = -5;

        // Check if the number is positive or negative
        if (number > 0)
        {
            System.out.println("The number is positive.");
        }
        else
        {
            System.out.println("The number is negative.");
        }
    }
}
```

#### 🖥️ Output:
```text
The number is negative.
```

---

### 💡 NOTE on Single-Statement `if-else` Blocks:
> If there is **only one statement** in the `if` and `else` blocks, then curly braces `{}` are **optional**.

#### 📌 Single-Statement Syntax:
```java
if (condition)
    statement;
else
    statement;
```

---

## 🔹 3. "if-else if" Ladder Statement in Java

The **`if-else if` ladder** in Java evaluates **multiple boolean conditions in sequence**.  
If any condition is **`true`**, the block of code associated with that condition is executed. If **none** of the conditions are true, the optional **`else`** block runs.

```text
               if (condition1) ── True ──► [ Block 1 ]
                     │ False
               else if (condition2) ── True ──► [ Block 2 ]
                     │ False
               else if (condition3) ── True ──► [ Block 3 ]
                     │ False
               else ──────────────────────────► [ Fallback Block ]
```

#### 📌 Syntax:
```java
if (condition1) 
{
    // Code to execute if condition1 is true
}
else if (condition2)
{
    // Code to execute if condition2 is true
}
// ---- more else-if blocks as needed ----
else
{
    // Code to execute if none of the above conditions are true
}
```

#### 💻 Program:
```java
public class IfElseIfLadderExample
{
    public static void main(String[] args)
    {
        int marks = 75;

        // Determine the grade based on marks
        if (marks >= 90)
        {
            System.out.println("Grade: A");
        }
        else if (marks >= 75)
        {
            System.out.println("Grade: B");
        }
        else if (marks >= 50)
        {
            System.out.println("Grade: C");
        }
        else
        {
            System.out.println("Grade: F");
        }
    }
}
```

#### 🖥️ Output:
```text
Grade: B
```

---

## 🔹 4. "switch" Statement in Java

The **`switch`** statement in Java runs one block of code based on **matching a condition or value**.  
It checks multiple `cases` for a matching value and runs that specific case. If no case matches, the optional **`default`** block runs.

```text
               switch (expression)
                        │
       ┌────────────────┼────────────────┬────────────────┐
       ▼                ▼                ▼                ▼
   case value1:     case value2:     case value3:      default:
   [statement]      [statement]      [statement]      [fallback]
     break;           break;           break;           break;
```

#### 📌 Syntax:
```java
switch (expression)
{
    case value1:
        // Code to execute if expression equals value1
        break;
    case value2:
        // Code to execute if expression equals value2
        break;
    // ---- more cases as needed ----
    default:
        // Code to execute if no case matches (optional)
        break;
}
```

> 💡 **NOTE:** Instead of writing many `if-else` statements for equality checks, we can use the **`switch` statement** for simpler, cleaner, and more readable code.

#### 💻 Program:
```java
public class SwitchExample
{
    public static void main(String[] args)
    {
        int day = 3;

        // Determine the day of the week
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

## 📊 Summary Comparison: `if-else` Ladder vs `switch` Statement

| Feature | `if-else` Ladder | `switch` Statement |
|:---|:---|:---|
| **Expression Types** | Evaluates complex relational & logical expressions (`<`, `>`, `&&`, `||`) | Evaluates equality (`==`) against constant values |
| **Supported Data Types** | Any data type including `boolean`, `float`, `double` | `byte`, `short`, `char`, `int`, `String`, `enum` |
| **Execution Flow** | Evaluates sequentially top-to-bottom | Jumps directly to matching case via branch table ($O(1)$) |
| **Fall-through Behavior** | No fall-through (only first matching block executes) | Requires `break` to prevent falling into next cases |
| **Readability** | Best for range-based checks (e.g. `marks >= 75`) | Best for discrete multi-value choices (e.g. menu options) |
