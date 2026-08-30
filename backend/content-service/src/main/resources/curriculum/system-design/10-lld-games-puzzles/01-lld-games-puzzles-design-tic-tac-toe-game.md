---
id: "lld-games-puzzles-design-tic-tac-toe-game"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Games Puzzles"
subSection: ""
title: "Design Tic Tac Toe Game"
slug: "lld-games-puzzles-design-tic-tac-toe-game"
summary: "In this chapter, we will explore the low-level design of a tic tac toe game in detail."
eli10: "Imagine Design Tic Tac Toe Game as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Design Tic Tac Toe Game Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Games Puzzles","System Design","Architecture"]
codeSnippet:
  language: "java"
  explanation: "Production implementation for Design Tic Tac Toe Game"
  code: |
    public enum Symbol {
        X('X'),
        O('O'),
        EMPTY('_');
    
        private final char displayChar;
    
        Symbol(char displayChar) {
            this.displayChar = displayChar;
        }
    
        public char getDisplayChar() {
            return displayChar;
        }
    }
---

> 💡 **Key Insight:**

> **QUESTION**
>
> #### What is Tic-Tac-Toe Game"
>
> Tic Tac Toe is a classic two-player game played on a 3x3 grid. Players take turns marking empty cells with their respective symbols: **X** or **O**.
>
> 
> <!-- Simulation: tic-tac-toe -->
> 

>
> The goal is to be the first to place three of your symbols in a row, either horizontally, vertically, or diagonally. At the same time, you must try to prevent your opponent from achieving the same. If all cells are filled and no player wins, the game ends in a draw.

In this chapter, we will explore the **low-level design of a tic tac toe game** in detail.

Lets start by clarifying the requirements:

---

# 1. Clarifying Requirements

Before starting any design, it's important to ask thoughtful questions to uncover hidden assumptions, clarify ambiguities, and define the system's scope.

Here is an example of how a discussion between the candidate and the interviewer might unfold:

> 💡 **Key Insight:**

> **DISCUSSION**
>
> **Candidate:** "Should the game support variable board sizes, such as 4x4 or 5x5""
>
> **Interviewer:** "For the purpose of this interview, let’s stick with the standard 3x3 board."
>
> **Candidate:** "Should the game support both player-vs-player and player-vs-computer modes""
>
> **Interviewer:** "Let’s keep it simple and focus only on the player-vs-player mode for now."
>
> **Candidate:** "What should happen if a player tries to make an invalid move, like selecting an already filled cell""
>
> **Interviewer: "**The game should reject the move and inform the player to make another selection."
>
> **Candidate:** "Should the system maintain a scoreboard across multiple games to track player wins""
>
> **Interviewer:** "Yes, tracking the scoreboard across games would be a good addition."
>
> **Candidate:** "How should the user input be handled" Should we take input from the console, or just hardcode a sample game sequence""
>
> **Interviewer:** "To keep things focused on the design, you can hardcode a sample sequence in a demo or main method."
>
> **Candidate:** "Should we track the history of moves to allow features like undo or move replay""
>
> **Interviewer:** "That's an interesting feature to consider, but let’s leave it out for now and focus on the core gameplay logic."

After gathering the details, we can summarize the key system requirements.

## 1.1 Functional Requirements

- The game is played on a **3x3 grid**.
- Two players take alternate turns, identified by markers **‘X’** and **‘O’**.
- The game should **detect and announce the winner.**
- The game should **declare a draw** if all cells are filled and no player has won.
- The game should **reject invalid moves** and inform the player.
- The system should maintain a **scoreboard** across multiple games.
- Moves can be **hardcoded in a driver/demo class** to simulate gameplay.

## 1.2 Non-Functional Requirements

- The design should follow **object-oriented principles** with clear responsibilities and separation of concerns.
- The system should be **modular and extensible** to support future features like larger boards, AI opponent, move history, etc.
- The game logic should be **testable** and **easy to maintain**.
- The system should provide **clear console output** that reflects the current state of the game board.

After the requirements are clear, the next step is to identify the core entities that we will form the foundation of our design.

---

# 2. Identifying Core Entities

How do you go from a list of requirements to actual entities/classes"

The key is to look for **nouns** in the requirements that have distinct attributes or behaviors. Not every noun becomes a class, but this approach gives you a starting point.

Let's walk through our requirements and identify what needs to exist in our system.

#### **1. The game is played on a 3x3 grid.**

The grid is central to everything. We need something to represent it. This gives us our first entity: `Board`.

But what is a grid made of" Individual squares. Each square can be empty or contain a symbol. This suggests a second entity: `Cell`. The Board will contain 9 Cells arranged in a 3x3 structure.

> 💡 **Key Insight:**

> **Why separate Board and Cell"**
>
> Because they have different responsibilities. The Board manages the overall grid structure and operations like "is the board full"" or "place a symbol at position (1,2)". The Cell just holds a single value. 
>
> This separation also makes the code cleaner. If we later want to add features like highlighting the winning cells, the Cell class is the natural place for that logic.

#### 2. Two players take alternate turns, identified by markers ‘X’ and ‘O’.

We need to represent players. Each player has a name and an assigned symbol. This gives us the `Player` entity.

**What about the symbols themselves"**

We could use strings ("X", "O") or characters, but that's error-prone. What stops someone from creating a player with symbol "Z"" 

Using an enum `Symbol` with values `X`, `O`, and `EMPTY` gives us type safety. The compiler will catch invalid symbols at compile time rather than runtime.

#### 3. The game processes moves and determines game outcomes.

Something needs to coordinate the gameplay: accept moves, validate them, check for wins, switch turns. This orchestrator is our `Game` entity.

The game also needs to track its current state. Is it still in progress" Did someone win" Is it a draw" 

We could use a boolean `isGameOver` and a `winner` field, but that gets messy. What if we need to distinguish between "X won" and "O won"" 

An enum `GameStatus` with values `IN_PROGRESS`, `WINNER_X`, `WINNER_O`, and `DRAW` captures all possibilities cleanly.

#### 4. The system should maintain a scoreboard across multiple games.

A single Game object handles one game. But our requirements say we need to track scores across multiple games. This suggests two more entities:

- `Scoreboard`: Tracks how many times each player has won
- `TicTacToeSystem`: A central controller that creates games and maintains the shared scoreboard

