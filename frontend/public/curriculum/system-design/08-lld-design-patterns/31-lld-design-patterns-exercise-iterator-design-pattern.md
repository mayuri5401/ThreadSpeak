---
id: "lld-design-patterns-exercise-iterator-design-pattern"
trackId: "system-design"
trackTitle: "System Design (LLD & HLD)"
category: "LLD - Design Patterns"
subSection: ""
title: "Exercise: Iterator Design Pattern"
slug: "lld-design-patterns-exercise-iterator-design-pattern"
summary: "Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output."
eli10: "Imagine Exercise: Iterator Design Pattern as a well-organized city blueprint where every service and class has a single clear purpose, working together without chaos."
mentalModel: "Exercise: Iterator Design Pattern Architecture Flow: Clients -> Load Balancer / API Gateway -> Services & Core Entities -> Storage & Cache."
difficulty: "Advanced"
estimatedMinutes: 15
tags: ["LLD","Design Patterns","System Design","Architecture"]

---

Try implementing the below code exercises to reinforce your understanding. Your goal is to implement the classes below so that they produce the expected output.

---

# Exercise 1: Reverse Iterator

**Problem:** Implement a `ReversePlaylistIterator` that traverses the playlist from the last song to the first.

**Requirements:**

- Implement the `Iterator` interface (or `BookIterator` if using the library example)
- Start from the last element and move backward
- The existing `Playlist` and forward `PlaylistIterator` must not be modified

```java
import java.util.*;

// --- Given classes (do not modify) ---

class Playlist {
    private List<String> songs = new ArrayList<>();

    public void addSong(String song) {
        songs.add(song);
    }

    public List<String> getSongs() {
        return songs;
    }
}

// --- Implement the class below ---

class ReversePlaylistIterator implements Iterator<String> {
    // TODO: Store reference to Playlist and current index
    // TODO: Constructor initializes index to last position

    @Override
    public boolean hasNext() {
        // TODO: Return true if there are elements before current position
        return false;
    }

    @Override
    public String next() {
        // TODO: Return current element and move backward
        return null;
    }
}

public class Main {
    public static void main(String[] args) {
        // Playlist playlist = new Playlist();
        // playlist.addSong("Shape of You");
        // playlist.addSong("Bohemian Rhapsody");
        // playlist.addSong("Blinding Lights");
        //
        // ReversePlaylistIterator reverse = new ReversePlaylistIterator(playlist);
        // System.out.println("Reverse Playlist:");
        // while (reverse.hasNext()) {
        //     System.out.println("  " + reverse.next());
        // }
    }
}
```

```python
from abc import ABC, abstractmethod

# --- Given classes (do not modify) ---

class Iterator(ABC):
    @abstractmethod
    def has_next(self):
        pass

    @abstractmethod
    def next(self):
        pass

class Playlist:
    def __init__(self):
        self.songs = []

    def add_song(self, song):
        self.songs.append(song)

    def get_songs(self):
        return self.songs

# --- Implement the class below ---

class ReversePlaylistIterator(Iterator):
    def __init__(self, playlist):
        # TODO: Store playlist reference
        # TODO: Initialize index to last position
        pass

    def has_next(self):
        # TODO: Return True if there are elements before current position
        return False

    def next(self):
        # TODO: Return current element and move backward
        pass

if __name__ == "__main__":
    # playlist = Playlist()
    # playlist.add_song("Shape of You")
    # playlist.add_song("Bohemian Rhapsody")
    # playlist.add_song("Blinding Lights")
    #
    # reverse = ReversePlaylistIterator(playlist)
    # print("Reverse Playlist:")
    # while reverse.has_next():
    #     print(f"  {reverse.next()}")
    pass
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// --- Given classes (do not modify) ---

template<typename T>
class Iterator {
public:
    virtual ~Iterator() {}
    virtual bool hasNext() = 0;
    virtual T next() = 0;
};

class Playlist {
private:
    vector<string> songs;

public:
    void addSong(const string& song) {
        songs.push_back(song);
    }

    vector<string> getSongs() const {
        return songs;
    }
};

// --- Implement the class below ---

class ReversePlaylistIterator : public Iterator<string> {
private:
    // TODO: Store pointer to Playlist and current index

public:
    ReversePlaylistIterator(Playlist* pl) {
        // TODO: Initialize index to last position
    }

    bool hasNext() override {
        // TODO
        return false;
    }

    string next() override {
        // TODO
        return "";
    }
};

int main() {
    // Playlist playlist;
    // playlist.addSong("Shape of You");
    // playlist.addSong("Bohemian Rhapsody");
    // playlist.addSong("Blinding Lights");
    //
    // ReversePlaylistIterator reverse(&playlist);
    // cout << "Reverse Playlist:" << endl;
    // while (reverse.hasNext()) {
    //     cout << "  " << reverse.next() << endl;
    // }
    return 0;
}
```

```go
package main

import "fmt"

// --- Given classes (do not modify) ---

type Iterator interface {
	HasNext() bool
	Next() string
}

type Playlist struct {
	songs []string
}

func (p *Playlist) AddSong(song string) {
	p.songs = append(p.songs, song)
}

func (p *Playlist) GetSongs() []string {
	return p.songs
}

// --- Implement the class below ---

type ReversePlaylistIterator struct {
	// TODO: Store reference to Playlist and current index
	playlist *Playlist
	index    int
}

func NewReversePlaylistIterator(playlist *Playlist) *ReversePlaylistIterator {
	// TODO: Initialize index to last position
	return &ReversePlaylistIterator{
		playlist: playlist,
		index:    0,
	}
}

func (r *ReversePlaylistIterator) HasNext() bool {
	// TODO
	return false
}

func (r *ReversePlaylistIterator) Next() string {
	// TODO
	return ""
}

func main() {
	// playlist := &Playlist{}
	// playlist.AddSong("Shape of You")
	// playlist.AddSong("Bohemian Rhapsody")
	// playlist.AddSong("Blinding Lights")
	//
	// reverse := NewReversePlaylistIterator(playlist)
	// fmt.Println("Reverse Playlist:")
	// for reverse.HasNext() {
	//     fmt.Println("  " + reverse.Next())
	// }

	_ = fmt.Sprintf
}
```

```csharp
using System;
using System.Collections.Generic;

// --- Given classes (do not modify) ---

interface IIterator<T>
{
    bool HasNext();
    T Next();
}

class Playlist
{
    private List<string> songs = new List<string>();

    public void AddSong(string song)
    {
        songs.Add(song);
    }

    public List<string> GetSongs()
    {
        return songs;
    }
}

// --- Implement the class below ---

class ReversePlaylistIterator : IIterator<string>
{
    // TODO: Store reference to Playlist and current index

    public ReversePlaylistIterator(Playlist playlist)
    {
        // TODO: Initialize index to last position
    }

    public bool HasNext()
    {
        // TODO
        return false;
    }

    public string Next()
    {
        // TODO
        return null;
    }
}

class Program {
    static void Main(string[] args) {
        // Playlist playlist = new Playlist();
        // playlist.AddSong("Shape of You");
        // playlist.AddSong("Bohemian Rhapsody");
        // playlist.AddSong("Blinding Lights");
        //
        // ReversePlaylistIterator reverse = new ReversePlaylistIterator(playlist);
        // Console.WriteLine("Reverse Playlist:");
        // while (reverse.HasNext()) {
        //     Console.WriteLine("  " + reverse.Next());
        // }
    }
}
```

```typescript
// --- Given classes (do not modify) ---

interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}

class Playlist {
    private songs: string[] = [];

    addSong(song: string): void {
        this.songs.push(song);
    }

    getSongs(): string[] {
        return this.songs;
    }
}

// --- Implement the class below ---

class ReversePlaylistIterator implements Iterator<string> {
    // TODO: Store reference to Playlist and current index

    constructor(playlist: Playlist) {
        // TODO: Initialize index to last position
    }

    hasNext(): boolean {
        // TODO
        return false;
    }

    next(): string {
        // TODO
        return "";
    }
}

// const playlist = new Playlist();
// playlist.addSong("Shape of You");
// playlist.addSong("Bohemian Rhapsody");
// playlist.addSong("Blinding Lights");
//
// const reverse = new ReversePlaylistIterator(playlist);
// console.log("Reverse Playlist:");
// while (reverse.hasNext()) {
//     console.log("  " + reverse.next());
// }
```

#### Solutions

```java
import java.util.*;

// --- Given classes (do not modify) ---

class Playlist {
    private List<String> songs = new ArrayList<>();

    public void addSong(String song) {
        songs.add(song);
    }

    public List<String> getSongs() {
        return songs;
    }
}

// --- Solution ---

class ReversePlaylistIterator implements Iterator<String> {
    private List<String> songs;
    private int index;

    public ReversePlaylistIterator(Playlist playlist) {
        this.songs = playlist.getSongs();
        this.index = songs.size() - 1;
    }

    @Override
    public boolean hasNext() {
        return index >= 0;
    }

    @Override
    public String next() {
        return songs.get(index--);
    }
}

public class Main {
    public static void main(String[] args) {
        Playlist playlist = new Playlist();
        playlist.addSong("Shape of You");
        playlist.addSong("Bohemian Rhapsody");
        playlist.addSong("Blinding Lights");

        ReversePlaylistIterator reverse = new ReversePlaylistIterator(playlist);
        System.out.println("Reverse Playlist:");
        while (reverse.hasNext()) {
            System.out.println("  " + reverse.next());
        }
    }
}
```

