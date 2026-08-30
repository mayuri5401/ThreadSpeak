---
id: "lld-design-patterns-exercise-memento-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Memento Design Pattern"
slug: "lld-design-patterns-exercise-memento-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Memento Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Memento Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Game Save System

Build a game save/load system. A `Game` class tracks the player's health, level, and position. The player can play (gain XP, level up), take damage, and save/load game state using Memento.

**Requirements:**

- `GameMemento` stores health, level, and position
- `Game` originator with `play()`, `takeDamage(amount)`, `save()`, and `restore(memento)` methods
- `SaveManager` caretaker that stores up to 3 save slots
- `play()` increases level by 1 and position by 10
- `takeDamage(amount)` reduces health by the given amount

```java
import java.util.*;

// Memento
class GameMemento {
    private final int health;
    private final int level;
    private final int position;

    public GameMemento(int health, int level, int position) {
        // TODO: Store health, level, and position
        this.health = 0;
        this.level = 0;
        this.position = 0;
    }

    public int getHealth() {
        // TODO: Return health
        return 0;
    }

    public int getLevel() {
        // TODO: Return level
        return 0;
    }

    public int getPosition() {
        // TODO: Return position
        return 0;
    }
}

// Originator
class Game {
    private int health = 100;
    private int level = 1;
    private int position = 0;

    public void play() {
        // TODO: Increment level by 1 and position by 10
        // TODO: Print "Playing... Level: X, Position: Y, Health: Z"
    }

    public void takeDamage(int amount) {
        // TODO: Reduce health by amount
        // TODO: Print "Took X damage. Health: Y"
    }

    public GameMemento save() {
        // TODO: Return a new GameMemento with current state
        return null;
    }

    public void restore(GameMemento memento) {
        // TODO: Restore health, level, and position from memento
        // TODO: Print "Game loaded: Level: X, Position: Y, Health: Z"
    }
}

// Caretaker
class SaveManager {
    private final Map<Integer, GameMemento> slots = new HashMap<>();

    public void save(Game game, int slot) {
        // TODO: Save game state to the given slot
    }

    public void load(Game game, int slot) {
        // TODO: Load game state from the given slot
        // TODO: Print "No save in slot X." if slot is empty
    }
}

public class Main {
    public static void main(String[] args) {
        // Game game = new Game();
        // SaveManager saveManager = new SaveManager();

        // game.play();                // Level 2, Position 10
        // game.play();                // Level 3, Position 20
        // saveManager.save(game, 0);  // Save to slot 0

        // game.takeDamage(50);        // Health: 50
        // game.play();                // Level 4, Position 30
        // saveManager.save(game, 1);  // Save to slot 1

        // game.takeDamage(40);        // Health: 10
        // System.out.println("\n--- Load Slot 0 ---");
        // saveManager.load(game, 0);  // Back to: Health 100, Level 3, Position 20

        // System.out.println("\n--- Load Slot 1 ---");
        // saveManager.load(game, 1);  // Back to: Health 50, Level 4, Position 30
    }
}
```

```python
# Memento
class GameMemento:
    def __init__(self, health, level, position):
        pass  # TODO: Store health, level, and position as private fields

    @property
    def health(self):
        pass  # TODO: Return health

    @property
    def level(self):
        pass  # TODO: Return level

    @property
    def position(self):
        pass  # TODO: Return position

# Originator
class Game:
    def __init__(self):
        self.health = 100
        self.level = 1
        self.position = 0

    def play(self):
        pass  # TODO: Increment level by 1 and position by 10
              # TODO: Print "Playing... Level: X, Position: Y, Health: Z"

    def take_damage(self, amount):
        pass  # TODO: Reduce health by amount
              # TODO: Print "Took X damage. Health: Y"

    def save(self):
        pass  # TODO: Return a new GameMemento with current state

    def restore(self, memento):
        pass  # TODO: Restore health, level, and position from memento
              # TODO: Print "Game loaded: Level: X, Position: Y, Health: Z"

# Caretaker
class SaveManager:
    def __init__(self):
        self.slots = {}

    def save(self, game, slot):
        pass  # TODO: Save game state to the given slot

    def load(self, game, slot):
        pass  # TODO: Load game state from the given slot
              # TODO: Print "No save in slot X." if slot is empty

if __name__ == "__main__":
    # game = Game()
    # save_manager = SaveManager()

    # game.play()                    # Level 2, Position 10
    # game.play()                    # Level 3, Position 20
    # save_manager.save(game, 0)     # Save to slot 0

    # game.take_damage(50)           # Health: 50
    # game.play()                    # Level 4, Position 30
    # save_manager.save(game, 1)     # Save to slot 1

    # game.take_damage(40)           # Health: 10
    # print("\n--- Load Slot 0 ---")
    # save_manager.load(game, 0)     # Back to: Health 100, Level 3, Position 20

    # print("\n--- Load Slot 1 ---")
    # save_manager.load(game, 1)     # Back to: Health 50, Level 4, Position 30
    pass
```

```cpp
#include <iostream>
#include <string>
#include <map>
using namespace std;

// Memento
class GameMemento {
    int health;
    int level;
    int position;

public:
    GameMemento(int health = 0, int level = 0, int position = 0)
        : health(health), level(level), position(position) {
        // TODO: Initialize fields
    }

    int getHealth() const {
        // TODO: Return health
        return 0;
    }

    int getLevel() const {
        // TODO: Return level
        return 0;
    }

    int getPosition() const {
        // TODO: Return position
        return 0;
    }
};

// Originator
class Game {
private:
    int health = 100;
    int level = 1;
    int position = 0;

public:
    void play() {
        // TODO: Increment level by 1 and position by 10
        // TODO: Print "Playing... Level: X, Position: Y, Health: Z"
    }

    void takeDamage(int amount) {
        // TODO: Reduce health by amount
        // TODO: Print "Took X damage. Health: Y"
    }

    GameMemento save() {
        // TODO: Return a new GameMemento with current state
        return GameMemento();
    }

    void restore(GameMemento memento) {
        // TODO: Restore health, level, and position from memento
        // TODO: Print "Game loaded: Level: X, Position: Y, Health: Z"
    }
};

// Caretaker
class SaveManager {
private:
    map<int, GameMemento> slots;

public:
    void save(Game& game, int slot) {
        // TODO: Save game state to the given slot
    }

    void load(Game& game, int slot) {
        // TODO: Load game state from the given slot
        // TODO: Print "No save in slot X." if slot is empty
    }
};

int main() {
    // Game game;
    // SaveManager saveManager;

    // game.play();                // Level 2, Position 10
    // game.play();                // Level 3, Position 20
    // saveManager.save(game, 0);  // Save to slot 0

    // game.takeDamage(50);        // Health: 50
    // game.play();                // Level 4, Position 30
    // saveManager.save(game, 1);  // Save to slot 1

    // game.takeDamage(40);        // Health: 10
    // cout << "\n--- Load Slot 0 ---" << endl;
    // saveManager.load(game, 0);  // Back to: Health 100, Level 3, Position 20

    // cout << "\n--- Load Slot 1 ---" << endl;
    // saveManager.load(game, 1);  // Back to: Health 50, Level 4, Position 30

    return 0;
}
```

```go
package main

import "fmt"

// Memento
type GameMemento struct {
	health   int
	level    int
	position int
}

func NewGameMemento(health int, level int, position int) *GameMemento {
	// TODO: Store health, level, and position
	return &GameMemento{
		health:   0,
		level:    0,
		position: 0,
	}
}

func (m *GameMemento) Health() int {
	// TODO: Return health
	return 0
}

func (m *GameMemento) Level() int {
	// TODO: Return level
	return 0
}

func (m *GameMemento) Position() int {
	// TODO: Return position
	return 0
}

// Originator
type Game struct {
	health   int
	level    int
	position int
}

func NewGame() *Game {
	return &Game{
		health:   100,
		level:    1,
		position: 0,
	}
}

func (g *Game) Play() {
	// TODO: Increment level by 1 and position by 10
	// TODO: Print "Playing... Level: X, Position: Y, Health: Z"
}

func (g *Game) TakeDamage(amount int) {
	// TODO: Reduce health by amount
	// TODO: Print "Took X damage. Health: Y"
}

func (g *Game) Save() *GameMemento {
	// TODO: Return a new GameMemento with current state
	return nil
}

func (g *Game) Restore(memento *GameMemento) {
	// TODO: Restore health, level, and position from memento
	// TODO: Print "Game loaded: Level: X, Position: Y, Health: Z"
}

// Caretaker
type SaveManager struct {
	slots map[int]*GameMemento
}

func NewSaveManager() *SaveManager {
	return &SaveManager{
		slots: make(map[int]*GameMemento),
	}
}

func (s *SaveManager) Save(game *Game, slot int) {
	// TODO: Save game state to the given slot
}

func (s *SaveManager) Load(game *Game, slot int) {
	// TODO: Load game state from the given slot
	// TODO: Print "No save in slot X." if slot is empty
}

func main() {
	// game := NewGame()
	// saveManager := NewSaveManager()

	// game.Play()                // Level 2, Position 10
	// game.Play()                // Level 3, Position 20
	// saveManager.Save(game, 0)  // Save to slot 0

	// game.TakeDamage(50)        // Health: 50
	// game.Play()                // Level 4, Position 30
	// saveManager.Save(game, 1)  // Save to slot 1

	// game.TakeDamage(40)        // Health: 10
	// fmt.Println("\n--- Load Slot 0 ---")
	// saveManager.Load(game, 0)  // Back to: Health 100, Level 3, Position 20

	// fmt.Println("\n--- Load Slot 1 ---")
	// saveManager.Load(game, 1)  // Back to: Health 50, Level 4, Position 30

	_ = fmt.Sprintf
}
```

```csharp
using System;
using System.Collections.Generic;

// Memento
class GameMemento
{
    public int Health { get; }
    public int Level { get; }
    public int Position { get; }

    public GameMemento(int health, int level, int position)
    {
        // TODO: Store health, level, and position
    }
}

// Originator
class Game
{
    private int health = 100;
    private int level = 1;
    private int position = 0;

    public void Play()
    {
        // TODO: Increment level by 1 and position by 10
        // TODO: Print "Playing... Level: X, Position: Y, Health: Z"
    }

    public void TakeDamage(int amount)
    {
        // TODO: Reduce health by amount
        // TODO: Print "Took X damage. Health: Y"
    }

    public GameMemento Save()
    {
        // TODO: Return a new GameMemento with current state
        return null;
    }

    public void Restore(GameMemento memento)
    {
        // TODO: Restore health, level, and position from memento
        // TODO: Print "Game loaded: Level: X, Position: Y, Health: Z"
    }
}

// Caretaker
class SaveManager
{
    private readonly Dictionary<int, GameMemento> slots = new Dictionary<int, GameMemento>();

    public void Save(Game game, int slot)
    {
        // TODO: Save game state to the given slot
    }

    public void Load(Game game, int slot)
    {
        // TODO: Load game state from the given slot
        // TODO: Print "No save in slot X." if slot is empty
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Game game = new Game();
        // SaveManager saveManager = new SaveManager();

        // game.Play();                // Level 2, Position 10
        // game.Play();                // Level 3, Position 20
        // saveManager.Save(game, 0);  // Save to slot 0

        // game.TakeDamage(50);        // Health: 50
        // game.Play();                // Level 4, Position 30
        // saveManager.Save(game, 1);  // Save to slot 1

        // game.TakeDamage(40);        // Health: 10
        // Console.WriteLine("\n--- Load Slot 0 ---");
        // saveManager.Load(game, 0);  // Back to: Health 100, Level 3, Position 20

        // Console.WriteLine("\n--- Load Slot 1 ---");
        // saveManager.Load(game, 1);  // Back to: Health 50, Level 4, Position 30
    }
}
```