The TicTacToeSystem acts as a facade. External code doesn't need to know about Game, Board, or Scoreboard directly. It just calls **system.createGame()** and **system.makeMove()**.

### Entity Overview

Here's how these entities relate to each other:

```mermaid
flowchart TD
    subgraph Enums["Enums"]
        Symbol[Symbol<br/>X, O, EMPTY]:::orange
        GameStatus[GameStatus<br/>IN_PROGRESS, WINNER, DRAW]:::orange
    end

    subgraph DataClasses["Data Classes"]
        Player[Player<br/>name, symbol]:::primary
        Cell[Cell<br/>symbol]:::primary
    end

    subgraph CoreClasses["Core Classes"]
        Board[Board<br/>grid, size]:::green
        Game[Game<br/>board, players, status]:::green
        Scoreboard[Scoreboard<br/>scores]:::purple
        TicTacToeSystem[TicTacToeSystem<br/>scoreboard, game]:::teal
    end

    Cell -->|uses| Symbol
    Player -->|uses| Symbol
    Game -->|uses| GameStatus
    Board -->|contains| Cell
    Game -->|contains| Board
    Game -->|uses| Player
    TicTacToeSystem -->|manages| Game
    TicTacToeSystem -->|owns| Scoreboard

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef orange fill:#ffa94d,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef purple fill:#9775fa,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
```

We've identified three types of entities:

**Enums** define fixed sets of values. They provide type safety and make code self-documenting.

**Data Classes** primarily hold data with minimal behavior. Player and Cell are simple containers.

**Core Classes** contain the main logic. Board manages the grid, Game orchestrates gameplay, Scoreboard tracks history, and TicTacToeSystem ties everything together.

| Entity | Type | Responsibility |
|--------|------|----------------|
| `Symbol` | Enum | Cell values: X, O, or EMPTY |
| `GameStatus` | Enum | Game state: IN_PROGRESS, WINNER_X, WINNER_O, DRAW |
| `Cell` | Data Class | Holds a single symbol |
| `Player` | Data Class | Holds player name and assigned symbol |
| `Board` | Core Class | Manages the 3x3 grid |
| `Game` | Core Class | Orchestrates gameplay and win detection |
| `Scoreboard` | Core Class | Tracks wins across games |
| `TicTacToeSystem` | Core Class | Facade for the entire system |

With our entities identified, let's define their attributes, behaviors, and relationships.

---

# 3. Designing Classes and Relationships

Now that we know what entities we need, let's flesh out their details. For each class, we'll define what data it holds (attributes) and what it can do (methods). Then we'll look at how these classes connect to each other.

> 💡 **Key Insight:**

> **NOTE**
>
> While listing class methods, we will skip trivial **getters and setters** to keep the walkthrough focused on core behaviors

## 3.1 Class Definitions

We'll work bottom-up: simple types first, then data containers, then the classes with real logic. This order makes sense because complex classes depend on simpler ones.

### Enums

Enums define fixed sets of values that provide type safety and make code self-documenting. Using enums prevents invalid states at compile time rather than runtime.

#### `Symbol`

Represents the values a cell can contain.

```mermaid
classDiagram
    class Symbol {
        <<enumeration>>
        X
        O
        EMPTY
    }
    style Symbol fill:#ffa94d,stroke:#000,color:#000
```

| Value | Display Character | Purpose |
|-------|-------------------|---------|
| `X` | 'X' | First player's marker |
| `O` | 'O' | Second player's marker |
| `EMPTY` | '_' | Unoccupied cell |

Each enum value maps to a display character for printing the board.

#### `GameStatus`

Defines the possible states of the game. Tracks where we are in the game lifecycle.

```mermaid
classDiagram
    class GameStatus {
        <<enumeration>>
        IN_PROGRESS
        WINNER_X
        WINNER_O
        DRAW
    }
    style GameStatus fill:#ffa94d,stroke:#000,color:#000
```

| Value | Description | Terminal" |
|-------|-------------|-----------|
| `IN_PROGRESS` | Game is still being played | No |
| `WINNER_X` | Player with X symbol won | Yes |
| `WINNER_O` | Player with O symbol won | Yes |
| `DRAW` | Board is full, no winner | Yes |

Four distinct states cover all possible game outcomes. A game starts as `IN_PROGRESS` and transitions to exactly one terminal state when it ends.

```mermaid
stateDiagram-v2
    [*] --> IN_PROGRESS: Game starts

    IN_PROGRESS --> WINNER_X: X completes a line
    IN_PROGRESS --> WINNER_O: O completes a line
    IN_PROGRESS --> DRAW: Board full, no winner

    WINNER_X --> [*]
    WINNER_O --> [*]
    DRAW --> [*]

    classDef active fill:#00ceff,stroke:#000,color:#000
    classDef winX fill:#69db7c,stroke:#000,color:#000
    classDef winO fill:#ffa94d,stroke:#000,color:#000
    classDef draw fill:#ffd43b,stroke:#000,color:#000

    class IN_PROGRESS active
    class WINNER_X winX
    class WINNER_O winO
    class DRAW draw
```

Notice that all terminal states are one-way. There's no transition from DRAW back to IN_PROGRESS, and no transition from WINNER_X to WINNER_O. Once a game ends, it stays ended.

> 💡 **Key Insight:**

> **Design Decision**
>
> We use `WINNER_X` and `WINNER_O` instead of a generic `WINNER` with a separate winner field. This makes status checks simpler: `if (status == GameStatus.WINNER_X)` instead of `if (status == GameStatus.WINNER && winner.getSymbol() == Symbol.X)`. 
>
> It also makes the enum self-contained. You can determine the winner from the status alone without needing additional context.

### Data Classes

Data classes are simple containers that hold data with minimal behavior. They represent the "nouns" in our system that have attributes but little logic.

#### `Player`

Holds player information.

