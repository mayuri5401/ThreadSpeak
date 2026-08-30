---
id: "java-generics-type-erasure"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Other Topics"
title: "Java Generics & Type Erasure"
slug: "java-generics-type-erasure"
summary: "Master Java Generics: Compile-time type safety, eliminating ClassCastExceptions, Bounded Type Parameters (<T extends Number>), Wildcards (? extends T vs ? super T - PECS), and Type Erasure."
eli10: "Generics is like putting labeled slots in a storage box. If a slot says 'Books Only', Java will stop you at compile time from accidentally putting a coffee cup inside!"
mentalModel: "Generics provide compile-time type safety. At compile time, the Java compiler verifies types and inserts casts, then erases all generic type parameters into Object or bound bounds (Type Erasure) for backward compatibility."
difficulty: "Intermediate"
estimatedMinutes: 20
tags: ["Generics", "Type Erasure", "Wildcards", "PECS", "Type Safety"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Generic Box class demonstrating type safety."
  code: |
    class Box<T> {
        private T content;

        public void setContent(T content) { this.content = content; }
        public T getContent() { return content; }
    }

    public class GenericsDemo {
        public static void main(String[] args) {
            // Type-safe Box for Strings
            Box<String> stringBox = new Box<>();
            stringBox.setContent("Hello Generics");
            String text = stringBox.getContent(); // No explicit typecasting needed!

            System.out.println("Box content: " + text);
        }
    }
---

# 📦 Java Generics & Type Erasure

---

## 📖 1. Why Generics?

Before Java 5, collections stored raw `Object` references, requiring manual casting and risking runtime `ClassCastException`. Generics provide **compile-time type safety**.

---

## 🎯 2. The PECS Rule for Wildcards

When using wildcards with Generics, remember the famous **PECS** rule:
> **P**roducer **E**xtends, **C**onsumer **S**uper

- **`? extends T` (Producer)**: Use when you only **read/get** elements from the collection.
- **`? super T` (Consumer)**: Use when you only **write/add** elements into the collection.

---

## 🧹 3. What is Type Erasure?

To maintain backward compatibility with legacy pre-Java 5 bytecode, Java uses **Type Erasure**:
1. All type parameters (e.g. `List<String>`) are replaced with their bound (e.g. `Object` or `Number`).
2. Type checks and typecasts are inserted automatically by the compiler.
3. At runtime, `List<String>` and `List<Integer>` both have the exact same raw runtime class: `List.class`.
