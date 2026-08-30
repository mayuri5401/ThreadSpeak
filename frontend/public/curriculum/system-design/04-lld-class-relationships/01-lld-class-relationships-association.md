---
id: "lld-class-relationships-association"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Class Relationships"
subSection: ""
title: "Association"
slug: "lld-class-relationships-association"
summary: "In the real world, nothing exists in isolation."
eli10: "Imagine Association as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Association Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Class Relationships","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Association"
  code: |
    class PaymentGateway {
        void processPayment(double amount) {
            System.out.println("Processing payment of $" + amount);
        }
    }
    
    class Order {
        private PaymentGateway gateway;
    
        public Order(PaymentGateway gateway) {
            this.gateway = gateway;
        }
    
        public void checkout() {
            gateway.processPayment(100.0);
        }
    }
---

In the real world, **nothing exists in isolation**.

- A **doctor** has patients.
- A **driver** has a car.
- A **student** enrolls in courses.

These connections define how different entities interact and collaborate.

When we design software using **Object-Oriented Programming (OOP)**, our goal is to model this real world where objects communicate and work together to achieve meaningful outcomes.

**So, how do we represent these connections between our objects"**

In this chapter, we will explore the most fundamental and common of these relationships: **Association**.

---

# 1. What is Association"

**Association** represents a relationship between two classes where **one object uses, communicates with, or references another**.

This relationship models the idea:

> **“One object need to know about the existence of another object to perform its responsibilities”**

If Class A must interact with Class B to fulfill its purpose, then Class A is **associated** with Class B.

> 💡 **Key Insight:**

> **Real-World Analogy**
>
> Think of a **Student** and a **Teacher**.
>
> - A student **has-a** teacher who teaches them.
> - A teacher **teaches** multiple students.
>
> 
> ```mermaid
> classDiagram
>      class Student {
>          -name: String
>          -teacher: Teacher
>      }
>      class Teacher {
>          -name: String
>          -students: List~Student~
>      }
>      Student "*" -- "1..*" Teacher : learns from
>
>      style Student fill:#00ceff,stroke:#000,color:#000
>      style Teacher fill:#ffa94d,stroke:#000,color:#000
> ```
> 

>
> However:
>
> - A **student can still exist** without a teacher.
> - A **teacher can still exist** without any specific student.
>
> This is a **real-world association**:
>
> - The relationship exists.
> - But **neither party owns the other**.
> - Their lifecycles are **independent**.

### Key Characteristics of Association:

- Association reflects a **"has-a"** or **"uses-a"** relationship.
- Associated objects are **loosely coupled** and can exist **independently** of one another.
- The association can be **unidirectional** or **bidirectional**, and can follow different **multiplicity** patterns (1-to-1, 1-to-many, etc.).

---

# 2. UML Representation

In UML class diagrams, **association** is represented by a **solid line** between two classes.

| Symbol | Meaning | Example Scenario |
| --- | --- | --- |
| Solid line (---) | An association between classes | `Student` --- `Teacher` |
| Arrowhead (-->) | Directionality (who knows whom) | `Order` --> `PaymentGateway` |
| No arrowhead | Bidirectional association | `Team` --- `Developer` |
| `1` | Exactly one | Each `User` has one `Profile` |
| `0..1` | Zero or one (optional) | An `Employee` may have a `Manager` |
| `*` | Many (zero or more) | A `Project` can have many `Tasks` |
| `1..*` | At least one | Each `Course` has one or more `Students` |

Multiplicity defines **how many instances** of one class can be associated with another. It is written near the class ends in UML diagrams.

```mermaid
classDiagram
    class ClassA {
    }
    class ClassB {
    }
    ClassA "1" --> "*" ClassB : association

    style ClassA fill:#00ceff,stroke:#000,color:#000
    style ClassB fill:#ffa94d,stroke:#000,color:#000
```

The solid line is the key. Inheritance uses a solid line with a hollow triangle. Aggregation adds a hollow diamond. Composition adds a filled diamond. Plain association is just the line, optionally with an arrowhead for direction and multiplicity labels at each end.

---

# 3. Types of Association

Associations between classes can vary depending on **how** objects are connected and **in which direction** information flows.

In Object-Oriented Design, associations are primarily defined by two key properties:

1. **Directionality** — *Who knows about whom"*
2. **Multiplicity** — *How many objects are connected"*

## **3.1 Based on Direction (Directionality)**

Directionality determines **which class holds a reference to the other** and whether communication is one-way or two-way.

### **a. Unidirectional Association**

