---
id: "lld-design-principles-exercise-separation-of-concerns"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Principles"
subSection: ""
title: "Exercise: Separation of Concerns"
slug: "lld-design-principles-exercise-separation-of-concerns"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Separation of Concerns as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Separation of Concerns Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Design Principles","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Refactor UserProfileHandler

> [!PAYWALL] This content is for premium members only.

A junior developer's monolithic `UserProfileHandler` mixes HTTP parsing, validation, database queries, business rules, and logging in a single method. A colleague started separating it into proper layers (`UserValidator`, `UserRepository`, `UserProfileService`, `UserProfileController`) but left the method bodies empty.

**Your task:** Fill in the TODOs in the skeleton classes so the separated version produces the same output as the monolithic original.

**Requirements:**

1. `UserValidator.validate()` should throw on invalid name (blank) or email (missing @)
2. `UserRepository` should wrap the `Database` calls for `findById`, `findByEmail`, and `save`
3. `UserProfileService.updateProfile()` should validate, check email uniqueness, update, and log
4. `UserProfileController.handleUpdate()` should parse the request, call the service, and catch exceptions to set proper HTTP status codes and error messages

```java
import java.util.*;

// --- Mock infrastructure (DO NOT modify) ---
class User {
    private String id, name, email;
    public User(String id, String name, String email) {
        this.id = id; this.name = name; this.email = email;
    }
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
}

class Database {
    private static final Map<String, User> byId = new HashMap<>();
    private static final Map<String, User> byEmail = new HashMap<>();
    static void addUser(User u) { byId.put(u.getId(), u); byEmail.put(u.getEmail(), u); }
    static User findUser(String id) { return byId.get(id); }
    static User findByEmail(String email) { return byEmail.get(email); }
    static void saveUser(User u) { byId.put(u.getId(), u); byEmail.put(u.getEmail(), u); }
}

class Logger {
    static void log(String msg) { System.out.println("[LOG] " + msg); }
}

class HttpServletRequest {
    private final Map<String, String> params = new HashMap<>();
    void setParameter(String key, String value) { params.put(key, value); }
    public String getParameter(String key) { return params.get(key); }
}

class HttpServletResponse {
    private int status;
    private final StringBuilder body = new StringBuilder();
    public void setStatus(int code) { this.status = code; }
    public Writer getWriter() { return new Writer(body); }
    int getStatus() { return status; }
    String getBody() { return body.toString(); }

    static class Writer {
        private final StringBuilder sb;
        Writer(StringBuilder sb) { this.sb = sb; }
        public void write(String s) { sb.append(s); }
    }
}

// --- Reference: Working monolithic handler (DO NOT modify) ---
// Study this to understand what each separated class should do.
class UserProfileHandler {
    public void updateProfile(HttpServletRequest req, HttpServletResponse res) {
        String userId = req.getParameter("userId");
        String name = req.getParameter("name");
        String email = req.getParameter("email");

        if (name == null || name.isBlank()) {
            res.setStatus(400);
            res.getWriter().write("{\"error\": \"Name is required\"}");
            return;
        }
        if (email == null || !email.contains("@")) {
            res.setStatus(400);
            res.getWriter().write("{\"error\": \"Valid email is required\"}");
            return;
        }

        User user = Database.findUser(userId);
        if (user == null) {
            res.setStatus(404);
            res.getWriter().write("{\"error\": \"User not found\"}");
            return;
        }

        User existingUser = Database.findByEmail(email);
        if (existingUser != null && !existingUser.getId().equals(userId)) {
            res.setStatus(409);
            res.getWriter().write("{\"error\": \"Email already taken\"}");
            return;
        }

        user.setName(name);
        user.setEmail(email);
        Database.saveUser(user);

        Logger.log("Profile updated for user: " + userId);

        res.setStatus(200);
        res.getWriter().write("{\"message\": \"Profile updated\", \"id\": \""
            + userId + "\"}");
    }
}

// --- Skeleton classes (fill in the TODOs) ---
class UserValidator {
    public void validate(String name, String email) {
        // TODO: If name is null or blank, throw new IllegalArgumentException("Name is required")
        // TODO: If email is null or doesn't contain "@", throw new IllegalArgumentException("Valid email is required")
    }
}

class UserRepository {
    public User findById(String id) {
        // TODO: Return Database.findUser(id)
        return null;
    }

    public User findByEmail(String email) {
        // TODO: Return Database.findByEmail(email)
        return null;
    }

    public void save(User user) {
        // TODO: Call Database.saveUser(user)
    }
}

class UserProfileService {
    private final UserRepository repository;
    private final UserValidator validator;

    public UserProfileService(UserRepository repository, UserValidator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    public void updateProfile(String userId, String name, String email) {
        // TODO: Call validator.validate(name, email)
        // TODO: Look up user via repository.findById(userId)
        //       If null, throw new RuntimeException("User not found")
        // TODO: Check email uniqueness via repository.findByEmail(email)
        //       If taken by a different user, throw new RuntimeException("Email already taken")
        // TODO: Update user's name and email, call repository.save(user)
        // TODO: Call Logger.log("Profile updated for user: " + userId)
    }
}

class UserProfileController {
    private final UserProfileService service;

    public UserProfileController(UserProfileService service) {
        this.service = service;
    }

    public void handleUpdate(HttpServletRequest req, HttpServletResponse res) {
        // TODO: Parse userId, name, email from request parameters
        // TODO: Try calling service.updateProfile(userId, name, email)
        // TODO: On success → set status 200, write {"message": "Profile updated", "id": "<userId>"}
        // TODO: Catch IllegalArgumentException → set status 400, write {"error": "<message>"}
        // TODO: Catch RuntimeException("User not found") → set status 404, write {"error": "<message>"}
        // TODO: Catch RuntimeException("Email already taken") → set status 409, write {"error": "<message>"}
    }
}

// --- Tests (DO NOT modify) ---
public class Main {
    public static void main(String[] args) {
        Database.addUser(new User("u1", "Alice", "alice@example.com"));
        Database.addUser(new User("u2", "Bob", "bob@example.com"));

        UserRepository repository = new UserRepository();
        UserValidator validator = new UserValidator();
        UserProfileService service = new UserProfileService(repository, validator);
        UserProfileController controller = new UserProfileController(service);

        // Test 1: Successful update
        HttpServletRequest req1 = new HttpServletRequest();
        req1.setParameter("userId", "u1");
        req1.setParameter("name", "Alice Smith");
        req1.setParameter("email", "alice.smith@example.com");
        HttpServletResponse res1 = new HttpServletResponse();
        controller.handleUpdate(req1, res1);
        System.out.println("Test 1 - Status: " + res1.getStatus()
            + ", Response: " + res1.getBody());

        // Test 2: Empty name (validation failure)
        HttpServletRequest req2 = new HttpServletRequest();
        req2.setParameter("userId", "u1");
        req2.setParameter("name", "");
        req2.setParameter("email", "test@example.com");
        HttpServletResponse res2 = new HttpServletResponse();
        controller.handleUpdate(req2, res2);
        System.out.println("Test 2 - Status: " + res2.getStatus()
            + ", Response: " + res2.getBody());

        // Test 3: User not found
        HttpServletRequest req3 = new HttpServletRequest();
        req3.setParameter("userId", "u99");
        req3.setParameter("name", "Ghost");
        req3.setParameter("email", "ghost@example.com");
        HttpServletResponse res3 = new HttpServletResponse();
        controller.handleUpdate(req3, res3);
        System.out.println("Test 3 - Status: " + res3.getStatus()
            + ", Response: " + res3.getBody());

        // Test 4: Email already taken
        HttpServletRequest req4 = new HttpServletRequest();
        req4.setParameter("userId", "u1");
        req4.setParameter("name", "Alice");
        req4.setParameter("email", "bob@example.com");
        HttpServletResponse res4 = new HttpServletResponse();
        controller.handleUpdate(req4, res4);
        System.out.println("Test 4 - Status: " + res4.getStatus()
            + ", Response: " + res4.getBody());
    }
}
```

```python
# --- Mock infrastructure (DO NOT modify) ---
class User:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email

class Database:
    _by_id = {}
    _by_email = {}

    @staticmethod
    def add_user(user):
        Database._by_id[user.id] = user
        Database._by_email[user.email] = user

    @staticmethod
    def find_user(user_id):
        return Database._by_id.get(user_id)

    @staticmethod
    def find_by_email(email):
        return Database._by_email.get(email)

    @staticmethod
    def save_user(user):
        Database._by_id[user.id] = user
        Database._by_email[user.email] = user

class Logger:
    @staticmethod
    def log(msg):
        print(f"[LOG] {msg}")

class HttpRequest:
    def __init__(self):
        self._params = {}

    def set_parameter(self, key, value):
        self._params[key] = value

    def get_parameter(self, key):
        return self._params.get(key)

class HttpResponse:
    def __init__(self):
        self.status = 0
        self._body = ""

    def set_status(self, code):
        self.status = code

    def write(self, text):
        self._body += text

    def get_body(self):
        return self._body

# --- Reference: Working monolithic handler (DO NOT modify) ---
# Study this to understand what each separated class should do.
class UserProfileHandler:
    def update_profile(self, request, response):
        user_id = request.get_parameter("user_id")
        name = request.get_parameter("name")
        email = request.get_parameter("email")

        if not name or name.strip() == "":
            response.set_status(400)
            response.write('{"error": "Name is required"}')
            return

        if not email or "@" not in email:
            response.set_status(400)
            response.write('{"error": "Valid email is required"}')
            return

        user = Database.find_user(user_id)
        if not user:
            response.set_status(404)
            response.write('{"error": "User not found"}')
            return

        existing = Database.find_by_email(email)
        if existing and existing.id != user_id:
            response.set_status(409)
            response.write('{"error": "Email already taken"}')
            return

        user.name = name
        user.email = email
        Database.save_user(user)

        Logger.log(f"Profile updated for user: {user_id}")

        response.set_status(200)
        response.write(f'{{"message": "Profile updated", "id": "{user_id}"}}')

# --- Skeleton classes (fill in the TODOs) ---
class UserValidator:
    def validate(self, name, email):
        # TODO: If name is None or blank, raise ValueError("Name is required")
        # TODO: If email is None or doesn't contain "@", raise ValueError("Valid email is required")
        pass

class UserRepository:
    def find_by_id(self, user_id):
        # TODO: Return Database.find_user(user_id)
        return None

    def find_by_email(self, email):
        # TODO: Return Database.find_by_email(email)
        return None

    def save(self, user):
        # TODO: Call Database.save_user(user)
        pass

class UserProfileService:
    def __init__(self, repository, validator):
        self.repository = repository
        self.validator = validator

    def update_profile(self, user_id, name, email):
        # TODO: Call self.validator.validate(name, email)
        # TODO: Look up user via self.repository.find_by_id(user_id)
        #       If None, raise RuntimeError("User not found")
        # TODO: Check email uniqueness via self.repository.find_by_email(email)
        #       If taken by a different user, raise RuntimeError("Email already taken")
        # TODO: Update user's name and email, call self.repository.save(user)
        # TODO: Call Logger.log(f"Profile updated for user: {user_id}")
        pass

class UserProfileController:
    def __init__(self, service):
        self.service = service

    def handle_update(self, request, response):
        # TODO: Parse user_id, name, email from request parameters
        # TODO: Try calling self.service.update_profile(user_id, name, email)
        # TODO: On success -> set status 200, write {"message": "Profile updated", "id": "<user_id>"}
        # TODO: Catch ValueError -> set status 400, write {"error": "<message>"}
        # TODO: Catch RuntimeError("User not found") -> set status 404, write {"error": "<message>"}
        # TODO: Catch RuntimeError("Email already taken") -> set status 409, write {"error": "<message>"}
        pass

# --- Tests (DO NOT modify) ---
if __name__ == "__main__":
    Database.add_user(User("u1", "Alice", "alice@example.com"))
    Database.add_user(User("u2", "Bob", "bob@example.com"))

    repository = UserRepository()
    validator = UserValidator()
    service = UserProfileService(repository, validator)
    controller = UserProfileController(service)

    # Test 1: Successful update
    req1 = HttpRequest()
    req1.set_parameter("user_id", "u1")
    req1.set_parameter("name", "Alice Smith")
    req1.set_parameter("email", "alice.smith@example.com")
    res1 = HttpResponse()
    controller.handle_update(req1, res1)
    print(f"Test 1 - Status: {res1.status}, Response: {res1.get_body()}")

    # Test 2: Empty name
    req2 = HttpRequest()
    req2.set_parameter("user_id", "u1")
    req2.set_parameter("name", "")
    req2.set_parameter("email", "test@example.com")
    res2 = HttpResponse()
    controller.handle_update(req2, res2)
    print(f"Test 2 - Status: {res2.status}, Response: {res2.get_body()}")

    # Test 3: User not found
    req3 = HttpRequest()
    req3.set_parameter("user_id", "u99")
    req3.set_parameter("name", "Ghost")
    req3.set_parameter("email", "ghost@example.com")
    res3 = HttpResponse()
    controller.handle_update(req3, res3)
    print(f"Test 3 - Status: {res3.status}, Response: {res3.get_body()}")

    # Test 4: Email already taken
    req4 = HttpRequest()
    req4.set_parameter("user_id", "u1")
    req4.set_parameter("name", "Alice")
    req4.set_parameter("email", "bob@example.com")
    res4 = HttpResponse()
    controller.handle_update(req4, res4)
    print(f"Test 4 - Status: {res4.status}, Response: {res4.get_body()}")
```

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <sstream>

using namespace std;

// --- Mock infrastructure (DO NOT modify) ---
struct User {
    string id, name, email;
    User() = default;
    User(string id, string name, string email)
        : id(id), name(name), email(email) {}
    string getId() const { return id; }
    void setName(const string& n) { name = n; }
    void setEmail(const string& e) { email = e; }
};

class Database {
    static unordered_map<string, User> storage;
public:
    static void addUser(const User& u) { storage[u.id] = u; }
    static User* findUser(const string& id) {
        auto it = storage.find(id);
        return it != storage.end() " &it->second : nullptr;
    }
    static User* findByEmail(const string& email) {
        for (auto& [_, u] : storage)
            if (u.email == email) return &u;
        return nullptr;
    }
    static void saveUser(const User& u) { storage[u.id] = u; }
};
unordered_map<string, User> Database::storage;

class Logger {
public:
    static void log(const string& msg) {
        cout << "[LOG] " << msg << endl;
    }
};

struct HttpRequest {
    unordered_map<string, string> params;
    void setParameter(const string& k, const string& v) { params[k] = v; }
    string getParameter(const string& k) const {
        auto it = params.find(k);
        return it != params.end() " it->second : "";
    }
};