```python
from abc import ABC, abstractmethod

# --- Given classes (do not modify) ---

class Iterator(ABC):
    @abstractmethod
    def has_next(self):
        pass

    @abstractmethod
    def next(self):
        pass

class Playlist:
    def __init__(self):
        self.songs = []

    def add_song(self, song):
        self.songs.append(song)

    def get_songs(self):
        return self.songs

# --- Solution ---

class ReversePlaylistIterator(Iterator):
    def __init__(self, playlist):
        self._songs = playlist.get_songs()
        self._index = len(self._songs) - 1

    def has_next(self):
        return self._index >= 0

    def next(self):
        song = self._songs[self._index]
        self._index -= 1
        return song

if __name__ == "__main__":
    playlist = Playlist()
    playlist.add_song("Shape of You")
    playlist.add_song("Bohemian Rhapsody")
    playlist.add_song("Blinding Lights")

    reverse = ReversePlaylistIterator(playlist)
    print("Reverse Playlist:")
    while reverse.has_next():
        print(f"  {reverse.next()}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// --- Given classes (do not modify) ---

template<typename T>
class Iterator {
public:
    virtual ~Iterator() {}
    virtual bool hasNext() = 0;
    virtual T next() = 0;
};

class Playlist {
private:
    vector<string> songs;

public:
    void addSong(const string& song) {
        songs.push_back(song);
    }

    vector<string> getSongs() const {
        return songs;
    }
};

// --- Solution ---

class ReversePlaylistIterator : public Iterator<string> {
private:
    Playlist* playlist;
    int index;

public:
    ReversePlaylistIterator(Playlist* pl) {
        playlist = pl;
        index = pl->getSongs().size() - 1;
    }

    bool hasNext() override {
        return index >= 0;
    }

    string next() override {
        return playlist->getSongs()[index--];
    }
};

int main() {
    Playlist playlist;
    playlist.addSong("Shape of You");
    playlist.addSong("Bohemian Rhapsody");
    playlist.addSong("Blinding Lights");

    ReversePlaylistIterator reverse(&playlist);
    cout << "Reverse Playlist:" << endl;
    while (reverse.hasNext()) {
        cout << "  " << reverse.next() << endl;
    }
    return 0;
}
```

```go
package main

import "fmt"

// --- Given classes (do not modify) ---

type Iterator interface {
	HasNext() bool
	Next() string
}

type Playlist struct {
	songs []string
}

func (p *Playlist) AddSong(song string) {
	p.songs = append(p.songs, song)
}

func (p *Playlist) GetSongs() []string {
	return p.songs
}

// --- Solution ---

type ReversePlaylistIterator struct {
	playlist *Playlist
	index    int
}

func NewReversePlaylistIterator(playlist *Playlist) *ReversePlaylistIterator {
	return &ReversePlaylistIterator{
		playlist: playlist,
		index:    len(playlist.GetSongs()) - 1,
	}
}

func (r *ReversePlaylistIterator) HasNext() bool {
	return r.index >= 0
}

func (r *ReversePlaylistIterator) Next() string {
	song := r.playlist.GetSongs()[r.index]
	r.index--
	return song
}

func main() {
	playlist := &Playlist{}
	playlist.AddSong("Shape of You")
	playlist.AddSong("Bohemian Rhapsody")
	playlist.AddSong("Blinding Lights")

	reverse := NewReversePlaylistIterator(playlist)
	fmt.Println("Reverse Playlist:")
	for reverse.HasNext() {
		fmt.Println("  " + reverse.Next())
	}
}
```

```csharp
using System;
using System.Collections.Generic;

// --- Given classes (do not modify) ---

interface IIterator<T>
{
    bool HasNext();
    T Next();
}

class Playlist
{
    private List<string> songs = new List<string>();

    public void AddSong(string song)
    {
        songs.Add(song);
    }

    public List<string> GetSongs()
    {
        return songs;
    }
}

// --- Solution ---

class ReversePlaylistIterator : IIterator<string>
{
    private Playlist playlist;
    private int index;

    public ReversePlaylistIterator(Playlist playlist)
    {
        this.playlist = playlist;
        this.index = playlist.GetSongs().Count - 1;
    }

    public bool HasNext()
    {
        return index >= 0;
    }

    public string Next()
    {
        return playlist.GetSongs()[index--];
    }
}

class Program
{
    static void Main(string[] args)
    {
        Playlist playlist = new Playlist();
        playlist.AddSong("Shape of You");
        playlist.AddSong("Bohemian Rhapsody");
        playlist.AddSong("Blinding Lights");

        ReversePlaylistIterator reverse = new ReversePlaylistIterator(playlist);
        Console.WriteLine("Reverse Playlist:");
        while (reverse.HasNext()) {
            Console.WriteLine("  " + reverse.Next());
        }
    }
}
```

```typescript
// --- Given classes (do not modify) ---

interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}

class Playlist {
    private songs: string[] = [];

    addSong(song: string): void {
        this.songs.push(song);
    }

    getSongs(): string[] {
        return this.songs;
    }
}

// --- Solution ---

class ReversePlaylistIterator implements Iterator<string> {
    private playlist: Playlist;
    private index: number;

    constructor(playlist: Playlist) {
        this.playlist = playlist;
        this.index = playlist.getSongs().length - 1;
    }

    hasNext(): boolean {
        return this.index >= 0;
    }

    next(): string {
        return this.playlist.getSongs()[this.index--];
    }
}

const playlist = new Playlist();
playlist.addSong("Shape of You");
playlist.addSong("Bohemian Rhapsody");
playlist.addSong("Blinding Lights");

const reverse = new ReversePlaylistIterator(playlist);
console.log("Reverse Playlist:");
while (reverse.hasNext()) {
    console.log("  " + reverse.next());
}
```

---

# Exercise 2: Paginated Iterator

> [!PAYWALL] This content is for premium members only.

**Problem:** Build a `ProductCatalog` that contains a large number of products. Implement a `PaginatedIterator` that loads products in pages (batches of N) rather than all at once. This simulates lazy loading from a database.

**Requirements:**

- `Product` class with `id`, `name`, and `price`
- `ProductCatalog` stores all products but the iterator loads them page by page
- `PaginatedIterator` accepts a `pageSize` parameter
- The iterator prints a "Loading page X..." message each time it fetches a new batch
- `hasNext()` triggers loading the next page when the current page is exhausted

```java
import java.util.*;

class Product {
    private int id;
    private String name;
    private double price;

    public Product(int id, String name, double price) {
        // TODO: Initialize fields
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }

    @Override
    public String toString() {
        // TODO: Return "Product{id=X, name='Y', price=Z}"
        return null;
    }
}

class ProductCatalog {
    private List<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        products.add(product);
    }

    public List<Product> getPage(int offset, int limit) {
        int end = Math.min(offset + limit, products.size());
        if (offset >= products.size()) return Collections.emptyList();
        return products.subList(offset, end);
    }

    public int getTotalCount() { return products.size(); }

    public Iterator<Product> createPaginatedIterator(int pageSize) {
        // TODO: Return a new PaginatedIterator
        return null;
    }
}

class PaginatedIterator implements Iterator<Product> {
    private ProductCatalog catalog;
    private int pageSize;
    private List<Product> currentPage;
    private int pageIndex;
    private int globalOffset;
    private int pageNumber;

    public PaginatedIterator(ProductCatalog catalog, int pageSize) {
        // TODO: Initialize fields and load first page
    }

    @Override
    public boolean hasNext() {
        // TODO: Return true if more items in current page or more pages to load
        return false;
    }

    @Override
    public Product next() {
        // TODO: Return current item and advance pageIndex
        return null;
    }

    private void loadNextPage() {
        // TODO: Fetch next page from catalog, print "Loading page N...", update offset
    }
}

public class Main {
    public static void main(String[] args) {
        // ProductCatalog catalog = new ProductCatalog();
        // catalog.addProduct(new Product(1, "Laptop", 999.99));
        // catalog.addProduct(new Product(2, "Mouse", 29.99));
        // catalog.addProduct(new Product(3, "Keyboard", 79.99));
        // catalog.addProduct(new Product(4, "Monitor", 349.99));
        // catalog.addProduct(new Product(5, "Headphones", 149.99));
        // catalog.addProduct(new Product(6, "USB Cable", 9.99));
        // catalog.addProduct(new Product(7, "Mouse Pad", 19.99));
        // catalog.addProduct(new Product(8, "Desk Lamp", 44.99));
        // catalog.addProduct(new Product(9, "Speakers", 89.99));
        // catalog.addProduct(new Product(10, "Webcam", 69.99));
        //
        // Iterator<Product> iterator = catalog.createPaginatedIterator(3);
        // while (iterator.hasNext()) {
        //     System.out.println("  " + iterator.next());
        // }
    }
}
```

```python
from abc import ABC, abstractmethod

# --- Given classes (do not modify) ---

class Iterator(ABC):
    @abstractmethod
    def has_next(self):
        pass

    @abstractmethod
    def next(self):
        pass

# --- Implement the classes below ---

class Product:
    def __init__(self, id, name, price):
        # TODO: Store id, name, price
        pass

    def __str__(self):
        # TODO: Return "Product{id=X, name='Y', price=Z}"
        return ""

class ProductCatalog:
    def __init__(self):
        self._products = []

    def add_product(self, product):
        self._products.append(product)

    def get_page(self, offset, limit):
        return self._products[offset:offset + limit]

    def get_total_count(self):
        return len(self._products)

    def create_paginated_iterator(self, page_size):
        # TODO: Return a new PaginatedIterator
        pass

class PaginatedIterator(Iterator):
    def __init__(self, catalog, page_size):
        # TODO: Store catalog, page_size, initialize page tracking, load first page
        pass

    def has_next(self):
        # TODO: Return True if more items in current page or more pages to load
        return False

    def next(self):
        # TODO: Return current item and advance page_index
        pass

    def _load_next_page(self):
        # TODO: Fetch next page from catalog, print "Loading page N...", update offset
        pass

if __name__ == "__main__":
    # catalog = ProductCatalog()
    # catalog.add_product(Product(1, "Laptop", 999.99))
    # catalog.add_product(Product(2, "Mouse", 29.99))
    # catalog.add_product(Product(3, "Keyboard", 79.99))
    # catalog.add_product(Product(4, "Monitor", 349.99))
    # catalog.add_product(Product(5, "Headphones", 149.99))
    # catalog.add_product(Product(6, "USB Cable", 9.99))
    # catalog.add_product(Product(7, "Mouse Pad", 19.99))
    # catalog.add_product(Product(8, "Desk Lamp", 44.99))
    # catalog.add_product(Product(9, "Speakers", 89.99))
    # catalog.add_product(Product(10, "Webcam", 69.99))
    #
    # iterator = catalog.create_paginated_iterator(3)
    # while iterator.has_next():
    #     print(f"  {iterator.next()}")
    pass
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
using namespace std;

class Product {
    int id;
    string name;
    double price;

public:
    Product(int id, const string& name, double price)
        : id(id), name(name), price(price) {}

    int getId() const { return id; }
    const string& getName() const { return name; }
    double getPrice() const { return price; }

    string toString() const {
        // TODO: Return "Product{id=X, name='Y', price=Z}"
        return "";
    }
};

class ProductCatalog {
    vector<Product> products;

public:
    void addProduct(const Product& product) {
        products.push_back(product);
    }

    vector<Product> getPage(int offset, int limit) const {
        if (offset >= (int)products.size()) return {};
        int end = min(offset + limit, (int)products.size());
        return vector<Product>(products.begin() + offset, products.begin() + end);
    }

    int getTotalCount() const {
        return products.size();
    }
};

class PaginatedIterator {
    const ProductCatalog* catalog;
    int pageSize;
    vector<Product> currentPage;
    int pageIndex;
    int globalOffset;
    int pageNumber;

public:
    PaginatedIterator(const ProductCatalog* catalog, int pageSize)
        : catalog(catalog), pageSize(pageSize), pageIndex(0), globalOffset(0), pageNumber(0) {
        // TODO: Load first page
    }

    bool hasNext() {
        // TODO: Return true if more items in current page or more pages to load
        return false;
    }

    Product next() {
        // TODO: Return current item and advance pageIndex
        return Product(0, "", 0);
    }

private:
    void loadNextPage() {
        // TODO: Fetch next page from catalog, print "Loading page N...", update offset
    }
};

int main() {
    // ProductCatalog catalog;
    // catalog.addProduct(Product(1, "Laptop", 999.99));
    // catalog.addProduct(Product(2, "Mouse", 29.99));
    // catalog.addProduct(Product(3, "Keyboard", 79.99));
    // catalog.addProduct(Product(4, "Monitor", 349.99));
    // catalog.addProduct(Product(5, "Headphones", 149.99));
    // catalog.addProduct(Product(6, "USB Cable", 9.99));
    // catalog.addProduct(Product(7, "Mouse Pad", 19.99));
    // catalog.addProduct(Product(8, "Desk Lamp", 44.99));
    // catalog.addProduct(Product(9, "Speakers", 89.99));
    // catalog.addProduct(Product(10, "Webcam", 69.99));
    //
    // PaginatedIterator iterator(&catalog, 3);
    // while (iterator.hasNext()) {
    //     cout << "  " << iterator.next().toString() << endl;
    // }
    return 0;
}
```

