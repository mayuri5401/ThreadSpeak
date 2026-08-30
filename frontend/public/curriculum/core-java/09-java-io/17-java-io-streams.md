---
id: "java-io-streams-core"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Java Input/Output"
title: "Java I/O: Byte Streams, Character Streams & Files"
slug: "java-io-streams-core"
summary: "Understand java.io stream architecture: InputStream vs OutputStream (Byte streams), Reader vs Writer (Character streams), Scanner vs BufferedReader, and modern java.nio.file.Files."
eli10: "I/O is like water pipes connecting your program to outside devices. Byte streams carry raw 8-bit water droplets (images/binary), while Character streams carry formatted text letters."
mentalModel: "Stream pipeline: Source (File/Socket) ➔ Buffered Stream (Chunked buffer) ➔ Process ➔ Destination (Disk/Screen)."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["Java IO", "InputStream", "OutputStream", "BufferedReader", "Scanner", "NIO"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Demonstrating Scanner input and console streams."
  code: |
    import java.util.Scanner;
    
    public class IoDemo {
        public static void main(String[] args) {
            String simulatedInput = "Mayuri 100";
            Scanner scanner = new Scanner(simulatedInput);
            
            String name = scanner.next();
            int score = scanner.nextInt();
            
            System.out.println("Read Name: " + name + " | Score: " + score);
            scanner.close();
        }
    }
---

# 💾 Java Input/Output: Byte Streams & Character Streams

Java I/O (Input and Output) is used to process the input and produce the output. Java uses the concept of a **stream** to make I/O operations fast and uniform.