```typescript
// Memento
class GameMemento {
    private readonly _health: number;
    private readonly _level: number;
    private readonly _position: number;

    constructor(health: number, level: number, position: number) {
        // TODO: Store health, level, and position
        this._health = 0;
        this._level = 0;
        this._position = 0;
    }

    get health(): number {
        // TODO: Return health
        return this._health;
    }

    get level(): number {
        // TODO: Return level
        return this._level;
    }

    get position(): number {
        // TODO: Return position
        return this._position;
    }
}

// Originator
class Game {
    private health: number = 100;
    private level: number = 1;
    private position: number = 0;

    play(): void {
        // TODO: Increment level by 1 and position by 10
        // TODO: Print "Playing... Level: X, Position: Y, Health: Z"
    }

    takeDamage(amount: number): void {
        // TODO: Reduce health by amount
        // TODO: Print "Took X damage. Health: Y"
    }

    save(): GameMemento {
        // TODO: Return a new GameMemento with current state
        return null!;
    }

    restore(memento: GameMemento): void {
        // TODO: Restore health, level, and position from memento
        // TODO: Print "Game loaded: Level: X, Position: Y, Health: Z"
    }
}

// Caretaker
class SaveManager {
    private readonly slots: Map<number, GameMemento> = new Map();

    save(game: Game, slot: number): void {
        // TODO: Save game state to the given slot
    }

    load(game: Game, slot: number): void {
        // TODO: Load game state from the given slot
        // TODO: Print "No save in slot X." if slot is empty
    }
}

// const game = new Game();
// const saveManager = new SaveManager();

// game.play();                // Level 2, Position 10
// game.play();                // Level 3, Position 20
// saveManager.save(game, 0);  // Save to slot 0

// game.takeDamage(50);        // Health: 50
// game.play();                // Level 4, Position 30
// saveManager.save(game, 1);  // Save to slot 1

// game.takeDamage(40);        // Health: 10
// console.log("\n--- Load Slot 0 ---");
// saveManager.load(game, 0);  // Back to: Health 100, Level 3, Position 20

// console.log("\n--- Load Slot 1 ---");
// saveManager.load(game, 1);  // Back to: Health 50, Level 4, Position 30
```

#### Solutions

```java
import java.util.*;

// Memento
class GameMemento {
    private final int health;
    private final int level;
    private final int position;

    public GameMemento(int health, int level, int position) {
        this.health = health;
        this.level = level;
        this.position = position;
    }

    public int getHealth() { return health; }
    public int getLevel() { return level; }
    public int getPosition() { return position; }
}

// Originator
class Game {
    private int health = 100;
    private int level = 1;
    private int position = 0;

    public void play() {
        level++;
        position += 10;
        System.out.println("Playing... Level: " + level + ", Position: " + position + ", Health: " + health);
    }

    public void takeDamage(int amount) {
        health -= amount;
        System.out.println("Took " + amount + " damage. Health: " + health);
    }

    public GameMemento save() {
        return new GameMemento(health, level, position);
    }

    public void restore(GameMemento memento) {
        this.health = memento.getHealth();
        this.level = memento.getLevel();
        this.position = memento.getPosition();
        System.out.println("Game loaded: Level: " + level + ", Position: " + position + ", Health: " + health);
    }
}

// Caretaker
class SaveManager {
    private final Map<Integer, GameMemento> slots = new HashMap<>();

    public void save(Game game, int slot) {
        slots.put(slot, game.save());
    }

    public void load(Game game, int slot) {
        if (!slots.containsKey(slot)) {
            System.out.println("No save in slot " + slot + ".");
            return;
        }
        game.restore(slots.get(slot));
    }
}

public class Main {
    public static void main(String[] args) {
        Game game = new Game();
        SaveManager saveManager = new SaveManager();

        game.play();                // Level 2, Position 10
        game.play();                // Level 3, Position 20
        saveManager.save(game, 0);  // Save to slot 0

        game.takeDamage(50);        // Health: 50
        game.play();                // Level 4, Position 30
        saveManager.save(game, 1);  // Save to slot 1

        game.takeDamage(40);        // Health: 10
        System.out.println("\n--- Load Slot 0 ---");
        saveManager.load(game, 0);  // Back to: Health 100, Level 3, Position 20

        System.out.println("\n--- Load Slot 1 ---");
        saveManager.load(game, 1);  // Back to: Health 50, Level 4, Position 30
    }
}
```

```python
# Memento
class GameMemento:
    def __init__(self, health, level, position):
        self._health = health
        self._level = level
        self._position = position

    @property
    def health(self):
        return self._health

    @property
    def level(self):
        return self._level

    @property
    def position(self):
        return self._position

# Originator
class Game:
    def __init__(self):
        self.health = 100
        self.level = 1
        self.position = 0

    def play(self):
        self.level += 1
        self.position += 10
        print(f"Playing... Level: {self.level}, Position: {self.position}, Health: {self.health}")

    def take_damage(self, amount):
        self.health -= amount
        print(f"Took {amount} damage. Health: {self.health}")

    def save(self):
        return GameMemento(self.health, self.level, self.position)

    def restore(self, memento):
        self.health = memento.health
        self.level = memento.level
        self.position = memento.position
        print(f"Game loaded: Level: {self.level}, Position: {self.position}, Health: {self.health}")

# Caretaker
class SaveManager:
    def __init__(self):
        self.slots = {}

    def save(self, game, slot):
        self.slots[slot] = game.save()

    def load(self, game, slot):
        if slot not in self.slots:
            print(f"No save in slot {slot}.")
            return
        game.restore(self.slots[slot])

if __name__ == "__main__":
    game = Game()
    save_manager = SaveManager()

    game.play()                    # Level 2, Position 10
    game.play()                    # Level 3, Position 20
    save_manager.save(game, 0)     # Save to slot 0

    game.take_damage(50)           # Health: 50
    game.play()                    # Level 4, Position 30
    save_manager.save(game, 1)     # Save to slot 1

    game.take_damage(40)           # Health: 10
    print("\n--- Load Slot 0 ---")
    save_manager.load(game, 0)     # Back to: Health 100, Level 3, Position 20

    print("\n--- Load Slot 1 ---")
    save_manager.load(game, 1)     # Back to: Health 50, Level 4, Position 30
```

```cpp
#include <iostream>
#include <string>
#include <map>
using namespace std;

// Memento
class GameMemento {
    int health;
    int level;
    int position;

public:
    GameMemento(int health = 0, int level = 0, int position = 0)
        : health(health), level(level), position(position) {}

    int getHealth() const {
        return health;
    }

    int getLevel() const {
        return level;
    }

    int getPosition() const {
        return position;
    }
};

// Originator
class Game {
private:
    int health = 100;
    int level = 1;
    int position = 0;

public:
    void play() {
        level++;
        position += 10;
        cout << "Playing... Level: " << level << ", Position: " << position << ", Health: " << health << endl;
    }

    void takeDamage(int amount) {
        health -= amount;
        cout << "Took " << amount << " damage. Health: " << health << endl;
    }

    GameMemento save() {
        return GameMemento(health, level, position);
    }

    void restore(GameMemento memento) {
        health = memento.getHealth();
        level = memento.getLevel();
        position = memento.getPosition();
        cout << "Game loaded: Level: " << level << ", Position: " << position << ", Health: " << health << endl;
    }
};

// Caretaker
class SaveManager {
private:
    map<int, GameMemento> slots;

public:
    void save(Game& game, int slot) {
        slots[slot] = game.save();
    }

    void load(Game& game, int slot) {
        if (slots.find(slot) == slots.end()) {
            cout << "No save in slot " << slot << "." << endl;
            return;
        }
        game.restore(slots[slot]);
    }
};

int main() {
    Game game;
    SaveManager saveManager;

    game.play();                // Level 2, Position 10
    game.play();                // Level 3, Position 20
    saveManager.save(game, 0);  // Save to slot 0

    game.takeDamage(50);        // Health: 50
    game.play();                // Level 4, Position 30
    saveManager.save(game, 1);  // Save to slot 1

    game.takeDamage(40);        // Health: 10
    cout << "\n--- Load Slot 0 ---" << endl;
    saveManager.load(game, 0);  // Back to: Health 100, Level 3, Position 20

    cout << "\n--- Load Slot 1 ---" << endl;
    saveManager.load(game, 1);  // Back to: Health 50, Level 4, Position 30

    return 0;
}
```

```go
package main

import "fmt"

// Memento
type GameMemento struct {
	health   int
	level    int
	position int
}

func NewGameMemento(health, level, position int) GameMemento {
	return GameMemento{
		health:   health,
		level:    level,
		position: position,
	}
}

func (m GameMemento) Health() int {
	return m.health
}

func (m GameMemento) Level() int {
	return m.level
}

func (m GameMemento) Position() int {
	return m.position
}

// Originator
type Game struct {
	health   int
	level    int
	position int
}

func NewGame() *Game {
	return &Game{
		health:   100,
		level:    1,
		position: 0,
	}
}

func (g *Game) play() {
	g.level++
	g.position += 10
	fmt.Printf("Playing... Level: %d, Position: %d, Health: %d\n", g.level, g.position, g.health)
}

func (g *Game) takeDamage(amount int) {
	g.health -= amount
	fmt.Printf("Took %d damage. Health: %d\n", amount, g.health)
}

func (g *Game) save() GameMemento {
	return NewGameMemento(g.health, g.level, g.position)
}

func (g *Game) restore(memento GameMemento) {
	g.health = memento.Health()
	g.level = memento.Level()
	g.position = memento.Position()
	fmt.Printf("Game loaded: Level: %d, Position: %d, Health: %d\n", g.level, g.position, g.health)
}

// Caretaker
type SaveManager struct {
	slots map[int]GameMemento
}

func NewSaveManager() *SaveManager {
	return &SaveManager{
		slots: make(map[int]GameMemento),
	}
}

func (sm *SaveManager) save(game *Game, slot int) {
	sm.slots[slot] = game.save()
}

func (sm *SaveManager) load(game *Game, slot int) {
	memento, ok := sm.slots[slot]
	if !ok {
		fmt.Printf("No save in slot %d.\n", slot)
		return
	}
	game.restore(memento)
}

func main() {
	game := NewGame()
	saveManager := NewSaveManager()

	game.play()               // Level 2, Position 10
	game.play()               // Level 3, Position 20
	saveManager.save(game, 0) // Save to slot 0

	game.takeDamage(50)       // Health: 50
	game.play()               // Level 4, Position 30
	saveManager.save(game, 1) // Save to slot 1

	game.takeDamage(40) // Health: 10
	fmt.Println("\n--- Load Slot 0 ---")
	saveManager.load(game, 0) // Back to: Health 100, Level 3, Position 20

	fmt.Println("\n--- Load Slot 1 ---")
	saveManager.load(game, 1) // Back to: Health 50, Level 4, Position 30
}
```

