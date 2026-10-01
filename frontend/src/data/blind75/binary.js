export default [
  {
    "id": "sum-of-two-integers",
    "category": "Binary & Bit Manipulation",
    "categoryId": "binary",
    "title": "Sum of Two Integers",
    "leetcodeNumber": 371,
    "difficulty": "Medium",
    "companies": ["Facebook", "Amazon", "Apple"],
    "leetcodeUrl": "https://leetcode.com/problems/sum-of-two-integers/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/sum-of-two-integers/",
    "youtubeUrl": "https://www.youtube.com/watch?v=gVUrDV4tZfY",
    "description": "Given two integers `a` and `b`, return the sum of the two integers without using the operators `+` and `-`.",
    "examples": [{ "input": "a = 1, b = 2", "output": "3", "explanation": "1 + 2 = 3" }],
    "constraints": ["-1000 <= a, b <= 1000"],
    "starterCode": {
      "java": "public class Solution {\n    public static int getSum(int a, int b) {\n        while (b != 0) {\n            int carry = (a & b) << 1;\n            a = a ^ b;\n            b = carry;\n        }\n        return a;\n    }\n    public static void main(String[] args) {\n        System.out.println(getSum(1, 2));\n    }\n}",
      "cpp": "int getSum(int a, int b) {\n    while (b != 0) {\n        unsigned int carry = (unsigned int)(a & b) << 1;\n        a = a ^ b;\n        b = carry;\n    }\n    return a;\n}",
      "python": "def getSum(a: int, b: int) -> int:\n    mask = 0xffffffff\n    while b & mask != 0:\n        carry = (a & b) << 1\n        a = a ^ b\n        b = carry\n    return (a & mask) if b > 0 else a",
      "javascript": "function getSum(a, b) {\n    while (b !== 0) {\n        const carry = (a & b) << 1;\n        a = a ^ b;\n        b = carry;\n    }\n    return a;\n}"
    },
    "testCases": [{ "input": "a = 1, b = 2", "expectedOutput": "3" }]
  },
  {
    "id": "number-of-1-bits",
    "category": "Binary & Bit Manipulation",
    "categoryId": "binary",
    "title": "Number of 1 Bits (Hamming Weight)",
    "leetcodeNumber": 191,
    "difficulty": "Easy",
    "companies": ["Microsoft", "Apple", "Google"],
    "leetcodeUrl": "https://leetcode.com/problems/number-of-1-bits/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/count-set-bits-in-an-integer/",
    "youtubeUrl": "https://www.youtube.com/watch?v=5Km3utixwZs",
    "description": "Write a function that takes the binary representation of a positive integer and returns the number of set bits it has.",
    "examples": [{ "input": "n = 11 (binary 1011)", "output": "3", "explanation": "3 set bits." }],
    "constraints": ["1 <= n <= 2^31 - 1"],
    "starterCode": {
      "java": "public class Solution {\n    public static int hammingWeight(int n) {\n        int count = 0;\n        while (n != 0) { n &= (n - 1); count++; }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(hammingWeight(11));\n    }\n}",
      "cpp": "int hammingWeight(uint32_t n) {\n    int count = 0;\n    while (n) { n &= (n - 1); count++; }\n    return count;\n}",
      "python": "def hammingWeight(n: int) -> int:\n    count = 0\n    while n:\n        n &= (n - 1)\n        count += 1\n    return count",
      "javascript": "function hammingWeight(n) {\n    let count = 0;\n    while (n !== 0) { n &= (n - 1); count++; }\n    return count;\n}"
    },
    "testCases": [{ "input": "n = 11", "expectedOutput": "3" }]
  },
  {
    "id": "counting-bits",
    "category": "Binary & Bit Manipulation",
    "categoryId": "binary",
    "title": "Counting Bits",
    "leetcodeNumber": 338,
    "difficulty": "Easy",
    "companies": ["Amazon", "Google", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/counting-bits/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/counting-bits/",
    "youtubeUrl": "https://www.youtube.com/watch?v=RyBM56P7Mr0",
    "description": "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (0 <= i <= n), `ans[i]` is the number of 1's in the binary representation of `i`.",
    "examples": [{ "input": "n = 5", "output": "[0,1,1,2,1,2]", "explanation": "0:0, 1:1, 2:1, 3:2, 4:1, 5:2" }],
    "constraints": ["0 <= n <= 10^5"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int[] countBits(int n) {\n        int[] ans = new int[n + 1];\n        for (int i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);\n        return ans;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(countBits(5)));\n    }\n}",
      "cpp": "vector<int> countBits(int n) {\n    vector<int> ans(n + 1, 0);\n    for (int i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);\n    return ans;\n}",
      "python": "def countBits(n: int) -> list[int]:\n    ans = [0] * (n + 1)\n    for i in range(1, n + 1): ans[i] = ans[i >> 1] + (i & 1)\n    return ans",
      "javascript": "function countBits(n) {\n    const ans = new Array(n + 1).fill(0);\n    for (let i = 1; i <= n; i++) ans[i] = ans[i >> 1] + (i & 1);\n    return ans;\n}"
    },
    "testCases": [{ "input": "n = 5", "expectedOutput": "[0, 1, 1, 2, 1, 2]" }]
  },
  {
    "id": "missing-number",
    "category": "Binary & Bit Manipulation",
    "categoryId": "binary",
    "title": "Missing Number",
    "leetcodeNumber": 268,
    "difficulty": "Easy",
    "companies": ["Amazon", "Microsoft", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/missing-number/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/find-the-missing-number-in-an-array/",
    "youtubeUrl": "https://www.youtube.com/watch?v=bYWLJb3vCWY",
    "description": "Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.",
    "examples": [{ "input": "nums = [3,0,1]", "output": "2", "explanation": "2 is missing." }],
    "constraints": ["n == nums.length", "1 <= n <= 10^4", "0 <= nums[i] <= n"],
    "starterCode": {
      "java": "public class Solution {\n    public static int missingNumber(int[] nums) {\n        int xor = nums.length;\n        for (int i = 0; i < nums.length; i++) xor ^= i ^ nums[i];\n        return xor;\n    }\n    public static void main(String[] args) {\n        System.out.println(missingNumber(new int[]{3,0,1}));\n    }\n}",
      "cpp": "int missingNumber(vector<int>& nums) {\n    int xorVal = nums.size();\n    for (int i = 0; i < nums.size(); i++) xorVal ^= i ^ nums[i];\n    return xorVal;\n}",
      "python": "def missingNumber(nums: list[int]) -> int:\n    res = len(nums)\n    for i, num in enumerate(nums): res ^= i ^ num\n    return res",
      "javascript": "function missingNumber(nums) {\n    let xor = nums.length;\n    for (let i = 0; i < nums.length; i++) xor ^= i ^ nums[i];\n    return xor;\n}"
    },
    "testCases": [{ "input": "nums = [3,0,1]", "expectedOutput": "2" }]
  },
  {
    "id": "reverse-bits",
    "category": "Binary & Bit Manipulation",
    "categoryId": "binary",
    "title": "Reverse Bits",
    "leetcodeNumber": 190,
    "difficulty": "Easy",
    "companies": ["Apple", "Airbnb", "Google"],
    "leetcodeUrl": "https://leetcode.com/problems/reverse-bits/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/reverse-bits/",
    "youtubeUrl": "https://www.youtube.com/watch?v=UcoN6UjAI64",
    "description": "Reverse bits of a given 32 bits unsigned integer.",
    "examples": [{ "input": "n = 43261596", "output": "964176192", "explanation": "Reversed bits." }],
    "constraints": ["The input must be a binary string of length 32"],
    "starterCode": {
      "java": "public class Solution {\n    public static int reverseBits(int n) {\n        int res = 0;\n        for (int i = 0; i < 32; i++) {\n            res = (res << 1) | (n & 1);\n            n >>= 1;\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(reverseBits(43261596));\n    }\n}",
      "cpp": "uint32_t reverseBits(uint32_t n) {\n    uint32_t res = 0;\n    for (int i = 0; i < 32; i++) {\n        res = (res << 1) | (n & 1);\n        n >>= 1;\n    }\n    return res;\n}",
      "python": "def reverseBits(n: int) -> int:\n    res = 0\n    for i in range(32):\n        res = (res << 1) | (n & 1)\n        n >>= 1\n    return res",
      "javascript": "function reverseBits(n) {\n    let res = 0;\n    for (let i = 0; i < 32; i++) {\n        res = (res << 1) | (n & 1);\n        n >>>= 1;\n    }\n    return res >>> 0;\n}"
    },
    "testCases": [{ "input": "n = 43261596", "expectedOutput": "964176192" }]
  }
]
;
