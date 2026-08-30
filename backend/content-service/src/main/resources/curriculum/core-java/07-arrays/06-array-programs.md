---
id: "java-arrays-programs"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Arrays"
title: "Array Programs (20)"
slug: "java-arrays-programs"
summary: "Comprehensive 20-program practical masterclass: 13 Easy Level 1D array programs (Sum, Evens/Odds, Search, Insert, Delete, Min/Max, Reverse) and 7 Medium Level 2D Matrix programs (2D Sum, Copy, Addition, Subtraction, Diagonals Sum, Equality Check, Transpose)."
eli10: "Practice makes perfect! Here are 20 essential Java coding problems on arrays, with full working code, explanations, and runnable playgrounds for every algorithm!"
mentalModel: "Array algorithms manipulate contiguous blocks of memory using indexing, single loops for 1D arrays (O(N)), and nested loops for 2D matrices (O(M x N))."
difficulty: "Intermediate"
estimatedMinutes: 35
tags: ["Array Programs", "Array Algorithms", "Linear Search", "Insertion", "Deletion", "Reversal", "Matrix Operations", "Practice"]
animationType: "array-programs"
codeSnippet:
  language: "java"
  explanation: "Array Programs Catalog: 20 essential Java coding exercises across 1D and 2D arrays."
  code: |
    public class ArrayProgramsSummary {
        public static void main(String[] args) {
            int[] arr = {10, 25, 30, 45, 50};

            // Quick Example: Sum & Average
            int sum = 0;
            for (int n : arr) sum += n;
            double avg = (double) sum / arr.length;

            System.out.println("=== Array Quick Stats ===");
            System.out.println("Sum = " + sum);
            System.out.println("Average = " + avg);
        }
    }
---

# 💻 20 Essential Array Programs in Java — Practical Masterclass

---

## 📑 Complete Programs Index