struct HttpResponse {
    int status = 0;
    string body;
    void setStatus(int s) { status = s; }
    void write(const string& s) { body += s; }
    int getStatus() const { return status; }
    string getBody() const { return body; }
};

// --- Reference: Working monolithic handler (DO NOT modify) ---
// Study this to understand what each separated class should do.
class UserProfileHandler {
public:
    void updateProfile(HttpRequest& req, HttpResponse& res) {
        string userId = req.getParameter("userId");
        string name = req.getParameter("name");
        string email = req.getParameter("email");

        if (name.empty()) {
            res.setStatus(400);
            res.write("{\"error\": \"Name is required\"}");
            return;
        }
        if (email.find('@') == string::npos) {
            res.setStatus(400);
            res.write("{\"error\": \"Valid email is required\"}");
            return;
        }

        User* user = Database::findUser(userId);
        if (!user) {
            res.setStatus(404);
            res.write("{\"error\": \"User not found\"}");
            return;
        }

        User* existing = Database::findByEmail(email);
        if (existing && existing->getId() != userId) {
            res.setStatus(409);
            res.write("{\"error\": \"Email already taken\"}");
            return;
        }

        user->setName(name);
        user->setEmail(email);
        Database::saveUser(*user);

        Logger::log("Profile updated for user: " + userId);

        res.setStatus(200);
        res.write("{\"message\": \"Profile updated\", \"id\": \"" + userId + "\"}");
    }
};

// --- Skeleton classes (fill in the TODOs) ---
class UserValidator {
public:
    void validate(const string& name, const string& email) {
        // TODO: If name is empty, throw runtime_error("Name is required")
        // TODO: If email doesn't contain "@", throw runtime_error("Valid email is required")
    }
};

class UserRepository {
public:
    User* findById(const string& id) {
        // TODO: Return Database::findUser(id)
        return nullptr;
    }

    User* findByEmail(const string& email) {
        // TODO: Return Database::findByEmail(email)
        return nullptr;
    }

    void save(const User& user) {
        // TODO: Call Database::saveUser(user)
    }
};

class UserProfileService {
    UserRepository& repository;
    UserValidator& validator;
public:
    UserProfileService(UserRepository& repository, UserValidator& validator)
        : repository(repository), validator(validator) {}

    void updateProfile(const string& userId, const string& name, const string& email) {
        // TODO: Call validator.validate(name, email)
        // TODO: Look up user via repository.findById(userId)
        //       If nullptr, throw runtime_error("User not found")
        // TODO: Check email uniqueness via repository.findByEmail(email)
        //       If taken by a different user, throw runtime_error("Email already taken")
        // TODO: Update user's name and email, call repository.save(*user)
        // TODO: Call Logger::log("Profile updated for user: " + userId)
    }
};

class UserProfileController {
    UserProfileService& service;
public:
    UserProfileController(UserProfileService& service) : service(service) {}

    void handleUpdate(HttpRequest& req, HttpResponse& res) {
        // TODO: Parse userId, name, email from request parameters
        // TODO: Try calling service.updateProfile(userId, name, email)
        // TODO: On success -> set status 200, write {"message": "Profile updated", "id": "<userId>"}
        // TODO: Catch runtime_error and check message:
        //       "Name is required" or "Valid email is required" -> status 400
        //       "User not found" -> status 404
        //       "Email already taken" -> status 409
        //       Write {"error": "<message>"}
    }
};

// --- Tests (DO NOT modify) ---
int main() {
    Database::addUser(User("u1", "Alice", "alice@example.com"));
    Database::addUser(User("u2", "Bob", "bob@example.com"));

    UserRepository repository;
    UserValidator validator;
    UserProfileService service(repository, validator);
    UserProfileController controller(service);

    // Test 1: Successful update
    HttpRequest req1;
    req1.setParameter("userId", "u1");
    req1.setParameter("name", "Alice Smith");
    req1.setParameter("email", "alice.smith@example.com");
    HttpResponse res1;
    controller.handleUpdate(req1, res1);
    cout << "Test 1 - Status: " << res1.getStatus()
         << ", Response: " << res1.getBody() << endl;

    // Test 2: Empty name
    HttpRequest req2;
    req2.setParameter("userId", "u1");
    req2.setParameter("name", "");
    req2.setParameter("email", "test@example.com");
    HttpResponse res2;
    controller.handleUpdate(req2, res2);
    cout << "Test 2 - Status: " << res2.getStatus()
         << ", Response: " << res2.getBody() << endl;

    // Test 3: User not found
    HttpRequest req3;
    req3.setParameter("userId", "u99");
    req3.setParameter("name", "Ghost");
    req3.setParameter("email", "ghost@example.com");
    HttpResponse res3;
    controller.handleUpdate(req3, res3);
    cout << "Test 3 - Status: " << res3.getStatus()
         << ", Response: " << res3.getBody() << endl;

    // Test 4: Email already taken
    HttpRequest req4;
    req4.setParameter("userId", "u1");
    req4.setParameter("name", "Alice");
    req4.setParameter("email", "bob@example.com");
    HttpResponse res4;
    controller.handleUpdate(req4, res4);
    cout << "Test 4 - Status: " << res4.getStatus()
         << ", Response: " << res4.getBody() << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

// --- Mock infrastructure (DO NOT modify) ---
type User struct {
	Id    string
	Name  string
	Email string
}

func NewUser(id, name, email string) *User {
	return &User{Id: id, Name: name, Email: email}
}

type Database struct{}

var (
	databaseById    = map[string]*User{}
	databaseByEmail  = map[string]*User{}
)

func (Database) addUser(u *User) {
	databaseById[u.Id] = u
	databaseByEmail[u.Email] = u
}

func (Database) findUser(id string) *User {
	return databaseById[id]
}

func (Database) findByEmail(email string) *User {
	return databaseByEmail[email]
}

func (Database) saveUser(u *User) {
	databaseById[u.Id] = u
	databaseByEmail[u.Email] = u
}

var database Database

type Logger struct{}

func (Logger) log(msg string) {
	fmt.Println("[LOG] " + msg)
}

var logger Logger

type HttpRequest struct {
	params map[string]string
}

func NewHttpRequest() *HttpRequest {
	return &HttpRequest{params: make(map[string]string)}
}

func (r *HttpRequest) setParameter(key, value string) {
	r.params[key] = value
}

func (r *HttpRequest) getParameter(key string) string {
	return r.params[key]
}

type HttpResponse struct {
	status int
	body   strings.Builder
}

func NewHttpResponse() *HttpResponse {
	return &HttpResponse{}
}

func (r *HttpResponse) setStatus(code int) {
	r.status = code
}

func (r *HttpResponse) getWriter() *HttpResponseWriter {
	return &HttpResponseWriter{sb: &r.body}
}

func (r *HttpResponse) getStatus() int {
	return r.status
}

func (r *HttpResponse) getBody() string {
	return r.body.String()
}

type HttpResponseWriter struct {
	sb *strings.Builder
}

func (w *HttpResponseWriter) write(s string) {
	w.sb.WriteString(s)
}

// --- Reference: Working monolithic handler (DO NOT modify) ---
// Study this to understand what each separated class should do.
type UserProfileHandler struct{}

func (h *UserProfileHandler) updateProfile(req *HttpRequest, res *HttpResponse) {
	userId := req.getParameter("userId")
	name := req.getParameter("name")
	email := req.getParameter("email")

	if name == "" || strings.TrimSpace(name) == "" {
		res.setStatus(400)
		res.getWriter().write("{\"error\": \"Name is required\"}")
		return
	}
	if email == "" || !strings.Contains(email, "@") {
		res.setStatus(400)
		res.getWriter().write("{\"error\": \"Valid email is required\"}")
		return
	}

	user := database.findUser(userId)
	if user == nil {
		res.setStatus(404)
		res.getWriter().write("{\"error\": \"User not found\"}")
		return
	}

	existingUser := database.findByEmail(email)
	if existingUser != nil && existingUser.Id != userId {
		res.setStatus(409)
		res.getWriter().write("{\"error\": \"Email already taken\"}")
		return
	}

	user.Name = name
	user.Email = email
	database.saveUser(user)

	logger.log("Profile updated for user: " + userId)

	res.setStatus(200)
	res.getWriter().write("{\"message\": \"Profile updated\", \"id\": \"" + userId + "\"}")
}

// --- Skeleton classes (fill in the TODOs) ---
type UserValidator struct{}

func (v *UserValidator) validate(name string, email string) {
	// TODO: If name is null or blank, throw new IllegalArgumentException("Name is required")
	// TODO: If email is null or doesn't contain "@", throw new IllegalArgumentException("Valid email is required")
}

type UserRepository struct{}

func (r *UserRepository) findById(id string) *User {
	// TODO: Return Database.findUser(id)
	return nil
}

func (r *UserRepository) findByEmail(email string) *User {
	// TODO: Return Database.findByEmail(email)
	return nil
}

func (r *UserRepository) save(user *User) {
	// TODO: Call Database.saveUser(user)
}

type UserProfileService struct {
	repository *UserRepository
	validator  *UserValidator
}

func NewUserProfileService(repository *UserRepository, validator *UserValidator) *UserProfileService {
	return &UserProfileService{
		repository: repository,
		validator:  validator,
	}
}

func (s *UserProfileService) updateProfile(userId string, name string, email string) {
	// TODO: Call validator.validate(name, email)
	// TODO: Look up user via repository.findById(userId)
	//       If null, throw new RuntimeException("User not found")
	// TODO: Check email uniqueness via repository.findByEmail(email)
	//       If taken by a different user, throw new RuntimeException("Email already taken")
	// TODO: Update user's name and email, call repository.save(user)
	// TODO: Call Logger.log("Profile updated for user: " + userId)
}

type UserProfileController struct {
	service *UserProfileService
}

func NewUserProfileController(service *UserProfileService) *UserProfileController {
	return &UserProfileController{service: service}
}

func (c *UserProfileController) handleUpdate(req *HttpRequest, res *HttpResponse) {
	// TODO: Parse userId, name, email from request parameters
	// TODO: Try calling service.updateProfile(userId, name, email)
	// TODO: On success → set status 200, write {"message": "Profile updated", "id": "<userId>"}
	// TODO: Catch IllegalArgumentException → set status 400, write {"error": "<message>"}
	// TODO: Catch RuntimeException("User not found") → set status 404, write {"error": "<message>"}
	// TODO: Catch RuntimeException("Email already taken") → set status 409, write {"error": "<message>"}
}

// --- Tests (DO NOT modify) ---
func main() {
	database.addUser(NewUser("u1", "Alice", "alice@example.com"))
	database.addUser(NewUser("u2", "Bob", "bob@example.com"))

	repository := &UserRepository{}
	validator := &UserValidator{}
	service := NewUserProfileService(repository, validator)
	controller := NewUserProfileController(service)

	// Test 1: Successful update
	req1 := NewHttpRequest()
	req1.setParameter("userId", "u1")
	req1.setParameter("name", "Alice Smith")
	req1.setParameter("email", "alice.smith@example.com")
	res1 := NewHttpResponse()
	controller.handleUpdate(req1, res1)
	fmt.Println("Test 1 - Status:", res1.getStatus(), ", Response:", res1.getBody())

	// Test 2: Empty name (validation failure)
	req2 := NewHttpRequest()
	req2.setParameter("userId", "u1")
	req2.setParameter("name", "")
	req2.setParameter("email", "test@example.com")
	res2 := NewHttpResponse()
	controller.handleUpdate(req2, res2)
	fmt.Println("Test 2 - Status:", res2.getStatus(), ", Response:", res2.getBody())

	// Test 3: User not found
	req3 := NewHttpRequest()
	req3.setParameter("userId", "u99")
	req3.setParameter("name", "Ghost")
	req3.setParameter("email", "ghost@example.com")
	res3 := NewHttpResponse()
	controller.handleUpdate(req3, res3)
	fmt.Println("Test 3 - Status:", res3.getStatus(), ", Response:", res3.getBody())

	// Test 4: Email already taken
	req4 := NewHttpRequest()
	req4.setParameter("userId", "u1")
	req4.setParameter("name", "Alice")
	req4.setParameter("email", "bob@example.com")
	res4 := NewHttpResponse()
	controller.handleUpdate(req4, res4)
	fmt.Println("Test 4 - Status:", res4.getStatus(), ", Response:", res4.getBody())
}
```

```csharp
using System;
using System.Collections.Generic;

// --- Mock infrastructure (DO NOT modify) ---
class User
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public User(string id, string name, string email)
    {
        Id = id; Name = name; Email = email;
    }
}

class Database
{
    private static readonly Dictionary<string, User> ById = new Dictionary<string, User>();
    private static readonly Dictionary<string, User> ByEmail = new Dictionary<string, User>();
    public static void AddUser(User u) { ById[u.Id] = u; ByEmail[u.Email] = u; }
    public static User FindUser(string id) => ById.ContainsKey(id) " ById[id] : null;
    public static User FindByEmail(string email) => ByEmail.ContainsKey(email) " ByEmail[email] : null;
    public static void SaveUser(User u) { ById[u.Id] = u; ByEmail[u.Email] = u; }
}

class Logger
{
    public static void Log(string msg) => Console.WriteLine($"[LOG] {msg}");
}

class HttpRequest
{
    private readonly Dictionary<string, string> _params = new Dictionary<string, string>();
    public void SetParameter(string key, string value) => _params[key] = value;
    public string GetParameter(string key) => _params.ContainsKey(key) " _params[key] : null;
}

class HttpResponse
{
    public int Status { get; private set; }
    private string _body = "";
    public void SetStatus(int code) => Status = code;
    public void Write(string text) => _body += text;
    public string GetBody() => _body;
}

// --- Reference: Working monolithic handler (DO NOT modify) ---
// Study this to understand what each separated class should do.
class UserProfileHandler
{
    public void UpdateProfile(HttpRequest req, HttpResponse res)
    {
        string userId = req.GetParameter("userId");
        string name = req.GetParameter("name");
        string email = req.GetParameter("email");

        if (string.IsNullOrWhiteSpace(name))
        {
            res.SetStatus(400);
            res.Write("{\"error\": \"Name is required\"}");
            return;
        }
        if (string.IsNullOrWhiteSpace(email) || !email.Contains("@"))
        {
            res.SetStatus(400);
            res.Write("{\"error\": \"Valid email is required\"}");
            return;
        }

        var user = Database.FindUser(userId);
        if (user == null)
        {
            res.SetStatus(404);
            res.Write("{\"error\": \"User not found\"}");
            return;
        }

        var existing = Database.FindByEmail(email);
        if (existing != null && existing.Id != userId)
        {
            res.SetStatus(409);
            res.Write("{\"error\": \"Email already taken\"}");
            return;
        }

        user.Name = name;
        user.Email = email;
        Database.SaveUser(user);

        Logger.Log("Profile updated for user: " + userId);

        res.SetStatus(200);
        res.Write($"{{\"message\": \"Profile updated\", \"id\": \"{userId}\"}}");
    }
}

