export default [
  {
    "id": "reverse-linked-list",
    "category": "Linked List",
    "categoryId": "linked-list",
    "title": "Reverse Linked List",
    "leetcodeNumber": 206,
    "difficulty": "Easy",
    "companies": ["Amazon", "Apple", "Google", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/reverse-linked-list/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/reverse-a-linked-list/",
    "youtubeUrl": "https://www.youtube.com/watch?v=D2tBbq0tZp8",
    "description": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    "examples": [{ "input": "head = [1,2,3,4,5]", "output": "[5,4,3,2,1]", "explanation": "Reversed linked list." }],
    "constraints": ["0 <= numberOfNodes <= 5000"],
    "starterCode": {
      "java": "class ListNode { int val; ListNode next; ListNode(int x) { val = x; } }\npublic class Solution {\n    public static ListNode reverseList(ListNode head) {\n        ListNode prev = null, cur = head;\n        while (cur != null) { ListNode next = cur.next; cur.next = prev; prev = cur; cur = next; }\n        return prev;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Reverse Linked List ready\");\n    }\n}",
      "cpp": "ListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *cur = head;\n    while (cur) { ListNode* next = cur->next; cur->next = prev; prev = cur; cur = next; }\n    return prev;\n}",
      "python": "def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:\n    prev, cur = None, head\n    while cur:\n        nxt = cur.next\n        cur.next = prev\n        prev = cur\n        cur = nxt\n    return prev",
      "javascript": "function reverseList(head) {\n    let prev = null, cur = head;\n    while (cur) { const next = cur.next; cur.next = prev; prev = cur; cur = next; }\n    return prev;\n}"
    },
    "testCases": [{ "input": "head = [1,2,3,4,5]", "expectedOutput": "[5, 4, 3, 2, 1]" }]
  },
  {
    "id": "linked-list-cycle",
    "category": "Linked List",
    "categoryId": "linked-list",
    "title": "Detect Cycle in a Linked List (Tortoise & Hare)",
    "leetcodeNumber": 141,
    "difficulty": "Easy",
    "companies": ["Amazon", "Microsoft", "Spotify"],
    "leetcodeUrl": "https://leetcode.com/problems/linked-list-cycle/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/detect-a-cycle-in-a-linked-list/",
    "youtubeUrl": "https://www.youtube.com/watch?v=wiOo4DC5GGA",
    "description": "Given head, the head of a linked list, determine if the linked list has a cycle in it using Floyd's Tortoise and Hare algorithm in O(1) memory.",
    "examples": [{ "input": "head = [3,2,0,-4], pos = 1", "output": "true", "explanation": "There is a cycle linking tail to index 1." }],
    "constraints": ["0 <= numberOfNodes <= 10^4"],
    "starterCode": {
      "java": "public class Solution {\n    public static boolean hasCycle(ListNode head) {\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) {\n            slow = slow.next;\n            fast = fast.next.next;\n            if (slow == fast) return true;\n        }\n        return false;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Cycle Detection ready\");\n    }\n}",
      "cpp": "bool hasCycle(ListNode *head) {\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) {\n        slow = slow->next;\n        fast = fast->next->next;\n        if (slow == fast) return true;\n    }\n    return false;\n}",
      "python": "def hasCycle(head: Optional[ListNode]) -> bool:\n    slow, fast = head, head\n    while fast and fast.next:\n        slow, fast = slow.next, fast.next.next\n        if slow == fast: return True\n    return False",
      "javascript": "function hasCycle(head) {\n    let slow = head, fast = head;\n    while (fast && fast.next) {\n        slow = slow.next;\n        fast = fast.next.next;\n        if (slow === fast) return true;\n    }\n    return false;\n}"
    },
    "testCases": [{ "input": "head = [3,2,0,-4], pos = 1", "expectedOutput": "true" }]
  },
  {
    "id": "merge-two-sorted-lists",
    "category": "Linked List",
    "categoryId": "linked-list",
    "title": "Merge Two Sorted Lists",
    "leetcodeNumber": 21,
    "difficulty": "Easy",
    "companies": ["Amazon", "Apple", "Google"],
    "leetcodeUrl": "https://leetcode.com/problems/merge-two-sorted-lists/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/merge-two-sorted-linked-lists/",
    "youtubeUrl": "https://www.youtube.com/watch?v=Xb4slcp1U38",
    "description": "Merge two sorted linked lists and return it as a sorted list.",
    "examples": [{ "input": "list1 = [1,2,4], list2 = [1,3,4]", "output": "[1,1,2,3,4,4]", "explanation": "Merged sorted list." }],
    "constraints": ["0 <= numberOfNodes <= 50"],
    "starterCode": {
      "java": "public class Solution {\n    public static ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0), cur = dummy;\n        while (l1 != null && l2 != null) {\n            if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }\n            else { cur.next = l2; l2 = l2.next; }\n            cur = cur.next;\n        }\n        cur.next = (l1 != null) ? l1 : l2;\n        return dummy.next;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Merge Two Lists ready\");\n    }\n}",
      "cpp": "ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    ListNode dummy(0); ListNode* cur = &dummy;\n    while (l1 && l2) {\n        if (l1->val <= l2->val) { cur->next = l1; l1 = l1->next; }\n        else { cur->next = l2; l2 = l2->next; }\n        cur = cur->next;\n    }\n    cur->next = l1 ? l1 : l2;\n    return dummy.next;\n}",
      "python": "def mergeTwoLists(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n    dummy = cur = ListNode(0)\n    while l1 and l2:\n        if l1.val <= l2.val: cur.next = l1; l1 = l1.next\n        else: cur.next = l2; l2 = l2.next\n        cur = cur.next\n    cur.next = l1 or l2\n    return dummy.next",
      "javascript": "function mergeTwoLists(l1, l2) {\n    const dummy = new ListNode(0); let cur = dummy;\n    while (l1 && l2) {\n        if (l1.val <= l2.val) { cur.next = l1; l1 = l1.next; }\n        else { cur.next = l2; l2 = l2.next; }\n        cur = cur.next;\n    }\n    cur.next = l1 || l2;\n    return dummy.next;\n}"
    },
    "testCases": [{ "input": "list1 = [1,2,4], list2 = [1,3,4]", "expectedOutput": "[1, 1, 2, 3, 4, 4]" }]
  },
  {
    "id": "merge-k-sorted-lists",
    "category": "Linked List",
    "categoryId": "linked-list",
    "title": "Merge k Sorted Lists",
    "leetcodeNumber": 23,
    "difficulty": "Hard",
    "companies": ["Facebook", "Google", "Amazon", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/merge-k-sorted-lists/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/merge-k-sorted-lists/",
    "youtubeUrl": "https://www.youtube.com/watch?v=1z5JWDXx6zQ",
    "description": "You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    "examples": [{ "input": "lists = [[1,4,5],[1,3,4],[2,6]]", "output": "[1,1,2,3,4,4,5,6]", "explanation": "Merged all k lists." }],
    "constraints": ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500"],
    "starterCode": {
      "java": "import java.util.*;\npublic class Solution {\n    public static ListNode mergeKLists(ListNode[] lists) {\n        if (lists == null || lists.length == 0) return null;\n        PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);\n        for (ListNode node : lists) if (node != null) pq.add(node);\n        ListNode dummy = new ListNode(0), cur = dummy;\n        while (!pq.isEmpty()) {\n            ListNode node = pq.poll();\n            cur.next = node;\n            cur = cur.next;\n            if (node.next != null) pq.add(node.next);\n        }\n        return dummy.next;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Merge K Lists ready\");\n    }\n}",
      "cpp": "ListNode* mergeKLists(vector<ListNode*>& lists) {\n    auto comp = [](ListNode* a, ListNode* b) { return a->val > b->val; };\n    priority_queue<ListNode*, vector<ListNode*>, decltype(comp)> pq(comp);\n    for (auto node : lists) if (node) pq.push(node);\n    ListNode dummy(0); ListNode* cur = &dummy;\n    while (!pq.empty()) {\n        auto node = pq.top(); pq.pop();\n        cur->next = node; cur = cur->next;\n        if (node->next) pq.push(node->next);\n    }\n    return dummy.next;\n}",
      "python": "import heapq\ndef mergeKLists(lists: list[Optional[ListNode]]) -> Optional[ListNode]:\n    heap = []\n    for i, node in enumerate(lists):\n        if node: heapq.heappush(heap, (node.val, i, node))\n    dummy = cur = ListNode(0)\n    while heap:\n        val, i, node = heapq.heappop(heap)\n        cur.next = node; cur = cur.next\n        if node.next: heapq.heappush(heap, (node.next.val, i, node.next))\n    return dummy.next",
      "javascript": "function mergeKLists(lists) {\n    const arr = [];\n    for (let node of lists) while (node) { arr.push(node.val); node = node.next; }\n    arr.sort((a, b) => a - b);\n    const dummy = new ListNode(0); let cur = dummy;\n    for (const val of arr) { cur.next = new ListNode(val); cur = cur.next; }\n    return dummy.next;\n}"
    },
    "testCases": [{ "input": "lists = [[1,4,5],[1,3,4],[2,6]]", "expectedOutput": "[1, 1, 2, 3, 4, 4, 5, 6]" }]
  },
  {
    "id": "remove-nth-node-from-end-of-list",
    "category": "Linked List",
    "categoryId": "linked-list",
    "title": "Remove Nth Node From End of List",
    "leetcodeNumber": 19,
    "difficulty": "Medium",
    "companies": ["Amazon", "Google", "Facebook"],
    "leetcodeUrl": "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/remove-n-th-node-from-the-end-of-a-linked-list/",
    "youtubeUrl": "https://www.youtube.com/watch?v=Lhu3MsXZy-Q",
    "description": "Given the head of a linked list, remove the nth node from the end of the list and return its head in one pass.",
    "examples": [{ "input": "head = [1,2,3,4,5], n = 2", "output": "[1,2,3,5]", "explanation": "Removed second from end." }],
    "constraints": ["1 <= numberOfNodes <= 30", "1 <= n <= numberOfNodes"],
    "starterCode": {
      "java": "public class Solution {\n    public static ListNode removeNthFromEnd(ListNode head, int n) {\n        ListNode dummy = new ListNode(0);\n        dummy.next = head;\n        ListNode fast = dummy, slow = dummy;\n        for (int i = 0; i <= n; i++) fast = fast.next;\n        while (fast != null) { fast = fast.next; slow = slow.next; }\n        slow.next = slow.next.next;\n        return dummy.next;\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Remove Nth Node ready\");\n    }\n}",
      "cpp": "ListNode* removeNthFromEnd(ListNode* head, int n) {\n    ListNode dummy(0); dummy.next = head;\n    ListNode *fast = &dummy, *slow = &dummy;\n    for (int i = 0; i <= n; i++) fast = fast->next;\n    while (fast) { fast = fast->next; slow = slow->next; }\n    slow->next = slow->next->next;\n    return dummy.next;\n}",
      "python": "def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:\n    dummy = ListNode(0, head)\n    fast = slow = dummy\n    for _ in range(n + 1): fast = fast.next\n    while fast: fast = fast.next; slow = slow.next\n    slow.next = slow.next.next\n    return dummy.next",
      "javascript": "function removeNthFromEnd(head, n) {\n    const dummy = new ListNode(0); dummy.next = head;\n    let fast = dummy, slow = dummy;\n    for (let i = 0; i <= n; i++) fast = fast.next;\n    while (fast) { fast = fast.next; slow = slow.next; }\n    slow.next = slow.next.next;\n    return dummy.next;\n}"
    },
    "testCases": [{ "input": "head = [1,2,3,4,5], n = 2", "expectedOutput": "[1, 2, 3, 5]" }]
  },
  {
    "id": "reorder-list",
    "category": "Linked List",
    "categoryId": "linked-list",
    "title": "Reorder List",
    "leetcodeNumber": 143,
    "difficulty": "Medium",
    "companies": ["Amazon", "Facebook", "Microsoft"],
    "leetcodeUrl": "https://leetcode.com/problems/reorder-list/",
    "takeuforwardUrl": "https://takeuforward.org/data-structure/reorder-list/",
    "youtubeUrl": "https://www.youtube.com/watch?v=S5bfdUTrKLc",
    "description": "Reorder list to: L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ... in-place.",
    "examples": [{ "input": "head = [1,2,3,4]", "output": "[1,4,2,3]", "explanation": "Reordered list." }],
    "constraints": ["1 <= numberOfNodes <= 5 * 10^4"],
    "starterCode": {
      "java": "public class Solution {\n    public static void reorderList(ListNode head) {\n        if (head == null || head.next == null) return;\n        ListNode slow = head, fast = head;\n        while (fast != null && fast.next != null) { slow = slow.next; fast = fast.next.next; }\n        ListNode prev = null, cur = slow.next; slow.next = null;\n        while (cur != null) { ListNode next = cur.next; cur.next = prev; prev = cur; cur = next; }\n        ListNode first = head, second = prev;\n        while (second != null) {\n            ListNode tmp1 = first.next, tmp2 = second.next;\n            first.next = second; second.next = tmp1;\n            first = tmp1; second = tmp2;\n        }\n    }\n    public static void main(String[] args) {\n        System.out.println(\"Reorder List ready\");\n    }\n}",
      "cpp": "void reorderList(ListNode* head) {\n    if (!head || !head->next) return;\n    ListNode *slow = head, *fast = head;\n    while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }\n    ListNode *prev = nullptr, *cur = slow->next; slow->next = nullptr;\n    while (cur) { ListNode* nxt = cur->next; cur->next = prev; prev = cur; cur = nxt; }\n    ListNode *first = head, *second = prev;\n    while (second) {\n        ListNode *t1 = first->next, *t2 = second->next;\n        first->next = second; second->next = t1;\n        first = t1; second = t2;\n    }\n}",
      "python": "def reorderList(head: Optional[ListNode]) -> None:\n    if not head or not head.next: return\n    slow, fast = head, head\n    while fast and fast.next: slow, fast = slow.next, fast.next.next\n    prev, cur = None, slow.next; slow.next = None\n    while cur: nxt = cur.next; cur.next = prev; prev = cur; cur = nxt\n    first, second = head, prev\n    while second:\n        t1, t2 = first.next, second.next\n        first.next = second; second.next = t1\n        first, second = t1, t2",
      "javascript": "function reorderList(head) {\n    if (!head || !head.next) return;\n    let slow = head, fast = head;\n    while (fast && fast.next) { slow = slow.next; fast = fast.next.next; }\n    let prev = null, cur = slow.next; slow.next = null;\n    while (cur) { const nxt = cur.next; cur.next = prev; prev = cur; cur = nxt; }\n    let first = head, second = prev;\n    while (second) {\n        const t1 = first.next, t2 = second.next;\n        first.next = second; second.next = t1;\n        first = t1; second = t2;\n    }\n}"
    },
    "testCases": [{ "input": "head = [1,2,3,4]", "expectedOutput": "[1, 4, 2, 3]" }]
  }
]
;