```mermaid
classDiagram
    class Player {
        -String name
        -Symbol symbol
        +Player(String name, Symbol symbol)
    }
    class Symbol {
        <<enumeration>>
        X
        O
        EMPTY
    }
    Player --> Symbol
    style Player fill:#00ceff,stroke:#000,color:#000
    style Symbol fill:#ffa94d,stroke:#000,color:#000
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `name` | String | Player identifier (e.g., "Alice") |
| `symbol` | Symbol | The marker assigned to the player (X or O) |

| Method | Description |
|--------|-------------|
| `Player(name, symbol)` | Constructor with validation (rejects EMPTY symbol) |

The Player class is **immutable**. Once created, a player's name and symbol don't change. This prevents bugs where someone accidentally reassigns a player's symbol mid-game.

#### `Cell`

Holds the current value of a board position.

```mermaid
classDiagram
    class Cell {
        -Symbol symbol
        +Cell()
        +isEmpty() boolean
    }
    class Symbol {
        <<enumeration>>
        X
        O
        EMPTY
    }
    Cell --> Symbol
    style Cell fill:#00ceff,stroke:#000,color:#000
    style Symbol fill:#ffa94d,stroke:#000,color:#000
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `symbol` | Symbol | Current value: X, O, or EMPTY |

| Method | Description |
|--------|-------------|
| `Cell()` | Constructor, initializes symbol to EMPTY |
| `isEmpty()` | Returns true if symbol is EMPTY |

Unlike Player, Cell is **mutable**. It starts as `EMPTY` and gets set to X or O when a player makes a move.

The `isEmpty()` helper method makes calling code more readable:

- `if (cell.isEmpty())` is clearer than `if (cell.getSymbol() == Symbol.EMPTY)`

### Interfaces

Interfaces define contracts for interchangeable behavior.

#### `WinningStrategy`

After each move, the Game needs to check whether someone won. We could write three separate checks (row, column, diagonal) inline, but that's rigid. If the interviewer says "now add a four-corners win condition," you'd have to modify Game.

`WinningStrategy` defines the contract for win detection algorithms.

```mermaid
classDiagram
    class WinningStrategy {
        <<interface>>
        +checkWin(board: Board, row: int, col: int, symbol: Symbol) bool
    }
    style WinningStrategy fill:#38d9a9,stroke:#000,color:#000
```

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `checkWin` | `board`, `row`, `col`, `symbol` | `bool` | Checks if the given symbol has won after being placed at (row, col) |

The Game iterates through all strategies without knowing which specific checks exist. Adding a new win condition is just a matter of creating a new class that implements this interface and adding it to the list.

#### `GameObserver`

When a game ends, other components might need to react. The Scoreboard records the result, but a logger might write to a file, or an analytics service might track game duration. We don't want Game to know about all of these.

`GameObserver` defines the contract for listening to game end events.

```mermaid
classDiagram
    class GameObserver {
        <<interface>>
        +update(game: Game)
    }
    style GameObserver fill:#38d9a9,stroke:#000,color:#000
```

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `update` | `game` | `void` | Called when a game ends, receives the finished Game object |

The Game notifies all observers when it ends. Observers decide what to do with the information. The Scoreboard extracts the winner and records the result. A future logger could extract the move count and game duration. Neither requires any changes to Game.

### Core Classes

Core classes contain the actual game logic. They coordinate between data classes and implement the rules of the game.

#### `Board`

Encapsulates the 3x3 grid and handles all board-related operations including its state and the rules for checking win/draw conditions.

```mermaid
classDiagram
    class Board {
        -Cell[][] grid
        -int size
        +Board(int size)
        +placeSymbol(int row, int col, Symbol symbol)
        +isCellEmpty(int row, int col) boolean
        +isFull() boolean
        +printBoard()
    }
    class Cell {
        -Symbol symbol
        +isEmpty() boolean
    }
    Board *-- Cell
    style Board fill:#69db7c,stroke:#000,color:#000
    style Cell fill:#00ceff,stroke:#000,color:#000
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `grid` | Cell[][] | 2D array of cells |
| `size` | int | Board dimension (3 for standard game) |

| Method | Description |
|--------|-------------|
| `Board(size)` | Constructor, creates size×size grid of empty cells |
| `placeSymbol(row, col, symbol)` | Places a symbol at the given position |
| `isCellEmpty(row, col)` | Returns true if the cell is available |
| `isFull()` | Returns true if no empty cells remain |
| `printBoard()` | Displays the current board state to console |

> 💡 **Key Insight:**

> **Key Design Principles**
>
> 1. **Single Responsibility:** The Board doesn't know about players or game rules. It just manages a grid of cells. This separation means we could reuse Board for other grid-based games like Connect Four or Battleship.
> 2. **Composition:** Board *owns* its Cells (composition relationship). When a Board is created, it creates all 9 Cells. When the Board is garbage collected, the Cells go with it. No Cell exists outside a Board.
> 3. **Encapsulation:** The grid array is private. External code accesses cells through `getCell()`, which validates bounds first.

#### `Game`

The orchestrator that brings all components together and manages gameplay.

```mermaid
classDiagram
    class Game {
        -Board board
        -Player[] players
        -int currentPlayerIndex
        -GameStatus status
        -List~WinningStrategy~ winningStrategies
        -List~GameObserver~ observers
        +Game(Player p1, Player p2, int boardSize)
        +makeMove(int row, int col)
        +addObserver(GameObserver observer)
        +notifyObservers()
    }
    class Board {
        -Cell[][] grid
    }
    class Player {
        -String name
        -Symbol symbol
    }
    class WinningStrategy {
        <<interface>>
        +checkWin(Board, int, int, Symbol) boolean
    }
    class GameObserver {
        <<interface>>
        +update(Game game)
    }
    Game *-- Board
    Game --> Player
    Game --> WinningStrategy
    Game --> GameObserver
    style Game fill:#69db7c,stroke:#000,color:#000
    style Board fill:#69db7c,stroke:#000,color:#000
    style Player fill:#00ceff,stroke:#000,color:#000
    style WinningStrategy fill:#38d9a9,stroke:#000,color:#000
    style GameObserver fill:#38d9a9,stroke:#000,color:#000
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `board` | Board | The game board |
| `players` | Player[] | The two players |
| `currentPlayerIndex` | int | Whose turn it is (0 or 1) |
| `status` | GameStatus | Current game state |
| `winningStrategies` | List<WinningStrategy> | Strategies for win detection |
| `observers` | List<GameObserver> | Listeners for game end events |

| Method | Description |
|--------|-------------|
| `Game(p1, p2, boardSize)` | Constructor, initializes all components |
| `makeMove(row, col)` | Core method: validate, place, check win/draw, switch turn |
| `addObserver(observer)` | Register a listener for game end events |
| `notifyObservers()` | Notify all listeners that game ended |