// --- Skeleton classes (fill in the TODOs) ---
class UserValidator
{
    public void Validate(string name, string email)
    {
        // TODO: If name is null or whitespace, throw new ArgumentException("Name is required")
        // TODO: If email is null/whitespace or doesn't contain "@", throw new ArgumentException("Valid email is required")
    }
}

class UserRepository
{
    public User FindById(string id)
    {
        // TODO: Return Database.FindUser(id)
        return null;
    }

    public User FindByEmail(string email)
    {
        // TODO: Return Database.FindByEmail(email)
        return null;
    }

    public void Save(User user)
    {
        // TODO: Call Database.SaveUser(user)
    }
}

class UserProfileService
{
    private readonly UserRepository _repository;
    private readonly UserValidator _validator;

    public UserProfileService(UserRepository repository, UserValidator validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public void UpdateProfile(string userId, string name, string email)
    {
        // TODO: Call _validator.Validate(name, email)
        // TODO: Look up user via _repository.FindById(userId)
        //       If null, throw new InvalidOperationException("User not found")
        // TODO: Check email uniqueness via _repository.FindByEmail(email)
        //       If taken by a different user, throw new InvalidOperationException("Email already taken")
        // TODO: Update user's Name and Email, call _repository.Save(user)
        // TODO: Call Logger.Log("Profile updated for user: " + userId)
    }
}

class UserProfileController
{
    private readonly UserProfileService _service;

    public UserProfileController(UserProfileService service)
    {
        _service = service;
    }

    public void HandleUpdate(HttpRequest req, HttpResponse res)
    {
        // TODO: Parse userId, name, email from request parameters
        // TODO: Try calling _service.UpdateProfile(userId, name, email)
        // TODO: On success -> set status 200, write {"message": "Profile updated", "id": "<userId>"}
        // TODO: Catch ArgumentException -> set status 400, write {"error": "<message>"}
        // TODO: Catch InvalidOperationException("User not found") -> set status 404, write {"error": "<message>"}
        // TODO: Catch InvalidOperationException("Email already taken") -> set status 409, write {"error": "<message>"}
    }
}

// --- Tests (DO NOT modify) ---
class Program
{
    static void Main()
    {
        Database.AddUser(new User("u1", "Alice", "alice@example.com"));
        Database.AddUser(new User("u2", "Bob", "bob@example.com"));

        var repository = new UserRepository();
        var validator = new UserValidator();
        var service = new UserProfileService(repository, validator);
        var controller = new UserProfileController(service);

        // Test 1: Successful update
        var req1 = new HttpRequest();
        req1.SetParameter("userId", "u1");
        req1.SetParameter("name", "Alice Smith");
        req1.SetParameter("email", "alice.smith@example.com");
        var res1 = new HttpResponse();
        controller.HandleUpdate(req1, res1);
        Console.WriteLine($"Test 1 - Status: {res1.Status}, Response: {res1.GetBody()}");

        // Test 2: Empty name
        var req2 = new HttpRequest();
        req2.SetParameter("userId", "u1");
        req2.SetParameter("name", "");
        req2.SetParameter("email", "test@example.com");
        var res2 = new HttpResponse();
        controller.HandleUpdate(req2, res2);
        Console.WriteLine($"Test 2 - Status: {res2.Status}, Response: {res2.GetBody()}");

        // Test 3: User not found
        var req3 = new HttpRequest();
        req3.SetParameter("userId", "u99");
        req3.SetParameter("name", "Ghost");
        req3.SetParameter("email", "ghost@example.com");
        var res3 = new HttpResponse();
        controller.HandleUpdate(req3, res3);
        Console.WriteLine($"Test 3 - Status: {res3.Status}, Response: {res3.GetBody()}");

        // Test 4: Email already taken
        var req4 = new HttpRequest();
        req4.SetParameter("userId", "u1");
        req4.SetParameter("name", "Alice");
        req4.SetParameter("email", "bob@example.com");
        var res4 = new HttpResponse();
        controller.HandleUpdate(req4, res4);
        Console.WriteLine($"Test 4 - Status: {res4.Status}, Response: {res4.GetBody()}");
    }
}
```

```typescript
// --- Mock infrastructure (DO NOT modify) ---
class User {
    id: string;
    name: string;
    email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

class Database {
    private static byId = new Map<string, User>();
    private static byEmail = new Map<string, User>();
    static addUser(u: User) { this.byId.set(u.id, u); this.byEmail.set(u.email, u); }
    static findUser(id: string): User | undefined { return this.byId.get(id); }
    static findByEmail(email: string): User | undefined { return this.byEmail.get(email); }
    static saveUser(u: User) { this.byId.set(u.id, u); this.byEmail.set(u.email, u); }
}

class Logger {
    static log(msg: string) { console.log(`[LOG] ${msg}`); }
}

class HttpRequest {
    private params = new Map<string, string>();
    setParameter(key: string, value: string) { this.params.set(key, value); }
    getParameter(key: string): string | undefined { return this.params.get(key); }
}

class HttpResponse {
    private _status = 0;
    private _body = "";
    setStatus(code: number) { this._status = code; }
    write(text: string) { this._body += text; }
    getStatus(): number { return this._status; }
    getBody(): string { return this._body; }
}

// --- Reference: Working monolithic handler (DO NOT modify) ---
// Study this to understand what each separated class should do.
class UserProfileHandler {
    updateProfile(req: HttpRequest, res: HttpResponse): void {
        const userId = req.getParameter("userId");
        const name = req.getParameter("name");
        const email = req.getParameter("email");

        if (!name || name.trim() === "") {
            res.setStatus(400);
            res.write(JSON.stringify({ error: "Name is required" }));
            return;
        }
        if (!email || !email.includes("@")) {
            res.setStatus(400);
            res.write(JSON.stringify({ error: "Valid email is required" }));
            return;
        }

        const user = Database.findUser(userId!);
        if (!user) {
            res.setStatus(404);
            res.write(JSON.stringify({ error: "User not found" }));
            return;
        }

        const existing = Database.findByEmail(email);
        if (existing && existing.id !== userId) {
            res.setStatus(409);
            res.write(JSON.stringify({ error: "Email already taken" }));
            return;
        }

        user.name = name;
        user.email = email;
        Database.saveUser(user);

        Logger.log(`Profile updated for user: ${userId}`);

        res.setStatus(200);
        res.write(JSON.stringify({ message: "Profile updated", id: userId }));
    }
}

// --- Skeleton classes (fill in the TODOs) ---
class UserValidator {
    validate(name: string | undefined, email: string | undefined): void {
        // TODO: If name is falsy or blank, throw new Error("Name is required")
        // TODO: If email is falsy or doesn't include "@", throw new Error("Valid email is required")
    }
}

class UserRepository {
    findById(id: string): User | undefined {
        // TODO: Return Database.findUser(id)
        return undefined;
    }

    findByEmail(email: string): User | undefined {
        // TODO: Return Database.findByEmail(email)
        return undefined;
    }

    save(user: User): void {
        // TODO: Call Database.saveUser(user)
    }
}

class UserProfileService {
    private repository: UserRepository;
    private validator: UserValidator;

    constructor(repository: UserRepository, validator: UserValidator) {
        this.repository = repository;
        this.validator = validator;
    }

    updateProfile(userId: string, name: string, email: string): void {
        // TODO: Call this.validator.validate(name, email)
        // TODO: Look up user via this.repository.findById(userId)
        //       If undefined, throw new Error("User not found")
        // TODO: Check email uniqueness via this.repository.findByEmail(email)
        //       If taken by a different user, throw new Error("Email already taken")
        // TODO: Update user's name and email, call this.repository.save(user)
        // TODO: Call Logger.log(`Profile updated for user: ${userId}`)
    }
}

class UserProfileController {
    private service: UserProfileService;

    constructor(service: UserProfileService) {
        this.service = service;
    }

    handleUpdate(req: HttpRequest, res: HttpResponse): void {
        // TODO: Parse userId, name, email from request parameters
        // TODO: Try calling this.service.updateProfile(userId!, name!, email!)
        // TODO: On success -> set status 200, write JSON.stringify({ message: "Profile updated", id: userId })
        // TODO: Catch Error("Name is required") or ("Valid email is required") -> status 400
        // TODO: Catch Error("User not found") -> status 404
        // TODO: Catch Error("Email already taken") -> status 409
        // TODO: Write JSON.stringify({ error: e.message }) for all error cases
    }
}

// --- Tests (DO NOT modify) ---
Database.addUser(new User("u1", "Alice", "alice@example.com"));
Database.addUser(new User("u2", "Bob", "bob@example.com"));

const repository = new UserRepository();
const validator = new UserValidator();
const service = new UserProfileService(repository, validator);
const controller = new UserProfileController(service);

// Test 1: Successful update
const req1 = new HttpRequest();
req1.setParameter("userId", "u1");
req1.setParameter("name", "Alice Smith");
req1.setParameter("email", "alice.smith@example.com");
const res1 = new HttpResponse();
controller.handleUpdate(req1, res1);
console.log(`Test 1 - Status: ${res1.getStatus()}, Response: ${res1.getBody()}`);

// Test 2: Empty name
const req2 = new HttpRequest();
req2.setParameter("userId", "u1");
req2.setParameter("name", "");
req2.setParameter("email", "test@example.com");
const res2 = new HttpResponse();
controller.handleUpdate(req2, res2);
console.log(`Test 2 - Status: ${res2.getStatus()}, Response: ${res2.getBody()}`);

// Test 3: User not found
const req3 = new HttpRequest();
req3.setParameter("userId", "u99");
req3.setParameter("name", "Ghost");
req3.setParameter("email", "ghost@example.com");
const res3 = new HttpResponse();
controller.handleUpdate(req3, res3);
console.log(`Test 3 - Status: ${res3.getStatus()}, Response: ${res3.getBody()}`);

// Test 4: Email already taken
const req4 = new HttpRequest();
req4.setParameter("userId", "u1");
req4.setParameter("name", "Alice");
req4.setParameter("email", "bob@example.com");
const res4 = new HttpResponse();
controller.handleUpdate(req4, res4);
console.log(`Test 4 - Status: ${res4.getStatus()}, Response: ${res4.getBody()}`);
```

#### Solutions

```java
import java.util.*;

// --- Mock infrastructure (DO NOT modify) ---
class User {
    private String id, name, email;
    public User(String id, String name, String email) {
        this.id = id; this.name = name; this.email = email;
    }
    public String getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
}

class Database {
    private static final Map<String, User> byId = new HashMap<>();
    private static final Map<String, User> byEmail = new HashMap<>();
    static void addUser(User u) { byId.put(u.getId(), u); byEmail.put(u.getEmail(), u); }
    static User findUser(String id) { return byId.get(id); }
    static User findByEmail(String email) { return byEmail.get(email); }
    static void saveUser(User u) { byId.put(u.getId(), u); byEmail.put(u.getEmail(), u); }
}

class Logger {
    static void log(String msg) { System.out.println("[LOG] " + msg); }
}

class HttpServletRequest {
    private final Map<String, String> params = new HashMap<>();
    void setParameter(String key, String value) { params.put(key, value); }
    public String getParameter(String key) { return params.get(key); }
}

class HttpServletResponse {
    private int status;
    private final StringBuilder body = new StringBuilder();
    public void setStatus(int code) { this.status = code; }
    public Writer getWriter() { return new Writer(body); }
    int getStatus() { return status; }
    String getBody() { return body.toString(); }

    static class Writer {
        private final StringBuilder sb;
        Writer(StringBuilder sb) { this.sb = sb; }
        public void write(String s) { sb.append(s); }
    }
}

// --- Separated classes ---
class UserValidator {
    public void validate(String name, String email) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        if (email == null || !email.contains("@")) {
            throw new IllegalArgumentException("Valid email is required");
        }
    }
}

class UserRepository {
    public User findById(String id) {
        return Database.findUser(id);
    }

    public User findByEmail(String email) {
        return Database.findByEmail(email);
    }

    public void save(User user) {
        Database.saveUser(user);
    }
}

class UserProfileService {
    private final UserRepository repository;
    private final UserValidator validator;

    public UserProfileService(UserRepository repository, UserValidator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    public void updateProfile(String userId, String name, String email) {
        validator.validate(name, email);

        User user = repository.findById(userId);
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        User existingUser = repository.findByEmail(email);
        if (existingUser != null && !existingUser.getId().equals(userId)) {
            throw new RuntimeException("Email already taken");
        }

        user.setName(name);
        user.setEmail(email);
        repository.save(user);

        Logger.log("Profile updated for user: " + userId);
    }
}

class UserProfileController {
    private final UserProfileService service;

    public UserProfileController(UserProfileService service) {
        this.service = service;
    }

