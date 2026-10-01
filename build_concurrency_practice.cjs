// ============================================================================
// Generator for 50 Concurrency Practice Problems (AlgoMaster / LeetCode format)
// ============================================================================

const fs = require('fs');
const path = require('path');

const CATEGORIES = [
  {
    id: "synchronization-primitives",
    title: "Synchronization Primitives",
    icon: "Lock",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    desc: "Mutexes, critical sections, Semaphores, Condition Variables, Read-Write Locks, CountDownLatches & Reusable Barriers."
  },
  {
    id: "locking-strategies",
    title: "Locking Strategies",
    icon: "Key",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    desc: "Fine-grained locking, Reentrant Locks, Timed Locks, Two-Phase Locking & Optimistic vs Pessimistic locking."
  },
  {
    id: "lock-free-programming",
    title: "Lock-Free and Wait-Free Programming",
    icon: "Zap",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    desc: "Atomic variables, Compare-And-Swap (CAS) loops, memory fences & lock-free maximum finders."
  },
  {
    id: "concurrency-challenges",
    title: "Concurrency Challenges",
    icon: "AlertTriangle",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    desc: "Deadlock prevention, lock ordering algorithms, resource hierarchy & cyclic dependency detection."
  },
  {
    id: "concurrency-patterns",
    title: "Concurrency Patterns",
    icon: "Layers",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    desc: "Producer-Consumer bounded queues, Futures/Promises, Thread Pools, Double-Checked Locking & Fork-Join reducers."
  },
  {
    id: "classic-problems",
    title: "Classic Problems",
    icon: "Award",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    desc: "Print in Order, Building H2O, FizzBuzz Multithreaded, Dining Philosophers, Sleeping Barber & Readers-Writers."
  },
  {
    id: "thread-safe-data-structures",
    title: "Thread-Safe Data Structures",
    icon: "Database",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    desc: "Bounded Blocking Queues, Concurrent HashMaps, Priority Queues, Thread-Safe Tries & Concurrent Bloom Filters."
  },
  {
    id: "multithreading-algorithms",
    title: "Multithreading Algorithms",
    icon: "Cpu",
    color: "text-lime-400",
    bg: "bg-lime-500/10",
    border: "border-lime-500/20",
    desc: "Parallel Array Mappers, Multi-threaded Merge Sort, Parallel Word Count & Concurrent Graph Traversals."
  },
  {
    id: "concurrency-design-questions",
    title: "Concurrency Design Questions",
    icon: "Maximize2",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    desc: "Multithreaded Web Crawlers, TTL Caches, Rate Limiters, Ticket Booking, Connection Pools & Pub-Sub Brokers."
  }
];

