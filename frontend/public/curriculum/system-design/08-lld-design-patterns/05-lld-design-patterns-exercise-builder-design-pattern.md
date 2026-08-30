---
id: "lld-design-patterns-exercise-builder-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Builder Design Pattern"
slug: "lld-design-patterns-exercise-builder-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Builder Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Builder Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: EmailBuilder

**Problem:** Implement a Builder for an `Email` class. An email requires a recipient (`to`) and subject, but everything else is optional.

**Requirements:**

- `to(String)` - required (pass in Builder constructor)
- `subject(String)` - required (pass in Builder constructor)
- `cc(String)` - optional, can be called multiple times to add multiple CC recipients
- `bcc(String)` - optional, can be called multiple times
- `body(String)` - optional
- `priority(String)` - optional, defaults to "normal"
- `attachment(String)` - optional, can be called multiple times
- `toString()` should display all set fields

```java
import java.util.ArrayList;
import java.util.List;

class Email {
    private final String to;
    private final String subject;
    private final List<String> cc;
    private final List<String> bcc;
    private final String body;
    private final String priority;
    private final List<String> attachments;

    private Email(Builder builder) {
        this.to = builder.to;
        this.subject = builder.subject;
        this.cc = builder.cc;
        this.bcc = builder.bcc;
        this.body = builder.body;
        this.priority = builder.priority;
        this.attachments = builder.attachments;
    }

    @Override
    public String toString() {
        // TODO: Return formatted string showing all fields
        // Expected format: Email{to='...', subject='...', cc=[...], bcc=[...], body='...', priority='...', attachments=[...]}
        return "Email{}";
    }

    public static class Builder {
        private final String to;
        private final String subject;
        private List<String> cc = new ArrayList<>();
        private List<String> bcc = new ArrayList<>();
        private String body;
        private String priority = "normal";
        private List<String> attachments = new ArrayList<>();

        public Builder(String to, String subject) {
            this.to = to;
            this.subject = subject;
        }

        public Builder cc(String cc) {
            // TODO: Add cc to the cc list
            return this;
        }

        public Builder bcc(String bcc) {
            // TODO: Add bcc to the bcc list
            return this;
        }

        public Builder body(String body) {
            // TODO: Set the body field
            return this;
        }

        public Builder priority(String priority) {
            // TODO: Set the priority field
            return this;
        }

        public Builder attachment(String attachment) {
            // TODO: Add attachment to the attachments list
            return this;
        }

        public Email build() {
            return new Email(this);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Email email1 = new Email.Builder("alice@example.com", "Meeting Tomorrow")
                .body("Let's meet at 10am in conference room B.")
                .build();

        Email email2 = new Email.Builder("bob@example.com", "Project Update")
                .cc("carol@example.com")
                .cc("dave@example.com")
                .bcc("manager@example.com")
                .body("Attached is the Q4 report.")
                .priority("high")
                .attachment("q4-report.pdf")
                .attachment("summary.xlsx")
                .build();

        System.out.println(email1);
        System.out.println();
        System.out.println(email2);
    }
}
```

```python
class Email:
    def __init__(self, builder):
        self.to = builder._to
        self.subject = builder._subject
        self.cc = list(builder._cc)
        self.bcc = list(builder._bcc)
        self.body = builder._body
        self.priority = builder._priority
        self.attachments = list(builder._attachments)

    def __str__(self):
        # TODO: Return formatted string showing all fields
        # Expected format: Email{to='...', subject='...', cc=[...], bcc=[...], body='...', priority='...', attachments=[...]}
        return "Email{}"

    class Builder:
        def __init__(self, to, subject):
            self._to = to
            self._subject = subject
            self._cc = []
            self._bcc = []
            self._body = None
            self._priority = "normal"
            self._attachments = []

        def cc(self, cc):
            # TODO: Append cc to the _cc list
            return self

        def bcc(self, bcc):
            # TODO: Append bcc to the _bcc list
            return self

        def body(self, body):
            # TODO: Set the _body field
            return self

        def priority(self, priority):
            # TODO: Set the _priority field
            return self

        def attachment(self, attachment):
            # TODO: Append attachment to the _attachments list
            return self

        def build(self):
            return Email(self)

if __name__ == "__main__":
    email1 = Email.Builder("alice@example.com", "Meeting Tomorrow") \
        .body("Let's meet at 10am in conference room B.") \
        .build()

    email2 = Email.Builder("bob@example.com", "Project Update") \
        .cc("carol@example.com") \
        .cc("dave@example.com") \
        .bcc("manager@example.com") \
        .body("Attached is the Q4 report.") \
        .priority("high") \
        .attachment("q4-report.pdf") \
        .attachment("summary.xlsx") \
        .build()

    print(email1)
    print()
    print(email2)
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Email {
    string to, subject, body, priority;
    vector<string> cc, bcc, attachments;

public:
    void print() const {
        // TODO: Print formatted string showing all fields
        // Expected format: Email{to='...', subject='...', cc=[...], bcc=[...], body='...', priority='...', attachments=[...]}
        // Hint: Write a helper lambda to join vector elements with ", "
        cout << "Email{}" << endl;
    }

    class Builder {
        string to, subject, body;
        string priority = "normal";
        vector<string> cc, bcc, attachments;

        friend class Email;

    public:
        Builder(const string& to, const string& subject) : to(to), subject(subject) {}

        Builder& addCc(const string& val) {
            // TODO: Add val to cc vector
            return *this;
        }

        Builder& addBcc(const string& val) {
            // TODO: Add val to bcc vector
            return *this;
        }

        Builder& setBody(const string& val) {
            // TODO: Set the body field
            return *this;
        }

        Builder& setPriority(const string& val) {
            // TODO: Set the priority field
            return *this;
        }

        Builder& addAttachment(const string& val) {
            // TODO: Add val to attachments vector
            return *this;
        }

        Email build() const {
            Email email;
            email.to = to;
            email.subject = subject;
            email.cc = cc;
            email.bcc = bcc;
            email.body = body;
            email.priority = priority;
            email.attachments = attachments;
            return email;
        }
    };
};

int main() {
    Email email1 = Email::Builder("alice@example.com", "Meeting Tomorrow")
            .setBody("Let's meet at 10am in conference room B.")
            .build();

    Email email2 = Email::Builder("bob@example.com", "Project Update")
            .addCc("carol@example.com")
            .addCc("dave@example.com")
            .addBcc("manager@example.com")
            .setBody("Attached is the Q4 report.")
            .setPriority("high")
            .addAttachment("q4-report.pdf")
            .addAttachment("summary.xlsx")
            .build();

    email1.print();
    cout << endl;
    email2.print();

    return 0;
}
```

```go
package main

import "fmt"

type Email struct {
	to          string
	subject     string
	cc          []string
	bcc         []string
	body        string
	priority    string
	attachments []string
}

func (e *Email) String() string {
	// TODO: Return formatted string showing all fields
	// Expected format: Email{to='...', subject='...', cc=[...], bcc=[...], body='...', priority='...', attachments=[...]}
	return "Email{}"
}

type EmailBuilder struct {
	to          string
	subject     string
	cc          []string
	bcc         []string
	body        string
	priority    string
	attachments []string
}

func NewEmailBuilder(to, subject string) *EmailBuilder {
	return &EmailBuilder{
		to:       to,
		subject:  subject,
		cc:       []string{},
		bcc:      []string{},
		body:     "",
		priority: "normal",
		attachments: []string{},
	}
}

func (b *EmailBuilder) CC(cc string) *EmailBuilder {
	// TODO: Add cc to the cc list
	return b
}

func (b *EmailBuilder) BCC(bcc string) *EmailBuilder {
	// TODO: Add bcc to the bcc list
	return b
}

func (b *EmailBuilder) Body(body string) *EmailBuilder {
	// TODO: Set the body field
	return b
}

func (b *EmailBuilder) Priority(priority string) *EmailBuilder {
	// TODO: Set the priority field
	return b
}

func (b *EmailBuilder) Attachment(attachment string) *EmailBuilder {
	// TODO: Add attachment to the attachments list
	return b
}

func (b *EmailBuilder) Build() *Email {
	return &Email{
		to:          b.to,
		subject:     b.subject,
		cc:          b.cc,
		bcc:         b.bcc,
		body:        b.body,
		priority:    b.priority,
		attachments: b.attachments,
	}
}

func main() {
	email1 := NewEmailBuilder("alice@example.com", "Meeting Tomorrow").
		Body("Let's meet at 10am in conference room B.").
		Build()

	email2 := NewEmailBuilder("bob@example.com", "Project Update").
		CC("carol@example.com").
		CC("dave@example.com").
		BCC("manager@example.com").
		Body("Attached is the Q4 report.").
		Priority("high").
		Attachment("q4-report.pdf").
		Attachment("summary.xlsx").
		Build()

	fmt.Println(email1)
	fmt.Println()
	fmt.Println(email2)
}
```

```csharp
using System;
using System.Collections.Generic;

class Email
{
    public string To { get; }
    public string Subject { get; }
    public List<string> Cc { get; }
    public List<string> Bcc { get; }
    public string Body { get; }
    public string Priority { get; }
    public List<string> Attachments { get; }

    private Email(Builder builder)
    {
        To = builder.To;
        Subject = builder.Subject;
        Cc = new List<string>(builder.CcList);
        Bcc = new List<string>(builder.BccList);
        Body = builder.BodyText;
        Priority = builder.PriorityText;
        Attachments = new List<string>(builder.AttachmentList);
    }

    public override string ToString()
    {
        // TODO: Return formatted string showing all fields
        // Expected format: Email{to='...', subject='...', cc=[...], bcc=[...], body='...', priority='...', attachments=[...]}
        return "Email{}";
    }

    public class Builder
    {
        internal string To;
        internal string Subject;
        internal List<string> CcList = new List<string>();
        internal List<string> BccList = new List<string>();
        internal string BodyText;
        internal string PriorityText = "normal";
        internal List<string> AttachmentList = new List<string>();

        public Builder(string to, string subject)
        {
            To = to;
            Subject = subject;
        }

        public Builder Cc(string cc)
        {
            // TODO: Add cc to CcList
            return this;
        }

        public Builder Bcc(string bcc)
        {
            // TODO: Add bcc to BccList
            return this;
        }

        public Builder SetBody(string body)
        {
            // TODO: Set the BodyText field
            return this;
        }

        public Builder SetPriority(string priority)
        {
            // TODO: Set the PriorityText field
            return this;
        }

        public Builder Attachment(string attachment)
        {
            // TODO: Add attachment to AttachmentList
            return this;
        }

        public Email Build()
        {
            return new Email(this);
        }
    }
}

class Program
{
    static void Main()
    {
        Email email1 = new Email.Builder("alice@example.com", "Meeting Tomorrow")
                .SetBody("Let's meet at 10am in conference room B.")
                .Build();

        Email email2 = new Email.Builder("bob@example.com", "Project Update")
                .Cc("carol@example.com")
                .Cc("dave@example.com")
                .Bcc("manager@example.com")
                .SetBody("Attached is the Q4 report.")
                .SetPriority("high")
                .Attachment("q4-report.pdf")
                .Attachment("summary.xlsx")
                .Build();

        Console.WriteLine(email1);
        Console.WriteLine();
        Console.WriteLine(email2);
    }
}
```

