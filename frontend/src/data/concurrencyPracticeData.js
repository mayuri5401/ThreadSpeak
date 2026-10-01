// ============================================================================
// 50 Multithreaded Concurrency Implementation Practice Scenarios
// Complete interview and real-world concurrency dataset
// ============================================================================

export const CONCURRENCY_CATEGORIES = [
  {
    "id": "synchronization-primitives",
    "title": "Synchronization Primitives",
    "icon": "Lock",
    "color": "text-blue-400",
    "bg": "bg-blue-500/10",
    "border": "border-blue-500/20",
    "desc": "Mutexes, critical sections, Semaphores, Condition Variables, Read-Write Locks, CountDownLatches & Reusable Barriers."
  },
  {
    "id": "locking-strategies",
    "title": "Locking Strategies",
    "icon": "Key",
    "color": "text-amber-400",
    "bg": "bg-amber-500/10",
    "border": "border-amber-500/20",
    "desc": "Fine-grained locking, Reentrant Locks, Timed Locks, Two-Phase Locking & Optimistic vs Pessimistic locking."
  },
  {
    "id": "lock-free-programming",
    "title": "Lock-Free and Wait-Free Programming",
    "icon": "Zap",
    "color": "text-emerald-400",
    "bg": "bg-emerald-500/10",
    "border": "border-emerald-500/20",
    "desc": "Atomic variables, Compare-And-Swap (CAS) loops, memory fences & lock-free maximum finders."
  },
  {
    "id": "concurrency-challenges",
    "title": "Concurrency Challenges",
    "icon": "AlertTriangle",
    "color": "text-rose-400",
    "bg": "bg-rose-500/10",
    "border": "border-rose-500/20",
    "desc": "Deadlock prevention, lock ordering algorithms, resource hierarchy & cyclic dependency detection."
  },
  {
    "id": "concurrency-patterns",
    "title": "Concurrency Patterns",
    "icon": "Layers",
    "color": "text-cyan-400",
    "bg": "bg-cyan-500/10",
    "border": "border-cyan-500/20",
    "desc": "Producer-Consumer bounded queues, Futures/Promises, Thread Pools, Double-Checked Locking & Fork-Join reducers."
  },
  {
    "id": "classic-problems",
    "title": "Classic Problems",
    "icon": "Award",
    "color": "text-purple-400",
    "bg": "bg-purple-500/10",
    "border": "border-purple-500/20",
    "desc": "Print in Order, Building H2O, FizzBuzz Multithreaded, Dining Philosophers, Sleeping Barber & Readers-Writers."
  },
  {
    "id": "thread-safe-data-structures",
    "title": "Thread-Safe Data Structures",
    "icon": "Database",
    "color": "text-indigo-400",
    "bg": "bg-indigo-500/10",
    "border": "border-indigo-500/20",
    "desc": "Bounded Blocking Queues, Concurrent HashMaps, Priority Queues, Thread-Safe Tries & Concurrent Bloom Filters."
  },
  {
    "id": "multithreading-algorithms",
    "title": "Multithreading Algorithms",
    "icon": "Cpu",
    "color": "text-lime-400",
    "bg": "bg-lime-500/10",
    "border": "border-lime-500/20",
    "desc": "Parallel Array Mappers, Multi-threaded Merge Sort, Parallel Word Count & Concurrent Graph Traversals."
  },
  {
    "id": "concurrency-design-questions",
    "title": "Concurrency Design Questions",
    "icon": "Maximize2",
    "color": "text-teal-400",
    "bg": "bg-teal-500/10",
    "border": "border-teal-500/20",
    "desc": "Multithreaded Web Crawlers, TTL Caches, Rate Limiters, Ticket Booking, Connection Pools & Pub-Sub Brokers."
  }
];