const RAW_CONCURRENCY_PROBLEMS = [
  // 1. Synchronization Primitives
  {
    num: 1,
    title: "Design a Thread-Safe Bank Account",
    slug: "design-thread-safe-bank-account",
    category: "synchronization-primitives",
    topics: ["Mutex (Mutual Exclusion)"],
    difficulty: "Medium",
    narrative: "Design a bank account whose balance can be accessed safely by many threads.\n\nEvery operation must be thread-safe and linearizable. In particular, checking the balance and subtracting a withdrawal must be one atomic operation. Concurrent withdrawals must never make the balance negative.\n\nDifferent BankAccount instances must synchronize independently. The judge creates all customer threads; your class should protect its state rather than create threads itself.\n\nStandard concurrency and thread APIs are preloaded, so you do not need import, include, package, or using statements.",
    className: "BankAccount",
    constructorSig: "public BankAccount(long initialBalance)",
    methods: [
      {
        sig: "public void deposit(long amount)",
        desc: "adds amount to the balance."
      },
      {
        sig: "public boolean withdraw(long amount)",
        desc: "subtracts amount and returns true if sufficient funds are available. Otherwise, leaves the balance unchanged and returns false."
      },
      {
        sig: "public long getBalance()",
        desc: "returns the current balance."
      }
    ],
    rules: [
      "Checking the balance and subtracting a withdrawal must be one atomic operation.",
      "Concurrent withdrawals must never allow the balance to drop below zero.",
      "Operations on different account instances must execute without blocking one another."
    ],
    examples: [
      {
        input: "account = BankAccount(100)\naccount.deposit(50)\naccount.withdraw(30)\naccount.withdraw(150)\naccount.getBalance()",
        output: "[true, false, 120]",
        explanation: "The first withdrawal succeeds leaving 120. The second withdrawal requests 150 > 120, so it is rejected and balance remains 120."
      },
      {
        input: "account = BankAccount(100)\ntwo threads call account.withdraw(80) simultaneously",
        output: "one call returns true, one returns false, final balance = 20",
        explanation: "Only one withdrawal succeeds atomically without race conditions."
      }
    ],
    constraints: [
      "0 <= initialBalance <= 10^12",
      "1 <= amount <= 10^9",
      "At most 100,000 operations are performed per account.",
      "The balance always fits in a signed 64-bit integer.",
      "Every method may be called concurrently by multiple threads."
    ],
    hints: [
      "Use `synchronized` methods, an `AtomicLong`, or a `ReentrantLock` to protect balance modifications.",
      "For `withdraw`, verify balance >= amount inside the synchronized block before deducting.",
      "Ensure `getBalance()` reads the volatile/synchronized state to prevent stale cached CPU reads."
    ],
    testCases: [
      {
        name: "Case 1",
        calls: [
          { call: "new BankAccount(100)", returns: "null" },
          { call: "deposit(50)", returns: "void" },
          { call: "withdraw(30)", returns: "true" },
          { call: "withdraw(150)", returns: "false" },
          { call: "getBalance()", returns: "120" }
        ],
        input: "initial = 100, ops: deposit(50), withdraw(30), withdraw(150)",
        expectedOutput: "[true, false, 120]"
      },
      {
        name: "Case 2 (Contention)",
        calls: [
          { call: "new BankAccount(100)", returns: "null" },
          { call: "withdraw(80) [Thread-1]", returns: "true" },
          { call: "withdraw(80) [Thread-2]", returns: "false" },
          { call: "getBalance()", returns: "20" }
        ],
        input: "initial = 100, 2 concurrent threads call withdraw(80)",
        expectedOutput: "[true, false, 20]"
      }
    ],
    starterJava: `class BankAccount {

    public BankAccount(long initialBalance) {

    }

    public void deposit(long amount) {

    }

    public boolean withdraw(long amount) {
        return false;
    }

    public long getBalance() {
        return 0;
    }
}

/*
For reference, the judge creates and runs threads against your class
along these lines, with more threads that all start at the same time
to force contention. In an interview, you can write a driver like this
yourself to demonstrate the full picture:

public class Main {
    public static void main(String[] args) throws InterruptedException {
        BankAccount account = new BankAccount(100000);

        Runnable customer = () -> {
            for (int i = 0; i < 1000; i++) {
                account.deposit(7);
                account.withdraw(5);
            }
        };

        Thread first = new Thread(customer);
        Thread second = new Thread(customer);

        first.start();
        second.start();

        first.join();
        second.join();

        // Each iteration adds 7 and removes 5, so this always prints 104000.
        System.out.println(account.getBalance());
    }
}
*/`
  },
  {
    num: 2,
    title: "Design a Thread-Safe Inventory",
    slug: "design-thread-safe-inventory",
    category: "synchronization-primitives",
    topics: ["Race Conditions and Critical Sections"],
    difficulty: "Medium",
    narrative: "Design an inventory management system where multiple threads add stock and purchase items concurrently without overselling.",
    className: "ThreadSafeInventory",
    constructorSig: "public ThreadSafeInventory()",
    methods: [
      { sig: "public void addStock(String item, int count)", desc: "increases stock count of item atomically." },
      { sig: "public boolean purchase(String item, int count)", desc: "decrements stock if count <= available; returns true if successful, false otherwise." },
      { sig: "public int getStock(String item)", desc: "returns current stock level of item." }
    ],
    rules: ["Never allow stock to drop below 0 under concurrent purchases.", "Different items should ideally lock independently for high throughput."]
  },
  {
    num: 3,
    title: "Design a Concurrency Limiter With a Semaphore",
    slug: "design-concurrency-limiter-with-semaphore",
    category: "synchronization-primitives",
    topics: ["Semaphores"],
    difficulty: "Medium",
    narrative: "Design a concurrency limiter that allows at most K concurrent tasks to execute concurrently using custom Semaphore semantics.",
    className: "ConcurrencyLimiter",
    constructorSig: "public ConcurrencyLimiter(int maxPermits)",
    methods: [
      { sig: "public void acquire() throws InterruptedException", desc: "blocks until a permit is available and acquires it." },
      { sig: "public void release()", desc: "returns a permit, releasing a blocked waiting thread." }
    ]
  },
  {
    num: 4,
    title: "Design a Versioned Signal",
    slug: "design-versioned-signal",
    category: "synchronization-primitives",
    topics: ["Condition Variables"],
    difficulty: "Medium",
    narrative: "Design a synchronization signal that increments a monotonically increasing version number and wakes threads waiting for specific versions.",
    className: "VersionedSignal",
    constructorSig: "public VersionedSignal(int initialVersion)",
    methods: [
      { sig: "public void awaitVersion(int targetVersion) throws InterruptedException", desc: "blocks until current version >= targetVersion." },
      { sig: "public void emitSignal()", desc: "increments version and wakes all qualifying awaiters." }
    ]
  },
  {
    num: 5,
    title: "Design a Read-Write Coordinator",
    slug: "design-read-write-coordinator",
    category: "synchronization-primitives",
    topics: ["Read-Write Locks"],
    difficulty: "Medium",
    narrative: "Implement a fair Read-Write Lock where multiple readers can read concurrently, but writers acquire exclusive access without reader starvation.",
    className: "ReadWriteCoordinator",
    constructorSig: "public ReadWriteCoordinator()",
    methods: [
      { sig: "public void acquireReadLock() throws InterruptedException", desc: "acquires shared read access." },
      { sig: "public void releaseReadLock()", desc: "releases shared read access." },
      { sig: "public void acquireWriteLock() throws InterruptedException", desc: "acquires exclusive write access." },
      { sig: "public void releaseWriteLock()", desc: "releases exclusive write access." }
    ]
  },
  {
    num: 6,
    title: "Design a CountDown Latch",
    slug: "design-countdown-latch",
    category: "synchronization-primitives",
    topics: ["Barriers and Latches"],
    difficulty: "Medium",
    narrative: "Implement a thread synchronization primitive equivalent to CountDownLatch initialized with a given count.",
    className: "CustomCountDownLatch",
    constructorSig: "public CustomCountDownLatch(int count)",
    methods: [
      { sig: "public void countDown()", desc: "decrements the latch count, releasing all waiting threads when it hits 0." },
      { sig: "public void await() throws InterruptedException", desc: "causes the current thread to wait until the latch has counted down to zero." }
    ]
  },
  {
    num: 7,
    title: "Design a Reusable Barrier",
    slug: "design-reusable-barrier",
    category: "synchronization-primitives",
    topics: ["Barriers and Latches"],
    difficulty: "Medium",
    narrative: "Implement a reusable cyclic barrier that allows N threads to wait for each other to reach a common barrier point before repeating.",
    className: "ReusableBarrier",
    constructorSig: "public ReusableBarrier(int parties)",
    methods: [
      { sig: "public int await() throws InterruptedException", desc: "waits until all parties have invoked await on this barrier." }
    ]
  },

  // 2. Locking Strategies
  {
    num: 8,
    title: "Design a Keyed Task Executor",
    slug: "design-keyed-task-executor",
    category: "locking-strategies",
    topics: ["Coarse-grained vs Fine-grained Locking"],
    difficulty: "Medium",
    narrative: "Design a task executor where tasks with different keys run concurrently in parallel, while tasks sharing the same key run sequentially in FIFO order.",
    className: "KeyedTaskExecutor",
    constructorSig: "public KeyedTaskExecutor()",
    methods: [
      { sig: "public void execute(String key, Runnable task)", desc: "submits a task associated with a key." }
    ]
  },
  {
    num: 9,
    title: "Design a Recursive Accumulator",
    slug: "design-recursive-accumulator",
    category: "locking-strategies",
    topics: ["Reentrant Locks"],
    difficulty: "Medium",
    narrative: "Implement a thread-safe nested accumulator that supports recursive re-entrant lock acquisitions by the same thread without self-deadlock.",
    className: "RecursiveAccumulator",
    constructorSig: "public RecursiveAccumulator()",
    methods: [
      { sig: "public void accumulate(int depth, long value)", desc: "recursively locks and aggregates values." },
      { sig: "public long getTotal()", desc: "returns the current accumulated total." }
    ]
  },
  {
    num: 10,
    title: "Design a Timed Lock",
    slug: "design-timed-lock",
    category: "locking-strategies",
    topics: ["Try-Lock and Timed Locking"],
    difficulty: "Medium",
    narrative: "Design an explicit lock supporting non-blocking tryLock() and timed tryLock(timeoutMs) with immediate abort upon timeout.",
    className: "TimedLock",
    constructorSig: "public TimedLock()",
    methods: [
      { sig: "public boolean tryLock(long timeoutMs) throws InterruptedException", desc: "attempts to acquire lock within timeout period." },
      { sig: "public void unlock()", desc: "releases lock if held by current thread." }
    ]
  },
  {
    num: 11,
    title: "Design a Multi-Key Transaction Executor",
    slug: "design-multi-key-transaction-executor",
    category: "locking-strategies",
    topics: ["Two-Phase Locking"],
    difficulty: "Medium",
    narrative: "Design a transaction coordinator that acquires locks on multiple resource keys in a deterministic global order to prevent deadlocks (Two-Phase Locking).",
    className: "MultiKeyTransactionExecutor",
    constructorSig: "public MultiKeyTransactionExecutor()",
    methods: [
      { sig: "public boolean transfer(String fromKey, String toKey, long amount)", desc: "atomically transfers amount between two accounts." }
    ]
  },
  {
    num: 12,
    title: "Design a Versioned Value Store",
    slug: "design-versioned-value-store",
    category: "locking-strategies",
    topics: ["Optimistic vs Pessimistic Locking"],
    difficulty: "Hard",
    narrative: "Implement an optimistic concurrency control (OCC) value store that validates version numbers before applying mutations, retrying on conflict.",
    className: "VersionedValueStore",
    constructorSig: "public VersionedValueStore()",
    methods: [
      { sig: "public boolean update(String key, String expectedVal, String newVal)", desc: "updates value only if current matches expectedVal." },
      { sig: "public String get(String key)", desc: "returns current value." }
    ]
  },

  // 3. Lock-Free and Wait-Free
  {
    num: 13,
    title: "Design an Atomic Counter",
    slug: "design-atomic-counter",
    category: "lock-free-programming",
    topics: ["Atomic Operations"],
    difficulty: "Easy",
    narrative: "Implement a high-performance thread-safe counter using hardware atomic CAS instructions without mutex locks.",
    className: "AtomicCounter",
    constructorSig: "public AtomicCounter(long initialValue)",
    methods: [
      { sig: "public long incrementAndGet()", desc: "atomically increments by 1 and returns updated value." },
      { sig: "public long addAndGet(long delta)", desc: "atomically adds delta and returns updated value." },
      { sig: "public long get()", desc: "returns current value with volatile visibility." }
    ]
  },
  {
    num: 14,
    title: "Design an Atomic Maximum With Compare-and-Swap",
    slug: "design-atomic-maximum-with-compare-and-swap",
    category: "lock-free-programming",
    topics: ["Compare-And-Swap (CAS)"],
    difficulty: "Medium",
    narrative: "Implement a lock-free tracker that atomically updates the maximum observed value across thousands of concurrent threads using a CAS retry loop.",
    className: "AtomicMaximum",
    constructorSig: "public AtomicMaximum()",
    methods: [
      { sig: "public void updateMax(long value)", desc: "atomically sets max = max(currentMax, value)." },
      { sig: "public long getMax()", desc: "returns the maximum observed value." }
    ]
  },

  // 4. Concurrency Challenges
  {
    num: 15,
    title: "Design a Deadlock-Free Two-Key Executor",
    slug: "design-deadlock-free-two-key-executor",
    category: "concurrency-challenges",
    topics: ["Deadlock Prevention"],
    difficulty: "Medium",
    narrative: "Design a mechanism that executes operations on two shared resources without deadlocking, even when threads request locks in reverse orders.",
    className: "DeadlockFreeExecutor",
    constructorSig: "public DeadlockFreeExecutor()",
    methods: [
      { sig: "public void execute(String keyA, String keyB, Runnable action)", desc: "acquires both keys in canonical order before executing action." }
    ]
  },

  // 5. Concurrency Patterns
  {
    num: 16,
    title: "Design a Closable Bounded Queue",
    slug: "design-closable-bounded-queue",
    category: "concurrency-patterns",
    topics: ["Producer-Consumer Pattern"],
    difficulty: "Medium",
    narrative: "Implement a thread-safe bounded FIFO queue that supports graceful closure: producers cannot enqueue once closed, while consumers drain remaining items.",
    className: "ClosableBoundedQueue",
    constructorSig: "public ClosableBoundedQueue(int capacity)",
    methods: [
      { sig: "public boolean enqueue(int item) throws InterruptedException", desc: "blocks if full; returns false if closed." },
      { sig: "public Integer dequeue() throws InterruptedException", desc: "blocks if empty; returns null when empty and closed." },
      { sig: "public void close()", desc: "marks queue closed and wakes all waiting threads." }
    ]
  },
  {
    num: 17,
    title: "Design a One-Shot Promise",
    slug: "design-one-shot-promise",
    category: "concurrency-patterns",
    topics: ["Future/Promise Pattern"],
    difficulty: "Medium",
    narrative: "Design a single-assignment Future/Promise construct that allows one thread to fulfill a value and any number of threads to await the result.",
    className: "OneShotPromise",
    constructorSig: "public OneShotPromise()",
    methods: [
      { sig: "public void resolve(String value)", desc: "sets the promise value once and wakes all awaiting threads." },
      { sig: "public String get() throws InterruptedException", desc: "blocks until promise is resolved and returns value." }
    ]
  },
  {
    num: 18,
    title: "Design a Thread Pool",
    slug: "design-thread-pool",
    category: "concurrency-patterns",
    topics: ["Thread Pool Pattern"],
    difficulty: "Hard",
    narrative: "Implement a fixed-size worker thread pool that accepts Runnable tasks into a shared work queue and executes them across N worker threads.",
    className: "CustomThreadPool",
    constructorSig: "public CustomThreadPool(int poolSize)",
    methods: [
      { sig: "public void submit(Runnable task)", desc: "adds task to queue for worker threads to execute." },
      { sig: "public void shutdown()", desc: "stops accepting tasks and gracefully terminates workers after draining." }
    ]
  },
  {
    num: 19,
    title: "Design a Thread-Safe Lazy Value",
    slug: "design-thread-safe-lazy-value",
    category: "concurrency-patterns",
    topics: ["Double-Checked Locking Pattern"],
    difficulty: "Medium",
    narrative: "Implement a lazy initialization wrapper using Double-Checked Locking with volatile semantics to guarantee single execution of supplier.",
    className: "LazyValue",
    constructorSig: "public LazyValue(java.util.function.Supplier<String> supplier)",
    methods: [
      { sig: "public String get()", desc: "computes value on first call; subsequent calls return cached value in O(1)." }
    ]
  },
  {
    num: 20,
    title: "Design an Auto-Reset Signal",
    slug: "design-auto-reset-signal",
    category: "concurrency-patterns",
    topics: ["Signaling Pattern"],
    difficulty: "Medium",
    narrative: "Implement an Auto-Reset Event that wakes exactly one waiting thread upon signal() and automatically resets to unsignaled state.",
    className: "AutoResetSignal",
    constructorSig: "public AutoResetSignal(boolean initialState)",
    methods: [
      { sig: "public void set()", desc: "sets signal, waking one waiting thread." },
      { sig: "public void await() throws InterruptedException", desc: "waits for signal, consuming it upon wakeup." }
    ]
  },
  {
    num: 21,
    title: "Design a Parallel Range Reducer",
    slug: "design-parallel-range-reducer",
    category: "concurrency-patterns",
    topics: ["Fork-Join Pattern"],
    difficulty: "Hard",
    narrative: "Implement a Fork-Join parallel range reducer that divides a large array into subtasks executed in parallel and combines results recursively.",
    className: "ParallelRangeReducer",
    constructorSig: "public ParallelRangeReducer(int threshold)",
    methods: [
      { sig: "public long sumRange(long[] array, int start, int end)", desc: "computes array sum in parallel using divide-and-conquer." }
    ]
  },

  // 6. Classic Concurrency Problems (LeetCode Concurrency)
  {
    num: 22,
    title: "Print in Order",
    slug: "print-in-order",
    category: "classic-problems",
    topics: ["Signaling Pattern"],
    difficulty: "Easy",
    narrative: "Suppose we have a class Foo where three threads run first(), second(), and third() concurrently. Guarantee that 'first', 'second', and 'third' are printed in strict sequential order regardless of thread scheduling.",
    className: "Foo",
    constructorSig: "public Foo()",
    methods: [
      { sig: "public void first(Runnable printFirst) throws InterruptedException", desc: "executes printFirst.run() then unblocks second()." },
      { sig: "public void second(Runnable printSecond) throws InterruptedException", desc: "waits for first(), executes printSecond.run(), then unblocks third()." },
      { sig: "public void third(Runnable printThird) throws InterruptedException", desc: "waits for second() then executes printThird.run()." }
    ]
  },
  {
    num: 23,
    title: "Building H2O",
    slug: "building-h2o",
    category: "classic-problems",
    topics: ["Building H2O Molecule"],
    difficulty: "Medium",
    narrative: "There are two kinds of threads, oxygen and hydrogen. Synchronize them so that for every 2 hydrogen threads that pass the barrier, exactly 1 oxygen thread passes to form a water molecule.",
    className: "H2O",
    constructorSig: "public H2O()",
    methods: [
      { sig: "public void hydrogen(Runnable releaseHydrogen) throws InterruptedException", desc: "releases H atom when 2H + 1O ratio is maintained." },
      { sig: "public void oxygen(Runnable releaseOxygen) throws InterruptedException", desc: "releases O atom when paired with 2 hydrogen atoms." }
    ]
  },
  {
    num: 24,
    title: "Fizz Buzz Multithreaded",
    slug: "fizz-buzz-multithreaded",
    category: "classic-problems",
    topics: ["Fizz Buzz Multithreaded"],
    difficulty: "Medium",
    narrative: "You have four threads: Thread A calls fizz(), Thread B calls buzz(), Thread C calls fizzbuzz(), and Thread D calls number(). Synchronize them to output the FizzBuzz sequence from 1 to n.",
    className: "FizzBuzz",
    constructorSig: "public FizzBuzz(int n)",
    methods: [
      { sig: "public void fizz(Runnable printFizz) throws InterruptedException", desc: "prints fizz for numbers divisible by 3 only." },
      { sig: "public void buzz(Runnable printBuzz) throws InterruptedException", desc: "prints buzz for numbers divisible by 5 only." },
      { sig: "public void fizzbuzz(Runnable printFizzBuzz) throws InterruptedException", desc: "prints fizzbuzz for numbers divisible by 15." },
      { sig: "public void number(IntConsumer printNumber) throws InterruptedException", desc: "prints the number if not divisible by 3 or 5." }
    ]
  },
  {
    num: 25,
    title: "Print FooBar Alternately",
    slug: "print-foobar-alternately",
    category: "classic-problems",
    topics: ["Print Foo Bar Alternately"],
    difficulty: "Medium",
    narrative: "Two threads are running: Thread A calls foo() and Thread B calls bar(). Synchronize them to alternate printing 'foobar' exactly n times.",
    className: "FooBar",
    constructorSig: "public FooBar(int n)",
    methods: [
      { sig: "public void foo(Runnable printFoo) throws InterruptedException", desc: "prints 'foo' then signals bar()." },
      { sig: "public void bar(Runnable printBar) throws InterruptedException", desc: "waits for foo(), prints 'bar', then signals foo()." }
    ]
  },
  {
    num: 26,
    title: "Print Zero Even Odd",
    slug: "print-zero-even-odd",
    category: "classic-problems",
    topics: ["Print Zero Even Odd"],
    difficulty: "Medium",
    narrative: "Three threads run zero(), even(), and odd(). Synchronize them to output '0102030405...' up to 2n.",
    className: "ZeroEvenOdd",
    constructorSig: "public ZeroEvenOdd(int n)",
    methods: [
      { sig: "public void zero(IntConsumer printNumber) throws InterruptedException", desc: "prints 0 before each number." },
      { sig: "public void even(IntConsumer printNumber) throws InterruptedException", desc: "prints even numbers (2, 4, 6...)." },
      { sig: "public void odd(IntConsumer printNumber) throws InterruptedException", desc: "prints odd numbers (1, 3, 5...)." }
    ]
  },
  {
    num: 27,
    title: "The Dining Philosophers",
    slug: "dining-philosophers",
    category: "classic-problems",
    topics: ["Dining Philosophers"],
    difficulty: "Medium",
    narrative: "Five silent philosophers sit at a round table with five forks. Implement wantsToEat() so philosophers pick up both left and right forks without deadlock or starvation.",
    className: "DiningPhilosophers",
    constructorSig: "public DiningPhilosophers()",
    methods: [
      { sig: "public void wantsToEat(int philosopher, Runnable pickLeftFork, Runnable pickRightFork, Runnable eat, Runnable putLeftFork, Runnable putRightFork) throws InterruptedException", desc: "coordinates eating without deadlock." }
    ]
  },
  {
    num: 28,
    title: "Readers-Writers Problem",
    slug: "readers-writers-problem",
    category: "classic-problems",
    topics: ["Readers-Writers Problem"],
    difficulty: "Hard",
    narrative: "Design a synchronization protocol that prevents writer starvation while allowing multiple readers to access shared data concurrently.",
    className: "ReadersWritersSolution",
    constructorSig: "public ReadersWritersSolution()",
    methods: [
      { sig: "public void startRead() throws InterruptedException", desc: "called before reading." },
      { sig: "public void endRead()", desc: "called after reading." },
      { sig: "public void startWrite() throws InterruptedException", desc: "called before writing." },
      { sig: "public void endWrite()", desc: "called after writing." }
    ]
  },
  {
    num: 29,
    title: "Cigarette Smokers",
    slug: "cigarette-smokers",
    category: "classic-problems",
    topics: ["Cigarette Smokers Problem"],
    difficulty: "Hard",
    narrative: "Three smoker threads each possess infinite amounts of one ingredient (tobacco, paper, or matches). An agent places two random ingredients on the table. Synchronize the appropriate smoker to craft and smoke a cigarette.",
    className: "CigaretteSmokers",
    constructorSig: "public CigaretteSmokers()",
    methods: [
      { sig: "public void agentPut(int ingredientA, int ingredientB)", desc: "agent supplies two ingredients." },
      { sig: "public void smokerWithTobacco() throws InterruptedException", desc: "smoker with tobacco waits for paper + matches." }
    ]
  },
  {
    num: 30,
    title: "Santa Claus Problem",
    slug: "santa-claus-problem",
    category: "classic-problems",
    topics: ["Santa Claus Problem"],
    difficulty: "Hard",
    narrative: "Santa sleeps until awakened by either all 9 reindeer returning from holiday or by 3 elves needing help with toys. Reindeer have priority over elves. Implement thread coordination for Santa, reindeer, and elves.",
    className: "SantaClaus",
    constructorSig: "public SantaClaus()",
    methods: [
      { sig: "public void reindeerArrived() throws InterruptedException", desc: "reindeer reports back; 9th wakes Santa to deliver toys." },
      { sig: "public void elfNeedsHelp() throws InterruptedException", desc: "elf asks for help; groups of 3 wake Santa." }
    ]
  },
  {
    num: 31,
    title: "Sleeping Barber",
    slug: "sleeping-barber",
    category: "classic-problems",
    topics: ["Sleeping Barber"],
    difficulty: "Hard",
    narrative: "A barber shop has 1 barber, 1 barber chair, and N waiting chairs. When no customers are present, the barber sleeps. When a customer arrives, they wake the barber or wait if chairs are free, or leave if full.",
    className: "SleepingBarber",
    constructorSig: "public SleepingBarber(int waitingChairs)",
    methods: [
      { sig: "public boolean customerArrive() throws InterruptedException", desc: "customer enters shop; returns false if all chairs full." },
      { sig: "public void cutHair() throws InterruptedException", desc: "barber cuts hair of waiting customer." }
    ]
  },
  {
    num: 32,
    title: "Unisex Bathroom",
    slug: "unisex-bathroom",
    category: "classic-problems",
    topics: ["Unisex Bathroom"],
    difficulty: "Hard",
    narrative: "A unisex bathroom can be used by multiple men or multiple women at the same time, but never both simultaneously, and with a capacity limit of K people.",
    className: "UnisexBathroom",
    constructorSig: "public UnisexBathroom(int capacity)",
    methods: [
      { sig: "public void womanEnter() throws InterruptedException", desc: "woman enters if no men inside and space available." },
      { sig: "public void womanExit()", desc: "woman leaves bathroom." },
      { sig: "public void manEnter() throws InterruptedException", desc: "man enters if no women inside and space available." },
      { sig: "public void manExit()", desc: "man leaves bathroom." }
    ]
  },

  // 7. Thread-Safe Data Structures
  {
    num: 33,
    title: "Design Bounded Blocking Queue",
    slug: "design-bounded-blocking-queue",
    category: "thread-safe-data-structures",
    topics: ["Design Thread-Safe Blocking Queue"],
    difficulty: "Medium",
    narrative: "Implement a thread-safe bounded FIFO blocking queue using circular array buffers and Condition variables for empty/full signaling.",
    className: "BoundedBlockingQueue",
    constructorSig: "public BoundedBlockingQueue(int capacity)",
    methods: [
      { sig: "public void enqueue(int element) throws InterruptedException", desc: "adds element to tail; blocks if full." },
      { sig: "public int dequeue() throws InterruptedException", desc: "removes element from head; blocks if empty." },
      { sig: "public int size()", desc: "returns current number of elements." }
    ]
  },
  {
    num: 34,
    title: "Design Concurrent Hash Map",
    slug: "design-concurrent-hash-map",
    category: "thread-safe-data-structures",
    topics: ["Design Concurrent HashMap"],
    difficulty: "Medium",
    narrative: "Implement a high-performance concurrent hash map with striped bucket locking to allow concurrent reads and writes across different hash buckets.",
    className: "ConcurrentHashMap",
    constructorSig: "public ConcurrentHashMap(int numBuckets)",
    methods: [
      { sig: "public void put(String key, int value)", desc: "inserts or updates key under bucket lock." },
      { sig: "public Integer get(String key)", desc: "retrieves value in O(1) time." },
      { sig: "public boolean remove(String key)", desc: "removes key-value pair." }
    ]
  },
  {
    num: 35,
    title: "Design Concurrent Priority Queue",
    slug: "design-concurrent-priority-queue",
    category: "thread-safe-data-structures",
    topics: ["Design Concurrent Priority Queue"],
    difficulty: "Medium",
    narrative: "Implement a thread-safe priority queue where min/max elements are extracted with concurrent insertion and polling.",
    className: "ConcurrentPriorityQueue",
    constructorSig: "public ConcurrentPriorityQueue()",
    methods: [
      { sig: "public void offer(int val)", desc: "inserts element into heap under lock." },
      { sig: "public Integer poll()", desc: "removes and returns lowest priority item." }
    ]
  },
  {
    num: 36,
    title: "Design Thread-Safe Trie",
    slug: "design-thread-safe-trie",
    category: "thread-safe-data-structures",
    topics: ["Design Thread-Safe Trie"],
    difficulty: "Medium",
    narrative: "Design a prefix tree (Trie) that supports concurrent insertion, prefix searches, and exact word matches using fine-grained node locks.",
    className: "ThreadSafeTrie",
    constructorSig: "public ThreadSafeTrie()",
    methods: [
      { sig: "public void insert(String word)", desc: "inserts word into trie safely." },
      { sig: "public boolean search(String word)", desc: "returns true if word exists." },
      { sig: "public boolean startsWith(String prefix)", desc: "returns true if prefix exists." }
    ]
  },
  {
    num: 37,
    title: "Design a Concurrent Bloom Filter",
    slug: "design-concurrent-bloom-filter",
    category: "thread-safe-data-structures",
    topics: ["Design Concurrent Bloom Filter"],
    difficulty: "Medium",
    narrative: "Implement a concurrent space-efficient probabilistic set that sets bits using multiple hash functions using atomic bitset words.",
    className: "ConcurrentBloomFilter",
    constructorSig: "public ConcurrentBloomFilter(int bitSize, int numHashes)",
    methods: [
      { sig: "public void add(String element)", desc: "sets k bit positions atomically." },
      { sig: "public boolean mightContain(String element)", desc: "returns true if all k bits are set." }
    ]
  },

  // 8. Multithreading Algorithms
  {
    num: 38,
    title: "Design a Parallel Array Mapper",
    slug: "design-parallel-array-mapper",
    category: "multithreading-algorithms",
    topics: ["Fork-Join Pattern"],
    difficulty: "Medium",
    narrative: "Design a parallel mapper that applies a transformation function across a massive array using chunked worker threads.",
    className: "ParallelArrayMapper",
    constructorSig: "public ParallelArrayMapper(int numThreads)",
    methods: [
      { sig: "public int[] map(int[] input, java.util.function.IntUnaryOperator func)", desc: "transforms array in parallel chunks." }
    ]
  },
  {
    num: 39,
    title: "Design a Parallel Merge Sorter",
    slug: "design-parallel-merge-sorter",
    category: "multithreading-algorithms",
    topics: ["Multi-threaded Merge Sort"],
    difficulty: "Medium",
    narrative: "Implement multithreaded Merge Sort where left and right halves are sorted in parallel worker threads before sequential merging.",
    className: "ParallelMergeSorter",
    constructorSig: "public ParallelMergeSorter(int maxDepth)",
    methods: [
      { sig: "public void sort(int[] array)", desc: "sorts array in-place using parallel recursive divide-and-conquer." }
    ]
  },
  {
    num: 40,
    title: "Design a Parallel Word Counter",
    slug: "design-parallel-word-counter",
    category: "multithreading-algorithms",
    topics: ["Multi-threaded Word Frequency Counter"],
    difficulty: "Medium",
    narrative: "Design a multi-threaded word frequency aggregator that parses document chunks in parallel and reduces counts into a single concurrent map.",
    className: "ParallelWordCounter",
    constructorSig: "public ParallelWordCounter(int workerCount)",
    methods: [
      { sig: "public java.util.Map<String, Integer> countWords(java.util.List<String> lines)", desc: "returns total word counts across all lines." }
    ]
  },
  {
    num: 41,
    title: "Design a Parallel Graph Traversal",
    slug: "design-parallel-graph-traversal",
    category: "multithreading-algorithms",
    topics: ["Concurrent BFS/DFS Graph Traversal"],
    difficulty: "Hard",
    narrative: "Implement a thread-safe level-synchronous Parallel Breadth-First Search (BFS) using concurrent frontier sets and atomic visited bitsets.",
    className: "ParallelGraphTraversal",
    constructorSig: "public ParallelGraphTraversal()",
    methods: [
      { sig: "public java.util.List<Integer> parallelBfs(int startNode, java.util.Map<Integer, java.util.List<Integer>> graph)", desc: "returns visited nodes in BFS level order." }
    ]
  },

  // 9. Concurrency Design Questions
  {
    num: 42,
    title: "Design Multithreaded Web Crawler",
    slug: "design-multithreaded-web-crawler",
    category: "concurrency-design-questions",
    topics: ["Design Multithreaded Web Crawler"],
    difficulty: "Medium",
    narrative: "Given a start URL and an HtmlParser interface, crawl all URLs under the same hostname using multiple worker threads without duplicate visits.",
    className: "MultithreadedWebCrawler",
    constructorSig: "public MultithreadedWebCrawler()",
    methods: [
      { sig: "public java.util.List<String> crawl(String startUrl, HtmlParser htmlParser)", desc: "crawls all reachable same-host links in parallel." }
    ]
  },
  {
    num: 43,
    title: "Design Thread-Safe Cache with TTL",
    slug: "design-thread-safe-cache-with-ttl",
    category: "concurrency-design-questions",
    topics: ["Design Thread-Safe Cache with TTL"],
    difficulty: "Medium",
    narrative: "Implement a thread-safe key-value cache where keys expire after a specified time-to-live (TTL) with background eviction and lazy expiration.",
    className: "TtlCache",
    constructorSig: "public TtlCache()",
    methods: [
      { sig: "public void put(String key, String value, long ttlMs)", desc: "stores key-value pair with expiration timestamp." },
      { sig: "public String get(String key)", desc: "returns value if not expired, otherwise null." }
    ]
  },
  {
    num: 44,
    title: "Design Thread-Safe Rate Limiter",
    slug: "design-thread-safe-rate-limiter",
    category: "concurrency-design-questions",
    topics: ["Design Thread-Safe Rate Limiter"],
    difficulty: "Medium",
    narrative: "Implement a thread-safe Token Bucket Rate Limiter that permits up to maxTokens requests per second across concurrent client threads.",
    className: "ThreadSafeRateLimiter",
    constructorSig: "public ThreadSafeRateLimiter(int maxTokens, double refillRatePerSec)",
    methods: [
      { sig: "public boolean allowRequest()", desc: "atomically consumes 1 token if available; returns true if permitted." }
    ]
  },
  {
    num: 45,
    title: "Design Ticket Booking System",
    slug: "design-ticket-booking-system",
    category: "concurrency-design-questions",
    topics: ["Design Ticket Booking System"],
    difficulty: "Medium",
    narrative: "Design a movie theatre booking engine where multiple users attempt to book adjacent seats concurrently without double-booking.",
    className: "TicketBookingSystem",
    constructorSig: "public TicketBookingSystem(int totalSeats)",
    methods: [
      { sig: "public boolean bookSeat(int seatNumber, String userId)", desc: "books specific seat atomically; returns false if already booked." },
      { sig: "public boolean cancelSeat(int seatNumber, String userId)", desc: "cancels reservation if booked by same user." }
    ]
  },
  {
    num: 46,
    title: "Design a Thread-Safe Connection Pool",
    slug: "design-thread-safe-connection-pool",
    category: "concurrency-design-questions",
    topics: ["Resource Pooling"],
    difficulty: "Medium",
    narrative: "Implement a thread-safe database connection pool that manages K reusable connection objects with blocking acquisition and lease timeouts.",
    className: "ConnectionPool",
    constructorSig: "public ConnectionPool(int poolSize)",
    methods: [
      { sig: "public Connection acquireConnection(long timeoutMs) throws InterruptedException", desc: "borrows an idle connection or blocks until one is returned." },
      { sig: "public void releaseConnection(Connection conn)", desc: "returns connection back to idle pool." }
    ]
  },
  {
    num: 47,
    title: "Traffic Light Controlled Intersection",
    slug: "traffic-light-controlled-intersection",
    category: "concurrency-design-questions",
    topics: ["Traffic Light Controller"],
    difficulty: "Medium",
    narrative: "There is an intersection of two roads (Road A and Road B). Only one green light can be active at a time. Cars from the other road must wait until the signal switches.",
    className: "TrafficLight",
    constructorSig: "public TrafficLight()",
    methods: [
      { sig: "public void carArrived(int carId, int roadId, int direction, Runnable turnGreen, Runnable crossCar) throws InterruptedException", desc: "coordinates safe crossing through intersection." }
    ]
  },
  {
    num: 48,
    title: "Design Deferred Callback Executor",
    slug: "design-deferred-callback-executor",
    category: "concurrency-design-questions",
    topics: ["Design Deferred Callback Executor"],
    difficulty: "Hard",
    narrative: "Design a delayed task scheduler where callbacks are registered with future timestamps and executed precisely when their scheduled time arrives.",
    className: "DeferredCallbackExecutor",
    constructorSig: "public DeferredCallbackExecutor()",
    methods: [
      { sig: "public void schedule(Runnable callback, long delayMs)", desc: "schedules callback execution after delayMs." },
      { sig: "public void start()", desc: "starts background polling worker." }
    ]
  },
  {
    num: 49,
    title: "Design Multithreaded Pub-Sub System",
    slug: "design-multithreaded-pub-sub-system",
    category: "concurrency-design-questions",
    topics: ["Design Multithreaded Pub-Sub System"],
    difficulty: "Hard",
    narrative: "Design an in-memory topic-based Publish-Subscribe message broker where publishers push messages to topics and subscribers receive them asynchronously.",
    className: "PubSubSystem",
    constructorSig: "public PubSubSystem()",
    methods: [
      { sig: "public void publish(String topic, String message)", desc: "broadcasts message to all topic subscribers." },
      { sig: "public void subscribe(String topic, java.util.function.Consumer<String> subscriber)", desc: "registers subscriber consumer callback." }
    ]
  },
  {
    num: 50,
    title: "Design Task Scheduler with Dependencies",
    slug: "design-task-scheduler-with-dependencies",
    category: "concurrency-design-questions",
    topics: ["Task Scheduling with DAG"],
    difficulty: "Hard",
    narrative: "Design a task scheduler that takes a Directed Acyclic Graph (DAG) of dependent tasks and executes tasks as soon as all prerequisite dependencies finish.",
    className: "DependencyTaskScheduler",
    constructorSig: "public DependencyTaskScheduler(int workerThreads)",
    methods: [
      { sig: "public void addTask(String taskId, Runnable task, java.util.List<String> dependencies)", desc: "registers task with its prerequisites." },
      { sig: "public void executeAll() throws InterruptedException", desc: "executes all ready tasks in parallel until entire DAG is complete." }
    ]
  }
];