Game ties everything together. It owns the Board, knows the Players, tracks whose turn it is, and uses WinningStrategies to detect wins. When the game ends, it notifies observers (like the Scoreboard).

#### `Scoreboard`

Tracks wins across multiple games.

```mermaid
classDiagram
    class Scoreboard {
        -Map~String, Integer~ scores
        +Scoreboard()
        +recordWin(Player player)
        +printScoreboard()
        +update(Game game)
    }
    class GameObserver {
        <<interface>>
        +update(Game game)
    }
    class Player {
        -String name
    }
    GameObserver <|.. Scoreboard
    Scoreboard --> Player
    style Scoreboard fill:#3bc9db,stroke:#000,color:#000
    style GameObserver fill:#38d9a9,stroke:#000,color:#000
    style Player fill:#00ceff,stroke:#000,color:#000
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `scores` | Map<String, Integer> | Maps player names to win counts |

| Method | Description |
|--------|-------------|

| `recordWin(player)` | Increment a player's win count |
| `getScore(playerName)` | Get a player's current score |
| `printScoreboard()` | Display all scores |

The Scoreboard implements `GameObserver` so it can automatically update when games end.

`TicTacToeSystem`

This is the public-facing facade.

```mermaid
classDiagram
    class TicTacToeSystem {
        -TicTacToeSystem instance$
        -Scoreboard scoreboard
        -Game currentGame
        +getInstance()$ TicTacToeSystem
        +createGame(Player p1, Player p2) Game
        +makeMove(Player player, int row, int col)
        +printScoreboard()
    }
    class Game {
        -Board board
        -GameStatus status
    }
    class Scoreboard {
        -Map scores
    }
    class Player {
        -String name
    }
    TicTacToeSystem --> Game
    TicTacToeSystem --> Scoreboard
    TicTacToeSystem --> Player
    style TicTacToeSystem fill:#3bc9db,stroke:#000,color:#000
    style Game fill:#69db7c,stroke:#000,color:#000
    style Scoreboard fill:#3bc9db,stroke:#000,color:#000
    style Player fill:#00ceff,stroke:#000,color:#000
```

| Attribute | Type | Description |
|-----------|------|-------------|
| `instance` | TicTacToeSystem | Singleton instance |
| `scoreboard` | Scoreboard | Shared scoreboard |
| `currentGame` | Game | The active game |

| Method | Description |
|--------|-------------|
| `getInstance()` | Get the singleton instance |
| `createGame(player1, player2)` | Start a new game |
| `makeMove(player, row, col)` | Make a move in the current game |
| `printScoreboard()` | Display scores |

External code only interacts with TicTacToeSystem. It doesn't need to know about Board, Cell, or WinningStrategy.

---

## 3.2 Class Relationships

How do these classes connect" There are three types of relationships we use.

### Composition (Strong Ownership)

Composition means one object owns another. When the owner is destroyed, the owned object is destroyed too.

- **Board owns Cells:** When you create a Board, it creates 9 Cells. Those Cells don't exist outside the Board. When the Board is garbage collected, so are its Cells.
- **Game owns Board:** Each Game creates its own Board. The Board exists only for that game.

### Association (Weak Reference)

Association means one object uses another, but doesn't own it. Both objects have independent lifecycles.

- **Game uses Players:** The Game receives Player objects but doesn't create them. The same Player can participate in multiple games. If a Game ends, the Player objects continue to exist.
- **Game uses WinningStrategies:** The Game uses strategies to check for wins, but the strategies could be shared across games.
- **TicTacToeSystem uses Scoreboard:** The system references a Scoreboard but the Scoreboard has its own lifecycle.

### Implementation (Interface Contract)

Implementation means a class fulfills an interface contract.

- **RowWinningStrategy, ColumnWinningStrategy, DiagonalWinningStrategy implement WinningStrategy:** All three classes can check for wins, but each checks a different pattern.
- **Scoreboard implements GameObserver:** Scoreboard receives notifications when games end, but Game doesn't know it's talking to a Scoreboard specifically.

---

## 3.3 Key Design Patterns

You might notice some structural patterns emerging in our design. Let's make them explicit and justify why each pattern is appropriate here.

### [**Strategy Pattern**](/learn/lld/strategy)** (Win Detection)**

**The Problem:** A player can win in three distinct ways: completing a row, a column, or a diagonal. If we hardcode all win conditions in a single method, we end up with a long, complex function that's hard to test and modify. Adding a new win condition (like "four corners" in a variant) would require changing existing code.

**The Solution:** The Strategy pattern encapsulates each win-checking algorithm in its own class. The Game holds a list of WinningStrategy implementations and iterates through them to check for a winner.

The Strategy pattern gives us:

- **Testability:** Each strategy can be unit tested in isolation
- **Extensibility:** Adding new win conditions means adding a new class, not modifying existing code
- **Single Responsibility:** Each strategy handles exactly one type of win check

```mermaid
flowchart TD
    G[Game]:::green
    WS[WinningStrategy<br/>interface]:::teal
    RS[RowWinningStrategy]:::primary
    CS[ColumnWinningStrategy]:::primary
    DS[DiagonalWinningStrategy]:::primary

    G -->|uses| WS
    WS -->|implemented by| RS
    WS -->|implemented by| CS
    WS -->|implemented by| DS

    classDef primary fill:#00ceff,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef green fill:#69db7c,stroke:#000,color:#000
```

> 💡 **Key Insight:**

> **Design Decision**
>
> We check all strategies on every move rather than optimizing for the last move position. This is simpler and more maintainable. 
>
> For a 3x3 board, the performance difference is negligible. If we were building for larger boards, we might optimize by only checking strategies relevant to the last move's position.

### [Observer Pattern](/learn/lld/observer) (Scoreboard Updates)

**The Problem:** When a game ends, the Scoreboard needs to update. The naive approach is to have the Game directly call `scoreboard.recordWin()`. But this couples the Game to the Scoreboard. What if we want to add analytics tracking" Or a replay recorder" Each new listener would require modifying the Game class.

**The Solution:** The Observer pattern decouples the Game (subject) from its listeners (observers). The Game maintains a list of observers and notifies them when the game ends.

**Why Observer Pattern"** 

For a single Scoreboard, direct method calls would work fine. We use Observer because:

- It demonstrates proper decoupling
- It makes adding new listeners trivial (analytics, logging, replays)
- It keeps the Game focused on game logic, not notification logistics

```mermaid
flowchart TD
    subgraph Subject
        G[Game]:::green
    end

    subgraph Observers
        SB[Scoreboard]:::lightblue
        AN[AnalyticsObserver<br/>future]:::lightblue
        RR[ReplayRecorder<br/>future]:::lightblue
    end

    GO[GameObserver<br/>interface]:::teal

    G -->|notifies| GO
    GO -->|implemented by| SB
    GO -.->|implemented by| AN
    GO -.->|implemented by| RR

    classDef green fill:#69db7c,stroke:#000,color:#000
    classDef teal fill:#38d9a9,stroke:#000,color:#000
    classDef lightblue fill:#3bc9db,stroke:#000,color:#000
