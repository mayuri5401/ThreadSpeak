---
id: "java-classes-methods-objects"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "OOP's Concepts"
title: "Classes, Methods & Objects"
slug: "java-classes-methods-objects"
summary: "Master Class, Objects & Methods in Java: Real-world categorization (Animal, Birds, Vehicles), what is a Class, Method Area metadata, what is a Method, what is an Object (Identity, State, Behavior), 3-step memory instantiation, and 8 complete practical programs with best practices."
eli10: "A Class is an architectural blueprint. An Object is the real physical entity built from that blueprint. A Method is what the object can do (like eat or run)!"
mentalModel: "Class metadata resides in Method Area. 'new ClassName()' allocates memory on the JVM Heap. Stack reference holds the Heap address."
difficulty: "Beginner"
estimatedMinutes: 25
tags: ["Class", "Object", "Methods", "Heap Memory", "Stack Memory", "Method Area", "Instance Variables", "Best Practices"]
animationType: "classes-methods-objects"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Class, Object, and Method invocations in Java."
  code: |
    // 1. Define Animal class
    class Animal {
        String color; // Instance variable (State)

        void run() {  // Method (Behavior)
            System.out.println("I'm running");
        }
    }

    // 2. Main driver class (Best Practice)
    public class MainApp {
        public static void main(String[] args) {
            // Create object (buzo) on Heap
            Animal buzo = new Animal();
            buzo.run(); // Access method
            buzo.color = "Black"; // Set instance variable
            System.out.println("Buzo color is " + buzo.color);
        }
    }
---

# 🏛️ Class, Objects & Methods in Java

---

## 🌍 Real World Example of Class, Methods & Objects

First, let's understand what **Class, Methods & Objects** represent in the real world. Below are some classes:

A **Class** is a template or blueprint used to categorize objects. For example, we can have classes like **Animal**, **Birds**, **Vehicles**, and **Furniture**.

Each class can have multiple objects, which represent real-world entities:
- The **Animal** class can have objects such as **elephant**, **tiger**, **dog**, etc.
- The **Birds** class can have objects like **sparrow**, **peacock**, etc.
- Similarly, other classes will have their respective objects.

Every class has its own **methods**, which define the actions that objects can perform:
- The **Animal** class may have methods like `eat()`, `run()`, `sleep()`, etc.
- The **Birds** class may have methods like `fly()`, `eat()`, etc.

Since objects represent real-world entities, they are used to **call methods and perform actions**.

---

## 🏗️ What is Class in Java ?

- **Class is a blueprint or prototype or template** for creating objects in Java.
- It is **not a real-world entity**, meaning it does not exist physically; it only defines how an object should behave.
- **Class does not occupy physical heap memory** (objects occupy heap memory).

> **📌 NOTE** : Class metadata (such as the number of variables, variable names, method names, constructors, etc.) is stored in the **Method Area (Metaspace)**.

### Syntax:
```java
access-modifiers class ClassName {
    // Fields (Instance Variables) – Store object data
    // Constructors – Initialize objects
    // Methods – Define object behavior
    // Static Members – Shared among all objects
    // Nested Classes – Class inside another class
    // Blocks – Static and instance blocks for initialization
}
```

### Example:
```java
public class Animal {
    // Fields
    int eyes;
    String color;

    // Method
    void run() {
        // Body
    }
}
```

---

## ⚙️ What is Method in Java ?

A **method in Java** is a block of code that performs a specific task and can be reused multiple times.

### Syntax:
```java
access-modifiers return-type methodName(List of Parameters) {
    // Body
}
```

### Example:
```java
public void run(String name) {
    System.out.println(name + " is running");
}
```

We can write computations, data processing, input/output operations, object manipulation, conditional logic etc. inside methods to perform specific tasks efficiently.

---

## 🏎️ What is Object in Java ?

- **Object is an instance of a class**: Objects are created from a class blueprint and represent real data.
- **Object is a real-world entity**: It represents tangible things like a car, person, or book in programming.
- **Object occupies memory**: When an object is created (`new ClassName()`), memory is allocated on the **JVM Heap**.

