---
id: "lld-uml-activity-diagram"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - UML"
subSection: ""
title: "Activity Diagram"
slug: "lld-uml-activity-diagram"
summary: "Describing complex workflows verbally is like giving someone driving directions with fifteen turns, three conditional detours, and two shortcuts. They'll lose track by turn four."
eli10: "Imagine Activity Diagram as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Activity Diagram Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["LLD","UML","System Design","Architecture"]

---

Describing complex workflows verbally is like giving someone driving directions with fifteen turns, three conditional detours, and two shortcuts. They'll lose track by turn four.

What you need is a map. In UML, that map is an **activity diagram**.

```mermaid
flowchart TD
    Start((Start)) --> A(Enter Credentials)
    A --> B{Valid"}
    B -->|Yes| C(Show Dashboard)
    B -->|No| D(Show Error)
    C --> End((End))
    D --> End

    style Start fill:#00D084,stroke:#000,color:#fff
    style A fill:#00ceff,stroke:#000,color:#000
    style B fill:#ffd43b,stroke:#000,color:#000
    style C fill:#69db7c,stroke:#000,color:#000
    style D fill:#ff8787,stroke:#000,color:#000
    style End fill:#00D084,stroke:#000,color:#fff
```

An Activity Diagram models the workflow of a process, showing the sequence of activities, decision points, parallel execution, and the flow of control from start to finish.

While sequence diagrams show **interactions between objects**, activity diagrams show **the flow of activities** in a process, similar to a flowchart but with more power.

---

# 1. What is an Activity Diagram"

An **Activity Diagram** is a UML diagram that visualizes a workflow. It shows:

- **What** activities/actions happen
- **In what order** they execute
- **Where** decisions are made
- **What** can happen in parallel
- **Who** is responsible (with swimlanes)

### Why Activity Diagrams Matter

If you can describe a workflow in words, why bother drawing it" Because workflows that sound simple in your head quickly become tangled when you try to communicate them precisely. 

Here's why activity diagrams are worth learning well.

#### **Model complex workflows visually**

Workflows involve sequences, branches, loops, and parallel paths. Holding all of that in your head while explaining it verbally is difficult. An activity diagram puts the entire workflow on a single page where everyone can see the structure at once. You can trace any path from start to finish with your finger.

#### **Identify parallel opportunities and bottlenecks**

When you draw out a workflow, you often discover that steps you assumed were sequential can actually run in parallel. Sending a confirmation email doesn't need to wait for inventory to update. Activity diagrams make these opportunities visible. They also expose bottlenecks, steps where multiple paths converge and wait, that you might miss in a verbal description.

#### **Bridge between requirements and implementation**

Requirements say "the system shall process orders." Code says `if (inventory.check(item)) { payment.charge(amount); }`. There's a gap between these two. Activity diagrams sit in that gap. They're concrete enough to map directly to code structure, but abstract enough for non-engineers to read and validate.

---

# 2. Components of an Activity Diagram

Every activity diagram is built from a small set of standard components. Once you recognize these, you can read and draw any activity diagram.

### 2.1 Initial Node (Start)

The starting point of the entire activity. Every activity diagram begins with exactly one initial node, drawn as a **filled black circle**.

```mermaid
flowchart TD
    Start((Start)) --> A(Receive Order)

    style Start fill:#00D084,stroke:#000
    style A fill:#00ceff,stroke:#000,color:#000	
```

Think of it as the "Go" signal. The flow begins here and moves to the first action. No arrows point into the initial node, only outward.

### 2.2 Activity/Action Node

An action node represents a single step or task in the process. It's drawn as a rounded rectangle and labeled with a verb-noun phrase that describes what happens.

```mermaid
flowchart TD
    A(Validate Order) --> B(Calculate Total) --> C(Process Payment)

    style A fill:#00ceff,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#00ceff,stroke:#000,color:#000
```

Naming matters. Good action names are specific and start with a verb. Bad names are vague or describe a state rather than an action.

### Good Names

- Validate Order
- Send Confirmation Email
- Calculate Shipping Cost
- Reserve Inventory
- Generate Invoice

### Bad Names

- Order Validation
- Email
- Shipping
- Inventory Check Done
- Invoice