```

> 💡 **Key Insight:**

> **Design Decision**
>
> The Game only notifies observers when it transitions to a terminal state, not on every move. This keeps the observer interface simple and avoids unnecessary updates. 
>
> If we needed move-by-move notifications, we could add a separate `onMove()` method to the observer interface.

### [Singleton Pattern](/learn/lld/singleton) (TicTacToeSystem)

**The Problem:** We need a single, globally accessible entry point to the system that maintains a consistent scoreboard across multiple games.

**The Solution:** The Singleton pattern ensures only one instance of TicTacToeSystem exists. It provides a global access point via `getInstance()`.

Singleton is often overused, but it's appropriate here because we genuinely need one scoreboard shared across all games.

---

## 3.4 Full Class Diagram

```mermaid
classDiagram
    class Symbol {
        <<enumeration>>
        X
        O
        EMPTY
    }

    class GameStatus {
        <<enumeration>>
        IN_PROGRESS
        WINNER_X
        WINNER_O
        DRAW
    }

    class Cell {
        -Symbol symbol
        +isEmpty() boolean
    }

    class Player {
        -String name
        -Symbol symbol
    }

    class Board {
        -Cell[][] grid
        -int size
        +placeSymbol(int, int, Symbol)
        +isCellEmpty(int, int) boolean
        +isFull() boolean
    }

    class WinningStrategy {
        <<interface>>
        +checkWin(Board, int, int, Symbol) boolean
    }

    class RowWinningStrategy {
        +checkWin(Board, int, int, Symbol) boolean
    }

    class ColumnWinningStrategy {
        +checkWin(Board, int, int, Symbol) boolean
    }

    class DiagonalWinningStrategy {
        +checkWin(Board, int, int, Symbol) boolean
    }

    class GameObserver {
        <<interface>>
        +update(Game)
    }

    class Scoreboard {
        -Map scores
        +recordWin(Player)
        +update(Game)
    }

    class Game {
        -Board board
        -Player[] players
        -GameStatus status
        -List~WinningStrategy~ strategies
        -List~GameObserver~ observers
        +makeMove(int, int)
        +notifyObservers()
    }

    class TicTacToeSystem {
        -TicTacToeSystem instance$
        -Scoreboard scoreboard
        -Game currentGame
        +getInstance()$ TicTacToeSystem
        +createGame(Player, Player) Game
    }

    Cell --> Symbol
    Player --> Symbol
    Game --> GameStatus
    Board *-- Cell
    Game *-- Board
    Game --> Player
    Game --> WinningStrategy
    Game --> GameObserver
    WinningStrategy <|.. RowWinningStrategy
    WinningStrategy <|.. ColumnWinningStrategy
    WinningStrategy <|.. DiagonalWinningStrategy
    GameObserver <|.. Scoreboard
    TicTacToeSystem --> Scoreboard
    TicTacToeSystem --> Game

    style Symbol fill:#ffa94d,stroke:#000,color:#000
    style GameStatus fill:#ffa94d,stroke:#000,color:#000
    style Cell fill:#00ceff,stroke:#000,color:#000
    style Player fill:#00ceff,stroke:#000,color:#000
    style Board fill:#69db7c,stroke:#000,color:#000
    style Game fill:#69db7c,stroke:#000,color:#000
    style WinningStrategy fill:#38d9a9,stroke:#000,color:#000
    style RowWinningStrategy fill:#38d9a9,stroke:#000,color:#000
    style ColumnWinningStrategy fill:#38d9a9,stroke:#000,color:#000
    style DiagonalWinningStrategy fill:#38d9a9,stroke:#000,color:#000
    style GameObserver fill:#38d9a9,stroke:#000,color:#000
    style Scoreboard fill:#3bc9db,stroke:#000,color:#000
    style TicTacToeSystem fill:#3bc9db,stroke:#000,color:#000
```

Now that we've designed our classes and relationships, let's bring this to life with code.

---

# 4. Code Implementation

Now let's translate our design into working code. We'll build bottom-up: foundational types first, then data classes, then the classes with real logic. This order matters because each layer depends on the ones below it.

#### Java

## 4.1 Enums

We start with the two enums that other classes depend on.

#### `Symbol`

```java
public enum Symbol {
    X('X'),
    O('O'),
    EMPTY('_');

    private final char displayChar;

    Symbol(char displayChar) {
        this.displayChar = displayChar;
    }

    public char getDisplayChar() {
        return displayChar;
    }
}
```

Each Symbol maps to a display character. This keeps display logic centralized. If we later want to use 'x' instead of 'X', we change it in one place.

#### `GameStatus`

```java
public enum GameStatus {
    IN_PROGRESS,
    WINNER_X,
    WINNER_O,
    DRAW
}
```

Four possible states. The game starts `IN_PROGRESS` and ends in one of the three terminal states.

## 4.2 Custom Exception

Before we write classes that can fail, let's define how they fail. A custom exception makes error handling cleaner than catching generic `RuntimeException`.

#### `InvalidMoveException`

```java
public class InvalidMoveException extends RuntimeException {
    public InvalidMoveException(String message) {
        super(message);
    }
}
```

We'll throw this when someone tries to play on an occupied cell, make a move after the game ends, or specify an out-of-bounds position.

## 4.3 Data Classes

These are simple containers. They hold data with minimal logic.

#### `Player`

```java
public class Player {
    private final String name;
    private final Symbol symbol;

