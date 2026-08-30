---
id: "java-strings-programs"
trackId: "core-java"
trackTitle: "Core & Advanced Java"
category: "Strings"
title: "String Programs"
slug: "java-strings-programs"
summary: "Master 20 essential Java String programming problems: Reverse String, Palindrome, Anagrams, Frequency Count, First Non-Repeating Character, Duplicate Removal, Word Reversal, Pangram, and Permutations."
eli10: "A collection of 20 real-world string puzzle programs with step-by-step algorithms, memory diagrams, and instant runnable code to master Java interview coding rounds!"
mentalModel: "Practical string algorithms utilize Two-Pointers, Frequency HashMaps, StringBuilder in-place operations, and character ASCII arithmetic (c - 'a') for high-efficiency O(N) execution."
difficulty: "Intermediate"
estimatedMinutes: 30
tags: ["String Programs", "Palindrome", "Anagram", "Reverse String", "Interview Coding", "Java 21"]
animationType: "string-programs"
codeSnippet:
  language: "java"
  explanation: "Sample string program: In-place two-pointer palindrome verification."
  code: |
    public class PalindromeCheckDemo {
        public static boolean isPalindrome(String s) {
            int left = 0, right = s.length() - 1;
            while (left < right) {
                if (s.charAt(left) != s.charAt(right)) {
                    return false;
                }
                left++;
                right--;
            }
            return true;
        }

        public static void main(String[] args) {
            String word1 = "madam";
            String word2 = "hello";

            System.out.println("Is '" + word1 + "' a palindrome? " + isPalindrome(word1)); // true
            System.out.println("Is '" + word2 + "' a palindrome? " + isPalindrome(word2)); // false
        }
    }
---

# 💻 20 Essential String Programs in Java

---

## 📋 Comprehensive Curriculum Overview

This module covers the **20 most frequently asked String programming interview questions** in Java, structured into:
- **🟢 10 Easy Foundation Programs** (Reversal, Palindrome, Counting, Case toggling, Vowels/Consonants).
- **🟡 10 Medium / Advanced Programs** (Anagrams, Frequency maps, First non-repeating, Word reversal, Pangrams, Longest substring, Permutations).

---

## 📚 Complete List of 20 String Programs

| # | Program Title | Focus & Technique | Time / Space Complexity |
| :--- | :--- | :--- | :--- |
| **1** | Reverse a String | Two-Pointers / `StringBuilder.reverse()` | $O(N)$ / $O(1)$ |
| **2** | Check Palindrome String | Two-Pointers (Inward scan) | $O(N)$ / $O(1)$ |
| **3** | Check Anagram of Two Strings | Frequency Array / Character Sorting | $O(N)$ / $O(1)$ |
| **4** | Count Vowels and Consonants | Single pass character classification | $O(N)$ / $O(1)$ |
| **5** | Count Character Occurrences (Frequency) | HashMap or `int[256]` ASCII counter | $O(N)$ / $O(K)$ |
| **6** | Find First Non-Repeated Character | LinkedHashMap / Frequency array | $O(N)$ / $O(1)$ |
| **7** | Remove Duplicate Characters | `LinkedHashSet` / `boolean[256]` | $O(N)$ / $O(1)$ |
| **8** | Find Duplicate Characters | Frequency count $> 1$ detection | $O(N)$ / $O(1)$ |
| **9** | Reverse Each Word in a Sentence | Split words + Two-pointer reversal | $O(N)$ / $O(N)$ |
| **10** | Check if String Contains Only Digits | `Character.isDigit()` or Regex `\\d+` | $O(N)$ / $O(1)$ |
| **11** | Capitalize First Letter of Each Word (Title Case) | Delimiter split & `toUpperCase()` | $O(N)$ / $O(N)$ |
| **12** | Toggle Case of Each Character | ASCII shift (`c ^ 32` or `isUpperCase`) | $O(N)$ / $O(N)$ |
| **13** | Check String Rotation (`isRotation`) | Substring match in `(s1 + s1)` | $O(N)$ / $O(N)$ |
| **14** | Longest Substring Without Repeating Characters | Sliding Window + HashMap/Set | $O(N)$ / $O(\min(N, M))$ |
| **15** | String Compression (Run-Length Encoding) | Count consecutive repeats | $O(N)$ / $O(N)$ |
| **16** | Remove All Whitespaces | In-place character filtering | $O(N)$ / $O(1)$ |
| **17** | Count Total Words in a Sentence | Tokenization / whitespace scanning | $O(N)$ / $O(1)$ |
| **18** | Check if String is a Pangram | 26 English alphabet set check | $O(N)$ / $O(1)$ |
| **19** | Find Maximum Occurring Character | Max frequency tracking variable | $O(N)$ / $O(1)$ |
| **20** | Find All Permutations of a String | Backtracking & Recursion | $O(N! \times N)$ / $O(N)$ |

---

## 🎯 Sample Program Solution Walkthrough: Anagram Verification

```java
import java.util.Arrays;

public class AnagramCheck {
    public static boolean isAnagram(String s1, String s2) {
        // Clean and normalize strings
        s1 = s1.replaceAll("\\s", "").toLowerCase();
        s2 = s2.replaceAll("\\s", "").toLowerCase();

        if (s1.length() != s2.length()) return false;

        // Method 1: Frequency Array (O(N) Time, O(1) Space)
        int[] counts = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            counts[s1.charAt(i) - 'a']++;
            counts[s2.charAt(i) - 'a']--;
        }

        for (int count : counts) {
            if (count != 0) return false;
        }

        return true;
    }

    public static void main(String[] args) {
        System.out.println(isAnagram("listen", "silent")); // true
        System.out.println(isAnagram("triangle", "integral")); // true
        System.out.println(isAnagram("apple", "pale")); // false
    }
}
```