Each action node should represent one coherent step. If you find yourself writing "Validate Order and Calculate Total" in a single node, split it into two.

### 2.3 Final Node (End)

The endpoint of the entire activity. Drawn as a filled circle inside a larger circle (a bullseye). When the flow reaches a final node, the entire activity terminates, including any parallel branches that might still be running.

```mermaid
flowchart TD
    A(Deliver Order) --> End((End))

    style A fill:#00ceff,stroke:#000,color:#000
    style End fill:#00D084,stroke:#000,color:#fff	
```

A diagram can have multiple final nodes (for example, one at the end of the success path and one at the end of the error path), but reaching any one of them terminates everything.

### 2.4 Flow Final Node

A flow final node terminates only the specific branch it's on, not the entire activity. Drawn as a circle with an X inside.

```mermaid
flowchart TD
    A{Payment Valid"}
    A -->|Yes| B(Continue Order)
    A -->|No| C(Log Error)
    C --> FlowEnd((X))

    style A fill:#ffd43b,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#ff8787,stroke:#000,color:#000
    style FlowEnd fill:#ff8787,stroke:#000,color:#000
```

In this example, the error branch terminates (the logging is done, nothing more happens on that path), but the main activity can continue on other parallel branches. The rest of the system keeps running.

### 2.5 Decision Node

A diamond-shaped node where the flow branches based on a condition. Each outgoing arrow has a guard condition that determines which path the flow takes. The conditions must be mutually exclusive, exactly one path should be followed.

```mermaid
flowchart TD
    A(Check Inventory) --> B{In Stock"}
    B -->|Yes| C(Reserve Item)
    B -->|No| D(Notify Back-Order)

    style A fill:#00ceff,stroke:#000,color:#000
    style B fill:#ffd43b,stroke:#000,color:#000
    style C fill:#69db7c,stroke:#000,color:#000
    style D fill:#ff8787,stroke:#000,color:#000
```

Every decision node needs at least two outgoing paths, and every path must have a guard condition. A decision node with unlabeled branches is ambiguous and will confuse anyone reading the diagram.

### 2.6 Merge Node

A merge node brings multiple alternative paths back together into a single flow. It's also drawn as a diamond, but with multiple incoming arrows and one outgoing arrow. It's the counterpart of a decision node.

```mermaid
flowchart TD
    A{Member Type"}
    A -->|Premium| B(Apply 20% Discount)
    A -->|Standard| C(Apply 5% Discount)
    B --> D{Merge}
    C --> D
    D --> E(Calculate Final Price)

    style A fill:#ffd43b,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#00ceff,stroke:#000,color:#000
    style D fill:#ffd43b,stroke:#000,color:#000
    style E fill:#00ceff,stroke:#000,color:#000
```

The merge doesn't wait for all paths, only one path arrives (since it follows a decision). It simply funnels whichever path was taken into a single downstream flow. Without merge nodes, conditional branches create an ever-expanding number of parallel paths that never reconverge.

### 2.7 Fork Node

A fork splits a single flow into multiple parallel flows that execute simultaneously. Drawn as a thick horizontal bar with one incoming arrow and multiple outgoing arrows.

```mermaid
flowchart TD
    A(Confirm Order) --> Fork[Fork]
    Fork --> B(Send Confirmation Email)
    Fork --> C(Update Inventory)
    Fork --> D(Charge Payment)

    style A fill:#00ceff,stroke:#000,color:#000
    style Fork fill:#69db7c,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#00ceff,stroke:#000,color:#000
    style D fill:#00ceff,stroke:#000,color:#000
```

After the order is confirmed, three things happen in parallel: the email goes out, inventory is updated, and payment is charged. None of these needs to wait for the others.

### 2.8 Join Node

A join synchronizes multiple parallel flows back into one. Also drawn as a thick horizontal bar, but with multiple incoming arrows and one outgoing arrow. The flow after the join only proceeds when all incoming parallel paths have completed.

```mermaid
flowchart TD
    B(Send Confirmation Email) --> Join[Join]
    C(Update Inventory) --> Join
    D(Charge Payment) --> Join
    Join --> E(Complete Order)

    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#00ceff,stroke:#000,color:#000
    style D fill:#00ceff,stroke:#000,color:#000
    style Join fill:#69db7c,stroke:#000,color:#000
    style E fill:#00ceff,stroke:#000,color:#000
```

