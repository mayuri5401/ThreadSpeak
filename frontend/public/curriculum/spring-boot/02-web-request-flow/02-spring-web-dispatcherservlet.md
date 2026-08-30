---
id: "spring-web-dispatcherservlet"
trackId: "spring-boot"
trackTitle: "Spring Boot & Microservices"
category: "Web & Request Flow"
title: "Spring Web MVC: Deep Request Flow & DispatcherServlet Architecture"
slug: "spring-web-dispatcherservlet"
summary: "Deep architectural trace of an HTTP request: Client -> Tomcat NIO -> Filter Chain -> DispatcherServlet -> HandlerMapping -> HandlerAdapter -> Controller -> HttpMessageConverter (Jackson JSON) -> Client."
eli10: "Think of an international airport terminal. DispatcherServlet is the Central Flight Information Desk. The passenger (HTTP Request) arrives at customs (Security Filters), asks the Information Desk where to go. The desk checks the flight schedule (HandlerMapping) and directs the passenger to the correct Gate (Controller). The response is translated to your native language (Jackson JSON Converter) before takeoff!"
mentalModel: "HTTP Request -> Servlet Filter Chain -> DispatcherServlet.doDispatch() -> HandlerMapping.getHandler() -> HandlerAdapter.handle() -> Controller Method -> HttpMessageConverter (Jackson JSON) -> HTTP 200 Response."
difficulty: "Intermediate"
estimatedMinutes: 16
tags: ["Spring MVC","DispatcherServlet","HandlerMapping","HandlerAdapter","Jackson","Filter Chain"]
animationType: "spring-request-flow"
codeSnippet:
  language: "java"
  explanation: "Typical Spring REST Controller handled by DispatcherServlet."
  code: |
    @RestController
    @RequestMapping("/api/v1/users")
    public class UserController {
        private final UserService userService;
        public UserController(UserService u) { this.userService = u; }
    
        @GetMapping("/{id}")
        public ResponseEntity<UserResponse> getUserById(@PathVariable("id") Long id) {
            return ResponseEntity.ok(userService.getUserResponse(id));
        }
    }
---

### 🌐 8-Step Spring MVC Request Pipeline

```text
[Client Browser / Mobile App]
       │ (HTTP GET /api/users/42)
       ▼
[Tomcat Embedded Web Server (Port 8080)]
       │
       ▼
[Security / CORS Filter Chain (OncePerRequestFilter)]
       │
       ▼
[1. DispatcherServlet (Front Controller)]
       │
       ├──> [2. HandlerMapping (RequestMappingHandlerMapping)]
       │    └── Finds UserController.getUserById() mapping
       │
       ├──> [3. HandlerAdapter (RequestMappingHandlerAdapter)]
       │    └── Resolves @PathVariable, @RequestBody, @Valid parameters
       │
       ├──> [4. Controller Method Execution]
       │    └── Invokes service layer, retrieves User entity
       │
       ├──> [5. HttpMessageConverter (MappingJackson2HttpMessageConverter)]
       │    └── Serializes Java User POJO into UTF-8 JSON byte array
       │
       └──> [6. HandlerInterceptor.postHandle() / afterCompletion()]
       │
       ▼
[HTTP 200 OK Content-Type: application/json Response to Client]
```