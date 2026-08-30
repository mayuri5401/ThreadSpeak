---
id: "lld-social-content-platforms-design-social-network-like-facebook"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Social Content Platforms"
subSection: ""
title: "Design Social Network like Facebook"
slug: "lld-social-content-platforms-design-social-network-like-facebook"
summary: "In this chapter, we will explore the low-level design of a simplified social network in detail."
eli10: "Imagine Design Social Network like Facebook as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Social Network like Facebook Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Social Content Platforms","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Social Network like Facebook"
  code: |
    $cb
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is a Social Network"
>
> A **social network** (like facebook) is an online platform that enables users to connect with friends, share content, and interact with each other through likes, comments, and messages.
>
> 
> <!-- Simulation: facebook -->
> 

>
> Core features include user profiles, friend relationships, a news feed, and the ability to post text, images, or other media.

In this chapter, we will explore the **low-level design of a simplified social network** in detail.

Let’s start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before jumping into the design, it’s essential to clarify what features we’re expected to implement and what can be left out. This helps ensure a focused, manageable, and realistic scope for the interview setting.

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate**: Should the system support both posts and comments"
>
> **Interviewer**: Yes, users should be able to create posts and comment on posts. Comments should also support nested replies.
>
> **Candidate**: Can users like both posts and comments"
>
> **Interviewer**: For now, let’s support likes only on posts to keep the design simple.
>
> **Candidate**: Should each user have a personal feed" If so, how should it be generated"
>
> **Interviewer**: Yes, each user should have a personalized feed that shows posts made by their friends. You can start with a chronological ordering strategy.
>
> **Candidate**: Is there a concept of privacy (e.g., public vs. private posts)"
>
> **Interviewer**: Not required for this version. All posts are visible to a user's friends.
>
> **Candidate**: Should we allow deleting or editing posts or comments"
>
> **Interviewer**: No, you can omit editing and deleting functionality for now.

## 1.1 Functional Requirements

- Users can register with a name and email.
- Users can add other users as friends (bidirectional friendship).
- Users can create text-based posts.
- Users can comment on posts and reply to comments (nested comments).
- Users can like posts and comments.
- Each user has a **personalized feed** showing posts from friends.
- Users receive notifications when someone likes or comments on their post.

## 1.2 Non-Functional Requirements

- The system should follow **object-oriented design principles** with clean separation of concerns.
- It should be **modular and extensible** to support future features like media content, reactions, and privacy controls.
- The system should be designed for **testability and maintainability**.

After the requirements are clear, the next step is to identify the core entities that we will form the foundation of our design.

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the fundamental building blocks of our system. We identify them by analyzing the functional requirements and highlighting the key nouns and responsibilities that naturally map to object-oriented abstractions such as classes, enums, or interfaces.

Let’s walk through the functional requirements and extract the relevant entities:

#### **Users must be able to register, connect with friends, and have a profile.**

The most fundamental entity is the `User`. This class will represent an individual in the network, holding their profile information (ID, name) and, crucially, their connections to other users (a set of friends).

#### **Users can create content, primarily as posts, and interact with them via comments and likes.**

This requirement points to content-related entities. The primary piece of content is a `Post`. Users can also add a `Comment` to a post. Both posts and comments can be liked and can themselves be commented on (in the case of nested comments). This shared functionality—having an author, content, likes, and a list of comments—suggests a common base abstraction. We'll define an abstract class `CommentableEntity` to encapsulate this shared behavior, with Post and Comment as concrete subclasses.

#### **The system must provide a News Feed for each user, showing posts from their friends.**

Generating a news feed involves collecting posts from a user's friends and ordering them. The ordering logic could vary (e.g., chronological, algorithmic). This flexibility is a perfect use case for the Strategy pattern. We will define a `NewsFeedGenerationStrategy` interface to represent different feed-building algorithms. A `NewsFeedService` will then use a concrete strategy to generate the feed for a given user.

#### **When a user performs an action (e.g., creates a post, likes, or comments), other relevant users should be notified.**

