---
id: "lld-social-content-platforms-design-online-learning-platform"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Social Content Platforms"
subSection: ""
title: "Design Online Learning Platform"
slug: "lld-social-content-platforms-design-online-learning-platform"
summary: "In this chapter, we will explore the low-level design of an Online Learning Platform in detail."
eli10: "Imagine Design Online Learning Platform as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Online Learning Platform Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Social Content Platforms","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Online Learning Platform"
  code: |
    abstract class User {
        private final String id;
        private final String name;
        private final String email;
    
        public User(String name, String email) {
            this.id = UUID.randomUUID().toString();
            this.name = name;
            this.email = email;
        }
    
        public String getId() { return id; }
        public String getName() { return name; }
    }
    
    class Student extends User {
        public Student(String name, String email) {
            super(name, email);
        }
    }
    
    class Instructor extends User {
        public Instructor(String name, String email) {
            super(name, email);
        }
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is an Online Learning Platform"
>
> An **online learning platform** is a digital environment where learners can access educational content such as video lessons, quizzes, and assignments. Instructors can create and manage courses, while students can browse available courses, enroll, and monitor their learning journey.
>
> 
> <!-- Simulation: learning-platform -->
> 

>
> Examples of such platforms include **Coursera** and **Udemy**.

In this chapter, we will explore the **low-level design of an Online Learning Platform** in detail.

Let’s start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before designing an online learning platform, it’s important to understand the expectations and boundaries of the system. This discussion helps ensure alignment between interviewer and candidate and keeps the design focused and purposeful.

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate**: What kind of course content should we support"
>
> **Interviewer**: For now, support two types: **Lectures** and **Quizzes**.
>
> **Candidate**: Can a student enroll in multiple courses simultaneously"
>
> **Interviewer**: Yes, they can enroll in multiple courses simultaneously
>
> **Candidate**: Should we notify anyone or trigger any actions upon course completion"
>
> **Interviewer**: Yes, the system should notify the instructor and issue a certificate when a student completes a course.

### 1.1 Functional Requirements

- Instructors can create **courses** and add **lectures** and **quizzes** to them.
- Students can **enroll** in courses and track their **progress**.
- Upon completion, the **instructor** should be notified and a **certificate** should be issued to the student.
- The platform supports **multiple enrollments** per student and instructor.
- The system should track **per-component progress** and provide an overall progress percentage.

### 1.2 Non-Functional Requirements

- The system should follow **object-oriented principles** with proper separation of responsibilities.
- The system should be **modular and extensible**, capable of adding new content types or actions upon course completion in the future.
- The design should prioritize **clarity, testability**, and **ease of extension**.

After the requirements are clear, the next step is to identify the core entities that we will form the foundation of our design.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing the functional requirements and highlighting the key nouns and responsibilities that naturally map to object-oriented abstractions such as classes, enums, or interfaces.

Let’s walk through the functional requirements and extract the relevant entities:

#### **The platform has different types of users: students who take courses and instructors who create them.**

This points to a **User** entity as a base concept. Since students and instructors have distinct roles but share common attributes like name and email, we can model this with an abstract User class and concrete subclasses: **Student** and **Instructor**.

#### **Instructors can create courses, which are composed of different types of content, like video lectures and quizzes.**

The **Course** is a central entity. A course itself is a container for various learning materials. These materials, such as a **Lecture** or a **Quiz**, share common characteristics (e.g., a title, a way to be displayed). This structure is a perfect fit for the Composite pattern. We'll define a **CourseComponent** interface to represent any piece of content. Lecture and Quiz will be "leaf" nodes implementing this interface, and the Course class itself will be a "composite" node, also implementing CourseComponent, allowing it to hold a collection of other components.

#### **The system needs a simple way to create different content types.**

To decouple the course creation logic from the specific construction details of lectures and quizzes, we can introduce a **ContentFactory**. This factory will provide static methods to create instances of Lecture and Quiz, simplifying the process of adding content to a course.

#### **Students can enroll in courses and track their progress.**

The relationship between a student and a course is a key concept. This requires an **Enrollment** entity to link a specific Student to a specific Course. This entity will be responsible for tracking the student's progress, such as which CourseComponents have been completed and the overall completion status.

#### **When a student completes a course, certain actions should be triggered, like issuing a certificate or notifying the instructor.**

This is an event-driven requirement that calls for the Observer pattern. We'll define a **ProgressObserver** interface for objects that need to react to learning milestones. Concrete observers like **CertificateIssuer** and **InstructorNotifier** will implement this interface. The service managing enrollments will notify all registered observers when a course is completed.

#### **The system needs to manage data (users, courses, enrollments) and orchestrate core operations.**

To manage data persistence, we'll use the Repository pattern. We will have **UserRepository**, **CourseRepository**, and **EnrollmentRepository** to handle the storage and retrieval of their respective objects. To orchestrate business logic, an **EnrollmentService** will manage the process of enrolling students and tracking their progress, including notifying observers.

#### **The system should provide a simple, unified API for clients.**

To hide the internal complexity of repositories, factories, and services, we can create a single entry point. A **LearningPlatformFacade** will provide a clean API for all high-level actions, such as creating users, building courses, enrolling students, and marking content as complete.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **User (and subclasses Student, Instructor)**: Represents the actors in the system. An abstract User class holds common data, while subclasses define specific roles.
> - **CourseComponent**: An interface representing any element within a course (Composite Pattern "component"). It defines common operations like display().
> - **Course**: A composite class that implements CourseComponent. It represents a full course, containing a title, an instructor, and a collection of other CourseComponents (lectures, quizzes).
> - **Lecture & Quiz**: Leaf classes that implement CourseComponent. They represent the individual, non-divisible learning materials within a course.
> - **ContentFactory**: A factory class that provides a simple, centralized way to create different types of CourseComponents.
> - **Enrollment**: An association class that links a Student to a Course. It is responsible for tracking the student's progress and completion status.
> - **Repository (UserRepository, CourseRepository, EnrollmentRepository)**: Classes that abstract the data storage layer, providing a clean API for saving and retrieving domain objects.
> - **ProgressObserver**: An interface for objects that need to be notified when a student completes a course (Observer Pattern "observer"). InstructorNotifier and CertificateIssuer are concrete implementations.
> - **EnrollmentService**: A service class that handles the business logic related to enrollments, including progress tracking and notifying observers upon course completion.
> - **LearningPlatformFacade**: A single class providing a simplified, high-level interface to the entire platform's functionality (Facade Pattern).

These core entities define the key abstractions of the online learning platform and will guide the structure of our low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section details the design of each class identified previously, including their specific attributes and methods. We will also illustrate how these classes relate to one another and highlight the key design patterns that underpin our solution.

## 3.1 Class Definitions

We can categorize our classes into enums, data-holding classes, and core classes that encapsulate the system's primary logic.

### Enums

#### **Enrollment.Status**

- **Values**: IN_PROGRESS, COMPLETED.
- **Purpose**: A type-safe enumeration to represent the different states of a student's enrollment in a course.

### Data Classes

#### **User** **(Abstract Class)**

Serves as a base class for all types of users, holding common profile information. The subclasses define the specific roles within the platform.

- **Attributes**: id, name, email.
- **Subclasses**: Student, Instructor.

#### **Lecture** **(Implements** **CourseComponent)**

A "leaf" class representing a single video lecture. It holds lecture-specific data and implements the common component interface.

- **Attributes**: id, title, durationMinutes.
- **Methods**: display().

#### **Quiz** **(Implements** **CourseComponent)**

A "leaf" class representing a quiz. It holds quiz-specific data and implements the common component interface.

- **Attributes**: id, title, questionCount.
- **Methods**: display().

#### **Enrollment**

An association class that captures the stateful relationship between a Student and a Course, including their progress.

- **Attributes**: id, student, course, progress (a map tracking completed components), status (Enrollment.Status).
- **Methods**: markComponentComplete(), isCourseCompleted(), getProgressPercentage().'

### Core Classes

#### **Course** **(Implements** **CourseComponent)**

The "composite" class in the Composite pattern. It represents an entire course, acts as a container for other CourseComponents, and can be treated as a single component itself.

- **Attributes**: id, title, instructor, content (a list of CourseComponent).
- **Methods**: addContent(CourseComponent component), display().

#### Enrollment

### **EnrollmentService**

A service class that orchestrates all business logic related to enrollments.  It acts as the "subject" in the Observer pattern, maintaining a list of observers and notifying them of relevant events.

### Repository

 These classes manage the in-memory persistence of their respective domain objects (User, Course, Enrollment). They implement the Singleton pattern to ensure a single, consistent data source for the application.

#### UserRepository

#### CourseRepository

#### EnrollmentRepository

#### EnrollmentService

A service class that orchestrates all business logic related to enrollments.

#### LearningPlatformFacade

The primary entry point for clients. It provides a simple, unified interface to the platform's features, hiding the underlying complexity of services, repositories, and factories.

**Methods**:

- createStudent()
- createCourse()
- addLectureToCourse()
- enrollStudent()

## 3.2 Class Relationships

#### **Inheritance / Implementation**

- Student and Instructor **extend** the abstract User class.
- Course, Lecture, and Quiz all **implement** the CourseComponent interface.
- InstructorNotifier and CertificateIssuer **implement** the ProgressObserver interface.

#### **Composition / Aggregation**

- Course **has an** Instructor and **is composed of** a list of CourseComponents.
- Enrollment **has a** Student and a Course, linking them together.
- EnrollmentService **has a list of** ProgressObservers.
- LearningPlatformFacade **manages and uses** an EnrollmentService and singleton Repository instances.

#### **Dependency / "Uses-a"**

- LearningPlatformFacade **uses** ContentFactory to create course content and delegates business logic to EnrollmentService.
- EnrollmentService **uses** EnrollmentRepository for data access and notifies ProgressObservers upon course completion.
- The services and facade **use** their respective repositories to persist and retrieve data.

## 3.3 Key Design Patterns

### [**Composite Pattern**](/learn/lld/composite)

The CourseComponent interface, along with the Course (composite) and Lecture/Quiz (leaf) classes, perfectly embodies this pattern. It allows clients to treat individual content pieces and entire courses uniformly, simplifying operations like displaying the course structure.

### [**Factory Pattern (Simple Factory)**](/learn/lld/factory-method)

ContentFactory encapsulates the logic for creating different types of course content. This simplifies the process for the client (the Facade) and makes it easy to add new content types in the future without changing the client code.

### [Observer Pattern](/learn/lld/observer)

The ProgressObserver interface, concrete observers (InstructorNotifier, CertificateIssuer), and the EnrollmentService (subject) form a classic Observer pattern. This decouples the core progress-tracking logic from the actions that must follow, allowing new actions (e.g., sending an email) to be added easily by creating new observers.

### [Facade Pattern](/learn/lld/facade)

LearningPlatformFacade serves as a Facade, providing a simple, high-level API to the client. It hides the complex interactions between services, repositories, and factories, making the system easier to use.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 User

```java
abstract class User {
    private final String id;
    private final String name;
    private final String email;

    public User(String name, String email) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.email = email;
    }

    public String getId() { return id; }
    public String getName() { return name; }
}

class Student extends User {
    public Student(String name, String email) {
        super(name, email);
    }
}

class Instructor extends User {
    public Instructor(String name, String email) {
        super(name, email);
    }
}
```

### 4.2 CourseComponent

```java
$c4
```

### 4.3 Course

```java
class Course implements CourseComponent {
    private final String id;
    private final String title;
    private final Instructor instructor;
    private final List<CourseComponent> content = new ArrayList<>();

    public Course(String id, String title, Instructor instructor) {
        this.id = id;
        this.title = title;
        this.instructor = instructor;
    }

    public void addContent(CourseComponent component) {
        content.add(component);
    }

    @Override public String getId() { return id; }

    @Override public String getTitle() { return title; }

    public Instructor getInstructor() { return instructor; }

    public List<CourseComponent> getContent() { return content; }

    @Override public void display() {
        System.out.println("Course: " + title + " by " + instructor.getName());
        content.forEach(CourseComponent::display);
    }
}
```

### 4.4 ContentFactory

```java
class ContentFactory {
    public static CourseComponent createLecture(String title, int duration) {
        return new Lecture(UUID.randomUUID().toString(), title, duration);
    }

    public static CourseComponent createQuiz(String title, int questionCount) {
        return new Quiz(UUID.randomUUID().toString(), title, questionCount);
    }
}
```

### 4.5 Enrollment

```java
$c9
```

### 4.6 Repository

```java
$cf
```

### 4.7 ProgressObserver

```java
$d5
```

### 4.8 EnrollmentService

```java
$d8
```

### 4.9 LearningPlatformFacade

```java
$de
```

### 4.10 LearningPlatformDemo

```java
$e4
```

---

# 5. Run and Test

---

# 6. Quiz