```typescript
class Email {
    readonly to: string;
    readonly subject: string;
    readonly cc: string[];
    readonly bcc: string[];
    readonly body: string;
    readonly priority: string;
    readonly attachments: string[];

    private constructor(builder: InstanceType<typeof Email.Builder>) {
        this.to = builder.toAddr;
        this.subject = builder.subjectText;
        this.cc = [...builder.ccList];
        this.bcc = [...builder.bccList];
        this.body = builder.bodyText;
        this.priority = builder.priorityText;
        this.attachments = [...builder.attachmentList];
    }

    toString(): string {
        // TODO: Return formatted string showing all fields
        // Expected format: Email{to='...', subject='...', cc=[...], bcc=[...], body='...', priority='...', attachments=[...]}
        return "Email{}";
    }

    static Builder = class {
        toAddr: string;
        subjectText: string;
        ccList: string[] = [];
        bccList: string[] = [];
        bodyText: string = "";
        priorityText: string = "normal";
        attachmentList: string[] = [];

        constructor(to: string, subject: string) {
            this.toAddr = to;
            this.subjectText = subject;
        }

        cc(cc: string): this {
            // TODO: Push cc to ccList
            return this;
        }

        bcc(bcc: string): this {
            // TODO: Push bcc to bccList
            return this;
        }

        setBody(body: string): this {
            // TODO: Set the bodyText field
            return this;
        }

        setPriority(priority: string): this {
            // TODO: Set the priorityText field
            return this;
        }

        attachment(attachment: string): this {
            // TODO: Push attachment to attachmentList
            return this;
        }

        build(): Email {
            return new Email(this);
        }
    };
}

const email1 = new Email.Builder("alice@example.com", "Meeting Tomorrow")
        .setBody("Let's meet at 10am in conference room B.")
        .build();

const email2 = new Email.Builder("bob@example.com", "Project Update")
        .cc("carol@example.com")
        .cc("dave@example.com")
        .bcc("manager@example.com")
        .setBody("Attached is the Q4 report.")
        .setPriority("high")
        .attachment("q4-report.pdf")
        .attachment("summary.xlsx")
        .build();

console.log(email1.toString());
console.log();
console.log(email2.toString());
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.List;

class Email {
    private final String to;
    private final String subject;
    private final List<String> cc;
    private final List<String> bcc;
    private final String body;
    private final String priority;
    private final List<String> attachments;

    private Email(Builder builder) {
        this.to = builder.to;
        this.subject = builder.subject;
        this.cc = builder.cc;
        this.bcc = builder.bcc;
        this.body = builder.body;
        this.priority = builder.priority;
        this.attachments = builder.attachments;
    }

    @Override
    public String toString() {
        return "Email{to='" + to + "', subject='" + subject + "', cc=" + cc + ", bcc=" + bcc + ", body='" + body + "', priority='" + priority + "', attachments=" + attachments + "}";
    }

    public static class Builder {
        private final String to;
        private final String subject;
        private List<String> cc = new ArrayList<>();
        private List<String> bcc = new ArrayList<>();
        private String body;
        private String priority = "normal";
        private List<String> attachments = new ArrayList<>();

        public Builder(String to, String subject) {
            this.to = to;
            this.subject = subject;
        }

        public Builder cc(String cc) {
            this.cc.add(cc);
            return this;
        }

        public Builder bcc(String bcc) {
            this.bcc.add(bcc);
            return this;
        }

        public Builder body(String body) {
            this.body = body;
            return this;
        }

        public Builder priority(String priority) {
            this.priority = priority;
            return this;
        }

        public Builder attachment(String attachment) {
            this.attachments.add(attachment);
            return this;
        }

        public Email build() {
            return new Email(this);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Email email1 = new Email.Builder("alice@example.com", "Meeting Tomorrow")
                .body("Let's meet at 10am in conference room B.")
                .build();

        Email email2 = new Email.Builder("bob@example.com", "Project Update")
                .cc("carol@example.com")
                .cc("dave@example.com")
                .bcc("manager@example.com")
                .body("Attached is the Q4 report.")
                .priority("high")
                .attachment("q4-report.pdf")
                .attachment("summary.xlsx")
                .build();

        System.out.println(email1);
        System.out.println();
        System.out.println(email2);
    }
}
```

```python
class Email:
    def __init__(self, builder):
        self.to = builder._to
        self.subject = builder._subject
        self.cc = list(builder._cc)
        self.bcc = list(builder._bcc)
        self.body = builder._body
        self.priority = builder._priority
        self.attachments = list(builder._attachments)

    def __str__(self):
        cc_str = "[" + ", ".join(self.cc) + "]"
        bcc_str = "[" + ", ".join(self.bcc) + "]"
        att_str = "[" + ", ".join(self.attachments) + "]"
        return f"Email{{to='{self.to}', subject='{self.subject}', cc={cc_str}, bcc={bcc_str}, body='{self.body}', priority='{self.priority}', attachments={att_str}}}"

    class Builder:
        def __init__(self, to, subject):
            self._to = to
            self._subject = subject
            self._cc = []
            self._bcc = []
            self._body = None
            self._priority = "normal"
            self._attachments = []

        def cc(self, cc):
            self._cc.append(cc)
            return self

        def bcc(self, bcc):
            self._bcc.append(bcc)
            return self

        def body(self, body):
            self._body = body
            return self

        def priority(self, priority):
            self._priority = priority
            return self

        def attachment(self, attachment):
            self._attachments.append(attachment)
            return self

        def build(self):
            return Email(self)

if __name__ == "__main__":
    email1 = Email.Builder("alice@example.com", "Meeting Tomorrow") \
        .body("Let's meet at 10am in conference room B.") \
        .build()

    email2 = Email.Builder("bob@example.com", "Project Update") \
        .cc("carol@example.com") \
        .cc("dave@example.com") \
        .bcc("manager@example.com") \
        .body("Attached is the Q4 report.") \
        .priority("high") \
        .attachment("q4-report.pdf") \
        .attachment("summary.xlsx") \
        .build()

    print(email1)
    print()
    print(email2)
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <sstream>
using namespace std;

class Email {
    string to, subject, body, priority;
    vector<string> cc, bcc, attachments;

public:
    void print() const {
        auto join = [](const vector<string>& v) {
            string result;
            for (size_t i = 0; i < v.size(); i++) {
                if (i > 0) result += ", ";
                result += v[i];
            }
            return result;
        };
        cout << "Email{to='" << to << "', subject='" << subject
             << "', cc=[" << join(cc) << "], bcc=[" << join(bcc)
             << "], body='" << body << "', priority='" << priority
             << "', attachments=[" << join(attachments) << "]}" << endl;
    }

    class Builder {
        string to, subject, body;
        string priority = "normal";
        vector<string> cc, bcc, attachments;

        friend class Email;

    public:
        Builder(const string& to, const string& subject) : to(to), subject(subject) {}

        Builder& addCc(const string& val) {
            cc.push_back(val);
            return *this;
        }

        Builder& addBcc(const string& val) {
            bcc.push_back(val);
            return *this;
        }

        Builder& setBody(const string& val) {
            body = val;
            return *this;
        }

        Builder& setPriority(const string& val) {
            priority = val;
            return *this;
        }

        Builder& addAttachment(const string& val) {
            attachments.push_back(val);
            return *this;
        }

        Email build() const {
            Email email;
            email.to = to;
            email.subject = subject;
            email.cc = cc;
            email.bcc = bcc;
            email.body = body;
            email.priority = priority;
            email.attachments = attachments;
            return email;
        }
    };
};

int main() {
    Email email1 = Email::Builder("alice@example.com", "Meeting Tomorrow")
            .setBody("Let's meet at 10am in conference room B.")
            .build();

    Email email2 = Email::Builder("bob@example.com", "Project Update")
            .addCc("carol@example.com")
            .addCc("dave@example.com")
            .addBcc("manager@example.com")
            .setBody("Attached is the Q4 report.")
            .setPriority("high")
            .addAttachment("q4-report.pdf")
            .addAttachment("summary.xlsx")
            .build();

    email1.print();
    cout << endl;
    email2.print();

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type Email struct {
	to          string
	subject     string
	cc          []string
	bcc         []string
	body        string
	priority    string
	attachments []string
}

func newEmail(builder *EmailBuilder) *Email {
	return &Email{
		to:          builder.to,
		subject:     builder.subject,
		cc:          append([]string(nil), builder.cc...),
		bcc:         append([]string(nil), builder.bcc...),
		body:        builder.body,
		priority:    builder.priority,
		attachments: append([]string(nil), builder.attachments...),
	}
}

func (e *Email) String() string {
	return fmt.Sprintf(
		"Email{to='%s', subject='%s', cc=[%s], bcc=[%s], body='%s', priority='%s', attachments=[%s]}",
		e.to,
		e.subject,
		strings.Join(e.cc, ", "),
		strings.Join(e.bcc, ", "),
		e.body,
		e.priority,
		strings.Join(e.attachments, ", "),
	)
}

type EmailBuilder struct {
	to          string
	subject     string
	cc          []string
	bcc         []string
	body        string
	priority    string
	attachments []string
}

func NewEmailBuilder(to, subject string) *EmailBuilder {
	return &EmailBuilder{
		to:       to,
		subject:  subject,
		cc:       []string{},
		bcc:      []string{},
		priority: "normal",
	}
}

func (b *EmailBuilder) Cc(cc string) *EmailBuilder {
	b.cc = append(b.cc, cc)
	return b
}

func (b *EmailBuilder) Bcc(bcc string) *EmailBuilder {
	b.bcc = append(b.bcc, bcc)
	return b
}

func (b *EmailBuilder) Body(body string) *EmailBuilder {
	b.body = body
	return b
}

func (b *EmailBuilder) Priority(priority string) *EmailBuilder {
	b.priority = priority
	return b
}

func (b *EmailBuilder) Attachment(attachment string) *EmailBuilder {
	b.attachments = append(b.attachments, attachment)
	return b
}

func (b *EmailBuilder) Build() *Email {
	return newEmail(b)
}

func main() {
	email1 := NewEmailBuilder("alice@example.com", "Meeting Tomorrow").
		Body("Let's meet at 10am in conference room B.").
		Build()

	email2 := NewEmailBuilder("bob@example.com", "Project Update").
		Cc("carol@example.com").
		Cc("dave@example.com").
		Bcc("manager@example.com").
		Body("Attached is the Q4 report.").
		Priority("high").
		Attachment("q4-report.pdf").
		Attachment("summary.xlsx").
		Build()

	fmt.Println(email1)
	fmt.Println()
	fmt.Println(email2)
}
```

