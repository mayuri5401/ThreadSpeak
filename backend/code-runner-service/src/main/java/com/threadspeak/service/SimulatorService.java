package com.threadspeak.service;

import com.threadspeak.model.SimulationRequest;
import com.threadspeak.model.SimulationResult;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SimulatorService {

    public SimulationResult simulateJvm(SimulationRequest request) {
        String action = request.getAction() != null ? request.getAction() : "allocate";
        Map<String, Object> params = request.getParams() != null ? request.getParams() : Map.of();

        List<String> logs = new ArrayList<>();
        Map<String, Object> state = new HashMap<>();
        Map<String, Object> metrics = new HashMap<>();
        List<Map<String, Object>> stepFrames = new ArrayList<>();

        int edenCapacity = 100;
        int s0Capacity = 30;
        int s1Capacity = 30;
        int oldGenCapacity = 200;

        int currentEden = ((Number) params.getOrDefault("currentEden", 20)).intValue();
        int currentS0 = ((Number) params.getOrDefault("currentS0", 10)).intValue();
        int currentS1 = ((Number) params.getOrDefault("currentS1", 0)).intValue();
        int currentOldGen = ((Number) params.getOrDefault("currentOldGen", 30)).intValue();
        int stackFramesCount = ((Number) params.getOrDefault("stackFrames", 2)).intValue();

        if ("allocate".equalsIgnoreCase(action)) {
            int allocSize = ((Number) params.getOrDefault("allocSize", 25)).intValue();
            String objName = (String) params.getOrDefault("objectName", "OrderDTO-" + System.currentTimeMillis() % 1000);

            logs.add("Allocating " + allocSize + "MB on Heap (" + objName + ")");
            logs.add("Stack frame created: main() -> processOrder()");
            stackFramesCount++;

            if (currentEden + allocSize >= edenCapacity) {
                logs.add("[Minor GC Triggered] Eden space full (" + (currentEden + allocSize) + "MB / " + edenCapacity + "MB)!");
                logs.add("Stop-The-World (STW) pause: 1.2ms. Scanning GC Roots from Active Stack Frames.");

                // Minor GC logic
                int survivingEden = (int) (currentEden * 0.4);
                currentEden = 0;

                if (currentS0 > 0) {
                    // S0 -> S1
                    currentS1 = currentS0 + survivingEden;
                    currentS0 = 0;
                    logs.add("Moved survivors from S0 + Eden to Survivor S1. Object age incremented.");
                } else {
                    currentS0 = survivingEden;
                    logs.add("Moved survivors from Eden to Survivor S0. Object age incremented.");
                }

                // If survivor exceeds capacity, promote to Old Gen
                if (currentS0 > s0Capacity) {
                    int excess = currentS0 - s0Capacity;
                    currentS0 = s0Capacity;
                    currentOldGen = Math.min(oldGenCapacity, currentOldGen + excess);
                    logs.add("[Tenuring Promotion] " + excess + "MB promoted from Survivor to Old Generation!");
                } else if (currentS1 > s1Capacity) {
                    int excess = currentS1 - s1Capacity;
                    currentS1 = s1Capacity;
                    currentOldGen = Math.min(oldGenCapacity, currentOldGen + excess);
                    logs.add("[Tenuring Promotion] " + excess + "MB promoted from Survivor to Old Generation!");
                }
            } else {
                currentEden += allocSize;
                logs.add("Object successfully placed in Young Gen (Eden space: " + currentEden + "MB / " + edenCapacity + "MB).");
            }
        } else if ("gc".equalsIgnoreCase(action)) {
            logs.add("[Manual Major / Full GC Triggered] System.gc() invoked.");
            logs.add("Sweeping Young Gen (Eden, S0, S1) and compacting Old Generation.");
            currentEden = 0;
            currentS0 = 0;
            currentS1 = 0;
            currentOldGen = (int) (currentOldGen * 0.6); // Retain live singletons
            logs.add("Full GC completed. Reclaimed memory successfully.");
        }

        state.put("eden", currentEden);
        state.put("s0", currentS0);
        state.put("s1", currentS1);
        state.put("oldGen", currentOldGen);
        state.put("stackFrames", stackFramesCount);
        state.put("metaspace", 48); // MB

        metrics.put("edenUsagePct", (currentEden * 100) / edenCapacity);
        metrics.put("oldGenUsagePct", (currentOldGen * 100) / oldGenCapacity);
        metrics.put("gcPauseTimeMs", "gc".equalsIgnoreCase(action) ? 8.4 : 1.2);

        return new SimulationResult(true, "JVM simulation step completed", state, logs, metrics, stepFrames);
    }

    public SimulationResult simulateThreads(SimulationRequest request) {
        Map<String, Object> params = request.getParams() != null ? request.getParams() : Map.of();
        String lockType = (String) params.getOrDefault("lockType", "synchronized"); // "unsafe", "synchronized", "atomic", "reentrant"
        int threadCount = ((Number) params.getOrDefault("threadCount", 3)).intValue();
        int iterations = ((Number) params.getOrDefault("iterations", 1000)).intValue();

        List<String> logs = new ArrayList<>();
        Map<String, Object> state = new HashMap<>();
        Map<String, Object> metrics = new HashMap<>();
        List<Map<String, Object>> stepFrames = new ArrayList<>();

        logs.add("Initializing " + threadCount + " concurrent worker threads with synchronization mode: [" + lockType.toUpperCase() + "]");

        int expectedFinal = threadCount * iterations;
        int actualFinal;
        long executionTimeMs;
        int conflictsDetected = 0;

        switch (lockType.toLowerCase()) {
            case "unsafe" -> {
                // Simulates lost updates from race condition
                actualFinal = (int) (expectedFinal * (0.65 + Math.random() * 0.15));
                conflictsDetected = expectedFinal - actualFinal;
                executionTimeMs = 4;
                logs.add("WARNING: Non-synchronized counter++ caused " + conflictsDetected + " lost updates due to L1 cache incoherency and non-atomic read-modify-write bytecode!");
            }
            case "synchronized" -> {
                actualFinal = expectedFinal;
                executionTimeMs = 18;
                logs.add("SUCCESS: Java Monitor lock (synchronized) enforced mutual exclusion. All " + actualFinal + " increments preserved.");
                logs.add("Thread State Log: Threads dynamically switched between RUNNABLE and BLOCKED on monitor lock acquisition.");
            }
            case "atomic" -> {
                actualFinal = expectedFinal;
                executionTimeMs = 8;
                logs.add("SUCCESS: AtomicInteger utilized CPU hardware CAS (Compare-And-Swap) instructions (LOCK CMPXCHG). Lock-free high throughput.");
            }
            case "reentrant" -> {
                actualFinal = expectedFinal;
                executionTimeMs = 14;
                logs.add("SUCCESS: ReentrantLock acquired and released with fairness support. Final counter: " + actualFinal);
            }
            default -> {
                actualFinal = expectedFinal;
                executionTimeMs = 10;
            }
        }

        // Generate visual step timeline for UI animation
        for (int i = 1; i <= threadCount; i++) {
            Map<String, Object> frame = new HashMap<>();
            frame.put("threadId", "Thread-" + i);
            frame.put("state", "unsafe".equals(lockType) ? "RUNNABLE (RACING)" : (i == 1 ? "RUNNABLE (IN_CRITICAL_SECTION)" : "BLOCKED (WAITING_FOR_LOCK)"));
            frame.put("incrementsDone", actualFinal / threadCount);
            stepFrames.add(frame);
        }

        state.put("lockType", lockType);
        state.put("threadCount", threadCount);
        state.put("expectedValue", expectedFinal);
        state.put("actualValue", actualFinal);
        state.put("isRaceConditionPresent", actualFinal != expectedFinal);

        metrics.put("executionTimeMs", executionTimeMs);
        metrics.put("conflicts", conflictsDetected);
        metrics.put("throughputOpsPerSec", (long) ((actualFinal / (double) Math.max(1, executionTimeMs)) * 1000));

        return new SimulationResult(true, "Threading simulation completed", state, logs, metrics, stepFrames);
    }

    public SimulationResult simulateLru(SimulationRequest request) {
        String action = request.getAction() != null ? request.getAction() : "put";
        Map<String, Object> params = request.getParams() != null ? request.getParams() : Map.of();

        int capacity = ((Number) params.getOrDefault("capacity", 4)).intValue();
        String key = (String) params.getOrDefault("key", "user:42");
        String value = (String) params.getOrDefault("value", "UserData{name='Alice'}");

        List<String> logs = new ArrayList<>();
        Map<String, Object> state = new HashMap<>();
        Map<String, Object> metrics = new HashMap<>();

        logs.add("Executing LRU Cache operation: [" + action.toUpperCase() + "] with key='" + key + "' (Capacity: " + capacity + ")");

        if ("get".equalsIgnoreCase(action)) {
            logs.add("1. Querying HashMap for key='" + key + "' [O(1)]");
            logs.add("2. Cache Hit! Detaching Node from current DLL position");
            logs.add("3. Re-attaching Node directly after Head pointer [O(1)] (Marked Most Recently Used)");
        } else {
            logs.add("1. Calculating hash bucket and checking map.containsKey('" + key + "')");
            logs.add("2. Creating new Node(key='" + key + "', value='" + value + "')");
            logs.add("3. Attaching to DLL front (Head.next)");
            logs.add("4. If size > " + capacity + ": Evicting tail.prev (Least Recently Used) from both DLL and HashMap!");
        }

        state.put("capacity", capacity);
        state.put("key", key);
        state.put("value", value);
        metrics.put("lookupComplexity", "O(1)");
        metrics.put("evictionComplexity", "O(1)");

        return new SimulationResult(true, "LRU Cache step completed", state, logs, metrics, List.of());
    }

    public SimulationResult simulateHld(SimulationRequest request) {
        Map<String, Object> params = request.getParams() != null ? request.getParams() : Map.of();
        String pattern = (String) params.getOrDefault("pattern", "normal"); // "normal", "spike", "cache_down", "db_failover"

        List<String> logs = new ArrayList<>();
        Map<String, Object> state = new HashMap<>();
        Map<String, Object> metrics = new HashMap<>();

        switch (pattern) {
            case "spike" -> {
                logs.add("[Flash Sale Traffic Spike] Ingress QPS jumped from 5,000 to 85,000 requests/sec!");
                logs.add("Cloudflare CDN absorbed 60% of static asset hits.");
                logs.add("Load Balancer distributed traffic evenly across 12 microservice pods.");
                logs.add("Redis Cache Hit Ratio: 94.2%. DB Primary load remaining stable at 38% CPU.");
                metrics.put("qps", 85000);
                metrics.put("latencyMs", 18);
                metrics.put("cacheHitRate", 94.2);
                metrics.put("dbCpuPct", 38);
                metrics.put("errorRatePct", 0.02);
            }
            case "cache_down" -> {
                logs.add("[ALERT: Cache Cluster Degraded] Redis Node-2 connection timeout!");
                logs.add("Cache Stampede: Requests falling back directly to PostgreSQL Primary & Replicas.");
                logs.add("Resilience4j Circuit Breaker entered HALF-OPEN state to throttle DB queries.");
                metrics.put("qps", 15000);
                metrics.put("latencyMs", 340);
                metrics.put("cacheHitRate", 22.0);
                metrics.put("dbCpuPct", 92);
                metrics.put("errorRatePct", 4.8);
            }
            case "db_failover" -> {
                logs.add("[Database Primary Failure] Healthcheck probe failed on db-primary-01.");
                logs.add("Raft consensus leader election initiated. Promoting db-replica-02 to new Primary.");
                logs.add("Read traffic served seamlessly from surviving replicas. Write pause: 1.8 seconds.");
                metrics.put("qps", 10000);
                metrics.put("latencyMs", 45);
                metrics.put("cacheHitRate", 88.5);
                metrics.put("dbCpuPct", 54);
                metrics.put("errorRatePct", 0.1);
            }
            default -> {
                logs.add("[Normal Traffic] Ingress steady at 4,500 QPS.");
                logs.add("All services healthy. CDN & Redis serving 91% of total read traffic.");
                metrics.put("qps", 4500);
                metrics.put("latencyMs", 8);
                metrics.put("cacheHitRate", 91.0);
                metrics.put("dbCpuPct", 18);
                metrics.put("errorRatePct", 0.0);
            }
        }

        state.put("pattern", pattern);
        return new SimulationResult(true, "HLD traffic simulation completed", state, logs, metrics, List.of());
    }
}
