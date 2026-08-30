---
id: "java-serialization-core"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Serialization"
title: "Object Serialization, Deserialization & transient"
slug: "java-serialization-core"
summary: "Convert live in-memory Java objects into portable byte streams using java.io.Serializable, ObjectOutputStream, serialVersionUID version control, and transient fields."
eli10: "Serialization is freezing a live snowman object into an ice cube packet so you can mail it over the network. Deserialization is thawing the ice cube packet back into the exact same snowman on the destination computer!"
mentalModel: "Heap Object Graph ➔ ObjectOutputStream (Byte Sequence) ➔ Storage/Network ➔ ObjectInputStream ➔ Restored Heap Object."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["Serialization", "Deserialization", "Serializable", "transient", "serialVersionUID"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Serializable interface and transient modifier."
  code: |
    import java.io.Serializable;
    
    class UserProfile implements Serializable {
        private static final long serialVersionUID = 1L;
        String username = "deepak_user";
        transient String passwordHash = "secret_123"; // Skipped during serialization!
    }
    
    public class SerializationDemo {
        public static void main(String[] args) {
            UserProfile user = new UserProfile();
            System.out.println("User: " + user.username + " (Password protected with transient)");
        }
    }
---

# 📦 Serialization: Object State Persistence

Serialization in Java is a mechanism of writing the state of an object into a byte-stream. It is mainly used in Hibernate, RMI, JPA, EJB and JMS technologies.