This is an event-driven requirement. We need a mechanism to broadcast events to interested listeners. This leads to the Observer pattern. We'll define a `PostObserver` interface for objects that want to react to post-related events. A concrete `UserNotifier` can then implement this interface to send notifications. The service responsible for posts will notify all registered observers of any changes.

#### **The system needs to manage all the data (users, posts) and orchestrate the core operations.**

To separate concerns, we'll introduce a service layer. A `UserService` will handle user-related logic like creation and adding friends. A **PostService** will manage the lifecycle of posts, including creation, liking, and commenting. To handle data persistence, these services will rely on Repository classes like `UserRepository` and `PostRepository`, which are responsible for storing and retrieving data objects.

#### **The system should expose a simple, unified API for client applications.**

To hide the internal complexity of the various services, repositories, and patterns, we can introduce a single entry point. A `SocialNetworkFacade` class will serve this purpose, providing a clean and simple interface for all high-level actions like creating a user, making a post, or fetching a news feed.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - **User**: Represents a user of the social network. It holds their profile data and a list of their friends.
> - **CommentableEntity**: An abstract base class representing any piece of content that can be liked or commented on. It contains common properties like an author, content, likes, and comments.
> - **Post**: A concrete subclass of CommentableEntity that represents a top-level post made by a user.
> - **Comment**: A concrete subclass of CommentableEntity that represents a comment on another CommentableEntity.
> - **Repository (UserRepository, PostRepository)**: Classes that manage the in-memory storage and retrieval of core domain objects (User, Post). They implement the Singleton pattern to ensure a single data source.
> - **PostObserver**: An interface defining a contract for objects that need to be notified of events related to posts (Observer Pattern). UserNotifier is a concrete implementation.
> - **NewsFeedGenerationStrategy**: An interface that defines a contract for different algorithms to generate a user's news feed (Strategy Pattern).
> - **Service Layer (UserService, PostService, NewsFeedService)**: A set of classes that encapsulate the core business logic of the application, separating it from data access and the presentation layer.
> - **SocialNetworkFacade**: A single class that provides a simplified, high-level interface to the entire system, hiding the complexities of the underlying services (Facade Pattern).

---

# 3. Designing Classes and Relationships

This section details the design of each class identified previously, including their specific attributes and methods. We will also illustrate how these classes relate to one another and highlight the key design patterns that underpin our solution.

## 3.1 Class Definitions

### Core Classes

#### User

 Represents a user in the social network, holding their personal information, connections, and their published content.

**Attributes**:

- id: A unique String identifier for the user.
- name: The String name of the user.
- email: The String email address of the user.
- friends: A Set<User> storing references to the user's friends.
- posts: A List<Post> storing all posts created by this user.

**Methods**

- addFriend(User friend)
- addPost(Post post).

#### CommentableEntity

An abstract class that establishes a common structure and behavior for any entity that can be liked and commented on, such as posts and comments.

**Attributes**:

- id: A unique String identifier for the entity.
- author: A User object representing the creator of the entity.
- content: The String content of the entity.
- timestamp: A LocalDateTime indicating when the entity was created.
- likes: A Set<User> storing users who liked this entity.
- comments: A List<Comment> storing comments on this entity.

**Methods**:

- addLike(User user)
- addComment(Comment comment)
- getters for attributes.

#### **Post** **(Extends** **CommentableEntity)**

Represents a user-generated post. It inherits common properties from CommentableEntity.

#### **Comment (Extends CommentableEntity)**

Represents a comment on a Post or another Comment. It also inherits common properties from CommentableEntity.

**Methods:**

- getReplies() (which returns getComments())

### Repository

These classes are responsible for data persistence. They act as in-memory data stores for User and Post objects, providing basic CRUD operations and enforcing a single instance throughout the application.

#### UserRepository

#### PostRepository

#### UserService

Manages user-related operations, including creation, friendship management, and retrieval. It interacts with UserRepository.