```go
package main

import "fmt"

type Iterator[T any] interface {
	HasNext() bool
	Next() T
}

type Product struct {
	id    int
	name  string
	price float64
}

func NewProduct(id int, name string, price float64) *Product {
	// TODO: Initialize fields
	return &Product{}
}

func (p *Product) GetId() int {
	return p.id
}

func (p *Product) GetName() string {
	return p.name
}

func (p *Product) GetPrice() float64 {
	return p.price
}

func (p *Product) String() string {
	// TODO: Return "Product{id=X, name='Y', price=Z}"
	return ""
}

type ProductCatalog struct {
	products []*Product
}

func NewProductCatalog() *ProductCatalog {
	return &ProductCatalog{
		products: []*Product{},
	}
}

func (c *ProductCatalog) AddProduct(product *Product) {
	c.products = append(c.products, product)
}

func (c *ProductCatalog) GetPage(offset int, limit int) []*Product {
	if offset >= len(c.products) {
		return []*Product{}
	}
	end := offset + limit
	if end > len(c.products) {
		end = len(c.products)
	}
	return c.products[offset:end]
}

func (c *ProductCatalog) GetTotalCount() int {
	return len(c.products)
}

func (c *ProductCatalog) CreatePaginatedIterator(pageSize int) Iterator[*Product] {
	// TODO: Return a new PaginatedIterator
	return nil
}

type PaginatedIterator struct {
	catalog      *ProductCatalog
	pageSize     int
	currentPage  []*Product
	pageIndex    int
	globalOffset int
	pageNumber   int
}

func NewPaginatedIterator(catalog *ProductCatalog, pageSize int) *PaginatedIterator {
	// TODO: Initialize fields and load first page
	return &PaginatedIterator{}
}

func (it *PaginatedIterator) HasNext() bool {
	// TODO: Return true if more items in current page or more pages to load
	return false
}

func (it *PaginatedIterator) Next() *Product {
	// TODO: Return current item and advance pageIndex
	return nil
}

func (it *PaginatedIterator) loadNextPage() {
	// TODO: Fetch next page from catalog, print "Loading page N...", update offset
	_ = fmt.Sprintf("")
}

func main() {
	// catalog := NewProductCatalog()
	// catalog.AddProduct(NewProduct(1, "Laptop", 999.99))
	// catalog.AddProduct(NewProduct(2, "Mouse", 29.99))
	// catalog.AddProduct(NewProduct(3, "Keyboard", 79.99))
	// catalog.AddProduct(NewProduct(4, "Monitor", 349.99))
	// catalog.AddProduct(NewProduct(5, "Headphones", 149.99))
	// catalog.AddProduct(NewProduct(6, "USB Cable", 9.99))
	// catalog.AddProduct(NewProduct(7, "Mouse Pad", 19.99))
	// catalog.AddProduct(NewProduct(8, "Desk Lamp", 44.99))
	// catalog.AddProduct(NewProduct(9, "Speakers", 89.99))
	// catalog.AddProduct(NewProduct(10, "Webcam", 69.99))
	//
	// iterator := catalog.CreatePaginatedIterator(3)
	// for iterator.HasNext() {
	//     fmt.Println("  ", iterator.Next())
	// }
}
```

```csharp
using System;
using System.Collections.Generic;

class Product
{
    private int id;
    private string name;
    private double price;

    public Product(int id, string name, double price)
    {
        // TODO: Initialize fields
    }

    public int GetId() { return id; }
    public string GetName() { return name; }
    public double GetPrice() { return price; }

    public override string ToString()
    {
        // TODO: Return "Product{id=X, name='Y', price=Z}"
        return null;
    }
}

class ProductCatalog
{
    private List<Product> products = new List<Product>();

    public void AddProduct(Product product)
    {
        products.Add(product);
    }

    public List<Product> GetPage(int offset, int limit)
    {
        if (offset >= products.Count) return new List<Product>();
        int count = Math.Min(limit, products.Count - offset);
        return products.GetRange(offset, count);
    }

    public int GetTotalCount()
    {
        return products.Count;
    }

    public IIterator<Product> CreatePaginatedIterator(int pageSize)
    {
        // TODO: Return a new PaginatedIterator
        return null;
    }
}

class PaginatedIterator : IIterator<Product>
{
    private ProductCatalog catalog;
    private int pageSize;
    private List<Product> currentPage;
    private int pageIndex;
    private int globalOffset;
    private int pageNumber;

    public PaginatedIterator(ProductCatalog catalog, int pageSize)
    {
        // TODO: Initialize fields and load first page
    }

    public bool HasNext()
    {
        // TODO: Return true if more items in current page or more pages to load
        return false;
    }

    public Product Next()
    {
        // TODO: Return current item and advance pageIndex
        return null;
    }

    private void LoadNextPage()
    {
        // TODO: Fetch next page from catalog, print "Loading page N...", update offset
    }
}

class Program {
    static void Main(string[] args) {
        // ProductCatalog catalog = new ProductCatalog();
        // catalog.AddProduct(new Product(1, "Laptop", 999.99));
        // catalog.AddProduct(new Product(2, "Mouse", 29.99));
        // catalog.AddProduct(new Product(3, "Keyboard", 79.99));
        // catalog.AddProduct(new Product(4, "Monitor", 349.99));
        // catalog.AddProduct(new Product(5, "Headphones", 149.99));
        // catalog.AddProduct(new Product(6, "USB Cable", 9.99));
        // catalog.AddProduct(new Product(7, "Mouse Pad", 19.99));
        // catalog.AddProduct(new Product(8, "Desk Lamp", 44.99));
        // catalog.AddProduct(new Product(9, "Speakers", 89.99));
        // catalog.AddProduct(new Product(10, "Webcam", 69.99));
        //
        // IIterator<Product> iterator = catalog.CreatePaginatedIterator(3);
        // while (iterator.HasNext())
        // {
        //     Console.WriteLine("  " + iterator.Next());
        // }
    }
}
```

```typescript
class Product {
    private readonly id: number;
    private readonly name: string;
    private readonly price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getId(): number { return this.id; }
    getName(): string { return this.name; }
    getPrice(): number { return this.price; }

    toString(): string {
        // TODO: Return "Product{id=X, name='Y', price=Z}"
        return "";
    }
}

class ProductCatalog {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    getPage(offset: number, limit: number): Product[] {
        if (offset >= this.products.length) return [];
        return this.products.slice(offset, Math.min(offset + limit, this.products.length));
    }

    getTotalCount(): number {
        return this.products.length;
    }

    createPaginatedIterator(pageSize: number): Iterator<Product> {
        // TODO: Return a new PaginatedIterator
        return null as any;
    }
}

class PaginatedIterator implements Iterator<Product> {
    private catalog: ProductCatalog;
    private pageSize: number;
    private currentPage: Product[];
    private pageIndex: number;
    private globalOffset: number;
    private pageNumber: number;

    constructor(catalog: ProductCatalog, pageSize: number) {
        this.catalog = catalog;
        this.pageSize = pageSize;
        this.currentPage = [];
        this.pageIndex = 0;
        this.globalOffset = 0;
        this.pageNumber = 0;
        // TODO: Load first page
    }

    hasNext(): boolean {
        // TODO: Return true if more items in current page or more pages to load
        return false;
    }

    next(): Product {
        // TODO: Return current item and advance pageIndex
        return null as any;
    }

    private loadNextPage(): void {
        // TODO: Fetch next page from catalog, print "Loading page N...", update offset
    }
}

// const catalog = new ProductCatalog();
// catalog.addProduct(new Product(1, "Laptop", 999.99));
// catalog.addProduct(new Product(2, "Mouse", 29.99));
// catalog.addProduct(new Product(3, "Keyboard", 79.99));
// catalog.addProduct(new Product(4, "Monitor", 349.99));
// catalog.addProduct(new Product(5, "Headphones", 149.99));
// catalog.addProduct(new Product(6, "USB Cable", 9.99));
// catalog.addProduct(new Product(7, "Mouse Pad", 19.99));
// catalog.addProduct(new Product(8, "Desk Lamp", 44.99));
// catalog.addProduct(new Product(9, "Speakers", 89.99));
// catalog.addProduct(new Product(10, "Webcam", 69.99));
//
// const iterator = catalog.createPaginatedIterator(3);
// while (iterator.hasNext()) {
//     console.log("  " + iterator.next());
// }
```