The order isn't complete until the email is sent, inventory is updated, and payment is charged. The join bar acts as a synchronization point, holding the flow until every parallel branch finishes. Every fork must have a corresponding join. A fork without a join means you have parallel paths that never reconverge, which is usually a design mistake.

---

# 3. Control Flow

Components are the vocabulary. Control flow is the grammar, how you combine components to model real behavior. There are four fundamental patterns.

### 3.1 Sequential Flow

The simplest pattern: activities execute one after another, in order. Each action completes before the next one starts.

```mermaid
flowchart TD
    Start((Start)) --> A(Enter User Details)
    A --> B(Validate Email Format)
    B --> C(Create Account)
    C --> D(Send Welcome Email)
    D --> End((End))

    style Start fill:#00D084,stroke:#000,color:#fff
    style A fill:#00ceff,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#00ceff,stroke:#000,color:#000
    style D fill:#00ceff,stroke:#000,color:#000
    style End fill:#00D084,stroke:#000,color:#fff
```

This is a straightforward user registration flow. Enter details, validate, create the account, send the email. No branching, no parallelism, just one step after another. Most workflows start as sequential flows, and you add complexity (decisions, parallelism) only where the process demands it.

### 3.2 Conditional Flow

The flow branches based on a condition. A decision node splits the path, and a merge node brings the paths back together.

```mermaid
flowchart TD
    Start((Start)) --> A(Enter Credentials)
    A --> B(Validate Credentials)
    B --> C{Valid"}
    C -->|Yes| D(Load Dashboard)
    C -->|No| E(Show Error Message)
    D --> Merge{Merge}
    E --> Merge
    Merge --> End((End))

    style Start fill:#00D084,stroke:#000,color:#fff
    style A fill:#00ceff,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#ffd43b,stroke:#000,color:#000
    style D fill:#69db7c,stroke:#000,color:#000
    style E fill:#ff8787,stroke:#000,color:#000
    style Merge fill:#ffd43b,stroke:#000,color:#000
    style End fill:#00D084,stroke:#000,color:#fff
```

This is a login flow. After validation, the flow takes exactly one of two paths: success (dashboard) or failure (error message). The merge node brings both paths to a single endpoint. Notice that only one branch executes, this is the key difference from parallel flow, where all branches execute.

### 3.3 Parallel Flow

Multiple activities execute simultaneously after a fork, and a join synchronizes them before the flow continues.

```mermaid
flowchart TD
    Start((Start)) --> A(Confirm Order)
    A --> Fork[Fork]
    Fork --> B(Send Confirmation Email)
    Fork --> C(Reserve Inventory)
    Fork --> D(Process Payment)
    B --> Join[Join]
    C --> Join
    D --> Join
    Join --> E(Generate Invoice)
    E --> End((End))

    style Start fill:#00D084,stroke:#000,color:#fff
    style A fill:#00ceff,stroke:#000,color:#000
    style Fork fill:#69db7c,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#00ceff,stroke:#000,color:#000
    style D fill:#00ceff,stroke:#000,color:#000
    style Join fill:#69db7c,stroke:#000,color:#000
    style E fill:#00ceff,stroke:#000,color:#000
    style End fill:#00D084,stroke:#000,color:#fff
```

After the order is confirmed, three things happen at once: email, inventory reservation, and payment processing. The invoice is generated only after all three are done. This pattern is critical for performance. If each step takes 2 seconds and they run sequentially, that's 6 seconds. In parallel, it's 2 seconds (the slowest one).

### 3.4 Loop Flow

Activities repeat until a condition is met. This is modeled by routing the flow back from a decision node to an earlier action.

```mermaid
flowchart TD
    Start((Start)) --> A(Enter PIN)
    A --> B(Validate PIN)
    B --> C{Correct"}
    C -->|Yes| D(Grant Access)
    C -->|No| E{Attempts < 3"}
    E -->|Yes| A
    E -->|No| F(Lock Account)
    D --> End((End))
    F --> End

    style Start fill:#00D084,stroke:#000,color:#fff
    style A fill:#00ceff,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#ffd43b,stroke:#000,color:#000
    style D fill:#69db7c,stroke:#000,color:#000
    style E fill:#ffd43b,stroke:#000,color:#000
    style F fill:#ff8787,stroke:#000,color:#000
    style End fill:#00D084,stroke:#000,color:#fff
```

