import React, { useState, useMemo, useEffect } from 'react';
import { 
  Code2, Play, CheckCircle2, Copy, Check, ArrowRight, ArrowLeft, 
  ExternalLink, Search, Sparkles, Terminal, BookOpen, Layers, 
  ChevronRight, ChevronLeft, Zap, X, RotateCcw, Cpu, ArrowLeftCircle,
  HelpCircle, Lightbulb, CheckSquare, ListOrdered, FileCode, CheckCircle,
  Filter, Grid, Calculator, RefreshCw, Hash, Pause, FastForward,
  Activity, ArrowDown, CornerDownRight, ShieldCheck, Eye
} from 'lucide-react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';
import { parseUrlState, updateBrowserUrl } from '../../shared/utils/urlRouter';

/**
 * JavaArrayProgramsVisualizer
 * Comprehensive Practical Hub for 20 Essential Array Programs in Java:
 * 1. 13 Easy Level 1D Array Programs
 * 2. 7 Medium Level 2D Matrix Programs
 * Featuring:
 * - Interactive Algorithm Stepper & Live Memory Animation (with 1D/2D visual array slots, pointers, and accumulators)
 * - Simplest ELI10 ("Explain Like I'm 10") Conceptual & Logic Breakdown
 * - Live In-Place Runnable Code Playground with Instant Java Compilation
 * - Practice Self-Challenges with Revealable Solutions
 */