#### Solutions

```java
import java.util.*;

class Product {
    private int id;
    private String name;
    private double price;

    public Product(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public double getPrice() { return price; }

    @Override
    public String toString() {
        return "Product{id=" + id + ", name='" + name + "', price=" + price + "}";
    }
}

class ProductCatalog {
    private List<Product> products = new ArrayList<>();

    public void addProduct(Product product) {
        products.add(product);
    }

    public List<Product> getPage(int offset, int limit) {
        int end = Math.min(offset + limit, products.size());
        if (offset >= products.size()) return Collections.emptyList();
        return products.subList(offset, end);
    }

    public int getTotalCount() {
        return products.size();
    }

    public Iterator<Product> createPaginatedIterator(int pageSize) {
        return new PaginatedIterator(this, pageSize);
    }
}

class PaginatedIterator implements Iterator<Product> {
    private ProductCatalog catalog;
    private int pageSize;
    private List<Product> currentPage;
    private int pageIndex;
    private int globalOffset;
    private int pageNumber;

    public PaginatedIterator(ProductCatalog catalog, int pageSize) {
        this.catalog = catalog;
        this.pageSize = pageSize;
        this.pageIndex = 0;
        this.globalOffset = 0;
        this.pageNumber = 0;
        loadNextPage();
    }

    @Override
    public boolean hasNext() {
        if (pageIndex < currentPage.size()) return true;
        if (globalOffset < catalog.getTotalCount()) {
            loadNextPage();
            return true;
        }
        return false;
    }

    @Override
    public Product next() {
        return currentPage.get(pageIndex++);
    }

    private void loadNextPage() {
        currentPage = catalog.getPage(globalOffset, pageSize);
        pageNumber++;
        System.out.println("Loading page " + pageNumber + "...");
        globalOffset += currentPage.size();
        pageIndex = 0;
    }
}

public class Main {
    public static void main(String[] args) {
        ProductCatalog catalog = new ProductCatalog();
        catalog.addProduct(new Product(1, "Laptop", 999.99));
        catalog.addProduct(new Product(2, "Mouse", 29.99));
        catalog.addProduct(new Product(3, "Keyboard", 79.99));
        catalog.addProduct(new Product(4, "Monitor", 349.99));
        catalog.addProduct(new Product(5, "Headphones", 149.99));
        catalog.addProduct(new Product(6, "USB Cable", 9.99));
        catalog.addProduct(new Product(7, "Mouse Pad", 19.99));
        catalog.addProduct(new Product(8, "Desk Lamp", 44.99));
        catalog.addProduct(new Product(9, "Speakers", 89.99));
        catalog.addProduct(new Product(10, "Webcam", 69.99));

        Iterator<Product> iterator = catalog.createPaginatedIterator(3);
        while (iterator.hasNext()) {
            System.out.println("  " + iterator.next());
        }
    }
}
```

```python
from abc import ABC, abstractmethod

# --- Given classes (do not modify) ---

class Iterator(ABC):
    @abstractmethod
    def has_next(self):
        pass

    @abstractmethod
    def next(self):
        pass

# --- Solution ---

class Product:
    def __init__(self, id, name, price):
        self.id = id
        self.name = name
        self.price = price

    def __str__(self):
        return f"Product{{id={self.id}, name='{self.name}', price={self.price}}}"

class ProductCatalog:
    def __init__(self):
        self._products = []

    def add_product(self, product):
        self._products.append(product)

    def get_page(self, offset, limit):
        return self._products[offset:offset + limit]

    def get_total_count(self):
        return len(self._products)

    def create_paginated_iterator(self, page_size):
        return PaginatedIterator(self, page_size)

class PaginatedIterator(Iterator):
    def __init__(self, catalog, page_size):
        self._catalog = catalog
        self._page_size = page_size
        self._page_index = 0
        self._global_offset = 0
        self._page_number = 0
        self._current_page = []
        self._load_next_page()

    def has_next(self):
        if self._page_index < len(self._current_page):
            return True
        if self._global_offset < self._catalog.get_total_count():
            self._load_next_page()
            return True
        return False

    def next(self):
        item = self._current_page[self._page_index]
        self._page_index += 1
        return item

    def _load_next_page(self):
        self._current_page = self._catalog.get_page(self._global_offset, self._page_size)
        self._page_number += 1
        print(f"Loading page {self._page_number}...")
        self._global_offset += len(self._current_page)
        self._page_index = 0

if __name__ == "__main__":
    catalog = ProductCatalog()
    catalog.add_product(Product(1, "Laptop", 999.99))
    catalog.add_product(Product(2, "Mouse", 29.99))
    catalog.add_product(Product(3, "Keyboard", 79.99))
    catalog.add_product(Product(4, "Monitor", 349.99))
    catalog.add_product(Product(5, "Headphones", 149.99))
    catalog.add_product(Product(6, "USB Cable", 9.99))
    catalog.add_product(Product(7, "Mouse Pad", 19.99))
    catalog.add_product(Product(8, "Desk Lamp", 44.99))
    catalog.add_product(Product(9, "Speakers", 89.99))
    catalog.add_product(Product(10, "Webcam", 69.99))

    iterator = catalog.create_paginated_iterator(3)
    while iterator.has_next():
        print(f"  {iterator.next()}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <sstream>
using namespace std;

class Product {
    int id;
    string name;
    double price;

public:
    Product(int id, const string& name, double price)
        : id(id), name(name), price(price) {}

    int getId() const { return id; }
    const string& getName() const { return name; }
    double getPrice() const { return price; }

    string toString() const {
        ostringstream oss;
        oss << "Product{id=" << id << ", name='" << name << "', price=" << price << "}";
        return oss.str();
    }
};

class ProductCatalog {
    vector<Product> products;

public:
    void addProduct(const Product& product) {
        products.push_back(product);
    }

    vector<Product> getPage(int offset, int limit) const {
        if (offset >= (int)products.size()) return {};
        int end = min(offset + limit, (int)products.size());
        return vector<Product>(products.begin() + offset, products.begin() + end);
    }

    int getTotalCount() const {
        return products.size();
    }
};

class PaginatedIterator {
    const ProductCatalog* catalog;
    int pageSize;
    vector<Product> currentPage;
    int pageIndex;
    int globalOffset;
    int pageNumber;

public:
    PaginatedIterator(const ProductCatalog* catalog, int pageSize)
        : catalog(catalog), pageSize(pageSize), pageIndex(0), globalOffset(0), pageNumber(0) {
        loadNextPage();
    }

    bool hasNext() {
        if (pageIndex < (int)currentPage.size()) return true;
        if (globalOffset < catalog->getTotalCount()) {
            loadNextPage();
            return true;
        }
        return false;
    }

    Product next() {
        return currentPage[pageIndex++];
    }

private:
    void loadNextPage() {
        currentPage = catalog->getPage(globalOffset, pageSize);
        pageNumber++;
        cout << "Loading page " << pageNumber << "..." << endl;
        globalOffset += currentPage.size();
        pageIndex = 0;
    }
};

int main() {
    ProductCatalog catalog;
    catalog.addProduct(Product(1, "Laptop", 999.99));
    catalog.addProduct(Product(2, "Mouse", 29.99));
    catalog.addProduct(Product(3, "Keyboard", 79.99));
    catalog.addProduct(Product(4, "Monitor", 349.99));
    catalog.addProduct(Product(5, "Headphones", 149.99));
    catalog.addProduct(Product(6, "USB Cable", 9.99));
    catalog.addProduct(Product(7, "Mouse Pad", 19.99));
    catalog.addProduct(Product(8, "Desk Lamp", 44.99));
    catalog.addProduct(Product(9, "Speakers", 89.99));
    catalog.addProduct(Product(10, "Webcam", 69.99));

    PaginatedIterator iterator(&catalog, 3);
    while (iterator.hasNext()) {
        cout << "  " << iterator.next().toString() << endl;
    }
    return 0;
}
```

```go
package main

import (
	"fmt"
)

type Product struct {
	id    int
	name  string
	price float64
}

func NewProduct(id int, name string, price float64) Product {
	return Product{id: id, name: name, price: price}
}

func (p Product) GetId() int       { return p.id }
func (p Product) GetName() string  { return p.name }
func (p Product) GetPrice() float64 { return p.price }

func (p Product) String() string {
	return fmt.Sprintf("Product{id=%d, name='%s', price=%v}", p.id, p.name, p.price)
}

type ProductCatalog struct {
	products []Product
}

func NewProductCatalog() *ProductCatalog {
	return &ProductCatalog{products: make([]Product, 0)}
}

func (c *ProductCatalog) AddProduct(product Product) {
	c.products = append(c.products, product)
}

func (c *ProductCatalog) GetPage(offset, limit int) []Product {
	if offset >= len(c.products) {
		return []Product{}
	}
	end := offset + limit
	if end > len(c.products) {
		end = len(c.products)
	}
	return append([]Product(nil), c.products[offset:end]...)
}

func (c *ProductCatalog) GetTotalCount() int {
	return len(c.products)
}

func (c *ProductCatalog) CreatePaginatedIterator(pageSize int) *PaginatedIterator {
	return NewPaginatedIterator(c, pageSize)
}

type PaginatedIterator struct {
	catalog     *ProductCatalog
	pageSize    int
	currentPage []Product
	pageIndex   int
	globalOffset int
	pageNumber  int
}

func NewPaginatedIterator(catalog *ProductCatalog, pageSize int) *PaginatedIterator {
	it := &PaginatedIterator{
		catalog:   catalog,
		pageSize:  pageSize,
		pageIndex: 0,
		globalOffset: 0,
		pageNumber: 0,
		currentPage: []Product{},
	}
	it.loadNextPage()
	return it
}

func (it *PaginatedIterator) HasNext() bool {
	if it.pageIndex < len(it.currentPage) {
		return true
	}
	if it.globalOffset < it.catalog.GetTotalCount() {
		it.loadNextPage()
		return true
	}
	return false
}

func (it *PaginatedIterator) Next() Product {
	item := it.currentPage[it.pageIndex]
	it.pageIndex++
	return item
}

func (it *PaginatedIterator) loadNextPage() {
	it.currentPage = it.catalog.GetPage(it.globalOffset, it.pageSize)
	it.pageNumber++
	fmt.Printf("Loading page %d...\n", it.pageNumber)
	it.globalOffset += len(it.currentPage)
	it.pageIndex = 0
}

func main() {
	catalog := NewProductCatalog()
	catalog.AddProduct(NewProduct(1, "Laptop", 999.99))
	catalog.AddProduct(NewProduct(2, "Mouse", 29.99))
	catalog.AddProduct(NewProduct(3, "Keyboard", 79.99))
	catalog.AddProduct(NewProduct(4, "Monitor", 349.99))
	catalog.AddProduct(NewProduct(5, "Headphones", 149.99))
	catalog.AddProduct(NewProduct(6, "USB Cable", 9.99))
	catalog.AddProduct(NewProduct(7, "Mouse Pad", 19.99))
	catalog.AddProduct(NewProduct(8, "Desk Lamp", 44.99))
	catalog.AddProduct(NewProduct(9, "Speakers", 89.99))
	catalog.AddProduct(NewProduct(10, "Webcam", 69.99))

	iterator := catalog.CreatePaginatedIterator(3)
	for iterator.HasNext() {
		fmt.Println("  ", iterator.Next())
	}
}
```