**Attributes**:

- userRepository (an instance of UserRepository).

**Methods**:

- createUser(String name, String email)
- addFriend(String userId1, String userId2)
- getUserById(String userId).

#### PostService

Manages post-related operations. It's responsible for creating posts, handling likes and comments, and notifying observers of these events.

**Attributes**:

- postRepository (an instance of PostRepository).
- observers: A List<PostObserver> to hold registered observers.

**Methods:**

- addObserver(PostObserver observer)
- createPost(User author, String content)
- likePost(User user, String postId)
- addComment(User author, String commentableId, String content).

#### NewsfeedService

Generates news feeds for users based on a configurable strategy.

- **Attributes**: strategy (an instance of NewsFeedGenerationStrategy).
- **Methods**: setStrategy(NewsFeedGenerationStrategy strategy), getNewsFeed(User user).

#### SocialNetworkFacade

Acts as a simplified entry point to the entire social network, orchestrating calls to the various services.

- **Attributes**: userService, postService, newsFeedService.
- **Methods**: Public methods that mirror the core functionalities of the system (e.g., createUser, createPost, getNewsFeed).

## 3.2 Class Relationships

### **Inheritance**

- Post **inherits from** CommentableEntity.
- Comment **inherits from** CommentableEntity.

### **Composition**

- User **has a collection of** User objects (friends).
- User **has a collection of** Post objects.
- CommentableEntity **has a** User (author), a Set<User> (likes), and a List<Comment> (comments).
- SocialNetworkFacade **has instances of** UserService, PostService, and NewsFeedService.
- PostService **has a list of** PostObserver objects.
- NewsFeedService **has an** NewsFeedGenerationStrategy.

### **Dependency / "Uses-a"**

- UserService **uses** UserRepository.
- PostService **uses** PostRepository.
- PostService **uses** PostObserver objects.
- NewsFeedService **uses** NewsFeedGenerationStrategy.
- SocialNetworkFacade **uses** UserService, PostService, and NewsFeedService.
- Concrete PostObserver and NewsFeedGenerationStrategy implementations use User, Post, and Comment objects.

## 3.3 Key Design Patterns

### [Strategy Pattern](/learn/lld/strategy)

The NewsFeedGenerationStrategy interface and its concrete implementations (like ChronologicalStrategy) allow us to swap out different algorithms for generating news feeds. The NewsFeedService can use any strategy that adheres to the interface, making the feed generation logic flexible and extensible.

### [Observer Pattern](/learn/lld/observer)

The PostObserver interface and the UserNotifier implementation, along with the PostService's list of observers, form a classic Observer pattern. This allows the PostService to notify other parts of the system (like UserNotifier) when a post is created, liked, or commented on, without the PostService needing to know about specific listeners.

### [**Template Method Pattern**](/learn/lld/template-method)** (Implicit within** **CommentableEntity)**

The abstract class CommentableEntity can be seen as having a skeletal structure for creating commentable items. Although not a full Template Method implementation here, the base class provides a common framework for derived classes (Post, Comment) to build upon, with some methods (like getComments()) potentially having default implementations or expecting overrides.

### [**Repository Pattern**](/learn/lld/repository)

The UserRepository and PostRepository classes abstract the data access logic. This separation makes it easier to change the underlying data storage mechanism (e.g., from in-memory maps to a database) without affecting the services that use them.

### [**Facade Pattern**](/learn/lld/facade)

The SocialNetworkFacade class acts as a Facade. It provides a unified, high-level interface to the complex underlying services (UserService, PostService, NewsFeedService). Clients interact with the Facade, which simplifies the overall system interaction and hides the internal complexity.

### [**Singleton Pattern**](/learn/lld/singleton)

Used for the UserRepository and PostRepository to ensure that there's a single point of access for data management.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 CommentableEntity

```java
$cb
```

### 4.2 User