```csharp
using System;
using System.Collections.Generic;

// Memento
class GameMemento
{
    public int Health { get; }
    public int Level { get; }
    public int Position { get; }

    public GameMemento(int health, int level, int position)
    {
        Health = health;
        Level = level;
        Position = position;
    }
}

// Originator
class Game
{
    private int health = 100;
    private int level = 1;
    private int position = 0;

    public void Play()
    {
        level++;
        position += 10;
        Console.WriteLine($"Playing... Level: {level}, Position: {position}, Health: {health}");
    }

    public void TakeDamage(int amount)
    {
        health -= amount;
        Console.WriteLine($"Took {amount} damage. Health: {health}");
    }

    public GameMemento Save()
    {
        return new GameMemento(health, level, position);
    }

    public void Restore(GameMemento memento)
    {
        health = memento.Health;
        level = memento.Level;
        position = memento.Position;
        Console.WriteLine($"Game loaded: Level: {level}, Position: {position}, Health: {health}");
    }
}

// Caretaker
class SaveManager
{
    private readonly Dictionary<int, GameMemento> slots = new Dictionary<int, GameMemento>();

    public void Save(Game game, int slot)
    {
        slots[slot] = game.Save();
    }

    public void Load(Game game, int slot)
    {
        if (!slots.ContainsKey(slot))
        {
            Console.WriteLine($"No save in slot {slot}.");
            return;
        }
        game.Restore(slots[slot]);
    }
}

class Program
{
    static void Main(string[] args)
    {
        Game game = new Game();
        SaveManager saveManager = new SaveManager();

        game.Play();                // Level 2, Position 10
        game.Play();                // Level 3, Position 20
        saveManager.Save(game, 0);  // Save to slot 0

        game.TakeDamage(50);        // Health: 50
        game.Play();                // Level 4, Position 30
        saveManager.Save(game, 1);  // Save to slot 1

        game.TakeDamage(40);        // Health: 10
        Console.WriteLine("\n--- Load Slot 0 ---");
        saveManager.Load(game, 0);  // Back to: Health 100, Level 3, Position 20

        Console.WriteLine("\n--- Load Slot 1 ---");
        saveManager.Load(game, 1);  // Back to: Health 50, Level 4, Position 30
    }
}
```

```typescript
// Memento
class GameMemento {
    private readonly _health: number;
    private readonly _level: number;
    private readonly _position: number;

    constructor(health: number, level: number, position: number) {
        this._health = health;
        this._level = level;
        this._position = position;
    }

    get health(): number {
        return this._health;
    }
    get level(): number {
        return this._level;
    }
    get position(): number {
        return this._position;
    }
}

// Originator
class Game {
    private health: number = 100;
    private level: number = 1;
    private position: number = 0;

    play(): void {
        this.level++;
        this.position += 10;
        console.log(`Playing... Level: ${this.level}, Position: ${this.position}, Health: ${this.health}`);
    }

    takeDamage(amount: number): void {
        this.health -= amount;
        console.log(`Took ${amount} damage. Health: ${this.health}`);
    }

    save(): GameMemento {
        return new GameMemento(this.health, this.level, this.position);
    }

    restore(memento: GameMemento): void {
        this.health = memento.health;
        this.level = memento.level;
        this.position = memento.position;
        console.log(`Game loaded: Level: ${this.level}, Position: ${this.position}, Health: ${this.health}`);
    }
}

// Caretaker
class SaveManager {
    private readonly slots: Map<number, GameMemento> = new Map();

    save(game: Game, slot: number): void {
        this.slots.set(slot, game.save());
    }

    load(game: Game, slot: number): void {
        const memento = this.slots.get(slot);
        if (!memento) {
            console.log(`No save in slot ${slot}.`);
            return;
        }
        game.restore(memento);
    }
}

const game = new Game();
const saveManager = new SaveManager();

game.play();                // Level 2, Position 10
game.play();                // Level 3, Position 20
saveManager.save(game, 0);  // Save to slot 0

game.takeDamage(50);        // Health: 50
game.play();                // Level 4, Position 30
saveManager.save(game, 1);  // Save to slot 1

game.takeDamage(40);        // Health: 10
console.log("\n--- Load Slot 0 ---");
saveManager.load(game, 0);  // Back to: Health 100, Level 3, Position 20

console.log("\n--- Load Slot 1 ---");
saveManager.load(game, 1);  // Back to: Health 50, Level 4, Position 30
```

---

# Exercise 2: Form Wizard with Back Button

> [!PAYWALL] This content is for premium members only.

Build a multi-step form wizard. Each step saves the form's current state. The user can go back to any previous step, and all fields from that step onward are restored.

**Requirements:**

- `FormMemento` stores a map of field name to field value
- `Form` originator with `setField(name, value)`, `getFields()`, `save()`, and `restore(memento)` methods
- `WizardHistory` caretaker that manages a stack of mementos
- The form should support going back one step at a time

```java
import java.util.*;

// Memento
class FormMemento {
    private final Map<String, String> fields;

    public FormMemento(Map<String, String> fields) {
        // TODO: Store a deep copy of the fields map
        this.fields = null;
    }

    public Map<String, String> getFields() {
        // TODO: Return a copy of the fields map
        return null;
    }
}

// Originator
class Form {
    private Map<String, String> fields = new LinkedHashMap<>();

    public void setField(String name, String value) {
        // TODO: Add or update the field
    }

    public Map<String, String> getFields() {
        // TODO: Return a copy of the fields map
        return null;
    }

    public FormMemento save() {
        // TODO: Return a new FormMemento with a deep copy of fields
        return null;
    }

    public void restore(FormMemento memento) {
        // TODO: Restore fields from memento
        // TODO: Print "Restored form fields"
    }
}

// Caretaker
class WizardHistory {
    private final Stack<FormMemento> history = new Stack<>();

    public void save(Form form) {
        // TODO: Push form's current state onto the history stack
    }

    public void back(Form form) {
        // TODO: Pop the most recent memento and restore form
        // TODO: Print "No previous step." if history is empty
    }
}

public class Main {
    public static void main(String[] args) {
        // Form form = new Form();
        // WizardHistory wizard = new WizardHistory();

        // // Step 1: Personal Info
        // wizard.save(form);
        // form.setField("name", "Alice");
        // form.setField("email", "alice@example.com");
        // System.out.println("Step 1: " + form.getFields());

        // // Step 2: Address
        // wizard.save(form);
        // form.setField("street", "123 Main St");
        // form.setField("city", "Springfield");
        // System.out.println("Step 2: " + form.getFields());

        // // Step 3: Payment
        // wizard.save(form);
        // form.setField("cardNumber", "4111-1111-1111-1111");
        // System.out.println("Step 3: " + form.getFields());

        // // Go back to Step 2
        // System.out.println("\n--- Back ---");
        // wizard.back(form);
        // System.out.println("After back: " + form.getFields());

        // // Go back to Step 1
        // System.out.println("\n--- Back ---");
        // wizard.back(form);
        // System.out.println("After back: " + form.getFields());
    }
}
```

```python
# Memento
class FormMemento:
    def __init__(self, fields):
        pass  # TODO: Store a deep copy of the fields dict

    def get_fields(self):
        pass  # TODO: Return a copy of the fields dict

# Originator
class Form:
    def __init__(self):
        self.fields = {}

    def set_field(self, name, value):
        pass  # TODO: Add or update the field

    def get_fields(self):
        pass  # TODO: Return a copy of the fields dict

    def save(self):
        pass  # TODO: Return a new FormMemento with a deep copy of fields

    def restore(self, memento):
        pass  # TODO: Restore fields from memento
              # TODO: Print "Restored form fields"

# Caretaker
class WizardHistory:
    def __init__(self):
        self.history = []

    def save(self, form):
        pass  # TODO: Push form's current state onto the history stack

    def back(self, form):
        pass  # TODO: Pop the most recent memento and restore form
              # TODO: Print "No previous step." if history is empty

if __name__ == "__main__":
    # form = Form()
    # wizard = WizardHistory()

    # # Step 1: Personal Info
    # wizard.save(form)
    # form.set_field("name", "Alice")
    # form.set_field("email", "alice@example.com")
    # print(f"Step 1: {form.get_fields()}")

    # # Step 2: Address
    # wizard.save(form)
    # form.set_field("street", "123 Main St")
    # form.set_field("city", "Springfield")
    # print(f"Step 2: {form.get_fields()}")

    # # Step 3: Payment
    # wizard.save(form)
    # form.set_field("cardNumber", "4111-1111-1111-1111")
    # print(f"Step 3: {form.get_fields()}")

    # # Go back to Step 2
    # print("\n--- Back ---")
    # wizard.back(form)
    # print(f"After back: {form.get_fields()}")

    # # Go back to Step 1
    # print("\n--- Back ---")
    # wizard.back(form)
    # print(f"After back: {form.get_fields()}")
    pass
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <stack>
using namespace std;

// Memento
class FormMemento {
    map<string, string> fields;
    vector<string> keys;

public:
    FormMemento() {}
    FormMemento(const map<string, string>& fields, const vector<string>& keys)
        : fields(fields), keys(keys) {
        // TODO: Store a deep copy of the fields map and keys vector
    }

    map<string, string> getFields() const {
        // TODO: Return a copy of the fields map
        return fields;
    }

    vector<string> getKeys() const {
        // TODO: Return a copy of the keys vector
        return keys;
    }
};

// Originator
class Form {
private:
    map<string, string> fields;
    vector<string> keys;

public:
    void setField(string name, string value) {
        // TODO: Add or update the field
        // TODO: Track insertion order in keys vector (only add new keys)
    }

    string getFieldsString() {
        string result = "{";
        for (size_t i = 0; i < keys.size(); i++) {
            if (i > 0) result += ", ";
            result += keys[i] + "=" + fields[keys[i]];
        }
        result += "}";
        return result;
    }

    FormMemento save() {
        // TODO: Return a new FormMemento with fields and keys
        return FormMemento();
    }

    void restore(FormMemento memento) {
        // TODO: Restore fields and keys from memento
        // TODO: Print "Restored form fields"
    }
};

// Caretaker
class WizardHistory {
private:
    stack<FormMemento> history;

public:
    void save(Form& form) {
        // TODO: Push form's current state onto the history stack
    }

    void back(Form& form) {
        // TODO: Pop the most recent memento and restore form
        // TODO: Print "No previous step." if history is empty
    }
};

int main() {
    // Form form;
    // WizardHistory wizard;

    // wizard.save(form);
    // form.setField("name", "Alice");
    // form.setField("email", "alice@example.com");
    // cout << "Step 1: " << form.getFieldsString() << endl;

    // wizard.save(form);
    // form.setField("street", "123 Main St");
    // form.setField("city", "Springfield");
    // cout << "Step 2: " << form.getFieldsString() << endl;

    // wizard.save(form);
    // form.setField("cardNumber", "4111-1111-1111-1111");
    // cout << "Step 3: " << form.getFieldsString() << endl;

    // cout << "\n--- Back ---" << endl;
    // wizard.back(form);
    // cout << "After back: " << form.getFieldsString() << endl;

    // cout << "\n--- Back ---" << endl;
    // wizard.back(form);
    // cout << "After back: " << form.getFieldsString() << endl;

    return 0;
}
```

