---
id: "java-control-statements-star-patterns"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Control Statements"
title: "Star Pattern Programs (18)"
slug: "java-control-statements-star-patterns"
summary: "Master 18 classic Java Star Pattern programs: Right Triangle, Pyramid, Diamond, Butterfly, Sandglass, Hollow shapes, and Pascal Triangles."
eli10: "Star patterns are the best gym workout for your brain! By controlling nested loops (rows and columns), you can draw triangles, diamonds, and butterflies in the console."
mentalModel: "2D Grid Coordinate mapping: Outer Loop = Rows (i), Inner Loop 1 = Spaces (k), Inner Loop 2 = Stars (j)."
difficulty: "Beginner"
estimatedMinutes: 25
tags: ["Star Patterns", "Nested Loops", "Pyramid", "Diamond", "Butterfly Pattern", "Matrix Coordinates", "Pattern Printing"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "Pyramid Star Pattern and Diamond Star Pattern in Java."
  code: |
    public class StarPatternDemo {
        public static void main(String[] args) {
            int n = 5;
            // Pyramid Pattern
            for (int i = 1; i <= n; i++) {
                for (int space = 1; space <= n - i; space++) {
                    System.out.print(" ");
                }
                for (int star = 1; star <= (2 * i - 1); star++) {
                    System.out.print("*");
                }
                System.out.println();
            }
        }
    }
---

# ⭐ Top 18 Star Pattern Programs in Java

Star pattern printing is the single best way to build rock-solid mastery over **nested loops**, **coordinate spacing**, and **row-column iteration logic**.

---

## 🔹 1. Right Triangle Star Pattern
```text
*
* *
* * *
* * * *
* * * * *
```
```java
public class RightTriangle {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 2. Inverted Right Triangle Star Pattern
```text
* * * * *
* * * *
* * *
* *
*
```
```java
public class InvertedRightTriangle {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= i; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 3. Left Triangle Star Pattern
```text
        *
      * *
    * * *
  * * * *
* * * * *
```
```java
public class LeftTriangle {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print("  ");
            }
            for (int k = 1; k <= i; k++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 4. Inverted Left Triangle Star Pattern
```text
* * * * *
  * * * *
    * * *
      * *
        *
```
```java
public class InvertedLeftTriangle {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print("  ");
            }
            for (int k = 1; k <= i; k++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 5. Pyramid Star Pattern (Equilateral Triangle)
```text
    *
   * *
  * * *
 * * * *
* * * * *
```
```java
public class PyramidPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= i; k++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 6. Inverted Pyramid Star Pattern
```text
* * * * *
 * * * *
  * * *
   * *
    *
```
```java
public class InvertedPyramid {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) {
                System.out.print(" ");
            }
            for (int k = 1; k <= i; k++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 7. Diamond Star Pattern
```text
    *
   * *
  * * *
 * * * *
* * * * *
 * * * *
  * * *
   * *
    *
```
```java
public class DiamondPattern {
    public static void main(String[] args) {
        int n = 5;
        // Upper Half
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= i; k++) System.out.print("* ");
            System.out.println();
        }
        // Lower Half
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= i; k++) System.out.print("* ");
            System.out.println();
        }
    }
}
```

---

## 🔹 8. Hollow Square Star Pattern
```text
* * * * *
*       *
*       *
*       *
* * * * *
```
```java
public class HollowSquare {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == 1 || i == n || j == 1 || j == n) {
                    System.out.print("* ");
                } else {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 9. Hollow Pyramid Star Pattern
```text
    *
   * *
  *   *
 *     *
*********
```
```java
public class HollowPyramid {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= (2 * i - 1); k++) {
                if (k == 1 || k == (2 * i - 1) || i == n) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 10. Hollow Diamond Star Pattern
```text
    *
   * *
  *   *
 *     *
*       *
 *     *
  *   *
   * *
    *
```
```java
public class HollowDiamond {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= (2 * i - 1); k++) {
                if (k == 1 || k == (2 * i - 1)) System.out.print("*");
                else System.out.print(" ");
            }
            System.out.println();
        }
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= (2 * i - 1); k++) {
                if (k == 1 || k == (2 * i - 1)) System.out.print("*");
                else System.out.print(" ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 11. Right Pascal's Triangle
```text
*
* *
* * *
* * * *
* * *
* *
*
```
```java
public class RightPascal {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) System.out.print("* ");
            System.out.println();
        }
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= i; j++) System.out.print("* ");
            System.out.println();
        }
    }
}
```

---

## 🔹 12. Left Pascal's Triangle
```text
      *
    * *
  * * *
* * * *
  * * *
    * *
      *
```
```java
public class LeftPascal {
    public static void main(String[] args) {
        int n = 4;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) System.out.print("  ");
            for (int k = 1; k <= i; k++) System.out.print("* ");
            System.out.println();
        }
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) System.out.print("  ");
            for (int k = 1; k <= i; k++) System.out.print("* ");
            System.out.println();
        }
    }
}
```

---

## 🔹 13. Sandglass (Hourglass) Star Pattern
```text
* * * * *
 * * * *
  * * *
   * *
    *
   * *
  * * *
 * * * *
* * * * *
```
```java
public class SandglassPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= i; k++) System.out.print("* ");
            System.out.println();
        }
        for (int i = 2; i <= n; i++) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= i; k++) System.out.print("* ");
            System.out.println();
        }
    }
}
```

---

## 🔹 14. Butterfly Star Pattern
```text
*        *
**      **
***    ***
****  ****
**********
****  ****
***    ***
**      **
*        *
```
```java
public class ButterflyPattern {
    public static void main(String[] args) {
        int n = 5;
        // Upper Half
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= i; j++) System.out.print("*");
            for (int s = 1; s <= 2 * (n - i); s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print("*");
            System.out.println();
        }
        // Lower Half
        for (int i = n - 1; i >= 1; i--) {
            for (int j = 1; j <= i; j++) System.out.print("*");
            for (int s = 1; s <= 2 * (n - i); s++) System.out.print(" ");
            for (int j = 1; j <= i; j++) System.out.print("*");
            System.out.println();
        }
    }
}
```

---

## 🔹 15. Cross (X) Star Pattern
```text
*   *
 * *
  *
 * *
*   *
```
```java
public class CrossPattern {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == j || i + j == n + 1) System.out.print("*");
                else System.out.print(" ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 16. Plus (+) Star Pattern
```text
    *
    *
* * * * *
    *
    *
```
```java
public class PlusPattern {
    public static void main(String[] args) {
        int n = 5, mid = (n / 2) + 1;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (i == mid || j == mid) System.out.print("* ");
                else System.out.print("  ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 17. Hollow Inverted Pyramid
```text
*********
 *     *
  *   *
   * *
    *
```
```java
public class HollowInvertedPyramid {
    public static void main(String[] args) {
        int n = 5;
        for (int i = n; i >= 1; i--) {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= (2 * i - 1); k++) {
                if (k == 1 || k == (2 * i - 1) || i == n) System.out.print("*");
                else System.out.print(" ");
            }
            System.out.println();
        }
    }
}
```

---

## 🔹 18. Square Star Grid
```text
* * * * *
* * * * *
* * * * *
* * * * *
* * * * *
```
```java
public class SquareGrid {
    public static void main(String[] args) {
        int n = 5;
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}
```