```csharp
using System;
using System.Collections.Generic;

class Email
{
    public string To { get; }
    public string Subject { get; }
    public List<string> Cc { get; }
    public List<string> Bcc { get; }
    public string Body { get; }
    public string Priority { get; }
    public List<string> Attachments { get; }

    private Email(Builder builder)
    {
        To = builder.To;
        Subject = builder.Subject;
        Cc = new List<string>(builder.CcList);
        Bcc = new List<string>(builder.BccList);
        Body = builder.BodyText;
        Priority = builder.PriorityText;
        Attachments = new List<string>(builder.AttachmentList);
    }

    public override string ToString()
    {
        return $"Email{{to='{To}', subject='{Subject}', cc=[{string.Join(", ", Cc)}], bcc=[{string.Join(", ", Bcc)}], body='{Body}', priority='{Priority}', attachments=[{string.Join(", ", Attachments)}]}}";
    }

    public class Builder
    {
        internal string To;
        internal string Subject;
        internal List<string> CcList = new List<string>();
        internal List<string> BccList = new List<string>();
        internal string BodyText;
        internal string PriorityText = "normal";
        internal List<string> AttachmentList = new List<string>();

        public Builder(string to, string subject)
        {
            To = to;
            Subject = subject;
        }

        public Builder Cc(string cc)
        {
            CcList.Add(cc);
            return this;
        }

        public Builder Bcc(string bcc)
        {
            BccList.Add(bcc);
            return this;
        }

        public Builder SetBody(string body)
        {
            BodyText = body;
            return this;
        }

        public Builder SetPriority(string priority)
        {
            PriorityText = priority;
            return this;
        }

        public Builder Attachment(string attachment)
        {
            AttachmentList.Add(attachment);
            return this;
        }

        public Email Build()
        {
            return new Email(this);
        }
    }
}

class Program
{
    static void Main()
    {
        Email email1 = new Email.Builder("alice@example.com", "Meeting Tomorrow")
                .SetBody("Let's meet at 10am in conference room B.")
                .Build();

        Email email2 = new Email.Builder("bob@example.com", "Project Update")
                .Cc("carol@example.com")
                .Cc("dave@example.com")
                .Bcc("manager@example.com")
                .SetBody("Attached is the Q4 report.")
                .SetPriority("high")
                .Attachment("q4-report.pdf")
                .Attachment("summary.xlsx")
                .Build();

        Console.WriteLine(email1);
        Console.WriteLine();
        Console.WriteLine(email2);
    }
}
```

```typescript
class Email {
    readonly to: string;
    readonly subject: string;
    readonly cc: string[];
    readonly bcc: string[];
    readonly body: string;
    readonly priority: string;
    readonly attachments: string[];

    private constructor(builder: InstanceType<typeof Email.Builder>) {
        this.to = builder.toAddr;
        this.subject = builder.subjectText;
        this.cc = [...builder.ccList];
        this.bcc = [...builder.bccList];
        this.body = builder.bodyText;
        this.priority = builder.priorityText;
        this.attachments = [...builder.attachmentList];
    }

    toString(): string {
        return `Email{to='${this.to}', subject='${this.subject}', cc=[${this.cc.join(", ")}], bcc=[${this.bcc.join(", ")}], body='${this.body}', priority='${this.priority}', attachments=[${this.attachments.join(", ")}]}`;
    }

    static Builder = class {
        toAddr: string;
        subjectText: string;
        ccList: string[] = [];
        bccList: string[] = [];
        bodyText: string = "";
        priorityText: string = "normal";
        attachmentList: string[] = [];

        constructor(to: string, subject: string) {
            this.toAddr = to;
            this.subjectText = subject;
        }

        cc(cc: string): this {
            this.ccList.push(cc);
            return this;
        }

        bcc(bcc: string): this {
            this.bccList.push(bcc);
            return this;
        }

        setBody(body: string): this {
            this.bodyText = body;
            return this;
        }

        setPriority(priority: string): this {
            this.priorityText = priority;
            return this;
        }

        attachment(attachment: string): this {
            this.attachmentList.push(attachment);
            return this;
        }

        build(): Email {
            return new Email(this);
        }
    };
}

const email1 = new Email.Builder("alice@example.com", "Meeting Tomorrow")
        .setBody("Let's meet at 10am in conference room B.")
        .build();

const email2 = new Email.Builder("bob@example.com", "Project Update")
        .cc("carol@example.com")
        .cc("dave@example.com")
        .bcc("manager@example.com")
        .setBody("Attached is the Q4 report.")
        .setPriority("high")
        .attachment("q4-report.pdf")
        .attachment("summary.xlsx")
        .build();

console.log(email1.toString());
console.log();
console.log(email2.toString());
```

---

# Exercise 2: PizzaBuilder with Director

> [!PAYWALL] This content is for premium members only.

**Problem:** Implement a `Pizza` builder with a `PizzaDirector` that provides predefined pizza recipes.

**Requirements:**

- `Pizza` has: size (required), crust, sauce, cheese, and a list of toppings
- Builder allows adding toppings one at a time
- `PizzaDirector` has methods for: `buildMargherita()`, `buildPepperoni()`, `buildVeggie()`
- Each Director method takes a size parameter and returns a fully built Pizza
- Client can also build custom pizzas directly

```java
import java.util.ArrayList;
import java.util.List;

class Pizza {
    private final String size;
    private final String crust;
    private final String sauce;
    private final String cheese;
    private final List<String> toppings;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.crust = builder.crust;
        this.sauce = builder.sauce;
        this.cheese = builder.cheese;
        this.toppings = new ArrayList<>(builder.toppings);
    }

    @Override
    public String toString() {
        // TODO: Return formatted string
        // Expected: Pizza{size='...', crust='...', sauce='...', cheese='...', toppings=[...]}
        return "Pizza{}";
    }

    public static class Builder {
        private final String size;
        private String crust = "regular";
        private String sauce = "tomato";
        private String cheese = "mozzarella";
        private List<String> toppings = new ArrayList<>();

        public Builder(String size) { this.size = size; }

        public Builder crust(String crust) {
            // TODO: Set the crust field
            return this;
        }

        public Builder sauce(String sauce) {
            // TODO: Set the sauce field
            return this;
        }

        public Builder cheese(String cheese) {
            // TODO: Set the cheese field
            return this;
        }

        public Builder addTopping(String topping) {
            // TODO: Add topping to the toppings list
            return this;
        }

        public Pizza build() { return new Pizza(this); }
    }
}

class PizzaDirector {
    public Pizza buildMargherita(String size) {
        // TODO: Build with regular crust, tomato sauce, mozzarella, basil topping
        return null;
    }

    public Pizza buildPepperoni(String size) {
        // TODO: Build with thin crust, tomato sauce, mozzarella, pepperoni + olives
        return null;
    }

    public Pizza buildVeggie(String size) {
        // TODO: Build with whole wheat crust, pesto sauce, gouda, mushrooms + peppers + onions + olives
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        PizzaDirector director = new PizzaDirector();

        Pizza margherita = director.buildMargherita("medium");
        Pizza pepperoni = director.buildPepperoni("large");
        Pizza veggie = director.buildVeggie("small");

        Pizza custom = new Pizza.Builder("large")
                .crust("stuffed")
                .sauce("bbq")
                .cheese("cheddar")
                .addTopping("chicken")
                .addTopping("bacon")
                .addTopping("jalapenos")
                .build();

        System.out.println(margherita);
        System.out.println(pepperoni);
        System.out.println(veggie);
        System.out.println(custom);
    }
}
```

```python
class Pizza:
    def __init__(self, builder):
        self.size = builder._size
        self.crust = builder._crust
        self.sauce = builder._sauce
        self.cheese = builder._cheese
        self.toppings = list(builder._toppings)

    def __str__(self):
        # TODO: Return formatted string
        # Expected: Pizza{size='...', crust='...', sauce='...', cheese='...', toppings=[...]}
        # Hint: Join toppings with ", " for the toppings list
        return "Pizza{}"

    class Builder:
        def __init__(self, size):
            self._size = size
            self._crust = "regular"
            self._sauce = "tomato"
            self._cheese = "mozzarella"
            self._toppings = []

        def crust(self, crust):
            # TODO: Set the _crust field
            return self

        def sauce(self, sauce):
            # TODO: Set the _sauce field
            return self

        def cheese(self, cheese):
            # TODO: Set the _cheese field
            return self

        def add_topping(self, topping):
            # TODO: Append topping to the _toppings list
            return self

        def build(self):
            return Pizza(self)

class PizzaDirector:
    def build_margherita(self, size):
        # TODO: Build with regular crust, tomato sauce, mozzarella, basil topping
        return None

    def build_pepperoni(self, size):
        # TODO: Build with thin crust, tomato sauce, mozzarella, pepperoni + olives
        return None

    def build_veggie(self, size):
        # TODO: Build with whole wheat crust, pesto sauce, gouda, mushrooms + peppers + onions + olives
        return None

if __name__ == "__main__":
    director = PizzaDirector()
    margherita = director.build_margherita("medium")
    pepperoni = director.build_pepperoni("large")
    veggie = director.build_veggie("small")

    custom = Pizza.Builder("large") \
        .crust("stuffed").sauce("bbq").cheese("cheddar") \
        .add_topping("chicken").add_topping("bacon") \
        .add_topping("jalapenos").build()

    print(margherita)
    print(pepperoni)
    print(veggie)
    print(custom)
```

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

class Pizza {
    string size, crust, sauce, cheese;
    vector<string> toppings;

public:
    void print() const {
        // TODO: Print formatted string
        // Expected: Pizza{size='...', crust='...', sauce='...', cheese='...', toppings=[...]}
        // Hint: Write a helper lambda to join vector elements with ", "
        cout << "Pizza{}" << endl;
    }

    class Builder {
        string size, crust = "regular", sauce = "tomato", cheese = "mozzarella";
        vector<string> toppings;

