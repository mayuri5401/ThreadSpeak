import React, { useState, useMemo, useEffect } from 'react';
import { 
  Code2, Play, CheckCircle2, Copy, Check, ArrowRight, ArrowLeft, 
  Search, Sparkles, Terminal, BookOpen, Layers, 
  ChevronRight, ChevronLeft, Zap, X, RotateCcw, Cpu,
  HelpCircle, Lightbulb, CheckSquare, ListOrdered, FileCode, CheckCircle, Sliders
} from 'lucide-react';
import UniversalCodePlayground from '../playground/UniversalCodePlayground';
import UltraModernCodeViewer from '../common/UltraModernCodeViewer';
import StarPatternMasterExplanationAnimator from './StarPatternMasterExplanationAnimator';
import { parseUrlState, updateBrowserUrl } from '../../shared/utils/urlRouter';

export default function JavaStarPatternsVisualizer({ onOpenPlayground }) {
  // Navigation state: selectedPatternId synced with browser URL & history
  const [selectedPatternId, setSelectedPatternId] = useState(() => {
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
  const [interactiveN, setInteractiveN] = useState(5);

  // Sync selectedPatternId on browser Back / Forward (popstate)
  useEffect(() => {
    const handlePop = () => {
      try {
        const state = parseUrlState();
        setSelectedPatternId(state.program || null);
      } catch {
        // ignore
      }
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const categories = [
    { id: 'all', label: 'All Patterns (18)' },
    { id: 'triangles', label: 'Triangles & Halves' },
    { id: 'pyramids', label: 'Pyramids & Diamonds' },
    { id: 'hollow', label: 'Hollow Shapes' },
    { id: 'advanced', label: 'Complex & Symmetrical' }
  ];

  // =========================================================================
  // ALL 18 STAR PATTERNS DATA COLLECTION
  // =========================================================================
  const patterns = [
    {
      id: 1,
      number: 1,
      category: 'triangles',
      categoryLabel: 'Triangles & Halves',
      title: 'Right-Angled Triangle',
      summary: 'Row i contains exactly i stars. Standard increasing right-triangle grid.',
      difficulty: 'Beginner',
      preview: `*
* *
* * *
* * * *
* * * * *`,
      formula: 'Stars in Row i = i',
      rowLogic: 'Outer loop: for (int i = 1; i <= n; i++)',
      colLogic: 'Inner loop: for (int j = 1; j <= i; j++) print("* ")',
      explanationNotes: [
        {
          heading: '1. Outer Row Loop (i from 1 to n):',
          detail: 'Drives the height of the triangle. On row 1, i=1. On row 5, i=5.'
        },
        {
          heading: '2. Inner Star Column Loop (j from 1 to i):',
          detail: 'In row i, the column counter j runs exactly i times, printing "* " without newline.'
        },
        {
          heading: '3. Row Terminator:',
          detail: 'System.out.println() moves cursor to the next line after completing row i.'
        }
      ],
      codeTitle: 'RightAngledTriangle.java',
      code: `public class RightAngledTriangle
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          out += '* '.repeat(i).trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 2,
      number: 2,
      category: 'triangles',
      categoryLabel: 'Triangles & Halves',
      title: 'Inverted Right-Angled Triangle',
      summary: 'Starts with n stars on the top row and decreases down to 1 star.',
      difficulty: 'Beginner',
      preview: `* * * * *
* * * *
* * *
* *
*`,
      formula: 'Stars in Row i = i (counting down from n to 1)',
      rowLogic: 'Outer loop: for (int i = n; i >= 1; i--)',
      colLogic: 'Inner loop: for (int j = 1; j <= i; j++) print("* ")',
      explanationNotes: [
        {
          heading: '1. Reverse Outer Row Loop (i from n down to 1):',
          detail: 'Row 1 starts with i=5 stars, row 2 has i=4, down to row 5 having i=1 star.'
        },
        {
          heading: '2. Column Loop (j from 1 to i):',
          detail: 'Executes i times for each row, printing stars.'
        }
      ],
      codeTitle: 'InvertedRightTriangle.java',
      code: `public class InvertedRightTriangle
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = n; i >= 1; i--)
        {
            for (int j = 1; j <= i; j++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = n; i >= 1; i--) {
          out += '* '.repeat(i).trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 3,
      number: 3,
      category: 'triangles',
      categoryLabel: 'Triangles & Halves',
      title: 'Half Diamond',
      summary: 'Combination of an increasing right triangle followed by a decreasing inverted triangle.',
      difficulty: 'Beginner',
      preview: `*
* *
* * *
* * * *
* * * * *
* * * *
* * *
* *
*`,
      formula: 'Upper half: 1 to n stars; Lower half: (n-1) down to 1 star',
      rowLogic: 'Loop 1: 1..n, Loop 2: (n-1)..1',
      colLogic: 'j runs 1..i for each loop section',
      explanationNotes: [
        {
          heading: '1. Upper Section (Increasing):',
          detail: 'First loop runs i=1..n printing 1 up to n stars.'
        },
        {
          heading: '2. Lower Section (Decreasing):',
          detail: 'Second loop runs i=(n-1)..1 printing (n-1) down to 1 star.'
        }
      ],
      codeTitle: 'HalfDiamond.java',
      code: `public class HalfDiamond
{
    public static void main(String[] args)
    {
        int n = 5;

        // Upper Increasing Half
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= i; j++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }

        // Lower Decreasing Half
        for (int i = n - 1; i >= 1; i--)
        {
            for (int j = 1; j <= i; j++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) out += '* '.repeat(i).trimEnd() + '\n';
        for (let i = n - 1; i >= 1; i--) out += '* '.repeat(i).trimEnd() + '\n';
        return out.trimEnd();
      }
    },
    {
      id: 4,
      number: 4,
      category: 'triangles',
      categoryLabel: 'Triangles & Halves',
      title: 'Mirrored Right Triangle',
      summary: 'Right-aligned triangle with leading double spaces on each row (n - i spaces, i stars).',
      difficulty: 'Beginner',
      preview: `        *
      * *
    * * *
  * * * *
* * * * *`,
      formula: 'Spaces = 2*(n - i), Stars = i',
      rowLogic: 'Outer: 1..n',
      colLogic: 'Spaces loop (1..n-i) + Stars loop (1..i)',
      explanationNotes: [
        {
          heading: '1. Leading Spaces Loop:',
          detail: 'for (int j = 1; j <= n - i; j++) prints "  " (2 spaces) to push stars right.'
        },
        {
          heading: '2. Star Printing Loop:',
          detail: 'for (int k = 1; k <= i; k++) prints "* ".'
        }
      ],
      codeTitle: 'MirroredRightTriangle.java',
      code: `public class MirroredRightTriangle
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            // Print Leading Spaces
            for (int j = 1; j <= n - i; j++)
            {
                System.out.print("  ");
            }

            // Print Stars
            for (int k = 1; k <= i; k++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          out += '  '.repeat(n - i) + '* '.repeat(i).trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 5,
      number: 5,
      category: 'triangles',
      categoryLabel: 'Triangles & Halves',
      title: 'Reverse Mirrored Right Triangle',
      summary: 'Inverted triangle anchored to the right edge with increasing leading spaces.',
      difficulty: 'Intermediate',
      preview: `* * * * *
  * * * *
    * * *
      * *
        *`,
      formula: 'Spaces = 2*(n - i), Stars = i (i from n down to 1)',
      rowLogic: 'Outer: n down to 1',
      colLogic: 'Spaces (1..n-i) + Stars (1..i)',
      explanationNotes: [
        {
          heading: '1. Inverted Row Counter (i from n down to 1):',
          detail: 'Row 1 has n-5=0 spaces & 5 stars. Row 5 has n-1=4 spaces & 1 star.'
        }
      ],
      codeTitle: 'ReverseMirroredTriangle.java',
      code: `public class ReverseMirroredTriangle
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = n; i >= 1; i--)
        {
            // Print Leading Spaces
            for (int j = 1; j <= n - i; j++)
            {
                System.out.print("  ");
            }

            // Print Stars
            for (int k = 1; k <= i; k++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = n; i >= 1; i--) {
          out += '  '.repeat(n - i) + '* '.repeat(i).trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 6,
      number: 6,
      category: 'triangles',
      categoryLabel: 'Triangles & Halves',
      title: 'Mirror Half Diamond',
      summary: 'Left-pointing diamond / arrowhead made by combining Mirrored Right Triangle & Reverse Mirrored.',
      difficulty: 'Intermediate',
      preview: `        *
      * *
    * * *
  * * * *
* * * * *
  * * * *
    * * *
      * *
        *`,
      formula: 'Upper: n-i spaces, i stars. Lower: n-i spaces, i stars (i from n-1 down to 1).',
      rowLogic: 'Upper loop: 1..n, Lower loop: (n-1)..1',
      colLogic: 'Space loop + Star loop in each phase',
      explanationNotes: [
        {
          heading: '1. Mirrored Upper Half:',
          detail: 'Increases stars from 1 to n with decreasing leading spaces.'
        },
        {
          heading: '2. Mirrored Lower Half:',
          detail: 'Decreases stars from (n-1) to 1 with increasing leading spaces.'
        }
      ],
      codeTitle: 'MirrorHalfDiamond.java',
      code: `public class MirrorHalfDiamond
{
    public static void main(String[] args)
    {
        int n = 5;

        // Upper Section
        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n - i; j++) System.out.print("  ");
            for (int k = 1; k <= i; k++) System.out.print("* ");
            System.out.println();
        }

        // Lower Section
        for (int i = n - 1; i >= 1; i--)
        {
            for (int j = 1; j <= n - i; j++) System.out.print("  ");
            for (int k = 1; k <= i; k++) System.out.print("* ");
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) out += '  '.repeat(n - i) + '* '.repeat(i).trimEnd() + '\n';
        for (let i = n - 1; i >= 1; i--) out += '  '.repeat(n - i) + '* '.repeat(i).trimEnd() + '\n';
        return out.trimEnd();
      }
    },
    {
      id: 7,
      number: 7,
      category: 'pyramids',
      categoryLabel: 'Pyramids & Diamonds',
      title: 'Triangle Star Pattern',
      summary: 'Equilateral centered triangle with single space between star tokens.',
      difficulty: 'Intermediate',
      preview: `    *
   * *
  * * *
 * * * *
* * * * *`,
      formula: 'Spaces = n - i, Stars = i (with single space "* ")',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'Single space prefix (n-i) + "* " repeated i times',
      explanationNotes: [
        {
          heading: '1. Single-space centering trick:',
          detail: 'Printing a single space " " for indentation and "* " (star + space) automatically produces an equilateral triangle.'
        }
      ],
      codeTitle: 'TriangleStarPattern.java',
      code: `public class TriangleStarPattern
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n - i; j++)
            {
                System.out.print(" ");
            }
            for (int k = 1; k <= i; k++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          out += ' '.repeat(n - i) + '* '.repeat(i).trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 8,
      number: 8,
      category: 'pyramids',
      categoryLabel: 'Pyramids & Diamonds',
      title: 'Full Pyramid',
      summary: 'Solid pyramid where each row contains an odd number of contiguous stars (1, 3, 5, 7, 9).',
      difficulty: 'Intermediate',
      preview: `    *
   ***
  *****
 *******
*********`,
      formula: 'Spaces = n - i, Stars = 2*i - 1',
      rowLogic: 'Outer: 1..n',
      colLogic: 'Spaces (1..n-i) + Contiguous Stars (1..2*i - 1)',
      explanationNotes: [
        {
          heading: '1. Odd Star Formula (2*i - 1):',
          detail: 'Row 1 has 2(1)-1=1 star. Row 2 has 2(2)-1=3 stars. Row 5 has 2(5)-1=9 stars.'
        }
      ],
      codeTitle: 'FullPyramid.java',
      code: `public class FullPyramid
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n - i; j++)
            {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i - 1); k++)
            {
                System.out.print("*");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          out += ' '.repeat(n - i) + '*'.repeat(2 * i - 1) + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 9,
      number: 9,
      category: 'hollow',
      categoryLabel: 'Hollow Shapes',
      title: 'Hollow Inverted Diamond',
      summary: 'Hourglass / Sandglass boundary with stars only on the diagonal perimeters.',
      difficulty: 'Hard',
      preview: `*         *
 *       *
  *     *
   *   *
    * *
     *
    * *
   *   *
  *     *
 *       *
*         *`,
      formula: 'Boundary condition: k == 1 || k == 2*i - 1',
      rowLogic: 'Upper Inverted V (n down to 1) + Lower Upright V (2 to n)',
      colLogic: 'Print * on edges, spaces inside',
      explanationNotes: [
        {
          heading: '1. Hollow Boundary Logic:',
          detail: 'Inside the column loop, check if k == 1 (left border) or k == (2*i - 1) (right border).'
        }
      ],
      codeTitle: 'HollowInvertedDiamond.java',
      code: `public class HollowInvertedDiamond
{
    public static void main(String[] args)
    {
        int n = 6;

        // Top Inverted V
        for (int i = n; i >= 1; i--)
        {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= (2 * i - 1); k++)
            {
                if (k == 1 || k == (2 * i - 1)) System.out.print("*");
                else System.out.print(" ");
            }
            System.out.println();
        }

        // Bottom Upright V
        for (int i = 2; i <= n; i++)
        {
            for (int j = 1; j <= n - i; j++) System.out.print(" ");
            for (int k = 1; k <= (2 * i - 1); k++)
            {
                if (k == 1 || k == (2 * i - 1)) System.out.print("*");
                else System.out.print(" ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = n; i >= 1; i--) {
          let row = ' '.repeat(n - i);
          for (let k = 1; k <= 2 * i - 1; k++) {
            row += (k === 1 || k === 2 * i - 1) ? '*' : ' ';
          }
          out += row + '\n';
        }
        for (let i = 2; i <= n; i++) {
          let row = ' '.repeat(n - i);
          for (let k = 1; k <= 2 * i - 1; k++) {
            row += (k === 1 || k === 2 * i - 1) ? '*' : ' ';
          }
          out += row + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 10,
      number: 10,
      category: 'hollow',
      categoryLabel: 'Hollow Shapes',
      title: 'V Shape',
      summary: 'Downward narrowing hollow V outline with boundary stars.',
      difficulty: 'Intermediate',
      preview: `*       *
 *     *
  *   *
   * *
    *`,
      formula: 'Spaces = n - i, Stars on column 1 and 2*i - 1 (i from n down to 1)',
      rowLogic: 'for (int i = n; i >= 1; i--)',
      colLogic: 'if (k == 1 || k == 2*i - 1) print("*") else print(" ")',
      explanationNotes: [
        {
          heading: '1. V Outline Strategy:',
          detail: 'Run i from n down to 1. On row 1 (the vertex), 2*i - 1 = 1, so only 1 star is printed.'
        }
      ],
      codeTitle: 'VShapePattern.java',
      code: `public class VShapePattern
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = n; i >= 1; i--)
        {
            for (int j = 1; j <= n - i; j++)
            {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i - 1); k++)
            {
                if (k == 1 || k == (2 * i - 1))
                {
                    System.out.print("*");
                }
                else
                {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = n; i >= 1; i--) {
          let row = ' '.repeat(n - i);
          for (let k = 1; k <= 2 * i - 1; k++) {
            row += (k === 1 || k === 2 * i - 1) ? '*' : ' ';
          }
          out += row + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 11,
      number: 11,
      category: 'hollow',
      categoryLabel: 'Hollow Shapes',
      title: 'Inverted V Shape',
      summary: 'Upward pointing chevron / caret outline (Hollow Pyramid without base).',
      difficulty: 'Intermediate',
      preview: `    *
   * *
  *   *
 *     *
*       *`,
      formula: 'Spaces = n - i, Stars on k == 1 and k == 2*i - 1 (i from 1 to n)',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'Leading spaces + Hollow condition',
      explanationNotes: [
        {
          heading: '1. Inverted V / Caret Outline:',
          detail: 'Row 1 starts with apex (1 star). Rows 2..n print left and right border stars with expanding interior hollow space.'
        }
      ],
      codeTitle: 'InvertedVShape.java',
      code: `public class InvertedVShape
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n - i; j++)
            {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i - 1); k++)
            {
                if (k == 1 || k == (2 * i - 1))
                {
                    System.out.print("*");
                }
                else
                {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          let row = ' '.repeat(n - i);
          for (let k = 1; k <= 2 * i - 1; k++) {
            row += (k === 1 || k === 2 * i - 1) ? '*' : ' ';
          }
          out += row + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 12,
      number: 12,
      category: 'advanced',
      categoryLabel: 'Complex & Symmetrical',
      title: 'X Pattern',
      summary: 'Diagonal cross shape where stars print when row == column or row + column == n + 1.',
      difficulty: 'Intermediate',
      preview: `*     *
 *   *
  * *
   *
  * *
 *   *
*     *`,
      formula: 'Condition: i == j || i + j == n + 1',
      rowLogic: 'Square grid: 1..n',
      colLogic: 'Print * on primary and anti-diagonals',
      explanationNotes: [
        {
          heading: '1. Matrix Diagonals:',
          detail: 'Primary diagonal satisfies i == j. Secondary (anti) diagonal satisfies i + j == n + 1.'
        }
      ],
      codeTitle: 'XPattern.java',
      code: `public class XPattern
{
    public static void main(String[] args)
    {
        int n = 7;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                if (i == j || (i + j) == (n + 1))
                {
                    System.out.print("*");
                }
                else
                {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        const size = (n % 2 === 0) ? n + 1 : n;
        let out = '';
        for (let i = 1; i <= size; i++) {
          let row = '';
          for (let j = 1; j <= size; j++) {
            row += (i === j || i + j === size + 1) ? '*' : ' ';
          }
          out += row + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 13,
      number: 13,
      category: 'hollow',
      categoryLabel: 'Hollow Shapes',
      title: 'Hollow Triangle',
      summary: 'Hollow pyramid with solid bottom base. Stars on left edge, right edge, and final row.',
      difficulty: 'Intermediate',
      preview: `    *
   * *
  *   *
 *     *
* * * * *`,
      formula: 'Condition: k == 1 || k == 2*i - 1 || i == n',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'Hollow check with base row exception (i == n)',
      explanationNotes: [
        {
          heading: '1. Base Row Solidification:',
          detail: 'Adding i == n fills the bottom base with stars, sealing the hollow triangle.'
        }
      ],
      codeTitle: 'HollowTriangle.java',
      code: `public class HollowTriangle
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n - i; j++)
            {
                System.out.print(" ");
            }
            for (int k = 1; k <= (2 * i - 1); k++)
            {
                if (k == 1 || k == (2 * i - 1) || i == n)
                {
                    System.out.print("*");
                }
                else
                {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          let row = ' '.repeat(n - i);
          for (let k = 1; k <= 2 * i - 1; k++) {
            row += (k === 1 || k === 2 * i - 1 || i === n) ? '*' : ' ';
          }
          out += row + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 14,
      number: 14,
      category: 'triangles',
      categoryLabel: 'Triangles & Halves',
      title: 'Solid Square',
      summary: 'N x N matrix filled completely with stars.',
      difficulty: 'Beginner',
      preview: `* * * * *
* * * * *
* * * * *
* * * * *
* * * * *`,
      formula: 'N rows, N columns of "* "',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'for (int j = 1; j <= n; j++) print("* ")',
      explanationNotes: [
        {
          heading: '1. Square Grid Foundation:',
          detail: 'Both outer and inner loops iterate from 1 to n.'
        }
      ],
      codeTitle: 'SolidSquare.java',
      code: `public class SolidSquare
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          out += '* '.repeat(n).trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 15,
      number: 15,
      category: 'hollow',
      categoryLabel: 'Hollow Shapes',
      title: 'Hollow Square',
      summary: 'Square perimeter with stars on top, bottom, left, and right borders.',
      difficulty: 'Beginner',
      preview: `* * * * *
*       *
*       *
*       *
* * * * *`,
      formula: 'Condition: i == 1 || i == n || j == 1 || j == n',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'Print * on borders, double space "  " inside',
      explanationNotes: [
        {
          heading: '1. Four-Wall Coordinate Invariant:',
          detail: 'Top wall (i=1), Bottom wall (i=n), Left wall (j=1), Right wall (j=n).'
        }
      ],
      codeTitle: 'HollowSquare.java',
      code: `public class HollowSquare
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n; j++)
            {
                if (i == 1 || i == n || j == 1 || j == n)
                {
                    System.out.print("* ");
                }
                else
                {
                    System.out.print("  ");
                }
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          let row = '';
          for (let j = 1; j <= n; j++) {
            row += (i === 1 || i === n || j === 1 || j === n) ? '* ' : '  ';
          }
          out += row.trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 16,
      number: 16,
      category: 'advanced',
      categoryLabel: 'Complex & Symmetrical',
      title: 'Right-Aligned Rectangle Pattern',
      summary: 'Rhombus / Parallelogram slanted to the right with leading spaces.',
      difficulty: 'Intermediate',
      preview: `    * * * * *
   * * * * *
  * * * * *
 * * * * *
* * * * *`,
      formula: 'Spaces = n - i, Stars = n (constant length)',
      rowLogic: 'for (int i = 1; i <= n; i++)',
      colLogic: 'Leading spaces + fixed n stars',
      explanationNotes: [
        {
          heading: '1. Slanted Rhombus Geometry:',
          detail: 'Each row shifts left by 1 space, but retains a constant width of n stars.'
        }
      ],
      codeTitle: 'RightAlignedRectangle.java',
      code: `public class RightAlignedRectangle
{
    public static void main(String[] args)
    {
        int n = 5;

        for (int i = 1; i <= n; i++)
        {
            for (int j = 1; j <= n - i; j++)
            {
                System.out.print(" ");
            }
            for (int k = 1; k <= n; k++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          out += ' '.repeat(n - i) + '* '.repeat(n).trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 17,
      number: 17,
      category: 'advanced',
      categoryLabel: 'Complex & Symmetrical',
      title: 'Butterfly Pattern',
      summary: 'Symmetrical double-wing structure with mirrored star columns and central hollow space.',
      difficulty: 'Hard',
      preview: `*             *
* *         * *
* * *     * * *
* * * * * * * *
* * * * * * * *
* * *     * * *
* *         * *
*             *`,
      formula: 'Left Wing: i stars | Center Gap: 2*(n-i) spaces | Right Wing: i stars',
      rowLogic: 'Upper Wings (1 to n) + Lower Wings (n down to 1) = Total 2n Rows',
      colLogic: 'Left stars + Center hollow spaces + Right stars',
      explanationNotes: [
        {
          heading: '1. Upper Wings Expansion (i = 1 to n):',
          detail: 'Left and right wings expand from 1 to n stars while the center hollow gap contracts from 2*(n-1) down to 0 spaces.'
        },
        {
          heading: '2. Center Waist Bridge Invariant:',
          detail: 'When i = n, both left and right wings touch with 0 spaces, creating the double solid centerline of the butterfly.'
        },
        {
          heading: '3. Lower Wings Contraction (i = n down to 1):',
          detail: 'Loop runs symmetrically from n down to 1 to mirror the upper wings with identical coordinate formulas.'
        }
      ],
      codeTitle: 'ButterflyPattern.java',
      code: `public class ButterflyPattern
{
    public static void main(String[] args)
    {
        int n = 4;

        // Upper Wings (Rows 1 to n)
        for (int i = 1; i <= n; i++)
        {
            // Left Wing Stars
            for (int j = 1; j <= i; j++)
            {
                System.out.print("* ");
            }
            // Center Hollow Gap
            for (int j = 1; j <= 2 * (n - i); j++)
            {
                System.out.print("  ");
            }
            // Right Wing Stars
            for (int j = 1; j <= i; j++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }

        // Lower Wings (Rows n down to 1)
        for (int i = n; i >= 1; i--)
        {
            // Left Wing Stars
            for (int j = 1; j <= i; j++)
            {
                System.out.print("* ");
            }
            // Center Hollow Gap
            for (int j = 1; j <= 2 * (n - i); j++)
            {
                System.out.print("  ");
            }
            // Right Wing Stars
            for (int j = 1; j <= i; j++)
            {
                System.out.print("* ");
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        for (let i = 1; i <= n; i++) {
          out += '* '.repeat(i) + '  '.repeat(2 * (n - i)) + '* '.repeat(i).trimEnd() + '\n';
        }
        for (let i = n; i >= 1; i--) {
          out += '* '.repeat(i) + '  '.repeat(2 * (n - i)) + '* '.repeat(i).trimEnd() + '\n';
        }
        return out.trimEnd();
      }
    },
    {
      id: 18,
      number: 18,
      category: 'advanced',
      categoryLabel: 'Complex & Symmetrical',
      title: 'Hollow Diamond Pyramid',
      summary: 'Solid rectangular block with a hollow diamond window cutout in the center.',
      difficulty: 'Hard',
      preview: `* * * * * * * * *
* * * *   * * * *
* * *       * * *
* *           * *
*               *
* *           * *
* * *       * * *
* * * *   * * * *
* * * * * * * * *`,
      formula: 'Boundary rows (i=1): 2*n - 1 stars | Middle rows: (n-i+1) stars + (2*i - 3) spaces + (n-i+1) stars',
      rowLogic: 'Upper half (1..n) + Lower inverted symmetric half (n-1 down to 1)',
      colLogic: 'Solid outer edges with dynamic odd space center aperture',
      explanationNotes: [
        {
          heading: '1. Solid Boundary Row Invariant (i == 1):',
          detail: 'When i is 1 (top and bottom caps), print a solid continuous span of (2*n - 1) stars with no center gap.'
        },
        {
          heading: '2. Expanding Center Aperture (Rows 2 to n):',
          detail: 'As i increases from 2 to n, left and right wings contract (n - i + 1 stars) while the center window expands by odd multiples: (2*i - 3) spaces.'
        },
        {
          heading: '3. Lower Half Reflection (n-1 down to 1):',
          detail: 'Loop from n-1 down to 1 to avoid duplicating the widest apex row and create perfect vertical reflection.'
        }
      ],
      codeTitle: 'HollowDiamondPyramid.java',
      code: `public class HollowDiamondPyramid
{
    public static void main(String[] args)
    {
        int n = 5;

        // Upper Section (Rows 1 to n)
        for (int i = 1; i <= n; i++)
        {
            if (i == 1)
            {
                for (int j = 1; j <= 2 * n - 1; j++)
                {
                    System.out.print("* ");
                }
            }
            else
            {
                // Left Border Stars
                for (int j = 1; j <= n - i + 1; j++)
                {
                    System.out.print("* ");
                }
                // Center Diamond Cutout Gap
                for (int j = 1; j <= 2 * i - 3; j++)
                {
                    System.out.print("  ");
                }
                // Right Border Stars
                for (int j = 1; j <= n - i + 1; j++)
                {
                    System.out.print("* ");
                }
            }
            System.out.println();
        }

        // Lower Section (Rows n-1 down to 1)
        for (int i = n - 1; i >= 1; i--)
        {
            if (i == 1)
            {
                for (int j = 1; j <= 2 * n - 1; j++)
                {
                    System.out.print("* ");
                }
            }
            else
            {
                // Left Border Stars
                for (int j = 1; j <= n - i + 1; j++)
                {
                    System.out.print("* ");
                }
                // Center Diamond Cutout Gap
                for (int j = 1; j <= 2 * i - 3; j++)
                {
                    System.out.print("  ");
                }
                // Right Border Stars
                for (int j = 1; j <= n - i + 1; j++)
                {
                    System.out.print("* ");
                }
            }
            System.out.println();
        }
    }
}`,
      renderPattern: (n) => {
        let out = '';
        // Upper Section
        for (let i = 1; i <= n; i++) {
          if (i === 1) {
            out += '* '.repeat(2 * n - 1).trimEnd() + '\n';
          } else {
            out += '* '.repeat(n - i + 1) + '  '.repeat(2 * i - 3) + '* '.repeat(n - i + 1).trimEnd() + '\n';
          }
        }
        // Lower Section
        for (let i = n - 1; i >= 1; i--) {
          if (i === 1) {
            out += '* '.repeat(2 * n - 1).trimEnd() + '\n';
          } else {
            out += '* '.repeat(n - i + 1) + '  '.repeat(2 * i - 3) + '* '.repeat(n - i + 1).trimEnd() + '\n';
          }
        }
        return out.trimEnd();
      }
    }
  ];

  const filteredPatterns = patterns.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.number.toString() === searchQuery.trim();
    return matchesCat && matchesSearch;
  });

  const selectedPattern = patterns.find(p => p.id === selectedPatternId);

  const handleSelectPattern = (id, replace = false) => {
    setSelectedPatternId(id);
    const state = parseUrlState();
    updateBrowserUrl({ ...state, program: id }, replace);
  };

  const handleCopyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNextPattern = () => {
    if (!selectedPattern) return;
    const currentIndex = patterns.findIndex(p => p.id === selectedPattern.id);
    const nextIndex = (currentIndex + 1) % patterns.length;
    handleSelectPattern(patterns[nextIndex].id, true);
  };

  const handlePrevPattern = () => {
    if (!selectedPattern) return;
    const currentIndex = patterns.findIndex(p => p.id === selectedPattern.id);
    const prevIndex = (currentIndex - 1 + patterns.length) % patterns.length;
    handleSelectPattern(patterns[prevIndex].id, true);
  };

  // =========================================================================
  // VIEW 1: DEDICATED SOLUTION & INTERACTIVE PLAYGROUND PAGE
  // =========================================================================
  if (selectedPattern) {
    return (
      <div className="space-y-7 animate-in fade-in duration-300">
        
        {/* Top Navigation Action Bar */}
        <div className="glass-panel p-4 sm:p-5 rounded-3xl border border-slate-800/80 bg-gradient-to-r from-[#0F172A] via-[#0B1222] to-[#0A0F1E] flex flex-wrap items-center justify-between gap-4 shadow-xl">
          <button
            onClick={() => handleSelectPattern(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-blue-400 hover:text-white border border-blue-900/60 font-semibold text-xs sm:text-sm transition group shadow-md"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
            <span>← Back to Star Patterns (18)</span>
          </button>

          {/* Prev / Next Pattern Navigator */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPattern}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Previous Pattern"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-bold text-slate-400 px-2">
              Pattern {selectedPattern.number} / {patterns.length}
            </span>
            <button
              onClick={handleNextPattern}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Next Pattern"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Pattern Header Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0D1527] to-[#080E1A] shadow-xl space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-xl bg-blue-600/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
              Pattern {selectedPattern.number}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
              {selectedPattern.categoryLabel}
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-950/80 text-emerald-300 text-xs font-medium border border-emerald-800">
              {selectedPattern.difficulty}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {selectedPattern.title}
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
            {selectedPattern.summary}
          </p>

          <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-800/60 font-mono text-xs text-blue-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span><strong>Coordinate Invariant:</strong> {selectedPattern.formula}</span>
          </div>
        </div>

        {/* Interactive Live Size Modifier & Realtime ASCII Renderer */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800/80 bg-[#0A0F1D] shadow-xl space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/60 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Live Pattern Simulator (Change Grid Size n)</span>
            </div>
            <div className="flex items-center gap-3">
              <label className="text-xs font-mono text-slate-400">Size n = <span className="text-cyan-400 font-bold text-sm">{interactiveN}</span></label>
              <input
                type="range"
                min="2"
                max="9"
                value={interactiveN}
                onChange={(e) => setInteractiveN(Number(e.target.value))}
                className="w-32 accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#050811] border border-slate-800/90 font-mono text-sm sm:text-base text-amber-300 whitespace-pre leading-relaxed shadow-inner overflow-x-auto">
            {selectedPattern.renderPattern(interactiveN)}
          </div>
        </div>

        {/* Step-by-Step Interactive Loop Animator */}
        <PatternVisualStepper pattern={selectedPattern} />

        {/* Full Java Solution Code with IDE-Grade Syntax Highlighting */}
        <div className="space-y-3">
          <UltraModernCodeViewer 
            code={selectedPattern.code} 
            title={selectedPattern.codeTitle} 
            language="java" 
            badge="Java 21 Clean Code"
          />
        </div>

        {/* Detailed Theory & Loop Invariant Notes */}
        <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0B1222] to-[#070B14] shadow-xl space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-white">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span>Step-by-Step Logic Breakdown</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-cyan-400 font-mono uppercase">1. Row Control (Outer Loop)</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">{selectedPattern.rowLogic}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <span className="text-xs font-bold text-amber-400 font-mono uppercase">2. Column Control (Inner Loops)</span>
              <p className="text-xs text-slate-300 font-mono leading-relaxed">{selectedPattern.colLogic}</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {selectedPattern.explanationNotes.map((note, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/70 space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-blue-400">{note.heading}</h4>
                <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{note.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Runnable Web Playground */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Runnable Interactive Sandbox</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Runs directly in browser</span>
          </div>
          <UniversalCodePlayground initialCode={selectedPattern.code} />
        </div>

        {/* Bottom Back Button */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <button
            onClick={() => handleSelectPattern(null)}
            className="text-xs font-bold text-slate-400 hover:text-white transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Star Patterns List</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPattern}
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-800 transition flex items-center gap-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Prev Pattern</span>
            </button>
            <button
              onClick={handleNextPattern}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition flex items-center gap-1 shadow-md shadow-blue-600/30"
            >
              <span>Next Pattern</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2: ALL 18 STAR PATTERNS GRID VIEW (Matching User Screenshots)
  // =========================================================================
  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80 bg-gradient-to-b from-[#0F172A] via-[#0B1222] to-[#070B14] shadow-2xl space-y-6">
        
        <div className="text-center space-y-2 pb-4 border-b border-slate-800/60">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Star Pattern Programs (18)
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto">
            Comprehensive collection of 18 classic Java Star Pattern programs with visual 2D grids, coordinate logic, live size modifier, and step-by-step animations.
          </p>
        </div>

        {/* 3 Core Invariant Logic Pillars for Pattern Mastery */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 rounded-2xl bg-[#091122] border border-blue-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400 uppercase">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>1. Row Driver (i)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
              <code className="text-cyan-300 font-bold">i = 1 to n</code> (Top to bottom)<br />
              <code className="text-cyan-300 font-bold">i = n down to 1</code> (Inverted)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#08171C] border border-cyan-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>2. Leading Spaces (j)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
              <code className="text-emerald-300 font-bold">j = 1 to n - i</code> (Right alignment)<br />
              <code className="text-emerald-300 font-bold">j = 1 to i - 1</code> (Inverted pyramid)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#140D24] border border-purple-500/30 space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 uppercase">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>3. Star Generator (k)</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-mono">
              <code className="text-purple-300 font-bold">k = 1 to i</code> (Right triangle)<br />
              <code className="text-purple-300 font-bold">k = 1 to 2*i - 1</code> (Full pyramid)
            </p>
          </div>
        </div>

        {/* Master Animated 2D Grid Engine Theater */}
        <StarPatternMasterExplanationAnimator />

        {/* Section Header: Programs List */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">☀️</span>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Programs List (18)
            </h3>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-blue-950/80 text-blue-300 border border-blue-800 font-semibold">
              {filteredPatterns.length} {filteredPatterns.length === 1 ? 'Pattern' : 'Patterns'}
            </span>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pattern by name or number..."
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

        {/* Category Filter Pills */}
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

        {/* Exact Screenshot Card Grid Layout (3 Columns on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-3">
          {filteredPatterns.length === 0 ? (
            <div className="col-span-full p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 text-slate-400 text-sm">
              No patterns found matching "{searchQuery}". Try a different keyword.
            </div>
          ) : (
            filteredPatterns.map((pat) => {
              return (
                <div
                  key={pat.id}
                  onClick={() => handleSelectPattern(pat.id)}
                  className="group relative rounded-3xl overflow-hidden border border-slate-800/80 bg-[#0B1222]/90 hover:bg-[#0F182E] transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500/50 cursor-pointer flex flex-col justify-between"
                >
                  {/* Top Slate Header Matching Exact Screenshot (Pattern Number & Title) */}
                  <div className="p-4 bg-[#1E293B] text-center border-b border-slate-700/60 space-y-1">
                    <span className="text-[11px] font-mono font-extrabold text-blue-300 tracking-wide uppercase">
                      Pattern {pat.number}
                    </span>
                    <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1">
                      {pat.title}
                    </h4>
                  </div>

                  {/* Pattern Visual Preview Box */}
                  <div className="p-5 flex-1 flex items-center justify-center bg-[#070B14]/80">
                    <div className="w-full h-44 rounded-2xl p-4 bg-[#0A0F1D] border border-slate-800/80 flex items-center justify-center font-mono text-xs sm:text-sm text-amber-300/90 whitespace-pre overflow-hidden group-hover:text-amber-200 transition shadow-inner">
                      {pat.preview}
                    </div>
                  </div>

                  {/* Bottom "View Solution ➔" Button Matching Exact Screenshot */}
                  <div className="p-4 bg-[#0B1222] border-t border-slate-800/80 flex items-center justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPattern(pat.id);
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0070F3] hover:bg-[#0060DF] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition active:scale-95"
                    >
                      <span>View Solution</span>
                      <span className="w-4 h-4 rounded-full border border-white/60 flex items-center justify-center text-[10px] group-hover:translate-x-0.5 transition">
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
// SUB-COMPONENT: INTERACTIVE 2D PATTERN ANIMATION STEPPER & MEMORY VISUALIZER
// =============================================================================
function PatternVisualStepper({ pattern }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(600);

  // Generate dynamic 2D matrix frame sequence for any of the 18 patterns
  const frames = useMemo(() => {
    const n = 4; // Standard demo size
    const frameList = [];

    // Helper to generate full lines for this pattern at size n
    const fullText = pattern.renderPattern(n);
    const lines = fullText.split('\n');

    const totalRows = lines.length;
    // Calculate max column count across all lines
    let maxCols = 0;
    lines.forEach(l => {
      // Each star token is typically 2 chars in width ("* " or "*")
      const charWidth = l.length;
      if (charWidth > maxCols) maxCols = charWidth;
    });

    const grid = Array(totalRows).fill(null).map(() => Array(Math.max(maxCols, 1)).fill('empty'));

    frameList.push({
      i: 0, j: 0, k: 0,
      desc: `[Initialize] Preparing 2D grid matrix for ${pattern.title} (size n = ${n})`,
      grid: JSON.parse(JSON.stringify(grid)),
      stage: 'init'
    });

    // Step line by line and character by character
    lines.forEach((lineText, rIdx) => {
      frameList.push({
        i: rIdx + 1, j: 0, k: 0,
        desc: `[Row Engine] Outer loop begins Row ${rIdx + 1} of ${totalRows}`,
        grid: JSON.parse(JSON.stringify(grid)),
        stage: 'row'
      });

      let spacesCount = 0;
      let starsCount = 0;

      for (let cIdx = 0; cIdx < lineText.length; cIdx++) {
        const ch = lineText[cIdx];
        if (ch === '*') {
          grid[rIdx][cIdx] = 'star';
          starsCount++;
          frameList.push({
            i: rIdx + 1, j: spacesCount, k: starsCount,
            desc: `[Star Engine] Row ${rIdx + 1}, Col ${cIdx + 1}: Render star '*' (Stars in row: ${starsCount})`,
            grid: JSON.parse(JSON.stringify(grid)),
            stage: 'star'
          });
        } else if (ch === ' ') {
          grid[rIdx][cIdx] = 'space';
          spacesCount++;
          // Group consecutive spaces or capture meaningful spacing steps
          if (cIdx % 2 === 0 || cIdx === lineText.length - 1) {
            frameList.push({
              i: rIdx + 1, j: spacesCount, k: starsCount,
              desc: `[Space Engine] Row ${rIdx + 1}, Col ${cIdx + 1}: Render spacing offset`,
              grid: JSON.parse(JSON.stringify(grid)),
              stage: 'space'
            });
          }
        }
      }

      frameList.push({
        i: rIdx + 1, j: spacesCount, k: starsCount,
        desc: `[Line Feed] Row ${rIdx + 1} completed. System.out.println() shifts to row ${rIdx + 2}`,
        grid: JSON.parse(JSON.stringify(grid)),
        stage: 'newline'
      });
    });

    frameList.push({
      i: totalRows, j: 0, k: 0,
      desc: `[Complete] ${pattern.title} successfully constructed on the 2D grid matrix!`,
      grid: JSON.parse(JSON.stringify(grid)),
      stage: 'complete'
    });

    return frameList;
  }, [pattern]);

  useEffect(() => {
    setStepIndex(0);
    setIsPlaying(false);
  }, [pattern.id]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex(prev => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    }
    return () => clearInterval(timer);
  }, [isPlaying, frames.length, playbackSpeed]);

  const currentFrame = frames[stepIndex] || frames[0];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 bg-[#090F1E] shadow-2xl space-y-5">
      
      {/* Header with Title & Playback Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Zap className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">Step-by-Step 2D Animated Grid Simulation</h4>
            <p className="text-[11px] text-slate-400">Watch the CPU execute row and column loops cell-by-cell in real time</p>
          </div>
        </div>

        {/* Stepper Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (stepIndex >= frames.length - 1) setStepIndex(0);
              setIsPlaying(!isPlaying);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-blue-600/30 transition active:scale-95"
          >
            <Play className={`w-3.5 h-3.5 ${isPlaying ? 'fill-current' : ''}`} />
            <span>{isPlaying ? 'Pause' : 'Play Simulation'}</span>
          </button>

          <button
            onClick={() => { setStepIndex(0); setIsPlaying(false); }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs transition"
            title="Reset to beginning"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            disabled={stepIndex === 0}
            onClick={() => { setIsPlaying(false); setStepIndex(Math.max(0, stepIndex - 1)); }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white border border-slate-700 text-xs transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            disabled={stepIndex === frames.length - 1}
            onClick={() => { setIsPlaying(false); setStepIndex(Math.min(frames.length - 1, stepIndex + 1)); }}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300 hover:text-white border border-slate-700 text-xs transition"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid: Left Loop Registers + Right 2D Interactive Matrix Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* Left Registers & Narrative (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              Active Loop Registers:
            </span>
            <div className="grid grid-cols-3 gap-2 text-center font-mono">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Row i</span>
                <span className="text-base font-extrabold text-cyan-300">{currentFrame.i || '-'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Space j</span>
                <span className="text-base font-extrabold text-emerald-300">{currentFrame.j || 0}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Star k</span>
                <span className="text-base font-extrabold text-amber-300">{currentFrame.k || 0}</span>
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-800/40 font-mono text-xs text-cyan-200 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span className="leading-relaxed">{currentFrame.desc}</span>
          </div>
        </div>

        {/* Right 2D Animated Cell Matrix Canvas (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#040711] border border-slate-800 min-h-[220px] flex flex-col items-center justify-center shadow-inner overflow-x-auto">
          <div className="space-y-1.5 select-none font-mono">
            {currentFrame.grid.map((row, rIdx) => {
              const isCurrentRow = (currentFrame.i - 1 === rIdx);
              return (
                <div 
                  key={rIdx} 
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all duration-200 ${
                    isCurrentRow ? 'bg-cyan-500/10 border border-cyan-500/30' : 'opacity-80'
                  }`}
                >
                  <span className="w-12 text-[10px] text-slate-600 font-mono font-bold text-right pr-1">
                    R{rIdx + 1}:
                  </span>
                  <div className="flex items-center gap-1">
                    {row.map((cell, cIdx) => (
                      <span
                        key={cIdx}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-md flex items-center justify-center text-xs sm:text-sm font-extrabold transition-all duration-200 ${
                          cell === 'star'
                            ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-md shadow-amber-500/40 scale-100'
                            : cell === 'space'
                            ? 'bg-slate-900 border border-cyan-900/60 text-cyan-500/40 text-[9px]'
                            : 'bg-slate-950 border border-slate-900 text-transparent'
                        }`}
                      >
                        {cell === 'star' ? '★' : cell === 'space' ? '·' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full flex items-center justify-center gap-5 text-[10px] font-mono pt-4 mt-3 border-t border-slate-800/60 text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" /> Star (*)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-slate-900 border border-cyan-800 inline-block" /> Space ( )
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-slate-950 border border-slate-800 inline-block" /> Pending
            </span>
          </div>
        </div>
      </div>

      {/* Stepper Progress Control Slider & Speed */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
        <div className="flex-1 flex items-center gap-3">
          <input
            type="range"
            min="0"
            max={frames.length - 1}
            value={stepIndex}
            onChange={(e) => {
              setIsPlaying(false);
              setStepIndex(Number(e.target.value));
            }}
            className="flex-1 accent-blue-500 cursor-pointer"
          />
          <span className="text-xs font-mono text-cyan-300 font-bold shrink-0">
            Step {stepIndex + 1} / {frames.length}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs font-mono text-slate-400">
          <span>Speed:</span>
          {[
            { label: '1x', val: 600 },
            { label: '2x', val: 300 },
            { label: '3x', val: 150 }
          ].map(s => (
            <button
              key={s.label}
              onClick={() => setPlaybackSpeed(s.val)}
              className={`px-2 py-0.5 rounded-lg text-[11px] font-bold transition ${
                playbackSpeed === s.val
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 text-slate-500 hover:text-slate-300'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
