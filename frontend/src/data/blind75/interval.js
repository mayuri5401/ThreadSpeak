export default [
  {
    "id": "insert-interval",
    "category": "Intervals",
    "categoryId": "interval",
    "title": "Insert Interval",
    "leetcodeNumber": 57,
    "difficulty": "Medium",
    "companies": ["Google", "Facebook", "Amazon"],
    "leetcodeUrl": "https://leetcode.com/problems/insert-interval/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/insert-new-interval/",
    "youtubeUrl": "https://www.youtube.com/watch?v=xxRE-46OCC8",
    "description": "Insert `newInterval` into `intervals` (sorted by start time) such that intervals is still sorted and non-overlapping.",
    "examples": [{ "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]", "output": "[[1,5],[6,9]]", "explanation": "[1,3] and [2,5] merge into [1,5]." }],
    "constraints": ["0 <= intervals.length <= 10^4", "intervals[i].length == 2"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int[][] insert(int[][] intervals, int[] newInterval) {\n        List<int[]> res = new ArrayList<>();\n        int i = 0, n = intervals.length;\n        while (i < n && intervals[i][1] < newInterval[0]) res.add(intervals[i++]);\n        while (i < n && intervals[i][0] <= newInterval[1]) {\n            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n            i++;\n        }\n        res.add(newInterval);\n        while (i < n) res.add(intervals[i++]);\n        return res.toArray(new int[res.size()][]);\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.deepToString(insert(new int[][]{{1,3},{6,9}}, new int[]{2,5})));\n    }\n}",
      "cpp": "vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n    vector<vector<int>> res;\n    int i = 0, n = intervals.size();\n    while (i < n && intervals[i][1] < newInterval[0]) res.push_back(intervals[i++]);\n    while (i < n && intervals[i][0] <= newInterval[1]) {\n        newInterval[0] = min(newInterval[0], intervals[i][0]);\n        newInterval[1] = max(newInterval[1], intervals[i][1]);\n        i++;\n    }\n    res.push_back(newInterval);\n    while (i < n) res.push_back(intervals[i++]);\n    return res;\n}",
      "python": "def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:\n    res = []; i, n = 0, len(intervals)\n    while i < n and intervals[i][1] < newInterval[0]: res.append(intervals[i]); i += 1\n    while i < n and intervals[i][0] <= newInterval[1]:\n        newInterval[0] = min(newInterval[0], intervals[i][0])\n        newInterval[1] = max(newInterval[1], intervals[i][1])\n        i += 1\n    res.append(newInterval)\n    while i < n: res.append(intervals[i]); i += 1\n    return res",
      "javascript": "function insert(intervals, newInterval) {\n    const res = [];\n    let i = 0, n = intervals.length;\n    while (i < n && intervals[i][1] < newInterval[0]) res.push(intervals[i++]);\n    while (i < n && intervals[i][0] <= newInterval[1]) {\n        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);\n        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);\n        i++;\n    }\n    res.push(newInterval);\n    while (i < n) res.push(intervals[i++]);\n    return res;\n}"
    },
    "testCases": [{ "input": "intervals = [[1,3],[6,9]], newInterval = [2,5]", "expectedOutput": "[[1, 5], [6, 9]]" }]
  },
  {
    "id": "merge-intervals",
    "category": "Intervals",
    "categoryId": "interval",
    "title": "Merge Intervals",
    "leetcodeNumber": 56,
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Facebook", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/merge-intervals/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/merge-overlapping-sub-intervals/",
    "youtubeUrl": "https://www.youtube.com/watch?v=IexN60k62jo",
    "description": "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    "examples": [{ "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]", "output": "[[1,6],[8,10],[15,18]]", "explanation": "[1,3] and [2,6] overlap into [1,6]." }],
    "constraints": ["1 <= intervals.length <= 10^4"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int[][] merge(int[][] intervals) {\n        if (intervals.length <= 1) return intervals;\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> res = new ArrayList<>();\n        int[] cur = intervals[0];\n        res.add(cur);\n        for (int[] interval : intervals) {\n            if (interval[0] <= cur[1]) cur[1] = Math.max(cur[1], interval[1]);\n            else { cur = interval; res.add(cur); }\n        }\n        return res.toArray(new int[res.size()][]);\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.deepToString(merge(new int[][]{{1,3},{2,6},{8,10},{15,18}})));\n    }\n}",
      "cpp": "vector<vector<int>> merge(vector<vector<int>>& intervals) {\n    if (intervals.size() <= 1) return intervals;\n    sort(intervals.begin(), intervals.end());\n    vector<vector<int>> res = {intervals[0]};\n    for (int i = 1; i < intervals.size(); i++) {\n        if (intervals[i][0] <= res.back()[1]) res.back()[1] = max(res.back()[1], intervals[i][1]);\n        else res.push_back(intervals[i]);\n    }\n    return res;\n}",
      "python": "def merge(intervals: list[list[int]]) -> list[list[int]]:\n    intervals.sort(key=lambda x: x[0])\n    res = [intervals[0]]\n    for cur in intervals[1:]:\n        if cur[0] <= res[-1][1]: res[-1][1] = max(res[-1][1], cur[1])\n        else: res.append(cur)\n    return res",
      "javascript": "function merge(intervals) {\n    if (intervals.length <= 1) return intervals;\n    intervals.sort((a, b) => a[0] - b[0]);\n    const res = [intervals[0]];\n    for (let i = 1; i < intervals.length; i++) {\n        const last = res[res.length - 1];\n        if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n        else res.push(intervals[i]);\n    }\n    return res;\n}"
    },
    "testCases": [{ "input": "intervals = [[1,3],[2,6],[8,10],[15,18]]", "expectedOutput": "[[1, 6], [8, 10], [15, 18]]" }]
  },
  {
    "id": "non-overlapping-intervals",
    "category": "Intervals",
    "categoryId": "interval",
    "title": "Non-overlapping Intervals",
    "leetcodeNumber": 435,
    "difficulty": "Medium",
    "companies": ["Facebook", "Amazon"],
    "leetcodeUrl": "https://leetcode.com/problems/non-overlapping-intervals/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/non-overlapping-intervals/",
    "youtubeUrl": "https://www.youtube.com/watch?v=nONCGxWoUfM",
    "description": "Given an array of intervals, return the minimum number of intervals you need to remove to make the rest non-overlapping.",
    "examples": [{ "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]", "output": "1", "explanation": "Remove [1,3]." }],
    "constraints": ["1 <= intervals.length <= 10^5"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int eraseOverlapIntervals(int[][] intervals) {\n        if (intervals.length == 0) return 0;\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));\n        int count = 0, end = intervals[0][1];\n        for (int i = 1; i < intervals.length; i++) {\n            if (intervals[i][0] < end) count++;\n            else end = intervals[i][1];\n        }\n        return count;\n    }\n    public static void main(String[] args) {\n        System.out.println(eraseOverlapIntervals(new int[][]{{1,2},{2,3},{3,4},{1,3}}));\n    }\n}",
      "cpp": "int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n    if (intervals.empty()) return 0;\n    sort(intervals.begin(), intervals.end(), [](auto& a, auto& b) { return a[1] < b[1]; });\n    int count = 0, end = intervals[0][1];\n    for (int i = 1; i < intervals.size(); i++) {\n        if (intervals[i][0] < end) count++;\n        else end = intervals[i][1];\n    }\n    return count;\n}",
      "python": "def eraseOverlapIntervals(intervals: list[list[int]]) -> int:\n    intervals.sort(key=lambda x: x[1])\n    cnt, end = 0, intervals[0][1]\n    for i in range(1, len(intervals)):\n        if intervals[i][0] < end: cnt += 1\n        else: end = intervals[i][1]\n    return cnt",
      "javascript": "function eraseOverlapIntervals(intervals) {\n    if (!intervals.length) return 0;\n    intervals.sort((a, b) => a[1] - b[1]);\n    let count = 0, end = intervals[0][1];\n    for (let i = 1; i < intervals.length; i++) {\n        if (intervals[i][0] < end) count++;\n        else end = intervals[i][1];\n    }\n    return count;\n}"
    },
    "testCases": [{ "input": "intervals = [[1,2],[2,3],[3,4],[1,3]]", "expectedOutput": "1" }]
  },
  {
    "id": "find-repeating-and-missing-number",
    "category": "Intervals",
    "categoryId": "interval",
    "title": "Find the Repeating and Missing Number",
    "leetcodeNumber": null,
    "difficulty": "Hard",
    "companies": ["Amazon", "Microsoft", "Goldman Sachs"],
    "leetcodeUrl": "https://leetcode.com/problems/set-mismatch/",
    "description": "You are given a read-only array of `n` integers from 1 to `n`. Each integer appears exactly once except `A` which appears twice and `B` which is missing. Return `[A, B]`.",
    "examples": [{ "input": "nums = [3, 1, 2, 5, 3]", "output": "[3, 4]", "explanation": "3 is repeated twice and 4 is missing." }],
    "constraints": ["2 <= n <= 10^5", "1 <= nums[i] <= n"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int[] findTwoElement(int[] nums) {\n        long n = nums.length;\n        long SN = (n * (n + 1)) / 2;\n        long S2N = (n * (n + 1) * (2 * n + 1)) / 6;\n        long S = 0, S2 = 0;\n        for (int x : nums) {\n            S += x;\n            S2 += (long) x * (long) x;\n        }\n        long val1 = S - SN;\n        long val2 = S2 - S2N;\n        val2 = val2 / val1;\n        long x = (val1 + val2) / 2;\n        long y = x - val1;\n        return new int[]{(int) x, (int) y};\n    }\n    public static void main(String[] args) {\n        System.out.println(Arrays.toString(findTwoElement(new int[]{3, 1, 2, 5, 3})));\n    }\n}",
      "cpp": "vector<int> findTwoElement(vector<int>& nums) {\n    long long n = nums.size();\n    long long SN = (n * (n + 1)) / 2;\n    long long S2N = (n * (n + 1) * (2 * n + 1)) / 6;\n    long long S = 0, S2 = 0;\n    for (int x : nums) { S += x; S2 += (long long)x * x; }\n    long long val1 = S - SN;\n    long long val2 = S2 - S2N;\n    val2 = val2 / val1;\n    long long x = (val1 + val2) / 2;\n    long long y = x - val1;\n    return {(int)x, (int)y};\n}",
      "python": "def findTwoElement(nums: list[int]) -> list[int]:\n    n = len(nums)\n    SN = (n * (n + 1)) // 2\n    S2N = (n * (n + 1) * (2 * n + 1)) // 6\n    S = sum(nums)\n    S2 = sum(x * x for x in nums)\n    val1 = S - SN\n    val2 = (S2 - S2N) // val1\n    x = (val1 + val2) // 2\n    y = x - val1\n    return [x, y]",
      "javascript": "function findTwoElement(nums) {\n    const n = BigInt(nums.length);\n    const SN = (n * (n + 1n)) / 2n;\n    const S2N = (n * (n + 1n) * (2n * n + 1n)) / 6n;\n    let S = 0n, S2 = 0n;\n    for (const x of nums) { const bx = BigInt(x); S += bx; S2 += bx * bx; }\n    const val1 = S - SN;\n    const val2 = (S2 - S2N) / val1;\n    const x = (val1 + val2) / 2n;\n    const y = x - val1;\n    return [Number(x), Number(y)];\n}"
    },
    "testCases": [{ "input": "nums = [3, 1, 2, 5, 3]", "expectedOutput": "[3, 4]" }]
  },
  {
    "id": "meeting-rooms",
    "category": "Intervals",
    "categoryId": "interval",
    "title": "Meeting Rooms",
    "leetcodeNumber": 252,
    "difficulty": "Easy",
    "companies": ["Facebook", "Google"],
    "leetcodeUrl": "https://leetcode.com/problems/meeting-rooms/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/meeting-rooms-check-if-person-can-attend-all-meetings/",
    "youtubeUrl": "https://www.youtube.com/watch?v=PaJxqZVPhbg",
    "description": "Given an array of meeting time intervals `intervals` where `intervals[i] = [starti, endi]`, determine if a person could attend all meetings.",
    "examples": [{ "input": "intervals = [[0,30],[5,10],[15,20]]", "output": "false", "explanation": "[0,30] and [5,10] conflict." }],
    "constraints": ["0 <= intervals.length <= 10^4"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static boolean canAttendMeetings(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        for (int i = 0; i < intervals.length - 1; i++) {\n            if (intervals[i][1] > intervals[i + 1][0]) return false;\n        }\n        return true;\n    }\n    public static void main(String[] args) {\n        System.out.println(canAttendMeetings(new int[][]{{0,30},{5,10},{15,20}}));\n    }\n}",
      "cpp": "bool canAttendMeetings(vector<vector<int>>& intervals) {\n    sort(intervals.begin(), intervals.end());\n    for (int i = 0; i + 1 < intervals.size(); i++) {\n        if (intervals[i][1] > intervals[i + 1][0]) return false;\n    }\n    return true;\n}",
      "python": "def canAttendMeetings(intervals: list[list[int]]) -> bool:\n    intervals.sort(key=lambda x: x[0])\n    for i in range(len(intervals) - 1):\n        if intervals[i][1] > intervals[i + 1][0]: return False\n    return True",
      "javascript": "function canAttendMeetings(intervals) {\n    intervals.sort((a, b) => a[0] - b[0]);\n    for (let i = 0; i < intervals.length - 1; i++) {\n        if (intervals[i][1] > intervals[i + 1][0]) return false;\n    }\n    return true;\n}"
    },
    "testCases": [{ "input": "intervals = [[0,30],[5,10],[15,20]]", "expectedOutput": "false" }]
  },
  {
    "id": "meeting-rooms-ii",
    "category": "Intervals",
    "categoryId": "interval",
    "title": "Meeting Rooms II (Min Conference Rooms Required)",
    "leetcodeNumber": 253,
    "difficulty": "Medium",
    "companies": ["Google", "Amazon", "Facebook", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/meeting-rooms-ii/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/minimum-number-of-platforms-required-for-a-railway/",
    "youtubeUrl": "https://www.youtube.com/watch?v=FdzJmTCVyJU",
    "description": "Given an array of meeting time intervals `intervals`, return the minimum number of conference rooms required.",
    "examples": [{ "input": "intervals = [[0,30],[5,10],[15,20]]", "output": "2", "explanation": "2 rooms needed." }],
    "constraints": ["1 <= intervals.length <= 10^4"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int minMeetingRooms(int[][] intervals) {\n        int[] starts = new int[intervals.length], ends = new int[intervals.length];\n        for (int i = 0; i < intervals.length; i++) { starts[i] = intervals[i][0]; ends[i] = intervals[i][1]; }\n        Arrays.sort(starts); Arrays.sort(ends);\n        int rooms = 0, endPtr = 0;\n        for (int i = 0; i < intervals.length; i++) {\n            if (starts[i] < ends[endPtr]) rooms++;\n            else endPtr++;\n        }\n        return rooms;\n    }\n    public static void main(String[] args) {\n        System.out.println(minMeetingRooms(new int[][]{{0,30},{5,10},{15,20}}));\n    }\n}",
      "cpp": "int minMeetingRooms(vector<vector<int>>& intervals) {\n    vector<int> starts, ends;\n    for (auto& i : intervals) { starts.push_back(i[0]); ends.push_back(i[1]); }\n    sort(starts.begin(), starts.end()); sort(ends.begin(), ends.end());\n    int rooms = 0, endPtr = 0;\n    for (int i = 0; i < starts.size(); i++) {\n        if (starts[i] < ends[endPtr]) rooms++;\n        else endPtr++;\n    }\n    return rooms;\n}",
      "python": "def minMeetingRooms(intervals: list[list[int]]) -> int:\n    starts = sorted([i[0] for i in intervals])\n    ends = sorted([i[1] for i in intervals])\n    rooms, end_ptr = 0, 0\n    for s in starts:\n        if s < ends[end_ptr]: rooms += 1\n        else: end_ptr += 1\n    return rooms",
      "javascript": "function minMeetingRooms(intervals) {\n    const starts = intervals.map(i => i[0]).sort((a, b) => a - b);\n    const ends = intervals.map(i => i[1]).sort((a, b) => a - b);\n    let rooms = 0, endPtr = 0;\n    for (let i = 0; i < starts.length; i++) {\n        if (starts[i] < ends[endPtr]) rooms++;\n        else endPtr++;\n    }\n    return rooms;\n}"
    },
    "testCases": [{ "input": "intervals = [[0,30],[5,10],[15,20]]", "expectedOutput": "2" }]
  }
]
;