```java
class User {
    private final String id;
    private final String name;
    private final String email;
    private final Set<User> friends = new HashSet<>();
    private final List<Post> posts = new ArrayList<>();

    public User(String name, String email) {
        this.id = UUID.randomUUID().toString();
        this.name = name;
        this.email = email;
    }

    public void addFriend(User friend) {
        friends.add(friend);
    }

    public  void addPost(Post post) {
        posts.add(post);
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public Set<User> getFriends() { return friends; }
    public List<Post> getPosts() { return posts; }
}
```

### 4.3 Repository

```java
class UserRepository {
    private static final UserRepository INSTANCE = new UserRepository();
    private final Map<String, User> users = new ConcurrentHashMap<>();

    private UserRepository() {}

    public static UserRepository getInstance() {
        return INSTANCE;
    }

    public void save(User user) {
        users.put(user.getId(), user);
    }

    public User findById(String id) {
        return users.get(id);
    }
}

class PostRepository {
    private static final PostRepository INSTANCE = new PostRepository();
    private final Map<String, Post> posts = new ConcurrentHashMap<>();

    private PostRepository() {}

    public static PostRepository getInstance() { return INSTANCE; }

    public void save(Post post) {
        posts.put(post.getId(), post);
    }

    public Post findById(String id) {
        return posts.get(id);
    }
}
```

### 4.4 PostObserver

```java
interface PostObserver {
    void onPostCreated(Post post);
    void onLike(Post post, User user);
    void onComment(Post post, Comment comment);
}

class UserNotifier implements PostObserver {
    @Override
    public void onPostCreated(Post post) {
        User author = post.getAuthor();
        for (User friend: author.getFriends()) {
            System.out.println("Notification for " + friend.getName() + ": " + author.getName() + " created a new post: " + post.getContent());
        }
    }

    @Override
    public void onLike(Post post, User user) {
        User author = post.getAuthor();
        System.out.println("Notification for " + author.getName() + ": " + user.getName() + " liked your post");
    }

    @Override
    public void onComment(Post post, Comment comment) {
        User author = post.getAuthor();
        System.out.println("Notification for " + author.getName() + ": " + comment.getAuthor().getName() + " commented on your post");
    }
}
```

### 4.5 UserService

```java
class UserService {
    private final UserRepository userRepository = UserRepository.getInstance();

    public User createUser(String name, String email) {
        User user = new User(name, email);
        userRepository.save(user);
        return user;
    }

    public void addFriend(String userId1, String userId2) {
        User user1 = userRepository.findById(userId1);
        User user2 = userRepository.findById(userId2);

        user1.addFriend(user2);
        user2.addFriend(user1);
    }

    public User getUserById(String userId) {
        return userRepository.findById(userId);
    }
}
```

### 4.6 PostService

```java
$d5
```

### 4.7 NewsFeedGenerationStrategy

```java
interface NewsFeedGenerationStrategy {
    List<Post> generateFeed(User user);
}

class ChronologicalStrategy implements NewsFeedGenerationStrategy {
    @Override
    public List<Post> generateFeed(User user) {
        Set<User> friends = user.getFriends();
        List<Post> feed = new ArrayList<>();

        for (User friend: friends) {
            feed.addAll(friend.getPosts());
        }

        // Sort posts by timestamp in reverse (most recent first)
        feed.sort((p1, p2) -> p2.getTimestamp().compareTo(p1.getTimestamp()));

        return feed;
    }
}
```

### 4.8 NewsFeedService

```java
class NewsFeedService {
    private NewsFeedGenerationStrategy strategy;

    public NewsFeedService() {
        this.strategy = new ChronologicalStrategy(); // Default strategy
    }

    public void setStrategy(NewsFeedGenerationStrategy strategy) {
        this.strategy = strategy;
    }

    public List<Post> getNewsFeed(User user) {
        return strategy.generateFeed(user);
    }
}
```

### 4.9 SocialNetworkFacade

```java
$db
```

### 4.10 SocialNetworkDemo

```java
$e1
```

---

# 5. Run and Test

---

# 6. Quiz
