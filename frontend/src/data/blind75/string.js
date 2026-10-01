export default [
  {
    "id": "longest-substring-without-repeating-characters",
    "category": "String",
    "categoryId": "string",
    "title": "Longest Substring Without Repeating Characters",
    "leetcodeNumber": 3,
    "difficulty": "Medium",
    "companies": ["Amazon", "Bloomberg", "Meta", "Google"],
    "leetcodeUrl": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/",
    "youtubeUrl": "https://www.youtube.com/watch?v=-zSxTJkcdAo",
    "description": "Given a string `s`, find the length of the longest substring without duplicate characters.",
    "examples": [{ "input": "s = 'abcabcbb'", "output": "3", "explanation": "The answer is 'abc' with length 3." }],
    "constraints": ["0 <= s.length <= 5 * 10^4"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        int maxL = 0, l = 0;\n        for (int r = 0; r < s.length(); r++) {\n            char c = s.charAt(r);\n            if (map.containsKey(c)) l = Math.max(l, map.get(c) + 1);\n            map.put(c, r);\n            maxL = Math.max(maxL, r - l + 1);\n        }\n        return maxL;\n    }\n    public static void main(String[] args) {\n        System.out.println(lengthOfLongestSubstring(\"abcabcbb\"));\n    }\n}",
      "cpp": "int lengthOfLongestSubstring(string s) {\n    unordered_map<char, int> map;\n    int maxL = 0, l = 0;\n    for (int r = 0; r < s.size(); r++) {\n        if (map.count(s[r])) l = max(l, map[s[r]] + 1);\n        map[s[r]] = r;\n        maxL = max(maxL, r - l + 1);\n    }\n    return maxL;\n}",
      "python": "def lengthOfLongestSubstring(s: str) -> int:\n    seen = {}; max_l = l = 0\n    for r, c in enumerate(s):\n        if c in seen and seen[c] >= l: l = seen[c] + 1\n        seen[c] = r\n        max_l = max(max_l, r - l + 1)\n    return max_l",
      "javascript": "function lengthOfLongestSubstring(s) {\n    const map = new Map();\n    let maxL = 0, l = 0;\n    for (let r = 0; r < s.length; r++) {\n        const c = s[r];\n        if (map.has(c)) l = Math.max(l, map.get(c) + 1);\n        map.set(c, r);\n        maxL = Math.max(maxL, r - l + 1);\n    }\n    return maxL;\n}"
    },
    "testCases": [{ "input": "s = 'abcabcbb'", "expectedOutput": "3" }]
  },
  {
    "id": "longest-repeating-character-replacement",
    "category": "String",
    "categoryId": "string",
    "title": "Longest Repeating Character Replacement",
    "leetcodeNumber": 424,
    "difficulty": "Medium",
    "companies": ["Google", "Amazon"],
    "leetcodeUrl": "https://leetcode.com/problems/longest-repeating-character-replacement/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/longest-repeating-character-replacement/",
    "youtubeUrl": "https://www.youtube.com/watch?v=_eNhaDCr6P0",
    "description": "Choose any character of `s` and change it to any other uppercase English character at most `k` times. Return length of longest substring containing same letter.",
    "examples": [{ "input": "s = 'ABAB', k = 2", "output": "4", "explanation": "Replace two 'A's with 'B's or vice versa." }],
    "constraints": ["1 <= s.length <= 10^5", "0 <= k <= s.length"],
    "starterCode": {
      "java": "public class Solution {\n    public static int characterReplacement(String s, int k) {\n        int[] count = new int[26];\n        int maxCount = 0, maxL = 0, l = 0;\n        for (int r = 0; r < s.length(); r++) {\n            maxCount = Math.max(maxCount, ++count[s.charAt(r) - 'A']);\n            while (r - l + 1 - maxCount > k) count[s.charAt(l++) - 'A']--;\n            maxL = Math.max(maxL, r - l + 1);\n        }\n        return maxL;\n    }\n    public static void main(String[] args) {\n        System.out.println(characterReplacement(\"ABAB\", 2));\n    }\n}",
      "cpp": "int characterReplacement(string s, int k) {\n    vector<int> count(26, 0);\n    int maxCount = 0, maxL = 0, l = 0;\n    for (int r = 0; r < s.size(); r++) {\n        maxCount = max(maxCount, ++count[s[r] - 'A']);\n        while (r - l + 1 - maxCount > k) count[s[l++] - 'A']--;\n        maxL = max(maxL, r - l + 1);\n    }\n    return maxL;\n}",
      "python": "def characterReplacement(s: str, k: int) -> int:\n    count = {}; max_cnt = max_l = l = 0\n    for r, c in enumerate(s):\n        count[c] = count.get(c, 0) + 1\n        max_cnt = max(max_cnt, count[c])\n        while (r - l + 1) - max_cnt > k:\n            count[s[l]] -= 1\n            l += 1\n        max_l = max(max_l, r - l + 1)\n    return max_l",
      "javascript": "function characterReplacement(s, k) {\n    const count = new Array(26).fill(0);\n    let maxCount = 0, maxL = 0, l = 0;\n    for (let r = 0; r < s.length; r++) {\n        maxCount = Math.max(maxCount, ++count[s.charCodeAt(r) - 65]);\n        while (r - l + 1 - maxCount > k) count[s.charCodeAt(l++) - 65]--;\n        maxL = Math.max(maxL, r - l + 1);\n    }\n    return maxL;\n}"
    },
    "testCases": [{ "input": "s = 'ABAB', k = 2", "expectedOutput": "4" }]
  },
  {
    "id": "minimum-window-substring",
    "category": "String",
    "categoryId": "string",
    "title": "Minimum Window Substring",
    "leetcodeNumber": 76,
    "difficulty": "Hard",
    "companies": ["Facebook", "Uber", "Amazon", "LinkedIn"],
    "leetcodeUrl": "https://leetcode.com/problems/minimum-window-substring/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/minimum-window-substring/",
    "youtubeUrl": "https://www.youtube.com/watch?v=WJaij9ffOIY",
    "description": "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window in O(m+n).",
    "examples": [{ "input": "s = 'ADOBECODEBANC', t = 'ABC'", "output": "'BANC'", "explanation": "'BANC' contains A, B, C." }],
    "constraints": ["m == s.length", "n == t.length", "1 <= m, n <= 10^5"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static String minWindow(String s, String t) {\n        int[] map = new int[128];\n        for (char c : t.toCharArray()) map[c]++;\n        int count = t.length(), l = 0, minL = Integer.MAX_VALUE, start = 0;\n        for (int r = 0; r < s.length(); r++) {\n            if (map[s.charAt(r)]-- > 0) count--;\n            while (count == 0) {\n                if (r - l + 1 < minL) { minL = r - l + 1; start = l; }\n                if (++map[s.charAt(l++)] > 0) count++;\n            }\n        }\n        return minL == Integer.MAX_VALUE ? \"\" : s.substring(start, start + minL);\n    }\n    public static void main(String[] args) {\n        System.out.println(minWindow(\"ADOBECODEBANC\", \"ABC\"));\n    }\n}",
      "cpp": "string minWindow(string s, string t) {\n    vector<int> map(128, 0);\n    for (char c : t) map[c]++;\n    int count = t.size(), l = 0, minL = 1e9, start = 0;\n    for (int r = 0; r < s.size(); r++) {\n        if (map[s[r]]-- > 0) count--;\n        while (count == 0) {\n            if (r - l + 1 < minL) { minL = r - l + 1; start = l; }\n            if (++map[s[l++]] > 0) count++;\n        }\n    }\n    return minL == 1e9 ? \"\" : s.substr(start, minL);\n}",
      "python": "def minWindow(s: str, t: str) -> str:\n    import collections\n    need = collections.Counter(t)\n    missing = len(t); start, min_l = 0, float('inf'); l = 0\n    for r, c in enumerate(s):\n        if need[c] > 0: missing -= 1\n        need[c] -= 1\n        while missing == 0:\n            if r - l + 1 < min_l: min_l = r - l + 1; start = l\n            need[s[l]] += 1\n            if need[s[l]] > 0: missing += 1\n            l += 1\n    return \"\" if min_l == float('inf') else s[start:start+min_l]",
      "javascript": "function minWindow(s, t) {\n    const map = new Array(128).fill(0);\n    for (const c of t) map[c.charCodeAt(0)]++;\n    let count = t.length, l = 0, minL = Infinity, start = 0;\n    for (let r = 0; r < s.length; r++) {\n        if (map[s.charCodeAt(r)]-- > 0) count--;\n        while (count === 0) {\n            if (r - l + 1 < minL) { minL = r - l + 1; start = l; }\n            if (++map[s.charCodeAt(l++)] > 0) count++;\n        }\n    }\n    return minL === Infinity ? \"\" : s.substring(start, start + minL);\n}"
    },
    "testCases": [{ "input": "s = 'ADOBECODEBANC', t = 'ABC'", "expectedOutput": "'BANC'" }]
  },
  {
    "id": "valid-anagram",
    "category": "String",
    "categoryId": "string",
    "title": "Valid Anagram",
    "leetcodeNumber": 242,
    "difficulty": "Easy",
    "companies": ["Uber", "Google", "Amazon"],
    "leetcodeUrl": "https://leetcode.com/problems/valid-anagram/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/check-if-two-strings-are-anagrams-of-each-other/",
    "youtubeUrl": "https://www.youtube.com/watch?v=9UtInBqnCgA",
    "description": "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
    "examples": [{ "input": "s = 'anagram', t = 'nagaram'", "output": "true", "explanation": "Valid anagram." }],
    "constraints": ["1 <= s.length, t.length <= 5 * 10^4"],
    "starterCode": {
      "java": "public class Solution {\n    public static boolean isAnagram(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (int i = 0; i < s.length(); i++) { count[s.charAt(i) - 'a']++; count[t.charAt(i) - 'a']--; }\n        for (int c : count) if (c != 0) return false;\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isAnagram(\"anagram\", \"nagaram\"));\n    }\n}",
      "cpp": "bool isAnagram(string s, string t) {\n    if (s.size() != t.size()) return false;\n    vector<int> count(26, 0);\n    for (int i = 0; i < s.size(); i++) { count[s[i] - 'a']++; count[t[i] - 'a']--; }\n    for (int c : count) if (c != 0) return false;\n    return true;\n}",
      "python": "def isAnagram(s: str, t: str) -> bool:\n    if len(s) != len(t): return False\n    count = {}\n    for c in s: count[c] = count.get(c, 0) + 1\n    for c in t:\n        if c not in count or count[c] == 0: return False\n        count[c] -= 1\n    return True",
      "javascript": "function isAnagram(s, t) {\n    if (s.length !== t.length) return false;\n    const count = new Array(26).fill(0);\n    for (let i = 0; i < s.length; i++) {\n        count[s.charCodeAt(i) - 97]++;\n        count[t.charCodeAt(i) - 97]--;\n    }\n    return count.every(c => c === 0);\n}"
    },
    "testCases": [{ "input": "s = 'anagram', t = 'nagaram'", "expectedOutput": "true" }]
  },
  {
    "id": "group-anagrams",
    "category": "String",
    "categoryId": "string",
    "title": "Group Anagrams",
    "leetcodeNumber": 49,
    "difficulty": "Medium",
    "companies": ["Amazon", "Affirm", "Google"],
    "leetcodeUrl": "https://leetcode.com/problems/group-anagrams/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/group-anagrams/",
    "youtubeUrl": "https://www.youtube.com/watch?v=vzdNOK2oDA4",
    "description": "Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.",
    "examples": [{ "input": "strs = ['eat','tea','tan','ate','nat','bat']", "output": "[['bat'],['nat','tan'],['ate','eat','tea']]", "explanation": "Grouped anagrams." }],
    "constraints": ["1 <= strs.length <= 10^4"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] ca = s.toCharArray(); Arrays.sort(ca);\n            String key = String.valueOf(ca);\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n    public static void main(String[] args) {\n        System.out.println(groupAnagrams(new String[]{\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"}));\n    }\n}",
      "cpp": "vector<vector<string>> groupAnagrams(vector<string>& strs) {\n    unordered_map<string, vector<string>> map;\n    for (string& s : strs) {\n        string t = s;\n        sort(t.begin(), t.end());\n        map[t].push_back(s);\n    }\n    vector<vector<string>> res;\n    for (auto& p : map) res.push_back(p.second);\n    return res;\n}",
      "python": "def groupAnagrams(strs: list[str]) -> list[list[str]]:\n    import collections\n    ans = collections.defaultdict(list)\n    for s in strs:\n        ans[tuple(sorted(s))].append(s)\n    return list(ans.values())",
      "javascript": "function groupAnagrams(strs) {\n    const map = new Map();\n    for (const s of strs) {\n        const key = s.split('').sort().join('');\n        if (!map.has(key)) map.set(key, []);\n        map.get(key).push(s);\n    }\n    return Array.from(map.values());\n}"
    },
    "testCases": [{ "input": "strs = ['eat','tea','tan','ate','nat','bat']", "expectedOutput": "[['bat'], ['nat', 'tan'], ['ate', 'eat', 'tea']]" }]
  },
  {
    "id": "valid-parentheses",
    "category": "String",
    "categoryId": "string",
    "title": "Valid Parentheses",
    "leetcodeNumber": 20,
    "difficulty": "Easy",
    "companies": ["Amazon", "Google", "Facebook", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/valid-parentheses/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/check-for-balanced-parentheses/",
    "youtubeUrl": "https://www.youtube.com/watch?v=wkDfsKijrZ8",
    "description": "Given a string `s` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "examples": [{ "input": "s = '()[]{}'", "output": "true", "explanation": "Matching closed brackets in correct order." }],
    "constraints": ["1 <= s.length <= 10^4"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n    public static void main(String[] args) {\n        System.out.println(isValid(\"()[]{}\"));\n    }\n}",
      "cpp": "bool isValid(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(') st.push(')');\n        else if (c == '{') st.push('}');\n        else if (c == '[') st.push(']');\n        else if (st.empty() || st.top() != c) return false;\n        else st.pop();\n    }\n    return st.empty();\n}",
      "python": "def isValid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top: return False\n        else: stack.append(char)\n    return not stack",
      "javascript": "function isValid(s) {\n    const stack = [];\n    for (const c of s) {\n        if (c === '(') stack.push(')');\n        else if (c === '{') stack.push('}');\n        else if (c === '[') stack.push(']');\n        else if (stack.pop() !== c) return false;\n    }\n    return stack.length === 0;\n}"
    },
    "testCases": [{ "input": "s = '()[]{}'", "expectedOutput": "true" }]
  },
  {
    "id": "valid-palindrome",
    "category": "String",
    "categoryId": "string",
    "title": "Valid Palindrome",
    "leetcodeNumber": 125,
    "difficulty": "Easy",
    "companies": ["Facebook", "Microsoft", "Uber"],
    "leetcodeUrl": "https://leetcode.com/problems/valid-palindrome/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/check-if-the-given-string-is-palindrome-or-not/",
    "youtubeUrl": "https://www.youtube.com/watch?v=0h9V2uF4888",
    "description": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    "examples": [{ "input": "s = 'A man, a plan, a canal: Panama'", "output": "true", "explanation": "'amanaplanacanalpanama' is a palindrome." }],
    "constraints": ["1 <= s.length <= 2 * 10^5"],
    "starterCode": {
      "java": "public class Solution {\n    public static boolean isPalindrome(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n            l++; r--;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(isPalindrome(\"A man, a plan, a canal: Panama\"));\n    }\n}",
      "cpp": "bool isPalindrome(string s) {\n    int l = 0, r = s.size() - 1;\n    while (l < r) {\n        while (l < r && !isalnum(s[l])) l++;\n        while (l < r && !isalnum(s[r])) r--;\n        if (tolower(s[l]) != tolower(s[r])) return false;\n        l++; r--;\n    }\n    return true;\n}",
      "python": "def isPalindrome(s: str) -> bool:\n    l, r = 0, len(s) - 1\n    while l < r:\n        while l < r and not s[l].isalnum(): l += 1\n        while l < r and not s[r].isalnum(): r -= 1\n        if s[l].lower() != s[r].lower(): return False\n        l += 1; r -= 1\n    return True",
      "javascript": "function isPalindrome(s) {\n    let l = 0, r = s.length - 1;\n    while (l < r) {\n        while (l < r && !/[a-zA-Z0-9]/.test(s[l])) l++;\n        while (l < r && !/[a-zA-Z0-9]/.test(s[r])) r--;\n        if (s[l].toLowerCase() !== s[r].toLowerCase()) return false;\n        l++; r--;\n    }\n    return true;\n}"
    },
    "testCases": [{ "input": "s = 'A man, a plan, a canal: Panama'", "expectedOutput": "true" }]
  },
  {
    "id": "longest-palindromic-substring",
    "category": "String",
    "categoryId": "string",
    "title": "Longest Palindromic Substring",
    "leetcodeNumber": 5,
    "difficulty": "Medium",
    "companies": ["Amazon", "Microsoft", "Google"],
    "leetcodeUrl": "https://leetcode.com/problems/longest-palindromic-substring/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/longest-palindromic-substring/",
    "youtubeUrl": "https://www.youtube.com/watch?v=XYQecbcd6fY",
    "description": "Given a string `s`, return the longest palindromic substring in `s`.",
    "examples": [{ "input": "s = 'babad'", "output": "'bab'", "explanation": "'aba' is also a valid answer." }],
    "constraints": ["1 <= s.length <= 1000"],
    "starterCode": {
      "java": "public class Solution {\n    public static String longestPalindrome(String s) {\n        if (s == null || s.length() < 1) return \"\";\n        int start = 0, end = 0;\n        for (int i = 0; i < s.length(); i++) {\n            int len1 = expand(s, i, i), len2 = expand(s, i, i + 1);\n            int len = Math.max(len1, len2);\n            if (len > end - start) { start = i - (len - 1) / 2; end = i + len / 2; }\n        }\n        return s.substring(start, end + 1);\n    }\n    private static int expand(String s, int l, int r) {\n        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) { l--; r++; }\n        return r - l - 1;\n    }\n    public static void main(String[] args) {\n        System.out.println(longestPalindrome(\"babad\"));\n    }\n}",
      "cpp": "int expand(string& s, int l, int r) {\n    while (l >= 0 && r < s.size() && s[l] == s[r]) { l--; r++; }\n    return r - l - 1;\n}\nstring longestPalindrome(string s) {\n    int start = 0, end = 0;\n    for (int i = 0; i < s.size(); i++) {\n        int len = max(expand(s, i, i), expand(s, i, i + 1));\n        if (len > end - start) { start = i - (len - 1) / 2; end = i + len / 2; }\n    }\n    return s.substr(start, end - start + 1);\n}",
      "python": "def longestPalindrome(s: str) -> str:\n    res = \"\"\n    for i in range(len(s)):\n        for l, r in ((i, i), (i, i + 1)):\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                if (r - l + 1) > len(res): res = s[l:r+1]\n                l -= 1; r += 1\n    return res",
      "javascript": "function longestPalindrome(s) {\n    let res = \"\";\n    for (let i = 0; i < s.length; i++) {\n        for (let [l, r] of [[i, i], [i, i + 1]]) {\n            while (l >= 0 && r < s.length && s[l] === s[r]) {\n                if (r - l + 1 > res.length) res = s.substring(l, r + 1);\n                l--; r++;\n            }\n        }\n    }\n    return res;\n}"
    },
    "testCases": [{ "input": "s = 'babad'", "expectedOutput": "'bab'" }]
  },
  {
    "id": "palindromic-substrings",
    "category": "String",
    "categoryId": "string",
    "title": "Palindromic Substrings",
    "leetcodeNumber": 647,
    "difficulty": "Medium",
    "companies": ["Facebook", "Amazon", "Twitter"],
    "leetcodeUrl": "https://leetcode.com/problems/palindromic-substrings/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/count-palindromic-substrings/",
    "youtubeUrl": "https://www.youtube.com/watch?v=4RACzI5-du8",
    "description": "Given a string `s`, return the number of palindromic substrings in it.",
    "examples": [{ "input": "s = 'aaa'", "output": "6", "explanation": "'a', 'a', 'a', 'aa', 'aa', 'aaa'." }],
    "constraints": ["1 <= s.length <= 1000"],
    "starterCode": {
      "java": "public class Solution {\n    public static int countSubstrings(String s) {\n        int count = 0;\n        for (int i = 0; i < s.length(); i++) {\n            count += countPalindromes(s, i, i);\n            count += countPalindromes(s, i, i + 1);\n        }\n        return count;\n    }\n    private static int countPalindromes(String s, int l, int r) {\n        int cnt = 0;\n        while (l >= 0 && r < s.length() && s.charAt(l--) == s.charAt(r++)) cnt++;\n        return cnt;\n    }\n    public static void main(String[] args) {\n        System.out.println(countSubstrings(\"aaa\"));\n    }\n}",
      "cpp": "int countPalindromes(string& s, int l, int r) {\n    int cnt = 0;\n    while (l >= 0 && r < s.size() && s[l--] == s[r++]) cnt++;\n    return cnt;\n}\nint countSubstrings(string s) {\n    int count = 0;\n    for (int i = 0; i < s.size(); i++) {\n        count += countPalindromes(s, i, i) + countPalindromes(s, i, i + 1);\n    }\n    return count;\n}",
      "python": "def countSubstrings(s: str) -> int:\n    cnt = 0\n    for i in range(len(s)):\n        for l, r in ((i, i), (i, i + 1)):\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                cnt += 1; l -= 1; r += 1\n    return cnt",
      "javascript": "function countSubstrings(s) {\n    let cnt = 0;\n    for (let i = 0; i < s.length; i++) {\n        for (let [l, r] of [[i, i], [i, i + 1]]) {\n            while (l >= 0 && r < s.length && s[l] === s[r]) { cnt++; l--; r++; }\n        }\n    }\n    return cnt;\n}"
    },
    "testCases": [{ "input": "s = 'aaa'", "expectedOutput": "6" }]
  },
  {
    "id": "encode-and-decode-strings",
    "category": "String",
    "categoryId": "string",
    "title": "Encode and Decode Strings",
    "leetcodeNumber": 271,
    "difficulty": "Medium",
    "companies": ["Google", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/encode-and-decode-strings/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/encode-and-decode-strings/",
    "youtubeUrl": "https://www.youtube.com/watch?v=B1k_sxOSgv8",
    "description": "Design an algorithm to encode a list of strings to a single string, and decode back to the original list of strings.",
    "examples": [{ "input": "strs = ['lint','code','love','you']", "output": "['lint','code','love','you']", "explanation": "Length-prefix encoding." }],
    "constraints": ["1 <= strs.length <= 200"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static String encode(List<String> strs) {\n        StringBuilder sb = new StringBuilder();\n        for (String s : strs) sb.append(s.length()).append(\"#\").append(s);\n        return sb.toString();\n    }\n    public static List<String> decode(String s) {\n        List<String> res = new ArrayList<>();\n        int i = 0;\n        while (i < s.length()) {\n            int slash = s.indexOf('#', i);\n            int size = Integer.parseInt(s.substring(i, slash));\n            i = slash + 1 + size;\n            res.add(s.substring(slash + 1, i));\n        }\n        return res;\n    }\n    public static void main(String[] args) {\n        List<String> orig = Arrays.asList(\"lint\",\"code\",\"love\",\"you\");\n        System.out.println(decode(encode(orig)));\n    }\n}",
      "cpp": "string encode(vector<string>& strs) {\n    string res = \"\";\n    for (string& s : strs) res += to_string(s.size()) + \"#\" + s;\n    return res;\n}\nvector<string> decode(string s) {\n    vector<string> res;\n    int i = 0;\n    while (i < s.size()) {\n        int slash = s.find('#', i);\n        int size = stoi(s.substr(i, slash - i));\n        res.push_back(s.substr(slash + 1, size));\n        i = slash + 1 + size;\n    }\n    return res;\n}",
      "python": "def encode(strs: list[str]) -> str:\n    return \"\".join(f\"{len(s)}#{s}\" for s in strs)\ndef decode(s: str) -> list[str]:\n    res, i = [], 0\n    while i < len(s):\n        slash = s.find(\"#\", i)\n        length = int(s[i:slash])\n        res.append(s[slash + 1 : slash + 1 + length])\n        i = slash + 1 + length\n    return res",
      "javascript": "function encode(strs) {\n    return strs.map(s => `${s.length}#${s}`).join('');\n}\nfunction decode(s) {\n    const res = []; let i = 0;\n    while (i < s.length) {\n        const slash = s.indexOf('#', i);\n        const len = parseInt(s.substring(i, slash));\n        res.push(s.substring(slash + 1, slash + 1 + len));\n        i = slash + 1 + len;\n    }\n    return res;\n}"
    },
    "testCases": [{ "input": "strs = ['lint','code','love','you']", "expectedOutput": "['lint', 'code', 'love', 'you']" }]
  }
]
;
