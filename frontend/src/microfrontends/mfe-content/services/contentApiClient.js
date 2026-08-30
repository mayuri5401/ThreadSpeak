// =============================================================================
// MFE-Content API Client
// Connected to Backend Content Service (:8081 via Gateway /api)
// =============================================================================

import { gatewayFetch } from '../../../shared/api/gatewayClient';
import curriculumIndex from '../../../shared/api/curriculumIndex.json';

const topicsCache = new Map();
const topicDetailCache = new Map();
let tracksCache = null;

export async function fetchTracks() {
  if (tracksCache) return tracksCache;
  try {
    const data = await gatewayFetch('/tracks');
    tracksCache = data;
    return data;
  } catch (err) {
    console.warn('[MFE-Content] Fallback tracks used:', err.message);
    return getLocalTracksFallback();
  }
}

export async function fetchTopics(trackId = null, query = null) {
  const cacheKey = `${trackId || 'all'}_${query || ''}`;
  if (!query && topicsCache.has(cacheKey)) {
    return topicsCache.get(cacheKey);
  }
  try {
    const params = new URLSearchParams();
    if (trackId) params.append('trackId', trackId);
    if (query) params.append('q', query);
    const data = await gatewayFetch(`/topics?${params.toString()}`);
    if (!query) {
      topicsCache.set(cacheKey, data);
      (data || []).forEach(t => {
        if (t && t.id) topicDetailCache.set(t.id, t);
      });
    }
    return data;
  } catch (err) {
    console.warn('[MFE-Content] Fallback topics used:', err.message);
    return getLocalTopicsFallback(trackId, query);
  }
}

// Parse YAML frontmatter + body from a raw markdown string
function parseMarkdownFile(raw, id) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!fmMatch) return { id, deepDive: raw };

  const frontmatter = fmMatch[1];
  const body = fmMatch[2].trim();

  const get = (key) => {
    const m = frontmatter.match(new RegExp(`^${key}:\\s*"?([^"\\n]+)"?`, 'm'));
    return m ? m[1].trim() : undefined;
  };

  const tagsMatch = frontmatter.match(/^tags:\s*\[([^\]]+)\]/m);
  const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) : [];

  return {
    id: get('id') || id,
    trackId: get('trackId'),
    trackTitle: get('trackTitle'),
    category: get('category'),
    title: get('title'),
    slug: get('slug'),
    level: get('difficulty') || get('level'),
    difficulty: get('difficulty'),
    estimatedMinutes: parseInt(get('estimatedMinutes')) || 10,
    readTime: `${get('estimatedMinutes') || 10} min`,
    summary: get('summary'),
    eli10: get('eli10'),
    mentalModel: get('mentalModel'),
    animationType: get('animationType'),
    tags,
    // Use the markdown body as deepDive (the rich notes content)
    deepDive: body || get('deepDive'),
  };
}