```go
package main

import "fmt"

// Memento
type FormMemento struct {
	fields map[string]string
}

func NewFormMemento(fields map[string]string) *FormMemento {
	// TODO: Store a deep copy of the fields map
	return &FormMemento{
		fields: nil,
	}
}

func (m *FormMemento) GetFields() map[string]string {
	// TODO: Return a copy of the fields map
	return nil
}

// Originator
type Form struct {
	fields map[string]string
}

func NewForm() *Form {
	return &Form{
		fields: make(map[string]string),
	}
}

func (f *Form) SetField(name string, value string) {
	// TODO: Add or update the field
}

func (f *Form) GetFields() map[string]string {
	// TODO: Return a copy of the fields map
	return nil
}

func (f *Form) Save() *FormMemento {
	// TODO: Return a new FormMemento with a deep copy of fields
	return nil
}

func (f *Form) Restore(memento *FormMemento) {
	// TODO: Restore fields from memento
	// TODO: Print "Restored form fields"
}

// Caretaker
type WizardHistory struct {
	history []*FormMemento
}

func NewWizardHistory() *WizardHistory {
	return &WizardHistory{
		history: make([]*FormMemento, 0),
	}
}

func (w *WizardHistory) Save(form *Form) {
	// TODO: Push form's current state onto the history stack
}

func (w *WizardHistory) Back(form *Form) {
	// TODO: Pop the most recent memento and restore form
	// TODO: Print "No previous step." if history is empty
}

func main() {
	_ = fmt.Printf
	// form := NewForm()
	// wizard := NewWizardHistory()

	// // Step 1: Personal Info
	// wizard.Save(form)
	// form.SetField("name", "Alice")
	// form.SetField("email", "alice@example.com")
	// fmt.Println("Step 1:", form.GetFields())

	// // Step 2: Address
	// wizard.Save(form)
	// form.SetField("street", "123 Main St")
	// form.SetField("city", "Springfield")
	// fmt.Println("Step 2:", form.GetFields())

	// // Step 3: Payment
	// wizard.Save(form)
	// form.SetField("cardNumber", "4111-1111-1111-1111")
	// fmt.Println("Step 3:", form.GetFields())

	// // Go back to Step 2
	// fmt.Println("\n--- Back ---")
	// wizard.Back(form)
	// fmt.Println("After back:", form.GetFields())

	// // Go back to Step 1
	// fmt.Println("\n--- Back ---")
	// wizard.Back(form)
	// fmt.Println("After back:", form.GetFields())
}
```

```csharp
using System;
using System.Collections.Generic;

// Memento
class FormMemento
{
    private readonly Dictionary<string, string> fields;

    public FormMemento(Dictionary<string, string> fields)
    {
        // TODO: Store a deep copy of the fields dictionary
        this.fields = null;
    }

    public Dictionary<string, string> GetFields()
    {
        // TODO: Return a copy of the fields dictionary
        return null;
    }
}

// Originator
class Form
{
    private Dictionary<string, string> fields = new Dictionary<string, string>();

    public void SetField(string name, string value)
    {
        // TODO: Add or update the field
    }

    public Dictionary<string, string> GetFields()
    {
        // TODO: Return a copy of the fields dictionary
        return null;
    }

    public FormMemento Save()
    {
        // TODO: Return a new FormMemento with a deep copy of fields
        return null;
    }

    public void Restore(FormMemento memento)
    {
        // TODO: Restore fields from memento
        // TODO: Print "Restored form fields"
    }
}

// Caretaker
class WizardHistory
{
    private readonly Stack<FormMemento> history = new Stack<FormMemento>();

    public void Save(Form form)
    {
        // TODO: Push form's current state onto the history stack
    }

    public void Back(Form form)
    {
        // TODO: Pop the most recent memento and restore form
        // TODO: Print "No previous step." if history is empty
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Form form = new Form();
        // WizardHistory wizard = new WizardHistory();

        // wizard.Save(form);
        // form.SetField("name", "Alice");
        // form.SetField("email", "alice@example.com");
        // Console.WriteLine("Step 1: " + form.GetFieldsString());

        // wizard.Save(form);
        // form.SetField("street", "123 Main St");
        // form.SetField("city", "Springfield");
        // Console.WriteLine("Step 2: " + form.GetFieldsString());

        // wizard.Save(form);
        // form.SetField("cardNumber", "4111-1111-1111-1111");
        // Console.WriteLine("Step 3: " + form.GetFieldsString());

        // Console.WriteLine("\n--- Back ---");
        // wizard.Back(form);

        // Console.WriteLine("\n--- Back ---");
        // wizard.Back(form);
    }
}
```

```typescript
// Memento
class FormMemento {
    private readonly fields: Map<string, string>;

    constructor(fields: Map<string, string>) {
        // TODO: Store a deep copy of the fields map
        this.fields = new Map();
    }

    getFields(): Map<string, string> {
        // TODO: Return a copy of the fields map
        return new Map();
    }
}

// Originator
class Form {
    private fields: Map<string, string> = new Map();

    setField(name: string, value: string): void {
        // TODO: Add or update the field
    }

    getFields(): Map<string, string> {
        // TODO: Return a copy of the fields map
        return new Map();
    }

    save(): FormMemento {
        // TODO: Return a new FormMemento with a deep copy of fields
        return null!;
    }

    restore(memento: FormMemento): void {
        // TODO: Restore fields from memento
        // TODO: Print "Restored form fields"
    }
}

// Caretaker
class WizardHistory {
    private readonly history: FormMemento[] = [];

    save(form: Form): void {
        // TODO: Push form's current state onto the history stack
    }

    back(form: Form): void {
        // TODO: Pop the most recent memento and restore form
        // TODO: Print "No previous step." if history is empty
    }
}

// const form = new Form();
// const wizard = new WizardHistory();

// wizard.save(form);
// form.setField("name", "Alice");
// form.setField("email", "alice@example.com");
// console.log("Step 1:", form.getFields());

// wizard.save(form);
// form.setField("street", "123 Main St");
// form.setField("city", "Springfield");
// console.log("Step 2:", form.getFields());

// wizard.save(form);
// form.setField("cardNumber", "4111-1111-1111-1111");
// console.log("Step 3:", form.getFields());

// console.log("\n--- Back ---");
// wizard.back(form);

// console.log("\n--- Back ---");
// wizard.back(form);
```

#### Solutions

```java
import java.util.*;

// Memento
class FormMemento {
    private final Map<String, String> fields;

    public FormMemento(Map<String, String> fields) {
        this.fields = new LinkedHashMap<>(fields);
    }

    public Map<String, String> getFields() {
        return new LinkedHashMap<>(fields);
    }
}

// Originator
class Form {
    private Map<String, String> fields = new LinkedHashMap<>();

    public void setField(String name, String value) {
        fields.put(name, value);
    }

    public Map<String, String> getFields() {
        return new LinkedHashMap<>(fields);
    }

    public FormMemento save() {
        return new FormMemento(fields);
    }

    public void restore(FormMemento memento) {
        this.fields = memento.getFields();
        System.out.println("Restored form fields");
    }
}

// Caretaker
class WizardHistory {
    private final Stack<FormMemento> history = new Stack<>();

    public void save(Form form) {
        history.push(form.save());
    }

    public void back(Form form) {
        if (history.isEmpty()) {
            System.out.println("No previous step.");
            return;
        }
        form.restore(history.pop());
    }
}

public class Main {
    public static void main(String[] args) {
        Form form = new Form();
        WizardHistory wizard = new WizardHistory();

        // Step 1: Personal Info
        wizard.save(form);
        form.setField("name", "Alice");
        form.setField("email", "alice@example.com");
        System.out.println("Step 1: " + form.getFields());

        // Step 2: Address
        wizard.save(form);
        form.setField("street", "123 Main St");
        form.setField("city", "Springfield");
        System.out.println("Step 2: " + form.getFields());

        // Step 3: Payment
        wizard.save(form);
        form.setField("cardNumber", "4111-1111-1111-1111");
        System.out.println("Step 3: " + form.getFields());

        // Go back to Step 2
        System.out.println("\n--- Back ---");
        wizard.back(form);
        System.out.println("After back: " + form.getFields());

        // Go back to Step 1
        System.out.println("\n--- Back ---");
        wizard.back(form);
        System.out.println("After back: " + form.getFields());
    }
}
```