    public Player(String name, Symbol symbol) {
        if (symbol == Symbol.EMPTY) {
            throw new IllegalArgumentException("Player cannot have EMPTY symbol");
        }
        this.name = name;
        this.symbol = symbol;
    }

    public String getName() {
        return name;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    @Override
    public String toString() {
        return name + " (" + symbol.getDisplayChar() + ")";
    }
}
```

Notice the constructor validation. A player with `Symbol.EMPTY` makes no sense, so we reject it immediately. This is "fail fast" design. If you create an invalid Player, you find out right away, not three hours later when debugging a weird game state.

Both fields are `final`. Once you create a Player, their name and symbol never change. Immutability prevents bugs.

#### `Cell`

```java
public class Cell {
    private Symbol symbol;

    public Cell() {
        this.symbol = Symbol.EMPTY;
    }

    public Symbol getSymbol() {
        return symbol;
    }

    public void setSymbol(Symbol symbol) {
        this.symbol = symbol;
    }

    public boolean isEmpty() {
        return symbol == Symbol.EMPTY;
    }
}
```

Unlike Player, Cell is mutable. It starts empty and gets filled during gameplay. The `isEmpty()` helper makes calling code more readable: `if (cell.isEmpty())` is clearer than `if (cell.getSymbol() == Symbol.EMPTY)`.

## 4.4 Interfaces

Now we define the contracts that our strategy and observer classes will implement.

#### `WinningStrategy`

```java
public interface WinningStrategy {
    boolean checkWin(Board board, int row, int col, Symbol symbol);
}
```

The interface takes the board, the position of the last move, and the symbol to check. Each implementation decides how to use these parameters. Row strategy only cares about `row`. Column strategy only cares about `col`. Diagonal strategy ignores both and checks the whole diagonal.

#### `GameObserver`

```java
public interface GameObserver {
    void update(Game game);
}
```

Simple notification interface. When a game ends, observers get the Game object and can extract whatever information they need (winner, final board state, etc.).

## 4.5 Strategy Implementations

Each strategy checks one way to win. Let's implement all three.

**RowWinningStrategy** checks if all cells in the row of the last move contain the same symbol.

```java
public class RowWinningStrategy implements WinningStrategy {
    @Override
    public boolean checkWin(Board board, int row, int col, Symbol symbol) {
        int size = board.getSize();
        for (int c = 0; c < size; c++) {
            if (board.getCell(row, c).getSymbol() != symbol) {
                return false;
            }
        }
        return true;
    }
}
```

We iterate through every column in the given row. If any cell doesn't match, return false immediately. No need to check further.

**ColumnWinningStrategy** works the same way, but iterates through rows instead of columns.

```java
public class ColumnWinningStrategy implements WinningStrategy {
    @Override
    public boolean checkWin(Board board, int row, int col, Symbol symbol) {
        int size = board.getSize();
        for (int r = 0; r < size; r++) {
            if (board.getCell(r, col).getSymbol() != symbol) {
                return false;
            }
        }
        return true;
    }
}
```

**DiagonalWinningStrategy** is more complex because there are two diagonals: main (top-left to bottom-right) and anti-diagonal (top-right to bottom-left).

```java
public class DiagonalWinningStrategy implements WinningStrategy {
    @Override
    public boolean checkWin(Board board, int row, int col, Symbol symbol) {
        int size = board.getSize();

        // Check main diagonal (top-left to bottom-right)
        boolean mainDiagonalWin = true;
        for (int i = 0; i < size; i++) {
            if (board.getCell(i, i).getSymbol() != symbol) {
                mainDiagonalWin = false;
                break;
            }
        }
        if (mainDiagonalWin) return true;

        // Check anti-diagonal (top-right to bottom-left)
        for (int i = 0; i < size; i++) {
            if (board.getCell(i, size - 1 - i).getSymbol() != symbol) {
                return false;
            }
        }
        return true;
    }
}
```

The main diagonal has cells at positions (0,0), (1,1), (2,2). The anti-diagonal has cells at (0,2), (1,1), (2,0). Notice how `size - 1 - i` gives us the anti-diagonal column index.

Each strategy is independently testable. You can unit test `RowWinningStrategy` without creating a full Game. Just create a Board, set up a winning row, and verify the strategy returns true.

## 4.6 Board Class

The Board encapsulates all grid operations. It doesn't know about players, turns, or game rules. It just manages a 2D array of cells.

```java
$12d
```

A few things to note about the Board:

- **Constructor creates all cells:** The `initializeBoard()` method runs in the constructor, so you never have a Board with null cells.
- **Validation is centralized:** The `validatePosition()` method is private and called by every public method that takes coordinates. This prevents code duplication.
- `isFull()`** short-circuits:** As soon as we find an empty cell, we return false. No need to scan the entire board.
- `printBoard()`** is for debugging:** In a real application, you'd probably have a separate view layer. But for interviews and testing, a simple print method is useful.

## 4.7 Game Class

This is where everything comes together. The Game coordinates players, board, strategies, and observers. It's the most complex class, but each method has a single responsibility.

```java
$12e
```

Let's break down the key design decisions in the Game class:

**Thread Safety:** The `makeMove` method is `synchronized`. This prevents two threads from making moves simultaneously, which could corrupt the game state. The observer list uses `CopyOnWriteArrayList`, which allows safe iteration even if observers are added during notification.

**The **`makeMove`** flow:**

1. Check if game is over (fail fast)
2. Validate the cell is empty
3. Place the symbol
4. Check for win using all strategies
5. Check for draw if no winner
6. Switch to next player if game continues

**Strategy iteration:** The `checkWin` method iterates through all strategies. As soon as one returns true, we have a winner. This is where the Strategy pattern pays off. Adding a new win condition just means adding another strategy to the list.

**Observer notification:** We only notify observers when the game ends (win or draw). This keeps the observer interface simple. If we needed move-by-move notifications, we could add a separate `onMove()` method to `GameObserver`.

## 4.8 Scoreboard Class

The Scoreboard demonstrates the Observer pattern in action. It listens for game end events and automatically updates scores.

```java
$12f
```

The Scoreboard is decoupled from the Game. It doesn't know when games start or how moves work. It just receives a notification when a game ends, extracts the winner, and updates its internal map.

Note the use of `ConcurrentHashMap` and the `merge()` method. The `merge()` call atomically gets the current value (or 0 if absent), adds 1, and stores the result. This is thread-safe without explicit synchronization.

## 4.9 TicTacToeSystem (Singleton Facade)

The system class is the public entry point. External code only needs to know about this class. It hides the complexity of Game, Board, and Scoreboard behind a simple interface.

```java
$130
```

#### **Singleton Implementation Details:**

- **Double-checked locking:** We check `instance == null` twice. The first check avoids the cost of synchronization when the instance already exists. The second check (inside the synchronized block) handles the race condition where two threads both pass the first check.
- `volatile`** keyword:** This ensures that when one thread creates the instance, other threads immediately see the fully constructed object. Without `volatile`, threads might see a partially constructed instance due to instruction reordering.
- `resetInstance()`** for testing:** Singletons are notoriously hard to test because the instance persists across tests. This method lets us reset the singleton between tests. In production, you'd probably remove this or make it package-private.

#### **Facade Benefits:**

The TicTacToeSystem class simplifies the API. Compare these two approaches:

Without facade:

```java
Game game = new Game(player1, player2, 3);
Scoreboard scoreboard = new Scoreboard();
game.addObserver(scoreboard);
game.makeMove(0, 0);
```

With facade:

```java
TicTacToeSystem system = TicTacToeSystem.getInstance();
system.createGame(player1, player2);
system.makeMove(player1, 0, 0);
```

The facade handles object creation, wiring, and lifecycle. Callers don't need to know that games have observers or that scoreboards exist.

## 4.10 Demo Class

Let's see the system in action with a demo that plays three games.

```java
$131
```

### Move Sequence Diagram

The following diagram illustrates what happens when a player makes a move:

```mermaid
sequenceDiagram
    participant User
    participant System as TicTacToeSystem
    participant Game
    participant Board
    participant Strategy as WinningStrategies
    participant Observer as Scoreboard

