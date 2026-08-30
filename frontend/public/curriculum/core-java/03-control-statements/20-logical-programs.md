---
id: "java-control-statements-logical-programs"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Control Statements"
title: "Logical Programs"
slug: "java-control-statements-logical-programs"
summary: "Master 20 essential Java logical programming problems: User Input, Largest numbers, Even/Odd, Leap Year, Multiplication Table, Factorial, Swapping, Calculator, Reverse Number, Palindrome, Prime, Prime 1-100, Fibonacci, GCD, LCM, Count Digits, Sum of Digits, Armstrong, and Armstrong 1-10000."
eli10: "Practice makes perfect! Here are 20 classic logical coding interview problems using if-else, loops, and math operations to build your algorithmic problem solving confidence."
mentalModel: "Algorithmic decomposition: Input acquisition ➔ Mathematical invariants ➔ Conditional branching ➔ Iterative accumulation."
difficulty: "Beginner"
estimatedMinutes: 30
tags: ["Logical Programs", "User Input", "Even Odd", "Leap Year", "Prime Number", "Palindrome", "Armstrong", "Fibonacci", "Factorial", "Swapping", "GCD", "LCM", "Interview Questions"]
animationType: "logical-programs"
codeSnippet:
  language: "java"
  explanation: "Interactive user input and largest of two/three numbers in Java."
  code: |
    import java.util.Scanner;

    public class UserInputExample {
        public static void main(String[] args) {
            Scanner scanner = new Scanner(System.in);
            
            System.out.print("Enter your name: ");
            String name = scanner.nextLine();
            
            System.out.print("Enter your age: ");
            int age = scanner.nextInt();
            
            System.out.print("Enter your favorite decimal number: ");
            double favoriteNumber = scanner.nextDouble();
            
            System.out.println("\nThank you for providing the details!");
            System.out.println("Name: " + name);
            System.out.println("Age: " + age);
            System.out.println("Favorite Number: " + favoriteNumber);
            
            scanner.close();
        }
    }
---
