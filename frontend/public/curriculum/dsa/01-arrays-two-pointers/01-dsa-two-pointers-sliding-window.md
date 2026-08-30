---
id: "dsa-two-pointers-sliding-window"
trackId: "dsa"
trackTitle: "Data Structures & Algorithms in Java"
category: "Arrays & Two Pointers"
title: "Two Pointers & Sliding Window Patterns: O(N) Invariants"
slug: "dsa-two-pointers-sliding-window"
summary: "Master Opposite-Direction Two Pointers (Two Sum II, Container With Most Water, Trapping Rain Water) and Variable/Fixed-Size Sliding Windows (Longest Substring Without Repeating Characters, Minimum Window Substring)."
eli10: "Think of finding two people whose combined age is exactly 50 in a line ordered by height. Instead of comparing everyone with everyone (O(N^2)), you place one finger on the youngest (left) and one on the oldest (right). If their combined age is too high, move the right finger inward; if too low, move the left finger inward. You solve it in a single pass (O(N))!"
mentalModel: "Opposite Pointers: left = 0, right = n-1 -> calculate -> left++ or right-- | Sliding Window: expand right pointer -> add to frequency map -> while invalid: shrink left pointer -> record optimal window."
difficulty: "Medium"
estimatedMinutes: 15
tags: ["DSA","Two Pointers","Sliding Window","Array","LeetCode Medium"]
animationType: "two-pointers"
codeSnippet:
  language: "java"
  explanation: "Two Pointers algorithm on a sorted array running in O(N) time and O(1) space."
  code: |
    public class TwoPointersMastery {
        // 1. Two Sum II - Input Array Is Sorted (O(N) Time, O(1) Space)
        public int[] twoSumSorted(int[] numbers, int target) {
            int left = 0, right = numbers.length - 1;
            while (left < right) {
                int sum = numbers[left] + numbers[right];
                if (sum == target) return new int[]{left + 1, right + 1};
                else if (sum < target) left++;
                else right--;
            }
            return new int[]{-1, -1};
        }
    }
---

### 🎯 Two Pointers & Sliding Window Patterns

1. **Opposite-Direction Pointers**:
   - Array is sorted (or monotonically partitioned).
   - `left` moves right (`left++`), `right` moves left (`right--`).
   - Eliminates redundant search space in $O(N)$ time, $O(1)$ space.

2. **Sliding Window (Expand & Shrink)**:
   - Window boundaries: `[left, right]`.
   - **Phase 1 (Expand)**: Increment `right`, incorporate `arr[right]` into window state (hash map / counter).
   - **Phase 2 (Shrink Condition)**: While window violates constraints (e.g. duplicates or sum > target), remove `arr[left]` and increment `left++`.
   - **Phase 3 (Update Output)**: Update maximum/minimum window length or best answer.