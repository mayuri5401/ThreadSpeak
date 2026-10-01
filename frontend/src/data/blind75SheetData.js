/**
 * blind75SheetData.js
 * Complete Blind 75 LeetCode Problem Set with TakeUForward Solutions & Videos
 * Auto-assembled from modular categories (Array, Binary, DP, Graph, Intervals, LinkedList, Matrix, String, Tree, Heap)
 */

import arrayProblems from './blind75/array.js';
import binaryProblems from './blind75/binary.js';
import dpProblems from './blind75/dp.js';
import graphProblems from './blind75/graph.js';
import intervalProblems from './blind75/interval.js';
import linkedListProblems from './blind75/linkedlist.js';
import matrixProblems from './blind75/matrix.js';
import stringProblems from './blind75/string.js';
import treeProblems from './blind75/tree.js';
import heapProblems from './blind75/heap.js';

export const BLIND75_CATEGORIES = [
  { id: "array", title: "Array & Hashing", icon: "Hash", count: 10, color: "from-blue-500/20 to-cyan-500/20", borderColor: "border-cyan-500/30" },
  { id: "binary", title: "Binary & Bit Manipulation", icon: "Binary", count: 5, color: "from-yellow-500/20 to-amber-500/20", borderColor: "border-amber-500/30" },
  { id: "dynamic-programming", title: "Dynamic Programming", icon: "Layers", count: 11, color: "from-purple-500/20 to-pink-500/20", borderColor: "border-purple-500/30" },
  { id: "graph", title: "Graph", icon: "Network", count: 8, color: "from-indigo-500/20 to-blue-500/20", borderColor: "border-indigo-500/30" },
  { id: "interval", title: "Intervals", icon: "Calendar", count: 6, color: "from-rose-500/20 to-red-500/20", borderColor: "border-rose-500/30" },
  { id: "linked-list", title: "Linked List", icon: "Link2", count: 6, color: "from-teal-500/20 to-cyan-500/20", borderColor: "border-teal-500/30" },
  { id: "matrix", title: "Matrix", icon: "Grid", count: 4, color: "from-fuchsia-500/20 to-purple-500/20", borderColor: "border-fuchsia-500/30" },
  { id: "string", title: "String", icon: "Type", count: 10, color: "from-amber-500/20 to-orange-500/20", borderColor: "border-orange-500/30" },
  { id: "tree", title: "Tree & Trie", icon: "GitBranch", count: 13, color: "from-emerald-500/20 to-green-500/20", borderColor: "border-green-500/30" },
  { id: "heap", title: "Heap / Priority Queue", icon: "Cpu", count: 2, color: "from-orange-500/20 to-amber-500/20", borderColor: "border-amber-500/30" }
];

export const BLIND75_PROBLEMS = [
  ...arrayProblems,
  ...binaryProblems,
  ...dpProblems,
  ...graphProblems,
  ...intervalProblems,
  ...linkedListProblems,
  ...matrixProblems,
  ...stringProblems,
  ...treeProblems,
  ...heapProblems
];
