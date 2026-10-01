export default [
  {
    "id": "clone-graph",
    "category": "Graph",
    "categoryId": "graph",
    "title": "Clone Graph",
    "leetcodeNumber": 133,
    "difficulty": "Medium",
    "companies": ["Facebook", "Google", "Amazon"],
    "leetcodeUrl": "https://leetcode.com/problems/clone-graph/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/clone-graph/",
    "youtubeUrl": "https://www.youtube.com/watch?v=mQeF6bN8hMk",
    "description": "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    "examples": [{ "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]", "output": "[[2,4],[1,3],[2,4],[1,3]]", "explanation": "Deep copy of node 1." }],
    "constraints": ["The number of nodes in the graph is between [0, 100]."],
    "starterCode": {
      "java": "import java.util.*;\nclass Node { public int val; public List<Node> neighbors; public Node(int _val) { val = _val; neighbors = new ArrayList<>(); } }\npublic class Solution {\n    private static Map<Node, Node> visited = new HashMap<>();\n    public static Node cloneGraph(Node node) {\n        if (node == null) return null;\n        if (visited.containsKey(node)) return visited.get(node);\n        Node clone = new Node(node.val);\n        visited.put(node, clone);\n        for (Node n : node.neighbors) clone.neighbors.add(cloneGraph(n));\n        return clone;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Clone Graph ready\");\n    }\n}",
      "cpp": "unordered_map<Node*, Node*> visited;\nNode* cloneGraph(Node* node) {\n    if (!node) return nullptr;\n    if (visited.count(node)) return visited[node];\n    Node* clone = new Node(node->val);\n    visited[node] = clone;\n    for (auto n : node->neighbors) clone->neighbors.push_back(cloneGraph(n));\n    return clone;\n}",
      "python": "def cloneGraph(node: 'Node') -> 'Node':\n    if not node: return None\n    visited = {}\n    def dfs(n):\n        if n in visited: return visited[n]\n        c = Node(n.val); visited[n] = c\n        for nei in n.neighbors: c.neighbors.append(dfs(nei))\n        return c\n    return dfs(node)",
      "javascript": "function cloneGraph(node) {\n    if (!node) return null;\n    const visited = new Map();\n    function dfs(n) {\n        if (visited.has(n)) return visited.get(n);\n        const c = new Node(n.val); visited.set(n, c);\n        for (const nei of n.neighbors) c.neighbors.push(dfs(nei));\n        return c;\n    }\n    return dfs(node);\n}"
    },
    "testCases": [{ "input": "adjList = [[2,4],[1,3],[2,4],[1,3]]", "expectedOutput": "[[2,4],[1,3],[2,4],[1,3]]" }]
  },
  {
    "id": "course-schedule",
    "category": "Graph",
    "categoryId": "graph",
    "title": "Course Schedule I (Topological Sort / Cycle Detection)",
    "leetcodeNumber": 207,
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/course-schedule/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/course-schedule-i-and-ii-pre-requisite-tasks-topological-sort-g-24/",
    "youtubeUrl": "https://www.youtube.com/watch?v=WAOfKpxYHR8",
    "description": "There are a total of `numCourses` you have to take. Some courses may have prerequisites. Return `true` if you can finish all courses.",
    "examples": [{ "input": "numCourses = 2, prerequisites = [[1,0]]", "output": "true", "explanation": "Take course 0 then course 1." }],
    "constraints": ["1 <= numCourses <= 2000"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static boolean canFinish(int numCourses, int[][] prerequisites) {\n        List<List<Integer>> adj = new ArrayList<>();\n        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) { adj.get(p[1]).add(p[0]); inDegree[p[0]]++; }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.add(i);\n        int count = 0;\n        while (!q.isEmpty()) {\n            int cur = q.poll(); count++;\n            for (int next : adj.get(cur)) if (--inDegree[next] == 0) q.add(next);\n        }\n        return count == numCourses;\n    }\n    public static void main(String[] args) {\n        System.out.println(canFinish(2, new int[][]{{1,0}}));\n    }\n}",
      "cpp": "bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n    vector<vector<int>> adj(numCourses);\n    vector<int> inDegree(numCourses, 0);\n    for (auto& p : prerequisites) { adj[p[1]].push_back(p[0]); inDegree[p[0]]++; }\n    queue<int> q;\n    for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n    int count = 0;\n    while (!q.empty()) {\n        int cur = q.front(); q.pop(); count++;\n        for (int next : adj[cur]) if (--inDegree[next] == 0) q.push(next);\n    }\n    return count == numCourses;\n}",
      "python": "def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:\n    adj = [[] for _ in range(numCourses)]\n    in_degree = [0] * numCourses\n    for dest, src in prerequisites: adj[src].append(dest); in_degree[dest] += 1\n    q = [i for i in range(numCourses) if in_degree[i] == 0]\n    cnt = 0\n    for cur in q:\n        cnt += 1\n        for next_c in adj[cur]:\n            in_degree[next_c] -= 1\n            if in_degree[next_c] == 0: q.append(next_c)\n    return cnt == numCourses",
      "javascript": "function canFinish(numCourses, prerequisites) {\n    const adj = Array.from({ length: numCourses }, () => []);\n    const inDegree = new Array(numCourses).fill(0);\n    for (const [dest, src] of prerequisites) { adj[src].push(dest); inDegree[dest]++; }\n    const q = [];\n    for (let i = 0; i < numCourses; i++) if (inDegree[i] === 0) q.push(i);\n    let cnt = 0;\n    while (q.length > 0) {\n        const cur = q.shift(); cnt++;\n        for (const next of adj[cur]) if (--inDegree[next] === 0) q.push(next);\n    }\n    return cnt === numCourses;\n}"
    },
    "testCases": [{ "input": "numCourses = 2, prerequisites = [[1,0]]", "expectedOutput": "true" }]
  },
  {
    "id": "pacific-atlantic-water-flow",
    "category": "Graph",
    "categoryId": "graph",
    "title": "Pacific Atlantic Water Flow",
    "leetcodeNumber": 417,
    "difficulty": "Medium",
    "companies": ["Google", "Amazon"],
    "leetcodeUrl": "https://leetcode.com/problems/pacific-atlantic-water-flow/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/pacific-atlantic-water-flow/",
    "youtubeUrl": "https://www.youtube.com/watch?v=s-AngxEH39E",
    "description": "Return a 2D list of grid coordinates where water can flow to both Pacific and Atlantic oceans.",
    "examples": [{ "input": "heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]", "output": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]", "explanation": "Coordinates reaching both oceans." }],
    "constraints": ["m == heights.length", "n == heights[r].length", "1 <= m, n <= 200"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static List<List<Integer>> pacificAtlantic(int[][] heights) {\n        List<List<Integer>> res = new ArrayList<>();\n        int m = heights.length, n = heights[0].length;\n        boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];\n        for (int i = 0; i < m; i++) { dfs(heights, pac, i, 0, -1); dfs(heights, atl, i, n - 1, -1); }\n        for (int j = 0; j < n; j++) { dfs(heights, pac, 0, j, -1); dfs(heights, atl, m - 1, j, -1); }\n        for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) if (pac[i][j] && atl[i][j]) res.add(Arrays.asList(i, j));\n        return res;\n    }\n    private static void dfs(int[][] h, boolean[][] v, int r, int c, int prev) {\n        if (r < 0 || c < 0 || r >= h.length || c >= h[0].length || v[r][c] || h[r][c] < prev) return;\n        v[r][c] = true;\n        dfs(h, v, r + 1, c, h[r][c]); dfs(h, v, r - 1, c, h[r][c]);\n        dfs(h, v, r, c + 1, h[r][c]); dfs(h, v, r, c - 1, h[r][c]);\n    }\n    public static void main(String[] args) {\n        System.out.println(pacificAtlantic(new int[][]{{1,2},{3,4}}));\n    }\n}",
      "cpp": "void dfs(vector<vector<int>>& h, vector<vector<bool>>& v, int r, int c, int prev) {\n    if (r < 0 || c < 0 || r >= h.size() || c >= h[0].size() || v[r][c] || h[r][c] < prev) return;\n    v[r][c] = true;\n    dfs(h, v, r+1, c, h[r][c]); dfs(h, v, r-1, c, h[r][c]);\n    dfs(h, v, r, c+1, h[r][c]); dfs(h, v, r, c-1, h[r][c]);\n}\nvector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n    int m = heights.size(), n = heights[0].size();\n    vector<vector<bool>> pac(m, vector<bool>(n, false)), atl(m, vector<bool>(n, false));\n    for (int i = 0; i < m; i++) { dfs(heights, pac, i, 0, -1); dfs(heights, atl, i, n-1, -1); }\n    for (int j = 0; j < n; j++) { dfs(heights, pac, 0, j, -1); dfs(heights, atl, m-1, j, -1); }\n    vector<vector<int>> res;\n    for (int i = 0; i < m; i++) for (int j = 0; j < n; j++) if (pac[i][j] && atl[i][j]) res.push_back({i, j});\n    return res;\n}",
      "python": "def pacificAtlantic(heights: list[list[int]]) -> list[list[int]]:\n    m, n = len(heights), len(heights[0])\n    pac, atl = set(), set()\n    def dfs(r, c, visit, prev):\n        if (r, c) in visit or r < 0 or c < 0 or r >= m or c >= n or heights[r][c] < prev: return\n        visit.add((r, c))\n        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]: dfs(r+dr, c+dc, visit, heights[r][c])\n    for i in range(m): dfs(i, 0, pac, -1); dfs(i, n-1, atl, -1)\n    for j in range(n): dfs(0, j, pac, -1); dfs(m-1, j, atl, -1)\n    return [[r, c] for r, c in pac & atl]",
      "javascript": "function pacificAtlantic(heights) {\n    const m = heights.length, n = heights[0].length;\n    const pac = Array.from({ length: m }, () => new Array(n).fill(false));\n    const atl = Array.from({ length: m }, () => new Array(n).fill(false));\n    function dfs(r, c, v, prev) {\n        if (r < 0 || c < 0 || r >= m || c >= n || v[r][c] || heights[r][c] < prev) return;\n        v[r][c] = true;\n        dfs(r + 1, c, v, heights[r][c]); dfs(r - 1, c, v, heights[r][c]);\n        dfs(r, c + 1, v, heights[r][c]); dfs(r, c - 1, v, heights[r][c]);\n    }\n    for (let i = 0; i < m; i++) { dfs(i, 0, pac, -1); dfs(i, n - 1, atl, -1); }\n    for (let j = 0; j < n; j++) { dfs(0, j, pac, -1); dfs(m - 1, j, atl, -1); }\n    const res = [];\n    for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (pac[i][j] && atl[i][j]) res.push([i, j]);\n    return res;\n}"
    },
    "testCases": [{ "input": "heights = [[1,2],[3,4]]", "expectedOutput": "[[0, 1], [1, 0], [1, 1]]" }]
  },
  {
    "id": "number-of-islands",
    "category": "Graph",
    "categoryId": "graph",
    "title": "Number of Islands",
    "leetcodeNumber": 200,
    "difficulty": "Medium",
    "companies": ["Amazon", "Microsoft", "Google", "Meta"],
    "leetcodeUrl": "https://leetcode.com/problems/number-of-islands/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/number-of-distinct-islands/",
    "youtubeUrl": "https://www.youtube.com/watch?v=muncqlKJrH0",
    "description": "Given an `m x n` 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    "examples": [{ "input": "grid = [['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]", "output": "3", "explanation": "3 distinct islands." }],
    "constraints": ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300"],
    "starterCode": {
      "java": "public class Solution {\n    public static int numIslands(char[][] grid) {\n        int count = 0;\n        for (int i = 0; i < grid.length; i++) {\n            for (int j = 0; j < grid[0].length; j++) {\n                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }\n            }\n        }\n        return count;\n    }\n    private static void dfs(char[][] g, int r, int c) {\n        if (r < 0 || c < 0 || r >= g.length || c >= g[0].length || g[r][c] != '1') return;\n        g[r][c] = '0';\n        dfs(g, r + 1, c); dfs(g, r - 1, c); dfs(g, r, c + 1); dfs(g, r, c - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(numIslands(new char[][]{{'1','1','0'},{'1','1','0'},{'0','0','1'}}));\n    }\n}",
      "cpp": "void dfs(vector<vector<char>>& g, int r, int c) {\n    if (r < 0 || c < 0 || r >= g.size() || c >= g[0].size() || g[r][c] != '1') return;\n    g[r][c] = '0';\n    dfs(g, r+1, c); dfs(g, r-1, c); dfs(g, r, c+1); dfs(g, r, c-1);\n}\nint numIslands(vector<vector<char>>& grid) {\n    int cnt = 0;\n    for (int i = 0; i < grid.size(); i++) for (int j = 0; j < grid[0].size(); j++) if (grid[i][j] == '1') { cnt++; dfs(grid, i, j); }\n    return cnt;\n}",
      "python": "def numIslands(grid: list[list[str]]) -> int:\n    if not grid: return 0\n    m, n = len(grid), len(grid[0]); cnt = 0\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] != '1': return\n        grid[r][c] = '0'\n        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n    for i in range(m):\n        for j in range(n):\n            if grid[i][j] == '1': cnt += 1; dfs(i, j)\n    return cnt",
      "javascript": "function numIslands(grid) {\n    if (!grid.length) return 0;\n    const m = grid.length, n = grid[0].length;\n    let cnt = 0;\n    function dfs(r, c) {\n        if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== '1') return;\n        grid[r][c] = '0';\n        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n    }\n    for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (grid[i][j] === '1') { cnt++; dfs(i, j); }\n    return cnt;\n}"
    },
    "testCases": [{ "input": "grid = [['1','1','0'],['1','1','0'],['0','0','1']]", "expectedOutput": "2" }]
  },
  {
    "id": "longest-consecutive-sequence",
    "category": "Graph",
    "categoryId": "graph",
    "title": "Longest Consecutive Sequence",
    "leetcodeNumber": 128,
    "difficulty": "Medium",
    "companies": ["Google", "Amazon", "Spotify"],
    "leetcodeUrl": "https://leetcode.com/problems/longest-consecutive-sequence/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/longest-consecutive-sequence-in-an-array/",
    "youtubeUrl": "https://www.youtube.com/watch?v=oO5uLE7EUlM",
    "description": "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in O(n) time.",
    "examples": [{ "input": "nums = [100,4,200,1,3,2]", "output": "4", "explanation": "[1, 2, 3, 4] length 4." }],
    "constraints": ["0 <= nums.length <= 10^5"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static int longestConsecutive(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) set.add(n);\n        int maxL = 0;\n        for (int n : set) {\n            if (!set.contains(n - 1)) {\n                int cur = n, len = 1;\n                while (set.contains(cur + 1)) { cur++; len++; }\n                maxL = Math.max(maxL, len);\n            }\n        }\n        return maxL;\n    }\n    public static void main(String[] args) {\n        System.out.println(longestConsecutive(new int[]{100,4,200,1,3,2}));\n    }\n}",
      "cpp": "int longestConsecutive(vector<int>& nums) {\n    unordered_set<int> s(nums.begin(), nums.end());\n    int maxL = 0;\n    for (int n : s) {\n        if (!s.count(n - 1)) {\n            int cur = n, len = 1;\n            while (s.count(cur + 1)) { cur++; len++; }\n            maxL = max(maxL, len);\n        }\n    }\n    return maxL;\n}",
      "python": "def longestConsecutive(nums: list[int]) -> int:\n    num_set = set(nums); max_l = 0\n    for n in num_set:\n        if n - 1 not in num_set:\n            cur, l = n, 1\n            while cur + 1 in num_set: cur += 1; l += 1\n            max_l = max(max_l, l)\n    return max_l",
      "javascript": "function longestConsecutive(nums) {\n    const set = new Set(nums);\n    let maxL = 0;\n    for (const n of set) {\n        if (!set.has(n - 1)) {\n            let cur = n, len = 1;\n            while (set.has(cur + 1)) { cur++; len++; }\n            maxL = Math.max(maxL, len);\n        }\n    }\n    return maxL;\n}"
    },
    "testCases": [{ "input": "nums = [100,4,200,1,3,2]", "expectedOutput": "4" }]
  },
  {
    "id": "alien-dictionary",
    "category": "Graph",
    "categoryId": "graph",
    "title": "Alien Dictionary",
    "leetcodeNumber": 269,
    "difficulty": "Hard",
    "companies": ["Facebook", "Airbnb", "Amazon"],
    "leetcodeUrl": "https://leetcode.com/problems/alien-dictionary/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/alien-dictionary-topological-sort-g-26/",
    "youtubeUrl": "https://www.youtube.com/watch?v=U3N_je7tWAs",
    "description": "Given a sorted dictionary of an alien language, find the order of characters in the language.",
    "examples": [{ "input": "words = ['wrt','wrf','er','ett','rftt']", "output": "'wertf'", "explanation": "Lexicographical order is 'wertf'." }],
    "constraints": ["1 <= words.length <= 100", "1 <= words[i].length <= 100"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static String alienOrder(String[] words) {\n        Map<Character, Set<Character>> map = new HashMap<>();\n        Map<Character, Integer> degree = new HashMap<>();\n        for (String w : words) for (char c : w.toCharArray()) degree.put(c, 0);\n        for (int i = 0; i < words.length - 1; i++) {\n            String w1 = words[i], w2 = words[i + 1];\n            int min = Math.min(w1.length(), w2.length());\n            if (w1.length() > w2.length() && w1.startsWith(w2)) return \"\";\n            for (int j = 0; j < min; j++) {\n                char c1 = w1.charAt(j), c2 = w2.charAt(j);\n                if (c1 != c2) {\n                    map.putIfAbsent(c1, new HashSet<>());\n                    if (map.get(c1).add(c2)) degree.put(c2, degree.get(c2) + 1);\n                    break;\n                }\n            }\n        }\n        Queue<Character> q = new LinkedList<>();\n        for (char c : degree.keySet()) if (degree.get(c) == 0) q.add(c);\n        StringBuilder sb = new StringBuilder();\n        while (!q.isEmpty()) {\n            char c = q.poll(); sb.append(c);\n            if (map.containsKey(c)) {\n                for (char next : map.get(c)) {\n                    degree.put(next, degree.get(next) - 1);\n                    if (degree.get(next) == 0) q.add(next);\n                }\n            }\n        }\n        return sb.length() == degree.size() ? sb.toString() : \"\";\n    }\n    public static void main(String[] args) {\n        System.out.println(alienOrder(new String[]{\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"}));\n    }\n}",
      "cpp": "string alienOrder(vector<string>& words) {\n    unordered_map<char, unordered_set<char>> adj;\n    unordered_map<char, int> inDeg;\n    for (auto& w : words) for (char c : w) inDeg[c] = 0;\n    for (int i = 0; i < words.size() - 1; i++) {\n        string w1 = words[i], w2 = words[i+1];\n        int len = min(w1.size(), w2.size());\n        if (w1.size() > w2.size() && w1.substr(0, len) == w2) return \"\";\n        for (int j = 0; j < len; j++) {\n            if (w1[j] != w2[j]) {\n                if (!adj[w1[j]].count(w2[j])) { adj[w1[j]].insert(w2[j]); inDeg[w2[j]]++; }\n                break;\n            }\n        }\n    }\n    queue<char> q;\n    for (auto& p : inDeg) if (p.second == 0) q.push(p.first);\n    string res = \"\";\n    while (!q.empty()) {\n        char c = q.front(); q.pop(); res += c;\n        for (char nxt : adj[c]) if (--inDeg[nxt] == 0) q.push(nxt);\n    }\n    return res.size() == inDeg.size() ? res : \"\";\n}",
      "python": "def alienOrder(words: list[str]) -> str:\n    adj = {c: set() for w in words for c in w}\n    in_deg = {c: 0 for c in adj}\n    for i in range(len(words) - 1):\n        w1, w2 = words[i], words[i+1]\n        min_len = min(len(w1), len(w2))\n        if len(w1) > len(w2) and w1[:min_len] == w2: return \"\"\n        for j in range(min_len):\n            if w1[j] != w2[j]:\n                if w2[j] not in adj[w1[j]]: adj[w1[j]].add(w2[j]); in_deg[w2[j]] += 1\n                break\n    q = [c for c in in_deg if in_deg[c] == 0]\n    res = []\n    for c in q:\n        res.append(c)\n        for nxt in adj[c]:\n            in_deg[nxt] -= 1\n            if in_deg[nxt] == 0: q.append(nxt)\n    return \"\".join(res) if len(res) == len(in_deg) else \"\"",
      "javascript": "function alienOrder(words) {\n    const adj = new Map(), inDeg = new Map();\n    for (const w of words) for (const c of w) { if (!adj.has(c)) adj.set(c, new Set()); inDeg.set(c, 0); }\n    for (let i = 0; i < words.length - 1; i++) {\n        const w1 = words[i], w2 = words[i + 1];\n        const minLen = Math.min(w1.length, w2.length);\n        if (w1.length > w2.length && w1.startsWith(w2)) return \"\";\n        for (let j = 0; j < minLen; j++) {\n            if (w1[j] !== w2[j]) {\n                if (!adj.get(w1[j]).has(w2[j])) { adj.get(w1[j]).add(w2[j]); inDeg.set(w2[j], inDeg.get(w2[j]) + 1); }\n                break;\n            }\n        }\n    }\n    const q = [];\n    for (const [c, deg] of inDeg) if (deg === 0) q.push(c);\n    let res = \"\";\n    while (q.length > 0) {\n        const c = q.shift(); res += c;\n        for (const nxt of adj.get(c)) {\n            inDeg.set(nxt, inDeg.get(nxt) - 1);\n            if (inDeg.get(nxt) === 0) q.push(nxt);\n        }\n    }\n    return res.length === inDeg.size ? res : \"\";\n}"
    },
    "testCases": [{ "input": "words = ['wrt','wrf','er','ett','rftt']", "expectedOutput": "'wertf'" }]
  },
  {
    "id": "graph-valid-tree",
    "category": "Graph",
    "categoryId": "graph",
    "title": "Graph Valid Tree",
    "leetcodeNumber": 261,
    "difficulty": "Medium",
    "companies": ["Google", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/graph-valid-tree/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/graph-valid-tree/",
    "youtubeUrl": "https://www.youtube.com/watch?v=bXsUuownnoQ",
    "description": "Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges, determine if these edges make up a valid tree.",
    "examples": [{ "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", "output": "true", "explanation": "Tree is connected and has no cycles." }],
    "constraints": ["1 <= n <= 2000", "0 <= edges.length <= 5000"],
    "starterCode": {
      "java": "public class Solution {\n    public static boolean validTree(int n, int[][] edges) {\n        if (edges.length != n - 1) return false;\n        int[] parent = new int[n];\n        for (int i = 0; i < n; i++) parent[i] = i;\n        for (int[] e : edges) {\n            int p1 = find(parent, e[0]), p2 = find(parent, e[1]);\n            if (p1 == p2) return false;\n            parent[p1] = p2;\n        }\n        return true;\n    }\n    private static int find(int[] p, int i) {\n        if (p[i] == i) return i;\n        return p[i] = find(p, p[i]);\n    }\n    public static void main(String[] args) {\n        System.out.println(validTree(5, new int[][]{{0,1},{0,2},{0,3},{1,4}}));\n    }\n}",
      "cpp": "int findP(vector<int>& p, int i) { return p[i] == i ? i : p[i] = findP(p, p[i]); }\nbool validTree(int n, vector<vector<int>>& edges) {\n    if (edges.size() != n - 1) return false;\n    vector<int> p(n); for (int i = 0; i < n; i++) p[i] = i;\n    for (auto& e : edges) {\n        int p1 = findP(p, e[0]), p2 = findP(p, e[1]);\n        if (p1 == p2) return false;\n        p[p1] = p2;\n    }\n    return true;\n}",
      "python": "def validTree(n: int, edges: list[list[int]]) -> bool:\n    if len(edges) != n - 1: return False\n    p = list(range(n))\n    def find(i):\n        if p[i] != i: p[i] = find(p[i])\n        return p[i]\n    for u, v in edges:\n        p1, p2 = find(u), find(v)\n        if p1 == p2: return False\n        p[p1] = p2\n    return True",
      "javascript": "function validTree(n, edges) {\n    if (edges.length !== n - 1) return false;\n    const p = Array.from({ length: n }, (_, i) => i);\n    function find(i) { if (p[i] !== i) p[i] = find(p[i]); return p[i]; }\n    for (const [u, v] of edges) {\n        const p1 = find(u), p2 = find(v);\n        if (p1 === p2) return false;\n        p[p1] = p2;\n    }\n    return true;\n}"
    },
    "testCases": [{ "input": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]", "expectedOutput": "true" }]
  },
  {
    "id": "number-of-connected-components",
    "category": "Graph",
    "categoryId": "graph",
    "title": "Number of Connected Components in an Undirected Graph",
    "leetcodeNumber": 323,
    "difficulty": "Medium",
    "companies": ["Google", "Twitter", "Amazon"],
    "leetcodeUrl": "https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/connected-components/",
    "youtubeUrl": "https://www.youtube.com/watch?v=8f1XPm4WOUc",
    "description": "Given `n` nodes labeled from `0` to `n - 1` and a list of undirected edges, return the number of connected components.",
    "examples": [{ "input": "n = 5, edges = [[0,1],[1,2],[3,4]]", "output": "2", "explanation": "Components: [0,1,2] and [3,4]." }],
    "constraints": ["1 <= n <= 2000"],
    "starterCode": {
      "java": "public class Solution {\n    public static int countComponents(int n, int[][] edges) {\n        int[] p = new int[n]; for (int i = 0; i < n; i++) p[i] = i;\n        int count = n;\n        for (int[] e : edges) {\n            int p1 = find(p, e[0]), p2 = find(p, e[1]);\n            if (p1 != p2) { p[p1] = p2; count--; }\n        }\n        return count;\n    }\n    private static int find(int[] p, int i) { return p[i] == i ? i : (p[i] = find(p, p[i])); }\n    public static void main(String[] args) {\n        System.out.println(countComponents(5, new int[][]{{0,1},{1,2},{3,4}}));\n    }\n}",
      "cpp": "int findP(vector<int>& p, int i) { return p[i] == i ? i : p[i] = findP(p, p[i]); }\nint countComponents(int n, vector<vector<int>>& edges) {\n    vector<int> p(n); for (int i = 0; i < n; i++) p[i] = i;\n    int count = n;\n    for (auto& e : edges) {\n        int p1 = findP(p, e[0]), p2 = findP(p, e[1]);\n        if (p1 != p2) { p[p1] = p2; count--; }\n    }\n    return count;\n}",
      "python": "def countComponents(n: int, edges: list[list[int]]) -> int:\n    p = list(range(n)); count = n\n    def find(i):\n        if p[i] != i: p[i] = find(p[i])\n        return p[i]\n    for u, v in edges:\n        p1, p2 = find(u), find(v)\n        if p1 != p2: p[p1] = p2; count -= 1\n    return count",
      "javascript": "function countComponents(n, edges) {\n    const p = Array.from({ length: n }, (_, i) => i);\n    let count = n;\n    function find(i) { if (p[i] !== i) p[i] = find(p[i]); return p[i]; }\n    for (const [u, v] of edges) {\n        const p1 = find(u), p2 = find(v);\n        if (p1 !== p2) { p[p1] = p2; count--; }\n    }\n    return count;\n}"
    },
    "testCases": [{ "input": "n = 5, edges = [[0,1],[1,2],[3,4]]", "expectedOutput": "2" }]
  }
]
;
