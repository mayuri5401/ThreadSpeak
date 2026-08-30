---
id: "lld-class-relationships-exercise-association"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Class Relationships"
subSection: ""
title: "Exercise: Association"
slug: "lld-class-relationships-exercise-association"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Association as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Association Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","Class Relationships","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Online Course Platform

**Problem:** Build a course platform where instructors create courses and students enroll in them. This exercise practices unidirectional and one-to-many associations.

**Requirements:**

- `Instructor` with a name and a list of `Course` objects they teach. An `addCourse(course)` method that adds the course and sets the instructor on the course.
- `Course` with a title, an `Instructor` reference, and a list of enrolled `Student` objects. An `enrollStudent(student)` method that adds the student and sets the enrolled course on the student.
- `Student` with a name and an `enrolledCourse` reference (the course they're currently taking). A `getInstructorName()` method that navigates through the course to return the instructor's name.

```java
import java.util.ArrayList;
import java.util.List;

class Instructor {
    private String name;
    private List<Course> courses = new ArrayList<>();

    public Instructor(String name) {
        this.name = name;
    }

    public void addCourse(Course course) {
        // TODO: Add course to list and set this as the course's instructor
    }

    public String getName() { return name; }
    public List<Course> getCourses() { return courses; }
}

class Course {
    private String title;
    private Instructor instructor;
    private List<Student> students = new ArrayList<>();

    public Course(String title) {
        this.title = title;
    }

    public void setInstructor(Instructor instructor) {
        // TODO: Set the instructor reference
    }

    public void enrollStudent(Student student) {
        // TODO: Add student to list and set this as the student's enrolled course
    }

    public String getTitle() { return title; }
    public Instructor getInstructor() { return instructor; }
    public List<Student> getStudents() { return students; }
}

class Student {
    private String name;
    private Course enrolledCourse;

    public Student(String name) {
        this.name = name;
    }

    public void setEnrolledCourse(Course course) {
        // TODO: Set the enrolled course reference
    }

    public String getInstructorName() {
        // TODO: Navigate through enrolledCourse to get the instructor's name
        // Return "No instructor" if course or instructor is null
        return "";
    }

    public String getName() { return name; }
    public Course getEnrolledCourse() { return enrolledCourse; }
}

public class Main {
    public static void main(String[] args) {
        Instructor alice = new Instructor("Alice");
        Course dsa = new Course("Data Structures");
        Course sysDesign = new Course("System Design");

        alice.addCourse(dsa);
        alice.addCourse(sysDesign);

        Student bob = new Student("Bob");
        Student charlie = new Student("Charlie");

        dsa.enrollStudent(bob);
        dsa.enrollStudent(charlie);
        sysDesign.enrollStudent(charlie);

        System.out.println(alice.getName() + "'s courses:");
        for (Course c : alice.getCourses())
            System.out.println("  - " + c.getTitle());

        System.out.println("Students in " + dsa.getTitle() + ":");
        for (Student s : dsa.getStudents())
            System.out.println("  - " + s.getName());

        System.out.println(bob.getName() + "'s instructor: " + bob.getInstructorName());
    }
}
```

```python
class Instructor:
    def __init__(self, name: str):
        self.name = name
        self.courses = []

    def add_course(self, course):
        # TODO: Add course to list and set self as the course's instructor
        pass

class Course:
    def __init__(self, title: str):
        self.title = title
        self.instructor = None
        self.students = []

    def set_instructor(self, instructor):
        # TODO: Set the instructor reference
        pass

    def enroll_student(self, student):
        # TODO: Add student to list and set self as the student's enrolled course
        pass

class Student:
    def __init__(self, name: str):
        self.name = name
        self.enrolled_course = None

    def set_enrolled_course(self, course):
        # TODO: Set the enrolled course reference
        pass

    def get_instructor_name(self) -> str:
        # TODO: Navigate through enrolled_course to get the instructor's name
        # Return "No instructor" if course or instructor is None
        return ""

if __name__ == "__main__":
    alice = Instructor("Alice")
    dsa = Course("Data Structures")
    sys_design = Course("System Design")

    alice.add_course(dsa)
    alice.add_course(sys_design)

    bob = Student("Bob")
    charlie = Student("Charlie")

    dsa.enroll_student(bob)
    dsa.enroll_student(charlie)
    sys_design.enroll_student(charlie)

    print(f"{alice.name}'s courses:")
    for c in alice.courses:
        print(f"  - {c.title}")

    print(f"Students in {dsa.title}:")
    for s in dsa.students:
        print(f"  - {s.name}")

    print(f"{bob.name}'s instructor: {bob.get_instructor_name()}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Course;
class Student;

class Instructor {
private:
    string name;
    vector<Course*> courses;
public:
    Instructor(const string& name) : name(name) {}

    void addCourse(Course* course);
    // TODO: implement addCourse

    string getName() const { return name; }
    vector<Course*> getCourses() const { return courses; }
};

class Course {
private:
    string title;
    Instructor* instructor = nullptr;
    vector<Student*> students;
public:
    Course(const string& title) : title(title) {}

    void setInstructor(Instructor* instr) {
        // TODO: Set the instructor reference
    }

    void enrollStudent(Student* student);
    // TODO: implement enrollStudent

    string getTitle() const { return title; }
    Instructor* getInstructor() const { return instructor; }
    vector<Student*> getStudents() const { return students; }
};

class Student {
private:
    string name;
    Course* enrolledCourse = nullptr;
public:
    Student(const string& name) : name(name) {}

    void setEnrolledCourse(Course* course) {
        // TODO: Set the enrolled course reference
    }

    string getInstructorName() const {
        // TODO: Navigate through enrolledCourse to get the instructor's name
        return "";
    }

    string getName() const { return name; }
};

void Instructor::addCourse(Course* course) {
    // TODO: Add course to list and set this as the course's instructor
}

void Course::enrollStudent(Student* student) {
    // TODO: Add student to list and set this as the student's enrolled course
}

int main() {
    Instructor alice("Alice");
    Course dsa("Data Structures");
    Course sysDesign("System Design");

    alice.addCourse(&dsa);
    alice.addCourse(&sysDesign);

    Student bob("Bob");
    Student charlie("Charlie");

    dsa.enrollStudent(&bob);
    dsa.enrollStudent(&charlie);
    sysDesign.enrollStudent(&charlie);

    cout << alice.getName() << "'s courses:" << endl;
    for (auto* c : alice.getCourses())
        cout << "  - " << c->getTitle() << endl;

    cout << "Students in " << dsa.getTitle() << ":" << endl;
    for (auto* s : dsa.getStudents())
        cout << "  - " << s->getName() << endl;

    cout << bob.getName() << "'s instructor: " << bob.getInstructorName() << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Instructor struct {
	name    string
	courses []*Course
}

func NewInstructor(name string) *Instructor {
	return &Instructor{
		name:    name,
		courses: []*Course{},
	}
}

func (i *Instructor) AddCourse(course *Course) {
	// TODO: Add course to list and set this as the course's instructor
}

func (i *Instructor) GetName() string {
	return i.name
}

func (i *Instructor) GetCourses() []*Course {
	return i.courses
}

type Course struct {
	title      string
	instructor *Instructor
	students   []*Student
}

func NewCourse(title string) *Course {
	return &Course{
		title:    title,
		students: []*Student{},
	}
}

func (c *Course) SetInstructor(instructor *Instructor) {
	// TODO: Set the instructor reference
}

func (c *Course) EnrollStudent(student *Student) {
	// TODO: Add student to list and set this as the student's enrolled course
}

func (c *Course) GetTitle() string {
	return c.title
}

func (c *Course) GetInstructor() *Instructor {
	return c.instructor
}

func (c *Course) GetStudents() []*Student {
	return c.students
}

type Student struct {
	name           string
	enrolledCourse *Course
}

func NewStudent(name string) *Student {
	return &Student{name: name}
}

func (s *Student) SetEnrolledCourse(course *Course) {
	// TODO: Set the enrolled course reference
}

func (s *Student) GetInstructorName() string {
	// TODO: Navigate through enrolledCourse to get the instructor's name
	// Return "No instructor" if course or instructor is nil
	return ""
}

func (s *Student) GetName() string {
	return s.name
}

func (s *Student) GetEnrolledCourse() *Course {
	return s.enrolledCourse
}

func main() {
	alice := NewInstructor("Alice")
	dsa := NewCourse("Data Structures")
	sysDesign := NewCourse("System Design")

	alice.AddCourse(dsa)
	alice.AddCourse(sysDesign)

	bob := NewStudent("Bob")
	charlie := NewStudent("Charlie")

	dsa.EnrollStudent(bob)
	dsa.EnrollStudent(charlie)
	sysDesign.EnrollStudent(charlie)

	fmt.Println(alice.GetName() + "'s courses:")
	for _, c := range alice.GetCourses() {
		fmt.Println("  - " + c.GetTitle())
	}

	fmt.Println("Students in " + dsa.GetTitle() + ":")
	for _, s := range dsa.GetStudents() {
		fmt.Println("  - " + s.GetName())
	}

	fmt.Println(bob.GetName() + "'s instructor: " + bob.GetInstructorName())
}
```

```csharp
using System;
using System.Collections.Generic;

class Instructor {
    public string Name { get; }
    private List<Course> courses = new List<Course>();

    public Instructor(string name) { Name = name; }

    public void AddCourse(Course course) {
        // TODO: Add course to list and set this as the course's instructor
    }

    public List<Course> GetCourses() { return courses; }
}

class Course {
    public string Title { get; }
    public Instructor Instructor { get; private set; }
    private List<Student> students = new List<Student>();

    public Course(string title) { Title = title; }

    public void SetInstructor(Instructor instructor) {
        // TODO: Set the instructor reference
    }

    public void EnrollStudent(Student student) {
        // TODO: Add student to list and set this as the student's enrolled course
    }

    public List<Student> GetStudents() { return students; }
}

class Student {
    public string Name { get; }
    public Course EnrolledCourse { get; private set; }

    public Student(string name) { Name = name; }

    public void SetEnrolledCourse(Course course) {
        // TODO: Set the enrolled course reference
    }

    public string GetInstructorName() {
        // TODO: Navigate through EnrolledCourse to get the instructor's name
        return "";
    }
}

class Program {
    static void Main() {
        var alice = new Instructor("Alice");
        var dsa = new Course("Data Structures");
        var sysDesign = new Course("System Design");

        alice.AddCourse(dsa);
        alice.AddCourse(sysDesign);

        var bob = new Student("Bob");
        var charlie = new Student("Charlie");

        dsa.EnrollStudent(bob);
        dsa.EnrollStudent(charlie);
        sysDesign.EnrollStudent(charlie);

        Console.WriteLine($"{alice.Name}'s courses:");
        foreach (var c in alice.GetCourses())
            Console.WriteLine($"  - {c.Title}");

        Console.WriteLine($"Students in {dsa.Title}:");
        foreach (var s in dsa.GetStudents())
            Console.WriteLine($"  - {s.Name}");

        Console.WriteLine($"{bob.Name}'s instructor: {bob.GetInstructorName()}");
    }
}
```

```typescript
class Instructor {
    private name: string;
    private courses: Course[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addCourse(course: Course): void {
        // TODO: Add course to list and set this as the course's instructor
    }

    getName(): string { return this.name; }
    getCourses(): Course[] { return this.courses; }
}

class Course {
    private title: string;
    private instructor": Instructor;
    private students: Student[] = [];

    constructor(title: string) {
        this.title = title;
    }

    setInstructor(instructor: Instructor): void {
        // TODO: Set the instructor reference
    }

    enrollStudent(student: Student): void {
        // TODO: Add student to list and set this as the student's enrolled course
    }

    getTitle(): string { return this.title; }
    getInstructor(): Instructor | undefined { return this.instructor; }
    getStudents(): Student[] { return this.students; }
}

class Student {
    private name: string;
    private enrolledCourse": Course;

    constructor(name: string) {
        this.name = name;
    }

    setEnrolledCourse(course: Course): void {
        // TODO: Set the enrolled course reference
    }

    getInstructorName(): string {
        // TODO: Navigate through enrolledCourse to get the instructor's name
        // Return "No instructor" if course or instructor is undefined
        return "";
    }

    getName(): string { return this.name; }
    getEnrolledCourse(): Course | undefined { return this.enrolledCourse; }
}

const alice = new Instructor("Alice");
const dsa = new Course("Data Structures");
const sysDesign = new Course("System Design");

alice.addCourse(dsa);
alice.addCourse(sysDesign);

const bob = new Student("Bob");
const charlie = new Student("Charlie");

dsa.enrollStudent(bob);
dsa.enrollStudent(charlie);
sysDesign.enrollStudent(charlie);

console.log(`${alice.getName()}'s courses:`);
for (const c of alice.getCourses())
    console.log(`  - ${c.getTitle()}`);

console.log(`Students in ${dsa.getTitle()}:`);
for (const s of dsa.getStudents())
    console.log(`  - ${s.getName()}`);

console.log(`${bob.getName()}'s instructor: ${bob.getInstructorName()}`);
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.List;

class Instructor {
    private String name;
    private List<Course> courses = new ArrayList<>();

    public Instructor(String name) {
        this.name = name;
    }

    public void addCourse(Course course) {
        courses.add(course);
        course.setInstructor(this);
    }

    public String getName() { return name; }
    public List<Course> getCourses() { return courses; }
}

class Course {
    private String title;
    private Instructor instructor;
    private List<Student> students = new ArrayList<>();

    public Course(String title) {
        this.title = title;
    }

    public void setInstructor(Instructor instructor) {
        this.instructor = instructor;
    }

    public void enrollStudent(Student student) {
        students.add(student);
        student.setEnrolledCourse(this);
    }

    public String getTitle() { return title; }
    public Instructor getInstructor() { return instructor; }
    public List<Student> getStudents() { return students; }
}

class Student {
    private String name;
    private Course enrolledCourse;

    public Student(String name) {
        this.name = name;
    }

    public void setEnrolledCourse(Course course) {
        this.enrolledCourse = course;
    }

    public String getInstructorName() {
        if (enrolledCourse != null && enrolledCourse.getInstructor() != null) {
            return enrolledCourse.getInstructor().getName();
        }
        return "No instructor";
    }

    public String getName() { return name; }
    public Course getEnrolledCourse() { return enrolledCourse; }
}

public class Main {
    public static void main(String[] args) {
        Instructor alice = new Instructor("Alice");
        Course dsa = new Course("Data Structures");
        Course sysDesign = new Course("System Design");

        alice.addCourse(dsa);
        alice.addCourse(sysDesign);

        Student bob = new Student("Bob");
        Student charlie = new Student("Charlie");

        dsa.enrollStudent(bob);
        dsa.enrollStudent(charlie);
        sysDesign.enrollStudent(charlie);

        System.out.println(alice.getName() + "'s courses:");
        for (Course c : alice.getCourses())
            System.out.println("  - " + c.getTitle());

        System.out.println("Students in " + dsa.getTitle() + ":");
        for (Student s : dsa.getStudents())
            System.out.println("  - " + s.getName());

        System.out.println(bob.getName() + "'s instructor: " + bob.getInstructorName());
    }
}
```

```python
class Instructor:
    def __init__(self, name: str):
        self.name = name
        self.courses = []

    def add_course(self, course):
        self.courses.append(course)
        course.set_instructor(self)

class Course:
    def __init__(self, title: str):
        self.title = title
        self.instructor = None
        self.students = []

    def set_instructor(self, instructor):
        self.instructor = instructor

    def enroll_student(self, student):
        self.students.append(student)
        student.set_enrolled_course(self)

class Student:
    def __init__(self, name: str):
        self.name = name
        self.enrolled_course = None

    def set_enrolled_course(self, course):
        self.enrolled_course = course

    def get_instructor_name(self) -> str:
        if self.enrolled_course and self.enrolled_course.instructor:
            return self.enrolled_course.instructor.name
        return "No instructor"

if __name__ == "__main__":
    alice = Instructor("Alice")
    dsa = Course("Data Structures")
    sys_design = Course("System Design")

    alice.add_course(dsa)
    alice.add_course(sys_design)

    bob = Student("Bob")
    charlie = Student("Charlie")

    dsa.enroll_student(bob)
    dsa.enroll_student(charlie)
    sys_design.enroll_student(charlie)

    print(f"{alice.name}'s courses:")
    for c in alice.courses:
        print(f"  - {c.title}")

    print(f"Students in {dsa.title}:")
    for s in dsa.students:
        print(f"  - {s.name}")

    print(f"{bob.name}'s instructor: {bob.get_instructor_name()}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Course;
class Student;

class Instructor {
private:
    string name;
    vector<Course*> courses;
public:
    Instructor(const string& name) : name(name) {}

    void addCourse(Course* course);

    string getName() const { return name; }
    vector<Course*> getCourses() const { return courses; }
};

class Course {
private:
    string title;
    Instructor* instructor = nullptr;
    vector<Student*> students;
public:
    Course(const string& title) : title(title) {}

    void setInstructor(Instructor* instr) {
        instructor = instr;
    }

    void enrollStudent(Student* student);

    string getTitle() const { return title; }
    Instructor* getInstructor() const { return instructor; }
    vector<Student*> getStudents() const { return students; }
};

class Student {
private:
    string name;
    Course* enrolledCourse = nullptr;
public:
    Student(const string& name) : name(name) {}

    void setEnrolledCourse(Course* course) {
        enrolledCourse = course;
    }

    string getInstructorName() const {
        if (enrolledCourse != nullptr && enrolledCourse->getInstructor() != nullptr) {
            return enrolledCourse->getInstructor()->getName();
        }
        return "No instructor";
    }

    string getName() const { return name; }
};

void Instructor::addCourse(Course* course) {
    courses.push_back(course);
    course->setInstructor(this);
}

void Course::enrollStudent(Student* student) {
    students.push_back(student);
    student->setEnrolledCourse(this);
}

int main() {
    Instructor alice("Alice");
    Course dsa("Data Structures");
    Course sysDesign("System Design");

    alice.addCourse(&dsa);
    alice.addCourse(&sysDesign);

    Student bob("Bob");
    Student charlie("Charlie");

    dsa.enrollStudent(&bob);
    dsa.enrollStudent(&charlie);
    sysDesign.enrollStudent(&charlie);

    cout << alice.getName() << "'s courses:" << endl;
    for (auto* c : alice.getCourses())
        cout << "  - " << c->getTitle() << endl;

    cout << "Students in " << dsa.getTitle() << ":" << endl;
    for (auto* s : dsa.getStudents())
        cout << "  - " << s->getName() << endl;

    cout << bob.getName() << "'s instructor: " << bob.getInstructorName() << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Instructor struct {
	name    string
	courses []*Course
}

func NewInstructor(name string) *Instructor {
	return &Instructor{name: name, courses: make([]*Course, 0)}
}

func (i *Instructor) AddCourse(course *Course) {
	i.courses = append(i.courses, course)
	course.SetInstructor(i)
}

func (i *Instructor) GetName() string {
	return i.name
}

func (i *Instructor) GetCourses() []*Course {
	return i.courses
}

type Course struct {
	title      string
	instructor *Instructor
	students   []*Student
}

func NewCourse(title string) *Course {
	return &Course{title: title, students: make([]*Student, 0)}
}

func (c *Course) SetInstructor(instructor *Instructor) {
	c.instructor = instructor
}

func (c *Course) EnrollStudent(student *Student) {
	c.students = append(c.students, student)
	student.SetEnrolledCourse(c)
}

func (c *Course) GetTitle() string {
	return c.title
}

func (c *Course) GetInstructor() *Instructor {
	return c.instructor
}

func (c *Course) GetStudents() []*Student {
	return c.students
}

type Student struct {
	name           string
	enrolledCourse *Course
}

func NewStudent(name string) *Student {
	return &Student{name: name}
}

func (s *Student) SetEnrolledCourse(course *Course) {
	s.enrolledCourse = course
}

func (s *Student) GetInstructorName() string {
	if s.enrolledCourse != nil && s.enrolledCourse.GetInstructor() != nil {
		return s.enrolledCourse.GetInstructor().GetName()
	}
	return "No instructor"
}

func (s *Student) GetName() string {
	return s.name
}

func (s *Student) GetEnrolledCourse() *Course {
	return s.enrolledCourse
}

func main() {
	alice := NewInstructor("Alice")
	dsa := NewCourse("Data Structures")
	sysDesign := NewCourse("System Design")

	alice.AddCourse(dsa)
	alice.AddCourse(sysDesign)

	bob := NewStudent("Bob")
	charlie := NewStudent("Charlie")

	dsa.EnrollStudent(bob)
	dsa.EnrollStudent(charlie)
	sysDesign.EnrollStudent(charlie)

	fmt.Printf("%s's courses:\n", alice.GetName())
	for _, c := range alice.GetCourses() {
		fmt.Printf("  - %s\n", c.GetTitle())
	}

	fmt.Printf("Students in %s:\n", dsa.GetTitle())
	for _, s := range dsa.GetStudents() {
		fmt.Printf("  - %s\n", s.GetName())
	}

	fmt.Printf("%s's instructor: %s\n", bob.GetName(), bob.GetInstructorName())
}
```

```csharp
using System;
using System.Collections.Generic;

class Instructor {
    public string Name { get; }
    private List<Course> courses = new List<Course>();

    public Instructor(string name) { Name = name; }

    public void AddCourse(Course course) {
        courses.Add(course);
        course.SetInstructor(this);
    }

    public List<Course> GetCourses() { return courses; }
}

class Course {
    public string Title { get; }
    public Instructor Instructor { get; private set; }
    private List<Student> students = new List<Student>();

    public Course(string title) { Title = title; }

    public void SetInstructor(Instructor instructor) {
        Instructor = instructor;
    }

    public void EnrollStudent(Student student) {
        students.Add(student);
        student.SetEnrolledCourse(this);
    }

    public List<Student> GetStudents() { return students; }
}

class Student {
    public string Name { get; }
    public Course EnrolledCourse { get; private set; }

    public Student(string name) { Name = name; }

    public void SetEnrolledCourse(Course course) {
        EnrolledCourse = course;
    }

    public string GetInstructorName() {
        if (EnrolledCourse != null && EnrolledCourse.Instructor != null) {
            return EnrolledCourse.Instructor.Name;
        }
        return "No instructor";
    }
}

class Program {
    static void Main() {
        var alice = new Instructor("Alice");
        var dsa = new Course("Data Structures");
        var sysDesign = new Course("System Design");

        alice.AddCourse(dsa);
        alice.AddCourse(sysDesign);

        var bob = new Student("Bob");
        var charlie = new Student("Charlie");

        dsa.EnrollStudent(bob);
        dsa.EnrollStudent(charlie);
        sysDesign.EnrollStudent(charlie);

        Console.WriteLine($"{alice.Name}'s courses:");
        foreach (var c in alice.GetCourses())
            Console.WriteLine($"  - {c.Title}");

        Console.WriteLine($"Students in {dsa.Title}:");
        foreach (var s in dsa.GetStudents())
            Console.WriteLine($"  - {s.Name}");

        Console.WriteLine($"{bob.Name}'s instructor: {bob.GetInstructorName()}");
    }
}
```

```typescript
class Instructor {
    private name: string;
    private courses: Course[] = [];

    constructor(name: string) {
        this.name = name;
    }

    addCourse(course: Course): void {
        this.courses.push(course);
        course.setInstructor(this);
    }

    getName(): string { return this.name; }
    getCourses(): Course[] { return this.courses; }
}

class Course {
    private title: string;
    private instructor": Instructor;
    private students: Student[] = [];

    constructor(title: string) {
        this.title = title;
    }

    setInstructor(instructor: Instructor): void {
        this.instructor = instructor;
    }

    enrollStudent(student: Student): void {
        this.students.push(student);
        student.setEnrolledCourse(this);
    }

    getTitle(): string { return this.title; }
    getInstructor(): Instructor | undefined { return this.instructor; }
    getStudents(): Student[] { return this.students; }
}

class Student {
    private name: string;
    private enrolledCourse": Course;

    constructor(name: string) {
        this.name = name;
    }

    setEnrolledCourse(course: Course): void {
        this.enrolledCourse = course;
    }

    getInstructorName(): string {
        if (this.enrolledCourse && this.enrolledCourse.getInstructor()) {
            return this.enrolledCourse.getInstructor()!.getName();
        }
        return "No instructor";
    }

    getName(): string { return this.name; }
    getEnrolledCourse(): Course | undefined { return this.enrolledCourse; }
}

const alice = new Instructor("Alice");
const dsa = new Course("Data Structures");
const sysDesign = new Course("System Design");

alice.addCourse(dsa);
alice.addCourse(sysDesign);

const bob = new Student("Bob");
const charlie = new Student("Charlie");

dsa.enrollStudent(bob);
dsa.enrollStudent(charlie);
sysDesign.enrollStudent(charlie);

console.log(`${alice.getName()}'s courses:`);
for (const c of alice.getCourses())
    console.log(`  - ${c.getTitle()}`);

console.log(`Students in ${dsa.getTitle()}:`);
for (const s of dsa.getStudents())
    console.log(`  - ${s.getName()}`);

console.log(`${bob.getName()}'s instructor: ${bob.getInstructorName()}`);
```

---

# Exercise 2: Social Network

**Problem:** Build a social network where users can follow each other and send messages. This exercise practices bidirectional and many-to-many associations with synchronization guards.

**Requirements:**

- `User` with a name, a `followers` list, a `following` list, and a `messages` list of `Message` objects.
- `follow(user)` method that adds the target to `following` *and* adds `this` to the target's `followers`. Include a duplicate guard to prevent infinite recursion and self-follows.
- `Message` with an `author` (`User` reference), `content` string, and `timestamp` string. The author's messages list is updated on creation.
- `sendMessage(content, timestamp)` that creates a `Message` and adds it to the user's messages list.

```java
import java.util.ArrayList;
import java.util.List;

class Message {
    private User author;
    private String content;
    private String timestamp;

    public Message(User author, String content, String timestamp) {
        // TODO: Initialize fields
    }

    public User getAuthor() { return author; }
    public String getContent() { return content; }
    public String getTimestamp() { return timestamp; }
}

class User {
    private String name;
    private List<User> followers = new ArrayList<>();
    private List<User> following = new ArrayList<>();
    private List<Message> messages = new ArrayList<>();

    public User(String name) {
        this.name = name;
    }

    public void follow(User user) {
        // TODO: Add user to following, add this to user's followers
        // Guard against: self-follows, duplicates
    }

    public void sendMessage(String content, String timestamp) {
        // TODO: Create Message and add to messages list
    }

    public String getName() { return name; }
    public List<User> getFollowers() { return followers; }
    public List<User> getFollowing() { return following; }
    public List<Message> getMessages() { return messages; }
}

public class Main {
    public static void main(String[] args) {
        User alice = new User("Alice");
        User bob = new User("Bob");
        User charlie = new User("Charlie");

        alice.follow(bob);
        alice.follow(charlie);
        bob.follow(alice);

        alice.sendMessage("Hello world!", "10:00 AM");
        bob.sendMessage("Learning OOP!", "10:30 AM");

        System.out.println(alice.getName() + " is following:");
        for (User u : alice.getFollowing())
            System.out.println("  - " + u.getName());

        System.out.println(bob.getName() + "'s followers:");
        for (User u : bob.getFollowers())
            System.out.println("  - " + u.getName());

        System.out.println(alice.getName() + "'s messages:");
        for (Message m : alice.getMessages())
            System.out.println("  [" + m.getTimestamp() + "] " + m.getContent());
    }
}
```

```python
class Message:
    def __init__(self, author, content: str, timestamp: str):
        # TODO: Initialize fields
        pass

class User:
    def __init__(self, name: str):
        self.name = name
        self.followers = []
        self.following = []
        self.messages = []

    def follow(self, user):
        # TODO: Add user to following, add self to user's followers
        # Guard against: self-follows, duplicates
        pass

    def send_message(self, content: str, timestamp: str):
        # TODO: Create Message and add to messages list
        pass

if __name__ == "__main__":
    alice = User("Alice")
    bob = User("Bob")
    charlie = User("Charlie")

    alice.follow(bob)
    alice.follow(charlie)
    bob.follow(alice)

    alice.send_message("Hello world!", "10:00 AM")
    bob.send_message("Learning OOP!", "10:30 AM")

    print(f"{alice.name} is following:")
    for u in alice.following:
        print(f"  - {u.name}")

    print(f"{bob.name}'s followers:")
    for u in bob.followers:
        print(f"  - {u.name}")

    print(f"{alice.name}'s messages:")
    for m in alice.messages:
        print(f"  [{m.timestamp}] {m.content}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class User;

class Message {
private:
    User* author;
    string content;
    string timestamp;
public:
    Message(User* author, const string& content, const string& timestamp) {
        // TODO: Initialize fields
    }

    User* getAuthor() const { return author; }
    string getContent() const { return content; }
    string getTimestamp() const { return timestamp; }
};

class User {
private:
    string name;
    vector<User*> followers;
    vector<User*> following;
    vector<Message*> messages;
public:
    User(const string& name) : name(name) {}

    void follow(User* user) {
        // TODO: Add user to following, add this to user's followers
        // Guard against: self-follows, duplicates
    }

    void sendMessage(const string& content, const string& timestamp) {
        // TODO: Create Message and add to messages list
    }

    string getName() const { return name; }
    vector<User*> getFollowers() const { return followers; }
    vector<User*> getFollowing() const { return following; }
    vector<Message*> getMessages() const { return messages; }
};

int main() {
    User alice("Alice");
    User bob("Bob");
    User charlie("Charlie");

    alice.follow(&bob);
    alice.follow(&charlie);
    bob.follow(&alice);

    alice.sendMessage("Hello world!", "10:00 AM");
    bob.sendMessage("Learning OOP!", "10:30 AM");

    cout << alice.getName() << " is following:" << endl;
    for (auto* u : alice.getFollowing())
        cout << "  - " << u->getName() << endl;

    cout << bob.getName() << "'s followers:" << endl;
    for (auto* u : bob.getFollowers())
        cout << "  - " << u->getName() << endl;

    cout << alice.getName() << "'s messages:" << endl;
    for (auto* m : alice.getMessages())
        cout << "  [" << m->getTimestamp() << "] " << m->getContent() << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Message struct {
	author    *User
	content   string
	timestamp string
}

func NewMessage(author *User, content string, timestamp string) *Message {
	// TODO: Initialize fields
	return &Message{}
}

func (m *Message) GetAuthor() *User {
	return m.author
}

func (m *Message) GetContent() string {
	return m.content
}

func (m *Message) GetTimestamp() string {
	return m.timestamp
}

type User struct {
	name      string
	followers []*User
	following []*User
	messages  []*Message
}

func NewUser(name string) *User {
	return &User{name: name}
}

func (u *User) Follow(user *User) {
	// TODO: Add user to following, add this to user's followers
	// Guard against: self-follows, duplicates
}

func (u *User) SendMessage(content string, timestamp string) {
	// TODO: Create Message and add to messages list
}

func (u *User) GetName() string {
	return u.name
}

func (u *User) GetFollowers() []*User {
	return u.followers
}

func (u *User) GetFollowing() []*User {
	return u.following
}

func (u *User) GetMessages() []*Message {
	return u.messages
}

func main() {
	alice := NewUser("Alice")
	bob := NewUser("Bob")
	charlie := NewUser("Charlie")

	alice.Follow(bob)
	alice.Follow(charlie)
	bob.Follow(alice)

	alice.SendMessage("Hello world!", "10:00 AM")
	bob.SendMessage("Learning OOP!", "10:30 AM")

	fmt.Printf("%s is following:\n", alice.GetName())
	for _, u := range alice.GetFollowing() {
		fmt.Printf("  - %s\n", u.GetName())
	}

	fmt.Printf("%s's followers:\n", bob.GetName())
	for _, u := range bob.GetFollowers() {
		fmt.Printf("  - %s\n", u.GetName())
	}

	fmt.Printf("%s's messages:\n", alice.GetName())
	for _, m := range alice.GetMessages() {
		fmt.Printf("  [%s] %s\n", m.GetTimestamp(), m.GetContent())
	}
}
```

```csharp
using System;
using System.Collections.Generic;

class Message {
    public User Author { get; }
    public string Content { get; }
    public string Timestamp { get; }

    public Message(User author, string content, string timestamp) {
        // TODO: Initialize properties
    }
}

class User {
    public string Name { get; }
    private List<User> followers = new List<User>();
    private List<User> following = new List<User>();
    private List<Message> messages = new List<Message>();

    public User(string name) { Name = name; }

    public void Follow(User user) {
        // TODO: Add user to following, add this to user's followers
        // Guard against: self-follows, duplicates
    }

    public void SendMessage(string content, string timestamp) {
        // TODO: Create Message and add to messages list
    }

    public List<User> GetFollowers() { return followers; }
    public List<User> GetFollowing() { return following; }
    public List<Message> GetMessages() { return messages; }
}

class Program {
    static void Main() {
        var alice = new User("Alice");
        var bob = new User("Bob");
        var charlie = new User("Charlie");

        alice.Follow(bob);
        alice.Follow(charlie);
        bob.Follow(alice);

        alice.SendMessage("Hello world!", "10:00 AM");
        bob.SendMessage("Learning OOP!", "10:30 AM");

        Console.WriteLine($"{alice.Name} is following:");
        foreach (var u in alice.GetFollowing())
            Console.WriteLine($"  - {u.Name}");

        Console.WriteLine($"{bob.Name}'s followers:");
        foreach (var u in bob.GetFollowers())
            Console.WriteLine($"  - {u.Name}");

        Console.WriteLine($"{alice.Name}'s messages:");
        foreach (var m in alice.GetMessages())
            Console.WriteLine($"  [{m.Timestamp}] {m.Content}");
    }
}
```

```typescript
class Message {
    private author: User;
    private content: string;
    private timestamp: string;

    constructor(author: User, content: string, timestamp: string) {
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
    }

    getAuthor(): User { return this.author; }
    getContent(): string { return this.content; }
    getTimestamp(): string { return this.timestamp; }
}

class User {
    private name: string;
    private followers: User[] = [];
    private following: User[] = [];
    private messages: Message[] = [];

    constructor(name: string) {
        this.name = name;
    }

    follow(user: User): void {
        // TODO: Add user to following, add this to user's followers
        // Guard against: self-follows, duplicates
    }

    sendMessage(content: string, timestamp: string): void {
        // TODO: Create Message and add to messages list
    }

    getName(): string { return this.name; }
    getFollowers(): User[] { return this.followers; }
    getFollowing(): User[] { return this.following; }
    getMessages(): Message[] { return this.messages; }
}

const alice = new User("Alice");
const bob = new User("Bob");
const charlie = new User("Charlie");

alice.follow(bob);
alice.follow(charlie);
bob.follow(alice);

alice.sendMessage("Hello world!", "10:00 AM");
bob.sendMessage("Learning OOP!", "10:30 AM");

console.log(`${alice.getName()} is following:`);
for (const u of alice.getFollowing())
    console.log(`  - ${u.getName()}`);

console.log(`${bob.getName()}'s followers:`);
for (const u of bob.getFollowers())
    console.log(`  - ${u.getName()}`);

console.log(`${alice.getName()}'s messages:`);
for (const m of alice.getMessages())
    console.log(`  [${m.getTimestamp()}] ${m.getContent()}`);
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.List;

class Message {
    private User author;
    private String content;
    private String timestamp;

    public Message(User author, String content, String timestamp) {
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
    }

    public User getAuthor() { return author; }
    public String getContent() { return content; }
    public String getTimestamp() { return timestamp; }
}

class User {
    private String name;
    private List<User> followers = new ArrayList<>();
    private List<User> following = new ArrayList<>();
    private List<Message> messages = new ArrayList<>();

    public User(String name) {
        this.name = name;
    }

    public void follow(User user) {
        if (user == this) return;
        if (following.contains(user)) return;
        following.add(user);
        user.followers.add(this);
    }

    public void sendMessage(String content, String timestamp) {
        Message message = new Message(this, content, timestamp);
        messages.add(message);
    }

    public String getName() { return name; }
    public List<User> getFollowers() { return followers; }
    public List<User> getFollowing() { return following; }
    public List<Message> getMessages() { return messages; }
}

public class Main {
    public static void main(String[] args) {
        User alice = new User("Alice");
        User bob = new User("Bob");
        User charlie = new User("Charlie");

        alice.follow(bob);
        alice.follow(charlie);
        bob.follow(alice);

        alice.sendMessage("Hello world!", "10:00 AM");
        bob.sendMessage("Learning OOP!", "10:30 AM");

        System.out.println(alice.getName() + " is following:");
        for (User u : alice.getFollowing())
            System.out.println("  - " + u.getName());

        System.out.println(bob.getName() + "'s followers:");
        for (User u : bob.getFollowers())
            System.out.println("  - " + u.getName());

        System.out.println(alice.getName() + "'s messages:");
        for (Message m : alice.getMessages())
            System.out.println("  [" + m.getTimestamp() + "] " + m.getContent());
    }
}
```

```python
class Message:
    def __init__(self, author, content: str, timestamp: str):
        self.author = author
        self.content = content
        self.timestamp = timestamp

class User:
    def __init__(self, name: str):
        self.name = name
        self.followers = []
        self.following = []
        self.messages = []

    def follow(self, user):
        if user is self:
            return
        if user in self.following:
            return
        self.following.append(user)
        user.followers.append(self)

    def send_message(self, content: str, timestamp: str):
        message = Message(self, content, timestamp)
        self.messages.append(message)

if __name__ == "__main__":
    alice = User("Alice")
    bob = User("Bob")
    charlie = User("Charlie")

    alice.follow(bob)
    alice.follow(charlie)
    bob.follow(alice)

    alice.send_message("Hello world!", "10:00 AM")
    bob.send_message("Learning OOP!", "10:30 AM")

    print(f"{alice.name} is following:")
    for u in alice.following:
        print(f"  - {u.name}")

    print(f"{bob.name}'s followers:")
    for u in bob.followers:
        print(f"  - {u.name}")

    print(f"{alice.name}'s messages:")
    for m in alice.messages:
        print(f"  [{m.timestamp}] {m.content}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class User;

class Message {
private:
    User* author;
    string content;
    string timestamp;
public:
    Message(User* author, const string& content, const string& timestamp) {
        this->author = author;
        this->content = content;
        this->timestamp = timestamp;
    }

    User* getAuthor() const { return author; }
    string getContent() const { return content; }
    string getTimestamp() const { return timestamp; }
};

class User {
private:
    string name;
    vector<User*> followers;
    vector<User*> following;
    vector<Message*> messages;

    bool contains(const vector<User*>& list, User* user) {
        for (auto* u : list) {
            if (u == user) return true;
        }
        return false;
    }

public:
    User(const string& name) : name(name) {}

    void follow(User* user) {
        if (user == this) return;
        if (contains(following, user)) return;
        following.push_back(user);
        user->followers.push_back(this);
    }

    void sendMessage(const string& content, const string& timestamp) {
        messages.push_back(new Message(this, content, timestamp));
    }

    string getName() const { return name; }
    vector<User*> getFollowers() const { return followers; }
    vector<User*> getFollowing() const { return following; }
    vector<Message*> getMessages() const { return messages; }
};

int main() {
    User alice("Alice");
    User bob("Bob");
    User charlie("Charlie");

    alice.follow(&bob);
    alice.follow(&charlie);
    bob.follow(&alice);

    alice.sendMessage("Hello world!", "10:00 AM");
    bob.sendMessage("Learning OOP!", "10:30 AM");

    cout << alice.getName() << " is following:" << endl;
    for (auto* u : alice.getFollowing())
        cout << "  - " << u->getName() << endl;

    cout << bob.getName() << "'s followers:" << endl;
    for (auto* u : bob.getFollowers())
        cout << "  - " << u->getName() << endl;

    cout << alice.getName() << "'s messages:" << endl;
    for (auto* m : alice.getMessages())
        cout << "  [" << m->getTimestamp() << "] " << m->getContent() << endl;

    return 0;
}
```

```go
package main

import "fmt"

type Message struct {
	author    *User
	content   string
	timestamp string
}

func NewMessage(author *User, content, timestamp string) *Message {
	return &Message{
		author:    author,
		content:   content,
		timestamp: timestamp,
	}
}

func (m *Message) GetAuthor() *User {
	return m.author
}

func (m *Message) GetContent() string {
	return m.content
}

func (m *Message) GetTimestamp() string {
	return m.timestamp
}

type User struct {
	name      string
	followers []*User
	following []*User
	messages  []*Message
}

func NewUser(name string) *User {
	return &User{
		name:      name,
		followers: []*User{},
		following: []*User{},
		messages:  []*Message{},
	}
}

func containsUser(list []*User, user *User) bool {
	for _, u := range list {
		if u == user {
			return true
		}
	}
	return false
}

func (u *User) Follow(user *User) {
	if user == u {
		return
	}
	if containsUser(u.following, user) {
		return
	}
	u.following = append(u.following, user)
	user.followers = append(user.followers, u)
}

func (u *User) SendMessage(content, timestamp string) {
	message := NewMessage(u, content, timestamp)
	u.messages = append(u.messages, message)
}

func (u *User) GetName() string {
	return u.name
}

func (u *User) GetFollowers() []*User {
	return u.followers
}

func (u *User) GetFollowing() []*User {
	return u.following
}

func (u *User) GetMessages() []*Message {
	return u.messages
}

func main() {
	alice := NewUser("Alice")
	bob := NewUser("Bob")
	charlie := NewUser("Charlie")

	alice.Follow(bob)
	alice.Follow(charlie)
	bob.Follow(alice)

	alice.SendMessage("Hello world!", "10:00 AM")
	bob.SendMessage("Learning OOP!", "10:30 AM")

	fmt.Printf("%s is following:\n", alice.GetName())
	for _, u := range alice.GetFollowing() {
		fmt.Printf("  - %s\n", u.GetName())
	}

	fmt.Printf("%s's followers:\n", bob.GetName())
	for _, u := range bob.GetFollowers() {
		fmt.Printf("  - %s\n", u.GetName())
	}

	fmt.Printf("%s's messages:\n", alice.GetName())
	for _, m := range alice.GetMessages() {
		fmt.Printf("  [%s] %s\n", m.GetTimestamp(), m.GetContent())
	}
}
```

```csharp
using System;
using System.Collections.Generic;

class Message {
    public User Author { get; }
    public string Content { get; }
    public string Timestamp { get; }

    public Message(User author, string content, string timestamp) {
        Author = author;
        Content = content;
        Timestamp = timestamp;
    }
}

class User {
    public string Name { get; }
    private List<User> followers = new List<User>();
    private List<User> following = new List<User>();
    private List<Message> messages = new List<Message>();

    public User(string name) { Name = name; }

    public void Follow(User user) {
        if (user == this) return;
        if (following.Contains(user)) return;
        following.Add(user);
        user.followers.Add(this);
    }

    public void SendMessage(string content, string timestamp) {
        var message = new Message(this, content, timestamp);
        messages.Add(message);
    }

    public List<User> GetFollowers() { return followers; }
    public List<User> GetFollowing() { return following; }
    public List<Message> GetMessages() { return messages; }
}

class Program {
    static void Main() {
        var alice = new User("Alice");
        var bob = new User("Bob");
        var charlie = new User("Charlie");

        alice.Follow(bob);
        alice.Follow(charlie);
        bob.Follow(alice);

        alice.SendMessage("Hello world!", "10:00 AM");
        bob.SendMessage("Learning OOP!", "10:30 AM");

        Console.WriteLine($"{alice.Name} is following:");
        foreach (var u in alice.GetFollowing())
            Console.WriteLine($"  - {u.Name}");

        Console.WriteLine($"{bob.Name}'s followers:");
        foreach (var u in bob.GetFollowers())
            Console.WriteLine($"  - {u.Name}");

        Console.WriteLine($"{alice.Name}'s messages:");
        foreach (var m in alice.GetMessages())
            Console.WriteLine($"  [{m.Timestamp}] {m.Content}");
    }
}
```

```typescript
class Message {
    private author: User;
    private content: string;
    private timestamp: string;

    constructor(author: User, content: string, timestamp: string) {
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
    }

    getAuthor(): User { return this.author; }
    getContent(): string { return this.content; }
    getTimestamp(): string { return this.timestamp; }
}

class User {
    private name: string;
    private followers: User[] = [];
    private following: User[] = [];
    private messages: Message[] = [];

    constructor(name: string) {
        this.name = name;
    }

    follow(user: User): void {
        if (user === this) return;
        if (this.following.includes(user)) return;
        this.following.push(user);
        user.followers.push(this);
    }

    sendMessage(content: string, timestamp: string): void {
        const message = new Message(this, content, timestamp);
        this.messages.push(message);
    }

    getName(): string { return this.name; }
    getFollowers(): User[] { return this.followers; }
    getFollowing(): User[] { return this.following; }
    getMessages(): Message[] { return this.messages; }
}

const alice = new User("Alice");
const bob = new User("Bob");
const charlie = new User("Charlie");

alice.follow(bob);
alice.follow(charlie);
bob.follow(alice);

alice.sendMessage("Hello world!", "10:00 AM");
bob.sendMessage("Learning OOP!", "10:30 AM");

console.log(`${alice.getName()} is following:`);
for (const u of alice.getFollowing())
    console.log(`  - ${u.getName()}`);

console.log(`${bob.getName()}'s followers:`);
for (const u of bob.getFollowers())
    console.log(`  - ${u.getName()}`);

console.log(`${alice.getName()}'s messages:`);
for (const m of alice.getMessages())
    console.log(`  [${m.getTimestamp()}] ${m.getContent()}`);
```