```csharp
using System;
using System.Collections.Generic;

// --- Given interfaces (do not modify) ---

interface IIterator<T>
{
    bool HasNext();
    T Next();
}

// --- Solution ---

class Product
{
    private int id;
    private string name;
    private double price;

    public Product(int id, string name, double price)
    {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public int GetId() { return id; }
    public string GetName() { return name; }
    public double GetPrice() { return price; }

    public override string ToString()
    {
        return $"Product{{id={id}, name='{name}', price={price}}}";
    }
}

class ProductCatalog
{
    private List<Product> products = new List<Product>();

    public void AddProduct(Product product)
    {
        products.Add(product);
    }

    public List<Product> GetPage(int offset, int limit)
    {
        if (offset >= products.Count) return new List<Product>();
        int count = Math.Min(limit, products.Count - offset);
        return products.GetRange(offset, count);
    }

    public int GetTotalCount()
    {
        return products.Count;
    }

    public IIterator<Product> CreatePaginatedIterator(int pageSize)
    {
        return new PaginatedIterator(this, pageSize);
    }
}

class PaginatedIterator : IIterator<Product>
{
    private ProductCatalog catalog;
    private int pageSize;
    private List<Product> currentPage;
    private int pageIndex;
    private int globalOffset;
    private int pageNumber;

    public PaginatedIterator(ProductCatalog catalog, int pageSize)
    {
        this.catalog = catalog;
        this.pageSize = pageSize;
        this.pageIndex = 0;
        this.globalOffset = 0;
        this.pageNumber = 0;
        LoadNextPage();
    }

    public bool HasNext()
    {
        if (pageIndex < currentPage.Count) return true;
        if (globalOffset < catalog.GetTotalCount())
        {
            LoadNextPage();
            return true;
        }
        return false;
    }

    public Product Next()
    {
        return currentPage[pageIndex++];
    }

    private void LoadNextPage()
    {
        currentPage = catalog.GetPage(globalOffset, pageSize);
        pageNumber++;
        Console.WriteLine("Loading page " + pageNumber + "...");
        globalOffset += currentPage.Count;
        pageIndex = 0;
    }
}

class Program
{
    static void Main(string[] args)
    {
        ProductCatalog catalog = new ProductCatalog();
        catalog.AddProduct(new Product(1, "Laptop", 999.99));
        catalog.AddProduct(new Product(2, "Mouse", 29.99));
        catalog.AddProduct(new Product(3, "Keyboard", 79.99));
        catalog.AddProduct(new Product(4, "Monitor", 349.99));
        catalog.AddProduct(new Product(5, "Headphones", 149.99));
        catalog.AddProduct(new Product(6, "USB Cable", 9.99));
        catalog.AddProduct(new Product(7, "Mouse Pad", 19.99));
        catalog.AddProduct(new Product(8, "Desk Lamp", 44.99));
        catalog.AddProduct(new Product(9, "Speakers", 89.99));
        catalog.AddProduct(new Product(10, "Webcam", 69.99));

        IIterator<Product> iterator = catalog.CreatePaginatedIterator(3);
        while (iterator.HasNext())
        {
            Console.WriteLine("  " + iterator.Next());
        }
    }
}
```

```typescript
// --- Given interfaces (do not modify) ---

interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}

// --- Solution ---

class Product {
    private readonly id: number;
    private readonly name: string;
    private readonly price: number;
    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getId(): number { return this.id; }
    getName(): string { return this.name; }
    getPrice(): number { return this.price; }

    toString(): string {
        return `Product{id=${this.id}, name='${this.name}', price=${this.price}}`;
    }
}

class ProductCatalog {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product);
    }

    getPage(offset: number, limit: number): Product[] {
        if (offset >= this.products.length) return [];
        return this.products.slice(offset, Math.min(offset + limit, this.products.length));
    }

    getTotalCount(): number {
        return this.products.length;
    }

    createPaginatedIterator(pageSize: number): Iterator<Product> {
        return new PaginatedIterator(this, pageSize);
    }
}

class PaginatedIterator implements Iterator<Product> {
    private catalog: ProductCatalog;
    private pageSize: number;
    private currentPage: Product[];
    private pageIndex: number;
    private globalOffset: number;
    private pageNumber: number;

    constructor(catalog: ProductCatalog, pageSize: number) {
        this.catalog = catalog;
        this.pageSize = pageSize;
        this.currentPage = [];
        this.pageIndex = 0;
        this.globalOffset = 0;
        this.pageNumber = 0;
        this.loadNextPage();
    }

    hasNext(): boolean {
        if (this.pageIndex < this.currentPage.length) return true;
        if (this.globalOffset < this.catalog.getTotalCount()) {
            this.loadNextPage();
            return true;
        }
        return false;
    }

    next(): Product {
        return this.currentPage[this.pageIndex++];
    }

    private loadNextPage(): void {
        this.currentPage = this.catalog.getPage(this.globalOffset, this.pageSize);
        this.pageNumber++;
        console.log(`Loading page ${this.pageNumber}...`);
        this.globalOffset += this.currentPage.length;
        this.pageIndex = 0;
    }
}

const catalog = new ProductCatalog();
catalog.addProduct(new Product(1, "Laptop", 999.99));
catalog.addProduct(new Product(2, "Mouse", 29.99));
catalog.addProduct(new Product(3, "Keyboard", 79.99));
catalog.addProduct(new Product(4, "Monitor", 349.99));
catalog.addProduct(new Product(5, "Headphones", 149.99));
catalog.addProduct(new Product(6, "USB Cable", 9.99));
catalog.addProduct(new Product(7, "Mouse Pad", 19.99));
catalog.addProduct(new Product(8, "Desk Lamp", 44.99));
catalog.addProduct(new Product(9, "Speakers", 89.99));
catalog.addProduct(new Product(10, "Webcam", 69.99));

const iterator = catalog.createPaginatedIterator(3);
while (iterator.hasNext()) {
    console.log("  " + iterator.next());
}
```

---

# Exercise 3: Composite Iterator

**Problem:** Build a `MusicLibrary` that contains multiple playlists. Implement a `CompositeIterator` that iterates across all playlists seamlessly, as if they were a single collection.

**Requirements:**

- `MusicLibrary` stores a list of `Playlist` objects (from our earlier example)
- `CompositeIterator` iterates through all songs in all playlists in sequence
- When one playlist's iterator is exhausted, it seamlessly moves to the next playlist
- The client should not know how many playlists exist or where one ends and another begins
- Implement `IterableCollection<String>` for the `MusicLibrary`

```java
import java.util.*;

// --- Given classes (do not modify) ---

interface Iterator<T> {
    boolean hasNext();
    T next();
}

interface IterableCollection<T> {
    Iterator<T> createIterator();
}

class Playlist implements IterableCollection<String> {
    private final List<String> songs = new ArrayList<>();

    public void addSong(String song) {
        songs.add(song);
    }

    public String getSongAt(int index) {
        return songs.get(index);
    }

    public int getSize() {
        return songs.size();
    }

    @Override
    public Iterator<String> createIterator() {
        return new PlaylistIterator(this);
    }
}

class PlaylistIterator implements Iterator<String> {
    private final Playlist playlist;
    private int index = 0;

    public PlaylistIterator(Playlist playlist) {
        this.playlist = playlist;
    }

    @Override
    public boolean hasNext() {
        return index < playlist.getSize();
    }

    @Override
    public String next() {
        return playlist.getSongAt(index++);
    }
}

// --- Implement the classes below ---

class MusicLibrary implements IterableCollection<String> {
    private List<Playlist> playlists = new ArrayList<>();

    public void addPlaylist(Playlist playlist) {
        playlists.add(playlist);
    }

    public List<Playlist> getPlaylists() {
        return playlists;
    }

    @Override
    public Iterator<String> createIterator() {
        // TODO: Return a CompositeIterator
        return null;
    }
}

class CompositeIterator implements Iterator<String> {
    private List<Playlist> playlists;
    private int playlistIndex;
    private Iterator<String> currentIterator;

    public CompositeIterator(List<Playlist> playlists) {
        // TODO: Initialize fields, set currentIterator to first playlist's iterator
    }

    @Override
    public boolean hasNext() {
        // TODO: Return true if current iterator has next, or advance to next playlist
        return false;
    }

    @Override
    public String next() {
        // TODO: Return next song from current iterator
        return null;
    }

    private void advanceToNextPlaylist() {
        // TODO: Move to next playlist with available songs
    }
}

public class Main {
    public static void main(String[] args) {
        // Playlist pop = new Playlist();
        // pop.addSong("Shape of You");
        // pop.addSong("Bohemian Rhapsody");
        // pop.addSong("Blinding Lights");
        //
        // Playlist classics = new Playlist();
        // classics.addSong("Imagine");
        // classics.addSong("Yesterday");
        // classics.addSong("Let It Be");
        //
        // MusicLibrary library = new MusicLibrary();
        // library.addPlaylist(pop);
        // library.addPlaylist(classics);
        //
        // System.out.println("Full Library:");
        // Iterator<String> iterator = library.createIterator();
        // while (iterator.hasNext()) {
        //     System.out.println("  " + iterator.next());
        // }
    }
}
```