        friend class Pizza;

    public:
        Builder(const string& size) : size(size) {}

        Builder& setCrust(const string& val) {
            // TODO: Set the crust field
            return *this;
        }

        Builder& setSauce(const string& val) {
            // TODO: Set the sauce field
            return *this;
        }

        Builder& setCheese(const string& val) {
            // TODO: Set the cheese field
            return *this;
        }

        Builder& addTopping(const string& val) {
            // TODO: Add val to toppings vector
            return *this;
        }

        Pizza build() const {
            Pizza p;
            p.size = size;
            p.crust = crust;
            p.sauce = sauce;
            p.cheese = cheese;
            p.toppings = toppings;
            return p;
        }
    };
};

class PizzaDirector {
public:
    Pizza buildMargherita(const string& size) {
        // TODO: Build with regular crust, tomato sauce, mozzarella, basil topping
        return Pizza::Builder(size).build();
    }

    Pizza buildPepperoni(const string& size) {
        // TODO: Build with thin crust, tomato sauce, mozzarella, pepperoni + olives
        return Pizza::Builder(size).build();
    }

    Pizza buildVeggie(const string& size) {
        // TODO: Build with whole wheat crust, pesto sauce, gouda, mushrooms + peppers + onions + olives
        return Pizza::Builder(size).build();
    }
};

int main() {
    PizzaDirector director;

    Pizza margherita = director.buildMargherita("medium");
    Pizza pepperoni = director.buildPepperoni("large");
    Pizza veggie = director.buildVeggie("small");

    Pizza custom = Pizza::Builder("large")
            .setCrust("stuffed")
            .setSauce("bbq")
            .setCheese("cheddar")
            .addTopping("chicken")
            .addTopping("bacon")
            .addTopping("jalapenos")
            .build();

    margherita.print();
    pepperoni.print();
    veggie.print();
    custom.print();

    return 0;
}
```

```go
package main

import "fmt"

type Pizza struct {
	size     string
	crust    string
	sauce    string
	cheese   string
	toppings []string
}

func (p Pizza) String() string {
	// TODO: Return formatted string
	// Expected: Pizza{size='...', crust='...', sauce='...', cheese='...', toppings=[...]}
	// Hint: Join toppings with ", " for the toppings list
	return "Pizza{}"
}

type PizzaBuilder struct {
	size     string
	crust    string
	sauce    string
	cheese   string
	toppings []string
}

func NewPizzaBuilder(size string) *PizzaBuilder {
	return &PizzaBuilder{
		size:   size,
		crust:  "regular",
		sauce:  "tomato",
		cheese: "mozzarella",
	}
}

func (b *PizzaBuilder) Crust(crust string) *PizzaBuilder {
	// TODO: Set the crust field
	return b
}

func (b *PizzaBuilder) Sauce(sauce string) *PizzaBuilder {
	// TODO: Set the sauce field
	return b
}

func (b *PizzaBuilder) Cheese(cheese string) *PizzaBuilder {
	// TODO: Set the cheese field
	return b
}

func (b *PizzaBuilder) AddTopping(topping string) *PizzaBuilder {
	// TODO: Append topping to the toppings list
	return b
}

func (b *PizzaBuilder) Build() Pizza {
	return Pizza{
		size:     b.size,
		crust:    b.crust,
		sauce:    b.sauce,
		cheese:   b.cheese,
		toppings: append([]string{}, b.toppings...),
	}
}

type PizzaDirector struct{}

func (d *PizzaDirector) BuildMargherita(size string) Pizza {
	// TODO: Build with regular crust, tomato sauce, mozzarella, basil topping
	return NewPizzaBuilder(size).Build()
}

func (d *PizzaDirector) BuildPepperoni(size string) Pizza {
	// TODO: Build with thin crust, tomato sauce, mozzarella, pepperoni + olives
	return NewPizzaBuilder(size).Build()
}

func (d *PizzaDirector) BuildVeggie(size string) Pizza {
	// TODO: Build with whole wheat crust, pesto sauce, gouda, mushrooms + peppers + onions + olives
	return NewPizzaBuilder(size).Build()
}

func main() {
	director := PizzaDirector{}

	margherita := director.BuildMargherita("medium")
	pepperoni := director.BuildPepperoni("large")
	veggie := director.BuildVeggie("small")

	custom := NewPizzaBuilder("large").
		Crust("stuffed").
		Sauce("bbq").
		Cheese("cheddar").
		AddTopping("chicken").
		AddTopping("bacon").
		AddTopping("jalapenos").
		Build()

	fmt.Println(margherita)
	fmt.Println(pepperoni)
	fmt.Println(veggie)
	fmt.Println(custom)
}
```

```csharp
using System;
using System.Collections.Generic;

class Pizza
{
    public string Size { get; }
    public string Crust { get; }
    public string Sauce { get; }
    public string Cheese { get; }
    public List<string> Toppings { get; }

    private Pizza(Builder builder)
    {
        Size = builder.SizeVal;
        Crust = builder.CrustVal;
        Sauce = builder.SauceVal;
        Cheese = builder.CheeseVal;
        Toppings = new List<string>(builder.ToppingList);
    }

    public override string ToString()
    {
        // TODO: Return formatted string
        // Expected: Pizza{size='...', crust='...', sauce='...', cheese='...', toppings=[...]}
        return "Pizza{}";
    }

    public class Builder
    {
        internal string SizeVal;
        internal string CrustVal = "regular";
        internal string SauceVal = "tomato";
        internal string CheeseVal = "mozzarella";
        internal List<string> ToppingList = new List<string>();

        public Builder(string size) { SizeVal = size; }

        public Builder Crust(string crust)
        {
            // TODO: Set CrustVal
            return this;
        }

        public Builder Sauce(string sauce)
        {
            // TODO: Set SauceVal
            return this;
        }

        public Builder Cheese(string cheese)
        {
            // TODO: Set CheeseVal
            return this;
        }

        public Builder AddTopping(string topping)
        {
            // TODO: Add topping to ToppingList
            return this;
        }

        public Pizza Build() { return new Pizza(this); }
    }
}

class PizzaDirector
{
    public Pizza BuildMargherita(string size)
    {
        // TODO: Build with regular crust, tomato sauce, mozzarella, basil topping
        return null;
    }

    public Pizza BuildPepperoni(string size)
    {
        // TODO: Build with thin crust, tomato sauce, mozzarella, pepperoni + olives
        return null;
    }

    public Pizza BuildVeggie(string size)
    {
        // TODO: Build with whole wheat crust, pesto sauce, gouda, mushrooms + peppers + onions + olives
        return null;
    }
}

class Program
{
    static void Main()
    {
        PizzaDirector director = new PizzaDirector();

        Pizza margherita = director.BuildMargherita("medium");
        Pizza pepperoni = director.BuildPepperoni("large");
        Pizza veggie = director.BuildVeggie("small");

        Pizza custom = new Pizza.Builder("large")
                .Crust("stuffed")
                .Sauce("bbq")
                .Cheese("cheddar")
                .AddTopping("chicken")
                .AddTopping("bacon")
                .AddTopping("jalapenos")
                .Build();

        Console.WriteLine(margherita);
        Console.WriteLine(pepperoni);
        Console.WriteLine(veggie);
        Console.WriteLine(custom);
    }
}
```

```typescript
class Pizza {
    readonly size: string;
    readonly crust: string;
    readonly sauce: string;
    readonly cheese: string;
    readonly toppings: string[];

    private constructor(builder: InstanceType<typeof Pizza.Builder>) {
        this.size = builder.sizeVal;
        this.crust = builder.crustVal;
        this.sauce = builder.sauceVal;
        this.cheese = builder.cheeseVal;
        this.toppings = [...builder.toppingList];
    }

    toString(): string {
        // TODO: Return formatted string
        // Expected: Pizza{size='...', crust='...', sauce='...', cheese='...', toppings=[...]}
        return "Pizza{}";
    }

    static Builder = class {
        sizeVal: string;
        crustVal: string = "regular";
        sauceVal: string = "tomato";
        cheeseVal: string = "mozzarella";
        toppingList: string[] = [];

        constructor(size: string) { this.sizeVal = size; }

        crust(crust: string): this {
            // TODO: Set crustVal
            return this;
        }

        sauce(sauce: string): this {
            // TODO: Set sauceVal
            return this;
        }

        cheese(cheese: string): this {
            // TODO: Set cheeseVal
            return this;
        }

        addTopping(topping: string): this {
            // TODO: Push topping to toppingList
            return this;
        }

        build(): Pizza { return new Pizza(this); }
    };
}

class PizzaDirector {
    buildMargherita(size: string): Pizza {
        // TODO: Build with regular crust, tomato sauce, mozzarella, basil topping
        return null as any;
    }

    buildPepperoni(size: string): Pizza {
        // TODO: Build with thin crust, tomato sauce, mozzarella, pepperoni + olives
        return null as any;
    }

    buildVeggie(size: string): Pizza {
        // TODO: Build with whole wheat crust, pesto sauce, gouda, mushrooms + peppers + onions + olives
        return null as any;
    }
}

const director = new PizzaDirector();

const margherita = director.buildMargherita("medium");
const pepperoni = director.buildPepperoni("large");
const veggie = director.buildVeggie("small");

const custom = new Pizza.Builder("large")
        .crust("stuffed")
        .sauce("bbq")
        .cheese("cheddar")
        .addTopping("chicken")
        .addTopping("bacon")
        .addTopping("jalapenos")
        .build();

console.log(String(margherita));
console.log(String(pepperoni));
console.log(String(veggie));
console.log(String(custom));
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.List;

class Pizza {
    private final String size;
    private final String crust;
    private final String sauce;
    private final String cheese;
    private final List<String> toppings;

    private Pizza(Builder builder) {
        this.size = builder.size;
        this.crust = builder.crust;
        this.sauce = builder.sauce;
        this.cheese = builder.cheese;
        this.toppings = new ArrayList<>(builder.toppings);
    }

    @Override
    public String toString() {
        return "Pizza{size='" + size + "', crust='" + crust + "', sauce='" + sauce + "', cheese='" + cheese + "', toppings=" + toppings + "}";
    }

    public static class Builder {
        private final String size;
        private String crust = "regular";
        private String sauce = "tomato";
        private String cheese = "mozzarella";
        private List<String> toppings = new ArrayList<>();

        public Builder(String size) { this.size = size; }

        public Builder crust(String crust) {
            this.crust = crust;
            return this;
        }

        public Builder sauce(String sauce) {
            this.sauce = sauce;
            return this;
        }