export async function fetchTopicById(id) {
  if (topicDetailCache.has(id)) {
    const cached = topicDetailCache.get(id);
    if (cached && (cached.deepDive || cached.eli10)) {
      return cached;
    }
  }
  try {
    const data = await gatewayFetch(`/topics/${id}`);
    topicDetailCache.set(id, data);
    return data;
  } catch (err) {
    console.warn('[MFE-Content] API unavailable, trying local fallback:', err.message);
  }

  // Tier 2: Local hardcoded fallback (has full deepDive for some topics)
  const all = getLocalTopicsFallback();
  const localTopic = all.find(t => t.id === id);
  if (localTopic && localTopic.deepDive && localTopic.deepDive.length > 100) {
    topicDetailCache.set(id, localTopic);
    return localTopic;
  }

  // Tier 3: Fetch static markdown file from curriculum/ (served by Vercel or GitHub Pages)
  const filePath = curriculumIndex[id];
  if (filePath) {
    try {
      const base = import.meta.env.BASE_URL || '/';
      const cleanPath = filePath.replace(/^\//, '');
      const finalUrl = base.endsWith('/') ? `${base}${cleanPath}` : `${base}/${cleanPath}`;
      const res = await fetch(finalUrl);
      if (res.ok) {
        const raw = await res.text();
        const parsed = parseMarkdownFile(raw, id);
        // Merge with any local metadata we have
        const merged = { ...(localTopic || {}), ...parsed };
        topicDetailCache.set(id, merged);
        console.info(`[MFE-Content] Loaded static markdown for: ${id}`);
        return merged;
      }
    } catch (staticErr) {
      console.warn('[MFE-Content] Static markdown fetch failed:', staticErr.message);
    }
  }

  // Final fallback: return whatever metadata we have
  return localTopic || null;
}

function getLocalTracksFallback() {
  return [
    {
      id: "system-design",
      title: "System Design (LLD & HLD)",
      shortTitle: "System Design",
      description: "Complete architecture blueprint: SOLID, Gang of Four, Machine Coding (LRU, Rate Limiter), and High-Level Distributed Scalability.",
      icon: "Layers",
      color: "from-indigo-500 to-purple-600",
      badge: "Architecture",
      totalTopics: 12
    },
    {
      id: "core-java",
      title: "Core & Advanced Java",
      shortTitle: "Core Java",
      description: "Master OOPs, JVM internals, Memory Model, Concurrency, and Modern Java 8-21.",
      icon: "Coffee",
      color: "from-amber-500 to-orange-600",
      badge: "Foundation",
      totalTopics: 25,
      categories: [
        "Java Introduction",
        "Programming Language Terminologies",
        "Control Statements",
        "OOP's Concepts",
        "Exception Handling",
        "Reflection API",
        "Arrays",
        "Strings",
        "Java Input/Output",
        "Serialization",
        "Multithreading",
        "Synchronization",
        "Collections Framework",
        "Java 8 Features",
        "Other Topics",
        "Interview Questions"
      ]
    },
    {
      id: "spring-boot",
      title: "Spring Boot & Microservices",
      shortTitle: "Spring Boot",
      description: "IoC/DI, DispatcherServlet, JPA Hibernate, Spring Security 6 JWT, and Distributed Systems.",
      icon: "Leaf",
      color: "from-emerald-500 to-teal-600",
      badge: "Enterprise",
      totalTopics: 7
    },
    {
      id: "dsa",
      title: "Data Structures & Algorithms in Java",
      shortTitle: "DSA",
      description: "Ace technical coding interviews: Two Pointers, Sliding Window, Trees, Graphs, and DP.",
      icon: "Code",
      color: "from-cyan-500 to-blue-600",
      badge: "Problem Solving",
      totalTopics: 10
    }
  ];
}

function getLocalTopicsFallback(trackId = null, query = null) {
  let list = [
    {
      id: "java-intro-what-is-java",
      trackId: "core-java",
      category: "Java Introduction",
      title: "What is Java",
      level: "Beginner",
      estimatedMinutes: 10,
      readTime: "10 min",
      eli10: "Java is like a universal recipe book that can be cooked in any kitchen on Earth without rewriting the ingredients.",
      deepDive: "Java is a high-level, robust, secured, and object-oriented programming language designed for platform independence (WORA)."
    },
    {
      id: "java-intro-features-of-java",
      trackId: "core-java",
      category: "Java Introduction",
      title: "Features of Java",
      level: "Beginner",
      estimatedMinutes: 12,
      readTime: "12 min",
      eli10: "14 core buzzwords including WORA, OOP, Simple, Secure, Robust, Multithreaded, and Tiered JIT Compilation.",
      deepDive: "Deep architectural dive into Java's 14 buzzwords, memory isolation, and bytecode verification."
    },
    {
      id: "java-intro-use-of-java",
      trackId: "core-java",
      category: "Java Introduction",
      title: "Use of Java",
      level: "Beginner",
      estimatedMinutes: 10,
      readTime: "10 min",
      eli10: "Java powers banking backends, Android mobile apps, cloud microservices, and big data systems.",
      deepDive: "Comprehensive analysis of 11 industry domains where Java is the market leader."
    },
    {
      id: "java-intro-softwares-download-installation",
      trackId: "core-java",
      category: "Java Introduction",
      title: "Java Softwares Download & Installation",
      level: "Beginner",
      estimatedMinutes: 8,
      readTime: "8 min",
      eli10: "Installing JDK 21 LTS, setting JAVA_HOME, editing PATH variable, and setting up IntelliJ IDEA.",
      deepDive: "Complete installation and environment variable configuration guide across Windows, macOS, and Linux."
    },
    {
      id: "java-intro-jdk-jre-jvm",
      trackId: "core-java",
      category: "Java Introduction",
      title: "JDK, JRE & JVM",
      level: "Beginner",
      estimatedMinutes: 12,
      readTime: "12 min",
      eli10: "JDK has development tools. JRE provides libraries. JVM is the engine executing bytecode.",
      deepDive: "Architecture formula: JDK = Tools + JRE, JRE = Libraries + JVM, JVM = ClassLoader + Memory + Engine."
    },
    {
      id: "java-intro-structure-of-program",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Java Introduction",
      title: "Structure of Java Program",
      slug: "java-intro-structure-of-program",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 12,
      readTime: "12 min",
      tags: ["Structure of Java Program", "Package", "Import", "Class", "Variables", "Constructors", "Methods", "main() Method"],
      animationType: "java-structure",
      summary: "Master the standardized structure of every Java program recommended by experts: Package Declarations (Optional), Import Statements (If necessary), Class Definition Statements, and Class Members (Variables, Constructors, Methods, and the main() method).",
      eli10: "Think of building a car in a factory: 1. Package is the factory warehouse address. 2. Imports are external toolkits from suppliers. 3. Class is the Car blueprint. 4. Inside the class: Variables are car properties (model, year), Constructor is the initial assembly process, Methods are driving actions (start, accelerate), and main() is turning the ignition key to start the car.",
      mentalModel: "Java Program Anatomy: Package (Namespace) -> Imports (Dependencies) -> Class (Blueprint) -> Members [Variables (State) + Constructors (Init) + Methods (Actions) + main() (JVM Entry Point)].",
      codeSnippet: {
        language: "java",
        explanation: "Standardized Java program demonstrating Package, Imports, Class, Variables, Constructors, Methods, and the main() entry point.",
        code: `// 1. Package Declaration Statement (Optional)
// package com.example.myapp;

// 2. Import Statements (If Necessary)
import java.util.Date;

// 3. Class Definition Statements
public class Car {

    // 3.1 Variables Declaration Statements (Optional) [Class Members]
    String model = "Tata Nexon";         // Field (Instance Variable)
    int year = 2020;                     // Field (Instance Variable)

    // 3.2 Constructors Declaration Statements (Optional) [Class Members]
    public Car() {
        System.out.println("Constructor called!");
    }

    // Parameterized Constructor
    public Car(String model, int year) {
        this.model = model;
        this.year = year;
        System.out.println("Parameterized Constructor initialized: " + model + " (" + year + ")");
    }

    // 3.3 Methods Declaration Statements [Class Members]
    public void start() {
        System.out.println("Car Started");
    }

    public void displayDetails() {
        System.out.println("Model: " + model + " | Manufacturing Year: " + year);
    }

    // 3.4 Main Method [Class Members] - Program Execution Entry Point
    public static void main(String[] args) {
        System.out.println("Hello Deepak...!!");
        System.out.println("=========================================");
        System.out.println("Executing Java Program with standard structure");
        System.out.println("=========================================");

        // 1. Instantiate object using Default Constructor
        Car myCar = new Car();
        
        // 2. Invoke Class Methods
        myCar.start();
        myCar.displayDetails();

        System.out.println("-----------------------------------------");
        // 3. Instantiate object using Parameterized Constructor
        Car newCar = new Car("Tata Harrier EV", 2025);
        newCar.start();
        newCar.displayDetails();
    }
}`
      },
      deepDive: `### 📑 Standard Java Program Structure

When writing a program in any programming language, it's important to follow a basic structure recommended by experts. Typically, a Java program is made up of the following parts:

1. **Package Declaration Statement (Optional)**
2. **Import Statements (If Necessary)**
3. **Class Definition Statements**
   - **3.1 Variables Declaration Statements (Optional) [Class Members]**
   - **3.2 Constructors Declaration Statements (Optional) [Class Members]**
   - **3.3 Methods Declaration Statements [Class Members]**
   - **3.4 Main Method [Class Members]**

---

### 1. Package Declaration Statement (Optional)
The package declaration specifies the package name for the Java class. It is the first statement in a Java program (if present).
- **Purpose**: Package statement is used to group related classes and organize the code into namespaces to prevent naming conflicts.
- **Syntax**: \`package packageName;\`
- **Example**: \`package com.example.myapp;\`
- **Rule**: If present, it MUST be the very first statement in the file.

### 2. Import Statements (If Necessary)
The import statement is used to include other Java classes or packages in the program, enabling the use of pre-defined classes (e.g., \`java.util.Scanner\`).
- **Purpose**: Import statement is used to import built-in or user-defined classes for reusability.
- **Syntax**:
  - \`import packageName.ClassName;\` // Imports a specific class
  - \`import packageName.*;\` // Imports all classes in the package
- **Example**:
  - \`import java.util.Scanner;\` // Imports Scanner class
  - \`import java.util.*;\` // Imports all classes in java.util package
- **Rule**: Placed after package and before class. \`java.lang.*\` is imported automatically by default.

### 3. Class Definition Statements
The class is the fundamental building block of a Java program. Every Java program must have at least one class.
- **Syntax**:
\`\`\`java
class ClassName {
    // Class body
}
\`\`\`
- **Example**:
\`\`\`java
public class Car {
    // Class members go here
}
\`\`\`
- **Rule**: We can create any number of classes in one program. There should be at least one main class containing the \`main()\` method as the entry point.

### Class Members:

#### 3.1 Variables Declaration Statements (Optional) [Class Members]
Variables are used to store data and are declared within the class (as fields) or within methods (local variables).
- **Syntax**: \`dataType variableName = value;\`
- **Example**:
\`\`\`java
String model = "Tata Nexon";  // Field
int year = 2020;              // Field
\`\`\`

#### 3.2 Constructors Declaration Statements (Optional) [Class Members]
Constructor is a special method having same name as that of class name but MUST NOT have any return type. A constructor initializes objects of a class. If no constructor is provided, Java supplies a default constructor.
- **Syntax**:
\`\`\`java
ClassName() {
    // Constructor body
}
\`\`\`
- **Example**:
\`\`\`java
public Car() {
    System.out.println("Constructor called!");
}
\`\`\`

#### 3.3 Methods Declaration Statements [Class Members]
Methods are the set of codes which performs a particular task. We can create any number of methods in one class.
- **Syntax**:
\`\`\`java
accessModifier returnType methodName(parameters) {
    // Method body
}
\`\`\`
- **Example**:
\`\`\`java
public void start() {
    System.out.println("Car Started");
}
\`\`\`

#### 3.4 Main Method [Class Members]
The \`main()\` method is the entry point for java program from where program execution starts.
- **Standard Syntax**:
\`\`\`java
public static void main(String[] args) {
    // Code to execute
}
\`\`\`
- **Example**:
\`\`\`java
public static void main(String[] args) {
    System.out.println("Hello Deepak...!!");
}
\`\`\`
`
    },
    {
      id: "java-intro-hello-program-deep-dive",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Java Introduction",
      title: "Java Hello Program Deep Explanation",
      slug: "java-intro-hello-program-deep-dive",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      tags: ["Hello World", "public static void main", "System.out.println", "Keywords", "Syntax", "18 Elements"],
      animationType: "generic-flow",
      summary: "Deep architectural breakdown of every keyword, symbol, operator, and method in public static void main(String[] args) and System.out.println().",
      eli10: "Think of a royal decree: 1. 'public' means gates are open to all. 2. 'class' is the scroll. 3. 'MainApp' is the decree name. 4. '{' opens the decree. 5. 'public static void main' is the King's crier announcing the message without needing the King in person. 6. 'String[] args' is the bag of letters from townspeople. 7. 'System.out.println' is shouting 'Hello Deepak...!!' to the village square.",
      mentalModel: "18-Element Pipeline: [1. public] [2. class] [3. MainApp] [4. {] -> [5. public] [6. static] [7. void] [8. main]([9. String[]] [10. args]) [11. {] -> [12. System][13. .][14. out].[15. println]([16. \"Hello Deepak...!!\"][17. ;]) -> [18. }] [18. }].",
      codeSnippet: {
        language: "java",
        explanation: "Simple Java Hello Program demonstrating the 18-element breakdown.",
        code: `public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello Deepak...!!");
    }
}`
      },
      deepDive: `### ☕ Simple Java Hello Program

In this program, we have a class named \`MainApp\`, and within this class, there is a \`main\` method. The method prints \`"Hello Deepak...!!"\` to the console.

\`\`\`java
public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello Deepak...!!");
    }
}
\`\`\`

---

### 🔍 Complete 18-Element Program Breakdown:

1. **public (Keyword - Access Modifier)**:
   The "public access modifier keyword" declares that the MainApp class is accessible from anywhere in the program (other packages are also included) and JVM can invoke it from outside the class.
   Note that when a class is declared as public, it must have the same name as the file name (in this case, MainApp.java).

2. **class (Keyword)**:
   The "class keyword" is used to define a class in Java, which acts as a blueprint for creating objects.
   The class can contain:
   - **Variables**: Store data or attributes of the class.
   - **Constructors**: Initialize the object's state.
   - **Methods**: Define the behavior or actions of the class.

3. **MainApp (User-Defined Class Name)**:
   The "MainApp" is the user-defined class name which contains the overall program.
   The class must follow the Java naming conventions (CamelCase/PascalCase starting with an uppercase letter).
   The "MainApp" class acts as the entry point of the program because it contains the main method.

4. **{ (Class Opening Curly Brace)**:
   Here "{" denotes the beginning of the class definition. Every class body is enclosed in curly braces.

5. **public (Keyword - Access Modifier)**:
   The "public access modifier keyword" here makes the main method accessible to the Java Virtual Machine (JVM) so it can execute the program.

6. **static (Keyword)**:
   The "static keyword" denotes that the main method belongs to the class rather than an instance of the class.
   It means that the main method is called without creating an object of the MainApp class (\`new MainApp()\`).

7. **void (Keyword - Return Type)**:
   The "void return-type keyword" indicates that the main method does not return any value.
   Since the program's execution does not require any return value from the main method, it is declared void.

8. **main (Pre-Defined Method)**:
   The "main pre-defined method" is an entry point of the program from where execution begins.
   The JVM looks for this specific method (main() method) to start the program. If there is no main() method then JVM will not start the program execution.

9. **String[] (Parameter Type - Array of Strings)**:
   The "String[] parameter type" is used for Command-line Arguments. It holds the arguments passed to the program when it is executed via the command line.
   For example: If we run \`java MainApp Hello Deepak\`, the array will contain:
   - \`String[0] = "Hello"\`
   - \`String[1] = "Deepak"\`

10. **args (Parameter Name - Argument Variable)**:
    The "args" is the user-defined variable name for the String[] parameter.
    "args" is the short name for arguments, but can be renamed to any valid identifier (e.g., data or parameters).
    It is used to hold the command-line arguments passed to the program.

11. **{ (Method Opening Curly Brace)**:
    Here "{" denotes the beginning of the main method body.

12. **System (Pre-Defined Class Name)**:
    "System" is the built-in Java class from \`java.lang\` package.
    It provides access to system-level functionality, such as input/output streams, properties, and environment variables.
    It contains:
    - \`in\`: Standard input stream (e.g., keyboard input).
    - \`out\`: Standard output stream (e.g., console output).
    - \`err\`: Standard error stream (e.g., error messages).

13. **. (Member Access Operator)**:
    "." is the member access operator which is used to access fields, methods and nested classes of a class or an object.
    For example: \`System.out\` accesses the \`out\` field of the \`System\` class.

14. **out (Pre-Defined Object)**:
    "out" is the static member (field or property) of "System" class that represents the standard output stream (usually the console).
    It is used to print data like strings, numbers or objects to the console.

15. **println (Pre-Defined Method)**:
    "println" is the pre-defined method of "PrintStream" class (referenced by \`System.out\`).
    It prints the given text or data to the console and moves the cursor to a new line.

16. **"Hello Deepak" (String Literal)**:
    "Hello Deepak" is the sequence of characters enclosed in double quotes.
    The text Hello Deepak is passed as an argument to the \`println\` method and will be displayed in the console.

17. **; [Semicolon] (Statement Terminator)**:
    ";" marks the end of a statement in Java. Every executable statement must be terminated with a semicolon.

18. **} (Method Closing Curly Brace)**:
    Here "}" marks the end of the main method body.

19. **} (Class Closing Curly Brace)**:
    Here "}" marks the end of the class definition.
`
    },
    {
      id: "java-intro-compile-run-program",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Java Introduction",
      title: "Compile & Run Java Program",
      slug: "java-intro-compile-run-program",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 12,
      readTime: "12 min",
      tags: ["Compile", "Run", "CMD", "javac", "java", "Notepad", "CommandPrompt", "Bytecode"],
      animationType: "compile-run",
      summary: "Step-by-step tutorial on compiling and running Java programs using Notepad and Windows Command Prompt (CMD), understanding javac, java commands, drive switching (/d), and .class bytecode generation.",
      eli10: "Writing code in Notepad is writing a letter in English (MainApp.java). 'javac' is a translator turning that letter into secret bytecode (MainApp.class). 'java' is the robot engine that reads the secret bytecode and prints 'Hello Deepak' on the screen!",
      mentalModel: "Notepad (MainApp.java) ➔ CMD (cd /d D:\\JavaPrograms) ➔ javac MainApp.java ➔ Generates MainApp.class ➔ java MainApp ➔ Output: Hello Deepak.",
      codeSnippet: {
        language: "java",
        explanation: "Simple Java program to compile and run via Command Prompt.",
        code: `public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello Deepak");
    }
}`
      },
      deepDive: `### 💻 How to Compile and Run Java Program Using CMD ?

To compile and run a Java program using **Notepad** and **Command Prompt (CMD)**, follow these 4 steps:

---

### Step 1: Set Up Java (If Not Already Done)
- **Install JDK**: Install the Java Development Kit (JDK) on your computer.
- **Verify the installation**:
  - Open a Command Prompt.
  - Type \`java -version\` and \`javac -version\`.
  - If both commands display version information, Java is set up correctly in your environment.

\`\`\`cmd
C:\\Users\\User> java -version
java version "21.0.2" 2024-01-16 LTS

C:\\Users\\User> javac -version
javac 21.0.2
\`\`\`

---

### Step 2: Write the Java Program
1. Open **Notepad**.
2. Write the Java program code as below:

\`\`\`java
// File Name: MainApp.java
public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello Deepak");
    }
}
\`\`\`

3. Save the file with a \`.java\` extension:
   - **File Name**: \`MainApp.java\`
   - **Location**: Save it in a directory, e.g., \`D:\\JavaPrograms\`

---

### Step 3: Compile the Java Program
1. Open a **Command Prompt**.
2. Navigate to the directory where we have saved the \`.java\` file:

\`\`\`cmd
cd /d D:\\JavaPrograms
\`\`\`

> **Note**: \`cd\` means *Change Directory*. The \`/d\` switch changes the drive while navigating to the directory (e.g. from C: to D:).

3. Compile the program using \`javac\`:

\`\`\`cmd
javac MainApp.java
\`\`\`

- If there is no error in the code, then it will generate a \`MainApp.class\` bytecode file in the same location where the \`.java\` file is present.
- If there is an error in the code, then the compiler will display the error details and line numbers on the console.

---

### Step 4: Run the Java Program
Run the compiled program using the \`java\` command:

\`\`\`cmd
java MainApp
\`\`\`

**Output:**
\`\`\`text
Hello Deepak
\`\`\`

---

### ⚠️ Common Mistakes:
- **Mistake 1**: Running \`java MainApp.class\` instead of \`java MainApp\` ➔ Results in \`ClassNotFoundException\`.
- **Mistake 2**: Missing \`.java\` when compiling (\`javac MainApp\`) ➔ Results in compilation error.
`
    },
    {
      id: "java-intro-how-java-works",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Java Introduction",
      title: "How Java Works",
      slug: "java-intro-how-java-works",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 12,
      readTime: "12 min",
      tags: ["How Java Works", "javac", "Bytecode", "JVM", "WORA", "Execution Flow"],
      animationType: "generic-flow",
      summary: "Deep step-by-step visual explanation of how Java works: writing source code, compilation with javac, bytecode (.class file), JVM execution, and screen output.",
      eli10: "Think of an international recipe: Step 1: You write a recipe in English (MainApp.java). Step 2: A translator converts it into a universal culinary blueprint (javac). Step 3: The blueprint packet is sealed (.class bytecode). Step 4: A master chef reads the blueprint in any kitchen worldwide and cooks the dish (JVM). Step 5: The delicious meal is served (Output: Hello Deepak)!",
      mentalModel: "Step 1: Write (MainApp.java) ➔ Step 2: Compile (javac) ➔ Step 3: Bytecode (.class) ➔ Step 4: Execute (JVM) ➔ Step 5: Output (Hello Deepak).",
      codeSnippet: {
        language: "java",
        explanation: "Canonical source code demonstrating the 5-step pipeline execution.",
        code: `public class MainApp {
    public static void main(String[] args) {
        System.out.println("Hello Deepak");
    }
}`
      },
      deepDive: `### 🚀 Deep Explanation of How Java Works Step by Step

Below diagram visually explains the steps involved when writing, compiling, and executing a Java program using Notepad and CMD:

\`\`\`text
┌─────────────────┐       Step 2        ┌─────────────────┐       Step 4        ┌─────────────────┐
│     Step 1      │    Compilation      │     Step 3      │     Execution       │     Step 5      │
│  Java Program   │ ──────────────────> │   .class file   │ ──────────────────> │     Output      │
│ (MainApp.java)  │   Java Compiler     │   (Byte Code)   │        JVM          │ (Hello Deepak)  │
│ [Notepad / IDE] │      (javac)        │  [Intermediate] │  [Virtual Machine]  │  [CMD Screen]   │
└─────────────────┘                     └─────────────────┘                     └─────────────────┘
\`\`\`

---

### Step 1: Writing the Java Program
- We write our Java program in a plain text editor like **Notepad**.
- The program is saved with a \`.java\` extension, e.g., \`MainApp.java\`.

\`\`\`java
// File Name: MainApp.java
public class MainApp
{
    public static void main(String[] args)
    {
        System.out.println("Hello Deepak");
    }
}
\`\`\`

- The \`.java\` file contains our Java source code, including a class with a \`main\` method (the entry point of the program).

---

### Step 2: Compilation
In the compilation phase, we open CMD, navigate to the directory where our \`.java\` file is located, and run the \`javac\` command:

\`\`\`cmd
cd /d D:\\JavaPrograms
javac MainApp.java
\`\`\`

**What happens in compilation phase:**
1. The Java Compiler (\`javac\`) reads the \`MainApp.java\` file.
2. It checks the code for syntax errors.
3. If there are no errors, it compiles the code into **bytecode**, a platform-independent intermediate representation.
4. The bytecode is saved in a \`.class\` file (e.g., \`MainApp.class\`).

---

### Step 3: Bytecode (.class file)
- The \`.class\` file contains the compiled bytecode, which can be executed on any system with a **Java Virtual Machine (JVM)**.
- Bytecode ensures Java's **"Write Once, Run Anywhere" (WORA)** principle because it is not tied to a specific machine.

---

### Step 4: Execution
To run the program, we execute the \`java\` command in CMD:

\`\`\`cmd
java MainApp
\`\`\`

*(Do not include the \`.class\` extension in this command).*

**What happens during execution phase inside JVM:**
1. **JVM (Java Virtual Machine)**: The JVM reads the bytecode in the \`.class\` file.
2. It converts the bytecode into machine code that the operating system understands.
3. It executes the machine code line by line.
4. The \`main\` method is the entry point for execution.

---

### Step 5: Output
If the program contains a print statement, such as:
\`\`\`java
System.out.println("Hello Deepak");
\`\`\`
The JVM executes it, and the output is displayed in the Command Prompt:

\`\`\`text
Hello Deepak
\`\`\`
`
    },
    {
      id: "java-terminologies-data-types",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Programming Language Terminologies",
      title: "Data Types",
      slug: "java-terminologies-data-types",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 12,
      readTime: "12 min",
      tags: ["Data Types", "Primitive", "Non-Primitive", "Variables", "Literals", "Memory Allocation"],
      animationType: "data-types",
      summary: "Introduction to Java Data Types: Purpose, memory allocation, Primitive (8 types) vs Non-Primitive (String, Arrays, Classes, Interfaces), and anatomy of variable declarations.",
      eli10: "In Java, every value needs a badge telling the computer what it is. 101 wears an 'int' badge (4-byte box), 'Deepak' wears a 'String' badge, and 91.4 wears a 'double' badge. Data types make sure computer memory is used accurately and efficiently!",
      mentalModel: "int rollno = 101; ➔ [int = Data Type (4 Bytes)] [rollno = Variable Identifier] [101 = Literal Value].",
      codeSnippet: {
        language: "java",
        explanation: "Demonstrating Primitive and Non-Primitive data types in Java.",
        code: `public class DataTypesDemo {
    public static void main(String[] args) {
        int rollno = 101;
        float marks = 91.4f;
        char grade = 'A';
        boolean isPassed = true;
        String name = "Deepak";

        System.out.println("Roll No: " + rollno);
        System.out.println("Name: " + name);
        System.out.println("Marks: " + marks + "% (Grade: " + grade + ")");
        System.out.println("Passed: " + isPassed);
    }
}`
      },
      deepDive: `### 📦 Data Types in Java

### 📖 What are Data Types ?
In Java, a data type specifies the type of value a variable can hold.
It tells the compiler how much memory to allocate and what kind of data to expect.

\`\`\`java
int rollno = 101;           // 'int' is a data type for integers
String name = "deepak";     // 'String' is a non-primitive data type for text
int[] marks = {85, 90, 78}; // 'int[]' is an array to store multiple integers
\`\`\`

---

### 🎯 Purpose of Data Types
1. **Informs Compiler**: Tells the compiler the kind of data to store in a variable (\`int rollno = 101;\` tells compiler to store an integer).
2. **Allocates Memory**: Ensures memory efficiency (\`int rollno\` allocates 4 bytes of memory, \`float marks\` allocates 4 bytes).

---

### 🏷️ Data Types & Variables
\`\`\`java
int rollno = 101;
// "int" is "data type"
// "rollno" is "variable"
// "101" is "literal" or "data" (value assigned to the variable)
\`\`\`

---

### ☀️ Types of Data Types (2 Types)

1. **Primitive Data Types**:
   - Built directly into the Java language (Pre-defined).
   - Total **8 primitive data types**: \`boolean\`, \`char\`, \`byte\`, \`short\`, \`int\`, \`long\`, \`float\`, \`double\`.
   - Fixed memory sizes (\`char\` = 2 bytes, \`int\` = 4 bytes, \`double\` = 8 bytes).

2. **Non-Primitive Data Types**:
   - **a) User-Defined / Derived**: Created by programmers using classes or interfaces. They store references to objects or collections of data.
     - *Example*: \`String name = "Deepak";\` allocates **12 bytes** (6 characters × 2 bytes).
     - Provide immense flexibility, store references to heap memory, and offer rich methods (\`name.length()\`).
   - **b) Categories**:
     - *Classes*: User-defined blueprints (\`String\`, \`Scanner\`, \`Student\`).
     - *Interfaces*: Abstract specifications (\`List\`, \`Runnable\`).
     - *Arrays*: Containers holding multiple elements of the same type (\`int[]\`, \`String[]\`).
     - *Collections*: Part of Java Collections Framework (\`ArrayList\`, \`HashMap\`, \`HashSet\`).
     - *Enums*: Fixed sets of constants (\`enum Day { MONDAY, TUESDAY }\`).
   - **c) Variable Memory Sizes**: Memory usage is dynamic and depends on data stored.
     - Dynamic growth: \`ArrayList\` grows as elements are added.
     - Managed automatically via **Garbage Collection** when references become null.

---

### 📊 Master Comparison: Primitive vs Non-Primitive Data Types

| Property | Primitive Data Types | Non-Primitive Data Types |
|:---|:---|:---|
| **Definition** | Pre-defined by Java, representing simple, fixed-size data values. | User-defined or pre-defined types representing complex structures. |
| **Origin** | Built into the Java language by compiler. | Defined by programmer or standard libraries. |
| **Examples** | 8 types: \`boolean\`, \`char\`, \`byte\`, \`short\`, \`int\`, \`long\`, \`float\`, \`double\`. | \`String\`, \`Array\`, \`Class\`, \`Interface\`, \`ArrayList\`, \`HashMap\`. |
| **Naming** | Starts with lowercase (\`int\`, \`char\`). | Starts with uppercase (\`String\`, \`Scanner\`). |
| **Data Size** | **Fixed size** regardless of platform. | **Size depends** on object fields and data length. |
| **Default Value** | \`0\`, \`'\\u0000'\`, \`false\`. | **\`null\`**. |
| **Nullability** | **Cannot be null**. | **Can be null**. |
| **Data Representation** | Represents only one single value. | Can represent multiple values and complex state. |
| **Performance** | **Faster** (Direct stack access, zero reference overhead). | **Slower** (Reference handling and heap dereferencing). |
| **Memory Location** | **Stack memory**. | Reference on Stack, Object in **Heap memory**. |
| **Value Storage** | Stores actual value directly. | Stores a reference pointer to the object. |
| **Mutability** | Immutable by default (value replaced). | Mutable or immutable (\`String\` is immutable, \`ArrayList\` is mutable). |
| **When Copied** | **Value Copy** (Values are duplicated). | **Reference Copy** (Both point to same Heap object). |
| **Memory Efficiency** | **More memory-efficient**. | Less memory-efficient (Object header overhead). |
| **Garbage Collection** | Not subject to GC (Popped with stack). | **Subject to Garbage Collection**. |
| **Methods** | Cannot invoke methods directly. | Can invoke methods (\`name.length()\`, \`list.add()\`). |
| **Use Case** | Simple, small data storage. | Complex data structures, entities, collections. |
`
    },
    {
      id: "java-terminologies-variables",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Programming Language Terminologies",
      title: "Variables",
      slug: "java-terminologies-variables",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      tags: ["Variables", "Local Variables", "Instance Variables", "Static Variables", "Memory Allocation", "Scopes"],
      animationType: "variables",
      summary: "Understand Java Variables: Definition, real-world bus analogy, RAM memory allocation (4 bytes for int), 3 variable types (Local, Instance, Static), execution scope rules, and comprehensive comparison table.",
      eli10: "Think of a bus: The bus is the memory location in RAM, the passenger sitting inside is the data (value 101), and the bus number plate (AA 123) is the variable name pointing to it!",
      mentalModel: "Local Variables (Thread Stack) vs Instance Variables (Heap Object Fields) vs Static Variables (Class Area/Metaspace).",
      codeSnippet: {
        language: "java",
        explanation: "Deep demonstration of Local, Instance, and Static variables with method execution.",
        code: `public class MainApp {
    int no = 100;           // Instance Variable (Heap)
    static int sno = 200;   // Static Variable (Metaspace)

    void m1() {
        int no1 = 10;       // Local Variable (Stack)
        System.out.println("Result 1 : " + (no1 + no));
        System.out.println("Result 2 : " + (no1 + no + sno));
    }

    void m2() {
        int no2 = 20;       // Local Variable (Stack)
        System.out.println("Result 4 : " + (no2 + no));
        System.out.println("Result 5 : " + (no2 + no + sno));
    }

    static void m3() {
        int no3 = 30;       // Local Variable (Stack)
        System.out.println("Result 8 : " + (no3 + sno));
    }

    public static void main(String[] args) {
        MainApp obj = new MainApp();
        obj.m1();
        obj.m2();

        MainApp.m3();  // Static method called directly by class name
    }
}`
      },
      deepDive: `### 📦 Variables in Java

### 📖 Introduction
A **variable** is the name of a memory location that can store data.
In simple words, **variables are the containers used to store data values**.

---

### 🚌 Real-World Analogy: The Bus Analogy
- **Memory Location (RAM)** ➔ The **Bus** (the reserved space in memory).
- **Data (Value)** ➔ The **Passenger** (e.g. \`101\`).
- **Variable Name** ➔ The **Number Plate (AA 123)** (points to that memory location, e.g. \`rollno\`).

---

### 💻 Java Example & RAM Memory Allocation
\`\`\`java
int rollno = 101;
\`\`\`
- \`101\` is stored in memory.
- \`rollno\` points to that memory.
- \`int\` allocates **4 bytes** of memory.

**Every variable has:**
1. **Data Type**: Type of data it stores (\`int\`, \`char\`, \`float\`, \`double\`).
2. **Variable Name**: Unique identifier pointing to the memory location.
3. **Value**: The data assigned to the variable.

---

### 📌 More Points about Variables
- **Statically Typed**: Java requires declaring the data type before using a variable.
- **Value Can Change (Vary)**:
  \`\`\`java
  int no = 10;
  System.out.println("no : " + no);     // output is no : 10

  no = no + 20;
  System.out.println("no : " + no);     // output is no : 30
  \`\`\`

---

### 🔍 Types of Variables (3 Types)

1. **Local Variables**:
   - Defined inside a block, method, or constructor.
   - Created on method call and destroyed on method exit.
   - Scope limited to that method/block.
   - **Must be initialized before use**.

2. **Instance Variables**:
   - Defined inside a class but outside methods.
   - Created when object is instantiated (\`new\`) and destroyed upon Garbage Collection.
   - Each object has its own separate copy.
   - Assigned default values automatically (\`0\` for \`int\`, \`null\` for objects).

3. **Static Variables**:
   - Defined with the **\`static\`** keyword.
   - Single copy shared among all objects of the class.
   - Created on class load, destroyed on class unload.
   - Accessible using class name (\`MainApp.sno\`).

---

### 💻 Program for Local, Instance & Static Variables
\`\`\`java
public class MainApp {
    int no = 100;   // instance variable
    static int sno = 200;   // static variable

    void m1() {
        int no1 = 10;   // local variable
        System.out.println("Result 1 : " + (no1 + no));
        System.out.println("Result 2 : " + (no1 + no + sno));
        // System.out.println("Result 3 : " + (no1 + no2)); // Error: no2 belongs to m2()
    }

    void m2() {
        int no2 = 20;   // local variable
        System.out.println("Result 4 : " + (no2 + no));
        System.out.println("Result 5 : " + (no2 + no + sno));
        // System.out.println("Result 6 : " + (no2 + no1)); // Error: no1 belongs to m1()
    }

    static void m3() {
        int no3 = 30;   // local variable
        // System.out.println("Result 7 : " + (no3 + no)); // Error: cannot access instance 'no' in static context
        System.out.println("Result 8 : " + (no3 + sno));
    }

    public static void main(String[] args) {
        MainApp obj = new MainApp();
        obj.m1();
        obj.m2();
        MainApp.m3();
    }
}
\`\`\`

**Output:**
\`\`\`text
Result 1 : 110
Result 2 : 310
Result 4 : 120
Result 5 : 320
Result 8 : 230
\`\`\`

---

### 📊 Local vs Instance vs Static Variables Comparison

| Property | Local Variables | Instance Variables | Static Variables |
|:---|:---|:---|:---|
| **Declaration** | Inside methods, constructors, or blocks. | Inside class outside methods. | Inside class with \`static\` keyword. |
| **Scope** | Within declared method/block only. | Within class objects (non-static methods). | Across all instances using Class Name. |
| **Memory Allocation** | Allocated on method call, deallocated on exit. | Allocated on object creation (\`new\`), deallocated on GC. | Allocated at class loading, persists in memory. |
| **Memory Area** | **Stack memory area**. | **Heap memory area**. | **Method / Metaspace area**. |
| **Default Values** | **Must be initialized before use**. | Assigned default values (\`0\`, \`null\`, \`false\`). | Assigned default values (\`0\`, \`null\`, \`false\`). |
| **Access Modifiers** | Cannot use access modifiers. | Can use \`public\`, \`private\`, \`protected\`. | Can use \`public\`, \`private\`, \`protected\`. |
`
    },
    {
      id: "java-terminologies-literals",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Programming Language Terminologies",
      title: "Literals",
      slug: "java-terminologies-literals",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      tags: ["Literals", "Integer Literals", "Floating-Point Literals", "Character Literals", "String Literals", "Boolean Literals", "Null Literal", "Number Systems"],
      animationType: "literals",
      summary: "Comprehensive guide to Java Literals: Integer (Decimal, Binary 0b, Octal 0, Hex 0x), Floating-Point (Float f, Double, Scientific Notation e), Character & Escape Sequences, String, Boolean, Null, and Java 7 Underscores in numbers.",
      eli10: "A literal is raw data written directly into your code! 101, 3.14f, 'A', 'Hello', true, and null are all literals that give variables their starting values.",
      mentalModel: "Literals are the constant source values that feed variable memory containers.",
      codeSnippet: {
        language: "java",
        explanation: "Demonstrating Integer, Floating-Point, Character, String, and Boolean literals.",
        code: `public class LiteralsDemo {
    public static void main(String[] args) {
        int decimal = 42;
        int binary = 0b1010;        // 10 in decimal
        int octal = 010;            // 8 in decimal
        int hex = 0x1F;             // 31 in decimal
        long bigNum = 123456789L;
        int million = 1_000_000;    // Java 7+ Underscores

        float pi = 3.14F;
        double e = 2.718;
        double sci = 1.23e4;        // 12300.0

        char grade = 'A';
        String greeting = "Hello, World!";
        boolean isJavaFun = true;
        String emptyRef = null;

        System.out.println("Decimal: " + decimal + " | Binary: " + binary + " | Hex: " + hex);
        System.out.println("Sum of all integer bases: " + (decimal + binary + octal + hex)); // 91
        System.out.println("Float: " + pi + " | Scientific: " + sci);
    }
}`
      },
      deepDive: `### 💎 Literals in Java

### 📖 Introduction
**Literals are constants used in Java programs to represent fixed values.**  
They represent fixed values such as numeric values, characters, strings, and booleans that are directly assigned to variables in source code.

\`\`\`java
int rollno = 101;
// "int" is data type
// "rollno" is variable identifier
// "101" is the literal value
\`\`\`

---

### 🗺️ Types of Literals in Java (6 Types + Java 7 Underscores)

1. **Integer Literals**:
   - **Decimal (Base 10)**: Regular whole numbers (e.g., \`int decimal = 42;\`).
   - **Binary (Base 2)**: Starts with \`0b\` or \`0B\` (e.g., \`int binary = 0b1010;\` ➔ decimal \`10\`).
   - **Octal (Base 8)**: Starts with leading \`0\` (e.g., \`int octal = 010;\` ➔ decimal \`8\`).
   - **Hexadecimal (Base 16)**: Starts with \`0x\` or \`0X\` (e.g., \`int hex = 0x1F;\` ➔ decimal \`31\`).
   - By default type is \`int\`. Use \`L\` suffix for \`long\` (\`long big = 123456789L;\`).

2. **Floating-Point Literals**:
   - **Float**: Ends with \`F\` or \`f\` suffix (\`float pi = 3.14F;\`).
   - **Double**: Default type for decimal numbers (\`double e = 2.718;\`).
   - **Scientific Notation**: Large/small numbers (\`double largeNum = 1.23e4;\` ➔ \`12300.0\`, \`double smallNum = 4.56e-3;\` ➔ \`0.00456\`).

3. **Character Literals & Escape Sequences**:
   - Single 16-bit Unicode character enclosed in single quotes: \`char letter = 'A';\`
   - Escape sequences: \`\\n\` (Newline), \`\\t\` (Tab), \`\\'\` (Single quote), Backslash (\\\\).

4. **String Literals**:
   - Sequence of characters enclosed in double quotes (\`String greeting = "Hello, World!";\`, \`String empty = "";\`).
   - Strings are immutable objects in Java.

5. **Boolean Literals**:
   - Represents \`true\` or \`false\` for condition flow.

6. **Null Literal**:
   - Represents absence of value for object references (\`String str = null;\`).
   - Can **only** be assigned to reference types, not primitives.

7. **Underscores in Numeric Literals (Java 7+)**:
   - Improves readability: \`int million = 1_000_000;\`, \`double pi = 3.141_592_653;\`.
   - Cannot start/end with underscore or be adjacent to decimal points.
`
    },
    {
      id: "java-terminologies-operators",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Programming Language Terminologies",
      title: "Operators",
      slug: "java-terminologies-operators",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      tags: ["Operators", "Arithmetic", "Relational", "Logical", "Bitwise", "Shift", "Ternary", "Unary", "Instanceof"],
      animationType: "operators",
      summary: "Comprehensive guide to Java Operators: 9 complete categories including Arithmetic, Assignment, Relational, Logical, Ternary, Unary (pre/post increment), Bitwise, Shift (<<, >>, >>>), and Instanceof.",
      eli10: "Operators are mathematical and logical action tools in code! In '10 + 20', '+' is the operator doing the addition, and 10 and 20 are the operands.",
      mentalModel: "Operators act on Operands to compute values or test conditions.",
      codeSnippet: {
        language: "java",
        explanation: "Demonstrating all major operator categories in Java.",
        code: `public class OperatorsDemo {
    public static void main(String[] args) {
        int a = 10, b = 20;

        int sum = a + b;
        sum += 5; // 35

        boolean isGreater = (b > a) && (a != 0); // true
        int max = (a > b) ? a : b; // 20

        int count = 5;
        int preInc = ++count; // 6

        int bitAnd = a & b;     // 0
        int leftShift = a << 1; // 20

        String name = "Deepak";
        boolean isStr = name instanceof String; // true

        System.out.println("Sum: " + sum + " | Max: " + max);
        System.out.println("Logical Condition: " + isGreater);
        System.out.println("Left Shift: " + leftShift + " | isStr: " + isStr);
    }
}`
      },
      deepDive: `### ⚡ Operators in Java

### 📖 Introduction
**Operators are special symbols used to perform operations on one or more operands.**

\`\`\`java
int no1 = 10, no2 = 20;
int res = no1 + no2;
// '+' and '=' are operators
// 'no1' and 'no2' are operands
\`\`\`

---

### 🗺️ Complete List of Operator Categories in Java (9 Categories)

1. **Arithmetic Operators**: Perform basic mathematical operations (\`+\`, \`-\`, \`*\`, \`/\`, \`%\`).
2. **Assignment Operators**: Assign & update variable values (\`=\`, \`+=\`, \`-=\`, \`*=\`, \`/=\`, \`%=\`).
3. **Relational Operators**: Compare two values, return boolean (\`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`).
4. **Logical Operators**: Combine boolean expressions (\`&&\`, \`||\`, \`!\`).
5. **Ternary Operator**: Compact shorthand for simple if-else (\`condition ? val1 : val2\`).
6. **Unary Operators**: Operate on a single operand (\`+\`, \`-\`, \`++\` pre/post, \`--\` pre/post, \`!\`).
7. **Bitwise Operators**: Operate on binary bits (\`&\`, \`|\`, \`^\`, \`~\`).
8. **Shift Operators**: Shift binary bits left or right (\`<<\` left shift, \`>>\` right shift, \`>>>\` unsigned right shift).
9. **Instanceof Operator**: Checks object class type (\`object instanceof ClassName\`).
`
    },
    {
      id: "java-terminologies-keywords",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Programming Language Terminologies",
      title: "Keywords",
      slug: "java-terminologies-keywords",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      tags: ["Keywords", "Reserved Words", "Contextual Keywords", "goto", "const", "Control Statements", "Modifiers"],
      animationType: "keywords",
      summary: "Master Java Keywords: Complete 50 keywords breakdown, 48 active + 2 unused (goto, const), 3 literal values (true, false, null), 5 contextual keywords (var, record, sealed, etc.), and category classification.",
      eli10: "Keywords are Java's protected vocabulary! Words like 'class', 'public', 'if', and 'new' belong to the compiler and cannot be used as variable or method names.",
      mentalModel: "Keywords are immutable grammar tokens reserved for compiler instructions.",
      codeSnippet: {
        language: "java",
        explanation: "Demonstrating standard Java keywords across data types, control flow, OOP, and modifiers.",
        code: `package com.example;

public class KeywordsDemo {
    private final static int MAX_COUNT = 100;

    public static void main(String[] args) {
        boolean isActive = true;

        if (isActive) {
            for (int i = 0; i < 5; i++) {
                if (i == 2) continue;
                System.out.println("Iteration: " + i);
            }
        }

        try {
            KeywordsDemo obj = new KeywordsDemo();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println("Execution finished.");
        }
    }
}`
      },
      deepDive: `### 🔑 Keywords in Java

### 📖 Introduction
**Keywords are predefined, reserved words used by the Java compiler for specific operations.**
There are total **50 keywords in Java**:
- **48 keywords** are actively used in programming.
- **2 reserved words (\`goto\` and \`const\`)** are not currently used in Java.

---

### 🗺️ Master Category Table of Java Keywords
- **Data Types (8)**: \`boolean\`, \`char\`, \`byte\`, \`short\`, \`int\`, \`long\`, \`float\`, \`double\`
- **Control Statements (10)**: \`if\`, \`else\`, \`switch\`, \`case\`, \`default\`, \`for\`, \`while\`, \`do\`, \`break\`, \`continue\`
- **Class & Interface (5)**: \`class\`, \`interface\`, \`enum\`, \`extends\`, \`implements\`
- **Object Management (4)**: \`new\`, \`this\`, \`super\`, \`null\`
- **Modifiers (6)**: \`abstract\`, \`final\`, \`static\`, \`synchronized\`, \`transient\`, \`volatile\`
- **Package Management (2)**: \`package\`, \`import\`
- **Access Modifiers (3)**: \`public\`, \`private\`, \`protected\`
- **Return Type (2)**: \`void\`, \`return\`
- **Exception Handling (6)**: \`try\`, \`catch\`, \`finally\`, \`throw\`, \`throws\`, \`assert\`
- **Others (3)**: \`native\`, \`strictfp\`, \`instanceof\`
- **Not Used (2)**: \`goto\`, \`const\`

---

### 📌 Master Architecture Breakdown:
- **Reserved Words (53)**: 50 Keywords (48 Used + 2 Unused) + 3 Literals (\`true\`, \`false\`, \`null\`).
- **Contextual Keywords (5)**: \`var\`, \`yield\`, \`record\`, \`sealed\`, \`non-sealed\`.
- Total Vocabulary: **58 Reserved & Contextual tokens**.

---

### ⚡ Characteristics of Keywords
1. **Reserved Words**: Fixed meanings for the compiler.
2. **Case-Sensitive**: All keywords are strictly lowercase (\`class\` is a keyword, \`Class\` is not).
3. **Cannot be Identifiers**: Cannot name variables or methods with keywords (\`int class = 10;\` ❌).
4. **Enhance Readability**: Provides standardized syntax for all developers.
5. **Fixed Set**: Defined by the Java Language Specification.
`
    },
    {
      id: "java-terminologies-identifiers",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Programming Language Terminologies",
      title: "Identifiers",
      slug: "java-terminologies-identifiers",
      level: "Beginner",
      estimatedMinutes: 12,
      readTime: "12 min",
      eli10: "Identifiers are the names you give to classes, methods, and variables following Java naming rules.",
      deepDive: "Rules and conventions for defining valid identifiers in Java."
    },
    // --- Control Statements ---
    {
      id: "java-control-statements-conditional",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Control Statements",
      title: "Conditional Statements",
      slug: "java-control-statements-conditional",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "if, if-else, nested if-else, if-else-if ladder, and switch-case statements.",
      deepDive: "Complete decision-making control flow in Java."
    },
    {
      id: "java-control-statements-looping",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Control Statements",
      title: "Looping Statements",
      slug: "java-control-statements-looping",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "for, while, do-while, and enhanced for-each loops in Java.",
      deepDive: "Repetitive execution control structures in Java."
    },
    {
      id: "java-control-statements-jump",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Control Statements",
      title: "Jump Statements",
      slug: "java-control-statements-jump",
      level: "Beginner",
      estimatedMinutes: 10,
      readTime: "10 min",
      eli10: "break, continue, and return statements.",
      deepDive: "Altering normal execution loop flow."
    },
    {
      id: "java-control-statements-logical-programs",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Control Statements",
      title: "Logical Programs (20)",
      slug: "java-control-statements-logical-programs",
      level: "Intermediate",
      estimatedMinutes: 30,
      readTime: "30 min",
      animationType: "logical-programs",
      eli10: "20 classic Java logical programs with step-by-step memory register trace and runnable playground.",
      deepDive: "Algorithms covering Palindrome, Armstrong, Prime, Reverse, Fibonacci, Factorial, and GCD."
    },
    {
      id: "java-control-statements-star-patterns",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Control Statements",
      title: "Star Pattern Programs (18)",
      slug: "java-control-statements-star-patterns",
      level: "Intermediate",
      estimatedMinutes: 25,
      readTime: "25 min",
      animationType: "star-patterns",
      eli10: "18 classic Java Star Pattern programs with 2D grid matrix visualizer and step-by-step cell simulator.",
      deepDive: "Triangles, Pyramids, Diamonds, Butterfly, and Hollow geometric star formations."
    },
    {
      id: "java-control-statements-number-patterns",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Control Statements",
      title: "Number Pattern Programs (8)",
      slug: "java-control-statements-number-patterns",
      level: "Intermediate",
      estimatedMinutes: 20,
      readTime: "20 min",
      animationType: "number-patterns",
      eli10: "8 classic Java Number Pattern programs including Floyd's Triangle, Palindromic Pyramid, and Column Difference Triangle.",
      deepDive: "Mathematical nested loops and coordinate counter algorithms."
    },
    // --- OOP's Concepts (17 Topics) ---
    {
      id: "java-oops-introduction",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "OOP's Introduction",
      slug: "java-oops-introduction",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "Procedural vs Object-Oriented Programming, state and behavior, and the 4 pillars overview.",
      deepDive: "Foundations of Object-Oriented Programming in Java."
    },
    {
      id: "java-classes-methods-objects",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Classes, Methods & Objects",
      slug: "java-classes-methods-objects",
      level: "Beginner",
      estimatedMinutes: 20,
      readTime: "20 min",
      eli10: "Class blueprint, Heap object instantiation with new, Stack memory references, and methods.",
      deepDive: "Deep dive into Class structure, Heap memory allocation, and method invocations."
    },
    {
      id: "java-constructors",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Constructors",
      slug: "java-constructors",
      level: "Beginner",
      estimatedMinutes: 20,
      readTime: "20 min",
      eli10: "Default vs Parameterized constructors, constructor overloading, and chaining via this().",
      deepDive: "Memory initialization lifecycle and constructor rules in Java."
    },
    {
      id: "java-relationship-between-classes",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Relationship Between Classes",
      slug: "java-relationship-between-classes",
      level: "Intermediate",
      estimatedMinutes: 20,
      readTime: "20 min",
      eli10: "IS-A (Inheritance), HAS-A (Association), and USES-A (Dependency) relationships.",
      deepDive: "Architectural coupling and class collaboration models in Java."
    },
    {
      id: "java-association-has-a-relationship",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Association (HAS-A Relationship)",
      slug: "java-association-has-a-relationship",
      level: "Intermediate",
      estimatedMinutes: 20,
      readTime: "20 min",
      eli10: "Aggregation (Weak HAS-A) vs Composition (Strong death-bound HAS-A).",
      deepDive: "Object reference aggregation and composite lifecycle management."
    },
    {
      id: "java-dependency-uses-a-relationship",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Dependency (USES-A Relationship)",
      slug: "java-dependency-uses-a-relationship",
      level: "Intermediate",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "Passing objects as method arguments, local instantiation, and loose coupling.",
      deepDive: "Method-level dependencies and dependency injection concepts."
    },
    {
      id: "java-inheritance-is-a-relationship",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Inheritance (IS-A Relationship)",
      slug: "java-inheritance-is-a-relationship",
      level: "Beginner",
      estimatedMinutes: 20,
      readTime: "20 min",
      eli10: "extends keyword, Single, Multilevel, Hierarchical inheritance, and the Diamond Problem.",
      deepDive: "Code reusability and class hierarchies in Java."
    },
    {
      id: "java-polymorphism",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Polymorphism",
      slug: "java-polymorphism",
      level: "Intermediate",
      estimatedMinutes: 20,
      readTime: "20 min",
      eli10: "Compile-Time Overloading vs Runtime Overriding via Dynamic Method Dispatch and @Override.",
      deepDive: "Virtual method invocation and dynamic dispatch mechanics."
    },
    {
      id: "java-abstraction",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Abstraction",
      slug: "java-abstraction",
      level: "Intermediate",
      estimatedMinutes: 20,
      readTime: "20 min",
      eli10: "Abstract classes, abstract keyword, partial abstraction (0-100%), and concrete methods.",
      deepDive: "Contract specifications and abstract class hierarchies."
    },
    {
      id: "java-interfaces",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Interfaces",
      slug: "java-interfaces",
      level: "Intermediate",
      estimatedMinutes: 20,
      readTime: "20 min",
      eli10: "100% pure contracts, implements keyword, multiple inheritance, default & static methods.",
      deepDive: "Interface contracts and modern Java default method mechanics."
    },
    {
      id: "java-encapsulation",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Encapsulation",
      slug: "java-encapsulation",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "Data hiding with private fields, controlled Getters/Setters, and JavaBean validation.",
      deepDive: "Encapsulation, data security, and object immutability."
    },
    {
      id: "java-packages",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Packages",
      slug: "java-packages",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "package and import keywords, reverse domain naming, and static imports.",
      deepDive: "Java package namespaces and directory mapping."
    },
    {
      id: "java-access-modifiers",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "Access Modifiers",
      slug: "java-access-modifiers",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "private, default (package-private), protected, and public visibility comparison matrix.",
      deepDive: "Access level scopes across classes, packages, and subclasses."
    },
    {
      id: "java-this-keyword",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "this Keyword",
      slug: "java-this-keyword",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "Resolving field shadowing, this() constructor chaining, and fluent method chaining.",
      deepDive: "Current instance reference mechanics in Java."
    },
    {
      id: "java-super-keyword",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "super Keyword",
      slug: "java-super-keyword",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "Accessing parent shadowed fields, calling parent methods, and super() constructor calls.",
      deepDive: "Parent class reference and constructor chaining in subclasses."
    },
    {
      id: "java-static-keyword",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "static Keyword",
      slug: "java-static-keyword",
      level: "Beginner",
      estimatedMinutes: 20,
      readTime: "20 min",
      eli10: "Static variables, Metaspace memory, static methods, and static initialization blocks.",
      deepDive: "Class-level memory allocation and static lifecycle in JVM."
    },
    {
      id: "java-final-keyword",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "OOP's Concepts",
      title: "final Keyword",
      slug: "java-final-keyword",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      eli10: "final variables (constants), final methods (prevent overriding), and final classes.",
      deepDive: "Immutability and inheritance restrictions in Java."
    },
    {
      id: "java-exception-what-is-error",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Exception Handling",
      title: "What is Error in Java",
      slug: "java-exception-what-is-error",
      level: "Beginner",
      estimatedMinutes: 12,
      readTime: "12 min",
      animationType: "exception-handling",
      eli10: "An Error is a catastrophic hardware or JVM failure like OutOfMemoryError that cannot be recovered.",
      summary: "Understand system errors, compile-time errors, and runtime JVM failures."
    },
    {
      id: "java-exception-what-is-exception",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Exception Handling",
      title: "What is Exception in Java",
      slug: "java-exception-what-is-exception",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      animationType: "what-is-exception",
      eli10: "An Exception is an abnormal event that disrupts the normal flow of instructions, but can be caught and handled.",
      summary: "Master Exception definition, flow disruption, and recovery mechanisms in Java."
    },
    {
      id: "java-exception-error-vs-exception",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Exception Handling",
      title: "Error vs Exception",
      slug: "java-exception-error-vs-exception",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      animationType: "error-vs-exception",
      eli10: "Errors are fatal system crashes (building collapse), while Exceptions are recoverable incidents (flat tire).",
      summary: "Deep architectural comparison between java.lang.Error and java.lang.Exception."
    },
    {
      id: "java-exception-checked-vs-unchecked",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Exception Handling",
      title: "Checked vs Unchecked Exceptions",
      slug: "java-exception-checked-vs-unchecked",
      level: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      animationType: "checked-vs-unchecked",
      eli10: "Checked exceptions are checked at compile time by javac; unchecked exceptions occur unexpectedly at runtime.",
      summary: "Master compile-time checked exceptions vs runtime unchecked exceptions."
    },
    {
      id: "java-exception-try-catch-block",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Exception Handling",
      title: "try-catch Block in Java",
      slug: "java-exception-try-catch-block",
      level: "Beginner",
      difficulty: "Beginner",
      estimatedMinutes: 15,
      readTime: "15 min",
      animationType: "try-catch-block",
      summary: "Master the try-catch block in Java: Syntax, runtime control flow, catching specific exceptions, printing exception details (getMessage, toString, printStackTrace), and preventing abrupt program termination.",
      eli10: "'try' is like putting a protective helmet on risky code; if an accident happens, the 'catch' block immediately catches you before you crash to the ground!",
      mentalModel: "'try' encloses dangerous statements. If an exception occurs, the JVM halts normal execution, instantiates the exception object, skips the rest of try, and jumps straight into the matching catch block.",
      deepDive: `# 🛡️ try-catch Block in Java\n\n## 📖 Introduction\n\nIn Java, **\`try\`** and **\`catch\`** are dedicated keywords used together as structured blocks for **exception handling**.\n\nThey allow developers to handle runtime exceptions gracefully and ensure the program continues its normal execution without crashing abruptly.`
    },
    {
      id: "java-exception-multiple-catch-block",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Exception Handling",
      title: "Multiple catch Block",
      slug: "java-exception-multiple-catch-block",
      level: "Intermediate",
      estimatedMinutes: 15,
      readTime: "15 min",
      animationType: "exception-handling",
      eli10: "Multiple catch blocks handle different exception types from a single try block in order.",
      summary: "Handling different types of exceptions thrown by a single try block."
    },
    {
      id: "java-exception-finally-block",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Exception Handling",
      title: "finally Block",
      slug: "java-exception-finally-block",
      level: "Intermediate",
      estimatedMinutes: 15,
      readTime: "15 min",
      animationType: "exception-handling",
      eli10: "The finally block always executes whether an exception occurs or not, ideal for closing connections.",
      summary: "Master guaranteed cleanup execution with finally block."
    },
    {
      id: "java-exception-try-with-resources",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Exception Handling",
      title: "Try-With-Resources (Java 7+)",
      slug: "java-exception-try-with-resources",
      level: "Intermediate",
      estimatedMinutes: 20,
      readTime: "20 min",
      animationType: "try-with-resources",
      eli10: "Automatic resource management for AutoCloseable objects without needing explicit finally blocks.",
      summary: "Master Java 7+ Automatic Resource Management (ARM), AutoCloseable vs Closeable, reverse closing order, and suppressed exceptions."
    },
    {
      id: "java-exception-throw-keyword",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Exception Handling",
      title: "\"throw\" Keyword",
      slug: "java-exception-throw-keyword",
      level: "Beginner",
      estimatedMinutes: 20,
      readTime: "20 min",
      animationType: "throw-keyword",
      eli10: "The throw keyword lets you explicitly create and trigger an exception object when business rules or data contracts are violated.",
      summary: "Master the 'throw' keyword in Java: Explicit exception instantiation, business rule validation, stack unwinding, and checked vs unchecked exception handling."
    },
    {
      id: "java-reflection-introduction",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Reflection API",
      title: "Introduction",
      slug: "java-reflection-introduction",
      level: "Intermediate",
      estimatedMinutes: 15,
      readTime: "15 min",
      animationType: "generic-flow",
      eli10: "Reflection gives your code an X-ray scanner at runtime to inspect and interact with any class, method, or field.",
      summary: "Introduction to Java Reflection API (java.lang.reflect): Dynamic runtime inspection, static vs dynamic binding, and enterprise framework use-cases."
    },
    {
      id: "java-reflection-class-class",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Reflection API",
      title: "The Class Class",
      slug: "java-reflection-class-class",
      level: "Intermediate",
      estimatedMinutes: 20,
      readTime: "20 min",
      animationType: "generic-flow",
      eli10: "The Class object is the runtime passport of every Java type in Metaspace.",
      summary: "Master java.lang.Class<T>: The entry point to Reflection. 3 ways to obtain Class instances (.class, getClass(), Class.forName()), and type tokens."
    },
    {
      id: "java-reflection-member-interface",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Reflection API",
      title: "The Member Interface",
      slug: "java-reflection-member-interface",
      level: "Advanced",
      estimatedMinutes: 20,
      readTime: "20 min",
      animationType: "generic-flow",
      eli10: "The Member interface is the common parent implemented by Field, Method, and Constructor.",
      summary: "Master java.lang.reflect.Member: The root reflection interface implemented by Field, Method, and Constructor."
    },
    {
      id: "java-reflection-field-class",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Reflection API",
      title: "The Field Class",
      slug: "java-reflection-field-class",
      level: "Advanced",
      estimatedMinutes: 20,
      readTime: "20 min",
      animationType: "generic-flow",
      eli10: "The Field class lets you inspect and mutate public and private object fields dynamically.",
      summary: "Master java.lang.reflect.Field: getField() vs getDeclaredField(), get()/set(), and handling static and final fields."
    },
    {
      id: "java-reflection-method-class",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Reflection API",
      title: "The Method Class",
      slug: "java-reflection-method-class",
      level: "Advanced",
      estimatedMinutes: 20,
      readTime: "20 min",
      animationType: "generic-flow",
      eli10: "The Method class lets you invoke methods dynamically by name using method.invoke().",
      summary: "Master java.lang.reflect.Method: Dynamic method inspection, method.invoke(target, args...), and InvocationTargetException."
    },
    {
      id: "java-reflection-constructor-class",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Reflection API",
      title: "The Constructor Class",
      slug: "java-reflection-constructor-class",
      level: "Advanced",
      estimatedMinutes: 20,
      readTime: "20 min",
      animationType: "generic-flow",
      eli10: "The Constructor class dynamically instantiates new object instances at runtime.",
      summary: "Master java.lang.reflect.Constructor: Constructor.newInstance(args...) vs deprecated Class.newInstance(), and private constructor instantiation."
    },
    {
      id: "java-reflection-access-control",
      trackId: "core-java",
      trackTitle: "Core & Advanced Java",
      category: "Reflection API",
      title: "Access Control",
      slug: "java-reflection-access-control",
      level: "Advanced",
      estimatedMinutes: 20,
      readTime: "20 min",
      animationType: "reflection-access-control",
      eli10: "AccessibleObject and setAccessible(true) allow bypassing private access checks safely.",
      summary: "Master Access Control in Java Reflection: AccessibleObject, setAccessible(true), trySetAccessible(), and Java 9+ JPMS Module Encapsulation."
    },
    {
      id: "lld-welcome-course-introduction",
      trackId: "system-design",
      category: "LLD - Welcome",
      title: "System Design Course Welcome & Structure",
      level: "Beginner",
      estimatedMinutes: 5,
      readTime: "5 min",
      eli10: "Master low-level object modeling and high-level distributed systems scalability.",
      deepDive: "Complete end-to-end System Design curriculum covering SOLID principles, GoF patterns, and distributed architecture."
    }
  ];

  if (trackId) {
    list = list.filter(t => t.trackId === trackId);
  }
  if (query) {
    const q = query.toLowerCase();
    list = list.filter(t => t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
  }
  return list;
}