    User->>System: makeMove(player, row, col)
    System->>Game: makeMove(row, col)
    Game->>Board: isCellEmpty(row, col)
    Board-->>Game: true
    Game->>Board: placeSymbol(row, col, symbol)
    Game->>Strategy: checkWin(board, row, col, symbol)
    Strategy-->>Game: true (winner found)
    Game->>Game: status = WINNER_X
    Game->>Observer: update(game)
    Observer->>Observer: recordWin(winner)
```

---

# 5. Run and Test

---

# 6. Concurrency and Thread Safety

Does Tic-Tac-Toe actually need thread safety" 

For a simple console application where Alice and Bob take turns typing, no. But consider a web-based version: two players in different browsers making HTTP requests to the same game server. Each request is handled by a separate thread, and both threads access the same `Game` object. Without synchronization, things can go wrong.

### Race Condition: Simultaneous Moves

**Setup:** Alice (X) and Bob (O) are playing through a web interface. It's Alice's turn (`currentPlayerIndex = 0`). Alice clicks (0, 0) and Bob clicks (1, 1) at nearly the same time. Two HTTP request threads hit `Game.makeMove()` concurrently.

#### **Without synchronization:**

1. Thread-A (Alice): Reads `currentPlayerIndex = 0`, confirms it's Alice's turn
2. Thread-B (Bob): Reads `currentPlayerIndex = 0`, also sees it's Alice's turn
3. Thread-A: Checks `isCellEmpty(0, 0)` -> true
4. Thread-B: Checks `isCellEmpty(1, 1)` -> true
5. Thread-A: Places X at (0, 0)
6. Thread-B: Places X at (1, 1) (using Alice's symbol, since `currentPlayerIndex` is still 0)
7. Thread-A: No win, increments `currentPlayerIndex` to 1
8. Thread-B: No win, increments `currentPlayerIndex` to 0 (wraps back)

**Result:** Both cells contain X. Bob's move was lost. The turn counter wrapped around, so Alice would go again. The board state is corrupted.

#### **With synchronization:** 

The `synchronized` keyword on `makeMove()` ensures Thread-A acquires the lock first. Thread-A completes the entire move atomically (place symbol, check win, switch player). Only then does Thread-B acquire the lock. Thread-B now reads the updated `currentPlayerIndex = 1`, confirms it's Bob's turn, and places O correctly.

---

# 7. Extensions

One of the best ways to validate a design is to see how it handles change. If adding a feature requires modifying multiple classes, the design has problems. If you can add features by creating new classes without touching existing code, you've achieved the Open/Closed Principle.

Let's walk through five common extension requests and see how our design handles them.

## 7.1 New Win Condition (Four Corners)

**Scenario:** "Add a win condition where occupying all four corners wins the game."

This is where the Strategy pattern shines. We add a new strategy class without touching any existing code.

```java
public class FourCornersWinningStrategy implements WinningStrategy {
    @Override
    public boolean checkWin(Board board, int row, int col, Symbol symbol) {
        int size = board.getSize();
        int lastIndex = size - 1;

        // Check all four corners
        return board.getCell(0, 0).getSymbol() == symbol &&
               board.getCell(0, lastIndex).getSymbol() == symbol &&
               board.getCell(lastIndex, 0).getSymbol() == symbol &&
               board.getCell(lastIndex, lastIndex).getSymbol() == symbol;
    }
}
```

To enable it, add one line to `initializeStrategies()`:

```java
private List<WinningStrategy> initializeStrategies() {
    List<WinningStrategy> strategies = new ArrayList<>();
    strategies.add(new RowWinningStrategy());
    strategies.add(new ColumnWinningStrategy());
    strategies.add(new DiagonalWinningStrategy());
    strategies.add(new FourCornersWinningStrategy());  // New!
    return strategies;
}
```

**What stays unchanged:** RowWinningStrategy, ColumnWinningStrategy, DiagonalWinningStrategy, Board, Cell, Game logic, Observer pattern.

---

## 7.2 Variable Board Size

**Scenario:** "Support 4x4 and 5x5 boards."

Our design already handles this. The Board takes a size parameter, and strategies use `board.getSize()` instead of hardcoding 3.

```java
// In TicTacToeSystem, add a createGame overload:
public Game createGame(Player player1, Player player2, int boardSize) {
    currentGame = new Game(player1, player2, boardSize);
    currentGame.addObserver(scoreboard);
    return currentGame;
}

// Usage:
system.createGame(alice, bob, 5);  // 5x5 board
```

For larger boards, you might want a configurable win length (e.g., "5 in a row on a 10x10 board"). That would require updating the strategies:

```java
class RowWinningStrategy implements WinningStrategy {
    private final int winLength;

