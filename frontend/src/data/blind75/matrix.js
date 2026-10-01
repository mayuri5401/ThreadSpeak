export default [
  {
    "id": "set-matrix-zeroes",
    "category": "Matrix",
    "categoryId": "matrix",
    "title": "Set Matrix Zeroes",
    "leetcodeNumber": 73,
    "difficulty": "Medium",
    "companies": ["Amazon", "Microsoft", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/set-matrix-zeroes/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/set-matrix-zero/",
    "youtubeUrl": "https://www.youtube.com/watch?v=N0MgLvLSFMM",
    "description": "Given an `m x n` integer matrix, if an element is 0, set its entire row and column to 0's in-place with O(1) extra space.",
    "examples": [{ "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]", "output": "[[1,0,1],[0,0,0],[1,0,1]]", "explanation": "Row 1 and Column 1 set to 0." }],
    "constraints": ["m == matrix.length", "n == matrix[0].length", "1 <= m, n <= 200"],
    "starterCode": {
      "java": "public class Solution {\n    public static void setZeroes(int[][] matrix) {\n        int col0 = 1, rows = matrix.length, cols = matrix[0].length;\n        for (int i = 0; i < rows; i++) {\n            if (matrix[i][0] == 0) col0 = 0;\n            for (int j = 1; j < cols; j++) if (matrix[i][j] == 0) matrix[i][0] = matrix[0][j] = 0;\n        }\n        for (int i = rows - 1; i >= 0; i--) {\n            for (int j = cols - 1; j >= 1; j--) if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;\n            if (col0 == 0) matrix[i][0] = 0;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Set Matrix Zeroes ready\");\n    }\n}",
      "cpp": "void setZeroes(vector<vector<int>>& matrix) {\n    int col0 = 1, rows = matrix.size(), cols = matrix[0].size();\n    for (int i = 0; i < rows; i++) {\n        if (matrix[i][0] == 0) col0 = 0;\n        for (int j = 1; j < cols; j++) if (matrix[i][j] == 0) matrix[i][0] = matrix[0][j] = 0;\n    }\n    for (int i = rows - 1; i >= 0; i--) {\n        for (int j = cols - 1; j >= 1; j--) if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;\n        if (col0 == 0) matrix[i][0] = 0;\n    }\n}",
      "python": "def setZeroes(matrix: list[list[int]]) -> None:\n    col0 = 1; rows, cols = len(matrix), len(matrix[0])\n    for i in range(rows):\n        if matrix[i][0] == 0: col0 = 0\n        for j in range(1, cols):\n            if matrix[i][j] == 0: matrix[i][0] = matrix[0][j] = 0\n    for i in range(rows - 1, -1, -1):\n        for j in range(cols - 1, 0, -1):\n            if matrix[i][0] == 0 or matrix[0][j] == 0: matrix[i][j] = 0\n        if col0 == 0: matrix[i][0] = 0",
      "javascript": "function setZeroes(matrix) {\n    let col0 = 1; const rows = matrix.length, cols = matrix[0].length;\n    for (let i = 0; i < rows; i++) {\n        if (matrix[i][0] === 0) col0 = 0;\n        for (let j = 1; j < cols; j++) if (matrix[i][j] === 0) matrix[i][0] = matrix[0][j] = 0;\n    }\n    for (let i = rows - 1; i >= 0; i--) {\n        for (let j = cols - 1; j >= 1; j--) if (matrix[i][0] === 0 || matrix[0][j] === 0) matrix[i][j] = 0;\n        if (col0 === 0) matrix[i][0] = 0;\n    }\n}"
    },
    "testCases": [{ "input": "matrix = [[1,1,1],[1,0,1],[1,1,1]]", "expectedOutput": "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]" }]
  },
  {
    "id": "spiral-matrix",
    "category": "Matrix",
    "categoryId": "matrix",
    "title": "Spiral Matrix",
    "leetcodeNumber": 54,
    "difficulty": "Medium",
    "companies": ["Microsoft", "Google", "Amazon"],
    "leetcodeUrl": "https://leetcode.com/problems/spiral-matrix/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/spiral-traversal-of-matrix/",
    "youtubeUrl": "https://www.youtube.com/watch?v=3Zv-s9UUrFM",
    "description": "Given an `m x n` matrix, return all elements of the matrix in spiral order.",
    "examples": [{ "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]", "output": "[1,2,3,6,9,8,7,4,5]", "explanation": "Spiral traversal." }],
    "constraints": ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        if (matrix.length == 0) return res;\n        int r1 = 0, r2 = matrix.length - 1, c1 = 0, c2 = matrix[0].length - 1;\n        while (r1 <= r2 && c1 <= c2) {\n            for (int c = c1; c <= c2; c++) res.add(matrix[r1][c]);\n            for (int r = r1 + 1; r <= r2; r++) res.add(matrix[r][c2]);\n            if (r1 < r2 && c1 < c2) {\n                for (int c = c2 - 1; c > c1; c--) res.add(matrix[r2][c]);\n                for (int r = r2; r > r1; r--) res.add(matrix[r][c1]);\n            }\n            r1++; r2--; c1++; c2--;\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(spiralOrder(new int[][]{{1,2,3},{4,5,6},{7,8,9}}));\n    }\n}",
      "cpp": "vector<int> spiralOrder(vector<vector<int>>& matrix) {\n    vector<int> res;\n    if (matrix.empty()) return res;\n    int r1 = 0, r2 = matrix.size() - 1, c1 = 0, c2 = matrix[0].size() - 1;\n    while (r1 <= r2 && c1 <= c2) {\n        for (int c = c1; c <= c2; c++) res.push_back(matrix[r1][c]);\n        for (int r = r1 + 1; r <= r2; r++) res.push_back(matrix[r][c2]);\n        if (r1 < r2 && c1 < c2) {\n            for (int c = c2 - 1; c > c1; c--) res.push_back(matrix[r2][c]);\n            for (int r = r2; r > r1; r--) res.push_back(matrix[r][c1]);\n        }\n        r1++; r2--; c1++; c2--;\n    }\n    return res;\n}",
      "python": "def spiralOrder(matrix: list[list[int]]) -> list[int]:\n    res = []\n    if not matrix: return res\n    r1, r2, c1, c2 = 0, len(matrix) - 1, 0, len(matrix[0]) - 1\n    while r1 <= r2 and c1 <= c2:\n        for c in range(c1, c2 + 1): res.append(matrix[r1][c])\n        for r in range(r1 + 1, r2 + 1): res.append(matrix[r][c2])\n        if r1 < r2 and c1 < c2:\n            for c in range(c2 - 1, c1, -1): res.append(matrix[r2][c])\n            for r in range(r2, r1, -1): res.append(matrix[r][c1])\n        r1 += 1; r2 -= 1; c1 += 1; c2 -= 1\n    return res",
      "javascript": "function spiralOrder(matrix) {\n    const res = [];\n    if (!matrix.length) return res;\n    let r1 = 0, r2 = matrix.length - 1, c1 = 0, c2 = matrix[0].length - 1;\n    while (r1 <= r2 && c1 <= c2) {\n        for (let c = c1; c <= c2; c++) res.push(matrix[r1][c]);\n        for (let r = r1 + 1; r <= r2; r++) res.push(matrix[r][c2]);\n        if (r1 < r2 && c1 < c2) {\n            for (let c = c2 - 1; c > c1; c--) res.push(matrix[r2][c]);\n            for (let r = r2; r > r1; r--) res.push(matrix[r][c1]);\n        }\n        r1++; r2--; c1++; c2--;\n    }\n    return res;\n}"
    },
    "testCases": [{ "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]", "expectedOutput": "[1, 2, 3, 6, 9, 8, 7, 4, 5]" }]
  },
  {
    "id": "rotate-image",
    "category": "Matrix",
    "categoryId": "matrix",
    "title": "Rotate Image (90 Degrees Clockwise In-Place)",
    "leetcodeNumber": 48,
    "difficulty": "Medium",
    "companies": ["Amazon", "Microsoft", "Apple"],
    "leetcodeUrl": "https://leetcode.com/problems/rotate-image/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/rotate-image-by-90-degree/",
    "youtubeUrl": "https://www.youtube.com/watch?v=Y72QeU01t24",
    "description": "Rotate the `n x n` 2D matrix by 90 degrees (clockwise) in-place.",
    "examples": [{ "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]", "output": "[[7,4,1],[8,5,2],[9,6,3]]", "explanation": "90 degree clockwise rotation." }],
    "constraints": ["n == matrix.length == matrix[i].length", "1 <= n <= 20"],
    "starterCode": {
      "java": "public class Solution {\n    public static void rotate(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int tmp = matrix[i][j]; matrix[i][j] = matrix[j][i]; matrix[j][i] = tmp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n / 2; j++) {\n                int tmp = matrix[i][j]; matrix[i][j] = matrix[i][n - 1 - j]; matrix[i][n - 1 - j] = tmp;\n            }\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Rotate Image ready\");\n    }\n}",
      "cpp": "void rotate(vector<vector<int>>& matrix) {\n    int n = matrix.size();\n    for (int i = 0; i < n; i++) for (int j = i + 1; j < n; j++) swap(matrix[i][j], matrix[j][i]);\n    for (int i = 0; i < n; i++) reverse(matrix[i].begin(), matrix[i].end());\n}",
      "python": "def rotate(matrix: list[list[int]]) -> None:\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n): matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for i in range(n): matrix[i].reverse()",
      "javascript": "function rotate(matrix) {\n    const n = matrix.length;\n    for (let i = 0; i < n; i++) {\n        for (let j = i + 1; j < n; j++) {\n            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n        }\n    }\n    for (let i = 0; i < n; i++) matrix[i].reverse();\n}"
    },
    "testCases": [{ "input": "matrix = [[1,2,3],[4,5,6],[7,8,9]]", "expectedOutput": "[[7, 4, 1], [8, 5, 2], [9, 6, 3]]" }]
  },
  {
    "id": "word-search",
    "category": "Matrix",
    "categoryId": "matrix",
    "title": "Word Search (Backtracking on Grid)",
    "leetcodeNumber": 79,
    "difficulty": "Medium",
    "companies": ["Amazon", "Microsoft", "Bloomberg"],
    "leetcodeUrl": "https://leetcode.com/problems/word-search/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/word-search-leetcode/",
    "youtubeUrl": "https://www.youtube.com/watch?v=m9TrOL1ETxI",
    "description": "Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid.",
    "examples": [{ "input": "board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word = 'ABCCED'", "output": "true", "explanation": "Word ABCCED found." }],
    "constraints": ["m == board.length", "n = board[i].length", "1 <= m, n <= 6", "1 <= word.length <= 15"],
    "starterCode": {
      "java": "public class Solution {\n    public static boolean exist(char[][] board, String word) {\n        for (int i = 0; i < board.length; i++) {\n            for (int j = 0; j < board[0].length; j++) if (dfs(board, word, i, j, 0)) return true;\n        }\n        return false;\n    }\n    private static boolean dfs(char[][] b, String w, int r, int c, int idx) {\n        if (idx == w.length()) return true;\n        if (r < 0 || c < 0 || r >= b.length || c >= b[0].length || b[r][c] != w.charAt(idx)) return false;\n        char tmp = b[r][c]; b[r][c] = '#';\n        boolean found = dfs(b, w, r + 1, c, idx + 1) || dfs(b, w, r - 1, c, idx + 1) ||\n                        dfs(b, w, r, c + 1, idx + 1) || dfs(b, w, r, c - 1, idx + 1);\n        b[r][c] = tmp;\n        return found;\n    }\n    public static void main(String[] args) {\n        System.out.println(exist(new char[][]{{'A','B'},{'C','D'}}, \"AB\"));\n    }\n}",
      "cpp": "bool dfs(vector<vector<char>>& b, string& w, int r, int c, int idx) {\n    if (idx == w.size()) return true;\n    if (r < 0 || c < 0 || r >= b.size() || c >= b[0].size() || b[r][c] != w[idx]) return false;\n    char tmp = b[r][c]; b[r][c] = '#';\n    bool found = dfs(b, w, r+1, c, idx+1) || dfs(b, w, r-1, c, idx+1) || dfs(b, w, r, c+1, idx+1) || dfs(b, w, r, c-1, idx+1);\n    b[r][c] = tmp;\n    return found;\n}\nbool exist(vector<vector<char>>& board, string word) {\n    for (int i = 0; i < board.size(); i++) for (int j = 0; j < board[0].size(); j++) if (dfs(board, word, i, j, 0)) return true;\n    return false;\n}",
      "python": "def exist(board: list[list[str]], word: str) -> bool:\n    m, n = len(board), len(board[0])\n    def dfs(r, c, idx):\n        if idx == len(word): return True\n        if r < 0 or c < 0 or r >= m or c >= n or board[r][c] != word[idx]: return False\n        tmp = board[r][c]; board[r][c] = '#'\n        found = dfs(r+1, c, idx+1) or dfs(r-1, c, idx+1) or dfs(r, c+1, idx+1) or dfs(r, c-1, idx+1)\n        board[r][c] = tmp\n        return found\n    for i in range(m):\n        for j in range(n):\n            if dfs(i, j, 0): return True\n    return False",
      "javascript": "function exist(board, word) {\n    const m = board.length, n = board[0].length;\n    function dfs(r, c, idx) {\n        if (idx === word.length) return true;\n        if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[idx]) return false;\n        const tmp = board[r][c]; board[r][c] = '#';\n        const found = dfs(r + 1, c, idx + 1) || dfs(r - 1, c, idx + 1) || dfs(r, c + 1, idx + 1) || dfs(r, c - 1, idx + 1);\n        board[r][c] = tmp;\n        return found;\n    }\n    for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (dfs(i, j, 0)) return true;\n    return false;\n}"
    },
    "testCases": [{ "input": "board = [['A','B'],['C','D']], word = 'AB'", "expectedOutput": "true" }]
  }
]
;