```python
from abc import ABC, abstractmethod

# --- Given classes (do not modify) ---

class Iterator(ABC):
    @abstractmethod
    def has_next(self):
        pass

    @abstractmethod
    def next(self):
        pass

class IterableCollection(ABC):
    @abstractmethod
    def create_iterator(self):
        pass

class Playlist(IterableCollection):
    def __init__(self):
        self._songs = []

    def add_song(self, song):
        self._songs.append(song)

    def get_song_at(self, index):
        return self._songs[index]

    def get_size(self):
        return len(self._songs)

    def create_iterator(self):
        return PlaylistIterator(self)

class PlaylistIterator(Iterator):
    def __init__(self, playlist):
        self._playlist = playlist
        self._index = 0

    def has_next(self):
        return self._index < self._playlist.get_size()

    def next(self):
        song = self._playlist.get_song_at(self._index)
        self._index += 1
        return song

# --- Implement the classes below ---

class MusicLibrary(IterableCollection):
    def __init__(self):
        self._playlists = []

    def add_playlist(self, playlist):
        self._playlists.append(playlist)

    def get_playlists(self):
        return self._playlists

    def create_iterator(self):
        # TODO: Return a CompositeIterator
        pass

class CompositeIterator(Iterator):
    def __init__(self, playlists):
        # TODO: Store playlists, initialize playlist_index, set current_iterator
        pass

    def has_next(self):
        # TODO: Return True if current iterator has next, or advance to next playlist
        return False

    def next(self):
        # TODO: Return next song from current iterator
        pass

    def _advance_to_next_playlist(self):
        # TODO: Move to next playlist with available songs
        pass

if __name__ == "__main__":
    # pop = Playlist()
    # pop.add_song("Shape of You")
    # pop.add_song("Bohemian Rhapsody")
    # pop.add_song("Blinding Lights")
    #
    # classics = Playlist()
    # classics.add_song("Imagine")
    # classics.add_song("Yesterday")
    # classics.add_song("Let It Be")
    #
    # library = MusicLibrary()
    # library.add_playlist(pop)
    # library.add_playlist(classics)
    #
    # print("Full Library:")
    # iterator = library.create_iterator()
    # while iterator.has_next():
    #     print(f"  {iterator.next()}")
    pass
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// --- Given classes (do not modify) ---

template<typename T>
class Iterator {
public:
    virtual ~Iterator() {}
    virtual bool hasNext() = 0;
    virtual T next() = 0;
};

template<typename T>
class IterableCollection {
public:
    virtual ~IterableCollection() {}
    virtual Iterator<T>* createIterator() = 0;
};

class PlaylistIterator;

class Playlist : public IterableCollection<string> {
private:
    vector<string> songs;

public:
    void addSong(const string& song) {
        songs.push_back(song);
    }

    string getSongAt(int index) const {
        return songs[index];
    }

    int getSize() const {
        return songs.size();
    }

    Iterator<string>* createIterator() override;
};

class PlaylistIterator : public Iterator<string> {
private:
    Playlist* playlist;
    int index;

public:
    PlaylistIterator(Playlist* pl) : playlist(pl), index(0) {}

    bool hasNext() override {
        return index < playlist->getSize();
    }

    string next() override {
        string song = playlist->getSongAt(index);
        index++;
        return song;
    }
};

Iterator<string>* Playlist::createIterator() {
    return new PlaylistIterator(this);
}

// --- Implement the classes below ---

class MusicLibrary : public IterableCollection<string> {
    vector<Playlist*> playlists;

public:
    void addPlaylist(Playlist* playlist) {
        playlists.push_back(playlist);
    }

    const vector<Playlist*>& getPlaylists() const {
        return playlists;
    }

    Iterator<string>* createIterator() override {
        // TODO: Return a new CompositeIterator
        return nullptr;
    }
};

class CompositeIterator : public Iterator<string> {
    vector<Playlist*> playlists;
    int playlistIndex;
    Iterator<string>* currentIterator;

public:
    CompositeIterator(const vector<Playlist*>& playlists)
        : playlists(playlists), playlistIndex(0), currentIterator(nullptr) {
        // TODO: Set currentIterator to first playlist's iterator
    }

    bool hasNext() override {
        // TODO: Return true if current iterator has next, or advance to next playlist
        return false;
    }

    string next() override {
        // TODO: Return next song from current iterator
        return "";
    }

private:
    void advanceToNextPlaylist() {
        // TODO: Move to next playlist with available songs
    }
};

int main() {
    // Playlist pop;
    // pop.addSong("Shape of You");
    // pop.addSong("Bohemian Rhapsody");
    // pop.addSong("Blinding Lights");
    //
    // Playlist classics;
    // classics.addSong("Imagine");
    // classics.addSong("Yesterday");
    // classics.addSong("Let It Be");
    //
    // MusicLibrary library;
    // library.addPlaylist(&pop);
    // library.addPlaylist(&classics);
    //
    // cout << "Full Library:" << endl;
    // Iterator<string>* iterator = library.createIterator();
    // while (iterator->hasNext()) {
    //     cout << "  " << iterator->next() << endl;
    // }
    // delete iterator;
    return 0;
}
```

```go
package main

// --- Given interfaces and classes (do not modify) ---

type Iterator[T any] interface {
	HasNext() bool
	Next() T
}

type IterableCollection[T any] interface {
	CreateIterator() Iterator[T]
}

type Playlist struct {
	songs []string
}

func NewPlaylist() *Playlist {
	return &Playlist{
		songs: make([]string, 0),
	}
}

func (p *Playlist) AddSong(song string) {
	p.songs = append(p.songs, song)
}

func (p *Playlist) GetSongAt(index int) string {
	return p.songs[index]
}

func (p *Playlist) GetSize() int {
	return len(p.songs)
}

func (p *Playlist) CreateIterator() Iterator[string] {
	return NewPlaylistIterator(p)
}

type PlaylistIterator struct {
	playlist *Playlist
	index    int
}

func NewPlaylistIterator(playlist *Playlist) *PlaylistIterator {
	return &PlaylistIterator{
		playlist: playlist,
		index:    0,
	}
}

func (it *PlaylistIterator) HasNext() bool {
	return it.index < it.playlist.GetSize()
}

func (it *PlaylistIterator) Next() string {
	song := it.playlist.GetSongAt(it.index)
	it.index++
	return song
}

// --- Implement the classes below ---

type MusicLibrary struct {
	playlists []*Playlist
}

func NewMusicLibrary() *MusicLibrary {
	return &MusicLibrary{
		playlists: make([]*Playlist, 0),
	}
}

func (m *MusicLibrary) AddPlaylist(playlist *Playlist) {
	m.playlists = append(m.playlists, playlist)
}

func (m *MusicLibrary) GetPlaylists() []*Playlist {
	return m.playlists
}

func (m *MusicLibrary) CreateIterator() Iterator[string] {
	// TODO: Return a new CompositeIterator
	return nil
}

type CompositeIterator struct {
	playlists       []*Playlist
	playlistIndex   int
	currentIterator Iterator[string]
}

func NewCompositeIterator(playlists []*Playlist) *CompositeIterator {
	// TODO: Initialize fields, set currentIterator to first playlist's iterator
	return &CompositeIterator{
		playlists:       playlists,
		playlistIndex:   0,
		currentIterator: nil,
	}
}

func (it *CompositeIterator) HasNext() bool {
	// TODO: Return true if current iterator has next, or advance to next playlist
	return false
}

func (it *CompositeIterator) Next() string {
	// TODO: Return next song from current iterator
	return ""
}

func (it *CompositeIterator) advanceToNextPlaylist() {
	// TODO: Move to next playlist with available songs
}

func main() {
	// pop := NewPlaylist()
	// pop.AddSong("Shape of You")
	// pop.AddSong("Bohemian Rhapsody")
	// pop.AddSong("Blinding Lights")
	//
	// classics := NewPlaylist()
	// classics.AddSong("Imagine")
	// classics.AddSong("Yesterday")
	// classics.AddSong("Let It Be")
	//
	// library := NewMusicLibrary()
	// library.AddPlaylist(pop)
	// library.AddPlaylist(classics)
	//
	// iterator := library.CreateIterator()
	// for iterator.HasNext() {
	//     println("  " + iterator.Next())
	// }
}
```

```csharp
using System;
using System.Collections.Generic;

// --- Given classes (do not modify) ---

interface IIterator<T>
{
    bool HasNext();
    T Next();
}

interface IIterableCollection<T>
{
    IIterator<T> CreateIterator();
}

class Playlist : IIterableCollection<string>
{
    private List<string> songs = new List<string>();

    public void AddSong(string song)
    {
        songs.Add(song);
    }

    public string GetSongAt(int index)
    {
        return songs[index];
    }

    public int GetSize()
    {
        return songs.Count;
    }

    public IIterator<string> CreateIterator()
    {
        return new PlaylistIterator(this);
    }
}

class PlaylistIterator : IIterator<string>
{
    private Playlist playlist;
    private int index = 0;

    public PlaylistIterator(Playlist playlist)
    {
        this.playlist = playlist;
    }

    public bool HasNext()
    {
        return index < playlist.GetSize();
    }

    public string Next()
    {
        string song = playlist.GetSongAt(index);
        index++;
        return song;
    }
}

// --- Implement the classes below ---

class MusicLibrary : IIterableCollection<string>
{
    private List<Playlist> playlists = new List<Playlist>();

    public void AddPlaylist(Playlist playlist)
    {
        playlists.Add(playlist);
    }

    public List<Playlist> GetPlaylists()
    {
        return playlists;
    }

    public IIterator<string> CreateIterator()
    {
        // TODO: Return a new CompositeIterator
        return null;
    }
}

class CompositeIterator : IIterator<string>
{
    private List<Playlist> playlists;
    private int playlistIndex;
    private IIterator<string> currentIterator;

    public CompositeIterator(List<Playlist> playlists)
    {
        // TODO: Initialize fields, set currentIterator to first playlist's iterator
    }

    public bool HasNext()
    {
        // TODO: Return true if current iterator has next, or advance to next playlist
        return false;
    }

    public string Next()
    {
        // TODO: Return next song from current iterator
        return null;
    }

    private void AdvanceToNextPlaylist()
    {
        // TODO: Move to next playlist with available songs
    }
}

class Program {
    static void Main(string[] args) {
        // Playlist pop = new Playlist();
        // pop.AddSong("Shape of You");
        // pop.AddSong("Bohemian Rhapsody");
        // pop.AddSong("Blinding Lights");
        //
        // Playlist classics = new Playlist();
        // classics.AddSong("Imagine");
        // classics.AddSong("Yesterday");
        // classics.AddSong("Let It Be");
        //
        // MusicLibrary library = new MusicLibrary();
        // library.AddPlaylist(pop);
        // library.AddPlaylist(classics);
        //
        // Console.WriteLine("Full Library:");
        // IIterator<string> iterator = library.CreateIterator();
        // while (iterator.HasNext())
        // {
        //     Console.WriteLine("  " + iterator.Next());
        // }
    }
}
```