In a unidirectional association, only one class is aware of or holds a reference to the other class. The referenced class has no knowledge of who is referencing it.

```mermaid
classDiagram
    class Order {
        -gateway: PaymentGateway
        +checkout()
    }
    class PaymentGateway {
        +processPayment(amount)
    }
    Order --> PaymentGateway : uses

    style Order fill:#00ceff,stroke:#000,color:#000
    style PaymentGateway fill:#ffa94d,stroke:#000,color:#000
```

**Example: **An `Order` object uses a `PaymentGateway` to process transactions, but the `PaymentGateway` doesn't keep track of any orders. The order knows about the gateway. The gateway doesn't know about the order.

```java
class PaymentGateway {
    void processPayment(double amount) {
        System.out.println("Processing payment of $" + amount);
    }
}

class Order {
    private PaymentGateway gateway;

    public Order(PaymentGateway gateway) {
        this.gateway = gateway;
    }

    public void checkout() {
        gateway.processPayment(100.0);
    }
}
```

`Order` holds a reference to `PaymentGateway` and calls its method. But `PaymentGateway` has no field or reference pointing back to `Order`. This is the simplest and most common form of association. When in doubt, start with unidirectional. You can always add the reverse direction later if needed.

### **b. Bidirectional Association**

In a **bidirectional association**, both classes are aware of each other. Each class holds a reference to the other, enabling **two-way communication**.

```mermaid
classDiagram
    class Team {
        -developers: List~Developer~
        +addDeveloper(dev)
    }
    class Developer {
        -team: Team
        +setTeam(team)
    }
    Team "1" -- "*" Developer : has

    style Team fill:#00ceff,stroke:#000,color:#000
    style Developer fill:#69db7c,stroke:#000,color:#000
```

**Example:** A `Team` has a list of `Developer`s, and each `Developer` knows which `Team` they belong to. Either side can navigate to the other.

```java
class Developer {
    private Team team;

    public void setTeam(Team team) {
        this.team = team;
    }
}

class Team {
    private List<Developer> developers = new ArrayList<>();

    public void addDeveloper(Developer dev) {
        developers.add(dev);
        dev.setTeam(this);
    }
}
```

Notice how `addDeveloper()` updates both sides of the relationship: it adds the developer to the team's list *and* sets the team reference on the developer. This is important. In a bidirectional association, both references must stay in sync. If you add a developer to the team but forget to set the developer's team reference, you'll get inconsistent state where the team thinks it has the developer, but the developer doesn't know which team it belongs to.

Bidirectional associations are more complex to maintain than unidirectional ones. You need to keep both sides synchronized, which means more code and more opportunities for bugs. Use them only when both sides genuinely need to navigate to the other.

---

## **3.2 Based on Multiplicity**

Multiplicity defines **how many instances** of one class can be associated with instances of another class. It describes **the quantity and nature of the connections**.

### **a. One-to-One Association**

Each object of one class is linked to **exactly one** object of the other class.

```mermaid
classDiagram
    class User {
        -profile: Profile
        +setProfile(profile)
    }
    class Profile {
        -user: User
        +setUser(user)
    }
    User "1" -- "1" Profile : has

    style User fill:#00ceff,stroke:#000,color:#000
    style Profile fill:#ffa94d,stroke:#000,color:#000
```

**Example: **Each `User` has exactly one `Profile`, and each `Profile` belongs to one `User`. This is a bidirectional one-to-one relationship.

```java
class Profile {
    private User user;

    public void setUser(User user) {
        this.user = user;
    }
}

class User {
    private Profile profile;

    public void setProfile(Profile profile) {
        this.profile = profile;
        profile.setUser(this);
    }
}
```

One-to-one associations make sense when you want to separate concerns even though the objects are tightly paired. A `User` handles authentication (login, password, roles), while a `Profile` handles display information (avatar, bio, preferences). Merging them into one class would work, but separating them keeps each class focused on a single responsibility. 

If you find that two one-to-one associated classes are always created, modified, and deleted together with no independent use case, that's a signal they might belong as a single class instead.

### **b. One-to-Many Association**

One object of a class is linked to multiple objects of another class. This is one of the most common patterns in software design.

```mermaid
classDiagram
    class Project {
        -issues: List~Issue~
        +addIssue(issue)
    }
    class Issue {
        -project: Project
        +setProject(project)
    }
    Project "1" --> "*" Issue : contains

    style Project fill:#38d9a9,stroke:#000,color:#000
    style Issue fill:#00ceff,stroke:#000,color:#000
```

