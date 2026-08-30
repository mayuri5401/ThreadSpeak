---
id: "dsa-linked-list-algorithms"
trackId: "dsa"
trackTitle: "Data Structures & Algorithms in Java"
category: "Linked Lists"
title: "Linked List Mastery: In-Place Reversal, Fast & Slow Pointers (Floyd Cycle)"
slug: "dsa-linked-list-algorithms"
summary: "Master Linked List pointer manipulation: In-Place Reversal, Fast/Slow Pointers (Cycle Detection, Find Middle, Palindrome List), and Merge K Sorted Lists."
eli10: "Think of a scavenger hunt where each clue tells you where to find the next clue. Reversing the list is like rewriting each clue to point to the person who gave it to you instead of the person ahead."
mentalModel: "Reversal: prev = null, curr = head -> next = curr.next -> curr.next = prev -> prev = curr, curr = next | Fast/Slow: slow moves 1 step, fast moves 2 steps."
difficulty: "Medium"
estimatedMinutes: 15
tags: ["DSA","Linked List","Fast Slow Pointers","Floyd Cycle","LeetCode Medium"]
animationType: "generic-flow"
codeSnippet:
  language: "java"
  explanation: "In-place linked list reversal running in O(N) time and O(1) auxiliary space."
  code: |
    public class LinkedListAlgorithms {
        public static class ListNode { int val; ListNode next; ListNode(int v) { this.val = v; } }
    
        public ListNode reverseList(ListNode head) {
            ListNode prev = null, curr = head;
            while (curr != null) {
                ListNode next = curr.next;
                curr.next = prev;
                prev = curr;
                curr = next;
            }
            return prev;
        }
    }
---

### 🔗 Linked List Reversal & Floyd Cycle Detection

1. **In-Place Reversal**: O(N) Time, O(1) Space without extra nodes.
2. **Floyd's Tortoise and Hare**: Fast moves 2 steps, slow moves 1 step. If they meet, a cycle exists.