export const CONCURRENCY_PROBLEMS = [
  {
    "id": "design-thread-safe-bank-account",
    "number": 1,
    "title": "Design a Thread-Safe Bank Account",
    "category": "synchronization-primitives",
    "categoryTitle": "Synchronization Primitives",
    "difficulty": "Medium",
    "topics": [
      "Mutex (Mutual Exclusion)"
    ],
    "narrative": "Design a bank account whose balance can be accessed safely by many threads.\n\nEvery operation must be thread-safe and linearizable. In particular, checking the balance and subtracting a withdrawal must be one atomic operation. Concurrent withdrawals must never make the balance negative.\n\nDifferent BankAccount instances must synchronize independently. The judge creates all customer threads; your class should protect its state rather than create threads itself.\n\nStandard concurrency and thread APIs are preloaded, so you do not need import, include, package, or using statements.",
    "className": "BankAccount",
    "constructorSig": "public BankAccount(long initialBalance)",
    "methods": [
      {
        "sig": "public void deposit(long amount)",
        "desc": "adds amount to the balance."
      },
      {
        "sig": "public boolean withdraw(long amount)",
        "desc": "subtracts amount and returns true if sufficient funds are available. Otherwise, leaves the balance unchanged and returns false."
      },
      {
        "sig": "public long getBalance()",
        "desc": "returns the current balance."
      }
    ],
    "rules": [
      "Checking the balance and subtracting a withdrawal must be one atomic operation.",
      "Concurrent withdrawals must never allow the balance to drop below zero.",
      "Operations on different account instances must execute without blocking one another."
    ],
    "examples": [
      {
        "input": "account = BankAccount(100)\naccount.deposit(50)\naccount.withdraw(30)\naccount.withdraw(150)\naccount.getBalance()",
        "output": "[true, false, 120]",
        "explanation": "The first withdrawal succeeds leaving 120. The second withdrawal requests 150 > 120, so it is rejected and balance remains 120."
      },
      {
        "input": "account = BankAccount(100)\ntwo threads call account.withdraw(80) simultaneously",
        "output": "one call returns true, one returns false, final balance = 20",
        "explanation": "Only one withdrawal succeeds atomically without race conditions."
      }
    ],
    "constraints": [
      "0 <= initialBalance <= 10^12",
      "1 <= amount <= 10^9",
      "At most 100,000 operations are performed per account.",
      "The balance always fits in a signed 64-bit integer.",
      "Every method may be called concurrently by multiple threads."
    ],
    "hints": [
      "Use `synchronized` methods, an `AtomicLong`, or a `ReentrantLock` to protect balance modifications.",
      "For `withdraw`, verify balance >= amount inside the synchronized block before deducting.",
      "Ensure `getBalance()` reads the volatile/synchronized state to prevent stale cached CPU reads."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new BankAccount(100)",
            "returns": "null"
          },
          {
            "call": "deposit(50)",
            "returns": "void"
          },
          {
            "call": "withdraw(30)",
            "returns": "true"
          },
          {
            "call": "withdraw(150)",
            "returns": "false"
          },
          {
            "call": "getBalance()",
            "returns": "120"
          }
        ],
        "input": "initial = 100, ops: deposit(50), withdraw(30), withdraw(150)",
        "expectedOutput": "[true, false, 120]"
      },
      {
        "name": "Case 2 (Contention)",
        "calls": [
          {
            "call": "new BankAccount(100)",
            "returns": "null"
          },
          {
            "call": "withdraw(80) [Thread-1]",
            "returns": "true"
          },
          {
            "call": "withdraw(80) [Thread-2]",
            "returns": "false"
          },
          {
            "call": "getBalance()",
            "returns": "20"
          }
        ],
        "input": "initial = 100, 2 concurrent threads call withdraw(80)",
        "expectedOutput": "[true, false, 20]"
      }
    ],
    "description": "Design a bank account whose balance can be accessed safely by many threads.\n\nEvery operation must be thread-safe and linearizable. In particular, checking the balance and subtracting a withdrawal must be one atomic operation. Concurrent withdrawals must never make the balance negative.\n\nDifferent BankAccount instances must synchronize independently. The judge creates all customer threads; your class should protect its state rather than create threads itself.\n\nStandard concurrency and thread APIs are preloaded, so you do not need import, include, package, or using statements.\n\n### Implement the `BankAccount` class:\n\n- `BankAccount(long initialBalance)` creates an initialized instance.\n- `void deposit(long amount)` adds amount to the balance.\n- `boolean withdraw(long amount)` subtracts amount and returns true if sufficient funds are available. Otherwise, leaves the balance unchanged and returns false.\n- `long getBalance()` returns the current balance.\n\n- Checking the balance and subtracting a withdrawal must be one atomic operation.\n- Concurrent withdrawals must never allow the balance to drop below zero.\n- Operations on different account instances must execute without blocking one another.\n\n#### Example 1:\n```\nInput:\naccount = BankAccount(100)\naccount.deposit(50)\naccount.withdraw(30)\naccount.withdraw(150)\naccount.getBalance()\n\nOutput:\n[true, false, 120]\n\nExplanation: The first withdrawal succeeds leaving 120. The second withdrawal requests 150 > 120, so it is rejected and balance remains 120.\n```\n\n#### Example 2:\n```\nInput:\naccount = BankAccount(100)\ntwo threads call account.withdraw(80) simultaneously\n\nOutput:\none call returns true, one returns false, final balance = 20\n\nExplanation: Only one withdrawal succeeds atomically without race conditions.\n```\n\n\n### Constraints\n- 0 <= initialBalance <= 10^12\n- 1 <= amount <= 10^9\n- At most 100,000 operations are performed per account.\n- The balance always fits in a signed 64-bit integer.\n- Every method may be called concurrently by multiple threads.\n",
    "starterCode": {
      "java": "class BankAccount {\n\n    public BankAccount(long initialBalance) {\n\n    }\n\n    public void deposit(long amount) {\n\n    }\n\n    public boolean withdraw(long amount) {\n        return false;\n    }\n\n    public long getBalance() {\n        return 0;\n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        BankAccount account = new BankAccount(100000);\n\n        Runnable customer = () -> {\n            for (int i = 0; i < 1000; i++) {\n                account.deposit(7);\n                account.withdraw(5);\n            }\n        };\n\n        Thread first = new Thread(customer);\n        Thread second = new Thread(customer);\n\n        first.start();\n        second.start();\n\n        first.join();\n        second.join();\n\n        // Each iteration adds 7 and removes 5, so this always prints 104000.\n        System.out.println(account.getBalance());\n    }\n}\n*/",
      "python": "import threading\n\nclass BankAccount:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class BankAccount {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Thread-Safe Bank Account\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-thread-safe-inventory",
    "number": 2,
    "title": "Design a Thread-Safe Inventory",
    "category": "synchronization-primitives",
    "categoryTitle": "Synchronization Primitives",
    "difficulty": "Medium",
    "topics": [
      "Race Conditions and Critical Sections"
    ],
    "narrative": "Design an inventory management system where multiple threads add stock and purchase items concurrently without overselling.",
    "className": "ThreadSafeInventory",
    "constructorSig": "public ThreadSafeInventory()",
    "methods": [
      {
        "sig": "public void addStock(String item, int count)",
        "desc": "increases stock count of item atomically."
      },
      {
        "sig": "public boolean purchase(String item, int count)",
        "desc": "decrements stock if count <= available; returns true if successful, false otherwise."
      },
      {
        "sig": "public int getStock(String item)",
        "desc": "returns current stock level of item."
      }
    ],
    "rules": [
      "Never allow stock to drop below 0 under concurrent purchases.",
      "Different items should ideally lock independently for high throughput."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ThreadSafeInventory",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ThreadSafeInventory()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design an inventory management system where multiple threads add stock and purchase items concurrently without overselling.\n\n### Implement the `ThreadSafeInventory` class:\n\n- `ThreadSafeInventory()` creates an initialized instance.\n- `void addStock(String item, int count)` increases stock count of item atomically.\n- `boolean purchase(String item, int count)` decrements stock if count <= available; returns true if successful, false otherwise.\n- `int getStock(String item)` returns current stock level of item.\n\n- Never allow stock to drop below 0 under concurrent purchases.\n- Different items should ideally lock independently for high throughput.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ThreadSafeInventory\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ThreadSafeInventory {\n\n    public ThreadSafeInventory() {\n\n    }\n\n    public void addStock(String item, int count) {\n        \n    }\n\n    public boolean purchase(String item, int count) {\n        \n    }\n\n    public int getStock(String item) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ThreadSafeInventory instance = new ThreadSafeInventory();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ThreadSafeInventory:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ThreadSafeInventory {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Thread-Safe Inventory\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-concurrency-limiter-with-semaphore",
    "number": 3,
    "title": "Design a Concurrency Limiter With a Semaphore",
    "category": "synchronization-primitives",
    "categoryTitle": "Synchronization Primitives",
    "difficulty": "Medium",
    "topics": [
      "Semaphores"
    ],
    "narrative": "Design a concurrency limiter that allows at most K concurrent tasks to execute concurrently using custom Semaphore semantics.",
    "className": "ConcurrencyLimiter",
    "constructorSig": "public ConcurrencyLimiter(int maxPermits)",
    "methods": [
      {
        "sig": "public void acquire() throws InterruptedException",
        "desc": "blocks until a permit is available and acquires it."
      },
      {
        "sig": "public void release()",
        "desc": "returns a permit, releasing a blocked waiting thread."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ConcurrencyLimiter",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ConcurrencyLimiter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a concurrency limiter that allows at most K concurrent tasks to execute concurrently using custom Semaphore semantics.\n\n### Implement the `ConcurrencyLimiter` class:\n\n- `ConcurrencyLimiter(int maxPermits)` creates an initialized instance.\n- `void acquire() throws InterruptedException` blocks until a permit is available and acquires it.\n- `void release()` returns a permit, releasing a blocked waiting thread.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ConcurrencyLimiter\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ConcurrencyLimiter {\n\n    public ConcurrencyLimiter(int maxPermits) {\n\n    }\n\n    public void acquire() throws InterruptedException {\n        \n    }\n\n    public void release() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ConcurrencyLimiter instance = new ConcurrencyLimiter();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ConcurrencyLimiter:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ConcurrencyLimiter {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Concurrency Limiter With a Semaphore\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-versioned-signal",
    "number": 4,
    "title": "Design a Versioned Signal",
    "category": "synchronization-primitives",
    "categoryTitle": "Synchronization Primitives",
    "difficulty": "Medium",
    "topics": [
      "Condition Variables"
    ],
    "narrative": "Design a synchronization signal that increments a monotonically increasing version number and wakes threads waiting for specific versions.",
    "className": "VersionedSignal",
    "constructorSig": "public VersionedSignal(int initialVersion)",
    "methods": [
      {
        "sig": "public void awaitVersion(int targetVersion) throws InterruptedException",
        "desc": "blocks until current version >= targetVersion."
      },
      {
        "sig": "public void emitSignal()",
        "desc": "increments version and wakes all qualifying awaiters."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on VersionedSignal",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new VersionedSignal()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a synchronization signal that increments a monotonically increasing version number and wakes threads waiting for specific versions.\n\n### Implement the `VersionedSignal` class:\n\n- `VersionedSignal(int initialVersion)` creates an initialized instance.\n- `void awaitVersion(int targetVersion) throws InterruptedException` blocks until current version >= targetVersion.\n- `void emitSignal()` increments version and wakes all qualifying awaiters.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on VersionedSignal\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class VersionedSignal {\n\n    public VersionedSignal(int initialVersion) {\n\n    }\n\n    public void awaitVersion(int targetVersion) throws InterruptedException {\n        \n    }\n\n    public void emitSignal() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        VersionedSignal instance = new VersionedSignal();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass VersionedSignal:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class VersionedSignal {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Versioned Signal\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-read-write-coordinator",
    "number": 5,
    "title": "Design a Read-Write Coordinator",
    "category": "synchronization-primitives",
    "categoryTitle": "Synchronization Primitives",
    "difficulty": "Medium",
    "topics": [
      "Read-Write Locks"
    ],
    "narrative": "Implement a fair Read-Write Lock where multiple readers can read concurrently, but writers acquire exclusive access without reader starvation.",
    "className": "ReadWriteCoordinator",
    "constructorSig": "public ReadWriteCoordinator()",
    "methods": [
      {
        "sig": "public void acquireReadLock() throws InterruptedException",
        "desc": "acquires shared read access."
      },
      {
        "sig": "public void releaseReadLock()",
        "desc": "releases shared read access."
      },
      {
        "sig": "public void acquireWriteLock() throws InterruptedException",
        "desc": "acquires exclusive write access."
      },
      {
        "sig": "public void releaseWriteLock()",
        "desc": "releases exclusive write access."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ReadWriteCoordinator",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ReadWriteCoordinator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a fair Read-Write Lock where multiple readers can read concurrently, but writers acquire exclusive access without reader starvation.\n\n### Implement the `ReadWriteCoordinator` class:\n\n- `ReadWriteCoordinator()` creates an initialized instance.\n- `void acquireReadLock() throws InterruptedException` acquires shared read access.\n- `void releaseReadLock()` releases shared read access.\n- `void acquireWriteLock() throws InterruptedException` acquires exclusive write access.\n- `void releaseWriteLock()` releases exclusive write access.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ReadWriteCoordinator\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ReadWriteCoordinator {\n\n    public ReadWriteCoordinator() {\n\n    }\n\n    public void acquireReadLock() throws InterruptedException {\n        \n    }\n\n    public void releaseReadLock() {\n        \n    }\n\n    public void acquireWriteLock() throws InterruptedException {\n        \n    }\n\n    public void releaseWriteLock() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ReadWriteCoordinator instance = new ReadWriteCoordinator();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ReadWriteCoordinator:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ReadWriteCoordinator {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Read-Write Coordinator\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-countdown-latch",
    "number": 6,
    "title": "Design a CountDown Latch",
    "category": "synchronization-primitives",
    "categoryTitle": "Synchronization Primitives",
    "difficulty": "Medium",
    "topics": [
      "Barriers and Latches"
    ],
    "narrative": "Implement a thread synchronization primitive equivalent to CountDownLatch initialized with a given count.",
    "className": "CustomCountDownLatch",
    "constructorSig": "public CustomCountDownLatch(int count)",
    "methods": [
      {
        "sig": "public void countDown()",
        "desc": "decrements the latch count, releasing all waiting threads when it hits 0."
      },
      {
        "sig": "public void await() throws InterruptedException",
        "desc": "causes the current thread to wait until the latch has counted down to zero."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on CustomCountDownLatch",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CustomCountDownLatch()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a thread synchronization primitive equivalent to CountDownLatch initialized with a given count.\n\n### Implement the `CustomCountDownLatch` class:\n\n- `CustomCountDownLatch(int count)` creates an initialized instance.\n- `void countDown()` decrements the latch count, releasing all waiting threads when it hits 0.\n- `void await() throws InterruptedException` causes the current thread to wait until the latch has counted down to zero.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on CustomCountDownLatch\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class CustomCountDownLatch {\n\n    public CustomCountDownLatch(int count) {\n\n    }\n\n    public void countDown() {\n        \n    }\n\n    public void await() throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        CustomCountDownLatch instance = new CustomCountDownLatch();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass CustomCountDownLatch:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class CustomCountDownLatch {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a CountDown Latch\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-reusable-barrier",
    "number": 7,
    "title": "Design a Reusable Barrier",
    "category": "synchronization-primitives",
    "categoryTitle": "Synchronization Primitives",
    "difficulty": "Medium",
    "topics": [
      "Barriers and Latches"
    ],
    "narrative": "Implement a reusable cyclic barrier that allows N threads to wait for each other to reach a common barrier point before repeating.",
    "className": "ReusableBarrier",
    "constructorSig": "public ReusableBarrier(int parties)",
    "methods": [
      {
        "sig": "public int await() throws InterruptedException",
        "desc": "waits until all parties have invoked await on this barrier."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ReusableBarrier",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ReusableBarrier()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a reusable cyclic barrier that allows N threads to wait for each other to reach a common barrier point before repeating.\n\n### Implement the `ReusableBarrier` class:\n\n- `ReusableBarrier(int parties)` creates an initialized instance.\n- `int await() throws InterruptedException` waits until all parties have invoked await on this barrier.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ReusableBarrier\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ReusableBarrier {\n\n    public ReusableBarrier(int parties) {\n\n    }\n\n    public int await() throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ReusableBarrier instance = new ReusableBarrier();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ReusableBarrier:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ReusableBarrier {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Reusable Barrier\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-keyed-task-executor",
    "number": 8,
    "title": "Design a Keyed Task Executor",
    "category": "locking-strategies",
    "categoryTitle": "Locking Strategies",
    "difficulty": "Medium",
    "topics": [
      "Coarse-grained vs Fine-grained Locking"
    ],
    "narrative": "Design a task executor where tasks with different keys run concurrently in parallel, while tasks sharing the same key run sequentially in FIFO order.",
    "className": "KeyedTaskExecutor",
    "constructorSig": "public KeyedTaskExecutor()",
    "methods": [
      {
        "sig": "public void execute(String key, Runnable task)",
        "desc": "submits a task associated with a key."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on KeyedTaskExecutor",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new KeyedTaskExecutor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a task executor where tasks with different keys run concurrently in parallel, while tasks sharing the same key run sequentially in FIFO order.\n\n### Implement the `KeyedTaskExecutor` class:\n\n- `KeyedTaskExecutor()` creates an initialized instance.\n- `void execute(String key, Runnable task)` submits a task associated with a key.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on KeyedTaskExecutor\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class KeyedTaskExecutor {\n\n    public KeyedTaskExecutor() {\n\n    }\n\n    public void execute(String key, Runnable task) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        KeyedTaskExecutor instance = new KeyedTaskExecutor();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass KeyedTaskExecutor:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class KeyedTaskExecutor {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Keyed Task Executor\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-recursive-accumulator",
    "number": 9,
    "title": "Design a Recursive Accumulator",
    "category": "locking-strategies",
    "categoryTitle": "Locking Strategies",
    "difficulty": "Medium",
    "topics": [
      "Reentrant Locks"
    ],
    "narrative": "Implement a thread-safe nested accumulator that supports recursive re-entrant lock acquisitions by the same thread without self-deadlock.",
    "className": "RecursiveAccumulator",
    "constructorSig": "public RecursiveAccumulator()",
    "methods": [
      {
        "sig": "public void accumulate(int depth, long value)",
        "desc": "recursively locks and aggregates values."
      },
      {
        "sig": "public long getTotal()",
        "desc": "returns the current accumulated total."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on RecursiveAccumulator",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new RecursiveAccumulator()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a thread-safe nested accumulator that supports recursive re-entrant lock acquisitions by the same thread without self-deadlock.\n\n### Implement the `RecursiveAccumulator` class:\n\n- `RecursiveAccumulator()` creates an initialized instance.\n- `void accumulate(int depth, long value)` recursively locks and aggregates values.\n- `long getTotal()` returns the current accumulated total.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on RecursiveAccumulator\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class RecursiveAccumulator {\n\n    public RecursiveAccumulator() {\n\n    }\n\n    public void accumulate(int depth, long value) {\n        \n    }\n\n    public long getTotal() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        RecursiveAccumulator instance = new RecursiveAccumulator();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass RecursiveAccumulator:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class RecursiveAccumulator {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Recursive Accumulator\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-timed-lock",
    "number": 10,
    "title": "Design a Timed Lock",
    "category": "locking-strategies",
    "categoryTitle": "Locking Strategies",
    "difficulty": "Medium",
    "topics": [
      "Try-Lock and Timed Locking"
    ],
    "narrative": "Design an explicit lock supporting non-blocking tryLock() and timed tryLock(timeoutMs) with immediate abort upon timeout.",
    "className": "TimedLock",
    "constructorSig": "public TimedLock()",
    "methods": [
      {
        "sig": "public boolean tryLock(long timeoutMs) throws InterruptedException",
        "desc": "attempts to acquire lock within timeout period."
      },
      {
        "sig": "public void unlock()",
        "desc": "releases lock if held by current thread."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on TimedLock",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TimedLock()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design an explicit lock supporting non-blocking tryLock() and timed tryLock(timeoutMs) with immediate abort upon timeout.\n\n### Implement the `TimedLock` class:\n\n- `TimedLock()` creates an initialized instance.\n- `boolean tryLock(long timeoutMs) throws InterruptedException` attempts to acquire lock within timeout period.\n- `void unlock()` releases lock if held by current thread.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on TimedLock\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class TimedLock {\n\n    public TimedLock() {\n\n    }\n\n    public boolean tryLock(long timeoutMs) throws InterruptedException {\n        \n    }\n\n    public void unlock() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        TimedLock instance = new TimedLock();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass TimedLock:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class TimedLock {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Timed Lock\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-multi-key-transaction-executor",
    "number": 11,
    "title": "Design a Multi-Key Transaction Executor",
    "category": "locking-strategies",
    "categoryTitle": "Locking Strategies",
    "difficulty": "Medium",
    "topics": [
      "Two-Phase Locking"
    ],
    "narrative": "Design a transaction coordinator that acquires locks on multiple resource keys in a deterministic global order to prevent deadlocks (Two-Phase Locking).",
    "className": "MultiKeyTransactionExecutor",
    "constructorSig": "public MultiKeyTransactionExecutor()",
    "methods": [
      {
        "sig": "public boolean transfer(String fromKey, String toKey, long amount)",
        "desc": "atomically transfers amount between two accounts."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on MultiKeyTransactionExecutor",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new MultiKeyTransactionExecutor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a transaction coordinator that acquires locks on multiple resource keys in a deterministic global order to prevent deadlocks (Two-Phase Locking).\n\n### Implement the `MultiKeyTransactionExecutor` class:\n\n- `MultiKeyTransactionExecutor()` creates an initialized instance.\n- `boolean transfer(String fromKey, String toKey, long amount)` atomically transfers amount between two accounts.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on MultiKeyTransactionExecutor\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class MultiKeyTransactionExecutor {\n\n    public MultiKeyTransactionExecutor() {\n\n    }\n\n    public boolean transfer(String fromKey, String toKey, long amount) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        MultiKeyTransactionExecutor instance = new MultiKeyTransactionExecutor();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass MultiKeyTransactionExecutor:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class MultiKeyTransactionExecutor {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Multi-Key Transaction Executor\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-versioned-value-store",
    "number": 12,
    "title": "Design a Versioned Value Store",
    "category": "locking-strategies",
    "categoryTitle": "Locking Strategies",
    "difficulty": "Hard",
    "topics": [
      "Optimistic vs Pessimistic Locking"
    ],
    "narrative": "Implement an optimistic concurrency control (OCC) value store that validates version numbers before applying mutations, retrying on conflict.",
    "className": "VersionedValueStore",
    "constructorSig": "public VersionedValueStore()",
    "methods": [
      {
        "sig": "public boolean update(String key, String expectedVal, String newVal)",
        "desc": "updates value only if current matches expectedVal."
      },
      {
        "sig": "public String get(String key)",
        "desc": "returns current value."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on VersionedValueStore",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new VersionedValueStore()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement an optimistic concurrency control (OCC) value store that validates version numbers before applying mutations, retrying on conflict.\n\n### Implement the `VersionedValueStore` class:\n\n- `VersionedValueStore()` creates an initialized instance.\n- `boolean update(String key, String expectedVal, String newVal)` updates value only if current matches expectedVal.\n- `String get(String key)` returns current value.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on VersionedValueStore\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class VersionedValueStore {\n\n    public VersionedValueStore() {\n\n    }\n\n    public boolean update(String key, String expectedVal, String newVal) {\n        \n    }\n\n    public String get(String key) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        VersionedValueStore instance = new VersionedValueStore();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass VersionedValueStore:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class VersionedValueStore {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Versioned Value Store\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-atomic-counter",
    "number": 13,
    "title": "Design an Atomic Counter",
    "category": "lock-free-programming",
    "categoryTitle": "Lock-Free and Wait-Free Programming",
    "difficulty": "Easy",
    "topics": [
      "Atomic Operations"
    ],
    "narrative": "Implement a high-performance thread-safe counter using hardware atomic CAS instructions without mutex locks.",
    "className": "AtomicCounter",
    "constructorSig": "public AtomicCounter(long initialValue)",
    "methods": [
      {
        "sig": "public long incrementAndGet()",
        "desc": "atomically increments by 1 and returns updated value."
      },
      {
        "sig": "public long addAndGet(long delta)",
        "desc": "atomically adds delta and returns updated value."
      },
      {
        "sig": "public long get()",
        "desc": "returns current value with volatile visibility."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on AtomicCounter",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new AtomicCounter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a high-performance thread-safe counter using hardware atomic CAS instructions without mutex locks.\n\n### Implement the `AtomicCounter` class:\n\n- `AtomicCounter(long initialValue)` creates an initialized instance.\n- `long incrementAndGet()` atomically increments by 1 and returns updated value.\n- `long addAndGet(long delta)` atomically adds delta and returns updated value.\n- `long get()` returns current value with volatile visibility.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on AtomicCounter\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class AtomicCounter {\n\n    public AtomicCounter(long initialValue) {\n\n    }\n\n    public long incrementAndGet() {\n        \n    }\n\n    public long addAndGet(long delta) {\n        \n    }\n\n    public long get() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        AtomicCounter instance = new AtomicCounter();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass AtomicCounter:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class AtomicCounter {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design an Atomic Counter\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-atomic-maximum-with-compare-and-swap",
    "number": 14,
    "title": "Design an Atomic Maximum With Compare-and-Swap",
    "category": "lock-free-programming",
    "categoryTitle": "Lock-Free and Wait-Free Programming",
    "difficulty": "Medium",
    "topics": [
      "Compare-And-Swap (CAS)"
    ],
    "narrative": "Implement a lock-free tracker that atomically updates the maximum observed value across thousands of concurrent threads using a CAS retry loop.",
    "className": "AtomicMaximum",
    "constructorSig": "public AtomicMaximum()",
    "methods": [
      {
        "sig": "public void updateMax(long value)",
        "desc": "atomically sets max = max(currentMax, value)."
      },
      {
        "sig": "public long getMax()",
        "desc": "returns the maximum observed value."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on AtomicMaximum",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new AtomicMaximum()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a lock-free tracker that atomically updates the maximum observed value across thousands of concurrent threads using a CAS retry loop.\n\n### Implement the `AtomicMaximum` class:\n\n- `AtomicMaximum()` creates an initialized instance.\n- `void updateMax(long value)` atomically sets max = max(currentMax, value).\n- `long getMax()` returns the maximum observed value.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on AtomicMaximum\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class AtomicMaximum {\n\n    public AtomicMaximum() {\n\n    }\n\n    public void updateMax(long value) {\n        \n    }\n\n    public long getMax() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        AtomicMaximum instance = new AtomicMaximum();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass AtomicMaximum:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class AtomicMaximum {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design an Atomic Maximum With Compare-and-Swap\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-deadlock-free-two-key-executor",
    "number": 15,
    "title": "Design a Deadlock-Free Two-Key Executor",
    "category": "concurrency-challenges",
    "categoryTitle": "Concurrency Challenges",
    "difficulty": "Medium",
    "topics": [
      "Deadlock Prevention"
    ],
    "narrative": "Design a mechanism that executes operations on two shared resources without deadlocking, even when threads request locks in reverse orders.",
    "className": "DeadlockFreeExecutor",
    "constructorSig": "public DeadlockFreeExecutor()",
    "methods": [
      {
        "sig": "public void execute(String keyA, String keyB, Runnable action)",
        "desc": "acquires both keys in canonical order before executing action."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on DeadlockFreeExecutor",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DeadlockFreeExecutor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a mechanism that executes operations on two shared resources without deadlocking, even when threads request locks in reverse orders.\n\n### Implement the `DeadlockFreeExecutor` class:\n\n- `DeadlockFreeExecutor()` creates an initialized instance.\n- `void execute(String keyA, String keyB, Runnable action)` acquires both keys in canonical order before executing action.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on DeadlockFreeExecutor\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class DeadlockFreeExecutor {\n\n    public DeadlockFreeExecutor() {\n\n    }\n\n    public void execute(String keyA, String keyB, Runnable action) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        DeadlockFreeExecutor instance = new DeadlockFreeExecutor();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass DeadlockFreeExecutor:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class DeadlockFreeExecutor {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Deadlock-Free Two-Key Executor\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-closable-bounded-queue",
    "number": 16,
    "title": "Design a Closable Bounded Queue",
    "category": "concurrency-patterns",
    "categoryTitle": "Concurrency Patterns",
    "difficulty": "Medium",
    "topics": [
      "Producer-Consumer Pattern"
    ],
    "narrative": "Implement a thread-safe bounded FIFO queue that supports graceful closure: producers cannot enqueue once closed, while consumers drain remaining items.",
    "className": "ClosableBoundedQueue",
    "constructorSig": "public ClosableBoundedQueue(int capacity)",
    "methods": [
      {
        "sig": "public boolean enqueue(int item) throws InterruptedException",
        "desc": "blocks if full; returns false if closed."
      },
      {
        "sig": "public Integer dequeue() throws InterruptedException",
        "desc": "blocks if empty; returns null when empty and closed."
      },
      {
        "sig": "public void close()",
        "desc": "marks queue closed and wakes all waiting threads."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ClosableBoundedQueue",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ClosableBoundedQueue()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a thread-safe bounded FIFO queue that supports graceful closure: producers cannot enqueue once closed, while consumers drain remaining items.\n\n### Implement the `ClosableBoundedQueue` class:\n\n- `ClosableBoundedQueue(int capacity)` creates an initialized instance.\n- `boolean enqueue(int item) throws InterruptedException` blocks if full; returns false if closed.\n- `Integer dequeue() throws InterruptedException` blocks if empty; returns null when empty and closed.\n- `void close()` marks queue closed and wakes all waiting threads.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ClosableBoundedQueue\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ClosableBoundedQueue {\n\n    public ClosableBoundedQueue(int capacity) {\n\n    }\n\n    public boolean enqueue(int item) throws InterruptedException {\n        \n    }\n\n    public Integer dequeue() throws InterruptedException {\n        \n    }\n\n    public void close() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ClosableBoundedQueue instance = new ClosableBoundedQueue();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ClosableBoundedQueue:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ClosableBoundedQueue {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Closable Bounded Queue\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-one-shot-promise",
    "number": 17,
    "title": "Design a One-Shot Promise",
    "category": "concurrency-patterns",
    "categoryTitle": "Concurrency Patterns",
    "difficulty": "Medium",
    "topics": [
      "Future/Promise Pattern"
    ],
    "narrative": "Design a single-assignment Future/Promise construct that allows one thread to fulfill a value and any number of threads to await the result.",
    "className": "OneShotPromise",
    "constructorSig": "public OneShotPromise()",
    "methods": [
      {
        "sig": "public void resolve(String value)",
        "desc": "sets the promise value once and wakes all awaiting threads."
      },
      {
        "sig": "public String get() throws InterruptedException",
        "desc": "blocks until promise is resolved and returns value."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on OneShotPromise",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new OneShotPromise()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a single-assignment Future/Promise construct that allows one thread to fulfill a value and any number of threads to await the result.\n\n### Implement the `OneShotPromise` class:\n\n- `OneShotPromise()` creates an initialized instance.\n- `void resolve(String value)` sets the promise value once and wakes all awaiting threads.\n- `String get() throws InterruptedException` blocks until promise is resolved and returns value.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on OneShotPromise\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class OneShotPromise {\n\n    public OneShotPromise() {\n\n    }\n\n    public void resolve(String value) {\n        \n    }\n\n    public String get() throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        OneShotPromise instance = new OneShotPromise();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass OneShotPromise:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class OneShotPromise {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a One-Shot Promise\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-thread-pool",
    "number": 18,
    "title": "Design a Thread Pool",
    "category": "concurrency-patterns",
    "categoryTitle": "Concurrency Patterns",
    "difficulty": "Hard",
    "topics": [
      "Thread Pool Pattern"
    ],
    "narrative": "Implement a fixed-size worker thread pool that accepts Runnable tasks into a shared work queue and executes them across N worker threads.",
    "className": "CustomThreadPool",
    "constructorSig": "public CustomThreadPool(int poolSize)",
    "methods": [
      {
        "sig": "public void submit(Runnable task)",
        "desc": "adds task to queue for worker threads to execute."
      },
      {
        "sig": "public void shutdown()",
        "desc": "stops accepting tasks and gracefully terminates workers after draining."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on CustomThreadPool",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CustomThreadPool()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a fixed-size worker thread pool that accepts Runnable tasks into a shared work queue and executes them across N worker threads.\n\n### Implement the `CustomThreadPool` class:\n\n- `CustomThreadPool(int poolSize)` creates an initialized instance.\n- `void submit(Runnable task)` adds task to queue for worker threads to execute.\n- `void shutdown()` stops accepting tasks and gracefully terminates workers after draining.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on CustomThreadPool\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class CustomThreadPool {\n\n    public CustomThreadPool(int poolSize) {\n\n    }\n\n    public void submit(Runnable task) {\n        \n    }\n\n    public void shutdown() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        CustomThreadPool instance = new CustomThreadPool();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass CustomThreadPool:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class CustomThreadPool {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Thread Pool\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-thread-safe-lazy-value",
    "number": 19,
    "title": "Design a Thread-Safe Lazy Value",
    "category": "concurrency-patterns",
    "categoryTitle": "Concurrency Patterns",
    "difficulty": "Medium",
    "topics": [
      "Double-Checked Locking Pattern"
    ],
    "narrative": "Implement a lazy initialization wrapper using Double-Checked Locking with volatile semantics to guarantee single execution of supplier.",
    "className": "LazyValue",
    "constructorSig": "public LazyValue(java.util.function.Supplier<String> supplier)",
    "methods": [
      {
        "sig": "public String get()",
        "desc": "computes value on first call; subsequent calls return cached value in O(1)."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on LazyValue",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new LazyValue()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a lazy initialization wrapper using Double-Checked Locking with volatile semantics to guarantee single execution of supplier.\n\n### Implement the `LazyValue` class:\n\n- `LazyValue(java.util.function.Supplier<String> supplier)` creates an initialized instance.\n- `String get()` computes value on first call; subsequent calls return cached value in O(1).\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on LazyValue\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class LazyValue {\n\n    public LazyValue(java.util.function.Supplier<String> supplier) {\n\n    }\n\n    public String get() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        LazyValue instance = new LazyValue();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass LazyValue:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class LazyValue {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Thread-Safe Lazy Value\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-auto-reset-signal",
    "number": 20,
    "title": "Design an Auto-Reset Signal",
    "category": "concurrency-patterns",
    "categoryTitle": "Concurrency Patterns",
    "difficulty": "Medium",
    "topics": [
      "Signaling Pattern"
    ],
    "narrative": "Implement an Auto-Reset Event that wakes exactly one waiting thread upon signal() and automatically resets to unsignaled state.",
    "className": "AutoResetSignal",
    "constructorSig": "public AutoResetSignal(boolean initialState)",
    "methods": [
      {
        "sig": "public void set()",
        "desc": "sets signal, waking one waiting thread."
      },
      {
        "sig": "public void await() throws InterruptedException",
        "desc": "waits for signal, consuming it upon wakeup."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on AutoResetSignal",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new AutoResetSignal()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement an Auto-Reset Event that wakes exactly one waiting thread upon signal() and automatically resets to unsignaled state.\n\n### Implement the `AutoResetSignal` class:\n\n- `AutoResetSignal(boolean initialState)` creates an initialized instance.\n- `void set()` sets signal, waking one waiting thread.\n- `void await() throws InterruptedException` waits for signal, consuming it upon wakeup.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on AutoResetSignal\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class AutoResetSignal {\n\n    public AutoResetSignal(boolean initialState) {\n\n    }\n\n    public void set() {\n        \n    }\n\n    public void await() throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        AutoResetSignal instance = new AutoResetSignal();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass AutoResetSignal:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class AutoResetSignal {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design an Auto-Reset Signal\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-parallel-range-reducer",
    "number": 21,
    "title": "Design a Parallel Range Reducer",
    "category": "concurrency-patterns",
    "categoryTitle": "Concurrency Patterns",
    "difficulty": "Hard",
    "topics": [
      "Fork-Join Pattern"
    ],
    "narrative": "Implement a Fork-Join parallel range reducer that divides a large array into subtasks executed in parallel and combines results recursively.",
    "className": "ParallelRangeReducer",
    "constructorSig": "public ParallelRangeReducer(int threshold)",
    "methods": [
      {
        "sig": "public long sumRange(long[] array, int start, int end)",
        "desc": "computes array sum in parallel using divide-and-conquer."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ParallelRangeReducer",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ParallelRangeReducer()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a Fork-Join parallel range reducer that divides a large array into subtasks executed in parallel and combines results recursively.\n\n### Implement the `ParallelRangeReducer` class:\n\n- `ParallelRangeReducer(int threshold)` creates an initialized instance.\n- `long sumRange(long[] array, int start, int end)` computes array sum in parallel using divide-and-conquer.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ParallelRangeReducer\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ParallelRangeReducer {\n\n    public ParallelRangeReducer(int threshold) {\n\n    }\n\n    public long sumRange(long[] array, int start, int end) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ParallelRangeReducer instance = new ParallelRangeReducer();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ParallelRangeReducer:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ParallelRangeReducer {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Parallel Range Reducer\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "print-in-order",
    "number": 22,
    "title": "Print in Order",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Easy",
    "topics": [
      "Signaling Pattern"
    ],
    "narrative": "Suppose we have a class Foo where three threads run first(), second(), and third() concurrently. Guarantee that 'first', 'second', and 'third' are printed in strict sequential order regardless of thread scheduling.",
    "className": "Foo",
    "constructorSig": "public Foo()",
    "methods": [
      {
        "sig": "public void first(Runnable printFirst) throws InterruptedException",
        "desc": "executes printFirst.run() then unblocks second()."
      },
      {
        "sig": "public void second(Runnable printSecond) throws InterruptedException",
        "desc": "waits for first(), executes printSecond.run(), then unblocks third()."
      },
      {
        "sig": "public void third(Runnable printThird) throws InterruptedException",
        "desc": "waits for second() then executes printThird.run()."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on Foo",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new Foo()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Suppose we have a class Foo where three threads run first(), second(), and third() concurrently. Guarantee that 'first', 'second', and 'third' are printed in strict sequential order regardless of thread scheduling.\n\n### Implement the `Foo` class:\n\n- `Foo()` creates an initialized instance.\n- `void first(Runnable printFirst) throws InterruptedException` executes printFirst.run() then unblocks second().\n- `void second(Runnable printSecond) throws InterruptedException` waits for first(), executes printSecond.run(), then unblocks third().\n- `void third(Runnable printThird) throws InterruptedException` waits for second() then executes printThird.run().\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on Foo\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class Foo {\n\n    public Foo() {\n\n    }\n\n    public void first(Runnable printFirst) throws InterruptedException {\n        \n    }\n\n    public void second(Runnable printSecond) throws InterruptedException {\n        \n    }\n\n    public void third(Runnable printThird) throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        Foo instance = new Foo();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass Foo:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class Foo {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Print in Order\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "building-h2o",
    "number": 23,
    "title": "Building H2O",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Medium",
    "topics": [
      "Building H2O Molecule"
    ],
    "narrative": "There are two kinds of threads, oxygen and hydrogen. Synchronize them so that for every 2 hydrogen threads that pass the barrier, exactly 1 oxygen thread passes to form a water molecule.",
    "className": "H2O",
    "constructorSig": "public H2O()",
    "methods": [
      {
        "sig": "public void hydrogen(Runnable releaseHydrogen) throws InterruptedException",
        "desc": "releases H atom when 2H + 1O ratio is maintained."
      },
      {
        "sig": "public void oxygen(Runnable releaseOxygen) throws InterruptedException",
        "desc": "releases O atom when paired with 2 hydrogen atoms."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on H2O",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new H2O()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "There are two kinds of threads, oxygen and hydrogen. Synchronize them so that for every 2 hydrogen threads that pass the barrier, exactly 1 oxygen thread passes to form a water molecule.\n\n### Implement the `H2O` class:\n\n- `H2O()` creates an initialized instance.\n- `void hydrogen(Runnable releaseHydrogen) throws InterruptedException` releases H atom when 2H + 1O ratio is maintained.\n- `void oxygen(Runnable releaseOxygen) throws InterruptedException` releases O atom when paired with 2 hydrogen atoms.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on H2O\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class H2O {\n\n    public H2O() {\n\n    }\n\n    public void hydrogen(Runnable releaseHydrogen) throws InterruptedException {\n        \n    }\n\n    public void oxygen(Runnable releaseOxygen) throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        H2O instance = new H2O();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass H2O:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class H2O {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Building H2O\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "fizz-buzz-multithreaded",
    "number": 24,
    "title": "Fizz Buzz Multithreaded",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Medium",
    "topics": [
      "Fizz Buzz Multithreaded"
    ],
    "narrative": "You have four threads: Thread A calls fizz(), Thread B calls buzz(), Thread C calls fizzbuzz(), and Thread D calls number(). Synchronize them to output the FizzBuzz sequence from 1 to n.",
    "className": "FizzBuzz",
    "constructorSig": "public FizzBuzz(int n)",
    "methods": [
      {
        "sig": "public void fizz(Runnable printFizz) throws InterruptedException",
        "desc": "prints fizz for numbers divisible by 3 only."
      },
      {
        "sig": "public void buzz(Runnable printBuzz) throws InterruptedException",
        "desc": "prints buzz for numbers divisible by 5 only."
      },
      {
        "sig": "public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException",
        "desc": "prints fizzbuzz for numbers divisible by 15."
      },
      {
        "sig": "public void number(IntConsumer printNumber) throws InterruptedException",
        "desc": "prints the number if not divisible by 3 or 5."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on FizzBuzz",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new FizzBuzz()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "You have four threads: Thread A calls fizz(), Thread B calls buzz(), Thread C calls fizzbuzz(), and Thread D calls number(). Synchronize them to output the FizzBuzz sequence from 1 to n.\n\n### Implement the `FizzBuzz` class:\n\n- `FizzBuzz(int n)` creates an initialized instance.\n- `void fizz(Runnable printFizz) throws InterruptedException` prints fizz for numbers divisible by 3 only.\n- `void buzz(Runnable printBuzz) throws InterruptedException` prints buzz for numbers divisible by 5 only.\n- `void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException` prints fizzbuzz for numbers divisible by 15.\n- `void number(IntConsumer printNumber) throws InterruptedException` prints the number if not divisible by 3 or 5.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on FizzBuzz\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class FizzBuzz {\n\n    public FizzBuzz(int n) {\n\n    }\n\n    public void fizz(Runnable printFizz) throws InterruptedException {\n        \n    }\n\n    public void buzz(Runnable printBuzz) throws InterruptedException {\n        \n    }\n\n    public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException {\n        \n    }\n\n    public void number(IntConsumer printNumber) throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        FizzBuzz instance = new FizzBuzz();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass FizzBuzz:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class FizzBuzz {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Fizz Buzz Multithreaded\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "print-foobar-alternately",
    "number": 25,
    "title": "Print FooBar Alternately",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Medium",
    "topics": [
      "Print Foo Bar Alternately"
    ],
    "narrative": "Two threads are running: Thread A calls foo() and Thread B calls bar(). Synchronize them to alternate printing 'foobar' exactly n times.",
    "className": "FooBar",
    "constructorSig": "public FooBar(int n)",
    "methods": [
      {
        "sig": "public void foo(Runnable printFoo) throws InterruptedException",
        "desc": "prints 'foo' then signals bar()."
      },
      {
        "sig": "public void bar(Runnable printBar) throws InterruptedException",
        "desc": "waits for foo(), prints 'bar', then signals foo()."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on FooBar",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new FooBar()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Two threads are running: Thread A calls foo() and Thread B calls bar(). Synchronize them to alternate printing 'foobar' exactly n times.\n\n### Implement the `FooBar` class:\n\n- `FooBar(int n)` creates an initialized instance.\n- `void foo(Runnable printFoo) throws InterruptedException` prints 'foo' then signals bar().\n- `void bar(Runnable printBar) throws InterruptedException` waits for foo(), prints 'bar', then signals foo().\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on FooBar\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class FooBar {\n\n    public FooBar(int n) {\n\n    }\n\n    public void foo(Runnable printFoo) throws InterruptedException {\n        \n    }\n\n    public void bar(Runnable printBar) throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        FooBar instance = new FooBar();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass FooBar:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class FooBar {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Print FooBar Alternately\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "print-zero-even-odd",
    "number": 26,
    "title": "Print Zero Even Odd",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Medium",
    "topics": [
      "Print Zero Even Odd"
    ],
    "narrative": "Three threads run zero(), even(), and odd(). Synchronize them to output '0102030405...' up to 2n.",
    "className": "ZeroEvenOdd",
    "constructorSig": "public ZeroEvenOdd(int n)",
    "methods": [
      {
        "sig": "public void zero(IntConsumer printNumber) throws InterruptedException",
        "desc": "prints 0 before each number."
      },
      {
        "sig": "public void even(IntConsumer printNumber) throws InterruptedException",
        "desc": "prints even numbers (2, 4, 6...)."
      },
      {
        "sig": "public void odd(IntConsumer printNumber) throws InterruptedException",
        "desc": "prints odd numbers (1, 3, 5...)."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ZeroEvenOdd",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ZeroEvenOdd()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Three threads run zero(), even(), and odd(). Synchronize them to output '0102030405...' up to 2n.\n\n### Implement the `ZeroEvenOdd` class:\n\n- `ZeroEvenOdd(int n)` creates an initialized instance.\n- `void zero(IntConsumer printNumber) throws InterruptedException` prints 0 before each number.\n- `void even(IntConsumer printNumber) throws InterruptedException` prints even numbers (2, 4, 6...).\n- `void odd(IntConsumer printNumber) throws InterruptedException` prints odd numbers (1, 3, 5...).\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ZeroEvenOdd\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ZeroEvenOdd {\n\n    public ZeroEvenOdd(int n) {\n\n    }\n\n    public void zero(IntConsumer printNumber) throws InterruptedException {\n        \n    }\n\n    public void even(IntConsumer printNumber) throws InterruptedException {\n        \n    }\n\n    public void odd(IntConsumer printNumber) throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ZeroEvenOdd instance = new ZeroEvenOdd();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ZeroEvenOdd:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ZeroEvenOdd {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Print Zero Even Odd\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "dining-philosophers",
    "number": 27,
    "title": "The Dining Philosophers",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Medium",
    "topics": [
      "Dining Philosophers"
    ],
    "narrative": "Five silent philosophers sit at a round table with five forks. Implement wantsToEat() so philosophers pick up both left and right forks without deadlock or starvation.",
    "className": "DiningPhilosophers",
    "constructorSig": "public DiningPhilosophers()",
    "methods": [
      {
        "sig": "public void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork, Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException",
        "desc": "coordinates eating without deadlock."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on DiningPhilosophers",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DiningPhilosophers()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Five silent philosophers sit at a round table with five forks. Implement wantsToEat() so philosophers pick up both left and right forks without deadlock or starvation.\n\n### Implement the `DiningPhilosophers` class:\n\n- `DiningPhilosophers()` creates an initialized instance.\n- `void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork, Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException` coordinates eating without deadlock.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on DiningPhilosophers\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class DiningPhilosophers {\n\n    public DiningPhilosophers() {\n\n    }\n\n    public void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork, Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        DiningPhilosophers instance = new DiningPhilosophers();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass DiningPhilosophers:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class DiningPhilosophers {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: The Dining Philosophers\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "readers-writers-problem",
    "number": 28,
    "title": "Readers-Writers Problem",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Hard",
    "topics": [
      "Readers-Writers Problem"
    ],
    "narrative": "Design a synchronization protocol that prevents writer starvation while allowing multiple readers to access shared data concurrently.",
    "className": "ReadersWritersSolution",
    "constructorSig": "public ReadersWritersSolution()",
    "methods": [
      {
        "sig": "public void startRead() throws InterruptedException",
        "desc": "called before reading."
      },
      {
        "sig": "public void endRead()",
        "desc": "called after reading."
      },
      {
        "sig": "public void startWrite() throws InterruptedException",
        "desc": "called before writing."
      },
      {
        "sig": "public void endWrite()",
        "desc": "called after writing."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ReadersWritersSolution",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ReadersWritersSolution()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a synchronization protocol that prevents writer starvation while allowing multiple readers to access shared data concurrently.\n\n### Implement the `ReadersWritersSolution` class:\n\n- `ReadersWritersSolution()` creates an initialized instance.\n- `void startRead() throws InterruptedException` called before reading.\n- `void endRead()` called after reading.\n- `void startWrite() throws InterruptedException` called before writing.\n- `void endWrite()` called after writing.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ReadersWritersSolution\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ReadersWritersSolution {\n\n    public ReadersWritersSolution() {\n\n    }\n\n    public void startRead() throws InterruptedException {\n        \n    }\n\n    public void endRead() {\n        \n    }\n\n    public void startWrite() throws InterruptedException {\n        \n    }\n\n    public void endWrite() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ReadersWritersSolution instance = new ReadersWritersSolution();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ReadersWritersSolution:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ReadersWritersSolution {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Readers-Writers Problem\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "cigarette-smokers",
    "number": 29,
    "title": "Cigarette Smokers",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Hard",
    "topics": [
      "Cigarette Smokers Problem"
    ],
    "narrative": "Three smoker threads each possess infinite amounts of one ingredient (tobacco, paper, or matches). An agent places two random ingredients on the table. Synchronize the appropriate smoker to craft and smoke a cigarette.",
    "className": "CigaretteSmokers",
    "constructorSig": "public CigaretteSmokers()",
    "methods": [
      {
        "sig": "public void agentPut(int ingredientA, int ingredientB)",
        "desc": "agent supplies two ingredients."
      },
      {
        "sig": "public void smokerWithTobacco() throws InterruptedException",
        "desc": "smoker with tobacco waits for paper + matches."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on CigaretteSmokers",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new CigaretteSmokers()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Three smoker threads each possess infinite amounts of one ingredient (tobacco, paper, or matches). An agent places two random ingredients on the table. Synchronize the appropriate smoker to craft and smoke a cigarette.\n\n### Implement the `CigaretteSmokers` class:\n\n- `CigaretteSmokers()` creates an initialized instance.\n- `void agentPut(int ingredientA, int ingredientB)` agent supplies two ingredients.\n- `void smokerWithTobacco() throws InterruptedException` smoker with tobacco waits for paper + matches.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on CigaretteSmokers\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class CigaretteSmokers {\n\n    public CigaretteSmokers() {\n\n    }\n\n    public void agentPut(int ingredientA, int ingredientB) {\n        \n    }\n\n    public void smokerWithTobacco() throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        CigaretteSmokers instance = new CigaretteSmokers();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass CigaretteSmokers:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class CigaretteSmokers {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Cigarette Smokers\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "santa-claus-problem",
    "number": 30,
    "title": "Santa Claus Problem",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Hard",
    "topics": [
      "Santa Claus Problem"
    ],
    "narrative": "Santa sleeps until awakened by either all 9 reindeer returning from holiday or by 3 elves needing help with toys. Reindeer have priority over elves. Implement thread coordination for Santa, reindeer, and elves.",
    "className": "SantaClaus",
    "constructorSig": "public SantaClaus()",
    "methods": [
      {
        "sig": "public void reindeerArrived() throws InterruptedException",
        "desc": "reindeer reports back; 9th wakes Santa to deliver toys."
      },
      {
        "sig": "public void elfNeedsHelp() throws InterruptedException",
        "desc": "elf asks for help; groups of 3 wake Santa."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on SantaClaus",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new SantaClaus()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Santa sleeps until awakened by either all 9 reindeer returning from holiday or by 3 elves needing help with toys. Reindeer have priority over elves. Implement thread coordination for Santa, reindeer, and elves.\n\n### Implement the `SantaClaus` class:\n\n- `SantaClaus()` creates an initialized instance.\n- `void reindeerArrived() throws InterruptedException` reindeer reports back; 9th wakes Santa to deliver toys.\n- `void elfNeedsHelp() throws InterruptedException` elf asks for help; groups of 3 wake Santa.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on SantaClaus\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class SantaClaus {\n\n    public SantaClaus() {\n\n    }\n\n    public void reindeerArrived() throws InterruptedException {\n        \n    }\n\n    public void elfNeedsHelp() throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        SantaClaus instance = new SantaClaus();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass SantaClaus:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class SantaClaus {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Santa Claus Problem\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "sleeping-barber",
    "number": 31,
    "title": "Sleeping Barber",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Hard",
    "topics": [
      "Sleeping Barber"
    ],
    "narrative": "A barber shop has 1 barber, 1 barber chair, and N waiting chairs. When no customers are present, the barber sleeps. When a customer arrives, they wake the barber or wait if chairs are free, or leave if full.",
    "className": "SleepingBarber",
    "constructorSig": "public SleepingBarber(int waitingChairs)",
    "methods": [
      {
        "sig": "public boolean customerArrive() throws InterruptedException",
        "desc": "customer enters shop; returns false if all chairs full."
      },
      {
        "sig": "public void cutHair() throws InterruptedException",
        "desc": "barber cuts hair of waiting customer."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on SleepingBarber",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new SleepingBarber()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "A barber shop has 1 barber, 1 barber chair, and N waiting chairs. When no customers are present, the barber sleeps. When a customer arrives, they wake the barber or wait if chairs are free, or leave if full.\n\n### Implement the `SleepingBarber` class:\n\n- `SleepingBarber(int waitingChairs)` creates an initialized instance.\n- `boolean customerArrive() throws InterruptedException` customer enters shop; returns false if all chairs full.\n- `void cutHair() throws InterruptedException` barber cuts hair of waiting customer.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on SleepingBarber\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class SleepingBarber {\n\n    public SleepingBarber(int waitingChairs) {\n\n    }\n\n    public boolean customerArrive() throws InterruptedException {\n        \n    }\n\n    public void cutHair() throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        SleepingBarber instance = new SleepingBarber();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass SleepingBarber:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class SleepingBarber {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Sleeping Barber\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "unisex-bathroom",
    "number": 32,
    "title": "Unisex Bathroom",
    "category": "classic-problems",
    "categoryTitle": "Classic Problems",
    "difficulty": "Hard",
    "topics": [
      "Unisex Bathroom"
    ],
    "narrative": "A unisex bathroom can be used by multiple men or multiple women at the same time, but never both simultaneously, and with a capacity limit of K people.",
    "className": "UnisexBathroom",
    "constructorSig": "public UnisexBathroom(int capacity)",
    "methods": [
      {
        "sig": "public void womanEnter() throws InterruptedException",
        "desc": "woman enters if no men inside and space available."
      },
      {
        "sig": "public void womanExit()",
        "desc": "woman leaves bathroom."
      },
      {
        "sig": "public void manEnter() throws InterruptedException",
        "desc": "man enters if no women inside and space available."
      },
      {
        "sig": "public void manExit()",
        "desc": "man leaves bathroom."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on UnisexBathroom",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new UnisexBathroom()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "A unisex bathroom can be used by multiple men or multiple women at the same time, but never both simultaneously, and with a capacity limit of K people.\n\n### Implement the `UnisexBathroom` class:\n\n- `UnisexBathroom(int capacity)` creates an initialized instance.\n- `void womanEnter() throws InterruptedException` woman enters if no men inside and space available.\n- `void womanExit()` woman leaves bathroom.\n- `void manEnter() throws InterruptedException` man enters if no women inside and space available.\n- `void manExit()` man leaves bathroom.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on UnisexBathroom\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class UnisexBathroom {\n\n    public UnisexBathroom(int capacity) {\n\n    }\n\n    public void womanEnter() throws InterruptedException {\n        \n    }\n\n    public void womanExit() {\n        \n    }\n\n    public void manEnter() throws InterruptedException {\n        \n    }\n\n    public void manExit() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        UnisexBathroom instance = new UnisexBathroom();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass UnisexBathroom:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class UnisexBathroom {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Unisex Bathroom\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-bounded-blocking-queue",
    "number": 33,
    "title": "Design Bounded Blocking Queue",
    "category": "thread-safe-data-structures",
    "categoryTitle": "Thread-Safe Data Structures",
    "difficulty": "Medium",
    "topics": [
      "Design Thread-Safe Blocking Queue"
    ],
    "narrative": "Implement a thread-safe bounded FIFO blocking queue using circular array buffers and Condition variables for empty/full signaling.",
    "className": "BoundedBlockingQueue",
    "constructorSig": "public BoundedBlockingQueue(int capacity)",
    "methods": [
      {
        "sig": "public void enqueue(int element) throws InterruptedException",
        "desc": "adds element to tail; blocks if full."
      },
      {
        "sig": "public int dequeue() throws InterruptedException",
        "desc": "removes element from head; blocks if empty."
      },
      {
        "sig": "public int size()",
        "desc": "returns current number of elements."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on BoundedBlockingQueue",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new BoundedBlockingQueue()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a thread-safe bounded FIFO blocking queue using circular array buffers and Condition variables for empty/full signaling.\n\n### Implement the `BoundedBlockingQueue` class:\n\n- `BoundedBlockingQueue(int capacity)` creates an initialized instance.\n- `void enqueue(int element) throws InterruptedException` adds element to tail; blocks if full.\n- `int dequeue() throws InterruptedException` removes element from head; blocks if empty.\n- `int size()` returns current number of elements.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on BoundedBlockingQueue\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class BoundedBlockingQueue {\n\n    public BoundedBlockingQueue(int capacity) {\n\n    }\n\n    public void enqueue(int element) throws InterruptedException {\n        \n    }\n\n    public int dequeue() throws InterruptedException {\n        \n    }\n\n    public int size() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        BoundedBlockingQueue instance = new BoundedBlockingQueue();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass BoundedBlockingQueue:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class BoundedBlockingQueue {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Bounded Blocking Queue\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-concurrent-hash-map",
    "number": 34,
    "title": "Design Concurrent Hash Map",
    "category": "thread-safe-data-structures",
    "categoryTitle": "Thread-Safe Data Structures",
    "difficulty": "Medium",
    "topics": [
      "Design Concurrent HashMap"
    ],
    "narrative": "Implement a high-performance concurrent hash map with striped bucket locking to allow concurrent reads and writes across different hash buckets.",
    "className": "ConcurrentHashMap",
    "constructorSig": "public ConcurrentHashMap(int numBuckets)",
    "methods": [
      {
        "sig": "public void put(String key, int value)",
        "desc": "inserts or updates key under bucket lock."
      },
      {
        "sig": "public Integer get(String key)",
        "desc": "retrieves value in O(1) time."
      },
      {
        "sig": "public boolean remove(String key)",
        "desc": "removes key-value pair."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ConcurrentHashMap",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ConcurrentHashMap()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a high-performance concurrent hash map with striped bucket locking to allow concurrent reads and writes across different hash buckets.\n\n### Implement the `ConcurrentHashMap` class:\n\n- `ConcurrentHashMap(int numBuckets)` creates an initialized instance.\n- `void put(String key, int value)` inserts or updates key under bucket lock.\n- `Integer get(String key)` retrieves value in O(1) time.\n- `boolean remove(String key)` removes key-value pair.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ConcurrentHashMap\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ConcurrentHashMap {\n\n    public ConcurrentHashMap(int numBuckets) {\n\n    }\n\n    public void put(String key, int value) {\n        \n    }\n\n    public Integer get(String key) {\n        \n    }\n\n    public boolean remove(String key) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ConcurrentHashMap instance = new ConcurrentHashMap();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ConcurrentHashMap:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ConcurrentHashMap {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Concurrent Hash Map\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-concurrent-priority-queue",
    "number": 35,
    "title": "Design Concurrent Priority Queue",
    "category": "thread-safe-data-structures",
    "categoryTitle": "Thread-Safe Data Structures",
    "difficulty": "Medium",
    "topics": [
      "Design Concurrent Priority Queue"
    ],
    "narrative": "Implement a thread-safe priority queue where min/max elements are extracted with concurrent insertion and polling.",
    "className": "ConcurrentPriorityQueue",
    "constructorSig": "public ConcurrentPriorityQueue()",
    "methods": [
      {
        "sig": "public void offer(int val)",
        "desc": "inserts element into heap under lock."
      },
      {
        "sig": "public Integer poll()",
        "desc": "removes and returns lowest priority item."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ConcurrentPriorityQueue",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ConcurrentPriorityQueue()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a thread-safe priority queue where min/max elements are extracted with concurrent insertion and polling.\n\n### Implement the `ConcurrentPriorityQueue` class:\n\n- `ConcurrentPriorityQueue()` creates an initialized instance.\n- `void offer(int val)` inserts element into heap under lock.\n- `Integer poll()` removes and returns lowest priority item.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ConcurrentPriorityQueue\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ConcurrentPriorityQueue {\n\n    public ConcurrentPriorityQueue() {\n\n    }\n\n    public void offer(int val) {\n        \n    }\n\n    public Integer poll() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ConcurrentPriorityQueue instance = new ConcurrentPriorityQueue();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ConcurrentPriorityQueue:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ConcurrentPriorityQueue {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Concurrent Priority Queue\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-thread-safe-trie",
    "number": 36,
    "title": "Design Thread-Safe Trie",
    "category": "thread-safe-data-structures",
    "categoryTitle": "Thread-Safe Data Structures",
    "difficulty": "Medium",
    "topics": [
      "Design Thread-Safe Trie"
    ],
    "narrative": "Design a prefix tree (Trie) that supports concurrent insertion, prefix searches, and exact word matches using fine-grained node locks.",
    "className": "ThreadSafeTrie",
    "constructorSig": "public ThreadSafeTrie()",
    "methods": [
      {
        "sig": "public void insert(String word)",
        "desc": "inserts word into trie safely."
      },
      {
        "sig": "public boolean search(String word)",
        "desc": "returns true if word exists."
      },
      {
        "sig": "public boolean startsWith(String prefix)",
        "desc": "returns true if prefix exists."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ThreadSafeTrie",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ThreadSafeTrie()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a prefix tree (Trie) that supports concurrent insertion, prefix searches, and exact word matches using fine-grained node locks.\n\n### Implement the `ThreadSafeTrie` class:\n\n- `ThreadSafeTrie()` creates an initialized instance.\n- `void insert(String word)` inserts word into trie safely.\n- `boolean search(String word)` returns true if word exists.\n- `boolean startsWith(String prefix)` returns true if prefix exists.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ThreadSafeTrie\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ThreadSafeTrie {\n\n    public ThreadSafeTrie() {\n\n    }\n\n    public void insert(String word) {\n        \n    }\n\n    public boolean search(String word) {\n        \n    }\n\n    public boolean startsWith(String prefix) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ThreadSafeTrie instance = new ThreadSafeTrie();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ThreadSafeTrie:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ThreadSafeTrie {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Thread-Safe Trie\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-concurrent-bloom-filter",
    "number": 37,
    "title": "Design a Concurrent Bloom Filter",
    "category": "thread-safe-data-structures",
    "categoryTitle": "Thread-Safe Data Structures",
    "difficulty": "Medium",
    "topics": [
      "Design Concurrent Bloom Filter"
    ],
    "narrative": "Implement a concurrent space-efficient probabilistic set that sets bits using multiple hash functions using atomic bitset words.",
    "className": "ConcurrentBloomFilter",
    "constructorSig": "public ConcurrentBloomFilter(int bitSize, int numHashes)",
    "methods": [
      {
        "sig": "public void add(String element)",
        "desc": "sets k bit positions atomically."
      },
      {
        "sig": "public boolean mightContain(String element)",
        "desc": "returns true if all k bits are set."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ConcurrentBloomFilter",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ConcurrentBloomFilter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a concurrent space-efficient probabilistic set that sets bits using multiple hash functions using atomic bitset words.\n\n### Implement the `ConcurrentBloomFilter` class:\n\n- `ConcurrentBloomFilter(int bitSize, int numHashes)` creates an initialized instance.\n- `void add(String element)` sets k bit positions atomically.\n- `boolean mightContain(String element)` returns true if all k bits are set.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ConcurrentBloomFilter\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ConcurrentBloomFilter {\n\n    public ConcurrentBloomFilter(int bitSize, int numHashes) {\n\n    }\n\n    public void add(String element) {\n        \n    }\n\n    public boolean mightContain(String element) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ConcurrentBloomFilter instance = new ConcurrentBloomFilter();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ConcurrentBloomFilter:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ConcurrentBloomFilter {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Concurrent Bloom Filter\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-parallel-array-mapper",
    "number": 38,
    "title": "Design a Parallel Array Mapper",
    "category": "multithreading-algorithms",
    "categoryTitle": "Multithreading Algorithms",
    "difficulty": "Medium",
    "topics": [
      "Fork-Join Pattern"
    ],
    "narrative": "Design a parallel mapper that applies a transformation function across a massive array using chunked worker threads.",
    "className": "ParallelArrayMapper",
    "constructorSig": "public ParallelArrayMapper(int numThreads)",
    "methods": [
      {
        "sig": "public int[] map(int[] input, java.util.function.IntUnaryOperator func)",
        "desc": "transforms array in parallel chunks."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ParallelArrayMapper",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ParallelArrayMapper()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a parallel mapper that applies a transformation function across a massive array using chunked worker threads.\n\n### Implement the `ParallelArrayMapper` class:\n\n- `ParallelArrayMapper(int numThreads)` creates an initialized instance.\n- `int[] map(int[] input, java.util.function.IntUnaryOperator func)` transforms array in parallel chunks.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ParallelArrayMapper\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ParallelArrayMapper {\n\n    public ParallelArrayMapper(int numThreads) {\n\n    }\n\n    public int[] map(int[] input, java.util.function.IntUnaryOperator func) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ParallelArrayMapper instance = new ParallelArrayMapper();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ParallelArrayMapper:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ParallelArrayMapper {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Parallel Array Mapper\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-parallel-merge-sorter",
    "number": 39,
    "title": "Design a Parallel Merge Sorter",
    "category": "multithreading-algorithms",
    "categoryTitle": "Multithreading Algorithms",
    "difficulty": "Medium",
    "topics": [
      "Multi-threaded Merge Sort"
    ],
    "narrative": "Implement multithreaded Merge Sort where left and right halves are sorted in parallel worker threads before sequential merging.",
    "className": "ParallelMergeSorter",
    "constructorSig": "public ParallelMergeSorter(int maxDepth)",
    "methods": [
      {
        "sig": "public void sort(int[] array)",
        "desc": "sorts array in-place using parallel recursive divide-and-conquer."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ParallelMergeSorter",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ParallelMergeSorter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement multithreaded Merge Sort where left and right halves are sorted in parallel worker threads before sequential merging.\n\n### Implement the `ParallelMergeSorter` class:\n\n- `ParallelMergeSorter(int maxDepth)` creates an initialized instance.\n- `void sort(int[] array)` sorts array in-place using parallel recursive divide-and-conquer.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ParallelMergeSorter\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ParallelMergeSorter {\n\n    public ParallelMergeSorter(int maxDepth) {\n\n    }\n\n    public void sort(int[] array) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ParallelMergeSorter instance = new ParallelMergeSorter();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ParallelMergeSorter:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ParallelMergeSorter {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Parallel Merge Sorter\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-parallel-word-counter",
    "number": 40,
    "title": "Design a Parallel Word Counter",
    "category": "multithreading-algorithms",
    "categoryTitle": "Multithreading Algorithms",
    "difficulty": "Medium",
    "topics": [
      "Multi-threaded Word Frequency Counter"
    ],
    "narrative": "Design a multi-threaded word frequency aggregator that parses document chunks in parallel and reduces counts into a single concurrent map.",
    "className": "ParallelWordCounter",
    "constructorSig": "public ParallelWordCounter(int workerCount)",
    "methods": [
      {
        "sig": "public java.util.Map<String, Integer> countWords(java.util.List<String> lines)",
        "desc": "returns total word counts across all lines."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ParallelWordCounter",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ParallelWordCounter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a multi-threaded word frequency aggregator that parses document chunks in parallel and reduces counts into a single concurrent map.\n\n### Implement the `ParallelWordCounter` class:\n\n- `ParallelWordCounter(int workerCount)` creates an initialized instance.\n- `java.util.Map<String, Integer> countWords(java.util.List<String> lines)` returns total word counts across all lines.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ParallelWordCounter\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ParallelWordCounter {\n\n    public ParallelWordCounter(int workerCount) {\n\n    }\n\n    public java.util.Map<String, Integer> countWords(java.util.List<String> lines) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ParallelWordCounter instance = new ParallelWordCounter();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ParallelWordCounter:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ParallelWordCounter {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Parallel Word Counter\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-parallel-graph-traversal",
    "number": 41,
    "title": "Design a Parallel Graph Traversal",
    "category": "multithreading-algorithms",
    "categoryTitle": "Multithreading Algorithms",
    "difficulty": "Hard",
    "topics": [
      "Concurrent BFS/DFS Graph Traversal"
    ],
    "narrative": "Implement a thread-safe level-synchronous Parallel Breadth-First Search (BFS) using concurrent frontier sets and atomic visited bitsets.",
    "className": "ParallelGraphTraversal",
    "constructorSig": "public ParallelGraphTraversal()",
    "methods": [
      {
        "sig": "public java.util.List<Integer> parallelBfs(int startNode, java.util.Map<Integer, java.util.List<Integer>> graph)",
        "desc": "returns visited nodes in BFS level order."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ParallelGraphTraversal",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ParallelGraphTraversal()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a thread-safe level-synchronous Parallel Breadth-First Search (BFS) using concurrent frontier sets and atomic visited bitsets.\n\n### Implement the `ParallelGraphTraversal` class:\n\n- `ParallelGraphTraversal()` creates an initialized instance.\n- `java.util.List<Integer> parallelBfs(int startNode, java.util.Map<Integer, java.util.List<Integer>> graph)` returns visited nodes in BFS level order.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ParallelGraphTraversal\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ParallelGraphTraversal {\n\n    public ParallelGraphTraversal() {\n\n    }\n\n    public java.util.List<Integer> parallelBfs(int startNode, java.util.Map<Integer, java.util.List<Integer>> graph) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ParallelGraphTraversal instance = new ParallelGraphTraversal();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ParallelGraphTraversal:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ParallelGraphTraversal {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Parallel Graph Traversal\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-multithreaded-web-crawler",
    "number": 42,
    "title": "Design Multithreaded Web Crawler",
    "category": "concurrency-design-questions",
    "categoryTitle": "Concurrency Design Questions",
    "difficulty": "Medium",
    "topics": [
      "Design Multithreaded Web Crawler"
    ],
    "narrative": "Given a start URL and an HtmlParser interface, crawl all URLs under the same hostname using multiple worker threads without duplicate visits.",
    "className": "MultithreadedWebCrawler",
    "constructorSig": "public MultithreadedWebCrawler()",
    "methods": [
      {
        "sig": "public java.util.List<String> crawl(String startUrl, HtmlParser htmlParser)",
        "desc": "crawls all reachable same-host links in parallel."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on MultithreadedWebCrawler",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new MultithreadedWebCrawler()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Given a start URL and an HtmlParser interface, crawl all URLs under the same hostname using multiple worker threads without duplicate visits.\n\n### Implement the `MultithreadedWebCrawler` class:\n\n- `MultithreadedWebCrawler()` creates an initialized instance.\n- `java.util.List<String> crawl(String startUrl, HtmlParser htmlParser)` crawls all reachable same-host links in parallel.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on MultithreadedWebCrawler\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class MultithreadedWebCrawler {\n\n    public MultithreadedWebCrawler() {\n\n    }\n\n    public java.util.List<String> crawl(String startUrl, HtmlParser htmlParser) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        MultithreadedWebCrawler instance = new MultithreadedWebCrawler();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass MultithreadedWebCrawler:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class MultithreadedWebCrawler {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Multithreaded Web Crawler\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-thread-safe-cache-with-ttl",
    "number": 43,
    "title": "Design Thread-Safe Cache with TTL",
    "category": "concurrency-design-questions",
    "categoryTitle": "Concurrency Design Questions",
    "difficulty": "Medium",
    "topics": [
      "Design Thread-Safe Cache with TTL"
    ],
    "narrative": "Implement a thread-safe key-value cache where keys expire after a specified time-to-live (TTL) with background eviction and lazy expiration.",
    "className": "TtlCache",
    "constructorSig": "public TtlCache()",
    "methods": [
      {
        "sig": "public void put(String key, String value, long ttlMs)",
        "desc": "stores key-value pair with expiration timestamp."
      },
      {
        "sig": "public String get(String key)",
        "desc": "returns value if not expired, otherwise null."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on TtlCache",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TtlCache()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a thread-safe key-value cache where keys expire after a specified time-to-live (TTL) with background eviction and lazy expiration.\n\n### Implement the `TtlCache` class:\n\n- `TtlCache()` creates an initialized instance.\n- `void put(String key, String value, long ttlMs)` stores key-value pair with expiration timestamp.\n- `String get(String key)` returns value if not expired, otherwise null.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on TtlCache\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class TtlCache {\n\n    public TtlCache() {\n\n    }\n\n    public void put(String key, String value, long ttlMs) {\n        \n    }\n\n    public String get(String key) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        TtlCache instance = new TtlCache();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass TtlCache:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class TtlCache {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Thread-Safe Cache with TTL\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-thread-safe-rate-limiter",
    "number": 44,
    "title": "Design Thread-Safe Rate Limiter",
    "category": "concurrency-design-questions",
    "categoryTitle": "Concurrency Design Questions",
    "difficulty": "Medium",
    "topics": [
      "Design Thread-Safe Rate Limiter"
    ],
    "narrative": "Implement a thread-safe Token Bucket Rate Limiter that permits up to maxTokens requests per second across concurrent client threads.",
    "className": "ThreadSafeRateLimiter",
    "constructorSig": "public ThreadSafeRateLimiter(int maxTokens, double refillRatePerSec)",
    "methods": [
      {
        "sig": "public boolean allowRequest()",
        "desc": "atomically consumes 1 token if available; returns true if permitted."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ThreadSafeRateLimiter",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ThreadSafeRateLimiter()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a thread-safe Token Bucket Rate Limiter that permits up to maxTokens requests per second across concurrent client threads.\n\n### Implement the `ThreadSafeRateLimiter` class:\n\n- `ThreadSafeRateLimiter(int maxTokens, double refillRatePerSec)` creates an initialized instance.\n- `boolean allowRequest()` atomically consumes 1 token if available; returns true if permitted.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ThreadSafeRateLimiter\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ThreadSafeRateLimiter {\n\n    public ThreadSafeRateLimiter(int maxTokens, double refillRatePerSec) {\n\n    }\n\n    public boolean allowRequest() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ThreadSafeRateLimiter instance = new ThreadSafeRateLimiter();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ThreadSafeRateLimiter:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ThreadSafeRateLimiter {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Thread-Safe Rate Limiter\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-ticket-booking-system",
    "number": 45,
    "title": "Design Ticket Booking System",
    "category": "concurrency-design-questions",
    "categoryTitle": "Concurrency Design Questions",
    "difficulty": "Medium",
    "topics": [
      "Design Ticket Booking System"
    ],
    "narrative": "Design a movie theatre booking engine where multiple users attempt to book adjacent seats concurrently without double-booking.",
    "className": "TicketBookingSystem",
    "constructorSig": "public TicketBookingSystem(int totalSeats)",
    "methods": [
      {
        "sig": "public boolean bookSeat(int seatNumber, String userId)",
        "desc": "books specific seat atomically; returns false if already booked."
      },
      {
        "sig": "public boolean cancelSeat(int seatNumber, String userId)",
        "desc": "cancels reservation if booked by same user."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on TicketBookingSystem",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TicketBookingSystem()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a movie theatre booking engine where multiple users attempt to book adjacent seats concurrently without double-booking.\n\n### Implement the `TicketBookingSystem` class:\n\n- `TicketBookingSystem(int totalSeats)` creates an initialized instance.\n- `boolean bookSeat(int seatNumber, String userId)` books specific seat atomically; returns false if already booked.\n- `boolean cancelSeat(int seatNumber, String userId)` cancels reservation if booked by same user.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on TicketBookingSystem\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class TicketBookingSystem {\n\n    public TicketBookingSystem(int totalSeats) {\n\n    }\n\n    public boolean bookSeat(int seatNumber, String userId) {\n        \n    }\n\n    public boolean cancelSeat(int seatNumber, String userId) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        TicketBookingSystem instance = new TicketBookingSystem();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass TicketBookingSystem:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class TicketBookingSystem {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Ticket Booking System\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-thread-safe-connection-pool",
    "number": 46,
    "title": "Design a Thread-Safe Connection Pool",
    "category": "concurrency-design-questions",
    "categoryTitle": "Concurrency Design Questions",
    "difficulty": "Medium",
    "topics": [
      "Resource Pooling"
    ],
    "narrative": "Implement a thread-safe database connection pool that manages K reusable connection objects with blocking acquisition and lease timeouts.",
    "className": "ConnectionPool",
    "constructorSig": "public ConnectionPool(int poolSize)",
    "methods": [
      {
        "sig": "public Connection acquireConnection(long timeoutMs) throws InterruptedException",
        "desc": "borrows an idle connection or blocks until one is returned."
      },
      {
        "sig": "public void releaseConnection(Connection conn)",
        "desc": "returns connection back to idle pool."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on ConnectionPool",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new ConnectionPool()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Implement a thread-safe database connection pool that manages K reusable connection objects with blocking acquisition and lease timeouts.\n\n### Implement the `ConnectionPool` class:\n\n- `ConnectionPool(int poolSize)` creates an initialized instance.\n- `Connection acquireConnection(long timeoutMs) throws InterruptedException` borrows an idle connection or blocks until one is returned.\n- `void releaseConnection(Connection conn)` returns connection back to idle pool.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on ConnectionPool\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class ConnectionPool {\n\n    public ConnectionPool(int poolSize) {\n\n    }\n\n    public Connection acquireConnection(long timeoutMs) throws InterruptedException {\n        \n    }\n\n    public void releaseConnection(Connection conn) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        ConnectionPool instance = new ConnectionPool();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass ConnectionPool:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class ConnectionPool {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design a Thread-Safe Connection Pool\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "traffic-light-controlled-intersection",
    "number": 47,
    "title": "Traffic Light Controlled Intersection",
    "category": "concurrency-design-questions",
    "categoryTitle": "Concurrency Design Questions",
    "difficulty": "Medium",
    "topics": [
      "Traffic Light Controller"
    ],
    "narrative": "There is an intersection of two roads (Road A and Road B). Only one green light can be active at a time. Cars from the other road must wait until the signal switches.",
    "className": "TrafficLight",
    "constructorSig": "public TrafficLight()",
    "methods": [
      {
        "sig": "public void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) throws InterruptedException",
        "desc": "coordinates safe crossing through intersection."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on TrafficLight",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new TrafficLight()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "There is an intersection of two roads (Road A and Road B). Only one green light can be active at a time. Cars from the other road must wait until the signal switches.\n\n### Implement the `TrafficLight` class:\n\n- `TrafficLight()` creates an initialized instance.\n- `void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) throws InterruptedException` coordinates safe crossing through intersection.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on TrafficLight\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class TrafficLight {\n\n    public TrafficLight() {\n\n    }\n\n    public void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        TrafficLight instance = new TrafficLight();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass TrafficLight:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class TrafficLight {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Traffic Light Controlled Intersection\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-deferred-callback-executor",
    "number": 48,
    "title": "Design Deferred Callback Executor",
    "category": "concurrency-design-questions",
    "categoryTitle": "Concurrency Design Questions",
    "difficulty": "Hard",
    "topics": [
      "Design Deferred Callback Executor"
    ],
    "narrative": "Design a delayed task scheduler where callbacks are registered with future timestamps and executed precisely when their scheduled time arrives.",
    "className": "DeferredCallbackExecutor",
    "constructorSig": "public DeferredCallbackExecutor()",
    "methods": [
      {
        "sig": "public void schedule(Runnable callback, long delayMs)",
        "desc": "schedules callback execution after delayMs."
      },
      {
        "sig": "public void start()",
        "desc": "starts background polling worker."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on DeferredCallbackExecutor",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DeferredCallbackExecutor()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a delayed task scheduler where callbacks are registered with future timestamps and executed precisely when their scheduled time arrives.\n\n### Implement the `DeferredCallbackExecutor` class:\n\n- `DeferredCallbackExecutor()` creates an initialized instance.\n- `void schedule(Runnable callback, long delayMs)` schedules callback execution after delayMs.\n- `void start()` starts background polling worker.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on DeferredCallbackExecutor\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class DeferredCallbackExecutor {\n\n    public DeferredCallbackExecutor() {\n\n    }\n\n    public void schedule(Runnable callback, long delayMs) {\n        \n    }\n\n    public void start() {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        DeferredCallbackExecutor instance = new DeferredCallbackExecutor();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass DeferredCallbackExecutor:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class DeferredCallbackExecutor {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Deferred Callback Executor\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-multithreaded-pub-sub-system",
    "number": 49,
    "title": "Design Multithreaded Pub-Sub System",
    "category": "concurrency-design-questions",
    "categoryTitle": "Concurrency Design Questions",
    "difficulty": "Hard",
    "topics": [
      "Design Multithreaded Pub-Sub System"
    ],
    "narrative": "Design an in-memory topic-based Publish-Subscribe message broker where publishers push messages to topics and subscribers receive them asynchronously.",
    "className": "PubSubSystem",
    "constructorSig": "public PubSubSystem()",
    "methods": [
      {
        "sig": "public void publish(String topic, String message)",
        "desc": "broadcasts message to all topic subscribers."
      },
      {
        "sig": "public void subscribe(String topic, java.util.function.Consumer<String> subscriber)",
        "desc": "registers subscriber consumer callback."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on PubSubSystem",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new PubSubSystem()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design an in-memory topic-based Publish-Subscribe message broker where publishers push messages to topics and subscribers receive them asynchronously.\n\n### Implement the `PubSubSystem` class:\n\n- `PubSubSystem()` creates an initialized instance.\n- `void publish(String topic, String message)` broadcasts message to all topic subscribers.\n- `void subscribe(String topic, java.util.function.Consumer<String> subscriber)` registers subscriber consumer callback.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on PubSubSystem\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class PubSubSystem {\n\n    public PubSubSystem() {\n\n    }\n\n    public void publish(String topic, String message) {\n        \n    }\n\n    public void subscribe(String topic, java.util.function.Consumer<String> subscriber) {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        PubSubSystem instance = new PubSubSystem();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass PubSubSystem:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class PubSubSystem {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Multithreaded Pub-Sub System\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  },
  {
    "id": "design-task-scheduler-with-dependencies",
    "number": 50,
    "title": "Design Task Scheduler with Dependencies",
    "category": "concurrency-design-questions",
    "categoryTitle": "Concurrency Design Questions",
    "difficulty": "Hard",
    "topics": [
      "Task Scheduling with DAG"
    ],
    "narrative": "Design a task scheduler that takes a Directed Acyclic Graph (DAG) of dependent tasks and executes tasks as soon as all prerequisite dependencies finish.",
    "className": "DependencyTaskScheduler",
    "constructorSig": "public DependencyTaskScheduler(int workerThreads)",
    "methods": [
      {
        "sig": "public void addTask(String taskId, Runnable task, java.util.List<String> dependencies)",
        "desc": "registers task with its prerequisites."
      },
      {
        "sig": "public void executeAll() throws InterruptedException",
        "desc": "executes all ready tasks in parallel until entire DAG is complete."
      }
    ],
    "rules": [
      "All operations must be thread-safe and linearizable across concurrent threads.",
      "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
      "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
    ],
    "examples": [
      {
        "input": "// Multiple threads execute operations concurrently on DependencyTaskScheduler",
        "output": "All assertions pass with zero data races and consistent state",
        "explanation": "State mutations are synchronized correctly across threads."
      }
    ],
    "constraints": [
      "1 <= concurrentThreads <= 50",
      "At most 100,000 operations per benchmark.",
      "Operations must not deadlock or produce race conditions."
    ],
    "hints": [
      "Identify critical sections that modify shared mutable state.",
      "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
      "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
    ],
    "testCases": [
      {
        "name": "Case 1",
        "calls": [
          {
            "call": "new DependencyTaskScheduler()",
            "returns": "null"
          },
          {
            "call": "execute()",
            "returns": "void"
          }
        ],
        "input": "Concurrent benchmark with 8 threads",
        "expectedOutput": "Execution complete without deadlock"
      }
    ],
    "description": "Design a task scheduler that takes a Directed Acyclic Graph (DAG) of dependent tasks and executes tasks as soon as all prerequisite dependencies finish.\n\n### Implement the `DependencyTaskScheduler` class:\n\n- `DependencyTaskScheduler(int workerThreads)` creates an initialized instance.\n- `void addTask(String taskId, Runnable task, java.util.List<String> dependencies)` registers task with its prerequisites.\n- `void executeAll() throws InterruptedException` executes all ready tasks in parallel until entire DAG is complete.\n\n- All operations must be thread-safe and linearizable across concurrent threads.\n- Prevent race conditions, data races, deadlocks, and memory visibility issues.\n- Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate.\n\n#### Example 1:\n```\nInput:\n// Multiple threads execute operations concurrently on DependencyTaskScheduler\n\nOutput:\nAll assertions pass with zero data races and consistent state\n\nExplanation: State mutations are synchronized correctly across threads.\n```\n\n\n\n### Constraints\n- 1 <= concurrentThreads <= 50\n- At most 100,000 operations per benchmark.\n- Operations must not deadlock or produce race conditions.\n",
    "starterCode": {
      "java": "class DependencyTaskScheduler {\n\n    public DependencyTaskScheduler(int workerThreads) {\n\n    }\n\n    public void addTask(String taskId, Runnable task, java.util.List<String> dependencies) {\n        \n    }\n\n    public void executeAll() throws InterruptedException {\n        \n    }\n}\n\n/*\nFor reference, the judge creates and runs threads against your class\nalong these lines, with more threads that all start at the same time\nto force contention. In an interview, you can write a driver like this\nyourself to demonstrate the full picture:\n\npublic class Main {\n    public static void main(String[] args) throws InterruptedException {\n        DependencyTaskScheduler instance = new DependencyTaskScheduler();\n\n        Runnable worker = () -> {\n            for (int i = 0; i < 1000; i++) {\n                // Execute concurrent operations\n            }\n        };\n\n        Thread t1 = new Thread(worker);\n        Thread t2 = new Thread(worker);\n\n        t1.start();\n        t2.start();\n\n        t1.join();\n        t2.join();\n\n        System.out.println(\"All threads finished successfully!\");\n    }\n}\n*/",
      "python": "import threading\n\nclass DependencyTaskScheduler:\n\n    def __init__(self):\n        self._lock = threading.Lock()\n\n    def execute(self):\n        with self._lock:\n            pass\n",
      "javascript": "class DependencyTaskScheduler {\n    constructor() {\n        \n    }\n\n    async execute() {\n        \n    }\n}\n"
    },
    "editorial": "### Concurrency Analysis: Design Task Scheduler with Dependencies\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using `synchronized`, `ReentrantLock`, or `java.util.concurrent.atomic`.\n- Guard against reordering and visibility pitfalls using `volatile` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning."
  }
];

export const CONCURRENCY_TOPICS_LIST = [
  "Atomic Operations",
  "Barriers and Latches",
  "Building H2O Molecule",
  "Cigarette Smokers Problem",
  "Coarse-grained vs Fine-grained Locking",
  "Compare-And-Swap (CAS)",
  "Concurrent BFS/DFS Graph Traversal",
  "Condition Variables",
  "Deadlock Prevention",
  "Design Concurrent Bloom Filter",
  "Design Concurrent HashMap",
  "Design Concurrent Priority Queue",
  "Design Deferred Callback Executor",
  "Design Multithreaded Pub-Sub System",
  "Design Multithreaded Web Crawler",
  "Design Thread-Safe Blocking Queue",
  "Design Thread-Safe Cache with TTL",
  "Design Thread-Safe Rate Limiter",
  "Design Thread-Safe Trie",
  "Design Ticket Booking System",
  "Dining Philosophers",
  "Double-Checked Locking Pattern",
  "Fizz Buzz Multithreaded",
  "Fork-Join Pattern",
  "Future/Promise Pattern",
  "Multi-threaded Merge Sort",
  "Multi-threaded Word Frequency Counter",
  "Mutex (Mutual Exclusion)",
  "Optimistic vs Pessimistic Locking",
  "Print Foo Bar Alternately",
  "Print Zero Even Odd",
  "Producer-Consumer Pattern",
  "Race Conditions and Critical Sections",
  "Read-Write Locks",
  "Readers-Writers Problem",
  "Reentrant Locks",
  "Resource Pooling",
  "Santa Claus Problem",
  "Semaphores",
  "Signaling Pattern",
  "Sleeping Barber",
  "Task Scheduling with DAG",
  "Thread Pool Pattern",
  "Traffic Light Controller",
  "Try-Lock and Timed Locking",
  "Two-Phase Locking",
  "Unisex Bathroom"
];
