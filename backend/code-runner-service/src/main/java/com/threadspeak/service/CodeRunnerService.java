package com.threadspeak.service;

import com.threadspeak.model.CodeExecutionRequest;
import com.threadspeak.model.CodeExecutionResult;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class CodeRunnerService {

    private static final long EXECUTION_TIMEOUT_MS = 6000; // 6 seconds execution timeout

    public Map<String, Map<String, Object>> getScenarios() {
        Map<String, Map<String, Object>> scenarios = new LinkedHashMap<>();

        // Scenario 1: Deadlock & Prevention
        scenarios.put("deadlock-simulation", Map.of(
                "id", "deadlock-simulation",
                "title", "Thread Deadlock & Global Lock Ordering Fix",
                "category", "Concurrency",
                "description", "See how two threads acquiring locks in reverse order create a circular deadlock, and how strict global lock ordering eliminates it completely.",
                "initialCode",
                "public class DeadlockDemo {\n" +
                "    private static final Object LockA = new Object();\n" +
                "    private static final Object LockB = new Object();\n\n" +
                "    public static void main(String[] args) throws InterruptedException {\n" +
                "        System.out.println(\"Starting Thread Concurrency Execution...\");\n\n" +
                "        // Thread 1 locks A then wants B\n" +
                "        Thread t1 = new Thread(() -> {\n" +
                "            synchronized (LockA) {\n" +
                "                System.out.println(\"[Thread-1] Acquired LockA. Attempting to acquire LockB...\");\n" +
                "                try { Thread.sleep(50); } catch (Exception e) {}\n" +
                "                synchronized (LockB) {\n" +
                "                    System.out.println(\"[Thread-1] Successfully acquired LockA + LockB!\");\n" +
                "                }\n" +
                "            }\n" +
                "        });\n\n" +
                "        // Thread 2 acquires LockA first (Strict Ordering to eliminate Deadlock)\n" +
                "        Thread t2 = new Thread(() -> {\n" +
                "            synchronized (LockA) {\n" +
                "                System.out.println(\"[Thread-2] Acquired LockA. Attempting to acquire LockB...\");\n" +
                "                try { Thread.sleep(50); } catch (Exception e) {}\n" +
                "                synchronized (LockB) {\n" +
                "                    System.out.println(\"[Thread-2] Successfully acquired LockA + LockB!\");\n" +
                "                }\n" +
                "            }\n" +
                "        });\n\n" +
                "        t1.start();\n" +
                "        t2.start();\n" +
                "        t1.join(1000);\n" +
                "        t2.join(1000);\n" +
                "        System.out.println(\"\\n✓ Execution completed cleanly without circular wait.\");\n" +
                "    }\n" +
                "}\n"
        ));

        // Scenario 2: Virtual Threads vs Platform Threads
        scenarios.put("virtual-threads-bench", Map.of(
                "id", "virtual-threads-bench",
                "title", "Java 21 Project Loom: 10,000 Virtual Threads",
                "category", "Modern Java",
                "description", "Spawn 10,000 concurrent virtual threads and observe how the JVM continuations suspend and unmount from OS carrier threads during I/O operations.",
                "initialCode",
                "import java.util.concurrent.*;\n" +
                "import java.time.Instant;\n" +
                "import java.time.Duration;\n\n" +
                "public class VirtualThreadsDemo {\n" +
                "    public static void main(String[] args) throws Exception {\n" +
                "        Instant start = Instant.now();\n" +
                "        int taskCount = 10_000;\n" +
                "        System.out.println(\"Launching \" + taskCount + \" Virtual Threads with Executors.newVirtualThreadPerTaskExecutor()...\");\n\n" +
                "        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {\n" +
                "            for (int i = 1; i <= taskCount; i++) {\n" +
                "                final int id = i;\n" +
                "                executor.submit(() -> {\n" +
                "                    Thread.sleep(Duration.ofMillis(50));\n" +
                "                    if (id == 2500 || id == 5000 || id == 7500 || id == 10000) {\n" +
                "                        System.out.println(\"✓ Task #\" + id + \" completed on carrier thread: \" + Thread.currentThread());\n" +
                "                    }\n" +
                "                    return id;\n" +
                "                });\n" +
                "            }\n" +
                "        }\n\n" +
                "        Instant finish = Instant.now();\n" +
                "        long elapsedMs = Duration.between(start, finish).toMillis();\n" +
                "        System.out.println(\"\\n=========================================\");\n" +
                "        System.out.println(\"All 10,000 Virtual Threads completed in: \" + elapsedMs + \" ms!\");\n" +
                "        System.out.println(\"Memory Footprint: ~2.5 MB total (vs ~10 GB for 10k OS threads)\");\n" +
                "        System.out.println(\"=========================================\");\n" +
                "    }\n" +
                "}\n"
        ));

        // Scenario 3: Breaking & Fixing Singleton
        scenarios.put("singleton-reflection", Map.of(
                "id", "singleton-reflection",
                "title", "Breaking Singleton with Reflection & The Enum Fix",
                "category", "LLD Patterns",
                "description", "Observe how Java Reflection breaks private constructors in traditional singletons, and why Joshua Bloch's Enum Singleton is 100% immune.",
                "initialCode",
                "import java.lang.reflect.Constructor;\n\n" +
                "public class SingletonSecurityDemo {\n" +
                "    public static void main(String[] args) {\n" +
                "        System.out.println(\"=== 1. Traditional Class Singleton ===\");\n" +
                "        ClassicSingleton s1 = ClassicSingleton.getInstance();\n" +
                "        try {\n" +
                "            Constructor<ClassicSingleton> c = ClassicSingleton.class.getDeclaredConstructor();\n" +
                "            c.setAccessible(true);\n" +
                "            ClassicSingleton s2 = c.newInstance();\n" +
                "            System.out.println(\"s1 Identity Hash: \" + System.identityHashCode(s1));\n" +
                "            System.out.println(\"s2 Identity Hash: \" + System.identityHashCode(s2));\n" +
                "            System.out.println(\"⚠️ VIOLATION: Reflection bypassed private constructor!\");\n" +
                "        } catch (Exception e) {\n" +
                "            System.out.println(\"Caught exception: \" + e.getMessage());\n" +
                "        }\n\n" +
                "        System.out.println(\"\\n=== 2. Enum Singleton (Joshua Bloch Pattern) ===\");\n" +
                "        EnumSingleton e1 = EnumSingleton.INSTANCE;\n" +
                "        EnumSingleton e2 = EnumSingleton.INSTANCE;\n" +
                "        System.out.println(\"e1 Identity Hash: \" + System.identityHashCode(e1));\n" +
                "        System.out.println(\"e2 Identity Hash: \" + System.identityHashCode(e2));\n" +
                "        System.out.println(\"Are instances identical? \" + (e1 == e2));\n" +
                "        e1.doWork();\n" +
                "    }\n" +
                "}\n\n" +
                "class ClassicSingleton {\n" +
                "    private static final ClassicSingleton INSTANCE = new ClassicSingleton();\n" +
                "    private ClassicSingleton() {}\n" +
                "    public static ClassicSingleton getInstance() { return INSTANCE; }\n" +
                "}\n\n" +
                "enum EnumSingleton {\n" +
                "    INSTANCE;\n" +
                "    public void doWork() {\n" +
                "        System.out.println(\"✓ Enum Singleton guarantees thread safety, serialization, and reflection immunity!\");\n" +
                "    }\n" +
                "}\n"
        ));

        // Scenario 4: Spring @Transactional Proxy & Self-Invocation
        scenarios.put("spring-proxy-bypass", Map.of(
                "id", "spring-proxy-bypass",
                "title", "Spring @Transactional Proxy & Self-Invocation Trap",
                "category", "Spring Boot",
                "description", "Discover why calling an internal @Transactional method from another method in the same class fails to start a database transaction due to AOP Dynamic Proxy mechanics.",
                "initialCode",
                "public class SpringProxyDemo {\n" +
                "    public static void main(String[] args) {\n" +
                "        System.out.println(\"==========================================\");\n" +
                "        System.out.println(\"Spring AOP Dynamic Proxy Simulation\");\n" +
                "        System.out.println(\"==========================================\\n\");\n\n" +
                "        OrderService target = new OrderServiceImpl();\n" +
                "        OrderService proxy = new TransactionalProxy(target);\n\n" +
                "        System.out.println(\"1. External Call through Spring Proxy:\");\n" +
                "        proxy.checkoutOrder();\n\n" +
                "        System.out.println(\"\\n2. Internal Call (Self-Invocation):\");\n" +
                "        target.internalDirectCall();\n" +
                "    }\n" +
                "}\n\n" +
                "interface OrderService {\n" +
                "    void checkoutOrder();\n" +
                "    void saveToDatabase();\n" +
                "    void internalDirectCall();\n" +
                "}\n\n" +
                "class OrderServiceImpl implements OrderService {\n" +
                "    public void checkoutOrder() {\n" +
                "        System.out.println(\"   -> Executing business logic for order checkout...\");\n" +
                "    }\n" +
                "    public void saveToDatabase() {\n" +
                "        System.out.println(\"   -> [DB UPDATE] Inserting order record into database table...\");\n" +
                "    }\n" +
                "    public void internalDirectCall() {\n" +
                "        System.out.println(\"   -> Inside internalDirectCall(). Now calling this.saveToDatabase()...\");\n" +
                "        this.saveToDatabase(); // Direct 'this' call bypasses the proxy!\n" +
                "        System.out.println(\"   ⚠️ NOTICE: [AOP PROXY] BEGIN/COMMIT WAS BYPASSED because 'this' calls bypass the proxy!\");\n" +
                "    }\n" +
                "}\n\n" +
                "class TransactionalProxy implements OrderService {\n" +
                "    private final OrderService target;\n" +
                "    public TransactionalProxy(OrderService target) { this.target = target; }\n\n" +
                "    public void checkoutOrder() {\n" +
                "        System.out.println(\"   [AOP PROXY] -> BEGIN DB TRANSACTION\");\n" +
                "        target.checkoutOrder();\n" +
                "        System.out.println(\"   [AOP PROXY] -> COMMIT DB TRANSACTION ✓\");\n" +
                "    }\n" +
                "    public void saveToDatabase() {\n" +
                "        System.out.println(\"   [AOP PROXY] -> BEGIN DB TRANSACTION\");\n" +
                "        target.saveToDatabase();\n" +
                "        System.out.println(\"   [AOP PROXY] -> COMMIT DB TRANSACTION ✓\");\n" +
                "    }\n" +
                "    public void internalDirectCall() { target.internalDirectCall(); }\n" +
                "}\n"
        ));

        return scenarios;
    }

    /**
     * Compiles and executes real Java source code on the server, capturing standard output,
     * runtime diagnostics, and real javac compilation errors.
     */
    public CodeExecutionResult executeCode(CodeExecutionRequest request) {
        long startTime = System.currentTimeMillis();
        Path tempDir = null;

        try {
            tempDir = Files.createTempDirectory("threadspeak_runner_");
            List<File> sourceFiles = new ArrayList<>();
            String mainClassName = null;

            Map<String, String> files = request.getFiles();

            if (files != null && !files.isEmpty()) {
                // Multi-file compilation
                for (Map.Entry<String, String> entry : files.entrySet()) {
                    String fileName = entry.getKey();
                    String content = entry.getValue();

                    if (!fileName.endsWith(".java")) {
                        fileName = fileName + ".java";
                    }

                    Path filePath = tempDir.resolve(fileName);
                    Files.writeString(filePath, content != null ? content : "", StandardCharsets.UTF_8);
                    sourceFiles.add(filePath.toFile());

                    // Check if this file contains main entry point
                    if (content != null && (content.contains("public static void main") || content.contains("static void main"))) {
                        mainClassName = extractClassNameFromContent(content, fileName);
                    }
                }

                if (mainClassName == null && !sourceFiles.isEmpty()) {
                    mainClassName = extractClassNameFromFile(sourceFiles.get(0));
                }
            } else {
                // Single-file compilation
                String code = request.getCode() != null ? request.getCode() : "";

                // If code has no class definition, wrap it in a standard Main class
                if (!code.contains("class ") && !code.contains("enum ") && !code.contains("interface ")) {
                    code = "public class Main {\n    public static void main(String[] args) {\n" + code + "\n    }\n}";
                }

                mainClassName = extractClassNameFromContent(code, "Main.java");
                String fileName = mainClassName + ".java";
                Path filePath = tempDir.resolve(fileName);
                Files.writeString(filePath, code, StandardCharsets.UTF_8);
                sourceFiles.add(filePath.toFile());
            }

            if (mainClassName == null) {
                mainClassName = "Main";
            }

            // ==========================================
            // 1. REAL JAVAC COMPILATION STEP
            // ==========================================
            List<String> compileCmd = new ArrayList<>();
            compileCmd.add("javac");
            compileCmd.add("-encoding");
            compileCmd.add("UTF-8");
            compileCmd.add("-d");
            compileCmd.add(tempDir.toAbsolutePath().toString());

            for (File src : sourceFiles) {
                compileCmd.add(src.getAbsolutePath());
            }

            ProcessBuilder compileProcessBuilder = new ProcessBuilder(compileCmd);
            compileProcessBuilder.directory(tempDir.toFile());
            Process compileProcess = compileProcessBuilder.start();

            String compileErrors = readStream(compileProcess.getErrorStream());
            boolean compileSuccess = compileProcess.waitFor(10, TimeUnit.SECONDS) && compileProcess.exitValue() == 0;

            if (!compileSuccess) {
                long compileTime = System.currentTimeMillis() - startTime;
                String cleanedErrors = cleanErrorOutput(compileErrors, tempDir.toAbsolutePath().toString());

                List<String> errLines = Arrays.stream(cleanedErrors.split("\n"))
                        .map(String::trim)
                        .filter(l -> !l.isEmpty())
                        .collect(Collectors.toList());

                return new CodeExecutionResult(
                        false,
                        "❌ Compilation Failed:\n\n" + cleanedErrors,
                        cleanedErrors,
                        compileTime,
                        errLines,
                        Collections.emptyList(),
                        "Check syntax, missing semicolons, or unresolved type symbols."
                );
            }

            // ==========================================
            // 2. REAL JAVA BYTECODE EXECUTION STEP
            // ==========================================
            List<String> runCmd = new ArrayList<>();
            runCmd.add("java");
            runCmd.add("-Dfile.encoding=UTF-8");
            runCmd.add("-cp");
            runCmd.add(tempDir.toAbsolutePath().toString());
            runCmd.add(mainClassName);

            ProcessBuilder runProcessBuilder = new ProcessBuilder(runCmd);
            runProcessBuilder.directory(tempDir.toFile());
            Process runProcess = runProcessBuilder.start();

            // Pipe standard input (stdin) if provided
            if (request.getStdin() != null && !request.getStdin().isEmpty()) {
                try (java.io.OutputStream os = runProcess.getOutputStream()) {
                    os.write(request.getStdin().getBytes(StandardCharsets.UTF_8));
                    os.flush();
                } catch (Exception e) {
                    // Ignore stream write errors if process terminated immediately
                }
            }

            CompletableFuture<String> stdoutFuture = CompletableFuture.supplyAsync(() -> readStream(runProcess.getInputStream()));
            CompletableFuture<String> stderrFuture = CompletableFuture.supplyAsync(() -> readStream(runProcess.getErrorStream()));

            boolean finishedInTime = runProcess.waitFor(EXECUTION_TIMEOUT_MS, TimeUnit.MILLISECONDS);

            if (!finishedInTime) {
                runProcess.destroyForcibly();
                long elapsed = System.currentTimeMillis() - startTime;
                String timeoutMsg = "⏱️ Time Limit Exceeded (Execution exceeded 6.0 seconds timeout limit).\nPossible infinite loop or deadlock detected.";

                return new CodeExecutionResult(
                        false,
                        timeoutMsg,
                        "Time Limit Exceeded",
                        elapsed,
                        List.of(timeoutMsg),
                        Collections.emptyList(),
                        "Ensure your loops terminate and thread locks acquire in consistent order."
                );
            }

            String stdout = stdoutFuture.get(1, TimeUnit.SECONDS);
            String stderr = stderrFuture.get(1, TimeUnit.SECONDS);
            long executionTime = System.currentTimeMillis() - startTime;
            int exitCode = runProcess.exitValue();

            List<String> stdoutLines = Arrays.stream(stdout.split("\n"))
                    .map(s -> s.replace("\r", ""))
                    .collect(Collectors.toList());

            if (exitCode != 0 && !stderr.isBlank()) {
                String cleanedStderr = cleanErrorOutput(stderr, tempDir.toAbsolutePath().toString());
                return new CodeExecutionResult(
                        false,
                        stdout + "\n❌ Runtime Error (Exit Code " + exitCode + "):\n" + cleanedStderr,
                        cleanedStderr,
                        executionTime,
                        stdoutLines,
                        Collections.emptyList(),
                        "An unhandled exception occurred during execution."
                );
            }

            String output = stdout;
            if (output.isBlank() && !stderr.isBlank()) {
                output = stderr;
            } else if (output.isBlank()) {
                output = "Program executed successfully with exit code 0 (No console output produced).";
            }

            return new CodeExecutionResult(
                    true,
                    output,
                    null,
                    executionTime,
                    stdoutLines,
                    Collections.emptyList(),
                    "Java 21 bytecode executed cleanly with exit code " + exitCode + "."
            );

        } catch (Exception e) {
            long elapsed = System.currentTimeMillis() - startTime;
            String errorMsg = "Execution failed: " + e.getMessage();
            return new CodeExecutionResult(
                    false,
                    errorMsg,
                    e.getMessage(),
                    elapsed,
                    List.of(errorMsg),
                    Collections.emptyList(),
                    "Execution error encountered."
            );
        } finally {
            if (tempDir != null) {
                deleteDirectoryRecursively(tempDir.toFile());
            }
        }
    }

    private String extractClassNameFromContent(String code, String defaultFileName) {
        // 1. Look for 'public class ClassName'
        Pattern publicClassPattern = Pattern.compile("public\\s+(?:final\\s+)?class\\s+([A-Za-z0-9_]+)");
        Matcher matcher = publicClassPattern.matcher(code);
        if (matcher.find()) {
            return matcher.group(1);
        }

        // 2. Look for class containing main method
        Pattern classWithMainPattern = Pattern.compile("class\\s+([A-Za-z0-9_]+)[^{]*\\{[^}]*public\\s+static\\s+void\\s+main", Pattern.DOTALL);
        Matcher mainMatcher = classWithMainPattern.matcher(code);
        if (mainMatcher.find()) {
            return mainMatcher.group(1);
        }

        // 3. Look for any class definition
        Pattern anyClassPattern = Pattern.compile("(?:class|enum)\\s+([A-Za-z0-9_]+)");
        Matcher anyMatcher = anyClassPattern.matcher(code);
        if (anyMatcher.find()) {
            return anyMatcher.group(1);
        }

        return defaultFileName.replace(".java", "");
    }

    private String extractClassNameFromFile(File file) {
        try {
            String content = Files.readString(file.toPath());
            return extractClassNameFromContent(content, file.getName());
        } catch (Exception e) {
            return file.getName().replace(".java", "");
        }
    }

    private String readStream(java.io.InputStream is) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(is, StandardCharsets.UTF_8))) {
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
            return sb.toString();
        } catch (Exception e) {
            return "";
        }
    }

    private String cleanErrorOutput(String rawError, String tempPath) {
        if (rawError == null) return "";
        return rawError.replace(tempPath + File.separator, "")
                       .replace(tempPath + "/", "")
                       .replace(tempPath, "");
    }

    private void deleteDirectoryRecursively(File dir) {
        try {
            if (dir != null && dir.exists()) {
                File[] files = dir.listFiles();
                if (files != null) {
                    for (File f : files) {
                        if (f.isDirectory()) deleteDirectoryRecursively(f);
                        else f.delete();
                    }
                }
                dir.delete();
            }
        } catch (Exception ignored) {}
    }
}