The user enters a PIN. If it's wrong, the flow checks whether they have remaining attempts. If yes, it loops back to "Enter PIN." If they've exhausted all attempts, the account is locked. This pattern appears in any retry logic: PIN entry, password validation, API call retries with backoff.

---

# 4. Swimlanes (Partitions)

So far, our diagrams show what happens but not who does it. Swimlanes (also called partitions) divide the diagram into lanes, one per actor or system component, so you can see exactly who is responsible for each activity.

```mermaid
flowchart TD
    subgraph Customer
        A(Browse Products) --> B(Add to Cart) --> C(Place Order)
    end

    subgraph System
        D(Validate Order) --> E{Payment Successful"}
        E -->|Yes| F(Confirm Order)
        E -->|No| G(Show Payment Error)
    end

    subgraph Warehouse
        H(Pick Items) --> I(Pack Order) --> J(Ship Order)
    end

    C --> D
    F --> H
    G --> B

    style A fill:#00ceff,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#00ceff,stroke:#000,color:#000
    style D fill:#ffa94d,stroke:#000,color:#000
    style E fill:#ffd43b,stroke:#000,color:#000
    style F fill:#ffa94d,stroke:#000,color:#000
    style G fill:#ff8787,stroke:#000,color:#000
    style H fill:#9775fa,stroke:#000,color:#000
    style I fill:#9775fa,stroke:#000,color:#000
    style J fill:#9775fa,stroke:#000,color:#000
```

This e-commerce workflow spans three participants. The Customer browses and places the order. The System validates and processes payment. The Warehouse picks, packs, and ships.

Let's trace the handoffs. When the Customer places the order, control passes from the Customer lane to the System lane for validation. If payment succeeds, control passes from System to Warehouse for fulfillment. If payment fails, control passes back to the Customer lane. Each crossing between lanes is a handoff, a point where responsibility transfers from one actor to another.

Swimlanes provide several benefits:

- **Clear responsibility assignment.** Everyone can see who does what at a glance.
- **Handoff visibility.** Arrows crossing lane boundaries reveal integration points between teams or systems.
- **Bottleneck detection.** If one lane has twenty actions and another has two, the workload is unbalanced.
- **Implementation guidance.** Each lane often maps to a service, a team, or a module in the actual system.
- **Communication tool.** Non-technical stakeholders can read swimlanes to verify the business process matches their expectations.

---

# 5. How to Create an Activity Diagram

### Step 1: Identify the Process

 What workflow are you modeling" Be specific. "Order processing" is better than "the system." "ATM withdrawal" is better than "banking." 

Name the process before you start drawing.

### Step 2: List All Activities

Write down every action that happens in the workflow, in rough order. Don't worry about structure yet. Just get the steps on paper. For an ATM withdrawal: insert card, validate card, enter PIN, verify PIN, select amount, check balance, dispense cash, eject card, print receipt.

```mermaid
flowchart LR
    subgraph Activities["Order Processing "]
        B[Validate Order]:::primary
        D[Process Payment]:::primary
        E[Update Inventory]:::primary
        F[Send Confirmation]:::primary
        G[Ship Order]:::primary
    end

    classDef primary fill:#00ceff,stroke:#000,color:#000
```

### **Step 3: Determine the sequence**

Arrange the activities in chronological order. Which step must complete before the next can begin" This gives you the basic sequential flow.

### Step 4: Identify Decision Points

Where does the flow branch" Look for conditions: valid/invalid, in stock/out of stock, payment success/failure. Each condition becomes a decision node with guard labels on the outgoing arrows.

### Step 5: Identify Parallel Activities

Which steps are independent of each other and can run at the same time" 

Sending a receipt and updating the account balance don't depend on each other. These become fork/join pairs.

### Step 6: **Add swimlanes if needed**

If multiple actors or systems are involved, divide the diagram into lanes. This step is optional for simple workflows but valuable for anything involving handoffs between components or teams.

