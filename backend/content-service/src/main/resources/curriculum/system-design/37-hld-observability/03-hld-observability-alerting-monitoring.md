---
id: "hld-observability-alerting-monitoring"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "HLD - Observability"
subSection: ""
title: "Alerting & Monitoring"
slug: "hld-observability-alerting-monitoring"
summary: "Alerting turns important observability signals into timely notifications when a system needs human attention."
eli10: "Imagine Alerting & Monitoring as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Alerting & Monitoring Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Intermediate"
estimatedMinutes: 15
tags: ["HLD","Observability","System Design","Architecture"]

---

Alerting turns important observability signals into timely notifications when a system needs human attention.

In production systems, alerting must balance detection with noise. Too few alerts miss problems, too many alerts create fatigue, and poorly defined alerts fire during normal operation instead of pointing to actionable issues.

In this chapter, you will learn how to design actionable alerts, route and escalate them, reduce alert fatigue, and support healthy on-call response.

---

# The Purpose of Alerting

> [!PAYWALL] This content is for premium members only.

Alerts serve one purpose: to get human attention when automated systems cannot handle a problem.

```mermaid
flowchart TB
    subgraph "Good Alert"
        P[Problem detected]:::red --> A[Alert fires]:::orange
        A --> H[Human investigates]:::primary
        H --> F[Problem fixed]:::green
    end

    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

### When to Alert

Alert when users are impacted or will be impacted soon, automated remediation failed or is not possible, and human judgment is required. Do not alert when the system can fix itself, nothing can be done until business hours, or the information is interesting but not actionable.

### The Alert Spectrum

```mermaid
flowchart LR
    subgraph "Alert Types"
        P[Page<br/>Wake someone up]:::red
        T[Ticket<br/>Fix during business hours]:::orange
        L[Log/Dashboard<br/>Investigate when convenient]:::green
    end

    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

| Severity | Response Time | Examples |
|----------|--------------|----------|
| **Page** | Minutes | Service down, high error rate, data loss |
| **Ticket** | Hours to days | Disk 80% full, certificate expiring in 7 days |
| **Log only** | When convenient | Performance degradation, unusual patterns |

**Interview Insight:** When discussing alerting, emphasize that every page-level alert must be actionable. If you are waking someone up, they must be able to do something about it immediately.

---

# Designing Good Alerts

A good alert has these characteristics:

### 1. Actionable

Every alert must require human action. If the recipient cannot do anything, it should not be an alert.

### 2. Relevant

Alert on symptoms (user impact) rather than causes (system metrics):

### 3. Clear

The alert message should explain what is wrong:

### 4. Timely

Alert early enough to prevent user impact, but not so early that it creates false positives:

### Alert Message Format

Include these elements in every alert:

Example:

---

# Alerting Architecture

A typical alerting system has several components:

```mermaid
flowchart TB
    subgraph Sources
        M[Metrics<br/>Prometheus]:::primary
        L[Logs<br/>Elasticsearch]:::primary
        T[Traces<br/>Jaeger]:::primary
    end

    subgraph "Alert Engine"
        R[Alert Rules]:::orange
        E[Evaluation]:::orange
    end

    subgraph "Alert Manager"
        D[Deduplication]:::teal
        G[Grouping]:::teal
        S[Silencing]:::teal
        Route[Routing]:::teal
    end

    subgraph Notifications
        PD[PagerDuty]:::purple
        Slack[Slack]:::purple
        Email[Email]:::purple
    end

    M --> R
    L --> R
    T --> R
    R --> E
    E --> D --> G --> S --> Route
    Route --> PD
    Route --> Slack
    Route --> Email

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef purple fill:#9775fa,stroke:#000,color:#000
```

### Alert Rules

Rules define when to alert based on metrics:

### Alert Manager

The alert manager processes firing alerts:

**Deduplication:** Same alert firing multiple times becomes one notification

**Grouping:** Related alerts are grouped together:

**Silencing:** Temporarily suppress alerts during maintenance

**Routing:** Send alerts to the right team based on labels

---

# Alert Routing and Escalation

Different alerts go to different teams through different channels.

### Routing Rules

```mermaid
flowchart TB
    A[Alert Fires]:::red --> R{Route by Labels}:::yellow

    R --> |service=payment| P[Payments Team]:::primary
    R --> |service=api| API[Platform Team]:::primary
    R --> |severity=critical| Oncall[On-Call]:::orange
    R --> |severity=warning| Ticket[Ticketing System]:::teal

    P --> PD1[PagerDuty]:::purple
    API --> PD2[PagerDuty]:::purple
    Oncall --> PD3[PagerDuty]:::purple
    Ticket --> Jira[Jira]:::purple

    classDef red fill:#ff8787,stroke:#000,color:#000
    classDef yellow fill:#ffd43b,stroke:#000,color:#000
    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef purple fill:#9775fa,stroke:#000,color:#000
```

### Routing Configuration Example

### Escalation

