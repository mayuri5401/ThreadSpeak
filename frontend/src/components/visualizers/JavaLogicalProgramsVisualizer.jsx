import React, { useState, useMemo, useEffect } from 'react';
import { 
  Code2, Play, CheckCircle2, Copy, Check, ArrowRight, ArrowLeft, 
  ExternalLink, Search, Sparkles, Terminal, BookOpen, Layers, 
  ChevronRight, ChevronLeft, Zap, X, RotateCcw, Cpu, ArrowLeftCircle,
  HelpCircle, Lightbulb, CheckSquare, ListOrdered, FileCode, CheckCircle
} from 'lucide-react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';
import { parseUrlState, updateBrowserUrl } from '../../shared/utils/urlRouter';

export default function JavaLogicalProgramsVisualizer({ onOpenPlayground }) {
  // Navigation state: selectedProgramId synced with browser URL & history
  const [selectedProgramId, setSelectedProgramId] = useState(() => {
    try {
      const state = parseUrlState();
      return state.program || null;
    } catch {
      return null;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // Sync selectedProgramId on browser Back / Forward (popstate)
  useEffect(() => {
    const handlePop = () => {
      try {
        const state = parseUrlState();
        setSelectedProgramId(state.program || null);
      } catch {
        // ignore
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  // Live simulation state for interactive tester
  const [simInputs, setSimInputs] = useState({
    num1: 45,
    num2: 89,
    num3: 23,
    singleNum: 30,
    year: 2024,
    text: 'Deepak',
    tableNum: 5,
    operator: '+'
  });

  const categories = [
    { id: 'all', label: 'All Programs (20)' },
    { id: 'input', label: 'Basics & Input' },
    { id: 'conditional', label: 'Conditionals' },
    { id: 'loops', label: 'Loops & Series' },
    { id: 'math', label: 'Math & Digits' },
    { id: 'primes', label: 'Primes & Armstrong' },
  ];

  const programs = [
    {
      id: 1,
      number: 1,
      category: 'input',
      categoryLabel: 'Basics & Input',
      title: 'How to get user input in Java',
      difficulty: 'Beginner',
      introduction: 'In Java, user input is commonly taken using the Scanner class, which is part of the java.util package. This class provides methods to read data of different types such as int, float, String, etc.',
      summary: 'Read user keyboard input from the console using the java.util.Scanner class and BufferedReader.',
      programLead: 'Below is the program demonstrates how to take input from the user and display it:',
      codeTitle: 'UserInputExample.java',
      code: `import java.util.Scanner; // Import Scanner class

public class UserInputExample
{
    public static void main(String[] args)
    {
        // Step 1: Create Scanner object
        Scanner scanner = new Scanner(System.in);
        
        // Step 2: Prompt the user for input
        System.out.print("Enter your name: ");
        String name = scanner.nextLine(); // Read a string input
        
        System.out.print("Enter your age: ");
        int age = scanner.nextInt(); // Read an integer input
        
        System.out.print("Enter your favorite decimal number: ");
        double favoriteNumber = scanner.nextDouble(); // Read a double input
        
        // Step 3: Display the input back to the user
        System.out.println("\\nThank you for providing the details!");
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Favorite Number: " + favoriteNumber);
        
        // Step 4: Close the Scanner
        scanner.close();
    }
}`,
      expectedOutput: `Enter your name: Deepak
Enter your age: 30
Enter your favorite decimal number: 21.1

Thank you for providing the details!
Name: Deepak
Age: 30
Favorite Number: 21.1`,
      explanationNotes: [
        {
          heading: 'Scanner scanner = new Scanner(System.in);',
          detail: 'Here we have created a Scanner object to read input from the standard input stream (System.in).'
        },
        {
          heading: 'Input Methods:',
          detail: '• scanner.nextLine(): Here nextLine() method is used to read a line of text (String).\n• scanner.nextInt(): Here nextInt() method is used to read an integer.\n• scanner.nextDouble(): Here nextDouble() method is used to read a double-precision number.'
        },
        {
          heading: 'Closing Scanner:',
          detail: 'Use scanner.close() to release the resources after input is complete.'
        }
      ],
      task: {
        title: 'Task: Create a Banking Application',
        prompt: 'Create a banking application with the following options:\n• Check Balance - Display the current balance.\n• Deposit Money - Allow users to add money to their account (validate for non-negative amounts).\n• Withdraw Money - Allow users to withdraw money (ensure they have sufficient balance and input is non-negative).\n• Exit - Exit the application.',
        requirements: [
          'Use conditional statements concepts i.e. if, if-else, switch, while etc for above task.',
          'Validate deposit and withdrawal amounts (e.g., no negative values, sufficient funds for withdrawal).',
          'Allow the user to perform multiple operations until they exit.',
          'Handle invalid menu choices appropriately by displaying an error message.'
        ],
        solutionCodeTitle: 'BankApp.java',
        solutionCode: `import java.util.Scanner;

public class BankApp
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);
        double balance = 0;
        int choice;

        while (true)
        {
            System.out.println("Select One Option From Below Bank App:");
            System.out.println("1. Check Balance");
            System.out.println("2. Deposit Money");
            System.out.println("3. Withdraw Money");
            System.out.println("4. Exit");

            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();

            switch (choice)
            {
                case 1:
                    System.out.println("Your current balance is: " + balance+" Rs.");
                    break;
                case 2:
                    System.out.print("Enter amount to deposit: ");
                    double deposit = scanner.nextDouble();
                    if (deposit > 0)
                    {
                        balance = balance + deposit;
                        System.out.println("Amount deposited successfully.");
                    }
                    else
                    {
                        System.out.println("Invalid amount! Please enter a positive value.");
                    }
                    break;
                case 3:
                    System.out.print("Enter amount to withdraw: ");
                    double withdraw = scanner.nextDouble();
                    if (withdraw > 0 && withdraw <= balance)
                    {
                        balance = balance - withdraw;
                        System.out.println("Amount withdrawn successfully.");
                    }
                    else if (withdraw <= 0)
                    {
                        System.out.println("Invalid amount! Please enter a positive value.");
                    }
                    else
                    {
                        System.out.println("Insufficient balance!");
                    }
                    break;
                case 4:
                    System.out.println("Thank you for using our banking service.");
                    scanner.close();
                    return; // Exit the program
                default:
                    System.out.println("Invalid choice! Please enter a number between 1 and 4.");
            }
            System.out.println("------------------------");
        }
    }
}`,
        taskOutput: `Select One Option From Below Bank App:
1. Check Balance
2. Deposit Money
3. Withdraw Money
4. Exit
Enter your choice: 1
Your current balance is: 0.0 Rs.
------------------------
Select One Option From Below Bank App:
1. Check Balance
2. Deposit Money
3. Withdraw Money
4. Exit
Enter your choice: 2
Enter amount to deposit: 1000
Amount deposited successfully.
------------------------
Select One Option From Below Bank App:
1. Check Balance
2. Deposit Money
3. Withdraw Money
4. Exit
Enter your choice: 3
Enter amount to withdraw: 200
Amount withdrawn successfully.
------------------------
Select One Option From Below Bank App:
1. Check Balance
2. Deposit Money
3. Withdraw Money
4. Exit
Enter your choice: 1
Your current balance is: 800.0 Rs.
------------------------
Select One Option From Below Bank App:
1. Check Balance
2. Deposit Money
3. Withdraw Money
4. Exit
Enter your choice: 8
Invalid choice! Please enter a number between 1 and 4.
------------------------
Select One Option From Below Bank App:
1. Check Balance
2. Deposit Money
3. Withdraw Money
4. Exit
Enter your choice: 4
Thank you for using our banking service.`
      },
      runSimulation: (inputs) => {
        return `[Captured Console Input]\nName            : ${inputs.text || 'Deepak'}\nAge             : ${inputs.singleNum || 30} years\nFavorite Number : 21.1\n\nThank you for providing the details!\nName: ${inputs.text || 'Deepak'}\nAge: ${inputs.singleNum || 30}\nFavorite Number: 21.1`;
      }
    },
    {
      id: 2,
      number: 2,
      category: 'conditional',
      categoryLabel: 'Conditionals',
      title: 'WAP to find the largest of two numbers in Java',
      difficulty: 'Beginner',
      introduction: 'In Java, finding the largest of two numbers is a fundamental programming task that involves comparing two numeric values to determine which one is greater. This comparison is commonly performed using conditional statements such as if-else or the ternary operator.',
      summary: 'Compare two numbers using if-else condition or ternary operator to determine the greatest value.',
      programLead: 'Below is the program demonstrates how to take two numbers as input from the user and find the largest:',
      codeTitle: 'LargestOfTwoNumbers.java',
      code: `import java.util.Scanner;

public class LargestOfTwoNumbers
{
    public static void main(String[] args)
    {
        // Step 1: Create Scanner object
        Scanner scanner = new Scanner(System.in);
        
        // Step 2: Prompt user for two numbers
        System.out.print("Enter number 1: ");
        int no1 = scanner.nextInt();
        
        System.out.print("Enter number 2: ");
        int no2 = scanner.nextInt();
        
        // Step 3: Comparison Logic using if-else
        if (no1 > no2)
        {
            System.out.println("The largest number is : " + no1);
        }
        else if (no2 > no1)
        {
            System.out.println("The largest number is : " + no2);
        }
        else
        {
            System.out.println("Both numbers are equal.");
        }
        
        // Step 4: Close the Scanner
        scanner.close();
    }
}`,
      expectedOutput: `Enter number 1: 45
Enter number 2: 89
The largest number is : 89`,
      explanationNotes: [
        {
          heading: 'Scanner scanner = new Scanner(System.in);',
          detail: 'Here we create a Scanner instance to capture interactive console inputs from the user.'
        },
        {
          heading: 'Reading Inputs: scanner.nextInt()',
          detail: 'no1 and no2 variables store the two integer values read from the standard input stream.'
        },
        {
          heading: 'if (no1 > no2) and else if (no2 > no1)',
          detail: 'Evaluates which number is strictly greater. If neither is greater, the else branch handles equality.'
        },
        {
          heading: 'scanner.close()',
          detail: 'Closes the scanner stream to prevent resource leaks.'
        }
      ],
      task: {
        title: 'Task: Student Exam Score Qualifier & Comparison',
        prompt: 'Create an exam evaluation program that takes a student\'s marks in two subjects (e.g. Mathematics and Science), identifies the top scoring subject, and determines if the student earns a "Distinction Badge" (highest score >= 85).',
        requirements: [
          'Take input for Subject 1 (Maths) and Subject 2 (Science) from the user.',
          'Use conditional branching (if, else-if, else) to compare scores and output the highest.',
          'Check if the highest score is 85 or above to award a Distinction.',
          'Gracefully handle tie scores when both subject marks are equal.'
        ],
        solutionCodeTitle: 'ScoreComparisonApp.java',
        solutionCode: `import java.util.Scanner;

public class ScoreComparisonApp
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter Maths Score: ");
        int maths = scanner.nextInt();

        System.out.print("Enter Science Score: ");
        int science = scanner.nextInt();

        int highestScore;
        String topSubject;

        if (maths > science)
        {
            highestScore = maths;
            topSubject = "Maths";
            System.out.println("Highest score is in " + topSubject + ": " + highestScore);
        }
        else if (science > maths)
        {
            highestScore = science;
            topSubject = "Science";
            System.out.println("Highest score is in " + topSubject + ": " + highestScore);
        }
        else
        {
            highestScore = maths;
            System.out.println("Both subjects have equal scores of " + maths);
        }

        if (highestScore >= 85)
        {
            System.out.println("Congratulations! You qualify for the Distinction Scholarship.");
        }
        else
        {
            System.out.println("Keep working hard to reach the 85+ scholarship threshold.");
        }

        scanner.close();
    }
}`,
        taskOutput: `Enter Maths Score: 92
Enter Science Score: 78
Highest score is in Maths: 92
Congratulations! You qualify for the Distinction Scholarship.`
      },
      runSimulation: (inputs) => {
        const a = Number(inputs.num1 || 45);
        const b = Number(inputs.num2 || 89);
        const max = a > b ? a : b;
        return `[Live Input Comparison]\nEnter number 1: ${a}\nEnter number 2: ${b}\n➔ ${a === b ? 'Both numbers are equal (' + a + ')' : 'The largest number is : ' + max}`;
      }
    },
    {
      id: 3,
      number: 3,
      category: 'conditional',
      categoryLabel: 'Conditionals',
      title: 'WAP to find the largest of three numbers in Java',
      difficulty: 'Beginner',
      introduction: 'To find the largest of three numbers, compare the first number with the second and third numbers using conditional statements. Use if-else / else-if conditions to determine which number is the largest and print the result.',
      summary: 'Compare three numbers using compound boolean operator (&&) or nested if-else statements.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'LargestOfThreeNumbers.java',
      code: `import java.util.Scanner;

public class LargestOfThreeNumbers
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter number 1: ");
        int no1 = scanner.nextInt();

        System.out.print("Enter number 2: ");
        int no2 = scanner.nextInt();

        System.out.print("Enter number 3: ");
        int no3 = scanner.nextInt();

        // Finding and displaying the largest number
        if (no1>no2 && no1>no3)
        {
            System.out.println("\\nThe largest number is : " + no1);
        }
        else if (no2>no1 && no2>no3)
        {
            System.out.println("\\nThe largest number is : " + no2);
        }
        else
        {
            System.out.println("\\nThe largest number is : " + no3);
        }

        scanner.close();
    }
}`,
      expectedOutput: `Enter number 1: 100
Enter number 2: 200
Enter number 3: 300

The largest number is : 300`,
      explanationNotes: [
        {
          heading: 'Import Scanner Class:',
          detail: 'The Scanner class is imported to take user input.'
        },
        {
          heading: 'Declare Variables:',
          detail: 'Three integer variables (no1, no2 and no3) are declared to store the user’s input.'
        },
        {
          heading: 'Take Input:',
          detail: 'Use scanner.nextInt() to read integer values from the user.'
        },
        {
          heading: 'Comparison Logic:',
          detail: '• The if condition checks if no1 is greater than or equal to both no2 and no3. If true, num1 is the largest.\n• The else if condition checks if no2 is greater than or equal to both no1 and no3. If true, no2 is the largest.\n• If none of the above conditions are true, it means no3 is the largest.'
        },
        {
          heading: 'Display the Result:',
          detail: 'The program prints the largest number to the console, informing the user which number is the largest among the three.'
        },
        {
          heading: 'Close Scanner:',
          detail: 'The scanner.close() method is used to close the input stream and release resources.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variables',
        prompt: 'Write a simple Java program to find the largest of three numbers using hardcoded initialized variables (no1=10, no2=20, no3=30) without taking interactive console input.',
        requirements: [
          'Declare and initialize three integer variables: int no1=10, no2=20, no3=30;',
          'Use compound logical AND (&&) in if-else statements to compare values.',
          'Display the largest number on the console.'
        ],
        solutionCodeTitle: 'LargestOfThreeSimple.java',
        solutionCode: `public class LargestOfThreeSimple
{
    public static void main(String[] args)
    {
        int no1=10, no2=20, no3=30;

        // Finding and displaying the largest number
        if (no1>no2 && no1>no3)
        {
            System.out.println("\\nThe largest number is : " + no1);
        }
        else if (no2>no1 && no2>no3)
        {
            System.out.println("\\nThe largest number is : " + no2);
        }
        else
        {
            System.out.println("\\nThe largest number is : " + no3);
        }
    }
}`,
        taskOutput: `The largest number is : 30`
      },
      runSimulation: (inputs) => {
        const a = Number(inputs.num1 || 100);
        const b = Number(inputs.num2 || 200);
        const c = Number(inputs.num3 || 300);
        const max = (a > b && a > c) ? a : (b > a && b > c) ? b : c;
        return `[Live Input Comparison]\nEnter number 1: ${a}\nEnter number 2: ${b}\nEnter number 3: ${c}\n\n➔ The largest number is : ${max}`;
      }
    },
    {
      id: 4,
      number: 4,
      category: 'conditional',
      categoryLabel: 'Conditionals',
      title: 'WAP to Check Even or Odd Number in Java',
      difficulty: 'Beginner',
      introduction: 'To check if a number is even or odd, check if the number is divisible by 2 using the modulus (%) operator. If the remainder is 0, the number is even; otherwise, it is odd. Use an if-else statement to branch the condition and print the result.',
      summary: 'Use the modulo operator (%) to test if an integer is even or odd.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'CheckEvenOddNo.java',
      code: `import java.util.Scanner;

public class CheckEvenOddNo
{
    public static void main(String[] args)
    {
        // Import Scanner Class to take user input
        Scanner scanner = new Scanner(System.in);

        // Take input from the user
        System.out.print("Enter a number: ");
        int number = scanner.nextInt();

        // Check if the number is even or odd using conditional logic
        if(number % 2 == 0)
        {
            System.out.println(number + " is an even number.");
        }
        else
        {
            System.out.println(number + " is an odd number.");
        }

        // Close the scanner to release resources
        scanner.close();
    }
}`,
      expectedOutput: `Enter a number: 26
26 is an even number.`,
      explanationNotes: [
        {
          heading: 'Import Scanner Class:',
          detail: 'The Scanner class is imported to take user input.'
        },
        {
          heading: 'Declare a Variable:',
          detail: 'An integer variable (number) is declared to store the user’s input.'
        },
        {
          heading: 'Take Input:',
          detail: 'The program prompts the user to enter an integer, and scanner.nextInt() reads the input and stores it in the number variable.'
        },
        {
          heading: 'Comparison Logic:',
          detail: 'The if condition checks if number % 2 is equal to 0. If true, it means the number is divisible by 2 and is an even number. Otherwise, the number is odd.'
        },
        {
          heading: 'Display the Result:',
          detail: 'The program prints a message to indicate whether the number is even or odd.'
        },
        {
          heading: 'Close Scanner:',
          detail: 'The scanner.close() method is used to close the input stream and release resources.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to check if a number is even or odd using a hardcoded initialized variable (int number = 31) without taking console input.',
        requirements: [
          'Declare and initialize an integer variable: int number = 31;',
          'Use the modulus operator (%) to check divisibility by 2.',
          'Use an if-else statement to print whether the number is even or odd.'
        ],
        solutionCodeTitle: 'CheckEvenOddSimple.java',
        solutionCode: `public class CheckEvenOddNo
{
    public static void main(String[] args)
    {
        int number = 31;

        // Check if the number is even or odd using conditional logic
        if(number % 2 == 0)
        {
            System.out.println(number + " is an even number.");
        }
        else
        {
            System.out.println(number + " is an odd number.");
        }
    }
}`,
        taskOutput: `31 is an odd number.`
      },
      runSimulation: (inputs) => {
        const n = Number(inputs.singleNum !== undefined ? inputs.singleNum : 26);
        const isEven = (n % 2 === 0);
        return `[Live Input Evaluation]\nEnter a number: ${n}\n\n➔ ${n} is ${isEven ? 'an even' : 'an odd'} number. (${n} % 2 = ${Math.abs(n % 2)})`;
      }
    },
    {
      id: 5,
      number: 5,
      category: 'conditional',
      categoryLabel: 'Conditionals',
      title: 'WAP to check for leap year in Java',
      difficulty: 'Beginner',
      introduction: 'To check if a year is a leap year, apply the leap year conditions: a year is a leap year if it is divisible by 400, OR if it is divisible by 4 but NOT divisible by 100. Use an if-else statement for the condition and print the result.',
      summary: 'Verify if a year is a leap year using the Gregorian calendar leap rule.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'CheckLeapYear.java',
      code: `import java.util.Scanner;

public class CheckLeapYear
{
    public static void main(String[] args)
    {
        // Import Scanner Class to take user input
        Scanner scanner = new Scanner(System.in);

        // Take input from the user
        System.out.print("Enter a year: ");
        int year = scanner.nextInt();

        // Check if the year is a leap year using conditional logic
        if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
        {
            System.out.println(year + " is a leap year.");
        }
        else
        {
            System.out.println(year + " is not a leap year.");
        }

        // Close the scanner to release resources
        scanner.close();
    }
}`,
      expectedOutput: `Enter a year: 2024
2024 is a leap year.`,
      explanationNotes: [
        {
          heading: 'Import Scanner Class:',
          detail: 'The Scanner class is imported to take user input.'
        },
        {
          heading: 'Declare a Variable:',
          detail: 'An integer variable (year) is declared to store the user’s input.'
        },
        {
          heading: 'Take Input:',
          detail: 'The program prompts the user to enter an integer, and scanner.nextInt() reads the input and stores it in the year variable.'
        },
        {
          heading: 'Leap Year Logic:',
          detail: 'The if condition checks two scenarios:\n• If the year is divisible by 400, it is a leap year.\n• If the year is divisible by 4 but NOT divisible by 100, it is also a leap year.\n• If neither condition is true, the year is not a leap year.'
        },
        {
          heading: 'Display the Result:',
          detail: 'The program prints whether the given year is a leap year or not.'
        },
        {
          heading: 'Close Scanner:',
          detail: 'The scanner.close() method is used to close the input stream and release resources.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to check if a year is a leap year using a hardcoded initialized variable (int year = 2025) without taking console input.',
        requirements: [
          'Declare and initialize an integer variable: int year = 2025;',
          'Check if (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0).',
          'Use an if-else statement to print whether the year is a leap year.'
        ],
        solutionCodeTitle: 'CheckLeapYearSimple.java',
        solutionCode: `public class CheckLeapYear
{
    public static void main(String[] args)
    {
        int year = 2025;

        // Check if the year is a leap year using conditional logic
        if ((year % 400 == 0) || (year % 4 == 0 && year % 100 != 0))
        {
            System.out.println(year + " is a leap year.");
        }
        else
        {
            System.out.println(year + " is not a leap year.");
        }
    }
}`,
        taskOutput: `2025 is not a leap year.`
      },
      runSimulation: (inputs) => {
        const y = Number(inputs.year || inputs.singleNum || 2024);
        const isLeap = (y % 400 === 0) || (y % 4 === 0 && y % 100 !== 0);
        return `[Live Input Evaluation]\nEnter a year: ${y}\n\n➔ ${y} is ${isLeap ? 'a leap year' : 'not a leap year'}. (${y % 400 === 0 ? 'Divisible by 400' : y % 4 === 0 && y % 100 !== 0 ? 'Divisible by 4 & not 100' : 'Fails leap conditions'})`;
      }
    },
    {
      id: 6,
      number: 6,
      category: 'loops',
      categoryLabel: 'Loops & Series',
      title: 'WAP to print multiplication table in Java',
      difficulty: 'Beginner',
      introduction: 'For multiplication table of any number, take a number, use a for loop to iterate from 1 to 10, multiply the input number by the loop counter for each iteration, and print the multiplication format (number * 1 = result).',
      summary: 'Use a loop from 1 to 10 to multiply and format the table of a given number.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'MultiplicationTable.java',
      code: `import java.util.Scanner;

public class MultiplicationTable
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter a number
        System.out.print("Enter a number to print its multiplication table: ");
        int no = scanner.nextInt();

        System.out.println("\\nMultiplication Table of " + no + ":");

        // Loop from 1 to 10 to generate the table
        for (int i = 1; i <= 10; i++)
        {
            int result = no * i;
            System.out.println(no + " x " + i + " = " + result);
        }

        // Close the scanner
        scanner.close();
    }
}`,
      expectedOutput: `Enter a number to print its multiplication table: 10

Multiplication Table of 10:
10 x 1 = 10
10 x 2 = 20
10 x 3 = 30
10 x 4 = 40
10 x 5 = 50
10 x 6 = 60
10 x 7 = 70
10 x 8 = 80
10 x 9 = 90
10 x 10 = 100`,
      explanationNotes: [
        {
          heading: 'Import Scanner Class:',
          detail: 'The Scanner class is imported to take user input.'
        },
        {
          heading: 'Declare a Variable:',
          detail: 'An integer variable (no) is declared to store the user’s input.'
        },
        {
          heading: 'Take Input:',
          detail: 'The program prompts the user to enter a number for the multiplication table. scanner.nextInt() is used to read and store the input in the no variable.'
        },
        {
          heading: 'Use a for Loop:',
          detail: 'The loop starts from i = 1 and iterates up to i = 10. For each iteration, it calculates the product of no and i. It prints the result in the format: no x i = product.'
        },
        {
          heading: 'Display the Multiplication Table:',
          detail: 'The program prints the multiplication table for the entered number up to 10.'
        },
        {
          heading: 'Close Scanner:',
          detail: 'The scanner.close() method is used to close the input stream and release resources.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to print the multiplication table of a number using a hardcoded initialized variable (int no = 7) without taking console input.',
        requirements: [
          'Declare and initialize an integer variable: int no = 7;',
          'Use a for loop from 1 to 10 to multiply no * i.',
          'Print each line formatted as: no x i = result.'
        ],
        solutionCodeTitle: 'MultiplicationTableSimple.java',
        solutionCode: `public class MultiplicationTable
{
    public static void main(String[] args)
    {
        int no = 7;

        System.out.println("Multiplication Table of " + no + ":");

        // Loop from 1 to 10 to generate the table
        for (int i = 1; i <= 10; i++)
        {
            int result = no * i;
            System.out.println(no + " x " + i + " = " + result);
        }
    }
}`,
        taskOutput: `Multiplication Table of 7:
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
7 x 4 = 28
7 x 5 = 35
7 x 6 = 42
7 x 7 = 49
7 x 8 = 56
7 x 9 = 63
7 x 10 = 70`
      },
      runSimulation: (inputs) => {
        const n = Number(inputs.tableNum || inputs.singleNum || 10);
        let res = `[Live Input Evaluation]\nEnter a number: ${n}\n\nMultiplication Table of ${n}:\n`;
        for (let i = 1; i <= 10; i++) res += `${n} x ${i} = ${n * i}\n`;
        return res.trim();
      }
    },
    {
      id: 7,
      number: 7,
      category: 'math',
      categoryLabel: 'Math & Digits',
      title: 'WAP to find the factorial of a number in Java',
      difficulty: 'Beginner',
      introduction: 'A factorial number is the product of all positive integers from 1 to that number (n!). For example: 5! = 5 x 4 x 3 x 2 x 1 = 120, 3! = 3 x 2 x 1 = 6, 1! = 1. To calculate factorial, initialize fact = 1 and iterate from 1 to n with a for loop, multiplying fact *= i.',
      summary: 'Compute N! using an iterative accumulation loop.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'FactorialProgram.java',
      code: `import java.util.Scanner;

public class FactorialProgram
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter a number
        System.out.print("Enter a number to find its factorial: ");
        int no = scanner.nextInt();

        if (no < 0)
        {
            System.out.println("Factorial is not defined for negative numbers.");
        }
        else
        {
            long fact = 1;  // Variable to store the factorial result

            // Calculate factorial using a loop
            for (int i = 1; i <= no; i++)
            {
                fact = fact * i;
            }

            // Display the result
            System.out.println("Factorial of " + no + " is: " + fact);
        }

        // Close the scanner
        scanner.close();
    }
}`,
      expectedOutput: `Enter a number to find its factorial: 6
Factorial of 6 is: 720`,
      explanationNotes: [
        {
          heading: 'Import Scanner Class:',
          detail: 'The Scanner class is imported to take user input.'
        },
        {
          heading: 'Declare a Variable:',
          detail: 'An integer variable (no) is declared to store the user’s input.'
        },
        {
          heading: 'Take Input:',
          detail: 'The program prompts the user to enter a number to find the factorial number. scanner.nextInt() is used to read and store the input in the no variable.'
        },
        {
          heading: 'Check for Valid Input:',
          detail: 'If n is less than 0, the program displays an error message (factorial is not defined for negative numbers).'
        },
        {
          heading: 'Use a for Loop to Calculate Factorial:',
          detail: 'The loop iterates from 1 to no. In each iteration, the fact variable is multiplied by the loop counter (i). The result is stored back in fact.'
        },
        {
          heading: 'Display the Result:',
          detail: 'After the loop, the value of fact is printed as the factorial of the given number.'
        },
        {
          heading: 'Close Scanner:',
          detail: 'The scanner.close() method is used to close the input stream and release resources.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to find the factorial of a number using a hardcoded initialized variable (int no = 5) without taking console input.',
        requirements: [
          'Declare and initialize an integer variable: int no = 5;',
          'Check if (no < 0) to handle negative numbers.',
          'Use a for loop from 1 to no to compute fact = fact * i and print the result.'
        ],
        solutionCodeTitle: 'FactorialSimple.java',
        solutionCode: `public class FactorialProgram
{
    public static void main(String[] args)
    {
        int no = 5;

        if (no < 0)
        {
            System.out.println("Factorial is not defined for negative numbers.");
        }
        else
        {
            long fact = 1;  // Variable to store the factorial result

            // Calculate factorial using a loop
            for (int i = 1; i <= no; i++)
            {
                fact = fact * i;
            }

            // Display the result
            System.out.println("Factorial of " + no + " is: " + fact);
        }
    }
}`,
        taskOutput: `Factorial of 5 is: 120`
      },
      runSimulation: (inputs) => {
        const n = Number(inputs.singleNum !== undefined ? inputs.singleNum : 6);
        if (n < 0) return `[Live Input Evaluation]\nEnter a number: ${n}\n\n➔ Factorial is not defined for negative numbers.`;
        let fact = 1n;
        for (let i = 1n; i <= BigInt(n); i++) fact *= i;
        return `[Live Input Evaluation]\nEnter a number: ${n}\n\n➔ Factorial of ${n} is: ${fact.toString()} (${Array.from({ length: Math.min(n, 8) }, (_, i) => i + 1).join(' × ')}${n > 8 ? ' ...' : ''} = ${fact.toString()})`;
      }
    },
    {
      id: 8,
      number: 8,
      category: 'math',
      categoryLabel: 'Math & Digits',
      title: 'WAP to swap two numbers in Java',
      difficulty: 'Beginner',
      introduction: 'Swapping two numbers means interchanging their values. This can be done using a third temporary variable (temp) or without using any third variable via arithmetic operations (no1 = no1 + no2; no2 = no1 - no2; no1 = no1 - no2).',
      summary: 'Exchange values between two variables using temporary variable and arithmetic (+/-) techniques.',
      programLead: 'Below is the program by taking user input (Using Third Variable):',
      codeTitle: 'SwapNumbers.java',
      code: `import java.util.Scanner;

public class SwapNumbers
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        // Take input from the user
        System.out.print("Enter the first number (no1): ");
        int no1 = scanner.nextInt();

        System.out.print("Enter the second number (no2): ");
        int no2 = scanner.nextInt();

        // Display numbers before swapping
        System.out.println("Before swapping: no1 = " + no1 + ", no2 = " + no2);

        // Swap using a third variable
        int temp = no1;
        no1 = no2;
        no2 = temp;

        // Display numbers after swapping
        System.out.println("After swapping: no1 = " + no1 + ", no2 = " + no2);

        // Close the scanner
        scanner.close();
    }
}`,
      expectedOutput: `Enter the first number (no1): 100
Enter the second number (no2): 200
Before swapping: no1 = 100, no2 = 200
After swapping: no1 = 200, no2 = 100`,
      explanationNotes: [
        {
          heading: 'Logical Steps (Using Third Variable):',
          detail: '• Take two numbers (no1, no2).\n• Declare a third variable (temp) to temporarily store the value of no1.\n• Assign no1 = no2, then assign no2 = temp.\n• Print the swapped values.'
        },
        {
          heading: 'Logical Steps (Without Third Variable):',
          detail: '• Take two numbers (no1, no2).\n• Use arithmetic operations:\n  no1 = no1 + no2;\n  no2 = no1 - no2;\n  no1 = no1 - no2;\n• Print the swapped values.'
        },
        {
          heading: 'Declare Variables & Take Input:',
          detail: 'Scanner scanner reads integer inputs into no1 and no2 from the standard console.'
        },
        {
          heading: 'Display Results & Close Scanner:',
          detail: 'The program displays values before and after swap, then closes the scanner to release JVM resources.'
        }
      ],
      task: {
        title: 'Task: Swapping Without Using Third Variable (Arithmetic Method)',
        prompt: 'Write a Java program to swap two numbers without using a third variable using arithmetic operations (addition & subtraction) with user input.',
        requirements: [
          'Take input for no1 and no2 from user using Scanner.',
          'Swap values using arithmetic operations: no1 = no1 + no2; no2 = no1 - no2; no1 = no1 - no2;',
          'Display values before and after swapping.'
        ],
        solutionCodeTitle: 'SwapNumbers2.java',
        solutionCode: `import java.util.Scanner;

public class SwapNumbers2
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        // Take input from the user
        System.out.print("Enter the first number (no1): ");
        int no1 = scanner.nextInt();

        System.out.print("Enter the second number (no2): ");
        int no2 = scanner.nextInt();

        // Display numbers before swapping
        System.out.println("Before swapping: no1 = " + no1 + ", no2 = " + no2);

        // Swap without using a third variable
        no1 = no1 + no2;
        no2 = no1 - no2;
        no1 = no1 - no2;

        // Display numbers after swapping
        System.out.println("After swapping: no1 = " + no1 + ", no2 = " + no2);

        // Close the scanner
        scanner.close();
    }
}`,
        taskOutput: `Enter the first number (no1): 555
Enter the second number (no2): 888
Before swapping: no1 = 555, no2 = 888
After swapping: no1 = 888, no2 = 555`
      },
      runSimulation: (inputs) => {
        const a = Number(inputs.num1 || 100);
        const b = Number(inputs.num2 || 200);
        return `[Live Input Evaluation]\nInput: no1 = ${a}, no2 = ${b}\n\nBefore swapping: no1 = ${a}, no2 = ${b}\n➔ Method 1 (temp): temp=${a}, no1=${b}, no2=${a}\n➔ Method 2 (+/-): no1=${a+b}, no2=${a}, no1=${b}\n\nAfter swapping: no1 = ${b}, no2 = ${a}`;
      }
    },
    {
      id: 9,
      number: 9,
      category: 'conditional',
      categoryLabel: 'Conditionals',
      title: 'WAP to create a calculator using a switch case in Java',
      difficulty: 'Beginner',
      introduction: 'Building a command-line calculator illustrates multi-branch decision making using switch-case statements.',
      summary: 'Perform arithmetic operations based on operator selection using switch case.',
      programLead: 'Below is the program to create a calculator using switch case:',
      codeTitle: 'CalculatorSwitch.java',
      code: `public class CalculatorSwitch {
    public static void main(String[] args) {
        double num1 = 10, num2 = 5;
        char operator = '+';

        double result;
        switch (operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                } else {
                    System.out.println("Error: Division by zero.");
                    return;
                }
                break;
            default:
                System.out.println("Invalid operator.");
                return;
        }

        System.out.println(num1 + " " + operator + " " + num2 + " = " + result);
    }
}`,
      expectedOutput: `10.0 + 5.0 = 15.0`,
      explanationNotes: [
        {
          heading: 'switch (operator)',
          detail: 'Matches operator (+, -, *, /) and branches to appropriate calculation.'
        }
      ],
      runSimulation: (inputs) => {
        const a = Number(inputs.num1);
        const b = Number(inputs.num2);
        const op = inputs.operator || '+';
        let res = (op === '+') ? a + b : (op === '-') ? a - b : (op === '*') ? a * b : (b !== 0 ? (a / b).toFixed(2) : 'Error');
        return `Calculation: ${a} ${op} ${b} = ${res}`;
      }
    },
    {
      id: 10,
      number: 10,
      category: 'math',
      categoryLabel: 'Math & Digits',
      title: 'WAP to reverse a number in Java',
      difficulty: 'Beginner',
      introduction: 'To reverse a number, use two variables: one to store the reversed number (reversedNumber) and another to hold the remainder (remainder). Use a while loop until the number becomes 0, extracting the last digit with (number % 10), appending it with (reversedNumber * 10 + remainder), and removing the last digit with (number / 10).',
      summary: 'Extract digits using modulo and construct the reversed integer in a loop.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'ReverseNumber.java',
      code: `import java.util.Scanner;

public class ReverseNumber
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        // Take user input
        System.out.print("Enter a number to reverse: ");
        int number = scanner.nextInt();

        int reversedNumber = 0;

        // Reverse the number using a while loop
        while (number != 0)
        {
            int remainder = number % 10;  // Get the last digit
            reversedNumber = reversedNumber * 10 + remainder;  // Build the reversed number
            number = number / 10;  // Remove the last digit
        }

        // Display the reversed number
        System.out.println("Reversed Number: " + reversedNumber);

        // Close the scanner
        scanner.close();
    }
}`,
      expectedOutput: `Enter a number to reverse: 135897
Reversed Number: 798531`,
      explanationNotes: [
        {
          heading: 'Input and Variables:',
          detail: 'The program takes an integer input from the user. Two variables are used: reversedNumber to store the reversed value (initially set to 0), and remainder to hold the last digit of the number in each iteration.'
        },
        {
          heading: 'Reversing Logic:',
          detail: 'The while loop continues as long as the number is not 0. In each iteration:\n• The last digit is obtained using number % 10.\n• This digit is added to reversedNumber after shifting its existing digits to the left by multiplying by 10.\n• The last digit is then removed from the original number using number / 10.'
        },
        {
          heading: 'Display the Result:',
          detail: 'Once the loop ends, the reversed number is printed.'
        },
        {
          heading: 'Close Scanner:',
          detail: 'The scanner.close() method is used to close the input stream and release resources.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to reverse a number using a hardcoded initialized variable (int number = 12345) without taking console input.',
        requirements: [
          'Declare and initialize an integer variable: int number = 12345;',
          'Use a while loop until number != 0 to extract digits with % 10 and build reversedNumber.',
          'Print the final reversed number.'
        ],
        solutionCodeTitle: 'ReverseNumberSimple.java',
        solutionCode: `public class ReverseNumber
{
    public static void main(String[] args)
    {
        int number = 12345;

        int reversedNumber = 0;

        // Reverse the number using a while loop
        while (number != 0)
        {
            int remainder = number % 10;  // Get the last digit
            reversedNumber = reversedNumber * 10 + remainder;  // Build the reversed number
            number = number / 10;  // Remove the last digit
        }

        // Display the reversed number
        System.out.println("Reversed Number: " + reversedNumber);
    }
}`,
        taskOutput: `Reversed Number: 54321`
      },
      runSimulation: (inputs) => {
        const n = Number(inputs.singleNum !== undefined ? inputs.singleNum : 135897);
        const sign = n < 0 ? -1 : 1;
        const absStr = Math.abs(n).toString();
        const revStr = absStr.split('').reverse().join('');
        return `[Live Input Evaluation]\nEnter a number to reverse: ${n}\n\n➔ Reversed Number: ${sign < 0 ? '-' : ''}${revStr} (Extracted digits step-by-step: ${absStr.split('').reverse().join(' ➔ ')})`;
      }
    },
    {
      id: 11,
      number: 11,
      category: 'math',
      categoryLabel: 'Math & Digits',
      title: 'WAP to check whether a number is Palindrome in Java',
      difficulty: 'Beginner',
      introduction: 'A palindrome number is a number that reads the same forward and backward (e.g. 121, 545, 1331). To check if a number is a palindrome, store the original number in a temporary variable, reverse its digits using a while loop, and compare the reversed number with the original number.',
      summary: 'Reverse the digits of a number and check if it equals the original value.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'PalindromeNumber.java',
      code: `import java.util.Scanner;

public class PalindromeNumber
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter the number: ");
        int no = scanner.nextInt();  // Number to check for palindrome
        int originalNumber = no;
        int reversedNumber = 0;

        while (no != 0)
        {
            int digit = no % 10;  // Get the last digit
            reversedNumber = reversedNumber * 10 + digit;  // Build the reversed number
            no = no / 10;  // Remove the last digit
        }

        // Check if the original number and reversed number are the same
        if (originalNumber == reversedNumber)
        {
            System.out.println(originalNumber + " is a Palindrome number.");
        }
        else
        {
            System.out.println(originalNumber + " is not a Palindrome number.");
        }

        scanner.close();
    }
}`,
      expectedOutput: `Enter the number: 121
121 is a Palindrome number.`,
      explanationNotes: [
        {
          heading: 'Initialization and Variables:',
          detail: 'A variable no is initialized with the number to check (e.g., 121). Two more variables: originalNumber stores the original number for later comparison, and reversedNumber is initialized to 0 to build the reversed number.'
        },
        {
          heading: 'Reversing the Number:',
          detail: 'A while loop runs until no becomes 0:\n• Extract the last digit using no % 10.\n• Add this digit to reversedNumber after shifting it by one place (multiply by 10).\n• Remove the last digit from no using no / 10.'
        },
        {
          heading: 'Comparison:',
          detail: 'After the loop, compare originalNumber with reversedNumber.\nIf they are the same, the number is a Palindrome.\nOtherwise, it is not a Palindrome.'
        },
        {
          heading: 'Output & Close Scanner:',
          detail: 'Print whether the original number is a palindrome or not, and close scanner to release resources.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to check if a number is a palindrome using a hardcoded initialized variable (int no = 52325) without taking console input.',
        requirements: [
          'Declare and initialize an integer variable: int no = 52325;',
          'Save int originalNumber = no;',
          'Use a while loop to compute reversedNumber, then compare originalNumber == reversedNumber.'
        ],
        solutionCodeTitle: 'PalindromeNumberSimple.java',
        solutionCode: `public class PalindromeNumber
{
    public static void main(String[] args)
    {
        int no = 52325;  // Number to check for palindrome
        int originalNumber = no;
        int reversedNumber = 0;

        while (no != 0)
        {
            int digit = no % 10;  // Get the last digit
            reversedNumber = reversedNumber * 10 + digit;  // Build the reversed number
            no = no / 10;  // Remove the last digit
        }

        // Check if the original number and reversed number are the same
        if (originalNumber == reversedNumber)
        {
            System.out.println(originalNumber + " is a Palindrome number.");
        }
        else
        {
            System.out.println(originalNumber + " is not a Palindrome number.");
        }
    }
}`,
        taskOutput: `52325 is a Palindrome number.`
      },
      runSimulation: (inputs) => {
        const n = Number(inputs.singleNum !== undefined ? inputs.singleNum : 121);
        const originalStr = Math.abs(n).toString();
        const revStr = originalStr.split('').reverse().join('');
        const isPal = originalStr === revStr;
        return `[Live Input Evaluation]\nEnter the number: ${n}\n\n➔ ${n} is ${isPal ? 'a Palindrome' : 'not a Palindrome'} number. (Original: ${n} ➔ Reversed: ${revStr})`;
      }
    },
    {
      id: 12,
      number: 12,
      category: 'primes',
      categoryLabel: 'Primes & Armstrong',
      title: 'WAP to check whether a number is prime or not in Java',
      difficulty: 'Intermediate',
      introduction: 'A prime number is a natural number greater than 1 that has only two factors: 1 and itself (e.g. 2, 3, 5, 7, 11, 13, 17). Non-prime numbers have more than two factors. If the number <= 1, it is not prime. Otherwise, loop from 2 to num/2 (or sqrt(num)) to verify primality.',
      summary: 'Test divisibility from 2 up to num/2 to verify primality.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'CheckPrimeNumber.java',
      code: `import java.util.Scanner;

public class CheckPrimeNumber
{
    public static void main(String[] args)
    {
        Scanner s = new Scanner(System.in);

        System.out.print("Enter the number: ");
        int num = s.nextInt();

        // Combined check for 0 and 1
        if (num <= 1)
        {
            System.out.println(num + " is not a prime number.");
            s.close();
            return; // Exit early for 0 and 1
        }

        boolean isPrime = true;

        for (int i=2; i < num/2; i++)
        {
            if (num % i == 0)
            {
                isPrime = false;
                break;
            }
        }

        if (isPrime)
        {
            System.out.println(num + " is a prime number.");
        }
        else
        {
            System.out.println(num + " is not a prime number.");
        }

        s.close();
    }
}`,
      expectedOutput: `Enter the number: 31
31 is a prime number.`,
      explanationNotes: [
        {
          heading: 'Input and Variables:',
          detail: 'Takes an integer input from the user. Uses a boolean flag (isPrime) initialized to true, assuming the number is prime unless proven otherwise.'
        },
        {
          heading: 'Special Case Handling:',
          detail: 'If num <= 1, it is not a prime number:\nPrints: "num is not a prime number."\nUses return; to exit early (skips checking for factors).'
        },
        {
          heading: 'Prime Check Logic:',
          detail: 'Loop from 2 to num / 2. If num % i == 0, the number is divisible by i, so:\n• Set isPrime = false (not prime).\n• break; to exit the loop early.'
        },
        {
          heading: 'Display Result & Close Scanner:',
          detail: 'If isPrime == true, print "num is a prime number." Else, print "num is not a prime number.", and release resources with s.close().'
        },
        {
          heading: 'Efficiency Note:',
          detail: 'For better efficiency, we can use i <= Math.sqrt(num) in place of i < num / 2 because a number cannot have factors greater than its square root.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to check if a number is prime using a hardcoded initialized variable (int num = 23) without taking console input.',
        requirements: [
          'Declare and initialize an integer variable: int num = 23;',
          'Handle num <= 1 with early return;',
          'Use a for loop from 2 to num/2 with boolean isPrime and break on factor.'
        ],
        solutionCodeTitle: 'CheckPrimeNumberSimple.java',
        solutionCode: `public class CheckPrimeNumber
{
    public static void main(String[] args)
    {
        int num = 23;

        // Combined check for 0 and 1
        if (num <= 1)
        {
            System.out.println(num + " is not a prime number.");
            return; // Exit early for 0 and 1
        }

        boolean isPrime = true;

        for (int i=2; i < num/2; i++)
        {
            if (num % i == 0)
            {
                isPrime = false;
                break;
            }
        }

        if (isPrime)
        {
            System.out.println(num + " is a prime number.");
        }
        else
        {
            System.out.println(num + " is not a prime number.");
        }
    }
}`,
        taskOutput: `23 is a prime number.`
      },
      runSimulation: (inputs) => {
        const n = Number(inputs.singleNum !== undefined ? inputs.singleNum : 31);
        if (n <= 1) return `[Live Input Evaluation]\nEnter the number: ${n}\n\n➔ ${n} is NOT a prime number (Primes are greater than 1).`;
        let factor = null;
        for (let i = 2; i * i <= n; i++) {
          if (n % i === 0) { factor = i; break; }
        }
        return `[Live Input Evaluation]\nEnter the number: ${n}\n\n➔ ${n} ${factor ? `is NOT a prime number (Divisible by ${factor})` : `is a PRIME number (Only factors are 1 and ${n})`}.`;
      }
    },
    {
      id: 13,
      number: 13,
      category: 'primes',
      categoryLabel: 'Primes & Armstrong',
      title: 'WAP to print all prime numbers between 1 to 100 in Java',
      difficulty: 'Intermediate',
      introduction: 'A prime number is a natural number greater than 1 that has only two factors: 1 and itself (e.g. 2, 3, 5, 7, 11, 13, 17). Non-prime (composite) numbers have more than two factors (e.g. 4, 6, 8, 9, 10). To print all prime numbers between 1 and 100, loop num from 2 to 100, check divisibility in an inner loop, and print all numbers where isPrime remains true.',
      summary: 'Use nested loops to check primality for each integer from 1 to 100.',
      programLead: 'Below is the simple program:',
      codeTitle: 'PrimeNumbers1to100.java',
      code: `public class PrimeNumbers1to100
{
    public static void main(String[] args)
    {
        System.out.println("Prime numbers between 1 and 100 are:");

        for (int num = 2; num <= 100; num++)  // Loop from 2 to 100
        {
            boolean isPrime = true;

            for (int i=2; i <= num/2; i++)
            {
                if (num % i == 0)
                {
                    isPrime = false;
                    break;
                }
            }

            if (isPrime)  // If no divisors found, it's prime
            {
                System.out.print(num + " ");
            }
        }
        System.out.println();
    }
}`,
      expectedOutput: `Prime numbers between 1 and 100 are:
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 53 59 61 67 71 73 79 83 89 97`,
      explanationNotes: [
        {
          heading: 'Iteration and Variables:',
          detail: 'The program iterates through numbers from 2 to 100. Uses a flag variable (isPrime) to indicate if a number is prime (true initially).'
        },
        {
          heading: 'Prime Check Logic:',
          detail: 'For each number, a loop checks divisibility from 2 to num / 2. If num % i == 0, set isPrime = false and exit the loop (the number is not prime).'
        },
        {
          heading: 'Display Result:',
          detail: 'If isPrime = true, print the number (it is a prime number).'
        },
        {
          heading: 'Continue to Next Number:',
          detail: 'If the number is prime, move to the next iteration in the loop.'
        }
      ],
      task: {
        title: 'Task: Custom Range Prime Number Generator',
        prompt: 'Write a Java program to print all prime numbers up to a user-entered limit using Scanner input.',
        requirements: [
          'Take input for limit from user using Scanner.',
          'Use nested loops from 2 to limit to find all prime numbers.',
          'Print all primes space-separated on one line.'
        ],
        solutionCodeTitle: 'PrimeRangeFinder.java',
        solutionCode: `import java.util.Scanner;

public class PrimeRangeFinder
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter upper limit for prime numbers: ");
        int limit = scanner.nextInt();

        System.out.println("Prime numbers between 1 and " + limit + " are:");

        for (int num = 2; num <= limit; num++)
        {
            boolean isPrime = true;

            for (int i=2; i <= num/2; i++)
            {
                if (num % i == 0)
                {
                    isPrime = false;
                    break;
                }
            }

            if (isPrime)
            {
                System.out.print(num + " ");
            }
        }
        System.out.println();
        scanner.close();
    }
}`,
        taskOutput: `Enter upper limit for prime numbers: 50
Prime numbers between 1 and 50 are:
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47 `
      },
      runSimulation: (inputs) => {
        const limit = Number(inputs.tableNum || inputs.singleNum || 100);
        const primes = [];
        for (let n = 2; n <= limit; n++) {
          let isPrime = true;
          for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) { isPrime = false; break; }
          }
          if (isPrime) primes.push(n);
        }
        return `[Live Input Evaluation]\nRange: 1 to ${limit}\nTotal Primes Found: ${primes.length}\n\nPrime Numbers:\n${primes.join(' ')}`;
      }
    },
    {
      id: 14,
      number: 14,
      category: 'loops',
      categoryLabel: 'Loops & Series',
      title: 'WAP to print Fibonacci series in Java',
      difficulty: 'Beginner',
      introduction: 'Fibonacci series is a sequence of numbers where each number is the sum of the two preceding ones, starting with 0 and 1 (0, 1, 1, 2, 3, 5, 8, 13, 21, 34...). To generate the series, initialize no1 = 0 and no2 = 1, print them, and in a loop calculate sum = no1 + no2, then update no1 = no2 and no2 = sum.',
      summary: 'Generate sequence starting with 0, 1 where each term is the sum of previous two terms.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'FibonacciSeries.java',
      code: `import java.util.Scanner;

public class FibonacciSeries
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter number of terms: ");
        int n = scanner.nextInt();

        int no1 = 0, no2 = 1;

        if (n <= 0)
        {
            System.out.println("Please enter a positive integer.");
        }
        else if (n == 1)
        {
            System.out.println("Fibonacci Series: " + no1);
        }
        else
        {
            System.out.print("Fibonacci Series: " + no1 + ", " + no2);

            for (int i = 2; i < n; i++)
            {
                int sum = no1 + no2;
                System.out.print(", " + sum);
                no1 = no2;
                no2 = sum;
            }
            System.out.println();
        }

        scanner.close();
    }
}`,
      expectedOutput: `Enter number of terms: 10
Fibonacci Series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34`,
      explanationNotes: [
        {
          heading: 'Initialization and Variables:',
          detail: 'Two variables no1 = 0 and no2 = 1 are initialized to store the first two numbers of the Fibonacci series.'
        },
        {
          heading: 'Display First Two Numbers:',
          detail: 'The program starts by printing the first two numbers, 0 and 1.'
        },
        {
          heading: 'Iteration and Calculation:',
          detail: 'A loop runs from 2 to n (the number of terms). In each iteration:\n• Calculate the next number as sum = no1 + no2.\n• Print the new number.\n• Update no1 to no2 and no2 to sum for the next iteration.'
        },
        {
          heading: 'Repeat and Complete:',
          detail: 'The loop continues until all n terms are printed.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to print the Fibonacci series up to 10 terms using hardcoded initialized variables (int n = 10; no1 = 0, no2 = 1;) without taking console input.',
        requirements: [
          'Declare and initialize integer variables: int n = 10; int no1 = 0, no2 = 1;',
          'Print the initial values no1 and no2.',
          'Use a for loop from 2 to n to calculate sum = no1 + no2, shift values, and print each term.'
        ],
        solutionCodeTitle: 'FibonacciSeriesSimple.java',
        solutionCode: `public class FibonacciSeries
{
    public static void main(String[] args)
    {
        int n = 10;  // Number of terms to print
        int no1 = 0, no2 = 1;

        System.out.print("Fibonacci Series: " + no1 + ", " + no2);

        for (int i = 2; i < n; i++)
        {
            int sum = no1 + no2;
            System.out.print(", " + sum);
            no1 = no2;
            no2 = sum;
        }
        System.out.println();
    }
}`,
        taskOutput: `Fibonacci Series: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34`
      },
      runSimulation: (inputs) => {
        const terms = Math.min(Math.max(Number(inputs.tableNum || inputs.singleNum || 10), 1), 25);
        const seq = [];
        let a = 0, b = 1;
        for (let i = 0; i < terms; i++) {
          seq.push(a);
          const next = a + b;
          a = b;
          b = next;
        }
        return `[Live Input Evaluation]\nNumber of terms: ${terms}\n\n➔ Fibonacci Series: ${seq.join(', ')}`;
      }
    },
    {
      id: 15,
      number: 15,
      category: 'math',
      categoryLabel: 'Math & Digits',
      title: 'WAP to find the GCD (HCF) of two numbers in Java',
      difficulty: 'Intermediate',
      introduction: 'GCD (Greatest Common Divisor) or HCF (Highest Common Factor) is the largest number that divides two or more numbers without a remainder. For example, for 12 and 18, the common divisors are 1, 2, 3, 6, making GCD = 6. Loop from 1 up to the smaller of no1 and no2, updating gcd whenever both numbers are evenly divisible.',
      summary: 'Find Greatest Common Divisor by checking common factors up to the smaller number.',
      programLead: 'Below is the program by taking user input:',
      codeTitle: 'GcdOfTwoNumbers.java',
      code: `import java.util.Scanner;

public class GcdOfTwoNumbers
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter no1: ");
        int no1 = scanner.nextInt();

        System.out.print("Enter no2: ");
        int no2 = scanner.nextInt();

        int gcd = 1;

        for (int i = 1; i <= no1 && i <= no2; i++)
        {
            if (no1 % i == 0 && no2 % i == 0)
            {
                gcd = i;
            }
        }

        System.out.println("GCD: " + gcd);

        scanner.close();
    }
}`,
      expectedOutput: `Enter no1: 56
Enter no2: 72
GCD: 8`,
      explanationNotes: [
        {
          heading: 'Initialization and Variables:',
          detail: 'The program starts by taking two integers, no1 and no2, from the user. A variable gcd is initialized to 1 to store the greatest common divisor.'
        },
        {
          heading: 'Iteration to Find GCD:',
          detail: 'A for loop runs from 1 to the smaller of no1 and no2 (i <= no1 && i <= no2). In each iteration:\n• Check divisibility of both numbers by the loop variable i.\n• If both numbers are divisible by i, assign i to the gcd variable.'
        },
        {
          heading: 'Output & Close Scanner:',
          detail: 'After the loop completes, gcd holds the largest divisor. Result is printed as GCD: [value], and scanner.close() is called.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to find the GCD of two numbers using hardcoded initialized variables (int no1 = 12, no2 = 15;) without taking console input.',
        requirements: [
          'Declare and initialize integer variables: int no1 = 12, no2 = 15;',
          'Initialize int gcd = 1;',
          'Use a for loop up to min(no1, no2) and update gcd on common factors.'
        ],
        solutionCodeTitle: 'GcdOfTwoNumbersSimple.java',
        solutionCode: `public class GcdOfTwoNumbers
{
    public static void main(String[] args)
    {
        int no1 = 12, no2 = 15;
        int gcd = 1;

        for (int i = 1; i <= no1 && i <= no2; i++)
        {
            if (no1 % i == 0 && no2 % i == 0)
            {
                gcd = i;
            }
        }

        System.out.println("GCD: " + gcd);
    }
}`,
        taskOutput: `GCD: 3`
      },
      runSimulation: (inputs) => {
        const a = Math.abs(Number(inputs.num1 || 56));
        const b = Math.abs(Number(inputs.num2 || 72));
        let gcd = 1;
        for (let i = 1; i <= a && i <= b; i++) {
          if (a % i === 0 && b % i === 0) gcd = i;
        }
        return `[Live Input Evaluation]\nInput: no1 = ${a}, no2 = ${b}\n\n➔ GCD (HCF) of ${a} and ${b} is: ${gcd}`;
      }
    },
    {
      id: 16,
      number: 16,
      category: 'math',
      categoryLabel: 'Math & Digits',
      title: 'WAP to find the LCM of two numbers in Java',
      difficulty: 'Intermediate',
      introduction: 'LCM (Least Common Multiple) is the smallest positive integer that is a multiple of both numbers. For example, LCM of 4 and 6 is 12.',
      summary: 'Find LCM by iterating from the larger number upward until a common multiple is found.',
      programLead: 'Below is the program that takes user input and finds the LCM using a loop:',
      codeTitle: 'LcmOfTwoNumbers.java',
      code: `import java.util.Scanner;

public class LcmOfTwoNumbers
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter no1: ");
        int no1 = scanner.nextInt();

        System.out.print("Enter no2: ");
        int no2 = scanner.nextInt();

        int lcm = no1;
        if (no2 > no1) {
            lcm = no2; // start from the larger number
        }

        while (true) {
            if (lcm % no1 == 0 && lcm % no2 == 0) {
                System.out.println("LCM: " + lcm);
                break;
            }
            lcm++;
        }

        scanner.close();
    }
}`,
      expectedOutput: `Enter no1: 20
Enter no2: 25
LCM: 100`,
      explanationNotes: [
        {
          heading: 'Initialize Numbers and Starting Point:',
          detail: 'Read two integers no1 and no2. Set lcm to the larger of the two numbers to start the search.'
        },
        {
          heading: 'Iterative Search for Common Multiple:',
          detail: 'In a while‑true loop, check if the current lcm is divisible by both numbers. If not, increment lcm and repeat.'
        },
        {
          heading: 'Terminate and Output:',
          detail: 'When a value satisfies both divisibility checks, print it as the LCM and break the loop.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variables',
        prompt: 'Write a Java program that finds the LCM of two numbers using hard‑coded variables (int no1 = 12, no2 = 15;) without taking console input.',
        requirements: [
          'Declare and initialize int no1 = 12, no2 = 15;',
          'Set int lcm to the larger of the two numbers.',
          'Loop upward until lcm % no1 == 0 && lcm % no2 == 0, then print the result.'
        ],
        solutionCodeTitle: 'LcmOfTwoNumbersSimple.java',
        solutionCode: `public class LcmOfTwoNumbersSimple
{
    public static void main(String[] args)
    {
        int no1 = 12, no2 = 15;
        int lcm = no1;
        if (no2 > no1) {
            lcm = no2;
        }
        while (true) {
            if (lcm % no1 == 0 && lcm % no2 == 0) {
                System.out.println("LCM: " + lcm);
                break;
            }
            lcm++;
        }
    }
}`,
        taskOutput: `LCM: 60`
      },
      runSimulation: (inputs) => {
        const a = Math.abs(Number(inputs.num1 || 20));
        const b = Math.abs(Number(inputs.num2 || 25));
        let lcm = a > b ? a : b;
        while (true) {
          if (lcm % a === 0 && lcm % b === 0) break;
          lcm++;
        }
        return `[Live Input Evaluation]\nInput: no1 = ${a}, no2 = ${b}\n\n➔ LCM: ${lcm}`;
      }
    },
    {
      id: 17,
      number: 17,
      category: 'math',
      categoryLabel: 'Math & Digits',
      title: 'WAP to count the number of digits in a number in Java',
      difficulty: 'Beginner',
      introduction: 'Counting digits demonstrates how integers can be broken down place by place in a loop.',
      summary: 'Repeatedly divide integer by 10 to count individual digits in a number.',
      programLead: 'Below is the program to count the number of digits in a number:',
      codeTitle: 'CountDigits.java',
      code: `public class CountDigits {
    public static void main(String[] args) {
        int num = 45872, count = 0;
        int temp = num;

        while (temp > 0) {
            count++;
            temp /= 10;
        }

        System.out.println("Total Digits in " + num + " = " + count);
    }
}`,
      expectedOutput: `Total Digits in 45872 = 5`,
      explanationNotes: [
        {
          heading: 'temp /= 10',
          detail: 'Removes the last digit in each loop cycle until number becomes 0.'
        }
      ],
      runSimulation: (inputs) => {
        const n = Math.abs(Number(inputs.singleNum || 45872));
        return `Number: ${n}\nTotal Digits: ${n.toString().length}`;
      }
    },
    {
      id: 18,
      number: 18,
      category: 'math',
      categoryLabel: 'Math & Digits',
      title: 'WAP to calculate the sum of digits in a number in Java',
      difficulty: 'Beginner',
      introduction: 'In Java, calculating the sum of digits in a number is a fundamental algorithmic problem. The logic extracts each digit from right to left using the modulo operator (% 10), adds it to a cumulative sum variable, and removes the processed digit using integer division (/ 10) until the number becomes zero.',
      summary: 'Extract each base-10 digit using modulo 10 and accumulate total digit sum using a while loop.',
      programLead: 'Below is the complete Java program that takes an integer from the user and calculates the sum of its digits:',
      codeTitle: 'SumOfDigits.java',
      code: `import java.util.Scanner;

public class SumOfDigits
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        // Step 1: Take user input
        System.out.print("Enter an integer number: ");
        int num = scanner.nextInt();

        int sum = 0;
        int temp = Math.abs(num); // Handle negative inputs gracefully

        // Step 2: Extract and accumulate digits
        while (temp > 0)
        {
            int digit = temp % 10; // Extract last digit
            sum = sum + digit;      // Add to running sum
            temp = temp / 10;       // Remove last digit
        }

        // Step 3: Display the result
        System.out.println("Sum of digits of " + num + " = " + sum);

        scanner.close();
    }
}`,
      expectedOutput: `Enter an integer number: 12345
Sum of digits of 12345 = 15`,
      explanationNotes: [
        {
          heading: '1. User Input & Math.abs():',
          detail: 'Takes an integer using scanner.nextInt(). Math.abs(num) ensures negative numbers (e.g. -542) are calculated accurately without sign corruption.'
        },
        {
          heading: '2. Extract Last Digit (temp % 10):',
          detail: 'The modulo operator % 10 returns the remainder when divided by 10, which corresponds exactly to the rightmost digit (e.g. 12345 % 10 = 5).'
        },
        {
          heading: '3. Accumulate Sum (sum = sum + digit):',
          detail: 'Adds the extracted digit to the ongoing sum variable initialized to 0.'
        },
        {
          heading: '4. Remove Last Digit (temp = temp / 10):',
          detail: 'Integer division by 10 truncates the decimal part, effectively discarding the last digit (e.g. 12345 / 10 = 1234).'
        }
      ],
      task: {
        title: 'Task: Hardcoded / Initialized Variable Program',
        prompt: 'Write a simple Java program to calculate the sum of digits using hardcoded initialized variables (int num = 12345;) without taking console input.',
        requirements: [
          'Declare int num = 12345 and int sum = 0.',
          'Use a while (temp > 0) loop with temp % 10 and temp / 10.',
          'Print the final calculated sum to the console.'
        ],
        solutionCodeTitle: 'SumOfDigitsSimple.java',
        solutionCode: `public class SumOfDigitsSimple
{
    public static void main(String[] args)
    {
        int num = 12345;
        int sum = 0;
        int temp = num;

        while (temp > 0)
        {
            sum += temp % 10;
            temp /= 10;
        }

        System.out.println("Sum of Digits of " + num + " = " + sum);
    }
}`,
        taskOutput: `Sum of Digits of 12345 = 15`
      },
      runSimulation: (inputs) => {
        const n = Math.abs(Number(inputs.singleNum || 12345));
        const digits = n.toString().split('').map(Number);
        const sum = digits.reduce((a, b) => a + b, 0);
        return `[Live Input Evaluation]\nInput Number: ${n}\n\n➔ Step Breakdown: ${digits.join(' + ')} = ${sum}\n➔ Sum of Digits: ${sum}`;
      }
    },
    {
      id: 19,
      number: 19,
      category: 'primes',
      categoryLabel: 'Primes & Armstrong',
      title: 'WAP to check whether a number is an Armstrong number in Java',
      difficulty: 'Intermediate',
      introduction: 'What is an Armstrong Number?\nAn Armstrong number (also known as a narcissistic number) is a number that is equal to the sum of the n-th power of its digits, where n is the number of digits.\n\n• Example 1: 153 is an Armstrong number because:\n  1³ + 5³ + 3³ = 1 + 125 + 27 = 153\n\n• Example 2: 1634 is an Armstrong number because:\n  1⁴ + 6⁴ + 3⁴ + 4⁴ = 1 + 1296 + 81 + 256 = 1634',
      summary: 'Count digits n, compute the sum of each digit raised to power n, and check if sum equals the original number.',
      programLead: 'Below is the program by taking user input using Scanner:',
      codeTitle: 'CheckArmstrongNumber.java',
      code: `import java.util.Scanner;

public class CheckArmstrongNumber
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter a number: ");
        int no = scanner.nextInt();

        int originalNumber = no;
        int sum = 0;

        // Calculate the number of digits
        int temp = no;
        int digits = 0;
        while (temp != 0)
        {
            digits++;
            temp = temp / 10;
        }

        while (no != 0)
        {
            int rem = no % 10;
            int mul = 1;

            // Calculate rem^digits using a basic loop
            for (int i = 0; i < digits; i++)
            {
                mul = mul * rem;
            }

            sum = sum + mul;
            no = no / 10;
        }

        if (sum == originalNumber)
        {
            System.out.println(originalNumber + " is an Armstrong number.");
        }
        else
        {
            System.out.println(originalNumber + " is not an Armstrong number.");
        }

        scanner.close();
    }
}`,
      expectedOutput: `Enter a number: 1634
1634 is an Armstrong number.`,
      explanationNotes: [
        {
          heading: '1. User Input & Variable Initialization:',
          detail: 'Take input from the user using Scanner and store it in an integer variable no (e.g., no = 1634). Initialize int sum = 0 to track the total sum of digit powers.'
        },
        {
          heading: '2. Count Number of Digits:',
          detail: 'Use a temporary variable temp = no to avoid modifying the original value. Repeatedly divide temp by 10 and increment the digits counter until temp becomes 0. For 1634, digits = 4.'
        },
        {
          heading: '3. Calculate Power Sum in Loop:',
          detail: 'In a while loop until no != 0:\n• Extract the rightmost digit: rem = no % 10 (e.g. 4).\n• Calculate rem^digits (4⁴ = 256) using a basic for loop (mul = mul * rem).\n• Add mul to sum (sum = sum + 256).\n• Discard the last digit: no = no / 10 (1634 ➔ 163).\n• Repeat for remaining digits: 3⁴ = 81, 6⁴ = 1296, 1⁴ = 1. Total sum = 256 + 81 + 1296 + 1 = 1634.'
        },
        {
          heading: '4. Compare Sum with Original Number:',
          detail: 'Compare sum with originalNumber. If sum == originalNumber, print that it is an Armstrong number; otherwise, print that it is not.'
        }
      ],
      task: {
        title: 'Task: Simple Program with Initialized Variable',
        prompt: 'Write a simple Java program to check whether a number is an Armstrong number using hardcoded initialized variables (int no = 153;) without taking console input.',
        requirements: [
          'Declare int no = 153; int originalNumber = no; int sum = 0;',
          'Count total digits using a while (temp != 0) loop.',
          'Extract each digit, calculate digit^digits with a for loop, and accumulate sum.',
          'Check if sum == originalNumber and print the result.'
        ],
        solutionCodeTitle: 'CheckArmstrongNumberSimple.java',
        solutionCode: `public class CheckArmstrongNumber
{
    public static void main(String[] args)
    {
        int no = 153;
        int originalNumber = no;
        int sum = 0;

        // Calculate the number of digits
        int temp = no;
        int digits = 0;
        while (temp != 0)
        {
            digits++;
            temp = temp / 10;
        }

        while (no != 0)
        {
            int rem = no % 10;
            int mul = 1;

            // Calculate rem^digits using a basic loop
            for (int i = 0; i < digits; i++)
            {
                mul = mul * rem;
            }

            sum = sum + mul;
            no = no / 10;
        }

        if (sum == originalNumber)
        {
            System.out.println(originalNumber + " is an Armstrong number.");
        }
        else
        {
            System.out.println(originalNumber + " is not an Armstrong number.");
        }
    }
}`,
        taskOutput: `153 is an Armstrong number.`
      },
      runSimulation: (inputs) => {
        const n = Math.abs(Number(inputs.singleNum || 1634));
        const digits = n.toString().split('').map(Number);
        const power = digits.length;
        const sum = digits.reduce((acc, d) => acc + Math.pow(d, power), 0);
        return `[Live Input Evaluation]\nInput Number: ${n}\nDigits Count: ${power}\nFormula: ${digits.map(d => `${d}^${power}`).join(' + ')} = ${sum}\n➔ Result: ${n === sum ? `${n} is an Armstrong number. ✓` : `${n} is NOT an Armstrong number. ✗`}`;
      }
    },
    {
      id: 20,
      number: 20,
      category: 'primes',
      categoryLabel: 'Primes & Armstrong',
      title: 'WAP to print all Armstrong numbers between 1 to 10,000 in Java',
      difficulty: 'Intermediate',
      introduction: 'What is an Armstrong Number?\nAn Armstrong number (also known as a narcissistic number) is a number that is equal to the sum of the n-th power of its digits, where n is the number of digits.\n\n• Example 1: 153 is an Armstrong number because:\n  1³ + 5³ + 3³ = 1 + 125 + 27 = 153\n\n• Example 2: 1634 is an Armstrong number because:\n  1⁴ + 6⁴ + 3⁴ + 4⁴ = 1 + 1296 + 81 + 256 = 1634\n\n• Logical Steps:\n  1. Iterate numbers from 1 to 10,000 using a loop.\n  2. For each number, calculate the number of digits using a while loop.\n  3. Calculate the sum of digits raised to the power of the number of digits using an inner loop.\n  4. Check if the sum is equal to the original number.\n  5. If it matches, print the number as an Armstrong number.',
      summary: 'Iterate from 1 to 10,000, compute digit power sum for each number, and print all numbers where sum equals original number.',
      programLead: 'Below is the simple program to print all Armstrong numbers between 1 and 10,000:',
      codeTitle: 'ArmstrongNumberList.java',
      code: `public class ArmstrongNumberList
{
    public static void main(String[] args)
    {
        System.out.println("Armstrong numbers between 1 and 10,000 are:");

        for (int no = 1; no <= 10000; no++)
        {
            int originalNumber = no;
            int sum = 0;

            // Calculate the number of digits
            int temp = no;
            int digits = 0;
            while (temp != 0)
            {
                digits++;
                temp = temp / 10;
            }

            int currentNumber = no;
            while (currentNumber != 0)
            {
                int rem = currentNumber % 10;
                int power = 1;

                // Calculate rem^digits using a basic loop
                for (int i = 0; i < digits; i++)
                {
                    power = power * rem;
                }

                sum = sum + power;
                currentNumber = currentNumber / 10;
            }

            if (sum == originalNumber)
            {
                System.out.println(originalNumber);
            }
        }
    }
}`,
      expectedOutput: `Armstrong numbers between 1 and 10,000 are:
1
2
3
4
5
6
7
8
9
153
370
371
407
1634
8208
9474`,
      explanationNotes: [
        {
          heading: '1. Mathematical Definition & Properties of Armstrong Numbers:',
          detail: 'An Armstrong number (also known as a Narcissistic Number) is a number that equals the sum of its digits each raised to the power of the total number of digits (n):\nFormula: sum = d₁ⁿ + d₂ⁿ + d₃ⁿ + ... + dₙⁿ\n\n• 1-Digit Numbers (1 to 9): Every single digit d satisfies d¹ = d. Thus, all 1, 2, 3, 4, 5, 6, 7, 8, 9 are Armstrong numbers.\n• 2-Digit Numbers (10 to 99): No 2-digit Armstrong numbers exist because for all two-digit numbers, a² + b² < 10a + b (e.g. 9² + 9² = 162 ≠ 99, 4² + 5² = 41 ≠ 45).\n• 3-Digit Numbers: 153 (1³+5³+3³), 370 (3³+7³+0³), 371 (3³+7³+1³), 407 (4³+0³+7³).\n• 4-Digit Numbers: 1634 (1⁴+6⁴+3⁴+4⁴), 8208 (8⁴+2⁴+0⁴+8⁴), 9474 (9⁴+4⁴+7⁴+4⁴).'
        },
        {
          heading: '2. Outer Range Driver Loop (Iterate 1 to 10,000):',
          detail: '• for (int no = 1; no <= 10000; no++) tests each candidate integer sequentially.\n• int originalNumber = no; stores a backup copy of the candidate number. This is critical because digit extraction will repeatedly divide currentNumber until it reaches 0.\n• int sum = 0; resets the accumulator to 0 for every new candidate number. (If declared outside the loop, previous sums would corrupt subsequent tests).'
        },
        {
          heading: '3. Digit Counting Algorithm (Determining Power n):',
          detail: 'Before calculating powers, we must know how many digits the current number has:\n• We assign int temp = no; to keep no unmodified.\n• A while (temp != 0) loop repeatedly divides temp by 10 and increments digits.\n• Example for 1634: 1634 ➔ 163 (count=1) ➔ 16 (count=2) ➔ 1 (count=3) ➔ 0 (count=4). Thus digits = 4.\n• Example for 153: 153 ➔ 15 (count=1) ➔ 1 (count=2) ➔ 0 (count=3). Thus digits = 3.'
        },
        {
          heading: '4. Digit Power Extraction & Pure Integer Exponentiation:',
          detail: 'A second while (currentNumber != 0) loop extracts each digit from right to left:\n• Extract last digit: int rem = currentNumber % 10;\n• Calculate power: We use an inner for loop (for int i=0; i<digits; i++) power = power * rem; rather than Math.pow() to prevent double precision rounding errors.\n• Accumulate: sum = sum + power;\n• Discard last digit: currentNumber = currentNumber / 10;\n\nDetailed Calculation Trace for 1634:\n• Digit 4: 4⁴ = 256 ➔ sum = 0 + 256 = 256 (remaining = 163)\n• Digit 3: 3⁴ = 81  ➔ sum = 256 + 81 = 337 (remaining = 16)\n• Digit 6: 6⁴ = 1296 ➔ sum = 337 + 1296 = 1633 (remaining = 1)\n• Digit 1: 1⁴ = 1   ➔ sum = 1633 + 1 = 1634 (remaining = 0)\n• Total Calculated Sum = 256 + 81 + 1296 + 1 = 1634.'
        },
        {
          heading: '5. Equality Check & Standard Output:',
          detail: '• if (sum == originalNumber) checks if the accumulated power sum matches the original candidate.\n• If true, System.out.println(originalNumber); prints the number.\n• Exactly 16 numbers between 1 and 10,000 satisfy the Armstrong condition:\n  1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407, 1634, 8208, 9474.'
        },
        {
          heading: '6. Time & Space Complexity Analysis:',
          detail: '• Time Complexity: O(N × log₁₀(N)) where N = 10,000. For each number, digit counting and power computation take at most 5 iterations. Total operations ≈ 45,000, executing in under 15ms on modern JVM.\n• Space Complexity: O(1) auxiliary space — uses only 5 primitive integer variables (no, originalNumber, sum, temp, digits, rem, power).'
        },
        {
          heading: '7. Common Traps & Interview Pitfalls:',
          detail: '• Trap 1 (Hardcoded Power): Assuming power is always 3 (cubes). 1634 requires power of 4 (4⁴=256), not 3 (4³=64).\n• Trap 2 (Variable Scope): Placing int sum = 0; outside the for loop causes sum to accumulate across all numbers.\n• Trap 3 (Direct Modification): Modifying no instead of temp in the digit counter creates an infinite loop or skips numbers.\n• Trap 4 (Math.pow Precision): Math.pow(rem, digits) returns a double which can yield 255.9999 instead of 256. Manual integer loop is safer.'
        }
      ],
      task: {
        title: 'Task: Custom Upper Limit Armstrong Finder (User Input)',
        prompt: 'Write a Java program that takes an upper limit from the user using Scanner and prints all Armstrong numbers up to that limit.',
        requirements: [
          'Take limit from user using scanner.nextInt().',
          'Iterate from 1 up to limit and compute digit power sum.',
          'Print each matching Armstrong number.'
        ],
        solutionCodeTitle: 'ArmstrongRangeScanner.java',
        solutionCode: `import java.util.Scanner;

public class ArmstrongRangeScanner
{
    public static void main(String[] args)
    {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter upper limit: ");
        int limit = scanner.nextInt();

        System.out.println("Armstrong numbers between 1 and " + limit + " are:");

        for (int no = 1; no <= limit; no++)
        {
            int originalNumber = no;
            int sum = 0;

            int temp = no;
            int digits = 0;
            while (temp != 0)
            {
                digits++;
                temp = temp / 10;
            }

            int currentNumber = no;
            while (currentNumber != 0)
            {
                int rem = currentNumber % 10;
                int power = 1;

                for (int i = 0; i < digits; i++)
                {
                    power = power * rem;
                }

                sum = sum + power;
                currentNumber = currentNumber / 10;
            }

            if (sum == originalNumber)
            {
                System.out.println(originalNumber);
            }
        }

        scanner.close();
    }
}`,
        taskOutput: `Enter upper limit: 1000
Armstrong numbers between 1 and 1000 are:
1
2
3
4
5
6
7
8
9
153
370
371
407`
      },
      runSimulation: (inputs) => {
        const limit = Number(inputs.tableNum || inputs.singleNum || 10000);
        const armstrongs = [];
        for (let n = 1; n <= Math.min(limit, 10000); n++) {
          const digits = n.toString().split('').map(Number);
          const power = digits.length;
          const sum = digits.reduce((acc, d) => acc + Math.pow(d, power), 0);
          if (sum === n) armstrongs.push(n);
        }
        return `[Live Input Evaluation]\nRange: 1 to ${Math.min(limit, 10000)}\nTotal Armstrong Numbers: ${armstrongs.length}\n\nArmstrong Numbers List:\n${armstrongs.join('\n')}`;
      }
    }
  ];
  const filteredPrograms = programs.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.number.toString() === searchQuery.trim();
    return matchesCat && matchesSearch;
  });

  const selectedProgram = programs.find(p => p.id === selectedProgramId);

  const handleSelectProgram = (id, replace = false) => {
    setSelectedProgramId(id);
    const state = parseUrlState();
    updateBrowserUrl({ ...state, program: id }, replace);
  };

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNextProgram = () => {
    if (!selectedProgram) return;
    const currentIndex = programs.findIndex(p => p.id === selectedProgram.id);
    const nextIndex = (currentIndex + 1) % programs.length;
    handleSelectProgram(programs[nextIndex].id, true);
  };

  const handlePrevProgram = () => {
    if (!selectedProgram) return;
    const currentIndex = programs.findIndex(p => p.id === selectedProgram.id);
    const prevIndex = (currentIndex - 1 + programs.length) % programs.length;
    handleSelectProgram(programs[prevIndex].id, true);
  };

  // =========================================================================
  // VIEW 1: DEDICATED SOLUTION & INTERACTIVE PLAYGROUND PAGE (Full Tutorial)
  // =========================================================================
  if (selectedProgram) {
    return (
      <div className="space-y-7 animate-in fade-in duration-300">
        
        {/* Top Navigation Action Bar */}
        <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-slate-800/80 bg-gradient-to-r from-[#0F172A] via-[#0B1222] to-[#0A0F1E] flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <button
            onClick={() => handleSelectProgram(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-white border border-blue-900/60 font-semibold text-xs sm:text-sm transition group shadow-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
            <span>← Back to Programs List (20)</span>
          </button>

          {/* Prev / Next Program Navigator */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevProgram}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Previous Program"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-400 px-2">
              {selectedProgram.number} / {programs.length}
            </span>
            <button
              onClick={handleNextProgram}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Next Program"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 1. Header Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-[#0B1222]/95 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#1E6FFB] text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
              {selectedProgram.number}
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold">
                <span>{selectedProgram.categoryLabel}</span>
                <span>•</span>
                <span className="px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-[10px]">
                  {selectedProgram.difficulty}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mt-1">
                {selectedProgram.title}
              </h2>
            </div>
          </div>
        </div>

        {/* 2. Introduction Section */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-cyan-400 uppercase tracking-wide">
            <BookOpen className="w-4 h-4" />
            <span>Introduction &amp; Concept:</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-line">
            {selectedProgram.introduction || selectedProgram.summary}
          </p>
        </div>

        {/* 2.5 Animated Interactive Algorithm Stepper & Memory Visualizer */}
        <AlgorithmVisualStepper program={selectedProgram} />

        {/* 3. Program Section */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/40 bg-[#080D1A] space-y-5 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wide">
              <FileCode className="w-4 h-4 text-blue-400" />
              <span>Program:</span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              {selectedProgram.programLead || 'Below is the program demonstrates how to take input from the user and display it:'}
            </p>
          </div>

          {/* IDE-Grade Clean Syntax Highlighting Code Viewer */}
          <UltraModernCodeViewer
            code={selectedProgram.code}
            title={selectedProgram.codeTitle || `Solution_${selectedProgram.number}.java`}
            language="java"
            badge="Standard Java 21"
          />

          {/* Interactive Runnable Java Code Playground for Main Program */}
          <div className="space-y-2 pt-2 border-t border-slate-800/80">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Live Code Execution Console:</span>
            </div>
            <UniversalCodePlayground
              key={`logical-prog-${selectedProgram.id}-main`}
              title={selectedProgram.codeTitle || `Solution_${selectedProgram.number}.java`}
              initialCode={selectedProgram.code}
              expectedOutput={selectedProgram.expectedOutput}
              scenarioId={`logical-prog-${selectedProgram.id}-main`}
              defaultHeight="min-h-[380px]"
            />
          </div>
        </div>

        {/* 4. Output Section */}
        <div className="rounded-3xl border border-slate-800 bg-[#060A14] overflow-hidden shadow-xl space-y-0">
          <div className="px-5 py-3 bg-[#0B101E] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 font-mono uppercase tracking-wide">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Output:</span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Terminal Standard Out</span>
          </div>
          <div className="p-5 overflow-x-auto font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed bg-[#050811]">
            {selectedProgram.expectedOutput}
          </div>
        </div>

        {/* 5. Program Explanation Section */}
        {selectedProgram.explanationNotes && selectedProgram.explanationNotes.length > 0 && (
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800 bg-[#0B1222]/90 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-sm font-bold text-white pb-2 border-b border-slate-800 uppercase tracking-wide">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Program Explanation &amp; Theory:</span>
            </div>
            <div className="space-y-3">
              {selectedProgram.explanationNotes.map((note, index) => (
                <div key={index} className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-1.5">
                  <div className="text-xs font-mono font-bold text-cyan-300">
                    {note.heading}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                    {note.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. Hands-On Task Section (Banking App) if present */}
        {selectedProgram.task && (
          <div className="space-y-6 pt-3 border-t border-slate-800">
            {/* Task Banner & Requirements */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#061A14] to-[#040E0A] space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-base font-bold text-emerald-400 uppercase tracking-wide">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Task &amp; Simple Variant:</span>
              </div>
              <div className="whitespace-pre-wrap text-xs sm:text-sm text-slate-200 leading-relaxed font-mono bg-slate-950/80 p-5 rounded-2xl border border-emerald-900/50">
                {selectedProgram.task.prompt || selectedProgram.task.description}
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide font-mono">
                  Requirements:
                </span>
                <ul className="text-xs text-slate-300 space-y-1.5 pl-4 list-disc marker:text-emerald-400">
                  {selectedProgram.task.requirements.map((req, i) => (
                    <li key={i} className="leading-relaxed">{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Task Solution Code with Embedded Playground */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/40 bg-[#060F11] space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wide pb-2 border-b border-emerald-950">
                <CheckCircle className="w-4 h-4" />
                <span>Task Solution: ({selectedProgram.task.solutionCodeTitle})</span>
              </div>

              {/* IDE-Grade Clean Syntax Highlighting Code Viewer */}
              <UltraModernCodeViewer
                code={selectedProgram.task.solutionCode}
                title={selectedProgram.task.solutionCodeTitle}
                language="java"
                badge="Task Solution Variant"
              />

              {/* Embedded Playground for Task Solution */}
              <div className="pt-2 border-t border-emerald-950/80">
                <UniversalCodePlayground
                  key={`logical-prog-${selectedProgram.id}-task`}
                  title={selectedProgram.task.solutionCodeTitle}
                  initialCode={selectedProgram.task.solutionCode}
                  expectedOutput={selectedProgram.task.taskOutput}
                  scenarioId={`logical-prog-${selectedProgram.id}-task`}
                  defaultHeight="min-h-[440px]"
                />
              </div>
            </div>

            {/* Task Output Trace */}
            <div className="rounded-3xl border border-slate-800 bg-[#060A14] overflow-hidden shadow-xl space-y-0">
              <div className="px-5 py-3 bg-[#0B101E] border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono uppercase tracking-wide">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Task Output:</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">Console Trace</span>
              </div>
              <div className="p-5 overflow-x-auto font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed bg-[#050811]">
                {selectedProgram.task.taskOutput}
              </div>
            </div>
          </div>
        )}

        {/* 7. Interactive Live Input Simulator */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0C1528] to-[#0A1020] border border-blue-500/30 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wide">
              <Cpu className="w-4 h-4" />
              <span>Interactive Live Input Simulator</span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              Real-Time Output Tester
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(selectedProgram.id === 2 || selectedProgram.id === 3 || selectedProgram.id === 8 || selectedProgram.id === 9 || selectedProgram.id === 15 || selectedProgram.id === 16) && (
              <>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Number A:</label>
                  <input
                    type="number"
                    value={simInputs.num1}
                    onChange={(e) => setSimInputs({ ...simInputs, num1: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-mono text-slate-400">Number B:</label>
                  <input
                    type="number"
                    value={simInputs.num2}
                    onChange={(e) => setSimInputs({ ...simInputs, num2: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                {selectedProgram.id === 3 && (
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-slate-400">Number C:</label>
                    <input
                      type="number"
                      value={simInputs.num3}
                      onChange={(e) => setSimInputs({ ...simInputs, num3: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                )}
              </>
            )}

            {(selectedProgram.id === 4 || selectedProgram.id === 7 || selectedProgram.id === 11 || selectedProgram.id === 12 || selectedProgram.id === 13 || selectedProgram.id === 14 || selectedProgram.id === 17 || selectedProgram.id === 18 || selectedProgram.id === 19 || selectedProgram.id === 20) && (
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-mono text-slate-400">Input Number (Test Value):</label>
                <input
                  type="number"
                  value={simInputs.singleNum}
                  onChange={(e) => setSimInputs({ ...simInputs, singleNum: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {selectedProgram.id === 5 && (
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-mono text-slate-400">Year Value:</label>
                <input
                  type="number"
                  value={simInputs.year}
                  onChange={(e) => setSimInputs({ ...simInputs, year: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {selectedProgram.id === 6 && (
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-mono text-slate-400">Multiplication Table for Number:</label>
                <input
                  type="number"
                  value={simInputs.tableNum}
                  onChange={(e) => setSimInputs({ ...simInputs, tableNum: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}

            {selectedProgram.id === 1 && (
              <div className="space-y-1 sm:col-span-2">
                <label className="text-[11px] font-mono text-slate-400">Name String Input:</label>
                <input
                  type="text"
                  value={simInputs.text}
                  onChange={(e) => setSimInputs({ ...simInputs, text: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-[#060912] border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre-wrap leading-relaxed">
            {selectedProgram.runSimulation ? selectedProgram.runSimulation(simInputs) : selectedProgram.expectedOutput}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => handleSelectProgram(null)}
            className="text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Programs List</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevProgram}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Prev Program</span>
            </button>
            <button
              onClick={handleNextProgram}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition flex items-center gap-1 shadow-md shadow-blue-600/30"
            >
              <span>Next Program</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: PROGRAMS LIST SCREEN (With Logic Cheat Sheet & Visual Badges)
  // =========================================================================
  return (
    <div className="space-y-6">
      {/* Top Banner Matching Exact Screenshot Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
        
        {/* Main Center Title with YouTube icon */}
        <div className="text-center space-y-2 pb-4 border-b border-slate-800/60 relative">
          <div className="flex items-center justify-center gap-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Control Statements &amp; Logical Programs
            </h2>
            
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Comprehensive collection of 20 core algorithmic problems in Java with interactive step-by-step memory animations, simple analogies, and runnable playgrounds.
          </p>
        </div>

        {/* 3 Core Invariant Logic Pillars for Beginners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#091122] border border-blue-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>1. Digit Extractor Engine</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
              <code className="text-cyan-300 font-bold">rem = n % 10</code> (Gets rightmost digit)<br />
              <code className="text-cyan-300 font-bold">n = n / 10</code> (Chops off last digit)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#08171C] border border-cyan-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>2. Accumulator Loops</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
              <code className="text-emerald-300 font-bold">sum += rem</code> (Sum of digits)<br />
              <code className="text-emerald-300 font-bold">rev = rev*10 + rem</code> (Reverse)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#140D24] border border-purple-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>3. Math &amp; Power Invariants</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
              <code className="text-purple-300 font-bold">mul = rem^d</code> (Armstrong)<br />
              <code className="text-purple-300 font-bold">n % 2 == 0</code> (Even / Odd)
            </p>
          </div>
        </div>

        {/* Section Header: ☀️ Programs List */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">☀️</span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Programs List (20)
            </h3>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800 font-semibold">
              {filteredPrograms.length} {filteredPrograms.length === 1 ? 'Program' : 'Programs'}
            </span>
          </div>

          {/* Search & Filter */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title, number, or logic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-slate-800/40">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Program Cards List - Matching Exact Screenshot Style with Subtitles & Badges */}
        <div className="space-y-3 pt-2">
          {filteredPrograms.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 text-sm">
              No programs found matching "{searchQuery}". Try a different keyword.
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
                    {/* Blue Rounded Square Number Badge */}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#1E6FFB] text-white font-extrabold text-sm sm:text-base flex items-center justify-center shrink-0 shadow-md shadow-blue-600/30 group-hover:scale-105 transition">
                      {prog.number}
                    </div>

                    {/* Program Statement & Logic Note */}
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
    </div>
  );
}

// =============================================================================
// SUB-COMPONENT: INTERACTIVE ALGORITHM ANIMATION STEPPER & MEMORY VISUALIZER
// =============================================================================
function AlgorithmVisualStepper({ program }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1600);

  const frames = React.useMemo(() => {
    return getProgramExecutionFrames(program);
  }, [program]);

  React.useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [program.id]);

  React.useEffect(() => {
    let timer = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, frames.length, playbackSpeed]);

  const currentFrame = frames[stepIndex] || frames[0];

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#081224] to-[#060D1A] space-y-4 shadow-2xl">
      {/* Stepper Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Interactive Step-by-Step Logic Animator</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                Step {stepIndex + 1} of {frames.length}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400">
              Watch variables update live in memory as the algorithm executes
            </p>
          </div>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStepIndex((prev) => Math.max(prev - 1, 0))}
            disabled={stepIndex === 0}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-600/30 transition"
          >
            {isPlaying ? (
              <>
                <span className="w-2 h-2 rounded-sm bg-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Auto-Play</span>
              </>
            )}
          </button>

          <button
            onClick={() => setStepIndex((prev) => Math.min(prev + 1, frames.length - 1))}
            disabled={stepIndex === frames.length - 1}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white disabled:opacity-40 transition"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => { setStepIndex(0); setIsPlaying(false); }}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
            title="Reset Animation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300"
          style={{ width: `${((stepIndex + 1) / frames.length) * 100}%` }}
        />
      </div>

      {/* Active Stage & Memory Registers */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        
        {/* Left: Code Operation Line & Plain English Explanation (7 cols) */}
        <div className="md:col-span-7 p-4 rounded-2xl bg-[#0A101E] border border-slate-800/90 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                Operation ({currentFrame.label || `Stage ${stepIndex + 1}`})
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                Line {currentFrame.line || stepIndex + 1}
              </span>
            </div>

            {/* Glowing Code Instruction */}
            <div className="p-2.5 rounded-xl bg-slate-950/90 border border-cyan-500/40 font-mono text-xs text-cyan-200">
              <code>{currentFrame.codeSnippet}</code>
            </div>

            {/* Beginner-Friendly Explanation */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200 leading-relaxed">
              <span className="text-amber-300 font-bold mr-1">💡 What happens:</span>
              {currentFrame.explanation}
            </div>
          </div>

          {currentFrame.invariant && (
            <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-900/60">
              Invariant: {currentFrame.invariant}
            </div>
          )}
        </div>

        {/* Right: Live Variable Memory Block (5 cols) */}
        <div className="md:col-span-5 p-4 rounded-2xl bg-[#090E1A] border border-slate-800 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-1 border-b border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                CPU Memory Registers
              </span>
              <span className="text-[10px] font-mono text-emerald-400">
                Live State
              </span>
            </div>

            {/* Variable Chips Grid */}
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(currentFrame.variables || {}).map(([key, val]) => (
                <div key={key} className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 block">{key}</span>
                  <span className="text-xs font-mono font-bold text-cyan-300 block truncate">
                    {String(val)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step Result Banner */}
          <div className={`p-2.5 rounded-xl border text-center font-mono text-xs font-bold ${
            currentFrame.isMatch
              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
              : 'bg-slate-900/90 border-slate-800 text-slate-300'
          }`}>
            {currentFrame.statusNote || 'Executing step...'}
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// HELPER: EXECUTION FRAMES GENERATOR FOR ALL 20 LOGICAL PROGRAMS
// =============================================================================
function getProgramExecutionFrames(program) {
  const pId = program.id;

  // Program 1: User Input
  if (pId === 1) {
    return [
      {
        label: 'Step 1: Scanner Initialization',
        codeSnippet: 'Scanner scanner = new Scanner(System.in);',
        explanation: 'Creates a Scanner instance connected to System.in (the keyboard standard input stream).',
        line: 8,
        variables: { scanner: 'Connected (System.in)', stream: 'Active' },
        statusNote: 'Keyboard stream ready'
      },
      {
        label: 'Step 2: Read String Name',
        codeSnippet: 'String name = scanner.nextLine(); // "Deepak"',
        explanation: 'The CPU pauses and waits for the user to type their full name and press Enter.',
        line: 12,
        variables: { name: '"Deepak"', type: 'String' },
        statusNote: 'Stored name: "Deepak"'
      },
      {
        label: 'Step 3: Read Integer Age',
        codeSnippet: 'int age = scanner.nextInt(); // 30',
        explanation: 'Reads the next integer from input and converts the characters into a 32-bit int in memory.',
        line: 16,
        variables: { name: '"Deepak"', age: 30 },
        statusNote: 'Stored age: 30'
      },
      {
        label: 'Step 4: Read Floating-Point Value',
        codeSnippet: 'double favoriteNumber = scanner.nextDouble(); // 21.1',
        explanation: 'Reads a 64-bit double decimal number from the stream.',
        line: 20,
        variables: { name: '"Deepak"', age: 30, favNum: 21.1 },
        statusNote: 'Stored favNum: 21.1'
      },
      {
        label: 'Step 5: Output Summary & Close Stream',
        codeSnippet: 'System.out.println("Hello " + name + "!"); scanner.close();',
        explanation: 'Prints the formatted message to stdout and closes scanner to release system resources.',
        line: 24,
        variables: { name: '"Deepak"', age: 30, scanner: 'Closed' },
        isMatch: true,
        statusNote: '✓ User input captured & displayed'
      }
    ];
  }

  // Program 2: Largest of Two Numbers
  if (pId === 2) {
    return [
      {
        label: 'Step 1: Read Inputs',
        codeSnippet: 'int no1 = 45; int no2 = 89;',
        explanation: 'The two numbers to compare are stored in memory variables no1 and no2.',
        line: 8,
        variables: { no1: 45, no2: 89 },
        statusNote: 'Values loaded in memory'
      },
      {
        label: 'Step 2: Evaluate Condition 1',
        codeSnippet: 'if (no1 > no2) ➔ 45 > 89 ➔ false',
        explanation: '45 is not greater than 89, so the first if-branch is skipped.',
        line: 14,
        variables: { '45 > 89': 'false' },
        statusNote: 'First condition failed'
      },
      {
        label: 'Step 3: Evaluate Condition 2',
        codeSnippet: 'else if (no2 > no1) ➔ 89 > 45 ➔ true!',
        explanation: '89 is strictly greater than 45. The CPU enters this branch.',
        line: 18,
        variables: { '89 > 45': 'true', largest: 89 },
        statusNote: 'Match found: no2 is greater'
      },
      {
        label: 'Step 4: Print Result',
        codeSnippet: 'System.out.println("The largest number is : " + no2);',
        explanation: 'Outputs 89 as the largest value.',
        line: 20,
        variables: { largest: 89 },
        isMatch: true,
        statusNote: '✓ The largest number is : 89'
      }
    ];
  }

  // Program 3: Largest of Three Numbers
  if (pId === 3) {
    return [
      {
        label: 'Step 1: Initialize 3 Numbers',
        codeSnippet: 'int no1 = 100, no2 = 200, no3 = 300;',
        explanation: 'Variables loaded into memory for compound boolean comparison.',
        line: 8,
        variables: { no1: 100, no2: 200, no3: 300 },
        statusNote: 'Loaded 3 variables'
      },
      {
        label: 'Step 2: Test no1 with Compound (&&)',
        codeSnippet: 'if (no1>no2 && no1>no3) ➔ 100>200 && 100>300 ➔ false && false ➔ false',
        explanation: 'Both sub-conditions must be true for no1 to be largest. 100 fails.',
        line: 14,
        variables: { 'no1 is max': 'false' },
        statusNote: 'no1 eliminated'
      },
      {
        label: 'Step 3: Test no2 with Compound (&&)',
        codeSnippet: 'else if (no2>no1 && no2>no3) ➔ 200>100 && 200>300 ➔ true && false ➔ false',
        explanation: '200 is greater than 100 but smaller than 300. Condition evaluates to false.',
        line: 18,
        variables: { 'no2 is max': 'false' },
        statusNote: 'no2 eliminated'
      },
      {
        label: 'Step 4: Else Fallback (no3 is max)',
        codeSnippet: 'else ➔ no3 (300) must be the largest number!',
        explanation: 'Since neither no1 nor no2 is the largest, no3 is guaranteed to be the maximum.',
        line: 22,
        variables: { largest: 300 },
        isMatch: true,
        statusNote: '✓ The largest number is : 300'
      }
    ];
  }

  // Program 4: Even or Odd
  if (pId === 4) {
    return [
      {
        label: 'Step 1: Input Number',
        codeSnippet: 'int num = 26;',
        explanation: 'Load number 26 into memory.',
        line: 6,
        variables: { num: 26 },
        statusNote: 'Evaluating parity'
      },
      {
        label: 'Step 2: Modulo 2 Operation',
        codeSnippet: 'if (26 % 2 == 0) ➔ 0 == 0 ➔ true!',
        explanation: '26 divided by 2 has remainder 0. Condition is true.',
        line: 9,
        variables: { num: 26, remainder: 0, isEven: 'true' },
        isMatch: true,
        statusNote: '✓ 26 is an EVEN number'
      }
    ];
  }

  // Program 5: Leap Year
  if (pId === 5) {
    return [
      {
        label: 'Step 1: Input Year',
        codeSnippet: 'int year = 2024;',
        explanation: 'Year 2024 is tested against Gregorian leap year rules.',
        line: 6,
        variables: { year: 2024 },
        statusNote: 'Testing leap rules'
      },
      {
        label: 'Step 2: Rule Evaluation',
        codeSnippet: '(year % 4 == 0 && year % 100 != 0) ➔ 0==0 && 24!=0 ➔ true',
        explanation: '2024 is divisible by 4 and not a century year. Hence leap year!',
        line: 10,
        variables: { year: 2024, isLeap: 'true' },
        isMatch: true,
        statusNote: '✓ 2024 is a LEAP year (366 days)'
      }
    ];
  }

  // Program 6: Multiplication Table
  if (pId === 6) {
    return [
      {
        label: 'Step 1: Setup Target Number',
        codeSnippet: 'int num = 5;',
        explanation: 'Table target number initialized to 5.',
        line: 6,
        variables: { num: 5 },
        statusNote: 'Table base = 5'
      },
      {
        label: 'Step 2: First Product (i=1)',
        codeSnippet: 'for (int i=1; i<=10; i++) ➔ 5 * 1 = 5',
        explanation: 'Loop begins at i = 1, multiplies 5 × 1 = 5.',
        line: 8,
        variables: { num: 5, i: 1, product: 5 },
        statusNote: '5 * 1 = 5'
      },
      {
        label: 'Step 3: Mid Product (i=5)',
        codeSnippet: '5 * 5 = 25',
        explanation: 'Loop reaches midpoint i = 5, multiplies 5 × 5 = 25.',
        line: 8,
        variables: { num: 5, i: 5, product: 25 },
        statusNote: '5 * 5 = 25'
      },
      {
        label: 'Step 4: Final Product (i=10)',
        codeSnippet: '5 * 10 = 50',
        explanation: 'Loop finishes at i = 10, completing table generation.',
        line: 8,
        variables: { num: 5, i: 10, product: 50 },
        isMatch: true,
        statusNote: '✓ Multiplication table printed (1..10)'
      }
    ];
  }

  // Program 7: Factorial
  if (pId === 7) {
    return [
      {
        label: 'Step 1: Initialize Accumulator',
        codeSnippet: 'int n = 6; long fact = 1;',
        explanation: 'Factorial accumulator fact starts at 1 (multiplicative identity).',
        line: 6,
        variables: { n: 6, fact: 1, i: 1 },
        statusNote: 'fact = 1'
      },
      {
        label: 'Step 2: Multiply 1..3',
        codeSnippet: 'fact = 1 × 2 × 3 = 6',
        explanation: 'First 3 iterations multiply 1 × 2 × 3.',
        line: 10,
        variables: { i: 3, fact: 6 },
        statusNote: 'fact = 6'
      },
      {
        label: 'Step 3: Multiply 4..6',
        codeSnippet: 'fact = 6 × 4 × 5 × 6 = 720',
        explanation: 'Remaining iterations multiply 6 × 4 (24) × 5 (120) × 6 (720).',
        line: 10,
        variables: { i: 6, fact: 720 },
        isMatch: true,
        statusNote: '✓ Factorial of 6 is 720'
      }
    ];
  }

  // Program 8: Swap with Temp
  if (pId === 8) {
    return [
      {
        label: 'Step 1: Initial Values',
        codeSnippet: 'int a = 100, b = 200, temp;',
        explanation: 'Original variables: a = 100, b = 200.',
        line: 6,
        variables: { a: 100, b: 200, temp: 'undefined' },
        statusNote: 'Before Swap: a=100, b=200'
      },
      {
        label: 'Step 2: Backup a in temp',
        codeSnippet: 'temp = a; // temp = 100',
        explanation: 'temp holds a safe copy of 100 so a can be overwritten.',
        line: 9,
        variables: { a: 100, b: 200, temp: 100 },
        statusNote: 'temp stored 100'
      },
      {
        label: 'Step 3: Copy b into a',
        codeSnippet: 'a = b; // a = 200',
        explanation: 'Variable a is updated with b\'s value (200).',
        line: 10,
        variables: { a: 200, b: 200, temp: 100 },
        statusNote: 'a updated to 200'
      },
      {
        label: 'Step 4: Copy temp into b',
        codeSnippet: 'b = temp; // b = 100',
        explanation: 'Variable b is updated with the saved value from temp (100).',
        line: 11,
        variables: { a: 200, b: 100, temp: 100 },
        isMatch: true,
        statusNote: '✓ Swapped! a=200, b=100'
      }
    ];
  }

  // Program 9: Swap Without Temp
  if (pId === 9) {
    return [
      {
        label: 'Step 1: Initial State',
        codeSnippet: 'int a = 555, b = 888;',
        explanation: 'Two numbers loaded without using any third helper variable.',
        line: 6,
        variables: { a: 555, b: 888 },
        statusNote: 'Before Swap: a=555, b=888'
      },
      {
        label: 'Step 2: Sum Accumulation',
        codeSnippet: 'a = a + b; // a = 555 + 888 = 1443',
        explanation: 'Variable a now holds the combined sum of both values.',
        line: 9,
        variables: { a: 1443, b: 888 },
        statusNote: 'Sum = 1443 in a'
      },
      {
        label: 'Step 3: Extract Original a into b',
        codeSnippet: 'b = a - b; // b = 1443 - 888 = 555',
        explanation: 'Subtracting b from sum yields the original value of a (555) into b.',
        line: 10,
        variables: { a: 1443, b: 555 },
        statusNote: 'b now holds 555'
      },
      {
        label: 'Step 4: Extract Original b into a',
        codeSnippet: 'a = a - b; // a = 1443 - 555 = 888',
        explanation: 'Subtracting new b (555) from sum yields the original value of b (888) into a.',
        line: 11,
        variables: { a: 888, b: 555 },
        isMatch: true,
        statusNote: '✓ Swapped! a=888, b=555'
      }
    ];
  }

  // Program 10: Simple Calculator
  if (pId === 10) {
    return [
      {
        label: 'Step 1: Read Operands & Operator',
        codeSnippet: 'int no1 = 50, no2 = 10; char op = \'+\';',
        explanation: 'Input operands 50, 10 and operator \'+\' loaded into memory.',
        line: 8,
        variables: { no1: 50, no2: 10, op: '\'+\'' },
        statusNote: 'Expression: 50 + 10'
      },
      {
        label: 'Step 2: Switch-Case Branching',
        codeSnippet: 'switch (op) { case \'+\': res = no1 + no2; break; }',
        explanation: 'Switch jumps directly to matching case \'+\' and computes 50 + 10 = 60.',
        line: 14,
        variables: { op: '\'+\'', result: 60 },
        isMatch: true,
        statusNote: '✓ Result: 50 + 10 = 60'
      }
    ];
  }

  // Program 11: Reverse a Number
  if (pId === 11) {
    return [
      {
        label: 'Step 1: Setup',
        codeSnippet: 'int no = 135897, rev = 0;',
        explanation: 'Original number loaded with empty reverse accumulator rev = 0.',
        line: 6,
        variables: { no: 135897, rev: 0 },
        statusNote: 'Starting reversal'
      },
      {
        label: 'Step 2: Extract Digit 7 & 9',
        codeSnippet: 'rev = 0*10 + 7 = 7; rev = 7*10 + 9 = 79;',
        explanation: 'Pulls digits 7 then 9 from right side.',
        line: 10,
        variables: { no: 1358, rev: 79 },
        statusNote: 'rev = 79'
      },
      {
        label: 'Step 3: Extract Digit 8 & 5',
        codeSnippet: 'rev = 79*10 + 8 = 798; rev = 798*10 + 5 = 7985;',
        explanation: 'Pulls digits 8 then 5.',
        line: 10,
        variables: { no: 13, rev: 7985 },
        statusNote: 'rev = 7985'
      },
      {
        label: 'Step 4: Extract Digit 3 & 1',
        codeSnippet: 'rev = 7985*10 + 3 = 79853; rev = 79853*10 + 1 = 798531;',
        explanation: 'Pulls final digits 3 and 1. no becomes 0, terminating loop.',
        line: 10,
        variables: { no: 0, rev: 798531 },
        isMatch: true,
        statusNote: '✓ Reversed: 798531'
      }
    ];
  }

  // Program 12: Palindrome Number
  if (pId === 12) {
    return [
      {
        label: 'Step 1: Store Original Copy',
        codeSnippet: 'int no = 121, original = 121, rev = 0;',
        explanation: 'Copies 121 into original so we can compare after reversing.',
        line: 6,
        variables: { no: 121, original: 121, rev: 0 },
        statusNote: 'original = 121'
      },
      {
        label: 'Step 2: Reverse Loop',
        codeSnippet: 'rev = rev*10 + (no%10); no = no/10; // Result: rev = 121',
        explanation: 'Reverses digits: 1 ➔ 12 ➔ 121.',
        line: 11,
        variables: { no: 0, rev: 121, original: 121 },
        statusNote: 'Reverse computed: 121'
      },
      {
        label: 'Step 3: Equality Check',
        codeSnippet: 'if (original == rev) ➔ 121 == 121 ➔ true!',
        explanation: 'Since forward (121) matches backward (121), the number is a Palindrome.',
        line: 16,
        variables: { original: 121, rev: 121, isPalindrome: 'true' },
        isMatch: true,
        statusNote: '✓ 121 is a Palindrome Number'
      }
    ];
  }

  // Program 13: Check Prime Number
  if (pId === 13) {
    return [
      {
        label: 'Step 1: Prime Hypothesis',
        codeSnippet: 'int no = 31; boolean isPrime = true; int limit = 31/2;',
        explanation: 'Assume 31 is prime. Test divisors from 2 up to 15.',
        line: 7,
        variables: { no: 31, limit: 15, isPrime: 'true' },
        statusNote: 'Testing divisors 2..15'
      },
      {
        label: 'Step 2: Divisibility Iterations',
        codeSnippet: '31 % 2 = 1, 31 % 3 = 1, 31 % 5 = 1 ... 31 % 15 = 1',
        explanation: 'None of the integers between 2 and 15 divide 31 evenly (no rem = 0).',
        line: 12,
        variables: { testedFactors: '2, 3, 4..15', rem: 'All != 0' },
        isMatch: true,
        statusNote: '✓ 31 is a PRIME Number'
      }
    ];
  }

  // Program 14: Prime Range Finder
  if (pId === 14) {
    return [
      {
        label: 'Step 1: Range Definition',
        codeSnippet: 'for (int no = 1; no <= 50; no++)',
        explanation: 'Iterate from 1 up to 50. Skip 1 (neither prime nor composite).',
        line: 6,
        variables: { range: '1 to 50', countPrimes: 0 },
        statusNote: 'Scanning 1..50'
      },
      {
        label: 'Step 2: Sieve Filter & Prime Output',
        codeSnippet: 'if (isPrime) print(no); // 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47',
        explanation: 'Discovers all 15 prime numbers under 50.',
        line: 18,
        variables: { totalPrimesFound: 15, range: '1 to 50' },
        isMatch: true,
        statusNote: '✓ 15 Primes Found in 1..50'
      }
    ];
  }

  // Program 15: Fibonacci Series
  if (pId === 15) {
    return [
      {
        label: 'Step 1: Seed Terms',
        codeSnippet: 'int no1 = 0, no2 = 1; print(no1, no2);',
        explanation: 'Print initial seeds 0 and 1.',
        line: 8,
        variables: { no1: 0, no2: 1, series: '0, 1' },
        statusNote: 'Seeds: 0, 1'
      },
      {
        label: 'Step 2: Compute Next Terms',
        codeSnippet: 'sum = no1 + no2; no1 = no2; no2 = sum;',
        explanation: 'Next terms generated by adding previous two: 1, 2, 3, 5, 8, 13, 21, 34.',
        line: 14,
        variables: { terms: '0, 1, 1, 2, 3, 5, 8, 13, 21, 34', total: 10 },
        isMatch: true,
        statusNote: '✓ 10 Fibonacci terms generated'
      }
    ];
  }

  // Program 16: GCD of Two Numbers
  if (pId === 16) {
    return [
      {
        label: 'Step 1: Setup Numbers',
        codeSnippet: 'int no1 = 56, no2 = 72, gcd = 1;',
        explanation: 'Search common factors up to min(56, 72) = 56.',
        line: 6,
        variables: { no1: 56, no2: 72, min: 56 },
        statusNote: 'Testing factors 1..56'
      },
      {
        label: 'Step 2: Check Divisibility',
        codeSnippet: 'if (56 % i == 0 && 72 % i == 0) ➔ i = 1, 2, 4, 8',
        explanation: '8 is the greatest integer that divides both 56 and 72 evenly.',
        line: 11,
        variables: { commonFactors: '1, 2, 4, 8', gcd: 8 },
        isMatch: true,
        statusNote: '✓ GCD of 56 and 72 is 8'
      }
    ];
  }

  // Program 17: LCM of Two Numbers
  if (pId === 17) {
    return [
      {
        label: 'Step 1: Setup Numbers',
        codeSnippet: 'int no1 = 20, no2 = 25, lcm = max(20, 25);',
        explanation: 'LCM must be at least 25. Loop tests multiples.',
        line: 6,
        variables: { no1: 20, no2: 25, startLcm: 25 },
        statusNote: 'Starting at 25'
      },
      {
        label: 'Step 2: Multiples Search',
        codeSnippet: '25%20!=0, 50%20!=0, 75%20!=0, 100%20==0 && 100%25==0 ➔ Found!',
        explanation: '100 is the smallest positive integer divisible by both 20 and 25.',
        line: 12,
        variables: { lcm: 100 },
        isMatch: true,
        statusNote: '✓ LCM of 20 and 25 is 100'
      }
    ];
  }

  // Program 18: Sum of Digits
  if (pId === 18) {
    return [
      {
        label: 'Step 1: Initialization',
        codeSnippet: 'int num = 12345, sum = 0, temp = num;',
        explanation: 'Store 12345 in temp and start with sum = 0.',
        line: 7,
        variables: { num: 12345, temp: 12345, sum: 0 },
        statusNote: 'Starting sum = 0'
      },
      {
        label: 'Step 2: Digits 5 & 4',
        codeSnippet: 'sum += 12345 % 10 (=5); sum += 1234 % 10 (=4);',
        explanation: 'Extracts 5 then 4. sum becomes 0 + 5 + 4 = 9.',
        line: 12,
        variables: { sum: 9, temp: 123 },
        statusNote: 'sum = 9'
      },
      {
        label: 'Step 3: Digits 3, 2, 1',
        codeSnippet: 'sum += 3; sum += 2; sum += 1; temp = 0;',
        explanation: 'Extracts remaining digits 3, 2, 1. Total sum = 9 + 3 + 2 + 1 = 15.',
        line: 12,
        variables: { sum: 15, temp: 0 },
        isMatch: true,
        statusNote: '✓ Final Sum of Digits = 15'
      }
    ];
  }

  // Program 19: Check Armstrong Number (153 & 1634)
  if (pId === 19) {
    return [
      {
        label: 'Step 1: Input & Initialization',
        codeSnippet: 'int no = 153; int originalNumber = no; int sum = 0;',
        explanation: 'Load 153 into memory and save copy in originalNumber. sum = 0.',
        line: 8,
        variables: { no: 153, original: 153, sum: 0, digits: 0 },
        statusNote: 'Input loaded'
      },
      {
        label: 'Step 2: Calculate Digit Count',
        codeSnippet: 'while (temp != 0) { digits++; temp = temp / 10; }',
        explanation: '153 / 10 gives digits = 3 (n = 3).',
        line: 15,
        variables: { no: 153, digits: 3, sum: 0 },
        statusNote: 'Digit count: 3'
      },
      {
        label: 'Step 3: Extract Digit 1 (3)',
        codeSnippet: 'rem = 153 % 10 = 3; mul = 3³ = 27; sum = 0 + 27 = 27;',
        explanation: '3³ = 27 added to sum.',
        line: 23,
        variables: { no: 15, rem: 3, mul: 27, sum: 27 },
        statusNote: 'sum is 27'
      },
      {
        label: 'Step 4: Extract Digit 2 (5)',
        codeSnippet: 'rem = 15 % 10 = 5; mul = 5³ = 125; sum = 27 + 125 = 152;',
        explanation: '5³ = 125 added to sum (152).',
        line: 28,
        variables: { no: 1, rem: 5, mul: 125, sum: 152 },
        statusNote: 'sum is 152'
      },
      {
        label: 'Step 5: Extract Digit 3 (1)',
        codeSnippet: 'rem = 1 % 10 = 1; mul = 1³ = 1; sum = 152 + 1 = 153;',
        explanation: '1³ = 1 added to sum (153).',
        line: 32,
        variables: { no: 0, rem: 1, mul: 1, sum: 153 },
        statusNote: 'sum is 153'
      },
      {
        label: 'Step 6: Equality Check',
        codeSnippet: 'if (sum == originalNumber) ➔ 153 == 153 ➔ true!',
        explanation: 'Calculated power sum (153) matches original (153). Armstrong Number!',
        line: 36,
        variables: { sum: 153, original: 153, match: 'true' },
        isMatch: true,
        statusNote: '✓ 153 is an Armstrong number!'
      }
    ];
  }

  // Program 20: Armstrong Numbers 1 to 10,000 (Detailed Digit Power Breakdown)
  if (pId === 20) {
    return [
      {
        label: 'Step 1: Outer Range Loop (1 to 10,000)',
        codeSnippet: 'for (int no = 1; no <= 10000; no++) { int originalNumber = no; int sum = 0; }',
        explanation: 'The outer loop tests each number from 1 to 10,000. Let us trace how the CPU evaluates 1634 (or 153).',
        line: 8,
        variables: { no: 1634, originalNumber: 1634, sum: 0, range: '1..10000' },
        statusNote: 'Evaluating no = 1634 in outer loop'
      },
      {
        label: 'Step 2: Calculate Number of Digits',
        codeSnippet: 'while (temp != 0) { digits++; temp = temp / 10; }',
        explanation: 'We divide 1634 by 10 in a loop (1634 ➔ 163 ➔ 16 ➔ 1 ➔ 0). For 1634, total digits = 4.',
        line: 15,
        variables: { no: 1634, digits: 4, temp: 0, sum: 0 },
        statusNote: 'Digits count: 4'
      },
      {
        label: 'Step 3: Extract Digit 4 & Power (4⁴ = 256)',
        codeSnippet: 'rem = 1634 % 10 = 4; power = 4⁴ = 256; sum = 0 + 256 = 256; currentNumber = 163;',
        explanation: '1634 % 10 gives last digit 4. 4⁴ = 256 is added to sum. 1634 / 10 gives 163.',
        line: 23,
        variables: { currentNumber: 163, rem: 4, power: 256, sum: 256 },
        statusNote: 'Added 4⁴ (256) ➔ sum is 256'
      },
      {
        label: 'Step 4: Extract Digit 3 & Power (3⁴ = 81)',
        codeSnippet: 'rem = 163 % 10 = 3; power = 3⁴ = 81; sum = 256 + 81 = 337; currentNumber = 16;',
        explanation: '163 % 10 gives digit 3. 3⁴ = 81 is added to sum. 163 / 10 gives 16.',
        line: 28,
        variables: { currentNumber: 16, rem: 3, power: 81, sum: 337 },
        statusNote: 'Added 3⁴ (81) ➔ sum is 337'
      },
      {
        label: 'Step 5: Extract Digit 6 & Power (6⁴ = 1296)',
        codeSnippet: 'rem = 16 % 10 = 6; power = 6⁴ = 1296; sum = 337 + 1296 = 1633; currentNumber = 1;',
        explanation: '16 % 10 gives digit 6. 6⁴ = 1296 is added to sum. 16 / 10 gives 1.',
        line: 32,
        variables: { currentNumber: 1, rem: 6, power: 1296, sum: 1633 },
        statusNote: 'Added 6⁴ (1296) ➔ sum is 1633'
      },
      {
        label: 'Step 6: Extract Digit 1 & Power (1⁴ = 1)',
        codeSnippet: 'rem = 1 % 10 = 1; power = 1⁴ = 1; sum = 1633 + 1 = 1634; currentNumber = 0;',
        explanation: '1 % 10 gives digit 1. 1⁴ = 1 is added to sum. Total sum = 256 + 81 + 1296 + 1 = 1634.',
        line: 36,
        variables: { currentNumber: 0, rem: 1, power: 1, sum: 1634 },
        statusNote: 'Added 1⁴ (1) ➔ sum is 1634'
      },
      {
        label: 'Step 7: Equality Check & Output',
        codeSnippet: 'if (sum == originalNumber) ➔ 1634 == 1634 ➔ true! System.out.println(1634);',
        explanation: 'Sum of 4th powers (1634) equals original number (1634). It is printed as an Armstrong Number!',
        line: 40,
        variables: { sum: 1634, originalNumber: 1634, match: 'true' },
        isMatch: true,
        statusNote: '✓ 1634 printed as Armstrong Number'
      },
      {
        label: 'Step 8: Output All 16 Armstrong Numbers',
        codeSnippet: 'Prints: 1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407, 1634, 8208, 9474',
        explanation: 'The loop completes all 10,000 numbers and prints the 16 Armstrong numbers found.',
        line: 44,
        variables: { totalArmstrongs: 16, range: '1 to 10,000' },
        isMatch: true,
        statusNote: '✓ Complete 1 to 10,000 Range Output'
      }
    ];
  }

  // Fallback
  return [
    {
      label: 'Step 1: Initialization',
      codeSnippet: `// Setup input variables for: ${program.title}`,
      explanation: 'Variables and inputs are loaded into Java JVM memory.',
      line: 6,
      variables: { title: program.title, category: program.categoryLabel },
      statusNote: 'Program initialized'
    },
    {
      label: 'Step 2: Core Algorithm Execution',
      codeSnippet: program.code ? program.code.split('\n').slice(5, 12).join('\n') : 'Executing loop & condition...',
      explanation: program.summary || 'Processing logic with loops and conditional statements.',
      line: 12,
      variables: { status: 'Running', difficulty: program.difficulty },
      statusNote: 'Executing control logic'
    },
    {
      label: 'Step 3: Verification & Output',
      codeSnippet: 'System.out.println(...);',
      explanation: 'Result calculated and printed to standard output console.',
      line: 18,
      variables: { output: 'Verified ✓' },
      isMatch: true,
      statusNote: '✓ Completed successfully'
    }
  ];
}