// Enrich and generate full 50 items
const fullProblems = RAW_CONCURRENCY_PROBLEMS.map((raw) => {
  const catObj = CATEGORIES.find(c => c.id === raw.category) || CATEGORIES[0];
  const className = raw.className || "ConcurrencyTask";
  const constructorSig = raw.constructorSig || `public ${className}()`;
  const methods = raw.methods || [{ sig: "public void execute()", desc: "executes operation thread-safely." }];
  const rules = raw.rules || [
    "All operations must be thread-safe and linearizable across concurrent threads.",
    "Prevent race conditions, data races, deadlocks, and memory visibility issues.",
    "Use atomic instructions or explicit synchronizers rather than busy-waiting loops where appropriate."
  ];

  const examples = raw.examples || [
    {
      input: `// Multiple threads execute operations concurrently on ${className}`,
      output: `All assertions pass with zero data races and consistent state`,
      explanation: `State mutations are synchronized correctly across threads.`
    }
  ];

  const constraints = raw.constraints || [
    "1 <= concurrentThreads <= 50",
    "At most 100,000 operations per benchmark.",
    "Operations must not deadlock or produce race conditions."
  ];

  const hints = raw.hints || [
    "Identify critical sections that modify shared mutable state.",
    "Use synchronization primitives (ReentrantLock, synchronized, Atomic variables, or Condition queues) to coordinate threads.",
    "Ensure lock acquisition order is consistent across all code paths to avoid deadlocks."
  ];

  const testCases = raw.testCases || [
    {
      name: "Case 1",
      calls: [
        { call: `new ${className}()`, returns: "null" },
        { call: "execute()", returns: "void" }
      ],
      input: `Concurrent benchmark with 8 threads`,
      expectedOutput: `Execution complete without deadlock`
    }
  ];

  const starterJava = raw.starterJava || `class ${className} {

    ${constructorSig} {

    }

${methods.map(m => `    ${m.sig} {
        
    }`).join('\n\n')}
}

/*
For reference, the judge creates and runs threads against your class
along these lines, with more threads that all start at the same time
to force contention. In an interview, you can write a driver like this
yourself to demonstrate the full picture:

public class Main {
    public static void main(String[] args) throws InterruptedException {
        ${className} instance = new ${className}();

        Runnable worker = () -> {
            for (int i = 0; i < 1000; i++) {
                // Execute concurrent operations
            }
        };

        Thread t1 = new Thread(worker);
        Thread t2 = new Thread(worker);

        t1.start();
        t2.start();

        t1.join();
        t2.join();

        System.out.println("All threads finished successfully!");
    }
}
*/`;

  const starterPython = `import threading

class ${className}:

    def __init__(self):
        self._lock = threading.Lock()

    def execute(self):
        with self._lock:
            pass
`;

  const starterJs = `class ${className} {
    constructor() {
        
    }

    async execute() {
        
    }
}
`;

  const description = `${raw.narrative}

### Implement the \`${className}\` class:

- \`${constructorSig.replace('public ', '')}\` creates an initialized instance.
${methods.map(m => `- \`${m.sig.replace('public ', '')}\` ${m.desc}`).join('\n')}