If an alert is not acknowledged within a time window, escalate to backup:

Escalation ensures critical alerts do not go unnoticed if the primary responder is unavailable.

---

# Alert Fatigue

Alert fatigue is when too many alerts cause responders to ignore them. This is dangerous because real problems get missed.

### Causes of Alert Fatigue

```mermaid
flowchart TB
    subgraph "Causes"
        F1[Flapping alerts<br/>On/off repeatedly]:::orange
        F2[Low-priority pages<br/>Waking up for non-issues]:::orange
        F3[Duplicate alerts<br/>Same issue, many alerts]:::orange
        F4[Non-actionable alerts<br/>Nothing to do]:::orange
        F5[Threshold too low<br/>Normal operation triggers]:::orange
    end

    subgraph "Result"
        FA[Alert Fatigue]:::red --> I[Ignoring alerts]:::red
        I --> M[Missing real problems]:::red
    end

    F1 --> FA
    F2 --> FA
    F3 --> FA
    F4 --> FA
    F5 --> FA

    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
```

### Measuring Alert Health

Track these metrics for your alerting system:

| Metric | Target | Meaning |
|--------|--------|---------|
| **Alerts per week** | <20 per person | Volume is manageable |
| **False positive rate** | <10% | Most alerts are real |
| **Time to acknowledge** | <5 min for critical | Alerts are being seen |
| **Alerts per incident** | <3 | Good grouping |
| **Flapping alerts** | 0 | Stable thresholds |

### Reducing Alert Fatigue

**1. Raise thresholds**

If an alert fires frequently without user impact, the threshold is too low:

**2. Add duration requirements**

Brief spikes are often normal:

**3. Alert on symptoms, not causes**

Users care about errors, not CPU:

**4. Implement auto-remediation**

If a problem can be fixed automatically, do not page:

**5. Group related alerts**

One incident should generate one notification:

---

# On-Call Best Practices

On-call is the practice of having engineers available to respond to alerts outside business hours.

### On-Call Rotation

```mermaid
flowchart LR
    subgraph "Week 1"
        A[Alice]:::primary
    end
    subgraph "Week 2"
        B[Bob]:::primary
    end
    subgraph "Week 3"
        C[Carol]:::primary
    end
    subgraph "Week 4"
        D[Dave]:::primary
    end

    A --> B --> C --> D --> A

    classDef primary fill:#00ceff,stroke:#000,color:#000
```

Healthy rotations share the burden weekly, include primary and secondary coverage, allow shift swaps for personal needs, and compensate on-call time through time off or pay.

### On-Call Responsibilities

During on-call shifts, responders acknowledge pages within SLA, investigate and mitigate issues, escalate when needed, and document incidents.

### Reducing On-Call Burden

Reducing on-call burden means fixing recurring alerts, improving automation, writing better runbooks, using post-incident reviews to prevent recurrence, and keeping thresholds reasonable so responders are not paged for noise.

### On-Call Health Metrics

| Metric | Healthy | Action Needed |
|--------|---------|---------------|
| **Pages per shift** | <5 | Investigate if higher |
| **Night pages** | <2 per month | Prioritize fixing |
| **MTTR** | <30 min | Improve runbooks |
| **Escalations** | <10% | Training or coverage |

---

# Common Alerting Patterns

### Pattern 1: Symptom-Based Alerting

Alert on what users experience, not internal metrics:

### Pattern 2: Multi-Window Alerting

Use different windows for different severities:

Short windows catch severe problems fast. Long windows avoid false positives.

### Pattern 3: Burn Rate Alerting

Alert based on how fast you are consuming error budget (covered in SLO chapter):

### Pattern 4: Anomaly Detection

Alert when metrics deviate from normal patterns:

```mermaid
flowchart LR
    subgraph Normal
        N[Traffic follows<br/>daily pattern]:::green
    end

    subgraph Anomaly
        A[Traffic 50% below<br/>expected for this hour]:::red
    end

    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef red fill:#ff8787,stroke:#000,color:#000
```

This is useful for detecting traffic drops that threshold alerts often miss, catching unusual patterns, and monitoring services with variable baselines.

---

# Common Alerting Anti-Patterns

### Anti-Pattern 1: Alert on Every Metric

### Anti-Pattern 2: Immediate Alerts

### Anti-Pattern 3: Binary Thresholds

### Anti-Pattern 4: Alerting Without Runbooks

### Anti-Pattern 5: Silencing Instead of Fixing

---

# Summary

Alerting transforms observability data into action. Good alerts are actionable, relevant, clear, timely, focused on user-facing symptoms, and packaged with enough context to start investigation quickly.

Alert management keeps response sane through deduplication, grouping, routing, and escalation. Alert fatigue is reduced by tuning thresholds, adding duration requirements, fixing noisy alerts, using auto-remediation where appropriate, and tracking alert health. Healthy on-call practice depends on fair rotation, clear SLAs, incident documentation, review, and continuous improvement.

---

# Quiz
