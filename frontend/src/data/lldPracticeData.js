// ============================================================================
// 107 Low-Level Design (LLD) Implementation & Practice Scenarios
// Complete interview and real-world low-level design dataset
// ============================================================================

export const LLD_CATEGORIES = [
  {
    "id": "oop-fundamentals",
    "title": "OOP Fundamentals",
    "icon": "Boxes",
    "color": "text-blue-400",
    "bg": "bg-blue-500/10",
    "border": "border-blue-500/20",
    "desc": "Classes & Objects, State Management, Interfaces, Encapsulation, Abstraction, Inheritance & Polymorphism."
  },
  {
    "id": "class-relationships",
    "title": "Class Relationships",
    "icon": "Network",
    "color": "text-cyan-400",
    "bg": "bg-cyan-500/10",
    "border": "border-cyan-500/20",
    "desc": "Association, Aggregation (Has-A), Composition (Whole-Part) & Dependency (Uses-A) modeling."
  },
  {
    "id": "design-principles",
    "title": "Design Principles",
    "icon": "CheckSquare",
    "color": "text-emerald-400",
    "bg": "bg-emerald-500/10",
    "border": "border-emerald-500/20",
    "desc": "DRY, KISS, YAGNI, Law of Demeter, Separation of Concerns, High Cohesion & Loose Coupling."
  },
  {
    "id": "solid-principles",
    "title": "SOLID Principles",
    "icon": "ShieldCheck",
    "color": "text-indigo-400",
    "bg": "bg-indigo-500/10",
    "border": "border-indigo-500/20",
    "desc": "Single Responsibility (SRP), Open-Closed (OCP), Liskov Substitution (LSP), Interface Segregation (ISP) & DIP."
  },
  {
    "id": "creational-patterns",
    "title": "Creational Design Patterns",
    "icon": "PlusCircle",
    "color": "text-amber-400",
    "bg": "bg-amber-500/10",
    "border": "border-amber-500/20",
    "desc": "Singleton, Builder, Factory Method, Abstract Factory & Prototype cloning patterns."
  },
  {
    "id": "structural-patterns",
    "title": "Structural Design Patterns",
    "icon": "Layers",
    "color": "text-purple-400",
    "bg": "bg-purple-500/10",
    "border": "border-purple-500/20",
    "desc": "Adapter, Decorator, Facade, Composite, Proxy, Bridge & Flyweight patterns."
  },
  {
    "id": "behavioral-patterns",
    "title": "Behavioral Design Patterns",
    "icon": "Activity",
    "color": "text-rose-400",
    "bg": "bg-rose-500/10",
    "border": "border-rose-500/20",
    "desc": "Strategy, Observer, State, Command, Template Method, Chain of Responsibility, Iterator, Mediator, Memento & Visitor."
  }
];

