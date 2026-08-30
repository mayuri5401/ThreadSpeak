---
id: "java-intro-compile-run-program"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Java Introduction"
title: "Compile & Run Java Program"
slug: "java-intro-compile-run-program"
summary: "Step-by-step tutorial on compiling and running Java programs using Notepad and Windows Command Prompt (CMD), understanding javac, java commands, drive switching (/d), and .class bytecode generation."
eli10: "Writing code in Notepad is writing a letter in English (MainApp.java). 'javac' is a translator turning that letter into secret bytecode (MainApp.class). 'java' is the robot engine that reads the secret bytecode and prints 'Hello Deepak' on the screen!"
mentalModel: "Notepad (MainApp.java) ➔ CMD (cd /d D:\\JavaPrograms) ➔ javac MainApp.java ➔ Generates MainApp.class ➔ java MainApp ➔ Output: Hello Deepak."
difficulty: "Beginner"
estimatedMinutes: 12
tags: ["Compile", "Run", "CMD", "javac", "java", "Notepad", "CommandPrompt", "Bytecode"]
animationType: "compile-run"
codeSnippet:
  language: "java"
  explanation: "Simple Java program to compile and run via Command Prompt."
  code: |
    // MainApp.java
    public class MainApp {
        public static void main(String[] args) {
            System.out.println("Hello Deepak");
        }
    }
---

# 💻 Compile & Run Java Program: How to Compile and Run Java Program Using CMD

To compile and run a Java program from scratch using **Notepad** and the **Command Prompt (CMD)**, follow the 4 essential steps below:

---

## 📋 Quick 4-Step Summary Table

| Step | Action | Command | Output / Result |
|:---:|:---|:---|:---|
| **Step 1** | **Verify Java Setup** | `java -version`<br>`javac -version` | Displays installed JDK & JRE versions |
| **Step 2** | **Write Java Code** | Save as `MainApp.java` in `D:\JavaPrograms` | `MainApp.java` source file created |
| **Step 3** | **Compile Program** | `cd /d D:\JavaPrograms`<br>`javac MainApp.java` | Generates `MainApp.class` bytecode file |
| **Step 4** | **Run with JVM** | `java MainApp` | `Hello Deepak` printed to console |

---

## 🛠️ Step-by-Step Detailed Guide

---

### 🔹 Step 1: Set Up Java (If Not Already Done)

Before compiling, ensure that the **Java Development Kit (JDK)** is installed and configured in your system environment variables.

1. **Install JDK**: If not installed, download and install JDK from Oracle or OpenJDK.
2. **Verify Installation**:
   - Open a **Command Prompt (CMD)** window.
   - Type the following verification commands:

```cmd
C:\Users\Username> java -version
java version "21.0.2" 2024-01-16 LTS
Java(TM) SE Runtime Environment (build 21.0.2+13-LTS-58)
Java HotSpot(TM) 64-Bit Server VM (build 21.0.2+13-LTS-58, mixed mode, sharing)

C:\Users\Username> javac -version
javac 21.0.2
```

> [!NOTE]
> If both commands display version numbers, Java and the Java Compiler are set up correctly on your computer. If you see `'javac' is not recognized as an internal or external command`, check your system **PATH environment variable**.

---

### 🔹 Step 2: Write the Java Program in Notepad

1. Open **Notepad** (or any plain text editor).
2. Type the following Java program code:

```java
// File Name: MainApp.java
public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello Deepak");
    }
}
```

3. **Save the File**:
   - Click **File ➔ Save As...**
   - **File Name**: `MainApp.java` *(Make sure to enclose in quotes or select "All Files (*.*)" so Notepad doesn't save it as `MainApp.java.txt`)*.
   - **Location**: Save it in a dedicated folder, e.g., `D:\JavaPrograms`.

---

### 🔹 Step 3: Compile the Java Program

1. Open a **Command Prompt (CMD)**.
2. **Navigate to the Directory** where your `.java` file is saved:

```cmd
C:\Users\Username> cd /d D:\JavaPrograms
D:\JavaPrograms>
```

> [!TIP]
> **What does `cd /d` mean?**
> - `cd` stands for **Change Directory**.
> - The `/d` switch tells Windows Command Prompt to **change both the drive and directory** simultaneously (e.g. from `C:` drive to `D:` drive).

3. **Compile the Program using `javac`**:

```cmd
D:\JavaPrograms> javac MainApp.java
```

- **If there are NO errors**: `javac` will compile silently and generate a `MainApp.class` (bytecode file) in the same `D:\JavaPrograms` directory.
- **If there is an error in the code**: The compiler will display the line number and specific syntax error details on the console.

---

### 🔹 Step 4: Run the Java Program

Run the compiled `.class` bytecode file using the `java` runtime launcher command:

```cmd
D:\JavaPrograms> java MainApp
Hello Deepak
```

> [!IMPORTANT]
> **Crucial Rule**:
> - When compiling with `javac`, you **MUST** include the `.java` extension: `javac MainApp.java`.
> - When running with `java`, you **MUST NOT** include the `.class` extension: `java MainApp` *(Writing `java MainApp.class` will result in a `ClassNotFoundException`)*.

---

## 🔍 Visual Directory Lifecycle

```text
D:\JavaPrograms/
│
├── [Step 2] MainApp.java  (Human-readable Source Code)
│          │
│          ▼ (Command: javac MainApp.java)
│
├── [Step 3] MainApp.class (JVM-readable Bytecode)
│          │
│          ▼ (Command: java MainApp)
│
└── [Step 4] Console Output: Hello Deepak
```

---

## ⚠️ Common Beginner CMD Errors & Fixes

| Error Message in CMD | Cause | Solution |
|:---|:---|:---|
| `'javac' is not recognized as an internal or external command` | JDK `bin` directory is not added to system `PATH` | Add `C:\Program Files\Java\jdk-21\bin` to the `PATH` environment variable. |
| `error: Class names, 'MainApp', are only accepted if annotation processing is explicitly requested` | Missing `.java` extension during compilation | Always write `javac MainApp.java`, not `javac MainApp`. |
| `Error: Could not find or load main class MainApp.class` | Included `.class` extension during runtime execution | Run using `java MainApp` (omit the `.class` extension). |
| `Error: Main method not found in class MainApp` | Missing `public static void main(String[] args)` | Ensure the main method signature matches standard syntax exactly. |
| `cannot find file: MainApp.java` | CMD is in the wrong directory | Use `cd /d D:\JavaPrograms` to navigate to the exact folder containing the file. |