### An Object has 3 Essential Characteristics:
1. **Identity**: Unique memory reference/address assigned by the JVM (e.g. `@0x7F2A`).
2. **State / Attribute**: Data stored in instance variables (e.g., `color = "Black"`, `eyes = 2`).
3. **Behaviour**: Actions defined in methods (e.g., `run()`, `eat()`).

### Syntax & Mechanics:
```java
ClassName objectName = new ClassName();
```

1. `ClassName objectName;` — Declares a reference variable `objectName` of type `ClassName` on the **Stack**.
2. `new ClassName();` — Creates a new object by dynamically allocating memory in the **Heap** and invoking its constructor.
3. `=` — Assigns the reference address of the newly created Heap object to the variable `objectName`.

- **Access Methods using Objects**:
  ```java
  objectName.methodName();
  ```
- **Access Fields/Variables using Objects**:
  ```java
  objectName.field_name;
  ```

---

## 💻 8 Comprehensive Practical Programs

---

### 📝 Program 1: Basic Class, Object & Method
In this program, we create an `Animal1` class with one `run()` method and call it using the `jumbo` object:

```java
// Define a class named Animal1
public class Animal1 {
    // Method to display a running message
    public void run() {
        System.out.println("I'm running"); // Print a message to the console
    }

    // Main method - entry point of the program
    public static void main(String[] args) {
        // Create an instance (object) of the Animal1 class
        Animal1 jumbo = new Animal1();

        // Call the run method using the object 'jumbo'
        jumbo.run();
    }
}
```

**Output:**
```text
I'm running
```

---

### 📝 Program 2: Multiple Methods (`run` & `eat`)
In this program, the `Animal2` class has two methods (`run()` and `eat()`), and the `jumbo` object accesses both:

```java
// Define a class named Animal2
public class Animal2 {
    // Method to display a running message
    public void run() {
        System.out.println("I'm running"); // Print a message to the console
    }

    // Main method - entry point of the program
    public static void main(String[] args) {
        // Create an instance (object) of the Animal2 class
        Animal2 jumbo = new Animal2();

        // Call the run method using the object 'jumbo'
        jumbo.run();

        // Call the eat method using the object 'jumbo'
        jumbo.eat();
    }

    // Method to display an eating message
    public void eat() {
        System.out.println("I'm eating...!!"); // Print a message to the console
    }
}
```

**Output:**
```text
I'm running
I'm eating...!!
```

---

### 📝 Program 3: Multiple Objects (`jumbo` & `buzo`)
In this program, two objects (`jumbo` and `buzo`) are instantiated from `Animal3` and access both methods:

```java
// Define a class named Animal3
public class Animal3 {
    // Method to display a running message
    public void run() {
        System.out.println("I'm running"); // Print a message indicating the animal is running
    }

    // Main method - entry point of the program
    public static void main(String[] args) {
        // Create an instance (object) of Animal3 named 'jumbo'
        Animal3 jumbo = new Animal3();

        // Call the run method using the 'jumbo' object
        jumbo.run();

        // Call the eat method using the 'jumbo' object
        jumbo.eat();

        // Create another instance (object) of Animal3 named 'buzo'
        Animal3 buzo = new Animal3();

        // Call the eat method using the 'buzo' object
        buzo.eat();

        // Call the run method using the 'buzo' object
        buzo.run();
    }

    // Method to display an eating message
    public void eat() {
        System.out.println("I'm eating...!!"); // Print a message indicating the animal is eating
    }
}
```

**Output:**
```text
I'm running
I'm eating...!!
I'm eating...!!
I'm running
```

---

### 📝 Program 4: Method Parameters
In this program, methods accept a `String name` parameter:

```java
// Define a class named Animal4
public class Animal4 {
    // Method to display that an animal is running
    public void run(String name) {
        System.out.println(name + " is running");
    }

    // Main method - program entry point
    public static void main(String[] args) {
        // Create an object 'jumbo' of Animal4
        Animal4 jumbo = new Animal4();
        jumbo.run("Jumbo"); // Call run method with "Jumbo"
        jumbo.eat("Jumbo"); // Call eat method with "Jumbo"

        // Create another object 'buzo' of Animal4
        Animal4 buzo = new Animal4();
        buzo.eat("Buzo"); // Call eat method with "Buzo"
        buzo.run("Buzo"); // Call run method with "Buzo"
    }

    // Method to display that an animal is eating
    public void eat(String name) {
        System.out.println(name + " is eating...!!");
    }
}
```

