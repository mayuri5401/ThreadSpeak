package com.threadspeak.controller;

import com.threadspeak.model.SimulationRequest;
import com.threadspeak.model.SimulationResult;
import com.threadspeak.service.SimulatorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/simulate")
@CrossOrigin
public class SimulatorController {

    private final SimulatorService simulatorService;

    public SimulatorController(SimulatorService simulatorService) {
        this.simulatorService = simulatorService;
    }

    @PostMapping("/jvm")
    public ResponseEntity<SimulationResult> simulateJvm(@RequestBody(required = false) SimulationRequest request) {
        if (request == null) request = new SimulationRequest("jvm", "allocate", null);
        return ResponseEntity.ok(simulatorService.simulateJvm(request));
    }

    @PostMapping("/threads")
    public ResponseEntity<SimulationResult> simulateThreads(@RequestBody(required = false) SimulationRequest request) {
        if (request == null) request = new SimulationRequest("threads", "run_threads", null);
        return ResponseEntity.ok(simulatorService.simulateThreads(request));
    }

    @PostMapping("/lru")
    public ResponseEntity<SimulationResult> simulateLru(@RequestBody(required = false) SimulationRequest request) {
        if (request == null) request = new SimulationRequest("lru", "put", null);
        return ResponseEntity.ok(simulatorService.simulateLru(request));
    }

    @PostMapping("/hld")
    public ResponseEntity<SimulationResult> simulateHld(@RequestBody(required = false) SimulationRequest request) {
        if (request == null) request = new SimulationRequest("hld", "traffic_spike", null);
        return ResponseEntity.ok(simulatorService.simulateHld(request));
    }
}