```typescript
// --- Given classes (do not modify) ---

interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}

interface IterableCollection<T> {
    createIterator(): Iterator<T>;
}

class Playlist implements IterableCollection<string> {
    private readonly songs: string[] = [];

    addSong(song: string): void {
        this.songs.push(song);
    }

    getSongAt(index: number): string {
        return this.songs[index];
    }

    getSize(): number {
        return this.songs.length;
    }

    createIterator(): Iterator<string> {
        return new PlaylistIterator(this);
    }
}

class PlaylistIterator implements Iterator<string> {
    private readonly playlist: Playlist;
    private index: number = 0;

    constructor(playlist: Playlist) {
        this.playlist = playlist;
    }

    hasNext(): boolean {
        return this.index < this.playlist.getSize();
    }

    next(): string {
        return this.playlist.getSongAt(this.index++);
    }
}

// --- Implement the classes below ---

class MusicLibrary implements IterableCollection<string> {
    private playlists: Playlist[] = [];

    addPlaylist(playlist: Playlist): void {
        this.playlists.push(playlist);
    }

    getPlaylists(): Playlist[] {
        return this.playlists;
    }

    createIterator(): Iterator<string> {
        // TODO: Return a new CompositeIterator
        return null as any;
    }
}

class CompositeIterator implements Iterator<string> {
    private playlists: Playlist[];
    private playlistIndex: number;
    private currentIterator: Iterator<string> | null;

    constructor(playlists: Playlist[]) {
        // TODO: Initialize fields, set currentIterator to first playlist's iterator
        this.playlists = playlists;
        this.playlistIndex = 0;
        this.currentIterator = null;
    }

    hasNext(): boolean {
        // TODO: Return true if current iterator has next, or advance to next playlist
        return false;
    }

    next(): string {
        // TODO: Return next song from current iterator
        return "";
    }

    private advanceToNextPlaylist(): void {
        // TODO: Move to next playlist with available songs
    }
}

// const pop = new Playlist();
// pop.addSong("Shape of You");
// pop.addSong("Bohemian Rhapsody");
// pop.addSong("Blinding Lights");
//
// const classics = new Playlist();
// classics.addSong("Imagine");
// classics.addSong("Yesterday");
// classics.addSong("Let It Be");
//
// const library = new MusicLibrary();
// library.addPlaylist(pop);
// library.addPlaylist(classics);
//
// console.log("Full Library:");
// const iterator = library.createIterator();
// while (iterator.hasNext()) {
//     console.log("  " + iterator.next());
// }
```

#### Solutions

```java
import java.util.*;

// --- Given classes (do not modify) ---

interface Iterator<T> {
    boolean hasNext();
    T next();
}

interface IterableCollection<T> {
    Iterator<T> createIterator();
}

class Playlist implements IterableCollection<String> {
    private final List<String> songs = new ArrayList<>();

    public void addSong(String song) {
        songs.add(song);
    }

    public String getSongAt(int index) {
        return songs.get(index);
    }

    public int getSize() {
        return songs.size();
    }

    @Override
    public Iterator<String> createIterator() {
        return new PlaylistIterator(this);
    }
}

class PlaylistIterator implements Iterator<String> {
    private final Playlist playlist;
    private int index = 0;

    public PlaylistIterator(Playlist playlist) {
        this.playlist = playlist;
    }

    @Override
    public boolean hasNext() {
        return index < playlist.getSize();
    }

    @Override
    public String next() {
        return playlist.getSongAt(index++);
    }
}

// --- Solution ---

class MusicLibrary implements IterableCollection<String> {
    private List<Playlist> playlists = new ArrayList<>();

    public void addPlaylist(Playlist playlist) {
        playlists.add(playlist);
    }

    public List<Playlist> getPlaylists() {
        return playlists;
    }

    @Override
    public Iterator<String> createIterator() {
        return new CompositeIterator(playlists);
    }
}

class CompositeIterator implements Iterator<String> {
    private List<Playlist> playlists;
    private int playlistIndex;
    private Iterator<String> currentIterator;

    public CompositeIterator(List<Playlist> playlists) {
        this.playlists = playlists;
        this.playlistIndex = 0;
        if (!playlists.isEmpty()) {
            currentIterator = playlists.get(0).createIterator();
        }
    }

    @Override
    public boolean hasNext() {
        if (currentIterator == null) return false;
        if (currentIterator.hasNext()) return true;
        advanceToNextPlaylist();
        return currentIterator != null && currentIterator.hasNext();
    }

    @Override
    public String next() {
        return currentIterator.next();
    }

    private void advanceToNextPlaylist() {
        playlistIndex++;
        while (playlistIndex < playlists.size()) {
            currentIterator = playlists.get(playlistIndex).createIterator();
            if (currentIterator.hasNext()) return;
            playlistIndex++;
        }
        currentIterator = null;
    }
}

public class Main {
    public static void main(String[] args) {
        Playlist pop = new Playlist();
        pop.addSong("Shape of You");
        pop.addSong("Bohemian Rhapsody");
        pop.addSong("Blinding Lights");

        Playlist classics = new Playlist();
        classics.addSong("Imagine");
        classics.addSong("Yesterday");
        classics.addSong("Let It Be");

        MusicLibrary library = new MusicLibrary();
        library.addPlaylist(pop);
        library.addPlaylist(classics);

        System.out.println("Full Library:");
        Iterator<String> iterator = library.createIterator();
        while (iterator.hasNext()) {
            System.out.println("  " + iterator.next());
        }
    }
}
```

```python
from abc import ABC, abstractmethod

# --- Given classes (do not modify) ---

class Iterator(ABC):
    @abstractmethod
    def has_next(self):
        pass

    @abstractmethod
    def next(self):
        pass

class IterableCollection(ABC):
    @abstractmethod
    def create_iterator(self):
        pass

class Playlist(IterableCollection):
    def __init__(self):
        self._songs = []

    def add_song(self, song):
        self._songs.append(song)

    def get_song_at(self, index):
        return self._songs[index]

    def get_size(self):
        return len(self._songs)

    def create_iterator(self):
        return PlaylistIterator(self)

class PlaylistIterator(Iterator):
    def __init__(self, playlist):
        self._playlist = playlist
        self._index = 0

    def has_next(self):
        return self._index < self._playlist.get_size()

    def next(self):
        song = self._playlist.get_song_at(self._index)
        self._index += 1
        return song

# --- Solution ---

class MusicLibrary(IterableCollection):
    def __init__(self):
        self._playlists = []

    def add_playlist(self, playlist):
        self._playlists.append(playlist)

    def get_playlists(self):
        return self._playlists

    def create_iterator(self):
        return CompositeIterator(self._playlists)

class CompositeIterator(Iterator):
    def __init__(self, playlists):
        self._playlists = playlists
        self._playlist_index = 0
        self._current_iterator = None
        if playlists:
            self._current_iterator = playlists[0].create_iterator()

    def has_next(self):
        if self._current_iterator is None:
            return False
        if self._current_iterator.has_next():
            return True
        self._advance_to_next_playlist()
        return self._current_iterator is not None and self._current_iterator.has_next()

    def next(self):
        return self._current_iterator.next()

    def _advance_to_next_playlist(self):
        self._playlist_index += 1
        while self._playlist_index < len(self._playlists):
            self._current_iterator = self._playlists[self._playlist_index].create_iterator()
            if self._current_iterator.has_next():
                return
            self._playlist_index += 1
        self._current_iterator = None

if __name__ == "__main__":
    pop = Playlist()
    pop.add_song("Shape of You")
    pop.add_song("Bohemian Rhapsody")
    pop.add_song("Blinding Lights")

    classics = Playlist()
    classics.add_song("Imagine")
    classics.add_song("Yesterday")
    classics.add_song("Let It Be")

    library = MusicLibrary()
    library.add_playlist(pop)
    library.add_playlist(classics)

    print("Full Library:")
    iterator = library.create_iterator()
    while iterator.has_next():
        print(f"  {iterator.next()}")
```

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// --- Given classes (do not modify) ---

template<typename T>
class Iterator {
public:
    virtual ~Iterator() {}
    virtual bool hasNext() = 0;
    virtual T next() = 0;
};

template<typename T>
class IterableCollection {
public:
    virtual ~IterableCollection() {}
    virtual Iterator<T>* createIterator() = 0;
};

class PlaylistIterator;

class Playlist : public IterableCollection<string> {
private:
    vector<string> songs;

public:
    void addSong(const string& song) {
        songs.push_back(song);
    }

    string getSongAt(int index) const {
        return songs[index];
    }

    int getSize() const {
        return songs.size();
    }

    Iterator<string>* createIterator() override;
};

class PlaylistIterator : public Iterator<string> {
private:
    Playlist* playlist;
    int index;

public:
    PlaylistIterator(Playlist* pl) : playlist(pl), index(0) {}

    bool hasNext() override {
        return index < playlist->getSize();
    }

    string next() override {
        string song = playlist->getSongAt(index);
        index++;
        return song;
    }
};

Iterator<string>* Playlist::createIterator() {
    return new PlaylistIterator(this);
}

// --- Solution ---

class CompositeIterator : public Iterator<string> {
    vector<Playlist*> playlists;
    int playlistIndex;
    Iterator<string>* currentIterator;

public:
    CompositeIterator(const vector<Playlist*>& playlists)
        : playlists(playlists), playlistIndex(0), currentIterator(nullptr) {
        if (!playlists.empty()) {
            currentIterator = playlists[0]->createIterator();
        }
    }

    bool hasNext() override {
        if (currentIterator == nullptr) return false;
        if (currentIterator->hasNext()) return true;
        advanceToNextPlaylist();
        return currentIterator != nullptr && currentIterator->hasNext();
    }

    string next() override {
        return currentIterator->next();
    }

private:
    void advanceToNextPlaylist() {
        playlistIndex++;
        while (playlistIndex < (int)playlists.size()) {
            delete currentIterator;
            currentIterator = playlists[playlistIndex]->createIterator();
            if (currentIterator->hasNext()) return;
            playlistIndex++;
        }
        delete currentIterator;
        currentIterator = nullptr;
    }
};