        public Builder cheese(String cheese) {
            this.cheese = cheese;
            return this;
        }

        public Builder addTopping(String topping) {
            this.toppings.add(topping);
            return this;
        }

        public Pizza build() { return new Pizza(this); }
    }
}

class PizzaDirector {
    public Pizza buildMargherita(String size) {
        return new Pizza.Builder(size)
                .crust("regular").sauce("tomato").cheese("mozzarella")
                .addTopping("basil").build();
    }

    public Pizza buildPepperoni(String size) {
        return new Pizza.Builder(size)
                .crust("thin").sauce("tomato").cheese("mozzarella")
                .addTopping("pepperoni").addTopping("olives").build();
    }

    public Pizza buildVeggie(String size) {
        return new Pizza.Builder(size)
                .crust("whole wheat").sauce("pesto").cheese("gouda")
                .addTopping("mushrooms").addTopping("peppers")
                .addTopping("onions").addTopping("olives").build();
    }
}

public class Main {
    public static void main(String[] args) {
        PizzaDirector director = new PizzaDirector();

        Pizza margherita = director.buildMargherita("medium");
        Pizza pepperoni = director.buildPepperoni("large");
        Pizza veggie = director.buildVeggie("small");

        // Custom pizza built directly
        Pizza custom = new Pizza.Builder("large")
                .crust("stuffed")
                .sauce("bbq")
                .cheese("cheddar")
                .addTopping("chicken")
                .addTopping("bacon")
                .addTopping("jalapenos")
                .build();

        System.out.println(margherita);
        System.out.println(pepperoni);
        System.out.println(veggie);
        System.out.println(custom);
    }
}
```

```python
class Pizza:
    def __init__(self, builder):
        self.size = builder._size
        self.crust = builder._crust
        self.sauce = builder._sauce
        self.cheese = builder._cheese
        self.toppings = list(builder._toppings)

    def __str__(self):
        toppings_str = ", ".join(self.toppings)
        return f"Pizza{{size='{self.size}', crust='{self.crust}', sauce='{self.sauce}', cheese='{self.cheese}', toppings=[{toppings_str}]}}"

    class Builder:
        def __init__(self, size):
            self._size = size
            self._crust = "regular"
            self._sauce = "tomato"
            self._cheese = "mozzarella"
            self._toppings = []

        def crust(self, crust):
            self._crust = crust
            return self

        def sauce(self, sauce):
            self._sauce = sauce
            return self

        def cheese(self, cheese):
            self._cheese = cheese
            return self

        def add_topping(self, topping):
            self._toppings.append(topping)
            return self

        def build(self):
            return Pizza(self)

class PizzaDirector:
    def build_margherita(self, size):
        return Pizza.Builder(size).crust("regular").sauce("tomato").cheese("mozzarella") \
            .add_topping("basil").build()

    def build_pepperoni(self, size):
        return Pizza.Builder(size).crust("thin").sauce("tomato").cheese("mozzarella") \
            .add_topping("pepperoni").add_topping("olives").build()

    def build_veggie(self, size):
        return Pizza.Builder(size).crust("whole wheat").sauce("pesto").cheese("gouda") \
            .add_topping("mushrooms").add_topping("peppers") \
            .add_topping("onions").add_topping("olives").build()

if __name__ == "__main__":
    director = PizzaDirector()
    margherita = director.build_margherita("medium")
    pepperoni = director.build_pepperoni("large")
    veggie = director.build_veggie("small")

    custom = Pizza.Builder("large") \
        .crust("stuffed").sauce("bbq").cheese("cheddar") \
        .add_topping("chicken").add_topping("bacon") \
        .add_topping("jalapenos").build()

    print(margherita)
    print(pepperoni)
    print(veggie)
    print(custom)
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <sstream>
using namespace std;

class Pizza {
    string size, crust, sauce, cheese;
    vector<string> toppings;

public:
    void print() const {
        auto join = [](const vector<string>& v) {
            string result;
            for (size_t i = 0; i < v.size(); i++) {
                if (i > 0) result += ", ";
                result += v[i];
            }
            return result;
        };
        cout << "Pizza{size='" << size << "', crust='" << crust
             << "', sauce='" << sauce << "', cheese='" << cheese
             << "', toppings=[" << join(toppings) << "]}" << endl;
    }

    class Builder {
        string size, crust = "regular", sauce = "tomato", cheese = "mozzarella";
        vector<string> toppings;

        friend class Pizza;

    public:
        Builder(const string& size) : size(size) {}

        Builder& setCrust(const string& val) {
            crust = val;
            return *this;
        }

        Builder& setSauce(const string& val) {
            sauce = val;
            return *this;
        }

        Builder& setCheese(const string& val) {
            cheese = val;
            return *this;
        }

        Builder& addTopping(const string& val) {
            toppings.push_back(val);
            return *this;
        }

        Pizza build() const {
            Pizza p;
            p.size = size;
            p.crust = crust;
            p.sauce = sauce;
            p.cheese = cheese;
            p.toppings = toppings;
            return p;
        }
    };
};

class PizzaDirector {
public:
    Pizza buildMargherita(const string& size) {
        return Pizza::Builder(size)
                .setCrust("regular").setSauce("tomato").setCheese("mozzarella")
                .addTopping("basil").build();
    }

    Pizza buildPepperoni(const string& size) {
        return Pizza::Builder(size)
                .setCrust("thin").setSauce("tomato").setCheese("mozzarella")
                .addTopping("pepperoni").addTopping("olives").build();
    }

    Pizza buildVeggie(const string& size) {
        return Pizza::Builder(size)
                .setCrust("whole wheat").setSauce("pesto").setCheese("gouda")
                .addTopping("mushrooms").addTopping("peppers")
                .addTopping("onions").addTopping("olives").build();
    }
};

