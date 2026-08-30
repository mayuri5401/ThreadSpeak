---
id: "lld-social-content-platforms-design-music-streaming-service-like-spotify"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Social Content Platforms"
subSection: ""
title: "Design Music Streaming Service like Spotify"
slug: "lld-social-content-platforms-design-music-streaming-service-like-spotify"
summary: "In this chapter, we will explore the low-level design of a Spotify like service in detail."
eli10: "Imagine Design Music Streaming Service like Spotify as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Music Streaming Service like Spotify Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Social Content Platforms","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Music Streaming Service like Spotify"
  code: |
    enum SubscriptionTier {
        FREE,
        PREMIUM
    }
    
    enum PlayerStatus {
        PLAYING,
        PAUSED,
        STOPPED
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is Spotify"
>
> **Spotify** is a popular digital music streaming platform that gives users access to a vast library of songs, albums, podcasts, and audio content from artists and creators around the world.
>
> 
> <!-- Simulation: spotify -->
> 

>
> It offers features such as:
>
> - Searching and playing tracks on-demand
> - Creating personalized playlists
> - Following favorite artists or albums
> - Streaming audio over the internet, either via an ad-supported free tier or an ad-free premium subscription

In this chapter, we will explore the **low-level design of a Spotify like service** in detail.

Lets start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting the design, it's important to ask thoughtful questions to uncover hidden assumptions and better define the scope of the system.

Here is an example of how a conversation between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** Should we support both free and premium users"
>
> **Interviewer:** Yes. Free users should experience occasional ads during playback. Premium users should enjoy uninterrupted, ad-free listening.
>
> **Candidate:** Do users interact only with individual songs, or can they also play albums and playlists"
>
> **Interviewer:** Users should be able to play individual songs, albums, and playlists. These should be handled uniformly.
>
> **Candidate:** Should users be able to follow artists and get notified when a new album is released"
>
> **Interviewer:** Yes. Users can follow artists and should receive notifications whenever those artists release new albums.
>
> **Candidate:** Should the music player support playback controls like play, pause, and next track"
>
> **Interviewer:** Yes. The user should be able to control playback using these actions. The player should behave differently based on its current state (stopped, playing, paused).
>
> **Candidate:** Is search functionality in scope"
>
> **Interviewer:** Yes. Users should be able to search for songs by title and artists by name.
>
> **Candidate:** Do we want to show song recommendations"
>
> **Interviewer:** Yes. Include a simple recommendation engine. For now, simulate genre-based or randomized recommendations.

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- Support both **free** and **premium** tiers for users
- Support adding **songs**, **albums**, **playlists**, and **artists**
- Allow users to **play** songs, albums, and playlists uniformly
- Support **playback controls**: play, pause, and skip (next track).
- Support creation and management of **playlists** (create, delete, add/remove songs)
- Allow users to **search** for songs by title or search for artists by name
- Generate **song recommendations** using pluggable strategies (e.g., genre-based, randomized).

## 1.2 Non-Functional Requirements

- **Modularity:** The system should be composed of well-defined modules
- **Extensibility:** The design should be flexible to allow future additions
- **Maintainability:** Code should be modular, easy to test, and cleanly organized

---

# 2. Identifying Core Entities

> [!PAYWALL] This content is for premium members only.

Core entities are the foundational building blocks of our system. We identify them by analyzing key **nouns** (e.g., song, album, artist, playlist, user, playback history) and **actions** (e.g., stream, search, add, browse, reorder) from the functional requirements. These typically translate directly into classes, enums, or interfaces in an object-oriented design.

Let’s walk through the requirements and extract the relevant entities:

#### **1. Support playing individual songs, albums, and playlists uniformly.**

This points to the core content entities: `Song`, `Album`, and `Playlist`. The need to treat them "uniformly" is a strong indicator for the Composite design pattern. This leads to a `Playable` interface that all three content types implement, allowing the Player to handle them interchangeably.

#### **2. Support playback controls (play, pause, next).**

This suggests a central `Player` entity to manage the playback queue and state.

#### **3. Support both free and premium user tiers with different playback experiences.**

The system needs a `User` entity to represent the listener. The difference in playback (e.g., with or without ads) is a behavioral concern, which is handled by the Strategy pattern. This introduces a `PlaybackStrategy` interface with different implementations (`FreePlaybackStrategy`, `PremiumPlaybackStrategy`). A `SubscriptionTier` enum (FREE, PREMIUM) is used to determine which strategy a User gets.

#### **4. Allow users to follow artists.**

This introduces the `Artist` entity.

#### **5. Provide search and recommendation functionalities.**

These cross-cutting concerns are best encapsulated in dedicated service classes. A `SearchService` is needed to handle queries for songs and artists. Similarly, a `RecommendationService` is responsible for generating song suggestions.

#### **6. Provide a simplified, high-level interface to the system.**

To manage the interactions between all these components, an `MusicStreamingSystem` class acts as a Facade and Singleton. It provides a simple entry point to interact with the entire system.

> 💡 **Key Insight:**

> **SUCCESS**
>
> ### Summary of Core Entities
>
> - `Playable`** (Interface)**: The core abstraction of the Composite pattern, allowing Song, Album, and Playlist to be treated uniformly by the player.
> - `Song`, `Album`, `Playlist`: Concrete Playable entities that represent the music content in the system.
> - `User`: Represents a listener in the system. Holds a PlaybackStrategy based on their subscription.
> - `Artist`: Represents the music creator. Acts as a Subject that notifies its followers of new releases.
> - `Player`: The central playback engine that manages the music queue and current song.
> - `Services` (SearchService, RecommendationService): Classes that encapsulate business logic for searching the catalog and generating recommendations.
> - `Enums` (SubscriptionTier, PlayerStatus): Define fixed sets of constants for user types and player states, ensuring consistency.
> - `MusicStreamingSystem`: A Facade and Singleton that provides a simplified, high-level API to the entire system.

These core entities define the essential abstractions of a music streaming service like Spotify and will guide the structure of your low-level design and class diagrams.

---

# 3. Designing Classes and Relationships

This section breaks down the system's architecture into its fundamental classes, their responsibilities, and the relationships that connect them. We also explore the key design patterns that provide robustness and flexibility to the solution.

## 3.1 Class Definitions

The system is composed of several types of classes, each with a distinct role.

### **Enums**

- `SubscriptionTier`: Defines the user's subscription level (`FREE`, `PREMIUM`), which dictates their playback experience.
- `PlayerStatus`: Represents the current state of the music player (`PLAYING`, `PAUSED`, `STOPPED`).

### **Data Classes**

#### `Song`

A data class representing an individual music track.

It holds details like title, artist, and duration. It also implements the `Playable` interface, making it a leaf node in the Composite pattern.

#### `Album`

A data class that acts as a collection of `Song`s. It implements the `Playable` interface, making it a composite node.

#### `Playlist`

A data class representing a user-curated list of `Song`s. It also implements the `Playable` interface, acting as another composite node.

### **Core Classes**

#### `Playable`** (Interface)**

The **Component** role in the Composite pattern. It defines a common interface (`getTracks`) for both individual songs and collections (albums, playlists), allowing them to be treated uniformly.

#### `Artist`

Represents a music artist or band.

It acts as a concrete **Subject**, maintaining a list of followers (observers) and notifying them when a new `Album` is released.

#### `User`

Represents a listener on the platform.

It acts as a concrete **Observer** by implementing `ArtistObserver`, allowing it to "follow" artists. It is configured with a `PlaybackStrategy` based on its subscription tier. Its construction is handled by a nested `Builder`.

#### `Player`

The core music player.

It acts as the **Context** for the State pattern, delegating actions like `play` and `pause` to its current `PlayerState` object. It manages the playback queue.

#### `SearchService`** & **`RecommendationService`

Service-layer classes that encapsulate specific business logic for searching the catalog and generating recommendations.

#### `MusicStreamingSystem`** (Singleton & Facade)**

The primary entry point for the application.

It provides a simple, unified API to the client, hiding the complex interactions between the various services, data models, and patterns.

## 3.2 Class Relationships

The relationships between classes define the system's structure and data flow.

### **Composition**

- `MusicStreamingSystem` "has-a" collection of `User`s, `Song`s, and `Artist`s, managing their lifecycle.
- An `Album` is composed of a list of `Song`s.
- A `Playlist` is composed of a list of `Song`s.

### **Association**

- A `Player` is associated with a single `PlayerState` at any given time.
- A `User` is associated with a `PlaybackStrategy`.
- An `Artist` (Subject) is associated with a list of `ArtistObserver`s (`User`s).
- A `Song` is associated with its `Artist`.
- A `Command` object holds a reference to the `Player` instance (the receiver) on which it will execute.

### **Inheritance / Implementation**

- `Song`, `Album`, and `Playlist` all implement the `Playable` interface.
- `Artist` extends the abstract `Subject` class.
- `User` implements the `ArtistObserver` interface.
- Concrete state classes (`PlayingState`, etc.) implement the `PlayerState` interface.
- Concrete strategy classes (`FreePlaybackStrategy`, etc.) implement the `PlaybackStrategy` interface.
- Concrete command classes (`PlayCommand`, etc.) implement the `Command` interface.

### **Dependency**

- The client (`MusicStreamingDemo`) depends on the `MusicStreamingSystem` facade to interact with the system.
- The `Player` depends on a `PlaybackStrategy` (provided by the `User`) to play a song.
- The `User.Builder` depends on the `PlaybackStrategy.getStrategy` factory method.

## 3.3 Key Design Patterns

### [**Strategy Pattern**](/learn/lld/strategy)

This pattern is used to make core algorithms interchangeable.

#### **Playback**

The `PlaybackStrategy` allows the playback behavior (ad-free vs. ad-supported) to be assigned to a `User` dynamically based on their subscription tier.

#### **Recommendation**

The `RecommendationStrategy` allows for different recommendation algorithms to be swapped out easily.

### [**State Pattern**](/learn/lld/state)

The lifecycle of the `Player` is managed using the State pattern. The `Player` (Context) delegates its behavior to different `PlayerState` objects (`PlayingState`, `PausedState`, `StoppedState`). This cleanly separates state-specific logic and makes managing player actions robust.

### [**Observer Pattern**](/learn/lld/observer)

This pattern is used for the "follow artist" feature. The `Artist` (Subject) notifies all subscribed `User`s (Observers) when a new album is released, decoupling the artist's actions from the user notification system.

### [**Composite Pattern**](/learn/lld/composite)

The `Playable` interface allows the `Player` to treat individual `Song`s (leafs) and collections like `Album`s or `Playlist`s (composites) uniformly. The `player.load()` method can accept any `Playable` object without needing to know its specific type.

### [**Command Pattern**](/learn/lld/command)

This pattern encapsulates a player action (e.g., "play", "pause") into a standalone object (`PlayCommand`, `PauseCommand`). This decouples the client that issues the request (e.g., a UI button) from the `Player` object that knows how to perform it.

### [**Builder Pattern**](/learn/lld/builder)

The `User.Builder` provides a fluent, step-by-step API for constructing a `User` object, especially useful for setting up the correct `PlaybackStrategy` based on subscription details.

### [**Factory Method (Static Factory)**](/learn/lld/factory-method)

The `PlaybackStrategy.getStrategy()` method acts as a simple factory, encapsulating the logic for creating the correct strategy instance based on the user's `SubscriptionTier`.

### [**Facade Pattern**](/learn/lld/facade)

The `MusicStreamingSystem` class serves as a facade. It provides a simple, high-level API (`registerUser`, `searchSongsByTitle`, `getPlayer`) that hides the complex internal workflows involving players, states, strategies, and observers.

### [**Singleton Pattern**](/learn/lld/singleton)

`MusicStreamingSystem` is implemented as a singleton to ensure a single, globally accessible point of control for the entire application, managing all users, content, and services.

## 3.4 Full Class Diagram

---

# 4. Implementation

### 4.1 Enums

```java
enum SubscriptionTier {
    FREE,
    PREMIUM
}

enum PlayerStatus {
    PLAYING,
    PAUSED,
    STOPPED
}
```

- `SubscriptionTier`: Determines the user’s playback strategy (ad-supported vs ad-free).
- `PlayerStatus`: Reflects the current state of the player.

### 4.2 Song and Playable (Composite Pattern)

`Song` implements `Playable`, enabling uniform treatment alongside `Album` and `Playlist`. This demonstrates the **Composite pattern** for treating individual songs and groups (albums/playlists) interchangeably.

```java
interface Playable {
    List<Song> getTracks();
}
```

```java
class Song implements Playable {
    private final String id;
    private final String title;
    private final Artist artist;
    private final int durationInSeconds;

    public Song(String id, String title, Artist artist, int durationInSeconds) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.durationInSeconds = durationInSeconds;
    }

    @Override
    public List<Song> getTracks() {
        return Collections.singletonList(this);
    }

    @Override
    public String toString() {
        return String.format("'%s' by %s", title, artist.getName());
    }

    public String getId() { return id; }
    public String getTitle() { return title; }
    public Artist getArtist() { return artist; }
}
```

#### Album

```java
class Album implements Playable {
    private final String title;
    private final List<Song> tracks = new ArrayList<>();

    public Album(String title) {
        this.title = title;
    }
    public void addTrack(Song song) { tracks.add(song); }

    @Override
    public List<Song> getTracks() { return List.copyOf(tracks); }

    public String getTitle() { return title; }
}
```

#### Playlist

```java
class Playlist implements Playable {
    private final String name;
    private final List<Song> tracks = new ArrayList<>();

    public Playlist(String name) { this.name = name; }

    public void addTrack(Song song) { tracks.add(song); }

    @Override
    public List<Song> getTracks() { return List.copyOf(tracks); }
}
```

### 4.3 Artist and Observer Pattern

This pattern allows users to "follow" an artist and receive notifications when that artist releases a new album.

#### Observer

```java
interface ArtistObserver {
    void update(Artist artist, Album newAlbum);
}

abstract class Subject {
    private final List<ArtistObserver> observers = new ArrayList<>();

    public void addObserver(ArtistObserver observer) { observers.add(observer); }

    public void removeObserver(ArtistObserver observer) { observers.remove(observer); }

    public void notifyObservers(Artist artist, Album album) {
        for (ArtistObserver observer : observers) {
            observer.update(artist, album);
        }
    }
}
```

#### Artist

```java
class Artist extends Subject {
    private final String id;
    private final String name;
    private final List<Album> discography = new ArrayList<>();

    public Artist(String id, String name) {
        this.id = id;
        this.name = name;
    }
    public void releaseAlbum(Album album) {
        discography.add(album);
        System.out.printf("[System] Artist %s has released a new album: %s%n", name, album.getTitle());
        notifyObservers(this, album);
    }

    public String getId() { return id; }
    public String getName() { return name; }
}
```

### User

```java
$e8
```

The Artist (Subject) doesn't know anything about the User class. It only knows it has a list of ArtistObserver objects to notify. This decouples the content creators from the content consumers.

### 4.4 Player

The Player class holds the current state and delegates all actions to it.

```java
$ee
```

### 4.5 PlayerState

The player's behavior changes drastically based on whether it is Playing, Paused, or Stopped. The State pattern is perfect for managing these transitions cleanly.

```java
$f4
```

Each state class encapsulates the logic for that specific state. For example, clickPlay() in the PlayingState does nothing, but in the StoppedState, it starts the playback and transitions the player to the PlayingState. This avoids a large, complex if/else block in the Player class.

### 4.6 PlaybackStrategy

The playback experience differs significantly for FREE vs. PREMIUM users. The Strategy pattern allows us to define these different behaviors and assign them to users at runtime.

```java
$fa
```

Each strategy class encapsulates a different playback algorithm. FreePlaybackStrategy includes logic for inserting ads, while PremiumPlaybackStrategy does not.

### 4.7 RecommendationStrategy

Applies the **Strategy pattern** to generate different types of song recommendations.

```java
interface RecommendationStrategy {
    List<Song> recommend(List<Song> allSongs);
}

class GenreBasedRecommendationStrategy implements RecommendationStrategy {
    // In a real system, songs would have genres. We simulate this.
    @Override
    public List<Song> recommend(List<Song> allSongs) {
        System.out.println("Generating genre-based recommendations (simulated)...");
        List<Song> shuffled = new java.util.ArrayList<>(allSongs);
        Collections.shuffle(shuffled);
        return shuffled.stream().limit(5).collect(Collectors.toList());
    }
}
```

### 4.8 Command

This pattern encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

```java
interface Command {
    void execute();
}

class PlayCommand implements Command {
    private final Player player;

    public PlayCommand(Player player) { this.player = player; }

    @Override
    public void execute() { player.clickPlay(); }
}

class PauseCommand implements Command {
    private final Player player;

    public PauseCommand(Player player) { this.player = player; }

    @Override
    public void execute() { player.clickPause(); }
}

class NextTrackCommand implements Command {
    private final Player player;

    public NextTrackCommand(Player player) { this.player = player; }

    @Override
    public void execute() { player.clickNext(); }
}
```

Each Command object encapsulates a single action (e.g., "play"). This is useful for creating UI elements like buttons. A "Play" button can be configured with a PlayCommand object, and its onClick handler would simply call command.execute(). The button doesn't need to know anything about the Player's internal workings.

### 4.9 RecommendationService

```java
class RecommendationService {
    private RecommendationStrategy strategy;

    public RecommendationService(RecommendationStrategy strategy) { this.strategy = strategy; }

    public void setStrategy(RecommendationStrategy strategy) { this.strategy = strategy; }

    public List<Song> generateRecommendations(List<Song> allSongs) {
        return strategy.recommend(allSongs);
    }
}
```

### 4.10 Search Service

Encapsulates searching and recommending functionality for the catalog.

```java
class SearchService {
    public List<Song> searchSongsByTitle(List<Song> songs, String query) {
        return songs.stream()
                .filter(s -> s.getTitle().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }
    public List<Artist> searchArtistsByName(List<Artist> artists, String query) {
        return artists.stream()
                .filter(a -> a.getName().toLowerCase().contains(query.toLowerCase()))
                .collect(Collectors.toList());
    }
}
```

### 4.11 `MusicStreamingSystem` (Facade + Singleton)

```java
$ff
```

### 4.12 `MusicStreamingDemo`

The demo class validates the entire system by simulating various user interactions.

```java
$105
```

---

# 5. Run and Test

---

# 6. Quiz
