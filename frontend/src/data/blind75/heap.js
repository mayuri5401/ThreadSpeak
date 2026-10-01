export default [
  {
    "id": "top-k-frequent-elements",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "title": "Top K Frequent Elements",
    "leetcodeNumber": 347,
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/top-k-frequent-elements/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/k-most-frequent-elements/",
    "youtubeUrl": "https://www.youtube.com/watch?v=7Voiste9mTI",
    "description": "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements in O(n log k) or O(n) time.",
    "examples": [{ "input": "nums = [1,1,1,2,2,3], k = 2", "output": "[1,2]", "explanation": "1 and 2 appear most frequently." }],
    "constraints": ["1 <= nums.length <= 10^5", "k is in range [1, unique elements]"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);\n        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> count.get(a) - count.get(b));\n        for (int n : count.keySet()) {\n            pq.add(n);\n            if (pq.size() > k) pq.poll();\n        }\n        int[] res = new int[k];\n        for (int i = k - 1; i >= 0; i--) res[i] = pq.poll();\n        return res;\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(topKFrequent(new int[]{1,1,1,2,2,3}, 2)));\n    }\n}",
      "cpp": "vector<int> topKFrequent(vector<int>& nums, int k) {\n    unordered_map<int, int> count;\n    for (int n : nums) count[n]++;\n    auto comp = [&](int a, int b) { return count[a] > count[b]; };\n    priority_queue<int, vector<int>, decltype(comp)> pq(comp);\n    for (auto& p : count) {\n        pq.push(p.first);\n        if (pq.size() > k) pq.pop();\n    }\n    vector<int> res;\n    while (!pq.empty()) { res.push_back(pq.top()); pq.pop(); }\n    return res;\n}",
      "python": "import collections, heapq\ndef topKFrequent(nums: list[int], k: int) -> list[int]:\n    count = collections.Counter(nums)\n    return heapq.nlargest(k, count.keys(), key=count.get)",
      "javascript": "function topKFrequent(nums, k) {\n    const count = new Map();\n    for (const n of nums) count.set(n, (count.get(n) || 0) + 1);\n    return Array.from(count.keys()).sort((a, b) => count.get(b) - count.get(a)).slice(0, k);\n}"
    },
    "testCases": [{ "input": "nums = [1,1,1,2,2,3], k = 2", "expectedOutput": "[1, 2]" }]
  },
  {
    "id": "find-median-from-data-stream",
    "category": "Heap / Priority Queue",
    "categoryId": "heap",
    "title": "Find Median from Data Stream (Two Heaps)",
    "leetcodeNumber": 295,
    "difficulty": "Hard",
    "companies": ["Google", "Amazon", "Apple", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/find-median-from-data-stream/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/find-median-from-data-stream/",
    "youtubeUrl": "https://www.youtube.com/watch?v=itmhHWaHupI",
    "description": "Design a data structure that calculates the median of a data stream in real-time with O(log n) add and O(1) find.",
    "examples": [{ "input": "addNum(1), addNum(2), findMedian(), addNum(3), findMedian()", "output": "[1.5, 2.0]", "explanation": "Median updates dynamically." }],
    "constraints": ["-10^5 <= num <= 10^5", "At most 5 * 10^4 calls will be made"],
    "starterCode": {
      "java": "import java.util.*;\npublic class MedianFinder {\n    private PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());\n    private PriorityQueue<Integer> large = new PriorityQueue<>();\n    public void addNum(int num) {\n        small.add(num);\n        large.add(small.poll());\n        if (large.size() > small.size()) small.add(large.poll());\n    }\n    public double findMedian() {\n        return small.size() > large.size() ? small.peek() : (small.peek() + large.peek()) / 2.0;\n    }\n    public static void main(String[] args) {\n        MedianFinder mf = new MedianFinder();\n        mf.addNum(1); mf.addNum(2);\n        System.out.println(\"Median: \" + mf.findMedian()); // 1.5\n    }\n}",
      "cpp": "class MedianFinder {\n    priority_queue<int> small;\n    priority_queue<int, vector<int>, greater<int>> large;\npublic:\n    void addNum(int num) {\n        small.push(num);\n        large.push(small.top()); small.pop();\n        if (large.size() > small.size()) { small.push(large.top()); large.pop(); }\n    }\n    double findMedian() {\n        return small.size() > large.size() ? small.top() : (small.top() + large.top()) / 2.0;\n    }\n};",
      "python": "import heapq\nclass MedianFinder:\n    def __init__(self):\n        self.small, self.large = [], []\n    def addNum(self, num: int) -> None:\n        heapq.heappush(self.small, -num)\n        heapq.heappush(self.large, -heapq.heappop(self.small))\n        if len(self.large) > len(self.small):\n            heapq.heappush(self.small, -heapq.heappop(self.large))\n    def findMedian(self) -> float:\n        if len(self.small) > len(self.large): return -self.small[0]\n        return (-self.small[0] + self.large[0]) / 2.0",
      "javascript": "class MedianFinder {\n    constructor() { this.arr = []; }\n    addNum(num) {\n        let l = 0, r = this.arr.length;\n        while (l < r) {\n            const m = Math.floor((l + r) / 2);\n            if (this.arr[m] < num) l = m + 1; else r = m;\n        }\n        this.arr.splice(l, 0, num);\n    }\n    findMedian() {\n        const n = this.arr.length, mid = Math.floor(n / 2);\n        return n % 2 === 1 ? this.arr[mid] : (this.arr[mid - 1] + this.arr[mid]) / 2;\n    }\n}"
    },
    "testCases": [{ "input": "addNum(1), addNum(2), findMedian()", "expectedOutput": "1.5" }]
  }
]
;