---

# 6. Complete Example: ATM Withdrawal

Let's build a comprehensive activity diagram for an ATM withdrawal. This example naturally contains all four control flow types: sequential steps, conditional branching, a retry loop, and opportunities for parallelism.

```mermaid
flowchart TD
    Start((Start)) --> A(Insert Card)
    A --> B(Read Card Data)
    B --> C{Card Valid"}

    C -->|No| D(Display Invalid Card Message)
    D --> E(Eject Card)
    E --> End1((End))

    C -->|Yes| F(Prompt for PIN)
    F --> G(Enter PIN)
    G --> H{PIN Correct"}

    H -->|Yes| I(Display Menu)
    H -->|No| J{Attempts < 3"}
    J -->|Yes| F
    J -->|No| K(Retain Card)
    K --> L(Display Account Locked Message)
    L --> End2((End))

    I --> M(Select Withdrawal)
    M --> N(Enter Amount)
    N --> O{Sufficient Balance"}

    O -->|No| P(Display Insufficient Funds)
    P --> I

    O -->|Yes| Q(Debit Account)
    Q --> Fork[Fork]
    Fork --> R(Dispense Cash)
    Fork --> S(Print Receipt)
    R --> Join[Join]
    S --> Join
    Join --> T(Eject Card)
    T --> U(Display Thank You)
    U --> End3((End))

    style Start fill:#00D084,stroke:#000,color:#fff
    style A fill:#00ceff,stroke:#000,color:#000
    style B fill:#00ceff,stroke:#000,color:#000
    style C fill:#ffd43b,stroke:#000,color:#000
    style D fill:#ff8787,stroke:#000,color:#000
    style E fill:#00ceff,stroke:#000,color:#000
    style End1 fill:#00D084,stroke:#000,color:#fff
    style F fill:#00ceff,stroke:#000,color:#000
    style G fill:#00ceff,stroke:#000,color:#000
    style H fill:#ffd43b,stroke:#000,color:#000
    style I fill:#00ceff,stroke:#000,color:#000
    style J fill:#ffd43b,stroke:#000,color:#000
    style K fill:#ff8787,stroke:#000,color:#000
    style L fill:#ff8787,stroke:#000,color:#000
    style End2 fill:#00D084,stroke:#000,color:#fff
    style M fill:#00ceff,stroke:#000,color:#000
    style N fill:#00ceff,stroke:#000,color:#000
    style O fill:#ffd43b,stroke:#000,color:#000
    style P fill:#ff8787,stroke:#000,color:#000
    style Q fill:#00ceff,stroke:#000,color:#000
    style Fork fill:#69db7c,stroke:#000,color:#000
    style R fill:#00ceff,stroke:#000,color:#000
    style S fill:#00ceff,stroke:#000,color:#000
    style Join fill:#69db7c,stroke:#000,color:#000
    style T fill:#00ceff,stroke:#000,color:#000
    style U fill:#69db7c,stroke:#000,color:#000
    style End3 fill:#00D084,stroke:#000,color:#fff
```

Let's walk through each section of this diagram.

#### **Card validation (sequential + conditional)**

The flow starts with inserting and reading the card. The first decision checks whether the card is valid. If it's not (expired, wrong bank, damaged), the ATM displays an error, ejects the card, and terminates. This is the simplest error path.

#### **PIN entry (loop)**

If the card is valid, the ATM prompts for a PIN. After the user enters it, a decision checks whether it's correct. If yes, the flow moves to the menu. If no, another decision checks the attempt count. If attempts remain, the flow loops back to "Prompt for PIN." If three wrong attempts have been made, the card is retained and the account is locked. This loop-with-exit pattern appears in any retry scenario.

#### **Balance check (conditional)**

The user selects withdrawal and enters an amount. The ATM checks whether the account has sufficient funds. If not, it displays an error and returns to the menu (letting the user try a different amount). If the balance is sufficient, the flow continues to dispensing.

#### **Dispensing (parallel)**

After debiting the account, two things happen simultaneously: cash is dispensed and the receipt is printed. These are independent operations, the printer doesn't need to wait for the cash dispenser, and the cash dispenser doesn't need the receipt. The fork/join pair models this concurrency.
