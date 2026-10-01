export default [
  {
    "id": "two-sum",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "Two Sum",
    "leetcodeNumber": 1,
    "difficulty": "Easy",
    "companies": ["Google", "Amazon", "Apple", "Meta", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/two-sum/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-array/",
    "youtubeUrl": "https://www.youtube.com/watch?v=UXDSeD9mN-k",
    "description": "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    "examples": [
      { "input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "nums[0] + nums[1] == 9" },
      { "input": "nums = [3,2,4], target = 6", "output": "[1,2]", "explanation": "nums[1] + nums[2] == 6" }
    ],
    "constraints": ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9"],
    "starterCode": {
      "java": "import java.util.*;\n\npublic class Solution {\n    public static int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[]{map.get(diff), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(twoSum(new int[]{2,7,11,15}, 9)));\n    }\n}",
      "cpp": "vector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> map;\n    for (int i = 0; i < nums.size(); i++) {\n        int diff = target - nums[i];\n        if (map.count(diff)) return {map[diff], i};\n        map[nums[i]] = i;\n    }\n    return {};\n}",
      "python": "def twoSum(nums: list[int], target: int) -> list[int]:\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen: return [seen[target - n], i]\n        seen[n] = i\n    return []",
      "javascript": "function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const diff = target - nums[i];\n        if (map.has(diff)) return [map.get(diff), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}"
    },
    "testCases": [
      { "input": "nums = [2,7,11,15], target = 9", "expectedOutput": "[0, 1]" },
      { "input": "nums = [3,2,4], target = 6", "expectedOutput": "[1, 2]" }
    ]
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "Best Time to Buy and Sell Stock",
    "leetcodeNumber": 121,
    "difficulty": "Easy",
    "companies": ["Amazon", "Microsoft", "Meta", "Google"],
    "leetcodeUrl": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/stock-buy-and-sell/",
    "youtubeUrl": "https://www.youtube.com/watch?v=excAOvwF_Wk",
    "description": "You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
    "examples": [
      { "input": "prices = [7,1,5,3,6,4]", "output": "5", "explanation": "Buy on day 2 (1) and sell on day 5 (6), profit = 5." }
    ],
    "constraints": ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    "starterCode": {
      "java": "public class Solution {\n    public static int maxProfit(int[] prices) {\n        int min = Integer.MAX_VALUE, max = 0;\n        for (int p : prices) {\n            min = Math.min(min, p);\n            max = Math.max(max, p - min);\n        }\n        return max;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxProfit(new int[]{7,1,5,3,6,4}));\n    }\n}",
      "cpp": "int maxProfit(vector<int>& prices) {\n    int minP = 1e9, maxP = 0;\n    for (int p : prices) { minP = min(minP, p); maxP = max(maxP, p - minP); }\n    return maxP;\n}",
      "python": "def maxProfit(prices: list[int]) -> int:\n    min_p, max_p = float('inf'), 0\n    for p in prices: min_p = min(min_p, p); max_p = max(max_p, p - min_p)\n    return max_p",
      "javascript": "function maxProfit(prices) {\n    let min = Infinity, max = 0;\n    for (const p of prices) { min = Math.min(min, p); max = Math.max(max, p - min); }\n    return max;\n}"
    },
    "testCases": [
      { "input": "prices = [7,1,5,3,6,4]", "expectedOutput": "5" }
    ]
  },
  {
    "id": "contains-duplicate",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "Contains Duplicate",
    "leetcodeNumber": 217,
    "difficulty": "Easy",
    "companies": ["Apple", "Amazon", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/contains-duplicate/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/contains-duplicate-check-if-a-value-appears-atleast-twice/",
    "youtubeUrl": "https://www.youtube.com/watch?v=3OamzN90kPg",
    "description": "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.",
    "examples": [
      { "input": "nums = [1,2,3,1]", "output": "true", "explanation": "1 appears twice." }
    ],
    "constraints": ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static boolean containsDuplicate(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) if (!set.add(n)) return true;\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(containsDuplicate(new int[]{1,2,3,1}));\n    }\n}",
      "cpp": "bool containsDuplicate(vector<int>& nums) {\n    unordered_set<int> s;\n    for (int n : nums) if (!s.insert(n).second) return true;\n    return false;\n}",
      "python": "def containsDuplicate(nums: list[int]) -> bool:\n    return len(nums) != len(set(nums))",
      "javascript": "function containsDuplicate(nums) {\n    return new Set(nums).size !== nums.length;\n}"
    },
    "testCases": [
      { "input": "nums = [1,2,3,1]", "expectedOutput": "true" }
    ]
  },
  {
    "id": "product-of-array-except-self",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "Product of Array Except Self",
    "leetcodeNumber": 238,
    "difficulty": "Medium",
    "companies": ["Amazon", "Apple", "Facebook", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/product-of-array-except-self/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/product-of-array-except-self/",
    "youtubeUrl": "https://www.youtube.com/watch?v=bNvIQI2wAjk",
    "description": "Return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]` without division in O(n).",
    "examples": [
      { "input": "nums = [1,2,3,4]", "output": "[24,12,8,6]", "explanation": "Product at index 0 is 2*3*4=24." }
    ],
    "constraints": ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int[] productExceptSelf(int[] nums) {\n        int n = nums.length; int[] res = new int[n]; res[0] = 1;\n        for (int i = 1; i < n; i++) res[i] = res[i-1] * nums[i-1];\n        int r = 1;\n        for (int i = n - 1; i >= 0; i--) { res[i] *= r; r *= nums[i]; }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(productExceptSelf(new int[]{1,2,3,4})));\n    }\n}",
      "cpp": "vector<int> productExceptSelf(vector<int>& nums) {\n    int n = nums.size(); vector<int> res(n, 1);\n    for (int i = 1; i < n; i++) res[i] = res[i-1] * nums[i-1];\n    int r = 1;\n    for (int i = n-1; i >= 0; i--) { res[i] *= r; r *= nums[i]; }\n    return res;\n}",
      "python": "def productExceptSelf(nums: list[int]) -> list[int]:\n    n = len(nums); res = [1] * n\n    for i in range(1, n): res[i] = res[i-1] * nums[i-1]\n    r = 1\n    for i in range(n-1, -1, -1): res[i] *= r; r *= nums[i]\n    return res",
      "javascript": "function productExceptSelf(nums) {\n    const n = nums.length, res = new Array(n).fill(1);\n    for (let i = 1; i < n; i++) res[i] = res[i-1] * nums[i-1];\n    let r = 1;\n    for (let i = n - 1; i >= 0; i--) { res[i] *= r; r *= nums[i]; }\n    return res;\n}"
    },
    "testCases": [
      { "input": "nums = [1,2,3,4]", "expectedOutput": "[24, 12, 8, 6]" }
    ]
  },
  {
    "id": "maximum-subarray",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "Maximum Subarray (Kadane's Algorithm)",
    "leetcodeNumber": 53,
    "difficulty": "Medium",
    "companies": ["Amazon", "Microsoft", "LinkedIn", "Apple"],
    "leetcodeUrl": "https://leetcode.com/problems/maximum-subarray/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/",
    "youtubeUrl": "https://www.youtube.com/watch?v=AHZpyENo7k4",
    "description": "Given an integer array `nums`, find the subarray with the largest sum, and return its sum.",
    "examples": [
      { "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]", "output": "6", "explanation": "Subarray [4,-1,2,1] has max sum 6." }
    ],
    "constraints": ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    "starterCode": {
      "java": "public class Solution {\n    public static int maxSubArray(int[] nums) {\n        int max = nums[0], sum = 0;\n        for (int n : nums) {\n            sum += n;\n            max = Math.max(max, sum);\n            if (sum < 0) sum = 0;\n        }\n        return max;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxSubArray(new int[]{-2,1,-3,4,-1,2,1,-5,4}));\n    }\n}",
      "cpp": "int maxSubArray(vector<int>& nums) {\n    int maxS = nums[0], sum = 0;\n    for (int n : nums) { sum += n; maxS = max(maxS, sum); if (sum < 0) sum = 0; }\n    return maxS;\n}",
      "python": "def maxSubArray(nums: list[int]) -> int:\n    max_s, curr = nums[0], 0\n    for n in nums: curr = max(n, curr + n); max_s = max(max_s, curr)\n    return max_s",
      "javascript": "function maxSubArray(nums) {\n    let max = nums[0], sum = 0;\n    for (const n of nums) { sum += n; max = Math.max(max, sum); if (sum < 0) sum = 0; }\n    return max;\n}"
    },
    "testCases": [
      { "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]", "expectedOutput": "6" }
    ]
  },
  {
    "id": "maximum-product-subarray",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "Maximum Product Subarray",
    "leetcodeNumber": 152,
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "LinkedIn"],
    "leetcodeUrl": "https://leetcode.com/problems/maximum-product-subarray/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/maximum-product-subarray-in-an-array/",
    "youtubeUrl": "https://www.youtube.com/watch?v=hnswaLJvr6g",
    "description": "Given an integer array `nums`, find a subarray that has the largest product, and return the product.",
    "examples": [
      { "input": "nums = [2,3,-2,4]", "output": "6", "explanation": "[2,3] gives 6." }
    ],
    "constraints": ["1 <= nums.length <= 2 * 10^4", "-10 <= nums[i] <= 10"],
    "starterCode": {
      "java": "public class Solution {\n    public static int maxProduct(int[] nums) {\n        int max = nums[0], min = nums[0], res = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            if (nums[i] < 0) { int t = max; max = min; min = t; }\n            max = Math.max(nums[i], max * nums[i]);\n            min = Math.min(nums[i], min * nums[i]);\n            res = Math.max(res, max);\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxProduct(new int[]{2,3,-2,4}));\n    }\n}",
      "cpp": "int maxProduct(vector<int>& nums) {\n    int maxP = nums[0], minP = nums[0], res = nums[0];\n    for (int i = 1; i < nums.size(); i++) {\n        if (nums[i] < 0) swap(maxP, minP);\n        maxP = max(nums[i], maxP * nums[i]); minP = min(nums[i], minP * nums[i]);\n        res = max(res, maxP);\n    }\n    return res;\n}",
      "python": "def maxProduct(nums: list[int]) -> int:\n    res = max(nums); cur_min, cur_max = 1, 1\n    for n in nums:\n        t = cur_max * n\n        cur_max = max(n * cur_max, n * cur_min, n)\n        cur_min = min(t, n * cur_min, n)\n        res = max(res, cur_max)\n    return res",
      "javascript": "function maxProduct(nums) {\n    let max = nums[0], min = nums[0], res = nums[0];\n    for (let i = 1; i < nums.length; i++) {\n        if (nums[i] < 0) [max, min] = [min, max];\n        max = Math.max(nums[i], max * nums[i]); min = Math.min(nums[i], min * nums[i]);\n        res = Math.max(res, max);\n    }\n    return res;\n}"
    },
    "testCases": [
      { "input": "nums = [2,3,-2,4]", "expectedOutput": "6" }
    ]
  },
  {
    "id": "find-minimum-in-rotated-sorted-array",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "Find Minimum in Rotated Sorted Array",
    "leetcodeNumber": 153,
    "difficulty": "Medium",
    "companies": ["Microsoft", "Amazon", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/minimum-in-rotated-sorted-array/",
    "youtubeUrl": "https://www.youtube.com/watch?v=nhEMDKMB44g",
    "description": "Given the sorted rotated array `nums` of unique elements, return the minimum element in O(log n).",
    "examples": [
      { "input": "nums = [3,4,5,1,2]", "output": "1", "explanation": "Min element is 1." }
    ],
    "constraints": ["1 <= nums.length <= 5000", "-5000 <= nums[i] <= 5000"],
    "starterCode": {
      "java": "public class Solution {\n    public static int findMin(int[] nums) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] > nums[r]) l = m + 1; else r = m;\n        }\n        return nums[l];\n    }\n    public static void main(String[] args) {\n        System.out.println(findMin(new int[]{3,4,5,1,2}));\n    }\n}",
      "cpp": "int findMin(vector<int>& nums) {\n    int l = 0, r = nums.size() - 1;\n    while (l < r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] > nums[r]) l = m + 1; else r = m;\n    }\n    return nums[l];\n}",
      "python": "def findMin(nums: list[int]) -> int:\n    l, r = 0, len(nums) - 1\n    while l < r:\n        m = (l + r) // 2\n        if nums[m] > nums[r]: l = m + 1\n        else: r = m\n    return nums[l]",
      "javascript": "function findMin(nums) {\n    let l = 0, r = nums.length - 1;\n    while (l < r) {\n        let m = Math.floor((l + r) / 2);\n        if (nums[m] > nums[r]) l = m + 1; else r = m;\n    }\n    return nums[l];\n}"
    },
    "testCases": [
      { "input": "nums = [3,4,5,1,2]", "expectedOutput": "1" }
    ]
  },
  {
    "id": "search-in-rotated-sorted-array",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "Search in Rotated Sorted Array",
    "leetcodeNumber": 33,
    "difficulty": "Medium",
    "companies": ["Google", "Amazon", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/",
    "youtubeUrl": "https://www.youtube.com/watch?v=r3pMQ8-Ad5s",
    "description": "Given array `nums` after possible rotation, return index of `target` or -1 in O(log n).",
    "examples": [
      { "input": "nums = [4,5,6,7,0,1,2], target = 0", "output": "4", "explanation": "Target 0 is at index 4." }
    ],
    "constraints": ["1 <= nums.length <= 5000", "-10^4 <= nums[i], target <= 10^4"],
    "starterCode": {
      "java": "public class Solution {\n    public static int search(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int m = l + (r - l) / 2;\n            if (nums[m] == target) return m;\n            if (nums[l] <= nums[m]) {\n                if (nums[l] <= target && target < nums[m]) r = m - 1; else l = m + 1;\n            } else {\n                if (nums[m] < target && target <= nums[r]) l = m + 1; else r = m - 1;\n            }\n        }\n        return -1;\n    }\n    public static void main(String[] args) {\n        System.out.println(search(new int[]{4,5,6,7,0,1,2}, 0));\n    }\n}",
      "cpp": "int search(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while (l <= r) {\n        int m = l + (r - l) / 2;\n        if (nums[m] == target) return m;\n        if (nums[l] <= nums[m]) {\n            if (nums[l] <= target && target < nums[m]) r = m - 1; else l = m + 1;\n        } else {\n            if (nums[m] < target && target <= nums[r]) l = m + 1; else r = m - 1;\n        }\n    }\n    return -1;\n}",
      "python": "def search(nums: list[int], target: int) -> int:\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        m = (l + r) // 2\n        if nums[m] == target: return m\n        if nums[l] <= nums[m]:\n            if nums[l] <= target < nums[m]: r = m - 1\n            else: l = m + 1\n        else:\n            if nums[m] < target <= nums[r]: l = m + 1\n            else: r = m - 1\n    return -1",
      "javascript": "function search(nums, target) {\n    let l = 0, r = nums.length - 1;\n    while (l <= r) {\n        const m = Math.floor((l + r) / 2);\n        if (nums[m] === target) return m;\n        if (nums[l] <= nums[m]) {\n            if (nums[l] <= target && target < nums[m]) r = m - 1; else l = m + 1;\n        } else {\n            if (nums[m] < target && target <= nums[r]) l = m + 1; else r = m - 1;\n        }\n    }\n    return -1;\n}"
    },
    "testCases": [
      { "input": "nums = [4,5,6,7,0,1,2], target = 0", "expectedOutput": "4" }
    ]
  },
  {
    "id": "3sum",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "3Sum",
    "leetcodeNumber": 15,
    "difficulty": "Medium",
    "companies": ["Meta", "Amazon", "Apple"],
    "leetcodeUrl": "https://leetcode.com/problems/3sum/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-a-zero/",
    "youtubeUrl": "https://www.youtube.com/watch?v=DhFh8Kw7ymk",
    "description": "Given array `nums`, return all triplets [nums[i], nums[j], nums[k]] such that i!=j!=k and sum == 0 without duplicates.",
    "examples": [
      { "input": "nums = [-1,0,1,2,-1,-4]", "output": "[[-1,-1,2],[-1,0,1]]", "explanation": "Triplets sum to 0." }
    ],
    "constraints": ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums); List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++; else r--;\n            }\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(threeSum(new int[]{-1,0,1,2,-1,-4}));\n    }\n}",
      "cpp": "vector<vector<int>> threeSum(vector<int>& nums) {\n    sort(nums.begin(), nums.end()); vector<vector<int>> res;\n    for (int i = 0; i < nums.size(); i++) {\n        if (i > 0 && nums[i] == nums[i-1]) continue;\n        int l = i + 1, r = nums.size() - 1;\n        while (l < r) {\n            int sum = nums[i] + nums[l] + nums[r];\n            if (sum == 0) {\n                res.push_back({nums[i], nums[l], nums[r]});\n                while (l < r && nums[l] == nums[l+1]) l++; while (l < r && nums[r] == nums[r-1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++; else r--;\n        }\n    }\n    return res;\n}",
      "python": "def threeSum(nums: list[int]) -> list[list[int]]:\n    nums.sort(); res = []\n    for i in range(len(nums)-2):\n        if i > 0 and nums[i] == nums[i-1]: continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l+1]: l += 1\n                while l < r and nums[r] == nums[r-1]: r -= 1\n                l += 1; r -= 1\n            elif s < 0: l += 1\n            else: r -= 1\n    return res",
      "javascript": "function threeSum(nums) {\n    nums.sort((a, b) => a - b); const res = [];\n    for (let i = 0; i < nums.length - 2; i++) {\n        if (i > 0 && nums[i] === nums[i - 1]) continue;\n        let l = i + 1, r = nums.length - 1;\n        while (l < r) {\n            const sum = nums[i] + nums[l] + nums[r];\n            if (sum === 0) {\n                res.push([nums[i], nums[l], nums[r]]);\n                while (l < r && nums[l] === nums[l + 1]) l++; while (l < r && nums[r] === nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++; else r--;\n        }\n    }\n    return res;\n}"
    },
    "testCases": [
      { "input": "nums = [-1,0,1,2,-1,-4]", "expectedOutput": "[[-1, -1, 2], [-1, 0, 1]]" }
    ]
  },
  {
    "id": "container-with-most-water",
    "category": "Array & Hashing",
    "categoryId": "array",
    "title": "Container With Most Water",
    "leetcodeNumber": 11,
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/container-with-most-water/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/container-with-most-water/",
    "youtubeUrl": "https://www.youtube.com/watch?v=UuiTKBwPgAo",
    "description": "Given n non-negative integers representing heights, find two lines which together with the x-axis form a container containing the most water.",
    "examples": [
      { "input": "height = [1,8,6,2,5,4,8,3,7]", "output": "49", "explanation": "Area = 7 * 7 = 49." }
    ],
    "constraints": ["2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    "starterCode": {
      "java": "public class Solution {\n    public static int maxArea(int[] height) {\n        int l = 0, r = height.length - 1, max = 0;\n        while (l < r) {\n            max = Math.max(max, Math.min(height[l], height[r]) * (r - l));\n            if (height[l] < height[r]) l++; else r--;\n        }\n        return max;\n    }\n    public static void main(String[] args) {\n        System.out.println(maxArea(new int[]{1,8,6,2,5,4,8,3,7}));\n    }\n}",
      "cpp": "int maxArea(vector<int>& height) {\n    int l = 0, r = height.size() - 1, maxA = 0;\n    while (l < r) {\n        maxA = max(maxA, min(height[l], height[r]) * (r - l));\n        if (height[l] < height[r]) l++; else r--;\n    }\n    return maxA;\n}",
      "python": "def maxArea(height: list[int]) -> int:\n    l, r, max_a = 0, len(height) - 1, 0\n    while l < r:\n        max_a = max(max_a, min(height[l], height[r]) * (r - l))\n        if height[l] < height[r]: l += 1\n        else: r -= 1\n    return max_a",
      "javascript": "function maxArea(height) {\n    let l = 0, r = height.length - 1, max = 0;\n    while (l < r) {\n        max = Math.max(max, Math.min(height[l], height[r]) * (r - l));\n        if (height[l] < height[r]) l++; else r--;\n    }\n    return max;\n}"
    },
    "testCases": [
      { "input": "height = [1,8,6,2,5,4,8,3,7]", "expectedOutput": "49" }
    ]
  }
]
;