int main() {
    PizzaDirector director;

    Pizza margherita = director.buildMargherita("medium");
    Pizza pepperoni = director.buildPepperoni("large");
    Pizza veggie = director.buildVeggie("small");

    // Custom pizza built directly
    Pizza custom = Pizza::Builder("large")
            .setCrust("stuffed")
            .setSauce("bbq")
            .setCheese("cheddar")
            .addTopping("chicken")
            .addTopping("bacon")
            .addTopping("jalapenos")
            .build();

    margherita.print();
    pepperoni.print();
    veggie.print();
    custom.print();

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type Pizza struct {
	size     string
	crust    string
	sauce    string
	cheese   string
	toppings []string
}

func newPizza(builder *PizzaBuilder) Pizza {
	return Pizza{
		size:     builder.size,
		crust:    builder.crust,
		sauce:    builder.sauce,
		cheese:   builder.cheese,
		toppings: append([]string(nil), builder.toppings...),
	}
}

func (p Pizza) String() string {
	return fmt.Sprintf("Pizza{size='%s', crust='%s', sauce='%s', cheese='%s', toppings=[%s]}",
		p.size, p.crust, p.sauce, p.cheese, strings.Join(p.toppings, ", "))
}

type PizzaBuilder struct {
	size     string
	crust    string
	sauce    string
	cheese   string
	toppings []string
}

func NewPizzaBuilder(size string) *PizzaBuilder {
	return &PizzaBuilder{
		size:   size,
		crust:  "regular",
		sauce:  "tomato",
		cheese: "mozzarella",
	}
}

func (b *PizzaBuilder) Crust(crust string) *PizzaBuilder {
	b.crust = crust
	return b
}

func (b *PizzaBuilder) Sauce(sauce string) *PizzaBuilder {
	b.sauce = sauce
	return b
}

func (b *PizzaBuilder) Cheese(cheese string) *PizzaBuilder {
	b.cheese = cheese
	return b
}

func (b *PizzaBuilder) AddTopping(topping string) *PizzaBuilder {
	b.toppings = append(b.toppings, topping)
	return b
}

func (b *PizzaBuilder) Build() Pizza {
	return newPizza(b)
}

type PizzaDirector struct{}

func (d PizzaDirector) BuildMargherita(size string) Pizza {
	return NewPizzaBuilder(size).
		Crust("regular").Sauce("tomato").Cheese("mozzarella").
		AddTopping("basil").Build()
}

func (d PizzaDirector) BuildPepperoni(size string) Pizza {
	return NewPizzaBuilder(size).
		Crust("thin").Sauce("tomato").Cheese("mozzarella").
		AddTopping("pepperoni").AddTopping("olives").Build()
}

func (d PizzaDirector) BuildVeggie(size string) Pizza {
	return NewPizzaBuilder(size).
		Crust("whole wheat").Sauce("pesto").Cheese("gouda").
		AddTopping("mushrooms").AddTopping("peppers").
		AddTopping("onions").AddTopping("olives").Build()
}

func main() {
	director := PizzaDirector{}

	margherita := director.BuildMargherita("medium")
	pepperoni := director.BuildPepperoni("large")
	veggie := director.BuildVeggie("small")

	// Custom pizza built directly
	custom := NewPizzaBuilder("large").
		Crust("stuffed").
		Sauce("bbq").
		Cheese("cheddar").
		AddTopping("chicken").
		AddTopping("bacon").
		AddTopping("jalapenos").
		Build()

	fmt.Println(margherita)
	fmt.Println(pepperoni)
	fmt.Println(veggie)
	fmt.Println(custom)
}
```

```csharp
using System;
using System.Collections.Generic;

class Pizza
{
    public string Size { get; }
    public string Crust { get; }
    public string Sauce { get; }
    public string Cheese { get; }
    public List<string> Toppings { get; }

    private Pizza(Builder builder)
    {
        Size = builder.SizeVal;
        Crust = builder.CrustVal;
        Sauce = builder.SauceVal;
        Cheese = builder.CheeseVal;
        Toppings = new List<string>(builder.ToppingList);
    }

    public override string ToString()
    {
        return $"Pizza{{size='{Size}', crust='{Crust}', sauce='{Sauce}', cheese='{Cheese}', toppings=[{string.Join(", ", Toppings)}]}}";
    }

    public class Builder
    {
        internal string SizeVal;
        internal string CrustVal = "regular";
        internal string SauceVal = "tomato";
        internal string CheeseVal = "mozzarella";
        internal List<string> ToppingList = new List<string>();

        public Builder(string size) { SizeVal = size; }

        public Builder Crust(string crust) { CrustVal = crust; return this; }
        public Builder Sauce(string sauce) { SauceVal = sauce; return this; }
        public Builder Cheese(string cheese) { CheeseVal = cheese; return this; }

        public Builder AddTopping(string topping)
        {
            ToppingList.Add(topping);
            return this;
        }

        public Pizza Build() { return new Pizza(this); }
    }
}

class PizzaDirector
{
    public Pizza BuildMargherita(string size)
    {
        return new Pizza.Builder(size)
                .Crust("regular").Sauce("tomato").Cheese("mozzarella")
                .AddTopping("basil").Build();
    }

    public Pizza BuildPepperoni(string size)
    {
        return new Pizza.Builder(size)
                .Crust("thin").Sauce("tomato").Cheese("mozzarella")
                .AddTopping("pepperoni").AddTopping("olives").Build();
    }

    public Pizza BuildVeggie(string size)
    {
        return new Pizza.Builder(size)
                .Crust("whole wheat").Sauce("pesto").Cheese("gouda")
                .AddTopping("mushrooms").AddTopping("peppers")
                .AddTopping("onions").AddTopping("olives").Build();
    }
}

class Program
{
    static void Main()
    {
        PizzaDirector director = new PizzaDirector();

        Pizza margherita = director.BuildMargherita("medium");
        Pizza pepperoni = director.BuildPepperoni("large");
        Pizza veggie = director.BuildVeggie("small");

        // Custom pizza built directly
        Pizza custom = new Pizza.Builder("large")
                .Crust("stuffed")
                .Sauce("bbq")
                .Cheese("cheddar")
                .AddTopping("chicken")
                .AddTopping("bacon")
                .AddTopping("jalapenos")
                .Build();

        Console.WriteLine(margherita);
        Console.WriteLine(pepperoni);
        Console.WriteLine(veggie);
        Console.WriteLine(custom);
    }
}
```

```typescript
class Pizza {
    readonly size: string;
    readonly crust: string;
    readonly sauce: string;
    readonly cheese: string;
    readonly toppings: string[];

    private constructor(builder: InstanceType<typeof Pizza.Builder>) {
        this.size = builder.sizeVal;
        this.crust = builder.crustVal;
        this.sauce = builder.sauceVal;
        this.cheese = builder.cheeseVal;
        this.toppings = [...builder.toppingList];
    }

    toString(): string {
        return `Pizza{size='${this.size}', crust='${this.crust}', sauce='${this.sauce}', cheese='${this.cheese}', toppings=[${this.toppings.join(", ")}]}`;
    }

    static Builder = class {
        sizeVal: string;
        crustVal: string = "regular";
        sauceVal: string = "tomato";
        cheeseVal: string = "mozzarella";
        toppingList: string[] = [];

        constructor(size: string) { this.sizeVal = size; }

        crust(crust: string): this { this.crustVal = crust; return this; }
        sauce(sauce: string): this { this.sauceVal = sauce; return this; }
        cheese(cheese: string): this { this.cheeseVal = cheese; return this; }

        addTopping(topping: string): this {
            this.toppingList.push(topping);
            return this;
        }

        build(): Pizza { return new Pizza(this); }
    };
}

class PizzaDirector {
    buildMargherita(size: string): Pizza {
        return new Pizza.Builder(size)
                .crust("regular").sauce("tomato").cheese("mozzarella")
                .addTopping("basil").build();
    }

    buildPepperoni(size: string): Pizza {
        return new Pizza.Builder(size)
                .crust("thin").sauce("tomato").cheese("mozzarella")
                .addTopping("pepperoni").addTopping("olives").build();
    }

    buildVeggie(size: string): Pizza {
        return new Pizza.Builder(size)
                .crust("whole wheat").sauce("pesto").cheese("gouda")
                .addTopping("mushrooms").addTopping("peppers")
                .addTopping("onions").addTopping("olives").build();
    }
}

const director = new PizzaDirector();

const margherita = director.buildMargherita("medium");
const pepperoni = director.buildPepperoni("large");
const veggie = director.buildVeggie("small");

// Custom pizza built directly
const custom = new Pizza.Builder("large")
        .crust("stuffed")
        .sauce("bbq")
        .cheese("cheddar")
        .addTopping("chicken")
        .addTopping("bacon")
        .addTopping("jalapenos")
        .build();

console.log(margherita.toString());
console.log(pepperoni.toString());
console.log(veggie.toString());
console.log(custom.toString());
```

---

# Exercise 3: ReportBuilder with Ordering Constraint

**Problem:** Implement a Builder for a `Report` that enforces section ordering. A report has a title, an optional subtitle, ordered sections (each with a heading and content), optional charts, and a footer.

**Requirements:**

- `title(String)` - required (Builder constructor)
- `subtitle(String)` - optional
- `addSection(String heading, String content)` - adds sections in order
- `addChart(String chartName)` - optional, can add multiple
- `footer(String)` - optional
- `build()` validates that at least one section exists
- `toString()` renders the report with section numbers

```java
import java.util.ArrayList;
import java.util.List;

class Report {
    private final String title;
    private final String subtitle;
    private final List<String[]> sections;
    private final List<String> charts;
    private final String footer;

    private Report(Builder builder) {
        this.title = builder.title;
        this.subtitle = builder.subtitle;
        this.sections = new ArrayList<>(builder.sections);
        this.charts = new ArrayList<>(builder.charts);
        this.footer = builder.footer;
    }

    @Override
    public String toString() {
        // TODO: Build formatted report string with:
        //   - Header line of "=" characters
        //   - Title and optional subtitle
        //   - Numbered sections (1. Heading \n    Content)
        //   - Charts list if any
        //   - Footer with "---" prefix/suffix if set
        return "Report{}";
    }

    public static class Builder {
        private final String title;
        private String subtitle;
        private List<String[]> sections = new ArrayList<>();
        private List<String> charts = new ArrayList<>();
        private String footer;

        public Builder(String title) { this.title = title; }

        public Builder subtitle(String subtitle) {
            // TODO: Set the subtitle field
            return this;
        }

        public Builder addSection(String heading, String content) {
            // TODO: Add new String[]{heading, content} to sections list
            return this;
        }

        public Builder addChart(String chart) {
            // TODO: Add chart to charts list
            return this;
        }

        public Builder footer(String footer) {
            // TODO: Set the footer field
            return this;
        }

        public Report build() {
            // TODO: Validate that sections is not empty
            // If empty, throw IllegalStateException("Report must have at least one section")
            return new Report(this);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Report report = new Report.Builder("Q4 Performance Report")
                .subtitle("October - December 2024")
                .addSection("Executive Summary", "Revenue grew 15% quarter over quarter.")
                .addSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M")
                .addSection("Challenges", "Infrastructure costs increased by 8%.")
                .addChart("revenue-trend")
                .addChart("user-growth")
                .footer("Confidential - Internal Use Only")
                .build();

        System.out.println(report);

        try {
            Report empty = new Report.Builder("Empty Report").build();
        } catch (IllegalStateException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

```python
class Report:
    def __init__(self, builder):
        self.title = builder._title
        self.subtitle = builder._subtitle
        self.sections = list(builder._sections)
        self.charts = list(builder._charts)
        self.footer = builder._footer

    def __str__(self):
        # TODO: Build formatted report string with:
        #   - Header line of "=" characters
        #   - Title and optional subtitle
        #   - Numbered sections (1. Heading \n    Content)
        #   - Charts list if any
        #   - Footer with "---" prefix/suffix if set
        return "Report{}"

    class Builder:
        def __init__(self, title):
            self._title = title
            self._subtitle = None
            self._sections = []
            self._charts = []
            self._footer = None

        def subtitle(self, subtitle):
            # TODO: Set the subtitle field
            return self

        def add_section(self, heading, content):
            # TODO: Append (heading, content) tuple to sections list
            return self

        def add_chart(self, chart):
            # TODO: Append chart to charts list
            return self

        def footer(self, footer):
            # TODO: Set the footer field
            return self

        def build(self):
            # TODO: Validate that sections is not empty
            # If empty, raise ValueError("Report must have at least one section")
            return Report(self)

if __name__ == "__main__":
    report = Report.Builder("Q4 Performance Report") \
        .subtitle("October - December 2024") \
        .add_section("Executive Summary", "Revenue grew 15% quarter over quarter.") \
        .add_section("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M") \
        .add_section("Challenges", "Infrastructure costs increased by 8%.") \
        .add_chart("revenue-trend") \
        .add_chart("user-growth") \
        .footer("Confidential - Internal Use Only") \
        .build()

    print(report)

    try:
        empty = Report.Builder("Empty Report").build()
    except ValueError as e:
        print(f"Error: {e}")
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <utility>
#include <stdexcept>
using namespace std;

class Report {
    string title, subtitle, footer;
    vector<pair<string, string>> sections;
    vector<string> charts;

public:
    void print() const {
        // TODO: Print formatted report with:
        //   - Header line of "=" characters
        //   - Title and optional subtitle
        //   - Numbered sections (1. Heading \n    Content)
        //   - Charts list if any
        //   - Footer with "---" prefix/suffix if set
        cout << "Report{}" << endl;
    }

    class Builder {
        string title, subtitle, footer;
        vector<pair<string, string>> sections;
        vector<string> charts;

        friend class Report;

    public:
        Builder(const string& title) : title(title) {}

        Builder& setSubtitle(const string& val) {
            // TODO: Set the subtitle field
            return *this;
        }

        Builder& addSection(const string& heading, const string& content) {
            // TODO: Add {heading, content} pair to sections vector
            return *this;
        }

        Builder& addChart(const string& chart) {
            // TODO: Add chart to charts vector
            return *this;
        }

        Builder& setFooter(const string& val) {
            // TODO: Set the footer field
            return *this;
        }

        Report build() const {
            // TODO: Validate that sections is not empty
            // If empty, throw runtime_error("Report must have at least one section")
            Report r;
            r.title = title;
            r.subtitle = subtitle;
            r.sections = sections;
            r.charts = charts;
            r.footer = footer;
            return r;
        }
    };
};

int main() {
    Report report = Report::Builder("Q4 Performance Report")
            .setSubtitle("October - December 2024")
            .addSection("Executive Summary", "Revenue grew 15% quarter over quarter.")
            .addSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M")
            .addSection("Challenges", "Infrastructure costs increased by 8%.")
            .addChart("revenue-trend")
            .addChart("user-growth")
            .setFooter("Confidential - Internal Use Only")
            .build();

    report.print();

    try {
        Report empty = Report::Builder("Empty Report").build();
    } catch (const runtime_error& e) {
        cout << "Error: " << e.what() << endl;
    }

    return 0;
}
```

```go
package main

import "fmt"

type Section struct {
	Heading string
	Content string
}

type Report struct {
	title    string
	subtitle string
	sections []Section
	charts   []string
	footer   string
}

func newReport(builder *ReportBuilder) *Report {
	return &Report{
		title:    builder.titleVal,
		subtitle: builder.subtitleVal,
		sections: append([]Section(nil), builder.sectionList...),
		charts:   append([]string(nil), builder.chartList...),
		footer:   builder.footerVal,
	}
}

func (r *Report) String() string {
	// TODO: Build formatted report string with:
	//   - Header line of "=" characters
	//   - Title and optional subtitle
	//   - Numbered sections (1. Heading \n    Content)
	//   - Charts list if any
	//   - Footer with "---" prefix/suffix if set
	return "Report{}"
}

type ReportBuilder struct {
	titleVal    string
	subtitleVal string
	sectionList []Section
	chartList   []string
	footerVal   string
}

func NewReportBuilder(title string) *ReportBuilder {
	return &ReportBuilder{titleVal: title}
}

func (b *ReportBuilder) Subtitle(subtitle string) *ReportBuilder {
	// TODO: Set subtitleVal
	return b
}

func (b *ReportBuilder) AddSection(heading string, content string) *ReportBuilder {
	// TODO: Push {heading, content} to sectionList
	return b
}

func (b *ReportBuilder) AddChart(chart string) *ReportBuilder {
	// TODO: Push chart to chartList
	return b
}

func (b *ReportBuilder) Footer(footer string) *ReportBuilder {
	// TODO: Set footerVal
	return b
}

func (b *ReportBuilder) Build() (*Report, error) {
	// TODO: Validate that sectionList is not empty
	// If empty, return nil, fmt.Errorf("Report must have at least one section")
	_ = fmt.Errorf
	return newReport(b), nil
}

func main() {
	report, _ := NewReportBuilder("Q4 Performance Report").
		Subtitle("October - December 2024").
		AddSection("Executive Summary", "Revenue grew 15% quarter over quarter.").
		AddSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M").
		AddSection("Challenges", "Infrastructure costs increased by 8%.").
		AddChart("revenue-trend").
		AddChart("user-growth").
		Footer("Confidential - Internal Use Only").
		Build()

	fmt.Println(report)

	_, _ = NewReportBuilder("Empty Report").Build()
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Text;

class Report
{
    public string Title { get; }
    public string Subtitle { get; }
    public List<(string Heading, string Content)> Sections { get; }
    public List<string> Charts { get; }
    public string Footer { get; }

    private Report(Builder builder)
    {
        Title = builder.TitleVal;
        Subtitle = builder.SubtitleVal;
        Sections = new List<(string, string)>(builder.SectionList);
        Charts = new List<string>(builder.ChartList);
        Footer = builder.FooterVal;
    }

    public override string ToString()
    {
        // TODO: Build formatted report string with:
        //   - Header line of "=" characters
        //   - Title and optional subtitle
        //   - Numbered sections (1. Heading \n    Content)
        //   - Charts list if any
        //   - Footer with "---" prefix/suffix if set
        return "Report{}";
    }

    public class Builder
    {
        internal string TitleVal;
        internal string SubtitleVal;
        internal List<(string Heading, string Content)> SectionList = new List<(string, string)>();
        internal List<string> ChartList = new List<string>();
        internal string FooterVal;

        public Builder(string title) { TitleVal = title; }

        public Builder Subtitle(string subtitle)
        {
            // TODO: Set SubtitleVal
            return this;
        }

        public Builder AddSection(string heading, string content)
        {
            // TODO: Add (heading, content) tuple to SectionList
            return this;
        }

        public Builder AddChart(string chart)
        {
            // TODO: Add chart to ChartList
            return this;
        }

        public Builder Footer(string footer)
        {
            // TODO: Set FooterVal
            return this;
        }

        public Report Build()
        {
            // TODO: Validate that SectionList is not empty
            // If empty, throw InvalidOperationException("Report must have at least one section")
            return new Report(this);
        }
    }
}

class Program
{
    static void Main()
    {
        Report report = new Report.Builder("Q4 Performance Report")
                .Subtitle("October - December 2024")
                .AddSection("Executive Summary", "Revenue grew 15% quarter over quarter.")
                .AddSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M")
                .AddSection("Challenges", "Infrastructure costs increased by 8%.")
                .AddChart("revenue-trend")
                .AddChart("user-growth")
                .Footer("Confidential - Internal Use Only")
                .Build();

        Console.WriteLine(report);

        try
        {
            Report empty = new Report.Builder("Empty Report").Build();
        }
        catch (InvalidOperationException e)
        {
            Console.WriteLine("Error: " + e.Message);
        }
    }
}
```

```typescript
interface Section {
    heading: string;
    content: string;
}

class Report {
    readonly title: string;
    readonly subtitle: string;
    readonly sections: Section[];
    readonly charts: string[];
    readonly footer: string;

    private constructor(builder: InstanceType<typeof Report.Builder>) {
        this.title = builder.titleVal;
        this.subtitle = builder.subtitleVal;
        this.sections = [...builder.sectionList];
        this.charts = [...builder.chartList];
        this.footer = builder.footerVal;
    }

    toString(): string {
        // TODO: Build formatted report string with:
        //   - Header line of "=" characters
        //   - Title and optional subtitle
        //   - Numbered sections (1. Heading \n    Content)
        //   - Charts list if any
        //   - Footer with "---" prefix/suffix if set
        return "Report{}";
    }

    static Builder = class {
        titleVal: string;
        subtitleVal: string = "";
        sectionList: Section[] = [];
        chartList: string[] = [];
        footerVal: string = "";

        constructor(title: string) { this.titleVal = title; }

        subtitle(subtitle: string): this {
            // TODO: Set subtitleVal
            return this;
        }

        addSection(heading: string, content: string): this {
            // TODO: Push {heading, content} to sectionList
            return this;
        }

        addChart(chart: string): this {
            // TODO: Push chart to chartList
            return this;
        }

        footer(footer: string): this {
            // TODO: Set footerVal
            return this;
        }

        build(): Report {
            // TODO: Validate that sectionList is not empty
            // If empty, throw new Error("Report must have at least one section")
            return new Report(this);
        }
    };
}

const report = new Report.Builder("Q4 Performance Report")
        .subtitle("October - December 2024")
        .addSection("Executive Summary", "Revenue grew 15% quarter over quarter.")
        .addSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M")
        .addSection("Challenges", "Infrastructure costs increased by 8%.")
        .addChart("revenue-trend")
        .addChart("user-growth")
        .footer("Confidential - Internal Use Only")
        .build();

console.log(report.toString());

try {
    const empty = new Report.Builder("Empty Report").build();
} catch (e) {
    console.log("Error: " + (e as Error).message);
}
```

#### Solutions

```java
import java.util.ArrayList;
import java.util.List;

class Report {
    private final String title;
    private final String subtitle;
    private final List<String[]> sections;
    private final List<String> charts;
    private final String footer;

    private Report(Builder builder) {
        this.title = builder.title;
        this.subtitle = builder.subtitle;
        this.sections = new ArrayList<>(builder.sections);
        this.charts = new ArrayList<>(builder.charts);
        this.footer = builder.footer;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("========================================\n");
        sb.append(title).append("\n");
        if (subtitle != null) sb.append(subtitle).append("\n");
        sb.append("========================================\n");
        for (int i = 0; i < sections.size(); i++) {
            sb.append("\n").append(i + 1).append(". ").append(sections.get(i)[0]).append("\n");
            sb.append("   ").append(sections.get(i)[1]).append("\n");
        }
        if (!charts.isEmpty()) {
            sb.append("\nCharts: ").append(charts).append("\n");
        }
        if (footer != null) {
            sb.append("\n--- ").append(footer).append(" ---");
        }
        return sb.toString();
    }

    public static class Builder {
        private final String title;
        private String subtitle;
        private List<String[]> sections = new ArrayList<>();
        private List<String> charts = new ArrayList<>();
        private String footer;

        public Builder(String title) { this.title = title; }

        public Builder subtitle(String subtitle) {
            this.subtitle = subtitle;
            return this;
        }

        public Builder addSection(String heading, String content) {
            this.sections.add(new String[]{heading, content});
            return this;
        }

        public Builder addChart(String chart) {
            this.charts.add(chart);
            return this;
        }

        public Builder footer(String footer) {
            this.footer = footer;
            return this;
        }

        public Report build() {
            if (sections.isEmpty()) throw new IllegalStateException("Report must have at least one section");
            return new Report(this);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Report report = new Report.Builder("Q4 Performance Report")
                .subtitle("October - December 2024")
                .addSection("Executive Summary", "Revenue grew 15% quarter over quarter.")
                .addSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M")
                .addSection("Challenges", "Infrastructure costs increased by 8%.")
                .addChart("revenue-trend")
                .addChart("user-growth")
                .footer("Confidential - Internal Use Only")
                .build();

        System.out.println(report);
        System.out.println();

        // This should throw an exception
        try {
            Report empty = new Report.Builder("Empty Report").build();
        } catch (IllegalStateException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

```python
class Report:
    def __init__(self, builder):
        self.title = builder._title
        self.subtitle = builder._subtitle
        self.sections = list(builder._sections)
        self.charts = list(builder._charts)
        self.footer = builder._footer

    def __str__(self):
        lines = []
        lines.append("========================================")
        lines.append(self.title)
        if self.subtitle:
            lines.append(self.subtitle)
        lines.append("========================================")
        for i, (heading, content) in enumerate(self.sections, 1):
            lines.append(f"\n{i}. {heading}")
            lines.append(f"   {content}")
        if self.charts:
            charts_str = ", ".join(self.charts)
            lines.append(f"\nCharts: [{charts_str}]")
        if self.footer:
            lines.append(f"\n--- {self.footer} ---")
        return "\n".join(lines)

    class Builder:
        def __init__(self, title):
            self._title = title
            self._subtitle = None
            self._sections = []
            self._charts = []
            self._footer = None

        def subtitle(self, subtitle):
            self._subtitle = subtitle
            return self

        def add_section(self, heading, content):
            self._sections.append((heading, content))
            return self

        def add_chart(self, chart):
            self._charts.append(chart)
            return self

        def footer(self, footer):
            self._footer = footer
            return self

        def build(self):
            if not self._sections:
                raise ValueError("Report must have at least one section")
            return Report(self)

if __name__ == "__main__":
    report = Report.Builder("Q4 Performance Report") \
        .subtitle("October - December 2024") \
        .add_section("Executive Summary", "Revenue grew 15% quarter over quarter.") \
        .add_section("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M") \
        .add_section("Challenges", "Infrastructure costs increased by 8%.") \
        .add_chart("revenue-trend") \
        .add_chart("user-growth") \
        .footer("Confidential - Internal Use Only") \
        .build()

    print(report)
    print()

    try:
        empty = Report.Builder("Empty Report").build()
    except ValueError as e:
        print(f"Error: {e}")
```

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <utility>
#include <stdexcept>
using namespace std;

class Report {
    string title, subtitle, footer;
    vector<pair<string, string>> sections;
    vector<string> charts;

public:
    void print() const {
        cout << "========================================" << endl;
        cout << title << endl;
        if (!subtitle.empty()) cout << subtitle << endl;
        cout << "========================================" << endl;
        for (size_t i = 0; i < sections.size(); i++) {
            cout << endl << (i + 1) << ". " << sections[i].first << endl;
            cout << "   " << sections[i].second << endl;
        }
        if (!charts.empty()) {
            cout << endl << "Charts: [";
            for (size_t i = 0; i < charts.size(); i++) {
                if (i > 0) cout << ", ";
                cout << charts[i];
            }
            cout << "]" << endl;
        }
        if (!footer.empty()) {
            cout << endl << "--- " << footer << " ---" << endl;
        }
    }

    class Builder {
        string title, subtitle, footer;
        vector<pair<string, string>> sections;
        vector<string> charts;

        friend class Report;

    public:
        Builder(const string& title) : title(title) {}

        Builder& setSubtitle(const string& val) {
            subtitle = val;
            return *this;
        }

        Builder& addSection(const string& heading, const string& content) {
            sections.push_back({heading, content});
            return *this;
        }

        Builder& addChart(const string& chart) {
            charts.push_back(chart);
            return *this;
        }

        Builder& setFooter(const string& val) {
            footer = val;
            return *this;
        }

        Report build() const {
            if (sections.empty()) throw runtime_error("Report must have at least one section");
            Report r;
            r.title = title;
            r.subtitle = subtitle;
            r.sections = sections;
            r.charts = charts;
            r.footer = footer;
            return r;
        }
    };
};

int main() {
    Report report = Report::Builder("Q4 Performance Report")
            .setSubtitle("October - December 2024")
            .addSection("Executive Summary", "Revenue grew 15% quarter over quarter.")
            .addSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M")
            .addSection("Challenges", "Infrastructure costs increased by 8%.")
            .addChart("revenue-trend")
            .addChart("user-growth")
            .setFooter("Confidential - Internal Use Only")
            .build();

    report.print();
    cout << endl;

    // This should throw an exception
    try {
        Report empty = Report::Builder("Empty Report").build();
    } catch (const runtime_error& e) {
        cout << "Error: " << e.what() << endl;
    }

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

type Section struct {
	Heading string
	Content string
}

type Report struct {
	title    string
	subtitle string
	sections []Section
	charts   []string
	footer   string
}

func (r Report) String() string {
	var sb strings.Builder
	sb.WriteString("========================================\n")
	sb.WriteString(r.title)
	sb.WriteString("\n")
	if r.subtitle != "" {
		sb.WriteString(r.subtitle)
		sb.WriteString("\n")
	}
	sb.WriteString("========================================")
	for i, sec := range r.sections {
		sb.WriteString("\n\n")
		sb.WriteString(fmt.Sprintf("%d. %s\n", i+1, sec.Heading))
		sb.WriteString(fmt.Sprintf("   %s\n", sec.Content))
	}
	if len(r.charts) > 0 {
		sb.WriteString("\n\nCharts: [")
		sb.WriteString(strings.Join(r.charts, ", "))
		sb.WriteString("]\n")
	}
	if r.footer != "" {
		sb.WriteString("\n--- ")
		sb.WriteString(r.footer)
		sb.WriteString(" ---")
	}
	return sb.String()
}

type ReportBuilder struct {
	title      string
	subtitle   string
	sections   []Section
	charts     []string
	footer     string
}

func NewReportBuilder(title string) *ReportBuilder {
	return &ReportBuilder{title: title}
}

func (b *ReportBuilder) Subtitle(subtitle string) *ReportBuilder {
	b.subtitle = subtitle
	return b
}

func (b *ReportBuilder) AddSection(heading, content string) *ReportBuilder {
	b.sections = append(b.sections, Section{Heading: heading, Content: content})
	return b
}

func (b *ReportBuilder) AddChart(chart string) *ReportBuilder {
	b.charts = append(b.charts, chart)
	return b
}

func (b *ReportBuilder) Footer(footer string) *ReportBuilder {
	b.footer = footer
	return b
}

func (b *ReportBuilder) Build() (*Report, error) {
	if len(b.sections) == 0 {
		return nil, fmt.Errorf("Report must have at least one section")
	}
	r := &Report{
		title:    b.title,
		subtitle: b.subtitle,
		sections: append([]Section(nil), b.sections...),
		charts:   append([]string(nil), b.charts...),
		footer:   b.footer,
	}
	return r, nil
}

func main() {
	report, err := NewReportBuilder("Q4 Performance Report").
		Subtitle("October - December 2024").
		AddSection("Executive Summary", "Revenue grew 15% quarter over quarter.").
		AddSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M").
		AddSection("Challenges", "Infrastructure costs increased by 8%.").
		AddChart("revenue-trend").
		AddChart("user-growth").
		Footer("Confidential - Internal Use Only").
		Build()
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	fmt.Println(report)
	fmt.Println()

	// This should throw an exception
	empty, err := NewReportBuilder("Empty Report").Build()
	if err != nil {
		fmt.Println("Error:", err.Error())
	} else {
		_ = empty
	}
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Text;

class Report
{
    public string Title { get; }
    public string Subtitle { get; }
    public List<(string Heading, string Content)> Sections { get; }
    public List<string> Charts { get; }
    public string Footer { get; }

    private Report(Builder builder)
    {
        Title = builder.TitleVal;
        Subtitle = builder.SubtitleVal;
        Sections = new List<(string, string)>(builder.SectionList);
        Charts = new List<string>(builder.ChartList);
        Footer = builder.FooterVal;
    }

    public override string ToString()
    {
        var sb = new StringBuilder();
        sb.AppendLine("========================================");
        sb.AppendLine(Title);
        if (Subtitle != null) sb.AppendLine(Subtitle);
        sb.AppendLine("========================================");
        for (int i = 0; i < Sections.Count; i++) {
            sb.AppendLine();
            sb.AppendLine($"{i + 1}. {Sections[i].Heading}");
            sb.AppendLine($"   {Sections[i].Content}");
        }
        if (Charts.Count > 0) {
            sb.AppendLine();
            sb.AppendLine($"Charts: [{string.Join(", ", Charts)}]");
        }
        if (Footer != null) {
            sb.AppendLine();
            sb.Append($"--- {Footer} ---");
        }
        return sb.ToString();
    }

    public class Builder
    {
        internal string TitleVal;
        internal string SubtitleVal;
        internal List<(string Heading, string Content)> SectionList = new List<(string, string)>();
        internal List<string> ChartList = new List<string>();
        internal string FooterVal;

        public Builder(string title) { TitleVal = title; }

        public Builder Subtitle(string subtitle) { SubtitleVal = subtitle; return this; }

        public Builder AddSection(string heading, string content)
        {
            SectionList.Add((heading, content));
            return this;
        }

        public Builder AddChart(string chart)
        {
            ChartList.Add(chart);
            return this;
        }

        public Builder Footer(string footer) { FooterVal = footer; return this; }

        public Report Build()
        {
            if (SectionList.Count == 0) throw new InvalidOperationException("Report must have at least one section");
            return new Report(this);
        }
    }
}

class Program
{
    static void Main()
    {
        Report report = new Report.Builder("Q4 Performance Report")
                .Subtitle("October - December 2024")
                .AddSection("Executive Summary", "Revenue grew 15% quarter over quarter.")
                .AddSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M")
                .AddSection("Challenges", "Infrastructure costs increased by 8%.")
                .AddChart("revenue-trend")
                .AddChart("user-growth")
                .Footer("Confidential - Internal Use Only")
                .Build();

        Console.WriteLine(report);
        Console.WriteLine();

        // This should throw an exception
        try
        {
            Report empty = new Report.Builder("Empty Report").Build();
        }
        catch (InvalidOperationException e)
        {
            Console.WriteLine("Error: " + e.Message);
        }
    }
}
```

```typescript
interface Section {
    heading: string;
    content: string;
}

class Report {
    readonly title: string;
    readonly subtitle: string;
    readonly sections: Section[];
    readonly charts: string[];
    readonly footer: string;

    private constructor(builder: InstanceType<typeof Report.Builder>) {
        this.title = builder.titleVal;
        this.subtitle = builder.subtitleVal;
        this.sections = [...builder.sectionList];
        this.charts = [...builder.chartList];
        this.footer = builder.footerVal;
    }

    toString(): string {
        const lines: string[] = [];
        lines.push("========================================");
        lines.push(this.title);
        if (this.subtitle) lines.push(this.subtitle);
        lines.push("========================================");
        this.sections.forEach((sec, i) => {
            lines.push("");
            lines.push(`${i + 1}. ${sec.heading}`);
            lines.push(`   ${sec.content}`);
        });
        if (this.charts.length > 0) {
            lines.push("");
            lines.push(`Charts: [${this.charts.join(", ")}]`);
        }
        if (this.footer) {
            lines.push("");
            lines.push(`--- ${this.footer} ---`);
        }
        return lines.join("\n");
    }

    static Builder = class {
        titleVal: string;
        subtitleVal: string = "";
        sectionList: Section[] = [];
        chartList: string[] = [];
        footerVal: string = "";

        constructor(title: string) { this.titleVal = title; }

        subtitle(subtitle: string): this { this.subtitleVal = subtitle; return this; }

        addSection(heading: string, content: string): this {
            this.sectionList.push({heading, content});
            return this;
        }

        addChart(chart: string): this {
            this.chartList.push(chart);
            return this;
        }

        footer(footer: string): this { this.footerVal = footer; return this; }

        build(): Report {
            if (this.sectionList.length === 0) throw new Error("Report must have at least one section");
            return new Report(this);
        }
    };
}

const report = new Report.Builder("Q4 Performance Report")
        .subtitle("October - December 2024")
        .addSection("Executive Summary", "Revenue grew 15% quarter over quarter.")
        .addSection("Key Metrics", "DAU: 1.2M, MAU: 5.8M, Revenue: $12.3M")
        .addSection("Challenges", "Infrastructure costs increased by 8%.")
        .addChart("revenue-trend")
        .addChart("user-growth")
        .footer("Confidential - Internal Use Only")
        .build();

console.log(report.toString());
console.log();

// This should throw an error
try {
    const empty = new Report.Builder("Empty Report").build();
} catch (e) {
    console.log("Error: " + (e as Error).message);
}
```