    public RowWinningStrategy(int winLength) {
        this.winLength = winLength;
    }

    @Override
    public boolean checkWin(Board board, int row, int col, Symbol symbol) {
        // Count consecutive symbols in the row
        int count = 0;
        for (int c = 0; c < board.getSize(); c++) {
            if (board.getCell(row, c).getSymbol() == symbol) {
                count++;
                if (count >= winLength) return true;
            } else {
                count = 0;
            }
        }
        return false;
    }
}
```

**What stays unchanged:** Board, Cell, Observer pattern, Scoreboard.

---

## 7.3 AI Opponent

**Scenario:** "Add a computer player that makes moves automatically."

We introduce a `MoveStrategy` interface for selecting moves. This is separate from `WinningStrategy`, which checks for wins.

```java
public interface MoveStrategy {
    int[] selectMove(Board board, Symbol symbol);
}
```

A simple random strategy:

```java
public class RandomMoveStrategy implements MoveStrategy {
    private final Random random = new Random();

    @Override
    public int[] selectMove(Board board, Symbol symbol) {
        List<int[]> emptyCells = new ArrayList<>();

        for (int r = 0; r < board.getSize(); r++) {
            for (int c = 0; c < board.getSize(); c++) {
                if (board.isCellEmpty(r, c)) {
                    emptyCells.add(new int[]{r, c});
                }
            }
        }

        if (emptyCells.isEmpty()) {
            throw new IllegalStateException("No empty cells");
        }

        return emptyCells.get(random.nextInt(emptyCells.size()));
    }
}
```

A smarter minimax strategy (simplified):

```java
public class MinimaxMoveStrategy implements MoveStrategy {
    @Override
    public int[] selectMove(Board board, Symbol symbol) {
        int[] bestMove = null;
        int bestScore = Integer.MIN_VALUE;

        for (int r = 0; r < board.getSize(); r++) {
            for (int c = 0; c < board.getSize(); c++) {
                if (board.isCellEmpty(r, c)) {
                    // Try this move
                    board.placeSymbol(r, c, symbol);
                    int score = minimax(board, symbol, false);
                    board.placeSymbol(r, c, Symbol.EMPTY);  // Undo

                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = new int[]{r, c};
                    }
                }
            }
        }
        return bestMove;
    }

    private int minimax(Board board, Symbol aiSymbol, boolean isMaximizing) {
        // ... minimax algorithm implementation
    }
}
```

The Game class can check if the current player has a MoveStrategy and auto-play:

```java
public void playAIMove() {
    Player current = getCurrentPlayer();
    if (current.getMoveStrategy() != null) {
        int[] move = current.getMoveStrategy().selectMove(board, current.getSymbol());
        makeMove(move[0], move[1]);
    }
}
```

**What stays unchanged:** Board, Cell, WinningStrategy implementations, Observer pattern.

---

## 7.4 Move History and Undo

**Scenario:** "Track move history and allow undo."

The Command pattern is perfect here. Each move becomes a command that can be executed and reversed.

```java
public class MoveCommand {
    private final Board board;
    private final int row;
    private final int col;
    private final Symbol symbol;
    private Symbol previousSymbol;

    public MoveCommand(Board board, int row, int col, Symbol symbol) {
        this.board = board;
        this.row = row;
        this.col = col;
        this.symbol = symbol;
    }

    public void execute() {
        previousSymbol = board.getCell(row, col).getSymbol();
        board.placeSymbol(row, col, symbol);
    }

    public void undo() {
        board.placeSymbol(row, col, previousSymbol);
    }

    public int getRow() { return row; }
    public int getCol() { return col; }
}
```

Update the Game class to use commands:

```java
public class Game {
    private final Stack<MoveCommand> moveHistory = new Stack<>();

    public synchronized void makeMove(int row, int col) {
        // ... validation ...

        MoveCommand command = new MoveCommand(board, row, col, currentPlayer.getSymbol());
        command.execute();
        moveHistory.push(command);

        // ... win/draw checks ...
    }

    public synchronized void undoLastMove() {
        if (moveHistory.isEmpty()) {
            throw new InvalidMoveException("No moves to undo");
        }

        MoveCommand lastMove = moveHistory.pop();
        lastMove.undo();

        // Reset status if game was over
        if (status != GameStatus.IN_PROGRESS) {
            status = GameStatus.IN_PROGRESS;
        }

        // Switch back to previous player
        currentPlayerIndex = (currentPlayerIndex + 1) % 2;
    }

    public List<MoveCommand> getMoveHistory() {
        return new ArrayList<>(moveHistory);
    }
}
```

**What stays unchanged:** Board, Cell, WinningStrategy, existing Game methods.

---

## 7.5 Multiple Observers

**Scenario:** "Add analytics tracking and replay recording."

The Observer pattern already supports this. Just create new observer implementations.

```java
public class AnalyticsObserver implements GameObserver {
    @Override
    public void update(Game game) {
        // Track game statistics
        System.out.println("Analytics: Game ended with status " + game.getStatus());
        System.out.println("Analytics: Total moves = " + game.getMoveHistory().size());
    }
}
```

```java
public class ReplayRecorder implements GameObserver {
    private final List<String> recordings = new ArrayList<>();

    @Override
    public void update(Game game) {
        StringBuilder replay = new StringBuilder();
        replay.append("Game replay:\n");
        for (MoveCommand move : game.getMoveHistory()) {
            replay.append("  Move at (").append(move.getRow())
                  .append(", ").append(move.getCol()).append(")\n");
        }
        recordings.add(replay.toString());
        System.out.println("Replay saved. Total replays: " + recordings.size());
    }

    public List<String> getRecordings() {
        return recordings;
    }
}
```

Register multiple observers:

```java
public Game createGame(Player player1, Player player2) {
    currentGame = new Game(player1, player2, 3);
    currentGame.addObserver(scoreboard);
    currentGame.addObserver(new AnalyticsObserver());
    currentGame.addObserver(new ReplayRecorder());
    return currentGame;
}
```

**What stays unchanged:** Game class, Scoreboard, Board, strategies. The Game doesn't know or care what observers are watching it.

---

# 8. Quiz