**Example:** Each `Project` can have many `Issue`s (bug reports, feature requests), but each `Issue` belongs to one `Project`. The project holds a list of issues, and each issue holds a back-reference to its project.

```java
class Issue {
    private Project project;

    public void setProject(Project project) {
        this.project = project;
    }
}

class Project {
    private List<Issue> issues = new ArrayList<>();

    public void addIssue(Issue issue) {
        issues.add(issue);
        issue.setProject(this);
    }
}
```

### **c. Many-to-Many Association**

Multiple objects from one class are associated with multiple objects from another class. This is common in scenarios involving memberships, enrollments, or tagging systems.

```mermaid
classDiagram
    class User {
        -name: String
        -groups: List~Group~
        +joinGroup(group)
    }
    class Group {
        -name: String
        -users: List~User~
        +addUser(user)
    }
    User "*" -- "*" Group : member of

    style User fill:#00ceff,stroke:#000,color:#000
    style Group fill:#9775fa,stroke:#000,color:#000
```

**Example:** A `User` can be a member of multiple `Group`s (WhatsApp groups, Slack channels), and a `Group` can have multiple `User`s. Both sides hold a list of the other. The `joinGroup()` and `addUser()` methods keep both sides in sync.

```java
$8a
```

Notice the guard clause in both `joinGroup()` and `addUser()`. Without it, calling `alice.joinGroup(backend)` would add `backend` to Alice's groups, then `backend.addUser(alice)` would add Alice to backend's users, then it would call `alice.joinGroup(backend)` again, and you'd be stuck in an infinite loop. The `contains` check breaks the recursion.

Many-to-many associations are inherently bidirectional and require careful synchronization. In database design, you'd model this with a join table. In code, both sides hold a list of the other, and you need helper methods that update both sides atomically.

---

# 4. Practical Example: Hospital Appointment System

Let's build a system that combines multiple association types in a realistic domain. A hospital manages doctors, patients, rooms, and appointments. The relationships between these entities demonstrate unidirectional, bidirectional, one-to-many, and many-to-many associations working together.

Here's how the classes connect:

- `Appointment` holds a reference to a `Room` (unidirectional, the room doesn't know about its appointments).
- `Doctor` has a list of `Appointment` objects, and each `Appointment` points back to its `Doctor` (bidirectional one-to-many).
- `Patient` has a list of `Appointment` objects, and each `Appointment` points back to its `Patient` (bidirectional one-to-many).
- `Doctor` and `Patient` are connected many-to-many *through* `Appointment` as an intermediary. A doctor sees many patients, and a patient can visit many doctors, but they don't reference each other directly.

```mermaid
classDiagram
    class Doctor {
        -name: String
        -specialization: String
        -appointments: List~Appointment~
        +addAppointment(appt)
        +getPatients(): List~Patient~
    }

    class Patient {
        -name: String
        -appointments: List~Appointment~
        +addAppointment(appt)
        +getDoctors(): List~Doctor~
    }

    class Appointment {
        -doctor: Doctor
        -patient: Patient
        -room: Room
        -time: String
        +getDoctor(): Doctor
        +getPatient(): Patient
        +getRoom(): Room
    }

    class Room {
        -number: String
        -floor: int
        +getNumber(): String
    }

    Doctor "1" -- "*" Appointment : has
    Patient "1" -- "*" Appointment : has
    Appointment "*" --> "1" Room : held in

    style Doctor fill:#00ceff,stroke:#000,color:#000
    style Patient fill:#69db7c,stroke:#000,color:#000
    style Appointment fill:#ffa94d,stroke:#000,color:#000
    style Room fill:#9775fa,stroke:#000,color:#000
```

```java
$8c
```

#### Why This Design Works

- **The **`Appointment`** class is the intermediary.** Instead of `Doctor` and `Patient` holding direct references to each other (which would create a tangled many-to-many), they connect through `Appointment`. This is a common pattern for modeling many-to-many relationships in code, analogous to a join table in a relational database.
- **Navigation works both ways.** A doctor can find all their patients by walking their appointments. A patient can find all their doctors the same way. Neither class needs to maintain a separate list of the other.
- `Room`** stays simple.** The room doesn't need to know about appointments. It's just a location. This keeps the relationship unidirectional and avoids unnecessary coupling.
- **Adding data to the relationship is natural.** Because `Appointment` is a full object, you can add fields like `time`, `status`, `notes`, or `diagnosis` without modifying `Doctor` or `Patient`. Try doing that with a direct many-to-many reference.