**Output:**
```text
Jumbo is running
Jumbo is eating...!!
Buzo is eating...!!
Buzo is running
```

---

### 📝 Program 5: Multiple Parameters in Methods
In this program, methods accept multiple parameters:

```java
// Define a class named Animal5
public class Animal5 {
    // Method to display that an animal has run a certain distance
    public void run(String name, int distance_km) {
        System.out.println(name + " has run " + distance_km + " km");
    }

    // Main method - program entry point
    public static void main(String[] args) {
        // Create an object 'jumbo' of Animal5
        Animal5 jumbo = new Animal5();
        jumbo.run("Jumbo", 5);       // Call run method with name "Jumbo" and distance 5 km
        jumbo.eat("Jumbo", "grass"); // Call eat method with name "Jumbo" and food "grass"

        // Create another object 'buzo' of Animal5
        Animal5 buzo = new Animal5();
        buzo.eat("Buzo", "meat");    // Call eat method with name "Buzo" and food "meat"
        buzo.run("Buzo", 12);        // Call run method with name "Buzo" and distance 12 km
    }

    // Method to display that an animal is eating a specific dish
    public void eat(String name, String dish) {
        System.out.println(name + " is eating " + dish);
    }
}
```

**Output:**
```text
Jumbo has run 5 km
Jumbo is eating grass
Buzo is eating meat
Buzo has run 12 km
```

---

### 📝 Program 6: Instance Variables & Methods
In this program, we declare instance variables `no_of_eyes` and `color` and print their values:

```java
// Define a class named Animal6
public class Animal6 {
    // Declare instance variables
    int no_of_eyes; // Variable to store the number of eyes
    String color;   // Variable to store the color of the animal

    // Method to display the details of an animal
    public void details(String name) {
        System.out.println("-------Details of " + name + "-------");
        System.out.println("Eyes : " + no_of_eyes);
        System.out.println("Color : " + color);
    }

    // Main method - program entry point
    public static void main(String[] args) {
        // Create an object 'jumbo' of Animal6 and assign values
        Animal6 jumbo = new Animal6();
        jumbo.no_of_eyes = 2;
        jumbo.color = "Brown";
        jumbo.details("Jumbo"); // Call details method for 'jumbo'

        // Create another object 'buzo' of Animal6 and assign values
        Animal6 buzo = new Animal6();
        buzo.no_of_eyes = 2;
        buzo.color = "Black";
        buzo.details("Buzo");   // Call details method for 'buzo'
    }
}
```

**Output:**
```text
-------Details of Jumbo-------
Eyes : 2
Color : Brown
-------Details of Buzo-------
Eyes : 2
Color : Black
```

---

### 📝 Program 7: Best Practice (Separate Main Class)
In real-world development, it is **best practice** to keep the entity class separate from the driver class containing the `main()` method:

```java
// Define a class named Animal7
class Animal7 {
    // Method to display a running message
    void run() {
        System.out.println("I'm running");
    }
}

// Define the main class MainApp7
public class MainApp7 {
    // Main method - program entry point
    public static void main(String[] args) {
        // Create an object 'buzo' of Animal7
        Animal7 buzo = new Animal7();
        buzo.run(); // Call the run method
    }
}
```

**Output:**
```text
I'm running
```

---

### 📝 Program 8: Best Practice (Multiple Entity Classes)
Demonstrating multiple entity classes (`Animal8` and `Birds8`) with distinct behaviors executed from a single `MainApp8`:

```java
// Define a class named Animal8
class Animal8 {
    // Method to display a running message
    void run() {
        System.out.println("I'm running");
    }
}

// Define a class named Birds8
class Birds8 {
    // Method to display a flying message
    void fly() {
        System.out.println("I'm flying");
    }
}

// Define the main class MainApp8
public class MainApp8 {
    // Main method - program entry point
    public static void main(String[] args) {
        // Create an object 'buzo' of Animal8 and call the run method
        Animal8 buzo = new Animal8();
        buzo.run();

        // Create an object 'sparrow' of Birds8 and call the fly method
        Birds8 sparrow = new Birds8();
        sparrow.fly();
    }
}
```

**Output:**
```text
I'm running
I'm flying
```