    public void handleUpdate(HttpServletRequest req, HttpServletResponse res) {
        String userId = req.getParameter("userId");
        String name = req.getParameter("name");
        String email = req.getParameter("email");

        try {
            service.updateProfile(userId, name, email);
            res.setStatus(200);
            res.getWriter().write("{\"message\": \"Profile updated\", \"id\": \""
                + userId + "\"}");
        } catch (IllegalArgumentException e) {
            res.setStatus(400);
            res.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        } catch (RuntimeException e) {
            if (e.getMessage().equals("User not found")) {
                res.setStatus(404);
            } else if (e.getMessage().equals("Email already taken")) {
                res.setStatus(409);
            }
            res.getWriter().write("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }
}

// --- Tests (DO NOT modify) ---
public class Main {
    public static void main(String[] args) {
        Database.addUser(new User("u1", "Alice", "alice@example.com"));
        Database.addUser(new User("u2", "Bob", "bob@example.com"));

        UserRepository repository = new UserRepository();
        UserValidator validator = new UserValidator();
        UserProfileService service = new UserProfileService(repository, validator);
        UserProfileController controller = new UserProfileController(service);

        // Test 1: Successful update
        HttpServletRequest req1 = new HttpServletRequest();
        req1.setParameter("userId", "u1");
        req1.setParameter("name", "Alice Smith");
        req1.setParameter("email", "alice.smith@example.com");
        HttpServletResponse res1 = new HttpServletResponse();
        controller.handleUpdate(req1, res1);
        System.out.println("Test 1 - Status: " + res1.getStatus()
            + ", Response: " + res1.getBody());

        // Test 2: Empty name (validation failure)
        HttpServletRequest req2 = new HttpServletRequest();
        req2.setParameter("userId", "u1");
        req2.setParameter("name", "");
        req2.setParameter("email", "test@example.com");
        HttpServletResponse res2 = new HttpServletResponse();
        controller.handleUpdate(req2, res2);
        System.out.println("Test 2 - Status: " + res2.getStatus()
            + ", Response: " + res2.getBody());

        // Test 3: User not found
        HttpServletRequest req3 = new HttpServletRequest();
        req3.setParameter("userId", "u99");
        req3.setParameter("name", "Ghost");
        req3.setParameter("email", "ghost@example.com");
        HttpServletResponse res3 = new HttpServletResponse();
        controller.handleUpdate(req3, res3);
        System.out.println("Test 3 - Status: " + res3.getStatus()
            + ", Response: " + res3.getBody());

        // Test 4: Email already taken
        HttpServletRequest req4 = new HttpServletRequest();
        req4.setParameter("userId", "u1");
        req4.setParameter("name", "Alice");
        req4.setParameter("email", "bob@example.com");
        HttpServletResponse res4 = new HttpServletResponse();
        controller.handleUpdate(req4, res4);
        System.out.println("Test 4 - Status: " + res4.getStatus()
            + ", Response: " + res4.getBody());
    }
}
```

```python
# --- Mock infrastructure (DO NOT modify) ---
class User:
    def __init__(self, id, name, email):
        self.id = id
        self.name = name
        self.email = email

class Database:
    _by_id = {}
    _by_email = {}

    @staticmethod
    def add_user(user):
        Database._by_id[user.id] = user
        Database._by_email[user.email] = user

    @staticmethod
    def find_user(user_id):
        return Database._by_id.get(user_id)

    @staticmethod
    def find_by_email(email):
        return Database._by_email.get(email)

    @staticmethod
    def save_user(user):
        Database._by_id[user.id] = user
        Database._by_email[user.email] = user

class Logger:
    @staticmethod
    def log(msg):
        print(f"[LOG] {msg}")

class HttpRequest:
    def __init__(self):
        self._params = {}

    def set_parameter(self, key, value):
        self._params[key] = value

    def get_parameter(self, key):
        return self._params.get(key)

class HttpResponse:
    def __init__(self):
        self.status = 0
        self._body = ""

    def set_status(self, code):
        self.status = code

    def write(self, text):
        self._body += text

    def get_body(self):
        return self._body

# --- Separated classes ---
class UserValidator:
    def validate(self, name, email):
        if not name or name.strip() == "":
            raise ValueError("Name is required")
        if not email or "@" not in email:
            raise ValueError("Valid email is required")

class UserRepository:
    def find_by_id(self, user_id):
        return Database.find_user(user_id)

    def find_by_email(self, email):
        return Database.find_by_email(email)

    def save(self, user):
        Database.save_user(user)

class UserProfileService:
    def __init__(self, repository, validator):
        self.repository = repository
        self.validator = validator

    def update_profile(self, user_id, name, email):
        self.validator.validate(name, email)

        user = self.repository.find_by_id(user_id)
        if not user:
            raise RuntimeError("User not found")

        existing = self.repository.find_by_email(email)
        if existing and existing.id != user_id:
            raise RuntimeError("Email already taken")

        user.name = name
        user.email = email
        self.repository.save(user)

        Logger.log(f"Profile updated for user: {user_id}")

class UserProfileController:
    def __init__(self, service):
        self.service = service

    def handle_update(self, request, response):
        user_id = request.get_parameter("user_id")
        name = request.get_parameter("name")
        email = request.get_parameter("email")

        try:
            self.service.update_profile(user_id, name, email)
            response.set_status(200)
            response.write(f'{{"message": "Profile updated", "id": "{user_id}"}}')
        except ValueError as e:
            response.set_status(400)
            response.write(f'{{"error": "{e}"}}')
        except RuntimeError as e:
            msg = str(e)
            if msg == "User not found":
                response.set_status(404)
            elif msg == "Email already taken":
                response.set_status(409)
            response.write(f'{{"error": "{msg}"}}')

# --- Tests (DO NOT modify) ---
if __name__ == "__main__":
    Database.add_user(User("u1", "Alice", "alice@example.com"))
    Database.add_user(User("u2", "Bob", "bob@example.com"))

    repository = UserRepository()
    validator = UserValidator()
    service = UserProfileService(repository, validator)
    controller = UserProfileController(service)

    # Test 1: Successful update
    req1 = HttpRequest()
    req1.set_parameter("user_id", "u1")
    req1.set_parameter("name", "Alice Smith")
    req1.set_parameter("email", "alice.smith@example.com")
    res1 = HttpResponse()
    controller.handle_update(req1, res1)
    print(f"Test 1 - Status: {res1.status}, Response: {res1.get_body()}")

    # Test 2: Empty name
    req2 = HttpRequest()
    req2.set_parameter("user_id", "u1")
    req2.set_parameter("name", "")
    req2.set_parameter("email", "test@example.com")
    res2 = HttpResponse()
    controller.handle_update(req2, res2)
    print(f"Test 2 - Status: {res2.status}, Response: {res2.get_body()}")

    # Test 3: User not found
    req3 = HttpRequest()
    req3.set_parameter("user_id", "u99")
    req3.set_parameter("name", "Ghost")
    req3.set_parameter("email", "ghost@example.com")
    res3 = HttpResponse()
    controller.handle_update(req3, res3)
    print(f"Test 3 - Status: {res3.status}, Response: {res3.get_body()}")

    # Test 4: Email already taken
    req4 = HttpRequest()
    req4.set_parameter("user_id", "u1")
    req4.set_parameter("name", "Alice")
    req4.set_parameter("email", "bob@example.com")
    res4 = HttpResponse()
    controller.handle_update(req4, res4)
    print(f"Test 4 - Status: {res4.status}, Response: {res4.get_body()}")
```

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
#include <sstream>
#include <stdexcept>

using namespace std;

// --- Mock infrastructure (DO NOT modify) ---
struct User {
    string id, name, email;
    User() = default;
    User(string id, string name, string email)
        : id(id), name(name), email(email) {}
    string getId() const { return id; }
    void setName(const string& n) { name = n; }
    void setEmail(const string& e) { email = e; }
};

class Database {
    static unordered_map<string, User> storage;
public:
    static void addUser(const User& u) { storage[u.id] = u; }
    static User* findUser(const string& id) {
        auto it = storage.find(id);
        return it != storage.end() " &it->second : nullptr;
    }
    static User* findByEmail(const string& email) {
        for (auto& [_, u] : storage)
            if (u.email == email) return &u;
        return nullptr;
    }
    static void saveUser(const User& u) { storage[u.id] = u; }
};
unordered_map<string, User> Database::storage;

class Logger {
public:
    static void log(const string& msg) {
        cout << "[LOG] " << msg << endl;
    }
};

struct HttpRequest {
    unordered_map<string, string> params;
    void setParameter(const string& k, const string& v) { params[k] = v; }
    string getParameter(const string& k) const {
        auto it = params.find(k);
        return it != params.end() " it->second : "";
    }
};

struct HttpResponse {
    int status = 0;
    string body;
    void setStatus(int s) { status = s; }
    void write(const string& s) { body += s; }
    int getStatus() const { return status; }
    string getBody() const { return body; }
};

// --- Separated classes ---
class UserValidator {
public:
    void validate(const string& name, const string& email) {
        if (name.empty()) {
            throw runtime_error("Name is required");
        }
        if (email.find('@') == string::npos) {
            throw runtime_error("Valid email is required");
        }
    }
};

class UserRepository {
public:
    User* findById(const string& id) {
        return Database::findUser(id);
    }

    User* findByEmail(const string& email) {
        return Database::findByEmail(email);
    }

    void save(const User& user) {
        Database::saveUser(user);
    }
};

class UserProfileService {
    UserRepository& repository;
    UserValidator& validator;
public:
    UserProfileService(UserRepository& repository, UserValidator& validator)
        : repository(repository), validator(validator) {}

    void updateProfile(const string& userId, const string& name, const string& email) {
        validator.validate(name, email);

        User* user = repository.findById(userId);
        if (!user) {
            throw runtime_error("User not found");
        }

        User* existing = repository.findByEmail(email);
        if (existing && existing->getId() != userId) {
            throw runtime_error("Email already taken");
        }

        user->setName(name);
        user->setEmail(email);
        repository.save(*user);

        Logger::log("Profile updated for user: " + userId);
    }
};

class UserProfileController {
    UserProfileService& service;
public:
    UserProfileController(UserProfileService& service) : service(service) {}

    void handleUpdate(HttpRequest& req, HttpResponse& res) {
        string userId = req.getParameter("userId");
        string name = req.getParameter("name");
        string email = req.getParameter("email");

        try {
            service.updateProfile(userId, name, email);
            res.setStatus(200);
            res.write("{\"message\": \"Profile updated\", \"id\": \"" + userId + "\"}");
        } catch (const runtime_error& e) {
            string msg = e.what();
            if (msg == "Name is required" || msg == "Valid email is required") {
                res.setStatus(400);
            } else if (msg == "User not found") {
                res.setStatus(404);
            } else if (msg == "Email already taken") {
                res.setStatus(409);
            }
            res.write("{\"error\": \"" + msg + "\"}");
        }
    }
};

// --- Tests (DO NOT modify) ---
int main() {
    Database::addUser(User("u1", "Alice", "alice@example.com"));
    Database::addUser(User("u2", "Bob", "bob@example.com"));

    UserRepository repository;
    UserValidator validator;
    UserProfileService service(repository, validator);
    UserProfileController controller(service);

    // Test 1: Successful update
    HttpRequest req1;
    req1.setParameter("userId", "u1");
    req1.setParameter("name", "Alice Smith");
    req1.setParameter("email", "alice.smith@example.com");
    HttpResponse res1;
    controller.handleUpdate(req1, res1);
    cout << "Test 1 - Status: " << res1.getStatus()
         << ", Response: " << res1.getBody() << endl;

    // Test 2: Empty name
    HttpRequest req2;
    req2.setParameter("userId", "u1");
    req2.setParameter("name", "");
    req2.setParameter("email", "test@example.com");
    HttpResponse res2;
    controller.handleUpdate(req2, res2);
    cout << "Test 2 - Status: " << res2.getStatus()
         << ", Response: " << res2.getBody() << endl;

    // Test 3: User not found
    HttpRequest req3;
    req3.setParameter("userId", "u99");
    req3.setParameter("name", "Ghost");
    req3.setParameter("email", "ghost@example.com");
    HttpResponse res3;
    controller.handleUpdate(req3, res3);
    cout << "Test 3 - Status: " << res3.getStatus()
         << ", Response: " << res3.getBody() << endl;

    // Test 4: Email already taken
    HttpRequest req4;
    req4.setParameter("userId", "u1");
    req4.setParameter("name", "Alice");
    req4.setParameter("email", "bob@example.com");
    HttpResponse res4;
    controller.handleUpdate(req4, res4);
    cout << "Test 4 - Status: " << res4.getStatus()
         << ", Response: " << res4.getBody() << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

// --- Mock infrastructure (DO NOT modify) ---
type User struct {
	id    string
	name  string
	email string
}

func NewUser(id, name, email string) *User {
	return &User{id: id, name: name, email: email}
}

func (u *User) GetId() string    { return u.id }
func (u *User) GetName() string  { return u.name }
func (u *User) GetEmail() string { return u.email }
func (u *User) SetName(name string) {
	u.name = name
}
func (u *User) SetEmail(email string) {
	u.email = email
}

var databaseById = map[string]*User{}
var databaseByEmail = map[string]*User{}

type Database struct{}

func (d *Database) AddUser(u *User) {
	databaseById[u.GetId()] = u
	databaseByEmail[u.GetEmail()] = u
}

func (d *Database) FindUser(id string) *User {
	return databaseById[id]
}

func (d *Database) FindByEmail(email string) *User {
	return databaseByEmail[email]
}

func (d *Database) SaveUser(u *User) {
	databaseById[u.GetId()] = u
	databaseByEmail[u.GetEmail()] = u
}

type Logger struct{}

func (l *Logger) Log(msg string) {
	fmt.Println("[LOG] " + msg)
}

type HttpServletRequest struct {
	params map[string]string
}

func NewHttpServletRequest() *HttpServletRequest {
	return &HttpServletRequest{params: map[string]string{}}
}

func (r *HttpServletRequest) SetParameter(key, value string) {
	r.params[key] = value
}

func (r *HttpServletRequest) GetParameter(key string) string {
	return r.params[key]
}

type HttpServletResponse struct {
	status int
	body   strings.Builder
}

type ResponseWriter struct {
	sb *strings.Builder
}

func (w *ResponseWriter) Write(s string) {
	w.sb.WriteString(s)
}

func (r *HttpServletResponse) SetStatus(code int) {
	r.status = code
}

func (r *HttpServletResponse) GetWriter() *ResponseWriter {
	return &ResponseWriter{sb: &r.body}
}

func (r *HttpServletResponse) GetStatus() int {
	return r.status
}

func (r *HttpServletResponse) GetBody() string {
	return r.body.String()
}

// --- Separated classes ---
type UserValidator struct{}

func (v *UserValidator) Validate(name, email string) {
	if name == "" || strings.TrimSpace(name) == "" {
		panic("Name is required")
	}
	if email == "" || !strings.Contains(email, "@") {
		panic("Valid email is required")
	}
}

type UserRepository struct {
	db *Database
}

func NewUserRepository() *UserRepository {
	return &UserRepository{db: &Database{}}
}

func (r *UserRepository) FindById(id string) *User {
	return r.db.FindUser(id)
}

func (r *UserRepository) FindByEmail(email string) *User {
	return r.db.FindByEmail(email)
}

func (r *UserRepository) Save(user *User) {
	r.db.SaveUser(user)
}

type UserProfileService struct {
	repository *UserRepository
	validator  *UserValidator
	logger     *Logger
}

func NewUserProfileService(repository *UserRepository, validator *UserValidator) *UserProfileService {
	return &UserProfileService{
		repository: repository,
		validator:  validator,
		logger:     &Logger{},
	}
}

func (s *UserProfileService) UpdateProfile(userId, name, email string) {
	s.validator.Validate(name, email)

	user := s.repository.FindById(userId)
	if user == nil {
		panic("User not found")
	}

	existingUser := s.repository.FindByEmail(email)
	if existingUser != nil && existingUser.GetId() != userId {
		panic("Email already taken")
	}

	user.SetName(name)
	user.SetEmail(email)
	s.repository.Save(user)

	s.logger.Log("Profile updated for user: " + userId)
}

type UserProfileController struct {
	service *UserProfileService
}

func NewUserProfileController(service *UserProfileService) *UserProfileController {
	return &UserProfileController{service: service}
}

func (c *UserProfileController) HandleUpdate(req *HttpServletRequest, res *HttpServletResponse) {
	userId := req.GetParameter("userId")
	name := req.GetParameter("name")
	email := req.GetParameter("email")

	defer func() {
		if r := recover(); r != nil {
			msg := fmt.Sprint(r)
			if msg == "Name is required" || msg == "Valid email is required" {
				res.SetStatus(400)
			} else if msg == "User not found" {
				res.SetStatus(404)
			} else if msg == "Email already taken" {
				res.SetStatus(409)
			}
			res.GetWriter().Write("{\"error\": \"" + msg + "\"}")
		}
	}()

	c.service.UpdateProfile(userId, name, email)
	res.SetStatus(200)
	res.GetWriter().Write("{\"message\": \"Profile updated\", \"id\": \"" + userId + "\"}")
}

// --- Tests (DO NOT modify) ---
func main() {
	db := &Database{}
	db.AddUser(NewUser("u1", "Alice", "alice@example.com"))
	db.AddUser(NewUser("u2", "Bob", "bob@example.com"))

	repository := NewUserRepository()
	validator := &UserValidator{}
	service := NewUserProfileService(repository, validator)
	controller := NewUserProfileController(service)

	// Test 1: Successful update
	req1 := NewHttpServletRequest()
	req1.SetParameter("userId", "u1")
	req1.SetParameter("name", "Alice Smith")
	req1.SetParameter("email", "alice.smith@example.com")
	res1 := &HttpServletResponse{}
	controller.HandleUpdate(req1, res1)
	fmt.Printf("Test 1 - Status: %d, Response: %s\n", res1.GetStatus(), res1.GetBody())

	// Test 2: Empty name (validation failure)
	req2 := NewHttpServletRequest()
	req2.SetParameter("userId", "u1")
	req2.SetParameter("name", "")
	req2.SetParameter("email", "test@example.com")
	res2 := &HttpServletResponse{}
	controller.HandleUpdate(req2, res2)
	fmt.Printf("Test 2 - Status: %d, Response: %s\n", res2.GetStatus(), res2.GetBody())

	// Test 3: User not found
	req3 := NewHttpServletRequest()
	req3.SetParameter("userId", "u99")
	req3.SetParameter("name", "Ghost")
	req3.SetParameter("email", "ghost@example.com")
	res3 := &HttpServletResponse{}
	controller.HandleUpdate(req3, res3)
	fmt.Printf("Test 3 - Status: %d, Response: %s\n", res3.GetStatus(), res3.GetBody())

	// Test 4: Email already taken
	req4 := NewHttpServletRequest()
	req4.SetParameter("userId", "u1")
	req4.SetParameter("name", "Alice")
	req4.SetParameter("email", "bob@example.com")
	res4 := &HttpServletResponse{}
	controller.HandleUpdate(req4, res4)
	fmt.Printf("Test 4 - Status: %d, Response: %s\n", res4.GetStatus(), res4.GetBody())
}
```

```csharp
using System;
using System.Collections.Generic;

// --- Mock infrastructure (DO NOT modify) ---
class User
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public User(string id, string name, string email)
    {
        Id = id; Name = name; Email = email;
    }
}

class Database
{
    private static readonly Dictionary<string, User> ById = new Dictionary<string, User>();
    private static readonly Dictionary<string, User> ByEmail = new Dictionary<string, User>();
    public static void AddUser(User u) { ById[u.Id] = u; ByEmail[u.Email] = u; }
    public static User FindUser(string id) => ById.ContainsKey(id) " ById[id] : null;
    public static User FindByEmail(string email) => ByEmail.ContainsKey(email) " ByEmail[email] : null;
    public static void SaveUser(User u) { ById[u.Id] = u; ByEmail[u.Email] = u; }
}

class Logger
{
    public static void Log(string msg) => Console.WriteLine($"[LOG] {msg}");
}

class HttpRequest
{
    private readonly Dictionary<string, string> _params = new Dictionary<string, string>();
    public void SetParameter(string key, string value) => _params[key] = value;
    public string GetParameter(string key) => _params.ContainsKey(key) " _params[key] : null;
}

class HttpResponse
{
    public int Status { get; private set; }
    private string _body = "";
    public void SetStatus(int code) => Status = code;
    public void Write(string text) => _body += text;
    public string GetBody() => _body;
}

// --- Separated classes ---
class UserValidator
{
    public void Validate(string name, string email)
    {
        if (string.IsNullOrWhiteSpace(name))
            throw new ArgumentException("Name is required");
        if (string.IsNullOrWhiteSpace(email) || !email.Contains("@"))
            throw new ArgumentException("Valid email is required");
    }
}

class UserRepository
{
    public User FindById(string id)
    {
        return Database.FindUser(id);
    }

    public User FindByEmail(string email)
    {
        return Database.FindByEmail(email);
    }

    public void Save(User user)
    {
        Database.SaveUser(user);
    }
}

class UserProfileService
{
    private readonly UserRepository _repository;
    private readonly UserValidator _validator;

    public UserProfileService(UserRepository repository, UserValidator validator)
    {
        _repository = repository;
        _validator = validator;
    }

    public void UpdateProfile(string userId, string name, string email)
    {
        _validator.Validate(name, email);

        var user = _repository.FindById(userId);
        if (user == null)
            throw new InvalidOperationException("User not found");

        var existing = _repository.FindByEmail(email);
        if (existing != null && existing.Id != userId)
            throw new InvalidOperationException("Email already taken");

        user.Name = name;
        user.Email = email;
        _repository.Save(user);

        Logger.Log("Profile updated for user: " + userId);
    }
}

class UserProfileController
{
    private readonly UserProfileService _service;

    public UserProfileController(UserProfileService service)
    {
        _service = service;
    }

    public void HandleUpdate(HttpRequest req, HttpResponse res)
    {
        string userId = req.GetParameter("userId");
        string name = req.GetParameter("name");
        string email = req.GetParameter("email");

        try
        {
            _service.UpdateProfile(userId, name, email);
            res.SetStatus(200);
            res.Write($"{{\"message\": \"Profile updated\", \"id\": \"{userId}\"}}");
        }
        catch (ArgumentException e)
        {
            res.SetStatus(400);
            res.Write($"{{\"error\": \"{e.Message}\"}}");
        }
        catch (InvalidOperationException e)
        {
            if (e.Message == "User not found")
                res.SetStatus(404);
            else if (e.Message == "Email already taken")
                res.SetStatus(409);
            res.Write($"{{\"error\": \"{e.Message}\"}}");
        }
    }
}

// --- Tests (DO NOT modify) ---
class Program
{
    static void Main()
    {
        Database.AddUser(new User("u1", "Alice", "alice@example.com"));
        Database.AddUser(new User("u2", "Bob", "bob@example.com"));

        var repository = new UserRepository();
        var validator = new UserValidator();
        var service = new UserProfileService(repository, validator);
        var controller = new UserProfileController(service);

        // Test 1: Successful update
        var req1 = new HttpRequest();
        req1.SetParameter("userId", "u1");
        req1.SetParameter("name", "Alice Smith");
        req1.SetParameter("email", "alice.smith@example.com");
        var res1 = new HttpResponse();
        controller.HandleUpdate(req1, res1);
        Console.WriteLine($"Test 1 - Status: {res1.Status}, Response: {res1.GetBody()}");

        // Test 2: Empty name
        var req2 = new HttpRequest();
        req2.SetParameter("userId", "u1");
        req2.SetParameter("name", "");
        req2.SetParameter("email", "test@example.com");
        var res2 = new HttpResponse();
        controller.HandleUpdate(req2, res2);
        Console.WriteLine($"Test 2 - Status: {res2.Status}, Response: {res2.GetBody()}");

        // Test 3: User not found
        var req3 = new HttpRequest();
        req3.SetParameter("userId", "u99");
        req3.SetParameter("name", "Ghost");
        req3.SetParameter("email", "ghost@example.com");
        var res3 = new HttpResponse();
        controller.HandleUpdate(req3, res3);
        Console.WriteLine($"Test 3 - Status: {res3.Status}, Response: {res3.GetBody()}");

        // Test 4: Email already taken
        var req4 = new HttpRequest();
        req4.SetParameter("userId", "u1");
        req4.SetParameter("name", "Alice");
        req4.SetParameter("email", "bob@example.com");
        var res4 = new HttpResponse();
        controller.HandleUpdate(req4, res4);
        Console.WriteLine($"Test 4 - Status: {res4.Status}, Response: {res4.GetBody()}");
    }
}
```

```typescript
// --- Mock infrastructure (DO NOT modify) ---
class User {
    id: string;
    name: string;
    email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

class Database {
    private static byId = new Map<string, User>();
    private static byEmail = new Map<string, User>();
    static addUser(u: User) { this.byId.set(u.id, u); this.byEmail.set(u.email, u); }
    static findUser(id: string): User | undefined { return this.byId.get(id); }
    static findByEmail(email: string): User | undefined { return this.byEmail.get(email); }
    static saveUser(u: User) { this.byId.set(u.id, u); this.byEmail.set(u.email, u); }
}

class Logger {
    static log(msg: string) { console.log(`[LOG] ${msg}`); }
}

class HttpRequest {
    private params = new Map<string, string>();
    setParameter(key: string, value: string) { this.params.set(key, value); }
    getParameter(key: string): string | undefined { return this.params.get(key); }
}

class HttpResponse {
    private _status = 0;
    private _body = "";
    setStatus(code: number) { this._status = code; }
    write(text: string) { this._body += text; }
    getStatus(): number { return this._status; }
    getBody(): string { return this._body; }
}

// --- Separated classes ---
class UserValidator {
    validate(name: string | undefined, email: string | undefined): void {
        if (!name || name.trim() === "") {
            throw new Error("Name is required");
        }
        if (!email || !email.includes("@")) {
            throw new Error("Valid email is required");
        }
    }
}

class UserRepository {
    findById(id: string): User | undefined {
        return Database.findUser(id);
    }

    findByEmail(email: string): User | undefined {
        return Database.findByEmail(email);
    }

    save(user: User): void {
        Database.saveUser(user);
    }
}

class UserProfileService {
    private repository: UserRepository;
    private validator: UserValidator;

    constructor(repository: UserRepository, validator: UserValidator) {
        this.repository = repository;
        this.validator = validator;
    }

    updateProfile(userId: string, name: string, email: string): void {
        this.validator.validate(name, email);

        const user = this.repository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const existing = this.repository.findByEmail(email);
        if (existing && existing.id !== userId) {
            throw new Error("Email already taken");
        }

        user.name = name;
        user.email = email;
        this.repository.save(user);

        Logger.log(`Profile updated for user: ${userId}`);
    }
}

class UserProfileController {
    private service: UserProfileService;

    constructor(service: UserProfileService) {
        this.service = service;
    }

    handleUpdate(req: HttpRequest, res: HttpResponse): void {
        const userId = req.getParameter("userId");
        const name = req.getParameter("name");
        const email = req.getParameter("email");

        try {
            this.service.updateProfile(userId!, name!, email!);
            res.setStatus(200);
            res.write(`{"message": "Profile updated", "id": "${userId}"}`);
        } catch (e: any) {
            const msg = e.message;
            if (msg === "Name is required" || msg === "Valid email is required") {
                res.setStatus(400);
            } else if (msg === "User not found") {
                res.setStatus(404);
            } else if (msg === "Email already taken") {
                res.setStatus(409);
            }
            res.write(`{"error": "${msg}"}`);
        }
    }
}

// --- Tests (DO NOT modify) ---
Database.addUser(new User("u1", "Alice", "alice@example.com"));
Database.addUser(new User("u2", "Bob", "bob@example.com"));

const repository = new UserRepository();
const validator = new UserValidator();
const service = new UserProfileService(repository, validator);
const controller = new UserProfileController(service);

// Test 1: Successful update
const req1 = new HttpRequest();
req1.setParameter("userId", "u1");
req1.setParameter("name", "Alice Smith");
req1.setParameter("email", "alice.smith@example.com");
const res1 = new HttpResponse();
controller.handleUpdate(req1, res1);
console.log(`Test 1 - Status: ${res1.getStatus()}, Response: ${res1.getBody()}`);

// Test 2: Empty name
const req2 = new HttpRequest();
req2.setParameter("userId", "u1");
req2.setParameter("name", "");
req2.setParameter("email", "test@example.com");
const res2 = new HttpResponse();
controller.handleUpdate(req2, res2);
console.log(`Test 2 - Status: ${res2.getStatus()}, Response: ${res2.getBody()}`);

// Test 3: User not found
const req3 = new HttpRequest();
req3.setParameter("userId", "u99");
req3.setParameter("name", "Ghost");
req3.setParameter("email", "ghost@example.com");
const res3 = new HttpResponse();
controller.handleUpdate(req3, res3);
console.log(`Test 3 - Status: ${res3.getStatus()}, Response: ${res3.getBody()}`);

// Test 4: Email already taken
const req4 = new HttpRequest();
req4.setParameter("userId", "u1");
req4.setParameter("name", "Alice");
req4.setParameter("email", "bob@example.com");
const res4 = new HttpResponse();
controller.handleUpdate(req4, res4);
console.log(`Test 4 - Status: ${res4.getStatus()}, Response: ${res4.getBody()}`);
```

---

# Exercise 2: Build a ReportGenerator

A report generation system has been designed with properly separated concerns: `DataFetcher`, `ReportProcessor`, `ReportFormatter`, `ReportDeliverer`, and a `ReportGenerator` orchestrator. The interfaces and some implementations are provided, but `SalesReportProcessor`, `CsvReportFormatter`, and `ReportGenerator` have empty TODO method bodies.

**Your task:** Fill in the TODOs so the pipeline produces the expected CSV output.

**Requirements:**

1. `SalesReportProcessor.process()` should calculate total sales, average sale, find the top-selling product, and count records
2. `CsvReportFormatter.format()` should produce CSV lines: header "Sales Report", then key-value rows
3. `ReportGenerator` should accept all four components via constructor and call them in sequence: fetch → process → format → deliver

```java
import java.util.*;
import java.util.stream.*;

// --- Data types ---
class SalesRecord {
    private final String product;
    private final double amount;
    private final String date;

    public SalesRecord(String product, double amount, String date) {
        this.product = product;
        this.amount = amount;
        this.date = date;
    }

    public String product() { return product; }
    public double amount() { return amount; }
    public String date() { return date; }
}

class ReportData {
    private final double totalSales;
    private final double averageSale;
    private final String topProduct;
    private final int recordCount;

    public ReportData(double totalSales, double averageSale,
                      String topProduct, int recordCount) {
        this.totalSales = totalSales;
        this.averageSale = averageSale;
        this.topProduct = topProduct;
        this.recordCount = recordCount;
    }

    public double totalSales() { return totalSales; }
    public double averageSale() { return averageSale; }
    public String topProduct() { return topProduct; }
    public int recordCount() { return recordCount; }
}

// --- Interfaces: implement these ---
interface DataFetcher {
    List<SalesRecord> fetch();
}

interface ReportProcessor {
    ReportData process(List<SalesRecord> records);
}

interface ReportFormatter {
    String format(ReportData data);
}

interface ReportDeliverer {
    void deliver(String formattedReport);
}

// --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher implements DataFetcher {
    private final List<SalesRecord> data;
    public InMemoryDataFetcher(List<SalesRecord> data) { this.data = data; }
    @Override
    public List<SalesRecord> fetch() { return data; }
}

class ConsoleReportDeliverer implements ReportDeliverer {
    @Override
    public void deliver(String formattedReport) {
        System.out.println(formattedReport);
    }
}

// --- Skeleton classes (fill in the TODOs) ---
class SalesReportProcessor implements ReportProcessor {
    @Override
    public ReportData process(List<SalesRecord> records) {
        // TODO: Calculate totalSales as the sum of all record amounts
        // TODO: Calculate averageSale as totalSales / records.size()
        // TODO: Find topProduct (the product with the highest total amount across all its records)
        // TODO: Return new ReportData(totalSales, averageSale, topProduct, records.size())
        return new ReportData(0.0, 0.0, "", 0);
    }
}

class CsvReportFormatter implements ReportFormatter {
    @Override
    public String format(ReportData data) {
        // TODO: Return a CSV string with format:
        // "Sales Report\nTotal Sales,$<totalSales formatted as %.2f>\nAverage Sale,$<averageSale formatted as %.2f>\nTop Product,<topProduct>\nRecord Count,<recordCount>"
        return "";
    }
}

class ReportGenerator {
    private final DataFetcher fetcher;
    private final ReportProcessor processor;
    private final ReportFormatter formatter;
    private final ReportDeliverer deliverer;

    public ReportGenerator(DataFetcher fetcher, ReportProcessor processor,
                           ReportFormatter formatter, ReportDeliverer deliverer) {
        this.fetcher = fetcher;
        this.processor = processor;
        this.formatter = formatter;
        this.deliverer = deliverer;
    }

    public void generate() {
        // TODO: Fetch records using fetcher.fetch()
        // TODO: Process records into ReportData using processor.process()
        // TODO: Format ReportData into a string using formatter.format()
        // TODO: Deliver the formatted string using deliverer.deliver()
    }
}

// --- Tests ---
public class Main {
    public static void main(String[] args) {
        List<SalesRecord> testData = List.of(
            new SalesRecord("Widget Pro", 500.0, "2024-01-15"),
            new SalesRecord("Widget Pro", 750.0, "2024-01-16"),
            new SalesRecord("Gadget X", 200.0, "2024-01-17"),
            new SalesRecord("Widget Pro", 1200.0, "2024-01-18"),
            new SalesRecord("Gadget X", 350.0, "2024-01-19")
        );

        DataFetcher fetcher = new InMemoryDataFetcher(testData);
        ReportProcessor processor = new SalesReportProcessor();
        ReportFormatter formatter = new CsvReportFormatter();
        ReportDeliverer deliverer = new ConsoleReportDeliverer();

        ReportGenerator generator = new ReportGenerator(
            fetcher, processor, formatter, deliverer);
        generator.generate();
    }
}
```

```python
from dataclasses import dataclass
from abc import ABC, abstractmethod
from typing import List

@dataclass
class SalesRecord:
    product: str
    amount: float
    date: str

@dataclass
class ReportData:
    total_sales: float
    average_sale: float
    top_product: str
    record_count: int

# --- Interfaces: implement these ---
class DataFetcher(ABC):
    @abstractmethod
    def fetch(self) -> List[SalesRecord]:
        pass

class ReportProcessor(ABC):
    @abstractmethod
    def process(self, records: List[SalesRecord]) -> ReportData:
        pass

class ReportFormatter(ABC):
    @abstractmethod
    def format(self, data: ReportData) -> str:
        pass

class ReportDeliverer(ABC):
    @abstractmethod
    def deliver(self, formatted_report: str) -> None:
        pass

# --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher(DataFetcher):
    def __init__(self, data: List[SalesRecord]):
        self._data = data

    def fetch(self) -> List[SalesRecord]:
        return self._data

class ConsoleReportDeliverer(ReportDeliverer):
    def deliver(self, formatted_report: str) -> None:
        print(formatted_report)

# --- Skeleton classes (fill in the TODOs) ---
class SalesReportProcessor(ReportProcessor):
    def process(self, records: List[SalesRecord]) -> ReportData:
        # TODO: Calculate total_sales as the sum of all record amounts
        # TODO: Calculate average_sale as total_sales / len(records)
        # TODO: Find top_product (the product with the highest total amount across all its records)
        # TODO: Return ReportData(total_sales, average_sale, top_product, len(records))
        return ReportData(0.0, 0.0, "", 0)

class CsvReportFormatter(ReportFormatter):
    def format(self, data: ReportData) -> str:
        # TODO: Return a CSV string with format:
        # "Sales Report\nTotal Sales,$<total_sales formatted to 2 decimals>\nAverage Sale,$<average_sale formatted to 2 decimals>\nTop Product,<top_product>\nRecord Count,<record_count>"
        return ""

class ReportGenerator:
    def __init__(self, fetcher: DataFetcher, processor: ReportProcessor,
                 formatter: ReportFormatter, deliverer: ReportDeliverer):
        self.fetcher = fetcher
        self.processor = processor
        self.formatter = formatter
        self.deliverer = deliverer

    def generate(self):
        # TODO: Fetch records using self.fetcher.fetch()
        # TODO: Process records into ReportData using self.processor.process()
        # TODO: Format ReportData into a string using self.formatter.format()
        # TODO: Deliver the formatted string using self.deliverer.deliver()
        pass

# --- Tests ---
if __name__ == "__main__":
    test_data = [
        SalesRecord("Widget Pro", 500.0, "2024-01-15"),
        SalesRecord("Widget Pro", 750.0, "2024-01-16"),
        SalesRecord("Gadget X", 200.0, "2024-01-17"),
        SalesRecord("Widget Pro", 1200.0, "2024-01-18"),
        SalesRecord("Gadget X", 350.0, "2024-01-19"),
    ]

    fetcher = InMemoryDataFetcher(test_data)
    processor = SalesReportProcessor()
    formatter = CsvReportFormatter()
    deliverer = ConsoleReportDeliverer()

    generator = ReportGenerator(fetcher, processor, formatter, deliverer)
    generator.generate()
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>

using namespace std;

struct SalesRecord {
    string product;
    double amount;
    string date;
};

struct ReportData {
    double totalSales;
    double averageSale;
    string topProduct;
    int recordCount;
};

// --- Interfaces: implement these ---
class DataFetcher {
public:
    virtual ~DataFetcher() = default;
    virtual vector<SalesRecord> fetch() = 0;
};

class ReportProcessor {
public:
    virtual ~ReportProcessor() = default;
    virtual ReportData process(const vector<SalesRecord>& records) = 0;
};

class ReportFormatter {
public:
    virtual ~ReportFormatter() = default;
    virtual string format(const ReportData& data) = 0;
};

class ReportDeliverer {
public:
    virtual ~ReportDeliverer() = default;
    virtual void deliver(const string& formattedReport) = 0;
};

// --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher : public DataFetcher {
    vector<SalesRecord> data;
public:
    InMemoryDataFetcher(vector<SalesRecord> data) : data(move(data)) {}
    vector<SalesRecord> fetch() override { return data; }
};

class ConsoleReportDeliverer : public ReportDeliverer {
public:
    void deliver(const string& formattedReport) override {
        cout << formattedReport << endl;
    }
};

// --- Skeleton classes (fill in the TODOs) ---
class SalesReportProcessor : public ReportProcessor {
public:
    ReportData process(const vector<SalesRecord>& records) override {
        // TODO: Calculate totalSales as the sum of all record amounts
        // TODO: Calculate averageSale as totalSales / records.size()
        // TODO: Find topProduct (the product with the highest total amount across all its records)
        // TODO: Return ReportData{totalSales, averageSale, topProduct, (int)records.size()}
        return ReportData{0.0, 0.0, "", 0};
    }
};

class CsvReportFormatter : public ReportFormatter {
public:
    string format(const ReportData& data) override {
        // TODO: Return a CSV string with format:
        // "Sales Report\nTotal Sales,$<totalSales formatted to 2 decimals>\nAverage Sale,$<averageSale formatted to 2 decimals>\nTop Product,<topProduct>\nRecord Count,<recordCount>"
        return "";
    }
};

class ReportGenerator {
    unique_ptr<DataFetcher> fetcher;
    unique_ptr<ReportProcessor> processor;
    unique_ptr<ReportFormatter> formatter;
    unique_ptr<ReportDeliverer> deliverer;

public:
    ReportGenerator(unique_ptr<DataFetcher> fetcher,
                    unique_ptr<ReportProcessor> processor,
                    unique_ptr<ReportFormatter> formatter,
                    unique_ptr<ReportDeliverer> deliverer)
        : fetcher(move(fetcher)), processor(move(processor)),
          formatter(move(formatter)), deliverer(move(deliverer)) {}

    void generate() {
        // TODO: Fetch records using fetcher->fetch()
        // TODO: Process records into ReportData using processor->process()
        // TODO: Format ReportData into a string using formatter->format()
        // TODO: Deliver the formatted string using deliverer->deliver()
    }
};

// --- Tests ---
int main() {
    vector<SalesRecord> testData = {
        {"Widget Pro", 500.0, "2024-01-15"},
        {"Widget Pro", 750.0, "2024-01-16"},
        {"Gadget X", 200.0, "2024-01-17"},
        {"Widget Pro", 1200.0, "2024-01-18"},
        {"Gadget X", 350.0, "2024-01-19"}
    };

    auto fetcher = make_unique<InMemoryDataFetcher>(testData);
    auto processor = make_unique<SalesReportProcessor>();
    auto formatter = make_unique<CsvReportFormatter>();
    auto deliverer = make_unique<ConsoleReportDeliverer>();

    ReportGenerator generator(
        move(fetcher), move(processor),
        move(formatter), move(deliverer));
    generator.generate();

    return 0;
}
```

```go
package main

import "fmt"

// --- Data types ---
type SalesRecord struct {
	Product string
	Amount  float64
	Date    string
}

type ReportData struct {
	TotalSales  float64
	AverageSale float64
	TopProduct  string
	RecordCount int
}

// --- Interfaces: implement these ---
type DataFetcher interface {
	Fetch() []SalesRecord
}

type ReportProcessor interface {
	Process(records []SalesRecord) ReportData
}

type ReportFormatter interface {
	Format(data ReportData) string
}

type ReportDeliverer interface {
	Deliver(formattedReport string)
}

// --- Provided implementations (DO NOT modify) ---
type InMemoryDataFetcher struct {
	data []SalesRecord
}

func NewInMemoryDataFetcher(data []SalesRecord) *InMemoryDataFetcher {
	return &InMemoryDataFetcher{data: data}
}

func (f *InMemoryDataFetcher) Fetch() []SalesRecord {
	return f.data
}

type ConsoleReportDeliverer struct{}

func NewConsoleReportDeliverer() *ConsoleReportDeliverer {
	return &ConsoleReportDeliverer{}
}

func (d *ConsoleReportDeliverer) Deliver(formattedReport string) {
	fmt.Println(formattedReport)
}

// --- Skeleton classes (fill in the TODOs) ---
type SalesReportProcessor struct{}

func NewSalesReportProcessor() *SalesReportProcessor {
	return &SalesReportProcessor{}
}

func (p *SalesReportProcessor) Process(records []SalesRecord) ReportData {
	// TODO: Calculate totalSales as the sum of all record amounts
	// TODO: Calculate averageSale as totalSales / records.size()
	// TODO: Find topProduct (the product with the highest total amount across all its records)
	// TODO: Return new ReportData(totalSales, averageSale, topProduct, records.size())
	return ReportData{TotalSales: 0.0, AverageSale: 0.0, TopProduct: "", RecordCount: 0}
}

type CsvReportFormatter struct{}

func NewCsvReportFormatter() *CsvReportFormatter {
	return &CsvReportFormatter{}
}

func (f *CsvReportFormatter) Format(data ReportData) string {
	// TODO: Return a CSV string with format:
	// "Sales Report\nTotal Sales,$<totalSales formatted as %.2f>\nAverage Sale,$<averageSale formatted as %.2f>\nTop Product,<topProduct>\nRecord Count,<recordCount>"
	return ""
}

type ReportGenerator struct {
	fetcher    DataFetcher
	processor  ReportProcessor
	formatter  ReportFormatter
	deliverer  ReportDeliverer
}

func NewReportGenerator(fetcher DataFetcher, processor ReportProcessor,
	formatter ReportFormatter, deliverer ReportDeliverer) *ReportGenerator {
	return &ReportGenerator{
		fetcher:   fetcher,
		processor: processor,
		formatter: formatter,
		deliverer: deliverer,
	}
}

func (g *ReportGenerator) Generate() {
	// TODO: Fetch records using fetcher.fetch()
	// TODO: Process records into ReportData using processor.process()
	// TODO: Format ReportData into a string using formatter.format()
	// TODO: Deliver the formatted string using deliverer.deliver()
}

// --- Tests ---
func main() {
	testData := []SalesRecord{
		{Product: "Widget Pro", Amount: 500.0, Date: "2024-01-15"},
		{Product: "Widget Pro", Amount: 750.0, Date: "2024-01-16"},
		{Product: "Gadget X", Amount: 200.0, Date: "2024-01-17"},
		{Product: "Widget Pro", Amount: 1200.0, Date: "2024-01-18"},
		{Product: "Gadget X", Amount: 350.0, Date: "2024-01-19"},
	}

	fetcher := NewInMemoryDataFetcher(testData)
	processor := NewSalesReportProcessor()
	formatter := NewCsvReportFormatter()
	deliverer := NewConsoleReportDeliverer()

	generator := NewReportGenerator(fetcher, processor, formatter, deliverer)
	generator.Generate()
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class SalesRecord
{
    public string Product { get; }
    public double Amount { get; }
    public string Date { get; }
    public SalesRecord(string product, double amount, string date)
    {
        Product = product; Amount = amount; Date = date;
    }
}

class ReportData
{
    public double TotalSales { get; }
    public double AverageSale { get; }
    public string TopProduct { get; }
    public int RecordCount { get; }
    public ReportData(double totalSales, double averageSale, string topProduct, int recordCount)
    {
        TotalSales = totalSales; AverageSale = averageSale;
        TopProduct = topProduct; RecordCount = recordCount;
    }
}

// --- Interfaces: implement these ---
interface IDataFetcher
{
    List<SalesRecord> Fetch();
}

interface IReportProcessor
{
    ReportData Process(List<SalesRecord> records);
}

interface IReportFormatter
{
    string Format(ReportData data);
}

interface IReportDeliverer
{
    void Deliver(string formattedReport);
}

// --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher : IDataFetcher
{
    private readonly List<SalesRecord> _data;
    public InMemoryDataFetcher(List<SalesRecord> data) => _data = data;
    public List<SalesRecord> Fetch() => _data;
}

class ConsoleReportDeliverer : IReportDeliverer
{
    public void Deliver(string formattedReport) => Console.WriteLine(formattedReport);
}

// --- Skeleton classes (fill in the TODOs) ---
class SalesReportProcessor : IReportProcessor
{
    public ReportData Process(List<SalesRecord> records)
    {
        // TODO: Calculate totalSales as the sum of all record amounts
        // TODO: Calculate averageSale as totalSales / records.Count
        // TODO: Find topProduct (the product with the highest total amount across all its records)
        // TODO: Return new ReportData(totalSales, averageSale, topProduct, records.Count)
        return new ReportData(0.0, 0.0, "", 0);
    }
}

class CsvReportFormatter : IReportFormatter
{
    public string Format(ReportData data)
    {
        // TODO: Return a CSV string with format:
        // "Sales Report\nTotal Sales,$<TotalSales formatted to 2 decimals>\nAverage Sale,$<AverageSale formatted to 2 decimals>\nTop Product,<TopProduct>\nRecord Count,<RecordCount>"
        return "";
    }
}

class ReportGenerator
{
    private readonly IDataFetcher _fetcher;
    private readonly IReportProcessor _processor;
    private readonly IReportFormatter _formatter;
    private readonly IReportDeliverer _deliverer;

    public ReportGenerator(IDataFetcher fetcher, IReportProcessor processor,
                           IReportFormatter formatter, IReportDeliverer deliverer)
    {
        _fetcher = fetcher;
        _processor = processor;
        _formatter = formatter;
        _deliverer = deliverer;
    }

    public void Generate()
    {
        // TODO: Fetch records using _fetcher.Fetch()
        // TODO: Process records into ReportData using _processor.Process()
        // TODO: Format ReportData into a string using _formatter.Format()
        // TODO: Deliver the formatted string using _deliverer.Deliver()
    }
}

// --- Tests ---
class Program
{
    static void Main()
    {
        var testData = new List<SalesRecord>
        {
            new SalesRecord("Widget Pro", 500.0, "2024-01-15"),
            new SalesRecord("Widget Pro", 750.0, "2024-01-16"),
            new SalesRecord("Gadget X", 200.0, "2024-01-17"),
            new SalesRecord("Widget Pro", 1200.0, "2024-01-18"),
            new SalesRecord("Gadget X", 350.0, "2024-01-19")
        };

        IDataFetcher fetcher = new InMemoryDataFetcher(testData);
        IReportProcessor processor = new SalesReportProcessor();
        IReportFormatter formatter = new CsvReportFormatter();
        IReportDeliverer deliverer = new ConsoleReportDeliverer();

        var generator = new ReportGenerator(
            fetcher, processor, formatter, deliverer);
        generator.Generate();
    }
}
```

```typescript
interface SalesRecord {
    product: string;
    amount: number;
    date: string;
}

interface ReportData {
    totalSales: number;
    averageSale: number;
    topProduct: string;
    recordCount: number;
}

// --- Interfaces: implement these ---
interface DataFetcher {
    fetch(): SalesRecord[];
}

interface ReportProcessor {
    process(records: SalesRecord[]): ReportData;
}

interface ReportFormatter {
    format(data: ReportData): string;
}

interface ReportDeliverer {
    deliver(formattedReport: string): void;
}

// --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher implements DataFetcher {
    private data: SalesRecord[];

    constructor(data: SalesRecord[]) {
        this.data = data;
    }

    fetch(): SalesRecord[] { return this.data; }
}

class ConsoleReportDeliverer implements ReportDeliverer {
    deliver(formattedReport: string): void {
        console.log(formattedReport);
    }
}

// --- Skeleton classes (fill in the TODOs) ---
class SalesReportProcessor implements ReportProcessor {
    process(records: SalesRecord[]): ReportData {
        // TODO: Calculate totalSales as the sum of all record amounts
        // TODO: Calculate averageSale as totalSales / records.length
        // TODO: Find topProduct (the product with the highest total amount across all its records)
        // TODO: Return { totalSales, averageSale, topProduct, recordCount: records.length }
        return { totalSales: 0, averageSale: 0, topProduct: "", recordCount: 0 };
    }
}

class CsvReportFormatter implements ReportFormatter {
    format(data: ReportData): string {
        // TODO: Return a CSV string with format:
        // "Sales Report\nTotal Sales,$<totalSales formatted to 2 decimals>\nAverage Sale,$<averageSale formatted to 2 decimals>\nTop Product,<topProduct>\nRecord Count,<recordCount>"
        return "";
    }
}

class ReportGenerator {
    private fetcher: DataFetcher;
    private processor: ReportProcessor;
    private formatter: ReportFormatter;
    private deliverer: ReportDeliverer;

    constructor(fetcher: DataFetcher, processor: ReportProcessor,
                formatter: ReportFormatter, deliverer: ReportDeliverer) {
        this.fetcher = fetcher;
        this.processor = processor;
        this.formatter = formatter;
        this.deliverer = deliverer;
    }

    generate(): void {
        // TODO: Fetch records using this.fetcher.fetch()
        // TODO: Process records into ReportData using this.processor.process()
        // TODO: Format ReportData into a string using this.formatter.format()
        // TODO: Deliver the formatted string using this.deliverer.deliver()
    }
}

// --- Tests ---
const testData: SalesRecord[] = [
    { product: "Widget Pro", amount: 500.0, date: "2024-01-15" },
    { product: "Widget Pro", amount: 750.0, date: "2024-01-16" },
    { product: "Gadget X", amount: 200.0, date: "2024-01-17" },
    { product: "Widget Pro", amount: 1200.0, date: "2024-01-18" },
    { product: "Gadget X", amount: 350.0, date: "2024-01-19" },
];

const fetcher = new InMemoryDataFetcher(testData);
const processor = new SalesReportProcessor();
const formatter = new CsvReportFormatter();
const deliverer = new ConsoleReportDeliverer();

const generator = new ReportGenerator(fetcher, processor, formatter, deliverer);
generator.generate();
```

#### Solutions

```java
import java.util.*;
import java.util.stream.*;

// --- Data types ---
class SalesRecord {
    private final String product;
    private final double amount;
    private final String date;

    public SalesRecord(String product, double amount, String date) {
        this.product = product;
        this.amount = amount;
        this.date = date;
    }

    public String product() { return product; }
    public double amount() { return amount; }
    public String date() { return date; }
}

class ReportData {
    private final double totalSales;
    private final double averageSale;
    private final String topProduct;
    private final int recordCount;

    public ReportData(double totalSales, double averageSale,
                      String topProduct, int recordCount) {
        this.totalSales = totalSales;
        this.averageSale = averageSale;
        this.topProduct = topProduct;
        this.recordCount = recordCount;
    }

    public double totalSales() { return totalSales; }
    public double averageSale() { return averageSale; }
    public String topProduct() { return topProduct; }
    public int recordCount() { return recordCount; }
}

// --- Interfaces ---
interface DataFetcher {
    List<SalesRecord> fetch();
}

interface ReportProcessor {
    ReportData process(List<SalesRecord> records);
}

interface ReportFormatter {
    String format(ReportData data);
}

interface ReportDeliverer {
    void deliver(String formattedReport);
}

// --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher implements DataFetcher {
    private final List<SalesRecord> data;
    public InMemoryDataFetcher(List<SalesRecord> data) { this.data = data; }
    @Override
    public List<SalesRecord> fetch() { return data; }
}

class ConsoleReportDeliverer implements ReportDeliverer {
    @Override
    public void deliver(String formattedReport) {
        System.out.println(formattedReport);
    }
}

// --- Completed classes ---
class SalesReportProcessor implements ReportProcessor {
    @Override
    public ReportData process(List<SalesRecord> records) {
        double totalSales = records.stream()
            .mapToDouble(SalesRecord::amount)
            .sum();
        double averageSale = totalSales / records.size();

        String topProduct = records.stream()
            .collect(Collectors.groupingBy(
                SalesRecord::product,
                Collectors.summingDouble(SalesRecord::amount)))
            .entrySet().stream()
            .max(Map.Entry.comparingByValue())
            .map(Map.Entry::getKey)
            .orElse("");

        return new ReportData(totalSales, averageSale, topProduct, records.size());
    }
}

class CsvReportFormatter implements ReportFormatter {
    @Override
    public String format(ReportData data) {
        return String.format("Sales Report\nTotal Sales,$%.2f\nAverage Sale,$%.2f\nTop Product,%s\nRecord Count,%d",
            data.totalSales(), data.averageSale(), data.topProduct(), data.recordCount());
    }
}

class ReportGenerator {
    private final DataFetcher fetcher;
    private final ReportProcessor processor;
    private final ReportFormatter formatter;
    private final ReportDeliverer deliverer;

    public ReportGenerator(DataFetcher fetcher, ReportProcessor processor,
                           ReportFormatter formatter, ReportDeliverer deliverer) {
        this.fetcher = fetcher;
        this.processor = processor;
        this.formatter = formatter;
        this.deliverer = deliverer;
    }

    public void generate() {
        List<SalesRecord> records = fetcher.fetch();
        ReportData data = processor.process(records);
        String formatted = formatter.format(data);
        deliverer.deliver(formatted);
    }
}

// --- Tests ---
public class Main {
    public static void main(String[] args) {
        List<SalesRecord> testData = List.of(
            new SalesRecord("Widget Pro", 500.0, "2024-01-15"),
            new SalesRecord("Widget Pro", 750.0, "2024-01-16"),
            new SalesRecord("Gadget X", 200.0, "2024-01-17"),
            new SalesRecord("Widget Pro", 1200.0, "2024-01-18"),
            new SalesRecord("Gadget X", 350.0, "2024-01-19")
        );

        DataFetcher fetcher = new InMemoryDataFetcher(testData);
        ReportProcessor processor = new SalesReportProcessor();
        ReportFormatter formatter = new CsvReportFormatter();
        ReportDeliverer deliverer = new ConsoleReportDeliverer();

        ReportGenerator generator = new ReportGenerator(
            fetcher, processor, formatter, deliverer);
        generator.generate();
    }
}
```

```python
from dataclasses import dataclass
from abc import ABC, abstractmethod
from typing import List
from collections import defaultdict

@dataclass
class SalesRecord:
    product: str
    amount: float
    date: str

@dataclass
class ReportData:
    total_sales: float
    average_sale: float
    top_product: str
    record_count: int

# --- Interfaces ---
class DataFetcher(ABC):
    @abstractmethod
    def fetch(self) -> List[SalesRecord]:
        pass

class ReportProcessor(ABC):
    @abstractmethod
    def process(self, records: List[SalesRecord]) -> ReportData:
        pass

class ReportFormatter(ABC):
    @abstractmethod
    def format(self, data: ReportData) -> str:
        pass

class ReportDeliverer(ABC):
    @abstractmethod
    def deliver(self, formatted_report: str) -> None:
        pass

# --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher(DataFetcher):
    def __init__(self, data: List[SalesRecord]):
        self._data = data

    def fetch(self) -> List[SalesRecord]:
        return self._data

class ConsoleReportDeliverer(ReportDeliverer):
    def deliver(self, formatted_report: str) -> None:
        print(formatted_report)

# --- Completed classes ---
class SalesReportProcessor(ReportProcessor):
    def process(self, records: List[SalesRecord]) -> ReportData:
        total_sales = sum(r.amount for r in records)
        average_sale = total_sales / len(records)

        product_totals = defaultdict(float)
        for r in records:
            product_totals[r.product] += r.amount
        top_product = max(product_totals, key=product_totals.get)

        return ReportData(total_sales, average_sale, top_product, len(records))

class CsvReportFormatter(ReportFormatter):
    def format(self, data: ReportData) -> str:
        return (
            f"Sales Report\n"
            f"Total Sales,${data.total_sales:.2f}\n"
            f"Average Sale,${data.average_sale:.2f}\n"
            f"Top Product,{data.top_product}\n"
            f"Record Count,{data.record_count}"
        )

class ReportGenerator:
    def __init__(self, fetcher: DataFetcher, processor: ReportProcessor,
                 formatter: ReportFormatter, deliverer: ReportDeliverer):
        self.fetcher = fetcher
        self.processor = processor
        self.formatter = formatter
        self.deliverer = deliverer

    def generate(self):
        records = self.fetcher.fetch()
        data = self.processor.process(records)
        formatted = self.formatter.format(data)
        self.deliverer.deliver(formatted)

# --- Tests ---
if __name__ == "__main__":
    test_data = [
        SalesRecord("Widget Pro", 500.0, "2024-01-15"),
        SalesRecord("Widget Pro", 750.0, "2024-01-16"),
        SalesRecord("Gadget X", 200.0, "2024-01-17"),
        SalesRecord("Widget Pro", 1200.0, "2024-01-18"),
        SalesRecord("Gadget X", 350.0, "2024-01-19"),
    ]

    fetcher = InMemoryDataFetcher(test_data)
    processor = SalesReportProcessor()
    formatter = CsvReportFormatter()
    deliverer = ConsoleReportDeliverer()

    generator = ReportGenerator(fetcher, processor, formatter, deliverer)
    generator.generate()
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <memory>
#include <unordered_map>
#include <cstdio>

using namespace std;

struct SalesRecord {
    string product;
    double amount;
    string date;
};

struct ReportData {
    double totalSales;
    double averageSale;
    string topProduct;
    int recordCount;
};

// --- Interfaces ---
class DataFetcher {
public:
    virtual ~DataFetcher() = default;
    virtual vector<SalesRecord> fetch() = 0;
};

class ReportProcessor {
public:
    virtual ~ReportProcessor() = default;
    virtual ReportData process(const vector<SalesRecord>& records) = 0;
};

class ReportFormatter {
public:
    virtual ~ReportFormatter() = default;
    virtual string format(const ReportData& data) = 0;
};

class ReportDeliverer {
public:
    virtual ~ReportDeliverer() = default;
    virtual void deliver(const string& formattedReport) = 0;
};

// --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher : public DataFetcher {
    vector<SalesRecord> data;
public:
    InMemoryDataFetcher(vector<SalesRecord> data) : data(move(data)) {}
    vector<SalesRecord> fetch() override { return data; }
};

class ConsoleReportDeliverer : public ReportDeliverer {
public:
    void deliver(const string& formattedReport) override {
        cout << formattedReport << endl;
    }
};

// --- Completed classes ---
class SalesReportProcessor : public ReportProcessor {
public:
    ReportData process(const vector<SalesRecord>& records) override {
        double totalSales = 0;
        for (const auto& r : records) {
            totalSales += r.amount;
        }
        double averageSale = totalSales / records.size();

        unordered_map<string, double> productTotals;
        for (const auto& r : records) {
            productTotals[r.product] += r.amount;
        }

        string topProduct;
        double maxAmount = 0;
        for (const auto& [product, total] : productTotals) {
            if (total > maxAmount) {
                maxAmount = total;
                topProduct = product;
            }
        }

        return ReportData{totalSales, averageSale, topProduct, (int)records.size()};
    }
};

class CsvReportFormatter : public ReportFormatter {
public:
    string format(const ReportData& data) override {
        char buf[256];
        snprintf(buf, sizeof(buf),
            "Sales Report\nTotal Sales,$%.2f\nAverage Sale,$%.2f\nTop Product,%s\nRecord Count,%d",
            data.totalSales, data.averageSale, data.topProduct.c_str(), data.recordCount);
        return string(buf);
    }
};

class ReportGenerator {
    unique_ptr<DataFetcher> fetcher;
    unique_ptr<ReportProcessor> processor;
    unique_ptr<ReportFormatter> formatter;
    unique_ptr<ReportDeliverer> deliverer;

public:
    ReportGenerator(unique_ptr<DataFetcher> fetcher,
                    unique_ptr<ReportProcessor> processor,
                    unique_ptr<ReportFormatter> formatter,
                    unique_ptr<ReportDeliverer> deliverer)
        : fetcher(move(fetcher)), processor(move(processor)),
          formatter(move(formatter)), deliverer(move(deliverer)) {}

    void generate() {
        auto records = fetcher->fetch();
        auto data = processor->process(records);
        auto formatted = formatter->format(data);
        deliverer->deliver(formatted);
    }
};

// --- Tests ---
int main() {
    vector<SalesRecord> testData = {
        {"Widget Pro", 500.0, "2024-01-15"},
        {"Widget Pro", 750.0, "2024-01-16"},
        {"Gadget X", 200.0, "2024-01-17"},
        {"Widget Pro", 1200.0, "2024-01-18"},
        {"Gadget X", 350.0, "2024-01-19"}
    };

    auto fetcher = make_unique<InMemoryDataFetcher>(testData);
    auto processor = make_unique<SalesReportProcessor>();
    auto formatter = make_unique<CsvReportFormatter>();
    auto deliverer = make_unique<ConsoleReportDeliverer>();

    ReportGenerator generator(
        move(fetcher), move(processor),
        move(formatter), move(deliverer));
    generator.generate();

    return 0;
}
```

```go
package main

import (
	"fmt"
)

// --- Data types ---
type SalesRecord struct {
	Product string
	Amount  float64
	Date    string
}

type ReportData struct {
	TotalSales  float64
	AverageSale float64
	TopProduct  string
	RecordCount int
}

// --- Interfaces ---
type DataFetcher interface {
	Fetch() []SalesRecord
}

type ReportProcessor interface {
	Process(records []SalesRecord) ReportData
}

type ReportFormatter interface {
	Format(data ReportData) string
}

type ReportDeliverer interface {
	Deliver(formattedReport string)
}

// --- Provided implementations (DO NOT modify) ---
type InMemoryDataFetcher struct {
	data []SalesRecord
}

func NewInMemoryDataFetcher(data []SalesRecord) *InMemoryDataFetcher {
	return &InMemoryDataFetcher{data: data}
}

func (f *InMemoryDataFetcher) Fetch() []SalesRecord {
	return f.data
}

type ConsoleReportDeliverer struct{}

func NewConsoleReportDeliverer() *ConsoleReportDeliverer {
	return &ConsoleReportDeliverer{}
}

func (d *ConsoleReportDeliverer) Deliver(formattedReport string) {
	fmt.Println(formattedReport)
}

// --- Completed classes ---
type SalesReportProcessor struct{}

func NewSalesReportProcessor() *SalesReportProcessor {
	return &SalesReportProcessor{}
}

func (p *SalesReportProcessor) Process(records []SalesRecord) ReportData {
	totalSales := 0.0
	for _, r := range records {
		totalSales += r.Amount
	}
	averageSale := totalSales / float64(len(records))

	productTotals := make(map[string]float64)
	for _, r := range records {
		productTotals[r.Product] += r.Amount
	}

	topProduct := ""
	maxAmount := 0.0
	for product, total := range productTotals {
		if total > maxAmount {
			maxAmount = total
			topProduct = product
		}
	}

	return ReportData{
		TotalSales:  totalSales,
		AverageSale: averageSale,
		TopProduct:  topProduct,
		RecordCount: len(records),
	}
}

type CsvReportFormatter struct{}

func NewCsvReportFormatter() *CsvReportFormatter {
	return &CsvReportFormatter{}
}

func (f *CsvReportFormatter) Format(data ReportData) string {
	return fmt.Sprintf("Sales Report\nTotal Sales,$%.2f\nAverage Sale,$%.2f\nTop Product,%s\nRecord Count,%d",
		data.TotalSales, data.AverageSale, data.TopProduct, data.RecordCount)
}

type ReportGenerator struct {
	fetcher    DataFetcher
	processor  ReportProcessor
	formatter  ReportFormatter
	deliverer  ReportDeliverer
}

func NewReportGenerator(fetcher DataFetcher, processor ReportProcessor,
	formatter ReportFormatter, deliverer ReportDeliverer) *ReportGenerator {
	return &ReportGenerator{
		fetcher:   fetcher,
		processor: processor,
		formatter: formatter,
		deliverer: deliverer,
	}
}

func (g *ReportGenerator) Generate() {
	records := g.fetcher.Fetch()
	data := g.processor.Process(records)
	formatted := g.formatter.Format(data)
	g.deliverer.Deliver(formatted)
}

// --- Tests ---
func main() {
	testData := []SalesRecord{
		{Product: "Widget Pro", Amount: 500.0, Date: "2024-01-15"},
		{Product: "Widget Pro", Amount: 750.0, Date: "2024-01-16"},
		{Product: "Gadget X", Amount: 200.0, Date: "2024-01-17"},
		{Product: "Widget Pro", Amount: 1200.0, Date: "2024-01-18"},
		{Product: "Gadget X", Amount: 350.0, Date: "2024-01-19"},
	}

	fetcher := NewInMemoryDataFetcher(testData)
	processor := NewSalesReportProcessor()
	formatter := NewCsvReportFormatter()
	deliverer := NewConsoleReportDeliverer()

	generator := NewReportGenerator(fetcher, processor, formatter, deliverer)
	generator.Generate()
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class SalesRecord
{
    public string Product { get; }
    public double Amount { get; }
    public string Date { get; }
    public SalesRecord(string product, double amount, string date)
    {
        Product = product; Amount = amount; Date = date;
    }
}

class ReportData
{
    public double TotalSales { get; }
    public double AverageSale { get; }
    public string TopProduct { get; }
    public int RecordCount { get; }
    public ReportData(double totalSales, double averageSale, string topProduct, int recordCount)
    {
        TotalSales = totalSales; AverageSale = averageSale;
        TopProduct = topProduct; RecordCount = recordCount;
    }
}

// --- Interfaces ---
interface IDataFetcher
{
    List<SalesRecord> Fetch();
}

interface IReportProcessor
{
    ReportData Process(List<SalesRecord> records);
}

interface IReportFormatter
{
    string Format(ReportData data);
}

interface IReportDeliverer
{
    void Deliver(string formattedReport);
}

// --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher : IDataFetcher
{
    private readonly List<SalesRecord> _data;
    public InMemoryDataFetcher(List<SalesRecord> data) => _data = data;
    public List<SalesRecord> Fetch() => _data;
}

class ConsoleReportDeliverer : IReportDeliverer
{
    public void Deliver(string formattedReport) => Console.WriteLine(formattedReport);
}

// --- Completed classes ---
class SalesReportProcessor : IReportProcessor
{
    public ReportData Process(List<SalesRecord> records)
    {
        double totalSales = records.Sum(r => r.Amount);
        double averageSale = totalSales / records.Count;

        string topProduct = records
            .GroupBy(r => r.Product)
            .OrderByDescending(g => g.Sum(r => r.Amount))
            .First()
            .Key;

        return new ReportData(totalSales, averageSale, topProduct, records.Count);
    }
}

class CsvReportFormatter : IReportFormatter
{
    public string Format(ReportData data)
    {
        return $"Sales Report\nTotal Sales,${data.TotalSales:F2}\nAverage Sale,${data.AverageSale:F2}\nTop Product,{data.TopProduct}\nRecord Count,{data.RecordCount}";
    }
}

class ReportGenerator
{
    private readonly IDataFetcher _fetcher;
    private readonly IReportProcessor _processor;
    private readonly IReportFormatter _formatter;
    private readonly IReportDeliverer _deliverer;

    public ReportGenerator(IDataFetcher fetcher, IReportProcessor processor,
                           IReportFormatter formatter, IReportDeliverer deliverer)
    {
        _fetcher = fetcher;
        _processor = processor;
        _formatter = formatter;
        _deliverer = deliverer;
    }

    public void Generate()
    {
        var records = _fetcher.Fetch();
        var data = _processor.Process(records);
        var formatted = _formatter.Format(data);
        _deliverer.Deliver(formatted);
    }
}

// --- Tests ---
class Program
{
    static void Main()
    {
        var testData = new List<SalesRecord>
        {
            new SalesRecord("Widget Pro", 500.0, "2024-01-15"),
            new SalesRecord("Widget Pro", 750.0, "2024-01-16"),
            new SalesRecord("Gadget X", 200.0, "2024-01-17"),
            new SalesRecord("Widget Pro", 1200.0, "2024-01-18"),
            new SalesRecord("Gadget X", 350.0, "2024-01-19")
        };

        IDataFetcher fetcher = new InMemoryDataFetcher(testData);
        IReportProcessor processor = new SalesReportProcessor();
        IReportFormatter formatter = new CsvReportFormatter();
        IReportDeliverer deliverer = new ConsoleReportDeliverer();

        var generator = new ReportGenerator(
            fetcher, processor, formatter, deliverer);
        generator.Generate();
    }
}
```

```typescript
interface SalesRecord {
    product: string;
    amount: number;
    date: string;
}

interface ReportData {
    totalSales: number;
    averageSale: number;
    topProduct: string;
    recordCount: number;
}

// --- Interfaces ---
interface DataFetcher {
    fetch(): SalesRecord[];
}

interface ReportProcessor {
    process(records: SalesRecord[]): ReportData;
}

interface ReportFormatter {
    format(data: ReportData): string;
}

interface ReportDeliverer {
    deliver(formattedReport: string): void;
}

// --- Provided implementations (DO NOT modify) ---
class InMemoryDataFetcher implements DataFetcher {
    private data: SalesRecord[];

    constructor(data: SalesRecord[]) {
        this.data = data;
    }

    fetch(): SalesRecord[] { return this.data; }
}

class ConsoleReportDeliverer implements ReportDeliverer {
    deliver(formattedReport: string): void {
        console.log(formattedReport);
    }
}

// --- Completed classes ---
class SalesReportProcessor implements ReportProcessor {
    process(records: SalesRecord[]): ReportData {
        const totalSales = records.reduce((sum, r) => sum + r.amount, 0);
        const averageSale = totalSales / records.length;

        const productTotals = new Map<string, number>();
        for (const r of records) {
            productTotals.set(r.product, (productTotals.get(r.product) || 0) + r.amount);
        }

        let topProduct = "";
        let maxAmount = 0;
        for (const [product, total] of productTotals) {
            if (total > maxAmount) {
                maxAmount = total;
                topProduct = product;
            }
        }

        return { totalSales, averageSale, topProduct, recordCount: records.length };
    }
}

class CsvReportFormatter implements ReportFormatter {
    format(data: ReportData): string {
        return `Sales Report\nTotal Sales,$${data.totalSales.toFixed(2)}\nAverage Sale,$${data.averageSale.toFixed(2)}\nTop Product,${data.topProduct}\nRecord Count,${data.recordCount}`;
    }
}

class ReportGenerator {
    private fetcher: DataFetcher;
    private processor: ReportProcessor;
    private formatter: ReportFormatter;
    private deliverer: ReportDeliverer;

    constructor(fetcher: DataFetcher, processor: ReportProcessor,
                formatter: ReportFormatter, deliverer: ReportDeliverer) {
        this.fetcher = fetcher;
        this.processor = processor;
        this.formatter = formatter;
        this.deliverer = deliverer;
    }

    generate(): void {
        const records = this.fetcher.fetch();
        const data = this.processor.process(records);
        const formatted = this.formatter.format(data);
        this.deliverer.deliver(formatted);
    }
}

// --- Tests ---
const testData: SalesRecord[] = [
    { product: "Widget Pro", amount: 500.0, date: "2024-01-15" },
    { product: "Widget Pro", amount: 750.0, date: "2024-01-16" },
    { product: "Gadget X", amount: 200.0, date: "2024-01-17" },
    { product: "Widget Pro", amount: 1200.0, date: "2024-01-18" },
    { product: "Gadget X", amount: 350.0, date: "2024-01-19" },
];

const fetcher = new InMemoryDataFetcher(testData);
const processor = new SalesReportProcessor();
const formatter = new CsvReportFormatter();
const deliverer = new ConsoleReportDeliverer();

const generator = new ReportGenerator(fetcher, processor, formatter, deliverer);
generator.generate();
```