class MusicLibrary : public IterableCollection<string> {
    vector<Playlist*> playlists;

public:
    void addPlaylist(Playlist* playlist) {
        playlists.push_back(playlist);
    }

    const vector<Playlist*>& getPlaylists() const {
        return playlists;
    }

    Iterator<string>* createIterator() override {
        return new CompositeIterator(playlists);
    }
};

int main() {
    Playlist pop;
    pop.addSong("Shape of You");
    pop.addSong("Bohemian Rhapsody");
    pop.addSong("Blinding Lights");

    Playlist classics;
    classics.addSong("Imagine");
    classics.addSong("Yesterday");
    classics.addSong("Let It Be");

    MusicLibrary library;
    library.addPlaylist(&pop);
    library.addPlaylist(&classics);

    cout << "Full Library:" << endl;
    Iterator<string>* iterator = library.createIterator();
    while (iterator->hasNext()) {
        cout << "  " << iterator->next() << endl;
    }
    delete iterator;
    return 0;
}
```

```go
package main

import "fmt"

// --- Given classes (do not modify) ---

type Iterator interface {
	HasNext() bool
	Next() string
}

type IterableCollection interface {
	CreateIterator() Iterator
}

type Playlist struct {
	songs []string
}

func (p *Playlist) AddSong(song string) {
	p.songs = append(p.songs, song)
}

func (p *Playlist) GetSongAt(index int) string {
	return p.songs[index]
}

func (p *Playlist) GetSize() int {
	return len(p.songs)
}

func (p *Playlist) CreateIterator() Iterator {
	return NewPlaylistIterator(p)
}

type PlaylistIterator struct {
	playlist *Playlist
	index     int
}

func NewPlaylistIterator(playlist *Playlist) *PlaylistIterator {
	return &PlaylistIterator{
		playlist: playlist,
		index:    0,
	}
}

func (it *PlaylistIterator) HasNext() bool {
	return it.index < it.playlist.GetSize()
}

func (it *PlaylistIterator) Next() string {
	song := it.playlist.GetSongAt(it.index)
	it.index++
	return song
}

// --- Solution ---

type MusicLibrary struct {
	playlists []*Playlist
}

func NewMusicLibrary() *MusicLibrary {
	return &MusicLibrary{
		playlists: make([]*Playlist, 0),
	}
}

func (m *MusicLibrary) AddPlaylist(playlist *Playlist) {
	m.playlists = append(m.playlists, playlist)
}

func (m *MusicLibrary) GetPlaylists() []*Playlist {
	return m.playlists
}

func (m *MusicLibrary) CreateIterator() Iterator {
	return NewCompositeIterator(m.playlists)
}

type CompositeIterator struct {
	playlists      []*Playlist
	playlistIndex  int
	currentItertor Iterator
}

func NewCompositeIterator(playlists []*Playlist) *CompositeIterator {
	it := &CompositeIterator{
		playlists:     playlists,
		playlistIndex: 0,
		currentItertor: nil,
	}
	if len(playlists) > 0 {
		it.currentItertor = playlists[0].CreateIterator()
	}
	return it
}

func (c *CompositeIterator) HasNext() bool {
	if c.currentItertor == nil {
		return false
	}
	if c.currentItertor.HasNext() {
		return true
	}
	c.advanceToNextPlaylist()
	return c.currentItertor != nil && c.currentItertor.HasNext()
}

func (c *CompositeIterator) Next() string {
	return c.currentItertor.Next()
}

func (c *CompositeIterator) advanceToNextPlaylist() {
	c.playlistIndex++
	for c.playlistIndex < len(c.playlists) {
		c.currentItertor = c.playlists[c.playlistIndex].CreateIterator()
		if c.currentItertor.HasNext() {
			return
		}
		c.playlistIndex++
	}
	c.currentItertor = nil
}

func main() {
	pop := &Playlist{}
	pop.AddSong("Shape of You")
	pop.AddSong("Bohemian Rhapsody")
	pop.AddSong("Blinding Lights")

	classics := &Playlist{}
	classics.AddSong("Imagine")
	classics.AddSong("Yesterday")
	classics.AddSong("Let It Be")

	library := NewMusicLibrary()
	library.AddPlaylist(pop)
	library.AddPlaylist(classics)

	fmt.Println("Full Library:")
	iterator := library.CreateIterator()
	for iterator.HasNext() {
		fmt.Println("  " + iterator.Next())
	}
}
```

```csharp
using System;
using System.Collections.Generic;

// --- Given classes (do not modify) ---

interface IIterator<T>
{
    bool HasNext();
    T Next();
}

interface IIterableCollection<T>
{
    IIterator<T> CreateIterator();
}

class Playlist : IIterableCollection<string>
{
    private List<string> songs = new List<string>();

    public void AddSong(string song)
    {
        songs.Add(song);
    }

    public string GetSongAt(int index)
    {
        return songs[index];
    }

    public int GetSize()
    {
        return songs.Count;
    }

    public IIterator<string> CreateIterator()
    {
        return new PlaylistIterator(this);
    }
}

class PlaylistIterator : IIterator<string>
{
    private Playlist playlist;
    private int index = 0;

    public PlaylistIterator(Playlist playlist)
    {
        this.playlist = playlist;
    }

    public bool HasNext()
    {
        return index < playlist.GetSize();
    }

    public string Next()
    {
        string song = playlist.GetSongAt(index);
        index++;
        return song;
    }
}

// --- Solution ---

class MusicLibrary : IIterableCollection<string>
{
    private List<Playlist> playlists = new List<Playlist>();

    public void AddPlaylist(Playlist playlist)
    {
        playlists.Add(playlist);
    }

    public List<Playlist> GetPlaylists()
    {
        return playlists;
    }

    public IIterator<string> CreateIterator()
    {
        return new CompositeIterator(playlists);
    }
}

class CompositeIterator : IIterator<string>
{
    private List<Playlist> playlists;
    private int playlistIndex;
    private IIterator<string> currentIterator;

    public CompositeIterator(List<Playlist> playlists)
    {
        this.playlists = playlists;
        this.playlistIndex = 0;
        if (playlists.Count > 0)
        {
            currentIterator = playlists[0].CreateIterator();
        }
    }

    public bool HasNext()
    {
        if (currentIterator == null) return false;
        if (currentIterator.HasNext()) return true;
        AdvanceToNextPlaylist();
        return currentIterator != null && currentIterator.HasNext();
    }

    public string Next()
    {
        return currentIterator.Next();
    }

    private void AdvanceToNextPlaylist()
    {
        playlistIndex++;
        while (playlistIndex < playlists.Count)
        {
            currentIterator = playlists[playlistIndex].CreateIterator();
            if (currentIterator.HasNext()) return;
            playlistIndex++;
        }
        currentIterator = null;
    }
}

class Program
{
    static void Main(string[] args)
    {
        Playlist pop = new Playlist();
        pop.AddSong("Shape of You");
        pop.AddSong("Bohemian Rhapsody");
        pop.AddSong("Blinding Lights");

        Playlist classics = new Playlist();
        classics.AddSong("Imagine");
        classics.AddSong("Yesterday");
        classics.AddSong("Let It Be");

        MusicLibrary library = new MusicLibrary();
        library.AddPlaylist(pop);
        library.AddPlaylist(classics);

        Console.WriteLine("Full Library:");
        IIterator<string> iterator = library.CreateIterator();
        while (iterator.HasNext())
        {
            Console.WriteLine("  " + iterator.Next());
        }
    }
}
```

```typescript
// --- Given classes (do not modify) ---

interface Iterator<T> {
    hasNext(): boolean;
    next(): T;
}

interface IterableCollection<T> {
    createIterator(): Iterator<T>;
}

class Playlist implements IterableCollection<string> {
    private readonly songs: string[] = [];

    addSong(song: string): void {
        this.songs.push(song);
    }

    getSongAt(index: number): string {
        return this.songs[index];
    }

    getSize(): number {
        return this.songs.length;
    }

    createIterator(): Iterator<string> {
        return new PlaylistIterator(this);
    }
}

class PlaylistIterator implements Iterator<string> {
    private readonly playlist: Playlist;
    private index: number = 0;

    constructor(playlist: Playlist) {
        this.playlist = playlist;
    }

    hasNext(): boolean {
        return this.index < this.playlist.getSize();
    }

    next(): string {
        return this.playlist.getSongAt(this.index++);
    }
}

// --- Solution ---

class MusicLibrary implements IterableCollection<string> {
    private playlists: Playlist[] = [];

    addPlaylist(playlist: Playlist): void {
        this.playlists.push(playlist);
    }

    getPlaylists(): Playlist[] {
        return this.playlists;
    }

    createIterator(): Iterator<string> {
        return new CompositeIterator(this.playlists);
    }
}

class CompositeIterator implements Iterator<string> {
    private playlists: Playlist[];
    private playlistIndex: number;
    private currentIterator: Iterator<string> | null;

    constructor(playlists: Playlist[]) {
        this.playlists = playlists;
        this.playlistIndex = 0;
        this.currentIterator = playlists.length > 0 " playlists[0].createIterator() : null;
    }

    hasNext(): boolean {
        if (this.currentIterator === null) return false;
        if (this.currentIterator.hasNext()) return true;
        this.advanceToNextPlaylist();
        return this.currentIterator !== null && this.currentIterator.hasNext();
    }

    next(): string {
        return this.currentIterator!.next();
    }

    private advanceToNextPlaylist(): void {
        this.playlistIndex++;
        while (this.playlistIndex < this.playlists.length) {
            this.currentIterator = this.playlists[this.playlistIndex].createIterator();
            if (this.currentIterator.hasNext()) return;
            this.playlistIndex++;
        }
        this.currentIterator = null;
    }
}

const pop = new Playlist();
pop.addSong("Shape of You");
pop.addSong("Bohemian Rhapsody");
pop.addSong("Blinding Lights");

const classics = new Playlist();
classics.addSong("Imagine");
classics.addSong("Yesterday");
classics.addSong("Let It Be");

const library = new MusicLibrary();
library.addPlaylist(pop);
library.addPlaylist(classics);

console.log("Full Library:");
const iterator = library.createIterator();
while (iterator.hasNext()) {
    console.log("  " + iterator.next());
}
```


