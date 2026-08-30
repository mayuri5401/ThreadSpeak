---
id: "java-intro-how-java-works"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Java Introduction"
title: "How Java Works"
slug: "java-intro-how-java-works"
summary: "Deep step-by-step visual explanation of how Java works: writing source code, compilation with javac, bytecode (.class file), JVM execution, and screen output."
eli10: "Think of an international recipe: Step 1: You write a recipe in English (MainApp.java). Step 2: A translator converts it into a universal culinary blueprint (javac). Step 3: The blueprint packet is sealed (.class bytecode). Step 4: A master chef reads the blueprint in any kitchen worldwide and cooks the dish (JVM). Step 5: The delicious meal is served (Output: Hello Deepak)!"
mentalModel: "Step 1: Write (MainApp.java) ➔ Step 2: Compile (javac) ➔ Step 3: Bytecode (.class) ➔ Step 4: Execute (JVM) ➔ Step 5: Output (Hello Deepak)."
difficulty: "Beginner"
estimatedMinutes: 12
tags: ["How Java Works", "javac", "Bytecode", "JVM", "WORA", "Execution Flow"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Standard Java program demonstrating the 5-step execution flow."
  code: |
    // Step 1: Writing the Java Program (MainApp.java)
    public class MainApp {

        // Step 4: JVM Entry Point
        public static void main(String[] args) {
            // Step 5: Display Output on Screen
            System.out.println("Hello Deepak");
        }
    }
---

# 🚀 How Java Works: Deep Explanation of How Java Works Step by Step

The diagram and guide below visually explain the complete sequence of steps involved when **writing, compiling, and executing a Java program** using Notepad and the Command Prompt (CMD).

---

## 🗺️ Visual Step-by-Step Architecture Diagram

```text
┌─────────────────┐       Step 2        ┌─────────────────┐       Step 4        ┌─────────────────┐
│     Step 1      │    Compilation      │     Step 3      │     Execution       │     Step 5      │
│  Java Program   │ ──────────────────> │   .class file   │ ──────────────────> │     Output      │
│ (MainApp.java)  │   Java Compiler     │   (Byte Code)   │        JVM          │ (Hello Deepak)  │
│ [Notepad / IDE] │      (javac)        │  [Intermediate] │  [Virtual Machine]  │  [CMD Screen]   │
└─────────────────┘                     └─────────────────┘                     └─────────────────┘
```

---

## 📋 5-Step Process Overview

| Step # | Stage Name | Tool / Component | File / State | Primary Purpose |
|:---:|:---|:---|:---|:---|
| **1** | **Writing Program** | Notepad / Text Editor | `MainApp.java` | Writing human-readable Java source code |
| **2** | **Compilation** | Java Compiler (`javac`) | `javac MainApp.java` | Checking syntax & compiling into bytecode |
| **3** | **Bytecode Generation** | Bytecode Artifact | `MainApp.class` | Universal, platform-independent binary instructions |
| **4** | **Execution** | Java Virtual Machine (`JVM`) | `java MainApp` | Loading bytecode & translating to CPU machine code |
| **5** | **Output** | Console / Command Prompt | Screen Display | Printing `Hello Deepak` on the terminal |

---

## 🔍 Detailed 5-Step Explanation

---

### 📝 Step 1: Writing the Java Program
- We write our Java program in a plain text editor like **Notepad** (or an IDE like IntelliJ / Eclipse / VS Code).
- The program is saved with a `.java` extension, e.g., `MainApp.java`.

```java
// MainApp.java
public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello Deepak");
    }
}
```

- **Key Concept**: The `.java` file contains our human-readable Java source code, including a class with a `main` method (the mandatory entry point of the program).

---

### ⚙️ Step 2: Compilation (`javac`)
- In the compilation phase, we open **Command Prompt (CMD)**, navigate to the directory where our `.java` file is located, and run the `javac` command:

```cmd
cd /d D:\JavaPrograms
javac MainApp.java
```

- **What happens during the compilation phase**:
  1. **Source Ingestion**: The Java Compiler (`javac`) reads the `MainApp.java` file.
  2. **Syntax & Semantic Verification**: It checks the code for syntax errors, missing semicolons, type mismatches, and unresolved symbols.
  3. **Bytecode Generation**: If there are no errors, it compiles the high-level code into **bytecode**, a platform-independent intermediate representation.
  4. **File Creation**: The bytecode is saved in a `.class` file (e.g., `MainApp.class`) in the same directory.

---

### 📦 Step 3: Bytecode (`.class` File)
- The `.class` file contains the compiled **bytecode** (hexadecimal instructions starting with the magic number `0xCAFEBABE`), which can be executed on **any system** that has a Java Virtual Machine (JVM) installed.
- **Why Bytecode Matters ("WORA")**:
  - Bytecode ensures Java's famous **"Write Once, Run Anywhere" (WORA)** principle.
  - Because bytecode is not tied to a specific hardware architecture (Intel x86, AMD, ARM) or operating system (Windows, macOS, Linux), the same `MainApp.class` file runs identically across all platforms without recompilation.

---

### 🚀 Step 4: Execution (`java MainApp`)
- To run the program, we execute the `java` command in CMD:

```cmd
java MainApp
```

> [!IMPORTANT]
> **Important Rule**: Do not include the `.class` extension in this command. Always write `java MainApp`, not `java MainApp.class`.

- **What happens during the execution phase inside the JVM**:
  1. **Class Loading**: The JVM ClassLoader loads `MainApp.class` from disk into memory.
  2. **Bytecode Verification**: The Bytecode Verifier checks the code to ensure it does not violate JVM security or memory safety constraints.
  3. **Translation to Machine Code**: The JVM Execution Engine converts the bytecode into native machine code (binary `0`s and `1`s) that the specific operating system and CPU understand.
  4. **Line-by-Line Execution**: It executes the machine code line by line, starting directly from the `public static void main(String[] args)` entry point.

---

### 🖥️ Step 5: Output
- If the program contains a print statement, such as:
  ```java
  System.out.println("Hello Deepak");
  ```
- The JVM executes it, routes the string data to the standard output stream (`System.out`), and displays the result in the Command Prompt:

```text
Hello Deepak
```

---

## 📊 Summary Comparison: Source Code vs Bytecode vs Machine Code

| Feature | Source Code (`.java`) | Bytecode (`.class`) | Machine Code (Native Binary) |
|:---|:---|:---|:---|
| **Readability** | Human-readable | JVM-readable | CPU Hardware-readable |
| **Creator** | Developer (You) | Java Compiler (`javac`) | JVM Execution Engine / JIT |
| **Platform Dependency** | Platform-independent | Platform-independent (WORA) | Platform-dependent (OS/CPU specific) |
| **File Extension** | `.java` | `.class` | Native process in RAM |
| **Execution** | Cannot execute directly | Executed by JVM | Executed directly by CPU hardware |