export const LLD_PROBLEMS = [
  {
    "id": "design-car-class",
    "number": 1,
    "title": "Design Car Class",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Easy",
    "topics": [
      "Classes and Objects"
    ],
    "narrative": "Design a Car class that remembers both its identity and its current speed as it is driven. The brand and model stay the same for the lifetime of the object, while the speed changes after every acceleration or braking operation.",
    "className": "Car",
    "constructorSig": "public Car(String brand, String model)",
    "methods": [
      {
        "sig": "public int accelerate(int amount)",
        "desc": "increases current speed by amount, stores the result, and returns the new speed."
      },
      {
        "sig": "public int brake(int amount)",
        "desc": "decreases current speed by amount, stores the result, and returns the new speed. If braking makes speed negative, set it to 0 instead."
      },
      {
        "sig": "public int getSpeed()",
        "desc": "returns the car's current speed without changing it."
      },
      {
        "sig": "public String describe()",
        "desc": "returns the latest state in the exact format \"<brand> <model> at <speed> km/h\"."
      }
    ],
    "rules": [
      "All method calls operate on the same object instance.",
      "Accelerating by 20 and then by 15 produces a speed of 35, not 15.",
      "Braking by more than the current speed brings the car to a stop at 0."
    ],
    "examples": [
      {
        "input": "car = new Car(\"Toyota\", \"Corolla\")\ncar.describe()\ncar.accelerate(20)\ncar.getSpeed()",
        "output": "[\"Toyota Corolla at 0 km/h\", 20, 20]",
        "explanation": "A new car is standing still, so it describes itself at 0 km/h. After accelerating by 20 it holds that speed and reports it."
      },
      {
        "input": "car = new Car(\"Tesla\", \"Model 3\")\ncar.accelerate(40)\ncar.accelerate(30)\ncar.brake(25)",
        "output": "[40, 70, 45]",
        "explanation": "Speeding up twice adds to what was already there, reaching 70, and braking by 25 brings it down to 45."
      }
    ],
    "constraints": [
      "1 <= brand.length, model.length <= 20",
      "0 <= amount <= 100",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private fields for `brand`, `model`, and `speed`.",
      "In the constructor, assign `this.brand = brand; this.model = model; this.speed = 0;`.",
      "In `brake(amount)`, use `this.speed = Math.max(0, this.speed - amount); return this.speed;`."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new Car(\"Toyota\", \"Corolla\")",
            "returns": "null"
          },
          {
            "call": "describe()",
            "returns": "\"Toyota Corolla at 0 km/h\""
          },
          {
            "call": "accelerate(20)",
            "returns": "20"
          },
          {
            "call": "getSpeed()",
            "returns": "20"
          }
        ],
        "input": "Car(\"Toyota\", \"Corolla\"), describe(), accelerate(20), getSpeed()",
        "expectedOutput": "[\"Toyota Corolla at 0 km/h\", 20, 20]"
      },
      {
        "name": "Case 2 (Clamping)",
        "calls": [
          {
            "call": "new Car(\"Ford\", \"Mustang\")",
            "returns": "null"
          },
          {
            "call": "accelerate(30)",
            "returns": "30"
          },
          {
            "call": "brake(50)",
            "returns": "0"
          },
          {
            "call": "getSpeed()",
            "returns": "0"
          }
        ],
        "input": "Car(\"Ford\", \"Mustang\"), accelerate(30), brake(50), getSpeed()",
        "expectedOutput": "[30, 0, 0]"
      }
    ],
    "description": "Design a Car class that remembers both its identity and its current speed as it is driven. The brand and model stay the same for the lifetime of the object, while the speed changes after every acceleration or braking operation.\n\n### Implement the `Car` class:\n\n- `Car(String brand, String model)` creates an initialized instance.\n- `int accelerate(int amount)` increases current speed by amount, stores the result, and returns the new speed.\n- `int brake(int amount)` decreases current speed by amount, stores the result, and returns the new speed. If braking makes speed negative, set it to 0 instead.\n- `int getSpeed()` returns the car's current speed without changing it.\n- `String describe()` returns the latest state in the exact format \"<brand> <model> at <speed> km/h\".\n\n- All method calls operate on the same object instance.\n- Accelerating by 20 and then by 15 produces a speed of 35, not 15.\n- Braking by more than the current speed brings the car to a stop at 0.\n\n#### Example 1:\n```\nInput:\ncar = new Car(\"Toyota\", \"Corolla\")\ncar.describe()\ncar.accelerate(20)\ncar.getSpeed()\n\nOutput:\n[\"Toyota Corolla at 0 km/h\", 20, 20]\n\nExplanation: A new car is standing still, so it describes itself at 0 km/h. After accelerating by 20 it holds that speed and reports it.\n```\n\n#### Example 2:\n```\nInput:\ncar = new Car(\"Tesla\", \"Model 3\")\ncar.accelerate(40)\ncar.accelerate(30)\ncar.brake(25)\n\nOutput:\n[40, 70, 45]\n\nExplanation: Speeding up twice adds to what was already there, reaching 70, and braking by 25 brings it down to 45.\n```\n\n\n### Constraints\n- 1 <= brand.length, model.length <= 20\n- 0 <= amount <= 100\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when brand, model and speed are private fields, constructor initializes brand/model, and speed starts at zero.\n- **Methods change the object's own state**: Full marks when accelerate and brake adjust the car's own speed field and return the new value.\n- **Structure and naming**: Full marks when braking below zero clamps to zero and describe reads current values dynamically.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when brand, model and speed are private fields, constructor initializes brand/model, and speed starts at zero.",
      "stateMutation": "Full marks when accelerate and brake adjust the car's own speed field and return the new value.",
      "structure": "Full marks when braking below zero clamps to zero and describe reads current values dynamically."
    },
    "starterCode": {
      "java": "// Implement class Car\n\nclass Car {\n    public Car(String brand, String model) {\n        \n    }\n\n    public int accelerate(int amount) {\n        \n    }\n\n    public int brake(int amount) {\n        \n    }\n\n    public int getSpeed() {\n        \n    }\n\n    public String describe() {\n        \n    }\n}\n\n/**\n * Your Car object will be instantiated and called as such:\n * Car obj = new Car();\n * Object param_1 = obj.accelerate(int amount);\n * Object param_2 = obj.brake(int amount);\n * Object param_3 = obj.getSpeed();\n * Object param_4 = obj.describe();\n */",
      "python": "class Car:\n\n    def __init__(self):\n        pass\n\n    def accelerate(self, *args, **kwargs):\n        pass\n\n    def brake(self, *args, **kwargs):\n        pass\n\n    def getSpeed(self, *args, **kwargs):\n        pass\n\n    def describe(self, *args, **kwargs):\n        pass\n\n# Your Car object will be instantiated and called as such:\n# obj = Car()\n",
      "javascript": "class Car {\n    constructor() {\n        \n    }\n\n    accelerate(...args) {\n        \n    }\n\n    brake(...args) {\n        \n    }\n\n    getSpeed(...args) {\n        \n    }\n\n    describe(...args) {\n        \n    }\n}\n\n/**\n * Your Car object will be instantiated and called as such:\n * const obj = new Car();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Car Class\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-library-book",
    "number": 2,
    "title": "Design Library Book Class",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Easy",
    "topics": [
      "Classes and Objects"
    ],
    "narrative": "Design a LibraryBook class that manages the checkout and return lifecycle of a physical book in a library system.",
    "className": "LibraryBook",
    "constructorSig": "public LibraryBook(String isbn, String title, String author)",
    "methods": [
      {
        "sig": "public boolean borrowBook(String borrower)",
        "desc": "checks out book if available; returns true if successful, false if already borrowed."
      },
      {
        "sig": "public boolean returnBook()",
        "desc": "marks book as returned; returns true if previously borrowed, false if already available."
      },
      {
        "sig": "public boolean isAvailable()",
        "desc": "returns true if book is currently on shelf."
      },
      {
        "sig": "public String getBorrower()",
        "desc": "returns name of current borrower or null if available."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new LibraryBook()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new LibraryBook()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new LibraryBook()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a LibraryBook class that manages the checkout and return lifecycle of a physical book in a library system.\n\n### Implement the `LibraryBook` class:\n\n- `LibraryBook(String isbn, String title, String author)` creates an initialized instance.\n- `boolean borrowBook(String borrower)` checks out book if available; returns true if successful, false if already borrowed.\n- `boolean returnBook()` marks book as returned; returns true if previously borrowed, false if already available.\n- `boolean isAvailable()` returns true if book is currently on shelf.\n- `String getBorrower()` returns name of current borrower or null if available.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new LibraryBook()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class LibraryBook\n\nclass LibraryBook {\n    public LibraryBook(String isbn, String title, String author) {\n        \n    }\n\n    public boolean borrowBook(String borrower) {\n        \n    }\n\n    public boolean returnBook() {\n        \n    }\n\n    public boolean isAvailable() {\n        \n    }\n\n    public String getBorrower() {\n        \n    }\n}\n\n/**\n * Your LibraryBook object will be instantiated and called as such:\n * LibraryBook obj = new LibraryBook();\n * Object param_1 = obj.borrowBook(String borrower);\n * Object param_2 = obj.returnBook();\n * Object param_3 = obj.isAvailable();\n * Object param_4 = obj.getBorrower();\n */",
      "python": "class LibraryBook:\n\n    def __init__(self):\n        pass\n\n    def borrowBook(self, *args, **kwargs):\n        pass\n\n    def returnBook(self, *args, **kwargs):\n        pass\n\n    def isAvailable(self, *args, **kwargs):\n        pass\n\n    def getBorrower(self, *args, **kwargs):\n        pass\n\n# Your LibraryBook object will be instantiated and called as such:\n# obj = LibraryBook()\n",
      "javascript": "class LibraryBook {\n    constructor() {\n        \n    }\n\n    borrowBook(...args) {\n        \n    }\n\n    returnBook(...args) {\n        \n    }\n\n    isAvailable(...args) {\n        \n    }\n\n    getBorrower(...args) {\n        \n    }\n}\n\n/**\n * Your LibraryBook object will be instantiated and called as such:\n * const obj = new LibraryBook();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Library Book Class\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-traffic-light",
    "number": 3,
    "title": "Design Traffic Light",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Easy",
    "topics": [
      "Enums",
      "State Management"
    ],
    "narrative": "Design a TrafficLight class using an enum state machine that transitions sequentially from RED to GREEN, GREEN to YELLOW, and YELLOW to RED.",
    "className": "TrafficLight",
    "constructorSig": "public TrafficLight(String initialColor)",
    "methods": [
      {
        "sig": "public String change()",
        "desc": "advances light to next color in sequence (RED -> GREEN -> YELLOW -> RED) and returns new color."
      },
      {
        "sig": "public String getColor()",
        "desc": "returns the current active color."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TrafficLight()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TrafficLight()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TrafficLight()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a TrafficLight class using an enum state machine that transitions sequentially from RED to GREEN, GREEN to YELLOW, and YELLOW to RED.\n\n### Implement the `TrafficLight` class:\n\n- `TrafficLight(String initialColor)` creates an initialized instance.\n- `String change()` advances light to next color in sequence (RED -> GREEN -> YELLOW -> RED) and returns new color.\n- `String getColor()` returns the current active color.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TrafficLight()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TrafficLight\n\nclass TrafficLight {\n    public TrafficLight(String initialColor) {\n        \n    }\n\n    public String change() {\n        \n    }\n\n    public String getColor() {\n        \n    }\n}\n\n/**\n * Your TrafficLight object will be instantiated and called as such:\n * TrafficLight obj = new TrafficLight();\n * Object param_1 = obj.change();\n * Object param_2 = obj.getColor();\n */",
      "python": "class TrafficLight:\n\n    def __init__(self):\n        pass\n\n    def change(self, *args, **kwargs):\n        pass\n\n    def getColor(self, *args, **kwargs):\n        pass\n\n# Your TrafficLight object will be instantiated and called as such:\n# obj = TrafficLight()\n",
      "javascript": "class TrafficLight {\n    constructor() {\n        \n    }\n\n    change(...args) {\n        \n    }\n\n    getColor(...args) {\n        \n    }\n}\n\n/**\n * Your TrafficLight object will be instantiated and called as such:\n * const obj = new TrafficLight();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Traffic Light\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-plugin-editor",
    "number": 4,
    "title": "Design Plugin Editor",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Easy",
    "topics": [
      "Interfaces"
    ],
    "narrative": "Design a text editor plugin architecture using an EditorPlugin interface where registered plugins transform text buffers in order.",
    "className": "PluginEditor",
    "constructorSig": "public PluginEditor()",
    "methods": [
      {
        "sig": "public void registerPlugin(EditorPlugin plugin)",
        "desc": "registers a text transformation plugin."
      },
      {
        "sig": "public String applyPlugins(String text)",
        "desc": "passes text through all registered plugins sequentially and returns result."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PluginEditor()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PluginEditor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PluginEditor()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a text editor plugin architecture using an EditorPlugin interface where registered plugins transform text buffers in order.\n\n### Implement the `PluginEditor` class:\n\n- `PluginEditor()` creates an initialized instance.\n- `void registerPlugin(EditorPlugin plugin)` registers a text transformation plugin.\n- `String applyPlugins(String text)` passes text through all registered plugins sequentially and returns result.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PluginEditor()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PluginEditor\n\nclass PluginEditor {\n    public PluginEditor() {\n        \n    }\n\n    public void registerPlugin(EditorPlugin plugin) {\n        \n    }\n\n    public String applyPlugins(String text) {\n        \n    }\n}\n\n/**\n * Your PluginEditor object will be instantiated and called as such:\n * PluginEditor obj = new PluginEditor();\n * Object param_1 = obj.registerPlugin(EditorPlugin plugin);\n * Object param_2 = obj.applyPlugins(String text);\n */",
      "python": "class PluginEditor:\n\n    def __init__(self):\n        pass\n\n    def registerPlugin(self, *args, **kwargs):\n        pass\n\n    def applyPlugins(self, *args, **kwargs):\n        pass\n\n# Your PluginEditor object will be instantiated and called as such:\n# obj = PluginEditor()\n",
      "javascript": "class PluginEditor {\n    constructor() {\n        \n    }\n\n    registerPlugin(...args) {\n        \n    }\n\n    applyPlugins(...args) {\n        \n    }\n}\n\n/**\n * Your PluginEditor object will be instantiated and called as such:\n * const obj = new PluginEditor();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Plugin Editor\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-bank-account",
    "number": 5,
    "title": "Design Bank Account",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Easy",
    "topics": [
      "Encapsulation"
    ],
    "narrative": "Design a BankAccount class that enforces strict encapsulation on balance state with positive deposit and withdrawal guards.",
    "className": "BankAccount",
    "constructorSig": "public BankAccount(double initialBalance)",
    "methods": [
      {
        "sig": "public boolean deposit(double amount)",
        "desc": "adds positive amount to balance; returns true if successful."
      },
      {
        "sig": "public boolean withdraw(double amount)",
        "desc": "withdraws amount if amount > 0 and balance >= amount; returns true if successful."
      },
      {
        "sig": "public double getBalance()",
        "desc": "returns current verified balance."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new BankAccount()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new BankAccount()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new BankAccount()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a BankAccount class that enforces strict encapsulation on balance state with positive deposit and withdrawal guards.\n\n### Implement the `BankAccount` class:\n\n- `BankAccount(double initialBalance)` creates an initialized instance.\n- `boolean deposit(double amount)` adds positive amount to balance; returns true if successful.\n- `boolean withdraw(double amount)` withdraws amount if amount > 0 and balance >= amount; returns true if successful.\n- `double getBalance()` returns current verified balance.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new BankAccount()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class BankAccount\n\nclass BankAccount {\n    public BankAccount(double initialBalance) {\n        \n    }\n\n    public boolean deposit(double amount) {\n        \n    }\n\n    public boolean withdraw(double amount) {\n        \n    }\n\n    public double getBalance() {\n        \n    }\n}\n\n/**\n * Your BankAccount object will be instantiated and called as such:\n * BankAccount obj = new BankAccount();\n * Object param_1 = obj.deposit(double amount);\n * Object param_2 = obj.withdraw(double amount);\n * Object param_3 = obj.getBalance();\n */",
      "python": "class BankAccount:\n\n    def __init__(self):\n        pass\n\n    def deposit(self, *args, **kwargs):\n        pass\n\n    def withdraw(self, *args, **kwargs):\n        pass\n\n    def getBalance(self, *args, **kwargs):\n        pass\n\n# Your BankAccount object will be instantiated and called as such:\n# obj = BankAccount()\n",
      "javascript": "class BankAccount {\n    constructor() {\n        \n    }\n\n    deposit(...args) {\n        \n    }\n\n    withdraw(...args) {\n        \n    }\n\n    getBalance(...args) {\n        \n    }\n}\n\n/**\n * Your BankAccount object will be instantiated and called as such:\n * const obj = new BankAccount();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Bank Account\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-temperature-sensor",
    "number": 6,
    "title": "Design Temperature Sensor",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Easy",
    "topics": [
      "Encapsulation"
    ],
    "narrative": "Design a TemperatureSensor class that encapsulates temperature readings in Celsius while providing conversions to Fahrenheit and Kelvin.",
    "className": "TemperatureSensor",
    "constructorSig": "public TemperatureSensor(double celsius)",
    "methods": [
      {
        "sig": "public void setCelsius(double celsius)",
        "desc": "updates temperature reading."
      },
      {
        "sig": "public double getCelsius()",
        "desc": "returns temperature in Celsius."
      },
      {
        "sig": "public double getFahrenheit()",
        "desc": "returns temperature converted to Fahrenheit (C * 9/5 + 32)."
      },
      {
        "sig": "public double getKelvin()",
        "desc": "returns temperature converted to Kelvin (C + 273.15)."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TemperatureSensor()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TemperatureSensor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TemperatureSensor()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a TemperatureSensor class that encapsulates temperature readings in Celsius while providing conversions to Fahrenheit and Kelvin.\n\n### Implement the `TemperatureSensor` class:\n\n- `TemperatureSensor(double celsius)` creates an initialized instance.\n- `void setCelsius(double celsius)` updates temperature reading.\n- `double getCelsius()` returns temperature in Celsius.\n- `double getFahrenheit()` returns temperature converted to Fahrenheit (C * 9/5 + 32).\n- `double getKelvin()` returns temperature converted to Kelvin (C + 273.15).\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TemperatureSensor()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TemperatureSensor\n\nclass TemperatureSensor {\n    public TemperatureSensor(double celsius) {\n        \n    }\n\n    public void setCelsius(double celsius) {\n        \n    }\n\n    public double getCelsius() {\n        \n    }\n\n    public double getFahrenheit() {\n        \n    }\n\n    public double getKelvin() {\n        \n    }\n}\n\n/**\n * Your TemperatureSensor object will be instantiated and called as such:\n * TemperatureSensor obj = new TemperatureSensor();\n * Object param_1 = obj.setCelsius(double celsius);\n * Object param_2 = obj.getCelsius();\n * Object param_3 = obj.getFahrenheit();\n * Object param_4 = obj.getKelvin();\n */",
      "python": "class TemperatureSensor:\n\n    def __init__(self):\n        pass\n\n    def setCelsius(self, *args, **kwargs):\n        pass\n\n    def getCelsius(self, *args, **kwargs):\n        pass\n\n    def getFahrenheit(self, *args, **kwargs):\n        pass\n\n    def getKelvin(self, *args, **kwargs):\n        pass\n\n# Your TemperatureSensor object will be instantiated and called as such:\n# obj = TemperatureSensor()\n",
      "javascript": "class TemperatureSensor {\n    constructor() {\n        \n    }\n\n    setCelsius(...args) {\n        \n    }\n\n    getCelsius(...args) {\n        \n    }\n\n    getFahrenheit(...args) {\n        \n    }\n\n    getKelvin(...args) {\n        \n    }\n}\n\n/**\n * Your TemperatureSensor object will be instantiated and called as such:\n * const obj = new TemperatureSensor();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Temperature Sensor\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-shape-calculator",
    "number": 7,
    "title": "Design Shape Calculator",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Easy",
    "topics": [
      "Abstraction"
    ],
    "narrative": "Design an abstract Shape class with concrete Circle and Rectangle implementations calculating area and perimeter.",
    "className": "ShapeCalculator",
    "constructorSig": "public ShapeCalculator()",
    "methods": [
      {
        "sig": "public double calculateTotalArea(java.util.List<Shape> shapes)",
        "desc": "returns aggregate area across all polymorphic shapes."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ShapeCalculator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ShapeCalculator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ShapeCalculator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design an abstract Shape class with concrete Circle and Rectangle implementations calculating area and perimeter.\n\n### Implement the `ShapeCalculator` class:\n\n- `ShapeCalculator()` creates an initialized instance.\n- `double calculateTotalArea(java.util.List<Shape> shapes)` returns aggregate area across all polymorphic shapes.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ShapeCalculator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ShapeCalculator\n\nclass ShapeCalculator {\n    public ShapeCalculator() {\n        \n    }\n\n    public double calculateTotalArea(java.util.List<Shape> shapes) {\n        \n    }\n}\n\n/**\n * Your ShapeCalculator object will be instantiated and called as such:\n * ShapeCalculator obj = new ShapeCalculator();\n * Object param_1 = obj.calculateTotalArea(java.util.List<Shape> shapes);\n */",
      "python": "class ShapeCalculator:\n\n    def __init__(self):\n        pass\n\n    def calculateTotalArea(self, *args, **kwargs):\n        pass\n\n# Your ShapeCalculator object will be instantiated and called as such:\n# obj = ShapeCalculator()\n",
      "javascript": "class ShapeCalculator {\n    constructor() {\n        \n    }\n\n    calculateTotalArea(...args) {\n        \n    }\n}\n\n/**\n * Your ShapeCalculator object will be instantiated and called as such:\n * const obj = new ShapeCalculator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Shape Calculator\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-payment-methods",
    "number": 8,
    "title": "Design Payment Methods",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Easy",
    "topics": [
      "Inheritance"
    ],
    "narrative": "Design a PaymentMethod inheritance hierarchy with CreditCardPayment and PayPalPayment classes inheriting base transaction audit fields.",
    "className": "PaymentProcessor",
    "constructorSig": "public PaymentProcessor()",
    "methods": [
      {
        "sig": "public boolean process(PaymentMethod method, double amount)",
        "desc": "executes payment and logs transaction."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PaymentProcessor()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PaymentProcessor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PaymentProcessor()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a PaymentMethod inheritance hierarchy with CreditCardPayment and PayPalPayment classes inheriting base transaction audit fields.\n\n### Implement the `PaymentProcessor` class:\n\n- `PaymentProcessor()` creates an initialized instance.\n- `boolean process(PaymentMethod method, double amount)` executes payment and logs transaction.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PaymentProcessor()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PaymentProcessor\n\nclass PaymentProcessor {\n    public PaymentProcessor() {\n        \n    }\n\n    public boolean process(PaymentMethod method, double amount) {\n        \n    }\n}\n\n/**\n * Your PaymentProcessor object will be instantiated and called as such:\n * PaymentProcessor obj = new PaymentProcessor();\n * Object param_1 = obj.process(PaymentMethod method, double amount);\n */",
      "python": "class PaymentProcessor:\n\n    def __init__(self):\n        pass\n\n    def process(self, *args, **kwargs):\n        pass\n\n# Your PaymentProcessor object will be instantiated and called as such:\n# obj = PaymentProcessor()\n",
      "javascript": "class PaymentProcessor {\n    constructor() {\n        \n    }\n\n    process(...args) {\n        \n    }\n}\n\n/**\n * Your PaymentProcessor object will be instantiated and called as such:\n * const obj = new PaymentProcessor();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Payment Methods\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-notification-center",
    "number": 9,
    "title": "Design Notification Center",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Easy",
    "topics": [
      "Polymorphism"
    ],
    "narrative": "Design a polymorphic notification dispatcher supporting Email, SMS, and Push notification sender implementations.",
    "className": "NotificationCenter",
    "constructorSig": "public NotificationCenter()",
    "methods": [
      {
        "sig": "public void addSender(NotificationSender sender)",
        "desc": "registers sender strategy."
      },
      {
        "sig": "public int broadcast(String message)",
        "desc": "dispatches message across all registered channels."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new NotificationCenter()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new NotificationCenter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new NotificationCenter()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a polymorphic notification dispatcher supporting Email, SMS, and Push notification sender implementations.\n\n### Implement the `NotificationCenter` class:\n\n- `NotificationCenter()` creates an initialized instance.\n- `void addSender(NotificationSender sender)` registers sender strategy.\n- `int broadcast(String message)` dispatches message across all registered channels.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new NotificationCenter()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class NotificationCenter\n\nclass NotificationCenter {\n    public NotificationCenter() {\n        \n    }\n\n    public void addSender(NotificationSender sender) {\n        \n    }\n\n    public int broadcast(String message) {\n        \n    }\n}\n\n/**\n * Your NotificationCenter object will be instantiated and called as such:\n * NotificationCenter obj = new NotificationCenter();\n * Object param_1 = obj.addSender(NotificationSender sender);\n * Object param_2 = obj.broadcast(String message);\n */",
      "python": "class NotificationCenter:\n\n    def __init__(self):\n        pass\n\n    def addSender(self, *args, **kwargs):\n        pass\n\n    def broadcast(self, *args, **kwargs):\n        pass\n\n# Your NotificationCenter object will be instantiated and called as such:\n# obj = NotificationCenter()\n",
      "javascript": "class NotificationCenter {\n    constructor() {\n        \n    }\n\n    addSender(...args) {\n        \n    }\n\n    broadcast(...args) {\n        \n    }\n}\n\n/**\n * Your NotificationCenter object will be instantiated and called as such:\n * const obj = new NotificationCenter();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Notification Center\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-step-tracker",
    "number": 10,
    "title": "Design Step Tracker Class",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Medium",
    "topics": [
      "Classes and Objects"
    ],
    "narrative": "Design a fitness StepTracker class that tracks daily step counts, active days (days with >= minActiveSteps), and cumulative averages.",
    "className": "StepTracker",
    "constructorSig": "public StepTracker(int minActiveSteps)",
    "methods": [
      {
        "sig": "public void addDailySteps(int steps)",
        "desc": "records step count for a new day."
      },
      {
        "sig": "public int activeDays()",
        "desc": "returns count of days with steps >= minActiveSteps."
      },
      {
        "sig": "public double averageSteps()",
        "desc": "returns cumulative average steps per day."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new StepTracker()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new StepTracker()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new StepTracker()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a fitness StepTracker class that tracks daily step counts, active days (days with >= minActiveSteps), and cumulative averages.\n\n### Implement the `StepTracker` class:\n\n- `StepTracker(int minActiveSteps)` creates an initialized instance.\n- `void addDailySteps(int steps)` records step count for a new day.\n- `int activeDays()` returns count of days with steps >= minActiveSteps.\n- `double averageSteps()` returns cumulative average steps per day.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new StepTracker()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class StepTracker\n\nclass StepTracker {\n    public StepTracker(int minActiveSteps) {\n        \n    }\n\n    public void addDailySteps(int steps) {\n        \n    }\n\n    public int activeDays() {\n        \n    }\n\n    public double averageSteps() {\n        \n    }\n}\n\n/**\n * Your StepTracker object will be instantiated and called as such:\n * StepTracker obj = new StepTracker();\n * Object param_1 = obj.addDailySteps(int steps);\n * Object param_2 = obj.activeDays();\n * Object param_3 = obj.averageSteps();\n */",
      "python": "class StepTracker:\n\n    def __init__(self):\n        pass\n\n    def addDailySteps(self, *args, **kwargs):\n        pass\n\n    def activeDays(self, *args, **kwargs):\n        pass\n\n    def averageSteps(self, *args, **kwargs):\n        pass\n\n# Your StepTracker object will be instantiated and called as such:\n# obj = StepTracker()\n",
      "javascript": "class StepTracker {\n    constructor() {\n        \n    }\n\n    addDailySteps(...args) {\n        \n    }\n\n    activeDays(...args) {\n        \n    }\n\n    averageSteps(...args) {\n        \n    }\n}\n\n/**\n * Your StepTracker object will be instantiated and called as such:\n * const obj = new StepTracker();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Step Tracker Class\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-order-tracker",
    "number": 11,
    "title": "Design Order Tracker",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Medium",
    "topics": [
      "Enums",
      "State Management"
    ],
    "narrative": "Design an OrderTracker finite state machine transitioning through CREATED -> PAID -> SHIPPED -> DELIVERED (or CANCELLED).",
    "className": "OrderTracker",
    "constructorSig": "public OrderTracker(String orderId)",
    "methods": [
      {
        "sig": "public boolean pay()",
        "desc": "transitions CREATED to PAID."
      },
      {
        "sig": "public boolean ship()",
        "desc": "transitions PAID to SHIPPED."
      },
      {
        "sig": "public boolean deliver()",
        "desc": "transitions SHIPPED to DELIVERED."
      },
      {
        "sig": "public boolean cancel()",
        "desc": "cancels order if not yet shipped."
      },
      {
        "sig": "public String getStatus()",
        "desc": "returns current order status string."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new OrderTracker()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new OrderTracker()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new OrderTracker()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design an OrderTracker finite state machine transitioning through CREATED -> PAID -> SHIPPED -> DELIVERED (or CANCELLED).\n\n### Implement the `OrderTracker` class:\n\n- `OrderTracker(String orderId)` creates an initialized instance.\n- `boolean pay()` transitions CREATED to PAID.\n- `boolean ship()` transitions PAID to SHIPPED.\n- `boolean deliver()` transitions SHIPPED to DELIVERED.\n- `boolean cancel()` cancels order if not yet shipped.\n- `String getStatus()` returns current order status string.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new OrderTracker()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class OrderTracker\n\nclass OrderTracker {\n    public OrderTracker(String orderId) {\n        \n    }\n\n    public boolean pay() {\n        \n    }\n\n    public boolean ship() {\n        \n    }\n\n    public boolean deliver() {\n        \n    }\n\n    public boolean cancel() {\n        \n    }\n\n    public String getStatus() {\n        \n    }\n}\n\n/**\n * Your OrderTracker object will be instantiated and called as such:\n * OrderTracker obj = new OrderTracker();\n * Object param_1 = obj.pay();\n * Object param_2 = obj.ship();\n * Object param_3 = obj.deliver();\n * Object param_4 = obj.cancel();\n * Object param_5 = obj.getStatus();\n */",
      "python": "class OrderTracker:\n\n    def __init__(self):\n        pass\n\n    def pay(self, *args, **kwargs):\n        pass\n\n    def ship(self, *args, **kwargs):\n        pass\n\n    def deliver(self, *args, **kwargs):\n        pass\n\n    def cancel(self, *args, **kwargs):\n        pass\n\n    def getStatus(self, *args, **kwargs):\n        pass\n\n# Your OrderTracker object will be instantiated and called as such:\n# obj = OrderTracker()\n",
      "javascript": "class OrderTracker {\n    constructor() {\n        \n    }\n\n    pay(...args) {\n        \n    }\n\n    ship(...args) {\n        \n    }\n\n    deliver(...args) {\n        \n    }\n\n    cancel(...args) {\n        \n    }\n\n    getStatus(...args) {\n        \n    }\n}\n\n/**\n * Your OrderTracker object will be instantiated and called as such:\n * const obj = new OrderTracker();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Order Tracker\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-input-validator",
    "number": 12,
    "title": "Design Input Validator",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Medium",
    "topics": [
      "Interfaces"
    ],
    "narrative": "Design a composite ValidationPipeline where multiple Validator rule objects inspect form payloads.",
    "className": "InputValidator",
    "constructorSig": "public InputValidator()",
    "methods": [
      {
        "sig": "public void addRule(ValidationRule rule)",
        "desc": "appends validation rule."
      },
      {
        "sig": "public boolean validate(String input)",
        "desc": "returns true if input passes all registered rules."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new InputValidator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new InputValidator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new InputValidator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a composite ValidationPipeline where multiple Validator rule objects inspect form payloads.\n\n### Implement the `InputValidator` class:\n\n- `InputValidator()` creates an initialized instance.\n- `void addRule(ValidationRule rule)` appends validation rule.\n- `boolean validate(String input)` returns true if input passes all registered rules.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new InputValidator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class InputValidator\n\nclass InputValidator {\n    public InputValidator() {\n        \n    }\n\n    public void addRule(ValidationRule rule) {\n        \n    }\n\n    public boolean validate(String input) {\n        \n    }\n}\n\n/**\n * Your InputValidator object will be instantiated and called as such:\n * InputValidator obj = new InputValidator();\n * Object param_1 = obj.addRule(ValidationRule rule);\n * Object param_2 = obj.validate(String input);\n */",
      "python": "class InputValidator:\n\n    def __init__(self):\n        pass\n\n    def addRule(self, *args, **kwargs):\n        pass\n\n    def validate(self, *args, **kwargs):\n        pass\n\n# Your InputValidator object will be instantiated and called as such:\n# obj = InputValidator()\n",
      "javascript": "class InputValidator {\n    constructor() {\n        \n    }\n\n    addRule(...args) {\n        \n    }\n\n    validate(...args) {\n        \n    }\n}\n\n/**\n * Your InputValidator object will be instantiated and called as such:\n * const obj = new InputValidator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Input Validator\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-shopping-cart",
    "number": 13,
    "title": "Design Shopping Cart",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Medium",
    "topics": [
      "Encapsulation"
    ],
    "narrative": "Design an e-commerce ShoppingCart class encapsulating item quantities, price calculations, item removals, and sales tax computation.",
    "className": "ShoppingCart",
    "constructorSig": "public ShoppingCart(double taxRate)",
    "methods": [
      {
        "sig": "public void addItem(String itemId, double price, int quantity)",
        "desc": "adds or increments item in cart."
      },
      {
        "sig": "public void removeItem(String itemId)",
        "desc": "removes item completely."
      },
      {
        "sig": "public double getTotal()",
        "desc": "returns subtotal plus tax rate rounded to 2 decimals."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ShoppingCart()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ShoppingCart()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ShoppingCart()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design an e-commerce ShoppingCart class encapsulating item quantities, price calculations, item removals, and sales tax computation.\n\n### Implement the `ShoppingCart` class:\n\n- `ShoppingCart(double taxRate)` creates an initialized instance.\n- `void addItem(String itemId, double price, int quantity)` adds or increments item in cart.\n- `void removeItem(String itemId)` removes item completely.\n- `double getTotal()` returns subtotal plus tax rate rounded to 2 decimals.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ShoppingCart()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ShoppingCart\n\nclass ShoppingCart {\n    public ShoppingCart(double taxRate) {\n        \n    }\n\n    public void addItem(String itemId, double price, int quantity) {\n        \n    }\n\n    public void removeItem(String itemId) {\n        \n    }\n\n    public double getTotal() {\n        \n    }\n}\n\n/**\n * Your ShoppingCart object will be instantiated and called as such:\n * ShoppingCart obj = new ShoppingCart();\n * Object param_1 = obj.addItem(String itemId, double price, int quantity);\n * Object param_2 = obj.removeItem(String itemId);\n * Object param_3 = obj.getTotal();\n */",
      "python": "class ShoppingCart:\n\n    def __init__(self):\n        pass\n\n    def addItem(self, *args, **kwargs):\n        pass\n\n    def removeItem(self, *args, **kwargs):\n        pass\n\n    def getTotal(self, *args, **kwargs):\n        pass\n\n# Your ShoppingCart object will be instantiated and called as such:\n# obj = ShoppingCart()\n",
      "javascript": "class ShoppingCart {\n    constructor() {\n        \n    }\n\n    addItem(...args) {\n        \n    }\n\n    removeItem(...args) {\n        \n    }\n\n    getTotal(...args) {\n        \n    }\n}\n\n/**\n * Your ShoppingCart object will be instantiated and called as such:\n * const obj = new ShoppingCart();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Shopping Cart\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-event-exporter",
    "number": 14,
    "title": "Design Event Exporter",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Medium",
    "topics": [
      "Abstraction"
    ],
    "narrative": "Design an abstract EventExporter with JsonEventExporter and CsvEventExporter formatting domain event streams.",
    "className": "EventExporter",
    "constructorSig": "public EventExporter()",
    "methods": [
      {
        "sig": "public String exportEvents(java.util.List<DomainEvent> events)",
        "desc": "formats list of events according to concrete exporter."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new EventExporter()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new EventExporter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new EventExporter()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design an abstract EventExporter with JsonEventExporter and CsvEventExporter formatting domain event streams.\n\n### Implement the `EventExporter` class:\n\n- `EventExporter()` creates an initialized instance.\n- `String exportEvents(java.util.List<DomainEvent> events)` formats list of events according to concrete exporter.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new EventExporter()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class EventExporter\n\nclass EventExporter {\n    public EventExporter() {\n        \n    }\n\n    public String exportEvents(java.util.List<DomainEvent> events) {\n        \n    }\n}\n\n/**\n * Your EventExporter object will be instantiated and called as such:\n * EventExporter obj = new EventExporter();\n * Object param_1 = obj.exportEvents(java.util.List<DomainEvent> events);\n */",
      "python": "class EventExporter:\n\n    def __init__(self):\n        pass\n\n    def exportEvents(self, *args, **kwargs):\n        pass\n\n# Your EventExporter object will be instantiated and called as such:\n# obj = EventExporter()\n",
      "javascript": "class EventExporter {\n    constructor() {\n        \n    }\n\n    exportEvents(...args) {\n        \n    }\n}\n\n/**\n * Your EventExporter object will be instantiated and called as such:\n * const obj = new EventExporter();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Event Exporter\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-subscription-plans",
    "number": 15,
    "title": "Design Subscription Plans",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Medium",
    "topics": [
      "Inheritance"
    ],
    "narrative": "Design a tiered SaaS subscription model with FreePlan, ProPlan, and EnterprisePlan inheriting from SubscriptionPlan.",
    "className": "SubscriptionManager",
    "constructorSig": "public SubscriptionManager()",
    "methods": [
      {
        "sig": "public boolean canAccessFeature(String userId, String feature)",
        "desc": "checks user plan limits."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new SubscriptionManager()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new SubscriptionManager()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new SubscriptionManager()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a tiered SaaS subscription model with FreePlan, ProPlan, and EnterprisePlan inheriting from SubscriptionPlan.\n\n### Implement the `SubscriptionManager` class:\n\n- `SubscriptionManager()` creates an initialized instance.\n- `boolean canAccessFeature(String userId, String feature)` checks user plan limits.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new SubscriptionManager()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class SubscriptionManager\n\nclass SubscriptionManager {\n    public SubscriptionManager() {\n        \n    }\n\n    public boolean canAccessFeature(String userId, String feature) {\n        \n    }\n}\n\n/**\n * Your SubscriptionManager object will be instantiated and called as such:\n * SubscriptionManager obj = new SubscriptionManager();\n * Object param_1 = obj.canAccessFeature(String userId, String feature);\n */",
      "python": "class SubscriptionManager:\n\n    def __init__(self):\n        pass\n\n    def canAccessFeature(self, *args, **kwargs):\n        pass\n\n# Your SubscriptionManager object will be instantiated and called as such:\n# obj = SubscriptionManager()\n",
      "javascript": "class SubscriptionManager {\n    constructor() {\n        \n    }\n\n    canAccessFeature(...args) {\n        \n    }\n}\n\n/**\n * Your SubscriptionManager object will be instantiated and called as such:\n * const obj = new SubscriptionManager();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Subscription Plans\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-discount-calculator",
    "number": 16,
    "title": "Design Discount Calculator",
    "category": "oop-fundamentals",
    "categoryTitle": "OOP Fundamentals",
    "difficulty": "Medium",
    "topics": [
      "Polymorphism"
    ],
    "narrative": "Design a discount calculator applying PercentageDiscount, FixedAmountDiscount, and BuyOneGetOneDiscount strategies.",
    "className": "DiscountEngine",
    "constructorSig": "public DiscountEngine()",
    "methods": [
      {
        "sig": "public double applyBestDiscount(double originalPrice, java.util.List<DiscountPolicy> policies)",
        "desc": "returns lowest discounted price."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new DiscountEngine()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DiscountEngine()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new DiscountEngine()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a discount calculator applying PercentageDiscount, FixedAmountDiscount, and BuyOneGetOneDiscount strategies.\n\n### Implement the `DiscountEngine` class:\n\n- `DiscountEngine()` creates an initialized instance.\n- `double applyBestDiscount(double originalPrice, java.util.List<DiscountPolicy> policies)` returns lowest discounted price.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new DiscountEngine()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class DiscountEngine\n\nclass DiscountEngine {\n    public DiscountEngine() {\n        \n    }\n\n    public double applyBestDiscount(double originalPrice, java.util.List<DiscountPolicy> policies) {\n        \n    }\n}\n\n/**\n * Your DiscountEngine object will be instantiated and called as such:\n * DiscountEngine obj = new DiscountEngine();\n * Object param_1 = obj.applyBestDiscount(double originalPrice, java.util.List<DiscountPolicy> policies);\n */",
      "python": "class DiscountEngine:\n\n    def __init__(self):\n        pass\n\n    def applyBestDiscount(self, *args, **kwargs):\n        pass\n\n# Your DiscountEngine object will be instantiated and called as such:\n# obj = DiscountEngine()\n",
      "javascript": "class DiscountEngine {\n    constructor() {\n        \n    }\n\n    applyBestDiscount(...args) {\n        \n    }\n}\n\n/**\n * Your DiscountEngine object will be instantiated and called as such:\n * const obj = new DiscountEngine();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Discount Calculator\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-course-registry",
    "number": 17,
    "title": "Design Course Registry",
    "category": "class-relationships",
    "categoryTitle": "Class Relationships",
    "difficulty": "Easy",
    "topics": [
      "Association"
    ],
    "narrative": "Design a bidirectional Student and Course association where students enroll in courses and courses maintain active student rosters.",
    "className": "CourseRegistry",
    "constructorSig": "public CourseRegistry()",
    "methods": [
      {
        "sig": "public boolean enroll(String studentId, String courseId)",
        "desc": "associates student with course."
      },
      {
        "sig": "public java.util.List<String> getCoursesForStudent(String studentId)",
        "desc": "returns enrolled course list."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new CourseRegistry()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CourseRegistry()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new CourseRegistry()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a bidirectional Student and Course association where students enroll in courses and courses maintain active student rosters.\n\n### Implement the `CourseRegistry` class:\n\n- `CourseRegistry()` creates an initialized instance.\n- `boolean enroll(String studentId, String courseId)` associates student with course.\n- `java.util.List<String> getCoursesForStudent(String studentId)` returns enrolled course list.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new CourseRegistry()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class CourseRegistry\n\nclass CourseRegistry {\n    public CourseRegistry() {\n        \n    }\n\n    public boolean enroll(String studentId, String courseId) {\n        \n    }\n\n    public java.util.List<String> getCoursesForStudent(String studentId) {\n        \n    }\n}\n\n/**\n * Your CourseRegistry object will be instantiated and called as such:\n * CourseRegistry obj = new CourseRegistry();\n * Object param_1 = obj.enroll(String studentId, String courseId);\n * Object param_2 = obj.getCoursesForStudent(String studentId);\n */",
      "python": "class CourseRegistry:\n\n    def __init__(self):\n        pass\n\n    def enroll(self, *args, **kwargs):\n        pass\n\n    def getCoursesForStudent(self, *args, **kwargs):\n        pass\n\n# Your CourseRegistry object will be instantiated and called as such:\n# obj = CourseRegistry()\n",
      "javascript": "class CourseRegistry {\n    constructor() {\n        \n    }\n\n    enroll(...args) {\n        \n    }\n\n    getCoursesForStudent(...args) {\n        \n    }\n}\n\n/**\n * Your CourseRegistry object will be instantiated and called as such:\n * const obj = new CourseRegistry();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Course Registry\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-playlist-library",
    "number": 18,
    "title": "Design Playlist Library",
    "category": "class-relationships",
    "categoryTitle": "Class Relationships",
    "difficulty": "Easy",
    "topics": [
      "Aggregation"
    ],
    "narrative": "Design a Playlist class that aggregates Song objects without owning their lifecycle (songs exist independently in library).",
    "className": "PlaylistLibrary",
    "constructorSig": "public PlaylistLibrary()",
    "methods": [
      {
        "sig": "public void createPlaylist(String name)",
        "desc": "creates new empty playlist."
      },
      {
        "sig": "public void addSongToPlaylist(String playlist, Song song)",
        "desc": "aggregates song reference."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PlaylistLibrary()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PlaylistLibrary()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PlaylistLibrary()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a Playlist class that aggregates Song objects without owning their lifecycle (songs exist independently in library).\n\n### Implement the `PlaylistLibrary` class:\n\n- `PlaylistLibrary()` creates an initialized instance.\n- `void createPlaylist(String name)` creates new empty playlist.\n- `void addSongToPlaylist(String playlist, Song song)` aggregates song reference.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PlaylistLibrary()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PlaylistLibrary\n\nclass PlaylistLibrary {\n    public PlaylistLibrary() {\n        \n    }\n\n    public void createPlaylist(String name) {\n        \n    }\n\n    public void addSongToPlaylist(String playlist, Song song) {\n        \n    }\n}\n\n/**\n * Your PlaylistLibrary object will be instantiated and called as such:\n * PlaylistLibrary obj = new PlaylistLibrary();\n * Object param_1 = obj.createPlaylist(String name);\n * Object param_2 = obj.addSongToPlaylist(String playlist, Song song);\n */",
      "python": "class PlaylistLibrary:\n\n    def __init__(self):\n        pass\n\n    def createPlaylist(self, *args, **kwargs):\n        pass\n\n    def addSongToPlaylist(self, *args, **kwargs):\n        pass\n\n# Your PlaylistLibrary object will be instantiated and called as such:\n# obj = PlaylistLibrary()\n",
      "javascript": "class PlaylistLibrary {\n    constructor() {\n        \n    }\n\n    createPlaylist(...args) {\n        \n    }\n\n    addSongToPlaylist(...args) {\n        \n    }\n}\n\n/**\n * Your PlaylistLibrary object will be instantiated and called as such:\n * const obj = new PlaylistLibrary();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Playlist Library\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-slide-deck",
    "number": 19,
    "title": "Design Slide Deck",
    "category": "class-relationships",
    "categoryTitle": "Class Relationships",
    "difficulty": "Easy",
    "topics": [
      "Composition"
    ],
    "narrative": "Design a SlideDeck class that composedly owns Slide objects (slides cannot exist without their parent deck).",
    "className": "SlideDeck",
    "constructorSig": "public SlideDeck(String title)",
    "methods": [
      {
        "sig": "public void addSlide(String content)",
        "desc": "creates and manages internal slide lifecycle."
      },
      {
        "sig": "public int getSlideCount()",
        "desc": "returns number of slides in deck."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new SlideDeck()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new SlideDeck()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new SlideDeck()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a SlideDeck class that composedly owns Slide objects (slides cannot exist without their parent deck).\n\n### Implement the `SlideDeck` class:\n\n- `SlideDeck(String title)` creates an initialized instance.\n- `void addSlide(String content)` creates and manages internal slide lifecycle.\n- `int getSlideCount()` returns number of slides in deck.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new SlideDeck()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class SlideDeck\n\nclass SlideDeck {\n    public SlideDeck(String title) {\n        \n    }\n\n    public void addSlide(String content) {\n        \n    }\n\n    public int getSlideCount() {\n        \n    }\n}\n\n/**\n * Your SlideDeck object will be instantiated and called as such:\n * SlideDeck obj = new SlideDeck();\n * Object param_1 = obj.addSlide(String content);\n * Object param_2 = obj.getSlideCount();\n */",
      "python": "class SlideDeck:\n\n    def __init__(self):\n        pass\n\n    def addSlide(self, *args, **kwargs):\n        pass\n\n    def getSlideCount(self, *args, **kwargs):\n        pass\n\n# Your SlideDeck object will be instantiated and called as such:\n# obj = SlideDeck()\n",
      "javascript": "class SlideDeck {\n    constructor() {\n        \n    }\n\n    addSlide(...args) {\n        \n    }\n\n    getSlideCount(...args) {\n        \n    }\n}\n\n/**\n * Your SlideDeck object will be instantiated and called as such:\n * const obj = new SlideDeck();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Slide Deck\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-alert-preview",
    "number": 20,
    "title": "Design Alert Preview",
    "category": "class-relationships",
    "categoryTitle": "Class Relationships",
    "difficulty": "Easy",
    "topics": [
      "Dependency"
    ],
    "narrative": "Design an AlertPreview service with a method-level dependency on a Formatter utility (Dependency / Uses-A).",
    "className": "AlertPreview",
    "constructorSig": "public AlertPreview()",
    "methods": [
      {
        "sig": "public String formatAlert(Alert alert, AlertFormatter formatter)",
        "desc": "uses formatter dependency to render output."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new AlertPreview()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new AlertPreview()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new AlertPreview()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design an AlertPreview service with a method-level dependency on a Formatter utility (Dependency / Uses-A).\n\n### Implement the `AlertPreview` class:\n\n- `AlertPreview()` creates an initialized instance.\n- `String formatAlert(Alert alert, AlertFormatter formatter)` uses formatter dependency to render output.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new AlertPreview()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class AlertPreview\n\nclass AlertPreview {\n    public AlertPreview() {\n        \n    }\n\n    public String formatAlert(Alert alert, AlertFormatter formatter) {\n        \n    }\n}\n\n/**\n * Your AlertPreview object will be instantiated and called as such:\n * AlertPreview obj = new AlertPreview();\n * Object param_1 = obj.formatAlert(Alert alert, AlertFormatter formatter);\n */",
      "python": "class AlertPreview:\n\n    def __init__(self):\n        pass\n\n    def formatAlert(self, *args, **kwargs):\n        pass\n\n# Your AlertPreview object will be instantiated and called as such:\n# obj = AlertPreview()\n",
      "javascript": "class AlertPreview {\n    constructor() {\n        \n    }\n\n    formatAlert(...args) {\n        \n    }\n}\n\n/**\n * Your AlertPreview object will be instantiated and called as such:\n * const obj = new AlertPreview();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Alert Preview\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-team-directory",
    "number": 21,
    "title": "Design Team Directory",
    "category": "class-relationships",
    "categoryTitle": "Class Relationships",
    "difficulty": "Medium",
    "topics": [
      "Aggregation"
    ],
    "narrative": "Design a Department and Employee aggregation system where employees can transfer between departments.",
    "className": "TeamDirectory",
    "constructorSig": "public TeamDirectory()",
    "methods": [
      {
        "sig": "public void assignEmployee(String deptId, Employee emp)",
        "desc": "aggregates employee into department."
      },
      {
        "sig": "public void transferEmployee(String fromDept, String toDept, String empId)",
        "desc": "moves employee."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TeamDirectory()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TeamDirectory()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TeamDirectory()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a Department and Employee aggregation system where employees can transfer between departments.\n\n### Implement the `TeamDirectory` class:\n\n- `TeamDirectory()` creates an initialized instance.\n- `void assignEmployee(String deptId, Employee emp)` aggregates employee into department.\n- `void transferEmployee(String fromDept, String toDept, String empId)` moves employee.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TeamDirectory()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TeamDirectory\n\nclass TeamDirectory {\n    public TeamDirectory() {\n        \n    }\n\n    public void assignEmployee(String deptId, Employee emp) {\n        \n    }\n\n    public void transferEmployee(String fromDept, String toDept, String empId) {\n        \n    }\n}\n\n/**\n * Your TeamDirectory object will be instantiated and called as such:\n * TeamDirectory obj = new TeamDirectory();\n * Object param_1 = obj.assignEmployee(String deptId, Employee emp);\n * Object param_2 = obj.transferEmployee(String fromDept, String toDept, String empId);\n */",
      "python": "class TeamDirectory:\n\n    def __init__(self):\n        pass\n\n    def assignEmployee(self, *args, **kwargs):\n        pass\n\n    def transferEmployee(self, *args, **kwargs):\n        pass\n\n# Your TeamDirectory object will be instantiated and called as such:\n# obj = TeamDirectory()\n",
      "javascript": "class TeamDirectory {\n    constructor() {\n        \n    }\n\n    assignEmployee(...args) {\n        \n    }\n\n    transferEmployee(...args) {\n        \n    }\n}\n\n/**\n * Your TeamDirectory object will be instantiated and called as such:\n * const obj = new TeamDirectory();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Team Directory\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-computer-workshop",
    "number": 22,
    "title": "Design Computer Workshop",
    "category": "class-relationships",
    "categoryTitle": "Class Relationships",
    "difficulty": "Medium",
    "topics": [
      "Composition"
    ],
    "narrative": "Design a Computer class composed of Motherboard, CPU, and RAM parts instantiated directly inside Computer constructor.",
    "className": "ComputerWorkshop",
    "constructorSig": "public ComputerWorkshop()",
    "methods": [
      {
        "sig": "public Computer buildGamingPC(String cpuModel, int ramGb)",
        "desc": "constructs computer with strictly owned components."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ComputerWorkshop()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ComputerWorkshop()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ComputerWorkshop()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a Computer class composed of Motherboard, CPU, and RAM parts instantiated directly inside Computer constructor.\n\n### Implement the `ComputerWorkshop` class:\n\n- `ComputerWorkshop()` creates an initialized instance.\n- `Computer buildGamingPC(String cpuModel, int ramGb)` constructs computer with strictly owned components.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ComputerWorkshop()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ComputerWorkshop\n\nclass ComputerWorkshop {\n    public ComputerWorkshop() {\n        \n    }\n\n    public Computer buildGamingPC(String cpuModel, int ramGb) {\n        \n    }\n}\n\n/**\n * Your ComputerWorkshop object will be instantiated and called as such:\n * ComputerWorkshop obj = new ComputerWorkshop();\n * Object param_1 = obj.buildGamingPC(String cpuModel, int ramGb);\n */",
      "python": "class ComputerWorkshop:\n\n    def __init__(self):\n        pass\n\n    def buildGamingPC(self, *args, **kwargs):\n        pass\n\n# Your ComputerWorkshop object will be instantiated and called as such:\n# obj = ComputerWorkshop()\n",
      "javascript": "class ComputerWorkshop {\n    constructor() {\n        \n    }\n\n    buildGamingPC(...args) {\n        \n    }\n}\n\n/**\n * Your ComputerWorkshop object will be instantiated and called as such:\n * const obj = new ComputerWorkshop();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Computer Workshop\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-follow-graph",
    "number": 23,
    "title": "Design Follow Graph",
    "category": "class-relationships",
    "categoryTitle": "Class Relationships",
    "difficulty": "Medium",
    "topics": [
      "Association"
    ],
    "narrative": "Design a social network FollowGraph managing many-to-many follower and following associations between User entities.",
    "className": "FollowGraph",
    "constructorSig": "public FollowGraph()",
    "methods": [
      {
        "sig": "public void follow(String followerId, String followeeId)",
        "desc": "creates follow association."
      },
      {
        "sig": "public void unfollow(String followerId, String followeeId)",
        "desc": "removes follow association."
      },
      {
        "sig": "public java.util.List<String> getFollowers(String userId)",
        "desc": "returns follower list."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new FollowGraph()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new FollowGraph()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new FollowGraph()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a social network FollowGraph managing many-to-many follower and following associations between User entities.\n\n### Implement the `FollowGraph` class:\n\n- `FollowGraph()` creates an initialized instance.\n- `void follow(String followerId, String followeeId)` creates follow association.\n- `void unfollow(String followerId, String followeeId)` removes follow association.\n- `java.util.List<String> getFollowers(String userId)` returns follower list.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new FollowGraph()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class FollowGraph\n\nclass FollowGraph {\n    public FollowGraph() {\n        \n    }\n\n    public void follow(String followerId, String followeeId) {\n        \n    }\n\n    public void unfollow(String followerId, String followeeId) {\n        \n    }\n\n    public java.util.List<String> getFollowers(String userId) {\n        \n    }\n}\n\n/**\n * Your FollowGraph object will be instantiated and called as such:\n * FollowGraph obj = new FollowGraph();\n * Object param_1 = obj.follow(String followerId, String followeeId);\n * Object param_2 = obj.unfollow(String followerId, String followeeId);\n * Object param_3 = obj.getFollowers(String userId);\n */",
      "python": "class FollowGraph:\n\n    def __init__(self):\n        pass\n\n    def follow(self, *args, **kwargs):\n        pass\n\n    def unfollow(self, *args, **kwargs):\n        pass\n\n    def getFollowers(self, *args, **kwargs):\n        pass\n\n# Your FollowGraph object will be instantiated and called as such:\n# obj = FollowGraph()\n",
      "javascript": "class FollowGraph {\n    constructor() {\n        \n    }\n\n    follow(...args) {\n        \n    }\n\n    unfollow(...args) {\n        \n    }\n\n    getFollowers(...args) {\n        \n    }\n}\n\n/**\n * Your FollowGraph object will be instantiated and called as such:\n * const obj = new FollowGraph();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Follow Graph\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-music-catalog",
    "number": 24,
    "title": "Design Music Catalog",
    "category": "class-relationships",
    "categoryTitle": "Class Relationships",
    "difficulty": "Hard",
    "topics": [
      "Aggregation"
    ],
    "narrative": "Design an Artist, Album, and Track aggregation hierarchy supporting cross-album track sharing and multi-artist collaborations.",
    "className": "MusicCatalog",
    "constructorSig": "public MusicCatalog()",
    "methods": [
      {
        "sig": "public void registerAlbum(Album album)",
        "desc": "indexes album with aggregate track references."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new MusicCatalog()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new MusicCatalog()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new MusicCatalog()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design an Artist, Album, and Track aggregation hierarchy supporting cross-album track sharing and multi-artist collaborations.\n\n### Implement the `MusicCatalog` class:\n\n- `MusicCatalog()` creates an initialized instance.\n- `void registerAlbum(Album album)` indexes album with aggregate track references.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new MusicCatalog()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class MusicCatalog\n\nclass MusicCatalog {\n    public MusicCatalog() {\n        \n    }\n\n    public void registerAlbum(Album album) {\n        \n    }\n}\n\n/**\n * Your MusicCatalog object will be instantiated and called as such:\n * MusicCatalog obj = new MusicCatalog();\n * Object param_1 = obj.registerAlbum(Album album);\n */",
      "python": "class MusicCatalog:\n\n    def __init__(self):\n        pass\n\n    def registerAlbum(self, *args, **kwargs):\n        pass\n\n# Your MusicCatalog object will be instantiated and called as such:\n# obj = MusicCatalog()\n",
      "javascript": "class MusicCatalog {\n    constructor() {\n        \n    }\n\n    registerAlbum(...args) {\n        \n    }\n}\n\n/**\n * Your MusicCatalog object will be instantiated and called as such:\n * const obj = new MusicCatalog();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Music Catalog\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-video-editor",
    "number": 25,
    "title": "Design Video Editor",
    "category": "class-relationships",
    "categoryTitle": "Class Relationships",
    "difficulty": "Hard",
    "topics": [
      "Composition"
    ],
    "narrative": "Design a VideoProject containing composite Tracks, TimelineClips, and Keyframes whose lifetimes are strictly tied to the project.",
    "className": "VideoEditor",
    "constructorSig": "public VideoEditor()",
    "methods": [
      {
        "sig": "public void addClipToTrack(String trackId, Clip clip)",
        "desc": "adds clip under project composition."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new VideoEditor()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new VideoEditor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new VideoEditor()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a VideoProject containing composite Tracks, TimelineClips, and Keyframes whose lifetimes are strictly tied to the project.\n\n### Implement the `VideoEditor` class:\n\n- `VideoEditor()` creates an initialized instance.\n- `void addClipToTrack(String trackId, Clip clip)` adds clip under project composition.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new VideoEditor()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class VideoEditor\n\nclass VideoEditor {\n    public VideoEditor() {\n        \n    }\n\n    public void addClipToTrack(String trackId, Clip clip) {\n        \n    }\n}\n\n/**\n * Your VideoEditor object will be instantiated and called as such:\n * VideoEditor obj = new VideoEditor();\n * Object param_1 = obj.addClipToTrack(String trackId, Clip clip);\n */",
      "python": "class VideoEditor:\n\n    def __init__(self):\n        pass\n\n    def addClipToTrack(self, *args, **kwargs):\n        pass\n\n# Your VideoEditor object will be instantiated and called as such:\n# obj = VideoEditor()\n",
      "javascript": "class VideoEditor {\n    constructor() {\n        \n    }\n\n    addClipToTrack(...args) {\n        \n    }\n}\n\n/**\n * Your VideoEditor object will be instantiated and called as such:\n * const obj = new VideoEditor();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Video Editor\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-account-intake",
    "number": 26,
    "title": "Refactor Account Intake",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Easy",
    "topics": [
      "DRY Principle"
    ],
    "narrative": "Refactor duplicated user signup, email verification, and audit logging routines into a single reusable onboarding helper.",
    "className": "AccountIntakeService",
    "constructorSig": "public AccountIntakeService()",
    "methods": [
      {
        "sig": "public boolean registerUser(String email, String password, String role)",
        "desc": "consolidates onboarding pipeline."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new AccountIntakeService()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new AccountIntakeService()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new AccountIntakeService()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Refactor duplicated user signup, email verification, and audit logging routines into a single reusable onboarding helper.\n\n### Implement the `AccountIntakeService` class:\n\n- `AccountIntakeService()` creates an initialized instance.\n- `boolean registerUser(String email, String password, String role)` consolidates onboarding pipeline.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new AccountIntakeService()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class AccountIntakeService\n\nclass AccountIntakeService {\n    public AccountIntakeService() {\n        \n    }\n\n    public boolean registerUser(String email, String password, String role) {\n        \n    }\n}\n\n/**\n * Your AccountIntakeService object will be instantiated and called as such:\n * AccountIntakeService obj = new AccountIntakeService();\n * Object param_1 = obj.registerUser(String email, String password, String role);\n */",
      "python": "class AccountIntakeService:\n\n    def __init__(self):\n        pass\n\n    def registerUser(self, *args, **kwargs):\n        pass\n\n# Your AccountIntakeService object will be instantiated and called as such:\n# obj = AccountIntakeService()\n",
      "javascript": "class AccountIntakeService {\n    constructor() {\n        \n    }\n\n    registerUser(...args) {\n        \n    }\n}\n\n/**\n * Your AccountIntakeService object will be instantiated and called as such:\n * const obj = new AccountIntakeService();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Account Intake\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-price-book",
    "number": 27,
    "title": "Refactor Price Book",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Easy",
    "topics": [
      "DRY Principle"
    ],
    "narrative": "Eliminate repetitive currency conversions and rounding logic across international price books by extracting a CurrencyConverter utility.",
    "className": "PriceBook",
    "constructorSig": "public PriceBook()",
    "methods": [
      {
        "sig": "public double getLocalizedPrice(String sku, String targetCurrency)",
        "desc": "computes unified localized price."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PriceBook()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PriceBook()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PriceBook()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Eliminate repetitive currency conversions and rounding logic across international price books by extracting a CurrencyConverter utility.\n\n### Implement the `PriceBook` class:\n\n- `PriceBook()` creates an initialized instance.\n- `double getLocalizedPrice(String sku, String targetCurrency)` computes unified localized price.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PriceBook()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PriceBook\n\nclass PriceBook {\n    public PriceBook() {\n        \n    }\n\n    public double getLocalizedPrice(String sku, String targetCurrency) {\n        \n    }\n}\n\n/**\n * Your PriceBook object will be instantiated and called as such:\n * PriceBook obj = new PriceBook();\n * Object param_1 = obj.getLocalizedPrice(String sku, String targetCurrency);\n */",
      "python": "class PriceBook:\n\n    def __init__(self):\n        pass\n\n    def getLocalizedPrice(self, *args, **kwargs):\n        pass\n\n# Your PriceBook object will be instantiated and called as such:\n# obj = PriceBook()\n",
      "javascript": "class PriceBook {\n    constructor() {\n        \n    }\n\n    getLocalizedPrice(...args) {\n        \n    }\n}\n\n/**\n * Your PriceBook object will be instantiated and called as such:\n * const obj = new PriceBook();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Price Book\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-delivery-fee",
    "number": 28,
    "title": "Refactor Delivery Fee",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Easy",
    "topics": [
      "KISS Principle"
    ],
    "narrative": "Simplify an overengineered 50-condition delivery tariff calculation into clean, readable distance and weight tier formulas (Keep It Simple, Stupid).",
    "className": "DeliveryFeeCalculator",
    "constructorSig": "public DeliveryFeeCalculator()",
    "methods": [
      {
        "sig": "public double calculateFee(double distanceKm, double weightKg)",
        "desc": "calculates delivery fee simply and predictably."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new DeliveryFeeCalculator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DeliveryFeeCalculator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new DeliveryFeeCalculator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Simplify an overengineered 50-condition delivery tariff calculation into clean, readable distance and weight tier formulas (Keep It Simple, Stupid).\n\n### Implement the `DeliveryFeeCalculator` class:\n\n- `DeliveryFeeCalculator()` creates an initialized instance.\n- `double calculateFee(double distanceKm, double weightKg)` calculates delivery fee simply and predictably.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new DeliveryFeeCalculator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class DeliveryFeeCalculator\n\nclass DeliveryFeeCalculator {\n    public DeliveryFeeCalculator() {\n        \n    }\n\n    public double calculateFee(double distanceKm, double weightKg) {\n        \n    }\n}\n\n/**\n * Your DeliveryFeeCalculator object will be instantiated and called as such:\n * DeliveryFeeCalculator obj = new DeliveryFeeCalculator();\n * Object param_1 = obj.calculateFee(double distanceKm, double weightKg);\n */",
      "python": "class DeliveryFeeCalculator:\n\n    def __init__(self):\n        pass\n\n    def calculateFee(self, *args, **kwargs):\n        pass\n\n# Your DeliveryFeeCalculator object will be instantiated and called as such:\n# obj = DeliveryFeeCalculator()\n",
      "javascript": "class DeliveryFeeCalculator {\n    constructor() {\n        \n    }\n\n    calculateFee(...args) {\n        \n    }\n}\n\n/**\n * Your DeliveryFeeCalculator object will be instantiated and called as such:\n * const obj = new DeliveryFeeCalculator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Delivery Fee\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-login-guard",
    "number": 29,
    "title": "Refactor Login Guard",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Easy",
    "topics": [
      "KISS Principle"
    ],
    "narrative": "Refactor complex nested boolean conditionals in authentication guard into clear guard clauses with early returns.",
    "className": "LoginGuard",
    "constructorSig": "public LoginGuard()",
    "methods": [
      {
        "sig": "public boolean canLogin(String user, String pass, boolean ipAllowed, int failedAttempts)",
        "desc": "validates login with clean guard clauses."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new LoginGuard()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new LoginGuard()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new LoginGuard()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Refactor complex nested boolean conditionals in authentication guard into clear guard clauses with early returns.\n\n### Implement the `LoginGuard` class:\n\n- `LoginGuard()` creates an initialized instance.\n- `boolean canLogin(String user, String pass, boolean ipAllowed, int failedAttempts)` validates login with clean guard clauses.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new LoginGuard()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class LoginGuard\n\nclass LoginGuard {\n    public LoginGuard() {\n        \n    }\n\n    public boolean canLogin(String user, String pass, boolean ipAllowed, int failedAttempts) {\n        \n    }\n}\n\n/**\n * Your LoginGuard object will be instantiated and called as such:\n * LoginGuard obj = new LoginGuard();\n * Object param_1 = obj.canLogin(String user, String pass, boolean ipAllowed, int failedAttempts);\n */",
      "python": "class LoginGuard:\n\n    def __init__(self):\n        pass\n\n    def canLogin(self, *args, **kwargs):\n        pass\n\n# Your LoginGuard object will be instantiated and called as such:\n# obj = LoginGuard()\n",
      "javascript": "class LoginGuard {\n    constructor() {\n        \n    }\n\n    canLogin(...args) {\n        \n    }\n}\n\n/**\n * Your LoginGuard object will be instantiated and called as such:\n * const obj = new LoginGuard();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Login Guard\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-avatar-store",
    "number": 30,
    "title": "Refactor Avatar Store",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Easy",
    "topics": [
      "YAGNI Principle"
    ],
    "narrative": "Strip out unused speculative microservice proxies and generic 3D asset loaders following You Aren't Gonna Need It (YAGNI).",
    "className": "AvatarStore",
    "constructorSig": "public AvatarStore()",
    "methods": [
      {
        "sig": "public String getAvatarUrl(String userId)",
        "desc": "returns simple direct 2D avatar asset URL."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new AvatarStore()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new AvatarStore()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new AvatarStore()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Strip out unused speculative microservice proxies and generic 3D asset loaders following You Aren't Gonna Need It (YAGNI).\n\n### Implement the `AvatarStore` class:\n\n- `AvatarStore()` creates an initialized instance.\n- `String getAvatarUrl(String userId)` returns simple direct 2D avatar asset URL.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new AvatarStore()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class AvatarStore\n\nclass AvatarStore {\n    public AvatarStore() {\n        \n    }\n\n    public String getAvatarUrl(String userId) {\n        \n    }\n}\n\n/**\n * Your AvatarStore object will be instantiated and called as such:\n * AvatarStore obj = new AvatarStore();\n * Object param_1 = obj.getAvatarUrl(String userId);\n */",
      "python": "class AvatarStore:\n\n    def __init__(self):\n        pass\n\n    def getAvatarUrl(self, *args, **kwargs):\n        pass\n\n# Your AvatarStore object will be instantiated and called as such:\n# obj = AvatarStore()\n",
      "javascript": "class AvatarStore {\n    constructor() {\n        \n    }\n\n    getAvatarUrl(...args) {\n        \n    }\n}\n\n/**\n * Your AvatarStore object will be instantiated and called as such:\n * const obj = new AvatarStore();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Avatar Store\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-password-checker",
    "number": 31,
    "title": "Refactor Password Checker",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Easy",
    "topics": [
      "YAGNI Principle"
    ],
    "narrative": "Simplify over-architected regex factories and dynamic plugin checkers to satisfy standard length, digit, and symbol constraints.",
    "className": "PasswordChecker",
    "constructorSig": "public PasswordChecker()",
    "methods": [
      {
        "sig": "public boolean isStrong(String password)",
        "desc": "validates password strength straightforwardly."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PasswordChecker()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PasswordChecker()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PasswordChecker()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Simplify over-architected regex factories and dynamic plugin checkers to satisfy standard length, digit, and symbol constraints.\n\n### Implement the `PasswordChecker` class:\n\n- `PasswordChecker()` creates an initialized instance.\n- `boolean isStrong(String password)` validates password strength straightforwardly.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PasswordChecker()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PasswordChecker\n\nclass PasswordChecker {\n    public PasswordChecker() {\n        \n    }\n\n    public boolean isStrong(String password) {\n        \n    }\n}\n\n/**\n * Your PasswordChecker object will be instantiated and called as such:\n * PasswordChecker obj = new PasswordChecker();\n * Object param_1 = obj.isStrong(String password);\n */",
      "python": "class PasswordChecker:\n\n    def __init__(self):\n        pass\n\n    def isStrong(self, *args, **kwargs):\n        pass\n\n# Your PasswordChecker object will be instantiated and called as such:\n# obj = PasswordChecker()\n",
      "javascript": "class PasswordChecker {\n    constructor() {\n        \n    }\n\n    isStrong(...args) {\n        \n    }\n}\n\n/**\n * Your PasswordChecker object will be instantiated and called as such:\n * const obj = new PasswordChecker();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Password Checker\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-climate-console",
    "number": 32,
    "title": "Refactor Climate Console",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Easy",
    "topics": [
      "Law of Demeter"
    ],
    "narrative": "Fix Law of Demeter violations where callers chain `car.getDashboard().getClimate().getTemp().set(22)` by providing `car.setTargetTemperature(22)`.",
    "className": "ClimateConsole",
    "constructorSig": "public ClimateConsole(Car car)",
    "methods": [
      {
        "sig": "public void adjustCabinTemperature(int targetTemp)",
        "desc": "talks only to immediate friends without deep chaining."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ClimateConsole()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ClimateConsole()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ClimateConsole()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Fix Law of Demeter violations where callers chain `car.getDashboard().getClimate().getTemp().set(22)` by providing `car.setTargetTemperature(22)`.\n\n### Implement the `ClimateConsole` class:\n\n- `ClimateConsole(Car car)` creates an initialized instance.\n- `void adjustCabinTemperature(int targetTemp)` talks only to immediate friends without deep chaining.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ClimateConsole()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ClimateConsole\n\nclass ClimateConsole {\n    public ClimateConsole(Car car) {\n        \n    }\n\n    public void adjustCabinTemperature(int targetTemp) {\n        \n    }\n}\n\n/**\n * Your ClimateConsole object will be instantiated and called as such:\n * ClimateConsole obj = new ClimateConsole();\n * Object param_1 = obj.adjustCabinTemperature(int targetTemp);\n */",
      "python": "class ClimateConsole:\n\n    def __init__(self):\n        pass\n\n    def adjustCabinTemperature(self, *args, **kwargs):\n        pass\n\n# Your ClimateConsole object will be instantiated and called as such:\n# obj = ClimateConsole()\n",
      "javascript": "class ClimateConsole {\n    constructor() {\n        \n    }\n\n    adjustCabinTemperature(...args) {\n        \n    }\n}\n\n/**\n * Your ClimateConsole object will be instantiated and called as such:\n * const obj = new ClimateConsole();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Climate Console\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-project-dashboard",
    "number": 33,
    "title": "Refactor Project Dashboard",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Medium",
    "topics": [
      "Law of Demeter"
    ],
    "narrative": "Refactor `company.getDepartment().getTeam().getLead().getEmail()` chaining by encapsulating team lead lookup on Company.",
    "className": "ProjectDashboard",
    "constructorSig": "public ProjectDashboard()",
    "methods": [
      {
        "sig": "public String getTeamLeadEmail(String companyId, String teamId)",
        "desc": "retrieves lead email without leaking structure."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ProjectDashboard()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ProjectDashboard()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ProjectDashboard()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Refactor `company.getDepartment().getTeam().getLead().getEmail()` chaining by encapsulating team lead lookup on Company.\n\n### Implement the `ProjectDashboard` class:\n\n- `ProjectDashboard()` creates an initialized instance.\n- `String getTeamLeadEmail(String companyId, String teamId)` retrieves lead email without leaking structure.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ProjectDashboard()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ProjectDashboard\n\nclass ProjectDashboard {\n    public ProjectDashboard() {\n        \n    }\n\n    public String getTeamLeadEmail(String companyId, String teamId) {\n        \n    }\n}\n\n/**\n * Your ProjectDashboard object will be instantiated and called as such:\n * ProjectDashboard obj = new ProjectDashboard();\n * Object param_1 = obj.getTeamLeadEmail(String companyId, String teamId);\n */",
      "python": "class ProjectDashboard:\n\n    def __init__(self):\n        pass\n\n    def getTeamLeadEmail(self, *args, **kwargs):\n        pass\n\n# Your ProjectDashboard object will be instantiated and called as such:\n# obj = ProjectDashboard()\n",
      "javascript": "class ProjectDashboard {\n    constructor() {\n        \n    }\n\n    getTeamLeadEmail(...args) {\n        \n    }\n}\n\n/**\n * Your ProjectDashboard object will be instantiated and called as such:\n * const obj = new ProjectDashboard();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Project Dashboard\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-shipping-desk",
    "number": 34,
    "title": "Refactor Shipping Desk",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Medium",
    "topics": [
      "Law of Demeter"
    ],
    "narrative": "Prevent train wrecks in order shipping by having Order calculate its own shipping eligibility rather than inspecting customer address sub-fields.",
    "className": "ShippingDesk",
    "constructorSig": "public ShippingDesk()",
    "methods": [
      {
        "sig": "public boolean canShipOrder(Order order)",
        "desc": "delegates to order directly."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ShippingDesk()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ShippingDesk()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ShippingDesk()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Prevent train wrecks in order shipping by having Order calculate its own shipping eligibility rather than inspecting customer address sub-fields.\n\n### Implement the `ShippingDesk` class:\n\n- `ShippingDesk()` creates an initialized instance.\n- `boolean canShipOrder(Order order)` delegates to order directly.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ShippingDesk()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ShippingDesk\n\nclass ShippingDesk {\n    public ShippingDesk() {\n        \n    }\n\n    public boolean canShipOrder(Order order) {\n        \n    }\n}\n\n/**\n * Your ShippingDesk object will be instantiated and called as such:\n * ShippingDesk obj = new ShippingDesk();\n * Object param_1 = obj.canShipOrder(Order order);\n */",
      "python": "class ShippingDesk:\n\n    def __init__(self):\n        pass\n\n    def canShipOrder(self, *args, **kwargs):\n        pass\n\n# Your ShippingDesk object will be instantiated and called as such:\n# obj = ShippingDesk()\n",
      "javascript": "class ShippingDesk {\n    constructor() {\n        \n    }\n\n    canShipOrder(...args) {\n        \n    }\n}\n\n/**\n * Your ShippingDesk object will be instantiated and called as such:\n * const obj = new ShippingDesk();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Shipping Desk\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-profile-service",
    "number": 35,
    "title": "Refactor Profile Service",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Medium",
    "topics": [
      "Separation of Concerns"
    ],
    "narrative": "Separate database persistence, image resizing, and email notification responsibilities from a monolithic ProfileService into distinct classes.",
    "className": "ProfileService",
    "constructorSig": "public ProfileService(UserRepository userRepo, ImageResizer resizer, EmailNotifier notifier)",
    "methods": [
      {
        "sig": "public boolean updateProfile(String userId, byte[] avatarData, String bio)",
        "desc": "coordinates single responsibility collaborators."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ProfileService()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ProfileService()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ProfileService()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Separate database persistence, image resizing, and email notification responsibilities from a monolithic ProfileService into distinct classes.\n\n### Implement the `ProfileService` class:\n\n- `ProfileService(UserRepository userRepo, ImageResizer resizer, EmailNotifier notifier)` creates an initialized instance.\n- `boolean updateProfile(String userId, byte[] avatarData, String bio)` coordinates single responsibility collaborators.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ProfileService()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ProfileService\n\nclass ProfileService {\n    public ProfileService(UserRepository userRepo, ImageResizer resizer, EmailNotifier notifier) {\n        \n    }\n\n    public boolean updateProfile(String userId, byte[] avatarData, String bio) {\n        \n    }\n}\n\n/**\n * Your ProfileService object will be instantiated and called as such:\n * ProfileService obj = new ProfileService();\n * Object param_1 = obj.updateProfile(String userId, byte[] avatarData, String bio);\n */",
      "python": "class ProfileService:\n\n    def __init__(self):\n        pass\n\n    def updateProfile(self, *args, **kwargs):\n        pass\n\n# Your ProfileService object will be instantiated and called as such:\n# obj = ProfileService()\n",
      "javascript": "class ProfileService {\n    constructor() {\n        \n    }\n\n    updateProfile(...args) {\n        \n    }\n}\n\n/**\n * Your ProfileService object will be instantiated and called as such:\n * const obj = new ProfileService();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Profile Service\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-expense-importer",
    "number": 36,
    "title": "Refactor Expense Importer",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Medium",
    "topics": [
      "Separation of Concerns"
    ],
    "narrative": "Split a CSV parser, expense validator, and currency converter into decoupled modules.",
    "className": "ExpenseImporter",
    "constructorSig": "public ExpenseImporter()",
    "methods": [
      {
        "sig": "public int importExpenses(String csvContent)",
        "desc": "parses, validates, and persists expense records cleanly."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ExpenseImporter()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ExpenseImporter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ExpenseImporter()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Split a CSV parser, expense validator, and currency converter into decoupled modules.\n\n### Implement the `ExpenseImporter` class:\n\n- `ExpenseImporter()` creates an initialized instance.\n- `int importExpenses(String csvContent)` parses, validates, and persists expense records cleanly.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ExpenseImporter()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ExpenseImporter\n\nclass ExpenseImporter {\n    public ExpenseImporter() {\n        \n    }\n\n    public int importExpenses(String csvContent) {\n        \n    }\n}\n\n/**\n * Your ExpenseImporter object will be instantiated and called as such:\n * ExpenseImporter obj = new ExpenseImporter();\n * Object param_1 = obj.importExpenses(String csvContent);\n */",
      "python": "class ExpenseImporter:\n\n    def __init__(self):\n        pass\n\n    def importExpenses(self, *args, **kwargs):\n        pass\n\n# Your ExpenseImporter object will be instantiated and called as such:\n# obj = ExpenseImporter()\n",
      "javascript": "class ExpenseImporter {\n    constructor() {\n        \n    }\n\n    importExpenses(...args) {\n        \n    }\n}\n\n/**\n * Your ExpenseImporter object will be instantiated and called as such:\n * const obj = new ExpenseImporter();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Expense Importer\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-alert-router",
    "number": 37,
    "title": "Refactor Alert Router",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Medium",
    "topics": [
      "Coupling and Cohesion"
    ],
    "narrative": "Refactor a tightly coupled AlertRouter by introducing high cohesion severity handlers and loosely coupled event emitters.",
    "className": "AlertRouter",
    "constructorSig": "public AlertRouter()",
    "methods": [
      {
        "sig": "public void routeAlert(Alert alert)",
        "desc": "routes alert based on severity to registered listeners."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new AlertRouter()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new AlertRouter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new AlertRouter()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Refactor a tightly coupled AlertRouter by introducing high cohesion severity handlers and loosely coupled event emitters.\n\n### Implement the `AlertRouter` class:\n\n- `AlertRouter()` creates an initialized instance.\n- `void routeAlert(Alert alert)` routes alert based on severity to registered listeners.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new AlertRouter()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class AlertRouter\n\nclass AlertRouter {\n    public AlertRouter() {\n        \n    }\n\n    public void routeAlert(Alert alert) {\n        \n    }\n}\n\n/**\n * Your AlertRouter object will be instantiated and called as such:\n * AlertRouter obj = new AlertRouter();\n * Object param_1 = obj.routeAlert(Alert alert);\n */",
      "python": "class AlertRouter:\n\n    def __init__(self):\n        pass\n\n    def routeAlert(self, *args, **kwargs):\n        pass\n\n# Your AlertRouter object will be instantiated and called as such:\n# obj = AlertRouter()\n",
      "javascript": "class AlertRouter {\n    constructor() {\n        \n    }\n\n    routeAlert(...args) {\n        \n    }\n}\n\n/**\n * Your AlertRouter object will be instantiated and called as such:\n * const obj = new AlertRouter();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Alert Router\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-payment-terminal",
    "number": 38,
    "title": "Refactor Payment Terminal",
    "category": "design-principles",
    "categoryTitle": "Design Principles",
    "difficulty": "Medium",
    "topics": [
      "Coupling and Cohesion"
    ],
    "narrative": "Decouple payment hardware terminal drivers from business billing workflows using clear payment gateway abstractions.",
    "className": "PaymentTerminal",
    "constructorSig": "public PaymentTerminal(PaymentGateway gateway)",
    "methods": [
      {
        "sig": "public boolean processCardSwipe(CardData card, double amount)",
        "desc": "processes card transaction loosely coupled from gateway."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PaymentTerminal()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PaymentTerminal()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PaymentTerminal()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Decouple payment hardware terminal drivers from business billing workflows using clear payment gateway abstractions.\n\n### Implement the `PaymentTerminal` class:\n\n- `PaymentTerminal(PaymentGateway gateway)` creates an initialized instance.\n- `boolean processCardSwipe(CardData card, double amount)` processes card transaction loosely coupled from gateway.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PaymentTerminal()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PaymentTerminal\n\nclass PaymentTerminal {\n    public PaymentTerminal(PaymentGateway gateway) {\n        \n    }\n\n    public boolean processCardSwipe(CardData card, double amount) {\n        \n    }\n}\n\n/**\n * Your PaymentTerminal object will be instantiated and called as such:\n * PaymentTerminal obj = new PaymentTerminal();\n * Object param_1 = obj.processCardSwipe(CardData card, double amount);\n */",
      "python": "class PaymentTerminal:\n\n    def __init__(self):\n        pass\n\n    def processCardSwipe(self, *args, **kwargs):\n        pass\n\n# Your PaymentTerminal object will be instantiated and called as such:\n# obj = PaymentTerminal()\n",
      "javascript": "class PaymentTerminal {\n    constructor() {\n        \n    }\n\n    processCardSwipe(...args) {\n        \n    }\n}\n\n/**\n * Your PaymentTerminal object will be instantiated and called as such:\n * const obj = new PaymentTerminal();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Payment Terminal\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-order-processing",
    "number": 39,
    "title": "Refactor Order Processing",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Easy",
    "topics": [
      "Single Responsibility"
    ],
    "narrative": "Decompose a God class that validates order, updates inventory, charges card, sends email, and logs stats into distinct single-responsibility classes.",
    "className": "OrderProcessor",
    "constructorSig": "public OrderProcessor(InventoryService inventory, PaymentGateway payment, EmailService email)",
    "methods": [
      {
        "sig": "public boolean processOrder(Order order)",
        "desc": "delegates each step to dedicated responsibility handler."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new OrderProcessor()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new OrderProcessor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new OrderProcessor()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Decompose a God class that validates order, updates inventory, charges card, sends email, and logs stats into distinct single-responsibility classes.\n\n### Implement the `OrderProcessor` class:\n\n- `OrderProcessor(InventoryService inventory, PaymentGateway payment, EmailService email)` creates an initialized instance.\n- `boolean processOrder(Order order)` delegates each step to dedicated responsibility handler.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new OrderProcessor()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class OrderProcessor\n\nclass OrderProcessor {\n    public OrderProcessor(InventoryService inventory, PaymentGateway payment, EmailService email) {\n        \n    }\n\n    public boolean processOrder(Order order) {\n        \n    }\n}\n\n/**\n * Your OrderProcessor object will be instantiated and called as such:\n * OrderProcessor obj = new OrderProcessor();\n * Object param_1 = obj.processOrder(Order order);\n */",
      "python": "class OrderProcessor:\n\n    def __init__(self):\n        pass\n\n    def processOrder(self, *args, **kwargs):\n        pass\n\n# Your OrderProcessor object will be instantiated and called as such:\n# obj = OrderProcessor()\n",
      "javascript": "class OrderProcessor {\n    constructor() {\n        \n    }\n\n    processOrder(...args) {\n        \n    }\n}\n\n/**\n * Your OrderProcessor object will be instantiated and called as such:\n * const obj = new OrderProcessor();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Order Processing\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "extend-grading-policy",
    "number": 40,
    "title": "Extend Grading Policy",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Easy",
    "topics": [
      "Open-Closed"
    ],
    "narrative": "Refactor an if-else grading calculator so new grading policies (Pass/Fail, Letter Grade, Curved Grade) can be added without modifying existing code (OCP).",
    "className": "GradingPolicyEngine",
    "constructorSig": "public GradingPolicyEngine()",
    "methods": [
      {
        "sig": "public String computeGrade(double score, GradingPolicy policy)",
        "desc": "applies polymorphic grading policy without modifying engine."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new GradingPolicyEngine()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new GradingPolicyEngine()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new GradingPolicyEngine()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Refactor an if-else grading calculator so new grading policies (Pass/Fail, Letter Grade, Curved Grade) can be added without modifying existing code (OCP).\n\n### Implement the `GradingPolicyEngine` class:\n\n- `GradingPolicyEngine()` creates an initialized instance.\n- `String computeGrade(double score, GradingPolicy policy)` applies polymorphic grading policy without modifying engine.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new GradingPolicyEngine()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class GradingPolicyEngine\n\nclass GradingPolicyEngine {\n    public GradingPolicyEngine() {\n        \n    }\n\n    public String computeGrade(double score, GradingPolicy policy) {\n        \n    }\n}\n\n/**\n * Your GradingPolicyEngine object will be instantiated and called as such:\n * GradingPolicyEngine obj = new GradingPolicyEngine();\n * Object param_1 = obj.computeGrade(double score, GradingPolicy policy);\n */",
      "python": "class GradingPolicyEngine:\n\n    def __init__(self):\n        pass\n\n    def computeGrade(self, *args, **kwargs):\n        pass\n\n# Your GradingPolicyEngine object will be instantiated and called as such:\n# obj = GradingPolicyEngine()\n",
      "javascript": "class GradingPolicyEngine {\n    constructor() {\n        \n    }\n\n    computeGrade(...args) {\n        \n    }\n}\n\n/**\n * Your GradingPolicyEngine object will be instantiated and called as such:\n * const obj = new GradingPolicyEngine();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Extend Grading Policy\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "repair-payment-contract",
    "number": 41,
    "title": "Repair a Payment Contract",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Easy",
    "topics": [
      "Liskov-Substitution"
    ],
    "narrative": "Fix a Liskov Substitution violation where CryptoPayment threw UnsupportedOperationException on refund() by creating RefundablePayment interface.",
    "className": "PaymentCoordinator",
    "constructorSig": "public PaymentCoordinator()",
    "methods": [
      {
        "sig": "public boolean refundIfSupported(PaymentMethod payment, double amount)",
        "desc": "guarantees substitutability of payment subtypes."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PaymentCoordinator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PaymentCoordinator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PaymentCoordinator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Fix a Liskov Substitution violation where CryptoPayment threw UnsupportedOperationException on refund() by creating RefundablePayment interface.\n\n### Implement the `PaymentCoordinator` class:\n\n- `PaymentCoordinator()` creates an initialized instance.\n- `boolean refundIfSupported(PaymentMethod payment, double amount)` guarantees substitutability of payment subtypes.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PaymentCoordinator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PaymentCoordinator\n\nclass PaymentCoordinator {\n    public PaymentCoordinator() {\n        \n    }\n\n    public boolean refundIfSupported(PaymentMethod payment, double amount) {\n        \n    }\n}\n\n/**\n * Your PaymentCoordinator object will be instantiated and called as such:\n * PaymentCoordinator obj = new PaymentCoordinator();\n * Object param_1 = obj.refundIfSupported(PaymentMethod payment, double amount);\n */",
      "python": "class PaymentCoordinator:\n\n    def __init__(self):\n        pass\n\n    def refundIfSupported(self, *args, **kwargs):\n        pass\n\n# Your PaymentCoordinator object will be instantiated and called as such:\n# obj = PaymentCoordinator()\n",
      "javascript": "class PaymentCoordinator {\n    constructor() {\n        \n    }\n\n    refundIfSupported(...args) {\n        \n    }\n}\n\n/**\n * Your PaymentCoordinator object will be instantiated and called as such:\n * const obj = new PaymentCoordinator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Repair a Payment Contract\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-plugin-lifecycle-hooks",
    "number": 42,
    "title": "Refactor Plugin Lifecycle Hooks",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Easy",
    "topics": [
      "Interface Segregation"
    ],
    "narrative": "Split a bloated 10-method Plugin interface into fine-grained StartablePlugin, ConfigurablePlugin, and RenderablePlugin interfaces (ISP).",
    "className": "PluginManager",
    "constructorSig": "public PluginManager()",
    "methods": [
      {
        "sig": "public void startPlugins(java.util.List<StartablePlugin> plugins)",
        "desc": "runs start hook only for plugins implementing Startable."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PluginManager()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PluginManager()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PluginManager()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Split a bloated 10-method Plugin interface into fine-grained StartablePlugin, ConfigurablePlugin, and RenderablePlugin interfaces (ISP).\n\n### Implement the `PluginManager` class:\n\n- `PluginManager()` creates an initialized instance.\n- `void startPlugins(java.util.List<StartablePlugin> plugins)` runs start hook only for plugins implementing Startable.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PluginManager()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PluginManager\n\nclass PluginManager {\n    public PluginManager() {\n        \n    }\n\n    public void startPlugins(java.util.List<StartablePlugin> plugins) {\n        \n    }\n}\n\n/**\n * Your PluginManager object will be instantiated and called as such:\n * PluginManager obj = new PluginManager();\n * Object param_1 = obj.startPlugins(java.util.List<StartablePlugin> plugins);\n */",
      "python": "class PluginManager:\n\n    def __init__(self):\n        pass\n\n    def startPlugins(self, *args, **kwargs):\n        pass\n\n# Your PluginManager object will be instantiated and called as such:\n# obj = PluginManager()\n",
      "javascript": "class PluginManager {\n    constructor() {\n        \n    }\n\n    startPlugins(...args) {\n        \n    }\n}\n\n/**\n * Your PluginManager object will be instantiated and called as such:\n * const obj = new PluginManager();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Plugin Lifecycle Hooks\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "simplify-counter-panel",
    "number": 43,
    "title": "Simplify a Counter Panel",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Medium",
    "topics": [
      "Single Responsibility"
    ],
    "narrative": "Separate UI state tracking from persistence and audit analytics in a dashboard counter component.",
    "className": "CounterPanel",
    "constructorSig": "public CounterPanel()",
    "methods": [
      {
        "sig": "public void increment()",
        "desc": "mutates count state while notifying listener."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new CounterPanel()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CounterPanel()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new CounterPanel()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Separate UI state tracking from persistence and audit analytics in a dashboard counter component.\n\n### Implement the `CounterPanel` class:\n\n- `CounterPanel()` creates an initialized instance.\n- `void increment()` mutates count state while notifying listener.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new CounterPanel()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class CounterPanel\n\nclass CounterPanel {\n    public CounterPanel() {\n        \n    }\n\n    public void increment() {\n        \n    }\n}\n\n/**\n * Your CounterPanel object will be instantiated and called as such:\n * CounterPanel obj = new CounterPanel();\n * Object param_1 = obj.increment();\n */",
      "python": "class CounterPanel:\n\n    def __init__(self):\n        pass\n\n    def increment(self, *args, **kwargs):\n        pass\n\n# Your CounterPanel object will be instantiated and called as such:\n# obj = CounterPanel()\n",
      "javascript": "class CounterPanel {\n    constructor() {\n        \n    }\n\n    increment(...args) {\n        \n    }\n}\n\n/**\n * Your CounterPanel object will be instantiated and called as such:\n * const obj = new CounterPanel();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Simplify a Counter Panel\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-text-pipeline",
    "number": 44,
    "title": "Refactor a Text Pipeline",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Medium",
    "topics": [
      "Open-Closed"
    ],
    "narrative": "Design a text processing pipeline extensible with new filters (e.g. StemmingFilter, StopWordFilter) without modifying pipeline core.",
    "className": "TextPipeline",
    "constructorSig": "public TextPipeline()",
    "methods": [
      {
        "sig": "public void addFilter(TextFilter filter)",
        "desc": "extends pipeline open for extension."
      },
      {
        "sig": "public String process(String rawText)",
        "desc": "executes filters closed for modification."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TextPipeline()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TextPipeline()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TextPipeline()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a text processing pipeline extensible with new filters (e.g. StemmingFilter, StopWordFilter) without modifying pipeline core.\n\n### Implement the `TextPipeline` class:\n\n- `TextPipeline()` creates an initialized instance.\n- `void addFilter(TextFilter filter)` extends pipeline open for extension.\n- `String process(String rawText)` executes filters closed for modification.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TextPipeline()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TextPipeline\n\nclass TextPipeline {\n    public TextPipeline() {\n        \n    }\n\n    public void addFilter(TextFilter filter) {\n        \n    }\n\n    public String process(String rawText) {\n        \n    }\n}\n\n/**\n * Your TextPipeline object will be instantiated and called as such:\n * TextPipeline obj = new TextPipeline();\n * Object param_1 = obj.addFilter(TextFilter filter);\n * Object param_2 = obj.process(String rawText);\n */",
      "python": "class TextPipeline:\n\n    def __init__(self):\n        pass\n\n    def addFilter(self, *args, **kwargs):\n        pass\n\n    def process(self, *args, **kwargs):\n        pass\n\n# Your TextPipeline object will be instantiated and called as such:\n# obj = TextPipeline()\n",
      "javascript": "class TextPipeline {\n    constructor() {\n        \n    }\n\n    addFilter(...args) {\n        \n    }\n\n    process(...args) {\n        \n    }\n}\n\n/**\n * Your TextPipeline object will be instantiated and called as such:\n * const obj = new TextPipeline();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor a Text Pipeline\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "repair-document-contract",
    "number": 45,
    "title": "Repair a Document Contract",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Medium",
    "topics": [
      "Liskov-Substitution"
    ],
    "narrative": "Resolve the classic ReadOnlyDocument vs EditableDocument subtype violation by segregating read and write contracts.",
    "className": "DocumentEditor",
    "constructorSig": "public DocumentEditor()",
    "methods": [
      {
        "sig": "public void edit(EditableDocument doc, String text)",
        "desc": "accepts only valid editable document subtypes."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new DocumentEditor()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DocumentEditor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new DocumentEditor()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Resolve the classic ReadOnlyDocument vs EditableDocument subtype violation by segregating read and write contracts.\n\n### Implement the `DocumentEditor` class:\n\n- `DocumentEditor()` creates an initialized instance.\n- `void edit(EditableDocument doc, String text)` accepts only valid editable document subtypes.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new DocumentEditor()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class DocumentEditor\n\nclass DocumentEditor {\n    public DocumentEditor() {\n        \n    }\n\n    public void edit(EditableDocument doc, String text) {\n        \n    }\n}\n\n/**\n * Your DocumentEditor object will be instantiated and called as such:\n * DocumentEditor obj = new DocumentEditor();\n * Object param_1 = obj.edit(EditableDocument doc, String text);\n */",
      "python": "class DocumentEditor:\n\n    def __init__(self):\n        pass\n\n    def edit(self, *args, **kwargs):\n        pass\n\n# Your DocumentEditor object will be instantiated and called as such:\n# obj = DocumentEditor()\n",
      "javascript": "class DocumentEditor {\n    constructor() {\n        \n    }\n\n    edit(...args) {\n        \n    }\n}\n\n/**\n * Your DocumentEditor object will be instantiated and called as such:\n * const obj = new DocumentEditor();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Repair a Document Contract\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-office-device-interface",
    "number": 46,
    "title": "Refactor an Office Device Interface",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Medium",
    "topics": [
      "Interface Segregation"
    ],
    "narrative": "Break MultiFunctionPrinter interface into Printer, Scanner, and Fax interfaces so basic printer classes don't implement dummy scan/fax methods.",
    "className": "OfficeDeviceHub",
    "constructorSig": "public OfficeDeviceHub()",
    "methods": [
      {
        "sig": "public void printDocument(Printer printer, String doc)",
        "desc": "depends strictly on Printer interface."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new OfficeDeviceHub()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new OfficeDeviceHub()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new OfficeDeviceHub()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Break MultiFunctionPrinter interface into Printer, Scanner, and Fax interfaces so basic printer classes don't implement dummy scan/fax methods.\n\n### Implement the `OfficeDeviceHub` class:\n\n- `OfficeDeviceHub()` creates an initialized instance.\n- `void printDocument(Printer printer, String doc)` depends strictly on Printer interface.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new OfficeDeviceHub()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class OfficeDeviceHub\n\nclass OfficeDeviceHub {\n    public OfficeDeviceHub() {\n        \n    }\n\n    public void printDocument(Printer printer, String doc) {\n        \n    }\n}\n\n/**\n * Your OfficeDeviceHub object will be instantiated and called as such:\n * OfficeDeviceHub obj = new OfficeDeviceHub();\n * Object param_1 = obj.printDocument(Printer printer, String doc);\n */",
      "python": "class OfficeDeviceHub:\n\n    def __init__(self):\n        pass\n\n    def printDocument(self, *args, **kwargs):\n        pass\n\n# Your OfficeDeviceHub object will be instantiated and called as such:\n# obj = OfficeDeviceHub()\n",
      "javascript": "class OfficeDeviceHub {\n    constructor() {\n        \n    }\n\n    printDocument(...args) {\n        \n    }\n}\n\n/**\n * Your OfficeDeviceHub object will be instantiated and called as such:\n * const obj = new OfficeDeviceHub();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor an Office Device Interface\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "narrow-report-dependencies",
    "number": 47,
    "title": "Narrow Report Dependencies",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Medium",
    "topics": [
      "Interface Segregation"
    ],
    "narrative": "Refactor ReportGenerator to depend on a narrow DataProvider interface rather than an entire full-featured DatabaseClient.",
    "className": "ReportGenerator",
    "constructorSig": "public ReportGenerator(DataProvider provider)",
    "methods": [
      {
        "sig": "public String generateSummary()",
        "desc": "fetches data through narrow provider."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ReportGenerator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ReportGenerator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ReportGenerator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Refactor ReportGenerator to depend on a narrow DataProvider interface rather than an entire full-featured DatabaseClient.\n\n### Implement the `ReportGenerator` class:\n\n- `ReportGenerator(DataProvider provider)` creates an initialized instance.\n- `String generateSummary()` fetches data through narrow provider.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ReportGenerator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ReportGenerator\n\nclass ReportGenerator {\n    public ReportGenerator(DataProvider provider) {\n        \n    }\n\n    public String generateSummary() {\n        \n    }\n}\n\n/**\n * Your ReportGenerator object will be instantiated and called as such:\n * ReportGenerator obj = new ReportGenerator();\n * Object param_1 = obj.generateSummary();\n */",
      "python": "class ReportGenerator:\n\n    def __init__(self):\n        pass\n\n    def generateSummary(self, *args, **kwargs):\n        pass\n\n# Your ReportGenerator object will be instantiated and called as such:\n# obj = ReportGenerator()\n",
      "javascript": "class ReportGenerator {\n    constructor() {\n        \n    }\n\n    generateSummary(...args) {\n        \n    }\n}\n\n/**\n * Your ReportGenerator object will be instantiated and called as such:\n * const obj = new ReportGenerator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Narrow Report Dependencies\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "refactor-member-signup",
    "number": 48,
    "title": "Refactor Member Signup",
    "category": "solid-principles",
    "categoryTitle": "SOLID Principles",
    "difficulty": "Hard",
    "topics": [
      "Single Responsibility"
    ],
    "narrative": "Design a clean pipeline orchestrating Validation, PasswordHashing, UserPersistence, WelcomeNotification, and MetricEmission.",
    "className": "MemberSignupService",
    "constructorSig": "public MemberSignupService()",
    "methods": [
      {
        "sig": "public SignupResult signup(SignupRequest request)",
        "desc": "orchestrates single responsibility collaborators."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new MemberSignupService()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new MemberSignupService()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new MemberSignupService()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a clean pipeline orchestrating Validation, PasswordHashing, UserPersistence, WelcomeNotification, and MetricEmission.\n\n### Implement the `MemberSignupService` class:\n\n- `MemberSignupService()` creates an initialized instance.\n- `SignupResult signup(SignupRequest request)` orchestrates single responsibility collaborators.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new MemberSignupService()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class MemberSignupService\n\nclass MemberSignupService {\n    public MemberSignupService() {\n        \n    }\n\n    public SignupResult signup(SignupRequest request) {\n        \n    }\n}\n\n/**\n * Your MemberSignupService object will be instantiated and called as such:\n * MemberSignupService obj = new MemberSignupService();\n * Object param_1 = obj.signup(SignupRequest request);\n */",
      "python": "class MemberSignupService:\n\n    def __init__(self):\n        pass\n\n    def signup(self, *args, **kwargs):\n        pass\n\n# Your MemberSignupService object will be instantiated and called as such:\n# obj = MemberSignupService()\n",
      "javascript": "class MemberSignupService {\n    constructor() {\n        \n    }\n\n    signup(...args) {\n        \n    }\n}\n\n/**\n * Your MemberSignupService object will be instantiated and called as such:\n * const obj = new MemberSignupService();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Refactor Member Signup\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-application-config",
    "number": 49,
    "title": "Design an Application Config",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Singleton"
    ],
    "narrative": "Design a thread-safe Singleton AppConfig class managing global environment settings across all modules.",
    "className": "AppConfig",
    "constructorSig": "public static AppConfig getInstance()",
    "methods": [
      {
        "sig": "public String get(String key)",
        "desc": "returns configuration property value."
      },
      {
        "sig": "public void set(String key, String value)",
        "desc": "updates configuration property."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new AppConfig()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new AppConfig()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new AppConfig()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a thread-safe Singleton AppConfig class managing global environment settings across all modules.\n\n### Implement the `AppConfig` class:\n\n- `static AppConfig getInstance()` creates an initialized instance.\n- `String get(String key)` returns configuration property value.\n- `void set(String key, String value)` updates configuration property.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new AppConfig()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class AppConfig\n\nclass AppConfig {\n    public static AppConfig getInstance() {\n        \n    }\n\n    public String get(String key) {\n        \n    }\n\n    public void set(String key, String value) {\n        \n    }\n}\n\n/**\n * Your AppConfig object will be instantiated and called as such:\n * AppConfig obj = new AppConfig();\n * Object param_1 = obj.get(String key);\n * Object param_2 = obj.set(String key, String value);\n */",
      "python": "class AppConfig:\n\n    def __init__(self):\n        pass\n\n    def get(self, *args, **kwargs):\n        pass\n\n    def set(self, *args, **kwargs):\n        pass\n\n# Your AppConfig object will be instantiated and called as such:\n# obj = AppConfig()\n",
      "javascript": "class AppConfig {\n    constructor() {\n        \n    }\n\n    get(...args) {\n        \n    }\n\n    set(...args) {\n        \n    }\n}\n\n/**\n * Your AppConfig object will be instantiated and called as such:\n * const obj = new AppConfig();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design an Application Config\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-shared-counter",
    "number": 50,
    "title": "Design a Shared Counter",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Singleton"
    ],
    "narrative": "Implement a thread-safe Singleton SharedCounter with lazy initialization and atomic count incrementation.",
    "className": "SharedCounter",
    "constructorSig": "public static SharedCounter getInstance()",
    "methods": [
      {
        "sig": "public int increment()",
        "desc": "increments and returns singleton count."
      },
      {
        "sig": "public int getCount()",
        "desc": "returns current singleton count."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new SharedCounter()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new SharedCounter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new SharedCounter()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement a thread-safe Singleton SharedCounter with lazy initialization and atomic count incrementation.\n\n### Implement the `SharedCounter` class:\n\n- `static SharedCounter getInstance()` creates an initialized instance.\n- `int increment()` increments and returns singleton count.\n- `int getCount()` returns current singleton count.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new SharedCounter()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class SharedCounter\n\nclass SharedCounter {\n    public static SharedCounter getInstance() {\n        \n    }\n\n    public int increment() {\n        \n    }\n\n    public int getCount() {\n        \n    }\n}\n\n/**\n * Your SharedCounter object will be instantiated and called as such:\n * SharedCounter obj = new SharedCounter();\n * Object param_1 = obj.increment();\n * Object param_2 = obj.getCount();\n */",
      "python": "class SharedCounter:\n\n    def __init__(self):\n        pass\n\n    def increment(self, *args, **kwargs):\n        pass\n\n    def getCount(self, *args, **kwargs):\n        pass\n\n# Your SharedCounter object will be instantiated and called as such:\n# obj = SharedCounter()\n",
      "javascript": "class SharedCounter {\n    constructor() {\n        \n    }\n\n    increment(...args) {\n        \n    }\n\n    getCount(...args) {\n        \n    }\n}\n\n/**\n * Your SharedCounter object will be instantiated and called as such:\n * const obj = new SharedCounter();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Shared Counter\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-builder-email",
    "number": 51,
    "title": "Implement Email Builder",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Builder"
    ],
    "narrative": "Implement the Builder pattern for constructing Email objects with optional recipients, cc, bcc, subject, body, and attachments.",
    "className": "EmailBuilder",
    "constructorSig": "public EmailBuilder()",
    "methods": [
      {
        "sig": "public EmailBuilder to(String recipient)",
        "desc": "sets primary recipient."
      },
      {
        "sig": "public EmailBuilder subject(String subject)",
        "desc": "sets email subject."
      },
      {
        "sig": "public EmailBuilder body(String body)",
        "desc": "sets email body."
      },
      {
        "sig": "public Email build()",
        "desc": "validates and instantiates immutable Email."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new EmailBuilder()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new EmailBuilder()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new EmailBuilder()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement the Builder pattern for constructing Email objects with optional recipients, cc, bcc, subject, body, and attachments.\n\n### Implement the `EmailBuilder` class:\n\n- `EmailBuilder()` creates an initialized instance.\n- `EmailBuilder to(String recipient)` sets primary recipient.\n- `EmailBuilder subject(String subject)` sets email subject.\n- `EmailBuilder body(String body)` sets email body.\n- `Email build()` validates and instantiates immutable Email.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new EmailBuilder()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class EmailBuilder\n\nclass EmailBuilder {\n    public EmailBuilder() {\n        \n    }\n\n    public EmailBuilder to(String recipient) {\n        \n    }\n\n    public EmailBuilder subject(String subject) {\n        \n    }\n\n    public EmailBuilder body(String body) {\n        \n    }\n\n    public Email build() {\n        \n    }\n}\n\n/**\n * Your EmailBuilder object will be instantiated and called as such:\n * EmailBuilder obj = new EmailBuilder();\n * Object param_1 = obj.to(String recipient);\n * Object param_2 = obj.subject(String subject);\n * Object param_3 = obj.body(String body);\n * Object param_4 = obj.build();\n */",
      "python": "class EmailBuilder:\n\n    def __init__(self):\n        pass\n\n    def to(self, *args, **kwargs):\n        pass\n\n    def subject(self, *args, **kwargs):\n        pass\n\n    def body(self, *args, **kwargs):\n        pass\n\n    def build(self, *args, **kwargs):\n        pass\n\n# Your EmailBuilder object will be instantiated and called as such:\n# obj = EmailBuilder()\n",
      "javascript": "class EmailBuilder {\n    constructor() {\n        \n    }\n\n    to(...args) {\n        \n    }\n\n    subject(...args) {\n        \n    }\n\n    body(...args) {\n        \n    }\n\n    build(...args) {\n        \n    }\n}\n\n/**\n * Your EmailBuilder object will be instantiated and called as such:\n * const obj = new EmailBuilder();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement Email Builder\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-shape-factory",
    "number": 52,
    "title": "Design Shape Factory",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Factory Method"
    ],
    "narrative": "Implement a Factory Method ShapeFactory producing Circle, Square, and Triangle instances based on string identifier.",
    "className": "ShapeFactory",
    "constructorSig": "public ShapeFactory()",
    "methods": [
      {
        "sig": "public Shape createShape(String shapeType)",
        "desc": "instantiates concrete Shape matching type."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ShapeFactory()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ShapeFactory()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ShapeFactory()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement a Factory Method ShapeFactory producing Circle, Square, and Triangle instances based on string identifier.\n\n### Implement the `ShapeFactory` class:\n\n- `ShapeFactory()` creates an initialized instance.\n- `Shape createShape(String shapeType)` instantiates concrete Shape matching type.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ShapeFactory()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ShapeFactory\n\nclass ShapeFactory {\n    public ShapeFactory() {\n        \n    }\n\n    public Shape createShape(String shapeType) {\n        \n    }\n}\n\n/**\n * Your ShapeFactory object will be instantiated and called as such:\n * ShapeFactory obj = new ShapeFactory();\n * Object param_1 = obj.createShape(String shapeType);\n */",
      "python": "class ShapeFactory:\n\n    def __init__(self):\n        pass\n\n    def createShape(self, *args, **kwargs):\n        pass\n\n# Your ShapeFactory object will be instantiated and called as such:\n# obj = ShapeFactory()\n",
      "javascript": "class ShapeFactory {\n    constructor() {\n        \n    }\n\n    createShape(...args) {\n        \n    }\n}\n\n/**\n * Your ShapeFactory object will be instantiated and called as such:\n * const obj = new ShapeFactory();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Shape Factory\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-enemy-spawner",
    "number": 53,
    "title": "Design an Enemy Spawner",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Prototype"
    ],
    "narrative": "Implement the Prototype pattern to clone complex Enemy game objects with deep copied equipment and stats.",
    "className": "EnemySpawner",
    "constructorSig": "public EnemySpawner(Enemy prototype)",
    "methods": [
      {
        "sig": "public Enemy spawn(int healthMultiplier)",
        "desc": "clones prototype enemy and applies stat modifier."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new EnemySpawner()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new EnemySpawner()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new EnemySpawner()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement the Prototype pattern to clone complex Enemy game objects with deep copied equipment and stats.\n\n### Implement the `EnemySpawner` class:\n\n- `EnemySpawner(Enemy prototype)` creates an initialized instance.\n- `Enemy spawn(int healthMultiplier)` clones prototype enemy and applies stat modifier.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new EnemySpawner()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class EnemySpawner\n\nclass EnemySpawner {\n    public EnemySpawner(Enemy prototype) {\n        \n    }\n\n    public Enemy spawn(int healthMultiplier) {\n        \n    }\n}\n\n/**\n * Your EnemySpawner object will be instantiated and called as such:\n * EnemySpawner obj = new EnemySpawner();\n * Object param_1 = obj.spawn(int healthMultiplier);\n */",
      "python": "class EnemySpawner:\n\n    def __init__(self):\n        pass\n\n    def spawn(self, *args, **kwargs):\n        pass\n\n# Your EnemySpawner object will be instantiated and called as such:\n# obj = EnemySpawner()\n",
      "javascript": "class EnemySpawner {\n    constructor() {\n        \n    }\n\n    spawn(...args) {\n        \n    }\n}\n\n/**\n * Your EnemySpawner object will be instantiated and called as such:\n * const obj = new EnemySpawner();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design an Enemy Spawner\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-id-generator",
    "number": 54,
    "title": "Design an ID Generator",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Singleton"
    ],
    "narrative": "Design a thread-safe distributed ID Generator singleton producing monotonic sequential Snowflake-style identifiers.",
    "className": "IdGenerator",
    "constructorSig": "public static IdGenerator getInstance()",
    "methods": [
      {
        "sig": "public long nextId()",
        "desc": "returns globally unique monotonic 64-bit ID."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new IdGenerator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new IdGenerator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new IdGenerator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a thread-safe distributed ID Generator singleton producing monotonic sequential Snowflake-style identifiers.\n\n### Implement the `IdGenerator` class:\n\n- `static IdGenerator getInstance()` creates an initialized instance.\n- `long nextId()` returns globally unique monotonic 64-bit ID.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new IdGenerator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class IdGenerator\n\nclass IdGenerator {\n    public static IdGenerator getInstance() {\n        \n    }\n\n    public long nextId() {\n        \n    }\n}\n\n/**\n * Your IdGenerator object will be instantiated and called as such:\n * IdGenerator obj = new IdGenerator();\n * Object param_1 = obj.nextId();\n */",
      "python": "class IdGenerator:\n\n    def __init__(self):\n        pass\n\n    def nextId(self, *args, **kwargs):\n        pass\n\n# Your IdGenerator object will be instantiated and called as such:\n# obj = IdGenerator()\n",
      "javascript": "class IdGenerator {\n    constructor() {\n        \n    }\n\n    nextId(...args) {\n        \n    }\n}\n\n/**\n * Your IdGenerator object will be instantiated and called as such:\n * const obj = new IdGenerator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design an ID Generator\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-report-builder",
    "number": 55,
    "title": "Implement a Report Builder",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Builder"
    ],
    "narrative": "Design a multi-step ReportBuilder and ReportDirector generating PDF, HTML, and CSV executive summary reports.",
    "className": "ReportBuilder",
    "constructorSig": "public ReportBuilder()",
    "methods": [
      {
        "sig": "public ReportBuilder setHeader(String header)",
        "desc": "sets report header."
      },
      {
        "sig": "public ReportBuilder addSection(String title, String content)",
        "desc": "appends section."
      },
      {
        "sig": "public Report build()",
        "desc": "builds report document."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ReportBuilder()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ReportBuilder()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ReportBuilder()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a multi-step ReportBuilder and ReportDirector generating PDF, HTML, and CSV executive summary reports.\n\n### Implement the `ReportBuilder` class:\n\n- `ReportBuilder()` creates an initialized instance.\n- `ReportBuilder setHeader(String header)` sets report header.\n- `ReportBuilder addSection(String title, String content)` appends section.\n- `Report build()` builds report document.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ReportBuilder()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ReportBuilder\n\nclass ReportBuilder {\n    public ReportBuilder() {\n        \n    }\n\n    public ReportBuilder setHeader(String header) {\n        \n    }\n\n    public ReportBuilder addSection(String title, String content) {\n        \n    }\n\n    public Report build() {\n        \n    }\n}\n\n/**\n * Your ReportBuilder object will be instantiated and called as such:\n * ReportBuilder obj = new ReportBuilder();\n * Object param_1 = obj.setHeader(String header);\n * Object param_2 = obj.addSection(String title, String content);\n * Object param_3 = obj.build();\n */",
      "python": "class ReportBuilder:\n\n    def __init__(self):\n        pass\n\n    def setHeader(self, *args, **kwargs):\n        pass\n\n    def addSection(self, *args, **kwargs):\n        pass\n\n    def build(self, *args, **kwargs):\n        pass\n\n# Your ReportBuilder object will be instantiated and called as such:\n# obj = ReportBuilder()\n",
      "javascript": "class ReportBuilder {\n    constructor() {\n        \n    }\n\n    setHeader(...args) {\n        \n    }\n\n    addSection(...args) {\n        \n    }\n\n    build(...args) {\n        \n    }\n}\n\n/**\n * Your ReportBuilder object will be instantiated and called as such:\n * const obj = new ReportBuilder();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement a Report Builder\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-plugin-system-factory",
    "number": 56,
    "title": "Design Plugin System",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Factory Method"
    ],
    "narrative": "Implement a Factory Method plugin registry where third-party developers register plugin factory creators by name.",
    "className": "PluginFactoryRegistry",
    "constructorSig": "public PluginFactoryRegistry()",
    "methods": [
      {
        "sig": "public void registerFactory(String name, PluginFactory factory)",
        "desc": "registers factory."
      },
      {
        "sig": "public Plugin createPlugin(String name)",
        "desc": "instantiates plugin instance."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PluginFactoryRegistry()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PluginFactoryRegistry()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PluginFactoryRegistry()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement a Factory Method plugin registry where third-party developers register plugin factory creators by name.\n\n### Implement the `PluginFactoryRegistry` class:\n\n- `PluginFactoryRegistry()` creates an initialized instance.\n- `void registerFactory(String name, PluginFactory factory)` registers factory.\n- `Plugin createPlugin(String name)` instantiates plugin instance.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PluginFactoryRegistry()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PluginFactoryRegistry\n\nclass PluginFactoryRegistry {\n    public PluginFactoryRegistry() {\n        \n    }\n\n    public void registerFactory(String name, PluginFactory factory) {\n        \n    }\n\n    public Plugin createPlugin(String name) {\n        \n    }\n}\n\n/**\n * Your PluginFactoryRegistry object will be instantiated and called as such:\n * PluginFactoryRegistry obj = new PluginFactoryRegistry();\n * Object param_1 = obj.registerFactory(String name, PluginFactory factory);\n * Object param_2 = obj.createPlugin(String name);\n */",
      "python": "class PluginFactoryRegistry:\n\n    def __init__(self):\n        pass\n\n    def registerFactory(self, *args, **kwargs):\n        pass\n\n    def createPlugin(self, *args, **kwargs):\n        pass\n\n# Your PluginFactoryRegistry object will be instantiated and called as such:\n# obj = PluginFactoryRegistry()\n",
      "javascript": "class PluginFactoryRegistry {\n    constructor() {\n        \n    }\n\n    registerFactory(...args) {\n        \n    }\n\n    createPlugin(...args) {\n        \n    }\n}\n\n/**\n * Your PluginFactoryRegistry object will be instantiated and called as such:\n * const obj = new PluginFactoryRegistry();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Plugin System\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-factory-theme",
    "number": 57,
    "title": "Design Theme Factory",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Abstract Factory"
    ],
    "narrative": "Implement an Abstract Factory GUIThemeFactory creating matching families of Buttons, TextBoxes, and ScrollBars for Dark and Light themes.",
    "className": "ThemeFactory",
    "constructorSig": "public static GUIThemeFactory getFactory(String theme)",
    "methods": [
      {
        "sig": "public Button createButton()",
        "desc": "creates theme button."
      },
      {
        "sig": "public TextBox createTextBox()",
        "desc": "creates theme text box."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ThemeFactory()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ThemeFactory()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ThemeFactory()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement an Abstract Factory GUIThemeFactory creating matching families of Buttons, TextBoxes, and ScrollBars for Dark and Light themes.\n\n### Implement the `ThemeFactory` class:\n\n- `static GUIThemeFactory getFactory(String theme)` creates an initialized instance.\n- `Button createButton()` creates theme button.\n- `TextBox createTextBox()` creates theme text box.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ThemeFactory()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ThemeFactory\n\nclass ThemeFactory {\n    public static GUIThemeFactory getFactory(String theme) {\n        \n    }\n\n    public Button createButton() {\n        \n    }\n\n    public TextBox createTextBox() {\n        \n    }\n}\n\n/**\n * Your ThemeFactory object will be instantiated and called as such:\n * ThemeFactory obj = new ThemeFactory();\n * Object param_1 = obj.createButton();\n * Object param_2 = obj.createTextBox();\n */",
      "python": "class ThemeFactory:\n\n    def __init__(self):\n        pass\n\n    def createButton(self, *args, **kwargs):\n        pass\n\n    def createTextBox(self, *args, **kwargs):\n        pass\n\n# Your ThemeFactory object will be instantiated and called as such:\n# obj = ThemeFactory()\n",
      "javascript": "class ThemeFactory {\n    constructor() {\n        \n    }\n\n    createButton(...args) {\n        \n    }\n\n    createTextBox(...args) {\n        \n    }\n}\n\n/**\n * Your ThemeFactory object will be instantiated and called as such:\n * const obj = new ThemeFactory();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Theme Factory\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-widget-palette",
    "number": 58,
    "title": "Design a Widget Palette",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Prototype"
    ],
    "narrative": "Implement a Prototype registry storing configured UI Widget templates (Button, Slider, Card) cloned during drag-and-drop operations.",
    "className": "WidgetPalette",
    "constructorSig": "public WidgetPalette()",
    "methods": [
      {
        "sig": "public void registerPrototype(String name, Widget prototype)",
        "desc": "saves prototype."
      },
      {
        "sig": "public Widget cloneWidget(String name)",
        "desc": "returns deep copy of widget."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new WidgetPalette()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new WidgetPalette()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new WidgetPalette()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement a Prototype registry storing configured UI Widget templates (Button, Slider, Card) cloned during drag-and-drop operations.\n\n### Implement the `WidgetPalette` class:\n\n- `WidgetPalette()` creates an initialized instance.\n- `void registerPrototype(String name, Widget prototype)` saves prototype.\n- `Widget cloneWidget(String name)` returns deep copy of widget.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new WidgetPalette()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class WidgetPalette\n\nclass WidgetPalette {\n    public WidgetPalette() {\n        \n    }\n\n    public void registerPrototype(String name, Widget prototype) {\n        \n    }\n\n    public Widget cloneWidget(String name) {\n        \n    }\n}\n\n/**\n * Your WidgetPalette object will be instantiated and called as such:\n * WidgetPalette obj = new WidgetPalette();\n * Object param_1 = obj.registerPrototype(String name, Widget prototype);\n * Object param_2 = obj.cloneWidget(String name);\n */",
      "python": "class WidgetPalette:\n\n    def __init__(self):\n        pass\n\n    def registerPrototype(self, *args, **kwargs):\n        pass\n\n    def cloneWidget(self, *args, **kwargs):\n        pass\n\n# Your WidgetPalette object will be instantiated and called as such:\n# obj = WidgetPalette()\n",
      "javascript": "class WidgetPalette {\n    constructor() {\n        \n    }\n\n    registerPrototype(...args) {\n        \n    }\n\n    cloneWidget(...args) {\n        \n    }\n}\n\n/**\n * Your WidgetPalette object will be instantiated and called as such:\n * const obj = new WidgetPalette();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Widget Palette\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-pizza-builder-and-director",
    "number": 59,
    "title": "Implement a Pizza Builder and Director",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Builder"
    ],
    "narrative": "Implement PizzaBuilder with PizzaDirector orchestrating predefined recipes (Margherita, Pepperoni, BBQ Chicken).",
    "className": "PizzaDirector",
    "constructorSig": "public PizzaDirector(PizzaBuilder builder)",
    "methods": [
      {
        "sig": "public Pizza constructMargherita()",
        "desc": "directs construction of Margherita pizza."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PizzaDirector()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PizzaDirector()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PizzaDirector()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement PizzaBuilder with PizzaDirector orchestrating predefined recipes (Margherita, Pepperoni, BBQ Chicken).\n\n### Implement the `PizzaDirector` class:\n\n- `PizzaDirector(PizzaBuilder builder)` creates an initialized instance.\n- `Pizza constructMargherita()` directs construction of Margherita pizza.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PizzaDirector()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PizzaDirector\n\nclass PizzaDirector {\n    public PizzaDirector(PizzaBuilder builder) {\n        \n    }\n\n    public Pizza constructMargherita() {\n        \n    }\n}\n\n/**\n * Your PizzaDirector object will be instantiated and called as such:\n * PizzaDirector obj = new PizzaDirector();\n * Object param_1 = obj.constructMargherita();\n */",
      "python": "class PizzaDirector:\n\n    def __init__(self):\n        pass\n\n    def constructMargherita(self, *args, **kwargs):\n        pass\n\n# Your PizzaDirector object will be instantiated and called as such:\n# obj = PizzaDirector()\n",
      "javascript": "class PizzaDirector {\n    constructor() {\n        \n    }\n\n    constructMargherita(...args) {\n        \n    }\n}\n\n/**\n * Your PizzaDirector object will be instantiated and called as such:\n * const obj = new PizzaDirector();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement a Pizza Builder and Director\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-cloud-provider-factory",
    "number": 60,
    "title": "Design Cloud Provider Factory",
    "category": "creational-patterns",
    "categoryTitle": "Creational Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Abstract Factory"
    ],
    "narrative": "Implement an Abstract Factory CloudProviderFactory producing ComputeInstance, ObjectStorage, and RelationalDB for AWS, GCP, and Azure.",
    "className": "CloudProviderFactory",
    "constructorSig": "public static CloudFactory getProvider(String cloudName)",
    "methods": [
      {
        "sig": "public ComputeInstance createCompute()",
        "desc": "creates cloud VM."
      },
      {
        "sig": "public ObjectStorage createStorage()",
        "desc": "creates cloud storage bucket."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new CloudProviderFactory()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CloudProviderFactory()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new CloudProviderFactory()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement an Abstract Factory CloudProviderFactory producing ComputeInstance, ObjectStorage, and RelationalDB for AWS, GCP, and Azure.\n\n### Implement the `CloudProviderFactory` class:\n\n- `static CloudFactory getProvider(String cloudName)` creates an initialized instance.\n- `ComputeInstance createCompute()` creates cloud VM.\n- `ObjectStorage createStorage()` creates cloud storage bucket.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new CloudProviderFactory()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class CloudProviderFactory\n\nclass CloudProviderFactory {\n    public static CloudFactory getProvider(String cloudName) {\n        \n    }\n\n    public ComputeInstance createCompute() {\n        \n    }\n\n    public ObjectStorage createStorage() {\n        \n    }\n}\n\n/**\n * Your CloudProviderFactory object will be instantiated and called as such:\n * CloudProviderFactory obj = new CloudProviderFactory();\n * Object param_1 = obj.createCompute();\n * Object param_2 = obj.createStorage();\n */",
      "python": "class CloudProviderFactory:\n\n    def __init__(self):\n        pass\n\n    def createCompute(self, *args, **kwargs):\n        pass\n\n    def createStorage(self, *args, **kwargs):\n        pass\n\n# Your CloudProviderFactory object will be instantiated and called as such:\n# obj = CloudProviderFactory()\n",
      "javascript": "class CloudProviderFactory {\n    constructor() {\n        \n    }\n\n    createCompute(...args) {\n        \n    }\n\n    createStorage(...args) {\n        \n    }\n}\n\n/**\n * Your CloudProviderFactory object will be instantiated and called as such:\n * const obj = new CloudProviderFactory();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Cloud Provider Factory\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-temperature-adapter",
    "number": 61,
    "title": "Implement Temperature Adapter",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Adapter"
    ],
    "narrative": "Implement an Adapter converting a legacy Fahrenheit temperature sensor output to the modern Celsius-based WeatherStation interface.",
    "className": "FahrenheitToCelsiusAdapter",
    "constructorSig": "public FahrenheitToCelsiusAdapter(FahrenheitSensor sensor)",
    "methods": [
      {
        "sig": "public double getTemperatureCelsius()",
        "desc": "reads Fahrenheit and converts: (F - 32) * 5 / 9."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new FahrenheitToCelsiusAdapter()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new FahrenheitToCelsiusAdapter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new FahrenheitToCelsiusAdapter()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement an Adapter converting a legacy Fahrenheit temperature sensor output to the modern Celsius-based WeatherStation interface.\n\n### Implement the `FahrenheitToCelsiusAdapter` class:\n\n- `FahrenheitToCelsiusAdapter(FahrenheitSensor sensor)` creates an initialized instance.\n- `double getTemperatureCelsius()` reads Fahrenheit and converts: (F - 32) * 5 / 9.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new FahrenheitToCelsiusAdapter()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class FahrenheitToCelsiusAdapter\n\nclass FahrenheitToCelsiusAdapter {\n    public FahrenheitToCelsiusAdapter(FahrenheitSensor sensor) {\n        \n    }\n\n    public double getTemperatureCelsius() {\n        \n    }\n}\n\n/**\n * Your FahrenheitToCelsiusAdapter object will be instantiated and called as such:\n * FahrenheitToCelsiusAdapter obj = new FahrenheitToCelsiusAdapter();\n * Object param_1 = obj.getTemperatureCelsius();\n */",
      "python": "class FahrenheitToCelsiusAdapter:\n\n    def __init__(self):\n        pass\n\n    def getTemperatureCelsius(self, *args, **kwargs):\n        pass\n\n# Your FahrenheitToCelsiusAdapter object will be instantiated and called as such:\n# obj = FahrenheitToCelsiusAdapter()\n",
      "javascript": "class FahrenheitToCelsiusAdapter {\n    constructor() {\n        \n    }\n\n    getTemperatureCelsius(...args) {\n        \n    }\n}\n\n/**\n * Your FahrenheitToCelsiusAdapter object will be instantiated and called as such:\n * const obj = new FahrenheitToCelsiusAdapter();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement Temperature Adapter\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-pizza-topping-decorators",
    "number": 62,
    "title": "Implement Pizza Topping Decorators",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Decorator"
    ],
    "narrative": "Implement Decorator pattern wrapping a BasePizza with CheeseDecorator, MushroomDecorator, and JalapenoDecorator augmenting cost and description.",
    "className": "PizzaDecoratorDemo",
    "constructorSig": "public PizzaDecoratorDemo()",
    "methods": [
      {
        "sig": "public double calculatePrice(Pizza pizza)",
        "desc": "returns total decorated price."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PizzaDecoratorDemo()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PizzaDecoratorDemo()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PizzaDecoratorDemo()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Decorator pattern wrapping a BasePizza with CheeseDecorator, MushroomDecorator, and JalapenoDecorator augmenting cost and description.\n\n### Implement the `PizzaDecoratorDemo` class:\n\n- `PizzaDecoratorDemo()` creates an initialized instance.\n- `double calculatePrice(Pizza pizza)` returns total decorated price.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PizzaDecoratorDemo()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PizzaDecoratorDemo\n\nclass PizzaDecoratorDemo {\n    public PizzaDecoratorDemo() {\n        \n    }\n\n    public double calculatePrice(Pizza pizza) {\n        \n    }\n}\n\n/**\n * Your PizzaDecoratorDemo object will be instantiated and called as such:\n * PizzaDecoratorDemo obj = new PizzaDecoratorDemo();\n * Object param_1 = obj.calculatePrice(Pizza pizza);\n */",
      "python": "class PizzaDecoratorDemo:\n\n    def __init__(self):\n        pass\n\n    def calculatePrice(self, *args, **kwargs):\n        pass\n\n# Your PizzaDecoratorDemo object will be instantiated and called as such:\n# obj = PizzaDecoratorDemo()\n",
      "javascript": "class PizzaDecoratorDemo {\n    constructor() {\n        \n    }\n\n    calculatePrice(...args) {\n        \n    }\n}\n\n/**\n * Your PizzaDecoratorDemo object will be instantiated and called as such:\n * const obj = new PizzaDecoratorDemo();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement Pizza Topping Decorators\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-legacy-payment-adapter",
    "number": 63,
    "title": "Implement a Legacy Payment Adapter",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Adapter"
    ],
    "narrative": "Implement an Adapter mapping the modern UnifiedPaymentProcessor API to an old XML-based LegacyBankingGateway.",
    "className": "LegacyPaymentAdapter",
    "constructorSig": "public LegacyPaymentAdapter(LegacyBankService legacyService)",
    "methods": [
      {
        "sig": "public PaymentResponse pay(PaymentRequest request)",
        "desc": "adapts JSON DTO to legacy XML contract."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new LegacyPaymentAdapter()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new LegacyPaymentAdapter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new LegacyPaymentAdapter()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement an Adapter mapping the modern UnifiedPaymentProcessor API to an old XML-based LegacyBankingGateway.\n\n### Implement the `LegacyPaymentAdapter` class:\n\n- `LegacyPaymentAdapter(LegacyBankService legacyService)` creates an initialized instance.\n- `PaymentResponse pay(PaymentRequest request)` adapts JSON DTO to legacy XML contract.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new LegacyPaymentAdapter()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class LegacyPaymentAdapter\n\nclass LegacyPaymentAdapter {\n    public LegacyPaymentAdapter(LegacyBankService legacyService) {\n        \n    }\n\n    public PaymentResponse pay(PaymentRequest request) {\n        \n    }\n}\n\n/**\n * Your LegacyPaymentAdapter object will be instantiated and called as such:\n * LegacyPaymentAdapter obj = new LegacyPaymentAdapter();\n * Object param_1 = obj.pay(PaymentRequest request);\n */",
      "python": "class LegacyPaymentAdapter:\n\n    def __init__(self):\n        pass\n\n    def pay(self, *args, **kwargs):\n        pass\n\n# Your LegacyPaymentAdapter object will be instantiated and called as such:\n# obj = LegacyPaymentAdapter()\n",
      "javascript": "class LegacyPaymentAdapter {\n    constructor() {\n        \n    }\n\n    pay(...args) {\n        \n    }\n}\n\n/**\n * Your LegacyPaymentAdapter object will be instantiated and called as such:\n * const obj = new LegacyPaymentAdapter();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement a Legacy Payment Adapter\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-notification-adapter",
    "number": 64,
    "title": "Implement Notification Adapter",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Adapter"
    ],
    "narrative": "Adapt third-party Twilio and SendGrid SDKs to implement our internal UnifiedNotificationService interface.",
    "className": "TwilioNotificationAdapter",
    "constructorSig": "public TwilioNotificationAdapter(TwilioClient client)",
    "methods": [
      {
        "sig": "public boolean send(String to, String msg)",
        "desc": "adapts to Twilio SMS API."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TwilioNotificationAdapter()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TwilioNotificationAdapter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TwilioNotificationAdapter()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Adapt third-party Twilio and SendGrid SDKs to implement our internal UnifiedNotificationService interface.\n\n### Implement the `TwilioNotificationAdapter` class:\n\n- `TwilioNotificationAdapter(TwilioClient client)` creates an initialized instance.\n- `boolean send(String to, String msg)` adapts to Twilio SMS API.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TwilioNotificationAdapter()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TwilioNotificationAdapter\n\nclass TwilioNotificationAdapter {\n    public TwilioNotificationAdapter(TwilioClient client) {\n        \n    }\n\n    public boolean send(String to, String msg) {\n        \n    }\n}\n\n/**\n * Your TwilioNotificationAdapter object will be instantiated and called as such:\n * TwilioNotificationAdapter obj = new TwilioNotificationAdapter();\n * Object param_1 = obj.send(String to, String msg);\n */",
      "python": "class TwilioNotificationAdapter:\n\n    def __init__(self):\n        pass\n\n    def send(self, *args, **kwargs):\n        pass\n\n# Your TwilioNotificationAdapter object will be instantiated and called as such:\n# obj = TwilioNotificationAdapter()\n",
      "javascript": "class TwilioNotificationAdapter {\n    constructor() {\n        \n    }\n\n    send(...args) {\n        \n    }\n}\n\n/**\n * Your TwilioNotificationAdapter object will be instantiated and called as such:\n * const obj = new TwilioNotificationAdapter();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement Notification Adapter\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "control-home-theater",
    "number": 65,
    "title": "Control a Home Theater",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Facade"
    ],
    "narrative": "Design a HomeTheaterFacade simplifying complex interactions with TV, Soundbar, BluRayPlayer, Lights, and Projector into watchMovie() and endMovie().",
    "className": "HomeTheaterFacade",
    "constructorSig": "public HomeTheaterFacade(TV tv, Soundbar sound, Lights lights, BluRay player)",
    "methods": [
      {
        "sig": "public void watchMovie(String movie)",
        "desc": "turns on TV, dims lights, sets surround sound, and plays movie."
      },
      {
        "sig": "public void endMovie()",
        "desc": "shuts down all systems and restores lighting."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new HomeTheaterFacade()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new HomeTheaterFacade()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new HomeTheaterFacade()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a HomeTheaterFacade simplifying complex interactions with TV, Soundbar, BluRayPlayer, Lights, and Projector into watchMovie() and endMovie().\n\n### Implement the `HomeTheaterFacade` class:\n\n- `HomeTheaterFacade(TV tv, Soundbar sound, Lights lights, BluRay player)` creates an initialized instance.\n- `void watchMovie(String movie)` turns on TV, dims lights, sets surround sound, and plays movie.\n- `void endMovie()` shuts down all systems and restores lighting.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new HomeTheaterFacade()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class HomeTheaterFacade\n\nclass HomeTheaterFacade {\n    public HomeTheaterFacade(TV tv, Soundbar sound, Lights lights, BluRay player) {\n        \n    }\n\n    public void watchMovie(String movie) {\n        \n    }\n\n    public void endMovie() {\n        \n    }\n}\n\n/**\n * Your HomeTheaterFacade object will be instantiated and called as such:\n * HomeTheaterFacade obj = new HomeTheaterFacade();\n * Object param_1 = obj.watchMovie(String movie);\n * Object param_2 = obj.endMovie();\n */",
      "python": "class HomeTheaterFacade:\n\n    def __init__(self):\n        pass\n\n    def watchMovie(self, *args, **kwargs):\n        pass\n\n    def endMovie(self, *args, **kwargs):\n        pass\n\n# Your HomeTheaterFacade object will be instantiated and called as such:\n# obj = HomeTheaterFacade()\n",
      "javascript": "class HomeTheaterFacade {\n    constructor() {\n        \n    }\n\n    watchMovie(...args) {\n        \n    }\n\n    endMovie(...args) {\n        \n    }\n}\n\n/**\n * Your HomeTheaterFacade object will be instantiated and called as such:\n * const obj = new HomeTheaterFacade();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Control a Home Theater\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "start-computer",
    "number": 66,
    "title": "Start a Computer",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Facade"
    ],
    "narrative": "Implement ComputerFacade encapsulating CPU freeze, BIOS execution, Memory loading, and HDD jump routines into startComputer().",
    "className": "ComputerFacade",
    "constructorSig": "public ComputerFacade(CPU cpu, Memory ram, HardDrive hdd)",
    "methods": [
      {
        "sig": "public void start()",
        "desc": "coordinates boot sequence facade."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ComputerFacade()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ComputerFacade()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ComputerFacade()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement ComputerFacade encapsulating CPU freeze, BIOS execution, Memory loading, and HDD jump routines into startComputer().\n\n### Implement the `ComputerFacade` class:\n\n- `ComputerFacade(CPU cpu, Memory ram, HardDrive hdd)` creates an initialized instance.\n- `void start()` coordinates boot sequence facade.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ComputerFacade()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ComputerFacade\n\nclass ComputerFacade {\n    public ComputerFacade(CPU cpu, Memory ram, HardDrive hdd) {\n        \n    }\n\n    public void start() {\n        \n    }\n}\n\n/**\n * Your ComputerFacade object will be instantiated and called as such:\n * ComputerFacade obj = new ComputerFacade();\n * Object param_1 = obj.start();\n */",
      "python": "class ComputerFacade:\n\n    def __init__(self):\n        pass\n\n    def start(self, *args, **kwargs):\n        pass\n\n# Your ComputerFacade object will be instantiated and called as such:\n# obj = ComputerFacade()\n",
      "javascript": "class ComputerFacade {\n    constructor() {\n        \n    }\n\n    start(...args) {\n        \n    }\n}\n\n/**\n * Your ComputerFacade object will be instantiated and called as such:\n * const obj = new ComputerFacade();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Start a Computer\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-character-abilities-decorator",
    "number": 67,
    "title": "Implement Character Abilities Decorator",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Decorator"
    ],
    "narrative": "Implement game character decorators: ArmorBuffDecorator, SpeedBoostDecorator, and PoisonEffectDecorator wrapping BaseCharacter.",
    "className": "CharacterDecoratorDemo",
    "constructorSig": "public CharacterDecoratorDemo()",
    "methods": [
      {
        "sig": "public int getEffectiveAttack(Character character)",
        "desc": "computes decorated attack power."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new CharacterDecoratorDemo()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CharacterDecoratorDemo()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new CharacterDecoratorDemo()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement game character decorators: ArmorBuffDecorator, SpeedBoostDecorator, and PoisonEffectDecorator wrapping BaseCharacter.\n\n### Implement the `CharacterDecoratorDemo` class:\n\n- `CharacterDecoratorDemo()` creates an initialized instance.\n- `int getEffectiveAttack(Character character)` computes decorated attack power.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new CharacterDecoratorDemo()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class CharacterDecoratorDemo\n\nclass CharacterDecoratorDemo {\n    public CharacterDecoratorDemo() {\n        \n    }\n\n    public int getEffectiveAttack(Character character) {\n        \n    }\n}\n\n/**\n * Your CharacterDecoratorDemo object will be instantiated and called as such:\n * CharacterDecoratorDemo obj = new CharacterDecoratorDemo();\n * Object param_1 = obj.getEffectiveAttack(Character character);\n */",
      "python": "class CharacterDecoratorDemo:\n\n    def __init__(self):\n        pass\n\n    def getEffectiveAttack(self, *args, **kwargs):\n        pass\n\n# Your CharacterDecoratorDemo object will be instantiated and called as such:\n# obj = CharacterDecoratorDemo()\n",
      "javascript": "class CharacterDecoratorDemo {\n    constructor() {\n        \n    }\n\n    getEffectiveAttack(...args) {\n        \n    }\n}\n\n/**\n * Your CharacterDecoratorDemo object will be instantiated and called as such:\n * const obj = new CharacterDecoratorDemo();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement Character Abilities Decorator\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-log-formatter-decorators",
    "number": 68,
    "title": "Implement Log Formatter Decorators",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Decorator"
    ],
    "narrative": "Design decorators adding Timestamp, ThreadName, and ColorFormatting to base log message output.",
    "className": "LogDecoratorDemo",
    "constructorSig": "public LogDecoratorDemo()",
    "methods": [
      {
        "sig": "public String formatMessage(LogFormatter formatter, String msg)",
        "desc": "applies decorator chain to log."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new LogDecoratorDemo()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new LogDecoratorDemo()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new LogDecoratorDemo()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design decorators adding Timestamp, ThreadName, and ColorFormatting to base log message output.\n\n### Implement the `LogDecoratorDemo` class:\n\n- `LogDecoratorDemo()` creates an initialized instance.\n- `String formatMessage(LogFormatter formatter, String msg)` applies decorator chain to log.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new LogDecoratorDemo()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class LogDecoratorDemo\n\nclass LogDecoratorDemo {\n    public LogDecoratorDemo() {\n        \n    }\n\n    public String formatMessage(LogFormatter formatter, String msg) {\n        \n    }\n}\n\n/**\n * Your LogDecoratorDemo object will be instantiated and called as such:\n * LogDecoratorDemo obj = new LogDecoratorDemo();\n * Object param_1 = obj.formatMessage(LogFormatter formatter, String msg);\n */",
      "python": "class LogDecoratorDemo:\n\n    def __init__(self):\n        pass\n\n    def formatMessage(self, *args, **kwargs):\n        pass\n\n# Your LogDecoratorDemo object will be instantiated and called as such:\n# obj = LogDecoratorDemo()\n",
      "javascript": "class LogDecoratorDemo {\n    constructor() {\n        \n    }\n\n    formatMessage(...args) {\n        \n    }\n}\n\n/**\n * Your LogDecoratorDemo object will be instantiated and called as such:\n * const obj = new LogDecoratorDemo();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement Log Formatter Decorators\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-menu-system",
    "number": 69,
    "title": "Design a Menu System",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Composite"
    ],
    "narrative": "Implement the Composite pattern for a nested restaurant Menu where MenuItems and sub-Menus share the MenuComponent interface.",
    "className": "MenuComponent",
    "constructorSig": "public MenuComponent(String name)",
    "methods": [
      {
        "sig": "public void add(MenuComponent comp)",
        "desc": "adds child item or submenu."
      },
      {
        "sig": "public void print()",
        "desc": "recursively displays menu hierarchy."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new MenuComponent()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new MenuComponent()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new MenuComponent()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement the Composite pattern for a nested restaurant Menu where MenuItems and sub-Menus share the MenuComponent interface.\n\n### Implement the `MenuComponent` class:\n\n- `MenuComponent(String name)` creates an initialized instance.\n- `void add(MenuComponent comp)` adds child item or submenu.\n- `void print()` recursively displays menu hierarchy.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new MenuComponent()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class MenuComponent\n\nclass MenuComponent {\n    public MenuComponent(String name) {\n        \n    }\n\n    public void add(MenuComponent comp) {\n        \n    }\n\n    public void print() {\n        \n    }\n}\n\n/**\n * Your MenuComponent object will be instantiated and called as such:\n * MenuComponent obj = new MenuComponent();\n * Object param_1 = obj.add(MenuComponent comp);\n * Object param_2 = obj.print();\n */",
      "python": "class MenuComponent:\n\n    def __init__(self):\n        pass\n\n    def add(self, *args, **kwargs):\n        pass\n\n    def print(self, *args, **kwargs):\n        pass\n\n# Your MenuComponent object will be instantiated and called as such:\n# obj = MenuComponent()\n",
      "javascript": "class MenuComponent {\n    constructor() {\n        \n    }\n\n    add(...args) {\n        \n    }\n\n    print(...args) {\n        \n    }\n}\n\n/**\n * Your MenuComponent object will be instantiated and called as such:\n * const obj = new MenuComponent();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Menu System\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-file-tree",
    "number": 70,
    "title": "Design a File Tree",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Composite"
    ],
    "narrative": "Implement the Composite pattern representing a file system where File and Directory classes share the FileSystemNode interface calculating total recursive size.",
    "className": "DirectoryNode",
    "constructorSig": "public DirectoryNode(String name)",
    "methods": [
      {
        "sig": "public void add(FileSystemNode node)",
        "desc": "adds file or directory child."
      },
      {
        "sig": "public long getSize()",
        "desc": "returns total aggregate size."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new DirectoryNode()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DirectoryNode()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new DirectoryNode()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement the Composite pattern representing a file system where File and Directory classes share the FileSystemNode interface calculating total recursive size.\n\n### Implement the `DirectoryNode` class:\n\n- `DirectoryNode(String name)` creates an initialized instance.\n- `void add(FileSystemNode node)` adds file or directory child.\n- `long getSize()` returns total aggregate size.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new DirectoryNode()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class DirectoryNode\n\nclass DirectoryNode {\n    public DirectoryNode(String name) {\n        \n    }\n\n    public void add(FileSystemNode node) {\n        \n    }\n\n    public long getSize() {\n        \n    }\n}\n\n/**\n * Your DirectoryNode object will be instantiated and called as such:\n * DirectoryNode obj = new DirectoryNode();\n * Object param_1 = obj.add(FileSystemNode node);\n * Object param_2 = obj.getSize();\n */",
      "python": "class DirectoryNode:\n\n    def __init__(self):\n        pass\n\n    def add(self, *args, **kwargs):\n        pass\n\n    def getSize(self, *args, **kwargs):\n        pass\n\n# Your DirectoryNode object will be instantiated and called as such:\n# obj = DirectoryNode()\n",
      "javascript": "class DirectoryNode {\n    constructor() {\n        \n    }\n\n    add(...args) {\n        \n    }\n\n    getSize(...args) {\n        \n    }\n}\n\n/**\n * Your DirectoryNode object will be instantiated and called as such:\n * const obj = new DirectoryNode();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a File Tree\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-lazy-image-proxy",
    "number": 71,
    "title": "Implement a Lazy Image Proxy",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Proxy"
    ],
    "narrative": "Implement Proxy pattern where ImageProxy loads high-resolution RealImage from disk only upon the first call to display().",
    "className": "ImageProxy",
    "constructorSig": "public ImageProxy(String filename)",
    "methods": [
      {
        "sig": "public void display()",
        "desc": "lazily loads real image on first call then displays."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ImageProxy()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ImageProxy()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ImageProxy()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Proxy pattern where ImageProxy loads high-resolution RealImage from disk only upon the first call to display().\n\n### Implement the `ImageProxy` class:\n\n- `ImageProxy(String filename)` creates an initialized instance.\n- `void display()` lazily loads real image on first call then displays.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ImageProxy()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ImageProxy\n\nclass ImageProxy {\n    public ImageProxy(String filename) {\n        \n    }\n\n    public void display() {\n        \n    }\n}\n\n/**\n * Your ImageProxy object will be instantiated and called as such:\n * ImageProxy obj = new ImageProxy();\n * Object param_1 = obj.display();\n */",
      "python": "class ImageProxy:\n\n    def __init__(self):\n        pass\n\n    def display(self, *args, **kwargs):\n        pass\n\n# Your ImageProxy object will be instantiated and called as such:\n# obj = ImageProxy()\n",
      "javascript": "class ImageProxy {\n    constructor() {\n        \n    }\n\n    display(...args) {\n        \n    }\n}\n\n/**\n * Your ImageProxy object will be instantiated and called as such:\n * const obj = new ImageProxy();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement a Lazy Image Proxy\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "implement-secure-report-proxy",
    "number": 72,
    "title": "Implement a Secure Report Proxy",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Proxy"
    ],
    "narrative": "Implement a Protection Proxy that verifies user role (ADMIN, MANAGER) before delegating to ConfidentialReportGenerator.",
    "className": "SecureReportProxy",
    "constructorSig": "public SecureReportProxy(User user)",
    "methods": [
      {
        "sig": "public String generateReport()",
        "desc": "checks user permission before generating report."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new SecureReportProxy()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new SecureReportProxy()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new SecureReportProxy()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement a Protection Proxy that verifies user role (ADMIN, MANAGER) before delegating to ConfidentialReportGenerator.\n\n### Implement the `SecureReportProxy` class:\n\n- `SecureReportProxy(User user)` creates an initialized instance.\n- `String generateReport()` checks user permission before generating report.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new SecureReportProxy()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class SecureReportProxy\n\nclass SecureReportProxy {\n    public SecureReportProxy(User user) {\n        \n    }\n\n    public String generateReport() {\n        \n    }\n}\n\n/**\n * Your SecureReportProxy object will be instantiated and called as such:\n * SecureReportProxy obj = new SecureReportProxy();\n * Object param_1 = obj.generateReport();\n */",
      "python": "class SecureReportProxy:\n\n    def __init__(self):\n        pass\n\n    def generateReport(self, *args, **kwargs):\n        pass\n\n# Your SecureReportProxy object will be instantiated and called as such:\n# obj = SecureReportProxy()\n",
      "javascript": "class SecureReportProxy {\n    constructor() {\n        \n    }\n\n    generateReport(...args) {\n        \n    }\n}\n\n/**\n * Your SecureReportProxy object will be instantiated and called as such:\n * const obj = new SecureReportProxy();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Implement a Secure Report Proxy\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-shape-renderer",
    "number": 73,
    "title": "Design a Shape Renderer",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Bridge"
    ],
    "narrative": "Implement the Bridge pattern decoupling Shape abstractions (Circle, Square) from DrawingAPI implementations (RasterAPI, VectorAPI).",
    "className": "ShapeBridgeDemo",
    "constructorSig": "public ShapeBridgeDemo()",
    "methods": [
      {
        "sig": "public void drawShape(Shape shape)",
        "desc": "bridges shape logic to drawing implementation."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ShapeBridgeDemo()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ShapeBridgeDemo()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ShapeBridgeDemo()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement the Bridge pattern decoupling Shape abstractions (Circle, Square) from DrawingAPI implementations (RasterAPI, VectorAPI).\n\n### Implement the `ShapeBridgeDemo` class:\n\n- `ShapeBridgeDemo()` creates an initialized instance.\n- `void drawShape(Shape shape)` bridges shape logic to drawing implementation.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ShapeBridgeDemo()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ShapeBridgeDemo\n\nclass ShapeBridgeDemo {\n    public ShapeBridgeDemo() {\n        \n    }\n\n    public void drawShape(Shape shape) {\n        \n    }\n}\n\n/**\n * Your ShapeBridgeDemo object will be instantiated and called as such:\n * ShapeBridgeDemo obj = new ShapeBridgeDemo();\n * Object param_1 = obj.drawShape(Shape shape);\n */",
      "python": "class ShapeBridgeDemo:\n\n    def __init__(self):\n        pass\n\n    def drawShape(self, *args, **kwargs):\n        pass\n\n# Your ShapeBridgeDemo object will be instantiated and called as such:\n# obj = ShapeBridgeDemo()\n",
      "javascript": "class ShapeBridgeDemo {\n    constructor() {\n        \n    }\n\n    drawShape(...args) {\n        \n    }\n}\n\n/**\n * Your ShapeBridgeDemo object will be instantiated and called as such:\n * const obj = new ShapeBridgeDemo();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Shape Renderer\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-board-game-pieces",
    "number": 74,
    "title": "Design Board Game Pieces",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Flyweight"
    ],
    "narrative": "Implement Flyweight pattern sharing intrinsic sprite textures and geometries across 10,000 extrinsic Soldier unit positions on a game board.",
    "className": "PieceFlyweightFactory",
    "constructorSig": "public static PieceFlyweight getPiece(String type)",
    "methods": [
      {
        "sig": "public void render(int x, int y, int health)",
        "desc": "renders extrinsic piece state using shared intrinsic texture."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PieceFlyweightFactory()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PieceFlyweightFactory()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PieceFlyweightFactory()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Flyweight pattern sharing intrinsic sprite textures and geometries across 10,000 extrinsic Soldier unit positions on a game board.\n\n### Implement the `PieceFlyweightFactory` class:\n\n- `static PieceFlyweight getPiece(String type)` creates an initialized instance.\n- `void render(int x, int y, int health)` renders extrinsic piece state using shared intrinsic texture.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PieceFlyweightFactory()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PieceFlyweightFactory\n\nclass PieceFlyweightFactory {\n    public static PieceFlyweight getPiece(String type) {\n        \n    }\n\n    public void render(int x, int y, int health) {\n        \n    }\n}\n\n/**\n * Your PieceFlyweightFactory object will be instantiated and called as such:\n * PieceFlyweightFactory obj = new PieceFlyweightFactory();\n * Object param_1 = obj.render(int x, int y, int health);\n */",
      "python": "class PieceFlyweightFactory:\n\n    def __init__(self):\n        pass\n\n    def render(self, *args, **kwargs):\n        pass\n\n# Your PieceFlyweightFactory object will be instantiated and called as such:\n# obj = PieceFlyweightFactory()\n",
      "javascript": "class PieceFlyweightFactory {\n    constructor() {\n        \n    }\n\n    render(...args) {\n        \n    }\n}\n\n/**\n * Your PieceFlyweightFactory object will be instantiated and called as such:\n * const obj = new PieceFlyweightFactory();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Board Game Pieces\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-terrain-map",
    "number": 75,
    "title": "Design a Terrain Map",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Flyweight"
    ],
    "narrative": "Share Terrain (GRASS, WATER, DESERT) flyweight textures and movement cost objects across a 1,000,000-tile grid map.",
    "className": "TerrainFactory",
    "constructorSig": "public static Terrain getTerrain(String type)",
    "methods": [
      {
        "sig": "public double getMovementCost(int x, int y)",
        "desc": "retrieves cost using shared terrain."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TerrainFactory()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TerrainFactory()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TerrainFactory()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Share Terrain (GRASS, WATER, DESERT) flyweight textures and movement cost objects across a 1,000,000-tile grid map.\n\n### Implement the `TerrainFactory` class:\n\n- `static Terrain getTerrain(String type)` creates an initialized instance.\n- `double getMovementCost(int x, int y)` retrieves cost using shared terrain.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TerrainFactory()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TerrainFactory\n\nclass TerrainFactory {\n    public static Terrain getTerrain(String type) {\n        \n    }\n\n    public double getMovementCost(int x, int y) {\n        \n    }\n}\n\n/**\n * Your TerrainFactory object will be instantiated and called as such:\n * TerrainFactory obj = new TerrainFactory();\n * Object param_1 = obj.getMovementCost(int x, int y);\n */",
      "python": "class TerrainFactory:\n\n    def __init__(self):\n        pass\n\n    def getMovementCost(self, *args, **kwargs):\n        pass\n\n# Your TerrainFactory object will be instantiated and called as such:\n# obj = TerrainFactory()\n",
      "javascript": "class TerrainFactory {\n    constructor() {\n        \n    }\n\n    getMovementCost(...args) {\n        \n    }\n}\n\n/**\n * Your TerrainFactory object will be instantiated and called as such:\n * const obj = new TerrainFactory();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Terrain Map\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-travel-booking-system",
    "number": 76,
    "title": "Design a Travel Booking System",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Facade"
    ],
    "narrative": "Implement TravelBookingFacade coordinating FlightBooking, HotelReservation, and CarRental services in an atomic multi-step booking.",
    "className": "TravelBookingFacade",
    "constructorSig": "public TravelBookingFacade()",
    "methods": [
      {
        "sig": "public boolean bookVacationPackage(String user, String dest, int days)",
        "desc": "coordinates flight, hotel, and car facade."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TravelBookingFacade()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TravelBookingFacade()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TravelBookingFacade()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement TravelBookingFacade coordinating FlightBooking, HotelReservation, and CarRental services in an atomic multi-step booking.\n\n### Implement the `TravelBookingFacade` class:\n\n- `TravelBookingFacade()` creates an initialized instance.\n- `boolean bookVacationPackage(String user, String dest, int days)` coordinates flight, hotel, and car facade.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TravelBookingFacade()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TravelBookingFacade\n\nclass TravelBookingFacade {\n    public TravelBookingFacade() {\n        \n    }\n\n    public boolean bookVacationPackage(String user, String dest, int days) {\n        \n    }\n}\n\n/**\n * Your TravelBookingFacade object will be instantiated and called as such:\n * TravelBookingFacade obj = new TravelBookingFacade();\n * Object param_1 = obj.bookVacationPackage(String user, String dest, int days);\n */",
      "python": "class TravelBookingFacade:\n\n    def __init__(self):\n        pass\n\n    def bookVacationPackage(self, *args, **kwargs):\n        pass\n\n# Your TravelBookingFacade object will be instantiated and called as such:\n# obj = TravelBookingFacade()\n",
      "javascript": "class TravelBookingFacade {\n    constructor() {\n        \n    }\n\n    bookVacationPackage(...args) {\n        \n    }\n}\n\n/**\n * Your TravelBookingFacade object will be instantiated and called as such:\n * const obj = new TravelBookingFacade();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Travel Booking System\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-html-element-tree",
    "number": 77,
    "title": "Design an HTML Element Tree",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Composite"
    ],
    "narrative": "Implement a DOM HTML element tree using Composite pattern supporting nested tags, attribute maps, and render() serialization.",
    "className": "HTMLElement",
    "constructorSig": "public HTMLElement(String tag)",
    "methods": [
      {
        "sig": "public void addChild(HTMLElement child)",
        "desc": "adds nested DOM node."
      },
      {
        "sig": "public String render()",
        "desc": "recursively formats HTML tree string."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new HTMLElement()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new HTMLElement()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new HTMLElement()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement a DOM HTML element tree using Composite pattern supporting nested tags, attribute maps, and render() serialization.\n\n### Implement the `HTMLElement` class:\n\n- `HTMLElement(String tag)` creates an initialized instance.\n- `void addChild(HTMLElement child)` adds nested DOM node.\n- `String render()` recursively formats HTML tree string.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new HTMLElement()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class HTMLElement\n\nclass HTMLElement {\n    public HTMLElement(String tag) {\n        \n    }\n\n    public void addChild(HTMLElement child) {\n        \n    }\n\n    public String render() {\n        \n    }\n}\n\n/**\n * Your HTMLElement object will be instantiated and called as such:\n * HTMLElement obj = new HTMLElement();\n * Object param_1 = obj.addChild(HTMLElement child);\n * Object param_2 = obj.render();\n */",
      "python": "class HTMLElement:\n\n    def __init__(self):\n        pass\n\n    def addChild(self, *args, **kwargs):\n        pass\n\n    def render(self, *args, **kwargs):\n        pass\n\n# Your HTMLElement object will be instantiated and called as such:\n# obj = HTMLElement()\n",
      "javascript": "class HTMLElement {\n    constructor() {\n        \n    }\n\n    addChild(...args) {\n        \n    }\n\n    render(...args) {\n        \n    }\n}\n\n/**\n * Your HTMLElement object will be instantiated and called as such:\n * const obj = new HTMLElement();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design an HTML Element Tree\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-caching-weather-proxy",
    "number": 78,
    "title": "Design a Caching Weather Proxy",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Proxy"
    ],
    "narrative": "Implement a Caching Proxy wrapping a remote WeatherAPI that caches location forecasts for 15 minutes before refreshing.",
    "className": "CachingWeatherProxy",
    "constructorSig": "public CachingWeatherProxy(WeatherService remoteService)",
    "methods": [
      {
        "sig": "public String getForecast(String city)",
        "desc": "serves from cache if valid, otherwise fetches and caches."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new CachingWeatherProxy()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CachingWeatherProxy()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new CachingWeatherProxy()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement a Caching Proxy wrapping a remote WeatherAPI that caches location forecasts for 15 minutes before refreshing.\n\n### Implement the `CachingWeatherProxy` class:\n\n- `CachingWeatherProxy(WeatherService remoteService)` creates an initialized instance.\n- `String getForecast(String city)` serves from cache if valid, otherwise fetches and caches.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new CachingWeatherProxy()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class CachingWeatherProxy\n\nclass CachingWeatherProxy {\n    public CachingWeatherProxy(WeatherService remoteService) {\n        \n    }\n\n    public String getForecast(String city) {\n        \n    }\n}\n\n/**\n * Your CachingWeatherProxy object will be instantiated and called as such:\n * CachingWeatherProxy obj = new CachingWeatherProxy();\n * Object param_1 = obj.getForecast(String city);\n */",
      "python": "class CachingWeatherProxy:\n\n    def __init__(self):\n        pass\n\n    def getForecast(self, *args, **kwargs):\n        pass\n\n# Your CachingWeatherProxy object will be instantiated and called as such:\n# obj = CachingWeatherProxy()\n",
      "javascript": "class CachingWeatherProxy {\n    constructor() {\n        \n    }\n\n    getForecast(...args) {\n        \n    }\n}\n\n/**\n * Your CachingWeatherProxy object will be instantiated and called as such:\n * const obj = new CachingWeatherProxy();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Caching Weather Proxy\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-remote-control",
    "number": 79,
    "title": "Design a Remote Control",
    "category": "structural-patterns",
    "categoryTitle": "Structural Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Bridge"
    ],
    "narrative": "Bridge RemoteControl abstractions (BasicRemote, AdvancedRemote) to Device implementations (SonyTV, SamsungRadio) with power and channel operations.",
    "className": "RemoteControl",
    "constructorSig": "public RemoteControl(Device device)",
    "methods": [
      {
        "sig": "public void togglePower()",
        "desc": "delegates power command to bridged device."
      },
      {
        "sig": "public void setChannel(int channel)",
        "desc": "delegates channel command."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new RemoteControl()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new RemoteControl()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new RemoteControl()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Bridge RemoteControl abstractions (BasicRemote, AdvancedRemote) to Device implementations (SonyTV, SamsungRadio) with power and channel operations.\n\n### Implement the `RemoteControl` class:\n\n- `RemoteControl(Device device)` creates an initialized instance.\n- `void togglePower()` delegates power command to bridged device.\n- `void setChannel(int channel)` delegates channel command.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new RemoteControl()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class RemoteControl\n\nclass RemoteControl {\n    public RemoteControl(Device device) {\n        \n    }\n\n    public void togglePower() {\n        \n    }\n\n    public void setChannel(int channel) {\n        \n    }\n}\n\n/**\n * Your RemoteControl object will be instantiated and called as such:\n * RemoteControl obj = new RemoteControl();\n * Object param_1 = obj.togglePower();\n * Object param_2 = obj.setChannel(int channel);\n */",
      "python": "class RemoteControl:\n\n    def __init__(self):\n        pass\n\n    def togglePower(self, *args, **kwargs):\n        pass\n\n    def setChannel(self, *args, **kwargs):\n        pass\n\n# Your RemoteControl object will be instantiated and called as such:\n# obj = RemoteControl()\n",
      "javascript": "class RemoteControl {\n    constructor() {\n        \n    }\n\n    togglePower(...args) {\n        \n    }\n\n    setChannel(...args) {\n        \n    }\n}\n\n/**\n * Your RemoteControl object will be instantiated and called as such:\n * const obj = new RemoteControl();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Remote Control\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-strategy-discount-calculator",
    "number": 80,
    "title": "Design a Discount Calculator",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Strategy"
    ],
    "narrative": "Implement the Strategy pattern allowing runtime selection between NoDiscount, PercentageDiscount, and FixedAmountDiscount pricing algorithms.",
    "className": "DiscountCalculator",
    "constructorSig": "public DiscountCalculator(DiscountStrategy strategy)",
    "methods": [
      {
        "sig": "public void setStrategy(DiscountStrategy strategy)",
        "desc": "swaps active pricing strategy at runtime."
      },
      {
        "sig": "public double calculateFinalPrice(double originalPrice)",
        "desc": "executes active strategy algorithm."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new DiscountCalculator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DiscountCalculator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new DiscountCalculator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement the Strategy pattern allowing runtime selection between NoDiscount, PercentageDiscount, and FixedAmountDiscount pricing algorithms.\n\n### Implement the `DiscountCalculator` class:\n\n- `DiscountCalculator(DiscountStrategy strategy)` creates an initialized instance.\n- `void setStrategy(DiscountStrategy strategy)` swaps active pricing strategy at runtime.\n- `double calculateFinalPrice(double originalPrice)` executes active strategy algorithm.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new DiscountCalculator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class DiscountCalculator\n\nclass DiscountCalculator {\n    public DiscountCalculator(DiscountStrategy strategy) {\n        \n    }\n\n    public void setStrategy(DiscountStrategy strategy) {\n        \n    }\n\n    public double calculateFinalPrice(double originalPrice) {\n        \n    }\n}\n\n/**\n * Your DiscountCalculator object will be instantiated and called as such:\n * DiscountCalculator obj = new DiscountCalculator();\n * Object param_1 = obj.setStrategy(DiscountStrategy strategy);\n * Object param_2 = obj.calculateFinalPrice(double originalPrice);\n */",
      "python": "class DiscountCalculator:\n\n    def __init__(self):\n        pass\n\n    def setStrategy(self, *args, **kwargs):\n        pass\n\n    def calculateFinalPrice(self, *args, **kwargs):\n        pass\n\n# Your DiscountCalculator object will be instantiated and called as such:\n# obj = DiscountCalculator()\n",
      "javascript": "class DiscountCalculator {\n    constructor() {\n        \n    }\n\n    setStrategy(...args) {\n        \n    }\n\n    calculateFinalPrice(...args) {\n        \n    }\n}\n\n/**\n * Your DiscountCalculator object will be instantiated and called as such:\n * const obj = new DiscountCalculator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Discount Calculator\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-route-planner",
    "number": 81,
    "title": "Design a Route Planner",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Strategy"
    ],
    "narrative": "Implement RoutePlanner with Strategy pattern selecting between DrivingStrategy, WalkingStrategy, and PublicTransitStrategy.",
    "className": "RoutePlanner",
    "constructorSig": "public RoutePlanner(RouteStrategy strategy)",
    "methods": [
      {
        "sig": "public String planRoute(String start, String end)",
        "desc": "generates route using selected navigation algorithm."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new RoutePlanner()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new RoutePlanner()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new RoutePlanner()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement RoutePlanner with Strategy pattern selecting between DrivingStrategy, WalkingStrategy, and PublicTransitStrategy.\n\n### Implement the `RoutePlanner` class:\n\n- `RoutePlanner(RouteStrategy strategy)` creates an initialized instance.\n- `String planRoute(String start, String end)` generates route using selected navigation algorithm.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new RoutePlanner()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class RoutePlanner\n\nclass RoutePlanner {\n    public RoutePlanner(RouteStrategy strategy) {\n        \n    }\n\n    public String planRoute(String start, String end) {\n        \n    }\n}\n\n/**\n * Your RoutePlanner object will be instantiated and called as such:\n * RoutePlanner obj = new RoutePlanner();\n * Object param_1 = obj.planRoute(String start, String end);\n */",
      "python": "class RoutePlanner:\n\n    def __init__(self):\n        pass\n\n    def planRoute(self, *args, **kwargs):\n        pass\n\n# Your RoutePlanner object will be instantiated and called as such:\n# obj = RoutePlanner()\n",
      "javascript": "class RoutePlanner {\n    constructor() {\n        \n    }\n\n    planRoute(...args) {\n        \n    }\n}\n\n/**\n * Your RoutePlanner object will be instantiated and called as such:\n * const obj = new RoutePlanner();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Route Planner\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-text-formatter",
    "number": 82,
    "title": "Design a Text Formatter",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Strategy"
    ],
    "narrative": "Implement TextFormatter with UpperCaseStrategy, LowerCaseStrategy, and TitleCaseStrategy text transformations.",
    "className": "TextFormatterContext",
    "constructorSig": "public TextFormatterContext()",
    "methods": [
      {
        "sig": "public String format(String text, TextFormatStrategy strategy)",
        "desc": "applies formatting strategy to input text."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TextFormatterContext()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TextFormatterContext()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TextFormatterContext()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement TextFormatter with UpperCaseStrategy, LowerCaseStrategy, and TitleCaseStrategy text transformations.\n\n### Implement the `TextFormatterContext` class:\n\n- `TextFormatterContext()` creates an initialized instance.\n- `String format(String text, TextFormatStrategy strategy)` applies formatting strategy to input text.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TextFormatterContext()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TextFormatterContext\n\nclass TextFormatterContext {\n    public TextFormatterContext() {\n        \n    }\n\n    public String format(String text, TextFormatStrategy strategy) {\n        \n    }\n}\n\n/**\n * Your TextFormatterContext object will be instantiated and called as such:\n * TextFormatterContext obj = new TextFormatterContext();\n * Object param_1 = obj.format(String text, TextFormatStrategy strategy);\n */",
      "python": "class TextFormatterContext:\n\n    def __init__(self):\n        pass\n\n    def format(self, *args, **kwargs):\n        pass\n\n# Your TextFormatterContext object will be instantiated and called as such:\n# obj = TextFormatterContext()\n",
      "javascript": "class TextFormatterContext {\n    constructor() {\n        \n    }\n\n    format(...args) {\n        \n    }\n}\n\n/**\n * Your TextFormatterContext object will be instantiated and called as such:\n * const obj = new TextFormatterContext();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Text Formatter\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-playlist-iterator",
    "number": 83,
    "title": "Design a Playlist Iterator",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Iterator"
    ],
    "narrative": "Implement the Iterator pattern with CustomPlaylistIterator traversing a song collection with hasNext() and next().",
    "className": "PlaylistIterator",
    "constructorSig": "public PlaylistIterator(java.util.List<Song> songs)",
    "methods": [
      {
        "sig": "public boolean hasNext()",
        "desc": "returns true if more songs remain in playlist."
      },
      {
        "sig": "public Song next()",
        "desc": "returns next song and advances cursor."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PlaylistIterator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PlaylistIterator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PlaylistIterator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement the Iterator pattern with CustomPlaylistIterator traversing a song collection with hasNext() and next().\n\n### Implement the `PlaylistIterator` class:\n\n- `PlaylistIterator(java.util.List<Song> songs)` creates an initialized instance.\n- `boolean hasNext()` returns true if more songs remain in playlist.\n- `Song next()` returns next song and advances cursor.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PlaylistIterator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PlaylistIterator\n\nclass PlaylistIterator {\n    public PlaylistIterator(java.util.List<Song> songs) {\n        \n    }\n\n    public boolean hasNext() {\n        \n    }\n\n    public Song next() {\n        \n    }\n}\n\n/**\n * Your PlaylistIterator object will be instantiated and called as such:\n * PlaylistIterator obj = new PlaylistIterator();\n * Object param_1 = obj.hasNext();\n * Object param_2 = obj.next();\n */",
      "python": "class PlaylistIterator:\n\n    def __init__(self):\n        pass\n\n    def hasNext(self, *args, **kwargs):\n        pass\n\n    def next(self, *args, **kwargs):\n        pass\n\n# Your PlaylistIterator object will be instantiated and called as such:\n# obj = PlaylistIterator()\n",
      "javascript": "class PlaylistIterator {\n    constructor() {\n        \n    }\n\n    hasNext(...args) {\n        \n    }\n\n    next(...args) {\n        \n    }\n}\n\n/**\n * Your PlaylistIterator object will be instantiated and called as such:\n * const obj = new PlaylistIterator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Playlist Iterator\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-newsletter-publisher",
    "number": 84,
    "title": "Design a Newsletter Publisher",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Observer"
    ],
    "narrative": "Implement Observer pattern with NewsletterPublisher notifying subscribed UserObserver objects when a new edition is published.",
    "className": "NewsletterPublisher",
    "constructorSig": "public NewsletterPublisher()",
    "methods": [
      {
        "sig": "public void subscribe(Observer observer)",
        "desc": "registers new observer."
      },
      {
        "sig": "public void unsubscribe(Observer observer)",
        "desc": "removes observer."
      },
      {
        "sig": "public void publish(String edition)",
        "desc": "notifies all active observers with new content."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new NewsletterPublisher()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new NewsletterPublisher()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new NewsletterPublisher()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Observer pattern with NewsletterPublisher notifying subscribed UserObserver objects when a new edition is published.\n\n### Implement the `NewsletterPublisher` class:\n\n- `NewsletterPublisher()` creates an initialized instance.\n- `void subscribe(Observer observer)` registers new observer.\n- `void unsubscribe(Observer observer)` removes observer.\n- `void publish(String edition)` notifies all active observers with new content.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new NewsletterPublisher()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class NewsletterPublisher\n\nclass NewsletterPublisher {\n    public NewsletterPublisher() {\n        \n    }\n\n    public void subscribe(Observer observer) {\n        \n    }\n\n    public void unsubscribe(Observer observer) {\n        \n    }\n\n    public void publish(String edition) {\n        \n    }\n}\n\n/**\n * Your NewsletterPublisher object will be instantiated and called as such:\n * NewsletterPublisher obj = new NewsletterPublisher();\n * Object param_1 = obj.subscribe(Observer observer);\n * Object param_2 = obj.unsubscribe(Observer observer);\n * Object param_3 = obj.publish(String edition);\n */",
      "python": "class NewsletterPublisher:\n\n    def __init__(self):\n        pass\n\n    def subscribe(self, *args, **kwargs):\n        pass\n\n    def unsubscribe(self, *args, **kwargs):\n        pass\n\n    def publish(self, *args, **kwargs):\n        pass\n\n# Your NewsletterPublisher object will be instantiated and called as such:\n# obj = NewsletterPublisher()\n",
      "javascript": "class NewsletterPublisher {\n    constructor() {\n        \n    }\n\n    subscribe(...args) {\n        \n    }\n\n    unsubscribe(...args) {\n        \n    }\n\n    publish(...args) {\n        \n    }\n}\n\n/**\n * Your NewsletterPublisher object will be instantiated and called as such:\n * const obj = new NewsletterPublisher();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Newsletter Publisher\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-state-traffic-light",
    "number": 85,
    "title": "Design a Traffic Light State",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "State"
    ],
    "narrative": "Implement State pattern modeling RedState, GreenState, and YellowState encapsulation on a TrafficLightContext.",
    "className": "TrafficLightStateContext",
    "constructorSig": "public TrafficLightStateContext()",
    "methods": [
      {
        "sig": "public void next()",
        "desc": "delegates state transition to active state object."
      },
      {
        "sig": "public String getColor()",
        "desc": "returns current state representation."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TrafficLightStateContext()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TrafficLightStateContext()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TrafficLightStateContext()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement State pattern modeling RedState, GreenState, and YellowState encapsulation on a TrafficLightContext.\n\n### Implement the `TrafficLightStateContext` class:\n\n- `TrafficLightStateContext()` creates an initialized instance.\n- `void next()` delegates state transition to active state object.\n- `String getColor()` returns current state representation.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TrafficLightStateContext()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TrafficLightStateContext\n\nclass TrafficLightStateContext {\n    public TrafficLightStateContext() {\n        \n    }\n\n    public void next() {\n        \n    }\n\n    public String getColor() {\n        \n    }\n}\n\n/**\n * Your TrafficLightStateContext object will be instantiated and called as such:\n * TrafficLightStateContext obj = new TrafficLightStateContext();\n * Object param_1 = obj.next();\n * Object param_2 = obj.getColor();\n */",
      "python": "class TrafficLightStateContext:\n\n    def __init__(self):\n        pass\n\n    def next(self, *args, **kwargs):\n        pass\n\n    def getColor(self, *args, **kwargs):\n        pass\n\n# Your TrafficLightStateContext object will be instantiated and called as such:\n# obj = TrafficLightStateContext()\n",
      "javascript": "class TrafficLightStateContext {\n    constructor() {\n        \n    }\n\n    next(...args) {\n        \n    }\n\n    getColor(...args) {\n        \n    }\n}\n\n/**\n * Your TrafficLightStateContext object will be instantiated and called as such:\n * const obj = new TrafficLightStateContext();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Traffic Light State\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-beverage-station",
    "number": 86,
    "title": "Design a Beverage Station",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Template Method"
    ],
    "narrative": "Implement Template Method pattern in BeverageMaker with fixed algorithm (boilWater -> brew -> pourInCup -> addCondiments) overridden by Tea and Coffee subclasses.",
    "className": "BeverageMaker",
    "constructorSig": "public BeverageMaker()",
    "methods": [
      {
        "sig": "public void prepareRecipe()",
        "desc": "executes template skeleton in fixed order."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new BeverageMaker()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new BeverageMaker()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new BeverageMaker()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Template Method pattern in BeverageMaker with fixed algorithm (boilWater -> brew -> pourInCup -> addCondiments) overridden by Tea and Coffee subclasses.\n\n### Implement the `BeverageMaker` class:\n\n- `BeverageMaker()` creates an initialized instance.\n- `void prepareRecipe()` executes template skeleton in fixed order.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new BeverageMaker()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class BeverageMaker\n\nclass BeverageMaker {\n    public BeverageMaker() {\n        \n    }\n\n    public void prepareRecipe() {\n        \n    }\n}\n\n/**\n * Your BeverageMaker object will be instantiated and called as such:\n * BeverageMaker obj = new BeverageMaker();\n * Object param_1 = obj.prepareRecipe();\n */",
      "python": "class BeverageMaker:\n\n    def __init__(self):\n        pass\n\n    def prepareRecipe(self, *args, **kwargs):\n        pass\n\n# Your BeverageMaker object will be instantiated and called as such:\n# obj = BeverageMaker()\n",
      "javascript": "class BeverageMaker {\n    constructor() {\n        \n    }\n\n    prepareRecipe(...args) {\n        \n    }\n}\n\n/**\n * Your BeverageMaker object will be instantiated and called as such:\n * const obj = new BeverageMaker();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Beverage Station\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-undoable-counter",
    "number": 87,
    "title": "Design an Undoable Counter",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Easy",
    "topics": [
      "Memento"
    ],
    "narrative": "Implement the Memento pattern on CounterOriginator creating CounterMemento snapshots and restoring previous count states on undo().",
    "className": "CounterOriginator",
    "constructorSig": "public CounterOriginator()",
    "methods": [
      {
        "sig": "public void increment()",
        "desc": "adds 1 to count."
      },
      {
        "sig": "public CounterMemento save()",
        "desc": "creates state snapshot memento."
      },
      {
        "sig": "public void restore(CounterMemento memento)",
        "desc": "restores previous count from memento."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new CounterOriginator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CounterOriginator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new CounterOriginator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement the Memento pattern on CounterOriginator creating CounterMemento snapshots and restoring previous count states on undo().\n\n### Implement the `CounterOriginator` class:\n\n- `CounterOriginator()` creates an initialized instance.\n- `void increment()` adds 1 to count.\n- `CounterMemento save()` creates state snapshot memento.\n- `void restore(CounterMemento memento)` restores previous count from memento.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new CounterOriginator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class CounterOriginator\n\nclass CounterOriginator {\n    public CounterOriginator() {\n        \n    }\n\n    public void increment() {\n        \n    }\n\n    public CounterMemento save() {\n        \n    }\n\n    public void restore(CounterMemento memento) {\n        \n    }\n}\n\n/**\n * Your CounterOriginator object will be instantiated and called as such:\n * CounterOriginator obj = new CounterOriginator();\n * Object param_1 = obj.increment();\n * Object param_2 = obj.save();\n * Object param_3 = obj.restore(CounterMemento memento);\n */",
      "python": "class CounterOriginator:\n\n    def __init__(self):\n        pass\n\n    def increment(self, *args, **kwargs):\n        pass\n\n    def save(self, *args, **kwargs):\n        pass\n\n    def restore(self, *args, **kwargs):\n        pass\n\n# Your CounterOriginator object will be instantiated and called as such:\n# obj = CounterOriginator()\n",
      "javascript": "class CounterOriginator {\n    constructor() {\n        \n    }\n\n    increment(...args) {\n        \n    }\n\n    save(...args) {\n        \n    }\n\n    restore(...args) {\n        \n    }\n}\n\n/**\n * Your CounterOriginator object will be instantiated and called as such:\n * const obj = new CounterOriginator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design an Undoable Counter\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-music-library-iterator",
    "number": 88,
    "title": "Design a Music Library Iterator",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Iterator"
    ],
    "narrative": "Implement multiple iterators on MusicLibrary: SequentialIterator, ShuffleIterator, and GenreFilterIterator.",
    "className": "MusicLibrary",
    "constructorSig": "public MusicLibrary()",
    "methods": [
      {
        "sig": "public java.util.Iterator<Song> getShuffleIterator()",
        "desc": "returns random-order non-repeating iterator."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new MusicLibrary()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new MusicLibrary()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new MusicLibrary()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement multiple iterators on MusicLibrary: SequentialIterator, ShuffleIterator, and GenreFilterIterator.\n\n### Implement the `MusicLibrary` class:\n\n- `MusicLibrary()` creates an initialized instance.\n- `java.util.Iterator<Song> getShuffleIterator()` returns random-order non-repeating iterator.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new MusicLibrary()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class MusicLibrary\n\nclass MusicLibrary {\n    public MusicLibrary() {\n        \n    }\n\n    public java.util.Iterator<Song> getShuffleIterator() {\n        \n    }\n}\n\n/**\n * Your MusicLibrary object will be instantiated and called as such:\n * MusicLibrary obj = new MusicLibrary();\n * Object param_1 = obj.getShuffleIterator();\n */",
      "python": "class MusicLibrary:\n\n    def __init__(self):\n        pass\n\n    def getShuffleIterator(self, *args, **kwargs):\n        pass\n\n# Your MusicLibrary object will be instantiated and called as such:\n# obj = MusicLibrary()\n",
      "javascript": "class MusicLibrary {\n    constructor() {\n        \n    }\n\n    getShuffleIterator(...args) {\n        \n    }\n}\n\n/**\n * Your MusicLibrary object will be instantiated and called as such:\n * const obj = new MusicLibrary();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Music Library Iterator\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-stock-alerts",
    "number": 89,
    "title": "Design Stock Price Alerts",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Observer"
    ],
    "narrative": "Implement StockMarket Subject notifying PriceAlertObserver clients whenever a stock crosses a threshold price.",
    "className": "StockMarket",
    "constructorSig": "public StockMarket()",
    "methods": [
      {
        "sig": "public void setPrice(String symbol, double newPrice)",
        "desc": "updates stock price and fires observers."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new StockMarket()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new StockMarket()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new StockMarket()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement StockMarket Subject notifying PriceAlertObserver clients whenever a stock crosses a threshold price.\n\n### Implement the `StockMarket` class:\n\n- `StockMarket()` creates an initialized instance.\n- `void setPrice(String symbol, double newPrice)` updates stock price and fires observers.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new StockMarket()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class StockMarket\n\nclass StockMarket {\n    public StockMarket() {\n        \n    }\n\n    public void setPrice(String symbol, double newPrice) {\n        \n    }\n}\n\n/**\n * Your StockMarket object will be instantiated and called as such:\n * StockMarket obj = new StockMarket();\n * Object param_1 = obj.setPrice(String symbol, double newPrice);\n */",
      "python": "class StockMarket:\n\n    def __init__(self):\n        pass\n\n    def setPrice(self, *args, **kwargs):\n        pass\n\n# Your StockMarket object will be instantiated and called as such:\n# obj = StockMarket()\n",
      "javascript": "class StockMarket {\n    constructor() {\n        \n    }\n\n    setPrice(...args) {\n        \n    }\n}\n\n/**\n * Your StockMarket object will be instantiated and called as such:\n * const obj = new StockMarket();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design Stock Price Alerts\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-weather-station",
    "number": 90,
    "title": "Design a Weather Station",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Observer"
    ],
    "narrative": "Implement WeatherData subject updating CurrentConditionsDisplay, StatisticsDisplay, and ForecastDisplay observers upon weather measurements.",
    "className": "WeatherData",
    "constructorSig": "public WeatherData()",
    "methods": [
      {
        "sig": "public void setMeasurements(double temp, double humidity, double pressure)",
        "desc": "notifies all display observers."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new WeatherData()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new WeatherData()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new WeatherData()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement WeatherData subject updating CurrentConditionsDisplay, StatisticsDisplay, and ForecastDisplay observers upon weather measurements.\n\n### Implement the `WeatherData` class:\n\n- `WeatherData()` creates an initialized instance.\n- `void setMeasurements(double temp, double humidity, double pressure)` notifies all display observers.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new WeatherData()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class WeatherData\n\nclass WeatherData {\n    public WeatherData() {\n        \n    }\n\n    public void setMeasurements(double temp, double humidity, double pressure) {\n        \n    }\n}\n\n/**\n * Your WeatherData object will be instantiated and called as such:\n * WeatherData obj = new WeatherData();\n * Object param_1 = obj.setMeasurements(double temp, double humidity, double pressure);\n */",
      "python": "class WeatherData:\n\n    def __init__(self):\n        pass\n\n    def setMeasurements(self, *args, **kwargs):\n        pass\n\n# Your WeatherData object will be instantiated and called as such:\n# obj = WeatherData()\n",
      "javascript": "class WeatherData {\n    constructor() {\n        \n    }\n\n    setMeasurements(...args) {\n        \n    }\n}\n\n/**\n * Your WeatherData object will be instantiated and called as such:\n * const obj = new WeatherData();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Weather Station\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-text-editor",
    "number": 91,
    "title": "Design a Text Editor",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Command"
    ],
    "narrative": "Implement Command pattern with InsertTextCommand, DeleteTextCommand, and UndoCommand maintaining an undo/redo stack.",
    "className": "TextEditorInvoker",
    "constructorSig": "public TextEditorInvoker()",
    "methods": [
      {
        "sig": "public void executeCommand(Command cmd)",
        "desc": "runs command and pushes to undo stack."
      },
      {
        "sig": "public void undo()",
        "desc": "un-executes last command."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TextEditorInvoker()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TextEditorInvoker()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TextEditorInvoker()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Command pattern with InsertTextCommand, DeleteTextCommand, and UndoCommand maintaining an undo/redo stack.\n\n### Implement the `TextEditorInvoker` class:\n\n- `TextEditorInvoker()` creates an initialized instance.\n- `void executeCommand(Command cmd)` runs command and pushes to undo stack.\n- `void undo()` un-executes last command.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TextEditorInvoker()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TextEditorInvoker\n\nclass TextEditorInvoker {\n    public TextEditorInvoker() {\n        \n    }\n\n    public void executeCommand(Command cmd) {\n        \n    }\n\n    public void undo() {\n        \n    }\n}\n\n/**\n * Your TextEditorInvoker object will be instantiated and called as such:\n * TextEditorInvoker obj = new TextEditorInvoker();\n * Object param_1 = obj.executeCommand(Command cmd);\n * Object param_2 = obj.undo();\n */",
      "python": "class TextEditorInvoker:\n\n    def __init__(self):\n        pass\n\n    def executeCommand(self, *args, **kwargs):\n        pass\n\n    def undo(self, *args, **kwargs):\n        pass\n\n# Your TextEditorInvoker object will be instantiated and called as such:\n# obj = TextEditorInvoker()\n",
      "javascript": "class TextEditorInvoker {\n    constructor() {\n        \n    }\n\n    executeCommand(...args) {\n        \n    }\n\n    undo(...args) {\n        \n    }\n}\n\n/**\n * Your TextEditorInvoker object will be instantiated and called as such:\n * const obj = new TextEditorInvoker();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Text Editor\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-database-transaction",
    "number": 92,
    "title": "Design a Database Transaction",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Command"
    ],
    "narrative": "Design a TransactionManager executing InsertRowCommand, UpdateRowCommand with atomic rollback() on failure.",
    "className": "TransactionManager",
    "constructorSig": "public TransactionManager()",
    "methods": [
      {
        "sig": "public void addCommand(DatabaseCommand cmd)",
        "desc": "queues command."
      },
      {
        "sig": "public boolean commit()",
        "desc": "executes all or rolls back on failure."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new TransactionManager()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TransactionManager()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new TransactionManager()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Design a TransactionManager executing InsertRowCommand, UpdateRowCommand with atomic rollback() on failure.\n\n### Implement the `TransactionManager` class:\n\n- `TransactionManager()` creates an initialized instance.\n- `void addCommand(DatabaseCommand cmd)` queues command.\n- `boolean commit()` executes all or rolls back on failure.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new TransactionManager()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class TransactionManager\n\nclass TransactionManager {\n    public TransactionManager() {\n        \n    }\n\n    public void addCommand(DatabaseCommand cmd) {\n        \n    }\n\n    public boolean commit() {\n        \n    }\n}\n\n/**\n * Your TransactionManager object will be instantiated and called as such:\n * TransactionManager obj = new TransactionManager();\n * Object param_1 = obj.addCommand(DatabaseCommand cmd);\n * Object param_2 = obj.commit();\n */",
      "python": "class TransactionManager:\n\n    def __init__(self):\n        pass\n\n    def addCommand(self, *args, **kwargs):\n        pass\n\n    def commit(self, *args, **kwargs):\n        pass\n\n# Your TransactionManager object will be instantiated and called as such:\n# obj = TransactionManager()\n",
      "javascript": "class TransactionManager {\n    constructor() {\n        \n    }\n\n    addCommand(...args) {\n        \n    }\n\n    commit(...args) {\n        \n    }\n}\n\n/**\n * Your TransactionManager object will be instantiated and called as such:\n * const obj = new TransactionManager();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Database Transaction\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-atm-machine",
    "number": 93,
    "title": "Design an ATM Machine",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "State"
    ],
    "narrative": "Implement ATM state transitions: NoCardState -> HasCardState -> CorrectPinState -> DispensingCashState.",
    "className": "ATMMachine",
    "constructorSig": "public ATMMachine(int initialCash)",
    "methods": [
      {
        "sig": "public boolean insertCard()",
        "desc": "transitions to HasCard state."
      },
      {
        "sig": "public boolean enterPin(int pin)",
        "desc": "validates PIN."
      },
      {
        "sig": "public boolean withdraw(int amount)",
        "desc": "dispenses cash if state allows."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ATMMachine()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ATMMachine()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ATMMachine()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement ATM state transitions: NoCardState -> HasCardState -> CorrectPinState -> DispensingCashState.\n\n### Implement the `ATMMachine` class:\n\n- `ATMMachine(int initialCash)` creates an initialized instance.\n- `boolean insertCard()` transitions to HasCard state.\n- `boolean enterPin(int pin)` validates PIN.\n- `boolean withdraw(int amount)` dispenses cash if state allows.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ATMMachine()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ATMMachine\n\nclass ATMMachine {\n    public ATMMachine(int initialCash) {\n        \n    }\n\n    public boolean insertCard() {\n        \n    }\n\n    public boolean enterPin(int pin) {\n        \n    }\n\n    public boolean withdraw(int amount) {\n        \n    }\n}\n\n/**\n * Your ATMMachine object will be instantiated and called as such:\n * ATMMachine obj = new ATMMachine();\n * Object param_1 = obj.insertCard();\n * Object param_2 = obj.enterPin(int pin);\n * Object param_3 = obj.withdraw(int amount);\n */",
      "python": "class ATMMachine:\n\n    def __init__(self):\n        pass\n\n    def insertCard(self, *args, **kwargs):\n        pass\n\n    def enterPin(self, *args, **kwargs):\n        pass\n\n    def withdraw(self, *args, **kwargs):\n        pass\n\n# Your ATMMachine object will be instantiated and called as such:\n# obj = ATMMachine()\n",
      "javascript": "class ATMMachine {\n    constructor() {\n        \n    }\n\n    insertCard(...args) {\n        \n    }\n\n    enterPin(...args) {\n        \n    }\n\n    withdraw(...args) {\n        \n    }\n}\n\n/**\n * Your ATMMachine object will be instantiated and called as such:\n * const obj = new ATMMachine();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design an ATM Machine\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-order-processor-state",
    "number": 94,
    "title": "Design an Order Processor State",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "State"
    ],
    "narrative": "Implement State pattern modeling NewOrderState, PaidOrderState, ShippedOrderState, and RefundedOrderState behaviors.",
    "className": "OrderStateContext",
    "constructorSig": "public OrderStateContext()",
    "methods": [
      {
        "sig": "public void processPayment()",
        "desc": "delegates to active state."
      },
      {
        "sig": "public void ship()",
        "desc": "ships order if in Paid state."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new OrderStateContext()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new OrderStateContext()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new OrderStateContext()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement State pattern modeling NewOrderState, PaidOrderState, ShippedOrderState, and RefundedOrderState behaviors.\n\n### Implement the `OrderStateContext` class:\n\n- `OrderStateContext()` creates an initialized instance.\n- `void processPayment()` delegates to active state.\n- `void ship()` ships order if in Paid state.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new OrderStateContext()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class OrderStateContext\n\nclass OrderStateContext {\n    public OrderStateContext() {\n        \n    }\n\n    public void processPayment() {\n        \n    }\n\n    public void ship() {\n        \n    }\n}\n\n/**\n * Your OrderStateContext object will be instantiated and called as such:\n * OrderStateContext obj = new OrderStateContext();\n * Object param_1 = obj.processPayment();\n * Object param_2 = obj.ship();\n */",
      "python": "class OrderStateContext:\n\n    def __init__(self):\n        pass\n\n    def processPayment(self, *args, **kwargs):\n        pass\n\n    def ship(self, *args, **kwargs):\n        pass\n\n# Your OrderStateContext object will be instantiated and called as such:\n# obj = OrderStateContext()\n",
      "javascript": "class OrderStateContext {\n    constructor() {\n        \n    }\n\n    processPayment(...args) {\n        \n    }\n\n    ship(...args) {\n        \n    }\n}\n\n/**\n * Your OrderStateContext object will be instantiated and called as such:\n * const obj = new OrderStateContext();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design an Order Processor State\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-build-pipeline",
    "number": 95,
    "title": "Design a Build Pipeline",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Template Method"
    ],
    "narrative": "Implement Template Method CI/CD pipeline (checkoutCode -> compile -> runUnitTests -> packageArtifact -> deploy) with JavaPipeline and NodePipeline subclasses.",
    "className": "CIPipeline",
    "constructorSig": "public CIPipeline()",
    "methods": [
      {
        "sig": "public boolean runPipeline()",
        "desc": "executes build steps in fixed sequence."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new CIPipeline()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CIPipeline()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new CIPipeline()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Template Method CI/CD pipeline (checkoutCode -> compile -> runUnitTests -> packageArtifact -> deploy) with JavaPipeline and NodePipeline subclasses.\n\n### Implement the `CIPipeline` class:\n\n- `CIPipeline()` creates an initialized instance.\n- `boolean runPipeline()` executes build steps in fixed sequence.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new CIPipeline()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class CIPipeline\n\nclass CIPipeline {\n    public CIPipeline() {\n        \n    }\n\n    public boolean runPipeline() {\n        \n    }\n}\n\n/**\n * Your CIPipeline object will be instantiated and called as such:\n * CIPipeline obj = new CIPipeline();\n * Object param_1 = obj.runPipeline();\n */",
      "python": "class CIPipeline:\n\n    def __init__(self):\n        pass\n\n    def runPipeline(self, *args, **kwargs):\n        pass\n\n# Your CIPipeline object will be instantiated and called as such:\n# obj = CIPipeline()\n",
      "javascript": "class CIPipeline {\n    constructor() {\n        \n    }\n\n    runPipeline(...args) {\n        \n    }\n}\n\n/**\n * Your CIPipeline object will be instantiated and called as such:\n * const obj = new CIPipeline();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Build Pipeline\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-document-parser-template",
    "number": 96,
    "title": "Design a Document Parser Template",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Template Method"
    ],
    "narrative": "Implement DataMiner template (openFile -> extractRawData -> parseData -> analyze -> closeFile) with PDFMiner and ExcelMiner.",
    "className": "DataMiner",
    "constructorSig": "public DataMiner()",
    "methods": [
      {
        "sig": "public Report mine(String path)",
        "desc": "executes mining algorithm skeleton."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new DataMiner()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DataMiner()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new DataMiner()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement DataMiner template (openFile -> extractRawData -> parseData -> analyze -> closeFile) with PDFMiner and ExcelMiner.\n\n### Implement the `DataMiner` class:\n\n- `DataMiner()` creates an initialized instance.\n- `Report mine(String path)` executes mining algorithm skeleton.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new DataMiner()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class DataMiner\n\nclass DataMiner {\n    public DataMiner() {\n        \n    }\n\n    public Report mine(String path) {\n        \n    }\n}\n\n/**\n * Your DataMiner object will be instantiated and called as such:\n * DataMiner obj = new DataMiner();\n * Object param_1 = obj.mine(String path);\n */",
      "python": "class DataMiner:\n\n    def __init__(self):\n        pass\n\n    def mine(self, *args, **kwargs):\n        pass\n\n# Your DataMiner object will be instantiated and called as such:\n# obj = DataMiner()\n",
      "javascript": "class DataMiner {\n    constructor() {\n        \n    }\n\n    mine(...args) {\n        \n    }\n}\n\n/**\n * Your DataMiner object will be instantiated and called as such:\n * const obj = new DataMiner();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Document Parser Template\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-logging-framework",
    "number": 97,
    "title": "Design a Logging Framework",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Chain of Responsibility"
    ],
    "narrative": "Implement Chain of Responsibility with InfoLogger -> DebugLogger -> ErrorLogger handlers processing log records based on severity.",
    "className": "LoggerChain",
    "constructorSig": "public LoggerChain()",
    "methods": [
      {
        "sig": "public void logMessage(int level, String msg)",
        "desc": "passes log message down handler chain."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new LoggerChain()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new LoggerChain()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new LoggerChain()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Chain of Responsibility with InfoLogger -> DebugLogger -> ErrorLogger handlers processing log records based on severity.\n\n### Implement the `LoggerChain` class:\n\n- `LoggerChain()` creates an initialized instance.\n- `void logMessage(int level, String msg)` passes log message down handler chain.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new LoggerChain()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class LoggerChain\n\nclass LoggerChain {\n    public LoggerChain() {\n        \n    }\n\n    public void logMessage(int level, String msg) {\n        \n    }\n}\n\n/**\n * Your LoggerChain object will be instantiated and called as such:\n * LoggerChain obj = new LoggerChain();\n * Object param_1 = obj.logMessage(int level, String msg);\n */",
      "python": "class LoggerChain:\n\n    def __init__(self):\n        pass\n\n    def logMessage(self, *args, **kwargs):\n        pass\n\n# Your LoggerChain object will be instantiated and called as such:\n# obj = LoggerChain()\n",
      "javascript": "class LoggerChain {\n    constructor() {\n        \n    }\n\n    logMessage(...args) {\n        \n    }\n}\n\n/**\n * Your LoggerChain object will be instantiated and called as such:\n * const obj = new LoggerChain();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Logging Framework\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-expense-approval-chain",
    "number": 98,
    "title": "Design an Expense Approval Chain",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Chain of Responsibility"
    ],
    "narrative": "Implement approval hierarchy (TeamLead <= $1,000, Director <= $10,000, VP <= $50,000, Board > $50,000) using Chain of Responsibility.",
    "className": "ExpenseApprovalChain",
    "constructorSig": "public ExpenseApprovalChain()",
    "methods": [
      {
        "sig": "public String processExpense(double amount, String purpose)",
        "desc": "routes expense to proper approving authority."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ExpenseApprovalChain()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ExpenseApprovalChain()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ExpenseApprovalChain()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement approval hierarchy (TeamLead <= $1,000, Director <= $10,000, VP <= $50,000, Board > $50,000) using Chain of Responsibility.\n\n### Implement the `ExpenseApprovalChain` class:\n\n- `ExpenseApprovalChain()` creates an initialized instance.\n- `String processExpense(double amount, String purpose)` routes expense to proper approving authority.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ExpenseApprovalChain()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ExpenseApprovalChain\n\nclass ExpenseApprovalChain {\n    public ExpenseApprovalChain() {\n        \n    }\n\n    public String processExpense(double amount, String purpose) {\n        \n    }\n}\n\n/**\n * Your ExpenseApprovalChain object will be instantiated and called as such:\n * ExpenseApprovalChain obj = new ExpenseApprovalChain();\n * Object param_1 = obj.processExpense(double amount, String purpose);\n */",
      "python": "class ExpenseApprovalChain:\n\n    def __init__(self):\n        pass\n\n    def processExpense(self, *args, **kwargs):\n        pass\n\n# Your ExpenseApprovalChain object will be instantiated and called as such:\n# obj = ExpenseApprovalChain()\n",
      "javascript": "class ExpenseApprovalChain {\n    constructor() {\n        \n    }\n\n    processExpense(...args) {\n        \n    }\n}\n\n/**\n * Your ExpenseApprovalChain object will be instantiated and called as such:\n * const obj = new ExpenseApprovalChain();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design an Expense Approval Chain\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-message-inbox-visitor",
    "number": 99,
    "title": "Design a Message Inbox Visitor",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Visitor"
    ],
    "narrative": "Implement Visitor pattern with MessageVisitor performing operations (WordCountVisitor, SpamFilterVisitor) across TextMessage and AudioMessage elements.",
    "className": "MessageInbox",
    "constructorSig": "public MessageInbox()",
    "methods": [
      {
        "sig": "public void accept(MessageVisitor visitor)",
        "desc": "visits all elements in inbox."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new MessageInbox()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new MessageInbox()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new MessageInbox()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Visitor pattern with MessageVisitor performing operations (WordCountVisitor, SpamFilterVisitor) across TextMessage and AudioMessage elements.\n\n### Implement the `MessageInbox` class:\n\n- `MessageInbox()` creates an initialized instance.\n- `void accept(MessageVisitor visitor)` visits all elements in inbox.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new MessageInbox()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class MessageInbox\n\nclass MessageInbox {\n    public MessageInbox() {\n        \n    }\n\n    public void accept(MessageVisitor visitor) {\n        \n    }\n}\n\n/**\n * Your MessageInbox object will be instantiated and called as such:\n * MessageInbox obj = new MessageInbox();\n * Object param_1 = obj.accept(MessageVisitor visitor);\n */",
      "python": "class MessageInbox:\n\n    def __init__(self):\n        pass\n\n    def accept(self, *args, **kwargs):\n        pass\n\n# Your MessageInbox object will be instantiated and called as such:\n# obj = MessageInbox()\n",
      "javascript": "class MessageInbox {\n    constructor() {\n        \n    }\n\n    accept(...args) {\n        \n    }\n}\n\n/**\n * Your MessageInbox object will be instantiated and called as such:\n * const obj = new MessageInbox();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Message Inbox Visitor\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-chat-room",
    "number": 100,
    "title": "Design a Chat Room",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Mediator"
    ],
    "narrative": "Implement Mediator pattern where ChatRoomMediator coordinates message sending and private messaging between User instances without direct user coupling.",
    "className": "ChatRoomMediator",
    "constructorSig": "public ChatRoomMediator()",
    "methods": [
      {
        "sig": "public void sendMessage(String msg, User sender)",
        "desc": "broadcasts message to all users except sender."
      },
      {
        "sig": "public void sendPrivate(String msg, User sender, String receiverId)",
        "desc": "delivers message to target user."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new ChatRoomMediator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ChatRoomMediator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new ChatRoomMediator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Mediator pattern where ChatRoomMediator coordinates message sending and private messaging between User instances without direct user coupling.\n\n### Implement the `ChatRoomMediator` class:\n\n- `ChatRoomMediator()` creates an initialized instance.\n- `void sendMessage(String msg, User sender)` broadcasts message to all users except sender.\n- `void sendPrivate(String msg, User sender, String receiverId)` delivers message to target user.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new ChatRoomMediator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class ChatRoomMediator\n\nclass ChatRoomMediator {\n    public ChatRoomMediator() {\n        \n    }\n\n    public void sendMessage(String msg, User sender) {\n        \n    }\n\n    public void sendPrivate(String msg, User sender, String receiverId) {\n        \n    }\n}\n\n/**\n * Your ChatRoomMediator object will be instantiated and called as such:\n * ChatRoomMediator obj = new ChatRoomMediator();\n * Object param_1 = obj.sendMessage(String msg, User sender);\n * Object param_2 = obj.sendPrivate(String msg, User sender, String receiverId);\n */",
      "python": "class ChatRoomMediator:\n\n    def __init__(self):\n        pass\n\n    def sendMessage(self, *args, **kwargs):\n        pass\n\n    def sendPrivate(self, *args, **kwargs):\n        pass\n\n# Your ChatRoomMediator object will be instantiated and called as such:\n# obj = ChatRoomMediator()\n",
      "javascript": "class ChatRoomMediator {\n    constructor() {\n        \n    }\n\n    sendMessage(...args) {\n        \n    }\n\n    sendPrivate(...args) {\n        \n    }\n}\n\n/**\n * Your ChatRoomMediator object will be instantiated and called as such:\n * const obj = new ChatRoomMediator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Chat Room\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-game-save-system",
    "number": 101,
    "title": "Design a Game Save System",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Medium",
    "topics": [
      "Memento"
    ],
    "narrative": "Implement Memento pattern on GameState saving checkpoint mementos to GameSaveCaretaker and restoring upon player defeat.",
    "className": "GameStateOriginator",
    "constructorSig": "public GameStateOriginator()",
    "methods": [
      {
        "sig": "public GameMemento saveCheckpoint()",
        "desc": "creates game state memento."
      },
      {
        "sig": "public void loadCheckpoint(GameMemento memento)",
        "desc": "restores game state."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new GameStateOriginator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new GameStateOriginator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new GameStateOriginator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Memento pattern on GameState saving checkpoint mementos to GameSaveCaretaker and restoring upon player defeat.\n\n### Implement the `GameStateOriginator` class:\n\n- `GameStateOriginator()` creates an initialized instance.\n- `GameMemento saveCheckpoint()` creates game state memento.\n- `void loadCheckpoint(GameMemento memento)` restores game state.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new GameStateOriginator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class GameStateOriginator\n\nclass GameStateOriginator {\n    public GameStateOriginator() {\n        \n    }\n\n    public GameMemento saveCheckpoint() {\n        \n    }\n\n    public void loadCheckpoint(GameMemento memento) {\n        \n    }\n}\n\n/**\n * Your GameStateOriginator object will be instantiated and called as such:\n * GameStateOriginator obj = new GameStateOriginator();\n * Object param_1 = obj.saveCheckpoint();\n * Object param_2 = obj.loadCheckpoint(GameMemento memento);\n */",
      "python": "class GameStateOriginator:\n\n    def __init__(self):\n        pass\n\n    def saveCheckpoint(self, *args, **kwargs):\n        pass\n\n    def loadCheckpoint(self, *args, **kwargs):\n        pass\n\n# Your GameStateOriginator object will be instantiated and called as such:\n# obj = GameStateOriginator()\n",
      "javascript": "class GameStateOriginator {\n    constructor() {\n        \n    }\n\n    saveCheckpoint(...args) {\n        \n    }\n\n    loadCheckpoint(...args) {\n        \n    }\n}\n\n/**\n * Your GameStateOriginator object will be instantiated and called as such:\n * const obj = new GameStateOriginator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Game Save System\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-paginated-catalog",
    "number": 102,
    "title": "Design a Paginated Catalog",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Iterator"
    ],
    "narrative": "Implement a two-tier PaginatedIterator that transparently fetches next page chunks from a remote backend as the client calls next().",
    "className": "PaginatedCatalogIterator",
    "constructorSig": "public PaginatedCatalogIterator(RemoteBackendService backend)",
    "methods": [
      {
        "sig": "public boolean hasNext()",
        "desc": "checks local page or pre-fetches next page."
      },
      {
        "sig": "public Product next()",
        "desc": "returns next product."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new PaginatedCatalogIterator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PaginatedCatalogIterator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new PaginatedCatalogIterator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement a two-tier PaginatedIterator that transparently fetches next page chunks from a remote backend as the client calls next().\n\n### Implement the `PaginatedCatalogIterator` class:\n\n- `PaginatedCatalogIterator(RemoteBackendService backend)` creates an initialized instance.\n- `boolean hasNext()` checks local page or pre-fetches next page.\n- `Product next()` returns next product.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new PaginatedCatalogIterator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class PaginatedCatalogIterator\n\nclass PaginatedCatalogIterator {\n    public PaginatedCatalogIterator(RemoteBackendService backend) {\n        \n    }\n\n    public boolean hasNext() {\n        \n    }\n\n    public Product next() {\n        \n    }\n}\n\n/**\n * Your PaginatedCatalogIterator object will be instantiated and called as such:\n * PaginatedCatalogIterator obj = new PaginatedCatalogIterator();\n * Object param_1 = obj.hasNext();\n * Object param_2 = obj.next();\n */",
      "python": "class PaginatedCatalogIterator:\n\n    def __init__(self):\n        pass\n\n    def hasNext(self, *args, **kwargs):\n        pass\n\n    def next(self, *args, **kwargs):\n        pass\n\n# Your PaginatedCatalogIterator object will be instantiated and called as such:\n# obj = PaginatedCatalogIterator()\n",
      "javascript": "class PaginatedCatalogIterator {\n    constructor() {\n        \n    }\n\n    hasNext(...args) {\n        \n    }\n\n    next(...args) {\n        \n    }\n}\n\n/**\n * Your PaginatedCatalogIterator object will be instantiated and called as such:\n * const obj = new PaginatedCatalogIterator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Paginated Catalog\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-order-fulfillment-saga",
    "number": 103,
    "title": "Design an Order Fulfillment Saga",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Command"
    ],
    "narrative": "Implement Command pattern with compensating transactions (ReserveStockCommand -> ChargeCardCommand -> ShipPackageCommand) with automatic rollback on step failure.",
    "className": "OrderFulfillmentSaga",
    "constructorSig": "public OrderFulfillmentSaga()",
    "methods": [
      {
        "sig": "public boolean executeSaga(Order order)",
        "desc": "executes commands with compensating rollbacks on failure."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new OrderFulfillmentSaga()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new OrderFulfillmentSaga()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new OrderFulfillmentSaga()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Command pattern with compensating transactions (ReserveStockCommand -> ChargeCardCommand -> ShipPackageCommand) with automatic rollback on step failure.\n\n### Implement the `OrderFulfillmentSaga` class:\n\n- `OrderFulfillmentSaga()` creates an initialized instance.\n- `boolean executeSaga(Order order)` executes commands with compensating rollbacks on failure.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new OrderFulfillmentSaga()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class OrderFulfillmentSaga\n\nclass OrderFulfillmentSaga {\n    public OrderFulfillmentSaga() {\n        \n    }\n\n    public boolean executeSaga(Order order) {\n        \n    }\n}\n\n/**\n * Your OrderFulfillmentSaga object will be instantiated and called as such:\n * OrderFulfillmentSaga obj = new OrderFulfillmentSaga();\n * Object param_1 = obj.executeSaga(Order order);\n */",
      "python": "class OrderFulfillmentSaga:\n\n    def __init__(self):\n        pass\n\n    def executeSaga(self, *args, **kwargs):\n        pass\n\n# Your OrderFulfillmentSaga object will be instantiated and called as such:\n# obj = OrderFulfillmentSaga()\n",
      "javascript": "class OrderFulfillmentSaga {\n    constructor() {\n        \n    }\n\n    executeSaga(...args) {\n        \n    }\n}\n\n/**\n * Your OrderFulfillmentSaga object will be instantiated and called as such:\n * const obj = new OrderFulfillmentSaga();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design an Order Fulfillment Saga\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-support-ticket-router",
    "number": 104,
    "title": "Design a Support Ticket Router",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Chain of Responsibility"
    ],
    "narrative": "Implement dynamic Chain of Responsibility routing customer tickets based on skill tags, language, and SLA tier to Tier1, Tier2, and Specialist handlers.",
    "className": "SupportTicketRouter",
    "constructorSig": "public SupportTicketRouter()",
    "methods": [
      {
        "sig": "public String routeTicket(Ticket ticket)",
        "desc": "passes ticket through matching handler chain."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new SupportTicketRouter()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new SupportTicketRouter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new SupportTicketRouter()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement dynamic Chain of Responsibility routing customer tickets based on skill tags, language, and SLA tier to Tier1, Tier2, and Specialist handlers.\n\n### Implement the `SupportTicketRouter` class:\n\n- `SupportTicketRouter()` creates an initialized instance.\n- `String routeTicket(Ticket ticket)` passes ticket through matching handler chain.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new SupportTicketRouter()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class SupportTicketRouter\n\nclass SupportTicketRouter {\n    public SupportTicketRouter() {\n        \n    }\n\n    public String routeTicket(Ticket ticket) {\n        \n    }\n}\n\n/**\n * Your SupportTicketRouter object will be instantiated and called as such:\n * SupportTicketRouter obj = new SupportTicketRouter();\n * Object param_1 = obj.routeTicket(Ticket ticket);\n */",
      "python": "class SupportTicketRouter:\n\n    def __init__(self):\n        pass\n\n    def routeTicket(self, *args, **kwargs):\n        pass\n\n# Your SupportTicketRouter object will be instantiated and called as such:\n# obj = SupportTicketRouter()\n",
      "javascript": "class SupportTicketRouter {\n    constructor() {\n        \n    }\n\n    routeTicket(...args) {\n        \n    }\n}\n\n/**\n * Your SupportTicketRouter object will be instantiated and called as such:\n * const obj = new SupportTicketRouter();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Support Ticket Router\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-document-visitor",
    "number": 105,
    "title": "Design a Document Visitor",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Visitor"
    ],
    "narrative": "Implement Visitor pattern traversing a Document object hierarchy (Paragraph, Table, Image, Header) with MarkdownExportVisitor and PlainTextVisitor.",
    "className": "DocumentVisitorDemo",
    "constructorSig": "public DocumentVisitorDemo()",
    "methods": [
      {
        "sig": "public String exportDocument(Document doc, DocumentVisitor visitor)",
        "desc": "applies visitor across all document elements."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new DocumentVisitorDemo()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DocumentVisitorDemo()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new DocumentVisitorDemo()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement Visitor pattern traversing a Document object hierarchy (Paragraph, Table, Image, Header) with MarkdownExportVisitor and PlainTextVisitor.\n\n### Implement the `DocumentVisitorDemo` class:\n\n- `DocumentVisitorDemo()` creates an initialized instance.\n- `String exportDocument(Document doc, DocumentVisitor visitor)` applies visitor across all document elements.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new DocumentVisitorDemo()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class DocumentVisitorDemo\n\nclass DocumentVisitorDemo {\n    public DocumentVisitorDemo() {\n        \n    }\n\n    public String exportDocument(Document doc, DocumentVisitor visitor) {\n        \n    }\n}\n\n/**\n * Your DocumentVisitorDemo object will be instantiated and called as such:\n * DocumentVisitorDemo obj = new DocumentVisitorDemo();\n * Object param_1 = obj.exportDocument(Document doc, DocumentVisitor visitor);\n */",
      "python": "class DocumentVisitorDemo:\n\n    def __init__(self):\n        pass\n\n    def exportDocument(self, *args, **kwargs):\n        pass\n\n# Your DocumentVisitorDemo object will be instantiated and called as such:\n# obj = DocumentVisitorDemo()\n",
      "javascript": "class DocumentVisitorDemo {\n    constructor() {\n        \n    }\n\n    exportDocument(...args) {\n        \n    }\n}\n\n/**\n * Your DocumentVisitorDemo object will be instantiated and called as such:\n * const obj = new DocumentVisitorDemo();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Document Visitor\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-turn-based-game-lobby",
    "number": 106,
    "title": "Design a Turn-Based Game Lobby",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Mediator"
    ],
    "narrative": "Implement GameLobbyMediator coordinating matchmaking, turn rotation, and timeout clock events between Player participants in a turn-based board game.",
    "className": "GameLobbyMediator",
    "constructorSig": "public GameLobbyMediator()",
    "methods": [
      {
        "sig": "public void makeMove(Player player, Move move)",
        "desc": "validates move, updates state, and advances turn."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new GameLobbyMediator()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new GameLobbyMediator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new GameLobbyMediator()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement GameLobbyMediator coordinating matchmaking, turn rotation, and timeout clock events between Player participants in a turn-based board game.\n\n### Implement the `GameLobbyMediator` class:\n\n- `GameLobbyMediator()` creates an initialized instance.\n- `void makeMove(Player player, Move move)` validates move, updates state, and advances turn.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new GameLobbyMediator()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class GameLobbyMediator\n\nclass GameLobbyMediator {\n    public GameLobbyMediator() {\n        \n    }\n\n    public void makeMove(Player player, Move move) {\n        \n    }\n}\n\n/**\n * Your GameLobbyMediator object will be instantiated and called as such:\n * GameLobbyMediator obj = new GameLobbyMediator();\n * Object param_1 = obj.makeMove(Player player, Move move);\n */",
      "python": "class GameLobbyMediator:\n\n    def __init__(self):\n        pass\n\n    def makeMove(self, *args, **kwargs):\n        pass\n\n# Your GameLobbyMediator object will be instantiated and called as such:\n# obj = GameLobbyMediator()\n",
      "javascript": "class GameLobbyMediator {\n    constructor() {\n        \n    }\n\n    makeMove(...args) {\n        \n    }\n}\n\n/**\n * Your GameLobbyMediator object will be instantiated and called as such:\n * const obj = new GameLobbyMediator();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Turn-Based Game Lobby\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  },
  {
    "id": "design-document-version-history",
    "number": 107,
    "title": "Design a Document Version History",
    "category": "behavioral-patterns",
    "categoryTitle": "Behavioral Design Patterns",
    "difficulty": "Hard",
    "topics": [
      "Memento"
    ],
    "narrative": "Implement DocumentVersionCaretaker managing branching memento version histories, tag labels, and time-travel rollback.",
    "className": "DocumentVersionCaretaker",
    "constructorSig": "public DocumentVersionCaretaker()",
    "methods": [
      {
        "sig": "public void commitVersion(String tag, DocumentMemento memento)",
        "desc": "saves labeled version memento."
      },
      {
        "sig": "public DocumentMemento getVersion(String tag)",
        "desc": "retrieves tagged version."
      }
    ],
    "rules": [
      "All method calls operate on the instantiated object instance.",
      "Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.",
      "Do not print to stdout in production methods unless explicitly requested."
    ],
    "examples": [
      {
        "input": "obj = new DocumentVersionCaretaker()\nobj.execute()",
        "output": "[result]",
        "explanation": "All object state transitions execute consistently."
      }
    ],
    "constraints": [
      "1 <= operations.length <= 100",
      "All inputs satisfy domain bounds.",
      "At most 100 calls in total are made across all methods."
    ],
    "hints": [
      "Define private member variables to encapsulate the object's internal state.",
      "Initialize state in the constructor without exposing mutable internals.",
      "Validate input parameters before modifying state to ensure strong invariants."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DocumentVersionCaretaker()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "new DocumentVersionCaretaker()",
        "expectedOutput": "Success"
      }
    ],
    "description": "Implement DocumentVersionCaretaker managing branching memento version histories, tag labels, and time-travel rollback.\n\n### Implement the `DocumentVersionCaretaker` class:\n\n- `DocumentVersionCaretaker()` creates an initialized instance.\n- `void commitVersion(String tag, DocumentMemento memento)` saves labeled version memento.\n- `DocumentMemento getVersion(String tag)` retrieves tagged version.\n\n- All method calls operate on the instantiated object instance.\n- Follow OOP best practices: clean encapsulation, minimal coupling, and valid state transitions.\n- Do not print to stdout in production methods unless explicitly requested.\n\n#### Example 1:\n```\nInput:\nobj = new DocumentVersionCaretaker()\nobj.execute()\n\nOutput:\n[result]\n\nExplanation: All object state transitions execute consistently.\n```\n\n\n\n### Constraints\n- 1 <= operations.length <= 100\n- All inputs satisfy domain bounds.\n- At most 100 calls in total are made across all methods.\n\n### How the design is graded (needs 7/10 to pass)\n- **Fields and constructor**: Full marks when fields are private, constructor stores arguments, and initial state is clean.\n- **Methods change the object's own state**: Full marks when methods mutate internal state and return updated values.\n- **Structure and naming**: Full marks for clean naming, minimal coupling, and adhering to designated design principles.\n",
    "rubric": {
      "passingScore": "7/10",
      "fields": "Full marks when fields are private, constructor stores arguments, and initial state is clean.",
      "stateMutation": "Full marks when methods mutate internal state and return updated values.",
      "structure": "Full marks for clean naming, minimal coupling, and adhering to designated design principles."
    },
    "starterCode": {
      "java": "// Implement class DocumentVersionCaretaker\n\nclass DocumentVersionCaretaker {\n    public DocumentVersionCaretaker() {\n        \n    }\n\n    public void commitVersion(String tag, DocumentMemento memento) {\n        \n    }\n\n    public DocumentMemento getVersion(String tag) {\n        \n    }\n}\n\n/**\n * Your DocumentVersionCaretaker object will be instantiated and called as such:\n * DocumentVersionCaretaker obj = new DocumentVersionCaretaker();\n * Object param_1 = obj.commitVersion(String tag, DocumentMemento memento);\n * Object param_2 = obj.getVersion(String tag);\n */",
      "python": "class DocumentVersionCaretaker:\n\n    def __init__(self):\n        pass\n\n    def commitVersion(self, *args, **kwargs):\n        pass\n\n    def getVersion(self, *args, **kwargs):\n        pass\n\n# Your DocumentVersionCaretaker object will be instantiated and called as such:\n# obj = DocumentVersionCaretaker()\n",
      "javascript": "class DocumentVersionCaretaker {\n    constructor() {\n        \n    }\n\n    commitVersion(...args) {\n        \n    }\n\n    getVersion(...args) {\n        \n    }\n}\n\n/**\n * Your DocumentVersionCaretaker object will be instantiated and called as such:\n * const obj = new DocumentVersionCaretaker();\n */"
    },
    "editorial": "### Low-Level Design Analysis: Design a Document Version History\n\n#### 1. Object-Oriented Principles\n- Encapsulate internal fields with private visibility.\n- Favor composition over inheritance where applicable.\n\n#### 2. Design Pattern Trade-offs\n- Ensures high cohesion and loose coupling across interacting components."
  }
];

export const LLD_TOPICS_LIST = [
  "Abstract Factory",
  "Abstraction",
  "Adapter",
  "Aggregation",
  "Association",
  "Bridge",
  "Builder",
  "Chain of Responsibility",
  "Classes and Objects",
  "Command",
  "Composite",
  "Composition",
  "Coupling and Cohesion",
  "DRY Principle",
  "Decorator",
  "Dependency",
  "Encapsulation",
  "Enums",
  "Facade",
  "Factory Method",
  "Flyweight",
  "Inheritance",
  "Interface Segregation",
  "Interfaces",
  "Iterator",
  "KISS Principle",
  "Law of Demeter",
  "Liskov-Substitution",
  "Mediator",
  "Memento",
  "Observer",
  "Open-Closed",
  "Polymorphism",
  "Prototype",
  "Proxy",
  "Separation of Concerns",
  "Single Responsibility",
  "Singleton",
  "State",
  "State Management",
  "Strategy",
  "Template Method",
  "Visitor",
  "YAGNI Principle"
];