### 🟢 Easy Level Programs (1D Arrays — Programs 1 to 13)
1. [Sum of all elements in an array](#1-sum-of-all-elements-in-an-array)
2. [Count even and odd elements](#2-count-even-and-odd-elements)
3. [Sum of even and odd numbers separately](#3-sum-of-even-and-odd-numbers-separately)
4. [Count positive, negative, and zero elements](#4-count-positive-negative-and-zero-elements)
5. [Calculate the average of all elements](#5-calculate-the-average-of-all-elements)
6. [Copy contents of one array to another](#6-copy-contents-of-one-array-to-another)
7. [Swap two elements at specified positions](#7-swap-two-elements-at-specified-positions)
8. [Search for an element (Linear Search)](#8-search-for-an-element-in-an-array-linear-search)
9. [Insert an element at a specified position](#9-insert-an-element-at-a-specified-position)
10. [Delete an element from a specified position](#10-delete-an-element-from-a-specified-position)
11. [Find the largest element (Maximum)](#11-find-the-largest-element-in-an-array)
12. [Find the smallest element (Minimum)](#12-find-the-smallest-element-in-an-array)
13. [Reverse the elements of an array](#13-reverse-the-elements-of-an-array)

### 🟡 Medium Level Programs (2D & Matrix Arrays — Programs 14 to 20)
14. [Sum of all elements in a 2D array](#14-sum-of-all-elements-in-a-2d-array)
15. [Copy a 2D array into another 2D array](#15-copy-a-2d-array-into-another-2d-array)
16. [Add two given matrices](#16-add-two-given-matrices)
17. [Subtract one matrix from another](#17-subtract-one-matrix-from-another)
18. [Compute the sum of diagonals of a matrix](#18-compute-the-sum-of-the-diagonals-of-a-given-matrix)
19. [Check whether two matrices are equal](#19-check-whether-two-given-matrices-are-equal-or-not)
20. [Find the transpose of a matrix](#20-find-the-transpose-of-a-given-matrix)

---

## 🟢 Part 1: Easy Level 1D Array Programs

---

### 1. Sum of all elements in an array

**Problem Statement**: Write a Java program to calculate the total sum of all integer elements in a given array.

#### 💡 Algorithm & Explanation:
1. Declare and initialize an accumulator variable `int sum = 0;`.
2. Iterate through each element of the array using a loop (`for (int num : arr)`).
3. In each iteration, add the current number to `sum`.
4. After the loop terminates, print the calculated `sum`.

```java
public class SumOfArray {
    public static void main(String[] args) {
        int[] arr = {12, 24, 35, 48, 51};
        int sum = 0;

        for (int num : arr) {
            sum += num;
        }

        System.out.println("Sum of array elements: " + sum);
    }
}
```

**Sample Output**:
```text
Sum of array elements: 170
```
- **Time Complexity**: $O(N)$
- **Space Complexity**: $O(1)$

---

### 2. Count even and odd elements

**Problem Statement**: Write a Java program to count how many even numbers and odd numbers are present in an array.

#### 💡 Algorithm & Explanation:
1. Initialize two counters: `evenCount = 0` and `oddCount = 0`.
2. Loop through each number in the array.
3. Test if `num % 2 == 0`. If true, increment `evenCount++`; otherwise, increment `oddCount++`.

```java
public class CountEvenOdd {
    public static void main(String[] args) {
        int[] arr = {12, 17, 24, 33, 48, 55, 60};
        int evenCount = 0;
        int oddCount = 0;

        for (int num : arr) {
            if (num % 2 == 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }

        System.out.println("Even elements count: " + evenCount);
        System.out.println("Odd elements count: " + oddCount);
    }
}
```

**Sample Output**:
```text
Even elements count: 4
Odd elements count: 3
```

---

### 3. Sum of even and odd numbers separately

**Problem Statement**: Calculate the sum of all even integers and odd integers into two distinct sum variables.

```java
public class SumEvenOddSeparate {
    public static void main(String[] args) {
        int[] arr = {10, 15, 20, 25, 30, 35};
        int evenSum = 0;
        int oddSum = 0;

        for (int num : arr) {
            if (num % 2 == 0) {
                evenSum += num;
            } else {
                oddSum += num;
            }
        }

        System.out.println("Sum of Even numbers: " + evenSum);
        System.out.println("Sum of Odd numbers: " + oddSum);
    }
}
```

**Sample Output**:
```text
Sum of Even numbers: 60
Sum of Odd numbers: 75
```

---

### 4. Count positive, negative, and zero elements

**Problem Statement**: Count how many elements are positive ($> 0$), negative ($< 0$), and equal to zero ($== 0$).

```java
public class CountPositiveNegativeZero {
    public static void main(String[] args) {
        int[] arr = {-5, 12, 0, -8, 23, 0, 45, -1};
        int positive = 0, negative = 0, zero = 0;

        for (int num : arr) {
            if (num > 0) {
                positive++;
            } else if (num < 0) {
                negative++;
            } else {
                zero++;
            }
        }

        System.out.println("Positive count: " + positive);
        System.out.println("Negative count: " + negative);
        System.out.println("Zero count: " + zero);
    }
}
```

---

### 5. Calculate the average of all elements

**Problem Statement**: Compute the arithmetic mean of all numeric elements in an array.

```java
public class ArrayAverage {
    public static void main(String[] args) {
        int[] arr = {85, 90, 78, 92, 88};
        int sum = 0;

        for (int num : arr) {
            sum += num;
        }

        double average = (double) sum / arr.length;

        System.out.println("Total Sum: " + sum);
        System.out.printf("Average: %.2f\n", average);
    }
}
```

**Sample Output**:
```text
Total Sum: 433
Average: 86.60
```

---

### 6. Copy contents of one array to another

**Problem Statement**: Copy all elements from a source array into an independently allocated destination array.

```java
import java.util.Arrays;

public class CopyArray {
    public static void main(String[] args) {
        int[] source = {10, 20, 30, 40, 50};
        int[] destination = new int[source.length];

        for (int i = 0; i < source.length; i++) {
            destination[i] = source[i];
        }

        System.out.println("Source Array: " + Arrays.toString(source));
        System.out.println("Copied Array: " + Arrays.toString(destination));
    }
}
```

---

### 7. Swap two elements at specified positions

**Problem Statement**: Exchange elements located at index `pos1` and `pos2` using a temporary variable.

```java
import java.util.Arrays;

public class SwapElements {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50};
        int pos1 = 1;
        int pos2 = 3;

        System.out.println("Before Swap: " + Arrays.toString(arr));

        int temp = arr[pos1];
        arr[pos1] = arr[pos2];
        arr[pos2] = temp;

        System.out.println("After Swap:  " + Arrays.toString(arr));
    }
}
```

---

### 8. Search for an element in an array (Linear Search)

**Problem Statement**: Search sequentially for a target key in an array and print its index.

```java
public class LinearSearch {
    public static void main(String[] args) {
        int[] arr = {15, 42, 8, 99, 63, 77};
        int target = 99;
        int foundIndex = -1;

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) {
                foundIndex = i;
                break;
            }
        }

        if (foundIndex != -1) {
            System.out.println("Element " + target + " found at index: " + foundIndex);
        } else {
            System.out.println("Element " + target + " not found.");
        }
    }
}
```

---

### 9. Insert an element at a specified position

**Problem Statement**: Insert a new value at a given target index by creating an expanded array of size `N + 1`.

```java
import java.util.Arrays;

public class InsertElement {
    public static void main(String[] args) {
        int[] original = {10, 20, 30, 40, 50};
        int newElement = 99;
        int insertIndex = 2;

        int[] result = new int[original.length + 1];

        for (int i = 0; i < insertIndex; i++) {
            result[i] = original[i];
        }

        result[insertIndex] = newElement;

        for (int i = insertIndex; i < original.length; i++) {
            result[i + 1] = original[i];
        }

        System.out.println("Original: " + Arrays.toString(original));
        System.out.println("Result:   " + Arrays.toString(result));
    }
}
```

---

### 10. Delete an element from a specified position

**Problem Statement**: Delete an element at a specified index by sliding remaining elements left into an array of size `N - 1`.

```java
import java.util.Arrays;

public class DeleteElement {
    public static void main(String[] args) {
        int[] original = {10, 20, 30, 40, 50};
        int deleteIndex = 2;

        int[] result = new int[original.length - 1];

        for (int i = 0, k = 0; i < original.length; i++) {
            if (i == deleteIndex) continue;
            result[k++] = original[i];
        }

        System.out.println("Original: " + Arrays.toString(original));
        System.out.println("Result:   " + Arrays.toString(result));
    }
}
```

---

### 11. Find the largest element in an array

**Problem Statement**: Find the maximum numeric element in an array.

```java
public class FindMax {
    public static void main(String[] args) {
        int[] arr = {45, 12, 89, 72, 93, 21};
        int max = arr[0];

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }

        System.out.println("Largest element is: " + max);
    }
}
```

---

### 12. Find the smallest element in an array

**Problem Statement**: Find the minimum numeric element in an array.

```java
public class FindMin {
    public static void main(String[] args) {
        int[] arr = {45, 12, 89, 72, 93, 7, 21};
        int min = arr[0];

        for (int i = 1; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }

        System.out.println("Smallest element is: " + min);
    }
}
```

---

### 13. Reverse the elements of an array

**Problem Statement**: Reverse array elements in-place with $O(1)$ auxiliary memory using the Two-Pointer technique.

```java
import java.util.Arrays;

public class ReverseArray {
    public static void main(String[] args) {
        int[] arr = {10, 20, 30, 40, 50, 60};
        System.out.println("Original: " + Arrays.toString(arr));

        int left = 0;
        int right = arr.length - 1;

        while (left < right) {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left++;
            right--;
        }

        System.out.println("Reversed: " + Arrays.toString(arr));
    }
}
```

---

## 🟡 Part 2: Medium Level 2D & Matrix Programs

---

### 14. Sum of all elements in a 2D array

```java
public class Sum2DArray {
    public static void main(String[] args) {
        int[][] numbers = {
            {10, 20, 30},
            {40, 50, 60}
        };

        int totalSum = 0;
        for (int[] row : numbers) {
            for (int val : row) {
                totalSum += val;
            }
        }

        System.out.println("Sum of all 2D elements: " + totalSum);
    }
}
```

---

### 15. Copy a 2D array into another 2D array

```java
import java.util.Arrays;

public class Copy2DArray {
    public static void main(String[] args) {
        int[][] original = {
            {1, 2, 3},
            {4, 5, 6}
        };

        int[][] copy = new int[original.length][original[0].length];

        for (int i = 0; i < original.length; i++) {
            for (int j = 0; j < original[i].length; j++) {
                copy[i][j] = original[i][j];
            }
        }

        System.out.println("Original 2D: " + Arrays.deepToString(original));
        System.out.println("Copied 2D:   " + Arrays.deepToString(copy));
    }
}
```

---

### 16. Add two given matrices

```java
public class MatrixAddition {
    public static void main(String[] args) {
        int[][] matrix1 = { {1, 2, 3}, {4, 5, 6} };
        int[][] matrix2 = { {7, 8, 9}, {10, 11, 12} };

        int rows = matrix1.length;
        int cols = matrix1[0].length;
        int[][] sum = new int[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                sum[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }

        System.out.println("Result of Matrix Addition:");
        for (int[] row : sum) {
            for (int val : row) System.out.print(val + " ");
            System.out.println();
        }
    }
}
```

---

### 17. Subtract one matrix from another

```java
public class MatrixSubtraction {
    public static void main(String[] args) {
        int[][] matrix1 = { {10, 20, 30}, {40, 50, 60} };
        int[][] matrix2 = { {1, 2, 3}, {4, 5, 6} };

        int rows = matrix1.length;
        int cols = matrix1[0].length;
        int[][] diff = new int[rows][cols];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                diff[i][j] = matrix1[i][j] - matrix2[i][j];
            }
        }

        System.out.println("Result of Matrix Subtraction:");
        for (int[] row : diff) {
            for (int val : row) System.out.print(val + " ");
            System.out.println();
        }
    }
}
```

---

### 18. Compute the sum of the diagonals of a given matrix

```java
public class MatrixDiagonalsSum {
    public static void main(String[] args) {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        int n = matrix.length;
        int primarySum = 0;
        int secondarySum = 0;

        for (int i = 0; i < n; i++) {
            primarySum += matrix[i][i];
            secondarySum += matrix[i][n - 1 - i];
        }

        System.out.println("Primary Diagonal Sum (1+5+9): " + primarySum);
        System.out.println("Secondary Diagonal Sum (3+5+7): " + secondarySum);
    }
}
```

---

### 19. Check whether two given matrices are equal or not

```java
public class MatrixEquality {
    public static void main(String[] args) {
        int[][] A = { {1, 2}, {3, 4} };
        int[][] B = { {1, 2}, {3, 4} };

        boolean isEqual = true;

        if (A.length != B.length || A[0].length != B[0].length) {
            isEqual = false;
        } else {
            for (int i = 0; i < A.length; i++) {
                for (int j = 0; j < A[0].length; j++) {
                    if (A[i][j] != B[i][j]) {
                        isEqual = false;
                        break;
                    }
                }
            }
        }

        System.out.println("Are matrices A and B equal? " + isEqual);
    }
}
```

---

### 20. Find the transpose of a given matrix

```java
public class MatrixTranspose {
    public static void main(String[] args) {
        int[][] A = {
            {1, 2, 3},
            {4, 5, 6}
        };

        int rows = A.length;
        int cols = A[0].length;
        int[][] transpose = new int[cols][rows];

        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                transpose[j][i] = A[i][j];
            }
        }

        System.out.println("Original Matrix (2x3):");
        for (int[] row : A) {
            for (int val : row) System.out.print(val + " ");
            System.out.println();
        }

        System.out.println("\nTransposed Matrix (3x2):");
        for (int[] row : transpose) {
            for (int val : row) System.out.print(val + " ");
            System.out.println();
        }
    }
}
```

---

> 🚀 **Explore Interactive Animations:** Switch to the **Architecture Tab** above to see live step-by-step memory animations and run all 20 programs in the built-in compiler sandbox!