```python
# Memento
class FormMemento:
    def __init__(self, fields):
        self._fields = dict(fields)

    def get_fields(self):
        return dict(self._fields)

# Originator
class Form:
    def __init__(self):
        self.fields = {}

    def set_field(self, name, value):
        self.fields[name] = value

    def get_fields(self):
        return dict(self.fields)

    def get_fields_string(self):
        return "{" + ", ".join(f"{k}={v}" for k, v in self.fields.items()) + "}"

    def save(self):
        return FormMemento(self.fields)

    def restore(self, memento):
        self.fields = memento.get_fields()
        print("Restored form fields")

# Caretaker
class WizardHistory:
    def __init__(self):
        self.history = []

    def save(self, form):
        self.history.append(form.save())

    def back(self, form):
        if not self.history:
            print("No previous step.")
            return
        form.restore(self.history.pop())

if __name__ == "__main__":
    form = Form()
    wizard = WizardHistory()

    # Step 1: Personal Info
    wizard.save(form)
    form.set_field("name", "Alice")
    form.set_field("email", "alice@example.com")
    print(f"Step 1: {form.get_fields_string()}")

    # Step 2: Address
    wizard.save(form)
    form.set_field("street", "123 Main St")
    form.set_field("city", "Springfield")
    print(f"Step 2: {form.get_fields_string()}")

    # Step 3: Payment
    wizard.save(form)
    form.set_field("cardNumber", "4111-1111-1111-1111")
    print(f"Step 3: {form.get_fields_string()}")

    # Go back to Step 2
    print("\n--- Back ---")
    wizard.back(form)
    print(f"After back: {form.get_fields_string()}")

    # Go back to Step 1
    print("\n--- Back ---")
    wizard.back(form)
    print(f"After back: {form.get_fields_string()}")
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <stack>
using namespace std;

// Memento
class FormMemento {
    map<string, string> fields;
    vector<string> keys;

public:
    FormMemento() {}
    FormMemento(const map<string, string>& fields, const vector<string>& keys)
        : fields(fields), keys(keys) {}

    map<string, string> getFields() const {
        return fields;
    }

    vector<string> getKeys() const {
        return keys;
    }
};

// Originator
class Form {
private:
    map<string, string> fields;
    vector<string> keys;

public:
    void setField(string name, string value) {
        if (fields.find(name) == fields.end()) {
            keys.push_back(name);
        }
        fields[name] = value;
    }

    string getFieldsString() {
        string result = "{";
        for (size_t i = 0; i < keys.size(); i++) {
            if (i > 0) result += ", ";
            result += keys[i] + "=" + fields[keys[i]];
        }
        result += "}";
        return result;
    }

    FormMemento save() {
        return FormMemento(fields, keys);
    }

    void restore(FormMemento memento) {
        fields = memento.getFields();
        keys = memento.getKeys();
        cout << "Restored form fields" << endl;
    }
};

// Caretaker
class WizardHistory {
private:
    stack<FormMemento> history;

public:
    void save(Form& form) {
        history.push(form.save());
    }

    void back(Form& form) {
        if (history.empty()) {
            cout << "No previous step." << endl;
            return;
        }
        form.restore(history.top());
        history.pop();
    }
};

int main() {
    Form form;
    WizardHistory wizard;

    wizard.save(form);
    form.setField("name", "Alice");
    form.setField("email", "alice@example.com");
    cout << "Step 1: " << form.getFieldsString() << endl;

    wizard.save(form);
    form.setField("street", "123 Main St");
    form.setField("city", "Springfield");
    cout << "Step 2: " << form.getFieldsString() << endl;

    wizard.save(form);
    form.setField("cardNumber", "4111-1111-1111-1111");
    cout << "Step 3: " << form.getFieldsString() << endl;

    cout << "\n--- Back ---" << endl;
    wizard.back(form);
    cout << "After back: " << form.getFieldsString() << endl;

    cout << "\n--- Back ---" << endl;
    wizard.back(form);
    cout << "After back: " << form.getFieldsString() << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

// Memento
type FormMemento struct {
	fields map[string]string
}

func NewFormMemento(fields map[string]string) FormMemento {
	copied := make(map[string]string, len(fields))
	for k, v := range fields {
		copied[k] = v
	}
	return FormMemento{fields: copied}
}

func (m FormMemento) GetFields() map[string]string {
	copied := make(map[string]string, len(m.fields))
	for k, v := range m.fields {
		copied[k] = v
	}
	return copied
}

// Originator
type Form struct {
	fields map[string]string
}

func NewForm() *Form {
	return &Form{fields: make(map[string]string)}
}

func (f *Form) SetField(name, value string) {
	f.fields[name] = value
}

func (f *Form) GetFields() map[string]string {
	copied := make(map[string]string, len(f.fields))
	for k, v := range f.fields {
		copied[k] = v
	}
	return copied
}

func (f *Form) GetFieldsString() string {
	keys := make([]string, 0, len(f.fields))
	for k := range f.fields {
		keys = append(keys, k)
	}
	// Keep output stable and readable.
	// The references preserve insertion order in some languages, but Go maps are unordered.
	// Sort-like deterministic ordering is not required by the problem, but we keep it stable.
	sortStrings(keys)

	parts := make([]string, 0, len(keys))
	for _, k := range keys {
		parts = append(parts, k+"="+f.fields[k])
	}
	return "{" + strings.Join(parts, ", ") + "}"
}

func (f *Form) Save() FormMemento {
	return NewFormMemento(f.fields)
}

func (f *Form) Restore(memento FormMemento) {
	f.fields = memento.GetFields()
	fmt.Println("Restored form fields")
}

// Caretaker
type WizardHistory struct {
	history []FormMemento
}

func NewWizardHistory() *WizardHistory {
	return &WizardHistory{history: make([]FormMemento, 0)}
}

func (w *WizardHistory) Save(form *Form) {
	w.history = append(w.history, form.Save())
}

func (w *WizardHistory) Back(form *Form) {
	if len(w.history) == 0 {
		fmt.Println("No previous step.")
		return
	}
	last := w.history[len(w.history)-1]
	w.history = w.history[:len(w.history)-1]
	form.Restore(last)
}

func sortStrings(a []string) {
	for i := 1; i < len(a); i++ {
		j := i
		for j > 0 && a[j-1] > a[j] {
			a[j-1], a[j] = a[j], a[j-1]
			j--
		}
	}
}

func main() {
	form := NewForm()
	wizard := NewWizardHistory()

	// Step 1: Personal Info
	wizard.Save(form)
	form.SetField("name", "Alice")
	form.SetField("email", "alice@example.com")
	fmt.Println("Step 1:", form.GetFieldsString())

	// Step 2: Address
	wizard.Save(form)
	form.SetField("street", "123 Main St")
	form.SetField("city", "Springfield")
	fmt.Println("Step 2:", form.GetFieldsString())

	// Step 3: Payment
	wizard.Save(form)
	form.SetField("cardNumber", "4111-1111-1111-1111")
	fmt.Println("Step 3:", form.GetFieldsString())

	// Go back to Step 2
	fmt.Println("\n--- Back ---")
	wizard.Back(form)
	fmt.Println("After back:", form.GetFieldsString())

	// Go back to Step 1
	fmt.Println("\n--- Back ---")
	wizard.Back(form)
	fmt.Println("After back:", form.GetFieldsString())
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

// Memento
class FormMemento
{
    private readonly Dictionary<string, string> fields;

    public FormMemento(Dictionary<string, string> fields)
    {
        this.fields = new Dictionary<string, string>(fields);
    }

    public Dictionary<string, string> GetFields()
    {
        return new Dictionary<string, string>(fields);
    }
}

// Originator
class Form
{
    private Dictionary<string, string> fields = new Dictionary<string, string>();

    public void SetField(string name, string value)
    {
        fields[name] = value;
    }

    public Dictionary<string, string> GetFields()
    {
        return new Dictionary<string, string>(fields);
    }

    public string GetFieldsString()
    {
        return "{" + string.Join(", ", fields.Select(kv => kv.Key + "=" + kv.Value)) + "}";
    }

    public FormMemento Save()
    {
        return new FormMemento(fields);
    }

    public void Restore(FormMemento memento)
    {
        fields = memento.GetFields();
        Console.WriteLine("Restored form fields");
    }
}

// Caretaker
class WizardHistory
{
    private readonly Stack<FormMemento> history = new Stack<FormMemento>();

    public void Save(Form form)
    {
        history.Push(form.Save());
    }

    public void Back(Form form)
    {
        if (history.Count == 0)
        {
            Console.WriteLine("No previous step.");
            return;
        }
        form.Restore(history.Pop());
    }
}

class Program
{
    static void Main(string[] args)
    {
        Form form = new Form();
        WizardHistory wizard = new WizardHistory();

        wizard.Save(form);
        form.SetField("name", "Alice");
        form.SetField("email", "alice@example.com");
        Console.WriteLine("Step 1: " + form.GetFieldsString());

        wizard.Save(form);
        form.SetField("street", "123 Main St");
        form.SetField("city", "Springfield");
        Console.WriteLine("Step 2: " + form.GetFieldsString());

        wizard.Save(form);
        form.SetField("cardNumber", "4111-1111-1111-1111");
        Console.WriteLine("Step 3: " + form.GetFieldsString());

        Console.WriteLine("\n--- Back ---");
        wizard.Back(form);
        Console.WriteLine("After back: " + form.GetFieldsString());

        Console.WriteLine("\n--- Back ---");
        wizard.Back(form);
        Console.WriteLine("After back: " + form.GetFieldsString());
    }
}
```

```typescript
// Memento
class FormMemento {
    private readonly fields: Map<string, string>;

    constructor(fields: Map<string, string>) {
        this.fields = new Map(fields);
    }

    getFields(): Map<string, string> {
        return new Map(this.fields);
    }
}

// Originator
class Form {
    private fields: Map<string, string> = new Map();

    setField(name: string, value: string): void {
        this.fields.set(name, value);
    }

    getFields(): Map<string, string> {
        return new Map(this.fields);
    }

    getFieldsString(): string {
        const entries: string[] = [];
        this.fields.forEach((v, k) => entries.push(`${k}=${v}`));
        return `{${entries.join(", ")}}`;
    }

    save(): FormMemento {
        return new FormMemento(this.fields);
    }

    restore(memento: FormMemento): void {
        this.fields = memento.getFields();
        console.log("Restored form fields");
    }
}

// Caretaker
class WizardHistory {
    private readonly history: FormMemento[] = [];

    save(form: Form): void {
        this.history.push(form.save());
    }

    back(form: Form): void {
        if (this.history.length === 0) {
            console.log("No previous step.");
            return;
        }
        form.restore(this.history.pop()!);
    }
}

const form = new Form();
const wizard = new WizardHistory();

wizard.save(form);
form.setField("name", "Alice");
form.setField("email", "alice@example.com");
console.log("Step 1:", form.getFieldsString());

wizard.save(form);
form.setField("street", "123 Main St");
form.setField("city", "Springfield");
console.log("Step 2:", form.getFieldsString());

wizard.save(form);
form.setField("cardNumber", "4111-1111-1111-1111");
console.log("Step 3:", form.getFieldsString());

console.log("\n--- Back ---");
wizard.back(form);
console.log("After back:", form.getFieldsString());

console.log("\n--- Back ---");
wizard.back(form);
console.log("After back:", form.getFieldsString());
```

---

# Exercise 3: Collaborative Document with Version History

Build a document editor that supports named versions. Users can save versions with descriptive names, list all saved versions, restore to any named version, and view the differences between two versions.

**Requirements:**

- `DocumentMemento` stores content (String) and a timestamp
- `Document` originator with `write(text)` (appends), `getContent()`, `save(versionName)`, and `restore(memento)` methods
- `VersionHistory` caretaker with `save(name, document)`, `listVersions()`, `restore(name, document)`, and `diff(name1, name2)` methods
- `diff` should show which lines were added or removed between two versions (simple line-by-line comparison)

