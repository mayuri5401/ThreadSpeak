---
id: "java-intro-what-is-java"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Java Introduction"
title: "What is Java"
slug: "java-intro-what-is-java"
summary: "Understand what Java is, James Gosling's Green Project, the 3 major Java Editions (Java SE, Jakarta EE, Java ME), and the complete historical timeline from 1991 to modern Java 21 & 25."
eli10: "Imagine a universal recipe book that can be cooked in any kitchen on Earth without rewriting the ingredients. That is Java: a high-level, object-oriented language created by James Gosling where you design software using real-world blueprints like Student, Car, or Bank."
mentalModel: "Java Source (.java) -> High-level Human Readable -> Object-Oriented Blueprint -> 3 Editions: Java SE (Desktop/Console APIs) | Jakarta EE (Enterprise/Web/Microservices) | Java ME (Embedded/IoT/Smartcards)."
difficulty: "Beginner"
estimatedMinutes: 10
tags: ["What is Java","History","Java SE","Jakarta EE","Java ME","James Gosling"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Basic Java SE class illustrating high-level readable syntax."
  code: |
    // Java SE Edition Foundation Example
    package com.example.intro;
    
    public class WhatIsJavaDemo {
        public static void main(String[] args) {
            // High-level human readable object-oriented code
            String creator = "James Gosling";
            int originYear = 1991;
            System.out.println("Java was created by: " + creator + " in " + originYear);
        }
    }
---

### ☕ What is Java?

Java is a **high-level, robust, secured, and object-oriented programming language** designed to have as few implementation dependencies as possible.

- **High-Level**: Easy for humans to read, write, and understand (close to natural English syntax).
- **Object-Oriented**: Software is organized around real-world objects and entities (`Student`, `Car`, `Bank`, `Order`).
- **Platform Independent**: Write Once, Run Anywhere (WORA) via JVM bytecode.

### 📦 The 3 Major Java Editions

1. **Java Standard Edition (Java SE)**:
   - Core Java platform for desktop, console, and standalone applications.
   - Contains the **JVM**, core libraries (`java.lang`, `java.util`, `java.io`), and base APIs.

2. **Jakarta Enterprise Edition (Jakarta EE / Formerly Java EE)**:
   - Enterprise-scale, distributed web applications and cloud microservices.
   - Powers technologies like **Servlets, JSP, RESTful APIs, JPA, and Spring Boot**.

3. **Java Micro Edition (Java ME)**:
   - Optimized for resource-constrained devices, embedded systems, and IoT hardware (smart cards, sensor chips, pagers).

### 📜 Complete Java Evolution History

| Year | Version / Milestone | Key Highlights |
| :--- | :--- | :--- |
| **1991** | *Green Project* | Initiated at Sun Microsystems by **James Gosling**, Mike Sheridan, and Patrick Naughton. |
| **1995** | Java Announced | Public launch and beta release. |
| **1996** | Java 1.0 | First official public stable release. |
| **2004** | Java 5 | Generics, Annotations, Enums, Enhanced For-Loop, Varargs. |
| **2010** | Oracle Acquisition | Java ownership and stewardship transitioned to Oracle Corporation. |
| **2014** | Java 8 (LTS) | Lambda Expressions, Streams API, Functional Interfaces, Optional, java.time. |
| **2017** | Java 9 | Module System (*Project Jigsaw*), JShell REPL. |
| **2018** | Java 11 (LTS) | HTTP Client API (Standard), `var` keyword in lambdas, String utilities. |
| **2021** | Java 17 (LTS) | Sealed Classes, Pattern Matching for switch, Strong Encapsulation. |
| **2023** | Java 21 (LTS) | **Virtual Threads** (*Project Loom*), Record Patterns, Sequenced Collections. |
| **2025** | Java 25 (LTS) | Flexible Constructor Bodies, Module Imports, Markdown Documentation Comments. |