export default function JavaArrayProgramsVisualizer({ onOpenPlayground, activeTab = 'notes', onSwitchTab }) {
  const [selectedProgramId, setSelectedProgramId] = useState(() => {
    try {
      const state = parseUrlState();
      return state.program ? Number(state.program) : null;
    } catch {
      return null;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [showTaskSolution, setShowTaskSolution] = useState(false);

  // Sync selectedProgramId on browser Back / Forward (popstate)
  useEffect(() => {
    const handlePop = () => {
      try {
        const state = parseUrlState();
        setSelectedProgramId(state.program ? Number(state.program) : null);
      } catch {
        // ignore
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const handleSelectProgram = (id) => {
    setSelectedProgramId(id);
    setShowTaskSolution(false);
    updateBrowserUrl({ program: id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedProgramId(null);
    setShowTaskSolution(false);
    updateBrowserUrl({ program: null });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyCode = (id, codeText) => {
    navigator.clipboard.writeText(codeText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    { id: 'all', label: 'All Programs (20)' },
    { id: 'easy', label: '🟢 Easy 1D (13)' },
    { id: 'medium', label: '🟡 Medium 2D Matrix (7)' }
  ];

  // =========================================================================
  // 20 COMPLETE ARRAY PROGRAMS WITH DETAILED EXPLANATIONS & ANIMATION FRAMES
  // =========================================================================
  const programs = [
    {
      id: 1,
      number: 1,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to calculate the sum of all elements in a given array',
      difficulty: 'Beginner',
      summary: 'Traverse array elements using a loop and accumulate total sum into a variable.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'Imagine holding an empty bucket (sum = 0). You walk past 5 boxes in a line. At each box, you pick up the number inside and throw it into your bucket. When you reach the end, the bucket holds the total sum: 12 + 24 + 35 + 48 + 51 = 170.',
      introduction: 'To calculate the total sum of elements in an array, declare an integer accumulator variable (sum) initialized to 0. Then, loop through each element from index 0 to length - 1, adding each value into the accumulator.',
      programLead: 'Below is the complete Java program using an enhanced for-each loop to calculate the sum:',
      codeTitle: 'SumOfArray.java',
      code: `public class SumOfArray
{
    public static void main(String[] args)
    {
        // 1. Declare and initialize a 1D array of integers
        int[] arr = {12, 24, 35, 48, 51};
        
        // 2. Declare an accumulator variable to store sum
        int sum = 0;

        // 3. Iterate through each element using enhanced for-each loop
        for (int num : arr)
        {
            sum += num; // Add current element to sum
        }

        // 4. Display the total sum
        System.out.println("Sum of array elements: " + sum);
    }
}`,
      expectedOutput: `Sum of array elements: 170`,
      explanationNotes: [
        { heading: '1. Array Initialization', detail: 'int[] arr = {12, 24, 35, 48, 51}; creates an array of size 5 with elements at indices [0] to [4].' },
        { heading: '2. Accumulator (int sum = 0)', detail: 'Starts at 0 and holds running totals: 0 ➔ 12 ➔ 36 ➔ 71 ➔ 119 ➔ 170.' },
        { heading: '3. For-Each Loop (for (int num : arr))', detail: 'Sequentially reads each element from memory without manual index management.' },
        { heading: '4. Complexity', detail: 'Runs in O(N) time where N is array length, using O(1) auxiliary space.' }
      ],
      task: {
        title: 'Task 1: Calculate Product of Array Elements',
        prompt: 'Modify the logic to calculate the product (multiplication) of all non-zero numbers in an array: int[] numbers = {2, 3, 4, 5};',
        solutionCode: `public class ProductOfArray {\n    public static void main(String[] args) {\n        int[] numbers = {2, 3, 4, 5};\n        int product = 1;\n        for (int n : numbers) {\n            product *= n;\n        }\n        System.out.println("Product: " + product); // Output: 120\n    }\n}`
      },
      animationType: '1d',
      initialArray: [12, 24, 35, 48, 51],
      frames: [
        { step: 1, title: 'Step 1: Start at Index 0', activeIdx: 0, sum: 12, formula: 'sum = 0 + 12 = 12', note: 'Read arr[0] (12), add to sum.' },
        { step: 2, title: 'Step 2: Move to Index 1', activeIdx: 1, sum: 36, formula: 'sum = 12 + 24 = 36', note: 'Read arr[1] (24), add to sum.' },
        { step: 3, title: 'Step 3: Move to Index 2', activeIdx: 2, sum: 71, formula: 'sum = 36 + 35 = 71', note: 'Read arr[2] (35), add to sum.' },
        { step: 4, title: 'Step 4: Move to Index 3', activeIdx: 3, sum: 119, formula: 'sum = 71 + 48 = 119', note: 'Read arr[3] (48), add to sum.' },
        { step: 5, title: 'Step 5: Move to Index 4', activeIdx: 4, sum: 170, formula: 'sum = 119 + 51 = 170', note: 'Read arr[4] (51), final sum is 170!' }
      ]
    },
    {
      id: 2,
      number: 2,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to count the number of even and odd elements in a given array',
      difficulty: 'Beginner',
      summary: 'Use the modulo operator (%) to test parity of each element and increment counters.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'We set up two tally counters on a desk: Even Tally (0) and Odd Tally (0). As we look at each number, if it divides cleanly by 2 (remainder 0), we click the Even tally. If there is a remainder of 1, we click the Odd tally.',
      introduction: 'An integer is even if it is completely divisible by 2 with a remainder of 0 (num % 2 == 0). Otherwise, it is an odd integer.',
      programLead: 'Below is the Java implementation to count even and odd numbers:',
      codeTitle: 'CountEvenOdd.java',
      code: `public class CountEvenOdd
{
    public static void main(String[] args)
    {
        int[] arr = {12, 17, 24, 33, 48, 55, 60};
        
        int evenCount = 0;
        int oddCount = 0;

        for (int num : arr)
        {
            if (num % 2 == 0)
            {
                evenCount++;
            }
            else
            {
                oddCount++;
            }
        }

        System.out.println("Even elements count: " + evenCount);
        System.out.println("Odd elements count: " + oddCount);
    }
}`,
      expectedOutput: `Even elements count: 4\nOdd elements count: 3`,
      explanationNotes: [
        { heading: '1. Modulo Operator (num % 2 == 0)', detail: 'Returns 0 for even numbers (12, 24, 48, 60).' },
        { heading: '2. Odd Branch (else)', detail: 'Catches odd numbers (17, 33, 55).' }
      ],
      task: {
        title: 'Task 2: Print Even and Odd Elements on Separate Lines',
        prompt: 'Write a program that prints all even numbers on one line and all odd numbers on the next line.',
        solutionCode: `public class PrintEvenOdd {\n    public static void main(String[] args) {\n        int[] arr = {12, 17, 24, 33, 48};\n        System.out.print("Evens: ");\n        for (int n : arr) if (n % 2 == 0) System.out.print(n + " ");\n        System.out.print("\\nOdds: ");\n        for (int n : arr) if (n % 2 != 0) System.out.print(n + " ");\n        System.out.println();\n    }\n}`
      },
      animationType: '1d',
      initialArray: [12, 17, 24, 33, 48, 55, 60],
      frames: [
        { step: 1, title: 'Check 12', activeIdx: 0, note: '12 % 2 == 0 (Even) ➔ evenCount = 1' },
        { step: 2, title: 'Check 17', activeIdx: 1, note: '17 % 2 != 0 (Odd) ➔ oddCount = 1' },
        { step: 3, title: 'Check 24', activeIdx: 2, note: '24 % 2 == 0 (Even) ➔ evenCount = 2' },
        { step: 4, title: 'Check 33', activeIdx: 3, note: '33 % 2 != 0 (Odd) ➔ oddCount = 2' },
        { step: 5, title: 'Check 48', activeIdx: 4, note: '48 % 2 == 0 (Even) ➔ evenCount = 3' },
        { step: 6, title: 'Check 55', activeIdx: 5, note: '55 % 2 != 0 (Odd) ➔ oddCount = 3' },
        { step: 7, title: 'Check 60', activeIdx: 6, note: '60 % 2 == 0 (Even) ➔ evenCount = 4. Final: Even=4, Odd=3' }
      ]
    },
    {
      id: 3,
      number: 3,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to calculate the sum of even and odd numbers separately in a given array',
      difficulty: 'Beginner',
      summary: 'Accumulate even values and odd values into two distinct sum accumulators.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'We have two piggy banks: Even Bank and Odd Bank. When we encounter 10, 20, 30, they go into Even Bank (60). When we encounter 15, 25, 35, they go into Odd Bank (75).',
      introduction: 'This program adds the values of even and odd numbers into separate summation variables: evenSum and oddSum.',
      programLead: 'Below is the Java implementation:',
      codeTitle: 'SumEvenOddSeparate.java',
      code: `public class SumEvenOddSeparate
{
    public static void main(String[] args)
    {
        int[] arr = {10, 15, 20, 25, 30, 35};
        
        int evenSum = 0;
        int oddSum = 0;

        for (int num : arr)
        {
            if (num % 2 == 0)
            {
                evenSum += num;
            }
            else
            {
                oddSum += num;
            }
        }

        System.out.println("Sum of Even numbers: " + evenSum);
        System.out.println("Sum of Odd numbers: " + oddSum);
    }
}`,
      expectedOutput: `Sum of Even numbers: 60\nSum of Odd numbers: 75`,
      explanationNotes: [
        { heading: '1. Even Sum (10+20+30)', detail: 'Total is 60.' },
        { heading: '2. Odd Sum (15+25+35)', detail: 'Total is 75.' }
      ],
      task: {
        title: 'Task 3: Difference Between Even and Odd Sums',
        prompt: 'Calculate Math.abs(evenSum - oddSum).',
        solutionCode: `int diff = Math.abs(evenSum - oddSum);\nSystem.out.println("Difference: " + diff);`
      },
      animationType: '1d',
      initialArray: [10, 15, 20, 25, 30, 35],
      frames: [
        { step: 1, title: 'Process 10', activeIdx: 0, note: 'evenSum += 10 ➔ evenSum = 10' },
        { step: 2, title: 'Process 15', activeIdx: 1, note: 'oddSum += 15 ➔ oddSum = 15' },
        { step: 3, title: 'Process 20', activeIdx: 2, note: 'evenSum += 20 ➔ evenSum = 30' },
        { step: 4, title: 'Process 25', activeIdx: 3, note: 'oddSum += 25 ➔ oddSum = 40' },
        { step: 5, title: 'Process 30', activeIdx: 4, note: 'evenSum += 30 ➔ evenSum = 60' },
        { step: 6, title: 'Process 35', activeIdx: 5, note: 'oddSum += 35 ➔ oddSum = 75. Done!' }
      ]
    },
    {
      id: 4,
      number: 4,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to count the number of positive, negative, and zero elements in a given array',
      difficulty: 'Beginner',
      summary: 'Categorize numbers using three counters based on comparisons against 0.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'We have three boxes: Plus box for positive numbers (>0), Minus box for negative numbers (<0), and Zero box for exactly 0.',
      introduction: 'Checks if num > 0 (positive), num < 0 (negative), or num == 0 (zero).',
      codeTitle: 'CountPositiveNegativeZero.java',
      code: `public class CountPositiveNegativeZero
{
    public static void main(String[] args)
    {
        int[] arr = {-5, 12, 0, -8, 23, 0, 45, -1};
        int positive = 0, negative = 0, zero = 0;

        for (int num : arr)
        {
            if (num > 0)
            {
                positive++;
            }
            else if (num < 0)
            {
                negative++;
            }
            else
            {
                zero++;
            }
        }

        System.out.println("Positive count: " + positive);
        System.out.println("Negative count: " + negative);
        System.out.println("Zero count: " + zero);
    }
}`,
      expectedOutput: `Positive count: 3\nNegative count: 3\nZero count: 2`,
      explanationNotes: [
        { heading: '1. Three-way Branching', detail: 'Uses if-else if-else to classify each element.' }
      ],
      animationType: '1d',
      initialArray: [-5, 12, 0, -8, 23, 0, 45, -1],
      frames: [
        { step: 1, title: 'Check -5', activeIdx: 0, note: '-5 < 0 ➔ negative = 1' },
        { step: 2, title: 'Check 12', activeIdx: 1, note: '12 > 0 ➔ positive = 1' },
        { step: 3, title: 'Check 0', activeIdx: 2, note: '0 == 0 ➔ zero = 1' },
        { step: 4, title: 'Check -8', activeIdx: 3, note: '-8 < 0 ➔ negative = 2' },
        { step: 5, title: 'Check 23', activeIdx: 4, note: '23 > 0 ➔ positive = 2' },
        { step: 6, title: 'Check 0', activeIdx: 5, note: '0 == 0 ➔ zero = 2' },
        { step: 7, title: 'Check 45', activeIdx: 6, note: '45 > 0 ➔ positive = 3' },
        { step: 8, title: 'Check -1', activeIdx: 7, note: '-1 < 0 ➔ negative = 3. Final: Pos=3, Neg=3, Zero=2' }
      ]
    },
    {
      id: 5,
      number: 5,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to calculate the average of all elements in a given array',
      difficulty: 'Beginner',
      summary: 'Compute total sum and divide by array length with double precision.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'Add all test marks together (85+90+78+92+88 = 433), then divide by 5 students to get average mark: 86.60.',
      introduction: 'Sum all elements and cast to double before dividing by arr.length.',
      codeTitle: 'ArrayAverage.java',
      code: `public class ArrayAverage
{
    public static void main(String[] args)
    {
        int[] arr = {85, 90, 78, 92, 88};
        int sum = 0;

        for (int num : arr)
        {
            sum += num;
        }

        double average = (double) sum / arr.length;

        System.out.println("Total Sum: " + sum);
        System.out.printf("Average: %.2f\\n", average);
    }
}`,
      expectedOutput: `Total Sum: 433\nAverage: 86.60`,
      explanationNotes: [
        { heading: '1. Type Casting', detail: '(double) sum prevents integer division truncation.' }
      ],
      animationType: '1d',
      initialArray: [85, 90, 78, 92, 88],
      frames: [
        { step: 1, title: 'Add 85', activeIdx: 0, note: 'sum = 85' },
        { step: 2, title: 'Add 90', activeIdx: 1, note: 'sum = 175' },
        { step: 3, title: 'Add 78', activeIdx: 2, note: 'sum = 253' },
        { step: 4, title: 'Add 92', activeIdx: 3, note: 'sum = 345' },
        { step: 5, title: 'Add 88', activeIdx: 4, note: 'sum = 433. Average = 433 / 5 = 86.60' }
      ]
    },
    {
      id: 6,
      number: 6,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to copy the contents of one array into another array',
      difficulty: 'Beginner',
      summary: 'Allocate a new array of same size and copy each element index by index.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      eli10: 'You buy a brand new blank notebook with 5 pages and photocopy each page from your friend’s notebook one by one.',
      introduction: 'Create int[] destination = new int[source.length] and assign destination[i] = source[i].',
      codeTitle: 'CopyArray.java',
      code: `import java.util.Arrays;

public class CopyArray
{
    public static void main(String[] args)
    {
        int[] source = {10, 20, 30, 40, 50};
        int[] destination = new int[source.length];

        for (int i = 0; i < source.length; i++)
        {
            destination[i] = source[i];
        }

        System.out.println("Source Array: " + Arrays.toString(source));
        System.out.println("Copied Array: " + Arrays.toString(destination));
    }
}`,
      expectedOutput: `Source Array: [10, 20, 30, 40, 50]\nCopied Array: [10, 20, 30, 40, 50]`,
      explanationNotes: [
        { heading: '1. Independent Memory', detail: 'destination is a completely new object in Heap memory.' }
      ],
      animationType: '1d',
      initialArray: [10, 20, 30, 40, 50],
      frames: [
        { step: 1, title: 'Copy Index 0', activeIdx: 0, note: 'destination[0] = source[0] (10)' },
        { step: 2, title: 'Copy Index 1', activeIdx: 1, note: 'destination[1] = source[1] (20)' },
        { step: 3, title: 'Copy Index 2', activeIdx: 2, note: 'destination[2] = source[2] (30)' },
        { step: 4, title: 'Copy Index 3', activeIdx: 3, note: 'destination[3] = source[3] (40)' },
        { step: 5, title: 'Copy Index 4', activeIdx: 4, note: 'destination[4] = source[4] (50). Done!' }
      ]
    },
    {
      id: 7,
      number: 7,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to swap two elements in a given array at specified positions',
      difficulty: 'Beginner',
      summary: 'Exchange values at index pos1 and pos2 using a temporary variable.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      eli10: 'You have an apple in your left hand and an orange in your right hand. You place the apple on a table (temp), move orange to left hand, and pick up apple with right hand!',
      introduction: 'Uses temp = arr[pos1]; arr[pos1] = arr[pos2]; arr[pos2] = temp; in O(1) time.',
      codeTitle: 'SwapElements.java',
      code: `import java.util.Arrays;

public class SwapElements
{
    public static void main(String[] args)
    {
        int[] arr = {10, 20, 30, 40, 50};
        int pos1 = 1;
        int pos2 = 3;

        System.out.println("Before Swap: " + Arrays.toString(arr));

        int temp = arr[pos1];
        arr[pos1] = arr[pos2];
        arr[pos2] = temp;

        System.out.println("After Swap:  " + Arrays.toString(arr));
    }
}`,
      expectedOutput: `Before Swap: [10, 20, 30, 40, 50]\nAfter Swap:  [10, 40, 30, 20, 50]`,
      explanationNotes: [
        { heading: '1. In-place Swap', detail: 'Swaps index 1 (20) with index 3 (40).' }
      ],
      animationType: '1d',
      initialArray: [10, 20, 30, 40, 50],
      frames: [
        { step: 1, title: 'Before Swap', activeIdx: 1, note: 'arr[1] = 20, arr[3] = 40' },
        { step: 2, title: 'After Swap', activeIdx: 3, note: 'arr[1] = 40, arr[3] = 20. Swapped!' }
      ]
    },
    {
      id: 8,
      number: 8,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to search for a specific element in a given array (Linear Search)',
      difficulty: 'Beginner',
      summary: 'Sequentially scan array elements to find a target value and return its index.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'Imagine looking for jersey #99 in a line of people: check 15 ❌, check 42 ❌, check 8 ❌, check 99 ✅ Found at index 3!',
      introduction: 'Linear search scans from index 0 to length-1 and terminates on first match.',
      codeTitle: 'LinearSearch.java',
      code: `public class LinearSearch
{
    public static void main(String[] args)
    {
        int[] arr = {15, 42, 8, 99, 63, 77};
        int target = 99;
        int foundIndex = -1;

        for (int i = 0; i < arr.length; i++)
        {
            if (arr[i] == target)
            {
                foundIndex = i;
                break;
            }
        }

        if (foundIndex != -1)
        {
            System.out.println("Element " + target + " found at index: " + foundIndex);
        }
        else
        {
            System.out.println("Element " + target + " not found in array.");
        }
    }
}`,
      expectedOutput: `Element 99 found at index: 3`,
      explanationNotes: [
        { heading: '1. Early Break', detail: 'Stops immediately upon finding index 3.' }
      ],
      animationType: '1d',
      initialArray: [15, 42, 8, 99, 63, 77],
      frames: [
        { step: 1, title: 'Check arr[0]', activeIdx: 0, note: '15 == 99? ❌' },
        { step: 2, title: 'Check arr[1]', activeIdx: 1, note: '42 == 99? ❌' },
        { step: 3, title: 'Check arr[2]', activeIdx: 2, note: '8 == 99? ❌' },
        { step: 4, title: 'Check arr[3]', activeIdx: 3, note: '99 == 99? ✅ Found at index 3!' }
      ]
    },
    {
      id: 9,
      number: 9,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to insert an element at a specified position in a given array',
      difficulty: 'Beginner',
      summary: 'Create an expanded array of size N+1 and place the new value at target position.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      eli10: 'In a movie theater line of 5 people, someone cuts in at position 2. Everyone behind them steps back one spot to make room!',
      introduction: 'Allocate new array of size N+1, copy elements before target, place new element, and copy remaining elements shifted right.',
      codeTitle: 'InsertElement.java',
      code: `import java.util.Arrays;

public class InsertElement
{
    public static void main(String[] args)
    {
        int[] original = {10, 20, 30, 40, 50};
        int newElement = 99;
        int insertIndex = 2;

        int[] result = new int[original.length + 1];

        for (int i = 0; i < insertIndex; i++)
        {
            result[i] = original[i];
        }

        result[insertIndex] = newElement;

        for (int i = insertIndex; i < original.length; i++)
        {
            result[i + 1] = original[i];
        }

        System.out.println("Original: " + Arrays.toString(original));
        System.out.println("Result:   " + Arrays.toString(result));
    }
}`,
      expectedOutput: `Original: [10, 20, 30, 40, 50]\nResult:   [10, 20, 99, 30, 40, 50]`,
      explanationNotes: [
        { heading: '1. Shift Mechanics', detail: 'Elements at and after index 2 shift right to indices 3, 4, 5.' }
      ],
      animationType: '1d',
      initialArray: [10, 20, 99, 30, 40, 50],
      frames: [
        { step: 1, title: 'Insert 99 at Index 2', activeIdx: 2, note: 'Inserted 99 at index [2]. Result: [10, 20, 99, 30, 40, 50]' }
      ]
    },
    {
      id: 10,
      number: 10,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to delete an element from a specified position in a given array',
      difficulty: 'Beginner',
      summary: 'Allocate array of size N-1 and copy elements, skipping the deleted index.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      eli10: 'Someone leaves a line of 5 people at position 2. Everyone behind steps forward to close the gap!',
      introduction: 'Create new array of size N-1 and copy all elements except the one at deleteIndex.',
      codeTitle: 'DeleteElement.java',
      code: `import java.util.Arrays;

public class DeleteElement
{
    public static void main(String[] args)
    {
        int[] original = {10, 20, 30, 40, 50};
        int deleteIndex = 2;

        int[] result = new int[original.length - 1];

        for (int i = 0, k = 0; i < original.length; i++)
        {
            if (i == deleteIndex)
            {
                continue;
            }
            result[k++] = original[i];
        }

        System.out.println("Original: " + Arrays.toString(original));
        System.out.println("Result:   " + Arrays.toString(result));
    }
}`,
      expectedOutput: `Original: [10, 20, 30, 40, 50]\nResult:   [10, 20, 40, 50]`,
      explanationNotes: [
        { heading: '1. Skip Index', detail: 'Skips index 2 (30). Result has size 4.' }
      ],
      animationType: '1d',
      initialArray: [10, 20, 40, 50],
      frames: [
        { step: 1, title: 'Delete Index 2 (30)', activeIdx: 2, note: 'Removed 30. Result: [10, 20, 40, 50]' }
      ]
    },
    {
      id: 11,
      number: 11,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to find the largest element in a given array (Maximum)',
      difficulty: 'Beginner',
      summary: 'Initialize max = arr[0] and update max whenever a larger number is found.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'You assume the first runner is the fastest. As other runners finish, if anyone is faster, they take the gold crown!',
      introduction: 'Start with max = arr[0] and iterate from index 1 to N-1, updating max = arr[i] if arr[i] > max.',
      codeTitle: 'FindMax.java',
      code: `public class FindMax
{
    public static void main(String[] args)
    {
        int[] arr = {45, 12, 89, 72, 93, 21};
        int max = arr[0];

        for (int i = 1; i < arr.length; i++)
        {
            if (arr[i] > max)
            {
                max = arr[i];
            }
        }

        System.out.println("Largest element is: " + max);
    }
}`,
      expectedOutput: `Largest element is: 93`,
      explanationNotes: [
        { heading: '1. Peak Value Tracking', detail: 'max updates: 45 ➔ 89 ➔ 93.' }
      ],
      animationType: '1d',
      initialArray: [45, 12, 89, 72, 93, 21],
      frames: [
        { step: 1, title: 'Init max = arr[0] (45)', activeIdx: 0, note: 'max = 45' },
        { step: 2, title: 'Check 12', activeIdx: 1, note: '12 > 45? ❌' },
        { step: 3, title: 'Check 89', activeIdx: 2, note: '89 > 45? ✅ max = 89' },
        { step: 4, title: 'Check 72', activeIdx: 3, note: '72 > 89? ❌' },
        { step: 5, title: 'Check 93', activeIdx: 4, note: '93 > 89? ✅ max = 93' },
        { step: 6, title: 'Check 21', activeIdx: 5, note: '21 > 93? ❌ Final Largest = 93' }
      ]
    },
    {
      id: 12,
      number: 12,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to find the smallest element in a given array (Minimum)',
      difficulty: 'Beginner',
      summary: 'Initialize min = arr[0] and update min whenever a smaller value is found.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'You look for the cheapest item on a shelf by checking each price tag and keeping note of the lowest price seen so far.',
      introduction: 'Start with min = arr[0] and update min = arr[i] if arr[i] < min.',
      codeTitle: 'FindMin.java',
      code: `public class FindMin
{
    public static void main(String[] args)
    {
        int[] arr = {45, 12, 89, 72, 93, 7, 21};
        int min = arr[0];

        for (int i = 1; i < arr.length; i++)
        {
            if (arr[i] < min)
            {
                min = arr[i];
            }
        }

        System.out.println("Smallest element is: " + min);
    }
}`,
      expectedOutput: `Smallest element is: 7`,
      explanationNotes: [
        { heading: '1. Minimum Tracking', detail: 'min updates: 45 ➔ 12 ➔ 7.' }
      ],
      animationType: '1d',
      initialArray: [45, 12, 89, 72, 93, 7, 21],
      frames: [
        { step: 1, title: 'Init min = arr[0] (45)', activeIdx: 0, note: 'min = 45' },
        { step: 2, title: 'Check 12', activeIdx: 1, note: '12 < 45? ✅ min = 12' },
        { step: 3, title: 'Check 89', activeIdx: 2, note: '89 < 12? ❌' },
        { step: 4, title: 'Check 72', activeIdx: 3, note: '72 < 12? ❌' },
        { step: 5, title: 'Check 93', activeIdx: 4, note: '93 < 12? ❌' },
        { step: 6, title: 'Check 7', activeIdx: 5, note: '7 < 12? ✅ min = 7' },
        { step: 7, title: 'Check 21', activeIdx: 6, note: '21 < 7? ❌ Final Smallest = 7' }
      ]
    },
    {
      id: 13,
      number: 13,
      category: 'easy',
      categoryLabel: '1D Arrays',
      title: 'WAP to reverse the elements of a given array',
      difficulty: 'Beginner',
      summary: 'Reverse elements in-place with O(1) extra space using Two Pointers.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'Put your left finger on first element (10) and right finger on last element (60). Swap them! Slide fingers inward and repeat until fingers cross.',
      introduction: 'Left starts at 0, right starts at length-1. Swap elements and move inward while left < right.',
      codeTitle: 'ReverseArray.java',
      code: `import java.util.Arrays;

public class ReverseArray
{
    public static void main(String[] args)
    {
        int[] arr = {10, 20, 30, 40, 50, 60};
        System.out.println("Original: " + Arrays.toString(arr));

        int left = 0;
        int right = arr.length - 1;

        while (left < right)
        {
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;

            left++;
            right--;
        }

        System.out.println("Reversed: " + Arrays.toString(arr));
    }
}`,
      expectedOutput: `Original: [10, 20, 30, 40, 50, 60]\nReversed: [60, 50, 40, 30, 20, 10]`,
      explanationNotes: [
        { heading: '1. N/2 Swaps', detail: 'Only 3 swaps for 6 elements in O(1) space.' }
      ],
      animationType: '1d-reverse',
      initialArray: [10, 20, 30, 40, 50, 60],
      frames: [
        { step: 1, title: 'Swap (0, 5)', left: 0, right: 5, arrayState: [60, 20, 30, 40, 50, 10], note: 'Swapped 10 & 60' },
        { step: 2, title: 'Swap (1, 4)', left: 1, right: 4, arrayState: [60, 50, 30, 40, 20, 10], note: 'Swapped 20 & 50' },
        { step: 3, title: 'Swap (2, 3)', left: 2, right: 3, arrayState: [60, 50, 40, 30, 20, 10], note: 'Swapped 30 & 40. Done!' }
      ]
    },
    {
      id: 14,
      number: 14,
      category: 'medium',
      categoryLabel: '2D & Matrix',
      title: 'WAP to calculate the sum of all elements in a given 2D array',
      difficulty: 'Intermediate',
      summary: 'Iterate through all rows and columns to accumulate the total sum.',
      timeComplexity: 'O(M × N)',
      spaceComplexity: 'O(1)',
      eli10: 'Look at a spreadsheet table with 2 rows and 3 columns. Add up all 6 numbers: 10+20+30 + 40+50+60 = 210.',
      introduction: 'Use nested loops: outer loop traverses rows, inner loop sums row cells.',
      codeTitle: 'Sum2DArray.java',
      code: `public class Sum2DArray
{
    public static void main(String[] args)
    {
        int[][] numbers = {
            {10, 20, 30},
            {40, 50, 60}
        };

        int totalSum = 0;
        for (int[] row : numbers)
        {
            for (int val : row)
            {
                totalSum += val;
            }
        }

        System.out.println("Sum of all 2D elements: " + totalSum);
    }
}`,
      expectedOutput: `Sum of all 2D elements: 210`,
      explanationNotes: [
        { heading: '1. Nested Traversal', detail: 'Outer loop iterates rows; inner loop iterates column values.' }
      ],
      animationType: '2d-matrix',
      matA: [[10, 20, 30], [40, 50, 60]],
      frames: [
        { step: 1, title: 'Sum Cell (0,0)', r: 0, c: 0, note: 'totalSum += 10 (10)' },
        { step: 2, title: 'Sum Cell (0,1)', r: 0, c: 1, note: 'totalSum += 20 (30)' },
        { step: 3, title: 'Sum Cell (0,2)', r: 0, c: 2, note: 'totalSum += 30 (60)' },
        { step: 4, title: 'Sum Cell (1,0)', r: 1, c: 0, note: 'totalSum += 40 (100)' },
        { step: 5, title: 'Sum Cell (1,1)', r: 1, c: 1, note: 'totalSum += 50 (150)' },
        { step: 6, title: 'Sum Cell (1,2)', r: 1, c: 2, note: 'totalSum += 60 (210). Complete!' }
      ]
    },
    {
      id: 15,
      number: 15,
      category: 'medium',
      categoryLabel: '2D & Matrix',
      title: 'WAP to copy a 2D array into another 2D array',
      difficulty: 'Intermediate',
      summary: 'Deep copy a 2D array using nested loops into an independent matrix allocation.',
      timeComplexity: 'O(M × N)',
      spaceComplexity: 'O(M × N)',
      eli10: 'Photocopy an entire 2x3 bingo card grid cell by cell into a brand new grid.',
      introduction: 'Allocate copy = new int[original.length][original[0].length] and assign copy[i][j] = original[i][j].',
      codeTitle: 'Copy2DArray.java',
      code: `import java.util.Arrays;

public class Copy2DArray
{
    public static void main(String[] args)
    {
        int[][] original = {
            {1, 2, 3},
            {4, 5, 6}
        };

        int[][] copy = new int[original.length][original[0].length];

        for (int i = 0; i < original.length; i++)
        {
            for (int j = 0; j < original[i].length; j++)
            {
                copy[i][j] = original[i][j];
            }
        }

        System.out.println("Original 2D: " + Arrays.deepToString(original));
        System.out.println("Copied 2D:   " + Arrays.deepToString(copy));
    }
}`,
      expectedOutput: `Original 2D: [[1, 2, 3], [4, 5, 6]]\nCopied 2D:   [[1, 2, 3], [4, 5, 6]]`,
      explanationNotes: [
        { heading: '1. Arrays.deepToString()', detail: 'Formats multi-dimensional arrays for clean console printing.' }
      ],
      animationType: '2d-matrix',
      matA: [[1, 2, 3], [4, 5, 6]],
      frames: [
        { step: 1, title: 'Copy Row 0', r: 0, c: 0, note: 'copy[0][0]=1, copy[0][1]=2, copy[0][2]=3' },
        { step: 2, title: 'Copy Row 1', r: 1, c: 0, note: 'copy[1][0]=4, copy[1][1]=5, copy[1][2]=6. Deep Copy Done!' }
      ]
    },
    {
      id: 16,
      number: 16,
      category: 'medium',
      categoryLabel: '2D & Matrix',
      title: 'WAP to add two given matrices',
      difficulty: 'Intermediate',
      summary: 'Element-wise addition: sum[i][j] = matrix1[i][j] + matrix2[i][j].',
      timeComplexity: 'O(M × N)',
      spaceComplexity: 'O(M × N)',
      eli10: 'Add numbers in matching slots: (0,0) on Grid A (1) + (0,0) on Grid B (7) = 8 in result grid.',
      introduction: 'For each (i, j), calculate sum[i][j] = matrix1[i][j] + matrix2[i][j].',
      codeTitle: 'MatrixAddition.java',
      code: `public class MatrixAddition
{
    public static void main(String[] args)
    {
        int[][] matrix1 = {
            {1, 2, 3},
            {4, 5, 6}
        };

        int[][] matrix2 = {
            {7, 8, 9},
            {10, 11, 12}
        };

        int rows = matrix1.length;
        int cols = matrix1[0].length;
        int[][] sum = new int[rows][cols];

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                sum[i][j] = matrix1[i][j] + matrix2[i][j];
            }
        }

        System.out.println("Result of Matrix Addition:");
        for (int[] row : sum)
        {
            for (int val : row)
            {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}`,
      expectedOutput: `Result of Matrix Addition:\n8 10 12 \n14 16 18`,
      explanationNotes: [
        { heading: '1. Row 0 Addition', detail: '(1+7=8), (2+8=10), (3+9=12).' },
        { heading: '2. Row 1 Addition', detail: '(4+10=14), (5+11=16), (6+12=18).' }
      ],
      animationType: '2d-matrix',
      matA: [[1, 2, 3], [4, 5, 6]],
      frames: [
        { step: 1, title: 'Cell (0,0)', r: 0, c: 0, note: '1 + 7 = 8' },
        { step: 2, title: 'Cell (0,1)', r: 0, c: 1, note: '2 + 8 = 10' },
        { step: 3, title: 'Cell (0,2)', r: 0, c: 2, note: '3 + 9 = 12' },
        { step: 4, title: 'Cell (1,0)', r: 1, c: 0, note: '4 + 10 = 14' },
        { step: 5, title: 'Cell (1,1)', r: 1, c: 1, note: '5 + 11 = 16' },
        { step: 6, title: 'Cell (1,2)', r: 1, c: 2, note: '6 + 12 = 18. Addition Complete!' }
      ]
    },
    {
      id: 17,
      number: 17,
      category: 'medium',
      categoryLabel: '2D & Matrix',
      title: 'WAP to subtract one matrix from another',
      difficulty: 'Intermediate',
      summary: 'Element-wise subtraction: diff[i][j] = matrix1[i][j] - matrix2[i][j].',
      timeComplexity: 'O(M × N)',
      spaceComplexity: 'O(M × N)',
      eli10: 'Subtract each number on Grid B from the matching number on Grid A: 10 - 1 = 9.',
      introduction: 'For each cell (i, j), compute diff[i][j] = matrix1[i][j] - matrix2[i][j].',
      codeTitle: 'MatrixSubtraction.java',
      code: `public class MatrixSubtraction
{
    public static void main(String[] args)
    {
        int[][] matrix1 = {
            {10, 20, 30},
            {40, 50, 60}
        };

        int[][] matrix2 = {
            {1, 2, 3},
            {4, 5, 6}
        };

        int rows = matrix1.length;
        int cols = matrix1[0].length;
        int[][] diff = new int[rows][cols];

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                diff[i][j] = matrix1[i][j] - matrix2[i][j];
            }
        }

        System.out.println("Result of Matrix Subtraction:");
        for (int[] row : diff)
        {
            for (int val : row)
            {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}`,
      expectedOutput: `Result of Matrix Subtraction:\n9 18 27 \n36 45 54`,
      explanationNotes: [
        { heading: '1. Row 0 Subtraction', detail: '(10-1=9), (20-2=18), (30-3=27).' },
        { heading: '2. Row 1 Subtraction', detail: '(40-4=36), (50-5=45), (60-6=54).' }
      ],
      animationType: '2d-matrix',
      matA: [[10, 20, 30], [40, 50, 60]],
      frames: [
        { step: 1, title: 'Cell (0,0)', r: 0, c: 0, note: '10 - 1 = 9' },
        { step: 2, title: 'Cell (0,1)', r: 0, c: 1, note: '20 - 2 = 18' },
        { step: 3, title: 'Cell (0,2)', r: 0, c: 2, note: '30 - 3 = 27' },
        { step: 4, title: 'Cell (1,0)', r: 1, c: 0, note: '40 - 4 = 36' },
        { step: 5, title: 'Cell (1,1)', r: 1, c: 1, note: '50 - 5 = 45' },
        { step: 6, title: 'Cell (1,2)', r: 1, c: 2, note: '60 - 6 = 54. Done!' }
      ]
    },
    {
      id: 18,
      number: 18,
      category: 'medium',
      categoryLabel: '2D & Matrix',
      title: 'WAP to compute the sum of the diagonals of a given matrix',
      difficulty: 'Intermediate',
      summary: 'Compute Primary Diagonal (i == j) and Secondary Diagonal (i + j == N - 1) in a single loop.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      eli10: 'In a 3x3 grid: Top-left to bottom-right (1+5+9=15) is Primary. Top-right to bottom-left (3+5+7=15) is Secondary.',
      introduction: 'In a square matrix (NxN), primary diagonal is matrix[i][i] and secondary diagonal is matrix[i][n - 1 - i].',
      codeTitle: 'MatrixDiagonalsSum.java',
      code: `public class MatrixDiagonalsSum
{
    public static void main(String[] args)
    {
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };

        int n = matrix.length;
        int primarySum = 0;
        int secondarySum = 0;

        for (int i = 0; i < n; i++)
        {
            primarySum += matrix[i][i];
            secondarySum += matrix[i][n - 1 - i];
        }

        System.out.println("Primary Diagonal Sum (1+5+9): " + primarySum);
        System.out.println("Secondary Diagonal Sum (3+5+7): " + secondarySum);
    }
}`,
      expectedOutput: `Primary Diagonal Sum (1+5+9): 15\nSecondary Diagonal Sum (3+5+7): 15`,
      explanationNotes: [
        { heading: '1. Single Loop O(N)', detail: 'Only N iterations instead of nested N² loops.' }
      ],
      animationType: '2d-matrix',
      matA: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      frames: [
        { step: 1, title: 'i = 0', pri: [0, 0], sec: [0, 2], note: 'Primary += 1, Secondary += 3' },
        { step: 2, title: 'i = 1', pri: [1, 1], sec: [1, 1], note: 'Primary += 5, Secondary += 5' },
        { step: 3, title: 'i = 2', pri: [2, 2], sec: [2, 0], note: 'Primary += 9 (15), Secondary += 7 (15). Done!' }
      ]
    },
    {
      id: 19,
      number: 19,
      category: 'medium',
      categoryLabel: '2D & Matrix',
      title: 'WAP to check whether two given matrices are equal or not',
      difficulty: 'Intermediate',
      summary: 'Verify identical dimensions and check if all corresponding cells match.',
      timeComplexity: 'O(M × N)',
      spaceComplexity: 'O(1)',
      eli10: 'Compare two spreadsheets cell-by-cell. If any number differs, they are not equal!',
      introduction: 'First check dimensions. Then check each cell A[i][j] == B[i][j].',
      codeTitle: 'MatrixEquality.java',
      code: `public class MatrixEquality
{
    public static void main(String[] args)
    {
        int[][] A = {
            {1, 2},
            {3, 4}
        };

        int[][] B = {
            {1, 2},
            {3, 4}
        };

        boolean isEqual = true;

        if (A.length != B.length || A[0].length != B[0].length)
        {
            isEqual = false;
        }
        else
        {
            for (int i = 0; i < A.length; i++)
            {
                for (int j = 0; j < A[0].length; j++)
                {
                    if (A[i][j] != B[i][j])
                    {
                        isEqual = false;
                        break;
                    }
                }
            }
        }

        System.out.println("Are matrices A and B equal? " + isEqual);
    }
}`,
      expectedOutput: `Are matrices A and B equal? true`,
      explanationNotes: [
        { heading: '1. Fast Failure', detail: 'Breaks early if any single mismatch is found.' }
      ],
      animationType: '2d-matrix',
      matA: [[1, 2], [3, 4]],
      frames: [
        { step: 1, title: 'Compare (0,0)', r: 0, c: 0, note: 'A[0][0] == B[0][0] (1 == 1) ✅' },
        { step: 2, title: 'Compare (0,1)', r: 0, c: 1, note: 'A[0][1] == B[0][1] (2 == 2) ✅' },
        { step: 3, title: 'Compare (1,0)', r: 1, c: 0, note: 'A[1][0] == B[1][0] (3 == 3) ✅' },
        { step: 4, title: 'Compare (1,1)', r: 1, c: 1, note: 'A[1][1] == B[1][1] (4 == 4) ✅ Equal!' }
      ]
    },
    {
      id: 20,
      number: 20,
      category: 'medium',
      categoryLabel: '2D & Matrix',
      title: 'WAP to find the transpose of a given matrix',
      difficulty: 'Intermediate',
      summary: 'Swap rows with columns: transpose[j][i] = matrix[i][j] converting M x N into N x M.',
      timeComplexity: 'O(M × N)',
      spaceComplexity: 'O(N × M)',
      eli10: 'Flip the matrix on its side! Horizontal rows turn into vertical columns.',
      introduction: 'The transpose of an M x N matrix is an N x M matrix where transpose[j][i] = A[i][j].',
      codeTitle: 'MatrixTranspose.java',
      code: `public class MatrixTranspose
{
    public static void main(String[] args)
    {
        int[][] A = {
            {1, 2, 3},
            {4, 5, 6}
        };

        int rows = A.length;
        int cols = A[0].length;
        
        int[][] transpose = new int[cols][rows];

        for (int i = 0; i < rows; i++)
        {
            for (int j = 0; j < cols; j++)
            {
                transpose[j][i] = A[i][j];
            }
        }

        System.out.println("Original Matrix (2x3):");
        for (int[] row : A)
        {
            for (int val : row)
            {
                System.out.print(val + " ");
            }
            System.out.println();
        }

        System.out.println("\\nTransposed Matrix (3x2):");
        for (int[] row : transpose)
        {
            for (int val : row)
            {
                System.out.print(val + " ");
            }
            System.out.println();
        }
    }
}`,
      expectedOutput: `Original Matrix (2x3):\n1 2 3 \n4 5 6 \n\nTransposed Matrix (3x2):\n1 4 \n2 5 \n3 6`,
      explanationNotes: [
        { heading: '1. Dimension Inversion', detail: 'Original (2x3) becomes Transpose (3x2).' }
      ],
      animationType: '2d-matrix',
      matA: [[1, 2, 3], [4, 5, 6]],
      frames: [
        { step: 1, title: 'Transpose (0,0)', r: 0, c: 0, note: 'A[0][0]=1 ➔ T[0][0]=1' },
        { step: 2, title: 'Transpose (0,1)', r: 0, c: 1, note: 'A[0][1]=2 ➔ T[1][0]=2' },
        { step: 3, title: 'Transpose (0,2)', r: 0, c: 2, note: 'A[0][2]=3 ➔ T[2][0]=3' },
        { step: 4, title: 'Transpose (1,0)', r: 1, c: 0, note: 'A[1][0]=4 ➔ T[0][1]=4' },
        { step: 5, title: 'Transpose (1,1)', r: 1, c: 1, note: 'A[1][1]=5 ➔ T[1][1]=5' },
        { step: 6, title: 'Transpose (1,2)', r: 1, c: 2, note: 'A[1][2]=6 ➔ T[2][1]=6. Done!' }
      ]
    }
  ];

  const currentProgram = programs.find((p) => p.id === selectedProgramId);

  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      const matchesCat = activeCategory === 'all' || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.number.toString() === searchQuery.trim();
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // =========================================================================
  // VIEW 1: ARCHITECTURE THEATER VIEW (Interactive Algorithm & Memory Animations)
  // =========================================================================
  if (activeTab === 'architecture') {
    const archProg = currentProgram || programs[0];

    return (
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        {/* Architecture Header & Program Selector Bar */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-900/40 bg-[#0B1222]/90 shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-800/60 shadow-md">
                <Cpu className="w-5 h-5 animate-pulse" />
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-white">
                  Array Algorithms: Architecture &amp; Memory Animation Theater
                </h3>
                <p className="text-xs text-slate-400">
                  Step-by-step visual heap memory allocation, pointer indexing, and accumulator transitions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
                Program {archProg.number} of {programs.length}
              </span>
              {onSwitchTab && (
                <button
                  onClick={() => onSwitchTab('notes')}
                  className="px-3 py-1 rounded-xl bg-blue-900/80 hover:bg-blue-800 text-blue-200 text-xs font-bold border border-blue-700 transition"
                >
                  View Code Solution in Notes ➔
                </button>
              )}
            </div>
          </div>

          {/* Quick Horizontal Program Picker Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 custom-scrollbar select-none">
            {programs.map((p) => {
              const isSelected = p.id === archProg.id;
              return (
                <button
                  key={p.id}
                  onClick={() => handleSelectProgram(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold shrink-0 transition border ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-slate-900/90 text-slate-400 hover:text-white border-slate-800'
                  }`}
                  title={p.title}
                >
                  #{p.number} {p.category === 'medium' ? '2D' : '1D'}
                </button>
              );
            })}
          </div>

          {/* Active Program Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-cyan-400 font-mono">
                  Program #{archProg.number}:
                </span>
                <h4 className="text-sm font-bold text-white tracking-tight">
                  {archProg.title}
                </h4>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {archProg.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
              <span className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300">
                Time: {archProg.timeComplexity}
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300">
                Space: {archProg.spaceComplexity}
              </span>
            </div>
          </div>
        </div>

        {/* The Live Interactive Animation Stepper Component */}
        <AlgorithmVisualStepper program={archProg} />

        {/* Architectural Memory Model & System Invariants */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>JVM Array Architecture &amp; Memory Layout Invariants:</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="font-bold text-blue-400 font-mono">1. Contiguous Heap Allocation</div>
              <p className="text-slate-300 leading-relaxed">
                Java arrays allocate a single contiguous memory block in Heap RAM. Element index computation is exact O(1) pointer arithmetic: <code className="text-cyan-300">BaseAddress + (index × ElementSize)</code>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="font-bold text-emerald-400 font-mono">2. CPU Cache Locality (L1/L2)</div>
              <p className="text-slate-300 leading-relaxed">
                Sequential loops (e.g. <code>for (int num : arr)</code>) trigger CPU Hardware Prefetchers to load 64-byte Cache Lines into L1/L2 caches with near-zero cache misses.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
              <div className="font-bold text-purple-400 font-mono">3. 2D "Array of Arrays"</div>
              <p className="text-slate-300 leading-relaxed">
                In Java, 2D arrays are an array of reference pointers where <code>matrix[i]</code> points to an independent 1D row array object in Heap memory.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: SELECTED PROGRAM DETAIL VIEW (Full Solution in Notes Tab)
  // =========================================================================
  if (currentProgram) {
    const prevProg = programs.find(p => p.id === currentProgram.id - 1);
    const nextProg = programs.find(p => p.id === currentProgram.id + 1);

    return (
      <div className="space-y-6 animate-in fade-in duration-300 pb-12">
        {/* Top Sticky Navigation Bar */}
        <div className="sticky top-0 z-40 glass-panel px-4 py-3 rounded-2xl border border-slate-800/90 bg-[#0B1120]/95 backdrop-blur-xl shadow-xl flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold transition border border-slate-700/80 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>Back to All Array Programs</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-lg border border-cyan-800">
              Program {currentProgram.number} of {programs.length}
            </span>

            {onSwitchTab && (
              <button
                onClick={() => onSwitchTab('architecture')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-900/80 to-blue-900/80 hover:from-cyan-800 hover:to-blue-800 text-cyan-300 text-xs font-bold border border-cyan-700/70 transition"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>View Animation in Architecture Tab ➔</span>
              </button>
            )}

            {prevProg && (
              <button
                onClick={() => handleSelectProgram(prevProg.id)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                title={`Prev: #${prevProg.number}`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {nextProg && (
              <button
                onClick={() => handleSelectProgram(nextProg.id)}
                className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                title={`Next: #${nextProg.number}`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Program Hero Header */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-900/40 bg-[#0B1222]/90 shadow-2xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#1E6FFB] text-white font-black text-base flex items-center justify-center shadow-lg shadow-blue-600/40">
              {currentProgram.number}
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800">
              {currentProgram.categoryLabel}
            </span>
            <span className={`text-xs font-mono px-2.5 py-1 rounded-lg border ${
              currentProgram.difficulty === 'Beginner' 
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-300' 
                : 'bg-amber-950/80 border-amber-700 text-amber-300'
            }`}>
              {currentProgram.difficulty}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {currentProgram.title}
          </h2>

          {/* ELI10 Simplest Explanation Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-blue-950/60 to-slate-950/80 border border-cyan-700/50 space-y-1.5">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Simplest Explanation (ELI10):</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {currentProgram.eli10 || currentProgram.introduction}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs text-slate-400">
            <span className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300">
              Time Complexity: <b>{currentProgram.timeComplexity}</b>
            </span>
            <span className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-300">
              Space Complexity: <b>{currentProgram.spaceComplexity}</b>
            </span>
          </div>
        </div>

        {/* Live In-Place Runnable Java Playground */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm sm:text-base font-bold text-white">
                Live Interactive Code Runner ({currentProgram.codeTitle})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyCode(currentProgram.id, currentProgram.code)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition"
              >
                {copiedId === currentProgram.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === currentProgram.id ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                Run In-Place
              </span>
            </div>
          </div>

          <UniversalCodePlayground
            key={`array-prog-${currentProgram.id}`}
            title={currentProgram.codeTitle}
            initialCode={currentProgram.code}
            expectedOutput={currentProgram.expectedOutput}
            scenarioId={`array-prog-${currentProgram.id}`}
            defaultHeight="min-h-[400px]"
          />
        </div>

        {/* Expected Output Card */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-3">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Standard Expected Console Output:</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#080D1A] border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 whitespace-pre">
            {currentProgram.expectedOutput}
          </div>
        </div>

        {/* Logic Notes & Key Points */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1120]/90 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span>Key Algorithm Highlights &amp; Code Walkthrough:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentProgram.explanationNotes.map((note, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="font-bold text-cyan-400 font-mono">{note.heading}</div>
                <div className="text-slate-300 leading-relaxed">{note.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Challenge Practice Task */}
        {currentProgram.task && (
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-blue-900/40 bg-[#0A1326]/90 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <CheckSquare className="w-5 h-5 text-cyan-400" />
                <span>{currentProgram.task.title}</span>
              </div>
              <button
                onClick={() => setShowTaskSolution(!showTaskSolution)}
                className="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline"
              >
                {showTaskSolution ? 'Hide Task Solution' : 'Reveal Task Solution'}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentProgram.task.prompt}
            </p>

            {showTaskSolution && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 space-y-2 animate-in fade-in duration-200">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Solution Snippet:</div>
                <pre className="whitespace-pre overflow-x-auto">{currentProgram.task.solutionCode}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW 3: ALL PROGRAMS LIST VIEW (Matching Exact User Screenshot in Notes Tab)
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* Top Banner & Control Deck */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-900/40 bg-[#0B1222]/90 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-700/60 text-cyan-400">
                <Code2 className="w-6 h-6 animate-pulse" />
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                20 Essential Array Programs in Java
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore <b>13 Easy 1D Array programs</b> and <b>7 Medium 2D Matrix programs</b> with step-by-step memory animations, in-place live code execution, and simplest ELI10 explanations.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {onOpenPlayground && (
              <button
                onClick={() => onOpenPlayground(programs[0].code)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/30 transition-all active:scale-95"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Open Playground</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-6">
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-cyan-950 border-cyan-500 text-cyan-300 shadow-md shadow-cyan-950/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search array programs (e.g. sum, swap, matrix)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Program Cards Vertical List (Matching Exact Screenshot Layout) */}
      <div className="space-y-3 pt-2">
        {filteredPrograms.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 text-sm">
            No programs found matching "{searchQuery}". Try searching for another keyword.
          </div>
        ) : (
          filteredPrograms.map((prog) => {
            return (
              <div
                key={prog.id}
                onClick={() => handleSelectProgram(prog.id)}
                className="group relative rounded-2xl p-4 sm:p-4.5 transition-all duration-200 cursor-pointer border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-xl bg-[#0E1626]/90 hover:bg-[#131E33] border-slate-800/80 hover:border-blue-500/50"
              >
                {/* Left Side: Number Badge, Title, & Logic Subtitle */}
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1E6FFB] text-white font-extrabold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md shadow-blue-600/30 group-hover:scale-105 transition">
                    {prog.number}
                  </div>

                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-[15px] font-semibold text-slate-100 group-hover:text-white transition tracking-tight truncate sm:whitespace-normal">
                      {prog.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {prog.summary}
                    </p>
                  </div>
                </div>

                {/* Right Side: Category Badge & View Solution CTA Link */}
                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800/60">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 hidden sm:inline-block">
                    {prog.categoryLabel}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectProgram(prog.id);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#2575FC] hover:text-[#4A90E2] group-hover:translate-x-0.5 transition"
                  >
                    <span>View Solution</span>
                    <span className="w-4 h-4 rounded-full border border-[#2575FC] flex items-center justify-center text-[10px] group-hover:bg-[#2575FC] group-hover:text-white transition">
                      ➔
                    </span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// =============================================================================
// SUB-COMPONENT: INTERACTIVE ALGORITHM ANIMATION STEPPER & MEMORY VISUALIZER
// =============================================================================
function AlgorithmVisualStepper({ program }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const frames = program.frames || [];
  const currentFrame = frames[stepIndex] || frames[0];

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [program.id]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < frames.length - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, frames.length]);

  if (!frames || frames.length === 0) return null;

  return (
    <div className="glass-panel p-6 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] to-[#070B14] shadow-2xl space-y-5">
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-blue-950 text-blue-400 border border-blue-800">
            <Cpu className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Interactive Algorithm Execution &amp; Memory Stepper
            </h3>
            <span className="text-[11px] font-mono text-cyan-400">
              Step {stepIndex + 1} of {frames.length}: {currentFrame.title}
            </span>
          </div>
        </div>

        {/* Stepper Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(prev => Math.max(0, prev - 1));
            }}
            disabled={stepIndex === 0}
            className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold disabled:opacity-40 transition"
          >
            <ChevronLeft className="w-3.5 h-3.5 inline mr-0.5" /> Prev
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/40 flex items-center gap-1.5 transition"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(prev => Math.min(frames.length - 1, prev + 1));
            }}
            disabled={stepIndex === frames.length - 1}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-500/20 disabled:opacity-40 transition"
          >
            Next Step <ChevronRight className="w-3.5 h-3.5 inline ml-0.5" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setStepIndex(0);
            }}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Visual Memory Display */}
      <div className="p-5 rounded-2xl bg-black/80 border border-slate-800 space-y-4">
        {/* 1D Array Visualizer */}
        {program.animationType === '1d' && program.initialArray && (
          <div className="space-y-3">
            <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Array Memory Slots in Heap:
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {program.initialArray.map((val, idx) => {
                const isActive = idx === currentFrame.activeIdx;
                const isPassed = idx < currentFrame.activeIdx;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-sm sm:text-base border transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-lg shadow-cyan-500/40 scale-110 ring-2 ring-cyan-400/60 animate-pulse'
                          : isPassed
                          ? 'bg-slate-800/80 text-slate-300 border-slate-700'
                          : 'bg-slate-950 text-slate-500 border-slate-800'
                      }`}
                    >
                      {val}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 1D Array Reversal Visualizer */}
        {program.animationType === '1d-reverse' && (
          <div className="space-y-3">
            <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              Two Pointers In-Place Memory Swap:
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {(currentFrame.arrayState || program.initialArray).map((val, idx) => {
                const isLeft = idx === currentFrame.left;
                const isRight = idx === currentFrame.right;
                return (
                  <div key={idx} className="flex flex-col items-center gap-1 relative">
                    {isLeft && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-500 text-slate-950">
                        Left
                      </span>
                    )}
                    {isRight && (
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-500 text-white">
                        Right
                      </span>
                    )}
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center font-mono font-bold text-sm sm:text-base border transition-all duration-300 ${
                        isLeft
                          ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg scale-105'
                          : isRight
                          ? 'bg-purple-600 text-white border-purple-400 shadow-lg scale-105'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      {val}
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">[{idx}]</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2D Matrix Visualizer */}
        {program.animationType === '2d-matrix' && program.matA && (
          <div className="space-y-3">
            <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
              2D Matrix Coordinates &amp; Active Pointer:
            </div>
            <div className="inline-block p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${program.matA[0].length}, minmax(0, 1fr))` }}>
                {program.matA.map((row, rIdx) =>
                  row.map((val, cIdx) => {
                    const isActive = currentFrame.r === rIdx && currentFrame.c === cIdx;
                    const isPri = currentFrame.pri && currentFrame.pri[0] === rIdx && currentFrame.pri[1] === cIdx;
                    const isSec = currentFrame.sec && currentFrame.sec[0] === rIdx && currentFrame.sec[1] === cIdx;
                    return (
                      <div
                        key={`${rIdx}-${cIdx}`}
                        className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-mono font-bold text-xs border transition-all duration-300 ${
                          isActive || isPri || isSec
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-lg scale-110 animate-pulse'
                            : 'bg-slate-900 text-slate-300 border-slate-800'
                        }`}
                      >
                        <span>{val}</span>
                        <span className="text-[8px] opacity-70">({rIdx},{cIdx})</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}

        {/* Live Calculation Note & Status */}
        <div className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold">Execution Note:</span>
            <span className="text-slate-200">{currentFrame.note}</span>
          </div>
          {currentFrame.formula && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800 font-bold">
              {currentFrame.formula}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