```java
import java.util.*;

// Memento
class DocumentMemento {
    private static int counter = 0;
    private final String content;
    private final int versionNumber;

    public DocumentMemento(String content) {
        // TODO: Store content and set versionNumber to ++counter
        this.content = null;
        this.versionNumber = 0;
    }

    public String getContent() {
        // TODO: Return content
        return null;
    }

    public int getVersionNumber() {
        // TODO: Return versionNumber
        return 0;
    }
}

// Originator
class Document {
    private String content = "";

    public void write(String text) {
        // TODO: Append text + newline to content
    }

    public String getContent() {
        // TODO: Return content
        return null;
    }

    public DocumentMemento save() {
        // TODO: Return a new DocumentMemento with current content
        return null;
    }

    public void restore(DocumentMemento memento) {
        // TODO: Restore content from memento
    }
}

// Caretaker
class VersionHistory {
    private final Map<String, DocumentMemento> versions = new LinkedHashMap<>();

    public void save(String name, Document document) {
        // TODO: Save document state with version name
    }

    public void listVersions() {
        // TODO: Print all version names with version numbers
    }

    public void restore(String name, Document document) {
        // TODO: Restore to named version, print "Restored to version: X"
        // TODO: Print "Version not found: X" if missing
    }

    public void diff(String name1, String name2) {
        // TODO: Show line-by-line differences between two versions
        // TODO: Prefix with + for added, - for removed, space for unchanged
    }
}

public class Main {
    public static void main(String[] args) {
        // Document doc = new Document();
        // VersionHistory versions = new VersionHistory();

        // doc.write("# My Document");
        // doc.write("Introduction paragraph.");
        // versions.save("v1-intro", doc);

        // doc.write("Chapter 1 content.");
        // doc.write("Chapter 2 content.");
        // versions.save("v2-chapters", doc);

        // doc.write("Conclusion paragraph.");
        // versions.save("v3-complete", doc);

        // System.out.println("--- All Versions ---");
        // versions.listVersions();

        // System.out.println("\n--- Diff v1-intro vs v2-chapters ---");
        // versions.diff("v1-intro", "v2-chapters");

        // System.out.println("\n--- Restore to v2-chapters ---");
        // versions.restore("v2-chapters", doc);
        // System.out.println("Content:\n" + doc.getContent());
    }
}
```

```python
# Memento
class DocumentMemento:
    _counter = 0

    def __init__(self, content):
        pass  # TODO: Store content and set version_number to incremented counter

    def get_content(self):
        pass  # TODO: Return content

    def get_version_number(self):
        pass  # TODO: Return version_number

# Originator
class Document:
    def __init__(self):
        self.content = ""

    def write(self, text):
        pass  # TODO: Append text + newline to content

    def get_content(self):
        pass  # TODO: Return content

    def save(self):
        pass  # TODO: Return a new DocumentMemento with current content

    def restore(self, memento):
        pass  # TODO: Restore content from memento

# Caretaker
class VersionHistory:
    def __init__(self):
        self.versions = {}

    def save(self, name, document):
        pass  # TODO: Save document state with version name

    def list_versions(self):
        pass  # TODO: Print all version names with version numbers

    def restore(self, name, document):
        pass  # TODO: Restore to named version, print "Restored to version: X"
              # TODO: Print "Version not found: X" if missing

    def diff(self, name1, name2):
        pass  # TODO: Show line-by-line differences between two versions
              # TODO: Prefix with + for added, - for removed, space for unchanged

if __name__ == "__main__":
    # doc = Document()
    # versions = VersionHistory()

    # doc.write("# My Document")
    # doc.write("Introduction paragraph.")
    # versions.save("v1-intro", doc)

    # doc.write("Chapter 1 content.")
    # doc.write("Chapter 2 content.")
    # versions.save("v2-chapters", doc)

    # doc.write("Conclusion paragraph.")
    # versions.save("v3-complete", doc)

    # print("--- All Versions ---")
    # versions.list_versions()

    # print("\n--- Diff v1-intro vs v2-chapters ---")
    # versions.diff("v1-intro", "v2-chapters")

    # print("\n--- Restore to v2-chapters ---")
    # versions.restore("v2-chapters", doc)
    # print(f"Content:\n{doc.get_content()}")
    pass
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <sstream>
using namespace std;

// Memento
class DocumentMemento {
    static int counter;
    string content;
    int versionNumber;

public:
    DocumentMemento() : content(""), versionNumber(0) {}
    DocumentMemento(const string& content) : content(content), versionNumber(0) {
        // TODO: Store content and set versionNumber to ++counter
    }

    const string& getContent() const {
        // TODO: Return content
        return content;
    }

    int getVersionNumber() const {
        // TODO: Return versionNumber
        return versionNumber;
    }
};

int DocumentMemento::counter = 0;

// Originator
class Document {
private:
    string content;

public:
    Document() : content("") {}

    void write(string text) {
        // TODO: Append text + newline to content
    }

    string getContent() {
        // TODO: Return content
        return "";
    }

    DocumentMemento save() {
        // TODO: Return a new DocumentMemento with current content
        return DocumentMemento();
    }

    void restore(DocumentMemento memento) {
        // TODO: Restore content from memento
    }
};

// Caretaker
class VersionHistory {
private:
    map<string, DocumentMemento> versions;
    vector<string> order;

public:
    void save(string name, Document& document) {
        // TODO: Save document state with version name
    }

    void listVersions() {
        // TODO: Print all version names with version numbers
    }

    void restore(string name, Document& document) {
        // TODO: Restore to named version, print "Restored to version: X"
        // TODO: Print "Version not found: X" if missing
    }

    void diff(string name1, string name2) {
        // TODO: Show line-by-line differences between two versions
        // TODO: Prefix with + for added, - for removed, space for unchanged
    }
};

int main() {
    // Document doc;
    // VersionHistory versions;

    // doc.write("# My Document");
    // doc.write("Introduction paragraph.");
    // versions.save("v1-intro", doc);

    // doc.write("Chapter 1 content.");
    // doc.write("Chapter 2 content.");
    // versions.save("v2-chapters", doc);

    // doc.write("Conclusion paragraph.");
    // versions.save("v3-complete", doc);

    // cout << "--- All Versions ---" << endl;
    // versions.listVersions();

    // cout << "\n--- Diff v1-intro vs v2-chapters ---" << endl;
    // versions.diff("v1-intro", "v2-chapters");

    // cout << "\n--- Restore to v2-chapters ---" << endl;
    // versions.restore("v2-chapters", doc);
    // cout << "Content:\n" << doc.getContent() << endl;

    return 0;
}
```

```go
package main

import "fmt"

// Memento
var documentCounter int

type DocumentMemento struct {
	content       string
	versionNumber int
}

func NewDocumentMemento(content string) *DocumentMemento {
	// TODO: Store content and set versionNumber to ++counter
	return &DocumentMemento{
		content:       "",
		versionNumber: 0,
	}
}

func (m *DocumentMemento) GetContent() string {
	// TODO: Return content
	return ""
}

func (m *DocumentMemento) GetVersionNumber() int {
	// TODO: Return versionNumber
	return 0
}

// Originator
type Document struct {
	content string
}

func NewDocument() *Document {
	return &Document{
		content: "",
	}
}

func (d *Document) Write(text string) {
	// TODO: Append text + newline to content
}

func (d *Document) GetContent() string {
	// TODO: Return content
	return ""
}

func (d *Document) Save() *DocumentMemento {
	// TODO: Return a new DocumentMemento with current content
	return nil
}

func (d *Document) Restore(memento *DocumentMemento) {
	// TODO: Restore content from memento
}

// Caretaker
type VersionHistory struct {
	versions map[string]*DocumentMemento
	order    []string
}

func NewVersionHistory() *VersionHistory {
	return &VersionHistory{
		versions: make(map[string]*DocumentMemento),
		order:    []string{},
	}
}

func (v *VersionHistory) Save(name string, document *Document) {
	// TODO: Save document state with version name
}

func (v *VersionHistory) ListVersions() {
	// TODO: Print all version names with version numbers
}

func (v *VersionHistory) Restore(name string, document *Document) {
	// TODO: Restore to named version, print "Restored to version: X"
	// TODO: Print "Version not found: X" if missing
}

func (v *VersionHistory) Diff(name1 string, name2 string) {
	// TODO: Show line-by-line differences between two versions
	// TODO: Prefix with + for added, - for removed, space for unchanged
}

func main() {
	// doc := NewDocument()
	// versions := NewVersionHistory()

	// doc.Write("# My Document")
	// doc.Write("Introduction paragraph.")
	// versions.Save("v1-intro", doc)

	// doc.Write("Chapter 1 content.")
	// doc.Write("Chapter 2 content.")
	// versions.Save("v2-chapters", doc)

	// doc.Write("Conclusion paragraph.")
	// versions.Save("v3-complete", doc)

	// fmt.Println("--- All Versions ---")
	// versions.ListVersions()

	// fmt.Println("\n--- Diff v1-intro vs v2-chapters ---")
	// versions.Diff("v1-intro", "v2-chapters")

	// fmt.Println("\n--- Restore to v2-chapters ---")
	// versions.Restore("v2-chapters", doc)
	// fmt.Println("Content:\n" + doc.GetContent())

	_ = fmt.Sprintf
}
```

```csharp
using System;
using System.Collections.Generic;

// Memento
class DocumentMemento
{
    private static int counter = 0;
    public string Content { get; }
    public int VersionNumber { get; }

    public DocumentMemento(string content)
    {
        // TODO: Store content and set VersionNumber to ++counter
        Content = null;
        VersionNumber = 0;
    }
}

// Originator
class Document
{
    private string content = "";

    public void Write(string text)
    {
        // TODO: Append text + newline to content
    }

    public string GetContent()
    {
        // TODO: Return content
        return null;
    }

    public DocumentMemento Save()
    {
        // TODO: Return a new DocumentMemento with current content
        return null;
    }

    public void Restore(DocumentMemento memento)
    {
        // TODO: Restore content from memento
    }
}

// Caretaker
class VersionHistory
{
    private readonly Dictionary<string, DocumentMemento> versions = new Dictionary<string, DocumentMemento>();
    private readonly List<string> order = new List<string>();

    public void Save(string name, Document document)
    {
        // TODO: Save document state with version name
    }

    public void ListVersions()
    {
        // TODO: Print all version names with version numbers
    }

    public void Restore(string name, Document document)
    {
        // TODO: Restore to named version, print "Restored to version: X"
        // TODO: Print "Version not found: X" if missing
    }

    public void Diff(string name1, string name2)
    {
        // TODO: Show line-by-line differences between two versions
        // TODO: Prefix with + for added, - for removed, space for unchanged
    }
}

class Program
{
    static void Main(string[] args)
    {
        // Document doc = new Document();
        // VersionHistory versions = new VersionHistory();

        // doc.Write("# My Document");
        // doc.Write("Introduction paragraph.");
        // versions.Save("v1-intro", doc);

        // doc.Write("Chapter 1 content.");
        // doc.Write("Chapter 2 content.");
        // versions.Save("v2-chapters", doc);

        // doc.Write("Conclusion paragraph.");
        // versions.Save("v3-complete", doc);

        // Console.WriteLine("--- All Versions ---");
        // versions.ListVersions();

        // Console.WriteLine("\n--- Diff v1-intro vs v2-chapters ---");
        // versions.Diff("v1-intro", "v2-chapters");

        // Console.WriteLine("\n--- Restore to v2-chapters ---");
        // versions.Restore("v2-chapters", doc);
        // Console.WriteLine("Content:\n" + doc.GetContent());
    }
}
```