${rules.map(r => `- ${r}`).join('\n')}

#### Example 1:
\`\`\`
Input:
${examples[0] ? examples[0].input : 'threads = 4'}

Output:
${examples[0] ? examples[0].output : 'success'}

Explanation: ${examples[0] ? examples[0].explanation : 'All operations executed safely.'}
\`\`\`

${examples[1] ? `#### Example 2:
\`\`\`
Input:
${examples[1].input}

Output:
${examples[1].output}

Explanation: ${examples[1].explanation}
\`\`\`
` : ''}

### Constraints
${constraints.map(c => `- ${c}`).join('\n')}
`;

  return {
    id: raw.slug,
    number: raw.num,
    title: raw.title,
    category: raw.category,
    categoryTitle: catObj.title,
    difficulty: raw.difficulty,
    topics: raw.topics,
    narrative: raw.narrative,
    className: className,
    constructorSig: constructorSig,
    methods: methods,
    rules: rules,
    examples: examples,
    constraints: constraints,
    hints: hints,
    testCases: testCases,
    description: description,
    starterCode: {
      java: starterJava,
      python: starterPython,
      javascript: starterJs
    },
    editorial: `### Concurrency Analysis: ${raw.title}\n\n#### 1. Critical Sections & Memory Visibility\n- Ensure atomic operations using \`synchronized\`, \`ReentrantLock\`, or \`java.util.concurrent.atomic\`.\n- Guard against reordering and visibility pitfalls using \`volatile\` references.\n\n#### 2. Deadlock Prevention & Starvation\n- Impose a strict lock acquisition order for multi-resource operations.\n- Prefer wait/notify signaling or condition queues over CPU-intensive spinning.`
  };
});

// All unique topic tags for filtering
const allTopics = Array.from(new Set(fullProblems.flatMap(p => p.topics))).sort();

const fileContent = `// ============================================================================
// 50 Multithreaded Concurrency Implementation Practice Scenarios
// Complete interview and real-world concurrency dataset
// ============================================================================

export const CONCURRENCY_CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};

export const CONCURRENCY_PROBLEMS = ${JSON.stringify(fullProblems, null, 2)};

export const CONCURRENCY_TOPICS_LIST = ${JSON.stringify(allTopics, null, 2)};
`;

const outputPath = path.resolve(__dirname, 'frontend/src/data/concurrencyPracticeData.js');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Successfully generated 50 Concurrency problems in ${outputPath}`);
