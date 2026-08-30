---
id: "java-control-statements-number-patterns"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Control Statements"
title: "Number Pattern Programs (8)"
slug: "java-control-statements-number-patterns"
summary: "Master 8 classic Java Number Pattern programs: Floyd's Triangle, Pascal's Triangle, Binary 0-1 Triangle, Palindromic Pyramid, and Sequential Grids."
eli10: "Number patterns replace stars with numbers that count up, repeat rows, or calculate mathematical triangles like Pascal's Triangle!"
mentalModel: "Mathematical state machines across 2D loop iterations: row counters, running accumulators, and symmetry mirrors."
difficulty: "Beginner"
estimatedMinutes: 20
tags: ["Number Patterns", "Floyd Triangle", "Pascal Triangle", "Binary Triangle", "Palindromic Pyramid", "Pattern Printing"]
animationType: "number-patterns"
codeSnippet:
  language: "java"
  explanation: "Floyd's Triangle and Palindromic Number Pyramid in Java."
  code: |
    public class NumberPatternDemo {
        public static void main(String[] args) {
            int n = 4, num = 1;
            System.out.println("Floyd's Triangle:");
            for (int i = 1; i <= n; i++) {
                for (int j = 1; j <= i; j++) {
                    System.out.print(num++ + " ");
                }
                System.out.println();
            }
        }
    }
---

# 🔢 Top 8 Number Pattern Programs in Java

Number pattern programs combine arithmetic logic with nested loop indices. Here are the **8 most popular number pattern programs** in Java.

---

## 🔹 1. Sequential Increasing Number Triangle
```text
1
1 2
1 2 3
1 2 3 4
1 2 3 4 5
```
```java
public class NumberTriangle1 {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 2. Repeated Row Number Triangle
```text
1
2 2
3 3 3
4 4 4 4
5 5 5 5 5
```
```java
public class RepeatedNumberTriangle {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(i + " ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 3. Inverted Number Triangle
```text
1 2 3 4 5
1 2 3 4
1 2 3
1 2
1
```
```java
public class InvertedNumberTriangle {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print(j + " ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 4. Floyd's Triangle
Continuous running counter starting at 1.
```text
1
2 3
4 5 6
7 8 9 10
```
```java
public class FloydTriangle {
    public static void main(String[] args) {
        int n = 4, count = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print(count++ + " ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 5. 0-1 Binary Alternating Triangle
Outputs alternating 1 and 0 using parity check `(i + j) % 2`.
```text
1
0 1
1 0 1
0 1 0 1
1 0 1 0 1
```
```java
public class BinaryTriangle {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                if ((i + j) % 2 == 0) {
                    System.out.print("1 ");
                } else {
                    System.out.print("0 ");
                }
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 6. Palindromic Number Pyramid
Counts up to row index `i` and then counts back down to 1.
```text
        1
      2 1 2
    3 2 1 2 3
  4 3 2 1 2 3 4
5 4 3 2 1 2 3 4 5
```
```java
public class PalindromePyramid {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            // Leading Spaces
            for (int j = 1; j <= (n - i) * 2; j++) System.out.print(" ");

            // Left Descending Half
            for (int j = i; j >= 1; j--) System.out.print(j + " ");

            // Right Ascending Half
            for (int j = 2; j <= i; j++) System.out.print(j + " ");

            System.out.println();
        }
    }
}
```

---

## 🔹 7. Pascal's Triangle
Mathematical triangle where each number is the sum of the two numbers directly above it ($\binom{n}{k} = \frac{n!}{k!(n-k)!}$).
```text
      1
     1 1
    1 2 1
   1 3 3 1
  1 4 6 4 1
```
```java
public class PascalTriangle {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 0; i < n; i++) {
            for (int s = 0; s < n - i; s++) System.out.print(" ");
            int num = 1;
            for (int j = 0; j <= i; j++) {
                System.out.print(num + " ");
                num = num * (i - j) / (j + 1);
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 8. Continuous Sequential Number Grid
```text
1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 16
```
```java
public class NumberGrid {
    public static void main(String[] args) {
        int n = 4, val = 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                System.out.printf("%-3d ", val++);
            }
            System.out.println();
        }
    }
}
```