```typescript
// Memento
let documentCounter = 0;

class DocumentMemento {
    private readonly _content: string;
    private readonly _versionNumber: number;

    constructor(content: string) {
        // TODO: Store content and set _versionNumber to ++documentCounter
        this._content = "";
        this._versionNumber = 0;
    }

    get content(): string {
        // TODO: Return content
        return this._content;
    }

    get versionNumber(): number {
        // TODO: Return versionNumber
        return this._versionNumber;
    }
}

// Originator
class Document {
    private content: string = "";

    write(text: string): void {
        // TODO: Append text + newline to content
    }

    getContent(): string {
        // TODO: Return content
        return "";
    }

    save(): DocumentMemento {
        // TODO: Return a new DocumentMemento with current content
        return null!;
    }

    restore(memento: DocumentMemento): void {
        // TODO: Restore content from memento
    }
}

// Caretaker
class VersionHistory {
    private readonly versions: Map<string, DocumentMemento> = new Map();

    save(name: string, document: Document): void {
        // TODO: Save document state with version name
    }

    listVersions(): void {
        // TODO: Print all version names with version numbers
    }

    restore(name: string, document: Document): void {
        // TODO: Restore to named version, print "Restored to version: X"
        // TODO: Print "Version not found: X" if missing
    }

    diff(name1: string, name2: string): void {
        // TODO: Show line-by-line differences between two versions
        // TODO: Prefix with + for added, - for removed, space for unchanged
    }
}

// const doc = new Document();
// const versions = new VersionHistory();

// doc.write("# My Document");
// doc.write("Introduction paragraph.");
// versions.save("v1-intro", doc);

// doc.write("Chapter 1 content.");
// doc.write("Chapter 2 content.");
// versions.save("v2-chapters", doc);

// doc.write("Conclusion paragraph.");
// versions.save("v3-complete", doc);

// console.log("--- All Versions ---");
// versions.listVersions();

// console.log("\n--- Diff v1-intro vs v2-chapters ---");
// versions.diff("v1-intro", "v2-chapters");

// console.log("\n--- Restore to v2-chapters ---");
// versions.restore("v2-chapters", doc);
// console.log("Content:\n" + doc.getContent());
```

#### Solutions

```java
import java.util.*;

// Memento
class DocumentMemento {
    private static int counter = 0;
    private final String content;
    private final int versionNumber;

    public DocumentMemento(String content) {
        this.content = content;
        this.versionNumber = ++counter;
    }

    public String getContent() { return content; }
    public int getVersionNumber() { return versionNumber; }
}

// Originator
class Document {
    private String content = "";

    public void write(String text) {
        content += text + "\n";
    }

    public String getContent() {
        return content;
    }

    public DocumentMemento save() {
        return new DocumentMemento(content);
    }

    public void restore(DocumentMemento memento) {
        this.content = memento.getContent();
    }
}

// Caretaker
class VersionHistory {
    private final Map<String, DocumentMemento> versions = new LinkedHashMap<>();

    public void save(String name, Document document) {
        versions.put(name, document.save());
    }

    public void listVersions() {
        for (Map.Entry<String, DocumentMemento> entry : versions.entrySet()) {
            System.out.println("  " + entry.getKey() + " (version " + entry.getValue().getVersionNumber() + ")");
        }
    }

    public void restore(String name, Document document) {
        if (!versions.containsKey(name)) {
            System.out.println("Version not found: " + name);
            return;
        }
        document.restore(versions.get(name));
        System.out.println("Restored to version: " + name);
    }

    public void diff(String name1, String name2) {
        if (!versions.containsKey(name1) || !versions.containsKey(name2)) {
            System.out.println("Version not found.");
            return;
        }
        String[] lines1 = versions.get(name1).getContent().split("\n");
        String[] lines2 = versions.get(name2).getContent().split("\n");
        Set<String> set1 = new LinkedHashSet<>(Arrays.asList(lines1));
        Set<String> set2 = new LinkedHashSet<>(Arrays.asList(lines2));

        Set<String> allLines = new LinkedHashSet<>();
        allLines.addAll(Arrays.asList(lines1));
        allLines.addAll(Arrays.asList(lines2));

        for (String line : allLines) {
            if (set1.contains(line) && set2.contains(line)) {
                System.out.println("  " + line);
            } else if (!set1.contains(line) && set2.contains(line)) {
                System.out.println("+ " + line);
            } else if (set1.contains(line) && !set2.contains(line)) {
                System.out.println("- " + line);
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Document doc = new Document();
        VersionHistory versions = new VersionHistory();

        doc.write("# My Document");
        doc.write("Introduction paragraph.");
        versions.save("v1-intro", doc);

        doc.write("Chapter 1 content.");
        doc.write("Chapter 2 content.");
        versions.save("v2-chapters", doc);

        doc.write("Conclusion paragraph.");
        versions.save("v3-complete", doc);

        System.out.println("--- All Versions ---");
        versions.listVersions();

        System.out.println("\n--- Diff v1-intro vs v2-chapters ---");
        versions.diff("v1-intro", "v2-chapters");

        System.out.println("\n--- Restore to v2-chapters ---");
        versions.restore("v2-chapters", doc);
        System.out.println("Content:\n" + doc.getContent());
    }
}
```

```python
# Memento
class DocumentMemento:
    _counter = 0

    def __init__(self, content):
        self._content = content
        DocumentMemento._counter += 1
        self._version_number = DocumentMemento._counter

    def get_content(self):
        return self._content

    def get_version_number(self):
        return self._version_number

# Originator
class Document:
    def __init__(self):
        self.content = ""

    def write(self, text):
        self.content += text + "\n"

    def get_content(self):
        return self.content

    def save(self):
        return DocumentMemento(self.content)

    def restore(self, memento):
        self.content = memento.get_content()

# Caretaker
class VersionHistory:
    def __init__(self):
        self.versions = {}
        self.order = []

    def save(self, name, document):
        self.versions[name] = document.save()
        self.order.append(name)

    def list_versions(self):
        for name in self.order:
            vn = self.versions[name].get_version_number()
            print(f"  {name} (version {vn})")

    def restore(self, name, document):
        if name not in self.versions:
            print(f"Version not found: {name}")
            return
        document.restore(self.versions[name])
        print(f"Restored to version: {name}")

    def diff(self, name1, name2):
        if name1 not in self.versions or name2 not in self.versions:
            print("Version not found.")
            return
        lines1 = self.versions[name1].get_content().strip().split("\n")
        lines2 = self.versions[name2].get_content().strip().split("\n")
        set1 = set(lines1)
        set2 = set(lines2)

        all_lines = list(dict.fromkeys(lines1 + lines2))
        for line in all_lines:
            if line in set1 and line in set2:
                print(f"  {line}")
            elif line not in set1 and line in set2:
                print(f"+ {line}")
            elif line in set1 and line not in set2:
                print(f"- {line}")

if __name__ == "__main__":
    doc = Document()
    versions = VersionHistory()

    doc.write("# My Document")
    doc.write("Introduction paragraph.")
    versions.save("v1-intro", doc)

    doc.write("Chapter 1 content.")
    doc.write("Chapter 2 content.")
    versions.save("v2-chapters", doc)

    doc.write("Conclusion paragraph.")
    versions.save("v3-complete", doc)

    print("--- All Versions ---")
    versions.list_versions()

    print("\n--- Diff v1-intro vs v2-chapters ---")
    versions.diff("v1-intro", "v2-chapters")

    print("\n--- Restore to v2-chapters ---")
    versions.restore("v2-chapters", doc)
    print(f"Content:\n{doc.get_content()}")
```

```cpp
#include <iostream>
#include <string>
#include <map>
#include <vector>
#include <sstream>
#include <set>
using namespace std;

// Memento
class DocumentMemento {
    static int counter;
    string content;
    int versionNumber;

public:
    DocumentMemento() : content(""), versionNumber(0) {}
    DocumentMemento(const string& content) : content(content), versionNumber(++counter) {}

    string getContent() const {
        return content;
    }

    int getVersionNumber() const {
        return versionNumber;
    }
};

int DocumentMemento::counter = 0;

// Originator
class Document {
private:
    string content;

public:
    Document() : content("") {}

    void write(string text) {
        content += text + "\n";
    }

    string getContent() {
        return content;
    }

    DocumentMemento save() {
        return DocumentMemento(content);
    }

    void restore(DocumentMemento memento) {
        content = memento.getContent();
    }
};

vector<string> splitLines(const string& s) {
    vector<string> lines;
    istringstream iss(s);
    string line;
    while (getline(iss, line)) {
        if (!line.empty()) lines.push_back(line);
    }
    return lines;
}

// Caretaker
class VersionHistory {
private:
    map<string, DocumentMemento> versions;
    vector<string> order;

public:
    void save(string name, Document& document) {
        versions[name] = document.save();
        order.push_back(name);
    }

    void listVersions() {
        for (auto& name : order) {
            cout << "  " << name << " (version " << versions[name].getVersionNumber() << ")" << endl;
        }
    }

    void restore(string name, Document& document) {
        if (versions.find(name) == versions.end()) {
            cout << "Version not found: " << name << endl;
            return;
        }
        document.restore(versions[name]);
        cout << "Restored to version: " << name << endl;
    }

    void diff(string name1, string name2) {
        if (versions.find(name1) == versions.end() || versions.find(name2) == versions.end()) {
            cout << "Version not found." << endl;
            return;
        }
        vector<string> lines1 = splitLines(versions[name1].getContent());
        vector<string> lines2 = splitLines(versions[name2].getContent());
        set<string> set1(lines1.begin(), lines1.end());
        set<string> set2(lines2.begin(), lines2.end());

        vector<string> allLines = lines1;
        for (auto& l : lines2) {
            if (set1.find(l) == set1.end()) allLines.push_back(l);
        }

        for (auto& line : allLines) {
            bool in1 = set1.count(line) > 0;
            bool in2 = set2.count(line) > 0;
            if (in1 && in2) cout << "  " << line << endl;
            else if (!in1 && in2) cout << "+ " << line << endl;
            else if (in1 && !in2) cout << "- " << line << endl;
        }
    }
};

int main() {
    Document doc;
    VersionHistory versions;

    doc.write("# My Document");
    doc.write("Introduction paragraph.");
    versions.save("v1-intro", doc);

    doc.write("Chapter 1 content.");
    doc.write("Chapter 2 content.");
    versions.save("v2-chapters", doc);

    doc.write("Conclusion paragraph.");
    versions.save("v3-complete", doc);

    cout << "--- All Versions ---" << endl;
    versions.listVersions();

    cout << "\n--- Diff v1-intro vs v2-chapters ---" << endl;
    versions.diff("v1-intro", "v2-chapters");

    cout << "\n--- Restore to v2-chapters ---" << endl;
    versions.restore("v2-chapters", doc);
    cout << "Content:" << endl << doc.getContent() << endl;

    return 0;
}
```

