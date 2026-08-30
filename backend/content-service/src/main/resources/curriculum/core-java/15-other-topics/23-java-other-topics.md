---
id: "java-other-topics-core"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Other Topics"
title: "Generics, Enums, Annotations & Java 21 Records"
slug: "java-other-topics-core"
summary: "Explore essential advanced Java features: Generics & Type Erasure (<T>, wildcards <? extends T>), Enums with methods, Custom Annotations (@Retention, @Target), and Java 17/21 Records & Pattern Matching."
eli10: "Generics are safety labels ensuring a box only holds apples. Enums are fixed lists like days of the week. Annotations are sticky notes with instructions for the compiler. Records are instant immutable data carriers without boilerplate code!"
mentalModel: "Generics (Compile-time Type Safety via Type Erasure) + Enums (Type-safe singletons) + Annotations (Runtime Metadata) + Records (Immutable value objects)."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["Generics", "Enums", "Annotations", "Records", "Java 21", "Pattern Matching"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Java 21 Records and Enums."
  code: |
    // 1. Enum
    enum Role { ADMIN, DEVELOPER, TESTER }
    
    // 2. Modern Java Record (Immutable data carrier)
    record Student(String name, int id, Role role) {}
    
    public class AdvancedTopicsDemo {
        public static void main(String[] args) {
            Student student = new Student("Deepak", 101, Role.DEVELOPER);
            System.out.println("Student Record: " + student);
            System.out.println("Name: " + student.name() + " | Role: " + student.role());
        }
    }
---

# 🚀 Other Topics: Generics, Enums, Annotations & Records

This module covers critical modern Java features that every professional Java developer and architect must master.
