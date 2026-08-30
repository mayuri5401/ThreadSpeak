package com.threadspeak.controller;

import com.threadspeak.model.CodeExecutionRequest;
import com.threadspeak.model.CodeExecutionResult;
import com.threadspeak.service.CodeRunnerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/code")
@CrossOrigin
public class CodeRunnerController {

    private final CodeRunnerService codeRunnerService;

    public CodeRunnerController(CodeRunnerService codeRunnerService) {
        this.codeRunnerService = codeRunnerService;
    }

    @GetMapping("/scenarios")
    public ResponseEntity<Map<String, Map<String, Object>>> getScenarios() {
        return ResponseEntity.ok(codeRunnerService.getScenarios());
    }

    @PostMapping("/run")
    public ResponseEntity<CodeExecutionResult> runCode(@RequestBody CodeExecutionRequest request) {
        return ResponseEntity.ok(codeRunnerService.executeCode(request));
    }
}
