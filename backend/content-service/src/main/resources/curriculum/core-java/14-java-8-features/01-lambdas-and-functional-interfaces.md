---
id: "java-8-lambdas-functional-interfaces"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Java 8 Features"
title: "Lambda Expressions & Functional Interfaces"
slug: "java-8-lambdas-functional-interfaces"
summary: "Master Java 8 Lambda Expressions and Built-in Functional Interfaces: @FunctionalInterface, Predicate, Function, Consumer, Supplier, and Method References."
eli10: "A Lambda expression is an anonymous shorthand function that you can pass around as a variable, turning 6 lines of anonymous class boilerplate into a single clean line!"
mentalModel: "A Functional Interface has exactly one abstract method (SAM - Single Abstract Method). Lambdas provide clean inline implementations of this SAM without creating anonymous inner class bytecode files."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["Java 8", "Lambdas", "FunctionalInterface", "Predicate", "Function", "Consumer", "Supplier"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Demonstrating the 4 core Java 8 Functional Interfaces: Predicate, Function, Consumer, and Supplier."
  code: |
    import java.util.function.*;

    public class Java8FunctionalDemo {
        public static void main(String[] args) {
            // 1. Predicate<T>: Accepts T, returns boolean (Test)
            Predicate<Integer> isAdult = age -> age >= 18;
            System.out.println("Is 20 Adult? " + isAdult.test(20)); // true

            // 2. Function<T, R>: Accepts T, returns R (Transform)
            Function<String, Integer> stringLength = str -> str.length();
            System.out.println("Length of 'ThreadSpeak': " + stringLength.apply("ThreadSpeak")); // 11

            // 3. Consumer<T>: Accepts T, returns void (Consume/Action)
            Consumer<String> greeter = name -> System.out.println("Hello, " + name + "!");
            greeter.accept("Alice");

            // 4. Supplier<T>: Accepts nothing, returns T (Produce)
            Supplier<Double> randomNum = () -> Math.random();
            System.out.println("Random: " + randomNum.get());
        }
    }
---

# 🚀 Lambda Expressions & Functional Interfaces

---

## 📖 1. What is a Functional Interface?

A **Functional Interface** is an interface that contains **exactly ONE abstract method** (known as **SAM - Single Abstract Method**). It can contain any number of `default` or `static` methods.

It is marked with the optional but recommended annotation **`@FunctionalInterface`** to ensure compile-time validation.

---

## 🔑 2. The 4 Built-In Core Functional Interfaces

| Interface | Method Signature | Purpose | Example |
| :--- | :--- | :--- | :--- |
| **`Predicate<T>`** | `boolean test(T t)` | Filtering / Validation | `age -> age >= 18` |
| **`Function<T, R>`** | `R apply(T t)` | Transforming $T \rightarrow R$ | `user -> user.getName()` |
| **`Consumer<T>`** | `void accept(T t)` | Processing / Side-effects | `item -> System.out.println(item)` |
| **`Supplier<T>`** | `T get()` | Factory / Object Creation | `() -> new ArrayList<>()` |