```go
package main

import (
	"fmt"
	"strings"
)

// Memento
var documentCounter int

type DocumentMemento struct {
	content       string
	versionNumber int
}

func NewDocumentMemento(content string) DocumentMemento {
	documentCounter++
	return DocumentMemento{
		content:       content,
		versionNumber: documentCounter,
	}
}

func (m DocumentMemento) GetContent() string {
	return m.content
}

func (m DocumentMemento) GetVersionNumber() int {
	return m.versionNumber
}

// Originator
type Document struct {
	content string
}

func NewDocument() *Document {
	return &Document{content: ""}
}

func (d *Document) Write(text string) {
	d.content += text + "\n"
}

func (d *Document) GetContent() string {
	return d.content
}

func (d *Document) Save() DocumentMemento {
	return NewDocumentMemento(d.content)
}

func (d *Document) Restore(memento DocumentMemento) {
	d.content = memento.GetContent()
}

// Caretaker
type VersionHistory struct {
	versions map[string]DocumentMemento
	order    []string
}

func NewVersionHistory() *VersionHistory {
	return &VersionHistory{
		versions: make(map[string]DocumentMemento),
		order:    make([]string, 0),
	}
}

func (vh *VersionHistory) Save(name string, document *Document) {
	vh.versions[name] = document.Save()
	vh.order = append(vh.order, name)
}

func (vh *VersionHistory) ListVersions() {
	for _, name := range vh.order {
		fmt.Printf("  %s (version %d)\n", name, vh.versions[name].GetVersionNumber())
	}
}

func (vh *VersionHistory) Restore(name string, document *Document) {
	memento, ok := vh.versions[name]
	if !ok {
		fmt.Printf("Version not found: %s\n", name)
		return
	}
	document.Restore(memento)
	fmt.Printf("Restored to version: %s\n", name)
}

func splitLines(s string) []string {
	s = strings.TrimSuffix(s, "\n")
	if s == "" {
		return []string{}
	}
	return strings.Split(s, "\n")
}

func (vh *VersionHistory) Diff(name1, name2 string) {
	m1, ok1 := vh.versions[name1]
	m2, ok2 := vh.versions[name2]
	if !ok1 || !ok2 {
		fmt.Println("Version not found.")
		return
	}

	lines1 := splitLines(m1.GetContent())
	lines2 := splitLines(m2.GetContent())
	set1 := make(map[string]bool, len(lines1))
	set2 := make(map[string]bool, len(lines2))

	for _, line := range lines1 {
		set1[line] = true
	}
	for _, line := range lines2 {
		set2[line] = true
	}

	allLines := make([]string, 0, len(lines1)+len(lines2))
	seen := make(map[string]bool)

	for _, line := range lines1 {
		if !seen[line] {
			allLines = append(allLines, line)
			seen[line] = true
		}
	}
	for _, line := range lines2 {
		if !seen[line] {
			allLines = append(allLines, line)
			seen[line] = true
		}
	}

	for _, line := range allLines {
		in1 := set1[line]
		in2 := set2[line]
		if in1 && in2 {
			fmt.Printf("  %s\n", line)
		} else if !in1 && in2 {
			fmt.Printf("+ %s\n", line)
		} else if in1 && !in2 {
			fmt.Printf("- %s\n", line)
		}
	}
}

func main() {
	doc := NewDocument()
	versions := NewVersionHistory()

	doc.Write("# My Document")
	doc.Write("Introduction paragraph.")
	versions.Save("v1-intro", doc)

	doc.Write("Chapter 1 content.")
	doc.Write("Chapter 2 content.")
	versions.Save("v2-chapters", doc)

	doc.Write("Conclusion paragraph.")
	versions.Save("v3-complete", doc)

	fmt.Println("--- All Versions ---")
	versions.ListVersions()

	fmt.Println("\n--- Diff v1-intro vs v2-chapters ---")
	versions.Diff("v1-intro", "v2-chapters")

	fmt.Println("\n--- Restore to v2-chapters ---")
	versions.Restore("v2-chapters", doc)
	fmt.Println("Content:\n" + doc.GetContent())
}
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

// Memento
class DocumentMemento
{
    private static int counter = 0;
    public string Content { get; }
    public int VersionNumber { get; }

    public DocumentMemento(string content)
    {
        Content = content;
        VersionNumber = ++counter;
    }
}

// Originator
class Document
{
    private string content = "";

    public void Write(string text)
    {
        content += text + "\n";
    }

    public string GetContent()
    {
        return content;
    }

    public DocumentMemento Save()
    {
        return new DocumentMemento(content);
    }

    public void Restore(DocumentMemento memento)
    {
        content = memento.Content;
    }
}

// Caretaker
class VersionHistory
{
    private readonly Dictionary<string, DocumentMemento> versions = new Dictionary<string, DocumentMemento>();
    private readonly List<string> order = new List<string>();

    public void Save(string name, Document document)
    {
        versions[name] = document.Save();
        order.Add(name);
    }

    public void ListVersions()
    {
        foreach (var name in order)
        {
            Console.WriteLine($"  {name} (version {versions[name].VersionNumber})");
        }
    }

    public void Restore(string name, Document document)
    {
        if (!versions.ContainsKey(name))
        {
            Console.WriteLine($"Version not found: {name}");
            return;
        }
        document.Restore(versions[name]);
        Console.WriteLine($"Restored to version: {name}");
    }

    public void Diff(string name1, string name2)
    {
        if (!versions.ContainsKey(name1) || !versions.ContainsKey(name2))
        {
            Console.WriteLine("Version not found.");
            return;
        }
        var lines1 = versions[name1].Content.Trim().Split('\n').ToList();
        var lines2 = versions[name2].Content.Trim().Split('\n').ToList();
        var set1 = new HashSet<string>(lines1);
        var set2 = new HashSet<string>(lines2);

        var allLines = new List<string>(lines1);
        foreach (var l in lines2)
            if (!set1.Contains(l)) allLines.Add(l);

        foreach (var line in allLines)
        {
            bool in1 = set1.Contains(line);
            bool in2 = set2.Contains(line);
            if (in1 && in2) Console.WriteLine($"  {line}");
            else if (!in1 && in2) Console.WriteLine($"+ {line}");
            else if (in1 && !in2) Console.WriteLine($"- {line}");
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        Document doc = new Document();
        VersionHistory versions = new VersionHistory();

        doc.Write("# My Document");
        doc.Write("Introduction paragraph.");
        versions.Save("v1-intro", doc);

        doc.Write("Chapter 1 content.");
        doc.Write("Chapter 2 content.");
        versions.Save("v2-chapters", doc);

        doc.Write("Conclusion paragraph.");
        versions.Save("v3-complete", doc);

        Console.WriteLine("--- All Versions ---");
        versions.ListVersions();

        Console.WriteLine("\n--- Diff v1-intro vs v2-chapters ---");
        versions.Diff("v1-intro", "v2-chapters");

        Console.WriteLine("\n--- Restore to v2-chapters ---");
        versions.Restore("v2-chapters", doc);
        Console.WriteLine("Content:\n" + doc.GetContent());
    }
}
```

```typescript
// Memento
let documentCounter = 0;

class DocumentMemento {
    private readonly _content: string;
    private readonly _versionNumber: number;

    constructor(content: string) {
        this._content = content;
        this._versionNumber = ++documentCounter;
    }

    get content(): string {
        return this._content;
    }
    get versionNumber(): number {
        return this._versionNumber;
    }
}

// Originator
class Document {
    private content: string = "";

    write(text: string): void {
        this.content += text + "\n";
    }

    getContent(): string {
        return this.content;
    }

    save(): DocumentMemento {
        return new DocumentMemento(this.content);
    }

    restore(memento: DocumentMemento): void {
        this.content = memento.content;
    }
}

// Caretaker
class VersionHistory {
    private readonly versions: Map<string, DocumentMemento> = new Map();
    private readonly order: string[] = [];

    save(name: string, document: Document): void {
        this.versions.set(name, document.save());
        this.order.push(name);
    }

    listVersions(): void {
        for (const name of this.order) {
            console.log(`  ${name} (version ${this.versions.get(name)!.versionNumber})`);
        }
    }

    restore(name: string, document: Document): void {
        const memento = this.versions.get(name);
        if (!memento) {
            console.log(`Version not found: ${name}`);
            return;
        }
        document.restore(memento);
        console.log(`Restored to version: ${name}`);
    }

    diff(name1: string, name2: string): void {
        const m1 = this.versions.get(name1);
        const m2 = this.versions.get(name2);
        if (!m1 || !m2) {
            console.log("Version not found.");
            return;
        }
        const lines1 = m1.content.trim().split("\n");
        const lines2 = m2.content.trim().split("\n");
        const set1 = new Set(lines1);
        const set2 = new Set(lines2);

        const allLines = [...lines1];
        for (const l of lines2) {
            if (!set1.has(l)) allLines.push(l);
        }

        for (const line of allLines) {
            const in1 = set1.has(line);
            const in2 = set2.has(line);
            if (in1 && in2) console.log(`  ${line}`);
            else if (!in1 && in2) console.log(`+ ${line}`);
            else if (in1 && !in2) console.log(`- ${line}`);
        }
    }
}

const doc = new Document();
const versions = new VersionHistory();

doc.write("# My Document");
doc.write("Introduction paragraph.");
versions.save("v1-intro", doc);

doc.write("Chapter 1 content.");
doc.write("Chapter 2 content.");
versions.save("v2-chapters", doc);

doc.write("Conclusion paragraph.");
versions.save("v3-complete", doc);

console.log("--- All Versions ---");
versions.listVersions();

console.log("\n--- Diff v1-intro vs v2-chapters ---");
versions.diff("v1-intro", "v2-chapters");

console.log("\n--- Restore to v2-chapters ---");
versions.restore("v2-chapters", doc);
console.log("Content:\n" + doc.getContent());
```


